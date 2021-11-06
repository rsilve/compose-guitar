import {Action} from "../actions/Action";

let state: any

let listeners: ((state: any) => void)[] = []
let dispatch_callback: ((action: Action, state: any) => Promise<any>)[] = []

function notify() {
    for (const listener of listeners) {
        listener({...state})
    }
}

export function initialize_state(st: any): void {
    state = st
}

export function init(callback: (state: any) => void): void {
    callback({...state})
}

export function connect(callback: (state: any) => void): void {
    listeners.push(callback)
}

export function disconnect(callback: (state: any) => void): void {
    const index = listeners.indexOf(callback);
    if (index >= 0) {
        listeners.splice(index, 1)
    }
}

export function register(callback: (action: Action, state: any) => Promise<any>): void {
    dispatch_callback.push(callback)
}

export function registered(callback: (action: Action, state: any) => Promise<any>): boolean {
    return dispatch_callback.indexOf(callback) >= 0
}

export async function dispatch(action: Action): Promise<void> {
    for (const cb of dispatch_callback) {
        state = await cb(action, {...state})
    }
    notify()
}

// for tests
export function reset_dispatcher(st: any | undefined = undefined): void {
    if (st) {
        state = {...st}
    } else {
        state = {}
    }
    listeners = []
    dispatch_callback = []

}


