require("dotenv").config();
var keys = require("./keys")
var request = require("request");
var twitter = require("twitter");



// var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

// console.log(`Welcome to LIRI, what can I do for you today?`)
// console.log(`---------------------------------------------`)
// console.log(`Please issue one of the following commands after node liri.js...`)
// console.log(`---------------------------------------------`)
// console.log(`my-tweets | access your most recent tweets`)
// console.log(`spotifiy-this-song song | request spotify data for song`)
// console.log(`movie-this title| request movie data for title`)
// console.log(`do-what-it-says | ¯\_(ツ)_/¯`)

var liriRequest = process.argv[2];
switch(liriRequest){
    case "my-tweets":
    mytweets();
    break;
}

function mytweets() {

//var twitterURLQuery = "https://api.twitter.com/1.1/statuses/home_timeline.json"
var twitterURLQuery = "statuses/home_timeline"

var params = {count: 20}

client.get(twitterURLQuery, params, function(error, tweets, response){
    if(!error){
        for (let i = 0; i < tweets.length; i++) {
            console.log(`\n You tweeted "${tweets[i].text}" on ${tweets[i].created_at}\n`);
                       
        }

    }
   

});
};
