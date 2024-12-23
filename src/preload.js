const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // Send events to the main process
    send: (channel, data) => {
      const validChannels = ['app-quit']; // Add valid channels here
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    // Invoke events with a response (main -> renderer)
    invoke: async (channel, data) => {
      const validChannels = ['set-window-size']; // Add valid channels here
      if (validChannels.includes(channel)) {
        return await ipcRenderer.invoke(channel, data);
      }
    }
  }
});
