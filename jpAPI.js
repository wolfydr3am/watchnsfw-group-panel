const axios = require('axios');

const BASE_URL = 'https://justpaster.xyz'; // Update this URL if your server is running on a different host/port

const jpApi = {
  /**
   * Create a new paste
   * @param {string} content - The content of the paste
   * @returns {Promise<string>} - The ID of the created paste
   */
  createPaste: async function(content) {
    try {
      const response = await axios.post(`${BASE_URL}/api/paste`, { content });
      return response.data.id;
    } catch (error) {
      console.error('Error creating paste:', error.message);
      throw error;
    }
  },

  /**
   * Get the view count of a paste
   * @param {string} id - The ID of the paste
   * @returns {Promise<number>} - The view count of the paste
   */
  getPasteViews: async function(id) {
    try {
      const response = await axios.get(`${BASE_URL}/api/paste/${id}/views`);
      return response.data.views;
    } catch (error) {
      console.error('Error retrieving paste views:', error.message);
      throw error;
    }
  },

  /**
   * Add anti-bypass settings to an existing paste
   * @param {string} id - The ID of the paste
   * @param {boolean} antiBypass - Whether to enable or disable anti-bypass
   * @param {string} redirectUrl - The URL to redirect to if bypassed
   * @returns {Promise<void>}
   */
  addAntiBypass: async function(id, antiBypass, redirectUrl) {
    try {
      await axios.post(`${BASE_URL}/api/paste/${id}/anti-bypass`, { antiBypass, redirectUrl });
    } catch (error) {
      console.error('Error adding anti-bypass settings:', error.message);
      throw error;
    }
  },

  /**
   * Shorten a URL
   * @param {string} originalUrl - The URL to shorten
   * @returns {Promise<string>} - The shortened URL
   */
  shortenUrl: async function(originalUrl) {
    try {
      const response = await axios.post(`${BASE_URL}/api/shorten`, { originalUrl });
      return response.data.shortUrl;
    } catch (error) {
      console.error('Error shortening URL:', error.message);
      throw error;
    }
  }
};

module.exports = jpApi;