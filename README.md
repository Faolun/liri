# liri
Language Interpretation and Recognition Interface using Node

Has NPM requirements.

"npm install" to install all required npm located in package.json.

All returned data is logged to console and log.txt with timestamp.

node commands:

    "node liri my-tweets"

        Displays my last twenty tweets to console.

    "node liri spotify-this-song 'song title'"

        Displays up to 5 Spotify data sets for the song title entered.
            Data sets include:
                Artist
                Song Name
                Spotify Link
                Album

    "node liri movie-this 'movie title'"

        Displays movie data from OMDB for the movie title entered.
            Data sets include:
                Title
                Year
                IMDB Rating
                Rotten Tomato Score
                Country
                Language(s)
                Plot Synopsis
                Actors

    "node liri do-what-it-says"

        Pulls commands from the random.txt file and runs them.

    James C Coates ~ 2018
    james.coatesiii@gmail.com






