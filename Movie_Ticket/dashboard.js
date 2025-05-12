let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Login first!");
  window.location.href = "index.html";
}

let tickets = JSON.parse(localStorage.getItem("tickets_" + currentUser.username)) || [];

const form = document.getElementById("ticketForm");
const container = document.getElementById("ticketContainer");

form.addEventListener("submit", function (e) {
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
