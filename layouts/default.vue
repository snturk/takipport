<template>
  <div id="mainContainer">
    <div id="navBarContainer">
      <div id="navBarTitle">TAKİPPORT</div>
      <div class="navBar desktopNavBar loggedInNavBar" v-if="isLogged">
        <nuxt-link to="/home" class="navBarLink">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#505b81" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <polyline points="5 12 3 12 12 3 21 12 19 12" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <rect x="10" y="12" width="4" height="4" />
          </svg>
        </nuxt-link>
        <nuxt-link to="/profil" class="navBarLink">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#505b81" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </nuxt-link>
        <div class="navBarLink" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#505b81" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </div>
      </div>
      <div class="navBar desktopNavBar" v-else>
        <a href="#aboutContainer" class="navBarLink">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-square" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="12" y1="8" x2="12.01" y2="8" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg>
        </a>
        <nuxt-link to="/" class="navBarLink">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="7" y="9" width="14" height="10" rx="2" />
            <circle cx="14" cy="14" r="2" />
            <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
          </svg>
        </nuxt-link>
        <nuxt-link to="/" class="navBarLink">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
        </nuxt-link>
      </div>
      <div class="navBar" id="mobileNavBar">
        <div id="mobileMenu" v-if="!isLogged">
          <a href="#aboutContainer" class="navBarLink">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-square" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <line x1="12" y1="8" x2="12.01" y2="8" />
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <polyline points="11 12 12 12 12 16 13 16" />
            </svg>
          </a>
          <nuxt-link to="" class="navBarLink">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <rect x="7" y="9" width="14" height="10" rx="2" />
              <circle cx="14" cy="14" r="2" />
              <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
            </svg>
          </nuxt-link>
          <nuxt-link to="" class="navBarLink">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" />
            </svg>
          </nuxt-link>
        </div>
        <div id="mobileMenu" v-else-if="isLogged">
          <nuxt-link to="/home" class="navBarLink">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <polyline points="5 12 3 12 12 3 21 12 19 12" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <rect x="10" y="12" width="4" height="4" />
            </svg>
          </nuxt-link>
          <nuxt-link to="/profil" class="navBarLink">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </nuxt-link>
          <div class="navBarLink" @click="logout">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <hr id="seperator">
    <nuxt />
  </div>
</template>

<script>
import firebase from 'firebase'
import {mapState} from 'vuex'
export default {  
  data() {
    return {
      isLogged: false,
      dateFull: this.$store.state.dateFull,
    }
  },
  mounted() {
    this.setFirebase();
  },
  methods: {
    setFirebase(){
      firebase.auth().onAuthStateChanged(user =>{
        if(user){
          this.isLogged = true;
        }else {
          this.isLogged = false;
        }
      })
    },
    logout(){
      firebase.auth().signOut();
      this.$router.replace('/');
    }
  },
}
</script>

<style>
html {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}
body{
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  background-size: cover;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
}

.disabledText{
  filter: blur(11px) grayscale(100%);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: not-allowed;
}

a{
  text-decoration: none;
  color: unset;
}

#mainContainer{
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

#navBarContainer{
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #f4f4f4;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 1%;
  color: #474f6c;
}
#seperator{
  width: 90%;
  height: 1.2px;
  border: none;
  margin: 0 auto;
  background-color: #474f6c;
}

hr{
  height: 1.3px;
  width: 80%;
  background-color: hsl(245, 30%, 35%);
  margin-top: 1%;
  margin-bottom: 2%;
}



#navBarTitle{
  margin-left: 5%;
  font-size: 34px;
}

.navBar{
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 width: 30%;
 margin-right: 5%;
 font-size: 20px;
}

.navBarLink{ transition-duration: 200ms;}

.navBar *:hover{
  cursor: pointer;
  transform: scale(0.96);
}

.loggedInNavBar{
  width: 25%;
  justify-content: space-between;
}


#mobileNavBar{
  display: none;
}

#mobileMenu{
  display: none;
}

.container{
  width: 96%;
  height: 83%;
  margin-top: 2%;
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 900px) {
  #navBarContainer{
    width: 100vw;
  }
  .desktopNavBar{
    display: none;
  }
  #mobileMenu{
    display: unset;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    width: 100%;
  }
  #mobileNavBar{
    display: unset;
  }

  .container{
    min-height: 120vh;
  }

}
</style>
