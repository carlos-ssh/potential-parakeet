// this fetch help us to print data from HTML components
fetch('./components/footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer-container').innerHTML = html;
});
