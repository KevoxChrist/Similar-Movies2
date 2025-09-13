const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");
const similarBtn = document.querySelectorAll(".similar-btn")

form.addEventListener("input", async (e) => {
  e.preventDefault(); // stop page reload
  const query = input.value;

  const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
  const data = await response.json();


  const movieCard = data.results
    .map(
      (movie) => `
        <div class="movie-card" id=${movie.id}>
          <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" 
               alt="${movie.title} Poster">
            <div class = "movie-desc">
               <p >${movie.title} (${movie.release_date})</p>
           <button class="similar-btn">Similar</button>
        </div>

        
          <div class="similar-content"></div>
      
           </div>
      `
    )
    .join("");


//// <button class="similar-btn">Similar</button>

  resultsDiv.innerHTML = movieCard 
});




resultsDiv.addEventListener("click", async (e) => {
  if (e.target.classList.contains("similar-btn")) {
    e.stopPropagation();

    const card = e.target.closest(".movie-card"); //This will get the closet movie card which would be the parent div
    const movieId = card.id; //movie card div's id

  

    console.log("Movie ID:", movieId);

    const response = await fetch(`/similar?movie_id=${movieId}`);
    const data = await response.json();

    
    card.innerHTML +=data.results
    .map(
      (movie) => `<p> ${movie.title}</p>`
        
    )
    .join("");

    console.log("Similar movies:", data);
    
  }
});



fetch("https://backend-sim-movie2.vercel.app/")
  .then(res => res.json())
  .then(data => console.log(data));
