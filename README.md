# Events-and-Vibes-Calender
This is a website made to connect people with different art in dance and fashion to come to connect and explore different art and culture through dance and fashion in shows workshops and even festivals.
This is a **Single Page Application (SPA)** for viewing, RSVPing to, and editing dance and fashion event registrations. Built with HTML, CSS, JavaScript, and JSON Server.

---

##  Features

* View a list of upcoming dance and fashion events
* Filter events by category (Dance, Fashion, All)
* Submit RSVP with your name, email, and selected event
* View list of RSVPs to see who is going
* Edit RSVP details after submission (name, email, or event) incase of an error or change of an event

---

##  Technologies Used

* HTML
* style CSS 
* JavaScript 
* [JSON Server] – Fake API for events & RSVPs
* Unsplash / Pexels image links for event thumbnails for beauty

---

##  Project Structure

```
events-vibes-project/
├── index.html        # Page structure
├── style.css         # Styling used style css
├── script.js         # JS logic for fetch, filter, RSVP, edit
├── db.json           # Mock database for events and RSVPs
├── README.md         # Project overview
```

---

## How It Works

## Events Section

* Fetches data from `http://localhost:3000/events`with the GET method to input data of the events
* Each event is displayed with title, image, date, and location
* Can be filtered using dropdown: All / Dance / Fashion

## RSVP Section

* Form collects Name, Email, and Selected Event
* Sends POST request to `http://localhost:3000/rsvps`
* Shows a list of all RSVPs
* Each RSVP has an “Edit” button that opens a prompt to update info
* PATCH request updates RSVP on server

---

##  Setup & Running the App

3. Open the project in VS Code and run `index.html` using **Live Server**:

* Right-click `index.html`
* Click **"Open with Live Server"**


##  Common Issues

## Images not showing?
Still an issue i am fixing
* Ensure you are not using `file://` path
* Use Live Server or serve over localhost
* Confirm the image URLs work by testing them in a new browser tab

---

## Made with love by Kendi
To show love for the website made by me.
For showcasing creativity and connecting fashion lovers and dancers in one community platfom.


## License
MIT License

Copyright (c) 2025 AshleyKendi786

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: