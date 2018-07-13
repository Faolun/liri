require("dotenv").config();
var keys = require("./keys")
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdbApi = require('omdb-client');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbKey = keys.omdb.key;

var spacer = `-------------------------------------------------------`

//process.argv
var liriRequest = process.argv[2];
var titleFull = process.argv.slice(3).join(" ");

switch (liriRequest) {
    case "my-tweets":
        mytweets();
        break;
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doIt();
        break;
}

function mytweets() {

    var twitterURLQuery = "statuses/user_timeline"

    var params = { user_id: "1016817745827123205", count: 20 }

    client.get(twitterURLQuery, params, function (err, tweets) {

        if (!err) {
            for (let i = 0; i < tweets.length; i++) {
                console.log(`You tweeted "${tweets[i].text}" on ${tweets[i].created_at}\n`);
            }
        };
        if (err) {
            console.log(err);
        };
    });
};

function spotifySong() {


    if (titleFull) {
        spotify.search({ type: 'track', query: titleFull, limit: 5 }, function (err, response) {

            if (!err) {
                console.log(`\nHere are the first five Spotify results for "${titleFull.toUpperCase()}"...`, )
                var trackData = response.tracks.items
                for (let i = 0; i < trackData.length; i++) {
                    var trackList = response.tracks.items[i];
                    var songData = [
                        spacer,
                        `Artist: ${trackList.artists[0].name}`,
                        `Song Name: ${trackList.name}`,
                        `Spotify Link: ${trackList.external_urls.spotify}`,
                        `Album: ${trackList.album.name}`
                    ].join("\n");

                    console.log(songData);
                }
            }
            else if (err) {
                console.log(err);
                return;
            }

        })
    }
    if (!titleFull) {
        titleFull = "the sign ace of base"
        spotifySong();
    }
};

function movie() {

    if (titleFull) {
        var movieURL = `https://www.omdbapi.com/?t=${titleFull}&y=&plot=short&apikey=${omdbKey}`

        request(movieURL, function (error, response, body) {
            if(!error) {
                var data = JSON.parse(body)
                var movieData = [
                spacer,
                data.Title,
                spacer,
                `Year: ${data.Year}`,
                `IMDB Rating: ${data.Ratings[0].Value}`,
                `Rotten Tomato Score: ${data.Ratings[1].Value}`,
                `Country: ${data.Country}`,
                `Language(s): ${data.Language}`,
                spacer,
                `Short Plot: ${data.Plot}`,
                `Starring: ${data.Actors}`
            ].join("\n")

            console.log(movieData);
        } else if(error) {
        console.log(error);
        console.log(response);
        }
        })
    }
    if (!titleFull) {
        console.log("No movie title entered, defaulting to Mr. Nobody... apparently, it is on Netflix.")
        titleFull = "Mr. Nobody";
        movie();
    }
}


function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }

        else {

            console.log(data)
      
        var pull = data.split(",")
            liriRequest = pull[0];
            titleFull = pull[1].split(`"`).join("");


            console.log(pull)
            console.log(liriRequest)
            console.log(titleFull)

            
            
            
        }




      });
}







