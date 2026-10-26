let cart = [];
const $ = id => document.getElementById(id);

function displayCart() {
    $("cartItems").innerHTML = "";
    let total = 0, count = 0;
    if (!cart.length) $("cartItems").textContent = "Your cart is empty.";
    cart.forEach((item, i) => {
        total += item.price * item.qty;
        count += item.qty;
        const row = document.createElement("div");
        row.className = "cart-item";
        const name = document.createElement("span");
        name.textContent = `${item.name} × ${item.qty}`;
        const price = document.createElement("span");
        price.textContent = `₹${item.price * item.qty}`;
        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.className = "removeButton";
        btn.onclick = () => { cart.splice(i, 1); displayCart(); };
        row.append(name, price, btn);
        $("cartItems").append(row);
    });
    $("cartCount").textContent = count;
    $("cartTotal").textContent = `Total: ₹${total}`;
}

document.querySelectorAll(".addButton").forEach(btn => {
    btn.onclick = () => {
        let item = cart.find(x => x.name === btn.dataset.name);
        if (item) item.qty++;
        else cart.push({name: btn.dataset.name, price: +btn.dataset.price, qty: 1});
        displayCart();
    };
});

$("cartButton").onclick = () => $("cart").scrollIntoView({behavior:"smooth"});
$("loginButton").onclick = () => $("login").scrollIntoView({behavior:"smooth"});
$("clearCartButton").onclick = () => { cart = []; displayCart(); };
$("checkoutButton").onclick = () => {
    if (!cart.length) return alert("Your cart is empty!");
    alert("Demo checkout successful! Thank you for shopping.");
    cart = []; displayCart();
};

$("searchInput").oninput = e => {
    document.querySelectorAll(".product-card").forEach(card => {
        card.hidden = !card.textContent.toLowerCase().includes(e.target.value.toLowerCase());
    });
};

$("loginForm").onsubmit = e => {
    e.preventDefault();
    $("loginMessage").textContent = `Welcome, ${$("username").value}! Demo login successful.`;
    e.target.reset();
};

displayCart();

