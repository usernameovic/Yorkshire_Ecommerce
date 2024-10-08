/* ------------- ANIMIRAMO HEADER --------- */
gsap.to(document.querySelector('#logo'), { x: 0, duration: 1, ease: 'power2.out' });
gsap.to(document.querySelector('nav'), { x: 0, duration: 1, ease: 'power2.out' });
gsap.to(document.querySelector('#hamburger-menu-icon'), { y: 0, duration: 1, ease: 'power2.out'});





/* ------------- ANIMIRAMO FORMU --------- */
const contactMessageForm = document.getElementById('contact-message-form');
const animation = gsap.from(contactMessageForm, {
    y: 150,
    duration: 1.2,
    ease: 'bounce',
});


window.addEventListener('load', () => {
    animation.play();
});



const formContact = contactMessageForm.querySelector('.form-contact');
gsap.from(formContact, {
    scale: '1.6',
    duration: .8,
    opacity: 0,
    scrollTrigger: {
        trigger: formContact,
    }
});
