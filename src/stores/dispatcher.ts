import Action from "../actions/Action";
import { default_state, IState } from "../editor/stores/state";

let state: IState;

let listeners: ((state: IState) => void)[] = [];
let dispatch_callback: ((action: Action, state: IState) => Promise<IState>)[] = [];

function notify() {
  listeners.forEach((listener) => listener({ ...state }));
}

export function initialize_state(st: IState): void {
  state = st;
}

export function init(callback: (state: IState) => void): void {
  callback({ ...state });
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
  dispatch_callback.push(callback);
}

export function registered(callback: (action: Action, state: IState) => Promise<IState>): boolean {
  return dispatch_callback.indexOf(callback) >= 0;
}

export async function dispatch(action: Action): Promise<void> {
  dispatch_callback.forEach(cb => {
    state = await cb(action, { ...state });
  })

  notify();
}

// for tests
export function reset_dispatcher(st: IState | undefined = undefined): void {
  if (st) {
    state = { ...st };
  } else {
    state = { ...default_state() };
  }
  listeners = [];
  dispatch_callback = [];
}
