// Razorpay payment integration
function showThankYouPopup(paymentId) {
    // Create popup elements
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;

    popup.innerHTML = `
        <h2 style="color: #E55947; margin-bottom: 1rem;">Thank You for Your Purchase!</h2>
        <p style="margin-bottom: 1.5rem;">Your order has been successfully placed.</p>
        <p style="color: #606060; margin-bottom: 1.5rem;">Payment ID: ${paymentId}</p>
        <button class="button" style="background: #E55947; color: white; border: none; padding: 0.5rem 1rem; cursor: pointer;">Continue Shopping</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add click handler to the continue shopping button
    const continueBtn = popup.querySelector('button');
    continueBtn.addEventListener('click', () => {
        overlay.remove();
        window.location.href = "index.html";
    });
}

function initializeRazorpay(totalAmount) {
    // Get the Razorpay key from environment or configuration
    const razorpayKey = "rzp_live_nvxqYOmvrMDGB4"; // Live Razorpay key

    // Validate the key format
    if (!razorpayKey || !razorpayKey.startsWith('rzp_test_') && !razorpayKey.startsWith('rzp_live_')) {
        console.error('Invalid Razorpay key format');
        alert('Payment system is not properly configured. Please contact support.');
        return;
    }

    const options = {
        key: razorpayKey,
        amount: totalAmount * 100, // Convert amount to paise
        currency: "INR",
        name: "SARA Store",
        description: "Purchase from SARA Store",
        image: "https://i.postimg.cc/sgtFn03x/footerstore1.png",
        handler: function (response) {
            // Clear cart after successful payment
            localStorage.removeItem('cart');
            // Show custom thank you popup without default alert
            showThankYouPopup(response.razorpay_payment_id);
        },
        prefill: {
            name: "",
            email: "",
            contact: ""
        },
        theme: {
            color: "#E55947"
        },
        modal: {
            escape: false,
            ondismiss: function() {
                console.log('Payment modal closed');
            }
        },
        config: {
            display: {
                blocks: {
                    banks: {
                        name: "Pay using UPI",
                        instruments: [
                            {
                                method: "upi"
                            }
                        ]
                    },
                    cards: {
                        name: "Pay using Cards",
                        instruments: [
                            {
                                method: "card"
                            }
                        ]
                    }
                },
                sequence: ["block.banks", "block.cards"],
                preferences: {
                    show_default_blocks: true
                }
            }
        }
    };

    try {
        const rzp = new Razorpay(options);
        
        // Handle payment success
        rzp.on('payment.success', function (response) {
            console.log('Payment successful:', response);
        });

        // Handle payment failure
        rzp.on('payment.failed', function (response) {
            console.error("Payment failed:", response.error);
            alert("Payment Failed: " + response.error.description);
        });

        // Handle payment error
        rzp.on('payment.error', function (response) {
            console.error("Payment error:", response.error);
            alert("Payment Error: " + response.error.description);
        });

        // Open the payment modal
        rzp.open();
    } catch (error) {
        console.error("Error initializing Razorpay:", error);
        alert("Unable to initialize payment. Please try again later.");
    }
}

// Function to calculate cart total and initialize payment
function handleCheckout(event) {
    // Prevent any default behavior
    if (event) {
        event.preventDefault();
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (totalAmount === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Initialize payment without any default alerts
    initializeRazorpay(totalAmount);
} 
