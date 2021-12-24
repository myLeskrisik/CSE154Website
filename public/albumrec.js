/**
 * Name: Myles Krisik
 * Date: 05/15/2021
 * Section: CSE 154, Section AM
 *
 *
 */
"use strict";

(function() {
  const BASE_URL = "http://localhost:8080/";

  /**
   * Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   * CHANGE: Describe what your init function does here.
   */
  function init() {
    id("albumgenre").addEventListener("change", showAlbum);
    id("displayinfo").addEventListener("click", showDetails);
  }

  /**
   * Shows an album of the genre selected on screen
   */
  async function showAlbum() {
    const dropDown = id("albumgenre");
    const albumDiv = id("displayalbum");
    id("description").classList.add("hidden");
    let genre = dropDown.value.toLowerCase();
    let notBlank = (genre !== "");

    if (notBlank) {
      const reqResult = await requestGenre(notBlank, genre);
      const albumInfo = await parseData(reqResult, genre);
      showInfo(albumDiv, albumInfo);
    } else {
      albumDiv.classList.add("hidden");
    }
  }

  /**
   * Submits a request to get an album of the genre selected on the page
   * @param {boolean} notBlank true if there is a genre selected on screen, false otherwise
   * @param {String} selectedValue the genre which is selected on screen
   * @returns {Promise} the result from the request whcih is made
   */
  async function requestGenre(notBlank, selectedValue) {
    let result = "";
    if (notBlank) {
      try {
        let url = BASE_URL + "genre?name=" + selectedValue;
        const response = await fetch(url);
        statusCheck(response);
        const processed = await response.json();
        result = processed;
      } catch (err) {
        result = err;
      }
    }
    return result;
  }

  /**
   * Randomly selects an album from the array of albums it recieves
   * @param {Array} data the array of albums to choose from
   * @returns {String} the selected album in the form album - artist
   */
  function parseData(data) {
    if (typeof data === "object") {
      let albumIndex = Math.floor(Math.random() * data.info.length);
      return data.info[albumIndex];
    }
    id("displayinfo").removeEventListener("click", showDetails);
    return data;
  }

  /**
   * Shows, on screen, the name of the album requested
   * @param {HTMLElement} albumDiv the div containing the info of the album
   * @param {String} albumInfo the genre selected on screen
   */
  function showInfo(albumDiv, albumInfo) {
    let h2Child = gen("h2");
    let oldH2 = albumDiv.querySelector("h2");
    let tagName = albumInfo.substring(0, albumInfo.indexOf(" -"));
    tagName = tagName.replaceAll(" ", "");
    tagName = tagName.toLowerCase();
    h2Child.textContent = albumInfo;
    h2Child.id = tagName;
    albumDiv.appendChild(h2Child);
    albumDiv.replaceChild(h2Child, oldH2);
    albumDiv.classList.remove("hidden");
  }

  /**
   * Shows the details about an album which is diplayed, the description of the album
   */
  async function showDetails() {
    const descripCont = id("description");
    const albumName = id("displayalbum").querySelector("h2").id;
    const albumInfo = await reqAlbumInfo(albumName);
    displayResults(descripCont, albumInfo);
  }

  /**
   * Requests the description for the album passed to it
   * @param {String} albumName the name of the album we want a description of
   * @returns {String} the description of the album requested
   */
  async function reqAlbumInfo(albumName) {
    let result = "";
    try {
      let url = BASE_URL + "album?name=" + albumName;
      const response = await fetch(url);
      statusCheck(response);
      result = response.text();
    } catch (err) {
      result = err;
    }
    return result;
  }

  /**
   * Display the description of the album which is currently "selected"
   * @param {HTMLElement} descripCont the element where the description should be placed
   * @param {String} data the description of the album which should be displayed
   */
  function displayResults(descripCont, data) {
    let description = gen("p");
    let parent = id("displayalbum");
    parent.appendChild(description);
    parent.replaceChild(description, descripCont);
    description.textContent = data;
    description.id = "description";
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
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();