require("dotenv").config();
var keys = require("./keys")
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");


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
    default:
        console.log("Not a command, please refer to readme for commands.");
        return;
}

function mytweets() {

    var twitterURLQuery = "statuses/user_timeline";

    var params = { user_id: "1016817745827123205", count: 20 }

    client.get(twitterURLQuery, params, function (err, tweets) {

        if (!err) {
            for (let i = 0; i < tweets.length; i++) {
                tweetData = `You tweeted "${tweets[i].text}" on ${tweets[i].created_at}\n`;
                log(tweetData);
                console.log(tweetData);
            };
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

                    log(songData);
                    console.log(songData);
                }
            }
            else if (err) {
                console.log(err);
                return;
            };

        });
    };
    if (!titleFull) {
        console.log("No song selected, defaulting to The Sign by Ace of Base...")
        titleFull = "the sign ace of base"
        spotifySong();
    };
};

function movie() {

    if (titleFull) {
        var movieURL = `https://www.omdbapi.com/?t=${titleFull}&y=&plot=short&apikey=${omdbKey}`

        request(movieURL, function (error, response, body) {
            if (!error) {
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

                log(movieData);
                console.log(movieData);

            } else if (error) {
                console.log(error);
                console.log(response);
            };
        });
    };
    if (!titleFull) {
        console.log("No movie title entered, defaulting to Mr. Nobody... apparently, it is on Netflix.")
        titleFull = "Mr. Nobody";
        movie();
    };
};

function doIt() {
    log();
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        else {

            var pull = data.split(",")
            liriRequest = pull[0];
            titleFull = pull[1].split(`"`).join("");

            // i really tried to get the original switch to be run with recursion, but I don't have any more time to devote to it and just created another one.

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
                default:
                    return;
            };
        };
    });
};

function log(content) {
    var stamp = new Date();
    var str = `\n${spacer}\n/////////////////Date: ${stamp}| Request: ${liriRequest}/////////////////\n${content}`

    fs.appendFile("log.txt", str, function (err) {
        if (err) {
            return console.log(err);
        };
    });
}







