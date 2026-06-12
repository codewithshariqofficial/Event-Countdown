/**
 * Event Countdown Application Logic
 */

class EventApp {
    constructor() {
        this.events = JSON.parse(localStorage.getItem('events')) || [];
        this.grid = document.getElementById('events-grid');
        this.emptyState = document.getElementById('empty-state');
        this.modal = document.getElementById('modal-overlay');
        this.form = document.getElementById('event-form');
        this.addBtn = document.getElementById('add-event-btn');
        this.closeBtn = document.getElementById('close-modal');
        this.cancelBtn = document.getElementById('cancel-btn');

        this.init();
    }

    init() {
        // Event Listeners
        this.addBtn.addEventListener('click', () => this.toggleModal(true));
        this.closeBtn.addEventListener('click', () => this.toggleModal(false));
        this.cancelBtn.addEventListener('click', () => this.toggleModal(false));
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.toggleModal(false);
        });

        this.form.addEventListener('submit', (e) => this.handleAddEvent(e));

        // Start the update loop
        this.render();
        setInterval(() => this.updateCountdowns(), 1000);
    }

    toggleModal(show) {
        if (show) {
            this.modal.classList.remove('hidden');
        } else {
            this.modal.classList.add('hidden');
            this.form.reset();
        }
    }

    handleAddEvent(e) {
        e.preventDefault();
        const title = document.getElementById('event-title').value;
        const dateStr = document.getElementById('event-date').value;
        const color = document.getElementById('event-color').value;
        const targetDate = new Date(dateStr).getTime();
        const createdAt = new Date().getTime();

        if (isNaN(targetDate)) return;

        const newEvent = {
            id: Date.now().toString(),
            title,
            targetDate,
            createdAt,
            color
        };

        this.events.push(newEvent);
        this.save();
        this.toggleModal(false);
        this.render();
    }

    deleteEvent(id) {
        this.events = this.events.filter(e => e.id !== id);
        this.save();
        this.render();
    }

    save() {
        localStorage.setItem('events', JSON.stringify(this.events));
    }

    render() {
        // Clear grid except empty state
        const cards = this.grid.querySelectorAll('.event-card');
        cards.forEach(card => card.remove());

        if (this.events.length === 0) {
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';

        this.events.forEach(event => {
            const card = this.createEventCard(event);
            this.grid.appendChild(card);
        });

        this.updateCountdowns();
    }

    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.id = `card-${event.id}`;
        card.style.setProperty('--event-color', event.color || '#4f46e5');
        
        const dateDisplay = new Date(event.targetDate).toLocaleString();

        card.innerHTML = `
            <button class="delete-event" onclick="app.deleteEvent('${event.id}')">&times;</button>
            <h3 class="event-title" style="color: var(--event-color)">${event.title}</h3>
            <p class="event-date-display">${dateDisplay}</p>
            
            <div class="progress-ring-container">
                <svg class="progress-ring" width="150" height="150">
                    <circle class="progress-ring__background" stroke-width="8" fill="transparent" r="66" cx="75" cy="75"/>
                    <circle class="progress-ring__circle" stroke-width="8" fill="transparent" r="66" cx="75" cy="75"
                        stroke-dasharray="414.69" stroke-dashoffset="414.69" style="stroke: var(--event-color)"/>
                </svg>
                <div class="countdown-values">
                    <div class="time-value" id="percent-${event.id}" style="color: var(--event-color)">0%</div>
                    <div class="time-label">Remaining</div>
                </div>
            </div>

            <div class="countdown-timer">
                <div class="time-unit">
                    <span class="time-value" id="days-${event.id}">0</span>
                    <span class="time-label">Days</span>
                </div>
                <div class="time-unit">
                    <span class="time-value" id="hours-${event.id}">0</span>
                    <span class="time-label">Hrs</span>
                </div>
                <div class="time-unit">
                    <span class="time-value" id="mins-${event.id}">0</span>
                    <span class="time-label">Min</span>
                </div>
                <div class="time-unit">
                    <span class="time-value" id="secs-${event.id}">0</span>
                    <span class="time-label">Sec</span>
                </div>
            </div>
        `;

        return card;
    }

    updateCountdowns() {
        const now = new Date().getTime();

        this.events.forEach(event => {
            const timeLeft = event.targetDate - now;
            const totalTime = event.targetDate - event.createdAt;
            
            const daysEl = document.getElementById(`days-${event.id}`);
            const hoursEl = document.getElementById(`hours-${event.id}`);
            const minsEl = document.getElementById(`mins-${event.id}`);
            const secsEl = document.getElementById(`secs-${event.id}`);
            const percentEl = document.getElementById(`percent-${event.id}`);
            const circle = document.querySelector(`#card-${event.id} .progress-ring__circle`);

            if (!daysEl || !circle) return;

            if (timeLeft <= 0) {
                this.handleFinishedEvent(event);
                return;
            }

            // Calculate units
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Update text
            this.updateValue(daysEl, days);
            this.updateValue(hoursEl, hours);
            this.updateValue(minsEl, mins);
            this.updateValue(secsEl, secs);

            // Update Progress Ring
            const percent = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
            percentEl.textContent = `${Math.round(percent)}%`;

            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (percent / 100 * circumference);
            circle.style.strokeDashoffset = offset;
        });
    }

    updateValue(el, val) {
        const oldVal = el.textContent;
        if (oldVal !== val.toString()) {
            el.textContent = val;
            el.classList.add('changing');
            setTimeout(() => el.classList.remove('changing'), 300);
        }
    }

    handleFinishedEvent(event) {
        const card = document.getElementById(`card-${event.id}`);
        if (!card) return;
        
        card.classList.add('finished');
        const timer = card.querySelector('.countdown-timer');
        if (timer) timer.innerHTML = '<div class="time-value" style="grid-column: 1/-1; color: var(--success)">Event Started!</div>';
        
        const circle = card.querySelector('.progress-ring__circle');
        if (circle) circle.style.strokeDashoffset = 0;
        
        const percentEl = document.getElementById(`percent-${event.id}`);
        if (percentEl) percentEl.textContent = '0%';
    }
}

// Initialize the app
const app = new EventApp();
