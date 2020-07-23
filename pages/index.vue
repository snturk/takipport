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
        <div id="indexLeftDescription">TAKİPPORT, mali müşavirler ve muhasebeciler için bir iş süreci takip çözümüdür.</div>
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
          <input type="text" placeholder="e-posta" v-model="email">
          <input type="password" placeholder="şifre" v-model="password">
          <input type="password" placeholder="şifre tekrar" v-model="passwordAgain">
          <div id="buttonContainer">
            <button @click="signUp">Kayıt Ol</button>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div id="aboutContainer">
      <div id="aboutTitle">Hakkında</div>
      <hr>
      <div class="aboutSubtitle">Hizmetler</div>
      <p class="disabledText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, consectetur! 
      Minima voluptate ex facilis, possimus, obcaecati maiores nesciunt quod dolorum quos harum debitis! 
      Repellat illum quos esse. Reiciendis, sequi aut.</p>
      <hr>
      <div class="aboutSubtitle">Kullanım</div>
     <p class="disabledText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum tempora cum fugit distinctio dolore! 
      Maxime, dolores expedita quos eum hic ad dicta a, dolorum ea debitis magni, iusto illum perferendis?</p>
    </div>
    <hr>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordAgain: '',
      signUpPage: false,
      messageArr: [
        'Kolay', 'Etkili', 'Profesyonel'
      ],
      
    }
  },
  methods: {
    async signIn(){
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
        if(!user.emailVerified){
          this.$router.push('/home');
        }else{
          alert('Giriş yapmadan önce e-postanızı onaylayın.');
          firebase.auth().signOut();
        }
      }).catch(err=> {
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
            alert("Bir hata oluştu. Lütfen e-posta ve şifrenizi kontrol edip tekrar deneyin")
            break;
        }
        
      })
    },
    async signUp(){
      if(this.password == this.passwordAgain){
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(async user => {
          await firebase.auth().currentUser.sendEmailVerification();
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
              alert("Bir hata oluştu. Lütfen e-posta ve şifrenizi kontrol edip tekrar deneyin")
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
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

#indexContainer{
  min-height: 100%;
  height: 90vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#aboutContainer{
  width: 70%;
  min-height: 90%;
  margin: 0 auto;
  margin-top: 5%;
  text-align: center;
  margin-bottom: 5%;
  scroll-behavior: smooth;
}
#aboutTitle{
  font-size: 36px;
}
#aboutContainer hr{
  width: 70%;
  background-color: #474f6c;
  height: 1.3px;
  border: none;
  margin-top: 2%;
  margin-bottom: 2%;
}
.aboutSubtitle{
  font-size: 32px;
  text-align: left;
  width: 70%;
  margin: 0 auto;
  color:  hsl(245, 44%, 20%);
}
#aboutContainer p{
  font-size: 24px;
  text-align: left;
  color: hsl(245, 28%, 50%);
  width: 70%;
  margin: 0 auto;
  margin-top: 4%;
}

#indexLeft{
  width: 40%;
  word-wrap: break-word;
  height: 40%;
  margin-left: 5%;
  color: black;
  font-size: 50px;
  font-weight: 800;
}
#indexLeftDescription{
  font-size: 22px;
  margin-top: 10%;
  color: hsl(245, 30%, 25%);
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
  box-shadow: 0 19px 30px rgba(0,0,0,0.30), 0 15px 19px rgba(0, 0, 0, 0.32);
}
#authContainer h5{color: #f4f4f4;}

#authContainer .form{
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 38px;
  padding: 7%;
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
  width: 20%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 7px;
  padding: 25px;
  background-color: hsl(245, 64%, 33%);
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

@media only screen and (max-width: 900px) {
  #indexContainer{
    flex-direction: column;
  }
  #indexLeft{
    width: 80%;
    font-size: 6vh;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  #indexLeftDescription{
    font-size: 3vh;
  }
  #authContainer{
    width: 80%;
    height: 70vh;
    padding: 1vh;
  }

  .form{
    width: 90%;
  }
}

</style>
