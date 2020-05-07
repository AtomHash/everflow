!function webpackUniversalModuleDefinition(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("everflow",[],t):"object"==typeof exports?exports.everflow=t():e.everflow=t()}(window,(function(){return function(e){var t={}
function __webpack_require__(r){if(t[r])return t[r].exports
var n=t[r]={i:r,l:!1,exports:{}}
e[r].call(n.exports,n,n.exports,__webpack_require__)
n.l=!0
return n.exports}__webpack_require__.m=e
__webpack_require__.c=t
__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})}
__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})
Object.defineProperty(e,"__esModule",{value:!0})}
__webpack_require__.t=function(e,t){1&t&&(e=__webpack_require__(e))
if(8&t)return e
if(4&t&&"object"==typeof e&&e&&e.__esModule)return e
var r=Object.create(null)
__webpack_require__.r(r)
Object.defineProperty(r,"default",{enumerable:!0,value:e})
if(2&t&&"string"!=typeof e)for(var n in e)__webpack_require__.d(r,n,function(t){return e[t]}.bind(null,n))
return r}
__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e}
__webpack_require__.d(t,"a",t)
return t}
__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}
__webpack_require__.p="/"
return __webpack_require__(__webpack_require__.s=10)}([function(e,t){e.exports=require("vue-property-decorator")},function(e,t){e.exports=require("vue")},function(e,t){e.exports=require("localforage")},function(e,t){e.exports=require("vue-router")},function(e,t){e.exports=require("axios")},function(e,t){},function(e,t){e.exports=require("vuex")},function(e,t){e.exports=require("vue-class-component")},function(e,t){e.exports=require("crypto-js")},function(e,t){e.exports=require("moment")},function(e,t,r){e.exports=r(11)},function(e,t,r){"use strict"
r.r(t)
r.d(t,"navigationGuards",(function(){return F}))
r.d(t,"EverflowPluginOptions",(function(){return EverflowPluginOptions}))
r.d(t,"VueRouter",(function(){return i.a}))
r.d(t,"App",(function(){return app_App}))
r.d(t,"Page",(function(){return R}))
r.d(t,"Ready",(function(){return j}))
r.d(t,"Request",(function(){return request_Request}))
r.d(t,"errors",(function(){return h}))
r.d(t,"utils",(function(){return C}))
r.d(t,"models",(function(){return L}))
r.d(t,"decorators",(function(){return x}))
r.d(t,"interfaces",(function(){return N}))
r.d(t,"Translator",(function(){return translator_Translator}))
r.d(t,"Security",(function(){return Security}))
const n={install(e,t){e.prototype.$everflowApp=t.everflowApp}}
class EverflowPluginOptions{}var o=n,a=r(3),i=r.n(a),s=r(1),u=r.n(s),l=r(6),c=r.n(l),d=r(2)
const f={online:navigator.onLine,removeHtml:e=>e.replace(/<\/?[^>]+(>|$)/g,""),microTime(){var e=(new Date).getTime(),t=Math.floor(e/1e3)
return t},tagTester:e=>function(t){return toString.call(t)==="[object "+e+"]"}},isFunction=function(e){return"function"==typeof e},startsWith=function(e,t,r=null){const{length:n}=e
r=null==r?0:r
r<0?r=0:r>n&&(r=n)
t=""+t
return e.slice(r,r+t.length)==t}
var p=f
class storage_Storage{constructor(e){var t={driver:[d.INDEXEDDB,d.WEBSQL,d.LOCALSTORAGE],name:"everflow-db",storeName:"default",size:4980736},r={...t,...e}
d.config(r)}set(e,t,r,n){d.setItem(e,t).then((function(e){isFunction(r)&&r(e)})).catch((function(e){isFunction(n)&&n(e)}))}get(e,t){d.getItem(e,t)}remove(e,t=null){t?d.removeItem(e,t):d.removeItem(e)}}class Model{constructor(e){this.saveName="defaultModel"
this.__storage=null
this.__storage=e}map(e){var t=this
Object.keys(e).map((function(r,n){r in t&&(t[r]=e[r])}))}save(e=null,t=null,r=this.__storage){r.set(this.saveName,this,e,t)}load(e,t=this.__storage){var r=this
t.get(this.saveName,(function(t,n){n&&r.map(n)
e&&new e(r,n)}))}delete(e=null,t=this.__storage){t.remove(this.saveName,(function(){e&&new e}))}}class language_model_LanguageModel extends Model{constructor(){super(...arguments)
this.saveName="language"
this.data=""}}class language_Language{constructor(e){this.data=null
this.ready=!1
this.current="en"
this.current=e.config.language
this.init(e.storage)}init(e){var t=this
this.languageModel=new language_model_LanguageModel(e)
this.languageModel.load((function(e,r){t.languageModel=e}),e)}save(){this.languageModel.data=this.data
this.languageModel.save()}loadParse(e){for(var t in e)this.data[t]=e[t]}load(e){var t=this,r=setInterval((function(){if(t.ready){clearInterval(r)
t.loadParse(e)
t.save()}}),200)}delete(e){delete this.data[e]
this.save()}}class ConfigRouterModeError extends Error{constructor(){super('App.config.routerMode missing. Must be "hash", "history" or "abstract"')}}class ConfigMountError extends Error{constructor(){super("Cannot find mountId in config file")}}class RoutesEmptyError extends Error{constructor(){super("Routes passed to App.run([]) cannot be blank")}}class RequestEndPointFormatError extends Error{constructor(){super("Request endpoint error. Make sure a / is on all routes.")}}class RequestBaseurlFormatError extends Error{constructor(){super("Request apiURL in evconfig.json format error. Make sure the apiURL in the config does not end with a /")}}class RequestPrefixFormatError extends Error{constructor(){super("Request prefix error. Make sure prefix starts with a / and does NOT end with a /")}}var h={ConfigRouterModeError:ConfigRouterModeError,ConfigMountError:ConfigMountError,RoutesEmptyError:RoutesEmptyError,RequestEndPointFormatError:RequestEndPointFormatError,RequestBaseurlFormatError:RequestBaseurlFormatError,RequestPrefixFormatError:RequestPrefixFormatError}
class app_App{constructor(e,t,r,n){this.ready=!1
this.readyPermission=!1
this.readyCallbacks=[]
this.$globals={}
this.requestErrorHandlers={}
this.config=e
this.storage=new storage_Storage(e.storage)
this.language=new language_Language(this)
this.__routerInit(t,r)
u.a.use(c.a)
n&&n.forEach((function(e,t,r){u.a.use(e)}))}__routerInit(e,t){u.a.use(i.a)
t||(t={})
var r
if(!this.config.routerMode)throw new h.ConfigRouterModeError
r=this.config.routerMode
if(!e)throw new h.RoutesEmptyError
const n={mode:r,routes:e},o={...n,...t}
this.$router=new i.a(o)}loadModels(){this.ready=!0}run(e,t={}){u.a.use(o,{everflowApp:this})
var r
if(!this.config.mountId)throw new h.ConfigMountError
r=this.config.mountId
const n={router:this.$router,store:e}
Object.assign({},n,t)
const a={...n,...t}
new u.a(a).$mount("#"+r)
this.loadModels()}go(e,t={}){this.$router.push({name:e,params:t})}readyCallback(e){this.readyCallbacks.push(e)}}var m=r(7),g=r.n(m),_=r(0),v=_.Emit,y=_.Inject,b=_.Model,w=_.Prop,E=_.Provide,q=_.Watch,x={Component:g.a,Emit:v,Inject:y,Model:b,Prop:w,Provide:E,Watch:q},__decorate=function(e,t,r,n){var o,a=arguments.length,i=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n)
else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(a<3?o(i):a>3?o(t,r,i):o(t,r))||i)
return a>3&&i&&Object.defineProperty(t,r,i),i}
let P=class Page extends u.a{ready(){}}
P=__decorate([x.Component({})],P)
var M={$refs:"",created(){document.getElementById(this.$everflowApp.config.mountId).className+=` ${this.pageName}-everflow-page`},mounted(){this.$everflowApp.readyPermission=!0;(class page_PageHelper{static pageReady(e){isFunction(e.ready)&&e.ready()}}).pageReady(this)}},R=P.extend({mixins:[M]}),ready_decorate=function(e,t,r,n){var o,a=arguments.length,i=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n)
else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(a<3?o(i):a>3?o(t,r,i):o(t,r))||i)
return a>3&&i&&Object.defineProperty(t,r,i),i}
let T=class Ready extends u.a{ready(){}}
T=ready_decorate([x.Component({})],T)
var O={$refs:"",mounted:function(){isFunction(this.ready)&&this.ready()}},j=T.extend({mixins:[O]}),k=r(4),S=r.n(k)
class request_Request{constructor(e,t,r=!1){this.token=""
this.endPoint=""
this.authorize=!1
this.data=null
this.responseType="json"
this.headers={}
this.retries=0
this.maxTime=8e3
this.disableAllButtons=!1
this.everflowApp=e
this.token=this.everflowApp.bearerToken
this.endPoint=t
this.authorize=r}static multiple(e){return S.a.all(e)}static spread(e){return S.a.spread(e)}static getAxiosEngine(){return S.a}addHeader(e,t){this.headers[e]=t
return this}retry(e=3){this.retries=e
return this}disableAll(){this.disableAllButtons=!0
return this}timeout(e=8e3){this.maxTime=e
return this}get(){this.method="GET"
return this.build()}delete(e){this.method="DELETE"
e&&(this.data=e)
return this.build()}put(e){this.method="PUT"
this.data=e
return this.build()}post(e){this.method="POST"
this.data=e
return this.build()}patch(e){this.method="PATCH"
this.data=e
return this.build()}build(){var e=""
this.authorize&&this.addHeader("Authorization","Bearer "+this.token)
if(startsWith(this.endPoint.toLowerCase(),"http"))e=this.endPoint
else{if(this.everflowApp.config.debug){if(function(e,t,r){const{length:n}=e
r=void 0===r?n:+r
r<0||r!=r?r=0:r>n&&(r=n)
const o=r
r-=t.length
return r>=0&&e.slice(r,o)==t}(this.everflowApp.config.apiURL,"/"))throw new h.RequestBaseurlFormatError
if(!startsWith(this.endPoint,"/"))throw new h.RequestEndPointFormatError}e=this.everflowApp.config.apiURL+this.endPoint}var t={url:e,method:this.method,headers:this.headers,responseType:this.responseType,timeout:this.maxTime,data:JSON.stringify(this.data)},r=S.a.create(t)
var iRetryFunction=function(e){var n=e.response?e.response.status:e.request.status
t.retries=t.retries-1
return 500===n&&t.retries>0?r.request(t):Promise.reject(e)}
r.interceptors.response.use(void 0,iRetryFunction)
r.interceptors.request.use(void 0,iRetryFunction)
if(this.disableAllButtons){var disableAllButtonsFunction=function(e){for(var t=document.querySelectorAll("input[type=button], button[type=submit], button[type=button], input[type=submit]"),r=0,n=t.length;r<n;r++)t[r].disabled=e}
r.interceptors.request.use((function(e){disableAllButtonsFunction(!0)
return e}),(function(e){disableAllButtonsFunction(!1)
return Promise.reject(e)}))
r.interceptors.response.use((function(e){disableAllButtonsFunction(!1)
return e}),(function(e){disableAllButtonsFunction(!1)
return Promise.reject(e)}))}t.retries=this.retries
return r.request(t)}}var prototypes_prototypes=function(){String.prototype.contains=function(e){return-1!=this.toLowerCase().indexOf(e.toLowerCase())}
String.prototype.shorten=function(e,t){var r=this.length>e,n=r?this.substr(0,e-1):this
n=t&&r?n.substr(0,n.lastIndexOf(" ")):n
return r?n+"&hellip;":n}
String.prototype.toJson=function(){try{return JSON.parse(this)}catch(e){return{}}}
String.prototype.isEmpty=function(){return!this}
String.prototype.endsWith=function(e){return this.substr(-e.length).toLowerCase()===e.toLowerCase()}
Object.defineProperty(Array.prototype,"stringify",{enumerable:!1,value:function(){try{return JSON.stringify(this)}catch(e){return""}}})
Object.defineProperty(Object.prototype,"stringify",{enumerable:!1,value:function(){return JSON.stringify(this)}})
Object.defineProperty(Object.prototype,"getName",{value:function(){var e=/function (.{1,})\(/.exec(this.constructor.toString())
return e&&e.length>1?e[1]:""},enumerable:!1})}
class translator_Translator{static loadData(e,t){var r=e.language
return e.language.data[t][r.current]}static listKey(e){return e.split(".")}static convertProperty(e,t){var r=e[t]
if(r){var n=r.match(/trans\('([\w.]+)'\)/g)
for(var o in n){var a=n[o],i=a.match(/'([\w.]+)'/)[1]
e[t]=translator_Translator.trans(i)}}}static trans(e,t=null){var r=translator_Translator.listKey(t),n=translator_Translator.loadData(e,r[0])
delete r[0]
for(var o in r){var a=r[o]
isFunction(a)||(n=n[a])}return n}static convertPage(){for(var e=document.getElementsByTagName("*"),t=["placeholder","innerText","defaultValue"],r=0,n=e.length;r<n;r++)for(var o in t){var a=t[o],i=e[r]
a in i&&translator_Translator.convertProperty(i,a)}}}var D=r(8)
class Security{}Security.CryptoJS=D
var A=r(9)
class date_time_DateTime{static getDateFormat(e=null){var t=null
try{e.config
t=e.config.datetime.date.format}catch(e){t="YYYY-MM-DD"}return t}static getTimeFormat(e=null){var t=null
try{e.config
t=e.config.datetime.time.format}catch(e){t="LTS"}return t}static moment(e=null,t=null){t||(t=`${date_time_DateTime.getDateFormat()} ${date_time_DateTime.getTimeFormat()}`)
e||(e=new Date)
t||(t="MMMM Do YYYY, h:mm:ss a")
return A(e,t)}static date(e=null){return date_time_DateTime.moment(e).format(date_time_DateTime.getDateFormat())}static time(e=null){return date_time_DateTime.moment(e).format(date_time_DateTime.getTimeFormat())}}var C={Utils:p,Storage:storage_Storage,DateTime:date_time_DateTime,Language:language_Language}
var L={Model:Model,UserModel:class user_model_UserModel extends Model{constructor(){super(...arguments)
this.saveName="user"
this.token=null
this.firstname=""
this.lastname=""
this.email=""}}},N=r(5),F={documentTitleNavGaurd:(e,t,r)=>{document.title=e.meta.title
r()}}
t.default=o
prototypes_prototypes()}])}))

//# sourceMappingURL=everflow.js.map