# dashboard-editor

![awesome-vite](https://camo.githubusercontent.com/abb97269de2982c379cbc128bba93ba724d8822bfbe082737772bd4feb59cb54/68747470733a2f2f63646e2e7261776769742e636f6d2f73696e647265736f726875732f617765736f6d652f643733303566333864323966656437386661383536353265336136336531353464643865383832392f6d656469612f62616467652e737667)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/electron-vue-vite?style=flat)
![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/electron-vue-vite?color=fa6470&style=flat)
![GitHub forks](https://img.shields.io/github/forks/caoxiemeihao/electron-vue-vite?style=flat)

<!-- **[English](README.md) | 简体中文** -->

🥳 `Electron` + `Vue3` + `Vite2` + `Ts` + `Ts` + `TsLint` + `EsLint` + `StyleLint` + `Prettier` +
`CommitLint` + `husky` + `lint-staged` 整合模板 -- **结构简单，容易上手！**

## 概述

&emsp;&emsp;这是一个追求精简的`Electron`类整合模板，只保持最基本的文件、最基本的依赖、最基本的功能；
而不是大而全的、臃肿的设计。这样做的目的是能确保模板足够灵活。

所以说如果你是对 -- 工程模板追求精简的 Coder，或者刚入世的小白想弄明白`Electron`整合类模板最基础的工
作原理，亦或者你是大神只是想偷懒少干点活；那么这个模板最合适你不过了。

尽管如此，我还是希望你对`Electron` `Vite` `Ts` `Scss`有一定的基础；因为除了项目结构简单外，这
份`README`也显得 “ 精简” 。

模板的具体实现细节我相信你看两遍源码就能把它吃透了 😋

## 运行项目

```bash
# clone the project
git clone https://github.com/xiaowenlong1022/dashboard-editor.git

# enter the project directory
cd dashboard-editor

# switch the dev
git switch dev

# install dependency
npm install or yarn

# develop
npm run dev or yarn dev
```

## 目录结构

&emsp;&emsp;一旦启动或打包脚本执行过，会在根目录产生 **`dist` 文件夹，里面的文件夹同 `src` 一模一
样**；在使用一些路径计算时，尤其是相对路径计算；`dist` 与 `src` 里面保持相同的目录结构能避开好多问题

```tree
├
├── dist                        构建后，根据 src 目录生成
├   ├── main
├   ├── preload
├   ├── renderer
├
├── .vscode
├   ├── settings.json           vscode 规范 配置
├
├── scripts
├   ├── build.mjs               项目构建脚本，对应 npm run build
├   ├── vite.config.mjs         主进程, 预加载脚本源码 vite 配置
├   ├── watch.mjs               项目开发脚本，对应 npm run dev
├
├── src
├   ├── main                    主进程源码
├   ├── preload                 预加载脚本源码
├   ├── renderer                渲染进程源码
├       ├── tests               渲染进 jest 单元测试文件
├       ├── jest.config.ts      渲染进 jest 配置
├       ├── postcss.config.ts   渲染进 移动端适配 配置
├       ├── tsconfig.json       渲染进 tslint 配置
├       ├── vite.config.ts      渲染进程 vite 配置
├
├── .commitlintrc.js            git commit message 规范 配置
├── .editorconfig               跨不同的编辑器和IDE为多个开发人员维护一致的编码风格的配置文件
├── .eslintignore               指定 eslint 忽略文件和目录
├── .eslintrc.js                eslint 配置项
├── .gitignore                  指定 git 忽略文件和目录
├── .prettierrc.js              prettier格式化 配置项
├── .stylelintignore            指定 stylelint 忽略文件和目录
├── .stylelintrc.js             stylelint 配置项
├── changelog-option.js         git commit message 扩展阅读 配置
├── tsconfig.json               tslint 配置
├── types.d.ts                  NodeJS 类型声明

├
```

## 依赖放到 dependencies 还是 devDependencies

&emsp;&emsp;对待 **Electron-Main、Preload-Script** 时 vite 会以 lib 形式打包 commonjs 格式代码；如果
碰 node 环境的包可以直接放到 dependencies 中，vite 会解析为 require('xxxx')； electron-builder 打包
时候会将 dependencies 中的包打包到 app.asar 里面

&emsp;&emsp;对待 **Electron-Renderer** 时 vite 会以 ESM 格式解析代码；像 vue、react 这种前端用的包可
以直接被 vite 构建，所以不需要 vue、react 源码；现实情况 vue、react 放到 dependencies 或
devDependencies 中都可以被正确构建；但是放到 dependencies 会被 electron-builder 打包到 app.asar 里面
导致包体变大；所以放到 devDependencies 既能被正确构建还可以减小 app.asar 体积，一举两得

## 渲染进程使用 NodeJs API

> 🚧 因为安全的原因 Electron 默认不支持在 渲染进程 中使用 NodeJs API，但是有些小沙雕就是想这么干，拦
> 都拦不住；实在想那么干的话，用另一个模板更方便 👉
> **[electron-vite-boilerplate](https://github.com/caoxiemeihao/electron-vite-boilerplate)**

**推荐所有的 NodeJs、Electron API 通过 `Preload-script` 注入到 渲染进程中，例如：**

- **src/preload/index.ts**

  ```typescript
  import fs from 'fs';
  import { contextBridge, ipcRenderer } from 'electron';

  // --------- Expose some API to Renderer-process. ---------
  contextBridge.exposeInMainWorld('fs', fs);
  contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
  ```

- **src/renderer/src/global.d.ts**

  ```typescript
  // Defined on the window
  interface Window {
    fs: typeof import('fs');
    ipcRenderer: import('electron').IpcRenderer;
  }
  ```

- **src/renderer/main.ts**

  ```typescript
  // Use Electron, NodeJs API in Renderer-process
  console.log('fs', window.fs);
  console.log('ipcRenderer', window.ipcRenderer);
  ```

**如果你真的在这个模板中开启了 `nodeIntegration: true` `contextIsolation: false` 我不拦着  
🚧 但是要提醒你做两件事儿**

1. `preload/index.ts` 中的 `exposeInMainWorld` 删掉，已经没有用了

```diff
- contextBridge.exposeInMainWorld('fs', fs)
- contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
```

2. `configs/vite-renderer.config` 中有个 `resolveElectron` **最好了解下**  
   👉 这里有个 `issues`
   [请教一下 vite-renderer.config 中的 resolveElectron 函数](https://github.com/caoxiemeihao/electron-vue-vite/issues/52)

## 提交更改

```bash
# pull
git pull --rebase

# commit the message
git commit -m "commit: message"

# push
git push
```

[comment]: <> (## 运行效果)

[comment]: <>
(<img width="400px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/electron-vue-vite/screenshot/electron-15.png" />)

[comment]: <> (## 微信 | | 请我喝杯下午茶 🥳)

[comment]: <> (<div style="display:flex;">)

[comment]: <> (
<img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/group/qrcode.jpg" />)

[comment]: <> ( &nbsp;&nbsp;&nbsp;&nbsp;)

[comment]: <> (
<img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/blog/main/assets/wechat/%24qrcode/%24.png" />)

[comment]: <> (</div>)
