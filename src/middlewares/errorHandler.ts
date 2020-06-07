import { v4 as uuidv4 } from 'uuid';

export default () => {
    return async (ctx, next) => {
        try {
            ctx.requestId = uuidv4();
            const data = await next();
            ctx.body = {
                code: '',
                success: true,
                data,
            };
        } catch (error) {
            ctx.body = {
                code: '',
                success: false,
                errorMsg: error,
            };
        }
    };
};
