import { style } from "./css/index.scss";


const app = Vue.createApp({
    data(){
        return{
            playersDisplayed: true,
            players: [
                { name: 'Maciek', surname: 'Grabowski', club: 'KS Mojra Warszawa', sport: 'Ultimate', city: 'Warszawa', country: 'Polska', birth: '1990-02-22'},
                { name: 'Robert', surname: 'Lewandowski', club: 'FC Barcelona', sport: 'Piłka Nozna', city: 'Barcelona', country: 'Hiszpania', birth: '1988-08-21'},
                { name: 'Stephen', surname: 'Curry', club: 'Golden State Warriors', sport: 'Koszykówka', city: 'San Francisco', country: 'USA', birth: '1988-03-14'},
                { name: 'LeBron', surname: 'James', club: 'LA Lakers', sport: 'Koszykówka', city: 'Los Angeles', country: 'USA', birth: '1984-12-30'}
            ],
            newPlayer: { 
                name: '', 
                surname: '',
                club: '',
                sport: '',
                city: '', 
                country: '',
                birth: ''
            },
            newPlayerEdited: { 
                name: '', 
                surname: '',
                club: '',
                sport: '',
                city: '', 
                country: '',
                birth: ''
            },
            events: [
                {eventName: 'Sandslash', eventCity: 'Dębki', eventCountry: 'Polska', start: '2023-08-18', end: '2023-08-20', selectedPlayers: []},
                {eventName: 'MP Open', eventCity: 'Wrocław', eventCountry: 'Polska', start: '2024-05-25', end: '2024-05-26', selectedPlayers: []},
                {eventName: 'Windmill Windup', eventCity: 'Amsterdam', eventCountry: 'Holandia', start: '2024-06-14', end: '2024-06-16', selectedPlayers: []},
                {eventName: 'PMP', eventCity: 'Gdańsk', eventCountry: 'Polska', start: '2024-06-29', end: '2024-06-30', selectedPlayers: []},
                {eventName: 'Mistrzostwa Warszawy', eventCity: 'Warszawa', eventCountry: 'Polska', start: '2024-07-06', end: '2024-07-07', selectedPlayers: []},
                {eventName: 'Top Cat', eventCity: 'Warszawa', eventCountry: 'Polska', start: '2024-07-13', end: '2024-07-14', selectedPlayers: []},
                {eventName: 'WJUC', eventCity: 'Birmingham', eventCountry: 'Wielka Brytania', start: '2024-07-20', end: '2024-07-27', selectedPlayers: []},
                {eventName: 'Sandslash', eventCity: 'Dębki', eventCountry: 'Polska', start: '2024-08-23', end: '2024-08-25', selectedPlayers: []},
                {eventName: 'MMP Mixed', eventCity: '???', eventCountry: 'Polska', start: '2024-09-07', end: '2024-09-08', selectedPlayers: []},
                {eventName: 'MP Mixed', eventCity: '???', eventCountry: 'Polska', start: '2024-09-20', end: '2024-09-22', selectedPlayers: []},
                {eventName: 'EUCF', eventCity: '???', eventCountry: '???', start: '2024-09-27', end: '2024-09-29', selectedPlayers: []},
                {eventName: 'WBUCC', eventCity: 'Portimao', eventCountry: 'Portugalia', start: '2024-10-14', end: '2024-10-19', selectedPlayers: []},
                {eventName: 'MP Mixed Runda Wiosenna', eventCity: 'Olsztynek', eventCountry: 'Polska', start: '2024-05-11', end: '2024-05-12', selectedPlayers: []},
            ],
            newEvent:{
                eventName: '',
                eventCity: '',
                eventCountry: '',
                start: '',
                end: ''
            },
            newEventEdited:{
                eventName: '',
                eventCity: '',
                eventCountry: '',
                start: '',
                end: ''
            },
            expandedPlayers: [],
            expandedEvents: [],
            newPlayerForm: false,
            newEventForm: false,
            inputEmpty: false,
            searchPlayerInput: '',
            searchEventInput: '',
            playerProfileMode: 1,
            eventDetailsMode: 1,
            selectedEventIndex: null,
            selectedPlayerIndex: null,
            choosePlayers: false,
            eventEnded: false
        }
    },

    computed: {
        searchSortedEvents(){
            const searchData = this.searchEventInput.toLowerCase().trim();

            const filteredEvents =  this.events.filter(event => {
                const eventName = event.eventName.toLowerCase();

                return eventName.includes(searchData)
            })

            const currentDate = new Date();

            return filteredEvents.sort((a, b) => {
                const dateA = new Date(a.start);
                const dateB = new Date(b.start);

                if(dateA < currentDate && dateB < currentDate){
                    return 1;
                } else if (dateA < currentDate){
                    return 0;
                } else if (dateB < currentDate){
                    return -1;
                } else {
                    return dateA - dateB;
                }
            })
        },

        closestSortedEvent() {
            const sortedEvents = this.searchSortedEvents;

            if (sortedEvents.length > 0) {
                const closestEvent = sortedEvents[0];
                return closestEvent;
            } else {
                return null;
            }
        },

        searchSortedPlayers(){
            const searchData = this.searchPlayerInput.toLowerCase().trim();

            const filteredPlayers = this.players.filter(player => {
                const playerName = player.name.toLowerCase();
                const playerSurname = player.surname.toLowerCase();
                const playerClub = player.club.toLowerCase();

                return (
                    playerName.includes(searchData) ||
                    playerSurname.includes(searchData) ||
                    playerClub.includes(searchData)
                )
            })

            return filteredPlayers.sort((a, b) => {
                return a.surname.localeCompare(b.surname);
            })
        },
    },

    methods: {
// ostylowanie eventów, które się juz skonczyly
        eventEndedStyle(event){
            const currentDate = new Date();
            const eventStartDate = new Date(event.start)

            if (eventStartDate < currentDate){
                return{
                    backgroundColor: 'rgb(87,188,179)'
                }
            } else {
                return {}
            }
        },

// dodawanie zawodników do eventów
        playersAttending(player, event){
            if (event.selectedPlayers.includes(player)) {
                return `${player.name} ${player.surname}`;
            } else {
                return null;
            }
        },

        choosePlayersToAddToEvent(){
            this.choosePlayers = !this.choosePlayers;
        },

        togglePlayerInEvent(player, eventIndex) {
            const event = this.events[eventIndex];
            const playerIndex = event.
            
            selectedPlayers.indexOf(player);

            if (playerIndex === -1) {
                event.selectedPlayers.push(player);
            } else {
                event.selectedPlayers.splice(playerIndex, 1);
            }
        },

        isPlayerSelected(player, eventIndex) {
            const event = this.events[eventIndex];
            return event.selectedPlayers.includes(player);
        },

// przełączanie zawodnicy / eventy
        toggleToPlayers(){
            this.playersDisplayed = true;
        },

        toggleToEvents(){
            this.playersDisplayed = false;
        },

// szczegóły zawodnicy / eventy
        toggleProfile(index){
            for (let i = 0; i < this.expandedPlayers.length; i++) {
                if (i !== index) {
                    this.expandedPlayers[i] = false;
                }
            }

            this.expandedPlayers[index] = !this.expandedPlayers[index];

            if (this.expandedPlayers != []){
                this.playerProfileMode = 1;
            }
        },

        toggleEvent(index){
            for (let i = 0; i < this.expandedEvents.length; i++) {
                if (i !== index) {
                    this.expandedEvents[i] = false;
                }
            }

            this.expandedEvents[index] = !this.expandedEvents[index];

            if (this.expandedEvents.length !== 0){
                this.eventDetailsMode = 1;
            }
        },

// zawodnicy
        addNewPlayer(){
            this.newPlayerForm = !this.newPlayerForm;

            this.clearPlayerInputs();
        },


        addNewPlayerToList(){
            this.players.push({
                name: this.newPlayer.name,
                surname: this.newPlayer.surname,
                club: this.newPlayer.club,
                sport: this.newPlayer.sport,
                city: this.newPlayer.city,
                country: this.newPlayer.country,
                birth: this.newPlayer.birth
            })

            this.clearPlayerInputs();
        },

        clearPlayerInputs(){
            this.newPlayer.name = '';
            this.newPlayer.surname = '';
            this.newPlayer.club = '';
            this.newPlayer.sport = '';
            this.newPlayer.city = '';
            this.newPlayer.country = '';
            this.newPlayer.birth = '';
        },

        playersInputsValidation(){
            return(
                this.newPlayer.name === '' ||
                this.newPlayer.surname === '' ||
                this.newPlayer.club === '' ||
                this.newPlayer.sport === '' ||
                this.newPlayer.city === '' ||
                this.newPlayer.country === '' ||
                this.newPlayer.birth === ''
            )
        },


        addNewPlayerToListValidated() {
            let validation = this.playersInputsValidation();

            if (validation) {
              this.inputEmpty = true;
            } else {
              this.inputEmpty = false;
              this.addNewPlayerToList();
            }

            this.newPlayerForm = !this.newPlayerForm;
        },
    
// profil zawodnika
        deletePlayerQuestion(){
            this.playerProfileMode = 2;
        },

        deletePlayerYes(index){
            this.searchSortedPlayers.splice(index, 1);
            this.playerProfileMode = 1;
            this.expandedPlayers = [];
        },

        goToPlayerDetails(){
            this.playerProfileMode = 1;
        },

        editPlayer(player,index) {
            if (index >= 0 && index < this.players.length) {
                this.selectedPlayerIndex = index;
                this.newPlayerEdited = { ...player };
                this.playerProfileMode = 3;
            } else {
                console.error("Invalid event index.");
            }
        },

        editPlayerSave() {
            let validation = this.playerInputsEditValidation();

            if (validation) {
                this.inputEmpty = true;
            } else {
                this.inputEmpty = false;
                if (this.selectedPlayerIndex !== null && this.selectedPlayerIndex !== undefined) {
                    let editedPlayer = { ...this.players[this.selectedPlayerIndex] };
            
                    editedPlayer.name = this.newPlayerEdited.name;
                    editedPlayer.surname = this.newPlayerEdited.surname;
                    editedPlayer.club = this.newPlayerEdited.club;
                    editedPlayer.sport = this.newPlayerEdited.sport;
                    editedPlayer.city = this.newPlayerEdited.city;
                    editedPlayer.country = this.newPlayerEdited.country;
                    editedPlayer.birth = this.newPlayerEdited.birth;
                    
                    this.players.splice(this.selectedPlayerIndex, 1, editedPlayer)
                }

                this.playerProfileMode = 1;
            }
        },

        playerInputsEditValidation(){
            return(
                this.newPlayerEdited.name === '' ||
                this.newPlayerEdited.surname === '' ||
                this.newPlayerEdited.club === '' ||
                this.newPlayerEdited.sport === '' ||
                this.newPlayerEdited.city === '' ||
                this.newPlayerEdited.country === '' ||
                this.newPlayerEdited.birth === ''
            )
        },


// wydarzenia
        addNewEvent(){
            this.newEventForm = !this.newEventForm;

            this.clearEventInputs();
        },

        addNewEventToList(){
            this.events.push({
                eventName: this.newEvent.eventName,
                eventCity: this.newEvent.eventCity,
                eventCountry: this.newEvent.eventCountry,
                start: this.newEvent.start,
                end: this.newEvent.end,
                selectedPlayers: []

            });

            this.clearEventInputs();
        },

        clearEventInputs(){
            this.newEvent.eventName = '';
            this.newEvent.eventCity = '';
            this.newEvent.eventCountry = '';
            this.newEvent.start = '';
            this.newEvent.end = '';
        },

        eventInputsValidation(){
                return(
                    this.newEvent.eventName === '' ||
                    this.newEvent.eventCity === '' ||
                    this.newEvent.eventCountry === '' ||
                    this.newEvent.start === '' ||
                    this.newEvent.end === ''
                )
        },

        addNewEventToListValidated() {
            let validation = this.eventInputsValidation();
            
            if (validation) {
              this.inputEmpty = true;
            } else {
              this.inputEmpty = false;
              this.addNewEventToList();
            }

            this.newEventForm = !this.newEventForm;
        },     

// szczegóły wydarzenia
        deleteEventQuestion(){
            this.eventDetailsMode = 2;
        },

        deleteEventYes(index){
            this.searchSortedEvents.splice(index, 1);
            this.eventDetailsMode = 1;
            this.expandedEvents = [];
        },

        goToEventDetails(){
            this.eventDetailsMode = 1;
        },

        editEvent(event,index) {
            if (index >= 0 && index < this.events.length) {
                this.selectedEventIndex = index;
                this.newEventEdited = { ...event };
                this.eventDetailsMode = 3;
            } else {
                console.error("Invalid event index.");
            }
        },
          
        editEventSave() {
            let validation = this.eventInputsEditValidation();

            if (validation) {
                this.inputEmpty = true;
            } else {
                this.inputEmpty = false;
                if (this.selectedEventIndex !== null && this.selectedEventIndex !== undefined) {
                    let editedEvent = { ...this.events[this.selectedEventIndex] };
            
                    editedEvent.eventName = this.newEventEdited.eventName;
                    editedEvent.eventCity = this.newEventEdited.eventCity;
                    editedEvent.eventCountry = this.newEventEdited.eventCountry;
                    editedEvent.start = this.newEventEdited.start;
                    editedEvent.end = this.newEventEdited.end;

                    this.events.splice(this.selectedEventIndex, 1, editedEvent)
                }

                this.eventDetailsMode = 1;
            }
        },

        eventInputsEditValidation(){
            return(
                this.newEventEdited.eventName === '' ||
                this.newEventEdited.eventCity === '' ||
                this.newEventEdited.eventCountry === '' ||
                this.newEventEdited.start === '' ||
                this.newEventEdited.end === ''
            )
        },

// formatowanie

        dateFormat(date){
            const dateChanged = new Date(date);

            return dateChanged.getDate() + ' . ' + (dateChanged.getMonth() +1) + ' . ' + dateChanged.getFullYear();
        },

        dateFormatEvent(dateStart, dateEnd){
            const start = new Date(dateStart);
            const end = new Date(dateEnd);

            if (start.getMonth() === end.getMonth()){
                return start.getDate() + ' - ' + end.getDate()  + ' . ' +  start.getMonth() + ' . ' + start.getFullYear();
            } else {
                return start.getDate()  + ' . ' +  start.getMonth() + ' - ' + end.getDate()  + ' . ' +  start.getMonth() + ' . ' + start.getFullYear();
            }
        },

        daysLeftToStart(date){
            const eventStartTime = new Date(date).getTime();
            const todayTime = new Date().getTime();
            const daysLeft = Math.floor((eventStartTime - todayTime) / (1000 * 60 * 60 * 24 ));

            if(daysLeft < 1){
                return '-';
            } else if (daysLeft === 1){
                return 'za 1 dzień';
            } else {
                return 'za ' + daysLeft + ' dni';
            }
        },
        
        countAge(date){
            let birthDate = new Date(date)

            const age = Math.floor((new Date().getTime() - birthDate.getTime() ) / (1000 * 60 * 60 * 24 * 365));

            return age
        },
    },
}).component('menu-component',{
    template: `
        <nav id="navbar" :style="navStyles">                
            <div class="navbar-content">
                <a href="index.html">
                    <svg version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 116.6 59.79" style="enable-background:new 0 0 116.6 59.79;" xml:space="preserve" :class="{ 'big-logo': menuOpen }">
                        <g>
                            <g>
                                <path d="M8.63,52.38V7.58h12.42l17.92,29.25h-6.53L49.84,7.58h12.42l0.13,44.8H48.63L48.5,28.32h2.18l-11.9,20.03h-6.66
                                    L19.7,28.32h2.69v24.06H8.63z"/>
                                <path d="M87.35,53.41c-3.63,0-6.97-0.57-10.02-1.7c-3.05-1.13-5.7-2.74-7.94-4.83c-2.24-2.09-3.98-4.56-5.22-7.42
                                    c-1.24-2.86-1.86-6.02-1.86-9.47s0.62-6.61,1.86-9.47c1.24-2.86,2.99-5.33,5.25-7.42c2.26-2.09,4.94-3.7,8.03-4.83
                                    c3.09-1.13,6.5-1.7,10.21-1.7c4.44,0,8.39,0.75,11.87,2.24c3.48,1.49,6.35,3.63,8.61,6.4l-9.66,8.51
                                    c-1.41-1.62-2.93-2.85-4.58-3.68c-1.64-0.83-3.47-1.25-5.47-1.25c-1.66,0-3.17,0.26-4.51,0.77s-2.49,1.26-3.42,2.24
                                    c-0.94,0.98-1.66,2.15-2.18,3.52c-0.51,1.37-0.77,2.92-0.77,4.67c0,1.66,0.26,3.19,0.77,4.58c0.51,1.39,1.24,2.57,2.18,3.55
                                    c0.94,0.98,2.06,1.74,3.36,2.27c1.3,0.53,2.76,0.8,4.38,0.8c1.71,0,3.37-0.29,4.99-0.86s3.35-1.57,5.18-2.98l8.45,10.37
                                    c-2.73,1.83-5.85,3.24-9.34,4.22C94.02,52.92,90.63,53.41,87.35,53.41z M93.75,45.79V28.77h13.12v18.94L93.75,45.79z"/>
                            </g>
                        </g>
                    </svg>
                </a>
                <ul class="menu-content">
                    <li><a href="sezon.html">Sezon</a></li>
                    <li><a href="kontakt.html">Kontakt</a></li>
                </ul>
                <ul class="menu-mobile" :class="{ 'show': menuOpen }">
                    <li><a href="sezon.html">Sezon</a></li>
                    <li><a href="kontakt.html">Kontakt</a></li>
                </ul>
                <div id="menu-icon" :class="{'open': menuOpen}" @click="toggleMenuIcon">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
            </div>
        </nav>
    `,
    data() {
        return {
            menuOpen: false,
        }
    },
    props:['menuProps'],
    computed:{
        navStyles(){
            return{
                height: this.menuOpen ? '100vh' : '100px',
                position: this.menuOpen ? 'fixed' : 'absolute',
                transition: 'height 0.3s ease-in-out',
            }
        },

        menuExtend(){
            return{
                opacity: this.menuOpen ? '1' : '0',
                transition: 'opacity 0.4s ease-in-out',
                transitionDelay: this.menuOpen ? '0s' : '0.4s'
            }
        }
    },

    methods: {
        toggleMenuIcon(){
            this.menuOpen = !this.menuOpen;
        }
    }
}).component('weather-api',{
    template: `
    <div class="container">
        <div class="row">
            <select name="weather-api" id="weather-city" v-model="selectedWeather">
                <option v-for="city in weatherApi" :value="city" :key="city">{{ cityDisplay(city) }}</option>
            </select>
        </div>
        <div class="row">
            <div class="col-6">
                <div  v-if="weatherDisplay" class="weather-info">
                    <h3>{{weatherDisplay.temperatura}} <sup>o</sup>C</h3>
                    <h3>{{weatherDisplay.cisnienie}} hPa</h3>
                    <h3>{{weatherDisplay.suma_opadu}} mm</h3>
                    <h3>{{weatherDisplay.wilgotnosc_wzgledna}} %</h3>
                    <h3>{{weatherDisplay.predkosc_wiatru}} km/h</h3>
                </div>
                <div v-else>
                    <h3>Brak danych pogodowych</h3>
                </div>
            </div>
            <div class="weather-img col-6">
                <img v-if="weatherImg === 'snowy'" src="/src/assets/snow.png" alt="snow-img">
                <img v-else-if="weatherImg === 'rainy'" src="/src/assets/rain.png" alt="rain-img">
                <img v-else-if="weatherImg === 'sunny'" src="/src/assets/sun.png" alt="sun-img">
                <img v-else-if="weatherImg === 'cloudy'" src="/src/assets/cloud.png" alt="sun-img">
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            weatherApi:[],
            selectedWeather: null,
        }
    },
    computed:{
        weatherDisplay(){
            return this.selectedWeather || this.weatherApi[55];
        },

        weatherImg(){
            if (this.selectedWeather) {
                if (this.selectedWeather.suma_opadu > 0) {
                    if (this.selectedWeather.temperatura < 0) {
                        return 'snowy';
                    } else {
                        return 'rainy';
                    }
                } else {
                    if (this.selectedWeather.wilgotnosc_wzgledna < 60){
                        return 'sunny';
                    } else {
                        return 'cloudy'
                    }
                }
            }
        }
    },
    methods: {
        cityDisplay(city){
            return city ? city.stacja : "Warszawa";
        },
    },
    watch: {
        weatherDisplay(newValue) {
            this.selectedWeather = newValue;
        },
    },
    created(){        
        axios({
            url: "https://danepubliczne.imgw.pl/api/data/synop",
        }).then((response) => {
            this.weatherApi = response.data;
            console.log(this.weatherApi)
            this.selectedWeather = this.weatherApi[55];
        }).catch((error) => {
            console.error('Dane pogodowe nie pobrały się')
        });
    },
}).mount("#app-main")

export default app;