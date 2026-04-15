(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();class fo{constructor(){this.callbacks={},this.callbacks.base={}}on(e,t){return typeof e>"u"||e===""?(console.warn("wrong names"),!1):typeof t>"u"?(console.warn("wrong callback"),!1):(this.resolveNames(e).forEach(n=>{const s=this.resolveName(n);this.callbacks[s.namespace]instanceof Object||(this.callbacks[s.namespace]={}),this.callbacks[s.namespace][s.value]instanceof Array||(this.callbacks[s.namespace][s.value]=[]),this.callbacks[s.namespace][s.value].push(t)}),this)}off(e){return typeof e>"u"||e===""?(console.warn("wrong name"),!1):(this.resolveNames(e).forEach(i=>{const n=this.resolveName(i);if(n.namespace!=="base"&&n.value==="")delete this.callbacks[n.namespace];else if(n.namespace==="base")for(const s in this.callbacks)this.callbacks[s]instanceof Object&&this.callbacks[s][n.value]instanceof Array&&(delete this.callbacks[s][n.value],Object.keys(this.callbacks[s]).length===0&&delete this.callbacks[s]);else this.callbacks[n.namespace]instanceof Object&&this.callbacks[n.namespace][n.value]instanceof Array&&(delete this.callbacks[n.namespace][n.value],Object.keys(this.callbacks[n.namespace]).length===0&&delete this.callbacks[n.namespace])}),this)}trigger(e,t){if(typeof e>"u"||e==="")return console.warn("wrong name"),!1;let i=null;const n=t instanceof Array?t:[];let s=this.resolveNames(e);if(s=this.resolveName(s[0]),s.namespace==="base")for(const r in this.callbacks)this.callbacks[r]instanceof Object&&this.callbacks[r][s.value]instanceof Array&&this.callbacks[r][s.value].forEach(function(o){o.apply(this,n)});else if(this.callbacks[s.namespace]instanceof Object){if(s.value==="")return console.warn("wrong name"),this;this.callbacks[s.namespace][s.value].forEach(function(r){r.apply(this,n)})}return i}resolveNames(e){let t=e;return t=t.replace(/[^a-zA-Z0-9 ,/.]/g,""),t=t.replace(/[,/]+/g," "),t=t.split(" "),t}resolveName(e){const t={},i=e.split(".");return t.original=e,t.value=i[0],t.namespace="base",i.length>1&&i[1]!==""&&(t.namespace=i[1]),t}}/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ka="148",Gn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Hn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},xd=0,Dl=1,vd=2,Rh=1,Dh=2,$s=3,on=0,hi=1,po=2,Mr=3,nn=0,us=1,Il=2,kl=3,Nl=4,yd=5,rs=100,bd=101,Md=102,Ol=103,Fl=104,wd=200,Sd=201,Td=202,Ad=203,Ih=204,kh=205,Ed=206,Cd=207,Ld=208,Pd=209,Rd=210,Dd=0,Id=1,kd=2,ya=3,Nd=4,Od=5,Fd=6,Bd=7,Nh=0,zd=1,Ud=2,Vi=0,Vd=1,Gd=2,Hd=3,Wd=4,jd=5,Oh=300,_s=301,xs=302,ba=303,Ma=304,mo=306,vs=1e3,ri=1001,eo=1002,rt=1003,wa=1004,Yr=1005,St=1006,Fh=1007,Dn=1008,In=1009,Xd=1010,qd=1011,Bh=1012,Yd=1013,Sn=1014,Ji=1015,sr=1016,$d=1017,Kd=1018,ds=1020,Zd=1021,Jd=1022,oi=1023,Qd=1024,ef=1025,An=1026,ys=1027,tf=1028,nf=1029,sf=1030,rf=1031,of=1033,Ao=33776,Eo=33777,Co=33778,Lo=33779,Bl=35840,zl=35841,Ul=35842,Vl=35843,af=36196,Gl=37492,Hl=37496,Wl=37808,jl=37809,Xl=37810,ql=37811,Yl=37812,$l=37813,Kl=37814,Zl=37815,Jl=37816,Ql=37817,ec=37818,tc=37819,ic=37820,nc=37821,sc=36492,lf=2200,cf=2201,hf=2202,rr=2300,bs=2301,Po=2302,os=2400,as=2401,to=2402,Za=2500,uf=2501,df=1,zh=2,kn=3e3,Me=3001,ff=3200,pf=3201,Uh=0,mf=1,vi="srgb",or="srgb-linear",Ro=7680,gf=519,Sa=35044,rc="300 es",Ta=1035;class cn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const s=n.indexOf(t);s!==-1&&n.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let s=0,r=n.length;s<r;s++)n[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let oc=1234567;const Qs=Math.PI/180,ar=180/Math.PI;function gi(){const a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[a&255]+wt[a>>8&255]+wt[a>>16&255]+wt[a>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function Tt(a,e,t){return Math.max(e,Math.min(t,a))}function Ja(a,e){return(a%e+e)%e}function _f(a,e,t,i,n){return i+(a-e)*(n-i)/(t-e)}function xf(a,e,t){return a!==e?(t-a)/(e-a):0}function er(a,e,t){return(1-t)*a+t*e}function vf(a,e,t,i){return er(a,e,1-Math.exp(-t*i))}function yf(a,e=1){return e-Math.abs(Ja(a,e*2)-e)}function bf(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*(3-2*a))}function Mf(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*a*(a*(a*6-15)+10))}function wf(a,e){return a+Math.floor(Math.random()*(e-a+1))}function Sf(a,e){return a+Math.random()*(e-a)}function Tf(a){return a*(.5-Math.random())}function Af(a){a!==void 0&&(oc=a);let e=oc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ef(a){return a*Qs}function Cf(a){return a*ar}function Aa(a){return(a&a-1)===0&&a!==0}function Vh(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function io(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function Lf(a,e,t,i,n){const s=Math.cos,r=Math.sin,o=s(t/2),l=r(t/2),c=s((e+i)/2),h=r((e+i)/2),u=s((e-i)/2),d=r((e-i)/2),m=s((i-e)/2),g=r((i-e)/2);switch(n){case"XYX":a.set(o*h,l*u,l*d,o*c);break;case"YZY":a.set(l*d,o*h,l*u,o*c);break;case"ZXZ":a.set(l*u,l*d,o*h,o*c);break;case"XZX":a.set(o*h,l*g,l*m,o*c);break;case"YXY":a.set(l*m,o*h,l*g,o*c);break;case"ZYZ":a.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function zi(a,e){switch(e.constructor){case Float32Array:return a;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function je(a,e){switch(e.constructor){case Float32Array:return a;case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var Pf=Object.freeze({__proto__:null,DEG2RAD:Qs,RAD2DEG:ar,generateUUID:gi,clamp:Tt,euclideanModulo:Ja,mapLinear:_f,inverseLerp:xf,lerp:er,damp:vf,pingpong:yf,smoothstep:bf,smootherstep:Mf,randInt:wf,randFloat:Sf,randFloatSpread:Tf,seededRandom:Af,degToRad:Ef,radToDeg:Cf,isPowerOfTwo:Aa,ceilPowerOfTwo:Vh,floorPowerOfTwo:io,setQuaternionFromProperEuler:Lf,normalize:je,denormalize:zi});class ye{constructor(e=0,t=0){ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*n+e.x,this.y=s*n+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,i,n,s,r,o,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],m=i[5],g=i[8],f=n[0],p=n[3],_=n[6],b=n[1],v=n[4],M=n[7],y=n[2],A=n[5],C=n[8];return s[0]=r*f+o*b+l*y,s[3]=r*p+o*v+l*A,s[6]=r*_+o*M+l*C,s[1]=c*f+h*b+u*y,s[4]=c*p+h*v+u*A,s[7]=c*_+h*M+u*C,s[2]=d*f+m*b+g*y,s[5]=d*p+m*v+g*A,s[8]=d*_+m*M+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*o*c-i*s*h+i*o*l+n*s*c-n*r*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*r-o*c,d=o*l-h*s,m=c*s-r*l,g=t*u+i*d+n*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const f=1/g;return e[0]=u*f,e[1]=(n*c-h*i)*f,e[2]=(o*i-n*r)*f,e[3]=d*f,e[4]=(h*t-n*l)*f,e[5]=(n*s-o*t)*f,e[6]=m*f,e[7]=(i*l-c*t)*f,e[8]=(r*t-i*s)*f,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-n*c,n*l,-n*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Do.makeScale(e,t)),this}rotate(e){return this.premultiply(Do.makeRotation(-e)),this}translate(e,t){return this.premultiply(Do.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Do=new Yt;function Gh(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function lr(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function En(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function $r(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}const Io={[vi]:{[or]:En},[or]:{[vi]:$r}},Rt={legacyMode:!0,get workingColorSpace(){return or},set workingColorSpace(a){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(a,e,t){if(this.legacyMode||e===t||!e||!t)return a;if(Io[e]&&Io[e][t]!==void 0){const i=Io[e][t];return a.r=i(a.r),a.g=i(a.g),a.b=i(a.b),a}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(a,e){return this.convert(a,this.workingColorSpace,e)},toWorkingColorSpace:function(a,e){return this.convert(a,e,this.workingColorSpace)}},Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ct={r:0,g:0,b:0},di={h:0,s:0,l:0},wr={h:0,s:0,l:0};function ko(a,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?a+(e-a)*6*t:t<1/2?e:t<2/3?a+(e-a)*6*(2/3-t):a}function Sr(a,e){return e.r=a.r,e.g=a.g,e.b=a.b,e}class Te{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&i===void 0?this.set(e):this.setRGB(e,t,i)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=i,Rt.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=Rt.workingColorSpace){if(e=Ja(e,1),t=Tt(t,0,1),i=Tt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,r=2*i-s;this.r=ko(r,s,e+1/3),this.g=ko(r,s,e),this.b=ko(r,s,e-1/3)}return Rt.toWorkingColorSpace(this,n),this}setStyle(e,t=vi){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let s;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Rt.toWorkingColorSpace(this,t),i(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Rt.toWorkingColorSpace(this,t),i(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,h=parseFloat(s[3])/100;return i(s[4]),this.setHSL(l,c,h,t)}break}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=n[1],r=s.length;if(r===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Rt.toWorkingColorSpace(this,t),this;if(r===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Rt.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=vi){const i=Hh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=En(e.r),this.g=En(e.g),this.b=En(e.b),this}copyLinearToSRGB(e){return this.r=$r(e.r),this.g=$r(e.g),this.b=$r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vi){return Rt.fromWorkingColorSpace(Sr(this,ct),e),Tt(ct.r*255,0,255)<<16^Tt(ct.g*255,0,255)<<8^Tt(ct.b*255,0,255)<<0}getHexString(e=vi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.fromWorkingColorSpace(Sr(this,ct),t);const i=ct.r,n=ct.g,s=ct.b,r=Math.max(i,n,s),o=Math.min(i,n,s);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=h<=.5?u/(r+o):u/(2-r-o),r){case i:l=(n-s)/u+(n<s?6:0);break;case n:l=(s-i)/u+2;break;case s:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Rt.workingColorSpace){return Rt.fromWorkingColorSpace(Sr(this,ct),t),e.r=ct.r,e.g=ct.g,e.b=ct.b,e}getStyle(e=vi){return Rt.fromWorkingColorSpace(Sr(this,ct),e),e!==vi?`color(${e} ${ct.r} ${ct.g} ${ct.b})`:`rgb(${ct.r*255|0},${ct.g*255|0},${ct.b*255|0})`}offsetHSL(e,t,i){return this.getHSL(di),di.h+=e,di.s+=t,di.l+=i,this.setHSL(di.h,di.s,di.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(di),e.getHSL(wr);const i=er(di.h,wr.h,t),n=er(di.s,wr.s,t),s=er(di.l,wr.l,t);return this.setHSL(i,n,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Te.NAMES=Hh;let Wn;class Wh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Wn===void 0&&(Wn=lr("canvas")),Wn.width=e.width,Wn.height=e.height;const i=Wn.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Wn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=lr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),s=n.data;for(let r=0;r<s.length;r++)s[r]=En(s[r]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(En(t[i]/255)*255):t[i]=En(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class jh{constructor(e=null){this.isSource=!0,this.uuid=gi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let r=0,o=n.length;r<o;r++)n[r].isDataTexture?s.push(No(n[r].image)):s.push(No(n[r]))}else s=No(n);i.url=s}return t||(e.images[this.uuid]=i),i}}function No(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Wh.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rf=0;class _t extends cn{constructor(e=_t.DEFAULT_IMAGE,t=_t.DEFAULT_MAPPING,i=ri,n=ri,s=St,r=Dn,o=oi,l=In,c=_t.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=gi(),this.name="",this.source=new jh(e),this.mipmaps=[],this.mapping=t,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vs:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vs:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}_t.DEFAULT_IMAGE=null;_t.DEFAULT_MAPPING=Oh;_t.DEFAULT_ANISOTROPY=1;class qe{constructor(e=0,t=0,i=0,n=1){qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n+r[12]*s,this.y=r[1]*t+r[5]*i+r[9]*n+r[13]*s,this.z=r[2]*t+r[6]*i+r[10]*n+r[14]*s,this.w=r[3]*t+r[7]*i+r[11]*n+r[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],g=l[9],f=l[2],p=l[6],_=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-f)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+f)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,M=(m+1)/2,y=(_+1)/2,A=(h+d)/4,C=(u+f)/4,x=(g+p)/4;return v>M&&v>y?v<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(v),n=A/i,s=C/i):M>y?M<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(M),i=A/n,s=x/n):y<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(y),i=C/s,n=x/s),this.set(i,n,s,t),this}let b=Math.sqrt((p-g)*(p-g)+(u-f)*(u-f)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(u-f)/b,this.z=(d-h)/b,this.w=Math.acos((c+m+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nn extends cn{constructor(e=1,t=1,i={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new qe(0,0,e,t),this.scissorTest=!1,this.viewport=new qe(0,0,e,t);const n={width:e,height:t,depth:1};this.texture=new _t(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:St,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new jh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xh extends _t{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=rt,this.minFilter=rt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Df extends _t{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=rt,this.minFilter=rt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $t{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,s,r,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const d=s[r+0],m=s[r+1],g=s[r+2],f=s[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=g,e[t+3]=f;return}if(u!==f||l!==d||c!==m||h!==g){let p=1-o;const _=l*d+c*m+h*g+u*f,b=_>=0?1:-1,v=1-_*_;if(v>Number.EPSILON){const y=Math.sqrt(v),A=Math.atan2(y,_*b);p=Math.sin(p*A)/y,o=Math.sin(o*A)/y}const M=o*b;if(l=l*p+d*M,c=c*p+m*M,h=h*p+g*M,u=u*p+f*M,p===1-o){const y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,s,r){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=s[r],d=s[r+1],m=s[r+2],g=s[r+3];return e[t]=o*g+h*u+l*m-c*d,e[t+1]=l*g+h*d+c*u-o*m,e[t+2]=c*g+h*m+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,n=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(s/2),d=l(i/2),m=l(n/2),g=l(s/2);switch(r){case"XYZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"YXZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"ZXY":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"ZYX":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"YZX":this._x=d*h*u+c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u-d*m*g;break;case"XZY":this._x=d*h*u-c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],s=t[8],r=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(r-n)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(n+r)/m,this._z=(s+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(s-c)/m,this._x=(n+r)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(r-n)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,s=e._z,r=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+r*o+n*c-s*l,this._y=n*h+r*l+s*o-i*c,this._z=s*h+r*c+i*l-n*o,this._w=r*h-i*o-n*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,s=this._z,r=this._w;let o=r*e._w+i*e._x+n*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=n,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*r+t*this._w,this._x=m*i+t*this._x,this._y=m*n+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=r*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(s),i*Math.cos(s),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ac.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ac.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*n,this.y=s[1]*t+s[4]*i+s[7]*n,this.z=s[2]*t+s[5]*i+s[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=e.elements,r=1/(s[3]*t+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*n+s[12])*r,this.y=(s[1]*t+s[5]*i+s[9]*n+s[13])*r,this.z=(s[2]*t+s[6]*i+s[10]*n+s[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=l*t+r*n-o*i,h=l*i+o*t-s*n,u=l*n+s*i-r*t,d=-s*t-r*i-o*n;return this.x=c*l+d*-s+h*-o-u*-r,this.y=h*l+d*-r+u*-s-c*-o,this.z=u*l+d*-o+c*-r-h*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n,this.y=s[1]*t+s[5]*i+s[9]*n,this.z=s[2]*t+s[6]*i+s[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,s=e.z,r=t.x,o=t.y,l=t.z;return this.x=n*l-s*o,this.y=s*r-i*l,this.z=i*o-n*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Oo.copy(this).projectOnVector(e),this.sub(Oo)}reflect(e){return this.sub(Oo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Tt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oo=new P,ac=new $t;class Rs{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,i=1/0,n=1/0,s=-1/0,r=-1/0,o=-1/0;for(let l=0,c=e.length;l<c;l+=3){const h=e[l],u=e[l+1],d=e[l+2];h<t&&(t=h),u<i&&(i=u),d<n&&(n=d),h>s&&(s=h),u>r&&(r=u),d>o&&(o=d)}return this.min.set(t,i,n),this.max.set(s,r,o),this}setFromBufferAttribute(e){let t=1/0,i=1/0,n=1/0,s=-1/0,r=-1/0,o=-1/0;for(let l=0,c=e.count;l<c;l++){const h=e.getX(l),u=e.getY(l),d=e.getZ(l);h<t&&(t=h),u<i&&(i=u),d<n&&(n=d),h>s&&(s=h),u>r&&(r=u),d>o&&(o=d)}return this.min.set(t,i,n),this.max.set(s,r,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0)if(t&&i.attributes!=null&&i.attributes.position!==void 0){const s=i.attributes.position;for(let r=0,o=s.count;r<o;r++)mn.fromBufferAttribute(s,r).applyMatrix4(e.matrixWorld),this.expandByPoint(mn)}else i.boundingBox===null&&i.computeBoundingBox(),Fo.copy(i.boundingBox),Fo.applyMatrix4(e.matrixWorld),this.union(Fo);const n=e.children;for(let s=0,r=n.length;s<r;s++)this.expandByObject(n[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),Tr.subVectors(this.max,Fs),jn.subVectors(e.a,Fs),Xn.subVectors(e.b,Fs),qn.subVectors(e.c,Fs),ji.subVectors(Xn,jn),Xi.subVectors(qn,Xn),gn.subVectors(jn,qn);let t=[0,-ji.z,ji.y,0,-Xi.z,Xi.y,0,-gn.z,gn.y,ji.z,0,-ji.x,Xi.z,0,-Xi.x,gn.z,0,-gn.x,-ji.y,ji.x,0,-Xi.y,Xi.x,0,-gn.y,gn.x,0];return!Bo(t,jn,Xn,qn,Tr)||(t=[1,0,0,0,1,0,0,0,1],!Bo(t,jn,Xn,qn,Tr))?!1:(Ar.crossVectors(ji,Xi),t=[Ar.x,Ar.y,Ar.z],Bo(t,jn,Xn,qn,Tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return mn.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Pi=[new P,new P,new P,new P,new P,new P,new P,new P],mn=new P,Fo=new Rs,jn=new P,Xn=new P,qn=new P,ji=new P,Xi=new P,gn=new P,Fs=new P,Tr=new P,Ar=new P,_n=new P;function Bo(a,e,t,i,n){for(let s=0,r=a.length-3;s<=r;s+=3){_n.fromArray(a,s);const o=n.x*Math.abs(_n.x)+n.y*Math.abs(_n.y)+n.z*Math.abs(_n.z),l=e.dot(_n),c=t.dot(_n),h=i.dot(_n);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const If=new Rs,Bs=new P,zo=new P;class Ds{constructor(e=new P,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):If.setFromPoints(e).getCenter(i);let n=0;for(let s=0,r=e.length;s<r;s++)n=Math.max(n,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);const t=Bs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(Bs,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(zo)),this.expandByPoint(Bs.copy(e.center).sub(zo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ri=new P,Uo=new P,Er=new P,qi=new P,Vo=new P,Cr=new P,Go=new P;class go{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(i).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.direction).multiplyScalar(t).add(this.origin),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Uo.copy(e).add(t).multiplyScalar(.5),Er.copy(t).sub(e).normalize(),qi.copy(this.origin).sub(Uo);const s=e.distanceTo(t)*.5,r=-this.direction.dot(Er),o=qi.dot(this.direction),l=-qi.dot(Er),c=qi.lengthSq(),h=Math.abs(1-r*r);let u,d,m,g;if(h>0)if(u=r*l-o,d=r*o-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const f=1/h;u*=f,d*=f,m=u*(u+r*d+2*o)+d*(r*u+d+2*l)+c}else d=s,u=Math.max(0,-(r*d+o)),m=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(r*d+o)),m=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-r*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(u=Math.max(0,-(r*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+d*(d+2*l)+c);else d=r>0?-s:s,u=Math.max(0,-(r*d+o)),m=-u*u+d*(d+2*l)+c;return i&&i.copy(this.direction).multiplyScalar(u).add(this.origin),n&&n.copy(Er).multiplyScalar(d).add(Uo),m}intersectSphere(e,t){Ri.subVectors(e.center,this.origin);const i=Ri.dot(this.direction),n=Ri.dot(Ri)-i*i,s=e.radius*e.radius;if(n>s)return null;const r=Math.sqrt(s-n),o=i-r,l=i+r;return o<0&&l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,s,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),i>r||s>n||((s>i||isNaN(i))&&(i=s),(r<n||isNaN(n))&&(n=r),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,i,n,s){Vo.subVectors(t,e),Cr.subVectors(i,e),Go.crossVectors(Vo,Cr);let r=this.direction.dot(Go),o;if(r>0){if(n)return null;o=1}else if(r<0)o=-1,r=-r;else return null;qi.subVectors(this.origin,e);const l=o*this.direction.dot(Cr.crossVectors(qi,Cr));if(l<0)return null;const c=o*this.direction.dot(Vo.cross(qi));if(c<0||l+c>r)return null;const h=-o*qi.dot(Go);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ce{constructor(){Ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,i,n,s,r,o,l,c,h,u,d,m,g,f,p){const _=this.elements;return _[0]=e,_[4]=t,_[8]=i,_[12]=n,_[1]=s,_[5]=r,_[9]=o,_[13]=l,_[2]=c,_[6]=h,_[10]=u,_[14]=d,_[3]=m,_[7]=g,_[11]=f,_[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/Yn.setFromMatrixColumn(e,0).length(),s=1/Yn.setFromMatrixColumn(e,1).length(),r=1/Yn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=r*h,m=r*u,g=o*h,f=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+g*c,t[5]=d-f*c,t[9]=-o*l,t[2]=f-d*c,t[6]=g+m*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*h,m=l*u,g=c*h,f=c*u;t[0]=d+f*o,t[4]=g*o-m,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-o,t[2]=m*o-g,t[6]=f+d*o,t[10]=r*l}else if(e.order==="ZXY"){const d=l*h,m=l*u,g=c*h,f=c*u;t[0]=d-f*o,t[4]=-r*u,t[8]=g+m*o,t[1]=m+g*o,t[5]=r*h,t[9]=f-d*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const d=r*h,m=r*u,g=o*h,f=o*u;t[0]=l*h,t[4]=g*c-m,t[8]=d*c+f,t[1]=l*u,t[5]=f*c+d,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,m=r*c,g=o*l,f=o*c;t[0]=l*h,t[4]=f-d*u,t[8]=g*u+m,t[1]=u,t[5]=r*h,t[9]=-o*h,t[2]=-c*h,t[6]=m*u+g,t[10]=d-f*u}else if(e.order==="XZY"){const d=r*l,m=r*c,g=o*l,f=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+f,t[5]=r*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=o*h,t[10]=f*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kf,e,Nf)}lookAt(e,t,i){const n=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Yi.crossVectors(i,Wt),Yi.lengthSq()===0&&(Math.abs(i.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Yi.crossVectors(i,Wt)),Yi.normalize(),Lr.crossVectors(Wt,Yi),n[0]=Yi.x,n[4]=Lr.x,n[8]=Wt.x,n[1]=Yi.y,n[5]=Lr.y,n[9]=Wt.y,n[2]=Yi.z,n[6]=Lr.z,n[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],m=i[13],g=i[2],f=i[6],p=i[10],_=i[14],b=i[3],v=i[7],M=i[11],y=i[15],A=n[0],C=n[4],x=n[8],S=n[12],R=n[1],B=n[5],K=n[9],D=n[13],I=n[2],z=n[6],$=n[10],Y=n[14],U=n[3],ee=n[7],Z=n[11],V=n[15];return s[0]=r*A+o*R+l*I+c*U,s[4]=r*C+o*B+l*z+c*ee,s[8]=r*x+o*K+l*$+c*Z,s[12]=r*S+o*D+l*Y+c*V,s[1]=h*A+u*R+d*I+m*U,s[5]=h*C+u*B+d*z+m*ee,s[9]=h*x+u*K+d*$+m*Z,s[13]=h*S+u*D+d*Y+m*V,s[2]=g*A+f*R+p*I+_*U,s[6]=g*C+f*B+p*z+_*ee,s[10]=g*x+f*K+p*$+_*Z,s[14]=g*S+f*D+p*Y+_*V,s[3]=b*A+v*R+M*I+y*U,s[7]=b*C+v*B+M*z+y*ee,s[11]=b*x+v*K+M*$+y*Z,s[15]=b*S+v*D+M*Y+y*V,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],m=e[14],g=e[3],f=e[7],p=e[11],_=e[15];return g*(+s*l*u-n*c*u-s*o*d+i*c*d+n*o*m-i*l*m)+f*(+t*l*m-t*c*d+s*r*d-n*r*m+n*c*h-s*l*h)+p*(+t*c*u-t*o*m-s*r*u+i*r*m+s*o*h-i*c*h)+_*(-n*o*h-t*l*u+t*o*d+n*r*u-i*r*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],m=e[11],g=e[12],f=e[13],p=e[14],_=e[15],b=u*p*c-f*d*c+f*l*m-o*p*m-u*l*_+o*d*_,v=g*d*c-h*p*c-g*l*m+r*p*m+h*l*_-r*d*_,M=h*f*c-g*u*c+g*o*m-r*f*m-h*o*_+r*u*_,y=g*u*l-h*f*l-g*o*d+r*f*d+h*o*p-r*u*p,A=t*b+i*v+n*M+s*y;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=b*C,e[1]=(f*d*s-u*p*s-f*n*m+i*p*m+u*n*_-i*d*_)*C,e[2]=(o*p*s-f*l*s+f*n*c-i*p*c-o*n*_+i*l*_)*C,e[3]=(u*l*s-o*d*s-u*n*c+i*d*c+o*n*m-i*l*m)*C,e[4]=v*C,e[5]=(h*p*s-g*d*s+g*n*m-t*p*m-h*n*_+t*d*_)*C,e[6]=(g*l*s-r*p*s-g*n*c+t*p*c+r*n*_-t*l*_)*C,e[7]=(r*d*s-h*l*s+h*n*c-t*d*c-r*n*m+t*l*m)*C,e[8]=M*C,e[9]=(g*u*s-h*f*s-g*i*m+t*f*m+h*i*_-t*u*_)*C,e[10]=(r*f*s-g*o*s+g*i*c-t*f*c-r*i*_+t*o*_)*C,e[11]=(h*o*s-r*u*s-h*i*c+t*u*c+r*i*m-t*o*m)*C,e[12]=y*C,e[13]=(h*f*n-g*u*n+g*i*d-t*f*d-h*i*p+t*u*p)*C,e[14]=(g*o*n-r*f*n-g*i*l+t*f*l+r*i*p-t*o*p)*C,e[15]=(r*u*n-h*o*n+h*i*l-t*u*l-r*i*d+t*o*d)*C,this}scale(e){const t=this.elements,i=e.x,n=e.y,s=e.z;return t[0]*=i,t[4]*=n,t[8]*=s,t[1]*=i,t[5]*=n,t[9]*=s,t[2]*=i,t[6]*=n,t[10]*=s,t[3]*=i,t[7]*=n,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,h=s*o;return this.set(c*r+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*r,0,c*l-n*o,h*l+n*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,s,r){return this.set(1,i,s,0,e,1,r,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,s=t._x,r=t._y,o=t._z,l=t._w,c=s+s,h=r+r,u=o+o,d=s*c,m=s*h,g=s*u,f=r*h,p=r*u,_=o*u,b=l*c,v=l*h,M=l*u,y=i.x,A=i.y,C=i.z;return n[0]=(1-(f+_))*y,n[1]=(m+M)*y,n[2]=(g-v)*y,n[3]=0,n[4]=(m-M)*A,n[5]=(1-(d+_))*A,n[6]=(p+b)*A,n[7]=0,n[8]=(g+v)*C,n[9]=(p-b)*C,n[10]=(1-(d+f))*C,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let s=Yn.set(n[0],n[1],n[2]).length();const r=Yn.set(n[4],n[5],n[6]).length(),o=Yn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),e.x=n[12],e.y=n[13],e.z=n[14],fi.copy(this);const c=1/s,h=1/r,u=1/o;return fi.elements[0]*=c,fi.elements[1]*=c,fi.elements[2]*=c,fi.elements[4]*=h,fi.elements[5]*=h,fi.elements[6]*=h,fi.elements[8]*=u,fi.elements[9]*=u,fi.elements[10]*=u,t.setFromRotationMatrix(fi),i.x=s,i.y=r,i.z=o,this}makePerspective(e,t,i,n,s,r){const o=this.elements,l=2*s/(t-e),c=2*s/(i-n),h=(t+e)/(t-e),u=(i+n)/(i-n),d=-(r+s)/(r-s),m=-2*r*s/(r-s);return o[0]=l,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=c,o[9]=u,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=m,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,i,n,s,r){const o=this.elements,l=1/(t-e),c=1/(i-n),h=1/(r-s),u=(t+e)*l,d=(i+n)*c,m=(r+s)*h;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-u,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=-2*h,o[14]=-m,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Yn=new P,fi=new Ce,kf=new P(0,0,0),Nf=new P(1,1,1),Yi=new P,Lr=new P,Wt=new P,lc=new Ce,cc=new $t;class xr{constructor(e=0,t=0,i=0,n=xr.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,s=n[0],r=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],m=n[10];switch(t){case"XYZ":this._y=Math.asin(Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Tt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return lc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cc.setFromEuler(this),this.setFromQuaternion(cc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}xr.DefaultOrder="XYZ";xr.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Qa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Of=0;const hc=new P,$n=new $t,Di=new Ce,Pr=new P,zs=new P,Ff=new P,Bf=new $t,uc=new P(1,0,0),dc=new P(0,1,0),fc=new P(0,0,1),zf={type:"added"},pc={type:"removed"};class Ze extends cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ze.DefaultUp.clone();const e=new P,t=new xr,i=new $t,n=new P(1,1,1);function s(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Ce},normalMatrix:{value:new Yt}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=Ze.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ze.DefaultMatrixWorldAutoUpdate,this.layers=new Qa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $n.setFromAxisAngle(e,t),this.quaternion.multiply($n),this}rotateOnWorldAxis(e,t){return $n.setFromAxisAngle(e,t),this.quaternion.premultiply($n),this}rotateX(e){return this.rotateOnAxis(uc,e)}rotateY(e){return this.rotateOnAxis(dc,e)}rotateZ(e){return this.rotateOnAxis(fc,e)}translateOnAxis(e,t){return hc.copy(e).applyQuaternion(this.quaternion),this.position.add(hc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(uc,e)}translateY(e){return this.translateOnAxis(dc,e)}translateZ(e){return this.translateOnAxis(fc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Di.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pr.copy(e):Pr.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Di.lookAt(zs,Pr,this.up):Di.lookAt(Pr,zs,this.up),this.quaternion.setFromRotationMatrix(Di),n&&(Di.extractRotation(n.matrixWorld),$n.setFromRotationMatrix(Di),this.quaternion.premultiply($n.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(zf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(pc)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Di.multiply(e.parent.matrixWorld)),e.applyMatrix4(Di),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectsByProperty(e,t);r.length>0&&(i=i.concat(r))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,e,Ff),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,Bf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let s=0,r=n.length;s<r;s++){const o=n[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));n.material=o}else n.material=s(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),m=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=n,i;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}Ze.DefaultUp=new P(0,1,0);Ze.DefaultMatrixAutoUpdate=!0;Ze.DefaultMatrixWorldAutoUpdate=!0;const pi=new P,Ii=new P,Ho=new P,ki=new P,Kn=new P,Zn=new P,mc=new P,Wo=new P,jo=new P,Xo=new P;class Bi{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),pi.subVectors(e,t),n.cross(pi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(e,t,i,n,s){pi.subVectors(n,t),Ii.subVectors(i,t),Ho.subVectors(e,t);const r=pi.dot(pi),o=pi.dot(Ii),l=pi.dot(Ho),c=Ii.dot(Ii),h=Ii.dot(Ho),u=r*c-o*o;if(u===0)return s.set(-2,-1,-1);const d=1/u,m=(c*l-o*h)*d,g=(r*h-o*l)*d;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,ki),ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getUV(e,t,i,n,s,r,o,l){return this.getBarycoord(e,t,i,n,ki),l.set(0,0),l.addScaledVector(s,ki.x),l.addScaledVector(r,ki.y),l.addScaledVector(o,ki.z),l}static isFrontFacing(e,t,i,n){return pi.subVectors(i,t),Ii.subVectors(e,t),pi.cross(Ii).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pi.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),pi.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Bi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,s){return Bi.getUV(e,this.a,this.b,this.c,t,i,n,s)}containsPoint(e){return Bi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,s=this.c;let r,o;Kn.subVectors(n,i),Zn.subVectors(s,i),Wo.subVectors(e,i);const l=Kn.dot(Wo),c=Zn.dot(Wo);if(l<=0&&c<=0)return t.copy(i);jo.subVectors(e,n);const h=Kn.dot(jo),u=Zn.dot(jo);if(h>=0&&u<=h)return t.copy(n);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(i).addScaledVector(Kn,r);Xo.subVectors(e,s);const m=Kn.dot(Xo),g=Zn.dot(Xo);if(g>=0&&m<=g)return t.copy(s);const f=m*c-l*g;if(f<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Zn,o);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return mc.subVectors(s,n),o=(u-h)/(u-h+(m-g)),t.copy(n).addScaledVector(mc,o);const _=1/(p+f+d);return r=f*_,o=d*_,t.copy(i).addScaledVector(Kn,r).addScaledVector(Zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Uf=0;class wi extends cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=us,this.side=on,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Ih,this.blendDst=kh,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=ya,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ro,this.stencilZFail=Ro,this.stencilZPass=Ro,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const n=this[t];if(n===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(i.blending=this.blending),this.side!==on&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(t){const s=n(e.textures),r=n(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ot extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Nh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const st=new P,Rr=new ye;class bt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Sa,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Rr.fromBufferAttribute(this,t),Rr.applyMatrix3(e),this.setXY(t,Rr.x,Rr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.applyMatrix3(e),this.setXYZ(t,st.x,st.y,st.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.applyMatrix4(e),this.setXYZ(t,st.x,st.y,st.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.applyNormalMatrix(e),this.setXYZ(t,st.x,st.y,st.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)st.fromBufferAttribute(this,t),st.transformDirection(e),this.setXYZ(t,st.x,st.y,st.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),i=je(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),i=je(i,this.array),n=je(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e*=this.itemSize,this.normalized&&(t=je(t,this.array),i=je(i,this.array),n=je(n,this.array),s=je(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sa&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class qh extends bt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yh extends bt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Gi extends bt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Vf=0;const ti=new Ce,qo=new Ze,Jn=new P,jt=new Rs,Us=new Rs,gt=new P;class xi extends cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gh(e)?Yh:qh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Yt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,i){return ti.makeTranslation(e,t,i),this.applyMatrix4(ti),this}scale(e,t,i){return ti.makeScale(e,t,i),this.applyMatrix4(ti),this}lookAt(e){return qo.lookAt(e),qo.updateMatrix(),this.applyMatrix4(qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jn).negate(),this.translate(Jn.x,Jn.y,Jn.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Gi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const s=t[i];jt.setFromBufferAttribute(s),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];Us.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(jt.min,Us.min),jt.expandByPoint(gt),gt.addVectors(jt.max,Us.max),jt.expandByPoint(gt)):(jt.expandByPoint(Us.min),jt.expandByPoint(Us.max))}jt.getCenter(i);let n=0;for(let s=0,r=e.count;s<r;s++)gt.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(gt));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)gt.fromBufferAttribute(o,c),l&&(Jn.fromBufferAttribute(e,c),gt.add(Jn)),n=Math.max(n,i.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,s=t.normal.array,r=t.uv.array,o=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let R=0;R<o;R++)c[R]=new P,h[R]=new P;const u=new P,d=new P,m=new P,g=new ye,f=new ye,p=new ye,_=new P,b=new P;function v(R,B,K){u.fromArray(n,R*3),d.fromArray(n,B*3),m.fromArray(n,K*3),g.fromArray(r,R*2),f.fromArray(r,B*2),p.fromArray(r,K*2),d.sub(u),m.sub(u),f.sub(g),p.sub(g);const D=1/(f.x*p.y-p.x*f.y);isFinite(D)&&(_.copy(d).multiplyScalar(p.y).addScaledVector(m,-f.y).multiplyScalar(D),b.copy(m).multiplyScalar(f.x).addScaledVector(d,-p.x).multiplyScalar(D),c[R].add(_),c[B].add(_),c[K].add(_),h[R].add(b),h[B].add(b),h[K].add(b))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let R=0,B=M.length;R<B;++R){const K=M[R],D=K.start,I=K.count;for(let z=D,$=D+I;z<$;z+=3)v(i[z+0],i[z+1],i[z+2])}const y=new P,A=new P,C=new P,x=new P;function S(R){C.fromArray(s,R*3),x.copy(C);const B=c[R];y.copy(B),y.sub(C.multiplyScalar(C.dot(B))).normalize(),A.crossVectors(x,B);const D=A.dot(h[R])<0?-1:1;l[R*4]=y.x,l[R*4+1]=y.y,l[R*4+2]=y.z,l[R*4+3]=D}for(let R=0,B=M.length;R<B;++R){const K=M[R],D=K.start,I=K.count;for(let z=D,$=D+I;z<$;z+=3)S(i[z+0]),S(i[z+1]),S(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new bt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const n=new P,s=new P,r=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(e)for(let d=0,m=e.count;d<m;d+=3){const g=e.getX(d+0),f=e.getX(d+1),p=e.getX(d+2);n.fromBufferAttribute(t,g),s.fromBufferAttribute(t,f),r.fromBufferAttribute(t,p),h.subVectors(r,s),u.subVectors(n,s),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,f),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(f,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)n.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,s),u.subVectors(n,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let m=0,g=0;for(let f=0,p=l.length;f<p;f++){o.isInterleavedBufferAttribute?m=l[f]*o.data.stride+o.offset:m=l[f]*h;for(let _=0;_<h;_++)d[g++]=c[m++]}return new bt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xi,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],m=e(d,i);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(n[l]=h,s=!0)}s&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const gc=new Ce,Qn=new go,Yo=new Ds,Vs=new P,Gs=new P,Hs=new P,$o=new P,Dr=new P,Ir=new ye,kr=new ye,Nr=new ye,Ko=new P,Or=new P;class Re extends Ze{constructor(e=new xi,t=new Ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(s&&o){Dr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&($o.fromBufferAttribute(u,e),r?Dr.addScaledVector($o,h):Dr.addScaledVector($o.sub(t),h))}t.add(Dr)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const i=this.geometry,n=this.material,s=this.matrixWorld;if(n===void 0||(i.boundingSphere===null&&i.computeBoundingSphere(),Yo.copy(i.boundingSphere),Yo.applyMatrix4(s),e.ray.intersectsSphere(Yo)===!1)||(gc.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(gc),i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1))return;let r;const o=i.index,l=i.attributes.position,c=i.attributes.uv,h=i.attributes.uv2,u=i.groups,d=i.drawRange;if(o!==null)if(Array.isArray(n))for(let m=0,g=u.length;m<g;m++){const f=u[m],p=n[f.materialIndex],_=Math.max(f.start,d.start),b=Math.min(o.count,Math.min(f.start+f.count,d.start+d.count));for(let v=_,M=b;v<M;v+=3){const y=o.getX(v),A=o.getX(v+1),C=o.getX(v+2);r=Fr(this,p,e,Qn,c,h,y,A,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const m=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let f=m,p=g;f<p;f+=3){const _=o.getX(f),b=o.getX(f+1),v=o.getX(f+2);r=Fr(this,n,e,Qn,c,h,_,b,v),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(n))for(let m=0,g=u.length;m<g;m++){const f=u[m],p=n[f.materialIndex],_=Math.max(f.start,d.start),b=Math.min(l.count,Math.min(f.start+f.count,d.start+d.count));for(let v=_,M=b;v<M;v+=3){const y=v,A=v+1,C=v+2;r=Fr(this,p,e,Qn,c,h,y,A,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const m=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let f=m,p=g;f<p;f+=3){const _=f,b=f+1,v=f+2;r=Fr(this,n,e,Qn,c,h,_,b,v),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}}}function Gf(a,e,t,i,n,s,r,o){let l;if(e.side===hi?l=i.intersectTriangle(r,s,n,!0,o):l=i.intersectTriangle(n,s,r,e.side===on,o),l===null)return null;Or.copy(o),Or.applyMatrix4(a.matrixWorld);const c=t.ray.origin.distanceTo(Or);return c<t.near||c>t.far?null:{distance:c,point:Or.clone(),object:a}}function Fr(a,e,t,i,n,s,r,o,l){a.getVertexPosition(r,Vs),a.getVertexPosition(o,Gs),a.getVertexPosition(l,Hs);const c=Gf(a,e,t,i,Vs,Gs,Hs,Ko);if(c){n&&(Ir.fromBufferAttribute(n,r),kr.fromBufferAttribute(n,o),Nr.fromBufferAttribute(n,l),c.uv=Bi.getUV(Ko,Vs,Gs,Hs,Ir,kr,Nr,new ye)),s&&(Ir.fromBufferAttribute(s,r),kr.fromBufferAttribute(s,o),Nr.fromBufferAttribute(s,l),c.uv2=Bi.getUV(Ko,Vs,Gs,Hs,Ir,kr,Nr,new ye));const h={a:r,b:o,c:l,normal:new P,materialIndex:0};Bi.getNormal(Vs,Gs,Hs,h.normal),c.face=h}return c}class vr extends xi{constructor(e=1,t=1,i=1,n=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:s,depthSegments:r};const o=this;n=Math.floor(n),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,m=0;g("z","y","x",-1,-1,i,t,e,r,s,0),g("z","y","x",1,-1,i,t,-e,r,s,1),g("x","z","y",1,1,e,i,t,n,r,2),g("x","z","y",1,-1,e,i,-t,n,r,3),g("x","y","z",1,-1,e,t,i,n,s,4),g("x","y","z",-1,-1,e,t,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new Gi(c,3)),this.setAttribute("normal",new Gi(h,3)),this.setAttribute("uv",new Gi(u,2));function g(f,p,_,b,v,M,y,A,C,x,S){const R=M/C,B=y/x,K=M/2,D=y/2,I=A/2,z=C+1,$=x+1;let Y=0,U=0;const ee=new P;for(let Z=0;Z<$;Z++){const V=Z*B-D;for(let G=0;G<z;G++){const Q=G*R-K;ee[f]=Q*b,ee[p]=V*v,ee[_]=I,c.push(ee.x,ee.y,ee.z),ee[f]=0,ee[p]=0,ee[_]=A>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(G/C),u.push(1-Z/x),Y+=1}}for(let Z=0;Z<x;Z++)for(let V=0;V<C;V++){const G=d+V+z*Z,Q=d+V+z*(Z+1),J=d+(V+1)+z*(Z+1),se=d+(V+1)+z*Z;l.push(G,Q,se),l.push(Q,J,se),U+=6}o.addGroup(m,U,S),m+=U,d+=Y}}static fromJSON(e){return new vr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ms(a){const e={};for(const t in a){e[t]={};for(const i in a[t]){const n=a[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function It(a){const e={};for(let t=0;t<a.length;t++){const i=Ms(a[t]);for(const n in i)e[n]=i[n]}return e}function Hf(a){const e=[];for(let t=0;t<a.length;t++)e.push(a[t].clone());return e}function $h(a){return a.getRenderTarget()===null&&a.outputEncoding===Me?vi:or}const Wf={clone:Ms,merge:It};var jf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class On extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jf,this.fragmentShader=Xf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=Hf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:"m4",value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}let Kh=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};class kt extends Kh{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(Qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Qs*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,s=-.5*n;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*n/l,t-=r.offsetY*i/c,n*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,t,t-i,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const es=-90,ts=1;class qf extends Ze{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i;const n=new kt(es,ts,e,t);n.layers=this.layers,n.up.set(0,1,0),n.lookAt(1,0,0),this.add(n);const s=new kt(es,ts,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const r=new kt(es,ts,e,t);r.layers=this.layers,r.up.set(0,0,-1),r.lookAt(0,1,0),this.add(r);const o=new kt(es,ts,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new kt(es,ts,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new kt(es,ts,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const i=this.renderTarget,[n,s,r,o,l,c]=this.children,h=e.getRenderTarget(),u=e.toneMapping,d=e.xr.enabled;e.toneMapping=Vi,e.xr.enabled=!1;const m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,n),e.setRenderTarget(i,1),e.render(t,s),e.setRenderTarget(i,2),e.render(t,r),e.setRenderTarget(i,3),e.render(t,o),e.setRenderTarget(i,4),e.render(t,l),i.texture.generateMipmaps=m,e.setRenderTarget(i,5),e.render(t,c),e.setRenderTarget(h),e.toneMapping=u,e.xr.enabled=d,i.texture.needsPMREMUpdate=!0}}class el extends _t{constructor(e,t,i,n,s,r,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:_s,super(e,t,i,n,s,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yf extends Nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new el(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:St}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new vr(5,5,5),s=new On({name:"CubemapFromEquirect",uniforms:Ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hi,blending:nn});s.uniforms.tEquirect.value=t;const r=new Re(n,s),o=t.minFilter;return t.minFilter===Dn&&(t.minFilter=St),new qf(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,i,n){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,n);e.setRenderTarget(s)}}const Zo=new P,$f=new P,Kf=new Yt;class yn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Zo.subVectors(i,t).cross($f.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const i=e.delta(Zo),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:t.copy(i).multiplyScalar(s).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Kf.getNormalMatrix(e),n=this.coplanarPoint(Zo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const is=new Ds,Br=new P;class tl{constructor(e=new yn,t=new yn,i=new yn,n=new yn,s=new yn,r=new yn){this.planes=[e,t,i,n,s,r]}set(e,t,i,n,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){const t=this.planes,i=e.elements,n=i[0],s=i[1],r=i[2],o=i[3],l=i[4],c=i[5],h=i[6],u=i[7],d=i[8],m=i[9],g=i[10],f=i[11],p=i[12],_=i[13],b=i[14],v=i[15];return t[0].setComponents(o-n,u-l,f-d,v-p).normalize(),t[1].setComponents(o+n,u+l,f+d,v+p).normalize(),t[2].setComponents(o+s,u+c,f+m,v+_).normalize(),t[3].setComponents(o-s,u-c,f-m,v-_).normalize(),t[4].setComponents(o-r,u-h,f-g,v-b).normalize(),t[5].setComponents(o+r,u+h,f+g,v+b).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(is)}intersectsSprite(e){return is.center.set(0,0,0),is.radius=.7071067811865476,is.applyMatrix4(e.matrixWorld),this.intersectsSphere(is)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(Br.x=n.normal.x>0?e.max.x:e.min.x,Br.y=n.normal.y>0?e.max.y:e.min.y,Br.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Br)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zh(){let a=null,e=!1,t=null,i=null;function n(s,r){t(s,r),i=a.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=a.requestAnimationFrame(n),e=!0)},stop:function(){a.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){a=s}}}function Zf(a,e){const t=e.isWebGL2,i=new WeakMap;function n(c,h){const u=c.array,d=c.usage,m=a.createBuffer();a.bindBuffer(h,m),a.bufferData(h,u,d),c.onUploadCallback();let g;if(u instanceof Float32Array)g=5126;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(u instanceof Int16Array)g=5122;else if(u instanceof Uint32Array)g=5125;else if(u instanceof Int32Array)g=5124;else if(u instanceof Int8Array)g=5120;else if(u instanceof Uint8Array)g=5121;else if(u instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const d=h.array,m=h.updateRange;a.bindBuffer(u,c),m.count===-1?a.bufferSubData(u,0,d):(t?a.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):a.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(a.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u===void 0?i.set(c,n(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:r,remove:o,update:l}}class mi extends xi{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const s=e/2,r=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=e/o,d=t/l,m=[],g=[],f=[],p=[];for(let _=0;_<h;_++){const b=_*d-r;for(let v=0;v<c;v++){const M=v*u-s;g.push(M,-b,0),f.push(0,0,1),p.push(v/o),p.push(1-_/l)}}for(let _=0;_<l;_++)for(let b=0;b<o;b++){const v=b+c*_,M=b+c*(_+1),y=b+1+c*(_+1),A=b+1+c*_;m.push(v,M,A),m.push(M,y,A)}this.setIndex(m),this.setAttribute("position",new Gi(g,3)),this.setAttribute("normal",new Gi(f,3)),this.setAttribute("uv",new Gi(p,2))}static fromJSON(e){return new mi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ep=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ip=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sp="vec3 transformed = vec3( position );",rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,ap=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,_p=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vp=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tp=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ip=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Np=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Op=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Fp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Up=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vp=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,qp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yp=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$p=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Zp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,em=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,tm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,am=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,cm=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,hm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,um=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,dm=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,_m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,vm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Pm=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rm=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Dm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Im=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,km=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Om=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Um=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Gm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Hm=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Wm=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,jm=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Xm=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,qm=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Ym=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,$m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ig=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ng=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,sg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,lg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hg=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_g=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Tg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ag=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Cg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Se={alphamap_fragment:Jf,alphamap_pars_fragment:Qf,alphatest_fragment:ep,alphatest_pars_fragment:tp,aomap_fragment:ip,aomap_pars_fragment:np,begin_vertex:sp,beginnormal_vertex:rp,bsdfs:op,iridescence_fragment:ap,bumpmap_pars_fragment:lp,clipping_planes_fragment:cp,clipping_planes_pars_fragment:hp,clipping_planes_pars_vertex:up,clipping_planes_vertex:dp,color_fragment:fp,color_pars_fragment:pp,color_pars_vertex:mp,color_vertex:gp,common:_p,cube_uv_reflection_fragment:xp,defaultnormal_vertex:vp,displacementmap_pars_vertex:yp,displacementmap_vertex:bp,emissivemap_fragment:Mp,emissivemap_pars_fragment:wp,encodings_fragment:Sp,encodings_pars_fragment:Tp,envmap_fragment:Ap,envmap_common_pars_fragment:Ep,envmap_pars_fragment:Cp,envmap_pars_vertex:Lp,envmap_physical_pars_fragment:Vp,envmap_vertex:Pp,fog_vertex:Rp,fog_pars_vertex:Dp,fog_fragment:Ip,fog_pars_fragment:kp,gradientmap_pars_fragment:Np,lightmap_fragment:Op,lightmap_pars_fragment:Fp,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:zp,lights_pars_begin:Up,lights_toon_fragment:Gp,lights_toon_pars_fragment:Hp,lights_phong_fragment:Wp,lights_phong_pars_fragment:jp,lights_physical_fragment:Xp,lights_physical_pars_fragment:qp,lights_fragment_begin:Yp,lights_fragment_maps:$p,lights_fragment_end:Kp,logdepthbuf_fragment:Zp,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:Qp,logdepthbuf_vertex:em,map_fragment:tm,map_pars_fragment:im,map_particle_fragment:nm,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:om,morphcolor_vertex:am,morphnormal_vertex:lm,morphtarget_pars_vertex:cm,morphtarget_vertex:hm,normal_fragment_begin:um,normal_fragment_maps:dm,normal_pars_fragment:fm,normal_pars_vertex:pm,normal_vertex:mm,normalmap_pars_fragment:gm,clearcoat_normal_fragment_begin:_m,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:vm,iridescence_pars_fragment:ym,output_fragment:bm,packing:Mm,premultiplied_alpha_fragment:wm,project_vertex:Sm,dithering_fragment:Tm,dithering_pars_fragment:Am,roughnessmap_fragment:Em,roughnessmap_pars_fragment:Cm,shadowmap_pars_fragment:Lm,shadowmap_pars_vertex:Pm,shadowmap_vertex:Rm,shadowmask_pars_fragment:Dm,skinbase_vertex:Im,skinning_pars_vertex:km,skinning_vertex:Nm,skinnormal_vertex:Om,specularmap_fragment:Fm,specularmap_pars_fragment:Bm,tonemapping_fragment:zm,tonemapping_pars_fragment:Um,transmission_fragment:Vm,transmission_pars_fragment:Gm,uv_pars_fragment:Hm,uv_pars_vertex:Wm,uv_vertex:jm,uv2_pars_fragment:Xm,uv2_pars_vertex:qm,uv2_vertex:Ym,worldpos_vertex:$m,background_vert:Km,background_frag:Zm,backgroundCube_vert:Jm,backgroundCube_frag:Qm,cube_vert:eg,cube_frag:tg,depth_vert:ig,depth_frag:ng,distanceRGBA_vert:sg,distanceRGBA_frag:rg,equirect_vert:og,equirect_frag:ag,linedashed_vert:lg,linedashed_frag:cg,meshbasic_vert:hg,meshbasic_frag:ug,meshlambert_vert:dg,meshlambert_frag:fg,meshmatcap_vert:pg,meshmatcap_frag:mg,meshnormal_vert:gg,meshnormal_frag:_g,meshphong_vert:xg,meshphong_frag:vg,meshphysical_vert:yg,meshphysical_frag:bg,meshtoon_vert:Mg,meshtoon_frag:wg,points_vert:Sg,points_frag:Tg,shadow_vert:Ag,shadow_frag:Eg,sprite_vert:Cg,sprite_frag:Lg},re={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Yt},uv2Transform:{value:new Yt},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Yt}}},yi={basic:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Se.meshbasic_vert,fragmentShader:Se.meshbasic_frag},lambert:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Te(0)}}]),vertexShader:Se.meshlambert_vert,fragmentShader:Se.meshlambert_frag},phong:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30}}]),vertexShader:Se.meshphong_vert,fragmentShader:Se.meshphong_frag},standard:{uniforms:It([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Se.meshphysical_vert,fragmentShader:Se.meshphysical_frag},toon:{uniforms:It([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Te(0)}}]),vertexShader:Se.meshtoon_vert,fragmentShader:Se.meshtoon_frag},matcap:{uniforms:It([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Se.meshmatcap_vert,fragmentShader:Se.meshmatcap_frag},points:{uniforms:It([re.points,re.fog]),vertexShader:Se.points_vert,fragmentShader:Se.points_frag},dashed:{uniforms:It([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Se.linedashed_vert,fragmentShader:Se.linedashed_frag},depth:{uniforms:It([re.common,re.displacementmap]),vertexShader:Se.depth_vert,fragmentShader:Se.depth_frag},normal:{uniforms:It([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Se.meshnormal_vert,fragmentShader:Se.meshnormal_frag},sprite:{uniforms:It([re.sprite,re.fog]),vertexShader:Se.sprite_vert,fragmentShader:Se.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Se.background_vert,fragmentShader:Se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Se.backgroundCube_vert,fragmentShader:Se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Se.cube_vert,fragmentShader:Se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Se.equirect_vert,fragmentShader:Se.equirect_frag},distanceRGBA:{uniforms:It([re.common,re.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Se.distanceRGBA_vert,fragmentShader:Se.distanceRGBA_frag},shadow:{uniforms:It([re.lights,re.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:Se.shadow_vert,fragmentShader:Se.shadow_frag}};yi.physical={uniforms:It([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new ye(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Se.meshphysical_vert,fragmentShader:Se.meshphysical_frag};const zr={r:0,b:0,g:0};function Pg(a,e,t,i,n,s,r){const o=new Te(0);let l=s===!0?0:1,c,h,u=null,d=0,m=null;function g(p,_){let b=!1,v=_.isScene===!0?_.background:null;v&&v.isTexture&&(v=(_.backgroundBlurriness>0?t:e).get(v));const M=a.xr,y=M.getSession&&M.getSession();y&&y.environmentBlendMode==="additive"&&(v=null),v===null?f(o,l):v&&v.isColor&&(f(v,1),b=!0),(a.autoClear||b)&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),v&&(v.isCubeTexture||v.mapping===mo)?(h===void 0&&(h=new Re(new vr(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:Ms(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,C,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.toneMapped=v.encoding!==Me,(u!==v||d!==v.version||m!==a.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,m=a.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Re(new mi(2,2),new On({name:"BackgroundMaterial",uniforms:Ms(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=v.encoding!==Me,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||m!==a.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,m=a.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function f(p,_){p.getRGB(zr,$h(a)),i.buffers.color.setClear(zr.r,zr.g,zr.b,_,r)}return{getClearColor:function(){return o},setClearColor:function(p,_=1){o.set(p),l=_,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,f(o,l)},render:g}}function Rg(a,e,t,i){const n=a.getParameter(34921),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),r=i.isWebGL2||s!==null,o={},l=p(null);let c=l,h=!1;function u(I,z,$,Y,U){let ee=!1;if(r){const Z=f(Y,$,z);c!==Z&&(c=Z,m(c.object)),ee=_(I,Y,$,U),ee&&b(I,Y,$,U)}else{const Z=z.wireframe===!0;(c.geometry!==Y.id||c.program!==$.id||c.wireframe!==Z)&&(c.geometry=Y.id,c.program=$.id,c.wireframe=Z,ee=!0)}U!==null&&t.update(U,34963),(ee||h)&&(h=!1,x(I,z,$,Y),U!==null&&a.bindBuffer(34963,t.get(U).buffer))}function d(){return i.isWebGL2?a.createVertexArray():s.createVertexArrayOES()}function m(I){return i.isWebGL2?a.bindVertexArray(I):s.bindVertexArrayOES(I)}function g(I){return i.isWebGL2?a.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function f(I,z,$){const Y=$.wireframe===!0;let U=o[I.id];U===void 0&&(U={},o[I.id]=U);let ee=U[z.id];ee===void 0&&(ee={},U[z.id]=ee);let Z=ee[Y];return Z===void 0&&(Z=p(d()),ee[Y]=Z),Z}function p(I){const z=[],$=[],Y=[];for(let U=0;U<n;U++)z[U]=0,$[U]=0,Y[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:$,attributeDivisors:Y,object:I,attributes:{},index:null}}function _(I,z,$,Y){const U=c.attributes,ee=z.attributes;let Z=0;const V=$.getAttributes();for(const G in V)if(V[G].location>=0){const J=U[G];let se=ee[G];if(se===void 0&&(G==="instanceMatrix"&&I.instanceMatrix&&(se=I.instanceMatrix),G==="instanceColor"&&I.instanceColor&&(se=I.instanceColor)),J===void 0||J.attribute!==se||se&&J.data!==se.data)return!0;Z++}return c.attributesNum!==Z||c.index!==Y}function b(I,z,$,Y){const U={},ee=z.attributes;let Z=0;const V=$.getAttributes();for(const G in V)if(V[G].location>=0){let J=ee[G];J===void 0&&(G==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),G==="instanceColor"&&I.instanceColor&&(J=I.instanceColor));const se={};se.attribute=J,J&&J.data&&(se.data=J.data),U[G]=se,Z++}c.attributes=U,c.attributesNum=Z,c.index=Y}function v(){const I=c.newAttributes;for(let z=0,$=I.length;z<$;z++)I[z]=0}function M(I){y(I,0)}function y(I,z){const $=c.newAttributes,Y=c.enabledAttributes,U=c.attributeDivisors;$[I]=1,Y[I]===0&&(a.enableVertexAttribArray(I),Y[I]=1),U[I]!==z&&((i.isWebGL2?a:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,z),U[I]=z)}function A(){const I=c.newAttributes,z=c.enabledAttributes;for(let $=0,Y=z.length;$<Y;$++)z[$]!==I[$]&&(a.disableVertexAttribArray($),z[$]=0)}function C(I,z,$,Y,U,ee){i.isWebGL2===!0&&($===5124||$===5125)?a.vertexAttribIPointer(I,z,$,U,ee):a.vertexAttribPointer(I,z,$,Y,U,ee)}function x(I,z,$,Y){if(i.isWebGL2===!1&&(I.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const U=Y.attributes,ee=$.getAttributes(),Z=z.defaultAttributeValues;for(const V in ee){const G=ee[V];if(G.location>=0){let Q=U[V];if(Q===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(Q=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(Q=I.instanceColor)),Q!==void 0){const J=Q.normalized,se=Q.itemSize,X=t.get(Q);if(X===void 0)continue;const Le=X.buffer,de=X.type,_e=X.bytesPerElement;if(Q.isInterleavedBufferAttribute){const ue=Q.data,ze=ue.stride,we=Q.offset;if(ue.isInstancedInterleavedBuffer){for(let xe=0;xe<G.locationSize;xe++)y(G.location+xe,ue.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let xe=0;xe<G.locationSize;xe++)M(G.location+xe);a.bindBuffer(34962,Le);for(let xe=0;xe<G.locationSize;xe++)C(G.location+xe,se/G.locationSize,de,J,ze*_e,(we+se/G.locationSize*xe)*_e)}else{if(Q.isInstancedBufferAttribute){for(let ue=0;ue<G.locationSize;ue++)y(G.location+ue,Q.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ue=0;ue<G.locationSize;ue++)M(G.location+ue);a.bindBuffer(34962,Le);for(let ue=0;ue<G.locationSize;ue++)C(G.location+ue,se/G.locationSize,de,J,se*_e,se/G.locationSize*ue*_e)}}else if(Z!==void 0){const J=Z[V];if(J!==void 0)switch(J.length){case 2:a.vertexAttrib2fv(G.location,J);break;case 3:a.vertexAttrib3fv(G.location,J);break;case 4:a.vertexAttrib4fv(G.location,J);break;default:a.vertexAttrib1fv(G.location,J)}}}}A()}function S(){K();for(const I in o){const z=o[I];for(const $ in z){const Y=z[$];for(const U in Y)g(Y[U].object),delete Y[U];delete z[$]}delete o[I]}}function R(I){if(o[I.id]===void 0)return;const z=o[I.id];for(const $ in z){const Y=z[$];for(const U in Y)g(Y[U].object),delete Y[U];delete z[$]}delete o[I.id]}function B(I){for(const z in o){const $=o[z];if($[I.id]===void 0)continue;const Y=$[I.id];for(const U in Y)g(Y[U].object),delete Y[U];delete $[I.id]}}function K(){D(),h=!0,c!==l&&(c=l,m(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:K,resetDefaultState:D,dispose:S,releaseStatesOfGeometry:R,releaseStatesOfProgram:B,initAttributes:v,enableAttribute:M,disableUnusedAttributes:A}}function Dg(a,e,t,i){const n=i.isWebGL2;let s;function r(c){s=c}function o(c,h){a.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,u){if(u===0)return;let d,m;if(n)d=a,m="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,c,h,u),t.update(h,s,u)}this.setMode=r,this.render=o,this.renderInstances=l}function Ig(a,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=a.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(C){if(C==="highp"){if(a.getShaderPrecisionFormat(35633,36338).precision>0&&a.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";C="mediump"}return C==="mediump"&&a.getShaderPrecisionFormat(35633,36337).precision>0&&a.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&a instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&a instanceof WebGL2ComputeRenderingContext;let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=r||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=a.getParameter(34930),d=a.getParameter(35660),m=a.getParameter(3379),g=a.getParameter(34076),f=a.getParameter(34921),p=a.getParameter(36347),_=a.getParameter(36348),b=a.getParameter(36349),v=d>0,M=r||e.has("OES_texture_float"),y=v&&M,A=r?a.getParameter(36183):0;return{isWebGL2:r,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:p,maxVaryings:_,maxFragmentUniforms:b,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:y,maxSamples:A}}function kg(a){const e=this;let t=null,i=0,n=!1,s=!1;const r=new yn,o=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d,m){const g=u.length!==0||d||i!==0||n;return n=d,t=h(u,m,0),i=u.length,g},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1,c()},this.setState=function(u,d,m){const g=u.clippingPlanes,f=u.clipIntersection,p=u.clipShadows,_=a.get(u);if(!n||g===null||g.length===0||s&&!p)s?h(null):c();else{const b=s?0:i,v=b*4;let M=_.clippingState||null;l.value=M,M=h(g,d,v,m);for(let y=0;y!==v;++y)M[y]=t[y];_.clippingState=M,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,m,g){const f=u!==null?u.length:0;let p=null;if(f!==0){if(p=l.value,g!==!0||p===null){const _=m+f*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<_)&&(p=new Float32Array(_));for(let v=0,M=m;v!==f;++v,M+=4)r.copy(u[v]).applyMatrix4(b,o),r.normal.toArray(p,M),p[M+3]=r.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=f,e.numIntersection=0,p}}function Ng(a){let e=new WeakMap;function t(r,o){return o===ba?r.mapping=_s:o===Ma&&(r.mapping=xs),r}function i(r){if(r&&r.isTexture&&r.isRenderTargetTexture===!1){const o=r.mapping;if(o===ba||o===Ma)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Yf(l.height/2);return c.fromEquirectangularTexture(a,r),e.set(r,c),r.addEventListener("dispose",n),t(c.texture,r.mapping)}else return null}}return r}function n(r){const o=r.target;o.removeEventListener("dispose",n);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class il extends Kh{constructor(e=-1,t=1,i=1,n=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ls=4,_c=[.125,.215,.35,.446,.526,.582],wn=20,Jo=new il,xc=new Te;let Qo=null;const bn=(1+Math.sqrt(5))/2,ns=1/bn,vc=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,bn,ns),new P(0,bn,-ns),new P(ns,0,bn),new P(-ns,0,bn),new P(bn,ns,0),new P(-bn,ns,0)];class yc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){Qo=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,n,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Qo),e.scissorTest=!1,Ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_s||e.mapping===xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qo=this._renderer.getRenderTarget();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:St,minFilter:St,generateMipmaps:!1,type:sr,format:oi,encoding:kn,depthBuffer:!1},n=bc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bc(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Og(s)),this._blurMaterial=Fg(s,e,t)}return n}_compileMaterial(e){const t=new Re(this._lodPlanes[0],e);this._renderer.compile(t,Jo)}_sceneToCubeUV(e,t,i,n){const o=new kt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(xc),h.toneMapping=Vi,h.autoClear=!1;const m=new Ot({name:"PMREM.Background",side:hi,depthWrite:!1,depthTest:!1}),g=new Re(new vr,m);let f=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,f=!0):(m.color.copy(xc),f=!0);for(let _=0;_<6;_++){const b=_%3;b===0?(o.up.set(0,l[_],0),o.lookAt(c[_],0,0)):b===1?(o.up.set(0,0,l[_]),o.lookAt(0,c[_],0)):(o.up.set(0,l[_],0),o.lookAt(0,0,c[_]));const v=this._cubeSize;Ur(n,b*v,_>2?v:0,v,v),h.setRenderTarget(n),f&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===_s||e.mapping===xs;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mc());const s=n?this._cubemapMaterial:this._equirectMaterial,r=new Re(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ur(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,Jo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const s=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),r=vc[(n-1)%vc.length];this._blur(e,n-1,n,s,r)}t.autoClear=i}_blur(e,t,i,n,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,n,"latitudinal",s),this._halfBlur(r,e,i,i,n,"longitudinal",s)}_halfBlur(e,t,i,n,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Re(this._lodPlanes[n],c),d=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*wn-1),f=s/g,p=isFinite(s)?1+Math.floor(h*f):wn;p>wn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${wn}`);const _=[];let b=0;for(let C=0;C<wn;++C){const x=C/f,S=Math.exp(-x*x/2);_.push(S),C===0?b+=S:C<p&&(b+=2*S)}for(let C=0;C<_.length;C++)_[C]=_[C]/b;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=_,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-i;const M=this._sizeLods[n],y=3*M*(n>v-ls?n-v+ls:0),A=4*(this._cubeSize-M);Ur(t,y,A,3*M,2*M),l.setRenderTarget(t),l.render(u,Jo)}}function Og(a){const e=[],t=[],i=[];let n=a;const s=a-ls+1+_c.length;for(let r=0;r<s;r++){const o=Math.pow(2,n);t.push(o);let l=1/o;r>a-ls?l=_c[r-a+ls-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,f=3,p=2,_=1,b=new Float32Array(f*g*m),v=new Float32Array(p*g*m),M=new Float32Array(_*g*m);for(let A=0;A<m;A++){const C=A%3*2/3-1,x=A>2?0:-1,S=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];b.set(S,f*g*A),v.set(d,p*g*A);const R=[A,A,A,A,A,A];M.set(R,_*g*A)}const y=new xi;y.setAttribute("position",new bt(b,f)),y.setAttribute("uv",new bt(v,p)),y.setAttribute("faceIndex",new bt(M,_)),e.push(y),n>ls&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function bc(a,e,t){const i=new Nn(a,e,t);return i.texture.mapping=mo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(a,e,t,i,n){a.viewport.set(e,t,i,n),a.scissor.set(e,t,i,n)}function Fg(a,e,t){const i=new Float32Array(wn),n=new P(0,1,0);return new On({name:"SphericalGaussianBlur",defines:{n:wn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:nn,depthTest:!1,depthWrite:!1})}function Mc(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:nn,depthTest:!1,depthWrite:!1})}function wc(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nn,depthTest:!1,depthWrite:!1})}function nl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Bg(a){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ba||l===Ma,h=l===_s||l===xs;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new yc(a)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&n(u)){t===null&&(t=new yc(a));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function zg(a){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=a.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Ug(a,e,t,i){const n={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",r),delete n[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",r),n[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],34962);const m=u.morphAttributes;for(const g in m){const f=m[g];for(let p=0,_=f.length;p<_;p++)e.update(f[p],34962)}}function c(u){const d=[],m=u.index,g=u.attributes.position;let f=0;if(m!==null){const b=m.array;f=m.version;for(let v=0,M=b.length;v<M;v+=3){const y=b[v+0],A=b[v+1],C=b[v+2];d.push(y,A,A,C,C,y)}}else{const b=g.array;f=g.version;for(let v=0,M=b.length/3-1;v<M;v+=3){const y=v+0,A=v+1,C=v+2;d.push(y,A,A,C,C,y)}}const p=new(Gh(d)?Yh:qh)(d,1);p.version=f;const _=s.get(u);_&&e.remove(_),s.set(u,p)}function h(u){const d=s.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Vg(a,e,t,i){const n=i.isWebGL2;let s;function r(d){s=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function h(d,m){a.drawElements(s,m,o,d*l),t.update(m,s,1)}function u(d,m,g){if(g===0)return;let f,p;if(n)f=a,p="drawElementsInstanced";else if(f=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](s,m,o,d*l,g),t.update(m,s,g)}this.setMode=r,this.setIndex=c,this.render=h,this.renderInstances=u}function Gg(a){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(t.calls++,r){case 4:t.triangles+=o*(s/3);break;case 1:t.lines+=o*(s/2);break;case 3:t.lines+=o*(s-1);break;case 2:t.lines+=o*s;break;case 0:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function n(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Hg(a,e){return a[0]-e[0]}function Wg(a,e){return Math.abs(e[1])-Math.abs(a[1])}function jg(a,e,t){const i={},n=new Float32Array(8),s=new WeakMap,r=new qe,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u,d){const m=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,p=f!==void 0?f.length:0;let _=s.get(h);if(_===void 0||_.count!==p){let $=function(){I.dispose(),s.delete(h),h.removeEventListener("dispose",$)};var g=$;_!==void 0&&_.texture.dispose();const M=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,A=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],x=h.morphAttributes.normal||[],S=h.morphAttributes.color||[];let R=0;M===!0&&(R=1),y===!0&&(R=2),A===!0&&(R=3);let B=h.attributes.position.count*R,K=1;B>e.maxTextureSize&&(K=Math.ceil(B/e.maxTextureSize),B=e.maxTextureSize);const D=new Float32Array(B*K*4*p),I=new Xh(D,B,K,p);I.type=Ji,I.needsUpdate=!0;const z=R*4;for(let Y=0;Y<p;Y++){const U=C[Y],ee=x[Y],Z=S[Y],V=B*K*4*Y;for(let G=0;G<U.count;G++){const Q=G*z;M===!0&&(r.fromBufferAttribute(U,G),D[V+Q+0]=r.x,D[V+Q+1]=r.y,D[V+Q+2]=r.z,D[V+Q+3]=0),y===!0&&(r.fromBufferAttribute(ee,G),D[V+Q+4]=r.x,D[V+Q+5]=r.y,D[V+Q+6]=r.z,D[V+Q+7]=0),A===!0&&(r.fromBufferAttribute(Z,G),D[V+Q+8]=r.x,D[V+Q+9]=r.y,D[V+Q+10]=r.z,D[V+Q+11]=Z.itemSize===4?r.w:1)}}_={count:p,texture:I,size:new ye(B,K)},s.set(h,_),h.addEventListener("dispose",$)}let b=0;for(let M=0;M<m.length;M++)b+=m[M];const v=h.morphTargetsRelative?1:1-b;d.getUniforms().setValue(a,"morphTargetBaseInfluence",v),d.getUniforms().setValue(a,"morphTargetInfluences",m),d.getUniforms().setValue(a,"morphTargetsTexture",_.texture,t),d.getUniforms().setValue(a,"morphTargetsTextureSize",_.size)}else{const f=m===void 0?0:m.length;let p=i[h.id];if(p===void 0||p.length!==f){p=[];for(let y=0;y<f;y++)p[y]=[y,0];i[h.id]=p}for(let y=0;y<f;y++){const A=p[y];A[0]=y,A[1]=m[y]}p.sort(Wg);for(let y=0;y<8;y++)y<f&&p[y][1]?(o[y][0]=p[y][0],o[y][1]=p[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(Hg);const _=h.morphAttributes.position,b=h.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const A=o[y],C=A[0],x=A[1];C!==Number.MAX_SAFE_INTEGER&&x?(_&&h.getAttribute("morphTarget"+y)!==_[C]&&h.setAttribute("morphTarget"+y,_[C]),b&&h.getAttribute("morphNormal"+y)!==b[C]&&h.setAttribute("morphNormal"+y,b[C]),n[y]=x,v+=x):(_&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),b&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),n[y]=0)}const M=h.morphTargetsRelative?1:1-v;d.getUniforms().setValue(a,"morphTargetBaseInfluence",M),d.getUniforms().setValue(a,"morphTargetInfluences",n)}}return{update:l}}function Xg(a,e,t,i){let n=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);return n.get(u)!==c&&(e.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),u}function r(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}const Jh=new _t,Qh=new Xh,eu=new Df,tu=new el,Sc=[],Tc=[],Ac=new Float32Array(16),Ec=new Float32Array(9),Cc=new Float32Array(4);function Is(a,e,t){const i=a[0];if(i<=0||i>0)return a;const n=e*t;let s=Sc[n];if(s===void 0&&(s=new Float32Array(n),Sc[n]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,a[r].toArray(s,o)}return s}function ut(a,e){if(a.length!==e.length)return!1;for(let t=0,i=a.length;t<i;t++)if(a[t]!==e[t])return!1;return!0}function dt(a,e){for(let t=0,i=e.length;t<i;t++)a[t]=e[t]}function _o(a,e){let t=Tc[e];t===void 0&&(t=new Int32Array(e),Tc[e]=t);for(let i=0;i!==e;++i)t[i]=a.allocateTextureUnit();return t}function qg(a,e){const t=this.cache;t[0]!==e&&(a.uniform1f(this.addr,e),t[0]=e)}function Yg(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;a.uniform2fv(this.addr,e),dt(t,e)}}function $g(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;a.uniform3fv(this.addr,e),dt(t,e)}}function Kg(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;a.uniform4fv(this.addr,e),dt(t,e)}}function Zg(a,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;a.uniformMatrix2fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;Cc.set(i),a.uniformMatrix2fv(this.addr,!1,Cc),dt(t,i)}}function Jg(a,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;a.uniformMatrix3fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;Ec.set(i),a.uniformMatrix3fv(this.addr,!1,Ec),dt(t,i)}}function Qg(a,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;a.uniformMatrix4fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;Ac.set(i),a.uniformMatrix4fv(this.addr,!1,Ac),dt(t,i)}}function e_(a,e){const t=this.cache;t[0]!==e&&(a.uniform1i(this.addr,e),t[0]=e)}function t_(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;a.uniform2iv(this.addr,e),dt(t,e)}}function i_(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;a.uniform3iv(this.addr,e),dt(t,e)}}function n_(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;a.uniform4iv(this.addr,e),dt(t,e)}}function s_(a,e){const t=this.cache;t[0]!==e&&(a.uniform1ui(this.addr,e),t[0]=e)}function r_(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;a.uniform2uiv(this.addr,e),dt(t,e)}}function o_(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;a.uniform3uiv(this.addr,e),dt(t,e)}}function a_(a,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;a.uniform4uiv(this.addr,e),dt(t,e)}}function l_(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),t.setTexture2D(e||Jh,n)}function c_(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||eu,n)}function h_(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||tu,n)}function u_(a,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Qh,n)}function d_(a){switch(a){case 5126:return qg;case 35664:return Yg;case 35665:return $g;case 35666:return Kg;case 35674:return Zg;case 35675:return Jg;case 35676:return Qg;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return i_;case 35669:case 35673:return n_;case 5125:return s_;case 36294:return r_;case 36295:return o_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return c_;case 35680:case 36300:case 36308:case 36293:return h_;case 36289:case 36303:case 36311:case 36292:return u_}}function f_(a,e){a.uniform1fv(this.addr,e)}function p_(a,e){const t=Is(e,this.size,2);a.uniform2fv(this.addr,t)}function m_(a,e){const t=Is(e,this.size,3);a.uniform3fv(this.addr,t)}function g_(a,e){const t=Is(e,this.size,4);a.uniform4fv(this.addr,t)}function __(a,e){const t=Is(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,t)}function x_(a,e){const t=Is(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,t)}function v_(a,e){const t=Is(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,t)}function y_(a,e){a.uniform1iv(this.addr,e)}function b_(a,e){a.uniform2iv(this.addr,e)}function M_(a,e){a.uniform3iv(this.addr,e)}function w_(a,e){a.uniform4iv(this.addr,e)}function S_(a,e){a.uniform1uiv(this.addr,e)}function T_(a,e){a.uniform2uiv(this.addr,e)}function A_(a,e){a.uniform3uiv(this.addr,e)}function E_(a,e){a.uniform4uiv(this.addr,e)}function C_(a,e,t){const i=this.cache,n=e.length,s=_o(t,n);ut(i,s)||(a.uniform1iv(this.addr,s),dt(i,s));for(let r=0;r!==n;++r)t.setTexture2D(e[r]||Jh,s[r])}function L_(a,e,t){const i=this.cache,n=e.length,s=_o(t,n);ut(i,s)||(a.uniform1iv(this.addr,s),dt(i,s));for(let r=0;r!==n;++r)t.setTexture3D(e[r]||eu,s[r])}function P_(a,e,t){const i=this.cache,n=e.length,s=_o(t,n);ut(i,s)||(a.uniform1iv(this.addr,s),dt(i,s));for(let r=0;r!==n;++r)t.setTextureCube(e[r]||tu,s[r])}function R_(a,e,t){const i=this.cache,n=e.length,s=_o(t,n);ut(i,s)||(a.uniform1iv(this.addr,s),dt(i,s));for(let r=0;r!==n;++r)t.setTexture2DArray(e[r]||Qh,s[r])}function D_(a){switch(a){case 5126:return f_;case 35664:return p_;case 35665:return m_;case 35666:return g_;case 35674:return __;case 35675:return x_;case 35676:return v_;case 5124:case 35670:return y_;case 35667:case 35671:return b_;case 35668:case 35672:return M_;case 35669:case 35673:return w_;case 5125:return S_;case 36294:return T_;case 36295:return A_;case 36296:return E_;case 35678:case 36198:case 36298:case 36306:case 35682:return C_;case 35679:case 36299:case 36307:return L_;case 35680:case 36300:case 36308:case 36293:return P_;case 36289:case 36303:case 36311:case 36292:return R_}}class I_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=d_(t.type)}}class k_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=D_(t.type)}}class N_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let s=0,r=n.length;s!==r;++s){const o=n[s];o.setValue(e,t[o.id],i)}}}const ea=/(\w+)(\])?(\[|\.)?/g;function Lc(a,e){a.seq.push(e),a.map[e.id]=e}function O_(a,e,t){const i=a.name,n=i.length;for(ea.lastIndex=0;;){const s=ea.exec(i),r=ea.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===n){Lc(t,c===void 0?new I_(o,a,e):new k_(o,a,e));break}else{let u=t.map[o];u===void 0&&(u=new N_(o),Lc(t,u)),t=u}}}class Kr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,35718);for(let n=0;n<i;++n){const s=e.getActiveUniform(t,n),r=e.getUniformLocation(t,s.name);O_(s,r,this)}}setValue(e,t,i,n){const s=this.map[t];s!==void 0&&s.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let s=0,r=t.length;s!==r;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,s=e.length;n!==s;++n){const r=e[n];r.id in t&&i.push(r)}return i}}function Pc(a,e,t){const i=a.createShader(e);return a.shaderSource(i,t),a.compileShader(i),i}let F_=0;function B_(a,e){const t=a.split(`
`),i=[],n=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=n;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}function z_(a){switch(a){case kn:return["Linear","( value )"];case Me:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",a),["Linear","( value )"]}}function Rc(a,e,t){const i=a.getShaderParameter(e,35713),n=a.getShaderInfoLog(e).trim();if(i&&n==="")return"";const s=/ERROR: 0:(\d+)/.exec(n);if(s){const r=parseInt(s[1]);return t.toUpperCase()+`

`+n+`

`+B_(a.getShaderSource(e),r)}else return n}function U_(a,e){const t=z_(e);return"vec4 "+a+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function V_(a,e){let t;switch(e){case Vd:t="Linear";break;case Gd:t="Reinhard";break;case Hd:t="OptimizedCineon";break;case Wd:t="ACESFilmic";break;case jd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+a+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function G_(a){return[a.extensionDerivatives||a.envMapCubeUVHeight||a.bumpMap||a.tangentSpaceNormalMap||a.clearcoatNormalMap||a.flatShading||a.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(a.extensionFragDepth||a.logarithmicDepthBuffer)&&a.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",a.extensionDrawBuffers&&a.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(a.extensionShaderTextureLOD||a.envMap||a.transmission)&&a.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function H_(a){const e=[];for(const t in a){const i=a[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function W_(a,e){const t={},i=a.getProgramParameter(e,35721);for(let n=0;n<i;n++){const s=a.getActiveAttrib(e,n),r=s.name;let o=1;s.type===35674&&(o=2),s.type===35675&&(o=3),s.type===35676&&(o=4),t[r]={type:s.type,location:a.getAttribLocation(e,r),locationSize:o}}return t}function Ks(a){return a!==""}function Dc(a,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ic(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const j_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(a){return a.replace(j_,X_)}function X_(a,e){const t=Se[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return Ea(t)}const q_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(a){return a.replace(q_,Y_)}function Y_(a,e,t,i){let n="";for(let s=parseInt(e);s<parseInt(t);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Nc(a){let e="precision "+a.precision+` float;
precision `+a.precision+" int;";return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $_(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===Rh?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===Dh?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===$s&&(e="SHADOWMAP_TYPE_VSM"),e}function K_(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case _s:case xs:e="ENVMAP_TYPE_CUBE";break;case mo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Z_(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case xs:e="ENVMAP_MODE_REFRACTION";break}return e}function J_(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case Nh:e="ENVMAP_BLENDING_MULTIPLY";break;case zd:e="ENVMAP_BLENDING_MIX";break;case Ud:e="ENVMAP_BLENDING_ADD";break}return e}function Q_(a){const e=a.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function e0(a,e,t,i){const n=a.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=$_(t),c=K_(t),h=Z_(t),u=J_(t),d=Q_(t),m=t.isWebGL2?"":G_(t),g=H_(s),f=n.createProgram();let p,_,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=[g].filter(Ks).join(`
`),p.length>0&&(p+=`
`),_=[m,g].filter(Ks).join(`
`),_.length>0&&(_+=`
`)):(p=[Nc(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),_=[m,Nc(t),"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vi?"#define TONE_MAPPING":"",t.toneMapping!==Vi?Se.tonemapping_pars_fragment:"",t.toneMapping!==Vi?V_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Se.encodings_pars_fragment,U_("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),r=Ea(r),r=Dc(r,t),r=Ic(r,t),o=Ea(o),o=Dc(o,t),o=Ic(o,t),r=kc(r),o=kc(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["#define varying in",t.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const v=b+p+r,M=b+_+o,y=Pc(n,35633,v),A=Pc(n,35632,M);if(n.attachShader(f,y),n.attachShader(f,A),t.index0AttributeName!==void 0?n.bindAttribLocation(f,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(f,0,"position"),n.linkProgram(f),a.debug.checkShaderErrors){const S=n.getProgramInfoLog(f).trim(),R=n.getShaderInfoLog(y).trim(),B=n.getShaderInfoLog(A).trim();let K=!0,D=!0;if(n.getProgramParameter(f,35714)===!1){K=!1;const I=Rc(n,y,"vertex"),z=Rc(n,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(f,35715)+`

Program Info Log: `+S+`
`+I+`
`+z)}else S!==""?console.warn("THREE.WebGLProgram: Program Info Log:",S):(R===""||B==="")&&(D=!1);D&&(this.diagnostics={runnable:K,programLog:S,vertexShader:{log:R,prefix:p},fragmentShader:{log:B,prefix:_}})}n.deleteShader(y),n.deleteShader(A);let C;this.getUniforms=function(){return C===void 0&&(C=new Kr(n,f)),C};let x;return this.getAttributes=function(){return x===void 0&&(x=W_(n,f)),x},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(f),this.program=void 0},this.name=t.shaderName,this.id=F_++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=y,this.fragmentShader=A,this}let t0=0;class i0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new n0(e),t.set(e,i)),i}}class n0{constructor(e){this.id=t0++,this.code=e,this.usedTimes=0}}function s0(a,e,t,i,n,s,r){const o=new Qa,l=new i0,c=[],h=n.isWebGL2,u=n.logarithmicDepthBuffer,d=n.vertexTextures;let m=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x,S,R,B,K){const D=B.fog,I=K.geometry,z=x.isMeshStandardMaterial?B.environment:null,$=(x.isMeshStandardMaterial?t:e).get(x.envMap||z),Y=$&&$.mapping===mo?$.image.height:null,U=g[x.type];x.precision!==null&&(m=n.getMaxPrecision(x.precision),m!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",m,"instead."));const ee=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Z=ee!==void 0?ee.length:0;let V=0;I.morphAttributes.position!==void 0&&(V=1),I.morphAttributes.normal!==void 0&&(V=2),I.morphAttributes.color!==void 0&&(V=3);let G,Q,J,se;if(U){const ze=yi[U];G=ze.vertexShader,Q=ze.fragmentShader}else G=x.vertexShader,Q=x.fragmentShader,l.update(x),J=l.getVertexShaderID(x),se=l.getFragmentShaderID(x);const X=a.getRenderTarget(),Le=x.alphaTest>0,de=x.clearcoat>0,_e=x.iridescence>0;return{isWebGL2:h,shaderID:U,shaderName:x.type,vertexShader:G,fragmentShader:Q,defines:x.defines,customVertexShaderID:J,customFragmentShaderID:se,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:m,instancing:K.isInstancedMesh===!0,instancingColor:K.isInstancedMesh===!0&&K.instanceColor!==null,supportsVertexTextures:d,outputEncoding:X===null?a.outputEncoding:X.isXRRenderTarget===!0?X.texture.encoding:kn,map:!!x.map,matcap:!!x.matcap,envMap:!!$,envMapMode:$&&$.mapping,envMapCubeUVHeight:Y,lightMap:!!x.lightMap,aoMap:!!x.aoMap,emissiveMap:!!x.emissiveMap,bumpMap:!!x.bumpMap,normalMap:!!x.normalMap,objectSpaceNormalMap:x.normalMapType===mf,tangentSpaceNormalMap:x.normalMapType===Uh,decodeVideoTexture:!!x.map&&x.map.isVideoTexture===!0&&x.map.encoding===Me,clearcoat:de,clearcoatMap:de&&!!x.clearcoatMap,clearcoatRoughnessMap:de&&!!x.clearcoatRoughnessMap,clearcoatNormalMap:de&&!!x.clearcoatNormalMap,iridescence:_e,iridescenceMap:_e&&!!x.iridescenceMap,iridescenceThicknessMap:_e&&!!x.iridescenceThicknessMap,displacementMap:!!x.displacementMap,roughnessMap:!!x.roughnessMap,metalnessMap:!!x.metalnessMap,specularMap:!!x.specularMap,specularIntensityMap:!!x.specularIntensityMap,specularColorMap:!!x.specularColorMap,opaque:x.transparent===!1&&x.blending===us,alphaMap:!!x.alphaMap,alphaTest:Le,gradientMap:!!x.gradientMap,sheen:x.sheen>0,sheenColorMap:!!x.sheenColorMap,sheenRoughnessMap:!!x.sheenRoughnessMap,transmission:x.transmission>0,transmissionMap:!!x.transmissionMap,thicknessMap:!!x.thicknessMap,combine:x.combine,vertexTangents:!!x.normalMap&&!!I.attributes.tangent,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUvs:!!x.map||!!x.bumpMap||!!x.normalMap||!!x.specularMap||!!x.alphaMap||!!x.emissiveMap||!!x.roughnessMap||!!x.metalnessMap||!!x.clearcoatMap||!!x.clearcoatRoughnessMap||!!x.clearcoatNormalMap||!!x.iridescenceMap||!!x.iridescenceThicknessMap||!!x.displacementMap||!!x.transmissionMap||!!x.thicknessMap||!!x.specularIntensityMap||!!x.specularColorMap||!!x.sheenColorMap||!!x.sheenRoughnessMap,uvsVertexOnly:!(x.map||x.bumpMap||x.normalMap||x.specularMap||x.alphaMap||x.emissiveMap||x.roughnessMap||x.metalnessMap||x.clearcoatNormalMap||x.iridescenceMap||x.iridescenceThicknessMap||x.transmission>0||x.transmissionMap||x.thicknessMap||x.specularIntensityMap||x.specularColorMap||x.sheen>0||x.sheenColorMap||x.sheenRoughnessMap)&&!!x.displacementMap,fog:!!D,useFog:x.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:!!x.flatShading,sizeAttenuation:x.sizeAttenuation,logarithmicDepthBuffer:u,skinning:K.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:V,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:a.shadowMap.enabled&&R.length>0,shadowMapType:a.shadowMap.type,toneMapping:x.toneMapped?a.toneMapping:Vi,physicallyCorrectLights:a.physicallyCorrectLights,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===po,flipSided:x.side===hi,useDepthPacking:!!x.depthPacking,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:x.extensions&&x.extensions.derivatives,extensionFragDepth:x.extensions&&x.extensions.fragDepth,extensionDrawBuffers:x.extensions&&x.extensions.drawBuffers,extensionShaderTextureLOD:x.extensions&&x.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function p(x){const S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)S.push(R),S.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(_(S,x),b(S,x),S.push(a.outputEncoding)),S.push(x.customProgramCacheKey),S.join()}function _(x,S){x.push(S.precision),x.push(S.outputEncoding),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.combine),x.push(S.vertexUvs),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function b(x,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.map&&o.enable(4),S.matcap&&o.enable(5),S.envMap&&o.enable(6),S.lightMap&&o.enable(7),S.aoMap&&o.enable(8),S.emissiveMap&&o.enable(9),S.bumpMap&&o.enable(10),S.normalMap&&o.enable(11),S.objectSpaceNormalMap&&o.enable(12),S.tangentSpaceNormalMap&&o.enable(13),S.clearcoat&&o.enable(14),S.clearcoatMap&&o.enable(15),S.clearcoatRoughnessMap&&o.enable(16),S.clearcoatNormalMap&&o.enable(17),S.iridescence&&o.enable(18),S.iridescenceMap&&o.enable(19),S.iridescenceThicknessMap&&o.enable(20),S.displacementMap&&o.enable(21),S.specularMap&&o.enable(22),S.roughnessMap&&o.enable(23),S.metalnessMap&&o.enable(24),S.gradientMap&&o.enable(25),S.alphaMap&&o.enable(26),S.alphaTest&&o.enable(27),S.vertexColors&&o.enable(28),S.vertexAlphas&&o.enable(29),S.vertexUvs&&o.enable(30),S.vertexTangents&&o.enable(31),S.uvsVertexOnly&&o.enable(32),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.physicallyCorrectLights&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.specularIntensityMap&&o.enable(15),S.specularColorMap&&o.enable(16),S.transmission&&o.enable(17),S.transmissionMap&&o.enable(18),S.thicknessMap&&o.enable(19),S.sheen&&o.enable(20),S.sheenColorMap&&o.enable(21),S.sheenRoughnessMap&&o.enable(22),S.decodeVideoTexture&&o.enable(23),S.opaque&&o.enable(24),x.push(o.mask)}function v(x){const S=g[x.type];let R;if(S){const B=yi[S];R=Wf.clone(B.uniforms)}else R=x.uniforms;return R}function M(x,S){let R;for(let B=0,K=c.length;B<K;B++){const D=c[B];if(D.cacheKey===S){R=D,++R.usedTimes;break}}return R===void 0&&(R=new e0(a,S,x,s),c.push(R)),R}function y(x){if(--x.usedTimes===0){const S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),x.destroy()}}function A(x){l.remove(x)}function C(){l.dispose()}return{getParameters:f,getProgramCacheKey:p,getUniforms:v,acquireProgram:M,releaseProgram:y,releaseShaderCache:A,programs:c,dispose:C}}function r0(){let a=new WeakMap;function e(s){let r=a.get(s);return r===void 0&&(r={},a.set(s,r)),r}function t(s){a.delete(s)}function i(s,r,o){a.get(s)[r]=o}function n(){a=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function o0(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function Oc(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function Fc(){const a=[];let e=0;const t=[],i=[],n=[];function s(){e=0,t.length=0,i.length=0,n.length=0}function r(u,d,m,g,f,p){let _=a[e];return _===void 0?(_={id:u.id,object:u,geometry:d,material:m,groupOrder:g,renderOrder:u.renderOrder,z:f,group:p},a[e]=_):(_.id=u.id,_.object=u,_.geometry=d,_.material=m,_.groupOrder=g,_.renderOrder=u.renderOrder,_.z=f,_.group=p),e++,_}function o(u,d,m,g,f,p){const _=r(u,d,m,g,f,p);m.transmission>0?i.push(_):m.transparent===!0?n.push(_):t.push(_)}function l(u,d,m,g,f,p){const _=r(u,d,m,g,f,p);m.transmission>0?i.unshift(_):m.transparent===!0?n.unshift(_):t.unshift(_)}function c(u,d){t.length>1&&t.sort(u||o0),i.length>1&&i.sort(d||Oc),n.length>1&&n.sort(d||Oc)}function h(){for(let u=e,d=a.length;u<d;u++){const m=a[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:n,init:s,push:o,unshift:l,finish:h,sort:c}}function a0(){let a=new WeakMap;function e(i,n){const s=a.get(i);let r;return s===void 0?(r=new Fc,a.set(i,[r])):n>=s.length?(r=new Fc,s.push(r)):r=s[n],r}function t(){a=new WeakMap}return{get:e,dispose:t}}function l0(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Te};break;case"SpotLight":t={position:new P,direction:new P,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new P,halfWidth:new P,halfHeight:new P};break}return a[e.id]=t,t}}}function c0(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=t,t}}}let h0=0;function u0(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function d0(a,e){const t=new l0,i=c0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)n.probe.push(new P);const s=new P,r=new Ce,o=new Ce;function l(h,u){let d=0,m=0,g=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,p=0,_=0,b=0,v=0,M=0,y=0,A=0,C=0,x=0;h.sort(u0);const S=u!==!0?Math.PI:1;for(let B=0,K=h.length;B<K;B++){const D=h[B],I=D.color,z=D.intensity,$=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=I.r*z*S,m+=I.g*z*S,g+=I.b*z*S;else if(D.isLightProbe)for(let U=0;U<9;U++)n.probe[U].addScaledVector(D.sh.coefficients[U],z);else if(D.isDirectionalLight){const U=t.get(D);if(U.color.copy(D.color).multiplyScalar(D.intensity*S),D.castShadow){const ee=D.shadow,Z=i.get(D);Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,n.directionalShadow[f]=Z,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=D.shadow.matrix,M++}n.directional[f]=U,f++}else if(D.isSpotLight){const U=t.get(D);U.position.setFromMatrixPosition(D.matrixWorld),U.color.copy(I).multiplyScalar(z*S),U.distance=$,U.coneCos=Math.cos(D.angle),U.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),U.decay=D.decay,n.spot[_]=U;const ee=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,ee.updateMatrices(D),D.castShadow&&x++),n.spotLightMatrix[_]=ee.matrix,D.castShadow){const Z=i.get(D);Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,n.spotShadow[_]=Z,n.spotShadowMap[_]=Y,A++}_++}else if(D.isRectAreaLight){const U=t.get(D);U.color.copy(I).multiplyScalar(z),U.halfWidth.set(D.width*.5,0,0),U.halfHeight.set(0,D.height*.5,0),n.rectArea[b]=U,b++}else if(D.isPointLight){const U=t.get(D);if(U.color.copy(D.color).multiplyScalar(D.intensity*S),U.distance=D.distance,U.decay=D.decay,D.castShadow){const ee=D.shadow,Z=i.get(D);Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,Z.shadowCameraNear=ee.camera.near,Z.shadowCameraFar=ee.camera.far,n.pointShadow[p]=Z,n.pointShadowMap[p]=Y,n.pointShadowMatrix[p]=D.shadow.matrix,y++}n.point[p]=U,p++}else if(D.isHemisphereLight){const U=t.get(D);U.skyColor.copy(D.color).multiplyScalar(z*S),U.groundColor.copy(D.groundColor).multiplyScalar(z*S),n.hemi[v]=U,v++}}b>0&&(e.isWebGL2||a.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):a.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=d,n.ambient[1]=m,n.ambient[2]=g;const R=n.hash;(R.directionalLength!==f||R.pointLength!==p||R.spotLength!==_||R.rectAreaLength!==b||R.hemiLength!==v||R.numDirectionalShadows!==M||R.numPointShadows!==y||R.numSpotShadows!==A||R.numSpotMaps!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=b,n.point.length=p,n.hemi.length=v,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=A+C-x,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=x,R.directionalLength=f,R.pointLength=p,R.spotLength=_,R.rectAreaLength=b,R.hemiLength=v,R.numDirectionalShadows=M,R.numPointShadows=y,R.numSpotShadows=A,R.numSpotMaps=C,n.version=h0++)}function c(h,u){let d=0,m=0,g=0,f=0,p=0;const _=u.matrixWorldInverse;for(let b=0,v=h.length;b<v;b++){const M=h[b];if(M.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(_),d++}else if(M.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(_),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(_),g++}else if(M.isRectAreaLight){const y=n.rectArea[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(_),o.identity(),r.copy(M.matrixWorld),r.premultiply(_),o.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),f++}else if(M.isPointLight){const y=n.point[m];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(_),m++}else if(M.isHemisphereLight){const y=n.hemi[p];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(_),p++}}}return{setup:l,setupView:c,state:n}}function Bc(a,e){const t=new d0(a,e),i=[],n=[];function s(){i.length=0,n.length=0}function r(u){i.push(u)}function o(u){n.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:s,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:l,setupLightsView:c,pushLight:r,pushShadow:o}}function f0(a,e){let t=new WeakMap;function i(s,r=0){const o=t.get(s);let l;return o===void 0?(l=new Bc(a,e),t.set(s,[l])):r>=o.length?(l=new Bc(a,e),o.push(l)):l=o[r],l}function n(){t=new WeakMap}return{get:i,dispose:n}}class p0 extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class m0 extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new P,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const g0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function x0(a,e,t){let i=new tl;const n=new ye,s=new ye,r=new qe,o=new p0({depthPacking:pf}),l=new m0,c={},h=t.maxTextureSize,u={0:hi,1:on,2:po},d=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:g0,fragmentShader:_0}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new xi;g.setAttribute("position",new bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const f=new Re(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh,this.render=function(M,y,A){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;const C=a.getRenderTarget(),x=a.getActiveCubeFace(),S=a.getActiveMipmapLevel(),R=a.state;R.setBlending(nn),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);for(let B=0,K=M.length;B<K;B++){const D=M[B],I=D.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",D,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;n.copy(I.mapSize);const z=I.getFrameExtents();if(n.multiply(z),s.copy(I.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/z.x),n.x=s.x*z.x,I.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/z.y),n.y=s.y*z.y,I.mapSize.y=s.y)),I.map===null){const Y=this.type!==$s?{minFilter:rt,magFilter:rt}:{};I.map=new Nn(n.x,n.y,Y),I.map.texture.name=D.name+".shadowMap",I.camera.updateProjectionMatrix()}a.setRenderTarget(I.map),a.clear();const $=I.getViewportCount();for(let Y=0;Y<$;Y++){const U=I.getViewport(Y);r.set(s.x*U.x,s.y*U.y,s.x*U.z,s.y*U.w),R.viewport(r),I.updateMatrices(D,Y),i=I.getFrustum(),v(y,A,I.camera,D,this.type)}I.isPointLightShadow!==!0&&this.type===$s&&_(I,A),I.needsUpdate=!1}p.needsUpdate=!1,a.setRenderTarget(C,x,S)};function _(M,y){const A=e.update(f);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,m.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Nn(n.x,n.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,a.setRenderTarget(M.mapPass),a.clear(),a.renderBufferDirect(y,null,A,d,f,null),m.uniforms.shadow_pass.value=M.mapPass.texture,m.uniforms.resolution.value=M.mapSize,m.uniforms.radius.value=M.radius,a.setRenderTarget(M.map),a.clear(),a.renderBufferDirect(y,null,A,m,f,null)}function b(M,y,A,C,x,S){let R=null;const B=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(B!==void 0)R=B;else if(R=A.isPointLight===!0?l:o,a.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0){const K=R.uuid,D=y.uuid;let I=c[K];I===void 0&&(I={},c[K]=I);let z=I[D];z===void 0&&(z=R.clone(),I[D]=z),R=z}return R.visible=y.visible,R.wireframe=y.wireframe,S===$s?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:u[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,A.isPointLight===!0&&R.isMeshDistanceMaterial===!0&&(R.referencePosition.setFromMatrixPosition(A.matrixWorld),R.nearDistance=C,R.farDistance=x),R}function v(M,y,A,C,x){if(M.visible===!1)return;if(M.layers.test(y.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&x===$s)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const B=e.update(M),K=M.material;if(Array.isArray(K)){const D=B.groups;for(let I=0,z=D.length;I<z;I++){const $=D[I],Y=K[$.materialIndex];if(Y&&Y.visible){const U=b(M,Y,C,A.near,A.far,x);a.renderBufferDirect(A,null,B,U,M,$)}}}else if(K.visible){const D=b(M,K,C,A.near,A.far,x);a.renderBufferDirect(A,null,B,D,M,null)}}const R=M.children;for(let B=0,K=R.length;B<K;B++)v(R[B],y,A,C,x)}}function v0(a,e,t){const i=t.isWebGL2;function n(){let k=!1;const W=new qe;let te=null;const ce=new qe(0,0,0,0);return{setMask:function(me){te!==me&&!k&&(a.colorMask(me,me,me,me),te=me)},setLocked:function(me){k=me},setClear:function(me,Ue,pt,Mt,un){un===!0&&(me*=Mt,Ue*=Mt,pt*=Mt),W.set(me,Ue,pt,Mt),ce.equals(W)===!1&&(a.clearColor(me,Ue,pt,Mt),ce.copy(W))},reset:function(){k=!1,te=null,ce.set(-1,0,0,0)}}}function s(){let k=!1,W=null,te=null,ce=null;return{setTest:function(me){me?Le(2929):de(2929)},setMask:function(me){W!==me&&!k&&(a.depthMask(me),W=me)},setFunc:function(me){if(te!==me){switch(me){case Dd:a.depthFunc(512);break;case Id:a.depthFunc(519);break;case kd:a.depthFunc(513);break;case ya:a.depthFunc(515);break;case Nd:a.depthFunc(514);break;case Od:a.depthFunc(518);break;case Fd:a.depthFunc(516);break;case Bd:a.depthFunc(517);break;default:a.depthFunc(515)}te=me}},setLocked:function(me){k=me},setClear:function(me){ce!==me&&(a.clearDepth(me),ce=me)},reset:function(){k=!1,W=null,te=null,ce=null}}}function r(){let k=!1,W=null,te=null,ce=null,me=null,Ue=null,pt=null,Mt=null,un=null;return{setTest:function(Ye){k||(Ye?Le(2960):de(2960))},setMask:function(Ye){W!==Ye&&!k&&(a.stencilMask(Ye),W=Ye)},setFunc:function(Ye,Ci,ei){(te!==Ye||ce!==Ci||me!==ei)&&(a.stencilFunc(Ye,Ci,ei),te=Ye,ce=Ci,me=ei)},setOp:function(Ye,Ci,ei){(Ue!==Ye||pt!==Ci||Mt!==ei)&&(a.stencilOp(Ye,Ci,ei),Ue=Ye,pt=Ci,Mt=ei)},setLocked:function(Ye){k=Ye},setClear:function(Ye){un!==Ye&&(a.clearStencil(Ye),un=Ye)},reset:function(){k=!1,W=null,te=null,ce=null,me=null,Ue=null,pt=null,Mt=null,un=null}}}const o=new n,l=new s,c=new r,h=new WeakMap,u=new WeakMap;let d={},m={},g=new WeakMap,f=[],p=null,_=!1,b=null,v=null,M=null,y=null,A=null,C=null,x=null,S=!1,R=null,B=null,K=null,D=null,I=null;const z=a.getParameter(35661);let $=!1,Y=0;const U=a.getParameter(7938);U.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(U)[1]),$=Y>=1):U.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),$=Y>=2);let ee=null,Z={};const V=a.getParameter(3088),G=a.getParameter(2978),Q=new qe().fromArray(V),J=new qe().fromArray(G);function se(k,W,te){const ce=new Uint8Array(4),me=a.createTexture();a.bindTexture(k,me),a.texParameteri(k,10241,9728),a.texParameteri(k,10240,9728);for(let Ue=0;Ue<te;Ue++)a.texImage2D(W+Ue,0,6408,1,1,0,6408,5121,ce);return me}const X={};X[3553]=se(3553,3553,1),X[34067]=se(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Le(2929),l.setFunc(ya),lt(!1),Lt(Dl),Le(2884),ft(nn);function Le(k){d[k]!==!0&&(a.enable(k),d[k]=!0)}function de(k){d[k]!==!1&&(a.disable(k),d[k]=!1)}function _e(k,W){return m[k]!==W?(a.bindFramebuffer(k,W),m[k]=W,i&&(k===36009&&(m[36160]=W),k===36160&&(m[36009]=W)),!0):!1}function ue(k,W){let te=f,ce=!1;if(k)if(te=g.get(W),te===void 0&&(te=[],g.set(W,te)),k.isWebGLMultipleRenderTargets){const me=k.texture;if(te.length!==me.length||te[0]!==36064){for(let Ue=0,pt=me.length;Ue<pt;Ue++)te[Ue]=36064+Ue;te.length=me.length,ce=!0}}else te[0]!==36064&&(te[0]=36064,ce=!0);else te[0]!==1029&&(te[0]=1029,ce=!0);ce&&(t.isWebGL2?a.drawBuffers(te):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(te))}function ze(k){return p!==k?(a.useProgram(k),p=k,!0):!1}const we={[rs]:32774,[bd]:32778,[Md]:32779};if(i)we[Ol]=32775,we[Fl]=32776;else{const k=e.get("EXT_blend_minmax");k!==null&&(we[Ol]=k.MIN_EXT,we[Fl]=k.MAX_EXT)}const xe={[wd]:0,[Sd]:1,[Td]:768,[Ih]:770,[Rd]:776,[Ld]:774,[Ed]:772,[Ad]:769,[kh]:771,[Pd]:775,[Cd]:773};function ft(k,W,te,ce,me,Ue,pt,Mt){if(k===nn){_===!0&&(de(3042),_=!1);return}if(_===!1&&(Le(3042),_=!0),k!==yd){if(k!==b||Mt!==S){if((v!==rs||A!==rs)&&(a.blendEquation(32774),v=rs,A=rs),Mt)switch(k){case us:a.blendFuncSeparate(1,771,1,771);break;case Il:a.blendFunc(1,1);break;case kl:a.blendFuncSeparate(0,769,0,1);break;case Nl:a.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case us:a.blendFuncSeparate(770,771,1,771);break;case Il:a.blendFunc(770,1);break;case kl:a.blendFuncSeparate(0,769,0,1);break;case Nl:a.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}M=null,y=null,C=null,x=null,b=k,S=Mt}return}me=me||W,Ue=Ue||te,pt=pt||ce,(W!==v||me!==A)&&(a.blendEquationSeparate(we[W],we[me]),v=W,A=me),(te!==M||ce!==y||Ue!==C||pt!==x)&&(a.blendFuncSeparate(xe[te],xe[ce],xe[Ue],xe[pt]),M=te,y=ce,C=Ue,x=pt),b=k,S=!1}function at(k,W){k.side===po?de(2884):Le(2884);let te=k.side===hi;W&&(te=!te),lt(te),k.blending===us&&k.transparent===!1?ft(nn):ft(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.premultipliedAlpha),l.setFunc(k.depthFunc),l.setTest(k.depthTest),l.setMask(k.depthWrite),o.setMask(k.colorWrite);const ce=k.stencilWrite;c.setTest(ce),ce&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ge(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Le(32926):de(32926)}function lt(k){R!==k&&(k?a.frontFace(2304):a.frontFace(2305),R=k)}function Lt(k){k!==xd?(Le(2884),k!==B&&(k===Dl?a.cullFace(1029):k===vd?a.cullFace(1028):a.cullFace(1032))):de(2884),B=k}function et(k){k!==K&&($&&a.lineWidth(k),K=k)}function Ge(k,W,te){k?(Le(32823),(D!==W||I!==te)&&(a.polygonOffset(W,te),D=W,I=te)):de(32823)}function Qt(k){k?Le(3089):de(3089)}function Nt(k){k===void 0&&(k=33984+z-1),ee!==k&&(a.activeTexture(k),ee=k)}function E(k,W,te){te===void 0&&(ee===null?te=33984+z-1:te=ee);let ce=Z[te];ce===void 0&&(ce={type:void 0,texture:void 0},Z[te]=ce),(ce.type!==k||ce.texture!==W)&&(ee!==te&&(a.activeTexture(te),ee=te),a.bindTexture(k,W||X[k]),ce.type=k,ce.texture=W)}function w(){const k=Z[ee];k!==void 0&&k.type!==void 0&&(a.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function H(){try{a.compressedTexImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ie(){try{a.compressedTexImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ne(){try{a.texSubImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function oe(){try{a.texSubImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ve(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function L(){try{a.compressedTexSubImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function N(){try{a.texStorage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{a.texStorage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function he(){try{a.texImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ae(){try{a.texImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pe(k){Q.equals(k)===!1&&(a.scissor(k.x,k.y,k.z,k.w),Q.copy(k))}function fe(k){J.equals(k)===!1&&(a.viewport(k.x,k.y,k.z,k.w),J.copy(k))}function Pe(k,W){let te=u.get(W);te===void 0&&(te=new WeakMap,u.set(W,te));let ce=te.get(k);ce===void 0&&(ce=a.getUniformBlockIndex(W,k.name),te.set(k,ce))}function Ie(k,W){const ce=u.get(W).get(k);h.get(W)!==ce&&(a.uniformBlockBinding(W,ce,k.__bindingPointIndex),h.set(W,ce))}function He(){a.disable(3042),a.disable(2884),a.disable(2929),a.disable(32823),a.disable(3089),a.disable(2960),a.disable(32926),a.blendEquation(32774),a.blendFunc(1,0),a.blendFuncSeparate(1,0,1,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(513),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(519,0,4294967295),a.stencilOp(7680,7680,7680),a.clearStencil(0),a.cullFace(1029),a.frontFace(2305),a.polygonOffset(0,0),a.activeTexture(33984),a.bindFramebuffer(36160,null),i===!0&&(a.bindFramebuffer(36009,null),a.bindFramebuffer(36008,null)),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),d={},ee=null,Z={},m={},g=new WeakMap,f=[],p=null,_=!1,b=null,v=null,M=null,y=null,A=null,C=null,x=null,S=!1,R=null,B=null,K=null,D=null,I=null,Q.set(0,0,a.canvas.width,a.canvas.height),J.set(0,0,a.canvas.width,a.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Le,disable:de,bindFramebuffer:_e,drawBuffers:ue,useProgram:ze,setBlending:ft,setMaterial:at,setFlipSided:lt,setCullFace:Lt,setLineWidth:et,setPolygonOffset:Ge,setScissorTest:Qt,activeTexture:Nt,bindTexture:E,unbindTexture:w,compressedTexImage2D:H,compressedTexImage3D:ie,texImage2D:he,texImage3D:ae,updateUBOMapping:Pe,uniformBlockBinding:Ie,texStorage2D:N,texStorage3D:le,texSubImage2D:ne,texSubImage3D:oe,compressedTexSubImage2D:ve,compressedTexSubImage3D:L,scissor:pe,viewport:fe,reset:He}}function y0(a,e,t,i,n,s,r){const o=n.isWebGL2,l=n.maxTextures,c=n.maxCubemapSize,h=n.maxTextureSize,u=n.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let f;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(E,w){return _?new OffscreenCanvas(E,w):lr("canvas")}function v(E,w,H,ie){let ne=1;if((E.width>ie||E.height>ie)&&(ne=ie/Math.max(E.width,E.height)),ne<1||w===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const oe=w?io:Math.floor,ve=oe(ne*E.width),L=oe(ne*E.height);f===void 0&&(f=b(ve,L));const N=H?b(ve,L):f;return N.width=ve,N.height=L,N.getContext("2d").drawImage(E,0,0,ve,L),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+ve+"x"+L+")."),N}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function M(E){return Aa(E.width)&&Aa(E.height)}function y(E){return o?!1:E.wrapS!==ri||E.wrapT!==ri||E.minFilter!==rt&&E.minFilter!==St}function A(E,w){return E.generateMipmaps&&w&&E.minFilter!==rt&&E.minFilter!==St}function C(E){a.generateMipmap(E)}function x(E,w,H,ie,ne=!1){if(o===!1)return w;if(E!==null){if(a[E]!==void 0)return a[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let oe=w;return w===6403&&(H===5126&&(oe=33326),H===5131&&(oe=33325),H===5121&&(oe=33321)),w===33319&&(H===5126&&(oe=33328),H===5131&&(oe=33327),H===5121&&(oe=33323)),w===6408&&(H===5126&&(oe=34836),H===5131&&(oe=34842),H===5121&&(oe=ie===Me&&ne===!1?35907:32856),H===32819&&(oe=32854),H===32820&&(oe=32855)),(oe===33325||oe===33326||oe===33327||oe===33328||oe===34842||oe===34836)&&e.get("EXT_color_buffer_float"),oe}function S(E,w,H){return A(E,H)===!0||E.isFramebufferTexture&&E.minFilter!==rt&&E.minFilter!==St?Math.log2(Math.max(w.width,w.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?w.mipmaps.length:1}function R(E){return E===rt||E===wa||E===Yr?9728:9729}function B(E){const w=E.target;w.removeEventListener("dispose",B),D(w),w.isVideoTexture&&g.delete(w)}function K(E){const w=E.target;w.removeEventListener("dispose",K),z(w)}function D(E){const w=i.get(E);if(w.__webglInit===void 0)return;const H=E.source,ie=p.get(H);if(ie){const ne=ie[w.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&I(E),Object.keys(ie).length===0&&p.delete(H)}i.remove(E)}function I(E){const w=i.get(E);a.deleteTexture(w.__webglTexture);const H=E.source,ie=p.get(H);delete ie[w.__cacheKey],r.memory.textures--}function z(E){const w=E.texture,H=i.get(E),ie=i.get(w);if(ie.__webglTexture!==void 0&&(a.deleteTexture(ie.__webglTexture),r.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++)a.deleteFramebuffer(H.__webglFramebuffer[ne]),H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer[ne]);else{if(a.deleteFramebuffer(H.__webglFramebuffer),H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&a.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let ne=0;ne<H.__webglColorRenderbuffer.length;ne++)H.__webglColorRenderbuffer[ne]&&a.deleteRenderbuffer(H.__webglColorRenderbuffer[ne]);H.__webglDepthRenderbuffer&&a.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let ne=0,oe=w.length;ne<oe;ne++){const ve=i.get(w[ne]);ve.__webglTexture&&(a.deleteTexture(ve.__webglTexture),r.memory.textures--),i.remove(w[ne])}i.remove(w),i.remove(E)}let $=0;function Y(){$=0}function U(){const E=$;return E>=l&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+l),$+=1,E}function ee(E){const w=[];return w.push(E.wrapS),w.push(E.wrapT),w.push(E.wrapR||0),w.push(E.magFilter),w.push(E.minFilter),w.push(E.anisotropy),w.push(E.internalFormat),w.push(E.format),w.push(E.type),w.push(E.generateMipmaps),w.push(E.premultiplyAlpha),w.push(E.flipY),w.push(E.unpackAlignment),w.push(E.encoding),w.join()}function Z(E,w){const H=i.get(E);if(E.isVideoTexture&&Qt(E),E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){const ie=E.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(H,E,w);return}}t.bindTexture(3553,H.__webglTexture,33984+w)}function V(E,w){const H=i.get(E);if(E.version>0&&H.__version!==E.version){de(H,E,w);return}t.bindTexture(35866,H.__webglTexture,33984+w)}function G(E,w){const H=i.get(E);if(E.version>0&&H.__version!==E.version){de(H,E,w);return}t.bindTexture(32879,H.__webglTexture,33984+w)}function Q(E,w){const H=i.get(E);if(E.version>0&&H.__version!==E.version){_e(H,E,w);return}t.bindTexture(34067,H.__webglTexture,33984+w)}const J={[vs]:10497,[ri]:33071,[eo]:33648},se={[rt]:9728,[wa]:9984,[Yr]:9986,[St]:9729,[Fh]:9985,[Dn]:9987};function X(E,w,H){if(H?(a.texParameteri(E,10242,J[w.wrapS]),a.texParameteri(E,10243,J[w.wrapT]),(E===32879||E===35866)&&a.texParameteri(E,32882,J[w.wrapR]),a.texParameteri(E,10240,se[w.magFilter]),a.texParameteri(E,10241,se[w.minFilter])):(a.texParameteri(E,10242,33071),a.texParameteri(E,10243,33071),(E===32879||E===35866)&&a.texParameteri(E,32882,33071),(w.wrapS!==ri||w.wrapT!==ri)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),a.texParameteri(E,10240,R(w.magFilter)),a.texParameteri(E,10241,R(w.minFilter)),w.minFilter!==rt&&w.minFilter!==St&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const ie=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===rt||w.minFilter!==Yr&&w.minFilter!==Dn||w.type===Ji&&e.has("OES_texture_float_linear")===!1||o===!1&&w.type===sr&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||i.get(w).__currentAnisotropy)&&(a.texParameterf(E,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,n.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy)}}function Le(E,w){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,w.addEventListener("dispose",B));const ie=w.source;let ne=p.get(ie);ne===void 0&&(ne={},p.set(ie,ne));const oe=ee(w);if(oe!==E.__cacheKey){ne[oe]===void 0&&(ne[oe]={texture:a.createTexture(),usedTimes:0},r.memory.textures++,H=!0),ne[oe].usedTimes++;const ve=ne[E.__cacheKey];ve!==void 0&&(ne[E.__cacheKey].usedTimes--,ve.usedTimes===0&&I(w)),E.__cacheKey=oe,E.__webglTexture=ne[oe].texture}return H}function de(E,w,H){let ie=3553;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ie=35866),w.isData3DTexture&&(ie=32879);const ne=Le(E,w),oe=w.source;t.bindTexture(ie,E.__webglTexture,33984+H);const ve=i.get(oe);if(oe.version!==ve.__version||ne===!0){t.activeTexture(33984+H),a.pixelStorei(37440,w.flipY),a.pixelStorei(37441,w.premultiplyAlpha),a.pixelStorei(3317,w.unpackAlignment),a.pixelStorei(37443,0);const L=y(w)&&M(w.image)===!1;let N=v(w.image,L,!1,h);N=Nt(w,N);const le=M(N)||o,he=s.convert(w.format,w.encoding);let ae=s.convert(w.type),pe=x(w.internalFormat,he,ae,w.encoding,w.isVideoTexture);X(ie,w,le);let fe;const Pe=w.mipmaps,Ie=o&&w.isVideoTexture!==!0,He=ve.__version===void 0||ne===!0,k=S(w,N,le);if(w.isDepthTexture)pe=6402,o?w.type===Ji?pe=36012:w.type===Sn?pe=33190:w.type===ds?pe=35056:pe=33189:w.type===Ji&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===An&&pe===6402&&w.type!==Bh&&w.type!==Sn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Sn,ae=s.convert(w.type)),w.format===ys&&pe===6402&&(pe=34041,w.type!==ds&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=ds,ae=s.convert(w.type))),He&&(Ie?t.texStorage2D(3553,1,pe,N.width,N.height):t.texImage2D(3553,0,pe,N.width,N.height,0,he,ae,null));else if(w.isDataTexture)if(Pe.length>0&&le){Ie&&He&&t.texStorage2D(3553,k,pe,Pe[0].width,Pe[0].height);for(let W=0,te=Pe.length;W<te;W++)fe=Pe[W],Ie?t.texSubImage2D(3553,W,0,0,fe.width,fe.height,he,ae,fe.data):t.texImage2D(3553,W,pe,fe.width,fe.height,0,he,ae,fe.data);w.generateMipmaps=!1}else Ie?(He&&t.texStorage2D(3553,k,pe,N.width,N.height),t.texSubImage2D(3553,0,0,0,N.width,N.height,he,ae,N.data)):t.texImage2D(3553,0,pe,N.width,N.height,0,he,ae,N.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ie&&He&&t.texStorage3D(35866,k,pe,Pe[0].width,Pe[0].height,N.depth);for(let W=0,te=Pe.length;W<te;W++)fe=Pe[W],w.format!==oi?he!==null?Ie?t.compressedTexSubImage3D(35866,W,0,0,0,fe.width,fe.height,N.depth,he,fe.data,0,0):t.compressedTexImage3D(35866,W,pe,fe.width,fe.height,N.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?t.texSubImage3D(35866,W,0,0,0,fe.width,fe.height,N.depth,he,ae,fe.data):t.texImage3D(35866,W,pe,fe.width,fe.height,N.depth,0,he,ae,fe.data)}else{Ie&&He&&t.texStorage2D(3553,k,pe,Pe[0].width,Pe[0].height);for(let W=0,te=Pe.length;W<te;W++)fe=Pe[W],w.format!==oi?he!==null?Ie?t.compressedTexSubImage2D(3553,W,0,0,fe.width,fe.height,he,fe.data):t.compressedTexImage2D(3553,W,pe,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?t.texSubImage2D(3553,W,0,0,fe.width,fe.height,he,ae,fe.data):t.texImage2D(3553,W,pe,fe.width,fe.height,0,he,ae,fe.data)}else if(w.isDataArrayTexture)Ie?(He&&t.texStorage3D(35866,k,pe,N.width,N.height,N.depth),t.texSubImage3D(35866,0,0,0,0,N.width,N.height,N.depth,he,ae,N.data)):t.texImage3D(35866,0,pe,N.width,N.height,N.depth,0,he,ae,N.data);else if(w.isData3DTexture)Ie?(He&&t.texStorage3D(32879,k,pe,N.width,N.height,N.depth),t.texSubImage3D(32879,0,0,0,0,N.width,N.height,N.depth,he,ae,N.data)):t.texImage3D(32879,0,pe,N.width,N.height,N.depth,0,he,ae,N.data);else if(w.isFramebufferTexture){if(He)if(Ie)t.texStorage2D(3553,k,pe,N.width,N.height);else{let W=N.width,te=N.height;for(let ce=0;ce<k;ce++)t.texImage2D(3553,ce,pe,W,te,0,he,ae,null),W>>=1,te>>=1}}else if(Pe.length>0&&le){Ie&&He&&t.texStorage2D(3553,k,pe,Pe[0].width,Pe[0].height);for(let W=0,te=Pe.length;W<te;W++)fe=Pe[W],Ie?t.texSubImage2D(3553,W,0,0,he,ae,fe):t.texImage2D(3553,W,pe,he,ae,fe);w.generateMipmaps=!1}else Ie?(He&&t.texStorage2D(3553,k,pe,N.width,N.height),t.texSubImage2D(3553,0,0,0,he,ae,N)):t.texImage2D(3553,0,pe,he,ae,N);A(w,le)&&C(ie),ve.__version=oe.version,w.onUpdate&&w.onUpdate(w)}E.__version=w.version}function _e(E,w,H){if(w.image.length!==6)return;const ie=Le(E,w),ne=w.source;t.bindTexture(34067,E.__webglTexture,33984+H);const oe=i.get(ne);if(ne.version!==oe.__version||ie===!0){t.activeTexture(33984+H),a.pixelStorei(37440,w.flipY),a.pixelStorei(37441,w.premultiplyAlpha),a.pixelStorei(3317,w.unpackAlignment),a.pixelStorei(37443,0);const ve=w.isCompressedTexture||w.image[0].isCompressedTexture,L=w.image[0]&&w.image[0].isDataTexture,N=[];for(let W=0;W<6;W++)!ve&&!L?N[W]=v(w.image[W],!1,!0,c):N[W]=L?w.image[W].image:w.image[W],N[W]=Nt(w,N[W]);const le=N[0],he=M(le)||o,ae=s.convert(w.format,w.encoding),pe=s.convert(w.type),fe=x(w.internalFormat,ae,pe,w.encoding),Pe=o&&w.isVideoTexture!==!0,Ie=oe.__version===void 0||ie===!0;let He=S(w,le,he);X(34067,w,he);let k;if(ve){Pe&&Ie&&t.texStorage2D(34067,He,fe,le.width,le.height);for(let W=0;W<6;W++){k=N[W].mipmaps;for(let te=0;te<k.length;te++){const ce=k[te];w.format!==oi?ae!==null?Pe?t.compressedTexSubImage2D(34069+W,te,0,0,ce.width,ce.height,ae,ce.data):t.compressedTexImage2D(34069+W,te,fe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?t.texSubImage2D(34069+W,te,0,0,ce.width,ce.height,ae,pe,ce.data):t.texImage2D(34069+W,te,fe,ce.width,ce.height,0,ae,pe,ce.data)}}}else{k=w.mipmaps,Pe&&Ie&&(k.length>0&&He++,t.texStorage2D(34067,He,fe,N[0].width,N[0].height));for(let W=0;W<6;W++)if(L){Pe?t.texSubImage2D(34069+W,0,0,0,N[W].width,N[W].height,ae,pe,N[W].data):t.texImage2D(34069+W,0,fe,N[W].width,N[W].height,0,ae,pe,N[W].data);for(let te=0;te<k.length;te++){const me=k[te].image[W].image;Pe?t.texSubImage2D(34069+W,te+1,0,0,me.width,me.height,ae,pe,me.data):t.texImage2D(34069+W,te+1,fe,me.width,me.height,0,ae,pe,me.data)}}else{Pe?t.texSubImage2D(34069+W,0,0,0,ae,pe,N[W]):t.texImage2D(34069+W,0,fe,ae,pe,N[W]);for(let te=0;te<k.length;te++){const ce=k[te];Pe?t.texSubImage2D(34069+W,te+1,0,0,ae,pe,ce.image[W]):t.texImage2D(34069+W,te+1,fe,ae,pe,ce.image[W])}}}A(w,he)&&C(34067),oe.__version=ne.version,w.onUpdate&&w.onUpdate(w)}E.__version=w.version}function ue(E,w,H,ie,ne){const oe=s.convert(H.format,H.encoding),ve=s.convert(H.type),L=x(H.internalFormat,oe,ve,H.encoding);i.get(w).__hasExternalTextures||(ne===32879||ne===35866?t.texImage3D(ne,0,L,w.width,w.height,w.depth,0,oe,ve,null):t.texImage2D(ne,0,L,w.width,w.height,0,oe,ve,null)),t.bindFramebuffer(36160,E),Ge(w)?d.framebufferTexture2DMultisampleEXT(36160,ie,ne,i.get(H).__webglTexture,0,et(w)):(ne===3553||ne>=34069&&ne<=34074)&&a.framebufferTexture2D(36160,ie,ne,i.get(H).__webglTexture,0),t.bindFramebuffer(36160,null)}function ze(E,w,H){if(a.bindRenderbuffer(36161,E),w.depthBuffer&&!w.stencilBuffer){let ie=33189;if(H||Ge(w)){const ne=w.depthTexture;ne&&ne.isDepthTexture&&(ne.type===Ji?ie=36012:ne.type===Sn&&(ie=33190));const oe=et(w);Ge(w)?d.renderbufferStorageMultisampleEXT(36161,oe,ie,w.width,w.height):a.renderbufferStorageMultisample(36161,oe,ie,w.width,w.height)}else a.renderbufferStorage(36161,ie,w.width,w.height);a.framebufferRenderbuffer(36160,36096,36161,E)}else if(w.depthBuffer&&w.stencilBuffer){const ie=et(w);H&&Ge(w)===!1?a.renderbufferStorageMultisample(36161,ie,35056,w.width,w.height):Ge(w)?d.renderbufferStorageMultisampleEXT(36161,ie,35056,w.width,w.height):a.renderbufferStorage(36161,34041,w.width,w.height),a.framebufferRenderbuffer(36160,33306,36161,E)}else{const ie=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let ne=0;ne<ie.length;ne++){const oe=ie[ne],ve=s.convert(oe.format,oe.encoding),L=s.convert(oe.type),N=x(oe.internalFormat,ve,L,oe.encoding),le=et(w);H&&Ge(w)===!1?a.renderbufferStorageMultisample(36161,le,N,w.width,w.height):Ge(w)?d.renderbufferStorageMultisampleEXT(36161,le,N,w.width,w.height):a.renderbufferStorage(36161,N,w.width,w.height)}}a.bindRenderbuffer(36161,null)}function we(E,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,E),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Z(w.depthTexture,0);const ie=i.get(w.depthTexture).__webglTexture,ne=et(w);if(w.depthTexture.format===An)Ge(w)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,ie,0,ne):a.framebufferTexture2D(36160,36096,3553,ie,0);else if(w.depthTexture.format===ys)Ge(w)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,ie,0,ne):a.framebufferTexture2D(36160,33306,3553,ie,0);else throw new Error("Unknown depthTexture format")}function xe(E){const w=i.get(E),H=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");we(w.__webglFramebuffer,E)}else if(H){w.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)t.bindFramebuffer(36160,w.__webglFramebuffer[ie]),w.__webglDepthbuffer[ie]=a.createRenderbuffer(),ze(w.__webglDepthbuffer[ie],E,!1)}else t.bindFramebuffer(36160,w.__webglFramebuffer),w.__webglDepthbuffer=a.createRenderbuffer(),ze(w.__webglDepthbuffer,E,!1);t.bindFramebuffer(36160,null)}function ft(E,w,H){const ie=i.get(E);w!==void 0&&ue(ie.__webglFramebuffer,E,E.texture,36064,3553),H!==void 0&&xe(E)}function at(E){const w=E.texture,H=i.get(E),ie=i.get(w);E.addEventListener("dispose",K),E.isWebGLMultipleRenderTargets!==!0&&(ie.__webglTexture===void 0&&(ie.__webglTexture=a.createTexture()),ie.__version=w.version,r.memory.textures++);const ne=E.isWebGLCubeRenderTarget===!0,oe=E.isWebGLMultipleRenderTargets===!0,ve=M(E)||o;if(ne){H.__webglFramebuffer=[];for(let L=0;L<6;L++)H.__webglFramebuffer[L]=a.createFramebuffer()}else{if(H.__webglFramebuffer=a.createFramebuffer(),oe)if(n.drawBuffers){const L=E.texture;for(let N=0,le=L.length;N<le;N++){const he=i.get(L[N]);he.__webglTexture===void 0&&(he.__webglTexture=a.createTexture(),r.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&Ge(E)===!1){const L=oe?w:[w];H.__webglMultisampledFramebuffer=a.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,H.__webglMultisampledFramebuffer);for(let N=0;N<L.length;N++){const le=L[N];H.__webglColorRenderbuffer[N]=a.createRenderbuffer(),a.bindRenderbuffer(36161,H.__webglColorRenderbuffer[N]);const he=s.convert(le.format,le.encoding),ae=s.convert(le.type),pe=x(le.internalFormat,he,ae,le.encoding,E.isXRRenderTarget===!0),fe=et(E);a.renderbufferStorageMultisample(36161,fe,pe,E.width,E.height),a.framebufferRenderbuffer(36160,36064+N,36161,H.__webglColorRenderbuffer[N])}a.bindRenderbuffer(36161,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=a.createRenderbuffer(),ze(H.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(36160,null)}}if(ne){t.bindTexture(34067,ie.__webglTexture),X(34067,w,ve);for(let L=0;L<6;L++)ue(H.__webglFramebuffer[L],E,w,36064,34069+L);A(w,ve)&&C(34067),t.unbindTexture()}else if(oe){const L=E.texture;for(let N=0,le=L.length;N<le;N++){const he=L[N],ae=i.get(he);t.bindTexture(3553,ae.__webglTexture),X(3553,he,ve),ue(H.__webglFramebuffer,E,he,36064+N,3553),A(he,ve)&&C(3553)}t.unbindTexture()}else{let L=3553;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?L=E.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(L,ie.__webglTexture),X(L,w,ve),ue(H.__webglFramebuffer,E,w,36064,L),A(w,ve)&&C(L),t.unbindTexture()}E.depthBuffer&&xe(E)}function lt(E){const w=M(E)||o,H=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ie=0,ne=H.length;ie<ne;ie++){const oe=H[ie];if(A(oe,w)){const ve=E.isWebGLCubeRenderTarget?34067:3553,L=i.get(oe).__webglTexture;t.bindTexture(ve,L),C(ve),t.unbindTexture()}}}function Lt(E){if(o&&E.samples>0&&Ge(E)===!1){const w=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],H=E.width,ie=E.height;let ne=16384;const oe=[],ve=E.stencilBuffer?33306:36096,L=i.get(E),N=E.isWebGLMultipleRenderTargets===!0;if(N)for(let le=0;le<w.length;le++)t.bindFramebuffer(36160,L.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(36160,36064+le,36161,null),t.bindFramebuffer(36160,L.__webglFramebuffer),a.framebufferTexture2D(36009,36064+le,3553,null,0);t.bindFramebuffer(36008,L.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,L.__webglFramebuffer);for(let le=0;le<w.length;le++){oe.push(36064+le),E.depthBuffer&&oe.push(ve);const he=L.__ignoreDepthValues!==void 0?L.__ignoreDepthValues:!1;if(he===!1&&(E.depthBuffer&&(ne|=256),E.stencilBuffer&&(ne|=1024)),N&&a.framebufferRenderbuffer(36008,36064,36161,L.__webglColorRenderbuffer[le]),he===!0&&(a.invalidateFramebuffer(36008,[ve]),a.invalidateFramebuffer(36009,[ve])),N){const ae=i.get(w[le]).__webglTexture;a.framebufferTexture2D(36009,36064,3553,ae,0)}a.blitFramebuffer(0,0,H,ie,0,0,H,ie,ne,9728),m&&a.invalidateFramebuffer(36008,oe)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),N)for(let le=0;le<w.length;le++){t.bindFramebuffer(36160,L.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(36160,36064+le,36161,L.__webglColorRenderbuffer[le]);const he=i.get(w[le]).__webglTexture;t.bindFramebuffer(36160,L.__webglFramebuffer),a.framebufferTexture2D(36009,36064+le,3553,he,0)}t.bindFramebuffer(36009,L.__webglMultisampledFramebuffer)}}function et(E){return Math.min(u,E.samples)}function Ge(E){const w=i.get(E);return o&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Qt(E){const w=r.render.frame;g.get(E)!==w&&(g.set(E,w),E.update())}function Nt(E,w){const H=E.encoding,ie=E.format,ne=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Ta||H!==kn&&(H===Me?o===!1?e.has("EXT_sRGB")===!0&&ie===oi?(E.format=Ta,E.minFilter=St,E.generateMipmaps=!1):w=Wh.sRGBToLinear(w):(ie!==oi||ne!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",H)),w}this.allocateTextureUnit=U,this.resetTextureUnits=Y,this.setTexture2D=Z,this.setTexture2DArray=V,this.setTexture3D=G,this.setTextureCube=Q,this.rebindTextures=ft,this.setupRenderTarget=at,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Ge}function b0(a,e,t){const i=t.isWebGL2;function n(s,r=null){let o;if(s===In)return 5121;if(s===$d)return 32819;if(s===Kd)return 32820;if(s===Xd)return 5120;if(s===qd)return 5122;if(s===Bh)return 5123;if(s===Yd)return 5124;if(s===Sn)return 5125;if(s===Ji)return 5126;if(s===sr)return i?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Zd)return 6406;if(s===oi)return 6408;if(s===Qd)return 6409;if(s===ef)return 6410;if(s===An)return 6402;if(s===ys)return 34041;if(s===Jd)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===Ta)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===tf)return 6403;if(s===nf)return 36244;if(s===sf)return 33319;if(s===rf)return 33320;if(s===of)return 36249;if(s===Ao||s===Eo||s===Co||s===Lo)if(r===Me)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Ao)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Eo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Co)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Lo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Ao)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Eo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Co)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Lo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Bl||s===zl||s===Ul||s===Vl)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Bl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===zl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ul)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Vl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===af)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Gl||s===Hl)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Gl)return r===Me?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Hl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Wl||s===jl||s===Xl||s===ql||s===Yl||s===$l||s===Kl||s===Zl||s===Jl||s===Ql||s===ec||s===tc||s===ic||s===nc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Wl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===jl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Xl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ql)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Yl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===$l)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Kl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Zl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Jl)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ql)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ec)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===tc)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ic)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===nc)return r===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===sc)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===sc)return r===Me?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===ds?i?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):a[s]!==void 0?a[s]:null}return{convert:n}}class M0 extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ui extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}}const w0={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const f of e.hand.values()){const p=t.getJointPose(f,i),_=this._getHandJoint(c,f);p!==null&&(_.matrix.fromArray(p.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=p.radius),_.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&d>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(w0)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ui;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class S0 extends _t{constructor(e,t,i,n,s,r,o,l,c,h){if(h=h!==void 0?h:An,h!==An&&h!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===An&&(i=Sn),i===void 0&&h===ys&&(i=ds),super(null,n,s,r,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:rt,this.minFilter=l!==void 0?l:rt,this.flipY=!1,this.generateMipmaps=!1}}class T0 extends cn{constructor(e,t){super();const i=this;let n=null,s=1,r=null,o="local-floor",l=null,c=null,h=null,u=null,d=null,m=null;const g=t.getContextAttributes();let f=null,p=null;const _=[],b=[],v=new Set,M=new Map,y=new kt;y.layers.enable(1),y.viewport=new qe;const A=new kt;A.layers.enable(2),A.viewport=new qe;const C=[y,A],x=new M0;x.layers.enable(1),x.layers.enable(2);let S=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let G=_[V];return G===void 0&&(G=new ta,_[V]=G),G.getTargetRaySpace()},this.getControllerGrip=function(V){let G=_[V];return G===void 0&&(G=new ta,_[V]=G),G.getGripSpace()},this.getHand=function(V){let G=_[V];return G===void 0&&(G=new ta,_[V]=G),G.getHandSpace()};function B(V){const G=b.indexOf(V.inputSource);if(G===-1)return;const Q=_[G];Q!==void 0&&Q.dispatchEvent({type:V.type,data:V.inputSource})}function K(){n.removeEventListener("select",B),n.removeEventListener("selectstart",B),n.removeEventListener("selectend",B),n.removeEventListener("squeeze",B),n.removeEventListener("squeezestart",B),n.removeEventListener("squeezeend",B),n.removeEventListener("end",K),n.removeEventListener("inputsourceschange",D);for(let V=0;V<_.length;V++){const G=b[V];G!==null&&(b[V]=null,_[V].disconnect(G))}S=null,R=null,e.setRenderTarget(f),d=null,u=null,h=null,n=null,p=null,Z.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function(V){if(n=V,n!==null){if(f=e.getRenderTarget(),n.addEventListener("select",B),n.addEventListener("selectstart",B),n.addEventListener("selectend",B),n.addEventListener("squeeze",B),n.addEventListener("squeezestart",B),n.addEventListener("squeezeend",B),n.addEventListener("end",K),n.addEventListener("inputsourceschange",D),g.xrCompatible!==!0&&await t.makeXRCompatible(),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const G={antialias:n.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(n,t,G),n.updateRenderState({baseLayer:d}),p=new Nn(d.framebufferWidth,d.framebufferHeight,{format:oi,type:In,encoding:e.outputEncoding,stencilBuffer:g.stencil})}else{let G=null,Q=null,J=null;g.depth&&(J=g.stencil?35056:33190,G=g.stencil?ys:An,Q=g.stencil?ds:Sn);const se={colorFormat:32856,depthFormat:J,scaleFactor:s};h=new XRWebGLBinding(n,t),u=h.createProjectionLayer(se),n.updateRenderState({layers:[u]}),p=new Nn(u.textureWidth,u.textureHeight,{format:oi,type:In,depthTexture:new S0(u.textureWidth,u.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:g.stencil,encoding:e.outputEncoding,samples:g.antialias?4:0});const X=e.properties.get(p);X.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(1),l=null,r=await n.requestReferenceSpace(o),Z.setContext(n),Z.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}};function D(V){for(let G=0;G<V.removed.length;G++){const Q=V.removed[G],J=b.indexOf(Q);J>=0&&(b[J]=null,_[J].disconnect(Q))}for(let G=0;G<V.added.length;G++){const Q=V.added[G];let J=b.indexOf(Q);if(J===-1){for(let X=0;X<_.length;X++)if(X>=b.length){b.push(Q),J=X;break}else if(b[X]===null){b[X]=Q,J=X;break}if(J===-1)break}const se=_[J];se&&se.connect(Q)}}const I=new P,z=new P;function $(V,G,Q){I.setFromMatrixPosition(G.matrixWorld),z.setFromMatrixPosition(Q.matrixWorld);const J=I.distanceTo(z),se=G.projectionMatrix.elements,X=Q.projectionMatrix.elements,Le=se[14]/(se[10]-1),de=se[14]/(se[10]+1),_e=(se[9]+1)/se[5],ue=(se[9]-1)/se[5],ze=(se[8]-1)/se[0],we=(X[8]+1)/X[0],xe=Le*ze,ft=Le*we,at=J/(-ze+we),lt=at*-ze;G.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(lt),V.translateZ(at),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const Lt=Le+at,et=de+at,Ge=xe-lt,Qt=ft+(J-lt),Nt=_e*de/et*Lt,E=ue*de/et*Lt;V.projectionMatrix.makePerspective(Ge,Qt,Nt,E,Lt,et)}function Y(V,G){G===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(G.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(n===null)return;x.near=A.near=y.near=V.near,x.far=A.far=y.far=V.far,(S!==x.near||R!==x.far)&&(n.updateRenderState({depthNear:x.near,depthFar:x.far}),S=x.near,R=x.far);const G=V.parent,Q=x.cameras;Y(x,G);for(let se=0;se<Q.length;se++)Y(Q[se],G);x.matrixWorld.decompose(x.position,x.quaternion,x.scale),V.matrix.copy(x.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale);const J=V.children;for(let se=0,X=J.length;se<X;se++)J[se].updateMatrixWorld(!0);Q.length===2?$(x,y,A):x.projectionMatrix.copy(y.projectionMatrix)},this.getCamera=function(){return x},this.getFoveation=function(){if(u!==null)return u.fixedFoveation;if(d!==null)return d.fixedFoveation},this.setFoveation=function(V){u!==null&&(u.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)},this.getPlanes=function(){return v};let U=null;function ee(V,G){if(c=G.getViewerPose(l||r),m=G,c!==null){const Q=c.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let J=!1;Q.length!==x.cameras.length&&(x.cameras.length=0,J=!0);for(let se=0;se<Q.length;se++){const X=Q[se];let Le=null;if(d!==null)Le=d.getViewport(X);else{const _e=h.getViewSubImage(u,X);Le=_e.viewport,se===0&&(e.setRenderTargetTextures(p,_e.colorTexture,u.ignoreDepthValues?void 0:_e.depthStencilTexture),e.setRenderTarget(p))}let de=C[se];de===void 0&&(de=new kt,de.layers.enable(se),de.viewport=new qe,C[se]=de),de.matrix.fromArray(X.transform.matrix),de.projectionMatrix.fromArray(X.projectionMatrix),de.viewport.set(Le.x,Le.y,Le.width,Le.height),se===0&&x.matrix.copy(de.matrix),J===!0&&x.cameras.push(de)}}for(let Q=0;Q<_.length;Q++){const J=b[Q],se=_[Q];J!==null&&se!==void 0&&se.update(J,G,l||r)}if(U&&U(V,G),G.detectedPlanes){i.dispatchEvent({type:"planesdetected",data:G.detectedPlanes});let Q=null;for(const J of v)G.detectedPlanes.has(J)||(Q===null&&(Q=[]),Q.push(J));if(Q!==null)for(const J of Q)v.delete(J),M.delete(J),i.dispatchEvent({type:"planeremoved",data:J});for(const J of G.detectedPlanes)if(!v.has(J))v.add(J),M.set(J,G.lastChangedTime),i.dispatchEvent({type:"planeadded",data:J});else{const se=M.get(J);J.lastChangedTime>se&&(M.set(J,J.lastChangedTime),i.dispatchEvent({type:"planechanged",data:J}))}}m=null}const Z=new Zh;Z.setAnimationLoop(ee),this.setAnimationLoop=function(V){U=V},this.dispose=function(){}}}function A0(a,e){function t(f,p){p.color.getRGB(f.fogColor.value,$h(a)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function i(f,p,_,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?n(f,p):p.isMeshToonMaterial?(n(f,p),h(f,p)):p.isMeshPhongMaterial?(n(f,p),c(f,p)):p.isMeshStandardMaterial?(n(f,p),u(f,p),p.isMeshPhysicalMaterial&&d(f,p,v)):p.isMeshMatcapMaterial?(n(f,p),m(f,p)):p.isMeshDepthMaterial?n(f,p):p.isMeshDistanceMaterial?(n(f,p),g(f,p)):p.isMeshNormalMaterial?n(f,p):p.isLineBasicMaterial?(s(f,p),p.isLineDashedMaterial&&r(f,p)):p.isPointsMaterial?o(f,p,_,b):p.isSpriteMaterial?l(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function n(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map),p.alphaMap&&(f.alphaMap.value=p.alphaMap),p.bumpMap&&(f.bumpMap.value=p.bumpMap,f.bumpScale.value=p.bumpScale,p.side===hi&&(f.bumpScale.value*=-1)),p.displacementMap&&(f.displacementMap.value=p.displacementMap,f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap),p.normalMap&&(f.normalMap.value=p.normalMap,f.normalScale.value.copy(p.normalScale),p.side===hi&&f.normalScale.value.negate()),p.specularMap&&(f.specularMap.value=p.specularMap),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const _=e.get(p).envMap;if(_&&(f.envMap.value=_,f.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap){f.lightMap.value=p.lightMap;const M=a.physicallyCorrectLights!==!0?Math.PI:1;f.lightMapIntensity.value=p.lightMapIntensity*M}p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity);let b;p.map?b=p.map:p.specularMap?b=p.specularMap:p.displacementMap?b=p.displacementMap:p.normalMap?b=p.normalMap:p.bumpMap?b=p.bumpMap:p.roughnessMap?b=p.roughnessMap:p.metalnessMap?b=p.metalnessMap:p.alphaMap?b=p.alphaMap:p.emissiveMap?b=p.emissiveMap:p.clearcoatMap?b=p.clearcoatMap:p.clearcoatNormalMap?b=p.clearcoatNormalMap:p.clearcoatRoughnessMap?b=p.clearcoatRoughnessMap:p.iridescenceMap?b=p.iridescenceMap:p.iridescenceThicknessMap?b=p.iridescenceThicknessMap:p.specularIntensityMap?b=p.specularIntensityMap:p.specularColorMap?b=p.specularColorMap:p.transmissionMap?b=p.transmissionMap:p.thicknessMap?b=p.thicknessMap:p.sheenColorMap?b=p.sheenColorMap:p.sheenRoughnessMap&&(b=p.sheenRoughnessMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),f.uvTransform.value.copy(b.matrix));let v;p.aoMap?v=p.aoMap:p.lightMap&&(v=p.lightMap),v!==void 0&&(v.isWebGLRenderTarget&&(v=v.texture),v.matrixAutoUpdate===!0&&v.updateMatrix(),f.uv2Transform.value.copy(v.matrix))}function s(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity}function r(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function o(f,p,_,b){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*_,f.scale.value=b*.5,p.map&&(f.map.value=p.map),p.alphaMap&&(f.alphaMap.value=p.alphaMap),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);let v;p.map?v=p.map:p.alphaMap&&(v=p.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),f.uvTransform.value.copy(v.matrix))}function l(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map),p.alphaMap&&(f.alphaMap.value=p.alphaMap),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);let _;p.map?_=p.map:p.alphaMap&&(_=p.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),f.uvTransform.value.copy(_.matrix))}function c(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function h(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function u(f,p){f.roughness.value=p.roughness,f.metalness.value=p.metalness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap),e.get(p).envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function d(f,p,_){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),f.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===hi&&f.clearcoatNormalScale.value.negate())),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap)),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=_.texture,f.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap)}function m(f,p){p.matcap&&(f.matcap.value=p.matcap)}function g(f,p){f.referencePosition.value.copy(p.referencePosition),f.nearDistance.value=p.nearDistance,f.farDistance.value=p.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function E0(a,e,t,i){let n={},s={},r=[];const o=t.isWebGL2?a.getParameter(35375):0;function l(b,v){const M=v.program;i.uniformBlockBinding(b,M)}function c(b,v){let M=n[b.id];M===void 0&&(g(b),M=h(b),n[b.id]=M,b.addEventListener("dispose",p));const y=v.program;i.updateUBOMapping(b,y);const A=e.render.frame;s[b.id]!==A&&(d(b),s[b.id]=A)}function h(b){const v=u();b.__bindingPointIndex=v;const M=a.createBuffer(),y=b.__size,A=b.usage;return a.bindBuffer(35345,M),a.bufferData(35345,y,A),a.bindBuffer(35345,null),a.bindBufferBase(35345,v,M),M}function u(){for(let b=0;b<o;b++)if(r.indexOf(b)===-1)return r.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const v=n[b.id],M=b.uniforms,y=b.__cache;a.bindBuffer(35345,v);for(let A=0,C=M.length;A<C;A++){const x=M[A];if(m(x,A,y)===!0){const S=x.__offset,R=Array.isArray(x.value)?x.value:[x.value];let B=0;for(let K=0;K<R.length;K++){const D=R[K],I=f(D);typeof D=="number"?(x.__data[0]=D,a.bufferSubData(35345,S+B,x.__data)):D.isMatrix3?(x.__data[0]=D.elements[0],x.__data[1]=D.elements[1],x.__data[2]=D.elements[2],x.__data[3]=D.elements[0],x.__data[4]=D.elements[3],x.__data[5]=D.elements[4],x.__data[6]=D.elements[5],x.__data[7]=D.elements[0],x.__data[8]=D.elements[6],x.__data[9]=D.elements[7],x.__data[10]=D.elements[8],x.__data[11]=D.elements[0]):(D.toArray(x.__data,B),B+=I.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(35345,S,x.__data)}}a.bindBuffer(35345,null)}function m(b,v,M){const y=b.value;if(M[v]===void 0){if(typeof y=="number")M[v]=y;else{const A=Array.isArray(y)?y:[y],C=[];for(let x=0;x<A.length;x++)C.push(A[x].clone());M[v]=C}return!0}else if(typeof y=="number"){if(M[v]!==y)return M[v]=y,!0}else{const A=Array.isArray(M[v])?M[v]:[M[v]],C=Array.isArray(y)?y:[y];for(let x=0;x<A.length;x++){const S=A[x];if(S.equals(C[x])===!1)return S.copy(C[x]),!0}}return!1}function g(b){const v=b.uniforms;let M=0;const y=16;let A=0;for(let C=0,x=v.length;C<x;C++){const S=v[C],R={boundary:0,storage:0},B=Array.isArray(S.value)?S.value:[S.value];for(let K=0,D=B.length;K<D;K++){const I=B[K],z=f(I);R.boundary+=z.boundary,R.storage+=z.storage}if(S.__data=new Float32Array(R.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=M,C>0){A=M%y;const K=y-A;A!==0&&K-R.boundary<0&&(M+=y-A,S.__offset=M)}M+=R.storage}return A=M%y,A>0&&(M+=y-A),b.__size=M,b.__cache={},this}function f(b){const v={boundary:0,storage:0};return typeof b=="number"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function p(b){const v=b.target;v.removeEventListener("dispose",p);const M=r.indexOf(v.__bindingPointIndex);r.splice(M,1),a.deleteBuffer(n[v.id]),delete n[v.id],delete s[v.id]}function _(){for(const b in n)a.deleteBuffer(n[b]);r=[],n={},s={}}return{bind:l,update:c,dispose:_}}function C0(){const a=lr("canvas");return a.style.display="block",a}function iu(a={}){this.isWebGLRenderer=!0;const e=a.canvas!==void 0?a.canvas:C0(),t=a.context!==void 0?a.context:null,i=a.depth!==void 0?a.depth:!0,n=a.stencil!==void 0?a.stencil:!0,s=a.antialias!==void 0?a.antialias:!1,r=a.premultipliedAlpha!==void 0?a.premultipliedAlpha:!0,o=a.preserveDrawingBuffer!==void 0?a.preserveDrawingBuffer:!1,l=a.powerPreference!==void 0?a.powerPreference:"default",c=a.failIfMajorPerformanceCaveat!==void 0?a.failIfMajorPerformanceCaveat:!1;let h;t!==null?h=t.getContextAttributes().alpha:h=a.alpha!==void 0?a.alpha:!1;let u=null,d=null;const m=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=kn,this.physicallyCorrectLights=!1,this.toneMapping=Vi,this.toneMappingExposure=1;const f=this;let p=!1,_=0,b=0,v=null,M=-1,y=null;const A=new qe,C=new qe;let x=null,S=e.width,R=e.height,B=1,K=null,D=null;const I=new qe(0,0,S,R),z=new qe(0,0,S,R);let $=!1;const Y=new tl;let U=!1,ee=!1,Z=null;const V=new Ce,G=new ye,Q=new P,J={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function se(){return v===null?B:1}let X=t;function Le(T,F){for(let j=0;j<T.length;j++){const O=T[j],q=e.getContext(O,F);if(q!==null)return q}return null}try{const T={alpha:!0,depth:i,stencil:n,antialias:s,premultipliedAlpha:r,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ka}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",Pe,!1),X===null){const F=["webgl2","webgl","experimental-webgl"];if(f.isWebGL1Renderer===!0&&F.shift(),X=Le(F,T),X===null)throw Le(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}X.getShaderPrecisionFormat===void 0&&(X.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let de,_e,ue,ze,we,xe,ft,at,lt,Lt,et,Ge,Qt,Nt,E,w,H,ie,ne,oe,ve,L,N,le;function he(){de=new zg(X),_e=new Ig(X,de,a),de.init(_e),L=new b0(X,de,_e),ue=new v0(X,de,_e),ze=new Gg,we=new r0,xe=new y0(X,de,ue,we,_e,L,ze),ft=new Ng(f),at=new Bg(f),lt=new Zf(X,_e),N=new Rg(X,de,lt,_e),Lt=new Ug(X,lt,ze,N),et=new Xg(X,Lt,lt,ze),ne=new jg(X,_e,xe),w=new kg(we),Ge=new s0(f,ft,at,de,_e,N,w),Qt=new A0(f,we),Nt=new a0,E=new f0(de,_e),ie=new Pg(f,ft,at,ue,et,h,r),H=new x0(f,et,_e),le=new E0(X,ze,_e,ue),oe=new Dg(X,de,ze,_e),ve=new Vg(X,de,ze,_e),ze.programs=Ge.programs,f.capabilities=_e,f.extensions=de,f.properties=we,f.renderLists=Nt,f.shadowMap=H,f.state=ue,f.info=ze}he();const ae=new T0(f,X);this.xr=ae,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const T=de.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=de.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(S,R,!1))},this.getSize=function(T){return T.set(S,R)},this.setSize=function(T,F,j){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}S=T,R=F,e.width=Math.floor(T*B),e.height=Math.floor(F*B),j!==!1&&(e.style.width=T+"px",e.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(S*B,R*B).floor()},this.setDrawingBufferSize=function(T,F,j){S=T,R=F,B=j,e.width=Math.floor(T*j),e.height=Math.floor(F*j),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(A)},this.getViewport=function(T){return T.copy(I)},this.setViewport=function(T,F,j,O){T.isVector4?I.set(T.x,T.y,T.z,T.w):I.set(T,F,j,O),ue.viewport(A.copy(I).multiplyScalar(B).floor())},this.getScissor=function(T){return T.copy(z)},this.setScissor=function(T,F,j,O){T.isVector4?z.set(T.x,T.y,T.z,T.w):z.set(T,F,j,O),ue.scissor(C.copy(z).multiplyScalar(B).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(T){ue.setScissorTest($=T)},this.setOpaqueSort=function(T){K=T},this.setTransparentSort=function(T){D=T},this.getClearColor=function(T){return T.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor.apply(ie,arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha.apply(ie,arguments)},this.clear=function(T=!0,F=!0,j=!0){let O=0;T&&(O|=16384),F&&(O|=256),j&&(O|=1024),X.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Pe,!1),Nt.dispose(),E.dispose(),we.dispose(),ft.dispose(),at.dispose(),et.dispose(),N.dispose(),le.dispose(),Ge.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",ce),ae.removeEventListener("sessionend",me),Z&&(Z.dispose(),Z=null),Ue.stop()};function pe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),p=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),p=!1;const T=ze.autoReset,F=H.enabled,j=H.autoUpdate,O=H.needsUpdate,q=H.type;he(),ze.autoReset=T,H.enabled=F,H.autoUpdate=j,H.needsUpdate=O,H.type=q}function Pe(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ie(T){const F=T.target;F.removeEventListener("dispose",Ie),He(F)}function He(T){k(T),we.remove(T)}function k(T){const F=we.get(T).programs;F!==void 0&&(F.forEach(function(j){Ge.releaseProgram(j)}),T.isShaderMaterial&&Ge.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,j,O,q,ge){F===null&&(F=J);const be=q.isMesh&&q.matrixWorld.determinant()<0,Ae=pd(T,F,j,O,q);ue.setMaterial(O,be);let Ee=j.index,Be=1;O.wireframe===!0&&(Ee=Lt.getWireframeAttribute(j),Be=2);const ke=j.drawRange,Ne=j.attributes.position;let it=ke.start*Be,Gt=(ke.start+ke.count)*Be;ge!==null&&(it=Math.max(it,ge.start*Be),Gt=Math.min(Gt,(ge.start+ge.count)*Be)),Ee!==null?(it=Math.max(it,0),Gt=Math.min(Gt,Ee.count)):Ne!=null&&(it=Math.max(it,0),Gt=Math.min(Gt,Ne.count));const Li=Gt-it;if(Li<0||Li===1/0)return;N.setup(q,O,Ae,j,Ee);let dn,nt=oe;if(Ee!==null&&(dn=lt.get(Ee),nt=ve,nt.setIndex(dn)),q.isMesh)O.wireframe===!0?(ue.setLineWidth(O.wireframeLinewidth*se()),nt.setMode(1)):nt.setMode(4);else if(q.isLine){let Oe=O.linewidth;Oe===void 0&&(Oe=1),ue.setLineWidth(Oe*se()),q.isLineSegments?nt.setMode(1):q.isLineLoop?nt.setMode(2):nt.setMode(3)}else q.isPoints?nt.setMode(0):q.isSprite&&nt.setMode(4);if(q.isInstancedMesh)nt.renderInstances(it,Li,q.count);else if(j.isInstancedBufferGeometry){const Oe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Mo=Math.min(j.instanceCount,Oe);nt.renderInstances(it,Li,Mo)}else nt.render(it,Li)},this.compile=function(T,F){function j(O,q,ge){O.transparent===!0&&O.side===Mr?(O.side=hi,O.needsUpdate=!0,ei(O,q,ge),O.side=on,O.needsUpdate=!0,ei(O,q,ge),O.side=Mr):ei(O,q,ge)}d=E.get(T),d.init(),g.push(d),T.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(d.pushLight(O),O.castShadow&&d.pushShadow(O))}),d.setupLights(f.physicallyCorrectLights),T.traverse(function(O){const q=O.material;if(q)if(Array.isArray(q))for(let ge=0;ge<q.length;ge++){const be=q[ge];j(be,T,O)}else j(q,T,O)}),g.pop(),d=null};let W=null;function te(T){W&&W(T)}function ce(){Ue.stop()}function me(){Ue.start()}const Ue=new Zh;Ue.setAnimationLoop(te),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(T){W=T,ae.setAnimationLoop(T),T===null?Ue.stop():Ue.start()},ae.addEventListener("sessionstart",ce),ae.addEventListener("sessionend",me),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(F),F=ae.getCamera()),T.isScene===!0&&T.onBeforeRender(f,T,F,v),d=E.get(T,g.length),d.init(),g.push(d),V.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Y.setFromProjectionMatrix(V),ee=this.localClippingEnabled,U=w.init(this.clippingPlanes,ee,F),u=Nt.get(T,m.length),u.init(),m.push(u),pt(T,F,0,f.sortObjects),u.finish(),f.sortObjects===!0&&u.sort(K,D),U===!0&&w.beginShadows();const j=d.state.shadowsArray;if(H.render(j,T,F),U===!0&&w.endShadows(),this.info.autoReset===!0&&this.info.reset(),ie.render(u,T),d.setupLights(f.physicallyCorrectLights),F.isArrayCamera){const O=F.cameras;for(let q=0,ge=O.length;q<ge;q++){const be=O[q];Mt(u,T,be,be.viewport)}}else Mt(u,T,F);v!==null&&(xe.updateMultisampleRenderTarget(v),xe.updateRenderTargetMipmap(v)),T.isScene===!0&&T.onAfterRender(f,T,F),N.resetDefaultState(),M=-1,y=null,g.pop(),g.length>0?d=g[g.length-1]:d=null,m.pop(),m.length>0?u=m[m.length-1]:u=null};function pt(T,F,j,O){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Y.intersectsSprite(T)){O&&Q.setFromMatrixPosition(T.matrixWorld).applyMatrix4(V);const be=et.update(T),Ae=T.material;Ae.visible&&u.push(T,be,Ae,j,Q.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(T.isSkinnedMesh&&T.skeleton.frame!==ze.render.frame&&(T.skeleton.update(),T.skeleton.frame=ze.render.frame),!T.frustumCulled||Y.intersectsObject(T))){O&&Q.setFromMatrixPosition(T.matrixWorld).applyMatrix4(V);const be=et.update(T),Ae=T.material;if(Array.isArray(Ae)){const Ee=be.groups;for(let Be=0,ke=Ee.length;Be<ke;Be++){const Ne=Ee[Be],it=Ae[Ne.materialIndex];it&&it.visible&&u.push(T,be,it,j,Q.z,Ne)}}else Ae.visible&&u.push(T,be,Ae,j,Q.z,null)}}const ge=T.children;for(let be=0,Ae=ge.length;be<Ae;be++)pt(ge[be],F,j,O)}function Mt(T,F,j,O){const q=T.opaque,ge=T.transmissive,be=T.transparent;d.setupLightsView(j),ge.length>0&&un(q,F,j),O&&ue.viewport(A.copy(O)),q.length>0&&Ye(q,F,j),ge.length>0&&Ye(ge,F,j),be.length>0&&Ye(be,F,j),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function un(T,F,j){const O=_e.isWebGL2;Z===null&&(Z=new Nn(1,1,{generateMipmaps:!0,type:de.has("EXT_color_buffer_half_float")?sr:In,minFilter:Dn,samples:O&&s===!0?4:0})),f.getDrawingBufferSize(G),O?Z.setSize(G.x,G.y):Z.setSize(io(G.x),io(G.y));const q=f.getRenderTarget();f.setRenderTarget(Z),f.clear();const ge=f.toneMapping;f.toneMapping=Vi,Ye(T,F,j),f.toneMapping=ge,xe.updateMultisampleRenderTarget(Z),xe.updateRenderTargetMipmap(Z),f.setRenderTarget(q)}function Ye(T,F,j){const O=F.isScene===!0?F.overrideMaterial:null;for(let q=0,ge=T.length;q<ge;q++){const be=T[q],Ae=be.object,Ee=be.geometry,Be=O===null?be.material:O,ke=be.group;Ae.layers.test(j.layers)&&Ci(Ae,F,j,Ee,Be,ke)}}function Ci(T,F,j,O,q,ge){T.onBeforeRender(f,F,j,O,q,ge),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),q.onBeforeRender(f,F,j,O,T,ge),q.transparent===!0&&q.side===Mr?(q.side=hi,q.needsUpdate=!0,f.renderBufferDirect(j,F,O,q,T,ge),q.side=on,q.needsUpdate=!0,f.renderBufferDirect(j,F,O,q,T,ge),q.side=Mr):f.renderBufferDirect(j,F,O,q,T,ge),T.onAfterRender(f,F,j,O,q,ge)}function ei(T,F,j){F.isScene!==!0&&(F=J);const O=we.get(T),q=d.state.lights,ge=d.state.shadowsArray,be=q.state.version,Ae=Ge.getParameters(T,q.state,ge,F,j),Ee=Ge.getProgramCacheKey(Ae);let Be=O.programs;O.environment=T.isMeshStandardMaterial?F.environment:null,O.fog=F.fog,O.envMap=(T.isMeshStandardMaterial?at:ft).get(T.envMap||O.environment),Be===void 0&&(T.addEventListener("dispose",Ie),Be=new Map,O.programs=Be);let ke=Be.get(Ee);if(ke!==void 0){if(O.currentProgram===ke&&O.lightsStateVersion===be)return Ll(T,Ae),ke}else Ae.uniforms=Ge.getUniforms(T),T.onBuild(j,Ae,f),T.onBeforeCompile(Ae,f),ke=Ge.acquireProgram(Ae,Ee),Be.set(Ee,ke),O.uniforms=Ae.uniforms;const Ne=O.uniforms;(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ne.clippingPlanes=w.uniform),Ll(T,Ae),O.needsLights=gd(T),O.lightsStateVersion=be,O.needsLights&&(Ne.ambientLightColor.value=q.state.ambient,Ne.lightProbe.value=q.state.probe,Ne.directionalLights.value=q.state.directional,Ne.directionalLightShadows.value=q.state.directionalShadow,Ne.spotLights.value=q.state.spot,Ne.spotLightShadows.value=q.state.spotShadow,Ne.rectAreaLights.value=q.state.rectArea,Ne.ltc_1.value=q.state.rectAreaLTC1,Ne.ltc_2.value=q.state.rectAreaLTC2,Ne.pointLights.value=q.state.point,Ne.pointLightShadows.value=q.state.pointShadow,Ne.hemisphereLights.value=q.state.hemi,Ne.directionalShadowMap.value=q.state.directionalShadowMap,Ne.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ne.spotShadowMap.value=q.state.spotShadowMap,Ne.spotLightMatrix.value=q.state.spotLightMatrix,Ne.spotLightMap.value=q.state.spotLightMap,Ne.pointShadowMap.value=q.state.pointShadowMap,Ne.pointShadowMatrix.value=q.state.pointShadowMatrix);const it=ke.getUniforms(),Gt=Kr.seqWithValue(it.seq,Ne);return O.currentProgram=ke,O.uniformsList=Gt,ke}function Ll(T,F){const j=we.get(T);j.outputEncoding=F.outputEncoding,j.instancing=F.instancing,j.skinning=F.skinning,j.morphTargets=F.morphTargets,j.morphNormals=F.morphNormals,j.morphColors=F.morphColors,j.morphTargetsCount=F.morphTargetsCount,j.numClippingPlanes=F.numClippingPlanes,j.numIntersection=F.numClipIntersection,j.vertexAlphas=F.vertexAlphas,j.vertexTangents=F.vertexTangents,j.toneMapping=F.toneMapping}function pd(T,F,j,O,q){F.isScene!==!0&&(F=J),xe.resetTextureUnits();const ge=F.fog,be=O.isMeshStandardMaterial?F.environment:null,Ae=v===null?f.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:kn,Ee=(O.isMeshStandardMaterial?at:ft).get(O.envMap||be),Be=O.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,ke=!!O.normalMap&&!!j.attributes.tangent,Ne=!!j.morphAttributes.position,it=!!j.morphAttributes.normal,Gt=!!j.morphAttributes.color,Li=O.toneMapped?f.toneMapping:Vi,dn=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,nt=dn!==void 0?dn.length:0,Oe=we.get(O),Mo=d.state.lights;if(U===!0&&(ee===!0||T!==y)){const Ht=T===y&&O.id===M;w.setState(O,T,Ht)}let mt=!1;O.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Mo.state.version||Oe.outputEncoding!==Ae||q.isInstancedMesh&&Oe.instancing===!1||!q.isInstancedMesh&&Oe.instancing===!0||q.isSkinnedMesh&&Oe.skinning===!1||!q.isSkinnedMesh&&Oe.skinning===!0||Oe.envMap!==Ee||O.fog===!0&&Oe.fog!==ge||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==w.numPlanes||Oe.numIntersection!==w.numIntersection)||Oe.vertexAlphas!==Be||Oe.vertexTangents!==ke||Oe.morphTargets!==Ne||Oe.morphNormals!==it||Oe.morphColors!==Gt||Oe.toneMapping!==Li||_e.isWebGL2===!0&&Oe.morphTargetsCount!==nt)&&(mt=!0):(mt=!0,Oe.__version=O.version);let fn=Oe.currentProgram;mt===!0&&(fn=ei(O,F,q));let Pl=!1,Os=!1,wo=!1;const Pt=fn.getUniforms(),pn=Oe.uniforms;if(ue.useProgram(fn.program)&&(Pl=!0,Os=!0,wo=!0),O.id!==M&&(M=O.id,Os=!0),Pl||y!==T){if(Pt.setValue(X,"projectionMatrix",T.projectionMatrix),_e.logarithmicDepthBuffer&&Pt.setValue(X,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),y!==T&&(y=T,Os=!0,wo=!0),O.isShaderMaterial||O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshStandardMaterial||O.envMap){const Ht=Pt.map.cameraPosition;Ht!==void 0&&Ht.setValue(X,Q.setFromMatrixPosition(T.matrixWorld))}(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Pt.setValue(X,"isOrthographic",T.isOrthographicCamera===!0),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial||O.isShadowMaterial||q.isSkinnedMesh)&&Pt.setValue(X,"viewMatrix",T.matrixWorldInverse)}if(q.isSkinnedMesh){Pt.setOptional(X,q,"bindMatrix"),Pt.setOptional(X,q,"bindMatrixInverse");const Ht=q.skeleton;Ht&&(_e.floatVertexTextures?(Ht.boneTexture===null&&Ht.computeBoneTexture(),Pt.setValue(X,"boneTexture",Ht.boneTexture,xe),Pt.setValue(X,"boneTextureSize",Ht.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const So=j.morphAttributes;if((So.position!==void 0||So.normal!==void 0||So.color!==void 0&&_e.isWebGL2===!0)&&ne.update(q,j,O,fn),(Os||Oe.receiveShadow!==q.receiveShadow)&&(Oe.receiveShadow=q.receiveShadow,Pt.setValue(X,"receiveShadow",q.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(pn.envMap.value=Ee,pn.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),Os&&(Pt.setValue(X,"toneMappingExposure",f.toneMappingExposure),Oe.needsLights&&md(pn,wo),ge&&O.fog===!0&&Qt.refreshFogUniforms(pn,ge),Qt.refreshMaterialUniforms(pn,O,B,R,Z),Kr.upload(X,Oe.uniformsList,pn,xe)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Kr.upload(X,Oe.uniformsList,pn,xe),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Pt.setValue(X,"center",q.center),Pt.setValue(X,"modelViewMatrix",q.modelViewMatrix),Pt.setValue(X,"normalMatrix",q.normalMatrix),Pt.setValue(X,"modelMatrix",q.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Ht=O.uniformsGroups;for(let To=0,_d=Ht.length;To<_d;To++)if(_e.isWebGL2){const Rl=Ht[To];le.update(Rl,fn),le.bind(Rl,fn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return fn}function md(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function gd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(T,F,j){we.get(T.texture).__webglTexture=F,we.get(T.depthTexture).__webglTexture=j;const O=we.get(T);O.__hasExternalTextures=!0,O.__hasExternalTextures&&(O.__autoAllocateDepthBuffer=j===void 0,O.__autoAllocateDepthBuffer||de.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,F){const j=we.get(T);j.__webglFramebuffer=F,j.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,j=0){v=T,_=F,b=j;let O=!0,q=null,ge=!1,be=!1;if(T){const Ee=we.get(T);Ee.__useDefaultFramebuffer!==void 0?(ue.bindFramebuffer(36160,null),O=!1):Ee.__webglFramebuffer===void 0?xe.setupRenderTarget(T):Ee.__hasExternalTextures&&xe.rebindTextures(T,we.get(T.texture).__webglTexture,we.get(T.depthTexture).__webglTexture);const Be=T.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(be=!0);const ke=we.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(q=ke[F],ge=!0):_e.isWebGL2&&T.samples>0&&xe.useMultisampledRTT(T)===!1?q=we.get(T).__webglMultisampledFramebuffer:q=ke,A.copy(T.viewport),C.copy(T.scissor),x=T.scissorTest}else A.copy(I).multiplyScalar(B).floor(),C.copy(z).multiplyScalar(B).floor(),x=$;if(ue.bindFramebuffer(36160,q)&&_e.drawBuffers&&O&&ue.drawBuffers(T,q),ue.viewport(A),ue.scissor(C),ue.setScissorTest(x),ge){const Ee=we.get(T.texture);X.framebufferTexture2D(36160,36064,34069+F,Ee.__webglTexture,j)}else if(be){const Ee=we.get(T.texture),Be=F||0;X.framebufferTextureLayer(36160,36064,Ee.__webglTexture,j||0,Be)}M=-1},this.readRenderTargetPixels=function(T,F,j,O,q,ge,be){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=we.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae){ue.bindFramebuffer(36160,Ae);try{const Ee=T.texture,Be=Ee.format,ke=Ee.type;if(Be!==oi&&L.convert(Be)!==X.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ne=ke===sr&&(de.has("EXT_color_buffer_half_float")||_e.isWebGL2&&de.has("EXT_color_buffer_float"));if(ke!==In&&L.convert(ke)!==X.getParameter(35738)&&!(ke===Ji&&(_e.isWebGL2||de.has("OES_texture_float")||de.has("WEBGL_color_buffer_float")))&&!Ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-O&&j>=0&&j<=T.height-q&&X.readPixels(F,j,O,q,L.convert(Be),L.convert(ke),ge)}finally{const Ee=v!==null?we.get(v).__webglFramebuffer:null;ue.bindFramebuffer(36160,Ee)}}},this.copyFramebufferToTexture=function(T,F,j=0){const O=Math.pow(2,-j),q=Math.floor(F.image.width*O),ge=Math.floor(F.image.height*O);xe.setTexture2D(F,0),X.copyTexSubImage2D(3553,j,0,0,T.x,T.y,q,ge),ue.unbindTexture()},this.copyTextureToTexture=function(T,F,j,O=0){const q=F.image.width,ge=F.image.height,be=L.convert(j.format),Ae=L.convert(j.type);xe.setTexture2D(j,0),X.pixelStorei(37440,j.flipY),X.pixelStorei(37441,j.premultiplyAlpha),X.pixelStorei(3317,j.unpackAlignment),F.isDataTexture?X.texSubImage2D(3553,O,T.x,T.y,q,ge,be,Ae,F.image.data):F.isCompressedTexture?X.compressedTexSubImage2D(3553,O,T.x,T.y,F.mipmaps[0].width,F.mipmaps[0].height,be,F.mipmaps[0].data):X.texSubImage2D(3553,O,T.x,T.y,be,Ae,F.image),O===0&&j.generateMipmaps&&X.generateMipmap(3553),ue.unbindTexture()},this.copyTextureToTexture3D=function(T,F,j,O,q=0){if(f.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ge=T.max.x-T.min.x+1,be=T.max.y-T.min.y+1,Ae=T.max.z-T.min.z+1,Ee=L.convert(O.format),Be=L.convert(O.type);let ke;if(O.isData3DTexture)xe.setTexture3D(O,0),ke=32879;else if(O.isDataArrayTexture)xe.setTexture2DArray(O,0),ke=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}X.pixelStorei(37440,O.flipY),X.pixelStorei(37441,O.premultiplyAlpha),X.pixelStorei(3317,O.unpackAlignment);const Ne=X.getParameter(3314),it=X.getParameter(32878),Gt=X.getParameter(3316),Li=X.getParameter(3315),dn=X.getParameter(32877),nt=j.isCompressedTexture?j.mipmaps[0]:j.image;X.pixelStorei(3314,nt.width),X.pixelStorei(32878,nt.height),X.pixelStorei(3316,T.min.x),X.pixelStorei(3315,T.min.y),X.pixelStorei(32877,T.min.z),j.isDataTexture||j.isData3DTexture?X.texSubImage3D(ke,q,F.x,F.y,F.z,ge,be,Ae,Ee,Be,nt.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),X.compressedTexSubImage3D(ke,q,F.x,F.y,F.z,ge,be,Ae,Ee,nt.data)):X.texSubImage3D(ke,q,F.x,F.y,F.z,ge,be,Ae,Ee,Be,nt),X.pixelStorei(3314,Ne),X.pixelStorei(32878,it),X.pixelStorei(3316,Gt),X.pixelStorei(3315,Li),X.pixelStorei(32877,dn),q===0&&O.generateMipmaps&&X.generateMipmap(ke),ue.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?xe.setTextureCube(T,0):T.isData3DTexture?xe.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?xe.setTexture2DArray(T,0):xe.setTexture2D(T,0),ue.unbindTexture()},this.resetState=function(){_=0,b=0,v=null,ue.reset(),N.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class L0 extends iu{}L0.prototype.isWebGL1Renderer=!0;class sl{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Te(e),this.near=t,this.far=i}clone(){return new sl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}}}class P0 extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class R0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Sa,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=gi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,s=this.stride;n<s;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new P;class rl{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}setX(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=zi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=zi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=zi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=zi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),i=je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),i=je(i,this.array),n=je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=je(t,this.array),i=je(i,this.array),n=je(n,this.array),s=je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return new bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new rl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const zc=new P,Uc=new qe,Vc=new qe,D0=new P,Gc=new Ce;class I0 extends Re{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Ce,this.bindMatrixInverse=new Ce}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new qe,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const i=this.skeleton,n=this.geometry;Uc.fromBufferAttribute(n.attributes.skinIndex,e),Vc.fromBufferAttribute(n.attributes.skinWeight,e),zc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const r=Vc.getComponent(s);if(r!==0){const o=Uc.getComponent(s);Gc.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(D0.copy(zc).applyMatrix4(Gc),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class nu extends Ze{constructor(){super(),this.isBone=!0,this.type="Bone"}}class k0 extends _t{constructor(e=null,t=1,i=1,n,s,r,o,l,c=rt,h=rt,u,d){super(null,r,o,l,c,h,n,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Hc=new Ce,N0=new Ce;class ol{constructor(e=[],t=[]){this.uuid=gi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new Ce)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Ce;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const o=e[s]?e[s].matrixWorld:N0;Hc.multiplyMatrices(o,t[s]),Hc.toArray(i,s*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new ol(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Vh(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new k0(t,e,e,oi,Ji);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){const s=e.bones[i];let r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new nu),this.bones.push(r),this.boneInverses.push(new Ce().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let n=0,s=t.length;n<s;n++){const r=t[n];e.bones.push(r.uuid);const o=i[n];e.boneInverses.push(o.toArray())}return e}}class Wc extends bt{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const jc=new Ce,Xc=new Ce,Vr=[],O0=new Ce,Ws=new Re;class F0 extends Re{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wc(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.frustumCulled=!1;for(let n=0;n<i;n++)this.setMatrixAt(n,O0)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,n=this.count;if(Ws.geometry=this.geometry,Ws.material=this.material,Ws.material!==void 0)for(let s=0;s<n;s++){this.getMatrixAt(s,jc),Xc.multiplyMatrices(i,jc),Ws.matrixWorld=Xc,Ws.raycast(e,Vr);for(let r=0,o=Vr.length;r<o;r++){const l=Vr[r];l.instanceId=s,l.object=this,t.push(l)}Vr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Wc(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class su extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Te(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qc=new P,Yc=new P,$c=new Ce,ia=new go,Gr=new Ds;class al extends Ze{constructor(e=new xi,t=new su){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,s=t.count;n<s;n++)qc.fromBufferAttribute(t,n-1),Yc.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=qc.distanceTo(Yc);e.setAttribute("lineDistance",new Gi(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Gr.copy(i.boundingSphere),Gr.applyMatrix4(n),Gr.radius+=s,e.ray.intersectsSphere(Gr)===!1)return;$c.copy(n).invert(),ia.copy(e.ray).applyMatrix4($c);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new P,h=new P,u=new P,d=new P,m=this.isLineSegments?2:1,g=i.index,p=i.attributes.position;if(g!==null){const _=Math.max(0,r.start),b=Math.min(g.count,r.start+r.count);for(let v=_,M=b-1;v<M;v+=m){const y=g.getX(v),A=g.getX(v+1);if(c.fromBufferAttribute(p,y),h.fromBufferAttribute(p,A),ia.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const x=e.ray.origin.distanceTo(d);x<e.near||x>e.far||t.push({distance:x,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,r.start),b=Math.min(p.count,r.start+r.count);for(let v=_,M=b-1;v<M;v+=m){if(c.fromBufferAttribute(p,v),h.fromBufferAttribute(p,v+1),ia.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(d);A<e.near||A>e.far||t.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Kc=new P,Zc=new P;class B0 extends al{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,s=t.count;n<s;n+=2)Kc.fromBufferAttribute(t,n),Zc.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Kc.distanceTo(Zc);e.setAttribute("lineDistance",new Gi(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class z0 extends al{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ru extends wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Jc=new Ce,Ca=new go,Hr=new Ds,Wr=new P;class U0 extends Ze{constructor(e=new xi,t=new ru){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Hr.copy(i.boundingSphere),Hr.applyMatrix4(n),Hr.radius+=s,e.ray.intersectsSphere(Hr)===!1)return;Jc.copy(n).invert(),Ca.copy(e.ray).applyMatrix4(Jc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,r.start),m=Math.min(c.count,r.start+r.count);for(let g=d,f=m;g<f;g++){const p=c.getX(g);Wr.fromBufferAttribute(u,p),Qc(Wr,p,l,n,e,t,this)}}else{const d=Math.max(0,r.start),m=Math.min(u.count,r.start+r.count);for(let g=d,f=m;g<f;g++)Wr.fromBufferAttribute(u,g),Qc(Wr,g,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Qc(a,e,t,i,n,s,r){const o=Ca.distanceSqToPoint(a);if(o<t){const l=new P;Ca.closestPointToPoint(a,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:r})}}class V0 extends _t{constructor(e,t,i,n,s,r,o,l,c){super(e,t,i,n,s,r,o,l,c),this.isVideoTexture=!0,this.minFilter=r!==void 0?r:St,this.magFilter=s!==void 0?s:St,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class Je extends wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uh,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class zn extends Je{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Te(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function $i(a,e,t){return ou(a)?new a.constructor(a.subarray(e,t!==void 0?t:a.length)):a.slice(e,t)}function jr(a,e,t){return!a||!t&&a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function ou(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function G0(a){function e(n,s){return a[n]-a[s]}const t=a.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function eh(a,e,t){const i=a.length,n=new a.constructor(i);for(let s=0,r=0;r!==i;++s){const o=t[s]*e;for(let l=0;l!==e;++l)n[r++]=a[o+l]}return n}function au(a,e,t,i){let n=1,s=a[0];for(;s!==void 0&&s[i]===void 0;)s=a[n++];if(s===void 0)return;let r=s[i];if(r!==void 0)if(Array.isArray(r))do r=s[i],r!==void 0&&(e.push(s.time),t.push.apply(t,r)),s=a[n++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[i],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=a[n++];while(s!==void 0);else do r=s[i],r!==void 0&&(e.push(s.time),t.push(r)),s=a[n++];while(s!==void 0)}class yr{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,n=t[i],s=t[i-1];e:{t:{let r;i:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<s)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=n,n=t[++i],e<n)break t}r=t.length;break i}if(!(e>=s)){const o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=s,s=t[--i-1],e>=s)break t}r=i,i=0;break i}break e}for(;i<r;){const o=i+r>>>1;e<t[o]?r=o:i=o+1}if(n=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,n)}return this.interpolate_(i,s,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,s=e*n;for(let r=0;r!==n;++r)t[r]=i[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class H0 extends yr{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:os,endingEnd:os}}intervalChanged_(e,t,i){const n=this.parameterPositions;let s=e-2,r=e+1,o=n[s],l=n[r];if(o===void 0)switch(this.getSettings_().endingStart){case as:s=e,o=2*t-i;break;case to:s=n.length-2,o=t+n[s]-n[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case as:r=e,l=2*i-t;break;case to:r=1,l=i+n[1]-n[0];break;default:r=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,g=(i-t)/(n-t),f=g*g,p=f*g,_=-d*p+2*d*f-d*g,b=(1+d)*p+(-1.5-2*d)*f+(-.5+d)*g+1,v=(-1-m)*p+(1.5+m)*f+.5*g,M=m*p-m*f;for(let y=0;y!==o;++y)s[y]=_*r[h+y]+b*r[c+y]+v*r[l+y]+M*r[u+y];return s}}class lu extends yr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(n-t),u=1-h;for(let d=0;d!==o;++d)s[d]=r[c+d]*u+r[l+d]*h;return s}}class W0 extends yr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ei{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=jr(t,this.TimeBufferType),this.values=jr(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:jr(e.times,Array),values:jr(e.values,Array)};const n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new W0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new lu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new H0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case rr:t=this.InterpolantFactoryMethodDiscrete;break;case bs:t=this.InterpolantFactoryMethodLinear;break;case Po:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return rr;case this.InterpolantFactoryMethodLinear:return bs;case this.InterpolantFactoryMethodSmooth:return Po}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){const i=this.times,n=i.length;let s=0,r=n-1;for(;s!==n&&i[s]<e;)++s;for(;r!==-1&&i[r]>t;)--r;if(++r,s!==0||r!==n){s>=r&&(r=Math.max(r,1),s=r-1);const o=this.getValueSize();this.times=$i(i,s,r),this.values=$i(this.values,s*o,r*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,n=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),e=!1;break}r=l}if(n!==void 0&&ou(n))for(let o=0,l=n.length;o!==l;++o){const c=n[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=$i(this.times),t=$i(this.values),i=this.getValueSize(),n=this.getInterpolation()===Po,s=e.length-1;let r=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(n)l=!0;else{const u=o*i,d=u-i,m=u+i;for(let g=0;g!==i;++g){const f=t[u+g];if(f!==t[d+g]||f!==t[m+g]){l=!0;break}}}if(l){if(o!==r){e[r]=e[o];const u=o*i,d=r*i;for(let m=0;m!==i;++m)t[d+m]=t[u+m]}++r}}if(s>0){e[r]=e[s];for(let o=s*i,l=r*i,c=0;c!==i;++c)t[l+c]=t[o+c];++r}return r!==e.length?(this.times=$i(e,0,r),this.values=$i(t,0,r*i)):(this.times=e,this.values=t),this}clone(){const e=$i(this.times,0),t=$i(this.values,0),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}}Ei.prototype.TimeBufferType=Float32Array;Ei.prototype.ValueBufferType=Float32Array;Ei.prototype.DefaultInterpolation=bs;class ks extends Ei{}ks.prototype.ValueTypeName="bool";ks.prototype.ValueBufferType=Array;ks.prototype.DefaultInterpolation=rr;ks.prototype.InterpolantFactoryMethodLinear=void 0;ks.prototype.InterpolantFactoryMethodSmooth=void 0;class cu extends Ei{}cu.prototype.ValueTypeName="color";class cr extends Ei{}cr.prototype.ValueTypeName="number";class j0 extends yr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-t)/(n-t);let c=e*o;for(let h=c+o;c!==h;c+=4)$t.slerpFlat(s,0,r,c-o,r,c,l);return s}}class Fn extends Ei{InterpolantFactoryMethodLinear(e){return new j0(this.times,this.values,this.getValueSize(),e)}}Fn.prototype.ValueTypeName="quaternion";Fn.prototype.DefaultInterpolation=bs;Fn.prototype.InterpolantFactoryMethodSmooth=void 0;class Ns extends Ei{}Ns.prototype.ValueTypeName="string";Ns.prototype.ValueBufferType=Array;Ns.prototype.DefaultInterpolation=rr;Ns.prototype.InterpolantFactoryMethodLinear=void 0;Ns.prototype.InterpolantFactoryMethodSmooth=void 0;class hr extends Ei{}hr.prototype.ValueTypeName="vector";class La{constructor(e,t=-1,i,n=Za){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=gi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,n=1/(e.fps||1);for(let r=0,o=i.length;r!==o;++r)t.push(q0(i[r]).scale(n));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,r=i.length;s!==r;++s)t.push(Ei.toJSON(i[s]));return n}static CreateFromMorphTargetSequence(e,t,i,n){const s=t.length,r=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=G0(l);l=eh(l,1,h),c=eh(c,1,h),!n&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new cr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,r)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const n={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=n[u];d||(n[u]=d=[]),d.push(c)}}const r=[];for(const o in n)r.push(this.CreateFromMorphTargetSequence(o,n[o],t,i));return r}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(u,d,m,g,f){if(m.length!==0){const p=[],_=[];au(m,p,_,g),p.length!==0&&f.push(new u(d,p,_))}},n=[],s=e.name||"default",r=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const m={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let f=0;f<d[g].morphTargets.length;f++)m[d[g].morphTargets[f]]=-1;for(const f in m){const p=[],_=[];for(let b=0;b!==d[g].morphTargets.length;++b){const v=d[g];p.push(v.time),_.push(v.morphTarget===f?1:0)}n.push(new cr(".morphTargetInfluence["+f+"]",p,_))}l=m.length*r}else{const m=".bones["+t[u].name+"]";i(hr,m+".position",d,"pos",n),i(Fn,m+".quaternion",d,"rot",n),i(hr,m+".scale",d,"scl",n)}}return n.length===0?null:new this(s,l,n,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,n=e.length;i!==n;++i){const s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function X0(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return cr;case"vector":case"vector2":case"vector3":case"vector4":return hr;case"color":return cu;case"quaternion":return Fn;case"bool":case"boolean":return ks;case"string":return Ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function q0(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=X0(a.type);if(a.times===void 0){const t=[],i=[];au(a.keys,t,i,"value"),a.times=t,a.values=i}return e.parse!==void 0?e.parse(a):new e(a.name,a.times,a.values,a.interpolation)}const ws={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(this.files[a]=e)},get:function(a){if(this.enabled!==!1)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}};class Y0{constructor(e,t,i){const n=this;let s=!1,r=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){o++,s===!1&&n.onStart!==void 0&&n.onStart(h,r,o),s=!0},this.itemEnd=function(h){r++,n.onProgress!==void 0&&n.onProgress(h,r,o),r===o&&(s=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const m=c[u],g=c[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const $0=new Y0;class Un{constructor(e){this.manager=e!==void 0?e:$0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,s){i.load(e,n,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Ni={};class K0 extends Error{constructor(e,t){super(e),this.response=t}}class no extends Un{constructor(e){super(e)}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ws.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Ni[e]!==void 0){Ni[e].push({onLoad:t,onProgress:i,onError:n});return}Ni[e]=[],Ni[e].push({onLoad:t,onProgress:i,onError:n});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Ni[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),m=d?parseInt(d):0,g=m!==0;let f=0;const p=new ReadableStream({start(_){b();function b(){u.read().then(({done:v,value:M})=>{if(v)_.close();else{f+=M.byteLength;const y=new ProgressEvent("progress",{lengthComputable:g,loaded:f,total:m});for(let A=0,C=h.length;A<C;A++){const x=h[A];x.onProgress&&x.onProgress(y)}_.enqueue(M),b()}})}}});return new Response(p)}else throw new K0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(d);return c.arrayBuffer().then(g=>m.decode(g))}}}).then(c=>{ws.add(e,c);const h=Ni[e];delete Ni[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onLoad&&m.onLoad(c)}}).catch(c=>{const h=Ni[e];if(h===void 0)throw this.manager.itemError(e),c;delete Ni[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class hu extends Un{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=ws.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const o=lr("img");function l(){h(),ws.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),n&&n(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Z0 extends Un{constructor(e){super(e)}load(e,t,i,n){const s=new el,r=new hu(this.manager);r.setCrossOrigin(this.crossOrigin),r.setPath(this.path);let o=0;function l(c){r.load(e[c],function(h){s.images[c]=h,o++,o===6&&(s.needsUpdate=!0,t&&t(s))},void 0,n)}for(let c=0;c<e.length;++c)l(c);return s}}class uu extends Un{constructor(e){super(e)}load(e,t,i,n){const s=new _t,r=new hu(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,n),s}}class xo extends Ze{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const na=new Ce,th=new P,ih=new P;class ll{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tl,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;th.setFromMatrixPosition(e.matrixWorld),t.position.copy(th),ih.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ih),t.updateMatrixWorld(),na.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(na),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(na)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class J0 extends ll{constructor(){super(new kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=ar*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(i!==t.fov||n!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=n,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Q0 extends xo{constructor(e,t,i=0,n=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ze.DefaultUp),this.updateMatrix(),this.target=new Ze,this.distance=i,this.angle=n,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new J0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const nh=new Ce,js=new P,sa=new P;class ex extends ll{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new qe(2,1,1,1),new qe(0,1,1,1),new qe(3,1,1,1),new qe(1,1,1,1),new qe(3,0,1,1),new qe(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),js.setFromMatrixPosition(e.matrixWorld),i.position.copy(js),sa.copy(i.position),sa.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(sa),i.updateMatrixWorld(),n.makeTranslation(-js.x,-js.y,-js.z),nh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nh)}}class Pa extends xo{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new ex}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class tx extends ll{constructor(){super(new il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ix extends xo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DefaultUp),this.updateMatrix(),this.target=new Ze,this.shadow=new tx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class nx extends xo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Cn{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,n=e.length;i<n;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class sx extends Un{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=ws.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){ws.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){n&&n(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class rx{constructor(e,t,i){this.binding=e,this.valueSize=i;let n,s,r;switch(t){case"quaternion":n=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":n=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:n=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=n,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const i=this.buffer,n=this.valueSize,s=e*n+n;let r=this.cumulativeWeight;if(r===0){for(let o=0;o!==n;++o)i[s+o]=i[o];r=t}else{r+=t;const o=t/r;this._mixBufferRegion(i,s,0,o,n)}this.cumulativeWeight=r}accumulateAdditive(e){const t=this.buffer,i=this.valueSize,n=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,n,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,i=this.buffer,n=e*t+t,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(i,n,l,1-s,t)}r>0&&this._mixBufferRegionAdditive(i,n,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){o.setValue(i,n);break}}saveOriginalState(){const e=this.binding,t=this.buffer,i=this.valueSize,n=i*this._origIndex;e.getValue(t,n);for(let s=i,r=n;s!==r;++s)t[s]=t[n+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,n,s){if(n>=.5)for(let r=0;r!==s;++r)e[t+r]=e[i+r]}_slerp(e,t,i,n){$t.slerpFlat(e,t,e,t,e,i,n)}_slerpAdditive(e,t,i,n,s){const r=this._workIndex*s;$t.multiplyQuaternionsFlat(e,r,e,t,e,i),$t.slerpFlat(e,t,e,t,e,r,n)}_lerp(e,t,i,n,s){const r=1-n;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*r+e[i+o]*n}}_lerpAdditive(e,t,i,n,s){for(let r=0;r!==s;++r){const o=t+r;e[o]=e[o]+e[i+r]*n}}}const cl="\\[\\]\\.:\\/",ox=new RegExp("["+cl+"]","g"),hl="[^"+cl+"]",ax="[^"+cl.replace("\\.","")+"]",lx=/((?:WC+[\/:])*)/.source.replace("WC",hl),cx=/(WCOD+)?/.source.replace("WCOD",ax),hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hl),ux=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hl),dx=new RegExp("^"+lx+cx+hx+ux+"$"),fx=["material","materials","bones","map"];class px{constructor(e,t,i){const n=i||Ve.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,s=i.length;n!==s;++n)i[n].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class Ve{constructor(e,t,i){this.path=t,this.parsedPath=i||Ve.parseTrackName(t),this.node=Ve.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new Ve.Composite(e,t,i):new Ve(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ox,"")}static parseTrackName(e){const t=dx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){const s=i.nodeName.substring(n+1);fx.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(s){for(let r=0;r<s.length;r++){const o=s[r];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,n=t.propertyName;let s=t.propertyIndex;if(e||(e=Ve.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[n];if(r===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ve.Composite=px;Ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ve.prototype.GetterByBindingType=[Ve.prototype._getValue_direct,Ve.prototype._getValue_array,Ve.prototype._getValue_arrayElement,Ve.prototype._getValue_toArray];Ve.prototype.SetterByBindingTypeAndVersioning=[[Ve.prototype._setValue_direct,Ve.prototype._setValue_direct_setNeedsUpdate,Ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_array,Ve.prototype._setValue_array_setNeedsUpdate,Ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_arrayElement,Ve.prototype._setValue_arrayElement_setNeedsUpdate,Ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_fromArray,Ve.prototype._setValue_fromArray_setNeedsUpdate,Ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class mx{constructor(e,t,i=null,n=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=n;const s=t.tracks,r=s.length,o=new Array(r),l={endingStart:os,endingEnd:os};for(let c=0;c!==r;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=cf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i){if(e.fadeOut(t),this.fadeIn(t),i){const n=this._clip.duration,s=e._clip.duration,r=s/n,o=n/s;e.warp(1,r,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,i){return e.crossFadeFrom(this,t,i)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){const n=this._mixer,s=n.time,r=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=n._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+i,c[0]=e/r,c[1]=t/r,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,n){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);const r=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case uf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulateAdditive(o);break;case Za:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulate(n,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const i=this._weightInterpolant;if(i!==null){const n=i.evaluate(e)[0];t*=n,e>i.parameterPositions[1]&&(this.stopFading(),n===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const n=i.evaluate(e)[0];t*=n,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,i=this.loop;let n=this.time+e,s=this._loopCount;const r=i===hf;if(e===0)return s===-1?n:r&&(s&1)===1?t-n:n;if(i===lf){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(n>=t)n=t;else if(n<0)n=0;else{this.time=n;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,r)):this._setEndings(this.repetitions===0,!0,r)),n>=t||n<0){const o=Math.floor(n/t);n-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,n=e>0?t:0,this.time=n,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=n,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=n;if(r&&(s&1)===1)return t-n}return n}_setEndings(e,t,i){const n=this._interpolantSettings;i?(n.endingStart=as,n.endingEnd=as):(e?n.endingStart=this.zeroSlopeAtStart?as:os:n.endingStart=to,t?n.endingEnd=this.zeroSlopeAtEnd?as:os:n.endingEnd=to)}_scheduleFading(e,t,i){const n=this._mixer,s=n.time;let r=this._weightInterpolant;r===null&&(r=n._lendControlInterpolant(),this._weightInterpolant=r);const o=r.parameterPositions,l=r.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=i,this}}const gx=new Float32Array(1);class _x extends cn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const i=e._localRoot||this._root,n=e._clip.tracks,s=n.length,r=e._propertyBindings,o=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=n[u],m=d.name;let g=h[m];if(g!==void 0)++g.referenceCount,r[u]=g;else{if(g=r[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,m));continue}const f=t&&t._propertyBindings[u].binding.parsedPath;g=new rx(Ve.create(i,m,f),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,m),r[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const i=(e._localRoot||this._root).uuid,n=e._clip.uuid,s=this._actionsByClip[n];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,n,i)}const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const s=t[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const s=t[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){const n=this._actions,s=this._actionsByClip;let r=s[t];if(r===void 0)r={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=r;else{const o=r.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=n.length,n.push(e),r.actionByRoot[i]=e}_removeInactiveAction(e){const t=this._actions,i=t[t.length-1],n=e._cacheIndex;i._cacheIndex=n,t[n]=i,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,r=this._actionsByClip,o=r[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete r[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let i=0,n=t.length;i!==n;++i){const s=t[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,i=e._cacheIndex,n=this._nActiveActions++,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_takeBackAction(e){const t=this._actions,i=e._cacheIndex,n=--this._nActiveActions,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_addInactiveBinding(e,t,i){const n=this._bindingsByRootAndName,s=this._bindings;let r=n[t];r===void 0&&(r={},n[t]=r),r[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,i=e.binding,n=i.rootNode.uuid,s=i.path,r=this._bindingsByRootAndName,o=r[n],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete r[n]}_lendBinding(e){const t=this._bindings,i=e._cacheIndex,n=this._nActiveBindings++,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_takeBackBinding(e){const t=this._bindings,i=e._cacheIndex,n=--this._nActiveBindings,s=t[n];e._cacheIndex=n,t[n]=e,s._cacheIndex=i,t[i]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let i=e[t];return i===void 0&&(i=new lu(new Float32Array(2),new Float32Array(2),1,gx),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){const t=this._controlInterpolants,i=e.__cacheIndex,n=--this._nActiveControlInterpolants,s=t[n];e.__cacheIndex=n,t[n]=e,s.__cacheIndex=i,t[i]=s}clipAction(e,t,i){const n=t||this._root,s=n.uuid;let r=typeof e=="string"?La.findByName(n,e):e;const o=r!==null?r.uuid:e,l=this._actionsByClip[o];let c=null;if(i===void 0&&(r!==null?i=r.blendMode:i=Za),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===i)return u;c=l.knownActions[0],r===null&&(r=c._clip)}if(r===null)return null;const h=new mx(this,r,t,i);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const i=t||this._root,n=i.uuid,s=typeof e=="string"?La.findByName(i,e):e,r=s?s.uuid:e,o=this._actionsByClip[r];return o!==void 0&&o.actionByRoot[n]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;const t=this._actions,i=this._nActiveActions,n=this.time+=e,s=Math.sign(e),r=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(n,e,s,r);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(r);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,i=e.uuid,n=this._actionsByClip,s=n[i];if(s!==void 0){const r=s.knownActions;for(let o=0,l=r.length;o!==l;++o){const c=r[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete n[i]}}uncacheRoot(e){const t=e.uuid,i=this._actionsByClip;for(const r in i){const o=i[r].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const n=this._bindingsByRootAndName,s=n[t];if(s!==void 0)for(const r in s){const o=s[r];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}}class du{constructor(e,t,i=0,n=1/0){this.ray=new go(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Qa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Ra(e,this,i,t),i.sort(sh),i}intersectObjects(e,t=!0,i=[]){for(let n=0,s=e.length;n<s;n++)Ra(e[n],this,i,t);return i.sort(sh),i}}function sh(a,e){return a.distance-e.distance}function Ra(a,e,t,i){if(a.layers.test(e.layers)&&a.raycast(e,t),i===!0){const n=a.children;for(let s=0,r=n.length;s<r;s++)Ra(n[s],e,t,!0)}}class rh{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Tt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ka}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ka);class xx extends fo{constructor(){super(),this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.mouse=new ye,window.addEventListener("mousemove",e=>{this.mouse.x=e.clientX/this.width*2-1,this.mouse.y=-(e.clientY/this.height*2-1)}),window.addEventListener("resize",()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.trigger("resize")})}}class vx extends fo{constructor(){super(),this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16,window.requestAnimationFrame(()=>{this.tick()})}tick(){const e=Date.now();this.delta=e-this.current,this.current=e,this.elapsed=this.current-this.start,this.trigger("tick"),window.requestAnimationFrame(()=>{this.tick()})}}const oh={type:"change"},ra={type:"start"},ah={type:"end"};class yx extends cn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gn.ROTATE,MIDDLE:Gn.DOLLY,RIGHT:Gn.PAN},this.touches={ONE:Hn.ROTATE,TWO:Hn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",Nt),this._domElementKeyEvents=L},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(oh),i.update(),s=n.NONE},this.update=function(){const L=new P,N=new $t().setFromUnitVectors(e.up,new P(0,1,0)),le=N.clone().invert(),he=new P,ae=new $t,pe=2*Math.PI;return function(){const Pe=i.object.position;L.copy(Pe).sub(i.target),L.applyQuaternion(N),o.setFromVector3(L),i.autoRotate&&s===n.NONE&&S(C()),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Ie=i.minAzimuthAngle,He=i.maxAzimuthAngle;return isFinite(Ie)&&isFinite(He)&&(Ie<-Math.PI?Ie+=pe:Ie>Math.PI&&(Ie-=pe),He<-Math.PI?He+=pe:He>Math.PI&&(He-=pe),Ie<=He?o.theta=Math.max(Ie,Math.min(He,o.theta)):o.theta=o.theta>(Ie+He)/2?Math.max(Ie,o.theta):Math.min(He,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(i.minDistance,Math.min(i.maxDistance,o.radius)),i.enableDamping===!0?i.target.addScaledVector(h,i.dampingFactor):i.target.add(h),L.setFromSpherical(o),L.applyQuaternion(le),Pe.copy(i.target).add(L),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,h.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),c=1,u||he.distanceToSquared(i.object.position)>r||8*(1-ae.dot(i.object.quaternion))>r?(i.dispatchEvent(oh),he.copy(i.object.position),ae.copy(i.object.quaternion),u=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",H),i.domElement.removeEventListener("pointerdown",ft),i.domElement.removeEventListener("pointercancel",Lt),i.domElement.removeEventListener("wheel",Qt),i.domElement.removeEventListener("pointermove",at),i.domElement.removeEventListener("pointerup",lt),i._domElementKeyEvents!==null&&i._domElementKeyEvents.removeEventListener("keydown",Nt)};const i=this,n={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=n.NONE;const r=1e-6,o=new rh,l=new rh;let c=1;const h=new P;let u=!1;const d=new ye,m=new ye,g=new ye,f=new ye,p=new ye,_=new ye,b=new ye,v=new ye,M=new ye,y=[],A={};function C(){return 2*Math.PI/60/60*i.autoRotateSpeed}function x(){return Math.pow(.95,i.zoomSpeed)}function S(L){l.theta-=L}function R(L){l.phi-=L}const B=function(){const L=new P;return function(le,he){L.setFromMatrixColumn(he,0),L.multiplyScalar(-le),h.add(L)}}(),K=function(){const L=new P;return function(le,he){i.screenSpacePanning===!0?L.setFromMatrixColumn(he,1):(L.setFromMatrixColumn(he,0),L.crossVectors(i.object.up,L)),L.multiplyScalar(le),h.add(L)}}(),D=function(){const L=new P;return function(le,he){const ae=i.domElement;if(i.object.isPerspectiveCamera){const pe=i.object.position;L.copy(pe).sub(i.target);let fe=L.length();fe*=Math.tan(i.object.fov/2*Math.PI/180),B(2*le*fe/ae.clientHeight,i.object.matrix),K(2*he*fe/ae.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(B(le*(i.object.right-i.object.left)/i.object.zoom/ae.clientWidth,i.object.matrix),K(he*(i.object.top-i.object.bottom)/i.object.zoom/ae.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function I(L){i.object.isPerspectiveCamera?c/=L:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*L)),i.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function z(L){i.object.isPerspectiveCamera?c*=L:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/L)),i.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function $(L){d.set(L.clientX,L.clientY)}function Y(L){b.set(L.clientX,L.clientY)}function U(L){f.set(L.clientX,L.clientY)}function ee(L){m.set(L.clientX,L.clientY),g.subVectors(m,d).multiplyScalar(i.rotateSpeed);const N=i.domElement;S(2*Math.PI*g.x/N.clientHeight),R(2*Math.PI*g.y/N.clientHeight),d.copy(m),i.update()}function Z(L){v.set(L.clientX,L.clientY),M.subVectors(v,b),M.y>0?I(x()):M.y<0&&z(x()),b.copy(v),i.update()}function V(L){p.set(L.clientX,L.clientY),_.subVectors(p,f).multiplyScalar(i.panSpeed),D(_.x,_.y),f.copy(p),i.update()}function G(L){L.deltaY<0?z(x()):L.deltaY>0&&I(x()),i.update()}function Q(L){let N=!1;switch(L.code){case i.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?R(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):D(0,i.keyPanSpeed),N=!0;break;case i.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?R(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):D(0,-i.keyPanSpeed),N=!0;break;case i.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?S(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):D(i.keyPanSpeed,0),N=!0;break;case i.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?S(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):D(-i.keyPanSpeed,0),N=!0;break}N&&(L.preventDefault(),i.update())}function J(){if(y.length===1)d.set(y[0].pageX,y[0].pageY);else{const L=.5*(y[0].pageX+y[1].pageX),N=.5*(y[0].pageY+y[1].pageY);d.set(L,N)}}function se(){if(y.length===1)f.set(y[0].pageX,y[0].pageY);else{const L=.5*(y[0].pageX+y[1].pageX),N=.5*(y[0].pageY+y[1].pageY);f.set(L,N)}}function X(){const L=y[0].pageX-y[1].pageX,N=y[0].pageY-y[1].pageY,le=Math.sqrt(L*L+N*N);b.set(0,le)}function Le(){i.enableZoom&&X(),i.enablePan&&se()}function de(){i.enableZoom&&X(),i.enableRotate&&J()}function _e(L){if(y.length==1)m.set(L.pageX,L.pageY);else{const le=ve(L),he=.5*(L.pageX+le.x),ae=.5*(L.pageY+le.y);m.set(he,ae)}g.subVectors(m,d).multiplyScalar(i.rotateSpeed);const N=i.domElement;S(2*Math.PI*g.x/N.clientHeight),R(2*Math.PI*g.y/N.clientHeight),d.copy(m)}function ue(L){if(y.length===1)p.set(L.pageX,L.pageY);else{const N=ve(L),le=.5*(L.pageX+N.x),he=.5*(L.pageY+N.y);p.set(le,he)}_.subVectors(p,f).multiplyScalar(i.panSpeed),D(_.x,_.y),f.copy(p)}function ze(L){const N=ve(L),le=L.pageX-N.x,he=L.pageY-N.y,ae=Math.sqrt(le*le+he*he);v.set(0,ae),M.set(0,Math.pow(v.y/b.y,i.zoomSpeed)),I(M.y),b.copy(v)}function we(L){i.enableZoom&&ze(L),i.enablePan&&ue(L)}function xe(L){i.enableZoom&&ze(L),i.enableRotate&&_e(L)}function ft(L){i.enabled!==!1&&(y.length===0&&(i.domElement.setPointerCapture(L.pointerId),i.domElement.addEventListener("pointermove",at),i.domElement.addEventListener("pointerup",lt)),ie(L),L.pointerType==="touch"?E(L):et(L))}function at(L){i.enabled!==!1&&(L.pointerType==="touch"?w(L):Ge(L))}function lt(L){ne(L),y.length===0&&(i.domElement.releasePointerCapture(L.pointerId),i.domElement.removeEventListener("pointermove",at),i.domElement.removeEventListener("pointerup",lt)),i.dispatchEvent(ah),s=n.NONE}function Lt(L){ne(L)}function et(L){let N;switch(L.button){case 0:N=i.mouseButtons.LEFT;break;case 1:N=i.mouseButtons.MIDDLE;break;case 2:N=i.mouseButtons.RIGHT;break;default:N=-1}switch(N){case Gn.DOLLY:if(i.enableZoom===!1)return;Y(L),s=n.DOLLY;break;case Gn.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(i.enablePan===!1)return;U(L),s=n.PAN}else{if(i.enableRotate===!1)return;$(L),s=n.ROTATE}break;case Gn.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(i.enableRotate===!1)return;$(L),s=n.ROTATE}else{if(i.enablePan===!1)return;U(L),s=n.PAN}break;default:s=n.NONE}s!==n.NONE&&i.dispatchEvent(ra)}function Ge(L){switch(s){case n.ROTATE:if(i.enableRotate===!1)return;ee(L);break;case n.DOLLY:if(i.enableZoom===!1)return;Z(L);break;case n.PAN:if(i.enablePan===!1)return;V(L);break}}function Qt(L){i.enabled===!1||i.enableZoom===!1||s!==n.NONE||(L.preventDefault(),i.dispatchEvent(ra),G(L),i.dispatchEvent(ah))}function Nt(L){i.enabled===!1||i.enablePan===!1||Q(L)}function E(L){switch(oe(L),y.length){case 1:switch(i.touches.ONE){case Hn.ROTATE:if(i.enableRotate===!1)return;J(),s=n.TOUCH_ROTATE;break;case Hn.PAN:if(i.enablePan===!1)return;se(),s=n.TOUCH_PAN;break;default:s=n.NONE}break;case 2:switch(i.touches.TWO){case Hn.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Le(),s=n.TOUCH_DOLLY_PAN;break;case Hn.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;de(),s=n.TOUCH_DOLLY_ROTATE;break;default:s=n.NONE}break;default:s=n.NONE}s!==n.NONE&&i.dispatchEvent(ra)}function w(L){switch(oe(L),s){case n.TOUCH_ROTATE:if(i.enableRotate===!1)return;_e(L),i.update();break;case n.TOUCH_PAN:if(i.enablePan===!1)return;ue(L),i.update();break;case n.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;we(L),i.update();break;case n.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;xe(L),i.update();break;default:s=n.NONE}}function H(L){i.enabled!==!1&&L.preventDefault()}function ie(L){y.push(L)}function ne(L){delete A[L.pointerId];for(let N=0;N<y.length;N++)if(y[N].pointerId==L.pointerId){y.splice(N,1);return}}function oe(L){let N=A[L.pointerId];N===void 0&&(N=new ye,A[L.pointerId]=N),N.set(L.pageX,L.pageY)}function ve(L){const N=L.pointerId===y[0].pointerId?y[1]:y[0];return A[N.pointerId]}i.domElement.addEventListener("contextmenu",H),i.domElement.addEventListener("pointerdown",ft),i.domElement.addEventListener("pointercancel",Lt),i.domElement.addEventListener("wheel",Qt,{passive:!1}),this.update()}}function Oi(a){if(a===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function fu(a,e){a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.__proto__=e}/*!
 * GSAP 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Kt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ss={duration:.5,overwrite:!1,delay:0},ul,Et,ot,ai=1e8,Xe=1/ai,Da=Math.PI*2,bx=Da/4,Mx=0,pu=Math.sqrt,wx=Math.cos,Sx=Math.sin,xt=function(e){return typeof e=="string"},Qe=function(e){return typeof e=="function"},Hi=function(e){return typeof e=="number"},dl=function(e){return typeof e>"u"},Ai=function(e){return typeof e=="object"},Bt=function(e){return e!==!1},fl=function(){return typeof window<"u"},Xr=function(e){return Qe(e)||xt(e)},mu=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ct=Array.isArray,Ia=/(?:-?\.?\d|\.)+/gi,gu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,cs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,oa=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,_u=/[+-]=-?[.\d]+/,xu=/[^,'"\[\]\s]+/gi,Tx=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,$e,ni,ka,pl,Zt={},so={},vu,yu=function(e){return(so=Bn(e,Zt))&&Vt},ml=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ro=function(e,t){return!t&&console.warn(e)},bu=function(e,t){return e&&(Zt[e]=t)&&so&&(so[e]=t)||Zt},ur=function(){return 0},Ax={suppressEvents:!0,isStart:!0,kill:!1},Zr={suppressEvents:!0,kill:!1},Ex={suppressEvents:!0},gl={},sn=[],Na={},Mu,Xt={},aa={},lh=30,Jr=[],_l="",xl=function(e){var t=e[0],i,n;if(Ai(t)||Qe(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(n=Jr.length;n--&&!Jr[n].targetTest(t););i=Jr[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new Xu(e[n],i)))||e.splice(n,1);return e},Ln=function(e){return e._gsap||xl(li(e))[0]._gsap},wu=function(e,t,i){return(i=e[t])&&Qe(i)?e[t]():dl(i)&&e.getAttribute&&e.getAttribute(t)||i},zt=function(e,t){return(e=e.split(",")).forEach(t)||e},tt=function(e){return Math.round(e*1e5)/1e5||0},yt=function(e){return Math.round(e*1e7)/1e7||0},fs=function(e,t){var i=t.charAt(0),n=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+n:i==="-"?e-n:i==="*"?e*n:e/n},Cx=function(e,t){for(var i=t.length,n=0;e.indexOf(t[n])<0&&++n<i;);return n<i},oo=function(){var e=sn.length,t=sn.slice(0),i,n;for(Na={},sn.length=0,i=0;i<e;i++)n=t[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},Su=function(e,t,i,n){sn.length&&!Et&&oo(),e.render(t,i,n||Et&&t<0&&(e._initted||e._startAt)),sn.length&&!Et&&oo()},Tu=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(xu).length<2?t:xt(e)?e.trim():e},Au=function(e){return e},ui=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},Lx=function(e){return function(t,i){for(var n in i)n in t||n==="duration"&&e||n==="ease"||(t[n]=i[n])}},Bn=function(e,t){for(var i in t)e[i]=t[i];return e},ch=function a(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Ai(t[i])?a(e[i]||(e[i]={}),t[i]):t[i]);return e},ao=function(e,t){var i={},n;for(n in e)n in t||(i[n]=e[n]);return i},tr=function(e){var t=e.parent||$e,i=e.keyframes?Lx(Ct(e.keyframes)):ui;if(Bt(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},Px=function(e,t){for(var i=e.length,n=i===t.length;n&&i--&&e[i]===t[i];);return i<0},Eu=function(e,t,i,n,s){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=e[n],o;if(s)for(o=t[s];r&&r[s]>o;)r=r._prev;return r?(t._next=r._next,r._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[n]=t,t._prev=r,t.parent=t._dp=e,t},vo=function(e,t,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var s=t._prev,r=t._next;s?s._next=r:e[i]===t&&(e[i]=r),r?r._prev=s:e[n]===t&&(e[n]=s),t._next=t._prev=t.parent=null},an=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove(e),e._act=0},Pn=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},Rx=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Oa=function(e,t,i,n){return e._startAt&&(Et?e._startAt.revert(Zr):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,n))},Dx=function a(e){return!e||e._ts&&a(e.parent)},hh=function(e){return e._repeat?Ts(e._tTime,e=e.duration()+e._rDelay)*e:0},Ts=function(e,t){var i=Math.floor(e/=t);return e&&i===e?i-1:i},lo=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},yo=function(e){return e._end=yt(e._start+(e._tDur/Math.abs(e._ts||e._rts||Xe)||0))},bo=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=yt(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),yo(e),i._dirty||Pn(i,e)),e},Cu=function(e,t){var i;if((t._time||t._initted&&!t._dur)&&(i=lo(e.rawTime(),t),(!t._dur||br(0,t.totalDuration(),i)-t._tTime>Xe)&&t.render(i,!0)),Pn(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-Xe}},bi=function(e,t,i,n){return t.parent&&an(t),t._start=yt((Hi(i)?i:i||e!==$e?ii(e,i,t):e._time)+t._delay),t._end=yt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Eu(e,t,"_first","_last",e._sort?"_start":0),Fa(t)||(e._recent=t),n||Cu(e,t),e._ts<0&&bo(e,e._tTime),e},Lu=function(e,t){return(Zt.ScrollTrigger||ml("scrollTrigger",t))&&Zt.ScrollTrigger.create(t,e)},Pu=function(e,t,i,n,s){if(yl(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!Et&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Mu!==qt.frame)return sn.push(e),e._lazy=[s,n],1},Ix=function a(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||a(t))},Fa=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},kx=function(e,t,i,n){var s=e.ratio,r=t<0||!t&&(!e._start&&Ix(e)&&!(!e._initted&&Fa(e))||(e._ts<0||e._dp._ts<0)&&!Fa(e))?0:1,o=e._rDelay,l=0,c,h,u;if(o&&e._repeat&&(l=br(0,e._tDur,t),h=Ts(l,o),e._yoyo&&h&1&&(r=1-r),h!==Ts(e._tTime,o)&&(s=1-r,e.vars.repeatRefresh&&e._initted&&e.invalidate())),r!==s||Et||n||e._zTime===Xe||!t&&e._zTime){if(!e._initted&&Pu(e,t,n,i,l))return;for(u=e._zTime,e._zTime=t||(i?Xe:0),i||(i=t&&!u),e.ratio=r,e._from&&(r=1-r),e._time=0,e._tTime=l,c=e._pt;c;)c.r(r,c.d),c=c._next;t<0&&Oa(e,t,i,!0),e._onUpdate&&!i&&ci(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&ci(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===r&&(r&&an(e,1),!i&&!Et&&(ci(e,r?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Nx=function(e,t,i){var n;if(i>t)for(n=e._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>t)return n;n=n._next}else for(n=e._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<t)return n;n=n._prev}},As=function(e,t,i,n){var s=e._repeat,r=yt(t)||0,o=e._tTime/e._tDur;return o&&!n&&(e._time*=r/e._dur),e._dur=r,e._tDur=s?s<0?1e10:yt(r*(s+1)+e._rDelay*s):r,o>0&&!n&&bo(e,e._tTime=e._tDur*o),e.parent&&yo(e),i||Pn(e.parent,e),e},uh=function(e){return e instanceof Ft?Pn(e):As(e,e._dur)},Ox={_start:0,endTime:ur,totalDuration:ur},ii=function a(e,t,i){var n=e.labels,s=e._recent||Ox,r=e.duration()>=ai?s.endTime(!1):e._dur,o,l,c;return xt(t)&&(isNaN(t)||t in n)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:i).totalDuration()/100:1)):o<0?(t in n||(n[t]=r),n[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&i&&(l=l/100*(Ct(i)?i[0]:i).totalDuration()),o>1?a(e,t.substr(0,o-1),i)+l:r+l)):t==null?r:+t},ir=function(e,t,i){var n=Hi(t[1]),s=(n?2:1)+(e<2?0:1),r=t[s],o,l;if(n&&(r.duration=t[1]),r.parent=i,e){for(o=r,l=i;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Bt(l.vars.inherit)&&l.parent;r.immediateRender=Bt(o.immediateRender),e<2?r.runBackwards=1:r.startAt=t[s-1]}return new ht(t[0],r,t[s+1])},hn=function(e,t){return e||e===0?t(e):t},br=function(e,t,i){return i<e?e:i>t?t:i},At=function(e,t){return!xt(e)||!(t=Tx.exec(e))?"":t[1]},Fx=function(e,t,i){return hn(i,function(n){return br(e,t,n)})},Ba=[].slice,Ru=function(e,t){return e&&Ai(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ai(e[0]))&&!e.nodeType&&e!==ni},Bx=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(n){var s;return xt(n)&&!t||Ru(n,1)?(s=i).push.apply(s,li(n)):i.push(n)})||i},li=function(e,t,i){return ot&&!t&&ot.selector?ot.selector(e):xt(e)&&!i&&(ka||!Es())?Ba.call((t||pl).querySelectorAll(e),0):Ct(e)?Bx(e,i):Ru(e)?Ba.call(e,0):e?[e]:[]},za=function(e){return e=li(e)[0]||ro("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return li(t,i.querySelectorAll?i:i===e?ro("Invalid scope")||pl.createElement("div"):e)}},Du=function(e){return e.sort(function(){return .5-Math.random()})},Iu=function(e){if(Qe(e))return e;var t=Ai(e)?e:{each:e},i=Rn(t.ease),n=t.from||0,s=parseFloat(t.base)||0,r={},o=n>0&&n<1,l=isNaN(n)||o,c=t.axis,h=n,u=n;return xt(n)?h=u={center:.5,edges:.5,end:1}[n]||0:!o&&l&&(h=n[0],u=n[1]),function(d,m,g){var f=(g||t).length,p=r[f],_,b,v,M,y,A,C,x,S;if(!p){if(S=t.grid==="auto"?0:(t.grid||[1,ai])[1],!S){for(C=-ai;C<(C=g[S++].getBoundingClientRect().left)&&S<f;);S--}for(p=r[f]=[],_=l?Math.min(S,f)*h-.5:n%S,b=S===ai?0:l?f*u/S-.5:n/S|0,C=0,x=ai,A=0;A<f;A++)v=A%S-_,M=b-(A/S|0),p[A]=y=c?Math.abs(c==="y"?M:v):pu(v*v+M*M),y>C&&(C=y),y<x&&(x=y);n==="random"&&Du(p),p.max=C-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c==="y"?f/S:S:Math.max(S,f/S))||0)*(n==="edges"?-1:1),p.b=f<0?s-f:s,p.u=At(t.amount||t.each)||0,i=i&&f<0?Hu(i):i}return f=(p[d]-p.min)/p.max||0,yt(p.b+(i?i(f):f)*p.v)+p.u}},Ua=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var n=yt(Math.round(parseFloat(i)/e)*e*t);return(n-n%1)/t+(Hi(i)?0:At(i))}},ku=function(e,t){var i=Ct(e),n,s;return!i&&Ai(e)&&(n=i=e.radius||ai,e.values?(e=li(e.values),(s=!Hi(e[0]))&&(n*=n)):e=Ua(e.increment)),hn(t,i?Qe(e)?function(r){return s=e(r),Math.abs(s-r)<=n?s:r}:function(r){for(var o=parseFloat(s?r.x:r),l=parseFloat(s?r.y:0),c=ai,h=0,u=e.length,d,m;u--;)s?(d=e[u].x-o,m=e[u].y-l,d=d*d+m*m):d=Math.abs(e[u]-o),d<c&&(c=d,h=u);return h=!n||c<=n?e[h]:r,s||h===r||Hi(r)?h:h+At(r)}:Ua(e))},Nu=function(e,t,i,n){return hn(Ct(e)?!t:i===!0?!!(i=0):!n,function(){return Ct(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*n)/n})},zx=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){return t.reduce(function(s,r){return r(s)},n)}},Ux=function(e,t){return function(i){return e(parseFloat(i))+(t||At(i))}},Vx=function(e,t,i){return Fu(e,t,0,1,i)},Ou=function(e,t,i){return hn(i,function(n){return e[~~t(n)]})},Gx=function a(e,t,i){var n=t-e;return Ct(e)?Ou(e,a(0,e.length),t):hn(i,function(s){return(n+(s-e)%n)%n+e})},Hx=function a(e,t,i){var n=t-e,s=n*2;return Ct(e)?Ou(e,a(0,e.length-1),t):hn(i,function(r){return r=(s+(r-e)%s)%s||0,e+(r>n?s-r:r)})},dr=function(e){for(var t=0,i="",n,s,r,o;~(n=e.indexOf("random(",t));)r=e.indexOf(")",n),o=e.charAt(n+7)==="[",s=e.substr(n+7,r-n-7).match(o?xu:Ia),i+=e.substr(t,n-t)+Nu(o?s:+s[0],o?0:+s[1],+s[2]||1e-5),t=r+1;return i+e.substr(t,e.length-t)},Fu=function(e,t,i,n,s){var r=t-e,o=n-i;return hn(s,function(l){return i+((l-e)/r*o||0)})},Wx=function a(e,t,i,n){var s=isNaN(e+t)?0:function(m){return(1-m)*e+m*t};if(!s){var r=xt(e),o={},l,c,h,u,d;if(i===!0&&(n=1)&&(i=null),r)e={p:e},t={p:t};else if(Ct(e)&&!Ct(t)){for(h=[],u=e.length,d=u-2,c=1;c<u;c++)h.push(a(e[c-1],e[c]));u--,s=function(g){g*=u;var f=Math.min(d,~~g);return h[f](g-f)},i=t}else n||(e=Bn(Ct(e)?[]:{},e));if(!h){for(l in t)vl.call(o,e,l,"get",t[l]);s=function(g){return wl(g,o)||(r?e.p:e)}}}return hn(i,s)},dh=function(e,t,i){var n=e.labels,s=ai,r,o,l;for(r in n)o=n[r]-t,o<0==!!i&&o&&s>(o=Math.abs(o))&&(l=r,s=o);return l},ci=function(e,t,i){var n=e.vars,s=n[t],r=ot,o=e._ctx,l,c,h;if(s)return l=n[t+"Params"],c=n.callbackScope||e,i&&sn.length&&oo(),o&&(ot=o),h=l?s.apply(c,l):s.call(c),ot=r,h},Zs=function(e){return an(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Et),e.progress()<1&&ci(e,"onInterrupt"),e},hs,Bu=[],zu=function(e){if(!fl()){Bu.push(e);return}e=!e.name&&e.default||e;var t=e.name,i=Qe(e),n=t&&!i&&e.init?function(){this._props=[]}:e,s={init:ur,render:wl,add:vl,kill:ov,modifier:rv,rawVars:0},r={targetTest:0,get:0,getSetter:Ml,aliases:{},register:0};if(Es(),e!==n){if(Xt[t])return;ui(n,ui(ao(e,s),r)),Bn(n.prototype,Bn(s,ao(e,r))),Xt[n.prop=t]=n,e.targetTest&&(Jr.push(n),gl[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}bu(t,n),e.register&&e.register(Vt,n,Ut)},We=255,Js={aqua:[0,We,We],lime:[0,We,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,We],navy:[0,0,128],white:[We,We,We],olive:[128,128,0],yellow:[We,We,0],orange:[We,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[We,0,0],pink:[We,192,203],cyan:[0,We,We],transparent:[We,We,We,0]},la=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*We+.5|0},Uu=function(e,t,i){var n=e?Hi(e)?[e>>16,e>>8&We,e&We]:0:Js.black,s,r,o,l,c,h,u,d,m,g;if(!n){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Js[e])n=Js[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),r=e.charAt(2),o=e.charAt(3),e="#"+s+s+r+r+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return n=parseInt(e.substr(1,6),16),[n>>16,n>>8&We,n&We,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),n=[e>>16,e>>8&We,e&We]}else if(e.substr(0,3)==="hsl"){if(n=g=e.match(Ia),!t)l=+n[0]%360/360,c=+n[1]/100,h=+n[2]/100,r=h<=.5?h*(c+1):h+c-h*c,s=h*2-r,n.length>3&&(n[3]*=1),n[0]=la(l+1/3,s,r),n[1]=la(l,s,r),n[2]=la(l-1/3,s,r);else if(~e.indexOf("="))return n=e.match(gu),i&&n.length<4&&(n[3]=1),n}else n=e.match(Ia)||Js.transparent;n=n.map(Number)}return t&&!g&&(s=n[0]/We,r=n[1]/We,o=n[2]/We,u=Math.max(s,r,o),d=Math.min(s,r,o),h=(u+d)/2,u===d?l=c=0:(m=u-d,c=h>.5?m/(2-u-d):m/(u+d),l=u===s?(r-o)/m+(r<o?6:0):u===r?(o-s)/m+2:(s-r)/m+4,l*=60),n[0]=~~(l+.5),n[1]=~~(c*100+.5),n[2]=~~(h*100+.5)),i&&n.length<4&&(n[3]=1),n},Vu=function(e){var t=[],i=[],n=-1;return e.split(rn).forEach(function(s){var r=s.match(cs)||[];t.push.apply(t,r),i.push(n+=r.length+1)}),t.c=i,t},fh=function(e,t,i){var n="",s=(e+n).match(rn),r=t?"hsla(":"rgba(",o=0,l,c,h,u;if(!s)return e;if(s=s.map(function(d){return(d=Uu(d,t,1))&&r+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),i&&(h=Vu(e),l=i.c,l.join(n)!==h.c.join(n)))for(c=e.replace(rn,"1").split(cs),u=c.length-1;o<u;o++)n+=c[o]+(~l.indexOf(o)?s.shift()||r+"0,0,0,0)":(h.length?h:s.length?s:i).shift());if(!c)for(c=e.split(rn),u=c.length-1;o<u;o++)n+=c[o]+s[o];return n+c[u]},rn=function(){var a="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Js)a+="|"+e+"\\b";return new RegExp(a+")","gi")}(),jx=/hsl[a]?\(/,Gu=function(e){var t=e.join(" "),i;if(rn.lastIndex=0,rn.test(t))return i=jx.test(t),e[1]=fh(e[1],i),e[0]=fh(e[0],i,Vu(e[1])),!0},fr,qt=function(){var a=Date.now,e=500,t=33,i=a(),n=i,s=1e3/240,r=s,o=[],l,c,h,u,d,m,g=function f(p){var _=a()-n,b=p===!0,v,M,y,A;if(_>e&&(i+=_-t),n+=_,y=n-i,v=y-r,(v>0||b)&&(A=++u.frame,d=y-u.time*1e3,u.time=y=y/1e3,r+=v+(v>=s?4:s-v),M=1),b||(l=c(f)),M)for(m=0;m<o.length;m++)o[m](y,d,A,p)};return u={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){vu&&(!ka&&fl()&&(ni=ka=window,pl=ni.document||{},Zt.gsap=Vt,(ni.gsapVersions||(ni.gsapVersions=[])).push(Vt.version),yu(so||ni.GreenSockGlobals||!ni.gsap&&ni||{}),h=ni.requestAnimationFrame,Bu.forEach(zu)),l&&u.sleep(),c=h||function(p){return setTimeout(p,r-u.time*1e3+1|0)},fr=1,g(2))},sleep:function(){(h?ni.cancelAnimationFrame:clearTimeout)(l),fr=0,c=ur},lagSmoothing:function(p,_){e=p||1/0,t=Math.min(_||33,e)},fps:function(p){s=1e3/(p||240),r=u.time*1e3+s},add:function(p,_,b){var v=_?function(M,y,A,C){p(M,y,A,C),u.remove(v)}:p;return u.remove(p),o[b?"unshift":"push"](v),Es(),v},remove:function(p,_){~(_=o.indexOf(p))&&o.splice(_,1)&&m>=_&&m--},_listeners:o},u}(),Es=function(){return!fr&&qt.wake()},De={},Xx=/^[\d.\-M][\d.\-,\s]/,qx=/["']/g,Yx=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),n=i[0],s=1,r=i.length,o,l,c;s<r;s++)l=i[s],o=s!==r-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[n]=isNaN(c)?c.replace(qx,"").trim():+c,n=l.substr(o+1).trim();return t},$x=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),n=e.indexOf("(",t);return e.substring(t,~n&&n<i?e.indexOf(")",i+1):i)},Kx=function(e){var t=(e+"").split("("),i=De[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[Yx(t[1])]:$x(e).split(",").map(Tu)):De._CE&&Xx.test(e)?De._CE("",e):i},Hu=function(e){return function(t){return 1-e(1-t)}},Wu=function a(e,t){for(var i=e._first,n;i;)i instanceof Ft?a(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?a(i.timeline,t):(n=i._ease,i._ease=i._yEase,i._yEase=n,i._yoyo=t)),i=i._next},Rn=function(e,t){return e&&(Qe(e)?e:De[e]||Kx(e))||t},Vn=function(e,t,i,n){i===void 0&&(i=function(l){return 1-t(1-l)}),n===void 0&&(n=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:n},r;return zt(e,function(o){De[o]=Zt[o]=s,De[r=o.toLowerCase()]=i;for(var l in s)De[r+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=De[o+"."+l]=s[l]}),s},ju=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},ca=function a(e,t,i){var n=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),r=s/Da*(Math.asin(1/n)||0),o=function(h){return h===1?1:n*Math.pow(2,-10*h)*Sx((h-r)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:ju(o);return s=Da/s,l.config=function(c,h){return a(e,c,h)},l},ha=function a(e,t){t===void 0&&(t=1.70158);var i=function(r){return r?--r*r*((t+1)*r+t)+1:0},n=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:ju(i);return n.config=function(s){return a(e,s)},n};zt("Linear,Quad,Cubic,Quart,Quint,Strong",function(a,e){var t=e<5?e+1:e;Vn(a+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});De.Linear.easeNone=De.none=De.Linear.easeIn;Vn("Elastic",ca("in"),ca("out"),ca());(function(a,e){var t=1/e,i=2*t,n=2.5*t,s=function(o){return o<t?a*o*o:o<i?a*Math.pow(o-1.5/e,2)+.75:o<n?a*(o-=2.25/e)*o+.9375:a*Math.pow(o-2.625/e,2)+.984375};Vn("Bounce",function(r){return 1-s(1-r)},s)})(7.5625,2.75);Vn("Expo",function(a){return a?Math.pow(2,10*(a-1)):0});Vn("Circ",function(a){return-(pu(1-a*a)-1)});Vn("Sine",function(a){return a===1?1:-wx(a*bx)+1});Vn("Back",ha("in"),ha("out"),ha());De.SteppedEase=De.steps=Zt.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,n=e+(t?0:1),s=t?1:0,r=1-Xe;return function(o){return((n*br(0,r,o)|0)+s)*i}}};Ss.ease=De["quad.out"];zt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(a){return _l+=a+","+a+"Params,"});var Xu=function(e,t){this.id=Mx++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:wu,this.set=t?t.getSetter:Ml},Cs=function(){function a(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,As(this,+t.duration,1,1),this.data=t.data,ot&&(this._ctx=ot,ot.data.push(this)),fr||qt.wake()}var e=a.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,As(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,n){if(Es(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(bo(this,i),!s._dp||s.parent||Cu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&bi(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===Xe||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Su(this,i,n)),this},e.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+hh(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},e.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},e.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+hh(this),n):this.duration()?Math.min(1,this._time/this._dur):this.ratio},e.iteration=function(i,n){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,n):this._repeat?Ts(this._tTime,s)+1:1},e.timeScale=function(i){if(!arguments.length)return this._rts===-Xe?0:this._rts;if(this._rts===i)return this;var n=this.parent&&this._ts?lo(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-Xe?0:this._rts,this.totalTime(br(-Math.abs(this._delay),this._tDur,n),!0),yo(this),Rx(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Es(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Xe&&(this._tTime-=Xe)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&bi(n,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Bt(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?lo(n.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=Ex);var n=Et;return Et=i,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Et=n,this},e.globalTime=function(i){for(var n=this,s=arguments.length?i:n.rawTime();n;)s=n._start+s/(n._ts||1),n=n._dp;return!this.parent&&this._sat?this._sat.vars.immediateRender?-1:this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,uh(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,uh(this),n?this.time(n):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,n){return this.totalTime(ii(this,i),Bt(n))},e.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,Bt(n))},e.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},e.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},e.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-Xe:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Xe,this},e.isActive=function(){var i=this.parent||this._dp,n=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=n&&s<this.endTime(!0)-Xe)},e.eventCallback=function(i,n,s){var r=this.vars;return arguments.length>1?(n?(r[i]=n,s&&(r[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=n)):delete r[i],this):r[i]},e.then=function(i){var n=this;return new Promise(function(s){var r=Qe(i)?i:Au,o=function(){var c=n.then;n.then=null,Qe(r)&&(r=r(n))&&(r.then||r===n)&&(n.then=c),s(r),n.then=c};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?o():n._prom=o})},e.kill=function(){Zs(this)},a}();ui(Cs.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Xe,_prom:0,_ps:!1,_rts:1});var Ft=function(a){fu(e,a);function e(i,n){var s;return i===void 0&&(i={}),s=a.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=Bt(i.sortChildren),$e&&bi(i.parent||$e,Oi(s),n),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&Lu(Oi(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(n,s,r){return ir(0,arguments,this),this},t.from=function(n,s,r){return ir(1,arguments,this),this},t.fromTo=function(n,s,r,o){return ir(2,arguments,this),this},t.set=function(n,s,r){return s.duration=0,s.parent=this,tr(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new ht(n,s,ii(this,r),1),this},t.call=function(n,s,r){return bi(this,ht.delayedCall(0,n,s),r)},t.staggerTo=function(n,s,r,o,l,c,h){return r.duration=s,r.stagger=r.stagger||o,r.onComplete=c,r.onCompleteParams=h,r.parent=this,new ht(n,r,ii(this,l)),this},t.staggerFrom=function(n,s,r,o,l,c,h){return r.runBackwards=1,tr(r).immediateRender=Bt(r.immediateRender),this.staggerTo(n,s,r,o,l,c,h)},t.staggerFromTo=function(n,s,r,o,l,c,h,u){return o.startAt=r,tr(o).immediateRender=Bt(o.immediateRender),this.staggerTo(n,s,o,l,c,h,u)},t.render=function(n,s,r){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=n<=0?0:yt(n),u=this._zTime<0!=n<0&&(this._initted||!c),d,m,g,f,p,_,b,v,M,y,A,C;if(this!==$e&&h>l&&n>=0&&(h=l),h!==this._tTime||r||u){if(o!==this._time&&c&&(h+=this._time-o,n+=this._time-o),d=h,M=this._start,v=this._ts,_=!v,u&&(c||(o=this._zTime),(n||!s)&&(this._zTime=n)),this._repeat){if(A=this._yoyo,p=c+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(p*100+n,s,r);if(d=yt(h%p),h===l?(f=this._repeat,d=c):(f=~~(h/p),f&&f===h/p&&(d=c,f--),d>c&&(d=c)),y=Ts(this._tTime,p),!o&&this._tTime&&y!==f&&this._tTime-y*p-this._dur<=0&&(y=f),A&&f&1&&(d=c-d,C=1),f!==y&&!this._lock){var x=A&&y&1,S=x===(A&&f&1);if(f<y&&(x=!x),o=x?0:c,this._lock=1,this.render(o||(C?0:yt(f*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&ci(this,"onRepeat"),this.vars.repeatRefresh&&!C&&(this.invalidate()._lock=1),o&&o!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,o=x?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!C&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;Wu(this,C)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=Nx(this,yt(o),yt(d)),b&&(h-=d-(d=b._start))),this._tTime=h,this._time=d,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,o=0),!o&&d&&!s&&!f&&(ci(this,"onStart"),this._tTime!==h))return this;if(d>=o&&n>=0)for(m=this._first;m;){if(g=m._next,(m._act||d>=m._start)&&m._ts&&b!==m){if(m.parent!==this)return this.render(n,s,r);if(m.render(m._ts>0?(d-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(d-m._start)*m._ts,s,r),d!==this._time||!this._ts&&!_){b=0,g&&(h+=this._zTime=-Xe);break}}m=g}else{m=this._last;for(var R=n<0?n:d;m;){if(g=m._prev,(m._act||R<=m._end)&&m._ts&&b!==m){if(m.parent!==this)return this.render(n,s,r);if(m.render(m._ts>0?(R-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(R-m._start)*m._ts,s,r||Et&&(m._initted||m._startAt)),d!==this._time||!this._ts&&!_){b=0,g&&(h+=this._zTime=R?-Xe:Xe);break}}m=g}}if(b&&!s&&(this.pause(),b.render(d>=o?0:-Xe)._zTime=d>=o?1:-1,this._ts))return this._start=M,yo(this),this.render(n,s,r);this._onUpdate&&!s&&ci(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(M===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((n||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&an(this,1),!s&&!(n<0&&!o)&&(h||o||!l)&&(ci(this,h===l&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(n,s){var r=this;if(Hi(s)||(s=ii(this,s,n)),!(n instanceof Cs)){if(Ct(n))return n.forEach(function(o){return r.add(o,s)}),this;if(xt(n))return this.addLabel(n,s);if(Qe(n))n=ht.delayedCall(0,n);else return this}return this!==n?bi(this,n,s):this},t.getChildren=function(n,s,r,o){n===void 0&&(n=!0),s===void 0&&(s=!0),r===void 0&&(r=!0),o===void 0&&(o=-ai);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof ht?s&&l.push(c):(r&&l.push(c),n&&l.push.apply(l,c.getChildren(!0,s,r)))),c=c._next;return l},t.getById=function(n){for(var s=this.getChildren(1,1,1),r=s.length;r--;)if(s[r].vars.id===n)return s[r]},t.remove=function(n){return xt(n)?this.removeLabel(n):Qe(n)?this.killTweensOf(n):(vo(this,n),n===this._recent&&(this._recent=this._last),Pn(this))},t.totalTime=function(n,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=yt(qt.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),a.prototype.totalTime.call(this,n,s),this._forcing=0,this):this._tTime},t.addLabel=function(n,s){return this.labels[n]=ii(this,s),this},t.removeLabel=function(n){return delete this.labels[n],this},t.addPause=function(n,s,r){var o=ht.delayedCall(0,s||ur,r);return o.data="isPause",this._hasPause=1,bi(this,o,ii(this,n))},t.removePause=function(n){var s=this._first;for(n=ii(this,n);s;)s._start===n&&s.data==="isPause"&&an(s),s=s._next},t.killTweensOf=function(n,s,r){for(var o=this.getTweensOf(n,r),l=o.length;l--;)Qi!==o[l]&&o[l].kill(n,s);return this},t.getTweensOf=function(n,s){for(var r=[],o=li(n),l=this._first,c=Hi(s),h;l;)l instanceof ht?Cx(l._targets,o)&&(c?(!Qi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&r.push(l):(h=l.getTweensOf(o,s)).length&&r.push.apply(r,h),l=l._next;return r},t.tweenTo=function(n,s){s=s||{};var r=this,o=ii(r,n),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,d=l.immediateRender,m,g=ht.to(r,ui({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:r._time))/r.timeScale())||Xe,onStart:function(){if(r.pause(),!m){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:r._time))/r.timeScale());g._dur!==p&&As(g,p,0,1).render(g._time,!0,!0),m=1}h&&h.apply(g,u||[])}},s));return d?g.render(0):g},t.tweenFromTo=function(n,s,r){return this.tweenTo(s,ui({startAt:{time:ii(this,n)}},r))},t.recent=function(){return this._recent},t.nextLabel=function(n){return n===void 0&&(n=this._time),dh(this,ii(this,n))},t.previousLabel=function(n){return n===void 0&&(n=this._time),dh(this,ii(this,n),1)},t.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+Xe)},t.shiftChildren=function(n,s,r){r===void 0&&(r=0);for(var o=this._first,l=this.labels,c;o;)o._start>=r&&(o._start+=n,o._end+=n),o=o._next;if(s)for(c in l)l[c]>=r&&(l[c]+=n);return Pn(this)},t.invalidate=function(n){var s=this._first;for(this._lock=0;s;)s.invalidate(n),s=s._next;return a.prototype.invalidate.call(this,n)},t.clear=function(n){n===void 0&&(n=!0);for(var s=this._first,r;s;)r=s._next,this.remove(s),s=r;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),Pn(this)},t.totalDuration=function(n){var s=0,r=this,o=r._last,l=ai,c,h,u;if(arguments.length)return r.timeScale((r._repeat<0?r.duration():r.totalDuration())/(r.reversed()?-n:n));if(r._dirty){for(u=r.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&r._sort&&o._ts&&!r._lock?(r._lock=1,bi(r,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!u&&!r._dp||u&&u.smoothChildTiming)&&(r._start+=h/r._ts,r._time-=h,r._tTime-=h),r.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;As(r,r===$e&&r._time>s?r._time:s,1,1),r._dirty=0}return r._tDur},e.updateRoot=function(n){if($e._ts&&(Su($e,lo(n,$e)),Mu=qt.frame),qt.frame>=lh){lh+=Kt.autoSleep||120;var s=$e._first;if((!s||!s._ts)&&Kt.autoSleep&&qt._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||qt.sleep()}}},e}(Cs);ui(Ft.prototype,{_lock:0,_hasPause:0,_forcing:0});var Zx=function(e,t,i,n,s,r,o){var l=new Ut(this._pt,e,t,0,1,Ju,null,s),c=0,h=0,u,d,m,g,f,p,_,b;for(l.b=i,l.e=n,i+="",n+="",(_=~n.indexOf("random("))&&(n=dr(n)),r&&(b=[i,n],r(b,e,t),i=b[0],n=b[1]),d=i.match(oa)||[];u=oa.exec(n);)g=u[0],f=n.substring(c,u.index),m?m=(m+1)%5:f.substr(-5)==="rgba("&&(m=1),g!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:f||h===1?f:",",s:p,c:g.charAt(1)==="="?fs(p,g)-p:parseFloat(g)-p,m:m&&m<4?Math.round:0},c=oa.lastIndex);return l.c=c<n.length?n.substring(c,n.length):"",l.fp=o,(_u.test(n)||_)&&(l.e=0),this._pt=l,l},vl=function(e,t,i,n,s,r,o,l,c,h){Qe(n)&&(n=n(s||0,e,r));var u=e[t],d=i!=="get"?i:Qe(u)?c?e[t.indexOf("set")||!Qe(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():u,m=Qe(u)?c?iv:Ku:bl,g;if(xt(n)&&(~n.indexOf("random(")&&(n=dr(n)),n.charAt(1)==="="&&(g=fs(d,n)+(At(d)||0),(g||g===0)&&(n=g))),!h||d!==n||Va)return!isNaN(d*n)&&n!==""?(g=new Ut(this._pt,e,t,+d||0,n-(d||0),typeof u=="boolean"?sv:Zu,0,m),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!u&&!(t in e)&&ml(t,n),Zx.call(this,e,t,d,n,m,l||Kt.stringFilter,c))},Jx=function(e,t,i,n,s){if(Qe(e)&&(e=nr(e,s,t,i,n)),!Ai(e)||e.style&&e.nodeType||Ct(e)||mu(e))return xt(e)?nr(e,s,t,i,n):e;var r={},o;for(o in e)r[o]=nr(e[o],s,t,i,n);return r},qu=function(e,t,i,n,s,r){var o,l,c,h;if(Xt[e]&&(o=new Xt[e]).init(s,o.rawVars?t[e]:Jx(t[e],n,s,r,i),i,n,r)!==!1&&(i._pt=l=new Ut(i._pt,s,e,0,1,o.render,o,0,o.priority),i!==hs))for(c=i._ptLookup[i._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Qi,Va,yl=function a(e,t,i){var n=e.vars,s=n.ease,r=n.startAt,o=n.immediateRender,l=n.lazy,c=n.onUpdate,h=n.onUpdateParams,u=n.callbackScope,d=n.runBackwards,m=n.yoyoEase,g=n.keyframes,f=n.autoRevert,p=e._dur,_=e._startAt,b=e._targets,v=e.parent,M=v&&v.data==="nested"?v.vars.targets:b,y=e._overwrite==="auto"&&!ul,A=e.timeline,C,x,S,R,B,K,D,I,z,$,Y,U,ee;if(A&&(!g||!s)&&(s="none"),e._ease=Rn(s,Ss.ease),e._yEase=m?Hu(Rn(m===!0?s:m,Ss.ease)):0,m&&e._yoyo&&!e._repeat&&(m=e._yEase,e._yEase=e._ease,e._ease=m),e._from=!A&&!!n.runBackwards,!A||g&&!n.stagger){if(I=b[0]?Ln(b[0]).harness:0,U=I&&n[I.prop],C=ao(n,gl),_&&(_._zTime<0&&_.progress(1),t<0&&d&&o&&!f?_.render(-1,!0):_.revert(d&&p?Zr:Ax),_._lazy=0),r){if(an(e._startAt=ht.set(b,ui({data:"isStart",overwrite:!1,parent:v,immediateRender:!0,lazy:!_&&Bt(l),startAt:null,delay:0,onUpdate:c,onUpdateParams:h,callbackScope:u,stagger:0},r))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Et||!o&&!f)&&e._startAt.revert(Zr),o&&p&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(d&&p&&!_){if(t&&(o=!1),S=ui({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Bt(l),immediateRender:o,stagger:0,parent:v},C),U&&(S[I.prop]=U),an(e._startAt=ht.set(b,S)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Et?e._startAt.revert(Zr):e._startAt.render(-1,!0)),e._zTime=t,!o)a(e._startAt,Xe,Xe);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&Bt(l)||l&&!p,x=0;x<b.length;x++){if(B=b[x],D=B._gsap||xl(b)[x]._gsap,e._ptLookup[x]=$={},Na[D.id]&&sn.length&&oo(),Y=M===b?x:M.indexOf(B),I&&(z=new I).init(B,U||C,e,Y,M)!==!1&&(e._pt=R=new Ut(e._pt,B,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(Z){$[Z]=R}),z.priority&&(K=1)),!I||U)for(S in C)Xt[S]&&(z=qu(S,C,e,Y,B,M))?z.priority&&(K=1):$[S]=R=vl.call(e,B,S,"get",C[S],Y,M,0,n.stringFilter);e._op&&e._op[x]&&e.kill(B,e._op[x]),y&&e._pt&&(Qi=e,$e.killTweensOf(B,$,e.globalTime(t)),ee=!e.parent,Qi=0),e._pt&&l&&(Na[D.id]=1)}K&&Qu(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!ee,g&&t<=0&&A.render(ai,!0,!0)},Qx=function(e,t,i,n,s,r,o){var l=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,h,u,d;if(!l)for(l=e._ptCache[t]=[],u=e._ptLookup,d=e._targets.length;d--;){if(c=u[d][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return Va=1,e.vars[t]="+=0",yl(e,o),Va=0,1;l.push(c)}for(d=l.length;d--;)h=l[d],c=h._pt||h,c.s=(n||n===0)&&!s?n:c.s+(n||0)+r*c.c,c.c=i-c.s,h.e&&(h.e=tt(i)+At(h.e)),h.b&&(h.b=c.s+At(h.b))},ev=function(e,t){var i=e[0]?Ln(e[0]).harness:0,n=i&&i.aliases,s,r,o,l;if(!n)return t;s=Bn({},t);for(r in n)if(r in s)for(l=n[r].split(","),o=l.length;o--;)s[l[o]]=s[r];return s},tv=function(e,t,i,n){var s=t.ease||n||"power1.inOut",r,o;if(Ct(t))o=i[e]||(i[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(r in t)o=i[r]||(i[r]=[]),r==="ease"||o.push({t:parseFloat(e),v:t[r],e:s})},nr=function(e,t,i,n,s){return Qe(e)?e.call(t,i,n,s):xt(e)&&~e.indexOf("random(")?dr(e):e},Yu=_l+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",$u={};zt(Yu+",id,stagger,delay,duration,paused,scrollTrigger",function(a){return $u[a]=1});var ht=function(a){fu(e,a);function e(i,n,s,r){var o;typeof n=="number"&&(s.duration=n,n=s,s=null),o=a.call(this,r?n:tr(n))||this;var l=o.vars,c=l.duration,h=l.delay,u=l.immediateRender,d=l.stagger,m=l.overwrite,g=l.keyframes,f=l.defaults,p=l.scrollTrigger,_=l.yoyoEase,b=n.parent||$e,v=(Ct(i)||mu(i)?Hi(i[0]):"length"in n)?[i]:li(i),M,y,A,C,x,S,R,B;if(o._targets=v.length?xl(v):ro("GSAP target "+i+" not found. https://greensock.com",!Kt.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=m,g||d||Xr(c)||Xr(h)){if(n=o.vars,M=o.timeline=new Ft({data:"nested",defaults:f||{},targets:b&&b.data==="nested"?b.vars.targets:v}),M.kill(),M.parent=M._dp=Oi(o),M._start=0,d||Xr(c)||Xr(h)){if(C=v.length,R=d&&Iu(d),Ai(d))for(x in d)~Yu.indexOf(x)&&(B||(B={}),B[x]=d[x]);for(y=0;y<C;y++)A=ao(n,$u),A.stagger=0,_&&(A.yoyoEase=_),B&&Bn(A,B),S=v[y],A.duration=+nr(c,Oi(o),y,S,v),A.delay=(+nr(h,Oi(o),y,S,v)||0)-o._delay,!d&&C===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),M.to(S,A,R?R(y,S,v):0),M._ease=De.none;M.duration()?c=h=0:o.timeline=0}else if(g){tr(ui(M.vars.defaults,{ease:"none"})),M._ease=Rn(g.ease||n.ease||"none");var K=0,D,I,z;if(Ct(g))g.forEach(function($){return M.to(v,$,">")}),M.duration();else{A={};for(x in g)x==="ease"||x==="easeEach"||tv(x,g[x],A,g.easeEach);for(x in A)for(D=A[x].sort(function($,Y){return $.t-Y.t}),K=0,y=0;y<D.length;y++)I=D[y],z={ease:I.e,duration:(I.t-(y?D[y-1].t:0))/100*c},z[x]=I.v,M.to(v,z,K),K+=z.duration;M.duration()<c&&M.to({},{duration:c-M.duration()})}}c||o.duration(c=M.duration())}else o.timeline=0;return m===!0&&!ul&&(Qi=Oi(o),$e.killTweensOf(v),Qi=0),bi(b,Oi(o),s),n.reversed&&o.reverse(),n.paused&&o.paused(!0),(u||!c&&!g&&o._start===yt(b._time)&&Bt(u)&&Dx(Oi(o))&&b.data!=="nested")&&(o._tTime=-Xe,o.render(Math.max(0,-h)||0)),p&&Lu(Oi(o),p),o}var t=e.prototype;return t.render=function(n,s,r){var o=this._time,l=this._tDur,c=this._dur,h=n<0,u=n>l-Xe&&!h?l:n<Xe?0:n,d,m,g,f,p,_,b,v,M;if(!c)kx(this,n,s,r);else if(u!==this._tTime||!n||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h){if(d=u,v=this.timeline,this._repeat){if(f=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(f*100+n,s,r);if(d=yt(u%f),u===l?(g=this._repeat,d=c):(g=~~(u/f),g&&g===u/f&&(d=c,g--),d>c&&(d=c)),_=this._yoyo&&g&1,_&&(M=this._yEase,d=c-d),p=Ts(this._tTime,f),d===o&&!r&&this._initted)return this._tTime=u,this;g!==p&&(v&&this._yEase&&Wu(v,_),this.vars.repeatRefresh&&!_&&!this._lock&&(this._lock=r=1,this.render(yt(f*g),!0).invalidate()._lock=0))}if(!this._initted){if(Pu(this,h?n:d,r,s,u))return this._tTime=0,this;if(o!==this._time)return this;if(c!==this._dur)return this.render(n,s,r)}if(this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(M||this._ease)(d/c),this._from&&(this.ratio=b=1-b),d&&!o&&!s&&!g&&(ci(this,"onStart"),this._tTime!==u))return this;for(m=this._pt;m;)m.r(b,m.d),m=m._next;v&&v.render(n<0?n:!d&&_?-Xe:v._dur*v._ease(d/this._dur),s,r)||this._startAt&&(this._zTime=n),this._onUpdate&&!s&&(h&&Oa(this,n,s,r),ci(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&ci(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Oa(this,n,!0,!0),(n||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&an(this,1),!s&&!(h&&!o)&&(u||o||_)&&(ci(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),a.prototype.invalidate.call(this,n)},t.resetTo=function(n,s,r,o){fr||qt.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||yl(this,l),c=this._ease(l/this._dur),Qx(this,n,s,r,o,c,l)?this.resetTo(n,s,r,o):(bo(this,0),this.parent||Eu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(n,s){if(s===void 0&&(s="all"),!n&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Zs(this):this;if(this.timeline){var r=this.timeline.totalDuration();return this.timeline.killTweensOf(n,s,Qi&&Qi.vars.overwrite!==!0)._first||Zs(this),this.parent&&r!==this.timeline.totalDuration()&&As(this,this._dur*this.timeline._tDur/r,0,1),this}var o=this._targets,l=n?li(n):o,c=this._ptLookup,h=this._pt,u,d,m,g,f,p,_;if((!s||s==="all")&&Px(o,l))return s==="all"&&(this._pt=0),Zs(this);for(u=this._op=this._op||[],s!=="all"&&(xt(s)&&(f={},zt(s,function(b){return f[b]=1}),s=f),s=ev(o,s)),_=o.length;_--;)if(~l.indexOf(o[_])){d=c[_],s==="all"?(u[_]=s,g=d,m={}):(m=u[_]=u[_]||{},g=s);for(f in g)p=d&&d[f],p&&((!("kill"in p.d)||p.d.kill(f)===!0)&&vo(this,p,"_pt"),delete d[f]),m!=="all"&&(m[f]=1)}return this._initted&&!this._pt&&h&&Zs(this),this},e.to=function(n,s){return new e(n,s,arguments[2])},e.from=function(n,s){return ir(1,arguments)},e.delayedCall=function(n,s,r,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:s,onReverseComplete:s,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:o})},e.fromTo=function(n,s,r){return ir(2,arguments)},e.set=function(n,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(n,s)},e.killTweensOf=function(n,s,r){return $e.killTweensOf(n,s,r)},e}(Cs);ui(ht.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});zt("staggerTo,staggerFrom,staggerFromTo",function(a){ht[a]=function(){var e=new Ft,t=Ba.call(arguments,0);return t.splice(a==="staggerFromTo"?5:4,0,0),e[a].apply(e,t)}});var bl=function(e,t,i){return e[t]=i},Ku=function(e,t,i){return e[t](i)},iv=function(e,t,i,n){return e[t](n.fp,i)},nv=function(e,t,i){return e.setAttribute(t,i)},Ml=function(e,t){return Qe(e[t])?Ku:dl(e[t])&&e.setAttribute?nv:bl},Zu=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},sv=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Ju=function(e,t){var i=t._pt,n="";if(!e&&t.b)n=t.b;else if(e===1&&t.e)n=t.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+n,i=i._next;n+=t.c}t.set(t.t,t.p,n,t)},wl=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},rv=function(e,t,i,n){for(var s=this._pt,r;s;)r=s._next,s.p===n&&s.modifier(e,t,i),s=r},ov=function(e){for(var t=this._pt,i,n;t;)n=t._next,t.p===e&&!t.op||t.op===e?vo(this,t,"_pt"):t.dep||(i=1),t=n;return!i},av=function(e,t,i,n){n.mSet(e,t,n.m.call(n.tween,i,n.mt),n)},Qu=function(e){for(var t=e._pt,i,n,s,r;t;){for(i=t._next,n=s;n&&n.pr>t.pr;)n=n._next;(t._prev=n?n._prev:r)?t._prev._next=t:s=t,(t._next=n)?n._prev=t:r=t,t=i}e._pt=s},Ut=function(){function a(t,i,n,s,r,o,l,c,h){this.t=i,this.s=s,this.c=r,this.p=n,this.r=o||Zu,this.d=l||this,this.set=c||bl,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=a.prototype;return e.modifier=function(i,n,s){this.mSet=this.mSet||this.set,this.set=av,this.m=i,this.mt=s,this.tween=n},a}();zt(_l+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(a){return gl[a]=1});Zt.TweenMax=Zt.TweenLite=ht;Zt.TimelineLite=Zt.TimelineMax=Ft;$e=new Ft({sortChildren:!1,defaults:Ss,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Kt.stringFilter=Gu;var Ls=[],Qr={},lv=[],ph=0,ua=function(e){return(Qr[e]||lv).map(function(t){return t()})},Ga=function(){var e=Date.now(),t=[];e-ph>2&&(ua("matchMediaInit"),Ls.forEach(function(i){var n=i.queries,s=i.conditions,r,o,l,c;for(o in n)r=ni.matchMedia(n[o]).matches,r&&(l=1),r!==s[o]&&(s[o]=r,c=1);c&&(i.revert(),l&&t.push(i))}),ua("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i)}),ph=e,ua("matchMedia"))},ed=function(){function a(t,i){this.selector=i&&za(i),this.data=[],this._r=[],this.isReverted=!1,t&&this.add(t)}var e=a.prototype;return e.add=function(i,n,s){Qe(i)&&(s=n,n=i,i=Qe);var r=this,o=function(){var c=ot,h=r.selector,u;return c&&c!==r&&c.data.push(r),s&&(r.selector=za(s)),ot=r,u=n.apply(r,arguments),Qe(u)&&r._r.push(u),ot=c,r.selector=h,r.isReverted=!1,u};return r.last=o,i===Qe?o(r):i?r[i]=o:o},e.ignore=function(i){var n=ot;ot=null,i(this),ot=n},e.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof a?i.push.apply(i,n.getTweens()):n instanceof ht&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,n){var s=this;if(i){var r=this.getTweens();this.data.forEach(function(l){l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(c){return r.splice(r.indexOf(c),1)}))}),r.map(function(l){return{g:l.globalTime(0),t:l}}).sort(function(l,c){return c.g-l.g||-1}).forEach(function(l){return l.t.revert(i)}),this.data.forEach(function(l){return!(l instanceof Cs)&&l.revert&&l.revert(i)}),this._r.forEach(function(l){return l(i,s)}),this.isReverted=!0}else this.data.forEach(function(l){return l.kill&&l.kill()});if(this.clear(),n){var o=Ls.indexOf(this);~o&&Ls.splice(o,1)}},e.revert=function(i){this.kill(i||{})},a}(),cv=function(){function a(t){this.contexts=[],this.scope=t}var e=a.prototype;return e.add=function(i,n,s){Ai(i)||(i={matches:i});var r=new ed(0,s||this.scope),o=r.conditions={},l,c,h;this.contexts.push(r),n=r.add("onMatch",n),r.queries=i;for(c in i)c==="all"?h=1:(l=ni.matchMedia(i[c]),l&&(Ls.indexOf(r)<0&&Ls.push(r),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(Ga):l.addEventListener("change",Ga)));return h&&n(r),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},a}(),co={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(n){return zu(n)})},timeline:function(e){return new Ft(e)},getTweensOf:function(e,t){return $e.getTweensOf(e,t)},getProperty:function(e,t,i,n){xt(e)&&(e=li(e)[0]);var s=Ln(e||{}).get,r=i?Au:Tu;return i==="native"&&(i=""),e&&(t?r((Xt[t]&&Xt[t].get||s)(e,t,i,n)):function(o,l,c){return r((Xt[o]&&Xt[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,i){if(e=li(e),e.length>1){var n=e.map(function(h){return Vt.quickSetter(h,t,i)}),s=n.length;return function(h){for(var u=s;u--;)n[u](h)}}e=e[0]||{};var r=Xt[t],o=Ln(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=r?function(h){var u=new r;hs._pt=0,u.init(e,i?h+i:h,hs,0,[e]),u.render(1,u),hs._pt&&wl(1,hs)}:o.set(e,l);return r?c:function(h){return c(e,l,i?h+i:h,o,1)}},quickTo:function(e,t,i){var n,s=Vt.to(e,Bn((n={},n[t]="+=0.1",n.paused=!0,n),i||{})),r=function(l,c,h){return s.resetTo(t,l,c,h)};return r.tween=s,r},isTweening:function(e){return $e.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Rn(e.ease,Ss.ease)),ch(Ss,e||{})},config:function(e){return ch(Kt,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,n=e.plugins,s=e.defaults,r=e.extendTimeline;(n||"").split(",").forEach(function(o){return o&&!Xt[o]&&!Zt[o]&&ro(t+" effect requires "+o+" plugin.")}),aa[t]=function(o,l,c){return i(li(o),ui(l||{},s),c)},r&&(Ft.prototype[t]=function(o,l,c){return this.add(aa[t](o,Ai(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){De[e]=Rn(t)},parseEase:function(e,t){return arguments.length?Rn(e,t):De},getById:function(e){return $e.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new Ft(e),n,s;for(i.smoothChildTiming=Bt(e.smoothChildTiming),$e.remove(i),i._dp=0,i._time=i._tTime=$e._time,n=$e._first;n;)s=n._next,(t||!(!n._dur&&n instanceof ht&&n.vars.onComplete===n._targets[0]))&&bi(i,n,n._start-n._delay),n=s;return bi($e,i,0),i},context:function(e,t){return e?new ed(e,t):ot},matchMedia:function(e){return new cv(e)},matchMediaRefresh:function(){return Ls.forEach(function(e){var t=e.conditions,i,n;for(n in t)t[n]&&(t[n]=!1,i=1);i&&e.revert()})||Ga()},addEventListener:function(e,t){var i=Qr[e]||(Qr[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Qr[e],n=i&&i.indexOf(t);n>=0&&i.splice(n,1)},utils:{wrap:Gx,wrapYoyo:Hx,distribute:Iu,random:Nu,snap:ku,normalize:Vx,getUnit:At,clamp:Fx,splitColor:Uu,toArray:li,selector:za,mapRange:Fu,pipe:zx,unitize:Ux,interpolate:Wx,shuffle:Du},install:yu,effects:aa,ticker:qt,updateRoot:Ft.updateRoot,plugins:Xt,globalTimeline:$e,core:{PropTween:Ut,globals:bu,Tween:ht,Timeline:Ft,Animation:Cs,getCache:Ln,_removeLinkedListItem:vo,reverting:function(){return Et},context:function(e){return e&&ot&&(ot.data.push(e),e._ctx=ot),ot},suppressOverwrites:function(e){return ul=e}}};zt("to,from,fromTo,delayedCall,set,killTweensOf",function(a){return co[a]=ht[a]});qt.add(Ft.updateRoot);hs=co.to({},{duration:0});var hv=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},uv=function(e,t){var i=e._targets,n,s,r;for(n in t)for(s=i.length;s--;)r=e._ptLookup[s][n],r&&(r=r.d)&&(r._pt&&(r=hv(r,n)),r&&r.modifier&&r.modifier(t[n],e,i[s],n))},da=function(e,t){return{name:e,rawVars:1,init:function(n,s,r){r._onInit=function(o){var l,c;if(xt(s)&&(l={},zt(s,function(h){return l[h]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}uv(o,s)}}}},Vt=co.registerPlugin({name:"attr",init:function(e,t,i,n,s){var r,o,l;this.tween=i;for(r in t)l=e.getAttribute(r)||"",o=this.add(e,"setAttribute",(l||0)+"",t[r],n,s,0,0,r),o.op=r,o.b=l,this._props.push(r)},render:function(e,t){for(var i=t._pt;i;)Et?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},da("roundProps",Ua),da("modifiers"),da("snap",ku))||co;ht.version=Ft.version=Vt.version="3.11.5";vu=1;fl()&&Es();De.Power0;De.Power1;De.Power2;De.Power3;De.Power4;De.Linear;De.Quad;De.Cubic;De.Quart;De.Quint;De.Strong;De.Elastic;De.Back;De.SteppedEase;De.Bounce;De.Sine;De.Expo;De.Circ;/*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var mh,en,ps,Sl,Tn,gh,Tl,dv=function(){return typeof window<"u"},Wi={},Mn=180/Math.PI,ms=Math.PI/180,ss=Math.atan2,_h=1e8,Al=/([A-Z])/g,fv=/(left|right|width|margin|padding|x)/i,pv=/[\s,\(]\S/,Mi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ha=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},mv=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},gv=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},_v=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},td=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},id=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},xv=function(e,t,i){return e.style[t]=i},vv=function(e,t,i){return e.style.setProperty(t,i)},yv=function(e,t,i){return e._gsap[t]=i},bv=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},Mv=function(e,t,i,n,s){var r=e._gsap;r.scaleX=r.scaleY=i,r.renderTransform(s,r)},wv=function(e,t,i,n,s){var r=e._gsap;r[t]=i,r.renderTransform(s,r)},Ke="transform",_i=Ke+"Origin",Sv=function a(e,t){var i=this,n=this.target,s=n.style;if(e in Wi){if(this.tfm=this.tfm||{},e!=="transform")e=Mi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(r){return i.tfm[r]=Fi(n,r)}):this.tfm[e]=n._gsap.x?n._gsap[e]:Fi(n,e);else return Mi.transform.split(",").forEach(function(r){return a.call(i,r,t)});if(this.props.indexOf(Ke)>=0)return;n._gsap.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(_i,t,"")),e=Ke}(s||t)&&this.props.push(e,t,s[e])},nd=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Tv=function(){var e=this.props,t=this.target,i=t.style,n=t._gsap,s,r;for(s=0;s<e.length;s+=3)e[s+1]?t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Al,"-$1").toLowerCase());if(this.tfm){for(r in this.tfm)n[r]=this.tfm[r];n.svg&&(n.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Tl(),(!s||!s.isStart)&&!i[Ke]&&(nd(i),n.uncache=1)}},sd=function(e,t){var i={target:e,props:[],revert:Tv,save:Sv};return e._gsap||Vt.core.getCache(e),t&&t.split(",").forEach(function(n){return i.save(n)}),i},rd,Wa=function(e,t){var i=en.createElementNS?en.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):en.createElement(e);return i.style?i:en.createElement(e)},Si=function a(e,t,i){var n=getComputedStyle(e);return n[t]||n.getPropertyValue(t.replace(Al,"-$1").toLowerCase())||n.getPropertyValue(t)||!i&&a(e,Ps(t)||t,1)||""},xh="O,Moz,ms,Ms,Webkit".split(","),Ps=function(e,t,i){var n=t||Tn,s=n.style,r=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);r--&&!(xh[r]+e in s););return r<0?null:(r===3?"ms":r>=0?xh[r]:"")+e},ja=function(){dv()&&window.document&&(mh=window,en=mh.document,ps=en.documentElement,Tn=Wa("div")||{style:{}},Wa("div"),Ke=Ps(Ke),_i=Ke+"Origin",Tn.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",rd=!!Ps("perspective"),Tl=Vt.core.reverting,Sl=1)},fa=function a(e){var t=Wa("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,n=this.nextSibling,s=this.style.cssText,r;if(ps.appendChild(t),t.appendChild(this),this.style.display="block",e)try{r=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=a}catch{}else this._gsapBBox&&(r=this._gsapBBox());return i&&(n?i.insertBefore(this,n):i.appendChild(this)),ps.removeChild(t),this.style.cssText=s,r},vh=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},od=function(e){var t;try{t=e.getBBox()}catch{t=fa.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===fa||(t=fa.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+vh(e,["x","cx","x1"])||0,y:+vh(e,["y","cy","y1"])||0,width:0,height:0}:t},ad=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&od(e))},pr=function(e,t){if(t){var i=e.style;t in Wi&&t!==_i&&(t=Ke),i.removeProperty?((t.substr(0,2)==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(t.replace(Al,"-$1").toLowerCase())):i.removeAttribute(t)}},tn=function(e,t,i,n,s,r){var o=new Ut(e._pt,t,i,0,1,r?id:td);return e._pt=o,o.b=n,o.e=s,e._props.push(i),o},yh={deg:1,rad:1,turn:1},Av={grid:1,flex:1},ln=function a(e,t,i,n){var s=parseFloat(i)||0,r=(i+"").trim().substr((s+"").length)||"px",o=Tn.style,l=fv.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,d=n==="px",m=n==="%",g,f,p,_;return n===r||!s||yh[n]||yh[r]?s:(r!=="px"&&!d&&(s=a(e,t,i,"px")),_=e.getCTM&&ad(e),(m||r==="%")&&(Wi[t]||~t.indexOf("adius"))?(g=_?e.getBBox()[l?"width":"height"]:e[h],tt(m?s/g*u:s/100*g)):(o[l?"width":"height"]=u+(d?r:n),f=~t.indexOf("adius")||n==="em"&&e.appendChild&&!c?e:e.parentNode,_&&(f=(e.ownerSVGElement||{}).parentNode),(!f||f===en||!f.appendChild)&&(f=en.body),p=f._gsap,p&&m&&p.width&&l&&p.time===qt.time&&!p.uncache?tt(s/p.width*u):((m||r==="%")&&!Av[Si(f,"display")]&&(o.position=Si(e,"position")),f===e&&(o.position="static"),f.appendChild(Tn),g=Tn[h],f.removeChild(Tn),o.position="absolute",l&&m&&(p=Ln(f),p.time=qt.time,p.width=f[h]),tt(d?g*s/u:g&&s?u/g*s:0))))},Fi=function(e,t,i,n){var s;return Sl||ja(),t in Mi&&t!=="transform"&&(t=Mi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Wi[t]&&t!=="transform"?(s=gr(e,n),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:uo(Si(e,_i))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||n||~(s+"").indexOf("calc("))&&(s=ho[t]&&ho[t](e,t,i)||Si(e,t)||wu(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?ln(e,t,s,i)+i:s},Ev=function(e,t,i,n){if(!i||i==="none"){var s=Ps(t,e,1),r=s&&Si(e,s,1);r&&r!==i?(t=s,i=r):t==="borderColor"&&(i=Si(e,"borderTopColor"))}var o=new Ut(this._pt,e.style,t,0,1,Ju),l=0,c=0,h,u,d,m,g,f,p,_,b,v,M,y;if(o.b=i,o.e=n,i+="",n+="",n==="auto"&&(e.style[t]=n,n=Si(e,t)||n,e.style[t]=i),h=[i,n],Gu(h),i=h[0],n=h[1],d=i.match(cs)||[],y=n.match(cs)||[],y.length){for(;u=cs.exec(n);)p=u[0],b=n.substring(l,u.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),p!==(f=d[c++]||"")&&(m=parseFloat(f)||0,M=f.substr((m+"").length),p.charAt(1)==="="&&(p=fs(m,p)+M),_=parseFloat(p),v=p.substr((_+"").length),l=cs.lastIndex-v.length,v||(v=v||Kt.units[t]||M,l===n.length&&(n+=v,o.e+=v)),M!==v&&(m=ln(e,t,f,v)||0),o._pt={_next:o._pt,p:b||c===1?b:",",s:m,c:_-m,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<n.length?n.substring(l,n.length):""}else o.r=t==="display"&&n==="none"?id:td;return _u.test(n)&&(o.e=0),this._pt=o,o},bh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Cv=function(e){var t=e.split(" "),i=t[0],n=t[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(e=i,i=n,n=e),t[0]=bh[i]||i,t[1]=bh[n]||n,t.join(" ")},Lv=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,n=i.style,s=t.u,r=i._gsap,o,l,c;if(s==="all"||s===!0)n.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Wi[o]&&(l=1,o=o==="transformOrigin"?_i:Ke),pr(i,o);l&&(pr(i,Ke),r&&(r.svg&&i.removeAttribute("transform"),gr(i,1),r.uncache=1,nd(n)))}},ho={clearProps:function(e,t,i,n,s){if(s.data!=="isFromStart"){var r=e._pt=new Ut(e._pt,t,i,0,0,Lv);return r.u=n,r.pr=-10,r.tween=s,e._props.push(i),1}}},mr=[1,0,0,1,0,0],ld={},cd=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Mh=function(e){var t=Si(e,Ke);return cd(t)?mr:t.substr(7).match(gu).map(tt)},El=function(e,t){var i=e._gsap||Ln(e),n=e.style,s=Mh(e),r,o,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?mr:s):(s===mr&&!e.offsetParent&&e!==ps&&!i.svg&&(l=n.display,n.display="block",r=e.parentNode,(!r||!e.offsetParent)&&(c=1,o=e.nextElementSibling,ps.appendChild(e)),s=Mh(e),l?n.display=l:pr(e,"display"),c&&(o?r.insertBefore(e,o):r?r.appendChild(e):ps.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Xa=function(e,t,i,n,s,r){var o=e._gsap,l=s||El(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,m=l[0],g=l[1],f=l[2],p=l[3],_=l[4],b=l[5],v=t.split(" "),M=parseFloat(v[0])||0,y=parseFloat(v[1])||0,A,C,x,S;i?l!==mr&&(C=m*p-g*f)&&(x=M*(p/C)+y*(-f/C)+(f*b-p*_)/C,S=M*(-g/C)+y*(m/C)-(m*b-g*_)/C,M=x,y=S):(A=od(e),M=A.x+(~v[0].indexOf("%")?M/100*A.width:M),y=A.y+(~(v[1]||v[0]).indexOf("%")?y/100*A.height:y)),n||n!==!1&&o.smooth?(_=M-c,b=y-h,o.xOffset=u+(_*m+b*f)-_,o.yOffset=d+(_*g+b*p)-b):o.xOffset=o.yOffset=0,o.xOrigin=M,o.yOrigin=y,o.smooth=!!n,o.origin=t,o.originIsAbsolute=!!i,e.style[_i]="0px 0px",r&&(tn(r,o,"xOrigin",c,M),tn(r,o,"yOrigin",h,y),tn(r,o,"xOffset",u,o.xOffset),tn(r,o,"yOffset",d,o.yOffset)),e.setAttribute("data-svg-origin",M+" "+y)},gr=function(e,t){var i=e._gsap||new Xu(e);if("x"in i&&!t&&!i.uncache)return i;var n=e.style,s=i.scaleX<0,r="px",o="deg",l=getComputedStyle(e),c=Si(e,_i)||"0",h,u,d,m,g,f,p,_,b,v,M,y,A,C,x,S,R,B,K,D,I,z,$,Y,U,ee,Z,V,G,Q,J,se;return h=u=d=f=p=_=b=v=M=0,m=g=1,i.svg=!!(e.getCTM&&ad(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(n[Ke]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ke]!=="none"?l[Ke]:"")),n.scale=n.rotate=n.translate="none"),C=El(e,i.svg),i.svg&&(i.uncache?(U=e.getBBox(),c=i.xOrigin-U.x+"px "+(i.yOrigin-U.y)+"px",Y=""):Y=!t&&e.getAttribute("data-svg-origin"),Xa(e,Y||c,!!Y||i.originIsAbsolute,i.smooth!==!1,C)),y=i.xOrigin||0,A=i.yOrigin||0,C!==mr&&(B=C[0],K=C[1],D=C[2],I=C[3],h=z=C[4],u=$=C[5],C.length===6?(m=Math.sqrt(B*B+K*K),g=Math.sqrt(I*I+D*D),f=B||K?ss(K,B)*Mn:0,b=D||I?ss(D,I)*Mn+f:0,b&&(g*=Math.abs(Math.cos(b*ms))),i.svg&&(h-=y-(y*B+A*D),u-=A-(y*K+A*I))):(se=C[6],Q=C[7],Z=C[8],V=C[9],G=C[10],J=C[11],h=C[12],u=C[13],d=C[14],x=ss(se,G),p=x*Mn,x&&(S=Math.cos(-x),R=Math.sin(-x),Y=z*S+Z*R,U=$*S+V*R,ee=se*S+G*R,Z=z*-R+Z*S,V=$*-R+V*S,G=se*-R+G*S,J=Q*-R+J*S,z=Y,$=U,se=ee),x=ss(-D,G),_=x*Mn,x&&(S=Math.cos(-x),R=Math.sin(-x),Y=B*S-Z*R,U=K*S-V*R,ee=D*S-G*R,J=I*R+J*S,B=Y,K=U,D=ee),x=ss(K,B),f=x*Mn,x&&(S=Math.cos(x),R=Math.sin(x),Y=B*S+K*R,U=z*S+$*R,K=K*S-B*R,$=$*S-z*R,B=Y,z=U),p&&Math.abs(p)+Math.abs(f)>359.9&&(p=f=0,_=180-_),m=tt(Math.sqrt(B*B+K*K+D*D)),g=tt(Math.sqrt($*$+se*se)),x=ss(z,$),b=Math.abs(x)>2e-4?x*Mn:0,M=J?1/(J<0?-J:J):0),i.svg&&(Y=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!cd(Si(e,Ke)),Y&&e.setAttribute("transform",Y))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(m*=-1,b+=f<=0?180:-180,f+=f<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||i.uncache,i.x=h-((i.xPercent=h&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+r,i.y=u-((i.yPercent=u&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+r,i.z=d+r,i.scaleX=tt(m),i.scaleY=tt(g),i.rotation=tt(f)+o,i.rotationX=tt(p)+o,i.rotationY=tt(_)+o,i.skewX=b+o,i.skewY=v+o,i.transformPerspective=M+r,(i.zOrigin=parseFloat(c.split(" ")[2])||0)&&(n[_i]=uo(c)),i.xOffset=i.yOffset=0,i.force3D=Kt.force3D,i.renderTransform=i.svg?Rv:rd?hd:Pv,i.uncache=0,i},uo=function(e){return(e=e.split(" "))[0]+" "+e[1]},pa=function(e,t,i){var n=At(t);return tt(parseFloat(t)+parseFloat(ln(e,"x",i+"px",n)))+n},Pv=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,hd(e,t)},xn="0deg",Xs="0px",vn=") ",hd=function(e,t){var i=t||this,n=i.xPercent,s=i.yPercent,r=i.x,o=i.y,l=i.z,c=i.rotation,h=i.rotationY,u=i.rotationX,d=i.skewX,m=i.skewY,g=i.scaleX,f=i.scaleY,p=i.transformPerspective,_=i.force3D,b=i.target,v=i.zOrigin,M="",y=_==="auto"&&e&&e!==1||_===!0;if(v&&(u!==xn||h!==xn)){var A=parseFloat(h)*ms,C=Math.sin(A),x=Math.cos(A),S;A=parseFloat(u)*ms,S=Math.cos(A),r=pa(b,r,C*S*-v),o=pa(b,o,-Math.sin(A)*-v),l=pa(b,l,x*S*-v+v)}p!==Xs&&(M+="perspective("+p+vn),(n||s)&&(M+="translate("+n+"%, "+s+"%) "),(y||r!==Xs||o!==Xs||l!==Xs)&&(M+=l!==Xs||y?"translate3d("+r+", "+o+", "+l+") ":"translate("+r+", "+o+vn),c!==xn&&(M+="rotate("+c+vn),h!==xn&&(M+="rotateY("+h+vn),u!==xn&&(M+="rotateX("+u+vn),(d!==xn||m!==xn)&&(M+="skew("+d+", "+m+vn),(g!==1||f!==1)&&(M+="scale("+g+", "+f+vn),b.style[Ke]=M||"translate(0, 0)"},Rv=function(e,t){var i=t||this,n=i.xPercent,s=i.yPercent,r=i.x,o=i.y,l=i.rotation,c=i.skewX,h=i.skewY,u=i.scaleX,d=i.scaleY,m=i.target,g=i.xOrigin,f=i.yOrigin,p=i.xOffset,_=i.yOffset,b=i.forceCSS,v=parseFloat(r),M=parseFloat(o),y,A,C,x,S;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=ms,c*=ms,y=Math.cos(l)*u,A=Math.sin(l)*u,C=Math.sin(l-c)*-d,x=Math.cos(l-c)*d,c&&(h*=ms,S=Math.tan(c-h),S=Math.sqrt(1+S*S),C*=S,x*=S,h&&(S=Math.tan(h),S=Math.sqrt(1+S*S),y*=S,A*=S)),y=tt(y),A=tt(A),C=tt(C),x=tt(x)):(y=u,x=d,A=C=0),(v&&!~(r+"").indexOf("px")||M&&!~(o+"").indexOf("px"))&&(v=ln(m,"x",r,"px"),M=ln(m,"y",o,"px")),(g||f||p||_)&&(v=tt(v+g-(g*y+f*C)+p),M=tt(M+f-(g*A+f*x)+_)),(n||s)&&(S=m.getBBox(),v=tt(v+n/100*S.width),M=tt(M+s/100*S.height)),S="matrix("+y+","+A+","+C+","+x+","+v+","+M+")",m.setAttribute("transform",S),b&&(m.style[Ke]=S)},Dv=function(e,t,i,n,s){var r=360,o=xt(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Mn:1),c=l-n,h=n+c+"deg",u,d;return o&&(u=s.split("_")[1],u==="short"&&(c%=r,c!==c%(r/2)&&(c+=c<0?r:-r)),u==="cw"&&c<0?c=(c+r*_h)%r-~~(c/r)*r:u==="ccw"&&c>0&&(c=(c-r*_h)%r-~~(c/r)*r)),e._pt=d=new Ut(e._pt,t,i,n,c,mv),d.e=h,d.u="deg",e._props.push(i),d},wh=function(e,t){for(var i in t)e[i]=t[i];return e},Iv=function(e,t,i){var n=wh({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",r=i.style,o,l,c,h,u,d,m,g;n.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),r[Ke]=t,o=gr(i,1),pr(i,Ke),i.setAttribute("transform",c)):(c=getComputedStyle(i)[Ke],r[Ke]=t,o=gr(i,1),r[Ke]=c);for(l in Wi)c=n[l],h=o[l],c!==h&&s.indexOf(l)<0&&(m=At(c),g=At(h),u=m!==g?ln(i,l,c,g):parseFloat(c),d=parseFloat(h),e._pt=new Ut(e._pt,o,l,u,d-u,Ha),e._pt.u=g||0,e._props.push(l));wh(o,n)};zt("padding,margin,Width,Radius",function(a,e){var t="Top",i="Right",n="Bottom",s="Left",r=(e<3?[t,i,n,s]:[t+s,t+i,n+i,n+s]).map(function(o){return e<2?a+o:"border"+o+a});ho[e>1?"border"+a:a]=function(o,l,c,h,u){var d,m;if(arguments.length<4)return d=r.map(function(g){return Fi(o,g,c)}),m=d.join(" "),m.split(d[0]).length===5?d[0]:m;d=(h+"").split(" "),m={},r.forEach(function(g,f){return m[g]=d[f]=d[f]||d[(f-1)/2|0]}),o.init(l,m,u)}});var ud={name:"css",register:ja,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,n,s){var r=this._props,o=e.style,l=i.vars.startAt,c,h,u,d,m,g,f,p,_,b,v,M,y,A,C,x;Sl||ja(),this.styles=this.styles||sd(e),x=this.styles.props,this.tween=i;for(f in t)if(f!=="autoRound"&&(h=t[f],!(Xt[f]&&qu(f,t,i,n,e,s)))){if(m=typeof h,g=ho[f],m==="function"&&(h=h.call(i,n,e,s),m=typeof h),m==="string"&&~h.indexOf("random(")&&(h=dr(h)),g)g(this,e,f,h,i)&&(C=1);else if(f.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(f)+"").trim(),h+="",rn.lastIndex=0,rn.test(c)||(p=At(c),_=At(h)),_?p!==_&&(c=ln(e,f,c,_)+_):p&&(h+=p),this.add(o,"setProperty",c,h,n,s,0,0,f),r.push(f),x.push(f,0,o[f]);else if(m!=="undefined"){if(l&&f in l?(c=typeof l[f]=="function"?l[f].call(i,n,e,s):l[f],xt(c)&&~c.indexOf("random(")&&(c=dr(c)),At(c+"")||(c+=Kt.units[f]||At(Fi(e,f))||""),(c+"").charAt(1)==="="&&(c=Fi(e,f))):c=Fi(e,f),d=parseFloat(c),b=m==="string"&&h.charAt(1)==="="&&h.substr(0,2),b&&(h=h.substr(2)),u=parseFloat(h),f in Mi&&(f==="autoAlpha"&&(d===1&&Fi(e,"visibility")==="hidden"&&u&&(d=0),x.push("visibility",0,o.visibility),tn(this,o,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),f!=="scale"&&f!=="transform"&&(f=Mi[f],~f.indexOf(",")&&(f=f.split(",")[0]))),v=f in Wi,v){if(this.styles.save(f),M||(y=e._gsap,y.renderTransform&&!t.parseTransform||gr(e,t.parseTransform),A=t.smoothOrigin!==!1&&y.smooth,M=this._pt=new Ut(this._pt,o,Ke,0,1,y.renderTransform,y,0,-1),M.dep=1),f==="scale")this._pt=new Ut(this._pt,y,"scaleY",y.scaleY,(b?fs(y.scaleY,b+u):u)-y.scaleY||0,Ha),this._pt.u=0,r.push("scaleY",f),f+="X";else if(f==="transformOrigin"){x.push(_i,0,o[_i]),h=Cv(h),y.svg?Xa(e,h,0,A,0,this):(_=parseFloat(h.split(" ")[2])||0,_!==y.zOrigin&&tn(this,y,"zOrigin",y.zOrigin,_),tn(this,o,f,uo(c),uo(h)));continue}else if(f==="svgOrigin"){Xa(e,h,1,A,0,this);continue}else if(f in ld){Dv(this,y,f,d,b?fs(d,b+h):h);continue}else if(f==="smoothOrigin"){tn(this,y,"smooth",y.smooth,h);continue}else if(f==="force3D"){y[f]=h;continue}else if(f==="transform"){Iv(this,h,e);continue}}else f in o||(f=Ps(f)||f);if(v||(u||u===0)&&(d||d===0)&&!pv.test(h)&&f in o)p=(c+"").substr((d+"").length),u||(u=0),_=At(h)||(f in Kt.units?Kt.units[f]:p),p!==_&&(d=ln(e,f,c,_)),this._pt=new Ut(this._pt,v?y:o,f,d,(b?fs(d,b+u):u)-d,!v&&(_==="px"||f==="zIndex")&&t.autoRound!==!1?_v:Ha),this._pt.u=_||0,p!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=gv);else if(f in o)Ev.call(this,e,f,c,b?b+h:h);else if(f in e)this.add(e,f,c||e[f],b?b+h:h,n,s);else if(f!=="parseTransform"){ml(f,h);continue}v||(f in o?x.push(f,0,o[f]):x.push(f,1,c||e[f])),r.push(f)}}C&&Qu(this)},render:function(e,t){if(t.tween._time||!Tl())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Fi,aliases:Mi,getSetter:function(e,t,i){var n=Mi[t];return n&&n.indexOf(",")<0&&(t=n),t in Wi&&t!==_i&&(e._gsap.x||Fi(e,"x"))?i&&gh===i?t==="scale"?bv:yv:(gh=i||{})&&(t==="scale"?Mv:wv):e.style&&!dl(e.style[t])?xv:~t.indexOf("-")?vv:Ml(e,t)},core:{_removeProperty:pr,_getMatrix:El}};Vt.utils.checkPrefix=Ps;Vt.core.getStyleSaver=sd;(function(a,e,t,i){var n=zt(a+","+e+","+t,function(s){Wi[s]=1});zt(e,function(s){Kt.units[s]="deg",ld[s]=1}),Mi[n[13]]=a+","+e,zt(i,function(s){var r=s.split(":");Mi[r[1]]=n[r[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");zt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(a){Kt.units[a]="px"});Vt.registerPlugin(ud);var vt=Vt.registerPlugin(ud)||Vt;vt.core.Tween;class kv{constructor(){this.experience=new Jt,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.canvas=this.experience.canvas,this.debug=this.experience.debug,this.experienceControls=null,this.initialPosition=new P(-4,4,8),this.checkPcOrPhoneZoom(),this.setInstance(),this.setOrbitControls(),this.debug.active&&(this.debugFolder=this.debug.ui.addFolder("Camera"),this.addDebugValues())}checkPcOrPhoneZoom(){this.sizes.width>=969?this.initialPosition=new P(-4.86,5.41,9.57):this.initialPosition=new P(-4,9,18)}setInstance(){this.instance=new kt(35,this.sizes.width/this.sizes.height,.1,100),this.instance.position.set(this.initialPosition.x,this.initialPosition.y,this.initialPosition.z),this.scene.add(this.instance)}setOrbitControls(){this.controls=new yx(this.instance,this.canvas),this.controls.enableDamping=!0,this.controls.enablePan=!1,this.controls.enableRotate=!0,this.controls.enableZoom=!0,this.controls.minDistance=0,this.controls.maxDistance=22,this.controls.minAzimuthAngle=-Math.PI*.5,this.controls.maxAzimuthAngle=0,this.controls.maxPolarAngle=Math.PI*.5}resize(){this.checkPcOrPhoneZoom(),this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}moveToProjects(){this.stopCameraMovement(),vt.to(this.instance.position,{duration:1,x:-1.57,y:1.57,z:2.174,onComplete:()=>{this.experienceControls.changeToProjectButtonsCollider()}}),vt.to(this.controls.target,{duration:1,x:-1.45,y:1.46,z:-1.7})}moveToAbout(){this.stopCameraMovement(),vt.to(this.instance.position,{duration:1,x:-1.31,y:.168,z:1.708,onComplete:()=>{this.experienceControls.changeToAboutButtonsColliders()}}),vt.to(this.controls.target,{duration:1,x:1.9,y:.38,z:1.87})}moveToTelevision(){this.stopCameraMovement(),this.sizes.width<980?(vt.to(this.instance.position,{duration:1,x:-8.321,y:1.7,z:-2,onComplete:()=>{this.experienceControls.changeToTelevisionButtonsColliders()}}),vt.to(this.controls.target,{duration:1,x:-3,y:1.7,z:-1.99})):(vt.to(this.instance.position,{duration:1,x:-5.321,y:1.7,z:-2,onComplete:()=>{this.experienceControls.changeToTelevisionButtonsColliders()}}),vt.to(this.controls.target,{duration:1,x:-3,y:1.7,z:-1.99}))}moveToStart(){vt.to(this.instance.position,{duration:1,x:this.initialPosition.x,y:this.initialPosition.y,z:this.initialPosition.z,onComplete:()=>{this.experienceControls.changeToInitialSceneColliders(),this.enableCameraMovement()}}),vt.to(this.controls.target,{duration:1,x:0,y:0,z:.3})}update(){this.controls.update()}stopCameraMovement(){this.controls.enableRotate=!1,this.controls.enableZoom=!1,this.controls.enableDamping=!1,this.controls.enablePan=!1}enableCameraMovement(){this.controls.enableRotate=!0,this.controls.enableZoom=!0,this.controls.enableDamping=!0}enableFullCameraMovement(){this.controls.enableRotate=!0,this.controls.enableZoom=!0,this.controls.enableDamping=!0,this.controls.enablePan=!0,this.controls.minDistance=0,this.controls.maxDistance=1/0,this.controls.minAzimuthAngle=1/0,this.controls.maxAzimuthAngle=1/0}addDebugValues(){this.debugFolder.add(this.controls,"enablePan").name("enableFullCameraMovement").onChange(()=>{this.enableFullCameraMovement()})}}class Nv{constructor(){this.experience=new Jt,this.canvas=this.experience.canvas,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.camera=this.experience.camera,this.debug=this.experience.debug,this.debug.active&&(this.debugFolder=this.debug.ui.addFolder("renderer")),this.setInstance()}setInstance(){this.instance=new iu({canvas:this.canvas,antialias:!0}),this.instance.physicallyCorrectLights=!0,this.instance.outputEncoding=Me,this.instance.shadowMap.enabled=!0,this.instance.shadowMap.type=Dh,this.instance.setClearColor("#1c1c1c"),this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio),this.debug.active&&(this.parameters={backgroundColor:"#1c1c1c"},this.debugFolder.addColor(this.parameters,"backgroundColor").name("BackgroundColor").onChange(()=>{this.instance.setClearColor(this.parameters.backgroundColor)}))}resize(){this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)}update(){this.instance.render(this.scene,this.camera.instance)}}class Ov{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.debug=this.experience.debug,this.debug.active&&(this.debugFolder=this.debug.ui.addFolder("environment")),this.setSunLight(),this.setEnvironmentMap()}setSunLight(){this.ambientLight=new nx("#ffffff",.4),this.scene.add(this.ambientLight),this.sunLight=new Pa("#ffffff",15),this.sunLight.castShadow=!0,this.sunLight.shadow.camera.far=15,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.normalBias=.05,this.sunLight.position.set(.943,4.262,-.532),this.scene.add(this.sunLight),this.bellLight=new Pa("#ff2400",3),this.bellLight.position.set(-1.92,.5,2.27),this.scene.add(this.bellLight);const e=new sl("#1c1c1c",20,30);this.scene.fog=e}setEnvironmentMap(){this.environmentMap={},this.environmentMap.intensity=1,this.environmentMap.texture=this.resources.items.environmentMapTexture,this.environmentMap.texture.encoding=Me,this.setEnvironmentMap.updateMaterial=()=>{this.scene.traverse(e=>{e instanceof Re&&e.material instanceof Je&&(e.name=="bellSpehere"||e.name=="bellCylinder"||e.name=="bellBody")&&(e.material.envMap=this.environmentMap.texture,e.material.envMapIntensity=this.environmentMap.intensity,e.material.needUpdate=!0)})},this.setEnvironmentMap.updateMaterial(),this.debug.active&&(this.debugFolder.add(this.environmentMap,"intensity").name("envMapIntensity").min(0).max(4).step(.001).onChange(this.setEnvironmentMap.updateMaterial),this.debugFolder.add(this.sunLight,"intensity").name("sunLightIntensity").min(-5).max(50).step(.001),this.debugFolder.add(this.sunLight.position,"x").name("sunLightX").min(-5).max(5).step(.001),this.debugFolder.add(this.sunLight.position,"y").name("sunLightY").min(-5).max(5).step(.001),this.debugFolder.add(this.sunLight.position,"z").name("sunLightZ").min(-5).max(5).step(.001),this.debugFolder.add(this.sunLight.rotation,"x").name("sunLightRotX").min(-5).max(5).step(.001),this.debugFolder.add(this.sunLight.rotation,"y").name("sunLightRotY").min(-5).max(5).step(.001),this.debugFolder.add(this.sunLight.rotation,"z").name("sunLightRotZ").min(-5).max(5).step(.001),this.debugFolder.addColor(this.sunLight,"color").name("sunLightColor"),this.debugFolder.addColor(this.bellLight,"color").name("bellLightColor"))}}class Fv{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.time=this.experience.time,this.debug=this.experience.debug,this.camera=this.experience.camera,this.mouse=this.experience.sizes.mouse,this.raycaster=new du,this.currentIntersect=null,this.bellObjects=[],this.projectPicture=null,this.aboutPicture=null,this.canUpdate=!0,this.debug.active&&(this.debugFolder=this.debug.ui.addFolder("roomSpider")),this.resource=this.resources.items.roomModel,this.arrow=this.resources.items.arrowModel,this.secondaryFloor=this.resources.items.secondaryFloor,this.setModel(),this.setTexture()}setModel(){this.model=this.resource.scene,this.model.receiveShadow=!0,this.arrowModel=this.arrow.scene,this.arrowModel.receiveShadow=!0,this.secondaryFloorModel=this.secondaryFloor.scene,this.secondaryFloorModel.scale.x=1,this.secondaryFloorModel.scale.z=1,this.scene.add(this.model,this.arrowModel,this.secondaryFloorModel)}setTexture(){this.textures={},this.textures.floorColor=this.resources.items.floorColorTexture,this.textures.floorColor.encoding=Me,this.textures.wallLeftColor=this.resources.items.wallLeftColor,this.textures.wallLeftColor.encoding=Me,this.textures.wallRightColor=this.resources.items.wallRightColor,this.textures.wallRightColor.encoding=Me,this.textures.bellBoxColor=this.resources.items.bellBoxColor,this.textures.bellBoxColor.encoding=Me,this.textures.aboutColor=this.resources.items.AboutColor,this.textures.aboutColor.encoding=Me,this.textures.contactColor=this.resources.items.AboutContactColor,this.textures.contactColor.encoding=Me,this.projectTextures=[],this.setProjectTextures();const e=new Je({map:this.textures.floorColor}),t=new Je({map:this.textures.wallLeftColor}),i=new Je({map:this.textures.wallRightColor}),n=new Je({map:this.textures.bellBoxColor}),s=new Je({color:"#b68715"});s.roughness=.1,s.metalness=1;const r=new Je({map:this.projectTextures[0]}),o=new Je({color:"#2B2A29"}),l=new Je({map:this.textures.aboutColor});this.model.traverse(c=>{if(c instanceof Re)switch(c.receiveShadow=!0,c.name){case"Floor":c.material=e;break;case"WallLeft":c.material=t;break;case"WallRight":c.material=i;break;case"PictureLeft":c.material=r,this.projectPicture=c;break;case"PictureRight":c.material=l,this.aboutPicture=c;break;case"bellSpehere":c.material=s,this.bellObjects.push(c);break;case"bellCylinder":c.material=s,this.bellObjects.push(c);break;case"bellBody":c.material=s,this.bellObjects.push(c);break;case"BellPlatform":c.material=o,this.bellObjects.push(c);break;case"BellBox":c.material=n;break}}),this.arrowModel.traverse(c=>{c instanceof Re&&(c.material=new Je({color:"#ff2400"}))}),this.secondaryFloorTexture=this.resources.items.secondaryFloorTexture,this.secondaryFloorModel.traverse(c=>{c instanceof Re&&(c.material=new Je({map:this.secondaryFloorTexture}))})}setProjectTextures(){this.projectTextures.push(this.resources.items.PipColor),this.projectTextures.push(this.resources.items.LittleGuyColor),this.projectTextures.push(this.resources.items.ButlerColor),this.projectTextures.push(this.resources.items.BikingImproverColor),this.projectTextures.push(this.resources.items.BlackjackColor);for(let e of this.projectTextures)e.encoding=Me}changeProjectPicture(e){this.projectPicture.material.map=this.projectTextures[e],this.projectPicture.material.needsUpdate=!0}changeAboutToCurriculum(){this.aboutPicture.material.map=this.textures.contactColor,this.aboutPicture.material.needsUpdate=!0}changeCurriculumToAbout(){this.aboutPicture.material.map=this.resources.items.AboutColor,this.aboutPicture.material.needsUpdate=!0}removeArrow(){this.canUpdate=!1,this.arrowModel&&vt.to(this.arrowModel.children[0].scale,{duration:1,x:0,y:0,z:0,onComplete:()=>{this.arrowModel.traverse(e=>{if(e instanceof Re){e.geometry.dispose();for(const t in e.material){const i=e.material[t];i&&typeof i.dispose=="function"&&i.dispose()}}}),this.scene.remove(this.arrowModel),this.arrowModel=null}})}update(){this.arrowModel&&this.canUpdate&&(this.arrowModel.children[0].scale.x=Math.abs(Math.sin(this.time.elapsed*.002)*.03)+.25,this.arrowModel.children[0].scale.y=Math.abs(Math.sin(this.time.elapsed*.002)*.03)+.25,this.arrowModel.children[0].scale.z=Math.abs(Math.sin(this.time.elapsed*.002)*.03)+.25)}}class Bv{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.time=this.experience.time,this.debug=this.experience.debug,this.projectNumber=0,this.numberOfProjects=4,this.currentProject=null,this.spiderGroup=new Ui,this.pip=this.experience.world.pip,this.littleGuy=this.experience.world.littleGuy,this.bikingImprover=this.experience.world.bikingImprover,this.butler=this.experience.world.butler,this.blackjack=this.experience.world.blackjack,this.debug.active&&(this.debugFolder=this.debug.ui.addFolder("Spider")),this.resource=this.resources.items.spiderModel,this.setProjects(),this.setModel(),this.setAnimation()}setProjects(){this.projectResources=[],this.setProjectsTextures()}setProjectsTextures(){this.projectResources.push(this.pip.model),this.projectResources.push(this.littleGuy.model),this.projectResources.push(this.butler.model),this.projectResources.push(this.bikingImprover.model),this.projectResources.push(this.blackjack.model)}setModel(){this.model=this.resource.scene,this.model.traverse(e=>{e instanceof Re&&(e.castShadow=!0)}),this.spiderGroup.position.set(4,0,.3),this.spiderGroup.add(this.model),this.model.position.set(0,0,-.5),this.spiderGroup.visible=!1,this.scene.add(this.spiderGroup)}setAnimation(){this.animation={},this.animation.mixer=new _x(this.model),this.animation.actions={},this.animation.actions.idle=this.animation.mixer.clipAction(this.resource.animations[1]),this.animation.actions.current=this.animation.actions.idle,this.animation.actions.current.play()}moveToCenter(){this.spiderGroup.visible=!0,vt.to(this.spiderGroup.position,{duration:1,delay:.5,x:0}),vt.to(this.spiderGroup.position,{duration:1,delay:1.5,y:-1.6,onComplete:()=>this.createProjectObject()})}createProjectObject(){this.currentProject&&this.scene.remove(this.currentProject),this.projectNumber++,this.projectNumber>this.numberOfProjects&&(this.projectNumber=0),this.experience.projectNumber=this.projectNumber,this.experience.changePictureProject(this.projectNumber),this.scene.add(this.projectResources[this.projectNumber]),this.currentProject=this.projectResources[this.projectNumber],this.goOut()}createProjectFromControls(){this.currentProject&&this.scene.remove(this.currentProject),this.projectNumber++,this.projectNumber>this.numberOfProjects&&(this.projectNumber=0),this.experience.projectNumber=this.projectNumber,this.experience.changePictureProject(this.projectNumber),this.scene.add(this.projectResources[this.projectNumber]),this.currentProject=this.projectResources[this.projectNumber]}goOut(){vt.to(this.spiderGroup.position,{duration:1,delay:.2,y:0}),vt.to(this.spiderGroup.rotation,{duration:1,delay:.2,y:-Math.PI/2}),vt.to(this.spiderGroup.position,{duration:1,delay:1.2,z:-5,onComplete:()=>{this.resetSpider(),this.activateBell()}})}resetSpider(){this.spiderGroup.visible=!1,this.spiderGroup.position.set(4,0,.3),this.spiderGroup.rotation.set(0,0,0)}activateBell(){this.experience.activateBell()}update(){this.animation.mixer.update(this.time.delta*.001)}}class qr{constructor(e,t,i){this.experience=new Jt,this.scene=this.experience.scene,this.sizes=this.experience.sizes,this.resources=this.experience.resources,this.time=this.experience.time,this.debug=this.experience.debug,this.position=i,this.resource=e,t!=null?(t.encoding=Me,this.setModel(t)):this.setModelPos()}setModel(e){this.model=this.resource.scene,this.model.position.set(this.position.x,this.position.y,this.position.z),this.model.traverse(t=>{t instanceof Re&&(t.castShadow=!0,t.material=new Je({map:e}))})}setModelPos(){this.model=this.resource.scene,this.model.position.set(this.position.x,this.position.y,this.position.z)}}class zv{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.time=this.experience.time,this.debug=this.experience.debug,this.resource=this.resources.items.ButlerModel,this.model=new Ui,this.setModel()}setModel(){this.model.position.set(.1,-1,.14);const e={};e.knifeTexture=this.resources.items.KnifeTexture,e.cameraTexture=this.resources.items.CameraTexture,e.knifeTexture.encoding=Me,e.cameraTexture.encoding=Me;const t=new Je({map:e.knifeTexture}),i=new Je({map:e.cameraTexture});this.resource.scene.traverse(n=>{if(n instanceof Re)switch(n.castShadow=!0,n.name){case"Knife":n.material=t;break;case"Camera":n.material=i;break}}),this.model.add(this.resource.scene)}}class Uv{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.time=this.experience.time,this.debug=this.experience.debug,this.flyingSpidersArray=[],this.debug.active&&(this.debugFolder=this.debug.ui.addFolder("flyingSpiders")),this.resource=this.resources.items.flyingSpiderModel,this.setModels()}setModels(){this.model=this.resource.scene;const e=new Ot({color:"#000000"});this.createSingleSpider(new P(0,2,-6),new P(0,Math.PI*.2,Math.PI*.1),.5,e),this.createSingleSpider(new P(-3,0,3),new P(0,-Math.PI*.4,-Math.PI*.1),.6,e),this.createSingleSpider(new P(3,1,-3),new P(0,-Math.PI,0),.7,e),this.createSingleSpider(new P(-1,4,0),new P(0,Math.PI*.5,0),.9,e);for(let t of this.flyingSpidersArray)this.scene.add(t)}createSingleSpider(e,t,i,n){const s=this.model.clone();s.position.set(e.x,e.y,e.z),s.rotation.set(t.x,t.y,t.z),s.scale.set(i,i,i),this.flyingSpidersArray.push(s)}update(){this.flyingSpidersArray[0].position.y-=this.time.delta*.007,this.flyingSpidersArray[0].position.x-=this.time.delta*.007,this.flyingSpidersArray[0].position.y<=-20&&(this.flyingSpidersArray[0].position.x=50,this.flyingSpidersArray[0].position.y=50),this.flyingSpidersArray[1].position.y+=this.time.delta*.005,this.flyingSpidersArray[1].position.x-=this.time.delta*.005,this.flyingSpidersArray[1].position.z-=this.time.delta*.005,this.flyingSpidersArray[1].position.y>=30&&(this.flyingSpidersArray[1].position.x=47,this.flyingSpidersArray[1].position.y=-50,this.flyingSpidersArray[1].position.z=53),this.flyingSpidersArray[2].position.x+=this.time.delta*.008,this.flyingSpidersArray[2].position.x>=30&&(this.flyingSpidersArray[2].position.x=-50),this.flyingSpidersArray[3].position.z+=this.time.delta*.01,this.flyingSpidersArray[3].position.z>=20&&(this.flyingSpidersArray[3].position.z=-50)}}class Vv{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.time=this.experience.time,this.debug=this.experience.debug,this.televisionObjects=[],this.televisionButton=null,this.televisionBackButton=null,this.open=!0,this.clickTime=0,this.maxClicks=11,this.monitor=null,this.broken=!1,this.resource=this.resources.items.TelevisionModel,this.texture=this.resources.items.VideoTexture,this.blackTexture=this.resources.items.BlackTexture,this.notFoundTexture=this.resources.items.NotFoundTexture,this.setModel()}setModel(){const e=new Ot({map:this.texture});this.model=this.resource.scene,this.model.traverse(t=>{if(t instanceof Re)switch(t.name){case"ButtonTV":t.material=new Je({color:"#ff2400"}),this.televisionButton=t;break;case"MonitorTv":t.material=e,this.televisionObjects.push(t),this.monitor=t;break;case"ReturnTV":t.material=new Je({color:"#ff2400"}),this.televisionBackButton=t;break;case"AntennaTV":t.material=new Je({color:"#000000"}),this.televisionObjects.push(t);break;case"OuterMonitorTV":t.material=new Je({color:"#000000"}),this.televisionObjects.push(t);break;case"cableTV":t.material=new Je({color:"#000000"}),this.televisionObjects.push(t);break}}),this.scene.add(this.model)}changeTexture(){this.clickTime++,this.broken||(this.clickTime>this.maxClicks?(this.broken=!0,this.monitor.material.map=this.notFoundTexture,this.monitor.material.needsUpdate=!0):(this.open=!this.open,this.open?(this.monitor.material.map=this.texture,this.monitor.material.needsUpdate=!0):(this.monitor.material.map=this.blackTexture,this.monitor.material.needsUpdate=!0)))}}class Gv{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.resources.on("ready",()=>{this.room=new Fv,this.television=new Vv,this.pip=new qr(this.resources.items.PipThePirateModel,this.resources.items.PipThePirateTexture,new P(.1,-.6,.25)),this.littleGuy=new qr(this.resources.items.TheLittleGuyModel,this.resources.items.LittleGuyTexture,new P(.14,-.3,.263)),this.butler=new zv,this.bikingImprover=new qr(this.resources.items.BikingImproverModel,this.resources.items.BikingImproverTexture,new P(.1,-.3,.25)),this.blackjack=new qr(this.resources.items.CardModel,void 0,new P(0,-.3,0)),this.spider=new Bv,this.flyingSpiders=new Uv,this.environment=new Ov})}update(){this.spider&&this.spider.update(),this.room&&this.room.update(),this.flyingSpiders&&this.flyingSpiders.update()}}class Hv extends Un{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Yv(t)}),this.register(function(t){return new ty(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new qv(t)}),this.register(function(t){return new ey(t)}),this.register(function(t){return new $v(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new ny(t)}),this.register(function(t){return new sy(t)})}load(e,t,i,n){const s=this;let r;this.resourcePath!==""?r=this.resourcePath:this.path!==""?r=this.path:r=Cn.extractUrlBase(e),this.manager.itemStart(e);const o=function(c){n?n(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new no(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,n){let s;const r={},o={};if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(Cn.decodeText(new Uint8Array(e,0,4))===dd){try{r[Fe.KHR_BINARY_GLTF]=new ry(e)}catch(h){n&&n(h);return}s=JSON.parse(r[Fe.KHR_BINARY_GLTF].content)}else s=JSON.parse(Cn.decodeText(new Uint8Array(e)));else s=e;if(s.asset===void 0||s.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new xy(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){const h=this.pluginCallbacks[c](l);o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let c=0;c<s.extensionsUsed.length;++c){const h=s.extensionsUsed[c],u=s.extensionsRequired||[];switch(h){case Fe.KHR_MATERIALS_UNLIT:r[h]=new Xv;break;case Fe.KHR_DRACO_MESH_COMPRESSION:r[h]=new oy(s,this.dracoLoader);break;case Fe.KHR_TEXTURE_TRANSFORM:r[h]=new ay;break;case Fe.KHR_MESH_QUANTIZATION:r[h]=new ly;break;default:u.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(r),l.setPlugins(o),l.parse(i,n)}parseAsync(e,t){const i=this;return new Promise(function(n,s){i.parse(e,t,n,s)})}}function Wv(){let a={};return{get:function(e){return a[e]},add:function(e,t){a[e]=t},remove:function(e){delete a[e]},removeAll:function(){a={}}}}const Fe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class jv{constructor(e){this.parser=e,this.name=Fe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,n=t.length;i<n;i++){const s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let n=t.cache.get(i);if(n)return n;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Te(16777215);l.color!==void 0&&h.fromArray(l.color);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ix(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Pa(h),c.distance=u;break;case"spot":c=new Q0(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Zi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),n=Promise.resolve(c),t.cache.add(i,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,s=i.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class Xv{constructor(){this.name=Fe.KHR_MATERIALS_UNLIT}getMaterialType(){return Ot}extendParams(e,t,i){const n=[];e.color=new Te(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.fromArray(r),e.opacity=r[3]}s.baseColorTexture!==void 0&&n.push(i.assignTexture(e,"map",s.baseColorTexture,Me))}return Promise.all(n)}}class qv{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=n.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class Yv{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:zn}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],r=n.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(i.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ye(o,o)}return Promise.all(s)}}class $v{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:zn}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],r=n.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}}class Kv{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:zn}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Te(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=n.extensions[this.name];return r.sheenColorFactor!==void 0&&t.sheenColor.fromArray(r.sheenColorFactor),r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(i.assignTexture(t,"sheenColorMap",r.sheenColorTexture,Me)),r.sheenRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}}class Zv{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:zn}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],r=n.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(i.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}}class Jv{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:zn}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],r=n.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(i.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const o=r.attenuationColor||[1,1,1];return t.attenuationColor=new Te(o[0],o[1],o[2]),Promise.all(s)}}class Qv{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:zn}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=n.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class ey{constructor(e){this.parser=e,this.name=Fe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:zn}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],r=n.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(i.assignTexture(t,"specularIntensityMap",r.specularTexture));const o=r.specularColorFactor||[1,1,1];return t.specularColor=new Te(o[0],o[1],o[2]),r.specularColorTexture!==void 0&&s.push(i.assignTexture(t,"specularColorMap",r.specularColorTexture,Me)),Promise.all(s)}}class ty{constructor(e){this.parser=e,this.name=Fe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,n=i.textures[e];if(!n.extensions||!n.extensions[this.name])return null;const s=n.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class iy{constructor(e){this.parser=e,this.name=Fe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,n=i.json,s=n.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],o=n.images[r.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,r.source,l);if(n.extensionsRequired&&n.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class ny{constructor(e){this.name=Fe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const n=i.extensions[this.name],s=this.parser.getDependency("buffer",n.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=n.byteOffset||0,c=n.byteLength||0,h=n.count,u=n.byteStride,d=new Uint8Array(o,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,n.mode,n.filter).then(function(m){return m.buffer}):r.ready.then(function(){const m=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(m),h,u,d,n.mode,n.filter),m})})}else return null}}class sy{constructor(e){this.name=Fe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const n=t.meshes[i.mesh];for(const c of n.primitives)if(c.mode!==si.TRIANGLES&&c.mode!==si.TRIANGLE_STRIP&&c.mode!==si.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=i.extensions[this.name].attributes,o=[],l={};for(const c in r)o.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,m=[];for(const g of u){const f=new Ce,p=new P,_=new $t,b=new P(1,1,1),v=new F0(g.geometry,g.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&_.fromBufferAttribute(l.ROTATION,M),l.SCALE&&b.fromBufferAttribute(l.SCALE,M),v.setMatrixAt(M,f.compose(p,_,b));for(const M in l)M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);Ze.prototype.copy.call(v,g),v.frustumCulled=!1,this.parser.assignFinalMaterial(v),m.push(v)}return h.isGroup?(h.clear(),h.add(...m),h):m[0]}))}}const dd="glTF",qs=12,Sh={JSON:1313821514,BIN:5130562};class ry{constructor(e){this.name=Fe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,qs);if(this.header={magic:Cn.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==dd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-qs,n=new DataView(e,qs);let s=0;for(;s<i;){const r=n.getUint32(s,!0);s+=4;const o=n.getUint32(s,!0);if(s+=4,o===Sh.JSON){const l=new Uint8Array(e,qs+s,r);this.content=Cn.decodeText(l)}else if(o===Sh.BIN){const l=qs+s;this.body=e.slice(l,l+r)}s+=r}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class oy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Fe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,n=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},l={},c={};for(const h in r){const u=qa[h]||h.toLowerCase();o[u]=r[h]}for(const h in e.attributes){const u=qa[h]||h.toLowerCase();if(r[h]!==void 0){const d=i.accessors[e.attributes[h]],m=gs[d.componentType];c[u]=m.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u){n.decodeDracoFile(h,function(d){for(const m in d.attributes){const g=d.attributes[m],f=l[m];f!==void 0&&(g.normalized=f)}u(d)},o,c)})})}}class ay{constructor(){this.name=Fe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ly{constructor(){this.name=Fe.KHR_MESH_QUANTIZATION}}class fd extends yr{constructor(e,t,i,n){super(e,t,i,n)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,s=e*n*3+n;for(let r=0;r!==n;r++)t[r]=i[s+r];return t}interpolate_(e,t,i,n){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=n-t,u=(i-t)/h,d=u*u,m=d*u,g=e*c,f=g-c,p=-2*m+3*d,_=m-d,b=1-p,v=_-d+u;for(let M=0;M!==o;M++){const y=r[f+M+o],A=r[f+M+l]*h,C=r[g+M+o],x=r[g+M]*h;s[M]=b*y+v*A+p*C+_*x}return s}}const cy=new $t;class hy extends fd{interpolate_(e,t,i,n){const s=super.interpolate_(e,t,i,n);return cy.fromArray(s).normalize().toArray(s),s}}const si={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},gs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Th={9728:rt,9729:St,9984:wa,9985:Fh,9986:Yr,9987:Dn},Ah={33071:ri,33648:eo,10497:vs},ma={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},qa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},uy={CUBICSPLINE:void 0,LINEAR:bs,STEP:rr},ga={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function dy(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new Je({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:on})),a.DefaultMaterial}function Ys(a,e,t){for(const i in t.extensions)a[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Zi(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function fy(a,e,t){let i=!1,n=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(n=!0),u.COLOR_0!==void 0&&(s=!0),i&&n&&s)break}if(!i&&!n&&!s)return Promise.resolve(a);const r=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(i){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):a.attributes.position;r.push(d)}if(n){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):a.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):a.attributes.color;l.push(d)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return i&&(a.morphAttributes.position=h),n&&(a.morphAttributes.normal=u),s&&(a.morphAttributes.color=d),a.morphTargetsRelative=!0,a})}function py(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)a.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(a.morphTargetInfluences.length===t.length){a.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++)a.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function my(a){const e=a.extensions&&a.extensions[Fe.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Eh(e.attributes):t=a.indices+":"+Eh(a.attributes)+":"+a.mode,t}function Eh(a){let e="";const t=Object.keys(a).sort();for(let i=0,n=t.length;i<n;i++)e+=t[i]+":"+a[t[i]]+";";return e}function Ya(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function gy(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const _y=new Ce;class xy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Wv,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,n=!1,s=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,n=navigator.userAgent.indexOf("Firefox")>-1,s=n?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||n&&s<98?this.textureLoader=new uu(this.options.manager):this.textureLoader=new sx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new no(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,n=this.json,s=this.extensions;this.cache.removeAll(),this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(r){const o={scene:r[0][n.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:n.asset,parser:i,userData:{}};Ys(s,o,n),Zi(o,n),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n].joints;for(let o=0,l=r.length;o<l;o++)e[r[o]].isBone=!0}for(let n=0,s=e.length;n<s;n++){const r=e[n];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(i[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const n=i.clone(),s=(r,o)=>{const l=this.associations.get(r);l!=null&&this.associations.set(o,l);for(const[c,h]of r.children.entries())s(h,o.children[c])};return s(i,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const n=e(t[i]);if(n)return n}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let n=0;n<t.length;n++){const s=e(t[n]);s&&i.push(s)}return i}getDependency(e,t){const i=e+":"+t;let n=this.cache.get(i);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":n=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(i,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(s,r){return i.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Fe.KHR_BINARY_GLTF].body);const n=this.options;return new Promise(function(s,r){i.load(Cn.resolveURL(t.uri,n.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const n=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+n)})}loadAccessor(e){const t=this,i=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){const r=ma[n.type],o=gs[n.componentType],l=n.normalized===!0,c=new o(n.count*r);return Promise.resolve(new bt(c,r,l))}const s=[];return n.bufferView!==void 0?s.push(this.getDependency("bufferView",n.bufferView)):s.push(null),n.sparse!==void 0&&(s.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(s).then(function(r){const o=r[0],l=ma[n.type],c=gs[n.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=n.byteOffset||0,m=n.bufferView!==void 0?i.bufferViews[n.bufferView].byteStride:void 0,g=n.normalized===!0;let f,p;if(m&&m!==u){const _=Math.floor(d/m),b="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+_+":"+n.count;let v=t.cache.get(b);v||(f=new c(o,_*m,n.count*m/h),v=new R0(f,m/h),t.cache.add(b,v)),p=new rl(v,l,d%m/h,g)}else o===null?f=new c(n.count*l):f=new c(o,d,n.count*l),p=new bt(f,l,g);if(n.sparse!==void 0){const _=ma.SCALAR,b=gs[n.sparse.indices.componentType],v=n.sparse.indices.byteOffset||0,M=n.sparse.values.byteOffset||0,y=new b(r[1],v,n.sparse.count*_),A=new c(r[2],M,n.sparse.count*l);o!==null&&(p=new bt(p.array.slice(),p.itemSize,p.normalized));for(let C=0,x=y.length;C<x;C++){const S=y[C];if(p.setX(S,A[C*l]),l>=2&&p.setY(S,A[C*l+1]),l>=3&&p.setZ(S,A[C*l+2]),l>=4&&p.setW(S,A[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,i=this.options,s=t.textures[e].source,r=t.images[s];let o=this.textureLoader;if(r.uri){const l=i.manager.getHandler(r.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,i){const n=this,s=this.json,r=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=r.name||o.name||"";const d=(s.samplers||{})[r.sampler]||{};return h.magFilter=Th[d.magFilter]||St,h.minFilter=Th[d.minFilter]||Dn,h.wrapS=Ah[d.wrapS]||vs,h.wrapT=Ah[d.wrapT]||vs,n.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,n=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const r=n.images[e],o=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=i.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:r.mimeType});return l=o.createObjectURL(d),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,m){let g=d;t.isImageBitmapLoader===!0&&(g=function(f){const p=new _t(f);p.needsUpdate=!0,d(p)}),t.load(Cn.resolveURL(u,s.path),g,void 0,m)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),u.userData.mimeType=r.mimeType||gy(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,n){const s=this;return this.getDependency("texture",i.index).then(function(r){if(!r)return null;if(i.texCoord!==void 0&&i.texCoord!=0&&!(t==="aoMap"&&i.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+i.texCoord+" for texture "+t+" not yet supported."),s.extensions[Fe.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[Fe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(r);r=s.extensions[Fe.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,l)}}return n!==void 0&&(r.encoding=n),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const n=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new ru,wi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new su,wi.prototype.copy.call(l,i),l.color.copy(i.color),this.cache.add(o,l)),i=l}if(n||s||r){let o="ClonedMaterial:"+i.uuid+":";n&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),n&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}i.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=i}getMaterialType(){return Je}loadMaterial(e){const t=this,i=this.json,n=this.extensions,s=i.materials[e];let r;const o={},l=s.extensions||{},c=[];if(l[Fe.KHR_MATERIALS_UNLIT]){const u=n[Fe.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new Te(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.fromArray(d),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Me)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=po);const h=s.alphaMode||ga.OPAQUE;if(h===ga.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ga.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==Ot&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ye(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}return s.occlusionTexture!==void 0&&r!==Ot&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==Ot&&(o.emissive=new Te().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&r!==Ot&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,Me)),Promise.all(c).then(function(){const u=new r(o);return s.name&&(u.name=s.name),Zi(u,s),t.associations.set(u,{materials:e}),s.extensions&&Ys(n,u,s),u})}createUniqueName(e){const t=Ve.sanitizeNodeName(e||"");let i=t;for(let n=1;this.nodeNamesUsed[i];++n)i=t+"_"+n;return this.nodeNamesUsed[i]=!0,i}loadGeometries(e){const t=this,i=this.extensions,n=this.primitiveCache;function s(o){return i[Fe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Ch(l,o,t)})}const r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=my(c),u=n[h];if(u)r.push(u.promise);else{let d;c.extensions&&c.extensions[Fe.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Ch(new xi,c,t),n[h]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){const t=this,i=this.json,n=this.extensions,s=i.meshes[e],r=s.primitives,o=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?dy(this.cache):this.getDependency("material",r[l].material);o.push(h)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let m=0,g=h.length;m<g;m++){const f=h[m],p=r[m];let _;const b=c[m];if(p.mode===si.TRIANGLES||p.mode===si.TRIANGLE_STRIP||p.mode===si.TRIANGLE_FAN||p.mode===void 0)_=s.isSkinnedMesh===!0?new I0(f,b):new Re(f,b),_.isSkinnedMesh===!0&&!_.geometry.attributes.skinWeight.normalized&&_.normalizeSkinWeights(),p.mode===si.TRIANGLE_STRIP?_.geometry=Lh(_.geometry,df):p.mode===si.TRIANGLE_FAN&&(_.geometry=Lh(_.geometry,zh));else if(p.mode===si.LINES)_=new B0(f,b);else if(p.mode===si.LINE_STRIP)_=new al(f,b);else if(p.mode===si.LINE_LOOP)_=new z0(f,b);else if(p.mode===si.POINTS)_=new U0(f,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(_.geometry.morphAttributes).length>0&&py(_,s),_.name=t.createUniqueName(s.name||"mesh_"+e),Zi(_,s),p.extensions&&Ys(n,_,p),t.assignFinalMaterial(_),u.push(_)}for(let m=0,g=u.length;m<g;m++)t.associations.set(u[m],{meshes:e,primitives:m});if(u.length===1)return u[0];const d=new Ui;t.associations.set(d,{meshes:e});for(let m=0,g=u.length;m<g;m++)d.add(u[m]);return d})}loadCamera(e){let t;const i=this.json.cameras[e],n=i[i.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new kt(Pf.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):i.type==="orthographic"&&(t=new il(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Zi(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let n=0,s=t.joints.length;n<s;n++)i.push(this.getDependency("node",t.joints[n]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(n){const s=n.pop(),r=n,o=[],l=[];for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u){o.push(u);const d=new Ce;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ol(o,l)})}loadAnimation(e){const i=this.json.animations[e],n=[],s=[],r=[],o=[],l=[];for(let c=0,h=i.channels.length;c<h;c++){const u=i.channels[c],d=i.samplers[u.sampler],m=u.target,g=m.node,f=i.parameters!==void 0?i.parameters[d.input]:d.input,p=i.parameters!==void 0?i.parameters[d.output]:d.output;n.push(this.getDependency("node",g)),s.push(this.getDependency("accessor",f)),r.push(this.getDependency("accessor",p)),o.push(d),l.push(m)}return Promise.all([Promise.all(n),Promise.all(s),Promise.all(r),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2],m=c[3],g=c[4],f=[];for(let _=0,b=h.length;_<b;_++){const v=h[_],M=u[_],y=d[_],A=m[_],C=g[_];if(v===void 0)continue;v.updateMatrix();let x;switch(Ki[C.path]){case Ki.weights:x=cr;break;case Ki.rotation:x=Fn;break;case Ki.position:case Ki.scale:default:x=hr;break}const S=v.name?v.name:v.uuid,R=A.interpolation!==void 0?uy[A.interpolation]:bs,B=[];Ki[C.path]===Ki.weights?v.traverse(function(D){D.morphTargetInfluences&&B.push(D.name?D.name:D.uuid)}):B.push(S);let K=y.array;if(y.normalized){const D=Ya(K.constructor),I=new Float32Array(K.length);for(let z=0,$=K.length;z<$;z++)I[z]=K[z]*D;K=I}for(let D=0,I=B.length;D<I;D++){const z=new x(B[D]+"."+Ki[C.path],M.array,K,R);A.interpolation==="CUBICSPLINE"&&(z.createInterpolant=function(Y){const U=this instanceof Fn?hy:fd;return new U(this.times,this.values,this.getValueSize()/3,Y)},z.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),f.push(z)}}const p=i.name?i.name:"animation_"+e;return new La(p,void 0,f)})}createNodeMesh(e){const t=this.json,i=this,n=t.nodes[e];return n.mesh===void 0?null:i.getDependency("mesh",n.mesh).then(function(s){const r=i._getNodeRef(i.meshCache,n.mesh,s);return n.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let l=0,c=n.weights.length;l<c;l++)o.morphTargetInfluences[l]=n.weights[l]}),r})}loadNode(e){const t=this.json,i=this.extensions,n=this,s=t.nodes[e],r=s.name?n.createUniqueName(s.name):"";return function(){const o=[],l=n._invokeOne(function(d){return d.createNodeMesh&&d.createNodeMesh(e)});l&&o.push(l),s.camera!==void 0&&o.push(n.getDependency("camera",s.camera).then(function(d){return n._getNodeRef(n.cameraCache,s.camera,d)})),n._invokeAll(function(d){return d.createNodeAttachment&&d.createNodeAttachment(e)}).forEach(function(d){o.push(d)});const c=[],h=s.children||[];for(let d=0,m=h.length;d<m;d++)c.push(n.getDependency("node",h[d]));const u=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([Promise.all(o),Promise.all(c),u])}().then(function(o){const l=o[0],c=o[1],h=o[2];let u;if(s.isBone===!0?u=new nu:l.length>1?u=new Ui:l.length===1?u=l[0]:u=new Ze,u!==l[0])for(let d=0,m=l.length;d<m;d++)u.add(l[d]);if(s.name&&(u.userData.name=s.name,u.name=r),Zi(u,s),s.extensions&&Ys(i,u,s),s.matrix!==void 0){const d=new Ce;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);n.associations.has(u)||n.associations.set(u,{}),n.associations.get(u).nodes=e,h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,_y)});for(let d=0,m=c.length;d<m;d++)u.add(c[d]);return u})}loadScene(e){const t=this.extensions,i=this.json.scenes[e],n=this,s=new Ui;i.name&&(s.name=n.createUniqueName(i.name)),Zi(s,i),i.extensions&&Ys(t,s,i);const r=i.nodes||[],o=[];for(let l=0,c=r.length;l<c;l++)o.push(n.getDependency("node",r[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,m]of n.associations)(d instanceof wi||d instanceof _t)&&u.set(d,m);return h.traverse(d=>{const m=n.associations.get(d);m!=null&&u.set(d,m)}),u};return n.associations=c(s),s})}}function vy(a,e,t){const i=e.attributes,n=new Rs;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(n.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),o.normalized){const h=Ya(gs[o.componentType]);n.min.multiplyScalar(h),n.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new P,l=new P;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],m=d.min,g=d.max;if(m!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(g[2]))),d.normalized){const f=Ya(gs[d.componentType]);l.multiplyScalar(f)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(o)}a.boundingBox=n;const r=new Ds;n.getCenter(r.center),r.radius=n.min.distanceTo(n.max)/2,a.boundingSphere=r}function Ch(a,e,t){const i=e.attributes,n=[];function s(r,o){return t.getDependency("accessor",r).then(function(l){a.setAttribute(o,l)})}for(const r in i){const o=qa[r]||r.toLowerCase();o in a.attributes||n.push(s(i[r],o))}if(e.indices!==void 0&&!a.index){const r=t.getDependency("accessor",e.indices).then(function(o){a.setIndex(o)});n.push(r)}return Zi(a,e),vy(a,e,t),Promise.all(n).then(function(){return e.targets!==void 0?fy(a,e.targets,t):a})}function Lh(a,e){let t=a.getIndex();if(t===null){const r=[],o=a.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)r.push(l);a.setIndex(r),t=a.getIndex()}else return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}const i=t.count-2,n=[];if(e===zh)for(let r=1;r<=i;r++)n.push(t.getX(0)),n.push(t.getX(r)),n.push(t.getX(r+1));else for(let r=0;r<i;r++)r%2===0?(n.push(t.getX(r)),n.push(t.getX(r+1)),n.push(t.getX(r+2))):(n.push(t.getX(r+2)),n.push(t.getX(r+1)),n.push(t.getX(r)));n.length/3!==i&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=a.clone();return s.setIndex(n),s}const _a=new WeakMap;class yy extends Un{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,i,n){const s=new no(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,r=>{this.decodeDracoFile(r,t).catch(n)},i,n)}decodeDracoFile(e,t,i,n){const s={attributeIDs:i||this.defaultAttributeIDs,attributeTypes:n||this.defaultAttributeTypes,useUniqueIDs:!!i};return this.decodeGeometry(e,s).then(t)}decodeGeometry(e,t){const i=JSON.stringify(t);if(_a.has(e)){const l=_a.get(e);if(l.key===i)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let n;const s=this.workerNextTaskID++,r=e.byteLength,o=this._getWorker(s,r).then(l=>(n=l,new Promise((c,h)=>{n._callbacks[s]={resolve:c,reject:h},n.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{n&&s&&this._releaseTask(n,s)}),_a.set(e,{key:i,promise:o}),o}_createGeometry(e){const t=new xi;e.index&&t.setIndex(new bt(e.index.array,1));for(let i=0;i<e.attributes.length;i++){const n=e.attributes[i],s=n.name,r=n.array,o=n.itemSize;t.setAttribute(s,new bt(r,o))}return t}_loadLibrary(e,t){const i=new no(this.manager);return i.setPath(this.decoderPath),i.setResponseType(t),i.setWithCredentials(this.withCredentials),new Promise((n,s)=>{i.load(e,n,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(i=>{const n=i[0];e||(this.decoderConfig.wasmBinary=i[1]);const s=by.toString(),r=["/* draco decoder */",n,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([r]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const n=new Worker(this.workerSourceURL);n._callbacks={},n._taskCosts={},n._taskLoad=0,n.postMessage({type:"init",decoderConfig:this.decoderConfig}),n.onmessage=function(s){const r=s.data;switch(r.type){case"decode":n._callbacks[r.id].resolve(r);break;case"error":n._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(n)}else this.workerPool.sort(function(n,s){return n._taskLoad>s._taskLoad?-1:1});const i=this.workerPool[this.workerPool.length-1];return i._taskCosts[e]=t,i._taskLoad+=t,i})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this}}function by(){let a,e;onmessage=function(r){const o=r.data;switch(o.type){case"init":a=o.decoderConfig,e=new Promise(function(h){a.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(a)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder,m=new u.DecoderBuffer;m.Init(new Int8Array(l),l.byteLength);try{const g=t(u,d,m,c),f=g.attributes.map(p=>p.array.buffer);g.index&&f.push(g.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:g},f)}catch(g){console.error(g),self.postMessage({type:"error",id:o.id,error:g.message})}finally{u.destroy(m),u.destroy(d)}});break}};function t(r,o,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,m;const g=o.GetEncodedGeometryType(l);if(g===r.TRIANGULAR_MESH)d=new r.Mesh,m=o.DecodeBufferToMesh(l,d);else if(g===r.POINT_CLOUD)d=new r.PointCloud,m=o.DecodeBufferToPointCloud(l,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!m.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+m.error_msg());const f={index:null,attributes:[]};for(const p in h){const _=self[u[p]];let b,v;if(c.useUniqueIDs)v=h[p],b=o.GetAttributeByUniqueId(d,v);else{if(v=o.GetAttributeId(d,r[h[p]]),v===-1)continue;b=o.GetAttribute(d,v)}f.attributes.push(n(r,o,d,p,_,b))}return g===r.TRIANGULAR_MESH&&(f.index=i(r,o,d)),r.destroy(d),f}function i(r,o,l){const h=l.num_faces()*3,u=h*4,d=r._malloc(u);o.GetTrianglesUInt32Array(l,u,d);const m=new Uint32Array(r.HEAPF32.buffer,d,h).slice();return r._free(d),{array:m,itemSize:1}}function n(r,o,l,c,h,u){const d=u.num_components(),g=l.num_points()*d,f=g*h.BYTES_PER_ELEMENT,p=s(r,h),_=r._malloc(f);o.GetAttributeDataArrayForAllPoints(l,u,p,f,_);const b=new h(r.HEAPF32.buffer,_,g).slice();return r._free(_),{name:c,array:b,itemSize:d}}function s(r,o){switch(o){case Float32Array:return r.DT_FLOAT32;case Int8Array:return r.DT_INT8;case Int16Array:return r.DT_INT16;case Int32Array:return r.DT_INT32;case Uint8Array:return r.DT_UINT8;case Uint16Array:return r.DT_UINT16;case Uint32Array:return r.DT_UINT32}}}class My extends fo{constructor(e){super(),this.sources=e,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.setLoaders(),this.startLoading()}setLoaders(){this.loaders={},this.loaders.gltfLoader=new Hv,this.loaders.dracoLoader=new yy,this.loaders.dracoLoader.setDecoderPath("/draco/"),this.loaders.textureLoader=new uu,this.loaders.cubeTextureLoader=new Z0}startLoading(){for(const e of this.sources)e.type==="gltfModel"?this.loaders.gltfLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="texture"?this.loaders.textureLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="cubeTexture"?this.loaders.cubeTextureLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="dracoModel"?this.loaders.dracoLoader.load(e.path,t=>{this.sourceLoaded(e,t)}):e.type==="videoTexture"&&(this.video={},this.videoTexture={},this.video[e.name]=document.createElement("video"),this.video[e.name].src=e.path,this.video[e.name].muted=!0,this.video[e.name].playsInline=!0,this.video[e.name].autoplay=!0,this.video[e.name].loop=!0,this.video[e.name].play(),this.videoTexture[e.name]=new V0(this.video[e.name]),this.videoTexture[e.name].flipY=!1,this.videoTexture[e.name].minFilter=rt,this.videoTexture[e.name].magFilter=rt,this.videoTexture[e.name].generateMipmaps=!1,this.videoTexture[e.name].encoding=Me,this.sourceLoaded(e,this.videoTexture[e.name]))}sourceLoaded(e,t){this.trigger("itemLoaded"),this.items[e.name]=t,this.loaded++,this.loaded===this.toLoad&&this.trigger("ready")}}const wy=[{name:"environmentMapTexture",type:"cubeTexture",path:["textures/environmentMap/px.jpg","textures/environmentMap/nx.jpg","textures/environmentMap/py.jpg","textures/environmentMap/ny.jpg","textures/environmentMap/pz.jpg","textures/environmentMap/nz.jpg"]},{name:"grassColorTexture",type:"texture",path:"textures/dirt/color.jpg"},{name:"grassNormalTexture",type:"texture",path:"textures/dirt/normal.jpg"},{name:"bellBoxColor",type:"texture",path:"textures/bell/BellPlatform.jpg"},{name:"roomModel",type:"gltfModel",path:"models/Room/SpiderRoom.glb"},{name:"secondaryFloor",type:"gltfModel",path:"models/Room/SecondaryFloor.glb"},{name:"arrowModel",type:"gltfModel",path:"models/Room/Arrow.glb"},{name:"floorColorTexture",type:"texture",path:"textures/floor/BakingFloorJ.jpg"},{name:"wallRightColor",type:"texture",path:"textures/walls/BakingWall.jpg"},{name:"wallLeftColor",type:"texture",path:"textures/walls/BakingWallLeft.jpg"},{name:"LittleGuyColor",type:"texture",path:"textures/walls/LittleGuyColorResized.jpg"},{name:"PipColor",type:"texture",path:"textures/walls/PipColorResized.jpg"},{name:"ButlerColor",type:"texture",path:"textures/walls/ButlerColorResized.jpg"},{name:"BikingImproverColor",type:"texture",path:"textures/walls/BikingColorResized.jpg"},{name:"BlackjackColor",type:"texture",path:"textures/walls/BlackjackColor.jpg"},{name:"AboutColor",type:"texture",path:"textures/walls/AboutColorFirstPageStretched.jpg"},{name:"AboutContactColor",type:"texture",path:"textures/walls/AboutColorSecondPageStretched.jpg"},{name:"PipThePirateTexture",type:"texture",path:"textures/projectsTextures/pirateHatTexture.jpg"},{name:"ButlerTexture",type:"texture",path:"textures/projectsTextures/pirateHatTexture.jpg"},{name:"KnifeTexture",type:"texture",path:"textures/projectsTextures/KnifeTexture.jpg"},{name:"CameraTexture",type:"texture",path:"textures/projectsTextures/CameraTexture.jpg"},{name:"LittleGuyTexture",type:"texture",path:"textures/projectsTextures/littleGuyHatTexture.jpg"},{name:"BikingImproverTexture",type:"texture",path:"textures/projectsTextures/BikingImproverTexture.jpg"},{name:"spiderModel",type:"gltfModel",path:"models/Room/Spider.glb"},{name:"flyingSpiderModel",type:"gltfModel",path:"models/Room/FlyingSpider.glb"},{name:"PipThePirateModel",type:"gltfModel",path:"models/Room/PirateHat.glb",number:0},{name:"TheLittleGuyModel",type:"gltfModel",path:"models/Room/LittleGuyHat.glb",number:1},{name:"BikingImproverModel",type:"gltfModel",path:"models/Room/BikingImprover.glb",number:2},{name:"ButlerModel",type:"gltfModel",path:"models/Room/KnifeCamera.glb",number:3},{name:"CardModel",type:"gltfModel",path:"models/Room/PlayingCardAce.glb",number:4},{name:"VideoTexture",type:"videoTexture",path:"textures/projectsTextures/videoTexture.mp4"},{name:"BlackTexture",type:"texture",path:"textures/projectsTextures/BlackTexture.jpg"},{name:"NotFoundTexture",type:"texture",path:"textures/projectsTextures/NotFoundTexture.jpg"},{name:"TelevisionModel",type:"gltfModel",path:"models/Room/Television.glb"}];/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class Ti{constructor(e,t,i,n,s="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("name"),Ti.nextNameID=Ti.nextNameID||0,this.$name.id=`lil-gui-name-${++Ti.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Sy extends Ti{constructor(e,t,i){super(e,t,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function $a(a){let e,t;return(e=a.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=a.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=a.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Ty={isPrimitive:!0,match:a=>typeof a=="string",fromHexString:$a,toHexString:$a},_r={isPrimitive:!0,match:a=>typeof a=="number",fromHexString:a=>parseInt(a.substring(1),16),toHexString:a=>"#"+a.toString(16).padStart(6,0)},Ay={isPrimitive:!1,match:Array.isArray,fromHexString(a,e,t=1){const i=_r.fromHexString(a);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([a,e,t],i=1){i=255/i;const n=a*i<<16^e*i<<8^t*i<<0;return _r.toHexString(n)}},Ey={isPrimitive:!1,match:a=>Object(a)===a,fromHexString(a,e,t=1){const i=_r.fromHexString(a);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:a,g:e,b:t},i=1){i=255/i;const n=a*i<<16^e*i<<8^t*i<<0;return _r.toHexString(n)}},Cy=[Ty,_r,Ay,Ey];function Ly(a){return Cy.find(e=>e.match(a))}class Py extends Ti{constructor(e,t,i,n){super(e,t,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ly(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=$a(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class xa extends Ti{constructor(e,t,i){super(e,t,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Ry extends Ti{constructor(e,t,i,n,s,r){super(e,t,i,"number"),this._initInput(),this.min(n),this.max(s);const o=r!==void 0;this.step(o?r:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let _=parseFloat(this.$input.value);isNaN(_)||(this._stepExplicit&&(_=this._snap(_)),this.setValue(this._clamp(_)))},t=_=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+_),this.$input.value=this.getValue())},i=_=>{_.code==="Enter"&&this.$input.blur(),_.code==="ArrowUp"&&(_.preventDefault(),t(this._step*this._arrowKeyMultiplier(_))),_.code==="ArrowDown"&&(_.preventDefault(),t(this._step*this._arrowKeyMultiplier(_)*-1))},n=_=>{this._inputFocused&&(_.preventDefault(),t(this._step*this._normalizeMouseWheel(_)))};let s=!1,r,o,l,c,h;const u=5,d=_=>{r=_.clientX,o=l=_.clientY,s=!0,c=this.getValue(),h=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",g)},m=_=>{if(s){const b=_.clientX-r,v=_.clientY-o;Math.abs(v)>u?(_.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>u&&g()}if(!s){const b=_.clientY-l;h-=b*this._step*this._arrowKeyMultiplier(_),c+h>this._max?h=this._max-c:c+h<this._min&&(h=this._min-c),this._snapClampSetValue(c+h)}l=_.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",g)},f=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",n,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",f),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(_,b,v,M,y)=>(_-b)/(v-b)*(y-M)+M,t=_=>{const b=this.$slider.getBoundingClientRect();let v=e(_,b.left,b.right,this._min,this._max);this._snapClampSetValue(v)},i=_=>{this._setDraggingStyle(!0),t(_.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",s)},n=_=>{t(_.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",s)};let r=!1,o,l;const c=_=>{_.preventDefault(),this._setDraggingStyle(!0),t(_.touches[0].clientX),r=!1},h=_=>{_.touches.length>1||(this._hasScrollBar?(o=_.touches[0].clientX,l=_.touches[0].clientY,r=!0):c(_),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=_=>{if(r){const b=_.touches[0].clientX-o,v=_.touches[0].clientY-l;Math.abs(b)>Math.abs(v)?c(_):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else _.preventDefault(),t(_.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},m=this._callOnFinishChange.bind(this),g=400;let f;const p=_=>{if(Math.abs(_.deltaX)<Math.abs(_.deltaY)&&this._hasScrollBar)return;_.preventDefault();const v=this._normalizeMouseWheel(_)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(f),f=setTimeout(m,g)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",p,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Dy extends Ti{constructor(e,t,i,n){super(e,t,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(n)?n:Object.values(n),this._names=Array.isArray(n)?n:Object.keys(n),this._names.forEach(s=>{const r=document.createElement("option");r.innerHTML=s,this.$select.appendChild(r)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class Iy extends Ti{constructor(e,t,i){super(e,t,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const ky=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Ny(a){const e=document.createElement("style");e.innerHTML=a;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ph=!1;class Cl{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:n,title:s="Controls",injectStyles:r=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),o&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Ph&&r&&(Ny(ky),Ph=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,t,i,n,s){if(Object(i)===i)return new Dy(this,e,t,i);const r=e[t];switch(typeof r){case"number":return new Ry(this,e,t,i,n,s);case"boolean":return new Sy(this,e,t);case"string":return new Iy(this,e,t);case"function":return new xa(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,r)}addColor(e,t,i=1){return new Py(this,e,t,i)}addFolder(e){return new Cl({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof xa||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof xa)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const i=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const n=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}class Oy{constructor(){this.active=window.location.hash==="#debug",this.active&&(this.ui=new Cl)}}class Fy{constructor(){this.experience=new Jt,this.scene=this.experience.scene,this.debug=this.experience.debug,this.camera=this.experience.camera,this.mouse=this.experience.sizes.mouse,this.preLoader=this.experience.preLoader,this.raycaster=new du,this.currentIntersect=null,this.objectsToTest=[],this.initialSceneTest=[],this.projectsToTest=[],this.aboutToTest=[],this.contactToTest=[],this.televisionToTest=[],this.readyForUpdate=!1,this.debug.active&&(this.debugFolder=this.debug.ui.addFolder("Controls")),this.preLoader.on("start",()=>{this.setColliders(),this.objectsToTest=this.initialSceneTest,this.addClickHandler(),this.readyForUpdate=!0,this.camera.experienceControls=this.experience.controls})}setColliders(){this.setProjectCollider(),this.setProjectButtonColliders(),this.setAboutCollider(),this.setAboutButtonsColliders(),this.setContactButtonsColliders(),this.setVideoCollider(),this.bellObjects=this.experience.world.room.bellObjects;for(let e of this.bellObjects)this.initialSceneTest.push(e)}setProjectCollider(){this.projectsCollider=new Re(new mi(1,1),new Ot({color:"#ff0000",wireframe:!0})),this.projectsCollider.position.set(-1.45,1.46,-1.7),this.projectsCollider.scale.x=1.25,this.projectsCollider.scale.y=1.25,this.projectsCollider.visible=!1,this.scene.add(this.projectsCollider),this.initialSceneTest.push(this.projectsCollider)}setAboutCollider(){this.aboutCollider=new Re(new mi(1,1),new Ot({color:"#ff0000",wireframe:!0})),this.aboutCollider.position.set(1.9,.38,1.87),this.aboutCollider.scale.y=.9,this.aboutCollider.scale.x=1.25,this.aboutCollider.rotation.y=-Math.PI*.5,this.aboutCollider.visible=!1,this.scene.add(this.aboutCollider),this.initialSceneTest.push(this.aboutCollider)}setVideoCollider(){this.televisionObjects=this.experience.world.television.televisionObjects;for(let e of this.televisionObjects)this.initialSceneTest.push(e);this.televisionButton=this.experience.world.television.televisionButton,this.televisionBackButton=this.experience.world.television.televisionBackButton,this.televisionToTest.push(this.televisionButton,this.televisionBackButton)}setProjectButtonColliders(){const e=new mi(.4,.1),t=new mi(.5,.5),i=new Ot({color:"#00ff00",wireframe:!0});this.nextButtonCollider=new Re(e,i),this.backButtonCollider=new Re(e,i),this.logoButtonCollider=new Re(t,i),this.nextButtonCollider.position.set(-1.15,.94,-1.7),this.backButtonCollider.position.set(-1.9,.94,-1.7),this.logoButtonCollider.position.set(-1.85,1.45,-1.7),this.nextButtonCollider.visible=!1,this.backButtonCollider.visible=!1,this.logoButtonCollider.visible=!1,this.projectsToTest.push(this.nextButtonCollider,this.backButtonCollider,this.logoButtonCollider),this.scene.add(this.nextButtonCollider,this.backButtonCollider,this.logoButtonCollider)}setAboutButtonsColliders(){const e=new mi(.4,.1),t=new Ot({color:"#00ff00",wireframe:!0});this.backAboutCollider=new Re(e,t),this.nextAboutCollider=new Re(e,t),this.backAboutCollider.position.set(1.9,0,1.45),this.backAboutCollider.rotation.y=-Math.PI*.5,this.nextAboutCollider.position.set(1.9,0,2.25),this.nextAboutCollider.rotation.y=-Math.PI*.5,this.backAboutCollider.visible=!1,this.nextAboutCollider.visible=!1,this.aboutToTest.push(this.backAboutCollider,this.nextAboutCollider),this.scene.add(this.backAboutCollider,this.nextAboutCollider)}setContactButtonsColliders(){const e=new mi(.1,.1),t=new Ot({color:"#00ff00",wireframe:!0}),i=new mi(.25,.3);this.backContactCollider=new Re(new mi(.4,.1),t),this.linkedinCollider=new Re(e,t),this.githubCollider=new Re(e,t),this.instagramCollider=new Re(e,t),this.curriculumCollider=new Re(i,t),this.referenceCollider=new Re(i,t),this.backContactCollider.position.set(1.9,0,1.45),this.backContactCollider.rotation.y=-Math.PI*.5,this.linkedinCollider.position.set(1.9,.03,1.9),this.linkedinCollider.rotation.y=-Math.PI*.5,this.githubCollider.position.set(1.9,.03,2.2),this.githubCollider.rotation.y=-Math.PI*.5,this.instagramCollider.position.set(1.9,.03,2.05),this.instagramCollider.rotation.y=-Math.PI*.5,this.curriculumCollider.position.set(1.9,.355,1.6),this.curriculumCollider.rotation.y=-Math.PI*.5,this.referenceCollider.position.set(1.9,.355,2.05),this.referenceCollider.rotation.y=-Math.PI*.5,this.backContactCollider.visible=!1,this.linkedinCollider.visible=!1,this.githubCollider.visible=!1,this.instagramCollider.visible=!1,this.curriculumCollider.visible=!1,this.referenceCollider.visible=!1,this.contactToTest.push(this.backContactCollider,this.linkedinCollider,this.githubCollider,this.instagramCollider,this.curriculumCollider,this.referenceCollider),this.scene.add(this.backContactCollider,this.linkedinCollider,this.githubCollider,this.instagramCollider,this.curriculumCollider,this.referenceCollider)}addClickHandler(){window.addEventListener("click",e=>{this.checkClick(e)})}checkClick(e){const t=e.clientX/this.experience.sizes.width*2-1,i=-(e.clientY/this.experience.sizes.height*2-1),n=new ye(t,i);this.raycaster.setFromCamera(n,this.camera.instance);const s=this.raycaster.intersectObjects(this.objectsToTest);if(s.length)if(this.currentIntersect=s[0],this.bellObjects.includes(this.currentIntersect.object))this.alreadyMoving||(this.experience.moveSpider(),this.alreadyMoving=!0);else if(this.televisionObjects.includes(this.currentIntersect.object))this.camera.moveToTelevision();else switch(this.currentIntersect.object){case this.projectsCollider:this.camera.moveToProjects();break;case this.aboutCollider:this.camera.moveToAbout();break;case this.nextButtonCollider:this.experience.createProjectFromControls();break;case this.backButtonCollider:this.camera.moveToStart();break;case this.backAboutCollider:this.camera.moveToStart();break;case this.nextAboutCollider:this.objectsToTest==this.aboutToTest&&(this.experience.changeAboutToCurriculum(),this.objectsToTest=this.contactToTest);break;case this.backContactCollider:this.experience.changeCurriculumToAbout(),this.objectsToTest=this.aboutToTest;break;case this.logoButtonCollider:this.goToProjectLink();break;case this.televisionButton:this.experience.world.television.changeTexture();break;case this.televisionBackButton:this.camera.moveToStart();break;case this.linkedinCollider:this.goToLink("https://www.linkedin.com/in/francesco-weikmann-8494a8252/");break;case this.githubCollider:this.goToLink("https://github.com/FrancescoWeik");break;case this.instagramCollider:this.goToLink("https://www.instagram.com/francesco_weikmann/");break;case this.curriculumCollider:this.downloadDocument("CVFrancescoWeikmann.pdf");break;case this.referenceCollider:this.downloadDocument("reference.pdf");break}else this.currentIntersect=null}update(){this.readyForUpdate&&(this.raycaster.setFromCamera(this.mouse,this.camera.instance),this.raycaster.intersectObjects(this.objectsToTest).length?document.documentElement.style.cursor="pointer":document.documentElement.style.cursor="default")}changeToProjectButtonsCollider(){this.objectsToTest=this.projectsToTest}changeToInitialSceneColliders(){this.objectsToTest=this.initialSceneTest}changeToAboutButtonsColliders(){this.objectsToTest=this.aboutToTest}changeToTelevisionButtonsColliders(){this.objectsToTest=this.televisionToTest}goToProjectLink(){switch(this.experience.projectNumber){case 0:window.open("https://play.google.com/store/apps/details?id=com.RatMood.PipThePirate","_blank");break;case 1:window.open("https://francescow.itch.io/my-videogame","_blank");break;case 2:window.open("https://francescow.itch.io/its-always-the-butler","_blank");break;case 3:window.open("https://github.com/DigitalCommonsLab/bikingimprover","_blank");break;case 4:window.open("https://francescow.itch.io/blackjack/","_blank");break;case 5:window.open("https://meteo-website-group19.onrender.com/","_blank");break}}goToLink(e){window.open(e,"_blank")}downloadDocument(e){var t=document.createElement("a");t.href=e,t.download=e.split("/").pop(),document.body.appendChild(t),t.click(),document.body.removeChild(t)}}class By extends fo{constructor(){super(),this.experience=new Jt,this.scene=this.experience.scene,this.resources=this.experience.resources,this.sizes=this.experience.sizes,this.overlay=document.querySelector(".overlay"),this.loading=document.querySelector("#loading"),this.startButton=document.querySelector(".start"),this.resources.on("itemLoaded",()=>{this.progressRatio=(this.resources.loaded+1)/this.resources.toLoad,document.getElementById("progressPercentage").innerHTML="Loading..."+Math.trunc(this.progressRatio*100)+"%"}),this.resources.on("ready",()=>{window.setTimeout(()=>{this.loading.classList.add("fade")},1500),window.setTimeout(()=>{this.readyScreen()},2500)})}readyScreen(){this.loading.remove(),this.startButton.style.display="inline",this.startButton.classList.add("fadeIn"),this.startButton.addEventListener("click",async()=>{this.overlay.classList.add("fade"),this.startButton.classList.add("fadeOut"),this.trigger("start")},{once:!0})}sleep(e){return new Promise(t=>setTimeout(t,e))}}let va=null;class Jt{constructor(e){if(va)return va;va=this,this.canvas=e,this.debug=new Oy,this.sizes=new xx,this.time=new vx,this.scene=new P0,this.resources=new My(wy),this.preLoader=new By,this.camera=new kv,this.renderer=new Nv,this.world=new Gv,this.controls=new Fy,this.projectNumber=0,this.sizes.on("resize",()=>{this.resize()}),this.time.on("tick",()=>{this.update()})}resize(){this.camera.resize(),this.renderer.resize()}update(){this.camera.update(),this.world.update(),this.controls.update(),this.renderer.update()}moveSpider(){this.world.spider.moveToCenter(),this.world.room.removeArrow()}activateBell(){this.controls.alreadyMoving=!1}changePictureProject(e){this.world.room.changeProjectPicture(e)}createProjectFromControls(){this.world.spider.createProjectFromControls()}changeAboutToCurriculum(){this.world.room.changeAboutToCurriculum()}changeCurriculumToAbout(){this.world.room.changeCurriculumToAbout()}destroy(){this.sizes.off("resize"),this.time.off("tick"),this.scene.traverse(e=>{if(e instanceof Re){e.geometry.dispose();for(const t in e.material){const i=e.material[t];i&&typeof i.dispose=="function"&&i.dispose()}}}),this.camera.controls.dispose(),this.renderer.instance.dispose(),this.debug.active&&this.debug.ui.destroy()}}new Jt(document.querySelector("canvas.webgl"));
//# sourceMappingURL=index-dd513cf8.js.map
