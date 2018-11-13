export enum EventSocket {
    CONNECT = 'connect',
    ERROR = 'error',
    DISCONNECT = 'disconnect',
    RECONNECT = 'reconnect',
    RECONNECTING = 'reconnecting',
    RECONNECT_ERROR = 'reconnect_error',
    RECONNECT_FAILED = 'reconnect_failed'
}

export const SERVER_URL = 'http://localhost:4000'