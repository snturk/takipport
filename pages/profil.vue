<template>
  <div class="container">
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
          İş Özeti</div> <div @click="tekrar()">Göz</div>
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
        <div class="info" id="userFullName" v-if="user"> {{user.displayName}} </div>
        <div class="info" id="userEmail" v-if="user"> e-posta: {{user.email}}
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
export default {
  data() {
    return {
      user: undefined,
      totalCompanies: this.$store.state.totalCompanies,
      totalJobs: this.$store.state.totalJobs,
      totalTodo: this.$store.state.totalTodo
    }
  },
  async created(){
    this.user = await firebase.auth().currentUser;
  },
  methods: {
    async changeEmail(){
      var newEmail = prompt("Lütfen yeni e-postanızı girin:", "");
      var auth = firebase.auth();
      var refEmail = auth.currentUser.email.replace('.', '');
      var currentVal;
      await firebase.database().ref('/users/' + refEmail).on("value", (snapshot) => {
        if(snapshot.exists()){
          currentVal = snapshot.val().companies;
        }
      })
      await firebase.database().ref('/users/' + newEmail.replace('.', '') + '/companies').update(currentVal);
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
  height: 50%;
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
</style>