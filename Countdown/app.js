const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

function format(item) {
    if (item < 10) {
        return `0${item}`
    }
    return item
}


const giveawayDate = document.querySelector('#giveawayDate');
const countDown = document.querySelectorAll('.countDown');
const countDownElement = document.querySelector("#countDownElement");

const futureDate = new Date(2020, 8, 16, 00, 0, 0);

let year = futureDate.getFullYear();
let month = months[futureDate.getMonth()];
let date = format(futureDate.getDate())
let day = weekdays[futureDate.getDay()]

let hours = format(futureDate.getHours())
let minutes = format(futureDate.getMinutes())

giveawayDate.textContent = `Giveaway end on ${day}, ${date} ${month} ${year} ${hours}:${minutes}`;

// Future Time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const differenceTime = futureTime - today;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = format(Math.floor(differenceTime / oneDay));
    let hours = format(Math.floor((differenceTime % oneDay) / oneHour));
    let minutes = format(Math.floor((differenceTime % oneHour) / oneMinute));
    let secound = format(Math.floor((differenceTime % oneMinute) / 1000));
    const values = [days, hours, minutes, secound]

    countDown.forEach(function(elem, index) {
        elem.innerHTML = values[index]
    });

    if(differenceTime<0){
    	clearInterval(countDownTime);
    	countDownElement.innerHTML = `
    		 <div  class="font-semibold tracking-widest text-xl">
            	Sorry Countdown ends. Giveaway done.
            </div>
    	`
    }

}

// CountDown
let countDownTime = setInterval(getRemainingTime, 1000);
getRemainingTime()