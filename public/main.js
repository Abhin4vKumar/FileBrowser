const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path');
const fs = require('fs');
// const isDev = import('electron-is-dev');
const isDev = true;
require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload:path.join(__dirname,'preload.js'),
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}
const formatSize = size => {
    var i=Math.floor(Math.log(size) / Math.log(1024))
    return (
      (size/Math.pow(1024,i)).toFixed(2) * i + ' ' + ['B','kB' , 'MB' , 'GB' , 'TB'][i]
    )
}

  
app.on('ready', function(){
    console.log("#################################");
    console.log(app.getAppPath());
    console.log("#################################");
    ipcMain.handle('path:join',(event , arg)=>{return path.join(arg.path,arg.file)});
    ipcMain.handle('fs:readdirSync',(event , arg)=>{return fs.readdirSync(arg)});
    ipcMain.handle('fs:statSync',(event , arg)=>{
        const stat = fs.statSync(path.join(arg.path , arg.file));
        return ({
            name:arg.file,
            isFile:stat.isFile(),
            size:stat.isFile()?stat.size:0,
            isDirectory:stat.isDirectory()
        })
    });
    ipcMain.handle('path:dirname',(event , arg)=>{return path.dirname(arg)});
    ipcMain.handle('app:path',(event)=>{return app.getAppPath()});
    ipcMain.handle('get:files',(event,arg)=>{
        if(arg == '' || !arg || arg == undefined || arg == null){
            console.log("NULL");
            return [];
        }
        const result = fs.readdirSync(arg).map((file)=>{
            const stats = fs.statSync(path.join(arg,file));
            const rsObj = {
                name:file,
                size:stats.isFile() ? formatSize(stats.size ?? 0) : null,
                directory: stats.isDirectory()
            }
            return (rsObj);
        }).sort((a,b) => {
            if(a.directory === b.directory){
              return a.name.localeCompare(b.name)
            }
            return a.directory ? -1 : 1
        });
        return result;
    });
    createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})