// http://www.omdbapi.com/?i=tt3896198&apikey=28f74bb9

// http://www.omdbapi.com/?i=tt3896198&apikey=28f74bb9

const movieSearchBox = document.getElementById("movie-search-box");

const searchList = document.getElementById("search-list");

const resultGrid = document.getElementById("result-grid");

// load movies from the API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=28f74bb9`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  //   console.log(data);
  //   console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in a data-id
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "img/Image_not_available.png";

    movieListItem.innerHTML = `
        <div class = "search-item-preview">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `
        http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=28f74bb9`
      );
      const movieDetails = await result.json();
      //   console.log(movieDetails);
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = ` 
    
    <div class="movie-poster">
      <img src="${
        details.Poster != "N/A" ? details.Poster : "img/Image_not_available.png"
      }" alt="movie poster" />
    </div>
    <div class="movie-info">
      <h3 class="movie-title">${details.Title}</h3>
      <ul class="movie-misc-info">
        <li class="year"> ${details.Year}</li>
        <li class="rated">${details.Rated}</li>
        <li class="released">Released: ${details.Released}</li>
      </ul>
      <p class="genre"><b>Genre:</b>${details.Genre}</p>
      <p class="director"><b>Director:</b>${details.Director}</p>
      <p class="writer">
        <b>Writer:</b>${details.Writer}
      </p>
      <p class="stars">
        <b>Stars:</b>${details.Actors}
      </p>
      <p class="plot">
      ${details.Plot}
      </p>
      <p class="language"><b>Language:</b> ${details.Language}</p>
      <button id="fav" onclick="fav()"><i class="fa-solid fa-heart"></i></button></br>
      <button id="no-fav" onclick="notAdded()"><img src="img/no-favourite.png"></button>
    </div> 
    `;
}

function notAdded() {
  let text = "Press a button for confirmation!\nEither Ok or Cancel.";
  if (confirm(text) == true) {
    alert(
      "Your call !!! 🙋 you have removed your favourite movie successfully"
    );
  } else {
    alert("You are still in process of thinking 🤔giva a shot..");
  }
}

function fav(message) {
  alert("Hurray!!! 😊 Your favourite movie is added successfully");
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
