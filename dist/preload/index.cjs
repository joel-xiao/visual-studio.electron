"use strict";var a=require("fs"),o=require("electron");function d(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var c=d(a);function s(e=["complete","interactive"]){return new Promise(r=>{e.includes(document.readyState)?r(!0):document.addEventListener("readystatechange",()=>{e.includes(document.readyState)&&r(!0)})})}function p(){const e="loaders-css__square-spin",r=`
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${e} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `,t=document.createElement("style"),n=document.createElement("div");return t.id="app-loading-style",t.innerHTML=r,n.className="app-loading-wrap",n.innerHTML=`<div class="${e}"><div></div></div>`,{appendLoading(){document.head.appendChild(t),document.body.appendChild(n)},removeLoading(){document.head.removeChild(t),document.body.removeChild(n)}}}const{removeLoading:l,appendLoading:u}=p();s().then(()=>{u()});o.contextBridge.exposeInMainWorld("fs",c.default);o.contextBridge.exposeInMainWorld("removeLoading",l);o.contextBridge.exposeInMainWorld("ipcRenderer",f(o.ipcRenderer));function f(e){const r=Object.getPrototypeOf(e);for(const[t,n]of Object.entries(r))Object.prototype.hasOwnProperty.call(e,t)||(typeof n=="function"?e[t]=function(...i){return n.call(e,...i)}:e[t]=n);return e}
