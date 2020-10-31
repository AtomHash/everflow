!function webpackUniversalModuleDefinition(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("everflow",[],t):"object"==typeof exports?exports.everflow=t():e.everflow=t()}(self,(function(){return(()=>{var e={452:function(e,t,r){e.exports=function(e){!function(){var t=e,r=t.lib,n=r.BlockCipher,i=t.algo,o=[],s=[],a=[],c=[],u=[],l=[],h=[],f=[],d=[],p=[]
!function(){for(var e=[],t=0;t<256;t++)e[t]=t<128?t<<1:t<<1^283
var r=0,n=0
for(t=0;t<256;t++){var i=n^n<<1^n<<2^n<<3^n<<4
i=i>>>8^255&i^99
o[r]=i
s[i]=r
var y=e[r],g=e[y],v=e[g],_=257*e[i]^16843008*i
a[r]=_<<24|_>>>8
c[r]=_<<16|_>>>16
u[r]=_<<8|_>>>24
l[r]=_
_=16843009*v^65537*g^257*y^16843008*r
h[i]=_<<24|_>>>8
f[i]=_<<16|_>>>16
d[i]=_<<8|_>>>24
p[i]=_
if(r){r=y^e[e[e[v^y]]]
n^=e[e[n]]}else r=n=1}}()
var y=[0,1,2,4,8,16,32,64,128,27,54],g=i.AES=n.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var e=this._keyPriorReset=this._key,t=e.words,r=e.sigBytes/4,n=this._nRounds=r+6,i=4*(n+1),s=this._keySchedule=[],a=0;a<i;a++)if(a<r)s[a]=t[a]
else{l=s[a-1]
if(a%r)r>6&&a%r==4&&(l=o[l>>>24]<<24|o[l>>>16&255]<<16|o[l>>>8&255]<<8|o[255&l])
else{l=l<<8|l>>>24
l=o[l>>>24]<<24|o[l>>>16&255]<<16|o[l>>>8&255]<<8|o[255&l]
l^=y[a/r|0]<<24}s[a]=s[a-r]^l}for(var c=this._invKeySchedule=[],u=0;u<i;u++){a=i-u
if(u%4)var l=s[a]
else l=s[a-4]
c[u]=u<4||a<=4?l:h[o[l>>>24]]^f[o[l>>>16&255]]^d[o[l>>>8&255]]^p[o[255&l]]}}},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,a,c,u,l,o)},decryptBlock:function(e,t){var r=e[t+1]
e[t+1]=e[t+3]
e[t+3]=r
this._doCryptBlock(e,t,this._invKeySchedule,h,f,d,p,s)
r=e[t+1]
e[t+1]=e[t+3]
e[t+3]=r},_doCryptBlock:function(e,t,r,n,i,o,s,a){for(var c=this._nRounds,u=e[t]^r[0],l=e[t+1]^r[1],h=e[t+2]^r[2],f=e[t+3]^r[3],d=4,p=1;p<c;p++){var y=n[u>>>24]^i[l>>>16&255]^o[h>>>8&255]^s[255&f]^r[d++],g=n[l>>>24]^i[h>>>16&255]^o[f>>>8&255]^s[255&u]^r[d++],v=n[h>>>24]^i[f>>>16&255]^o[u>>>8&255]^s[255&l]^r[d++],_=n[f>>>24]^i[u>>>16&255]^o[l>>>8&255]^s[255&h]^r[d++]
u=y
l=g
h=v
f=_}y=(a[u>>>24]<<24|a[l>>>16&255]<<16|a[h>>>8&255]<<8|a[255&f])^r[d++],g=(a[l>>>24]<<24|a[h>>>16&255]<<16|a[f>>>8&255]<<8|a[255&u])^r[d++],v=(a[h>>>24]<<24|a[f>>>16&255]<<16|a[u>>>8&255]<<8|a[255&l])^r[d++],_=(a[f>>>24]<<24|a[u>>>16&255]<<16|a[l>>>8&255]<<8|a[255&h])^r[d++]
e[t]=y
e[t+1]=g
e[t+2]=v
e[t+3]=_},keySize:8})
t.AES=n._createHelper(g)}()
return e.AES}(r(249),r(269),r(214),r(888),r(109))},109:function(e,t,r){e.exports=(n=r(249),r(888),void(n.lib.Cipher||function(e){var t=n,r=t.lib,i=r.Base,o=r.WordArray,s=r.BufferedBlockAlgorithm,a=t.enc,c=(a.Utf8,a.Base64),u=t.algo,l=u.EvpKDF,h=r.Cipher=s.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,r){this.cfg=this.cfg.extend(r)
this._xformMode=e
this._key=t
this.reset()},reset:function(){s.reset.call(this)
this._doReset()},process:function(e){this._append(e)
return this._process()},finalize:function(e){e&&this._append(e)
var t=this._doFinalize()
return t},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function selectCipherStrategy(e){return"string"==typeof e?k:w}return function(e){return{encrypt:function(t,r,n){return selectCipherStrategy(r).encrypt(e,t,r,n)},decrypt:function(t,r,n){return selectCipherStrategy(r).decrypt(e,t,r,n)}}}}()}),f=(r.StreamCipher=h.extend({_doFinalize:function(){var e=this._process(!0)
return e},blockSize:1}),t.mode={}),d=r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e
this._iv=t}}),p=f.CBC=function(){var t=d.extend()
t.Encryptor=t.extend({processBlock:function(e,t){var r=this._cipher,n=r.blockSize
xorBlock.call(this,e,t,n)
r.encryptBlock(e,t)
this._prevBlock=e.slice(t,t+n)}})
t.Decryptor=t.extend({processBlock:function(e,t){var r=this._cipher,n=r.blockSize,i=e.slice(t,t+n)
r.decryptBlock(e,t)
xorBlock.call(this,e,t,n)
this._prevBlock=i}})
function xorBlock(t,r,n){var i,o=this._iv
if(o){i=o
this._iv=e}else i=this._prevBlock
for(var s=0;s<n;s++)t[r+s]^=i[s]}return t}(),y=t.pad={},g=y.Pkcs7={pad:function(e,t){for(var r=4*t,n=r-e.sigBytes%r,i=n<<24|n<<16|n<<8|n,s=[],a=0;a<n;a+=4)s.push(i)
var c=o.create(s,n)
e.concat(c)},unpad:function(e){var t=255&e.words[e.sigBytes-1>>>2]
e.sigBytes-=t}},v=(r.BlockCipher=h.extend({cfg:h.cfg.extend({mode:p,padding:g}),reset:function(){var e
h.reset.call(this)
var t=this.cfg,r=t.iv,n=t.mode
if(this._xformMode==this._ENC_XFORM_MODE)e=n.createEncryptor
else{e=n.createDecryptor
this._minBufferSize=1}if(this._mode&&this._mode.__creator==e)this._mode.init(this,r&&r.words)
else{this._mode=e.call(n,this,r&&r.words)
this._mode.__creator=e}},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e,t=this.cfg.padding
if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize)
e=this._process(!0)}else{e=this._process(!0)
t.unpad(e)}return e},blockSize:4}),r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}})),_=t.format={},m=_.OpenSSL={stringify:function(e){var t,r=e.ciphertext,n=e.salt
t=n?o.create([1398893684,1701076831]).concat(n).concat(r):r
return t.toString(c)},parse:function(e){var t,r=c.parse(e),n=r.words
if(1398893684==n[0]&&1701076831==n[1]){t=o.create(n.slice(2,4))
n.splice(0,4)
r.sigBytes-=16}return v.create({ciphertext:r,salt:t})}},w=r.SerializableCipher=i.extend({cfg:i.extend({format:m}),encrypt:function(e,t,r,n){n=this.cfg.extend(n)
var i=e.createEncryptor(r,n),o=i.finalize(t),s=i.cfg
return v.create({ciphertext:o,key:r,iv:s.iv,algorithm:e,mode:s.mode,padding:s.padding,blockSize:e.blockSize,formatter:n.format})},decrypt:function(e,t,r,n){n=this.cfg.extend(n)
t=this._parse(t,n.format)
var i=e.createDecryptor(r,n).finalize(t.ciphertext)
return i},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),S=t.kdf={},b=S.OpenSSL={execute:function(e,t,r,n){n||(n=o.random(8))
var i=l.create({keySize:t+r}).compute(e,n),s=o.create(i.words.slice(t),4*r)
i.sigBytes=4*t
return v.create({key:i,iv:s,salt:n})}},k=r.PasswordBasedCipher=w.extend({cfg:w.cfg.extend({kdf:b}),encrypt:function(e,t,r,n){n=this.cfg.extend(n)
var i=n.kdf.execute(r,e.keySize,e.ivSize)
n.iv=i.iv
var o=w.encrypt.call(this,e,t,i.key,n)
o.mixIn(i)
return o},decrypt:function(e,t,r,n){n=this.cfg.extend(n)
t=this._parse(t,n.format)
var i=n.kdf.execute(r,e.keySize,e.ivSize,t.salt)
n.iv=i.iv
var o=w.decrypt.call(this,e,t,i.key,n)
return o}})}()))
var n},249:function(e,t,r){e.exports=(n=n||function(e,t){var n
"undefined"!=typeof window&&window.crypto&&(n=window.crypto)
!n&&"undefined"!=typeof window&&window.msCrypto&&(n=window.msCrypto)
!n&&void 0!==r.g&&r.g.crypto&&(n=r.g.crypto)
if(!n)try{n=r(Object(function webpackMissingModule(){var e=new Error("Cannot find module 'crypto'")
e.code="MODULE_NOT_FOUND"
throw e}()))}catch(e){}var cryptoSecureRandomInt=function(){if(n){if("function"==typeof n.getRandomValues)try{return n.getRandomValues(new Uint32Array(1))[0]}catch(e){}if("function"==typeof n.randomBytes)try{return n.randomBytes(4).readInt32LE()}catch(e){}}throw new Error("Native crypto module could not be used to get secure random number.")},i=Object.create||function(){function F(){}return function(e){var t
F.prototype=e
t=new F
F.prototype=null
return t}}(),o={},s=o.lib={},a=s.Base={extend:function(e){var t=i(this)
e&&t.mixIn(e)
t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)})
t.init.prototype=t
t.$super=this
return t},create:function(){var e=this.extend()
e.init.apply(e,arguments)
return e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t])
e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},c=s.WordArray=a.extend({init:function(e,r){e=this.words=e||[]
this.sigBytes=r!=t?r:4*e.length},toString:function(e){return(e||l).stringify(this)},concat:function(e){var t=this.words,r=e.words,n=this.sigBytes,i=e.sigBytes
this.clamp()
if(n%4)for(var o=0;o<i;o++){var s=r[o>>>2]>>>24-o%4*8&255
t[n+o>>>2]|=s<<24-(n+o)%4*8}else for(o=0;o<i;o+=4)t[n+o>>>2]=r[o>>>2]
this.sigBytes+=i
return this},clamp:function(){var t=this.words,r=this.sigBytes
t[r>>>2]&=4294967295<<32-r%4*8
t.length=e.ceil(r/4)},clone:function(){var e=a.clone.call(this)
e.words=this.words.slice(0)
return e},random:function(e){for(var t=[],r=0;r<e;r+=4)t.push(cryptoSecureRandomInt())
return new c.init(t,e)}}),u=o.enc={},l=u.Hex={stringify:function(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255
n.push((o>>>4).toString(16))
n.push((15&o).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,r=[],n=0;n<t;n+=2)r[n>>>3]|=parseInt(e.substr(n,2),16)<<24-n%8*4
return new c.init(r,t/2)}},h=u.Latin1={stringify:function(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255
n.push(String.fromCharCode(o))}return n.join("")},parse:function(e){for(var t=e.length,r=[],n=0;n<t;n++)r[n>>>2]|=(255&e.charCodeAt(n))<<24-n%4*8
return new c.init(r,t)}},f=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(h.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(e){return h.parse(unescape(encodeURIComponent(e)))}},d=s.BufferedBlockAlgorithm=a.extend({reset:function(){this._data=new c.init
this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=f.parse(e))
this._data.concat(e)
this._nDataBytes+=e.sigBytes},_process:function(t){var r,n=this._data,i=n.words,o=n.sigBytes,s=this.blockSize,a=4*s,u=o/a
u=t?e.ceil(u):e.max((0|u)-this._minBufferSize,0)
var l=u*s,h=e.min(4*l,o)
if(l){for(var f=0;f<l;f+=s)this._doProcessBlock(i,f)
r=i.splice(0,l)
n.sigBytes-=h}return new c.init(r,h)},clone:function(){var e=a.clone.call(this)
e._data=this._data.clone()
return e},_minBufferSize:0}),p=(s.Hasher=d.extend({cfg:a.extend(),init:function(e){this.cfg=this.cfg.extend(e)
this.reset()},reset:function(){d.reset.call(this)
this._doReset()},update:function(e){this._append(e)
this._process()
return this},finalize:function(e){e&&this._append(e)
var t=this._doFinalize()
return t},blockSize:16,_createHelper:function(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function(e){return function(t,r){return new p.HMAC.init(e,r).finalize(t)}}}),o.algo={})
return o}(Math),n)
var n},269:function(e,t,r){e.exports=function(e){!function(){var t=e,r=t.lib,n=r.WordArray,i=t.enc
i.Base64={stringify:function(e){var t=e.words,r=e.sigBytes,n=this._map
e.clamp()
for(var i=[],o=0;o<r;o+=3)for(var s=t[o>>>2]>>>24-o%4*8&255,a=t[o+1>>>2]>>>24-(o+1)%4*8&255,c=t[o+2>>>2]>>>24-(o+2)%4*8&255,u=s<<16|a<<8|c,l=0;l<4&&o+.75*l<r;l++)i.push(n.charAt(u>>>6*(3-l)&63))
var h=n.charAt(64)
if(h)for(;i.length%4;)i.push(h)
return i.join("")},parse:function(e){var t=e.length,r=this._map,n=this._reverseMap
if(!n){n=this._reverseMap=[]
for(var i=0;i<r.length;i++)n[r.charCodeAt(i)]=i}var o=r.charAt(64)
if(o){var s=e.indexOf(o);-1!==s&&(t=s)}return parseLoop(e,t,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}
function parseLoop(e,t,r){for(var i=[],o=0,s=0;s<t;s++)if(s%4){var a=r[e.charCodeAt(s-1)]<<s%4*2,c=r[e.charCodeAt(s)]>>>6-s%4*2,u=a|c
i[o>>>2]|=u<<24-o%4*8
o++}return n.create(i,o)}}()
return e.enc.Base64}(r(249))},743:function(e,t,r){e.exports=(n=r(249),n.enc.Utf8)
var n},888:function(e,t,r){e.exports=function(e){t=e,r=t.lib,n=r.Base,i=r.WordArray,o=t.algo,s=o.MD5,a=o.EvpKDF=n.extend({cfg:n.extend({keySize:4,hasher:s,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var r,n=this.cfg,o=n.hasher.create(),s=i.create(),a=s.words,c=n.keySize,u=n.iterations;a.length<c;){r&&o.update(r)
r=o.update(e).finalize(t)
o.reset()
for(var l=1;l<u;l++){r=o.finalize(r)
o.reset()}s.concat(r)}s.sigBytes=4*c
return s}}),t.EvpKDF=function(e,t,r){return a.create(r).compute(e,t)}
var t,r,n,i,o,s,a
return e.EvpKDF}(r(249),r(783),r(824))},824:function(e,t,r){e.exports=(n=r(249),void(i=n,o=i.lib,s=o.Base,a=i.enc,c=a.Utf8,u=i.algo,u.HMAC=s.extend({init:function(e,t){e=this._hasher=new e.init
"string"==typeof t&&(t=c.parse(t))
var r=e.blockSize,n=4*r
t.sigBytes>n&&(t=e.finalize(t))
t.clamp()
for(var i=this._oKey=t.clone(),o=this._iKey=t.clone(),s=i.words,a=o.words,u=0;u<r;u++){s[u]^=1549556828
a[u]^=909522486}i.sigBytes=o.sigBytes=n
this.reset()},reset:function(){var e=this._hasher
e.reset()
e.update(this._iKey)},update:function(e){this._hasher.update(e)
return this},finalize:function(e){var t=this._hasher,r=t.finalize(e)
t.reset()
var n=t.finalize(this._oKey.clone().concat(r))
return n}})))
var n,i,o,s,a,c,u},214:function(e,t,r){e.exports=function(e){!function(t){var r=e,n=r.lib,i=n.WordArray,o=n.Hasher,s=r.algo,a=[]
!function(){for(var e=0;e<64;e++)a[e]=4294967296*t.abs(t.sin(e+1))|0}()
var c=s.MD5=o.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var r=0;r<16;r++){var n=t+r,i=e[n]
e[n]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var o=this._hash.words,s=e[t+0],c=e[t+1],u=e[t+2],l=e[t+3],h=e[t+4],f=e[t+5],d=e[t+6],p=e[t+7],y=e[t+8],g=e[t+9],v=e[t+10],_=e[t+11],m=e[t+12],w=e[t+13],S=e[t+14],b=e[t+15],k=o[0],x=o[1],E=o[2],B=o[3]
k=FF(k,x,E,B,s,7,a[0])
B=FF(B,k,x,E,c,12,a[1])
E=FF(E,B,k,x,u,17,a[2])
x=FF(x,E,B,k,l,22,a[3])
k=FF(k,x,E,B,h,7,a[4])
B=FF(B,k,x,E,f,12,a[5])
E=FF(E,B,k,x,d,17,a[6])
x=FF(x,E,B,k,p,22,a[7])
k=FF(k,x,E,B,y,7,a[8])
B=FF(B,k,x,E,g,12,a[9])
E=FF(E,B,k,x,v,17,a[10])
x=FF(x,E,B,k,_,22,a[11])
k=FF(k,x,E,B,m,7,a[12])
B=FF(B,k,x,E,w,12,a[13])
E=FF(E,B,k,x,S,17,a[14])
x=FF(x,E,B,k,b,22,a[15])
k=GG(k,x,E,B,c,5,a[16])
B=GG(B,k,x,E,d,9,a[17])
E=GG(E,B,k,x,_,14,a[18])
x=GG(x,E,B,k,s,20,a[19])
k=GG(k,x,E,B,f,5,a[20])
B=GG(B,k,x,E,v,9,a[21])
E=GG(E,B,k,x,b,14,a[22])
x=GG(x,E,B,k,h,20,a[23])
k=GG(k,x,E,B,g,5,a[24])
B=GG(B,k,x,E,S,9,a[25])
E=GG(E,B,k,x,l,14,a[26])
x=GG(x,E,B,k,y,20,a[27])
k=GG(k,x,E,B,w,5,a[28])
B=GG(B,k,x,E,u,9,a[29])
E=GG(E,B,k,x,p,14,a[30])
x=GG(x,E,B,k,m,20,a[31])
k=HH(k,x,E,B,f,4,a[32])
B=HH(B,k,x,E,y,11,a[33])
E=HH(E,B,k,x,_,16,a[34])
x=HH(x,E,B,k,S,23,a[35])
k=HH(k,x,E,B,c,4,a[36])
B=HH(B,k,x,E,h,11,a[37])
E=HH(E,B,k,x,p,16,a[38])
x=HH(x,E,B,k,v,23,a[39])
k=HH(k,x,E,B,w,4,a[40])
B=HH(B,k,x,E,s,11,a[41])
E=HH(E,B,k,x,l,16,a[42])
x=HH(x,E,B,k,d,23,a[43])
k=HH(k,x,E,B,g,4,a[44])
B=HH(B,k,x,E,m,11,a[45])
E=HH(E,B,k,x,b,16,a[46])
x=HH(x,E,B,k,u,23,a[47])
k=II(k,x,E,B,s,6,a[48])
B=II(B,k,x,E,p,10,a[49])
E=II(E,B,k,x,S,15,a[50])
x=II(x,E,B,k,f,21,a[51])
k=II(k,x,E,B,m,6,a[52])
B=II(B,k,x,E,l,10,a[53])
E=II(E,B,k,x,v,15,a[54])
x=II(x,E,B,k,c,21,a[55])
k=II(k,x,E,B,y,6,a[56])
B=II(B,k,x,E,b,10,a[57])
E=II(E,B,k,x,d,15,a[58])
x=II(x,E,B,k,w,21,a[59])
k=II(k,x,E,B,h,6,a[60])
B=II(B,k,x,E,_,10,a[61])
E=II(E,B,k,x,u,15,a[62])
x=II(x,E,B,k,g,21,a[63])
o[0]=o[0]+k|0
o[1]=o[1]+x|0
o[2]=o[2]+E|0
o[3]=o[3]+B|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,i=8*e.sigBytes
r[i>>>5]|=128<<24-i%32
var o=t.floor(n/4294967296),s=n
r[15+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8)
r[14+(i+64>>>9<<4)]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)
e.sigBytes=4*(r.length+1)
this._process()
for(var a=this._hash,c=a.words,u=0;u<4;u++){var l=c[u]
c[u]=16711935&(l<<8|l>>>24)|4278255360&(l<<24|l>>>8)}return a},clone:function(){var e=o.clone.call(this)
e._hash=this._hash.clone()
return e}})
function FF(e,t,r,n,i,o,s){var a=e+(t&r|~t&n)+i+s
return(a<<o|a>>>32-o)+t}function GG(e,t,r,n,i,o,s){var a=e+(t&n|r&~n)+i+s
return(a<<o|a>>>32-o)+t}function HH(e,t,r,n,i,o,s){var a=e+(t^r^n)+i+s
return(a<<o|a>>>32-o)+t}function II(e,t,r,n,i,o,s){var a=e+(r^(t|~n))+i+s
return(a<<o|a>>>32-o)+t}r.MD5=o._createHelper(c)
r.HmacMD5=o._createHmacHelper(c)}(Math)
return e.MD5}(r(249))},783:function(e,t,r){e.exports=function(e){!function(){var t=e,r=t.lib,n=r.WordArray,i=r.Hasher,o=t.algo,s=[],a=o.SHA1=i.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],a=r[3],c=r[4],u=0;u<80;u++){if(u<16)s[u]=0|e[t+u]
else{var l=s[u-3]^s[u-8]^s[u-14]^s[u-16]
s[u]=l<<1|l>>>31}var h=(n<<5|n>>>27)+c+s[u]
h+=u<20?1518500249+(i&o|~i&a):u<40?1859775393+(i^o^a):u<60?(i&o|i&a|o&a)-1894007588:(i^o^a)-899497514
c=a
a=o
o=i<<30|i>>>2
i=n
n=h}r[0]=r[0]+n|0
r[1]=r[1]+i|0
r[2]=r[2]+o|0
r[3]=r[3]+a|0
r[4]=r[4]+c|0},_doFinalize:function(){var e=this._data,t=e.words,r=8*this._nDataBytes,n=8*e.sigBytes
t[n>>>5]|=128<<24-n%32
t[14+(n+64>>>9<<4)]=Math.floor(r/4294967296)
t[15+(n+64>>>9<<4)]=r
e.sigBytes=4*t.length
this._process()
return this._hash},clone:function(){var e=i.clone.call(this)
e._hash=this._hash.clone()
return e}})
t.SHA1=i._createHelper(a)
t.HmacSHA1=i._createHmacHelper(a)}()
return e.SHA1}(r(249))},153:function(e,t,r){e.exports=function(e){!function(t){var r=e,n=r.lib,i=n.WordArray,o=n.Hasher,s=r.algo,a=[],c=[]
!function(){function isPrime(e){for(var r=t.sqrt(e),n=2;n<=r;n++)if(!(e%n))return!1
return!0}function getFractionalBits(e){return 4294967296*(e-(0|e))|0}for(var e=2,r=0;r<64;){if(isPrime(e)){r<8&&(a[r]=getFractionalBits(t.pow(e,.5)))
c[r]=getFractionalBits(t.pow(e,1/3))
r++}e++}}()
var u=[],l=s.SHA256=o.extend({_doReset:function(){this._hash=new i.init(a.slice(0))},_doProcessBlock:function(e,t){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],s=r[3],a=r[4],l=r[5],h=r[6],f=r[7],d=0;d<64;d++){if(d<16)u[d]=0|e[t+d]
else{var p=u[d-15],y=(p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3,g=u[d-2],v=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10
u[d]=y+u[d-7]+v+u[d-16]}var _=a&l^~a&h,m=n&i^n&o^i&o,w=(n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22),S=(a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25),b=f+S+_+c[d]+u[d],k=w+m
f=h
h=l
l=a
a=s+b|0
s=o
o=i
i=n
n=b+k|0}r[0]=r[0]+n|0
r[1]=r[1]+i|0
r[2]=r[2]+o|0
r[3]=r[3]+s|0
r[4]=r[4]+a|0
r[5]=r[5]+l|0
r[6]=r[6]+h|0
r[7]=r[7]+f|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,i=8*e.sigBytes
r[i>>>5]|=128<<24-i%32
r[14+(i+64>>>9<<4)]=t.floor(n/4294967296)
r[15+(i+64>>>9<<4)]=n
e.sigBytes=4*r.length
this._process()
return this._hash},clone:function(){var e=o.clone.call(this)
e._hash=this._hash.clone()
return e}})
r.SHA256=o._createHelper(l)
r.HmacSHA256=o._createHmacHelper(l)}(Math)
return e.SHA256}(r(249))},944:(e,t,r)=>{"use strict"
r.r(t)
r.d(t,{App:()=>App,EverflowPluginOptions:()=>EverflowPluginOptions,Language:()=>Language,Page:()=>A,ReadyComponent:()=>q,Request:()=>Request,Security:()=>Security,VueRouter:()=>a(),decorators:()=>R,default:()=>Q,interfaces:()=>n,models:()=>V,navigationGuards:()=>J,utils:()=>X})
var n={}
r.r(n)
const i={install(e,t){e.prototype.$app=t.everflowApp}}
class EverflowPluginOptions{}const o=i,s=require("vue-router")
var a=r.n(s)
const c=require("vue")
var u=r.n(c)
const l=require("vuex")
var h=r.n(l)
const f=require("vue-i18n")
var d=r.n(f)
const p=require("localforage"),y={online:navigator.onLine,removeHtml:e=>e.replace(/<\/?[^>]+(>|$)/g,""),microTime(){var e=(new Date).getTime(),t=Math.floor(e/1e3)
return t},tagTester:e=>function(t){return toString.call(t)==="[object "+e+"]"}},isFunction=function(e){return"function"==typeof e},startsWith=function(e,t,r=null){const{length:n}=e
r=null==r?0:r
r<0?r=0:r>n&&(r=n)
t=""+t
return e.slice(r,r+t.length)==t},g=y
class Storage{constructor(e){var t={driver:[p.INDEXEDDB,p.WEBSQL,p.LOCALSTORAGE],name:"everflow-db",storeName:"default",size:4980736},r={...t,...e}
p.config(r)}set(e,t,r,n){p.setItem(e,t).then((function(e){isFunction(r)&&r(e)})).catch((function(e){isFunction(n)&&n(e)}))}get(e,t){p.getItem(e,t)}remove(e,t=null){t?p.removeItem(e,t):p.removeItem(e)}}const v=require("axios")
var _=r.n(v)
class ConfigRouterModeError extends Error{constructor(){super('App.config.routerMode missing. Must be "hash", "history" or "abstract"')}}class ConfigMountError extends Error{constructor(){super("Cannot find mountId in config file")}}class RoutesEmptyError extends Error{constructor(){super("Routes passed to App.run([]) cannot be blank")}}class RequestEndPointFormatError extends Error{constructor(){super("Request endpoint error. Make sure a / is on all routes.")}}class RequestBaseurlFormatError extends Error{constructor(){super("Request apiURL in evconfig.json format error. Make sure the apiURL in the config does not end with a /")}}class RequestPrefixFormatError extends Error{constructor(){super("Request prefix error. Make sure prefix starts with a / and does NOT end with a /")}}class ConfigSecurityKeyError extends Error{constructor(){super('App.config.security is missing. Please add {"security": {"key": "<aes-key-string-format>"}} to your evconfig.json')}}class config_security_key_error_ConfigSecurityKeyError extends Error{constructor(){super('App.config.security.key is missing. Please add "key": "<aes-key-string-format>" under security in the evconfig.json.')}}const m={ConfigSecurityError:ConfigSecurityKeyError,ConfigSecurityKeyError:config_security_key_error_ConfigSecurityKeyError,ConfigRouterModeError,ConfigMountError,RoutesEmptyError,RequestEndPointFormatError,RequestBaseurlFormatError,RequestPrefixFormatError}
class Request{constructor(e,t="",r=!1){this.bearerToken=""
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
this.authorize=r}static multiple(e){return _().all(e)}static spread(e){return _().spread(e)}static getAxiosEngine(){return _()}auth(e){this.authorize=e
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
else{if(function(e,t,r){const{length:n}=e
r=void 0===r?n:+r
r<0||r!=r?r=0:r>n&&(r=n)
const i=r
r-=t.length
return r>=0&&e.slice(r,i)==t}(this.everflowAPIURL,"/"))throw new m.RequestBaseurlFormatError
if(!startsWith(this.endPoint,"/"))throw new m.RequestEndPointFormatError
e=this.everflowAPIURL+this.endPoint}var t={url:e,method:this.method,headers:this.headers,responseType:this.responseType,timeout:this.maxTime,data:JSON.stringify(this.data)},r=_().create(t)
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
return r.request(t)}}class Language{constructor(e,t){this.locale=e=>Language.loadLanguageAsync(this.i18n,e)
let r=e.config.i18n.defaultLocale,n=e.config.i18n.fallbackLocale
r&&"user"===r&&(r=navigator.language.split("-")[0])
this.i18n=new(d())({locale:r,fallbackLocale:n,messages:t})}static setLocale(e,t){e.locale=t
_().defaults.headers.common["Accept-Language"]=t
if(document.querySelector("html")){const e=document.querySelector("html")
e.setAttribute("lang",t)}}static async loadLanguageAsync(e,t="en"){if(e.locale===t)return Promise.resolve()
if(Language.loadedLanguages.includes(t)){Language.setLocale(e,t)
return Promise.resolve()}return await _().get(`/i18n/${t}.json`).then((function(r){e.setLocaleMessage(t,r.data[t])
Language.loadedLanguages.push(t)
return Language.setLocale(e,t)}))}}Language.loadedLanguages=["en"]
class App{constructor(e,t){this.ready=!1
this.readyPermission=!1
this.readyCallbacks=[]
this.$globals={}
this.requestErrorHandlers={}
t.routerOptions||(t.routerOptions={})
t.vuePlugins||(t.vuePlugins=[])
this.config=e
this.storage=new Storage(e.storage)
this.__routerInit(t.routes,t.routerOptions)
u().use(h())
if(t.defaultLocaleMessages){u().use(d())
this.language=new Language(this,t.defaultLocaleMessages)}t.vuePlugins&&t.vuePlugins.forEach((function(e,t,r){u().use(e)}))}__routerInit(e,t){u().use(a())
t||(t={})
var r
if(!this.config.routerMode)throw new m.ConfigRouterModeError
r=this.config.routerMode
if(!e)throw new m.RoutesEmptyError
const n={mode:r,routes:e},i={...n,...t}
this.$router=new(a())(i)}loadReadyCallbacks(){for(let e of this.readyCallbacks)e(this)
this.ready=!0}run(e,t={}){this.request=new Request(this.config.apiURL)
u().use(o,{everflowApp:this})
var r
if(!this.config.mountId)throw new m.ConfigMountError
r=this.config.mountId
const n={router:this.$router,store:e}
this.language&&(n.i18n=this.language.i18n)
Object.assign({},n,t)
const i={...n,...t}
new(u())(i).$mount("#"+r)
this.loadReadyCallbacks()}go(e,t={}){this.$router.push({name:e,params:t})}readyCallback(e){this.readyCallbacks.push(e)}}const w=require("vue-class-component")
var S=r.n(w)
const b=require("vue-property-decorator"),k=b.Emit,x=b.Inject,E=b.Model,B=b.Prop,H=b.Provide,M=b.Watch,R={Component:S(),Emit:k,Inject:x,Model:E,Prop:B,Provide:H,Watch:M}
var __decorate=function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s)
return o>3&&s&&Object.defineProperty(t,r,s),s}
let C=class Page extends(u()){ready(){}}
C=__decorate([R.Component({})],C)
var P={$refs:"",created(){},mounted(){this.$app.readyPermission=!0;(class PageHelper{static pageReady(e){isFunction(e.ready)&&e.ready()}}).pageReady(this)}}
const A=C.extend({mixins:[P]})
var ready_component_decorate=function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s)
return o>3&&s&&Object.defineProperty(t,r,s),s}
let I=class ReadyComponent extends(u()){ready(){}}
I=ready_component_decorate([R.Component({})],I)
var D={$refs:"",mounted:function(){isFunction(this.ready)&&this.ready()}}
const q=I.extend({mixins:[D]})
var z=r(153),O=r.n(z),L=r(269),T=r.n(L),G=r(743),j=r.n(G),U=r(214),N=r.n(U),K=r(452),$=r.n(K)
class Security{constructor(e){if(!e.config.security)throw new m.ConfigSecurityError
if(!e.config.security.key)throw new m.ConfigSecurityKeyError
this.key=e.config.security.key}encrypt(e){return Security.simple.aes.encrypt(e,this.key)}decrypt(e){return Security.simple.aes.decrypt(e,this.key)}}Security.hashes={sha256:O(),md5:N()}
Security.encoders={base64:T(),utf8:j()}
Security.decoders={base64:T(),utf8:j()}
Security.AES=$()
Security.simple={base64:{encode:e=>Security.encoders.base64.stringify(Security.encoders.utf8.parse(e)),decode:e=>Security.encoders.base64.parse(e).toString(Security.encoders.utf8)},aes:{encrypt(e,t){try{return encodeURIComponent(Security.simple.base64.encode(Security.AES.encrypt(e,t).toString()))}catch(e){return!1}},decrypt(e,t){try{return Security.AES.decrypt(Security.simple.base64.decode(decodeURIComponent(e)),t).toString(Security.encoders.utf8)}catch(e){return!1}}}}
const W=require("moment")
var Y=r.n(W)
class DateTime{static getDateFormat(e=null){var t=null
try{t=e.config.datetime.date.format}catch(e){t="YYYY-MM-DD"}return t}static getTimeFormat(e=null){var t=null
try{t=e.config.datetime.time.format}catch(e){t="LTS"}return t}static moment(e=null,t=null){t||(t=`${DateTime.getDateFormat()} ${DateTime.getTimeFormat()}`)
e||(e=new Date)
t||(t="MMMM Do YYYY, h:mm:ss a")
return Y()(e,t)}static date(e=null){return DateTime.moment(e).format(DateTime.getDateFormat())}static time(e=null){return DateTime.moment(e).format(DateTime.getTimeFormat())}}const X={Utils:g,Storage,DateTime}
class Model{constructor(e){this.saveName="defaultModel"
this.__storage=null
this.__storage=e}map(e){var t=this
Object.keys(e).map((function(r,n){r in t&&(t[r]=e[r])}))}save(e=null,t=null,r=this.__storage){r.set(this.saveName,this,e,t)}load(e,t=this.__storage){var r=this
t.get(this.saveName,(function(t,n){n&&r.map(n)
e&&new e(r,n)}))}delete(e=null,t=this.__storage){t.remove(this.saveName,(function(){e&&new e}))}}const V={Model,UserModel:class UserModel extends Model{constructor(){super(...arguments)
this.saveName="user"
this.token=null
this.firstname=""
this.lastname=""
this.email=""}}},J={documentTitleNavGaurd:(e,t,r)=>{document.title=e.meta.title
r()}},Q=o}},t={}
function __webpack_require__(r){if(t[r])return t[r].exports
var n=t[r]={exports:{}}
e[r].call(n.exports,n,n.exports,__webpack_require__)
return n.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e
__webpack_require__.d(t,{a:t})
return t}
__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}
__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis
try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}()
__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)
__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})
Object.defineProperty(e,"__esModule",{value:!0})}
return __webpack_require__(944)})()}))
