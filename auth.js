// Magic.link authentication logic
let magic;
let retryCount = 0;
const MAX_RETRIES = 3;

function initializeMagic() {
    try {
        magic = new Magic('pk_live_553444119EF570C8');
        return true;
    } catch (error) {
        console.error('Magic initialization error:', error);
        return false;
    }
}

// Try to initialize Magic with retries
function initializeWithRetry() {
    if (retryCount >= MAX_RETRIES) {
        document.getElementById('auth-error').textContent = 'Authentication service is currently unavailable. Please try again later.';
        document.getElementById('auth-error').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
        return;
    }

    if (!initializeMagic()) {
        retryCount++;
        setTimeout(initializeWithRetry, 1000); // Retry after 1 second
    }
}

initializeWithRetry();

const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('auth-message');
const errorDiv = document.getElementById('auth-error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;
    
    messageDiv.textContent = 'Sending magic link...';
    messageDiv.style.color = 'var(--dark-color-light)';
    errorDiv.style.display = 'none';
    
    try {
        if (!magic) {
            throw new Error('Magic not initialized');
        }
        await magic.auth.loginWithEmailOTP({ email });
        localStorage.setItem('sara_auth', 'true');
        window.location.href = 'index.html';
    } catch (err) {
        console.error('Auth error:', err);
        if (err.message.includes('unauthorized domain')) {
            errorDiv.textContent = 'Please contact support: Authentication domain not configured.';
            errorDiv.style.display = 'block';
        } else {
            messageDiv.textContent = 'Authentication failed. Please try again.';
            messageDiv.style.color = 'var(--first-color)';
        }
    }
});

// Exported function for other pages to check authentication
window.isSaraAuthenticated = async function() {
    try {
        if (!magic) {
            return false;
        }
        const isLoggedIn = await magic.user.isLoggedIn();
        return isLoggedIn;
    } catch (err) {
        console.error('Auth check error:', err);
        return false;
    }
} 
