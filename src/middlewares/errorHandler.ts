import { v4 as uuidv4 } from 'uuid';

import Logger from '../loaders/logger';
import { ERROR_CODES } from '../errors/index';

export default () => {
    return async (ctx, next) => {
        ctx.requestId = uuidv4();
        try {
            const data = await next();
            ctx.body = {
                code: ERROR_CODES.SUCCESS,
                success: true,
                requestId: ctx.requestId,
                data,
            };

            Logger.info(
                'url: %s, method: %s, body: %O, response: %O',
                ctx.request.url,
                ctx.request.method,
                ctx.request.body,
                ctx.body,
            );
        } catch (error) {
            ctx.body = {
                code: error.code || ERROR_CODES.ERR_SERVER,
                success: false,
                requestId: ctx.requestId,
                errorMsg: error.msg || 'server internal error',
            };

            Logger.error(
                'url: %s, method: %s, body: %O, response: %O, stack: %s',
                ctx.request.url,
                ctx.request.method,
                ctx.request.body,
                ctx.body,
                error.stack,
            );
        }
    };
};
