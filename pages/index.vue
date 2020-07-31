<template>
  <div class="container">
    <div id="indexContainer">
      <div id="indexLeft">
        <vue-typer 
        :text='messageArr'
        :pre-type-delay='70'
        :type-delay='50'
        :pre-erase-delay='2500'
        :erase-delay='500'
        erase-style='clear'
        :erase-on-complete='false'
        caret-animation='expand'
        ></vue-typer>
        <div id="indexLeftDescription">TAKİPPORT, mali müşavirler ve muhasebeciler için bir <span>yapılacaklar listesidir.</span></div>
      </div>

      <div id="authContainer">
        <div class="form">
        <h5>Hoş Geldiniz</h5>
        <input type="text" placeholder="e-posta" v-model="email" @keyup.enter="signIn">
        <input type="password" placeholder="şifre" v-model="password" @keyup.enter="signIn">
        <div id="buttonContainer">
          <button @click="signIn">Giriş</button> <button @click="signUpPage = true">Kayıt Ol</button>
        </div>
        </div>
      </div>
      <div v-if="signUpPage" id="signUpFormContainer">
        <div id="closeSignUp" @click="signUpPage = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f4f4f4" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <div class="form">
          <h1>Kayıt Ol</h1>
          <input type="text" placeholder="isim" v-model="firstName">
          <input type="text" placeholder="soyisim" v-model="lastName">
          <input type="text" placeholder="e-posta" v-model="email">
          <input type="password" placeholder="şifre" v-model="password">
          <input type="password" placeholder="şifre tekrar" v-model="passwordAgain">
          <div id="workerCheckboxContainer">
          Çalışan Hesabı: <input type="checkbox" id="workerInput" v-model="isUserWorker">
          </div>
          <div id="buttonContainer">
            <button @click="signUp">Kayıt Ol</button>
          </div>
        </div>
      </div>
    </div>

    <div class="indexBottomElContainer" id="aboutContainer">
      <div class="indexBottomTitle">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-square" width="28" height="28" viewBox="0 0 24 24" stroke-width="2" stroke="#F4f4f4" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <line x1="12" y1="8" x2="12.01" y2="8" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <polyline points="11 12 12 12 12 16 13 16" />
        </svg>
        Hakkında
      </div>
      <div class="aboutSubtitle">Hizmetler</div>
      <p>
        TAKİPPORT, firmalarınızın beyanname, ekstre, bordro gibi işlerinin güncel durumunu girip takip etmenizi kolaylaştırır.
        Bir iş süreci takip çözümüdür.
      </p>

      <div class="aboutSubtitle">Çalışanlarınızı Ekleyin</div>
      <p>
        TAKİPPORT'u kullanırken çalışanlarınıza da firma  atayabilir, 
        atadığınız firmaların işlerinin hangi durumda olduğunu anlık olarak takip edebilirsiniz.
      </p>
    
    </div>

    <div class="indexBottomElContainer" id="pricesContainer">
      <div class="indexBottomTitle">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="28" height="28" viewBox="0 0 24 24" stroke-width="2" stroke="#F4f4f4" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <rect x="7" y="9" width="14" height="10" rx="2" />
          <circle cx="14" cy="14" r="2" />
          <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
        </svg>
        Fiyatlar
      </div>
      <div id="subOptionContainer">

        <div class="subscriptionOption" id="bronze">
          <div id="subOptionName">Bronz</div>
          <div id="subOptionFeatureContainer">
            <div id="subObtionFeature">???</div>
            <div id="subObtionFeature">???</div>
            <div id="subObtionPrice">???₺</div>
          </div>
        </div>

        <div class="subscriptionOption" id="silver">
          <div id="subOptionName">Gümüş</div>
          <div id="subOptionFeatureContainer">
            <div id="subObtionFeature">???</div>
            <div id="subObtionFeature">???</div>
            <div id="subObtionPrice">???₺</div>
          </div>
        </div>

        <div class="subscriptionOption" id="gold">
          <div id="subOptionName">Altın</div>
          <div id="subOptionFeatureContainer">
            <div id="subObtionFeature">???</div>
            <div id="subObtionFeature">???</div>
            <div id="subObtionPrice">???₺</div>
          </div>
        </div>

      </div>

    </div>

    <div class="indexBottomElContainer" id="contactContainer">
      <div class="indexBottomTitle">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F4f4f4" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
        İletişim
      </div>
      <div id="contactLinkContainer">
        <a id="contactLink" target="_blank" href="mailto:takipportdestek@gmail.com">Destek için buraya tıklayarak e-posta atın.</a>
      </div>
    </div>
    
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordAgain: '',
      isUserWorker: false,
      signUpPage: false,
      messageArr: [
        'Kolay', 'Etkili', 'Profesyonel'
      ],
      
    }
  },
  methods: {
    async signIn(){
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
        if(firebase.auth().currentUser.emailVerified){
          this.$router.push('/home');
        }else{
          alert('Giriş yapmadan önce e-postanızı onaylayın.');
          firebase.auth().signOut();
        }
      }).catch(err=> {
        console.log(err.message);
        switch (err) {
          case "auth/invalid-email":
            alert("E-posta geçersiz.")
            break;
          case "auth/wrong-password":
            alert("Şifre yanlış.")
            break;
          case "auth/user-not-found":
            alert("Bu e-posta ile kayıtlı bir kullanıcı yok.")
            break;
        
          default:
            alert("Bir hata oluştu. Lütfen e-posta ve şifrenizi kontrol edip tekrar deneyin", err.code)
            break;
        }
        
      })
    },
    async signUp(){
      if(this.password == this.passwordAgain){
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
          var fullName = this.firstName + ' ' + this.lastName;
          firebase.auth().currentUser.sendEmailVerification();
          firebase.database().ref('/users/' + this.email.replace('.', '')).remove();
          if(this.isUserWorker){
            var workerCode = Math.random().toString(36).substr(2, 9);
            firebase.database().ref('/users/workers/' + this.email.replace('.', '') + '/').set({workerCode: workerCode, fullName: fullName});
          }
          firebase.auth().currentUser.updateProfile({
          displayName: fullName
        });
          alert('E-posta adresinize bir doğrulama bağlantısı gönderildi. Giriş yapmadan önce bağlantıya tıklayıp e-postanızı onaylayın.');
          this.signUpPage = false;
          }).catch(err => {
            switch (err.code) {
            case "auth/invalid-email":
              alert("E-posta geçersiz.")
              break;
            case "auth/weak-password":
              alert("Şifre en az 6 karakter olmalı.")
              break;
            case "auth/email-already-in-use":
              alert("Halihazırda başka bir kullanıcı bu e-postayı kullanıyor. Lütfen başka bir e-posta giriniz.")
              break;
          
            default:
              alert("Bir hata oluştu. Lütfen e-posta ve şifrenizi kontrol edip tekrar deneyin" + err.message + err.code)
              break;
          }
        });
      }else{
        alert('Şifreler uyuşmuyor.');
      }
    },
  },
}
</script>

<style>
.container{
  flex-direction: column;
  padding-bottom: 7vh;
}

#indexContainer{
  width: 100%;
  min-height: 90vh;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#indexLeft{
  width: 40%;
  word-wrap: break-word;
  height: 40%;
  margin-left: 5%;
  color: black;
  font-size: 36px;
  font-weight: 800;
}
#indexLeftDescription{
  font-size: 22px;
  font-weight: 400;
  margin-top: 10%;
  color: hsl(245, 30%, 25%);
}
#indexLeftDescription span{
  font-weight: 800;
}

#authContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  background-color: hsl(245, 64%, 33%);
  border: 1.2px black solid;
  border-radius: 7px;
  margin-right: 3%;
  padding: 20px;
  box-shadow: 0 19px 30px rgba(0,0,0,0.30), 0 15px 19px rgba(0, 0, 0, 0.32);
}
#authContainer h5{color: #f4f4f4;}

#authContainer .form{
  display: flex;
  padding: 6%;
  flex-direction: column;
  text-align: center;
  font-size: 38px;
  width: 100%;
  margin: 0 auto;
  color: #bcbcc3;
}

.form *{
  margin-top: 12px;
  border-radius: 7px;
}

.form input{
  padding: 6%;
  font-size: 16px;
  background-color: hsl(245, 30%, 35%);
  color: #f4f4f4;
  border: none;
}

::placeholder{
  color: hsl(0, 0%, 76%);
}

.form #buttonContainer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form #buttonContainer button{
  padding: 6%;
  font-size: 16px;
  width: 42%;
  cursor: pointer;
  background-color: hsl(245, 30%, 45%);
  color: #f4f4f4;
  border: none;
  transition-duration: 180ms;
}
.form #buttonContainer button:hover{
  background-color: hsl(0, 0%, 92%);
  color: black;
}

#signUpFormContainer{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #474f6cec;
}

#signUpFormContainer h1{
  color:#f4f4f4;
  margin-bottom: 10%;
}

#closeSignUp{
  transform: rotate(135deg);
  position: absolute;
  right: 1.5%;
  top: 1.5%;
  cursor: pointer;
}

#signUpFormContainer .form{
  width: 30vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 7px;
  padding: 25px;
  background-color: hsl(245, 64%, 33%);
}

#workerCheckboxContainer{
  color: #f4f4f4;
}
#workerCheckboxContainer input{
  width: 20px;
  height: 20px;
}

#signUpFormContainer .form #buttonContainer{
  width: 100%;
  height: 10%;
  margin: 0 auto;
  margin-top: 6%;
}

#signUpFormContainer .form #buttonContainer button{
  width: 90%;
  margin: 0 auto;
}

.indexBottomElContainer{
  width: 80%;
  height: unset;
  margin: 0 auto;
  margin-top: 10%;
  margin-bottom: 10%;
  background-color: #474f6c;
  border-radius: 7px;
  padding: 40px;
  box-shadow: 0 19px 30px rgba(0,0,0,0.30), 0 15px 19px rgba(0, 0, 0, 0.32);
  text-align: center;
  scroll-behavior: smooth;
}
.indexBottomTitle{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 6vh;
  margin-bottom: 6%;
  color: #f4f4f4;
}
.indexBottomTitle svg{margin-right: 7px;}

.aboutSubtitle{
  font-size: 30px;
  text-align: left;
  font-weight: 800;
  width: 70%;
  margin: 0 auto;
  margin-top: 5%;
  color: hsl(245, 5%, 83%);
}

#aboutContainer p{
  font-size: 22px;
  text-align: left;
  color:  #c0c0c4;
  width: 70%;
  margin: 0 auto;
  margin-top: 4%;
}

#pricesContainer{
  min-height: fit-content;
}

#subOptionContainer{
  height: unset;
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}

.subscriptionOption{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: 25%;
  padding: 2%;
  font-family: 'Playfair Display', serif;
  font-weight: 100;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 9px 15px rgba(0,0,0,0.30), 0 7px 9px rgba(0, 0, 0, 0.32);
}

#subOptionName{
  font-size: 3vh;
  margin-bottom: 7vh;
}

#subOptionFeatureContainer{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
}

#subOptionFeatureContainer *{
  margin-bottom: 6vh;
}

#subObtionPrice{
  font-family: 'Roboto', serif;
  font-weight: 500;
  margin-bottom: 1vh;
}

#bronze{background-color: burlywood;}
#silver{background-color: silver;}
#gold{background-color: gold;}

#contactContainer{
    margin-bottom: 5vh;
}

#contactLinkContainer a{
  color: #f4f4f4;
  text-decoration: underline;
  transition-duration: 180ms;
}

#contactLink:hover{
  transform: scale(1.2);
  color: #8a82ff;
}

@media only screen and (max-width: 600px) {
  .container{
    flex-direction: column;
  }
  #indexContainer{
    flex-direction: column;
    justify-content: space-around;
    height: 120vw;
  }
  #indexLeft{
    width: 80%;
    font-size: 36px;
    margin-top: 10%;
  }
  #indexLeftDescription{
    font-size: 18px;
  }
  #authContainer{
    width: 80%;
    padding: 10px;
  }

  #signUpFormContainer .form{
    width: 70vw;
  }
  .indexBottomElContainer{
    width: 72%;
    height: fit-content;
  }
  .indexBottomTitle {
    font-size: 34px;
  }
  .aboutSubtitle{
    font-size: 24px;
    width: 95%;
    text-align: left;
  }
  #aboutContainer p{
    font-size: 17px;
    width: 95%;
    text-align: left;
  }

  #subOptionContainer{
    width: 98%;
    padding: 0;
    flex-direction: column;
    justify-content: center;
  }

  .subscriptionOption{
    width: 100%;
    margin-bottom: 4vh;
  }
}

</style>
