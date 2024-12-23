const close = document.querySelector('.search-clear');
const search = document.querySelector('.search-input');

if (close) {
    close.addEventListener('click', () => {
        search.value = '';
    });
}

search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (!search.value.trim()) return;
        console.log('Custom action for Enter key');
    }
});


//
// Change size of textarea based on its content
//

const response_text = document.querySelector('.response-text');

function adjustHeight() {
    response_text.style.height = response_text.scrollHeight + 'px';
}

search.addEventListener('input', () => {
    if (search.value.trim() === '@sim') {
        console.log('Simulating a response...');
        response_text.value = 'Far far away, behind the word mountains, far from the countries Vokalia';
        response_text.value += ' and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove';
        response_text.value += ' right at the coast of the Semantics, a large language ocean. A small river named';
        response_text.value += ' Duden flows by their place and supplies it with the necessary regelialia. It is a';
        response_text.value += ' paradisematic country, in which roasted parts of sentences fly into your mouth.';
    }
    if (search.value.trim() === '@close') {
        console.log("Closing the app");
        window.electron.ipcRenderer.send('app-quit');
    }
});


setInterval (() => {
    async function setWindowSize(newSize) {
        await window.electron.ipcRenderer.invoke('set-window-size', newSize);
    }
    setWindowSize({ width: 550, height: response_text.scrollHeight + 100 });
    adjustHeight();
}, 1000);

