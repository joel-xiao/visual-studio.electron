"use strict";
exports[Symbol.toStringTag] = "Module";
const name = "electron-vue-vite";
const version = "1.0.0";
const main = "dist/main/index.cjs";
const author = "\u8349\u978B\u6CA1\u53F7 <308487730@qq.com>";
const license = "MIT";
const scripts = {
  dev: "node scripts/watch.mjs",
  build: "vue-tsc --project src/renderer/tsconfig.json --noEmit && node scripts/build.mjs && electron-builder"
};
const engines = {
  node: ">=14.17.0"
};
const devDependencies = {
  "@vitejs/plugin-vue": "^2.1.0",
  electron: "16.0.8",
  "electron-builder": "^22.14.5",
  typescript: "^4.5.5",
  vite: "^2.7.13",
  "vite-plugin-resolve": "^1.4.3",
  vue: "^3.2.29",
  "vue-tsc": "^0.31.1"
};
const env = {
  "//": "Used in build scripts",
  HOST: "127.0.0.1",
  PORT: 3344
};
const keywords = [
  "vite",
  "electron",
  "vue3",
  "rollup"
];
var _package = {
  name,
  version,
  main,
  author,
  license,
  scripts,
  engines,
  devDependencies,
  env,
  keywords
};
exports.author = author;
exports["default"] = _package;
exports.devDependencies = devDependencies;
exports.engines = engines;
exports.env = env;
exports.keywords = keywords;
exports.license = license;
exports.main = main;
exports.name = name;
exports.scripts = scripts;
exports.version = version;
