/**
 * Smoothie Class
 * Represents a customer's smoothie order
 * @class
 */
class Smoothie {
    constructor(size, base, ingredients) {
        this.size = size;
        this.base = base;
        this.ingredients = ingredients;
        this.createdAt = new Date();
    }

    calculatePrice() {
        const sizePrices = { small: 4.99, medium: 6.99, large: 8.99 };
        const basePrice = this.base === 'coconut-water' ? 1.50 : 1.00;
        const ingredientCost = this.ingredients.length * 0.75;
        return (sizePrices[this.size] + basePrice + ingredientCost).toFixed(2);
    }

    describe() {
        return `Your ${this.size} smoothie ($${this.calculatePrice()}) with ${this.base} base and 
                ${this.ingredients.join(', ')}. Enjoy! 🥤`;
    }
}

// Save orders to localStorage
function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('smoothieOrders')) || [];
    orders.push(order);
    localStorage.setItem('smoothieOrders', JSON.stringify(orders));
}

// Display order history
function displayHistory() {
    const orders = JSON.parse(localStorage.getItem('smoothieOrders')) || [];
    const historyHTML = orders.map(order => `<li>${order.description}</li>`).join('');
    document.getElementById('orderHistory').innerHTML = historyHTML;
}

// Form Validation Logic/Submission Handler
document.getElementById('smoothieForm').addEventListener('submit', function(e) {
    e.preventDefault();
    try {
        const size = document.getElementById('size').value;
        const base = document.querySelector('input[name="base"]:checked').value;
        const ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked'))
            .map(ingredient => ingredient.value);
        
        // Validate ingredients (max 4)
        if (ingredients.length > 4) {
            alert('Max 4 ingredients!');
            return;
        }
        
        // Proceed if valid
        const order = new Smoothie(size, base, ingredients);
        document.getElementById('orderOutput').textContent = order.describe();
    }
    catch (error) {
        alert(`Error: ${error.message}`);
    }
});