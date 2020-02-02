import socketClient from 'socket.io-client';
import { getLogger } from '../utils/logger/logger';
const logger = getLogger(module);

export enum TypeSocketEvent {
    connect = 'connect',
    message = 'message',
    disconnect = 'disconnect'
}
export class SocketClient {
    private client: SocketIOClient.Socket;
    constructor(url: string, options: SocketIOClient.ConnectOpts) {
        this.client = socketClient(url, options);

        this.client.emit(TypeSocketEvent.message, {text: 'from Bot with love'});

        this.client.on(TypeSocketEvent.connect, async () => {
            logger.debug('dictionary bot connected to socket');
        });
        this.client.on(TypeSocketEvent.disconnect, async () => {
            logger.debug('dictionary bot disconnected from socket');
        });
        this.client.on(TypeSocketEvent.message, async (msg: any) => {
            const message = JSON.parse(msg);
            logger.debug(`dictionary bot get message ${message.text}`);
            message.text = `ok, it's dictionary bot ${message.text}`;
            this.client.emit(TypeSocketEvent.message, message);
        });
    }
}

export async function initSocket(url: string, token: string) {
    const options = {
        query: {
            token,
            secure: true
        }
    };
    return new SocketClient(url, options);
}
