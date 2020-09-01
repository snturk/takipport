(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{347:function(e,t,r){var content=r(354);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(85).default)("245d0f5d",content,!0,{sourceMap:!1})},353:function(e,t,r){"use strict";var n=r(347);r.n(n).a},354:function(e,t,r){(t=r(84)(!1)).push([e.i,'.container{flex-direction:column;align-items:center}#profileTitle{font-size:38px;margin-top:2%;letter-spacing:1.6px;align-self:center}hr{width:30%}#profileContentContainer{display:flex;flex-direction:row;align-items:center;justify-content:space-around;width:90%;margin:0 auto}.profileContent{overflow:auto;padding:20px;min-height:250px;width:40%;border:1px solid #433e74;border-radius:7px;box-shadow:0 4px 6px rgba(0,0,0,.3),0 4px 5px rgba(0,0,0,.32)}#profileSummaryContainer{text-align:left;display:flex;flex-direction:column;justify-content:space-around;font-weight:400}.profileSubtitle{font-size:26px;margin-bottom:5%}.summaryElement{font-size:18px;margin-top:1%}.summaryElement span{font-size:22px;font-family:"Roboto",sans-serif}.info{margin-top:2%}.info b{letter-spacing:2px;font-family:"Roboto",serif;font-weight:100}#userFullName{font-size:20px;font-weight:700;margin-bottom:2%}#userEmail svg{cursor:pointer}#resetPasswordBtn{cursor:pointer;color:#3b4157;transition-duration:.1s;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}#resetPasswordBtn:hover{color:#616a8d;text-decoration:underline}#workerContainer{display:flex;flex-direction:column;width:90%;min-height:50vh;padding:20px;margin:10% auto;text-align:center;border:1px solid #433e74;border-radius:7px;box-shadow:0 4px 6px rgba(0,0,0,.3),0 4px 5px rgba(0,0,0,.32)}#workerContentContainer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:95%;height:70%;margin:0 auto}#addWorkerContainer{height:100%;width:30%;display:flex;flex-direction:column;justify-content:space-between;padding:10px;color:#f4f4f4;background-color:#453f83;border-radius:7px;border:1px solid #433e74;box-shadow:0 4px 6px rgba(0,0,0,.3),0 4px 5px rgba(0,0,0,.32)}#workerInputContainer{display:flex;flex-direction:column;height:70%;width:80%;margin:0 auto}#workerInputContainer input{padding:6%;font-size:16px;background-color:#585289;color:#f4f4f4;border:none;border-radius:7px;margin-top:2%}#workerInputContainer button{width:30%;margin:4% auto 0;background-color:#5851a4;color:#f4f4f4;border-radius:7px;border:none;cursor:pointer;padding:10px;transition-duration:.18s}#workerInputContainer button:hover{background-color:#8f8bc1}#showWorkerContainer{height:100%;width:60%;display:flex;flex-direction:column;padding:10px;color:#f4f4f4;background-color:#453f83;border-radius:7px;border:1px solid #433e74;box-shadow:0 4px 6px rgba(0,0,0,.3),0 4px 5px rgba(0,0,0,.32)}.workerListContainer{height:70%;overflow:auto}.workerListContainer ul{display:flex;flex-direction:column;justify-content:left;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}@media only screen and (max-width:900px){#profileContentContainer{flex-direction:column;width:100%;margin:0 auto;display:block}.profileContent{width:80%;margin:0 auto 6%}#workerContainer{overflow:auto;margin-bottom:20px}#workerContentContainer{flex-direction:column}#addWorkerContainer{margin-bottom:5%}#addWorkerContainer,#showWorkerContainer{width:90%;min-height:250px}}',""]),e.exports=t},358:function(e,t,r){"use strict";r.r(t);r(40),r(83),r(33);var n=r(8),o=r(111),l=r.n(o),c={data:function(){return{user:void 0,employer:void 0,workerEmail:"",workerCode:"",workerTemplate:{},workerList:[],workerProfile:void 0,totalCompanies:this.$store.state.totalCompanies,totalJobs:this.$store.state.totalJobs,totalTodo:this.$store.state.totalTodo}},created:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.auth().currentUser;case 2:if(e.user=t.sent,e.$store.state.isUserWorker){t.next=8;break}return t.next=6,e.getWorkers();case 6:t.next=10;break;case 8:return t.next=10,e.getWorkerProfile();case 10:case"end":return t.stop()}}),t)})))()},methods:{getWorkerProfile:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.user.email.replace(".",""),t.next=3,l.a.database().ref("/users/workers/"+r).on("value",(function(t){t.exists()&&(e.workerProfile=t.val())}));case 3:case"end":return t.stop()}}),t)})))()},getWorkers:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.user.email.replace(".",""),t.next=3,l.a.database().ref("/users/"+r+"/workers/").on("value",(function(t){t.exists()&&(e.workerList=t.val())}));case 3:case"end":return t.stop()}}),t)})))()},addWorker:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.checkWorkerInfo(e.workerEmail,e.workerCode)){t.next=12;break}return t.next=3,l.a.auth().currentUser.email.replace(".","");case 3:return r=t.sent,t.next=6,l.a.database().ref("/users/"+r+"/workers/"+e.workerEmail.replace(".","")).set(e.workerTemplate);case 6:return t.next=8,l.a.database().ref("/users/workers/"+e.workerEmail.replace(".","")+"/employer").set(e.user.email);case 8:return t.next=10,e.getWorkers();case 10:t.next=13;break;case 12:alert("Çalışan e-postası veya kodu hatalı.");case 13:case"end":return t.stop()}}),t)})))()},checkWorkerInfo:function(e,code){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l.a.database().ref("/users/workers/"+e.replace(".","")).on("value",(function(e){if(!e.exists())return alert("E-posta bir çalışan profiline ait değil."),!1;var data=e.val();return console.log(data.workerCode),data.workerCode==code?(t.workerTemplate=data,!0):void 0}));case 2:case"end":return r.stop()}}),r)})))()},changeEmail:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=prompt("Lütfen yeni e-postanızı girin:",""),n=l.a.auth(),o=n.currentUser.email.replace(".",""),e.$store.state.isUserWorker){t.next=8;break}return t.next=6,l.a.database().ref("/users/"+o).on("value",(function(e){e.exists()&&(c=e.val().companies)}));case 6:return t.next=8,l.a.database().ref("/users/"+r.replace(".","")+"/companies").update(c);case 8:return t.next=10,n.currentUser.updateEmail(r).then((function(){n.currentUser.sendEmailVerification(),alert("E-posta adresinize bir doğrulama bağlantısı gönderildi. Giriş yapmadan önce bağlantıya tıklayıp e-postanızı onaylayın.")})).catch((function(e){alert("Bir hata oluştu, lütfen tekrar deneyin."),console.error(e)}));case 10:case"end":return t.stop()}}),t)})))()},reAuth:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=l.a.auth(),t.next=3,l.a.auth.EmailAuthProvider.credential(r.currentUser.email,prompt("Lütfen şifrenizi girin: ",""));case 3:n=t.sent,r.currentUser.reauthenticateWithCredential(n).then(e.changeEmail()).catch((function(e){alert("Bir hata oluştu, lütfen tekrar deneyin."),console.log(e.message)}));case 5:case"end":return t.stop()}}),t)})))()},resetPassword:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.auth().sendPasswordResetEmail(e.user.email).then((function(){alert("E-posta adresinize şifre sıfırlama e-postası gönderildi.")})).catch((function(e){alert("Bir hata oluştu",e.code)}));case 2:case"end":return t.stop()}}),t)})))()},asyncData:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e.req,n=e.redirect,r.next=7;break;case 4:t.user=r.sent,r.next=11;break;case 7:return r.next=9,l.a.auth().currentUser;case 9:r.sent||n("/");case 11:case"end":return r.stop()}}),r)})))()}}},d=(r(353),r(34)),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.user?r("div",{staticClass:"container"},[r("div",{attrs:{id:"profileTitle"}},[e._v("Profiliniz")]),e._v(" "),r("hr"),e._v(" "),r("div",{attrs:{id:"profileContentContainer"}},[r("div",{staticClass:"profileContent",attrs:{id:"profileSummaryContainer"}},[r("div",{staticClass:"profileSubtitle"},[r("svg",{staticClass:"icon icon-tabler icon-tabler-briefcase",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"#474f6c",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[r("path",{attrs:{stroke:"none",d:"M0 0h24v24H0z"}}),e._v(" "),r("rect",{attrs:{x:"3",y:"7",width:"18",height:"13",rx:"2"}}),e._v(" "),r("path",{attrs:{d:"M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"}}),e._v(" "),r("line",{attrs:{x1:"12",y1:"12",x2:"12",y2:"12.01"}}),e._v(" "),r("path",{attrs:{d:"M3 13a20 20 0 0 0 18 0"}})]),e._v("\n        İş Özeti")]),e._v(" "),r("div",{staticClass:"summaryElement"},[e._v("Toplam firma: "),r("span",[e._v(e._s(e.totalCompanies))])]),e._v(" "),r("div",{staticClass:"summaryElement"},[e._v("Toplam iş: "),r("span",[e._v(e._s(e.totalJobs))])]),e._v(" "),r("div",{staticClass:"summaryElement"},[e._v("Tamamlanan iş: "),r("span",[e._v(e._s(e.totalJobs-e.totalTodo))])]),e._v(" "),r("div",{staticClass:"summaryElement"},[e._v("Kalan iş: "),r("span",[e._v(e._s(e.totalTodo))])])]),e._v(" "),r("div",{staticClass:"profileContent",attrs:{id:"profileInfoContainer"}},[r("div",{staticClass:"profileSubtitle"},[r("svg",{staticClass:"icon icon-tabler icon-tabler-user",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"#474f6c",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[r("path",{attrs:{stroke:"none",d:"M0 0h24v24H0z"}}),e._v(" "),r("circle",{attrs:{cx:"12",cy:"7",r:"4"}}),e._v(" "),r("path",{attrs:{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"}})]),e._v("\n        Profil Bilgileri\n      ")]),e._v(" "),e.user.displayName?r("div",{staticClass:"info",attrs:{id:"userFullName"}},[e._v(" "+e._s(e.user.displayName)+" ")]):e._e(),e._v(" "),this.$store.state.isUserWorker?r("div",{staticClass:"info"},[e._v("(Çalışan Hesabı)")]):e._e(),e._v(" "),this.$store.state.isUserWorker&&e.workerProfile?r("div",{staticClass:"info"},[e._v("Çalışan Kodu: "),r("b",[e._v(e._s(e.workerProfile.workerCode))])]):e._e(),e._v(" "),e.user.email?r("div",{staticClass:"info",attrs:{id:"userEmail"}},[e._v(" e-posta: "+e._s(e.user.email)+"\n        "),r("svg",{staticClass:"icon icon-tabler icon-tabler-edit",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24","stroke-width":"2.5",stroke:"#474f6c",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},on:{click:function(t){return e.reAuth()}}},[r("path",{attrs:{stroke:"none",d:"M0 0h24v24H0z"}}),e._v(" "),r("path",{attrs:{d:"M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"}}),e._v(" "),r("path",{attrs:{d:"M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"}}),e._v(" "),r("line",{attrs:{x1:"16",y1:"5",x2:"19",y2:"8"}})])]):e._e(),e._v(" "),r("div",{staticClass:"info",attrs:{id:"resetPasswordBtn"},on:{click:function(t){return e.resetPassword()}}},[e._v("şifreyi sıfırla")])])]),e._v(" "),this.$store.state.isUserWorker?e._e():r("div",{attrs:{id:"workerContainer"}},[r("div",{staticClass:"profileSubtitle"},[r("svg",{staticClass:"icon icon-tabler icon-tabler-users",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"#474f6c",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[r("path",{attrs:{stroke:"none",d:"M0 0h24v24H0z"}}),e._v(" "),r("circle",{attrs:{cx:"9",cy:"7",r:"4"}}),e._v(" "),r("path",{attrs:{d:"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"}}),e._v(" "),r("path",{attrs:{d:"M16 3.13a4 4 0 0 1 0 7.75"}}),e._v(" "),r("path",{attrs:{d:"M21 21v-2a4 4 0 0 0 -3 -3.85"}})]),e._v("  \n      Çalışanlar\n    ")]),e._v(" "),r("div",{attrs:{id:"workerContentContainer"}},[r("div",{attrs:{id:"addWorkerContainer"}},[r("div",{staticClass:"profileSubtitle"},[e._v("Çalışan Ekle")]),e._v(" "),r("div",{attrs:{id:"workerInputContainer"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.workerEmail,expression:"workerEmail"}],attrs:{type:"text",id:"workerEmailInput",placeholder:"çalışan e-posta"},domProps:{value:e.workerEmail},on:{input:function(t){t.target.composing||(e.workerEmail=t.target.value)}}}),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.workerCode,expression:"workerCode"}],attrs:{type:"text",id:"workerCodeInput",placeholder:"çalışan profil kodu"},domProps:{value:e.workerCode},on:{input:function(t){t.target.composing||(e.workerCode=t.target.value)}}}),e._v(" "),r("button",{on:{click:function(t){return e.addWorker()}}},[e._v("Ekle")])])]),e._v(" "),r("div",{attrs:{id:"showWorkerContainer"}},[r("div",{staticClass:"profileSubtitle"},[e._v("Çalışan Listesi")]),e._v(" "),r("div",{staticClass:"workerListContainer"},[r("ul",e._l(e.workerList,(function(t){return r("li",{key:t.workerCode},[r("svg",{staticClass:"icon icon-tabler icon-tabler-user",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#f4f4f4",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[r("path",{attrs:{stroke:"none",d:"M0 0h24v24H0z"}}),e._v(" "),r("circle",{attrs:{cx:"12",cy:"7",r:"4"}}),e._v(" "),r("path",{attrs:{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"}})]),e._v("\n              "+e._s(t.fullName)+"\n            ")])})),0)])])])])]):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);