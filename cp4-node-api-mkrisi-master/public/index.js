/**
 * Name: Myles Krisik
 * Date: 04/20/2021
 * Section: CSE 154 AM, TA: Fadel Shtiui
 *
 * This file adds the functionality to add a new entry to the "favorite albums"
 * section of albums.html. You need to type in the title, facts about
 * the album, the citation for the album art, it"s a description of the image
 * (used for its alt property), a link to the album art itself, and finally,
 * a paragraph about your thoughts on the album and why you like it.
 */
"use strict";

(function() {
  window.addEventListener("load", init);

  /**
   * runs whenever the page is loaded, adds the info to the page when the
   * button is clicked
   */
  function init() {
    qs("button").addEventListener("click", buttonClick);
  }

  /**
   * This function is called whenever the button on screen is clicked
   * it will add all the data entered to the page in the form of an album
   * entry
   */
  function buttonClick() {
    let main = qs("main");
    let albumContainer = gen("article");
    main.appendChild(albumContainer);

    title(albumContainer);
    pictureFacts(albumContainer);
    citation(albumContainer);
    description(albumContainer);

    id("albumtitle").value = "";
    id("albumfacts").value = "";
    id("picturealtcitation").value = "";
    id("albumdescription").value = "";
    id("albumart").value = "";
  }

  /**
   * this function adds the album title and artist to the page
   * @param {article} albumContainer - the container for all the elements of the title
   */
  function title(albumContainer) {
    let albumtitle = id("albumtitle").value;
    let section = gen("section");
    albumContainer.appendChild(section);
    let albumtitleHtml = gen("h2");
    albumtitleHtml.classList.add("albumname");
    albumtitleHtml.textContent = albumtitle;
    section.appendChild(albumtitleHtml);
  }

  /**
   * Puts the album artwork and the facts about it onto the page along with the
   * album art picture's alt details
   * @param {article} albumContainer - the container for all the elements of the picture
   * and facts
   */
  function pictureFacts(albumContainer) {
    let section = gen("section");
    let albumArt = id("albumart").value;
    let albumArtHtml = gen("img");
    let picIndex = id("picturealtcitation").value.indexOf("//");
    let alt = id("picturealtcitation").value;
    alt = alt.split(0, picIndex);
    albumContainer.appendChild(section);
    albumArtHtml.src = albumArt;
    albumArtHtml.alt = alt;
    albumArtHtml.classList.add("album");
    section.appendChild(albumArtHtml);

    facts(albumContainer, section);
  }

  /**
   * Used to add the facts about a given album onto the page
   * @param {article} albumContainer - the container for all the elements of the facts
   * @param {section} section - the section which contains the facts
   */
  function facts(albumContainer, section) {
    let albumfacts = id("albumfacts").value;
    let albumfactsHtml = gen("ul");
    albumContainer.appendChild(section);
    albumfactsHtml.classList.add("facts");
    section.appendChild(albumfactsHtml);

    let index = albumfacts.indexOf("//");
    let liElement;
    while (index !== -1) {
      liElement = gen("li");
      liElement.textContent = albumfacts.substring(0, index);
      albumfacts = albumfacts.substring(index + 2);
      albumfactsHtml.appendChild(liElement);
      index = albumfacts.indexOf("//");
    }
    liElement = gen("li");
    liElement.textContent = albumfacts;
    albumfactsHtml.appendChild(liElement);
  }

  /**
   * Adds the citation for the album artwork below the picture on the page
   * @param {article} albumContainer - the container for all the elements of the citation
   * for the album artwork
   */
  function citation(albumContainer) {
    let section = gen("section");
    let index = id("picturealtcitation").value.indexOf("//");
    let picCitation = id("picturealtcitation").value;
    picCitation = picCitation.substring(index + 2);
    let para = gen("p");
    para.textContent = picCitation;
    para.classList.add("citationcaption");
    albumContainer.appendChild(section);
    section.appendChild(para);
  }

  /**
   * Adds the description about the album at the very bottom of each album section
   * @param {article} albumContainer - the container for all the elements of the album's
   * description
   */
  function description(albumContainer) {
    let section = gen("section");
    albumContainer.appendChild(section);
    section.classList.add("description");
    section.textContent = id("albumdescription").value;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
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