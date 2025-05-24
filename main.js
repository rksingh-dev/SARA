// Music Player Functionality
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const musicToggle = document.querySelector('.music-toggle');
    const musicWaves = document.querySelector('.music-waves');
    const playIcon = musicToggle.querySelector('i');
    
    let isPlaying = false;

    // Function to play music
    function playMusic() {
        audio.volume = 0.3; // Set a comfortable volume
        audio.play()
            .then(() => {
                isPlaying = true;
                updateMusicUI();
            })
            .catch(error => {
                console.error('Error playing audio:', error);
            });
    }

    // Function to pause music
    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        updateMusicUI();
    }

    // Update UI based on music state
    function updateMusicUI() {
        if (isPlaying) {
            playIcon.classList.remove('bx-play');
            playIcon.classList.add('bx-pause');
            musicWaves.classList.remove('paused');
            musicToggle.style.background = 'var(--first-color-alt)';
        } else {
            playIcon.classList.remove('bx-pause');
            playIcon.classList.add('bx-play');
            musicWaves.classList.add('paused');
            musicToggle.style.background = 'var(--first-color)';
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            audio.pause();
        } else if (!document.hidden && isPlaying) {
            audio.play().catch(console.error);
        }
    });

    // Store music state in localStorage
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicPlaying', isPlaying);
    });

    // Restore music state on page load
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    if (wasPlaying) {
        playMusic();
    }

    // Initialize UI
    updateMusicUI();
});

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

// Cart functionality and animations
let cartCount = 0;
const cartIcon = document.querySelector('.nav-cart');

// Create cart count badge
const cartCountBadge = document.createElement('span');
cartCountBadge.classList.add('cart-count');
cartCountBadge.textContent = '0';
cartIcon.appendChild(cartCountBadge);

// Enhanced Add to Cart Animation
function addToCart(button, productId) {
    // Prevent multiple clicks
    if (button.classList.contains('adding')) return;
    
    // Wrap button text in span if not already wrapped
    if (!button.querySelector('span')) {
        button.innerHTML = `<span>${button.textContent}</span>`;
    }
    
    const buttonText = button.querySelector('span');
    const originalText = buttonText.textContent;
    
    button.classList.add('adding');
    button.classList.add('cart-animation');
    
    // Fade out current text
    buttonText.classList.add('text-fade-out');
    
    setTimeout(() => {
        buttonText.textContent = 'ADDING...';
        buttonText.classList.remove('text-fade-out');
        buttonText.classList.add('text-fade-in');
    }, 300);

    // Animate the cart icon
    cartIcon.classList.add('cart-bounce');
    
    // Simulate item flying to cart
    const itemFly = document.createElement('div');
    const buttonRect = button.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    itemFly.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--first-color);
        border-radius: 50%;
        z-index: 9999;
        left: ${buttonRect.left + buttonRect.width / 2}px;
        top: ${buttonRect.top + buttonRect.height / 2}px;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
    `;
    
    document.body.appendChild(itemFly);
    
    // Trigger animation
    setTimeout(() => {
        itemFly.style.transform = `translate(
            ${cartRect.left - buttonRect.left}px,
            ${cartRect.top - buttonRect.top}px
        ) scale(0)`;
    }, 50);

    // Update cart count with animation
    setTimeout(() => {
        cartCount++;
        cartCountBadge.textContent = cartCount;
        cartCountBadge.classList.add('show');
        
        // Remove flying item
        itemFly.remove();
        
        // Transition to "ADDED TO CART"
        buttonText.classList.remove('text-fade-in');
        buttonText.classList.add('text-fade-out');
        
        setTimeout(() => {
            buttonText.textContent = 'ADDED TO CART';
            buttonText.classList.remove('text-fade-out');
            buttonText.classList.add('text-fade-in');
            button.classList.remove('adding');
            button.classList.add('added');
            
            // Store item in cart
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            cartItems.push(productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Smooth transition back to original state
            setTimeout(() => {
                buttonText.classList.remove('text-fade-in');
                buttonText.classList.add('text-fade-out');
                
                setTimeout(() => {
                    button.classList.add('reset-transition');
                    buttonText.textContent = originalText;
                    buttonText.classList.remove('text-fade-out');
                    buttonText.classList.add('text-fade-in');
                    
                    // Clean up classes
                    setTimeout(() => {
                        button.classList.remove('added', 'reset-transition', 'cart-animation');
                        buttonText.classList.remove('text-fade-in');
                    }, 6600);
                }, 600);
            }, 1500);
        }, 600);
    }, 800);
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Wrap existing button text in spans
    document.querySelectorAll('.add-to-cart').forEach(button => {
        if (!button.querySelector('span')) {
            button.innerHTML = `<span>${button.textContent}</span>`;
        }
    });

    // Rest of the initialization code...
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartCount = cartItems.length;
    if (cartCount > 0) {
        cartCountBadge.textContent = cartCount;
        cartCountBadge.classList.add('show');
    }
});

// Enhanced cart icon animation
cartIcon.addEventListener('click', () => {
    cartIcon.classList.add('cart-animation');
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 300);
});

// Remove animation classes when animation ends
cartIcon.addEventListener('animationend', () => {
    cartIcon.classList.remove('cart-animation', 'cart-bounce');
});

// Add to cart functionality for featured products
document.querySelectorAll('.featured-product').forEach((product, idx) => {
    const btn = product.querySelector('.featured-link .button');
    if (btn) {
        btn.classList.add('add-to-cart');
        btn.onclick = (e) => {
            e.preventDefault();
            addToCart(btn, `featured-${idx}`);
        };
    }
});

// Add to cart functionality for new products
document.querySelectorAll('.new-box').forEach((product, idx) => {
    const btn = product.querySelector('.new-link .button');
    if (btn) {
        btn.classList.add('add-to-cart');
        btn.onclick = (e) => {
            e.preventDefault();
            addToCart(btn, `new-${idx}`);
        };
    }
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
