import { default_state, IState } from "./state";
import Action from "./Action";

let _state: IState;

let listeners: ((state: IState) => void)[] = [];
let dispatchCallback: ((action: Action, state: IState) => Promise<IState>)[] = [];

function notify() {
  listeners.forEach((listener) => listener({ ..._state }));
}

export function initializeState(st: IState): void {
  _state = st;
}

export function init(callback: (state: IState) => void): void {
  callback({ ..._state });
}

export function connect(callback: (state: IState) => void): void {
  listeners.push(callback);
}

export function disconnect(callback: (state: IState) => void): void {
  const index = listeners.indexOf(callback);
  if (index >= 0) {
    listeners.splice(index, 1);
  }
}

export function register(callback: (action: Action, state: IState) => Promise<IState>): void {
  dispatchCallback.push(callback);
}

export function registered(callback: (action: Action, state: IState) => Promise<IState>): boolean {
  return dispatchCallback.indexOf(callback) >= 0;
}

export async function dispatch(action: Action): Promise<void> {
  for (const cb of dispatchCallback) {
    _state = await cb(action, { ..._state });
  }
  notify();
}

// for tests
export function resetDispatcher(st: IState | undefined = undefined): void {
  if (st) {
    _state = { ...st };
  } else {
    _state = { ...default_state() };
  }
  listeners = [];
  dispatchCallback = [];
}
