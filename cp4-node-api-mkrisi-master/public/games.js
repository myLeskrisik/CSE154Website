/**
 * Name: Myles Krisik
 * Date: 05/01/2021
 * Section: CSE 154 Section AM
 *
 * This file will retrive data from the CheapShark api for a few of my favorite games and
 * display it on the page games.html. The data retrieved includes the cheapest
 * price for said game along with a link to where to buy the game at that price.
 */
"use strict";

(function() {

  const games = ["Binding of Isaac: Rebirth", "Terraria", "Titanfall 2",
    "Stardew Valley"];
  const gameIds = ["isaac", "terraria", "titanfall", "stardew"];

  /**
   * Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   * Goes through the array games and generates an api url for each game, and
   * displays the cheapest price and a link to it on the webpage
   */
  function init() {
    let gameTitles = qsa(".gametitle");
    for (let i = 0; i < gameTitles.length; i++) {
      gameTitles[i].addEventListener("click", () => {
        let url = getUrl(games[i]);
        getApiData(url, i);
      });
    }
  }

  /**
   * Generates a api url based on the current game's name passed to it
   * @param {String} name the game's name for which a api url will be generated for
   * @returns {String} the url which has been generated for the given game
   */
  function getUrl(name) {
    const baseUrl = "https://www.cheapshark.com/api/1.0/games?title=";
    return baseUrl + name;
  }

  /**
   * Get's the data from the passed api link and adds it to the page.This
   * data includes the cheapest price and a link to the game at that price
   * @param {String} url - the api url which was generated
   * @param {Integer} i - the current element of the games being worked with
   */
  async function getApiData(url, i) {
    let priceParent = id(String(gameIds[i]));
    let price = gen("p");
    priceParent.appendChild(price);
    try {
      const response = await fetch(url);
      statusCheck();
      const processed = await response.json();
      const baseLink = "https://www.cheapshark.com/redirect?dealID=";

      priceParent.appendChild(price);
      price.textContent = "Cheapest Price: " + processed[0].cheapest;
      let link = gen("a");
      price.parentNode.appendChild(link);
      link.href = baseLink + processed[0].cheapestDealID;
      link.textContent = "Link to the Deal!";
    } catch (err) {
      price.textContent = err;
    }
  }

  /**
   * Checks to see if everything with the fetch went okay, if so returns the
   * fetch result, if not throws an error with text of what went wrong
   * @param {Response} response the response from the fetch request
   * @returns {Response} the response so long as everything went okay and nothing failed
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();