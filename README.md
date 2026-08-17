<div align="center">

# Event Countdown Timer

**A beautiful countdown timer that counts down to any event â€” days, hours, minutes & seconds with animated UI. Built with HTML, CSS & JavaScript.**

[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-brightgreen?style=for-the-badge&logo=vercel&logoColor=white)](https://event-countdown.vercel.app)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## Topics

`html` `css` `javascript` `countdown-timer` `event-timer` `date-api` `real-time` `responsive-design` `front-end` `vanilla-js`

---

## About

A **stunning event countdown timer** perfect for product launches, weddings, birthdays, New Year, or any special occasion. Displays days, hours, minutes, and seconds in a visually appealing card layout.

Uses JavaScript **Date math** and **setInterval** for real-time countdown updates.

---

## Features

| Feature | Description |
|---------|-------------|
| Live Countdown | Ticks every second in real-time |
| 4-Unit Display | Days, Hours, Minutes, Seconds |
| Beautiful UI | Modern card-based design |
| Event Message | Shows message when timer ends |
| Responsive | Works on all screen sizes |
| Auto Calculate | Computes remaining time |
| Smooth Animations | CSS transitions |
| Custom Date | Set any target date |

---

## Tech Stack

```
HTML5  -->  Countdown Layout & Structure
CSS3   -->  Card Design, Grid Layout, Animations
JS     -->  Date Math, setInterval, DOM Manipulation
```

---

## How It Works

```javascript
const eventDate = new Date("2026-12-31 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
}

setInterval(updateCountdown, 1000);
```

---

## Quick Start

```bash
git clone https://github.com/codewithshariqofficial/Event-Countdown.git
cd Event-Countdown
start index.html
```

**To set your own event date**, edit the target in `script.js`:
```javascript
const eventDate = new Date("YOUR-DATE-HERE").getTime();
```

---

## Project Structure

```
Event-Countdown/
â”œâ”€â”€ index.html      # Main page
â”œâ”€â”€ script.js       # Countdown logic
â”œâ”€â”€ style.css       # Styling
â””â”€â”€ README.md
```

---

## Author

**Code With Shariq Official**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/codewithshariqofficial)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/codewithshariq1/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/codewithshariq1)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://muhammad-shariq-shahid.vercel.app/)
