const uses = require.context('../components', true, /use.ts$/);

export default {
  install ( app:any):void {
    for (const path of uses.keys()) {
      const install = uses(path).default?.install;
      install && install(app);
    }
  }
}