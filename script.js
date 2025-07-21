const recipes = [
      { name: "Cheesy Pizza", price: 12, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fHww", description: "Mix flour, yeast, sugar, salt, warm water, oil. Rest 1 hour, cook garlic, onion, tomato puree, chili flakes, oregano, salt, roll dough, spread sauce, add cheese." },
      { name: "Burger", price: 9, image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D", description: "Fry the patty, toast the buns, spread sauce, add lettuce, place patty, put cheese, add onion and tomato, cover with top bun." },
      { name: "Healthy Salad", price: 7, image: "https://images.unsplash.com/photo-1708184528305-33ce7daced65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoeSUyMHNhbGFkfGVufDB8fDB8fHww", description: "Chop cucumber, tomato, onion, lettuce, and carrots, add boiled chickpeas, drizzle olive oil, lemon juice, salt, and pepper — toss well and serve. 🥗" }
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
            <p class="text-gray-600">Price: $${recipe.price}</p>
            <button onclick="openRecipeModal('${recipe.name}', ${recipe.price}, '${recipe.image}', '${recipe.description}')" class="bg-orange-500 text-white px-4 py-2 mt-2 rounded w-full">View Recipe</button>
            <button onclick="toggleFavorite('${recipe.name}')" class="text-sm ${isFavorite ? 'favorite' : ''} mt-1">${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
          </div>`;
      });
    }

    function openRecipeModal(name, price, image, description) {
      document.getElementById("recipe-title").innerText = name;
      document.getElementById("recipe-image").src = image;
      document.getElementById("recipe-description").innerText = description;
      document.getElementById("recipe-price").innerText = `$${price}`;
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
      const price = parseInt(document.getElementById("recipe-price").innerText.replace("$", ""));
      addToCart(name, price);
      closeModal();
    }

    function addToCart(name, price) {
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
      alert(`${name} added to your cart!`);
    }

    // function updateCart() {
    //   const cartItems = document.getElementById("cart-items");
    //   const cartTotal = document.getElementById("cart-total");
    //   const cartCount = document.getElementById("cart-count");
    //   cartItems.innerHTML = "";
    //   let total = 0;
    //   cart.forEach((item, index) => {
    //     cartItems.innerHTML += `
    //       <div class="flex justify-between mb-2 text-sm">
    //         <span>${item.name}</span>
    //         <span>$${item.price} <button onclick="removeFromCart(${index})" class="text-red-500 hover:underline">Remove</button></span>
    //       </div>`;
    //     total += item.price;
    //   });
    //   cartTotal.innerText = `Total: $${total}`;
    //   cartCount.innerText = cart.length;
    // }






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
          $${item.price}
          <button onclick="placeOrder(${index})" class="text-green-600 hover:underline ml-2">Order</button>
        </span>
      </div>`;
    total += item.price;
  });

  cartTotal.innerText = `Total: $${total}`;
  cartCount.innerText = cart.length;
}



    function placeOrder(index) {
  const item = cart[index];
  if (item) {
    alert(`✅ Order placed for: ${item.name}`);
  } else {
    alert("⚠️ Item not found.");
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
        alert("Your cart is empty!");
        return;
      }
      alert("Thank you for your order! We'll confirm soon.");
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
    }

    function loginUser() {
      closeModal();
      alert("Logged in! Welcome to Yummy Recipes.");
    }

    function signupUser() {
      closeModal();
      alert("Signed up! You're ready to explore.");
    }

    function submitQuery(event) {
      event.preventDefault();
      const name = document.getElementById("query-name").value;
      const email = document.getElementById("query-email").value;
      const query = document.getElementById("query-text").value;
      if (name.trim() && email.trim() && query.trim()) {
        document.getElementById("query-msg").innerText = "Thanks for your query! We'll get back to you soon.";
        document.getElementById("query-form").reset();
      } else {
        document.getElementById("query-msg").innerText = "Please fill in all fields.";
        document.getElementById("query-msg").classList.add("text-red-500");
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