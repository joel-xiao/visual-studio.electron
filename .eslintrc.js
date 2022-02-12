module.exports = {
    // 设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "vue/setup-compiler-macros":true
    },
    // 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    // 支持ts的最新语法
    "parser":"vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    // 添加vue和@typescript-eslint插件，增强eslint的能力
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars":  "off",
        "@typescript-eslint/no-empty-function":  "off",
        "@typescript-eslint/no-var-requires":  "off",
        "vue/multi-word-component-names": "off",
    }
}
