require("dotenv").config();

var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var argument1 = process.argv[2]
var argument2 = process.argv.slice(3).join(" ");

// var nodeArgs = process.argv;


if (argument1 === "spotify-this") {

  var artist = argument2

  spotify.search({ type: 'artist', query: artist }, function(err, data) {
  
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
    console.log(data.artists.items[0]);
  
  });

}




// var artist = process.argv[3]
// var bandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// axios.get(bandsintown).then(
//   function(response) {
//     console.log(response);
//   })


// var movie = process.argv[3]
// var ombd = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

// for (var i = 2; i < nodeArgs.length; i++) {

//     if (i > 2 && i < nodeArgs.length) {
//       movie = movie + "+" + nodeArgs[i];
//     } else {
//       movie += nodeArgs[i];
  
//     }
//   }

// axios.get(ombd).then(
// function(response) {
//     console.log(response);
// })

// var movie = process.argv[3]
// var ombd = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

// axios.get(ombd).then(
// function(response) {
//     console.log(response);
// })

