# SARA Store - Modern E-commerce Website

![SARA Store](https://i.postimg.cc/sgtFn03x/footerstore1.png)

SARA Store is a modern, responsive e-commerce website built with HTML, CSS, and JavaScript. It features a clean design, smooth animations, and complete shopping functionality including cart management and secure payment processing.

## 🌟 Features

### 1. Responsive Design
- **Mobile-First Approach**: Fully responsive on all devices
- **Modern UI/UX**: Clean and intuitive interface
- **Smooth Animations**: Enhanced user experience with subtle animations
- **Grid Layout System**: Flexible and responsive product layouts

### 2. Product Management
- **Featured Products**: Showcase special items with prominence
- **New Arrivals**: Dedicated section for latest products
- **Collections**: Organized product categories (Men's/Women's)
- **Product Details**: Comprehensive product information pages
- **Dynamic Pricing**: Support for original and discounted prices

### 3. Shopping Cart
- **Real-time Updates**: Instant cart modifications
- **Quantity Management**: Easy increase/decrease of items
- **Price Calculations**: Automatic total calculation
- **Persistent Storage**: Cart data saved in localStorage
- **Remove Items**: Simple item removal functionality

### 4. Payment Integration
- **Razorpay Integration**: Secure payment processing
- **Multiple Payment Methods**: Support for:
  - Credit/Debit Cards
  - UPI
  - Net Banking
- **Order Summary**: Clear breakdown of charges
- **Success/Failure Handling**: Proper payment status management

### 5. User Policies
- **Shipping Policy**: Clear delivery timelines (within one week)
- **Cancellation & Refund**: Easy 1-2 day refund process
- **Privacy Policy**: Comprehensive data protection guidelines
- **Terms & Conditions**: Detailed user agreement

### 6. Customer Support
- **Contact Information**: Direct phone support (7999552366)
- **Business Hours**: Monday to Saturday, 9:00 AM to 6:00 PM
- **Social Media**: Integration with Facebook, Instagram, and YouTube
- **Newsletter**: Email subscription for updates

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SARA-store.git
   ```

2. Open index.html in your browser or set up a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Configure Razorpay:
   - Sign up for a Razorpay account
   - Replace `rzp_test_YOUR_KEY_HERE` in payment.js with your key
   - Add your domain to Razorpay's allowed domains

## 💻 Technical Details

### File Structure
```
SARA-store/
├── index.html          # Main landing page
├── style.css          # Global styles
├── main.js           # Core functionality
├── cart.js          # Shopping cart logic
├── payment.js       # Razorpay integration
├── cart.css        # Cart-specific styles
└── policies/       # Policy pages
```

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript**: ES6+ features
- **Razorpay**: Payment processing
- **BoxIcons**: Icon library
- **LocalStorage**: Cart data persistence

### Key Components
1. **Navigation System**
   - Responsive menu
   - Cart icon with item count
   - Smooth scroll to sections

2. **Product Display**
   - Grid-based layout
   - Hover effects
   - Quick view options
   - Price display with discounts

3. **Cart System**
   - Add/Remove items
   - Quantity adjustment
   - Total calculation
   - Local storage sync

4. **Payment Flow**
   - Cart summary
   - Razorpay integration
   - Success/Failure handling
   - Order confirmation

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Features
- Secure payment processing
- Data encryption
- Privacy policy compliance
- Secure cart management

## 🛠 Development
To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For support or queries:
- Phone: 7999552366
- Hours: Monday to Saturday, 9:00 AM to 6:00 PM
- Follow us on social media for updates

---
Made with ❤️ by SARA Store Team
