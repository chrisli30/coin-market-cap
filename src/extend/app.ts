import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';

import Koa from 'koa';

import Config from '../config';

class ExtendApp extends Koa {
    config: typeof Config;

    context: Koa.Context & {
        config: ExtendApp.Config,
        app: ExtendApp,
    }

    createEmptyContext() {
        const req = new IncomingMessage({} as Socket);
        const res = new ServerResponse(req);

        return this.createContext(req, res) as ExtendApp.Context;
    }

    [prop: string]: any;
}

namespace ExtendApp {
    export type Config = typeof Config;

    export interface Context extends Koa.Context {
        config: ExtendApp.Config;
    };
}
export = ExtendApp;
