<template>
  <div v-if="user" class="container">
    <div id="profileTitle">Profiliniz</div>
    <hr>
    <div id="profileContentContainer">
      <div class="profileContent" id="profileSummaryContainer">
        <div class="profileSubtitle">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-briefcase" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
            <line x1="12" y1="12" x2="12" y2="12.01" />
            <path d="M3 13a20 20 0 0 0 18 0" />
          </svg>
          İş Özeti</div>
        <div class="summaryElement">Toplam firma: <span>{{totalCompanies}}</span></div>
        <div class="summaryElement">Toplam iş: <span>{{totalJobs}}</span></div>
        <div class="summaryElement">Tamamlanan iş: <span>{{totalJobs-totalTodo}}</span></div>
        <div class="summaryElement">Kalan iş: <span>{{totalTodo}}</span></div>
      </div>

      <div class="profileContent" id="profileInfoContainer">
        <div class="profileSubtitle"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          Profil Bilgileri
        </div>
        <div class="info" id="userFullName" v-if="user.displayName"> {{user.displayName}} </div>
        <div class="info" v-if="this.$store.state.isUserWorker">(Çalışan Hesabı)</div>
        <div class="info" v-if="this.$store.state.isUserWorker && workerProfile">Çalışan Kodu: <b>{{workerProfile.workerCode}}</b></div>
        <div class="info" id="userEmail" v-if="user.email"> e-posta: {{user.email}}
          <svg @click="reAuth()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </div>
        <div class="info" id="resetPasswordBtn" @click="resetPassword()">şifreyi sıfırla</div>
      </div>
    </div>

    <div id="workerContainer" v-if="!this.$store.state.isUserWorker">
      <div class="profileSubtitle">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </svg>  
        Çalışanlar
      </div>
      <div id="workerContentContainer">
        <div id="addWorkerContainer">
          <div class="profileSubtitle">Çalışan Ekle</div>
          <div id="workerInputContainer">
            <input type="text" id="workerEmailInput" placeholder="çalışan e-posta" v-model="workerEmail">
            <input type="text" id="workerCodeInput" placeholder="çalışan profil kodu" v-model="workerCode">
            <button @click="addWorker()">Ekle</button>
          </div>
        </div>
        <div id="showWorkerContainer">
          <div class="profileSubtitle">Çalışan Listesi</div>
          <div class="workerListContainer">
            <ul>
              <li v-for="worker in workerList" :key="worker.workerCode">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="20" height="20" viewBox="0 0 24 24" stroke-width="1" stroke="#f4f4f4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
                {{worker.fullName}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
export default {
  data() {
    return {
      user: undefined,
      employer: undefined,
      workerEmail: '',
      workerCode: '',
      workerTemplate: {},
      workerList: [],
      workerProfile: undefined,
      totalCompanies: this.$store.state.totalCompanies,
      totalJobs: this.$store.state.totalJobs,
      totalTodo: this.$store.state.totalTodo
    }
  },
  async created(){
    this.user = await firebase.auth().currentUser;
    if(!this.$store.state.isUserWorker){
      await this.getWorkers();
    }else{
      await this.getWorkerProfile();
    }
  },
  methods: {
    async getWorkerProfile(){
      var userEmail = this.user.email.replace('.', '');
      await firebase.database().ref('/users/workers/' + userEmail).on('value', (snapshot) =>{
        if(snapshot.exists()){
          this.workerProfile = snapshot.val();
        }
      });
    },
    async getWorkers(){
      var userEmail = this.user.email.replace('.', '');
      await firebase.database().ref('/users/' + userEmail + '/workers/').on('value', (snapshot) => {
        if (snapshot.exists()) {
          this.workerList = snapshot.val();
        }
      })
    },
    async addWorker(){
      if(this.checkWorkerInfo(this.workerEmail, this.workerCode)){
        var userEmail = await firebase.auth().currentUser.email.replace('.', '');
        await firebase.database().ref('/users/' + userEmail + '/workers/' + this.workerEmail.replace('.','')).set(this.workerTemplate);
        await firebase.database().ref('/users/workers/' + this.workerEmail.replace('.','') + '/employer').set(this.user.email);
        await this.getWorkers();
      }else{
        alert('Çalışan e-postası veya kodu hatalı.');
      }
    },
    async checkWorkerInfo(email, code){
      await firebase.database().ref('/users/workers/' + email.replace('.', '')).on('value', (snapshot)=>{
        if(snapshot.exists()){
          var data = snapshot.val();
          console.log(data.workerCode);
          if(data.workerCode == code){
            this.workerTemplate = data;
            return true;
          }
        }else{
          alert('E-posta bir çalışan profiline ait değil.');
          return false;
        }
      });
    },
    async changeEmail(){
      var newEmail = prompt("Lütfen yeni e-postanızı girin:", "");
      var auth = firebase.auth();
      var refEmail = auth.currentUser.email.replace('.', '');
      var currentVal;
      var refURL;
      if(!this.$store.state.isUserWorker){
        await firebase.database().ref('/users/' + refEmail).on("value", (snapshot) => {
          if(snapshot.exists()){
            currentVal = snapshot.val().companies;
          }
        })
        await firebase.database().ref('/users/' + newEmail.replace('.', '') + '/companies').update(currentVal);
      }

      await auth.currentUser.updateEmail(newEmail).then(function(){
        auth.currentUser.sendEmailVerification();
        alert('E-posta adresinize bir doğrulama bağlantısı gönderildi. Giriş yapmadan önce bağlantıya tıklayıp e-postanızı onaylayın.');
      }).catch(function(error){
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
        console.error(error);
      });
    },
    async reAuth(){
      var auth = firebase.auth();
      var credential = await firebase.auth.EmailAuthProvider.credential(
          auth.currentUser.email, 
          prompt("Lütfen şifrenizi girin: ", "")
      );
      auth.currentUser.reauthenticateWithCredential(credential).then(
          this.changeEmail()
      ).catch(function(error) {
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
        console.log(error.message);
      });
    },
    async resetPassword(){
      await firebase.auth().sendPasswordResetEmail(this.user.email).then(function() {
        alert("E-posta adresinize şifre sıfırlama e-postası gönderildi.")
      }).catch(function(error) {
        alert("Bir hata oluştu", error.code);
      });
    },
    async asyncData({req, redirect}) {
      if(process.server){
        this.user = await firebase.auth().currentUser;
      } else {
        let user = await firebase.auth().currentUser;
        if(!user){
          redirect('/');
        }
      }
    }
  },
}
</script>

<style>
.container{
  flex-direction: column;
  align-items: center;
}

#profileTitle{
  font-size: 38px;
  margin-top: 2%;
  letter-spacing: 1.6px;
  align-self: center;
}

hr{
  width: 30%;
}

#profileContentContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  margin: 0 auto;
}

.profileContent{
  overflow: auto;
  padding: 20px;
  min-height: 250px;
  width: 40%;
  border: 1px solid hsl(245, 30%, 35%);
  border-radius: 7px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.30), 0 4px 5px rgba(0, 0, 0, 0.32);
}

#profileSummaryContainer{
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-weight: 400;
}
.profileSubtitle{
  font-size: 26px;
  margin-bottom: 5%;
}
.summaryElement{
  font-size: 18px;
  margin-top: 1%;
}

.summaryElement span{
  font-size: 22px;
  font-family: 'Roboto', sans-serif;
}

.info{
  margin-top: 2%;
}
.info b{
  letter-spacing: 2px;
  font-family: 'Roboto', serif;
  font-weight: 100;
}

#userFullName{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2%;
}

#userEmail svg{
  cursor: pointer;
}

#resetPasswordBtn{
  cursor: pointer;
  color: #3b4157;
  transition-duration: 100ms;
  width: fit-content;
}

#resetPasswordBtn:hover{
  color: #616a8d;
  text-decoration: underline;
}

#workerContainer{
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 50vh;
  padding: 20px;
  margin: 0 auto;
  margin-top: 10%;
  margin-bottom: 10%;
  text-align: center;
  border: 1px solid hsl(245, 30%, 35%);
  border-radius: 7px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.30), 0 4px 5px rgba(0, 0, 0, 0.32);
}

#workerContentContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  height: 70%;
  margin: 0 auto;
}

#addWorkerContainer{
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  color: #f4f4f4;
  background-color: hsl(245, 35%, 38%);
  border-radius: 7px;
  border: 1px solid hsl(245, 30%, 35%);
  box-shadow: 0 4px 6px rgba(0,0,0,0.30), 0 4px 5px rgba(0, 0, 0, 0.32);
}

#workerInputContainer{
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 80%;
  margin: 0 auto;
}

#workerInputContainer input{
  padding: 6%;
  font-size: 16px;
  background-color: hsl(246, 25%, 43%);
  color: #f4f4f4;
  border: none;
  border-radius: 7px;
  margin-top: 2%;
}

#workerInputContainer button{
  width: 30%;
  margin: 0 auto;
  margin-top: 4%;
  background-color: hsl(245, 34%, 48%);
  color: #f4f4f4;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition-duration: 180ms;
}

#workerInputContainer button:hover{
  background-color: hsl(245, 30%, 65%);
}

#showWorkerContainer{
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: #f4f4f4;
  background-color: hsl(245, 35%, 38%);
  border-radius: 7px;
  border: 1px solid hsl(245, 30%, 35%);
  box-shadow: 0 4px 6px rgba(0,0,0,0.30), 0 4px 5px rgba(0, 0, 0, 0.32);
}

.workerListContainer{
  height: 70%;
  overflow: auto;
}

.workerListContainer ul{
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: fit-content;
}

@media only screen and (max-width: 900px) {
 #profileContentContainer{
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    display: block;
 }
 .profileContent{
   width: 80%;
   margin: 0 auto;
   margin-bottom: 6%;
 }

 #workerContainer{
   overflow: auto;
   margin-bottom: 20px;
 }

 #workerContentContainer{
   flex-direction: column;
 }
 #addWorkerContainer{
  width: 90%;
  min-height: 250px;
  margin-bottom: 5%;
}
 #showWorkerContainer{
  width: 90%;
  min-height: 250px;
 }
}
</style>