require("dotenv").config();

var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios');
var keys = require("./keys.js");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var argument1 = process.argv[2]
var argument2 = process.argv.slice(3).join(" ");

function movie () {
  var movie = argument2
  var ombd = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

  axios.get(ombd).then(
    function (response) {

      var showMovieData = [
        "\n\nTitle: " + response.data.Title,
        "Release Year: " + response.data.Year,
        "IMBD Rating: " + response.data.Ratings[0].Value,
        "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
        "Country of Production: " + response.data.Country,
        "Language: " + response.data.Language,
        "Plot: " + response.data.Plot,
        "Actors: " + response.data.Actors + "\n\n"
      ].join("\n\n");

      console.log(showMovieData);
    
    })
}

function song () {
  var song = argument2

spotify.search({ type: 'track', query: song }, function(err, data) {

  if (err) {
  return console.log('Error occurred: ' + err);
  }

  var spotifyResult = data.tracks.items[0, 1, 2]

  var showSpotifyData = [
    "\n\nSong: " + spotifyResult.name,
    "Album: " + spotifyResult.album.name,
    "Artist(s): " + spotifyResult.album.artists[0].name,
    "Spotify URL: " + spotifyResult.external_urls.spotify + "\n\n"
  ].join("\n\n");

  console.log(showSpotifyData);

});
}

function concert() {
  var artist = argument2
  var bandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  
  axios.get(bandsintown).then(
    function(response) {

      var dateTime = moment(response.data[0].datetime).format('LLLL');

      var showConcertData = [
        "\n\nVenue: " + response.data[0].venue.name,
        "Location: " + response.data[0].venue.region + ", " + response.data[0].venue.city,
        "Date: " + dateTime + "\n\n"
      ].join("\n\n");

      console.log(showConcertData);

    })
}

if (argument1 === "spotify-this") {

 song();

} 

else if (argument1 === "concert-this") {
 
  concert();
}

else if (argument1 === "movie-this") {

  movie();
}

else if (argument1 === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    for (var i = 0; i < dataArr.length; i++) {

      console.log(dataArr[i]);

      // song();
      // concert();
      // movie();
    }

  });

}

else {
  console.log('\n†††††††††††††††††††††††††††††††††††††††††††††††††††††\n\nWelcome to Liri v.0.0.0.1. \n\nSearch songs, concerts, and movies using the following commands:\n\n·spotify-this-song\n·concert-this \n·movie-this \n\n-or- \n\n·do-what-it-says for a random search\n')
}









