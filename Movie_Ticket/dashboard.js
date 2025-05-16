let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Login first!");
  window.location.href = "index.html";
}

// TICKETS LOGIC
let tickets = JSON.parse(localStorage.getItem("tickets_" + currentUser.username)) || [];

const form = document.getElementById("ticketForm");
const container = document.getElementById("ticketContainer");

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const ticket = {
    id: Date.now(),
    title,
    description,
  };

  tickets.push(ticket);
  saveTickets();
  form.reset();
  renderTickets();
});

function renderTickets() {
  if (!container) return;
  container.innerHTML = "";
  tickets.forEach(ticket => {
    const div = document.createElement("div");
    div.className = "ticket";
    div.innerHTML = `
      <h3>${ticket.title}</h3>
      <p>${ticket.description}</p>
      <button onclick="editTicket(${ticket.id})">Edit</button>
      <button onclick="deleteTicket(${ticket.id})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteTicket(id) {
  tickets = tickets.filter(t => t.id !== id);
  saveTickets();
  renderTickets();
}

function editTicket(id) {
  const ticket = tickets.find(t => t.id === id);
  if (ticket) {
    const newTitle = prompt("New Title:", ticket.title);
    const newDesc = prompt("New Description:", ticket.description);
    ticket.title = newTitle;
    ticket.description = newDesc;
    saveTickets();
    renderTickets();
  }
}

function popLastTicket() {
  tickets.pop();
  saveTickets();
  renderTickets();
}

function saveTickets() {
  localStorage.setItem("tickets_" + currentUser.username, JSON.stringify(tickets));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

renderTickets();


// 🎬 MOVIE DASHBOARD LOGIC (with "Book Now" button)
const movies = [
  {
    id: 1,
    name: "Jawan",
    poster: "https://image.tmdb.org/t/p/w500/2.jpg",
    description: "Action thriller movie starring Shah Rukh Khan."
  },
  {
    id: 2,
    name: "Animal",
    poster: "https://image.tmdb.org/t/p/w500/3.jpg",
    description: "Ranbir Kapoor's powerful action drama."
  },
  {
    id: 3,
    name: "Pushpa 2",
    poster: "https://image.tmdb.org/t/p/w500/4.jpg",
    description: "Allu Arjun returns with Pushpa sequel."
  }
];

// Save movie list to localStorage once
localStorage.setItem("movies", JSON.stringify(movies));

const movieContainer = document.getElementById("movieContainer");
if (movieContainer) {
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.name}" width="200" />
      <h3>${movie.name}</h3>
      <p>${movie.description}</p>
      <button onclick="goToSeatSelection(${movie.id})">Book Now</button>
    `;
    movieContainer.appendChild(card);
  });
}

function goToSeatSelection(movieId) {
  localStorage.setItem("selectedMovie", movieId);
  window.location.href = "seat-selection.html";
}
