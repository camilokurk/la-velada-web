const days = document.getElementById("days")
const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")

const timeEvent = new Date("2027-07-17T20:00:00");

function calculate() {
    const calc = Math.floor((timeEvent - Date.now()) / 1000)

    if (calc <= 0) {
        clearInterval(interval)
        days.textContent = "00"
        hours.textContent = "00"
        minutes.textContent = "00"
        seconds.textContent = "00"
        return
    }

    const d = Math.floor(calc / 86400)
    const h = Math.floor((calc % 86400) / 3600)
    const m = Math.floor((calc % 3600) / 60)
    const s = Math.floor(calc % 60)

    const dd = String(d).padStart(2, "0")
    const hh = String(h).padStart(2, "0")
    const mm = String(m).padStart(2, "0")
    const ss = String(s).padStart(2, "0")

    days.textContent = dd
    hours.textContent = hh
    minutes.textContent = mm
    seconds.textContent = ss
}

const interval = setInterval(calculate, 1000);

calculate()