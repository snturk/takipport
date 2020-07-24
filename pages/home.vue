<template>
  <div class="container">
      <div id="date">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <line x1="16" y1="3" x2="16" y2="7" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="4" y1="11" x2="20" y2="11" />
          <rect x="8" y="15" width="2" height="2" />
        </svg>
        {{dateFull}}
      </div>
    <div id="companyOpsContainer">
      <div id="companyInputContainer">
        <h1>Firma Ekle</h1>
        <div>
        <input type="text" placeholder="eklenecek firma adı" autocomplete="off" id="companyNameInput" @keyup.enter="pushCompany(company.name)" v-model="company.name">
        <!--<div id="addCompanyButton" @click="pushCompany(company.name)">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus" width="40" height="40" viewBox="0 0 24 24" stroke-width="1" stroke="#0D0099" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="12" y1="9" x2="12" y2="15" />
          </svg>
        </div>-->
        </div>
      </div>
      <div id="companySearchContainer">
        <h1>Firma Ara</h1>
        <input type="text" placeholder="aranacak firma adı" autocomplete="off" id="companyNameSearch" v-model="companySearch">
      </div>
    </div>
    <hr>
    <div id="sortTitle">Sırala</div>
    <div id="sortContainer">
      <div id="timeSort" v-bind:class="{'activeSort': sort0Style}" @click="sortArr(0)">Eklenme Sırası</div>|
      <div id="jobSortLow" v-bind:class="{'activeSort': sort1Style}" @click="sortArr(1)">İş Miktarı - azdan çoğa</div>|
      <div id="jobSortHigh" v-bind:class="{'activeSort': sort2Style}" @click="sortArr(2)">İş Miktarı - çoktan aza</div>|
      <div id="alphabetSort" v-bind:class="{'activeSort': sort3Style}" @click="sortArr(3)">Alfabetik</div>
    </div>
    <hr>
    <div v-if="!loaded" class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
    <div v-if="loaded" id="companyContainer">
      <company v-if="(filteredData.length)" v-for="data in filteredData" 
      :key="data.name"
      :id="data.id" 
      :name="data.name" 
      :gCond="data.generalCond"
      :addition="data.addition"
      >

      </company>
      <company v-if="!(filteredData.length)" v-for="data in datas" 
      :key="data.name" 
      :id="data.id" 
      :name="data.name" 
      :gCond="data.generalCond"
      :addition="data.addition"
      ></company>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import company from '../components/company.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dateFull: moment(new Date).format('LL'),
      dateToday: this.$store.state.dateDay,
      now: this.$store.state.dateNow,
      loaded: false,
      currentUser: '',
      currentSorting: 0,
      companySearch: '',
      datas: [],
      filteredData: [],
      sort0Style: true,
      sort1Style: false,
      sort2Style: false,
      sort3Style: false,
      company: {
        name: '',
        disabled: false,
        props: {
          aylikMuhasebeEvrak: 0,
          bankaEkstreleri: 0,
          ucretBordrosu: 0,
          sgkBildirgesi: 0,
          kdvBeyannamesi: 0,
          muhtasarBeyannamesi: 0,
          bFormları: 0,
          geciciVergiBeyannamesi: 0,
          damgaVergisi: 0,
        }
      }
    }
  },
  methods: {
    async pushCompany(name){
      if(name.toString().replace(/\s/g,'')){
        await firebase.database().ref('/users/' + (firebase.auth().currentUser.email).replace('.', '') + '/companies/').push(this.company);
        //this.getCompanies();
        this.sortArr(this.currentSorting);
        this.company.name = '';
      }else{
        alert("Firma adı giriniz.");
      }
    },
    async getCompanies(){
      await firebase.database().ref("/users/" + (firebase.auth().currentUser.email).replace('.', '') + "/companies").on('value', (snapshot) => {
        if(snapshot.exists()){
          var data = snapshot.val();
          var keys = Object.keys(data);
          this.datas = [];
          this.$store.state.totalJobs = 0;
          
          
          for(var i = 0; i < keys.length; i++) {
            var id = keys[i];
            var resData = data[id];
            var generalCond = 0;

            for (const key in resData.props) {
              generalCond += resData.props[key];
            }

            if (resData.addition) {
              this.datas.push({
                id: id,
                  name: resData.name,
                  props: resData.props,
                  addition: resData.addition,
                  generalCond: generalCond
                });
              }else{
                this.datas.push({
                  id: id,
                  name: resData.name,
                  props: resData.props,
                  generalCond: generalCond
                });
              } 
            this.$store.state.totalJobs += 9;
          }
          this.$store.state.totalCompanies = this.datas.length;
        }else{
          this.datas = [];
        }
        });
        this.loaded = true;
        this.$store.state.totalTodo = 0;
        this.sortArr(this.currentSorting);
        for(const el of this.datas){
          for(const key in el.props){
            if(el.props[key] != 2){
              this.$store.state.totalTodo += 1;
            }
          }
        }
    },
    sortArr(condition){
      this.sort0Style = false;
      this.sort1Style = false;
      this.sort2Style = false;
      this.sort3Style = false;

      if (condition == 2) {
        this.datas.sort((a, b) => (a.generalCond > b.generalCond) ? 1 : -1);
        this.sort2Style = true;
        this.currentSorting = 2;
      }else if(condition == 1){
        this.datas.sort((a, b) => (a.generalCond < b.generalCond) ? 1 : -1);
        this.sort1Style = true;
        this.currentSorting = 1;
      }else if(condition == 0){
        this.sort0Style = true;
        this.currentSorting = 0;
      }else if(condition == 3){
        this.datas.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.sort3Style = true;
        this.currentSorting = 3;
      }
    },
  },
  watch: {
    companySearch: function(){
      this.filteredData = [];
      if (this.companySearch.toString().replace(/\s/g,'') != "") {
        this.datas.forEach(item => {
          var input = this.companySearch.toString().toLowerCase();
          var data = item.name.toLowerCase();
          if(data.startsWith(input)){
            this.filteredData.push(item);
          }
        });
      }
    },
  },
  async mounted() {
    this.currentUser = await firebase.auth().currentUser;
    if(!this.currentUser){
      this.$router.replace('/');
    }
    this.getCompanies();
    //console.log(Math.random().toString(36).substr(2, 9));
  },
  asyncData({req, redirect}) {
    if(process.server){

    } else {
      let user = firebase.auth().currentUser
      if(!user){
        redirect('/');
      }
    }
  },
components: {
  company
}
  
}
</script>

<style>
.container{
  align-items: unset;
  flex-direction: column;
  justify-content: flex-start;
}

#date{
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  margin-right: 5%;
  font-size: 15px;
  font-family: 'Roboto', serif;
  color: #474f6c;
  transition-duration: 180ms;
}

#date svg{
  margin-right: 4px;
}

#date:hover{transform: scale(1.09);}


#companyOpsContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  min-height: 200px;
  width: 85%;
  margin: 0 auto;
}

#companyInputContainer{
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}

#companyInputContainer div{
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  margin-top: 2%;
}

#companyOpsContainer div input{
  padding: 10px;
  font-size: 18px;
  font-family: 'Playfair Display', serif;
  outline: none;
  width: 90%;
  background-color: #f4f4f4;
  border: 1px solid hsl(245, 30%, 35%);
  border-radius: 5px;
  margin: 0 auto;
  box-shadow: 0 6.2px 10px rgba(0,0,0,0.30), 0 5px 6.5px rgba(0, 0, 0, 0.32);
  transition-duration: 280ms;
}
#companyOpsContainer div input:focus{
  transform: scale(1.1);
}

#addCompanyButton{
  margin: 0 auto;
  margin-left: 5%;
  cursor: pointer;
}

#sortTitle{
  margin: 0 auto;
  font-size: 24px;
  margin-top: 0;
}
#sortContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 85%;
  height: 30%;
  margin: 0 auto;
  margin-top: 1%;
}

.activeSort{
  font-size: 20px;
  color: hsl(245, 30%, 35%);
}

#sortContainer *{
  margin: 2%;
  transition-duration: 280ms;
  cursor: pointer;
}
#sortContainer div:hover{
  color:hsl(245, 30%, 35%);
}

hr{
  height: 1.3px;
  width: 80%;
  background-color: hsl(245, 30%, 35%);
  margin-top: 1%;
  margin-bottom: 2%;
}

#companyContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 95%;
  height: 80%;
  margin: 0 auto;
  margin-bottom: 30px;
}

.sk-chase {
  align-self: center;
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0; 
  animation: sk-chase-dot 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: hsl(245, 30%, 35%);
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
}


@media only screen and (max-width: 900px){
  .container{
    margin-bottom: 6%;
    height: unset;
  }
  #companyContainer{
    flex-direction: column;
    flex-wrap: unset;
    width: 100%;
    margin: 0 auto;
  }

  #companyOpsContainer{
    width: 90%;
    height: 40vh;
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 3%;
  }
  #companyOpsContainer div h1{
    font-size: 20px;
  }

  #companyInputContainer div{
    flex-direction: row;
  }

  #sortContainer{
    font-size: 14px;
    width: 95%;
  }

  .activeSort{
    font-size: px;
  }
}
</style>