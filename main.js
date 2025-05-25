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

// Wallet connect logic
window.addEventListener('DOMContentLoaded', async () => {
  // Initialize Magic SDK for email OTP
  const magic = new Magic('pk_live_553444119EF570C8', { network: 'mainnet' });
  
  const connectBtn = document.getElementById('connect-wallet-btn');
  const addressSpan = document.getElementById('wallet-address');

  // Hide the original navbar elements
  if (connectBtn) connectBtn.style.display = 'none';
  if (addressSpan) addressSpan.style.display = 'none';

  // Create wallet section container
  const walletSection = document.createElement('div');
  walletSection.className = 'wallet-section';
  walletSection.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  `;

  // Create wallet status container
  const walletStatusContainer = document.createElement('div');
  walletStatusContainer.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 0.8rem 1.2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(223, 96, 79, 0.1);
    min-width: 200px;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
  `;

  // Create wallet icon
  const walletIcon = document.createElement('i');
  walletIcon.className = 'bx bxs-wallet';
  walletIcon.style.cssText = `
    font-size: 1.5rem;
    color: var(--first-color);
  `;

  // Create wallet status text
  const walletStatus = document.createElement('span');
  walletStatus.style.cssText = `
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    color: var(--dark-color);
  `;

  // Create wallet details container
  const walletDetails = document.createElement('div');
  walletDetails.style.cssText = `
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 1.2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: none;
    min-width: 300px;
    border: 1px solid rgba(223, 96, 79, 0.1);
    backdrop-filter: blur(10px);
    margin-bottom: 0.5rem;
  `;

  // Add elements to DOM
  walletStatusContainer.appendChild(walletIcon);
  walletStatusContainer.appendChild(walletStatus);
  walletSection.appendChild(walletDetails);
  walletSection.appendChild(walletStatusContainer);
  document.body.appendChild(walletSection);

  // Add hover effect
  walletStatusContainer.addEventListener('mouseenter', () => {
    walletStatusContainer.style.background = 'rgba(223, 96, 79, 0.05)';
    walletStatusContainer.style.transform = 'translateY(-2px)';
  });

  walletStatusContainer.addEventListener('mouseleave', () => {
    walletStatusContainer.style.background = 'rgba(255, 255, 255, 0.95)';
    walletStatusContainer.style.transform = 'translateY(0)';
  });

  // Toggle wallet details
  walletStatusContainer.addEventListener('click', () => {
    const isVisible = walletDetails.style.display === 'block';
    walletDetails.style.display = isVisible ? 'none' : 'block';
  });

  // Close wallet details when clicking outside
  document.addEventListener('click', (e) => {
    if (!walletSection.contains(e.target)) {
      walletDetails.style.display = 'none';
    }
  });

  async function showWalletAddress() {
    try {
      // Clear any existing wallet display first
      walletSection.style.display = 'none';

      // Check authentication methods
      const isMetaMaskConnected = localStorage.getItem('walletType') === 'metamask';
      const isEmailAuthenticated = localStorage.getItem('sara_auth');

      // If logged in with email only
      if (isEmailAuthenticated && !isMetaMaskConnected) {
        // Don't show wallet section for email login
        walletSection.style.display = 'none';
        return;
      }

      // If logged in with MetaMask
      if (isMetaMaskConnected) {
        await connectMetaMask();
        return;
      }

      // If not logged in at all
      walletStatus.textContent = 'Connect Wallet';
      walletSection.style.display = 'none';
    } catch (err) {
      console.error('Error showing wallet address:', err);
      walletStatus.textContent = 'Connection Error';
      walletSection.style.display = 'none';
    }
  }

  async function connectMetaMask() {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      if (address) {
        walletStatus.textContent = 'Connected';
        walletSection.style.display = 'flex';
        
        // Get ETH balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
        
        // Update wallet details content
        walletDetails.innerHTML = `
          <div style="margin-bottom: 1.5rem;">
            <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">MetaMask Wallet</div>
            <div style="
              background: rgba(248, 248, 248, 0.8);
              padding: 1rem;
              border-radius: 8px;
              font-family: monospace;
              font-size: 0.9rem;
              word-break: break-all;
              color: var(--dark-color);
              border: 1px solid rgba(0, 0, 0, 0.05);
            ">${address}</div>
          </div>
          <div style="margin-bottom: 1rem;">
            <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">Balance</div>
            <div style="
              background: rgba(248, 248, 248, 0.8);
              padding: 0.8rem;
              border-radius: 8px;
              font-family: 'Montserrat', sans-serif;
              font-size: 0.9rem;
              color: var(--dark-color);
              border: 1px solid rgba(0, 0, 0, 0.05);
            ">${ethBalance} ETH</div>
          </div>
          <div style="margin-bottom: 1rem;">
            <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">Network</div>
            <div style="
              background: rgba(248, 248, 248, 0.8);
              padding: 0.8rem;
              border-radius: 8px;
              font-family: 'Montserrat', sans-serif;
              font-size: 0.9rem;
              color: var(--dark-color);
              border: 1px solid rgba(0, 0, 0, 0.05);
            ">${window.ethereum.networkVersion === '1' ? 'Ethereum Mainnet' : 'Test Network'}</div>
          </div>
          <div style="margin-bottom: 1rem;">
            <button id="view-transactions" style="
              width: 100%;
              padding: 0.8rem;
              background: var(--first-color);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-family: 'Montserrat', sans-serif;
              transition: all 0.3s ease;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-size: 0.9rem;
              margin-bottom: 0.5rem;
            ">View Transactions</button>
            <button id="disconnect-wallet" style="
              width: 100%;
              padding: 0.8rem;
              background: var(--first-color);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-family: 'Montserrat', sans-serif;
              transition: all 0.3s ease;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-size: 0.9rem;
            ">Disconnect Wallet</button>
          </div>
        `;

        // Add view transactions functionality
        document.getElementById('view-transactions').addEventListener('click', () => {
          const network = window.ethereum.networkVersion === '1' ? '' : 'goerli.';
          window.open(`https://${network}etherscan.io/address/${address}`, '_blank');
        });

        // Add disconnect functionality
        document.getElementById('disconnect-wallet').addEventListener('click', async () => {
          try {
            localStorage.removeItem('walletConnected');
            localStorage.removeItem('walletType');
            localStorage.removeItem('walletAddress');
            window.location.href = 'auth.html';
          } catch (err) {
            console.error('Disconnect error:', err);
          }
        });

        // Store connection state
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletType', 'metamask');
        localStorage.setItem('walletAddress', address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      walletStatus.textContent = 'Connection Failed';
      if (error.message === 'MetaMask is not installed') {
        alert('Please install MetaMask to connect your wallet');
      }
    }
  }

  // Show wallet address on page load if already logged in
  showWalletAddress();

  // Add click handler to connect wallet
  walletStatusContainer.addEventListener('click', async () => {
    if (walletStatus.textContent === 'Connect Wallet') {
      // Show connection options
      walletDetails.innerHTML = `
        <div style="margin-bottom: 1rem;">
          <h3 style="margin-bottom: 1rem; font-size: 1rem; color: var(--dark-color);">Choose Connection Method</h3>
          <button id="connect-metamask" style="
            width: 100%;
            padding: 0.8rem;
            background: #E2761B;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          ">Connect with MetaMask</button>
          <button id="connect-email" style="
            width: 100%;
            padding: 0.8rem;
            background: var(--first-color);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 0.9rem;
          ">Connect with Email</button>
        </div>
      `;

      walletDetails.style.display = 'block';

      // Add click handlers for connection options
      document.getElementById('connect-metamask').addEventListener('click', async () => {
        await connectMetaMask();
      });

      document.getElementById('connect-email').addEventListener('click', () => {
        window.location.href = 'auth.html';
      });
    }
  });

  // Listen for MetaMask account changes
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length === 0) {
        // User disconnected their wallet
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletType');
        walletSection.style.display = 'none';
      } else {
        // Account changed, update the display
        connectMetaMask();
      }
    });

    window.ethereum.on('chainChanged', function () {
      // Reload the page when the chain changes
      window.location.reload();
    });
  }
}); 
