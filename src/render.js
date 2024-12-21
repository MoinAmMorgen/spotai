const close = document.getElementById('search-clear')
const search = document.getElementById('search-input')

close.addEventListener('click', () => {
    search.value = ''
});
