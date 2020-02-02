/*
    parent class for all controllers
    in route system
 */

import express, { Router, Application } from 'express';
import {IncomingHttpHeaders} from "http";
import {HttpError} from "./HttpError";
import {verify} from "jsonwebtoken";
import { TypeOfUser, IUserToken} from "@antbat/avisioner-auth-api";

export class Controllers {
    public router: Router = express.Router();
    public readonly _base: string;

    constructor (base: string){
        this._base = base;
    }
    protected url(route: string): string {
        return this._base + route;
    }
    private static getTokenFromHeader<T> (header: IncomingHttpHeaders, secret: string): T {
        const authHeader = header.authorization;
        if (authHeader) {
            try {
                const token = authHeader.substring(7);
                return verify(token, secret) as unknown as T;
            } catch (err) {
                throw new HttpError(400, 'invalid token');
            }
        }
        throw new HttpError(400, 'there is no proper Authorization header');
    }
    static checkIfUserHuman(headers: IncomingHttpHeaders, secret: string): IUserToken {
        const contentOfToken = Controllers.getTokenFromHeader<IUserToken>(headers, secret);
        if (contentOfToken.typeOfUser !== TypeOfUser.human) {
            throw (new HttpError(403, `you don't have permission to get all bots`));
        }
        return contentOfToken;
    }
}
export interface IController {
    registerRoutes(app: Application): void;
}
