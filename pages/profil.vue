<template>
  <div class="container">
    <div id="profileTitle">Profiliniz</div>
    <hr>
    <div id="profileContent">
      <div id="profileSummaryContainer">
        <div class="profileSubtitle">Özet</div>
        <div class="summaryElement">Toplam firma: <span>{{totalCompanies}}</span></div>
        <div class="summaryElement">Toplam iş: <span>{{totalJobs}}</span></div>
        <div class="summaryElement">Tamamlanan iş: <span>{{totalJobs-totalTodo}}</span></div>
        <div class="summaryElement">Kalan iş: <span>{{totalTodo}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      totalCompanies: this.$store.state.totalCompanies,
      totalJobs: this.$store.state.totalJobs,
      totalTodo: this.$store.state.totalTodo
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

#profileContent{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
}

#profileSummaryContainer{
  margin-top: 3%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-weight: 400;
  padding: 20px;
  border: 1px solid hsl(245, 30%, 35%);
  border-radius: 7px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.30), 0 4px 5px rgba(0, 0, 0, 0.32);
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