import { config } from './utils/config';
import { getApp } from "./app";
import { initSocket } from './sockets/SocketClient';
import { signedInData } from './utils/externalAPI/auth.api';

( async () => {

    const { token } = await signedInData;

    const application = await getApp();
    await application.listen(config.port);

    await initSocket(config.socket.url, token);
})();
