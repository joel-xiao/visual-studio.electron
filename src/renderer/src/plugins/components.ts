// const uses = require.context('../components', true, /use.ts$/);
const uses = import.meta.globEager('../components/**/*.ts');
export default {
    install ( app:any):void {
        for (const path of Object.keys(uses)) {
            const install = uses[path].default?.install;
            install && install(app);
        }
    }
};