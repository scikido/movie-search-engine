const movieDetailsContainer = document.querySelector("#movie-details");
const apiKey = "YOUR_API_KEY"; // replace with your own API key

async function getMovieDetails() {
  const movieId = sessionStorage.getItem("movieId");

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
    );
    const data = await response.json();

    const { Title, Poster, Year, Runtime, Genre, Director, Plot } = data;
    const movieDetailsElement = document.createElement("div");
    movieDetailsElement.classList.add("movie-details");
    movieDetailsElement.innerHTML = `
      <img src="${
        Poster === "N/A"
          ? "https://via.placeholder.com/300x450/000000/FFFFFF/?text=No+Image+Available"
          : Poster
      }" alt="${Title}">
      <div class="movie-details-info">
        <h2>${Title} (${Year})</h2>
        <p><strong>Runtime:</strong> ${Runtime}</p>
        <p><strong>Genre:</strong> ${Genre}</p>
        <p><strong>Director:</strong> ${Director}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
      </div>
    `;
    movieDetailsContainer.appendChild(movieDetailsElement);
  } catch (err) {
    console.error(err);
    movieDetailsContainer.innerHTML = `<h2>Error: ${err.message}</h2>`;
  }
}

getMovieDetails();
