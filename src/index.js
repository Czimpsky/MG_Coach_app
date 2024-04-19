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
}).mount("#app-nav")