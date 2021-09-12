export default function initiateHeader() {
    document.querySelector('.header__btn-menu').addEventListener('click',function(e){
        const nav = document.querySelector(".header__nav");
        if (nav.classList.contains('invisible')) {
            nav.classList.remove('invisible'); 
            nav.classList.add('visible'); 
        } else {
            nav.classList.remove('visible'); 
            nav.classList.add('invisible'); 
        }
    });

    const links = Array.from(document.querySelectorAll('.header__menu a'));
    links.forEach(anchor => {
        const currentHref = new URL(anchor.href).pathname;
        if (currentHref && location.pathname === currentHref) {
            anchor.classList.add('header__link--active');
        } else {
            anchor.classList.remove('header__link--active');
        }
    })
}