const watchlistResultsElement = document.getElementById("watchlist-results")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")


renderWatchlist()

function renderWatchlist() {
    const movieResults = JSON.parse(localStorage.getItem("Watchlist"))
    if (movieResults.length === 0) {
        watchlistResultsElement.innerHTML = ` 
        <div class="watchlist-placeholder"> 
            <p>Your watchlist is looking a little empty...</p>
             
             <a href="index.html"> <i class="fa-solid fa-circle-plus"> </i> Let's add some movies!</a>
        </div>
    `
    } else {
        renderWatchlistResults(movieResults)
    }
}


function removeMovieFromLocal(filmID) {
    let movieWatchlist = []
    const storedWatchlist = localStorage.getItem("Watchlist")

    if (storedWatchlist === null) {
        return
    }
    movieWatchlist = JSON.parse(storedWatchlist)
    const foundMovieIndex = movieWatchlist.findIndex((movie) => {
        return movie.imdbID === filmID
    })

    movieWatchlist.splice(foundMovieIndex, 1)
    const savedMovies = JSON.stringify(movieWatchlist)
    localStorage.setItem("Watchlist", savedMovies)

    renderWatchlist()
}

function renderWatchlistResults(movieResults) {
    let htmlString = ""
    movieResults.forEach(data => {
        htmlString += `
        <div class="movie-result">
            <div class="poster-details">
                <img class="poster-img" src="${data.Poster}" />   
            </div>
            <div class="movie-details">          
                <div class="movie-title">      
                    <h2> ${data.Title}</h2>
                        <p> ${data.Ratings[0] === undefined ? "Rating unavailable" : data.Ratings[0]?.Value.split("/")[0]} <i class="fa-solid fa-star"></i></p>
                </div>
                        <div class="small-detail">
                            <p> ${data.Runtime === "N/A" ? "Runtime unavailable" : data.Runtime} </p>
                            <p> ${data.Genre === "N/A" ? "Genre unavailable" : data.Genre} </p>
                            <button data-remove-button data-remove-id="${data.imdbID}" class="remove-btn"> <i class="fa-solid fa-circle-minus"> </i> Remove </button>
                        </div>
                        <div class="about-detail"> 
                            <p>${data.Plot === "N/A" ? "No description available" : data.Plot}</p> 
                        </div> 
                </div>
            </div>    
                `
    })
    watchlistResultsElement.innerHTML = htmlString
    document.querySelectorAll("[data-remove-button]").forEach(button => {
        button.addEventListener('click', () => removeMovieFromLocal(button.dataset.removeId))
    })
}