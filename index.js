async function fetchTz() {
    let response = await fetch('./Timezone.json');
    let data = await response.json();
    return data;
}
(async function () {
    let data = await fetchTz();
    selectOptions(data);

}());

const dateAndTime = document.querySelector('.dateTime');

let currentOffset = +5.5;
setInitial();
let timeStandard = document.createElement('h4');
timeStandard.textContent = "Asia/Kolkata";
dateAndTime.appendChild(timeStandard);

function selectOptions(data) {
    const timeZoneoptions = document.querySelector('.options');
    let selectZone = document.createElement('select');
    selectZone.name = "timezones";
    selectZone.id = "timeZones"
    selectZone.addEventListener('change', event => {
        setTimeZone(event);
    })
    timeZoneoptions.appendChild(selectZone);
    for (let val of data) {
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', `${val.offset}`);
        optionElement.setAttribute('data-tz', `${val.utc[0]}`);
        if (val.value == "India Standard Time") {
            optionElement.setAttribute('selected', 'selected');
        }
        optionElement.innerHTML = val.value;
        selectZone.appendChild(optionElement);
    }
}

function setTimeZone(event) {
    console.log(event.target.value);
    currentOffset = event.target.value;
    console.log(currentOffset);
    setStandardZone(event);
    setInitial();
}

function setStandardZone(event) {
    timeStandard.textContent = event.target.options[event.target.selectedIndex].dataset.tz;
}

function setClock() {
    let d = new Date();
    let local = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = local + localOffset;
    let offset = JSON.parse(currentOffset);
    let city = utc + (3600000 * offset);
    d = new Date(city);

    let year = d.getFullYear();
    let mnth = d.getMonth();
    let day = d.getDay();
    let date = d.getDate();
    let hr = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    let pe = 'AM';

    if (hr > 12) {
        pe = "PM";
    }
    if (hr > 12) {
        hr = hr - 12;
    }
    if (hr == 0) {
        hr = 12;
    }
    if (hr < 10) {
        hr = `0${hr} `;
    }
    if (min < 10) {
        min = `0${min}`;
    }
    if (sec < 10) {
        sec = `0${sec}`;
    }

    let weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let values = [weeks[day], date, months[mnth], year, hr, min, sec, pe];
    let id = ['week', 'date', 'month', 'year', 'hr', 'min', 'sec', 'period'];
    for (let i = 0; i < id.length; i++) {
        document.getElementById(id[i]).innerHTML = values[i];
    }
}

function setInitial() {
    setInterval(() => {
        setClock();
    }, 1000);
}








