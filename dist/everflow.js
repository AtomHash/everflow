!function webpackUniversalModuleDefinition(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("everflow",[],t):"object"==typeof exports?exports.everflow=t():e.everflow=t()}(window,(function(){return function(e){var t={}
function __webpack_require__(r){if(t[r])return t[r].exports
var i=t[r]={i:r,l:!1,exports:{}}
e[r].call(i.exports,i,i.exports,__webpack_require__)
i.l=!0
return i.exports}__webpack_require__.m=e
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
if(2&t&&"string"!=typeof e)for(var i in e)__webpack_require__.d(r,i,function(t){return e[t]}.bind(null,i))
return r}
__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e}
__webpack_require__.d(t,"a",t)
return t}
__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}
__webpack_require__.p="/"
return __webpack_require__(__webpack_require__.s=17)}([function(e,t){e.exports=require("vue-property-decorator")},function(e,t){e.exports=require("vue")},function(e,t,r){(function(t){e.exports=(i=i||function(e,i){var n
"undefined"!=typeof window&&window.crypto&&(n=window.crypto)
!n&&"undefined"!=typeof window&&window.msCrypto&&(n=window.msCrypto)
!n&&void 0!==t&&t.crypto&&(n=t.crypto)
if(!n)try{n=r(19)}catch(e){}var cryptoSecureRandomInt=function(){if(n){if("function"==typeof n.getRandomValues)try{return n.getRandomValues(new Uint32Array(1))[0]}catch(e){}if("function"==typeof n.randomBytes)try{return n.randomBytes(4).readInt32LE()}catch(e){}}throw new Error("Native crypto module could not be used to get secure random number.")},s=Object.create||function(){function F(){}return function(e){var t
F.prototype=e
t=new F
F.prototype=null
return t}}(),o={},a=o.lib={},c=a.Base={extend:function(e){var t=s(this)
e&&t.mixIn(e)
t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)})
t.init.prototype=t
t.$super=this
return t},create:function(){var e=this.extend()
e.init.apply(e,arguments)
return e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t])
e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},u=a.WordArray=c.extend({init:function(e,t){e=this.words=e||[]
this.sigBytes=null!=t?t:4*e.length},toString:function(e){return(e||f).stringify(this)},concat:function(e){var t=this.words,r=e.words,i=this.sigBytes,n=e.sigBytes
this.clamp()
if(i%4)for(var s=0;s<n;s++){var o=r[s>>>2]>>>24-s%4*8&255
t[i+s>>>2]|=o<<24-(i+s)%4*8}else for(s=0;s<n;s+=4)t[i+s>>>2]=r[s>>>2]
this.sigBytes+=n
return this},clamp:function(){var t=this.words,r=this.sigBytes
t[r>>>2]&=4294967295<<32-r%4*8
t.length=e.ceil(r/4)},clone:function(){var e=c.clone.call(this)
e.words=this.words.slice(0)
return e},random:function(e){for(var t=[],r=0;r<e;r+=4)t.push(cryptoSecureRandomInt())
return new u.init(t,e)}}),h=o.enc={},f=h.Hex={stringify:function(e){for(var t=e.words,r=e.sigBytes,i=[],n=0;n<r;n++){var s=t[n>>>2]>>>24-n%4*8&255
i.push((s>>>4).toString(16))
i.push((15&s).toString(16))}return i.join("")},parse:function(e){for(var t=e.length,r=[],i=0;i<t;i+=2)r[i>>>3]|=parseInt(e.substr(i,2),16)<<24-i%8*4
return new u.init(r,t/2)}},d=h.Latin1={stringify:function(e){for(var t=e.words,r=e.sigBytes,i=[],n=0;n<r;n++){var s=t[n>>>2]>>>24-n%4*8&255
i.push(String.fromCharCode(s))}return i.join("")},parse:function(e){for(var t=e.length,r=[],i=0;i<t;i++)r[i>>>2]|=(255&e.charCodeAt(i))<<24-i%4*8
return new u.init(r,t)}},l=h.Utf8={stringify:function(e){try{return decodeURIComponent(escape(d.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(e){return d.parse(unescape(encodeURIComponent(e)))}},p=a.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new u.init
this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e))
this._data.concat(e)
this._nDataBytes+=e.sigBytes},_process:function(t){var r,i=this._data,n=i.words,s=i.sigBytes,o=this.blockSize,a=4*o,c=s/a
c=t?e.ceil(c):e.max((0|c)-this._minBufferSize,0)
var h=c*o,f=e.min(4*h,s)
if(h){for(var d=0;d<h;d+=o)this._doProcessBlock(n,d)
r=n.splice(0,h)
i.sigBytes-=f}return new u.init(r,f)},clone:function(){var e=c.clone.call(this)
e._data=this._data.clone()
return e},_minBufferSize:0}),_=(a.Hasher=p.extend({cfg:c.extend(),init:function(e){this.cfg=this.cfg.extend(e)
this.reset()},reset:function(){p.reset.call(this)
this._doReset()},update:function(e){this._append(e)
this._process()
return this},finalize:function(e){e&&this._append(e)
var t=this._doFinalize()
return t},blockSize:16,_createHelper:function(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function(e){return function(t,r){return new _.HMAC.init(e,r).finalize(t)}}}),o.algo={})
return o}(Math),i)
var i}).call(this,r(18))},function(e,t){e.exports=require("localforage")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("vue-router")},function(e,t){e.exports=require("vue-i18n")},function(e,t,r){e.exports=function(e){t=e,r=t.lib,i=r.WordArray,n=t.enc,n.Base64={stringify:function(e){var t=e.words,r=e.sigBytes,i=this._map
e.clamp()
for(var n=[],s=0;s<r;s+=3)for(var o=t[s>>>2]>>>24-s%4*8&255,a=t[s+1>>>2]>>>24-(s+1)%4*8&255,c=t[s+2>>>2]>>>24-(s+2)%4*8&255,u=o<<16|a<<8|c,h=0;h<4&&s+.75*h<r;h++)n.push(i.charAt(u>>>6*(3-h)&63))
var f=i.charAt(64)
if(f)for(;n.length%4;)n.push(f)
return n.join("")},parse:function(e){var t=e.length,r=this._map,n=this._reverseMap
if(!n){n=this._reverseMap=[]
for(var s=0;s<r.length;s++)n[r.charCodeAt(s)]=s}var o=r.charAt(64)
if(o){var a=e.indexOf(o);-1!==a&&(t=a)}return function parseLoop(e,t,r){for(var n=[],s=0,o=0;o<t;o++)if(o%4){var a=r[e.charCodeAt(o-1)]<<o%4*2,c=r[e.charCodeAt(o)]>>>6-o%4*2,u=a|c
n[s>>>2]|=u<<24-s%4*8
s++}return i.create(n,s)}(e,t,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}
var t,r,i,n
return e.enc.Base64}(r(2))},function(e,t,r){e.exports=function(e){!function(t){var r=e,i=r.lib,n=i.WordArray,s=i.Hasher,o=r.algo,a=[]
!function(){for(var e=0;e<64;e++)a[e]=4294967296*t.abs(t.sin(e+1))|0}()
var c=o.MD5=s.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var r=0;r<16;r++){var i=t+r,n=e[i]
e[i]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8)}var s=this._hash.words,o=e[t+0],c=e[t+1],u=e[t+2],h=e[t+3],f=e[t+4],d=e[t+5],l=e[t+6],p=e[t+7],_=e[t+8],g=e[t+9],y=e[t+10],m=e[t+11],v=e[t+12],S=e[t+13],w=e[t+14],E=e[t+15],b=s[0],x=s[1],A=s[2],H=s[3]
b=FF(b,x,A,H,o,7,a[0])
H=FF(H,b,x,A,c,12,a[1])
A=FF(A,H,b,x,u,17,a[2])
x=FF(x,A,H,b,h,22,a[3])
b=FF(b,x,A,H,f,7,a[4])
H=FF(H,b,x,A,d,12,a[5])
A=FF(A,H,b,x,l,17,a[6])
x=FF(x,A,H,b,p,22,a[7])
b=FF(b,x,A,H,_,7,a[8])
H=FF(H,b,x,A,g,12,a[9])
A=FF(A,H,b,x,y,17,a[10])
x=FF(x,A,H,b,m,22,a[11])
b=FF(b,x,A,H,v,7,a[12])
H=FF(H,b,x,A,S,12,a[13])
A=FF(A,H,b,x,w,17,a[14])
x=FF(x,A,H,b,E,22,a[15])
b=GG(b,x,A,H,c,5,a[16])
H=GG(H,b,x,A,l,9,a[17])
A=GG(A,H,b,x,m,14,a[18])
x=GG(x,A,H,b,o,20,a[19])
b=GG(b,x,A,H,d,5,a[20])
H=GG(H,b,x,A,y,9,a[21])
A=GG(A,H,b,x,E,14,a[22])
x=GG(x,A,H,b,f,20,a[23])
b=GG(b,x,A,H,g,5,a[24])
H=GG(H,b,x,A,w,9,a[25])
A=GG(A,H,b,x,h,14,a[26])
x=GG(x,A,H,b,_,20,a[27])
b=GG(b,x,A,H,S,5,a[28])
H=GG(H,b,x,A,u,9,a[29])
A=GG(A,H,b,x,p,14,a[30])
x=GG(x,A,H,b,v,20,a[31])
b=HH(b,x,A,H,d,4,a[32])
H=HH(H,b,x,A,_,11,a[33])
A=HH(A,H,b,x,m,16,a[34])
x=HH(x,A,H,b,w,23,a[35])
b=HH(b,x,A,H,c,4,a[36])
H=HH(H,b,x,A,f,11,a[37])
A=HH(A,H,b,x,p,16,a[38])
x=HH(x,A,H,b,y,23,a[39])
b=HH(b,x,A,H,S,4,a[40])
H=HH(H,b,x,A,o,11,a[41])
A=HH(A,H,b,x,h,16,a[42])
x=HH(x,A,H,b,l,23,a[43])
b=HH(b,x,A,H,g,4,a[44])
H=HH(H,b,x,A,v,11,a[45])
A=HH(A,H,b,x,E,16,a[46])
x=HH(x,A,H,b,u,23,a[47])
b=II(b,x,A,H,o,6,a[48])
H=II(H,b,x,A,p,10,a[49])
A=II(A,H,b,x,w,15,a[50])
x=II(x,A,H,b,d,21,a[51])
b=II(b,x,A,H,v,6,a[52])
H=II(H,b,x,A,h,10,a[53])
A=II(A,H,b,x,y,15,a[54])
x=II(x,A,H,b,c,21,a[55])
b=II(b,x,A,H,_,6,a[56])
H=II(H,b,x,A,E,10,a[57])
A=II(A,H,b,x,l,15,a[58])
x=II(x,A,H,b,S,21,a[59])
b=II(b,x,A,H,f,6,a[60])
H=II(H,b,x,A,m,10,a[61])
A=II(A,H,b,x,u,15,a[62])
x=II(x,A,H,b,g,21,a[63])
s[0]=s[0]+b|0
s[1]=s[1]+x|0
s[2]=s[2]+A|0
s[3]=s[3]+H|0},_doFinalize:function(){var e=this._data,r=e.words,i=8*this._nDataBytes,n=8*e.sigBytes
r[n>>>5]|=128<<24-n%32
var s=t.floor(i/4294967296),o=i
r[15+(n+64>>>9<<4)]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)
r[14+(n+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8)
e.sigBytes=4*(r.length+1)
this._process()
for(var a=this._hash,c=a.words,u=0;u<4;u++){var h=c[u]
c[u]=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8)}return a},clone:function(){var e=s.clone.call(this)
e._hash=this._hash.clone()
return e}})
function FF(e,t,r,i,n,s,o){var a=e+(t&r|~t&i)+n+o
return(a<<s|a>>>32-s)+t}function GG(e,t,r,i,n,s,o){var a=e+(t&i|r&~i)+n+o
return(a<<s|a>>>32-s)+t}function HH(e,t,r,i,n,s,o){var a=e+(t^r^i)+n+o
return(a<<s|a>>>32-s)+t}function II(e,t,r,i,n,s,o){var a=e+(r^(t|~i))+n+o
return(a<<s|a>>>32-s)+t}r.MD5=s._createHelper(c)
r.HmacMD5=s._createHmacHelper(c)}(Math)
return e.MD5}(r(2))},function(e,t,r){e.exports=(i=r(2),i.enc.Utf8)
var i},function(e,t,r){e.exports=function(e){t=e,r=t.lib,i=r.Base,n=r.WordArray,s=t.algo,o=s.MD5,a=s.EvpKDF=i.extend({cfg:i.extend({keySize:4,hasher:o,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var r,i=this.cfg,s=i.hasher.create(),o=n.create(),a=o.words,c=i.keySize,u=i.iterations;a.length<c;){r&&s.update(r)
r=s.update(e).finalize(t)
s.reset()
for(var h=1;h<u;h++){r=s.finalize(r)
s.reset()}o.concat(r)}o.sigBytes=4*c
return o}}),t.EvpKDF=function(e,t,r){return a.create(r).compute(e,t)}
var t,r,i,n,s,o,a
return e.EvpKDF}(r(2),r(32),r(33))},function(e,t){},function(e,t){e.exports=require("vuex")},function(e,t){e.exports=require("vue-class-component")},function(e,t,r){e.exports=function(e){!function(t){var r=e,i=r.lib,n=i.WordArray,s=i.Hasher,o=r.algo,a=[],c=[]
!function(){function isPrime(e){for(var r=t.sqrt(e),i=2;i<=r;i++)if(!(e%i))return!1
return!0}function getFractionalBits(e){return 4294967296*(e-(0|e))|0}for(var e=2,r=0;r<64;){if(isPrime(e)){r<8&&(a[r]=getFractionalBits(t.pow(e,.5)))
c[r]=getFractionalBits(t.pow(e,1/3))
r++}e++}}()
var u=[],h=o.SHA256=s.extend({_doReset:function(){this._hash=new n.init(a.slice(0))},_doProcessBlock:function(e,t){for(var r=this._hash.words,i=r[0],n=r[1],s=r[2],o=r[3],a=r[4],h=r[5],f=r[6],d=r[7],l=0;l<64;l++){if(l<16)u[l]=0|e[t+l]
else{var p=u[l-15],_=(p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3,g=u[l-2],y=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10
u[l]=_+u[l-7]+y+u[l-16]}var m=a&h^~a&f,v=i&n^i&s^n&s,S=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),w=(a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25),E=d+w+m+c[l]+u[l],b=S+v
d=f
f=h
h=a
a=o+E|0
o=s
s=n
n=i
i=E+b|0}r[0]=r[0]+i|0
r[1]=r[1]+n|0
r[2]=r[2]+s|0
r[3]=r[3]+o|0
r[4]=r[4]+a|0
r[5]=r[5]+h|0
r[6]=r[6]+f|0
r[7]=r[7]+d|0},_doFinalize:function(){var e=this._data,r=e.words,i=8*this._nDataBytes,n=8*e.sigBytes
r[n>>>5]|=128<<24-n%32
r[14+(n+64>>>9<<4)]=t.floor(i/4294967296)
r[15+(n+64>>>9<<4)]=i
e.sigBytes=4*r.length
this._process()
return this._hash},clone:function(){var e=s.clone.call(this)
e._hash=this._hash.clone()
return e}})
r.SHA256=s._createHelper(h)
r.HmacSHA256=s._createHmacHelper(h)}(Math)
return e.SHA256}(r(2))},function(e,t,r){e.exports=function(e){!function(){var t=e,r=t.lib,i=r.BlockCipher,n=t.algo,s=[],o=[],a=[],c=[],u=[],h=[],f=[],d=[],l=[],p=[]
!function(){for(var e=[],t=0;t<256;t++)e[t]=t<128?t<<1:t<<1^283
var r=0,i=0
for(t=0;t<256;t++){var n=i^i<<1^i<<2^i<<3^i<<4
n=n>>>8^255&n^99
s[r]=n
o[n]=r
var _=e[r],g=e[_],y=e[g],m=257*e[n]^16843008*n
a[r]=m<<24|m>>>8
c[r]=m<<16|m>>>16
u[r]=m<<8|m>>>24
h[r]=m
m=16843009*y^65537*g^257*_^16843008*r
f[n]=m<<24|m>>>8
d[n]=m<<16|m>>>16
l[n]=m<<8|m>>>24
p[n]=m
if(r){r=_^e[e[e[y^_]]]
i^=e[e[i]]}else r=i=1}}()
var _=[0,1,2,4,8,16,32,64,128,27,54],g=n.AES=i.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var e=this._keyPriorReset=this._key,t=e.words,r=e.sigBytes/4,i=this._nRounds=r+6,n=4*(i+1),o=this._keySchedule=[],a=0;a<n;a++)if(a<r)o[a]=t[a]
else{h=o[a-1]
if(a%r)r>6&&a%r==4&&(h=s[h>>>24]<<24|s[h>>>16&255]<<16|s[h>>>8&255]<<8|s[255&h])
else{h=h<<8|h>>>24
h=s[h>>>24]<<24|s[h>>>16&255]<<16|s[h>>>8&255]<<8|s[255&h]
h^=_[a/r|0]<<24}o[a]=o[a-r]^h}for(var c=this._invKeySchedule=[],u=0;u<n;u++){a=n-u
if(u%4)var h=o[a]
else h=o[a-4]
c[u]=u<4||a<=4?h:f[s[h>>>24]]^d[s[h>>>16&255]]^l[s[h>>>8&255]]^p[s[255&h]]}}},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,a,c,u,h,s)},decryptBlock:function(e,t){var r=e[t+1]
e[t+1]=e[t+3]
e[t+3]=r
this._doCryptBlock(e,t,this._invKeySchedule,f,d,l,p,o)
r=e[t+1]
e[t+1]=e[t+3]
e[t+3]=r},_doCryptBlock:function(e,t,r,i,n,s,o,a){for(var c=this._nRounds,u=e[t]^r[0],h=e[t+1]^r[1],f=e[t+2]^r[2],d=e[t+3]^r[3],l=4,p=1;p<c;p++){var _=i[u>>>24]^n[h>>>16&255]^s[f>>>8&255]^o[255&d]^r[l++],g=i[h>>>24]^n[f>>>16&255]^s[d>>>8&255]^o[255&u]^r[l++],y=i[f>>>24]^n[d>>>16&255]^s[u>>>8&255]^o[255&h]^r[l++],m=i[d>>>24]^n[u>>>16&255]^s[h>>>8&255]^o[255&f]^r[l++]
u=_
h=g
f=y
d=m}_=(a[u>>>24]<<24|a[h>>>16&255]<<16|a[f>>>8&255]<<8|a[255&d])^r[l++],g=(a[h>>>24]<<24|a[f>>>16&255]<<16|a[d>>>8&255]<<8|a[255&u])^r[l++],y=(a[f>>>24]<<24|a[d>>>16&255]<<16|a[u>>>8&255]<<8|a[255&h])^r[l++],m=(a[d>>>24]<<24|a[u>>>16&255]<<16|a[h>>>8&255]<<8|a[255&f])^r[l++]
e[t]=_
e[t+1]=g
e[t+2]=y
e[t+3]=m},keySize:8})
t.AES=i._createHelper(g)}()
return e.AES}(r(2),r(7),r(8),r(10),r(34))},function(e,t){e.exports=require("moment")},function(e,t,r){e.exports=r(35)},function(e,t){var r
r=function(){return this}()
try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict"
t.randomBytes=t.rng=t.pseudoRandomBytes=t.prng=r(20)
t.createHash=t.Hash=r(21)
t.createHmac=t.Hmac=r(22)
var i=r(23),n=Object.keys(i),s=["sha1","sha224","sha256","sha384","sha512","md5","rmd160"].concat(n)
t.getHashes=function(){return s}
var o=r(25)
t.pbkdf2=o.pbkdf2
t.pbkdf2Sync=o.pbkdf2Sync
var a=r(26)
t.Cipher=a.Cipher
t.createCipher=a.createCipher
t.Cipheriv=a.Cipheriv
t.createCipheriv=a.createCipheriv
t.Decipher=a.Decipher
t.createDecipher=a.createDecipher
t.Decipheriv=a.Decipheriv
t.createDecipheriv=a.createDecipheriv
t.getCiphers=a.getCiphers
t.listCiphers=a.listCiphers
var c=r(27)
t.DiffieHellmanGroup=c.DiffieHellmanGroup
t.createDiffieHellmanGroup=c.createDiffieHellmanGroup
t.getDiffieHellman=c.getDiffieHellman
t.createDiffieHellman=c.createDiffieHellman
t.DiffieHellman=c.DiffieHellman
var u=r(28)
t.createSign=u.createSign
t.Sign=u.Sign
t.createVerify=u.createVerify
t.Verify=u.Verify
t.createECDH=r(29)
var h=r(30)
t.publicEncrypt=h.publicEncrypt
t.privateEncrypt=h.privateEncrypt
t.publicDecrypt=h.publicDecrypt
t.privateDecrypt=h.privateDecrypt
var f=r(31)
t.randomFill=f.randomFill
t.randomFillSync=f.randomFillSync
t.createCredentials=function(){throw new Error(["sorry, createCredentials is not implemented yet","we accept pull requests","https://github.com/crypto-browserify/crypto-browserify"].join("\n"))}
t.constants={DH_CHECK_P_NOT_SAFE_PRIME:2,DH_CHECK_P_NOT_PRIME:1,DH_UNABLE_TO_CHECK_GENERATOR:4,DH_NOT_SUITABLE_GENERATOR:8,NPN_ENABLED:1,ALPN_ENABLED:1,RSA_PKCS1_PADDING:1,RSA_SSLV23_PADDING:2,RSA_NO_PADDING:3,RSA_PKCS1_OAEP_PADDING:4,RSA_X931_PADDING:5,RSA_PKCS1_PSS_PADDING:6,POINT_CONVERSION_COMPRESSED:2,POINT_CONVERSION_UNCOMPRESSED:4,POINT_CONVERSION_HYBRID:6}},function(e,t){e.exports=require("randombytes")},function(e,t){e.exports=require("create-hash")},function(e,t){e.exports=require("create-hmac")},function(e,t,r){e.exports=r(24)},function(e){e.exports=JSON.parse('{"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}')},function(e,t){e.exports=require("pbkdf2")},function(e,t){e.exports=require("browserify-cipher")},function(e,t){e.exports=require("diffie-hellman")},function(e,t){e.exports=require("browserify-sign")},function(e,t){e.exports=require("create-ecdh")},function(e,t){e.exports=require("public-encrypt")},function(e,t){e.exports=require("randomfill")},function(e,t,r){e.exports=function(e){!function(){var t=e,r=t.lib,i=r.WordArray,n=r.Hasher,s=t.algo,o=[],a=s.SHA1=n.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var r=this._hash.words,i=r[0],n=r[1],s=r[2],a=r[3],c=r[4],u=0;u<80;u++){if(u<16)o[u]=0|e[t+u]
else{var h=o[u-3]^o[u-8]^o[u-14]^o[u-16]
o[u]=h<<1|h>>>31}var f=(i<<5|i>>>27)+c+o[u]
f+=u<20?1518500249+(n&s|~n&a):u<40?1859775393+(n^s^a):u<60?(n&s|n&a|s&a)-1894007588:(n^s^a)-899497514
c=a
a=s
s=n<<30|n>>>2
n=i
i=f}r[0]=r[0]+i|0
r[1]=r[1]+n|0
r[2]=r[2]+s|0
r[3]=r[3]+a|0
r[4]=r[4]+c|0},_doFinalize:function(){var e=this._data,t=e.words,r=8*this._nDataBytes,i=8*e.sigBytes
t[i>>>5]|=128<<24-i%32
t[14+(i+64>>>9<<4)]=Math.floor(r/4294967296)
t[15+(i+64>>>9<<4)]=r
e.sigBytes=4*t.length
this._process()
return this._hash},clone:function(){var e=n.clone.call(this)
e._hash=this._hash.clone()
return e}})
t.SHA1=n._createHelper(a)
t.HmacSHA1=n._createHmacHelper(a)}()
return e.SHA1}(r(2))},function(e,t,r){e.exports=(i=r(2),void(n=i,s=n.lib,o=s.Base,a=n.enc,c=a.Utf8,u=n.algo,u.HMAC=o.extend({init:function(e,t){e=this._hasher=new e.init
"string"==typeof t&&(t=c.parse(t))
var r=e.blockSize,i=4*r
t.sigBytes>i&&(t=e.finalize(t))
t.clamp()
for(var n=this._oKey=t.clone(),s=this._iKey=t.clone(),o=n.words,a=s.words,u=0;u<r;u++){o[u]^=1549556828
a[u]^=909522486}n.sigBytes=s.sigBytes=i
this.reset()},reset:function(){var e=this._hasher
e.reset()
e.update(this._iKey)},update:function(e){this._hasher.update(e)
return this},finalize:function(e){var t=this._hasher,r=t.finalize(e)
t.reset()
var i=t.finalize(this._oKey.clone().concat(r))
return i}})))
var i,n,s,o,a,c,u},function(e,t,r){e.exports=(i=r(2),r(10),void(i.lib.Cipher||(n=i,s=n.lib,o=s.Base,a=s.WordArray,c=s.BufferedBlockAlgorithm,u=n.enc,h=(u.Utf8,u.Base64),f=n.algo,d=f.EvpKDF,l=s.Cipher=c.extend({cfg:o.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,r){this.cfg=this.cfg.extend(r)
this._xformMode=e
this._key=t
this.reset()},reset:function(){c.reset.call(this)
this._doReset()},process:function(e){this._append(e)
return this._process()},finalize:function(e){e&&this._append(e)
var t=this._doFinalize()
return t},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function selectCipherStrategy(e){return"string"==typeof e?A:E}return function(e){return{encrypt:function(t,r,i){return selectCipherStrategy(r).encrypt(e,t,r,i)},decrypt:function(t,r,i){return selectCipherStrategy(r).decrypt(e,t,r,i)}}}}()}),p=(s.StreamCipher=l.extend({_doFinalize:function(){var e=this._process(!0)
return e},blockSize:1}),n.mode={}),_=s.BlockCipherMode=o.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e
this._iv=t}}),g=p.CBC=function(){var e=_.extend()
e.Encryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize
xorBlock.call(this,e,t,i)
r.encryptBlock(e,t)
this._prevBlock=e.slice(t,t+i)}})
e.Decryptor=e.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,n=e.slice(t,t+i)
r.decryptBlock(e,t)
xorBlock.call(this,e,t,i)
this._prevBlock=n}})
function xorBlock(e,t,r){var i,n=this._iv
if(n){i=n
this._iv=void 0}else i=this._prevBlock
for(var s=0;s<r;s++)e[t+s]^=i[s]}return e}(),y=n.pad={},m=y.Pkcs7={pad:function(e,t){for(var r=4*t,i=r-e.sigBytes%r,n=i<<24|i<<16|i<<8|i,s=[],o=0;o<i;o+=4)s.push(n)
var c=a.create(s,i)
e.concat(c)},unpad:function(e){var t=255&e.words[e.sigBytes-1>>>2]
e.sigBytes-=t}},v=(s.BlockCipher=l.extend({cfg:l.cfg.extend({mode:g,padding:m}),reset:function(){var e
l.reset.call(this)
var t=this.cfg,r=t.iv,i=t.mode
if(this._xformMode==this._ENC_XFORM_MODE)e=i.createEncryptor
else{e=i.createDecryptor
this._minBufferSize=1}if(this._mode&&this._mode.__creator==e)this._mode.init(this,r&&r.words)
else{this._mode=e.call(i,this,r&&r.words)
this._mode.__creator=e}},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e,t=this.cfg.padding
if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize)
e=this._process(!0)}else{e=this._process(!0)
t.unpad(e)}return e},blockSize:4}),s.CipherParams=o.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}})),S=n.format={},w=S.OpenSSL={stringify:function(e){var t,r=e.ciphertext,i=e.salt
t=i?a.create([1398893684,1701076831]).concat(i).concat(r):r
return t.toString(h)},parse:function(e){var t,r=h.parse(e),i=r.words
if(1398893684==i[0]&&1701076831==i[1]){t=a.create(i.slice(2,4))
i.splice(0,4)
r.sigBytes-=16}return v.create({ciphertext:r,salt:t})}},E=s.SerializableCipher=o.extend({cfg:o.extend({format:w}),encrypt:function(e,t,r,i){i=this.cfg.extend(i)
var n=e.createEncryptor(r,i),s=n.finalize(t),o=n.cfg
return v.create({ciphertext:s,key:r,iv:o.iv,algorithm:e,mode:o.mode,padding:o.padding,blockSize:e.blockSize,formatter:i.format})},decrypt:function(e,t,r,i){i=this.cfg.extend(i)
t=this._parse(t,i.format)
var n=e.createDecryptor(r,i).finalize(t.ciphertext)
return n},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),b=n.kdf={},x=b.OpenSSL={execute:function(e,t,r,i){i||(i=a.random(8))
var n=d.create({keySize:t+r}).compute(e,i),s=a.create(n.words.slice(t),4*r)
n.sigBytes=4*t
return v.create({key:n,iv:s,salt:i})}},A=s.PasswordBasedCipher=E.extend({cfg:E.cfg.extend({kdf:x}),encrypt:function(e,t,r,i){i=this.cfg.extend(i)
var n=i.kdf.execute(r,e.keySize,e.ivSize)
i.iv=n.iv
var s=E.encrypt.call(this,e,t,n.key,i)
s.mixIn(n)
return s},decrypt:function(e,t,r,i){i=this.cfg.extend(i)
t=this._parse(t,i.format)
var n=i.kdf.execute(r,e.keySize,e.ivSize,t.salt)
i.iv=n.iv
var s=E.decrypt.call(this,e,t,n.key,i)
return s}}))))
var i,n,s,o,a,c,u,h,f,d,l,p,_,g,y,m,v,S,w,E,b,x,A},function(e,t,r){"use strict"
r.r(t)
r.d(t,"navigationGuards",(function(){return J}))
r.d(t,"EverflowPluginOptions",(function(){return EverflowPluginOptions}))
r.d(t,"VueRouter",(function(){return o.a}))
r.d(t,"App",(function(){return app_App}))
r.d(t,"Page",(function(){return C}))
r.d(t,"Ready",(function(){return M}))
r.d(t,"Request",(function(){return request_Request}))
r.d(t,"utils",(function(){return V}))
r.d(t,"models",(function(){return Y}))
r.d(t,"decorators",(function(){return D}))
r.d(t,"interfaces",(function(){return X}))
r.d(t,"Language",(function(){return language_Language}))
r.d(t,"Security",(function(){return security_Security}))
const i={install(e,t){e.prototype.$app=t.everflowApp}}
class EverflowPluginOptions{}var n=i,s=r(5),o=r.n(s),a=r(1),c=r.n(a),u=r(12),h=r.n(u),f=r(6),d=r.n(f),l=r(3)
const p={online:navigator.onLine,removeHtml:e=>e.replace(/<\/?[^>]+(>|$)/g,""),microTime(){var e=(new Date).getTime(),t=Math.floor(e/1e3)
return t},tagTester:e=>function(t){return toString.call(t)==="[object "+e+"]"}},isFunction=function(e){return"function"==typeof e},startsWith=function(e,t,r=null){const{length:i}=e
r=null==r?0:r
r<0?r=0:r>i&&(r=i)
t=""+t
return e.slice(r,r+t.length)==t}
var _=p
class storage_Storage{constructor(e){var t={driver:[l.INDEXEDDB,l.WEBSQL,l.LOCALSTORAGE],name:"everflow-db",storeName:"default",size:4980736},r={...t,...e}
l.config(r)}set(e,t,r,i){l.setItem(e,t).then((function(e){isFunction(r)&&r(e)})).catch((function(e){isFunction(i)&&i(e)}))}get(e,t){l.getItem(e,t)}remove(e,t=null){t?l.removeItem(e,t):l.removeItem(e)}}var g=r(4),y=r.n(g)
class ConfigRouterModeError extends Error{constructor(){super('App.config.routerMode missing. Must be "hash", "history" or "abstract"')}}class ConfigMountError extends Error{constructor(){super("Cannot find mountId in config file")}}class RoutesEmptyError extends Error{constructor(){super("Routes passed to App.run([]) cannot be blank")}}class RequestEndPointFormatError extends Error{constructor(){super("Request endpoint error. Make sure a / is on all routes.")}}class RequestBaseurlFormatError extends Error{constructor(){super("Request apiURL in evconfig.json format error. Make sure the apiURL in the config does not end with a /")}}class RequestPrefixFormatError extends Error{constructor(){super("Request prefix error. Make sure prefix starts with a / and does NOT end with a /")}}class ConfigSecurityKeyError extends Error{constructor(){super('App.config.security is missing. Please add {"security": {"key": "<aes-key-string-format>"}} to your evconfig.json')}}class config_security_key_error_ConfigSecurityKeyError extends Error{constructor(){super('App.config.security.key is missing. Please add "key": "<aes-key-string-format>" under security in the evconfig.json.')}}var m={ConfigSecurityError:ConfigSecurityKeyError,ConfigSecurityKeyError:config_security_key_error_ConfigSecurityKeyError,ConfigRouterModeError:ConfigRouterModeError,ConfigMountError:ConfigMountError,RoutesEmptyError:RoutesEmptyError,RequestEndPointFormatError:RequestEndPointFormatError,RequestBaseurlFormatError:RequestBaseurlFormatError,RequestPrefixFormatError:RequestPrefixFormatError}
class request_Request{constructor(e,t="",r=!1){this.bearerToken=""
this.endPoint=""
this.authorize=!1
this.data=null
this.responseType="json"
this.headers={}
this.retries=0
this.maxTime=8e3
this.disableAllButtons=!1
this.everflowAPIURL=e
this.endPoint=t
this.authorize=r}static multiple(e){return y.a.all(e)}static spread(e){return y.a.spread(e)}static getAxiosEngine(){return y.a}auth(e){this.authorize=e
return this}token(e){this.bearerToken=e
return this}url(e){this.endPoint=e
return this}addHeader(e,t){this.headers[e]=t
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
this.authorize&&this.addHeader("Authorization","Bearer "+this.bearerToken)
if(startsWith(this.endPoint.toLowerCase(),"http"))e=this.endPoint
else{if(function(e,t,r){const{length:i}=e
r=void 0===r?i:+r
r<0||r!=r?r=0:r>i&&(r=i)
const n=r
r-=t.length
return r>=0&&e.slice(r,n)==t}(this.everflowAPIURL,"/"))throw new m.RequestBaseurlFormatError
if(!startsWith(this.endPoint,"/"))throw new m.RequestEndPointFormatError
e=this.everflowAPIURL+this.endPoint}var t={url:e,method:this.method,headers:this.headers,responseType:this.responseType,timeout:this.maxTime,data:JSON.stringify(this.data)},r=y.a.create(t)
var iRetryFunction=function(e){var i=e.response?e.response.status:e.request.status
t.retries=t.retries-1
return 500===i&&t.retries>0?r.request(t):Promise.reject(e)}
r.interceptors.response.use(void 0,iRetryFunction)
r.interceptors.request.use(void 0,iRetryFunction)
if(this.disableAllButtons){var disableAllButtonsFunction=function(e){for(var t=document.querySelectorAll("input[type=button], button[type=submit], button[type=button], input[type=submit]"),r=0,i=t.length;r<i;r++)t[r].disabled=e}
r.interceptors.request.use((function(e){disableAllButtonsFunction(!0)
return e}),(function(e){disableAllButtonsFunction(!1)
return Promise.reject(e)}))
r.interceptors.response.use((function(e){disableAllButtonsFunction(!1)
return e}),(function(e){disableAllButtonsFunction(!1)
return Promise.reject(e)}))}t.retries=this.retries
return r.request(t)}}class language_Language{constructor(e,t){this.locale=e=>language_Language.loadLanguageAsync(this.i18n,e)
let r=e.config.i18n.defaultLocale,i=e.config.i18n.fallbackLocale
r&&"user"===r&&(r=navigator.language.split("-")[0])
this.i18n=new d.a({locale:r,fallbackLocale:i,messages:t})}static setLocale(e,t){e.locale=t
y.a.defaults.headers.common["Accept-Language"]=t
if(document.querySelector("html")){const e=document.querySelector("html")
e.setAttribute("lang",t)}}static async loadLanguageAsync(e,t="en"){if(e.locale===t)return Promise.resolve()
if(language_Language.loadedLanguages.includes(t)){language_Language.setLocale(e,t)
return Promise.resolve()}return await y.a.get(`/i18n/${t}.json`).then((function(r){e.setLocaleMessage(t,r.data[t])
language_Language.loadedLanguages.push(t)
return language_Language.setLocale(e,t)}))}}language_Language.loadedLanguages=["en"]
class app_App{constructor(e,t){this.ready=!1
this.readyPermission=!1
this.readyCallbacks=[]
this.$globals={}
this.requestErrorHandlers={}
t.routerOptions||(t.routerOptions={})
t.vuePlugins||(t.vuePlugins=[])
this.config=e
this.storage=new storage_Storage(e.storage)
this.__routerInit(t.routes,t.routerOptions)
c.a.use(h.a)
if(t.defaultI18nMessages){c.a.use(d.a)
this.language=new language_Language(this,t.defaultI18nMessages)}t.vuePlugins&&t.vuePlugins.forEach((function(e,t,r){c.a.use(e)}))}__routerInit(e,t){c.a.use(o.a)
t||(t={})
var r
if(!this.config.routerMode)throw new m.ConfigRouterModeError
r=this.config.routerMode
if(!e)throw new m.RoutesEmptyError
const i={mode:r,routes:e},n={...i,...t}
this.$router=new o.a(n)}loadReadyCallbacks(){for(let e of this.readyCallbacks)e(this)
this.ready=!0}run(e,t={}){this.request=new request_Request(this.config.apiURL)
c.a.use(n,{everflowApp:this})
var r
if(!this.config.mountId)throw new m.ConfigMountError
r=this.config.mountId
const i={router:this.$router,store:e}
this.language&&(i.i18n=this.language.i18n)
Object.assign({},i,t)
const s={...i,...t}
new c.a(s).$mount("#"+r)
this.loadReadyCallbacks()}go(e,t={}){this.$router.push({name:e,params:t})}readyCallback(e){this.readyCallbacks.push(e)}}var v=r(13),S=r.n(v),w=r(0),E=w.Emit,b=w.Inject,x=w.Model,A=w.Prop,H=w.Provide,k=w.Watch,D={Component:S.a,Emit:E,Inject:b,Model:x,Prop:A,Provide:H,Watch:k},__decorate=function(e,t,r,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i)
else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o)
return s>3&&o&&Object.defineProperty(t,r,o),o}
let R=class Page extends c.a{ready(){}}
R=__decorate([D.Component({})],R)
var B={$refs:"",created(){document.getElementById(this.$app.config.mountId).className+=` ${this.pageName}-everflow-page`},mounted(){this.$app.readyPermission=!0;(class page_PageHelper{static pageReady(e){isFunction(e.ready)&&e.ready()}}).pageReady(this)}},C=R.extend({mixins:[B]}),ready_decorate=function(e,t,r,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i)
else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o)
return s>3&&o&&Object.defineProperty(t,r,o),o}
let P=class Ready extends c.a{ready(){}}
P=ready_decorate([D.Component({})],P)
var I={$refs:"",mounted:function(){isFunction(this.ready)&&this.ready()}},M=P.extend({mixins:[I]}),q=r(14),O=r.n(q),G=r(7),T=r.n(G),z=r(9),L=r.n(z),N=r(8),j=r.n(N),U=r(15),K=r.n(U)
class security_Security{constructor(e){if(!e.config.security)throw new m.ConfigSecurityError
if(!e.config.security.key)throw new m.ConfigSecurityKeyError
this.key=e.config.security.key}encrypt(e){return security_Security.simple.aes.encrypt(e,this.key)}decrypt(e){return security_Security.simple.aes.decrypt(e,this.key)}}security_Security.hashes={sha256:O.a,md5:j.a}
security_Security.encoders={base64:T.a,utf8:L.a}
security_Security.decoders={base64:T.a,utf8:L.a}
security_Security.AES=K.a
security_Security.simple={base64:{encode:e=>security_Security.encoders.base64.stringify(security_Security.encoders.utf8.parse(e)),decode:e=>security_Security.encoders.base64.parse(e).toString(security_Security.encoders.utf8)},aes:{encrypt(e,t){try{return encodeURIComponent(security_Security.simple.base64.encode(security_Security.AES.encrypt(e,t).toString()))}catch(e){return!1}},decrypt(e,t){try{return security_Security.AES.decrypt(security_Security.simple.base64.decode(decodeURIComponent(e)),t).toString(security_Security.encoders.utf8)}catch(e){return!1}}}}
var W=r(16),$=r.n(W)
class date_time_DateTime{static getDateFormat(e=null){var t=null
try{t=e.config.datetime.date.format}catch(e){t="YYYY-MM-DD"}return t}static getTimeFormat(e=null){var t=null
try{t=e.config.datetime.time.format}catch(e){t="LTS"}return t}static moment(e=null,t=null){t||(t=`${date_time_DateTime.getDateFormat()} ${date_time_DateTime.getTimeFormat()}`)
e||(e=new Date)
t||(t="MMMM Do YYYY, h:mm:ss a")
return $()(e,t)}static date(e=null){return date_time_DateTime.moment(e).format(date_time_DateTime.getDateFormat())}static time(e=null){return date_time_DateTime.moment(e).format(date_time_DateTime.getTimeFormat())}}var V={Utils:_,Storage:storage_Storage,DateTime:date_time_DateTime}
class Model{constructor(e){this.saveName="defaultModel"
this.__storage=null
this.__storage=e}map(e){var t=this
Object.keys(e).map((function(r,i){r in t&&(t[r]=e[r])}))}save(e=null,t=null,r=this.__storage){r.set(this.saveName,this,e,t)}load(e,t=this.__storage){var r=this
t.get(this.saveName,(function(t,i){i&&r.map(i)
e&&new e(r,i)}))}delete(e=null,t=this.__storage){t.remove(this.saveName,(function(){e&&new e}))}}var Y={Model:Model,UserModel:class user_model_UserModel extends Model{constructor(){super(...arguments)
this.saveName="user"
this.token=null
this.firstname=""
this.lastname=""
this.email=""}}},X=r(11),J={documentTitleNavGaurd:(e,t,r)=>{document.title=e.meta.title
r()}}
t.default=n}])}))

//# sourceMappingURL=everflow.js.map