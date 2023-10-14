// this fetch help us to print data from HTML components
fetch('./components/exchange.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('exchange-container').innerHTML = html;
});
