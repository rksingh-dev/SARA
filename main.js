// Animation Observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        animationObserver.observe(section);
    });

    // Animate products with slide-up
    const products = document.querySelectorAll('.featured-product, .new-box');
    products.forEach(product => {
        product.classList.add('slide-up');
        animationObserver.observe(product);
    });

    // Animate collection boxes with scale-in
    const collections = document.querySelectorAll('.collection-box');
    collections.forEach(collection => {
        collection.classList.add('scale-in');
        animationObserver.observe(collection);
    });

    // Home section parallax effect
    const homeImg = document.querySelector('.home-img');
    const homeTitle = document.querySelector('.home-title');
    
    if (homeImg && homeTitle) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            // Parallax effect for home image
            homeImg.style.transform = `translate3d(0, ${rate}px, 0)`;
            
            // Fade out effect for title
            const opacity = 1 - (scrolled / 500);
            homeTitle.style.opacity = opacity > 0 ? opacity : 0;
        });
    }
});

//Mobile Menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav){ 
        toggle.addEventListener('click', () => { 
            nav.classList.toggle('show');
            // Add slide animation to menu items
            const menuItems = nav.querySelectorAll('.nav-item');
            menuItems.forEach((item, index) => {
                item.style.animation = item.style.animation ? '' : `slideUp 0.3s ease forwards ${index * 0.1}s`;
            });
        });
    } 
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

// Cart icon navigation with animation
const cartIcon = document.querySelector('.nav-cart');
cartIcon.addEventListener('click', () => {
    cartIcon.style.transform = 'scale(0.8)';
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 200);
});

// Smooth animation for buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// View Product button navigation for featured products
const featuredIds = ['f1', 'f2', 'f3', 'f4'];
document.querySelectorAll('.featured-product').forEach((product, idx) => {
    const btn = product.querySelector('.featured-link .button');
    if (btn) {
        btn.textContent = 'VIEW PRODUCT';
        btn.onclick = () => {
            btn.classList.add('scale-in');
            setTimeout(() => {
                window.location.href = `product.html?id=${featuredIds[idx]}`;
            }, 300);
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
            btn.classList.add('scale-in');
            setTimeout(() => {
                window.location.href = `product.html?id=${newIds[idx]}`;
            }, 300);
        };
    }
}); 
