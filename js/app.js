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

    describe() {
        return `Your ${this.size} smoothie with ${this.base} base and 
                ${this.ingredients.join(', ')}. Enjoy! 🥤`;
    }
}

// Form Validation Logic/Submission Handler
document.getElementById('smoothieForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
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
});