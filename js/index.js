const refs = {
    startBtn: document.querySelector('button[data-action="start"]'),
    stopBtn: document.querySelector('button[data-action="stop"]'),
    days: document.querySelector('.value[data-value="days"]'),
    hours: document.querySelector('.value[data-value="hours"]'),
    mins: document.querySelector('.value[data-value="mins"]'),
    secs: document.querySelector('.value[data-value="secs"]'),
    field: document.querySelector('.field')

  

}

class Timer {
    constructor({ onTick, targetDate, selector }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
        this.targetDate = targetDate;
        this.selector = selector;
        this.init();
    }
    init() {
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }
    start() {
        if (this.isActive) {
            return;
        }

        const startTime = new Date('June 20, 2021');
      
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
           
            const deltaTime = currentTime - startTime;
    
            const time = this.getTimeComponents(-deltaTime);
            this.onTick(time);
         
        }, 1000);
    
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))); 
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }
    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateInterface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateInterface({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`,
    refs.hours.textContent = `${hours}`,
    refs.mins.textContent = `${mins}`,
    refs.secs.textContent = `${secs}`;
}