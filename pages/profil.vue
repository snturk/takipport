<template>
  <div class="container">
    <div id="profileTitle">Profiliniz</div>
    <hr>
    <div id="profileContentContainer">
      <div class="profileContent" id="profileSummaryContainer">
        <div class="profileSubtitle">Özet</div>
        <div class="summaryElement">Toplam firma: <span>{{totalCompanies}}</span></div>
        <div class="summaryElement">Toplam iş: <span>{{totalJobs}}</span></div>
        <div class="summaryElement">Tamamlanan iş: <span>{{totalJobs-totalTodo}}</span></div>
        <div class="summaryElement">Kalan iş: <span>{{totalTodo}}</span></div>
      </div>

      <div class="profileContent" id="profileInfoContainer">
        <div class="profileSubtitle">Profil Bilgileri</div>
        <div class="info"> {{user.displayName}} </div>
        <div class="info"> {{user.email}} </div>
        <div class="info"></div>
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
      user: firebase.auth().currentUser,
      totalCompanies: this.$store.state.totalCompanies,
      totalJobs: this.$store.state.totalJobs,
      totalTodo: this.$store.state.totalTodo
    }
  },
  methods: {
    asyncData({req, redirect}) {
    if(process.server){

    } else {
      let user = firebase.auth().currentUser
      if(!user){
        redirect('/');
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
}

hr{
  width: 30%;
}

#profileContentContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
}

.profileContent{
  padding: 20px;
  min-height: 200px;
  height: 30%;
  border: 1px solid hsl(245, 30%, 35%);
  border-radius: 7px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.30), 0 4px 5px rgba(0, 0, 0, 0.32);
}

#profileSummaryContainer{
  margin-top: 3%;
  width: 25%;
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
</style>