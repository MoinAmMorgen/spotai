const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => {
            const validChannels = ['app-quit'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        }
    }
});
