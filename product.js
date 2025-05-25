// Sample product data (in real app, fetch from server or JSON)
const products = [
  {
    id: 'f1',
    name: 'Black Headphone One',
    price: 1,
    originalPrice: 2499,
    image: 'https://i.postimg.cc/ydMgrWqS/feature1.png',
    description: 'High quality wireless headphones with deep bass and long battery life.'
  },
  {
    id: 'f2',
    name: 'Speaker Beats Pill',
    price: 7999,
    image: 'https://i.postimg.cc/PJbx34zB/feature2.png',
    description: 'Portable Bluetooth speaker with powerful sound and stylish design.'
  },
  {
    id: 'f3',
    name: 'Apple Air Pods',
    price: 10999,
    image: 'https://i.postimg.cc/KvF4K6mF/feature3.png',
    description: 'True wireless earbuds with active noise cancellation and seamless pairing.'
  },
  {
    id: 'f4',
    name: 'Smart Watch F9 Negro',
    price: 4999,
    image: 'https://i.postimg.cc/RZp0DqKV/feature4.png',
    description: 'Smartwatch with fitness tracking, notifications, and customizable faces.'
  },
  // New Arrivals Products
  {
    id: 'n1',
    name: '',
    price: 3999,
    image: 'https://i.postimg.cc/Hs5KNNMJ/new1.png',
    description: 'Premium black backpack with multiple compartments, perfect for travel and daily use. Features padded laptop sleeve, water-resistant material, and ergonomic design.'
  },
  {
    id: 'n2',
    name: '',
    price: 5999,
    image: 'https://i.postimg.cc/sXq66PD9/new2.png',
    description: 'Elegant quilted black handbag with gold chain strap. Classic design with spacious interior, perfect for both casual and formal occasions.'
  },
  {
    id: 'n3',
    name: '',
    price: 1499,
    image: 'https://i.postimg.cc/rs4hvdD6/new3.png',
    description: 'Classic aviator sunglasses with UV protection. Features premium metal frame and polarized lenses for superior eye protection.'
  },
  {
    id: 'n4',
    name: '',
    price: 29999,
    image: 'https://i.postimg.cc/sDFH5JL3/new4.png',
    description: 'Premium smartwatch with health monitoring, notifications, and customizable watch faces. Water-resistant with long battery life.'
  },
  {
    id: 'n5',
    name: '',
    price: 1299,
    image: 'https://i.postimg.cc/Bnph9fnv/new5.png',
    description: 'Genuine leather wallet with multiple card slots and secure coin pocket. Slim design with RFID protection technology.'
  },
  {
    id: 'n6',
    name: '',
    price: 4999,
    image: 'https://i.postimg.cc/SKtDRL8F/new6.png',
    description: 'Stylish handbag with adjustable shoulder strap. Features high-quality hardware, multiple compartments, and premium finish.'
  },
  {
    id: 'men-backpack',
    name: '',
    price: 4999,
    image: 'https://i.postimg.cc/Df1KXmz4/backpack-Man.png',
    description: 'Premium men\'s backpack designed for urban adventurers. Features durable water-resistant material, padded laptop compartment, multiple storage pockets, and ergonomic shoulder straps for all-day comfort.'
  },
  {
    id: 'women-backpack',
    name: '',
    price: 4499,
    image: 'https://i.postimg.cc/tT0MqtWS/backpack-Woman.png',
    description: 'Elegant women\'s backpack perfect for modern lifestyle. Features sleek design, dedicated laptop sleeve, premium quality materials, and comfortable padded straps. Ideal for work, travel, or daily use.'
  }
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const product = products.find(p => p.id === productId);

const container = document.getElementById('product-detail-container');

if (product) {
  container.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center; justify-content: center;">
      <img src="${product.image}" alt="${product.description}" style="max-width: 300px; width: 100%; border-radius: 8px; background: #fff;">
      <div style="max-width: 400px;">
        ${product.name ? `<h2 style="margin-bottom: 1rem;">${product.name}</h2>` : ''}
        <div style="font-size: 1.5rem; color: #E55947; font-weight: bold; margin-bottom: 1rem;">
          ${product.originalPrice ? 
            `<span style="text-decoration: line-through; color: #606060; font-size: 1.2rem; margin-right: 1rem;">₹${product.originalPrice.toLocaleString('en-IN')}</span>` 
            : ''}
          ₹${product.price.toLocaleString('en-IN')}
        </div>
        <p style="margin-bottom: 2rem; color: #606060;">${product.description}</p>
        <button class="button" id="add-to-cart-btn">ADD TO CART</button>
      </div>
    </div>
  `;
} else {
  container.innerHTML = '<p>Product not found.</p>';
}

// Add to Cart functionality
const addToCartBtn = document.getElementById('add-to-cart-btn');
if (addToCartBtn && product) {
  addToCartBtn.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.description.split('.')[0], // Use first sentence of description as name
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    addToCartBtn.textContent = 'ADDED!';
    setTimeout(() => { addToCartBtn.textContent = 'ADD TO CART'; }, 1200);
  });
} 
