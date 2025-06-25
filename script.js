 // Base API URLs
const EVENT_API = "http://localhost:3000/events";
const RSVP_API = "http://localhost:3000/rsvps";

// Select DOM elements
const eventContainer = document.getElementById("event-list");
const filterSelect = document.getElementById("filter");
const form = document.getElementById("rsvp-form");
const rsvpList = document.getElementById("rsvp-list");

// ========== EVENTS ==========
function fetchEvents() {
  fetch(EVENT_API)
    .then(res => res.json())
    .then(data => renderEvents(data))
    .catch(err => console.error("Fetch error:", err));
}

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

filterSelect.addEventListener("change", (e) => {
  const type = e.target.value;
  fetch(EVENT_API)
    .then(res => res.json())
    .then(data => {
      const filtered = type === "All" ? data : data.filter(event => event.type === type);
      renderEvents(filtered);
    });
});

// ========== RSVP FORM ==========
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const eventTitle = form.event.value;

  if (!name || !email || !eventTitle) {
    alert("Please fill in all fields.");
    return;
  }

  const newRSVP = { name, email, event: eventTitle };

  fetch(RSVP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRSVP)
  })
    .then(res => res.json())
    .then(data => {
      alert(`🎉 Thanks for RSVPing, ${data.name}!`);
      form.reset();
      fetchRSVPs(); // Refresh list
    });
});

// ========== FETCH & RENDER RSVPs ==========
function fetchRSVPs() {
  fetch(RSVP_API)
    .then(res => res.json())
    .then(data => renderRSVPs(data));
}

function renderRSVPs(rsvps) {
  rsvpList.innerHTML = "";

  rsvps.forEach(rsvp => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${rsvp.name}</strong> – ${rsvp.email} (${rsvp.event})
      <button data-id="${rsvp.id}" class="edit-btn">✏️ Edit</button>
    `;
    rsvpList.appendChild(li);
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => editRSVP(btn.dataset.id));
  });
}

// ========== EDIT RSVP ==========
function editRSVP(id) {
  fetch(`${RSVP_API}/${id}`)
    .then(res => res.json())
    .then(rsvp => {
      const newName = prompt("Edit Name:", rsvp.name);
      const newEmail = prompt("Edit Email:", rsvp.email);
      const newEvent = prompt("Edit Event:", rsvp.event);

      if (newName && newEmail && newEvent) {
        fetch(`${RSVP_API}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newName,
            email: newEmail,
            event: newEvent
          })
        })
          .then(res => res.json())
          .then(() => fetchRSVPs());
      }
    });
}

// ========== INITIAL LOAD ==========
fetchEvents();
fetchRSVPs();
