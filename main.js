//Mobile Menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav){ toggle.addEventListener('click', () => { nav.classList.toggle('show'); }) } 
}

showMenu('nav-toggle','nav-menu');

// Toggling Mobile Menu when a navlink is clicked
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Cart icon navigation
const cartIcon = document.querySelector('.nav-cart');
cartIcon.addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// View Product button navigation for featured products
const featuredIds = ['f1', 'f2', 'f3', 'f4'];
document.querySelectorAll('.featured-product').forEach((product, idx) => {
    const btn = product.querySelector('.featured-link .button');
    if (btn) {
        btn.textContent = 'VIEW PRODUCT';
        btn.onclick = () => {
            window.location.href = `product.html?id=${featuredIds[idx]}`;
        };
    }
});

// View Product button navigation for new products
const newIds = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'];
document.querySelectorAll('.new-box').forEach((product, idx) => {
    const btn = product.querySelector('.new-link .button');
    if (btn) {
        btn.textContent = 'VIEW PRODUCT';
        btn.onclick = () => {
            window.location.href = `product.html?id=${newIds[idx]}`;
        };
    }
}); 