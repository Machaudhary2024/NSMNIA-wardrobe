// Image showcase functionality
const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
  imgItem.addEventListener('click', (event) => {
    event.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});

function slideImage() {
  const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
  document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  const addToCartBtn = document.querySelector('.purchase-info .btn');
  const quantityInput = document.querySelector('.purchase-info input');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isLoggedIn) {
        alert('Please log in to add items to your cart.');
        window.location.href = '../login.html';
        return;
      }
      
      // Get product details
      const productTitle = document.querySelector('.product-title').textContent;
      const productPrice = document.querySelector('.new-price span').textContent.split('(')[0].replace('Rs.', '').trim();
      const productImage = document.querySelector('.img-showcase img:first-child').src;
      const quantity = parseInt(quantityInput.value);
      
      if (quantity <= 0) {
        alert('Please select a valid quantity.');
        return;
      }
      
      // Get existing cart or create new one
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex(item => item.title === productTitle);
      
      if (existingProductIndex !== -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.push({
          title: productTitle,
          price: productPrice,
          image: productImage,
          quantity: quantity
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Show success message
      alert(`${quantity} ${productTitle} added to your cart!`);
      
      // Update cart count if needed
      updateCartCount();
    });
  }
  
  // Update the welcome message and logout button visibility based on login status
  function updateUserInterface() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    const welcomeMessage = document.querySelector('.welcome-message');
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.querySelector('.loginbtn');
    
    if (isLoggedIn && userEmail) {
      // Show welcome message with user's email
      welcomeMessage.textContent = `Welcome, ${userEmail.split('@')[0]}!`;
      welcomeMessage.classList.add('visible');
      
      // Show logout button and hide login button
      logoutBtn.classList.add('visible');
      if (loginBtn) loginBtn.style.display = 'none';
    } else {
      // Hide welcome message and logout button, show login button
      welcomeMessage.classList.remove('visible');
      logoutBtn.classList.remove('visible');
      if (loginBtn) loginBtn.style.display = 'block';
    }
  }
  
  // Update cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // If you have a cart count element, update it here
    // const cartCountElement = document.querySelector('.cart-count');
    // if (cartCountElement) {
    //   cartCountElement.textContent = totalItems;
    // }
  }
  
  // Update UI on page load
  updateUserInterface();
  updateCartCount();
  
  // Add event listener for logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      // Clear login status
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userEmail');
      
      // Update UI
      updateUserInterface();
      
      // Show logout message
      alert('You have been logged out successfully.');
      
      // Redirect to homepage
      window.location.href = '../homepage.html';
    });
  }
});