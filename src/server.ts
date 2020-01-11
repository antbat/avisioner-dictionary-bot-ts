import { config } from './utils/config';
import { getApp } from "./app";
import { initSocket } from './sockets/SocketClient';
import {UserService} from "./utils/UserService";

( async () => {
    const application = await getApp();
    await application.listen(config.port);

    // socket init
    const token  = await UserService.getToken();
    await initSocket(config.socket.url, token);
})();
