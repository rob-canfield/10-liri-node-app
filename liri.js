require("dotenv").config();

var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var argument1 = process.argv[2]
var argument2 = process.argv.slice(3).join(" ");

if (argument1 === "spotify-this") {

  var artist = argument2

  spotify.search({ type: 'artist', query: artist }, function(err, data) {

  if (err) {
  return console.log('Error occurred: ' + err);
  }

  console.log(data.artists.items[0]);

});

} 

else if (argument1 === "concert-this") {

  var artist = argument2
  var bandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  
  axios.get(bandsintown).then(
    function(response) {
      console.log(response);
    })
}

else if (argument1 === "movie-this") {

  var movie = argument2
  var ombd = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

  axios.get(ombd).then(
    function (response) {
      console.log(response);
    })

}

else if (argument1 === "do-what-it-says") {
  
}

else {
  console.log('\n†††††††††††††††††††††††††††††††††††††††††††††††††††††\n\nWelcome to Liri v.0.0.0.1. \n\nSearch songs, concerts, and movies using the following commands:\n\n·spotify-this-song\n·concert-this \n·movie-this \n\n-or- \n\n·do-what-it-says for a random search\n')
}









