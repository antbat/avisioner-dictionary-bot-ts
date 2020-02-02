import { Application, Request, Response, NextFunction } from 'express';
import { Controllers, IController } from '../../utils/Controllers';
import {authService} from "../../utils/externalAPI/auth.api";
import {config} from "../../utils/config";


export class RootController extends Controllers implements IController {
    constructor() {
        super('/');
    }
    registerRoutes(app: Application): void {
        app.route(this.url('')).get(this.getMessage);
        app.route(this.url('enrich')).get(this.enrich);
    }

    public async getMessage(req: Request, res: Response, next: NextFunction) {
        try {
            return  res.send({msg: 'seed'});
        } catch (err) {
            next(err)
        }
    }
    public async enrich(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = Controllers.checkIfUserHuman(req.headers, config.JWT.secret);
            const rootItem = await authService.getRootItemByUser(id);
            const status = 'ready';
            const route = 'dictionary';
            return  res.send({ rootItem, status, route});
        } catch (err) {
            next(err)
        }
    }
}
