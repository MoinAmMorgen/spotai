const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 550,
    height: 200,
    resizable: false,
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, 
      enableRemoteModule: false, 
      nodeIntegration: false 
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.openDevTools(); // Open DevTools for debugging
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('app-quit', () => {
  console.log('Received app-quit signal. Closing app...');
  app.quit();
});

ipcMain.handle('set-window-size', (event, { width, height }) => {
  win.setSize(width, height);
});

// In this file you can include the rest of your app's specific main process