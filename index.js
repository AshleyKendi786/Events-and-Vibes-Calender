 // Base API URL
const API_URL = "http://localhost:3000/events";

// Selectors
const eventContainer = document.getElementById("event-list");
const filterSelect = document.getElementById("filter");
const form = document.getElementById("rsvp-form");

// Fetch and display all events
function fetchEvents() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => renderEvents(data))
    .catch(err => console.error("Fetch error:", err));
}

// Render events to the DOM
function renderEvents(events) {
  eventContainer.innerHTML = "";
  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card p-4 bg-white rounded shadow mb-4";
    card.innerHTML = `
      <img src="${event.image}" class="rounded mb-2" alt="${event.title}" />
      <h3 class="text-lg font-bold">${event.title}</h3>
      <p><strong>Type:</strong> ${event.type}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
    `;
    eventContainer.appendChild(card);
  });
}

// Filter events by type
filterSelect.addEventListener("change", (e) => {
  const type = e.target.value;
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const filtered = type === "All" ? data : data.filter(event => event.type === type);
      renderEvents(filtered);
    });
});

// Handle RSVP form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const eventTitle = form.event.value;

  if (!name || !email || !eventTitle) return alert("Fill in all fields!");

  console.log(`RSVP: ${name} (${email}) for "${eventTitle}"`);
  alert(`🎉 Thanks for RSVPing, ${name}!`);

  form.reset();
});

// Initial load
fetchEvents();
