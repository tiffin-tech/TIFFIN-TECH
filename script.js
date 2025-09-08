// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const menuButton = document.querySelector('.mobile-menu-button');
  const menu = document.querySelector('.mobile-menu');
  
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }

  // Browse page filtering
  if (document.getElementById('vendor-grid')) {
    initBrowsePage();
  }

  // Vendor details page
  if (document.getElementById('vendor-details')) {
    initVendorDetails();
  }

  // Auth forms
  if (document.getElementById('student-auth-form')) {
    initStudentAuth();
  }

  if (document.getElementById('vendor-auth-form')) {
    initVendorAuth();
  }
});

// Browse page functionality
function initBrowsePage() {
  const vendorGrid = document.getElementById('vendor-grid');
  const vegFilter = document.getElementById('veg-filter');
  const priceFilter = document.getElementById('price-filter');
  const areaFilter = document.getElementById('area-filter');
  const searchInput = document.getElementById('search-input');
  
  // Render vendor cards
  function renderVendors(vendorsToRender) {
    vendorGrid.innerHTML = '';
    
    vendorsToRender.forEach(vendor => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-md overflow-hidden';
      card.innerHTML = `
        <img src="https://via.placeholder.com/300x200/EDF2F7/374151?text=${encodeURIComponent(vendor.name)}" alt="${vendor.name}" class="w-full h-48 object-cover">
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold">${vendor.name}</h3>
            <span class="px-2 py-1 text-xs rounded-full ${vendor.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
              ${vendor.isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
          <p class="text-gray-600 text-sm mb-4">${vendor.description}</p>
          <div class="flex justify-between items-center mb-4">
            <div>
              <span class="text-gray-700 font-semibold">₹${vendor.priceFull}/month</span>
              <span class="text-gray-500 text-sm"> (Full)</span>
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="ml-1 text-gray-700">${vendor.rating}</span>
            </div>
          </div>
          <a href="vendor-details.html?id=${vendor.id}" class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-md transition duration-300">
            View Details
          </a>
        </div>
      `;
      vendorGrid.appendChild(card);
    });
  }
  
  // Filter vendors based on criteria
  function filterVendors() {
    const searchTerm = searchInput.value.toLowerCase();
    const vegValue = vegFilter.value;
    const priceValue = priceFilter.value;
    const areaValue = areaFilter.value;
    
    const filtered = vendors.filter(vendor => {
      // Search filter
      if (searchTerm && !vendor.name.toLowerCase().includes(searchTerm) && 
          !vendor.description.toLowerCase().includes(searchTerm)) {
        return false;
      }
      
      // Veg/Non-veg filter
      if (vegValue !== 'all') {
        const isVegFilter = vegValue === 'veg';
        if (vendor.isVeg !== isVegFilter) return false;
      }
      
      // Price filter
      if (priceValue !== 'all') {
        if (priceValue === 'low' && vendor.priceFull > 2000) return false;
        if (priceValue === 'medium' && (vendor.priceFull <= 2000 || vendor.priceFull > 2500)) return false;
        if (priceValue === 'high' && vendor.priceFull <= 2500) return false;
      }
      
      // Area filter
      if (areaValue !== 'all' && !vendor.deliveryAreas.includes(areaValue)) {
        return false;
      }
      
      return true;
    });
    
    renderVendors(filtered);
  }
  
  // Set up event listeners
  vegFilter.addEventListener('change', filterVendors);
  priceFilter.addEventListener('change', filterVendors);
  areaFilter.addEventListener('change', filterVendors);
  searchInput.addEventListener('input', filterVendors);
  
  // Initial render
  renderVendors(vendors);
}

// Vendor details page functionality
function initVendorDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const vendorId = urlParams.get('id');
  const vendor = getVendorById(parseInt(vendorId));
  
  if (!vendor) {
    document.getElementById('vendor-details').innerHTML = `
      <div class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-800">Vendor not found</h2>
        <p class="mt-4 text-gray-600">The vendor you're looking for doesn't exist.</p>
        <a href="browse.html" class="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Browse Vendors</a>
      </div>
    `;
    return;
  }
  
  // Populate vendor details
  document.getElementById('vendor-name').textContent = vendor.name;
  document.getElementById('vendor-description').textContent = vendor.description;
  document.getElementById('vendor-rating').textContent = vendor.rating;
  document.getElementById('price-full').textContent = `₹${vendor.priceFull}`;
  document.getElementById('price-half').textContent = `₹${vendor.priceHalf}`;
  document.getElementById('veg-tag').className = `px-3 py-1 rounded-full text-sm font-medium ${vendor.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
  document.getElementById('veg-tag').textContent = vendor.isVeg ? 'Vegetarian' : 'Non-Vegetarian';
  
  // Populate delivery areas
  const areasList = document.getElementById('delivery-areas');
  areasList.innerHTML = '';
  vendor.deliveryAreas.forEach(area => {
    const li = document.createElement('li');
    li.className = 'flex items-center';
    li.innerHTML = `
      <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      ${area}
    `;
    areasList.appendChild(li);
  });
  
  // Populate weekly menu
  const menuTable = document.getElementById('weekly-menu');
  menuTable.innerHTML = '';
  vendor.menu.forEach(dayMenu => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-gray-200';
    tr.innerHTML = `
      <td class="py-3 px-4 font-medium">${dayMenu.day}</td>
      <td class="py-3 px-4">${dayMenu.lunch}</td>
      <td class="py-3 px-4">${dayMenu.dinner}</td>
    `;
    menuTable.appendChild(tr);
  });
  
  // Populate reviews
  const reviewsContainer = document.getElementById('reviews-container');
  reviewsContainer.innerHTML = '';
  vendor.reviews.forEach(review => {
    const reviewEl = document.createElement('div');
    reviewEl.className = 'bg-gray-50 p-4 rounded-lg';
    reviewEl.innerHTML = `
      <div class="flex items-center mb-2">
        <div class="flex items-center mr-4">
          ${generateStarRating(review.rating)}
        </div>
        <h4 class="font-semibold">${review.user}</h4>
      </div>
      <p class="text-gray-600">${review.comment}</p>
    `;
    reviewsContainer.appendChild(reviewEl);
  });
}

function generateStarRating(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars += '<svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    } else {
      stars += '<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    }
  }
  return stars;
}

// Auth form functionality
function initStudentAuth() {
  const form = document.getElementById('student-auth-form');
  const isLoginForm = window.location.search.includes('mode=login');
  const toggleFormText = document.getElementById('toggle-form-text');
  const toggleFormLink = document.getElementById('toggle-form-link');
  const signupFields = document.getElementById('signup-fields');
  
  if (isLoginForm) {
    signupFields.classList.add('hidden');
    toggleFormText.textContent = "Don't have an account?";
    toggleFormLink.textContent = "Sign up";
    toggleFormLink.href = "auth-student.html?mode=signup";
  } else {
    signupFields.classList.remove('hidden');
    toggleFormText.textContent = "Already have an account?";
    toggleFormLink.textContent = "Log in";
    toggleFormLink.href = "auth-student.html?mode=login";
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    // If signup form, validate additional fields
    if (!isLoginForm) {
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const hostel = document.getElementById('hostel').value;
      
      if (name.length < 3) {
        alert('Name must be at least 3 characters long');
        return;
      }
      
      if (!validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!hostel) {
        alert('Please select your hostel');
        return;
      }
      
      console.log('Signup data:', { name, email, phone, password, hostel });
      alert('Signup successful! (This is a demo)');
    } else {
      console.log('Login data:', { email, password });
      alert('Login successful! (This is a demo)');
    }
    
    // Redirect to browse page (simulated success)
    setTimeout(() => {
      window.location.href = 'browse.html';
    }, 1000);
  });
}

function initVendorAuth() {
  const form = document.getElementById('vendor-auth-form');
  const isLoginForm = window.location.search.includes('mode=login');
  const toggleFormText = document.getElementById('toggle-form-text');
  const toggleFormLink = document.getElementById('toggle-form-link');
  const signupFields = document.getElementById('signup-fields');
  
  if (isLoginForm) {
    signupFields.classList.add('hidden');
    toggleFormText.textContent = "Don't have an account?";
    toggleFormLink.textContent = "Sign up";
    toggleFormLink.href = "auth-vendor.html?mode=signup";
  } else {
    signupFields.classList.remove('hidden');
    toggleFormText.textContent = "Already have an account?";
    toggleFormLink.textContent = "Log in";
    toggleFormLink.href = "auth-vendor.html?mode=login";
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    // If signup form, validate additional fields
    if (!isLoginForm) {
      const businessName = document.getElementById('business-name').value;
      const phone = document.getElementById('phone').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const fssai = document.getElementById('fssai').value;
      const deliveryZones = document.getElementById('delivery-zones').value;
      
      if (businessName.length < 3) {
        alert('Business name must be at least 3 characters long');
        return;
      }
      
      if (!validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!fssai) {
        alert('Please enter your FSSAI license number');
        return;
      }
      
      if (!deliveryZones) {
        alert('Please enter your delivery zones');
        return;
      }
      
      console.log('Vendor signup data:', { businessName, email, phone, password, fssai, deliveryZones });
      alert('Vendor registration successful! (This is a demo)');
    } else {
      console.log('Vendor login data:', { email, password });
      alert('Vendor login successful! (This is a demo)');
    }
    
    // Redirect to browse page (simulated success)
    setTimeout(() => {
      window.location.href = 'browse.html';
    }, 1000);
  });
}

// Helper functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}