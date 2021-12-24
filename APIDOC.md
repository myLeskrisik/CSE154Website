# Album Recommendation API Documentation
The Album Recommendation API is provides reccomendations for albums based on a genre requested,
and then it will give information on a given album which is requested

## Get a list of albums
**Request Format:** /genre?name={name}

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a valid genre name, returns a list of album names corresponding to the requested genre. The genre shall be formatted in all lowercase.


**Example Request:** /genre?name=rock

**Example Response:**
```json
{
	info: [
		"Flying Microtonal Banana - King Gizzard and the Lizard Wizard",
		"The Black Parade - My Chemical Romance"
	]
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If passed in an invalid genre name, returns an error with the message: "Genre {name} not Found"

## *Fill in Endpoint 2 Title*
**Request Format:** /album?name={name}

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Given a valid album name 'name', returns a sentence or two explaining why given album is good. The album name should be all lowercase with no spaces.

**Example Request:** /album?name=theblackparade

**Example Response:**

```
A beautiful Emo album which has a very epic sound and very angsty lyrics which  may be a turn off to some, but is my favorite part of the whole thing, a classic.
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If an album of the name passed does not exist, an error is returned with message: 'Album {name} not found.'
