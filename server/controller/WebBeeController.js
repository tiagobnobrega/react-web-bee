class WebBeeController {

  constructor(requestMapping) {
    this.globalRequestMapping = `/${requestMapping || ''}/`;
    this.globalRequestMapping = this.globalRequestMapping.replace('//', '/');
    this.methods = [];
  }

  use(argHttpMethods, path) {
    let httpMethods = argHttpMethods;
    if (typeof httpMethods === 'string') {
      httpMethods = httpMethods.split(',');
    }
    httpMethods = httpMethods
      .map(m => m.toString().toUpperCase())
      .filter(m => WebBeeController.isValidHttpMethod(m))
      .map(m => WebBeeController.METHODS[m]);
    if (httpMethods.length === 0) {
      throw new Error('Invalid http method definition');
    }
    return (fn) => {
      const m = async (ctx, next) => {
        await fn.call(this, ctx);
        await next();
      };
      this.methods.push({ path: this.resolvePath(path), fn: m, httpMethods });
      return this;
    };
  }

  static isValidHttpMethod(method) {
    const foundMethod = Object.keys(WebBeeController.METHODS).find(key => key === method);
    return !!foundMethod;
  }

  getMethods() {
    return this.methods;
  }

  resolvePath(srcPath) {
    // handle double bars
    let path = (srcPath || '');
    path = this.globalRequestMapping + path;
    return path.replace('//', '/');
  }
}
WebBeeController.METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

module.exports = WebBeeController;

