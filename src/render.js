import { GoogleGenerativeAI } from './../node_modules/@google/generative-ai/dist/index.mjs';

const close = document.querySelector('.search-clear');
const search = document.querySelector('.search-input');
const response_text = document.querySelector('.response-text');

if (close) {
    close.addEventListener('click', () => {
        search.value = '';
    });
}

search.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (!search.value.trim()) return;
        const apiKey = "AIzaSyA36Z9yIc1zs-dlVH6N8QnwsVNFW1scXe8";
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = search.value;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        response_text.value = response.text();
        if (response_text) {
            search.value = '';
        }
    }
});


//
// Change size of textarea based on its content
//

function adjustHeight() {
    response_text.style.height = response_text.scrollHeight + 'px';
}

search.addEventListener('input', async () => {
    if (search.value.trim() === '@sim') {
        console.log('Simulating a response');
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
    if (search.value.trim() === '@clear') {
        console.log("Clearing the response text");
        response_text.value = '';
        response_text.style.height = '0px';
        response_text.style.overflowY = 'hidden';
        await window.electron.ipcRenderer.invoke('set-window-size', { width: 550, height: 200 });
    }
});


setInterval (() => {
    async function setWindowSize(newSize) {
        await window.electron.ipcRenderer.invoke('set-window-size', newSize);
    }
    let window_height = response_text.scrollHeight + 100;
    if (window_height > 400) {
        window_height = 400;
        response_text.style.overflowY = 'scroll';
    } else {
        response_text.style.overflowY = 'hidden';
    }
    setWindowSize({ width: 550, height: window_height });
    adjustHeight();
}, 1000);

