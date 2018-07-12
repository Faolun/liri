require("dotenv").config();
var keys = require("./keys")
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");



var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);


var liriRequest = process.argv[2];
var titleBash = process.argv;

var titleFull = "";

// Capture all the words in the address (again ignoring the first two Node arguments)
for (var i = 3; i < titleBash.length; i++) {
    titleFull = titleFull + " " + titleBash[i];
}


switch(liriRequest){
    case "my-tweets":
    mytweets();
    break;
    case "spotify-this-song":
    spotifySong();
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

spotify.search({ type: 'track', query: titleFull }, function(err,response) {
    if (err) {
        console.log(err);
        return;
    } else {

        console.log(`\n Here are the first five Spotify results for:${titleFull.toUpperCase()}`)
        console.log(`--------------------------------------------------`)

    // var trackData = response.tracks.items
    // for (let i = 0; i < trackData.length; i++) {
    // set to give first five instead of all returns ^

    for (let i = 0; i < 5 ; i++) {
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


