import { config } from './config';
import request, {Response} from 'request';

export class UserService {
    static async getToken(): Promise<string>{
        const url = config.user.api + '/signIn';
        const data = {
            password: config.user.password,
            email: config.user.email
        };
        const retrieved =  await this.sendPost<{ token: string, user: string }>(url, data);
        return retrieved.token;
    }
    static async sendPost<T>(url: string, json: object,  token?: string): Promise<T> {
        return new Promise<T>( (resolve, reject) => {
            const options: any = { url, json };
            if (token) {
                options.auth =  {
                    bearer: token
                }
            }
            request.post(options, (error: any, response: Response, body: any) => {
                if (error) {
                    return reject(error);
                }
                resolve(body as T);
            })
        })
    }
}
