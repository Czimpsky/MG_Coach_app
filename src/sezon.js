import { style } from "./css/index.scss";

const appSeason = Vue.createApp({
    data(){
        return{
            menuOpen: false,
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
                {eventName: 'MP Open', eventCity: '???', eventCountry: 'Polska', start: '2024-05-25', end: '2024-05-26', selectedPlayers: []},
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
        navStyles(){
            return{
                height: this.menuOpen ? '100vh' : '100px',
                transition: 'height 0.3s ease-in-out',
            }
        },

        menuExtend(){
            return{
                opacity: this.menuOpen ? '1' : '0',
                transition: 'opacity 0.4s ease-in-out',
                transitionDelay: this.menuOpen ? '0s' : '0.4s',
                
            }
        },

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
// menu 
        toggleMenuIcon(){
            this.menuOpen = !this.menuOpen;
        },

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
}).mount("#app-season")