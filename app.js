/**
 * Name: Myles Krisik
 * Date: 05/19/2021
 * Section: CSE 154, Section AM
 *
 * This file is allows a user to request a genre for which you would like to see albums
 * reccomendations for. For every album which is returned to the user, the user
 * can also request a one to two sentence description of what makes the album great.
 */
"use strict";

const express = require("express");
const multer = require("multer");
const app = express();
const NOT_FOUND = 404;
const DEFAULT_PORT = 8080;
let genre = new Map();
genre.set("rock", ["Flying Microtonal Banana - King Gizzard and the Lizard Wizard",
"The Black Parade - My Chemical Romance"]);
genre.set("hiphop", ["MM.. FOOD - MF DOOM", "Malibu Ken - Malibu Ken"]);
genre.set("indie", ["Is This It? - The Strokes", "Teens of Denial - Car Seat Headrest"]);
genre.set("experimental", ["CLPPNG - clipping.", "Veteran - jpegmafia"]);
let albInfo = new Map();
albInfo.set("flyingmicrotonalbanana", "This album is a beautiful psychadelic rock album, with " +
"stunning vocals, mindblowing instrumentation and an overall trippy vibe.");
albInfo.set("theblackparade", "A beautiful Emo album which has a very epic sound and " +
"very angsty lyrics which  may be a turn off to some, but is my favorite part of the " +
"whole thing, a classic.");
albInfo.set("mm..food", "A quintessential rap album with a clever them of food made by one of " +
"the best who ever did it. DOOM has a great voice and the best bars.");
albInfo.set("malibuken", "Aesop rock has is one of the best lyrical story tellers I've " +
"ever heard and the collaboration with Tobacco provides some of my favorite beats.");
albInfo.set("isthisit?", "A fun, powerful indie rock album, with fuzzy guitars punk lyrics " +
"with a tracklist which doesn't miss.");
albInfo.set("teensofdenial", "A very fun indie album made by Seattlite Will Toledo, " +
"great guitar work and instrumentation as a whole a very fun and powerful experience.");
albInfo.set("clppng", "A loud hard hitting industrial hip hop album with one of " +
"the best performances of all time by Daveed Diggs. Phenomenal rap album front to back");
albInfo.set("veteran", "A fun album which touches on so many topics from politics to race " +
"and much more including some of the. It's peggy's most popular album for a reason");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * Handles requests to get albums of a given genre passed. The name parameter
 * shall be all loweracse.
 */
app.get("/genre", (req, res) => {
  let selection = req.query["name"];
  res.type("json");
  if (genre.has(selection)) {
    res.json({"info": genre.get(selection)});
  } else {
    res.status(NOT_FOUND).send("Genre" + selection + "not Found");
  }
});

/**
 * Handles requests for information about a given album which is passed.
 * The name parameter should have no spaces and be all lowercase.
 */
app.get("/album", (req, res) => {
  let selection = req.query["name"];
  res.type("text");
  if (albInfo.has(selection)) {
    res.send(albInfo.get(selection));
  } else {
    res.status(NOT_FOUND).send("Album" + selection + "not Found");
  }
});

app.use(express.static("public"));
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT);