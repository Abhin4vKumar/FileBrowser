const {contextBridge , ipcRenderer} = require('electron/renderer');

contextBridge.exposeInMainWorld('v1',{
    join:(path,file)=>{return ipcRenderer.invoke('path:join',{path,file})},
    readdirSync:(path)=>{return ipcRenderer.invoke('fs:readdirSync',path)},
    statSync:(path,file)=>{return ipcRenderer.invoke('fs:statSync',{path,file})},
    dirname:(path)=>{return ipcRenderer.invoke('path:dirname',path)},
    appPath:()=>{return ipcRenderer.invoke('app:path')},
    getFiles:(path)=>{return ipcRenderer.invoke('get:files',path)}
})