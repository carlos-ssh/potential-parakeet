// this fetch help us to print data from HTML components
fetch('./components/subscribe.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('subscribe-container').innerHTML = html;
});
