fetch('./components/help.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('help-container').innerHTML = html;
});
