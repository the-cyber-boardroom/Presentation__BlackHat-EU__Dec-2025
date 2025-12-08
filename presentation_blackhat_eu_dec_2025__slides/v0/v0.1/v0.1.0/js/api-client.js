/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - API Client
   v0.1.0 - Core MVP
   
   Handles all communication with the FastAPI backend.
   Real data from day one - no mocks.
   ═══════════════════════════════════════════════════════════════════════════════ */

class ApiClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl || window.location.origin;
        this.defaultTimeout = 30000;
    }

    /**
     * Make a GET request
     * @param {string} endpoint - API endpoint path
     * @param {object} options - Fetch options
     * @returns {Promise<any>} Response data
     */
    async get(endpoint, options = {}) {
        return this.request('GET', endpoint, null, options);
    }

    /**
     * Make a POST request
     * @param {string} endpoint - API endpoint path
     * @param {object} data - Request body
     * @param {object} options - Fetch options
     * @returns {Promise<any>} Response data
     */
    async post(endpoint, data, options = {}) {
        return this.request('POST', endpoint, data, options);
    }

    /**
     * Make a PUT request
     * @param {string} endpoint - API endpoint path
     * @param {object} data - Request body
     * @param {object} options - Fetch options
     * @returns {Promise<any>} Response data
     */
    async put(endpoint, data, options = {}) {
        return this.request('PUT', endpoint, data, options);
    }

    /**
     * Make a DELETE request
     * @param {string} endpoint - API endpoint path
     * @param {object} options - Fetch options
     * @returns {Promise<any>} Response data
     */
    async delete(endpoint, options = {}) {
        return this.request('DELETE', endpoint, null, options);
    }

    /**
     * Core request method
     */
    async request(method, endpoint, data, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const timeout = options.timeout || this.defaultTimeout;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            signal: controller.signal
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            fetchOptions.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, fetchOptions);
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(
                    errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    errorData
                );
            }

            // Handle different content types
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();

        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new ApiError('Request timed out', 408);
            }

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                error.message || 'Network error',
                0,
                { originalError: error }
            );
        }
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       Slide API Methods
       ═══════════════════════════════════════════════════════════════════════════ */

    /**
     * Get a slide deck by ID or path
     * @param {string} deckId - Deck identifier
     * @returns {Promise<object>} Deck data with slides
     */
    async getDeck(deckId) {
        return this.get(`/api/decks/${deckId}`);
    }

    /**
     * List available decks
     * @returns {Promise<array>} List of deck summaries
     */
    async listDecks() {
        return this.get('/api/decks');
    }

    /**
     * Get slides for a deck
     * @param {string} deckId - Deck identifier
     * @returns {Promise<array>} Array of slide data
     */
    async getSlides(deckId) {
        return this.get(`/api/decks/${deckId}/slides`);
    }

    /**
     * Health check
     * @returns {Promise<boolean>} True if API is healthy
     */
    async checkHealth() {
        try {
            await this.get('/api/health', { timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}

/**
 * API Error class
 */
class ApiError extends Error {
    constructor(message, statusCode = 0, data = null) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.data = data;
    }
}

// Create and export singleton
const apiClient = new ApiClient();

// Make available globally
window.apiClient = apiClient;
window.ApiClient = ApiClient;
window.ApiError = ApiError;
