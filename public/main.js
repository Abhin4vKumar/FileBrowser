import {app,BrowserWindow} from "electron";

import * as electronRemoteMain from '@electron/remote/main';
electronRemoteMain.initialize();

function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            enableRemoteModule:true
        }
    })

    win.loadURL('http://localhost:3000')
}

app.on('ready' , createWindow);

app.on('window-all-closed',function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
});

app.on('activate' , function(){
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
});