const mainNav = document.getElementById('nav-links');
const hamburgerNav = document.getElementById('js-navbar-toggle');

hamburgerNav.addEventListener('click', () => {
    mainNav.classList.toggle('active');

    if (mainNav.classList.contains('active')) {
        hamburgerNav.innerHTML = "<i class='fas fa-times'></i>";
    } else {
        hamburgerNav.innerHTML = "<i class='fas fa-bars'></i>";
    }
});
