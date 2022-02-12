module.exports = {
    // 设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
        // 开启setup语法糖环境
        'vue/setup-compiler-macros': true,
    },
    // 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': 'vue-eslint-parser',
    // 支持ts的最新语法
    'parserOptions': {
        'ecmaVersion': 13,
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    // 添加vue和@typescript-eslint插件，增强eslint的能力
    'plugins': [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-var': 'error',
        'vue/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface'
        ],
        '@typescript-eslint/no-unused-vars': 'off', // 使用 ts 未使用变量的规则 比如枚举类型在es中会报错
        'no-extend-native': 0,
        'no-new': 0,
        'no-useless-escape': 0,
        'no-useless-constructor': 0,
        'indent': [ 'error', 4, {
            'SwitchCase': 1
        } ],
        'space-before-function-paren': [ 'error', {
            'anonymous': 'always',
            'named': 'always',
            'asyncArrow': 'always'
        } ],
        'semi': [ 'error', 'always' ],
        'comma-dangle': 0,
        'no-console': 0,
        'no-debugger': 0,
        'id-length': 0,
        'eol-last': 0,
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'arrow-spacing': 'error',
        'no-multiple-empty-lines': 'error',
        'no-unused-vars': 'off',
        'spaced-comment': 'error',
        'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true } ],
        'no-unreachable': 'error',
        'keyword-spacing': 'error',
        'space-before-blocks': 'error',
        'semi-spacing': 'error',
        'comma-spacing': 'error',
        'key-spacing': 'error',
        'prefer-const': [ 'error', {
            'destructuring': 'any',
            'ignoreReadBeforeAssign': false
        } ],
        'space-infix-ops': 2,
        'no-irregular-whitespace': 2, // 不规则的空白不允许
        'no-trailing-spaces': 2, // 一行结束后面有空格就发出警告
        'vue/require-default-prop': 'off',
    }
};
