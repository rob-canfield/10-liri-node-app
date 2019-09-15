require("dotenv").config();

var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var argument1 = process.argv[2]
var argument2 = process.argv.slice(3).join(" ");

if (argument1 === "spotify-this") {

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

else if (argument1 === "concert-this") {

  var artist = argument2
  var bandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  
  axios.get(bandsintown).then(
    function(response) {

      // var showConcertData = [
      //   "\n\nVenue name: " + response.data.venue,
      //   "Venue Location: " + response.data.venue.city + ", " + response.data.venue.country,
      //   "Show date: " + response.data.datetime + "\n\n"
      // ].join("\n\n");

      console.log(response.data);

    })
}

else if (argument1 === "movie-this") {

  var movie = argument2
  var ombd = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

  axios.get(ombd).then(
    function (response) {

    
    })

}

else if (argument1 === "do-what-it-says") {

}

else {
  console.log('\n†††††††††††††††††††††††††††††††††††††††††††††††††††††\n\nWelcome to Liri v.0.0.0.1. \n\nSearch songs, concerts, and movies using the following commands:\n\n·spotify-this-song\n·concert-this \n·movie-this \n\n-or- \n\n·do-what-it-says for a random search\n')
}









