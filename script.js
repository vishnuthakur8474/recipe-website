const recipes = [
  { name: "Cheesy Pizza", price: 400, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fHww", description: "Mix flour, yeast, sugar, salt, warm water, oil. Rest 1 hour, cook garlic, onion, tomato puree, chili flakes, oregano, salt, roll dough, spread sauce, add cheese." },
  { name: "Burger", price: 200, image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D", description: "Fry the patty, toast the buns, spread sauce, add lettuce, place patty, put cheese, add onion and tomato, cover with top bun." },
  { name: "Healthy Salad", price: 150, image: "https://images.unsplash.com/photo-1708184528305-33ce7daced65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoeSUyMHNhbGFkfGVufDB8fDB8fHww", description: "Chop cucumber, tomato, onion, lettuce, and carrots, add boiled chickpeas, drizzle olive oil, lemon juice, salt, and pepper — toss well and serve. 🥗" },
  { name: "Pasta Alfredo", price: 350, image: "https://images.unsplash.com/photo-1662197480393-2a82030b7b83?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Boil pasta, melt butter, cook garlic, add cream and cheese, mix until creamy, add pasta, stir and garnish with parsley." },
  { name: "Paneer Tikka", price: 300, image: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Marinate paneer cubes in yogurt, spices, and lemon juice. Skewer with onions and peppers, grill until golden, serve hot." },
  { name: "Chocolate Cake", price: 500, image: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2hvY29sYXRlJTIwQ2FrZXxlbnwwfHwwfHx8MA%3D%3D", description: "Mix flour, cocoa, baking powder, eggs, sugar, butter. Pour into pan, bake at 180°C for 30 mins, cool and frost with chocolate ganache." }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function displayRecipes(filtered = recipes) {
  const container = document.getElementById("recipe-list");
  container.innerHTML = "";
  filtered.forEach(recipe => {
    const isFavorite = favorites.includes(recipe.name);
    container.innerHTML += `
          <div class="recipe-card p-4 rounded-lg shadow-md">
            <img src="${recipe.image}" alt="${recipe.name}" class="rounded w-full h-36 object-cover mb-2" />
            <h3 class="text-xl font-semibold">${recipe.name}</h3>
            <p class="text-gray-600">Price: ₹${recipe.price}</p>
            <button onclick="openRecipeModal('${recipe.name}', ${recipe.price}, '${recipe.image}', '${recipe.description}')" class="bg-orange-500 text-white px-4 py-2 mt-2 rounded w-full">View Recipe</button>
            <button onclick="toggleFavorite('${recipe.name}')" class="text-sm ${isFavorite ? 'favorite' : ''} mt-1">${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
          </div>`;
  });
}

function openRecipeModal(name, price, image, description) {
  document.getElementById("recipe-title").innerText = name;
  document.getElementById("recipe-image").src = image;
  document.getElementById("recipe-description").innerText = description;
  document.getElementById("recipe-price").innerText = `₹${price}`;
  const favoriteBtn = document.getElementById("favorite-btn");
  favoriteBtn.innerText = favorites.includes(name) ? "Remove from Favorites" : "Add to Favorites";
  favoriteBtn.classList.toggle("favorite", favorites.includes(name));
  document.getElementById("recipe-modal").classList.remove("hidden");
}

function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(fav => fav !== name);
  } else {
    favorites.push(name);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayRecipes();
  if (!document.getElementById("recipe-modal").classList.contains("hidden")) {
    openRecipeModal(name, recipes.find(r => r.name === name).price, recipes.find(r => r.name === name).image, recipes.find(r => r.name === name).description);
  }
}

function addToCartFromModal() {
  const name = document.getElementById("recipe-title").innerText;
  const price = parseInt(document.getElementById("recipe-price").innerText.replace("₹", ""));
  addToCart(name, price);
  closeModal();
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  Swal.fire({
    title: 'Added to Cart!',
    text: `${name} has been added to your cart!`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    confirmButtonColor: '#f59e0b'
  });
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
          <div class="flex justify-between mb-2 text-sm">
            <span>${item.name}</span>
            <span>
              ₹${item.price}
              <button onclick="placeOrder(${index})" class="text-green-600 hover:underline ml-2">Order</button>
            </span>
          </div>`;
    total += item.price;
  });

  cartTotal.innerText = `Total: ₹${total}`;
  cartCount.innerText = cart.length;
}

function placeOrder(index) {
  const item = cart[index];
  if (item) {
    Swal.fire({
      title: 'Order Placed!',
      text: `Your order for ${item.name} has been successfully placed. You'll hear from us soon!`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#f59e0b'
    });
  } else {
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong. The item could not be found.',
      icon: 'error',
      confirmButtonColor: '#f59e0b'
    });
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function openCart() {
  document.getElementById("cart-modal").classList.remove("hidden");
}

function checkout() {
  if (cart.length === 0) {
    Swal.fire({
      title: 'Empty Cart!',
      text: 'Your cart is empty!',
      icon: 'error',
      confirmButtonColor: '#f59e0b'
    });
    return;
  }
  Swal.fire({
    title: 'Order Confirmed!',
    text: 'Thank you for your order! We\'ll confirm soon.',
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    confirmButtonColor: '#f59e0b'
  });
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  closeModal();
}

function openLogin() {
  document.getElementById("login-modal").classList.remove("hidden");
}

function openSignup() {
  document.getElementById("signup-modal").classList.remove("hidden");
}

function closeModal() {
  document.querySelectorAll(".modal").forEach(modal => modal.classList.add("hidden"));
  document.getElementById("recipes").scrollIntoView({ behavior: "smooth" });
}
function loginUser() {
  const email = document.querySelector('#login-modal input[type="text"]').value;
  const password = document.querySelector('#login-modal input[type="password"]').value;
  if (email.trim() && password.trim()) {
    closeModal();
    Swal.fire({
      title: 'Welcome Back!',
      text: 'Logged in! Welcome to Yummy Recipes.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#f59e0b'
    });
  } else {
    Swal.fire({
      title: 'Incomplete Form!',
      text: 'Please fill in all fields.',
      icon: 'error',
      confirmButtonColor: '#f59e0b'
    });
  }
}

function signupUser() {
  const name = document.querySelector('#signup-modal input[type="text"]').value;
  const email = document.querySelector('#signup-modal input[type="email"]').value;
  const password = document.querySelector('#signup-modal input[type="password"]').value;
  if (name.trim() && email.trim() && password.trim()) {
    closeModal();
    Swal.fire({
      title: 'Signed Up!',
      text: 'You\'re ready to explore Yummy Recipes!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#f59e0b'
    });
  } else {
    Swal.fire({
      title: 'Incomplete Form!',
      text: 'Please fill in all fields.',
      icon: 'error',
      confirmButtonColor: '#f59e0b'
    });
  }
}

function submitQuery(event) {
  event.preventDefault();
  const name = document.getElementById("query-name").value;
  const email = document.getElementById("query-email").value;
  const query = document.getElementById("query-text").value;
  if (name.trim() && email.trim() && query.trim()) {
    document.getElementById("query-msg").innerText = `Thank you, ${name}! Your query has been submitted. We'll reach out soon!`;
    Swal.fire({
      title: 'Query Submitted!',
      text: `Thank you, ${name}! Your query has been submitted. We'll reach out soon!`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#f59e0b'
    });
    document.getElementById("query-form").reset();
  } else {
    document.getElementById("query-msg").innerText = "Please fill in all fields.";
    document.getElementById("query-msg").classList.add("text-red-500");
    Swal.fire({
      title: 'Incomplete Form!',
      text: 'Please fill in all fields.',
      icon: 'error',
      confirmButtonColor: '#f59e0b'
    });
  }
}

document.getElementById("search").addEventListener("input", function () {
  const val = this.value.toLowerCase();
  const filtered = recipes.filter(r => r.name.toLowerCase().includes(val));
  displayRecipes(filtered);
});

document.getElementById("query-form").addEventListener("submit", submitQuery);

window.onload = () => {
  displayRecipes();
  updateCart();
};
