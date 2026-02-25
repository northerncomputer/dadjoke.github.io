// Dad Joke API configuration
const API_URL = 'https://icanhazdadjoke.com/';

// DOM elements
const jokeElement = document.getElementById('joke');

/**
 * Fetches a random dad joke from the API
 * @returns {Promise<string>} The joke text
 */
async function fetchDadJoke() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.joke;
    } catch (error) {
        console.error('Error fetching dad joke:', error);
        throw new Error('Failed to fetch joke. Please check your internet connection and try again.');
    }
}

/**
 * Updates the UI to show the joke
 * @param {string} joke - The joke text to display
 */
function displayJoke(joke) {
    jokeElement.textContent = joke;
    
    // Add a subtle fade-in animation
    jokeElement.style.opacity = '0';
    jokeElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        jokeElement.style.transition = 'all 0.3s ease';
        jokeElement.style.opacity = '1';
        jokeElement.style.transform = 'translateY(0)';
    }, 50);
}

/**
 * Shows error message in the joke container
 * @param {string} message - The error message to display
 */
function displayError(message) {
    jokeElement.textContent = message;
}

/**
 * Loads and displays a dad joke
 */
async function loadJoke() {
    try {
        const joke = await fetchDadJoke();
        displayJoke(joke);
    } catch (error) {
        displayError('Sorry, couldn\'t load a joke right now. Please refresh the page to try again.');
    }
}

/**
 * Initialize the application
 */
function init() {
    // Load a joke immediately when the page loads
    loadJoke();
    
    console.log('Dad Joke loaded! 🤪');
}

// Initialize when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}