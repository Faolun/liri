require("dotenv").config();
var keys = require("./keys")
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdbApi = require('omdb-client');

var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);
var omdbKey = keys.omdb.key;

//process.argv
var liriRequest = process.argv[2];
var titleBash = process.argv;

var titleFull = "";
for (var i = 3; i < titleBash.length; i++) {
    titleFull = titleFull.trim() + " " + titleBash[i];
}

switch(liriRequest){
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

//var twitterURLQuery = "https://api.twitter.com/1.1/statuses/home_timeline.json"
var twitterURLQuery = "statuses/home_timeline"

var params = {count: 20}

client.get(twitterURLQuery, params, function(error, tweets){
    if(!error){
        for (let i = 0; i < tweets.length; i++) {
            console.log(`You tweeted "${tweets[i].text}" on ${tweets[i].created_at}\n`);           
        }
    }
});
};

function spotifySong() {

spotify.search({ type: 'track', query: titleFull, limit: 5 }, function(err,response) {
    if (err) {
        console.log(err);
        return;
    } 
    //TODO ACE OF BASS
    // if(response.statusCode === 204) {

    //     console.log("DEAD")
    // }
    else {

        console.log(`\n Here are the first five Spotify results for: "${titleFull.toUpperCase()}"`)
        console.log(`--------------------------------------------------`)

    var trackData = response.tracks.items
    for (let i = 0; i < trackData.length; i++) {

        var trackList = response.tracks.items[i];
        console.log(`
        Artist: ${trackList.artists[0].name}
        Song Name: ${trackList.name}
        Spotify Link: ${trackList.external_urls.spotify}
        Album: ${trackList.album.name}
        `);
    };
    };
});
}


function movie() {

if (titleFull === "") {
    titleFull = "Mr. Nobody";
    movie();
}else {
console.log(titleFull)

var params = {
    apiKey: omdbKey,
    title: titleFull.split(" ").join("+"),
    // plot: short,
    incTomatoes: true
}
omdbApi.get(params, function(err, data) {
    if (err){
        console.log(err);
    } else {
        console.log(`
        -------------------------------------------------------
        ${data.Title}
        -------------------------------------------------------
        Year: ${data.Year}
        IMDB Rating: ${data.Ratings[0].Value}
        Rotten Tomato Score: ${data.Ratings[1].Value}
        Country: ${data.Country}
        Language(s): ${data.Language}
        -------------------------------------------------------
        Short Plot: ${data.Plot}
        Starring: ${data.Actors}
        `);
    };
    
});
};
};

// function doIt() {
//     fs.readFile("random.txt", "utf8", function(error, data) {

//         if (error) {
//           return console.log(error);
//         }

//         titleFull = data.split(",").join();

      
//       });
// }







