var LS=Object.defineProperty;var NS=(r,t,n)=>t in r?LS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var At=(r,t,n)=>NS(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function zv(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Eh={exports:{}},Yo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n_;function OS(){if(n_)return Yo;n_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:a,key:f,ref:l!==void 0?l:null,props:c}}return Yo.Fragment=t,Yo.jsx=n,Yo.jsxs=n,Yo}var i_;function PS(){return i_||(i_=1,Eh.exports=OS()),Eh.exports}var Z=PS(),Th={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a_;function zS(){if(a_)return ie;a_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.iterator;function M(P){return P===null||typeof P!="object"?null:(P=x&&P[x]||P["@@iterator"],typeof P=="function"?P:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,S={};function v(P,st,yt){this.props=P,this.context=st,this.refs=S,this.updater=yt||E}v.prototype.isReactComponent={},v.prototype.setState=function(P,st){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,st,"setState")},v.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function U(){}U.prototype=v.prototype;function L(P,st,yt){this.props=P,this.context=st,this.refs=S,this.updater=yt||E}var w=L.prototype=new U;w.constructor=L,T(w,v.prototype),w.isPureReactComponent=!0;var W=Array.isArray;function B(){}var O={H:null,A:null,T:null,S:null},G=Object.prototype.hasOwnProperty;function D(P,st,yt){var j=yt.ref;return{$$typeof:r,type:P,key:st,ref:j!==void 0?j:null,props:yt}}function R(P,st){return D(P.type,st,P.props)}function F(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function $(P){var st={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(yt){return st[yt]})}var it=/\/+/g;function ut(P,st){return typeof P=="object"&&P!==null&&P.key!=null?$(""+P.key):st.toString(36)}function mt(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(B,B):(P.status="pending",P.then(function(st){P.status==="pending"&&(P.status="fulfilled",P.value=st)},function(st){P.status==="pending"&&(P.status="rejected",P.reason=st)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function z(P,st,yt,j,ft){var Et=typeof P;(Et==="undefined"||Et==="boolean")&&(P=null);var xt=!1;if(P===null)xt=!0;else switch(Et){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(P.$$typeof){case r:case t:xt=!0;break;case g:return xt=P._init,z(xt(P._payload),st,yt,j,ft)}}if(xt)return ft=ft(P),xt=j===""?"."+ut(P,0):j,W(ft)?(yt="",xt!=null&&(yt=xt.replace(it,"$&/")+"/"),z(ft,st,yt,"",function(ae){return ae})):ft!=null&&(F(ft)&&(ft=R(ft,yt+(ft.key==null||P&&P.key===ft.key?"":(""+ft.key).replace(it,"$&/")+"/")+xt)),st.push(ft)),1;xt=0;var Vt=j===""?".":j+":";if(W(P))for(var Ht=0;Ht<P.length;Ht++)j=P[Ht],Et=Vt+ut(j,Ht),xt+=z(j,st,yt,Et,ft);else if(Ht=M(P),typeof Ht=="function")for(P=Ht.call(P),Ht=0;!(j=P.next()).done;)j=j.value,Et=Vt+ut(j,Ht++),xt+=z(j,st,yt,Et,ft);else if(Et==="object"){if(typeof P.then=="function")return z(mt(P),st,yt,j,ft);throw st=String(P),Error("Objects are not valid as a React child (found: "+(st==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":st)+"). If you meant to render a collection of children, use an array instead.")}return xt}function Q(P,st,yt){if(P==null)return P;var j=[],ft=0;return z(P,j,"","",function(Et){return st.call(yt,Et,ft++)}),j}function K(P){if(P._status===-1){var st=P._result;st=st(),st.then(function(yt){(P._status===0||P._status===-1)&&(P._status=1,P._result=yt)},function(yt){(P._status===0||P._status===-1)&&(P._status=2,P._result=yt)}),P._status===-1&&(P._status=0,P._result=st)}if(P._status===1)return P._result.default;throw P._result}var St=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var st=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(st))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Tt={map:Q,forEach:function(P,st,yt){Q(P,function(){st.apply(this,arguments)},yt)},count:function(P){var st=0;return Q(P,function(){st++}),st},toArray:function(P){return Q(P,function(st){return st})||[]},only:function(P){if(!F(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return ie.Activity=_,ie.Children=Tt,ie.Component=v,ie.Fragment=n,ie.Profiler=l,ie.PureComponent=L,ie.StrictMode=a,ie.Suspense=p,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,ie.__COMPILER_RUNTIME={__proto__:null,c:function(P){return O.H.useMemoCache(P)}},ie.cache=function(P){return function(){return P.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(P,st,yt){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var j=T({},P.props),ft=P.key;if(st!=null)for(Et in st.key!==void 0&&(ft=""+st.key),st)!G.call(st,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&st.ref===void 0||(j[Et]=st[Et]);var Et=arguments.length-2;if(Et===1)j.children=yt;else if(1<Et){for(var xt=Array(Et),Vt=0;Vt<Et;Vt++)xt[Vt]=arguments[Vt+2];j.children=xt}return D(P.type,ft,j)},ie.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},ie.createElement=function(P,st,yt){var j,ft={},Et=null;if(st!=null)for(j in st.key!==void 0&&(Et=""+st.key),st)G.call(st,j)&&j!=="key"&&j!=="__self"&&j!=="__source"&&(ft[j]=st[j]);var xt=arguments.length-2;if(xt===1)ft.children=yt;else if(1<xt){for(var Vt=Array(xt),Ht=0;Ht<xt;Ht++)Vt[Ht]=arguments[Ht+2];ft.children=Vt}if(P&&P.defaultProps)for(j in xt=P.defaultProps,xt)ft[j]===void 0&&(ft[j]=xt[j]);return D(P,Et,ft)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(P){return{$$typeof:h,render:P}},ie.isValidElement=F,ie.lazy=function(P){return{$$typeof:g,_payload:{_status:-1,_result:P},_init:K}},ie.memo=function(P,st){return{$$typeof:m,type:P,compare:st===void 0?null:st}},ie.startTransition=function(P){var st=O.T,yt={};O.T=yt;try{var j=P(),ft=O.S;ft!==null&&ft(yt,j),typeof j=="object"&&j!==null&&typeof j.then=="function"&&j.then(B,St)}catch(Et){St(Et)}finally{st!==null&&yt.types!==null&&(st.types=yt.types),O.T=st}},ie.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},ie.use=function(P){return O.H.use(P)},ie.useActionState=function(P,st,yt){return O.H.useActionState(P,st,yt)},ie.useCallback=function(P,st){return O.H.useCallback(P,st)},ie.useContext=function(P){return O.H.useContext(P)},ie.useDebugValue=function(){},ie.useDeferredValue=function(P,st){return O.H.useDeferredValue(P,st)},ie.useEffect=function(P,st){return O.H.useEffect(P,st)},ie.useEffectEvent=function(P){return O.H.useEffectEvent(P)},ie.useId=function(){return O.H.useId()},ie.useImperativeHandle=function(P,st,yt){return O.H.useImperativeHandle(P,st,yt)},ie.useInsertionEffect=function(P,st){return O.H.useInsertionEffect(P,st)},ie.useLayoutEffect=function(P,st){return O.H.useLayoutEffect(P,st)},ie.useMemo=function(P,st){return O.H.useMemo(P,st)},ie.useOptimistic=function(P,st){return O.H.useOptimistic(P,st)},ie.useReducer=function(P,st,yt){return O.H.useReducer(P,st,yt)},ie.useRef=function(P){return O.H.useRef(P)},ie.useState=function(P){return O.H.useState(P)},ie.useSyncExternalStore=function(P,st,yt){return O.H.useSyncExternalStore(P,st,yt)},ie.useTransition=function(){return O.H.useTransition()},ie.version="19.2.8",ie}var s_;function op(){return s_||(s_=1,Th.exports=zS()),Th.exports}var is=op();const nl=zv(is);var bh={exports:{}},jo={},Ah={exports:{}},Rh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r_;function BS(){return r_||(r_=1,(function(r){function t(z,Q){var K=z.length;z.push(Q);t:for(;0<K;){var St=K-1>>>1,Tt=z[St];if(0<l(Tt,Q))z[St]=Q,z[K]=Tt,K=St;else break t}}function n(z){return z.length===0?null:z[0]}function a(z){if(z.length===0)return null;var Q=z[0],K=z.pop();if(K!==Q){z[0]=K;t:for(var St=0,Tt=z.length,P=Tt>>>1;St<P;){var st=2*(St+1)-1,yt=z[st],j=st+1,ft=z[j];if(0>l(yt,K))j<Tt&&0>l(ft,yt)?(z[St]=ft,z[j]=K,St=j):(z[St]=yt,z[st]=K,St=st);else if(j<Tt&&0>l(ft,K))z[St]=ft,z[j]=K,St=j;else break t}}return Q}function l(z,Q){var K=z.sortIndex-Q.sortIndex;return K!==0?K:z.id-Q.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var p=[],m=[],g=1,_=null,x=3,M=!1,E=!1,T=!1,S=!1,v=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function w(z){for(var Q=n(m);Q!==null;){if(Q.callback===null)a(m);else if(Q.startTime<=z)a(m),Q.sortIndex=Q.expirationTime,t(p,Q);else break;Q=n(m)}}function W(z){if(T=!1,w(z),!E)if(n(p)!==null)E=!0,B||(B=!0,$());else{var Q=n(m);Q!==null&&mt(W,Q.startTime-z)}}var B=!1,O=-1,G=5,D=-1;function R(){return S?!0:!(r.unstable_now()-D<G)}function F(){if(S=!1,B){var z=r.unstable_now();D=z;var Q=!0;try{t:{E=!1,T&&(T=!1,U(O),O=-1),M=!0;var K=x;try{e:{for(w(z),_=n(p);_!==null&&!(_.expirationTime>z&&R());){var St=_.callback;if(typeof St=="function"){_.callback=null,x=_.priorityLevel;var Tt=St(_.expirationTime<=z);if(z=r.unstable_now(),typeof Tt=="function"){_.callback=Tt,w(z),Q=!0;break e}_===n(p)&&a(p),w(z)}else a(p);_=n(p)}if(_!==null)Q=!0;else{var P=n(m);P!==null&&mt(W,P.startTime-z),Q=!1}}break t}finally{_=null,x=K,M=!1}Q=void 0}}finally{Q?$():B=!1}}}var $;if(typeof L=="function")$=function(){L(F)};else if(typeof MessageChannel<"u"){var it=new MessageChannel,ut=it.port2;it.port1.onmessage=F,$=function(){ut.postMessage(null)}}else $=function(){v(F,0)};function mt(z,Q){O=v(function(){z(r.unstable_now())},Q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):G=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(z){switch(x){case 1:case 2:case 3:var Q=3;break;default:Q=x}var K=x;x=Q;try{return z()}finally{x=K}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(z,Q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var K=x;x=z;try{return Q()}finally{x=K}},r.unstable_scheduleCallback=function(z,Q,K){var St=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?St+K:St):K=St,z){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=K+Tt,z={id:g++,callback:Q,priorityLevel:z,startTime:K,expirationTime:Tt,sortIndex:-1},K>St?(z.sortIndex=K,t(m,z),n(p)===null&&z===n(m)&&(T?(U(O),O=-1):T=!0,mt(W,K-St))):(z.sortIndex=Tt,t(p,z),E||M||(E=!0,B||(B=!0,$()))),z},r.unstable_shouldYield=R,r.unstable_wrapCallback=function(z){var Q=x;return function(){var K=x;x=Q;try{return z.apply(this,arguments)}finally{x=K}}}})(Rh)),Rh}var o_;function IS(){return o_||(o_=1,Ah.exports=BS()),Ah.exports}var wh={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l_;function FS(){if(l_)return In;l_=1;var r=op();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)m+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:p,containerInfo:m,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,In.createPortal=function(p,m){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,g)},In.flushSync=function(p){var m=f.T,g=a.p;try{if(f.T=null,a.p=2,p)return p()}finally{f.T=m,a.p=g,a.d.f()}},In.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,a.d.C(p,m))},In.prefetchDNS=function(p){typeof p=="string"&&a.d.D(p)},In.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var g=m.as,_=h(g,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;g==="style"?a.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:_,integrity:x,fetchPriority:M}):g==="script"&&a.d.X(p,{crossOrigin:_,integrity:x,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},In.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var g=h(m.as,m.crossOrigin);a.d.M(p,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&a.d.M(p)},In.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var g=m.as,_=h(g,m.crossOrigin);a.d.L(p,g,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},In.preloadModule=function(p,m){if(typeof p=="string")if(m){var g=h(m.as,m.crossOrigin);a.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else a.d.m(p)},In.requestFormReset=function(p){a.d.r(p)},In.unstable_batchedUpdates=function(p,m){return p(m)},In.useFormState=function(p,m,g){return f.H.useFormState(p,m,g)},In.useFormStatus=function(){return f.H.useHostTransitionStatus()},In.version="19.2.8",In}var c_;function GS(){if(c_)return wh.exports;c_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),wh.exports=FS(),wh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u_;function HS(){if(u_)return jo;u_=1;var r=IS(),t=op(),n=GS();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(a(188))}function m(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,o=i;;){var u=s.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){s=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===s)return p(u),e;if(d===o)return p(u),i;d=d.sibling}throw Error(a(188))}if(s.return!==o.return)s=u,o=d;else{for(var y=!1,b=u.child;b;){if(b===s){y=!0,s=u,o=d;break}if(b===o){y=!0,o=u,s=d;break}b=b.sibling}if(!y){for(b=d.child;b;){if(b===s){y=!0,s=d,o=u;break}if(b===o){y=!0,o=d,s=u;break}b=b.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==o)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),U=Symbol.for("react.consumer"),L=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),B=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),R=Symbol.for("react.memo_cache_sentinel"),F=Symbol.iterator;function $(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var it=Symbol.for("react.client.reference");function ut(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===it?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case v:return"Profiler";case S:return"StrictMode";case W:return"Suspense";case B:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case L:return e.displayName||"Context";case U:return(e._context.displayName||"Context")+".Consumer";case w:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return i=e.displayName||null,i!==null?i:ut(e.type)||"Memo";case G:i=e._payload,e=e._init;try{return ut(e(i))}catch{}}return null}var mt=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},St=[],Tt=-1;function P(e){return{current:e}}function st(e){0>Tt||(e.current=St[Tt],St[Tt]=null,Tt--)}function yt(e,i){Tt++,St[Tt]=e.current,e.current=i}var j=P(null),ft=P(null),Et=P(null),xt=P(null);function Vt(e,i){switch(yt(Et,i),yt(ft,e),yt(j,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?bg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=bg(i),e=Ag(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}st(j),yt(j,e)}function Ht(){st(j),st(ft),st(Et)}function ae(e){e.memoizedState!==null&&yt(xt,e);var i=j.current,s=Ag(i,e.type);i!==s&&(yt(ft,e),yt(j,s))}function Fe(e){ft.current===e&&(st(j),st(ft)),xt.current===e&&(st(xt),ko._currentValue=K)}var de,Qe;function q(e){if(de===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);de=i&&i[1]||"",Qe=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+de+e+Qe}var Pn=!1;function he(e,i){if(!e||Pn)return"";Pn=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(lt){var nt=lt}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(lt){nt=lt}e.call(_t.prototype)}}else{try{throw Error()}catch(lt){nt=lt}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(lt){if(lt&&nt&&typeof lt.stack=="string")return[lt.stack,nt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),y=d[0],b=d[1];if(y&&b){var I=y.split(`
`),et=b.split(`
`);for(u=o=0;o<I.length&&!I[o].includes("DetermineComponentFrameRoot");)o++;for(;u<et.length&&!et[u].includes("DetermineComponentFrameRoot");)u++;if(o===I.length||u===et.length)for(o=I.length-1,u=et.length-1;1<=o&&0<=u&&I[o]!==et[u];)u--;for(;1<=o&&0<=u;o--,u--)if(I[o]!==et[u]){if(o!==1||u!==1)do if(o--,u--,0>u||I[o]!==et[u]){var ht=`
`+I[o].replace(" at new "," at ");return e.displayName&&ht.includes("<anonymous>")&&(ht=ht.replace("<anonymous>",e.displayName)),ht}while(1<=o&&0<=u);break}}}finally{Pn=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?q(s):""}function ge(e,i){switch(e.tag){case 26:case 27:case 5:return q(e.type);case 16:return q("Lazy");case 13:return e.child!==i&&i!==null?q("Suspense Fallback"):q("Suspense");case 19:return q("SuspenseList");case 0:case 15:return he(e.type,!1);case 11:return he(e.type.render,!1);case 1:return he(e.type,!0);case 31:return q("Activity");default:return""}}function Qt(e){try{var i="",s=null;do i+=ge(e,s),s=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Oe=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,N=r.unstable_cancelCallback,A=r.unstable_shouldYield,at=r.unstable_requestPaint,dt=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,Lt=r.unstable_NormalPriority,zt=r.unstable_LowPriority,_e=r.unstable_IdlePriority,Rt=r.log,Bt=r.unstable_setDisableYieldValue,Kt=null,Yt=null;function Pt(e){if(typeof Rt=="function"&&Bt(e),Yt&&typeof Yt.setStrictMode=="function")try{Yt.setStrictMode(Kt,e)}catch{}}var te=Math.clz32?Math.clz32:V,re=Math.log,Ge=Math.LN2;function V(e){return e>>>=0,e===0?32:31-(re(e)/Ge|0)|0}var wt=256,ct=262144,vt=4194304;function Ct(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Nt(e,i,s){var o=e.pendingLanes;if(o===0)return 0;var u=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~d,o!==0?u=Ct(o):(y&=b,y!==0?u=Ct(y):s||(s=b&~e,s!==0&&(u=Ct(s))))):(b=o&~d,b!==0?u=Ct(b):y!==0?u=Ct(y):s||(s=o&~e,s!==0&&(u=Ct(s)))),u===0?0:i!==0&&i!==u&&(i&d)===0&&(d=u&-u,s=i&-i,d>=s||d===32&&(s&4194048)!==0)?i:u}function ee(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Je(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _n(){var e=vt;return vt<<=1,(vt&62914560)===0&&(vt=4194304),e}function Ae(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Rn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ri(e,i,s,o,u,d){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var b=e.entanglements,I=e.expirationTimes,et=e.hiddenUpdates;for(s=y&~s;0<s;){var ht=31-te(s),_t=1<<ht;b[ht]=0,I[ht]=-1;var nt=et[ht];if(nt!==null)for(et[ht]=null,ht=0;ht<nt.length;ht++){var lt=nt[ht];lt!==null&&(lt.lane&=-536870913)}s&=~_t}o!==0&&eo(e,o,0),d!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~i))}function eo(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-te(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function no(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var o=31-te(s),u=1<<o;u&i|e[o]&i&&(e[o]|=i),s&=~u}}function Gi(e,i){var s=i&-i;return s=(s&42)!==0?1:fs(s),(s&(e.suspendedLanes|i))!==0?0:s}function fs(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ks(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function io(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:Zg(e.type))}function hs(e,i){var s=Q.p;try{return Q.p=e,i()}finally{Q.p=s}}var wi=Math.random().toString(36).slice(2),en="__reactFiber$"+wi,wn="__reactProps$"+wi,ji="__reactContainer$"+wi,ao="__reactEvents$"+wi,gu="__reactListeners$"+wi,_u="__reactHandles$"+wi,C="__reactResources$"+wi,k="__reactMarker$"+wi;function ot(e){delete e[en],delete e[wn],delete e[ao],delete e[gu],delete e[_u]}function rt(e){var i=e[en];if(i)return i;for(var s=e.parentNode;s;){if(i=s[ji]||s[en]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=Ng(e);e!==null;){if(s=e[en])return s;e=Ng(e)}return i}e=s,s=e.parentNode}return null}function X(e){if(e=e[en]||e[ji]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Dt(e){var i=e[C];return i||(i=e[C]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Ut(e){e[k]=!0}var kt=new Set,ne={};function $t(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(ne[e]=i,e=0;e<i.length;e++)kt.add(i[e])}var Te=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Pe={},He={};function zn(e){return Oe.call(He,e)?!0:Oe.call(Pe,e)?!1:Te.test(e)?He[e]=!0:(Pe[e]=!0,!1)}function ye(e,i,s){if(zn(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Xt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function vn(e,i,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+o)}}function se(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Aa(e,i,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(y){s=""+y,d.call(this,y)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Cn(e){if(!e._valueTracker){var i=Wn(e)?"checked":"value";e._valueTracker=Aa(e,i,""+e[i])}}function Ra(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),o="";return e&&(o=Wn(e)?e.checked?"true":"false":e.value),e=o,e!==s?(i.setValue(e),!0):!1}function Ne(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var di=/[\n"\\]/g;function En(e){return e.replace(di,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Bn(e,i,s,o,u,d,y,b){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+se(i)):e.value!==""+se(i)&&(e.value=""+se(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?pi(e,y,se(i)):s!=null?pi(e,y,se(s)):o!=null&&e.removeAttribute("value"),u==null&&d!=null&&(e.defaultChecked=!!d),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+se(b):e.removeAttribute("name")}function Ci(e,i,s,o,u,d,y,b){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||s!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){Cn(e);return}s=s!=null?""+se(s):"",i=i!=null?""+se(i):s,b||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Cn(e)}function pi(e,i,s){i==="number"&&Ne(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function Zi(e,i,s,o){if(e=e.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=i.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&o&&(e[s].defaultSelected=!0)}else{for(s=""+se(s),i=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function yp(e,i,s){if(i!=null&&(i=""+se(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+se(s):""}function Sp(e,i,s,o){if(i==null){if(o!=null){if(s!=null)throw Error(a(92));if(mt(o)){if(1<o.length)throw Error(a(93));o=o[0]}s=o}s==null&&(s=""),i=s}s=se(i),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),Cn(e)}function Xs(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Rx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Mp(e,i,s){var o=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,s):typeof s!="number"||s===0||Rx.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function Ep(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&s[u]!==o&&Mp(e,u,o)}else for(var d in i)i.hasOwnProperty(d)&&Mp(e,d,i[d])}function vu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Cx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ml(e){return Cx.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ki(){}var xu=null;function yu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var qs=null,Ws=null;function Tp(e){var i=X(e);if(i&&(e=i.stateNode)){var s=e[wn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Bn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+En(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var o=s[i];if(o!==e&&o.form===e.form){var u=o[wn]||null;if(!u)throw Error(a(90));Bn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)o=s[i],o.form===e.form&&Ra(o)}break t;case"textarea":yp(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&Zi(e,!!s.multiple,i,!1)}}}var Su=!1;function bp(e,i,s){if(Su)return e(i,s);Su=!0;try{var o=e(i);return o}finally{if(Su=!1,(qs!==null||Ws!==null)&&(nc(),qs&&(i=qs,e=Ws,Ws=qs=null,Tp(i),e)))for(i=0;i<e.length;i++)Tp(e[i])}}function so(e,i){var s=e.stateNode;if(s===null)return null;var o=s[wn]||null;if(o===null)return null;s=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var Qi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Mu=!1;if(Qi)try{var ro={};Object.defineProperty(ro,"passive",{get:function(){Mu=!0}}),window.addEventListener("test",ro,ro),window.removeEventListener("test",ro,ro)}catch{Mu=!1}var wa=null,Eu=null,gl=null;function Ap(){if(gl)return gl;var e,i=Eu,s=i.length,o,u="value"in wa?wa.value:wa.textContent,d=u.length;for(e=0;e<s&&i[e]===u[e];e++);var y=s-e;for(o=1;o<=y&&i[s-o]===u[d-o];o++);return gl=u.slice(e,1<o?1-o:void 0)}function _l(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function vl(){return!0}function Rp(){return!1}function Yn(e){function i(s,o,u,d,y){this._reactName=s,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(s=e[b],this[b]=s?s(d):d[b]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?vl:Rp,this.isPropagationStopped=Rp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=vl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=vl)},persist:function(){},isPersistent:vl}),i}var ds={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xl=Yn(ds),oo=_({},ds,{view:0,detail:0}),Dx=Yn(oo),Tu,bu,lo,yl=_({},oo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ru,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==lo&&(lo&&e.type==="mousemove"?(Tu=e.screenX-lo.screenX,bu=e.screenY-lo.screenY):bu=Tu=0,lo=e),Tu)},movementY:function(e){return"movementY"in e?e.movementY:bu}}),wp=Yn(yl),Ux=_({},yl,{dataTransfer:0}),Lx=Yn(Ux),Nx=_({},oo,{relatedTarget:0}),Au=Yn(Nx),Ox=_({},ds,{animationName:0,elapsedTime:0,pseudoElement:0}),Px=Yn(Ox),zx=_({},ds,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Bx=Yn(zx),Ix=_({},ds,{data:0}),Cp=Yn(Ix),Fx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Vx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Hx[e])?!!i[e]:!1}function Ru(){return Vx}var kx=_({},oo,{key:function(e){if(e.key){var i=Fx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=_l(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ru,charCode:function(e){return e.type==="keypress"?_l(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_l(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Xx=Yn(kx),qx=_({},yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dp=Yn(qx),Wx=_({},oo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ru}),Yx=Yn(Wx),jx=_({},ds,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zx=Yn(jx),Kx=_({},yl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Qx=Yn(Kx),Jx=_({},ds,{newState:0,oldState:0}),$x=Yn(Jx),ty=[9,13,27,32],wu=Qi&&"CompositionEvent"in window,co=null;Qi&&"documentMode"in document&&(co=document.documentMode);var ey=Qi&&"TextEvent"in window&&!co,Up=Qi&&(!wu||co&&8<co&&11>=co),Lp=" ",Np=!1;function Op(e,i){switch(e){case"keyup":return ty.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ys=!1;function ny(e,i){switch(e){case"compositionend":return Pp(i);case"keypress":return i.which!==32?null:(Np=!0,Lp);case"textInput":return e=i.data,e===Lp&&Np?null:e;default:return null}}function iy(e,i){if(Ys)return e==="compositionend"||!wu&&Op(e,i)?(e=Ap(),gl=Eu=wa=null,Ys=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Up&&i.locale!=="ko"?null:i.data;default:return null}}var ay={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!ay[e.type]:i==="textarea"}function Bp(e,i,s,o){qs?Ws?Ws.push(o):Ws=[o]:qs=o,i=cc(i,"onChange"),0<i.length&&(s=new xl("onChange","change",null,s,o),e.push({event:s,listeners:i}))}var uo=null,fo=null;function sy(e){xg(e,0)}function Sl(e){var i=bt(e);if(Ra(i))return e}function Ip(e,i){if(e==="change")return i}var Fp=!1;if(Qi){var Cu;if(Qi){var Du="oninput"in document;if(!Du){var Gp=document.createElement("div");Gp.setAttribute("oninput","return;"),Du=typeof Gp.oninput=="function"}Cu=Du}else Cu=!1;Fp=Cu&&(!document.documentMode||9<document.documentMode)}function Hp(){uo&&(uo.detachEvent("onpropertychange",Vp),fo=uo=null)}function Vp(e){if(e.propertyName==="value"&&Sl(fo)){var i=[];Bp(i,fo,e,yu(e)),bp(sy,i)}}function ry(e,i,s){e==="focusin"?(Hp(),uo=i,fo=s,uo.attachEvent("onpropertychange",Vp)):e==="focusout"&&Hp()}function oy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Sl(fo)}function ly(e,i){if(e==="click")return Sl(i)}function cy(e,i){if(e==="input"||e==="change")return Sl(i)}function uy(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ni=typeof Object.is=="function"?Object.is:uy;function ho(e,i){if(ni(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),o=Object.keys(i);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var u=s[o];if(!Oe.call(i,u)||!ni(e[u],i[u]))return!1}return!0}function kp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xp(e,i){var s=kp(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=i&&o>=i)return{node:s,offset:i-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=kp(s)}}function qp(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?qp(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Wp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Ne(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=Ne(e.document)}return i}function Uu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var fy=Qi&&"documentMode"in document&&11>=document.documentMode,js=null,Lu=null,po=null,Nu=!1;function Yp(e,i,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Nu||js==null||js!==Ne(o)||(o=js,"selectionStart"in o&&Uu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),po&&ho(po,o)||(po=o,o=cc(Lu,"onSelect"),0<o.length&&(i=new xl("onSelect","select",null,i,s),e.push({event:i,listeners:o}),i.target=js)))}function ps(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var Zs={animationend:ps("Animation","AnimationEnd"),animationiteration:ps("Animation","AnimationIteration"),animationstart:ps("Animation","AnimationStart"),transitionrun:ps("Transition","TransitionRun"),transitionstart:ps("Transition","TransitionStart"),transitioncancel:ps("Transition","TransitionCancel"),transitionend:ps("Transition","TransitionEnd")},Ou={},jp={};Qi&&(jp=document.createElement("div").style,"AnimationEvent"in window||(delete Zs.animationend.animation,delete Zs.animationiteration.animation,delete Zs.animationstart.animation),"TransitionEvent"in window||delete Zs.transitionend.transition);function ms(e){if(Ou[e])return Ou[e];if(!Zs[e])return e;var i=Zs[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in jp)return Ou[e]=i[s];return e}var Zp=ms("animationend"),Kp=ms("animationiteration"),Qp=ms("animationstart"),hy=ms("transitionrun"),dy=ms("transitionstart"),py=ms("transitioncancel"),Jp=ms("transitionend"),$p=new Map,Pu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Pu.push("scrollEnd");function Di(e,i){$p.set(e,i),$t(i,[e])}var Ml=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},mi=[],Ks=0,zu=0;function El(){for(var e=Ks,i=zu=Ks=0;i<e;){var s=mi[i];mi[i++]=null;var o=mi[i];mi[i++]=null;var u=mi[i];mi[i++]=null;var d=mi[i];if(mi[i++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}d!==0&&tm(s,u,d)}}function Tl(e,i,s,o){mi[Ks++]=e,mi[Ks++]=i,mi[Ks++]=s,mi[Ks++]=o,zu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Bu(e,i,s,o){return Tl(e,i,s,o),bl(e)}function gs(e,i){return Tl(e,null,null,i),bl(e)}function tm(e,i,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var u=!1,d=e.return;d!==null;)d.childLanes|=s,o=d.alternate,o!==null&&(o.childLanes|=s),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(u=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,u&&i!==null&&(u=31-te(s),e=d.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=s|536870912),d):null}function bl(e){if(50<zo)throw zo=0,Yf=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var Qs={};function my(e,i,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(e,i,s,o){return new my(e,i,s,o)}function Iu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ji(e,i){var s=e.alternate;return s===null?(s=ii(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function em(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Al(e,i,s,o,u,d){var y=0;if(o=e,typeof e=="function")Iu(e)&&(y=1);else if(typeof e=="string")y=yS(e,s,j.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ii(31,s,i,u),e.elementType=D,e.lanes=d,e;case T:return _s(s.children,u,d,i);case S:y=8,u|=24;break;case v:return e=ii(12,s,i,u|2),e.elementType=v,e.lanes=d,e;case W:return e=ii(13,s,i,u),e.elementType=W,e.lanes=d,e;case B:return e=ii(19,s,i,u),e.elementType=B,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case L:y=10;break t;case U:y=9;break t;case w:y=11;break t;case O:y=14;break t;case G:y=16,o=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),o=null}return i=ii(y,s,i,u),i.elementType=e,i.type=o,i.lanes=d,i}function _s(e,i,s,o){return e=ii(7,e,o,i),e.lanes=s,e}function Fu(e,i,s){return e=ii(6,e,null,i),e.lanes=s,e}function nm(e){var i=ii(18,null,null,0);return i.stateNode=e,i}function Gu(e,i,s){return i=ii(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var im=new WeakMap;function gi(e,i){if(typeof e=="object"&&e!==null){var s=im.get(e);return s!==void 0?s:(i={value:e,source:i,stack:Qt(i)},im.set(e,i),i)}return{value:e,source:i,stack:Qt(i)}}var Js=[],$s=0,Rl=null,mo=0,_i=[],vi=0,Ca=null,Hi=1,Vi="";function $i(e,i){Js[$s++]=mo,Js[$s++]=Rl,Rl=e,mo=i}function am(e,i,s){_i[vi++]=Hi,_i[vi++]=Vi,_i[vi++]=Ca,Ca=e;var o=Hi;e=Vi;var u=32-te(o)-1;o&=~(1<<u),s+=1;var d=32-te(i)+u;if(30<d){var y=u-u%5;d=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Hi=1<<32-te(i)+u|s<<u|o,Vi=d+e}else Hi=1<<d|s<<u|o,Vi=e}function Hu(e){e.return!==null&&($i(e,1),am(e,1,0))}function Vu(e){for(;e===Rl;)Rl=Js[--$s],Js[$s]=null,mo=Js[--$s],Js[$s]=null;for(;e===Ca;)Ca=_i[--vi],_i[vi]=null,Vi=_i[--vi],_i[vi]=null,Hi=_i[--vi],_i[vi]=null}function sm(e,i){_i[vi++]=Hi,_i[vi++]=Vi,_i[vi++]=Ca,Hi=i.id,Vi=i.overflow,Ca=e}var Dn=null,je=null,Se=!1,Da=null,xi=!1,ku=Error(a(519));function Ua(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw go(gi(i,e)),ku}function rm(e){var i=e.stateNode,s=e.type,o=e.memoizedProps;switch(i[en]=e,i[wn]=o,s){case"dialog":me("cancel",i),me("close",i);break;case"iframe":case"object":case"embed":me("load",i);break;case"video":case"audio":for(s=0;s<Io.length;s++)me(Io[s],i);break;case"source":me("error",i);break;case"img":case"image":case"link":me("error",i),me("load",i);break;case"details":me("toggle",i);break;case"input":me("invalid",i),Ci(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":me("invalid",i);break;case"textarea":me("invalid",i),Sp(i,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||o.suppressHydrationWarning===!0||Eg(i.textContent,s)?(o.popover!=null&&(me("beforetoggle",i),me("toggle",i)),o.onScroll!=null&&me("scroll",i),o.onScrollEnd!=null&&me("scrollend",i),o.onClick!=null&&(i.onclick=Ki),i=!0):i=!1,i||Ua(e,!0)}function om(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:Dn=Dn.return}}function tr(e){if(e!==Dn)return!1;if(!Se)return om(e),Se=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||lh(e.type,e.memoizedProps)),s=!s),s&&je&&Ua(e),om(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));je=Lg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));je=Lg(e)}else i===27?(i=je,qa(e.type)?(e=dh,dh=null,je=e):je=i):je=Dn?Si(e.stateNode.nextSibling):null;return!0}function vs(){je=Dn=null,Se=!1}function Xu(){var e=Da;return e!==null&&(Qn===null?Qn=e:Qn.push.apply(Qn,e),Da=null),e}function go(e){Da===null?Da=[e]:Da.push(e)}var qu=P(null),xs=null,ta=null;function La(e,i,s){yt(qu,i._currentValue),i._currentValue=s}function ea(e){e._currentValue=qu.current,st(qu)}function Wu(e,i,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===s)break;e=e.return}}function Yu(e,i,s,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var d=u.dependencies;if(d!==null){var y=u.child;d=d.firstContext;t:for(;d!==null;){var b=d;d=u;for(var I=0;I<i.length;I++)if(b.context===i[I]){d.lanes|=s,b=d.alternate,b!==null&&(b.lanes|=s),Wu(d.return,s,e),o||(y=null);break t}d=b.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(a(341));y.lanes|=s,d=y.alternate,d!==null&&(d.lanes|=s),Wu(y,s,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function er(e,i,s,o){e=null;for(var u=i,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var b=u.type;ni(u.pendingProps.value,y.value)||(e!==null?e.push(b):e=[b])}}else if(u===xt.current){if(y=u.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(ko):e=[ko])}u=u.return}e!==null&&Yu(i,e,s,o),i.flags|=262144}function wl(e){for(e=e.firstContext;e!==null;){if(!ni(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ys(e){xs=e,ta=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return lm(xs,e)}function Cl(e,i){return xs===null&&ys(e),lm(e,i)}function lm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ta===null){if(e===null)throw Error(a(308));ta=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ta=ta.next=i;return s}var gy=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},_y=r.unstable_scheduleCallback,vy=r.unstable_NormalPriority,un={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ju(){return{controller:new gy,data:new Map,refCount:0}}function _o(e){e.refCount--,e.refCount===0&&_y(vy,function(){e.controller.abort()})}var vo=null,Zu=0,nr=0,ir=null;function xy(e,i){if(vo===null){var s=vo=[];Zu=0,nr=$f(),ir={status:"pending",value:void 0,then:function(o){s.push(o)}}}return Zu++,i.then(cm,cm),i}function cm(){if(--Zu===0&&vo!==null){ir!==null&&(ir.status="fulfilled");var e=vo;vo=null,nr=0,ir=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function yy(e,i){var s=[],o={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),o}var um=z.S;z.S=function(e,i){Y0=dt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&xy(e,i),um!==null&&um(e,i)};var Ss=P(null);function Ku(){var e=Ss.current;return e!==null?e:qe.pooledCache}function Dl(e,i){i===null?yt(Ss,Ss.current):yt(Ss,i.pool)}function fm(){var e=Ku();return e===null?null:{parent:un._currentValue,pool:e}}var ar=Error(a(460)),Qu=Error(a(474)),Ul=Error(a(542)),Ll={then:function(){}};function hm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function dm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Ki,Ki),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,mm(e),e;default:if(typeof i.status=="string")i.then(Ki,Ki);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,mm(e),e}throw Es=i,ar}}function Ms(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Es=s,ar):s}}var Es=null;function pm(){if(Es===null)throw Error(a(459));var e=Es;return Es=null,e}function mm(e){if(e===ar||e===Ul)throw Error(a(483))}var sr=null,xo=0;function Nl(e){var i=xo;return xo+=1,sr===null&&(sr=[]),dm(sr,e,i)}function yo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ol(e,i){throw i.$$typeof===x?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function gm(e){function i(Y,H){if(e){var tt=Y.deletions;tt===null?(Y.deletions=[H],Y.flags|=16):tt.push(H)}}function s(Y,H){if(!e)return null;for(;H!==null;)i(Y,H),H=H.sibling;return null}function o(Y){for(var H=new Map;Y!==null;)Y.key!==null?H.set(Y.key,Y):H.set(Y.index,Y),Y=Y.sibling;return H}function u(Y,H){return Y=Ji(Y,H),Y.index=0,Y.sibling=null,Y}function d(Y,H,tt){return Y.index=tt,e?(tt=Y.alternate,tt!==null?(tt=tt.index,tt<H?(Y.flags|=67108866,H):tt):(Y.flags|=67108866,H)):(Y.flags|=1048576,H)}function y(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function b(Y,H,tt,pt){return H===null||H.tag!==6?(H=Fu(tt,Y.mode,pt),H.return=Y,H):(H=u(H,tt),H.return=Y,H)}function I(Y,H,tt,pt){var jt=tt.type;return jt===T?ht(Y,H,tt.props.children,pt,tt.key):H!==null&&(H.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===G&&Ms(jt)===H.type)?(H=u(H,tt.props),yo(H,tt),H.return=Y,H):(H=Al(tt.type,tt.key,tt.props,null,Y.mode,pt),yo(H,tt),H.return=Y,H)}function et(Y,H,tt,pt){return H===null||H.tag!==4||H.stateNode.containerInfo!==tt.containerInfo||H.stateNode.implementation!==tt.implementation?(H=Gu(tt,Y.mode,pt),H.return=Y,H):(H=u(H,tt.children||[]),H.return=Y,H)}function ht(Y,H,tt,pt,jt){return H===null||H.tag!==7?(H=_s(tt,Y.mode,pt,jt),H.return=Y,H):(H=u(H,tt),H.return=Y,H)}function _t(Y,H,tt){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return H=Fu(""+H,Y.mode,tt),H.return=Y,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case M:return tt=Al(H.type,H.key,H.props,null,Y.mode,tt),yo(tt,H),tt.return=Y,tt;case E:return H=Gu(H,Y.mode,tt),H.return=Y,H;case G:return H=Ms(H),_t(Y,H,tt)}if(mt(H)||$(H))return H=_s(H,Y.mode,tt,null),H.return=Y,H;if(typeof H.then=="function")return _t(Y,Nl(H),tt);if(H.$$typeof===L)return _t(Y,Cl(Y,H),tt);Ol(Y,H)}return null}function nt(Y,H,tt,pt){var jt=H!==null?H.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return jt!==null?null:b(Y,H,""+tt,pt);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case M:return tt.key===jt?I(Y,H,tt,pt):null;case E:return tt.key===jt?et(Y,H,tt,pt):null;case G:return tt=Ms(tt),nt(Y,H,tt,pt)}if(mt(tt)||$(tt))return jt!==null?null:ht(Y,H,tt,pt,null);if(typeof tt.then=="function")return nt(Y,H,Nl(tt),pt);if(tt.$$typeof===L)return nt(Y,H,Cl(Y,tt),pt);Ol(Y,tt)}return null}function lt(Y,H,tt,pt,jt){if(typeof pt=="string"&&pt!==""||typeof pt=="number"||typeof pt=="bigint")return Y=Y.get(tt)||null,b(H,Y,""+pt,jt);if(typeof pt=="object"&&pt!==null){switch(pt.$$typeof){case M:return Y=Y.get(pt.key===null?tt:pt.key)||null,I(H,Y,pt,jt);case E:return Y=Y.get(pt.key===null?tt:pt.key)||null,et(H,Y,pt,jt);case G:return pt=Ms(pt),lt(Y,H,tt,pt,jt)}if(mt(pt)||$(pt))return Y=Y.get(tt)||null,ht(H,Y,pt,jt,null);if(typeof pt.then=="function")return lt(Y,H,tt,Nl(pt),jt);if(pt.$$typeof===L)return lt(Y,H,tt,Cl(H,pt),jt);Ol(H,pt)}return null}function Ft(Y,H,tt,pt){for(var jt=null,Ce=null,qt=H,le=H=0,xe=null;qt!==null&&le<tt.length;le++){qt.index>le?(xe=qt,qt=null):xe=qt.sibling;var De=nt(Y,qt,tt[le],pt);if(De===null){qt===null&&(qt=xe);break}e&&qt&&De.alternate===null&&i(Y,qt),H=d(De,H,le),Ce===null?jt=De:Ce.sibling=De,Ce=De,qt=xe}if(le===tt.length)return s(Y,qt),Se&&$i(Y,le),jt;if(qt===null){for(;le<tt.length;le++)qt=_t(Y,tt[le],pt),qt!==null&&(H=d(qt,H,le),Ce===null?jt=qt:Ce.sibling=qt,Ce=qt);return Se&&$i(Y,le),jt}for(qt=o(qt);le<tt.length;le++)xe=lt(qt,Y,le,tt[le],pt),xe!==null&&(e&&xe.alternate!==null&&qt.delete(xe.key===null?le:xe.key),H=d(xe,H,le),Ce===null?jt=xe:Ce.sibling=xe,Ce=xe);return e&&qt.forEach(function(Ka){return i(Y,Ka)}),Se&&$i(Y,le),jt}function Jt(Y,H,tt,pt){if(tt==null)throw Error(a(151));for(var jt=null,Ce=null,qt=H,le=H=0,xe=null,De=tt.next();qt!==null&&!De.done;le++,De=tt.next()){qt.index>le?(xe=qt,qt=null):xe=qt.sibling;var Ka=nt(Y,qt,De.value,pt);if(Ka===null){qt===null&&(qt=xe);break}e&&qt&&Ka.alternate===null&&i(Y,qt),H=d(Ka,H,le),Ce===null?jt=Ka:Ce.sibling=Ka,Ce=Ka,qt=xe}if(De.done)return s(Y,qt),Se&&$i(Y,le),jt;if(qt===null){for(;!De.done;le++,De=tt.next())De=_t(Y,De.value,pt),De!==null&&(H=d(De,H,le),Ce===null?jt=De:Ce.sibling=De,Ce=De);return Se&&$i(Y,le),jt}for(qt=o(qt);!De.done;le++,De=tt.next())De=lt(qt,Y,le,De.value,pt),De!==null&&(e&&De.alternate!==null&&qt.delete(De.key===null?le:De.key),H=d(De,H,le),Ce===null?jt=De:Ce.sibling=De,Ce=De);return e&&qt.forEach(function(US){return i(Y,US)}),Se&&$i(Y,le),jt}function Xe(Y,H,tt,pt){if(typeof tt=="object"&&tt!==null&&tt.type===T&&tt.key===null&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case M:t:{for(var jt=tt.key;H!==null;){if(H.key===jt){if(jt=tt.type,jt===T){if(H.tag===7){s(Y,H.sibling),pt=u(H,tt.props.children),pt.return=Y,Y=pt;break t}}else if(H.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===G&&Ms(jt)===H.type){s(Y,H.sibling),pt=u(H,tt.props),yo(pt,tt),pt.return=Y,Y=pt;break t}s(Y,H);break}else i(Y,H);H=H.sibling}tt.type===T?(pt=_s(tt.props.children,Y.mode,pt,tt.key),pt.return=Y,Y=pt):(pt=Al(tt.type,tt.key,tt.props,null,Y.mode,pt),yo(pt,tt),pt.return=Y,Y=pt)}return y(Y);case E:t:{for(jt=tt.key;H!==null;){if(H.key===jt)if(H.tag===4&&H.stateNode.containerInfo===tt.containerInfo&&H.stateNode.implementation===tt.implementation){s(Y,H.sibling),pt=u(H,tt.children||[]),pt.return=Y,Y=pt;break t}else{s(Y,H);break}else i(Y,H);H=H.sibling}pt=Gu(tt,Y.mode,pt),pt.return=Y,Y=pt}return y(Y);case G:return tt=Ms(tt),Xe(Y,H,tt,pt)}if(mt(tt))return Ft(Y,H,tt,pt);if($(tt)){if(jt=$(tt),typeof jt!="function")throw Error(a(150));return tt=jt.call(tt),Jt(Y,H,tt,pt)}if(typeof tt.then=="function")return Xe(Y,H,Nl(tt),pt);if(tt.$$typeof===L)return Xe(Y,H,Cl(Y,tt),pt);Ol(Y,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,H!==null&&H.tag===6?(s(Y,H.sibling),pt=u(H,tt),pt.return=Y,Y=pt):(s(Y,H),pt=Fu(tt,Y.mode,pt),pt.return=Y,Y=pt),y(Y)):s(Y,H)}return function(Y,H,tt,pt){try{xo=0;var jt=Xe(Y,H,tt,pt);return sr=null,jt}catch(qt){if(qt===ar||qt===Ul)throw qt;var Ce=ii(29,qt,null,Y.mode);return Ce.lanes=pt,Ce.return=Y,Ce}finally{}}}var Ts=gm(!0),_m=gm(!1),Na=!1;function Ju(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $u(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Oa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Pa(e,i,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=bl(e),tm(e,null,s),i}return Tl(e,o,i,s),bl(e)}function So(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,no(e,s)}}function tf(e,i){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var u=null,d=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};d===null?u=d=y:d=d.next=y,s=s.next}while(s!==null);d===null?u=d=i:d=d.next=i}else u=d=i;s={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var ef=!1;function Mo(){if(ef){var e=ir;if(e!==null)throw e}}function Eo(e,i,s,o){ef=!1;var u=e.updateQueue;Na=!1;var d=u.firstBaseUpdate,y=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var I=b,et=I.next;I.next=null,y===null?d=et:y.next=et,y=I;var ht=e.alternate;ht!==null&&(ht=ht.updateQueue,b=ht.lastBaseUpdate,b!==y&&(b===null?ht.firstBaseUpdate=et:b.next=et,ht.lastBaseUpdate=I))}if(d!==null){var _t=u.baseState;y=0,ht=et=I=null,b=d;do{var nt=b.lane&-536870913,lt=nt!==b.lane;if(lt?(ve&nt)===nt:(o&nt)===nt){nt!==0&&nt===nr&&(ef=!0),ht!==null&&(ht=ht.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Ft=e,Jt=b;nt=i;var Xe=s;switch(Jt.tag){case 1:if(Ft=Jt.payload,typeof Ft=="function"){_t=Ft.call(Xe,_t,nt);break t}_t=Ft;break t;case 3:Ft.flags=Ft.flags&-65537|128;case 0:if(Ft=Jt.payload,nt=typeof Ft=="function"?Ft.call(Xe,_t,nt):Ft,nt==null)break t;_t=_({},_t,nt);break t;case 2:Na=!0}}nt=b.callback,nt!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[nt]:lt.push(nt))}else lt={lane:nt,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ht===null?(et=ht=lt,I=_t):ht=ht.next=lt,y|=nt;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;lt=b,b=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);ht===null&&(I=_t),u.baseState=I,u.firstBaseUpdate=et,u.lastBaseUpdate=ht,d===null&&(u.shared.lanes=0),Ga|=y,e.lanes=y,e.memoizedState=_t}}function vm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function xm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)vm(s[e],i)}var rr=P(null),Pl=P(0);function ym(e,i){e=ua,yt(Pl,e),yt(rr,i),ua=e|i.baseLanes}function nf(){yt(Pl,ua),yt(rr,rr.current)}function af(){ua=Pl.current,st(rr),st(Pl)}var ai=P(null),yi=null;function za(e){var i=e.alternate;yt(rn,rn.current&1),yt(ai,e),yi===null&&(i===null||rr.current!==null||i.memoizedState!==null)&&(yi=e)}function sf(e){yt(rn,rn.current),yt(ai,e),yi===null&&(yi=e)}function Sm(e){e.tag===22?(yt(rn,rn.current),yt(ai,e),yi===null&&(yi=e)):Ba()}function Ba(){yt(rn,rn.current),yt(ai,ai.current)}function si(e){st(ai),yi===e&&(yi=null),st(rn)}var rn=P(0);function zl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||fh(s)||hh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var na=0,oe=null,Ve=null,fn=null,Bl=!1,or=!1,bs=!1,Il=0,To=0,lr=null,Sy=0;function nn(){throw Error(a(321))}function rf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!ni(e[s],i[s]))return!1;return!0}function of(e,i,s,o,u,d){return na=d,oe=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,z.H=e===null||e.memoizedState===null?a0:Mf,bs=!1,d=s(o,u),bs=!1,or&&(d=Em(i,s,o,u)),Mm(e),d}function Mm(e){z.H=Ro;var i=Ve!==null&&Ve.next!==null;if(na=0,fn=Ve=oe=null,Bl=!1,To=0,lr=null,i)throw Error(a(300));e===null||hn||(e=e.dependencies,e!==null&&wl(e)&&(hn=!0))}function Em(e,i,s,o){oe=e;var u=0;do{if(or&&(lr=null),To=0,or=!1,25<=u)throw Error(a(301));if(u+=1,fn=Ve=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}z.H=s0,d=i(s,o)}while(or);return d}function My(){var e=z.H,i=e.useState()[0];return i=typeof i.then=="function"?bo(i):i,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(oe.flags|=1024),i}function lf(){var e=Il!==0;return Il=0,e}function cf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function uf(e){if(Bl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Bl=!1}na=0,fn=Ve=oe=null,or=!1,To=Il=0,lr=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?oe.memoizedState=fn=e:fn=fn.next=e,fn}function on(){if(Ve===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var i=fn===null?oe.memoizedState:fn.next;if(i!==null)fn=i,Ve=e;else{if(e===null)throw oe.alternate===null?Error(a(467)):Error(a(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},fn===null?oe.memoizedState=fn=e:fn=fn.next=e}return fn}function Fl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function bo(e){var i=To;return To+=1,lr===null&&(lr=[]),e=dm(lr,e,i),i=oe,(fn===null?i.memoizedState:fn.next)===null&&(i=i.alternate,z.H=i===null||i.memoizedState===null?a0:Mf),e}function Gl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return bo(e);if(e.$$typeof===L)return Un(e)}throw Error(a(438,String(e)))}function ff(e){var i=null,s=oe.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var o=oe.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Fl(),oe.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),o=0;o<e;o++)s[o]=R;return i.index++,s}function ia(e,i){return typeof i=="function"?i(e):i}function Hl(e){var i=on();return hf(i,Ve,e)}function hf(e,i,s){var o=e.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=s;var u=e.baseQueue,d=o.pending;if(d!==null){if(u!==null){var y=u.next;u.next=d.next,d.next=y}i.baseQueue=u=d,o.pending=null}if(d=e.baseState,u===null)e.memoizedState=d;else{i=u.next;var b=y=null,I=null,et=i,ht=!1;do{var _t=et.lane&-536870913;if(_t!==et.lane?(ve&_t)===_t:(na&_t)===_t){var nt=et.revertLane;if(nt===0)I!==null&&(I=I.next={lane:0,revertLane:0,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null}),_t===nr&&(ht=!0);else if((na&nt)===nt){et=et.next,nt===nr&&(ht=!0);continue}else _t={lane:0,revertLane:et.revertLane,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},I===null?(b=I=_t,y=d):I=I.next=_t,oe.lanes|=nt,Ga|=nt;_t=et.action,bs&&s(d,_t),d=et.hasEagerState?et.eagerState:s(d,_t)}else nt={lane:_t,revertLane:et.revertLane,gesture:et.gesture,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},I===null?(b=I=nt,y=d):I=I.next=nt,oe.lanes|=_t,Ga|=_t;et=et.next}while(et!==null&&et!==i);if(I===null?y=d:I.next=b,!ni(d,e.memoizedState)&&(hn=!0,ht&&(s=ir,s!==null)))throw s;e.memoizedState=d,e.baseState=y,e.baseQueue=I,o.lastRenderedState=d}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function df(e){var i=on(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var o=s.dispatch,u=s.pending,d=i.memoizedState;if(u!==null){s.pending=null;var y=u=u.next;do d=e(d,y.action),y=y.next;while(y!==u);ni(d,i.memoizedState)||(hn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),s.lastRenderedState=d}return[d,o]}function Tm(e,i,s){var o=oe,u=on(),d=Se;if(d){if(s===void 0)throw Error(a(407));s=s()}else s=i();var y=!ni((Ve||u).memoizedState,s);if(y&&(u.memoizedState=s,hn=!0),u=u.queue,gf(Rm.bind(null,o,u,e),[e]),u.getSnapshot!==i||y||fn!==null&&fn.memoizedState.tag&1){if(o.flags|=2048,cr(9,{destroy:void 0},Am.bind(null,o,u,s,i),null),qe===null)throw Error(a(349));d||(na&127)!==0||bm(o,i,s)}return s}function bm(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=oe.updateQueue,i===null?(i=Fl(),oe.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Am(e,i,s,o){i.value=s,i.getSnapshot=o,wm(i)&&Cm(e)}function Rm(e,i,s){return s(function(){wm(i)&&Cm(e)})}function wm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!ni(e,s)}catch{return!0}}function Cm(e){var i=gs(e,2);i!==null&&Jn(i,e,2)}function pf(e){var i=Vn();if(typeof e=="function"){var s=e;if(e=s(),bs){Pt(!0);try{s()}finally{Pt(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ia,lastRenderedState:e},i}function Dm(e,i,s,o){return e.baseState=s,hf(e,Ve,typeof o=="function"?o:ia)}function Ey(e,i,s,o,u){if(Xl(e))throw Error(a(485));if(e=i.action,e!==null){var d={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};z.T!==null?s(!0):d.isTransition=!1,o(d),s=i.pending,s===null?(d.next=i.pending=d,Um(i,d)):(d.next=s.next,i.pending=s.next=d)}}function Um(e,i){var s=i.action,o=i.payload,u=e.state;if(i.isTransition){var d=z.T,y={};z.T=y;try{var b=s(u,o),I=z.S;I!==null&&I(y,b),Lm(e,i,b)}catch(et){mf(e,i,et)}finally{d!==null&&y.types!==null&&(d.types=y.types),z.T=d}}else try{d=s(u,o),Lm(e,i,d)}catch(et){mf(e,i,et)}}function Lm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){Nm(e,i,o)},function(o){return mf(e,i,o)}):Nm(e,i,s)}function Nm(e,i,s){i.status="fulfilled",i.value=s,Om(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Um(e,s)))}function mf(e,i,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=s,Om(i),i=i.next;while(i!==o)}e.action=null}function Om(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Pm(e,i){return i}function zm(e,i){if(Se){var s=qe.formState;if(s!==null){t:{var o=oe;if(Se){if(je){e:{for(var u=je,d=xi;u.nodeType!==8;){if(!d){u=null;break e}if(u=Si(u.nextSibling),u===null){u=null;break e}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){je=Si(u.nextSibling),o=u.data==="F!";break t}}Ua(o)}o=!1}o&&(i=s[0])}}return s=Vn(),s.memoizedState=s.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pm,lastRenderedState:i},s.queue=o,s=e0.bind(null,oe,o),o.dispatch=s,o=pf(!1),d=Sf.bind(null,oe,!1,o.queue),o=Vn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,s=Ey.bind(null,oe,u,d,s),u.dispatch=s,o.memoizedState=e,[i,s,!1]}function Bm(e){var i=on();return Im(i,Ve,e)}function Im(e,i,s){if(i=hf(e,i,Pm)[0],e=Hl(ia)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=bo(i)}catch(y){throw y===ar?Ul:y}else o=i;i=on();var u=i.queue,d=u.dispatch;return s!==i.memoizedState&&(oe.flags|=2048,cr(9,{destroy:void 0},Ty.bind(null,u,s),null)),[o,d,e]}function Ty(e,i){e.action=i}function Fm(e){var i=on(),s=Ve;if(s!==null)return Im(i,s,e);on(),i=i.memoizedState,s=on();var o=s.queue.dispatch;return s.memoizedState=e,[i,o,!1]}function cr(e,i,s,o){return e={tag:e,create:s,deps:o,inst:i,next:null},i=oe.updateQueue,i===null&&(i=Fl(),oe.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,i.lastEffect=e),e}function Gm(){return on().memoizedState}function Vl(e,i,s,o){var u=Vn();oe.flags|=e,u.memoizedState=cr(1|i,{destroy:void 0},s,o===void 0?null:o)}function kl(e,i,s,o){var u=on();o=o===void 0?null:o;var d=u.memoizedState.inst;Ve!==null&&o!==null&&rf(o,Ve.memoizedState.deps)?u.memoizedState=cr(i,d,s,o):(oe.flags|=e,u.memoizedState=cr(1|i,d,s,o))}function Hm(e,i){Vl(8390656,8,e,i)}function gf(e,i){kl(2048,8,e,i)}function by(e){oe.flags|=4;var i=oe.updateQueue;if(i===null)i=Fl(),oe.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function Vm(e){var i=on().memoizedState;return by({ref:i,nextImpl:e}),function(){if((Le&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function km(e,i){return kl(4,2,e,i)}function Xm(e,i){return kl(4,4,e,i)}function qm(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function Wm(e,i,s){s=s!=null?s.concat([e]):null,kl(4,4,qm.bind(null,i,e),s)}function _f(){}function Ym(e,i){var s=on();i=i===void 0?null:i;var o=s.memoizedState;return i!==null&&rf(i,o[1])?o[0]:(s.memoizedState=[e,i],e)}function jm(e,i){var s=on();i=i===void 0?null:i;var o=s.memoizedState;if(i!==null&&rf(i,o[1]))return o[0];if(o=e(),bs){Pt(!0);try{e()}finally{Pt(!1)}}return s.memoizedState=[o,i],o}function vf(e,i,s){return s===void 0||(na&1073741824)!==0&&(ve&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=Z0(),oe.lanes|=e,Ga|=e,s)}function Zm(e,i,s,o){return ni(s,i)?s:rr.current!==null?(e=vf(e,s,o),ni(e,i)||(hn=!0),e):(na&42)===0||(na&1073741824)!==0&&(ve&261930)===0?(hn=!0,e.memoizedState=s):(e=Z0(),oe.lanes|=e,Ga|=e,i)}function Km(e,i,s,o,u){var d=Q.p;Q.p=d!==0&&8>d?d:8;var y=z.T,b={};z.T=b,Sf(e,!1,i,s);try{var I=u(),et=z.S;if(et!==null&&et(b,I),I!==null&&typeof I=="object"&&typeof I.then=="function"){var ht=yy(I,o);Ao(e,i,ht,li(e))}else Ao(e,i,o,li(e))}catch(_t){Ao(e,i,{then:function(){},status:"rejected",reason:_t},li())}finally{Q.p=d,y!==null&&b.types!==null&&(y.types=b.types),z.T=y}}function Ay(){}function xf(e,i,s,o){if(e.tag!==5)throw Error(a(476));var u=Qm(e).queue;Km(e,u,i,K,s===null?Ay:function(){return Jm(e),s(o)})}function Qm(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ia,lastRenderedState:K},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ia,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function Jm(e){var i=Qm(e);i.next===null&&(i=e.alternate.memoizedState),Ao(e,i.next.queue,{},li())}function yf(){return Un(ko)}function $m(){return on().memoizedState}function t0(){return on().memoizedState}function Ry(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=li();e=Oa(s);var o=Pa(i,e,s);o!==null&&(Jn(o,i,s),So(o,i,s)),i={cache:ju()},e.payload=i;return}i=i.return}}function wy(e,i,s){var o=li();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Xl(e)?n0(i,s):(s=Bu(e,i,s,o),s!==null&&(Jn(s,e,o),i0(s,i,o)))}function e0(e,i,s){var o=li();Ao(e,i,s,o)}function Ao(e,i,s,o){var u={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Xl(e))n0(i,u);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var y=i.lastRenderedState,b=d(y,s);if(u.hasEagerState=!0,u.eagerState=b,ni(b,y))return Tl(e,i,u,0),qe===null&&El(),!1}catch{}finally{}if(s=Bu(e,i,u,o),s!==null)return Jn(s,e,o),i0(s,i,o),!0}return!1}function Sf(e,i,s,o){if(o={lane:2,revertLane:$f(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Xl(e)){if(i)throw Error(a(479))}else i=Bu(e,s,o,2),i!==null&&Jn(i,e,2)}function Xl(e){var i=e.alternate;return e===oe||i!==null&&i===oe}function n0(e,i){or=Bl=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function i0(e,i,s){if((s&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,no(e,s)}}var Ro={readContext:Un,use:Gl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};Ro.useEffectEvent=nn;var a0={readContext:Un,use:Gl,useCallback:function(e,i){return Vn().memoizedState=[e,i===void 0?null:i],e},useContext:Un,useEffect:Hm,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,Vl(4194308,4,qm.bind(null,i,e),s)},useLayoutEffect:function(e,i){return Vl(4194308,4,e,i)},useInsertionEffect:function(e,i){Vl(4,2,e,i)},useMemo:function(e,i){var s=Vn();i=i===void 0?null:i;var o=e();if(bs){Pt(!0);try{e()}finally{Pt(!1)}}return s.memoizedState=[o,i],o},useReducer:function(e,i,s){var o=Vn();if(s!==void 0){var u=s(i);if(bs){Pt(!0);try{s(i)}finally{Pt(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=wy.bind(null,oe,e),[o.memoizedState,e]},useRef:function(e){var i=Vn();return e={current:e},i.memoizedState=e},useState:function(e){e=pf(e);var i=e.queue,s=e0.bind(null,oe,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:_f,useDeferredValue:function(e,i){var s=Vn();return vf(s,e,i)},useTransition:function(){var e=pf(!1);return e=Km.bind(null,oe,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var o=oe,u=Vn();if(Se){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),qe===null)throw Error(a(349));(ve&127)!==0||bm(o,i,s)}u.memoizedState=s;var d={value:s,getSnapshot:i};return u.queue=d,Hm(Rm.bind(null,o,d,e),[e]),o.flags|=2048,cr(9,{destroy:void 0},Am.bind(null,o,d,s,i),null),s},useId:function(){var e=Vn(),i=qe.identifierPrefix;if(Se){var s=Vi,o=Hi;s=(o&~(1<<32-te(o)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Il++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=Sy++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:yf,useFormState:zm,useActionState:zm,useOptimistic:function(e){var i=Vn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Sf.bind(null,oe,!0,s),s.dispatch=i,[e,i]},useMemoCache:ff,useCacheRefresh:function(){return Vn().memoizedState=Ry.bind(null,oe)},useEffectEvent:function(e){var i=Vn(),s={impl:e};return i.memoizedState=s,function(){if((Le&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Mf={readContext:Un,use:Gl,useCallback:Ym,useContext:Un,useEffect:gf,useImperativeHandle:Wm,useInsertionEffect:km,useLayoutEffect:Xm,useMemo:jm,useReducer:Hl,useRef:Gm,useState:function(){return Hl(ia)},useDebugValue:_f,useDeferredValue:function(e,i){var s=on();return Zm(s,Ve.memoizedState,e,i)},useTransition:function(){var e=Hl(ia)[0],i=on().memoizedState;return[typeof e=="boolean"?e:bo(e),i]},useSyncExternalStore:Tm,useId:$m,useHostTransitionStatus:yf,useFormState:Bm,useActionState:Bm,useOptimistic:function(e,i){var s=on();return Dm(s,Ve,e,i)},useMemoCache:ff,useCacheRefresh:t0};Mf.useEffectEvent=Vm;var s0={readContext:Un,use:Gl,useCallback:Ym,useContext:Un,useEffect:gf,useImperativeHandle:Wm,useInsertionEffect:km,useLayoutEffect:Xm,useMemo:jm,useReducer:df,useRef:Gm,useState:function(){return df(ia)},useDebugValue:_f,useDeferredValue:function(e,i){var s=on();return Ve===null?vf(s,e,i):Zm(s,Ve.memoizedState,e,i)},useTransition:function(){var e=df(ia)[0],i=on().memoizedState;return[typeof e=="boolean"?e:bo(e),i]},useSyncExternalStore:Tm,useId:$m,useHostTransitionStatus:yf,useFormState:Fm,useActionState:Fm,useOptimistic:function(e,i){var s=on();return Ve!==null?Dm(s,Ve,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:ff,useCacheRefresh:t0};s0.useEffectEvent=Vm;function Ef(e,i,s,o){i=e.memoizedState,s=s(o,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Tf={enqueueSetState:function(e,i,s){e=e._reactInternals;var o=li(),u=Oa(o);u.payload=i,s!=null&&(u.callback=s),i=Pa(e,u,o),i!==null&&(Jn(i,e,o),So(i,e,o))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var o=li(),u=Oa(o);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=Pa(e,u,o),i!==null&&(Jn(i,e,o),So(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=li(),o=Oa(s);o.tag=2,i!=null&&(o.callback=i),i=Pa(e,o,s),i!==null&&(Jn(i,e,s),So(i,e,s))}};function r0(e,i,s,o,u,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,d,y):i.prototype&&i.prototype.isPureReactComponent?!ho(s,o)||!ho(u,d):!0}function o0(e,i,s,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,o),i.state!==e&&Tf.enqueueReplaceState(i,i.state,null)}function As(e,i){var s=i;if("ref"in i){s={};for(var o in i)o!=="ref"&&(s[o]=i[o])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}function l0(e){Ml(e)}function c0(e){console.error(e)}function u0(e){Ml(e)}function ql(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function f0(e,i,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function bf(e,i,s){return s=Oa(s),s.tag=3,s.payload={element:null},s.callback=function(){ql(e,i)},s}function h0(e){return e=Oa(e),e.tag=3,e}function d0(e,i,s,o){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;e.payload=function(){return u(d)},e.callback=function(){f0(i,s,o)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){f0(i,s,o),typeof u!="function"&&(Ha===null?Ha=new Set([this]):Ha.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function Cy(e,i,s,o,u){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=s.alternate,i!==null&&er(i,s,u,!0),s=ai.current,s!==null){switch(s.tag){case 31:case 13:return yi===null?ic():s.alternate===null&&an===0&&(an=3),s.flags&=-257,s.flags|=65536,s.lanes=u,o===Ll?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([o]):i.add(o),Kf(e,o,u)),!1;case 22:return s.flags|=65536,o===Ll?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([o]):s.add(o)),Kf(e,o,u)),!1}throw Error(a(435,s.tag))}return Kf(e,o,u),ic(),!1}if(Se)return i=ai.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==ku&&(e=Error(a(422),{cause:o}),go(gi(e,s)))):(o!==ku&&(i=Error(a(423),{cause:o}),go(gi(i,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=gi(o,s),u=bf(e.stateNode,o,u),tf(e,u),an!==4&&(an=2)),!1;var d=Error(a(520),{cause:o});if(d=gi(d,s),Po===null?Po=[d]:Po.push(d),an!==4&&(an=2),i===null)return!0;o=gi(o,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=bf(s.stateNode,o,e),tf(s,e),!1;case 1:if(i=s.type,d=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Ha===null||!Ha.has(d))))return s.flags|=65536,u&=-u,s.lanes|=u,u=h0(u),d0(u,e,s,o),tf(s,u),!1}s=s.return}while(s!==null);return!1}var Af=Error(a(461)),hn=!1;function Ln(e,i,s,o){i.child=e===null?_m(i,null,s,o):Ts(i,e.child,s,o)}function p0(e,i,s,o,u){s=s.render;var d=i.ref;if("ref"in o){var y={};for(var b in o)b!=="ref"&&(y[b]=o[b])}else y=o;return ys(i),o=of(e,i,s,y,d,u),b=lf(),e!==null&&!hn?(cf(e,i,u),aa(e,i,u)):(Se&&b&&Hu(i),i.flags|=1,Ln(e,i,o,u),i.child)}function m0(e,i,s,o,u){if(e===null){var d=s.type;return typeof d=="function"&&!Iu(d)&&d.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=d,g0(e,i,d,o,u)):(e=Al(s.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!Of(e,u)){var y=d.memoizedProps;if(s=s.compare,s=s!==null?s:ho,s(y,o)&&e.ref===i.ref)return aa(e,i,u)}return i.flags|=1,e=Ji(d,o),e.ref=i.ref,e.return=i,i.child=e}function g0(e,i,s,o,u){if(e!==null){var d=e.memoizedProps;if(ho(d,o)&&e.ref===i.ref)if(hn=!1,i.pendingProps=o=d,Of(e,u))(e.flags&131072)!==0&&(hn=!0);else return i.lanes=e.lanes,aa(e,i,u)}return Rf(e,i,s,o,u)}function _0(e,i,s,o){var u=o.children,d=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|s:s,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,i.child=null;return v0(e,i,d,s,o)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Dl(i,d!==null?d.cachePool:null),d!==null?ym(i,d):nf(),Sm(i);else return o=i.lanes=536870912,v0(e,i,d!==null?d.baseLanes|s:s,s,o)}else d!==null?(Dl(i,d.cachePool),ym(i,d),Ba(),i.memoizedState=null):(e!==null&&Dl(i,null),nf(),Ba());return Ln(e,i,u,s),i.child}function wo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function v0(e,i,s,o,u){var d=Ku();return d=d===null?null:{parent:un._currentValue,pool:d},i.memoizedState={baseLanes:s,cachePool:d},e!==null&&Dl(i,null),nf(),Sm(i),e!==null&&er(e,i,o,!0),i.childLanes=u,null}function Wl(e,i){return i=jl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function x0(e,i,s){return Ts(i,e.child,null,s),e=Wl(i,i.pendingProps),e.flags|=2,si(i),i.memoizedState=null,e}function Dy(e,i,s){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Se){if(o.mode==="hidden")return e=Wl(i,o),i.lanes=536870912,wo(null,e);if(sf(i),(e=je)?(e=Ug(e,xi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ca!==null?{id:Hi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},s=nm(e),s.return=i,i.child=s,Dn=i,je=null)):e=null,e===null)throw Ua(i);return i.lanes=536870912,null}return Wl(i,o)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(sf(i),u)if(i.flags&256)i.flags&=-257,i=x0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(hn||er(e,i,s,!1),u=(s&e.childLanes)!==0,hn||u){if(o=qe,o!==null&&(y=Gi(o,s),y!==0&&y!==d.retryLane))throw d.retryLane=y,gs(e,y),Jn(o,e,y),Af;ic(),i=x0(e,i,s)}else e=d.treeContext,je=Si(y.nextSibling),Dn=i,Se=!0,Da=null,xi=!1,e!==null&&sm(i,e),i=Wl(i,o),i.flags|=4096;return i}return e=Ji(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Yl(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function Rf(e,i,s,o,u){return ys(i),s=of(e,i,s,o,void 0,u),o=lf(),e!==null&&!hn?(cf(e,i,u),aa(e,i,u)):(Se&&o&&Hu(i),i.flags|=1,Ln(e,i,s,u),i.child)}function y0(e,i,s,o,u,d){return ys(i),i.updateQueue=null,s=Em(i,o,s,u),Mm(e),o=lf(),e!==null&&!hn?(cf(e,i,d),aa(e,i,d)):(Se&&o&&Hu(i),i.flags|=1,Ln(e,i,s,d),i.child)}function S0(e,i,s,o,u){if(ys(i),i.stateNode===null){var d=Qs,y=s.contextType;typeof y=="object"&&y!==null&&(d=Un(y)),d=new s(o,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Tf,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=o,d.state=i.memoizedState,d.refs={},Ju(i),y=s.contextType,d.context=typeof y=="object"&&y!==null?Un(y):Qs,d.state=i.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(Ef(i,s,y,o),d.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Tf.enqueueReplaceState(d,d.state,null),Eo(i,o,d,u),Mo(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){d=i.stateNode;var b=i.memoizedProps,I=As(s,b);d.props=I;var et=d.context,ht=s.contextType;y=Qs,typeof ht=="object"&&ht!==null&&(y=Un(ht));var _t=s.getDerivedStateFromProps;ht=typeof _t=="function"||typeof d.getSnapshotBeforeUpdate=="function",b=i.pendingProps!==b,ht||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(b||et!==y)&&o0(i,d,o,y),Na=!1;var nt=i.memoizedState;d.state=nt,Eo(i,o,d,u),Mo(),et=i.memoizedState,b||nt!==et||Na?(typeof _t=="function"&&(Ef(i,s,_t,o),et=i.memoizedState),(I=Na||r0(i,s,I,o,nt,et,y))?(ht||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=et),d.props=o,d.state=et,d.context=y,o=I):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{d=i.stateNode,$u(e,i),y=i.memoizedProps,ht=As(s,y),d.props=ht,_t=i.pendingProps,nt=d.context,et=s.contextType,I=Qs,typeof et=="object"&&et!==null&&(I=Un(et)),b=s.getDerivedStateFromProps,(et=typeof b=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==_t||nt!==I)&&o0(i,d,o,I),Na=!1,nt=i.memoizedState,d.state=nt,Eo(i,o,d,u),Mo();var lt=i.memoizedState;y!==_t||nt!==lt||Na||e!==null&&e.dependencies!==null&&wl(e.dependencies)?(typeof b=="function"&&(Ef(i,s,b,o),lt=i.memoizedState),(ht=Na||r0(i,s,ht,o,nt,lt,I)||e!==null&&e.dependencies!==null&&wl(e.dependencies))?(et||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,lt,I),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,lt,I)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=lt),d.props=o,d.state=lt,d.context=I,o=ht):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(i.flags|=1024),o=!1)}return d=o,Yl(e,i),o=(i.flags&128)!==0,d||o?(d=i.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&o?(i.child=Ts(i,e.child,null,u),i.child=Ts(i,null,s,u)):Ln(e,i,s,u),i.memoizedState=d.state,e=i.child):e=aa(e,i,u),e}function M0(e,i,s,o){return vs(),i.flags|=256,Ln(e,i,s,o),i.child}var wf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cf(e){return{baseLanes:e,cachePool:fm()}}function Df(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=oi),e}function E0(e,i,s){var o=i.pendingProps,u=!1,d=(i.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(rn.current&2)!==0),y&&(u=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Se){if(u?za(i):Ba(),(e=je)?(e=Ug(e,xi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ca!==null?{id:Hi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},s=nm(e),s.return=i,i.child=s,Dn=i,je=null)):e=null,e===null)throw Ua(i);return hh(e)?i.lanes=32:i.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Ba(),u=i.mode,b=jl({mode:"hidden",children:b},u),o=_s(o,u,s,null),b.return=i,o.return=i,b.sibling=o,i.child=b,o=i.child,o.memoizedState=Cf(s),o.childLanes=Df(e,y,s),i.memoizedState=wf,wo(null,o)):(za(i),Uf(i,b))}var I=e.memoizedState;if(I!==null&&(b=I.dehydrated,b!==null)){if(d)i.flags&256?(za(i),i.flags&=-257,i=Lf(e,i,s)):i.memoizedState!==null?(Ba(),i.child=e.child,i.flags|=128,i=null):(Ba(),b=o.fallback,u=i.mode,o=jl({mode:"visible",children:o.children},u),b=_s(b,u,s,null),b.flags|=2,o.return=i,b.return=i,o.sibling=b,i.child=o,Ts(i,e.child,null,s),o=i.child,o.memoizedState=Cf(s),o.childLanes=Df(e,y,s),i.memoizedState=wf,i=wo(null,o));else if(za(i),hh(b)){if(y=b.nextSibling&&b.nextSibling.dataset,y)var et=y.dgst;y=et,o=Error(a(419)),o.stack="",o.digest=y,go({value:o,source:null,stack:null}),i=Lf(e,i,s)}else if(hn||er(e,i,s,!1),y=(s&e.childLanes)!==0,hn||y){if(y=qe,y!==null&&(o=Gi(y,s),o!==0&&o!==I.retryLane))throw I.retryLane=o,gs(e,o),Jn(y,e,o),Af;fh(b)||ic(),i=Lf(e,i,s)}else fh(b)?(i.flags|=192,i.child=e.child,i=null):(e=I.treeContext,je=Si(b.nextSibling),Dn=i,Se=!0,Da=null,xi=!1,e!==null&&sm(i,e),i=Uf(i,o.children),i.flags|=4096);return i}return u?(Ba(),b=o.fallback,u=i.mode,I=e.child,et=I.sibling,o=Ji(I,{mode:"hidden",children:o.children}),o.subtreeFlags=I.subtreeFlags&65011712,et!==null?b=Ji(et,b):(b=_s(b,u,s,null),b.flags|=2),b.return=i,o.return=i,o.sibling=b,i.child=o,wo(null,o),o=i.child,b=e.child.memoizedState,b===null?b=Cf(s):(u=b.cachePool,u!==null?(I=un._currentValue,u=u.parent!==I?{parent:I,pool:I}:u):u=fm(),b={baseLanes:b.baseLanes|s,cachePool:u}),o.memoizedState=b,o.childLanes=Df(e,y,s),i.memoizedState=wf,wo(e.child,o)):(za(i),s=e.child,e=s.sibling,s=Ji(s,{mode:"visible",children:o.children}),s.return=i,s.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=s,i.memoizedState=null,s)}function Uf(e,i){return i=jl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function jl(e,i){return e=ii(22,e,null,i),e.lanes=0,e}function Lf(e,i,s){return Ts(i,e.child,null,s),e=Uf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function T0(e,i,s){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),Wu(e.return,i,s)}function Nf(e,i,s,o,u,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:u,treeForkCount:d}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=s,y.tailMode=u,y.treeForkCount=d)}function b0(e,i,s){var o=i.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var y=rn.current,b=(y&2)!==0;if(b?(y=y&1|2,i.flags|=128):y&=1,yt(rn,y),Ln(e,i,o,s),o=Se?mo:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&T0(e,s,i);else if(e.tag===19)T0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(s=i.child,u=null;s!==null;)e=s.alternate,e!==null&&zl(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),Nf(i,!1,u,s,d,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&zl(e)===null){i.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}Nf(i,!0,s,null,d,o);break;case"together":Nf(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function aa(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),Ga|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(er(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=Ji(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=Ji(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Of(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&wl(e)))}function Uy(e,i,s){switch(i.tag){case 3:Vt(i,i.stateNode.containerInfo),La(i,un,e.memoizedState.cache),vs();break;case 27:case 5:ae(i);break;case 4:Vt(i,i.stateNode.containerInfo);break;case 10:La(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,sf(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(za(i),i.flags|=128,null):(s&i.child.childLanes)!==0?E0(e,i,s):(za(i),e=aa(e,i,s),e!==null?e.sibling:null);za(i);break;case 19:var u=(e.flags&128)!==0;if(o=(s&i.childLanes)!==0,o||(er(e,i,s,!1),o=(s&i.childLanes)!==0),u){if(o)return b0(e,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),yt(rn,rn.current),o)break;return null;case 22:return i.lanes=0,_0(e,i,s,i.pendingProps);case 24:La(i,un,e.memoizedState.cache)}return aa(e,i,s)}function A0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)hn=!0;else{if(!Of(e,s)&&(i.flags&128)===0)return hn=!1,Uy(e,i,s);hn=(e.flags&131072)!==0}else hn=!1,Se&&(i.flags&1048576)!==0&&am(i,mo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=Ms(i.elementType),i.type=e,typeof e=="function")Iu(e)?(o=As(e,o),i.tag=1,i=S0(null,i,e,o,s)):(i.tag=0,i=Rf(null,i,e,o,s));else{if(e!=null){var u=e.$$typeof;if(u===w){i.tag=11,i=p0(null,i,e,o,s);break t}else if(u===O){i.tag=14,i=m0(null,i,e,o,s);break t}}throw i=ut(e)||e,Error(a(306,i,""))}}return i;case 0:return Rf(e,i,i.type,i.pendingProps,s);case 1:return o=i.type,u=As(o,i.pendingProps),S0(e,i,o,u,s);case 3:t:{if(Vt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));o=i.pendingProps;var d=i.memoizedState;u=d.element,$u(e,i),Eo(i,o,null,s);var y=i.memoizedState;if(o=y.cache,La(i,un,o),o!==d.cache&&Yu(i,[un],s,!0),Mo(),o=y.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=M0(e,i,o,s);break t}else if(o!==u){u=gi(Error(a(424)),i),go(u),i=M0(e,i,o,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(je=Si(e.firstChild),Dn=i,Se=!0,Da=null,xi=!0,s=_m(i,null,o,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(vs(),o===u){i=aa(e,i,s);break t}Ln(e,i,o,s)}i=i.child}return i;case 26:return Yl(e,i),e===null?(s=Bg(i.type,null,i.pendingProps,null))?i.memoizedState=s:Se||(s=i.type,e=i.pendingProps,o=uc(Et.current).createElement(s),o[en]=i,o[wn]=e,Nn(o,s,e),Ut(o),i.stateNode=o):i.memoizedState=Bg(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return ae(i),e===null&&Se&&(o=i.stateNode=Og(i.type,i.pendingProps,Et.current),Dn=i,xi=!0,u=je,qa(i.type)?(dh=u,je=Si(o.firstChild)):je=u),Ln(e,i,i.pendingProps.children,s),Yl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Se&&((u=o=je)&&(o=oS(o,i.type,i.pendingProps,xi),o!==null?(i.stateNode=o,Dn=i,je=Si(o.firstChild),xi=!1,u=!0):u=!1),u||Ua(i)),ae(i),u=i.type,d=i.pendingProps,y=e!==null?e.memoizedProps:null,o=d.children,lh(u,d)?o=null:y!==null&&lh(u,y)&&(i.flags|=32),i.memoizedState!==null&&(u=of(e,i,My,null,null,s),ko._currentValue=u),Yl(e,i),Ln(e,i,o,s),i.child;case 6:return e===null&&Se&&((e=s=je)&&(s=lS(s,i.pendingProps,xi),s!==null?(i.stateNode=s,Dn=i,je=null,e=!0):e=!1),e||Ua(i)),null;case 13:return E0(e,i,s);case 4:return Vt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=Ts(i,null,o,s):Ln(e,i,o,s),i.child;case 11:return p0(e,i,i.type,i.pendingProps,s);case 7:return Ln(e,i,i.pendingProps,s),i.child;case 8:return Ln(e,i,i.pendingProps.children,s),i.child;case 12:return Ln(e,i,i.pendingProps.children,s),i.child;case 10:return o=i.pendingProps,La(i,i.type,o.value),Ln(e,i,o.children,s),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,ys(i),u=Un(u),o=o(u),i.flags|=1,Ln(e,i,o,s),i.child;case 14:return m0(e,i,i.type,i.pendingProps,s);case 15:return g0(e,i,i.type,i.pendingProps,s);case 19:return b0(e,i,s);case 31:return Dy(e,i,s);case 22:return _0(e,i,s,i.pendingProps);case 24:return ys(i),o=Un(un),e===null?(u=Ku(),u===null&&(u=qe,d=ju(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=s),u=d),i.memoizedState={parent:o,cache:u},Ju(i),La(i,un,u)):((e.lanes&s)!==0&&($u(e,i),Eo(i,null,null,s),Mo()),u=e.memoizedState,d=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),La(i,un,o)):(o=d.cache,La(i,un,o),o!==u.cache&&Yu(i,[un],s,!0))),Ln(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function sa(e){e.flags|=4}function Pf(e,i,s,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if($0())e.flags|=8192;else throw Es=Ll,Qu}else e.flags&=-16777217}function R0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Vg(i))if($0())e.flags|=8192;else throw Es=Ll,Qu}function Zl(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?_n():536870912,e.lanes|=i,dr|=i)}function Co(e,i){if(!Se)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ze(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(i)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=s,i}function Ly(e,i,s){var o=i.pendingProps;switch(Vu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(i),null;case 1:return Ze(i),null;case 3:return s=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),ea(un),Ht(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(tr(i)?sa(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Xu())),Ze(i),null;case 26:var u=i.type,d=i.memoizedState;return e===null?(sa(i),d!==null?(Ze(i),R0(i,d)):(Ze(i),Pf(i,u,null,o,s))):d?d!==e.memoizedState?(sa(i),Ze(i),R0(i,d)):(Ze(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&sa(i),Ze(i),Pf(i,u,e,o,s)),null;case 27:if(Fe(i),s=Et.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&sa(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return Ze(i),null}e=j.current,tr(i)?rm(i):(e=Og(u,o,s),i.stateNode=e,sa(i))}return Ze(i),null;case 5:if(Fe(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&sa(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return Ze(i),null}if(d=j.current,tr(i))rm(i);else{var y=uc(Et.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}d[en]=i,d[wn]=o;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=d;t:switch(Nn(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&sa(i)}}return Ze(i),Pf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&sa(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(a(166));if(e=Et.current,tr(i)){if(e=i.stateNode,s=i.memoizedProps,o=null,u=Dn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[en]=i,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||Eg(e.nodeValue,s)),e||Ua(i,!0)}else e=uc(e).createTextNode(o),e[en]=i,i.stateNode=e}return Ze(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(o=tr(i),s!==null){if(e===null){if(!o)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[en]=i}else vs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ze(i),e=!1}else s=Xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(si(i),i):(si(i),null);if((i.flags&128)!==0)throw Error(a(558))}return Ze(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=tr(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[en]=i}else vs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ze(i),u=!1}else u=Xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(si(i),i):(si(i),null)}return si(i),(i.flags&128)!==0?(i.lanes=s,i):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),Zl(i,i.updateQueue),Ze(i),null);case 4:return Ht(),e===null&&ih(i.stateNode.containerInfo),Ze(i),null;case 10:return ea(i.type),Ze(i),null;case 19:if(st(rn),o=i.memoizedState,o===null)return Ze(i),null;if(u=(i.flags&128)!==0,d=o.rendering,d===null)if(u)Co(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=zl(e),d!==null){for(i.flags|=128,Co(o,!1),e=d.updateQueue,i.updateQueue=e,Zl(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)em(s,e),s=s.sibling;return yt(rn,rn.current&1|2),Se&&$i(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&dt()>tc&&(i.flags|=128,u=!0,Co(o,!1),i.lanes=4194304)}else{if(!u)if(e=zl(d),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,Zl(i,e),Co(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Se)return Ze(i),null}else 2*dt()-o.renderingStartTime>tc&&s!==536870912&&(i.flags|=128,u=!0,Co(o,!1),i.lanes=4194304);o.isBackwards?(d.sibling=i.child,i.child=d):(e=o.last,e!==null?e.sibling=d:i.child=d,o.last=d)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=dt(),e.sibling=null,s=rn.current,yt(rn,u?s&1|2:s&1),Se&&$i(i,o.treeForkCount),e):(Ze(i),null);case 22:case 23:return si(i),af(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(s&536870912)!==0&&(i.flags&128)===0&&(Ze(i),i.subtreeFlags&6&&(i.flags|=8192)):Ze(i),s=i.updateQueue,s!==null&&Zl(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==s&&(i.flags|=2048),e!==null&&st(Ss),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),ea(un),Ze(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function Ny(e,i){switch(Vu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return ea(un),Ht(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Fe(i),null;case 31:if(i.memoizedState!==null){if(si(i),i.alternate===null)throw Error(a(340));vs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(si(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));vs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return st(rn),null;case 4:return Ht(),null;case 10:return ea(i.type),null;case 22:case 23:return si(i),af(),e!==null&&st(Ss),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return ea(un),null;case 25:return null;default:return null}}function w0(e,i){switch(Vu(i),i.tag){case 3:ea(un),Ht();break;case 26:case 27:case 5:Fe(i);break;case 4:Ht();break;case 31:i.memoizedState!==null&&si(i);break;case 13:si(i);break;case 19:st(rn);break;case 10:ea(i.type);break;case 22:case 23:si(i),af(),e!==null&&st(Ss);break;case 24:ea(un)}}function Do(e,i){try{var s=i.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var u=o.next;s=u;do{if((s.tag&e)===e){o=void 0;var d=s.create,y=s.inst;o=d(),y.destroy=o}s=s.next}while(s!==u)}}catch(b){Be(i,i.return,b)}}function Ia(e,i,s){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&e)===e){var y=o.inst,b=y.destroy;if(b!==void 0){y.destroy=void 0,u=i;var I=s,et=b;try{et()}catch(ht){Be(u,I,ht)}}}o=o.next}while(o!==d)}}catch(ht){Be(i,i.return,ht)}}function C0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{xm(i,s)}catch(o){Be(e,e.return,o)}}}function D0(e,i,s){s.props=As(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){Be(e,i,o)}}function Uo(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(u){Be(e,i,u)}}function ki(e,i){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(u){Be(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Be(e,i,u)}else s.current=null}function U0(e){var i=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(u){Be(e,e.return,u)}}function zf(e,i,s){try{var o=e.stateNode;eS(o,e.type,s,i),o[wn]=i}catch(u){Be(e,e.return,u)}}function L0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&qa(e.type)||e.tag===4}function Bf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||L0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&qa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function If(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Ki));else if(o!==4&&(o===27&&qa(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(If(e,i,s),e=e.sibling;e!==null;)If(e,i,s),e=e.sibling}function Kl(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(o!==4&&(o===27&&qa(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(Kl(e,i,s),e=e.sibling;e!==null;)Kl(e,i,s),e=e.sibling}function N0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Nn(i,o,s),i[en]=e,i[wn]=s}catch(d){Be(e,e.return,d)}}var ra=!1,dn=!1,Ff=!1,O0=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function Oy(e,i){if(e=e.containerInfo,rh=_c,e=Wp(e),Uu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{s.nodeType,d.nodeType}catch{s=null;break t}var y=0,b=-1,I=-1,et=0,ht=0,_t=e,nt=null;e:for(;;){for(var lt;_t!==s||u!==0&&_t.nodeType!==3||(b=y+u),_t!==d||o!==0&&_t.nodeType!==3||(I=y+o),_t.nodeType===3&&(y+=_t.nodeValue.length),(lt=_t.firstChild)!==null;)nt=_t,_t=lt;for(;;){if(_t===e)break e;if(nt===s&&++et===u&&(b=y),nt===d&&++ht===o&&(I=y),(lt=_t.nextSibling)!==null)break;_t=nt,nt=_t.parentNode}_t=lt}s=b===-1||I===-1?null:{start:b,end:I}}else s=null}s=s||{start:0,end:0}}else s=null;for(oh={focusedElem:e,selectionRange:s},_c=!1,Tn=i;Tn!==null;)if(i=Tn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Tn=e;else for(;Tn!==null;){switch(i=Tn,d=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)u=e[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,s=i,u=d.memoizedProps,d=d.memoizedState,o=s.stateNode;try{var Ft=As(s.type,u);e=o.getSnapshotBeforeUpdate(Ft,d),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){Be(s,s.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)uh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":uh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Tn=e;break}Tn=i.return}}function P0(e,i,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:la(e,s),o&4&&Do(5,s);break;case 1:if(la(e,s),o&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(y){Be(s,s.return,y)}else{var u=As(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Be(s,s.return,y)}}o&64&&C0(s),o&512&&Uo(s,s.return);break;case 3:if(la(e,s),o&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{xm(e,i)}catch(y){Be(s,s.return,y)}}break;case 27:i===null&&o&4&&N0(s);case 26:case 5:la(e,s),i===null&&o&4&&U0(s),o&512&&Uo(s,s.return);break;case 12:la(e,s);break;case 31:la(e,s),o&4&&I0(e,s);break;case 13:la(e,s),o&4&&F0(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=ky.bind(null,s),cS(e,s))));break;case 22:if(o=s.memoizedState!==null||ra,!o){i=i!==null&&i.memoizedState!==null||dn,u=ra;var d=dn;ra=o,(dn=i)&&!d?ca(e,s,(s.subtreeFlags&8772)!==0):la(e,s),ra=u,dn=d}break;case 30:break;default:la(e,s)}}function z0(e){var i=e.alternate;i!==null&&(e.alternate=null,z0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&ot(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,jn=!1;function oa(e,i,s){for(s=s.child;s!==null;)B0(e,i,s),s=s.sibling}function B0(e,i,s){if(Yt&&typeof Yt.onCommitFiberUnmount=="function")try{Yt.onCommitFiberUnmount(Kt,s)}catch{}switch(s.tag){case 26:dn||ki(s,i),oa(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:dn||ki(s,i);var o=$e,u=jn;qa(s.type)&&($e=s.stateNode,jn=!1),oa(e,i,s),Go(s.stateNode),$e=o,jn=u;break;case 5:dn||ki(s,i);case 6:if(o=$e,u=jn,$e=null,oa(e,i,s),$e=o,jn=u,$e!==null)if(jn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(s.stateNode)}catch(d){Be(s,i,d)}else try{$e.removeChild(s.stateNode)}catch(d){Be(s,i,d)}break;case 18:$e!==null&&(jn?(e=$e,Cg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Sr(e)):Cg($e,s.stateNode));break;case 4:o=$e,u=jn,$e=s.stateNode.containerInfo,jn=!0,oa(e,i,s),$e=o,jn=u;break;case 0:case 11:case 14:case 15:Ia(2,s,i),dn||Ia(4,s,i),oa(e,i,s);break;case 1:dn||(ki(s,i),o=s.stateNode,typeof o.componentWillUnmount=="function"&&D0(s,i,o)),oa(e,i,s);break;case 21:oa(e,i,s);break;case 22:dn=(o=dn)||s.memoizedState!==null,oa(e,i,s),dn=o;break;default:oa(e,i,s)}}function I0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Sr(e)}catch(s){Be(i,i.return,s)}}}function F0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Sr(e)}catch(s){Be(i,i.return,s)}}function Py(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new O0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new O0),i;default:throw Error(a(435,e.tag))}}function Ql(e,i){var s=Py(e);i.forEach(function(o){if(!s.has(o)){s.add(o);var u=Xy.bind(null,e,o);o.then(u,u)}})}function Zn(e,i){var s=i.deletions;if(s!==null)for(var o=0;o<s.length;o++){var u=s[o],d=e,y=i,b=y;t:for(;b!==null;){switch(b.tag){case 27:if(qa(b.type)){$e=b.stateNode,jn=!1;break t}break;case 5:$e=b.stateNode,jn=!1;break t;case 3:case 4:$e=b.stateNode.containerInfo,jn=!0;break t}b=b.return}if($e===null)throw Error(a(160));B0(d,y,u),$e=null,jn=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)G0(i,e),i=i.sibling}var Ui=null;function G0(e,i){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Zn(i,e),Kn(e),o&4&&(Ia(3,e,e.return),Do(3,e),Ia(5,e,e.return));break;case 1:Zn(i,e),Kn(e),o&512&&(dn||s===null||ki(s,s.return)),o&64&&ra&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var u=Ui;if(Zn(i,e),Kn(e),o&512&&(dn||s===null||ki(s,s.return)),o&4){var d=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[k]||d[en]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),Nn(d,o,s),d[en]=e,Ut(d),o=d;break t;case"link":var y=Gg("link","href",u).get(o+(s.href||""));if(y){for(var b=0;b<y.length;b++)if(d=y[b],d.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&d.getAttribute("rel")===(s.rel==null?null:s.rel)&&d.getAttribute("title")===(s.title==null?null:s.title)&&d.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(b,1);break e}}d=u.createElement(o),Nn(d,o,s),u.head.appendChild(d);break;case"meta":if(y=Gg("meta","content",u).get(o+(s.content||""))){for(b=0;b<y.length;b++)if(d=y[b],d.getAttribute("content")===(s.content==null?null:""+s.content)&&d.getAttribute("name")===(s.name==null?null:s.name)&&d.getAttribute("property")===(s.property==null?null:s.property)&&d.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&d.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(b,1);break e}}d=u.createElement(o),Nn(d,o,s),u.head.appendChild(d);break;default:throw Error(a(468,o))}d[en]=e,Ut(d),o=d}e.stateNode=o}else Hg(u,e.type,e.stateNode);else e.stateNode=Fg(u,o,e.memoizedProps);else d!==o?(d===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):d.count--,o===null?Hg(u,e.type,e.stateNode):Fg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&zf(e,e.memoizedProps,s.memoizedProps)}break;case 27:Zn(i,e),Kn(e),o&512&&(dn||s===null||ki(s,s.return)),s!==null&&o&4&&zf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Zn(i,e),Kn(e),o&512&&(dn||s===null||ki(s,s.return)),e.flags&32){u=e.stateNode;try{Xs(u,"")}catch(Ft){Be(e,e.return,Ft)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,zf(e,u,s!==null?s.memoizedProps:u)),o&1024&&(Ff=!0);break;case 6:if(Zn(i,e),Kn(e),o&4){if(e.stateNode===null)throw Error(a(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(Ft){Be(e,e.return,Ft)}}break;case 3:if(dc=null,u=Ui,Ui=fc(i.containerInfo),Zn(i,e),Ui=u,Kn(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{Sr(i.containerInfo)}catch(Ft){Be(e,e.return,Ft)}Ff&&(Ff=!1,H0(e));break;case 4:o=Ui,Ui=fc(e.stateNode.containerInfo),Zn(i,e),Kn(e),Ui=o;break;case 12:Zn(i,e),Kn(e);break;case 31:Zn(i,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 13:Zn(i,e),Kn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&($l=dt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 22:u=e.memoizedState!==null;var I=s!==null&&s.memoizedState!==null,et=ra,ht=dn;if(ra=et||u,dn=ht||I,Zn(i,e),dn=ht,ra=et,Kn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(s===null||I||ra||dn||Rs(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){I=s=i;try{if(d=I.stateNode,u)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{b=I.stateNode;var _t=I.memoizedProps.style,nt=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;b.style.display=nt==null||typeof nt=="boolean"?"":(""+nt).trim()}}catch(Ft){Be(I,I.return,Ft)}}}else if(i.tag===6){if(s===null){I=i;try{I.stateNode.nodeValue=u?"":I.memoizedProps}catch(Ft){Be(I,I.return,Ft)}}}else if(i.tag===18){if(s===null){I=i;try{var lt=I.stateNode;u?Dg(lt,!0):Dg(I.stateNode,!1)}catch(Ft){Be(I,I.return,Ft)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,Ql(e,s))));break;case 19:Zn(i,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 30:break;case 21:break;default:Zn(i,e),Kn(e)}}function Kn(e){var i=e.flags;if(i&2){try{for(var s,o=e.return;o!==null;){if(L0(o)){s=o;break}o=o.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var u=s.stateNode,d=Bf(e);Kl(e,d,u);break;case 5:var y=s.stateNode;s.flags&32&&(Xs(y,""),s.flags&=-33);var b=Bf(e);Kl(e,b,y);break;case 3:case 4:var I=s.stateNode.containerInfo,et=Bf(e);If(e,et,I);break;default:throw Error(a(161))}}catch(ht){Be(e,e.return,ht)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function H0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;H0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function la(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)P0(e,i.alternate,i),i=i.sibling}function Rs(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Ia(4,i,i.return),Rs(i);break;case 1:ki(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&D0(i,i.return,s),Rs(i);break;case 27:Go(i.stateNode);case 26:case 5:ki(i,i.return),Rs(i);break;case 22:i.memoizedState===null&&Rs(i);break;case 30:Rs(i);break;default:Rs(i)}e=e.sibling}}function ca(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,d=i,y=d.flags;switch(d.tag){case 0:case 11:case 15:ca(u,d,s),Do(4,d);break;case 1:if(ca(u,d,s),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(et){Be(o,o.return,et)}if(o=d,u=o.updateQueue,u!==null){var b=o.stateNode;try{var I=u.shared.hiddenCallbacks;if(I!==null)for(u.shared.hiddenCallbacks=null,u=0;u<I.length;u++)vm(I[u],b)}catch(et){Be(o,o.return,et)}}s&&y&64&&C0(d),Uo(d,d.return);break;case 27:N0(d);case 26:case 5:ca(u,d,s),s&&o===null&&y&4&&U0(d),Uo(d,d.return);break;case 12:ca(u,d,s);break;case 31:ca(u,d,s),s&&y&4&&I0(u,d);break;case 13:ca(u,d,s),s&&y&4&&F0(u,d);break;case 22:d.memoizedState===null&&ca(u,d,s),Uo(d,d.return);break;case 30:break;default:ca(u,d,s)}i=i.sibling}}function Gf(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&_o(s))}function Hf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&_o(e))}function Li(e,i,s,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)V0(e,i,s,o),i=i.sibling}function V0(e,i,s,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Li(e,i,s,o),u&2048&&Do(9,i);break;case 1:Li(e,i,s,o);break;case 3:Li(e,i,s,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&_o(e)));break;case 12:if(u&2048){Li(e,i,s,o),e=i.stateNode;try{var d=i.memoizedProps,y=d.id,b=d.onPostCommit;typeof b=="function"&&b(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(I){Be(i,i.return,I)}}else Li(e,i,s,o);break;case 31:Li(e,i,s,o);break;case 13:Li(e,i,s,o);break;case 23:break;case 22:d=i.stateNode,y=i.alternate,i.memoizedState!==null?d._visibility&2?Li(e,i,s,o):Lo(e,i):d._visibility&2?Li(e,i,s,o):(d._visibility|=2,ur(e,i,s,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Gf(y,i);break;case 24:Li(e,i,s,o),u&2048&&Hf(i.alternate,i);break;default:Li(e,i,s,o)}}function ur(e,i,s,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=e,y=i,b=s,I=o,et=y.flags;switch(y.tag){case 0:case 11:case 15:ur(d,y,b,I,u),Do(8,y);break;case 23:break;case 22:var ht=y.stateNode;y.memoizedState!==null?ht._visibility&2?ur(d,y,b,I,u):Lo(d,y):(ht._visibility|=2,ur(d,y,b,I,u)),u&&et&2048&&Gf(y.alternate,y);break;case 24:ur(d,y,b,I,u),u&&et&2048&&Hf(y.alternate,y);break;default:ur(d,y,b,I,u)}i=i.sibling}}function Lo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,o=i,u=o.flags;switch(o.tag){case 22:Lo(s,o),u&2048&&Gf(o.alternate,o);break;case 24:Lo(s,o),u&2048&&Hf(o.alternate,o);break;default:Lo(s,o)}i=i.sibling}}var No=8192;function fr(e,i,s){if(e.subtreeFlags&No)for(e=e.child;e!==null;)k0(e,i,s),e=e.sibling}function k0(e,i,s){switch(e.tag){case 26:fr(e,i,s),e.flags&No&&e.memoizedState!==null&&SS(s,Ui,e.memoizedState,e.memoizedProps);break;case 5:fr(e,i,s);break;case 3:case 4:var o=Ui;Ui=fc(e.stateNode.containerInfo),fr(e,i,s),Ui=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=No,No=16777216,fr(e,i,s),No=o):fr(e,i,s));break;default:fr(e,i,s)}}function X0(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Oo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Tn=o,W0(o,e)}X0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)q0(e),e=e.sibling}function q0(e){switch(e.tag){case 0:case 11:case 15:Oo(e),e.flags&2048&&Ia(9,e,e.return);break;case 3:Oo(e);break;case 12:Oo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,Jl(e)):Oo(e);break;default:Oo(e)}}function Jl(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Tn=o,W0(o,e)}X0(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Ia(8,i,i.return),Jl(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,Jl(i));break;default:Jl(i)}e=e.sibling}}function W0(e,i){for(;Tn!==null;){var s=Tn;switch(s.tag){case 0:case 11:case 15:Ia(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:_o(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,Tn=o;else t:for(s=e;Tn!==null;){o=Tn;var u=o.sibling,d=o.return;if(z0(o),o===s){Tn=null;break t}if(u!==null){u.return=d,Tn=u;break t}Tn=d}}}var zy={getCacheForType:function(e){var i=Un(un),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Un(un).controller.signal}},By=typeof WeakMap=="function"?WeakMap:Map,Le=0,qe=null,pe=null,ve=0,ze=0,ri=null,Fa=!1,hr=!1,Vf=!1,ua=0,an=0,Ga=0,ws=0,kf=0,oi=0,dr=0,Po=null,Qn=null,Xf=!1,$l=0,Y0=0,tc=1/0,ec=null,Ha=null,xn=0,Va=null,pr=null,fa=0,qf=0,Wf=null,j0=null,zo=0,Yf=null;function li(){return(Le&2)!==0&&ve!==0?ve&-ve:z.T!==null?$f():io()}function Z0(){if(oi===0)if((ve&536870912)===0||Se){var e=ct;ct<<=1,(ct&3932160)===0&&(ct=262144),oi=e}else oi=536870912;return e=ai.current,e!==null&&(e.flags|=32),oi}function Jn(e,i,s){(e===qe&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(mr(e,0),ka(e,ve,oi,!1)),Rn(e,s),((Le&2)===0||e!==qe)&&(e===qe&&((Le&2)===0&&(ws|=s),an===4&&ka(e,ve,oi,!1)),Xi(e))}function K0(e,i,s){if((Le&6)!==0)throw Error(a(327));var o=!s&&(i&127)===0&&(i&e.expiredLanes)===0||ee(e,i),u=o?Gy(e,i):Zf(e,i,!0),d=o;do{if(u===0){hr&&!o&&ka(e,i,0,!1);break}else{if(s=e.current.alternate,d&&!Iy(s)){u=Zf(e,i,!1),d=!1;continue}if(u===2){if(d=i,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var b=e;u=Po;var I=b.current.memoizedState.isDehydrated;if(I&&(mr(b,y).flags|=256),y=Zf(b,y,!1),y!==2){if(Vf&&!I){b.errorRecoveryDisabledLanes|=d,ws|=d,u=4;break t}d=Qn,Qn=u,d!==null&&(Qn===null?Qn=d:Qn.push.apply(Qn,d))}u=y}if(d=!1,u!==2)continue}}if(u===1){mr(e,0),ka(e,i,0,!0);break}t:{switch(o=e,d=u,d){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:ka(o,i,oi,!Fa);break t;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(u=$l+300-dt(),10<u)){if(ka(o,i,oi,!Fa),Nt(o,0,!0)!==0)break t;fa=i,o.timeoutHandle=Rg(Q0.bind(null,o,s,Qn,ec,Xf,i,oi,ws,dr,Fa,d,"Throttled",-0,0),u);break t}Q0(o,s,Qn,ec,Xf,i,oi,ws,dr,Fa,d,null,-0,0)}}break}while(!0);Xi(e)}function Q0(e,i,s,o,u,d,y,b,I,et,ht,_t,nt,lt){if(e.timeoutHandle=-1,_t=i.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ki},k0(i,d,_t);var Ft=(d&62914560)===d?$l-dt():(d&4194048)===d?Y0-dt():0;if(Ft=MS(_t,Ft),Ft!==null){fa=d,e.cancelPendingCommit=Ft(sg.bind(null,e,i,d,s,o,u,y,b,I,ht,_t,null,nt,lt)),ka(e,d,y,!et);return}}sg(e,i,d,s,o,u,y,b,I)}function Iy(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var u=s[o],d=u.getSnapshot;u=u.value;try{if(!ni(d(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ka(e,i,s,o){i&=~kf,i&=~ws,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var d=31-te(u),y=1<<d;o[d]=-1,u&=~y}s!==0&&eo(e,s,i)}function nc(){return(Le&6)===0?(Bo(0),!1):!0}function jf(){if(pe!==null){if(ze===0)var e=pe.return;else e=pe,ta=xs=null,uf(e),sr=null,xo=0,e=pe;for(;e!==null;)w0(e.alternate,e),e=e.return;pe=null}}function mr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,aS(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),fa=0,jf(),qe=e,pe=s=Ji(e.current,null),ve=i,ze=0,ri=null,Fa=!1,hr=ee(e,i),Vf=!1,dr=oi=kf=ws=Ga=an=0,Qn=Po=null,Xf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-te(o),d=1<<u;i|=e[u],o&=~d}return ua=i,El(),s}function J0(e,i){oe=null,z.H=Ro,i===ar||i===Ul?(i=pm(),ze=3):i===Qu?(i=pm(),ze=4):ze=i===Af?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ri=i,pe===null&&(an=1,ql(e,gi(i,e.current)))}function $0(){var e=ai.current;return e===null?!0:(ve&4194048)===ve?yi===null:(ve&62914560)===ve||(ve&536870912)!==0?e===yi:!1}function tg(){var e=z.H;return z.H=Ro,e===null?Ro:e}function eg(){var e=z.A;return z.A=zy,e}function ic(){an=4,Fa||(ve&4194048)!==ve&&ai.current!==null||(hr=!0),(Ga&134217727)===0&&(ws&134217727)===0||qe===null||ka(qe,ve,oi,!1)}function Zf(e,i,s){var o=Le;Le|=2;var u=tg(),d=eg();(qe!==e||ve!==i)&&(ec=null,mr(e,i)),i=!1;var y=an;t:do try{if(ze!==0&&pe!==null){var b=pe,I=ri;switch(ze){case 8:jf(),y=6;break t;case 3:case 2:case 9:case 6:ai.current===null&&(i=!0);var et=ze;if(ze=0,ri=null,gr(e,b,I,et),s&&hr){y=0;break t}break;default:et=ze,ze=0,ri=null,gr(e,b,I,et)}}Fy(),y=an;break}catch(ht){J0(e,ht)}while(!0);return i&&e.shellSuspendCounter++,ta=xs=null,Le=o,z.H=u,z.A=d,pe===null&&(qe=null,ve=0,El()),y}function Fy(){for(;pe!==null;)ng(pe)}function Gy(e,i){var s=Le;Le|=2;var o=tg(),u=eg();qe!==e||ve!==i?(ec=null,tc=dt()+500,mr(e,i)):hr=ee(e,i);t:do try{if(ze!==0&&pe!==null){i=pe;var d=ri;e:switch(ze){case 1:ze=0,ri=null,gr(e,i,d,1);break;case 2:case 9:if(hm(d)){ze=0,ri=null,ig(i);break}i=function(){ze!==2&&ze!==9||qe!==e||(ze=7),Xi(e)},d.then(i,i);break t;case 3:ze=7;break t;case 4:ze=5;break t;case 7:hm(d)?(ze=0,ri=null,ig(i)):(ze=0,ri=null,gr(e,i,d,7));break;case 5:var y=null;switch(pe.tag){case 26:y=pe.memoizedState;case 5:case 27:var b=pe;if(y?Vg(y):b.stateNode.complete){ze=0,ri=null;var I=b.sibling;if(I!==null)pe=I;else{var et=b.return;et!==null?(pe=et,ac(et)):pe=null}break e}}ze=0,ri=null,gr(e,i,d,5);break;case 6:ze=0,ri=null,gr(e,i,d,6);break;case 8:jf(),an=6;break t;default:throw Error(a(462))}}Hy();break}catch(ht){J0(e,ht)}while(!0);return ta=xs=null,z.H=o,z.A=u,Le=s,pe!==null?0:(qe=null,ve=0,El(),an)}function Hy(){for(;pe!==null&&!A();)ng(pe)}function ng(e){var i=A0(e.alternate,e,ua);e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function ig(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=y0(s,i,i.pendingProps,i.type,void 0,ve);break;case 11:i=y0(s,i,i.pendingProps,i.type.render,i.ref,ve);break;case 5:uf(i);default:w0(s,i),i=pe=em(i,ua),i=A0(s,i,ua)}e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function gr(e,i,s,o){ta=xs=null,uf(i),sr=null,xo=0;var u=i.return;try{if(Cy(e,u,i,s,ve)){an=1,ql(e,gi(s,e.current)),pe=null;return}}catch(d){if(u!==null)throw pe=u,d;an=1,ql(e,gi(s,e.current)),pe=null;return}i.flags&32768?(Se||o===1?e=!0:hr||(ve&536870912)!==0?e=!1:(Fa=e=!0,(o===2||o===9||o===3||o===6)&&(o=ai.current,o!==null&&o.tag===13&&(o.flags|=16384))),ag(i,e)):ac(i)}function ac(e){var i=e;do{if((i.flags&32768)!==0){ag(i,Fa);return}e=i.return;var s=Ly(i.alternate,i,ua);if(s!==null){pe=s;return}if(i=i.sibling,i!==null){pe=i;return}pe=i=e}while(i!==null);an===0&&(an=5)}function ag(e,i){do{var s=Ny(e.alternate,e);if(s!==null){s.flags&=32767,pe=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){pe=e;return}pe=e=s}while(e!==null);an=6,pe=null}function sg(e,i,s,o,u,d,y,b,I){e.cancelPendingCommit=null;do sc();while(xn!==0);if((Le&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(d=i.lanes|i.childLanes,d|=zu,Ri(e,s,d,y,b,I),e===qe&&(pe=qe=null,ve=0),pr=i,Va=e,fa=s,qf=d,Wf=u,j0=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,qy(Lt,function(){return ug(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=Q.p,Q.p=2,y=Le,Le|=4;try{Oy(e,i,s)}finally{Le=y,Q.p=u,z.T=o}}xn=1,rg(),og(),lg()}}function rg(){if(xn===1){xn=0;var e=Va,i=pr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Le;Le|=4;try{G0(i,e);var d=oh,y=Wp(e.containerInfo),b=d.focusedElem,I=d.selectionRange;if(y!==b&&b&&b.ownerDocument&&qp(b.ownerDocument.documentElement,b)){if(I!==null&&Uu(b)){var et=I.start,ht=I.end;if(ht===void 0&&(ht=et),"selectionStart"in b)b.selectionStart=et,b.selectionEnd=Math.min(ht,b.value.length);else{var _t=b.ownerDocument||document,nt=_t&&_t.defaultView||window;if(nt.getSelection){var lt=nt.getSelection(),Ft=b.textContent.length,Jt=Math.min(I.start,Ft),Xe=I.end===void 0?Jt:Math.min(I.end,Ft);!lt.extend&&Jt>Xe&&(y=Xe,Xe=Jt,Jt=y);var Y=Xp(b,Jt),H=Xp(b,Xe);if(Y&&H&&(lt.rangeCount!==1||lt.anchorNode!==Y.node||lt.anchorOffset!==Y.offset||lt.focusNode!==H.node||lt.focusOffset!==H.offset)){var tt=_t.createRange();tt.setStart(Y.node,Y.offset),lt.removeAllRanges(),Jt>Xe?(lt.addRange(tt),lt.extend(H.node,H.offset)):(tt.setEnd(H.node,H.offset),lt.addRange(tt))}}}}for(_t=[],lt=b;lt=lt.parentNode;)lt.nodeType===1&&_t.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<_t.length;b++){var pt=_t[b];pt.element.scrollLeft=pt.left,pt.element.scrollTop=pt.top}}_c=!!rh,oh=rh=null}finally{Le=u,Q.p=o,z.T=s}}e.current=i,xn=2}}function og(){if(xn===2){xn=0;var e=Va,i=pr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Le;Le|=4;try{P0(e,i.alternate,i)}finally{Le=u,Q.p=o,z.T=s}}xn=3}}function lg(){if(xn===4||xn===3){xn=0,at();var e=Va,i=pr,s=fa,o=j0;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?xn=5:(xn=0,pr=Va=null,cg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ha=null),ks(s),i=i.stateNode,Yt&&typeof Yt.onCommitFiberRoot=="function")try{Yt.onCommitFiberRoot(Kt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=z.T,u=Q.p,Q.p=2,z.T=null;try{for(var d=e.onRecoverableError,y=0;y<o.length;y++){var b=o[y];d(b.value,{componentStack:b.stack})}}finally{z.T=i,Q.p=u}}(fa&3)!==0&&sc(),Xi(e),u=e.pendingLanes,(s&261930)!==0&&(u&42)!==0?e===Yf?zo++:(zo=0,Yf=e):zo=0,Bo(0)}}function cg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,_o(i)))}function sc(){return rg(),og(),lg(),ug()}function ug(){if(xn!==5)return!1;var e=Va,i=qf;qf=0;var s=ks(fa),o=z.T,u=Q.p;try{Q.p=32>s?32:s,z.T=null,s=Wf,Wf=null;var d=Va,y=fa;if(xn=0,pr=Va=null,fa=0,(Le&6)!==0)throw Error(a(331));var b=Le;if(Le|=4,q0(d.current),V0(d,d.current,y,s),Le=b,Bo(0,!1),Yt&&typeof Yt.onPostCommitFiberRoot=="function")try{Yt.onPostCommitFiberRoot(Kt,d)}catch{}return!0}finally{Q.p=u,z.T=o,cg(e,i)}}function fg(e,i,s){i=gi(s,i),i=bf(e.stateNode,i,2),e=Pa(e,i,2),e!==null&&(Rn(e,2),Xi(e))}function Be(e,i,s){if(e.tag===3)fg(e,e,s);else for(;i!==null;){if(i.tag===3){fg(i,e,s);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ha===null||!Ha.has(o))){e=gi(s,e),s=h0(2),o=Pa(i,s,2),o!==null&&(d0(s,o,i,e),Rn(o,2),Xi(o));break}}i=i.return}}function Kf(e,i,s){var o=e.pingCache;if(o===null){o=e.pingCache=new By;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(s)||(Vf=!0,u.add(s),e=Vy.bind(null,e,i,s),i.then(e,e))}function Vy(e,i,s){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,qe===e&&(ve&s)===s&&(an===4||an===3&&(ve&62914560)===ve&&300>dt()-$l?(Le&2)===0&&mr(e,0):kf|=s,dr===ve&&(dr=0)),Xi(e)}function hg(e,i){i===0&&(i=_n()),e=gs(e,i),e!==null&&(Rn(e,i),Xi(e))}function ky(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),hg(e,s)}function Xy(e,i){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(a(314))}o!==null&&o.delete(i),hg(e,s)}function qy(e,i){return Zt(e,i)}var rc=null,_r=null,Qf=!1,oc=!1,Jf=!1,Xa=0;function Xi(e){e!==_r&&e.next===null&&(_r===null?rc=_r=e:_r=_r.next=e),oc=!0,Qf||(Qf=!0,Yy())}function Bo(e,i){if(!Jf&&oc){Jf=!0;do for(var s=!1,o=rc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var y=o.suspendedLanes,b=o.pingedLanes;d=(1<<31-te(42|e)+1)-1,d&=u&~(y&~b),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(s=!0,gg(o,d))}else d=ve,d=Nt(o,o===qe?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||ee(o,d)||(s=!0,gg(o,d));o=o.next}while(s);Jf=!1}}function Wy(){dg()}function dg(){oc=Qf=!1;var e=0;Xa!==0&&iS()&&(e=Xa);for(var i=dt(),s=null,o=rc;o!==null;){var u=o.next,d=pg(o,i);d===0?(o.next=null,s===null?rc=u:s.next=u,u===null&&(_r=s)):(s=o,(e!==0||(d&3)!==0)&&(oc=!0)),o=u}xn!==0&&xn!==5||Bo(e),Xa!==0&&(Xa=0)}function pg(e,i){for(var s=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-te(d),b=1<<y,I=u[y];I===-1?((b&s)===0||(b&o)!==0)&&(u[y]=Je(b,i)):I<=i&&(e.expiredLanes|=b),d&=~b}if(i=qe,s=ve,s=Nt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===i&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&N(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||ee(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(o!==null&&N(o),ks(s)){case 2:case 8:s=Wt;break;case 32:s=Lt;break;case 268435456:s=_e;break;default:s=Lt}return o=mg.bind(null,e),s=Zt(s,o),e.callbackPriority=i,e.callbackNode=s,i}return o!==null&&o!==null&&N(o),e.callbackPriority=2,e.callbackNode=null,2}function mg(e,i){if(xn!==0&&xn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(sc()&&e.callbackNode!==s)return null;var o=ve;return o=Nt(e,e===qe?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(K0(e,o,i),pg(e,dt()),e.callbackNode!=null&&e.callbackNode===s?mg.bind(null,e):null)}function gg(e,i){if(sc())return null;K0(e,i,!0)}function Yy(){sS(function(){(Le&6)!==0?Zt(gt,Wy):dg()})}function $f(){if(Xa===0){var e=nr;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),Xa=e}return Xa}function _g(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ml(""+e)}function vg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function jy(e,i,s,o,u){if(i==="submit"&&s&&s.stateNode===u){var d=_g((u[wn]||null).action),y=o.submitter;y&&(i=(i=y[wn]||null)?_g(i.formAction):y.getAttribute("formAction"),i!==null&&(d=i,y=null));var b=new xl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Xa!==0){var I=y?vg(u,y):new FormData(u);xf(s,{pending:!0,data:I,method:u.method,action:d},null,I)}}else typeof d=="function"&&(b.preventDefault(),I=y?vg(u,y):new FormData(u),xf(s,{pending:!0,data:I,method:u.method,action:d},d,I))},currentTarget:u}]})}}for(var th=0;th<Pu.length;th++){var eh=Pu[th],Zy=eh.toLowerCase(),Ky=eh[0].toUpperCase()+eh.slice(1);Di(Zy,"on"+Ky)}Di(Zp,"onAnimationEnd"),Di(Kp,"onAnimationIteration"),Di(Qp,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di(hy,"onTransitionRun"),Di(dy,"onTransitionStart"),Di(py,"onTransitionCancel"),Di(Jp,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$t("onBeforeInput",["compositionend","keypress","textInput","paste"]),$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Io="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Qy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Io));function xg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],u=o.event;o=o.listeners;t:{var d=void 0;if(i)for(var y=o.length-1;0<=y;y--){var b=o[y],I=b.instance,et=b.currentTarget;if(b=b.listener,I!==d&&u.isPropagationStopped())break t;d=b,u.currentTarget=et;try{d(u)}catch(ht){Ml(ht)}u.currentTarget=null,d=I}else for(y=0;y<o.length;y++){if(b=o[y],I=b.instance,et=b.currentTarget,b=b.listener,I!==d&&u.isPropagationStopped())break t;d=b,u.currentTarget=et;try{d(u)}catch(ht){Ml(ht)}u.currentTarget=null,d=I}}}}function me(e,i){var s=i[ao];s===void 0&&(s=i[ao]=new Set);var o=e+"__bubble";s.has(o)||(yg(i,e,2,!1),s.add(o))}function nh(e,i,s){var o=0;i&&(o|=4),yg(s,e,o,i)}var lc="_reactListening"+Math.random().toString(36).slice(2);function ih(e){if(!e[lc]){e[lc]=!0,kt.forEach(function(s){s!=="selectionchange"&&(Qy.has(s)||nh(s,!1,e),nh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[lc]||(i[lc]=!0,nh("selectionchange",!1,i))}}function yg(e,i,s,o){switch(Zg(i)){case 2:var u=bS;break;case 8:u=AS;break;default:u=vh}s=u.bind(null,i,s,e),u=void 0,!Mu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,s,{capture:!0,passive:u}):e.addEventListener(i,s,!0):u!==void 0?e.addEventListener(i,s,{passive:u}):e.addEventListener(i,s,!1)}function ah(e,i,s,o,u){var d=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var b=o.stateNode.containerInfo;if(b===u)break;if(y===4)for(y=o.return;y!==null;){var I=y.tag;if((I===3||I===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;b!==null;){if(y=rt(b),y===null)return;if(I=y.tag,I===5||I===6||I===26||I===27){o=d=y;continue t}b=b.parentNode}}o=o.return}bp(function(){var et=d,ht=yu(s),_t=[];t:{var nt=$p.get(e);if(nt!==void 0){var lt=xl,Ft=e;switch(e){case"keypress":if(_l(s)===0)break t;case"keydown":case"keyup":lt=Xx;break;case"focusin":Ft="focus",lt=Au;break;case"focusout":Ft="blur",lt=Au;break;case"beforeblur":case"afterblur":lt=Au;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=wp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=Lx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Yx;break;case Zp:case Kp:case Qp:lt=Px;break;case Jp:lt=Zx;break;case"scroll":case"scrollend":lt=Dx;break;case"wheel":lt=Qx;break;case"copy":case"cut":case"paste":lt=Bx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=Dp;break;case"toggle":case"beforetoggle":lt=$x}var Jt=(i&4)!==0,Xe=!Jt&&(e==="scroll"||e==="scrollend"),Y=Jt?nt!==null?nt+"Capture":null:nt;Jt=[];for(var H=et,tt;H!==null;){var pt=H;if(tt=pt.stateNode,pt=pt.tag,pt!==5&&pt!==26&&pt!==27||tt===null||Y===null||(pt=so(H,Y),pt!=null&&Jt.push(Fo(H,pt,tt))),Xe)break;H=H.return}0<Jt.length&&(nt=new lt(nt,Ft,null,s,ht),_t.push({event:nt,listeners:Jt}))}}if((i&7)===0){t:{if(nt=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",nt&&s!==xu&&(Ft=s.relatedTarget||s.fromElement)&&(rt(Ft)||Ft[ji]))break t;if((lt||nt)&&(nt=ht.window===ht?ht:(nt=ht.ownerDocument)?nt.defaultView||nt.parentWindow:window,lt?(Ft=s.relatedTarget||s.toElement,lt=et,Ft=Ft?rt(Ft):null,Ft!==null&&(Xe=c(Ft),Jt=Ft.tag,Ft!==Xe||Jt!==5&&Jt!==27&&Jt!==6)&&(Ft=null)):(lt=null,Ft=et),lt!==Ft)){if(Jt=wp,pt="onMouseLeave",Y="onMouseEnter",H="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=Dp,pt="onPointerLeave",Y="onPointerEnter",H="pointer"),Xe=lt==null?nt:bt(lt),tt=Ft==null?nt:bt(Ft),nt=new Jt(pt,H+"leave",lt,s,ht),nt.target=Xe,nt.relatedTarget=tt,pt=null,rt(ht)===et&&(Jt=new Jt(Y,H+"enter",Ft,s,ht),Jt.target=tt,Jt.relatedTarget=Xe,pt=Jt),Xe=pt,lt&&Ft)e:{for(Jt=Jy,Y=lt,H=Ft,tt=0,pt=Y;pt;pt=Jt(pt))tt++;pt=0;for(var jt=H;jt;jt=Jt(jt))pt++;for(;0<tt-pt;)Y=Jt(Y),tt--;for(;0<pt-tt;)H=Jt(H),pt--;for(;tt--;){if(Y===H||H!==null&&Y===H.alternate){Jt=Y;break e}Y=Jt(Y),H=Jt(H)}Jt=null}else Jt=null;lt!==null&&Sg(_t,nt,lt,Jt,!1),Ft!==null&&Xe!==null&&Sg(_t,Xe,Ft,Jt,!0)}}t:{if(nt=et?bt(et):window,lt=nt.nodeName&&nt.nodeName.toLowerCase(),lt==="select"||lt==="input"&&nt.type==="file")var Ce=Ip;else if(zp(nt))if(Fp)Ce=cy;else{Ce=oy;var qt=ry}else lt=nt.nodeName,!lt||lt.toLowerCase()!=="input"||nt.type!=="checkbox"&&nt.type!=="radio"?et&&vu(et.elementType)&&(Ce=Ip):Ce=ly;if(Ce&&(Ce=Ce(e,et))){Bp(_t,Ce,s,ht);break t}qt&&qt(e,nt,et),e==="focusout"&&et&&nt.type==="number"&&et.memoizedProps.value!=null&&pi(nt,"number",nt.value)}switch(qt=et?bt(et):window,e){case"focusin":(zp(qt)||qt.contentEditable==="true")&&(js=qt,Lu=et,po=null);break;case"focusout":po=Lu=js=null;break;case"mousedown":Nu=!0;break;case"contextmenu":case"mouseup":case"dragend":Nu=!1,Yp(_t,s,ht);break;case"selectionchange":if(fy)break;case"keydown":case"keyup":Yp(_t,s,ht)}var le;if(wu)t:{switch(e){case"compositionstart":var xe="onCompositionStart";break t;case"compositionend":xe="onCompositionEnd";break t;case"compositionupdate":xe="onCompositionUpdate";break t}xe=void 0}else Ys?Op(e,s)&&(xe="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(xe="onCompositionStart");xe&&(Up&&s.locale!=="ko"&&(Ys||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&Ys&&(le=Ap()):(wa=ht,Eu="value"in wa?wa.value:wa.textContent,Ys=!0)),qt=cc(et,xe),0<qt.length&&(xe=new Cp(xe,e,null,s,ht),_t.push({event:xe,listeners:qt}),le?xe.data=le:(le=Pp(s),le!==null&&(xe.data=le)))),(le=ey?ny(e,s):iy(e,s))&&(xe=cc(et,"onBeforeInput"),0<xe.length&&(qt=new Cp("onBeforeInput","beforeinput",null,s,ht),_t.push({event:qt,listeners:xe}),qt.data=le)),jy(_t,e,et,s,ht)}xg(_t,i)})}function Fo(e,i,s){return{instance:e,listener:i,currentTarget:s}}function cc(e,i){for(var s=i+"Capture",o=[];e!==null;){var u=e,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=so(e,s),u!=null&&o.unshift(Fo(e,u,d)),u=so(e,i),u!=null&&o.push(Fo(e,u,d))),e.tag===3)return o;e=e.return}return[]}function Jy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Sg(e,i,s,o,u){for(var d=i._reactName,y=[];s!==null&&s!==o;){var b=s,I=b.alternate,et=b.stateNode;if(b=b.tag,I!==null&&I===o)break;b!==5&&b!==26&&b!==27||et===null||(I=et,u?(et=so(s,d),et!=null&&y.unshift(Fo(s,et,I))):u||(et=so(s,d),et!=null&&y.push(Fo(s,et,I)))),s=s.return}y.length!==0&&e.push({event:i,listeners:y})}var $y=/\r\n?/g,tS=/\u0000|\uFFFD/g;function Mg(e){return(typeof e=="string"?e:""+e).replace($y,`
`).replace(tS,"")}function Eg(e,i){return i=Mg(i),Mg(e)===i}function ke(e,i,s,o,u,d){switch(s){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||Xs(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&Xs(e,""+o);break;case"className":Xt(e,"class",o);break;case"tabIndex":Xt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,s,o);break;case"style":Ep(e,o,d);break;case"data":if(i!=="object"){Xt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=ml(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(s==="formAction"?(i!=="input"&&ke(e,i,"name",u.name,u,null),ke(e,i,"formEncType",u.formEncType,u,null),ke(e,i,"formMethod",u.formMethod,u,null),ke(e,i,"formTarget",u.formTarget,u,null)):(ke(e,i,"encType",u.encType,u,null),ke(e,i,"method",u.method,u,null),ke(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=ml(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=Ki);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=ml(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":me("beforetoggle",e),me("toggle",e),ye(e,"popover",o);break;case"xlinkActuate":vn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":vn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":vn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":vn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":vn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":vn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":vn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":vn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":vn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":ye(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=wx.get(s)||s,ye(e,s,o))}}function sh(e,i,s,o,u,d){switch(s){case"style":Ep(e,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof o=="string"?Xs(e,o):(typeof o=="number"||typeof o=="bigint")&&Xs(e,""+o);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Ki);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ne.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),d=e[wn]||null,d=d!=null?d[s]:null,typeof d=="function"&&e.removeEventListener(i,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,o,u);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):ye(e,s,o)}}}function Nn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var o=!1,u=!1,d;for(d in s)if(s.hasOwnProperty(d)){var y=s[d];if(y!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:ke(e,i,d,y,s,null)}}u&&ke(e,i,"srcSet",s.srcSet,s,null),o&&ke(e,i,"src",s.src,s,null);return;case"input":me("invalid",e);var b=d=y=u=null,I=null,et=null;for(o in s)if(s.hasOwnProperty(o)){var ht=s[o];if(ht!=null)switch(o){case"name":u=ht;break;case"type":y=ht;break;case"checked":I=ht;break;case"defaultChecked":et=ht;break;case"value":d=ht;break;case"defaultValue":b=ht;break;case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,i));break;default:ke(e,i,o,ht,s,null)}}Ci(e,d,b,I,et,y,u,!1);return;case"select":me("invalid",e),o=y=d=null;for(u in s)if(s.hasOwnProperty(u)&&(b=s[u],b!=null))switch(u){case"value":d=b;break;case"defaultValue":y=b;break;case"multiple":o=b;default:ke(e,i,u,b,s,null)}i=d,s=y,e.multiple=!!o,i!=null?Zi(e,!!o,i,!1):s!=null&&Zi(e,!!o,s,!0);return;case"textarea":me("invalid",e),d=u=o=null;for(y in s)if(s.hasOwnProperty(y)&&(b=s[y],b!=null))switch(y){case"value":o=b;break;case"defaultValue":u=b;break;case"children":d=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(a(91));break;default:ke(e,i,y,b,s,null)}Sp(e,o,u,d);return;case"option":for(I in s)if(s.hasOwnProperty(I)&&(o=s[I],o!=null))switch(I){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:ke(e,i,I,o,s,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(o=0;o<Io.length;o++)me(Io[o],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(et in s)if(s.hasOwnProperty(et)&&(o=s[et],o!=null))switch(et){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:ke(e,i,et,o,s,null)}return;default:if(vu(i)){for(ht in s)s.hasOwnProperty(ht)&&(o=s[ht],o!==void 0&&sh(e,i,ht,o,s,void 0));return}}for(b in s)s.hasOwnProperty(b)&&(o=s[b],o!=null&&ke(e,i,b,o,s,null))}function eS(e,i,s,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,y=null,b=null,I=null,et=null,ht=null;for(lt in s){var _t=s[lt];if(s.hasOwnProperty(lt)&&_t!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":I=_t;default:o.hasOwnProperty(lt)||ke(e,i,lt,null,o,_t)}}for(var nt in o){var lt=o[nt];if(_t=s[nt],o.hasOwnProperty(nt)&&(lt!=null||_t!=null))switch(nt){case"type":d=lt;break;case"name":u=lt;break;case"checked":et=lt;break;case"defaultChecked":ht=lt;break;case"value":y=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(a(137,i));break;default:lt!==_t&&ke(e,i,nt,lt,o,_t)}}Bn(e,y,b,I,et,ht,d,u);return;case"select":lt=y=b=nt=null;for(d in s)if(I=s[d],s.hasOwnProperty(d)&&I!=null)switch(d){case"value":break;case"multiple":lt=I;default:o.hasOwnProperty(d)||ke(e,i,d,null,o,I)}for(u in o)if(d=o[u],I=s[u],o.hasOwnProperty(u)&&(d!=null||I!=null))switch(u){case"value":nt=d;break;case"defaultValue":b=d;break;case"multiple":y=d;default:d!==I&&ke(e,i,u,d,o,I)}i=b,s=y,o=lt,nt!=null?Zi(e,!!s,nt,!1):!!o!=!!s&&(i!=null?Zi(e,!!s,i,!0):Zi(e,!!s,s?[]:"",!1));return;case"textarea":lt=nt=null;for(b in s)if(u=s[b],s.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:ke(e,i,b,null,o,u)}for(y in o)if(u=o[y],d=s[y],o.hasOwnProperty(y)&&(u!=null||d!=null))switch(y){case"value":nt=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==d&&ke(e,i,y,u,o,d)}yp(e,nt,lt);return;case"option":for(var Ft in s)if(nt=s[Ft],s.hasOwnProperty(Ft)&&nt!=null&&!o.hasOwnProperty(Ft))switch(Ft){case"selected":e.selected=!1;break;default:ke(e,i,Ft,null,o,nt)}for(I in o)if(nt=o[I],lt=s[I],o.hasOwnProperty(I)&&nt!==lt&&(nt!=null||lt!=null))switch(I){case"selected":e.selected=nt&&typeof nt!="function"&&typeof nt!="symbol";break;default:ke(e,i,I,nt,o,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in s)nt=s[Jt],s.hasOwnProperty(Jt)&&nt!=null&&!o.hasOwnProperty(Jt)&&ke(e,i,Jt,null,o,nt);for(et in o)if(nt=o[et],lt=s[et],o.hasOwnProperty(et)&&nt!==lt&&(nt!=null||lt!=null))switch(et){case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(a(137,i));break;default:ke(e,i,et,nt,o,lt)}return;default:if(vu(i)){for(var Xe in s)nt=s[Xe],s.hasOwnProperty(Xe)&&nt!==void 0&&!o.hasOwnProperty(Xe)&&sh(e,i,Xe,void 0,o,nt);for(ht in o)nt=o[ht],lt=s[ht],!o.hasOwnProperty(ht)||nt===lt||nt===void 0&&lt===void 0||sh(e,i,ht,nt,o,lt);return}}for(var Y in s)nt=s[Y],s.hasOwnProperty(Y)&&nt!=null&&!o.hasOwnProperty(Y)&&ke(e,i,Y,null,o,nt);for(_t in o)nt=o[_t],lt=s[_t],!o.hasOwnProperty(_t)||nt===lt||nt==null&&lt==null||ke(e,i,_t,nt,o,lt)}function Tg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function nS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var u=s[o],d=u.transferSize,y=u.initiatorType,b=u.duration;if(d&&b&&Tg(y)){for(y=0,b=u.responseEnd,o+=1;o<s.length;o++){var I=s[o],et=I.startTime;if(et>b)break;var ht=I.transferSize,_t=I.initiatorType;ht&&Tg(_t)&&(I=I.responseEnd,y+=ht*(I<b?1:(b-et)/(I-et)))}if(--o,i+=8*(d+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var rh=null,oh=null;function uc(e){return e.nodeType===9?e:e.ownerDocument}function bg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ag(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function lh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var ch=null;function iS(){var e=window.event;return e&&e.type==="popstate"?e===ch?!1:(ch=e,!0):(ch=null,!1)}var Rg=typeof setTimeout=="function"?setTimeout:void 0,aS=typeof clearTimeout=="function"?clearTimeout:void 0,wg=typeof Promise=="function"?Promise:void 0,sS=typeof queueMicrotask=="function"?queueMicrotask:typeof wg<"u"?function(e){return wg.resolve(null).then(e).catch(rS)}:Rg;function rS(e){setTimeout(function(){throw e})}function qa(e){return e==="head"}function Cg(e,i){var s=i,o=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(u),Sr(i);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")Go(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Go(s);for(var d=s.firstChild;d;){var y=d.nextSibling,b=d.nodeName;d[k]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&d.rel.toLowerCase()==="stylesheet"||s.removeChild(d),d=y}}else s==="body"&&Go(e.ownerDocument.body);s=u}while(s);Sr(i)}function Dg(e,i){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function uh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":uh(s),ot(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function oS(e,i,s,o){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[k])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Si(e.nextSibling),e===null)break}return null}function lS(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Si(e.nextSibling),e===null))return null;return e}function Ug(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Si(e.nextSibling),e===null))return null;return e}function fh(e){return e.data==="$?"||e.data==="$~"}function hh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function cS(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var o=function(){i(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Si(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var dh=null;function Lg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Si(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function Ng(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function Og(e,i,s){switch(i=uc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Go(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);ot(e)}var Mi=new Map,Pg=new Set;function fc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ha=Q.d;Q.d={f:uS,r:fS,D:hS,C:dS,L:pS,m:mS,X:_S,S:gS,M:vS};function uS(){var e=ha.f(),i=nc();return e||i}function fS(e){var i=X(e);i!==null&&i.tag===5&&i.type==="form"?Jm(i):ha.r(e)}var vr=typeof document>"u"?null:document;function zg(e,i,s){var o=vr;if(o&&typeof i=="string"&&i){var u=En(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),Pg.has(u)||(Pg.add(u),e={rel:e,crossOrigin:s,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Nn(i,"link",e),Ut(i),o.head.appendChild(i)))}}function hS(e){ha.D(e),zg("dns-prefetch",e,null)}function dS(e,i){ha.C(e,i),zg("preconnect",e,i)}function pS(e,i,s){ha.L(e,i,s);var o=vr;if(o&&e&&i){var u='link[rel="preload"][as="'+En(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+En(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+En(s.imageSizes)+'"]')):u+='[href="'+En(e)+'"]';var d=u;switch(i){case"style":d=xr(e);break;case"script":d=yr(e)}Mi.has(d)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Mi.set(d,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(Ho(d))||i==="script"&&o.querySelector(Vo(d))||(i=o.createElement("link"),Nn(i,"link",e),Ut(i),o.head.appendChild(i)))}}function mS(e,i){ha.m(e,i);var s=vr;if(s&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+En(o)+'"][href="'+En(e)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=yr(e)}if(!Mi.has(d)&&(e=_({rel:"modulepreload",href:e},i),Mi.set(d,e),s.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Vo(d)))return}o=s.createElement("link"),Nn(o,"link",e),Ut(o),s.head.appendChild(o)}}}function gS(e,i,s){ha.S(e,i,s);var o=vr;if(o&&e){var u=Dt(o).hoistableStyles,d=xr(e);i=i||"default";var y=u.get(d);if(!y){var b={loading:0,preload:null};if(y=o.querySelector(Ho(d)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Mi.get(d))&&ph(e,s);var I=y=o.createElement("link");Ut(I),Nn(I,"link",e),I._p=new Promise(function(et,ht){I.onload=et,I.onerror=ht}),I.addEventListener("load",function(){b.loading|=1}),I.addEventListener("error",function(){b.loading|=2}),b.loading|=4,hc(y,i,o)}y={type:"stylesheet",instance:y,count:1,state:b},u.set(d,y)}}}function _S(e,i){ha.X(e,i);var s=vr;if(s&&e){var o=Dt(s).hoistableScripts,u=yr(e),d=o.get(u);d||(d=s.querySelector(Vo(u)),d||(e=_({src:e,async:!0},i),(i=Mi.get(u))&&mh(e,i),d=s.createElement("script"),Ut(d),Nn(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function vS(e,i){ha.M(e,i);var s=vr;if(s&&e){var o=Dt(s).hoistableScripts,u=yr(e),d=o.get(u);d||(d=s.querySelector(Vo(u)),d||(e=_({src:e,async:!0,type:"module"},i),(i=Mi.get(u))&&mh(e,i),d=s.createElement("script"),Ut(d),Nn(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Bg(e,i,s,o){var u=(u=Et.current)?fc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=xr(s.href),s=Dt(u).hoistableStyles,o=s.get(i),o||(o={type:"style",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=xr(s.href);var d=Dt(u).hoistableStyles,y=d.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=u.querySelector(Ho(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Mi.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Mi.set(e,s),d||xS(u,e,s,y.state))),i&&o===null)throw Error(a(528,""));return y}if(i&&o!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=yr(s),s=Dt(u).hoistableScripts,o=s.get(i),o||(o={type:"script",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function xr(e){return'href="'+En(e)+'"'}function Ho(e){return'link[rel="stylesheet"]['+e+"]"}function Ig(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function xS(e,i,s,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Nn(i,"link",s),Ut(i),e.head.appendChild(i))}function yr(e){return'[src="'+En(e)+'"]'}function Vo(e){return"script[async]"+e}function Fg(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+En(s.href)+'"]');if(o)return i.instance=o,Ut(o),o;var u=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Ut(o),Nn(o,"style",u),hc(o,s.precedence,e),i.instance=o;case"stylesheet":u=xr(s.href);var d=e.querySelector(Ho(u));if(d)return i.state.loading|=4,i.instance=d,Ut(d),d;o=Ig(s),(u=Mi.get(u))&&ph(o,u),d=(e.ownerDocument||e).createElement("link"),Ut(d);var y=d;return y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Nn(d,"link",o),i.state.loading|=4,hc(d,s.precedence,e),i.instance=d;case"script":return d=yr(s.src),(u=e.querySelector(Vo(d)))?(i.instance=u,Ut(u),u):(o=s,(u=Mi.get(d))&&(o=_({},s),mh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Ut(u),Nn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,hc(o,s.precedence,e));return i.instance}function hc(e,i,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,y=0;y<o.length;y++){var b=o[y];if(b.dataset.precedence===i)d=b;else if(d!==u)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function ph(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function mh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var dc=null;function Gg(e,i,s){if(dc===null){var o=new Map,u=dc=new Map;u.set(s,o)}else u=dc,o=u.get(s),o||(o=new Map,u.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var d=s[u];if(!(d[k]||d[en]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(i)||"";y=e+y;var b=o.get(y);b?b.push(d):o.set(y,[d])}}return o}function Hg(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function yS(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Vg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function SS(e,i,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=xr(o.href),d=i.querySelector(Ho(u));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=pc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=d,Ut(d);return}d=i.ownerDocument||i,o=Ig(o),(u=Mi.get(u))&&ph(o,u),d=d.createElement("link"),Ut(d);var y=d;y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Nn(d,"link",o),s.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=pc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var gh=0;function MS(e,i){return e.stylesheets&&e.count===0&&gc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+i);0<e.imgBytes&&gh===0&&(gh=62500*nS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>gh?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function pc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)gc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var mc=null;function gc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,mc=new Map,i.forEach(ES,e),mc=null,pc.call(e))}function ES(e,i){if(!(i.state.loading&4)){var s=mc.get(e);if(s)var o=s.get(null);else{s=new Map,mc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var y=u[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),o=y)}o&&s.set(null,o)}u=i.instance,y=u.getAttribute("data-precedence"),d=s.get(y)||o,d===o&&s.set(null,u),s.set(y,u),this.count++,o=pc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var ko={$$typeof:L,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function TS(e,i,s,o,u,d,y,b,I){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=I,this.incompleteTransitions=new Map}function kg(e,i,s,o,u,d,y,b,I,et,ht,_t){return e=new TS(e,i,s,y,I,et,ht,_t,b),i=1,d===!0&&(i|=24),d=ii(3,null,null,i),e.current=d,d.stateNode=e,i=ju(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:o,isDehydrated:s,cache:i},Ju(d),e}function Xg(e){return e?(e=Qs,e):Qs}function qg(e,i,s,o,u,d){u=Xg(u),o.context===null?o.context=u:o.pendingContext=u,o=Oa(i),o.payload={element:s},d=d===void 0?null:d,d!==null&&(o.callback=d),s=Pa(e,o,i),s!==null&&(Jn(s,e,i),So(s,e,i))}function Wg(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function _h(e,i){Wg(e,i),(e=e.alternate)&&Wg(e,i)}function Yg(e){if(e.tag===13||e.tag===31){var i=gs(e,67108864);i!==null&&Jn(i,e,67108864),_h(e,67108864)}}function jg(e){if(e.tag===13||e.tag===31){var i=li();i=fs(i);var s=gs(e,i);s!==null&&Jn(s,e,i),_h(e,i)}}var _c=!0;function bS(e,i,s,o){var u=z.T;z.T=null;var d=Q.p;try{Q.p=2,vh(e,i,s,o)}finally{Q.p=d,z.T=u}}function AS(e,i,s,o){var u=z.T;z.T=null;var d=Q.p;try{Q.p=8,vh(e,i,s,o)}finally{Q.p=d,z.T=u}}function vh(e,i,s,o){if(_c){var u=xh(o);if(u===null)ah(e,i,o,vc,s),Kg(e,o);else if(wS(u,e,i,s,o))o.stopPropagation();else if(Kg(e,o),i&4&&-1<RS.indexOf(e)){for(;u!==null;){var d=X(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=Ct(d.pendingLanes);if(y!==0){var b=d;for(b.pendingLanes|=2,b.entangledLanes|=2;y;){var I=1<<31-te(y);b.entanglements[1]|=I,y&=~I}Xi(d),(Le&6)===0&&(tc=dt()+500,Bo(0))}}break;case 31:case 13:b=gs(d,2),b!==null&&Jn(b,d,2),nc(),_h(d,2)}if(d=xh(o),d===null&&ah(e,i,o,vc,s),d===u)break;u=d}u!==null&&o.stopPropagation()}else ah(e,i,o,null,s)}}function xh(e){return e=yu(e),yh(e)}var vc=null;function yh(e){if(vc=null,e=rt(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=f(i),e!==null)return e;e=null}else if(s===31){if(e=h(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return vc=e,null}function Zg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case gt:return 2;case Wt:return 8;case Lt:case zt:return 32;case _e:return 268435456;default:return 32}default:return 32}}var Sh=!1,Wa=null,Ya=null,ja=null,Xo=new Map,qo=new Map,Za=[],RS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Kg(e,i){switch(e){case"focusin":case"focusout":Wa=null;break;case"dragenter":case"dragleave":Ya=null;break;case"mouseover":case"mouseout":ja=null;break;case"pointerover":case"pointerout":Xo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":qo.delete(i.pointerId)}}function Wo(e,i,s,o,u,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:s,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},i!==null&&(i=X(i),i!==null&&Yg(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function wS(e,i,s,o,u){switch(i){case"focusin":return Wa=Wo(Wa,e,i,s,o,u),!0;case"dragenter":return Ya=Wo(Ya,e,i,s,o,u),!0;case"mouseover":return ja=Wo(ja,e,i,s,o,u),!0;case"pointerover":var d=u.pointerId;return Xo.set(d,Wo(Xo.get(d)||null,e,i,s,o,u)),!0;case"gotpointercapture":return d=u.pointerId,qo.set(d,Wo(qo.get(d)||null,e,i,s,o,u)),!0}return!1}function Qg(e){var i=rt(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=f(s),i!==null){e.blockedOn=i,hs(e.priority,function(){jg(s)});return}}else if(i===31){if(i=h(s),i!==null){e.blockedOn=i,hs(e.priority,function(){jg(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=xh(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);xu=o,s.target.dispatchEvent(o),xu=null}else return i=X(s),i!==null&&Yg(i),e.blockedOn=s,!1;i.shift()}return!0}function Jg(e,i,s){xc(e)&&s.delete(i)}function CS(){Sh=!1,Wa!==null&&xc(Wa)&&(Wa=null),Ya!==null&&xc(Ya)&&(Ya=null),ja!==null&&xc(ja)&&(ja=null),Xo.forEach(Jg),qo.forEach(Jg)}function yc(e,i){e.blockedOn===i&&(e.blockedOn=null,Sh||(Sh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,CS)))}var Sc=null;function $g(e){Sc!==e&&(Sc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Sc===e&&(Sc=null);for(var i=0;i<e.length;i+=3){var s=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(yh(o||s)===null)continue;break}var d=X(s);d!==null&&(e.splice(i,3),i-=3,xf(d,{pending:!0,data:u,method:s.method,action:o},o,u))}}))}function Sr(e){function i(I){return yc(I,e)}Wa!==null&&yc(Wa,e),Ya!==null&&yc(Ya,e),ja!==null&&yc(ja,e),Xo.forEach(i),qo.forEach(i);for(var s=0;s<Za.length;s++){var o=Za[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Za.length&&(s=Za[0],s.blockedOn===null);)Qg(s),s.blockedOn===null&&Za.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var u=s[o],d=s[o+1],y=u[wn]||null;if(typeof d=="function")y||$g(s);else if(y){var b=null;if(d&&d.hasAttribute("formAction")){if(u=d,y=d[wn]||null)b=y.formAction;else if(yh(u)!==null)continue}else b=y.action;typeof b=="function"?s[o+1]=b:(s.splice(o,3),o-=3),$g(s)}}}function t_(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function Mh(e){this._internalRoot=e}Mc.prototype.render=Mh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,o=li();qg(s,o,e,i,null,null)},Mc.prototype.unmount=Mh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;qg(e.current,2,null,e,null,null),nc(),i[ji]=null}};function Mc(e){this._internalRoot=e}Mc.prototype.unstable_scheduleHydration=function(e){if(e){var i=io();e={blockedOn:null,target:e,priority:i};for(var s=0;s<Za.length&&i!==0&&i<Za[s].priority;s++);Za.splice(s,0,e),s===0&&Qg(e)}};var e_=t.version;if(e_!=="19.2.8")throw Error(a(527,e_,"19.2.8"));Q.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=m(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var DS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ec.isDisabled&&Ec.supportsFiber)try{Kt=Ec.inject(DS),Yt=Ec}catch{}}return jo.createRoot=function(e,i){if(!l(e))throw Error(a(299));var s=!1,o="",u=l0,d=c0,y=u0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=kg(e,1,!1,null,null,s,o,null,u,d,y,t_),e[ji]=i.current,ih(e),new Mh(i)},jo.hydrateRoot=function(e,i,s){if(!l(e))throw Error(a(299));var o=!1,u="",d=l0,y=c0,b=u0,I=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(d=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(b=s.onRecoverableError),s.formState!==void 0&&(I=s.formState)),i=kg(e,1,!0,i,s??null,o,u,I,d,y,b,t_),i.context=Xg(null),s=i.current,o=li(),o=fs(o),u=Oa(o),u.callback=null,Pa(s,u,o),s=o,i.current.lanes=s,Rn(i,s),Xi(i),e[ji]=i.current,ih(e),new Mc(i)},jo.version="19.2.8",jo}var f_;function VS(){if(f_)return bh.exports;f_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),bh.exports=HS(),bh.exports}var kS=VS();const XS=zv(kS),h_=r=>{let t;const n=new Set,a=(m,g)=>{const _=typeof m=="function"?m(t):m;if(!Object.is(_,t)){const x=t;t=g??(typeof _!="object"||_===null)?_:Object.assign({},t,_),n.forEach(M=>M(t,x))}},l=()=>t,h={setState:a,getState:l,getInitialState:()=>p,subscribe:m=>(n.add(m),()=>n.delete(m))},p=t=r(a,l,h);return h},qS=(r=>r?h_(r):h_),WS=r=>r;function YS(r,t=WS){const n=nl.useSyncExternalStore(r.subscribe,nl.useCallback(()=>t(r.getState()),[r,t]),nl.useCallback(()=>t(r.getInitialState()),[r,t]));return nl.useDebugValue(n),n}const d_=r=>{const t=qS(r),n=a=>YS(t,a);return Object.assign(n,t),n},jS=(r=>r?d_(r):d_),Tc=1/60,p_=100,m_=100,ZS=35,KS=100,QS=20,JS=5,Ch=1.5,$S=3,tM=2,g_=30,Dh=200,_d=60,Uh=150,eM=.9,__=3.5,v_=2.2,bc=15,Lh=8,Jc=8,nM=20,iM=2.5,aM=10,sM=.14,rM=.2,oM=.4,lM=.05,cM=1.2,uM=60,fM=6,hM=2,Nh=4,dM=.3,pM=2.5,mM=.4,x_={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,bossFight:!1,bossName:"",introActive:!1,edgePulseAt:0,timeDilationUntil:0,lockOn:!1};function y_(r){return{id:r,pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0},hp:p_,maxHp:p_,energy:m_,maxEnergy:m_,speed:QS,weapon:1,weapons:[1,2,3],specialGauge:0,maxSpecialGauge:KS,invulnTimer:0,alive:!0,score:0,kills:0,combo:0}}function S_(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:.5,aimY:.5,weaponSwitch:0,boost:!1,brake:!1,dodge:!1,special:!1,lockToggle:!1,pause:!1}}const gn=jS(r=>({game:{...x_},players:[y_(0)],inputs:[S_()],setGame:t=>r(n=>({game:{...n.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),triggerEdgePulse:()=>r(t=>({game:{...t.game,edgePulseAt:performance.now()}})),triggerTimeDilation:t=>r(n=>({game:{...n.game,timeDilationUntil:performance.now()+t*1e3}})),resetGame:()=>r({game:{...x_},players:[y_(0)],inputs:[S_()]})})),Oh=({size:r=80,opacity:t=.5})=>Z.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[Z.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#FFEE00",strokeWidth:"3"}),Z.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#FFEE00",strokeWidth:"2"})]}),M_=()=>{const r=gn(t=>t.setGame);return Z.jsxs("div",{className:"cp-bg w-full h-full relative overflow-hidden flex items-center justify-center",children:[Z.jsx("div",{className:"cp-watermark"}),Z.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:Z.jsx(Oh,{size:520,opacity:.08})}),Z.jsxs("div",{className:"relative z-10 mx-auto w-[520px] max-w-[92vw] cp-frame px-6 py-6",children:[Z.jsx("span",{className:"cp-corner-bl"}),Z.jsx("span",{className:"cp-corner-br"}),Z.jsxs("div",{className:"flex items-start gap-4",children:[Z.jsxs("div",{className:"flex-1",children:[Z.jsxs("div",{className:"cp-label text-[12px] tracking-[0.4em] mb-1",children:[Z.jsx("span",{style:{color:"#ff3030"},children:"下"}),Z.jsx("span",{children:" 一 "}),Z.jsx("span",{style:{color:"#ff3030"},children:"战"}),Z.jsx("span",{children:" 高 达"})]}),Z.jsx("h1",{className:"cp-title leading-none",style:{fontSize:"46px"},children:"纯白枪骑兵"}),Z.jsx("div",{className:"mt-1 cp-label text-[11px] tracking-[0.3em]",style:{color:"#FFEE00"},children:"SILVER LANCER"})]}),Z.jsx("div",{className:"mt-1",children:Z.jsx(Oh,{size:56,opacity:.85})})]}),Z.jsxs("div",{className:"mt-6 border-t border-[#FFEE00]/40 pt-4 space-y-2",children:[Z.jsx("button",{onClick:()=>r({screen:"pve",gameMode:"pve"}),className:"cp-btn w-full py-2 text-base",children:"开始游戏"}),Z.jsx("button",{className:"cp-btn w-full py-2 text-base opacity-60 cursor-default",disabled:!0,children:"操作指南"}),Z.jsx("button",{className:"cp-btn w-full py-2 text-base opacity-60 cursor-default",disabled:!0,children:"游戏设置"}),Z.jsx("button",{className:"cp-btn w-full py-2 text-base opacity-60 cursor-default",disabled:!0,children:"游戏信息"})]}),Z.jsx("div",{className:"mt-5 flex items-end justify-center",children:Z.jsxs("div",{className:"text-center",children:[Z.jsx(Oh,{size:42,opacity:.95}),Z.jsx("div",{className:"cp-label text-[11px] tracking-[0.25em] mt-1",children:"PHIXCAT"}),Z.jsx("div",{className:"cp-num text-[8px] tracking-wider mt-1",style:{color:E_},children:"FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79"}),Z.jsx("div",{className:"cp-num text-[8px] tracking-wider",style:{color:E_},children:"Copyrights 2007—2008 phixcat All rights reserved"})]})})]}),Z.jsx("div",{className:"hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none",children:Z.jsxs("svg",{viewBox:"0 0 200 280",width:"280",height:"380",fill:"#ffffff",children:[Z.jsx("polygon",{points:"80,30 120,30 130,55 70,55"}),Z.jsx("rect",{x:"70",y:"55",width:"60",height:"25"}),Z.jsx("polygon",{points:"30,75 70,80 70,130 25,130"}),Z.jsx("polygon",{points:"130,80 170,75 175,130 130,130"}),Z.jsx("rect",{x:"55",y:"80",width:"90",height:"90"}),Z.jsx("polygon",{points:"80,90 120,90 100,140",fill:"#000"}),Z.jsx("rect",{x:"20",y:"130",width:"40",height:"80"}),Z.jsx("rect",{x:"140",y:"130",width:"40",height:"80"}),Z.jsx("polygon",{points:"60,170 140,170 150,210 50,210"}),Z.jsx("polygon",{points:"55,210 95,210 90,275 60,275"}),Z.jsx("polygon",{points:"105,210 145,210 140,275 110,275"})]})})]})},E_="rgba(255, 238, 0, 0.30)";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lp="170",gM=0,T_=1,_M=2,Bv=1,vM=2,va=3,cs=0,Xn=1,xa=2,Ma=0,Gr=1,rl=2,b_=3,A_=4,xM=5,Bs=100,yM=101,SM=102,MM=103,EM=104,TM=200,bM=201,AM=202,RM=203,vd=204,xd=205,wM=206,CM=207,DM=208,UM=209,LM=210,NM=211,OM=212,PM=213,zM=214,yd=0,Sd=1,Md=2,Xr=3,Ed=4,Td=5,bd=6,Ad=7,Iv=0,BM=1,IM=2,ls=0,Fv=1,Gv=2,Hv=3,Vv=4,FM=5,kv=6,Xv=7,qv=300,qr=301,Wr=302,Rd=303,wd=304,hu=306,Cd=1e3,Fs=1001,Dd=1002,Ii=1003,GM=1004,Ac=1005,Yi=1006,Ph=1007,Gs=1008,Ta=1009,Wv=1010,Yv=1011,ll=1012,cp=1013,Vs=1014,ya=1015,Kr=1016,up=1017,fp=1018,Yr=1020,jv=35902,Zv=1021,Kv=1022,Bi=1023,Qv=1024,Jv=1025,Hr=1026,jr=1027,$v=1028,hp=1029,tx=1030,dp=1031,pp=1033,$c=33776,tu=33777,eu=33778,nu=33779,Ud=35840,Ld=35841,Nd=35842,Od=35843,Pd=36196,zd=37492,Bd=37496,Id=37808,Fd=37809,Gd=37810,Hd=37811,Vd=37812,kd=37813,Xd=37814,qd=37815,Wd=37816,Yd=37817,jd=37818,Zd=37819,Kd=37820,Qd=37821,iu=36492,Jd=36494,$d=36495,ex=36283,tp=36284,ep=36285,np=36286,HM=3200,VM=3201,kM=0,XM=1,rs="",Ti="srgb",Qr="srgb-linear",du="linear",Ie="srgb",Mr=7680,R_=519,qM=512,WM=513,YM=514,nx=515,jM=516,ZM=517,KM=518,QM=519,w_=35044,C_="300 es",Sa=2e3,ru=2001;class Jr{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const a=this._listeners;return a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const a=this._listeners[t.type];if(a!==void 0){t.target=this;const l=a.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zh=Math.PI/180,ip=180/Math.PI;function cl(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Fn[r&255]+Fn[r>>8&255]+Fn[r>>16&255]+Fn[r>>24&255]+"-"+Fn[t&255]+Fn[t>>8&255]+"-"+Fn[t>>16&15|64]+Fn[t>>24&255]+"-"+Fn[n&63|128]+Fn[n>>8&255]+"-"+Fn[n>>16&255]+Fn[n>>24&255]+Fn[a&255]+Fn[a>>8&255]+Fn[a>>16&255]+Fn[a>>24&255]).toLowerCase()}function ti(r,t,n){return Math.max(t,Math.min(n,r))}function JM(r,t){return(r%t+t)%t}function Bh(r,t,n){return(1-n)*r+n*t}function Zo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function $n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class we{constructor(t=0,n=0){we.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,l=t.elements;return this.x=l[0]*n+l[3]*a+l[6],this.y=l[1]*n+l[4]*a+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ti(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*a-f*l+t.x,this.y=c*l+f*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,n,a,l,c,f,h,p,m){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,h,p,m)}set(t,n,a,l,c,f,h,p,m){const g=this.elements;return g[0]=t,g[1]=l,g[2]=h,g[3]=n,g[4]=c,g[5]=p,g[6]=a,g[7]=f,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],h=a[3],p=a[6],m=a[1],g=a[4],_=a[7],x=a[2],M=a[5],E=a[8],T=l[0],S=l[3],v=l[6],U=l[1],L=l[4],w=l[7],W=l[2],B=l[5],O=l[8];return c[0]=f*T+h*U+p*W,c[3]=f*S+h*L+p*B,c[6]=f*v+h*w+p*O,c[1]=m*T+g*U+_*W,c[4]=m*S+g*L+_*B,c[7]=m*v+g*w+_*O,c[2]=x*T+M*U+E*W,c[5]=x*S+M*L+E*B,c[8]=x*v+M*w+E*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8];return n*f*g-n*h*m-a*c*g+a*h*p+l*c*m-l*f*p}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],_=g*f-h*m,x=h*p-g*c,M=m*c-f*p,E=n*_+a*x+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=_*T,t[1]=(l*m-g*a)*T,t[2]=(h*a-l*f)*T,t[3]=x*T,t[4]=(g*n-l*p)*T,t[5]=(l*c-h*n)*T,t[6]=M*T,t[7]=(a*p-m*n)*T,t[8]=(f*n-a*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,l,c,f,h){const p=Math.cos(c),m=Math.sin(c);return this.set(a*p,a*m,-a*(p*f+m*h)+f+t,-l*m,l*p,-l*(-m*f+p*h)+h+n,0,0,1),this}scale(t,n){return this.premultiply(Ih.makeScale(t,n)),this}rotate(t){return this.premultiply(Ih.makeRotation(-t)),this}translate(t,n){return this.premultiply(Ih.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<9;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ih=new ce;function ix(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ou(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function $M(){const r=ou("canvas");return r.style.display="block",r}const D_={};function il(r){r in D_||(D_[r]=!0,console.warn(r))}function tE(r,t,n){return new Promise(function(a,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}function eE(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function nE(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const be={enabled:!0,workingColorSpace:Qr,spaces:{},convert:function(r,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===Ie&&(r.r=Ea(r.r),r.g=Ea(r.g),r.b=Ea(r.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Ie&&(r.r=Vr(r.r),r.g=Vr(r.g),r.b=Vr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===rs?du:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,n){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Ea(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Vr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const U_=[.64,.33,.3,.6,.15,.06],L_=[.2126,.7152,.0722],N_=[.3127,.329],O_=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),P_=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);be.define({[Qr]:{primaries:U_,whitePoint:N_,transfer:du,toXYZ:O_,fromXYZ:P_,luminanceCoefficients:L_,workingColorSpaceConfig:{unpackColorSpace:Ti},outputColorSpaceConfig:{drawingBufferColorSpace:Ti}},[Ti]:{primaries:U_,whitePoint:N_,transfer:Ie,toXYZ:O_,fromXYZ:P_,luminanceCoefficients:L_,outputColorSpaceConfig:{drawingBufferColorSpace:Ti}}});let Er;class iE{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Er===void 0&&(Er=ou("canvas")),Er.width=t.width,Er.height=t.height;const a=Er.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),n=Er}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=ou("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const l=a.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ea(c[f]/255)*255;return a.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Ea(n[a]/255)*255):n[a]=Ea(n[a]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let aE=0;class ax{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:aE++}),this.uuid=cl(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Fh(l[f].image)):c.push(Fh(l[f]))}else c=Fh(l);a.url=c}return n||(t.images[this.uuid]=a),a}}function Fh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?iE.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sE=0;class ei extends Jr{constructor(t=ei.DEFAULT_IMAGE,n=ei.DEFAULT_MAPPING,a=Fs,l=Fs,c=Yi,f=Gs,h=Bi,p=Ta,m=ei.DEFAULT_ANISOTROPY,g=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sE++}),this.uuid=cl(),this.name="",this.source=new ax(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Cd:t.x=t.x-Math.floor(t.x);break;case Fs:t.x=t.x<0?0:1;break;case Dd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Cd:t.y=t.y-Math.floor(t.y);break;case Fs:t.y=t.y<0?0:1;break;case Dd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ei.DEFAULT_IMAGE=null;ei.DEFAULT_MAPPING=qv;ei.DEFAULT_ANISOTROPY=1;class cn{constructor(t=0,n=0,a=0,l=1){cn.prototype.isVector4=!0,this.x=t,this.y=n,this.z=a,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,l){return this.x=t,this.y=n,this.z=a,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*a+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*a+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*a+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*a+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,l,c;const p=t.elements,m=p[0],g=p[4],_=p[8],x=p[1],M=p[5],E=p[9],T=p[2],S=p[6],v=p[10];if(Math.abs(g-x)<.01&&Math.abs(_-T)<.01&&Math.abs(E-S)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+T)<.1&&Math.abs(E+S)<.1&&Math.abs(m+M+v-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const L=(m+1)/2,w=(M+1)/2,W=(v+1)/2,B=(g+x)/4,O=(_+T)/4,G=(E+S)/4;return L>w&&L>W?L<.01?(a=0,l=.707106781,c=.707106781):(a=Math.sqrt(L),l=B/a,c=O/a):w>W?w<.01?(a=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),a=B/l,c=G/l):W<.01?(a=.707106781,l=.707106781,c=0):(c=Math.sqrt(W),a=O/c,l=G/c),this.set(a,l,c,n),this}let U=Math.sqrt((S-E)*(S-E)+(_-T)*(_-T)+(x-g)*(x-g));return Math.abs(U)<.001&&(U=1),this.x=(S-E)/U,this.y=(_-T)/U,this.z=(x-g)/U,this.w=Math.acos((m+M+v-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rE extends Jr{constructor(t=1,n=1,a={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new cn(0,0,t,n),this.scissorTest=!1,this.viewport=new cn(0,0,t,n);const l={width:t,height:n,depth:1};a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},a);const c=new ei(l,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace);c.flipY=!1,c.generateMipmaps=a.generateMipmaps,c.internalFormat=a.internalFormat,this.textures=[];const f=a.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0;this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=a;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let a=0,l=t.textures.length;a<l;a++)this.textures[a]=t.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new ax(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class us extends rE{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class sx extends ei{constructor(t=null,n=1,a=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class oE extends ei{constructor(t=null,n=1,a=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ul{constructor(t=0,n=0,a=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=l}static slerpFlat(t,n,a,l,c,f,h){let p=a[l+0],m=a[l+1],g=a[l+2],_=a[l+3];const x=c[f+0],M=c[f+1],E=c[f+2],T=c[f+3];if(h===0){t[n+0]=p,t[n+1]=m,t[n+2]=g,t[n+3]=_;return}if(h===1){t[n+0]=x,t[n+1]=M,t[n+2]=E,t[n+3]=T;return}if(_!==T||p!==x||m!==M||g!==E){let S=1-h;const v=p*x+m*M+g*E+_*T,U=v>=0?1:-1,L=1-v*v;if(L>Number.EPSILON){const W=Math.sqrt(L),B=Math.atan2(W,v*U);S=Math.sin(S*B)/W,h=Math.sin(h*B)/W}const w=h*U;if(p=p*S+x*w,m=m*S+M*w,g=g*S+E*w,_=_*S+T*w,S===1-h){const W=1/Math.sqrt(p*p+m*m+g*g+_*_);p*=W,m*=W,g*=W,_*=W}}t[n]=p,t[n+1]=m,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,l,c,f){const h=a[l],p=a[l+1],m=a[l+2],g=a[l+3],_=c[f],x=c[f+1],M=c[f+2],E=c[f+3];return t[n]=h*E+g*_+p*M-m*x,t[n+1]=p*E+g*x+m*_-h*M,t[n+2]=m*E+g*M+h*x-p*_,t[n+3]=g*E-h*_-p*x-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,l){return this._x=t,this._y=n,this._z=a,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,l=t._y,c=t._z,f=t._order,h=Math.cos,p=Math.sin,m=h(a/2),g=h(l/2),_=h(c/2),x=p(a/2),M=p(l/2),E=p(c/2);switch(f){case"XYZ":this._x=x*g*_+m*M*E,this._y=m*M*_-x*g*E,this._z=m*g*E+x*M*_,this._w=m*g*_-x*M*E;break;case"YXZ":this._x=x*g*_+m*M*E,this._y=m*M*_-x*g*E,this._z=m*g*E-x*M*_,this._w=m*g*_+x*M*E;break;case"ZXY":this._x=x*g*_-m*M*E,this._y=m*M*_+x*g*E,this._z=m*g*E+x*M*_,this._w=m*g*_-x*M*E;break;case"ZYX":this._x=x*g*_-m*M*E,this._y=m*M*_+x*g*E,this._z=m*g*E-x*M*_,this._w=m*g*_+x*M*E;break;case"YZX":this._x=x*g*_+m*M*E,this._y=m*M*_+x*g*E,this._z=m*g*E-x*M*_,this._w=m*g*_-x*M*E;break;case"XZY":this._x=x*g*_-m*M*E,this._y=m*M*_-x*g*E,this._z=m*g*E+x*M*_,this._w=m*g*_+x*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,l=Math.sin(a);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],l=n[4],c=n[8],f=n[1],h=n[5],p=n[9],m=n[2],g=n[6],_=n[10],x=a+h+_;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(g-p)*M,this._y=(c-m)*M,this._z=(f-l)*M}else if(a>h&&a>_){const M=2*Math.sqrt(1+a-h-_);this._w=(g-p)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+m)/M}else if(h>_){const M=2*Math.sqrt(1+h-a-_);this._w=(c-m)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(p+g)/M}else{const M=2*Math.sqrt(1+_-a-h);this._w=(f-l)/M,this._x=(c+m)/M,this._y=(p+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<Number.EPSILON?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ti(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const l=Math.min(1,n/a);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,l=t._y,c=t._z,f=t._w,h=n._x,p=n._y,m=n._z,g=n._w;return this._x=a*g+f*h+l*m-c*p,this._y=l*g+f*p+c*h-a*m,this._z=c*g+f*m+a*p-l*h,this._w=f*g-a*h-l*p-c*m,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const a=this._x,l=this._y,c=this._z,f=this._w;let h=f*t._w+a*t._x+l*t._y+c*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=f,this._x=a,this._y=l,this._z=c,this;const p=1-h*h;if(p<=Number.EPSILON){const M=1-n;return this._w=M*f+n*this._w,this._x=M*a+n*this._x,this._y=M*l+n*this._y,this._z=M*c+n*this._z,this.normalize(),this}const m=Math.sqrt(p),g=Math.atan2(m,h),_=Math.sin((1-n)*g)/m,x=Math.sin(n*g)/m;return this._w=f*_+this._w*x,this._x=a*_+this._x*x,this._y=l*_+this._y*x,this._z=c*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),l=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,n=0,a=0){J.prototype.isVector3=!0,this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(z_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(z_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*l,this.y=c[1]*n+c[4]*a+c[7]*l,this.z=c[2]*n+c[5]*a+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*a+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*a+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*a+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,a=this.y,l=this.z,c=t.x,f=t.y,h=t.z,p=t.w,m=2*(f*l-h*a),g=2*(h*n-c*l),_=2*(c*a-f*n);return this.x=n+p*m+f*_-h*g,this.y=a+p*g+h*m-c*_,this.z=l+p*_+c*g-f*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*l,this.y=c[1]*n+c[5]*a+c[9]*l,this.z=c[2]*n+c[6]*a+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,l=t.y,c=t.z,f=n.x,h=n.y,p=n.z;return this.x=l*p-c*h,this.y=c*f-a*p,this.z=a*h-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Gh.copy(this).projectOnVector(t),this.sub(Gh)}reflect(t){return this.sub(Gh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ti(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,l=this.z-t.z;return n*n+a*a+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const l=Math.sin(n)*t;return this.x=l*Math.sin(a),this.y=Math.cos(n)*t,this.z=l*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gh=new J,z_=new ul;class fl{constructor(t=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Ni.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Ni.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Ni.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)t.isMesh===!0?t.getVertexPosition(f,Ni):Ni.fromBufferAttribute(c,f),Ni.applyMatrix4(t.matrixWorld),this.expandByPoint(Ni);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Rc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Rc.copy(a.boundingBox)),Rc.applyMatrix4(t.matrixWorld),this.union(Rc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ni),Ni.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ko),wc.subVectors(this.max,Ko),Tr.subVectors(t.a,Ko),br.subVectors(t.b,Ko),Ar.subVectors(t.c,Ko),Qa.subVectors(br,Tr),Ja.subVectors(Ar,br),Cs.subVectors(Tr,Ar);let n=[0,-Qa.z,Qa.y,0,-Ja.z,Ja.y,0,-Cs.z,Cs.y,Qa.z,0,-Qa.x,Ja.z,0,-Ja.x,Cs.z,0,-Cs.x,-Qa.y,Qa.x,0,-Ja.y,Ja.x,0,-Cs.y,Cs.x,0];return!Hh(n,Tr,br,Ar,wc)||(n=[1,0,0,0,1,0,0,0,1],!Hh(n,Tr,br,Ar,wc))?!1:(Cc.crossVectors(Qa,Ja),n=[Cc.x,Cc.y,Cc.z],Hh(n,Tr,br,Ar,wc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ni).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ni).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(da[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),da[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),da[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),da[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),da[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),da[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),da[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),da[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(da),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const da=[new J,new J,new J,new J,new J,new J,new J,new J],Ni=new J,Rc=new fl,Tr=new J,br=new J,Ar=new J,Qa=new J,Ja=new J,Cs=new J,Ko=new J,wc=new J,Cc=new J,Ds=new J;function Hh(r,t,n,a,l){for(let c=0,f=r.length-3;c<=f;c+=3){Ds.fromArray(r,c);const h=l.x*Math.abs(Ds.x)+l.y*Math.abs(Ds.y)+l.z*Math.abs(Ds.z),p=t.dot(Ds),m=n.dot(Ds),g=a.dot(Ds);if(Math.max(-Math.max(p,m,g),Math.min(p,m,g))>h)return!1}return!0}const lE=new fl,Qo=new J,Vh=new J;class hl{constructor(t=new J,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):lE.setFromPoints(t).getCenter(a);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qo.subVectors(t,this.center);const n=Qo.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),l=(a-this.radius)*.5;this.center.addScaledVector(Qo,l/a),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qo.copy(t.center).add(Vh)),this.expandByPoint(Qo.copy(t.center).sub(Vh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pa=new J,kh=new J,Dc=new J,$a=new J,Xh=new J,Uc=new J,qh=new J;class mp{constructor(t=new J,n=new J(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pa)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=pa.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(pa.copy(this.origin).addScaledVector(this.direction,n),pa.distanceToSquared(t))}distanceSqToSegment(t,n,a,l){kh.copy(t).add(n).multiplyScalar(.5),Dc.copy(n).sub(t).normalize(),$a.copy(this.origin).sub(kh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(Dc),h=$a.dot(this.direction),p=-$a.dot(Dc),m=$a.lengthSq(),g=Math.abs(1-f*f);let _,x,M,E;if(g>0)if(_=f*p-h,x=f*h-p,E=c*g,_>=0)if(x>=-E)if(x<=E){const T=1/g;_*=T,x*=T,M=_*(_+f*x+2*h)+x*(f*_+x+2*p)+m}else x=c,_=Math.max(0,-(f*x+h)),M=-_*_+x*(x+2*p)+m;else x=-c,_=Math.max(0,-(f*x+h)),M=-_*_+x*(x+2*p)+m;else x<=-E?(_=Math.max(0,-(-f*c+h)),x=_>0?-c:Math.min(Math.max(-c,-p),c),M=-_*_+x*(x+2*p)+m):x<=E?(_=0,x=Math.min(Math.max(-c,-p),c),M=x*(x+2*p)+m):(_=Math.max(0,-(f*c+h)),x=_>0?c:Math.min(Math.max(-c,-p),c),M=-_*_+x*(x+2*p)+m);else x=f>0?-c:c,_=Math.max(0,-(f*x+h)),M=-_*_+x*(x+2*p)+m;return a&&a.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(kh).addScaledVector(Dc,x),M}intersectSphere(t,n){pa.subVectors(t.center,this.origin);const a=pa.dot(this.direction),l=pa.dot(pa)-a*a,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=a-f,p=a+f;return p<0?null:h<0?this.at(p,n):this.at(h,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,l,c,f,h,p;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return m>=0?(a=(t.min.x-x.x)*m,l=(t.max.x-x.x)*m):(a=(t.max.x-x.x)*m,l=(t.min.x-x.x)*m),g>=0?(c=(t.min.y-x.y)*g,f=(t.max.y-x.y)*g):(c=(t.max.y-x.y)*g,f=(t.min.y-x.y)*g),a>f||c>l||((c>a||isNaN(a))&&(a=c),(f<l||isNaN(l))&&(l=f),_>=0?(h=(t.min.z-x.z)*_,p=(t.max.z-x.z)*_):(h=(t.max.z-x.z)*_,p=(t.min.z-x.z)*_),a>p||h>l)||((h>a||a!==a)&&(a=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(a>=0?a:l,n)}intersectsBox(t){return this.intersectBox(t,pa)!==null}intersectTriangle(t,n,a,l,c){Xh.subVectors(n,t),Uc.subVectors(a,t),qh.crossVectors(Xh,Uc);let f=this.direction.dot(qh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;$a.subVectors(this.origin,t);const p=h*this.direction.dot(Uc.crossVectors($a,Uc));if(p<0)return null;const m=h*this.direction.dot(Xh.cross($a));if(m<0||p+m>f)return null;const g=-h*$a.dot(qh);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class sn{constructor(t,n,a,l,c,f,h,p,m,g,_,x,M,E,T,S){sn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,h,p,m,g,_,x,M,E,T,S)}set(t,n,a,l,c,f,h,p,m,g,_,x,M,E,T,S){const v=this.elements;return v[0]=t,v[4]=n,v[8]=a,v[12]=l,v[1]=c,v[5]=f,v[9]=h,v[13]=p,v[2]=m,v[6]=g,v[10]=_,v[14]=x,v[3]=M,v[7]=E,v[11]=T,v[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sn().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,a=t.elements,l=1/Rr.setFromMatrixColumn(t,0).length(),c=1/Rr.setFromMatrixColumn(t,1).length(),f=1/Rr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*l,n[1]=a[1]*l,n[2]=a[2]*l,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*f,n[9]=a[9]*f,n[10]=a[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,l=t.y,c=t.z,f=Math.cos(a),h=Math.sin(a),p=Math.cos(l),m=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const x=f*g,M=f*_,E=h*g,T=h*_;n[0]=p*g,n[4]=-p*_,n[8]=m,n[1]=M+E*m,n[5]=x-T*m,n[9]=-h*p,n[2]=T-x*m,n[6]=E+M*m,n[10]=f*p}else if(t.order==="YXZ"){const x=p*g,M=p*_,E=m*g,T=m*_;n[0]=x+T*h,n[4]=E*h-M,n[8]=f*m,n[1]=f*_,n[5]=f*g,n[9]=-h,n[2]=M*h-E,n[6]=T+x*h,n[10]=f*p}else if(t.order==="ZXY"){const x=p*g,M=p*_,E=m*g,T=m*_;n[0]=x-T*h,n[4]=-f*_,n[8]=E+M*h,n[1]=M+E*h,n[5]=f*g,n[9]=T-x*h,n[2]=-f*m,n[6]=h,n[10]=f*p}else if(t.order==="ZYX"){const x=f*g,M=f*_,E=h*g,T=h*_;n[0]=p*g,n[4]=E*m-M,n[8]=x*m+T,n[1]=p*_,n[5]=T*m+x,n[9]=M*m-E,n[2]=-m,n[6]=h*p,n[10]=f*p}else if(t.order==="YZX"){const x=f*p,M=f*m,E=h*p,T=h*m;n[0]=p*g,n[4]=T-x*_,n[8]=E*_+M,n[1]=_,n[5]=f*g,n[9]=-h*g,n[2]=-m*g,n[6]=M*_+E,n[10]=x-T*_}else if(t.order==="XZY"){const x=f*p,M=f*m,E=h*p,T=h*m;n[0]=p*g,n[4]=-_,n[8]=m*g,n[1]=x*_+T,n[5]=f*g,n[9]=M*_-E,n[2]=E*_-M,n[6]=h*g,n[10]=T*_+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cE,t,uE)}lookAt(t,n,a){const l=this.elements;return ci.subVectors(t,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),ts.crossVectors(a,ci),ts.lengthSq()===0&&(Math.abs(a.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),ts.crossVectors(a,ci)),ts.normalize(),Lc.crossVectors(ci,ts),l[0]=ts.x,l[4]=Lc.x,l[8]=ci.x,l[1]=ts.y,l[5]=Lc.y,l[9]=ci.y,l[2]=ts.z,l[6]=Lc.z,l[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],h=a[4],p=a[8],m=a[12],g=a[1],_=a[5],x=a[9],M=a[13],E=a[2],T=a[6],S=a[10],v=a[14],U=a[3],L=a[7],w=a[11],W=a[15],B=l[0],O=l[4],G=l[8],D=l[12],R=l[1],F=l[5],$=l[9],it=l[13],ut=l[2],mt=l[6],z=l[10],Q=l[14],K=l[3],St=l[7],Tt=l[11],P=l[15];return c[0]=f*B+h*R+p*ut+m*K,c[4]=f*O+h*F+p*mt+m*St,c[8]=f*G+h*$+p*z+m*Tt,c[12]=f*D+h*it+p*Q+m*P,c[1]=g*B+_*R+x*ut+M*K,c[5]=g*O+_*F+x*mt+M*St,c[9]=g*G+_*$+x*z+M*Tt,c[13]=g*D+_*it+x*Q+M*P,c[2]=E*B+T*R+S*ut+v*K,c[6]=E*O+T*F+S*mt+v*St,c[10]=E*G+T*$+S*z+v*Tt,c[14]=E*D+T*it+S*Q+v*P,c[3]=U*B+L*R+w*ut+W*K,c[7]=U*O+L*F+w*mt+W*St,c[11]=U*G+L*$+w*z+W*Tt,c[15]=U*D+L*it+w*Q+W*P,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],l=t[8],c=t[12],f=t[1],h=t[5],p=t[9],m=t[13],g=t[2],_=t[6],x=t[10],M=t[14],E=t[3],T=t[7],S=t[11],v=t[15];return E*(+c*p*_-l*m*_-c*h*x+a*m*x+l*h*M-a*p*M)+T*(+n*p*M-n*m*x+c*f*x-l*f*M+l*m*g-c*p*g)+S*(+n*m*_-n*h*M-c*f*_+a*f*M+c*h*g-a*m*g)+v*(-l*h*g-n*p*_+n*h*x+l*f*_-a*f*x+a*p*g)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],_=t[9],x=t[10],M=t[11],E=t[12],T=t[13],S=t[14],v=t[15],U=_*S*m-T*x*m+T*p*M-h*S*M-_*p*v+h*x*v,L=E*x*m-g*S*m-E*p*M+f*S*M+g*p*v-f*x*v,w=g*T*m-E*_*m+E*h*M-f*T*M-g*h*v+f*_*v,W=E*_*p-g*T*p-E*h*x+f*T*x+g*h*S-f*_*S,B=n*U+a*L+l*w+c*W;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/B;return t[0]=U*O,t[1]=(T*x*c-_*S*c-T*l*M+a*S*M+_*l*v-a*x*v)*O,t[2]=(h*S*c-T*p*c+T*l*m-a*S*m-h*l*v+a*p*v)*O,t[3]=(_*p*c-h*x*c-_*l*m+a*x*m+h*l*M-a*p*M)*O,t[4]=L*O,t[5]=(g*S*c-E*x*c+E*l*M-n*S*M-g*l*v+n*x*v)*O,t[6]=(E*p*c-f*S*c-E*l*m+n*S*m+f*l*v-n*p*v)*O,t[7]=(f*x*c-g*p*c+g*l*m-n*x*m-f*l*M+n*p*M)*O,t[8]=w*O,t[9]=(E*_*c-g*T*c-E*a*M+n*T*M+g*a*v-n*_*v)*O,t[10]=(f*T*c-E*h*c+E*a*m-n*T*m-f*a*v+n*h*v)*O,t[11]=(g*h*c-f*_*c-g*a*m+n*_*m+f*a*M-n*h*M)*O,t[12]=W*O,t[13]=(g*T*l-E*_*l+E*a*x-n*T*x-g*a*S+n*_*S)*O,t[14]=(E*h*l-f*T*l-E*a*p+n*T*p+f*a*S-n*h*S)*O,t[15]=(f*_*l-g*h*l+g*a*p-n*_*p-f*a*x+n*h*x)*O,this}scale(t){const n=this.elements,a=t.x,l=t.y,c=t.z;return n[0]*=a,n[4]*=l,n[8]*=c,n[1]*=a,n[5]*=l,n[9]*=c,n[2]*=a,n[6]*=l,n[10]*=c,n[3]*=a,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,l))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),l=Math.sin(n),c=1-a,f=t.x,h=t.y,p=t.z,m=c*f,g=c*h;return this.set(m*f+a,m*h-l*p,m*p+l*h,0,m*h+l*p,g*h+a,g*p-l*f,0,m*p-l*h,g*p+l*f,c*p*p+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,l,c,f){return this.set(1,a,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,a){const l=this.elements,c=n._x,f=n._y,h=n._z,p=n._w,m=c+c,g=f+f,_=h+h,x=c*m,M=c*g,E=c*_,T=f*g,S=f*_,v=h*_,U=p*m,L=p*g,w=p*_,W=a.x,B=a.y,O=a.z;return l[0]=(1-(T+v))*W,l[1]=(M+w)*W,l[2]=(E-L)*W,l[3]=0,l[4]=(M-w)*B,l[5]=(1-(x+v))*B,l[6]=(S+U)*B,l[7]=0,l[8]=(E+L)*O,l[9]=(S-U)*O,l[10]=(1-(x+T))*O,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,a){const l=this.elements;let c=Rr.set(l[0],l[1],l[2]).length();const f=Rr.set(l[4],l[5],l[6]).length(),h=Rr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Oi.copy(this);const m=1/c,g=1/f,_=1/h;return Oi.elements[0]*=m,Oi.elements[1]*=m,Oi.elements[2]*=m,Oi.elements[4]*=g,Oi.elements[5]*=g,Oi.elements[6]*=g,Oi.elements[8]*=_,Oi.elements[9]*=_,Oi.elements[10]*=_,n.setFromRotationMatrix(Oi),a.x=c,a.y=f,a.z=h,this}makePerspective(t,n,a,l,c,f,h=Sa){const p=this.elements,m=2*c/(n-t),g=2*c/(a-l),_=(n+t)/(n-t),x=(a+l)/(a-l);let M,E;if(h===Sa)M=-(f+c)/(f-c),E=-2*f*c/(f-c);else if(h===ru)M=-f/(f-c),E=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=g,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,l,c,f,h=Sa){const p=this.elements,m=1/(n-t),g=1/(a-l),_=1/(f-c),x=(n+t)*m,M=(a+l)*g;let E,T;if(h===Sa)E=(f+c)*_,T=-2*_;else if(h===ru)E=c*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*g,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=T,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<16;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}}const Rr=new J,Oi=new sn,cE=new J(0,0,0),uE=new J(1,1,1),ts=new J,Lc=new J,ci=new J,B_=new sn,I_=new ul;class ba{constructor(t=0,n=0,a=0,l=ba.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,l=this._order){return this._x=t,this._y=n,this._z=a,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const l=t.elements,c=l[0],f=l[4],h=l[8],p=l[1],m=l[5],g=l[9],_=l[2],x=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(ti(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-ti(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ti(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-ti(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(ti(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-ti(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return B_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(B_,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return I_.setFromEuler(this),this.setFromQuaternion(I_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ba.DEFAULT_ORDER="XYZ";class rx{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fE=0;const F_=new J,wr=new ul,ma=new sn,Nc=new J,Jo=new J,hE=new J,dE=new ul,G_=new J(1,0,0),H_=new J(0,1,0),V_=new J(0,0,1),k_={type:"added"},pE={type:"removed"},Cr={type:"childadded",child:null},Wh={type:"childremoved",child:null};class qn extends Jr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fE++}),this.uuid=cl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qn.DEFAULT_UP.clone();const t=new J,n=new ba,a=new ul,l=new J(1,1,1);function c(){a.setFromEuler(n,!1)}function f(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new sn},normalMatrix:{value:new ce}}),this.matrix=new sn,this.matrixWorld=new sn,this.matrixAutoUpdate=qn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return wr.setFromAxisAngle(t,n),this.quaternion.multiply(wr),this}rotateOnWorldAxis(t,n){return wr.setFromAxisAngle(t,n),this.quaternion.premultiply(wr),this}rotateX(t){return this.rotateOnAxis(G_,t)}rotateY(t){return this.rotateOnAxis(H_,t)}rotateZ(t){return this.rotateOnAxis(V_,t)}translateOnAxis(t,n){return F_.copy(t).applyQuaternion(this.quaternion),this.position.add(F_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(G_,t)}translateY(t){return this.translateOnAxis(H_,t)}translateZ(t){return this.translateOnAxis(V_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ma.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Nc.copy(t):Nc.set(t,n,a);const l=this.parent;this.updateWorldMatrix(!0,!1),Jo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ma.lookAt(Jo,Nc,this.up):ma.lookAt(Nc,Jo,this.up),this.quaternion.setFromRotationMatrix(ma),l&&(ma.extractRotation(l.matrixWorld),wr.setFromRotationMatrix(ma),this.quaternion.premultiply(wr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(k_),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(pE),Wh.child=t,this.dispatchEvent(Wh),Wh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ma.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ma.multiply(t.parent.matrixWorld)),t.applyMatrix4(ma),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(k_),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,l=this.children.length;a<l;a++){const f=this.children[a].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jo,t,hE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jo,dE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n){const a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,g=p.length;m<g;m++){const _=p[m];c(t.shapes,_)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(c(t.materials,this.material[p]));l.material=h}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(c(t.animations,p))}}if(n){const h=f(t.geometries),p=f(t.materials),m=f(t.textures),g=f(t.images),_=f(t.shapes),x=f(t.skeletons),M=f(t.animations),E=f(t.nodes);h.length>0&&(a.geometries=h),p.length>0&&(a.materials=p),m.length>0&&(a.textures=m),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),x.length>0&&(a.skeletons=x),M.length>0&&(a.animations=M),E.length>0&&(a.nodes=E)}return a.object=l,a;function f(h){const p=[];for(const m in h){const g=h[m];delete g.metadata,p.push(g)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const l=t.children[a];this.add(l.clone())}return this}}qn.DEFAULT_UP=new J(0,1,0);qn.DEFAULT_MATRIX_AUTO_UPDATE=!0;qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pi=new J,ga=new J,Yh=new J,_a=new J,Dr=new J,Ur=new J,X_=new J,jh=new J,Zh=new J,Kh=new J,Qh=new cn,Jh=new cn,$h=new cn;class zi{constructor(t=new J,n=new J,a=new J){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,l){l.subVectors(a,n),Pi.subVectors(t,n),l.cross(Pi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,a,l,c){Pi.subVectors(l,n),ga.subVectors(a,n),Yh.subVectors(t,n);const f=Pi.dot(Pi),h=Pi.dot(ga),p=Pi.dot(Yh),m=ga.dot(ga),g=ga.dot(Yh),_=f*m-h*h;if(_===0)return c.set(0,0,0),null;const x=1/_,M=(m*p-h*g)*x,E=(f*g-h*p)*x;return c.set(1-M-E,E,M)}static containsPoint(t,n,a,l){return this.getBarycoord(t,n,a,l,_a)===null?!1:_a.x>=0&&_a.y>=0&&_a.x+_a.y<=1}static getInterpolation(t,n,a,l,c,f,h,p){return this.getBarycoord(t,n,a,l,_a)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,_a.x),p.addScaledVector(f,_a.y),p.addScaledVector(h,_a.z),p)}static getInterpolatedAttribute(t,n,a,l,c,f){return Qh.setScalar(0),Jh.setScalar(0),$h.setScalar(0),Qh.fromBufferAttribute(t,n),Jh.fromBufferAttribute(t,a),$h.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Qh,c.x),f.addScaledVector(Jh,c.y),f.addScaledVector($h,c.z),f}static isFrontFacing(t,n,a,l){return Pi.subVectors(a,n),ga.subVectors(t,n),Pi.cross(ga).dot(l)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,l){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,a,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pi.subVectors(this.c,this.b),ga.subVectors(this.a,this.b),Pi.cross(ga).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return zi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return zi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,l,c){return zi.getInterpolation(t,this.a,this.b,this.c,n,a,l,c)}containsPoint(t){return zi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return zi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,l=this.b,c=this.c;let f,h;Dr.subVectors(l,a),Ur.subVectors(c,a),jh.subVectors(t,a);const p=Dr.dot(jh),m=Ur.dot(jh);if(p<=0&&m<=0)return n.copy(a);Zh.subVectors(t,l);const g=Dr.dot(Zh),_=Ur.dot(Zh);if(g>=0&&_<=g)return n.copy(l);const x=p*_-g*m;if(x<=0&&p>=0&&g<=0)return f=p/(p-g),n.copy(a).addScaledVector(Dr,f);Kh.subVectors(t,c);const M=Dr.dot(Kh),E=Ur.dot(Kh);if(E>=0&&M<=E)return n.copy(c);const T=M*m-p*E;if(T<=0&&m>=0&&E<=0)return h=m/(m-E),n.copy(a).addScaledVector(Ur,h);const S=g*E-M*_;if(S<=0&&_-g>=0&&M-E>=0)return X_.subVectors(c,l),h=(_-g)/(_-g+(M-E)),n.copy(l).addScaledVector(X_,h);const v=1/(S+T+x);return f=T*v,h=x*v,n.copy(a).addScaledVector(Dr,f).addScaledVector(Ur,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ox={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},es={h:0,s:0,l:0},Oc={h:0,s:0,l:0};function td(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class fe{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,be.toWorkingColorSpace(this,n),this}setRGB(t,n,a,l=be.workingColorSpace){return this.r=t,this.g=n,this.b=a,be.toWorkingColorSpace(this,l),this}setHSL(t,n,a,l=be.workingColorSpace){if(t=JM(t,1),n=ti(n,0,1),a=ti(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,f=2*a-c;this.r=td(f,c,t+1/3),this.g=td(f,c,t),this.b=td(f,c,t-1/3)}return be.toWorkingColorSpace(this,l),this}setStyle(t,n=Ti){function a(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ti){const a=ox[t.toLowerCase()];return a!==void 0?this.setHex(a,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ea(t.r),this.g=Ea(t.g),this.b=Ea(t.b),this}copyLinearToSRGB(t){return this.r=Vr(t.r),this.g=Vr(t.g),this.b=Vr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ti){return be.fromWorkingColorSpace(Gn.copy(this),t),Math.round(ti(Gn.r*255,0,255))*65536+Math.round(ti(Gn.g*255,0,255))*256+Math.round(ti(Gn.b*255,0,255))}getHexString(t=Ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=be.workingColorSpace){be.fromWorkingColorSpace(Gn.copy(this),n);const a=Gn.r,l=Gn.g,c=Gn.b,f=Math.max(a,l,c),h=Math.min(a,l,c);let p,m;const g=(h+f)/2;if(h===f)p=0,m=0;else{const _=f-h;switch(m=g<=.5?_/(f+h):_/(2-f-h),f){case a:p=(l-c)/_+(l<c?6:0);break;case l:p=(c-a)/_+2;break;case c:p=(a-l)/_+4;break}p/=6}return t.h=p,t.s=m,t.l=g,t}getRGB(t,n=be.workingColorSpace){return be.fromWorkingColorSpace(Gn.copy(this),n),t.r=Gn.r,t.g=Gn.g,t.b=Gn.b,t}getStyle(t=Ti){be.fromWorkingColorSpace(Gn.copy(this),t);const n=Gn.r,a=Gn.g,l=Gn.b;return t!==Ti?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(l*255)})`}offsetHSL(t,n,a){return this.getHSL(es),this.setHSL(es.h+t,es.s+n,es.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(es),t.getHSL(Oc);const a=Bh(es.h,Oc.h,n),l=Bh(es.s,Oc.s,n),c=Bh(es.l,Oc.l,n);return this.setHSL(a,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*l,this.g=c[1]*n+c[4]*a+c[7]*l,this.b=c[2]*n+c[5]*a+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gn=new fe;fe.NAMES=ox;let mE=0;class $r extends Jr{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mE++}),this.uuid=cl(),this.name="",this.blending=Gr,this.side=cs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vd,this.blendDst=xd,this.blendEquation=Bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=R_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mr,this.stencilZFail=Mr,this.stencilZPass=Mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(a):l&&l.isVector3&&a&&a.isVector3?l.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==Gr&&(a.blending=this.blending),this.side!==cs&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==vd&&(a.blendSrc=this.blendSrc),this.blendDst!==xd&&(a.blendDst=this.blendDst),this.blendEquation!==Bs&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==Xr&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==R_&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mr&&(a.stencilFail=this.stencilFail),this.stencilZFail!==Mr&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==Mr&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function l(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(a.textures=c),f.length>0&&(a.images=f)}return a}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const l=n.length;a=new Array(l);for(let c=0;c!==l;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class as extends $r{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ba,this.combine=Iv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pn=new J,Pc=new we;class On{constructor(t,n,a=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=w_,this.updateRanges=[],this.gpuType=ya,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[a+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Pc.fromBufferAttribute(this,n),Pc.applyMatrix3(t),this.setXY(n,Pc.x,Pc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.applyMatrix3(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.applyMatrix4(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.applyNormalMatrix(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)pn.fromBufferAttribute(this,n),pn.transformDirection(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Zo(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=$n(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Zo(n,this.array)),n}setX(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Zo(n,this.array)),n}setY(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Zo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Zo(n,this.array)),n}setW(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),a=$n(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,l){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),a=$n(a,this.array),l=$n(l,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this}setXYZW(t,n,a,l,c){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),a=$n(a,this.array),l=$n(l,this.array),c=$n(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==w_&&(t.usage=this.usage),t}}class lx extends On{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class cx extends On{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class yn extends On{constructor(t,n,a){super(new Float32Array(t),n,a)}}let gE=0;const Ei=new sn,ed=new qn,Lr=new J,ui=new fl,$o=new fl,bn=new J;class An extends Jr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gE++}),this.uuid=cl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ix(t)?cx:lx)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new ce().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,n,a){return Ei.makeTranslation(t,n,a),this.applyMatrix4(Ei),this}scale(t,n,a){return Ei.makeScale(t,n,a),this.applyMatrix4(Ei),this}lookAt(t){return ed.lookAt(t),ed.updateMatrix(),this.applyMatrix4(ed.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lr).negate(),this.translate(Lr.x,Lr.y,Lr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];a.push(f.x,f.y,f.z||0)}this.setAttribute("position",new yn(a,3))}else{for(let a=0,l=n.count;a<l;a++){const c=t[a];n.setXYZ(a,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,l=n.length;a<l;a++){const c=n[a];ui.setFromBufferAttribute(c),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const a=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const h=n[c];$o.setFromBufferAttribute(h),this.morphTargetsRelative?(bn.addVectors(ui.min,$o.min),ui.expandByPoint(bn),bn.addVectors(ui.max,$o.max),ui.expandByPoint(bn)):(ui.expandByPoint($o.min),ui.expandByPoint($o.max))}ui.getCenter(a);let l=0;for(let c=0,f=t.count;c<f;c++)bn.fromBufferAttribute(t,c),l=Math.max(l,a.distanceToSquared(bn));if(n)for(let c=0,f=n.length;c<f;c++){const h=n[c],p=this.morphTargetsRelative;for(let m=0,g=h.count;m<g;m++)bn.fromBufferAttribute(h,m),p&&(Lr.fromBufferAttribute(t,m),bn.add(Lr)),l=Math.max(l,a.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new On(new Float32Array(4*a.count),4));const f=this.getAttribute("tangent"),h=[],p=[];for(let G=0;G<a.count;G++)h[G]=new J,p[G]=new J;const m=new J,g=new J,_=new J,x=new we,M=new we,E=new we,T=new J,S=new J;function v(G,D,R){m.fromBufferAttribute(a,G),g.fromBufferAttribute(a,D),_.fromBufferAttribute(a,R),x.fromBufferAttribute(c,G),M.fromBufferAttribute(c,D),E.fromBufferAttribute(c,R),g.sub(m),_.sub(m),M.sub(x),E.sub(x);const F=1/(M.x*E.y-E.x*M.y);isFinite(F)&&(T.copy(g).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(F),S.copy(_).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(F),h[G].add(T),h[D].add(T),h[R].add(T),p[G].add(S),p[D].add(S),p[R].add(S))}let U=this.groups;U.length===0&&(U=[{start:0,count:t.count}]);for(let G=0,D=U.length;G<D;++G){const R=U[G],F=R.start,$=R.count;for(let it=F,ut=F+$;it<ut;it+=3)v(t.getX(it+0),t.getX(it+1),t.getX(it+2))}const L=new J,w=new J,W=new J,B=new J;function O(G){W.fromBufferAttribute(l,G),B.copy(W);const D=h[G];L.copy(D),L.sub(W.multiplyScalar(W.dot(D))).normalize(),w.crossVectors(B,D);const F=w.dot(p[G])<0?-1:1;f.setXYZW(G,L.x,L.y,L.z,F)}for(let G=0,D=U.length;G<D;++G){const R=U[G],F=R.start,$=R.count;for(let it=F,ut=F+$;it<ut;it+=3)O(t.getX(it+0)),O(t.getX(it+1)),O(t.getX(it+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new On(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let x=0,M=a.count;x<M;x++)a.setXYZ(x,0,0,0);const l=new J,c=new J,f=new J,h=new J,p=new J,m=new J,g=new J,_=new J;if(t)for(let x=0,M=t.count;x<M;x+=3){const E=t.getX(x+0),T=t.getX(x+1),S=t.getX(x+2);l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),h.fromBufferAttribute(a,E),p.fromBufferAttribute(a,T),m.fromBufferAttribute(a,S),h.add(g),p.add(g),m.add(g),a.setXYZ(E,h.x,h.y,h.z),a.setXYZ(T,p.x,p.y,p.z),a.setXYZ(S,m.x,m.y,m.z)}else for(let x=0,M=n.count;x<M;x+=3)l.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),a.setXYZ(x+0,g.x,g.y,g.z),a.setXYZ(x+1,g.x,g.y,g.z),a.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)bn.fromBufferAttribute(t,n),bn.normalize(),t.setXYZ(n,bn.x,bn.y,bn.z)}toNonIndexed(){function t(h,p){const m=h.array,g=h.itemSize,_=h.normalized,x=new m.constructor(p.length*g);let M=0,E=0;for(let T=0,S=p.length;T<S;T++){h.isInterleavedBufferAttribute?M=p[T]*h.data.stride+h.offset:M=p[T]*g;for(let v=0;v<g;v++)x[E++]=m[M++]}return new On(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new An,a=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=t(p,a);n.setAttribute(h,m)}const c=this.morphAttributes;for(const h in c){const p=[],m=c[h];for(let g=0,_=m.length;g<_;g++){const x=m[g],M=t(x,a);p.push(M)}n.morphAttributes[h]=p}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const p in a){const m=a[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],g=[];for(let _=0,x=m.length;_<x;_++){const M=m[_];g.push(M.toJSON(t.data))}g.length>0&&(l[p]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone(n));const l=t.attributes;for(const m in l){const g=l[m];this.setAttribute(m,g.clone(n))}const c=t.morphAttributes;for(const m in c){const g=[],_=c[m];for(let x=0,M=_.length;x<M;x++)g.push(_[x].clone(n));this.morphAttributes[m]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let m=0,g=f.length;m<g;m++){const _=f[m];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const q_=new sn,Us=new mp,zc=new hl,W_=new J,Bc=new J,Ic=new J,Fc=new J,nd=new J,Gc=new J,Y_=new J,Hc=new J;class ln extends qn{constructor(t=new An,n=new as){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const a=this.geometry,l=a.attributes.position,c=a.morphAttributes.position,f=a.morphTargetsRelative;n.fromBufferAttribute(l,t);const h=this.morphTargetInfluences;if(c&&h){Gc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const g=h[p],_=c[p];g!==0&&(nd.fromBufferAttribute(_,t),f?Gc.addScaledVector(nd,g):Gc.addScaledVector(nd.sub(n),g))}n.add(Gc)}return n}raycast(t,n){const a=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),zc.copy(a.boundingSphere),zc.applyMatrix4(c),Us.copy(t.ray).recast(t.near),!(zc.containsPoint(Us.origin)===!1&&(Us.intersectSphere(zc,W_)===null||Us.origin.distanceToSquared(W_)>(t.far-t.near)**2))&&(q_.copy(c).invert(),Us.copy(t.ray).applyMatrix4(q_),!(a.boundingBox!==null&&Us.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Us)))}_computeIntersections(t,n,a){let l;const c=this.geometry,f=this.material,h=c.index,p=c.attributes.position,m=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,x=c.groups,M=c.drawRange;if(h!==null)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],U=Math.max(S.start,M.start),L=Math.min(h.count,Math.min(S.start+S.count,M.start+M.count));for(let w=U,W=L;w<W;w+=3){const B=h.getX(w),O=h.getX(w+1),G=h.getX(w+2);l=Vc(this,v,t,a,m,g,_,B,O,G),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(h.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const U=h.getX(S),L=h.getX(S+1),w=h.getX(S+2);l=Vc(this,f,t,a,m,g,_,U,L,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],U=Math.max(S.start,M.start),L=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let w=U,W=L;w<W;w+=3){const B=w,O=w+1,G=w+2;l=Vc(this,v,t,a,m,g,_,B,O,G),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(p.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const U=S,L=S+1,w=S+2;l=Vc(this,f,t,a,m,g,_,U,L,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}}}function _E(r,t,n,a,l,c,f,h){let p;if(t.side===Xn?p=a.intersectTriangle(f,c,l,!0,h):p=a.intersectTriangle(l,c,f,t.side===cs,h),p===null)return null;Hc.copy(h),Hc.applyMatrix4(r.matrixWorld);const m=n.ray.origin.distanceTo(Hc);return m<n.near||m>n.far?null:{distance:m,point:Hc.clone(),object:r}}function Vc(r,t,n,a,l,c,f,h,p,m){r.getVertexPosition(h,Bc),r.getVertexPosition(p,Ic),r.getVertexPosition(m,Fc);const g=_E(r,t,n,a,Bc,Ic,Fc,Y_);if(g){const _=new J;zi.getBarycoord(Y_,Bc,Ic,Fc,_),l&&(g.uv=zi.getInterpolatedAttribute(l,h,p,m,_,new we)),c&&(g.uv1=zi.getInterpolatedAttribute(c,h,p,m,_,new we)),f&&(g.normal=zi.getInterpolatedAttribute(f,h,p,m,_,new J),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const x={a:h,b:p,c:m,normal:new J,materialIndex:0};zi.getNormal(Bc,Ic,Fc,x.normal),g.face=x,g.barycoord=_}return g}class We extends An{constructor(t=1,n=1,a=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],g=[],_=[];let x=0,M=0;E("z","y","x",-1,-1,a,n,t,f,c,0),E("z","y","x",1,-1,a,n,-t,f,c,1),E("x","z","y",1,1,t,a,n,l,f,2),E("x","z","y",1,-1,t,a,-n,l,f,3),E("x","y","z",1,-1,t,n,a,l,c,4),E("x","y","z",-1,-1,t,n,-a,l,c,5),this.setIndex(p),this.setAttribute("position",new yn(m,3)),this.setAttribute("normal",new yn(g,3)),this.setAttribute("uv",new yn(_,2));function E(T,S,v,U,L,w,W,B,O,G,D){const R=w/O,F=W/G,$=w/2,it=W/2,ut=B/2,mt=O+1,z=G+1;let Q=0,K=0;const St=new J;for(let Tt=0;Tt<z;Tt++){const P=Tt*F-it;for(let st=0;st<mt;st++){const yt=st*R-$;St[T]=yt*U,St[S]=P*L,St[v]=ut,m.push(St.x,St.y,St.z),St[T]=0,St[S]=0,St[v]=B>0?1:-1,g.push(St.x,St.y,St.z),_.push(st/O),_.push(1-Tt/G),Q+=1}}for(let Tt=0;Tt<G;Tt++)for(let P=0;P<O;P++){const st=x+P+mt*Tt,yt=x+P+mt*(Tt+1),j=x+(P+1)+mt*(Tt+1),ft=x+(P+1)+mt*Tt;p.push(st,yt,ft),p.push(yt,j,ft),K+=6}h.addGroup(M,K,D),M+=K,x+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new We(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Zr(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const l=r[n][a];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=l.clone():Array.isArray(l)?t[n][a]=l.slice():t[n][a]=l}}return t}function kn(r){const t={};for(let n=0;n<r.length;n++){const a=Zr(r[n]);for(const l in a)t[l]=a[l]}return t}function vE(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function ux(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:be.workingColorSpace}const gp={clone:Zr,merge:kn};var xE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fi extends $r{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xE,this.fragmentShader=yE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zr(t.uniforms),this.uniformsGroups=vE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const l in this.extensions)this.extensions[l]===!0&&(a[l]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}}class fx extends qn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new sn,this.projectionMatrix=new sn,this.projectionMatrixInverse=new sn,this.coordinateSystem=Sa}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ns=new J,j_=new we,Z_=new we;class bi extends fx{constructor(t=50,n=1,a=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=ip*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(zh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ip*2*Math.atan(Math.tan(zh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ns.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ns.x,ns.y).multiplyScalar(-t/ns.z),ns.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ns.x,ns.y).multiplyScalar(-t/ns.z)}getViewSize(t,n){return this.getViewBounds(t,j_,Z_),n.subVectors(Z_,j_)}setViewOffset(t,n,a,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(zh*.5*this.fov)/this.zoom,a=2*n,l=this.aspect*a,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*l/p,n-=f.offsetY*a/m,l*=f.width/p,a*=f.height/m}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-a,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Nr=-90,Or=1;class SE extends qn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new bi(Nr,Or,t,n);l.layers=this.layers,this.add(l);const c=new bi(Nr,Or,t,n);c.layers=this.layers,this.add(c);const f=new bi(Nr,Or,t,n);f.layers=this.layers,this.add(f);const h=new bi(Nr,Or,t,n);h.layers=this.layers,this.add(h);const p=new bi(Nr,Or,t,n);p.layers=this.layers,this.add(p);const m=new bi(Nr,Or,t,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,l,c,f,h,p]=n;for(const m of n)this.remove(m);if(t===Sa)a.up.set(0,1,0),a.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===ru)a.up.set(0,-1,0),a.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of n)this.add(m),m.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,p,m,g]=this.children,_=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const T=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,t.setRenderTarget(a,0,l),t.render(n,c),t.setRenderTarget(a,1,l),t.render(n,f),t.setRenderTarget(a,2,l),t.render(n,h),t.setRenderTarget(a,3,l),t.render(n,p),t.setRenderTarget(a,4,l),t.render(n,m),a.texture.generateMipmaps=T,t.setRenderTarget(a,5,l),t.render(n,g),t.setRenderTarget(_,x,M),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class hx extends ei{constructor(t,n,a,l,c,f,h,p,m,g){t=t!==void 0?t:[],n=n!==void 0?n:qr,super(t,n,a,l,c,f,h,p,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ME extends us{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},l=[a,a,a,a,a,a];this.texture=new hx(l,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Yi}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new We(5,5,5),c=new Fi({name:"CubemapFromEquirect",uniforms:Zr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Xn,blending:Ma});c.uniforms.tEquirect.value=n;const f=new ln(l,c),h=n.minFilter;return n.minFilter===Gs&&(n.minFilter=Yi),new SE(1,10,this).update(t,f),n.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(t,n,a,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,a,l);t.setRenderTarget(c)}}const id=new J,EE=new J,TE=new ce;class Ps{constructor(t=new J(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,l){return this.normal.set(t,n,a),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const l=id.subVectors(a,n).cross(EE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const a=t.delta(id),l=this.normal.dot(a);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(a,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||TE.getNormalMatrix(t),l=this.coplanarPoint(id).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ls=new hl,kc=new J;class dx{constructor(t=new Ps,n=new Ps,a=new Ps,l=new Ps,c=new Ps,f=new Ps){this.planes=[t,n,a,l,c,f]}set(t,n,a,l,c,f){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(a),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=Sa){const a=this.planes,l=t.elements,c=l[0],f=l[1],h=l[2],p=l[3],m=l[4],g=l[5],_=l[6],x=l[7],M=l[8],E=l[9],T=l[10],S=l[11],v=l[12],U=l[13],L=l[14],w=l[15];if(a[0].setComponents(p-c,x-m,S-M,w-v).normalize(),a[1].setComponents(p+c,x+m,S+M,w+v).normalize(),a[2].setComponents(p+f,x+g,S+E,w+U).normalize(),a[3].setComponents(p-f,x-g,S-E,w-U).normalize(),a[4].setComponents(p-h,x-_,S-T,w-L).normalize(),n===Sa)a[5].setComponents(p+h,x+_,S+T,w+L).normalize();else if(n===ru)a[5].setComponents(h,_,T,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ls.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ls)}intersectsSprite(t){return Ls.center.set(0,0,0),Ls.radius=.7071067811865476,Ls.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ls)}intersectsSphere(t){const n=this.planes,a=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const l=n[a];if(kc.x=l.normal.x>0?t.max.x:t.min.x,kc.y=l.normal.y>0?t.max.y:t.min.y,kc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(kc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function px(){let r=null,t=!1,n=null,a=null;function l(c,f){n(c,f),a=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(a=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function bE(r){const t=new WeakMap;function n(h,p){const m=h.array,g=h.usage,_=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,g),h.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,p,m){const g=p.array,_=p.updateRanges;if(r.bindBuffer(m,h),_.length===0)r.bufferSubData(m,0,g);else{_.sort((M,E)=>M.start-E.start);let x=0;for(let M=1;M<_.length;M++){const E=_[x],T=_[M];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++x,_[x]=T)}_.length=x+1;for(let M=0,E=_.length;M<E;M++){const T=_[M];r.bufferSubData(m,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=t.get(h);p&&(r.deleteBuffer(p.buffer),t.delete(h))}function f(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=t.get(h);(!g||g.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=t.get(h);if(m===void 0)t.set(h,n(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(m.buffer,h,p),m.version=h.version}}return{get:l,remove:c,update:f}}class pu extends An{constructor(t=1,n=1,a=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:l};const c=t/2,f=n/2,h=Math.floor(a),p=Math.floor(l),m=h+1,g=p+1,_=t/h,x=n/p,M=[],E=[],T=[],S=[];for(let v=0;v<g;v++){const U=v*x-f;for(let L=0;L<m;L++){const w=L*_-c;E.push(w,-U,0),T.push(0,0,1),S.push(L/h),S.push(1-v/p)}}for(let v=0;v<p;v++)for(let U=0;U<h;U++){const L=U+m*v,w=U+m*(v+1),W=U+1+m*(v+1),B=U+1+m*v;M.push(L,w,B),M.push(w,W,B)}this.setIndex(M),this.setAttribute("position",new yn(E,3)),this.setAttribute("normal",new yn(T,3)),this.setAttribute("uv",new yn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pu(t.width,t.height,t.widthSegments,t.heightSegments)}}var AE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,RE=`#ifdef USE_ALPHAHASH
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
#endif`,wE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,CE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,DE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,UE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,LE=`#ifdef USE_AOMAP
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
#endif`,NE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,OE=`#ifdef USE_BATCHING
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
#endif`,PE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,BE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,IE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,FE=`#ifdef USE_IRIDESCENCE
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
#endif`,GE=`#ifdef USE_BUMPMAP
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
#endif`,HE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,VE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,XE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,WE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,YE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,jE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ZE=`#define PI 3.141592653589793
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
} // validated`,KE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,QE=`vec3 transformedNormal = objectNormal;
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
#endif`,JE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$E=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,t1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,e1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n1="gl_FragColor = linearToOutputTexel( gl_FragColor );",i1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,a1=`#ifdef USE_ENVMAP
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
#endif`,s1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,r1=`#ifdef USE_ENVMAP
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
#endif`,o1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,l1=`#ifdef USE_ENVMAP
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
#endif`,c1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,u1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,f1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,h1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,d1=`#ifdef USE_GRADIENTMAP
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
}`,p1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,m1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_1=`uniform bool receiveShadow;
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
#endif`,v1=`#ifdef USE_ENVMAP
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
#endif`,x1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,y1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,M1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,E1=`PhysicalMaterial material;
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
#endif`,T1=`struct PhysicalMaterial {
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
}`,b1=`
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
#endif`,A1=`#if defined( RE_IndirectDiffuse )
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
#endif`,R1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,C1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,L1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,N1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,O1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,P1=`#if defined( USE_POINTS_UV )
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
#endif`,z1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,B1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,I1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,F1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,G1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H1=`#ifdef USE_MORPHTARGETS
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
#endif`,V1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,X1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,W1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,j1=`#ifdef USE_NORMALMAP
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
#endif`,Z1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,K1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Q1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,J1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,eT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,aT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,uT=`float getShadowMask() {
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
}`,fT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hT=`#ifdef USE_SKINNING
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
#endif`,dT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pT=`#ifdef USE_SKINNING
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
#endif`,mT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_T=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,xT=`#ifdef USE_TRANSMISSION
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
#endif`,yT=`#ifdef USE_TRANSMISSION
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
#endif`,ST=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,MT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ET=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,TT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,AT=`uniform sampler2D t2D;
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
}`,RT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,CT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UT=`#include <common>
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
}`,LT=`#if DEPTH_PACKING == 3200
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
}`,NT=`#define DISTANCE
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
}`,OT=`#define DISTANCE
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
}`,PT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BT=`uniform float scale;
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
}`,IT=`uniform vec3 diffuse;
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
}`,FT=`#include <common>
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
}`,GT=`uniform vec3 diffuse;
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
}`,HT=`#define LAMBERT
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
}`,VT=`#define LAMBERT
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
}`,kT=`#define MATCAP
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
}`,XT=`#define MATCAP
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
}`,qT=`#define NORMAL
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
}`,WT=`#define NORMAL
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
}`,YT=`#define PHONG
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
}`,jT=`#define PHONG
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
}`,ZT=`#define STANDARD
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
}`,KT=`#define STANDARD
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
}`,QT=`#define TOON
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
}`,JT=`#define TOON
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
}`,$T=`uniform float size;
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
}`,tb=`uniform vec3 diffuse;
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
}`,eb=`#include <common>
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
}`,nb=`uniform vec3 color;
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
}`,ib=`uniform float rotation;
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
}`,ab=`uniform vec3 diffuse;
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
}`,ue={alphahash_fragment:AE,alphahash_pars_fragment:RE,alphamap_fragment:wE,alphamap_pars_fragment:CE,alphatest_fragment:DE,alphatest_pars_fragment:UE,aomap_fragment:LE,aomap_pars_fragment:NE,batching_pars_vertex:OE,batching_vertex:PE,begin_vertex:zE,beginnormal_vertex:BE,bsdfs:IE,iridescence_fragment:FE,bumpmap_pars_fragment:GE,clipping_planes_fragment:HE,clipping_planes_pars_fragment:VE,clipping_planes_pars_vertex:kE,clipping_planes_vertex:XE,color_fragment:qE,color_pars_fragment:WE,color_pars_vertex:YE,color_vertex:jE,common:ZE,cube_uv_reflection_fragment:KE,defaultnormal_vertex:QE,displacementmap_pars_vertex:JE,displacementmap_vertex:$E,emissivemap_fragment:t1,emissivemap_pars_fragment:e1,colorspace_fragment:n1,colorspace_pars_fragment:i1,envmap_fragment:a1,envmap_common_pars_fragment:s1,envmap_pars_fragment:r1,envmap_pars_vertex:o1,envmap_physical_pars_fragment:v1,envmap_vertex:l1,fog_vertex:c1,fog_pars_vertex:u1,fog_fragment:f1,fog_pars_fragment:h1,gradientmap_pars_fragment:d1,lightmap_pars_fragment:p1,lights_lambert_fragment:m1,lights_lambert_pars_fragment:g1,lights_pars_begin:_1,lights_toon_fragment:x1,lights_toon_pars_fragment:y1,lights_phong_fragment:S1,lights_phong_pars_fragment:M1,lights_physical_fragment:E1,lights_physical_pars_fragment:T1,lights_fragment_begin:b1,lights_fragment_maps:A1,lights_fragment_end:R1,logdepthbuf_fragment:w1,logdepthbuf_pars_fragment:C1,logdepthbuf_pars_vertex:D1,logdepthbuf_vertex:U1,map_fragment:L1,map_pars_fragment:N1,map_particle_fragment:O1,map_particle_pars_fragment:P1,metalnessmap_fragment:z1,metalnessmap_pars_fragment:B1,morphinstance_vertex:I1,morphcolor_vertex:F1,morphnormal_vertex:G1,morphtarget_pars_vertex:H1,morphtarget_vertex:V1,normal_fragment_begin:k1,normal_fragment_maps:X1,normal_pars_fragment:q1,normal_pars_vertex:W1,normal_vertex:Y1,normalmap_pars_fragment:j1,clearcoat_normal_fragment_begin:Z1,clearcoat_normal_fragment_maps:K1,clearcoat_pars_fragment:Q1,iridescence_pars_fragment:J1,opaque_fragment:$1,packing:tT,premultiplied_alpha_fragment:eT,project_vertex:nT,dithering_fragment:iT,dithering_pars_fragment:aT,roughnessmap_fragment:sT,roughnessmap_pars_fragment:rT,shadowmap_pars_fragment:oT,shadowmap_pars_vertex:lT,shadowmap_vertex:cT,shadowmask_pars_fragment:uT,skinbase_vertex:fT,skinning_pars_vertex:hT,skinning_vertex:dT,skinnormal_vertex:pT,specularmap_fragment:mT,specularmap_pars_fragment:gT,tonemapping_fragment:_T,tonemapping_pars_fragment:vT,transmission_fragment:xT,transmission_pars_fragment:yT,uv_pars_fragment:ST,uv_pars_vertex:MT,uv_vertex:ET,worldpos_vertex:TT,background_vert:bT,background_frag:AT,backgroundCube_vert:RT,backgroundCube_frag:wT,cube_vert:CT,cube_frag:DT,depth_vert:UT,depth_frag:LT,distanceRGBA_vert:NT,distanceRGBA_frag:OT,equirect_vert:PT,equirect_frag:zT,linedashed_vert:BT,linedashed_frag:IT,meshbasic_vert:FT,meshbasic_frag:GT,meshlambert_vert:HT,meshlambert_frag:VT,meshmatcap_vert:kT,meshmatcap_frag:XT,meshnormal_vert:qT,meshnormal_frag:WT,meshphong_vert:YT,meshphong_frag:jT,meshphysical_vert:ZT,meshphysical_frag:KT,meshtoon_vert:QT,meshtoon_frag:JT,points_vert:$T,points_frag:tb,shadow_vert:eb,shadow_frag:nb,sprite_vert:ib,sprite_frag:ab},Ot={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},Wi={basic:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:ue.meshbasic_vert,fragmentShader:ue.meshbasic_frag},lambert:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshlambert_vert,fragmentShader:ue.meshlambert_frag},phong:{uniforms:kn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:ue.meshphong_vert,fragmentShader:ue.meshphong_frag},standard:{uniforms:kn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag},toon:{uniforms:kn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshtoon_vert,fragmentShader:ue.meshtoon_frag},matcap:{uniforms:kn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:ue.meshmatcap_vert,fragmentShader:ue.meshmatcap_frag},points:{uniforms:kn([Ot.points,Ot.fog]),vertexShader:ue.points_vert,fragmentShader:ue.points_frag},dashed:{uniforms:kn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ue.linedashed_vert,fragmentShader:ue.linedashed_frag},depth:{uniforms:kn([Ot.common,Ot.displacementmap]),vertexShader:ue.depth_vert,fragmentShader:ue.depth_frag},normal:{uniforms:kn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:ue.meshnormal_vert,fragmentShader:ue.meshnormal_frag},sprite:{uniforms:kn([Ot.sprite,Ot.fog]),vertexShader:ue.sprite_vert,fragmentShader:ue.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ue.background_vert,fragmentShader:ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:ue.backgroundCube_vert,fragmentShader:ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ue.cube_vert,fragmentShader:ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ue.equirect_vert,fragmentShader:ue.equirect_frag},distanceRGBA:{uniforms:kn([Ot.common,Ot.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ue.distanceRGBA_vert,fragmentShader:ue.distanceRGBA_frag},shadow:{uniforms:kn([Ot.lights,Ot.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:ue.shadow_vert,fragmentShader:ue.shadow_frag}};Wi.physical={uniforms:kn([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag};const Xc={r:0,b:0,g:0},Ns=new ba,sb=new sn;function rb(r,t,n,a,l,c,f){const h=new fe(0);let p=c===!0?0:1,m,g,_=null,x=0,M=null;function E(U){let L=U.isScene===!0?U.background:null;return L&&L.isTexture&&(L=(U.backgroundBlurriness>0?n:t).get(L)),L}function T(U){let L=!1;const w=E(U);w===null?v(h,p):w&&w.isColor&&(v(w,1),L=!0);const W=r.xr.getEnvironmentBlendMode();W==="additive"?a.buffers.color.setClear(0,0,0,1,f):W==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,f),(r.autoClear||L)&&(a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(U,L){const w=E(L);w&&(w.isCubeTexture||w.mapping===hu)?(g===void 0&&(g=new ln(new We(1,1,1),new Fi({name:"BackgroundCubeMaterial",uniforms:Zr(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(W,B,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Ns.copy(L.backgroundRotation),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),g.material.uniforms.envMap.value=w,g.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(sb.makeRotationFromEuler(Ns)),g.material.toneMapped=be.getTransfer(w.colorSpace)!==Ie,(_!==w||x!==w.version||M!==r.toneMapping)&&(g.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),g.layers.enableAll(),U.unshift(g,g.geometry,g.material,0,0,null)):w&&w.isTexture&&(m===void 0&&(m=new ln(new pu(2,2),new Fi({name:"BackgroundMaterial",uniforms:Zr(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:cs,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=w,m.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,m.material.toneMapped=be.getTransfer(w.colorSpace)!==Ie,w.matrixAutoUpdate===!0&&w.updateMatrix(),m.material.uniforms.uvTransform.value.copy(w.matrix),(_!==w||x!==w.version||M!==r.toneMapping)&&(m.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null))}function v(U,L){U.getRGB(Xc,ux(r)),a.buffers.color.setClear(Xc.r,Xc.g,Xc.b,L,f)}return{getClearColor:function(){return h},setClearColor:function(U,L=1){h.set(U),p=L,v(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(U){p=U,v(h,p)},render:T,addToRenderList:S}}function ob(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},l=x(null);let c=l,f=!1;function h(R,F,$,it,ut){let mt=!1;const z=_(it,$,F);c!==z&&(c=z,m(c.object)),mt=M(R,it,$,ut),mt&&E(R,it,$,ut),ut!==null&&t.update(ut,r.ELEMENT_ARRAY_BUFFER),(mt||f)&&(f=!1,w(R,F,$,it),ut!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ut).buffer))}function p(){return r.createVertexArray()}function m(R){return r.bindVertexArray(R)}function g(R){return r.deleteVertexArray(R)}function _(R,F,$){const it=$.wireframe===!0;let ut=a[R.id];ut===void 0&&(ut={},a[R.id]=ut);let mt=ut[F.id];mt===void 0&&(mt={},ut[F.id]=mt);let z=mt[it];return z===void 0&&(z=x(p()),mt[it]=z),z}function x(R){const F=[],$=[],it=[];for(let ut=0;ut<n;ut++)F[ut]=0,$[ut]=0,it[ut]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:$,attributeDivisors:it,object:R,attributes:{},index:null}}function M(R,F,$,it){const ut=c.attributes,mt=F.attributes;let z=0;const Q=$.getAttributes();for(const K in Q)if(Q[K].location>=0){const Tt=ut[K];let P=mt[K];if(P===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(P=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(P=R.instanceColor)),Tt===void 0||Tt.attribute!==P||P&&Tt.data!==P.data)return!0;z++}return c.attributesNum!==z||c.index!==it}function E(R,F,$,it){const ut={},mt=F.attributes;let z=0;const Q=$.getAttributes();for(const K in Q)if(Q[K].location>=0){let Tt=mt[K];Tt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(Tt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(Tt=R.instanceColor));const P={};P.attribute=Tt,Tt&&Tt.data&&(P.data=Tt.data),ut[K]=P,z++}c.attributes=ut,c.attributesNum=z,c.index=it}function T(){const R=c.newAttributes;for(let F=0,$=R.length;F<$;F++)R[F]=0}function S(R){v(R,0)}function v(R,F){const $=c.newAttributes,it=c.enabledAttributes,ut=c.attributeDivisors;$[R]=1,it[R]===0&&(r.enableVertexAttribArray(R),it[R]=1),ut[R]!==F&&(r.vertexAttribDivisor(R,F),ut[R]=F)}function U(){const R=c.newAttributes,F=c.enabledAttributes;for(let $=0,it=F.length;$<it;$++)F[$]!==R[$]&&(r.disableVertexAttribArray($),F[$]=0)}function L(R,F,$,it,ut,mt,z){z===!0?r.vertexAttribIPointer(R,F,$,ut,mt):r.vertexAttribPointer(R,F,$,it,ut,mt)}function w(R,F,$,it){T();const ut=it.attributes,mt=$.getAttributes(),z=F.defaultAttributeValues;for(const Q in mt){const K=mt[Q];if(K.location>=0){let St=ut[Q];if(St===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(St=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(St=R.instanceColor)),St!==void 0){const Tt=St.normalized,P=St.itemSize,st=t.get(St);if(st===void 0)continue;const yt=st.buffer,j=st.type,ft=st.bytesPerElement,Et=j===r.INT||j===r.UNSIGNED_INT||St.gpuType===cp;if(St.isInterleavedBufferAttribute){const xt=St.data,Vt=xt.stride,Ht=St.offset;if(xt.isInstancedInterleavedBuffer){for(let ae=0;ae<K.locationSize;ae++)v(K.location+ae,xt.meshPerAttribute);R.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let ae=0;ae<K.locationSize;ae++)S(K.location+ae);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let ae=0;ae<K.locationSize;ae++)L(K.location+ae,P/K.locationSize,j,Tt,Vt*ft,(Ht+P/K.locationSize*ae)*ft,Et)}else{if(St.isInstancedBufferAttribute){for(let xt=0;xt<K.locationSize;xt++)v(K.location+xt,St.meshPerAttribute);R.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let xt=0;xt<K.locationSize;xt++)S(K.location+xt);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let xt=0;xt<K.locationSize;xt++)L(K.location+xt,P/K.locationSize,j,Tt,P*ft,P/K.locationSize*xt*ft,Et)}}else if(z!==void 0){const Tt=z[Q];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(K.location,Tt);break;case 3:r.vertexAttrib3fv(K.location,Tt);break;case 4:r.vertexAttrib4fv(K.location,Tt);break;default:r.vertexAttrib1fv(K.location,Tt)}}}}U()}function W(){G();for(const R in a){const F=a[R];for(const $ in F){const it=F[$];for(const ut in it)g(it[ut].object),delete it[ut];delete F[$]}delete a[R]}}function B(R){if(a[R.id]===void 0)return;const F=a[R.id];for(const $ in F){const it=F[$];for(const ut in it)g(it[ut].object),delete it[ut];delete F[$]}delete a[R.id]}function O(R){for(const F in a){const $=a[F];if($[R.id]===void 0)continue;const it=$[R.id];for(const ut in it)g(it[ut].object),delete it[ut];delete $[R.id]}}function G(){D(),f=!0,c!==l&&(c=l,m(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:G,resetDefaultState:D,dispose:W,releaseStatesOfGeometry:B,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:S,disableUnusedAttributes:U}}function lb(r,t,n){let a;function l(m){a=m}function c(m,g){r.drawArrays(a,m,g),n.update(g,a,1)}function f(m,g,_){_!==0&&(r.drawArraysInstanced(a,m,g,_),n.update(g,a,_))}function h(m,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,g,0,_);let M=0;for(let E=0;E<_;E++)M+=g[E];n.update(M,a,1)}function p(m,g,_,x){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<m.length;E++)f(m[E],g[E],x[E]);else{M.multiDrawArraysInstancedWEBGL(a,m,0,g,0,x,0,_);let E=0;for(let T=0;T<_;T++)E+=g[T]*x[T];n.update(E,a,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function cb(r,t,n,a){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const O=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==Bi&&a.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(O){const G=O===Kr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(O!==Ta&&a.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==ya&&!G)}function p(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const g=p(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const _=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),U=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),L=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),W=E>0,B=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:S,maxAttributes:v,maxVertexUniforms:U,maxVaryings:L,maxFragmentUniforms:w,vertexTextures:W,maxSamples:B}}function ub(r){const t=this;let n=null,a=0,l=!1,c=!1;const f=new Ps,h=new ce,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const M=_.length!==0||x||a!==0||l;return l=x,a=_.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,x){n=g(_,x,0)},this.setState=function(_,x,M){const E=_.clippingPlanes,T=_.clipIntersection,S=_.clipShadows,v=r.get(_);if(!l||E===null||E.length===0||c&&!S)c?g(null):m();else{const U=c?0:a,L=U*4;let w=v.clippingState||null;p.value=w,w=g(E,x,L,M);for(let W=0;W!==L;++W)w[W]=n[W];v.clippingState=w,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=U}};function m(){p.value!==n&&(p.value=n,p.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,x,M,E){const T=_!==null?_.length:0;let S=null;if(T!==0){if(S=p.value,E!==!0||S===null){const v=M+T*4,U=x.matrixWorldInverse;h.getNormalMatrix(U),(S===null||S.length<v)&&(S=new Float32Array(v));for(let L=0,w=M;L!==T;++L,w+=4)f.copy(_[L]).applyMatrix4(U,h),f.normal.toArray(S,w),S[w+3]=f.constant}p.value=S,p.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function fb(r){let t=new WeakMap;function n(f,h){return h===Rd?f.mapping=qr:h===wd&&(f.mapping=Wr),f}function a(f){if(f&&f.isTexture){const h=f.mapping;if(h===Rd||h===wd)if(t.has(f)){const p=t.get(f).texture;return n(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new ME(p.height);return m.fromEquirectangularTexture(r,f),t.set(f,m),f.addEventListener("dispose",l),n(m.texture,f.mapping)}else return null}}return f}function l(f){const h=f.target;h.removeEventListener("dispose",l);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function c(){t=new WeakMap}return{get:a,dispose:c}}class mx extends fx{constructor(t=-1,n=1,a=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=a-t,f=a+t,h=l+n,p=l-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,h-=g*this.view.offsetY,p=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Fr=4,K_=[.125,.215,.35,.446,.526,.582],Is=20,ad=new mx,Q_=new fe;let sd=null,rd=0,od=0,ld=!1;const zs=(1+Math.sqrt(5))/2,Pr=1/zs,J_=[new J(-zs,Pr,0),new J(zs,Pr,0),new J(-Pr,0,zs),new J(Pr,0,zs),new J(0,zs,-Pr),new J(0,zs,Pr),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class $_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,a=.1,l=100){sd=this._renderer.getRenderTarget(),rd=this._renderer.getActiveCubeFace(),od=this._renderer.getActiveMipmapLevel(),ld=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,a,l,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ev(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sd,rd,od),this._renderer.xr.enabled=ld,t.scissorTest=!1,qc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===qr||t.mapping===Wr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sd=this._renderer.getRenderTarget(),rd=this._renderer.getActiveCubeFace(),od=this._renderer.getActiveMipmapLevel(),ld=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Yi,minFilter:Yi,generateMipmaps:!1,type:Kr,format:Bi,colorSpace:Qr,depthBuffer:!1},l=tv(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tv(t,n,a);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hb(c)),this._blurMaterial=db(c,t,n)}return l}_compileMaterial(t){const n=new ln(this._lodPlanes[0],t);this._renderer.compile(n,ad)}_sceneToCubeUV(t,n,a,l){const h=new bi(90,1,n,a),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(Q_),g.toneMapping=ls,g.autoClear=!1;const M=new as({name:"PMREM.Background",side:Xn,depthWrite:!1,depthTest:!1}),E=new ln(new We,M);let T=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,T=!0):(M.color.copy(Q_),T=!0);for(let v=0;v<6;v++){const U=v%3;U===0?(h.up.set(0,p[v],0),h.lookAt(m[v],0,0)):U===1?(h.up.set(0,0,p[v]),h.lookAt(0,m[v],0)):(h.up.set(0,p[v],0),h.lookAt(0,0,m[v]));const L=this._cubeSize;qc(l,U*L,v>2?L:0,L,L),g.setRenderTarget(l),T&&g.render(E,h),g.render(t,h)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=_,t.background=S}_textureToCubeUV(t,n){const a=this._renderer,l=t.mapping===qr||t.mapping===Wr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=nv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ev());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new ln(this._lodPlanes[0],c),h=c.uniforms;h.envMap.value=t;const p=this._cubeSize;qc(n,0,0,3*p,2*p),a.setRenderTarget(n),a.render(f,ad)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),h=J_[(l-c-1)%J_.length];this._blur(t,c-1,c,f,h)}n.autoClear=a}_blur(t,n,a,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,a,l,"latitudinal",c),this._halfBlur(f,t,a,a,l,"longitudinal",c)}_halfBlur(t,n,a,l,c,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new ln(this._lodPlanes[l],m),x=m.uniforms,M=this._sizeLods[a]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Is-1),T=c/E,S=isFinite(c)?1+Math.floor(g*T):Is;S>Is&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Is}`);const v=[];let U=0;for(let O=0;O<Is;++O){const G=O/T,D=Math.exp(-G*G/2);v.push(D),O===0?U+=D:O<S&&(U+=2*D)}for(let O=0;O<v.length;O++)v[O]=v[O]/U;x.envMap.value=t.texture,x.samples.value=S,x.weights.value=v,x.latitudinal.value=f==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:L}=this;x.dTheta.value=E,x.mipInt.value=L-a;const w=this._sizeLods[l],W=3*w*(l>L-Fr?l-L+Fr:0),B=4*(this._cubeSize-w);qc(n,W,B,3*w,2*w),p.setRenderTarget(n),p.render(_,ad)}}function hb(r){const t=[],n=[],a=[];let l=r;const c=r-Fr+1+K_.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);n.push(h);let p=1/h;f>r-Fr?p=K_[f-r+Fr-1]:f===0&&(p=0),a.push(p);const m=1/(h-2),g=-m,_=1+m,x=[g,g,_,g,_,_,g,g,_,_,g,_],M=6,E=6,T=3,S=2,v=1,U=new Float32Array(T*E*M),L=new Float32Array(S*E*M),w=new Float32Array(v*E*M);for(let B=0;B<M;B++){const O=B%3*2/3-1,G=B>2?0:-1,D=[O,G,0,O+2/3,G,0,O+2/3,G+1,0,O,G,0,O+2/3,G+1,0,O,G+1,0];U.set(D,T*E*B),L.set(x,S*E*B);const R=[B,B,B,B,B,B];w.set(R,v*E*B)}const W=new An;W.setAttribute("position",new On(U,T)),W.setAttribute("uv",new On(L,S)),W.setAttribute("faceIndex",new On(w,v)),t.push(W),l>Fr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:a}}function tv(r,t,n){const a=new us(r,t,n);return a.texture.mapping=hu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function qc(r,t,n,a,l){r.viewport.set(t,n,a,l),r.scissor.set(t,n,a,l)}function db(r,t,n){const a=new Float32Array(Is),l=new J(0,1,0);return new Fi({name:"SphericalGaussianBlur",defines:{n:Is,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:_p(),fragmentShader:`

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
		`,blending:Ma,depthTest:!1,depthWrite:!1})}function ev(){return new Fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_p(),fragmentShader:`

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
		`,blending:Ma,depthTest:!1,depthWrite:!1})}function nv(){return new Fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_p(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ma,depthTest:!1,depthWrite:!1})}function _p(){return`

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
	`}function pb(r){let t=new WeakMap,n=null;function a(h){if(h&&h.isTexture){const p=h.mapping,m=p===Rd||p===wd,g=p===qr||p===Wr;if(m||g){let _=t.get(h);const x=_!==void 0?_.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==x)return n===null&&(n=new $_(r)),_=m?n.fromEquirectangular(h,_):n.fromCubemap(h,_),_.texture.pmremVersion=h.pmremVersion,t.set(h,_),_.texture;if(_!==void 0)return _.texture;{const M=h.image;return m&&M&&M.height>0||g&&M&&l(M)?(n===null&&(n=new $_(r)),_=m?n.fromEquirectangular(h):n.fromCubemap(h),_.texture.pmremVersion=h.pmremVersion,t.set(h,_),h.addEventListener("dispose",c),_.texture):null}}}return h}function l(h){let p=0;const m=6;for(let g=0;g<m;g++)h[g]!==void 0&&p++;return p===m}function c(h){const p=h.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:a,dispose:f}}function mb(r){const t={};function n(a){if(t[a]!==void 0)return t[a];let l;switch(a){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(a)}return t[a]=l,l}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const l=n(a);return l===null&&il("THREE.WebGLRenderer: "+a+" extension not supported."),l}}}function gb(r,t,n,a){const l={},c=new WeakMap;function f(_){const x=_.target;x.index!==null&&t.remove(x.index);for(const E in x.attributes)t.remove(x.attributes[E]);for(const E in x.morphAttributes){const T=x.morphAttributes[E];for(let S=0,v=T.length;S<v;S++)t.remove(T[S])}x.removeEventListener("dispose",f),delete l[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),a.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function h(_,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,n.memory.geometries++),x}function p(_){const x=_.attributes;for(const E in x)t.update(x[E],r.ARRAY_BUFFER);const M=_.morphAttributes;for(const E in M){const T=M[E];for(let S=0,v=T.length;S<v;S++)t.update(T[S],r.ARRAY_BUFFER)}}function m(_){const x=[],M=_.index,E=_.attributes.position;let T=0;if(M!==null){const U=M.array;T=M.version;for(let L=0,w=U.length;L<w;L+=3){const W=U[L+0],B=U[L+1],O=U[L+2];x.push(W,B,B,O,O,W)}}else if(E!==void 0){const U=E.array;T=E.version;for(let L=0,w=U.length/3-1;L<w;L+=3){const W=L+0,B=L+1,O=L+2;x.push(W,B,B,O,O,W)}}else return;const S=new(ix(x)?cx:lx)(x,1);S.version=T;const v=c.get(_);v&&t.remove(v),c.set(_,S)}function g(_){const x=c.get(_);if(x){const M=_.index;M!==null&&x.version<M.version&&m(_)}else m(_);return c.get(_)}return{get:h,update:p,getWireframeAttribute:g}}function _b(r,t,n){let a;function l(x){a=x}let c,f;function h(x){c=x.type,f=x.bytesPerElement}function p(x,M){r.drawElements(a,M,c,x*f),n.update(M,a,1)}function m(x,M,E){E!==0&&(r.drawElementsInstanced(a,M,c,x*f,E),n.update(M,a,E))}function g(x,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,M,0,c,x,0,E);let S=0;for(let v=0;v<E;v++)S+=M[v];n.update(S,a,1)}function _(x,M,E,T){if(E===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let v=0;v<x.length;v++)m(x[v]/f,M[v],T[v]);else{S.multiDrawElementsInstancedWEBGL(a,M,0,c,x,0,T,0,E);let v=0;for(let U=0;U<E;U++)v+=M[U]*T[U];n.update(v,a,1)}}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function vb(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,f,h){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:a}}function xb(r,t,n){const a=new WeakMap,l=new cn;function c(f,h,p){const m=f.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let x=a.get(h);if(x===void 0||x.count!==_){let R=function(){G.dispose(),a.delete(h),h.removeEventListener("dispose",R)};var M=R;x!==void 0&&x.texture.dispose();const E=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,v=h.morphAttributes.position||[],U=h.morphAttributes.normal||[],L=h.morphAttributes.color||[];let w=0;E===!0&&(w=1),T===!0&&(w=2),S===!0&&(w=3);let W=h.attributes.position.count*w,B=1;W>t.maxTextureSize&&(B=Math.ceil(W/t.maxTextureSize),W=t.maxTextureSize);const O=new Float32Array(W*B*4*_),G=new sx(O,W,B,_);G.type=ya,G.needsUpdate=!0;const D=w*4;for(let F=0;F<_;F++){const $=v[F],it=U[F],ut=L[F],mt=W*B*4*F;for(let z=0;z<$.count;z++){const Q=z*D;E===!0&&(l.fromBufferAttribute($,z),O[mt+Q+0]=l.x,O[mt+Q+1]=l.y,O[mt+Q+2]=l.z,O[mt+Q+3]=0),T===!0&&(l.fromBufferAttribute(it,z),O[mt+Q+4]=l.x,O[mt+Q+5]=l.y,O[mt+Q+6]=l.z,O[mt+Q+7]=0),S===!0&&(l.fromBufferAttribute(ut,z),O[mt+Q+8]=l.x,O[mt+Q+9]=l.y,O[mt+Q+10]=l.z,O[mt+Q+11]=ut.itemSize===4?l.w:1)}}x={count:_,texture:G,size:new we(W,B)},a.set(h,x),h.addEventListener("dispose",R)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let E=0;for(let S=0;S<m.length;S++)E+=m[S];const T=h.morphTargetsRelative?1:1-E;p.getUniforms().setValue(r,"morphTargetBaseInfluence",T),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function yb(r,t,n,a){let l=new WeakMap;function c(p){const m=a.render.frame,g=p.geometry,_=t.get(p,g);if(l.get(_)!==m&&(t.update(_),l.set(_,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),l.get(p)!==m&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;l.get(x)!==m&&(x.update(),l.set(x,m))}return _}function f(){l=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:c,dispose:f}}class gx extends ei{constructor(t,n,a,l,c,f,h,p,m,g=Hr){if(g!==Hr&&g!==jr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&g===Hr&&(a=Vs),a===void 0&&g===jr&&(a=Yr),super(null,l,c,f,h,p,g,a,m),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=h!==void 0?h:Ii,this.minFilter=p!==void 0?p:Ii,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const _x=new ei,iv=new gx(1,1),vx=new sx,xx=new oE,yx=new hx,av=[],sv=[],rv=new Float32Array(16),ov=new Float32Array(9),lv=new Float32Array(4);function to(r,t,n){const a=r[0];if(a<=0||a>0)return r;const l=t*n;let c=av[l];if(c===void 0&&(c=new Float32Array(l),av[l]=c),t!==0){a.toArray(c,0);for(let f=1,h=0;f!==t;++f)h+=n,r[f].toArray(c,h)}return c}function Sn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function Mn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function mu(r,t){let n=sv[t];n===void 0&&(n=new Int32Array(t),sv[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function Sb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function Mb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2fv(this.addr,t),Mn(n,t)}}function Eb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Sn(n,t))return;r.uniform3fv(this.addr,t),Mn(n,t)}}function Tb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4fv(this.addr,t),Mn(n,t)}}function bb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Sn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,a))return;lv.set(a),r.uniformMatrix2fv(this.addr,!1,lv),Mn(n,a)}}function Ab(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Sn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,a))return;ov.set(a),r.uniformMatrix3fv(this.addr,!1,ov),Mn(n,a)}}function Rb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Sn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,a))return;rv.set(a),r.uniformMatrix4fv(this.addr,!1,rv),Mn(n,a)}}function wb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function Cb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2iv(this.addr,t),Mn(n,t)}}function Db(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3iv(this.addr,t),Mn(n,t)}}function Ub(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4iv(this.addr,t),Mn(n,t)}}function Lb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function Nb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2uiv(this.addr,t),Mn(n,t)}}function Ob(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3uiv(this.addr,t),Mn(n,t)}}function Pb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4uiv(this.addr,t),Mn(n,t)}}function zb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(iv.compareFunction=nx,c=iv):c=_x,n.setTexture2D(t||c,l)}function Bb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture3D(t||xx,l)}function Ib(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTextureCube(t||yx,l)}function Fb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture2DArray(t||vx,l)}function Gb(r){switch(r){case 5126:return Sb;case 35664:return Mb;case 35665:return Eb;case 35666:return Tb;case 35674:return bb;case 35675:return Ab;case 35676:return Rb;case 5124:case 35670:return wb;case 35667:case 35671:return Cb;case 35668:case 35672:return Db;case 35669:case 35673:return Ub;case 5125:return Lb;case 36294:return Nb;case 36295:return Ob;case 36296:return Pb;case 35678:case 36198:case 36298:case 36306:case 35682:return zb;case 35679:case 36299:case 36307:return Bb;case 35680:case 36300:case 36308:case 36293:return Ib;case 36289:case 36303:case 36311:case 36292:return Fb}}function Hb(r,t){r.uniform1fv(this.addr,t)}function Vb(r,t){const n=to(t,this.size,2);r.uniform2fv(this.addr,n)}function kb(r,t){const n=to(t,this.size,3);r.uniform3fv(this.addr,n)}function Xb(r,t){const n=to(t,this.size,4);r.uniform4fv(this.addr,n)}function qb(r,t){const n=to(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function Wb(r,t){const n=to(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function Yb(r,t){const n=to(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function jb(r,t){r.uniform1iv(this.addr,t)}function Zb(r,t){r.uniform2iv(this.addr,t)}function Kb(r,t){r.uniform3iv(this.addr,t)}function Qb(r,t){r.uniform4iv(this.addr,t)}function Jb(r,t){r.uniform1uiv(this.addr,t)}function $b(r,t){r.uniform2uiv(this.addr,t)}function tA(r,t){r.uniform3uiv(this.addr,t)}function eA(r,t){r.uniform4uiv(this.addr,t)}function nA(r,t,n){const a=this.cache,l=t.length,c=mu(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||_x,c[f])}function iA(r,t,n){const a=this.cache,l=t.length,c=mu(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||xx,c[f])}function aA(r,t,n){const a=this.cache,l=t.length,c=mu(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||yx,c[f])}function sA(r,t,n){const a=this.cache,l=t.length,c=mu(n,l);Sn(a,c)||(r.uniform1iv(this.addr,c),Mn(a,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||vx,c[f])}function rA(r){switch(r){case 5126:return Hb;case 35664:return Vb;case 35665:return kb;case 35666:return Xb;case 35674:return qb;case 35675:return Wb;case 35676:return Yb;case 5124:case 35670:return jb;case 35667:case 35671:return Zb;case 35668:case 35672:return Kb;case 35669:case 35673:return Qb;case 5125:return Jb;case 36294:return $b;case 36295:return tA;case 36296:return eA;case 35678:case 36198:case 36298:case 36306:case 35682:return nA;case 35679:case 36299:case 36307:return iA;case 35680:case 36300:case 36308:case 36293:return aA;case 36289:case 36303:case 36311:case 36292:return sA}}class oA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=Gb(n.type)}}class lA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=rA(n.type)}}class cA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(t,n[h.id],a)}}}const cd=/(\w+)(\])?(\[|\.)?/g;function cv(r,t){r.seq.push(t),r.map[t.id]=t}function uA(r,t,n){const a=r.name,l=a.length;for(cd.lastIndex=0;;){const c=cd.exec(a),f=cd.lastIndex;let h=c[1];const p=c[2]==="]",m=c[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===l){cv(n,m===void 0?new oA(h,r,t):new lA(h,r,t));break}else{let _=n.map[h];_===void 0&&(_=new cA(h),cv(n,_)),n=_}}}class au{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<a;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);uA(c,f,this)}}setValue(t,n,a,l){const c=this.map[n];c!==void 0&&c.setValue(t,a,l)}setOptional(t,n,a){const l=n[a];l!==void 0&&this.setValue(t,a,l)}static upload(t,n,a,l){for(let c=0,f=n.length;c!==f;++c){const h=n[c],p=a[h.id];p.needsUpdate!==!1&&h.setValue(t,p.value,l)}}static seqWithValue(t,n){const a=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&a.push(f)}return a}}function uv(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const fA=37297;let hA=0;function dA(r,t){const n=r.split(`
`),a=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const h=f+1;a.push(`${h===t?">":" "} ${h}: ${n[f]}`)}return a.join(`
`)}const fv=new ce;function pA(r){be._getMatrix(fv,be.workingColorSpace,r);const t=`mat3( ${fv.elements.map(n=>n.toFixed(4))} )`;switch(be.getTransfer(r)){case du:return[t,"LinearTransferOETF"];case Ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function hv(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(a&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+dA(r.getShaderSource(t),f)}else return l}function mA(r,t){const n=pA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function gA(r,t){let n;switch(t){case Fv:n="Linear";break;case Gv:n="Reinhard";break;case Hv:n="Cineon";break;case Vv:n="ACESFilmic";break;case kv:n="AgX";break;case Xv:n="Neutral";break;case FM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Wc=new J;function _A(){be.getLuminanceCoefficients(Wc);const r=Wc.x.toFixed(4),t=Wc.y.toFixed(4),n=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function xA(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function yA(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<a;l++){const c=r.getActiveAttrib(t,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:h}}return n}function al(r){return r!==""}function dv(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const SA=/^[ \t]*#include +<([\w\d./]+)>/gm;function ap(r){return r.replace(SA,EA)}const MA=new Map;function EA(r,t){let n=ue[t];if(n===void 0){const a=MA.get(t);if(a!==void 0)n=ue[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("Can not resolve #include <"+t+">")}return ap(n)}const TA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mv(r){return r.replace(TA,bA)}function bA(r,t,n,a){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function gv(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function AA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Bv?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===vM?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===va&&(t="SHADOWMAP_TYPE_VSM"),t}function RA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case qr:case Wr:t="ENVMAP_TYPE_CUBE";break;case hu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function wA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Wr:t="ENVMAP_MODE_REFRACTION";break}return t}function CA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Iv:t="ENVMAP_BLENDING_MULTIPLY";break;case BM:t="ENVMAP_BLENDING_MIX";break;case IM:t="ENVMAP_BLENDING_ADD";break}return t}function DA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function UA(r,t,n,a){const l=r.getContext(),c=n.defines;let f=n.vertexShader,h=n.fragmentShader;const p=AA(n),m=RA(n),g=wA(n),_=CA(n),x=DA(n),M=vA(n),E=xA(c),T=l.createProgram();let S,v,U=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(al).join(`
`),S.length>0&&(S+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(al).join(`
`),v.length>0&&(v+=`
`)):(S=[gv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),v=[gv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ls?"#define TONE_MAPPING":"",n.toneMapping!==ls?ue.tonemapping_pars_fragment:"",n.toneMapping!==ls?gA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ue.colorspace_pars_fragment,mA("linearToOutputTexel",n.outputColorSpace),_A(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(al).join(`
`)),f=ap(f),f=dv(f,n),f=pv(f,n),h=ap(h),h=dv(h,n),h=pv(h,n),f=mv(f),h=mv(h),n.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,v=["#define varying in",n.glslVersion===C_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===C_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const L=U+S+f,w=U+v+h,W=uv(l,l.VERTEX_SHADER,L),B=uv(l,l.FRAGMENT_SHADER,w);l.attachShader(T,W),l.attachShader(T,B),n.index0AttributeName!==void 0?l.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function O(F){if(r.debug.checkShaderErrors){const $=l.getProgramInfoLog(T).trim(),it=l.getShaderInfoLog(W).trim(),ut=l.getShaderInfoLog(B).trim();let mt=!0,z=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(mt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,W,B);else{const Q=hv(l,W,"vertex"),K=hv(l,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+$+`
`+Q+`
`+K)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(it===""||ut==="")&&(z=!1);z&&(F.diagnostics={runnable:mt,programLog:$,vertexShader:{log:it,prefix:S},fragmentShader:{log:ut,prefix:v}})}l.deleteShader(W),l.deleteShader(B),G=new au(l,T),D=yA(l,T)}let G;this.getUniforms=function(){return G===void 0&&O(this),G};let D;this.getAttributes=function(){return D===void 0&&O(this),D};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=l.getProgramParameter(T,fA)),R},this.destroy=function(){a.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=hA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=W,this.fragmentShader=B,this}let LA=0;class NA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,a=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(a),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new OA(t),n.set(t,a)),a}}class OA{constructor(t){this.id=LA++,this.code=t,this.usedTimes=0}}function PA(r,t,n,a,l,c,f){const h=new rx,p=new NA,m=new Set,g=[],_=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(D){return m.add(D),D===0?"uv":`uv${D}`}function S(D,R,F,$,it){const ut=$.fog,mt=it.geometry,z=D.isMeshStandardMaterial?$.environment:null,Q=(D.isMeshStandardMaterial?n:t).get(D.envMap||z),K=Q&&Q.mapping===hu?Q.image.height:null,St=E[D.type];D.precision!==null&&(M=l.getMaxPrecision(D.precision),M!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",M,"instead."));const Tt=mt.morphAttributes.position||mt.morphAttributes.normal||mt.morphAttributes.color,P=Tt!==void 0?Tt.length:0;let st=0;mt.morphAttributes.position!==void 0&&(st=1),mt.morphAttributes.normal!==void 0&&(st=2),mt.morphAttributes.color!==void 0&&(st=3);let yt,j,ft,Et;if(St){const Ae=Wi[St];yt=Ae.vertexShader,j=Ae.fragmentShader}else yt=D.vertexShader,j=D.fragmentShader,p.update(D),ft=p.getVertexShaderID(D),Et=p.getFragmentShaderID(D);const xt=r.getRenderTarget(),Vt=r.state.buffers.depth.getReversed(),Ht=it.isInstancedMesh===!0,ae=it.isBatchedMesh===!0,Fe=!!D.map,de=!!D.matcap,Qe=!!Q,q=!!D.aoMap,Pn=!!D.lightMap,he=!!D.bumpMap,ge=!!D.normalMap,Qt=!!D.displacementMap,Oe=!!D.emissiveMap,Zt=!!D.metalnessMap,N=!!D.roughnessMap,A=D.anisotropy>0,at=D.clearcoat>0,dt=D.dispersion>0,Mt=D.iridescence>0,gt=D.sheen>0,Wt=D.transmission>0,Lt=A&&!!D.anisotropyMap,zt=at&&!!D.clearcoatMap,_e=at&&!!D.clearcoatNormalMap,Rt=at&&!!D.clearcoatRoughnessMap,Bt=Mt&&!!D.iridescenceMap,Kt=Mt&&!!D.iridescenceThicknessMap,Yt=gt&&!!D.sheenColorMap,Pt=gt&&!!D.sheenRoughnessMap,te=!!D.specularMap,re=!!D.specularColorMap,Ge=!!D.specularIntensityMap,V=Wt&&!!D.transmissionMap,wt=Wt&&!!D.thicknessMap,ct=!!D.gradientMap,vt=!!D.alphaMap,Ct=D.alphaTest>0,Nt=!!D.alphaHash,ee=!!D.extensions;let Je=ls;D.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(Je=r.toneMapping);const _n={shaderID:St,shaderType:D.type,shaderName:D.name,vertexShader:yt,fragmentShader:j,defines:D.defines,customVertexShaderID:ft,customFragmentShaderID:Et,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:M,batching:ae,batchingColor:ae&&it._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&it.instanceColor!==null,instancingMorph:Ht&&it.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:xt===null?r.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:Qr,alphaToCoverage:!!D.alphaToCoverage,map:Fe,matcap:de,envMap:Qe,envMapMode:Qe&&Q.mapping,envMapCubeUVHeight:K,aoMap:q,lightMap:Pn,bumpMap:he,normalMap:ge,displacementMap:x&&Qt,emissiveMap:Oe,normalMapObjectSpace:ge&&D.normalMapType===XM,normalMapTangentSpace:ge&&D.normalMapType===kM,metalnessMap:Zt,roughnessMap:N,anisotropy:A,anisotropyMap:Lt,clearcoat:at,clearcoatMap:zt,clearcoatNormalMap:_e,clearcoatRoughnessMap:Rt,dispersion:dt,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:Yt,sheenRoughnessMap:Pt,specularMap:te,specularColorMap:re,specularIntensityMap:Ge,transmission:Wt,transmissionMap:V,thicknessMap:wt,gradientMap:ct,opaque:D.transparent===!1&&D.blending===Gr&&D.alphaToCoverage===!1,alphaMap:vt,alphaTest:Ct,alphaHash:Nt,combine:D.combine,mapUv:Fe&&T(D.map.channel),aoMapUv:q&&T(D.aoMap.channel),lightMapUv:Pn&&T(D.lightMap.channel),bumpMapUv:he&&T(D.bumpMap.channel),normalMapUv:ge&&T(D.normalMap.channel),displacementMapUv:Qt&&T(D.displacementMap.channel),emissiveMapUv:Oe&&T(D.emissiveMap.channel),metalnessMapUv:Zt&&T(D.metalnessMap.channel),roughnessMapUv:N&&T(D.roughnessMap.channel),anisotropyMapUv:Lt&&T(D.anisotropyMap.channel),clearcoatMapUv:zt&&T(D.clearcoatMap.channel),clearcoatNormalMapUv:_e&&T(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Rt&&T(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&T(D.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(D.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&T(D.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&T(D.sheenRoughnessMap.channel),specularMapUv:te&&T(D.specularMap.channel),specularColorMapUv:re&&T(D.specularColorMap.channel),specularIntensityMapUv:Ge&&T(D.specularIntensityMap.channel),transmissionMapUv:V&&T(D.transmissionMap.channel),thicknessMapUv:wt&&T(D.thicknessMap.channel),alphaMapUv:vt&&T(D.alphaMap.channel),vertexTangents:!!mt.attributes.tangent&&(ge||A),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!mt.attributes.color&&mt.attributes.color.itemSize===4,pointsUvs:it.isPoints===!0&&!!mt.attributes.uv&&(Fe||vt),fog:!!ut,useFog:D.fog===!0,fogExp2:!!ut&&ut.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Vt,skinning:it.isSkinnedMesh===!0,morphTargets:mt.morphAttributes.position!==void 0,morphNormals:mt.morphAttributes.normal!==void 0,morphColors:mt.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:st,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Je,decodeVideoTexture:Fe&&D.map.isVideoTexture===!0&&be.getTransfer(D.map.colorSpace)===Ie,decodeVideoTextureEmissive:Oe&&D.emissiveMap.isVideoTexture===!0&&be.getTransfer(D.emissiveMap.colorSpace)===Ie,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===xa,flipSided:D.side===Xn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:ee&&D.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&D.extensions.multiDraw===!0||ae)&&a.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return _n.vertexUv1s=m.has(1),_n.vertexUv2s=m.has(2),_n.vertexUv3s=m.has(3),m.clear(),_n}function v(D){const R=[];if(D.shaderID?R.push(D.shaderID):(R.push(D.customVertexShaderID),R.push(D.customFragmentShaderID)),D.defines!==void 0)for(const F in D.defines)R.push(F),R.push(D.defines[F]);return D.isRawShaderMaterial===!1&&(U(R,D),L(R,D),R.push(r.outputColorSpace)),R.push(D.customProgramCacheKey),R.join()}function U(D,R){D.push(R.precision),D.push(R.outputColorSpace),D.push(R.envMapMode),D.push(R.envMapCubeUVHeight),D.push(R.mapUv),D.push(R.alphaMapUv),D.push(R.lightMapUv),D.push(R.aoMapUv),D.push(R.bumpMapUv),D.push(R.normalMapUv),D.push(R.displacementMapUv),D.push(R.emissiveMapUv),D.push(R.metalnessMapUv),D.push(R.roughnessMapUv),D.push(R.anisotropyMapUv),D.push(R.clearcoatMapUv),D.push(R.clearcoatNormalMapUv),D.push(R.clearcoatRoughnessMapUv),D.push(R.iridescenceMapUv),D.push(R.iridescenceThicknessMapUv),D.push(R.sheenColorMapUv),D.push(R.sheenRoughnessMapUv),D.push(R.specularMapUv),D.push(R.specularColorMapUv),D.push(R.specularIntensityMapUv),D.push(R.transmissionMapUv),D.push(R.thicknessMapUv),D.push(R.combine),D.push(R.fogExp2),D.push(R.sizeAttenuation),D.push(R.morphTargetsCount),D.push(R.morphAttributeCount),D.push(R.numDirLights),D.push(R.numPointLights),D.push(R.numSpotLights),D.push(R.numSpotLightMaps),D.push(R.numHemiLights),D.push(R.numRectAreaLights),D.push(R.numDirLightShadows),D.push(R.numPointLightShadows),D.push(R.numSpotLightShadows),D.push(R.numSpotLightShadowsWithMaps),D.push(R.numLightProbes),D.push(R.shadowMapType),D.push(R.toneMapping),D.push(R.numClippingPlanes),D.push(R.numClipIntersection),D.push(R.depthPacking)}function L(D,R){h.disableAll(),R.supportsVertexTextures&&h.enable(0),R.instancing&&h.enable(1),R.instancingColor&&h.enable(2),R.instancingMorph&&h.enable(3),R.matcap&&h.enable(4),R.envMap&&h.enable(5),R.normalMapObjectSpace&&h.enable(6),R.normalMapTangentSpace&&h.enable(7),R.clearcoat&&h.enable(8),R.iridescence&&h.enable(9),R.alphaTest&&h.enable(10),R.vertexColors&&h.enable(11),R.vertexAlphas&&h.enable(12),R.vertexUv1s&&h.enable(13),R.vertexUv2s&&h.enable(14),R.vertexUv3s&&h.enable(15),R.vertexTangents&&h.enable(16),R.anisotropy&&h.enable(17),R.alphaHash&&h.enable(18),R.batching&&h.enable(19),R.dispersion&&h.enable(20),R.batchingColor&&h.enable(21),D.push(h.mask),h.disableAll(),R.fog&&h.enable(0),R.useFog&&h.enable(1),R.flatShading&&h.enable(2),R.logarithmicDepthBuffer&&h.enable(3),R.reverseDepthBuffer&&h.enable(4),R.skinning&&h.enable(5),R.morphTargets&&h.enable(6),R.morphNormals&&h.enable(7),R.morphColors&&h.enable(8),R.premultipliedAlpha&&h.enable(9),R.shadowMapEnabled&&h.enable(10),R.doubleSided&&h.enable(11),R.flipSided&&h.enable(12),R.useDepthPacking&&h.enable(13),R.dithering&&h.enable(14),R.transmission&&h.enable(15),R.sheen&&h.enable(16),R.opaque&&h.enable(17),R.pointsUvs&&h.enable(18),R.decodeVideoTexture&&h.enable(19),R.decodeVideoTextureEmissive&&h.enable(20),R.alphaToCoverage&&h.enable(21),D.push(h.mask)}function w(D){const R=E[D.type];let F;if(R){const $=Wi[R];F=gp.clone($.uniforms)}else F=D.uniforms;return F}function W(D,R){let F;for(let $=0,it=g.length;$<it;$++){const ut=g[$];if(ut.cacheKey===R){F=ut,++F.usedTimes;break}}return F===void 0&&(F=new UA(r,R,D,c),g.push(F)),F}function B(D){if(--D.usedTimes===0){const R=g.indexOf(D);g[R]=g[g.length-1],g.pop(),D.destroy()}}function O(D){p.remove(D)}function G(){p.dispose()}return{getParameters:S,getProgramCacheKey:v,getUniforms:w,acquireProgram:W,releaseProgram:B,releaseShaderCache:O,programs:g,dispose:G}}function zA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function a(f){r.delete(f)}function l(f,h,p){r.get(f)[h]=p}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:l,dispose:c}}function BA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function _v(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function vv(){const r=[];let t=0;const n=[],a=[],l=[];function c(){t=0,n.length=0,a.length=0,l.length=0}function f(_,x,M,E,T,S){let v=r[t];return v===void 0?(v={id:_.id,object:_,geometry:x,material:M,groupOrder:E,renderOrder:_.renderOrder,z:T,group:S},r[t]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=M,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=T,v.group=S),t++,v}function h(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?a.push(v):M.transparent===!0?l.push(v):n.push(v)}function p(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?a.unshift(v):M.transparent===!0?l.unshift(v):n.unshift(v)}function m(_,x){n.length>1&&n.sort(_||BA),a.length>1&&a.sort(x||_v),l.length>1&&l.sort(x||_v)}function g(){for(let _=t,x=r.length;_<x;_++){const M=r[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:a,transparent:l,init:c,push:h,unshift:p,finish:g,sort:m}}function IA(){let r=new WeakMap;function t(a,l){const c=r.get(a);let f;return c===void 0?(f=new vv,r.set(a,[f])):l>=c.length?(f=new vv,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function FA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new J,color:new fe};break;case"SpotLight":n={position:new J,direction:new J,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new fe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":n={color:new fe,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=n,n}}}function GA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let HA=0;function VA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function kA(r){const t=new FA,n=GA(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)a.probe.push(new J);const l=new J,c=new sn,f=new sn;function h(m){let g=0,_=0,x=0;for(let D=0;D<9;D++)a.probe[D].set(0,0,0);let M=0,E=0,T=0,S=0,v=0,U=0,L=0,w=0,W=0,B=0,O=0;m.sort(VA);for(let D=0,R=m.length;D<R;D++){const F=m[D],$=F.color,it=F.intensity,ut=F.distance,mt=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)g+=$.r*it,_+=$.g*it,x+=$.b*it;else if(F.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(F.sh.coefficients[z],it);O++}else if(F.isDirectionalLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const Q=F.shadow,K=n.get(F);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,a.directionalShadow[M]=K,a.directionalShadowMap[M]=mt,a.directionalShadowMatrix[M]=F.shadow.matrix,U++}a.directional[M]=z,M++}else if(F.isSpotLight){const z=t.get(F);z.position.setFromMatrixPosition(F.matrixWorld),z.color.copy($).multiplyScalar(it),z.distance=ut,z.coneCos=Math.cos(F.angle),z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),z.decay=F.decay,a.spot[T]=z;const Q=F.shadow;if(F.map&&(a.spotLightMap[W]=F.map,W++,Q.updateMatrices(F),F.castShadow&&B++),a.spotLightMatrix[T]=Q.matrix,F.castShadow){const K=n.get(F);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,a.spotShadow[T]=K,a.spotShadowMap[T]=mt,w++}T++}else if(F.isRectAreaLight){const z=t.get(F);z.color.copy($).multiplyScalar(it),z.halfWidth.set(F.width*.5,0,0),z.halfHeight.set(0,F.height*.5,0),a.rectArea[S]=z,S++}else if(F.isPointLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),z.distance=F.distance,z.decay=F.decay,F.castShadow){const Q=F.shadow,K=n.get(F);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,a.pointShadow[E]=K,a.pointShadowMap[E]=mt,a.pointShadowMatrix[E]=F.shadow.matrix,L++}a.point[E]=z,E++}else if(F.isHemisphereLight){const z=t.get(F);z.skyColor.copy(F.color).multiplyScalar(it),z.groundColor.copy(F.groundColor).multiplyScalar(it),a.hemi[v]=z,v++}}S>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Ot.LTC_FLOAT_1,a.rectAreaLTC2=Ot.LTC_FLOAT_2):(a.rectAreaLTC1=Ot.LTC_HALF_1,a.rectAreaLTC2=Ot.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=x;const G=a.hash;(G.directionalLength!==M||G.pointLength!==E||G.spotLength!==T||G.rectAreaLength!==S||G.hemiLength!==v||G.numDirectionalShadows!==U||G.numPointShadows!==L||G.numSpotShadows!==w||G.numSpotMaps!==W||G.numLightProbes!==O)&&(a.directional.length=M,a.spot.length=T,a.rectArea.length=S,a.point.length=E,a.hemi.length=v,a.directionalShadow.length=U,a.directionalShadowMap.length=U,a.pointShadow.length=L,a.pointShadowMap.length=L,a.spotShadow.length=w,a.spotShadowMap.length=w,a.directionalShadowMatrix.length=U,a.pointShadowMatrix.length=L,a.spotLightMatrix.length=w+W-B,a.spotLightMap.length=W,a.numSpotLightShadowsWithMaps=B,a.numLightProbes=O,G.directionalLength=M,G.pointLength=E,G.spotLength=T,G.rectAreaLength=S,G.hemiLength=v,G.numDirectionalShadows=U,G.numPointShadows=L,G.numSpotShadows=w,G.numSpotMaps=W,G.numLightProbes=O,a.version=HA++)}function p(m,g){let _=0,x=0,M=0,E=0,T=0;const S=g.matrixWorldInverse;for(let v=0,U=m.length;v<U;v++){const L=m[v];if(L.isDirectionalLight){const w=a.directional[_];w.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),_++}else if(L.isSpotLight){const w=a.spot[M];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(S),w.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),M++}else if(L.isRectAreaLight){const w=a.rectArea[E];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(S),f.identity(),c.copy(L.matrixWorld),c.premultiply(S),f.extractRotation(c),w.halfWidth.set(L.width*.5,0,0),w.halfHeight.set(0,L.height*.5,0),w.halfWidth.applyMatrix4(f),w.halfHeight.applyMatrix4(f),E++}else if(L.isPointLight){const w=a.point[x];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(S),x++}else if(L.isHemisphereLight){const w=a.hemi[T];w.direction.setFromMatrixPosition(L.matrixWorld),w.direction.transformDirection(S),T++}}}return{setup:h,setupView:p,state:a}}function xv(r){const t=new kA(r),n=[],a=[];function l(g){m.camera=g,n.length=0,a.length=0}function c(g){n.push(g)}function f(g){a.push(g)}function h(){t.setup(n)}function p(g){t.setupView(n,g)}const m={lightsArray:n,shadowsArray:a,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:h,setupLightsView:p,pushLight:c,pushShadow:f}}function XA(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let h;return f===void 0?(h=new xv(r),t.set(l,[h])):c>=f.length?(h=new xv(r),f.push(h)):h=f[c],h}function a(){t=new WeakMap}return{get:n,dispose:a}}class qA extends $r{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=HM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class WA extends $r{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const YA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jA=`uniform sampler2D shadow_pass;
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
}`;function ZA(r,t,n){let a=new dx;const l=new we,c=new we,f=new cn,h=new qA({depthPacking:VM}),p=new WA,m={},g=n.maxTextureSize,_={[cs]:Xn,[Xn]:cs,[xa]:xa},x=new Fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:YA,fragmentShader:jA}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const E=new An;E.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new ln(E,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bv;let v=this.type;this.render=function(B,O,G){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||B.length===0)return;const D=r.getRenderTarget(),R=r.getActiveCubeFace(),F=r.getActiveMipmapLevel(),$=r.state;$.setBlending(Ma),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const it=v!==va&&this.type===va,ut=v===va&&this.type!==va;for(let mt=0,z=B.length;mt<z;mt++){const Q=B[mt],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const St=K.getFrameExtents();if(l.multiply(St),c.copy(K.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/St.x),l.x=c.x*St.x,K.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/St.y),l.y=c.y*St.y,K.mapSize.y=c.y)),K.map===null||it===!0||ut===!0){const P=this.type!==va?{minFilter:Ii,magFilter:Ii}:{};K.map!==null&&K.map.dispose(),K.map=new us(l.x,l.y,P),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}r.setRenderTarget(K.map),r.clear();const Tt=K.getViewportCount();for(let P=0;P<Tt;P++){const st=K.getViewport(P);f.set(c.x*st.x,c.y*st.y,c.x*st.z,c.y*st.w),$.viewport(f),K.updateMatrices(Q,P),a=K.getFrustum(),w(O,G,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===va&&U(K,G),K.needsUpdate=!1}v=this.type,S.needsUpdate=!1,r.setRenderTarget(D,R,F)};function U(B,O){const G=t.update(T);x.defines.VSM_SAMPLES!==B.blurSamples&&(x.defines.VSM_SAMPLES=B.blurSamples,M.defines.VSM_SAMPLES=B.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new us(l.x,l.y)),x.uniforms.shadow_pass.value=B.map.texture,x.uniforms.resolution.value=B.mapSize,x.uniforms.radius.value=B.radius,r.setRenderTarget(B.mapPass),r.clear(),r.renderBufferDirect(O,null,G,x,T,null),M.uniforms.shadow_pass.value=B.mapPass.texture,M.uniforms.resolution.value=B.mapSize,M.uniforms.radius.value=B.radius,r.setRenderTarget(B.map),r.clear(),r.renderBufferDirect(O,null,G,M,T,null)}function L(B,O,G,D){let R=null;const F=G.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(F!==void 0)R=F;else if(R=G.isPointLight===!0?p:h,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const $=R.uuid,it=O.uuid;let ut=m[$];ut===void 0&&(ut={},m[$]=ut);let mt=ut[it];mt===void 0&&(mt=R.clone(),ut[it]=mt,O.addEventListener("dispose",W)),R=mt}if(R.visible=O.visible,R.wireframe=O.wireframe,D===va?R.side=O.shadowSide!==null?O.shadowSide:O.side:R.side=O.shadowSide!==null?O.shadowSide:_[O.side],R.alphaMap=O.alphaMap,R.alphaTest=O.alphaTest,R.map=O.map,R.clipShadows=O.clipShadows,R.clippingPlanes=O.clippingPlanes,R.clipIntersection=O.clipIntersection,R.displacementMap=O.displacementMap,R.displacementScale=O.displacementScale,R.displacementBias=O.displacementBias,R.wireframeLinewidth=O.wireframeLinewidth,R.linewidth=O.linewidth,G.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const $=r.properties.get(R);$.light=G}return R}function w(B,O,G,D,R){if(B.visible===!1)return;if(B.layers.test(O.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&R===va)&&(!B.frustumCulled||a.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,B.matrixWorld);const it=t.update(B),ut=B.material;if(Array.isArray(ut)){const mt=it.groups;for(let z=0,Q=mt.length;z<Q;z++){const K=mt[z],St=ut[K.materialIndex];if(St&&St.visible){const Tt=L(B,St,D,R);B.onBeforeShadow(r,B,O,G,it,Tt,K),r.renderBufferDirect(G,null,it,Tt,B,K),B.onAfterShadow(r,B,O,G,it,Tt,K)}}}else if(ut.visible){const mt=L(B,ut,D,R);B.onBeforeShadow(r,B,O,G,it,mt,null),r.renderBufferDirect(G,null,it,mt,B,null),B.onAfterShadow(r,B,O,G,it,mt,null)}}const $=B.children;for(let it=0,ut=$.length;it<ut;it++)w($[it],O,G,D,R)}function W(B){B.target.removeEventListener("dispose",W);for(const G in m){const D=m[G],R=B.target.uuid;R in D&&(D[R].dispose(),delete D[R])}}}const KA={[yd]:Sd,[Md]:bd,[Ed]:Ad,[Xr]:Td,[Sd]:yd,[bd]:Md,[Ad]:Ed,[Td]:Xr};function QA(r,t){function n(){let V=!1;const wt=new cn;let ct=null;const vt=new cn(0,0,0,0);return{setMask:function(Ct){ct!==Ct&&!V&&(r.colorMask(Ct,Ct,Ct,Ct),ct=Ct)},setLocked:function(Ct){V=Ct},setClear:function(Ct,Nt,ee,Je,_n){_n===!0&&(Ct*=Je,Nt*=Je,ee*=Je),wt.set(Ct,Nt,ee,Je),vt.equals(wt)===!1&&(r.clearColor(Ct,Nt,ee,Je),vt.copy(wt))},reset:function(){V=!1,ct=null,vt.set(-1,0,0,0)}}}function a(){let V=!1,wt=!1,ct=null,vt=null,Ct=null;return{setReversed:function(Nt){if(wt!==Nt){const ee=t.get("EXT_clip_control");wt?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT);const Je=Ct;Ct=null,this.setClear(Je)}wt=Nt},getReversed:function(){return wt},setTest:function(Nt){Nt?xt(r.DEPTH_TEST):Vt(r.DEPTH_TEST)},setMask:function(Nt){ct!==Nt&&!V&&(r.depthMask(Nt),ct=Nt)},setFunc:function(Nt){if(wt&&(Nt=KA[Nt]),vt!==Nt){switch(Nt){case yd:r.depthFunc(r.NEVER);break;case Sd:r.depthFunc(r.ALWAYS);break;case Md:r.depthFunc(r.LESS);break;case Xr:r.depthFunc(r.LEQUAL);break;case Ed:r.depthFunc(r.EQUAL);break;case Td:r.depthFunc(r.GEQUAL);break;case bd:r.depthFunc(r.GREATER);break;case Ad:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}vt=Nt}},setLocked:function(Nt){V=Nt},setClear:function(Nt){Ct!==Nt&&(wt&&(Nt=1-Nt),r.clearDepth(Nt),Ct=Nt)},reset:function(){V=!1,ct=null,vt=null,Ct=null,wt=!1}}}function l(){let V=!1,wt=null,ct=null,vt=null,Ct=null,Nt=null,ee=null,Je=null,_n=null;return{setTest:function(Ae){V||(Ae?xt(r.STENCIL_TEST):Vt(r.STENCIL_TEST))},setMask:function(Ae){wt!==Ae&&!V&&(r.stencilMask(Ae),wt=Ae)},setFunc:function(Ae,Rn,Ri){(ct!==Ae||vt!==Rn||Ct!==Ri)&&(r.stencilFunc(Ae,Rn,Ri),ct=Ae,vt=Rn,Ct=Ri)},setOp:function(Ae,Rn,Ri){(Nt!==Ae||ee!==Rn||Je!==Ri)&&(r.stencilOp(Ae,Rn,Ri),Nt=Ae,ee=Rn,Je=Ri)},setLocked:function(Ae){V=Ae},setClear:function(Ae){_n!==Ae&&(r.clearStencil(Ae),_n=Ae)},reset:function(){V=!1,wt=null,ct=null,vt=null,Ct=null,Nt=null,ee=null,Je=null,_n=null}}}const c=new n,f=new a,h=new l,p=new WeakMap,m=new WeakMap;let g={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,U=null,L=null,w=null,W=null,B=null,O=new fe(0,0,0),G=0,D=!1,R=null,F=null,$=null,it=null,ut=null;const mt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=Q>=2);let St=null,Tt={};const P=r.getParameter(r.SCISSOR_BOX),st=r.getParameter(r.VIEWPORT),yt=new cn().fromArray(P),j=new cn().fromArray(st);function ft(V,wt,ct,vt){const Ct=new Uint8Array(4),Nt=r.createTexture();r.bindTexture(V,Nt),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ee=0;ee<ct;ee++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,vt,0,r.RGBA,r.UNSIGNED_BYTE,Ct):r.texImage2D(wt+ee,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ct);return Nt}const Et={};Et[r.TEXTURE_2D]=ft(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ft(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ft(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ft(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),xt(r.DEPTH_TEST),f.setFunc(Xr),he(!1),ge(T_),xt(r.CULL_FACE),q(Ma);function xt(V){g[V]!==!0&&(r.enable(V),g[V]=!0)}function Vt(V){g[V]!==!1&&(r.disable(V),g[V]=!1)}function Ht(V,wt){return _[V]!==wt?(r.bindFramebuffer(V,wt),_[V]=wt,V===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=wt),V===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function ae(V,wt){let ct=M,vt=!1;if(V){ct=x.get(wt),ct===void 0&&(ct=[],x.set(wt,ct));const Ct=V.textures;if(ct.length!==Ct.length||ct[0]!==r.COLOR_ATTACHMENT0){for(let Nt=0,ee=Ct.length;Nt<ee;Nt++)ct[Nt]=r.COLOR_ATTACHMENT0+Nt;ct.length=Ct.length,vt=!0}}else ct[0]!==r.BACK&&(ct[0]=r.BACK,vt=!0);vt&&r.drawBuffers(ct)}function Fe(V){return E!==V?(r.useProgram(V),E=V,!0):!1}const de={[Bs]:r.FUNC_ADD,[yM]:r.FUNC_SUBTRACT,[SM]:r.FUNC_REVERSE_SUBTRACT};de[MM]=r.MIN,de[EM]=r.MAX;const Qe={[TM]:r.ZERO,[bM]:r.ONE,[AM]:r.SRC_COLOR,[vd]:r.SRC_ALPHA,[LM]:r.SRC_ALPHA_SATURATE,[DM]:r.DST_COLOR,[wM]:r.DST_ALPHA,[RM]:r.ONE_MINUS_SRC_COLOR,[xd]:r.ONE_MINUS_SRC_ALPHA,[UM]:r.ONE_MINUS_DST_COLOR,[CM]:r.ONE_MINUS_DST_ALPHA,[NM]:r.CONSTANT_COLOR,[OM]:r.ONE_MINUS_CONSTANT_COLOR,[PM]:r.CONSTANT_ALPHA,[zM]:r.ONE_MINUS_CONSTANT_ALPHA};function q(V,wt,ct,vt,Ct,Nt,ee,Je,_n,Ae){if(V===Ma){T===!0&&(Vt(r.BLEND),T=!1);return}if(T===!1&&(xt(r.BLEND),T=!0),V!==xM){if(V!==S||Ae!==D){if((v!==Bs||w!==Bs)&&(r.blendEquation(r.FUNC_ADD),v=Bs,w=Bs),Ae)switch(V){case Gr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rl:r.blendFunc(r.ONE,r.ONE);break;case b_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case A_:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Gr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rl:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case b_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case A_:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}U=null,L=null,W=null,B=null,O.set(0,0,0),G=0,S=V,D=Ae}return}Ct=Ct||wt,Nt=Nt||ct,ee=ee||vt,(wt!==v||Ct!==w)&&(r.blendEquationSeparate(de[wt],de[Ct]),v=wt,w=Ct),(ct!==U||vt!==L||Nt!==W||ee!==B)&&(r.blendFuncSeparate(Qe[ct],Qe[vt],Qe[Nt],Qe[ee]),U=ct,L=vt,W=Nt,B=ee),(Je.equals(O)===!1||_n!==G)&&(r.blendColor(Je.r,Je.g,Je.b,_n),O.copy(Je),G=_n),S=V,D=!1}function Pn(V,wt){V.side===xa?Vt(r.CULL_FACE):xt(r.CULL_FACE);let ct=V.side===Xn;wt&&(ct=!ct),he(ct),V.blending===Gr&&V.transparent===!1?q(Ma):q(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),c.setMask(V.colorWrite);const vt=V.stencilWrite;h.setTest(vt),vt&&(h.setMask(V.stencilWriteMask),h.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),h.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Oe(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?xt(r.SAMPLE_ALPHA_TO_COVERAGE):Vt(r.SAMPLE_ALPHA_TO_COVERAGE)}function he(V){R!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),R=V)}function ge(V){V!==gM?(xt(r.CULL_FACE),V!==F&&(V===T_?r.cullFace(r.BACK):V===_M?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Vt(r.CULL_FACE),F=V}function Qt(V){V!==$&&(z&&r.lineWidth(V),$=V)}function Oe(V,wt,ct){V?(xt(r.POLYGON_OFFSET_FILL),(it!==wt||ut!==ct)&&(r.polygonOffset(wt,ct),it=wt,ut=ct)):Vt(r.POLYGON_OFFSET_FILL)}function Zt(V){V?xt(r.SCISSOR_TEST):Vt(r.SCISSOR_TEST)}function N(V){V===void 0&&(V=r.TEXTURE0+mt-1),St!==V&&(r.activeTexture(V),St=V)}function A(V,wt,ct){ct===void 0&&(St===null?ct=r.TEXTURE0+mt-1:ct=St);let vt=Tt[ct];vt===void 0&&(vt={type:void 0,texture:void 0},Tt[ct]=vt),(vt.type!==V||vt.texture!==wt)&&(St!==ct&&(r.activeTexture(ct),St=ct),r.bindTexture(V,wt||Et[V]),vt.type=V,vt.texture=wt)}function at(){const V=Tt[St];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function dt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Mt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Wt(){try{r.texSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function _e(){try{r.texStorage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Rt(){try{r.texStorage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Yt(V){yt.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),yt.copy(V))}function Pt(V){j.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),j.copy(V))}function te(V,wt){let ct=m.get(wt);ct===void 0&&(ct=new WeakMap,m.set(wt,ct));let vt=ct.get(V);vt===void 0&&(vt=r.getUniformBlockIndex(wt,V.name),ct.set(V,vt))}function re(V,wt){const vt=m.get(wt).get(V);p.get(wt)!==vt&&(r.uniformBlockBinding(wt,vt,V.__bindingPointIndex),p.set(wt,vt))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},St=null,Tt={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,U=null,L=null,w=null,W=null,B=null,O=new fe(0,0,0),G=0,D=!1,R=null,F=null,$=null,it=null,ut=null,yt.set(0,0,r.canvas.width,r.canvas.height),j.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:xt,disable:Vt,bindFramebuffer:Ht,drawBuffers:ae,useProgram:Fe,setBlending:q,setMaterial:Pn,setFlipSided:he,setCullFace:ge,setLineWidth:Qt,setPolygonOffset:Oe,setScissorTest:Zt,activeTexture:N,bindTexture:A,unbindTexture:at,compressedTexImage2D:dt,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Kt,updateUBOMapping:te,uniformBlockBinding:re,texStorage2D:_e,texStorage3D:Rt,texSubImage2D:gt,texSubImage3D:Wt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:zt,scissor:Yt,viewport:Pt,reset:Ge}}function yv(r,t,n,a){const l=JA(a);switch(n){case Zv:return r*t;case Qv:return r*t;case Jv:return r*t*2;case $v:return r*t/l.components*l.byteLength;case hp:return r*t/l.components*l.byteLength;case tx:return r*t*2/l.components*l.byteLength;case dp:return r*t*2/l.components*l.byteLength;case Kv:return r*t*3/l.components*l.byteLength;case Bi:return r*t*4/l.components*l.byteLength;case pp:return r*t*4/l.components*l.byteLength;case $c:case tu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case eu:case nu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ld:case Od:return Math.max(r,16)*Math.max(t,8)/4;case Ud:case Nd:return Math.max(r,8)*Math.max(t,8)/2;case Pd:case zd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Bd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Id:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Fd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Gd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Vd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case kd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Xd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case qd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Wd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Yd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case jd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Zd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Kd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Qd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case iu:case Jd:case $d:return Math.ceil(r/4)*Math.ceil(t/4)*16;case ex:case tp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case ep:case np:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function JA(r){switch(r){case Ta:case Wv:return{byteLength:1,components:1};case ll:case Yv:case Kr:return{byteLength:2,components:1};case up:case fp:return{byteLength:2,components:4};case Vs:case cp:case ya:return{byteLength:4,components:1};case jv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function $A(r,t,n,a,l,c,f){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new we,g=new WeakMap;let _;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,A){return M?new OffscreenCanvas(N,A):ou("canvas")}function T(N,A,at){let dt=1;const Mt=Zt(N);if((Mt.width>at||Mt.height>at)&&(dt=at/Math.max(Mt.width,Mt.height)),dt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const gt=Math.floor(dt*Mt.width),Wt=Math.floor(dt*Mt.height);_===void 0&&(_=E(gt,Wt));const Lt=A?E(gt,Wt):_;return Lt.width=gt,Lt.height=Wt,Lt.getContext("2d").drawImage(N,0,0,gt,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+gt+"x"+Wt+")."),Lt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),N;return N}function S(N){return N.generateMipmaps}function v(N){r.generateMipmap(N)}function U(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function L(N,A,at,dt,Mt=!1){if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt=A;if(A===r.RED&&(at===r.FLOAT&&(gt=r.R32F),at===r.HALF_FLOAT&&(gt=r.R16F),at===r.UNSIGNED_BYTE&&(gt=r.R8)),A===r.RED_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.R8UI),at===r.UNSIGNED_SHORT&&(gt=r.R16UI),at===r.UNSIGNED_INT&&(gt=r.R32UI),at===r.BYTE&&(gt=r.R8I),at===r.SHORT&&(gt=r.R16I),at===r.INT&&(gt=r.R32I)),A===r.RG&&(at===r.FLOAT&&(gt=r.RG32F),at===r.HALF_FLOAT&&(gt=r.RG16F),at===r.UNSIGNED_BYTE&&(gt=r.RG8)),A===r.RG_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RG8UI),at===r.UNSIGNED_SHORT&&(gt=r.RG16UI),at===r.UNSIGNED_INT&&(gt=r.RG32UI),at===r.BYTE&&(gt=r.RG8I),at===r.SHORT&&(gt=r.RG16I),at===r.INT&&(gt=r.RG32I)),A===r.RGB_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),at===r.UNSIGNED_INT&&(gt=r.RGB32UI),at===r.BYTE&&(gt=r.RGB8I),at===r.SHORT&&(gt=r.RGB16I),at===r.INT&&(gt=r.RGB32I)),A===r.RGBA_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),at===r.UNSIGNED_INT&&(gt=r.RGBA32UI),at===r.BYTE&&(gt=r.RGBA8I),at===r.SHORT&&(gt=r.RGBA16I),at===r.INT&&(gt=r.RGBA32I)),A===r.RGB&&at===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),A===r.RGBA){const Wt=Mt?du:be.getTransfer(dt);at===r.FLOAT&&(gt=r.RGBA32F),at===r.HALF_FLOAT&&(gt=r.RGBA16F),at===r.UNSIGNED_BYTE&&(gt=Wt===Ie?r.SRGB8_ALPHA8:r.RGBA8),at===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),at===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function w(N,A){let at;return N?A===null||A===Vs||A===Yr?at=r.DEPTH24_STENCIL8:A===ya?at=r.DEPTH32F_STENCIL8:A===ll&&(at=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Vs||A===Yr?at=r.DEPTH_COMPONENT24:A===ya?at=r.DEPTH_COMPONENT32F:A===ll&&(at=r.DEPTH_COMPONENT16),at}function W(N,A){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ii&&N.minFilter!==Yi?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function B(N){const A=N.target;A.removeEventListener("dispose",B),G(A),A.isVideoTexture&&g.delete(A)}function O(N){const A=N.target;A.removeEventListener("dispose",O),R(A)}function G(N){const A=a.get(N);if(A.__webglInit===void 0)return;const at=N.source,dt=x.get(at);if(dt){const Mt=dt[A.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&D(N),Object.keys(dt).length===0&&x.delete(at)}a.remove(N)}function D(N){const A=a.get(N);r.deleteTexture(A.__webglTexture);const at=N.source,dt=x.get(at);delete dt[A.__cacheKey],f.memory.textures--}function R(N){const A=a.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),a.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(A.__webglFramebuffer[dt]))for(let Mt=0;Mt<A.__webglFramebuffer[dt].length;Mt++)r.deleteFramebuffer(A.__webglFramebuffer[dt][Mt]);else r.deleteFramebuffer(A.__webglFramebuffer[dt]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[dt])}else{if(Array.isArray(A.__webglFramebuffer))for(let dt=0;dt<A.__webglFramebuffer.length;dt++)r.deleteFramebuffer(A.__webglFramebuffer[dt]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let dt=0;dt<A.__webglColorRenderbuffer.length;dt++)A.__webglColorRenderbuffer[dt]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[dt]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const at=N.textures;for(let dt=0,Mt=at.length;dt<Mt;dt++){const gt=a.get(at[dt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),a.remove(at[dt])}a.remove(N)}let F=0;function $(){F=0}function it(){const N=F;return N>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),F+=1,N}function ut(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function mt(N,A){const at=a.get(N);if(N.isVideoTexture&&Qt(N),N.isRenderTargetTexture===!1&&N.version>0&&at.__version!==N.version){const dt=N.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(at,N,A);return}}n.bindTexture(r.TEXTURE_2D,at.__webglTexture,r.TEXTURE0+A)}function z(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){j(at,N,A);return}n.bindTexture(r.TEXTURE_2D_ARRAY,at.__webglTexture,r.TEXTURE0+A)}function Q(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){j(at,N,A);return}n.bindTexture(r.TEXTURE_3D,at.__webglTexture,r.TEXTURE0+A)}function K(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){ft(at,N,A);return}n.bindTexture(r.TEXTURE_CUBE_MAP,at.__webglTexture,r.TEXTURE0+A)}const St={[Cd]:r.REPEAT,[Fs]:r.CLAMP_TO_EDGE,[Dd]:r.MIRRORED_REPEAT},Tt={[Ii]:r.NEAREST,[GM]:r.NEAREST_MIPMAP_NEAREST,[Ac]:r.NEAREST_MIPMAP_LINEAR,[Yi]:r.LINEAR,[Ph]:r.LINEAR_MIPMAP_NEAREST,[Gs]:r.LINEAR_MIPMAP_LINEAR},P={[qM]:r.NEVER,[QM]:r.ALWAYS,[WM]:r.LESS,[nx]:r.LEQUAL,[YM]:r.EQUAL,[KM]:r.GEQUAL,[jM]:r.GREATER,[ZM]:r.NOTEQUAL};function st(N,A){if(A.type===ya&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===Yi||A.magFilter===Ph||A.magFilter===Ac||A.magFilter===Gs||A.minFilter===Yi||A.minFilter===Ph||A.minFilter===Ac||A.minFilter===Gs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,St[A.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,St[A.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,St[A.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Tt[A.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Tt[A.minFilter]),A.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,P[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Ii||A.minFilter!==Ac&&A.minFilter!==Gs||A.type===ya&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||a.get(A).__currentAnisotropy){const at=t.get("EXT_texture_filter_anisotropic");r.texParameterf(N,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),a.get(A).__currentAnisotropy=A.anisotropy}}}function yt(N,A){let at=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",B));const dt=A.source;let Mt=x.get(dt);Mt===void 0&&(Mt={},x.set(dt,Mt));const gt=ut(A);if(gt!==N.__cacheKey){Mt[gt]===void 0&&(Mt[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,at=!0),Mt[gt].usedTimes++;const Wt=Mt[N.__cacheKey];Wt!==void 0&&(Mt[N.__cacheKey].usedTimes--,Wt.usedTimes===0&&D(A)),N.__cacheKey=gt,N.__webglTexture=Mt[gt].texture}return at}function j(N,A,at){let dt=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(dt=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(dt=r.TEXTURE_3D);const Mt=yt(N,A),gt=A.source;n.bindTexture(dt,N.__webglTexture,r.TEXTURE0+at);const Wt=a.get(gt);if(gt.version!==Wt.__version||Mt===!0){n.activeTexture(r.TEXTURE0+at);const Lt=be.getPrimaries(be.workingColorSpace),zt=A.colorSpace===rs?null:be.getPrimaries(A.colorSpace),_e=A.colorSpace===rs||Lt===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Rt=T(A.image,!1,l.maxTextureSize);Rt=Oe(A,Rt);const Bt=c.convert(A.format,A.colorSpace),Kt=c.convert(A.type);let Yt=L(A.internalFormat,Bt,Kt,A.colorSpace,A.isVideoTexture);st(dt,A);let Pt;const te=A.mipmaps,re=A.isVideoTexture!==!0,Ge=Wt.__version===void 0||Mt===!0,V=gt.dataReady,wt=W(A,Rt);if(A.isDepthTexture)Yt=w(A.format===jr,A.type),Ge&&(re?n.texStorage2D(r.TEXTURE_2D,1,Yt,Rt.width,Rt.height):n.texImage2D(r.TEXTURE_2D,0,Yt,Rt.width,Rt.height,0,Bt,Kt,null));else if(A.isDataTexture)if(te.length>0){re&&Ge&&n.texStorage2D(r.TEXTURE_2D,wt,Yt,te[0].width,te[0].height);for(let ct=0,vt=te.length;ct<vt;ct++)Pt=te[ct],re?V&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,Bt,Kt,Pt.data):n.texImage2D(r.TEXTURE_2D,ct,Yt,Pt.width,Pt.height,0,Bt,Kt,Pt.data);A.generateMipmaps=!1}else re?(Ge&&n.texStorage2D(r.TEXTURE_2D,wt,Yt,Rt.width,Rt.height),V&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Rt.width,Rt.height,Bt,Kt,Rt.data)):n.texImage2D(r.TEXTURE_2D,0,Yt,Rt.width,Rt.height,0,Bt,Kt,Rt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){re&&Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Yt,te[0].width,te[0].height,Rt.depth);for(let ct=0,vt=te.length;ct<vt;ct++)if(Pt=te[ct],A.format!==Bi)if(Bt!==null)if(re){if(V)if(A.layerUpdates.size>0){const Ct=yv(Pt.width,Pt.height,A.format,A.type);for(const Nt of A.layerUpdates){const ee=Pt.data.subarray(Nt*Ct/Pt.data.BYTES_PER_ELEMENT,(Nt+1)*Ct/Pt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,Nt,Pt.width,Pt.height,1,Bt,ee)}A.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Pt.width,Pt.height,Rt.depth,Bt,Pt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ct,Yt,Pt.width,Pt.height,Rt.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?V&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Pt.width,Pt.height,Rt.depth,Bt,Kt,Pt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,ct,Yt,Pt.width,Pt.height,Rt.depth,0,Bt,Kt,Pt.data)}else{re&&Ge&&n.texStorage2D(r.TEXTURE_2D,wt,Yt,te[0].width,te[0].height);for(let ct=0,vt=te.length;ct<vt;ct++)Pt=te[ct],A.format!==Bi?Bt!==null?re?V&&n.compressedTexSubImage2D(r.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,Bt,Pt.data):n.compressedTexImage2D(r.TEXTURE_2D,ct,Yt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?V&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Pt.width,Pt.height,Bt,Kt,Pt.data):n.texImage2D(r.TEXTURE_2D,ct,Yt,Pt.width,Pt.height,0,Bt,Kt,Pt.data)}else if(A.isDataArrayTexture)if(re){if(Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Yt,Rt.width,Rt.height,Rt.depth),V)if(A.layerUpdates.size>0){const ct=yv(Rt.width,Rt.height,A.format,A.type);for(const vt of A.layerUpdates){const Ct=Rt.data.subarray(vt*ct/Rt.data.BYTES_PER_ELEMENT,(vt+1)*ct/Rt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,vt,Rt.width,Rt.height,1,Bt,Kt,Ct)}A.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Rt.width,Rt.height,Rt.depth,Bt,Kt,Rt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Yt,Rt.width,Rt.height,Rt.depth,0,Bt,Kt,Rt.data);else if(A.isData3DTexture)re?(Ge&&n.texStorage3D(r.TEXTURE_3D,wt,Yt,Rt.width,Rt.height,Rt.depth),V&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Rt.width,Rt.height,Rt.depth,Bt,Kt,Rt.data)):n.texImage3D(r.TEXTURE_3D,0,Yt,Rt.width,Rt.height,Rt.depth,0,Bt,Kt,Rt.data);else if(A.isFramebufferTexture){if(Ge)if(re)n.texStorage2D(r.TEXTURE_2D,wt,Yt,Rt.width,Rt.height);else{let ct=Rt.width,vt=Rt.height;for(let Ct=0;Ct<wt;Ct++)n.texImage2D(r.TEXTURE_2D,Ct,Yt,ct,vt,0,Bt,Kt,null),ct>>=1,vt>>=1}}else if(te.length>0){if(re&&Ge){const ct=Zt(te[0]);n.texStorage2D(r.TEXTURE_2D,wt,Yt,ct.width,ct.height)}for(let ct=0,vt=te.length;ct<vt;ct++)Pt=te[ct],re?V&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Bt,Kt,Pt):n.texImage2D(r.TEXTURE_2D,ct,Yt,Bt,Kt,Pt);A.generateMipmaps=!1}else if(re){if(Ge){const ct=Zt(Rt);n.texStorage2D(r.TEXTURE_2D,wt,Yt,ct.width,ct.height)}V&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Kt,Rt)}else n.texImage2D(r.TEXTURE_2D,0,Yt,Bt,Kt,Rt);S(A)&&v(dt),Wt.__version=gt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function ft(N,A,at){if(A.image.length!==6)return;const dt=yt(N,A),Mt=A.source;n.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+at);const gt=a.get(Mt);if(Mt.version!==gt.__version||dt===!0){n.activeTexture(r.TEXTURE0+at);const Wt=be.getPrimaries(be.workingColorSpace),Lt=A.colorSpace===rs?null:be.getPrimaries(A.colorSpace),zt=A.colorSpace===rs||Wt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const _e=A.isCompressedTexture||A.image[0].isCompressedTexture,Rt=A.image[0]&&A.image[0].isDataTexture,Bt=[];for(let vt=0;vt<6;vt++)!_e&&!Rt?Bt[vt]=T(A.image[vt],!0,l.maxCubemapSize):Bt[vt]=Rt?A.image[vt].image:A.image[vt],Bt[vt]=Oe(A,Bt[vt]);const Kt=Bt[0],Yt=c.convert(A.format,A.colorSpace),Pt=c.convert(A.type),te=L(A.internalFormat,Yt,Pt,A.colorSpace),re=A.isVideoTexture!==!0,Ge=gt.__version===void 0||dt===!0,V=Mt.dataReady;let wt=W(A,Kt);st(r.TEXTURE_CUBE_MAP,A);let ct;if(_e){re&&Ge&&n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,Kt.width,Kt.height);for(let vt=0;vt<6;vt++){ct=Bt[vt].mipmaps;for(let Ct=0;Ct<ct.length;Ct++){const Nt=ct[Ct];A.format!==Bi?Yt!==null?re?V&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Nt.width,Nt.height,Yt,Nt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,te,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Nt.width,Nt.height,Yt,Pt,Nt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,te,Nt.width,Nt.height,0,Yt,Pt,Nt.data)}}}else{if(ct=A.mipmaps,re&&Ge){ct.length>0&&wt++;const vt=Zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(Rt){re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt[vt].width,Bt[vt].height,Yt,Pt,Bt[vt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Bt[vt].width,Bt[vt].height,0,Yt,Pt,Bt[vt].data);for(let Ct=0;Ct<ct.length;Ct++){const ee=ct[Ct].image[vt].image;re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,ee.width,ee.height,Yt,Pt,ee.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,te,ee.width,ee.height,0,Yt,Pt,ee.data)}}else{re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Yt,Pt,Bt[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Yt,Pt,Bt[vt]);for(let Ct=0;Ct<ct.length;Ct++){const Nt=ct[Ct];re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,Yt,Pt,Nt.image[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,te,Yt,Pt,Nt.image[vt])}}}S(A)&&v(r.TEXTURE_CUBE_MAP),gt.__version=Mt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Et(N,A,at,dt,Mt,gt){const Wt=c.convert(at.format,at.colorSpace),Lt=c.convert(at.type),zt=L(at.internalFormat,Wt,Lt,at.colorSpace),_e=a.get(A),Rt=a.get(at);if(Rt.__renderTarget=A,!_e.__hasExternalTextures){const Bt=Math.max(1,A.width>>gt),Kt=Math.max(1,A.height>>gt);Mt===r.TEXTURE_3D||Mt===r.TEXTURE_2D_ARRAY?n.texImage3D(Mt,gt,zt,Bt,Kt,A.depth,0,Wt,Lt,null):n.texImage2D(Mt,gt,zt,Bt,Kt,0,Wt,Lt,null)}n.bindFramebuffer(r.FRAMEBUFFER,N),ge(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,Mt,Rt.__webglTexture,0,he(A)):(Mt===r.TEXTURE_2D||Mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,dt,Mt,Rt.__webglTexture,gt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function xt(N,A,at){if(r.bindRenderbuffer(r.RENDERBUFFER,N),A.depthBuffer){const dt=A.depthTexture,Mt=dt&&dt.isDepthTexture?dt.type:null,gt=w(A.stencilBuffer,Mt),Wt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=he(A);ge(A)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt,gt,A.width,A.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,gt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,gt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,N)}else{const dt=A.textures;for(let Mt=0;Mt<dt.length;Mt++){const gt=dt[Mt],Wt=c.convert(gt.format,gt.colorSpace),Lt=c.convert(gt.type),zt=L(gt.internalFormat,Wt,Lt,gt.colorSpace),_e=he(A);at&&ge(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,zt,A.width,A.height):ge(A)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,zt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,zt,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Vt(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=a.get(A.depthTexture);dt.__renderTarget=A,(!dt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),mt(A.depthTexture,0);const Mt=dt.__webglTexture,gt=he(A);if(A.depthTexture.format===Hr)ge(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0);else if(A.depthTexture.format===jr)ge(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Ht(N){const A=a.get(N),at=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const dt=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),dt){const Mt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,dt.removeEventListener("dispose",Mt)};dt.addEventListener("dispose",Mt),A.__depthDisposeCallback=Mt}A.__boundDepthTexture=dt}if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(at)throw new Error("target.depthTexture not supported in Cube render targets");Vt(A.__webglFramebuffer,N)}else if(at){A.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[dt]),A.__webglDepthbuffer[dt]===void 0)A.__webglDepthbuffer[dt]=r.createRenderbuffer(),xt(A.__webglDepthbuffer[dt],N,!1);else{const Mt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=A.__webglDepthbuffer[dt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,gt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),xt(A.__webglDepthbuffer,N,!1);else{const dt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,Mt)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function ae(N,A,at){const dt=a.get(N);A!==void 0&&Et(dt.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),at!==void 0&&Ht(N)}function Fe(N){const A=N.texture,at=a.get(N),dt=a.get(A);N.addEventListener("dispose",O);const Mt=N.textures,gt=N.isWebGLCubeRenderTarget===!0,Wt=Mt.length>1;if(Wt||(dt.__webglTexture===void 0&&(dt.__webglTexture=r.createTexture()),dt.__version=A.version,f.memory.textures++),gt){at.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer[Lt]=[];for(let zt=0;zt<A.mipmaps.length;zt++)at.__webglFramebuffer[Lt][zt]=r.createFramebuffer()}else at.__webglFramebuffer[Lt]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer=[];for(let Lt=0;Lt<A.mipmaps.length;Lt++)at.__webglFramebuffer[Lt]=r.createFramebuffer()}else at.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let Lt=0,zt=Mt.length;Lt<zt;Lt++){const _e=a.get(Mt[Lt]);_e.__webglTexture===void 0&&(_e.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&ge(N)===!1){at.__webglMultisampledFramebuffer=r.createFramebuffer(),at.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let Lt=0;Lt<Mt.length;Lt++){const zt=Mt[Lt];at.__webglColorRenderbuffer[Lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,at.__webglColorRenderbuffer[Lt]);const _e=c.convert(zt.format,zt.colorSpace),Rt=c.convert(zt.type),Bt=L(zt.internalFormat,_e,Rt,zt.colorSpace,N.isXRRenderTarget===!0),Kt=he(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,Bt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Lt,r.RENDERBUFFER,at.__webglColorRenderbuffer[Lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(at.__webglDepthRenderbuffer=r.createRenderbuffer(),xt(at.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){n.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),st(r.TEXTURE_CUBE_MAP,A);for(let Lt=0;Lt<6;Lt++)if(A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(at.__webglFramebuffer[Lt][zt],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,zt);else Et(at.__webglFramebuffer[Lt],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);S(A)&&v(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Wt){for(let Lt=0,zt=Mt.length;Lt<zt;Lt++){const _e=Mt[Lt],Rt=a.get(_e);n.bindTexture(r.TEXTURE_2D,Rt.__webglTexture),st(r.TEXTURE_2D,_e),Et(at.__webglFramebuffer,N,_e,r.COLOR_ATTACHMENT0+Lt,r.TEXTURE_2D,0),S(_e)&&v(r.TEXTURE_2D)}n.unbindTexture()}else{let Lt=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Lt=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Lt,dt.__webglTexture),st(Lt,A),A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(at.__webglFramebuffer[zt],N,A,r.COLOR_ATTACHMENT0,Lt,zt);else Et(at.__webglFramebuffer,N,A,r.COLOR_ATTACHMENT0,Lt,0);S(A)&&v(Lt),n.unbindTexture()}N.depthBuffer&&Ht(N)}function de(N){const A=N.textures;for(let at=0,dt=A.length;at<dt;at++){const Mt=A[at];if(S(Mt)){const gt=U(N),Wt=a.get(Mt).__webglTexture;n.bindTexture(gt,Wt),v(gt),n.unbindTexture()}}}const Qe=[],q=[];function Pn(N){if(N.samples>0){if(ge(N)===!1){const A=N.textures,at=N.width,dt=N.height;let Mt=r.COLOR_BUFFER_BIT;const gt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=a.get(N),Lt=A.length>1;if(Lt)for(let zt=0;zt<A.length;zt++)n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let zt=0;zt<A.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Mt|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Mt|=r.STENCIL_BUFFER_BIT)),Lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const _e=a.get(A[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,_e,0)}r.blitFramebuffer(0,0,at,dt,0,0,at,dt,Mt,r.NEAREST),p===!0&&(Qe.length=0,q.length=0,Qe.push(r.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Qe.push(gt),q.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,q)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Qe))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Lt)for(let zt=0;zt<A.length;zt++){n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const _e=a.get(A[zt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,_e,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&p){const A=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function he(N){return Math.min(l.maxSamples,N.samples)}function ge(N){const A=a.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Qt(N){const A=f.render.frame;g.get(N)!==A&&(g.set(N,A),N.update())}function Oe(N,A){const at=N.colorSpace,dt=N.format,Mt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||at!==Qr&&at!==rs&&(be.getTransfer(at)===Ie?(dt!==Bi||Mt!==Ta)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",at)),A}function Zt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(m.width=N.naturalWidth||N.width,m.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(m.width=N.displayWidth,m.height=N.displayHeight):(m.width=N.width,m.height=N.height),m}this.allocateTextureUnit=it,this.resetTextureUnits=$,this.setTexture2D=mt,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=K,this.rebindTextures=ae,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=Pn,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ge}function t2(r,t){function n(a,l=rs){let c;const f=be.getTransfer(l);if(a===Ta)return r.UNSIGNED_BYTE;if(a===up)return r.UNSIGNED_SHORT_4_4_4_4;if(a===fp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===jv)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===Wv)return r.BYTE;if(a===Yv)return r.SHORT;if(a===ll)return r.UNSIGNED_SHORT;if(a===cp)return r.INT;if(a===Vs)return r.UNSIGNED_INT;if(a===ya)return r.FLOAT;if(a===Kr)return r.HALF_FLOAT;if(a===Zv)return r.ALPHA;if(a===Kv)return r.RGB;if(a===Bi)return r.RGBA;if(a===Qv)return r.LUMINANCE;if(a===Jv)return r.LUMINANCE_ALPHA;if(a===Hr)return r.DEPTH_COMPONENT;if(a===jr)return r.DEPTH_STENCIL;if(a===$v)return r.RED;if(a===hp)return r.RED_INTEGER;if(a===tx)return r.RG;if(a===dp)return r.RG_INTEGER;if(a===pp)return r.RGBA_INTEGER;if(a===$c||a===tu||a===eu||a===nu)if(f===Ie)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===$c)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===tu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===eu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===$c)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===tu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===eu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===nu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Ud||a===Ld||a===Nd||a===Od)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Ud)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Ld)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Nd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Od)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Pd||a===zd||a===Bd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Pd||a===zd)return f===Ie?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Bd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Id||a===Fd||a===Gd||a===Hd||a===Vd||a===kd||a===Xd||a===qd||a===Wd||a===Yd||a===jd||a===Zd||a===Kd||a===Qd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Id)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Fd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Gd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Hd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Vd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===kd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Xd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===qd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Wd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Yd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===jd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Zd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Kd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Qd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===iu||a===Jd||a===$d)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===iu)return f===Ie?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Jd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===$d)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===ex||a===tp||a===ep||a===np)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===iu)return c.COMPRESSED_RED_RGTC1_EXT;if(a===tp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===ep)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===np)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Yr?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}class e2 extends bi{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class os extends qn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const n2={type:"move"};class ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let l=null,c=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(m&&t.hand){f=!0;for(const T of t.hand.values()){const S=n.getJointPose(T,a),v=this._getHandJoint(m,T);S!==null&&(v.matrix.fromArray(S.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=S.radius),v.visible=S!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],x=g.position.distanceTo(_.position),M=.02,E=.005;m.inputState.pinching&&x>M+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&x<=M-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(l=n.getPose(t.targetRaySpace,a),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(n2)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new os;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const i2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,a2=`
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

}`;class s2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,a){if(this.texture===null){const l=new ei,c=t.properties.get(l);c.__webglTexture=n.texture,(n.depthNear!=a.depthNear||n.depthFar!=a.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Fi({vertexShader:i2,fragmentShader:a2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ln(new pu(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class r2 extends Jr{constructor(t,n){super();const a=this;let l=null,c=1,f=null,h="local-floor",p=1,m=null,g=null,_=null,x=null,M=null,E=null;const T=new s2,S=n.getContextAttributes();let v=null,U=null;const L=[],w=[],W=new we;let B=null;const O=new bi;O.viewport=new cn;const G=new bi;G.viewport=new cn;const D=[O,G],R=new e2;let F=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ft=L[j];return ft===void 0&&(ft=new ud,L[j]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(j){let ft=L[j];return ft===void 0&&(ft=new ud,L[j]=ft),ft.getGripSpace()},this.getHand=function(j){let ft=L[j];return ft===void 0&&(ft=new ud,L[j]=ft),ft.getHandSpace()};function it(j){const ft=w.indexOf(j.inputSource);if(ft===-1)return;const Et=L[ft];Et!==void 0&&(Et.update(j.inputSource,j.frame,m||f),Et.dispatchEvent({type:j.type,data:j.inputSource}))}function ut(){l.removeEventListener("select",it),l.removeEventListener("selectstart",it),l.removeEventListener("selectend",it),l.removeEventListener("squeeze",it),l.removeEventListener("squeezestart",it),l.removeEventListener("squeezeend",it),l.removeEventListener("end",ut),l.removeEventListener("inputsourceschange",mt);for(let j=0;j<L.length;j++){const ft=w[j];ft!==null&&(w[j]=null,L[j].disconnect(ft))}F=null,$=null,T.reset(),t.setRenderTarget(v),M=null,x=null,_=null,l=null,U=null,yt.stop(),a.isPresenting=!1,t.setPixelRatio(B),t.setSize(W.width,W.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){c=j,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){h=j,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(j){m=j},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(j){if(l=j,l!==null){if(v=t.getRenderTarget(),l.addEventListener("select",it),l.addEventListener("selectstart",it),l.addEventListener("selectend",it),l.addEventListener("squeeze",it),l.addEventListener("squeezestart",it),l.addEventListener("squeezeend",it),l.addEventListener("end",ut),l.addEventListener("inputsourceschange",mt),S.xrCompatible!==!0&&await n.makeXRCompatible(),B=t.getPixelRatio(),t.getSize(W),l.renderState.layers===void 0){const ft={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,ft),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),U=new us(M.framebufferWidth,M.framebufferHeight,{format:Bi,type:Ta,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let ft=null,Et=null,xt=null;S.depth&&(xt=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ft=S.stencil?jr:Hr,Et=S.stencil?Yr:Vs);const Vt={colorFormat:n.RGBA8,depthFormat:xt,scaleFactor:c};_=new XRWebGLBinding(l,n),x=_.createProjectionLayer(Vt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),U=new us(x.textureWidth,x.textureHeight,{format:Bi,type:Ta,depthTexture:new gx(x.textureWidth,x.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(h),yt.setContext(l),yt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function mt(j){for(let ft=0;ft<j.removed.length;ft++){const Et=j.removed[ft],xt=w.indexOf(Et);xt>=0&&(w[xt]=null,L[xt].disconnect(Et))}for(let ft=0;ft<j.added.length;ft++){const Et=j.added[ft];let xt=w.indexOf(Et);if(xt===-1){for(let Ht=0;Ht<L.length;Ht++)if(Ht>=w.length){w.push(Et),xt=Ht;break}else if(w[Ht]===null){w[Ht]=Et,xt=Ht;break}if(xt===-1)break}const Vt=L[xt];Vt&&Vt.connect(Et)}}const z=new J,Q=new J;function K(j,ft,Et){z.setFromMatrixPosition(ft.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const xt=z.distanceTo(Q),Vt=ft.projectionMatrix.elements,Ht=Et.projectionMatrix.elements,ae=Vt[14]/(Vt[10]-1),Fe=Vt[14]/(Vt[10]+1),de=(Vt[9]+1)/Vt[5],Qe=(Vt[9]-1)/Vt[5],q=(Vt[8]-1)/Vt[0],Pn=(Ht[8]+1)/Ht[0],he=ae*q,ge=ae*Pn,Qt=xt/(-q+Pn),Oe=Qt*-q;if(ft.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Oe),j.translateZ(Qt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Vt[10]===-1)j.projectionMatrix.copy(ft.projectionMatrix),j.projectionMatrixInverse.copy(ft.projectionMatrixInverse);else{const Zt=ae+Qt,N=Fe+Qt,A=he-Oe,at=ge+(xt-Oe),dt=de*Fe/N*Zt,Mt=Qe*Fe/N*Zt;j.projectionMatrix.makePerspective(A,at,dt,Mt,Zt,N),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function St(j,ft){ft===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ft.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(l===null)return;let ft=j.near,Et=j.far;T.texture!==null&&(T.depthNear>0&&(ft=T.depthNear),T.depthFar>0&&(Et=T.depthFar)),R.near=G.near=O.near=ft,R.far=G.far=O.far=Et,(F!==R.near||$!==R.far)&&(l.updateRenderState({depthNear:R.near,depthFar:R.far}),F=R.near,$=R.far),O.layers.mask=j.layers.mask|2,G.layers.mask=j.layers.mask|4,R.layers.mask=O.layers.mask|G.layers.mask;const xt=j.parent,Vt=R.cameras;St(R,xt);for(let Ht=0;Ht<Vt.length;Ht++)St(Vt[Ht],xt);Vt.length===2?K(R,O,G):R.projectionMatrix.copy(O.projectionMatrix),Tt(j,R,xt)};function Tt(j,ft,Et){Et===null?j.matrix.copy(ft.matrixWorld):(j.matrix.copy(Et.matrixWorld),j.matrix.invert(),j.matrix.multiply(ft.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ft.projectionMatrix),j.projectionMatrixInverse.copy(ft.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ip*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&M===null))return p},this.setFoveation=function(j){p=j,x!==null&&(x.fixedFoveation=j),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=j)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(R)};let P=null;function st(j,ft){if(g=ft.getViewerPose(m||f),E=ft,g!==null){const Et=g.views;M!==null&&(t.setRenderTargetFramebuffer(U,M.framebuffer),t.setRenderTarget(U));let xt=!1;Et.length!==R.cameras.length&&(R.cameras.length=0,xt=!0);for(let Ht=0;Ht<Et.length;Ht++){const ae=Et[Ht];let Fe=null;if(M!==null)Fe=M.getViewport(ae);else{const Qe=_.getViewSubImage(x,ae);Fe=Qe.viewport,Ht===0&&(t.setRenderTargetTextures(U,Qe.colorTexture,x.ignoreDepthValues?void 0:Qe.depthStencilTexture),t.setRenderTarget(U))}let de=D[Ht];de===void 0&&(de=new bi,de.layers.enable(Ht),de.viewport=new cn,D[Ht]=de),de.matrix.fromArray(ae.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(ae.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Ht===0&&(R.matrix.copy(de.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),xt===!0&&R.cameras.push(de)}const Vt=l.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const Ht=_.getDepthInformation(Et[0]);Ht&&Ht.isValid&&Ht.texture&&T.init(t,Ht,l.renderState)}}for(let Et=0;Et<L.length;Et++){const xt=w[Et],Vt=L[Et];xt!==null&&Vt!==void 0&&Vt.update(xt,ft,m||f)}P&&P(j,ft),ft.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:ft}),E=null}const yt=new px;yt.setAnimationLoop(st),this.setAnimationLoop=function(j){P=j},this.dispose=function(){}}}const Os=new ba,o2=new sn;function l2(r,t){function n(S,v){S.matrixAutoUpdate===!0&&S.updateMatrix(),v.value.copy(S.matrix)}function a(S,v){v.color.getRGB(S.fogColor.value,ux(r)),v.isFog?(S.fogNear.value=v.near,S.fogFar.value=v.far):v.isFogExp2&&(S.fogDensity.value=v.density)}function l(S,v,U,L,w){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(S,v):v.isMeshToonMaterial?(c(S,v),_(S,v)):v.isMeshPhongMaterial?(c(S,v),g(S,v)):v.isMeshStandardMaterial?(c(S,v),x(S,v),v.isMeshPhysicalMaterial&&M(S,v,w)):v.isMeshMatcapMaterial?(c(S,v),E(S,v)):v.isMeshDepthMaterial?c(S,v):v.isMeshDistanceMaterial?(c(S,v),T(S,v)):v.isMeshNormalMaterial?c(S,v):v.isLineBasicMaterial?(f(S,v),v.isLineDashedMaterial&&h(S,v)):v.isPointsMaterial?p(S,v,U,L):v.isSpriteMaterial?m(S,v):v.isShadowMaterial?(S.color.value.copy(v.color),S.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(S,v){S.opacity.value=v.opacity,v.color&&S.diffuse.value.copy(v.color),v.emissive&&S.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.bumpMap&&(S.bumpMap.value=v.bumpMap,n(v.bumpMap,S.bumpMapTransform),S.bumpScale.value=v.bumpScale,v.side===Xn&&(S.bumpScale.value*=-1)),v.normalMap&&(S.normalMap.value=v.normalMap,n(v.normalMap,S.normalMapTransform),S.normalScale.value.copy(v.normalScale),v.side===Xn&&S.normalScale.value.negate()),v.displacementMap&&(S.displacementMap.value=v.displacementMap,n(v.displacementMap,S.displacementMapTransform),S.displacementScale.value=v.displacementScale,S.displacementBias.value=v.displacementBias),v.emissiveMap&&(S.emissiveMap.value=v.emissiveMap,n(v.emissiveMap,S.emissiveMapTransform)),v.specularMap&&(S.specularMap.value=v.specularMap,n(v.specularMap,S.specularMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest);const U=t.get(v),L=U.envMap,w=U.envMapRotation;L&&(S.envMap.value=L,Os.copy(w),Os.x*=-1,Os.y*=-1,Os.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Os.y*=-1,Os.z*=-1),S.envMapRotation.value.setFromMatrix4(o2.makeRotationFromEuler(Os)),S.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=v.reflectivity,S.ior.value=v.ior,S.refractionRatio.value=v.refractionRatio),v.lightMap&&(S.lightMap.value=v.lightMap,S.lightMapIntensity.value=v.lightMapIntensity,n(v.lightMap,S.lightMapTransform)),v.aoMap&&(S.aoMap.value=v.aoMap,S.aoMapIntensity.value=v.aoMapIntensity,n(v.aoMap,S.aoMapTransform))}function f(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform))}function h(S,v){S.dashSize.value=v.dashSize,S.totalSize.value=v.dashSize+v.gapSize,S.scale.value=v.scale}function p(S,v,U,L){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.size.value=v.size*U,S.scale.value=L*.5,v.map&&(S.map.value=v.map,n(v.map,S.uvTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function m(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.rotation.value=v.rotation,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function g(S,v){S.specular.value.copy(v.specular),S.shininess.value=Math.max(v.shininess,1e-4)}function _(S,v){v.gradientMap&&(S.gradientMap.value=v.gradientMap)}function x(S,v){S.metalness.value=v.metalness,v.metalnessMap&&(S.metalnessMap.value=v.metalnessMap,n(v.metalnessMap,S.metalnessMapTransform)),S.roughness.value=v.roughness,v.roughnessMap&&(S.roughnessMap.value=v.roughnessMap,n(v.roughnessMap,S.roughnessMapTransform)),v.envMap&&(S.envMapIntensity.value=v.envMapIntensity)}function M(S,v,U){S.ior.value=v.ior,v.sheen>0&&(S.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),S.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(S.sheenColorMap.value=v.sheenColorMap,n(v.sheenColorMap,S.sheenColorMapTransform)),v.sheenRoughnessMap&&(S.sheenRoughnessMap.value=v.sheenRoughnessMap,n(v.sheenRoughnessMap,S.sheenRoughnessMapTransform))),v.clearcoat>0&&(S.clearcoat.value=v.clearcoat,S.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(S.clearcoatMap.value=v.clearcoatMap,n(v.clearcoatMap,S.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,n(v.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(S.clearcoatNormalMap.value=v.clearcoatNormalMap,n(v.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Xn&&S.clearcoatNormalScale.value.negate())),v.dispersion>0&&(S.dispersion.value=v.dispersion),v.iridescence>0&&(S.iridescence.value=v.iridescence,S.iridescenceIOR.value=v.iridescenceIOR,S.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(S.iridescenceMap.value=v.iridescenceMap,n(v.iridescenceMap,S.iridescenceMapTransform)),v.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=v.iridescenceThicknessMap,n(v.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),v.transmission>0&&(S.transmission.value=v.transmission,S.transmissionSamplerMap.value=U.texture,S.transmissionSamplerSize.value.set(U.width,U.height),v.transmissionMap&&(S.transmissionMap.value=v.transmissionMap,n(v.transmissionMap,S.transmissionMapTransform)),S.thickness.value=v.thickness,v.thicknessMap&&(S.thicknessMap.value=v.thicknessMap,n(v.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=v.attenuationDistance,S.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(S.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(S.anisotropyMap.value=v.anisotropyMap,n(v.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=v.specularIntensity,S.specularColor.value.copy(v.specularColor),v.specularColorMap&&(S.specularColorMap.value=v.specularColorMap,n(v.specularColorMap,S.specularColorMapTransform)),v.specularIntensityMap&&(S.specularIntensityMap.value=v.specularIntensityMap,n(v.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,v){v.matcap&&(S.matcap.value=v.matcap)}function T(S,v){const U=t.get(v).light;S.referencePosition.value.setFromMatrixPosition(U.matrixWorld),S.nearDistance.value=U.shadow.camera.near,S.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:l}}function c2(r,t,n,a){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(U,L){const w=L.program;a.uniformBlockBinding(U,w)}function m(U,L){let w=l[U.id];w===void 0&&(E(U),w=g(U),l[U.id]=w,U.addEventListener("dispose",S));const W=L.program;a.updateUBOMapping(U,W);const B=t.render.frame;c[U.id]!==B&&(x(U),c[U.id]=B)}function g(U){const L=_();U.__bindingPointIndex=L;const w=r.createBuffer(),W=U.__size,B=U.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,W,B),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,L,w),w}function _(){for(let U=0;U<h;U++)if(f.indexOf(U)===-1)return f.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(U){const L=l[U.id],w=U.uniforms,W=U.__cache;r.bindBuffer(r.UNIFORM_BUFFER,L);for(let B=0,O=w.length;B<O;B++){const G=Array.isArray(w[B])?w[B]:[w[B]];for(let D=0,R=G.length;D<R;D++){const F=G[D];if(M(F,B,D,W)===!0){const $=F.__offset,it=Array.isArray(F.value)?F.value:[F.value];let ut=0;for(let mt=0;mt<it.length;mt++){const z=it[mt],Q=T(z);typeof z=="number"||typeof z=="boolean"?(F.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,$+ut,F.__data)):z.isMatrix3?(F.__data[0]=z.elements[0],F.__data[1]=z.elements[1],F.__data[2]=z.elements[2],F.__data[3]=0,F.__data[4]=z.elements[3],F.__data[5]=z.elements[4],F.__data[6]=z.elements[5],F.__data[7]=0,F.__data[8]=z.elements[6],F.__data[9]=z.elements[7],F.__data[10]=z.elements[8],F.__data[11]=0):(z.toArray(F.__data,ut),ut+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,$,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(U,L,w,W){const B=U.value,O=L+"_"+w;if(W[O]===void 0)return typeof B=="number"||typeof B=="boolean"?W[O]=B:W[O]=B.clone(),!0;{const G=W[O];if(typeof B=="number"||typeof B=="boolean"){if(G!==B)return W[O]=B,!0}else if(G.equals(B)===!1)return G.copy(B),!0}return!1}function E(U){const L=U.uniforms;let w=0;const W=16;for(let O=0,G=L.length;O<G;O++){const D=Array.isArray(L[O])?L[O]:[L[O]];for(let R=0,F=D.length;R<F;R++){const $=D[R],it=Array.isArray($.value)?$.value:[$.value];for(let ut=0,mt=it.length;ut<mt;ut++){const z=it[ut],Q=T(z),K=w%W,St=K%Q.boundary,Tt=K+St;w+=St,Tt!==0&&W-Tt<Q.storage&&(w+=W-Tt),$.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=w,w+=Q.storage}}}const B=w%W;return B>0&&(w+=W-B),U.__size=w,U.__cache={},this}function T(U){const L={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(L.boundary=4,L.storage=4):U.isVector2?(L.boundary=8,L.storage=8):U.isVector3||U.isColor?(L.boundary=16,L.storage=12):U.isVector4?(L.boundary=16,L.storage=16):U.isMatrix3?(L.boundary=48,L.storage=48):U.isMatrix4?(L.boundary=64,L.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),L}function S(U){const L=U.target;L.removeEventListener("dispose",S);const w=f.indexOf(L.__bindingPointIndex);f.splice(w,1),r.deleteBuffer(l[L.id]),delete l[L.id],delete c[L.id]}function v(){for(const U in l)r.deleteBuffer(l[U]);f=[],l={},c={}}return{bind:p,update:m,dispose:v}}class u2{constructor(t={}){const{canvas:n=$M(),context:a=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=a.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),T=new Int32Array(4);let S=null,v=null;const U=[],L=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ti,this.toneMapping=ls,this.toneMappingExposure=1;const w=this;let W=!1,B=0,O=0,G=null,D=-1,R=null;const F=new cn,$=new cn;let it=null;const ut=new fe(0);let mt=0,z=n.width,Q=n.height,K=1,St=null,Tt=null;const P=new cn(0,0,z,Q),st=new cn(0,0,z,Q);let yt=!1;const j=new dx;let ft=!1,Et=!1;const xt=new sn,Vt=new sn,Ht=new J,ae=new cn,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Qe(){return G===null?K:1}let q=a;function Pn(C,k){return n.getContext(C,k)}try{const C={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${lp}`),n.addEventListener("webglcontextlost",vt,!1),n.addEventListener("webglcontextrestored",Ct,!1),n.addEventListener("webglcontextcreationerror",Nt,!1),q===null){const k="webgl2";if(q=Pn(k,C),q===null)throw Pn(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let he,ge,Qt,Oe,Zt,N,A,at,dt,Mt,gt,Wt,Lt,zt,_e,Rt,Bt,Kt,Yt,Pt,te,re,Ge,V;function wt(){he=new mb(q),he.init(),re=new t2(q,he),ge=new cb(q,he,t,re),Qt=new QA(q,he),ge.reverseDepthBuffer&&x&&Qt.buffers.depth.setReversed(!0),Oe=new vb(q),Zt=new zA,N=new $A(q,he,Qt,Zt,ge,re,Oe),A=new fb(w),at=new pb(w),dt=new bE(q),Ge=new ob(q,dt),Mt=new gb(q,dt,Oe,Ge),gt=new yb(q,Mt,dt,Oe),Yt=new xb(q,ge,N),Rt=new ub(Zt),Wt=new PA(w,A,at,he,ge,Ge,Rt),Lt=new l2(w,Zt),zt=new IA,_e=new XA(he),Kt=new rb(w,A,at,Qt,gt,M,p),Bt=new ZA(w,gt,ge),V=new c2(q,Oe,ge,Qt),Pt=new lb(q,he,Oe),te=new _b(q,he,Oe),Oe.programs=Wt.programs,w.capabilities=ge,w.extensions=he,w.properties=Zt,w.renderLists=zt,w.shadowMap=Bt,w.state=Qt,w.info=Oe}wt();const ct=new r2(w,q);this.xr=ct,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const C=he.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=he.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(C){C!==void 0&&(K=C,this.setSize(z,Q,!1))},this.getSize=function(C){return C.set(z,Q)},this.setSize=function(C,k,ot=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=C,Q=k,n.width=Math.floor(C*K),n.height=Math.floor(k*K),ot===!0&&(n.style.width=C+"px",n.style.height=k+"px"),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(z*K,Q*K).floor()},this.setDrawingBufferSize=function(C,k,ot){z=C,Q=k,K=ot,n.width=Math.floor(C*ot),n.height=Math.floor(k*ot),this.setViewport(0,0,C,k)},this.getCurrentViewport=function(C){return C.copy(F)},this.getViewport=function(C){return C.copy(P)},this.setViewport=function(C,k,ot,rt){C.isVector4?P.set(C.x,C.y,C.z,C.w):P.set(C,k,ot,rt),Qt.viewport(F.copy(P).multiplyScalar(K).round())},this.getScissor=function(C){return C.copy(st)},this.setScissor=function(C,k,ot,rt){C.isVector4?st.set(C.x,C.y,C.z,C.w):st.set(C,k,ot,rt),Qt.scissor($.copy(st).multiplyScalar(K).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(C){Qt.setScissorTest(yt=C)},this.setOpaqueSort=function(C){St=C},this.setTransparentSort=function(C){Tt=C},this.getClearColor=function(C){return C.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(C=!0,k=!0,ot=!0){let rt=0;if(C){let X=!1;if(G!==null){const bt=G.texture.format;X=bt===pp||bt===dp||bt===hp}if(X){const bt=G.texture.type,Dt=bt===Ta||bt===Vs||bt===ll||bt===Yr||bt===up||bt===fp,Ut=Kt.getClearColor(),kt=Kt.getClearAlpha(),ne=Ut.r,$t=Ut.g,It=Ut.b;Dt?(E[0]=ne,E[1]=$t,E[2]=It,E[3]=kt,q.clearBufferuiv(q.COLOR,0,E)):(T[0]=ne,T[1]=$t,T[2]=It,T[3]=kt,q.clearBufferiv(q.COLOR,0,T))}else rt|=q.COLOR_BUFFER_BIT}k&&(rt|=q.DEPTH_BUFFER_BIT),ot&&(rt|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",vt,!1),n.removeEventListener("webglcontextrestored",Ct,!1),n.removeEventListener("webglcontextcreationerror",Nt,!1),zt.dispose(),_e.dispose(),Zt.dispose(),A.dispose(),at.dispose(),gt.dispose(),Ge.dispose(),V.dispose(),Wt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",eo),ct.removeEventListener("sessionend",no),Gi.stop()};function vt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),W=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),W=!1;const C=Oe.autoReset,k=Bt.enabled,ot=Bt.autoUpdate,rt=Bt.needsUpdate,X=Bt.type;wt(),Oe.autoReset=C,Bt.enabled=k,Bt.autoUpdate=ot,Bt.needsUpdate=rt,Bt.type=X}function Nt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ee(C){const k=C.target;k.removeEventListener("dispose",ee),Je(k)}function Je(C){_n(C),Zt.remove(C)}function _n(C){const k=Zt.get(C).programs;k!==void 0&&(k.forEach(function(ot){Wt.releaseProgram(ot)}),C.isShaderMaterial&&Wt.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,ot,rt,X,bt){k===null&&(k=Fe);const Dt=X.isMesh&&X.matrixWorld.determinant()<0,Ut=ao(C,k,ot,rt,X);Qt.setMaterial(rt,Dt);let kt=ot.index,ne=1;if(rt.wireframe===!0){if(kt=Mt.getWireframeAttribute(ot),kt===void 0)return;ne=2}const $t=ot.drawRange,It=ot.attributes.position;let Te=$t.start*ne,Pe=($t.start+$t.count)*ne;bt!==null&&(Te=Math.max(Te,bt.start*ne),Pe=Math.min(Pe,(bt.start+bt.count)*ne)),kt!==null?(Te=Math.max(Te,0),Pe=Math.min(Pe,kt.count)):It!=null&&(Te=Math.max(Te,0),Pe=Math.min(Pe,It.count));const He=Pe-Te;if(He<0||He===1/0)return;Ge.setup(X,rt,Ut,ot,kt);let zn,ye=Pt;if(kt!==null&&(zn=dt.get(kt),ye=te,ye.setIndex(zn)),X.isMesh)rt.wireframe===!0?(Qt.setLineWidth(rt.wireframeLinewidth*Qe()),ye.setMode(q.LINES)):ye.setMode(q.TRIANGLES);else if(X.isLine){let Xt=rt.linewidth;Xt===void 0&&(Xt=1),Qt.setLineWidth(Xt*Qe()),X.isLineSegments?ye.setMode(q.LINES):X.isLineLoop?ye.setMode(q.LINE_LOOP):ye.setMode(q.LINE_STRIP)}else X.isPoints?ye.setMode(q.POINTS):X.isSprite&&ye.setMode(q.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)ye.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))ye.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Xt=X._multiDrawStarts,vn=X._multiDrawCounts,se=X._multiDrawCount,Wn=kt?dt.get(kt).bytesPerElement:1,Aa=Zt.get(rt).currentProgram.getUniforms();for(let Cn=0;Cn<se;Cn++)Aa.setValue(q,"_gl_DrawID",Cn),ye.render(Xt[Cn]/Wn,vn[Cn])}else if(X.isInstancedMesh)ye.renderInstances(Te,He,X.count);else if(ot.isInstancedBufferGeometry){const Xt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,vn=Math.min(ot.instanceCount,Xt);ye.renderInstances(Te,He,vn)}else ye.render(Te,He)};function Ae(C,k,ot){C.transparent===!0&&C.side===xa&&C.forceSinglePass===!1?(C.side=Xn,C.needsUpdate=!0,en(C,k,ot),C.side=cs,C.needsUpdate=!0,en(C,k,ot),C.side=xa):en(C,k,ot)}this.compile=function(C,k,ot=null){ot===null&&(ot=C),v=_e.get(ot),v.init(k),L.push(v),ot.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),C!==ot&&C.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights();const rt=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const bt=X.material;if(bt)if(Array.isArray(bt))for(let Dt=0;Dt<bt.length;Dt++){const Ut=bt[Dt];Ae(Ut,ot,X),rt.add(Ut)}else Ae(bt,ot,X),rt.add(bt)}),L.pop(),v=null,rt},this.compileAsync=function(C,k,ot=null){const rt=this.compile(C,k,ot);return new Promise(X=>{function bt(){if(rt.forEach(function(Dt){Zt.get(Dt).currentProgram.isReady()&&rt.delete(Dt)}),rt.size===0){X(C);return}setTimeout(bt,10)}he.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let Rn=null;function Ri(C){Rn&&Rn(C)}function eo(){Gi.stop()}function no(){Gi.start()}const Gi=new px;Gi.setAnimationLoop(Ri),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(C){Rn=C,ct.setAnimationLoop(C),C===null?Gi.stop():Gi.start()},ct.addEventListener("sessionstart",eo),ct.addEventListener("sessionend",no),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(k),k=ct.getCamera()),C.isScene===!0&&C.onBeforeRender(w,C,k,G),v=_e.get(C,L.length),v.init(k),L.push(v),Vt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),j.setFromProjectionMatrix(Vt),Et=this.localClippingEnabled,ft=Rt.init(this.clippingPlanes,Et),S=zt.get(C,U.length),S.init(),U.push(S),ct.enabled===!0&&ct.isPresenting===!0){const bt=w.xr.getDepthSensingMesh();bt!==null&&fs(bt,k,-1/0,w.sortObjects)}fs(C,k,0,w.sortObjects),S.finish(),w.sortObjects===!0&&S.sort(St,Tt),de=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,de&&Kt.addToRenderList(S,C),this.info.render.frame++,ft===!0&&Rt.beginShadows();const ot=v.state.shadowsArray;Bt.render(ot,C,k),ft===!0&&Rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,X=S.transmissive;if(v.setupLights(),k.isArrayCamera){const bt=k.cameras;if(X.length>0)for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++){const kt=bt[Dt];io(rt,X,C,kt)}de&&Kt.render(C);for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++){const kt=bt[Dt];ks(S,C,kt,kt.viewport)}}else X.length>0&&io(rt,X,C,k),de&&Kt.render(C),ks(S,C,k);G!==null&&(N.updateMultisampleRenderTarget(G),N.updateRenderTargetMipmap(G)),C.isScene===!0&&C.onAfterRender(w,C,k),Ge.resetDefaultState(),D=-1,R=null,L.pop(),L.length>0?(v=L[L.length-1],ft===!0&&Rt.setGlobalState(w.clippingPlanes,v.state.camera)):v=null,U.pop(),U.length>0?S=U[U.length-1]:S=null};function fs(C,k,ot,rt){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)ot=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||j.intersectsSprite(C)){rt&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Vt);const Dt=gt.update(C),Ut=C.material;Ut.visible&&S.push(C,Dt,Ut,ot,ae.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||j.intersectsObject(C))){const Dt=gt.update(C),Ut=C.material;if(rt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),ae.copy(Dt.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(Vt)),Array.isArray(Ut)){const kt=Dt.groups;for(let ne=0,$t=kt.length;ne<$t;ne++){const It=kt[ne],Te=Ut[It.materialIndex];Te&&Te.visible&&S.push(C,Dt,Te,ot,ae.z,It)}}else Ut.visible&&S.push(C,Dt,Ut,ot,ae.z,null)}}const bt=C.children;for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++)fs(bt[Dt],k,ot,rt)}function ks(C,k,ot,rt){const X=C.opaque,bt=C.transmissive,Dt=C.transparent;v.setupLightsView(ot),ft===!0&&Rt.setGlobalState(w.clippingPlanes,ot),rt&&Qt.viewport(F.copy(rt)),X.length>0&&hs(X,k,ot),bt.length>0&&hs(bt,k,ot),Dt.length>0&&hs(Dt,k,ot),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function io(C,k,ot,rt){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[rt.id]===void 0&&(v.state.transmissionRenderTarget[rt.id]=new us(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Kr:Ta,minFilter:Gs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:be.workingColorSpace}));const bt=v.state.transmissionRenderTarget[rt.id],Dt=rt.viewport||F;bt.setSize(Dt.z,Dt.w);const Ut=w.getRenderTarget();w.setRenderTarget(bt),w.getClearColor(ut),mt=w.getClearAlpha(),mt<1&&w.setClearColor(16777215,.5),w.clear(),de&&Kt.render(ot);const kt=w.toneMapping;w.toneMapping=ls;const ne=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),v.setupLightsView(rt),ft===!0&&Rt.setGlobalState(w.clippingPlanes,rt),hs(C,ot,rt),N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt),he.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let It=0,Te=k.length;It<Te;It++){const Pe=k[It],He=Pe.object,zn=Pe.geometry,ye=Pe.material,Xt=Pe.group;if(ye.side===xa&&He.layers.test(rt.layers)){const vn=ye.side;ye.side=Xn,ye.needsUpdate=!0,wi(He,ot,rt,zn,ye,Xt),ye.side=vn,ye.needsUpdate=!0,$t=!0}}$t===!0&&(N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt))}w.setRenderTarget(Ut),w.setClearColor(ut,mt),ne!==void 0&&(rt.viewport=ne),w.toneMapping=kt}function hs(C,k,ot){const rt=k.isScene===!0?k.overrideMaterial:null;for(let X=0,bt=C.length;X<bt;X++){const Dt=C[X],Ut=Dt.object,kt=Dt.geometry,ne=rt===null?Dt.material:rt,$t=Dt.group;Ut.layers.test(ot.layers)&&wi(Ut,k,ot,kt,ne,$t)}}function wi(C,k,ot,rt,X,bt){C.onBeforeRender(w,k,ot,rt,X,bt),C.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(w,k,ot,rt,C,bt),X.transparent===!0&&X.side===xa&&X.forceSinglePass===!1?(X.side=Xn,X.needsUpdate=!0,w.renderBufferDirect(ot,k,rt,X,C,bt),X.side=cs,X.needsUpdate=!0,w.renderBufferDirect(ot,k,rt,X,C,bt),X.side=xa):w.renderBufferDirect(ot,k,rt,X,C,bt),C.onAfterRender(w,k,ot,rt,X,bt)}function en(C,k,ot){k.isScene!==!0&&(k=Fe);const rt=Zt.get(C),X=v.state.lights,bt=v.state.shadowsArray,Dt=X.state.version,Ut=Wt.getParameters(C,X.state,bt,k,ot),kt=Wt.getProgramCacheKey(Ut);let ne=rt.programs;rt.environment=C.isMeshStandardMaterial?k.environment:null,rt.fog=k.fog,rt.envMap=(C.isMeshStandardMaterial?at:A).get(C.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&C.envMap===null?k.environmentRotation:C.envMapRotation,ne===void 0&&(C.addEventListener("dispose",ee),ne=new Map,rt.programs=ne);let $t=ne.get(kt);if($t!==void 0){if(rt.currentProgram===$t&&rt.lightsStateVersion===Dt)return ji(C,Ut),$t}else Ut.uniforms=Wt.getUniforms(C),C.onBeforeCompile(Ut,w),$t=Wt.acquireProgram(Ut,kt),ne.set(kt,$t),rt.uniforms=Ut.uniforms;const It=rt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(It.clippingPlanes=Rt.uniform),ji(C,Ut),rt.needsLights=_u(C),rt.lightsStateVersion=Dt,rt.needsLights&&(It.ambientLightColor.value=X.state.ambient,It.lightProbe.value=X.state.probe,It.directionalLights.value=X.state.directional,It.directionalLightShadows.value=X.state.directionalShadow,It.spotLights.value=X.state.spot,It.spotLightShadows.value=X.state.spotShadow,It.rectAreaLights.value=X.state.rectArea,It.ltc_1.value=X.state.rectAreaLTC1,It.ltc_2.value=X.state.rectAreaLTC2,It.pointLights.value=X.state.point,It.pointLightShadows.value=X.state.pointShadow,It.hemisphereLights.value=X.state.hemi,It.directionalShadowMap.value=X.state.directionalShadowMap,It.directionalShadowMatrix.value=X.state.directionalShadowMatrix,It.spotShadowMap.value=X.state.spotShadowMap,It.spotLightMatrix.value=X.state.spotLightMatrix,It.spotLightMap.value=X.state.spotLightMap,It.pointShadowMap.value=X.state.pointShadowMap,It.pointShadowMatrix.value=X.state.pointShadowMatrix),rt.currentProgram=$t,rt.uniformsList=null,$t}function wn(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=au.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function ji(C,k){const ot=Zt.get(C);ot.outputColorSpace=k.outputColorSpace,ot.batching=k.batching,ot.batchingColor=k.batchingColor,ot.instancing=k.instancing,ot.instancingColor=k.instancingColor,ot.instancingMorph=k.instancingMorph,ot.skinning=k.skinning,ot.morphTargets=k.morphTargets,ot.morphNormals=k.morphNormals,ot.morphColors=k.morphColors,ot.morphTargetsCount=k.morphTargetsCount,ot.numClippingPlanes=k.numClippingPlanes,ot.numIntersection=k.numClipIntersection,ot.vertexAlphas=k.vertexAlphas,ot.vertexTangents=k.vertexTangents,ot.toneMapping=k.toneMapping}function ao(C,k,ot,rt,X){k.isScene!==!0&&(k=Fe),N.resetTextureUnits();const bt=k.fog,Dt=rt.isMeshStandardMaterial?k.environment:null,Ut=G===null?w.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Qr,kt=(rt.isMeshStandardMaterial?at:A).get(rt.envMap||Dt),ne=rt.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,$t=!!ot.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),It=!!ot.morphAttributes.position,Te=!!ot.morphAttributes.normal,Pe=!!ot.morphAttributes.color;let He=ls;rt.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(He=w.toneMapping);const zn=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,ye=zn!==void 0?zn.length:0,Xt=Zt.get(rt),vn=v.state.lights;if(ft===!0&&(Et===!0||C!==R)){const Bn=C===R&&rt.id===D;Rt.setState(rt,C,Bn)}let se=!1;rt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==vn.state.version||Xt.outputColorSpace!==Ut||X.isBatchedMesh&&Xt.batching===!1||!X.isBatchedMesh&&Xt.batching===!0||X.isBatchedMesh&&Xt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Xt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Xt.instancing===!1||!X.isInstancedMesh&&Xt.instancing===!0||X.isSkinnedMesh&&Xt.skinning===!1||!X.isSkinnedMesh&&Xt.skinning===!0||X.isInstancedMesh&&Xt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Xt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Xt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Xt.instancingMorph===!1&&X.morphTexture!==null||Xt.envMap!==kt||rt.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==Rt.numPlanes||Xt.numIntersection!==Rt.numIntersection)||Xt.vertexAlphas!==ne||Xt.vertexTangents!==$t||Xt.morphTargets!==It||Xt.morphNormals!==Te||Xt.morphColors!==Pe||Xt.toneMapping!==He||Xt.morphTargetsCount!==ye)&&(se=!0):(se=!0,Xt.__version=rt.version);let Wn=Xt.currentProgram;se===!0&&(Wn=en(rt,k,X));let Aa=!1,Cn=!1,Ra=!1;const Ne=Wn.getUniforms(),di=Xt.uniforms;if(Qt.useProgram(Wn.program)&&(Aa=!0,Cn=!0,Ra=!0),rt.id!==D&&(D=rt.id,Cn=!0),Aa||R!==C){Qt.buffers.depth.getReversed()?(xt.copy(C.projectionMatrix),eE(xt),nE(xt),Ne.setValue(q,"projectionMatrix",xt)):Ne.setValue(q,"projectionMatrix",C.projectionMatrix),Ne.setValue(q,"viewMatrix",C.matrixWorldInverse);const Ci=Ne.map.cameraPosition;Ci!==void 0&&Ci.setValue(q,Ht.setFromMatrixPosition(C.matrixWorld)),ge.logarithmicDepthBuffer&&Ne.setValue(q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Ne.setValue(q,"isOrthographic",C.isOrthographicCamera===!0),R!==C&&(R=C,Cn=!0,Ra=!0)}if(X.isSkinnedMesh){Ne.setOptional(q,X,"bindMatrix"),Ne.setOptional(q,X,"bindMatrixInverse");const Bn=X.skeleton;Bn&&(Bn.boneTexture===null&&Bn.computeBoneTexture(),Ne.setValue(q,"boneTexture",Bn.boneTexture,N))}X.isBatchedMesh&&(Ne.setOptional(q,X,"batchingTexture"),Ne.setValue(q,"batchingTexture",X._matricesTexture,N),Ne.setOptional(q,X,"batchingIdTexture"),Ne.setValue(q,"batchingIdTexture",X._indirectTexture,N),Ne.setOptional(q,X,"batchingColorTexture"),X._colorsTexture!==null&&Ne.setValue(q,"batchingColorTexture",X._colorsTexture,N));const En=ot.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&Yt.update(X,ot,Wn),(Cn||Xt.receiveShadow!==X.receiveShadow)&&(Xt.receiveShadow=X.receiveShadow,Ne.setValue(q,"receiveShadow",X.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(di.envMap.value=kt,di.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&k.environment!==null&&(di.envMapIntensity.value=k.environmentIntensity),Cn&&(Ne.setValue(q,"toneMappingExposure",w.toneMappingExposure),Xt.needsLights&&gu(di,Ra),bt&&rt.fog===!0&&Lt.refreshFogUniforms(di,bt),Lt.refreshMaterialUniforms(di,rt,K,Q,v.state.transmissionRenderTarget[C.id]),au.upload(q,wn(Xt),di,N)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(au.upload(q,wn(Xt),di,N),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Ne.setValue(q,"center",X.center),Ne.setValue(q,"modelViewMatrix",X.modelViewMatrix),Ne.setValue(q,"normalMatrix",X.normalMatrix),Ne.setValue(q,"modelMatrix",X.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Bn=rt.uniformsGroups;for(let Ci=0,pi=Bn.length;Ci<pi;Ci++){const Zi=Bn[Ci];V.update(Zi,Wn),V.bind(Zi,Wn)}}return Wn}function gu(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function _u(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(C,k,ot){Zt.get(C.texture).__webglTexture=k,Zt.get(C.depthTexture).__webglTexture=ot;const rt=Zt.get(C);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=ot===void 0,rt.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,k){const ot=Zt.get(C);ot.__webglFramebuffer=k,ot.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,ot=0){G=C,B=k,O=ot;let rt=!0,X=null,bt=!1,Dt=!1;if(C){const kt=Zt.get(C);if(kt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(q.FRAMEBUFFER,null),rt=!1;else if(kt.__webglFramebuffer===void 0)N.setupRenderTarget(C);else if(kt.__hasExternalTextures)N.rebindTextures(C,Zt.get(C.texture).__webglTexture,Zt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const It=C.depthTexture;if(kt.__boundDepthTexture!==It){if(It!==null&&Zt.has(It)&&(C.width!==It.image.width||C.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(C)}}const ne=C.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Dt=!0);const $t=Zt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[k])?X=$t[k][ot]:X=$t[k],bt=!0):C.samples>0&&N.useMultisampledRTT(C)===!1?X=Zt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?X=$t[ot]:X=$t,F.copy(C.viewport),$.copy(C.scissor),it=C.scissorTest}else F.copy(P).multiplyScalar(K).floor(),$.copy(st).multiplyScalar(K).floor(),it=yt;if(Qt.bindFramebuffer(q.FRAMEBUFFER,X)&&rt&&Qt.drawBuffers(C,X),Qt.viewport(F),Qt.scissor($),Qt.setScissorTest(it),bt){const kt=Zt.get(C.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+k,kt.__webglTexture,ot)}else if(Dt){const kt=Zt.get(C.texture),ne=k||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,kt.__webglTexture,ot||0,ne)}D=-1},this.readRenderTargetPixels=function(C,k,ot,rt,X,bt,Dt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){Qt.bindFramebuffer(q.FRAMEBUFFER,Ut);try{const kt=C.texture,ne=kt.format,$t=kt.type;if(!ge.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-rt&&ot>=0&&ot<=C.height-X&&q.readPixels(k,ot,rt,X,re.convert(ne),re.convert($t),bt)}finally{const kt=G!==null?Zt.get(G).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(C,k,ot,rt,X,bt,Dt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){const kt=C.texture,ne=kt.format,$t=kt.type;if(!ge.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=C.width-rt&&ot>=0&&ot<=C.height-X){Qt.bindFramebuffer(q.FRAMEBUFFER,Ut);const It=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,It),q.bufferData(q.PIXEL_PACK_BUFFER,bt.byteLength,q.STREAM_READ),q.readPixels(k,ot,rt,X,re.convert(ne),re.convert($t),0);const Te=G!==null?Zt.get(G).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,Te);const Pe=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await tE(q,Pe,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,It),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,bt),q.deleteBuffer(It),q.deleteSync(Pe),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,k=null,ot=0){C.isTexture!==!0&&(il("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,C=arguments[1]);const rt=Math.pow(2,-ot),X=Math.floor(C.image.width*rt),bt=Math.floor(C.image.height*rt),Dt=k!==null?k.x:0,Ut=k!==null?k.y:0;N.setTexture2D(C,0),q.copyTexSubImage2D(q.TEXTURE_2D,ot,0,0,Dt,Ut,X,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(C,k,ot=null,rt=null,X=0){C.isTexture!==!0&&(il("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,C=arguments[1],k=arguments[2],X=arguments[3]||0,ot=null);let bt,Dt,Ut,kt,ne,$t,It,Te,Pe;const He=C.isCompressedTexture?C.mipmaps[X]:C.image;ot!==null?(bt=ot.max.x-ot.min.x,Dt=ot.max.y-ot.min.y,Ut=ot.isBox3?ot.max.z-ot.min.z:1,kt=ot.min.x,ne=ot.min.y,$t=ot.isBox3?ot.min.z:0):(bt=He.width,Dt=He.height,Ut=He.depth||1,kt=0,ne=0,$t=0),rt!==null?(It=rt.x,Te=rt.y,Pe=rt.z):(It=0,Te=0,Pe=0);const zn=re.convert(k.format),ye=re.convert(k.type);let Xt;k.isData3DTexture?(N.setTexture3D(k,0),Xt=q.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(N.setTexture2DArray(k,0),Xt=q.TEXTURE_2D_ARRAY):(N.setTexture2D(k,0),Xt=q.TEXTURE_2D),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,k.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,k.unpackAlignment);const vn=q.getParameter(q.UNPACK_ROW_LENGTH),se=q.getParameter(q.UNPACK_IMAGE_HEIGHT),Wn=q.getParameter(q.UNPACK_SKIP_PIXELS),Aa=q.getParameter(q.UNPACK_SKIP_ROWS),Cn=q.getParameter(q.UNPACK_SKIP_IMAGES);q.pixelStorei(q.UNPACK_ROW_LENGTH,He.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,He.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,kt),q.pixelStorei(q.UNPACK_SKIP_ROWS,ne),q.pixelStorei(q.UNPACK_SKIP_IMAGES,$t);const Ra=C.isDataArrayTexture||C.isData3DTexture,Ne=k.isDataArrayTexture||k.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const di=Zt.get(C),En=Zt.get(k),Bn=Zt.get(di.__renderTarget),Ci=Zt.get(En.__renderTarget);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,Bn.__webglFramebuffer),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let pi=0;pi<Ut;pi++)Ra&&q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(C).__webglTexture,X,$t+pi),C.isDepthTexture?(Ne&&q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(k).__webglTexture,X,Pe+pi),q.blitFramebuffer(kt,ne,bt,Dt,It,Te,bt,Dt,q.DEPTH_BUFFER_BIT,q.NEAREST)):Ne?q.copyTexSubImage3D(Xt,X,It,Te,Pe+pi,kt,ne,bt,Dt):q.copyTexSubImage2D(Xt,X,It,Te,Pe+pi,kt,ne,bt,Dt);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Ne?C.isDataTexture||C.isData3DTexture?q.texSubImage3D(Xt,X,It,Te,Pe,bt,Dt,Ut,zn,ye,He.data):k.isCompressedArrayTexture?q.compressedTexSubImage3D(Xt,X,It,Te,Pe,bt,Dt,Ut,zn,He.data):q.texSubImage3D(Xt,X,It,Te,Pe,bt,Dt,Ut,zn,ye,He):C.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,X,It,Te,bt,Dt,zn,ye,He.data):C.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,X,It,Te,He.width,He.height,zn,He.data):q.texSubImage2D(q.TEXTURE_2D,X,It,Te,bt,Dt,zn,ye,He);q.pixelStorei(q.UNPACK_ROW_LENGTH,vn),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,se),q.pixelStorei(q.UNPACK_SKIP_PIXELS,Wn),q.pixelStorei(q.UNPACK_SKIP_ROWS,Aa),q.pixelStorei(q.UNPACK_SKIP_IMAGES,Cn),X===0&&k.generateMipmaps&&q.generateMipmap(Xt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(C,k,ot=null,rt=null,X=0){return C.isTexture!==!0&&(il("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ot=arguments[0]||null,rt=arguments[1]||null,C=arguments[2],k=arguments[3],X=arguments[4]||0),il('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,k,ot,rt,X)},this.initRenderTarget=function(C){Zt.get(C).__webglFramebuffer===void 0&&N.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?N.setTextureCube(C,0):C.isData3DTexture?N.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?N.setTexture2DArray(C,0):N.setTexture2D(C,0),Qt.unbindTexture()},this.resetState=function(){B=0,O=0,G=null,Qt.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=be._getDrawingBufferColorSpace(t),n.unpackColorSpace=be._getUnpackColorSpace()}}class vp{constructor(t,n=1,a=1e3){this.isFog=!0,this.name="",this.color=new fe(t),this.near=n,this.far=a}clone(){return new vp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class f2 extends qn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ba,this.environmentIntensity=1,this.environmentRotation=new ba,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Sx extends $r{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const lu=new J,cu=new J,Sv=new sn,tl=new mp,Yc=new hl,fd=new J,Mv=new J;class h2 extends qn{constructor(t=new An,n=new Sx){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[0];for(let l=1,c=n.count;l<c;l++)lu.fromBufferAttribute(n,l-1),cu.fromBufferAttribute(n,l),a[l]=a[l-1],a[l]+=lu.distanceTo(cu);t.setAttribute("lineDistance",new yn(a,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Yc.copy(a.boundingSphere),Yc.applyMatrix4(l),Yc.radius+=c,t.ray.intersectsSphere(Yc)===!1)return;Sv.copy(l).invert(),tl.copy(t.ray).applyMatrix4(Sv);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,g=a.index,x=a.attributes.position;if(g!==null){const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const v=g.getX(T),U=g.getX(T+1),L=jc(this,t,tl,p,v,U);L&&n.push(L)}if(this.isLineLoop){const T=g.getX(E-1),S=g.getX(M),v=jc(this,t,tl,p,T,S);v&&n.push(v)}}else{const M=Math.max(0,f.start),E=Math.min(x.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const v=jc(this,t,tl,p,T,T+1);v&&n.push(v)}if(this.isLineLoop){const T=jc(this,t,tl,p,E-1,M);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function jc(r,t,n,a,l,c){const f=r.geometry.attributes.position;if(lu.fromBufferAttribute(f,l),cu.fromBufferAttribute(f,c),n.distanceSqToSegment(lu,cu,fd,Mv)>a)return;fd.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(fd);if(!(p<t.near||p>t.far))return{distance:p,point:Mv.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}class su extends $r{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ev=new sn,sp=new mp,Zc=new hl,Kc=new J;class hd extends qn{constructor(t=new An,n=new su){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Zc.copy(a.boundingSphere),Zc.applyMatrix4(l),Zc.radius+=c,t.ray.intersectsSphere(Zc)===!1)return;Ev.copy(l).invert(),sp.copy(t.ray).applyMatrix4(Ev);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=a.index,_=a.attributes.position;if(m!==null){const x=Math.max(0,f.start),M=Math.min(m.count,f.start+f.count);for(let E=x,T=M;E<T;E++){const S=m.getX(E);Kc.fromBufferAttribute(_,S),Tv(Kc,S,p,l,t,n,this)}}else{const x=Math.max(0,f.start),M=Math.min(_.count,f.start+f.count);for(let E=x,T=M;E<T;E++)Kc.fromBufferAttribute(_,E),Tv(Kc,E,p,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function Tv(r,t,n,a,l,c,f){const h=sp.distanceSqToPoint(r);if(h<n){const p=new J;sp.closestPointToPoint(r,p),p.applyMatrix4(a);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;c.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class tn extends An{constructor(t=1,n=1,a=1,l=32,c=1,f=!1,h=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:h,thetaLength:p};const m=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],x=[],M=[];let E=0;const T=[],S=a/2;let v=0;U(),f===!1&&(t>0&&L(!0),n>0&&L(!1)),this.setIndex(g),this.setAttribute("position",new yn(_,3)),this.setAttribute("normal",new yn(x,3)),this.setAttribute("uv",new yn(M,2));function U(){const w=new J,W=new J;let B=0;const O=(n-t)/a;for(let G=0;G<=c;G++){const D=[],R=G/c,F=R*(n-t)+t;for(let $=0;$<=l;$++){const it=$/l,ut=it*p+h,mt=Math.sin(ut),z=Math.cos(ut);W.x=F*mt,W.y=-R*a+S,W.z=F*z,_.push(W.x,W.y,W.z),w.set(mt,O,z).normalize(),x.push(w.x,w.y,w.z),M.push(it,1-R),D.push(E++)}T.push(D)}for(let G=0;G<l;G++)for(let D=0;D<c;D++){const R=T[D][G],F=T[D+1][G],$=T[D+1][G+1],it=T[D][G+1];(t>0||D!==0)&&(g.push(R,F,it),B+=3),(n>0||D!==c-1)&&(g.push(F,$,it),B+=3)}m.addGroup(v,B,0),v+=B}function L(w){const W=E,B=new we,O=new J;let G=0;const D=w===!0?t:n,R=w===!0?1:-1;for(let $=1;$<=l;$++)_.push(0,S*R,0),x.push(0,R,0),M.push(.5,.5),E++;const F=E;for(let $=0;$<=l;$++){const ut=$/l*p+h,mt=Math.cos(ut),z=Math.sin(ut);O.x=D*z,O.y=S*R,O.z=D*mt,_.push(O.x,O.y,O.z),x.push(0,R,0),B.x=mt*.5+.5,B.y=z*.5*R+.5,M.push(B.x,B.y),E++}for(let $=0;$<l;$++){const it=W+$,ut=F+$;w===!0?g.push(ut,ut+1,it):g.push(ut+1,ut,it),G+=3}m.addGroup(v,G,w===!0?1:2),v+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ss extends tn{constructor(t=1,n=1,a=32,l=1,c=!1,f=0,h=Math.PI*2){super(0,t,n,a,l,c,f,h),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:h}}static fromJSON(t){return new ss(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dl extends An{constructor(t=[],n=[],a=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:l};const c=[],f=[];h(l),m(a),g(),this.setAttribute("position",new yn(c,3)),this.setAttribute("normal",new yn(c.slice(),3)),this.setAttribute("uv",new yn(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function h(U){const L=new J,w=new J,W=new J;for(let B=0;B<n.length;B+=3)M(n[B+0],L),M(n[B+1],w),M(n[B+2],W),p(L,w,W,U)}function p(U,L,w,W){const B=W+1,O=[];for(let G=0;G<=B;G++){O[G]=[];const D=U.clone().lerp(w,G/B),R=L.clone().lerp(w,G/B),F=B-G;for(let $=0;$<=F;$++)$===0&&G===B?O[G][$]=D:O[G][$]=D.clone().lerp(R,$/F)}for(let G=0;G<B;G++)for(let D=0;D<2*(B-G)-1;D++){const R=Math.floor(D/2);D%2===0?(x(O[G][R+1]),x(O[G+1][R]),x(O[G][R])):(x(O[G][R+1]),x(O[G+1][R+1]),x(O[G+1][R]))}}function m(U){const L=new J;for(let w=0;w<c.length;w+=3)L.x=c[w+0],L.y=c[w+1],L.z=c[w+2],L.normalize().multiplyScalar(U),c[w+0]=L.x,c[w+1]=L.y,c[w+2]=L.z}function g(){const U=new J;for(let L=0;L<c.length;L+=3){U.x=c[L+0],U.y=c[L+1],U.z=c[L+2];const w=S(U)/2/Math.PI+.5,W=v(U)/Math.PI+.5;f.push(w,1-W)}E(),_()}function _(){for(let U=0;U<f.length;U+=6){const L=f[U+0],w=f[U+2],W=f[U+4],B=Math.max(L,w,W),O=Math.min(L,w,W);B>.9&&O<.1&&(L<.2&&(f[U+0]+=1),w<.2&&(f[U+2]+=1),W<.2&&(f[U+4]+=1))}}function x(U){c.push(U.x,U.y,U.z)}function M(U,L){const w=U*3;L.x=t[w+0],L.y=t[w+1],L.z=t[w+2]}function E(){const U=new J,L=new J,w=new J,W=new J,B=new we,O=new we,G=new we;for(let D=0,R=0;D<c.length;D+=9,R+=6){U.set(c[D+0],c[D+1],c[D+2]),L.set(c[D+3],c[D+4],c[D+5]),w.set(c[D+6],c[D+7],c[D+8]),B.set(f[R+0],f[R+1]),O.set(f[R+2],f[R+3]),G.set(f[R+4],f[R+5]),W.copy(U).add(L).add(w).divideScalar(3);const F=S(W);T(B,R+0,U,F),T(O,R+2,L,F),T(G,R+4,w,F)}}function T(U,L,w,W){W<0&&U.x===1&&(f[L]=U.x-1),w.x===0&&w.z===0&&(f[L]=W/2/Math.PI+.5)}function S(U){return Math.atan2(U.z,-U.x)}function v(U){return Math.atan2(-U.y,Math.sqrt(U.x*U.x+U.z*U.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dl(t.vertices,t.indices,t.radius,t.details)}}class uu extends dl{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=1/a,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-a,0,-l,a,0,l,-a,0,l,a,-l,-a,0,-l,a,0,l,-a,0,l,a,0,-a,0,-l,a,0,-l,-a,0,l,a,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new uu(t.radius,t.detail)}}class xp extends dl{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new xp(t.radius,t.detail)}}class fu extends dl{constructor(t=1,n=0){const a=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(a,l,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new fu(t.radius,t.detail)}}class hi extends An{constructor(t=1,n=32,a=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const p=Math.min(f+h,Math.PI);let m=0;const g=[],_=new J,x=new J,M=[],E=[],T=[],S=[];for(let v=0;v<=a;v++){const U=[],L=v/a;let w=0;v===0&&f===0?w=.5/n:v===a&&p===Math.PI&&(w=-.5/n);for(let W=0;W<=n;W++){const B=W/n;_.x=-t*Math.cos(l+B*c)*Math.sin(f+L*h),_.y=t*Math.cos(f+L*h),_.z=t*Math.sin(l+B*c)*Math.sin(f+L*h),E.push(_.x,_.y,_.z),x.copy(_).normalize(),T.push(x.x,x.y,x.z),S.push(B+w,1-L),U.push(m++)}g.push(U)}for(let v=0;v<a;v++)for(let U=0;U<n;U++){const L=g[v][U+1],w=g[v][U],W=g[v+1][U],B=g[v+1][U+1];(v!==0||f>0)&&M.push(L,w,B),(v!==a-1||p<Math.PI)&&M.push(w,W,B)}this.setIndex(M),this.setAttribute("position",new yn(E,3)),this.setAttribute("normal",new yn(T,3)),this.setAttribute("uv",new yn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class d2 extends Fi{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Mx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=bv(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=bv();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function bv(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lp);const p2={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const m2=new mx(-1,1,1,-1,0,1);class g2 extends An{constructor(){super(),this.setAttribute("position",new yn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new yn([0,2,0,0,2,0],2))}}const _2=new g2;class Ex{constructor(t){this._mesh=new ln(_2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,m2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Tx extends pl{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof Fi?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gp.clone(t.uniforms),this.material=new Fi({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ex(this.material)}render(t,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Av extends pl{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,a){const l=t.getContext(),c=t.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,h;this.inverse?(f=0,h=1):(f=1,h=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(h),c.buffers.stencil.setLocked(!0),t.setRenderTarget(a),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class v2 extends pl{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class x2{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const a=t.getSize(new we);this._width=a.width,this._height=a.height,n=new us(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kr}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Tx(p2),this.copyPass.material.blending=Ma,this.clock=new Mx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,a),f.needsSwap){if(a){const h=this.renderer.getContext(),p=this.renderer.state.buffers.stencil;p.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),p.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}Av!==void 0&&(f instanceof Av?a=!0:f instanceof v2&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new we);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const a=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(a,l),this.renderTarget2.setSize(a,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(a,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class y2 extends pl{constructor(t,n,a=null,l=null,c=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=a,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(t,n,a){const l=t.autoClear;t.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(c=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const S2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class M2 extends pl{constructor(){super();const t=S2;this.uniforms=gp.clone(t.uniforms),this.material=new d2({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ex(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,n,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},be.getTransfer(this._outputColorSpace)===Ie&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Fv?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Gv?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Hv?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vv?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===kv?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Xv&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const E2={uniforms:{tDiffuse:{value:null},uTime:{value:0},uChroma:{value:0},uScanline:{value:.04},uGrain:{value:.035},uVignette:{value:.4}},vertexShader:`
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
  `};class T2{constructor(t,n,a,l,c){At(this,"composer");At(this,"cyberpass");At(this,"outputPass");At(this,"clock",0);this.composer=new x2(t),this.composer.addPass(new y2(n,a)),this.cyberpass=new Tx(E2),this.composer.addPass(this.cyberpass),this.outputPass=new M2,this.composer.addPass(this.outputPass),this.composer.setSize(l,c)}setSize(t,n){this.composer.setSize(t,n)}render(t){t&&(this.clock+=t),this.cyberpass.uniforms.uTime.value=this.clock,this.composer.render(t)}dispose(){this.composer.dispose(),this.outputPass.dispose()}}class b2{constructor(t,n,a){At(this,"scene");At(this,"renderer");At(this,"camera");At(this,"playerMeshes",new Map);At(this,"enemyMeshes",new Map);At(this,"projectileMeshes",new Map);At(this,"particleMeshes",new Map);At(this,"bossMeshes",new Map);At(this,"lockIndicators",new Map);At(this,"clock");At(this,"postFX");At(this,"starfield");At(this,"hologramParticles");At(this,"particleData");At(this,"introActive",!1);At(this,"introT",0);At(this,"introOnComplete",null);At(this,"introCamStart");At(this,"introCamEnd");At(this,"introLookStart");At(this,"introLookEnd");At(this,"INTRO_DURATION",2.4);this.scene=new f2,this.scene.background=new fe(0),this.scene.fog=new vp(0,300,900),this.renderer=new u2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(n,a),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera=new bi(60,n/a,.1,2e3),this.camera.position.set(0,Lh,bc),this.clock=new Mx,this.postFX=new T2(this.renderer,this.scene,this.camera,n,a),this.buildCyberpunkBackground()}startIntro(t,n){this.introActive=!0,this.introT=0,this.introOnComplete=n,this.introCamStart=new J(t.x,t.y+35,t.z+45),this.introCamEnd=new J(t.x,t.y+Lh,t.z+bc),this.introLookStart=new J(t.x,t.y+30,t.z-100),this.introLookEnd=new J(t.x,t.y,t.z),this.camera.position.copy(this.introCamStart),this.camera.lookAt(this.introLookStart),this.hologramParticles&&(this.hologramParticles.material.opacity=0),this.starfield&&(this.starfield.material.opacity=0)}introIsActive(){return this.introActive}buildCyberpunkBackground(){this.buildStarfield(),this.buildHologramParticles()}buildStarfield(){const n=new Float32Array(840),a=new Float32Array(280*3),l=new Float32Array(280);for(let h=0;h<280;h++){const p=700+Math.random()*200,m=Math.random()*Math.PI*2,g=(Math.random()-.5)*Math.PI*.55;n[h*3]=Math.cos(m)*Math.cos(g)*p,n[h*3+1]=Math.sin(g)*p,n[h*3+2]=Math.sin(m)*Math.cos(g)*p;const _=Math.random()<.1,x=_?.85+Math.random()*.15:.35+Math.random()*.4;a[h*3]=x,a[h*3+1]=x,a[h*3+2]=x,l[h]=_?2+Math.random()*1.5:.8+Math.random()*.6}const c=new An;c.setAttribute("position",new On(n,3)),c.setAttribute("color",new On(a,3));const f=new su({size:1.6,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,sizeAttenuation:!0,fog:!0});this.starfield=new hd(c,f),this.scene.add(this.starfield)}buildHologramParticles(){const n=new Float32Array(1050),a=new Float32Array(350*3),l=new Float32Array(350*3);for(let h=0;h<350;h++){const p=60+Math.random()*180,m=Math.random()*Math.PI*2,g=(Math.random()-.5)*Math.PI*.7;n[h*3]=Math.cos(m)*Math.cos(g)*p,n[h*3+1]=Math.sin(g)*p*.55+25,n[h*3+2]=Math.sin(m)*Math.cos(g)*p,a[h*3]=(Math.random()-.5)*.15,a[h*3+1]=.05+Math.random()*.1,a[h*3+2]=(Math.random()-.5)*.15;const _=.55+Math.random()*.4;l[h*3]=_,l[h*3+1]=_,l[h*3+2]=_}const c=new An;c.setAttribute("position",new On(n,3)),c.setAttribute("color",new On(l,3));const f=new su({size:.9,vertexColors:!0,transparent:!0,opacity:.55,blending:rl,depthWrite:!1,sizeAttenuation:!0,fog:!0});this.hologramParticles=new hd(c,f),this.scene.add(this.hologramParticles),this.particleData={velocities:a}}updateAtmosphere(t){if(this.introActive){this.introT+=t;const n=this.introT,a=Math.max(0,Math.min(1,(n-1)/.5));this.hologramParticles&&(this.hologramParticles.material.opacity=.55*a),this.starfield&&(this.starfield.material.opacity=.9*a);const l=Math.max(0,Math.min(1,(n-1.6)/.8)),c=1-Math.pow(1-l,3);this.camera.position.lerpVectors(this.introCamStart,this.introCamEnd,c);const f=new J().lerpVectors(this.introLookStart,this.introLookEnd,c);this.camera.lookAt(f),n>=this.INTRO_DURATION&&(this.introActive=!1,this.introOnComplete&&(this.introOnComplete(),this.introOnComplete=null));return}if(this.particleData){const{velocities:n}=this.particleData,a=this.hologramParticles.geometry.attributes.position,l=a.array,c=l.length/3;for(let f=0;f<c;f++)l[f*3]+=n[f*3]*t,l[f*3+1]+=n[f*3+1]*t,l[f*3+2]+=n[f*3+2]*t,l[f*3+1]>200&&(l[f*3+1]=-50,l[f*3]+=(Math.random()-.5)*30,l[f*3+2]+=(Math.random()-.5)*30);a.needsUpdate=!0}this.starfield&&(this.starfield.rotation.y+=t*(Math.PI*2)/120)}updateCamera(t,n,a,l=Jc){const c=new J(t.x-Math.sin(a)*bc,t.y+Lh,t.z-Math.cos(a)*bc),f=1-Math.exp(-l*n);this.camera.position.lerp(c,f),this.camera.lookAt(t.x,t.y,t.z)}setSpeedRatio(t){const n=uM+fM*Math.max(0,Math.min(1,t));Math.abs(this.camera.fov-n)>.01&&(this.camera.fov+=(n-this.camera.fov)*.1,this.camera.updateProjectionMatrix())}resize(t,n){this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.postFX.setSize(t,n)}render(t=1/60){this.updateAtmosphere(t),this.postFX.render()}addPart(t,n,a,l,c=16777215){const f=new as({color:c}),h=new ln(n,f);return h.position.set(a[0],a[1],a[2]),l&&h.rotation.set(l[0],l[1],l[2]),t.add(h),h}createPlayerMesh(t=new fe(16777215)){const n=new os;this.addPart(n,new We(1.8,1,1.4),[0,.5,0]),this.addPart(n,new We(1.6,.7,.4),[0,.6,.75]),this.addPart(n,new We(1.2,.5,.2),[0,.6,.95]),this.addPart(n,new tn(.22,.22,.08,12),[0,.55,.8],[Math.PI/2,0,0]),this.addPart(n,new tn(.27,.27,.06,12),[0,.55,.84],[Math.PI/2,0,0],t.getHex()),this.addPart(n,new tn(.8,1,.4,6),[0,0,0]),this.addPart(n,new We(.7,.5,.7),[0,1.3,0]),this.addPart(n,new We(.62,.09,.1),[0,1.27,.4],void 0,t.getHex()),this.addPart(n,new We(.09,.32,.06),[0,1.56,.1],[-.44,0,0]);for(let c=-1;c<=1;c+=2)this.addPart(n,new We(.85,.35,.5),[c*1.35,.95,-.1],[0,0,c*.35]),this.addPart(n,new ss(.34,.6,4),[c*1.78,.85,.2],[0,0,c*-.5]),this.addPart(n,new hi(.2,6,6),[c*1.1,.7,0]);for(let c=-1;c<=1;c+=2)this.addPart(n,new tn(.2,.25,.7,6),[c*1.2,.3,0]),this.addPart(n,new tn(.15,.18,.55,6),[c*1.2,.3,.15]),this.addPart(n,new hi(.14,6,6),[c*1.2,-.1,0]),this.addPart(n,new tn(.16,.14,.5,6),[c*1.2,-.45,0]),this.addPart(n,new We(.2,.3,.15),[c*1.2,-.45,.2]),this.addPart(n,new hi(.1,6,6),[c*1.2,-.7,0]),c>0&&(this.addPart(n,new tn(.08,.1,.8,6),[c*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(n,new tn(.05,.06,1,6),[c*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(n,new tn(.07,.09,.1,6),[c*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(n,new We(.2,.12,.3),[c*1.35,-.3,.3]));for(let c=-1;c<=1;c+=2)this.addPart(n,new We(.34,.65,.4),[c*.5,-.32,.32],[c*-.12,0,.12]),this.addPart(n,new hi(.22,6,6),[c*.5,-.62,.4]),this.addPart(n,new We(.3,.72,.36),[c*.5,-.98,-.08],[c*.28,0,0]),this.addPart(n,new hi(.16,6,6),[c*.5,-1.32,-.25]),this.addPart(n,new We(.42,.14,.55),[c*.5,-1.44,.18],[c*.18,0,0]);this.addPart(n,new We(1,.6,.4),[0,.5,-.95]),this.addPart(n,new tn(.35,.4,.4,8),[0,.4,-1.2]);for(let c=-1;c<=1;c+=2)this.addPart(n,new tn(.2,.25,.35,6),[c*.45,.4,-1.15]),this.addPart(n,new tn(.15,.18,.25,6),[c*.35,.85,-.95]);this.addPart(n,new We(.7,.2,.15),[0,-.1,.55]);for(let c=-1;c<=1;c+=2)this.addPart(n,new We(.15,.2,.4),[c*.65,-.1,.2]);const a=new as({color:16755268,transparent:!0,opacity:.9,blending:rl,depthWrite:!1}),l=(c,f)=>{const h=new ln(new ss(.12,.5,6),a);h.name="thruster",h.position.set(c[0],c[1],c[2]),h.rotation.set(f[0],f[1],f[2]),h.scale.set(1,1,.001),n.add(h)};return l([-.5,-1.8,.05],[Math.PI,0,0]),l([.5,-1.8,.05],[Math.PI,0,0]),l([0,.4,-1.38],[-Math.PI/2,0,0]),n}updateThrusters(t,n,a){const l=this.playerMeshes.get(t);if(!l)return;const c=Math.max(0,Math.min(1,n))*(a?1.6:1);l.children.forEach(f=>{if(f.name==="thruster"){const h=f;h.visible=c>.02,h.scale.set(1,1,Math.max(.001,c)),h.material.color.set(a?13691135:16755268)}})}createOutline(t,n){const a=new os;return t.children.forEach(l=>{if(!(l instanceof ln)||l.name==="thruster"||!(l.geometry instanceof An))return;const c=new as({color:n,side:Xn,transparent:!0,opacity:.35,blending:rl,depthWrite:!1}),f=new ln(l.geometry.clone(),c);f.position.copy(l.position),f.rotation.copy(l.rotation),f.scale.copy(l.scale).multiplyScalar(1.04),a.add(f)}),a}createEnemyMesh(t,n,a){const l=new os,c=new as({color:16777215}),f=(h,p,m)=>{const g=new ln(h,c);g.position.set(p[0],p[1],p[2]),m&&g.rotation.set(m[0],m[1],m[2]),l.add(g)};switch(a){case"scout":{f(new fu(n*.7,1),[0,0,0]);for(let h=0;h<4;h++){const p=h/4*Math.PI*2;f(new ss(n*.08,n*.5,4),[Math.cos(p)*n*.6,0,Math.sin(p)*n*.6])}f(new tn(.02,.03,n*.4),[0,n*.5,0]);break}case"assault":{f(new We(n*1,n*.8,n*.7),[0,0,0]),f(new We(n*.7,n*.4,n*.2),[0,0,n*.45]),f(new We(n*.3,n*.25,n*.3),[0,n*.55,0]),f(new We(n*.25,n*.06,.05),[0,n*.55,n*.17]);for(let h=-1;h<=1;h+=2)f(new tn(n*.08,n*.1,n*.4,6),[h*n*.6,n*.1,n*.3],[Math.PI/2,0,0]);break}case"sniper":{f(new tn(n*.2,n*.3,n*1,6),[0,0,0]),f(new tn(n*.06,n*.06,n*.15,6),[0,n*.6,0]),f(new hi(n*.08,6,6),[0,n*.68,0]),f(new tn(n*.04,n*.06,n*1.2,6),[0,0,n*.7],[Math.PI/2,0,0]);for(let h=-1;h<=1;h+=2)f(new tn(n*.04,n*.06,n*.3,4),[h*n*.2,-n*.55,0]);break}case"shield":{f(new We(n*1.2,n*.6,n*.5),[0,0,0]),f(new We(n*1.1,n*.8,n*.15),[0,0,n*.35]),f(new hi(n*.15,6,6),[0,0,n*.45]);for(let h=-1;h<=1;h+=2)f(new tn(n*.1,n*.15,n*.2,6),[h*n*.4,0,-n*.3]);break}case"bomber":{f(new hi(n*.6,8,8),[0,0,0]);for(let h=0;h<8;h++){const p=h/8*Math.PI*2,m=Math.PI*.5,g=new J(Math.cos(p)*Math.sin(m),Math.cos(m),Math.sin(p)*Math.sin(m)),_=new ln(new ss(n*.06,n*.35,4),c);_.position.set(g.x*n*.6,g.y*n*.6,g.z*n*.6),_.quaternion.setFromUnitVectors(new J(0,1,0),g),l.add(_)}break}case"commander":{f(new uu(n*.6),[0,0,0]),f(new ss(n*.1,n*.5,4),[0,n*.6,0]);for(let h=-1;h<=1;h+=2)f(new hi(n*.25,6,6),[h*n*.55,n*.2,0]);f(new We(n*.4,n*.3,n*.2),[0,0,-n*.4]);break}default:{f(new fu(n*.8),[0,0,0]);break}}return l}createBossMesh(t=new fe(16777215),n=4){const a=new os,l=new as({color:16777215}),c=new ln(new uu(n),l);a.add(c);const f=new ln(new xp(n*.4),l);a.add(f);for(let h=0;h<6;h++){const p=new ln(new tn(.3,.4,.8,6),l),m=h/6*Math.PI*2;p.position.set(Math.cos(m)*n*1.1,0,Math.sin(m)*n*1.1),p.rotation.z=Math.PI/2,p.rotation.y=-m,a.add(p)}return a}createProjectileMesh(t,n){const a=new as({color:16777215});let l;switch(n){case"beam":case"sniper":l=new hi(.3,6,6);break;case"missile":l=new ss(.2,.6,6);break;default:l=new hi(.15,4,4)}return new ln(l,a)}createExplosion(t,n,a=1){const c=new Float32Array(90),f=new Float32Array(90),h=new fe(n);for(let M=0;M<30;M++){const E=Math.random()*Math.PI*2,T=Math.random()*Math.PI,S=a*(.5+Math.random()*.5);c[M*3]=t.x+S*Math.sin(T)*Math.cos(E),c[M*3+1]=t.y+S*Math.cos(T),c[M*3+2]=t.z+S*Math.sin(T)*Math.sin(E),f[M*3]=h.r,f[M*3+1]=h.g,f[M*3+2]=h.b}const p=new An;p.setAttribute("position",new On(c,3)),p.setAttribute("color",new On(f,3));const m=new su({size:.5,vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1}),g=new hd(p,m);this.scene.add(g);let _=1;const x=()=>{if(_-=.02,_<=0){this.scene.remove(g),p.dispose(),m.dispose();return}m.opacity=_;const M=p.attributes.position,E=M.array;for(let T=0;T<30;T++)E[T*3]+=(Math.random()-.5)*.5,E[T*3+1]+=(Math.random()-.5)*.5,E[T*3+2]+=(Math.random()-.5)*.5;M.needsUpdate=!0,requestAnimationFrame(x)};x()}updateLockIndicator(t,n,a,l="#00ff44"){const c=this.lockIndicators.get(t);if(!a){c&&(this.scene.remove(c),this.lockIndicators.delete(t));return}if(c){const f=c.geometry.attributes.position,h=f.array;h[0]=n.x,h[1]=n.y,h[2]=n.z,h[3]=a.x,h[4]=a.y,h[5]=a.z,f.needsUpdate=!0;const p=c.material;p.color.getStyle()!==l&&p.color.set(l)}else{const f=new An,h=new Float32Array([n.x,n.y,n.z,a.x,a.y,a.z]);f.setAttribute("position",new On(h,3));const p=new Sx({color:l,transparent:!0,opacity:.5,linewidth:1}),m=new h2(f,p);this.scene.add(m),this.lockIndicators.set(t,m)}}dispose(){this.postFX.dispose(),this.renderer.dispose()}}class A2{constructor(t){At(this,"keys",new Set);At(this,"mouseNormX",.5);At(this,"mouseNormY",.5);At(this,"aimNormX",.5);At(this,"aimNormY",.5);At(this,"mouseDown",!1);At(this,"_weaponSwitch",0);At(this,"_dodge",!1);At(this,"_special",!1);At(this,"_lockToggle",!1);At(this,"lastSpaceTime",0);At(this,"canvasWidth",1);At(this,"canvasHeight",1)}setCanvasSize(t,n){this.canvasWidth=t,this.canvasHeight=n}getMouseNormX(){return this.aimNormX}getMouseNormY(){return this.aimNormY}getRawMouseNormX(){return this.mouseNormX}getRawMouseNormY(){return this.mouseNormY}setAimNorm(t,n){this.aimNormX=t,this.aimNormY=n}has(t){return this.keys.has(t)||this.keys.has(t.toLowerCase())||this.keys.has(t.toUpperCase())}getState(){const t=this._weaponSwitch;this._weaponSwitch=0;const n=this._dodge;this._dodge=!1;const a=this._special;this._special=!1;const l=this._lockToggle;return this._lockToggle=!1,{forward:this.has("w")||this.keys.has("ArrowUp"),backward:this.has("s")||this.keys.has("ArrowDown"),left:this.has("a")||this.keys.has("ArrowLeft"),right:this.has("d")||this.keys.has("ArrowRight"),up:this.has("Shift"),down:this.has("Control"),shoot:this.mouseDown,aimX:this.aimNormX,aimY:this.aimNormY,weaponSwitch:t,boost:this.has(" "),brake:this.has("e"),dodge:n,special:a,lockToggle:l,pause:this.has("Escape")||this.has("Enter")}}keyDown(t){if(this.keys.add(t),t===" "){const a=performance.now();a-this.lastSpaceTime<300&&(this._dodge=!0),this.lastSpaceTime=a}(t==="z"||t==="Z")&&(this._special=!0),t==="Tab"&&(this._lockToggle=!0);const n=parseInt(t,10);n>=1&&n<=9&&(this._weaponSwitch=n)}keyUp(t){this.keys.delete(t),this.keys.delete(t.toLowerCase()),this.keys.delete(t.toUpperCase())}mouseMove(t,n){this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?n/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}const R2=120,Rv=60/R2/4,w2=64,C2=.12,D2=25,U2=[{root:45,tones:[57,60,64]},{root:41,tones:[53,57,60]},{root:38,tones:[50,53,57]},{root:40,tones:[52,55,59]}],wv=r=>440*Math.pow(2,(r-69)/12);class L2{constructor(){At(this,"ctx",null);At(this,"masterGain",null);At(this,"bgmGain",null);At(this,"sfxGain",null);At(this,"initialized",!1);At(this,"bgmTimer",null);At(this,"bgmActiveOscs",[]);At(this,"nextStepTime",0);At(this,"step",0);At(this,"noiseBuffer",null)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=t,a.gain.setValueAtTime(.3,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),n.connect(a),a.connect(this.sfxGain),n.start(),n.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let f=0;f<t;f++)a[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=n;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.value=1200,n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),n.gain.setValueAtTime(.4,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playGlitch(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.currentTime,n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.setValueAtTime(1600,t),n.frequency.exponentialRampToValueAtTime(80,t+.18),a.gain.setValueAtTime(.18,t),a.gain.exponentialRampToValueAtTime(.001,t+.18),n.connect(a),a.connect(this.sfxGain),n.start(t),n.stop(t+.2);const l=this.ctx.sampleRate*.15,c=this.ctx.createBuffer(1,l,this.ctx.sampleRate),f=c.getChannelData(0);for(let m=0;m<l;m++)f[m]=(Math.random()-.5)*(1-m/l);const h=this.ctx.createBufferSource();h.buffer=c;const p=this.ctx.createGain();p.gain.setValueAtTime(.25,t),p.gain.exponentialRampToValueAtTime(.001,t+.15),h.connect(p),p.connect(this.sfxGain),h.start(t)}playDodge(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1800,this.ctx.currentTime+.18),n.gain.setValueAtTime(.25,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.2)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=440,a.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),n.connect(a),a.connect(this.sfxGain),n.start(this.ctx.currentTime+t*.3),n.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){this.ensureCtx(),!(!this.ctx||!this.bgmGain||this.bgmTimer!==null)&&(this.step=0,this.nextStepTime=this.ctx.currentTime+.1,this.bgmTimer=window.setInterval(()=>this.scheduleBgmAhead(),D2))}stopBGM(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null);for(const t of this.bgmActiveOscs)try{t.stop()}catch{}this.bgmActiveOscs.length=0,this.step=0,this.nextStepTime=0}scheduleBgmAhead(){if(!(!this.ctx||!this.bgmGain))for(;this.nextStepTime<this.ctx.currentTime+C2;)this.scheduleStep(this.step,this.nextStepTime),this.nextStepTime+=Rv,this.step=(this.step+1)%w2}scheduleStep(t,n){const a=Math.floor(t/16),l=t%16,c=U2[a];l===0&&this.schedulePad(c,n),(l===0||l===8)&&this.scheduleBass(c,l===8,n),l%8===4&&this.scheduleHat(n)}schedulePad(t,n){if(!this.ctx||!this.bgmGain)return;const a=16*Rv,l=.06,c=.4;for(const f of t.tones)for(const h of[-6,5]){const p=this.ctx.createOscillator(),m=this.ctx.createGain();p.type="sawtooth",p.frequency.value=wv(f),p.detune.value=h,m.gain.setValueAtTime(1e-4,n),m.gain.exponentialRampToValueAtTime(.022,n+l),m.gain.setValueAtTime(.022,n+a-c),m.gain.exponentialRampToValueAtTime(1e-4,n+a-.02),p.connect(m),m.connect(this.bgmGain),this.trackBgmOsc(p),p.start(n),p.stop(n+a)}}scheduleBass(t,n,a){if(!this.ctx||!this.bgmGain)return;const l=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),f=this.ctx.createGain();l.type="sawtooth",l.frequency.value=wv(t.root-12+(n?7:0)),c.type="lowpass",c.frequency.setValueAtTime(420,a),c.frequency.exponentialRampToValueAtTime(120,a+.3),c.Q.value=2;const h=n?.2:.24;f.gain.setValueAtTime(1e-4,a),f.gain.exponentialRampToValueAtTime(.16,a+.01),f.gain.exponentialRampToValueAtTime(1e-4,a+h),l.connect(c),c.connect(f),f.connect(this.bgmGain),this.trackBgmOsc(l),l.start(a),l.stop(a+h+.05)}scheduleHat(t){if(!this.ctx||!this.bgmGain)return;const n=this.getNoiseBuffer();if(!n)return;const a=this.ctx.createBufferSource();a.buffer=n;const l=this.ctx.createBiquadFilter();l.type="highpass",l.frequency.value=6500;const c=this.ctx.createGain();c.gain.setValueAtTime(.035,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),a.connect(l),l.connect(c),c.connect(this.bgmGain),a.start(t),a.stop(t+.08)}getNoiseBuffer(){if(!this.ctx)return null;if(this.noiseBuffer)return this.noiseBuffer;const t=this.ctx.sampleRate*.1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let l=0;l<t;l++)a[l]=Math.random()*2-1;return this.noiseBuffer=n,n}trackBgmOsc(t){this.bgmActiveOscs.push(t),t.onended=()=>{const n=this.bgmActiveOscs.indexOf(t);n>=0&&this.bgmActiveOscs.splice(n,1)}}playBossAnnounce(t){if(this.ensureCtx(),!this.ctx)return;const n=this.ctx.currentTime,a=[...t].reduce((f,h)=>f+h.charCodeAt(0),0),l=120+a%60,c=1+(a>>3)%5/10;this.voiceChip(n,{freq:l,duration:.42,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:34,depth:.55,gainA:.26,gainB:.14,gainC:.1,glideTo:l*.92}),this.voiceChip(n+.3,{freq:l*c,duration:.55,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:30,depth:.5,gainA:.24,gainB:.13,gainC:.09,glideTo:l*c*.9})}playSpecialAnnounce(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.currentTime,n=330;this.voiceChip(t,{freq:n,duration:.8,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:46,depth:.6,gainA:.2,gainB:.14,gainC:.12,glideTo:n*1.8}),this.voiceChip(t+.15,{freq:n*1.25,duration:.6,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:52,depth:.55,gainA:.18,gainB:.12,gainC:.1,glideTo:n*1.25*1.5})}voiceChip(t,n){if(!this.ctx||!this.sfxGain)return;const a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(1,t+.01),a.gain.setValueAtTime(1,t+n.duration*.45),a.gain.exponentialRampToValueAtTime(1e-4,t+n.duration);const l=this.ctx.createGain();l.gain.value=.5;const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sine",c.frequency.value=n.pulseHz,f.gain.value=n.depth,c.connect(f),f.connect(l.gain),c.start(t),c.stop(t+n.duration);const h=[[n.waveA,n.freq,n.gainA],[n.waveB,n.freq*1.005,n.gainB],[n.waveC,n.freq*2.01,n.gainC]];for(const[p,m,g]of h){const _=this.ctx.createOscillator(),x=this.ctx.createGain();_.type=p,_.frequency.setValueAtTime(m,t),_.frequency.exponentialRampToValueAtTime(n.glideTo*(m/n.freq),t+n.duration),x.gain.value=g,_.connect(x),x.connect(l),_.start(t),_.stop(t+n.duration+.02)}l.connect(a),a.connect(this.sfxGain)}playIntroSting(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.currentTime,n=this.ctx.createOscillator(),a=this.ctx.createGain(),l=this.ctx.createBiquadFilter();n.type="sawtooth",n.frequency.setValueAtTime(55,t),n.frequency.exponentialRampToValueAtTime(110,t+3),l.type="lowpass",l.frequency.setValueAtTime(200,t),l.frequency.exponentialRampToValueAtTime(900,t+3),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(.15,t+1.5),a.gain.exponentialRampToValueAtTime(1e-4,t+3),n.connect(l).connect(a).connect(this.sfxGain),n.start(t),n.stop(t+3);const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sawtooth",c.frequency.setValueAtTime(220,t+.8),c.frequency.exponentialRampToValueAtTime(880,t+1.6),f.gain.setValueAtTime(1e-4,t+.8),f.gain.exponentialRampToValueAtTime(.12,t+1.2),f.gain.exponentialRampToValueAtTime(1e-4,t+2.2),c.connect(f).connect(this.sfxGain),c.start(t+.8),c.stop(t+2.2);const h=this.ctx.createOscillator(),p=this.ctx.createGain();h.type="sine",h.frequency.setValueAtTime(90,t+.8),h.frequency.exponentialRampToValueAtTime(40,t+1.2),p.gain.setValueAtTime(1e-4,t+.8),p.gain.exponentialRampToValueAtTime(.35,t+.82),p.gain.exponentialRampToValueAtTime(1e-4,t+1.3),h.connect(p).connect(this.sfxGain),h.start(t+.8),h.stop(t+1.3)}}const fi=new L2;var Ee=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(Ee||{}),Gt=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Gt||{}),Ke=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(Ke||{}),Ai=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(Ai||{});const rp=[{id:1,name:"光束机枪",type:Ke.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:Ai.FreeFire,smartRadius:60},{id:2,name:"追踪导弹",type:Ke.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:Ai.LockRequired,smartRadius:95},{id:3,name:"光束加农",type:Ke.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:Ai.LockRequired,smartRadius:80},{id:4,name:"散射弹幕",type:Ke.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:Ai.FreeFire,smartRadius:110},{id:5,name:"狙击光束",type:Ke.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:Ai.LockRequired,smartRadius:45},{id:6,name:"浮游炮",type:Ke.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:Ai.LockShortRange,smartRadius:130}];function Hs(r){return rp.find(t=>t.id===r)||rp[0]}const Cv=[{type:Ee.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:Ee.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:Ee.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:Ee.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:Ee.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:Ee.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function sl(r){return Cv.find(t=>t.type===r)||Cv[0]}function qi(r,t,n,a,l){return{hpPercent:r,speed:t,attacks:n,minionSpawn:a,attackPattern:l}}const Dv=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[qi(1,5,["弹幕散布"],!0,"spread"),qi(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),qi(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[qi(1,12,["高速突进"],!1,"rush"),qi(.6,15,["高速突进","分身攻击"],!0,"clone"),qi(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[qi(1,4,["多重导弹"],!1,"missile"),qi(.75,6,["多重导弹","力场护盾"],!1,"shield"),qi(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),qi(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function ol(r){return Dv.find(t=>t.id===r)||Dv[0]}function Ye(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function Re(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function Ue(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function bx(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function mn(r,t){return bx(Re(r,t))}function Me(r){const t=bx(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function Hn(r,t,n){return Math.max(t,Math.min(n,r))}function kr(r,t){return r+Math.random()*(t-r)}function N2(r,t){return Math.floor(kr(r,t+1))}function O2(r,t,n,a,l,c){switch(r.type){case Ee.Scout:z2(r,t,n,a,l,c);break;case Ee.Assault:B2(r,t,n,a,l,c);break;case Ee.Sniper:I2(r,t,n,a,l,c);break;case Ee.Shield:F2(r,t,n,a,l,c);break;case Ee.Bomber:G2(r,t,n,a,l,c);break;case Ee.Commander:H2(r,t,n,a,l,c);break;default:P2(r,t,n,a,l,c)}}function P2(r,t,n,a,l,c){switch(r.state){case Gt.Patrol:n<a.alertRange&&(r.state=Gt.Chase);break;case Gt.Chase:if(n<a.attackRange)r.state=Gt.Attack;else if(n>a.alertRange*1.5)r.state=Gt.Patrol;else{const h=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(h,r.speed*l))}break;case Gt.Attack:n>a.attackRange*1.2&&(r.state=Gt.Chase),r.attackTimer-=l,r.attackTimer<=0&&(c.fire(r,t),r.attackTimer=.8+Math.random()*.6);break;case Gt.Flee:r.hp>a.hp*.3&&(r.state=Gt.Chase);const f=Me(Re(r.pos,t.pos));r.pos=Ye(r.pos,Ue(f,r.speed*1.5*l));break}}function z2(r,t,n,a,l,c){switch(r.state){case Gt.Patrol:n<a.alertRange&&(r.state=Gt.Chase);break;case Gt.Chase:if(n<a.attackRange)r.state=Gt.Attack;else if(n>a.alertRange*1.5)r.state=Gt.Patrol;else{const m=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(m,r.speed*l))}break;case Gt.Attack:n>a.attackRange*1.3&&(r.state=Gt.Chase);const f=Me(Re(r.pos,t.pos)),h={x:-f.z,y:0,z:f.x};r.pos=Ye(r.pos,Ue(h,r.speed*.8*l)),r.attackTimer-=l,r.attackTimer<=0&&(c.fire(r,t),r.attackTimer=.5+Math.random()*.5);break;case Gt.Flee:r.hp>a.hp*.3&&(r.state=Gt.Chase);const p=Me(Re(r.pos,t.pos));r.pos=Ye(r.pos,Ue(p,r.speed*1.5*l));break}}function B2(r,t,n,a,l,c){switch(r.state){case Gt.Patrol:n<a.alertRange&&(r.state=Gt.Chase);break;case Gt.Chase:const f=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(f,r.speed*l)),n<a.attackRange&&(r.state=Gt.Attack);break;case Gt.Attack:const h=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(h,r.speed*.5*l)),r.attackTimer-=l,r.attackTimer<=0&&(c.fire(r,t),r.attackTimer=.3+Math.random()*.3),n>a.attackRange*1.5&&(r.state=Gt.Chase);break;case Gt.Flee:r.hp>a.hp*.3&&(r.state=Gt.Chase);const p=Me(Re(r.pos,t.pos));r.pos=Ye(r.pos,Ue(p,r.speed*1.5*l));break}}function I2(r,t,n,a,l,c){switch(r.state){case Gt.Patrol:n<a.alertRange&&(r.state=Gt.Chase);break;case Gt.Chase:if(n<a.attackRange)r.state=Gt.Attack;else{const h=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(h,r.speed*l))}break;case Gt.Attack:if(n<a.attackRange*.5){const h=Me(Re(r.pos,t.pos));r.pos=Ye(r.pos,Ue(h,r.speed*l))}else n>a.attackRange*1.2&&(r.state=Gt.Chase);r.attackTimer-=l,r.attackTimer<=0&&(c.fire(r,t),r.attackTimer=1+Math.random()*.5);break;case Gt.Flee:r.hp>a.hp*.3&&(r.state=Gt.Chase);const f=Me(Re(r.pos,t.pos));r.pos=Ye(r.pos,Ue(f,r.speed*1.5*l));break}}function F2(r,t,n,a,l,c){switch(r.state){case Gt.Patrol:n<a.alertRange&&(r.state=Gt.Chase);break;case Gt.Chase:if(n<a.attackRange)r.state=Gt.Attack;else if(n>a.alertRange*1.5)r.state=Gt.Patrol;else{const p=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(p,r.speed*l))}break;case Gt.Attack:const f=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(f,r.speed*.3*l)),r.attackTimer-=l,r.attackTimer<=0&&(c.fire(r,t),r.attackTimer=1.2+Math.random()*.8),n>a.attackRange*1.5&&(r.state=Gt.Chase);break;case Gt.Flee:r.hp>a.hp*.3&&(r.state=Gt.Chase);const h=Me(Re(r.pos,t.pos));r.pos=Ye(r.pos,Ue(h,r.speed*1.5*l));break}}function G2(r,t,n,a,l,c){switch(r.state){case Gt.Patrol:n<a.alertRange&&(r.state=Gt.Chase);break;case Gt.Chase:case Gt.Attack:const f=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(f,r.speed*l));break}n<3&&c.onBomberContact(r,t,a.damage)}function H2(r,t,n,a,l,c){switch(c.enemies.forEach(f=>{if(f.id===r.id||f.hp<=0)return;mn(r.pos,f.pos)<30&&(f.speed=a.speed*1.3)}),r.state){case Gt.Patrol:n<a.alertRange&&(r.state=Gt.Chase);break;case Gt.Chase:if(n<a.attackRange)r.state=Gt.Attack;else if(n>a.alertRange*1.5)r.state=Gt.Patrol;else{const h=Me(Re(t.pos,r.pos));r.pos=Ye(r.pos,Ue(h,r.speed*l))}break;case Gt.Attack:n>a.attackRange*1.2&&(r.state=Gt.Chase),r.attackTimer-=l,r.attackTimer<=0&&(c.fire(r,t),r.attackTimer=.6+Math.random()*.4);break;case Gt.Flee:r.hp>a.hp*.3&&(r.state=Gt.Chase);const f=Me(Re(r.pos,t.pos));r.pos=Ye(r.pos,Ue(f,r.speed*1.5*l));break}}function zr(r,t,n,a,l,c,f,h,p){return{id:r(),pos:{...t},vel:Ue(n,a),damage:l,owner:0,type:c,lifetime:f,radius:h,color:p}}function V2(r,t,n,a,l){const{genId:c,patternState:f,target:h}=l;switch(t.id+1e4,r){case"spread":{for(let p=0;p<12;p++){const m=p/12*Math.PI*2,g={x:Math.cos(m),y:0,z:Math.sin(m)};l.spawnProjectile(zr(c,t.pos,g,10,5,Ke.BossBullet,4,.3,"#ff4444"))}break}case"laser":case"finalBeam":{if(!h)return;const p=Me(Re(h.pos,t.pos));l.spawnProjectile(zr(c,t.pos,p,30,25,Ke.Laser,2,.5,"#ff0000"));break}case"missile":{if(!h)return;for(let p=0;p<5;p++){const m=Me(Re(h.pos,t.pos)),g={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2};l.spawnProjectile(zr(c,t.pos,Ye(m,g),8,10,Ke.Missile,5,.4,"#ffaa00"))}break}case"rush":{if(!h)return;t.speed=20;const p=Me(Re(h.pos,t.pos));t.pos=Ye(t.pos,Ue(p,t.speed*a));break}case"clone":{if(!h)return;const p=Me(Re(h.pos,t.pos)),m=Math.atan2(p.z,p.x);for(let g=-2;g<=2;g++){const _=m+g*.6,x=Me({x:Math.cos(_),y:p.y,z:Math.sin(_)});l.spawnProjectile(zr(c,t.pos,x,16,8,Ke.BossBullet,3.5,.3,"#ff00ff"))}break}case"fullLaser":{for(let p=0;p<6;p++){const m=f.sweepAngle+p/6*Math.PI*2,g={x:Math.cos(m),y:0,z:Math.sin(m)};l.spawnProjectile(zr(c,t.pos,g,26,15,Ke.Laser,2.2,.5,"#ff00ff"))}f.sweepAngle+=Math.PI/8;break}case"shield":{t.shieldTimer=Math.max(t.shieldTimer||0,4);break}case"laserNet":{if(!h)return;const p=Me(Re(h.pos,t.pos)),m=Math.atan2(p.z,p.x)+f.netAngle;for(let g=0;g<9;g++){const _=g/8-.5,x=m+_*Math.PI*.66,M={x:Math.cos(x),y:0,z:Math.sin(x)};l.spawnProjectile(zr(c,t.pos,M,25,12,Ke.Laser,2.5,.4,"#ffaa00"))}f.netAngle+=Math.PI/9;break}case"spawn":{if(n.minionSpawn)for(let p=0;p<3;p++){const m={id:c(),type:Ee.Scout,pos:{x:t.pos.x+kr(-5,5),y:0,z:t.pos.z+kr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Gt.Chase,targetId:0,attackTimer:1};l.spawnMinion(m)}break}}}function Uv(r){return r===Ee.Boss?4:1.5}function k2(r){const t=[Ee.Scout,Ee.Assault,Ee.Shield];return r>2&&t.push(Ee.Sniper),r>3&&t.push(Ee.Bomber),r>4&&t.push(Ee.Commander),t}function X2(r){return r%JS===0}let Ax=1;function Br(){return Ax++}const q2=4,W2=1.5,Lv=3,dd=.6,Nv=2.5,Y2=6,j2=60,Z2=4;class K2{constructor(){At(this,"players",[]);At(this,"enemies",[]);At(this,"projectiles",[]);At(this,"wave",0);At(this,"lockOn",!1);At(this,"lockTargetId",null);At(this,"aimNormX",.5);At(this,"aimNormY",.5);At(this,"enemyVels",new Map);At(this,"velocities",[]);At(this,"currentBossIndex",-1);At(this,"fireTimers",[]);At(this,"dodgeTimer",0);At(this,"dodgeCooldown",0);At(this,"enemySpawnTimer",0);At(this,"waveTimer",0);At(this,"levelSpawned",0);At(this,"bossCount",0);At(this,"bossPhase",1);At(this,"bossAttackTimer",0);At(this,"bossSweepAngle",0);At(this,"bossNetAngle",0);At(this,"comboTimeout",[0]);At(this,"enemyLastPos",new Map);At(this,"firstKillDone",!1);At(this,"events",[])}start(t){this.players=t.map(n=>({...n})),this.velocities=this.players.map(()=>({x:0,y:0,z:0})),this.fireTimers=this.players.map(()=>0),this.dodgeTimer=0,this.dodgeCooldown=0,this.enemies=[],this.projectiles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0,this.enemySpawnTimer=0,this.waveTimer=0,this.wave=0,this.lockOn=!1,this.lockTargetId=null,this.enemyLastPos.clear(),this.enemyVels.clear(),this.firstKillDone=!1,this.aimNormX=.5,this.aimNormY=.5,Ax=1}update(t,n){return this.events=[],this.updatePlayers(t,[n.input],n),this.updateEnemies(t,n),this.updateProjectiles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateBoss(t),this.events}emit(t){this.events.push(t)}explode(t,n,a){this.emit({type:"explosion",pos:{...t},color:n,size:a})}updatePlayers(t,n,a){this.players.forEach((l,c)=>{if(!l.alive)return;const f=n[c];for(const G of rp)this.wave>=G.unlockLevel&&!l.weapons.includes(G.id)&&l.weapons.push(G.id);(l.weapon===0||!l.weapons.includes(l.weapon))&&(l.weapon=l.weapons[0]);const h=this.velocities[c],p=(f.right?1:0)-(f.left?1:0),m=(f.up?1:0)-(f.down?1:0),g=(f.forward?1:0)-(f.backward?1:0),_=Math.sqrt(p*p+m*m+g*g),x=f.boost&&l.energy>0,M=x?$S:1,E=l.speed*M,T=f.brake?aM:iM;x?l.energy=Math.max(0,l.energy-ZS*t):l.energy=Math.min(l.maxEnergy,l.energy+l.maxEnergy*.25*t),this.updateLock(f,l,a);const S=a.crosshairDir,v={x:-S.z,z:S.x},U=(G,D,R)=>({x:R*S.x+G*v.x,y:D,z:R*S.z+G*v.z});if(this.dodgeCooldown-=t,f.dodge&&this.dodgeCooldown<=0&&(this.dodgeTimer=dM,this.dodgeCooldown=pM,l.invulnTimer=Math.max(l.invulnTimer,mM),this.emit({type:"sound",sound:"dodge"})),this.dodgeTimer>0){this.dodgeTimer-=t;let G=0,D=0,R=0;if(_>.001){const F=1/_,$=U(p,m,g);G=$.x*F,D=$.y*F,R=$.z*F}else{const F=this.computeAimDir(l,a);G=F.x,D=F.y,R=F.z}h.x=G*l.speed*Nh,h.y=D*l.speed*Nh,h.z=R*l.speed*Nh,l.pos.x+=h.x*t,l.pos.y+=h.y*t,l.pos.z+=h.z*t}else{let G=0,D=0,R=0;if(_>.001){const it=1/_,ut=U(p,m,g);G=ut.x*E*it,D=ut.y*E*it,R=ut.z*E*it}const F=1-Math.exp(-T*t);h.x+=(G-h.x)*F,h.y+=(D-h.y)*F,h.z+=(R-h.z)*F;const $=Math.exp(-1.2*t);h.x*=$,h.y*=$,h.z*=$,l.pos.x+=h.x*t,l.pos.y+=h.y*t,l.pos.z+=h.z*t}l.pos.x=Hn(l.pos.x,-200,200),l.pos.y=Hn(l.pos.y,-60,60),l.pos.z=Hn(l.pos.z,-200,200);let w=Math.atan2(S.x,S.z)-l.rot.y;for(;w>Math.PI;)w-=Math.PI*2;for(;w<-Math.PI;)w+=Math.PI*2;l.rot.y+=Hn(w,-__*t,__*t);const B=-Math.asin(Hn(S.y,-1,1))-l.rot.x;l.rot.x+=Hn(B,-v_*t,v_*t);const O=Hn(h.x/E,-1,1)*.35;l.rot.z=l.rot.z+(O-l.rot.z)*.15,this.fireTimers[c]-=t,f.shoot&&this.fireTimers[c]<=0&&(this.playerShoot(l,c,a),this.fireTimers[c]=Hs(l.weapon).fireRate),f.weaponSwitch>0&&l.weapons.includes(f.weaponSwitch)&&(l.weapon=f.weaponSwitch),l.invulnTimer>0&&(l.invulnTimer-=t),l.specialGauge=Math.min(l.specialGauge+t*2,l.maxSpecialGauge),f.special&&l.specialGauge>=100&&(this.useSpecial(l,c),l.specialGauge=0),l.combo>0&&(this.comboTimeout[c]-=t,this.comboTimeout[c]<=0&&(l.combo=0))})}updateLock(t,n,a){if(t.lockToggle&&(this.lockOn=!this.lockOn,this.lockOn||(this.lockTargetId=null)),!this.lockOn){this.lockTargetId=null,this.aimNormX=a.rawAim.x,this.aimNormY=a.rawAim.y;return}const l=this.lockTargetId!==null?this.enemies.find(p=>p.id===this.lockTargetId&&p.hp>0):null;if(!l||mn(l.pos,n.pos)>Uh){let p=null,m=Uh;for(const g of this.enemies){if(g.hp<=0)continue;const _=mn(n.pos,g.pos);_<m&&(m=_,p=g)}this.lockTargetId=p?p.id:null}let c=a.rawAim.x,f=a.rawAim.y;const h=this.lockTargetId!==null?this.enemies.find(p=>p.id===this.lockTargetId&&p.hp>0):null;if(h&&a.lockStickPoint){const p=mn(n.pos,h.pos),m=eM*Math.max(0,1-p/Uh);c=c+(a.lockStickPoint.x-c)*m,f=f+(a.lockStickPoint.y-f)*m}this.aimNormX=Hn(c,0,1),this.aimNormY=Hn(f,0,1)}getLockEnemy(){return!this.lockOn||this.lockTargetId===null?null:this.enemies.find(t=>t.id===this.lockTargetId&&t.hp>0)||null}computeAimDir(t,n){const a=n.crosshairDir,l=n.aimOrigin;let c=1/0,f=null;for(const h of this.enemies){if(h.hp<=0)continue;const p=Uv(h.type),m=l.x-h.pos.x,g=l.y-h.pos.y,_=l.z-h.pos.z,x=m*a.x+g*a.y+_*a.z,M=m*m+g*g+_*_-p*p,E=x*x-M;if(E<0)continue;const T=-x-Math.sqrt(E);T>=0&&T<c&&(c=T,f=h)}return f?Me(Re(f.pos,t.pos)):n.crosshairDir}computeLeadDir(t,n,a){const l=this.enemyVels.get(n.id)||{x:0,y:0,z:0},c=a>.001?mn(t.pos,n.pos)/a:0;let f=Ye(n.pos,Ue(l,c));const h=mn(t.pos,f);return a>.001&&h>.001&&(f=Ye(n.pos,Ue(l,h/a))),Me(Re(f,t.pos))}playerShoot(t,n,a){const l=Hs(t.weapon),c=this.lockOn?this.lockTargetId:null,f=c!==null?this.enemies.find(E=>E.id===c&&E.hp>0):null,h=f?mn(f.pos,t.pos):1/0,p=Math.max(l.lockRange,_d),m=f!==null&&h<=p;if(l.fireMode===Ai.LockRequired&&!m)return;let g;const _=a.smartTargetId!==null&&this.enemies.find(E=>E.id===a.smartTargetId&&E.hp>0)||null,x=f&&m?f:_;x?g=this.computeLeadDir(t,x,l.speed):g=this.computeAimDir(t,a);const M=l.fireMode===Ai.LockShortRange&&m;if(l.type===Ke.Funnel)for(let E=0;E<Lv;E++){const T={id:Br(),pos:{...t.pos},vel:{x:0,y:0,z:0},damage:l.damage,owner:t.id,type:Ke.Funnel,lifetime:Z2,radius:.3,color:l.color,phase:"orbit",phaseTimer:dd,orbitAngle:E/Lv*Math.PI*2};this.projectiles.length<Dh&&this.projectiles.push(T)}else for(let E=0;E<(l.type===Ke.Spread?5:1);E++){const T=l.spread*(Math.random()-.5)*2,S=Me(Ye(g,{x:T,y:T*.5,z:0})),v={id:Br(),pos:{...t.pos},vel:Ue(S,l.speed),damage:l.damage,owner:t.id,type:l.type,lifetime:3,radius:.3,color:l.color};M&&f&&(v.vel=Ue(Me(Re(f.pos,t.pos)),l.speed)),this.projectiles.length<Dh&&this.projectiles.push(v)}this.emit({type:"sound",sound:"shoot",freq:600+Math.random()*400})}useSpecial(t,n){this.emit({type:"sound",sound:"special"}),this.emit({type:"sound",sound:"specialAnnounce"}),this.enemies.forEach(a=>{mn(a.pos,t.pos)<50&&(a.hp-=150,this.explode(a.pos,"#00ffff",2))})}updateEnemies(t,n){this.enemies.forEach(a=>{if(a.hp<=0){this.explode(a.pos,a.type===Ee.Boss?"#ff4400":"#ff6644",a.type===Ee.Boss?3:1),this.emit({type:"sound",sound:"explosion"}),this.enemyLastPos.delete(a.id),this.enemyVels.delete(a.id),this.firstKillDone||(this.firstKillDone=!0,this.emit({type:"fx",fx:"edgePulse"}),this.emit({type:"fx",fx:"timeDilation",value:.2}),this.emit({type:"sound",sound:"glitch"}),this.emit({type:"fx",fx:"shake",value:.25})),this.players.forEach((m,g)=>{const _=a.type===Ee.Boss?ol(this.currentBossIndex+1).score:sl(a.type).score;m.score+=_,m.kills++,m.combo++,this.comboTimeout[g]=tM});return}const l=this.players.find(m=>m.alive);if(!l)return;const c=mn(a.pos,l.pos),f=sl(a.type),h={enemies:this.enemies,invulnDuration:Ch,fire:(m,g)=>this.enemyShoot(m,g),onBomberContact:(m,g,_)=>{this.explode(m.pos,"#ff4400",2),this.emit({type:"sound",sound:"explosion"}),g.hp-=_,g.invulnTimer=Ch,m.hp=0}};if(O2(a,l,c,f,t,h),a.state===Gt.Patrol&&a.type!==Ee.Boss){const m=Me(Re(l.pos,a.pos));a.pos=Ye(a.pos,Ue(m,a.speed*.4*t))}a.state===Gt.Flee&&a.fleeTimer!==void 0&&(a.fleeTimer-=t,a.fleeTimer<=0&&(a.state=Gt.Chase)),a.hp<f.hp*.3&&a.type!==Ee.Boss&&a.type!==Ee.Bomber&&a.state!==Gt.Flee&&a.fleeTimer===void 0&&(a.state=Gt.Flee,a.fleeTimer=hM),a.pos.x=Hn(a.pos.x,-200,200),a.pos.y=Hn(a.pos.y,-60,60),a.pos.z=Hn(a.pos.z,-200,200);const p=this.enemyLastPos.get(a.id);p?this.enemyVels.set(a.id,Ue(Re(a.pos,p),1/Math.max(t,1e-4))):this.enemyVels.set(a.id,{x:0,y:0,z:0}),this.enemyLastPos.set(a.id,{x:a.pos.x,y:a.pos.y,z:a.pos.z})}),this.enemies=this.enemies.filter(a=>a.hp>0)}enemyShoot(t,n){const a=Me(Re(n.pos,t.pos)),l=sl(t.type),c={id:Br(),pos:{...t.pos},vel:Ue(a,25),damage:l.damage,owner:t.id+1e4,type:Ke.BossBullet,lifetime:4,radius:.3,color:l.color};this.projectiles.length<Dh&&this.projectiles.push(c)}updateProjectiles(t){this.projectiles.forEach(n=>{n.type===Ke.Missile?this.steerMissile(n,t):n.type===Ke.Funnel&&this.updateFunnel(n,t),n.pos=Ye(n.pos,Ue(n.vel,t)),n.lifetime-=t}),this.projectiles=this.projectiles.filter(n=>n.lifetime>0)}steerMissile(t,n){const a=t.owner>=1e4,l=(a?W2:q2)*n;let c=null;if(a){let S=null,v=1/0;for(const U of this.players){if(!U.alive)continue;const L=mn(t.pos,U.pos);L<v&&(v=L,S=U)}S&&(c=Me(Re(S.pos,t.pos)))}else{let S=null;const v=this.lockOn?this.lockTargetId:null;if(v!=null){const U=this.enemies.find(L=>L.id===v&&L.hp>0);U&&(S=U)}if(!S){let U=1/0;for(const L of this.enemies){if(L.hp<=0)continue;const w=mn(t.pos,L.pos);w<U&&(U=w,S=L)}}S&&(c=Me(Re(S.pos,t.pos)))}if(!c)return;const f=Math.sqrt(t.vel.x*t.vel.x+t.vel.y*t.vel.y+t.vel.z*t.vel.z);if(f<1e-4)return;const h=Me(t.vel),p=Hn(h.x*c.x+h.y*c.y+h.z*c.z,-1,1),m=Math.acos(p);if(m<=l||m<1e-6){t.vel=Ue(c,f);return}let g=h.y*c.z-h.z*c.y,_=h.z*c.x-h.x*c.z,x=h.x*c.y-h.y*c.x;const M=Math.sqrt(g*g+_*_+x*x);if(M<1e-6){const S=Math.abs(h.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};g=h.y*S.z-h.z*S.y,_=h.z*S.x-h.x*S.z,x=h.x*S.y-h.y*S.x}else g/=M,_/=M,x/=M;const E=Math.cos(l),T=Math.sin(l);t.vel={x:(h.x*E+(_*h.z-x*h.y)*T)*f,y:(h.y*E+(x*h.x-g*h.z)*T)*f,z:(h.z*E+(g*h.y-_*h.x)*T)*f}}updateFunnel(t,n){const a=this.players.find(l=>l.id===t.owner);if(!(!a||!a.alive)&&t.phase!=="strike"){t.phaseTimer=(t.phaseTimer??dd)-n;const l=(t.orbitAngle??0)+Y2*n;if(t.orbitAngle=l,t.pos={x:a.pos.x+Math.cos(l)*Nv,y:a.pos.y+Math.sin(l*3)*.6,z:a.pos.z+Math.sin(l)*Nv},t.vel={x:0,y:0,z:0},t.phaseTimer<=0){let c=null,f=1/0;for(const h of this.enemies){if(h.hp<=0)continue;const p=mn(t.pos,h.pos);p<f&&(f=p,c=h)}c?(t.phase="strike",t.vel=Ue(Me(Re(c.pos,t.pos)),j2)):(t.phase="orbit",t.phaseTimer=dd)}}}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(n=>{const a=Uv(n.type);mn(t.pos,n.pos)<a&&(n.hp-=(n.shieldTimer||0)>0?t.damage*.5:t.damage,t.lifetime=0,this.explode(t.pos,"#ffaa00",.5),this.emit({type:"sound",sound:"hit"}))})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(n=>{!n.alive||n.invulnTimer>0||mn(t.pos,n.pos)<1.5&&(n.hp-=t.damage,t.lifetime=0,n.invulnTimer=Ch,this.emit({type:"fx",fx:"shake",value:.15}),this.explode(t.pos,"#ff4444",.5),this.emit({type:"sound",sound:"hit"}),n.hp<=0&&(n.alive=!1,this.explode(n.pos,"#4488ff",3)))})})}spawnEnemies(t){if(this.wave<1){this.levelSpawned=0,this.enemySpawnTimer=0,this.waveTimer=0,this.wave=1;return}if(this.waveTimer>0){this.waveTimer-=t;return}const n=X2(this.wave);if(n&&!this.enemies.some(h=>h.type===Ee.Boss)&&this.currentBossIndex<0){this.spawnBoss();return}const a=n?0:Math.min(6+this.wave,g_);if(this.enemySpawnTimer+=t,this.levelSpawned<a&&this.enemies.length<g_&&this.enemySpawnTimer>=.15){this.enemySpawnTimer=0;const h=k2(this.wave),p=h[N2(0,h.length-1)],m=sl(p);let g;do{const x=kr(30,Math.min(m.alertRange+25,80)),M=Math.random()*Math.PI*2,E=kr(-.5,.5);g={x:this.players[0].pos.x+Math.sin(M)*x,y:Hn(this.players[0].pos.y+Math.sin(E)*x,-30,30),z:this.players[0].pos.z+Math.cos(M)*x}}while(this.players.some(x=>mn(g,x.pos)<20));const _={id:Br(),type:p,pos:g,rot:{x:0,y:0,z:0},hp:m.hp*(1+this.wave*.1),maxHp:m.hp,speed:m.speed*(1+this.wave*.05),state:Gt.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(_),this.levelSpawned++}const l=this.enemies.some(h=>h.type===Ee.Boss),c=this.enemies.some(h=>h.hp>0);(n?this.currentBossIndex>=0&&!l:this.levelSpawned>=a&&!c)&&(this.enemies=[],this.levelSpawned=0,this.enemySpawnTimer=0,this.currentBossIndex=-1,this.waveTimer=2.5,this.wave+=1)}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0;const n=ol(t+1),a={x:kr(-30,30),y:5,z:-50},l={id:Br(),type:Ee.Boss,pos:a,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Gt.Phase1,targetId:0,attackTimer:2,phase:1,shieldTimer:0};this.enemies.push(l),this.emit({type:"sound",sound:"bossWarning"}),this.emit({type:"sound",sound:"bossAnnounce",param:n.name})}updateBoss(t){const n=this.enemies.find(f=>f.type===Ee.Boss);if(!n)return;const a=ol(this.currentBossIndex+1),l=n.hp/n.maxHp;if(a.phases.forEach((f,h)=>{l<=f.hpPercent&&(n.phase||1)<=h&&(n.phase=h+1,n.speed=f.speed,n.state=["phase1","phase2","phase3","phase4"][h])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(m=>m.alive);if(!f)return;const h=a.phases[(n.phase||1)-1],p={sweepAngle:this.bossSweepAngle,netAngle:this.bossNetAngle};V2(h.attackPattern,n,h,t,{genId:Br,target:f,patternState:p,spawnProjectile:m=>{m.owner=n.id+1e4,this.projectiles.push(m)},spawnMinion:m=>{this.enemies.push(m)}}),this.bossSweepAngle=p.sweepAngle,this.bossNetAngle=p.netAngle}const c=this.players.find(f=>f.alive);if(c){const f=a.phases[(n.phase||1)-1],h=Me(Re(c.pos,n.pos));n.pos=Ye(n.pos,Ue(h,(f?f.speed:n.speed)*t))}(n.shieldTimer||0)>0&&(n.shieldTimer=Math.max(0,(n.shieldTimer||0)-t))}}class Q2{constructor(t){At(this,"scene");At(this,"input");At(this,"canvas");At(this,"sim");At(this,"active",!1);At(this,"accumulator",0);At(this,"lastTime",0);At(this,"animFrameId",0);At(this,"lastInput",null);At(this,"brakePitch",0);At(this,"cameraStiffness",Jc);At(this,"cameraShake",0);At(this,"lastLoopError",0);At(this,"enemyOutlineRef",null);At(this,"gameLoop",t=>{if(this.active){this.animFrameId=requestAnimationFrame(this.gameLoop);try{const n=Math.min((t-this.lastTime)/1e3,.05);this.lastTime=t;const a=gn.getState().game.timeDilationUntil,c=t<a?n*.3:n;for(this.accumulator+=c;this.accumulator>=Tc;)this.step(Tc),this.accumulator-=Tc;this.render(n)}catch(n){Date.now()-this.lastLoopError>1e3&&(this.lastLoopError=Date.now(),console.error("[gameLoop]",n))}}});this.canvas=t,this.scene=new b2(t,t.width,t.height),this.input=new A2(0),this.input.setCanvasSize(t.width,t.height),this.sim=new K2}start(){const t=gn.getState();this.sim.start(t.players),this.active=!0,this.lastTime=performance.now(),this.accumulator=0,this.cameraShake=0,this.brakePitch=0,this.cameraStiffness=Jc,this.lastInput=null,this.sim.players.forEach((n,a)=>{const l=a===0?new fe(4491519):new fe(16737860),c=this.scene.createPlayerMesh(l);c.position.set(n.pos.x,n.pos.y,n.pos.z),this.scene.playerMeshes.set(n.id,c),this.scene.scene.add(c);const f=this.scene.createOutline(c,"#4488ff");f.name="self-outline",c.add(f)}),fi.init(),fi.startBGM(),fi.playIntroSting(),t.setGame({introActive:!0}),this.scene.startIntro(this.sim.players[0].pos,()=>{gn.getState().setGame({introActive:!1})}),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),fi.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,n){this.scene.resize(t,n),this.input.setCanvasSize(t,n)}step(t){if(gn.getState().game.introActive){this.input.getState();return}const n=this.input.getState();this.lastInput=n;const a={x:this.input.getRawMouseNormX(),y:this.input.getRawMouseNormY()},l=this.sim.players[0],c=this.scene.camera.position,f={input:n,rawAim:a,crosshairDir:this.computeCrosshairDir(l),aimOrigin:{x:c.x,y:c.y,z:c.z},smartTargetId:this.pickSmartTarget(l),lockStickPoint:this.lockStickPoint()},h=this.sim.update(t,f);this.input.setAimNorm(this.sim.aimNormX,this.sim.aimNormY),this.dispatch(h),this.syncMeshes(),this.syncStore()}dispatch(t){for(const n of t)switch(n.type){case"sound":switch(n.sound){case"shoot":fi.playShoot(n.freq);break;case"hit":fi.playHit();break;case"explosion":fi.playExplosion();break;case"dodge":fi.playDodge();break;case"special":fi.playSpecial();break;case"specialAnnounce":fi.playSpecialAnnounce();break;case"glitch":fi.playGlitch();break;case"bossWarning":fi.playBossWarning();break;case"bossAnnounce":fi.playBossAnnounce(n.param||"");break}break;case"explosion":this.scene.createExplosion(n.pos,n.color,n.size);break;case"fx":switch(n.fx){case"edgePulse":gn.getState().triggerEdgePulse();break;case"timeDilation":gn.getState().triggerTimeDilation(n.value??.2);break;case"shake":this.cameraShake=Math.max(this.cameraShake,n.value??0);break}break}}syncMeshes(){for(const t of this.sim.enemies)if(t.type===Ee.Boss){if(!this.scene.bossMeshes.has(t.id)){const n=ol(this.sim.currentBossIndex+1),a=this.scene.createBossMesh(new fe(n.color),n.size);a.position.set(t.pos.x,t.pos.y,t.pos.z),this.scene.bossMeshes.set(t.id,a),this.scene.scene.add(a)}}else if(!this.scene.enemyMeshes.has(t.id)){const n=sl(t.type),a=this.scene.createEnemyMesh(new fe(n.color),n.size,t.type);a.position.set(t.pos.x,t.pos.y,t.pos.z),this.scene.enemyMeshes.set(t.id,a),this.scene.scene.add(a)}for(const[t,n]of this.scene.enemyMeshes)this.sim.enemies.some(a=>a.id===t)||(this.scene.scene.remove(n),this.scene.enemyMeshes.delete(t));for(const[t,n]of this.scene.bossMeshes)this.sim.enemies.some(a=>a.id===t)||(this.scene.scene.remove(n),this.scene.bossMeshes.delete(t));for(const t of this.sim.projectiles)if(!this.scene.projectileMeshes.has(t.id)){const n=this.scene.createProjectileMesh(t.color,this.projectileGeometry(t.type));n.position.set(t.pos.x,t.pos.y,t.pos.z),t.type===Ke.Laser&&n.scale.set(1,1,3),this.scene.projectileMeshes.set(t.id,n),this.scene.scene.add(n)}for(const[t,n]of this.scene.projectileMeshes)this.sim.projectiles.some(a=>a.id===t)||(this.scene.scene.remove(n),this.scene.projectileMeshes.delete(t))}projectileGeometry(t){switch(t){case Ke.Beam:case Ke.Sniper:case Ke.Laser:return"beam";case Ke.Missile:return"missile";default:return"bullet"}}syncStore(){const t=gn.getState(),n=t.game;if(!this.sim.players[0].alive&&!n.gameOver){t.setGame({gameOver:!0,screen:"result"}),this.stop();return}const a=this.sim.enemies.find(h=>h.type===Ee.Boss),l=a?ol(this.sim.currentBossIndex+1).name:"",c={};n.wave!==this.sim.wave&&(c.wave=this.sim.wave),n.lockOn!==this.sim.lockOn&&(c.lockOn=this.sim.lockOn),n.bossFight!==!!a&&(c.bossFight=!!a),n.bossName!==l&&(c.bossName=l);const f=this.sim.players.reduce((h,p)=>h+p.score,0);n.score!==f&&(c.score=f),c.time=n.time+Tc,Object.keys(c).length>0&&t.setGame(c),t.setPlayers(this.sim.players)}worldToScreen(t){const n=this.scene.camera,a=n.matrixWorldInverse.elements,l=n.projectionMatrix.elements,c=t.x,f=t.y,h=t.z,p=a[0]*c+a[4]*f+a[8]*h+a[12],m=a[1]*c+a[5]*f+a[9]*h+a[13],g=a[2]*c+a[6]*f+a[10]*h+a[14],_=a[3]*c+a[7]*f+a[11]*h+a[15],x=l[0]*p+l[4]*m+l[8]*g+l[12]*_,M=l[1]*p+l[5]*m+l[9]*g+l[13]*_;l[2]*p+l[6]*m+l[10]*g+l[14]*_;const E=l[3]*p+l[7]*m+l[11]*g+l[15]*_;if(E<=0)return null;const T=x/E,S=M/E;return Math.abs(T)>1.2||Math.abs(S)>1.2?null:{x:(T*.5+.5)*this.canvas.width,y:(-S*.5+.5)*this.canvas.height}}pickSmartTarget(t){const a=Hs(t.weapon).smartRadius,l=this.input.getMouseNormX()*this.canvas.width,c=this.input.getMouseNormY()*this.canvas.height;let f=null,h=1/0;for(const p of this.sim.enemies){if(p.hp<=0)continue;const m=this.worldToScreen(p.pos);if(!m)continue;const g=m.x-l,_=m.y-c;if(g*g+_*_>a*a)continue;const x=mn(t.pos,p.pos);x<h&&(h=x,f=p.id)}return f}lockStickPoint(){if(!this.sim.lockOn||this.sim.lockTargetId===null)return null;const t=this.sim.enemies.find(a=>a.id===this.sim.lockTargetId&&a.hp>0);if(!t)return null;const n=this.worldToScreen(t.pos);return n?{x:Hn(n.x/this.canvas.width,0,1),y:Hn(n.y/this.canvas.height,0,1)}:null}computeCrosshairDir(t){const n=this.scene.camera,a=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new J(0,0,-1).applyQuaternion(n.quaternion),f=new J(1,0,0).applyQuaternion(n.quaternion),h=new J(0,1,0).applyQuaternion(n.quaternion),p=Math.tan(n.fov*Math.PI/360),m=new J().addScaledVector(c,1).addScaledVector(f,a*p*n.aspect).addScaledVector(h,l*p).normalize(),g=120,_=new J(n.position.x+m.x*g,t.pos.y,n.position.z+m.z*g);return Me({x:_.x-t.pos.x,y:_.y-t.pos.y,z:_.z-t.pos.z})}getLeadScreenPoint(){if(!this.sim.lockOn||this.sim.lockTargetId===null)return null;const t=this.sim.players[0];if(!t)return null;const n=this.sim.enemies.find(g=>g.id===this.sim.lockTargetId&&g.hp>0);if(!n)return null;const a=Hs(t.weapon),l=Math.max(a.lockRange,_d);if(mn(n.pos,t.pos)>l)return null;const c=this.sim.enemyVels.get(n.id)||{x:0,y:0,z:0},f=a.speed;let h=f>.001?mn(t.pos,n.pos)/f:0,p=Ye(n.pos,Ue(c,h));const m=mn(t.pos,p);return f>.001&&m>.001&&(p=Ye(n.pos,Ue(c,m/f))),this.worldToScreen(p)}renderLockVisuals(t,n){const a=this.sim.getLockEnemy();if(a){const c=Hs(this.sim.players[0].weapon),f=Math.max(c.lockRange,_d),h=mn(a.pos,t.pos)<=f?"#00ff88":"#ff4444";this.scene.updateLockIndicator(n,t.pos,a.pos,h)}else this.scene.updateLockIndicator(n,t.pos,null);const l=a?this.scene.enemyMeshes.get(a.id):null;if(l&&a){if(!this.enemyOutlineRef||this.enemyOutlineRef.enemyId!==a.id){this.enemyOutlineRef&&this.enemyOutlineRef.parent.remove(this.enemyOutlineRef.group);const f=this.scene.createOutline(l,"#ff5a3c");l.add(f),this.enemyOutlineRef={enemyId:a.id,parent:l,group:f}}const c=.35+.2*Math.sin(performance.now()*.001*Math.PI*6);this.enemyOutlineRef.group.children.forEach(f=>{if(!(f instanceof ln))return;const h=f.material;!h||Array.isArray(h)||(h.opacity=c)}),this.enemyOutlineRef.group.visible=!0}else this.enemyOutlineRef&&(this.enemyOutlineRef.group.visible=!1)}render(t){const n=gn.getState().game.introActive;this.sim.players.forEach((a,l)=>{const c=this.computeCrosshairDir(a);n||this.scene.updateCamera(a.pos,t,Math.atan2(c.x,c.z),this.cameraStiffness);const f=this.sim.velocities[l],h=Math.min(1,Math.hypot(f.x,f.y,f.z)/a.speed);if(this.scene.setSpeedRatio(h),this.cameraShake>0){const m=this.scene.camera,g=this.cameraShake*2.5;m.position.x+=(Math.random()-.5)*g,m.position.y+=(Math.random()-.5)*g,this.cameraShake-=t}this.renderLockVisuals(a,l);const p=this.scene.playerMeshes.get(a.id);if(p){this.updateBrakePitch(t);const m=Math.sin(performance.now()*.001*cM)*lM;p.position.set(a.pos.x,a.pos.y+m,a.pos.z),p.rotation.set(a.rot.x+sM*this.brakePitch,a.rot.y,a.rot.z);const g=this.lastInput;if(g){const _=(g.right?1:0)-(g.left?1:0),x=(g.up?1:0)-(g.down?1:0),M=(g.forward?1:0)-(g.backward?1:0),E=Math.sqrt(_*_+x*x+M*M);this.scene.updateThrusters(a.id,E,g.boost);const T=g.boost&&a.energy>0,S=performance.now()*.001,v=.85+.15*Math.sin(S*12+Math.sin(S*7)*2),U=T?2.2:E>.001?1.3:.8,L=T?.55:1,w=T?.85:.67,W=T?1:.27;p.children.forEach(B=>{if(B.name==="thruster"){B.scale.y=U*v;const O=B.material;O.color.setRGB(L,w,W),O.opacity=T?.95*v:.8*v}})}}});for(const a of this.sim.enemies){const l=a.type===Ee.Boss?this.scene.bossMeshes.get(a.id):this.scene.enemyMeshes.get(a.id);l&&(l.position.set(a.pos.x,a.pos.y,a.pos.z),l.rotation.y+=t*2,a.type===Ee.Boss&&(l.rotation.x+=t*.5))}for(const a of this.sim.projectiles){const l=this.scene.projectileMeshes.get(a.id);l&&(l.position.set(a.pos.x,a.pos.y,a.pos.z),a.type===Ke.Missile&&(l.rotation.x+=t*5))}this.scene.render(t)}updateBrakePitch(t){const n=this.lastInput;n&&n.brake?(this.brakePitch=Math.min(1,this.brakePitch+t/rM),this.cameraStiffness=nM):(this.brakePitch=Math.max(0,this.brakePitch-t/oM),this.cameraStiffness=Jc)}}const Ov=["w","W","a","A","s","S","d","D","e","E","z","Z"," ","Tab","1","2","3","4","5","6","Shift","Control","Enter"],J2=()=>{const r=is.useRef(null),t=is.useRef(null),n=is.useRef(null),a=is.useRef(null),l=is.useRef(null),c=is.useRef({x:0,y:0});return is.useEffect(()=>{const f=r.current;if(!f)return;f.width=window.innerWidth,f.height=window.innerHeight;const h=new Q2(f);t.current=h;const p=()=>{f.width=window.innerWidth,f.height=window.innerHeight,h.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",p);const m=()=>{const U=n.current;if(!U)return;const L=h.input.getMouseNormX()*f.width,w=h.input.getMouseNormY()*f.height;U.style.transform=`translate(${L}px, ${w}px) translate(-50%, -50%)`};let g=0;const _=()=>{var W;m();const U=Hs(((W=gn.getState().players[0])==null?void 0:W.weapon)||1);a.current&&a.current.getAttribute("r")!==String(U.smartRadius)&&a.current.setAttribute("r",String(U.smartRadius));const L=h.getLeadScreenPoint(),w=l.current;w&&(L?(w.style.display="block",w.style.transform=`translate(${L.x}px, ${L.y}px) translate(-50%, -50%)`):w.style.display="none"),g=requestAnimationFrame(_)};g=requestAnimationFrame(_);const x=U=>{(U.ctrlKey||U.metaKey)&&U.preventDefault(),h.input.keyDown(U.key),U.key==="Escape"&&(document.pointerLockElement===f&&document.exitPointerLock(),gn.getState().setGame({screen:"pause"})),Ov.includes(U.key)&&U.preventDefault()},M=U=>{h.input.keyUp(U.key),Ov.includes(U.key)&&U.preventDefault()},E=U=>{const L=c.current;if(document.pointerLockElement===f)L.x=Math.max(0,Math.min(f.width,L.x+U.movementX)),L.y=Math.max(0,Math.min(f.height,L.y+U.movementY));else{const w=f.getBoundingClientRect();L.x=U.clientX-w.left,L.y=U.clientY-w.top}h.input.mouseMove(L.x,L.y)},T=()=>{h.input.mouseDownFn(),document.pointerLockElement!==f&&f.requestPointerLock()},S=()=>h.input.mouseUpFn();window.addEventListener("keydown",x),window.addEventListener("keyup",M),f.addEventListener("mousemove",E),f.addEventListener("mousedown",T),f.addEventListener("mouseup",S);const v=U=>U.preventDefault();return f.addEventListener("contextmenu",v),h.start(),()=>{h.stop(),cancelAnimationFrame(g),window.removeEventListener("resize",p),window.removeEventListener("keydown",x),window.removeEventListener("keyup",M),f.removeEventListener("mousemove",E),f.removeEventListener("mousedown",T),f.removeEventListener("mouseup",S),f.removeEventListener("contextmenu",v)}},[]),Z.jsxs(Z.Fragment,{children:[Z.jsx("canvas",{ref:r,className:"absolute top-0 left-0 w-full h-full cursor-none"}),Z.jsxs("div",{ref:n,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{transform:"translate(-50%, -50%)"},children:[Z.jsx("svg",{className:"absolute -translate-x-1/2 -translate-y-1/2 overflow-visible",width:"0",height:"0",children:Z.jsx("circle",{ref:a,cx:"0",cy:"0",r:"60",fill:"none",stroke:"#FFEE00",strokeOpacity:"0.35",strokeWidth:"1",strokeDasharray:"5 4"})}),Z.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:[Z.jsx("circle",{cx:"14",cy:"14",r:"10",fill:"none",stroke:"#FFEE00",strokeWidth:"1.5"}),Z.jsx("circle",{cx:"14",cy:"14",r:"1.8",fill:"#FFEE00"})]})]}),Z.jsx("div",{ref:l,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{display:"none",transform:"translate(-50%, -50%)",filter:"drop-shadow(0 0 3px rgba(255,140,66,0.9))"},children:Z.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",children:[Z.jsx("circle",{cx:"7",cy:"7",r:"5",fill:"none",stroke:"#ff8c42",strokeWidth:"1.5"}),Z.jsx("circle",{cx:"7",cy:"7",r:"1.2",fill:"#ff8c42"})]})})]})},$2={[Ai.FreeFire]:"FR",[Ai.LockShortRange]:"SR",[Ai.LockRequired]:"LCK"},pd="#FFEE00",md="#ff3030",Pv="#88ff44",el="rgba(255, 238, 0, 0.55)",gd="rgba(255, 238, 0, 0.30)",Ir=({children:r,className:t="",variant:n="default"})=>{const a=n==="dim"?"cp-frame-dim":n==="warn"?"cp-frame-warn":n==="danger"?"cp-frame-danger":"";return Z.jsxs("div",{className:`cp-frame ${a} ${t}`,children:[Z.jsx("span",{className:"cp-corner-bl"}),Z.jsx("span",{className:"cp-corner-br"}),r]})},Qc=({pct:r,variant:t})=>{const n=t==="en"?"cp-bar-en":t==="hp"?"cp-bar-hp":"cp-bar-sp";return Z.jsx("div",{className:"cp-bar",children:Z.jsx("div",{className:`cp-bar-fill ${n}`,style:{width:`${r}%`}})})},tR=()=>{const{game:r,players:t}=gn(),n=t[0];if(!n)return null;const a=!r.introActive,l=Hs(n.weapon),c=Math.max(0,n.hp/n.maxHp*100),f=Math.max(0,n.energy/n.maxEnergy*100),h=Math.max(0,n.specialGauge/n.maxSpecialGauge*100),p=Math.round(n.speed),m=(g,_=0,x=12)=>({opacity:a?1:0,transform:a?"translate(0,0)":`translate(${_}px, ${x}px)`,transition:`opacity 0.4s ease-out ${g}ms, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${g}ms`,pointerEvents:a?"auto":"none"});return Z.jsxs(Z.Fragment,{children:[Z.jsx("div",{className:"absolute top-3 left-3",style:m(800,-20,0),children:Z.jsxs(Ir,{className:"min-w-[170px]",children:[Z.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-1 cp-num",children:[Z.jsx("span",{className:"cp-text-white",children:"P1"}),Z.jsx("span",{className:"cp-label",style:{color:Pv},children:"EN"})]}),Z.jsx(Qc,{pct:f,variant:"en"}),Z.jsxs("div",{className:"cp-num text-[10px] mt-1 text-right",style:{color:el},children:[Math.ceil(n.energy),"/",n.maxEnergy]})]})}),Z.jsx("div",{className:"absolute top-3 right-3",style:m(900,20,0),children:Z.jsxs(Ir,{className:"min-w-[220px]",variant:r.bossFight?"danger":"default",children:[Z.jsxs("div",{className:"flex items-center justify-between text-[11px] cp-num",children:[Z.jsx("span",{className:"cp-label",children:"LEVEL"}),Z.jsx("span",{className:"cp-num cp-text-white",style:{fontSize:16},children:String(r.wave).padStart(2,"0")})]}),Z.jsxs("div",{className:"flex items-center justify-between text-[10px] cp-num mt-1",children:[Z.jsx("span",{style:{color:el},children:r.bossFight?"BOSS":"PVE"}),Z.jsx("span",{style:{color:r.lockOn?Pv:r.bossFight?md:el},children:r.lockOn?"LOCK":r.bossFight?r.bossName:"ENGAGE"})]}),r.bossFight&&Z.jsxs(Z.Fragment,{children:[Z.jsx("div",{className:"mt-1.5 mb-0.5 cp-num text-[10px]",style:{color:md},children:"HP"}),Z.jsx(Qc,{pct:100,variant:"hp"})]})]})}),Z.jsx("div",{className:"absolute bottom-3 left-3",style:m(1e3,-20,0),children:Z.jsxs(Ir,{className:"min-w-[280px]",children:[Z.jsxs("div",{className:"flex items-center justify-between text-[11px] mb-1 cp-num",children:[Z.jsx("span",{className:"cp-label",style:{color:md},children:"ARMOR"}),Z.jsxs("span",{className:"cp-text-white",children:[String(Math.ceil(n.hp)).padStart(3,"0"),"/",n.maxHp]})]}),Z.jsx(Qc,{pct:c,variant:"hp"}),Z.jsxs("div",{className:"flex items-center justify-between text-[11px] mt-2 mb-1 cp-num",children:[Z.jsx("span",{className:"cp-label",style:{color:pd},children:"SP"}),Z.jsxs("span",{className:"cp-text-white",children:[String(Math.ceil(n.specialGauge)).padStart(3,"0"),"%"]})]}),Z.jsx(Qc,{pct:h,variant:"sp"}),Z.jsxs("div",{className:"flex items-center gap-2 mt-2 text-[10px] cp-num",children:[Z.jsx("span",{style:{color:gd},children:"WPN"}),Z.jsx("span",{className:"cp-text-white",children:l.name}),Z.jsxs("span",{style:{color:el},children:["DMG:",l.damage]}),Z.jsxs("span",{style:{color:el},children:["[",$2[l.fireMode],"]"]})]}),Z.jsxs("div",{className:"flex items-center gap-2 mt-1 text-[10px] cp-num",children:[Z.jsx("span",{style:{color:gd},children:"SCORE"}),Z.jsx("span",{className:"cp-text",children:String(n.score).padStart(6,"0")}),n.combo>1&&Z.jsxs("span",{style:{color:pd},children:["×",n.combo]})]})]})}),Z.jsxs("div",{className:"absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3",style:m(1200,0,12),children:[Z.jsxs(Ir,{className:"px-3 py-1.5",children:[Z.jsx("div",{className:"cp-label text-[9px] tracking-[0.25em]",children:"SPEED"}),Z.jsx("div",{className:"cp-num cp-text text-2xl leading-none mt-0.5",style:{color:pd},children:String(p).padStart(3,"0")})]}),Z.jsxs(Ir,{className:"px-3 py-1.5",children:[Z.jsx("div",{className:"cp-label text-[9px] tracking-[0.25em]",children:"TIME"}),Z.jsxs("div",{className:"cp-num cp-text-white text-2xl leading-none mt-0.5",children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]}),Z.jsx("div",{className:"absolute bottom-3 right-3",style:m(1100,20,0),children:Z.jsxs(Ir,{className:"px-2 py-2",children:[Z.jsx("div",{className:"cp-label text-[9px] mb-1 tracking-[0.25em]",children:"WEAPON"}),Z.jsx("div",{className:"flex items-center gap-1.5",children:n.weapons.map(g=>{const _=g===n.weapon;return Z.jsx("div",{className:"w-9 h-9 flex items-center justify-center cp-num",style:{background:"#FFEE00",color:"#000",fontSize:18,fontWeight:"bold",boxShadow:_?"0 0 8px #FFEE00":"none",outline:_?"1.5px solid #ffffff":"none",outlineOffset:"1.5px"},children:g},g)})})]})}),Z.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2",style:m(1500,0,-8),children:Z.jsx("div",{className:"cp-num px-3 py-1 bg-black/70 text-[9px] tracking-[0.15em]",style:{color:gd},children:"WASD · MOUSE · LMB · SPACE · E · 1-4 · Z · ESC"})})]})},eR=({size:r=80,opacity:t=.5})=>Z.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[Z.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#FFEE00",strokeWidth:"3"}),Z.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#FFEE00",strokeWidth:"2"})]}),nR=()=>{const{setGame:r}=gn();return Z.jsxs("div",{className:"cp-bg absolute inset-0 z-50 flex flex-col items-center justify-center",children:[Z.jsx("div",{className:"cp-watermark"}),Z.jsxs("div",{className:"relative z-10 mx-auto w-[440px] max-w-[90vw] cp-frame px-8 py-6",children:[Z.jsx("span",{className:"cp-corner-bl"}),Z.jsx("span",{className:"cp-corner-br"}),Z.jsx("h2",{className:"cp-title text-center leading-none",style:{fontSize:"42px"},children:"暂停"}),Z.jsx("div",{className:"cp-label text-center text-[10px] tracking-[0.3em] mt-1",children:"PAUSED"}),Z.jsxs("div",{className:"mt-6 border-t border-[#FFEE00]/40 pt-4 space-y-2",children:[Z.jsx("button",{onClick:()=>r({screen:"pve",paused:!1}),className:"cp-btn w-full py-2 text-base",children:"继续"}),Z.jsx("button",{onClick:()=>{gn.getState().resetGame(),r({screen:"menu"})},className:"cp-btn w-full py-2 text-base",children:"返回主菜单"})]}),Z.jsx("div",{className:"mt-4 flex items-center justify-center",children:Z.jsx(eR,{size:32,opacity:.6})})]})]})},iR=({size:r=80,opacity:t=.5})=>Z.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[Z.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#FFEE00",strokeWidth:"3"}),Z.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#FFEE00",strokeWidth:"2"})]}),aR="rgba(255, 238, 0, 0.30)",sR="#ff3030",rR=()=>{const{game:r,players:t}=gn(),n=gn(a=>a.setGame);return Z.jsxs("div",{className:"cp-bg w-full h-full flex flex-col items-center justify-center",children:[Z.jsx("div",{className:"cp-watermark"}),Z.jsxs("div",{className:"relative z-10 cp-frame cp-frame-danger px-8 py-3 mb-6",children:[Z.jsx("span",{className:"cp-corner-bl"}),Z.jsx("span",{className:"cp-corner-br"}),Z.jsx("h1",{className:"cp-title text-center leading-none tracking-[0.15em]",style:{fontSize:"34px",color:sR},children:"GAME OVER"})]}),Z.jsxs("div",{className:"relative z-10 cp-frame cp-frame-dim w-[360px] max-w-[90vw] px-5 py-4 mb-6",children:[Z.jsx("span",{className:"cp-corner-bl"}),Z.jsx("span",{className:"cp-corner-br"}),Z.jsx("h3",{className:"cp-label text-[14px] mb-3",children:"战 绩"}),t.map((a,l)=>Z.jsxs("div",{className:"cp-num flex justify-between text-[13px] mb-1.5",children:[Z.jsxs("span",{className:"cp-text-white",children:["P",l+1]}),Z.jsxs("span",{className:"cp-text",children:["KILLS:",String(a.kills).padStart(3,"0"),"  SCORE:",String(a.score).padStart(6,"0")]})]},a.id)),Z.jsxs("div",{className:"cp-num flex justify-between text-[13px] mt-2 pt-2",style:{borderTop:"1px solid rgba(255, 238, 0, 0.30)"},children:[Z.jsx("span",{className:"cp-text-white",children:"关卡"}),Z.jsxs("span",{className:"cp-text",children:["LEVEL ",String(r.wave).padStart(2,"0")]})]}),Z.jsxs("div",{className:"cp-num flex justify-between text-[13px] mt-1",children:[Z.jsx("span",{className:"cp-text-white",children:"用时"}),Z.jsxs("span",{className:"cp-text",children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]}),Z.jsxs("div",{className:"relative z-10 space-y-2 w-[280px]",children:[Z.jsx("button",{onClick:()=>{gn.getState().resetGame(),n({screen:"pve",gameMode:"pve"})},className:"cp-btn w-full py-2 text-base",children:"再来一局"}),Z.jsx("button",{onClick:()=>{gn.getState().resetGame(),n({screen:"menu"})},className:"cp-btn w-full py-2 text-base",children:"返回主菜单"})]}),Z.jsxs("div",{className:"mt-6 flex items-center gap-2",children:[Z.jsx(iR,{size:28,opacity:.6}),Z.jsx("span",{className:"cp-num text-[10px] tracking-wider",style:{color:aR},children:"FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79"})]})]})},oR=()=>{const r=gn(t=>t.game.edgePulseAt);return r?Z.jsx("div",{className:"fixed inset-0 pointer-events-none z-30 edge-pulse",style:{background:"radial-gradient(ellipse at center, transparent 35%, rgba(255, 238, 0, 0.85) 100%)"}},r):null},lR=()=>{const r=gn(n=>n.game),t=()=>{switch(r.screen){case"menu":return Z.jsx(M_,{});case"pve":return Z.jsxs("div",{className:"w-full h-full relative",children:[Z.jsx(J2,{}),Z.jsx(tR,{}),Z.jsx(oR,{})]});case"pause":return Z.jsxs("div",{className:"w-full h-full relative",children:[Z.jsx("div",{className:"w-full h-full bg-black/30"}),Z.jsx(nR,{})]});case"result":return Z.jsx(rR,{});default:return Z.jsx(M_,{})}};return Z.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};XS.createRoot(document.getElementById("root")).render(Z.jsx(nl.StrictMode,{children:Z.jsx(lR,{})}));
