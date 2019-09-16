require("dotenv").config();

var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios');
var keys = require("./keys.js");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var argument1 = process.argv[2]
var argument2 = process.argv.slice(3).join(" ");

function movie (searchTerm) {
  var movie = searchTerm
  var ombd = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

  axios.get(ombd).then(
    function (response) {

      var showMovieData = [
        "\n\nMOVIE SEARCH RESULTS\n",
        "Title: " + response.data.Title,
        "Release Year: " + response.data.Year,
        "IMBD Rating: " + response.data.imdbRating,
        // "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
        "Country of Production: " + response.data.Country,
        "Language: " + response.data.Language,
        "Plot: " + response.data.Plot,
        "Actors: " + response.data.Actors + "\n\n"
      ].join("\n\n");

      console.log(showMovieData);
    
      fs.appendFile("log.txt", showMovieData, function(err) {

        if (err) {
          console.log(err);
        }
        else {
          console.log("Search Added!");
        }
      
      });
    })


}

function song (searchTerm) {
  var song = searchTerm

  spotify.search({ type: 'track', query: song }, function (err, data) {

    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var spotifyResult = data.tracks.items[0, 1, 2]

    var showSpotifyData = [
      "\n\nSONG SEARCH RESULTS\n",
      "Song: " + spotifyResult.name,
      "Album: " + spotifyResult.album.name,
      "Artist(s): " + spotifyResult.album.artists[0].name,
      "Spotify URL: " + spotifyResult.external_urls.spotify + "\n\n"
    ].join("\n\n");

    console.log(showSpotifyData);

    fs.appendFile("log.txt", showSpotifyData, function(err) {

      if (err) {
        console.log(err);
      }
      else {
        console.log("Search Added!");
      }
    
    });

  });


}

function concert(searchTerm) {
  var artist = searchTerm
  var bandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  
  axios.get(bandsintown).then(
    function(response) {

      var dateTime = moment(response.data[0].datetime).format('LLLL');

      var showConcertData = [
        "\n\nCONCERT SEARCH RESULTS\n`",
        "Lineup: " + response.data[0].lineup,
        "Venue: " + response.data[0].venue.name,
        "Location: " + response.data[0].venue.region + ", " + response.data[0].venue.city,
        "Date: " + dateTime + "\n\n"
      ].join("\n\n");

      console.log(showConcertData);

      fs.appendFile("log.txt", showConcertData, function(err) {

        if (err) {
          console.log(err);
        }
        else {
          console.log("Search Added!");
        }
      
      });

    })

  
}


if (argument1 === "spotify-this") {

 song(argument2);

} 

else if (argument1 === "concert-this") {
 
  concert(argument2);
}

else if (argument1 === "movie-this") {

  movie(argument2);
}

else if (argument1 === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
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

else {
  console.log('\n†††††††††††††††††††††††††††††††††††††††††††††††††††††\n\nWelcome to Liri v.0.0.0.1. \n\nSearch songs, concerts, and movies using the following commands:\n\n·spotify-this-song\n·concert-this \n·movie-this \n\n-or- \n\n·do-what-it-says for a random search\n')
}











