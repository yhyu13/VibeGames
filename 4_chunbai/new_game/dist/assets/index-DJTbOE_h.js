var NS=Object.defineProperty;var OS=(r,t,n)=>t in r?NS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var Rt=(r,t,n)=>OS(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function zv(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Sh={exports:{}},Yo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n_;function PS(){if(n_)return Yo;n_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:a,key:f,ref:l!==void 0?l:null,props:c}}return Yo.Fragment=t,Yo.jsx=n,Yo.jsxs=n,Yo}var i_;function zS(){return i_||(i_=1,Sh.exports=PS()),Sh.exports}var Q=zS(),Mh={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a_;function BS(){if(a_)return ie;a_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.iterator;function M(O){return O===null||typeof O!="object"?null:(O=x&&O[x]||O["@@iterator"],typeof O=="function"?O:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,S={};function v(O,nt,yt){this.props=O,this.context=nt,this.refs=S,this.updater=yt||E}v.prototype.isReactComponent={},v.prototype.setState=function(O,nt){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,nt,"setState")},v.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function U(){}U.prototype=v.prototype;function D(O,nt,yt){this.props=O,this.context=nt,this.refs=S,this.updater=yt||E}var w=D.prototype=new U;w.constructor=D,T(w,v.prototype),w.isPureReactComponent=!0;var q=Array.isArray;function I(){}var P={H:null,A:null,T:null,S:null},G=Object.prototype.hasOwnProperty;function L(O,nt,yt){var K=yt.ref;return{$$typeof:r,type:O,key:nt,ref:K!==void 0?K:null,props:yt}}function R(O,nt){return L(O.type,nt,O.props)}function F(O){return typeof O=="object"&&O!==null&&O.$$typeof===r}function et(O){var nt={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(yt){return nt[yt]})}var st=/\/+/g;function ht(O,nt){return typeof O=="object"&&O!==null&&O.key!=null?et(""+O.key):nt.toString(36)}function pt(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(I,I):(O.status="pending",O.then(function(nt){O.status==="pending"&&(O.status="fulfilled",O.value=nt)},function(nt){O.status==="pending"&&(O.status="rejected",O.reason=nt)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function z(O,nt,yt,K,ut){var Tt=typeof O;(Tt==="undefined"||Tt==="boolean")&&(O=null);var Mt=!1;if(O===null)Mt=!0;else switch(Tt){case"bigint":case"string":case"number":Mt=!0;break;case"object":switch(O.$$typeof){case r:case t:Mt=!0;break;case g:return Mt=O._init,z(Mt(O._payload),nt,yt,K,ut)}}if(Mt)return ut=ut(O),Mt=K===""?"."+ht(O,0):K,q(ut)?(yt="",Mt!=null&&(yt=Mt.replace(st,"$&/")+"/"),z(ut,nt,yt,"",function(ae){return ae})):ut!=null&&(F(ut)&&(ut=R(ut,yt+(ut.key==null||O&&O.key===ut.key?"":(""+ut.key).replace(st,"$&/")+"/")+Mt)),nt.push(ut)),1;Mt=0;var Vt=K===""?".":K+":";if(q(O))for(var Ht=0;Ht<O.length;Ht++)K=O[Ht],Tt=Vt+ht(K,Ht),Mt+=z(K,nt,yt,Tt,ut);else if(Ht=M(O),typeof Ht=="function")for(O=Ht.call(O),Ht=0;!(K=O.next()).done;)K=K.value,Tt=Vt+ht(K,Ht++),Mt+=z(K,nt,yt,Tt,ut);else if(Tt==="object"){if(typeof O.then=="function")return z(pt(O),nt,yt,K,ut);throw nt=String(O),Error("Objects are not valid as a React child (found: "+(nt==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":nt)+"). If you meant to render a collection of children, use an array instead.")}return Mt}function V(O,nt,yt){if(O==null)return O;var K=[],ut=0;return z(O,K,"","",function(Tt){return nt.call(yt,Tt,ut++)}),K}function k(O){if(O._status===-1){var nt=O._result;nt=nt(),nt.then(function(yt){(O._status===0||O._status===-1)&&(O._status=1,O._result=yt)},function(yt){(O._status===0||O._status===-1)&&(O._status=2,O._result=yt)}),O._status===-1&&(O._status=0,O._result=nt)}if(O._status===1)return O._result.default;throw O._result}var xt=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var nt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(nt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},St={map:V,forEach:function(O,nt,yt){V(O,function(){nt.apply(this,arguments)},yt)},count:function(O){var nt=0;return V(O,function(){nt++}),nt},toArray:function(O){return V(O,function(nt){return nt})||[]},only:function(O){if(!F(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return ie.Activity=_,ie.Children=St,ie.Component=v,ie.Fragment=n,ie.Profiler=l,ie.PureComponent=D,ie.StrictMode=a,ie.Suspense=p,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ie.__COMPILER_RUNTIME={__proto__:null,c:function(O){return P.H.useMemoCache(O)}},ie.cache=function(O){return function(){return O.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(O,nt,yt){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var K=T({},O.props),ut=O.key;if(nt!=null)for(Tt in nt.key!==void 0&&(ut=""+nt.key),nt)!G.call(nt,Tt)||Tt==="key"||Tt==="__self"||Tt==="__source"||Tt==="ref"&&nt.ref===void 0||(K[Tt]=nt[Tt]);var Tt=arguments.length-2;if(Tt===1)K.children=yt;else if(1<Tt){for(var Mt=Array(Tt),Vt=0;Vt<Tt;Vt++)Mt[Vt]=arguments[Vt+2];K.children=Mt}return L(O.type,ut,K)},ie.createContext=function(O){return O={$$typeof:f,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},ie.createElement=function(O,nt,yt){var K,ut={},Tt=null;if(nt!=null)for(K in nt.key!==void 0&&(Tt=""+nt.key),nt)G.call(nt,K)&&K!=="key"&&K!=="__self"&&K!=="__source"&&(ut[K]=nt[K]);var Mt=arguments.length-2;if(Mt===1)ut.children=yt;else if(1<Mt){for(var Vt=Array(Mt),Ht=0;Ht<Mt;Ht++)Vt[Ht]=arguments[Ht+2];ut.children=Vt}if(O&&O.defaultProps)for(K in Mt=O.defaultProps,Mt)ut[K]===void 0&&(ut[K]=Mt[K]);return L(O,Tt,ut)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(O){return{$$typeof:h,render:O}},ie.isValidElement=F,ie.lazy=function(O){return{$$typeof:g,_payload:{_status:-1,_result:O},_init:k}},ie.memo=function(O,nt){return{$$typeof:m,type:O,compare:nt===void 0?null:nt}},ie.startTransition=function(O){var nt=P.T,yt={};P.T=yt;try{var K=O(),ut=P.S;ut!==null&&ut(yt,K),typeof K=="object"&&K!==null&&typeof K.then=="function"&&K.then(I,xt)}catch(Tt){xt(Tt)}finally{nt!==null&&yt.types!==null&&(nt.types=yt.types),P.T=nt}},ie.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ie.use=function(O){return P.H.use(O)},ie.useActionState=function(O,nt,yt){return P.H.useActionState(O,nt,yt)},ie.useCallback=function(O,nt){return P.H.useCallback(O,nt)},ie.useContext=function(O){return P.H.useContext(O)},ie.useDebugValue=function(){},ie.useDeferredValue=function(O,nt){return P.H.useDeferredValue(O,nt)},ie.useEffect=function(O,nt){return P.H.useEffect(O,nt)},ie.useEffectEvent=function(O){return P.H.useEffectEvent(O)},ie.useId=function(){return P.H.useId()},ie.useImperativeHandle=function(O,nt,yt){return P.H.useImperativeHandle(O,nt,yt)},ie.useInsertionEffect=function(O,nt){return P.H.useInsertionEffect(O,nt)},ie.useLayoutEffect=function(O,nt){return P.H.useLayoutEffect(O,nt)},ie.useMemo=function(O,nt){return P.H.useMemo(O,nt)},ie.useOptimistic=function(O,nt){return P.H.useOptimistic(O,nt)},ie.useReducer=function(O,nt,yt){return P.H.useReducer(O,nt,yt)},ie.useRef=function(O){return P.H.useRef(O)},ie.useState=function(O){return P.H.useState(O)},ie.useSyncExternalStore=function(O,nt,yt){return P.H.useSyncExternalStore(O,nt,yt)},ie.useTransition=function(){return P.H.useTransition()},ie.version="19.2.8",ie}var s_;function op(){return s_||(s_=1,Mh.exports=BS()),Mh.exports}var ss=op();const il=zv(ss);var Eh={exports:{}},Zo={},Th={exports:{}},bh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r_;function IS(){return r_||(r_=1,(function(r){function t(z,V){var k=z.length;z.push(V);t:for(;0<k;){var xt=k-1>>>1,St=z[xt];if(0<l(St,V))z[xt]=V,z[k]=St,k=xt;else break t}}function n(z){return z.length===0?null:z[0]}function a(z){if(z.length===0)return null;var V=z[0],k=z.pop();if(k!==V){z[0]=k;t:for(var xt=0,St=z.length,O=St>>>1;xt<O;){var nt=2*(xt+1)-1,yt=z[nt],K=nt+1,ut=z[K];if(0>l(yt,k))K<St&&0>l(ut,yt)?(z[xt]=ut,z[K]=k,xt=K):(z[xt]=yt,z[nt]=k,xt=nt);else if(K<St&&0>l(ut,k))z[xt]=ut,z[K]=k,xt=K;else break t}}return V}function l(z,V){var k=z.sortIndex-V.sortIndex;return k!==0?k:z.id-V.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var p=[],m=[],g=1,_=null,x=3,M=!1,E=!1,T=!1,S=!1,v=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function w(z){for(var V=n(m);V!==null;){if(V.callback===null)a(m);else if(V.startTime<=z)a(m),V.sortIndex=V.expirationTime,t(p,V);else break;V=n(m)}}function q(z){if(T=!1,w(z),!E)if(n(p)!==null)E=!0,I||(I=!0,et());else{var V=n(m);V!==null&&pt(q,V.startTime-z)}}var I=!1,P=-1,G=5,L=-1;function R(){return S?!0:!(r.unstable_now()-L<G)}function F(){if(S=!1,I){var z=r.unstable_now();L=z;var V=!0;try{t:{E=!1,T&&(T=!1,U(P),P=-1),M=!0;var k=x;try{e:{for(w(z),_=n(p);_!==null&&!(_.expirationTime>z&&R());){var xt=_.callback;if(typeof xt=="function"){_.callback=null,x=_.priorityLevel;var St=xt(_.expirationTime<=z);if(z=r.unstable_now(),typeof St=="function"){_.callback=St,w(z),V=!0;break e}_===n(p)&&a(p),w(z)}else a(p);_=n(p)}if(_!==null)V=!0;else{var O=n(m);O!==null&&pt(q,O.startTime-z),V=!1}}break t}finally{_=null,x=k,M=!1}V=void 0}}finally{V?et():I=!1}}}var et;if(typeof D=="function")et=function(){D(F)};else if(typeof MessageChannel<"u"){var st=new MessageChannel,ht=st.port2;st.port1.onmessage=F,et=function(){ht.postMessage(null)}}else et=function(){v(F,0)};function pt(z,V){P=v(function(){z(r.unstable_now())},V)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):G=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(z){switch(x){case 1:case 2:case 3:var V=3;break;default:V=x}var k=x;x=V;try{return z()}finally{x=k}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(z,V){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var k=x;x=z;try{return V()}finally{x=k}},r.unstable_scheduleCallback=function(z,V,k){var xt=r.unstable_now();switch(typeof k=="object"&&k!==null?(k=k.delay,k=typeof k=="number"&&0<k?xt+k:xt):k=xt,z){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=k+St,z={id:g++,callback:V,priorityLevel:z,startTime:k,expirationTime:St,sortIndex:-1},k>xt?(z.sortIndex=k,t(m,z),n(p)===null&&z===n(m)&&(T?(U(P),P=-1):T=!0,pt(q,k-xt))):(z.sortIndex=St,t(p,z),E||M||(E=!0,I||(I=!0,et()))),z},r.unstable_shouldYield=R,r.unstable_wrapCallback=function(z){var V=x;return function(){var k=x;x=V;try{return z.apply(this,arguments)}finally{x=k}}}})(bh)),bh}var o_;function FS(){return o_||(o_=1,Th.exports=IS()),Th.exports}var Ah={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l_;function GS(){if(l_)return In;l_=1;var r=op();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)m+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:p,containerInfo:m,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,In.createPortal=function(p,m){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,g)},In.flushSync=function(p){var m=f.T,g=a.p;try{if(f.T=null,a.p=2,p)return p()}finally{f.T=m,a.p=g,a.d.f()}},In.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,a.d.C(p,m))},In.prefetchDNS=function(p){typeof p=="string"&&a.d.D(p)},In.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var g=m.as,_=h(g,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;g==="style"?a.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:_,integrity:x,fetchPriority:M}):g==="script"&&a.d.X(p,{crossOrigin:_,integrity:x,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},In.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var g=h(m.as,m.crossOrigin);a.d.M(p,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&a.d.M(p)},In.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var g=m.as,_=h(g,m.crossOrigin);a.d.L(p,g,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},In.preloadModule=function(p,m){if(typeof p=="string")if(m){var g=h(m.as,m.crossOrigin);a.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else a.d.m(p)},In.requestFormReset=function(p){a.d.r(p)},In.unstable_batchedUpdates=function(p,m){return p(m)},In.useFormState=function(p,m,g){return f.H.useFormState(p,m,g)},In.useFormStatus=function(){return f.H.useHostTransitionStatus()},In.version="19.2.8",In}var c_;function HS(){if(c_)return Ah.exports;c_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ah.exports=GS(),Ah.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u_;function VS(){if(u_)return Zo;u_=1;var r=FS(),t=op(),n=HS();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(a(188))}function m(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,o=i;;){var u=s.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){s=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===s)return p(u),e;if(d===o)return p(u),i;d=d.sibling}throw Error(a(188))}if(s.return!==o.return)s=u,o=d;else{for(var y=!1,b=u.child;b;){if(b===s){y=!0,s=u,o=d;break}if(b===o){y=!0,o=u,s=d;break}b=b.sibling}if(!y){for(b=d.child;b;){if(b===s){y=!0,s=d,o=u;break}if(b===o){y=!0,o=d,s=u;break}b=b.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==o)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),U=Symbol.for("react.consumer"),D=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),I=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),R=Symbol.for("react.memo_cache_sentinel"),F=Symbol.iterator;function et(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var st=Symbol.for("react.client.reference");function ht(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===st?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case v:return"Profiler";case S:return"StrictMode";case q:return"Suspense";case I:return"SuspenseList";case L:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case D:return e.displayName||"Context";case U:return(e._context.displayName||"Context")+".Consumer";case w:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return i=e.displayName||null,i!==null?i:ht(e.type)||"Memo";case G:i=e._payload,e=e._init;try{return ht(e(i))}catch{}}return null}var pt=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k={pending:!1,data:null,method:null,action:null},xt=[],St=-1;function O(e){return{current:e}}function nt(e){0>St||(e.current=xt[St],xt[St]=null,St--)}function yt(e,i){St++,xt[St]=e.current,e.current=i}var K=O(null),ut=O(null),Tt=O(null),Mt=O(null);function Vt(e,i){switch(yt(Tt,i),yt(ut,e),yt(K,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?bg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=bg(i),e=Ag(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}nt(K),yt(K,e)}function Ht(){nt(K),nt(ut),nt(Tt)}function ae(e){e.memoizedState!==null&&yt(Mt,e);var i=K.current,s=Ag(i,e.type);i!==s&&(yt(ut,e),yt(K,s))}function Fe(e){ut.current===e&&(nt(K),nt(ut)),Mt.current===e&&(nt(Mt),Xo._currentValue=k)}var de,Qe;function Y(e){if(de===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);de=i&&i[1]||"",Qe=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+de+e+Qe}var Pn=!1;function he(e,i){if(!e||Pn)return"";Pn=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(lt){var it=lt}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(lt){it=lt}e.call(_t.prototype)}}else{try{throw Error()}catch(lt){it=lt}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(lt){if(lt&&it&&typeof lt.stack=="string")return[lt.stack,it.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),y=d[0],b=d[1];if(y&&b){var B=y.split(`
`),tt=b.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<tt.length&&!tt[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===tt.length)for(o=B.length-1,u=tt.length-1;1<=o&&0<=u&&B[o]!==tt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==tt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==tt[u]){var ft=`
`+B[o].replace(" at new "," at ");return e.displayName&&ft.includes("<anonymous>")&&(ft=ft.replace("<anonymous>",e.displayName)),ft}while(1<=o&&0<=u);break}}}finally{Pn=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?Y(s):""}function _e(e,i){switch(e.tag){case 26:case 27:case 5:return Y(e.type);case 16:return Y("Lazy");case 13:return e.child!==i&&i!==null?Y("Suspense Fallback"):Y("Suspense");case 19:return Y("SuspenseList");case 0:case 15:return he(e.type,!1);case 11:return he(e.type.render,!1);case 1:return he(e.type,!0);case 31:return Y("Activity");default:return""}}function Qt(e){try{var i="",s=null;do i+=_e(e,s),s=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Oe=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,N=r.unstable_cancelCallback,A=r.unstable_shouldYield,at=r.unstable_requestPaint,dt=r.unstable_now,Et=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,Lt=r.unstable_NormalPriority,zt=r.unstable_LowPriority,ve=r.unstable_IdlePriority,At=r.log,Bt=r.unstable_setDisableYieldValue,Kt=null,jt=null;function Pt(e){if(typeof At=="function"&&Bt(e),jt&&typeof jt.setStrictMode=="function")try{jt.setStrictMode(Kt,e)}catch{}}var te=Math.clz32?Math.clz32:X,re=Math.log,Ge=Math.LN2;function X(e){return e>>>=0,e===0?32:31-(re(e)/Ge|0)|0}var wt=256,ct=262144,vt=4194304;function Ct(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Nt(e,i,s){var o=e.pendingLanes;if(o===0)return 0;var u=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~d,o!==0?u=Ct(o):(y&=b,y!==0?u=Ct(y):s||(s=b&~e,s!==0&&(u=Ct(s))))):(b=o&~d,b!==0?u=Ct(b):y!==0?u=Ct(y):s||(s=o&~e,s!==0&&(u=Ct(s)))),u===0?0:i!==0&&i!==u&&(i&d)===0&&(d=u&-u,s=i&-i,d>=s||d===32&&(s&4194048)!==0)?i:u}function ee(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Je(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _n(){var e=vt;return vt<<=1,(vt&62914560)===0&&(vt=4194304),e}function Re(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Rn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wi(e,i,s,o,u,d){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var b=e.entanglements,B=e.expirationTimes,tt=e.hiddenUpdates;for(s=y&~s;0<s;){var ft=31-te(s),_t=1<<ft;b[ft]=0,B[ft]=-1;var it=tt[ft];if(it!==null)for(tt[ft]=null,ft=0;ft<it.length;ft++){var lt=it[ft];lt!==null&&(lt.lane&=-536870913)}s&=~_t}o!==0&&no(e,o,0),d!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~i))}function no(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-te(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function io(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var o=31-te(s),u=1<<o;u&i|e[o]&i&&(e[o]|=i),s&=~u}}function Hi(e,i){var s=i&-i;return s=(s&42)!==0?1:ds(s),(s&(e.suspendedLanes|i))!==0?0:s}function ds(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function qs(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ao(){var e=V.p;return e!==0?e:(e=window.event,e===void 0?32:Zg(e.type))}function ps(e,i){var s=V.p;try{return V.p=e,i()}finally{V.p=s}}var Ci=Math.random().toString(36).slice(2),en="__reactFiber$"+Ci,wn="__reactProps$"+Ci,Zi="__reactContainer$"+Ci,so="__reactEvents$"+Ci,pu="__reactListeners$"+Ci,mu="__reactHandles$"+Ci,C="__reactResources$"+Ci,W="__reactMarker$"+Ci;function ot(e){delete e[en],delete e[wn],delete e[so],delete e[pu],delete e[mu]}function rt(e){var i=e[en];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Zi]||s[en]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=Ng(e);e!==null;){if(s=e[en])return s;e=Ng(e)}return i}e=s,s=e.parentNode}return null}function j(e){if(e=e[en]||e[Zi]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Dt(e){var i=e[C];return i||(i=e[C]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Ut(e){e[W]=!0}var kt=new Set,ne={};function $t(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(ne[e]=i,e=0;e<i.length;e++)kt.add(i[e])}var be=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Pe={},He={};function zn(e){return Oe.call(He,e)?!0:Oe.call(Pe,e)?!1:be.test(e)?He[e]=!0:(Pe[e]=!0,!1)}function Me(e,i,s){if(zn(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Xt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function vn(e,i,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+o)}}function se(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ra(e,i,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(y){s=""+y,d.call(this,y)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Cn(e){if(!e._valueTracker){var i=Wn(e)?"checked":"value";e._valueTracker=Ra(e,i,""+e[i])}}function wa(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),o="";return e&&(o=Wn(e)?e.checked?"true":"false":e.value),e=o,e!==s?(i.setValue(e),!0):!1}function Ne(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var di=/[\n"\\]/g;function En(e){return e.replace(di,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Bn(e,i,s,o,u,d,y,b){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+se(i)):e.value!==""+se(i)&&(e.value=""+se(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?pi(e,y,se(i)):s!=null?pi(e,y,se(s)):o!=null&&e.removeAttribute("value"),u==null&&d!=null&&(e.defaultChecked=!!d),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+se(b):e.removeAttribute("name")}function Di(e,i,s,o,u,d,y,b){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||s!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){Cn(e);return}s=s!=null?""+se(s):"",i=i!=null?""+se(i):s,b||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Cn(e)}function pi(e,i,s){i==="number"&&Ne(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function Ki(e,i,s,o){if(e=e.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=i.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&o&&(e[s].defaultSelected=!0)}else{for(s=""+se(s),i=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function yp(e,i,s){if(i!=null&&(i=""+se(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+se(s):""}function Sp(e,i,s,o){if(i==null){if(o!=null){if(s!=null)throw Error(a(92));if(pt(o)){if(1<o.length)throw Error(a(93));o=o[0]}s=o}s==null&&(s=""),i=s}s=se(i),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),Cn(e)}function Ws(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var wx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Mp(e,i,s){var o=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,s):typeof s!="number"||s===0||wx.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function Ep(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&s[u]!==o&&Mp(e,u,o)}else for(var d in i)i.hasOwnProperty(d)&&Mp(e,d,i[d])}function gu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Cx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Dx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function pl(e){return Dx.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Qi(){}var _u=null;function vu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var js=null,Ys=null;function Tp(e){var i=j(e);if(i&&(e=i.stateNode)){var s=e[wn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Bn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+En(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var o=s[i];if(o!==e&&o.form===e.form){var u=o[wn]||null;if(!u)throw Error(a(90));Bn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)o=s[i],o.form===e.form&&wa(o)}break t;case"textarea":yp(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&Ki(e,!!s.multiple,i,!1)}}}var xu=!1;function bp(e,i,s){if(xu)return e(i,s);xu=!0;try{var o=e(i);return o}finally{if(xu=!1,(js!==null||Ys!==null)&&(ec(),js&&(i=js,e=Ys,Ys=js=null,Tp(i),e)))for(i=0;i<e.length;i++)Tp(e[i])}}function ro(e,i){var s=e.stateNode;if(s===null)return null;var o=s[wn]||null;if(o===null)return null;s=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var Ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),yu=!1;if(Ji)try{var oo={};Object.defineProperty(oo,"passive",{get:function(){yu=!0}}),window.addEventListener("test",oo,oo),window.removeEventListener("test",oo,oo)}catch{yu=!1}var Ca=null,Su=null,ml=null;function Ap(){if(ml)return ml;var e,i=Su,s=i.length,o,u="value"in Ca?Ca.value:Ca.textContent,d=u.length;for(e=0;e<s&&i[e]===u[e];e++);var y=s-e;for(o=1;o<=y&&i[s-o]===u[d-o];o++);return ml=u.slice(e,1<o?1-o:void 0)}function gl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function _l(){return!0}function Rp(){return!1}function jn(e){function i(s,o,u,d,y){this._reactName=s,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(s=e[b],this[b]=s?s(d):d[b]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?_l:Rp,this.isPropagationStopped=Rp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=_l)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=_l)},persist:function(){},isPersistent:_l}),i}var ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vl=jn(ms),lo=_({},ms,{view:0,detail:0}),Ux=jn(lo),Mu,Eu,co,xl=_({},lo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:bu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==co&&(co&&e.type==="mousemove"?(Mu=e.screenX-co.screenX,Eu=e.screenY-co.screenY):Eu=Mu=0,co=e),Mu)},movementY:function(e){return"movementY"in e?e.movementY:Eu}}),wp=jn(xl),Lx=_({},xl,{dataTransfer:0}),Nx=jn(Lx),Ox=_({},lo,{relatedTarget:0}),Tu=jn(Ox),Px=_({},ms,{animationName:0,elapsedTime:0,pseudoElement:0}),zx=jn(Px),Bx=_({},ms,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ix=jn(Bx),Fx=_({},ms,{data:0}),Cp=jn(Fx),Gx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Vx[e])?!!i[e]:!1}function bu(){return kx}var Xx=_({},lo,{key:function(e){if(e.key){var i=Gx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=gl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:bu,charCode:function(e){return e.type==="keypress"?gl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?gl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qx=jn(Xx),Wx=_({},xl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dp=jn(Wx),jx=_({},lo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:bu}),Yx=jn(jx),Zx=_({},ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kx=jn(Zx),Qx=_({},xl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Jx=jn(Qx),$x=_({},ms,{newState:0,oldState:0}),ty=jn($x),ey=[9,13,27,32],Au=Ji&&"CompositionEvent"in window,uo=null;Ji&&"documentMode"in document&&(uo=document.documentMode);var ny=Ji&&"TextEvent"in window&&!uo,Up=Ji&&(!Au||uo&&8<uo&&11>=uo),Lp=" ",Np=!1;function Op(e,i){switch(e){case"keyup":return ey.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Zs=!1;function iy(e,i){switch(e){case"compositionend":return Pp(i);case"keypress":return i.which!==32?null:(Np=!0,Lp);case"textInput":return e=i.data,e===Lp&&Np?null:e;default:return null}}function ay(e,i){if(Zs)return e==="compositionend"||!Au&&Op(e,i)?(e=Ap(),ml=Su=Ca=null,Zs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Up&&i.locale!=="ko"?null:i.data;default:return null}}var sy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!sy[e.type]:i==="textarea"}function Bp(e,i,s,o){js?Ys?Ys.push(o):Ys=[o]:js=o,i=lc(i,"onChange"),0<i.length&&(s=new vl("onChange","change",null,s,o),e.push({event:s,listeners:i}))}var fo=null,ho=null;function ry(e){xg(e,0)}function yl(e){var i=bt(e);if(wa(i))return e}function Ip(e,i){if(e==="change")return i}var Fp=!1;if(Ji){var Ru;if(Ji){var wu="oninput"in document;if(!wu){var Gp=document.createElement("div");Gp.setAttribute("oninput","return;"),wu=typeof Gp.oninput=="function"}Ru=wu}else Ru=!1;Fp=Ru&&(!document.documentMode||9<document.documentMode)}function Hp(){fo&&(fo.detachEvent("onpropertychange",Vp),ho=fo=null)}function Vp(e){if(e.propertyName==="value"&&yl(ho)){var i=[];Bp(i,ho,e,vu(e)),bp(ry,i)}}function oy(e,i,s){e==="focusin"?(Hp(),fo=i,ho=s,fo.attachEvent("onpropertychange",Vp)):e==="focusout"&&Hp()}function ly(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return yl(ho)}function cy(e,i){if(e==="click")return yl(i)}function uy(e,i){if(e==="input"||e==="change")return yl(i)}function fy(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ii=typeof Object.is=="function"?Object.is:fy;function po(e,i){if(ii(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),o=Object.keys(i);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var u=s[o];if(!Oe.call(i,u)||!ii(e[u],i[u]))return!1}return!0}function kp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xp(e,i){var s=kp(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=i&&o>=i)return{node:s,offset:i-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=kp(s)}}function qp(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?qp(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Wp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Ne(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=Ne(e.document)}return i}function Cu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var hy=Ji&&"documentMode"in document&&11>=document.documentMode,Ks=null,Du=null,mo=null,Uu=!1;function jp(e,i,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Uu||Ks==null||Ks!==Ne(o)||(o=Ks,"selectionStart"in o&&Cu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),mo&&po(mo,o)||(mo=o,o=lc(Du,"onSelect"),0<o.length&&(i=new vl("onSelect","select",null,i,s),e.push({event:i,listeners:o}),i.target=Ks)))}function gs(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var Qs={animationend:gs("Animation","AnimationEnd"),animationiteration:gs("Animation","AnimationIteration"),animationstart:gs("Animation","AnimationStart"),transitionrun:gs("Transition","TransitionRun"),transitionstart:gs("Transition","TransitionStart"),transitioncancel:gs("Transition","TransitionCancel"),transitionend:gs("Transition","TransitionEnd")},Lu={},Yp={};Ji&&(Yp=document.createElement("div").style,"AnimationEvent"in window||(delete Qs.animationend.animation,delete Qs.animationiteration.animation,delete Qs.animationstart.animation),"TransitionEvent"in window||delete Qs.transitionend.transition);function _s(e){if(Lu[e])return Lu[e];if(!Qs[e])return e;var i=Qs[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in Yp)return Lu[e]=i[s];return e}var Zp=_s("animationend"),Kp=_s("animationiteration"),Qp=_s("animationstart"),dy=_s("transitionrun"),py=_s("transitionstart"),my=_s("transitioncancel"),Jp=_s("transitionend"),$p=new Map,Nu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Nu.push("scrollEnd");function Ui(e,i){$p.set(e,i),$t(i,[e])}var Sl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},mi=[],Js=0,Ou=0;function Ml(){for(var e=Js,i=Ou=Js=0;i<e;){var s=mi[i];mi[i++]=null;var o=mi[i];mi[i++]=null;var u=mi[i];mi[i++]=null;var d=mi[i];if(mi[i++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}d!==0&&tm(s,u,d)}}function El(e,i,s,o){mi[Js++]=e,mi[Js++]=i,mi[Js++]=s,mi[Js++]=o,Ou|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Pu(e,i,s,o){return El(e,i,s,o),Tl(e)}function vs(e,i){return El(e,null,null,i),Tl(e)}function tm(e,i,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var u=!1,d=e.return;d!==null;)d.childLanes|=s,o=d.alternate,o!==null&&(o.childLanes|=s),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(u=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,u&&i!==null&&(u=31-te(s),e=d.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=s|536870912),d):null}function Tl(e){if(50<Bo)throw Bo=0,qf=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var $s={};function gy(e,i,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(e,i,s,o){return new gy(e,i,s,o)}function zu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $i(e,i){var s=e.alternate;return s===null?(s=ai(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function em(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function bl(e,i,s,o,u,d){var y=0;if(o=e,typeof e=="function")zu(e)&&(y=1);else if(typeof e=="string")y=SS(e,s,K.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case L:return e=ai(31,s,i,u),e.elementType=L,e.lanes=d,e;case T:return xs(s.children,u,d,i);case S:y=8,u|=24;break;case v:return e=ai(12,s,i,u|2),e.elementType=v,e.lanes=d,e;case q:return e=ai(13,s,i,u),e.elementType=q,e.lanes=d,e;case I:return e=ai(19,s,i,u),e.elementType=I,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case D:y=10;break t;case U:y=9;break t;case w:y=11;break t;case P:y=14;break t;case G:y=16,o=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),o=null}return i=ai(y,s,i,u),i.elementType=e,i.type=o,i.lanes=d,i}function xs(e,i,s,o){return e=ai(7,e,o,i),e.lanes=s,e}function Bu(e,i,s){return e=ai(6,e,null,i),e.lanes=s,e}function nm(e){var i=ai(18,null,null,0);return i.stateNode=e,i}function Iu(e,i,s){return i=ai(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var im=new WeakMap;function gi(e,i){if(typeof e=="object"&&e!==null){var s=im.get(e);return s!==void 0?s:(i={value:e,source:i,stack:Qt(i)},im.set(e,i),i)}return{value:e,source:i,stack:Qt(i)}}var tr=[],er=0,Al=null,go=0,_i=[],vi=0,Da=null,Vi=1,ki="";function ta(e,i){tr[er++]=go,tr[er++]=Al,Al=e,go=i}function am(e,i,s){_i[vi++]=Vi,_i[vi++]=ki,_i[vi++]=Da,Da=e;var o=Vi;e=ki;var u=32-te(o)-1;o&=~(1<<u),s+=1;var d=32-te(i)+u;if(30<d){var y=u-u%5;d=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Vi=1<<32-te(i)+u|s<<u|o,ki=d+e}else Vi=1<<d|s<<u|o,ki=e}function Fu(e){e.return!==null&&(ta(e,1),am(e,1,0))}function Gu(e){for(;e===Al;)Al=tr[--er],tr[er]=null,go=tr[--er],tr[er]=null;for(;e===Da;)Da=_i[--vi],_i[vi]=null,ki=_i[--vi],_i[vi]=null,Vi=_i[--vi],_i[vi]=null}function sm(e,i){_i[vi++]=Vi,_i[vi++]=ki,_i[vi++]=Da,Vi=i.id,ki=i.overflow,Da=e}var Dn=null,Ze=null,Ee=!1,Ua=null,xi=!1,Hu=Error(a(519));function La(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw _o(gi(i,e)),Hu}function rm(e){var i=e.stateNode,s=e.type,o=e.memoizedProps;switch(i[en]=e,i[wn]=o,s){case"dialog":me("cancel",i),me("close",i);break;case"iframe":case"object":case"embed":me("load",i);break;case"video":case"audio":for(s=0;s<Fo.length;s++)me(Fo[s],i);break;case"source":me("error",i);break;case"img":case"image":case"link":me("error",i),me("load",i);break;case"details":me("toggle",i);break;case"input":me("invalid",i),Di(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":me("invalid",i);break;case"textarea":me("invalid",i),Sp(i,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||o.suppressHydrationWarning===!0||Eg(i.textContent,s)?(o.popover!=null&&(me("beforetoggle",i),me("toggle",i)),o.onScroll!=null&&me("scroll",i),o.onScrollEnd!=null&&me("scrollend",i),o.onClick!=null&&(i.onclick=Qi),i=!0):i=!1,i||La(e,!0)}function om(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:Dn=Dn.return}}function nr(e){if(e!==Dn)return!1;if(!Ee)return om(e),Ee=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||rh(e.type,e.memoizedProps)),s=!s),s&&Ze&&La(e),om(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ze=Lg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ze=Lg(e)}else i===27?(i=Ze,Wa(e.type)?(e=fh,fh=null,Ze=e):Ze=i):Ze=Dn?Si(e.stateNode.nextSibling):null;return!0}function ys(){Ze=Dn=null,Ee=!1}function Vu(){var e=Ua;return e!==null&&(Qn===null?Qn=e:Qn.push.apply(Qn,e),Ua=null),e}function _o(e){Ua===null?Ua=[e]:Ua.push(e)}var ku=O(null),Ss=null,ea=null;function Na(e,i,s){yt(ku,i._currentValue),i._currentValue=s}function na(e){e._currentValue=ku.current,nt(ku)}function Xu(e,i,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===s)break;e=e.return}}function qu(e,i,s,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var d=u.dependencies;if(d!==null){var y=u.child;d=d.firstContext;t:for(;d!==null;){var b=d;d=u;for(var B=0;B<i.length;B++)if(b.context===i[B]){d.lanes|=s,b=d.alternate,b!==null&&(b.lanes|=s),Xu(d.return,s,e),o||(y=null);break t}d=b.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(a(341));y.lanes|=s,d=y.alternate,d!==null&&(d.lanes|=s),Xu(y,s,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function ir(e,i,s,o){e=null;for(var u=i,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var b=u.type;ii(u.pendingProps.value,y.value)||(e!==null?e.push(b):e=[b])}}else if(u===Mt.current){if(y=u.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Xo):e=[Xo])}u=u.return}e!==null&&qu(i,e,s,o),i.flags|=262144}function Rl(e){for(e=e.firstContext;e!==null;){if(!ii(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ms(e){Ss=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return lm(Ss,e)}function wl(e,i){return Ss===null&&Ms(e),lm(e,i)}function lm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ea===null){if(e===null)throw Error(a(308));ea=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ea=ea.next=i;return s}var _y=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},vy=r.unstable_scheduleCallback,xy=r.unstable_NormalPriority,un={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Wu(){return{controller:new _y,data:new Map,refCount:0}}function vo(e){e.refCount--,e.refCount===0&&vy(xy,function(){e.controller.abort()})}var xo=null,ju=0,ar=0,sr=null;function yy(e,i){if(xo===null){var s=xo=[];ju=0,ar=Qf(),sr={status:"pending",value:void 0,then:function(o){s.push(o)}}}return ju++,i.then(cm,cm),i}function cm(){if(--ju===0&&xo!==null){sr!==null&&(sr.status="fulfilled");var e=xo;xo=null,ar=0,sr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function Sy(e,i){var s=[],o={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),o}var um=z.S;z.S=function(e,i){j0=dt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&yy(e,i),um!==null&&um(e,i)};var Es=O(null);function Yu(){var e=Es.current;return e!==null?e:qe.pooledCache}function Cl(e,i){i===null?yt(Es,Es.current):yt(Es,i.pool)}function fm(){var e=Yu();return e===null?null:{parent:un._currentValue,pool:e}}var rr=Error(a(460)),Zu=Error(a(474)),Dl=Error(a(542)),Ul={then:function(){}};function hm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function dm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Qi,Qi),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,mm(e),e;default:if(typeof i.status=="string")i.then(Qi,Qi);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,mm(e),e}throw bs=i,rr}}function Ts(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(bs=s,rr):s}}var bs=null;function pm(){if(bs===null)throw Error(a(459));var e=bs;return bs=null,e}function mm(e){if(e===rr||e===Dl)throw Error(a(483))}var or=null,yo=0;function Ll(e){var i=yo;return yo+=1,or===null&&(or=[]),dm(or,e,i)}function So(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Nl(e,i){throw i.$$typeof===x?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function gm(e){function i(Z,H){if(e){var $=Z.deletions;$===null?(Z.deletions=[H],Z.flags|=16):$.push(H)}}function s(Z,H){if(!e)return null;for(;H!==null;)i(Z,H),H=H.sibling;return null}function o(Z){for(var H=new Map;Z!==null;)Z.key!==null?H.set(Z.key,Z):H.set(Z.index,Z),Z=Z.sibling;return H}function u(Z,H){return Z=$i(Z,H),Z.index=0,Z.sibling=null,Z}function d(Z,H,$){return Z.index=$,e?($=Z.alternate,$!==null?($=$.index,$<H?(Z.flags|=67108866,H):$):(Z.flags|=67108866,H)):(Z.flags|=1048576,H)}function y(Z){return e&&Z.alternate===null&&(Z.flags|=67108866),Z}function b(Z,H,$,mt){return H===null||H.tag!==6?(H=Bu($,Z.mode,mt),H.return=Z,H):(H=u(H,$),H.return=Z,H)}function B(Z,H,$,mt){var Yt=$.type;return Yt===T?ft(Z,H,$.props.children,mt,$.key):H!==null&&(H.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===G&&Ts(Yt)===H.type)?(H=u(H,$.props),So(H,$),H.return=Z,H):(H=bl($.type,$.key,$.props,null,Z.mode,mt),So(H,$),H.return=Z,H)}function tt(Z,H,$,mt){return H===null||H.tag!==4||H.stateNode.containerInfo!==$.containerInfo||H.stateNode.implementation!==$.implementation?(H=Iu($,Z.mode,mt),H.return=Z,H):(H=u(H,$.children||[]),H.return=Z,H)}function ft(Z,H,$,mt,Yt){return H===null||H.tag!==7?(H=xs($,Z.mode,mt,Yt),H.return=Z,H):(H=u(H,$),H.return=Z,H)}function _t(Z,H,$){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return H=Bu(""+H,Z.mode,$),H.return=Z,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case M:return $=bl(H.type,H.key,H.props,null,Z.mode,$),So($,H),$.return=Z,$;case E:return H=Iu(H,Z.mode,$),H.return=Z,H;case G:return H=Ts(H),_t(Z,H,$)}if(pt(H)||et(H))return H=xs(H,Z.mode,$,null),H.return=Z,H;if(typeof H.then=="function")return _t(Z,Ll(H),$);if(H.$$typeof===D)return _t(Z,wl(Z,H),$);Nl(Z,H)}return null}function it(Z,H,$,mt){var Yt=H!==null?H.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return Yt!==null?null:b(Z,H,""+$,mt);if(typeof $=="object"&&$!==null){switch($.$$typeof){case M:return $.key===Yt?B(Z,H,$,mt):null;case E:return $.key===Yt?tt(Z,H,$,mt):null;case G:return $=Ts($),it(Z,H,$,mt)}if(pt($)||et($))return Yt!==null?null:ft(Z,H,$,mt,null);if(typeof $.then=="function")return it(Z,H,Ll($),mt);if($.$$typeof===D)return it(Z,H,wl(Z,$),mt);Nl(Z,$)}return null}function lt(Z,H,$,mt,Yt){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return Z=Z.get($)||null,b(H,Z,""+mt,Yt);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case M:return Z=Z.get(mt.key===null?$:mt.key)||null,B(H,Z,mt,Yt);case E:return Z=Z.get(mt.key===null?$:mt.key)||null,tt(H,Z,mt,Yt);case G:return mt=Ts(mt),lt(Z,H,$,mt,Yt)}if(pt(mt)||et(mt))return Z=Z.get($)||null,ft(H,Z,mt,Yt,null);if(typeof mt.then=="function")return lt(Z,H,$,Ll(mt),Yt);if(mt.$$typeof===D)return lt(Z,H,$,wl(H,mt),Yt);Nl(H,mt)}return null}function Ft(Z,H,$,mt){for(var Yt=null,De=null,qt=H,le=H=0,ye=null;qt!==null&&le<$.length;le++){qt.index>le?(ye=qt,qt=null):ye=qt.sibling;var Ue=it(Z,qt,$[le],mt);if(Ue===null){qt===null&&(qt=ye);break}e&&qt&&Ue.alternate===null&&i(Z,qt),H=d(Ue,H,le),De===null?Yt=Ue:De.sibling=Ue,De=Ue,qt=ye}if(le===$.length)return s(Z,qt),Ee&&ta(Z,le),Yt;if(qt===null){for(;le<$.length;le++)qt=_t(Z,$[le],mt),qt!==null&&(H=d(qt,H,le),De===null?Yt=qt:De.sibling=qt,De=qt);return Ee&&ta(Z,le),Yt}for(qt=o(qt);le<$.length;le++)ye=lt(qt,Z,le,$[le],mt),ye!==null&&(e&&ye.alternate!==null&&qt.delete(ye.key===null?le:ye.key),H=d(ye,H,le),De===null?Yt=ye:De.sibling=ye,De=ye);return e&&qt.forEach(function(Qa){return i(Z,Qa)}),Ee&&ta(Z,le),Yt}function Jt(Z,H,$,mt){if($==null)throw Error(a(151));for(var Yt=null,De=null,qt=H,le=H=0,ye=null,Ue=$.next();qt!==null&&!Ue.done;le++,Ue=$.next()){qt.index>le?(ye=qt,qt=null):ye=qt.sibling;var Qa=it(Z,qt,Ue.value,mt);if(Qa===null){qt===null&&(qt=ye);break}e&&qt&&Qa.alternate===null&&i(Z,qt),H=d(Qa,H,le),De===null?Yt=Qa:De.sibling=Qa,De=Qa,qt=ye}if(Ue.done)return s(Z,qt),Ee&&ta(Z,le),Yt;if(qt===null){for(;!Ue.done;le++,Ue=$.next())Ue=_t(Z,Ue.value,mt),Ue!==null&&(H=d(Ue,H,le),De===null?Yt=Ue:De.sibling=Ue,De=Ue);return Ee&&ta(Z,le),Yt}for(qt=o(qt);!Ue.done;le++,Ue=$.next())Ue=lt(qt,Z,le,Ue.value,mt),Ue!==null&&(e&&Ue.alternate!==null&&qt.delete(Ue.key===null?le:Ue.key),H=d(Ue,H,le),De===null?Yt=Ue:De.sibling=Ue,De=Ue);return e&&qt.forEach(function(LS){return i(Z,LS)}),Ee&&ta(Z,le),Yt}function Xe(Z,H,$,mt){if(typeof $=="object"&&$!==null&&$.type===T&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case M:t:{for(var Yt=$.key;H!==null;){if(H.key===Yt){if(Yt=$.type,Yt===T){if(H.tag===7){s(Z,H.sibling),mt=u(H,$.props.children),mt.return=Z,Z=mt;break t}}else if(H.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===G&&Ts(Yt)===H.type){s(Z,H.sibling),mt=u(H,$.props),So(mt,$),mt.return=Z,Z=mt;break t}s(Z,H);break}else i(Z,H);H=H.sibling}$.type===T?(mt=xs($.props.children,Z.mode,mt,$.key),mt.return=Z,Z=mt):(mt=bl($.type,$.key,$.props,null,Z.mode,mt),So(mt,$),mt.return=Z,Z=mt)}return y(Z);case E:t:{for(Yt=$.key;H!==null;){if(H.key===Yt)if(H.tag===4&&H.stateNode.containerInfo===$.containerInfo&&H.stateNode.implementation===$.implementation){s(Z,H.sibling),mt=u(H,$.children||[]),mt.return=Z,Z=mt;break t}else{s(Z,H);break}else i(Z,H);H=H.sibling}mt=Iu($,Z.mode,mt),mt.return=Z,Z=mt}return y(Z);case G:return $=Ts($),Xe(Z,H,$,mt)}if(pt($))return Ft(Z,H,$,mt);if(et($)){if(Yt=et($),typeof Yt!="function")throw Error(a(150));return $=Yt.call($),Jt(Z,H,$,mt)}if(typeof $.then=="function")return Xe(Z,H,Ll($),mt);if($.$$typeof===D)return Xe(Z,H,wl(Z,$),mt);Nl(Z,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,H!==null&&H.tag===6?(s(Z,H.sibling),mt=u(H,$),mt.return=Z,Z=mt):(s(Z,H),mt=Bu($,Z.mode,mt),mt.return=Z,Z=mt),y(Z)):s(Z,H)}return function(Z,H,$,mt){try{yo=0;var Yt=Xe(Z,H,$,mt);return or=null,Yt}catch(qt){if(qt===rr||qt===Dl)throw qt;var De=ai(29,qt,null,Z.mode);return De.lanes=mt,De.return=Z,De}finally{}}}var As=gm(!0),_m=gm(!1),Oa=!1;function Ku(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Qu(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Pa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function za(e,i,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=Tl(e),tm(e,null,s),i}return El(e,o,i,s),Tl(e)}function Mo(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,io(e,s)}}function Ju(e,i){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var u=null,d=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};d===null?u=d=y:d=d.next=y,s=s.next}while(s!==null);d===null?u=d=i:d=d.next=i}else u=d=i;s={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var $u=!1;function Eo(){if($u){var e=sr;if(e!==null)throw e}}function To(e,i,s,o){$u=!1;var u=e.updateQueue;Oa=!1;var d=u.firstBaseUpdate,y=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var B=b,tt=B.next;B.next=null,y===null?d=tt:y.next=tt,y=B;var ft=e.alternate;ft!==null&&(ft=ft.updateQueue,b=ft.lastBaseUpdate,b!==y&&(b===null?ft.firstBaseUpdate=tt:b.next=tt,ft.lastBaseUpdate=B))}if(d!==null){var _t=u.baseState;y=0,ft=tt=B=null,b=d;do{var it=b.lane&-536870913,lt=it!==b.lane;if(lt?(xe&it)===it:(o&it)===it){it!==0&&it===ar&&($u=!0),ft!==null&&(ft=ft.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Ft=e,Jt=b;it=i;var Xe=s;switch(Jt.tag){case 1:if(Ft=Jt.payload,typeof Ft=="function"){_t=Ft.call(Xe,_t,it);break t}_t=Ft;break t;case 3:Ft.flags=Ft.flags&-65537|128;case 0:if(Ft=Jt.payload,it=typeof Ft=="function"?Ft.call(Xe,_t,it):Ft,it==null)break t;_t=_({},_t,it);break t;case 2:Oa=!0}}it=b.callback,it!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[it]:lt.push(it))}else lt={lane:it,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ft===null?(tt=ft=lt,B=_t):ft=ft.next=lt,y|=it;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;lt=b,b=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);ft===null&&(B=_t),u.baseState=B,u.firstBaseUpdate=tt,u.lastBaseUpdate=ft,d===null&&(u.shared.lanes=0),Ha|=y,e.lanes=y,e.memoizedState=_t}}function vm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function xm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)vm(s[e],i)}var lr=O(null),Ol=O(0);function ym(e,i){e=fa,yt(Ol,e),yt(lr,i),fa=e|i.baseLanes}function tf(){yt(Ol,fa),yt(lr,lr.current)}function ef(){fa=Ol.current,nt(lr),nt(Ol)}var si=O(null),yi=null;function Ba(e){var i=e.alternate;yt(rn,rn.current&1),yt(si,e),yi===null&&(i===null||lr.current!==null||i.memoizedState!==null)&&(yi=e)}function nf(e){yt(rn,rn.current),yt(si,e),yi===null&&(yi=e)}function Sm(e){e.tag===22?(yt(rn,rn.current),yt(si,e),yi===null&&(yi=e)):Ia()}function Ia(){yt(rn,rn.current),yt(si,si.current)}function ri(e){nt(si),yi===e&&(yi=null),nt(rn)}var rn=O(0);function Pl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||ch(s)||uh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ia=0,oe=null,Ve=null,fn=null,zl=!1,cr=!1,Rs=!1,Bl=0,bo=0,ur=null,My=0;function nn(){throw Error(a(321))}function af(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!ii(e[s],i[s]))return!1;return!0}function sf(e,i,s,o,u,d){return ia=d,oe=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,z.H=e===null||e.memoizedState===null?a0:yf,Rs=!1,d=s(o,u),Rs=!1,cr&&(d=Em(i,s,o,u)),Mm(e),d}function Mm(e){z.H=wo;var i=Ve!==null&&Ve.next!==null;if(ia=0,fn=Ve=oe=null,zl=!1,bo=0,ur=null,i)throw Error(a(300));e===null||hn||(e=e.dependencies,e!==null&&Rl(e)&&(hn=!0))}function Em(e,i,s,o){oe=e;var u=0;do{if(cr&&(ur=null),bo=0,cr=!1,25<=u)throw Error(a(301));if(u+=1,fn=Ve=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}z.H=s0,d=i(s,o)}while(cr);return d}function Ey(){var e=z.H,i=e.useState()[0];return i=typeof i.then=="function"?Ao(i):i,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(oe.flags|=1024),i}function rf(){var e=Bl!==0;return Bl=0,e}function of(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function lf(e){if(zl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}zl=!1}ia=0,fn=Ve=oe=null,cr=!1,bo=Bl=0,ur=null}function Hn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?oe.memoizedState=fn=e:fn=fn.next=e,fn}function on(){if(Ve===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var i=fn===null?oe.memoizedState:fn.next;if(i!==null)fn=i,Ve=e;else{if(e===null)throw oe.alternate===null?Error(a(467)):Error(a(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},fn===null?oe.memoizedState=fn=e:fn=fn.next=e}return fn}function Il(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ao(e){var i=bo;return bo+=1,ur===null&&(ur=[]),e=dm(ur,e,i),i=oe,(fn===null?i.memoizedState:fn.next)===null&&(i=i.alternate,z.H=i===null||i.memoizedState===null?a0:yf),e}function Fl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ao(e);if(e.$$typeof===D)return Un(e)}throw Error(a(438,String(e)))}function cf(e){var i=null,s=oe.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var o=oe.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Il(),oe.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),o=0;o<e;o++)s[o]=R;return i.index++,s}function aa(e,i){return typeof i=="function"?i(e):i}function Gl(e){var i=on();return uf(i,Ve,e)}function uf(e,i,s){var o=e.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=s;var u=e.baseQueue,d=o.pending;if(d!==null){if(u!==null){var y=u.next;u.next=d.next,d.next=y}i.baseQueue=u=d,o.pending=null}if(d=e.baseState,u===null)e.memoizedState=d;else{i=u.next;var b=y=null,B=null,tt=i,ft=!1;do{var _t=tt.lane&-536870913;if(_t!==tt.lane?(xe&_t)===_t:(ia&_t)===_t){var it=tt.revertLane;if(it===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),_t===ar&&(ft=!0);else if((ia&it)===it){tt=tt.next,it===ar&&(ft=!0);continue}else _t={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(b=B=_t,y=d):B=B.next=_t,oe.lanes|=it,Ha|=it;_t=tt.action,Rs&&s(d,_t),d=tt.hasEagerState?tt.eagerState:s(d,_t)}else it={lane:_t,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(b=B=it,y=d):B=B.next=it,oe.lanes|=_t,Ha|=_t;tt=tt.next}while(tt!==null&&tt!==i);if(B===null?y=d:B.next=b,!ii(d,e.memoizedState)&&(hn=!0,ft&&(s=sr,s!==null)))throw s;e.memoizedState=d,e.baseState=y,e.baseQueue=B,o.lastRenderedState=d}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function ff(e){var i=on(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var o=s.dispatch,u=s.pending,d=i.memoizedState;if(u!==null){s.pending=null;var y=u=u.next;do d=e(d,y.action),y=y.next;while(y!==u);ii(d,i.memoizedState)||(hn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),s.lastRenderedState=d}return[d,o]}function Tm(e,i,s){var o=oe,u=on(),d=Ee;if(d){if(s===void 0)throw Error(a(407));s=s()}else s=i();var y=!ii((Ve||u).memoizedState,s);if(y&&(u.memoizedState=s,hn=!0),u=u.queue,pf(Rm.bind(null,o,u,e),[e]),u.getSnapshot!==i||y||fn!==null&&fn.memoizedState.tag&1){if(o.flags|=2048,fr(9,{destroy:void 0},Am.bind(null,o,u,s,i),null),qe===null)throw Error(a(349));d||(ia&127)!==0||bm(o,i,s)}return s}function bm(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=oe.updateQueue,i===null?(i=Il(),oe.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Am(e,i,s,o){i.value=s,i.getSnapshot=o,wm(i)&&Cm(e)}function Rm(e,i,s){return s(function(){wm(i)&&Cm(e)})}function wm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!ii(e,s)}catch{return!0}}function Cm(e){var i=vs(e,2);i!==null&&Jn(i,e,2)}function hf(e){var i=Hn();if(typeof e=="function"){var s=e;if(e=s(),Rs){Pt(!0);try{s()}finally{Pt(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:e},i}function Dm(e,i,s,o){return e.baseState=s,uf(e,Ve,typeof o=="function"?o:aa)}function Ty(e,i,s,o,u){if(kl(e))throw Error(a(485));if(e=i.action,e!==null){var d={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};z.T!==null?s(!0):d.isTransition=!1,o(d),s=i.pending,s===null?(d.next=i.pending=d,Um(i,d)):(d.next=s.next,i.pending=s.next=d)}}function Um(e,i){var s=i.action,o=i.payload,u=e.state;if(i.isTransition){var d=z.T,y={};z.T=y;try{var b=s(u,o),B=z.S;B!==null&&B(y,b),Lm(e,i,b)}catch(tt){df(e,i,tt)}finally{d!==null&&y.types!==null&&(d.types=y.types),z.T=d}}else try{d=s(u,o),Lm(e,i,d)}catch(tt){df(e,i,tt)}}function Lm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){Nm(e,i,o)},function(o){return df(e,i,o)}):Nm(e,i,s)}function Nm(e,i,s){i.status="fulfilled",i.value=s,Om(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Um(e,s)))}function df(e,i,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=s,Om(i),i=i.next;while(i!==o)}e.action=null}function Om(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Pm(e,i){return i}function zm(e,i){if(Ee){var s=qe.formState;if(s!==null){t:{var o=oe;if(Ee){if(Ze){e:{for(var u=Ze,d=xi;u.nodeType!==8;){if(!d){u=null;break e}if(u=Si(u.nextSibling),u===null){u=null;break e}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){Ze=Si(u.nextSibling),o=u.data==="F!";break t}}La(o)}o=!1}o&&(i=s[0])}}return s=Hn(),s.memoizedState=s.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pm,lastRenderedState:i},s.queue=o,s=e0.bind(null,oe,o),o.dispatch=s,o=hf(!1),d=xf.bind(null,oe,!1,o.queue),o=Hn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,s=Ty.bind(null,oe,u,d,s),u.dispatch=s,o.memoizedState=e,[i,s,!1]}function Bm(e){var i=on();return Im(i,Ve,e)}function Im(e,i,s){if(i=uf(e,i,Pm)[0],e=Gl(aa)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=Ao(i)}catch(y){throw y===rr?Dl:y}else o=i;i=on();var u=i.queue,d=u.dispatch;return s!==i.memoizedState&&(oe.flags|=2048,fr(9,{destroy:void 0},by.bind(null,u,s),null)),[o,d,e]}function by(e,i){e.action=i}function Fm(e){var i=on(),s=Ve;if(s!==null)return Im(i,s,e);on(),i=i.memoizedState,s=on();var o=s.queue.dispatch;return s.memoizedState=e,[i,o,!1]}function fr(e,i,s,o){return e={tag:e,create:s,deps:o,inst:i,next:null},i=oe.updateQueue,i===null&&(i=Il(),oe.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,i.lastEffect=e),e}function Gm(){return on().memoizedState}function Hl(e,i,s,o){var u=Hn();oe.flags|=e,u.memoizedState=fr(1|i,{destroy:void 0},s,o===void 0?null:o)}function Vl(e,i,s,o){var u=on();o=o===void 0?null:o;var d=u.memoizedState.inst;Ve!==null&&o!==null&&af(o,Ve.memoizedState.deps)?u.memoizedState=fr(i,d,s,o):(oe.flags|=e,u.memoizedState=fr(1|i,d,s,o))}function Hm(e,i){Hl(8390656,8,e,i)}function pf(e,i){Vl(2048,8,e,i)}function Ay(e){oe.flags|=4;var i=oe.updateQueue;if(i===null)i=Il(),oe.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function Vm(e){var i=on().memoizedState;return Ay({ref:i,nextImpl:e}),function(){if((Le&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function km(e,i){return Vl(4,2,e,i)}function Xm(e,i){return Vl(4,4,e,i)}function qm(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function Wm(e,i,s){s=s!=null?s.concat([e]):null,Vl(4,4,qm.bind(null,i,e),s)}function mf(){}function jm(e,i){var s=on();i=i===void 0?null:i;var o=s.memoizedState;return i!==null&&af(i,o[1])?o[0]:(s.memoizedState=[e,i],e)}function Ym(e,i){var s=on();i=i===void 0?null:i;var o=s.memoizedState;if(i!==null&&af(i,o[1]))return o[0];if(o=e(),Rs){Pt(!0);try{e()}finally{Pt(!1)}}return s.memoizedState=[o,i],o}function gf(e,i,s){return s===void 0||(ia&1073741824)!==0&&(xe&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=Z0(),oe.lanes|=e,Ha|=e,s)}function Zm(e,i,s,o){return ii(s,i)?s:lr.current!==null?(e=gf(e,s,o),ii(e,i)||(hn=!0),e):(ia&42)===0||(ia&1073741824)!==0&&(xe&261930)===0?(hn=!0,e.memoizedState=s):(e=Z0(),oe.lanes|=e,Ha|=e,i)}function Km(e,i,s,o,u){var d=V.p;V.p=d!==0&&8>d?d:8;var y=z.T,b={};z.T=b,xf(e,!1,i,s);try{var B=u(),tt=z.S;if(tt!==null&&tt(b,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ft=Sy(B,o);Ro(e,i,ft,ci(e))}else Ro(e,i,o,ci(e))}catch(_t){Ro(e,i,{then:function(){},status:"rejected",reason:_t},ci())}finally{V.p=d,y!==null&&b.types!==null&&(y.types=b.types),z.T=y}}function Ry(){}function _f(e,i,s,o){if(e.tag!==5)throw Error(a(476));var u=Qm(e).queue;Km(e,u,i,k,s===null?Ry:function(){return Jm(e),s(o)})}function Qm(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:k,baseState:k,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:k},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function Jm(e){var i=Qm(e);i.next===null&&(i=e.alternate.memoizedState),Ro(e,i.next.queue,{},ci())}function vf(){return Un(Xo)}function $m(){return on().memoizedState}function t0(){return on().memoizedState}function wy(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=ci();e=Pa(s);var o=za(i,e,s);o!==null&&(Jn(o,i,s),Mo(o,i,s)),i={cache:Wu()},e.payload=i;return}i=i.return}}function Cy(e,i,s){var o=ci();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},kl(e)?n0(i,s):(s=Pu(e,i,s,o),s!==null&&(Jn(s,e,o),i0(s,i,o)))}function e0(e,i,s){var o=ci();Ro(e,i,s,o)}function Ro(e,i,s,o){var u={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(kl(e))n0(i,u);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var y=i.lastRenderedState,b=d(y,s);if(u.hasEagerState=!0,u.eagerState=b,ii(b,y))return El(e,i,u,0),qe===null&&Ml(),!1}catch{}finally{}if(s=Pu(e,i,u,o),s!==null)return Jn(s,e,o),i0(s,i,o),!0}return!1}function xf(e,i,s,o){if(o={lane:2,revertLane:Qf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},kl(e)){if(i)throw Error(a(479))}else i=Pu(e,s,o,2),i!==null&&Jn(i,e,2)}function kl(e){var i=e.alternate;return e===oe||i!==null&&i===oe}function n0(e,i){cr=zl=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function i0(e,i,s){if((s&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,io(e,s)}}var wo={readContext:Un,use:Fl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};wo.useEffectEvent=nn;var a0={readContext:Un,use:Fl,useCallback:function(e,i){return Hn().memoizedState=[e,i===void 0?null:i],e},useContext:Un,useEffect:Hm,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,Hl(4194308,4,qm.bind(null,i,e),s)},useLayoutEffect:function(e,i){return Hl(4194308,4,e,i)},useInsertionEffect:function(e,i){Hl(4,2,e,i)},useMemo:function(e,i){var s=Hn();i=i===void 0?null:i;var o=e();if(Rs){Pt(!0);try{e()}finally{Pt(!1)}}return s.memoizedState=[o,i],o},useReducer:function(e,i,s){var o=Hn();if(s!==void 0){var u=s(i);if(Rs){Pt(!0);try{s(i)}finally{Pt(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Cy.bind(null,oe,e),[o.memoizedState,e]},useRef:function(e){var i=Hn();return e={current:e},i.memoizedState=e},useState:function(e){e=hf(e);var i=e.queue,s=e0.bind(null,oe,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:mf,useDeferredValue:function(e,i){var s=Hn();return gf(s,e,i)},useTransition:function(){var e=hf(!1);return e=Km.bind(null,oe,e.queue,!0,!1),Hn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var o=oe,u=Hn();if(Ee){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),qe===null)throw Error(a(349));(xe&127)!==0||bm(o,i,s)}u.memoizedState=s;var d={value:s,getSnapshot:i};return u.queue=d,Hm(Rm.bind(null,o,d,e),[e]),o.flags|=2048,fr(9,{destroy:void 0},Am.bind(null,o,d,s,i),null),s},useId:function(){var e=Hn(),i=qe.identifierPrefix;if(Ee){var s=ki,o=Vi;s=(o&~(1<<32-te(o)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Bl++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=My++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:vf,useFormState:zm,useActionState:zm,useOptimistic:function(e){var i=Hn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=xf.bind(null,oe,!0,s),s.dispatch=i,[e,i]},useMemoCache:cf,useCacheRefresh:function(){return Hn().memoizedState=wy.bind(null,oe)},useEffectEvent:function(e){var i=Hn(),s={impl:e};return i.memoizedState=s,function(){if((Le&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},yf={readContext:Un,use:Fl,useCallback:jm,useContext:Un,useEffect:pf,useImperativeHandle:Wm,useInsertionEffect:km,useLayoutEffect:Xm,useMemo:Ym,useReducer:Gl,useRef:Gm,useState:function(){return Gl(aa)},useDebugValue:mf,useDeferredValue:function(e,i){var s=on();return Zm(s,Ve.memoizedState,e,i)},useTransition:function(){var e=Gl(aa)[0],i=on().memoizedState;return[typeof e=="boolean"?e:Ao(e),i]},useSyncExternalStore:Tm,useId:$m,useHostTransitionStatus:vf,useFormState:Bm,useActionState:Bm,useOptimistic:function(e,i){var s=on();return Dm(s,Ve,e,i)},useMemoCache:cf,useCacheRefresh:t0};yf.useEffectEvent=Vm;var s0={readContext:Un,use:Fl,useCallback:jm,useContext:Un,useEffect:pf,useImperativeHandle:Wm,useInsertionEffect:km,useLayoutEffect:Xm,useMemo:Ym,useReducer:ff,useRef:Gm,useState:function(){return ff(aa)},useDebugValue:mf,useDeferredValue:function(e,i){var s=on();return Ve===null?gf(s,e,i):Zm(s,Ve.memoizedState,e,i)},useTransition:function(){var e=ff(aa)[0],i=on().memoizedState;return[typeof e=="boolean"?e:Ao(e),i]},useSyncExternalStore:Tm,useId:$m,useHostTransitionStatus:vf,useFormState:Fm,useActionState:Fm,useOptimistic:function(e,i){var s=on();return Ve!==null?Dm(s,Ve,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:cf,useCacheRefresh:t0};s0.useEffectEvent=Vm;function Sf(e,i,s,o){i=e.memoizedState,s=s(o,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Mf={enqueueSetState:function(e,i,s){e=e._reactInternals;var o=ci(),u=Pa(o);u.payload=i,s!=null&&(u.callback=s),i=za(e,u,o),i!==null&&(Jn(i,e,o),Mo(i,e,o))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var o=ci(),u=Pa(o);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=za(e,u,o),i!==null&&(Jn(i,e,o),Mo(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=ci(),o=Pa(s);o.tag=2,i!=null&&(o.callback=i),i=za(e,o,s),i!==null&&(Jn(i,e,s),Mo(i,e,s))}};function r0(e,i,s,o,u,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,d,y):i.prototype&&i.prototype.isPureReactComponent?!po(s,o)||!po(u,d):!0}function o0(e,i,s,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,o),i.state!==e&&Mf.enqueueReplaceState(i,i.state,null)}function ws(e,i){var s=i;if("ref"in i){s={};for(var o in i)o!=="ref"&&(s[o]=i[o])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}function l0(e){Sl(e)}function c0(e){console.error(e)}function u0(e){Sl(e)}function Xl(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function f0(e,i,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Ef(e,i,s){return s=Pa(s),s.tag=3,s.payload={element:null},s.callback=function(){Xl(e,i)},s}function h0(e){return e=Pa(e),e.tag=3,e}function d0(e,i,s,o){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;e.payload=function(){return u(d)},e.callback=function(){f0(i,s,o)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){f0(i,s,o),typeof u!="function"&&(Va===null?Va=new Set([this]):Va.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function Dy(e,i,s,o,u){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=s.alternate,i!==null&&ir(i,s,u,!0),s=si.current,s!==null){switch(s.tag){case 31:case 13:return yi===null?nc():s.alternate===null&&an===0&&(an=3),s.flags&=-257,s.flags|=65536,s.lanes=u,o===Ul?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([o]):i.add(o),Yf(e,o,u)),!1;case 22:return s.flags|=65536,o===Ul?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([o]):s.add(o)),Yf(e,o,u)),!1}throw Error(a(435,s.tag))}return Yf(e,o,u),nc(),!1}if(Ee)return i=si.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==Hu&&(e=Error(a(422),{cause:o}),_o(gi(e,s)))):(o!==Hu&&(i=Error(a(423),{cause:o}),_o(gi(i,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=gi(o,s),u=Ef(e.stateNode,o,u),Ju(e,u),an!==4&&(an=2)),!1;var d=Error(a(520),{cause:o});if(d=gi(d,s),zo===null?zo=[d]:zo.push(d),an!==4&&(an=2),i===null)return!0;o=gi(o,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=Ef(s.stateNode,o,e),Ju(s,e),!1;case 1:if(i=s.type,d=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Va===null||!Va.has(d))))return s.flags|=65536,u&=-u,s.lanes|=u,u=h0(u),d0(u,e,s,o),Ju(s,u),!1}s=s.return}while(s!==null);return!1}var Tf=Error(a(461)),hn=!1;function Ln(e,i,s,o){i.child=e===null?_m(i,null,s,o):As(i,e.child,s,o)}function p0(e,i,s,o,u){s=s.render;var d=i.ref;if("ref"in o){var y={};for(var b in o)b!=="ref"&&(y[b]=o[b])}else y=o;return Ms(i),o=sf(e,i,s,y,d,u),b=rf(),e!==null&&!hn?(of(e,i,u),sa(e,i,u)):(Ee&&b&&Fu(i),i.flags|=1,Ln(e,i,o,u),i.child)}function m0(e,i,s,o,u){if(e===null){var d=s.type;return typeof d=="function"&&!zu(d)&&d.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=d,g0(e,i,d,o,u)):(e=bl(s.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!Lf(e,u)){var y=d.memoizedProps;if(s=s.compare,s=s!==null?s:po,s(y,o)&&e.ref===i.ref)return sa(e,i,u)}return i.flags|=1,e=$i(d,o),e.ref=i.ref,e.return=i,i.child=e}function g0(e,i,s,o,u){if(e!==null){var d=e.memoizedProps;if(po(d,o)&&e.ref===i.ref)if(hn=!1,i.pendingProps=o=d,Lf(e,u))(e.flags&131072)!==0&&(hn=!0);else return i.lanes=e.lanes,sa(e,i,u)}return bf(e,i,s,o,u)}function _0(e,i,s,o){var u=o.children,d=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|s:s,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,i.child=null;return v0(e,i,d,s,o)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Cl(i,d!==null?d.cachePool:null),d!==null?ym(i,d):tf(),Sm(i);else return o=i.lanes=536870912,v0(e,i,d!==null?d.baseLanes|s:s,s,o)}else d!==null?(Cl(i,d.cachePool),ym(i,d),Ia(),i.memoizedState=null):(e!==null&&Cl(i,null),tf(),Ia());return Ln(e,i,u,s),i.child}function Co(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function v0(e,i,s,o,u){var d=Yu();return d=d===null?null:{parent:un._currentValue,pool:d},i.memoizedState={baseLanes:s,cachePool:d},e!==null&&Cl(i,null),tf(),Sm(i),e!==null&&ir(e,i,o,!0),i.childLanes=u,null}function ql(e,i){return i=jl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function x0(e,i,s){return As(i,e.child,null,s),e=ql(i,i.pendingProps),e.flags|=2,ri(i),i.memoizedState=null,e}function Uy(e,i,s){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ee){if(o.mode==="hidden")return e=ql(i,o),i.lanes=536870912,Co(null,e);if(nf(i),(e=Ze)?(e=Ug(e,xi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Da!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},s=nm(e),s.return=i,i.child=s,Dn=i,Ze=null)):e=null,e===null)throw La(i);return i.lanes=536870912,null}return ql(i,o)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(nf(i),u)if(i.flags&256)i.flags&=-257,i=x0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(hn||ir(e,i,s,!1),u=(s&e.childLanes)!==0,hn||u){if(o=qe,o!==null&&(y=Hi(o,s),y!==0&&y!==d.retryLane))throw d.retryLane=y,vs(e,y),Jn(o,e,y),Tf;nc(),i=x0(e,i,s)}else e=d.treeContext,Ze=Si(y.nextSibling),Dn=i,Ee=!0,Ua=null,xi=!1,e!==null&&sm(i,e),i=ql(i,o),i.flags|=4096;return i}return e=$i(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Wl(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function bf(e,i,s,o,u){return Ms(i),s=sf(e,i,s,o,void 0,u),o=rf(),e!==null&&!hn?(of(e,i,u),sa(e,i,u)):(Ee&&o&&Fu(i),i.flags|=1,Ln(e,i,s,u),i.child)}function y0(e,i,s,o,u,d){return Ms(i),i.updateQueue=null,s=Em(i,o,s,u),Mm(e),o=rf(),e!==null&&!hn?(of(e,i,d),sa(e,i,d)):(Ee&&o&&Fu(i),i.flags|=1,Ln(e,i,s,d),i.child)}function S0(e,i,s,o,u){if(Ms(i),i.stateNode===null){var d=$s,y=s.contextType;typeof y=="object"&&y!==null&&(d=Un(y)),d=new s(o,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Mf,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=o,d.state=i.memoizedState,d.refs={},Ku(i),y=s.contextType,d.context=typeof y=="object"&&y!==null?Un(y):$s,d.state=i.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(Sf(i,s,y,o),d.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Mf.enqueueReplaceState(d,d.state,null),To(i,o,d,u),Eo(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){d=i.stateNode;var b=i.memoizedProps,B=ws(s,b);d.props=B;var tt=d.context,ft=s.contextType;y=$s,typeof ft=="object"&&ft!==null&&(y=Un(ft));var _t=s.getDerivedStateFromProps;ft=typeof _t=="function"||typeof d.getSnapshotBeforeUpdate=="function",b=i.pendingProps!==b,ft||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(b||tt!==y)&&o0(i,d,o,y),Oa=!1;var it=i.memoizedState;d.state=it,To(i,o,d,u),Eo(),tt=i.memoizedState,b||it!==tt||Oa?(typeof _t=="function"&&(Sf(i,s,_t,o),tt=i.memoizedState),(B=Oa||r0(i,s,B,o,it,tt,y))?(ft||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=tt),d.props=o,d.state=tt,d.context=y,o=B):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{d=i.stateNode,Qu(e,i),y=i.memoizedProps,ft=ws(s,y),d.props=ft,_t=i.pendingProps,it=d.context,tt=s.contextType,B=$s,typeof tt=="object"&&tt!==null&&(B=Un(tt)),b=s.getDerivedStateFromProps,(tt=typeof b=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==_t||it!==B)&&o0(i,d,o,B),Oa=!1,it=i.memoizedState,d.state=it,To(i,o,d,u),Eo();var lt=i.memoizedState;y!==_t||it!==lt||Oa||e!==null&&e.dependencies!==null&&Rl(e.dependencies)?(typeof b=="function"&&(Sf(i,s,b,o),lt=i.memoizedState),(ft=Oa||r0(i,s,ft,o,it,lt,B)||e!==null&&e.dependencies!==null&&Rl(e.dependencies))?(tt||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,lt,B),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,lt,B)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=lt),d.props=o,d.state=lt,d.context=B,o=ft):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),o=!1)}return d=o,Wl(e,i),o=(i.flags&128)!==0,d||o?(d=i.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&o?(i.child=As(i,e.child,null,u),i.child=As(i,null,s,u)):Ln(e,i,s,u),i.memoizedState=d.state,e=i.child):e=sa(e,i,u),e}function M0(e,i,s,o){return ys(),i.flags|=256,Ln(e,i,s,o),i.child}var Af={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Rf(e){return{baseLanes:e,cachePool:fm()}}function wf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=li),e}function E0(e,i,s){var o=i.pendingProps,u=!1,d=(i.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(rn.current&2)!==0),y&&(u=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ee){if(u?Ba(i):Ia(),(e=Ze)?(e=Ug(e,xi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Da!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},s=nm(e),s.return=i,i.child=s,Dn=i,Ze=null)):e=null,e===null)throw La(i);return uh(e)?i.lanes=32:i.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Ia(),u=i.mode,b=jl({mode:"hidden",children:b},u),o=xs(o,u,s,null),b.return=i,o.return=i,b.sibling=o,i.child=b,o=i.child,o.memoizedState=Rf(s),o.childLanes=wf(e,y,s),i.memoizedState=Af,Co(null,o)):(Ba(i),Cf(i,b))}var B=e.memoizedState;if(B!==null&&(b=B.dehydrated,b!==null)){if(d)i.flags&256?(Ba(i),i.flags&=-257,i=Df(e,i,s)):i.memoizedState!==null?(Ia(),i.child=e.child,i.flags|=128,i=null):(Ia(),b=o.fallback,u=i.mode,o=jl({mode:"visible",children:o.children},u),b=xs(b,u,s,null),b.flags|=2,o.return=i,b.return=i,o.sibling=b,i.child=o,As(i,e.child,null,s),o=i.child,o.memoizedState=Rf(s),o.childLanes=wf(e,y,s),i.memoizedState=Af,i=Co(null,o));else if(Ba(i),uh(b)){if(y=b.nextSibling&&b.nextSibling.dataset,y)var tt=y.dgst;y=tt,o=Error(a(419)),o.stack="",o.digest=y,_o({value:o,source:null,stack:null}),i=Df(e,i,s)}else if(hn||ir(e,i,s,!1),y=(s&e.childLanes)!==0,hn||y){if(y=qe,y!==null&&(o=Hi(y,s),o!==0&&o!==B.retryLane))throw B.retryLane=o,vs(e,o),Jn(y,e,o),Tf;ch(b)||nc(),i=Df(e,i,s)}else ch(b)?(i.flags|=192,i.child=e.child,i=null):(e=B.treeContext,Ze=Si(b.nextSibling),Dn=i,Ee=!0,Ua=null,xi=!1,e!==null&&sm(i,e),i=Cf(i,o.children),i.flags|=4096);return i}return u?(Ia(),b=o.fallback,u=i.mode,B=e.child,tt=B.sibling,o=$i(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,tt!==null?b=$i(tt,b):(b=xs(b,u,s,null),b.flags|=2),b.return=i,o.return=i,o.sibling=b,i.child=o,Co(null,o),o=i.child,b=e.child.memoizedState,b===null?b=Rf(s):(u=b.cachePool,u!==null?(B=un._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=fm(),b={baseLanes:b.baseLanes|s,cachePool:u}),o.memoizedState=b,o.childLanes=wf(e,y,s),i.memoizedState=Af,Co(e.child,o)):(Ba(i),s=e.child,e=s.sibling,s=$i(s,{mode:"visible",children:o.children}),s.return=i,s.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=s,i.memoizedState=null,s)}function Cf(e,i){return i=jl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function jl(e,i){return e=ai(22,e,null,i),e.lanes=0,e}function Df(e,i,s){return As(i,e.child,null,s),e=Cf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function T0(e,i,s){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),Xu(e.return,i,s)}function Uf(e,i,s,o,u,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:u,treeForkCount:d}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=s,y.tailMode=u,y.treeForkCount=d)}function b0(e,i,s){var o=i.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var y=rn.current,b=(y&2)!==0;if(b?(y=y&1|2,i.flags|=128):y&=1,yt(rn,y),Ln(e,i,o,s),o=Ee?go:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&T0(e,s,i);else if(e.tag===19)T0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(s=i.child,u=null;s!==null;)e=s.alternate,e!==null&&Pl(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),Uf(i,!1,u,s,d,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&Pl(e)===null){i.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}Uf(i,!0,s,null,d,o);break;case"together":Uf(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function sa(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),Ha|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(ir(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=$i(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=$i(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Lf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Rl(e)))}function Ly(e,i,s){switch(i.tag){case 3:Vt(i,i.stateNode.containerInfo),Na(i,un,e.memoizedState.cache),ys();break;case 27:case 5:ae(i);break;case 4:Vt(i,i.stateNode.containerInfo);break;case 10:Na(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,nf(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ba(i),i.flags|=128,null):(s&i.child.childLanes)!==0?E0(e,i,s):(Ba(i),e=sa(e,i,s),e!==null?e.sibling:null);Ba(i);break;case 19:var u=(e.flags&128)!==0;if(o=(s&i.childLanes)!==0,o||(ir(e,i,s,!1),o=(s&i.childLanes)!==0),u){if(o)return b0(e,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),yt(rn,rn.current),o)break;return null;case 22:return i.lanes=0,_0(e,i,s,i.pendingProps);case 24:Na(i,un,e.memoizedState.cache)}return sa(e,i,s)}function A0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)hn=!0;else{if(!Lf(e,s)&&(i.flags&128)===0)return hn=!1,Ly(e,i,s);hn=(e.flags&131072)!==0}else hn=!1,Ee&&(i.flags&1048576)!==0&&am(i,go,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=Ts(i.elementType),i.type=e,typeof e=="function")zu(e)?(o=ws(e,o),i.tag=1,i=S0(null,i,e,o,s)):(i.tag=0,i=bf(null,i,e,o,s));else{if(e!=null){var u=e.$$typeof;if(u===w){i.tag=11,i=p0(null,i,e,o,s);break t}else if(u===P){i.tag=14,i=m0(null,i,e,o,s);break t}}throw i=ht(e)||e,Error(a(306,i,""))}}return i;case 0:return bf(e,i,i.type,i.pendingProps,s);case 1:return o=i.type,u=ws(o,i.pendingProps),S0(e,i,o,u,s);case 3:t:{if(Vt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));o=i.pendingProps;var d=i.memoizedState;u=d.element,Qu(e,i),To(i,o,null,s);var y=i.memoizedState;if(o=y.cache,Na(i,un,o),o!==d.cache&&qu(i,[un],s,!0),Eo(),o=y.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=M0(e,i,o,s);break t}else if(o!==u){u=gi(Error(a(424)),i),_o(u),i=M0(e,i,o,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ze=Si(e.firstChild),Dn=i,Ee=!0,Ua=null,xi=!0,s=_m(i,null,o,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(ys(),o===u){i=sa(e,i,s);break t}Ln(e,i,o,s)}i=i.child}return i;case 26:return Wl(e,i),e===null?(s=Bg(i.type,null,i.pendingProps,null))?i.memoizedState=s:Ee||(s=i.type,e=i.pendingProps,o=cc(Tt.current).createElement(s),o[en]=i,o[wn]=e,Nn(o,s,e),Ut(o),i.stateNode=o):i.memoizedState=Bg(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return ae(i),e===null&&Ee&&(o=i.stateNode=Og(i.type,i.pendingProps,Tt.current),Dn=i,xi=!0,u=Ze,Wa(i.type)?(fh=u,Ze=Si(o.firstChild)):Ze=u),Ln(e,i,i.pendingProps.children,s),Wl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ee&&((u=o=Ze)&&(o=lS(o,i.type,i.pendingProps,xi),o!==null?(i.stateNode=o,Dn=i,Ze=Si(o.firstChild),xi=!1,u=!0):u=!1),u||La(i)),ae(i),u=i.type,d=i.pendingProps,y=e!==null?e.memoizedProps:null,o=d.children,rh(u,d)?o=null:y!==null&&rh(u,y)&&(i.flags|=32),i.memoizedState!==null&&(u=sf(e,i,Ey,null,null,s),Xo._currentValue=u),Wl(e,i),Ln(e,i,o,s),i.child;case 6:return e===null&&Ee&&((e=s=Ze)&&(s=cS(s,i.pendingProps,xi),s!==null?(i.stateNode=s,Dn=i,Ze=null,e=!0):e=!1),e||La(i)),null;case 13:return E0(e,i,s);case 4:return Vt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=As(i,null,o,s):Ln(e,i,o,s),i.child;case 11:return p0(e,i,i.type,i.pendingProps,s);case 7:return Ln(e,i,i.pendingProps,s),i.child;case 8:return Ln(e,i,i.pendingProps.children,s),i.child;case 12:return Ln(e,i,i.pendingProps.children,s),i.child;case 10:return o=i.pendingProps,Na(i,i.type,o.value),Ln(e,i,o.children,s),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,Ms(i),u=Un(u),o=o(u),i.flags|=1,Ln(e,i,o,s),i.child;case 14:return m0(e,i,i.type,i.pendingProps,s);case 15:return g0(e,i,i.type,i.pendingProps,s);case 19:return b0(e,i,s);case 31:return Uy(e,i,s);case 22:return _0(e,i,s,i.pendingProps);case 24:return Ms(i),o=Un(un),e===null?(u=Yu(),u===null&&(u=qe,d=Wu(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=s),u=d),i.memoizedState={parent:o,cache:u},Ku(i),Na(i,un,u)):((e.lanes&s)!==0&&(Qu(e,i),To(i,null,null,s),Eo()),u=e.memoizedState,d=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Na(i,un,o)):(o=d.cache,Na(i,un,o),o!==u.cache&&qu(i,[un],s,!0))),Ln(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function ra(e){e.flags|=4}function Nf(e,i,s,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if($0())e.flags|=8192;else throw bs=Ul,Zu}else e.flags&=-16777217}function R0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Vg(i))if($0())e.flags|=8192;else throw bs=Ul,Zu}function Yl(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?_n():536870912,e.lanes|=i,mr|=i)}function Do(e,i){if(!Ee)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ke(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(i)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=s,i}function Ny(e,i,s){var o=i.pendingProps;switch(Gu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(i),null;case 1:return Ke(i),null;case 3:return s=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),na(un),Ht(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(nr(i)?ra(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Vu())),Ke(i),null;case 26:var u=i.type,d=i.memoizedState;return e===null?(ra(i),d!==null?(Ke(i),R0(i,d)):(Ke(i),Nf(i,u,null,o,s))):d?d!==e.memoizedState?(ra(i),Ke(i),R0(i,d)):(Ke(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&ra(i),Ke(i),Nf(i,u,e,o,s)),null;case 27:if(Fe(i),s=Tt.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return Ke(i),null}e=K.current,nr(i)?rm(i):(e=Og(u,o,s),i.stateNode=e,ra(i))}return Ke(i),null;case 5:if(Fe(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return Ke(i),null}if(d=K.current,nr(i))rm(i);else{var y=cc(Tt.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}d[en]=i,d[wn]=o;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=d;t:switch(Nn(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ra(i)}}return Ke(i),Nf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(a(166));if(e=Tt.current,nr(i)){if(e=i.stateNode,s=i.memoizedProps,o=null,u=Dn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[en]=i,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||Eg(e.nodeValue,s)),e||La(i,!0)}else e=cc(e).createTextNode(o),e[en]=i,i.stateNode=e}return Ke(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(o=nr(i),s!==null){if(e===null){if(!o)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[en]=i}else ys(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ke(i),e=!1}else s=Vu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(ri(i),i):(ri(i),null);if((i.flags&128)!==0)throw Error(a(558))}return Ke(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=nr(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[en]=i}else ys(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ke(i),u=!1}else u=Vu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(ri(i),i):(ri(i),null)}return ri(i),(i.flags&128)!==0?(i.lanes=s,i):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),Yl(i,i.updateQueue),Ke(i),null);case 4:return Ht(),e===null&&eh(i.stateNode.containerInfo),Ke(i),null;case 10:return na(i.type),Ke(i),null;case 19:if(nt(rn),o=i.memoizedState,o===null)return Ke(i),null;if(u=(i.flags&128)!==0,d=o.rendering,d===null)if(u)Do(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=Pl(e),d!==null){for(i.flags|=128,Do(o,!1),e=d.updateQueue,i.updateQueue=e,Yl(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)em(s,e),s=s.sibling;return yt(rn,rn.current&1|2),Ee&&ta(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&dt()>$l&&(i.flags|=128,u=!0,Do(o,!1),i.lanes=4194304)}else{if(!u)if(e=Pl(d),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,Yl(i,e),Do(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Ee)return Ke(i),null}else 2*dt()-o.renderingStartTime>$l&&s!==536870912&&(i.flags|=128,u=!0,Do(o,!1),i.lanes=4194304);o.isBackwards?(d.sibling=i.child,i.child=d):(e=o.last,e!==null?e.sibling=d:i.child=d,o.last=d)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=dt(),e.sibling=null,s=rn.current,yt(rn,u?s&1|2:s&1),Ee&&ta(i,o.treeForkCount),e):(Ke(i),null);case 22:case 23:return ri(i),ef(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(s&536870912)!==0&&(i.flags&128)===0&&(Ke(i),i.subtreeFlags&6&&(i.flags|=8192)):Ke(i),s=i.updateQueue,s!==null&&Yl(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==s&&(i.flags|=2048),e!==null&&nt(Es),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),na(un),Ke(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function Oy(e,i){switch(Gu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return na(un),Ht(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Fe(i),null;case 31:if(i.memoizedState!==null){if(ri(i),i.alternate===null)throw Error(a(340));ys()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(ri(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));ys()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return nt(rn),null;case 4:return Ht(),null;case 10:return na(i.type),null;case 22:case 23:return ri(i),ef(),e!==null&&nt(Es),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return na(un),null;case 25:return null;default:return null}}function w0(e,i){switch(Gu(i),i.tag){case 3:na(un),Ht();break;case 26:case 27:case 5:Fe(i);break;case 4:Ht();break;case 31:i.memoizedState!==null&&ri(i);break;case 13:ri(i);break;case 19:nt(rn);break;case 10:na(i.type);break;case 22:case 23:ri(i),ef(),e!==null&&nt(Es);break;case 24:na(un)}}function Uo(e,i){try{var s=i.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var u=o.next;s=u;do{if((s.tag&e)===e){o=void 0;var d=s.create,y=s.inst;o=d(),y.destroy=o}s=s.next}while(s!==u)}}catch(b){Be(i,i.return,b)}}function Fa(e,i,s){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&e)===e){var y=o.inst,b=y.destroy;if(b!==void 0){y.destroy=void 0,u=i;var B=s,tt=b;try{tt()}catch(ft){Be(u,B,ft)}}}o=o.next}while(o!==d)}}catch(ft){Be(i,i.return,ft)}}function C0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{xm(i,s)}catch(o){Be(e,e.return,o)}}}function D0(e,i,s){s.props=ws(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){Be(e,i,o)}}function Lo(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(u){Be(e,i,u)}}function Xi(e,i){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(u){Be(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Be(e,i,u)}else s.current=null}function U0(e){var i=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(u){Be(e,e.return,u)}}function Of(e,i,s){try{var o=e.stateNode;nS(o,e.type,s,i),o[wn]=i}catch(u){Be(e,e.return,u)}}function L0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Wa(e.type)||e.tag===4}function Pf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||L0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Wa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zf(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Qi));else if(o!==4&&(o===27&&Wa(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(zf(e,i,s),e=e.sibling;e!==null;)zf(e,i,s),e=e.sibling}function Zl(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(o!==4&&(o===27&&Wa(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(Zl(e,i,s),e=e.sibling;e!==null;)Zl(e,i,s),e=e.sibling}function N0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Nn(i,o,s),i[en]=e,i[wn]=s}catch(d){Be(e,e.return,d)}}var oa=!1,dn=!1,Bf=!1,O0=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function Py(e,i){if(e=e.containerInfo,ah=gc,e=Wp(e),Cu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{s.nodeType,d.nodeType}catch{s=null;break t}var y=0,b=-1,B=-1,tt=0,ft=0,_t=e,it=null;e:for(;;){for(var lt;_t!==s||u!==0&&_t.nodeType!==3||(b=y+u),_t!==d||o!==0&&_t.nodeType!==3||(B=y+o),_t.nodeType===3&&(y+=_t.nodeValue.length),(lt=_t.firstChild)!==null;)it=_t,_t=lt;for(;;){if(_t===e)break e;if(it===s&&++tt===u&&(b=y),it===d&&++ft===o&&(B=y),(lt=_t.nextSibling)!==null)break;_t=it,it=_t.parentNode}_t=lt}s=b===-1||B===-1?null:{start:b,end:B}}else s=null}s=s||{start:0,end:0}}else s=null;for(sh={focusedElem:e,selectionRange:s},gc=!1,Tn=i;Tn!==null;)if(i=Tn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Tn=e;else for(;Tn!==null;){switch(i=Tn,d=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)u=e[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,s=i,u=d.memoizedProps,d=d.memoizedState,o=s.stateNode;try{var Ft=ws(s.type,u);e=o.getSnapshotBeforeUpdate(Ft,d),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){Be(s,s.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)lh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":lh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Tn=e;break}Tn=i.return}}function P0(e,i,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:ca(e,s),o&4&&Uo(5,s);break;case 1:if(ca(e,s),o&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(y){Be(s,s.return,y)}else{var u=ws(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Be(s,s.return,y)}}o&64&&C0(s),o&512&&Lo(s,s.return);break;case 3:if(ca(e,s),o&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{xm(e,i)}catch(y){Be(s,s.return,y)}}break;case 27:i===null&&o&4&&N0(s);case 26:case 5:ca(e,s),i===null&&o&4&&U0(s),o&512&&Lo(s,s.return);break;case 12:ca(e,s);break;case 31:ca(e,s),o&4&&I0(e,s);break;case 13:ca(e,s),o&4&&F0(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=Xy.bind(null,s),uS(e,s))));break;case 22:if(o=s.memoizedState!==null||oa,!o){i=i!==null&&i.memoizedState!==null||dn,u=oa;var d=dn;oa=o,(dn=i)&&!d?ua(e,s,(s.subtreeFlags&8772)!==0):ca(e,s),oa=u,dn=d}break;case 30:break;default:ca(e,s)}}function z0(e){var i=e.alternate;i!==null&&(e.alternate=null,z0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&ot(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,Yn=!1;function la(e,i,s){for(s=s.child;s!==null;)B0(e,i,s),s=s.sibling}function B0(e,i,s){if(jt&&typeof jt.onCommitFiberUnmount=="function")try{jt.onCommitFiberUnmount(Kt,s)}catch{}switch(s.tag){case 26:dn||Xi(s,i),la(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:dn||Xi(s,i);var o=$e,u=Yn;Wa(s.type)&&($e=s.stateNode,Yn=!1),la(e,i,s),Ho(s.stateNode),$e=o,Yn=u;break;case 5:dn||Xi(s,i);case 6:if(o=$e,u=Yn,$e=null,la(e,i,s),$e=o,Yn=u,$e!==null)if(Yn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(s.stateNode)}catch(d){Be(s,i,d)}else try{$e.removeChild(s.stateNode)}catch(d){Be(s,i,d)}break;case 18:$e!==null&&(Yn?(e=$e,Cg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Er(e)):Cg($e,s.stateNode));break;case 4:o=$e,u=Yn,$e=s.stateNode.containerInfo,Yn=!0,la(e,i,s),$e=o,Yn=u;break;case 0:case 11:case 14:case 15:Fa(2,s,i),dn||Fa(4,s,i),la(e,i,s);break;case 1:dn||(Xi(s,i),o=s.stateNode,typeof o.componentWillUnmount=="function"&&D0(s,i,o)),la(e,i,s);break;case 21:la(e,i,s);break;case 22:dn=(o=dn)||s.memoizedState!==null,la(e,i,s),dn=o;break;default:la(e,i,s)}}function I0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Er(e)}catch(s){Be(i,i.return,s)}}}function F0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Er(e)}catch(s){Be(i,i.return,s)}}function zy(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new O0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new O0),i;default:throw Error(a(435,e.tag))}}function Kl(e,i){var s=zy(e);i.forEach(function(o){if(!s.has(o)){s.add(o);var u=qy.bind(null,e,o);o.then(u,u)}})}function Zn(e,i){var s=i.deletions;if(s!==null)for(var o=0;o<s.length;o++){var u=s[o],d=e,y=i,b=y;t:for(;b!==null;){switch(b.tag){case 27:if(Wa(b.type)){$e=b.stateNode,Yn=!1;break t}break;case 5:$e=b.stateNode,Yn=!1;break t;case 3:case 4:$e=b.stateNode.containerInfo,Yn=!0;break t}b=b.return}if($e===null)throw Error(a(160));B0(d,y,u),$e=null,Yn=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)G0(i,e),i=i.sibling}var Li=null;function G0(e,i){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Zn(i,e),Kn(e),o&4&&(Fa(3,e,e.return),Uo(3,e),Fa(5,e,e.return));break;case 1:Zn(i,e),Kn(e),o&512&&(dn||s===null||Xi(s,s.return)),o&64&&oa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var u=Li;if(Zn(i,e),Kn(e),o&512&&(dn||s===null||Xi(s,s.return)),o&4){var d=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[W]||d[en]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),Nn(d,o,s),d[en]=e,Ut(d),o=d;break t;case"link":var y=Gg("link","href",u).get(o+(s.href||""));if(y){for(var b=0;b<y.length;b++)if(d=y[b],d.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&d.getAttribute("rel")===(s.rel==null?null:s.rel)&&d.getAttribute("title")===(s.title==null?null:s.title)&&d.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(b,1);break e}}d=u.createElement(o),Nn(d,o,s),u.head.appendChild(d);break;case"meta":if(y=Gg("meta","content",u).get(o+(s.content||""))){for(b=0;b<y.length;b++)if(d=y[b],d.getAttribute("content")===(s.content==null?null:""+s.content)&&d.getAttribute("name")===(s.name==null?null:s.name)&&d.getAttribute("property")===(s.property==null?null:s.property)&&d.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&d.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(b,1);break e}}d=u.createElement(o),Nn(d,o,s),u.head.appendChild(d);break;default:throw Error(a(468,o))}d[en]=e,Ut(d),o=d}e.stateNode=o}else Hg(u,e.type,e.stateNode);else e.stateNode=Fg(u,o,e.memoizedProps);else d!==o?(d===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):d.count--,o===null?Hg(u,e.type,e.stateNode):Fg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Of(e,e.memoizedProps,s.memoizedProps)}break;case 27:Zn(i,e),Kn(e),o&512&&(dn||s===null||Xi(s,s.return)),s!==null&&o&4&&Of(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Zn(i,e),Kn(e),o&512&&(dn||s===null||Xi(s,s.return)),e.flags&32){u=e.stateNode;try{Ws(u,"")}catch(Ft){Be(e,e.return,Ft)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Of(e,u,s!==null?s.memoizedProps:u)),o&1024&&(Bf=!0);break;case 6:if(Zn(i,e),Kn(e),o&4){if(e.stateNode===null)throw Error(a(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(Ft){Be(e,e.return,Ft)}}break;case 3:if(hc=null,u=Li,Li=uc(i.containerInfo),Zn(i,e),Li=u,Kn(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{Er(i.containerInfo)}catch(Ft){Be(e,e.return,Ft)}Bf&&(Bf=!1,H0(e));break;case 4:o=Li,Li=uc(e.stateNode.containerInfo),Zn(i,e),Kn(e),Li=o;break;case 12:Zn(i,e),Kn(e);break;case 31:Zn(i,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 13:Zn(i,e),Kn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Jl=dt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 22:u=e.memoizedState!==null;var B=s!==null&&s.memoizedState!==null,tt=oa,ft=dn;if(oa=tt||u,dn=ft||B,Zn(i,e),dn=ft,oa=tt,Kn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(s===null||B||oa||dn||Cs(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){B=s=i;try{if(d=B.stateNode,u)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{b=B.stateNode;var _t=B.memoizedProps.style,it=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;b.style.display=it==null||typeof it=="boolean"?"":(""+it).trim()}}catch(Ft){Be(B,B.return,Ft)}}}else if(i.tag===6){if(s===null){B=i;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(Ft){Be(B,B.return,Ft)}}}else if(i.tag===18){if(s===null){B=i;try{var lt=B.stateNode;u?Dg(lt,!0):Dg(B.stateNode,!1)}catch(Ft){Be(B,B.return,Ft)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,Kl(e,s))));break;case 19:Zn(i,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Kl(e,o)));break;case 30:break;case 21:break;default:Zn(i,e),Kn(e)}}function Kn(e){var i=e.flags;if(i&2){try{for(var s,o=e.return;o!==null;){if(L0(o)){s=o;break}o=o.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var u=s.stateNode,d=Pf(e);Zl(e,d,u);break;case 5:var y=s.stateNode;s.flags&32&&(Ws(y,""),s.flags&=-33);var b=Pf(e);Zl(e,b,y);break;case 3:case 4:var B=s.stateNode.containerInfo,tt=Pf(e);zf(e,tt,B);break;default:throw Error(a(161))}}catch(ft){Be(e,e.return,ft)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function H0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;H0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function ca(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)P0(e,i.alternate,i),i=i.sibling}function Cs(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Fa(4,i,i.return),Cs(i);break;case 1:Xi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&D0(i,i.return,s),Cs(i);break;case 27:Ho(i.stateNode);case 26:case 5:Xi(i,i.return),Cs(i);break;case 22:i.memoizedState===null&&Cs(i);break;case 30:Cs(i);break;default:Cs(i)}e=e.sibling}}function ua(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,d=i,y=d.flags;switch(d.tag){case 0:case 11:case 15:ua(u,d,s),Uo(4,d);break;case 1:if(ua(u,d,s),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(tt){Be(o,o.return,tt)}if(o=d,u=o.updateQueue,u!==null){var b=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)vm(B[u],b)}catch(tt){Be(o,o.return,tt)}}s&&y&64&&C0(d),Lo(d,d.return);break;case 27:N0(d);case 26:case 5:ua(u,d,s),s&&o===null&&y&4&&U0(d),Lo(d,d.return);break;case 12:ua(u,d,s);break;case 31:ua(u,d,s),s&&y&4&&I0(u,d);break;case 13:ua(u,d,s),s&&y&4&&F0(u,d);break;case 22:d.memoizedState===null&&ua(u,d,s),Lo(d,d.return);break;case 30:break;default:ua(u,d,s)}i=i.sibling}}function If(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&vo(s))}function Ff(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&vo(e))}function Ni(e,i,s,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)V0(e,i,s,o),i=i.sibling}function V0(e,i,s,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Ni(e,i,s,o),u&2048&&Uo(9,i);break;case 1:Ni(e,i,s,o);break;case 3:Ni(e,i,s,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&vo(e)));break;case 12:if(u&2048){Ni(e,i,s,o),e=i.stateNode;try{var d=i.memoizedProps,y=d.id,b=d.onPostCommit;typeof b=="function"&&b(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){Be(i,i.return,B)}}else Ni(e,i,s,o);break;case 31:Ni(e,i,s,o);break;case 13:Ni(e,i,s,o);break;case 23:break;case 22:d=i.stateNode,y=i.alternate,i.memoizedState!==null?d._visibility&2?Ni(e,i,s,o):No(e,i):d._visibility&2?Ni(e,i,s,o):(d._visibility|=2,hr(e,i,s,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&If(y,i);break;case 24:Ni(e,i,s,o),u&2048&&Ff(i.alternate,i);break;default:Ni(e,i,s,o)}}function hr(e,i,s,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=e,y=i,b=s,B=o,tt=y.flags;switch(y.tag){case 0:case 11:case 15:hr(d,y,b,B,u),Uo(8,y);break;case 23:break;case 22:var ft=y.stateNode;y.memoizedState!==null?ft._visibility&2?hr(d,y,b,B,u):No(d,y):(ft._visibility|=2,hr(d,y,b,B,u)),u&&tt&2048&&If(y.alternate,y);break;case 24:hr(d,y,b,B,u),u&&tt&2048&&Ff(y.alternate,y);break;default:hr(d,y,b,B,u)}i=i.sibling}}function No(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,o=i,u=o.flags;switch(o.tag){case 22:No(s,o),u&2048&&If(o.alternate,o);break;case 24:No(s,o),u&2048&&Ff(o.alternate,o);break;default:No(s,o)}i=i.sibling}}var Oo=8192;function dr(e,i,s){if(e.subtreeFlags&Oo)for(e=e.child;e!==null;)k0(e,i,s),e=e.sibling}function k0(e,i,s){switch(e.tag){case 26:dr(e,i,s),e.flags&Oo&&e.memoizedState!==null&&MS(s,Li,e.memoizedState,e.memoizedProps);break;case 5:dr(e,i,s);break;case 3:case 4:var o=Li;Li=uc(e.stateNode.containerInfo),dr(e,i,s),Li=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Oo,Oo=16777216,dr(e,i,s),Oo=o):dr(e,i,s));break;default:dr(e,i,s)}}function X0(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Po(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Tn=o,W0(o,e)}X0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)q0(e),e=e.sibling}function q0(e){switch(e.tag){case 0:case 11:case 15:Po(e),e.flags&2048&&Fa(9,e,e.return);break;case 3:Po(e);break;case 12:Po(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,Ql(e)):Po(e);break;default:Po(e)}}function Ql(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Tn=o,W0(o,e)}X0(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Fa(8,i,i.return),Ql(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,Ql(i));break;default:Ql(i)}e=e.sibling}}function W0(e,i){for(;Tn!==null;){var s=Tn;switch(s.tag){case 0:case 11:case 15:Fa(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:vo(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,Tn=o;else t:for(s=e;Tn!==null;){o=Tn;var u=o.sibling,d=o.return;if(z0(o),o===s){Tn=null;break t}if(u!==null){u.return=d,Tn=u;break t}Tn=d}}}var By={getCacheForType:function(e){var i=Un(un),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Un(un).controller.signal}},Iy=typeof WeakMap=="function"?WeakMap:Map,Le=0,qe=null,pe=null,xe=0,ze=0,oi=null,Ga=!1,pr=!1,Gf=!1,fa=0,an=0,Ha=0,Ds=0,Hf=0,li=0,mr=0,zo=null,Qn=null,Vf=!1,Jl=0,j0=0,$l=1/0,tc=null,Va=null,xn=0,ka=null,gr=null,ha=0,kf=0,Xf=null,Y0=null,Bo=0,qf=null;function ci(){return(Le&2)!==0&&xe!==0?xe&-xe:z.T!==null?Qf():ao()}function Z0(){if(li===0)if((xe&536870912)===0||Ee){var e=ct;ct<<=1,(ct&3932160)===0&&(ct=262144),li=e}else li=536870912;return e=si.current,e!==null&&(e.flags|=32),li}function Jn(e,i,s){(e===qe&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(_r(e,0),Xa(e,xe,li,!1)),Rn(e,s),((Le&2)===0||e!==qe)&&(e===qe&&((Le&2)===0&&(Ds|=s),an===4&&Xa(e,xe,li,!1)),qi(e))}function K0(e,i,s){if((Le&6)!==0)throw Error(a(327));var o=!s&&(i&127)===0&&(i&e.expiredLanes)===0||ee(e,i),u=o?Hy(e,i):jf(e,i,!0),d=o;do{if(u===0){pr&&!o&&Xa(e,i,0,!1);break}else{if(s=e.current.alternate,d&&!Fy(s)){u=jf(e,i,!1),d=!1;continue}if(u===2){if(d=i,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var b=e;u=zo;var B=b.current.memoizedState.isDehydrated;if(B&&(_r(b,y).flags|=256),y=jf(b,y,!1),y!==2){if(Gf&&!B){b.errorRecoveryDisabledLanes|=d,Ds|=d,u=4;break t}d=Qn,Qn=u,d!==null&&(Qn===null?Qn=d:Qn.push.apply(Qn,d))}u=y}if(d=!1,u!==2)continue}}if(u===1){_r(e,0),Xa(e,i,0,!0);break}t:{switch(o=e,d=u,d){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:Xa(o,i,li,!Ga);break t;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(u=Jl+300-dt(),10<u)){if(Xa(o,i,li,!Ga),Nt(o,0,!0)!==0)break t;ha=i,o.timeoutHandle=Rg(Q0.bind(null,o,s,Qn,tc,Vf,i,li,Ds,mr,Ga,d,"Throttled",-0,0),u);break t}Q0(o,s,Qn,tc,Vf,i,li,Ds,mr,Ga,d,null,-0,0)}}break}while(!0);qi(e)}function Q0(e,i,s,o,u,d,y,b,B,tt,ft,_t,it,lt){if(e.timeoutHandle=-1,_t=i.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Qi},k0(i,d,_t);var Ft=(d&62914560)===d?Jl-dt():(d&4194048)===d?j0-dt():0;if(Ft=ES(_t,Ft),Ft!==null){ha=d,e.cancelPendingCommit=Ft(sg.bind(null,e,i,d,s,o,u,y,b,B,ft,_t,null,it,lt)),Xa(e,d,y,!tt);return}}sg(e,i,d,s,o,u,y,b,B)}function Fy(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var u=s[o],d=u.getSnapshot;u=u.value;try{if(!ii(d(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Xa(e,i,s,o){i&=~Hf,i&=~Ds,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var d=31-te(u),y=1<<d;o[d]=-1,u&=~y}s!==0&&no(e,s,i)}function ec(){return(Le&6)===0?(Io(0),!1):!0}function Wf(){if(pe!==null){if(ze===0)var e=pe.return;else e=pe,ea=Ss=null,lf(e),or=null,yo=0,e=pe;for(;e!==null;)w0(e.alternate,e),e=e.return;pe=null}}function _r(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,sS(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ha=0,Wf(),qe=e,pe=s=$i(e.current,null),xe=i,ze=0,oi=null,Ga=!1,pr=ee(e,i),Gf=!1,mr=li=Hf=Ds=Ha=an=0,Qn=zo=null,Vf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-te(o),d=1<<u;i|=e[u],o&=~d}return fa=i,Ml(),s}function J0(e,i){oe=null,z.H=wo,i===rr||i===Dl?(i=pm(),ze=3):i===Zu?(i=pm(),ze=4):ze=i===Tf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,oi=i,pe===null&&(an=1,Xl(e,gi(i,e.current)))}function $0(){var e=si.current;return e===null?!0:(xe&4194048)===xe?yi===null:(xe&62914560)===xe||(xe&536870912)!==0?e===yi:!1}function tg(){var e=z.H;return z.H=wo,e===null?wo:e}function eg(){var e=z.A;return z.A=By,e}function nc(){an=4,Ga||(xe&4194048)!==xe&&si.current!==null||(pr=!0),(Ha&134217727)===0&&(Ds&134217727)===0||qe===null||Xa(qe,xe,li,!1)}function jf(e,i,s){var o=Le;Le|=2;var u=tg(),d=eg();(qe!==e||xe!==i)&&(tc=null,_r(e,i)),i=!1;var y=an;t:do try{if(ze!==0&&pe!==null){var b=pe,B=oi;switch(ze){case 8:Wf(),y=6;break t;case 3:case 2:case 9:case 6:si.current===null&&(i=!0);var tt=ze;if(ze=0,oi=null,vr(e,b,B,tt),s&&pr){y=0;break t}break;default:tt=ze,ze=0,oi=null,vr(e,b,B,tt)}}Gy(),y=an;break}catch(ft){J0(e,ft)}while(!0);return i&&e.shellSuspendCounter++,ea=Ss=null,Le=o,z.H=u,z.A=d,pe===null&&(qe=null,xe=0,Ml()),y}function Gy(){for(;pe!==null;)ng(pe)}function Hy(e,i){var s=Le;Le|=2;var o=tg(),u=eg();qe!==e||xe!==i?(tc=null,$l=dt()+500,_r(e,i)):pr=ee(e,i);t:do try{if(ze!==0&&pe!==null){i=pe;var d=oi;e:switch(ze){case 1:ze=0,oi=null,vr(e,i,d,1);break;case 2:case 9:if(hm(d)){ze=0,oi=null,ig(i);break}i=function(){ze!==2&&ze!==9||qe!==e||(ze=7),qi(e)},d.then(i,i);break t;case 3:ze=7;break t;case 4:ze=5;break t;case 7:hm(d)?(ze=0,oi=null,ig(i)):(ze=0,oi=null,vr(e,i,d,7));break;case 5:var y=null;switch(pe.tag){case 26:y=pe.memoizedState;case 5:case 27:var b=pe;if(y?Vg(y):b.stateNode.complete){ze=0,oi=null;var B=b.sibling;if(B!==null)pe=B;else{var tt=b.return;tt!==null?(pe=tt,ic(tt)):pe=null}break e}}ze=0,oi=null,vr(e,i,d,5);break;case 6:ze=0,oi=null,vr(e,i,d,6);break;case 8:Wf(),an=6;break t;default:throw Error(a(462))}}Vy();break}catch(ft){J0(e,ft)}while(!0);return ea=Ss=null,z.H=o,z.A=u,Le=s,pe!==null?0:(qe=null,xe=0,Ml(),an)}function Vy(){for(;pe!==null&&!A();)ng(pe)}function ng(e){var i=A0(e.alternate,e,fa);e.memoizedProps=e.pendingProps,i===null?ic(e):pe=i}function ig(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=y0(s,i,i.pendingProps,i.type,void 0,xe);break;case 11:i=y0(s,i,i.pendingProps,i.type.render,i.ref,xe);break;case 5:lf(i);default:w0(s,i),i=pe=em(i,fa),i=A0(s,i,fa)}e.memoizedProps=e.pendingProps,i===null?ic(e):pe=i}function vr(e,i,s,o){ea=Ss=null,lf(i),or=null,yo=0;var u=i.return;try{if(Dy(e,u,i,s,xe)){an=1,Xl(e,gi(s,e.current)),pe=null;return}}catch(d){if(u!==null)throw pe=u,d;an=1,Xl(e,gi(s,e.current)),pe=null;return}i.flags&32768?(Ee||o===1?e=!0:pr||(xe&536870912)!==0?e=!1:(Ga=e=!0,(o===2||o===9||o===3||o===6)&&(o=si.current,o!==null&&o.tag===13&&(o.flags|=16384))),ag(i,e)):ic(i)}function ic(e){var i=e;do{if((i.flags&32768)!==0){ag(i,Ga);return}e=i.return;var s=Ny(i.alternate,i,fa);if(s!==null){pe=s;return}if(i=i.sibling,i!==null){pe=i;return}pe=i=e}while(i!==null);an===0&&(an=5)}function ag(e,i){do{var s=Oy(e.alternate,e);if(s!==null){s.flags&=32767,pe=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){pe=e;return}pe=e=s}while(e!==null);an=6,pe=null}function sg(e,i,s,o,u,d,y,b,B){e.cancelPendingCommit=null;do ac();while(xn!==0);if((Le&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(d=i.lanes|i.childLanes,d|=Ou,wi(e,s,d,y,b,B),e===qe&&(pe=qe=null,xe=0),gr=i,ka=e,ha=s,kf=d,Xf=u,Y0=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Wy(Lt,function(){return ug(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=V.p,V.p=2,y=Le,Le|=4;try{Py(e,i,s)}finally{Le=y,V.p=u,z.T=o}}xn=1,rg(),og(),lg()}}function rg(){if(xn===1){xn=0;var e=ka,i=gr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=z.T,z.T=null;var o=V.p;V.p=2;var u=Le;Le|=4;try{G0(i,e);var d=sh,y=Wp(e.containerInfo),b=d.focusedElem,B=d.selectionRange;if(y!==b&&b&&b.ownerDocument&&qp(b.ownerDocument.documentElement,b)){if(B!==null&&Cu(b)){var tt=B.start,ft=B.end;if(ft===void 0&&(ft=tt),"selectionStart"in b)b.selectionStart=tt,b.selectionEnd=Math.min(ft,b.value.length);else{var _t=b.ownerDocument||document,it=_t&&_t.defaultView||window;if(it.getSelection){var lt=it.getSelection(),Ft=b.textContent.length,Jt=Math.min(B.start,Ft),Xe=B.end===void 0?Jt:Math.min(B.end,Ft);!lt.extend&&Jt>Xe&&(y=Xe,Xe=Jt,Jt=y);var Z=Xp(b,Jt),H=Xp(b,Xe);if(Z&&H&&(lt.rangeCount!==1||lt.anchorNode!==Z.node||lt.anchorOffset!==Z.offset||lt.focusNode!==H.node||lt.focusOffset!==H.offset)){var $=_t.createRange();$.setStart(Z.node,Z.offset),lt.removeAllRanges(),Jt>Xe?(lt.addRange($),lt.extend(H.node,H.offset)):($.setEnd(H.node,H.offset),lt.addRange($))}}}}for(_t=[],lt=b;lt=lt.parentNode;)lt.nodeType===1&&_t.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<_t.length;b++){var mt=_t[b];mt.element.scrollLeft=mt.left,mt.element.scrollTop=mt.top}}gc=!!ah,sh=ah=null}finally{Le=u,V.p=o,z.T=s}}e.current=i,xn=2}}function og(){if(xn===2){xn=0;var e=ka,i=gr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=z.T,z.T=null;var o=V.p;V.p=2;var u=Le;Le|=4;try{P0(e,i.alternate,i)}finally{Le=u,V.p=o,z.T=s}}xn=3}}function lg(){if(xn===4||xn===3){xn=0,at();var e=ka,i=gr,s=ha,o=Y0;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?xn=5:(xn=0,gr=ka=null,cg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Va=null),qs(s),i=i.stateNode,jt&&typeof jt.onCommitFiberRoot=="function")try{jt.onCommitFiberRoot(Kt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=z.T,u=V.p,V.p=2,z.T=null;try{for(var d=e.onRecoverableError,y=0;y<o.length;y++){var b=o[y];d(b.value,{componentStack:b.stack})}}finally{z.T=i,V.p=u}}(ha&3)!==0&&ac(),qi(e),u=e.pendingLanes,(s&261930)!==0&&(u&42)!==0?e===qf?Bo++:(Bo=0,qf=e):Bo=0,Io(0)}}function cg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,vo(i)))}function ac(){return rg(),og(),lg(),ug()}function ug(){if(xn!==5)return!1;var e=ka,i=kf;kf=0;var s=qs(ha),o=z.T,u=V.p;try{V.p=32>s?32:s,z.T=null,s=Xf,Xf=null;var d=ka,y=ha;if(xn=0,gr=ka=null,ha=0,(Le&6)!==0)throw Error(a(331));var b=Le;if(Le|=4,q0(d.current),V0(d,d.current,y,s),Le=b,Io(0,!1),jt&&typeof jt.onPostCommitFiberRoot=="function")try{jt.onPostCommitFiberRoot(Kt,d)}catch{}return!0}finally{V.p=u,z.T=o,cg(e,i)}}function fg(e,i,s){i=gi(s,i),i=Ef(e.stateNode,i,2),e=za(e,i,2),e!==null&&(Rn(e,2),qi(e))}function Be(e,i,s){if(e.tag===3)fg(e,e,s);else for(;i!==null;){if(i.tag===3){fg(i,e,s);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Va===null||!Va.has(o))){e=gi(s,e),s=h0(2),o=za(i,s,2),o!==null&&(d0(s,o,i,e),Rn(o,2),qi(o));break}}i=i.return}}function Yf(e,i,s){var o=e.pingCache;if(o===null){o=e.pingCache=new Iy;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(s)||(Gf=!0,u.add(s),e=ky.bind(null,e,i,s),i.then(e,e))}function ky(e,i,s){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,qe===e&&(xe&s)===s&&(an===4||an===3&&(xe&62914560)===xe&&300>dt()-Jl?(Le&2)===0&&_r(e,0):Hf|=s,mr===xe&&(mr=0)),qi(e)}function hg(e,i){i===0&&(i=_n()),e=vs(e,i),e!==null&&(Rn(e,i),qi(e))}function Xy(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),hg(e,s)}function qy(e,i){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(a(314))}o!==null&&o.delete(i),hg(e,s)}function Wy(e,i){return Zt(e,i)}var sc=null,xr=null,Zf=!1,rc=!1,Kf=!1,qa=0;function qi(e){e!==xr&&e.next===null&&(xr===null?sc=xr=e:xr=xr.next=e),rc=!0,Zf||(Zf=!0,Yy())}function Io(e,i){if(!Kf&&rc){Kf=!0;do for(var s=!1,o=sc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var y=o.suspendedLanes,b=o.pingedLanes;d=(1<<31-te(42|e)+1)-1,d&=u&~(y&~b),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(s=!0,gg(o,d))}else d=xe,d=Nt(o,o===qe?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||ee(o,d)||(s=!0,gg(o,d));o=o.next}while(s);Kf=!1}}function jy(){dg()}function dg(){rc=Zf=!1;var e=0;qa!==0&&aS()&&(e=qa);for(var i=dt(),s=null,o=sc;o!==null;){var u=o.next,d=pg(o,i);d===0?(o.next=null,s===null?sc=u:s.next=u,u===null&&(xr=s)):(s=o,(e!==0||(d&3)!==0)&&(rc=!0)),o=u}xn!==0&&xn!==5||Io(e),qa!==0&&(qa=0)}function pg(e,i){for(var s=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-te(d),b=1<<y,B=u[y];B===-1?((b&s)===0||(b&o)!==0)&&(u[y]=Je(b,i)):B<=i&&(e.expiredLanes|=b),d&=~b}if(i=qe,s=xe,s=Nt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===i&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&N(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||ee(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(o!==null&&N(o),qs(s)){case 2:case 8:s=Wt;break;case 32:s=Lt;break;case 268435456:s=ve;break;default:s=Lt}return o=mg.bind(null,e),s=Zt(s,o),e.callbackPriority=i,e.callbackNode=s,i}return o!==null&&o!==null&&N(o),e.callbackPriority=2,e.callbackNode=null,2}function mg(e,i){if(xn!==0&&xn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(ac()&&e.callbackNode!==s)return null;var o=xe;return o=Nt(e,e===qe?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(K0(e,o,i),pg(e,dt()),e.callbackNode!=null&&e.callbackNode===s?mg.bind(null,e):null)}function gg(e,i){if(ac())return null;K0(e,i,!0)}function Yy(){rS(function(){(Le&6)!==0?Zt(gt,jy):dg()})}function Qf(){if(qa===0){var e=ar;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),qa=e}return qa}function _g(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:pl(""+e)}function vg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function Zy(e,i,s,o,u){if(i==="submit"&&s&&s.stateNode===u){var d=_g((u[wn]||null).action),y=o.submitter;y&&(i=(i=y[wn]||null)?_g(i.formAction):y.getAttribute("formAction"),i!==null&&(d=i,y=null));var b=new vl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(qa!==0){var B=y?vg(u,y):new FormData(u);_f(s,{pending:!0,data:B,method:u.method,action:d},null,B)}}else typeof d=="function"&&(b.preventDefault(),B=y?vg(u,y):new FormData(u),_f(s,{pending:!0,data:B,method:u.method,action:d},d,B))},currentTarget:u}]})}}for(var Jf=0;Jf<Nu.length;Jf++){var $f=Nu[Jf],Ky=$f.toLowerCase(),Qy=$f[0].toUpperCase()+$f.slice(1);Ui(Ky,"on"+Qy)}Ui(Zp,"onAnimationEnd"),Ui(Kp,"onAnimationIteration"),Ui(Qp,"onAnimationStart"),Ui("dblclick","onDoubleClick"),Ui("focusin","onFocus"),Ui("focusout","onBlur"),Ui(dy,"onTransitionRun"),Ui(py,"onTransitionStart"),Ui(my,"onTransitionCancel"),Ui(Jp,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$t("onBeforeInput",["compositionend","keypress","textInput","paste"]),$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Jy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fo));function xg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],u=o.event;o=o.listeners;t:{var d=void 0;if(i)for(var y=o.length-1;0<=y;y--){var b=o[y],B=b.instance,tt=b.currentTarget;if(b=b.listener,B!==d&&u.isPropagationStopped())break t;d=b,u.currentTarget=tt;try{d(u)}catch(ft){Sl(ft)}u.currentTarget=null,d=B}else for(y=0;y<o.length;y++){if(b=o[y],B=b.instance,tt=b.currentTarget,b=b.listener,B!==d&&u.isPropagationStopped())break t;d=b,u.currentTarget=tt;try{d(u)}catch(ft){Sl(ft)}u.currentTarget=null,d=B}}}}function me(e,i){var s=i[so];s===void 0&&(s=i[so]=new Set);var o=e+"__bubble";s.has(o)||(yg(i,e,2,!1),s.add(o))}function th(e,i,s){var o=0;i&&(o|=4),yg(s,e,o,i)}var oc="_reactListening"+Math.random().toString(36).slice(2);function eh(e){if(!e[oc]){e[oc]=!0,kt.forEach(function(s){s!=="selectionchange"&&(Jy.has(s)||th(s,!1,e),th(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[oc]||(i[oc]=!0,th("selectionchange",!1,i))}}function yg(e,i,s,o){switch(Zg(i)){case 2:var u=AS;break;case 8:u=RS;break;default:u=gh}s=u.bind(null,i,s,e),u=void 0,!yu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,s,{capture:!0,passive:u}):e.addEventListener(i,s,!0):u!==void 0?e.addEventListener(i,s,{passive:u}):e.addEventListener(i,s,!1)}function nh(e,i,s,o,u){var d=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var b=o.stateNode.containerInfo;if(b===u)break;if(y===4)for(y=o.return;y!==null;){var B=y.tag;if((B===3||B===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;b!==null;){if(y=rt(b),y===null)return;if(B=y.tag,B===5||B===6||B===26||B===27){o=d=y;continue t}b=b.parentNode}}o=o.return}bp(function(){var tt=d,ft=vu(s),_t=[];t:{var it=$p.get(e);if(it!==void 0){var lt=vl,Ft=e;switch(e){case"keypress":if(gl(s)===0)break t;case"keydown":case"keyup":lt=qx;break;case"focusin":Ft="focus",lt=Tu;break;case"focusout":Ft="blur",lt=Tu;break;case"beforeblur":case"afterblur":lt=Tu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=wp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=Nx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Yx;break;case Zp:case Kp:case Qp:lt=zx;break;case Jp:lt=Kx;break;case"scroll":case"scrollend":lt=Ux;break;case"wheel":lt=Jx;break;case"copy":case"cut":case"paste":lt=Ix;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=Dp;break;case"toggle":case"beforetoggle":lt=ty}var Jt=(i&4)!==0,Xe=!Jt&&(e==="scroll"||e==="scrollend"),Z=Jt?it!==null?it+"Capture":null:it;Jt=[];for(var H=tt,$;H!==null;){var mt=H;if($=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||$===null||Z===null||(mt=ro(H,Z),mt!=null&&Jt.push(Go(H,mt,$))),Xe)break;H=H.return}0<Jt.length&&(it=new lt(it,Ft,null,s,ft),_t.push({event:it,listeners:Jt}))}}if((i&7)===0){t:{if(it=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",it&&s!==_u&&(Ft=s.relatedTarget||s.fromElement)&&(rt(Ft)||Ft[Zi]))break t;if((lt||it)&&(it=ft.window===ft?ft:(it=ft.ownerDocument)?it.defaultView||it.parentWindow:window,lt?(Ft=s.relatedTarget||s.toElement,lt=tt,Ft=Ft?rt(Ft):null,Ft!==null&&(Xe=c(Ft),Jt=Ft.tag,Ft!==Xe||Jt!==5&&Jt!==27&&Jt!==6)&&(Ft=null)):(lt=null,Ft=tt),lt!==Ft)){if(Jt=wp,mt="onMouseLeave",Z="onMouseEnter",H="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=Dp,mt="onPointerLeave",Z="onPointerEnter",H="pointer"),Xe=lt==null?it:bt(lt),$=Ft==null?it:bt(Ft),it=new Jt(mt,H+"leave",lt,s,ft),it.target=Xe,it.relatedTarget=$,mt=null,rt(ft)===tt&&(Jt=new Jt(Z,H+"enter",Ft,s,ft),Jt.target=$,Jt.relatedTarget=Xe,mt=Jt),Xe=mt,lt&&Ft)e:{for(Jt=$y,Z=lt,H=Ft,$=0,mt=Z;mt;mt=Jt(mt))$++;mt=0;for(var Yt=H;Yt;Yt=Jt(Yt))mt++;for(;0<$-mt;)Z=Jt(Z),$--;for(;0<mt-$;)H=Jt(H),mt--;for(;$--;){if(Z===H||H!==null&&Z===H.alternate){Jt=Z;break e}Z=Jt(Z),H=Jt(H)}Jt=null}else Jt=null;lt!==null&&Sg(_t,it,lt,Jt,!1),Ft!==null&&Xe!==null&&Sg(_t,Xe,Ft,Jt,!0)}}t:{if(it=tt?bt(tt):window,lt=it.nodeName&&it.nodeName.toLowerCase(),lt==="select"||lt==="input"&&it.type==="file")var De=Ip;else if(zp(it))if(Fp)De=uy;else{De=ly;var qt=oy}else lt=it.nodeName,!lt||lt.toLowerCase()!=="input"||it.type!=="checkbox"&&it.type!=="radio"?tt&&gu(tt.elementType)&&(De=Ip):De=cy;if(De&&(De=De(e,tt))){Bp(_t,De,s,ft);break t}qt&&qt(e,it,tt),e==="focusout"&&tt&&it.type==="number"&&tt.memoizedProps.value!=null&&pi(it,"number",it.value)}switch(qt=tt?bt(tt):window,e){case"focusin":(zp(qt)||qt.contentEditable==="true")&&(Ks=qt,Du=tt,mo=null);break;case"focusout":mo=Du=Ks=null;break;case"mousedown":Uu=!0;break;case"contextmenu":case"mouseup":case"dragend":Uu=!1,jp(_t,s,ft);break;case"selectionchange":if(hy)break;case"keydown":case"keyup":jp(_t,s,ft)}var le;if(Au)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Zs?Op(e,s)&&(ye="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(ye="onCompositionStart");ye&&(Up&&s.locale!=="ko"&&(Zs||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Zs&&(le=Ap()):(Ca=ft,Su="value"in Ca?Ca.value:Ca.textContent,Zs=!0)),qt=lc(tt,ye),0<qt.length&&(ye=new Cp(ye,e,null,s,ft),_t.push({event:ye,listeners:qt}),le?ye.data=le:(le=Pp(s),le!==null&&(ye.data=le)))),(le=ny?iy(e,s):ay(e,s))&&(ye=lc(tt,"onBeforeInput"),0<ye.length&&(qt=new Cp("onBeforeInput","beforeinput",null,s,ft),_t.push({event:qt,listeners:ye}),qt.data=le)),Zy(_t,e,tt,s,ft)}xg(_t,i)})}function Go(e,i,s){return{instance:e,listener:i,currentTarget:s}}function lc(e,i){for(var s=i+"Capture",o=[];e!==null;){var u=e,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=ro(e,s),u!=null&&o.unshift(Go(e,u,d)),u=ro(e,i),u!=null&&o.push(Go(e,u,d))),e.tag===3)return o;e=e.return}return[]}function $y(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Sg(e,i,s,o,u){for(var d=i._reactName,y=[];s!==null&&s!==o;){var b=s,B=b.alternate,tt=b.stateNode;if(b=b.tag,B!==null&&B===o)break;b!==5&&b!==26&&b!==27||tt===null||(B=tt,u?(tt=ro(s,d),tt!=null&&y.unshift(Go(s,tt,B))):u||(tt=ro(s,d),tt!=null&&y.push(Go(s,tt,B)))),s=s.return}y.length!==0&&e.push({event:i,listeners:y})}var tS=/\r\n?/g,eS=/\u0000|\uFFFD/g;function Mg(e){return(typeof e=="string"?e:""+e).replace(tS,`
`).replace(eS,"")}function Eg(e,i){return i=Mg(i),Mg(e)===i}function ke(e,i,s,o,u,d){switch(s){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||Ws(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&Ws(e,""+o);break;case"className":Xt(e,"class",o);break;case"tabIndex":Xt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,s,o);break;case"style":Ep(e,o,d);break;case"data":if(i!=="object"){Xt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=pl(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(s==="formAction"?(i!=="input"&&ke(e,i,"name",u.name,u,null),ke(e,i,"formEncType",u.formEncType,u,null),ke(e,i,"formMethod",u.formMethod,u,null),ke(e,i,"formTarget",u.formTarget,u,null)):(ke(e,i,"encType",u.encType,u,null),ke(e,i,"method",u.method,u,null),ke(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=pl(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=pl(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":me("beforetoggle",e),me("toggle",e),Me(e,"popover",o);break;case"xlinkActuate":vn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":vn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":vn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":vn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":vn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":vn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":vn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":vn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":vn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Me(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=Cx.get(s)||s,Me(e,s,o))}}function ih(e,i,s,o,u,d){switch(s){case"style":Ep(e,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof o=="string"?Ws(e,o):(typeof o=="number"||typeof o=="bigint")&&Ws(e,""+o);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ne.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),d=e[wn]||null,d=d!=null?d[s]:null,typeof d=="function"&&e.removeEventListener(i,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,o,u);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):Me(e,s,o)}}}function Nn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var o=!1,u=!1,d;for(d in s)if(s.hasOwnProperty(d)){var y=s[d];if(y!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:ke(e,i,d,y,s,null)}}u&&ke(e,i,"srcSet",s.srcSet,s,null),o&&ke(e,i,"src",s.src,s,null);return;case"input":me("invalid",e);var b=d=y=u=null,B=null,tt=null;for(o in s)if(s.hasOwnProperty(o)){var ft=s[o];if(ft!=null)switch(o){case"name":u=ft;break;case"type":y=ft;break;case"checked":B=ft;break;case"defaultChecked":tt=ft;break;case"value":d=ft;break;case"defaultValue":b=ft;break;case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(a(137,i));break;default:ke(e,i,o,ft,s,null)}}Di(e,d,b,B,tt,y,u,!1);return;case"select":me("invalid",e),o=y=d=null;for(u in s)if(s.hasOwnProperty(u)&&(b=s[u],b!=null))switch(u){case"value":d=b;break;case"defaultValue":y=b;break;case"multiple":o=b;default:ke(e,i,u,b,s,null)}i=d,s=y,e.multiple=!!o,i!=null?Ki(e,!!o,i,!1):s!=null&&Ki(e,!!o,s,!0);return;case"textarea":me("invalid",e),d=u=o=null;for(y in s)if(s.hasOwnProperty(y)&&(b=s[y],b!=null))switch(y){case"value":o=b;break;case"defaultValue":u=b;break;case"children":d=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(a(91));break;default:ke(e,i,y,b,s,null)}Sp(e,o,u,d);return;case"option":for(B in s)if(s.hasOwnProperty(B)&&(o=s[B],o!=null))switch(B){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:ke(e,i,B,o,s,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(o=0;o<Fo.length;o++)me(Fo[o],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in s)if(s.hasOwnProperty(tt)&&(o=s[tt],o!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:ke(e,i,tt,o,s,null)}return;default:if(gu(i)){for(ft in s)s.hasOwnProperty(ft)&&(o=s[ft],o!==void 0&&ih(e,i,ft,o,s,void 0));return}}for(b in s)s.hasOwnProperty(b)&&(o=s[b],o!=null&&ke(e,i,b,o,s,null))}function nS(e,i,s,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,y=null,b=null,B=null,tt=null,ft=null;for(lt in s){var _t=s[lt];if(s.hasOwnProperty(lt)&&_t!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":B=_t;default:o.hasOwnProperty(lt)||ke(e,i,lt,null,o,_t)}}for(var it in o){var lt=o[it];if(_t=s[it],o.hasOwnProperty(it)&&(lt!=null||_t!=null))switch(it){case"type":d=lt;break;case"name":u=lt;break;case"checked":tt=lt;break;case"defaultChecked":ft=lt;break;case"value":y=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(a(137,i));break;default:lt!==_t&&ke(e,i,it,lt,o,_t)}}Bn(e,y,b,B,tt,ft,d,u);return;case"select":lt=y=b=it=null;for(d in s)if(B=s[d],s.hasOwnProperty(d)&&B!=null)switch(d){case"value":break;case"multiple":lt=B;default:o.hasOwnProperty(d)||ke(e,i,d,null,o,B)}for(u in o)if(d=o[u],B=s[u],o.hasOwnProperty(u)&&(d!=null||B!=null))switch(u){case"value":it=d;break;case"defaultValue":b=d;break;case"multiple":y=d;default:d!==B&&ke(e,i,u,d,o,B)}i=b,s=y,o=lt,it!=null?Ki(e,!!s,it,!1):!!o!=!!s&&(i!=null?Ki(e,!!s,i,!0):Ki(e,!!s,s?[]:"",!1));return;case"textarea":lt=it=null;for(b in s)if(u=s[b],s.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:ke(e,i,b,null,o,u)}for(y in o)if(u=o[y],d=s[y],o.hasOwnProperty(y)&&(u!=null||d!=null))switch(y){case"value":it=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==d&&ke(e,i,y,u,o,d)}yp(e,it,lt);return;case"option":for(var Ft in s)if(it=s[Ft],s.hasOwnProperty(Ft)&&it!=null&&!o.hasOwnProperty(Ft))switch(Ft){case"selected":e.selected=!1;break;default:ke(e,i,Ft,null,o,it)}for(B in o)if(it=o[B],lt=s[B],o.hasOwnProperty(B)&&it!==lt&&(it!=null||lt!=null))switch(B){case"selected":e.selected=it&&typeof it!="function"&&typeof it!="symbol";break;default:ke(e,i,B,it,o,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in s)it=s[Jt],s.hasOwnProperty(Jt)&&it!=null&&!o.hasOwnProperty(Jt)&&ke(e,i,Jt,null,o,it);for(tt in o)if(it=o[tt],lt=s[tt],o.hasOwnProperty(tt)&&it!==lt&&(it!=null||lt!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(it!=null)throw Error(a(137,i));break;default:ke(e,i,tt,it,o,lt)}return;default:if(gu(i)){for(var Xe in s)it=s[Xe],s.hasOwnProperty(Xe)&&it!==void 0&&!o.hasOwnProperty(Xe)&&ih(e,i,Xe,void 0,o,it);for(ft in o)it=o[ft],lt=s[ft],!o.hasOwnProperty(ft)||it===lt||it===void 0&&lt===void 0||ih(e,i,ft,it,o,lt);return}}for(var Z in s)it=s[Z],s.hasOwnProperty(Z)&&it!=null&&!o.hasOwnProperty(Z)&&ke(e,i,Z,null,o,it);for(_t in o)it=o[_t],lt=s[_t],!o.hasOwnProperty(_t)||it===lt||it==null&&lt==null||ke(e,i,_t,it,o,lt)}function Tg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function iS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var u=s[o],d=u.transferSize,y=u.initiatorType,b=u.duration;if(d&&b&&Tg(y)){for(y=0,b=u.responseEnd,o+=1;o<s.length;o++){var B=s[o],tt=B.startTime;if(tt>b)break;var ft=B.transferSize,_t=B.initiatorType;ft&&Tg(_t)&&(B=B.responseEnd,y+=ft*(B<b?1:(b-tt)/(B-tt)))}if(--o,i+=8*(d+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ah=null,sh=null;function cc(e){return e.nodeType===9?e:e.ownerDocument}function bg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ag(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function rh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var oh=null;function aS(){var e=window.event;return e&&e.type==="popstate"?e===oh?!1:(oh=e,!0):(oh=null,!1)}var Rg=typeof setTimeout=="function"?setTimeout:void 0,sS=typeof clearTimeout=="function"?clearTimeout:void 0,wg=typeof Promise=="function"?Promise:void 0,rS=typeof queueMicrotask=="function"?queueMicrotask:typeof wg<"u"?function(e){return wg.resolve(null).then(e).catch(oS)}:Rg;function oS(e){setTimeout(function(){throw e})}function Wa(e){return e==="head"}function Cg(e,i){var s=i,o=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(u),Er(i);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")Ho(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Ho(s);for(var d=s.firstChild;d;){var y=d.nextSibling,b=d.nodeName;d[W]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&d.rel.toLowerCase()==="stylesheet"||s.removeChild(d),d=y}}else s==="body"&&Ho(e.ownerDocument.body);s=u}while(s);Er(i)}function Dg(e,i){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function lh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":lh(s),ot(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function lS(e,i,s,o){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[W])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Si(e.nextSibling),e===null)break}return null}function cS(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Si(e.nextSibling),e===null))return null;return e}function Ug(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Si(e.nextSibling),e===null))return null;return e}function ch(e){return e.data==="$?"||e.data==="$~"}function uh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function uS(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var o=function(){i(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Si(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var fh=null;function Lg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Si(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function Ng(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function Og(e,i,s){switch(i=cc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Ho(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);ot(e)}var Mi=new Map,Pg=new Set;function uc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var da=V.d;V.d={f:fS,r:hS,D:dS,C:pS,L:mS,m:gS,X:vS,S:_S,M:xS};function fS(){var e=da.f(),i=ec();return e||i}function hS(e){var i=j(e);i!==null&&i.tag===5&&i.type==="form"?Jm(i):da.r(e)}var yr=typeof document>"u"?null:document;function zg(e,i,s){var o=yr;if(o&&typeof i=="string"&&i){var u=En(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),Pg.has(u)||(Pg.add(u),e={rel:e,crossOrigin:s,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Nn(i,"link",e),Ut(i),o.head.appendChild(i)))}}function dS(e){da.D(e),zg("dns-prefetch",e,null)}function pS(e,i){da.C(e,i),zg("preconnect",e,i)}function mS(e,i,s){da.L(e,i,s);var o=yr;if(o&&e&&i){var u='link[rel="preload"][as="'+En(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+En(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+En(s.imageSizes)+'"]')):u+='[href="'+En(e)+'"]';var d=u;switch(i){case"style":d=Sr(e);break;case"script":d=Mr(e)}Mi.has(d)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Mi.set(d,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(Vo(d))||i==="script"&&o.querySelector(ko(d))||(i=o.createElement("link"),Nn(i,"link",e),Ut(i),o.head.appendChild(i)))}}function gS(e,i){da.m(e,i);var s=yr;if(s&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+En(o)+'"][href="'+En(e)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Mr(e)}if(!Mi.has(d)&&(e=_({rel:"modulepreload",href:e},i),Mi.set(d,e),s.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(ko(d)))return}o=s.createElement("link"),Nn(o,"link",e),Ut(o),s.head.appendChild(o)}}}function _S(e,i,s){da.S(e,i,s);var o=yr;if(o&&e){var u=Dt(o).hoistableStyles,d=Sr(e);i=i||"default";var y=u.get(d);if(!y){var b={loading:0,preload:null};if(y=o.querySelector(Vo(d)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Mi.get(d))&&hh(e,s);var B=y=o.createElement("link");Ut(B),Nn(B,"link",e),B._p=new Promise(function(tt,ft){B.onload=tt,B.onerror=ft}),B.addEventListener("load",function(){b.loading|=1}),B.addEventListener("error",function(){b.loading|=2}),b.loading|=4,fc(y,i,o)}y={type:"stylesheet",instance:y,count:1,state:b},u.set(d,y)}}}function vS(e,i){da.X(e,i);var s=yr;if(s&&e){var o=Dt(s).hoistableScripts,u=Mr(e),d=o.get(u);d||(d=s.querySelector(ko(u)),d||(e=_({src:e,async:!0},i),(i=Mi.get(u))&&dh(e,i),d=s.createElement("script"),Ut(d),Nn(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function xS(e,i){da.M(e,i);var s=yr;if(s&&e){var o=Dt(s).hoistableScripts,u=Mr(e),d=o.get(u);d||(d=s.querySelector(ko(u)),d||(e=_({src:e,async:!0,type:"module"},i),(i=Mi.get(u))&&dh(e,i),d=s.createElement("script"),Ut(d),Nn(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Bg(e,i,s,o){var u=(u=Tt.current)?uc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Sr(s.href),s=Dt(u).hoistableStyles,o=s.get(i),o||(o={type:"style",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Sr(s.href);var d=Dt(u).hoistableStyles,y=d.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=u.querySelector(Vo(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Mi.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Mi.set(e,s),d||yS(u,e,s,y.state))),i&&o===null)throw Error(a(528,""));return y}if(i&&o!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Mr(s),s=Dt(u).hoistableScripts,o=s.get(i),o||(o={type:"script",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Sr(e){return'href="'+En(e)+'"'}function Vo(e){return'link[rel="stylesheet"]['+e+"]"}function Ig(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function yS(e,i,s,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Nn(i,"link",s),Ut(i),e.head.appendChild(i))}function Mr(e){return'[src="'+En(e)+'"]'}function ko(e){return"script[async]"+e}function Fg(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+En(s.href)+'"]');if(o)return i.instance=o,Ut(o),o;var u=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Ut(o),Nn(o,"style",u),fc(o,s.precedence,e),i.instance=o;case"stylesheet":u=Sr(s.href);var d=e.querySelector(Vo(u));if(d)return i.state.loading|=4,i.instance=d,Ut(d),d;o=Ig(s),(u=Mi.get(u))&&hh(o,u),d=(e.ownerDocument||e).createElement("link"),Ut(d);var y=d;return y._p=new Promise(function(b,B){y.onload=b,y.onerror=B}),Nn(d,"link",o),i.state.loading|=4,fc(d,s.precedence,e),i.instance=d;case"script":return d=Mr(s.src),(u=e.querySelector(ko(d)))?(i.instance=u,Ut(u),u):(o=s,(u=Mi.get(d))&&(o=_({},s),dh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Ut(u),Nn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,fc(o,s.precedence,e));return i.instance}function fc(e,i,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,y=0;y<o.length;y++){var b=o[y];if(b.dataset.precedence===i)d=b;else if(d!==u)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function hh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function dh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var hc=null;function Gg(e,i,s){if(hc===null){var o=new Map,u=hc=new Map;u.set(s,o)}else u=hc,o=u.get(s),o||(o=new Map,u.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var d=s[u];if(!(d[W]||d[en]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(i)||"";y=e+y;var b=o.get(y);b?b.push(d):o.set(y,[d])}}return o}function Hg(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function SS(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Vg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function MS(e,i,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=Sr(o.href),d=i.querySelector(Vo(u));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=dc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=d,Ut(d);return}d=i.ownerDocument||i,o=Ig(o),(u=Mi.get(u))&&hh(o,u),d=d.createElement("link"),Ut(d);var y=d;y._p=new Promise(function(b,B){y.onload=b,y.onerror=B}),Nn(d,"link",o),s.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=dc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var ph=0;function ES(e,i){return e.stylesheets&&e.count===0&&mc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&mc(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+i);0<e.imgBytes&&ph===0&&(ph=62500*iS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&mc(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>ph?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function dc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)mc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var pc=null;function mc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,pc=new Map,i.forEach(TS,e),pc=null,dc.call(e))}function TS(e,i){if(!(i.state.loading&4)){var s=pc.get(e);if(s)var o=s.get(null);else{s=new Map,pc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var y=u[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),o=y)}o&&s.set(null,o)}u=i.instance,y=u.getAttribute("data-precedence"),d=s.get(y)||o,d===o&&s.set(null,u),s.set(y,u),this.count++,o=dc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var Xo={$$typeof:D,Provider:null,Consumer:null,_currentValue:k,_currentValue2:k,_threadCount:0};function bS(e,i,s,o,u,d,y,b,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Re(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Re(0),this.hiddenUpdates=Re(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function kg(e,i,s,o,u,d,y,b,B,tt,ft,_t){return e=new bS(e,i,s,y,B,tt,ft,_t,b),i=1,d===!0&&(i|=24),d=ai(3,null,null,i),e.current=d,d.stateNode=e,i=Wu(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:o,isDehydrated:s,cache:i},Ku(d),e}function Xg(e){return e?(e=$s,e):$s}function qg(e,i,s,o,u,d){u=Xg(u),o.context===null?o.context=u:o.pendingContext=u,o=Pa(i),o.payload={element:s},d=d===void 0?null:d,d!==null&&(o.callback=d),s=za(e,o,i),s!==null&&(Jn(s,e,i),Mo(s,e,i))}function Wg(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function mh(e,i){Wg(e,i),(e=e.alternate)&&Wg(e,i)}function jg(e){if(e.tag===13||e.tag===31){var i=vs(e,67108864);i!==null&&Jn(i,e,67108864),mh(e,67108864)}}function Yg(e){if(e.tag===13||e.tag===31){var i=ci();i=ds(i);var s=vs(e,i);s!==null&&Jn(s,e,i),mh(e,i)}}var gc=!0;function AS(e,i,s,o){var u=z.T;z.T=null;var d=V.p;try{V.p=2,gh(e,i,s,o)}finally{V.p=d,z.T=u}}function RS(e,i,s,o){var u=z.T;z.T=null;var d=V.p;try{V.p=8,gh(e,i,s,o)}finally{V.p=d,z.T=u}}function gh(e,i,s,o){if(gc){var u=_h(o);if(u===null)nh(e,i,o,_c,s),Kg(e,o);else if(CS(u,e,i,s,o))o.stopPropagation();else if(Kg(e,o),i&4&&-1<wS.indexOf(e)){for(;u!==null;){var d=j(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=Ct(d.pendingLanes);if(y!==0){var b=d;for(b.pendingLanes|=2,b.entangledLanes|=2;y;){var B=1<<31-te(y);b.entanglements[1]|=B,y&=~B}qi(d),(Le&6)===0&&($l=dt()+500,Io(0))}}break;case 31:case 13:b=vs(d,2),b!==null&&Jn(b,d,2),ec(),mh(d,2)}if(d=_h(o),d===null&&nh(e,i,o,_c,s),d===u)break;u=d}u!==null&&o.stopPropagation()}else nh(e,i,o,null,s)}}function _h(e){return e=vu(e),vh(e)}var _c=null;function vh(e){if(_c=null,e=rt(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=f(i),e!==null)return e;e=null}else if(s===31){if(e=h(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return _c=e,null}function Zg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Et()){case gt:return 2;case Wt:return 8;case Lt:case zt:return 32;case ve:return 268435456;default:return 32}default:return 32}}var xh=!1,ja=null,Ya=null,Za=null,qo=new Map,Wo=new Map,Ka=[],wS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Kg(e,i){switch(e){case"focusin":case"focusout":ja=null;break;case"dragenter":case"dragleave":Ya=null;break;case"mouseover":case"mouseout":Za=null;break;case"pointerover":case"pointerout":qo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wo.delete(i.pointerId)}}function jo(e,i,s,o,u,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:s,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},i!==null&&(i=j(i),i!==null&&jg(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function CS(e,i,s,o,u){switch(i){case"focusin":return ja=jo(ja,e,i,s,o,u),!0;case"dragenter":return Ya=jo(Ya,e,i,s,o,u),!0;case"mouseover":return Za=jo(Za,e,i,s,o,u),!0;case"pointerover":var d=u.pointerId;return qo.set(d,jo(qo.get(d)||null,e,i,s,o,u)),!0;case"gotpointercapture":return d=u.pointerId,Wo.set(d,jo(Wo.get(d)||null,e,i,s,o,u)),!0}return!1}function Qg(e){var i=rt(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=f(s),i!==null){e.blockedOn=i,ps(e.priority,function(){Yg(s)});return}}else if(i===31){if(i=h(s),i!==null){e.blockedOn=i,ps(e.priority,function(){Yg(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=_h(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);_u=o,s.target.dispatchEvent(o),_u=null}else return i=j(s),i!==null&&jg(i),e.blockedOn=s,!1;i.shift()}return!0}function Jg(e,i,s){vc(e)&&s.delete(i)}function DS(){xh=!1,ja!==null&&vc(ja)&&(ja=null),Ya!==null&&vc(Ya)&&(Ya=null),Za!==null&&vc(Za)&&(Za=null),qo.forEach(Jg),Wo.forEach(Jg)}function xc(e,i){e.blockedOn===i&&(e.blockedOn=null,xh||(xh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,DS)))}var yc=null;function $g(e){yc!==e&&(yc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){yc===e&&(yc=null);for(var i=0;i<e.length;i+=3){var s=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(vh(o||s)===null)continue;break}var d=j(s);d!==null&&(e.splice(i,3),i-=3,_f(d,{pending:!0,data:u,method:s.method,action:o},o,u))}}))}function Er(e){function i(B){return xc(B,e)}ja!==null&&xc(ja,e),Ya!==null&&xc(Ya,e),Za!==null&&xc(Za,e),qo.forEach(i),Wo.forEach(i);for(var s=0;s<Ka.length;s++){var o=Ka[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Ka.length&&(s=Ka[0],s.blockedOn===null);)Qg(s),s.blockedOn===null&&Ka.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var u=s[o],d=s[o+1],y=u[wn]||null;if(typeof d=="function")y||$g(s);else if(y){var b=null;if(d&&d.hasAttribute("formAction")){if(u=d,y=d[wn]||null)b=y.formAction;else if(vh(u)!==null)continue}else b=y.action;typeof b=="function"?s[o+1]=b:(s.splice(o,3),o-=3),$g(s)}}}function t_(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function yh(e){this._internalRoot=e}Sc.prototype.render=yh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,o=ci();qg(s,o,e,i,null,null)},Sc.prototype.unmount=yh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;qg(e.current,2,null,e,null,null),ec(),i[Zi]=null}};function Sc(e){this._internalRoot=e}Sc.prototype.unstable_scheduleHydration=function(e){if(e){var i=ao();e={blockedOn:null,target:e,priority:i};for(var s=0;s<Ka.length&&i!==0&&i<Ka[s].priority;s++);Ka.splice(s,0,e),s===0&&Qg(e)}};var e_=t.version;if(e_!=="19.2.8")throw Error(a(527,e_,"19.2.8"));V.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=m(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var US={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Mc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Mc.isDisabled&&Mc.supportsFiber)try{Kt=Mc.inject(US),jt=Mc}catch{}}return Zo.createRoot=function(e,i){if(!l(e))throw Error(a(299));var s=!1,o="",u=l0,d=c0,y=u0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=kg(e,1,!1,null,null,s,o,null,u,d,y,t_),e[Zi]=i.current,eh(e),new yh(i)},Zo.hydrateRoot=function(e,i,s){if(!l(e))throw Error(a(299));var o=!1,u="",d=l0,y=c0,b=u0,B=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(d=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(b=s.onRecoverableError),s.formState!==void 0&&(B=s.formState)),i=kg(e,1,!0,i,s??null,o,u,B,d,y,b,t_),i.context=Xg(null),s=i.current,o=ci(),o=ds(o),u=Pa(o),u.callback=null,za(s,u,o),s=o,i.current.lanes=s,Rn(i,s),qi(i),e[Zi]=i.current,eh(e),new Sc(i)},Zo.version="19.2.8",Zo}var f_;function kS(){if(f_)return Eh.exports;f_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Eh.exports=VS(),Eh.exports}var XS=kS();const qS=zv(XS),h_=r=>{let t;const n=new Set,a=(m,g)=>{const _=typeof m=="function"?m(t):m;if(!Object.is(_,t)){const x=t;t=g??(typeof _!="object"||_===null)?_:Object.assign({},t,_),n.forEach(M=>M(t,x))}},l=()=>t,h={setState:a,getState:l,getInitialState:()=>p,subscribe:m=>(n.add(m),()=>n.delete(m))},p=t=r(a,l,h);return h},WS=(r=>r?h_(r):h_),jS=r=>r;function YS(r,t=jS){const n=il.useSyncExternalStore(r.subscribe,il.useCallback(()=>t(r.getState()),[r,t]),il.useCallback(()=>t(r.getInitialState()),[r,t]));return il.useDebugValue(n),n}const d_=r=>{const t=WS(r),n=a=>YS(t,a);return Object.assign(n,t),n},ZS=(r=>r?d_(r):d_),Rh=1/60,p_=100,m_=100,KS=35,QS=100,JS=20,$S=1.5,Ja=200,Tr=60,tM=5,g_=1.5,eM=3,nM=2,__=30,wh=200,Ch=60,Dh=150,iM=.9,v_=3.5,x_=2.2,Ec=15,Uh=8,_d=8,aM=20,sM=2.5,rM=10,oM=.14,lM=.2,cM=.4,uM=.05,fM=1.2,hM=60,dM=6,pM=2,Lh=4,mM=.3,gM=2.5,_M=.4,y_={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,bossFight:!1,bossName:"",introActive:!1,edgePulseAt:0,timeDilationUntil:0,lockOn:!1};function S_(r){return{id:r,pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0},hp:p_,maxHp:p_,energy:m_,maxEnergy:m_,speed:JS,weapon:1,weapons:[1,2,3],specialGauge:0,maxSpecialGauge:QS,invulnTimer:0,alive:!0,score:0,kills:0,combo:0}}function M_(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:.5,aimY:.5,weaponSwitch:0,boost:!1,brake:!1,dodge:!1,special:!1,lockToggle:!1,pause:!1}}const Ye=ZS(r=>({game:{...y_},players:[S_(0)],inputs:[M_()],setGame:t=>r(n=>({game:{...n.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),triggerEdgePulse:()=>r(t=>({game:{...t.game,edgePulseAt:performance.now()}})),triggerTimeDilation:t=>r(n=>({game:{...n.game,timeDilationUntil:performance.now()+t*1e3}})),resetGame:()=>r({game:{...y_},players:[S_(0)],inputs:[M_()]})})),Nh=({size:r=80,opacity:t=.5})=>Q.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[Q.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#FFEE00",strokeWidth:"3"}),Q.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#FFEE00",strokeWidth:"2"})]}),E_=()=>{const r=Ye(t=>t.setGame);return Q.jsxs("div",{className:"cp-bg w-full h-full relative overflow-hidden flex items-center justify-center",children:[Q.jsx("div",{className:"cp-watermark"}),Q.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:Q.jsx(Nh,{size:520,opacity:.08})}),Q.jsxs("div",{className:"relative z-10 mx-auto w-[520px] max-w-[92vw] cp-frame px-6 py-6",children:[Q.jsx("span",{className:"cp-corner-bl"}),Q.jsx("span",{className:"cp-corner-br"}),Q.jsxs("div",{className:"flex items-start gap-4",children:[Q.jsxs("div",{className:"flex-1",children:[Q.jsxs("div",{className:"cp-label text-[12px] tracking-[0.4em] mb-1",children:[Q.jsx("span",{style:{color:"#ff3030"},children:"下"}),Q.jsx("span",{children:" 一 "}),Q.jsx("span",{style:{color:"#ff3030"},children:"战"}),Q.jsx("span",{children:" 高 达"})]}),Q.jsx("h1",{className:"cp-title leading-none",style:{fontSize:"46px"},children:"纯白枪骑兵"}),Q.jsx("div",{className:"mt-1 cp-label text-[11px] tracking-[0.3em]",style:{color:"#FFEE00"},children:"SILVER LANCER"})]}),Q.jsx("div",{className:"mt-1",children:Q.jsx(Nh,{size:56,opacity:.85})})]}),Q.jsxs("div",{className:"mt-6 border-t border-[#FFEE00]/40 pt-4 space-y-2",children:[Q.jsx("button",{onClick:()=>r({screen:"pve",gameMode:"pve"}),className:"cp-btn w-full py-2 text-base",children:"开始游戏"}),Q.jsx("button",{className:"cp-btn w-full py-2 text-base opacity-60 cursor-default",disabled:!0,children:"操作指南"}),Q.jsx("button",{className:"cp-btn w-full py-2 text-base opacity-60 cursor-default",disabled:!0,children:"游戏设置"}),Q.jsx("button",{className:"cp-btn w-full py-2 text-base opacity-60 cursor-default",disabled:!0,children:"游戏信息"})]}),Q.jsx("div",{className:"mt-5 flex items-end justify-center",children:Q.jsxs("div",{className:"text-center",children:[Q.jsx(Nh,{size:42,opacity:.95}),Q.jsx("div",{className:"cp-label text-[11px] tracking-[0.25em] mt-1",children:"PHIXCAT"}),Q.jsx("div",{className:"cp-num text-[8px] tracking-wider mt-1",style:{color:T_},children:"FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79"}),Q.jsx("div",{className:"cp-num text-[8px] tracking-wider",style:{color:T_},children:"Copyrights 2007—2008 phixcat All rights reserved"})]})})]}),Q.jsx("div",{className:"hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none",children:Q.jsxs("svg",{viewBox:"0 0 200 280",width:"280",height:"380",fill:"#ffffff",children:[Q.jsx("polygon",{points:"80,30 120,30 130,55 70,55"}),Q.jsx("rect",{x:"70",y:"55",width:"60",height:"25"}),Q.jsx("polygon",{points:"30,75 70,80 70,130 25,130"}),Q.jsx("polygon",{points:"130,80 170,75 175,130 130,130"}),Q.jsx("rect",{x:"55",y:"80",width:"90",height:"90"}),Q.jsx("polygon",{points:"80,90 120,90 100,140",fill:"#000"}),Q.jsx("rect",{x:"20",y:"130",width:"40",height:"80"}),Q.jsx("rect",{x:"140",y:"130",width:"40",height:"80"}),Q.jsx("polygon",{points:"60,170 140,170 150,210 50,210"}),Q.jsx("polygon",{points:"55,210 95,210 90,275 60,275"}),Q.jsx("polygon",{points:"105,210 145,210 140,275 110,275"})]})})]})},T_="rgba(255, 238, 0, 0.30)";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lp="170",vM=0,b_=1,xM=2,Bv=1,yM=2,xa=3,fs=0,Xn=1,ya=2,Ea=0,Vr=1,rl=2,A_=3,R_=4,SM=5,Fs=100,MM=101,EM=102,TM=103,bM=104,AM=200,RM=201,wM=202,CM=203,vd=204,xd=205,DM=206,UM=207,LM=208,NM=209,OM=210,PM=211,zM=212,BM=213,IM=214,yd=0,Sd=1,Md=2,qr=3,Ed=4,Td=5,bd=6,Ad=7,Iv=0,FM=1,GM=2,us=0,Fv=1,Gv=2,Hv=3,Vv=4,HM=5,kv=6,Xv=7,qv=300,Wr=301,jr=302,Rd=303,wd=304,uu=306,Cd=1e3,Vs=1001,Dd=1002,Fi=1003,VM=1004,Tc=1005,Yi=1006,Oh=1007,ks=1008,ba=1009,Wv=1010,jv=1011,ol=1012,cp=1013,Xs=1014,Sa=1015,Qr=1016,up=1017,fp=1018,Yr=1020,Yv=35902,Zv=1021,Kv=1022,Ii=1023,Qv=1024,Jv=1025,kr=1026,Zr=1027,$v=1028,hp=1029,tx=1030,dp=1031,pp=1033,Qc=33776,Jc=33777,$c=33778,tu=33779,Ud=35840,Ld=35841,Nd=35842,Od=35843,Pd=36196,zd=37492,Bd=37496,Id=37808,Fd=37809,Gd=37810,Hd=37811,Vd=37812,kd=37813,Xd=37814,qd=37815,Wd=37816,jd=37817,Yd=37818,Zd=37819,Kd=37820,Qd=37821,eu=36492,Jd=36494,$d=36495,ex=36283,tp=36284,ep=36285,np=36286,kM=3200,XM=3201,qM=0,WM=1,ls="",bi="srgb",Jr="srgb-linear",fu="linear",Ie="srgb",br=7680,w_=519,jM=512,YM=513,ZM=514,nx=515,KM=516,QM=517,JM=518,$M=519,C_=35044,D_="300 es",Ma=2e3,au=2001;class $r{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const a=this._listeners;return a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const a=this._listeners[t.type];if(a!==void 0){t.target=this;const l=a.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ph=Math.PI/180,ip=180/Math.PI;function ll(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Fn[r&255]+Fn[r>>8&255]+Fn[r>>16&255]+Fn[r>>24&255]+"-"+Fn[t&255]+Fn[t>>8&255]+"-"+Fn[t>>16&15|64]+Fn[t>>24&255]+"-"+Fn[n&63|128]+Fn[n>>8&255]+"-"+Fn[n>>16&255]+Fn[n>>24&255]+Fn[a&255]+Fn[a>>8&255]+Fn[a>>16&255]+Fn[a>>24&255]).toLowerCase()}function ei(r,t,n){return Math.max(t,Math.min(n,r))}function tE(r,t){return(r%t+t)%t}function zh(r,t,n){return(1-n)*r+n*t}function Ko(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function $n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Ce{constructor(t=0,n=0){Ce.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,l=t.elements;return this.x=l[0]*n+l[3]*a+l[6],this.y=l[1]*n+l[4]*a+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ei(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*a-f*l+t.x,this.y=c*l+f*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,n,a,l,c,f,h,p,m){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,h,p,m)}set(t,n,a,l,c,f,h,p,m){const g=this.elements;return g[0]=t,g[1]=l,g[2]=h,g[3]=n,g[4]=c,g[5]=p,g[6]=a,g[7]=f,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],h=a[3],p=a[6],m=a[1],g=a[4],_=a[7],x=a[2],M=a[5],E=a[8],T=l[0],S=l[3],v=l[6],U=l[1],D=l[4],w=l[7],q=l[2],I=l[5],P=l[8];return c[0]=f*T+h*U+p*q,c[3]=f*S+h*D+p*I,c[6]=f*v+h*w+p*P,c[1]=m*T+g*U+_*q,c[4]=m*S+g*D+_*I,c[7]=m*v+g*w+_*P,c[2]=x*T+M*U+E*q,c[5]=x*S+M*D+E*I,c[8]=x*v+M*w+E*P,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8];return n*f*g-n*h*m-a*c*g+a*h*p+l*c*m-l*f*p}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],_=g*f-h*m,x=h*p-g*c,M=m*c-f*p,E=n*_+a*x+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=_*T,t[1]=(l*m-g*a)*T,t[2]=(h*a-l*f)*T,t[3]=x*T,t[4]=(g*n-l*p)*T,t[5]=(l*c-h*n)*T,t[6]=M*T,t[7]=(a*p-m*n)*T,t[8]=(f*n-a*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,l,c,f,h){const p=Math.cos(c),m=Math.sin(c);return this.set(a*p,a*m,-a*(p*f+m*h)+f+t,-l*m,l*p,-l*(-m*f+p*h)+h+n,0,0,1),this}scale(t,n){return this.premultiply(Bh.makeScale(t,n)),this}rotate(t){return this.premultiply(Bh.makeRotation(-t)),this}translate(t,n){return this.premultiply(Bh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<9;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bh=new ce;function ix(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function su(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function eE(){const r=su("canvas");return r.style.display="block",r}const U_={};function al(r){r in U_||(U_[r]=!0,console.warn(r))}function nE(r,t,n){return new Promise(function(a,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}function iE(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function aE(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ae={enabled:!0,workingColorSpace:Jr,spaces:{},convert:function(r,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===Ie&&(r.r=Ta(r.r),r.g=Ta(r.g),r.b=Ta(r.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Ie&&(r.r=Xr(r.r),r.g=Xr(r.g),r.b=Xr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ls?fu:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,n){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Ta(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Xr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const L_=[.64,.33,.3,.6,.15,.06],N_=[.2126,.7152,.0722],O_=[.3127,.329],P_=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),z_=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ae.define({[Jr]:{primaries:L_,whitePoint:O_,transfer:fu,toXYZ:P_,fromXYZ:z_,luminanceCoefficients:N_,workingColorSpaceConfig:{unpackColorSpace:bi},outputColorSpaceConfig:{drawingBufferColorSpace:bi}},[bi]:{primaries:L_,whitePoint:O_,transfer:Ie,toXYZ:P_,fromXYZ:z_,luminanceCoefficients:N_,outputColorSpaceConfig:{drawingBufferColorSpace:bi}}});let Ar;class sE{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ar===void 0&&(Ar=su("canvas")),Ar.width=t.width,Ar.height=t.height;const a=Ar.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),n=Ar}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=su("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const l=a.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ta(c[f]/255)*255;return a.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Ta(n[a]/255)*255):n[a]=Ta(n[a]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rE=0;class ax{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rE++}),this.uuid=ll(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Ih(l[f].image)):c.push(Ih(l[f]))}else c=Ih(l);a.url=c}return n||(t.images[this.uuid]=a),a}}function Ih(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?sE.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let oE=0;class ni extends $r{constructor(t=ni.DEFAULT_IMAGE,n=ni.DEFAULT_MAPPING,a=Vs,l=Vs,c=Yi,f=ks,h=Ii,p=ba,m=ni.DEFAULT_ANISOTROPY,g=ls){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=ll(),this.name="",this.source=new ax(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Cd:t.x=t.x-Math.floor(t.x);break;case Vs:t.x=t.x<0?0:1;break;case Dd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Cd:t.y=t.y-Math.floor(t.y);break;case Vs:t.y=t.y<0?0:1;break;case Dd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ni.DEFAULT_IMAGE=null;ni.DEFAULT_MAPPING=qv;ni.DEFAULT_ANISOTROPY=1;class cn{constructor(t=0,n=0,a=0,l=1){cn.prototype.isVector4=!0,this.x=t,this.y=n,this.z=a,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,l){return this.x=t,this.y=n,this.z=a,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*a+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*a+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*a+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*a+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,l,c;const p=t.elements,m=p[0],g=p[4],_=p[8],x=p[1],M=p[5],E=p[9],T=p[2],S=p[6],v=p[10];if(Math.abs(g-x)<.01&&Math.abs(_-T)<.01&&Math.abs(E-S)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+T)<.1&&Math.abs(E+S)<.1&&Math.abs(m+M+v-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const D=(m+1)/2,w=(M+1)/2,q=(v+1)/2,I=(g+x)/4,P=(_+T)/4,G=(E+S)/4;return D>w&&D>q?D<.01?(a=0,l=.707106781,c=.707106781):(a=Math.sqrt(D),l=I/a,c=P/a):w>q?w<.01?(a=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),a=I/l,c=G/l):q<.01?(a=.707106781,l=.707106781,c=0):(c=Math.sqrt(q),a=P/c,l=G/c),this.set(a,l,c,n),this}let U=Math.sqrt((S-E)*(S-E)+(_-T)*(_-T)+(x-g)*(x-g));return Math.abs(U)<.001&&(U=1),this.x=(S-E)/U,this.y=(_-T)/U,this.z=(x-g)/U,this.w=Math.acos((m+M+v-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lE extends $r{constructor(t=1,n=1,a={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new cn(0,0,t,n),this.scissorTest=!1,this.viewport=new cn(0,0,t,n);const l={width:t,height:n,depth:1};a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},a);const c=new ni(l,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace);c.flipY=!1,c.generateMipmaps=a.generateMipmaps,c.internalFormat=a.internalFormat,this.textures=[];const f=a.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0;this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=a;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let a=0,l=t.textures.length;a<l;a++)this.textures[a]=t.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new ax(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hs extends lE{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class sx extends ni{constructor(t=null,n=1,a=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=Vs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class cE extends ni{constructor(t=null,n=1,a=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=Vs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cl{constructor(t=0,n=0,a=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=l}static slerpFlat(t,n,a,l,c,f,h){let p=a[l+0],m=a[l+1],g=a[l+2],_=a[l+3];const x=c[f+0],M=c[f+1],E=c[f+2],T=c[f+3];if(h===0){t[n+0]=p,t[n+1]=m,t[n+2]=g,t[n+3]=_;return}if(h===1){t[n+0]=x,t[n+1]=M,t[n+2]=E,t[n+3]=T;return}if(_!==T||p!==x||m!==M||g!==E){let S=1-h;const v=p*x+m*M+g*E+_*T,U=v>=0?1:-1,D=1-v*v;if(D>Number.EPSILON){const q=Math.sqrt(D),I=Math.atan2(q,v*U);S=Math.sin(S*I)/q,h=Math.sin(h*I)/q}const w=h*U;if(p=p*S+x*w,m=m*S+M*w,g=g*S+E*w,_=_*S+T*w,S===1-h){const q=1/Math.sqrt(p*p+m*m+g*g+_*_);p*=q,m*=q,g*=q,_*=q}}t[n]=p,t[n+1]=m,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,l,c,f){const h=a[l],p=a[l+1],m=a[l+2],g=a[l+3],_=c[f],x=c[f+1],M=c[f+2],E=c[f+3];return t[n]=h*E+g*_+p*M-m*x,t[n+1]=p*E+g*x+m*_-h*M,t[n+2]=m*E+g*M+h*x-p*_,t[n+3]=g*E-h*_-p*x-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,l){return this._x=t,this._y=n,this._z=a,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,l=t._y,c=t._z,f=t._order,h=Math.cos,p=Math.sin,m=h(a/2),g=h(l/2),_=h(c/2),x=p(a/2),M=p(l/2),E=p(c/2);switch(f){case"XYZ":this._x=x*g*_+m*M*E,this._y=m*M*_-x*g*E,this._z=m*g*E+x*M*_,this._w=m*g*_-x*M*E;break;case"YXZ":this._x=x*g*_+m*M*E,this._y=m*M*_-x*g*E,this._z=m*g*E-x*M*_,this._w=m*g*_+x*M*E;break;case"ZXY":this._x=x*g*_-m*M*E,this._y=m*M*_+x*g*E,this._z=m*g*E+x*M*_,this._w=m*g*_-x*M*E;break;case"ZYX":this._x=x*g*_-m*M*E,this._y=m*M*_+x*g*E,this._z=m*g*E-x*M*_,this._w=m*g*_+x*M*E;break;case"YZX":this._x=x*g*_+m*M*E,this._y=m*M*_+x*g*E,this._z=m*g*E-x*M*_,this._w=m*g*_-x*M*E;break;case"XZY":this._x=x*g*_-m*M*E,this._y=m*M*_-x*g*E,this._z=m*g*E+x*M*_,this._w=m*g*_+x*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,l=Math.sin(a);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],l=n[4],c=n[8],f=n[1],h=n[5],p=n[9],m=n[2],g=n[6],_=n[10],x=a+h+_;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(g-p)*M,this._y=(c-m)*M,this._z=(f-l)*M}else if(a>h&&a>_){const M=2*Math.sqrt(1+a-h-_);this._w=(g-p)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+m)/M}else if(h>_){const M=2*Math.sqrt(1+h-a-_);this._w=(c-m)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(p+g)/M}else{const M=2*Math.sqrt(1+_-a-h);this._w=(f-l)/M,this._x=(c+m)/M,this._y=(p+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<Number.EPSILON?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ei(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const l=Math.min(1,n/a);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,l=t._y,c=t._z,f=t._w,h=n._x,p=n._y,m=n._z,g=n._w;return this._x=a*g+f*h+l*m-c*p,this._y=l*g+f*p+c*h-a*m,this._z=c*g+f*m+a*p-l*h,this._w=f*g-a*h-l*p-c*m,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const a=this._x,l=this._y,c=this._z,f=this._w;let h=f*t._w+a*t._x+l*t._y+c*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=f,this._x=a,this._y=l,this._z=c,this;const p=1-h*h;if(p<=Number.EPSILON){const M=1-n;return this._w=M*f+n*this._w,this._x=M*a+n*this._x,this._y=M*l+n*this._y,this._z=M*c+n*this._z,this.normalize(),this}const m=Math.sqrt(p),g=Math.atan2(m,h),_=Math.sin((1-n)*g)/m,x=Math.sin(n*g)/m;return this._w=f*_+this._w*x,this._x=a*_+this._x*x,this._y=l*_+this._y*x,this._z=c*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),l=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,n=0,a=0){J.prototype.isVector3=!0,this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(B_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(B_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*l,this.y=c[1]*n+c[4]*a+c[7]*l,this.z=c[2]*n+c[5]*a+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*a+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*a+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*a+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,a=this.y,l=this.z,c=t.x,f=t.y,h=t.z,p=t.w,m=2*(f*l-h*a),g=2*(h*n-c*l),_=2*(c*a-f*n);return this.x=n+p*m+f*_-h*g,this.y=a+p*g+h*m-c*_,this.z=l+p*_+c*g-f*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*l,this.y=c[1]*n+c[5]*a+c[9]*l,this.z=c[2]*n+c[6]*a+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,l=t.y,c=t.z,f=n.x,h=n.y,p=n.z;return this.x=l*p-c*h,this.y=c*f-a*p,this.z=a*h-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Fh.copy(this).projectOnVector(t),this.sub(Fh)}reflect(t){return this.sub(Fh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ei(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,l=this.z-t.z;return n*n+a*a+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const l=Math.sin(n)*t;return this.x=l*Math.sin(a),this.y=Math.cos(n)*t,this.z=l*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fh=new J,B_=new cl;class ul{constructor(t=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Oi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Oi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Oi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)t.isMesh===!0?t.getVertexPosition(f,Oi):Oi.fromBufferAttribute(c,f),Oi.applyMatrix4(t.matrixWorld),this.expandByPoint(Oi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),bc.copy(a.boundingBox)),bc.applyMatrix4(t.matrixWorld),this.union(bc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Oi),Oi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qo),Ac.subVectors(this.max,Qo),Rr.subVectors(t.a,Qo),wr.subVectors(t.b,Qo),Cr.subVectors(t.c,Qo),$a.subVectors(wr,Rr),ts.subVectors(Cr,wr),Us.subVectors(Rr,Cr);let n=[0,-$a.z,$a.y,0,-ts.z,ts.y,0,-Us.z,Us.y,$a.z,0,-$a.x,ts.z,0,-ts.x,Us.z,0,-Us.x,-$a.y,$a.x,0,-ts.y,ts.x,0,-Us.y,Us.x,0];return!Gh(n,Rr,wr,Cr,Ac)||(n=[1,0,0,0,1,0,0,0,1],!Gh(n,Rr,wr,Cr,Ac))?!1:(Rc.crossVectors($a,ts),n=[Rc.x,Rc.y,Rc.z],Gh(n,Rr,wr,Cr,Ac))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Oi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Oi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const pa=[new J,new J,new J,new J,new J,new J,new J,new J],Oi=new J,bc=new ul,Rr=new J,wr=new J,Cr=new J,$a=new J,ts=new J,Us=new J,Qo=new J,Ac=new J,Rc=new J,Ls=new J;function Gh(r,t,n,a,l){for(let c=0,f=r.length-3;c<=f;c+=3){Ls.fromArray(r,c);const h=l.x*Math.abs(Ls.x)+l.y*Math.abs(Ls.y)+l.z*Math.abs(Ls.z),p=t.dot(Ls),m=n.dot(Ls),g=a.dot(Ls);if(Math.max(-Math.max(p,m,g),Math.min(p,m,g))>h)return!1}return!0}const uE=new ul,Jo=new J,Hh=new J;class fl{constructor(t=new J,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):uE.setFromPoints(t).getCenter(a);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Jo.subVectors(t,this.center);const n=Jo.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),l=(a-this.radius)*.5;this.center.addScaledVector(Jo,l/a),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Hh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Jo.copy(t.center).add(Hh)),this.expandByPoint(Jo.copy(t.center).sub(Hh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ma=new J,Vh=new J,wc=new J,es=new J,kh=new J,Cc=new J,Xh=new J;class mp{constructor(t=new J,n=new J(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ma)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=ma.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ma.copy(this.origin).addScaledVector(this.direction,n),ma.distanceToSquared(t))}distanceSqToSegment(t,n,a,l){Vh.copy(t).add(n).multiplyScalar(.5),wc.copy(n).sub(t).normalize(),es.copy(this.origin).sub(Vh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(wc),h=es.dot(this.direction),p=-es.dot(wc),m=es.lengthSq(),g=Math.abs(1-f*f);let _,x,M,E;if(g>0)if(_=f*p-h,x=f*h-p,E=c*g,_>=0)if(x>=-E)if(x<=E){const T=1/g;_*=T,x*=T,M=_*(_+f*x+2*h)+x*(f*_+x+2*p)+m}else x=c,_=Math.max(0,-(f*x+h)),M=-_*_+x*(x+2*p)+m;else x=-c,_=Math.max(0,-(f*x+h)),M=-_*_+x*(x+2*p)+m;else x<=-E?(_=Math.max(0,-(-f*c+h)),x=_>0?-c:Math.min(Math.max(-c,-p),c),M=-_*_+x*(x+2*p)+m):x<=E?(_=0,x=Math.min(Math.max(-c,-p),c),M=x*(x+2*p)+m):(_=Math.max(0,-(f*c+h)),x=_>0?c:Math.min(Math.max(-c,-p),c),M=-_*_+x*(x+2*p)+m);else x=f>0?-c:c,_=Math.max(0,-(f*x+h)),M=-_*_+x*(x+2*p)+m;return a&&a.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Vh).addScaledVector(wc,x),M}intersectSphere(t,n){ma.subVectors(t.center,this.origin);const a=ma.dot(this.direction),l=ma.dot(ma)-a*a,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=a-f,p=a+f;return p<0?null:h<0?this.at(p,n):this.at(h,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,l,c,f,h,p;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return m>=0?(a=(t.min.x-x.x)*m,l=(t.max.x-x.x)*m):(a=(t.max.x-x.x)*m,l=(t.min.x-x.x)*m),g>=0?(c=(t.min.y-x.y)*g,f=(t.max.y-x.y)*g):(c=(t.max.y-x.y)*g,f=(t.min.y-x.y)*g),a>f||c>l||((c>a||isNaN(a))&&(a=c),(f<l||isNaN(l))&&(l=f),_>=0?(h=(t.min.z-x.z)*_,p=(t.max.z-x.z)*_):(h=(t.max.z-x.z)*_,p=(t.min.z-x.z)*_),a>p||h>l)||((h>a||a!==a)&&(a=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(a>=0?a:l,n)}intersectsBox(t){return this.intersectBox(t,ma)!==null}intersectTriangle(t,n,a,l,c){kh.subVectors(n,t),Cc.subVectors(a,t),Xh.crossVectors(kh,Cc);let f=this.direction.dot(Xh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;es.subVectors(this.origin,t);const p=h*this.direction.dot(Cc.crossVectors(es,Cc));if(p<0)return null;const m=h*this.direction.dot(kh.cross(es));if(m<0||p+m>f)return null;const g=-h*es.dot(Xh);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class sn{constructor(t,n,a,l,c,f,h,p,m,g,_,x,M,E,T,S){sn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,h,p,m,g,_,x,M,E,T,S)}set(t,n,a,l,c,f,h,p,m,g,_,x,M,E,T,S){const v=this.elements;return v[0]=t,v[4]=n,v[8]=a,v[12]=l,v[1]=c,v[5]=f,v[9]=h,v[13]=p,v[2]=m,v[6]=g,v[10]=_,v[14]=x,v[3]=M,v[7]=E,v[11]=T,v[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sn().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,a=t.elements,l=1/Dr.setFromMatrixColumn(t,0).length(),c=1/Dr.setFromMatrixColumn(t,1).length(),f=1/Dr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*l,n[1]=a[1]*l,n[2]=a[2]*l,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*f,n[9]=a[9]*f,n[10]=a[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,l=t.y,c=t.z,f=Math.cos(a),h=Math.sin(a),p=Math.cos(l),m=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const x=f*g,M=f*_,E=h*g,T=h*_;n[0]=p*g,n[4]=-p*_,n[8]=m,n[1]=M+E*m,n[5]=x-T*m,n[9]=-h*p,n[2]=T-x*m,n[6]=E+M*m,n[10]=f*p}else if(t.order==="YXZ"){const x=p*g,M=p*_,E=m*g,T=m*_;n[0]=x+T*h,n[4]=E*h-M,n[8]=f*m,n[1]=f*_,n[5]=f*g,n[9]=-h,n[2]=M*h-E,n[6]=T+x*h,n[10]=f*p}else if(t.order==="ZXY"){const x=p*g,M=p*_,E=m*g,T=m*_;n[0]=x-T*h,n[4]=-f*_,n[8]=E+M*h,n[1]=M+E*h,n[5]=f*g,n[9]=T-x*h,n[2]=-f*m,n[6]=h,n[10]=f*p}else if(t.order==="ZYX"){const x=f*g,M=f*_,E=h*g,T=h*_;n[0]=p*g,n[4]=E*m-M,n[8]=x*m+T,n[1]=p*_,n[5]=T*m+x,n[9]=M*m-E,n[2]=-m,n[6]=h*p,n[10]=f*p}else if(t.order==="YZX"){const x=f*p,M=f*m,E=h*p,T=h*m;n[0]=p*g,n[4]=T-x*_,n[8]=E*_+M,n[1]=_,n[5]=f*g,n[9]=-h*g,n[2]=-m*g,n[6]=M*_+E,n[10]=x-T*_}else if(t.order==="XZY"){const x=f*p,M=f*m,E=h*p,T=h*m;n[0]=p*g,n[4]=-_,n[8]=m*g,n[1]=x*_+T,n[5]=f*g,n[9]=M*_-E,n[2]=E*_-M,n[6]=h*g,n[10]=T*_+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fE,t,hE)}lookAt(t,n,a){const l=this.elements;return ui.subVectors(t,n),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),ns.crossVectors(a,ui),ns.lengthSq()===0&&(Math.abs(a.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),ns.crossVectors(a,ui)),ns.normalize(),Dc.crossVectors(ui,ns),l[0]=ns.x,l[4]=Dc.x,l[8]=ui.x,l[1]=ns.y,l[5]=Dc.y,l[9]=ui.y,l[2]=ns.z,l[6]=Dc.z,l[10]=ui.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],h=a[4],p=a[8],m=a[12],g=a[1],_=a[5],x=a[9],M=a[13],E=a[2],T=a[6],S=a[10],v=a[14],U=a[3],D=a[7],w=a[11],q=a[15],I=l[0],P=l[4],G=l[8],L=l[12],R=l[1],F=l[5],et=l[9],st=l[13],ht=l[2],pt=l[6],z=l[10],V=l[14],k=l[3],xt=l[7],St=l[11],O=l[15];return c[0]=f*I+h*R+p*ht+m*k,c[4]=f*P+h*F+p*pt+m*xt,c[8]=f*G+h*et+p*z+m*St,c[12]=f*L+h*st+p*V+m*O,c[1]=g*I+_*R+x*ht+M*k,c[5]=g*P+_*F+x*pt+M*xt,c[9]=g*G+_*et+x*z+M*St,c[13]=g*L+_*st+x*V+M*O,c[2]=E*I+T*R+S*ht+v*k,c[6]=E*P+T*F+S*pt+v*xt,c[10]=E*G+T*et+S*z+v*St,c[14]=E*L+T*st+S*V+v*O,c[3]=U*I+D*R+w*ht+q*k,c[7]=U*P+D*F+w*pt+q*xt,c[11]=U*G+D*et+w*z+q*St,c[15]=U*L+D*st+w*V+q*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],l=t[8],c=t[12],f=t[1],h=t[5],p=t[9],m=t[13],g=t[2],_=t[6],x=t[10],M=t[14],E=t[3],T=t[7],S=t[11],v=t[15];return E*(+c*p*_-l*m*_-c*h*x+a*m*x+l*h*M-a*p*M)+T*(+n*p*M-n*m*x+c*f*x-l*f*M+l*m*g-c*p*g)+S*(+n*m*_-n*h*M-c*f*_+a*f*M+c*h*g-a*m*g)+v*(-l*h*g-n*p*_+n*h*x+l*f*_-a*f*x+a*p*g)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],_=t[9],x=t[10],M=t[11],E=t[12],T=t[13],S=t[14],v=t[15],U=_*S*m-T*x*m+T*p*M-h*S*M-_*p*v+h*x*v,D=E*x*m-g*S*m-E*p*M+f*S*M+g*p*v-f*x*v,w=g*T*m-E*_*m+E*h*M-f*T*M-g*h*v+f*_*v,q=E*_*p-g*T*p-E*h*x+f*T*x+g*h*S-f*_*S,I=n*U+a*D+l*w+c*q;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/I;return t[0]=U*P,t[1]=(T*x*c-_*S*c-T*l*M+a*S*M+_*l*v-a*x*v)*P,t[2]=(h*S*c-T*p*c+T*l*m-a*S*m-h*l*v+a*p*v)*P,t[3]=(_*p*c-h*x*c-_*l*m+a*x*m+h*l*M-a*p*M)*P,t[4]=D*P,t[5]=(g*S*c-E*x*c+E*l*M-n*S*M-g*l*v+n*x*v)*P,t[6]=(E*p*c-f*S*c-E*l*m+n*S*m+f*l*v-n*p*v)*P,t[7]=(f*x*c-g*p*c+g*l*m-n*x*m-f*l*M+n*p*M)*P,t[8]=w*P,t[9]=(E*_*c-g*T*c-E*a*M+n*T*M+g*a*v-n*_*v)*P,t[10]=(f*T*c-E*h*c+E*a*m-n*T*m-f*a*v+n*h*v)*P,t[11]=(g*h*c-f*_*c-g*a*m+n*_*m+f*a*M-n*h*M)*P,t[12]=q*P,t[13]=(g*T*l-E*_*l+E*a*x-n*T*x-g*a*S+n*_*S)*P,t[14]=(E*h*l-f*T*l-E*a*p+n*T*p+f*a*S-n*h*S)*P,t[15]=(f*_*l-g*h*l+g*a*p-n*_*p-f*a*x+n*h*x)*P,this}scale(t){const n=this.elements,a=t.x,l=t.y,c=t.z;return n[0]*=a,n[4]*=l,n[8]*=c,n[1]*=a,n[5]*=l,n[9]*=c,n[2]*=a,n[6]*=l,n[10]*=c,n[3]*=a,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,l))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),l=Math.sin(n),c=1-a,f=t.x,h=t.y,p=t.z,m=c*f,g=c*h;return this.set(m*f+a,m*h-l*p,m*p+l*h,0,m*h+l*p,g*h+a,g*p-l*f,0,m*p-l*h,g*p+l*f,c*p*p+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,l,c,f){return this.set(1,a,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,a){const l=this.elements,c=n._x,f=n._y,h=n._z,p=n._w,m=c+c,g=f+f,_=h+h,x=c*m,M=c*g,E=c*_,T=f*g,S=f*_,v=h*_,U=p*m,D=p*g,w=p*_,q=a.x,I=a.y,P=a.z;return l[0]=(1-(T+v))*q,l[1]=(M+w)*q,l[2]=(E-D)*q,l[3]=0,l[4]=(M-w)*I,l[5]=(1-(x+v))*I,l[6]=(S+U)*I,l[7]=0,l[8]=(E+D)*P,l[9]=(S-U)*P,l[10]=(1-(x+T))*P,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,a){const l=this.elements;let c=Dr.set(l[0],l[1],l[2]).length();const f=Dr.set(l[4],l[5],l[6]).length(),h=Dr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Pi.copy(this);const m=1/c,g=1/f,_=1/h;return Pi.elements[0]*=m,Pi.elements[1]*=m,Pi.elements[2]*=m,Pi.elements[4]*=g,Pi.elements[5]*=g,Pi.elements[6]*=g,Pi.elements[8]*=_,Pi.elements[9]*=_,Pi.elements[10]*=_,n.setFromRotationMatrix(Pi),a.x=c,a.y=f,a.z=h,this}makePerspective(t,n,a,l,c,f,h=Ma){const p=this.elements,m=2*c/(n-t),g=2*c/(a-l),_=(n+t)/(n-t),x=(a+l)/(a-l);let M,E;if(h===Ma)M=-(f+c)/(f-c),E=-2*f*c/(f-c);else if(h===au)M=-f/(f-c),E=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=g,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,l,c,f,h=Ma){const p=this.elements,m=1/(n-t),g=1/(a-l),_=1/(f-c),x=(n+t)*m,M=(a+l)*g;let E,T;if(h===Ma)E=(f+c)*_,T=-2*_;else if(h===au)E=c*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*g,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=T,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<16;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}}const Dr=new J,Pi=new sn,fE=new J(0,0,0),hE=new J(1,1,1),ns=new J,Dc=new J,ui=new J,I_=new sn,F_=new cl;class Aa{constructor(t=0,n=0,a=0,l=Aa.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,l=this._order){return this._x=t,this._y=n,this._z=a,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const l=t.elements,c=l[0],f=l[4],h=l[8],p=l[1],m=l[5],g=l[9],_=l[2],x=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(ei(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-ei(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ei(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-ei(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(ei(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-ei(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return I_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(I_,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return F_.setFromEuler(this),this.setFromQuaternion(F_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Aa.DEFAULT_ORDER="XYZ";class rx{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let dE=0;const G_=new J,Ur=new cl,ga=new sn,Uc=new J,$o=new J,pE=new J,mE=new cl,H_=new J(1,0,0),V_=new J(0,1,0),k_=new J(0,0,1),X_={type:"added"},gE={type:"removed"},Lr={type:"childadded",child:null},qh={type:"childremoved",child:null};class qn extends $r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dE++}),this.uuid=ll(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qn.DEFAULT_UP.clone();const t=new J,n=new Aa,a=new cl,l=new J(1,1,1);function c(){a.setFromEuler(n,!1)}function f(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new sn},normalMatrix:{value:new ce}}),this.matrix=new sn,this.matrixWorld=new sn,this.matrixAutoUpdate=qn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Ur.setFromAxisAngle(t,n),this.quaternion.multiply(Ur),this}rotateOnWorldAxis(t,n){return Ur.setFromAxisAngle(t,n),this.quaternion.premultiply(Ur),this}rotateX(t){return this.rotateOnAxis(H_,t)}rotateY(t){return this.rotateOnAxis(V_,t)}rotateZ(t){return this.rotateOnAxis(k_,t)}translateOnAxis(t,n){return G_.copy(t).applyQuaternion(this.quaternion),this.position.add(G_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(H_,t)}translateY(t){return this.translateOnAxis(V_,t)}translateZ(t){return this.translateOnAxis(k_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ga.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Uc.copy(t):Uc.set(t,n,a);const l=this.parent;this.updateWorldMatrix(!0,!1),$o.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ga.lookAt($o,Uc,this.up):ga.lookAt(Uc,$o,this.up),this.quaternion.setFromRotationMatrix(ga),l&&(ga.extractRotation(l.matrixWorld),Ur.setFromRotationMatrix(ga),this.quaternion.premultiply(Ur.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(X_),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(gE),qh.child=t,this.dispatchEvent(qh),qh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ga.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ga.multiply(t.parent.matrixWorld)),t.applyMatrix4(ga),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(X_),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,l=this.children.length;a<l;a++){const f=this.children[a].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,t,pE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,mE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n){const a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,g=p.length;m<g;m++){const _=p[m];c(t.shapes,_)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(c(t.materials,this.material[p]));l.material=h}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(c(t.animations,p))}}if(n){const h=f(t.geometries),p=f(t.materials),m=f(t.textures),g=f(t.images),_=f(t.shapes),x=f(t.skeletons),M=f(t.animations),E=f(t.nodes);h.length>0&&(a.geometries=h),p.length>0&&(a.materials=p),m.length>0&&(a.textures=m),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),x.length>0&&(a.skeletons=x),M.length>0&&(a.animations=M),E.length>0&&(a.nodes=E)}return a.object=l,a;function f(h){const p=[];for(const m in h){const g=h[m];delete g.metadata,p.push(g)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const l=t.children[a];this.add(l.clone())}return this}}qn.DEFAULT_UP=new J(0,1,0);qn.DEFAULT_MATRIX_AUTO_UPDATE=!0;qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zi=new J,_a=new J,Wh=new J,va=new J,Nr=new J,Or=new J,q_=new J,jh=new J,Yh=new J,Zh=new J,Kh=new cn,Qh=new cn,Jh=new cn;class Bi{constructor(t=new J,n=new J,a=new J){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,l){l.subVectors(a,n),zi.subVectors(t,n),l.cross(zi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,a,l,c){zi.subVectors(l,n),_a.subVectors(a,n),Wh.subVectors(t,n);const f=zi.dot(zi),h=zi.dot(_a),p=zi.dot(Wh),m=_a.dot(_a),g=_a.dot(Wh),_=f*m-h*h;if(_===0)return c.set(0,0,0),null;const x=1/_,M=(m*p-h*g)*x,E=(f*g-h*p)*x;return c.set(1-M-E,E,M)}static containsPoint(t,n,a,l){return this.getBarycoord(t,n,a,l,va)===null?!1:va.x>=0&&va.y>=0&&va.x+va.y<=1}static getInterpolation(t,n,a,l,c,f,h,p){return this.getBarycoord(t,n,a,l,va)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,va.x),p.addScaledVector(f,va.y),p.addScaledVector(h,va.z),p)}static getInterpolatedAttribute(t,n,a,l,c,f){return Kh.setScalar(0),Qh.setScalar(0),Jh.setScalar(0),Kh.fromBufferAttribute(t,n),Qh.fromBufferAttribute(t,a),Jh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Kh,c.x),f.addScaledVector(Qh,c.y),f.addScaledVector(Jh,c.z),f}static isFrontFacing(t,n,a,l){return zi.subVectors(a,n),_a.subVectors(t,n),zi.cross(_a).dot(l)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,l){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,a,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zi.subVectors(this.c,this.b),_a.subVectors(this.a,this.b),zi.cross(_a).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Bi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,l,c){return Bi.getInterpolation(t,this.a,this.b,this.c,n,a,l,c)}containsPoint(t){return Bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,l=this.b,c=this.c;let f,h;Nr.subVectors(l,a),Or.subVectors(c,a),jh.subVectors(t,a);const p=Nr.dot(jh),m=Or.dot(jh);if(p<=0&&m<=0)return n.copy(a);Yh.subVectors(t,l);const g=Nr.dot(Yh),_=Or.dot(Yh);if(g>=0&&_<=g)return n.copy(l);const x=p*_-g*m;if(x<=0&&p>=0&&g<=0)return f=p/(p-g),n.copy(a).addScaledVector(Nr,f);Zh.subVectors(t,c);const M=Nr.dot(Zh),E=Or.dot(Zh);if(E>=0&&M<=E)return n.copy(c);const T=M*m-p*E;if(T<=0&&m>=0&&E<=0)return h=m/(m-E),n.copy(a).addScaledVector(Or,h);const S=g*E-M*_;if(S<=0&&_-g>=0&&M-E>=0)return q_.subVectors(c,l),h=(_-g)/(_-g+(M-E)),n.copy(l).addScaledVector(q_,h);const v=1/(S+T+x);return f=T*v,h=x*v,n.copy(a).addScaledVector(Nr,f).addScaledVector(Or,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ox={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Lc={h:0,s:0,l:0};function $h(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class ue{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=bi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ae.toWorkingColorSpace(this,n),this}setRGB(t,n,a,l=Ae.workingColorSpace){return this.r=t,this.g=n,this.b=a,Ae.toWorkingColorSpace(this,l),this}setHSL(t,n,a,l=Ae.workingColorSpace){if(t=tE(t,1),n=ei(n,0,1),a=ei(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,f=2*a-c;this.r=$h(f,c,t+1/3),this.g=$h(f,c,t),this.b=$h(f,c,t-1/3)}return Ae.toWorkingColorSpace(this,l),this}setStyle(t,n=bi){function a(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=bi){const a=ox[t.toLowerCase()];return a!==void 0?this.setHex(a,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ta(t.r),this.g=Ta(t.g),this.b=Ta(t.b),this}copyLinearToSRGB(t){return this.r=Xr(t.r),this.g=Xr(t.g),this.b=Xr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=bi){return Ae.fromWorkingColorSpace(Gn.copy(this),t),Math.round(ei(Gn.r*255,0,255))*65536+Math.round(ei(Gn.g*255,0,255))*256+Math.round(ei(Gn.b*255,0,255))}getHexString(t=bi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ae.workingColorSpace){Ae.fromWorkingColorSpace(Gn.copy(this),n);const a=Gn.r,l=Gn.g,c=Gn.b,f=Math.max(a,l,c),h=Math.min(a,l,c);let p,m;const g=(h+f)/2;if(h===f)p=0,m=0;else{const _=f-h;switch(m=g<=.5?_/(f+h):_/(2-f-h),f){case a:p=(l-c)/_+(l<c?6:0);break;case l:p=(c-a)/_+2;break;case c:p=(a-l)/_+4;break}p/=6}return t.h=p,t.s=m,t.l=g,t}getRGB(t,n=Ae.workingColorSpace){return Ae.fromWorkingColorSpace(Gn.copy(this),n),t.r=Gn.r,t.g=Gn.g,t.b=Gn.b,t}getStyle(t=bi){Ae.fromWorkingColorSpace(Gn.copy(this),t);const n=Gn.r,a=Gn.g,l=Gn.b;return t!==bi?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(l*255)})`}offsetHSL(t,n,a){return this.getHSL(is),this.setHSL(is.h+t,is.s+n,is.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(is),t.getHSL(Lc);const a=zh(is.h,Lc.h,n),l=zh(is.s,Lc.s,n),c=zh(is.l,Lc.l,n);return this.setHSL(a,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*l,this.g=c[1]*n+c[4]*a+c[7]*l,this.b=c[2]*n+c[5]*a+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gn=new ue;ue.NAMES=ox;let _E=0;class to extends $r{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_E++}),this.uuid=ll(),this.name="",this.blending=Vr,this.side=fs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vd,this.blendDst=xd,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=qr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=w_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=br,this.stencilZFail=br,this.stencilZPass=br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(a):l&&l.isVector3&&a&&a.isVector3?l.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==Vr&&(a.blending=this.blending),this.side!==fs&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==vd&&(a.blendSrc=this.blendSrc),this.blendDst!==xd&&(a.blendDst=this.blendDst),this.blendEquation!==Fs&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==qr&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==w_&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==br&&(a.stencilFail=this.stencilFail),this.stencilZFail!==br&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==br&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function l(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(a.textures=c),f.length>0&&(a.images=f)}return a}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const l=n.length;a=new Array(l);for(let c=0;c!==l;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class rs extends to{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Aa,this.combine=Iv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pn=new J,Nc=new Ce;class On{constructor(t,n,a=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=C_,this.updateRanges=[],this.gpuType=Sa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[a+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Nc.fromBufferAttribute(this,n),Nc.applyMatrix3(t),this.setXY(n,Nc.x,Nc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.applyMatrix3(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.applyMatrix4(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.applyNormalMatrix(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.transformDirection(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Ko(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=$n(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Ko(n,this.array)),n}setX(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Ko(n,this.array)),n}setY(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Ko(n,this.array)),n}setZ(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Ko(n,this.array)),n}setW(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),a=$n(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,l){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),a=$n(a,this.array),l=$n(l,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this}setXYZW(t,n,a,l,c){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),a=$n(a,this.array),l=$n(l,this.array),c=$n(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==C_&&(t.usage=this.usage),t}}class lx extends On{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class cx extends On{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class yn extends On{constructor(t,n,a){super(new Float32Array(t),n,a)}}let vE=0;const Ei=new sn,td=new qn,Pr=new J,fi=new ul,tl=new ul,bn=new J;class An extends $r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vE++}),this.uuid=ll(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ix(t)?cx:lx)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new ce().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,n,a){return Ei.makeTranslation(t,n,a),this.applyMatrix4(Ei),this}scale(t,n,a){return Ei.makeScale(t,n,a),this.applyMatrix4(Ei),this}lookAt(t){return td.lookAt(t),td.updateMatrix(),this.applyMatrix4(td.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];a.push(f.x,f.y,f.z||0)}this.setAttribute("position",new yn(a,3))}else{for(let a=0,l=n.count;a<l;a++){const c=t[a];n.setXYZ(a,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ul);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,l=n.length;a<l;a++){const c=n[a];fi.setFromBufferAttribute(c),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const a=this.boundingSphere.center;if(fi.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const h=n[c];tl.setFromBufferAttribute(h),this.morphTargetsRelative?(bn.addVectors(fi.min,tl.min),fi.expandByPoint(bn),bn.addVectors(fi.max,tl.max),fi.expandByPoint(bn)):(fi.expandByPoint(tl.min),fi.expandByPoint(tl.max))}fi.getCenter(a);let l=0;for(let c=0,f=t.count;c<f;c++)bn.fromBufferAttribute(t,c),l=Math.max(l,a.distanceToSquared(bn));if(n)for(let c=0,f=n.length;c<f;c++){const h=n[c],p=this.morphTargetsRelative;for(let m=0,g=h.count;m<g;m++)bn.fromBufferAttribute(h,m),p&&(Pr.fromBufferAttribute(t,m),bn.add(Pr)),l=Math.max(l,a.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new On(new Float32Array(4*a.count),4));const f=this.getAttribute("tangent"),h=[],p=[];for(let G=0;G<a.count;G++)h[G]=new J,p[G]=new J;const m=new J,g=new J,_=new J,x=new Ce,M=new Ce,E=new Ce,T=new J,S=new J;function v(G,L,R){m.fromBufferAttribute(a,G),g.fromBufferAttribute(a,L),_.fromBufferAttribute(a,R),x.fromBufferAttribute(c,G),M.fromBufferAttribute(c,L),E.fromBufferAttribute(c,R),g.sub(m),_.sub(m),M.sub(x),E.sub(x);const F=1/(M.x*E.y-E.x*M.y);isFinite(F)&&(T.copy(g).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(F),S.copy(_).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(F),h[G].add(T),h[L].add(T),h[R].add(T),p[G].add(S),p[L].add(S),p[R].add(S))}let U=this.groups;U.length===0&&(U=[{start:0,count:t.count}]);for(let G=0,L=U.length;G<L;++G){const R=U[G],F=R.start,et=R.count;for(let st=F,ht=F+et;st<ht;st+=3)v(t.getX(st+0),t.getX(st+1),t.getX(st+2))}const D=new J,w=new J,q=new J,I=new J;function P(G){q.fromBufferAttribute(l,G),I.copy(q);const L=h[G];D.copy(L),D.sub(q.multiplyScalar(q.dot(L))).normalize(),w.crossVectors(I,L);const F=w.dot(p[G])<0?-1:1;f.setXYZW(G,D.x,D.y,D.z,F)}for(let G=0,L=U.length;G<L;++G){const R=U[G],F=R.start,et=R.count;for(let st=F,ht=F+et;st<ht;st+=3)P(t.getX(st+0)),P(t.getX(st+1)),P(t.getX(st+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new On(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let x=0,M=a.count;x<M;x++)a.setXYZ(x,0,0,0);const l=new J,c=new J,f=new J,h=new J,p=new J,m=new J,g=new J,_=new J;if(t)for(let x=0,M=t.count;x<M;x+=3){const E=t.getX(x+0),T=t.getX(x+1),S=t.getX(x+2);l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),h.fromBufferAttribute(a,E),p.fromBufferAttribute(a,T),m.fromBufferAttribute(a,S),h.add(g),p.add(g),m.add(g),a.setXYZ(E,h.x,h.y,h.z),a.setXYZ(T,p.x,p.y,p.z),a.setXYZ(S,m.x,m.y,m.z)}else for(let x=0,M=n.count;x<M;x+=3)l.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),a.setXYZ(x+0,g.x,g.y,g.z),a.setXYZ(x+1,g.x,g.y,g.z),a.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)bn.fromBufferAttribute(t,n),bn.normalize(),t.setXYZ(n,bn.x,bn.y,bn.z)}toNonIndexed(){function t(h,p){const m=h.array,g=h.itemSize,_=h.normalized,x=new m.constructor(p.length*g);let M=0,E=0;for(let T=0,S=p.length;T<S;T++){h.isInterleavedBufferAttribute?M=p[T]*h.data.stride+h.offset:M=p[T]*g;for(let v=0;v<g;v++)x[E++]=m[M++]}return new On(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new An,a=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=t(p,a);n.setAttribute(h,m)}const c=this.morphAttributes;for(const h in c){const p=[],m=c[h];for(let g=0,_=m.length;g<_;g++){const x=m[g],M=t(x,a);p.push(M)}n.morphAttributes[h]=p}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const p in a){const m=a[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],g=[];for(let _=0,x=m.length;_<x;_++){const M=m[_];g.push(M.toJSON(t.data))}g.length>0&&(l[p]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone(n));const l=t.attributes;for(const m in l){const g=l[m];this.setAttribute(m,g.clone(n))}const c=t.morphAttributes;for(const m in c){const g=[],_=c[m];for(let x=0,M=_.length;x<M;x++)g.push(_[x].clone(n));this.morphAttributes[m]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let m=0,g=f.length;m<g;m++){const _=f[m];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const W_=new sn,Ns=new mp,Oc=new fl,j_=new J,Pc=new J,zc=new J,Bc=new J,ed=new J,Ic=new J,Y_=new J,Fc=new J;class ln extends qn{constructor(t=new An,n=new rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const a=this.geometry,l=a.attributes.position,c=a.morphAttributes.position,f=a.morphTargetsRelative;n.fromBufferAttribute(l,t);const h=this.morphTargetInfluences;if(c&&h){Ic.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const g=h[p],_=c[p];g!==0&&(ed.fromBufferAttribute(_,t),f?Ic.addScaledVector(ed,g):Ic.addScaledVector(ed.sub(n),g))}n.add(Ic)}return n}raycast(t,n){const a=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Oc.copy(a.boundingSphere),Oc.applyMatrix4(c),Ns.copy(t.ray).recast(t.near),!(Oc.containsPoint(Ns.origin)===!1&&(Ns.intersectSphere(Oc,j_)===null||Ns.origin.distanceToSquared(j_)>(t.far-t.near)**2))&&(W_.copy(c).invert(),Ns.copy(t.ray).applyMatrix4(W_),!(a.boundingBox!==null&&Ns.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ns)))}_computeIntersections(t,n,a){let l;const c=this.geometry,f=this.material,h=c.index,p=c.attributes.position,m=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,x=c.groups,M=c.drawRange;if(h!==null)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],U=Math.max(S.start,M.start),D=Math.min(h.count,Math.min(S.start+S.count,M.start+M.count));for(let w=U,q=D;w<q;w+=3){const I=h.getX(w),P=h.getX(w+1),G=h.getX(w+2);l=Gc(this,v,t,a,m,g,_,I,P,G),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(h.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const U=h.getX(S),D=h.getX(S+1),w=h.getX(S+2);l=Gc(this,f,t,a,m,g,_,U,D,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],U=Math.max(S.start,M.start),D=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let w=U,q=D;w<q;w+=3){const I=w,P=w+1,G=w+2;l=Gc(this,v,t,a,m,g,_,I,P,G),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(p.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const U=S,D=S+1,w=S+2;l=Gc(this,f,t,a,m,g,_,U,D,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}}}function xE(r,t,n,a,l,c,f,h){let p;if(t.side===Xn?p=a.intersectTriangle(f,c,l,!0,h):p=a.intersectTriangle(l,c,f,t.side===fs,h),p===null)return null;Fc.copy(h),Fc.applyMatrix4(r.matrixWorld);const m=n.ray.origin.distanceTo(Fc);return m<n.near||m>n.far?null:{distance:m,point:Fc.clone(),object:r}}function Gc(r,t,n,a,l,c,f,h,p,m){r.getVertexPosition(h,Pc),r.getVertexPosition(p,zc),r.getVertexPosition(m,Bc);const g=xE(r,t,n,a,Pc,zc,Bc,Y_);if(g){const _=new J;Bi.getBarycoord(Y_,Pc,zc,Bc,_),l&&(g.uv=Bi.getInterpolatedAttribute(l,h,p,m,_,new Ce)),c&&(g.uv1=Bi.getInterpolatedAttribute(c,h,p,m,_,new Ce)),f&&(g.normal=Bi.getInterpolatedAttribute(f,h,p,m,_,new J),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const x={a:h,b:p,c:m,normal:new J,materialIndex:0};Bi.getNormal(Pc,zc,Bc,x.normal),g.face=x,g.barycoord=_}return g}class je extends An{constructor(t=1,n=1,a=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],g=[],_=[];let x=0,M=0;E("z","y","x",-1,-1,a,n,t,f,c,0),E("z","y","x",1,-1,a,n,-t,f,c,1),E("x","z","y",1,1,t,a,n,l,f,2),E("x","z","y",1,-1,t,a,-n,l,f,3),E("x","y","z",1,-1,t,n,a,l,c,4),E("x","y","z",-1,-1,t,n,-a,l,c,5),this.setIndex(p),this.setAttribute("position",new yn(m,3)),this.setAttribute("normal",new yn(g,3)),this.setAttribute("uv",new yn(_,2));function E(T,S,v,U,D,w,q,I,P,G,L){const R=w/P,F=q/G,et=w/2,st=q/2,ht=I/2,pt=P+1,z=G+1;let V=0,k=0;const xt=new J;for(let St=0;St<z;St++){const O=St*F-st;for(let nt=0;nt<pt;nt++){const yt=nt*R-et;xt[T]=yt*U,xt[S]=O*D,xt[v]=ht,m.push(xt.x,xt.y,xt.z),xt[T]=0,xt[S]=0,xt[v]=I>0?1:-1,g.push(xt.x,xt.y,xt.z),_.push(nt/P),_.push(1-St/G),V+=1}}for(let St=0;St<G;St++)for(let O=0;O<P;O++){const nt=x+O+pt*St,yt=x+O+pt*(St+1),K=x+(O+1)+pt*(St+1),ut=x+(O+1)+pt*St;p.push(nt,yt,ut),p.push(yt,K,ut),k+=6}h.addGroup(M,k,L),M+=k,x+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new je(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Kr(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const l=r[n][a];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=l.clone():Array.isArray(l)?t[n][a]=l.slice():t[n][a]=l}}return t}function kn(r){const t={};for(let n=0;n<r.length;n++){const a=Kr(r[n]);for(const l in a)t[l]=a[l]}return t}function yE(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function ux(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ae.workingColorSpace}const gp={clone:Kr,merge:kn};var SE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ME=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gi extends to{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=SE,this.fragmentShader=ME,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Kr(t.uniforms),this.uniformsGroups=yE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const l in this.extensions)this.extensions[l]===!0&&(a[l]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}}class fx extends qn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new sn,this.projectionMatrix=new sn,this.projectionMatrixInverse=new sn,this.coordinateSystem=Ma}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const as=new J,Z_=new Ce,K_=new Ce;class Ai extends fx{constructor(t=50,n=1,a=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=ip*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ph*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ip*2*Math.atan(Math.tan(Ph*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){as.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(as.x,as.y).multiplyScalar(-t/as.z),as.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(as.x,as.y).multiplyScalar(-t/as.z)}getViewSize(t,n){return this.getViewBounds(t,Z_,K_),n.subVectors(K_,Z_)}setViewOffset(t,n,a,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Ph*.5*this.fov)/this.zoom,a=2*n,l=this.aspect*a,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*l/p,n-=f.offsetY*a/m,l*=f.width/p,a*=f.height/m}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-a,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const zr=-90,Br=1;class EE extends qn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ai(zr,Br,t,n);l.layers=this.layers,this.add(l);const c=new Ai(zr,Br,t,n);c.layers=this.layers,this.add(c);const f=new Ai(zr,Br,t,n);f.layers=this.layers,this.add(f);const h=new Ai(zr,Br,t,n);h.layers=this.layers,this.add(h);const p=new Ai(zr,Br,t,n);p.layers=this.layers,this.add(p);const m=new Ai(zr,Br,t,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,l,c,f,h,p]=n;for(const m of n)this.remove(m);if(t===Ma)a.up.set(0,1,0),a.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===au)a.up.set(0,-1,0),a.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of n)this.add(m),m.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,p,m,g]=this.children,_=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const T=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,t.setRenderTarget(a,0,l),t.render(n,c),t.setRenderTarget(a,1,l),t.render(n,f),t.setRenderTarget(a,2,l),t.render(n,h),t.setRenderTarget(a,3,l),t.render(n,p),t.setRenderTarget(a,4,l),t.render(n,m),a.texture.generateMipmaps=T,t.setRenderTarget(a,5,l),t.render(n,g),t.setRenderTarget(_,x,M),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class hx extends ni{constructor(t,n,a,l,c,f,h,p,m,g){t=t!==void 0?t:[],n=n!==void 0?n:Wr,super(t,n,a,l,c,f,h,p,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class TE extends hs{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},l=[a,a,a,a,a,a];this.texture=new hx(l,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Yi}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new je(5,5,5),c=new Gi({name:"CubemapFromEquirect",uniforms:Kr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Xn,blending:Ea});c.uniforms.tEquirect.value=n;const f=new ln(l,c),h=n.minFilter;return n.minFilter===ks&&(n.minFilter=Yi),new EE(1,10,this).update(t,f),n.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(t,n,a,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,a,l);t.setRenderTarget(c)}}const nd=new J,bE=new J,AE=new ce;class Bs{constructor(t=new J(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,l){return this.normal.set(t,n,a),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const l=nd.subVectors(a,n).cross(bE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const a=t.delta(nd),l=this.normal.dot(a);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(a,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||AE.getNormalMatrix(t),l=this.coplanarPoint(nd).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Os=new fl,Hc=new J;class dx{constructor(t=new Bs,n=new Bs,a=new Bs,l=new Bs,c=new Bs,f=new Bs){this.planes=[t,n,a,l,c,f]}set(t,n,a,l,c,f){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(a),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=Ma){const a=this.planes,l=t.elements,c=l[0],f=l[1],h=l[2],p=l[3],m=l[4],g=l[5],_=l[6],x=l[7],M=l[8],E=l[9],T=l[10],S=l[11],v=l[12],U=l[13],D=l[14],w=l[15];if(a[0].setComponents(p-c,x-m,S-M,w-v).normalize(),a[1].setComponents(p+c,x+m,S+M,w+v).normalize(),a[2].setComponents(p+f,x+g,S+E,w+U).normalize(),a[3].setComponents(p-f,x-g,S-E,w-U).normalize(),a[4].setComponents(p-h,x-_,S-T,w-D).normalize(),n===Ma)a[5].setComponents(p+h,x+_,S+T,w+D).normalize();else if(n===au)a[5].setComponents(h,_,T,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(t){return Os.center.set(0,0,0),Os.radius=.7071067811865476,Os.applyMatrix4(t.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(t){const n=this.planes,a=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const l=n[a];if(Hc.x=l.normal.x>0?t.max.x:t.min.x,Hc.y=l.normal.y>0?t.max.y:t.min.y,Hc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Hc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function px(){let r=null,t=!1,n=null,a=null;function l(c,f){n(c,f),a=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(a=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function RE(r){const t=new WeakMap;function n(h,p){const m=h.array,g=h.usage,_=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,g),h.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,p,m){const g=p.array,_=p.updateRanges;if(r.bindBuffer(m,h),_.length===0)r.bufferSubData(m,0,g);else{_.sort((M,E)=>M.start-E.start);let x=0;for(let M=1;M<_.length;M++){const E=_[x],T=_[M];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++x,_[x]=T)}_.length=x+1;for(let M=0,E=_.length;M<E;M++){const T=_[M];r.bufferSubData(m,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=t.get(h);p&&(r.deleteBuffer(p.buffer),t.delete(h))}function f(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=t.get(h);(!g||g.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=t.get(h);if(m===void 0)t.set(h,n(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(m.buffer,h,p),m.version=h.version}}return{get:l,remove:c,update:f}}class hu extends An{constructor(t=1,n=1,a=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:l};const c=t/2,f=n/2,h=Math.floor(a),p=Math.floor(l),m=h+1,g=p+1,_=t/h,x=n/p,M=[],E=[],T=[],S=[];for(let v=0;v<g;v++){const U=v*x-f;for(let D=0;D<m;D++){const w=D*_-c;E.push(w,-U,0),T.push(0,0,1),S.push(D/h),S.push(1-v/p)}}for(let v=0;v<p;v++)for(let U=0;U<h;U++){const D=U+m*v,w=U+m*(v+1),q=U+1+m*(v+1),I=U+1+m*v;M.push(D,w,I),M.push(w,q,I)}this.setIndex(M),this.setAttribute("position",new yn(E,3)),this.setAttribute("normal",new yn(T,3)),this.setAttribute("uv",new yn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hu(t.width,t.height,t.widthSegments,t.heightSegments)}}var wE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,CE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,DE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,UE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,LE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,NE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,OE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,PE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,BE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,IE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,GE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,HE=`#ifdef USE_IRIDESCENCE
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
#endif`,VE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,XE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,WE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,YE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ZE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,KE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,QE=`#define PI 3.141592653589793
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
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
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
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,JE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
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
#endif`,$E=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,t1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,e1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,n1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,i1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,a1="gl_FragColor = linearToOutputTexel( gl_FragColor );",s1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,r1=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,o1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,l1=`#ifdef USE_ENVMAP
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
#endif`,c1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,u1=`#ifdef USE_ENVMAP
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
#endif`,f1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,h1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,d1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,p1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,m1=`#ifdef USE_GRADIENTMAP
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
}`,g1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,v1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,x1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
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
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
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
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
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
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
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
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
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
#endif`,y1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,S1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,T1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,b1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
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
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,A1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
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
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
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
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
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
#endif
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
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
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
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
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
}`,R1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
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
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
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
		getSpotLightInfo( spotLight, geometryPosition, directLight );
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
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
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,w1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,C1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,D1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,U1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,O1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,P1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,z1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,B1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,I1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,F1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,H1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,X1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,W1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,j1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,K1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Q1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,J1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,iT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,aT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
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
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,uT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
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
#endif`,hT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gT=`#ifdef USE_SKINNING
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
#endif`,_T=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
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
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ST=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,MT=`#ifdef USE_TRANSMISSION
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
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
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
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ET=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,TT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,AT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const RT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wT=`uniform sampler2D t2D;
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
	#include <colorspace_fragment>
}`,CT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,LT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
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
}`,OT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,PT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
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
}`,zT=`#define DISTANCE
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
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,BT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,IT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,GT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,HT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,VT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,XT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,WT=`#define MATCAP
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
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,YT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
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
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ZT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,KT=`#define PHONG
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
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,JT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
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
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$T=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,tb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
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
}`,nb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ib=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ab=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,rb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fe={alphahash_fragment:wE,alphahash_pars_fragment:CE,alphamap_fragment:DE,alphamap_pars_fragment:UE,alphatest_fragment:LE,alphatest_pars_fragment:NE,aomap_fragment:OE,aomap_pars_fragment:PE,batching_pars_vertex:zE,batching_vertex:BE,begin_vertex:IE,beginnormal_vertex:FE,bsdfs:GE,iridescence_fragment:HE,bumpmap_pars_fragment:VE,clipping_planes_fragment:kE,clipping_planes_pars_fragment:XE,clipping_planes_pars_vertex:qE,clipping_planes_vertex:WE,color_fragment:jE,color_pars_fragment:YE,color_pars_vertex:ZE,color_vertex:KE,common:QE,cube_uv_reflection_fragment:JE,defaultnormal_vertex:$E,displacementmap_pars_vertex:t1,displacementmap_vertex:e1,emissivemap_fragment:n1,emissivemap_pars_fragment:i1,colorspace_fragment:a1,colorspace_pars_fragment:s1,envmap_fragment:r1,envmap_common_pars_fragment:o1,envmap_pars_fragment:l1,envmap_pars_vertex:c1,envmap_physical_pars_fragment:y1,envmap_vertex:u1,fog_vertex:f1,fog_pars_vertex:h1,fog_fragment:d1,fog_pars_fragment:p1,gradientmap_pars_fragment:m1,lightmap_pars_fragment:g1,lights_lambert_fragment:_1,lights_lambert_pars_fragment:v1,lights_pars_begin:x1,lights_toon_fragment:S1,lights_toon_pars_fragment:M1,lights_phong_fragment:E1,lights_phong_pars_fragment:T1,lights_physical_fragment:b1,lights_physical_pars_fragment:A1,lights_fragment_begin:R1,lights_fragment_maps:w1,lights_fragment_end:C1,logdepthbuf_fragment:D1,logdepthbuf_pars_fragment:U1,logdepthbuf_pars_vertex:L1,logdepthbuf_vertex:N1,map_fragment:O1,map_pars_fragment:P1,map_particle_fragment:z1,map_particle_pars_fragment:B1,metalnessmap_fragment:I1,metalnessmap_pars_fragment:F1,morphinstance_vertex:G1,morphcolor_vertex:H1,morphnormal_vertex:V1,morphtarget_pars_vertex:k1,morphtarget_vertex:X1,normal_fragment_begin:q1,normal_fragment_maps:W1,normal_pars_fragment:j1,normal_pars_vertex:Y1,normal_vertex:Z1,normalmap_pars_fragment:K1,clearcoat_normal_fragment_begin:Q1,clearcoat_normal_fragment_maps:J1,clearcoat_pars_fragment:$1,iridescence_pars_fragment:tT,opaque_fragment:eT,packing:nT,premultiplied_alpha_fragment:iT,project_vertex:aT,dithering_fragment:sT,dithering_pars_fragment:rT,roughnessmap_fragment:oT,roughnessmap_pars_fragment:lT,shadowmap_pars_fragment:cT,shadowmap_pars_vertex:uT,shadowmap_vertex:fT,shadowmask_pars_fragment:hT,skinbase_vertex:dT,skinning_pars_vertex:pT,skinning_vertex:mT,skinnormal_vertex:gT,specularmap_fragment:_T,specularmap_pars_fragment:vT,tonemapping_fragment:xT,tonemapping_pars_fragment:yT,transmission_fragment:ST,transmission_pars_fragment:MT,uv_pars_fragment:ET,uv_pars_vertex:TT,uv_vertex:bT,worldpos_vertex:AT,background_vert:RT,background_frag:wT,backgroundCube_vert:CT,backgroundCube_frag:DT,cube_vert:UT,cube_frag:LT,depth_vert:NT,depth_frag:OT,distanceRGBA_vert:PT,distanceRGBA_frag:zT,equirect_vert:BT,equirect_frag:IT,linedashed_vert:FT,linedashed_frag:GT,meshbasic_vert:HT,meshbasic_frag:VT,meshlambert_vert:kT,meshlambert_frag:XT,meshmatcap_vert:qT,meshmatcap_frag:WT,meshnormal_vert:jT,meshnormal_frag:YT,meshphong_vert:ZT,meshphong_frag:KT,meshphysical_vert:QT,meshphysical_frag:JT,meshtoon_vert:$T,meshtoon_frag:tb,points_vert:eb,points_frag:nb,shadow_vert:ib,shadow_frag:ab,sprite_vert:sb,sprite_frag:rb},Ot={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},ji={basic:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:kn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:kn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:kn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:kn([Ot.points,Ot.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:kn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:kn([Ot.common,Ot.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:kn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:kn([Ot.sprite,Ot.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distanceRGBA:{uniforms:kn([Ot.common,Ot.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distanceRGBA_vert,fragmentShader:fe.distanceRGBA_frag},shadow:{uniforms:kn([Ot.lights,Ot.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};ji.physical={uniforms:kn([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};const Vc={r:0,b:0,g:0},Ps=new Aa,ob=new sn;function lb(r,t,n,a,l,c,f){const h=new ue(0);let p=c===!0?0:1,m,g,_=null,x=0,M=null;function E(U){let D=U.isScene===!0?U.background:null;return D&&D.isTexture&&(D=(U.backgroundBlurriness>0?n:t).get(D)),D}function T(U){let D=!1;const w=E(U);w===null?v(h,p):w&&w.isColor&&(v(w,1),D=!0);const q=r.xr.getEnvironmentBlendMode();q==="additive"?a.buffers.color.setClear(0,0,0,1,f):q==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,f),(r.autoClear||D)&&(a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(U,D){const w=E(D);w&&(w.isCubeTexture||w.mapping===uu)?(g===void 0&&(g=new ln(new je(1,1,1),new Gi({name:"BackgroundCubeMaterial",uniforms:Kr(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(q,I,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Ps.copy(D.backgroundRotation),Ps.x*=-1,Ps.y*=-1,Ps.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ps.y*=-1,Ps.z*=-1),g.material.uniforms.envMap.value=w,g.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(ob.makeRotationFromEuler(Ps)),g.material.toneMapped=Ae.getTransfer(w.colorSpace)!==Ie,(_!==w||x!==w.version||M!==r.toneMapping)&&(g.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),g.layers.enableAll(),U.unshift(g,g.geometry,g.material,0,0,null)):w&&w.isTexture&&(m===void 0&&(m=new ln(new hu(2,2),new Gi({name:"BackgroundMaterial",uniforms:Kr(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:fs,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=w,m.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,m.material.toneMapped=Ae.getTransfer(w.colorSpace)!==Ie,w.matrixAutoUpdate===!0&&w.updateMatrix(),m.material.uniforms.uvTransform.value.copy(w.matrix),(_!==w||x!==w.version||M!==r.toneMapping)&&(m.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null))}function v(U,D){U.getRGB(Vc,ux(r)),a.buffers.color.setClear(Vc.r,Vc.g,Vc.b,D,f)}return{getClearColor:function(){return h},setClearColor:function(U,D=1){h.set(U),p=D,v(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(U){p=U,v(h,p)},render:T,addToRenderList:S}}function cb(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},l=x(null);let c=l,f=!1;function h(R,F,et,st,ht){let pt=!1;const z=_(st,et,F);c!==z&&(c=z,m(c.object)),pt=M(R,st,et,ht),pt&&E(R,st,et,ht),ht!==null&&t.update(ht,r.ELEMENT_ARRAY_BUFFER),(pt||f)&&(f=!1,w(R,F,et,st),ht!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ht).buffer))}function p(){return r.createVertexArray()}function m(R){return r.bindVertexArray(R)}function g(R){return r.deleteVertexArray(R)}function _(R,F,et){const st=et.wireframe===!0;let ht=a[R.id];ht===void 0&&(ht={},a[R.id]=ht);let pt=ht[F.id];pt===void 0&&(pt={},ht[F.id]=pt);let z=pt[st];return z===void 0&&(z=x(p()),pt[st]=z),z}function x(R){const F=[],et=[],st=[];for(let ht=0;ht<n;ht++)F[ht]=0,et[ht]=0,st[ht]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:et,attributeDivisors:st,object:R,attributes:{},index:null}}function M(R,F,et,st){const ht=c.attributes,pt=F.attributes;let z=0;const V=et.getAttributes();for(const k in V)if(V[k].location>=0){const St=ht[k];let O=pt[k];if(O===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(O=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(O=R.instanceColor)),St===void 0||St.attribute!==O||O&&St.data!==O.data)return!0;z++}return c.attributesNum!==z||c.index!==st}function E(R,F,et,st){const ht={},pt=F.attributes;let z=0;const V=et.getAttributes();for(const k in V)if(V[k].location>=0){let St=pt[k];St===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(St=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(St=R.instanceColor));const O={};O.attribute=St,St&&St.data&&(O.data=St.data),ht[k]=O,z++}c.attributes=ht,c.attributesNum=z,c.index=st}function T(){const R=c.newAttributes;for(let F=0,et=R.length;F<et;F++)R[F]=0}function S(R){v(R,0)}function v(R,F){const et=c.newAttributes,st=c.enabledAttributes,ht=c.attributeDivisors;et[R]=1,st[R]===0&&(r.enableVertexAttribArray(R),st[R]=1),ht[R]!==F&&(r.vertexAttribDivisor(R,F),ht[R]=F)}function U(){const R=c.newAttributes,F=c.enabledAttributes;for(let et=0,st=F.length;et<st;et++)F[et]!==R[et]&&(r.disableVertexAttribArray(et),F[et]=0)}function D(R,F,et,st,ht,pt,z){z===!0?r.vertexAttribIPointer(R,F,et,ht,pt):r.vertexAttribPointer(R,F,et,st,ht,pt)}function w(R,F,et,st){T();const ht=st.attributes,pt=et.getAttributes(),z=F.defaultAttributeValues;for(const V in pt){const k=pt[V];if(k.location>=0){let xt=ht[V];if(xt===void 0&&(V==="instanceMatrix"&&R.instanceMatrix&&(xt=R.instanceMatrix),V==="instanceColor"&&R.instanceColor&&(xt=R.instanceColor)),xt!==void 0){const St=xt.normalized,O=xt.itemSize,nt=t.get(xt);if(nt===void 0)continue;const yt=nt.buffer,K=nt.type,ut=nt.bytesPerElement,Tt=K===r.INT||K===r.UNSIGNED_INT||xt.gpuType===cp;if(xt.isInterleavedBufferAttribute){const Mt=xt.data,Vt=Mt.stride,Ht=xt.offset;if(Mt.isInstancedInterleavedBuffer){for(let ae=0;ae<k.locationSize;ae++)v(k.location+ae,Mt.meshPerAttribute);R.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let ae=0;ae<k.locationSize;ae++)S(k.location+ae);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let ae=0;ae<k.locationSize;ae++)D(k.location+ae,O/k.locationSize,K,St,Vt*ut,(Ht+O/k.locationSize*ae)*ut,Tt)}else{if(xt.isInstancedBufferAttribute){for(let Mt=0;Mt<k.locationSize;Mt++)v(k.location+Mt,xt.meshPerAttribute);R.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let Mt=0;Mt<k.locationSize;Mt++)S(k.location+Mt);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let Mt=0;Mt<k.locationSize;Mt++)D(k.location+Mt,O/k.locationSize,K,St,O*ut,O/k.locationSize*Mt*ut,Tt)}}else if(z!==void 0){const St=z[V];if(St!==void 0)switch(St.length){case 2:r.vertexAttrib2fv(k.location,St);break;case 3:r.vertexAttrib3fv(k.location,St);break;case 4:r.vertexAttrib4fv(k.location,St);break;default:r.vertexAttrib1fv(k.location,St)}}}}U()}function q(){G();for(const R in a){const F=a[R];for(const et in F){const st=F[et];for(const ht in st)g(st[ht].object),delete st[ht];delete F[et]}delete a[R]}}function I(R){if(a[R.id]===void 0)return;const F=a[R.id];for(const et in F){const st=F[et];for(const ht in st)g(st[ht].object),delete st[ht];delete F[et]}delete a[R.id]}function P(R){for(const F in a){const et=a[F];if(et[R.id]===void 0)continue;const st=et[R.id];for(const ht in st)g(st[ht].object),delete st[ht];delete et[R.id]}}function G(){L(),f=!0,c!==l&&(c=l,m(c.object))}function L(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:G,resetDefaultState:L,dispose:q,releaseStatesOfGeometry:I,releaseStatesOfProgram:P,initAttributes:T,enableAttribute:S,disableUnusedAttributes:U}}function ub(r,t,n){let a;function l(m){a=m}function c(m,g){r.drawArrays(a,m,g),n.update(g,a,1)}function f(m,g,_){_!==0&&(r.drawArraysInstanced(a,m,g,_),n.update(g,a,_))}function h(m,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,g,0,_);let M=0;for(let E=0;E<_;E++)M+=g[E];n.update(M,a,1)}function p(m,g,_,x){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<m.length;E++)f(m[E],g[E],x[E]);else{M.multiDrawArraysInstancedWEBGL(a,m,0,g,0,x,0,_);let E=0;for(let T=0;T<_;T++)E+=g[T]*x[T];n.update(E,a,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function fb(r,t,n,a){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(P){return!(P!==Ii&&a.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(P){const G=P===Qr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==ba&&a.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Sa&&!G)}function p(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const g=p(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const _=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),U=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),D=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),q=E>0,I=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:S,maxAttributes:v,maxVertexUniforms:U,maxVaryings:D,maxFragmentUniforms:w,vertexTextures:q,maxSamples:I}}function hb(r){const t=this;let n=null,a=0,l=!1,c=!1;const f=new Bs,h=new ce,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const M=_.length!==0||x||a!==0||l;return l=x,a=_.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,x){n=g(_,x,0)},this.setState=function(_,x,M){const E=_.clippingPlanes,T=_.clipIntersection,S=_.clipShadows,v=r.get(_);if(!l||E===null||E.length===0||c&&!S)c?g(null):m();else{const U=c?0:a,D=U*4;let w=v.clippingState||null;p.value=w,w=g(E,x,D,M);for(let q=0;q!==D;++q)w[q]=n[q];v.clippingState=w,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=U}};function m(){p.value!==n&&(p.value=n,p.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,x,M,E){const T=_!==null?_.length:0;let S=null;if(T!==0){if(S=p.value,E!==!0||S===null){const v=M+T*4,U=x.matrixWorldInverse;h.getNormalMatrix(U),(S===null||S.length<v)&&(S=new Float32Array(v));for(let D=0,w=M;D!==T;++D,w+=4)f.copy(_[D]).applyMatrix4(U,h),f.normal.toArray(S,w),S[w+3]=f.constant}p.value=S,p.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function db(r){let t=new WeakMap;function n(f,h){return h===Rd?f.mapping=Wr:h===wd&&(f.mapping=jr),f}function a(f){if(f&&f.isTexture){const h=f.mapping;if(h===Rd||h===wd)if(t.has(f)){const p=t.get(f).texture;return n(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new TE(p.height);return m.fromEquirectangularTexture(r,f),t.set(f,m),f.addEventListener("dispose",l),n(m.texture,f.mapping)}else return null}}return f}function l(f){const h=f.target;h.removeEventListener("dispose",l);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function c(){t=new WeakMap}return{get:a,dispose:c}}class mx extends fx{constructor(t=-1,n=1,a=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=a-t,f=a+t,h=l+n,p=l-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,h-=g*this.view.offsetY,p=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Hr=4,Q_=[.125,.215,.35,.446,.526,.582],Gs=20,id=new mx,J_=new ue;let ad=null,sd=0,rd=0,od=!1;const Is=(1+Math.sqrt(5))/2,Ir=1/Is,$_=[new J(-Is,Ir,0),new J(Is,Ir,0),new J(-Ir,0,Is),new J(Ir,0,Is),new J(0,Is,-Ir),new J(0,Is,Ir),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class tv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,a=.1,l=100){ad=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,a,l,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=iv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ad,sd,rd),this._renderer.xr.enabled=od,t.scissorTest=!1,kc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Wr||t.mapping===jr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ad=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Yi,minFilter:Yi,generateMipmaps:!1,type:Qr,format:Ii,colorSpace:Jr,depthBuffer:!1},l=ev(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ev(t,n,a);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pb(c)),this._blurMaterial=mb(c,t,n)}return l}_compileMaterial(t){const n=new ln(this._lodPlanes[0],t);this._renderer.compile(n,id)}_sceneToCubeUV(t,n,a,l){const h=new Ai(90,1,n,a),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(J_),g.toneMapping=us,g.autoClear=!1;const M=new rs({name:"PMREM.Background",side:Xn,depthWrite:!1,depthTest:!1}),E=new ln(new je,M);let T=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,T=!0):(M.color.copy(J_),T=!0);for(let v=0;v<6;v++){const U=v%3;U===0?(h.up.set(0,p[v],0),h.lookAt(m[v],0,0)):U===1?(h.up.set(0,0,p[v]),h.lookAt(0,m[v],0)):(h.up.set(0,p[v],0),h.lookAt(0,0,m[v]));const D=this._cubeSize;kc(l,U*D,v>2?D:0,D,D),g.setRenderTarget(l),T&&g.render(E,h),g.render(t,h)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=_,t.background=S}_textureToCubeUV(t,n){const a=this._renderer,l=t.mapping===Wr||t.mapping===jr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=iv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new ln(this._lodPlanes[0],c),h=c.uniforms;h.envMap.value=t;const p=this._cubeSize;kc(n,0,0,3*p,2*p),a.setRenderTarget(n),a.render(f,id)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),h=$_[(l-c-1)%$_.length];this._blur(t,c-1,c,f,h)}n.autoClear=a}_blur(t,n,a,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,a,l,"latitudinal",c),this._halfBlur(f,t,a,a,l,"longitudinal",c)}_halfBlur(t,n,a,l,c,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new ln(this._lodPlanes[l],m),x=m.uniforms,M=this._sizeLods[a]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Gs-1),T=c/E,S=isFinite(c)?1+Math.floor(g*T):Gs;S>Gs&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Gs}`);const v=[];let U=0;for(let P=0;P<Gs;++P){const G=P/T,L=Math.exp(-G*G/2);v.push(L),P===0?U+=L:P<S&&(U+=2*L)}for(let P=0;P<v.length;P++)v[P]=v[P]/U;x.envMap.value=t.texture,x.samples.value=S,x.weights.value=v,x.latitudinal.value=f==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:D}=this;x.dTheta.value=E,x.mipInt.value=D-a;const w=this._sizeLods[l],q=3*w*(l>D-Hr?l-D+Hr:0),I=4*(this._cubeSize-w);kc(n,q,I,3*w,2*w),p.setRenderTarget(n),p.render(_,id)}}function pb(r){const t=[],n=[],a=[];let l=r;const c=r-Hr+1+Q_.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);n.push(h);let p=1/h;f>r-Hr?p=Q_[f-r+Hr-1]:f===0&&(p=0),a.push(p);const m=1/(h-2),g=-m,_=1+m,x=[g,g,_,g,_,_,g,g,_,_,g,_],M=6,E=6,T=3,S=2,v=1,U=new Float32Array(T*E*M),D=new Float32Array(S*E*M),w=new Float32Array(v*E*M);for(let I=0;I<M;I++){const P=I%3*2/3-1,G=I>2?0:-1,L=[P,G,0,P+2/3,G,0,P+2/3,G+1,0,P,G,0,P+2/3,G+1,0,P,G+1,0];U.set(L,T*E*I),D.set(x,S*E*I);const R=[I,I,I,I,I,I];w.set(R,v*E*I)}const q=new An;q.setAttribute("position",new On(U,T)),q.setAttribute("uv",new On(D,S)),q.setAttribute("faceIndex",new On(w,v)),t.push(q),l>Hr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:a}}function ev(r,t,n){const a=new hs(r,t,n);return a.texture.mapping=uu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function kc(r,t,n,a,l){r.viewport.set(t,n,a,l),r.scissor.set(t,n,a,l)}function mb(r,t,n){const a=new Float32Array(Gs),l=new J(0,1,0);return new Gi({name:"SphericalGaussianBlur",defines:{n:Gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:_p(),fragmentShader:`

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
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function nv(){return new Gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_p(),fragmentShader:`

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
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function iv(){return new Gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_p(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ea,depthTest:!1,depthWrite:!1})}function _p(){return`

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
	`}function gb(r){let t=new WeakMap,n=null;function a(h){if(h&&h.isTexture){const p=h.mapping,m=p===Rd||p===wd,g=p===Wr||p===jr;if(m||g){let _=t.get(h);const x=_!==void 0?_.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==x)return n===null&&(n=new tv(r)),_=m?n.fromEquirectangular(h,_):n.fromCubemap(h,_),_.texture.pmremVersion=h.pmremVersion,t.set(h,_),_.texture;if(_!==void 0)return _.texture;{const M=h.image;return m&&M&&M.height>0||g&&M&&l(M)?(n===null&&(n=new tv(r)),_=m?n.fromEquirectangular(h):n.fromCubemap(h),_.texture.pmremVersion=h.pmremVersion,t.set(h,_),h.addEventListener("dispose",c),_.texture):null}}}return h}function l(h){let p=0;const m=6;for(let g=0;g<m;g++)h[g]!==void 0&&p++;return p===m}function c(h){const p=h.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:a,dispose:f}}function _b(r){const t={};function n(a){if(t[a]!==void 0)return t[a];let l;switch(a){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(a)}return t[a]=l,l}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const l=n(a);return l===null&&al("THREE.WebGLRenderer: "+a+" extension not supported."),l}}}function vb(r,t,n,a){const l={},c=new WeakMap;function f(_){const x=_.target;x.index!==null&&t.remove(x.index);for(const E in x.attributes)t.remove(x.attributes[E]);for(const E in x.morphAttributes){const T=x.morphAttributes[E];for(let S=0,v=T.length;S<v;S++)t.remove(T[S])}x.removeEventListener("dispose",f),delete l[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),a.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function h(_,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,n.memory.geometries++),x}function p(_){const x=_.attributes;for(const E in x)t.update(x[E],r.ARRAY_BUFFER);const M=_.morphAttributes;for(const E in M){const T=M[E];for(let S=0,v=T.length;S<v;S++)t.update(T[S],r.ARRAY_BUFFER)}}function m(_){const x=[],M=_.index,E=_.attributes.position;let T=0;if(M!==null){const U=M.array;T=M.version;for(let D=0,w=U.length;D<w;D+=3){const q=U[D+0],I=U[D+1],P=U[D+2];x.push(q,I,I,P,P,q)}}else if(E!==void 0){const U=E.array;T=E.version;for(let D=0,w=U.length/3-1;D<w;D+=3){const q=D+0,I=D+1,P=D+2;x.push(q,I,I,P,P,q)}}else return;const S=new(ix(x)?cx:lx)(x,1);S.version=T;const v=c.get(_);v&&t.remove(v),c.set(_,S)}function g(_){const x=c.get(_);if(x){const M=_.index;M!==null&&x.version<M.version&&m(_)}else m(_);return c.get(_)}return{get:h,update:p,getWireframeAttribute:g}}function xb(r,t,n){let a;function l(x){a=x}let c,f;function h(x){c=x.type,f=x.bytesPerElement}function p(x,M){r.drawElements(a,M,c,x*f),n.update(M,a,1)}function m(x,M,E){E!==0&&(r.drawElementsInstanced(a,M,c,x*f,E),n.update(M,a,E))}function g(x,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,M,0,c,x,0,E);let S=0;for(let v=0;v<E;v++)S+=M[v];n.update(S,a,1)}function _(x,M,E,T){if(E===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let v=0;v<x.length;v++)m(x[v]/f,M[v],T[v]);else{S.multiDrawElementsInstancedWEBGL(a,M,0,c,x,0,T,0,E);let v=0;for(let U=0;U<E;U++)v+=M[U]*T[U];n.update(v,a,1)}}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function yb(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,f,h){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:a}}function Sb(r,t,n){const a=new WeakMap,l=new cn;function c(f,h,p){const m=f.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let x=a.get(h);if(x===void 0||x.count!==_){let R=function(){G.dispose(),a.delete(h),h.removeEventListener("dispose",R)};var M=R;x!==void 0&&x.texture.dispose();const E=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,v=h.morphAttributes.position||[],U=h.morphAttributes.normal||[],D=h.morphAttributes.color||[];let w=0;E===!0&&(w=1),T===!0&&(w=2),S===!0&&(w=3);let q=h.attributes.position.count*w,I=1;q>t.maxTextureSize&&(I=Math.ceil(q/t.maxTextureSize),q=t.maxTextureSize);const P=new Float32Array(q*I*4*_),G=new sx(P,q,I,_);G.type=Sa,G.needsUpdate=!0;const L=w*4;for(let F=0;F<_;F++){const et=v[F],st=U[F],ht=D[F],pt=q*I*4*F;for(let z=0;z<et.count;z++){const V=z*L;E===!0&&(l.fromBufferAttribute(et,z),P[pt+V+0]=l.x,P[pt+V+1]=l.y,P[pt+V+2]=l.z,P[pt+V+3]=0),T===!0&&(l.fromBufferAttribute(st,z),P[pt+V+4]=l.x,P[pt+V+5]=l.y,P[pt+V+6]=l.z,P[pt+V+7]=0),S===!0&&(l.fromBufferAttribute(ht,z),P[pt+V+8]=l.x,P[pt+V+9]=l.y,P[pt+V+10]=l.z,P[pt+V+11]=ht.itemSize===4?l.w:1)}}x={count:_,texture:G,size:new Ce(q,I)},a.set(h,x),h.addEventListener("dispose",R)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let E=0;for(let S=0;S<m.length;S++)E+=m[S];const T=h.morphTargetsRelative?1:1-E;p.getUniforms().setValue(r,"morphTargetBaseInfluence",T),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function Mb(r,t,n,a){let l=new WeakMap;function c(p){const m=a.render.frame,g=p.geometry,_=t.get(p,g);if(l.get(_)!==m&&(t.update(_),l.set(_,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),l.get(p)!==m&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;l.get(x)!==m&&(x.update(),l.set(x,m))}return _}function f(){l=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:c,dispose:f}}class gx extends ni{constructor(t,n,a,l,c,f,h,p,m,g=kr){if(g!==kr&&g!==Zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&g===kr&&(a=Xs),a===void 0&&g===Zr&&(a=Yr),super(null,l,c,f,h,p,g,a,m),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=h!==void 0?h:Fi,this.minFilter=p!==void 0?p:Fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const _x=new ni,av=new gx(1,1),vx=new sx,xx=new cE,yx=new hx,sv=[],rv=[],ov=new Float32Array(16),lv=new Float32Array(9),cv=new Float32Array(4);function eo(r,t,n){const a=r[0];if(a<=0||a>0)return r;const l=t*n;let c=sv[l];if(c===void 0&&(c=new Float32Array(l),sv[l]=c),t!==0){a.toArray(c,0);for(let f=1,h=0;f!==t;++f)h+=n,r[f].toArray(c,h)}return c}function Sn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function Mn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function du(r,t){let n=rv[t];n===void 0&&(n=new Int32Array(t),rv[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function Eb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function Tb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2fv(this.addr,t),Mn(n,t)}}function bb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Sn(n,t))return;r.uniform3fv(this.addr,t),Mn(n,t)}}function Ab(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4fv(this.addr,t),Mn(n,t)}}function Rb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Sn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,a))return;cv.set(a),r.uniformMatrix2fv(this.addr,!1,cv),Mn(n,a)}}function wb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Sn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,a))return;lv.set(a),r.uniformMatrix3fv(this.addr,!1,lv),Mn(n,a)}}function Cb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Sn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,a))return;ov.set(a),r.uniformMatrix4fv(this.addr,!1,ov),Mn(n,a)}}function Db(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function Ub(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2iv(this.addr,t),Mn(n,t)}}function Lb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3iv(this.addr,t),Mn(n,t)}}function Nb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4iv(this.addr,t),Mn(n,t)}}function Ob(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function Pb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2uiv(this.addr,t),Mn(n,t)}}function zb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3uiv(this.addr,t),Mn(n,t)}}function Bb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4uiv(this.addr,t),Mn(n,t)}}function Ib(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(av.compareFunction=nx,c=av):c=_x,n.setTexture2D(t||c,l)}function Fb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture3D(t||xx,l)}function Gb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTextureCube(t||yx,l)}function Hb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture2DArray(t||vx,l)}function Vb(r){switch(r){case 5126:return Eb;case 35664:return Tb;case 35665:return bb;case 35666:return Ab;case 35674:return Rb;case 35675:return wb;case 35676:return Cb;case 5124:case 35670:return Db;case 35667:case 35671:return Ub;case 35668:case 35672:return Lb;case 35669:case 35673:return Nb;case 5125:return Ob;case 36294:return Pb;case 36295:return zb;case 36296:return Bb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ib;case 35679:case 36299:case 36307:return Fb;case 35680:case 36300:case 36308:case 36293:return Gb;case 36289:case 36303:case 36311:case 36292:return Hb}}function kb(r,t){r.uniform1fv(this.addr,t)}function Xb(r,t){const n=eo(t,this.size,2);r.uniform2fv(this.addr,n)}function qb(r,t){const n=eo(t,this.size,3);r.uniform3fv(this.addr,n)}function Wb(r,t){const n=eo(t,this.size,4);r.uniform4fv(this.addr,n)}function jb(r,t){const n=eo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function Yb(r,t){const n=eo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function Zb(r,t){const n=eo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function Kb(r,t){r.uniform1iv(this.addr,t)}function Qb(r,t){r.uniform2iv(this.addr,t)}function Jb(r,t){r.uniform3iv(this.addr,t)}function $b(r,t){r.uniform4iv(this.addr,t)}function tA(r,t){r.uniform1uiv(this.addr,t)}function eA(r,t){r.uniform2uiv(this.addr,t)}function nA(r,t){r.uniform3uiv(this.addr,t)}function iA(r,t){r.uniform4uiv(this.addr,t)}function aA(r,t,n){const a=this.cache,l=t.length,c=du(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||_x,c[f])}function sA(r,t,n){const a=this.cache,l=t.length,c=du(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||xx,c[f])}function rA(r,t,n){const a=this.cache,l=t.length,c=du(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||yx,c[f])}function oA(r,t,n){const a=this.cache,l=t.length,c=du(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||vx,c[f])}function lA(r){switch(r){case 5126:return kb;case 35664:return Xb;case 35665:return qb;case 35666:return Wb;case 35674:return jb;case 35675:return Yb;case 35676:return Zb;case 5124:case 35670:return Kb;case 35667:case 35671:return Qb;case 35668:case 35672:return Jb;case 35669:case 35673:return $b;case 5125:return tA;case 36294:return eA;case 36295:return nA;case 36296:return iA;case 35678:case 36198:case 36298:case 36306:case 35682:return aA;case 35679:case 36299:case 36307:return sA;case 35680:case 36300:case 36308:case 36293:return rA;case 36289:case 36303:case 36311:case 36292:return oA}}class cA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=Vb(n.type)}}class uA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=lA(n.type)}}class fA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(t,n[h.id],a)}}}const ld=/(\w+)(\])?(\[|\.)?/g;function uv(r,t){r.seq.push(t),r.map[t.id]=t}function hA(r,t,n){const a=r.name,l=a.length;for(ld.lastIndex=0;;){const c=ld.exec(a),f=ld.lastIndex;let h=c[1];const p=c[2]==="]",m=c[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===l){uv(n,m===void 0?new cA(h,r,t):new uA(h,r,t));break}else{let _=n.map[h];_===void 0&&(_=new fA(h),uv(n,_)),n=_}}}class nu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<a;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);hA(c,f,this)}}setValue(t,n,a,l){const c=this.map[n];c!==void 0&&c.setValue(t,a,l)}setOptional(t,n,a){const l=n[a];l!==void 0&&this.setValue(t,a,l)}static upload(t,n,a,l){for(let c=0,f=n.length;c!==f;++c){const h=n[c],p=a[h.id];p.needsUpdate!==!1&&h.setValue(t,p.value,l)}}static seqWithValue(t,n){const a=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&a.push(f)}return a}}function fv(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const dA=37297;let pA=0;function mA(r,t){const n=r.split(`
`),a=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const h=f+1;a.push(`${h===t?">":" "} ${h}: ${n[f]}`)}return a.join(`
`)}const hv=new ce;function gA(r){Ae._getMatrix(hv,Ae.workingColorSpace,r);const t=`mat3( ${hv.elements.map(n=>n.toFixed(4))} )`;switch(Ae.getTransfer(r)){case fu:return[t,"LinearTransferOETF"];case Ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function dv(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(a&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+mA(r.getShaderSource(t),f)}else return l}function _A(r,t){const n=gA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function vA(r,t){let n;switch(t){case Fv:n="Linear";break;case Gv:n="Reinhard";break;case Hv:n="Cineon";break;case Vv:n="ACESFilmic";break;case kv:n="AgX";break;case Xv:n="Neutral";break;case HM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xc=new J;function xA(){Ae.getLuminanceCoefficients(Xc);const r=Xc.x.toFixed(4),t=Xc.y.toFixed(4),n=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sl).join(`
`)}function SA(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function MA(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<a;l++){const c=r.getActiveAttrib(t,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:h}}return n}function sl(r){return r!==""}function pv(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function mv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const EA=/^[ \t]*#include +<([\w\d./]+)>/gm;function ap(r){return r.replace(EA,bA)}const TA=new Map;function bA(r,t){let n=fe[t];if(n===void 0){const a=TA.get(t);if(a!==void 0)n=fe[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("Can not resolve #include <"+t+">")}return ap(n)}const AA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gv(r){return r.replace(AA,RA)}function RA(r,t,n,a){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function _v(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Bv?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===yM?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===xa&&(t="SHADOWMAP_TYPE_VSM"),t}function CA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Wr:case jr:t="ENVMAP_TYPE_CUBE";break;case uu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function DA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case jr:t="ENVMAP_MODE_REFRACTION";break}return t}function UA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Iv:t="ENVMAP_BLENDING_MULTIPLY";break;case FM:t="ENVMAP_BLENDING_MIX";break;case GM:t="ENVMAP_BLENDING_ADD";break}return t}function LA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function NA(r,t,n,a){const l=r.getContext(),c=n.defines;let f=n.vertexShader,h=n.fragmentShader;const p=wA(n),m=CA(n),g=DA(n),_=UA(n),x=LA(n),M=yA(n),E=SA(c),T=l.createProgram();let S,v,U=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(sl).join(`
`),S.length>0&&(S+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(sl).join(`
`),v.length>0&&(v+=`
`)):(S=[_v(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sl).join(`
`),v=[_v(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==us?"#define TONE_MAPPING":"",n.toneMapping!==us?fe.tonemapping_pars_fragment:"",n.toneMapping!==us?vA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,_A("linearToOutputTexel",n.outputColorSpace),xA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(sl).join(`
`)),f=ap(f),f=pv(f,n),f=mv(f,n),h=ap(h),h=pv(h,n),h=mv(h,n),f=gv(f),h=gv(h),n.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,v=["#define varying in",n.glslVersion===D_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===D_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const D=U+S+f,w=U+v+h,q=fv(l,l.VERTEX_SHADER,D),I=fv(l,l.FRAGMENT_SHADER,w);l.attachShader(T,q),l.attachShader(T,I),n.index0AttributeName!==void 0?l.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function P(F){if(r.debug.checkShaderErrors){const et=l.getProgramInfoLog(T).trim(),st=l.getShaderInfoLog(q).trim(),ht=l.getShaderInfoLog(I).trim();let pt=!0,z=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(pt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,q,I);else{const V=dv(l,q,"vertex"),k=dv(l,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+et+`
`+V+`
`+k)}else et!==""?console.warn("THREE.WebGLProgram: Program Info Log:",et):(st===""||ht==="")&&(z=!1);z&&(F.diagnostics={runnable:pt,programLog:et,vertexShader:{log:st,prefix:S},fragmentShader:{log:ht,prefix:v}})}l.deleteShader(q),l.deleteShader(I),G=new nu(l,T),L=MA(l,T)}let G;this.getUniforms=function(){return G===void 0&&P(this),G};let L;this.getAttributes=function(){return L===void 0&&P(this),L};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=l.getProgramParameter(T,dA)),R},this.destroy=function(){a.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=q,this.fragmentShader=I,this}let OA=0;class PA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,a=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(a),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new zA(t),n.set(t,a)),a}}class zA{constructor(t){this.id=OA++,this.code=t,this.usedTimes=0}}function BA(r,t,n,a,l,c,f){const h=new rx,p=new PA,m=new Set,g=[],_=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(L){return m.add(L),L===0?"uv":`uv${L}`}function S(L,R,F,et,st){const ht=et.fog,pt=st.geometry,z=L.isMeshStandardMaterial?et.environment:null,V=(L.isMeshStandardMaterial?n:t).get(L.envMap||z),k=V&&V.mapping===uu?V.image.height:null,xt=E[L.type];L.precision!==null&&(M=l.getMaxPrecision(L.precision),M!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",M,"instead."));const St=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,O=St!==void 0?St.length:0;let nt=0;pt.morphAttributes.position!==void 0&&(nt=1),pt.morphAttributes.normal!==void 0&&(nt=2),pt.morphAttributes.color!==void 0&&(nt=3);let yt,K,ut,Tt;if(xt){const Re=ji[xt];yt=Re.vertexShader,K=Re.fragmentShader}else yt=L.vertexShader,K=L.fragmentShader,p.update(L),ut=p.getVertexShaderID(L),Tt=p.getFragmentShaderID(L);const Mt=r.getRenderTarget(),Vt=r.state.buffers.depth.getReversed(),Ht=st.isInstancedMesh===!0,ae=st.isBatchedMesh===!0,Fe=!!L.map,de=!!L.matcap,Qe=!!V,Y=!!L.aoMap,Pn=!!L.lightMap,he=!!L.bumpMap,_e=!!L.normalMap,Qt=!!L.displacementMap,Oe=!!L.emissiveMap,Zt=!!L.metalnessMap,N=!!L.roughnessMap,A=L.anisotropy>0,at=L.clearcoat>0,dt=L.dispersion>0,Et=L.iridescence>0,gt=L.sheen>0,Wt=L.transmission>0,Lt=A&&!!L.anisotropyMap,zt=at&&!!L.clearcoatMap,ve=at&&!!L.clearcoatNormalMap,At=at&&!!L.clearcoatRoughnessMap,Bt=Et&&!!L.iridescenceMap,Kt=Et&&!!L.iridescenceThicknessMap,jt=gt&&!!L.sheenColorMap,Pt=gt&&!!L.sheenRoughnessMap,te=!!L.specularMap,re=!!L.specularColorMap,Ge=!!L.specularIntensityMap,X=Wt&&!!L.transmissionMap,wt=Wt&&!!L.thicknessMap,ct=!!L.gradientMap,vt=!!L.alphaMap,Ct=L.alphaTest>0,Nt=!!L.alphaHash,ee=!!L.extensions;let Je=us;L.toneMapped&&(Mt===null||Mt.isXRRenderTarget===!0)&&(Je=r.toneMapping);const _n={shaderID:xt,shaderType:L.type,shaderName:L.name,vertexShader:yt,fragmentShader:K,defines:L.defines,customVertexShaderID:ut,customFragmentShaderID:Tt,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:M,batching:ae,batchingColor:ae&&st._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&st.instanceColor!==null,instancingMorph:Ht&&st.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:Mt===null?r.outputColorSpace:Mt.isXRRenderTarget===!0?Mt.texture.colorSpace:Jr,alphaToCoverage:!!L.alphaToCoverage,map:Fe,matcap:de,envMap:Qe,envMapMode:Qe&&V.mapping,envMapCubeUVHeight:k,aoMap:Y,lightMap:Pn,bumpMap:he,normalMap:_e,displacementMap:x&&Qt,emissiveMap:Oe,normalMapObjectSpace:_e&&L.normalMapType===WM,normalMapTangentSpace:_e&&L.normalMapType===qM,metalnessMap:Zt,roughnessMap:N,anisotropy:A,anisotropyMap:Lt,clearcoat:at,clearcoatMap:zt,clearcoatNormalMap:ve,clearcoatRoughnessMap:At,dispersion:dt,iridescence:Et,iridescenceMap:Bt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:jt,sheenRoughnessMap:Pt,specularMap:te,specularColorMap:re,specularIntensityMap:Ge,transmission:Wt,transmissionMap:X,thicknessMap:wt,gradientMap:ct,opaque:L.transparent===!1&&L.blending===Vr&&L.alphaToCoverage===!1,alphaMap:vt,alphaTest:Ct,alphaHash:Nt,combine:L.combine,mapUv:Fe&&T(L.map.channel),aoMapUv:Y&&T(L.aoMap.channel),lightMapUv:Pn&&T(L.lightMap.channel),bumpMapUv:he&&T(L.bumpMap.channel),normalMapUv:_e&&T(L.normalMap.channel),displacementMapUv:Qt&&T(L.displacementMap.channel),emissiveMapUv:Oe&&T(L.emissiveMap.channel),metalnessMapUv:Zt&&T(L.metalnessMap.channel),roughnessMapUv:N&&T(L.roughnessMap.channel),anisotropyMapUv:Lt&&T(L.anisotropyMap.channel),clearcoatMapUv:zt&&T(L.clearcoatMap.channel),clearcoatNormalMapUv:ve&&T(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&T(L.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&T(L.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(L.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&T(L.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&T(L.sheenRoughnessMap.channel),specularMapUv:te&&T(L.specularMap.channel),specularColorMapUv:re&&T(L.specularColorMap.channel),specularIntensityMapUv:Ge&&T(L.specularIntensityMap.channel),transmissionMapUv:X&&T(L.transmissionMap.channel),thicknessMapUv:wt&&T(L.thicknessMap.channel),alphaMapUv:vt&&T(L.alphaMap.channel),vertexTangents:!!pt.attributes.tangent&&(_e||A),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,pointsUvs:st.isPoints===!0&&!!pt.attributes.uv&&(Fe||vt),fog:!!ht,useFog:L.fog===!0,fogExp2:!!ht&&ht.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Vt,skinning:st.isSkinnedMesh===!0,morphTargets:pt.morphAttributes.position!==void 0,morphNormals:pt.morphAttributes.normal!==void 0,morphColors:pt.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:nt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:L.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Je,decodeVideoTexture:Fe&&L.map.isVideoTexture===!0&&Ae.getTransfer(L.map.colorSpace)===Ie,decodeVideoTextureEmissive:Oe&&L.emissiveMap.isVideoTexture===!0&&Ae.getTransfer(L.emissiveMap.colorSpace)===Ie,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===ya,flipSided:L.side===Xn,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:ee&&L.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&L.extensions.multiDraw===!0||ae)&&a.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return _n.vertexUv1s=m.has(1),_n.vertexUv2s=m.has(2),_n.vertexUv3s=m.has(3),m.clear(),_n}function v(L){const R=[];if(L.shaderID?R.push(L.shaderID):(R.push(L.customVertexShaderID),R.push(L.customFragmentShaderID)),L.defines!==void 0)for(const F in L.defines)R.push(F),R.push(L.defines[F]);return L.isRawShaderMaterial===!1&&(U(R,L),D(R,L),R.push(r.outputColorSpace)),R.push(L.customProgramCacheKey),R.join()}function U(L,R){L.push(R.precision),L.push(R.outputColorSpace),L.push(R.envMapMode),L.push(R.envMapCubeUVHeight),L.push(R.mapUv),L.push(R.alphaMapUv),L.push(R.lightMapUv),L.push(R.aoMapUv),L.push(R.bumpMapUv),L.push(R.normalMapUv),L.push(R.displacementMapUv),L.push(R.emissiveMapUv),L.push(R.metalnessMapUv),L.push(R.roughnessMapUv),L.push(R.anisotropyMapUv),L.push(R.clearcoatMapUv),L.push(R.clearcoatNormalMapUv),L.push(R.clearcoatRoughnessMapUv),L.push(R.iridescenceMapUv),L.push(R.iridescenceThicknessMapUv),L.push(R.sheenColorMapUv),L.push(R.sheenRoughnessMapUv),L.push(R.specularMapUv),L.push(R.specularColorMapUv),L.push(R.specularIntensityMapUv),L.push(R.transmissionMapUv),L.push(R.thicknessMapUv),L.push(R.combine),L.push(R.fogExp2),L.push(R.sizeAttenuation),L.push(R.morphTargetsCount),L.push(R.morphAttributeCount),L.push(R.numDirLights),L.push(R.numPointLights),L.push(R.numSpotLights),L.push(R.numSpotLightMaps),L.push(R.numHemiLights),L.push(R.numRectAreaLights),L.push(R.numDirLightShadows),L.push(R.numPointLightShadows),L.push(R.numSpotLightShadows),L.push(R.numSpotLightShadowsWithMaps),L.push(R.numLightProbes),L.push(R.shadowMapType),L.push(R.toneMapping),L.push(R.numClippingPlanes),L.push(R.numClipIntersection),L.push(R.depthPacking)}function D(L,R){h.disableAll(),R.supportsVertexTextures&&h.enable(0),R.instancing&&h.enable(1),R.instancingColor&&h.enable(2),R.instancingMorph&&h.enable(3),R.matcap&&h.enable(4),R.envMap&&h.enable(5),R.normalMapObjectSpace&&h.enable(6),R.normalMapTangentSpace&&h.enable(7),R.clearcoat&&h.enable(8),R.iridescence&&h.enable(9),R.alphaTest&&h.enable(10),R.vertexColors&&h.enable(11),R.vertexAlphas&&h.enable(12),R.vertexUv1s&&h.enable(13),R.vertexUv2s&&h.enable(14),R.vertexUv3s&&h.enable(15),R.vertexTangents&&h.enable(16),R.anisotropy&&h.enable(17),R.alphaHash&&h.enable(18),R.batching&&h.enable(19),R.dispersion&&h.enable(20),R.batchingColor&&h.enable(21),L.push(h.mask),h.disableAll(),R.fog&&h.enable(0),R.useFog&&h.enable(1),R.flatShading&&h.enable(2),R.logarithmicDepthBuffer&&h.enable(3),R.reverseDepthBuffer&&h.enable(4),R.skinning&&h.enable(5),R.morphTargets&&h.enable(6),R.morphNormals&&h.enable(7),R.morphColors&&h.enable(8),R.premultipliedAlpha&&h.enable(9),R.shadowMapEnabled&&h.enable(10),R.doubleSided&&h.enable(11),R.flipSided&&h.enable(12),R.useDepthPacking&&h.enable(13),R.dithering&&h.enable(14),R.transmission&&h.enable(15),R.sheen&&h.enable(16),R.opaque&&h.enable(17),R.pointsUvs&&h.enable(18),R.decodeVideoTexture&&h.enable(19),R.decodeVideoTextureEmissive&&h.enable(20),R.alphaToCoverage&&h.enable(21),L.push(h.mask)}function w(L){const R=E[L.type];let F;if(R){const et=ji[R];F=gp.clone(et.uniforms)}else F=L.uniforms;return F}function q(L,R){let F;for(let et=0,st=g.length;et<st;et++){const ht=g[et];if(ht.cacheKey===R){F=ht,++F.usedTimes;break}}return F===void 0&&(F=new NA(r,R,L,c),g.push(F)),F}function I(L){if(--L.usedTimes===0){const R=g.indexOf(L);g[R]=g[g.length-1],g.pop(),L.destroy()}}function P(L){p.remove(L)}function G(){p.dispose()}return{getParameters:S,getProgramCacheKey:v,getUniforms:w,acquireProgram:q,releaseProgram:I,releaseShaderCache:P,programs:g,dispose:G}}function IA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function a(f){r.delete(f)}function l(f,h,p){r.get(f)[h]=p}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:l,dispose:c}}function FA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function vv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function xv(){const r=[];let t=0;const n=[],a=[],l=[];function c(){t=0,n.length=0,a.length=0,l.length=0}function f(_,x,M,E,T,S){let v=r[t];return v===void 0?(v={id:_.id,object:_,geometry:x,material:M,groupOrder:E,renderOrder:_.renderOrder,z:T,group:S},r[t]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=M,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=T,v.group=S),t++,v}function h(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?a.push(v):M.transparent===!0?l.push(v):n.push(v)}function p(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?a.unshift(v):M.transparent===!0?l.unshift(v):n.unshift(v)}function m(_,x){n.length>1&&n.sort(_||FA),a.length>1&&a.sort(x||vv),l.length>1&&l.sort(x||vv)}function g(){for(let _=t,x=r.length;_<x;_++){const M=r[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:a,transparent:l,init:c,push:h,unshift:p,finish:g,sort:m}}function GA(){let r=new WeakMap;function t(a,l){const c=r.get(a);let f;return c===void 0?(f=new xv,r.set(a,[f])):l>=c.length?(f=new xv,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function HA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new J,color:new ue};break;case"SpotLight":n={position:new J,direction:new J,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new ue,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":n={color:new ue,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=n,n}}}function VA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let kA=0;function XA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function qA(r){const t=new HA,n=VA(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)a.probe.push(new J);const l=new J,c=new sn,f=new sn;function h(m){let g=0,_=0,x=0;for(let L=0;L<9;L++)a.probe[L].set(0,0,0);let M=0,E=0,T=0,S=0,v=0,U=0,D=0,w=0,q=0,I=0,P=0;m.sort(XA);for(let L=0,R=m.length;L<R;L++){const F=m[L],et=F.color,st=F.intensity,ht=F.distance,pt=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)g+=et.r*st,_+=et.g*st,x+=et.b*st;else if(F.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(F.sh.coefficients[z],st);P++}else if(F.isDirectionalLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const V=F.shadow,k=n.get(F);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,a.directionalShadow[M]=k,a.directionalShadowMap[M]=pt,a.directionalShadowMatrix[M]=F.shadow.matrix,U++}a.directional[M]=z,M++}else if(F.isSpotLight){const z=t.get(F);z.position.setFromMatrixPosition(F.matrixWorld),z.color.copy(et).multiplyScalar(st),z.distance=ht,z.coneCos=Math.cos(F.angle),z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),z.decay=F.decay,a.spot[T]=z;const V=F.shadow;if(F.map&&(a.spotLightMap[q]=F.map,q++,V.updateMatrices(F),F.castShadow&&I++),a.spotLightMatrix[T]=V.matrix,F.castShadow){const k=n.get(F);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,a.spotShadow[T]=k,a.spotShadowMap[T]=pt,w++}T++}else if(F.isRectAreaLight){const z=t.get(F);z.color.copy(et).multiplyScalar(st),z.halfWidth.set(F.width*.5,0,0),z.halfHeight.set(0,F.height*.5,0),a.rectArea[S]=z,S++}else if(F.isPointLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),z.distance=F.distance,z.decay=F.decay,F.castShadow){const V=F.shadow,k=n.get(F);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,k.shadowCameraNear=V.camera.near,k.shadowCameraFar=V.camera.far,a.pointShadow[E]=k,a.pointShadowMap[E]=pt,a.pointShadowMatrix[E]=F.shadow.matrix,D++}a.point[E]=z,E++}else if(F.isHemisphereLight){const z=t.get(F);z.skyColor.copy(F.color).multiplyScalar(st),z.groundColor.copy(F.groundColor).multiplyScalar(st),a.hemi[v]=z,v++}}S>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Ot.LTC_FLOAT_1,a.rectAreaLTC2=Ot.LTC_FLOAT_2):(a.rectAreaLTC1=Ot.LTC_HALF_1,a.rectAreaLTC2=Ot.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=x;const G=a.hash;(G.directionalLength!==M||G.pointLength!==E||G.spotLength!==T||G.rectAreaLength!==S||G.hemiLength!==v||G.numDirectionalShadows!==U||G.numPointShadows!==D||G.numSpotShadows!==w||G.numSpotMaps!==q||G.numLightProbes!==P)&&(a.directional.length=M,a.spot.length=T,a.rectArea.length=S,a.point.length=E,a.hemi.length=v,a.directionalShadow.length=U,a.directionalShadowMap.length=U,a.pointShadow.length=D,a.pointShadowMap.length=D,a.spotShadow.length=w,a.spotShadowMap.length=w,a.directionalShadowMatrix.length=U,a.pointShadowMatrix.length=D,a.spotLightMatrix.length=w+q-I,a.spotLightMap.length=q,a.numSpotLightShadowsWithMaps=I,a.numLightProbes=P,G.directionalLength=M,G.pointLength=E,G.spotLength=T,G.rectAreaLength=S,G.hemiLength=v,G.numDirectionalShadows=U,G.numPointShadows=D,G.numSpotShadows=w,G.numSpotMaps=q,G.numLightProbes=P,a.version=kA++)}function p(m,g){let _=0,x=0,M=0,E=0,T=0;const S=g.matrixWorldInverse;for(let v=0,U=m.length;v<U;v++){const D=m[v];if(D.isDirectionalLight){const w=a.directional[_];w.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),_++}else if(D.isSpotLight){const w=a.spot[M];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),w.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),M++}else if(D.isRectAreaLight){const w=a.rectArea[E];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),f.identity(),c.copy(D.matrixWorld),c.premultiply(S),f.extractRotation(c),w.halfWidth.set(D.width*.5,0,0),w.halfHeight.set(0,D.height*.5,0),w.halfWidth.applyMatrix4(f),w.halfHeight.applyMatrix4(f),E++}else if(D.isPointLight){const w=a.point[x];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),x++}else if(D.isHemisphereLight){const w=a.hemi[T];w.direction.setFromMatrixPosition(D.matrixWorld),w.direction.transformDirection(S),T++}}}return{setup:h,setupView:p,state:a}}function yv(r){const t=new qA(r),n=[],a=[];function l(g){m.camera=g,n.length=0,a.length=0}function c(g){n.push(g)}function f(g){a.push(g)}function h(){t.setup(n)}function p(g){t.setupView(n,g)}const m={lightsArray:n,shadowsArray:a,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:h,setupLightsView:p,pushLight:c,pushShadow:f}}function WA(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let h;return f===void 0?(h=new yv(r),t.set(l,[h])):c>=f.length?(h=new yv(r),f.push(h)):h=f[c],h}function a(){t=new WeakMap}return{get:n,dispose:a}}class jA extends to{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=kM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class YA extends to{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ZA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KA=`uniform sampler2D shadow_pass;
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
}`;function QA(r,t,n){let a=new dx;const l=new Ce,c=new Ce,f=new cn,h=new jA({depthPacking:XM}),p=new YA,m={},g=n.maxTextureSize,_={[fs]:Xn,[Xn]:fs,[ya]:ya},x=new Gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:ZA,fragmentShader:KA}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const E=new An;E.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new ln(E,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bv;let v=this.type;this.render=function(I,P,G){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||I.length===0)return;const L=r.getRenderTarget(),R=r.getActiveCubeFace(),F=r.getActiveMipmapLevel(),et=r.state;et.setBlending(Ea),et.buffers.color.setClear(1,1,1,1),et.buffers.depth.setTest(!0),et.setScissorTest(!1);const st=v!==xa&&this.type===xa,ht=v===xa&&this.type!==xa;for(let pt=0,z=I.length;pt<z;pt++){const V=I[pt],k=V.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;l.copy(k.mapSize);const xt=k.getFrameExtents();if(l.multiply(xt),c.copy(k.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/xt.x),l.x=c.x*xt.x,k.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/xt.y),l.y=c.y*xt.y,k.mapSize.y=c.y)),k.map===null||st===!0||ht===!0){const O=this.type!==xa?{minFilter:Fi,magFilter:Fi}:{};k.map!==null&&k.map.dispose(),k.map=new hs(l.x,l.y,O),k.map.texture.name=V.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const St=k.getViewportCount();for(let O=0;O<St;O++){const nt=k.getViewport(O);f.set(c.x*nt.x,c.y*nt.y,c.x*nt.z,c.y*nt.w),et.viewport(f),k.updateMatrices(V,O),a=k.getFrustum(),w(P,G,k.camera,V,this.type)}k.isPointLightShadow!==!0&&this.type===xa&&U(k,G),k.needsUpdate=!1}v=this.type,S.needsUpdate=!1,r.setRenderTarget(L,R,F)};function U(I,P){const G=t.update(T);x.defines.VSM_SAMPLES!==I.blurSamples&&(x.defines.VSM_SAMPLES=I.blurSamples,M.defines.VSM_SAMPLES=I.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new hs(l.x,l.y)),x.uniforms.shadow_pass.value=I.map.texture,x.uniforms.resolution.value=I.mapSize,x.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(P,null,G,x,T,null),M.uniforms.shadow_pass.value=I.mapPass.texture,M.uniforms.resolution.value=I.mapSize,M.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(P,null,G,M,T,null)}function D(I,P,G,L){let R=null;const F=G.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(F!==void 0)R=F;else if(R=G.isPointLight===!0?p:h,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const et=R.uuid,st=P.uuid;let ht=m[et];ht===void 0&&(ht={},m[et]=ht);let pt=ht[st];pt===void 0&&(pt=R.clone(),ht[st]=pt,P.addEventListener("dispose",q)),R=pt}if(R.visible=P.visible,R.wireframe=P.wireframe,L===xa?R.side=P.shadowSide!==null?P.shadowSide:P.side:R.side=P.shadowSide!==null?P.shadowSide:_[P.side],R.alphaMap=P.alphaMap,R.alphaTest=P.alphaTest,R.map=P.map,R.clipShadows=P.clipShadows,R.clippingPlanes=P.clippingPlanes,R.clipIntersection=P.clipIntersection,R.displacementMap=P.displacementMap,R.displacementScale=P.displacementScale,R.displacementBias=P.displacementBias,R.wireframeLinewidth=P.wireframeLinewidth,R.linewidth=P.linewidth,G.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const et=r.properties.get(R);et.light=G}return R}function w(I,P,G,L,R){if(I.visible===!1)return;if(I.layers.test(P.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&R===xa)&&(!I.frustumCulled||a.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,I.matrixWorld);const st=t.update(I),ht=I.material;if(Array.isArray(ht)){const pt=st.groups;for(let z=0,V=pt.length;z<V;z++){const k=pt[z],xt=ht[k.materialIndex];if(xt&&xt.visible){const St=D(I,xt,L,R);I.onBeforeShadow(r,I,P,G,st,St,k),r.renderBufferDirect(G,null,st,St,I,k),I.onAfterShadow(r,I,P,G,st,St,k)}}}else if(ht.visible){const pt=D(I,ht,L,R);I.onBeforeShadow(r,I,P,G,st,pt,null),r.renderBufferDirect(G,null,st,pt,I,null),I.onAfterShadow(r,I,P,G,st,pt,null)}}const et=I.children;for(let st=0,ht=et.length;st<ht;st++)w(et[st],P,G,L,R)}function q(I){I.target.removeEventListener("dispose",q);for(const G in m){const L=m[G],R=I.target.uuid;R in L&&(L[R].dispose(),delete L[R])}}}const JA={[yd]:Sd,[Md]:bd,[Ed]:Ad,[qr]:Td,[Sd]:yd,[bd]:Md,[Ad]:Ed,[Td]:qr};function $A(r,t){function n(){let X=!1;const wt=new cn;let ct=null;const vt=new cn(0,0,0,0);return{setMask:function(Ct){ct!==Ct&&!X&&(r.colorMask(Ct,Ct,Ct,Ct),ct=Ct)},setLocked:function(Ct){X=Ct},setClear:function(Ct,Nt,ee,Je,_n){_n===!0&&(Ct*=Je,Nt*=Je,ee*=Je),wt.set(Ct,Nt,ee,Je),vt.equals(wt)===!1&&(r.clearColor(Ct,Nt,ee,Je),vt.copy(wt))},reset:function(){X=!1,ct=null,vt.set(-1,0,0,0)}}}function a(){let X=!1,wt=!1,ct=null,vt=null,Ct=null;return{setReversed:function(Nt){if(wt!==Nt){const ee=t.get("EXT_clip_control");wt?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT);const Je=Ct;Ct=null,this.setClear(Je)}wt=Nt},getReversed:function(){return wt},setTest:function(Nt){Nt?Mt(r.DEPTH_TEST):Vt(r.DEPTH_TEST)},setMask:function(Nt){ct!==Nt&&!X&&(r.depthMask(Nt),ct=Nt)},setFunc:function(Nt){if(wt&&(Nt=JA[Nt]),vt!==Nt){switch(Nt){case yd:r.depthFunc(r.NEVER);break;case Sd:r.depthFunc(r.ALWAYS);break;case Md:r.depthFunc(r.LESS);break;case qr:r.depthFunc(r.LEQUAL);break;case Ed:r.depthFunc(r.EQUAL);break;case Td:r.depthFunc(r.GEQUAL);break;case bd:r.depthFunc(r.GREATER);break;case Ad:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}vt=Nt}},setLocked:function(Nt){X=Nt},setClear:function(Nt){Ct!==Nt&&(wt&&(Nt=1-Nt),r.clearDepth(Nt),Ct=Nt)},reset:function(){X=!1,ct=null,vt=null,Ct=null,wt=!1}}}function l(){let X=!1,wt=null,ct=null,vt=null,Ct=null,Nt=null,ee=null,Je=null,_n=null;return{setTest:function(Re){X||(Re?Mt(r.STENCIL_TEST):Vt(r.STENCIL_TEST))},setMask:function(Re){wt!==Re&&!X&&(r.stencilMask(Re),wt=Re)},setFunc:function(Re,Rn,wi){(ct!==Re||vt!==Rn||Ct!==wi)&&(r.stencilFunc(Re,Rn,wi),ct=Re,vt=Rn,Ct=wi)},setOp:function(Re,Rn,wi){(Nt!==Re||ee!==Rn||Je!==wi)&&(r.stencilOp(Re,Rn,wi),Nt=Re,ee=Rn,Je=wi)},setLocked:function(Re){X=Re},setClear:function(Re){_n!==Re&&(r.clearStencil(Re),_n=Re)},reset:function(){X=!1,wt=null,ct=null,vt=null,Ct=null,Nt=null,ee=null,Je=null,_n=null}}}const c=new n,f=new a,h=new l,p=new WeakMap,m=new WeakMap;let g={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,U=null,D=null,w=null,q=null,I=null,P=new ue(0,0,0),G=0,L=!1,R=null,F=null,et=null,st=null,ht=null;const pt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,V=0;const k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(k)[1]),z=V>=1):k.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),z=V>=2);let xt=null,St={};const O=r.getParameter(r.SCISSOR_BOX),nt=r.getParameter(r.VIEWPORT),yt=new cn().fromArray(O),K=new cn().fromArray(nt);function ut(X,wt,ct,vt){const Ct=new Uint8Array(4),Nt=r.createTexture();r.bindTexture(X,Nt),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ee=0;ee<ct;ee++)X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,vt,0,r.RGBA,r.UNSIGNED_BYTE,Ct):r.texImage2D(wt+ee,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ct);return Nt}const Tt={};Tt[r.TEXTURE_2D]=ut(r.TEXTURE_2D,r.TEXTURE_2D,1),Tt[r.TEXTURE_CUBE_MAP]=ut(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[r.TEXTURE_2D_ARRAY]=ut(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Tt[r.TEXTURE_3D]=ut(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Mt(r.DEPTH_TEST),f.setFunc(qr),he(!1),_e(b_),Mt(r.CULL_FACE),Y(Ea);function Mt(X){g[X]!==!0&&(r.enable(X),g[X]=!0)}function Vt(X){g[X]!==!1&&(r.disable(X),g[X]=!1)}function Ht(X,wt){return _[X]!==wt?(r.bindFramebuffer(X,wt),_[X]=wt,X===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=wt),X===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function ae(X,wt){let ct=M,vt=!1;if(X){ct=x.get(wt),ct===void 0&&(ct=[],x.set(wt,ct));const Ct=X.textures;if(ct.length!==Ct.length||ct[0]!==r.COLOR_ATTACHMENT0){for(let Nt=0,ee=Ct.length;Nt<ee;Nt++)ct[Nt]=r.COLOR_ATTACHMENT0+Nt;ct.length=Ct.length,vt=!0}}else ct[0]!==r.BACK&&(ct[0]=r.BACK,vt=!0);vt&&r.drawBuffers(ct)}function Fe(X){return E!==X?(r.useProgram(X),E=X,!0):!1}const de={[Fs]:r.FUNC_ADD,[MM]:r.FUNC_SUBTRACT,[EM]:r.FUNC_REVERSE_SUBTRACT};de[TM]=r.MIN,de[bM]=r.MAX;const Qe={[AM]:r.ZERO,[RM]:r.ONE,[wM]:r.SRC_COLOR,[vd]:r.SRC_ALPHA,[OM]:r.SRC_ALPHA_SATURATE,[LM]:r.DST_COLOR,[DM]:r.DST_ALPHA,[CM]:r.ONE_MINUS_SRC_COLOR,[xd]:r.ONE_MINUS_SRC_ALPHA,[NM]:r.ONE_MINUS_DST_COLOR,[UM]:r.ONE_MINUS_DST_ALPHA,[PM]:r.CONSTANT_COLOR,[zM]:r.ONE_MINUS_CONSTANT_COLOR,[BM]:r.CONSTANT_ALPHA,[IM]:r.ONE_MINUS_CONSTANT_ALPHA};function Y(X,wt,ct,vt,Ct,Nt,ee,Je,_n,Re){if(X===Ea){T===!0&&(Vt(r.BLEND),T=!1);return}if(T===!1&&(Mt(r.BLEND),T=!0),X!==SM){if(X!==S||Re!==L){if((v!==Fs||w!==Fs)&&(r.blendEquation(r.FUNC_ADD),v=Fs,w=Fs),Re)switch(X){case Vr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rl:r.blendFunc(r.ONE,r.ONE);break;case A_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case R_:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Vr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rl:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case A_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case R_:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}U=null,D=null,q=null,I=null,P.set(0,0,0),G=0,S=X,L=Re}return}Ct=Ct||wt,Nt=Nt||ct,ee=ee||vt,(wt!==v||Ct!==w)&&(r.blendEquationSeparate(de[wt],de[Ct]),v=wt,w=Ct),(ct!==U||vt!==D||Nt!==q||ee!==I)&&(r.blendFuncSeparate(Qe[ct],Qe[vt],Qe[Nt],Qe[ee]),U=ct,D=vt,q=Nt,I=ee),(Je.equals(P)===!1||_n!==G)&&(r.blendColor(Je.r,Je.g,Je.b,_n),P.copy(Je),G=_n),S=X,L=!1}function Pn(X,wt){X.side===ya?Vt(r.CULL_FACE):Mt(r.CULL_FACE);let ct=X.side===Xn;wt&&(ct=!ct),he(ct),X.blending===Vr&&X.transparent===!1?Y(Ea):Y(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),c.setMask(X.colorWrite);const vt=X.stencilWrite;h.setTest(vt),vt&&(h.setMask(X.stencilWriteMask),h.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),h.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Oe(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Mt(r.SAMPLE_ALPHA_TO_COVERAGE):Vt(r.SAMPLE_ALPHA_TO_COVERAGE)}function he(X){R!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),R=X)}function _e(X){X!==vM?(Mt(r.CULL_FACE),X!==F&&(X===b_?r.cullFace(r.BACK):X===xM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Vt(r.CULL_FACE),F=X}function Qt(X){X!==et&&(z&&r.lineWidth(X),et=X)}function Oe(X,wt,ct){X?(Mt(r.POLYGON_OFFSET_FILL),(st!==wt||ht!==ct)&&(r.polygonOffset(wt,ct),st=wt,ht=ct)):Vt(r.POLYGON_OFFSET_FILL)}function Zt(X){X?Mt(r.SCISSOR_TEST):Vt(r.SCISSOR_TEST)}function N(X){X===void 0&&(X=r.TEXTURE0+pt-1),xt!==X&&(r.activeTexture(X),xt=X)}function A(X,wt,ct){ct===void 0&&(xt===null?ct=r.TEXTURE0+pt-1:ct=xt);let vt=St[ct];vt===void 0&&(vt={type:void 0,texture:void 0},St[ct]=vt),(vt.type!==X||vt.texture!==wt)&&(xt!==ct&&(r.activeTexture(ct),xt=ct),r.bindTexture(X,wt||Tt[X]),vt.type=X,vt.texture=wt)}function at(){const X=St[xt];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function dt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Et(){try{r.compressedTexImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Wt(){try{r.texSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ve(){try{r.texStorage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function jt(X){yt.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),yt.copy(X))}function Pt(X){K.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),K.copy(X))}function te(X,wt){let ct=m.get(wt);ct===void 0&&(ct=new WeakMap,m.set(wt,ct));let vt=ct.get(X);vt===void 0&&(vt=r.getUniformBlockIndex(wt,X.name),ct.set(X,vt))}function re(X,wt){const vt=m.get(wt).get(X);p.get(wt)!==vt&&(r.uniformBlockBinding(wt,vt,X.__bindingPointIndex),p.set(wt,vt))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},xt=null,St={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,U=null,D=null,w=null,q=null,I=null,P=new ue(0,0,0),G=0,L=!1,R=null,F=null,et=null,st=null,ht=null,yt.set(0,0,r.canvas.width,r.canvas.height),K.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:Mt,disable:Vt,bindFramebuffer:Ht,drawBuffers:ae,useProgram:Fe,setBlending:Y,setMaterial:Pn,setFlipSided:he,setCullFace:_e,setLineWidth:Qt,setPolygonOffset:Oe,setScissorTest:Zt,activeTexture:N,bindTexture:A,unbindTexture:at,compressedTexImage2D:dt,compressedTexImage3D:Et,texImage2D:Bt,texImage3D:Kt,updateUBOMapping:te,uniformBlockBinding:re,texStorage2D:ve,texStorage3D:At,texSubImage2D:gt,texSubImage3D:Wt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:zt,scissor:jt,viewport:Pt,reset:Ge}}function Sv(r,t,n,a){const l=t2(a);switch(n){case Zv:return r*t;case Qv:return r*t;case Jv:return r*t*2;case $v:return r*t/l.components*l.byteLength;case hp:return r*t/l.components*l.byteLength;case tx:return r*t*2/l.components*l.byteLength;case dp:return r*t*2/l.components*l.byteLength;case Kv:return r*t*3/l.components*l.byteLength;case Ii:return r*t*4/l.components*l.byteLength;case pp:return r*t*4/l.components*l.byteLength;case Qc:case Jc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case $c:case tu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ld:case Od:return Math.max(r,16)*Math.max(t,8)/4;case Ud:case Nd:return Math.max(r,8)*Math.max(t,8)/2;case Pd:case zd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Bd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Id:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Fd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Gd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Vd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case kd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Xd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case qd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Wd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case jd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Zd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Kd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Qd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case eu:case Jd:case $d:return Math.ceil(r/4)*Math.ceil(t/4)*16;case ex:case tp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case ep:case np:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function t2(r){switch(r){case ba:case Wv:return{byteLength:1,components:1};case ol:case jv:case Qr:return{byteLength:2,components:1};case up:case fp:return{byteLength:2,components:4};case Xs:case cp:case Sa:return{byteLength:4,components:1};case Yv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function e2(r,t,n,a,l,c,f){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new Ce,g=new WeakMap;let _;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,A){return M?new OffscreenCanvas(N,A):su("canvas")}function T(N,A,at){let dt=1;const Et=Zt(N);if((Et.width>at||Et.height>at)&&(dt=at/Math.max(Et.width,Et.height)),dt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const gt=Math.floor(dt*Et.width),Wt=Math.floor(dt*Et.height);_===void 0&&(_=E(gt,Wt));const Lt=A?E(gt,Wt):_;return Lt.width=gt,Lt.height=Wt,Lt.getContext("2d").drawImage(N,0,0,gt,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Et.width+"x"+Et.height+") to ("+gt+"x"+Wt+")."),Lt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Et.width+"x"+Et.height+")."),N;return N}function S(N){return N.generateMipmaps}function v(N){r.generateMipmap(N)}function U(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function D(N,A,at,dt,Et=!1){if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt=A;if(A===r.RED&&(at===r.FLOAT&&(gt=r.R32F),at===r.HALF_FLOAT&&(gt=r.R16F),at===r.UNSIGNED_BYTE&&(gt=r.R8)),A===r.RED_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.R8UI),at===r.UNSIGNED_SHORT&&(gt=r.R16UI),at===r.UNSIGNED_INT&&(gt=r.R32UI),at===r.BYTE&&(gt=r.R8I),at===r.SHORT&&(gt=r.R16I),at===r.INT&&(gt=r.R32I)),A===r.RG&&(at===r.FLOAT&&(gt=r.RG32F),at===r.HALF_FLOAT&&(gt=r.RG16F),at===r.UNSIGNED_BYTE&&(gt=r.RG8)),A===r.RG_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RG8UI),at===r.UNSIGNED_SHORT&&(gt=r.RG16UI),at===r.UNSIGNED_INT&&(gt=r.RG32UI),at===r.BYTE&&(gt=r.RG8I),at===r.SHORT&&(gt=r.RG16I),at===r.INT&&(gt=r.RG32I)),A===r.RGB_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),at===r.UNSIGNED_INT&&(gt=r.RGB32UI),at===r.BYTE&&(gt=r.RGB8I),at===r.SHORT&&(gt=r.RGB16I),at===r.INT&&(gt=r.RGB32I)),A===r.RGBA_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),at===r.UNSIGNED_INT&&(gt=r.RGBA32UI),at===r.BYTE&&(gt=r.RGBA8I),at===r.SHORT&&(gt=r.RGBA16I),at===r.INT&&(gt=r.RGBA32I)),A===r.RGB&&at===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),A===r.RGBA){const Wt=Et?fu:Ae.getTransfer(dt);at===r.FLOAT&&(gt=r.RGBA32F),at===r.HALF_FLOAT&&(gt=r.RGBA16F),at===r.UNSIGNED_BYTE&&(gt=Wt===Ie?r.SRGB8_ALPHA8:r.RGBA8),at===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),at===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function w(N,A){let at;return N?A===null||A===Xs||A===Yr?at=r.DEPTH24_STENCIL8:A===Sa?at=r.DEPTH32F_STENCIL8:A===ol&&(at=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Xs||A===Yr?at=r.DEPTH_COMPONENT24:A===Sa?at=r.DEPTH_COMPONENT32F:A===ol&&(at=r.DEPTH_COMPONENT16),at}function q(N,A){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==Fi&&N.minFilter!==Yi?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function I(N){const A=N.target;A.removeEventListener("dispose",I),G(A),A.isVideoTexture&&g.delete(A)}function P(N){const A=N.target;A.removeEventListener("dispose",P),R(A)}function G(N){const A=a.get(N);if(A.__webglInit===void 0)return;const at=N.source,dt=x.get(at);if(dt){const Et=dt[A.__cacheKey];Et.usedTimes--,Et.usedTimes===0&&L(N),Object.keys(dt).length===0&&x.delete(at)}a.remove(N)}function L(N){const A=a.get(N);r.deleteTexture(A.__webglTexture);const at=N.source,dt=x.get(at);delete dt[A.__cacheKey],f.memory.textures--}function R(N){const A=a.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),a.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(A.__webglFramebuffer[dt]))for(let Et=0;Et<A.__webglFramebuffer[dt].length;Et++)r.deleteFramebuffer(A.__webglFramebuffer[dt][Et]);else r.deleteFramebuffer(A.__webglFramebuffer[dt]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[dt])}else{if(Array.isArray(A.__webglFramebuffer))for(let dt=0;dt<A.__webglFramebuffer.length;dt++)r.deleteFramebuffer(A.__webglFramebuffer[dt]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let dt=0;dt<A.__webglColorRenderbuffer.length;dt++)A.__webglColorRenderbuffer[dt]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[dt]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const at=N.textures;for(let dt=0,Et=at.length;dt<Et;dt++){const gt=a.get(at[dt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),a.remove(at[dt])}a.remove(N)}let F=0;function et(){F=0}function st(){const N=F;return N>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),F+=1,N}function ht(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function pt(N,A){const at=a.get(N);if(N.isVideoTexture&&Qt(N),N.isRenderTargetTexture===!1&&N.version>0&&at.__version!==N.version){const dt=N.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(at,N,A);return}}n.bindTexture(r.TEXTURE_2D,at.__webglTexture,r.TEXTURE0+A)}function z(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){K(at,N,A);return}n.bindTexture(r.TEXTURE_2D_ARRAY,at.__webglTexture,r.TEXTURE0+A)}function V(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){K(at,N,A);return}n.bindTexture(r.TEXTURE_3D,at.__webglTexture,r.TEXTURE0+A)}function k(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){ut(at,N,A);return}n.bindTexture(r.TEXTURE_CUBE_MAP,at.__webglTexture,r.TEXTURE0+A)}const xt={[Cd]:r.REPEAT,[Vs]:r.CLAMP_TO_EDGE,[Dd]:r.MIRRORED_REPEAT},St={[Fi]:r.NEAREST,[VM]:r.NEAREST_MIPMAP_NEAREST,[Tc]:r.NEAREST_MIPMAP_LINEAR,[Yi]:r.LINEAR,[Oh]:r.LINEAR_MIPMAP_NEAREST,[ks]:r.LINEAR_MIPMAP_LINEAR},O={[jM]:r.NEVER,[$M]:r.ALWAYS,[YM]:r.LESS,[nx]:r.LEQUAL,[ZM]:r.EQUAL,[JM]:r.GEQUAL,[KM]:r.GREATER,[QM]:r.NOTEQUAL};function nt(N,A){if(A.type===Sa&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===Yi||A.magFilter===Oh||A.magFilter===Tc||A.magFilter===ks||A.minFilter===Yi||A.minFilter===Oh||A.minFilter===Tc||A.minFilter===ks)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,xt[A.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,xt[A.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,xt[A.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,St[A.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,St[A.minFilter]),A.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,O[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Fi||A.minFilter!==Tc&&A.minFilter!==ks||A.type===Sa&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||a.get(A).__currentAnisotropy){const at=t.get("EXT_texture_filter_anisotropic");r.texParameterf(N,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),a.get(A).__currentAnisotropy=A.anisotropy}}}function yt(N,A){let at=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",I));const dt=A.source;let Et=x.get(dt);Et===void 0&&(Et={},x.set(dt,Et));const gt=ht(A);if(gt!==N.__cacheKey){Et[gt]===void 0&&(Et[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,at=!0),Et[gt].usedTimes++;const Wt=Et[N.__cacheKey];Wt!==void 0&&(Et[N.__cacheKey].usedTimes--,Wt.usedTimes===0&&L(A)),N.__cacheKey=gt,N.__webglTexture=Et[gt].texture}return at}function K(N,A,at){let dt=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(dt=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(dt=r.TEXTURE_3D);const Et=yt(N,A),gt=A.source;n.bindTexture(dt,N.__webglTexture,r.TEXTURE0+at);const Wt=a.get(gt);if(gt.version!==Wt.__version||Et===!0){n.activeTexture(r.TEXTURE0+at);const Lt=Ae.getPrimaries(Ae.workingColorSpace),zt=A.colorSpace===ls?null:Ae.getPrimaries(A.colorSpace),ve=A.colorSpace===ls||Lt===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let At=T(A.image,!1,l.maxTextureSize);At=Oe(A,At);const Bt=c.convert(A.format,A.colorSpace),Kt=c.convert(A.type);let jt=D(A.internalFormat,Bt,Kt,A.colorSpace,A.isVideoTexture);nt(dt,A);let Pt;const te=A.mipmaps,re=A.isVideoTexture!==!0,Ge=Wt.__version===void 0||Et===!0,X=gt.dataReady,wt=q(A,At);if(A.isDepthTexture)jt=w(A.format===Zr,A.type),Ge&&(re?n.texStorage2D(r.TEXTURE_2D,1,jt,At.width,At.height):n.texImage2D(r.TEXTURE_2D,0,jt,At.width,At.height,0,Bt,Kt,null));else if(A.isDataTexture)if(te.length>0){re&&Ge&&n.texStorage2D(r.TEXTURE_2D,wt,jt,te[0].width,te[0].height);for(let ct=0,vt=te.length;ct<vt;ct++)Pt=te[ct],re?X&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,Bt,Kt,Pt.data):n.texImage2D(r.TEXTURE_2D,ct,jt,Pt.width,Pt.height,0,Bt,Kt,Pt.data);A.generateMipmaps=!1}else re?(Ge&&n.texStorage2D(r.TEXTURE_2D,wt,jt,At.width,At.height),X&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Kt,At.data)):n.texImage2D(r.TEXTURE_2D,0,jt,At.width,At.height,0,Bt,Kt,At.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){re&&Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,jt,te[0].width,te[0].height,At.depth);for(let ct=0,vt=te.length;ct<vt;ct++)if(Pt=te[ct],A.format!==Ii)if(Bt!==null)if(re){if(X)if(A.layerUpdates.size>0){const Ct=Sv(Pt.width,Pt.height,A.format,A.type);for(const Nt of A.layerUpdates){const ee=Pt.data.subarray(Nt*Ct/Pt.data.BYTES_PER_ELEMENT,(Nt+1)*Ct/Pt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,Nt,Pt.width,Pt.height,1,Bt,ee)}A.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Pt.width,Pt.height,At.depth,Bt,Pt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ct,jt,Pt.width,Pt.height,At.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?X&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Pt.width,Pt.height,At.depth,Bt,Kt,Pt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,ct,jt,Pt.width,Pt.height,At.depth,0,Bt,Kt,Pt.data)}else{re&&Ge&&n.texStorage2D(r.TEXTURE_2D,wt,jt,te[0].width,te[0].height);for(let ct=0,vt=te.length;ct<vt;ct++)Pt=te[ct],A.format!==Ii?Bt!==null?re?X&&n.compressedTexSubImage2D(r.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,Bt,Pt.data):n.compressedTexImage2D(r.TEXTURE_2D,ct,jt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?X&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,Bt,Kt,Pt.data):n.texImage2D(r.TEXTURE_2D,ct,jt,Pt.width,Pt.height,0,Bt,Kt,Pt.data)}else if(A.isDataArrayTexture)if(re){if(Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,jt,At.width,At.height,At.depth),X)if(A.layerUpdates.size>0){const ct=Sv(At.width,At.height,A.format,A.type);for(const vt of A.layerUpdates){const Ct=At.data.subarray(vt*ct/At.data.BYTES_PER_ELEMENT,(vt+1)*ct/At.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,vt,At.width,At.height,1,Bt,Kt,Ct)}A.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,jt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(A.isData3DTexture)re?(Ge&&n.texStorage3D(r.TEXTURE_3D,wt,jt,At.width,At.height,At.depth),X&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)):n.texImage3D(r.TEXTURE_3D,0,jt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(A.isFramebufferTexture){if(Ge)if(re)n.texStorage2D(r.TEXTURE_2D,wt,jt,At.width,At.height);else{let ct=At.width,vt=At.height;for(let Ct=0;Ct<wt;Ct++)n.texImage2D(r.TEXTURE_2D,Ct,jt,ct,vt,0,Bt,Kt,null),ct>>=1,vt>>=1}}else if(te.length>0){if(re&&Ge){const ct=Zt(te[0]);n.texStorage2D(r.TEXTURE_2D,wt,jt,ct.width,ct.height)}for(let ct=0,vt=te.length;ct<vt;ct++)Pt=te[ct],re?X&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Bt,Kt,Pt):n.texImage2D(r.TEXTURE_2D,ct,jt,Bt,Kt,Pt);A.generateMipmaps=!1}else if(re){if(Ge){const ct=Zt(At);n.texStorage2D(r.TEXTURE_2D,wt,jt,ct.width,ct.height)}X&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Kt,At)}else n.texImage2D(r.TEXTURE_2D,0,jt,Bt,Kt,At);S(A)&&v(dt),Wt.__version=gt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function ut(N,A,at){if(A.image.length!==6)return;const dt=yt(N,A),Et=A.source;n.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+at);const gt=a.get(Et);if(Et.version!==gt.__version||dt===!0){n.activeTexture(r.TEXTURE0+at);const Wt=Ae.getPrimaries(Ae.workingColorSpace),Lt=A.colorSpace===ls?null:Ae.getPrimaries(A.colorSpace),zt=A.colorSpace===ls||Wt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const ve=A.isCompressedTexture||A.image[0].isCompressedTexture,At=A.image[0]&&A.image[0].isDataTexture,Bt=[];for(let vt=0;vt<6;vt++)!ve&&!At?Bt[vt]=T(A.image[vt],!0,l.maxCubemapSize):Bt[vt]=At?A.image[vt].image:A.image[vt],Bt[vt]=Oe(A,Bt[vt]);const Kt=Bt[0],jt=c.convert(A.format,A.colorSpace),Pt=c.convert(A.type),te=D(A.internalFormat,jt,Pt,A.colorSpace),re=A.isVideoTexture!==!0,Ge=gt.__version===void 0||dt===!0,X=Et.dataReady;let wt=q(A,Kt);nt(r.TEXTURE_CUBE_MAP,A);let ct;if(ve){re&&Ge&&n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,Kt.width,Kt.height);for(let vt=0;vt<6;vt++){ct=Bt[vt].mipmaps;for(let Ct=0;Ct<ct.length;Ct++){const Nt=ct[Ct];A.format!==Ii?jt!==null?re?X&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Nt.width,Nt.height,jt,Nt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,te,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):re?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Nt.width,Nt.height,jt,Pt,Nt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,te,Nt.width,Nt.height,0,jt,Pt,Nt.data)}}}else{if(ct=A.mipmaps,re&&Ge){ct.length>0&&wt++;const vt=Zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(At){re?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt[vt].width,Bt[vt].height,jt,Pt,Bt[vt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Bt[vt].width,Bt[vt].height,0,jt,Pt,Bt[vt].data);for(let Ct=0;Ct<ct.length;Ct++){const ee=ct[Ct].image[vt].image;re?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,ee.width,ee.height,jt,Pt,ee.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,te,ee.width,ee.height,0,jt,Pt,ee.data)}}else{re?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,jt,Pt,Bt[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,jt,Pt,Bt[vt]);for(let Ct=0;Ct<ct.length;Ct++){const Nt=ct[Ct];re?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,jt,Pt,Nt.image[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,te,jt,Pt,Nt.image[vt])}}}S(A)&&v(r.TEXTURE_CUBE_MAP),gt.__version=Et.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Tt(N,A,at,dt,Et,gt){const Wt=c.convert(at.format,at.colorSpace),Lt=c.convert(at.type),zt=D(at.internalFormat,Wt,Lt,at.colorSpace),ve=a.get(A),At=a.get(at);if(At.__renderTarget=A,!ve.__hasExternalTextures){const Bt=Math.max(1,A.width>>gt),Kt=Math.max(1,A.height>>gt);Et===r.TEXTURE_3D||Et===r.TEXTURE_2D_ARRAY?n.texImage3D(Et,gt,zt,Bt,Kt,A.depth,0,Wt,Lt,null):n.texImage2D(Et,gt,zt,Bt,Kt,0,Wt,Lt,null)}n.bindFramebuffer(r.FRAMEBUFFER,N),_e(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,Et,At.__webglTexture,0,he(A)):(Et===r.TEXTURE_2D||Et>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Et<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,dt,Et,At.__webglTexture,gt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function Mt(N,A,at){if(r.bindRenderbuffer(r.RENDERBUFFER,N),A.depthBuffer){const dt=A.depthTexture,Et=dt&&dt.isDepthTexture?dt.type:null,gt=w(A.stencilBuffer,Et),Wt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=he(A);_e(A)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt,gt,A.width,A.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,gt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,gt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,N)}else{const dt=A.textures;for(let Et=0;Et<dt.length;Et++){const gt=dt[Et],Wt=c.convert(gt.format,gt.colorSpace),Lt=c.convert(gt.type),zt=D(gt.internalFormat,Wt,Lt,gt.colorSpace),ve=he(A);at&&_e(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,zt,A.width,A.height):_e(A)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,zt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,zt,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Vt(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=a.get(A.depthTexture);dt.__renderTarget=A,(!dt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),pt(A.depthTexture,0);const Et=dt.__webglTexture,gt=he(A);if(A.depthTexture.format===kr)_e(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Et,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Et,0);else if(A.depthTexture.format===Zr)_e(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Et,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Et,0);else throw new Error("Unknown depthTexture format")}function Ht(N){const A=a.get(N),at=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const dt=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),dt){const Et=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,dt.removeEventListener("dispose",Et)};dt.addEventListener("dispose",Et),A.__depthDisposeCallback=Et}A.__boundDepthTexture=dt}if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(at)throw new Error("target.depthTexture not supported in Cube render targets");Vt(A.__webglFramebuffer,N)}else if(at){A.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[dt]),A.__webglDepthbuffer[dt]===void 0)A.__webglDepthbuffer[dt]=r.createRenderbuffer(),Mt(A.__webglDepthbuffer[dt],N,!1);else{const Et=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=A.__webglDepthbuffer[dt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Et,r.RENDERBUFFER,gt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Mt(A.__webglDepthbuffer,N,!1);else{const dt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Et=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Et),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,Et)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function ae(N,A,at){const dt=a.get(N);A!==void 0&&Tt(dt.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),at!==void 0&&Ht(N)}function Fe(N){const A=N.texture,at=a.get(N),dt=a.get(A);N.addEventListener("dispose",P);const Et=N.textures,gt=N.isWebGLCubeRenderTarget===!0,Wt=Et.length>1;if(Wt||(dt.__webglTexture===void 0&&(dt.__webglTexture=r.createTexture()),dt.__version=A.version,f.memory.textures++),gt){at.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer[Lt]=[];for(let zt=0;zt<A.mipmaps.length;zt++)at.__webglFramebuffer[Lt][zt]=r.createFramebuffer()}else at.__webglFramebuffer[Lt]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer=[];for(let Lt=0;Lt<A.mipmaps.length;Lt++)at.__webglFramebuffer[Lt]=r.createFramebuffer()}else at.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let Lt=0,zt=Et.length;Lt<zt;Lt++){const ve=a.get(Et[Lt]);ve.__webglTexture===void 0&&(ve.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&_e(N)===!1){at.__webglMultisampledFramebuffer=r.createFramebuffer(),at.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let Lt=0;Lt<Et.length;Lt++){const zt=Et[Lt];at.__webglColorRenderbuffer[Lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,at.__webglColorRenderbuffer[Lt]);const ve=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=D(zt.internalFormat,ve,At,zt.colorSpace,N.isXRRenderTarget===!0),Kt=he(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,Bt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Lt,r.RENDERBUFFER,at.__webglColorRenderbuffer[Lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(at.__webglDepthRenderbuffer=r.createRenderbuffer(),Mt(at.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){n.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),nt(r.TEXTURE_CUBE_MAP,A);for(let Lt=0;Lt<6;Lt++)if(A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Tt(at.__webglFramebuffer[Lt][zt],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,zt);else Tt(at.__webglFramebuffer[Lt],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);S(A)&&v(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Wt){for(let Lt=0,zt=Et.length;Lt<zt;Lt++){const ve=Et[Lt],At=a.get(ve);n.bindTexture(r.TEXTURE_2D,At.__webglTexture),nt(r.TEXTURE_2D,ve),Tt(at.__webglFramebuffer,N,ve,r.COLOR_ATTACHMENT0+Lt,r.TEXTURE_2D,0),S(ve)&&v(r.TEXTURE_2D)}n.unbindTexture()}else{let Lt=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Lt=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Lt,dt.__webglTexture),nt(Lt,A),A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Tt(at.__webglFramebuffer[zt],N,A,r.COLOR_ATTACHMENT0,Lt,zt);else Tt(at.__webglFramebuffer,N,A,r.COLOR_ATTACHMENT0,Lt,0);S(A)&&v(Lt),n.unbindTexture()}N.depthBuffer&&Ht(N)}function de(N){const A=N.textures;for(let at=0,dt=A.length;at<dt;at++){const Et=A[at];if(S(Et)){const gt=U(N),Wt=a.get(Et).__webglTexture;n.bindTexture(gt,Wt),v(gt),n.unbindTexture()}}}const Qe=[],Y=[];function Pn(N){if(N.samples>0){if(_e(N)===!1){const A=N.textures,at=N.width,dt=N.height;let Et=r.COLOR_BUFFER_BIT;const gt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=a.get(N),Lt=A.length>1;if(Lt)for(let zt=0;zt<A.length;zt++)n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let zt=0;zt<A.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Et|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Et|=r.STENCIL_BUFFER_BIT)),Lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const ve=a.get(A[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ve,0)}r.blitFramebuffer(0,0,at,dt,0,0,at,dt,Et,r.NEAREST),p===!0&&(Qe.length=0,Y.length=0,Qe.push(r.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Qe.push(gt),Y.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Y)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Qe))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Lt)for(let zt=0;zt<A.length;zt++){n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const ve=a.get(A[zt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,ve,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&p){const A=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function he(N){return Math.min(l.maxSamples,N.samples)}function _e(N){const A=a.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Qt(N){const A=f.render.frame;g.get(N)!==A&&(g.set(N,A),N.update())}function Oe(N,A){const at=N.colorSpace,dt=N.format,Et=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||at!==Jr&&at!==ls&&(Ae.getTransfer(at)===Ie?(dt!==Ii||Et!==ba)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",at)),A}function Zt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(m.width=N.naturalWidth||N.width,m.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(m.width=N.displayWidth,m.height=N.displayHeight):(m.width=N.width,m.height=N.height),m}this.allocateTextureUnit=st,this.resetTextureUnits=et,this.setTexture2D=pt,this.setTexture2DArray=z,this.setTexture3D=V,this.setTextureCube=k,this.rebindTextures=ae,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=Pn,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=_e}function n2(r,t){function n(a,l=ls){let c;const f=Ae.getTransfer(l);if(a===ba)return r.UNSIGNED_BYTE;if(a===up)return r.UNSIGNED_SHORT_4_4_4_4;if(a===fp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===Yv)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===Wv)return r.BYTE;if(a===jv)return r.SHORT;if(a===ol)return r.UNSIGNED_SHORT;if(a===cp)return r.INT;if(a===Xs)return r.UNSIGNED_INT;if(a===Sa)return r.FLOAT;if(a===Qr)return r.HALF_FLOAT;if(a===Zv)return r.ALPHA;if(a===Kv)return r.RGB;if(a===Ii)return r.RGBA;if(a===Qv)return r.LUMINANCE;if(a===Jv)return r.LUMINANCE_ALPHA;if(a===kr)return r.DEPTH_COMPONENT;if(a===Zr)return r.DEPTH_STENCIL;if(a===$v)return r.RED;if(a===hp)return r.RED_INTEGER;if(a===tx)return r.RG;if(a===dp)return r.RG_INTEGER;if(a===pp)return r.RGBA_INTEGER;if(a===Qc||a===Jc||a===$c||a===tu)if(f===Ie)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===Qc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===Jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===$c)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===tu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===Qc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===Jc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===$c)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===tu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Ud||a===Ld||a===Nd||a===Od)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Ud)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Ld)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Nd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Od)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Pd||a===zd||a===Bd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Pd||a===zd)return f===Ie?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Bd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Id||a===Fd||a===Gd||a===Hd||a===Vd||a===kd||a===Xd||a===qd||a===Wd||a===jd||a===Yd||a===Zd||a===Kd||a===Qd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Id)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Fd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Gd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Hd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Vd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===kd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Xd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===qd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Wd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===jd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Yd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Zd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Kd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Qd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===eu||a===Jd||a===$d)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===eu)return f===Ie?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Jd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===$d)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===ex||a===tp||a===ep||a===np)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===eu)return c.COMPRESSED_RED_RGTC1_EXT;if(a===tp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===ep)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===np)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Yr?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}class i2 extends Ai{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class cs extends qn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const a2={type:"move"};class cd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let l=null,c=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(m&&t.hand){f=!0;for(const T of t.hand.values()){const S=n.getJointPose(T,a),v=this._getHandJoint(m,T);S!==null&&(v.matrix.fromArray(S.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=S.radius),v.visible=S!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],x=g.position.distanceTo(_.position),M=.02,E=.005;m.inputState.pinching&&x>M+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&x<=M-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(l=n.getPose(t.targetRaySpace,a),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(a2)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new cs;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const s2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,r2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class o2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,a){if(this.texture===null){const l=new ni,c=t.properties.get(l);c.__webglTexture=n.texture,(n.depthNear!=a.depthNear||n.depthFar!=a.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Gi({vertexShader:s2,fragmentShader:r2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ln(new hu(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class l2 extends $r{constructor(t,n){super();const a=this;let l=null,c=1,f=null,h="local-floor",p=1,m=null,g=null,_=null,x=null,M=null,E=null;const T=new o2,S=n.getContextAttributes();let v=null,U=null;const D=[],w=[],q=new Ce;let I=null;const P=new Ai;P.viewport=new cn;const G=new Ai;G.viewport=new cn;const L=[P,G],R=new i2;let F=null,et=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ut=D[K];return ut===void 0&&(ut=new cd,D[K]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(K){let ut=D[K];return ut===void 0&&(ut=new cd,D[K]=ut),ut.getGripSpace()},this.getHand=function(K){let ut=D[K];return ut===void 0&&(ut=new cd,D[K]=ut),ut.getHandSpace()};function st(K){const ut=w.indexOf(K.inputSource);if(ut===-1)return;const Tt=D[ut];Tt!==void 0&&(Tt.update(K.inputSource,K.frame,m||f),Tt.dispatchEvent({type:K.type,data:K.inputSource}))}function ht(){l.removeEventListener("select",st),l.removeEventListener("selectstart",st),l.removeEventListener("selectend",st),l.removeEventListener("squeeze",st),l.removeEventListener("squeezestart",st),l.removeEventListener("squeezeend",st),l.removeEventListener("end",ht),l.removeEventListener("inputsourceschange",pt);for(let K=0;K<D.length;K++){const ut=w[K];ut!==null&&(w[K]=null,D[K].disconnect(ut))}F=null,et=null,T.reset(),t.setRenderTarget(v),M=null,x=null,_=null,l=null,U=null,yt.stop(),a.isPresenting=!1,t.setPixelRatio(I),t.setSize(q.width,q.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){c=K,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){h=K,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(K){m=K},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(v=t.getRenderTarget(),l.addEventListener("select",st),l.addEventListener("selectstart",st),l.addEventListener("selectend",st),l.addEventListener("squeeze",st),l.addEventListener("squeezestart",st),l.addEventListener("squeezeend",st),l.addEventListener("end",ht),l.addEventListener("inputsourceschange",pt),S.xrCompatible!==!0&&await n.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(q),l.renderState.layers===void 0){const ut={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,ut),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),U=new hs(M.framebufferWidth,M.framebufferHeight,{format:Ii,type:ba,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let ut=null,Tt=null,Mt=null;S.depth&&(Mt=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ut=S.stencil?Zr:kr,Tt=S.stencil?Yr:Xs);const Vt={colorFormat:n.RGBA8,depthFormat:Mt,scaleFactor:c};_=new XRWebGLBinding(l,n),x=_.createProjectionLayer(Vt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),U=new hs(x.textureWidth,x.textureHeight,{format:Ii,type:ba,depthTexture:new gx(x.textureWidth,x.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(h),yt.setContext(l),yt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function pt(K){for(let ut=0;ut<K.removed.length;ut++){const Tt=K.removed[ut],Mt=w.indexOf(Tt);Mt>=0&&(w[Mt]=null,D[Mt].disconnect(Tt))}for(let ut=0;ut<K.added.length;ut++){const Tt=K.added[ut];let Mt=w.indexOf(Tt);if(Mt===-1){for(let Ht=0;Ht<D.length;Ht++)if(Ht>=w.length){w.push(Tt),Mt=Ht;break}else if(w[Ht]===null){w[Ht]=Tt,Mt=Ht;break}if(Mt===-1)break}const Vt=D[Mt];Vt&&Vt.connect(Tt)}}const z=new J,V=new J;function k(K,ut,Tt){z.setFromMatrixPosition(ut.matrixWorld),V.setFromMatrixPosition(Tt.matrixWorld);const Mt=z.distanceTo(V),Vt=ut.projectionMatrix.elements,Ht=Tt.projectionMatrix.elements,ae=Vt[14]/(Vt[10]-1),Fe=Vt[14]/(Vt[10]+1),de=(Vt[9]+1)/Vt[5],Qe=(Vt[9]-1)/Vt[5],Y=(Vt[8]-1)/Vt[0],Pn=(Ht[8]+1)/Ht[0],he=ae*Y,_e=ae*Pn,Qt=Mt/(-Y+Pn),Oe=Qt*-Y;if(ut.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Oe),K.translateZ(Qt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Vt[10]===-1)K.projectionMatrix.copy(ut.projectionMatrix),K.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const Zt=ae+Qt,N=Fe+Qt,A=he-Oe,at=_e+(Mt-Oe),dt=de*Fe/N*Zt,Et=Qe*Fe/N*Zt;K.projectionMatrix.makePerspective(A,at,dt,Et,Zt,N),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function xt(K,ut){ut===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ut.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let ut=K.near,Tt=K.far;T.texture!==null&&(T.depthNear>0&&(ut=T.depthNear),T.depthFar>0&&(Tt=T.depthFar)),R.near=G.near=P.near=ut,R.far=G.far=P.far=Tt,(F!==R.near||et!==R.far)&&(l.updateRenderState({depthNear:R.near,depthFar:R.far}),F=R.near,et=R.far),P.layers.mask=K.layers.mask|2,G.layers.mask=K.layers.mask|4,R.layers.mask=P.layers.mask|G.layers.mask;const Mt=K.parent,Vt=R.cameras;xt(R,Mt);for(let Ht=0;Ht<Vt.length;Ht++)xt(Vt[Ht],Mt);Vt.length===2?k(R,P,G):R.projectionMatrix.copy(P.projectionMatrix),St(K,R,Mt)};function St(K,ut,Tt){Tt===null?K.matrix.copy(ut.matrixWorld):(K.matrix.copy(Tt.matrixWorld),K.matrix.invert(),K.matrix.multiply(ut.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ut.projectionMatrix),K.projectionMatrixInverse.copy(ut.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ip*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&M===null))return p},this.setFoveation=function(K){p=K,x!==null&&(x.fixedFoveation=K),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=K)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(R)};let O=null;function nt(K,ut){if(g=ut.getViewerPose(m||f),E=ut,g!==null){const Tt=g.views;M!==null&&(t.setRenderTargetFramebuffer(U,M.framebuffer),t.setRenderTarget(U));let Mt=!1;Tt.length!==R.cameras.length&&(R.cameras.length=0,Mt=!0);for(let Ht=0;Ht<Tt.length;Ht++){const ae=Tt[Ht];let Fe=null;if(M!==null)Fe=M.getViewport(ae);else{const Qe=_.getViewSubImage(x,ae);Fe=Qe.viewport,Ht===0&&(t.setRenderTargetTextures(U,Qe.colorTexture,x.ignoreDepthValues?void 0:Qe.depthStencilTexture),t.setRenderTarget(U))}let de=L[Ht];de===void 0&&(de=new Ai,de.layers.enable(Ht),de.viewport=new cn,L[Ht]=de),de.matrix.fromArray(ae.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(ae.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Ht===0&&(R.matrix.copy(de.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Mt===!0&&R.cameras.push(de)}const Vt=l.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const Ht=_.getDepthInformation(Tt[0]);Ht&&Ht.isValid&&Ht.texture&&T.init(t,Ht,l.renderState)}}for(let Tt=0;Tt<D.length;Tt++){const Mt=w[Tt],Vt=D[Tt];Mt!==null&&Vt!==void 0&&Vt.update(Mt,ut,m||f)}O&&O(K,ut),ut.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:ut}),E=null}const yt=new px;yt.setAnimationLoop(nt),this.setAnimationLoop=function(K){O=K},this.dispose=function(){}}}const zs=new Aa,c2=new sn;function u2(r,t){function n(S,v){S.matrixAutoUpdate===!0&&S.updateMatrix(),v.value.copy(S.matrix)}function a(S,v){v.color.getRGB(S.fogColor.value,ux(r)),v.isFog?(S.fogNear.value=v.near,S.fogFar.value=v.far):v.isFogExp2&&(S.fogDensity.value=v.density)}function l(S,v,U,D,w){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(S,v):v.isMeshToonMaterial?(c(S,v),_(S,v)):v.isMeshPhongMaterial?(c(S,v),g(S,v)):v.isMeshStandardMaterial?(c(S,v),x(S,v),v.isMeshPhysicalMaterial&&M(S,v,w)):v.isMeshMatcapMaterial?(c(S,v),E(S,v)):v.isMeshDepthMaterial?c(S,v):v.isMeshDistanceMaterial?(c(S,v),T(S,v)):v.isMeshNormalMaterial?c(S,v):v.isLineBasicMaterial?(f(S,v),v.isLineDashedMaterial&&h(S,v)):v.isPointsMaterial?p(S,v,U,D):v.isSpriteMaterial?m(S,v):v.isShadowMaterial?(S.color.value.copy(v.color),S.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(S,v){S.opacity.value=v.opacity,v.color&&S.diffuse.value.copy(v.color),v.emissive&&S.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.bumpMap&&(S.bumpMap.value=v.bumpMap,n(v.bumpMap,S.bumpMapTransform),S.bumpScale.value=v.bumpScale,v.side===Xn&&(S.bumpScale.value*=-1)),v.normalMap&&(S.normalMap.value=v.normalMap,n(v.normalMap,S.normalMapTransform),S.normalScale.value.copy(v.normalScale),v.side===Xn&&S.normalScale.value.negate()),v.displacementMap&&(S.displacementMap.value=v.displacementMap,n(v.displacementMap,S.displacementMapTransform),S.displacementScale.value=v.displacementScale,S.displacementBias.value=v.displacementBias),v.emissiveMap&&(S.emissiveMap.value=v.emissiveMap,n(v.emissiveMap,S.emissiveMapTransform)),v.specularMap&&(S.specularMap.value=v.specularMap,n(v.specularMap,S.specularMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest);const U=t.get(v),D=U.envMap,w=U.envMapRotation;D&&(S.envMap.value=D,zs.copy(w),zs.x*=-1,zs.y*=-1,zs.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(zs.y*=-1,zs.z*=-1),S.envMapRotation.value.setFromMatrix4(c2.makeRotationFromEuler(zs)),S.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=v.reflectivity,S.ior.value=v.ior,S.refractionRatio.value=v.refractionRatio),v.lightMap&&(S.lightMap.value=v.lightMap,S.lightMapIntensity.value=v.lightMapIntensity,n(v.lightMap,S.lightMapTransform)),v.aoMap&&(S.aoMap.value=v.aoMap,S.aoMapIntensity.value=v.aoMapIntensity,n(v.aoMap,S.aoMapTransform))}function f(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform))}function h(S,v){S.dashSize.value=v.dashSize,S.totalSize.value=v.dashSize+v.gapSize,S.scale.value=v.scale}function p(S,v,U,D){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.size.value=v.size*U,S.scale.value=D*.5,v.map&&(S.map.value=v.map,n(v.map,S.uvTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function m(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.rotation.value=v.rotation,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function g(S,v){S.specular.value.copy(v.specular),S.shininess.value=Math.max(v.shininess,1e-4)}function _(S,v){v.gradientMap&&(S.gradientMap.value=v.gradientMap)}function x(S,v){S.metalness.value=v.metalness,v.metalnessMap&&(S.metalnessMap.value=v.metalnessMap,n(v.metalnessMap,S.metalnessMapTransform)),S.roughness.value=v.roughness,v.roughnessMap&&(S.roughnessMap.value=v.roughnessMap,n(v.roughnessMap,S.roughnessMapTransform)),v.envMap&&(S.envMapIntensity.value=v.envMapIntensity)}function M(S,v,U){S.ior.value=v.ior,v.sheen>0&&(S.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),S.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(S.sheenColorMap.value=v.sheenColorMap,n(v.sheenColorMap,S.sheenColorMapTransform)),v.sheenRoughnessMap&&(S.sheenRoughnessMap.value=v.sheenRoughnessMap,n(v.sheenRoughnessMap,S.sheenRoughnessMapTransform))),v.clearcoat>0&&(S.clearcoat.value=v.clearcoat,S.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(S.clearcoatMap.value=v.clearcoatMap,n(v.clearcoatMap,S.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,n(v.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(S.clearcoatNormalMap.value=v.clearcoatNormalMap,n(v.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Xn&&S.clearcoatNormalScale.value.negate())),v.dispersion>0&&(S.dispersion.value=v.dispersion),v.iridescence>0&&(S.iridescence.value=v.iridescence,S.iridescenceIOR.value=v.iridescenceIOR,S.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(S.iridescenceMap.value=v.iridescenceMap,n(v.iridescenceMap,S.iridescenceMapTransform)),v.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=v.iridescenceThicknessMap,n(v.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),v.transmission>0&&(S.transmission.value=v.transmission,S.transmissionSamplerMap.value=U.texture,S.transmissionSamplerSize.value.set(U.width,U.height),v.transmissionMap&&(S.transmissionMap.value=v.transmissionMap,n(v.transmissionMap,S.transmissionMapTransform)),S.thickness.value=v.thickness,v.thicknessMap&&(S.thicknessMap.value=v.thicknessMap,n(v.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=v.attenuationDistance,S.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(S.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(S.anisotropyMap.value=v.anisotropyMap,n(v.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=v.specularIntensity,S.specularColor.value.copy(v.specularColor),v.specularColorMap&&(S.specularColorMap.value=v.specularColorMap,n(v.specularColorMap,S.specularColorMapTransform)),v.specularIntensityMap&&(S.specularIntensityMap.value=v.specularIntensityMap,n(v.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,v){v.matcap&&(S.matcap.value=v.matcap)}function T(S,v){const U=t.get(v).light;S.referencePosition.value.setFromMatrixPosition(U.matrixWorld),S.nearDistance.value=U.shadow.camera.near,S.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:l}}function f2(r,t,n,a){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(U,D){const w=D.program;a.uniformBlockBinding(U,w)}function m(U,D){let w=l[U.id];w===void 0&&(E(U),w=g(U),l[U.id]=w,U.addEventListener("dispose",S));const q=D.program;a.updateUBOMapping(U,q);const I=t.render.frame;c[U.id]!==I&&(x(U),c[U.id]=I)}function g(U){const D=_();U.__bindingPointIndex=D;const w=r.createBuffer(),q=U.__size,I=U.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,q,I),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,D,w),w}function _(){for(let U=0;U<h;U++)if(f.indexOf(U)===-1)return f.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(U){const D=l[U.id],w=U.uniforms,q=U.__cache;r.bindBuffer(r.UNIFORM_BUFFER,D);for(let I=0,P=w.length;I<P;I++){const G=Array.isArray(w[I])?w[I]:[w[I]];for(let L=0,R=G.length;L<R;L++){const F=G[L];if(M(F,I,L,q)===!0){const et=F.__offset,st=Array.isArray(F.value)?F.value:[F.value];let ht=0;for(let pt=0;pt<st.length;pt++){const z=st[pt],V=T(z);typeof z=="number"||typeof z=="boolean"?(F.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,et+ht,F.__data)):z.isMatrix3?(F.__data[0]=z.elements[0],F.__data[1]=z.elements[1],F.__data[2]=z.elements[2],F.__data[3]=0,F.__data[4]=z.elements[3],F.__data[5]=z.elements[4],F.__data[6]=z.elements[5],F.__data[7]=0,F.__data[8]=z.elements[6],F.__data[9]=z.elements[7],F.__data[10]=z.elements[8],F.__data[11]=0):(z.toArray(F.__data,ht),ht+=V.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,et,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(U,D,w,q){const I=U.value,P=D+"_"+w;if(q[P]===void 0)return typeof I=="number"||typeof I=="boolean"?q[P]=I:q[P]=I.clone(),!0;{const G=q[P];if(typeof I=="number"||typeof I=="boolean"){if(G!==I)return q[P]=I,!0}else if(G.equals(I)===!1)return G.copy(I),!0}return!1}function E(U){const D=U.uniforms;let w=0;const q=16;for(let P=0,G=D.length;P<G;P++){const L=Array.isArray(D[P])?D[P]:[D[P]];for(let R=0,F=L.length;R<F;R++){const et=L[R],st=Array.isArray(et.value)?et.value:[et.value];for(let ht=0,pt=st.length;ht<pt;ht++){const z=st[ht],V=T(z),k=w%q,xt=k%V.boundary,St=k+xt;w+=xt,St!==0&&q-St<V.storage&&(w+=q-St),et.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),et.__offset=w,w+=V.storage}}}const I=w%q;return I>0&&(w+=q-I),U.__size=w,U.__cache={},this}function T(U){const D={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(D.boundary=4,D.storage=4):U.isVector2?(D.boundary=8,D.storage=8):U.isVector3||U.isColor?(D.boundary=16,D.storage=12):U.isVector4?(D.boundary=16,D.storage=16):U.isMatrix3?(D.boundary=48,D.storage=48):U.isMatrix4?(D.boundary=64,D.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),D}function S(U){const D=U.target;D.removeEventListener("dispose",S);const w=f.indexOf(D.__bindingPointIndex);f.splice(w,1),r.deleteBuffer(l[D.id]),delete l[D.id],delete c[D.id]}function v(){for(const U in l)r.deleteBuffer(l[U]);f=[],l={},c={}}return{bind:p,update:m,dispose:v}}class h2{constructor(t={}){const{canvas:n=eE(),context:a=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=a.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),T=new Int32Array(4);let S=null,v=null;const U=[],D=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bi,this.toneMapping=us,this.toneMappingExposure=1;const w=this;let q=!1,I=0,P=0,G=null,L=-1,R=null;const F=new cn,et=new cn;let st=null;const ht=new ue(0);let pt=0,z=n.width,V=n.height,k=1,xt=null,St=null;const O=new cn(0,0,z,V),nt=new cn(0,0,z,V);let yt=!1;const K=new dx;let ut=!1,Tt=!1;const Mt=new sn,Vt=new sn,Ht=new J,ae=new cn,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Qe(){return G===null?k:1}let Y=a;function Pn(C,W){return n.getContext(C,W)}try{const C={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${lp}`),n.addEventListener("webglcontextlost",vt,!1),n.addEventListener("webglcontextrestored",Ct,!1),n.addEventListener("webglcontextcreationerror",Nt,!1),Y===null){const W="webgl2";if(Y=Pn(W,C),Y===null)throw Pn(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let he,_e,Qt,Oe,Zt,N,A,at,dt,Et,gt,Wt,Lt,zt,ve,At,Bt,Kt,jt,Pt,te,re,Ge,X;function wt(){he=new _b(Y),he.init(),re=new n2(Y,he),_e=new fb(Y,he,t,re),Qt=new $A(Y,he),_e.reverseDepthBuffer&&x&&Qt.buffers.depth.setReversed(!0),Oe=new yb(Y),Zt=new IA,N=new e2(Y,he,Qt,Zt,_e,re,Oe),A=new db(w),at=new gb(w),dt=new RE(Y),Ge=new cb(Y,dt),Et=new vb(Y,dt,Oe,Ge),gt=new Mb(Y,Et,dt,Oe),jt=new Sb(Y,_e,N),At=new hb(Zt),Wt=new BA(w,A,at,he,_e,Ge,At),Lt=new u2(w,Zt),zt=new GA,ve=new WA(he),Kt=new lb(w,A,at,Qt,gt,M,p),Bt=new QA(w,gt,_e),X=new f2(Y,Oe,_e,Qt),Pt=new ub(Y,he,Oe),te=new xb(Y,he,Oe),Oe.programs=Wt.programs,w.capabilities=_e,w.extensions=he,w.properties=Zt,w.renderLists=zt,w.shadowMap=Bt,w.state=Qt,w.info=Oe}wt();const ct=new l2(w,Y);this.xr=ct,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const C=he.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=he.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(C){C!==void 0&&(k=C,this.setSize(z,V,!1))},this.getSize=function(C){return C.set(z,V)},this.setSize=function(C,W,ot=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=C,V=W,n.width=Math.floor(C*k),n.height=Math.floor(W*k),ot===!0&&(n.style.width=C+"px",n.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(z*k,V*k).floor()},this.setDrawingBufferSize=function(C,W,ot){z=C,V=W,k=ot,n.width=Math.floor(C*ot),n.height=Math.floor(W*ot),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(F)},this.getViewport=function(C){return C.copy(O)},this.setViewport=function(C,W,ot,rt){C.isVector4?O.set(C.x,C.y,C.z,C.w):O.set(C,W,ot,rt),Qt.viewport(F.copy(O).multiplyScalar(k).round())},this.getScissor=function(C){return C.copy(nt)},this.setScissor=function(C,W,ot,rt){C.isVector4?nt.set(C.x,C.y,C.z,C.w):nt.set(C,W,ot,rt),Qt.scissor(et.copy(nt).multiplyScalar(k).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(C){Qt.setScissorTest(yt=C)},this.setOpaqueSort=function(C){xt=C},this.setTransparentSort=function(C){St=C},this.getClearColor=function(C){return C.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(C=!0,W=!0,ot=!0){let rt=0;if(C){let j=!1;if(G!==null){const bt=G.texture.format;j=bt===pp||bt===dp||bt===hp}if(j){const bt=G.texture.type,Dt=bt===ba||bt===Xs||bt===ol||bt===Yr||bt===up||bt===fp,Ut=Kt.getClearColor(),kt=Kt.getClearAlpha(),ne=Ut.r,$t=Ut.g,It=Ut.b;Dt?(E[0]=ne,E[1]=$t,E[2]=It,E[3]=kt,Y.clearBufferuiv(Y.COLOR,0,E)):(T[0]=ne,T[1]=$t,T[2]=It,T[3]=kt,Y.clearBufferiv(Y.COLOR,0,T))}else rt|=Y.COLOR_BUFFER_BIT}W&&(rt|=Y.DEPTH_BUFFER_BIT),ot&&(rt|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",vt,!1),n.removeEventListener("webglcontextrestored",Ct,!1),n.removeEventListener("webglcontextcreationerror",Nt,!1),zt.dispose(),ve.dispose(),Zt.dispose(),A.dispose(),at.dispose(),gt.dispose(),Ge.dispose(),X.dispose(),Wt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",no),ct.removeEventListener("sessionend",io),Hi.stop()};function vt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),q=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),q=!1;const C=Oe.autoReset,W=Bt.enabled,ot=Bt.autoUpdate,rt=Bt.needsUpdate,j=Bt.type;wt(),Oe.autoReset=C,Bt.enabled=W,Bt.autoUpdate=ot,Bt.needsUpdate=rt,Bt.type=j}function Nt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ee(C){const W=C.target;W.removeEventListener("dispose",ee),Je(W)}function Je(C){_n(C),Zt.remove(C)}function _n(C){const W=Zt.get(C).programs;W!==void 0&&(W.forEach(function(ot){Wt.releaseProgram(ot)}),C.isShaderMaterial&&Wt.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,ot,rt,j,bt){W===null&&(W=Fe);const Dt=j.isMesh&&j.matrixWorld.determinant()<0,Ut=so(C,W,ot,rt,j);Qt.setMaterial(rt,Dt);let kt=ot.index,ne=1;if(rt.wireframe===!0){if(kt=Et.getWireframeAttribute(ot),kt===void 0)return;ne=2}const $t=ot.drawRange,It=ot.attributes.position;let be=$t.start*ne,Pe=($t.start+$t.count)*ne;bt!==null&&(be=Math.max(be,bt.start*ne),Pe=Math.min(Pe,(bt.start+bt.count)*ne)),kt!==null?(be=Math.max(be,0),Pe=Math.min(Pe,kt.count)):It!=null&&(be=Math.max(be,0),Pe=Math.min(Pe,It.count));const He=Pe-be;if(He<0||He===1/0)return;Ge.setup(j,rt,Ut,ot,kt);let zn,Me=Pt;if(kt!==null&&(zn=dt.get(kt),Me=te,Me.setIndex(zn)),j.isMesh)rt.wireframe===!0?(Qt.setLineWidth(rt.wireframeLinewidth*Qe()),Me.setMode(Y.LINES)):Me.setMode(Y.TRIANGLES);else if(j.isLine){let Xt=rt.linewidth;Xt===void 0&&(Xt=1),Qt.setLineWidth(Xt*Qe()),j.isLineSegments?Me.setMode(Y.LINES):j.isLineLoop?Me.setMode(Y.LINE_LOOP):Me.setMode(Y.LINE_STRIP)}else j.isPoints?Me.setMode(Y.POINTS):j.isSprite&&Me.setMode(Y.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)Me.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))Me.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Xt=j._multiDrawStarts,vn=j._multiDrawCounts,se=j._multiDrawCount,Wn=kt?dt.get(kt).bytesPerElement:1,Ra=Zt.get(rt).currentProgram.getUniforms();for(let Cn=0;Cn<se;Cn++)Ra.setValue(Y,"_gl_DrawID",Cn),Me.render(Xt[Cn]/Wn,vn[Cn])}else if(j.isInstancedMesh)Me.renderInstances(be,He,j.count);else if(ot.isInstancedBufferGeometry){const Xt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,vn=Math.min(ot.instanceCount,Xt);Me.renderInstances(be,He,vn)}else Me.render(be,He)};function Re(C,W,ot){C.transparent===!0&&C.side===ya&&C.forceSinglePass===!1?(C.side=Xn,C.needsUpdate=!0,en(C,W,ot),C.side=fs,C.needsUpdate=!0,en(C,W,ot),C.side=ya):en(C,W,ot)}this.compile=function(C,W,ot=null){ot===null&&(ot=C),v=ve.get(ot),v.init(W),D.push(v),ot.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(v.pushLight(j),j.castShadow&&v.pushShadow(j))}),C!==ot&&C.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(v.pushLight(j),j.castShadow&&v.pushShadow(j))}),v.setupLights();const rt=new Set;return C.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const bt=j.material;if(bt)if(Array.isArray(bt))for(let Dt=0;Dt<bt.length;Dt++){const Ut=bt[Dt];Re(Ut,ot,j),rt.add(Ut)}else Re(bt,ot,j),rt.add(bt)}),D.pop(),v=null,rt},this.compileAsync=function(C,W,ot=null){const rt=this.compile(C,W,ot);return new Promise(j=>{function bt(){if(rt.forEach(function(Dt){Zt.get(Dt).currentProgram.isReady()&&rt.delete(Dt)}),rt.size===0){j(C);return}setTimeout(bt,10)}he.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let Rn=null;function wi(C){Rn&&Rn(C)}function no(){Hi.stop()}function io(){Hi.start()}const Hi=new px;Hi.setAnimationLoop(wi),typeof self<"u"&&Hi.setContext(self),this.setAnimationLoop=function(C){Rn=C,ct.setAnimationLoop(C),C===null?Hi.stop():Hi.start()},ct.addEventListener("sessionstart",no),ct.addEventListener("sessionend",io),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(W),W=ct.getCamera()),C.isScene===!0&&C.onBeforeRender(w,C,W,G),v=ve.get(C,D.length),v.init(W),D.push(v),Vt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),K.setFromProjectionMatrix(Vt),Tt=this.localClippingEnabled,ut=At.init(this.clippingPlanes,Tt),S=zt.get(C,U.length),S.init(),U.push(S),ct.enabled===!0&&ct.isPresenting===!0){const bt=w.xr.getDepthSensingMesh();bt!==null&&ds(bt,W,-1/0,w.sortObjects)}ds(C,W,0,w.sortObjects),S.finish(),w.sortObjects===!0&&S.sort(xt,St),de=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,de&&Kt.addToRenderList(S,C),this.info.render.frame++,ut===!0&&At.beginShadows();const ot=v.state.shadowsArray;Bt.render(ot,C,W),ut===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,j=S.transmissive;if(v.setupLights(),W.isArrayCamera){const bt=W.cameras;if(j.length>0)for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++){const kt=bt[Dt];ao(rt,j,C,kt)}de&&Kt.render(C);for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++){const kt=bt[Dt];qs(S,C,kt,kt.viewport)}}else j.length>0&&ao(rt,j,C,W),de&&Kt.render(C),qs(S,C,W);G!==null&&(N.updateMultisampleRenderTarget(G),N.updateRenderTargetMipmap(G)),C.isScene===!0&&C.onAfterRender(w,C,W),Ge.resetDefaultState(),L=-1,R=null,D.pop(),D.length>0?(v=D[D.length-1],ut===!0&&At.setGlobalState(w.clippingPlanes,v.state.camera)):v=null,U.pop(),U.length>0?S=U[U.length-1]:S=null};function ds(C,W,ot,rt){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)ot=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||K.intersectsSprite(C)){rt&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Vt);const Dt=gt.update(C),Ut=C.material;Ut.visible&&S.push(C,Dt,Ut,ot,ae.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||K.intersectsObject(C))){const Dt=gt.update(C),Ut=C.material;if(rt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),ae.copy(Dt.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(Vt)),Array.isArray(Ut)){const kt=Dt.groups;for(let ne=0,$t=kt.length;ne<$t;ne++){const It=kt[ne],be=Ut[It.materialIndex];be&&be.visible&&S.push(C,Dt,be,ot,ae.z,It)}}else Ut.visible&&S.push(C,Dt,Ut,ot,ae.z,null)}}const bt=C.children;for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++)ds(bt[Dt],W,ot,rt)}function qs(C,W,ot,rt){const j=C.opaque,bt=C.transmissive,Dt=C.transparent;v.setupLightsView(ot),ut===!0&&At.setGlobalState(w.clippingPlanes,ot),rt&&Qt.viewport(F.copy(rt)),j.length>0&&ps(j,W,ot),bt.length>0&&ps(bt,W,ot),Dt.length>0&&ps(Dt,W,ot),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function ao(C,W,ot,rt){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[rt.id]===void 0&&(v.state.transmissionRenderTarget[rt.id]=new hs(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Qr:ba,minFilter:ks,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ae.workingColorSpace}));const bt=v.state.transmissionRenderTarget[rt.id],Dt=rt.viewport||F;bt.setSize(Dt.z,Dt.w);const Ut=w.getRenderTarget();w.setRenderTarget(bt),w.getClearColor(ht),pt=w.getClearAlpha(),pt<1&&w.setClearColor(16777215,.5),w.clear(),de&&Kt.render(ot);const kt=w.toneMapping;w.toneMapping=us;const ne=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),v.setupLightsView(rt),ut===!0&&At.setGlobalState(w.clippingPlanes,rt),ps(C,ot,rt),N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt),he.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let It=0,be=W.length;It<be;It++){const Pe=W[It],He=Pe.object,zn=Pe.geometry,Me=Pe.material,Xt=Pe.group;if(Me.side===ya&&He.layers.test(rt.layers)){const vn=Me.side;Me.side=Xn,Me.needsUpdate=!0,Ci(He,ot,rt,zn,Me,Xt),Me.side=vn,Me.needsUpdate=!0,$t=!0}}$t===!0&&(N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt))}w.setRenderTarget(Ut),w.setClearColor(ht,pt),ne!==void 0&&(rt.viewport=ne),w.toneMapping=kt}function ps(C,W,ot){const rt=W.isScene===!0?W.overrideMaterial:null;for(let j=0,bt=C.length;j<bt;j++){const Dt=C[j],Ut=Dt.object,kt=Dt.geometry,ne=rt===null?Dt.material:rt,$t=Dt.group;Ut.layers.test(ot.layers)&&Ci(Ut,W,ot,kt,ne,$t)}}function Ci(C,W,ot,rt,j,bt){C.onBeforeRender(w,W,ot,rt,j,bt),C.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),j.onBeforeRender(w,W,ot,rt,C,bt),j.transparent===!0&&j.side===ya&&j.forceSinglePass===!1?(j.side=Xn,j.needsUpdate=!0,w.renderBufferDirect(ot,W,rt,j,C,bt),j.side=fs,j.needsUpdate=!0,w.renderBufferDirect(ot,W,rt,j,C,bt),j.side=ya):w.renderBufferDirect(ot,W,rt,j,C,bt),C.onAfterRender(w,W,ot,rt,j,bt)}function en(C,W,ot){W.isScene!==!0&&(W=Fe);const rt=Zt.get(C),j=v.state.lights,bt=v.state.shadowsArray,Dt=j.state.version,Ut=Wt.getParameters(C,j.state,bt,W,ot),kt=Wt.getProgramCacheKey(Ut);let ne=rt.programs;rt.environment=C.isMeshStandardMaterial?W.environment:null,rt.fog=W.fog,rt.envMap=(C.isMeshStandardMaterial?at:A).get(C.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&C.envMap===null?W.environmentRotation:C.envMapRotation,ne===void 0&&(C.addEventListener("dispose",ee),ne=new Map,rt.programs=ne);let $t=ne.get(kt);if($t!==void 0){if(rt.currentProgram===$t&&rt.lightsStateVersion===Dt)return Zi(C,Ut),$t}else Ut.uniforms=Wt.getUniforms(C),C.onBeforeCompile(Ut,w),$t=Wt.acquireProgram(Ut,kt),ne.set(kt,$t),rt.uniforms=Ut.uniforms;const It=rt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(It.clippingPlanes=At.uniform),Zi(C,Ut),rt.needsLights=mu(C),rt.lightsStateVersion=Dt,rt.needsLights&&(It.ambientLightColor.value=j.state.ambient,It.lightProbe.value=j.state.probe,It.directionalLights.value=j.state.directional,It.directionalLightShadows.value=j.state.directionalShadow,It.spotLights.value=j.state.spot,It.spotLightShadows.value=j.state.spotShadow,It.rectAreaLights.value=j.state.rectArea,It.ltc_1.value=j.state.rectAreaLTC1,It.ltc_2.value=j.state.rectAreaLTC2,It.pointLights.value=j.state.point,It.pointLightShadows.value=j.state.pointShadow,It.hemisphereLights.value=j.state.hemi,It.directionalShadowMap.value=j.state.directionalShadowMap,It.directionalShadowMatrix.value=j.state.directionalShadowMatrix,It.spotShadowMap.value=j.state.spotShadowMap,It.spotLightMatrix.value=j.state.spotLightMatrix,It.spotLightMap.value=j.state.spotLightMap,It.pointShadowMap.value=j.state.pointShadowMap,It.pointShadowMatrix.value=j.state.pointShadowMatrix),rt.currentProgram=$t,rt.uniformsList=null,$t}function wn(C){if(C.uniformsList===null){const W=C.currentProgram.getUniforms();C.uniformsList=nu.seqWithValue(W.seq,C.uniforms)}return C.uniformsList}function Zi(C,W){const ot=Zt.get(C);ot.outputColorSpace=W.outputColorSpace,ot.batching=W.batching,ot.batchingColor=W.batchingColor,ot.instancing=W.instancing,ot.instancingColor=W.instancingColor,ot.instancingMorph=W.instancingMorph,ot.skinning=W.skinning,ot.morphTargets=W.morphTargets,ot.morphNormals=W.morphNormals,ot.morphColors=W.morphColors,ot.morphTargetsCount=W.morphTargetsCount,ot.numClippingPlanes=W.numClippingPlanes,ot.numIntersection=W.numClipIntersection,ot.vertexAlphas=W.vertexAlphas,ot.vertexTangents=W.vertexTangents,ot.toneMapping=W.toneMapping}function so(C,W,ot,rt,j){W.isScene!==!0&&(W=Fe),N.resetTextureUnits();const bt=W.fog,Dt=rt.isMeshStandardMaterial?W.environment:null,Ut=G===null?w.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Jr,kt=(rt.isMeshStandardMaterial?at:A).get(rt.envMap||Dt),ne=rt.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,$t=!!ot.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),It=!!ot.morphAttributes.position,be=!!ot.morphAttributes.normal,Pe=!!ot.morphAttributes.color;let He=us;rt.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(He=w.toneMapping);const zn=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Me=zn!==void 0?zn.length:0,Xt=Zt.get(rt),vn=v.state.lights;if(ut===!0&&(Tt===!0||C!==R)){const Bn=C===R&&rt.id===L;At.setState(rt,C,Bn)}let se=!1;rt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==vn.state.version||Xt.outputColorSpace!==Ut||j.isBatchedMesh&&Xt.batching===!1||!j.isBatchedMesh&&Xt.batching===!0||j.isBatchedMesh&&Xt.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Xt.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Xt.instancing===!1||!j.isInstancedMesh&&Xt.instancing===!0||j.isSkinnedMesh&&Xt.skinning===!1||!j.isSkinnedMesh&&Xt.skinning===!0||j.isInstancedMesh&&Xt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Xt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Xt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Xt.instancingMorph===!1&&j.morphTexture!==null||Xt.envMap!==kt||rt.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==At.numPlanes||Xt.numIntersection!==At.numIntersection)||Xt.vertexAlphas!==ne||Xt.vertexTangents!==$t||Xt.morphTargets!==It||Xt.morphNormals!==be||Xt.morphColors!==Pe||Xt.toneMapping!==He||Xt.morphTargetsCount!==Me)&&(se=!0):(se=!0,Xt.__version=rt.version);let Wn=Xt.currentProgram;se===!0&&(Wn=en(rt,W,j));let Ra=!1,Cn=!1,wa=!1;const Ne=Wn.getUniforms(),di=Xt.uniforms;if(Qt.useProgram(Wn.program)&&(Ra=!0,Cn=!0,wa=!0),rt.id!==L&&(L=rt.id,Cn=!0),Ra||R!==C){Qt.buffers.depth.getReversed()?(Mt.copy(C.projectionMatrix),iE(Mt),aE(Mt),Ne.setValue(Y,"projectionMatrix",Mt)):Ne.setValue(Y,"projectionMatrix",C.projectionMatrix),Ne.setValue(Y,"viewMatrix",C.matrixWorldInverse);const Di=Ne.map.cameraPosition;Di!==void 0&&Di.setValue(Y,Ht.setFromMatrixPosition(C.matrixWorld)),_e.logarithmicDepthBuffer&&Ne.setValue(Y,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Ne.setValue(Y,"isOrthographic",C.isOrthographicCamera===!0),R!==C&&(R=C,Cn=!0,wa=!0)}if(j.isSkinnedMesh){Ne.setOptional(Y,j,"bindMatrix"),Ne.setOptional(Y,j,"bindMatrixInverse");const Bn=j.skeleton;Bn&&(Bn.boneTexture===null&&Bn.computeBoneTexture(),Ne.setValue(Y,"boneTexture",Bn.boneTexture,N))}j.isBatchedMesh&&(Ne.setOptional(Y,j,"batchingTexture"),Ne.setValue(Y,"batchingTexture",j._matricesTexture,N),Ne.setOptional(Y,j,"batchingIdTexture"),Ne.setValue(Y,"batchingIdTexture",j._indirectTexture,N),Ne.setOptional(Y,j,"batchingColorTexture"),j._colorsTexture!==null&&Ne.setValue(Y,"batchingColorTexture",j._colorsTexture,N));const En=ot.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&jt.update(j,ot,Wn),(Cn||Xt.receiveShadow!==j.receiveShadow)&&(Xt.receiveShadow=j.receiveShadow,Ne.setValue(Y,"receiveShadow",j.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(di.envMap.value=kt,di.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&W.environment!==null&&(di.envMapIntensity.value=W.environmentIntensity),Cn&&(Ne.setValue(Y,"toneMappingExposure",w.toneMappingExposure),Xt.needsLights&&pu(di,wa),bt&&rt.fog===!0&&Lt.refreshFogUniforms(di,bt),Lt.refreshMaterialUniforms(di,rt,k,V,v.state.transmissionRenderTarget[C.id]),nu.upload(Y,wn(Xt),di,N)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(nu.upload(Y,wn(Xt),di,N),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Ne.setValue(Y,"center",j.center),Ne.setValue(Y,"modelViewMatrix",j.modelViewMatrix),Ne.setValue(Y,"normalMatrix",j.normalMatrix),Ne.setValue(Y,"modelMatrix",j.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Bn=rt.uniformsGroups;for(let Di=0,pi=Bn.length;Di<pi;Di++){const Ki=Bn[Di];X.update(Ki,Wn),X.bind(Ki,Wn)}}return Wn}function pu(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function mu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(C,W,ot){Zt.get(C.texture).__webglTexture=W,Zt.get(C.depthTexture).__webglTexture=ot;const rt=Zt.get(C);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=ot===void 0,rt.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,W){const ot=Zt.get(C);ot.__webglFramebuffer=W,ot.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(C,W=0,ot=0){G=C,I=W,P=ot;let rt=!0,j=null,bt=!1,Dt=!1;if(C){const kt=Zt.get(C);if(kt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(Y.FRAMEBUFFER,null),rt=!1;else if(kt.__webglFramebuffer===void 0)N.setupRenderTarget(C);else if(kt.__hasExternalTextures)N.rebindTextures(C,Zt.get(C.texture).__webglTexture,Zt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const It=C.depthTexture;if(kt.__boundDepthTexture!==It){if(It!==null&&Zt.has(It)&&(C.width!==It.image.width||C.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(C)}}const ne=C.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Dt=!0);const $t=Zt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[W])?j=$t[W][ot]:j=$t[W],bt=!0):C.samples>0&&N.useMultisampledRTT(C)===!1?j=Zt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?j=$t[ot]:j=$t,F.copy(C.viewport),et.copy(C.scissor),st=C.scissorTest}else F.copy(O).multiplyScalar(k).floor(),et.copy(nt).multiplyScalar(k).floor(),st=yt;if(Qt.bindFramebuffer(Y.FRAMEBUFFER,j)&&rt&&Qt.drawBuffers(C,j),Qt.viewport(F),Qt.scissor(et),Qt.setScissorTest(st),bt){const kt=Zt.get(C.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+W,kt.__webglTexture,ot)}else if(Dt){const kt=Zt.get(C.texture),ne=W||0;Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,kt.__webglTexture,ot||0,ne)}L=-1},this.readRenderTargetPixels=function(C,W,ot,rt,j,bt,Dt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){Qt.bindFramebuffer(Y.FRAMEBUFFER,Ut);try{const kt=C.texture,ne=kt.format,$t=kt.type;if(!_e.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-rt&&ot>=0&&ot<=C.height-j&&Y.readPixels(W,ot,rt,j,re.convert(ne),re.convert($t),bt)}finally{const kt=G!==null?Zt.get(G).__webglFramebuffer:null;Qt.bindFramebuffer(Y.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(C,W,ot,rt,j,bt,Dt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){const kt=C.texture,ne=kt.format,$t=kt.type;if(!_e.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=C.width-rt&&ot>=0&&ot<=C.height-j){Qt.bindFramebuffer(Y.FRAMEBUFFER,Ut);const It=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,It),Y.bufferData(Y.PIXEL_PACK_BUFFER,bt.byteLength,Y.STREAM_READ),Y.readPixels(W,ot,rt,j,re.convert(ne),re.convert($t),0);const be=G!==null?Zt.get(G).__webglFramebuffer:null;Qt.bindFramebuffer(Y.FRAMEBUFFER,be);const Pe=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await nE(Y,Pe,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,It),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,bt),Y.deleteBuffer(It),Y.deleteSync(Pe),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,W=null,ot=0){C.isTexture!==!0&&(al("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,C=arguments[1]);const rt=Math.pow(2,-ot),j=Math.floor(C.image.width*rt),bt=Math.floor(C.image.height*rt),Dt=W!==null?W.x:0,Ut=W!==null?W.y:0;N.setTexture2D(C,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ot,0,0,Dt,Ut,j,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(C,W,ot=null,rt=null,j=0){C.isTexture!==!0&&(al("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,C=arguments[1],W=arguments[2],j=arguments[3]||0,ot=null);let bt,Dt,Ut,kt,ne,$t,It,be,Pe;const He=C.isCompressedTexture?C.mipmaps[j]:C.image;ot!==null?(bt=ot.max.x-ot.min.x,Dt=ot.max.y-ot.min.y,Ut=ot.isBox3?ot.max.z-ot.min.z:1,kt=ot.min.x,ne=ot.min.y,$t=ot.isBox3?ot.min.z:0):(bt=He.width,Dt=He.height,Ut=He.depth||1,kt=0,ne=0,$t=0),rt!==null?(It=rt.x,be=rt.y,Pe=rt.z):(It=0,be=0,Pe=0);const zn=re.convert(W.format),Me=re.convert(W.type);let Xt;W.isData3DTexture?(N.setTexture3D(W,0),Xt=Y.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(N.setTexture2DArray(W,0),Xt=Y.TEXTURE_2D_ARRAY):(N.setTexture2D(W,0),Xt=Y.TEXTURE_2D),Y.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,W.flipY),Y.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),Y.pixelStorei(Y.UNPACK_ALIGNMENT,W.unpackAlignment);const vn=Y.getParameter(Y.UNPACK_ROW_LENGTH),se=Y.getParameter(Y.UNPACK_IMAGE_HEIGHT),Wn=Y.getParameter(Y.UNPACK_SKIP_PIXELS),Ra=Y.getParameter(Y.UNPACK_SKIP_ROWS),Cn=Y.getParameter(Y.UNPACK_SKIP_IMAGES);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,He.width),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,He.height),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,kt),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,ne),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,$t);const wa=C.isDataArrayTexture||C.isData3DTexture,Ne=W.isDataArrayTexture||W.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const di=Zt.get(C),En=Zt.get(W),Bn=Zt.get(di.__renderTarget),Di=Zt.get(En.__renderTarget);Qt.bindFramebuffer(Y.READ_FRAMEBUFFER,Bn.__webglFramebuffer),Qt.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let pi=0;pi<Ut;pi++)wa&&Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Zt.get(C).__webglTexture,j,$t+pi),C.isDepthTexture?(Ne&&Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Zt.get(W).__webglTexture,j,Pe+pi),Y.blitFramebuffer(kt,ne,bt,Dt,It,be,bt,Dt,Y.DEPTH_BUFFER_BIT,Y.NEAREST)):Ne?Y.copyTexSubImage3D(Xt,j,It,be,Pe+pi,kt,ne,bt,Dt):Y.copyTexSubImage2D(Xt,j,It,be,Pe+pi,kt,ne,bt,Dt);Qt.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Ne?C.isDataTexture||C.isData3DTexture?Y.texSubImage3D(Xt,j,It,be,Pe,bt,Dt,Ut,zn,Me,He.data):W.isCompressedArrayTexture?Y.compressedTexSubImage3D(Xt,j,It,be,Pe,bt,Dt,Ut,zn,He.data):Y.texSubImage3D(Xt,j,It,be,Pe,bt,Dt,Ut,zn,Me,He):C.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,j,It,be,bt,Dt,zn,Me,He.data):C.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,j,It,be,He.width,He.height,zn,He.data):Y.texSubImage2D(Y.TEXTURE_2D,j,It,be,bt,Dt,zn,Me,He);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,vn),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,se),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,Wn),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,Ra),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,Cn),j===0&&W.generateMipmaps&&Y.generateMipmap(Xt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(C,W,ot=null,rt=null,j=0){return C.isTexture!==!0&&(al("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ot=arguments[0]||null,rt=arguments[1]||null,C=arguments[2],W=arguments[3],j=arguments[4]||0),al('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,W,ot,rt,j)},this.initRenderTarget=function(C){Zt.get(C).__webglFramebuffer===void 0&&N.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?N.setTextureCube(C,0):C.isData3DTexture?N.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?N.setTexture2DArray(C,0):N.setTexture2D(C,0),Qt.unbindTexture()},this.resetState=function(){I=0,P=0,G=null,Qt.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ma}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Ae._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ae._getUnpackColorSpace()}}class vp{constructor(t,n=1,a=1e3){this.isFog=!0,this.name="",this.color=new ue(t),this.near=n,this.far=a}clone(){return new vp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class d2 extends qn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Aa,this.environmentIntensity=1,this.environmentRotation=new Aa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Sx extends to{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ru=new J,ou=new J,Mv=new sn,el=new mp,qc=new fl,ud=new J,Ev=new J;class p2 extends qn{constructor(t=new An,n=new Sx){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[0];for(let l=1,c=n.count;l<c;l++)ru.fromBufferAttribute(n,l-1),ou.fromBufferAttribute(n,l),a[l]=a[l-1],a[l]+=ru.distanceTo(ou);t.setAttribute("lineDistance",new yn(a,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),qc.copy(a.boundingSphere),qc.applyMatrix4(l),qc.radius+=c,t.ray.intersectsSphere(qc)===!1)return;Mv.copy(l).invert(),el.copy(t.ray).applyMatrix4(Mv);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,g=a.index,x=a.attributes.position;if(g!==null){const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const v=g.getX(T),U=g.getX(T+1),D=Wc(this,t,el,p,v,U);D&&n.push(D)}if(this.isLineLoop){const T=g.getX(E-1),S=g.getX(M),v=Wc(this,t,el,p,T,S);v&&n.push(v)}}else{const M=Math.max(0,f.start),E=Math.min(x.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const v=Wc(this,t,el,p,T,T+1);v&&n.push(v)}if(this.isLineLoop){const T=Wc(this,t,el,p,E-1,M);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function Wc(r,t,n,a,l,c){const f=r.geometry.attributes.position;if(ru.fromBufferAttribute(f,l),ou.fromBufferAttribute(f,c),n.distanceSqToSegment(ru,ou,ud,Ev)>a)return;ud.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(ud);if(!(p<t.near||p>t.far))return{distance:p,point:Ev.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}class iu extends to{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Tv=new sn,sp=new mp,jc=new fl,Yc=new J;class fd extends qn{constructor(t=new An,n=new iu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),jc.copy(a.boundingSphere),jc.applyMatrix4(l),jc.radius+=c,t.ray.intersectsSphere(jc)===!1)return;Tv.copy(l).invert(),sp.copy(t.ray).applyMatrix4(Tv);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=a.index,_=a.attributes.position;if(m!==null){const x=Math.max(0,f.start),M=Math.min(m.count,f.start+f.count);for(let E=x,T=M;E<T;E++){const S=m.getX(E);Yc.fromBufferAttribute(_,S),bv(Yc,S,p,l,t,n,this)}}else{const x=Math.max(0,f.start),M=Math.min(_.count,f.start+f.count);for(let E=x,T=M;E<T;E++)Yc.fromBufferAttribute(_,E),bv(Yc,E,p,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function bv(r,t,n,a,l,c,f){const h=sp.distanceSqToPoint(r);if(h<n){const p=new J;sp.closestPointToPoint(r,p),p.applyMatrix4(a);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;c.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class tn extends An{constructor(t=1,n=1,a=1,l=32,c=1,f=!1,h=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:h,thetaLength:p};const m=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],x=[],M=[];let E=0;const T=[],S=a/2;let v=0;U(),f===!1&&(t>0&&D(!0),n>0&&D(!1)),this.setIndex(g),this.setAttribute("position",new yn(_,3)),this.setAttribute("normal",new yn(x,3)),this.setAttribute("uv",new yn(M,2));function U(){const w=new J,q=new J;let I=0;const P=(n-t)/a;for(let G=0;G<=c;G++){const L=[],R=G/c,F=R*(n-t)+t;for(let et=0;et<=l;et++){const st=et/l,ht=st*p+h,pt=Math.sin(ht),z=Math.cos(ht);q.x=F*pt,q.y=-R*a+S,q.z=F*z,_.push(q.x,q.y,q.z),w.set(pt,P,z).normalize(),x.push(w.x,w.y,w.z),M.push(st,1-R),L.push(E++)}T.push(L)}for(let G=0;G<l;G++)for(let L=0;L<c;L++){const R=T[L][G],F=T[L+1][G],et=T[L+1][G+1],st=T[L][G+1];(t>0||L!==0)&&(g.push(R,F,st),I+=3),(n>0||L!==c-1)&&(g.push(F,et,st),I+=3)}m.addGroup(v,I,0),v+=I}function D(w){const q=E,I=new Ce,P=new J;let G=0;const L=w===!0?t:n,R=w===!0?1:-1;for(let et=1;et<=l;et++)_.push(0,S*R,0),x.push(0,R,0),M.push(.5,.5),E++;const F=E;for(let et=0;et<=l;et++){const ht=et/l*p+h,pt=Math.cos(ht),z=Math.sin(ht);P.x=L*z,P.y=S*R,P.z=L*pt,_.push(P.x,P.y,P.z),x.push(0,R,0),I.x=pt*.5+.5,I.y=z*.5*R+.5,M.push(I.x,I.y),E++}for(let et=0;et<l;et++){const st=q+et,ht=F+et;w===!0?g.push(ht,ht+1,st):g.push(ht+1,ht,st),G+=3}m.addGroup(v,G,w===!0?1:2),v+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class os extends tn{constructor(t=1,n=1,a=32,l=1,c=!1,f=0,h=Math.PI*2){super(0,t,n,a,l,c,f,h),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:h}}static fromJSON(t){return new os(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hl extends An{constructor(t=[],n=[],a=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:l};const c=[],f=[];h(l),m(a),g(),this.setAttribute("position",new yn(c,3)),this.setAttribute("normal",new yn(c.slice(),3)),this.setAttribute("uv",new yn(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function h(U){const D=new J,w=new J,q=new J;for(let I=0;I<n.length;I+=3)M(n[I+0],D),M(n[I+1],w),M(n[I+2],q),p(D,w,q,U)}function p(U,D,w,q){const I=q+1,P=[];for(let G=0;G<=I;G++){P[G]=[];const L=U.clone().lerp(w,G/I),R=D.clone().lerp(w,G/I),F=I-G;for(let et=0;et<=F;et++)et===0&&G===I?P[G][et]=L:P[G][et]=L.clone().lerp(R,et/F)}for(let G=0;G<I;G++)for(let L=0;L<2*(I-G)-1;L++){const R=Math.floor(L/2);L%2===0?(x(P[G][R+1]),x(P[G+1][R]),x(P[G][R])):(x(P[G][R+1]),x(P[G+1][R+1]),x(P[G+1][R]))}}function m(U){const D=new J;for(let w=0;w<c.length;w+=3)D.x=c[w+0],D.y=c[w+1],D.z=c[w+2],D.normalize().multiplyScalar(U),c[w+0]=D.x,c[w+1]=D.y,c[w+2]=D.z}function g(){const U=new J;for(let D=0;D<c.length;D+=3){U.x=c[D+0],U.y=c[D+1],U.z=c[D+2];const w=S(U)/2/Math.PI+.5,q=v(U)/Math.PI+.5;f.push(w,1-q)}E(),_()}function _(){for(let U=0;U<f.length;U+=6){const D=f[U+0],w=f[U+2],q=f[U+4],I=Math.max(D,w,q),P=Math.min(D,w,q);I>.9&&P<.1&&(D<.2&&(f[U+0]+=1),w<.2&&(f[U+2]+=1),q<.2&&(f[U+4]+=1))}}function x(U){c.push(U.x,U.y,U.z)}function M(U,D){const w=U*3;D.x=t[w+0],D.y=t[w+1],D.z=t[w+2]}function E(){const U=new J,D=new J,w=new J,q=new J,I=new Ce,P=new Ce,G=new Ce;for(let L=0,R=0;L<c.length;L+=9,R+=6){U.set(c[L+0],c[L+1],c[L+2]),D.set(c[L+3],c[L+4],c[L+5]),w.set(c[L+6],c[L+7],c[L+8]),I.set(f[R+0],f[R+1]),P.set(f[R+2],f[R+3]),G.set(f[R+4],f[R+5]),q.copy(U).add(D).add(w).divideScalar(3);const F=S(q);T(I,R+0,U,F),T(P,R+2,D,F),T(G,R+4,w,F)}}function T(U,D,w,q){q<0&&U.x===1&&(f[D]=U.x-1),w.x===0&&w.z===0&&(f[D]=q/2/Math.PI+.5)}function S(U){return Math.atan2(U.z,-U.x)}function v(U){return Math.atan2(-U.y,Math.sqrt(U.x*U.x+U.z*U.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.vertices,t.indices,t.radius,t.details)}}class lu extends hl{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=1/a,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-a,0,-l,a,0,l,-a,0,l,a,-l,-a,0,-l,a,0,l,-a,0,l,a,0,-a,0,-l,a,0,-l,-a,0,l,a,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new lu(t.radius,t.detail)}}class xp extends hl{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new xp(t.radius,t.detail)}}class cu extends hl{constructor(t=1,n=0){const a=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(a,l,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new cu(t.radius,t.detail)}}class hi extends An{constructor(t=1,n=32,a=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const p=Math.min(f+h,Math.PI);let m=0;const g=[],_=new J,x=new J,M=[],E=[],T=[],S=[];for(let v=0;v<=a;v++){const U=[],D=v/a;let w=0;v===0&&f===0?w=.5/n:v===a&&p===Math.PI&&(w=-.5/n);for(let q=0;q<=n;q++){const I=q/n;_.x=-t*Math.cos(l+I*c)*Math.sin(f+D*h),_.y=t*Math.cos(f+D*h),_.z=t*Math.sin(l+I*c)*Math.sin(f+D*h),E.push(_.x,_.y,_.z),x.copy(_).normalize(),T.push(x.x,x.y,x.z),S.push(I+w,1-D),U.push(m++)}g.push(U)}for(let v=0;v<a;v++)for(let U=0;U<n;U++){const D=g[v][U+1],w=g[v][U],q=g[v+1][U],I=g[v+1][U+1];(v!==0||f>0)&&M.push(D,w,I),(v!==a-1||p<Math.PI)&&M.push(w,q,I)}this.setIndex(M),this.setAttribute("position",new yn(E,3)),this.setAttribute("normal",new yn(T,3)),this.setAttribute("uv",new yn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class m2 extends Gi{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Mx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Av(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Av();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function Av(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lp);const g2={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class dl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const _2=new mx(-1,1,1,-1,0,1);class v2 extends An{constructor(){super(),this.setAttribute("position",new yn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new yn([0,2,0,0,2,0],2))}}const x2=new v2;class Ex{constructor(t){this._mesh=new ln(x2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,_2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Tx extends dl{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof Gi?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gp.clone(t.uniforms),this.material=new Gi({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ex(this.material)}render(t,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Rv extends dl{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,a){const l=t.getContext(),c=t.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,h;this.inverse?(f=0,h=1):(f=1,h=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(h),c.buffers.stencil.setLocked(!0),t.setRenderTarget(a),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class y2 extends dl{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class S2{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const a=t.getSize(new Ce);this._width=a.width,this._height=a.height,n=new hs(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Qr}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Tx(g2),this.copyPass.material.blending=Ea,this.clock=new Mx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,a),f.needsSwap){if(a){const h=this.renderer.getContext(),p=this.renderer.state.buffers.stencil;p.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),p.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}Rv!==void 0&&(f instanceof Rv?a=!0:f instanceof y2&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new Ce);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const a=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(a,l),this.renderTarget2.setSize(a,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(a,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class M2 extends dl{constructor(t,n,a=null,l=null,c=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=a,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ue}render(t,n,a){const l=t.autoClear;t.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(c=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const E2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class T2 extends dl{constructor(){super();const t=E2;this.uniforms=gp.clone(t.uniforms),this.material=new m2({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ex(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,n,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ae.getTransfer(this._outputColorSpace)===Ie&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Fv?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Gv?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Hv?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vv?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===kv?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Xv&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const b2={uniforms:{tDiffuse:{value:null},uTime:{value:0},uChroma:{value:0},uScanline:{value:.04},uGrain:{value:.035},uVignette:{value:.4}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uChroma;
    uniform float uScanline;
    uniform float uGrain;
    uniform float uVignette;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.5);
      vec2 offset = uv - center;
      float dist = length(offset);
      // 色差：越靠近边缘越强
      float chroma = uChroma * smoothstep(0.0, 0.7, dist);
      vec2 dir = normalize(offset + vec2(1e-5));

      float r = texture2D(tDiffuse, uv + dir * chroma).r;
      float gC = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - dir * chroma).b;
      vec3 col = vec3(r, gC, b);

      // 扫描线：水平细线
      float scan = sin(uv.y * 720.0) * 0.5 + 0.5;
      col *= 1.0 - uScanline * scan;

      // 颗粒：基于时间和屏幕坐标（变量名避开 g 避免遮蔽绿通道）
      float n = hash(uv * 800.0 + uTime * 13.0) - 0.5;
      col += n * uGrain;

      // 暗角
      float vig = 1.0 - dist * uVignette;
      col *= clamp(vig, 0.0, 1.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `};class A2{constructor(t,n,a,l,c){Rt(this,"composer");Rt(this,"cyberpass");Rt(this,"outputPass");Rt(this,"clock",0);this.composer=new S2(t),this.composer.addPass(new M2(n,a)),this.cyberpass=new Tx(b2),this.composer.addPass(this.cyberpass),this.outputPass=new T2,this.composer.addPass(this.outputPass),this.composer.setSize(l,c)}setSize(t,n){this.composer.setSize(t,n)}render(t){t&&(this.clock+=t),this.cyberpass.uniforms.uTime.value=this.clock,this.composer.render(t)}dispose(){this.composer.dispose(),this.outputPass.dispose()}}class R2{constructor(t,n,a){Rt(this,"scene");Rt(this,"renderer");Rt(this,"camera");Rt(this,"playerMeshes",new Map);Rt(this,"enemyMeshes",new Map);Rt(this,"projectileMeshes",new Map);Rt(this,"particleMeshes",new Map);Rt(this,"bossMeshes",new Map);Rt(this,"lockIndicators",new Map);Rt(this,"clock");Rt(this,"postFX");Rt(this,"starfield");Rt(this,"hologramParticles");Rt(this,"particleData");Rt(this,"introActive",!1);Rt(this,"introT",0);Rt(this,"introOnComplete",null);Rt(this,"introCamStart");Rt(this,"introCamEnd");Rt(this,"introLookStart");Rt(this,"introLookEnd");Rt(this,"INTRO_DURATION",2.4);this.scene=new d2,this.scene.background=new ue(0),this.scene.fog=new vp(0,300,900),this.renderer=new h2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(n,a),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera=new Ai(60,n/a,.1,2e3),this.camera.position.set(0,Uh,Ec),this.clock=new Mx,this.postFX=new A2(this.renderer,this.scene,this.camera,n,a),this.buildCyberpunkBackground()}startIntro(t,n){this.introActive=!0,this.introT=0,this.introOnComplete=n,this.introCamStart=new J(t.x,t.y+35,t.z+45),this.introCamEnd=new J(t.x,t.y+Uh,t.z+Ec),this.introLookStart=new J(t.x,t.y+30,t.z-100),this.introLookEnd=new J(t.x,t.y,t.z),this.camera.position.copy(this.introCamStart),this.camera.lookAt(this.introLookStart),this.hologramParticles&&(this.hologramParticles.material.opacity=0),this.starfield&&(this.starfield.material.opacity=0)}introIsActive(){return this.introActive}buildCyberpunkBackground(){this.buildStarfield(),this.buildHologramParticles()}buildStarfield(){const n=new Float32Array(840),a=new Float32Array(280*3),l=new Float32Array(280);for(let h=0;h<280;h++){const p=700+Math.random()*200,m=Math.random()*Math.PI*2,g=(Math.random()-.5)*Math.PI*.55;n[h*3]=Math.cos(m)*Math.cos(g)*p,n[h*3+1]=Math.sin(g)*p,n[h*3+2]=Math.sin(m)*Math.cos(g)*p;const _=Math.random()<.1,x=_?.85+Math.random()*.15:.35+Math.random()*.4;a[h*3]=x,a[h*3+1]=x,a[h*3+2]=x,l[h]=_?2+Math.random()*1.5:.8+Math.random()*.6}const c=new An;c.setAttribute("position",new On(n,3)),c.setAttribute("color",new On(a,3));const f=new iu({size:1.6,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,sizeAttenuation:!0,fog:!0});this.starfield=new fd(c,f),this.scene.add(this.starfield)}buildHologramParticles(){const n=new Float32Array(1050),a=new Float32Array(350*3),l=new Float32Array(350*3);for(let h=0;h<350;h++){const p=60+Math.random()*180,m=Math.random()*Math.PI*2,g=(Math.random()-.5)*Math.PI*.7;n[h*3]=Math.cos(m)*Math.cos(g)*p,n[h*3+1]=Math.sin(g)*p*.55+25,n[h*3+2]=Math.sin(m)*Math.cos(g)*p,a[h*3]=(Math.random()-.5)*.15,a[h*3+1]=.05+Math.random()*.1,a[h*3+2]=(Math.random()-.5)*.15;const _=.55+Math.random()*.4;l[h*3]=_,l[h*3+1]=_,l[h*3+2]=_}const c=new An;c.setAttribute("position",new On(n,3)),c.setAttribute("color",new On(l,3));const f=new iu({size:.9,vertexColors:!0,transparent:!0,opacity:.55,blending:rl,depthWrite:!1,sizeAttenuation:!0,fog:!0});this.hologramParticles=new fd(c,f),this.scene.add(this.hologramParticles),this.particleData={velocities:a}}updateAtmosphere(t){if(this.introActive){this.introT+=t;const n=this.introT,a=Math.max(0,Math.min(1,(n-1)/.5));this.hologramParticles&&(this.hologramParticles.material.opacity=.55*a),this.starfield&&(this.starfield.material.opacity=.9*a);const l=Math.max(0,Math.min(1,(n-1.6)/.8)),c=1-Math.pow(1-l,3);this.camera.position.lerpVectors(this.introCamStart,this.introCamEnd,c);const f=new J().lerpVectors(this.introLookStart,this.introLookEnd,c);this.camera.lookAt(f),n>=this.INTRO_DURATION&&(this.introActive=!1,this.introOnComplete&&(this.introOnComplete(),this.introOnComplete=null));return}if(this.particleData){const{velocities:n}=this.particleData,a=this.hologramParticles.geometry.attributes.position,l=a.array,c=l.length/3;for(let f=0;f<c;f++)l[f*3]+=n[f*3]*t,l[f*3+1]+=n[f*3+1]*t,l[f*3+2]+=n[f*3+2]*t,l[f*3+1]>200&&(l[f*3+1]=-50,l[f*3]+=(Math.random()-.5)*30,l[f*3+2]+=(Math.random()-.5)*30);a.needsUpdate=!0}this.starfield&&(this.starfield.rotation.y+=t*(Math.PI*2)/120)}updateCamera(t,n,a,l=_d){const c=new J(t.x-Math.sin(a)*Ec,t.y+Uh,t.z-Math.cos(a)*Ec),f=1-Math.exp(-l*n);this.camera.position.lerp(c,f),this.camera.lookAt(t.x,t.y,t.z)}setSpeedRatio(t){const n=hM+dM*Math.max(0,Math.min(1,t));Math.abs(this.camera.fov-n)>.01&&(this.camera.fov+=(n-this.camera.fov)*.1,this.camera.updateProjectionMatrix())}resize(t,n){this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.postFX.setSize(t,n)}render(t=1/60){this.updateAtmosphere(t),this.postFX.render()}addPart(t,n,a,l,c=16777215){const f=new rs({color:c}),h=new ln(n,f);return h.position.set(a[0],a[1],a[2]),l&&h.rotation.set(l[0],l[1],l[2]),t.add(h),h}createPlayerMesh(t=new ue(16777215)){const n=new cs;this.addPart(n,new je(1.8,1,1.4),[0,.5,0]),this.addPart(n,new je(1.6,.7,.4),[0,.6,.75]),this.addPart(n,new je(1.2,.5,.2),[0,.6,.95]),this.addPart(n,new tn(.22,.22,.08,12),[0,.55,.8],[Math.PI/2,0,0]),this.addPart(n,new tn(.27,.27,.06,12),[0,.55,.84],[Math.PI/2,0,0],t.getHex()),this.addPart(n,new tn(.8,1,.4,6),[0,0,0]),this.addPart(n,new je(.7,.5,.7),[0,1.3,0]),this.addPart(n,new je(.62,.09,.1),[0,1.27,.4],void 0,t.getHex()),this.addPart(n,new je(.09,.32,.06),[0,1.56,.1],[-.44,0,0]);for(let c=-1;c<=1;c+=2)this.addPart(n,new je(.85,.35,.5),[c*1.35,.95,-.1],[0,0,c*.35]),this.addPart(n,new os(.34,.6,4),[c*1.78,.85,.2],[0,0,c*-.5]),this.addPart(n,new hi(.2,6,6),[c*1.1,.7,0]);for(let c=-1;c<=1;c+=2)this.addPart(n,new tn(.2,.25,.7,6),[c*1.2,.3,0]),this.addPart(n,new tn(.15,.18,.55,6),[c*1.2,.3,.15]),this.addPart(n,new hi(.14,6,6),[c*1.2,-.1,0]),this.addPart(n,new tn(.16,.14,.5,6),[c*1.2,-.45,0]),this.addPart(n,new je(.2,.3,.15),[c*1.2,-.45,.2]),this.addPart(n,new hi(.1,6,6),[c*1.2,-.7,0]),c>0&&(this.addPart(n,new tn(.08,.1,.8,6),[c*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(n,new tn(.05,.06,1,6),[c*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(n,new tn(.07,.09,.1,6),[c*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(n,new je(.2,.12,.3),[c*1.35,-.3,.3]));for(let c=-1;c<=1;c+=2)this.addPart(n,new je(.34,.65,.4),[c*.5,-.32,.32],[c*-.12,0,.12]),this.addPart(n,new hi(.22,6,6),[c*.5,-.62,.4]),this.addPart(n,new je(.3,.72,.36),[c*.5,-.98,-.08],[c*.28,0,0]),this.addPart(n,new hi(.16,6,6),[c*.5,-1.32,-.25]),this.addPart(n,new je(.42,.14,.55),[c*.5,-1.44,.18],[c*.18,0,0]);this.addPart(n,new je(1,.6,.4),[0,.5,-.95]),this.addPart(n,new tn(.35,.4,.4,8),[0,.4,-1.2]);for(let c=-1;c<=1;c+=2)this.addPart(n,new tn(.2,.25,.35,6),[c*.45,.4,-1.15]),this.addPart(n,new tn(.15,.18,.25,6),[c*.35,.85,-.95]);this.addPart(n,new je(.7,.2,.15),[0,-.1,.55]);for(let c=-1;c<=1;c+=2)this.addPart(n,new je(.15,.2,.4),[c*.65,-.1,.2]);const a=new rs({color:16755268,transparent:!0,opacity:.9,blending:rl,depthWrite:!1}),l=(c,f)=>{const h=new ln(new os(.12,.5,6),a);h.name="thruster",h.position.set(c[0],c[1],c[2]),h.rotation.set(f[0],f[1],f[2]),h.scale.set(1,1,.001),n.add(h)};return l([-.5,-1.8,.05],[Math.PI,0,0]),l([.5,-1.8,.05],[Math.PI,0,0]),l([0,.4,-1.38],[-Math.PI/2,0,0]),n}updateThrusters(t,n,a){const l=this.playerMeshes.get(t);if(!l)return;const c=Math.max(0,Math.min(1,n))*(a?1.6:1);l.children.forEach(f=>{if(f.name==="thruster"){const h=f;h.visible=c>.02,h.scale.set(1,1,Math.max(.001,c)),h.material.color.set(a?13691135:16755268)}})}createOutline(t,n){const a=new cs;return t.children.forEach(l=>{if(!(l instanceof ln)||l.name==="thruster"||!(l.geometry instanceof An))return;const c=new rs({color:n,side:Xn,transparent:!0,opacity:.35,blending:rl,depthWrite:!1}),f=new ln(l.geometry.clone(),c);f.position.copy(l.position),f.rotation.copy(l.rotation),f.scale.copy(l.scale).multiplyScalar(1.04),a.add(f)}),a}createEnemyMesh(t,n,a){const l=new cs,c=new rs({color:16777215}),f=(h,p,m)=>{const g=new ln(h,c);g.position.set(p[0],p[1],p[2]),m&&g.rotation.set(m[0],m[1],m[2]),l.add(g)};switch(a){case"scout":{f(new cu(n*.7,1),[0,0,0]);for(let h=0;h<4;h++){const p=h/4*Math.PI*2;f(new os(n*.08,n*.5,4),[Math.cos(p)*n*.6,0,Math.sin(p)*n*.6])}f(new tn(.02,.03,n*.4),[0,n*.5,0]);break}case"assault":{f(new je(n*1,n*.8,n*.7),[0,0,0]),f(new je(n*.7,n*.4,n*.2),[0,0,n*.45]),f(new je(n*.3,n*.25,n*.3),[0,n*.55,0]),f(new je(n*.25,n*.06,.05),[0,n*.55,n*.17]);for(let h=-1;h<=1;h+=2)f(new tn(n*.08,n*.1,n*.4,6),[h*n*.6,n*.1,n*.3],[Math.PI/2,0,0]);break}case"sniper":{f(new tn(n*.2,n*.3,n*1,6),[0,0,0]),f(new tn(n*.06,n*.06,n*.15,6),[0,n*.6,0]),f(new hi(n*.08,6,6),[0,n*.68,0]),f(new tn(n*.04,n*.06,n*1.2,6),[0,0,n*.7],[Math.PI/2,0,0]);for(let h=-1;h<=1;h+=2)f(new tn(n*.04,n*.06,n*.3,4),[h*n*.2,-n*.55,0]);break}case"shield":{f(new je(n*1.2,n*.6,n*.5),[0,0,0]),f(new je(n*1.1,n*.8,n*.15),[0,0,n*.35]),f(new hi(n*.15,6,6),[0,0,n*.45]);for(let h=-1;h<=1;h+=2)f(new tn(n*.1,n*.15,n*.2,6),[h*n*.4,0,-n*.3]);break}case"bomber":{f(new hi(n*.6,8,8),[0,0,0]);for(let h=0;h<8;h++){const p=h/8*Math.PI*2,m=Math.PI*.5,g=new J(Math.cos(p)*Math.sin(m),Math.cos(m),Math.sin(p)*Math.sin(m)),_=new ln(new os(n*.06,n*.35,4),c);_.position.set(g.x*n*.6,g.y*n*.6,g.z*n*.6),_.quaternion.setFromUnitVectors(new J(0,1,0),g),l.add(_)}break}case"commander":{f(new lu(n*.6),[0,0,0]),f(new os(n*.1,n*.5,4),[0,n*.6,0]);for(let h=-1;h<=1;h+=2)f(new hi(n*.25,6,6),[h*n*.55,n*.2,0]);f(new je(n*.4,n*.3,n*.2),[0,0,-n*.4]);break}default:{f(new cu(n*.8),[0,0,0]);break}}return l}createBossMesh(t=new ue(16777215),n=4){const a=new cs,l=new rs({color:16777215}),c=new ln(new lu(n),l);a.add(c);const f=new ln(new xp(n*.4),l);a.add(f);for(let h=0;h<6;h++){const p=new ln(new tn(.3,.4,.8,6),l),m=h/6*Math.PI*2;p.position.set(Math.cos(m)*n*1.1,0,Math.sin(m)*n*1.1),p.rotation.z=Math.PI/2,p.rotation.y=-m,a.add(p)}return a}createProjectileMesh(t,n){const a=new rs({color:16777215});let l;switch(n){case"beam":case"sniper":l=new hi(.3,6,6);break;case"missile":l=new os(.2,.6,6);break;default:l=new hi(.15,4,4)}return new ln(l,a)}createExplosion(t,n,a=1){const c=new Float32Array(90),f=new Float32Array(90),h=new ue(n);for(let M=0;M<30;M++){const E=Math.random()*Math.PI*2,T=Math.random()*Math.PI,S=a*(.5+Math.random()*.5);c[M*3]=t.x+S*Math.sin(T)*Math.cos(E),c[M*3+1]=t.y+S*Math.cos(T),c[M*3+2]=t.z+S*Math.sin(T)*Math.sin(E),f[M*3]=h.r,f[M*3+1]=h.g,f[M*3+2]=h.b}const p=new An;p.setAttribute("position",new On(c,3)),p.setAttribute("color",new On(f,3));const m=new iu({size:.5,vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1}),g=new fd(p,m);this.scene.add(g);let _=1;const x=()=>{if(_-=.02,_<=0){this.scene.remove(g),p.dispose(),m.dispose();return}m.opacity=_;const M=p.attributes.position,E=M.array;for(let T=0;T<30;T++)E[T*3]+=(Math.random()-.5)*.5,E[T*3+1]+=(Math.random()-.5)*.5,E[T*3+2]+=(Math.random()-.5)*.5;M.needsUpdate=!0,requestAnimationFrame(x)};x()}updateLockIndicator(t,n,a,l="#00ff44"){const c=this.lockIndicators.get(t);if(!a){c&&(this.scene.remove(c),this.lockIndicators.delete(t));return}if(c){const f=c.geometry.attributes.position,h=f.array;h[0]=n.x,h[1]=n.y,h[2]=n.z,h[3]=a.x,h[4]=a.y,h[5]=a.z,f.needsUpdate=!0;const p=c.material;p.color.getStyle()!==l&&p.color.set(l)}else{const f=new An,h=new Float32Array([n.x,n.y,n.z,a.x,a.y,a.z]);f.setAttribute("position",new On(h,3));const p=new Sx({color:l,transparent:!0,opacity:.5,linewidth:1}),m=new p2(f,p);this.scene.add(m),this.lockIndicators.set(t,m)}}dispose(){this.postFX.dispose(),this.renderer.dispose()}}class w2{constructor(t){Rt(this,"keys",new Set);Rt(this,"mouseNormX",.5);Rt(this,"mouseNormY",.5);Rt(this,"aimNormX",.5);Rt(this,"aimNormY",.5);Rt(this,"mouseDown",!1);Rt(this,"_weaponSwitch",0);Rt(this,"_dodge",!1);Rt(this,"_special",!1);Rt(this,"_lockToggle",!1);Rt(this,"lastSpaceTime",0);Rt(this,"canvasWidth",1);Rt(this,"canvasHeight",1)}setCanvasSize(t,n){this.canvasWidth=t,this.canvasHeight=n}getMouseNormX(){return this.aimNormX}getMouseNormY(){return this.aimNormY}getRawMouseNormX(){return this.mouseNormX}getRawMouseNormY(){return this.mouseNormY}setAimNorm(t,n){this.aimNormX=t,this.aimNormY=n}has(t){return this.keys.has(t)||this.keys.has(t.toLowerCase())||this.keys.has(t.toUpperCase())}getState(){const t=this._weaponSwitch;this._weaponSwitch=0;const n=this._dodge;this._dodge=!1;const a=this._special;this._special=!1;const l=this._lockToggle;return this._lockToggle=!1,{forward:this.has("w")||this.keys.has("ArrowUp"),backward:this.has("s")||this.keys.has("ArrowDown"),left:this.has("a")||this.keys.has("ArrowLeft"),right:this.has("d")||this.keys.has("ArrowRight"),up:this.has("Shift"),down:this.has("Control"),shoot:this.mouseDown,aimX:this.aimNormX,aimY:this.aimNormY,weaponSwitch:t,boost:this.has(" "),brake:this.has("e"),dodge:n,special:a,lockToggle:l,pause:this.has("Escape")||this.has("Enter")}}keyDown(t){if(this.keys.add(t),t===" "){const a=performance.now();a-this.lastSpaceTime<300&&(this._dodge=!0),this.lastSpaceTime=a}(t==="z"||t==="Z")&&(this._special=!0),t==="Tab"&&(this._lockToggle=!0);const n=parseInt(t,10);n>=1&&n<=9&&(this._weaponSwitch=n)}keyUp(t){this.keys.delete(t),this.keys.delete(t.toLowerCase()),this.keys.delete(t.toUpperCase())}mouseMove(t,n){this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?n/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}const C2=120,wv=60/C2/4,D2=64,U2=.12,L2=25,N2=[{root:45,tones:[57,60,64]},{root:41,tones:[53,57,60]},{root:38,tones:[50,53,57]},{root:40,tones:[52,55,59]}],Cv=r=>440*Math.pow(2,(r-69)/12);class bx{constructor(){Rt(this,"ctx",null);Rt(this,"masterGain",null);Rt(this,"bgmGain",null);Rt(this,"sfxGain",null);Rt(this,"initialized",!1);Rt(this,"bgmTimer",null);Rt(this,"bgmActiveOscs",[]);Rt(this,"nextStepTime",0);Rt(this,"step",0);Rt(this,"noiseBuffer",null)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=t,a.gain.setValueAtTime(.3,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),n.connect(a),a.connect(this.sfxGain),n.start(),n.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let f=0;f<t;f++)a[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=n;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.value=1200,n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),n.gain.setValueAtTime(.4,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playGlitch(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.currentTime,n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.setValueAtTime(1600,t),n.frequency.exponentialRampToValueAtTime(80,t+.18),a.gain.setValueAtTime(.18,t),a.gain.exponentialRampToValueAtTime(.001,t+.18),n.connect(a),a.connect(this.sfxGain),n.start(t),n.stop(t+.2);const l=this.ctx.sampleRate*.15,c=this.ctx.createBuffer(1,l,this.ctx.sampleRate),f=c.getChannelData(0);for(let m=0;m<l;m++)f[m]=(Math.random()-.5)*(1-m/l);const h=this.ctx.createBufferSource();h.buffer=c;const p=this.ctx.createGain();p.gain.setValueAtTime(.25,t),p.gain.exponentialRampToValueAtTime(.001,t+.15),h.connect(p),p.connect(this.sfxGain),h.start(t)}playDodge(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1800,this.ctx.currentTime+.18),n.gain.setValueAtTime(.25,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.2)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=440,a.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),n.connect(a),a.connect(this.sfxGain),n.start(this.ctx.currentTime+t*.3),n.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){this.ensureCtx(),!(!this.ctx||!this.bgmGain||this.bgmTimer!==null)&&(this.step=0,this.nextStepTime=this.ctx.currentTime+.1,this.bgmTimer=window.setInterval(()=>this.scheduleBgmAhead(),L2))}stopBGM(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null);for(const t of this.bgmActiveOscs)try{t.stop()}catch{}this.bgmActiveOscs.length=0,this.step=0,this.nextStepTime=0}scheduleBgmAhead(){if(!(!this.ctx||!this.bgmGain))for(;this.nextStepTime<this.ctx.currentTime+U2;)this.scheduleStep(this.step,this.nextStepTime),this.nextStepTime+=wv,this.step=(this.step+1)%D2}scheduleStep(t,n){const a=Math.floor(t/16),l=t%16,c=N2[a];l===0&&this.schedulePad(c,n),(l===0||l===8)&&this.scheduleBass(c,l===8,n),l%8===4&&this.scheduleHat(n)}schedulePad(t,n){if(!this.ctx||!this.bgmGain)return;const a=16*wv,l=.06,c=.4;for(const f of t.tones)for(const h of[-6,5]){const p=this.ctx.createOscillator(),m=this.ctx.createGain();p.type="sawtooth",p.frequency.value=Cv(f),p.detune.value=h,m.gain.setValueAtTime(1e-4,n),m.gain.exponentialRampToValueAtTime(.022,n+l),m.gain.setValueAtTime(.022,n+a-c),m.gain.exponentialRampToValueAtTime(1e-4,n+a-.02),p.connect(m),m.connect(this.bgmGain),this.trackBgmOsc(p),p.start(n),p.stop(n+a)}}scheduleBass(t,n,a){if(!this.ctx||!this.bgmGain)return;const l=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),f=this.ctx.createGain();l.type="sawtooth",l.frequency.value=Cv(t.root-12+(n?7:0)),c.type="lowpass",c.frequency.setValueAtTime(420,a),c.frequency.exponentialRampToValueAtTime(120,a+.3),c.Q.value=2;const h=n?.2:.24;f.gain.setValueAtTime(1e-4,a),f.gain.exponentialRampToValueAtTime(.16,a+.01),f.gain.exponentialRampToValueAtTime(1e-4,a+h),l.connect(c),c.connect(f),f.connect(this.bgmGain),this.trackBgmOsc(l),l.start(a),l.stop(a+h+.05)}scheduleHat(t){if(!this.ctx||!this.bgmGain)return;const n=this.getNoiseBuffer();if(!n)return;const a=this.ctx.createBufferSource();a.buffer=n;const l=this.ctx.createBiquadFilter();l.type="highpass",l.frequency.value=6500;const c=this.ctx.createGain();c.gain.setValueAtTime(.035,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),a.connect(l),l.connect(c),c.connect(this.bgmGain),a.start(t),a.stop(t+.08)}getNoiseBuffer(){if(!this.ctx)return null;if(this.noiseBuffer)return this.noiseBuffer;const t=this.ctx.sampleRate*.1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let l=0;l<t;l++)a[l]=Math.random()*2-1;return this.noiseBuffer=n,n}trackBgmOsc(t){this.bgmActiveOscs.push(t),t.onended=()=>{const n=this.bgmActiveOscs.indexOf(t);n>=0&&this.bgmActiveOscs.splice(n,1)}}playBossAnnounce(t){if(this.ensureCtx(),!this.ctx)return;const n=this.ctx.currentTime,a=[...t].reduce((f,h)=>f+h.charCodeAt(0),0),l=120+a%60,c=1+(a>>3)%5/10;this.voiceChip(n,{freq:l,duration:.42,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:34,depth:.55,gainA:.26,gainB:.14,gainC:.1,glideTo:l*.92}),this.voiceChip(n+.3,{freq:l*c,duration:.55,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:30,depth:.5,gainA:.24,gainB:.13,gainC:.09,glideTo:l*c*.9})}playSpecialAnnounce(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.currentTime,n=330;this.voiceChip(t,{freq:n,duration:.8,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:46,depth:.6,gainA:.2,gainB:.14,gainC:.12,glideTo:n*1.8}),this.voiceChip(t+.15,{freq:n*1.25,duration:.6,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:52,depth:.55,gainA:.18,gainB:.12,gainC:.1,glideTo:n*1.25*1.5})}voiceChip(t,n){if(!this.ctx||!this.sfxGain)return;const a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(1,t+.01),a.gain.setValueAtTime(1,t+n.duration*.45),a.gain.exponentialRampToValueAtTime(1e-4,t+n.duration);const l=this.ctx.createGain();l.gain.value=.5;const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sine",c.frequency.value=n.pulseHz,f.gain.value=n.depth,c.connect(f),f.connect(l.gain),c.start(t),c.stop(t+n.duration);const h=[[n.waveA,n.freq,n.gainA],[n.waveB,n.freq*1.005,n.gainB],[n.waveC,n.freq*2.01,n.gainC]];for(const[p,m,g]of h){const _=this.ctx.createOscillator(),x=this.ctx.createGain();_.type=p,_.frequency.setValueAtTime(m,t),_.frequency.exponentialRampToValueAtTime(n.glideTo*(m/n.freq),t+n.duration),x.gain.value=g,_.connect(x),x.connect(l),_.start(t),_.stop(t+n.duration+.02)}l.connect(a),a.connect(this.sfxGain)}playIntroSting(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.currentTime,n=this.ctx.createOscillator(),a=this.ctx.createGain(),l=this.ctx.createBiquadFilter();n.type="sawtooth",n.frequency.setValueAtTime(55,t),n.frequency.exponentialRampToValueAtTime(110,t+3),l.type="lowpass",l.frequency.setValueAtTime(200,t),l.frequency.exponentialRampToValueAtTime(900,t+3),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(.15,t+1.5),a.gain.exponentialRampToValueAtTime(1e-4,t+3),n.connect(l).connect(a).connect(this.sfxGain),n.start(t),n.stop(t+3);const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sawtooth",c.frequency.setValueAtTime(220,t+.8),c.frequency.exponentialRampToValueAtTime(880,t+1.6),f.gain.setValueAtTime(1e-4,t+.8),f.gain.exponentialRampToValueAtTime(.12,t+1.2),f.gain.exponentialRampToValueAtTime(1e-4,t+2.2),c.connect(f).connect(this.sfxGain),c.start(t+.8),c.stop(t+2.2);const h=this.ctx.createOscillator(),p=this.ctx.createGain();h.type="sine",h.frequency.setValueAtTime(90,t+.8),h.frequency.exponentialRampToValueAtTime(40,t+1.2),p.gain.setValueAtTime(1e-4,t+.8),p.gain.exponentialRampToValueAtTime(.35,t+.82),p.gain.exponentialRampToValueAtTime(1e-4,t+1.3),h.connect(p).connect(this.sfxGain),h.start(t+.8),h.stop(t+1.3)}}const Vn=new bx;var Se=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(Se||{}),Gt=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Gt||{}),gn=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(gn||{}),Ri=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(Ri||{});const rp=[{id:1,name:"光束机枪",type:gn.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:Ri.FreeFire,smartRadius:60},{id:2,name:"追踪导弹",type:gn.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:Ri.LockRequired,smartRadius:95},{id:3,name:"光束加农",type:gn.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:Ri.LockRequired,smartRadius:80},{id:4,name:"散射弹幕",type:gn.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:Ri.FreeFire,smartRadius:110},{id:5,name:"狙击光束",type:gn.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:Ri.LockRequired,smartRadius:45},{id:6,name:"浮游炮",type:gn.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:Ri.LockShortRange,smartRadius:130}];function Hs(r){return rp.find(t=>t.id===r)||rp[0]}const Dv=[{type:Se.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:Se.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:Se.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:Se.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:Se.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:Se.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function Zc(r){return Dv.find(t=>t.type===r)||Dv[0]}function Wi(r,t,n,a,l){return{hpPercent:r,speed:t,attacks:n,minionSpawn:a,attackPattern:l}}const Uv=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[Wi(1,5,["弹幕散布"],!0,"spread"),Wi(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),Wi(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[Wi(1,12,["高速突进"],!1,"rush"),Wi(.6,15,["高速突进","分身攻击"],!0,"clone"),Wi(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[Wi(1,4,["多重导弹"],!1,"missile"),Wi(.75,6,["多重导弹","力场护盾"],!1,"shield"),Wi(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),Wi(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function hd(r){return Uv.find(t=>t.id===r)||Uv[0]}function We(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function we(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function ge(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function Ax(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function mn(r,t){return Ax(we(r,t))}function Te(r){const t=Ax(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function O2(r,t,n){return r+(t-r)*n}function ti(r,t,n){return Math.max(t,Math.min(n,r))}function Gr(r,t){return r+Math.random()*(t-r)}function P2(r,t){return Math.floor(Gr(r,t+1))}let Rx=1;function Ti(){return Rx++}const z2=4,B2=1.5,Lv=3,dd=.6,Nv=2.5,I2=6,F2=60,G2=4;class H2{constructor(t){Rt(this,"scene");Rt(this,"input");Rt(this,"audio");Rt(this,"canvas");Rt(this,"players",[]);Rt(this,"enemies",[]);Rt(this,"projectiles",[]);Rt(this,"particles",[]);Rt(this,"active",!1);Rt(this,"velocities",[]);Rt(this,"fireTimers",[]);Rt(this,"dodgeTimer",0);Rt(this,"dodgeCooldown",0);Rt(this,"accumulator",0);Rt(this,"lastTime",0);Rt(this,"animFrameId",0);Rt(this,"enemySpawnTimer",0);Rt(this,"waveTimer",0);Rt(this,"levelSpawned",0);Rt(this,"bossCount",0);Rt(this,"currentBossIndex",-1);Rt(this,"bossPhase",1);Rt(this,"bossAttackTimer",0);Rt(this,"bossSweepAngle",0);Rt(this,"bossNetAngle",0);Rt(this,"comboTimeout",[0]);Rt(this,"lockTargetId",null);Rt(this,"lockOn",!1);Rt(this,"enemyLastPos",new Map);Rt(this,"enemyVels",new Map);Rt(this,"brakePitch",0);Rt(this,"cameraStiffness",_d);Rt(this,"cameraShake",0);Rt(this,"firstKillDone",!1);Rt(this,"lastLoopError",0);Rt(this,"enemyOutlineRef",null);Rt(this,"gameLoop",t=>{if(this.active){this.animFrameId=requestAnimationFrame(this.gameLoop);try{const n=Math.min((t-this.lastTime)/1e3,.05);this.lastTime=t;const a=Ye.getState().game.timeDilationUntil,c=t<a?n*.3:n;for(this.accumulator+=c;this.accumulator>=Rh;)this.update(Rh),this.accumulator-=Rh;this.render(n)}catch(n){Date.now()-this.lastLoopError>1e3&&(this.lastLoopError=Date.now(),console.error("[gameLoop]",n))}}});this.canvas=t,this.scene=new R2(t,t.width,t.height),this.input=new w2(0),this.input.setCanvasSize(t.width,t.height),this.audio=new bx}start(){const t=Ye.getState();this.players=t.players.map(n=>({...n})),this.velocities=this.players.map(()=>({x:0,y:0,z:0})),this.fireTimers=this.players.map(()=>0),this.dodgeTimer=0,this.dodgeCooldown=0,this.enemies=[],this.projectiles=[],this.particles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0,this.enemySpawnTimer=0,this.waveTimer=0,this.lockOn=!1,this.lockTargetId=null,this.enemyLastPos.clear(),this.enemyVels.clear(),this.active=!0,this.lastTime=performance.now(),this.accumulator=0,this.firstKillDone=!1,this.cameraShake=0,Rx=1,this.players.forEach((n,a)=>{const l=a===0?new ue(4491519):new ue(16737860),c=this.scene.createPlayerMesh(l);c.position.set(n.pos.x,n.pos.y,n.pos.z),this.scene.playerMeshes.set(n.id,c),this.scene.scene.add(c);const f=this.scene.createOutline(c,"#4488ff");f.name="self-outline",c.add(f)}),Vn.init(),Vn.startBGM(),Vn.playIntroSting(),t.setGame({introActive:!0}),this.scene.startIntro(this.players[0].pos,()=>{Ye.getState().setGame({introActive:!1})}),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),Vn.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,n){this.scene.resize(t,n),this.input.setCanvasSize(t,n)}update(t){if(Ye.getState().game.introActive){this.input.getState();return}const l=[this.input.getState()];this.updatePlayers(t,l),this.updateEnemies(t),this.updateProjectiles(t),this.updateParticles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateUI(t),this.updateBoss(t)}updatePlayers(t,n){this.players.forEach((a,l)=>{if(!a.alive)return;const c=n[l],f=this.scene.playerMeshes.get(a.id);if(!f)return;const h=Ye.getState().game;for(const V of rp)h.wave>=V.unlockLevel&&!a.weapons.includes(V.id)&&a.weapons.push(V.id);(a.weapon===0||!a.weapons.includes(a.weapon))&&(a.weapon=a.weapons[0]);const p=this.velocities[l],m=(c.right?1:0)-(c.left?1:0),g=(c.up?1:0)-(c.down?1:0),_=(c.forward?1:0)-(c.backward?1:0),x=Math.sqrt(m*m+g*g+_*_),M=c.boost&&a.energy>0,E=M?eM:1,T=a.speed*E,S=c.brake?rM:sM;M?a.energy=Math.max(0,a.energy-KS*t):a.energy=Math.min(a.maxEnergy,a.energy+a.maxEnergy*.25*t),this.updateLock(c,a);const v=this.computeCrosshairDir(a),U={x:-v.z,z:v.x},D=(V,k,xt)=>({x:xt*v.x+V*U.x,y:k,z:xt*v.z+V*U.z});if(this.dodgeCooldown-=t,c.dodge&&this.dodgeCooldown<=0&&(this.dodgeTimer=mM,this.dodgeCooldown=gM,a.invulnTimer=Math.max(a.invulnTimer,_M),Vn.playDodge()),this.dodgeTimer>0){this.dodgeTimer-=t;let V=0,k=0,xt=0;if(x>.001){const St=1/x,O=D(m,g,_);V=O.x*St,k=O.y*St,xt=O.z*St}else{const St=this.computeAimDir(a);V=St.x,k=St.y,xt=St.z}p.x=V*a.speed*Lh,p.y=k*a.speed*Lh,p.z=xt*a.speed*Lh,a.pos.x+=p.x*t,a.pos.y+=p.y*t,a.pos.z+=p.z*t}else{let V=0,k=0,xt=0;if(x>.001){const nt=1/x,yt=D(m,g,_);V=yt.x*T*nt,k=yt.y*T*nt,xt=yt.z*T*nt}const St=1-Math.exp(-S*t);p.x+=(V-p.x)*St,p.y+=(k-p.y)*St,p.z+=(xt-p.z)*St;const O=Math.exp(-1.2*t);p.x*=O,p.y*=O,p.z*=O,a.pos.x+=p.x*t,a.pos.y+=p.y*t,a.pos.z+=p.z*t}this.scene.updateThrusters(a.id,x,c.boost),a.pos.x=ti(a.pos.x,-Ja,Ja),a.pos.y=ti(a.pos.y,-Tr,Tr),a.pos.z=ti(a.pos.z,-Ja,Ja),c.brake?(this.brakePitch=Math.min(1,this.brakePitch+t/lM),this.cameraStiffness=aM):(this.brakePitch=Math.max(0,this.brakePitch-t/cM),this.cameraStiffness=_d);let q=Math.atan2(v.x,v.z)-a.rot.y;for(;q>Math.PI;)q-=Math.PI*2;for(;q<-Math.PI;)q+=Math.PI*2;a.rot.y+=ti(q,-v_*t,v_*t);const P=-Math.asin(ti(v.y,-1,1))-a.rot.x;a.rot.x+=ti(P,-x_*t,x_*t);const G=ti(p.x/T,-1,1)*.35;a.rot.z=O2(a.rot.z,G,.15);const L=Math.sin(performance.now()*.001*fM)*uM;f.position.set(a.pos.x,a.pos.y+L,a.pos.z),f.rotation.set(a.rot.x+oM*this.brakePitch,a.rot.y,a.rot.z);const R=c.boost&&a.energy>0,F=performance.now()*.001,et=.85+.15*Math.sin(F*12+Math.sin(F*7)*2),st=R?2.2:x>.001?1.3:.8,ht=R?.55:1,pt=R?.85:.67,z=R?1:.27;f.children.forEach(V=>{if(V.name==="thruster"){V.scale.y=st*et;const k=V.material;k.color.setRGB(ht,pt,z),k.opacity=R?.95*et:.8*et}}),this.fireTimers[l]-=t,c.shoot&&this.fireTimers[l]<=0&&(this.playerShoot(a,l),this.fireTimers[l]=Hs(a.weapon).fireRate),c.weaponSwitch>0&&a.weapons.includes(c.weaponSwitch)&&(a.weapon=c.weaponSwitch),a.invulnTimer>0&&(a.invulnTimer-=t),a.specialGauge=Math.min(a.specialGauge+t*2,a.maxSpecialGauge),c.special&&a.specialGauge>=100&&(this.useSpecial(a,l),a.specialGauge=0),a.combo>0&&(this.comboTimeout[l]-=t,this.comboTimeout[l]<=0&&(a.combo=0))})}worldToScreen(t){const n=this.scene.camera,a=n.matrixWorldInverse.elements,l=n.projectionMatrix.elements,c=t.x,f=t.y,h=t.z,p=a[0]*c+a[4]*f+a[8]*h+a[12],m=a[1]*c+a[5]*f+a[9]*h+a[13],g=a[2]*c+a[6]*f+a[10]*h+a[14],_=a[3]*c+a[7]*f+a[11]*h+a[15],x=l[0]*p+l[4]*m+l[8]*g+l[12]*_,M=l[1]*p+l[5]*m+l[9]*g+l[13]*_;l[2]*p+l[6]*m+l[10]*g+l[14]*_;const E=l[3]*p+l[7]*m+l[11]*g+l[15]*_;if(E<=0)return null;const T=x/E,S=M/E;return Math.abs(T)>1.2||Math.abs(S)>1.2?null:{x:(T*.5+.5)*this.canvas.width,y:(-S*.5+.5)*this.canvas.height}}updateLock(t,n){if(t.lockToggle&&(this.lockOn=!this.lockOn,Ye.getState().setGame({lockOn:this.lockOn}),this.lockOn||(this.lockTargetId=null)),!this.lockOn){this.lockTargetId=null,this.input.setAimNorm(this.input.getRawMouseNormX(),this.input.getRawMouseNormY());return}const a=this.lockTargetId!==null?this.enemies.find(h=>h.id===this.lockTargetId&&h.hp>0):null;if(!a||mn(a.pos,n.pos)>Dh){let h=null,p=Dh;for(const m of this.enemies){if(m.hp<=0)continue;const g=mn(n.pos,m.pos);g<p&&(p=g,h=m)}this.lockTargetId=h?h.id:null}let l=this.input.getRawMouseNormX(),c=this.input.getRawMouseNormY();const f=this.lockTargetId!==null?this.enemies.find(h=>h.id===this.lockTargetId&&h.hp>0):null;if(f){const h=this.worldToScreen(f.pos);if(h){const p=mn(n.pos,f.pos),m=iM*Math.max(0,1-p/Dh),g=ti(h.x/this.canvas.width,0,1),_=ti(h.y/this.canvas.height,0,1);l=l+(g-l)*m,c=c+(_-c)*m}}this.input.setAimNorm(l,c)}getLockEnemy(t){return!this.lockOn||this.lockTargetId===null?null:this.enemies.find(n=>n.id===this.lockTargetId&&n.hp>0)||null}renderLockVisuals(t,n){const a=this.getLockEnemy(t);if(a){const c=Hs(t.weapon),f=Math.max(c.lockRange,Ch),h=mn(a.pos,t.pos)<=f?"#00ff88":"#ff4444";this.scene.updateLockIndicator(t.id,t.pos,a.pos,h)}else this.scene.updateLockIndicator(t.id,t.pos,null);const l=a?this.scene.enemyMeshes.get(a.id):null;if(l&&a){if(!this.enemyOutlineRef||this.enemyOutlineRef.enemyId!==a.id){this.enemyOutlineRef&&this.enemyOutlineRef.parent.remove(this.enemyOutlineRef.group);const f=this.scene.createOutline(l,"#ff5a3c");l.add(f),this.enemyOutlineRef={enemyId:a.id,parent:l,group:f}}const c=.35+.2*Math.sin(performance.now()*.001*Math.PI*6);this.enemyOutlineRef.group.children.forEach(f=>{if(!(f instanceof ln))return;const h=f.material;!h||Array.isArray(h)||(h.opacity=c)}),this.enemyOutlineRef.group.visible=!0}else this.enemyOutlineRef&&(this.enemyOutlineRef.group.visible=!1)}computeAimDir(t){const n=this.scene.camera,a=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new J(0,0,-1).applyQuaternion(n.quaternion),f=new J(1,0,0).applyQuaternion(n.quaternion),h=new J(0,1,0).applyQuaternion(n.quaternion),p=Math.tan(n.fov*Math.PI/360),m=new J().addScaledVector(c,1).addScaledVector(f,a*p*n.aspect).addScaledVector(h,l*p).normalize();let g=1/0,_=null;for(const x of this.enemies){if(x.hp<=0)continue;const M=x.type===Se.Boss?4:1.5,E=n.position.x-x.pos.x,T=n.position.y-x.pos.y,S=n.position.z-x.pos.z,v=E*m.x+T*m.y+S*m.z,U=E*E+T*T+S*S-M*M,D=v*v-U;if(D<0)continue;const w=-v-Math.sqrt(D);w>=0&&w<g&&(g=w,_=x)}return _?Te(we(_.pos,t.pos)):this.computeCrosshairDir(t)}computeCrosshairDir(t){const n=this.scene.camera,a=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new J(0,0,-1).applyQuaternion(n.quaternion),f=new J(1,0,0).applyQuaternion(n.quaternion),h=new J(0,1,0).applyQuaternion(n.quaternion),p=Math.tan(n.fov*Math.PI/360),m=new J().addScaledVector(c,1).addScaledVector(f,a*p*n.aspect).addScaledVector(h,l*p).normalize(),g=120,_=new J(n.position.x+m.x*g,t.pos.y,n.position.z+m.z*g);return Te({x:_.x-t.pos.x,y:_.y-t.pos.y,z:_.z-t.pos.z})}pickSmartTarget(t){const a=Hs(t.weapon).smartRadius,l=this.input.getMouseNormX()*this.canvas.width,c=this.input.getMouseNormY()*this.canvas.height;let f=null,h=1/0;for(const p of this.enemies){if(p.hp<=0)continue;const m=this.worldToScreen(p.pos);if(!m)continue;const g=m.x-l,_=m.y-c;if(g*g+_*_>a*a)continue;const x=mn(t.pos,p.pos);x<h&&(h=x,f=p)}return f}computeLeadDir(t,n,a){const l=this.enemyVels.get(n.id)||{x:0,y:0,z:0},c=a>.001?mn(t.pos,n.pos)/a:0;let f=We(n.pos,ge(l,c));const h=mn(t.pos,f);return a>.001&&h>.001&&(f=We(n.pos,ge(l,h/a))),Te(we(f,t.pos))}getLeadScreenPoint(){if(!this.lockOn||this.lockTargetId===null)return null;const t=this.players[0];if(!t)return null;const n=this.enemies.find(g=>g.id===this.lockTargetId&&g.hp>0);if(!n)return null;const a=Hs(t.weapon),l=Math.max(a.lockRange,Ch);if(mn(n.pos,t.pos)>l)return null;const c=this.enemyVels.get(n.id)||{x:0,y:0,z:0},f=a.speed;let h=f>.001?mn(t.pos,n.pos)/f:0,p=We(n.pos,ge(c,h));const m=mn(t.pos,p);return f>.001&&m>.001&&(p=We(n.pos,ge(c,m/f))),this.worldToScreen(p)}playerShoot(t,n){const a=Hs(t.weapon);if(!this.scene.playerMeshes.get(t.id))return;const c=this.lockOn?this.lockTargetId:null,f=c!==null?this.enemies.find(M=>M.id===c&&M.hp>0):null,h=f?mn(f.pos,t.pos):1/0,p=Math.max(a.lockRange,Ch),m=f!==null&&h<=p;if(a.fireMode===Ri.LockRequired&&!m)return;let g;const _=f&&m?f:this.pickSmartTarget(t);_?g=this.computeLeadDir(t,_,a.speed):g=this.computeAimDir(t);const x=a.fireMode===Ri.LockShortRange&&m;if(a.type===gn.Funnel)for(let M=0;M<Lv;M++){const E={id:Ti(),pos:{...t.pos},vel:{x:0,y:0,z:0},damage:a.damage,owner:t.id,type:gn.Funnel,lifetime:G2,radius:.3,color:a.color,phase:"orbit",phaseTimer:dd,orbitAngle:M/Lv*Math.PI*2};if(this.projectiles.length<wh){this.projectiles.push(E);const T=this.scene.createProjectileMesh(a.color,a.type);T.position.set(E.pos.x,E.pos.y,E.pos.z),this.scene.projectileMeshes.set(E.id,T),this.scene.scene.add(T)}}else for(let M=0;M<(a.type===gn.Spread?5:1);M++){const E=a.spread*(Math.random()-.5)*2,T=Te(We(g,{x:E,y:E*.5,z:0})),S={id:Ti(),pos:{...t.pos},vel:ge(T,a.speed),damage:a.damage,owner:t.id,type:a.type,lifetime:3,radius:.3,color:a.color};if(x&&f&&(S.vel=ge(Te(we(f.pos,t.pos)),a.speed)),this.projectiles.length<wh){this.projectiles.push(S);const v=this.scene.createProjectileMesh(a.color,a.type);v.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,v),this.scene.scene.add(v)}}Vn.playShoot(600+Math.random()*400)}useSpecial(t,n){Vn.playSpecial(),Vn.playSpecialAnnounce(),this.enemies.forEach(a=>{mn(a.pos,t.pos)<50&&(a.hp-=150,this.scene.createExplosion(a.pos,"#00ffff",2))})}updateEnemies(t){this.enemies.forEach(n=>{if(n.hp<=0){this.scene.createExplosion(n.pos,n.type===Se.Boss?"#ff4400":"#ff6644",n.type===Se.Boss?3:1),Vn.playExplosion(),this.enemyLastPos.delete(n.id),this.enemyVels.delete(n.id),this.firstKillDone||(this.firstKillDone=!0,Ye.getState().triggerEdgePulse(),Ye.getState().triggerTimeDilation(.2),Vn.playGlitch(),this.cameraShake=.25),this.players.forEach((p,m)=>{const g=n.type===Se.Boss?hd(this.currentBossIndex+1).score:Zc(n.type).score;p.score+=g,p.kills++,p.combo++,this.comboTimeout[m]=nM});return}const a=n.type===Se.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);if(!a)return;const l=this.players.find(p=>p.alive);if(!l)return;const c=mn(n.pos,l.pos),f=Zc(n.type);switch(n.type){case Se.Scout:this.updateAIScout(n,l,c,f,t);break;case Se.Assault:this.updateAIAssault(n,l,c,f,t);break;case Se.Sniper:this.updateAISniper(n,l,c,f,t);break;case Se.Shield:this.updateAIShield(n,l,c,f,t);break;case Se.Bomber:this.updateAIBomber(n,l,c,f,t);break;case Se.Commander:this.updateAICommander(n,l,c,f,t);break;default:this.updateAIDefault(n,l,c,f,t)}if(n.state===Gt.Patrol&&n.type!==Se.Boss){const p=Te(we(l.pos,n.pos));n.pos=We(n.pos,ge(p,n.speed*.4*t))}n.state===Gt.Flee&&n.fleeTimer!==void 0&&(n.fleeTimer-=t,n.fleeTimer<=0&&(n.state=Gt.Chase)),n.hp<f.hp*.3&&n.type!==Se.Boss&&n.type!==Se.Bomber&&n.state!==Gt.Flee&&n.fleeTimer===void 0&&(n.state=Gt.Flee,n.fleeTimer=pM),n.pos.x=ti(n.pos.x,-Ja,Ja),n.pos.y=ti(n.pos.y,-Tr,Tr),n.pos.z=ti(n.pos.z,-Ja,Ja);const h=this.enemyLastPos.get(n.id);h?this.enemyVels.set(n.id,ge(we(n.pos,h),1/Math.max(t,1e-4))):this.enemyVels.set(n.id,{x:0,y:0,z:0}),this.enemyLastPos.set(n.id,{x:n.pos.x,y:n.pos.y,z:n.pos.z}),a.position.set(n.pos.x,n.pos.y,n.pos.z),a.rotation.y+=t*2,n.type===Se.Boss&&(a.rotation.x+=t*.5)}),this.enemies=this.enemies.filter(n=>{if(n.hp<=0){const a=n.type===Se.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);return a&&(this.scene.scene.remove(a),this.scene.enemyMeshes.delete(n.id),this.scene.bossMeshes.delete(n.id)),!1}return!0})}enemyShoot(t,n){const a=Te(we(n.pos,t.pos)),l=Zc(t.type),c={id:Ti(),pos:{...t.pos},vel:ge(a,25),damage:l.damage,owner:t.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:l.color};if(this.projectiles.length<wh){this.projectiles.push(c);const f=this.scene.createProjectileMesh(l.color,"bullet");f.position.set(c.pos.x,c.pos.y,c.pos.z),this.scene.projectileMeshes.set(c.id,f),this.scene.scene.add(f)}}updateAIDefault(t,n,a,l,c){switch(t.state){case Gt.Patrol:a<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(a<l.attackRange)t.state=Gt.Attack;else if(a>l.alertRange*1.5)t.state=Gt.Patrol;else{const h=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(h,t.speed*c))}break;case Gt.Attack:a>l.attackRange*1.2&&(t.state=Gt.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.8+Math.random()*.6);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const f=Te(we(t.pos,n.pos));t.pos=We(t.pos,ge(f,t.speed*1.5*c));break}}updateAIScout(t,n,a,l,c){switch(t.state){case Gt.Patrol:a<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(a<l.attackRange)t.state=Gt.Attack;else if(a>l.alertRange*1.5)t.state=Gt.Patrol;else{const m=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(m,t.speed*c))}break;case Gt.Attack:a>l.attackRange*1.3&&(t.state=Gt.Chase);const f=Te(we(t.pos,n.pos)),h={x:-f.z,y:0,z:f.x};t.pos=We(t.pos,ge(h,t.speed*.8*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.5+Math.random()*.5);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const p=Te(we(t.pos,n.pos));t.pos=We(t.pos,ge(p,t.speed*1.5*c));break}}updateAIAssault(t,n,a,l,c){switch(t.state){case Gt.Patrol:a<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:const f=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(f,t.speed*c)),a<l.attackRange&&(t.state=Gt.Attack);break;case Gt.Attack:const h=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(h,t.speed*.5*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.3+Math.random()*.3),a>l.attackRange*1.5&&(t.state=Gt.Chase);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const p=Te(we(t.pos,n.pos));t.pos=We(t.pos,ge(p,t.speed*1.5*c));break}}updateAISniper(t,n,a,l,c){switch(t.state){case Gt.Patrol:a<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(a<l.attackRange)t.state=Gt.Attack;else{const h=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(h,t.speed*c))}break;case Gt.Attack:if(a<l.attackRange*.5){const h=Te(we(t.pos,n.pos));t.pos=We(t.pos,ge(h,t.speed*c))}else a>l.attackRange*1.2&&(t.state=Gt.Chase);t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1+Math.random()*.5);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const f=Te(we(t.pos,n.pos));t.pos=We(t.pos,ge(f,t.speed*1.5*c));break}}updateAIShield(t,n,a,l,c){switch(t.state){case Gt.Patrol:a<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(a<l.attackRange)t.state=Gt.Attack;else if(a>l.alertRange*1.5)t.state=Gt.Patrol;else{const p=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(p,t.speed*c))}break;case Gt.Attack:const f=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(f,t.speed*.3*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1.2+Math.random()*.8),a>l.attackRange*1.5&&(t.state=Gt.Chase);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const h=Te(we(t.pos,n.pos));t.pos=We(t.pos,ge(h,t.speed*1.5*c));break}}updateAIBomber(t,n,a,l,c){switch(t.state){case Gt.Patrol:a<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:case Gt.Attack:const f=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(f,t.speed*c));break}a<3&&(this.scene.createExplosion(t.pos,"#ff4400",2),Vn.playExplosion(),n.hp-=l.damage,n.invulnTimer=g_,t.hp=0)}updateAICommander(t,n,a,l,c){switch(this.enemies.forEach(f=>{if(f.id===t.id||f.hp<=0)return;mn(t.pos,f.pos)<30&&(f.speed=l.speed*1.3)}),t.state){case Gt.Patrol:a<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(a<l.attackRange)t.state=Gt.Attack;else if(a>l.alertRange*1.5)t.state=Gt.Patrol;else{const h=Te(we(n.pos,t.pos));t.pos=We(t.pos,ge(h,t.speed*c))}break;case Gt.Attack:a>l.attackRange*1.2&&(t.state=Gt.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.6+Math.random()*.4);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const f=Te(we(t.pos,n.pos));t.pos=We(t.pos,ge(f,t.speed*1.5*c));break}}updateProjectiles(t){this.projectiles.forEach(n=>{n.type===gn.Missile?this.steerMissile(n,t):n.type===gn.Funnel&&this.updateFunnel(n,t),n.pos=We(n.pos,ge(n.vel,t)),n.lifetime-=t;const a=this.scene.projectileMeshes.get(n.id);a&&(a.position.set(n.pos.x,n.pos.y,n.pos.z),n.type===gn.Missile&&(a.rotation.x+=t*5))}),this.projectiles=this.projectiles.filter(n=>{if(n.lifetime<=0){const a=this.scene.projectileMeshes.get(n.id);return a&&(this.scene.scene.remove(a),this.scene.projectileMeshes.delete(n.id)),!1}return!0})}steerMissile(t,n){const a=t.owner>=1e4,l=(a?B2:z2)*n;let c=null;if(a){let S=null,v=1/0;for(const U of this.players){if(!U.alive)continue;const D=mn(t.pos,U.pos);D<v&&(v=D,S=U)}S&&(c=Te(we(S.pos,t.pos)))}else{let S=null;const v=this.lockOn?this.lockTargetId:null;if(v!=null){const U=this.enemies.find(D=>D.id===v&&D.hp>0);U&&(S=U)}if(!S){let U=1/0;for(const D of this.enemies){if(D.hp<=0)continue;const w=mn(t.pos,D.pos);w<U&&(U=w,S=D)}}S&&(c=Te(we(S.pos,t.pos)))}if(!c)return;const f=Math.sqrt(t.vel.x*t.vel.x+t.vel.y*t.vel.y+t.vel.z*t.vel.z);if(f<1e-4)return;const h=Te(t.vel),p=ti(h.x*c.x+h.y*c.y+h.z*c.z,-1,1),m=Math.acos(p);if(m<=l||m<1e-6){t.vel=ge(c,f);return}let g=h.y*c.z-h.z*c.y,_=h.z*c.x-h.x*c.z,x=h.x*c.y-h.y*c.x;const M=Math.sqrt(g*g+_*_+x*x);if(M<1e-6){const S=Math.abs(h.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};g=h.y*S.z-h.z*S.y,_=h.z*S.x-h.x*S.z,x=h.x*S.y-h.y*S.x}else g/=M,_/=M,x/=M;const E=Math.cos(l),T=Math.sin(l);t.vel={x:(h.x*E+(_*h.z-x*h.y)*T)*f,y:(h.y*E+(x*h.x-g*h.z)*T)*f,z:(h.z*E+(g*h.y-_*h.x)*T)*f}}updateFunnel(t,n){const a=this.players.find(l=>l.id===t.owner);if(!(!a||!a.alive)&&t.phase!=="strike"){t.phaseTimer=(t.phaseTimer??dd)-n;const l=(t.orbitAngle??0)+I2*n;if(t.orbitAngle=l,t.pos={x:a.pos.x+Math.cos(l)*Nv,y:a.pos.y+Math.sin(l*3)*.6,z:a.pos.z+Math.sin(l)*Nv},t.vel={x:0,y:0,z:0},t.phaseTimer<=0){let c=null,f=1/0;for(const h of this.enemies){if(h.hp<=0)continue;const p=mn(t.pos,h.pos);p<f&&(f=p,c=h)}c?(t.phase="strike",t.vel=ge(Te(we(c.pos,t.pos)),F2)):(t.phase="orbit",t.phaseTimer=dd)}}}updateParticles(t){}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(n=>{const a=n.type===Se.Boss?4:1.5;mn(t.pos,n.pos)<a&&(n.hp-=(n.shieldTimer||0)>0?t.damage*.5:t.damage,t.lifetime=0,this.scene.createExplosion(t.pos,"#ffaa00",.5),Vn.playHit())})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(n=>{!n.alive||n.invulnTimer>0||mn(t.pos,n.pos)<$S&&(n.hp-=t.damage,t.lifetime=0,n.invulnTimer=g_,this.cameraShake=.15,this.scene.createExplosion(t.pos,"#ff4444",.5),Vn.playHit(),n.hp<=0&&(n.alive=!1,this.scene.createExplosion(n.pos,"#4488ff",3)))})})}spawnEnemies(t){const n=Ye.getState(),a=n.game;if(a.wave<1){this.levelSpawned=0,this.enemySpawnTimer=0,this.waveTimer=0,n.setGame({wave:1});return}if(this.waveTimer>0){this.waveTimer-=t;return}const l=a.wave%tM===0;if(l&&!this.enemies.some(m=>m.type===Se.Boss)&&this.currentBossIndex<0){this.spawnBoss();return}const c=l?0:Math.min(6+a.wave,__);if(this.enemySpawnTimer+=t,this.levelSpawned<c&&this.enemies.length<__&&this.enemySpawnTimer>=.15){this.enemySpawnTimer=0;const m=[Se.Scout,Se.Assault,Se.Shield];a.wave>2&&m.push(Se.Sniper),a.wave>3&&m.push(Se.Bomber),a.wave>4&&m.push(Se.Commander);const g=m[P2(0,m.length-1)],_=Zc(g);let x;do{const T=Gr(30,Math.min(_.alertRange+25,80)),S=Math.random()*Math.PI*2,v=Gr(-.5,.5);x={x:this.players[0].pos.x+Math.sin(S)*T,y:ti(this.players[0].pos.y+Math.sin(v)*T,-Tr*.5,Tr*.5),z:this.players[0].pos.z+Math.cos(S)*T}}while(this.players.some(T=>mn(x,T.pos)<20));const M={id:Ti(),type:g,pos:x,rot:{x:0,y:0,z:0},hp:_.hp*(1+a.wave*.1),maxHp:_.hp,speed:_.speed*(1+a.wave*.05),state:Gt.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(M);const E=this.scene.createEnemyMesh(new ue(_.color),_.size,g);E.position.set(x.x,x.y,x.z),this.scene.enemyMeshes.set(M.id,E),this.scene.scene.add(E),this.levelSpawned++}const f=this.enemies.some(m=>m.type===Se.Boss),h=this.enemies.some(m=>m.hp>0);(l?this.currentBossIndex>=0&&!f:this.levelSpawned>=c&&!h)&&(this.enemies.forEach(m=>{const g=m.type===Se.Boss?this.scene.bossMeshes.get(m.id):this.scene.enemyMeshes.get(m.id);g&&(this.scene.scene.remove(g),this.scene.enemyMeshes.delete(m.id),this.scene.bossMeshes.delete(m.id))}),this.enemies=[],this.levelSpawned=0,this.enemySpawnTimer=0,this.currentBossIndex=-1,this.waveTimer=2.5,n.setGame({wave:a.wave+1}))}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0;const n=hd(t+1),a={x:Gr(-30,30),y:5,z:-50},l={id:Ti(),type:Se.Boss,pos:a,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Gt.Phase1,targetId:0,attackTimer:2,phase:1,shieldTimer:0};this.enemies.push(l);const c=this.scene.createBossMesh(new ue(n.color),n.size);c.position.set(a.x,a.y,a.z),this.scene.bossMeshes.set(l.id,c),this.scene.scene.add(c),Vn.playBossWarning(),Vn.playBossAnnounce(n.name),Ye.getState().setGame({bossFight:!0,bossName:n.name})}updateBoss(t){const n=this.enemies.find(f=>f.type===Se.Boss);if(!n){Ye.getState().game.bossFight&&Ye.getState().setGame({bossFight:!1,bossName:""});return}const a=hd(this.currentBossIndex+1),l=n.hp/n.maxHp;if(a.phases.forEach((f,h)=>{l<=f.hpPercent&&(n.phase||1)<=h&&(n.phase=h+1,n.speed=f.speed,n.state=["phase1","phase2","phase3","phase4"][h])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(m=>m.alive);if(!f)return;const h=a.phases[(n.phase||1)-1];switch(h.attackPattern){case"spread":for(let g=0;g<12;g++){const _=g/12*Math.PI*2,x={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:Ti(),pos:{...n.pos},vel:ge(x,10),damage:5,owner:n.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:"#ff4444"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff4444","bullet");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"laser":case"finalBeam":{const g=Te(we(f.pos,n.pos)),_={id:Ti(),pos:{...n.pos},vel:ge(g,30),damage:25,owner:n.id+1e4,type:gn.Laser,lifetime:2,radius:.5,color:"#ff0000"};this.projectiles.push(_);const x=this.scene.createProjectileMesh("#ff0000","beam");x.position.set(_.pos.x,_.pos.y,_.pos.z),x.scale.set(1,1,3),this.scene.projectileMeshes.set(_.id,x),this.scene.scene.add(x);break}case"missile":for(let g=0;g<5;g++){const _=Te(we(f.pos,n.pos)),x={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2},M={id:Ti(),pos:{...n.pos},vel:ge(We(_,x),8),damage:10,owner:n.id+1e4,type:gn.Missile,lifetime:5,radius:.4,color:"#ffaa00"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ffaa00","missile");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"rush":n.speed=20;const m=Te(we(f.pos,n.pos));n.pos=We(n.pos,ge(m,n.speed*t));break;case"clone":{const g=Te(we(f.pos,n.pos)),_=Math.atan2(g.z,g.x);for(let x=-2;x<=2;x++){const M=_+x*.6,E=Te({x:Math.cos(M),y:g.y,z:Math.sin(M)}),T={id:Ti(),pos:{...n.pos},vel:ge(E,16),damage:8,owner:n.id+1e4,type:gn.BossBullet,lifetime:3.5,radius:.3,color:"#ff00ff"};this.projectiles.push(T);const S=this.scene.createProjectileMesh("#ff00ff","bullet");S.position.set(T.pos.x,T.pos.y,T.pos.z),this.scene.projectileMeshes.set(T.id,S),this.scene.scene.add(S)}break}case"fullLaser":{for(let g=0;g<6;g++){const _=this.bossSweepAngle+g/6*Math.PI*2,x={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:Ti(),pos:{...n.pos},vel:ge(x,26),damage:15,owner:n.id+1e4,type:gn.Laser,lifetime:2.2,radius:.5,color:"#ff00ff"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff00ff","beam");E.position.set(M.pos.x,M.pos.y,M.pos.z),E.scale.set(1,1,3),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}this.bossSweepAngle+=Math.PI/8;break}case"shield":n.shieldTimer=Math.max(n.shieldTimer||0,4);break;case"laserNet":{const g=Te(we(f.pos,n.pos)),_=Math.atan2(g.z,g.x)+this.bossNetAngle;for(let x=0;x<9;x++){const M=x/8-.5,E=_+M*Math.PI*.66,T={x:Math.cos(E),y:0,z:Math.sin(E)},S={id:Ti(),pos:{...n.pos},vel:ge(T,25),damage:12,owner:n.id+1e4,type:gn.Laser,lifetime:2.5,radius:.4,color:"#ffaa00"};this.projectiles.push(S);const v=this.scene.createProjectileMesh("#ffaa00","beam");v.position.set(S.pos.x,S.pos.y,S.pos.z),v.scale.set(1,1,3),this.scene.projectileMeshes.set(S.id,v),this.scene.scene.add(v)}this.bossNetAngle+=Math.PI/9;break}case"spawn":if(h.minionSpawn)for(let g=0;g<3;g++){const _={id:Ti(),type:Se.Scout,pos:{x:n.pos.x+Gr(-5,5),y:0,z:n.pos.z+Gr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Gt.Chase,targetId:0,attackTimer:1};this.enemies.push(_);const x=this.scene.createEnemyMesh(new ue(4500223),1,"scout");x.position.set(_.pos.x,_.pos.y,_.pos.z),this.scene.enemyMeshes.set(_.id,x),this.scene.scene.add(x)}break}}const c=this.players.find(f=>f.alive);if(c){const f=a.phases[(n.phase||1)-1],h=Te(we(c.pos,n.pos));n.pos=We(n.pos,ge(h,(f?f.speed:n.speed)*t))}(n.shieldTimer||0)>0&&(n.shieldTimer=Math.max(0,(n.shieldTimer||0)-t))}updateUI(t){const n=Ye.getState(),a=n.game;!this.players[0].alive&&!a.gameOver&&(n.setGame({gameOver:!0,screen:"result"}),this.stop()),n.setPlayers(this.players),n.setGame({score:this.players.reduce((l,c)=>l+c.score,0),time:a.time+t})}render(t){const n=Ye.getState().game.introActive;this.players.forEach((a,l)=>{const c=this.computeCrosshairDir(a);n||this.scene.updateCamera(a.pos,t,Math.atan2(c.x,c.z),this.cameraStiffness);const f=this.velocities[l],h=Math.min(1,Math.hypot(f.x,f.y,f.z)/a.speed);if(this.scene.setSpeedRatio(h),this.cameraShake>0){const p=this.scene.camera,m=this.cameraShake*2.5;p.position.x+=(Math.random()-.5)*m,p.position.y+=(Math.random()-.5)*m,this.cameraShake-=t}this.renderLockVisuals(a,l)}),this.scene.render(t)}}const Ov=["w","W","a","A","s","S","d","D","e","E","z","Z"," ","Tab","1","2","3","4","5","6","Shift","Control","Enter"],V2=()=>{const r=ss.useRef(null),t=ss.useRef(null),n=ss.useRef(null),a=ss.useRef(null),l=ss.useRef(null),c=ss.useRef({x:0,y:0});return ss.useEffect(()=>{const f=r.current;if(!f)return;f.width=window.innerWidth,f.height=window.innerHeight;const h=new H2(f);t.current=h;const p=()=>{f.width=window.innerWidth,f.height=window.innerHeight,h.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",p);const m=()=>{const U=n.current;if(!U)return;const D=h.input.getMouseNormX()*f.width,w=h.input.getMouseNormY()*f.height;U.style.transform=`translate(${D}px, ${w}px) translate(-50%, -50%)`};let g=0;const _=()=>{var q;m();const U=Hs(((q=Ye.getState().players[0])==null?void 0:q.weapon)||1);a.current&&a.current.getAttribute("r")!==String(U.smartRadius)&&a.current.setAttribute("r",String(U.smartRadius));const D=h.getLeadScreenPoint(),w=l.current;w&&(D?(w.style.display="block",w.style.transform=`translate(${D.x}px, ${D.y}px) translate(-50%, -50%)`):w.style.display="none"),g=requestAnimationFrame(_)};g=requestAnimationFrame(_);const x=U=>{(U.ctrlKey||U.metaKey)&&U.preventDefault(),h.input.keyDown(U.key),U.key==="Escape"&&(document.pointerLockElement===f&&document.exitPointerLock(),Ye.getState().setGame({screen:"pause"})),Ov.includes(U.key)&&U.preventDefault()},M=U=>{h.input.keyUp(U.key),Ov.includes(U.key)&&U.preventDefault()},E=U=>{const D=c.current;if(document.pointerLockElement===f)D.x=Math.max(0,Math.min(f.width,D.x+U.movementX)),D.y=Math.max(0,Math.min(f.height,D.y+U.movementY));else{const w=f.getBoundingClientRect();D.x=U.clientX-w.left,D.y=U.clientY-w.top}h.input.mouseMove(D.x,D.y)},T=()=>{h.input.mouseDownFn(),document.pointerLockElement!==f&&f.requestPointerLock()},S=()=>h.input.mouseUpFn();window.addEventListener("keydown",x),window.addEventListener("keyup",M),f.addEventListener("mousemove",E),f.addEventListener("mousedown",T),f.addEventListener("mouseup",S);const v=U=>U.preventDefault();return f.addEventListener("contextmenu",v),h.start(),()=>{h.stop(),cancelAnimationFrame(g),window.removeEventListener("resize",p),window.removeEventListener("keydown",x),window.removeEventListener("keyup",M),f.removeEventListener("mousemove",E),f.removeEventListener("mousedown",T),f.removeEventListener("mouseup",S),f.removeEventListener("contextmenu",v)}},[]),Q.jsxs(Q.Fragment,{children:[Q.jsx("canvas",{ref:r,className:"absolute top-0 left-0 w-full h-full cursor-none"}),Q.jsxs("div",{ref:n,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{transform:"translate(-50%, -50%)"},children:[Q.jsx("svg",{className:"absolute -translate-x-1/2 -translate-y-1/2 overflow-visible",width:"0",height:"0",children:Q.jsx("circle",{ref:a,cx:"0",cy:"0",r:"60",fill:"none",stroke:"#FFEE00",strokeOpacity:"0.35",strokeWidth:"1",strokeDasharray:"5 4"})}),Q.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:[Q.jsx("circle",{cx:"14",cy:"14",r:"10",fill:"none",stroke:"#FFEE00",strokeWidth:"1.5"}),Q.jsx("circle",{cx:"14",cy:"14",r:"1.8",fill:"#FFEE00"})]})]}),Q.jsx("div",{ref:l,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{display:"none",transform:"translate(-50%, -50%)",filter:"drop-shadow(0 0 3px rgba(255,140,66,0.9))"},children:Q.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",children:[Q.jsx("circle",{cx:"7",cy:"7",r:"5",fill:"none",stroke:"#ff8c42",strokeWidth:"1.5"}),Q.jsx("circle",{cx:"7",cy:"7",r:"1.2",fill:"#ff8c42"})]})})]})},k2={[Ri.FreeFire]:"FR",[Ri.LockShortRange]:"SR",[Ri.LockRequired]:"LCK"},pd="#FFEE00",md="#ff3030",Pv="#88ff44",nl="rgba(255, 238, 0, 0.55)",gd="rgba(255, 238, 0, 0.30)",Fr=({children:r,className:t="",variant:n="default"})=>{const a=n==="dim"?"cp-frame-dim":n==="warn"?"cp-frame-warn":n==="danger"?"cp-frame-danger":"";return Q.jsxs("div",{className:`cp-frame ${a} ${t}`,children:[Q.jsx("span",{className:"cp-corner-bl"}),Q.jsx("span",{className:"cp-corner-br"}),r]})},Kc=({pct:r,variant:t})=>{const n=t==="en"?"cp-bar-en":t==="hp"?"cp-bar-hp":"cp-bar-sp";return Q.jsx("div",{className:"cp-bar",children:Q.jsx("div",{className:`cp-bar-fill ${n}`,style:{width:`${r}%`}})})},X2=()=>{const{game:r,players:t}=Ye(),n=t[0];if(!n)return null;const a=!r.introActive,l=Hs(n.weapon),c=Math.max(0,n.hp/n.maxHp*100),f=Math.max(0,n.energy/n.maxEnergy*100),h=Math.max(0,n.specialGauge/n.maxSpecialGauge*100),p=Math.round(n.speed),m=(g,_=0,x=12)=>({opacity:a?1:0,transform:a?"translate(0,0)":`translate(${_}px, ${x}px)`,transition:`opacity 0.4s ease-out ${g}ms, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${g}ms`,pointerEvents:a?"auto":"none"});return Q.jsxs(Q.Fragment,{children:[Q.jsx("div",{className:"absolute top-3 left-3",style:m(800,-20,0),children:Q.jsxs(Fr,{className:"min-w-[170px]",children:[Q.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-1 cp-num",children:[Q.jsx("span",{className:"cp-text-white",children:"P1"}),Q.jsx("span",{className:"cp-label",style:{color:Pv},children:"EN"})]}),Q.jsx(Kc,{pct:f,variant:"en"}),Q.jsxs("div",{className:"cp-num text-[10px] mt-1 text-right",style:{color:nl},children:[Math.ceil(n.energy),"/",n.maxEnergy]})]})}),Q.jsx("div",{className:"absolute top-3 right-3",style:m(900,20,0),children:Q.jsxs(Fr,{className:"min-w-[220px]",variant:r.bossFight?"danger":"default",children:[Q.jsxs("div",{className:"flex items-center justify-between text-[11px] cp-num",children:[Q.jsx("span",{className:"cp-label",children:"LEVEL"}),Q.jsx("span",{className:"cp-num cp-text-white",style:{fontSize:16},children:String(r.wave).padStart(2,"0")})]}),Q.jsxs("div",{className:"flex items-center justify-between text-[10px] cp-num mt-1",children:[Q.jsx("span",{style:{color:nl},children:r.bossFight?"BOSS":"PVE"}),Q.jsx("span",{style:{color:r.lockOn?Pv:r.bossFight?md:nl},children:r.lockOn?"LOCK":r.bossFight?r.bossName:"ENGAGE"})]}),r.bossFight&&Q.jsxs(Q.Fragment,{children:[Q.jsx("div",{className:"mt-1.5 mb-0.5 cp-num text-[10px]",style:{color:md},children:"HP"}),Q.jsx(Kc,{pct:100,variant:"hp"})]})]})}),Q.jsx("div",{className:"absolute bottom-3 left-3",style:m(1e3,-20,0),children:Q.jsxs(Fr,{className:"min-w-[280px]",children:[Q.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-1 cp-num",children:[Q.jsx("span",{className:"cp-label",style:{color:md},children:"ARMOR"}),Q.jsxs("span",{className:"cp-text-white",children:[String(Math.ceil(n.hp)).padStart(3,"0"),"/",n.maxHp]})]}),Q.jsx(Kc,{pct:c,variant:"hp"}),Q.jsxs("div",{className:"flex items-center justify-between text-[11px] mt-2 mb-1 cp-num",children:[Q.jsx("span",{className:"cp-label",style:{color:pd},children:"SP"}),Q.jsxs("span",{className:"cp-text-white",children:[String(Math.ceil(n.specialGauge)).padStart(3,"0"),"%"]})]}),Q.jsx(Kc,{pct:h,variant:"sp"}),Q.jsxs("div",{className:"flex items-center gap-2 mt-2 text-[10px] cp-num",children:[Q.jsx("span",{style:{color:gd},children:"WPN"}),Q.jsx("span",{className:"cp-text-white",children:l.name}),Q.jsxs("span",{style:{color:nl},children:["DMG:",l.damage]}),Q.jsxs("span",{style:{color:nl},children:["[",k2[l.fireMode],"]"]})]}),Q.jsxs("div",{className:"flex items-center gap-2 mt-1 text-[10px] cp-num",children:[Q.jsx("span",{style:{color:gd},children:"SCORE"}),Q.jsx("span",{className:"cp-text",children:String(n.score).padStart(6,"0")}),n.combo>1&&Q.jsxs("span",{style:{color:pd},children:["×",n.combo]})]})]})}),Q.jsxs("div",{className:"absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3",style:m(1200,0,12),children:[Q.jsxs(Fr,{className:"px-3 py-1.5",children:[Q.jsx("div",{className:"cp-label text-[9px] tracking-[0.25em]",children:"SPEED"}),Q.jsx("div",{className:"cp-num cp-text text-2xl leading-none mt-0.5",style:{color:pd},children:String(p).padStart(3,"0")})]}),Q.jsxs(Fr,{className:"px-3 py-1.5",children:[Q.jsx("div",{className:"cp-label text-[9px] tracking-[0.25em]",children:"TIME"}),Q.jsxs("div",{className:"cp-num cp-text-white text-2xl leading-none mt-0.5",children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]}),Q.jsx("div",{className:"absolute bottom-3 right-3",style:m(1100,20,0),children:Q.jsxs(Fr,{className:"px-2 py-2",children:[Q.jsx("div",{className:"cp-label text-[9px] mb-1 tracking-[0.25em]",children:"WEAPON"}),Q.jsx("div",{className:"flex items-center gap-1.5",children:n.weapons.map(g=>{const _=g===n.weapon;return Q.jsx("div",{className:"w-9 h-9 flex items-center justify-center cp-num",style:{background:"#FFEE00",color:"#000",fontSize:18,fontWeight:"bold",boxShadow:_?"0 0 8px #FFEE00":"none",outline:_?"1.5px solid #ffffff":"none",outlineOffset:"1.5px"},children:g},g)})})]})}),Q.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2",style:m(1500,0,-8),children:Q.jsx("div",{className:"cp-num px-3 py-1 bg-black/70 text-[9px] tracking-[0.15em]",style:{color:gd},children:"WASD · MOUSE · LMB · SPACE · E · 1-4 · Z · ESC"})})]})},q2=({size:r=80,opacity:t=.5})=>Q.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[Q.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#FFEE00",strokeWidth:"3"}),Q.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#FFEE00",strokeWidth:"2"})]}),W2=()=>{const{setGame:r}=Ye();return Q.jsxs("div",{className:"cp-bg absolute inset-0 z-50 flex flex-col items-center justify-center",children:[Q.jsx("div",{className:"cp-watermark"}),Q.jsxs("div",{className:"relative z-10 mx-auto w-[440px] max-w-[90vw] cp-frame px-8 py-6",children:[Q.jsx("span",{className:"cp-corner-bl"}),Q.jsx("span",{className:"cp-corner-br"}),Q.jsx("h2",{className:"cp-title text-center leading-none",style:{fontSize:"42px"},children:"暂停"}),Q.jsx("div",{className:"cp-label text-center text-[10px] tracking-[0.3em] mt-1",children:"PAUSED"}),Q.jsxs("div",{className:"mt-6 border-t border-[#FFEE00]/40 pt-4 space-y-2",children:[Q.jsx("button",{onClick:()=>r({screen:"pve",paused:!1}),className:"cp-btn w-full py-2 text-base",children:"继续"}),Q.jsx("button",{onClick:()=>{Ye.getState().resetGame(),r({screen:"menu"})},className:"cp-btn w-full py-2 text-base",children:"返回主菜单"})]}),Q.jsx("div",{className:"mt-4 flex items-center justify-center",children:Q.jsx(q2,{size:32,opacity:.6})})]})]})},j2=({size:r=80,opacity:t=.5})=>Q.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[Q.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#FFEE00",strokeWidth:"3"}),Q.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#FFEE00",strokeWidth:"2"})]}),Y2="rgba(255, 238, 0, 0.30)",Z2="#ff3030",K2=()=>{const{game:r,players:t}=Ye(),n=Ye(a=>a.setGame);return Q.jsxs("div",{className:"cp-bg w-full h-full flex flex-col items-center justify-center",children:[Q.jsx("div",{className:"cp-watermark"}),Q.jsxs("div",{className:"relative z-10 cp-frame cp-frame-danger px-8 py-3 mb-6",children:[Q.jsx("span",{className:"cp-corner-bl"}),Q.jsx("span",{className:"cp-corner-br"}),Q.jsx("h1",{className:"cp-title text-center leading-none tracking-[0.15em]",style:{fontSize:"34px",color:Z2},children:"GAME OVER"})]}),Q.jsxs("div",{className:"relative z-10 cp-frame cp-frame-dim w-[360px] max-w-[90vw] px-5 py-4 mb-6",children:[Q.jsx("span",{className:"cp-corner-bl"}),Q.jsx("span",{className:"cp-corner-br"}),Q.jsx("h3",{className:"cp-label text-[14px] mb-3",children:"战 绩"}),t.map((a,l)=>Q.jsxs("div",{className:"cp-num flex justify-between text-[13px] mb-1.5",children:[Q.jsxs("span",{className:"cp-text-white",children:["P",l+1]}),Q.jsxs("span",{className:"cp-text",children:["KILLS:",String(a.kills).padStart(3,"0"),"  SCORE:",String(a.score).padStart(6,"0")]})]},a.id)),Q.jsxs("div",{className:"cp-num flex justify-between text-[13px] mt-2 pt-2",style:{borderTop:"1px solid rgba(255, 238, 0, 0.30)"},children:[Q.jsx("span",{className:"cp-text-white",children:"关卡"}),Q.jsxs("span",{className:"cp-text",children:["LEVEL ",String(r.wave).padStart(2,"0")]})]}),Q.jsxs("div",{className:"cp-num flex justify-between text-[13px] mt-1",children:[Q.jsx("span",{className:"cp-text-white",children:"用时"}),Q.jsxs("span",{className:"cp-text",children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]}),Q.jsxs("div",{className:"relative z-10 space-y-2 w-[280px]",children:[Q.jsx("button",{onClick:()=>{Ye.getState().resetGame(),n({screen:"pve",gameMode:"pve"})},className:"cp-btn w-full py-2 text-base",children:"再来一局"}),Q.jsx("button",{onClick:()=>{Ye.getState().resetGame(),n({screen:"menu"})},className:"cp-btn w-full py-2 text-base",children:"返回主菜单"})]}),Q.jsxs("div",{className:"mt-6 flex items-center gap-2",children:[Q.jsx(j2,{size:28,opacity:.6}),Q.jsx("span",{className:"cp-num text-[10px] tracking-wider",style:{color:Y2},children:"FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79"})]})]})},Q2=()=>{const r=Ye(t=>t.game.edgePulseAt);return r?Q.jsx("div",{className:"fixed inset-0 pointer-events-none z-30 edge-pulse",style:{background:"radial-gradient(ellipse at center, transparent 35%, rgba(255, 238, 0, 0.85) 100%)"}},r):null},J2=()=>{const r=Ye(n=>n.game),t=()=>{switch(r.screen){case"menu":return Q.jsx(E_,{});case"pve":return Q.jsxs("div",{className:"w-full h-full relative",children:[Q.jsx(V2,{}),Q.jsx(X2,{}),Q.jsx(Q2,{})]});case"pause":return Q.jsxs("div",{className:"w-full h-full relative",children:[Q.jsx("div",{className:"w-full h-full bg-black/30"}),Q.jsx(W2,{})]});case"result":return Q.jsx(K2,{});default:return Q.jsx(E_,{})}};return Q.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};qS.createRoot(document.getElementById("root")).render(Q.jsx(il.StrictMode,{children:Q.jsx(J2,{})}));
