import { style } from "./css/index.scss"

Vue.createApp({
    data(){
        return{
            menuOpen: false,
        }
    },

    computed:{
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
        }
    },

    methods: {
        toggleMenuIcon(){
            this.menuOpen = !this.menuOpen;
        }
    }
}).mount("#app")


Vue.createApp({
    data(){
        return{
            playersDisplayed: true,
            players: [
                { name: 'Maciek', surname: 'Grabowski', club: 'KS Mojra Warszawa', sport: 'Ultimate', city: 'Warszawa', country: 'Polska', birth: '1990-02-22' },
                { name: 'Robert', surname: 'Lewandowski', club: 'FC Barcelona', sport: 'Piłka Nozna', city: 'Barcelona', country: 'Hiszpania', birth: '1988-08-21' }
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
                {eventName: 'MP Mixed Runda Wiosenna', eventCity: '???', eventCountry: 'Polska', start: '2024-05-11', end: '2024-05-12'},
                {eventName: 'MP Open', eventCity: '???', eventCountry: 'Polska', start: '2024-05-25', end: '2024-05-26'},
                {eventName: 'Windmill Windup', eventCity: 'Amsterdam', eventCountry: 'Holandia', start: '2024-06-14', end: '2024-06-16'},
                {eventName: 'PMP', eventCity: '???', eventCountry: 'Polska', start: '2024-06-29', end: '2024-06-30'},
                {eventName: 'Mistrzostwa Warszawy', eventCity: '???', eventCountry: 'Polska', start: '2024-07-06', end: '2024-07-07'},
                {eventName: 'Top Cat', eventCity: '???', eventCountry: 'Polska', start: '2024-07-13', end: '2024-07-14'},
                {eventName: 'WJUC', eventCity: 'Birmingham', eventCountry: 'Wielka Brytania', start: '2024-07-20', end: '2024-07-27'},
                {eventName: 'Sandslash', eventCity: 'Dębki', eventCountry: 'Polska', start: '2024-08-23', end: '2024-08-25'},
                {eventName: 'MMP Mixed', eventCity: '???', eventCountry: 'Polska', start: '2024-09-07', end: '2024-09-08'},
                {eventName: 'MP Mixed', eventCity: '???', eventCountry: 'Polska', start: '2024-09-20', end: '2024-09-22'},
                {eventName: 'EUCF', eventCity: '???', eventCountry: '???', start: '2024-09-27', end: '2024-09-29'},
                {eventName: 'WBUCC', eventCity: 'Portimao', eventCountry: 'Portugalia', start: '2024-10-14', end: '2024-10-19'},
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
        }
    },

    computed: {
        // eventsSortedByDate(){
        //     this.events.slice().sort((a,b) => {
        //         return new Date(a.start) - new Date(b.start);
        //     })
        // }, 

        searchEvents(){
            const searchData = this.searchEventInput.toLowerCase().trim();

            return this.events.filter(event => {
                const eventName = event.eventName.toLowerCase();

                return eventName.includes(searchData)
            })
        },  

        searchPlayers(){
            const searchData = this.searchPlayerInput.toLowerCase().trim();

            return this.players.filter(player => {
                const playerName = player.name.toLowerCase();
                const playerSurname = player.surname.toLowerCase();
                const playerClub = player.club.toLowerCase();

                return (
                    playerName.includes(searchData) ||
                    playerSurname.includes(searchData) ||
                    playerClub.includes(searchData)
                )
            })
        },
    },

    methods: {

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
        },
    
// profil zawodnika
        deletePlayerQuestion(){
            this.playerProfileMode = 2;
        },

        deletePlayerYes(index){
            this.playerProfileMode = 1;
            this.expandedPlayers = [];
            this.players.splice(index, 1);
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
        },

        addNewEventToList(){
            this.events.push({
                eventName: this.newEvent.eventName,
                eventCity: this.newEvent.eventCity,
                eventCountry: this.newEvent.eventCountry,
                start: this.newEvent.start,
                end: this.newEvent.end
            });

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
        },     

// szczegóły wydarzenia
        deleteEventQuestion(){
            this.eventDetailsMode = 2;
        },

        deleteEventYes(index){
            this.eventDetailsMode = 1;
            this.expandedEvents = [];
            this.events.splice(index, 1);
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

            return dateChanged.getDate() + '/' + (dateChanged.getMonth() +1) + '/' + dateChanged.getFullYear();
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
    }
}).mount("#app-season")