<template>
  <div id="company">
    <div id="companyHeader">
      <div id="assignedUser">
        <svg v-show="!isUserWorker" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </svg>
        <div v-show="!isUserWorker" id="assignedUserName" v-if="!selectMode">{{owner}}</div>
        <select v-show="!isUserWorker" @change="selectMode = false; changeOwner();" v-model="selectedOwner" v-else>
          <option value="" disabled selected>çalışan seç</option>
          <option :value="currentUserName">{{currentUserName}}</option>
          <option v-for="worker in workerList" :key="worker.workerCode" :value="worker.fullName">{{worker.fullName}}</option>
        </select>
        <svg v-show="!isUserWorker" @click="selectMode = !selectMode" id="changeOwnerBtn" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
        </svg>
      </div>
      <div id="companyButtonsContainer">
        <div class="companyButton" id="resetButton">
          <svg @click="resetProps()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-2" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M15 4.55a8 8 0 0 0 -7 14.9m0 -4.45v5h-5" />
            <path d="M13 19.95a8 8 0 0 0 5.3 -12.8" stroke-dasharray=".001 4.13" />
          </svg>
        </div>

        <div @click="toggleDisabled()" v-if="!disabled && !isUserWorker" class="companyButton">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-open" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-5a4 4 0 0 1 8 0" />
          </svg>
        </div>

        <div @click="toggleDisabled()" v-if="disabled && !isUserWorker" class="companyButton">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
          </svg>
        </div>

        <div v-if="!isUserWorker" class="companyButton">
          <svg @click="deleteCompany" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" stroke-width="1" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </div>
      </div>
    </div>

    <div id="companyName" :class="{'disabledText': disabled}"> {{name}} </div>
    <div id="valTypeContainer" :class="{'disabledText': disabled}">
      <div class="cond0" v-for="val in valTypes.condZero"></div> <div v-if="valTypes.condOne && valTypes.condZero">|</div>
      <div class="cond1" v-for="val in valTypes.condOne"></div> <div v-if="(valTypes.condTwo && valTypes.condOne) || (valTypes.condTwo && valTypes.condZero)">|</div>
      <div class="cond2" v-for="val in valTypes.condTwo"></div>
    </div>
    <div id="companyPropsContainer" :class="{'disabledText': disabled}">
      <div class="prop" v-for="prop in propsData" :key="prop.name">
        <div id="propName">{{prop.name}}: </div>
        <div id="propValue" v-if="!disabled" :style="{color: prop.colorCode}" v-on:click="updateProp(prop.originalName)">{{prop.value}} <div v-if="prop.originalValue == 2"></div></div>
      </div>
      <h2>Ekler</h2>
      <div id="companyAddsContainer" :class="{'disabledText': disabled}">
        <input type="text" id="addAddsInput" placeholder="ek iş ekle" autocomplete="off" @keyup.enter="addAddition(additionName)" v-model="additionName">
        <div id="addAddsBtn" @click="addAddition(additionName)">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#474f6c" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>
      <div id="additionContainer" v-if="!disabled" :class="{'disabledText': disabled}">
        <div v-if="additions.length != 0" class="addition" v-for="i in additions.length">
          <div id="additionLeftContainer">
            <div id="additionName">{{addition[additions[i-1]].name}}:</div>
            <input type="checkbox" id="addCheckbox" @click="changeChecked(addition[additions[i-1]].name, addition[additions[i-1]].value, additions[i-1])"
            v-model="addition[additions[i-1]].value"
            >
          </div>


          <div id="deleteAdd" @click="deleteAdd(additions[i-1])">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  props:[
    "name", "id", "addition" ,"gCond"
  ],
 data() {
   return {
     propsData: [],
     workerList: [],
     disabled: false,
     owner: '',
     selectedOwner: '',
     isUserWorker: undefined,
     selectMode: false,
     valTypes: {
       condZero: 0,
       condOne: 0,
       condTwo: 0 
     },
     additionName: '',
     additions:[],
   }
 },
 async mounted() {
   if(this.$store.state.isUserWorker){
     this.isUserWorker = true;
    }else{
      this.isUserWorker = false;
    }

    await this.getWorkers();
    await this.getProps();
    await this.getVarProps();
    await this.getValueTypes();
    this.currentUserName = firebase.auth().currentUser.displayName;
    if(this.addition){
      this.additions = Object.keys(this.addition);
    }
 },
 methods: {
   async getWorkers(){
      var userEmail = await firebase.auth().currentUser.email.replace('.', '');
      await firebase.database().ref('/users/' + userEmail + '/workers/').on('value', (snapshot) => {
        if (snapshot.exists()) {
          this.workerList = snapshot.val();
        }
      })
    },
    async changeOwner(){
      await firebase.database().ref('/users/' + (firebase.auth().currentUser.email).replace('.', '') + "/companies/" + this.id + '/owner').set(this.selectedOwner);
    },
   async getProps(){
     
     await firebase.database().ref(await this.getRefURL()).on('value', (snapshot) => {
       if(snapshot.exists()){
          var data = snapshot.val();
          this.props = data.props;
          this.disabled = data.disabled;
          this.owner = data.owner;
          this.getVarProps();
          this.getValueTypes();
       }
     })
   },
   getVarProps(){
     this.propsData = [];
     var colorCodeZero = 'hsl(0, 75%, 32%)';
     var colorCondOne = 'hsl(245, 30%, 45%)';
     var colorCodeTwo = 'hsl(245, 40%, 75%)';
     for (const key in this.props) {
       var data = {
         name: '',
         value: '',
         originalName: '',
         originalValue: '',
         colorCode: '',
       }
       switch (key) {
         case 'aylikMuhasebeEvrak':
           data.name = 'Aylık Muhasebe Evrakı';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'alınmadı';
              data.colorCode = colorCodeZero;
              break;
            case 1:
              data.value = 'alındı';
              data.colorCode = colorCondOne;
              break;
            case 2:
              data.value = 'işlendi';
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'bFormları':
           data.name = 'B Formları';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'yapılmadı'
              data.colorCode = colorCodeZero;
              break;
            case 1:
              data.value = 'yapıldı'
              data.colorCode = colorCondOne;
              break;
            case 2:
              data.value = 'onaylandı'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'bankaEkstreleri':
           data.name = 'Banka Ekstreleri';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'alınmadı'
              data.colorCode = colorCodeZero;
              break;
            case 1:
              data.value = 'alındı'
              data.colorCode = colorCondOne;
              break;
            case 2:
              data.value = 'işlendi'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'damgaVergisi':
           data.name = 'Damga Vergisi';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'yapılmadı'
              data.colorCode = colorCodeZero;
              break;
            case 1:
              data.value = 'yapıldı'
              data.colorCode = colorCondOne;
              break;
            case 2:
              data.value = 'onaylandı'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'geciciVergiBeyannamesi':
           data.name = 'Geçici Vergi Beyannamesi';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'yapılmadı'
              data.colorCode = colorCodeZero;
              break;
            case 1:
              data.value = 'yapıldı'
              data.colorCode = colorCondOne;
              break;
            case 2:
              data.value = 'onaylandı'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'kdvBeyannamesi':
           data.name = 'KDV Beyannamesi';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'yapılmadı'
              data.colorCode = colorCodeZero;
              break;
            case 1:
              data.value = 'yapıldı'
              data.colorCode = colorCondOne;
              break;
            case 2:
              data.value = 'onaylandı'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'muhtasarBeyannamesi':
           data.name = 'Muhtasar Beyannamesi';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'yapılmadı'
              data.colorCode = colorCodeZero;
              break;
            case 1:
              data.value = 'yapıldı'
              data.colorCode = colorCondOne;
              break;
            case 2:
              data.value = 'onaylandı'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'sgkBildirgesi':
           data.name = 'SGK Bildirgesi';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'verilmedi'
              data.colorCode = colorCodeZero;
              break;
            case 2:
              data.value = 'verildi'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
        case 'ucretBordrosu':
           data.name = 'Ücret Bordrosu';
           data.originalName = key;
           data.originalValue = this.props[key];
           switch (this.props[key]) {
            case 0:
              data.value = 'yapılmadı'
              data.colorCode = colorCodeZero;
              break;
            case 2:
              data.value = 'yapıldı'
              data.colorCode = colorCodeTwo;
              break;
             default:
               break;
           }
           break;
       
         default:
           break;
       }
       this.propsData.push(data);
     }
   },
   async getRefURL(){
     var employerEmail;
      var refURL;
      if(this.isUserWorker){
        await firebase.database().ref("/users/workers/" + await firebase.auth().currentUser.email.replace('.', '') + "/employer").once('value', (snapshot)=>{
          if(snapshot.exists()){
            employerEmail = snapshot.val().replace('.', '');
          }
        });
        refURL = "/users/" + employerEmail + "/companies/" + this.id;
      }else{
        refURL = "/users/" + await firebase.auth().currentUser.email.replace('.', '') + "/companies/" + this.id;
      }
      console.log(refURL);
      return refURL;
   },
   async updateProp(propName){
     
     var currentVal = this.props[propName];
     if(propName != 'sgkBildirgesi' && propName != 'ucretBordrosu'){
       if(currentVal == 0 || currentVal == 1){
         await firebase.database().ref(await this.getRefURL() + '/props/' + propName).set(currentVal+1);
       }else if(currentVal == 2){
         await firebase.database().ref(await this.getRefURL() + '/props/' + propName).set(0);
       }
     }else{
       if(currentVal == 0){
         await firebase.database().ref(await this.getRefURL() + '/props/' + propName).set(2);
       }else{
         await firebase.database().ref(await this.getRefURL() + '/props/' + propName).set(0);
       }
     }
    
    await this.getVarProps();
    await this.getValueTypes();
   },
    getValueTypes(){
     this.valTypes.condZero = 0;
     this.valTypes.condOne = 0;
     this.valTypes.condTwo = 0;
     this.propsData.forEach(el => {
       if(el.originalValue == 0){
         this.valTypes.condZero += 1;
       }else if(el.originalValue == 1){
         this.valTypes.condOne += 1;
       }else if(el.originalValue == 2){
         this.valTypes.condTwo += 1;
       }
     });
   },
   async deleteCompany(){
     if(confirm(this.name + " adlı firmayı silmek istediğinize emin misiniz?")){
     await firebase.database().ref(await this.getRefURL()).remove();
     }
   },
   async addAddition(name){
      if(name.toString().replace(/\s/g,'')){
        await firebase.database().ref(await this.getRefURL() + "/addition/").push({name: name, value: false});
        this.additions = [];
      }else{
        alert("Ek iş adı boş olamaz.")
      }

    if(this.addition){
      this.additions = Object.keys(this.addition);
    }
    this.additionName = '';
   },
   async changeChecked(name, value, id){
     await firebase.database().ref(await this.getRefURL() + "/addition/" + id).update({name: name, value: !value});
   },
   async deleteAdd(id){
     this.additions = [];
     await firebase.database().ref(await this.getRefURL() + "/addition/" + id).remove();
     if(this.addition){
       this.additions = Object.keys(this.addition);
     }
   },
   async resetProps(){
     if(confirm(this.name + " adlı firmanın tüm işleri sıfırlanacak. Bu işlemi gerçekleştirmek istiyor musunuz?")){
       await firebase.database().ref(await this.getRefURL() + "/props").update(this.$parent.company.props);
       await this.getVarProps();
       await this.getValueTypes();
     }
  },
  async toggleDisabled(){
    await firebase.database().ref(await this.getRefURL() + '/disabled').set(!this.disabled);
  }
 },
}
</script>

<style>
#company{
  width: 40%;
  height: 40%;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  border: 1px solid hsl(245, 35%, 25%);
  border-radius: 5px;
  margin: 1%;
  padding: 1.4%;
  transition-duration: 280ms;
  box-shadow: 0 4px 6px rgba(0,0,0,0.30), 0 4px 5px rgba(0, 0, 0, 0.32);
}


#companyName{
  font-size: 36px;
  margin-top: 2%;
  transition-duration: 180ms;
}

#companyHeader{
  display: flex;
  flex-direction: row;
  width: 98%;
  margin: 0 auto;
  justify-content: space-between;
}


#companyButtonsContainer{
  display: flex;
  flex-direction: row;
  max-width: 23%;
  justify-content: space-around;
  align-items: center;
  align-self: flex-end;
  top: 1px;
  right: 1px;
  cursor: pointer;
}
svg{transition-duration: 90ms;}
svg:active{
  transform: scale(0.84);
}

#assignedUser{
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  font-size: 15px;
  min-width: 35%;
  font-family: 'Roboto', serif;
  font-weight: 100;
  color: #474f6c;
}

select{
  width: fit-content;
}

#changeOwnerBtn{
  cursor: pointer;
  transform: scale(0.8);
}

#assignedUser div{
  margin-left: 3%;
}

#resetButton{
  transition-duration: 670ms;
}

#resetButton:hover{
  transform: rotate(-720deg);
}

#valTypeContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  align-items: center;
  width: 70%;
  min-height: 20px;
  margin-top: 2%;
  margin-bottom: 2%;
  transition-duration: 180ms;
}

#valTypeContainer .cond0, .cond1, .cond2{
  width: 10px;
  height: 10px;
  margin: 2px;
  border-radius: 50%;
  box-shadow: 0 2px 3.1px rgba(0,0,0,0.30), 0 1.4px 2px rgba(0, 0, 0, 0.32);
}

.cond0{
  background-color: hsl(0, 75%, 32%);
}
.cond1{
  background-color: hsl(245, 30%, 45%);
}
.cond2{
  background-color: hsl(245, 40%, 75%);
}

#companyPropsContainer{
  border-radius: 7px;
  margin-top: 3%;
  overflow: auto;
  height: 300px;
  transition-duration: 180ms;
}

.prop{
  display: flex;
  flex-direction: row;
  margin-top: 3%;
  transition-duration: 180ms;
}

#propName{
  font-size: 18px;
}

#propValue{
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: bold;
  margin-left: 1%;
  color: hsl(245, 35%, 25%);
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: hsla(245, 30%, 5%, 20%);
  cursor: pointer;
  transition-duration: 20ms;
}
#propValue:hover{
  transform: scale(1.08);
}
#propValue:active{
  filter: blur(1px);
}

#propValue div{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(106, 177, 0);
  margin-left: 4px;
}

#companyAddsContainer{
  margin-top: 2%;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  transition-duration: 180ms;
}

#companyAddsContainer input{
  padding: 7px;
  font-size: 15px;
  background-color: #f4f4f4;
  border: 1px solid hsl(245, 30%, 35%);
  border-radius: 2px;
  margin-right: 1%;
}

#additionContainer{
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  width: 100%;
}

#addAddsBtn{
  cursor: pointer;
}


.addition{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border-bottom: 1px solid #474f6c;
  border-radius: 4px;
  padding: 5px;
  margin-top: 2%;
}

.addition #additionLeftContainer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 30px);
  word-wrap: break-word;
}

#additionName{
  font-size: 17px;
  margin-right: 4%;
  width: 54%;
}

.addition #additionLeftContainer input{
  margin-right: 1%;
  height: 20px;
  width: 20px;
}

#deleteAdd{
  width: 28px;
  height: 28px;
  cursor: pointer;
}

@media only screen and (max-width: 900px){
  #company{
    width: 90%;
    margin: 0 auto;
    margin-top: 6%;
  }

  #companyButtonsContainer{
    width: 35%;
  }
}
</style>