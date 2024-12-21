const close = document.querySelector('.search-clear');
const search = document.querySelector('.search-input');

if (close) {
    close.addEventListener('click', () => {
        search.value = '';
    });
}
search.addEventListener('input', () => {
        if (search.value.trim() === '@close') {
            console.log("Closing the app");
            window.electron.ipcRenderer.send('app-quit');
        }
});

search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        console.log('Custom action for Enter key');
    }
});