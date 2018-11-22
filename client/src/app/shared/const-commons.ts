export enum EventSocket {
    CONNECT = 'connect',
    ERROR = 'error',
    DISCONNECT = 'disconnect',
    RECONNECT = 'reconnect',
    RECONNECTING = 'reconnecting',
    RECONNECT_ERROR = 'reconnect_error',
    RECONNECT_FAILED = 'reconnect_failed',
    MESSAGE = 'message'
}

export const SERVER_URL_SOCKETIO = 'http://localhost:4000'
export const SERVER_URL_API = 'http://localhost:3000/api/v1/'