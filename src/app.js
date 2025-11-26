const defaultLocations = [
    { id: 'london', timezone: 'Europe/London'},
    { id: 'bangkok', timezone: 'Asia/Bangkok'},
    { id: 'new_york', timezone: 'America/New_York'}
    
];

function getTimeForTimezone(timezone){
    const now = new Date();

    const timeString = now.toLocaleTimeString('en-US', {
        timeZone:timezone,
        hour: '2-digit',
        minute:'2-digit',
        second:'2-digit',
        hour12:false

    });

    const dateString = now.toLocaleDateString('en-US', {
        timeZone:timezone,
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric',

    });

    return {time:timeString, date:dateString};
}
function getUserTimezone(){
    return Intl.DateTimeFormat().resolvedOptions().timeZone;

}
function updateTimes(){
    defaultLocations.forEach(location => {
        const {time, date} = getTimeForTimezone(location.timezone);
        const timeElement = document.getElementById (`time-${location.id}`);
        const dateElement = document.getElementById (`date-${location.id}`);

        if (timeElement) timeElement.textContent = time;
        if (dateElement) dateElement.textContent = date;

    });

    const userTimezone = getUserTimezone();
    const userTime = getTimeForTimezone(userTimezone);
    const userTimeElement = document.getElementById('time-user');
    const userDateElement = document.getElementById('date-user');
    const userTimezoneLabel = document.getElementById('userTimezoneLabel');

    if (userTimeElement) userTimeElement.textContent = userTime.time;
    if (userDateElement) userDateElement.textContent = userTime.date;
    if (userTimezoneLabel) userTimezoneLabel.textContent = userTimezone;

    const selectedCity = document.getElementById('citySelect').value;
    if (selectedCity) {
        updateSelectedLocation(selectedCity);    
    }
}

function updateSelectedLocation(timezone) {
    const {time, date} = getTimeForTimezone (timezone);
    const selectedTimeElement = document.getElementById('selectedTime');
    const selectedDateElement = document.getElementById('selectedDate');

    if (selectedTimeElement) selectedTimeElement.textContent = time;
    if (selectedDateElement) selectedDateElement.textContent = date;
}

function getCityNameFromTimezone (timezone) {
    const cityMap = {
        'City_1':'London',
        'City_2':'Bangkok',
        'City_3':'New_York',
        
    };
    return cityMap[timezone] || timezone.split('/').pop().replace('_',' ');
}


function init() {

    updateTimes();

    setInterval(updateTimes, 1000);

    console.log('User timezone:', getUserTimezone()); 
    document.getElementById('citySelect').addEventListener('change',function(e) {
        const selectedTimezone = e.target.value;
        const defaultLocationsDiv = document.getElementById('defaultLocation');
        const selectedLocationDiv = document.getElementById('selectedLocation');

        if (selectedTimezone) {
            defaultLocationsDiv.style.display = 'none';
            selectedLocationDiv.style.display = 'block';

        const cityName = getCityNameFromTimezone(selectedTimezone);
        document.getElementById('selectedCity').textContent = cityName;
        
        updateSelectedLocation(selectedTimezone);
        }   else {
                defaultLocationsDiv.style.display = 'block';
                selectedLocationDiv.style.display = 'none';
        }
    });
   
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}   else {
    init ();
}