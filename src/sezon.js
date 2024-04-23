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
            events: [
                {eventName: 'Mistrzostwa Polski', eventCity: 'Wrocław', eventCountry: 'Poland', start: '2024-06-16', end: '2024-06-17'},
                {eventName: 'EUCF', eventCity: 'Bolonia', eventCountry: 'Włochy', start: '2024-10-02', end: '2024-10-04'}
            ],
            newEvent:{
                eventName: '',
                eventCity: '',
                eventCountry: '',
                start: '',
                end: ''
            },
            expandedRows: [],
            expandedEvents: [],
            newPlayerForm: false,
            newEventForm: false,
            inputEmpty: false,
        }
    },

    computed: {
        
    },

    methods: {
        toggleToPlayers(){
            this.playersDisplayed = true;
        },

        toggleToSeason(){
            this.playersDisplayed = false;
        },

        toggleProfile(index){
            this.expandedRows[index] = !this.expandedRows[index];
        },

        toggleEvent(index){
            this.expandedEvents[index] = !this.expandedEvents[index];
        },

// zawodnicy
        addNewPlayer(){
            this.newPlayerForm = !this.newPlayerForm;
        },

        inputsValidationPlayers() {
            if (
              this.newPlayer.name === '' ||
              this.newPlayer.surname === '' ||
              this.newPlayer.club === '' ||
              this.newPlayer.sport === '' ||
              this.newPlayer.city === '' ||
              this.newPlayer.country === '' ||
              this.newPlayer.birth === ''
            ) {
              this.inputEmpty = true;
            } else {
              this.inputEmpty = false;
              this.addNewPlayerToList();
            }
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

        // wydarzenia
        addNewEvent(){
            this.newEventForm = !this.newEventForm;
        },

        inputsValidationEvents() {
            if (
              this.newEvent.eventName === '' ||
              this.newEvent.eventCity === '' ||
              this.newEvent.eventCountry === '' ||
              this.newEvent.start === '' ||
              this.newEvent.end === ''
            ) {
              this.inputEmpty = true;
            } else {
              this.inputEmpty = false;
              this.addNewEventToList();
            }
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
}).mount("#app-players")