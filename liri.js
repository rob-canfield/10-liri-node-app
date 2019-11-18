require("dotenv").config();

var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios');
var keys = require("./keys.js");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var argument1 = process.argv[2]
var argument2 = process.argv.slice(3).join(" ");

function movie (argument2) {
  var movie = argument2
  var omdb = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy"

  axios.get(omdb).then(
    function (response) {

      var showMovieData = [
        "\n\nMOVIE SEARCH RESULTS",
        "===================================================\n",
        "Title: " + response.data.Title,
        "Release Year: " + response.data.Year,
        "IMBD Rating: " + response.data.imdbRating,
        "Rotten Tomatoes Rating: " + response.data.tomatoRating,
        "Country of Production: " + response.data.Country,
        "Language: " + response.data.Language,
        "Plot: " + response.data.Plot,
        "Actors: " + response.data.Actors + "\n\n"
      ].join("\n\n");

      if (!response.data.Title){
        console.log("\n\n===================================================")
        console.log("Sorry, I couldn't find that one. Please try again.")
        console.log("===================================================\n\n")
      }
      else{
        console.log(showMovieData);
      }

      fs.appendFile("log.txt", showMovieData, function(error) {

        if (error) {
          console.log(error);
        }
        else {
          console.log("Search Added to log.txt!");
        }
      
      });
    })


}

function song (argument2) {
  var song = argument2

  spotify.search({ type: 'track', query: song }, function (error, data) {

    if (error) {
        console.log("\n\n===================================================");
        console.log("Sorry, I couldn't find that one. Please try again.");
        console.log("===================================================\n\n");
        return error;
    }

    var spotifyResult = data.tracks.items[0, 1, 2]

    var showSpotifyData = [
      "\n\nSONG SEARCH RESULTS",
      "===================================================\n",
      "Song: " + spotifyResult.name,
      "Album: " + spotifyResult.album.name,
      "Artist(s): " + spotifyResult.album.artists[0].name,
      "Spotify URL: " + spotifyResult.external_urls.spotify + "\n\n"
    ].join("\n\n");

    console.log(showSpotifyData);


    fs.appendFile("log.txt", showSpotifyData, function(error) {

      if (error) {
        console.log(error);
      }
      else {
        console.log("Search Added!");
      }
    
    });

  });


}

function concert(argument2) {
  var artist = argument2
  var bandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  
  axios.get(bandsintown).then(
    function(response) {

      var dateTime = moment(response.data[0].datetime).format('LLLL');

      var showConcertData = [
        "\n\nCONCERT SEARCH RESULTS\n",
        "===================================================",
        "Lineup: " + response.data[0].lineup,
        "Venue: " + response.data[0].venue.name,
        "Location: " + response.data[0].venue.region + ", " + response.data[0].venue.city,
        "Date: " + dateTime + "\n\n"
      ].join("\n\n");


      if (!response.data[0].lineup){
        console.log("\n\n===================================================")
        console.log("Sorry, I couldn't find that one. Please try again.")
        console.log("===================================================\n\n")
      }
      else{
        console.log(showConcertData);
      }
    

      fs.appendFile("log.txt", showConcertData, function(error) {

        if (error) {
          console.log(error);
        }
        else {
          console.log("Search Added!");
        }
      
      });

    })  
}

function random() {

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      console.log("Sorry! That didn't work.");
      return error;
    }

    var dataArr = data.split(",");

    for (var i = 0; i < dataArr.length; i++) {

      var songRandom = dataArr[1]
      var concertRandom = dataArr[3]
      var movieRandom = dataArr[5]

    }

    song(songRandom);
    concert(concertRandom);
    movie(movieRandom);

  });
}

switch(argument1) {
  case "spotify-this":
    song()
    break;
  case "concert-this":
    concert()
    break;
  case "movie-this":
    movie()
    break;
  case "do-what-it-says":
    random()
    break;
  default:
      console.log('\n†††††††††††††††††††††††††††††††††††††††††††††††††††††\n\nWelcome to Liri v.0.0.0.1. \n\nSearch songs, concerts, and movies using the following commands:\n\n·spotify-this-song\n·concert-this \n·movie-this \n\n-or- \n\n·do-what-it-says for a random search\n');  
}