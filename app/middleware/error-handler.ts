import { Context } from 'egg';

export default () => {
  return async (ctx: Context, next: any) => {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      const error = status === 500 ? 'Internal Server Error' : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      ctx.status = status;
    }
  };
};
