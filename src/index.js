import { style } from "./css/index.scss";

const app = Vue.createApp({
    data(){
        return{
            menuOpen: false
        }
    },

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



//weather API
    created(){        
        axios({
            url: "https://danepubliczne.imgw.pl/api/data/synop",
        }).then((response) => {
            let weatherForecast = response.data;

            console.log(weatherForecast)
            // weatherForecast.forEach((city) => {

            // })
        }).catch((error) => {
            console.error('Dane pogodowe nie pobrały się')
        });
    },

    methods: {
        toggleMenuIcon(){
            this.menuOpen = !this.menuOpen;
        }
    }
}).mount("#app-main");