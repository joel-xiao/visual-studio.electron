export {};

declare global {
  interface window {
    // Expose some Api through preload script
    fs: typeof import('fs');
    ipcRenderer: import('electron') .ipcrenderer;
    removeLoading: () => void;
  }
}
