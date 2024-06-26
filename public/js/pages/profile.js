// Redirection
if (!localStorage.getItem('token') && location.pathname === '/profile') {
    location.href = '/';
}












/* ------------------------------------------------------- IMPORTS ------------------------------------------------------- */



/* Fetch logika */
import updateProducts from '../modules/add_to_cart.js';


/* Korpa */
import Cart from '../classes/Cart.js'


/* Korisnik */
import Profile from '../classes/Profile.js';


/* Event listeners callback funkcije */
import {
    headerToggler,
    backToTopButtonToggler,
    scrollToTop,
    showCart,
    xHidesCart,
    overlayHidesCart,
    scrollToProductSection,
    scrollToWhatWeDoSection,
    scrollToCustomerReviewsSection,
    toggleHamburgerMenu,
    switchCategory,
    emptyTheCart
} from '../modules/listeners_callbacks.js';
/* ----------------------------------------------------------------------------------------------------------------------- */





/* --------------------------------------------------------------------------------------
------------------------------- KREIRAMO INSTANCU KLASE 'Cart' --------------------------------
--------------------------------------------------------------------------------------*/

const shoppingCart = new Cart();
// Po otvaranju stranice inicijalno prikazujemo proizvode iz kategorije 'Retro Football Jerseys'.
updateProducts('Retro Football Jerseys');


const checkoutButton = document.getElementById('checkout-button');
const clearCartButton = document.getElementById('clear-cart-button');

checkoutButton.addEventListener('click', e => {
    shoppingCart.checkout();
});

// Azuriramo status 'CHECKOUT' i 'Remove All' buttona u korpi po otvaranju stranice
update_checkout_removeAll_buttonsStatus();













// Event listener na 'select' elementu za prikazivanje proizvoda iz izabrane kategorije
const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', () => {
    switchCategory(categorySelect, updateProducts, update_addToCartButtonsStatus);
});









// Sticky header
window.addEventListener('scroll', headerToggler);

// Back to top button vidljivost
window.addEventListener('scroll', backToTopButtonToggler);




// Nazad na vrh stranice
document.querySelector('.scroll-to-top-button').addEventListener('click', scrollToTop);



/* ---------------------- OTVARANJE I ZATVARANJE KORPE -------------------*/
const cartIcon = document.querySelector('.cart-icon');
const closeButton = document.querySelector('.x');
const cartToggler = document.querySelector('.cart-toggler-wrapper');

// Prikaz korpe klikom na cart ikonicu
cartIcon.addEventListener('click', () => {
    showCart(cartToggler, shoppingCart);
});

// Zatvaranje korpe klikom na 'X'
closeButton.addEventListener('click', () => {
    xHidesCart(cartToggler)
});

// Zatvaranje korpe klikom na overlay
cartToggler.addEventListener('click', e => {
    if (e.target === cartToggler) {
        overlayHidesCart(cartToggler)
    }
});








/* ------------------------------------------------------            SMOOTH SCROLL LISTENERI              ---------------------------------------------------- */
/* -------------------- Smooth scroll sa vrha do 'PRODUCTS' sekcije -------------------- */
document.querySelector('#animate-arrow').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

/* --------------------- Smooth scroll do 'WHAT WE DO' sekcije --------------------- */
document.querySelector('#learn-more-button').addEventListener('click', () => {
    scrollToWhatWeDoSection(document.querySelector('.what-we-do-section'));
});

/* --------------------- Smooth scroll do 'PRODUCTS' sekcije --------------------- */
document.querySelector('#fa-products-section-trigger').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

/* --------------------- Smooth scroll do 'CUSTOMER REVIEWS' sekcije --------------------- */
document.querySelector('#fa-customer-products-section-trigger').addEventListener('click', () => {
    scrollToCustomerReviewsSection(document.querySelector('.customer-reviews-section'));
});







/* --------------------- HAMBURGER MENU --------------------- */
const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');

hamburgerMenuIcon.addEventListener('click', () => {
    toggleHamburgerMenu(nav, document.querySelector('header'));
});













// Praznimo korpu
clearCartButton.addEventListener('click', () => {
    emptyTheCart(shoppingCart, update_addToCartButtonsStatus);
});







/* Funkcija za omogucavanje ili onemogucavanje 'CHECKOUT' i 'Remove All' buttona
na osnovu stanja korpe */ 
function update_checkout_removeAll_buttonsStatus() {
    if (shoppingCart.isEmpty()) {
        checkoutButton.disabled = true;
        clearCartButton.disabled = true;
    } else {
        checkoutButton.disabled = false;
        clearCartButton.disabled = false;
    }
}




/* Funkcija za omogucavanje ili onemogucavanje pojedinacnog 'ADD TO CART' button-a
na osnovu toga da li je taj proizvod vec u korpi */
function update_addToCartButtonsStatus() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        const productID = button.getAttribute('data-product-id'); 
        button.disabled = isProductInCart(productID);    
    });
}





// Funkcija za provjeravanje da li je proizvod dodat u korpu da bismo manipulisali stanjem 'ADD TO CART' buttona
function isProductInCart(productID) {
    /* Array.some() metoda prolazi kroz proizvode u korpi i u slucaju da u njoj postoji proizvod ciji se 'id'
       poklapa sa 'data-product-id'-jem odredjenog button-a, ona vraca boolean 'true' i postavlja vrijednost
       'disabled' atributa button-a na 'true' i obrnuto */
    return shoppingCart.items.some(item => item.product._id == productID);
}
















/* --------------------------------------------------------------------------------------
 ------------------------------- KREIRAMO INSTANCU KLASE 'Profile' --------------------------------
 --------------------------------------------------------------------------------------*/
 window.addEventListener('DOMContentLoaded', () => {
    const newModifiedUsername = document.querySelector('#new-modified-username');
    const newModifiedPassword = document.querySelector('#new-modified-password');
    const currentUserPassword = document.querySelector('#current-user-password');
    const confirmAccountDeletionPassword = document.querySelector('#confirm-account-deletion-password');
    const profile = new Profile(newModifiedUsername, newModifiedPassword, currentUserPassword, confirmAccountDeletionPassword);
 });


















/* ------------------------------------------------------- EXPORTS ------------------------------------------------------- */
export {
    update_checkout_removeAll_buttonsStatus,
    update_addToCartButtonsStatus,
    isProductInCart,
    shoppingCart,
}
