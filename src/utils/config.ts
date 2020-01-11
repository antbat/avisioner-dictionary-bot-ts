/*
    wrapper under config package
    adding only auto suggest IDE sugar by interface
 */
import currentConfig from 'config'
export interface Config {
    port: number;
    user: {
        api: string,
        password: string,
        email: string
    };
    socket: {
        url: string
    };
    logging: {
        default: string,
        error: string,
    };
    mongoDB: {
        connectionString: string,
        collection: {
            user: string
        }
    };
    elasticSearch: {
        index: {
            user: string
        },
        options: {
            node: string,
            log: string,
            keepAlive: boolean
        }
    }
}
export const config: Config = currentConfig as any;
