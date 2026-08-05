var OS=Object.defineProperty;var PS=(r,t,n)=>t in r?OS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var Rt=(r,t,n)=>PS(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function Iv(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var bh={exports:{}},Ko={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i_;function zS(){if(i_)return Ko;i_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Ko.Fragment=t,Ko.jsx=n,Ko.jsxs=n,Ko}var a_;function BS(){return a_||(a_=1,bh.exports=zS()),bh.exports}var tt=BS(),Ah={exports:{}},ae={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s_;function IS(){if(s_)return ae;s_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function M(z){return z===null||typeof z!="object"?null:(z=v&&z[v]||z["@@iterator"],typeof z=="function"?z:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,S={};function x(z,st,yt){this.props=z,this.context=st,this.refs=S,this.updater=yt||E}x.prototype.isReactComponent={},x.prototype.setState=function(z,st){if(typeof z!="object"&&typeof z!="function"&&z!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,z,st,"setState")},x.prototype.forceUpdate=function(z){this.updater.enqueueForceUpdate(this,z,"forceUpdate")};function U(){}U.prototype=x.prototype;function C(z,st,yt){this.props=z,this.context=st,this.refs=S,this.updater=yt||E}var A=C.prototype=new U;A.constructor=C,T(A,x.prototype),A.isPureReactComponent=!0;var V=Array.isArray;function B(){}var O={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function L(z,st,yt){var K=yt.ref;return{$$typeof:r,type:z,key:st,ref:K!==void 0?K:null,props:yt}}function w(z,st){return L(z.type,st,z.props)}function F(z){return typeof z=="object"&&z!==null&&z.$$typeof===r}function Q(z){var st={"=":"=0",":":"=2"};return"$"+z.replace(/[=:]/g,function(yt){return st[yt]})}var J=/\/+/g;function ct(z,st){return typeof z=="object"&&z!==null&&z.key!=null?Q(""+z.key):st.toString(36)}function ut(z){switch(z.status){case"fulfilled":return z.value;case"rejected":throw z.reason;default:switch(typeof z.status=="string"?z.then(B,B):(z.status="pending",z.then(function(st){z.status==="pending"&&(z.status="fulfilled",z.value=st)},function(st){z.status==="pending"&&(z.status="rejected",z.reason=st)})),z.status){case"fulfilled":return z.value;case"rejected":throw z.reason}}throw z}function P(z,st,yt,K,ht){var Et=typeof z;(Et==="undefined"||Et==="boolean")&&(z=null);var xt=!1;if(z===null)xt=!0;else switch(Et){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(z.$$typeof){case r:case t:xt=!0;break;case g:return xt=z._init,P(xt(z._payload),st,yt,K,ht)}}if(xt)return ht=ht(z),xt=K===""?"."+ct(z,0):K,V(ht)?(yt="",xt!=null&&(yt=xt.replace(J,"$&/")+"/"),P(ht,st,yt,"",function(se){return se})):ht!=null&&(F(ht)&&(ht=w(ht,yt+(ht.key==null||z&&z.key===ht.key?"":(""+ht.key).replace(J,"$&/")+"/")+xt)),st.push(ht)),1;xt=0;var Vt=K===""?".":K+":";if(V(z))for(var Gt=0;Gt<z.length;Gt++)K=z[Gt],Et=Vt+ct(K,Gt),xt+=P(K,st,yt,Et,ht);else if(Gt=M(z),typeof Gt=="function")for(z=Gt.call(z),Gt=0;!(K=z.next()).done;)K=K.value,Et=Vt+ct(K,Gt++),xt+=P(K,st,yt,Et,ht);else if(Et==="object"){if(typeof z.then=="function")return P(ut(z),st,yt,K,ht);throw st=String(z),Error("Objects are not valid as a React child (found: "+(st==="[object Object]"?"object with keys {"+Object.keys(z).join(", ")+"}":st)+"). If you meant to render a collection of children, use an array instead.")}return xt}function j(z,st,yt){if(z==null)return z;var K=[],ht=0;return P(z,K,"","",function(Et){return st.call(yt,Et,ht++)}),K}function Z(z){if(z._status===-1){var st=z._result;st=st(),st.then(function(yt){(z._status===0||z._status===-1)&&(z._status=1,z._result=yt)},function(yt){(z._status===0||z._status===-1)&&(z._status=2,z._result=yt)}),z._status===-1&&(z._status=0,z._result=st)}if(z._status===1)return z._result.default;throw z._result}var St=typeof reportError=="function"?reportError:function(z){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var st=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof z=="object"&&z!==null&&typeof z.message=="string"?String(z.message):String(z),error:z});if(!window.dispatchEvent(st))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",z);return}console.error(z)},Tt={map:j,forEach:function(z,st,yt){j(z,function(){st.apply(this,arguments)},yt)},count:function(z){var st=0;return j(z,function(){st++}),st},toArray:function(z){return j(z,function(st){return st})||[]},only:function(z){if(!F(z))throw Error("React.Children.only expected to receive a single React element child.");return z}};return ae.Activity=_,ae.Children=Tt,ae.Component=x,ae.Fragment=n,ae.Profiler=l,ae.PureComponent=C,ae.StrictMode=s,ae.Suspense=p,ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,ae.__COMPILER_RUNTIME={__proto__:null,c:function(z){return O.H.useMemoCache(z)}},ae.cache=function(z){return function(){return z.apply(null,arguments)}},ae.cacheSignal=function(){return null},ae.cloneElement=function(z,st,yt){if(z==null)throw Error("The argument must be a React element, but you passed "+z+".");var K=T({},z.props),ht=z.key;if(st!=null)for(Et in st.key!==void 0&&(ht=""+st.key),st)!H.call(st,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&st.ref===void 0||(K[Et]=st[Et]);var Et=arguments.length-2;if(Et===1)K.children=yt;else if(1<Et){for(var xt=Array(Et),Vt=0;Vt<Et;Vt++)xt[Vt]=arguments[Vt+2];K.children=xt}return L(z.type,ht,K)},ae.createContext=function(z){return z={$$typeof:f,_currentValue:z,_currentValue2:z,_threadCount:0,Provider:null,Consumer:null},z.Provider=z,z.Consumer={$$typeof:c,_context:z},z},ae.createElement=function(z,st,yt){var K,ht={},Et=null;if(st!=null)for(K in st.key!==void 0&&(Et=""+st.key),st)H.call(st,K)&&K!=="key"&&K!=="__self"&&K!=="__source"&&(ht[K]=st[K]);var xt=arguments.length-2;if(xt===1)ht.children=yt;else if(1<xt){for(var Vt=Array(xt),Gt=0;Gt<xt;Gt++)Vt[Gt]=arguments[Gt+2];ht.children=Vt}if(z&&z.defaultProps)for(K in xt=z.defaultProps,xt)ht[K]===void 0&&(ht[K]=xt[K]);return L(z,Et,ht)},ae.createRef=function(){return{current:null}},ae.forwardRef=function(z){return{$$typeof:h,render:z}},ae.isValidElement=F,ae.lazy=function(z){return{$$typeof:g,_payload:{_status:-1,_result:z},_init:Z}},ae.memo=function(z,st){return{$$typeof:m,type:z,compare:st===void 0?null:st}},ae.startTransition=function(z){var st=O.T,yt={};O.T=yt;try{var K=z(),ht=O.S;ht!==null&&ht(yt,K),typeof K=="object"&&K!==null&&typeof K.then=="function"&&K.then(B,St)}catch(Et){St(Et)}finally{st!==null&&yt.types!==null&&(st.types=yt.types),O.T=st}},ae.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},ae.use=function(z){return O.H.use(z)},ae.useActionState=function(z,st,yt){return O.H.useActionState(z,st,yt)},ae.useCallback=function(z,st){return O.H.useCallback(z,st)},ae.useContext=function(z){return O.H.useContext(z)},ae.useDebugValue=function(){},ae.useDeferredValue=function(z,st){return O.H.useDeferredValue(z,st)},ae.useEffect=function(z,st){return O.H.useEffect(z,st)},ae.useEffectEvent=function(z){return O.H.useEffectEvent(z)},ae.useId=function(){return O.H.useId()},ae.useImperativeHandle=function(z,st,yt){return O.H.useImperativeHandle(z,st,yt)},ae.useInsertionEffect=function(z,st){return O.H.useInsertionEffect(z,st)},ae.useLayoutEffect=function(z,st){return O.H.useLayoutEffect(z,st)},ae.useMemo=function(z,st){return O.H.useMemo(z,st)},ae.useOptimistic=function(z,st){return O.H.useOptimistic(z,st)},ae.useReducer=function(z,st,yt){return O.H.useReducer(z,st,yt)},ae.useRef=function(z){return O.H.useRef(z)},ae.useState=function(z){return O.H.useState(z)},ae.useSyncExternalStore=function(z,st,yt){return O.H.useSyncExternalStore(z,st,yt)},ae.useTransition=function(){return O.H.useTransition()},ae.version="19.2.8",ae}var r_;function op(){return r_||(r_=1,Ah.exports=IS()),Ah.exports}var ls=op();const sl=Iv(ls);var Rh={exports:{}},Qo={},wh={exports:{}},Ch={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o_;function FS(){return o_||(o_=1,(function(r){function t(P,j){var Z=P.length;P.push(j);t:for(;0<Z;){var St=Z-1>>>1,Tt=P[St];if(0<l(Tt,j))P[St]=j,P[Z]=Tt,Z=St;else break t}}function n(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var j=P[0],Z=P.pop();if(Z!==j){P[0]=Z;t:for(var St=0,Tt=P.length,z=Tt>>>1;St<z;){var st=2*(St+1)-1,yt=P[st],K=st+1,ht=P[K];if(0>l(yt,Z))K<Tt&&0>l(ht,yt)?(P[St]=ht,P[K]=Z,St=K):(P[St]=yt,P[st]=Z,St=st);else if(K<Tt&&0>l(ht,Z))P[St]=ht,P[K]=Z,St=K;else break t}}return j}function l(P,j){var Z=P.sortIndex-j.sortIndex;return Z!==0?Z:P.id-j.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var p=[],m=[],g=1,_=null,v=3,M=!1,E=!1,T=!1,S=!1,x=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,C=typeof setImmediate<"u"?setImmediate:null;function A(P){for(var j=n(m);j!==null;){if(j.callback===null)s(m);else if(j.startTime<=P)s(m),j.sortIndex=j.expirationTime,t(p,j);else break;j=n(m)}}function V(P){if(T=!1,A(P),!E)if(n(p)!==null)E=!0,B||(B=!0,Q());else{var j=n(m);j!==null&&ut(V,j.startTime-P)}}var B=!1,O=-1,H=5,L=-1;function w(){return S?!0:!(r.unstable_now()-L<H)}function F(){if(S=!1,B){var P=r.unstable_now();L=P;var j=!0;try{t:{E=!1,T&&(T=!1,U(O),O=-1),M=!0;var Z=v;try{e:{for(A(P),_=n(p);_!==null&&!(_.expirationTime>P&&w());){var St=_.callback;if(typeof St=="function"){_.callback=null,v=_.priorityLevel;var Tt=St(_.expirationTime<=P);if(P=r.unstable_now(),typeof Tt=="function"){_.callback=Tt,A(P),j=!0;break e}_===n(p)&&s(p),A(P)}else s(p);_=n(p)}if(_!==null)j=!0;else{var z=n(m);z!==null&&ut(V,z.startTime-P),j=!1}}break t}finally{_=null,v=Z,M=!1}j=void 0}}finally{j?Q():B=!1}}}var Q;if(typeof C=="function")Q=function(){C(F)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,ct=J.port2;J.port1.onmessage=F,Q=function(){ct.postMessage(null)}}else Q=function(){x(F,0)};function ut(P,j){O=x(function(){P(r.unstable_now())},j)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_next=function(P){switch(v){case 1:case 2:case 3:var j=3;break;default:j=v}var Z=v;v=j;try{return P()}finally{v=Z}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(P,j){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var Z=v;v=P;try{return j()}finally{v=Z}},r.unstable_scheduleCallback=function(P,j,Z){var St=r.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?St+Z:St):Z=St,P){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=Z+Tt,P={id:g++,callback:j,priorityLevel:P,startTime:Z,expirationTime:Tt,sortIndex:-1},Z>St?(P.sortIndex=Z,t(m,P),n(p)===null&&P===n(m)&&(T?(U(O),O=-1):T=!0,ut(V,Z-St))):(P.sortIndex=Tt,t(p,P),E||M||(E=!0,B||(B=!0,Q()))),P},r.unstable_shouldYield=w,r.unstable_wrapCallback=function(P){var j=v;return function(){var Z=v;v=j;try{return P.apply(this,arguments)}finally{v=Z}}}})(Ch)),Ch}var l_;function HS(){return l_||(l_=1,wh.exports=FS()),wh.exports}var Dh={exports:{}},Bn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c_;function GS(){if(c_)return Bn;c_=1;var r=op();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)m+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var s={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:p,containerInfo:m,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Bn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Bn.createPortal=function(p,m){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,g)},Bn.flushSync=function(p){var m=f.T,g=s.p;try{if(f.T=null,s.p=2,p)return p()}finally{f.T=m,s.p=g,s.d.f()}},Bn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,s.d.C(p,m))},Bn.prefetchDNS=function(p){typeof p=="string"&&s.d.D(p)},Bn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var g=m.as,_=h(g,m.crossOrigin),v=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;g==="style"?s.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:M}):g==="script"&&s.d.X(p,{crossOrigin:_,integrity:v,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Bn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var g=h(m.as,m.crossOrigin);s.d.M(p,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&s.d.M(p)},Bn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var g=m.as,_=h(g,m.crossOrigin);s.d.L(p,g,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Bn.preloadModule=function(p,m){if(typeof p=="string")if(m){var g=h(m.as,m.crossOrigin);s.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else s.d.m(p)},Bn.requestFormReset=function(p){s.d.r(p)},Bn.unstable_batchedUpdates=function(p,m){return p(m)},Bn.useFormState=function(p,m,g){return f.H.useFormState(p,m,g)},Bn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Bn.version="19.2.8",Bn}var u_;function VS(){if(u_)return Dh.exports;u_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Dh.exports=GS(),Dh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f_;function kS(){if(f_)return Qo;f_=1;var r=HS(),t=op(),n=VS();function s(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,a=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(a=i.return),e=i.return;while(e)}return i.tag===3?a:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(s(188))}function m(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(s(188));return i!==e?null:e}for(var a=e,o=i;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return p(u),e;if(d===o)return p(u),i;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var y=!1,b=u.child;b;){if(b===a){y=!0,a=u,o=d;break}if(b===o){y=!0,o=u,a=d;break}b=b.sibling}if(!y){for(b=d.child;b;){if(b===a){y=!0,a=d,o=u;break}if(b===o){y=!0,o=d,a=u;break}b=b.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),U=Symbol.for("react.consumer"),C=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),V=Symbol.for("react.suspense"),B=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),w=Symbol.for("react.memo_cache_sentinel"),F=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var J=Symbol.for("react.client.reference");function ct(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===J?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case x:return"Profiler";case S:return"StrictMode";case V:return"Suspense";case B:return"SuspenseList";case L:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case C:return e.displayName||"Context";case U:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return i=e.displayName||null,i!==null?i:ct(e.type)||"Memo";case H:i=e._payload,e=e._init;try{return ct(e(i))}catch{}}return null}var ut=Array.isArray,P=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z={pending:!1,data:null,method:null,action:null},St=[],Tt=-1;function z(e){return{current:e}}function st(e){0>Tt||(e.current=St[Tt],St[Tt]=null,Tt--)}function yt(e,i){Tt++,St[Tt]=e.current,e.current=i}var K=z(null),ht=z(null),Et=z(null),xt=z(null);function Vt(e,i){switch(yt(Et,i),yt(ht,e),yt(K,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Ag(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Ag(i),e=Rg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}st(K),yt(K,e)}function Gt(){st(K),st(ht),st(Et)}function se(e){e.memoizedState!==null&&yt(xt,e);var i=K.current,a=Rg(i,e.type);i!==a&&(yt(ht,e),yt(K,a))}function He(e){ht.current===e&&(st(K),st(ht)),xt.current===e&&(st(xt),Wo._currentValue=Z)}var de,Ke;function W(e){if(de===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);de=i&&i[1]||"",Ke=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+de+e+Ke}var On=!1;function he(e,i){if(!e||On)return"";On=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(lt){var it=lt}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(lt){it=lt}e.call(_t.prototype)}}else{try{throw Error()}catch(lt){it=lt}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(lt){if(lt&&it&&typeof lt.stack=="string")return[lt.stack,it.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),y=d[0],b=d[1];if(y&&b){var I=y.split(`
`),nt=b.split(`
`);for(u=o=0;o<I.length&&!I[o].includes("DetermineComponentFrameRoot");)o++;for(;u<nt.length&&!nt[u].includes("DetermineComponentFrameRoot");)u++;if(o===I.length||u===nt.length)for(o=I.length-1,u=nt.length-1;1<=o&&0<=u&&I[o]!==nt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(I[o]!==nt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||I[o]!==nt[u]){var dt=`
`+I[o].replace(" at new "," at ");return e.displayName&&dt.includes("<anonymous>")&&(dt=dt.replace("<anonymous>",e.displayName)),dt}while(1<=o&&0<=u);break}}}finally{On=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?W(a):""}function _e(e,i){switch(e.tag){case 26:case 27:case 5:return W(e.type);case 16:return W("Lazy");case 13:return e.child!==i&&i!==null?W("Suspense Fallback"):W("Suspense");case 19:return W("SuspenseList");case 0:case 15:return he(e.type,!1);case 11:return he(e.type.render,!1);case 1:return he(e.type,!0);case 31:return W("Activity");default:return""}}function Qt(e){try{var i="",a=null;do i+=_e(e,a),a=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Oe=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,N=r.unstable_cancelCallback,R=r.unstable_shouldYield,at=r.unstable_requestPaint,pt=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,Lt=r.unstable_NormalPriority,zt=r.unstable_LowPriority,ve=r.unstable_IdlePriority,At=r.log,Bt=r.unstable_setDisableYieldValue,Kt=null,Yt=null;function Pt(e){if(typeof At=="function"&&Bt(e),Yt&&typeof Yt.setStrictMode=="function")try{Yt.setStrictMode(Kt,e)}catch{}}var te=Math.clz32?Math.clz32:k,oe=Math.log,Ge=Math.LN2;function k(e){return e>>>=0,e===0?32:31-(oe(e)/Ge|0)|0}var wt=256,ft=262144,vt=4194304;function Ct(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Nt(e,i,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~d,o!==0?u=Ct(o):(y&=b,y!==0?u=Ct(y):a||(a=b&~e,a!==0&&(u=Ct(a))))):(b=o&~d,b!==0?u=Ct(b):y!==0?u=Ct(y):a||(a=o&~e,a!==0&&(u=Ct(a)))),u===0?0:i!==0&&i!==u&&(i&d)===0&&(d=u&-u,a=i&-i,d>=a||d===32&&(a&4194048)!==0)?i:u}function ne(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Qe(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _n(){var e=vt;return vt<<=1,(vt&62914560)===0&&(vt=4194304),e}function we(e){for(var i=[],a=0;31>a;a++)i.push(e);return i}function Rn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ci(e,i,a,o,u,d){var y=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,I=e.expirationTimes,nt=e.hiddenUpdates;for(a=y&~a;0<a;){var dt=31-te(a),_t=1<<dt;b[dt]=0,I[dt]=-1;var it=nt[dt];if(it!==null)for(nt[dt]=null,dt=0;dt<it.length;dt++){var lt=it[dt];lt!==null&&(lt.lane&=-536870913)}a&=~_t}o!==0&&ao(e,o,0),d!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~i))}function ao(e,i,a){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-te(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function so(e,i){var a=e.entangledLanes|=i;for(e=e.entanglements;a;){var o=31-te(a),u=1<<o;u&i|e[o]&i&&(e[o]|=i),a&=~u}}function Vi(e,i){var a=i&-i;return a=(a&42)!==0?1:gs(a),(a&(e.suspendedLanes|i))!==0?0:a}function gs(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ys(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ro(){var e=j.p;return e!==0?e:(e=window.event,e===void 0?32:Kg(e.type))}function _s(e,i){var a=j.p;try{return j.p=e,i()}finally{j.p=a}}var Di=Math.random().toString(36).slice(2),en="__reactFiber$"+Di,wn="__reactProps$"+Di,Qi="__reactContainer$"+Di,oo="__reactEvents$"+Di,vu="__reactListeners$"+Di,xu="__reactHandles$"+Di,D="__reactResources$"+Di,X="__reactMarker$"+Di;function ot(e){delete e[en],delete e[wn],delete e[oo],delete e[vu],delete e[xu]}function rt(e){var i=e[en];if(i)return i;for(var a=e.parentNode;a;){if(i=a[Qi]||a[en]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(e=Og(e);e!==null;){if(a=e[en])return a;e=Og(e)}return i}e=a,a=e.parentNode}return null}function q(e){if(e=e[en]||e[Qi]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(s(33))}function Dt(e){var i=e[D];return i||(i=e[D]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Ut(e){e[X]=!0}var kt=new Set,ie={};function $t(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(ie[e]=i,e=0;e<i.length;e++)kt.add(i[e])}var be=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Pe={},Ve={};function Pn(e){return Oe.call(Ve,e)?!0:Oe.call(Pe,e)?!1:be.test(e)?Ve[e]=!0:(Pe[e]=!0,!1)}function Me(e,i,a){if(Pn(i))if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+a)}}function Xt(e,i,a){if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+a)}}function vn(e,i,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(i,a,""+o)}}function re(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Da(e,i,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,d.call(this,y)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Cn(e){if(!e._valueTracker){var i=Wn(e)?"checked":"value";e._valueTracker=Da(e,i,""+e[i])}}function Ua(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var a=i.getValue(),o="";return e&&(o=Wn(e)?e.checked?"true":"false":e.value),e=o,e!==a?(i.setValue(e),!0):!1}function Ne(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var pi=/[\n"\\]/g;function En(e){return e.replace(pi,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function zn(e,i,a,o,u,d,y,b){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+re(i)):e.value!==""+re(i)&&(e.value=""+re(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?mi(e,y,re(i)):a!=null?mi(e,y,re(a)):o!=null&&e.removeAttribute("value"),u==null&&d!=null&&(e.defaultChecked=!!d),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+re(b):e.removeAttribute("name")}function Ui(e,i,a,o,u,d,y,b){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){Cn(e);return}a=a!=null?""+re(a):"",i=i!=null?""+re(i):a,b||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Cn(e)}function mi(e,i,a){i==="number"&&Ne(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Ji(e,i,a,o){if(e=e.options,i){i={};for(var u=0;u<a.length;u++)i["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=i.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+re(a),i=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function Sp(e,i,a){if(i!=null&&(i=""+re(i),i!==e.value&&(e.value=i),a==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=a!=null?""+re(a):""}function Mp(e,i,a,o){if(i==null){if(o!=null){if(a!=null)throw Error(s(92));if(ut(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),i=a}a=re(i),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Cn(e)}function js(e,i){if(i){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=i;return}}e.textContent=i}var Cx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ep(e,i,a){var o=i.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,a):typeof a!="number"||a===0||Cx.has(i)?i==="float"?e.cssFloat=a:e[i]=(""+a).trim():e[i]=a+"px"}function Tp(e,i,a){if(i!=null&&typeof i!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&a[u]!==o&&Ep(e,u,o)}else for(var d in i)i.hasOwnProperty(d)&&Ep(e,d,i[d])}function yu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ux=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ml(e){return Ux.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $i(){}var Su=null;function Mu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zs=null,Ks=null;function bp(e){var i=q(e);if(i&&(e=i.stateNode)){var a=e[wn]||null;t:switch(e=i.stateNode,i.type){case"input":if(zn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),i=a.name,a.type==="radio"&&i!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+En(""+i)+'"][type="radio"]'),i=0;i<a.length;i++){var o=a[i];if(o!==e&&o.form===e.form){var u=o[wn]||null;if(!u)throw Error(s(90));zn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<a.length;i++)o=a[i],o.form===e.form&&Ua(o)}break t;case"textarea":Sp(e,a.value,a.defaultValue);break t;case"select":i=a.value,i!=null&&Ji(e,!!a.multiple,i,!1)}}}var Eu=!1;function Ap(e,i,a){if(Eu)return e(i,a);Eu=!0;try{var o=e(i);return o}finally{if(Eu=!1,(Zs!==null||Ks!==null)&&(nc(),Zs&&(i=Zs,e=Ks,Ks=Zs=null,bp(i),e)))for(i=0;i<e.length;i++)bp(e[i])}}function lo(e,i){var a=e.stateNode;if(a===null)return null;var o=a[wn]||null;if(o===null)return null;a=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,i,typeof a));return a}var ta=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Tu=!1;if(ta)try{var co={};Object.defineProperty(co,"passive",{get:function(){Tu=!0}}),window.addEventListener("test",co,co),window.removeEventListener("test",co,co)}catch{Tu=!1}var La=null,bu=null,gl=null;function Rp(){if(gl)return gl;var e,i=bu,a=i.length,o,u="value"in La?La.value:La.textContent,d=u.length;for(e=0;e<a&&i[e]===u[e];e++);var y=a-e;for(o=1;o<=y&&i[a-o]===u[d-o];o++);return gl=u.slice(e,1<o?1-o:void 0)}function _l(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function vl(){return!0}function wp(){return!1}function Yn(e){function i(a,o,u,d,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(d):d[b]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?vl:wp,this.isPropagationStopped=wp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=vl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=vl)},persist:function(){},isPersistent:vl}),i}var vs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xl=Yn(vs),uo=_({},vs,{view:0,detail:0}),Lx=Yn(uo),Au,Ru,fo,yl=_({},uo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==fo&&(fo&&e.type==="mousemove"?(Au=e.screenX-fo.screenX,Ru=e.screenY-fo.screenY):Ru=Au=0,fo=e),Au)},movementY:function(e){return"movementY"in e?e.movementY:Ru}}),Cp=Yn(yl),Nx=_({},yl,{dataTransfer:0}),Ox=Yn(Nx),Px=_({},uo,{relatedTarget:0}),wu=Yn(Px),zx=_({},vs,{animationName:0,elapsedTime:0,pseudoElement:0}),Bx=Yn(zx),Ix=_({},vs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Fx=Yn(Ix),Hx=_({},vs,{data:0}),Dp=Yn(Hx),Gx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Vx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=kx[e])?!!i[e]:!1}function Cu(){return Xx}var qx=_({},uo,{key:function(e){if(e.key){var i=Gx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=_l(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Vx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cu,charCode:function(e){return e.type==="keypress"?_l(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_l(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wx=Yn(qx),Yx=_({},yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Up=Yn(Yx),jx=_({},uo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cu}),Zx=Yn(jx),Kx=_({},vs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qx=Yn(Kx),Jx=_({},yl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$x=Yn(Jx),ty=_({},vs,{newState:0,oldState:0}),ey=Yn(ty),ny=[9,13,27,32],Du=ta&&"CompositionEvent"in window,ho=null;ta&&"documentMode"in document&&(ho=document.documentMode);var iy=ta&&"TextEvent"in window&&!ho,Lp=ta&&(!Du||ho&&8<ho&&11>=ho),Np=" ",Op=!1;function Pp(e,i){switch(e){case"keyup":return ny.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Qs=!1;function ay(e,i){switch(e){case"compositionend":return zp(i);case"keypress":return i.which!==32?null:(Op=!0,Np);case"textInput":return e=i.data,e===Np&&Op?null:e;default:return null}}function sy(e,i){if(Qs)return e==="compositionend"||!Du&&Pp(e,i)?(e=Rp(),gl=bu=La=null,Qs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Lp&&i.locale!=="ko"?null:i.data;default:return null}}var ry={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!ry[e.type]:i==="textarea"}function Ip(e,i,a,o){Zs?Ks?Ks.push(o):Ks=[o]:Zs=o,i=cc(i,"onChange"),0<i.length&&(a=new xl("onChange","change",null,a,o),e.push({event:a,listeners:i}))}var po=null,mo=null;function oy(e){yg(e,0)}function Sl(e){var i=bt(e);if(Ua(i))return e}function Fp(e,i){if(e==="change")return i}var Hp=!1;if(ta){var Uu;if(ta){var Lu="oninput"in document;if(!Lu){var Gp=document.createElement("div");Gp.setAttribute("oninput","return;"),Lu=typeof Gp.oninput=="function"}Uu=Lu}else Uu=!1;Hp=Uu&&(!document.documentMode||9<document.documentMode)}function Vp(){po&&(po.detachEvent("onpropertychange",kp),mo=po=null)}function kp(e){if(e.propertyName==="value"&&Sl(mo)){var i=[];Ip(i,mo,e,Mu(e)),Ap(oy,i)}}function ly(e,i,a){e==="focusin"?(Vp(),po=i,mo=a,po.attachEvent("onpropertychange",kp)):e==="focusout"&&Vp()}function cy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Sl(mo)}function uy(e,i){if(e==="click")return Sl(i)}function fy(e,i){if(e==="input"||e==="change")return Sl(i)}function hy(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ni=typeof Object.is=="function"?Object.is:hy;function go(e,i){if(ni(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var a=Object.keys(e),o=Object.keys(i);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Oe.call(i,u)||!ni(e[u],i[u]))return!1}return!0}function Xp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qp(e,i){var a=Xp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=i&&o>=i)return{node:a,offset:i-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Xp(a)}}function Wp(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?Wp(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Yp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Ne(e.document);i instanceof e.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)e=i.contentWindow;else break;i=Ne(e.document)}return i}function Nu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var dy=ta&&"documentMode"in document&&11>=document.documentMode,Js=null,Ou=null,_o=null,Pu=!1;function jp(e,i,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Pu||Js==null||Js!==Ne(o)||(o=Js,"selectionStart"in o&&Nu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),_o&&go(_o,o)||(_o=o,o=cc(Ou,"onSelect"),0<o.length&&(i=new xl("onSelect","select",null,i,a),e.push({event:i,listeners:o}),i.target=Js)))}function xs(e,i){var a={};return a[e.toLowerCase()]=i.toLowerCase(),a["Webkit"+e]="webkit"+i,a["Moz"+e]="moz"+i,a}var $s={animationend:xs("Animation","AnimationEnd"),animationiteration:xs("Animation","AnimationIteration"),animationstart:xs("Animation","AnimationStart"),transitionrun:xs("Transition","TransitionRun"),transitionstart:xs("Transition","TransitionStart"),transitioncancel:xs("Transition","TransitionCancel"),transitionend:xs("Transition","TransitionEnd")},zu={},Zp={};ta&&(Zp=document.createElement("div").style,"AnimationEvent"in window||(delete $s.animationend.animation,delete $s.animationiteration.animation,delete $s.animationstart.animation),"TransitionEvent"in window||delete $s.transitionend.transition);function ys(e){if(zu[e])return zu[e];if(!$s[e])return e;var i=$s[e],a;for(a in i)if(i.hasOwnProperty(a)&&a in Zp)return zu[e]=i[a];return e}var Kp=ys("animationend"),Qp=ys("animationiteration"),Jp=ys("animationstart"),py=ys("transitionrun"),my=ys("transitionstart"),gy=ys("transitioncancel"),$p=ys("transitionend"),tm=new Map,Bu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Bu.push("scrollEnd");function Li(e,i){tm.set(e,i),$t(i,[e])}var Ml=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},gi=[],tr=0,Iu=0;function El(){for(var e=tr,i=Iu=tr=0;i<e;){var a=gi[i];gi[i++]=null;var o=gi[i];gi[i++]=null;var u=gi[i];gi[i++]=null;var d=gi[i];if(gi[i++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}d!==0&&em(a,u,d)}}function Tl(e,i,a,o){gi[tr++]=e,gi[tr++]=i,gi[tr++]=a,gi[tr++]=o,Iu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Fu(e,i,a,o){return Tl(e,i,a,o),bl(e)}function Ss(e,i){return Tl(e,null,null,i),bl(e)}function em(e,i,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=e.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(u=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,u&&i!==null&&(u=31-te(a),e=d.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=a|536870912),d):null}function bl(e){if(50<Fo)throw Fo=0,Zf=null,Error(s(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var er={};function _y(e,i,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(e,i,a,o){return new _y(e,i,a,o)}function Hu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ea(e,i){var a=e.alternate;return a===null?(a=ii(e.tag,i,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=i,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,i=e.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function nm(e,i){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,i=a.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Al(e,i,a,o,u,d){var y=0;if(o=e,typeof e=="function")Hu(e)&&(y=1);else if(typeof e=="string")y=MS(e,a,K.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case L:return e=ii(31,a,i,u),e.elementType=L,e.lanes=d,e;case T:return Ms(a.children,u,d,i);case S:y=8,u|=24;break;case x:return e=ii(12,a,i,u|2),e.elementType=x,e.lanes=d,e;case V:return e=ii(13,a,i,u),e.elementType=V,e.lanes=d,e;case B:return e=ii(19,a,i,u),e.elementType=B,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case C:y=10;break t;case U:y=9;break t;case A:y=11;break t;case O:y=14;break t;case H:y=16,o=null;break t}y=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return i=ii(y,a,i,u),i.elementType=e,i.type=o,i.lanes=d,i}function Ms(e,i,a,o){return e=ii(7,e,o,i),e.lanes=a,e}function Gu(e,i,a){return e=ii(6,e,null,i),e.lanes=a,e}function im(e){var i=ii(18,null,null,0);return i.stateNode=e,i}function Vu(e,i,a){return i=ii(4,e.children!==null?e.children:[],e.key,i),i.lanes=a,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var am=new WeakMap;function _i(e,i){if(typeof e=="object"&&e!==null){var a=am.get(e);return a!==void 0?a:(i={value:e,source:i,stack:Qt(i)},am.set(e,i),i)}return{value:e,source:i,stack:Qt(i)}}var nr=[],ir=0,Rl=null,vo=0,vi=[],xi=0,Na=null,ki=1,Xi="";function na(e,i){nr[ir++]=vo,nr[ir++]=Rl,Rl=e,vo=i}function sm(e,i,a){vi[xi++]=ki,vi[xi++]=Xi,vi[xi++]=Na,Na=e;var o=ki;e=Xi;var u=32-te(o)-1;o&=~(1<<u),a+=1;var d=32-te(i)+u;if(30<d){var y=u-u%5;d=(o&(1<<y)-1).toString(32),o>>=y,u-=y,ki=1<<32-te(i)+u|a<<u|o,Xi=d+e}else ki=1<<d|a<<u|o,Xi=e}function ku(e){e.return!==null&&(na(e,1),sm(e,1,0))}function Xu(e){for(;e===Rl;)Rl=nr[--ir],nr[ir]=null,vo=nr[--ir],nr[ir]=null;for(;e===Na;)Na=vi[--xi],vi[xi]=null,Xi=vi[--xi],vi[xi]=null,ki=vi[--xi],vi[xi]=null}function rm(e,i){vi[xi++]=ki,vi[xi++]=Xi,vi[xi++]=Na,ki=i.id,Xi=i.overflow,Na=e}var Dn=null,je=null,Ee=!1,Oa=null,yi=!1,qu=Error(s(519));function Pa(e){var i=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw xo(_i(i,e)),qu}function om(e){var i=e.stateNode,a=e.type,o=e.memoizedProps;switch(i[en]=e,i[wn]=o,a){case"dialog":me("cancel",i),me("close",i);break;case"iframe":case"object":case"embed":me("load",i);break;case"video":case"audio":for(a=0;a<Go.length;a++)me(Go[a],i);break;case"source":me("error",i);break;case"img":case"image":case"link":me("error",i),me("load",i);break;case"details":me("toggle",i);break;case"input":me("invalid",i),Ui(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":me("invalid",i);break;case"textarea":me("invalid",i),Mp(i,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||i.textContent===""+a||o.suppressHydrationWarning===!0||Tg(i.textContent,a)?(o.popover!=null&&(me("beforetoggle",i),me("toggle",i)),o.onScroll!=null&&me("scroll",i),o.onScrollEnd!=null&&me("scrollend",i),o.onClick!=null&&(i.onclick=$i),i=!0):i=!1,i||Pa(e,!0)}function lm(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:yi=!1;return;case 27:case 3:yi=!0;return;default:Dn=Dn.return}}function ar(e){if(e!==Dn)return!1;if(!Ee)return lm(e),Ee=!0,!1;var i=e.tag,a;if((a=i!==3&&i!==27)&&((a=i===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||uh(e.type,e.memoizedProps)),a=!a),a&&je&&Pa(e),lm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=Ng(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=Ng(e)}else i===27?(i=je,Za(e.type)?(e=mh,mh=null,je=e):je=i):je=Dn?Mi(e.stateNode.nextSibling):null;return!0}function Es(){je=Dn=null,Ee=!1}function Wu(){var e=Oa;return e!==null&&(Qn===null?Qn=e:Qn.push.apply(Qn,e),Oa=null),e}function xo(e){Oa===null?Oa=[e]:Oa.push(e)}var Yu=z(null),Ts=null,ia=null;function za(e,i,a){yt(Yu,i._currentValue),i._currentValue=a}function aa(e){e._currentValue=Yu.current,st(Yu)}function ju(e,i,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===a)break;e=e.return}}function Zu(e,i,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var d=u.dependencies;if(d!==null){var y=u.child;d=d.firstContext;t:for(;d!==null;){var b=d;d=u;for(var I=0;I<i.length;I++)if(b.context===i[I]){d.lanes|=a,b=d.alternate,b!==null&&(b.lanes|=a),ju(d.return,a,e),o||(y=null);break t}d=b.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,d=y.alternate,d!==null&&(d.lanes|=a),ju(y,a,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function sr(e,i,a,o){e=null;for(var u=i,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var b=u.type;ni(u.pendingProps.value,y.value)||(e!==null?e.push(b):e=[b])}}else if(u===xt.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Wo):e=[Wo])}u=u.return}e!==null&&Zu(i,e,a,o),i.flags|=262144}function wl(e){for(e=e.firstContext;e!==null;){if(!ni(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function bs(e){Ts=e,ia=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return cm(Ts,e)}function Cl(e,i){return Ts===null&&bs(e),cm(e,i)}function cm(e,i){var a=i._currentValue;if(i={context:i,memoizedValue:a,next:null},ia===null){if(e===null)throw Error(s(308));ia=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ia=ia.next=i;return a}var vy=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(a){return a()})}},xy=r.unstable_scheduleCallback,yy=r.unstable_NormalPriority,un={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ku(){return{controller:new vy,data:new Map,refCount:0}}function yo(e){e.refCount--,e.refCount===0&&xy(yy,function(){e.controller.abort()})}var So=null,Qu=0,rr=0,or=null;function Sy(e,i){if(So===null){var a=So=[];Qu=0,rr=eh(),or={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Qu++,i.then(um,um),i}function um(){if(--Qu===0&&So!==null){or!==null&&(or.status="fulfilled");var e=So;So=null,rr=0,or=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function My(e,i){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<a.length;u++)(0,a[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var fm=P.S;P.S=function(e,i){j0=pt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&Sy(e,i),fm!==null&&fm(e,i)};var As=z(null);function Ju(){var e=As.current;return e!==null?e:We.pooledCache}function Dl(e,i){i===null?yt(As,As.current):yt(As,i.pool)}function hm(){var e=Ju();return e===null?null:{parent:un._currentValue,pool:e}}var lr=Error(s(460)),$u=Error(s(474)),Ul=Error(s(542)),Ll={then:function(){}};function dm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function pm(e,i,a){switch(a=e[a],a===void 0?e.push(i):a!==i&&(i.then($i,$i),i=a),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,gm(e),e;default:if(typeof i.status=="string")i.then($i,$i);else{if(e=We,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,gm(e),e}throw ws=i,lr}}function Rs(e){try{var i=e._init;return i(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ws=a,lr):a}}var ws=null;function mm(){if(ws===null)throw Error(s(459));var e=ws;return ws=null,e}function gm(e){if(e===lr||e===Ul)throw Error(s(483))}var cr=null,Mo=0;function Nl(e){var i=Mo;return Mo+=1,cr===null&&(cr=[]),pm(cr,e,i)}function Eo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ol(e,i){throw i.$$typeof===v?Error(s(525)):(e=Object.prototype.toString.call(i),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function _m(e){function i(Y,G){if(e){var et=Y.deletions;et===null?(Y.deletions=[G],Y.flags|=16):et.push(G)}}function a(Y,G){if(!e)return null;for(;G!==null;)i(Y,G),G=G.sibling;return null}function o(Y){for(var G=new Map;Y!==null;)Y.key!==null?G.set(Y.key,Y):G.set(Y.index,Y),Y=Y.sibling;return G}function u(Y,G){return Y=ea(Y,G),Y.index=0,Y.sibling=null,Y}function d(Y,G,et){return Y.index=et,e?(et=Y.alternate,et!==null?(et=et.index,et<G?(Y.flags|=67108866,G):et):(Y.flags|=67108866,G)):(Y.flags|=1048576,G)}function y(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function b(Y,G,et,mt){return G===null||G.tag!==6?(G=Gu(et,Y.mode,mt),G.return=Y,G):(G=u(G,et),G.return=Y,G)}function I(Y,G,et,mt){var jt=et.type;return jt===T?dt(Y,G,et.props.children,mt,et.key):G!==null&&(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===H&&Rs(jt)===G.type)?(G=u(G,et.props),Eo(G,et),G.return=Y,G):(G=Al(et.type,et.key,et.props,null,Y.mode,mt),Eo(G,et),G.return=Y,G)}function nt(Y,G,et,mt){return G===null||G.tag!==4||G.stateNode.containerInfo!==et.containerInfo||G.stateNode.implementation!==et.implementation?(G=Vu(et,Y.mode,mt),G.return=Y,G):(G=u(G,et.children||[]),G.return=Y,G)}function dt(Y,G,et,mt,jt){return G===null||G.tag!==7?(G=Ms(et,Y.mode,mt,jt),G.return=Y,G):(G=u(G,et),G.return=Y,G)}function _t(Y,G,et){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=Gu(""+G,Y.mode,et),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return et=Al(G.type,G.key,G.props,null,Y.mode,et),Eo(et,G),et.return=Y,et;case E:return G=Vu(G,Y.mode,et),G.return=Y,G;case H:return G=Rs(G),_t(Y,G,et)}if(ut(G)||Q(G))return G=Ms(G,Y.mode,et,null),G.return=Y,G;if(typeof G.then=="function")return _t(Y,Nl(G),et);if(G.$$typeof===C)return _t(Y,Cl(Y,G),et);Ol(Y,G)}return null}function it(Y,G,et,mt){var jt=G!==null?G.key:null;if(typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint")return jt!==null?null:b(Y,G,""+et,mt);if(typeof et=="object"&&et!==null){switch(et.$$typeof){case M:return et.key===jt?I(Y,G,et,mt):null;case E:return et.key===jt?nt(Y,G,et,mt):null;case H:return et=Rs(et),it(Y,G,et,mt)}if(ut(et)||Q(et))return jt!==null?null:dt(Y,G,et,mt,null);if(typeof et.then=="function")return it(Y,G,Nl(et),mt);if(et.$$typeof===C)return it(Y,G,Cl(Y,et),mt);Ol(Y,et)}return null}function lt(Y,G,et,mt,jt){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return Y=Y.get(et)||null,b(G,Y,""+mt,jt);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case M:return Y=Y.get(mt.key===null?et:mt.key)||null,I(G,Y,mt,jt);case E:return Y=Y.get(mt.key===null?et:mt.key)||null,nt(G,Y,mt,jt);case H:return mt=Rs(mt),lt(Y,G,et,mt,jt)}if(ut(mt)||Q(mt))return Y=Y.get(et)||null,dt(G,Y,mt,jt,null);if(typeof mt.then=="function")return lt(Y,G,et,Nl(mt),jt);if(mt.$$typeof===C)return lt(Y,G,et,Cl(G,mt),jt);Ol(G,mt)}return null}function Ft(Y,G,et,mt){for(var jt=null,De=null,qt=G,ce=G=0,ye=null;qt!==null&&ce<et.length;ce++){qt.index>ce?(ye=qt,qt=null):ye=qt.sibling;var Ue=it(Y,qt,et[ce],mt);if(Ue===null){qt===null&&(qt=ye);break}e&&qt&&Ue.alternate===null&&i(Y,qt),G=d(Ue,G,ce),De===null?jt=Ue:De.sibling=Ue,De=Ue,qt=ye}if(ce===et.length)return a(Y,qt),Ee&&na(Y,ce),jt;if(qt===null){for(;ce<et.length;ce++)qt=_t(Y,et[ce],mt),qt!==null&&(G=d(qt,G,ce),De===null?jt=qt:De.sibling=qt,De=qt);return Ee&&na(Y,ce),jt}for(qt=o(qt);ce<et.length;ce++)ye=lt(qt,Y,ce,et[ce],mt),ye!==null&&(e&&ye.alternate!==null&&qt.delete(ye.key===null?ce:ye.key),G=d(ye,G,ce),De===null?jt=ye:De.sibling=ye,De=ye);return e&&qt.forEach(function(ts){return i(Y,ts)}),Ee&&na(Y,ce),jt}function Jt(Y,G,et,mt){if(et==null)throw Error(s(151));for(var jt=null,De=null,qt=G,ce=G=0,ye=null,Ue=et.next();qt!==null&&!Ue.done;ce++,Ue=et.next()){qt.index>ce?(ye=qt,qt=null):ye=qt.sibling;var ts=it(Y,qt,Ue.value,mt);if(ts===null){qt===null&&(qt=ye);break}e&&qt&&ts.alternate===null&&i(Y,qt),G=d(ts,G,ce),De===null?jt=ts:De.sibling=ts,De=ts,qt=ye}if(Ue.done)return a(Y,qt),Ee&&na(Y,ce),jt;if(qt===null){for(;!Ue.done;ce++,Ue=et.next())Ue=_t(Y,Ue.value,mt),Ue!==null&&(G=d(Ue,G,ce),De===null?jt=Ue:De.sibling=Ue,De=Ue);return Ee&&na(Y,ce),jt}for(qt=o(qt);!Ue.done;ce++,Ue=et.next())Ue=lt(qt,Y,ce,Ue.value,mt),Ue!==null&&(e&&Ue.alternate!==null&&qt.delete(Ue.key===null?ce:Ue.key),G=d(Ue,G,ce),De===null?jt=Ue:De.sibling=Ue,De=Ue);return e&&qt.forEach(function(NS){return i(Y,NS)}),Ee&&na(Y,ce),jt}function qe(Y,G,et,mt){if(typeof et=="object"&&et!==null&&et.type===T&&et.key===null&&(et=et.props.children),typeof et=="object"&&et!==null){switch(et.$$typeof){case M:t:{for(var jt=et.key;G!==null;){if(G.key===jt){if(jt=et.type,jt===T){if(G.tag===7){a(Y,G.sibling),mt=u(G,et.props.children),mt.return=Y,Y=mt;break t}}else if(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===H&&Rs(jt)===G.type){a(Y,G.sibling),mt=u(G,et.props),Eo(mt,et),mt.return=Y,Y=mt;break t}a(Y,G);break}else i(Y,G);G=G.sibling}et.type===T?(mt=Ms(et.props.children,Y.mode,mt,et.key),mt.return=Y,Y=mt):(mt=Al(et.type,et.key,et.props,null,Y.mode,mt),Eo(mt,et),mt.return=Y,Y=mt)}return y(Y);case E:t:{for(jt=et.key;G!==null;){if(G.key===jt)if(G.tag===4&&G.stateNode.containerInfo===et.containerInfo&&G.stateNode.implementation===et.implementation){a(Y,G.sibling),mt=u(G,et.children||[]),mt.return=Y,Y=mt;break t}else{a(Y,G);break}else i(Y,G);G=G.sibling}mt=Vu(et,Y.mode,mt),mt.return=Y,Y=mt}return y(Y);case H:return et=Rs(et),qe(Y,G,et,mt)}if(ut(et))return Ft(Y,G,et,mt);if(Q(et)){if(jt=Q(et),typeof jt!="function")throw Error(s(150));return et=jt.call(et),Jt(Y,G,et,mt)}if(typeof et.then=="function")return qe(Y,G,Nl(et),mt);if(et.$$typeof===C)return qe(Y,G,Cl(Y,et),mt);Ol(Y,et)}return typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint"?(et=""+et,G!==null&&G.tag===6?(a(Y,G.sibling),mt=u(G,et),mt.return=Y,Y=mt):(a(Y,G),mt=Gu(et,Y.mode,mt),mt.return=Y,Y=mt),y(Y)):a(Y,G)}return function(Y,G,et,mt){try{Mo=0;var jt=qe(Y,G,et,mt);return cr=null,jt}catch(qt){if(qt===lr||qt===Ul)throw qt;var De=ii(29,qt,null,Y.mode);return De.lanes=mt,De.return=Y,De}finally{}}}var Cs=_m(!0),vm=_m(!1),Ba=!1;function tf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ef(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ia(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Fa(e,i,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=bl(e),em(e,null,a),i}return Tl(e,o,i,a),bl(e)}function To(e,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,so(e,a)}}function nf(e,i){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=y:d=d.next=y,a=a.next}while(a!==null);d===null?u=d=i:d=d.next=i}else u=d=i;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=i:e.next=i,a.lastBaseUpdate=i}var af=!1;function bo(){if(af){var e=or;if(e!==null)throw e}}function Ao(e,i,a,o){af=!1;var u=e.updateQueue;Ba=!1;var d=u.firstBaseUpdate,y=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var I=b,nt=I.next;I.next=null,y===null?d=nt:y.next=nt,y=I;var dt=e.alternate;dt!==null&&(dt=dt.updateQueue,b=dt.lastBaseUpdate,b!==y&&(b===null?dt.firstBaseUpdate=nt:b.next=nt,dt.lastBaseUpdate=I))}if(d!==null){var _t=u.baseState;y=0,dt=nt=I=null,b=d;do{var it=b.lane&-536870913,lt=it!==b.lane;if(lt?(xe&it)===it:(o&it)===it){it!==0&&it===rr&&(af=!0),dt!==null&&(dt=dt.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Ft=e,Jt=b;it=i;var qe=a;switch(Jt.tag){case 1:if(Ft=Jt.payload,typeof Ft=="function"){_t=Ft.call(qe,_t,it);break t}_t=Ft;break t;case 3:Ft.flags=Ft.flags&-65537|128;case 0:if(Ft=Jt.payload,it=typeof Ft=="function"?Ft.call(qe,_t,it):Ft,it==null)break t;_t=_({},_t,it);break t;case 2:Ba=!0}}it=b.callback,it!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[it]:lt.push(it))}else lt={lane:it,tag:b.tag,payload:b.payload,callback:b.callback,next:null},dt===null?(nt=dt=lt,I=_t):dt=dt.next=lt,y|=it;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;lt=b,b=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);dt===null&&(I=_t),u.baseState=I,u.firstBaseUpdate=nt,u.lastBaseUpdate=dt,d===null&&(u.shared.lanes=0),Xa|=y,e.lanes=y,e.memoizedState=_t}}function xm(e,i){if(typeof e!="function")throw Error(s(191,e));e.call(i)}function ym(e,i){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)xm(a[e],i)}var ur=z(null),Pl=z(0);function Sm(e,i){e=da,yt(Pl,e),yt(ur,i),da=e|i.baseLanes}function sf(){yt(Pl,da),yt(ur,ur.current)}function rf(){da=Pl.current,st(ur),st(Pl)}var ai=z(null),Si=null;function Ha(e){var i=e.alternate;yt(on,on.current&1),yt(ai,e),Si===null&&(i===null||ur.current!==null||i.memoizedState!==null)&&(Si=e)}function of(e){yt(on,on.current),yt(ai,e),Si===null&&(Si=e)}function Mm(e){e.tag===22?(yt(on,on.current),yt(ai,e),Si===null&&(Si=e)):Ga()}function Ga(){yt(on,on.current),yt(ai,ai.current)}function si(e){st(ai),Si===e&&(Si=null),st(on)}var on=z(0);function zl(e){for(var i=e;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||dh(a)||ph(a)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var sa=0,le=null,ke=null,fn=null,Bl=!1,fr=!1,Ds=!1,Il=0,Ro=0,hr=null,Ey=0;function nn(){throw Error(s(321))}function lf(e,i){if(i===null)return!1;for(var a=0;a<i.length&&a<e.length;a++)if(!ni(e[a],i[a]))return!1;return!0}function cf(e,i,a,o,u,d){return sa=d,le=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,P.H=e===null||e.memoizedState===null?s0:Tf,Ds=!1,d=a(o,u),Ds=!1,fr&&(d=Tm(i,a,o,u)),Em(e),d}function Em(e){P.H=Do;var i=ke!==null&&ke.next!==null;if(sa=0,fn=ke=le=null,Bl=!1,Ro=0,hr=null,i)throw Error(s(300));e===null||hn||(e=e.dependencies,e!==null&&wl(e)&&(hn=!0))}function Tm(e,i,a,o){le=e;var u=0;do{if(fr&&(hr=null),Ro=0,fr=!1,25<=u)throw Error(s(301));if(u+=1,fn=ke=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}P.H=r0,d=i(a,o)}while(fr);return d}function Ty(){var e=P.H,i=e.useState()[0];return i=typeof i.then=="function"?wo(i):i,e=e.useState()[0],(ke!==null?ke.memoizedState:null)!==e&&(le.flags|=1024),i}function uf(){var e=Il!==0;return Il=0,e}function ff(e,i,a){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~a}function hf(e){if(Bl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Bl=!1}sa=0,fn=ke=le=null,fr=!1,Ro=Il=0,hr=null}function Gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?le.memoizedState=fn=e:fn=fn.next=e,fn}function ln(){if(ke===null){var e=le.alternate;e=e!==null?e.memoizedState:null}else e=ke.next;var i=fn===null?le.memoizedState:fn.next;if(i!==null)fn=i,ke=e;else{if(e===null)throw le.alternate===null?Error(s(467)):Error(s(310));ke=e,e={memoizedState:ke.memoizedState,baseState:ke.baseState,baseQueue:ke.baseQueue,queue:ke.queue,next:null},fn===null?le.memoizedState=fn=e:fn=fn.next=e}return fn}function Fl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function wo(e){var i=Ro;return Ro+=1,hr===null&&(hr=[]),e=pm(hr,e,i),i=le,(fn===null?i.memoizedState:fn.next)===null&&(i=i.alternate,P.H=i===null||i.memoizedState===null?s0:Tf),e}function Hl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return wo(e);if(e.$$typeof===C)return Un(e)}throw Error(s(438,String(e)))}function df(e){var i=null,a=le.updateQueue;if(a!==null&&(i=a.memoCache),i==null){var o=le.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),a===null&&(a=Fl(),le.updateQueue=a),a.memoCache=i,a=i.data[i.index],a===void 0)for(a=i.data[i.index]=Array(e),o=0;o<e;o++)a[o]=w;return i.index++,a}function ra(e,i){return typeof i=="function"?i(e):i}function Gl(e){var i=ln();return pf(i,ke,e)}function pf(e,i,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,d=o.pending;if(d!==null){if(u!==null){var y=u.next;u.next=d.next,d.next=y}i.baseQueue=u=d,o.pending=null}if(d=e.baseState,u===null)e.memoizedState=d;else{i=u.next;var b=y=null,I=null,nt=i,dt=!1;do{var _t=nt.lane&-536870913;if(_t!==nt.lane?(xe&_t)===_t:(sa&_t)===_t){var it=nt.revertLane;if(it===0)I!==null&&(I=I.next={lane:0,revertLane:0,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null}),_t===rr&&(dt=!0);else if((sa&it)===it){nt=nt.next,it===rr&&(dt=!0);continue}else _t={lane:0,revertLane:nt.revertLane,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},I===null?(b=I=_t,y=d):I=I.next=_t,le.lanes|=it,Xa|=it;_t=nt.action,Ds&&a(d,_t),d=nt.hasEagerState?nt.eagerState:a(d,_t)}else it={lane:_t,revertLane:nt.revertLane,gesture:nt.gesture,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},I===null?(b=I=it,y=d):I=I.next=it,le.lanes|=_t,Xa|=_t;nt=nt.next}while(nt!==null&&nt!==i);if(I===null?y=d:I.next=b,!ni(d,e.memoizedState)&&(hn=!0,dt&&(a=or,a!==null)))throw a;e.memoizedState=d,e.baseState=y,e.baseQueue=I,o.lastRenderedState=d}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function mf(e){var i=ln(),a=i.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,d=i.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do d=e(d,y.action),y=y.next;while(y!==u);ni(d,i.memoizedState)||(hn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),a.lastRenderedState=d}return[d,o]}function bm(e,i,a){var o=le,u=ln(),d=Ee;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=i();var y=!ni((ke||u).memoizedState,a);if(y&&(u.memoizedState=a,hn=!0),u=u.queue,vf(wm.bind(null,o,u,e),[e]),u.getSnapshot!==i||y||fn!==null&&fn.memoizedState.tag&1){if(o.flags|=2048,dr(9,{destroy:void 0},Rm.bind(null,o,u,a,i),null),We===null)throw Error(s(349));d||(sa&127)!==0||Am(o,i,a)}return a}function Am(e,i,a){e.flags|=16384,e={getSnapshot:i,value:a},i=le.updateQueue,i===null?(i=Fl(),le.updateQueue=i,i.stores=[e]):(a=i.stores,a===null?i.stores=[e]:a.push(e))}function Rm(e,i,a,o){i.value=a,i.getSnapshot=o,Cm(i)&&Dm(e)}function wm(e,i,a){return a(function(){Cm(i)&&Dm(e)})}function Cm(e){var i=e.getSnapshot;e=e.value;try{var a=i();return!ni(e,a)}catch{return!0}}function Dm(e){var i=Ss(e,2);i!==null&&Jn(i,e,2)}function gf(e){var i=Gn();if(typeof e=="function"){var a=e;if(e=a(),Ds){Pt(!0);try{a()}finally{Pt(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ra,lastRenderedState:e},i}function Um(e,i,a,o){return e.baseState=a,pf(e,ke,typeof o=="function"?o:ra)}function by(e,i,a,o,u){if(Xl(e))throw Error(s(485));if(e=i.action,e!==null){var d={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};P.T!==null?a(!0):d.isTransition=!1,o(d),a=i.pending,a===null?(d.next=i.pending=d,Lm(i,d)):(d.next=a.next,i.pending=a.next=d)}}function Lm(e,i){var a=i.action,o=i.payload,u=e.state;if(i.isTransition){var d=P.T,y={};P.T=y;try{var b=a(u,o),I=P.S;I!==null&&I(y,b),Nm(e,i,b)}catch(nt){_f(e,i,nt)}finally{d!==null&&y.types!==null&&(d.types=y.types),P.T=d}}else try{d=a(u,o),Nm(e,i,d)}catch(nt){_f(e,i,nt)}}function Nm(e,i,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Om(e,i,o)},function(o){return _f(e,i,o)}):Om(e,i,a)}function Om(e,i,a){i.status="fulfilled",i.value=a,Pm(i),e.state=a,i=e.pending,i!==null&&(a=i.next,a===i?e.pending=null:(a=a.next,i.next=a,Lm(e,a)))}function _f(e,i,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=a,Pm(i),i=i.next;while(i!==o)}e.action=null}function Pm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function zm(e,i){return i}function Bm(e,i){if(Ee){var a=We.formState;if(a!==null){t:{var o=le;if(Ee){if(je){e:{for(var u=je,d=yi;u.nodeType!==8;){if(!d){u=null;break e}if(u=Mi(u.nextSibling),u===null){u=null;break e}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){je=Mi(u.nextSibling),o=u.data==="F!";break t}}Pa(o)}o=!1}o&&(i=a[0])}}return a=Gn(),a.memoizedState=a.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zm,lastRenderedState:i},a.queue=o,a=n0.bind(null,le,o),o.dispatch=a,o=gf(!1),d=Ef.bind(null,le,!1,o.queue),o=Gn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,a=by.bind(null,le,u,d,a),u.dispatch=a,o.memoizedState=e,[i,a,!1]}function Im(e){var i=ln();return Fm(i,ke,e)}function Fm(e,i,a){if(i=pf(e,i,zm)[0],e=Gl(ra)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=wo(i)}catch(y){throw y===lr?Ul:y}else o=i;i=ln();var u=i.queue,d=u.dispatch;return a!==i.memoizedState&&(le.flags|=2048,dr(9,{destroy:void 0},Ay.bind(null,u,a),null)),[o,d,e]}function Ay(e,i){e.action=i}function Hm(e){var i=ln(),a=ke;if(a!==null)return Fm(i,a,e);ln(),i=i.memoizedState,a=ln();var o=a.queue.dispatch;return a.memoizedState=e,[i,o,!1]}function dr(e,i,a,o){return e={tag:e,create:a,deps:o,inst:i,next:null},i=le.updateQueue,i===null&&(i=Fl(),le.updateQueue=i),a=i.lastEffect,a===null?i.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,i.lastEffect=e),e}function Gm(){return ln().memoizedState}function Vl(e,i,a,o){var u=Gn();le.flags|=e,u.memoizedState=dr(1|i,{destroy:void 0},a,o===void 0?null:o)}function kl(e,i,a,o){var u=ln();o=o===void 0?null:o;var d=u.memoizedState.inst;ke!==null&&o!==null&&lf(o,ke.memoizedState.deps)?u.memoizedState=dr(i,d,a,o):(le.flags|=e,u.memoizedState=dr(1|i,d,a,o))}function Vm(e,i){Vl(8390656,8,e,i)}function vf(e,i){kl(2048,8,e,i)}function Ry(e){le.flags|=4;var i=le.updateQueue;if(i===null)i=Fl(),le.updateQueue=i,i.events=[e];else{var a=i.events;a===null?i.events=[e]:a.push(e)}}function km(e){var i=ln().memoizedState;return Ry({ref:i,nextImpl:e}),function(){if((Le&2)!==0)throw Error(s(440));return i.impl.apply(void 0,arguments)}}function Xm(e,i){return kl(4,2,e,i)}function qm(e,i){return kl(4,4,e,i)}function Wm(e,i){if(typeof i=="function"){e=e();var a=i(e);return function(){typeof a=="function"?a():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function Ym(e,i,a){a=a!=null?a.concat([e]):null,kl(4,4,Wm.bind(null,i,e),a)}function xf(){}function jm(e,i){var a=ln();i=i===void 0?null:i;var o=a.memoizedState;return i!==null&&lf(i,o[1])?o[0]:(a.memoizedState=[e,i],e)}function Zm(e,i){var a=ln();i=i===void 0?null:i;var o=a.memoizedState;if(i!==null&&lf(i,o[1]))return o[0];if(o=e(),Ds){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[o,i],o}function yf(e,i,a){return a===void 0||(sa&1073741824)!==0&&(xe&261930)===0?e.memoizedState=i:(e.memoizedState=a,e=K0(),le.lanes|=e,Xa|=e,a)}function Km(e,i,a,o){return ni(a,i)?a:ur.current!==null?(e=yf(e,a,o),ni(e,i)||(hn=!0),e):(sa&42)===0||(sa&1073741824)!==0&&(xe&261930)===0?(hn=!0,e.memoizedState=a):(e=K0(),le.lanes|=e,Xa|=e,i)}function Qm(e,i,a,o,u){var d=j.p;j.p=d!==0&&8>d?d:8;var y=P.T,b={};P.T=b,Ef(e,!1,i,a);try{var I=u(),nt=P.S;if(nt!==null&&nt(b,I),I!==null&&typeof I=="object"&&typeof I.then=="function"){var dt=My(I,o);Co(e,i,dt,li(e))}else Co(e,i,o,li(e))}catch(_t){Co(e,i,{then:function(){},status:"rejected",reason:_t},li())}finally{j.p=d,y!==null&&b.types!==null&&(y.types=b.types),P.T=y}}function wy(){}function Sf(e,i,a,o){if(e.tag!==5)throw Error(s(476));var u=Jm(e).queue;Qm(e,u,i,Z,a===null?wy:function(){return $m(e),a(o)})}function Jm(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:Z,baseState:Z,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ra,lastRenderedState:Z},next:null};var a={};return i.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ra,lastRenderedState:a},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function $m(e){var i=Jm(e);i.next===null&&(i=e.alternate.memoizedState),Co(e,i.next.queue,{},li())}function Mf(){return Un(Wo)}function t0(){return ln().memoizedState}function e0(){return ln().memoizedState}function Cy(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var a=li();e=Ia(a);var o=Fa(i,e,a);o!==null&&(Jn(o,i,a),To(o,i,a)),i={cache:Ku()},e.payload=i;return}i=i.return}}function Dy(e,i,a){var o=li();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Xl(e)?i0(i,a):(a=Fu(e,i,a,o),a!==null&&(Jn(a,e,o),a0(a,i,o)))}function n0(e,i,a){var o=li();Co(e,i,a,o)}function Co(e,i,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Xl(e))i0(i,u);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var y=i.lastRenderedState,b=d(y,a);if(u.hasEagerState=!0,u.eagerState=b,ni(b,y))return Tl(e,i,u,0),We===null&&El(),!1}catch{}finally{}if(a=Fu(e,i,u,o),a!==null)return Jn(a,e,o),a0(a,i,o),!0}return!1}function Ef(e,i,a,o){if(o={lane:2,revertLane:eh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Xl(e)){if(i)throw Error(s(479))}else i=Fu(e,a,o,2),i!==null&&Jn(i,e,2)}function Xl(e){var i=e.alternate;return e===le||i!==null&&i===le}function i0(e,i){fr=Bl=!0;var a=e.pending;a===null?i.next=i:(i.next=a.next,a.next=i),e.pending=i}function a0(e,i,a){if((a&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,so(e,a)}}var Do={readContext:Un,use:Hl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};Do.useEffectEvent=nn;var s0={readContext:Un,use:Hl,useCallback:function(e,i){return Gn().memoizedState=[e,i===void 0?null:i],e},useContext:Un,useEffect:Vm,useImperativeHandle:function(e,i,a){a=a!=null?a.concat([e]):null,Vl(4194308,4,Wm.bind(null,i,e),a)},useLayoutEffect:function(e,i){return Vl(4194308,4,e,i)},useInsertionEffect:function(e,i){Vl(4,2,e,i)},useMemo:function(e,i){var a=Gn();i=i===void 0?null:i;var o=e();if(Ds){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[o,i],o},useReducer:function(e,i,a){var o=Gn();if(a!==void 0){var u=a(i);if(Ds){Pt(!0);try{a(i)}finally{Pt(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Dy.bind(null,le,e),[o.memoizedState,e]},useRef:function(e){var i=Gn();return e={current:e},i.memoizedState=e},useState:function(e){e=gf(e);var i=e.queue,a=n0.bind(null,le,i);return i.dispatch=a,[e.memoizedState,a]},useDebugValue:xf,useDeferredValue:function(e,i){var a=Gn();return yf(a,e,i)},useTransition:function(){var e=gf(!1);return e=Qm.bind(null,le,e.queue,!0,!1),Gn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,a){var o=le,u=Gn();if(Ee){if(a===void 0)throw Error(s(407));a=a()}else{if(a=i(),We===null)throw Error(s(349));(xe&127)!==0||Am(o,i,a)}u.memoizedState=a;var d={value:a,getSnapshot:i};return u.queue=d,Vm(wm.bind(null,o,d,e),[e]),o.flags|=2048,dr(9,{destroy:void 0},Rm.bind(null,o,d,a,i),null),a},useId:function(){var e=Gn(),i=We.identifierPrefix;if(Ee){var a=Xi,o=ki;a=(o&~(1<<32-te(o)-1)).toString(32)+a,i="_"+i+"R_"+a,a=Il++,0<a&&(i+="H"+a.toString(32)),i+="_"}else a=Ey++,i="_"+i+"r_"+a.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Mf,useFormState:Bm,useActionState:Bm,useOptimistic:function(e){var i=Gn();i.memoizedState=i.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=a,i=Ef.bind(null,le,!0,a),a.dispatch=i,[e,i]},useMemoCache:df,useCacheRefresh:function(){return Gn().memoizedState=Cy.bind(null,le)},useEffectEvent:function(e){var i=Gn(),a={impl:e};return i.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Tf={readContext:Un,use:Hl,useCallback:jm,useContext:Un,useEffect:vf,useImperativeHandle:Ym,useInsertionEffect:Xm,useLayoutEffect:qm,useMemo:Zm,useReducer:Gl,useRef:Gm,useState:function(){return Gl(ra)},useDebugValue:xf,useDeferredValue:function(e,i){var a=ln();return Km(a,ke.memoizedState,e,i)},useTransition:function(){var e=Gl(ra)[0],i=ln().memoizedState;return[typeof e=="boolean"?e:wo(e),i]},useSyncExternalStore:bm,useId:t0,useHostTransitionStatus:Mf,useFormState:Im,useActionState:Im,useOptimistic:function(e,i){var a=ln();return Um(a,ke,e,i)},useMemoCache:df,useCacheRefresh:e0};Tf.useEffectEvent=km;var r0={readContext:Un,use:Hl,useCallback:jm,useContext:Un,useEffect:vf,useImperativeHandle:Ym,useInsertionEffect:Xm,useLayoutEffect:qm,useMemo:Zm,useReducer:mf,useRef:Gm,useState:function(){return mf(ra)},useDebugValue:xf,useDeferredValue:function(e,i){var a=ln();return ke===null?yf(a,e,i):Km(a,ke.memoizedState,e,i)},useTransition:function(){var e=mf(ra)[0],i=ln().memoizedState;return[typeof e=="boolean"?e:wo(e),i]},useSyncExternalStore:bm,useId:t0,useHostTransitionStatus:Mf,useFormState:Hm,useActionState:Hm,useOptimistic:function(e,i){var a=ln();return ke!==null?Um(a,ke,e,i):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:df,useCacheRefresh:e0};r0.useEffectEvent=km;function bf(e,i,a,o){i=e.memoizedState,a=a(o,i),a=a==null?i:_({},i,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Af={enqueueSetState:function(e,i,a){e=e._reactInternals;var o=li(),u=Ia(o);u.payload=i,a!=null&&(u.callback=a),i=Fa(e,u,o),i!==null&&(Jn(i,e,o),To(i,e,o))},enqueueReplaceState:function(e,i,a){e=e._reactInternals;var o=li(),u=Ia(o);u.tag=1,u.payload=i,a!=null&&(u.callback=a),i=Fa(e,u,o),i!==null&&(Jn(i,e,o),To(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var a=li(),o=Ia(a);o.tag=2,i!=null&&(o.callback=i),i=Fa(e,o,a),i!==null&&(Jn(i,e,a),To(i,e,a))}};function o0(e,i,a,o,u,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,d,y):i.prototype&&i.prototype.isPureReactComponent?!go(a,o)||!go(u,d):!0}function l0(e,i,a,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,o),i.state!==e&&Af.enqueueReplaceState(i,i.state,null)}function Us(e,i){var a=i;if("ref"in i){a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}if(e=e.defaultProps){a===i&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function c0(e){Ml(e)}function u0(e){console.error(e)}function f0(e){Ml(e)}function ql(e,i){try{var a=e.onUncaughtError;a(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function h0(e,i,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Rf(e,i,a){return a=Ia(a),a.tag=3,a.payload={element:null},a.callback=function(){ql(e,i)},a}function d0(e){return e=Ia(e),e.tag=3,e}function p0(e,i,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;e.payload=function(){return u(d)},e.callback=function(){h0(i,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){h0(i,a,o),typeof u!="function"&&(qa===null?qa=new Set([this]):qa.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function Uy(e,i,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=a.alternate,i!==null&&sr(i,a,u,!0),a=ai.current,a!==null){switch(a.tag){case 31:case 13:return Si===null?ic():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Ll?a.flags|=16384:(i=a.updateQueue,i===null?a.updateQueue=new Set([o]):i.add(o),Jf(e,o,u)),!1;case 22:return a.flags|=65536,o===Ll?a.flags|=16384:(i=a.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=i):(a=i.retryQueue,a===null?i.retryQueue=new Set([o]):a.add(o)),Jf(e,o,u)),!1}throw Error(s(435,a.tag))}return Jf(e,o,u),ic(),!1}if(Ee)return i=ai.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==qu&&(e=Error(s(422),{cause:o}),xo(_i(e,a)))):(o!==qu&&(i=Error(s(423),{cause:o}),xo(_i(i,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=_i(o,a),u=Rf(e.stateNode,o,u),nf(e,u),an!==4&&(an=2)),!1;var d=Error(s(520),{cause:o});if(d=_i(d,a),Io===null?Io=[d]:Io.push(d),an!==4&&(an=2),i===null)return!0;o=_i(o,a),a=i;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=Rf(a.stateNode,o,e),nf(a,e),!1;case 1:if(i=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(qa===null||!qa.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=d0(u),p0(u,e,a,o),nf(a,u),!1}a=a.return}while(a!==null);return!1}var wf=Error(s(461)),hn=!1;function Ln(e,i,a,o){i.child=e===null?vm(i,null,a,o):Cs(i,e.child,a,o)}function m0(e,i,a,o,u){a=a.render;var d=i.ref;if("ref"in o){var y={};for(var b in o)b!=="ref"&&(y[b]=o[b])}else y=o;return bs(i),o=cf(e,i,a,y,d,u),b=uf(),e!==null&&!hn?(ff(e,i,u),oa(e,i,u)):(Ee&&b&&ku(i),i.flags|=1,Ln(e,i,o,u),i.child)}function g0(e,i,a,o,u){if(e===null){var d=a.type;return typeof d=="function"&&!Hu(d)&&d.defaultProps===void 0&&a.compare===null?(i.tag=15,i.type=d,_0(e,i,d,o,u)):(e=Al(a.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!zf(e,u)){var y=d.memoizedProps;if(a=a.compare,a=a!==null?a:go,a(y,o)&&e.ref===i.ref)return oa(e,i,u)}return i.flags|=1,e=ea(d,o),e.ref=i.ref,e.return=i,i.child=e}function _0(e,i,a,o,u){if(e!==null){var d=e.memoizedProps;if(go(d,o)&&e.ref===i.ref)if(hn=!1,i.pendingProps=o=d,zf(e,u))(e.flags&131072)!==0&&(hn=!0);else return i.lanes=e.lanes,oa(e,i,u)}return Cf(e,i,a,o,u)}function v0(e,i,a,o){var u=o.children,d=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,i.child=null;return x0(e,i,d,a,o)}if((a&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Dl(i,d!==null?d.cachePool:null),d!==null?Sm(i,d):sf(),Mm(i);else return o=i.lanes=536870912,x0(e,i,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(Dl(i,d.cachePool),Sm(i,d),Ga(),i.memoizedState=null):(e!==null&&Dl(i,null),sf(),Ga());return Ln(e,i,u,a),i.child}function Uo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function x0(e,i,a,o,u){var d=Ju();return d=d===null?null:{parent:un._currentValue,pool:d},i.memoizedState={baseLanes:a,cachePool:d},e!==null&&Dl(i,null),sf(),Mm(i),e!==null&&sr(e,i,o,!0),i.childLanes=u,null}function Wl(e,i){return i=jl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function y0(e,i,a){return Cs(i,e.child,null,a),e=Wl(i,i.pendingProps),e.flags|=2,si(i),i.memoizedState=null,e}function Ly(e,i,a){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ee){if(o.mode==="hidden")return e=Wl(i,o),i.lanes=536870912,Uo(null,e);if(of(i),(e=je)?(e=Lg(e,yi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Na!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=im(e),a.return=i,i.child=a,Dn=i,je=null)):e=null,e===null)throw Pa(i);return i.lanes=536870912,null}return Wl(i,o)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(of(i),u)if(i.flags&256)i.flags&=-257,i=y0(e,i,a);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(s(558));else if(hn||sr(e,i,a,!1),u=(a&e.childLanes)!==0,hn||u){if(o=We,o!==null&&(y=Vi(o,a),y!==0&&y!==d.retryLane))throw d.retryLane=y,Ss(e,y),Jn(o,e,y),wf;ic(),i=y0(e,i,a)}else e=d.treeContext,je=Mi(y.nextSibling),Dn=i,Ee=!0,Oa=null,yi=!1,e!==null&&rm(i,e),i=Wl(i,o),i.flags|=4096;return i}return e=ea(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Yl(e,i){var a=i.ref;if(a===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(i.flags|=4194816)}}function Cf(e,i,a,o,u){return bs(i),a=cf(e,i,a,o,void 0,u),o=uf(),e!==null&&!hn?(ff(e,i,u),oa(e,i,u)):(Ee&&o&&ku(i),i.flags|=1,Ln(e,i,a,u),i.child)}function S0(e,i,a,o,u,d){return bs(i),i.updateQueue=null,a=Tm(i,o,a,u),Em(e),o=uf(),e!==null&&!hn?(ff(e,i,d),oa(e,i,d)):(Ee&&o&&ku(i),i.flags|=1,Ln(e,i,a,d),i.child)}function M0(e,i,a,o,u){if(bs(i),i.stateNode===null){var d=er,y=a.contextType;typeof y=="object"&&y!==null&&(d=Un(y)),d=new a(o,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Af,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=o,d.state=i.memoizedState,d.refs={},tf(i),y=a.contextType,d.context=typeof y=="object"&&y!==null?Un(y):er,d.state=i.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(bf(i,a,y,o),d.state=i.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Af.enqueueReplaceState(d,d.state,null),Ao(i,o,d,u),bo(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){d=i.stateNode;var b=i.memoizedProps,I=Us(a,b);d.props=I;var nt=d.context,dt=a.contextType;y=er,typeof dt=="object"&&dt!==null&&(y=Un(dt));var _t=a.getDerivedStateFromProps;dt=typeof _t=="function"||typeof d.getSnapshotBeforeUpdate=="function",b=i.pendingProps!==b,dt||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(b||nt!==y)&&l0(i,d,o,y),Ba=!1;var it=i.memoizedState;d.state=it,Ao(i,o,d,u),bo(),nt=i.memoizedState,b||it!==nt||Ba?(typeof _t=="function"&&(bf(i,a,_t,o),nt=i.memoizedState),(I=Ba||o0(i,a,I,o,it,nt,y))?(dt||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=nt),d.props=o,d.state=nt,d.context=y,o=I):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{d=i.stateNode,ef(e,i),y=i.memoizedProps,dt=Us(a,y),d.props=dt,_t=i.pendingProps,it=d.context,nt=a.contextType,I=er,typeof nt=="object"&&nt!==null&&(I=Un(nt)),b=a.getDerivedStateFromProps,(nt=typeof b=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==_t||it!==I)&&l0(i,d,o,I),Ba=!1,it=i.memoizedState,d.state=it,Ao(i,o,d,u),bo();var lt=i.memoizedState;y!==_t||it!==lt||Ba||e!==null&&e.dependencies!==null&&wl(e.dependencies)?(typeof b=="function"&&(bf(i,a,b,o),lt=i.memoizedState),(dt=Ba||o0(i,a,dt,o,it,lt,I)||e!==null&&e.dependencies!==null&&wl(e.dependencies))?(nt||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,lt,I),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,lt,I)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=lt),d.props=o,d.state=lt,d.context=I,o=dt):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),o=!1)}return d=o,Yl(e,i),o=(i.flags&128)!==0,d||o?(d=i.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&o?(i.child=Cs(i,e.child,null,u),i.child=Cs(i,null,a,u)):Ln(e,i,a,u),i.memoizedState=d.state,e=i.child):e=oa(e,i,u),e}function E0(e,i,a,o){return Es(),i.flags|=256,Ln(e,i,a,o),i.child}var Df={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Uf(e){return{baseLanes:e,cachePool:hm()}}function Lf(e,i,a){return e=e!==null?e.childLanes&~a:0,i&&(e|=oi),e}function T0(e,i,a){var o=i.pendingProps,u=!1,d=(i.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),y&&(u=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ee){if(u?Ha(i):Ga(),(e=je)?(e=Lg(e,yi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Na!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=im(e),a.return=i,i.child=a,Dn=i,je=null)):e=null,e===null)throw Pa(i);return ph(e)?i.lanes=32:i.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Ga(),u=i.mode,b=jl({mode:"hidden",children:b},u),o=Ms(o,u,a,null),b.return=i,o.return=i,b.sibling=o,i.child=b,o=i.child,o.memoizedState=Uf(a),o.childLanes=Lf(e,y,a),i.memoizedState=Df,Uo(null,o)):(Ha(i),Nf(i,b))}var I=e.memoizedState;if(I!==null&&(b=I.dehydrated,b!==null)){if(d)i.flags&256?(Ha(i),i.flags&=-257,i=Of(e,i,a)):i.memoizedState!==null?(Ga(),i.child=e.child,i.flags|=128,i=null):(Ga(),b=o.fallback,u=i.mode,o=jl({mode:"visible",children:o.children},u),b=Ms(b,u,a,null),b.flags|=2,o.return=i,b.return=i,o.sibling=b,i.child=o,Cs(i,e.child,null,a),o=i.child,o.memoizedState=Uf(a),o.childLanes=Lf(e,y,a),i.memoizedState=Df,i=Uo(null,o));else if(Ha(i),ph(b)){if(y=b.nextSibling&&b.nextSibling.dataset,y)var nt=y.dgst;y=nt,o=Error(s(419)),o.stack="",o.digest=y,xo({value:o,source:null,stack:null}),i=Of(e,i,a)}else if(hn||sr(e,i,a,!1),y=(a&e.childLanes)!==0,hn||y){if(y=We,y!==null&&(o=Vi(y,a),o!==0&&o!==I.retryLane))throw I.retryLane=o,Ss(e,o),Jn(y,e,o),wf;dh(b)||ic(),i=Of(e,i,a)}else dh(b)?(i.flags|=192,i.child=e.child,i=null):(e=I.treeContext,je=Mi(b.nextSibling),Dn=i,Ee=!0,Oa=null,yi=!1,e!==null&&rm(i,e),i=Nf(i,o.children),i.flags|=4096);return i}return u?(Ga(),b=o.fallback,u=i.mode,I=e.child,nt=I.sibling,o=ea(I,{mode:"hidden",children:o.children}),o.subtreeFlags=I.subtreeFlags&65011712,nt!==null?b=ea(nt,b):(b=Ms(b,u,a,null),b.flags|=2),b.return=i,o.return=i,o.sibling=b,i.child=o,Uo(null,o),o=i.child,b=e.child.memoizedState,b===null?b=Uf(a):(u=b.cachePool,u!==null?(I=un._currentValue,u=u.parent!==I?{parent:I,pool:I}:u):u=hm(),b={baseLanes:b.baseLanes|a,cachePool:u}),o.memoizedState=b,o.childLanes=Lf(e,y,a),i.memoizedState=Df,Uo(e.child,o)):(Ha(i),a=e.child,e=a.sibling,a=ea(a,{mode:"visible",children:o.children}),a.return=i,a.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=a,i.memoizedState=null,a)}function Nf(e,i){return i=jl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function jl(e,i){return e=ii(22,e,null,i),e.lanes=0,e}function Of(e,i,a){return Cs(i,e.child,null,a),e=Nf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function b0(e,i,a){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),ju(e.return,i,a)}function Pf(e,i,a,o,u,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=d)}function A0(e,i,a){var o=i.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var y=on.current,b=(y&2)!==0;if(b?(y=y&1|2,i.flags|=128):y&=1,yt(on,y),Ln(e,i,o,a),o=Ee?vo:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&b0(e,a,i);else if(e.tag===19)b0(e,a,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=i.child,u=null;a!==null;)e=a.alternate,e!==null&&zl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=i.child,i.child=null):(u=a.sibling,a.sibling=null),Pf(i,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&zl(e)===null){i.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Pf(i,!0,a,null,d,o);break;case"together":Pf(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function oa(e,i,a){if(e!==null&&(i.dependencies=e.dependencies),Xa|=i.lanes,(a&i.childLanes)===0)if(e!==null){if(sr(e,i,a,!1),(a&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(s(153));if(i.child!==null){for(e=i.child,a=ea(e,e.pendingProps),i.child=a,a.return=i;e.sibling!==null;)e=e.sibling,a=a.sibling=ea(e,e.pendingProps),a.return=i;a.sibling=null}return i.child}function zf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&wl(e)))}function Ny(e,i,a){switch(i.tag){case 3:Vt(i,i.stateNode.containerInfo),za(i,un,e.memoizedState.cache),Es();break;case 27:case 5:se(i);break;case 4:Vt(i,i.stateNode.containerInfo);break;case 10:za(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,of(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ha(i),i.flags|=128,null):(a&i.child.childLanes)!==0?T0(e,i,a):(Ha(i),e=oa(e,i,a),e!==null?e.sibling:null);Ha(i);break;case 19:var u=(e.flags&128)!==0;if(o=(a&i.childLanes)!==0,o||(sr(e,i,a,!1),o=(a&i.childLanes)!==0),u){if(o)return A0(e,i,a);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),yt(on,on.current),o)break;return null;case 22:return i.lanes=0,v0(e,i,a,i.pendingProps);case 24:za(i,un,e.memoizedState.cache)}return oa(e,i,a)}function R0(e,i,a){if(e!==null)if(e.memoizedProps!==i.pendingProps)hn=!0;else{if(!zf(e,a)&&(i.flags&128)===0)return hn=!1,Ny(e,i,a);hn=(e.flags&131072)!==0}else hn=!1,Ee&&(i.flags&1048576)!==0&&sm(i,vo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=Rs(i.elementType),i.type=e,typeof e=="function")Hu(e)?(o=Us(e,o),i.tag=1,i=M0(null,i,e,o,a)):(i.tag=0,i=Cf(null,i,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===A){i.tag=11,i=m0(null,i,e,o,a);break t}else if(u===O){i.tag=14,i=g0(null,i,e,o,a);break t}}throw i=ct(e)||e,Error(s(306,i,""))}}return i;case 0:return Cf(e,i,i.type,i.pendingProps,a);case 1:return o=i.type,u=Us(o,i.pendingProps),M0(e,i,o,u,a);case 3:t:{if(Vt(i,i.stateNode.containerInfo),e===null)throw Error(s(387));o=i.pendingProps;var d=i.memoizedState;u=d.element,ef(e,i),Ao(i,o,null,a);var y=i.memoizedState;if(o=y.cache,za(i,un,o),o!==d.cache&&Zu(i,[un],a,!0),bo(),o=y.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=E0(e,i,o,a);break t}else if(o!==u){u=_i(Error(s(424)),i),xo(u),i=E0(e,i,o,a);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(je=Mi(e.firstChild),Dn=i,Ee=!0,Oa=null,yi=!0,a=vm(i,null,o,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Es(),o===u){i=oa(e,i,a);break t}Ln(e,i,o,a)}i=i.child}return i;case 26:return Yl(e,i),e===null?(a=Ig(i.type,null,i.pendingProps,null))?i.memoizedState=a:Ee||(a=i.type,e=i.pendingProps,o=uc(Et.current).createElement(a),o[en]=i,o[wn]=e,Nn(o,a,e),Ut(o),i.stateNode=o):i.memoizedState=Ig(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return se(i),e===null&&Ee&&(o=i.stateNode=Pg(i.type,i.pendingProps,Et.current),Dn=i,yi=!0,u=je,Za(i.type)?(mh=u,je=Mi(o.firstChild)):je=u),Ln(e,i,i.pendingProps.children,a),Yl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ee&&((u=o=je)&&(o=cS(o,i.type,i.pendingProps,yi),o!==null?(i.stateNode=o,Dn=i,je=Mi(o.firstChild),yi=!1,u=!0):u=!1),u||Pa(i)),se(i),u=i.type,d=i.pendingProps,y=e!==null?e.memoizedProps:null,o=d.children,uh(u,d)?o=null:y!==null&&uh(u,y)&&(i.flags|=32),i.memoizedState!==null&&(u=cf(e,i,Ty,null,null,a),Wo._currentValue=u),Yl(e,i),Ln(e,i,o,a),i.child;case 6:return e===null&&Ee&&((e=a=je)&&(a=uS(a,i.pendingProps,yi),a!==null?(i.stateNode=a,Dn=i,je=null,e=!0):e=!1),e||Pa(i)),null;case 13:return T0(e,i,a);case 4:return Vt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=Cs(i,null,o,a):Ln(e,i,o,a),i.child;case 11:return m0(e,i,i.type,i.pendingProps,a);case 7:return Ln(e,i,i.pendingProps,a),i.child;case 8:return Ln(e,i,i.pendingProps.children,a),i.child;case 12:return Ln(e,i,i.pendingProps.children,a),i.child;case 10:return o=i.pendingProps,za(i,i.type,o.value),Ln(e,i,o.children,a),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,bs(i),u=Un(u),o=o(u),i.flags|=1,Ln(e,i,o,a),i.child;case 14:return g0(e,i,i.type,i.pendingProps,a);case 15:return _0(e,i,i.type,i.pendingProps,a);case 19:return A0(e,i,a);case 31:return Ly(e,i,a);case 22:return v0(e,i,a,i.pendingProps);case 24:return bs(i),o=Un(un),e===null?(u=Ju(),u===null&&(u=We,d=Ku(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),i.memoizedState={parent:o,cache:u},tf(i),za(i,un,u)):((e.lanes&a)!==0&&(ef(e,i),Ao(i,null,null,a),bo()),u=e.memoizedState,d=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),za(i,un,o)):(o=d.cache,za(i,un,o),o!==u.cache&&Zu(i,[un],a,!0))),Ln(e,i,i.pendingProps.children,a),i.child;case 29:throw i.pendingProps}throw Error(s(156,i.tag))}function la(e){e.flags|=4}function Bf(e,i,a,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(tg())e.flags|=8192;else throw ws=Ll,$u}else e.flags&=-16777217}function w0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!kg(i))if(tg())e.flags|=8192;else throw ws=Ll,$u}function Zl(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?_n():536870912,e.lanes|=i,_r|=i)}function Lo(e,i){if(!Ee)switch(e.tailMode){case"hidden":i=e.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ze(e){var i=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(i)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,i}function Oy(e,i,a){var o=i.pendingProps;switch(Xu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(i),null;case 1:return Ze(i),null;case 3:return a=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),aa(un),Gt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ar(i)?la(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Wu())),Ze(i),null;case 26:var u=i.type,d=i.memoizedState;return e===null?(la(i),d!==null?(Ze(i),w0(i,d)):(Ze(i),Bf(i,u,null,o,a))):d?d!==e.memoizedState?(la(i),Ze(i),w0(i,d)):(Ze(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&la(i),Ze(i),Bf(i,u,e,o,a)),null;case 27:if(He(i),a=Et.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&la(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Ze(i),null}e=K.current,ar(i)?om(i):(e=Pg(u,o,a),i.stateNode=e,la(i))}return Ze(i),null;case 5:if(He(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&la(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Ze(i),null}if(d=K.current,ar(i))om(i);else{var y=uc(Et.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}d[en]=i,d[wn]=o;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=d;t:switch(Nn(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&la(i)}}return Ze(i),Bf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,a),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&la(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(s(166));if(e=Et.current,ar(i)){if(e=i.stateNode,a=i.memoizedProps,o=null,u=Dn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[en]=i,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||Tg(e.nodeValue,a)),e||Pa(i,!0)}else e=uc(e).createTextNode(o),e[en]=i,i.stateNode=e}return Ze(i),null;case 31:if(a=i.memoizedState,e===null||e.memoizedState!==null){if(o=ar(i),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[en]=i}else Es(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ze(i),e=!1}else a=Wu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return i.flags&256?(si(i),i):(si(i),null);if((i.flags&128)!==0)throw Error(s(558))}return Ze(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ar(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[en]=i}else Es(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ze(i),u=!1}else u=Wu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(si(i),i):(si(i),null)}return si(i),(i.flags&128)!==0?(i.lanes=a,i):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==e&&a&&(i.child.flags|=8192),Zl(i,i.updateQueue),Ze(i),null);case 4:return Gt(),e===null&&sh(i.stateNode.containerInfo),Ze(i),null;case 10:return aa(i.type),Ze(i),null;case 19:if(st(on),o=i.memoizedState,o===null)return Ze(i),null;if(u=(i.flags&128)!==0,d=o.rendering,d===null)if(u)Lo(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=zl(e),d!==null){for(i.flags|=128,Lo(o,!1),e=d.updateQueue,i.updateQueue=e,Zl(i,e),i.subtreeFlags=0,e=a,a=i.child;a!==null;)nm(a,e),a=a.sibling;return yt(on,on.current&1|2),Ee&&na(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&pt()>tc&&(i.flags|=128,u=!0,Lo(o,!1),i.lanes=4194304)}else{if(!u)if(e=zl(d),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,Zl(i,e),Lo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Ee)return Ze(i),null}else 2*pt()-o.renderingStartTime>tc&&a!==536870912&&(i.flags|=128,u=!0,Lo(o,!1),i.lanes=4194304);o.isBackwards?(d.sibling=i.child,i.child=d):(e=o.last,e!==null?e.sibling=d:i.child=d,o.last=d)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=pt(),e.sibling=null,a=on.current,yt(on,u?a&1|2:a&1),Ee&&na(i,o.treeForkCount),e):(Ze(i),null);case 22:case 23:return si(i),rf(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(a&536870912)!==0&&(i.flags&128)===0&&(Ze(i),i.subtreeFlags&6&&(i.flags|=8192)):Ze(i),a=i.updateQueue,a!==null&&Zl(i,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==a&&(i.flags|=2048),e!==null&&st(As),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),i.memoizedState.cache!==a&&(i.flags|=2048),aa(un),Ze(i),null;case 25:return null;case 30:return null}throw Error(s(156,i.tag))}function Py(e,i){switch(Xu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return aa(un),Gt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return He(i),null;case 31:if(i.memoizedState!==null){if(si(i),i.alternate===null)throw Error(s(340));Es()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(si(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(s(340));Es()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return st(on),null;case 4:return Gt(),null;case 10:return aa(i.type),null;case 22:case 23:return si(i),rf(),e!==null&&st(As),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return aa(un),null;case 25:return null;default:return null}}function C0(e,i){switch(Xu(i),i.tag){case 3:aa(un),Gt();break;case 26:case 27:case 5:He(i);break;case 4:Gt();break;case 31:i.memoizedState!==null&&si(i);break;case 13:si(i);break;case 19:st(on);break;case 10:aa(i.type);break;case 22:case 23:si(i),rf(),e!==null&&st(As);break;case 24:aa(un)}}function No(e,i){try{var a=i.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var d=a.create,y=a.inst;o=d(),y.destroy=o}a=a.next}while(a!==u)}}catch(b){Be(i,i.return,b)}}function Va(e,i,a){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&e)===e){var y=o.inst,b=y.destroy;if(b!==void 0){y.destroy=void 0,u=i;var I=a,nt=b;try{nt()}catch(dt){Be(u,I,dt)}}}o=o.next}while(o!==d)}}catch(dt){Be(i,i.return,dt)}}function D0(e){var i=e.updateQueue;if(i!==null){var a=e.stateNode;try{ym(i,a)}catch(o){Be(e,e.return,o)}}}function U0(e,i,a){a.props=Us(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Be(e,i,o)}}function Oo(e,i){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Be(e,i,u)}}function qi(e,i){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Be(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Be(e,i,u)}else a.current=null}function L0(e){var i=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Be(e,e.return,u)}}function If(e,i,a){try{var o=e.stateNode;iS(o,e.type,a,i),o[wn]=i}catch(u){Be(e,e.return,u)}}function N0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Za(e.type)||e.tag===4}function Ff(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||N0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Za(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hf(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,i):(i=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,i.appendChild(e),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=$i));else if(o!==4&&(o===27&&Za(e.type)&&(a=e.stateNode,i=null),e=e.child,e!==null))for(Hf(e,i,a),e=e.sibling;e!==null;)Hf(e,i,a),e=e.sibling}function Kl(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?a.insertBefore(e,i):a.appendChild(e);else if(o!==4&&(o===27&&Za(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Kl(e,i,a),e=e.sibling;e!==null;)Kl(e,i,a),e=e.sibling}function O0(e){var i=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Nn(i,o,a),i[en]=e,i[wn]=a}catch(d){Be(e,e.return,d)}}var ca=!1,dn=!1,Gf=!1,P0=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function zy(e,i){if(e=e.containerInfo,lh=_c,e=Yp(e),Nu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break t}var y=0,b=-1,I=-1,nt=0,dt=0,_t=e,it=null;e:for(;;){for(var lt;_t!==a||u!==0&&_t.nodeType!==3||(b=y+u),_t!==d||o!==0&&_t.nodeType!==3||(I=y+o),_t.nodeType===3&&(y+=_t.nodeValue.length),(lt=_t.firstChild)!==null;)it=_t,_t=lt;for(;;){if(_t===e)break e;if(it===a&&++nt===u&&(b=y),it===d&&++dt===o&&(I=y),(lt=_t.nextSibling)!==null)break;_t=it,it=_t.parentNode}_t=lt}a=b===-1||I===-1?null:{start:b,end:I}}else a=null}a=a||{start:0,end:0}}else a=null;for(ch={focusedElem:e,selectionRange:a},_c=!1,Tn=i;Tn!==null;)if(i=Tn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Tn=e;else for(;Tn!==null;){switch(i=Tn,d=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,a=i,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var Ft=Us(a.type,u);e=o.getSnapshotBeforeUpdate(Ft,d),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){Be(a,a.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,a=e.nodeType,a===9)hh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":hh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=i.sibling,e!==null){e.return=i.return,Tn=e;break}Tn=i.return}}function z0(e,i,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:fa(e,a),o&4&&No(5,a);break;case 1:if(fa(e,a),o&4)if(e=a.stateNode,i===null)try{e.componentDidMount()}catch(y){Be(a,a.return,y)}else{var u=Us(a.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Be(a,a.return,y)}}o&64&&D0(a),o&512&&Oo(a,a.return);break;case 3:if(fa(e,a),o&64&&(e=a.updateQueue,e!==null)){if(i=null,a.child!==null)switch(a.child.tag){case 27:case 5:i=a.child.stateNode;break;case 1:i=a.child.stateNode}try{ym(e,i)}catch(y){Be(a,a.return,y)}}break;case 27:i===null&&o&4&&O0(a);case 26:case 5:fa(e,a),i===null&&o&4&&L0(a),o&512&&Oo(a,a.return);break;case 12:fa(e,a);break;case 31:fa(e,a),o&4&&F0(e,a);break;case 13:fa(e,a),o&4&&H0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=qy.bind(null,a),fS(e,a))));break;case 22:if(o=a.memoizedState!==null||ca,!o){i=i!==null&&i.memoizedState!==null||dn,u=ca;var d=dn;ca=o,(dn=i)&&!d?ha(e,a,(a.subtreeFlags&8772)!==0):fa(e,a),ca=u,dn=d}break;case 30:break;default:fa(e,a)}}function B0(e){var i=e.alternate;i!==null&&(e.alternate=null,B0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&ot(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Je=null,jn=!1;function ua(e,i,a){for(a=a.child;a!==null;)I0(e,i,a),a=a.sibling}function I0(e,i,a){if(Yt&&typeof Yt.onCommitFiberUnmount=="function")try{Yt.onCommitFiberUnmount(Kt,a)}catch{}switch(a.tag){case 26:dn||qi(a,i),ua(e,i,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:dn||qi(a,i);var o=Je,u=jn;Za(a.type)&&(Je=a.stateNode,jn=!1),ua(e,i,a),ko(a.stateNode),Je=o,jn=u;break;case 5:dn||qi(a,i);case 6:if(o=Je,u=jn,Je=null,ua(e,i,a),Je=o,jn=u,Je!==null)if(jn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(a.stateNode)}catch(d){Be(a,i,d)}else try{Je.removeChild(a.stateNode)}catch(d){Be(a,i,d)}break;case 18:Je!==null&&(jn?(e=Je,Dg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),br(e)):Dg(Je,a.stateNode));break;case 4:o=Je,u=jn,Je=a.stateNode.containerInfo,jn=!0,ua(e,i,a),Je=o,jn=u;break;case 0:case 11:case 14:case 15:Va(2,a,i),dn||Va(4,a,i),ua(e,i,a);break;case 1:dn||(qi(a,i),o=a.stateNode,typeof o.componentWillUnmount=="function"&&U0(a,i,o)),ua(e,i,a);break;case 21:ua(e,i,a);break;case 22:dn=(o=dn)||a.memoizedState!==null,ua(e,i,a),dn=o;break;default:ua(e,i,a)}}function F0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{br(e)}catch(a){Be(i,i.return,a)}}}function H0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{br(e)}catch(a){Be(i,i.return,a)}}function By(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new P0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new P0),i;default:throw Error(s(435,e.tag))}}function Ql(e,i){var a=By(e);i.forEach(function(o){if(!a.has(o)){a.add(o);var u=Wy.bind(null,e,o);o.then(u,u)}})}function Zn(e,i){var a=i.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=e,y=i,b=y;t:for(;b!==null;){switch(b.tag){case 27:if(Za(b.type)){Je=b.stateNode,jn=!1;break t}break;case 5:Je=b.stateNode,jn=!1;break t;case 3:case 4:Je=b.stateNode.containerInfo,jn=!0;break t}b=b.return}if(Je===null)throw Error(s(160));I0(d,y,u),Je=null,jn=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)G0(i,e),i=i.sibling}var Ni=null;function G0(e,i){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Zn(i,e),Kn(e),o&4&&(Va(3,e,e.return),No(3,e),Va(5,e,e.return));break;case 1:Zn(i,e),Kn(e),o&512&&(dn||a===null||qi(a,a.return)),o&64&&ca&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ni;if(Zn(i,e),Kn(e),o&512&&(dn||a===null||qi(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[X]||d[en]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),Nn(d,o,a),d[en]=e,Ut(d),o=d;break t;case"link":var y=Gg("link","href",u).get(o+(a.href||""));if(y){for(var b=0;b<y.length;b++)if(d=y[b],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(b,1);break e}}d=u.createElement(o),Nn(d,o,a),u.head.appendChild(d);break;case"meta":if(y=Gg("meta","content",u).get(o+(a.content||""))){for(b=0;b<y.length;b++)if(d=y[b],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(b,1);break e}}d=u.createElement(o),Nn(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[en]=e,Ut(d),o=d}e.stateNode=o}else Vg(u,e.type,e.stateNode);else e.stateNode=Hg(u,o,e.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Vg(u,e.type,e.stateNode):Hg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&If(e,e.memoizedProps,a.memoizedProps)}break;case 27:Zn(i,e),Kn(e),o&512&&(dn||a===null||qi(a,a.return)),a!==null&&o&4&&If(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Zn(i,e),Kn(e),o&512&&(dn||a===null||qi(a,a.return)),e.flags&32){u=e.stateNode;try{js(u,"")}catch(Ft){Be(e,e.return,Ft)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,If(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Gf=!0);break;case 6:if(Zn(i,e),Kn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Ft){Be(e,e.return,Ft)}}break;case 3:if(dc=null,u=Ni,Ni=fc(i.containerInfo),Zn(i,e),Ni=u,Kn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{br(i.containerInfo)}catch(Ft){Be(e,e.return,Ft)}Gf&&(Gf=!1,V0(e));break;case 4:o=Ni,Ni=fc(e.stateNode.containerInfo),Zn(i,e),Kn(e),Ni=o;break;case 12:Zn(i,e),Kn(e);break;case 31:Zn(i,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 13:Zn(i,e),Kn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&($l=pt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 22:u=e.memoizedState!==null;var I=a!==null&&a.memoizedState!==null,nt=ca,dt=dn;if(ca=nt||u,dn=dt||I,Zn(i,e),dn=dt,ca=nt,Kn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(a===null||I||ca||dn||Ls(e)),a=null,i=e;;){if(i.tag===5||i.tag===26){if(a===null){I=a=i;try{if(d=I.stateNode,u)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{b=I.stateNode;var _t=I.memoizedProps.style,it=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;b.style.display=it==null||typeof it=="boolean"?"":(""+it).trim()}}catch(Ft){Be(I,I.return,Ft)}}}else if(i.tag===6){if(a===null){I=i;try{I.stateNode.nodeValue=u?"":I.memoizedProps}catch(Ft){Be(I,I.return,Ft)}}}else if(i.tag===18){if(a===null){I=i;try{var lt=I.stateNode;u?Ug(lt,!0):Ug(I.stateNode,!1)}catch(Ft){Be(I,I.return,Ft)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;a===i&&(a=null),i=i.return}a===i&&(a=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Ql(e,a))));break;case 19:Zn(i,e),Kn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 30:break;case 21:break;default:Zn(i,e),Kn(e)}}function Kn(e){var i=e.flags;if(i&2){try{for(var a,o=e.return;o!==null;){if(N0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Ff(e);Kl(e,d,u);break;case 5:var y=a.stateNode;a.flags&32&&(js(y,""),a.flags&=-33);var b=Ff(e);Kl(e,b,y);break;case 3:case 4:var I=a.stateNode.containerInfo,nt=Ff(e);Hf(e,nt,I);break;default:throw Error(s(161))}}catch(dt){Be(e,e.return,dt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function V0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;V0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function fa(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)z0(e,i.alternate,i),i=i.sibling}function Ls(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Va(4,i,i.return),Ls(i);break;case 1:qi(i,i.return);var a=i.stateNode;typeof a.componentWillUnmount=="function"&&U0(i,i.return,a),Ls(i);break;case 27:ko(i.stateNode);case 26:case 5:qi(i,i.return),Ls(i);break;case 22:i.memoizedState===null&&Ls(i);break;case 30:Ls(i);break;default:Ls(i)}e=e.sibling}}function ha(e,i,a){for(a=a&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,d=i,y=d.flags;switch(d.tag){case 0:case 11:case 15:ha(u,d,a),No(4,d);break;case 1:if(ha(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(nt){Be(o,o.return,nt)}if(o=d,u=o.updateQueue,u!==null){var b=o.stateNode;try{var I=u.shared.hiddenCallbacks;if(I!==null)for(u.shared.hiddenCallbacks=null,u=0;u<I.length;u++)xm(I[u],b)}catch(nt){Be(o,o.return,nt)}}a&&y&64&&D0(d),Oo(d,d.return);break;case 27:O0(d);case 26:case 5:ha(u,d,a),a&&o===null&&y&4&&L0(d),Oo(d,d.return);break;case 12:ha(u,d,a);break;case 31:ha(u,d,a),a&&y&4&&F0(u,d);break;case 13:ha(u,d,a),a&&y&4&&H0(u,d);break;case 22:d.memoizedState===null&&ha(u,d,a),Oo(d,d.return);break;case 30:break;default:ha(u,d,a)}i=i.sibling}}function Vf(e,i){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&yo(a))}function kf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&yo(e))}function Oi(e,i,a,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)k0(e,i,a,o),i=i.sibling}function k0(e,i,a,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Oi(e,i,a,o),u&2048&&No(9,i);break;case 1:Oi(e,i,a,o);break;case 3:Oi(e,i,a,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&yo(e)));break;case 12:if(u&2048){Oi(e,i,a,o),e=i.stateNode;try{var d=i.memoizedProps,y=d.id,b=d.onPostCommit;typeof b=="function"&&b(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(I){Be(i,i.return,I)}}else Oi(e,i,a,o);break;case 31:Oi(e,i,a,o);break;case 13:Oi(e,i,a,o);break;case 23:break;case 22:d=i.stateNode,y=i.alternate,i.memoizedState!==null?d._visibility&2?Oi(e,i,a,o):Po(e,i):d._visibility&2?Oi(e,i,a,o):(d._visibility|=2,pr(e,i,a,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Vf(y,i);break;case 24:Oi(e,i,a,o),u&2048&&kf(i.alternate,i);break;default:Oi(e,i,a,o)}}function pr(e,i,a,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=e,y=i,b=a,I=o,nt=y.flags;switch(y.tag){case 0:case 11:case 15:pr(d,y,b,I,u),No(8,y);break;case 23:break;case 22:var dt=y.stateNode;y.memoizedState!==null?dt._visibility&2?pr(d,y,b,I,u):Po(d,y):(dt._visibility|=2,pr(d,y,b,I,u)),u&&nt&2048&&Vf(y.alternate,y);break;case 24:pr(d,y,b,I,u),u&&nt&2048&&kf(y.alternate,y);break;default:pr(d,y,b,I,u)}i=i.sibling}}function Po(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var a=e,o=i,u=o.flags;switch(o.tag){case 22:Po(a,o),u&2048&&Vf(o.alternate,o);break;case 24:Po(a,o),u&2048&&kf(o.alternate,o);break;default:Po(a,o)}i=i.sibling}}var zo=8192;function mr(e,i,a){if(e.subtreeFlags&zo)for(e=e.child;e!==null;)X0(e,i,a),e=e.sibling}function X0(e,i,a){switch(e.tag){case 26:mr(e,i,a),e.flags&zo&&e.memoizedState!==null&&ES(a,Ni,e.memoizedState,e.memoizedProps);break;case 5:mr(e,i,a);break;case 3:case 4:var o=Ni;Ni=fc(e.stateNode.containerInfo),mr(e,i,a),Ni=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=zo,zo=16777216,mr(e,i,a),zo=o):mr(e,i,a));break;default:mr(e,i,a)}}function q0(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Bo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];Tn=o,Y0(o,e)}q0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)W0(e),e=e.sibling}function W0(e){switch(e.tag){case 0:case 11:case 15:Bo(e),e.flags&2048&&Va(9,e,e.return);break;case 3:Bo(e);break;case 12:Bo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,Jl(e)):Bo(e);break;default:Bo(e)}}function Jl(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];Tn=o,Y0(o,e)}q0(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Va(8,i,i.return),Jl(i);break;case 22:a=i.stateNode,a._visibility&2&&(a._visibility&=-3,Jl(i));break;default:Jl(i)}e=e.sibling}}function Y0(e,i){for(;Tn!==null;){var a=Tn;switch(a.tag){case 0:case 11:case 15:Va(8,a,i);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:yo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Tn=o;else t:for(a=e;Tn!==null;){o=Tn;var u=o.sibling,d=o.return;if(B0(o),o===a){Tn=null;break t}if(u!==null){u.return=d,Tn=u;break t}Tn=d}}}var Iy={getCacheForType:function(e){var i=Un(un),a=i.data.get(e);return a===void 0&&(a=e(),i.data.set(e,a)),a},cacheSignal:function(){return Un(un).controller.signal}},Fy=typeof WeakMap=="function"?WeakMap:Map,Le=0,We=null,pe=null,xe=0,ze=0,ri=null,ka=!1,gr=!1,Xf=!1,da=0,an=0,Xa=0,Ns=0,qf=0,oi=0,_r=0,Io=null,Qn=null,Wf=!1,$l=0,j0=0,tc=1/0,ec=null,qa=null,xn=0,Wa=null,vr=null,pa=0,Yf=0,jf=null,Z0=null,Fo=0,Zf=null;function li(){return(Le&2)!==0&&xe!==0?xe&-xe:P.T!==null?eh():ro()}function K0(){if(oi===0)if((xe&536870912)===0||Ee){var e=ft;ft<<=1,(ft&3932160)===0&&(ft=262144),oi=e}else oi=536870912;return e=ai.current,e!==null&&(e.flags|=32),oi}function Jn(e,i,a){(e===We&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(xr(e,0),Ya(e,xe,oi,!1)),Rn(e,a),((Le&2)===0||e!==We)&&(e===We&&((Le&2)===0&&(Ns|=a),an===4&&Ya(e,xe,oi,!1)),Wi(e))}function Q0(e,i,a){if((Le&6)!==0)throw Error(s(327));var o=!a&&(i&127)===0&&(i&e.expiredLanes)===0||ne(e,i),u=o?Vy(e,i):Qf(e,i,!0),d=o;do{if(u===0){gr&&!o&&Ya(e,i,0,!1);break}else{if(a=e.current.alternate,d&&!Hy(a)){u=Qf(e,i,!1),d=!1;continue}if(u===2){if(d=i,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var b=e;u=Io;var I=b.current.memoizedState.isDehydrated;if(I&&(xr(b,y).flags|=256),y=Qf(b,y,!1),y!==2){if(Xf&&!I){b.errorRecoveryDisabledLanes|=d,Ns|=d,u=4;break t}d=Qn,Qn=u,d!==null&&(Qn===null?Qn=d:Qn.push.apply(Qn,d))}u=y}if(d=!1,u!==2)continue}}if(u===1){xr(e,0),Ya(e,i,0,!0);break}t:{switch(o=e,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((i&4194048)!==i)break;case 6:Ya(o,i,oi,!ka);break t;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((i&62914560)===i&&(u=$l+300-pt(),10<u)){if(Ya(o,i,oi,!ka),Nt(o,0,!0)!==0)break t;pa=i,o.timeoutHandle=wg(J0.bind(null,o,a,Qn,ec,Wf,i,oi,Ns,_r,ka,d,"Throttled",-0,0),u);break t}J0(o,a,Qn,ec,Wf,i,oi,Ns,_r,ka,d,null,-0,0)}}break}while(!0);Wi(e)}function J0(e,i,a,o,u,d,y,b,I,nt,dt,_t,it,lt){if(e.timeoutHandle=-1,_t=i.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$i},X0(i,d,_t);var Ft=(d&62914560)===d?$l-pt():(d&4194048)===d?j0-pt():0;if(Ft=TS(_t,Ft),Ft!==null){pa=d,e.cancelPendingCommit=Ft(rg.bind(null,e,i,d,a,o,u,y,b,I,dt,_t,null,it,lt)),Ya(e,d,y,!nt);return}}rg(e,i,d,a,o,u,y,b,I)}function Hy(e){for(var i=e;;){var a=i.tag;if((a===0||a===11||a===15)&&i.flags&16384&&(a=i.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!ni(d(),u))return!1}catch{return!1}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ya(e,i,a,o){i&=~qf,i&=~Ns,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var d=31-te(u),y=1<<d;o[d]=-1,u&=~y}a!==0&&ao(e,a,i)}function nc(){return(Le&6)===0?(Ho(0),!1):!0}function Kf(){if(pe!==null){if(ze===0)var e=pe.return;else e=pe,ia=Ts=null,hf(e),cr=null,Mo=0,e=pe;for(;e!==null;)C0(e.alternate,e),e=e.return;pe=null}}function xr(e,i){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,rS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),pa=0,Kf(),We=e,pe=a=ea(e.current,null),xe=i,ze=0,ri=null,ka=!1,gr=ne(e,i),Xf=!1,_r=oi=qf=Ns=Xa=an=0,Qn=Io=null,Wf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-te(o),d=1<<u;i|=e[u],o&=~d}return da=i,El(),a}function $0(e,i){le=null,P.H=Do,i===lr||i===Ul?(i=mm(),ze=3):i===$u?(i=mm(),ze=4):ze=i===wf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ri=i,pe===null&&(an=1,ql(e,_i(i,e.current)))}function tg(){var e=ai.current;return e===null?!0:(xe&4194048)===xe?Si===null:(xe&62914560)===xe||(xe&536870912)!==0?e===Si:!1}function eg(){var e=P.H;return P.H=Do,e===null?Do:e}function ng(){var e=P.A;return P.A=Iy,e}function ic(){an=4,ka||(xe&4194048)!==xe&&ai.current!==null||(gr=!0),(Xa&134217727)===0&&(Ns&134217727)===0||We===null||Ya(We,xe,oi,!1)}function Qf(e,i,a){var o=Le;Le|=2;var u=eg(),d=ng();(We!==e||xe!==i)&&(ec=null,xr(e,i)),i=!1;var y=an;t:do try{if(ze!==0&&pe!==null){var b=pe,I=ri;switch(ze){case 8:Kf(),y=6;break t;case 3:case 2:case 9:case 6:ai.current===null&&(i=!0);var nt=ze;if(ze=0,ri=null,yr(e,b,I,nt),a&&gr){y=0;break t}break;default:nt=ze,ze=0,ri=null,yr(e,b,I,nt)}}Gy(),y=an;break}catch(dt){$0(e,dt)}while(!0);return i&&e.shellSuspendCounter++,ia=Ts=null,Le=o,P.H=u,P.A=d,pe===null&&(We=null,xe=0,El()),y}function Gy(){for(;pe!==null;)ig(pe)}function Vy(e,i){var a=Le;Le|=2;var o=eg(),u=ng();We!==e||xe!==i?(ec=null,tc=pt()+500,xr(e,i)):gr=ne(e,i);t:do try{if(ze!==0&&pe!==null){i=pe;var d=ri;e:switch(ze){case 1:ze=0,ri=null,yr(e,i,d,1);break;case 2:case 9:if(dm(d)){ze=0,ri=null,ag(i);break}i=function(){ze!==2&&ze!==9||We!==e||(ze=7),Wi(e)},d.then(i,i);break t;case 3:ze=7;break t;case 4:ze=5;break t;case 7:dm(d)?(ze=0,ri=null,ag(i)):(ze=0,ri=null,yr(e,i,d,7));break;case 5:var y=null;switch(pe.tag){case 26:y=pe.memoizedState;case 5:case 27:var b=pe;if(y?kg(y):b.stateNode.complete){ze=0,ri=null;var I=b.sibling;if(I!==null)pe=I;else{var nt=b.return;nt!==null?(pe=nt,ac(nt)):pe=null}break e}}ze=0,ri=null,yr(e,i,d,5);break;case 6:ze=0,ri=null,yr(e,i,d,6);break;case 8:Kf(),an=6;break t;default:throw Error(s(462))}}ky();break}catch(dt){$0(e,dt)}while(!0);return ia=Ts=null,P.H=o,P.A=u,Le=a,pe!==null?0:(We=null,xe=0,El(),an)}function ky(){for(;pe!==null&&!R();)ig(pe)}function ig(e){var i=R0(e.alternate,e,da);e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function ag(e){var i=e,a=i.alternate;switch(i.tag){case 15:case 0:i=S0(a,i,i.pendingProps,i.type,void 0,xe);break;case 11:i=S0(a,i,i.pendingProps,i.type.render,i.ref,xe);break;case 5:hf(i);default:C0(a,i),i=pe=nm(i,da),i=R0(a,i,da)}e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function yr(e,i,a,o){ia=Ts=null,hf(i),cr=null,Mo=0;var u=i.return;try{if(Uy(e,u,i,a,xe)){an=1,ql(e,_i(a,e.current)),pe=null;return}}catch(d){if(u!==null)throw pe=u,d;an=1,ql(e,_i(a,e.current)),pe=null;return}i.flags&32768?(Ee||o===1?e=!0:gr||(xe&536870912)!==0?e=!1:(ka=e=!0,(o===2||o===9||o===3||o===6)&&(o=ai.current,o!==null&&o.tag===13&&(o.flags|=16384))),sg(i,e)):ac(i)}function ac(e){var i=e;do{if((i.flags&32768)!==0){sg(i,ka);return}e=i.return;var a=Oy(i.alternate,i,da);if(a!==null){pe=a;return}if(i=i.sibling,i!==null){pe=i;return}pe=i=e}while(i!==null);an===0&&(an=5)}function sg(e,i){do{var a=Py(e.alternate,e);if(a!==null){a.flags&=32767,pe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!i&&(e=e.sibling,e!==null)){pe=e;return}pe=e=a}while(e!==null);an=6,pe=null}function rg(e,i,a,o,u,d,y,b,I){e.cancelPendingCommit=null;do sc();while(xn!==0);if((Le&6)!==0)throw Error(s(327));if(i!==null){if(i===e.current)throw Error(s(177));if(d=i.lanes|i.childLanes,d|=Iu,Ci(e,a,d,y,b,I),e===We&&(pe=We=null,xe=0),vr=i,Wa=e,pa=a,Yf=d,jf=u,Z0=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Yy(Lt,function(){return fg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=P.T,P.T=null,u=j.p,j.p=2,y=Le,Le|=4;try{zy(e,i,a)}finally{Le=y,j.p=u,P.T=o}}xn=1,og(),lg(),cg()}}function og(){if(xn===1){xn=0;var e=Wa,i=vr,a=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||a){a=P.T,P.T=null;var o=j.p;j.p=2;var u=Le;Le|=4;try{G0(i,e);var d=ch,y=Yp(e.containerInfo),b=d.focusedElem,I=d.selectionRange;if(y!==b&&b&&b.ownerDocument&&Wp(b.ownerDocument.documentElement,b)){if(I!==null&&Nu(b)){var nt=I.start,dt=I.end;if(dt===void 0&&(dt=nt),"selectionStart"in b)b.selectionStart=nt,b.selectionEnd=Math.min(dt,b.value.length);else{var _t=b.ownerDocument||document,it=_t&&_t.defaultView||window;if(it.getSelection){var lt=it.getSelection(),Ft=b.textContent.length,Jt=Math.min(I.start,Ft),qe=I.end===void 0?Jt:Math.min(I.end,Ft);!lt.extend&&Jt>qe&&(y=qe,qe=Jt,Jt=y);var Y=qp(b,Jt),G=qp(b,qe);if(Y&&G&&(lt.rangeCount!==1||lt.anchorNode!==Y.node||lt.anchorOffset!==Y.offset||lt.focusNode!==G.node||lt.focusOffset!==G.offset)){var et=_t.createRange();et.setStart(Y.node,Y.offset),lt.removeAllRanges(),Jt>qe?(lt.addRange(et),lt.extend(G.node,G.offset)):(et.setEnd(G.node,G.offset),lt.addRange(et))}}}}for(_t=[],lt=b;lt=lt.parentNode;)lt.nodeType===1&&_t.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<_t.length;b++){var mt=_t[b];mt.element.scrollLeft=mt.left,mt.element.scrollTop=mt.top}}_c=!!lh,ch=lh=null}finally{Le=u,j.p=o,P.T=a}}e.current=i,xn=2}}function lg(){if(xn===2){xn=0;var e=Wa,i=vr,a=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||a){a=P.T,P.T=null;var o=j.p;j.p=2;var u=Le;Le|=4;try{z0(e,i.alternate,i)}finally{Le=u,j.p=o,P.T=a}}xn=3}}function cg(){if(xn===4||xn===3){xn=0,at();var e=Wa,i=vr,a=pa,o=Z0;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?xn=5:(xn=0,vr=Wa=null,ug(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(qa=null),Ys(a),i=i.stateNode,Yt&&typeof Yt.onCommitFiberRoot=="function")try{Yt.onCommitFiberRoot(Kt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=P.T,u=j.p,j.p=2,P.T=null;try{for(var d=e.onRecoverableError,y=0;y<o.length;y++){var b=o[y];d(b.value,{componentStack:b.stack})}}finally{P.T=i,j.p=u}}(pa&3)!==0&&sc(),Wi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Zf?Fo++:(Fo=0,Zf=e):Fo=0,Ho(0)}}function ug(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,yo(i)))}function sc(){return og(),lg(),cg(),fg()}function fg(){if(xn!==5)return!1;var e=Wa,i=Yf;Yf=0;var a=Ys(pa),o=P.T,u=j.p;try{j.p=32>a?32:a,P.T=null,a=jf,jf=null;var d=Wa,y=pa;if(xn=0,vr=Wa=null,pa=0,(Le&6)!==0)throw Error(s(331));var b=Le;if(Le|=4,W0(d.current),k0(d,d.current,y,a),Le=b,Ho(0,!1),Yt&&typeof Yt.onPostCommitFiberRoot=="function")try{Yt.onPostCommitFiberRoot(Kt,d)}catch{}return!0}finally{j.p=u,P.T=o,ug(e,i)}}function hg(e,i,a){i=_i(a,i),i=Rf(e.stateNode,i,2),e=Fa(e,i,2),e!==null&&(Rn(e,2),Wi(e))}function Be(e,i,a){if(e.tag===3)hg(e,e,a);else for(;i!==null;){if(i.tag===3){hg(i,e,a);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(qa===null||!qa.has(o))){e=_i(a,e),a=d0(2),o=Fa(i,a,2),o!==null&&(p0(a,o,i,e),Rn(o,2),Wi(o));break}}i=i.return}}function Jf(e,i,a){var o=e.pingCache;if(o===null){o=e.pingCache=new Fy;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(a)||(Xf=!0,u.add(a),e=Xy.bind(null,e,i,a),i.then(e,e))}function Xy(e,i,a){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,We===e&&(xe&a)===a&&(an===4||an===3&&(xe&62914560)===xe&&300>pt()-$l?(Le&2)===0&&xr(e,0):qf|=a,_r===xe&&(_r=0)),Wi(e)}function dg(e,i){i===0&&(i=_n()),e=Ss(e,i),e!==null&&(Rn(e,i),Wi(e))}function qy(e){var i=e.memoizedState,a=0;i!==null&&(a=i.retryLane),dg(e,a)}function Wy(e,i){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(i),dg(e,a)}function Yy(e,i){return Zt(e,i)}var rc=null,Sr=null,$f=!1,oc=!1,th=!1,ja=0;function Wi(e){e!==Sr&&e.next===null&&(Sr===null?rc=Sr=e:Sr=Sr.next=e),oc=!0,$f||($f=!0,Zy())}function Ho(e,i){if(!th&&oc){th=!0;do for(var a=!1,o=rc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var y=o.suspendedLanes,b=o.pingedLanes;d=(1<<31-te(42|e)+1)-1,d&=u&~(y&~b),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,_g(o,d))}else d=xe,d=Nt(o,o===We?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||ne(o,d)||(a=!0,_g(o,d));o=o.next}while(a);th=!1}}function jy(){pg()}function pg(){oc=$f=!1;var e=0;ja!==0&&sS()&&(e=ja);for(var i=pt(),a=null,o=rc;o!==null;){var u=o.next,d=mg(o,i);d===0?(o.next=null,a===null?rc=u:a.next=u,u===null&&(Sr=a)):(a=o,(e!==0||(d&3)!==0)&&(oc=!0)),o=u}xn!==0&&xn!==5||Ho(e),ja!==0&&(ja=0)}function mg(e,i){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-te(d),b=1<<y,I=u[y];I===-1?((b&a)===0||(b&o)!==0)&&(u[y]=Qe(b,i)):I<=i&&(e.expiredLanes|=b),d&=~b}if(i=We,a=xe,a=Nt(e,e===i?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===i&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&N(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||ne(e,a)){if(i=a&-a,i===e.callbackPriority)return i;switch(o!==null&&N(o),Ys(a)){case 2:case 8:a=Wt;break;case 32:a=Lt;break;case 268435456:a=ve;break;default:a=Lt}return o=gg.bind(null,e),a=Zt(a,o),e.callbackPriority=i,e.callbackNode=a,i}return o!==null&&o!==null&&N(o),e.callbackPriority=2,e.callbackNode=null,2}function gg(e,i){if(xn!==0&&xn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(sc()&&e.callbackNode!==a)return null;var o=xe;return o=Nt(e,e===We?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Q0(e,o,i),mg(e,pt()),e.callbackNode!=null&&e.callbackNode===a?gg.bind(null,e):null)}function _g(e,i){if(sc())return null;Q0(e,i,!0)}function Zy(){oS(function(){(Le&6)!==0?Zt(gt,jy):pg()})}function eh(){if(ja===0){var e=rr;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),ja=e}return ja}function vg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ml(""+e)}function xg(e,i){var a=i.ownerDocument.createElement("input");return a.name=i.name,a.value=i.value,e.id&&a.setAttribute("form",e.id),i.parentNode.insertBefore(a,i),e=new FormData(e),a.parentNode.removeChild(a),e}function Ky(e,i,a,o,u){if(i==="submit"&&a&&a.stateNode===u){var d=vg((u[wn]||null).action),y=o.submitter;y&&(i=(i=y[wn]||null)?vg(i.formAction):y.getAttribute("formAction"),i!==null&&(d=i,y=null));var b=new xl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(ja!==0){var I=y?xg(u,y):new FormData(u);Sf(a,{pending:!0,data:I,method:u.method,action:d},null,I)}}else typeof d=="function"&&(b.preventDefault(),I=y?xg(u,y):new FormData(u),Sf(a,{pending:!0,data:I,method:u.method,action:d},d,I))},currentTarget:u}]})}}for(var nh=0;nh<Bu.length;nh++){var ih=Bu[nh],Qy=ih.toLowerCase(),Jy=ih[0].toUpperCase()+ih.slice(1);Li(Qy,"on"+Jy)}Li(Kp,"onAnimationEnd"),Li(Qp,"onAnimationIteration"),Li(Jp,"onAnimationStart"),Li("dblclick","onDoubleClick"),Li("focusin","onFocus"),Li("focusout","onBlur"),Li(py,"onTransitionRun"),Li(my,"onTransitionStart"),Li(gy,"onTransitionCancel"),Li($p,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$t("onBeforeInput",["compositionend","keypress","textInput","paste"]),$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Go="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$y=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Go));function yg(e,i){i=(i&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var d=void 0;if(i)for(var y=o.length-1;0<=y;y--){var b=o[y],I=b.instance,nt=b.currentTarget;if(b=b.listener,I!==d&&u.isPropagationStopped())break t;d=b,u.currentTarget=nt;try{d(u)}catch(dt){Ml(dt)}u.currentTarget=null,d=I}else for(y=0;y<o.length;y++){if(b=o[y],I=b.instance,nt=b.currentTarget,b=b.listener,I!==d&&u.isPropagationStopped())break t;d=b,u.currentTarget=nt;try{d(u)}catch(dt){Ml(dt)}u.currentTarget=null,d=I}}}}function me(e,i){var a=i[oo];a===void 0&&(a=i[oo]=new Set);var o=e+"__bubble";a.has(o)||(Sg(i,e,2,!1),a.add(o))}function ah(e,i,a){var o=0;i&&(o|=4),Sg(a,e,o,i)}var lc="_reactListening"+Math.random().toString(36).slice(2);function sh(e){if(!e[lc]){e[lc]=!0,kt.forEach(function(a){a!=="selectionchange"&&($y.has(a)||ah(a,!1,e),ah(a,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[lc]||(i[lc]=!0,ah("selectionchange",!1,i))}}function Sg(e,i,a,o){switch(Kg(i)){case 2:var u=RS;break;case 8:u=wS;break;default:u=yh}a=u.bind(null,i,a,e),u=void 0,!Tu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,a,{capture:!0,passive:u}):e.addEventListener(i,a,!0):u!==void 0?e.addEventListener(i,a,{passive:u}):e.addEventListener(i,a,!1)}function rh(e,i,a,o,u){var d=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var b=o.stateNode.containerInfo;if(b===u)break;if(y===4)for(y=o.return;y!==null;){var I=y.tag;if((I===3||I===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;b!==null;){if(y=rt(b),y===null)return;if(I=y.tag,I===5||I===6||I===26||I===27){o=d=y;continue t}b=b.parentNode}}o=o.return}Ap(function(){var nt=d,dt=Mu(a),_t=[];t:{var it=tm.get(e);if(it!==void 0){var lt=xl,Ft=e;switch(e){case"keypress":if(_l(a)===0)break t;case"keydown":case"keyup":lt=Wx;break;case"focusin":Ft="focus",lt=wu;break;case"focusout":Ft="blur",lt=wu;break;case"beforeblur":case"afterblur":lt=wu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=Cp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=Ox;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Zx;break;case Kp:case Qp:case Jp:lt=Bx;break;case $p:lt=Qx;break;case"scroll":case"scrollend":lt=Lx;break;case"wheel":lt=$x;break;case"copy":case"cut":case"paste":lt=Fx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=Up;break;case"toggle":case"beforetoggle":lt=ey}var Jt=(i&4)!==0,qe=!Jt&&(e==="scroll"||e==="scrollend"),Y=Jt?it!==null?it+"Capture":null:it;Jt=[];for(var G=nt,et;G!==null;){var mt=G;if(et=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||et===null||Y===null||(mt=lo(G,Y),mt!=null&&Jt.push(Vo(G,mt,et))),qe)break;G=G.return}0<Jt.length&&(it=new lt(it,Ft,null,a,dt),_t.push({event:it,listeners:Jt}))}}if((i&7)===0){t:{if(it=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",it&&a!==Su&&(Ft=a.relatedTarget||a.fromElement)&&(rt(Ft)||Ft[Qi]))break t;if((lt||it)&&(it=dt.window===dt?dt:(it=dt.ownerDocument)?it.defaultView||it.parentWindow:window,lt?(Ft=a.relatedTarget||a.toElement,lt=nt,Ft=Ft?rt(Ft):null,Ft!==null&&(qe=c(Ft),Jt=Ft.tag,Ft!==qe||Jt!==5&&Jt!==27&&Jt!==6)&&(Ft=null)):(lt=null,Ft=nt),lt!==Ft)){if(Jt=Cp,mt="onMouseLeave",Y="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=Up,mt="onPointerLeave",Y="onPointerEnter",G="pointer"),qe=lt==null?it:bt(lt),et=Ft==null?it:bt(Ft),it=new Jt(mt,G+"leave",lt,a,dt),it.target=qe,it.relatedTarget=et,mt=null,rt(dt)===nt&&(Jt=new Jt(Y,G+"enter",Ft,a,dt),Jt.target=et,Jt.relatedTarget=qe,mt=Jt),qe=mt,lt&&Ft)e:{for(Jt=tS,Y=lt,G=Ft,et=0,mt=Y;mt;mt=Jt(mt))et++;mt=0;for(var jt=G;jt;jt=Jt(jt))mt++;for(;0<et-mt;)Y=Jt(Y),et--;for(;0<mt-et;)G=Jt(G),mt--;for(;et--;){if(Y===G||G!==null&&Y===G.alternate){Jt=Y;break e}Y=Jt(Y),G=Jt(G)}Jt=null}else Jt=null;lt!==null&&Mg(_t,it,lt,Jt,!1),Ft!==null&&qe!==null&&Mg(_t,qe,Ft,Jt,!0)}}t:{if(it=nt?bt(nt):window,lt=it.nodeName&&it.nodeName.toLowerCase(),lt==="select"||lt==="input"&&it.type==="file")var De=Fp;else if(Bp(it))if(Hp)De=fy;else{De=cy;var qt=ly}else lt=it.nodeName,!lt||lt.toLowerCase()!=="input"||it.type!=="checkbox"&&it.type!=="radio"?nt&&yu(nt.elementType)&&(De=Fp):De=uy;if(De&&(De=De(e,nt))){Ip(_t,De,a,dt);break t}qt&&qt(e,it,nt),e==="focusout"&&nt&&it.type==="number"&&nt.memoizedProps.value!=null&&mi(it,"number",it.value)}switch(qt=nt?bt(nt):window,e){case"focusin":(Bp(qt)||qt.contentEditable==="true")&&(Js=qt,Ou=nt,_o=null);break;case"focusout":_o=Ou=Js=null;break;case"mousedown":Pu=!0;break;case"contextmenu":case"mouseup":case"dragend":Pu=!1,jp(_t,a,dt);break;case"selectionchange":if(dy)break;case"keydown":case"keyup":jp(_t,a,dt)}var ce;if(Du)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Qs?Pp(e,a)&&(ye="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&(Lp&&a.locale!=="ko"&&(Qs||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Qs&&(ce=Rp()):(La=dt,bu="value"in La?La.value:La.textContent,Qs=!0)),qt=cc(nt,ye),0<qt.length&&(ye=new Dp(ye,e,null,a,dt),_t.push({event:ye,listeners:qt}),ce?ye.data=ce:(ce=zp(a),ce!==null&&(ye.data=ce)))),(ce=iy?ay(e,a):sy(e,a))&&(ye=cc(nt,"onBeforeInput"),0<ye.length&&(qt=new Dp("onBeforeInput","beforeinput",null,a,dt),_t.push({event:qt,listeners:ye}),qt.data=ce)),Ky(_t,e,nt,a,dt)}yg(_t,i)})}function Vo(e,i,a){return{instance:e,listener:i,currentTarget:a}}function cc(e,i){for(var a=i+"Capture",o=[];e!==null;){var u=e,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=lo(e,a),u!=null&&o.unshift(Vo(e,u,d)),u=lo(e,i),u!=null&&o.push(Vo(e,u,d))),e.tag===3)return o;e=e.return}return[]}function tS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Mg(e,i,a,o,u){for(var d=i._reactName,y=[];a!==null&&a!==o;){var b=a,I=b.alternate,nt=b.stateNode;if(b=b.tag,I!==null&&I===o)break;b!==5&&b!==26&&b!==27||nt===null||(I=nt,u?(nt=lo(a,d),nt!=null&&y.unshift(Vo(a,nt,I))):u||(nt=lo(a,d),nt!=null&&y.push(Vo(a,nt,I)))),a=a.return}y.length!==0&&e.push({event:i,listeners:y})}var eS=/\r\n?/g,nS=/\u0000|\uFFFD/g;function Eg(e){return(typeof e=="string"?e:""+e).replace(eS,`
`).replace(nS,"")}function Tg(e,i){return i=Eg(i),Eg(e)===i}function Xe(e,i,a,o,u,d){switch(a){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||js(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&js(e,""+o);break;case"className":Xt(e,"class",o);break;case"tabIndex":Xt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,a,o);break;case"style":Tp(e,o,d);break;case"data":if(i!=="object"){Xt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ml(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(i!=="input"&&Xe(e,i,"name",u.name,u,null),Xe(e,i,"formEncType",u.formEncType,u,null),Xe(e,i,"formMethod",u.formMethod,u,null),Xe(e,i,"formTarget",u.formTarget,u,null)):(Xe(e,i,"encType",u.encType,u,null),Xe(e,i,"method",u.method,u,null),Xe(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ml(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=$i);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=ml(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":me("beforetoggle",e),me("toggle",e),Me(e,"popover",o);break;case"xlinkActuate":vn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":vn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":vn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":vn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":vn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":vn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":vn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":vn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":vn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Me(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Dx.get(a)||a,Me(e,a,o))}}function oh(e,i,a,o,u,d){switch(a){case"style":Tp(e,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?js(e,o):(typeof o=="number"||typeof o=="bigint")&&js(e,""+o);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"onClick":o!=null&&(e.onclick=$i);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ie.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),i=a.slice(2,u?a.length-7:void 0),d=e[wn]||null,d=d!=null?d[a]:null,typeof d=="function"&&e.removeEventListener(i,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(i,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Me(e,a,o)}}}function Nn(e,i,a){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var y=a[d];if(y!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:Xe(e,i,d,y,a,null)}}u&&Xe(e,i,"srcSet",a.srcSet,a,null),o&&Xe(e,i,"src",a.src,a,null);return;case"input":me("invalid",e);var b=d=y=u=null,I=null,nt=null;for(o in a)if(a.hasOwnProperty(o)){var dt=a[o];if(dt!=null)switch(o){case"name":u=dt;break;case"type":y=dt;break;case"checked":I=dt;break;case"defaultChecked":nt=dt;break;case"value":d=dt;break;case"defaultValue":b=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,i));break;default:Xe(e,i,o,dt,a,null)}}Ui(e,d,b,I,nt,y,u,!1);return;case"select":me("invalid",e),o=y=d=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":d=b;break;case"defaultValue":y=b;break;case"multiple":o=b;default:Xe(e,i,u,b,a,null)}i=d,a=y,e.multiple=!!o,i!=null?Ji(e,!!o,i,!1):a!=null&&Ji(e,!!o,a,!0);return;case"textarea":me("invalid",e),d=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(b=a[y],b!=null))switch(y){case"value":o=b;break;case"defaultValue":u=b;break;case"children":d=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:Xe(e,i,y,b,a,null)}Mp(e,o,u,d);return;case"option":for(I in a)if(a.hasOwnProperty(I)&&(o=a[I],o!=null))switch(I){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Xe(e,i,I,o,a,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(o=0;o<Go.length;o++)me(Go[o],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(nt in a)if(a.hasOwnProperty(nt)&&(o=a[nt],o!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:Xe(e,i,nt,o,a,null)}return;default:if(yu(i)){for(dt in a)a.hasOwnProperty(dt)&&(o=a[dt],o!==void 0&&oh(e,i,dt,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&Xe(e,i,b,o,a,null))}function iS(e,i,a,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,y=null,b=null,I=null,nt=null,dt=null;for(lt in a){var _t=a[lt];if(a.hasOwnProperty(lt)&&_t!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":I=_t;default:o.hasOwnProperty(lt)||Xe(e,i,lt,null,o,_t)}}for(var it in o){var lt=o[it];if(_t=a[it],o.hasOwnProperty(it)&&(lt!=null||_t!=null))switch(it){case"type":d=lt;break;case"name":u=lt;break;case"checked":nt=lt;break;case"defaultChecked":dt=lt;break;case"value":y=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,i));break;default:lt!==_t&&Xe(e,i,it,lt,o,_t)}}zn(e,y,b,I,nt,dt,d,u);return;case"select":lt=y=b=it=null;for(d in a)if(I=a[d],a.hasOwnProperty(d)&&I!=null)switch(d){case"value":break;case"multiple":lt=I;default:o.hasOwnProperty(d)||Xe(e,i,d,null,o,I)}for(u in o)if(d=o[u],I=a[u],o.hasOwnProperty(u)&&(d!=null||I!=null))switch(u){case"value":it=d;break;case"defaultValue":b=d;break;case"multiple":y=d;default:d!==I&&Xe(e,i,u,d,o,I)}i=b,a=y,o=lt,it!=null?Ji(e,!!a,it,!1):!!o!=!!a&&(i!=null?Ji(e,!!a,i,!0):Ji(e,!!a,a?[]:"",!1));return;case"textarea":lt=it=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Xe(e,i,b,null,o,u)}for(y in o)if(u=o[y],d=a[y],o.hasOwnProperty(y)&&(u!=null||d!=null))switch(y){case"value":it=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&Xe(e,i,y,u,o,d)}Sp(e,it,lt);return;case"option":for(var Ft in a)if(it=a[Ft],a.hasOwnProperty(Ft)&&it!=null&&!o.hasOwnProperty(Ft))switch(Ft){case"selected":e.selected=!1;break;default:Xe(e,i,Ft,null,o,it)}for(I in o)if(it=o[I],lt=a[I],o.hasOwnProperty(I)&&it!==lt&&(it!=null||lt!=null))switch(I){case"selected":e.selected=it&&typeof it!="function"&&typeof it!="symbol";break;default:Xe(e,i,I,it,o,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in a)it=a[Jt],a.hasOwnProperty(Jt)&&it!=null&&!o.hasOwnProperty(Jt)&&Xe(e,i,Jt,null,o,it);for(nt in o)if(it=o[nt],lt=a[nt],o.hasOwnProperty(nt)&&it!==lt&&(it!=null||lt!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":if(it!=null)throw Error(s(137,i));break;default:Xe(e,i,nt,it,o,lt)}return;default:if(yu(i)){for(var qe in a)it=a[qe],a.hasOwnProperty(qe)&&it!==void 0&&!o.hasOwnProperty(qe)&&oh(e,i,qe,void 0,o,it);for(dt in o)it=o[dt],lt=a[dt],!o.hasOwnProperty(dt)||it===lt||it===void 0&&lt===void 0||oh(e,i,dt,it,o,lt);return}}for(var Y in a)it=a[Y],a.hasOwnProperty(Y)&&it!=null&&!o.hasOwnProperty(Y)&&Xe(e,i,Y,null,o,it);for(_t in o)it=o[_t],lt=a[_t],!o.hasOwnProperty(_t)||it===lt||it==null&&lt==null||Xe(e,i,_t,it,o,lt)}function bg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function aS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,y=u.initiatorType,b=u.duration;if(d&&b&&bg(y)){for(y=0,b=u.responseEnd,o+=1;o<a.length;o++){var I=a[o],nt=I.startTime;if(nt>b)break;var dt=I.transferSize,_t=I.initiatorType;dt&&bg(_t)&&(I=I.responseEnd,y+=dt*(I<b?1:(b-nt)/(I-nt)))}if(--o,i+=8*(d+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var lh=null,ch=null;function uc(e){return e.nodeType===9?e:e.ownerDocument}function Ag(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Rg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function uh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var fh=null;function sS(){var e=window.event;return e&&e.type==="popstate"?e===fh?!1:(fh=e,!0):(fh=null,!1)}var wg=typeof setTimeout=="function"?setTimeout:void 0,rS=typeof clearTimeout=="function"?clearTimeout:void 0,Cg=typeof Promise=="function"?Promise:void 0,oS=typeof queueMicrotask=="function"?queueMicrotask:typeof Cg<"u"?function(e){return Cg.resolve(null).then(e).catch(lS)}:wg;function lS(e){setTimeout(function(){throw e})}function Za(e){return e==="head"}function Dg(e,i){var a=i,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),br(i);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")ko(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,ko(a);for(var d=a.firstChild;d;){var y=d.nextSibling,b=d.nodeName;d[X]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=y}}else a==="body"&&ko(e.ownerDocument.body);a=u}while(a);br(i)}function Ug(e,i){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?i?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(i?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function hh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var a=i;switch(i=i.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":hh(a),ot(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function cS(e,i,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[X])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Mi(e.nextSibling),e===null)break}return null}function uS(e,i,a){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Mi(e.nextSibling),e===null))return null;return e}function Lg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Mi(e.nextSibling),e===null))return null;return e}function dh(e){return e.data==="$?"||e.data==="$~"}function ph(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function fS(e,i){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||a.readyState!=="loading")i();else{var o=function(){i(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Mi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var mh=null;function Ng(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(i===0)return Mi(e.nextSibling);i--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||i++}e=e.nextSibling}return null}function Og(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(i===0)return e;i--}else a!=="/$"&&a!=="/&"||i++}e=e.previousSibling}return null}function Pg(e,i,a){switch(i=uc(a),e){case"html":if(e=i.documentElement,!e)throw Error(s(452));return e;case"head":if(e=i.head,!e)throw Error(s(453));return e;case"body":if(e=i.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function ko(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);ot(e)}var Ei=new Map,zg=new Set;function fc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=j.d;j.d={f:hS,r:dS,D:pS,C:mS,L:gS,m:_S,X:xS,S:vS,M:yS};function hS(){var e=ma.f(),i=nc();return e||i}function dS(e){var i=q(e);i!==null&&i.tag===5&&i.type==="form"?$m(i):ma.r(e)}var Mr=typeof document>"u"?null:document;function Bg(e,i,a){var o=Mr;if(o&&typeof i=="string"&&i){var u=En(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),zg.has(u)||(zg.add(u),e={rel:e,crossOrigin:a,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Nn(i,"link",e),Ut(i),o.head.appendChild(i)))}}function pS(e){ma.D(e),Bg("dns-prefetch",e,null)}function mS(e,i){ma.C(e,i),Bg("preconnect",e,i)}function gS(e,i,a){ma.L(e,i,a);var o=Mr;if(o&&e&&i){var u='link[rel="preload"][as="'+En(i)+'"]';i==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+En(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+En(a.imageSizes)+'"]')):u+='[href="'+En(e)+'"]';var d=u;switch(i){case"style":d=Er(e);break;case"script":d=Tr(e)}Ei.has(d)||(e=_({rel:"preload",href:i==="image"&&a&&a.imageSrcSet?void 0:e,as:i},a),Ei.set(d,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(Xo(d))||i==="script"&&o.querySelector(qo(d))||(i=o.createElement("link"),Nn(i,"link",e),Ut(i),o.head.appendChild(i)))}}function _S(e,i){ma.m(e,i);var a=Mr;if(a&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+En(o)+'"][href="'+En(e)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Tr(e)}if(!Ei.has(d)&&(e=_({rel:"modulepreload",href:e},i),Ei.set(d,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(qo(d)))return}o=a.createElement("link"),Nn(o,"link",e),Ut(o),a.head.appendChild(o)}}}function vS(e,i,a){ma.S(e,i,a);var o=Mr;if(o&&e){var u=Dt(o).hoistableStyles,d=Er(e);i=i||"default";var y=u.get(d);if(!y){var b={loading:0,preload:null};if(y=o.querySelector(Xo(d)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},a),(a=Ei.get(d))&&gh(e,a);var I=y=o.createElement("link");Ut(I),Nn(I,"link",e),I._p=new Promise(function(nt,dt){I.onload=nt,I.onerror=dt}),I.addEventListener("load",function(){b.loading|=1}),I.addEventListener("error",function(){b.loading|=2}),b.loading|=4,hc(y,i,o)}y={type:"stylesheet",instance:y,count:1,state:b},u.set(d,y)}}}function xS(e,i){ma.X(e,i);var a=Mr;if(a&&e){var o=Dt(a).hoistableScripts,u=Tr(e),d=o.get(u);d||(d=a.querySelector(qo(u)),d||(e=_({src:e,async:!0},i),(i=Ei.get(u))&&_h(e,i),d=a.createElement("script"),Ut(d),Nn(d,"link",e),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function yS(e,i){ma.M(e,i);var a=Mr;if(a&&e){var o=Dt(a).hoistableScripts,u=Tr(e),d=o.get(u);d||(d=a.querySelector(qo(u)),d||(e=_({src:e,async:!0,type:"module"},i),(i=Ei.get(u))&&_h(e,i),d=a.createElement("script"),Ut(d),Nn(d,"link",e),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Ig(e,i,a,o){var u=(u=Et.current)?fc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(i=Er(a.href),a=Dt(u).hoistableStyles,o=a.get(i),o||(o={type:"style",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Er(a.href);var d=Dt(u).hoistableStyles,y=d.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=u.querySelector(Xo(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Ei.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ei.set(e,a),d||SS(u,e,a,y.state))),i&&o===null)throw Error(s(528,""));return y}if(i&&o!==null)throw Error(s(529,""));return null;case"script":return i=a.async,a=a.src,typeof a=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Tr(a),a=Dt(u).hoistableScripts,o=a.get(i),o||(o={type:"script",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Er(e){return'href="'+En(e)+'"'}function Xo(e){return'link[rel="stylesheet"]['+e+"]"}function Fg(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function SS(e,i,a,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Nn(i,"link",a),Ut(i),e.head.appendChild(i))}function Tr(e){return'[src="'+En(e)+'"]'}function qo(e){return"script[async]"+e}function Hg(e,i,a){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+En(a.href)+'"]');if(o)return i.instance=o,Ut(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Ut(o),Nn(o,"style",u),hc(o,a.precedence,e),i.instance=o;case"stylesheet":u=Er(a.href);var d=e.querySelector(Xo(u));if(d)return i.state.loading|=4,i.instance=d,Ut(d),d;o=Fg(a),(u=Ei.get(u))&&gh(o,u),d=(e.ownerDocument||e).createElement("link"),Ut(d);var y=d;return y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Nn(d,"link",o),i.state.loading|=4,hc(d,a.precedence,e),i.instance=d;case"script":return d=Tr(a.src),(u=e.querySelector(qo(d)))?(i.instance=u,Ut(u),u):(o=a,(u=Ei.get(d))&&(o=_({},a),_h(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Ut(u),Nn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(s(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,hc(o,a.precedence,e));return i.instance}function hc(e,i,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,y=0;y<o.length;y++){var b=o[y];if(b.dataset.precedence===i)d=b;else if(d!==u)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=a.nodeType===9?a.head:a,i.insertBefore(e,i.firstChild))}function gh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function _h(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var dc=null;function Gg(e,i,a){if(dc===null){var o=new Map,u=dc=new Map;u.set(a,o)}else u=dc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var d=a[u];if(!(d[X]||d[en]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(i)||"";y=e+y;var b=o.get(y);b?b.push(d):o.set(y,[d])}}return o}function Vg(e,i,a){e=e.ownerDocument||e,e.head.insertBefore(a,i==="title"?e.querySelector("head > title"):null)}function MS(e,i,a){if(a===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function kg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function ES(e,i,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Er(o.href),d=i.querySelector(Xo(u));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=pc.bind(e),i.then(e,e)),a.state.loading|=4,a.instance=d,Ut(d);return}d=i.ownerDocument||i,o=Fg(o),(u=Ei.get(u))&&gh(o,u),d=d.createElement("link"),Ut(d);var y=d;y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Nn(d,"link",o),a.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,i),(i=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=pc.bind(e),i.addEventListener("load",a),i.addEventListener("error",a))}}var vh=0;function TS(e,i){return e.stylesheets&&e.count===0&&gc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+i);0<e.imgBytes&&vh===0&&(vh=62500*aS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>vh?50:800)+i);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function pc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)gc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var mc=null;function gc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,mc=new Map,i.forEach(bS,e),mc=null,pc.call(e))}function bS(e,i){if(!(i.state.loading&4)){var a=mc.get(e);if(a)var o=a.get(null);else{a=new Map,mc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var y=u[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=i.instance,y=u.getAttribute("data-precedence"),d=a.get(y)||o,d===o&&a.set(null,u),a.set(y,u),this.count++,o=pc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var Wo={$$typeof:C,Provider:null,Consumer:null,_currentValue:Z,_currentValue2:Z,_threadCount:0};function AS(e,i,a,o,u,d,y,b,I){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=we(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=we(0),this.hiddenUpdates=we(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=I,this.incompleteTransitions=new Map}function Xg(e,i,a,o,u,d,y,b,I,nt,dt,_t){return e=new AS(e,i,a,y,I,nt,dt,_t,b),i=1,d===!0&&(i|=24),d=ii(3,null,null,i),e.current=d,d.stateNode=e,i=Ku(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:i},tf(d),e}function qg(e){return e?(e=er,e):er}function Wg(e,i,a,o,u,d){u=qg(u),o.context===null?o.context=u:o.pendingContext=u,o=Ia(i),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=Fa(e,o,i),a!==null&&(Jn(a,e,i),To(a,e,i))}function Yg(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<i?a:i}}function xh(e,i){Yg(e,i),(e=e.alternate)&&Yg(e,i)}function jg(e){if(e.tag===13||e.tag===31){var i=Ss(e,67108864);i!==null&&Jn(i,e,67108864),xh(e,67108864)}}function Zg(e){if(e.tag===13||e.tag===31){var i=li();i=gs(i);var a=Ss(e,i);a!==null&&Jn(a,e,i),xh(e,i)}}var _c=!0;function RS(e,i,a,o){var u=P.T;P.T=null;var d=j.p;try{j.p=2,yh(e,i,a,o)}finally{j.p=d,P.T=u}}function wS(e,i,a,o){var u=P.T;P.T=null;var d=j.p;try{j.p=8,yh(e,i,a,o)}finally{j.p=d,P.T=u}}function yh(e,i,a,o){if(_c){var u=Sh(o);if(u===null)rh(e,i,o,vc,a),Qg(e,o);else if(DS(u,e,i,a,o))o.stopPropagation();else if(Qg(e,o),i&4&&-1<CS.indexOf(e)){for(;u!==null;){var d=q(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=Ct(d.pendingLanes);if(y!==0){var b=d;for(b.pendingLanes|=2,b.entangledLanes|=2;y;){var I=1<<31-te(y);b.entanglements[1]|=I,y&=~I}Wi(d),(Le&6)===0&&(tc=pt()+500,Ho(0))}}break;case 31:case 13:b=Ss(d,2),b!==null&&Jn(b,d,2),nc(),xh(d,2)}if(d=Sh(o),d===null&&rh(e,i,o,vc,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else rh(e,i,o,null,a)}}function Sh(e){return e=Mu(e),Mh(e)}var vc=null;function Mh(e){if(vc=null,e=rt(e),e!==null){var i=c(e);if(i===null)e=null;else{var a=i.tag;if(a===13){if(e=f(i),e!==null)return e;e=null}else if(a===31){if(e=h(i),e!==null)return e;e=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return vc=e,null}function Kg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case gt:return 2;case Wt:return 8;case Lt:case zt:return 32;case ve:return 268435456;default:return 32}default:return 32}}var Eh=!1,Ka=null,Qa=null,Ja=null,Yo=new Map,jo=new Map,$a=[],CS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Qg(e,i){switch(e){case"focusin":case"focusout":Ka=null;break;case"dragenter":case"dragleave":Qa=null;break;case"mouseover":case"mouseout":Ja=null;break;case"pointerover":case"pointerout":Yo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(i.pointerId)}}function Zo(e,i,a,o,u,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},i!==null&&(i=q(i),i!==null&&jg(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function DS(e,i,a,o,u){switch(i){case"focusin":return Ka=Zo(Ka,e,i,a,o,u),!0;case"dragenter":return Qa=Zo(Qa,e,i,a,o,u),!0;case"mouseover":return Ja=Zo(Ja,e,i,a,o,u),!0;case"pointerover":var d=u.pointerId;return Yo.set(d,Zo(Yo.get(d)||null,e,i,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,jo.set(d,Zo(jo.get(d)||null,e,i,a,o,u)),!0}return!1}function Jg(e){var i=rt(e.target);if(i!==null){var a=c(i);if(a!==null){if(i=a.tag,i===13){if(i=f(a),i!==null){e.blockedOn=i,_s(e.priority,function(){Zg(a)});return}}else if(i===31){if(i=h(a),i!==null){e.blockedOn=i,_s(e.priority,function(){Zg(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var a=Sh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Su=o,a.target.dispatchEvent(o),Su=null}else return i=q(a),i!==null&&jg(i),e.blockedOn=a,!1;i.shift()}return!0}function $g(e,i,a){xc(e)&&a.delete(i)}function US(){Eh=!1,Ka!==null&&xc(Ka)&&(Ka=null),Qa!==null&&xc(Qa)&&(Qa=null),Ja!==null&&xc(Ja)&&(Ja=null),Yo.forEach($g),jo.forEach($g)}function yc(e,i){e.blockedOn===i&&(e.blockedOn=null,Eh||(Eh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,US)))}var Sc=null;function t_(e){Sc!==e&&(Sc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Sc===e&&(Sc=null);for(var i=0;i<e.length;i+=3){var a=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(Mh(o||a)===null)continue;break}var d=q(a);d!==null&&(e.splice(i,3),i-=3,Sf(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function br(e){function i(I){return yc(I,e)}Ka!==null&&yc(Ka,e),Qa!==null&&yc(Qa,e),Ja!==null&&yc(Ja,e),Yo.forEach(i),jo.forEach(i);for(var a=0;a<$a.length;a++){var o=$a[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<$a.length&&(a=$a[0],a.blockedOn===null);)Jg(a),a.blockedOn===null&&$a.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],y=u[wn]||null;if(typeof d=="function")y||t_(a);else if(y){var b=null;if(d&&d.hasAttribute("formAction")){if(u=d,y=d[wn]||null)b=y.formAction;else if(Mh(u)!==null)continue}else b=y.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),t_(a)}}}function e_(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function Th(e){this._internalRoot=e}Mc.prototype.render=Th.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(s(409));var a=i.current,o=li();Wg(a,o,e,i,null,null)},Mc.prototype.unmount=Th.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;Wg(e.current,2,null,e,null,null),nc(),i[Qi]=null}};function Mc(e){this._internalRoot=e}Mc.prototype.unstable_scheduleHydration=function(e){if(e){var i=ro();e={blockedOn:null,target:e,priority:i};for(var a=0;a<$a.length&&i!==0&&i<$a[a].priority;a++);$a.splice(a,0,e),a===0&&Jg(e)}};var n_=t.version;if(n_!=="19.2.8")throw Error(s(527,n_,"19.2.8"));j.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=m(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var LS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ec.isDisabled&&Ec.supportsFiber)try{Kt=Ec.inject(LS),Yt=Ec}catch{}}return Qo.createRoot=function(e,i){if(!l(e))throw Error(s(299));var a=!1,o="",u=c0,d=u0,y=f0;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=Xg(e,1,!1,null,null,a,o,null,u,d,y,e_),e[Qi]=i.current,sh(e),new Th(i)},Qo.hydrateRoot=function(e,i,a){if(!l(e))throw Error(s(299));var o=!1,u="",d=c0,y=u0,b=f0,I=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(I=a.formState)),i=Xg(e,1,!0,i,a??null,o,u,I,d,y,b,e_),i.context=qg(null),a=i.current,o=li(),o=gs(o),u=Ia(o),u.callback=null,Fa(a,u,o),a=o,i.current.lanes=a,Rn(i,a),Wi(i),e[Qi]=i.current,sh(e),new Mc(i)},Qo.version="19.2.8",Qo}var h_;function XS(){if(h_)return Rh.exports;h_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Rh.exports=kS(),Rh.exports}var qS=XS();const WS=Iv(qS),d_=r=>{let t;const n=new Set,s=(m,g)=>{const _=typeof m=="function"?m(t):m;if(!Object.is(_,t)){const v=t;t=g??(typeof _!="object"||_===null)?_:Object.assign({},t,_),n.forEach(M=>M(t,v))}},l=()=>t,h={setState:s,getState:l,getInitialState:()=>p,subscribe:m=>(n.add(m),()=>n.delete(m))},p=t=r(s,l,h);return h},YS=(r=>r?d_(r):d_),jS=r=>r;function ZS(r,t=jS){const n=sl.useSyncExternalStore(r.subscribe,sl.useCallback(()=>t(r.getState()),[r,t]),sl.useCallback(()=>t(r.getInitialState()),[r,t]));return sl.useDebugValue(n),n}const p_=r=>{const t=YS(r),n=s=>ZS(t,s);return Object.assign(n,t),n},KS=(r=>r?p_(r):p_),Uh=1/60,m_=100,g_=100,QS=35,JS=100,$S=20,tM=1.5,es=200,Ar=60,eM=5,__=1.5,nM=3,iM=2,v_=30,Lh=200,Nh=60,Oh=150,aM=.9,x_=3.5,y_=2.2,Ph=15,S_=8,_d=8,sM=20,rM=2.5,oM=10,lM=.14,cM=.2,uM=.4,fM=.05,hM=1.2,dM=60,pM=6,mM=2,zh=4,gM=.3,_M=2.5,vM=.4,M_={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,bossFight:!1,bossName:""};function E_(r){return{id:r,pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0},hp:m_,maxHp:m_,energy:g_,maxEnergy:g_,speed:$S,weapon:1,weapons:[1,2,3],specialGauge:0,maxSpecialGauge:JS,invulnTimer:0,alive:!0,score:0,kills:0,combo:0}}function T_(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:.5,aimY:.5,weaponSwitch:0,boost:!1,brake:!1,dodge:!1,special:!1,lockToggle:!1,pause:!1}}const yn=KS(r=>({game:{...M_},players:[E_(0)],inputs:[T_()],setGame:t=>r(n=>({game:{...n.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),resetGame:()=>r({game:{...M_},players:[E_(0)],inputs:[T_()]})})),Bh=({size:r=80,opacity:t=.5})=>tt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[tt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),tt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),b_=()=>{const r=yn(t=>t.setGame);return tt.jsxs("div",{className:"lancer-bg w-full h-full relative overflow-hidden flex items-center justify-center",children:[tt.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:tt.jsx(Bh,{size:520,opacity:.07})}),tt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.04]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px",backgroundRepeat:"repeat"}}),tt.jsxs("div",{className:"relative z-10 mx-auto w-[480px] max-w-[92vw] lancer-frame px-6 py-6",children:[tt.jsxs("div",{className:"flex items-start gap-4",children:[tt.jsxs("div",{className:"flex-1",children:[tt.jsxs("div",{className:"text-[12px] tracking-[0.4em] mb-1",style:{color:"#ffffff"},children:[tt.jsx("span",{style:{color:"#ff3030"},children:"下"}),tt.jsx("span",{style:{color:"#ffffff"},children:" 一 "}),tt.jsx("span",{style:{color:"#ff3030"},children:"战"}),tt.jsx("span",{style:{color:"#ffffff"},children:" 高 达"})]}),tt.jsx("h1",{className:"font-pixel-title leading-none",style:{color:"#6a7fff",fontSize:"44px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff",letterSpacing:"0.04em"},children:"纯白枪骑兵"}),tt.jsx("div",{className:"mt-1 text-[11px] tracking-[0.3em]",style:{color:"#8fa4ff"},children:"SILVER LANCER"})]}),tt.jsx("div",{className:"mt-1",children:tt.jsx(Bh,{size:56,opacity:.7})})]}),tt.jsxs("div",{className:"mt-6 border-t border-lancer-blue/40 pt-4 space-y-2",children:[tt.jsx("button",{onClick:()=>r({screen:"pve",gameMode:"pve"}),className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"开始游戏"}),tt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"操作指南"}),tt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"游戏设置"}),tt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"游戏信息"})]}),tt.jsx("div",{className:"mt-5 flex items-end justify-between",children:tt.jsxs("div",{className:"text-center flex-1",children:[tt.jsx(Bh,{size:42,opacity:.85}),tt.jsx("div",{className:"text-[11px] tracking-[0.25em] mt-1",style:{color:"#ffffff"},children:"PHIXCAT"}),tt.jsx("div",{className:"text-[8px] tracking-wider mt-1",style:{color:"rgba(255,255,255,0.5)"},children:"FLASH 3D ENGINE TEST BUILD · Silver Lancer V 0.79"}),tt.jsx("div",{className:"text-[8px] tracking-wider",style:{color:"rgba(255,255,255,0.5)"},children:"Copyrights 2007—2008 phixcat All rights reserved"})]})})]}),tt.jsx("div",{className:"hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none",children:tt.jsxs("svg",{viewBox:"0 0 200 280",width:"280",height:"380",fill:"#ffffff",children:[tt.jsx("polygon",{points:"80,30 120,30 130,55 70,55"}),tt.jsx("rect",{x:"70",y:"55",width:"60",height:"25"}),tt.jsx("polygon",{points:"30,75 70,80 70,130 25,130"}),tt.jsx("polygon",{points:"130,80 170,75 175,130 130,130"}),tt.jsx("rect",{x:"55",y:"80",width:"90",height:"90"}),tt.jsx("polygon",{points:"80,90 120,90 100,140",fill:"#000"}),tt.jsx("rect",{x:"20",y:"130",width:"40",height:"80"}),tt.jsx("rect",{x:"140",y:"130",width:"40",height:"80"}),tt.jsx("polygon",{points:"60,170 140,170 150,210 50,210"}),tt.jsx("polygon",{points:"55,210 95,210 90,275 60,275"}),tt.jsx("polygon",{points:"105,210 145,210 140,275 110,275"})]})})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lp="170",xM=0,A_=1,yM=2,Fv=1,SM=2,Ma=3,ps=0,Hn=1,Zi=2,Aa=0,Xr=1,Vs=2,R_=3,w_=4,MM=5,ks=100,EM=101,TM=102,bM=103,AM=104,RM=200,wM=201,CM=202,DM=203,vd=204,xd=205,UM=206,LM=207,NM=208,OM=209,PM=210,zM=211,BM=212,IM=213,FM=214,yd=0,Sd=1,Md=2,Yr=3,Ed=4,Td=5,bd=6,Ad=7,Hv=0,HM=1,GM=2,ds=0,Gv=1,Vv=2,kv=3,Xv=4,VM=5,qv=6,Wv=7,Yv=300,jr=301,Zr=302,Rd=303,wd=304,pu=306,ou=1e3,hs=1001,Cd=1002,Hi=1003,kM=1004,Tc=1005,Ki=1006,Ih=1007,qs=1008,wa=1009,jv=1010,Zv=1011,ll=1012,cp=1013,Ws=1014,Ta=1015,$r=1016,up=1017,fp=1018,Kr=1020,Kv=35902,Qv=1021,Jv=1022,Fi=1023,$v=1024,tx=1025,qr=1026,Qr=1027,ex=1028,hp=1029,nx=1030,dp=1031,pp=1033,tu=33776,eu=33777,nu=33778,iu=33779,Dd=35840,Ud=35841,Ld=35842,Nd=35843,Od=36196,Pd=37492,zd=37496,Bd=37808,Id=37809,Fd=37810,Hd=37811,Gd=37812,Vd=37813,kd=37814,Xd=37815,qd=37816,Wd=37817,Yd=37818,jd=37819,Zd=37820,Kd=37821,au=36492,Qd=36494,Jd=36495,ix=36283,$d=36284,tp=36285,ep=36286,XM=3200,qM=3201,WM=0,YM=1,us="",di="srgb",to="srgb-linear",mu="linear",Fe="srgb",Rr=7680,C_=519,jM=512,ZM=513,KM=514,ax=515,QM=516,JM=517,$M=518,tE=519,D_=35044,U_="300 es",ba=2e3,lu=2001;class eo{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(n)===-1&&s[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fh=Math.PI/180,np=180/Math.PI;function cl(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(In[r&255]+In[r>>8&255]+In[r>>16&255]+In[r>>24&255]+"-"+In[t&255]+In[t>>8&255]+"-"+In[t>>16&15|64]+In[t>>24&255]+"-"+In[n&63|128]+In[n>>8&255]+"-"+In[n>>16&255]+In[n>>24&255]+In[s&255]+In[s>>8&255]+In[s>>16&255]+In[s>>24&255]).toLowerCase()}function ei(r,t,n){return Math.max(t,Math.min(n,r))}function eE(r,t){return(r%t+t)%t}function Hh(r,t,n){return(1-n)*r+n*t}function Jo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function $n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Re{constructor(t=0,n=0){Re.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,s=this.y,l=t.elements;return this.x=l[0]*n+l[3]*s+l[6],this.y=l[1]*n+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(ei(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y;return n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const s=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ue{constructor(t,n,s,l,c,f,h,p,m){ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,h,p,m)}set(t,n,s,l,c,f,h,p,m){const g=this.elements;return g[0]=t,g[1]=l,g[2]=h,g[3]=n,g[4]=c,g[5]=p,g[6]=s,g[7]=f,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(t,n,s){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],h=s[3],p=s[6],m=s[1],g=s[4],_=s[7],v=s[2],M=s[5],E=s[8],T=l[0],S=l[3],x=l[6],U=l[1],C=l[4],A=l[7],V=l[2],B=l[5],O=l[8];return c[0]=f*T+h*U+p*V,c[3]=f*S+h*C+p*B,c[6]=f*x+h*A+p*O,c[1]=m*T+g*U+_*V,c[4]=m*S+g*C+_*B,c[7]=m*x+g*A+_*O,c[2]=v*T+M*U+E*V,c[5]=v*S+M*C+E*B,c[8]=v*x+M*A+E*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8];return n*f*g-n*h*m-s*c*g+s*h*p+l*c*m-l*f*p}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],_=g*f-h*m,v=h*p-g*c,M=m*c-f*p,E=n*_+s*v+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=_*T,t[1]=(l*m-g*s)*T,t[2]=(h*s-l*f)*T,t[3]=v*T,t[4]=(g*n-l*p)*T,t[5]=(l*c-h*n)*T,t[6]=M*T,t[7]=(s*p-m*n)*T,t[8]=(f*n-s*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,s,l,c,f,h){const p=Math.cos(c),m=Math.sin(c);return this.set(s*p,s*m,-s*(p*f+m*h)+f+t,-l*m,l*p,-l*(-m*f+p*h)+h+n,0,0,1),this}scale(t,n){return this.premultiply(Gh.makeScale(t,n)),this}rotate(t){return this.premultiply(Gh.makeRotation(-t)),this}translate(t,n){return this.premultiply(Gh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<9;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<9;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Gh=new ue;function sx(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function cu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function nE(){const r=cu("canvas");return r.style.display="block",r}const L_={};function rl(r){r in L_||(L_[r]=!0,console.warn(r))}function iE(r,t,n){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:s()}}setTimeout(c,n)})}function aE(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function sE(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ae={enabled:!0,workingColorSpace:to,spaces:{},convert:function(r,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===Fe&&(r.r=Ra(r.r),r.g=Ra(r.g),r.b=Ra(r.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Fe&&(r.r=Wr(r.r),r.g=Wr(r.g),r.b=Wr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===us?mu:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,n){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Ra(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Wr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const N_=[.64,.33,.3,.6,.15,.06],O_=[.2126,.7152,.0722],P_=[.3127,.329],z_=new ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),B_=new ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ae.define({[to]:{primaries:N_,whitePoint:P_,transfer:mu,toXYZ:z_,fromXYZ:B_,luminanceCoefficients:O_,workingColorSpaceConfig:{unpackColorSpace:di},outputColorSpaceConfig:{drawingBufferColorSpace:di}},[di]:{primaries:N_,whitePoint:P_,transfer:Fe,toXYZ:z_,fromXYZ:B_,luminanceCoefficients:O_,outputColorSpaceConfig:{drawingBufferColorSpace:di}}});let wr;class rE{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{wr===void 0&&(wr=cu("canvas")),wr.width=t.width,wr.height=t.height;const s=wr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=wr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=cu("canvas");n.width=t.width,n.height=t.height;const s=n.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ra(c[f]/255)*255;return s.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(Ra(n[s]/255)*255):n[s]=Ra(n[s]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let oE=0;class rx{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=cl(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Vh(l[f].image)):c.push(Vh(l[f]))}else c=Vh(l);s.url=c}return n||(t.images[this.uuid]=s),s}}function Vh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?rE.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lE=0;class Xn extends eo{constructor(t=Xn.DEFAULT_IMAGE,n=Xn.DEFAULT_MAPPING,s=hs,l=hs,c=Ki,f=qs,h=Fi,p=wa,m=Xn.DEFAULT_ANISOTROPY,g=us){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lE++}),this.uuid=cl(),this.name="",this.source=new rx(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ou:t.x=t.x-Math.floor(t.x);break;case hs:t.x=t.x<0?0:1;break;case Cd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ou:t.y=t.y-Math.floor(t.y);break;case hs:t.y=t.y<0?0:1;break;case Cd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xn.DEFAULT_IMAGE=null;Xn.DEFAULT_MAPPING=Yv;Xn.DEFAULT_ANISOTROPY=1;class cn{constructor(t=0,n=0,s=0,l=1){cn.prototype.isVector4=!0,this.x=t,this.y=n,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,s,l){return this.x=t,this.y=n,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,s,l,c;const p=t.elements,m=p[0],g=p[4],_=p[8],v=p[1],M=p[5],E=p[9],T=p[2],S=p[6],x=p[10];if(Math.abs(g-v)<.01&&Math.abs(_-T)<.01&&Math.abs(E-S)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+T)<.1&&Math.abs(E+S)<.1&&Math.abs(m+M+x-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const C=(m+1)/2,A=(M+1)/2,V=(x+1)/2,B=(g+v)/4,O=(_+T)/4,H=(E+S)/4;return C>A&&C>V?C<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(C),l=B/s,c=O/s):A>V?A<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(A),s=B/l,c=H/l):V<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(V),s=O/c,l=H/c),this.set(s,l,c,n),this}let U=Math.sqrt((S-E)*(S-E)+(_-T)*(_-T)+(v-g)*(v-g));return Math.abs(U)<.001&&(U=1),this.x=(S-E)/U,this.y=(_-T)/U,this.z=(v-g)/U,this.w=Math.acos((m+M+x-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this.w=t.w+(n.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cE extends eo{constructor(t=1,n=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new cn(0,0,t,n),this.scissorTest=!1,this.viewport=new cn(0,0,t,n);const l={width:t,height:n,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ki,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new Xn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,s=1){if(this.width!==t||this.height!==n||this.depth!==s){this.width=t,this.height=n,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new rx(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ms extends cE{constructor(t=1,n=1,s={}){super(t,n,s),this.isWebGLRenderTarget=!0}}class ox extends Xn{constructor(t=null,n=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Hi,this.minFilter=Hi,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class uE extends Xn{constructor(t=null,n=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Hi,this.minFilter=Hi,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ul{constructor(t=0,n=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=s,this._w=l}static slerpFlat(t,n,s,l,c,f,h){let p=s[l+0],m=s[l+1],g=s[l+2],_=s[l+3];const v=c[f+0],M=c[f+1],E=c[f+2],T=c[f+3];if(h===0){t[n+0]=p,t[n+1]=m,t[n+2]=g,t[n+3]=_;return}if(h===1){t[n+0]=v,t[n+1]=M,t[n+2]=E,t[n+3]=T;return}if(_!==T||p!==v||m!==M||g!==E){let S=1-h;const x=p*v+m*M+g*E+_*T,U=x>=0?1:-1,C=1-x*x;if(C>Number.EPSILON){const V=Math.sqrt(C),B=Math.atan2(V,x*U);S=Math.sin(S*B)/V,h=Math.sin(h*B)/V}const A=h*U;if(p=p*S+v*A,m=m*S+M*A,g=g*S+E*A,_=_*S+T*A,S===1-h){const V=1/Math.sqrt(p*p+m*m+g*g+_*_);p*=V,m*=V,g*=V,_*=V}}t[n]=p,t[n+1]=m,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,s,l,c,f){const h=s[l],p=s[l+1],m=s[l+2],g=s[l+3],_=c[f],v=c[f+1],M=c[f+2],E=c[f+3];return t[n]=h*E+g*_+p*M-m*v,t[n+1]=p*E+g*v+m*_-h*M,t[n+2]=m*E+g*M+h*v-p*_,t[n+3]=g*E-h*_-p*v-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,s,l){return this._x=t,this._y=n,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const s=t._x,l=t._y,c=t._z,f=t._order,h=Math.cos,p=Math.sin,m=h(s/2),g=h(l/2),_=h(c/2),v=p(s/2),M=p(l/2),E=p(c/2);switch(f){case"XYZ":this._x=v*g*_+m*M*E,this._y=m*M*_-v*g*E,this._z=m*g*E+v*M*_,this._w=m*g*_-v*M*E;break;case"YXZ":this._x=v*g*_+m*M*E,this._y=m*M*_-v*g*E,this._z=m*g*E-v*M*_,this._w=m*g*_+v*M*E;break;case"ZXY":this._x=v*g*_-m*M*E,this._y=m*M*_+v*g*E,this._z=m*g*E+v*M*_,this._w=m*g*_-v*M*E;break;case"ZYX":this._x=v*g*_-m*M*E,this._y=m*M*_+v*g*E,this._z=m*g*E-v*M*_,this._w=m*g*_+v*M*E;break;case"YZX":this._x=v*g*_+m*M*E,this._y=m*M*_+v*g*E,this._z=m*g*E-v*M*_,this._w=m*g*_-v*M*E;break;case"XZY":this._x=v*g*_-m*M*E,this._y=m*M*_-v*g*E,this._z=m*g*E+v*M*_,this._w=m*g*_+v*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const s=n/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,s=n[0],l=n[4],c=n[8],f=n[1],h=n[5],p=n[9],m=n[2],g=n[6],_=n[10],v=s+h+_;if(v>0){const M=.5/Math.sqrt(v+1);this._w=.25/M,this._x=(g-p)*M,this._y=(c-m)*M,this._z=(f-l)*M}else if(s>h&&s>_){const M=2*Math.sqrt(1+s-h-_);this._w=(g-p)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+m)/M}else if(h>_){const M=2*Math.sqrt(1+h-s-_);this._w=(c-m)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(p+g)/M}else{const M=2*Math.sqrt(1+_-s-h);this._w=(f-l)/M,this._x=(c+m)/M,this._y=(p+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let s=t.dot(n)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ei(this.dot(t),-1,1)))}rotateTowards(t,n){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,n/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const s=t._x,l=t._y,c=t._z,f=t._w,h=n._x,p=n._y,m=n._z,g=n._w;return this._x=s*g+f*h+l*m-c*p,this._y=l*g+f*p+c*h-s*m,this._z=c*g+f*m+s*p-l*h,this._w=f*g-s*h-l*p-c*m,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,f=this._w;let h=f*t._w+s*t._x+l*t._y+c*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=f,this._x=s,this._y=l,this._z=c,this;const p=1-h*h;if(p<=Number.EPSILON){const M=1-n;return this._w=M*f+n*this._w,this._x=M*s+n*this._x,this._y=M*l+n*this._y,this._z=M*c+n*this._z,this.normalize(),this}const m=Math.sqrt(p),g=Math.atan2(m,h),_=Math.sin((1-n)*g)/m,v=Math.sin(n*g)/m;return this._w=f*_+this._w*v,this._x=s*_+this._x*v,this._y=l*_+this._y*v,this._z=c*_+this._z*v,this._onChangeCallback(),this}slerpQuaternions(t,n,s){return this.copy(t).slerp(n,s)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(t=0,n=0,s=0){$.prototype.isVector3=!0,this.x=t,this.y=n,this.z=s}set(t,n,s){return s===void 0&&(s=this.z),this.x=t,this.y=n,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(I_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(I_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*s+c[6]*l,this.y=c[1]*n+c[4]*s+c[7]*l,this.z=c[2]*n+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,s=this.y,l=this.z,c=t.x,f=t.y,h=t.z,p=t.w,m=2*(f*l-h*s),g=2*(h*n-c*l),_=2*(c*s-f*n);return this.x=n+p*m+f*_-h*g,this.y=s+p*g+h*m-c*_,this.z=l+p*_+c*g-f*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*s+c[8]*l,this.y=c[1]*n+c[5]*s+c[9]*l,this.z=c[2]*n+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const s=t.x,l=t.y,c=t.z,f=n.x,h=n.y,p=n.z;return this.x=l*p-c*h,this.y=c*f-s*p,this.z=s*h-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const s=t.dot(this)/n;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return kh.copy(this).projectOnVector(t),this.sub(kh)}reflect(t){return this.sub(kh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(ei(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return n*n+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,s){const l=Math.sin(n)*t;return this.x=l*Math.sin(s),this.y=Math.cos(n)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,s){return this.x=t*Math.sin(n),this.y=s,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=s,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,s=Math.sqrt(1-n*n);return this.x=s*Math.cos(t),this.y=n,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kh=new $,I_=new ul;class fl{constructor(t=new $(1/0,1/0,1/0),n=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n+=3)this.expandByPoint(Pi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,s=t.count;n<s;n++)this.expandByPoint(Pi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const s=Pi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)t.isMesh===!0?t.getVertexPosition(f,Pi):Pi.fromBufferAttribute(c,f),Pi.applyMatrix4(t.matrixWorld),this.expandByPoint(Pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),bc.copy(s.boundingBox)),bc.applyMatrix4(t.matrixWorld),this.union(bc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pi),Pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,s;return t.normal.x>0?(n=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),n<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($o),Ac.subVectors(this.max,$o),Cr.subVectors(t.a,$o),Dr.subVectors(t.b,$o),Ur.subVectors(t.c,$o),ns.subVectors(Dr,Cr),is.subVectors(Ur,Dr),Os.subVectors(Cr,Ur);let n=[0,-ns.z,ns.y,0,-is.z,is.y,0,-Os.z,Os.y,ns.z,0,-ns.x,is.z,0,-is.x,Os.z,0,-Os.x,-ns.y,ns.x,0,-is.y,is.x,0,-Os.y,Os.x,0];return!Xh(n,Cr,Dr,Ur,Ac)||(n=[1,0,0,0,1,0,0,0,1],!Xh(n,Cr,Dr,Ur,Ac))?!1:(Rc.crossVectors(ns,is),n=[Rc.x,Rc.y,Rc.z],Xh(n,Cr,Dr,Ur,Ac))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ga[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ga[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ga[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ga[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ga[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ga[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ga[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ga[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ga),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ga=[new $,new $,new $,new $,new $,new $,new $,new $],Pi=new $,bc=new fl,Cr=new $,Dr=new $,Ur=new $,ns=new $,is=new $,Os=new $,$o=new $,Ac=new $,Rc=new $,Ps=new $;function Xh(r,t,n,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Ps.fromArray(r,c);const h=l.x*Math.abs(Ps.x)+l.y*Math.abs(Ps.y)+l.z*Math.abs(Ps.z),p=t.dot(Ps),m=n.dot(Ps),g=s.dot(Ps);if(Math.max(-Math.max(p,m,g),Math.min(p,m,g))>h)return!1}return!0}const fE=new fl,tl=new $,qh=new $;class hl{constructor(t=new $,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const s=this.center;n!==void 0?s.copy(n):fE.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const s=this.center.distanceToSquared(t);return n.copy(t),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;tl.subVectors(t,this.center);const n=tl.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),l=(s-this.radius)*.5;this.center.addScaledVector(tl,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(qh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(tl.copy(t.center).add(qh)),this.expandByPoint(tl.copy(t.center).sub(qh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _a=new $,Wh=new $,wc=new $,as=new $,Yh=new $,Cc=new $,jh=new $;class mp{constructor(t=new $,n=new $(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_a)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=_a.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(_a.copy(this.origin).addScaledVector(this.direction,n),_a.distanceToSquared(t))}distanceSqToSegment(t,n,s,l){Wh.copy(t).add(n).multiplyScalar(.5),wc.copy(n).sub(t).normalize(),as.copy(this.origin).sub(Wh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(wc),h=as.dot(this.direction),p=-as.dot(wc),m=as.lengthSq(),g=Math.abs(1-f*f);let _,v,M,E;if(g>0)if(_=f*p-h,v=f*h-p,E=c*g,_>=0)if(v>=-E)if(v<=E){const T=1/g;_*=T,v*=T,M=_*(_+f*v+2*h)+v*(f*_+v+2*p)+m}else v=c,_=Math.max(0,-(f*v+h)),M=-_*_+v*(v+2*p)+m;else v=-c,_=Math.max(0,-(f*v+h)),M=-_*_+v*(v+2*p)+m;else v<=-E?(_=Math.max(0,-(-f*c+h)),v=_>0?-c:Math.min(Math.max(-c,-p),c),M=-_*_+v*(v+2*p)+m):v<=E?(_=0,v=Math.min(Math.max(-c,-p),c),M=v*(v+2*p)+m):(_=Math.max(0,-(f*c+h)),v=_>0?c:Math.min(Math.max(-c,-p),c),M=-_*_+v*(v+2*p)+m);else v=f>0?-c:c,_=Math.max(0,-(f*v+h)),M=-_*_+v*(v+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Wh).addScaledVector(wc,v),M}intersectSphere(t,n){_a.subVectors(t.center,this.origin);const s=_a.dot(this.direction),l=_a.dot(_a)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,p=s+f;return p<0?null:h<0?this.at(p,n):this.at(h,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/n;return s>=0?s:null}intersectPlane(t,n){const s=this.distanceToPlane(t);return s===null?null:this.at(s,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let s,l,c,f,h,p;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return m>=0?(s=(t.min.x-v.x)*m,l=(t.max.x-v.x)*m):(s=(t.max.x-v.x)*m,l=(t.min.x-v.x)*m),g>=0?(c=(t.min.y-v.y)*g,f=(t.max.y-v.y)*g):(c=(t.max.y-v.y)*g,f=(t.min.y-v.y)*g),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(h=(t.min.z-v.z)*_,p=(t.max.z-v.z)*_):(h=(t.max.z-v.z)*_,p=(t.min.z-v.z)*_),s>p||h>l)||((h>s||s!==s)&&(s=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,n)}intersectsBox(t){return this.intersectBox(t,_a)!==null}intersectTriangle(t,n,s,l,c){Yh.subVectors(n,t),Cc.subVectors(s,t),jh.crossVectors(Yh,Cc);let f=this.direction.dot(jh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;as.subVectors(this.origin,t);const p=h*this.direction.dot(Cc.crossVectors(as,Cc));if(p<0)return null;const m=h*this.direction.dot(Yh.cross(as));if(m<0||p+m>f)return null;const g=-h*as.dot(jh);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class sn{constructor(t,n,s,l,c,f,h,p,m,g,_,v,M,E,T,S){sn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,h,p,m,g,_,v,M,E,T,S)}set(t,n,s,l,c,f,h,p,m,g,_,v,M,E,T,S){const x=this.elements;return x[0]=t,x[4]=n,x[8]=s,x[12]=l,x[1]=c,x[5]=f,x[9]=h,x[13]=p,x[2]=m,x[6]=g,x[10]=_,x[14]=v,x[3]=M,x[7]=E,x[11]=T,x[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sn().fromArray(this.elements)}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(t){const n=this.elements,s=t.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,s){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,n,s){return this.set(t.x,n.x,s.x,0,t.y,n.y,s.y,0,t.z,n.z,s.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,s=t.elements,l=1/Lr.setFromMatrixColumn(t,0).length(),c=1/Lr.setFromMatrixColumn(t,1).length(),f=1/Lr.setFromMatrixColumn(t,2).length();return n[0]=s[0]*l,n[1]=s[1]*l,n[2]=s[2]*l,n[3]=0,n[4]=s[4]*c,n[5]=s[5]*c,n[6]=s[6]*c,n[7]=0,n[8]=s[8]*f,n[9]=s[9]*f,n[10]=s[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),h=Math.sin(s),p=Math.cos(l),m=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const v=f*g,M=f*_,E=h*g,T=h*_;n[0]=p*g,n[4]=-p*_,n[8]=m,n[1]=M+E*m,n[5]=v-T*m,n[9]=-h*p,n[2]=T-v*m,n[6]=E+M*m,n[10]=f*p}else if(t.order==="YXZ"){const v=p*g,M=p*_,E=m*g,T=m*_;n[0]=v+T*h,n[4]=E*h-M,n[8]=f*m,n[1]=f*_,n[5]=f*g,n[9]=-h,n[2]=M*h-E,n[6]=T+v*h,n[10]=f*p}else if(t.order==="ZXY"){const v=p*g,M=p*_,E=m*g,T=m*_;n[0]=v-T*h,n[4]=-f*_,n[8]=E+M*h,n[1]=M+E*h,n[5]=f*g,n[9]=T-v*h,n[2]=-f*m,n[6]=h,n[10]=f*p}else if(t.order==="ZYX"){const v=f*g,M=f*_,E=h*g,T=h*_;n[0]=p*g,n[4]=E*m-M,n[8]=v*m+T,n[1]=p*_,n[5]=T*m+v,n[9]=M*m-E,n[2]=-m,n[6]=h*p,n[10]=f*p}else if(t.order==="YZX"){const v=f*p,M=f*m,E=h*p,T=h*m;n[0]=p*g,n[4]=T-v*_,n[8]=E*_+M,n[1]=_,n[5]=f*g,n[9]=-h*g,n[2]=-m*g,n[6]=M*_+E,n[10]=v-T*_}else if(t.order==="XZY"){const v=f*p,M=f*m,E=h*p,T=h*m;n[0]=p*g,n[4]=-_,n[8]=m*g,n[1]=v*_+T,n[5]=f*g,n[9]=M*_-E,n[2]=E*_-M,n[6]=h*g,n[10]=T*_+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hE,t,dE)}lookAt(t,n,s){const l=this.elements;return ci.subVectors(t,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),ss.crossVectors(s,ci),ss.lengthSq()===0&&(Math.abs(s.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),ss.crossVectors(s,ci)),ss.normalize(),Dc.crossVectors(ci,ss),l[0]=ss.x,l[4]=Dc.x,l[8]=ci.x,l[1]=ss.y,l[5]=Dc.y,l[9]=ci.y,l[2]=ss.z,l[6]=Dc.z,l[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],h=s[4],p=s[8],m=s[12],g=s[1],_=s[5],v=s[9],M=s[13],E=s[2],T=s[6],S=s[10],x=s[14],U=s[3],C=s[7],A=s[11],V=s[15],B=l[0],O=l[4],H=l[8],L=l[12],w=l[1],F=l[5],Q=l[9],J=l[13],ct=l[2],ut=l[6],P=l[10],j=l[14],Z=l[3],St=l[7],Tt=l[11],z=l[15];return c[0]=f*B+h*w+p*ct+m*Z,c[4]=f*O+h*F+p*ut+m*St,c[8]=f*H+h*Q+p*P+m*Tt,c[12]=f*L+h*J+p*j+m*z,c[1]=g*B+_*w+v*ct+M*Z,c[5]=g*O+_*F+v*ut+M*St,c[9]=g*H+_*Q+v*P+M*Tt,c[13]=g*L+_*J+v*j+M*z,c[2]=E*B+T*w+S*ct+x*Z,c[6]=E*O+T*F+S*ut+x*St,c[10]=E*H+T*Q+S*P+x*Tt,c[14]=E*L+T*J+S*j+x*z,c[3]=U*B+C*w+A*ct+V*Z,c[7]=U*O+C*F+A*ut+V*St,c[11]=U*H+C*Q+A*P+V*Tt,c[15]=U*L+C*J+A*j+V*z,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[4],l=t[8],c=t[12],f=t[1],h=t[5],p=t[9],m=t[13],g=t[2],_=t[6],v=t[10],M=t[14],E=t[3],T=t[7],S=t[11],x=t[15];return E*(+c*p*_-l*m*_-c*h*v+s*m*v+l*h*M-s*p*M)+T*(+n*p*M-n*m*v+c*f*v-l*f*M+l*m*g-c*p*g)+S*(+n*m*_-n*h*M-c*f*_+s*f*M+c*h*g-s*m*g)+x*(-l*h*g-n*p*_+n*h*v+l*f*_-s*f*v+s*p*g)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=s),this}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],h=t[5],p=t[6],m=t[7],g=t[8],_=t[9],v=t[10],M=t[11],E=t[12],T=t[13],S=t[14],x=t[15],U=_*S*m-T*v*m+T*p*M-h*S*M-_*p*x+h*v*x,C=E*v*m-g*S*m-E*p*M+f*S*M+g*p*x-f*v*x,A=g*T*m-E*_*m+E*h*M-f*T*M-g*h*x+f*_*x,V=E*_*p-g*T*p-E*h*v+f*T*v+g*h*S-f*_*S,B=n*U+s*C+l*A+c*V;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/B;return t[0]=U*O,t[1]=(T*v*c-_*S*c-T*l*M+s*S*M+_*l*x-s*v*x)*O,t[2]=(h*S*c-T*p*c+T*l*m-s*S*m-h*l*x+s*p*x)*O,t[3]=(_*p*c-h*v*c-_*l*m+s*v*m+h*l*M-s*p*M)*O,t[4]=C*O,t[5]=(g*S*c-E*v*c+E*l*M-n*S*M-g*l*x+n*v*x)*O,t[6]=(E*p*c-f*S*c-E*l*m+n*S*m+f*l*x-n*p*x)*O,t[7]=(f*v*c-g*p*c+g*l*m-n*v*m-f*l*M+n*p*M)*O,t[8]=A*O,t[9]=(E*_*c-g*T*c-E*s*M+n*T*M+g*s*x-n*_*x)*O,t[10]=(f*T*c-E*h*c+E*s*m-n*T*m-f*s*x+n*h*x)*O,t[11]=(g*h*c-f*_*c-g*s*m+n*_*m+f*s*M-n*h*M)*O,t[12]=V*O,t[13]=(g*T*l-E*_*l+E*s*v-n*T*v-g*s*S+n*_*S)*O,t[14]=(E*h*l-f*T*l-E*s*p+n*T*p+f*s*S-n*h*S)*O,t[15]=(f*_*l-g*h*l+g*s*p-n*_*p-f*s*v+n*h*v)*O,this}scale(t){const n=this.elements,s=t.x,l=t.y,c=t.z;return n[0]*=s,n[4]*=l,n[8]*=c,n[1]*=s,n[5]*=l,n[9]*=c,n[2]*=s,n[6]*=l,n[10]*=c,n[3]*=s,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,s,l))}makeTranslation(t,n,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const s=Math.cos(n),l=Math.sin(n),c=1-s,f=t.x,h=t.y,p=t.z,m=c*f,g=c*h;return this.set(m*f+s,m*h-l*p,m*p+l*h,0,m*h+l*p,g*h+s,g*p-l*f,0,m*p-l*h,g*p+l*f,c*p*p+s,0,0,0,0,1),this}makeScale(t,n,s){return this.set(t,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,n,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,s){const l=this.elements,c=n._x,f=n._y,h=n._z,p=n._w,m=c+c,g=f+f,_=h+h,v=c*m,M=c*g,E=c*_,T=f*g,S=f*_,x=h*_,U=p*m,C=p*g,A=p*_,V=s.x,B=s.y,O=s.z;return l[0]=(1-(T+x))*V,l[1]=(M+A)*V,l[2]=(E-C)*V,l[3]=0,l[4]=(M-A)*B,l[5]=(1-(v+x))*B,l[6]=(S+U)*B,l[7]=0,l[8]=(E+C)*O,l[9]=(S-U)*O,l[10]=(1-(v+T))*O,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,s){const l=this.elements;let c=Lr.set(l[0],l[1],l[2]).length();const f=Lr.set(l[4],l[5],l[6]).length(),h=Lr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],zi.copy(this);const m=1/c,g=1/f,_=1/h;return zi.elements[0]*=m,zi.elements[1]*=m,zi.elements[2]*=m,zi.elements[4]*=g,zi.elements[5]*=g,zi.elements[6]*=g,zi.elements[8]*=_,zi.elements[9]*=_,zi.elements[10]*=_,n.setFromRotationMatrix(zi),s.x=c,s.y=f,s.z=h,this}makePerspective(t,n,s,l,c,f,h=ba){const p=this.elements,m=2*c/(n-t),g=2*c/(s-l),_=(n+t)/(n-t),v=(s+l)/(s-l);let M,E;if(h===ba)M=-(f+c)/(f-c),E=-2*f*c/(f-c);else if(h===lu)M=-f/(f-c),E=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=g,p[9]=v,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,s,l,c,f,h=ba){const p=this.elements,m=1/(n-t),g=1/(s-l),_=1/(f-c),v=(n+t)*m,M=(s+l)*g;let E,T;if(h===ba)E=(f+c)*_,T=-2*_;else if(h===lu)E=c*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-v,p[1]=0,p[5]=2*g,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=T,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<16;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<16;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t[n+9]=s[9],t[n+10]=s[10],t[n+11]=s[11],t[n+12]=s[12],t[n+13]=s[13],t[n+14]=s[14],t[n+15]=s[15],t}}const Lr=new $,zi=new sn,hE=new $(0,0,0),dE=new $(1,1,1),ss=new $,Dc=new $,ci=new $,F_=new sn,H_=new ul;class Ca{constructor(t=0,n=0,s=0,l=Ca.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,s,l=this._order){return this._x=t,this._y=n,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],h=l[8],p=l[1],m=l[5],g=l[9],_=l[2],v=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(ei(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(v,m),this._z=0);break;case"YXZ":this._x=Math.asin(-ei(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ei(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-ei(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,M),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(ei(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-ei(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(v,m),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,s){return F_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(F_,n,s)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return H_.setFromEuler(this),this.setFromQuaternion(H_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ca.DEFAULT_ORDER="XYZ";class lx{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pE=0;const G_=new $,Nr=new ul,va=new sn,Uc=new $,el=new $,mE=new $,gE=new ul,V_=new $(1,0,0),k_=new $(0,1,0),X_=new $(0,0,1),q_={type:"added"},_E={type:"removed"},Or={type:"childadded",child:null},Zh={type:"childremoved",child:null};class qn extends eo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pE++}),this.uuid=cl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qn.DEFAULT_UP.clone();const t=new $,n=new Ca,s=new ul,l=new $(1,1,1);function c(){s.setFromEuler(n,!1)}function f(){n.setFromQuaternion(s,void 0,!1)}n._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new sn},normalMatrix:{value:new ue}}),this.matrix=new sn,this.matrixWorld=new sn,this.matrixAutoUpdate=qn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Nr.setFromAxisAngle(t,n),this.quaternion.multiply(Nr),this}rotateOnWorldAxis(t,n){return Nr.setFromAxisAngle(t,n),this.quaternion.premultiply(Nr),this}rotateX(t){return this.rotateOnAxis(V_,t)}rotateY(t){return this.rotateOnAxis(k_,t)}rotateZ(t){return this.rotateOnAxis(X_,t)}translateOnAxis(t,n){return G_.copy(t).applyQuaternion(this.quaternion),this.position.add(G_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(V_,t)}translateY(t){return this.translateOnAxis(k_,t)}translateZ(t){return this.translateOnAxis(X_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(va.copy(this.matrixWorld).invert())}lookAt(t,n,s){t.isVector3?Uc.copy(t):Uc.set(t,n,s);const l=this.parent;this.updateWorldMatrix(!0,!1),el.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?va.lookAt(el,Uc,this.up):va.lookAt(Uc,el,this.up),this.quaternion.setFromRotationMatrix(va),l&&(va.extractRotation(l.matrixWorld),Nr.setFromRotationMatrix(va),this.quaternion.premultiply(Nr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(q_),Or.child=t,this.dispatchEvent(Or),Or.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(_E),Zh.child=t,this.dispatchEvent(Zh),Zh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),va.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),va.multiply(t.parent.matrixWorld)),t.applyMatrix4(va),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(q_),Or.child=t,this.dispatchEvent(Or),Or.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,s=[]){this[t]===n&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(el,t,mE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(el,gE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].updateMatrixWorld(t)}updateWorldMatrix(t,n){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",s={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,g=p.length;m<g;m++){const _=p[m];c(t.shapes,_)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(c(t.materials,this.material[p]));l.material=h}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(c(t.animations,p))}}if(n){const h=f(t.geometries),p=f(t.materials),m=f(t.textures),g=f(t.images),_=f(t.shapes),v=f(t.skeletons),M=f(t.animations),E=f(t.nodes);h.length>0&&(s.geometries=h),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),g.length>0&&(s.images=g),_.length>0&&(s.shapes=_),v.length>0&&(s.skeletons=v),M.length>0&&(s.animations=M),E.length>0&&(s.nodes=E)}return s.object=l,s;function f(h){const p=[];for(const m in h){const g=h[m];delete g.metadata,p.push(g)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}qn.DEFAULT_UP=new $(0,1,0);qn.DEFAULT_MATRIX_AUTO_UPDATE=!0;qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bi=new $,xa=new $,Kh=new $,ya=new $,Pr=new $,zr=new $,W_=new $,Qh=new $,Jh=new $,$h=new $,td=new cn,ed=new cn,nd=new cn;class Ii{constructor(t=new $,n=new $,s=new $){this.a=t,this.b=n,this.c=s}static getNormal(t,n,s,l){l.subVectors(s,n),Bi.subVectors(t,n),l.cross(Bi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,s,l,c){Bi.subVectors(l,n),xa.subVectors(s,n),Kh.subVectors(t,n);const f=Bi.dot(Bi),h=Bi.dot(xa),p=Bi.dot(Kh),m=xa.dot(xa),g=xa.dot(Kh),_=f*m-h*h;if(_===0)return c.set(0,0,0),null;const v=1/_,M=(m*p-h*g)*v,E=(f*g-h*p)*v;return c.set(1-M-E,E,M)}static containsPoint(t,n,s,l){return this.getBarycoord(t,n,s,l,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(t,n,s,l,c,f,h,p){return this.getBarycoord(t,n,s,l,ya)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,ya.x),p.addScaledVector(f,ya.y),p.addScaledVector(h,ya.z),p)}static getInterpolatedAttribute(t,n,s,l,c,f){return td.setScalar(0),ed.setScalar(0),nd.setScalar(0),td.fromBufferAttribute(t,n),ed.fromBufferAttribute(t,s),nd.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(td,c.x),f.addScaledVector(ed,c.y),f.addScaledVector(nd,c.z),f}static isFrontFacing(t,n,s,l){return Bi.subVectors(s,n),xa.subVectors(t,n),Bi.cross(xa).dot(l)<0}set(t,n,s){return this.a.copy(t),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(t,n,s,l){return this.a.copy(t[n]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,s,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bi.subVectors(this.c,this.b),xa.subVectors(this.a,this.b),Bi.cross(xa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ii.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Ii.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,s,l,c){return Ii.getInterpolation(t,this.a,this.b,this.c,n,s,l,c)}containsPoint(t){return Ii.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ii.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const s=this.a,l=this.b,c=this.c;let f,h;Pr.subVectors(l,s),zr.subVectors(c,s),Qh.subVectors(t,s);const p=Pr.dot(Qh),m=zr.dot(Qh);if(p<=0&&m<=0)return n.copy(s);Jh.subVectors(t,l);const g=Pr.dot(Jh),_=zr.dot(Jh);if(g>=0&&_<=g)return n.copy(l);const v=p*_-g*m;if(v<=0&&p>=0&&g<=0)return f=p/(p-g),n.copy(s).addScaledVector(Pr,f);$h.subVectors(t,c);const M=Pr.dot($h),E=zr.dot($h);if(E>=0&&M<=E)return n.copy(c);const T=M*m-p*E;if(T<=0&&m>=0&&E<=0)return h=m/(m-E),n.copy(s).addScaledVector(zr,h);const S=g*E-M*_;if(S<=0&&_-g>=0&&M-E>=0)return W_.subVectors(c,l),h=(_-g)/(_-g+(M-E)),n.copy(l).addScaledVector(W_,h);const x=1/(S+T+v);return f=T*x,h=v*x,n.copy(s).addScaledVector(Pr,f).addScaledVector(zr,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},Lc={h:0,s:0,l:0};function id(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class ee{constructor(t,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,s)}set(t,n,s){if(n===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=di){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ae.toWorkingColorSpace(this,n),this}setRGB(t,n,s,l=Ae.workingColorSpace){return this.r=t,this.g=n,this.b=s,Ae.toWorkingColorSpace(this,l),this}setHSL(t,n,s,l=Ae.workingColorSpace){if(t=eE(t,1),n=ei(n,0,1),s=ei(s,0,1),n===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+n):s+n-s*n,f=2*s-c;this.r=id(f,c,t+1/3),this.g=id(f,c,t),this.b=id(f,c,t-1/3)}return Ae.toWorkingColorSpace(this,l),this}setStyle(t,n=di){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=di){const s=cx[t.toLowerCase()];return s!==void 0?this.setHex(s,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ra(t.r),this.g=Ra(t.g),this.b=Ra(t.b),this}copyLinearToSRGB(t){return this.r=Wr(t.r),this.g=Wr(t.g),this.b=Wr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=di){return Ae.fromWorkingColorSpace(Fn.copy(this),t),Math.round(ei(Fn.r*255,0,255))*65536+Math.round(ei(Fn.g*255,0,255))*256+Math.round(ei(Fn.b*255,0,255))}getHexString(t=di){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ae.workingColorSpace){Ae.fromWorkingColorSpace(Fn.copy(this),n);const s=Fn.r,l=Fn.g,c=Fn.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let p,m;const g=(h+f)/2;if(h===f)p=0,m=0;else{const _=f-h;switch(m=g<=.5?_/(f+h):_/(2-f-h),f){case s:p=(l-c)/_+(l<c?6:0);break;case l:p=(c-s)/_+2;break;case c:p=(s-l)/_+4;break}p/=6}return t.h=p,t.s=m,t.l=g,t}getRGB(t,n=Ae.workingColorSpace){return Ae.fromWorkingColorSpace(Fn.copy(this),n),t.r=Fn.r,t.g=Fn.g,t.b=Fn.b,t}getStyle(t=di){Ae.fromWorkingColorSpace(Fn.copy(this),t);const n=Fn.r,s=Fn.g,l=Fn.b;return t!==di?`color(${t} ${n.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,n,s){return this.getHSL(rs),this.setHSL(rs.h+t,rs.s+n,rs.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,s){return this.r=t.r+(n.r-t.r)*s,this.g=t.g+(n.g-t.g)*s,this.b=t.b+(n.b-t.b)*s,this}lerpHSL(t,n){this.getHSL(rs),t.getHSL(Lc);const s=Hh(rs.h,Lc.h,n),l=Hh(rs.s,Lc.s,n),c=Hh(rs.l,Lc.l,n);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*s+c[6]*l,this.g=c[1]*n+c[4]*s+c[7]*l,this.b=c[2]*n+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fn=new ee;ee.NAMES=cx;let vE=0;class no extends eo{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vE++}),this.uuid=cl(),this.name="",this.blending=Xr,this.side=ps,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vd,this.blendDst=xd,this.blendEquation=ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=C_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rr,this.stencilZFail=Rr,this.stencilZPass=Rr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const s=t[n];if(s===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[n]=s}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Xr&&(s.blending=this.blending),this.side!==ps&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==vd&&(s.blendSrc=this.blendSrc),this.blendDst!==xd&&(s.blendDst=this.blendDst),this.blendEquation!==ks&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Yr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==C_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Rr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Rr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let s=null;if(n!==null){const l=n.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=n[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ai extends no{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ca,this.combine=Hv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pn=new $,Nc=new Re;class kn{constructor(t,n,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=s,this.usage=D_,this.updateRanges=[],this.gpuType=Ta,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,s){t*=this.itemSize,s*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)Nc.fromBufferAttribute(this,n),Nc.applyMatrix3(t),this.setXY(n,Nc.x,Nc.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)pn.fromBufferAttribute(this,n),pn.applyMatrix3(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}applyMatrix4(t){for(let n=0,s=this.count;n<s;n++)pn.fromBufferAttribute(this,n),pn.applyMatrix4(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}applyNormalMatrix(t){for(let n=0,s=this.count;n<s;n++)pn.fromBufferAttribute(this,n),pn.applyNormalMatrix(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}transformDirection(t){for(let n=0,s=this.count;n<s;n++)pn.fromBufferAttribute(this,n),pn.transformDirection(t),this.setXYZ(n,pn.x,pn.y,pn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let s=this.array[t*this.itemSize+n];return this.normalized&&(s=Jo(s,this.array)),s}setComponent(t,n,s){return this.normalized&&(s=$n(s,this.array)),this.array[t*this.itemSize+n]=s,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Jo(n,this.array)),n}setX(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Jo(n,this.array)),n}setY(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Jo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Jo(n,this.array)),n}setW(t,n){return this.normalized&&(n=$n(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,s){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),s=$n(s,this.array)),this.array[t+0]=n,this.array[t+1]=s,this}setXYZ(t,n,s,l){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),s=$n(s,this.array),l=$n(l,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,n,s,l,c){return t*=this.itemSize,this.normalized&&(n=$n(n,this.array),s=$n(s,this.array),l=$n(l,this.array),c=$n(c,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==D_&&(t.usage=this.usage),t}}class ux extends kn{constructor(t,n,s){super(new Uint16Array(t),n,s)}}class fx extends kn{constructor(t,n,s){super(new Uint32Array(t),n,s)}}class rn extends kn{constructor(t,n,s){super(new Float32Array(t),n,s)}}let xE=0;const Ti=new sn,ad=new qn,Br=new $,ui=new fl,nl=new fl,bn=new $;class An extends eo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xE++}),this.uuid=cl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sx(t)?fx:ux)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,s=0){this.groups.push({start:t,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new ue().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ti.makeRotationFromQuaternion(t),this.applyMatrix4(Ti),this}rotateX(t){return Ti.makeRotationX(t),this.applyMatrix4(Ti),this}rotateY(t){return Ti.makeRotationY(t),this.applyMatrix4(Ti),this}rotateZ(t){return Ti.makeRotationZ(t),this.applyMatrix4(Ti),this}translate(t,n,s){return Ti.makeTranslation(t,n,s),this.applyMatrix4(Ti),this}scale(t,n,s){return Ti.makeScale(t,n,s),this.applyMatrix4(Ti),this}lookAt(t){return ad.lookAt(t),ad.updateMatrix(),this.applyMatrix4(ad.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new rn(s,3))}else{for(let s=0,l=n.count;s<l;s++){const c=t[s];n.setXYZ(s,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let s=0,l=n.length;s<l;s++){const c=n[s];ui.setFromBufferAttribute(c),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(t){const s=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const h=n[c];nl.setFromBufferAttribute(h),this.morphTargetsRelative?(bn.addVectors(ui.min,nl.min),ui.expandByPoint(bn),bn.addVectors(ui.max,nl.max),ui.expandByPoint(bn)):(ui.expandByPoint(nl.min),ui.expandByPoint(nl.max))}ui.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)bn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(bn));if(n)for(let c=0,f=n.length;c<f;c++){const h=n[c],p=this.morphTargetsRelative;for(let m=0,g=h.count;m<g;m++)bn.fromBufferAttribute(h,m),p&&(Br.fromBufferAttribute(t,m),bn.add(Br)),l=Math.max(l,s.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],p=[];for(let H=0;H<s.count;H++)h[H]=new $,p[H]=new $;const m=new $,g=new $,_=new $,v=new Re,M=new Re,E=new Re,T=new $,S=new $;function x(H,L,w){m.fromBufferAttribute(s,H),g.fromBufferAttribute(s,L),_.fromBufferAttribute(s,w),v.fromBufferAttribute(c,H),M.fromBufferAttribute(c,L),E.fromBufferAttribute(c,w),g.sub(m),_.sub(m),M.sub(v),E.sub(v);const F=1/(M.x*E.y-E.x*M.y);isFinite(F)&&(T.copy(g).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(F),S.copy(_).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(F),h[H].add(T),h[L].add(T),h[w].add(T),p[H].add(S),p[L].add(S),p[w].add(S))}let U=this.groups;U.length===0&&(U=[{start:0,count:t.count}]);for(let H=0,L=U.length;H<L;++H){const w=U[H],F=w.start,Q=w.count;for(let J=F,ct=F+Q;J<ct;J+=3)x(t.getX(J+0),t.getX(J+1),t.getX(J+2))}const C=new $,A=new $,V=new $,B=new $;function O(H){V.fromBufferAttribute(l,H),B.copy(V);const L=h[H];C.copy(L),C.sub(V.multiplyScalar(V.dot(L))).normalize(),A.crossVectors(B,L);const F=A.dot(p[H])<0?-1:1;f.setXYZW(H,C.x,C.y,C.z,F)}for(let H=0,L=U.length;H<L;++H){const w=U[H],F=w.start,Q=w.count;for(let J=F,ct=F+Q;J<ct;J+=3)O(t.getX(J+0)),O(t.getX(J+1)),O(t.getX(J+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new kn(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let v=0,M=s.count;v<M;v++)s.setXYZ(v,0,0,0);const l=new $,c=new $,f=new $,h=new $,p=new $,m=new $,g=new $,_=new $;if(t)for(let v=0,M=t.count;v<M;v+=3){const E=t.getX(v+0),T=t.getX(v+1),S=t.getX(v+2);l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),h.fromBufferAttribute(s,E),p.fromBufferAttribute(s,T),m.fromBufferAttribute(s,S),h.add(g),p.add(g),m.add(g),s.setXYZ(E,h.x,h.y,h.z),s.setXYZ(T,p.x,p.y,p.z),s.setXYZ(S,m.x,m.y,m.z)}else for(let v=0,M=n.count;v<M;v+=3)l.fromBufferAttribute(n,v+0),c.fromBufferAttribute(n,v+1),f.fromBufferAttribute(n,v+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),s.setXYZ(v+0,g.x,g.y,g.z),s.setXYZ(v+1,g.x,g.y,g.z),s.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,s=t.count;n<s;n++)bn.fromBufferAttribute(t,n),bn.normalize(),t.setXYZ(n,bn.x,bn.y,bn.z)}toNonIndexed(){function t(h,p){const m=h.array,g=h.itemSize,_=h.normalized,v=new m.constructor(p.length*g);let M=0,E=0;for(let T=0,S=p.length;T<S;T++){h.isInterleavedBufferAttribute?M=p[T]*h.data.stride+h.offset:M=p[T]*g;for(let x=0;x<g;x++)v[E++]=m[M++]}return new kn(v,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new An,s=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=t(p,s);n.setAttribute(h,m)}const c=this.morphAttributes;for(const h in c){const p=[],m=c[h];for(let g=0,_=m.length;g<_;g++){const v=m[g],M=t(v,s);p.push(M)}n.morphAttributes[h]=p}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const p in s){const m=s[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],g=[];for(let _=0,v=m.length;_<v;_++){const M=m[_];g.push(M.toJSON(t.data))}g.length>0&&(l[p]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(n));const l=t.attributes;for(const m in l){const g=l[m];this.setAttribute(m,g.clone(n))}const c=t.morphAttributes;for(const m in c){const g=[],_=c[m];for(let v=0,M=_.length;v<M;v++)g.push(_[v].clone(n));this.morphAttributes[m]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let m=0,g=f.length;m<g;m++){const _=f[m];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Y_=new sn,zs=new mp,Oc=new hl,j_=new $,Pc=new $,zc=new $,Bc=new $,sd=new $,Ic=new $,Z_=new $,Fc=new $;class tn extends qn{constructor(t=new An,n=new Ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(t,n){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;n.fromBufferAttribute(l,t);const h=this.morphTargetInfluences;if(c&&h){Ic.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const g=h[p],_=c[p];g!==0&&(sd.fromBufferAttribute(_,t),f?Ic.addScaledVector(sd,g):Ic.addScaledVector(sd.sub(n),g))}n.add(Ic)}return n}raycast(t,n){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Oc.copy(s.boundingSphere),Oc.applyMatrix4(c),zs.copy(t.ray).recast(t.near),!(Oc.containsPoint(zs.origin)===!1&&(zs.intersectSphere(Oc,j_)===null||zs.origin.distanceToSquared(j_)>(t.far-t.near)**2))&&(Y_.copy(c).invert(),zs.copy(t.ray).applyMatrix4(Y_),!(s.boundingBox!==null&&zs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,n,zs)))}_computeIntersections(t,n,s){let l;const c=this.geometry,f=this.material,h=c.index,p=c.attributes.position,m=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,v=c.groups,M=c.drawRange;if(h!==null)if(Array.isArray(f))for(let E=0,T=v.length;E<T;E++){const S=v[E],x=f[S.materialIndex],U=Math.max(S.start,M.start),C=Math.min(h.count,Math.min(S.start+S.count,M.start+M.count));for(let A=U,V=C;A<V;A+=3){const B=h.getX(A),O=h.getX(A+1),H=h.getX(A+2);l=Hc(this,x,t,s,m,g,_,B,O,H),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(h.count,M.start+M.count);for(let S=E,x=T;S<x;S+=3){const U=h.getX(S),C=h.getX(S+1),A=h.getX(S+2);l=Hc(this,f,t,s,m,g,_,U,C,A),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let E=0,T=v.length;E<T;E++){const S=v[E],x=f[S.materialIndex],U=Math.max(S.start,M.start),C=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let A=U,V=C;A<V;A+=3){const B=A,O=A+1,H=A+2;l=Hc(this,x,t,s,m,g,_,B,O,H),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(p.count,M.start+M.count);for(let S=E,x=T;S<x;S+=3){const U=S,C=S+1,A=S+2;l=Hc(this,f,t,s,m,g,_,U,C,A),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}}}function yE(r,t,n,s,l,c,f,h){let p;if(t.side===Hn?p=s.intersectTriangle(f,c,l,!0,h):p=s.intersectTriangle(l,c,f,t.side===ps,h),p===null)return null;Fc.copy(h),Fc.applyMatrix4(r.matrixWorld);const m=n.ray.origin.distanceTo(Fc);return m<n.near||m>n.far?null:{distance:m,point:Fc.clone(),object:r}}function Hc(r,t,n,s,l,c,f,h,p,m){r.getVertexPosition(h,Pc),r.getVertexPosition(p,zc),r.getVertexPosition(m,Bc);const g=yE(r,t,n,s,Pc,zc,Bc,Z_);if(g){const _=new $;Ii.getBarycoord(Z_,Pc,zc,Bc,_),l&&(g.uv=Ii.getInterpolatedAttribute(l,h,p,m,_,new Re)),c&&(g.uv1=Ii.getInterpolatedAttribute(c,h,p,m,_,new Re)),f&&(g.normal=Ii.getInterpolatedAttribute(f,h,p,m,_,new $),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const v={a:h,b:p,c:m,normal:new $,materialIndex:0};Ii.getNormal(Pc,zc,Bc,v.normal),g.face=v,g.barycoord=_}return g}class Ie extends An{constructor(t=1,n=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],g=[],_=[];let v=0,M=0;E("z","y","x",-1,-1,s,n,t,f,c,0),E("z","y","x",1,-1,s,n,-t,f,c,1),E("x","z","y",1,1,t,s,n,l,f,2),E("x","z","y",1,-1,t,s,-n,l,f,3),E("x","y","z",1,-1,t,n,s,l,c,4),E("x","y","z",-1,-1,t,n,-s,l,c,5),this.setIndex(p),this.setAttribute("position",new rn(m,3)),this.setAttribute("normal",new rn(g,3)),this.setAttribute("uv",new rn(_,2));function E(T,S,x,U,C,A,V,B,O,H,L){const w=A/O,F=V/H,Q=A/2,J=V/2,ct=B/2,ut=O+1,P=H+1;let j=0,Z=0;const St=new $;for(let Tt=0;Tt<P;Tt++){const z=Tt*F-J;for(let st=0;st<ut;st++){const yt=st*w-Q;St[T]=yt*U,St[S]=z*C,St[x]=ct,m.push(St.x,St.y,St.z),St[T]=0,St[S]=0,St[x]=B>0?1:-1,g.push(St.x,St.y,St.z),_.push(st/O),_.push(1-Tt/H),j+=1}}for(let Tt=0;Tt<H;Tt++)for(let z=0;z<O;z++){const st=v+z+ut*Tt,yt=v+z+ut*(Tt+1),K=v+(z+1)+ut*(Tt+1),ht=v+(z+1)+ut*Tt;p.push(st,yt,ht),p.push(yt,K,ht),Z+=6}h.addGroup(M,Z,L),M+=Z,v+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ie(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Jr(r){const t={};for(const n in r){t[n]={};for(const s in r[n]){const l=r[n][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][s]=null):t[n][s]=l.clone():Array.isArray(l)?t[n][s]=l.slice():t[n][s]=l}}return t}function Vn(r){const t={};for(let n=0;n<r.length;n++){const s=Jr(r[n]);for(const l in s)t[l]=s[l]}return t}function SE(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function hx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ae.workingColorSpace}const gp={clone:Jr,merge:Vn};var ME=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,EE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gi extends no{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ME,this.fragmentShader=EE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Jr(t.uniforms),this.uniformsGroups=SE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class dx extends qn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new sn,this.projectionMatrix=new sn,this.projectionMatrixInverse=new sn,this.coordinateSystem=ba}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const os=new $,K_=new Re,Q_=new Re;class Ri extends dx{constructor(t=50,n=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=np*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Fh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return np*2*Math.atan(Math.tan(Fh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,s){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(os.x,os.y).multiplyScalar(-t/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(os.x,os.y).multiplyScalar(-t/os.z)}getViewSize(t,n){return this.getViewBounds(t,K_,Q_),n.subVectors(Q_,K_)}setViewOffset(t,n,s,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Fh*.5*this.fov)/this.zoom,s=2*n,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*l/p,n-=f.offsetY*s/m,l*=f.width/p,s*=f.height/m}const h=this.filmOffset;h!==0&&(c+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ir=-90,Fr=1;class TE extends qn{constructor(t,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ri(Ir,Fr,t,n);l.layers=this.layers,this.add(l);const c=new Ri(Ir,Fr,t,n);c.layers=this.layers,this.add(c);const f=new Ri(Ir,Fr,t,n);f.layers=this.layers,this.add(f);const h=new Ri(Ir,Fr,t,n);h.layers=this.layers,this.add(h);const p=new Ri(Ir,Fr,t,n);p.layers=this.layers,this.add(p);const m=new Ri(Ir,Fr,t,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[s,l,c,f,h,p]=n;for(const m of n)this.remove(m);if(t===ba)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===lu)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of n)this.add(m),m.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,p,m,g]=this.children,_=t.getRenderTarget(),v=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const T=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(n,c),t.setRenderTarget(s,1,l),t.render(n,f),t.setRenderTarget(s,2,l),t.render(n,h),t.setRenderTarget(s,3,l),t.render(n,p),t.setRenderTarget(s,4,l),t.render(n,m),s.texture.generateMipmaps=T,t.setRenderTarget(s,5,l),t.render(n,g),t.setRenderTarget(_,v,M),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class px extends Xn{constructor(t,n,s,l,c,f,h,p,m,g){t=t!==void 0?t:[],n=n!==void 0?n:jr,super(t,n,s,l,c,f,h,p,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bE extends ms{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new px(l,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ki}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Ie(5,5,5),c=new Gi({name:"CubemapFromEquirect",uniforms:Jr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Hn,blending:Aa});c.uniforms.tEquirect.value=n;const f=new tn(l,c),h=n.minFilter;return n.minFilter===qs&&(n.minFilter=Ki),new TE(1,10,this).update(t,f),n.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(t,n,s,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,s,l);t.setRenderTarget(c)}}const rd=new $,AE=new $,RE=new ue;class Hs{constructor(t=new $(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,s,l){return this.normal.set(t,n,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,s){const l=rd.subVectors(s,n).cross(AE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const s=t.delta(rd),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return n<0&&s>0||s<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const s=n||RE.getNormalMatrix(t),l=this.coplanarPoint(rd).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bs=new hl,Gc=new $;class mx{constructor(t=new Hs,n=new Hs,s=new Hs,l=new Hs,c=new Hs,f=new Hs){this.planes=[t,n,s,l,c,f]}set(t,n,s,l,c,f){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(t){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,n=ba){const s=this.planes,l=t.elements,c=l[0],f=l[1],h=l[2],p=l[3],m=l[4],g=l[5],_=l[6],v=l[7],M=l[8],E=l[9],T=l[10],S=l[11],x=l[12],U=l[13],C=l[14],A=l[15];if(s[0].setComponents(p-c,v-m,S-M,A-x).normalize(),s[1].setComponents(p+c,v+m,S+M,A+x).normalize(),s[2].setComponents(p+f,v+g,S+E,A+U).normalize(),s[3].setComponents(p-f,v-g,S-E,A-U).normalize(),s[4].setComponents(p-h,v-_,S-T,A-C).normalize(),n===ba)s[5].setComponents(p+h,v+_,S+T,A+C).normalize();else if(n===lu)s[5].setComponents(h,_,T,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bs)}intersectsSprite(t){return Bs.center.set(0,0,0),Bs.radius=.7071067811865476,Bs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bs)}intersectsSphere(t){const n=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let s=0;s<6;s++){const l=n[s];if(Gc.x=l.normal.x>0?t.max.x:t.min.x,Gc.y=l.normal.y>0?t.max.y:t.min.y,Gc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gx(){let r=null,t=!1,n=null,s=null;function l(c,f){n(c,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function wE(r){const t=new WeakMap;function n(h,p){const m=h.array,g=h.usage,_=m.byteLength,v=r.createBuffer();r.bindBuffer(p,v),r.bufferData(p,m,g),h.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:v,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:_}}function s(h,p,m){const g=p.array,_=p.updateRanges;if(r.bindBuffer(m,h),_.length===0)r.bufferSubData(m,0,g);else{_.sort((M,E)=>M.start-E.start);let v=0;for(let M=1;M<_.length;M++){const E=_[v],T=_[M];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++v,_[v]=T)}_.length=v+1;for(let M=0,E=_.length;M<E;M++){const T=_[M];r.bufferSubData(m,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=t.get(h);p&&(r.deleteBuffer(p.buffer),t.delete(h))}function f(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=t.get(h);(!g||g.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=t.get(h);if(m===void 0)t.set(h,n(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,p),m.version=h.version}}return{get:l,remove:c,update:f}}class gu extends An{constructor(t=1,n=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:s,heightSegments:l};const c=t/2,f=n/2,h=Math.floor(s),p=Math.floor(l),m=h+1,g=p+1,_=t/h,v=n/p,M=[],E=[],T=[],S=[];for(let x=0;x<g;x++){const U=x*v-f;for(let C=0;C<m;C++){const A=C*_-c;E.push(A,-U,0),T.push(0,0,1),S.push(C/h),S.push(1-x/p)}}for(let x=0;x<p;x++)for(let U=0;U<h;U++){const C=U+m*x,A=U+m*(x+1),V=U+1+m*(x+1),B=U+1+m*x;M.push(C,A,B),M.push(A,V,B)}this.setIndex(M),this.setAttribute("position",new rn(E,3)),this.setAttribute("normal",new rn(T,3)),this.setAttribute("uv",new rn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gu(t.width,t.height,t.widthSegments,t.heightSegments)}}var CE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,DE=`#ifdef USE_ALPHAHASH
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
#endif`,UE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,LE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,OE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,PE=`#ifdef USE_AOMAP
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
#endif`,zE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,BE=`#ifdef USE_BATCHING
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
#endif`,IE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,FE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,HE=`vec3 objectNormal = vec3( normal );
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
} // validated`,VE=`#ifdef USE_IRIDESCENCE
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
#endif`,kE=`#ifdef USE_BUMPMAP
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
#endif`,XE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,WE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,YE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ZE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,KE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,QE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,JE=`#define PI 3.141592653589793
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
} // validated`,$E=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,t1=`vec3 transformedNormal = objectNormal;
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
#endif`,e1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,n1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,i1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,a1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,s1="gl_FragColor = linearToOutputTexel( gl_FragColor );",r1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,o1=`#ifdef USE_ENVMAP
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
#endif`,l1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,c1=`#ifdef USE_ENVMAP
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
#endif`,u1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,f1=`#ifdef USE_ENVMAP
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
#endif`,h1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,d1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,p1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,m1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g1=`#ifdef USE_GRADIENTMAP
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
}`,_1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,v1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,x1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,y1=`uniform bool receiveShadow;
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
#endif`,S1=`#ifdef USE_ENVMAP
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
#endif`,M1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,E1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,T1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,b1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,A1=`PhysicalMaterial material;
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
#endif`,R1=`struct PhysicalMaterial {
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
}`,w1=`
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
#endif`,C1=`#if defined( RE_IndirectDiffuse )
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
#endif`,D1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,P1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,I1=`#if defined( USE_POINTS_UV )
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
#endif`,F1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,H1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,V1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,k1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X1=`#ifdef USE_MORPHTARGETS
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
#endif`,q1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Y1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Z1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Q1=`#ifdef USE_NORMALMAP
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
#endif`,J1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,aT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,oT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dT=`float getShadowMask() {
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
}`,pT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mT=`#ifdef USE_SKINNING
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
#endif`,gT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_T=`#ifdef USE_SKINNING
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
#endif`,vT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ST=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,MT=`#ifdef USE_TRANSMISSION
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
#endif`,ET=`#ifdef USE_TRANSMISSION
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
#endif`,TT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,AT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,CT=`uniform sampler2D t2D;
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
}`,DT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,LT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,NT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OT=`#include <common>
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
}`,PT=`#if DEPTH_PACKING == 3200
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
}`,zT=`#define DISTANCE
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
}`,BT=`#define DISTANCE
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
}`,IT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HT=`uniform float scale;
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
}`,VT=`#include <common>
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
}`,kT=`uniform vec3 diffuse;
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
}`,XT=`#define LAMBERT
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
}`,qT=`#define LAMBERT
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
}`,WT=`#define MATCAP
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
}`,YT=`#define MATCAP
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
}`,ZT=`#define NORMAL
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
}`,KT=`#define PHONG
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
}`,QT=`#define PHONG
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
}`,JT=`#define STANDARD
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
}`,$T=`#define STANDARD
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
}`,tb=`#define TOON
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
}`,eb=`#define TOON
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
}`,nb=`uniform float size;
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
}`,ib=`uniform vec3 diffuse;
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
}`,ab=`#include <common>
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
}`,sb=`uniform vec3 color;
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
}`,rb=`uniform float rotation;
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
}`,ob=`uniform vec3 diffuse;
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
}`,fe={alphahash_fragment:CE,alphahash_pars_fragment:DE,alphamap_fragment:UE,alphamap_pars_fragment:LE,alphatest_fragment:NE,alphatest_pars_fragment:OE,aomap_fragment:PE,aomap_pars_fragment:zE,batching_pars_vertex:BE,batching_vertex:IE,begin_vertex:FE,beginnormal_vertex:HE,bsdfs:GE,iridescence_fragment:VE,bumpmap_pars_fragment:kE,clipping_planes_fragment:XE,clipping_planes_pars_fragment:qE,clipping_planes_pars_vertex:WE,clipping_planes_vertex:YE,color_fragment:jE,color_pars_fragment:ZE,color_pars_vertex:KE,color_vertex:QE,common:JE,cube_uv_reflection_fragment:$E,defaultnormal_vertex:t1,displacementmap_pars_vertex:e1,displacementmap_vertex:n1,emissivemap_fragment:i1,emissivemap_pars_fragment:a1,colorspace_fragment:s1,colorspace_pars_fragment:r1,envmap_fragment:o1,envmap_common_pars_fragment:l1,envmap_pars_fragment:c1,envmap_pars_vertex:u1,envmap_physical_pars_fragment:S1,envmap_vertex:f1,fog_vertex:h1,fog_pars_vertex:d1,fog_fragment:p1,fog_pars_fragment:m1,gradientmap_pars_fragment:g1,lightmap_pars_fragment:_1,lights_lambert_fragment:v1,lights_lambert_pars_fragment:x1,lights_pars_begin:y1,lights_toon_fragment:M1,lights_toon_pars_fragment:E1,lights_phong_fragment:T1,lights_phong_pars_fragment:b1,lights_physical_fragment:A1,lights_physical_pars_fragment:R1,lights_fragment_begin:w1,lights_fragment_maps:C1,lights_fragment_end:D1,logdepthbuf_fragment:U1,logdepthbuf_pars_fragment:L1,logdepthbuf_pars_vertex:N1,logdepthbuf_vertex:O1,map_fragment:P1,map_pars_fragment:z1,map_particle_fragment:B1,map_particle_pars_fragment:I1,metalnessmap_fragment:F1,metalnessmap_pars_fragment:H1,morphinstance_vertex:G1,morphcolor_vertex:V1,morphnormal_vertex:k1,morphtarget_pars_vertex:X1,morphtarget_vertex:q1,normal_fragment_begin:W1,normal_fragment_maps:Y1,normal_pars_fragment:j1,normal_pars_vertex:Z1,normal_vertex:K1,normalmap_pars_fragment:Q1,clearcoat_normal_fragment_begin:J1,clearcoat_normal_fragment_maps:$1,clearcoat_pars_fragment:tT,iridescence_pars_fragment:eT,opaque_fragment:nT,packing:iT,premultiplied_alpha_fragment:aT,project_vertex:sT,dithering_fragment:rT,dithering_pars_fragment:oT,roughnessmap_fragment:lT,roughnessmap_pars_fragment:cT,shadowmap_pars_fragment:uT,shadowmap_pars_vertex:fT,shadowmap_vertex:hT,shadowmask_pars_fragment:dT,skinbase_vertex:pT,skinning_pars_vertex:mT,skinning_vertex:gT,skinnormal_vertex:_T,specularmap_fragment:vT,specularmap_pars_fragment:xT,tonemapping_fragment:yT,tonemapping_pars_fragment:ST,transmission_fragment:MT,transmission_pars_fragment:ET,uv_pars_fragment:TT,uv_pars_vertex:bT,uv_vertex:AT,worldpos_vertex:RT,background_vert:wT,background_frag:CT,backgroundCube_vert:DT,backgroundCube_frag:UT,cube_vert:LT,cube_frag:NT,depth_vert:OT,depth_frag:PT,distanceRGBA_vert:zT,distanceRGBA_frag:BT,equirect_vert:IT,equirect_frag:FT,linedashed_vert:HT,linedashed_frag:GT,meshbasic_vert:VT,meshbasic_frag:kT,meshlambert_vert:XT,meshlambert_frag:qT,meshmatcap_vert:WT,meshmatcap_frag:YT,meshnormal_vert:jT,meshnormal_frag:ZT,meshphong_vert:KT,meshphong_frag:QT,meshphysical_vert:JT,meshphysical_frag:$T,meshtoon_vert:tb,meshtoon_frag:eb,points_vert:nb,points_frag:ib,shadow_vert:ab,shadow_frag:sb,sprite_vert:rb,sprite_frag:ob},Ot={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ue}},envmap:{envMap:{value:null},envMapRotation:{value:new ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ue},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0},uvTransform:{value:new ue}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}}},ji={basic:{uniforms:Vn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:Vn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:Vn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:Vn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:Vn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new ee(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:Vn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:Vn([Ot.points,Ot.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:Vn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:Vn([Ot.common,Ot.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:Vn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:Vn([Ot.sprite,Ot.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ue}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distanceRGBA:{uniforms:Vn([Ot.common,Ot.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distanceRGBA_vert,fragmentShader:fe.distanceRGBA_frag},shadow:{uniforms:Vn([Ot.lights,Ot.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};ji.physical={uniforms:Vn([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ue},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ue},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ue},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ue},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ue},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ue}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};const Vc={r:0,b:0,g:0},Is=new Ca,lb=new sn;function cb(r,t,n,s,l,c,f){const h=new ee(0);let p=c===!0?0:1,m,g,_=null,v=0,M=null;function E(U){let C=U.isScene===!0?U.background:null;return C&&C.isTexture&&(C=(U.backgroundBlurriness>0?n:t).get(C)),C}function T(U){let C=!1;const A=E(U);A===null?x(h,p):A&&A.isColor&&(x(A,1),C=!0);const V=r.xr.getEnvironmentBlendMode();V==="additive"?s.buffers.color.setClear(0,0,0,1,f):V==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||C)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(U,C){const A=E(C);A&&(A.isCubeTexture||A.mapping===pu)?(g===void 0&&(g=new tn(new Ie(1,1,1),new Gi({name:"BackgroundCubeMaterial",uniforms:Jr(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(V,B,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Is.copy(C.backgroundRotation),Is.x*=-1,Is.y*=-1,Is.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Is.y*=-1,Is.z*=-1),g.material.uniforms.envMap.value=A,g.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(lb.makeRotationFromEuler(Is)),g.material.toneMapped=Ae.getTransfer(A.colorSpace)!==Fe,(_!==A||v!==A.version||M!==r.toneMapping)&&(g.material.needsUpdate=!0,_=A,v=A.version,M=r.toneMapping),g.layers.enableAll(),U.unshift(g,g.geometry,g.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new tn(new gu(2,2),new Gi({name:"BackgroundMaterial",uniforms:Jr(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:ps,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,m.material.toneMapped=Ae.getTransfer(A.colorSpace)!==Fe,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(_!==A||v!==A.version||M!==r.toneMapping)&&(m.material.needsUpdate=!0,_=A,v=A.version,M=r.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null))}function x(U,C){U.getRGB(Vc,hx(r)),s.buffers.color.setClear(Vc.r,Vc.g,Vc.b,C,f)}return{getClearColor:function(){return h},setClearColor:function(U,C=1){h.set(U),p=C,x(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(U){p=U,x(h,p)},render:T,addToRenderList:S}}function ub(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=v(null);let c=l,f=!1;function h(w,F,Q,J,ct){let ut=!1;const P=_(J,Q,F);c!==P&&(c=P,m(c.object)),ut=M(w,J,Q,ct),ut&&E(w,J,Q,ct),ct!==null&&t.update(ct,r.ELEMENT_ARRAY_BUFFER),(ut||f)&&(f=!1,A(w,F,Q,J),ct!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ct).buffer))}function p(){return r.createVertexArray()}function m(w){return r.bindVertexArray(w)}function g(w){return r.deleteVertexArray(w)}function _(w,F,Q){const J=Q.wireframe===!0;let ct=s[w.id];ct===void 0&&(ct={},s[w.id]=ct);let ut=ct[F.id];ut===void 0&&(ut={},ct[F.id]=ut);let P=ut[J];return P===void 0&&(P=v(p()),ut[J]=P),P}function v(w){const F=[],Q=[],J=[];for(let ct=0;ct<n;ct++)F[ct]=0,Q[ct]=0,J[ct]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Q,attributeDivisors:J,object:w,attributes:{},index:null}}function M(w,F,Q,J){const ct=c.attributes,ut=F.attributes;let P=0;const j=Q.getAttributes();for(const Z in j)if(j[Z].location>=0){const Tt=ct[Z];let z=ut[Z];if(z===void 0&&(Z==="instanceMatrix"&&w.instanceMatrix&&(z=w.instanceMatrix),Z==="instanceColor"&&w.instanceColor&&(z=w.instanceColor)),Tt===void 0||Tt.attribute!==z||z&&Tt.data!==z.data)return!0;P++}return c.attributesNum!==P||c.index!==J}function E(w,F,Q,J){const ct={},ut=F.attributes;let P=0;const j=Q.getAttributes();for(const Z in j)if(j[Z].location>=0){let Tt=ut[Z];Tt===void 0&&(Z==="instanceMatrix"&&w.instanceMatrix&&(Tt=w.instanceMatrix),Z==="instanceColor"&&w.instanceColor&&(Tt=w.instanceColor));const z={};z.attribute=Tt,Tt&&Tt.data&&(z.data=Tt.data),ct[Z]=z,P++}c.attributes=ct,c.attributesNum=P,c.index=J}function T(){const w=c.newAttributes;for(let F=0,Q=w.length;F<Q;F++)w[F]=0}function S(w){x(w,0)}function x(w,F){const Q=c.newAttributes,J=c.enabledAttributes,ct=c.attributeDivisors;Q[w]=1,J[w]===0&&(r.enableVertexAttribArray(w),J[w]=1),ct[w]!==F&&(r.vertexAttribDivisor(w,F),ct[w]=F)}function U(){const w=c.newAttributes,F=c.enabledAttributes;for(let Q=0,J=F.length;Q<J;Q++)F[Q]!==w[Q]&&(r.disableVertexAttribArray(Q),F[Q]=0)}function C(w,F,Q,J,ct,ut,P){P===!0?r.vertexAttribIPointer(w,F,Q,ct,ut):r.vertexAttribPointer(w,F,Q,J,ct,ut)}function A(w,F,Q,J){T();const ct=J.attributes,ut=Q.getAttributes(),P=F.defaultAttributeValues;for(const j in ut){const Z=ut[j];if(Z.location>=0){let St=ct[j];if(St===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(St=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(St=w.instanceColor)),St!==void 0){const Tt=St.normalized,z=St.itemSize,st=t.get(St);if(st===void 0)continue;const yt=st.buffer,K=st.type,ht=st.bytesPerElement,Et=K===r.INT||K===r.UNSIGNED_INT||St.gpuType===cp;if(St.isInterleavedBufferAttribute){const xt=St.data,Vt=xt.stride,Gt=St.offset;if(xt.isInstancedInterleavedBuffer){for(let se=0;se<Z.locationSize;se++)x(Z.location+se,xt.meshPerAttribute);w.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let se=0;se<Z.locationSize;se++)S(Z.location+se);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let se=0;se<Z.locationSize;se++)C(Z.location+se,z/Z.locationSize,K,Tt,Vt*ht,(Gt+z/Z.locationSize*se)*ht,Et)}else{if(St.isInstancedBufferAttribute){for(let xt=0;xt<Z.locationSize;xt++)x(Z.location+xt,St.meshPerAttribute);w.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let xt=0;xt<Z.locationSize;xt++)S(Z.location+xt);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let xt=0;xt<Z.locationSize;xt++)C(Z.location+xt,z/Z.locationSize,K,Tt,z*ht,z/Z.locationSize*xt*ht,Et)}}else if(P!==void 0){const Tt=P[j];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(Z.location,Tt);break;case 3:r.vertexAttrib3fv(Z.location,Tt);break;case 4:r.vertexAttrib4fv(Z.location,Tt);break;default:r.vertexAttrib1fv(Z.location,Tt)}}}}U()}function V(){H();for(const w in s){const F=s[w];for(const Q in F){const J=F[Q];for(const ct in J)g(J[ct].object),delete J[ct];delete F[Q]}delete s[w]}}function B(w){if(s[w.id]===void 0)return;const F=s[w.id];for(const Q in F){const J=F[Q];for(const ct in J)g(J[ct].object),delete J[ct];delete F[Q]}delete s[w.id]}function O(w){for(const F in s){const Q=s[F];if(Q[w.id]===void 0)continue;const J=Q[w.id];for(const ct in J)g(J[ct].object),delete J[ct];delete Q[w.id]}}function H(){L(),f=!0,c!==l&&(c=l,m(c.object))}function L(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:H,resetDefaultState:L,dispose:V,releaseStatesOfGeometry:B,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:S,disableUnusedAttributes:U}}function fb(r,t,n){let s;function l(m){s=m}function c(m,g){r.drawArrays(s,m,g),n.update(g,s,1)}function f(m,g,_){_!==0&&(r.drawArraysInstanced(s,m,g,_),n.update(g,s,_))}function h(m,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,g,0,_);let M=0;for(let E=0;E<_;E++)M+=g[E];n.update(M,s,1)}function p(m,g,_,v){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<m.length;E++)f(m[E],g[E],v[E]);else{M.multiDrawArraysInstancedWEBGL(s,m,0,g,0,v,0,_);let E=0;for(let T=0;T<_;T++)E+=g[T]*v[T];n.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function hb(r,t,n,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const O=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==Fi&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(O){const H=O===$r&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(O!==wa&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==Ta&&!H)}function p(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const g=p(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const _=n.logarithmicDepthBuffer===!0,v=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),U=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),C=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),V=E>0,B=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:v,maxTextures:M,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:S,maxAttributes:x,maxVertexUniforms:U,maxVaryings:C,maxFragmentUniforms:A,vertexTextures:V,maxSamples:B}}function db(r){const t=this;let n=null,s=0,l=!1,c=!1;const f=new Hs,h=new ue,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const M=_.length!==0||v||s!==0||l;return l=v,s=_.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){n=g(_,v,0)},this.setState=function(_,v,M){const E=_.clippingPlanes,T=_.clipIntersection,S=_.clipShadows,x=r.get(_);if(!l||E===null||E.length===0||c&&!S)c?g(null):m();else{const U=c?0:s,C=U*4;let A=x.clippingState||null;p.value=A,A=g(E,v,C,M);for(let V=0;V!==C;++V)A[V]=n[V];x.clippingState=A,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=U}};function m(){p.value!==n&&(p.value=n,p.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(_,v,M,E){const T=_!==null?_.length:0;let S=null;if(T!==0){if(S=p.value,E!==!0||S===null){const x=M+T*4,U=v.matrixWorldInverse;h.getNormalMatrix(U),(S===null||S.length<x)&&(S=new Float32Array(x));for(let C=0,A=M;C!==T;++C,A+=4)f.copy(_[C]).applyMatrix4(U,h),f.normal.toArray(S,A),S[A+3]=f.constant}p.value=S,p.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function pb(r){let t=new WeakMap;function n(f,h){return h===Rd?f.mapping=jr:h===wd&&(f.mapping=Zr),f}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===Rd||h===wd)if(t.has(f)){const p=t.get(f).texture;return n(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new bE(p.height);return m.fromEquirectangularTexture(r,f),t.set(f,m),f.addEventListener("dispose",l),n(m.texture,f.mapping)}else return null}}return f}function l(f){const h=f.target;h.removeEventListener("dispose",l);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}class _x extends dx{constructor(t=-1,n=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,h=l+n,p=l-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,h-=g*this.view.offsetY,p=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const kr=4,J_=[.125,.215,.35,.446,.526,.582],Xs=20,od=new _x,$_=new ee;let ld=null,cd=0,ud=0,fd=!1;const Gs=(1+Math.sqrt(5))/2,Hr=1/Gs,tv=[new $(-Gs,Hr,0),new $(Gs,Hr,0),new $(-Hr,0,Gs),new $(Hr,0,Gs),new $(0,Gs,-Hr),new $(0,Gs,Hr),new $(-1,1,-1),new $(1,1,-1),new $(-1,1,1),new $(1,1,1)];class ev{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,s=.1,l=100){ld=this._renderer.getRenderTarget(),cd=this._renderer.getActiveCubeFace(),ud=this._renderer.getActiveMipmapLevel(),fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=av(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=iv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ld,cd,ud),this._renderer.xr.enabled=fd,t.scissorTest=!1,kc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===jr||t.mapping===Zr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ld=this._renderer.getRenderTarget(),cd=this._renderer.getActiveCubeFace(),ud=this._renderer.getActiveMipmapLevel(),fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=n||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:Ki,minFilter:Ki,generateMipmaps:!1,type:$r,format:Fi,colorSpace:to,depthBuffer:!1},l=nv(t,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nv(t,n,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mb(c)),this._blurMaterial=gb(c,t,n)}return l}_compileMaterial(t){const n=new tn(this._lodPlanes[0],t);this._renderer.compile(n,od)}_sceneToCubeUV(t,n,s,l){const h=new Ri(90,1,n,s),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,v=g.toneMapping;g.getClearColor($_),g.toneMapping=ds,g.autoClear=!1;const M=new Ai({name:"PMREM.Background",side:Hn,depthWrite:!1,depthTest:!1}),E=new tn(new Ie,M);let T=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,T=!0):(M.color.copy($_),T=!0);for(let x=0;x<6;x++){const U=x%3;U===0?(h.up.set(0,p[x],0),h.lookAt(m[x],0,0)):U===1?(h.up.set(0,0,p[x]),h.lookAt(0,m[x],0)):(h.up.set(0,p[x],0),h.lookAt(0,0,m[x]));const C=this._cubeSize;kc(l,U*C,x>2?C:0,C,C),g.setRenderTarget(l),T&&g.render(E,h),g.render(t,h)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=v,g.autoClear=_,t.background=S}_textureToCubeUV(t,n){const s=this._renderer,l=t.mapping===jr||t.mapping===Zr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=av()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=iv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new tn(this._lodPlanes[0],c),h=c.uniforms;h.envMap.value=t;const p=this._cubeSize;kc(n,0,0,3*p,2*p),s.setRenderTarget(n),s.render(f,od)}_applyPMREM(t){const n=this._renderer,s=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),h=tv[(l-c-1)%tv.length];this._blur(t,c-1,c,f,h)}n.autoClear=s}_blur(t,n,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,s,l,"latitudinal",c),this._halfBlur(f,t,s,s,l,"longitudinal",c)}_halfBlur(t,n,s,l,c,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new tn(this._lodPlanes[l],m),v=m.uniforms,M=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Xs-1),T=c/E,S=isFinite(c)?1+Math.floor(g*T):Xs;S>Xs&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Xs}`);const x=[];let U=0;for(let O=0;O<Xs;++O){const H=O/T,L=Math.exp(-H*H/2);x.push(L),O===0?U+=L:O<S&&(U+=2*L)}for(let O=0;O<x.length;O++)x[O]=x[O]/U;v.envMap.value=t.texture,v.samples.value=S,v.weights.value=x,v.latitudinal.value=f==="latitudinal",h&&(v.poleAxis.value=h);const{_lodMax:C}=this;v.dTheta.value=E,v.mipInt.value=C-s;const A=this._sizeLods[l],V=3*A*(l>C-kr?l-C+kr:0),B=4*(this._cubeSize-A);kc(n,V,B,3*A,2*A),p.setRenderTarget(n),p.render(_,od)}}function mb(r){const t=[],n=[],s=[];let l=r;const c=r-kr+1+J_.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);n.push(h);let p=1/h;f>r-kr?p=J_[f-r+kr-1]:f===0&&(p=0),s.push(p);const m=1/(h-2),g=-m,_=1+m,v=[g,g,_,g,_,_,g,g,_,_,g,_],M=6,E=6,T=3,S=2,x=1,U=new Float32Array(T*E*M),C=new Float32Array(S*E*M),A=new Float32Array(x*E*M);for(let B=0;B<M;B++){const O=B%3*2/3-1,H=B>2?0:-1,L=[O,H,0,O+2/3,H,0,O+2/3,H+1,0,O,H,0,O+2/3,H+1,0,O,H+1,0];U.set(L,T*E*B),C.set(v,S*E*B);const w=[B,B,B,B,B,B];A.set(w,x*E*B)}const V=new An;V.setAttribute("position",new kn(U,T)),V.setAttribute("uv",new kn(C,S)),V.setAttribute("faceIndex",new kn(A,x)),t.push(V),l>kr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:s}}function nv(r,t,n){const s=new ms(r,t,n);return s.texture.mapping=pu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function kc(r,t,n,s,l){r.viewport.set(t,n,s,l),r.scissor.set(t,n,s,l)}function gb(r,t,n){const s=new Float32Array(Xs),l=new $(0,1,0);return new Gi({name:"SphericalGaussianBlur",defines:{n:Xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:_p(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function iv(){return new Gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_p(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function av(){return new Gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_p(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function _p(){return`

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
	`}function _b(r){let t=new WeakMap,n=null;function s(h){if(h&&h.isTexture){const p=h.mapping,m=p===Rd||p===wd,g=p===jr||p===Zr;if(m||g){let _=t.get(h);const v=_!==void 0?_.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==v)return n===null&&(n=new ev(r)),_=m?n.fromEquirectangular(h,_):n.fromCubemap(h,_),_.texture.pmremVersion=h.pmremVersion,t.set(h,_),_.texture;if(_!==void 0)return _.texture;{const M=h.image;return m&&M&&M.height>0||g&&M&&l(M)?(n===null&&(n=new ev(r)),_=m?n.fromEquirectangular(h):n.fromCubemap(h),_.texture.pmremVersion=h.pmremVersion,t.set(h,_),h.addEventListener("dispose",c),_.texture):null}}}return h}function l(h){let p=0;const m=6;for(let g=0;g<m;g++)h[g]!==void 0&&p++;return p===m}function c(h){const p=h.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function vb(r){const t={};function n(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return n(s)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(s){const l=n(s);return l===null&&rl("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function xb(r,t,n,s){const l={},c=new WeakMap;function f(_){const v=_.target;v.index!==null&&t.remove(v.index);for(const E in v.attributes)t.remove(v.attributes[E]);for(const E in v.morphAttributes){const T=v.morphAttributes[E];for(let S=0,x=T.length;S<x;S++)t.remove(T[S])}v.removeEventListener("dispose",f),delete l[v.id];const M=c.get(v);M&&(t.remove(M),c.delete(v)),s.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function h(_,v){return l[v.id]===!0||(v.addEventListener("dispose",f),l[v.id]=!0,n.memory.geometries++),v}function p(_){const v=_.attributes;for(const E in v)t.update(v[E],r.ARRAY_BUFFER);const M=_.morphAttributes;for(const E in M){const T=M[E];for(let S=0,x=T.length;S<x;S++)t.update(T[S],r.ARRAY_BUFFER)}}function m(_){const v=[],M=_.index,E=_.attributes.position;let T=0;if(M!==null){const U=M.array;T=M.version;for(let C=0,A=U.length;C<A;C+=3){const V=U[C+0],B=U[C+1],O=U[C+2];v.push(V,B,B,O,O,V)}}else if(E!==void 0){const U=E.array;T=E.version;for(let C=0,A=U.length/3-1;C<A;C+=3){const V=C+0,B=C+1,O=C+2;v.push(V,B,B,O,O,V)}}else return;const S=new(sx(v)?fx:ux)(v,1);S.version=T;const x=c.get(_);x&&t.remove(x),c.set(_,S)}function g(_){const v=c.get(_);if(v){const M=_.index;M!==null&&v.version<M.version&&m(_)}else m(_);return c.get(_)}return{get:h,update:p,getWireframeAttribute:g}}function yb(r,t,n){let s;function l(v){s=v}let c,f;function h(v){c=v.type,f=v.bytesPerElement}function p(v,M){r.drawElements(s,M,c,v*f),n.update(M,s,1)}function m(v,M,E){E!==0&&(r.drawElementsInstanced(s,M,c,v*f,E),n.update(M,s,E))}function g(v,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,v,0,E);let S=0;for(let x=0;x<E;x++)S+=M[x];n.update(S,s,1)}function _(v,M,E,T){if(E===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let x=0;x<v.length;x++)m(v[x]/f,M[x],T[x]);else{S.multiDrawElementsInstancedWEBGL(s,M,0,c,v,0,T,0,E);let x=0;for(let U=0;U<E;U++)x+=M[U]*T[U];n.update(x,s,1)}}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function Sb(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=h*(c/3);break;case r.LINES:n.lines+=h*(c/2);break;case r.LINE_STRIP:n.lines+=h*(c-1);break;case r.LINE_LOOP:n.lines+=h*c;break;case r.POINTS:n.points+=h*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:s}}function Mb(r,t,n){const s=new WeakMap,l=new cn;function c(f,h,p){const m=f.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let v=s.get(h);if(v===void 0||v.count!==_){let w=function(){H.dispose(),s.delete(h),h.removeEventListener("dispose",w)};var M=w;v!==void 0&&v.texture.dispose();const E=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,x=h.morphAttributes.position||[],U=h.morphAttributes.normal||[],C=h.morphAttributes.color||[];let A=0;E===!0&&(A=1),T===!0&&(A=2),S===!0&&(A=3);let V=h.attributes.position.count*A,B=1;V>t.maxTextureSize&&(B=Math.ceil(V/t.maxTextureSize),V=t.maxTextureSize);const O=new Float32Array(V*B*4*_),H=new ox(O,V,B,_);H.type=Ta,H.needsUpdate=!0;const L=A*4;for(let F=0;F<_;F++){const Q=x[F],J=U[F],ct=C[F],ut=V*B*4*F;for(let P=0;P<Q.count;P++){const j=P*L;E===!0&&(l.fromBufferAttribute(Q,P),O[ut+j+0]=l.x,O[ut+j+1]=l.y,O[ut+j+2]=l.z,O[ut+j+3]=0),T===!0&&(l.fromBufferAttribute(J,P),O[ut+j+4]=l.x,O[ut+j+5]=l.y,O[ut+j+6]=l.z,O[ut+j+7]=0),S===!0&&(l.fromBufferAttribute(ct,P),O[ut+j+8]=l.x,O[ut+j+9]=l.y,O[ut+j+10]=l.z,O[ut+j+11]=ct.itemSize===4?l.w:1)}}v={count:_,texture:H,size:new Re(V,B)},s.set(h,v),h.addEventListener("dispose",w)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let E=0;for(let S=0;S<m.length;S++)E+=m[S];const T=h.morphTargetsRelative?1:1-E;p.getUniforms().setValue(r,"morphTargetBaseInfluence",T),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",v.texture,n),p.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:c}}function Eb(r,t,n,s){let l=new WeakMap;function c(p){const m=s.render.frame,g=p.geometry,_=t.get(p,g);if(l.get(_)!==m&&(t.update(_),l.set(_,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),l.get(p)!==m&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const v=p.skeleton;l.get(v)!==m&&(v.update(),l.set(v,m))}return _}function f(){l=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:c,dispose:f}}class vx extends Xn{constructor(t,n,s,l,c,f,h,p,m,g=qr){if(g!==qr&&g!==Qr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===qr&&(s=Ws),s===void 0&&g===Qr&&(s=Kr),super(null,l,c,f,h,p,g,s,m),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=h!==void 0?h:Hi,this.minFilter=p!==void 0?p:Hi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const xx=new Xn,sv=new vx(1,1),yx=new ox,Sx=new uE,Mx=new px,rv=[],ov=[],lv=new Float32Array(16),cv=new Float32Array(9),uv=new Float32Array(4);function io(r,t,n){const s=r[0];if(s<=0||s>0)return r;const l=t*n;let c=rv[l];if(c===void 0&&(c=new Float32Array(l),rv[l]=c),t!==0){s.toArray(c,0);for(let f=1,h=0;f!==t;++f)h+=n,r[f].toArray(c,h)}return c}function Sn(r,t){if(r.length!==t.length)return!1;for(let n=0,s=r.length;n<s;n++)if(r[n]!==t[n])return!1;return!0}function Mn(r,t){for(let n=0,s=t.length;n<s;n++)r[n]=t[n]}function _u(r,t){let n=ov[t];n===void 0&&(n=new Int32Array(t),ov[t]=n);for(let s=0;s!==t;++s)n[s]=r.allocateTextureUnit();return n}function Tb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function bb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2fv(this.addr,t),Mn(n,t)}}function Ab(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Sn(n,t))return;r.uniform3fv(this.addr,t),Mn(n,t)}}function Rb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4fv(this.addr,t),Mn(n,t)}}function wb(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(Sn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,s))return;uv.set(s),r.uniformMatrix2fv(this.addr,!1,uv),Mn(n,s)}}function Cb(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(Sn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,s))return;cv.set(s),r.uniformMatrix3fv(this.addr,!1,cv),Mn(n,s)}}function Db(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(Sn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,s))return;lv.set(s),r.uniformMatrix4fv(this.addr,!1,lv),Mn(n,s)}}function Ub(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function Lb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2iv(this.addr,t),Mn(n,t)}}function Nb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3iv(this.addr,t),Mn(n,t)}}function Ob(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4iv(this.addr,t),Mn(n,t)}}function Pb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function zb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2uiv(this.addr,t),Mn(n,t)}}function Bb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3uiv(this.addr,t),Mn(n,t)}}function Ib(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4uiv(this.addr,t),Mn(n,t)}}function Fb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(sv.compareFunction=ax,c=sv):c=xx,n.setTexture2D(t||c,l)}function Hb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture3D(t||Sx,l)}function Gb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTextureCube(t||Mx,l)}function Vb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture2DArray(t||yx,l)}function kb(r){switch(r){case 5126:return Tb;case 35664:return bb;case 35665:return Ab;case 35666:return Rb;case 35674:return wb;case 35675:return Cb;case 35676:return Db;case 5124:case 35670:return Ub;case 35667:case 35671:return Lb;case 35668:case 35672:return Nb;case 35669:case 35673:return Ob;case 5125:return Pb;case 36294:return zb;case 36295:return Bb;case 36296:return Ib;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Hb;case 35680:case 36300:case 36308:case 36293:return Gb;case 36289:case 36303:case 36311:case 36292:return Vb}}function Xb(r,t){r.uniform1fv(this.addr,t)}function qb(r,t){const n=io(t,this.size,2);r.uniform2fv(this.addr,n)}function Wb(r,t){const n=io(t,this.size,3);r.uniform3fv(this.addr,n)}function Yb(r,t){const n=io(t,this.size,4);r.uniform4fv(this.addr,n)}function jb(r,t){const n=io(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function Zb(r,t){const n=io(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function Kb(r,t){const n=io(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function Qb(r,t){r.uniform1iv(this.addr,t)}function Jb(r,t){r.uniform2iv(this.addr,t)}function $b(r,t){r.uniform3iv(this.addr,t)}function tA(r,t){r.uniform4iv(this.addr,t)}function eA(r,t){r.uniform1uiv(this.addr,t)}function nA(r,t){r.uniform2uiv(this.addr,t)}function iA(r,t){r.uniform3uiv(this.addr,t)}function aA(r,t){r.uniform4uiv(this.addr,t)}function sA(r,t,n){const s=this.cache,l=t.length,c=_u(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||xx,c[f])}function rA(r,t,n){const s=this.cache,l=t.length,c=_u(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||Sx,c[f])}function oA(r,t,n){const s=this.cache,l=t.length,c=_u(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||Mx,c[f])}function lA(r,t,n){const s=this.cache,l=t.length,c=_u(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||yx,c[f])}function cA(r){switch(r){case 5126:return Xb;case 35664:return qb;case 35665:return Wb;case 35666:return Yb;case 35674:return jb;case 35675:return Zb;case 35676:return Kb;case 5124:case 35670:return Qb;case 35667:case 35671:return Jb;case 35668:case 35672:return $b;case 35669:case 35673:return tA;case 5125:return eA;case 36294:return nA;case 36295:return iA;case 36296:return aA;case 35678:case 36198:case 36298:case 36306:case 35682:return sA;case 35679:case 36299:case 36307:return rA;case 35680:case 36300:case 36308:case 36293:return oA;case 36289:case 36303:case 36311:case 36292:return lA}}class uA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.setValue=kb(n.type)}}class fA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=cA(n.type)}}class hA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(t,n[h.id],s)}}}const hd=/(\w+)(\])?(\[|\.)?/g;function fv(r,t){r.seq.push(t),r.map[t.id]=t}function dA(r,t,n){const s=r.name,l=s.length;for(hd.lastIndex=0;;){const c=hd.exec(s),f=hd.lastIndex;let h=c[1];const p=c[2]==="]",m=c[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===l){fv(n,m===void 0?new uA(h,r,t):new fA(h,r,t));break}else{let _=n.map[h];_===void 0&&(_=new hA(h),fv(n,_)),n=_}}}class su{constructor(t,n){this.seq=[],this.map={};const s=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);dA(c,f,this)}}setValue(t,n,s,l){const c=this.map[n];c!==void 0&&c.setValue(t,s,l)}setOptional(t,n,s){const l=n[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,n,s,l){for(let c=0,f=n.length;c!==f;++c){const h=n[c],p=s[h.id];p.needsUpdate!==!1&&h.setValue(t,p.value,l)}}static seqWithValue(t,n){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&s.push(f)}return s}}function hv(r,t,n){const s=r.createShader(t);return r.shaderSource(s,n),r.compileShader(s),s}const pA=37297;let mA=0;function gA(r,t){const n=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===t?">":" "} ${h}: ${n[f]}`)}return s.join(`
`)}const dv=new ue;function _A(r){Ae._getMatrix(dv,Ae.workingColorSpace,r);const t=`mat3( ${dv.elements.map(n=>n.toFixed(4))} )`;switch(Ae.getTransfer(r)){case mu:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function pv(r,t,n){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+gA(r.getShaderSource(t),f)}else return l}function vA(r,t){const n=_A(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function xA(r,t){let n;switch(t){case Gv:n="Linear";break;case Vv:n="Reinhard";break;case kv:n="Cineon";break;case Xv:n="ACESFilmic";break;case qv:n="AgX";break;case Wv:n="Neutral";break;case VM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xc=new $;function yA(){Ae.getLuminanceCoefficients(Xc);const r=Xc.x.toFixed(4),t=Xc.y.toFixed(4),n=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ol).join(`
`)}function MA(r){const t=[];for(const n in r){const s=r[n];s!==!1&&t.push("#define "+n+" "+s)}return t.join(`
`)}function EA(r,t){const n={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:h}}return n}function ol(r){return r!==""}function mv(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const TA=/^[ \t]*#include +<([\w\d./]+)>/gm;function ip(r){return r.replace(TA,AA)}const bA=new Map;function AA(r,t){let n=fe[t];if(n===void 0){const s=bA.get(t);if(s!==void 0)n=fe[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return ip(n)}const RA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _v(r){return r.replace(RA,wA)}function wA(r,t,n,s){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function vv(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function CA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Fv?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===SM?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ma&&(t="SHADOWMAP_TYPE_VSM"),t}function DA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case jr:case Zr:t="ENVMAP_TYPE_CUBE";break;case pu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function UA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Zr:t="ENVMAP_MODE_REFRACTION";break}return t}function LA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Hv:t="ENVMAP_BLENDING_MULTIPLY";break;case HM:t="ENVMAP_BLENDING_MIX";break;case GM:t="ENVMAP_BLENDING_ADD";break}return t}function NA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function OA(r,t,n,s){const l=r.getContext(),c=n.defines;let f=n.vertexShader,h=n.fragmentShader;const p=CA(n),m=DA(n),g=UA(n),_=LA(n),v=NA(n),M=SA(n),E=MA(c),T=l.createProgram();let S,x,U=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(ol).join(`
`),S.length>0&&(S+=`
`),x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(ol).join(`
`),x.length>0&&(x+=`
`)):(S=[vv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ol).join(`
`),x=[vv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ds?"#define TONE_MAPPING":"",n.toneMapping!==ds?fe.tonemapping_pars_fragment:"",n.toneMapping!==ds?xA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,vA("linearToOutputTexel",n.outputColorSpace),yA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ol).join(`
`)),f=ip(f),f=mv(f,n),f=gv(f,n),h=ip(h),h=mv(h,n),h=gv(h,n),f=_v(f),h=_v(h),n.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,x=["#define varying in",n.glslVersion===U_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===U_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const C=U+S+f,A=U+x+h,V=hv(l,l.VERTEX_SHADER,C),B=hv(l,l.FRAGMENT_SHADER,A);l.attachShader(T,V),l.attachShader(T,B),n.index0AttributeName!==void 0?l.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function O(F){if(r.debug.checkShaderErrors){const Q=l.getProgramInfoLog(T).trim(),J=l.getShaderInfoLog(V).trim(),ct=l.getShaderInfoLog(B).trim();let ut=!0,P=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(ut=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,V,B);else{const j=pv(l,V,"vertex"),Z=pv(l,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+Q+`
`+j+`
`+Z)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(J===""||ct==="")&&(P=!1);P&&(F.diagnostics={runnable:ut,programLog:Q,vertexShader:{log:J,prefix:S},fragmentShader:{log:ct,prefix:x}})}l.deleteShader(V),l.deleteShader(B),H=new su(l,T),L=EA(l,T)}let H;this.getUniforms=function(){return H===void 0&&O(this),H};let L;this.getAttributes=function(){return L===void 0&&O(this),L};let w=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=l.getProgramParameter(T,pA)),w},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=mA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=V,this.fragmentShader=B,this}let PA=0;class zA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let s=n.get(t);return s===void 0&&(s=new Set,n.set(t,s)),s}_getShaderStage(t){const n=this.shaderCache;let s=n.get(t);return s===void 0&&(s=new BA(t),n.set(t,s)),s}}class BA{constructor(t){this.id=PA++,this.code=t,this.usedTimes=0}}function IA(r,t,n,s,l,c,f){const h=new lx,p=new zA,m=new Set,g=[],_=l.logarithmicDepthBuffer,v=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(L){return m.add(L),L===0?"uv":`uv${L}`}function S(L,w,F,Q,J){const ct=Q.fog,ut=J.geometry,P=L.isMeshStandardMaterial?Q.environment:null,j=(L.isMeshStandardMaterial?n:t).get(L.envMap||P),Z=j&&j.mapping===pu?j.image.height:null,St=E[L.type];L.precision!==null&&(M=l.getMaxPrecision(L.precision),M!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",M,"instead."));const Tt=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,z=Tt!==void 0?Tt.length:0;let st=0;ut.morphAttributes.position!==void 0&&(st=1),ut.morphAttributes.normal!==void 0&&(st=2),ut.morphAttributes.color!==void 0&&(st=3);let yt,K,ht,Et;if(St){const we=ji[St];yt=we.vertexShader,K=we.fragmentShader}else yt=L.vertexShader,K=L.fragmentShader,p.update(L),ht=p.getVertexShaderID(L),Et=p.getFragmentShaderID(L);const xt=r.getRenderTarget(),Vt=r.state.buffers.depth.getReversed(),Gt=J.isInstancedMesh===!0,se=J.isBatchedMesh===!0,He=!!L.map,de=!!L.matcap,Ke=!!j,W=!!L.aoMap,On=!!L.lightMap,he=!!L.bumpMap,_e=!!L.normalMap,Qt=!!L.displacementMap,Oe=!!L.emissiveMap,Zt=!!L.metalnessMap,N=!!L.roughnessMap,R=L.anisotropy>0,at=L.clearcoat>0,pt=L.dispersion>0,Mt=L.iridescence>0,gt=L.sheen>0,Wt=L.transmission>0,Lt=R&&!!L.anisotropyMap,zt=at&&!!L.clearcoatMap,ve=at&&!!L.clearcoatNormalMap,At=at&&!!L.clearcoatRoughnessMap,Bt=Mt&&!!L.iridescenceMap,Kt=Mt&&!!L.iridescenceThicknessMap,Yt=gt&&!!L.sheenColorMap,Pt=gt&&!!L.sheenRoughnessMap,te=!!L.specularMap,oe=!!L.specularColorMap,Ge=!!L.specularIntensityMap,k=Wt&&!!L.transmissionMap,wt=Wt&&!!L.thicknessMap,ft=!!L.gradientMap,vt=!!L.alphaMap,Ct=L.alphaTest>0,Nt=!!L.alphaHash,ne=!!L.extensions;let Qe=ds;L.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(Qe=r.toneMapping);const _n={shaderID:St,shaderType:L.type,shaderName:L.name,vertexShader:yt,fragmentShader:K,defines:L.defines,customVertexShaderID:ht,customFragmentShaderID:Et,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:M,batching:se,batchingColor:se&&J._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&J.instanceColor!==null,instancingMorph:Gt&&J.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:xt===null?r.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:to,alphaToCoverage:!!L.alphaToCoverage,map:He,matcap:de,envMap:Ke,envMapMode:Ke&&j.mapping,envMapCubeUVHeight:Z,aoMap:W,lightMap:On,bumpMap:he,normalMap:_e,displacementMap:v&&Qt,emissiveMap:Oe,normalMapObjectSpace:_e&&L.normalMapType===YM,normalMapTangentSpace:_e&&L.normalMapType===WM,metalnessMap:Zt,roughnessMap:N,anisotropy:R,anisotropyMap:Lt,clearcoat:at,clearcoatMap:zt,clearcoatNormalMap:ve,clearcoatRoughnessMap:At,dispersion:pt,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:Yt,sheenRoughnessMap:Pt,specularMap:te,specularColorMap:oe,specularIntensityMap:Ge,transmission:Wt,transmissionMap:k,thicknessMap:wt,gradientMap:ft,opaque:L.transparent===!1&&L.blending===Xr&&L.alphaToCoverage===!1,alphaMap:vt,alphaTest:Ct,alphaHash:Nt,combine:L.combine,mapUv:He&&T(L.map.channel),aoMapUv:W&&T(L.aoMap.channel),lightMapUv:On&&T(L.lightMap.channel),bumpMapUv:he&&T(L.bumpMap.channel),normalMapUv:_e&&T(L.normalMap.channel),displacementMapUv:Qt&&T(L.displacementMap.channel),emissiveMapUv:Oe&&T(L.emissiveMap.channel),metalnessMapUv:Zt&&T(L.metalnessMap.channel),roughnessMapUv:N&&T(L.roughnessMap.channel),anisotropyMapUv:Lt&&T(L.anisotropyMap.channel),clearcoatMapUv:zt&&T(L.clearcoatMap.channel),clearcoatNormalMapUv:ve&&T(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&T(L.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&T(L.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(L.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&T(L.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&T(L.sheenRoughnessMap.channel),specularMapUv:te&&T(L.specularMap.channel),specularColorMapUv:oe&&T(L.specularColorMap.channel),specularIntensityMapUv:Ge&&T(L.specularIntensityMap.channel),transmissionMapUv:k&&T(L.transmissionMap.channel),thicknessMapUv:wt&&T(L.thicknessMap.channel),alphaMapUv:vt&&T(L.alphaMap.channel),vertexTangents:!!ut.attributes.tangent&&(_e||R),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!ut.attributes.uv&&(He||vt),fog:!!ct,useFog:L.fog===!0,fogExp2:!!ct&&ct.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Vt,skinning:J.isSkinnedMesh===!0,morphTargets:ut.morphAttributes.position!==void 0,morphNormals:ut.morphAttributes.normal!==void 0,morphColors:ut.morphAttributes.color!==void 0,morphTargetsCount:z,morphTextureStride:st,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:L.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Qe,decodeVideoTexture:He&&L.map.isVideoTexture===!0&&Ae.getTransfer(L.map.colorSpace)===Fe,decodeVideoTextureEmissive:Oe&&L.emissiveMap.isVideoTexture===!0&&Ae.getTransfer(L.emissiveMap.colorSpace)===Fe,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===Zi,flipSided:L.side===Hn,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:ne&&L.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&L.extensions.multiDraw===!0||se)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return _n.vertexUv1s=m.has(1),_n.vertexUv2s=m.has(2),_n.vertexUv3s=m.has(3),m.clear(),_n}function x(L){const w=[];if(L.shaderID?w.push(L.shaderID):(w.push(L.customVertexShaderID),w.push(L.customFragmentShaderID)),L.defines!==void 0)for(const F in L.defines)w.push(F),w.push(L.defines[F]);return L.isRawShaderMaterial===!1&&(U(w,L),C(w,L),w.push(r.outputColorSpace)),w.push(L.customProgramCacheKey),w.join()}function U(L,w){L.push(w.precision),L.push(w.outputColorSpace),L.push(w.envMapMode),L.push(w.envMapCubeUVHeight),L.push(w.mapUv),L.push(w.alphaMapUv),L.push(w.lightMapUv),L.push(w.aoMapUv),L.push(w.bumpMapUv),L.push(w.normalMapUv),L.push(w.displacementMapUv),L.push(w.emissiveMapUv),L.push(w.metalnessMapUv),L.push(w.roughnessMapUv),L.push(w.anisotropyMapUv),L.push(w.clearcoatMapUv),L.push(w.clearcoatNormalMapUv),L.push(w.clearcoatRoughnessMapUv),L.push(w.iridescenceMapUv),L.push(w.iridescenceThicknessMapUv),L.push(w.sheenColorMapUv),L.push(w.sheenRoughnessMapUv),L.push(w.specularMapUv),L.push(w.specularColorMapUv),L.push(w.specularIntensityMapUv),L.push(w.transmissionMapUv),L.push(w.thicknessMapUv),L.push(w.combine),L.push(w.fogExp2),L.push(w.sizeAttenuation),L.push(w.morphTargetsCount),L.push(w.morphAttributeCount),L.push(w.numDirLights),L.push(w.numPointLights),L.push(w.numSpotLights),L.push(w.numSpotLightMaps),L.push(w.numHemiLights),L.push(w.numRectAreaLights),L.push(w.numDirLightShadows),L.push(w.numPointLightShadows),L.push(w.numSpotLightShadows),L.push(w.numSpotLightShadowsWithMaps),L.push(w.numLightProbes),L.push(w.shadowMapType),L.push(w.toneMapping),L.push(w.numClippingPlanes),L.push(w.numClipIntersection),L.push(w.depthPacking)}function C(L,w){h.disableAll(),w.supportsVertexTextures&&h.enable(0),w.instancing&&h.enable(1),w.instancingColor&&h.enable(2),w.instancingMorph&&h.enable(3),w.matcap&&h.enable(4),w.envMap&&h.enable(5),w.normalMapObjectSpace&&h.enable(6),w.normalMapTangentSpace&&h.enable(7),w.clearcoat&&h.enable(8),w.iridescence&&h.enable(9),w.alphaTest&&h.enable(10),w.vertexColors&&h.enable(11),w.vertexAlphas&&h.enable(12),w.vertexUv1s&&h.enable(13),w.vertexUv2s&&h.enable(14),w.vertexUv3s&&h.enable(15),w.vertexTangents&&h.enable(16),w.anisotropy&&h.enable(17),w.alphaHash&&h.enable(18),w.batching&&h.enable(19),w.dispersion&&h.enable(20),w.batchingColor&&h.enable(21),L.push(h.mask),h.disableAll(),w.fog&&h.enable(0),w.useFog&&h.enable(1),w.flatShading&&h.enable(2),w.logarithmicDepthBuffer&&h.enable(3),w.reverseDepthBuffer&&h.enable(4),w.skinning&&h.enable(5),w.morphTargets&&h.enable(6),w.morphNormals&&h.enable(7),w.morphColors&&h.enable(8),w.premultipliedAlpha&&h.enable(9),w.shadowMapEnabled&&h.enable(10),w.doubleSided&&h.enable(11),w.flipSided&&h.enable(12),w.useDepthPacking&&h.enable(13),w.dithering&&h.enable(14),w.transmission&&h.enable(15),w.sheen&&h.enable(16),w.opaque&&h.enable(17),w.pointsUvs&&h.enable(18),w.decodeVideoTexture&&h.enable(19),w.decodeVideoTextureEmissive&&h.enable(20),w.alphaToCoverage&&h.enable(21),L.push(h.mask)}function A(L){const w=E[L.type];let F;if(w){const Q=ji[w];F=gp.clone(Q.uniforms)}else F=L.uniforms;return F}function V(L,w){let F;for(let Q=0,J=g.length;Q<J;Q++){const ct=g[Q];if(ct.cacheKey===w){F=ct,++F.usedTimes;break}}return F===void 0&&(F=new OA(r,w,L,c),g.push(F)),F}function B(L){if(--L.usedTimes===0){const w=g.indexOf(L);g[w]=g[g.length-1],g.pop(),L.destroy()}}function O(L){p.remove(L)}function H(){p.dispose()}return{getParameters:S,getProgramCacheKey:x,getUniforms:A,acquireProgram:V,releaseProgram:B,releaseShaderCache:O,programs:g,dispose:H}}function FA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,p){r.get(f)[h]=p}function c(){r=new WeakMap}return{has:t,get:n,remove:s,update:l,dispose:c}}function HA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function xv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function yv(){const r=[];let t=0;const n=[],s=[],l=[];function c(){t=0,n.length=0,s.length=0,l.length=0}function f(_,v,M,E,T,S){let x=r[t];return x===void 0?(x={id:_.id,object:_,geometry:v,material:M,groupOrder:E,renderOrder:_.renderOrder,z:T,group:S},r[t]=x):(x.id=_.id,x.object=_,x.geometry=v,x.material=M,x.groupOrder=E,x.renderOrder=_.renderOrder,x.z=T,x.group=S),t++,x}function h(_,v,M,E,T,S){const x=f(_,v,M,E,T,S);M.transmission>0?s.push(x):M.transparent===!0?l.push(x):n.push(x)}function p(_,v,M,E,T,S){const x=f(_,v,M,E,T,S);M.transmission>0?s.unshift(x):M.transparent===!0?l.unshift(x):n.unshift(x)}function m(_,v){n.length>1&&n.sort(_||HA),s.length>1&&s.sort(v||xv),l.length>1&&l.sort(v||xv)}function g(){for(let _=t,v=r.length;_<v;_++){const M=r[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:s,transparent:l,init:c,push:h,unshift:p,finish:g,sort:m}}function GA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new yv,r.set(s,[f])):l>=c.length?(f=new yv,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function VA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new $,color:new ee};break;case"SpotLight":n={position:new $,direction:new $,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new $,color:new ee,distance:0,decay:0};break;case"HemisphereLight":n={direction:new $,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":n={color:new ee,position:new $,halfWidth:new $,halfHeight:new $};break}return r[t.id]=n,n}}}function kA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let XA=0;function qA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function WA(r){const t=new VA,n=kA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new $);const l=new $,c=new sn,f=new sn;function h(m){let g=0,_=0,v=0;for(let L=0;L<9;L++)s.probe[L].set(0,0,0);let M=0,E=0,T=0,S=0,x=0,U=0,C=0,A=0,V=0,B=0,O=0;m.sort(qA);for(let L=0,w=m.length;L<w;L++){const F=m[L],Q=F.color,J=F.intensity,ct=F.distance,ut=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)g+=Q.r*J,_+=Q.g*J,v+=Q.b*J;else if(F.isLightProbe){for(let P=0;P<9;P++)s.probe[P].addScaledVector(F.sh.coefficients[P],J);O++}else if(F.isDirectionalLight){const P=t.get(F);if(P.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const j=F.shadow,Z=n.get(F);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,s.directionalShadow[M]=Z,s.directionalShadowMap[M]=ut,s.directionalShadowMatrix[M]=F.shadow.matrix,U++}s.directional[M]=P,M++}else if(F.isSpotLight){const P=t.get(F);P.position.setFromMatrixPosition(F.matrixWorld),P.color.copy(Q).multiplyScalar(J),P.distance=ct,P.coneCos=Math.cos(F.angle),P.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),P.decay=F.decay,s.spot[T]=P;const j=F.shadow;if(F.map&&(s.spotLightMap[V]=F.map,V++,j.updateMatrices(F),F.castShadow&&B++),s.spotLightMatrix[T]=j.matrix,F.castShadow){const Z=n.get(F);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,s.spotShadow[T]=Z,s.spotShadowMap[T]=ut,A++}T++}else if(F.isRectAreaLight){const P=t.get(F);P.color.copy(Q).multiplyScalar(J),P.halfWidth.set(F.width*.5,0,0),P.halfHeight.set(0,F.height*.5,0),s.rectArea[S]=P,S++}else if(F.isPointLight){const P=t.get(F);if(P.color.copy(F.color).multiplyScalar(F.intensity),P.distance=F.distance,P.decay=F.decay,F.castShadow){const j=F.shadow,Z=n.get(F);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,Z.shadowCameraNear=j.camera.near,Z.shadowCameraFar=j.camera.far,s.pointShadow[E]=Z,s.pointShadowMap[E]=ut,s.pointShadowMatrix[E]=F.shadow.matrix,C++}s.point[E]=P,E++}else if(F.isHemisphereLight){const P=t.get(F);P.skyColor.copy(F.color).multiplyScalar(J),P.groundColor.copy(F.groundColor).multiplyScalar(J),s.hemi[x]=P,x++}}S>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ot.LTC_FLOAT_1,s.rectAreaLTC2=Ot.LTC_FLOAT_2):(s.rectAreaLTC1=Ot.LTC_HALF_1,s.rectAreaLTC2=Ot.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=_,s.ambient[2]=v;const H=s.hash;(H.directionalLength!==M||H.pointLength!==E||H.spotLength!==T||H.rectAreaLength!==S||H.hemiLength!==x||H.numDirectionalShadows!==U||H.numPointShadows!==C||H.numSpotShadows!==A||H.numSpotMaps!==V||H.numLightProbes!==O)&&(s.directional.length=M,s.spot.length=T,s.rectArea.length=S,s.point.length=E,s.hemi.length=x,s.directionalShadow.length=U,s.directionalShadowMap.length=U,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=U,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=A+V-B,s.spotLightMap.length=V,s.numSpotLightShadowsWithMaps=B,s.numLightProbes=O,H.directionalLength=M,H.pointLength=E,H.spotLength=T,H.rectAreaLength=S,H.hemiLength=x,H.numDirectionalShadows=U,H.numPointShadows=C,H.numSpotShadows=A,H.numSpotMaps=V,H.numLightProbes=O,s.version=XA++)}function p(m,g){let _=0,v=0,M=0,E=0,T=0;const S=g.matrixWorldInverse;for(let x=0,U=m.length;x<U;x++){const C=m[x];if(C.isDirectionalLight){const A=s.directional[_];A.direction.setFromMatrixPosition(C.matrixWorld),l.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(l),A.direction.transformDirection(S),_++}else if(C.isSpotLight){const A=s.spot[M];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(S),A.direction.setFromMatrixPosition(C.matrixWorld),l.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(l),A.direction.transformDirection(S),M++}else if(C.isRectAreaLight){const A=s.rectArea[E];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(S),f.identity(),c.copy(C.matrixWorld),c.premultiply(S),f.extractRotation(c),A.halfWidth.set(C.width*.5,0,0),A.halfHeight.set(0,C.height*.5,0),A.halfWidth.applyMatrix4(f),A.halfHeight.applyMatrix4(f),E++}else if(C.isPointLight){const A=s.point[v];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(S),v++}else if(C.isHemisphereLight){const A=s.hemi[T];A.direction.setFromMatrixPosition(C.matrixWorld),A.direction.transformDirection(S),T++}}}return{setup:h,setupView:p,state:s}}function Sv(r){const t=new WA(r),n=[],s=[];function l(g){m.camera=g,n.length=0,s.length=0}function c(g){n.push(g)}function f(g){s.push(g)}function h(){t.setup(n)}function p(g){t.setupView(n,g)}const m={lightsArray:n,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:h,setupLightsView:p,pushLight:c,pushShadow:f}}function YA(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let h;return f===void 0?(h=new Sv(r),t.set(l,[h])):c>=f.length?(h=new Sv(r),f.push(h)):h=f[c],h}function s(){t=new WeakMap}return{get:n,dispose:s}}class jA extends no{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=XM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ZA extends no{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const KA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QA=`uniform sampler2D shadow_pass;
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
}`;function JA(r,t,n){let s=new mx;const l=new Re,c=new Re,f=new cn,h=new jA({depthPacking:qM}),p=new ZA,m={},g=n.maxTextureSize,_={[ps]:Hn,[Hn]:ps,[Zi]:Zi},v=new Gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:KA,fragmentShader:QA}),M=v.clone();M.defines.HORIZONTAL_PASS=1;const E=new An;E.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new tn(E,v),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fv;let x=this.type;this.render=function(B,O,H){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||B.length===0)return;const L=r.getRenderTarget(),w=r.getActiveCubeFace(),F=r.getActiveMipmapLevel(),Q=r.state;Q.setBlending(Aa),Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const J=x!==Ma&&this.type===Ma,ct=x===Ma&&this.type!==Ma;for(let ut=0,P=B.length;ut<P;ut++){const j=B[ut],Z=j.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;l.copy(Z.mapSize);const St=Z.getFrameExtents();if(l.multiply(St),c.copy(Z.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/St.x),l.x=c.x*St.x,Z.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/St.y),l.y=c.y*St.y,Z.mapSize.y=c.y)),Z.map===null||J===!0||ct===!0){const z=this.type!==Ma?{minFilter:Hi,magFilter:Hi}:{};Z.map!==null&&Z.map.dispose(),Z.map=new ms(l.x,l.y,z),Z.map.texture.name=j.name+".shadowMap",Z.camera.updateProjectionMatrix()}r.setRenderTarget(Z.map),r.clear();const Tt=Z.getViewportCount();for(let z=0;z<Tt;z++){const st=Z.getViewport(z);f.set(c.x*st.x,c.y*st.y,c.x*st.z,c.y*st.w),Q.viewport(f),Z.updateMatrices(j,z),s=Z.getFrustum(),A(O,H,Z.camera,j,this.type)}Z.isPointLightShadow!==!0&&this.type===Ma&&U(Z,H),Z.needsUpdate=!1}x=this.type,S.needsUpdate=!1,r.setRenderTarget(L,w,F)};function U(B,O){const H=t.update(T);v.defines.VSM_SAMPLES!==B.blurSamples&&(v.defines.VSM_SAMPLES=B.blurSamples,M.defines.VSM_SAMPLES=B.blurSamples,v.needsUpdate=!0,M.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new ms(l.x,l.y)),v.uniforms.shadow_pass.value=B.map.texture,v.uniforms.resolution.value=B.mapSize,v.uniforms.radius.value=B.radius,r.setRenderTarget(B.mapPass),r.clear(),r.renderBufferDirect(O,null,H,v,T,null),M.uniforms.shadow_pass.value=B.mapPass.texture,M.uniforms.resolution.value=B.mapSize,M.uniforms.radius.value=B.radius,r.setRenderTarget(B.map),r.clear(),r.renderBufferDirect(O,null,H,M,T,null)}function C(B,O,H,L){let w=null;const F=H.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(F!==void 0)w=F;else if(w=H.isPointLight===!0?p:h,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const Q=w.uuid,J=O.uuid;let ct=m[Q];ct===void 0&&(ct={},m[Q]=ct);let ut=ct[J];ut===void 0&&(ut=w.clone(),ct[J]=ut,O.addEventListener("dispose",V)),w=ut}if(w.visible=O.visible,w.wireframe=O.wireframe,L===Ma?w.side=O.shadowSide!==null?O.shadowSide:O.side:w.side=O.shadowSide!==null?O.shadowSide:_[O.side],w.alphaMap=O.alphaMap,w.alphaTest=O.alphaTest,w.map=O.map,w.clipShadows=O.clipShadows,w.clippingPlanes=O.clippingPlanes,w.clipIntersection=O.clipIntersection,w.displacementMap=O.displacementMap,w.displacementScale=O.displacementScale,w.displacementBias=O.displacementBias,w.wireframeLinewidth=O.wireframeLinewidth,w.linewidth=O.linewidth,H.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const Q=r.properties.get(w);Q.light=H}return w}function A(B,O,H,L,w){if(B.visible===!1)return;if(B.layers.test(O.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&w===Ma)&&(!B.frustumCulled||s.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,B.matrixWorld);const J=t.update(B),ct=B.material;if(Array.isArray(ct)){const ut=J.groups;for(let P=0,j=ut.length;P<j;P++){const Z=ut[P],St=ct[Z.materialIndex];if(St&&St.visible){const Tt=C(B,St,L,w);B.onBeforeShadow(r,B,O,H,J,Tt,Z),r.renderBufferDirect(H,null,J,Tt,B,Z),B.onAfterShadow(r,B,O,H,J,Tt,Z)}}}else if(ct.visible){const ut=C(B,ct,L,w);B.onBeforeShadow(r,B,O,H,J,ut,null),r.renderBufferDirect(H,null,J,ut,B,null),B.onAfterShadow(r,B,O,H,J,ut,null)}}const Q=B.children;for(let J=0,ct=Q.length;J<ct;J++)A(Q[J],O,H,L,w)}function V(B){B.target.removeEventListener("dispose",V);for(const H in m){const L=m[H],w=B.target.uuid;w in L&&(L[w].dispose(),delete L[w])}}}const $A={[yd]:Sd,[Md]:bd,[Ed]:Ad,[Yr]:Td,[Sd]:yd,[bd]:Md,[Ad]:Ed,[Td]:Yr};function t2(r,t){function n(){let k=!1;const wt=new cn;let ft=null;const vt=new cn(0,0,0,0);return{setMask:function(Ct){ft!==Ct&&!k&&(r.colorMask(Ct,Ct,Ct,Ct),ft=Ct)},setLocked:function(Ct){k=Ct},setClear:function(Ct,Nt,ne,Qe,_n){_n===!0&&(Ct*=Qe,Nt*=Qe,ne*=Qe),wt.set(Ct,Nt,ne,Qe),vt.equals(wt)===!1&&(r.clearColor(Ct,Nt,ne,Qe),vt.copy(wt))},reset:function(){k=!1,ft=null,vt.set(-1,0,0,0)}}}function s(){let k=!1,wt=!1,ft=null,vt=null,Ct=null;return{setReversed:function(Nt){if(wt!==Nt){const ne=t.get("EXT_clip_control");wt?ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.ZERO_TO_ONE_EXT):ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.NEGATIVE_ONE_TO_ONE_EXT);const Qe=Ct;Ct=null,this.setClear(Qe)}wt=Nt},getReversed:function(){return wt},setTest:function(Nt){Nt?xt(r.DEPTH_TEST):Vt(r.DEPTH_TEST)},setMask:function(Nt){ft!==Nt&&!k&&(r.depthMask(Nt),ft=Nt)},setFunc:function(Nt){if(wt&&(Nt=$A[Nt]),vt!==Nt){switch(Nt){case yd:r.depthFunc(r.NEVER);break;case Sd:r.depthFunc(r.ALWAYS);break;case Md:r.depthFunc(r.LESS);break;case Yr:r.depthFunc(r.LEQUAL);break;case Ed:r.depthFunc(r.EQUAL);break;case Td:r.depthFunc(r.GEQUAL);break;case bd:r.depthFunc(r.GREATER);break;case Ad:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}vt=Nt}},setLocked:function(Nt){k=Nt},setClear:function(Nt){Ct!==Nt&&(wt&&(Nt=1-Nt),r.clearDepth(Nt),Ct=Nt)},reset:function(){k=!1,ft=null,vt=null,Ct=null,wt=!1}}}function l(){let k=!1,wt=null,ft=null,vt=null,Ct=null,Nt=null,ne=null,Qe=null,_n=null;return{setTest:function(we){k||(we?xt(r.STENCIL_TEST):Vt(r.STENCIL_TEST))},setMask:function(we){wt!==we&&!k&&(r.stencilMask(we),wt=we)},setFunc:function(we,Rn,Ci){(ft!==we||vt!==Rn||Ct!==Ci)&&(r.stencilFunc(we,Rn,Ci),ft=we,vt=Rn,Ct=Ci)},setOp:function(we,Rn,Ci){(Nt!==we||ne!==Rn||Qe!==Ci)&&(r.stencilOp(we,Rn,Ci),Nt=we,ne=Rn,Qe=Ci)},setLocked:function(we){k=we},setClear:function(we){_n!==we&&(r.clearStencil(we),_n=we)},reset:function(){k=!1,wt=null,ft=null,vt=null,Ct=null,Nt=null,ne=null,Qe=null,_n=null}}}const c=new n,f=new s,h=new l,p=new WeakMap,m=new WeakMap;let g={},_={},v=new WeakMap,M=[],E=null,T=!1,S=null,x=null,U=null,C=null,A=null,V=null,B=null,O=new ee(0,0,0),H=0,L=!1,w=null,F=null,Q=null,J=null,ct=null;const ut=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,j=0;const Z=r.getParameter(r.VERSION);Z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Z)[1]),P=j>=1):Z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),P=j>=2);let St=null,Tt={};const z=r.getParameter(r.SCISSOR_BOX),st=r.getParameter(r.VIEWPORT),yt=new cn().fromArray(z),K=new cn().fromArray(st);function ht(k,wt,ft,vt){const Ct=new Uint8Array(4),Nt=r.createTexture();r.bindTexture(k,Nt),r.texParameteri(k,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(k,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ne=0;ne<ft;ne++)k===r.TEXTURE_3D||k===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,vt,0,r.RGBA,r.UNSIGNED_BYTE,Ct):r.texImage2D(wt+ne,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ct);return Nt}const Et={};Et[r.TEXTURE_2D]=ht(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ht(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ht(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ht(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),xt(r.DEPTH_TEST),f.setFunc(Yr),he(!1),_e(A_),xt(r.CULL_FACE),W(Aa);function xt(k){g[k]!==!0&&(r.enable(k),g[k]=!0)}function Vt(k){g[k]!==!1&&(r.disable(k),g[k]=!1)}function Gt(k,wt){return _[k]!==wt?(r.bindFramebuffer(k,wt),_[k]=wt,k===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=wt),k===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function se(k,wt){let ft=M,vt=!1;if(k){ft=v.get(wt),ft===void 0&&(ft=[],v.set(wt,ft));const Ct=k.textures;if(ft.length!==Ct.length||ft[0]!==r.COLOR_ATTACHMENT0){for(let Nt=0,ne=Ct.length;Nt<ne;Nt++)ft[Nt]=r.COLOR_ATTACHMENT0+Nt;ft.length=Ct.length,vt=!0}}else ft[0]!==r.BACK&&(ft[0]=r.BACK,vt=!0);vt&&r.drawBuffers(ft)}function He(k){return E!==k?(r.useProgram(k),E=k,!0):!1}const de={[ks]:r.FUNC_ADD,[EM]:r.FUNC_SUBTRACT,[TM]:r.FUNC_REVERSE_SUBTRACT};de[bM]=r.MIN,de[AM]=r.MAX;const Ke={[RM]:r.ZERO,[wM]:r.ONE,[CM]:r.SRC_COLOR,[vd]:r.SRC_ALPHA,[PM]:r.SRC_ALPHA_SATURATE,[NM]:r.DST_COLOR,[UM]:r.DST_ALPHA,[DM]:r.ONE_MINUS_SRC_COLOR,[xd]:r.ONE_MINUS_SRC_ALPHA,[OM]:r.ONE_MINUS_DST_COLOR,[LM]:r.ONE_MINUS_DST_ALPHA,[zM]:r.CONSTANT_COLOR,[BM]:r.ONE_MINUS_CONSTANT_COLOR,[IM]:r.CONSTANT_ALPHA,[FM]:r.ONE_MINUS_CONSTANT_ALPHA};function W(k,wt,ft,vt,Ct,Nt,ne,Qe,_n,we){if(k===Aa){T===!0&&(Vt(r.BLEND),T=!1);return}if(T===!1&&(xt(r.BLEND),T=!0),k!==MM){if(k!==S||we!==L){if((x!==ks||A!==ks)&&(r.blendEquation(r.FUNC_ADD),x=ks,A=ks),we)switch(k){case Xr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Vs:r.blendFunc(r.ONE,r.ONE);break;case R_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case w_:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Xr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Vs:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case R_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case w_:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}U=null,C=null,V=null,B=null,O.set(0,0,0),H=0,S=k,L=we}return}Ct=Ct||wt,Nt=Nt||ft,ne=ne||vt,(wt!==x||Ct!==A)&&(r.blendEquationSeparate(de[wt],de[Ct]),x=wt,A=Ct),(ft!==U||vt!==C||Nt!==V||ne!==B)&&(r.blendFuncSeparate(Ke[ft],Ke[vt],Ke[Nt],Ke[ne]),U=ft,C=vt,V=Nt,B=ne),(Qe.equals(O)===!1||_n!==H)&&(r.blendColor(Qe.r,Qe.g,Qe.b,_n),O.copy(Qe),H=_n),S=k,L=!1}function On(k,wt){k.side===Zi?Vt(r.CULL_FACE):xt(r.CULL_FACE);let ft=k.side===Hn;wt&&(ft=!ft),he(ft),k.blending===Xr&&k.transparent===!1?W(Aa):W(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),f.setFunc(k.depthFunc),f.setTest(k.depthTest),f.setMask(k.depthWrite),c.setMask(k.colorWrite);const vt=k.stencilWrite;h.setTest(vt),vt&&(h.setMask(k.stencilWriteMask),h.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),h.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Oe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?xt(r.SAMPLE_ALPHA_TO_COVERAGE):Vt(r.SAMPLE_ALPHA_TO_COVERAGE)}function he(k){w!==k&&(k?r.frontFace(r.CW):r.frontFace(r.CCW),w=k)}function _e(k){k!==xM?(xt(r.CULL_FACE),k!==F&&(k===A_?r.cullFace(r.BACK):k===yM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Vt(r.CULL_FACE),F=k}function Qt(k){k!==Q&&(P&&r.lineWidth(k),Q=k)}function Oe(k,wt,ft){k?(xt(r.POLYGON_OFFSET_FILL),(J!==wt||ct!==ft)&&(r.polygonOffset(wt,ft),J=wt,ct=ft)):Vt(r.POLYGON_OFFSET_FILL)}function Zt(k){k?xt(r.SCISSOR_TEST):Vt(r.SCISSOR_TEST)}function N(k){k===void 0&&(k=r.TEXTURE0+ut-1),St!==k&&(r.activeTexture(k),St=k)}function R(k,wt,ft){ft===void 0&&(St===null?ft=r.TEXTURE0+ut-1:ft=St);let vt=Tt[ft];vt===void 0&&(vt={type:void 0,texture:void 0},Tt[ft]=vt),(vt.type!==k||vt.texture!==wt)&&(St!==ft&&(r.activeTexture(ft),St=ft),r.bindTexture(k,wt||Et[k]),vt.type=k,vt.texture=wt)}function at(){const k=Tt[St];k!==void 0&&k.type!==void 0&&(r.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function pt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Wt(){try{r.texSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ve(){try{r.texStorage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Yt(k){yt.equals(k)===!1&&(r.scissor(k.x,k.y,k.z,k.w),yt.copy(k))}function Pt(k){K.equals(k)===!1&&(r.viewport(k.x,k.y,k.z,k.w),K.copy(k))}function te(k,wt){let ft=m.get(wt);ft===void 0&&(ft=new WeakMap,m.set(wt,ft));let vt=ft.get(k);vt===void 0&&(vt=r.getUniformBlockIndex(wt,k.name),ft.set(k,vt))}function oe(k,wt){const vt=m.get(wt).get(k);p.get(wt)!==vt&&(r.uniformBlockBinding(wt,vt,k.__bindingPointIndex),p.set(wt,vt))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},St=null,Tt={},_={},v=new WeakMap,M=[],E=null,T=!1,S=null,x=null,U=null,C=null,A=null,V=null,B=null,O=new ee(0,0,0),H=0,L=!1,w=null,F=null,Q=null,J=null,ct=null,yt.set(0,0,r.canvas.width,r.canvas.height),K.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:xt,disable:Vt,bindFramebuffer:Gt,drawBuffers:se,useProgram:He,setBlending:W,setMaterial:On,setFlipSided:he,setCullFace:_e,setLineWidth:Qt,setPolygonOffset:Oe,setScissorTest:Zt,activeTexture:N,bindTexture:R,unbindTexture:at,compressedTexImage2D:pt,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Kt,updateUBOMapping:te,uniformBlockBinding:oe,texStorage2D:ve,texStorage3D:At,texSubImage2D:gt,texSubImage3D:Wt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:zt,scissor:Yt,viewport:Pt,reset:Ge}}function Mv(r,t,n,s){const l=e2(s);switch(n){case Qv:return r*t;case $v:return r*t;case tx:return r*t*2;case ex:return r*t/l.components*l.byteLength;case hp:return r*t/l.components*l.byteLength;case nx:return r*t*2/l.components*l.byteLength;case dp:return r*t*2/l.components*l.byteLength;case Jv:return r*t*3/l.components*l.byteLength;case Fi:return r*t*4/l.components*l.byteLength;case pp:return r*t*4/l.components*l.byteLength;case tu:case eu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case nu:case iu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ud:case Nd:return Math.max(r,16)*Math.max(t,8)/4;case Dd:case Ld:return Math.max(r,8)*Math.max(t,8)/2;case Od:case Pd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case zd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Bd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Id:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Fd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Gd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Vd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case kd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Xd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case qd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Wd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case jd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Zd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Kd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case au:case Qd:case Jd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case ix:case $d:return Math.ceil(r/4)*Math.ceil(t/4)*8;case tp:case ep:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function e2(r){switch(r){case wa:case jv:return{byteLength:1,components:1};case ll:case Zv:case $r:return{byteLength:2,components:1};case up:case fp:return{byteLength:2,components:4};case Ws:case cp:case Ta:return{byteLength:4,components:1};case Kv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function n2(r,t,n,s,l,c,f){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new Re,g=new WeakMap;let _;const v=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,R){return M?new OffscreenCanvas(N,R):cu("canvas")}function T(N,R,at){let pt=1;const Mt=Zt(N);if((Mt.width>at||Mt.height>at)&&(pt=at/Math.max(Mt.width,Mt.height)),pt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const gt=Math.floor(pt*Mt.width),Wt=Math.floor(pt*Mt.height);_===void 0&&(_=E(gt,Wt));const Lt=R?E(gt,Wt):_;return Lt.width=gt,Lt.height=Wt,Lt.getContext("2d").drawImage(N,0,0,gt,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+gt+"x"+Wt+")."),Lt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),N;return N}function S(N){return N.generateMipmaps}function x(N){r.generateMipmap(N)}function U(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function C(N,R,at,pt,Mt=!1){if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt=R;if(R===r.RED&&(at===r.FLOAT&&(gt=r.R32F),at===r.HALF_FLOAT&&(gt=r.R16F),at===r.UNSIGNED_BYTE&&(gt=r.R8)),R===r.RED_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.R8UI),at===r.UNSIGNED_SHORT&&(gt=r.R16UI),at===r.UNSIGNED_INT&&(gt=r.R32UI),at===r.BYTE&&(gt=r.R8I),at===r.SHORT&&(gt=r.R16I),at===r.INT&&(gt=r.R32I)),R===r.RG&&(at===r.FLOAT&&(gt=r.RG32F),at===r.HALF_FLOAT&&(gt=r.RG16F),at===r.UNSIGNED_BYTE&&(gt=r.RG8)),R===r.RG_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RG8UI),at===r.UNSIGNED_SHORT&&(gt=r.RG16UI),at===r.UNSIGNED_INT&&(gt=r.RG32UI),at===r.BYTE&&(gt=r.RG8I),at===r.SHORT&&(gt=r.RG16I),at===r.INT&&(gt=r.RG32I)),R===r.RGB_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),at===r.UNSIGNED_INT&&(gt=r.RGB32UI),at===r.BYTE&&(gt=r.RGB8I),at===r.SHORT&&(gt=r.RGB16I),at===r.INT&&(gt=r.RGB32I)),R===r.RGBA_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),at===r.UNSIGNED_INT&&(gt=r.RGBA32UI),at===r.BYTE&&(gt=r.RGBA8I),at===r.SHORT&&(gt=r.RGBA16I),at===r.INT&&(gt=r.RGBA32I)),R===r.RGB&&at===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),R===r.RGBA){const Wt=Mt?mu:Ae.getTransfer(pt);at===r.FLOAT&&(gt=r.RGBA32F),at===r.HALF_FLOAT&&(gt=r.RGBA16F),at===r.UNSIGNED_BYTE&&(gt=Wt===Fe?r.SRGB8_ALPHA8:r.RGBA8),at===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),at===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function A(N,R){let at;return N?R===null||R===Ws||R===Kr?at=r.DEPTH24_STENCIL8:R===Ta?at=r.DEPTH32F_STENCIL8:R===ll&&(at=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Ws||R===Kr?at=r.DEPTH_COMPONENT24:R===Ta?at=r.DEPTH_COMPONENT32F:R===ll&&(at=r.DEPTH_COMPONENT16),at}function V(N,R){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==Hi&&N.minFilter!==Ki?Math.log2(Math.max(R.width,R.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?R.mipmaps.length:1}function B(N){const R=N.target;R.removeEventListener("dispose",B),H(R),R.isVideoTexture&&g.delete(R)}function O(N){const R=N.target;R.removeEventListener("dispose",O),w(R)}function H(N){const R=s.get(N);if(R.__webglInit===void 0)return;const at=N.source,pt=v.get(at);if(pt){const Mt=pt[R.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&L(N),Object.keys(pt).length===0&&v.delete(at)}s.remove(N)}function L(N){const R=s.get(N);r.deleteTexture(R.__webglTexture);const at=N.source,pt=v.get(at);delete pt[R.__cacheKey],f.memory.textures--}function w(N){const R=s.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),s.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let pt=0;pt<6;pt++){if(Array.isArray(R.__webglFramebuffer[pt]))for(let Mt=0;Mt<R.__webglFramebuffer[pt].length;Mt++)r.deleteFramebuffer(R.__webglFramebuffer[pt][Mt]);else r.deleteFramebuffer(R.__webglFramebuffer[pt]);R.__webglDepthbuffer&&r.deleteRenderbuffer(R.__webglDepthbuffer[pt])}else{if(Array.isArray(R.__webglFramebuffer))for(let pt=0;pt<R.__webglFramebuffer.length;pt++)r.deleteFramebuffer(R.__webglFramebuffer[pt]);else r.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&r.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&r.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let pt=0;pt<R.__webglColorRenderbuffer.length;pt++)R.__webglColorRenderbuffer[pt]&&r.deleteRenderbuffer(R.__webglColorRenderbuffer[pt]);R.__webglDepthRenderbuffer&&r.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const at=N.textures;for(let pt=0,Mt=at.length;pt<Mt;pt++){const gt=s.get(at[pt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),s.remove(at[pt])}s.remove(N)}let F=0;function Q(){F=0}function J(){const N=F;return N>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),F+=1,N}function ct(N){const R=[];return R.push(N.wrapS),R.push(N.wrapT),R.push(N.wrapR||0),R.push(N.magFilter),R.push(N.minFilter),R.push(N.anisotropy),R.push(N.internalFormat),R.push(N.format),R.push(N.type),R.push(N.generateMipmaps),R.push(N.premultiplyAlpha),R.push(N.flipY),R.push(N.unpackAlignment),R.push(N.colorSpace),R.join()}function ut(N,R){const at=s.get(N);if(N.isVideoTexture&&Qt(N),N.isRenderTargetTexture===!1&&N.version>0&&at.__version!==N.version){const pt=N.image;if(pt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(at,N,R);return}}n.bindTexture(r.TEXTURE_2D,at.__webglTexture,r.TEXTURE0+R)}function P(N,R){const at=s.get(N);if(N.version>0&&at.__version!==N.version){K(at,N,R);return}n.bindTexture(r.TEXTURE_2D_ARRAY,at.__webglTexture,r.TEXTURE0+R)}function j(N,R){const at=s.get(N);if(N.version>0&&at.__version!==N.version){K(at,N,R);return}n.bindTexture(r.TEXTURE_3D,at.__webglTexture,r.TEXTURE0+R)}function Z(N,R){const at=s.get(N);if(N.version>0&&at.__version!==N.version){ht(at,N,R);return}n.bindTexture(r.TEXTURE_CUBE_MAP,at.__webglTexture,r.TEXTURE0+R)}const St={[ou]:r.REPEAT,[hs]:r.CLAMP_TO_EDGE,[Cd]:r.MIRRORED_REPEAT},Tt={[Hi]:r.NEAREST,[kM]:r.NEAREST_MIPMAP_NEAREST,[Tc]:r.NEAREST_MIPMAP_LINEAR,[Ki]:r.LINEAR,[Ih]:r.LINEAR_MIPMAP_NEAREST,[qs]:r.LINEAR_MIPMAP_LINEAR},z={[jM]:r.NEVER,[tE]:r.ALWAYS,[ZM]:r.LESS,[ax]:r.LEQUAL,[KM]:r.EQUAL,[$M]:r.GEQUAL,[QM]:r.GREATER,[JM]:r.NOTEQUAL};function st(N,R){if(R.type===Ta&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===Ki||R.magFilter===Ih||R.magFilter===Tc||R.magFilter===qs||R.minFilter===Ki||R.minFilter===Ih||R.minFilter===Tc||R.minFilter===qs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,St[R.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,St[R.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,St[R.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Tt[R.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Tt[R.minFilter]),R.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,z[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Hi||R.minFilter!==Tc&&R.minFilter!==qs||R.type===Ta&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||s.get(R).__currentAnisotropy){const at=t.get("EXT_texture_filter_anisotropic");r.texParameterf(N,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,l.getMaxAnisotropy())),s.get(R).__currentAnisotropy=R.anisotropy}}}function yt(N,R){let at=!1;N.__webglInit===void 0&&(N.__webglInit=!0,R.addEventListener("dispose",B));const pt=R.source;let Mt=v.get(pt);Mt===void 0&&(Mt={},v.set(pt,Mt));const gt=ct(R);if(gt!==N.__cacheKey){Mt[gt]===void 0&&(Mt[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,at=!0),Mt[gt].usedTimes++;const Wt=Mt[N.__cacheKey];Wt!==void 0&&(Mt[N.__cacheKey].usedTimes--,Wt.usedTimes===0&&L(R)),N.__cacheKey=gt,N.__webglTexture=Mt[gt].texture}return at}function K(N,R,at){let pt=r.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(pt=r.TEXTURE_2D_ARRAY),R.isData3DTexture&&(pt=r.TEXTURE_3D);const Mt=yt(N,R),gt=R.source;n.bindTexture(pt,N.__webglTexture,r.TEXTURE0+at);const Wt=s.get(gt);if(gt.version!==Wt.__version||Mt===!0){n.activeTexture(r.TEXTURE0+at);const Lt=Ae.getPrimaries(Ae.workingColorSpace),zt=R.colorSpace===us?null:Ae.getPrimaries(R.colorSpace),ve=R.colorSpace===us||Lt===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let At=T(R.image,!1,l.maxTextureSize);At=Oe(R,At);const Bt=c.convert(R.format,R.colorSpace),Kt=c.convert(R.type);let Yt=C(R.internalFormat,Bt,Kt,R.colorSpace,R.isVideoTexture);st(pt,R);let Pt;const te=R.mipmaps,oe=R.isVideoTexture!==!0,Ge=Wt.__version===void 0||Mt===!0,k=gt.dataReady,wt=V(R,At);if(R.isDepthTexture)Yt=A(R.format===Qr,R.type),Ge&&(oe?n.texStorage2D(r.TEXTURE_2D,1,Yt,At.width,At.height):n.texImage2D(r.TEXTURE_2D,0,Yt,At.width,At.height,0,Bt,Kt,null));else if(R.isDataTexture)if(te.length>0){oe&&Ge&&n.texStorage2D(r.TEXTURE_2D,wt,Yt,te[0].width,te[0].height);for(let ft=0,vt=te.length;ft<vt;ft++)Pt=te[ft],oe?k&&n.texSubImage2D(r.TEXTURE_2D,ft,0,0,Pt.width,Pt.height,Bt,Kt,Pt.data):n.texImage2D(r.TEXTURE_2D,ft,Yt,Pt.width,Pt.height,0,Bt,Kt,Pt.data);R.generateMipmaps=!1}else oe?(Ge&&n.texStorage2D(r.TEXTURE_2D,wt,Yt,At.width,At.height),k&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Kt,At.data)):n.texImage2D(r.TEXTURE_2D,0,Yt,At.width,At.height,0,Bt,Kt,At.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){oe&&Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Yt,te[0].width,te[0].height,At.depth);for(let ft=0,vt=te.length;ft<vt;ft++)if(Pt=te[ft],R.format!==Fi)if(Bt!==null)if(oe){if(k)if(R.layerUpdates.size>0){const Ct=Mv(Pt.width,Pt.height,R.format,R.type);for(const Nt of R.layerUpdates){const ne=Pt.data.subarray(Nt*Ct/Pt.data.BYTES_PER_ELEMENT,(Nt+1)*Ct/Pt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ft,0,0,Nt,Pt.width,Pt.height,1,Bt,ne)}R.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ft,0,0,0,Pt.width,Pt.height,At.depth,Bt,Pt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ft,Yt,Pt.width,Pt.height,At.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?k&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,ft,0,0,0,Pt.width,Pt.height,At.depth,Bt,Kt,Pt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,ft,Yt,Pt.width,Pt.height,At.depth,0,Bt,Kt,Pt.data)}else{oe&&Ge&&n.texStorage2D(r.TEXTURE_2D,wt,Yt,te[0].width,te[0].height);for(let ft=0,vt=te.length;ft<vt;ft++)Pt=te[ft],R.format!==Fi?Bt!==null?oe?k&&n.compressedTexSubImage2D(r.TEXTURE_2D,ft,0,0,Pt.width,Pt.height,Bt,Pt.data):n.compressedTexImage2D(r.TEXTURE_2D,ft,Yt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?k&&n.texSubImage2D(r.TEXTURE_2D,ft,0,0,Pt.width,Pt.height,Bt,Kt,Pt.data):n.texImage2D(r.TEXTURE_2D,ft,Yt,Pt.width,Pt.height,0,Bt,Kt,Pt.data)}else if(R.isDataArrayTexture)if(oe){if(Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,Yt,At.width,At.height,At.depth),k)if(R.layerUpdates.size>0){const ft=Mv(At.width,At.height,R.format,R.type);for(const vt of R.layerUpdates){const Ct=At.data.subarray(vt*ft/At.data.BYTES_PER_ELEMENT,(vt+1)*ft/At.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,vt,At.width,At.height,1,Bt,Kt,Ct)}R.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Yt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(R.isData3DTexture)oe?(Ge&&n.texStorage3D(r.TEXTURE_3D,wt,Yt,At.width,At.height,At.depth),k&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)):n.texImage3D(r.TEXTURE_3D,0,Yt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(R.isFramebufferTexture){if(Ge)if(oe)n.texStorage2D(r.TEXTURE_2D,wt,Yt,At.width,At.height);else{let ft=At.width,vt=At.height;for(let Ct=0;Ct<wt;Ct++)n.texImage2D(r.TEXTURE_2D,Ct,Yt,ft,vt,0,Bt,Kt,null),ft>>=1,vt>>=1}}else if(te.length>0){if(oe&&Ge){const ft=Zt(te[0]);n.texStorage2D(r.TEXTURE_2D,wt,Yt,ft.width,ft.height)}for(let ft=0,vt=te.length;ft<vt;ft++)Pt=te[ft],oe?k&&n.texSubImage2D(r.TEXTURE_2D,ft,0,0,Bt,Kt,Pt):n.texImage2D(r.TEXTURE_2D,ft,Yt,Bt,Kt,Pt);R.generateMipmaps=!1}else if(oe){if(Ge){const ft=Zt(At);n.texStorage2D(r.TEXTURE_2D,wt,Yt,ft.width,ft.height)}k&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Kt,At)}else n.texImage2D(r.TEXTURE_2D,0,Yt,Bt,Kt,At);S(R)&&x(pt),Wt.__version=gt.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function ht(N,R,at){if(R.image.length!==6)return;const pt=yt(N,R),Mt=R.source;n.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+at);const gt=s.get(Mt);if(Mt.version!==gt.__version||pt===!0){n.activeTexture(r.TEXTURE0+at);const Wt=Ae.getPrimaries(Ae.workingColorSpace),Lt=R.colorSpace===us?null:Ae.getPrimaries(R.colorSpace),zt=R.colorSpace===us||Wt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const ve=R.isCompressedTexture||R.image[0].isCompressedTexture,At=R.image[0]&&R.image[0].isDataTexture,Bt=[];for(let vt=0;vt<6;vt++)!ve&&!At?Bt[vt]=T(R.image[vt],!0,l.maxCubemapSize):Bt[vt]=At?R.image[vt].image:R.image[vt],Bt[vt]=Oe(R,Bt[vt]);const Kt=Bt[0],Yt=c.convert(R.format,R.colorSpace),Pt=c.convert(R.type),te=C(R.internalFormat,Yt,Pt,R.colorSpace),oe=R.isVideoTexture!==!0,Ge=gt.__version===void 0||pt===!0,k=Mt.dataReady;let wt=V(R,Kt);st(r.TEXTURE_CUBE_MAP,R);let ft;if(ve){oe&&Ge&&n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,Kt.width,Kt.height);for(let vt=0;vt<6;vt++){ft=Bt[vt].mipmaps;for(let Ct=0;Ct<ft.length;Ct++){const Nt=ft[Ct];R.format!==Fi?Yt!==null?oe?k&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Nt.width,Nt.height,Yt,Nt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,te,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,0,0,Nt.width,Nt.height,Yt,Pt,Nt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct,te,Nt.width,Nt.height,0,Yt,Pt,Nt.data)}}}else{if(ft=R.mipmaps,oe&&Ge){ft.length>0&&wt++;const vt=Zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(At){oe?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt[vt].width,Bt[vt].height,Yt,Pt,Bt[vt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Bt[vt].width,Bt[vt].height,0,Yt,Pt,Bt[vt].data);for(let Ct=0;Ct<ft.length;Ct++){const ne=ft[Ct].image[vt].image;oe?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,ne.width,ne.height,Yt,Pt,ne.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,te,ne.width,ne.height,0,Yt,Pt,ne.data)}}else{oe?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Yt,Pt,Bt[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Yt,Pt,Bt[vt]);for(let Ct=0;Ct<ft.length;Ct++){const Nt=ft[Ct];oe?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,0,0,Yt,Pt,Nt.image[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ct+1,te,Yt,Pt,Nt.image[vt])}}}S(R)&&x(r.TEXTURE_CUBE_MAP),gt.__version=Mt.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function Et(N,R,at,pt,Mt,gt){const Wt=c.convert(at.format,at.colorSpace),Lt=c.convert(at.type),zt=C(at.internalFormat,Wt,Lt,at.colorSpace),ve=s.get(R),At=s.get(at);if(At.__renderTarget=R,!ve.__hasExternalTextures){const Bt=Math.max(1,R.width>>gt),Kt=Math.max(1,R.height>>gt);Mt===r.TEXTURE_3D||Mt===r.TEXTURE_2D_ARRAY?n.texImage3D(Mt,gt,zt,Bt,Kt,R.depth,0,Wt,Lt,null):n.texImage2D(Mt,gt,zt,Bt,Kt,0,Wt,Lt,null)}n.bindFramebuffer(r.FRAMEBUFFER,N),_e(R)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pt,Mt,At.__webglTexture,0,he(R)):(Mt===r.TEXTURE_2D||Mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,pt,Mt,At.__webglTexture,gt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function xt(N,R,at){if(r.bindRenderbuffer(r.RENDERBUFFER,N),R.depthBuffer){const pt=R.depthTexture,Mt=pt&&pt.isDepthTexture?pt.type:null,gt=A(R.stencilBuffer,Mt),Wt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=he(R);_e(R)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt,gt,R.width,R.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,gt,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,gt,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,N)}else{const pt=R.textures;for(let Mt=0;Mt<pt.length;Mt++){const gt=pt[Mt],Wt=c.convert(gt.format,gt.colorSpace),Lt=c.convert(gt.type),zt=C(gt.internalFormat,Wt,Lt,gt.colorSpace),ve=he(R);at&&_e(R)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,zt,R.width,R.height):_e(R)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,zt,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,zt,R.width,R.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Vt(N,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,N),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pt=s.get(R.depthTexture);pt.__renderTarget=R,(!pt.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),ut(R.depthTexture,0);const Mt=pt.__webglTexture,gt=he(R);if(R.depthTexture.format===qr)_e(R)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0);else if(R.depthTexture.format===Qr)_e(R)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Gt(N){const R=s.get(N),at=N.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==N.depthTexture){const pt=N.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),pt){const Mt=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,pt.removeEventListener("dispose",Mt)};pt.addEventListener("dispose",Mt),R.__depthDisposeCallback=Mt}R.__boundDepthTexture=pt}if(N.depthTexture&&!R.__autoAllocateDepthBuffer){if(at)throw new Error("target.depthTexture not supported in Cube render targets");Vt(R.__webglFramebuffer,N)}else if(at){R.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(n.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer[pt]),R.__webglDepthbuffer[pt]===void 0)R.__webglDepthbuffer[pt]=r.createRenderbuffer(),xt(R.__webglDepthbuffer[pt],N,!1);else{const Mt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=R.__webglDepthbuffer[pt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,gt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=r.createRenderbuffer(),xt(R.__webglDepthbuffer,N,!1);else{const pt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=R.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,pt,r.RENDERBUFFER,Mt)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function se(N,R,at){const pt=s.get(N);R!==void 0&&Et(pt.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),at!==void 0&&Gt(N)}function He(N){const R=N.texture,at=s.get(N),pt=s.get(R);N.addEventListener("dispose",O);const Mt=N.textures,gt=N.isWebGLCubeRenderTarget===!0,Wt=Mt.length>1;if(Wt||(pt.__webglTexture===void 0&&(pt.__webglTexture=r.createTexture()),pt.__version=R.version,f.memory.textures++),gt){at.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(R.mipmaps&&R.mipmaps.length>0){at.__webglFramebuffer[Lt]=[];for(let zt=0;zt<R.mipmaps.length;zt++)at.__webglFramebuffer[Lt][zt]=r.createFramebuffer()}else at.__webglFramebuffer[Lt]=r.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){at.__webglFramebuffer=[];for(let Lt=0;Lt<R.mipmaps.length;Lt++)at.__webglFramebuffer[Lt]=r.createFramebuffer()}else at.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let Lt=0,zt=Mt.length;Lt<zt;Lt++){const ve=s.get(Mt[Lt]);ve.__webglTexture===void 0&&(ve.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&_e(N)===!1){at.__webglMultisampledFramebuffer=r.createFramebuffer(),at.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let Lt=0;Lt<Mt.length;Lt++){const zt=Mt[Lt];at.__webglColorRenderbuffer[Lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,at.__webglColorRenderbuffer[Lt]);const ve=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=C(zt.internalFormat,ve,At,zt.colorSpace,N.isXRRenderTarget===!0),Kt=he(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,Bt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Lt,r.RENDERBUFFER,at.__webglColorRenderbuffer[Lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(at.__webglDepthRenderbuffer=r.createRenderbuffer(),xt(at.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){n.bindTexture(r.TEXTURE_CUBE_MAP,pt.__webglTexture),st(r.TEXTURE_CUBE_MAP,R);for(let Lt=0;Lt<6;Lt++)if(R.mipmaps&&R.mipmaps.length>0)for(let zt=0;zt<R.mipmaps.length;zt++)Et(at.__webglFramebuffer[Lt][zt],N,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,zt);else Et(at.__webglFramebuffer[Lt],N,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);S(R)&&x(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Wt){for(let Lt=0,zt=Mt.length;Lt<zt;Lt++){const ve=Mt[Lt],At=s.get(ve);n.bindTexture(r.TEXTURE_2D,At.__webglTexture),st(r.TEXTURE_2D,ve),Et(at.__webglFramebuffer,N,ve,r.COLOR_ATTACHMENT0+Lt,r.TEXTURE_2D,0),S(ve)&&x(r.TEXTURE_2D)}n.unbindTexture()}else{let Lt=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Lt=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Lt,pt.__webglTexture),st(Lt,R),R.mipmaps&&R.mipmaps.length>0)for(let zt=0;zt<R.mipmaps.length;zt++)Et(at.__webglFramebuffer[zt],N,R,r.COLOR_ATTACHMENT0,Lt,zt);else Et(at.__webglFramebuffer,N,R,r.COLOR_ATTACHMENT0,Lt,0);S(R)&&x(Lt),n.unbindTexture()}N.depthBuffer&&Gt(N)}function de(N){const R=N.textures;for(let at=0,pt=R.length;at<pt;at++){const Mt=R[at];if(S(Mt)){const gt=U(N),Wt=s.get(Mt).__webglTexture;n.bindTexture(gt,Wt),x(gt),n.unbindTexture()}}}const Ke=[],W=[];function On(N){if(N.samples>0){if(_e(N)===!1){const R=N.textures,at=N.width,pt=N.height;let Mt=r.COLOR_BUFFER_BIT;const gt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=s.get(N),Lt=R.length>1;if(Lt)for(let zt=0;zt<R.length;zt++)n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let zt=0;zt<R.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Mt|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Mt|=r.STENCIL_BUFFER_BIT)),Lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const ve=s.get(R[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ve,0)}r.blitFramebuffer(0,0,at,pt,0,0,at,pt,Mt,r.NEAREST),p===!0&&(Ke.length=0,W.length=0,Ke.push(r.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Ke.push(gt),W.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,W)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ke))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Lt)for(let zt=0;zt<R.length;zt++){n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const ve=s.get(R[zt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,ve,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&p){const R=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[R])}}}function he(N){return Math.min(l.maxSamples,N.samples)}function _e(N){const R=s.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Qt(N){const R=f.render.frame;g.get(N)!==R&&(g.set(N,R),N.update())}function Oe(N,R){const at=N.colorSpace,pt=N.format,Mt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||at!==to&&at!==us&&(Ae.getTransfer(at)===Fe?(pt!==Fi||Mt!==wa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",at)),R}function Zt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(m.width=N.naturalWidth||N.width,m.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(m.width=N.displayWidth,m.height=N.displayHeight):(m.width=N.width,m.height=N.height),m}this.allocateTextureUnit=J,this.resetTextureUnits=Q,this.setTexture2D=ut,this.setTexture2DArray=P,this.setTexture3D=j,this.setTextureCube=Z,this.rebindTextures=se,this.setupRenderTarget=He,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=On,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=_e}function i2(r,t){function n(s,l=us){let c;const f=Ae.getTransfer(l);if(s===wa)return r.UNSIGNED_BYTE;if(s===up)return r.UNSIGNED_SHORT_4_4_4_4;if(s===fp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Kv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===jv)return r.BYTE;if(s===Zv)return r.SHORT;if(s===ll)return r.UNSIGNED_SHORT;if(s===cp)return r.INT;if(s===Ws)return r.UNSIGNED_INT;if(s===Ta)return r.FLOAT;if(s===$r)return r.HALF_FLOAT;if(s===Qv)return r.ALPHA;if(s===Jv)return r.RGB;if(s===Fi)return r.RGBA;if(s===$v)return r.LUMINANCE;if(s===tx)return r.LUMINANCE_ALPHA;if(s===qr)return r.DEPTH_COMPONENT;if(s===Qr)return r.DEPTH_STENCIL;if(s===ex)return r.RED;if(s===hp)return r.RED_INTEGER;if(s===nx)return r.RG;if(s===dp)return r.RG_INTEGER;if(s===pp)return r.RGBA_INTEGER;if(s===tu||s===eu||s===nu||s===iu)if(f===Fe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===tu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===eu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===iu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===tu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===eu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===nu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===iu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Dd||s===Ud||s===Ld||s===Nd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Dd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ud)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ld)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Nd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Od||s===Pd||s===zd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Od||s===Pd)return f===Fe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===zd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Bd||s===Id||s===Fd||s===Hd||s===Gd||s===Vd||s===kd||s===Xd||s===qd||s===Wd||s===Yd||s===jd||s===Zd||s===Kd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Bd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Id)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Fd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Hd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Gd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Vd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===kd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Xd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===qd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Wd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Yd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===jd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Zd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Kd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===au||s===Qd||s===Jd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===au)return f===Fe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Qd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Jd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ix||s===$d||s===tp||s===ep)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===au)return c.COMPRESSED_RED_RGTC1_EXT;if(s===$d)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===tp)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ep)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Kr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:n}}class a2 extends Ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ea extends qn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const s2={type:"move"};class dd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ea,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ea,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ea,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const s of t.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,s){let l=null,c=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(m&&t.hand){f=!0;for(const T of t.hand.values()){const S=n.getJointPose(T,s),x=this._getHandJoint(m,T);S!==null&&(x.matrix.fromArray(S.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=S.radius),x.visible=S!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],v=g.position.distanceTo(_.position),M=.02,E=.005;m.inputState.pinching&&v>M+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&v<=M-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,s),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(l=n.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(s2)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const s=new Ea;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[n.jointName]=s,t.add(s)}return t.joints[n.jointName]}}const r2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,o2=`
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

}`;class l2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,s){if(this.texture===null){const l=new Xn,c=t.properties.get(l);c.__webglTexture=n.texture,(n.depthNear!=s.depthNear||n.depthFar!=s.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,s=new Gi({vertexShader:r2,fragmentShader:o2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new tn(new gu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class c2 extends eo{constructor(t,n){super();const s=this;let l=null,c=1,f=null,h="local-floor",p=1,m=null,g=null,_=null,v=null,M=null,E=null;const T=new l2,S=n.getContextAttributes();let x=null,U=null;const C=[],A=[],V=new Re;let B=null;const O=new Ri;O.viewport=new cn;const H=new Ri;H.viewport=new cn;const L=[O,H],w=new a2;let F=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ht=C[K];return ht===void 0&&(ht=new dd,C[K]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(K){let ht=C[K];return ht===void 0&&(ht=new dd,C[K]=ht),ht.getGripSpace()},this.getHand=function(K){let ht=C[K];return ht===void 0&&(ht=new dd,C[K]=ht),ht.getHandSpace()};function J(K){const ht=A.indexOf(K.inputSource);if(ht===-1)return;const Et=C[ht];Et!==void 0&&(Et.update(K.inputSource,K.frame,m||f),Et.dispatchEvent({type:K.type,data:K.inputSource}))}function ct(){l.removeEventListener("select",J),l.removeEventListener("selectstart",J),l.removeEventListener("selectend",J),l.removeEventListener("squeeze",J),l.removeEventListener("squeezestart",J),l.removeEventListener("squeezeend",J),l.removeEventListener("end",ct),l.removeEventListener("inputsourceschange",ut);for(let K=0;K<C.length;K++){const ht=A[K];ht!==null&&(A[K]=null,C[K].disconnect(ht))}F=null,Q=null,T.reset(),t.setRenderTarget(x),M=null,v=null,_=null,l=null,U=null,yt.stop(),s.isPresenting=!1,t.setPixelRatio(B),t.setSize(V.width,V.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){c=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){h=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(K){m=K},this.getBaseLayer=function(){return v!==null?v:M},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(x=t.getRenderTarget(),l.addEventListener("select",J),l.addEventListener("selectstart",J),l.addEventListener("selectend",J),l.addEventListener("squeeze",J),l.addEventListener("squeezestart",J),l.addEventListener("squeezeend",J),l.addEventListener("end",ct),l.addEventListener("inputsourceschange",ut),S.xrCompatible!==!0&&await n.makeXRCompatible(),B=t.getPixelRatio(),t.getSize(V),l.renderState.layers===void 0){const ht={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,ht),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),U=new ms(M.framebufferWidth,M.framebufferHeight,{format:Fi,type:wa,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let ht=null,Et=null,xt=null;S.depth&&(xt=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ht=S.stencil?Qr:qr,Et=S.stencil?Kr:Ws);const Vt={colorFormat:n.RGBA8,depthFormat:xt,scaleFactor:c};_=new XRWebGLBinding(l,n),v=_.createProjectionLayer(Vt),l.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),U=new ms(v.textureWidth,v.textureHeight,{format:Fi,type:wa,depthTexture:new vx(v.textureWidth,v.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(h),yt.setContext(l),yt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function ut(K){for(let ht=0;ht<K.removed.length;ht++){const Et=K.removed[ht],xt=A.indexOf(Et);xt>=0&&(A[xt]=null,C[xt].disconnect(Et))}for(let ht=0;ht<K.added.length;ht++){const Et=K.added[ht];let xt=A.indexOf(Et);if(xt===-1){for(let Gt=0;Gt<C.length;Gt++)if(Gt>=A.length){A.push(Et),xt=Gt;break}else if(A[Gt]===null){A[Gt]=Et,xt=Gt;break}if(xt===-1)break}const Vt=C[xt];Vt&&Vt.connect(Et)}}const P=new $,j=new $;function Z(K,ht,Et){P.setFromMatrixPosition(ht.matrixWorld),j.setFromMatrixPosition(Et.matrixWorld);const xt=P.distanceTo(j),Vt=ht.projectionMatrix.elements,Gt=Et.projectionMatrix.elements,se=Vt[14]/(Vt[10]-1),He=Vt[14]/(Vt[10]+1),de=(Vt[9]+1)/Vt[5],Ke=(Vt[9]-1)/Vt[5],W=(Vt[8]-1)/Vt[0],On=(Gt[8]+1)/Gt[0],he=se*W,_e=se*On,Qt=xt/(-W+On),Oe=Qt*-W;if(ht.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Oe),K.translateZ(Qt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Vt[10]===-1)K.projectionMatrix.copy(ht.projectionMatrix),K.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const Zt=se+Qt,N=He+Qt,R=he-Oe,at=_e+(xt-Oe),pt=de*He/N*Zt,Mt=Ke*He/N*Zt;K.projectionMatrix.makePerspective(R,at,pt,Mt,Zt,N),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function St(K,ht){ht===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ht.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let ht=K.near,Et=K.far;T.texture!==null&&(T.depthNear>0&&(ht=T.depthNear),T.depthFar>0&&(Et=T.depthFar)),w.near=H.near=O.near=ht,w.far=H.far=O.far=Et,(F!==w.near||Q!==w.far)&&(l.updateRenderState({depthNear:w.near,depthFar:w.far}),F=w.near,Q=w.far),O.layers.mask=K.layers.mask|2,H.layers.mask=K.layers.mask|4,w.layers.mask=O.layers.mask|H.layers.mask;const xt=K.parent,Vt=w.cameras;St(w,xt);for(let Gt=0;Gt<Vt.length;Gt++)St(Vt[Gt],xt);Vt.length===2?Z(w,O,H):w.projectionMatrix.copy(O.projectionMatrix),Tt(K,w,xt)};function Tt(K,ht,Et){Et===null?K.matrix.copy(ht.matrixWorld):(K.matrix.copy(Et.matrixWorld),K.matrix.invert(),K.matrix.multiply(ht.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ht.projectionMatrix),K.projectionMatrixInverse.copy(ht.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=np*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(v===null&&M===null))return p},this.setFoveation=function(K){p=K,v!==null&&(v.fixedFoveation=K),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=K)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(w)};let z=null;function st(K,ht){if(g=ht.getViewerPose(m||f),E=ht,g!==null){const Et=g.views;M!==null&&(t.setRenderTargetFramebuffer(U,M.framebuffer),t.setRenderTarget(U));let xt=!1;Et.length!==w.cameras.length&&(w.cameras.length=0,xt=!0);for(let Gt=0;Gt<Et.length;Gt++){const se=Et[Gt];let He=null;if(M!==null)He=M.getViewport(se);else{const Ke=_.getViewSubImage(v,se);He=Ke.viewport,Gt===0&&(t.setRenderTargetTextures(U,Ke.colorTexture,v.ignoreDepthValues?void 0:Ke.depthStencilTexture),t.setRenderTarget(U))}let de=L[Gt];de===void 0&&(de=new Ri,de.layers.enable(Gt),de.viewport=new cn,L[Gt]=de),de.matrix.fromArray(se.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(se.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(He.x,He.y,He.width,He.height),Gt===0&&(w.matrix.copy(de.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),xt===!0&&w.cameras.push(de)}const Vt=l.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const Gt=_.getDepthInformation(Et[0]);Gt&&Gt.isValid&&Gt.texture&&T.init(t,Gt,l.renderState)}}for(let Et=0;Et<C.length;Et++){const xt=A[Et],Vt=C[Et];xt!==null&&Vt!==void 0&&Vt.update(xt,ht,m||f)}z&&z(K,ht),ht.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ht}),E=null}const yt=new gx;yt.setAnimationLoop(st),this.setAnimationLoop=function(K){z=K},this.dispose=function(){}}}const Fs=new Ca,u2=new sn;function f2(r,t){function n(S,x){S.matrixAutoUpdate===!0&&S.updateMatrix(),x.value.copy(S.matrix)}function s(S,x){x.color.getRGB(S.fogColor.value,hx(r)),x.isFog?(S.fogNear.value=x.near,S.fogFar.value=x.far):x.isFogExp2&&(S.fogDensity.value=x.density)}function l(S,x,U,C,A){x.isMeshBasicMaterial||x.isMeshLambertMaterial?c(S,x):x.isMeshToonMaterial?(c(S,x),_(S,x)):x.isMeshPhongMaterial?(c(S,x),g(S,x)):x.isMeshStandardMaterial?(c(S,x),v(S,x),x.isMeshPhysicalMaterial&&M(S,x,A)):x.isMeshMatcapMaterial?(c(S,x),E(S,x)):x.isMeshDepthMaterial?c(S,x):x.isMeshDistanceMaterial?(c(S,x),T(S,x)):x.isMeshNormalMaterial?c(S,x):x.isLineBasicMaterial?(f(S,x),x.isLineDashedMaterial&&h(S,x)):x.isPointsMaterial?p(S,x,U,C):x.isSpriteMaterial?m(S,x):x.isShadowMaterial?(S.color.value.copy(x.color),S.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function c(S,x){S.opacity.value=x.opacity,x.color&&S.diffuse.value.copy(x.color),x.emissive&&S.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(S.map.value=x.map,n(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,n(x.alphaMap,S.alphaMapTransform)),x.bumpMap&&(S.bumpMap.value=x.bumpMap,n(x.bumpMap,S.bumpMapTransform),S.bumpScale.value=x.bumpScale,x.side===Hn&&(S.bumpScale.value*=-1)),x.normalMap&&(S.normalMap.value=x.normalMap,n(x.normalMap,S.normalMapTransform),S.normalScale.value.copy(x.normalScale),x.side===Hn&&S.normalScale.value.negate()),x.displacementMap&&(S.displacementMap.value=x.displacementMap,n(x.displacementMap,S.displacementMapTransform),S.displacementScale.value=x.displacementScale,S.displacementBias.value=x.displacementBias),x.emissiveMap&&(S.emissiveMap.value=x.emissiveMap,n(x.emissiveMap,S.emissiveMapTransform)),x.specularMap&&(S.specularMap.value=x.specularMap,n(x.specularMap,S.specularMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest);const U=t.get(x),C=U.envMap,A=U.envMapRotation;C&&(S.envMap.value=C,Fs.copy(A),Fs.x*=-1,Fs.y*=-1,Fs.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Fs.y*=-1,Fs.z*=-1),S.envMapRotation.value.setFromMatrix4(u2.makeRotationFromEuler(Fs)),S.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=x.reflectivity,S.ior.value=x.ior,S.refractionRatio.value=x.refractionRatio),x.lightMap&&(S.lightMap.value=x.lightMap,S.lightMapIntensity.value=x.lightMapIntensity,n(x.lightMap,S.lightMapTransform)),x.aoMap&&(S.aoMap.value=x.aoMap,S.aoMapIntensity.value=x.aoMapIntensity,n(x.aoMap,S.aoMapTransform))}function f(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,x.map&&(S.map.value=x.map,n(x.map,S.mapTransform))}function h(S,x){S.dashSize.value=x.dashSize,S.totalSize.value=x.dashSize+x.gapSize,S.scale.value=x.scale}function p(S,x,U,C){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.size.value=x.size*U,S.scale.value=C*.5,x.map&&(S.map.value=x.map,n(x.map,S.uvTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,n(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function m(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.rotation.value=x.rotation,x.map&&(S.map.value=x.map,n(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,n(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function g(S,x){S.specular.value.copy(x.specular),S.shininess.value=Math.max(x.shininess,1e-4)}function _(S,x){x.gradientMap&&(S.gradientMap.value=x.gradientMap)}function v(S,x){S.metalness.value=x.metalness,x.metalnessMap&&(S.metalnessMap.value=x.metalnessMap,n(x.metalnessMap,S.metalnessMapTransform)),S.roughness.value=x.roughness,x.roughnessMap&&(S.roughnessMap.value=x.roughnessMap,n(x.roughnessMap,S.roughnessMapTransform)),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)}function M(S,x,U){S.ior.value=x.ior,x.sheen>0&&(S.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),S.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(S.sheenColorMap.value=x.sheenColorMap,n(x.sheenColorMap,S.sheenColorMapTransform)),x.sheenRoughnessMap&&(S.sheenRoughnessMap.value=x.sheenRoughnessMap,n(x.sheenRoughnessMap,S.sheenRoughnessMapTransform))),x.clearcoat>0&&(S.clearcoat.value=x.clearcoat,S.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(S.clearcoatMap.value=x.clearcoatMap,n(x.clearcoatMap,S.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,n(x.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(S.clearcoatNormalMap.value=x.clearcoatNormalMap,n(x.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Hn&&S.clearcoatNormalScale.value.negate())),x.dispersion>0&&(S.dispersion.value=x.dispersion),x.iridescence>0&&(S.iridescence.value=x.iridescence,S.iridescenceIOR.value=x.iridescenceIOR,S.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(S.iridescenceMap.value=x.iridescenceMap,n(x.iridescenceMap,S.iridescenceMapTransform)),x.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=x.iridescenceThicknessMap,n(x.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),x.transmission>0&&(S.transmission.value=x.transmission,S.transmissionSamplerMap.value=U.texture,S.transmissionSamplerSize.value.set(U.width,U.height),x.transmissionMap&&(S.transmissionMap.value=x.transmissionMap,n(x.transmissionMap,S.transmissionMapTransform)),S.thickness.value=x.thickness,x.thicknessMap&&(S.thicknessMap.value=x.thicknessMap,n(x.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=x.attenuationDistance,S.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(S.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(S.anisotropyMap.value=x.anisotropyMap,n(x.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=x.specularIntensity,S.specularColor.value.copy(x.specularColor),x.specularColorMap&&(S.specularColorMap.value=x.specularColorMap,n(x.specularColorMap,S.specularColorMapTransform)),x.specularIntensityMap&&(S.specularIntensityMap.value=x.specularIntensityMap,n(x.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,x){x.matcap&&(S.matcap.value=x.matcap)}function T(S,x){const U=t.get(x).light;S.referencePosition.value.setFromMatrixPosition(U.matrixWorld),S.nearDistance.value=U.shadow.camera.near,S.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function h2(r,t,n,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(U,C){const A=C.program;s.uniformBlockBinding(U,A)}function m(U,C){let A=l[U.id];A===void 0&&(E(U),A=g(U),l[U.id]=A,U.addEventListener("dispose",S));const V=C.program;s.updateUBOMapping(U,V);const B=t.render.frame;c[U.id]!==B&&(v(U),c[U.id]=B)}function g(U){const C=_();U.__bindingPointIndex=C;const A=r.createBuffer(),V=U.__size,B=U.usage;return r.bindBuffer(r.UNIFORM_BUFFER,A),r.bufferData(r.UNIFORM_BUFFER,V,B),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,C,A),A}function _(){for(let U=0;U<h;U++)if(f.indexOf(U)===-1)return f.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(U){const C=l[U.id],A=U.uniforms,V=U.__cache;r.bindBuffer(r.UNIFORM_BUFFER,C);for(let B=0,O=A.length;B<O;B++){const H=Array.isArray(A[B])?A[B]:[A[B]];for(let L=0,w=H.length;L<w;L++){const F=H[L];if(M(F,B,L,V)===!0){const Q=F.__offset,J=Array.isArray(F.value)?F.value:[F.value];let ct=0;for(let ut=0;ut<J.length;ut++){const P=J[ut],j=T(P);typeof P=="number"||typeof P=="boolean"?(F.__data[0]=P,r.bufferSubData(r.UNIFORM_BUFFER,Q+ct,F.__data)):P.isMatrix3?(F.__data[0]=P.elements[0],F.__data[1]=P.elements[1],F.__data[2]=P.elements[2],F.__data[3]=0,F.__data[4]=P.elements[3],F.__data[5]=P.elements[4],F.__data[6]=P.elements[5],F.__data[7]=0,F.__data[8]=P.elements[6],F.__data[9]=P.elements[7],F.__data[10]=P.elements[8],F.__data[11]=0):(P.toArray(F.__data,ct),ct+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,Q,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(U,C,A,V){const B=U.value,O=C+"_"+A;if(V[O]===void 0)return typeof B=="number"||typeof B=="boolean"?V[O]=B:V[O]=B.clone(),!0;{const H=V[O];if(typeof B=="number"||typeof B=="boolean"){if(H!==B)return V[O]=B,!0}else if(H.equals(B)===!1)return H.copy(B),!0}return!1}function E(U){const C=U.uniforms;let A=0;const V=16;for(let O=0,H=C.length;O<H;O++){const L=Array.isArray(C[O])?C[O]:[C[O]];for(let w=0,F=L.length;w<F;w++){const Q=L[w],J=Array.isArray(Q.value)?Q.value:[Q.value];for(let ct=0,ut=J.length;ct<ut;ct++){const P=J[ct],j=T(P),Z=A%V,St=Z%j.boundary,Tt=Z+St;A+=St,Tt!==0&&V-Tt<j.storage&&(A+=V-Tt),Q.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=A,A+=j.storage}}}const B=A%V;return B>0&&(A+=V-B),U.__size=A,U.__cache={},this}function T(U){const C={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(C.boundary=4,C.storage=4):U.isVector2?(C.boundary=8,C.storage=8):U.isVector3||U.isColor?(C.boundary=16,C.storage=12):U.isVector4?(C.boundary=16,C.storage=16):U.isMatrix3?(C.boundary=48,C.storage=48):U.isMatrix4?(C.boundary=64,C.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),C}function S(U){const C=U.target;C.removeEventListener("dispose",S);const A=f.indexOf(C.__bindingPointIndex);f.splice(A,1),r.deleteBuffer(l[C.id]),delete l[C.id],delete c[C.id]}function x(){for(const U in l)r.deleteBuffer(l[U]);f=[],l={},c={}}return{bind:p,update:m,dispose:x}}class d2{constructor(t={}){const{canvas:n=nE(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:v=!1}=t;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),T=new Int32Array(4);let S=null,x=null;const U=[],C=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=di,this.toneMapping=ds,this.toneMappingExposure=1;const A=this;let V=!1,B=0,O=0,H=null,L=-1,w=null;const F=new cn,Q=new cn;let J=null;const ct=new ee(0);let ut=0,P=n.width,j=n.height,Z=1,St=null,Tt=null;const z=new cn(0,0,P,j),st=new cn(0,0,P,j);let yt=!1;const K=new mx;let ht=!1,Et=!1;const xt=new sn,Vt=new sn,Gt=new $,se=new cn,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Ke(){return H===null?Z:1}let W=s;function On(D,X){return n.getContext(D,X)}try{const D={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${lp}`),n.addEventListener("webglcontextlost",vt,!1),n.addEventListener("webglcontextrestored",Ct,!1),n.addEventListener("webglcontextcreationerror",Nt,!1),W===null){const X="webgl2";if(W=On(X,D),W===null)throw On(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let he,_e,Qt,Oe,Zt,N,R,at,pt,Mt,gt,Wt,Lt,zt,ve,At,Bt,Kt,Yt,Pt,te,oe,Ge,k;function wt(){he=new vb(W),he.init(),oe=new i2(W,he),_e=new hb(W,he,t,oe),Qt=new t2(W,he),_e.reverseDepthBuffer&&v&&Qt.buffers.depth.setReversed(!0),Oe=new Sb(W),Zt=new FA,N=new n2(W,he,Qt,Zt,_e,oe,Oe),R=new pb(A),at=new _b(A),pt=new wE(W),Ge=new ub(W,pt),Mt=new xb(W,pt,Oe,Ge),gt=new Eb(W,Mt,pt,Oe),Yt=new Mb(W,_e,N),At=new db(Zt),Wt=new IA(A,R,at,he,_e,Ge,At),Lt=new f2(A,Zt),zt=new GA,ve=new YA(he),Kt=new cb(A,R,at,Qt,gt,M,p),Bt=new JA(A,gt,_e),k=new h2(W,Oe,_e,Qt),Pt=new fb(W,he,Oe),te=new yb(W,he,Oe),Oe.programs=Wt.programs,A.capabilities=_e,A.extensions=he,A.properties=Zt,A.renderLists=zt,A.shadowMap=Bt,A.state=Qt,A.info=Oe}wt();const ft=new c2(A,W);this.xr=ft,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const D=he.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=he.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(D){D!==void 0&&(Z=D,this.setSize(P,j,!1))},this.getSize=function(D){return D.set(P,j)},this.setSize=function(D,X,ot=!0){if(ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=D,j=X,n.width=Math.floor(D*Z),n.height=Math.floor(X*Z),ot===!0&&(n.style.width=D+"px",n.style.height=X+"px"),this.setViewport(0,0,D,X)},this.getDrawingBufferSize=function(D){return D.set(P*Z,j*Z).floor()},this.setDrawingBufferSize=function(D,X,ot){P=D,j=X,Z=ot,n.width=Math.floor(D*ot),n.height=Math.floor(X*ot),this.setViewport(0,0,D,X)},this.getCurrentViewport=function(D){return D.copy(F)},this.getViewport=function(D){return D.copy(z)},this.setViewport=function(D,X,ot,rt){D.isVector4?z.set(D.x,D.y,D.z,D.w):z.set(D,X,ot,rt),Qt.viewport(F.copy(z).multiplyScalar(Z).round())},this.getScissor=function(D){return D.copy(st)},this.setScissor=function(D,X,ot,rt){D.isVector4?st.set(D.x,D.y,D.z,D.w):st.set(D,X,ot,rt),Qt.scissor(Q.copy(st).multiplyScalar(Z).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(D){Qt.setScissorTest(yt=D)},this.setOpaqueSort=function(D){St=D},this.setTransparentSort=function(D){Tt=D},this.getClearColor=function(D){return D.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(D=!0,X=!0,ot=!0){let rt=0;if(D){let q=!1;if(H!==null){const bt=H.texture.format;q=bt===pp||bt===dp||bt===hp}if(q){const bt=H.texture.type,Dt=bt===wa||bt===Ws||bt===ll||bt===Kr||bt===up||bt===fp,Ut=Kt.getClearColor(),kt=Kt.getClearAlpha(),ie=Ut.r,$t=Ut.g,It=Ut.b;Dt?(E[0]=ie,E[1]=$t,E[2]=It,E[3]=kt,W.clearBufferuiv(W.COLOR,0,E)):(T[0]=ie,T[1]=$t,T[2]=It,T[3]=kt,W.clearBufferiv(W.COLOR,0,T))}else rt|=W.COLOR_BUFFER_BIT}X&&(rt|=W.DEPTH_BUFFER_BIT),ot&&(rt|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",vt,!1),n.removeEventListener("webglcontextrestored",Ct,!1),n.removeEventListener("webglcontextcreationerror",Nt,!1),zt.dispose(),ve.dispose(),Zt.dispose(),R.dispose(),at.dispose(),gt.dispose(),Ge.dispose(),k.dispose(),Wt.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",ao),ft.removeEventListener("sessionend",so),Vi.stop()};function vt(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;const D=Oe.autoReset,X=Bt.enabled,ot=Bt.autoUpdate,rt=Bt.needsUpdate,q=Bt.type;wt(),Oe.autoReset=D,Bt.enabled=X,Bt.autoUpdate=ot,Bt.needsUpdate=rt,Bt.type=q}function Nt(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function ne(D){const X=D.target;X.removeEventListener("dispose",ne),Qe(X)}function Qe(D){_n(D),Zt.remove(D)}function _n(D){const X=Zt.get(D).programs;X!==void 0&&(X.forEach(function(ot){Wt.releaseProgram(ot)}),D.isShaderMaterial&&Wt.releaseShaderCache(D))}this.renderBufferDirect=function(D,X,ot,rt,q,bt){X===null&&(X=He);const Dt=q.isMesh&&q.matrixWorld.determinant()<0,Ut=oo(D,X,ot,rt,q);Qt.setMaterial(rt,Dt);let kt=ot.index,ie=1;if(rt.wireframe===!0){if(kt=Mt.getWireframeAttribute(ot),kt===void 0)return;ie=2}const $t=ot.drawRange,It=ot.attributes.position;let be=$t.start*ie,Pe=($t.start+$t.count)*ie;bt!==null&&(be=Math.max(be,bt.start*ie),Pe=Math.min(Pe,(bt.start+bt.count)*ie)),kt!==null?(be=Math.max(be,0),Pe=Math.min(Pe,kt.count)):It!=null&&(be=Math.max(be,0),Pe=Math.min(Pe,It.count));const Ve=Pe-be;if(Ve<0||Ve===1/0)return;Ge.setup(q,rt,Ut,ot,kt);let Pn,Me=Pt;if(kt!==null&&(Pn=pt.get(kt),Me=te,Me.setIndex(Pn)),q.isMesh)rt.wireframe===!0?(Qt.setLineWidth(rt.wireframeLinewidth*Ke()),Me.setMode(W.LINES)):Me.setMode(W.TRIANGLES);else if(q.isLine){let Xt=rt.linewidth;Xt===void 0&&(Xt=1),Qt.setLineWidth(Xt*Ke()),q.isLineSegments?Me.setMode(W.LINES):q.isLineLoop?Me.setMode(W.LINE_LOOP):Me.setMode(W.LINE_STRIP)}else q.isPoints?Me.setMode(W.POINTS):q.isSprite&&Me.setMode(W.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Me.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))Me.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Xt=q._multiDrawStarts,vn=q._multiDrawCounts,re=q._multiDrawCount,Wn=kt?pt.get(kt).bytesPerElement:1,Da=Zt.get(rt).currentProgram.getUniforms();for(let Cn=0;Cn<re;Cn++)Da.setValue(W,"_gl_DrawID",Cn),Me.render(Xt[Cn]/Wn,vn[Cn])}else if(q.isInstancedMesh)Me.renderInstances(be,Ve,q.count);else if(ot.isInstancedBufferGeometry){const Xt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,vn=Math.min(ot.instanceCount,Xt);Me.renderInstances(be,Ve,vn)}else Me.render(be,Ve)};function we(D,X,ot){D.transparent===!0&&D.side===Zi&&D.forceSinglePass===!1?(D.side=Hn,D.needsUpdate=!0,en(D,X,ot),D.side=ps,D.needsUpdate=!0,en(D,X,ot),D.side=Zi):en(D,X,ot)}this.compile=function(D,X,ot=null){ot===null&&(ot=D),x=ve.get(ot),x.init(X),C.push(x),ot.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(x.pushLight(q),q.castShadow&&x.pushShadow(q))}),D!==ot&&D.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(x.pushLight(q),q.castShadow&&x.pushShadow(q))}),x.setupLights();const rt=new Set;return D.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const bt=q.material;if(bt)if(Array.isArray(bt))for(let Dt=0;Dt<bt.length;Dt++){const Ut=bt[Dt];we(Ut,ot,q),rt.add(Ut)}else we(bt,ot,q),rt.add(bt)}),C.pop(),x=null,rt},this.compileAsync=function(D,X,ot=null){const rt=this.compile(D,X,ot);return new Promise(q=>{function bt(){if(rt.forEach(function(Dt){Zt.get(Dt).currentProgram.isReady()&&rt.delete(Dt)}),rt.size===0){q(D);return}setTimeout(bt,10)}he.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let Rn=null;function Ci(D){Rn&&Rn(D)}function ao(){Vi.stop()}function so(){Vi.start()}const Vi=new gx;Vi.setAnimationLoop(Ci),typeof self<"u"&&Vi.setContext(self),this.setAnimationLoop=function(D){Rn=D,ft.setAnimationLoop(D),D===null?Vi.stop():Vi.start()},ft.addEventListener("sessionstart",ao),ft.addEventListener("sessionend",so),this.render=function(D,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(X),X=ft.getCamera()),D.isScene===!0&&D.onBeforeRender(A,D,X,H),x=ve.get(D,C.length),x.init(X),C.push(x),Vt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),K.setFromProjectionMatrix(Vt),Et=this.localClippingEnabled,ht=At.init(this.clippingPlanes,Et),S=zt.get(D,U.length),S.init(),U.push(S),ft.enabled===!0&&ft.isPresenting===!0){const bt=A.xr.getDepthSensingMesh();bt!==null&&gs(bt,X,-1/0,A.sortObjects)}gs(D,X,0,A.sortObjects),S.finish(),A.sortObjects===!0&&S.sort(St,Tt),de=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,de&&Kt.addToRenderList(S,D),this.info.render.frame++,ht===!0&&At.beginShadows();const ot=x.state.shadowsArray;Bt.render(ot,D,X),ht===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,q=S.transmissive;if(x.setupLights(),X.isArrayCamera){const bt=X.cameras;if(q.length>0)for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++){const kt=bt[Dt];ro(rt,q,D,kt)}de&&Kt.render(D);for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++){const kt=bt[Dt];Ys(S,D,kt,kt.viewport)}}else q.length>0&&ro(rt,q,D,X),de&&Kt.render(D),Ys(S,D,X);H!==null&&(N.updateMultisampleRenderTarget(H),N.updateRenderTargetMipmap(H)),D.isScene===!0&&D.onAfterRender(A,D,X),Ge.resetDefaultState(),L=-1,w=null,C.pop(),C.length>0?(x=C[C.length-1],ht===!0&&At.setGlobalState(A.clippingPlanes,x.state.camera)):x=null,U.pop(),U.length>0?S=U[U.length-1]:S=null};function gs(D,X,ot,rt){if(D.visible===!1)return;if(D.layers.test(X.layers)){if(D.isGroup)ot=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(X);else if(D.isLight)x.pushLight(D),D.castShadow&&x.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||K.intersectsSprite(D)){rt&&se.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Vt);const Dt=gt.update(D),Ut=D.material;Ut.visible&&S.push(D,Dt,Ut,ot,se.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||K.intersectsObject(D))){const Dt=gt.update(D),Ut=D.material;if(rt&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),se.copy(D.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),se.copy(Dt.boundingSphere.center)),se.applyMatrix4(D.matrixWorld).applyMatrix4(Vt)),Array.isArray(Ut)){const kt=Dt.groups;for(let ie=0,$t=kt.length;ie<$t;ie++){const It=kt[ie],be=Ut[It.materialIndex];be&&be.visible&&S.push(D,Dt,be,ot,se.z,It)}}else Ut.visible&&S.push(D,Dt,Ut,ot,se.z,null)}}const bt=D.children;for(let Dt=0,Ut=bt.length;Dt<Ut;Dt++)gs(bt[Dt],X,ot,rt)}function Ys(D,X,ot,rt){const q=D.opaque,bt=D.transmissive,Dt=D.transparent;x.setupLightsView(ot),ht===!0&&At.setGlobalState(A.clippingPlanes,ot),rt&&Qt.viewport(F.copy(rt)),q.length>0&&_s(q,X,ot),bt.length>0&&_s(bt,X,ot),Dt.length>0&&_s(Dt,X,ot),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function ro(D,X,ot,rt){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;x.state.transmissionRenderTarget[rt.id]===void 0&&(x.state.transmissionRenderTarget[rt.id]=new ms(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?$r:wa,minFilter:qs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ae.workingColorSpace}));const bt=x.state.transmissionRenderTarget[rt.id],Dt=rt.viewport||F;bt.setSize(Dt.z,Dt.w);const Ut=A.getRenderTarget();A.setRenderTarget(bt),A.getClearColor(ct),ut=A.getClearAlpha(),ut<1&&A.setClearColor(16777215,.5),A.clear(),de&&Kt.render(ot);const kt=A.toneMapping;A.toneMapping=ds;const ie=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),x.setupLightsView(rt),ht===!0&&At.setGlobalState(A.clippingPlanes,rt),_s(D,ot,rt),N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt),he.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let It=0,be=X.length;It<be;It++){const Pe=X[It],Ve=Pe.object,Pn=Pe.geometry,Me=Pe.material,Xt=Pe.group;if(Me.side===Zi&&Ve.layers.test(rt.layers)){const vn=Me.side;Me.side=Hn,Me.needsUpdate=!0,Di(Ve,ot,rt,Pn,Me,Xt),Me.side=vn,Me.needsUpdate=!0,$t=!0}}$t===!0&&(N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt))}A.setRenderTarget(Ut),A.setClearColor(ct,ut),ie!==void 0&&(rt.viewport=ie),A.toneMapping=kt}function _s(D,X,ot){const rt=X.isScene===!0?X.overrideMaterial:null;for(let q=0,bt=D.length;q<bt;q++){const Dt=D[q],Ut=Dt.object,kt=Dt.geometry,ie=rt===null?Dt.material:rt,$t=Dt.group;Ut.layers.test(ot.layers)&&Di(Ut,X,ot,kt,ie,$t)}}function Di(D,X,ot,rt,q,bt){D.onBeforeRender(A,X,ot,rt,q,bt),D.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),q.onBeforeRender(A,X,ot,rt,D,bt),q.transparent===!0&&q.side===Zi&&q.forceSinglePass===!1?(q.side=Hn,q.needsUpdate=!0,A.renderBufferDirect(ot,X,rt,q,D,bt),q.side=ps,q.needsUpdate=!0,A.renderBufferDirect(ot,X,rt,q,D,bt),q.side=Zi):A.renderBufferDirect(ot,X,rt,q,D,bt),D.onAfterRender(A,X,ot,rt,q,bt)}function en(D,X,ot){X.isScene!==!0&&(X=He);const rt=Zt.get(D),q=x.state.lights,bt=x.state.shadowsArray,Dt=q.state.version,Ut=Wt.getParameters(D,q.state,bt,X,ot),kt=Wt.getProgramCacheKey(Ut);let ie=rt.programs;rt.environment=D.isMeshStandardMaterial?X.environment:null,rt.fog=X.fog,rt.envMap=(D.isMeshStandardMaterial?at:R).get(D.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&D.envMap===null?X.environmentRotation:D.envMapRotation,ie===void 0&&(D.addEventListener("dispose",ne),ie=new Map,rt.programs=ie);let $t=ie.get(kt);if($t!==void 0){if(rt.currentProgram===$t&&rt.lightsStateVersion===Dt)return Qi(D,Ut),$t}else Ut.uniforms=Wt.getUniforms(D),D.onBeforeCompile(Ut,A),$t=Wt.acquireProgram(Ut,kt),ie.set(kt,$t),rt.uniforms=Ut.uniforms;const It=rt.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(It.clippingPlanes=At.uniform),Qi(D,Ut),rt.needsLights=xu(D),rt.lightsStateVersion=Dt,rt.needsLights&&(It.ambientLightColor.value=q.state.ambient,It.lightProbe.value=q.state.probe,It.directionalLights.value=q.state.directional,It.directionalLightShadows.value=q.state.directionalShadow,It.spotLights.value=q.state.spot,It.spotLightShadows.value=q.state.spotShadow,It.rectAreaLights.value=q.state.rectArea,It.ltc_1.value=q.state.rectAreaLTC1,It.ltc_2.value=q.state.rectAreaLTC2,It.pointLights.value=q.state.point,It.pointLightShadows.value=q.state.pointShadow,It.hemisphereLights.value=q.state.hemi,It.directionalShadowMap.value=q.state.directionalShadowMap,It.directionalShadowMatrix.value=q.state.directionalShadowMatrix,It.spotShadowMap.value=q.state.spotShadowMap,It.spotLightMatrix.value=q.state.spotLightMatrix,It.spotLightMap.value=q.state.spotLightMap,It.pointShadowMap.value=q.state.pointShadowMap,It.pointShadowMatrix.value=q.state.pointShadowMatrix),rt.currentProgram=$t,rt.uniformsList=null,$t}function wn(D){if(D.uniformsList===null){const X=D.currentProgram.getUniforms();D.uniformsList=su.seqWithValue(X.seq,D.uniforms)}return D.uniformsList}function Qi(D,X){const ot=Zt.get(D);ot.outputColorSpace=X.outputColorSpace,ot.batching=X.batching,ot.batchingColor=X.batchingColor,ot.instancing=X.instancing,ot.instancingColor=X.instancingColor,ot.instancingMorph=X.instancingMorph,ot.skinning=X.skinning,ot.morphTargets=X.morphTargets,ot.morphNormals=X.morphNormals,ot.morphColors=X.morphColors,ot.morphTargetsCount=X.morphTargetsCount,ot.numClippingPlanes=X.numClippingPlanes,ot.numIntersection=X.numClipIntersection,ot.vertexAlphas=X.vertexAlphas,ot.vertexTangents=X.vertexTangents,ot.toneMapping=X.toneMapping}function oo(D,X,ot,rt,q){X.isScene!==!0&&(X=He),N.resetTextureUnits();const bt=X.fog,Dt=rt.isMeshStandardMaterial?X.environment:null,Ut=H===null?A.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:to,kt=(rt.isMeshStandardMaterial?at:R).get(rt.envMap||Dt),ie=rt.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,$t=!!ot.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),It=!!ot.morphAttributes.position,be=!!ot.morphAttributes.normal,Pe=!!ot.morphAttributes.color;let Ve=ds;rt.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Ve=A.toneMapping);const Pn=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Me=Pn!==void 0?Pn.length:0,Xt=Zt.get(rt),vn=x.state.lights;if(ht===!0&&(Et===!0||D!==w)){const zn=D===w&&rt.id===L;At.setState(rt,D,zn)}let re=!1;rt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==vn.state.version||Xt.outputColorSpace!==Ut||q.isBatchedMesh&&Xt.batching===!1||!q.isBatchedMesh&&Xt.batching===!0||q.isBatchedMesh&&Xt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Xt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Xt.instancing===!1||!q.isInstancedMesh&&Xt.instancing===!0||q.isSkinnedMesh&&Xt.skinning===!1||!q.isSkinnedMesh&&Xt.skinning===!0||q.isInstancedMesh&&Xt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Xt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Xt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Xt.instancingMorph===!1&&q.morphTexture!==null||Xt.envMap!==kt||rt.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==At.numPlanes||Xt.numIntersection!==At.numIntersection)||Xt.vertexAlphas!==ie||Xt.vertexTangents!==$t||Xt.morphTargets!==It||Xt.morphNormals!==be||Xt.morphColors!==Pe||Xt.toneMapping!==Ve||Xt.morphTargetsCount!==Me)&&(re=!0):(re=!0,Xt.__version=rt.version);let Wn=Xt.currentProgram;re===!0&&(Wn=en(rt,X,q));let Da=!1,Cn=!1,Ua=!1;const Ne=Wn.getUniforms(),pi=Xt.uniforms;if(Qt.useProgram(Wn.program)&&(Da=!0,Cn=!0,Ua=!0),rt.id!==L&&(L=rt.id,Cn=!0),Da||w!==D){Qt.buffers.depth.getReversed()?(xt.copy(D.projectionMatrix),aE(xt),sE(xt),Ne.setValue(W,"projectionMatrix",xt)):Ne.setValue(W,"projectionMatrix",D.projectionMatrix),Ne.setValue(W,"viewMatrix",D.matrixWorldInverse);const Ui=Ne.map.cameraPosition;Ui!==void 0&&Ui.setValue(W,Gt.setFromMatrixPosition(D.matrixWorld)),_e.logarithmicDepthBuffer&&Ne.setValue(W,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Ne.setValue(W,"isOrthographic",D.isOrthographicCamera===!0),w!==D&&(w=D,Cn=!0,Ua=!0)}if(q.isSkinnedMesh){Ne.setOptional(W,q,"bindMatrix"),Ne.setOptional(W,q,"bindMatrixInverse");const zn=q.skeleton;zn&&(zn.boneTexture===null&&zn.computeBoneTexture(),Ne.setValue(W,"boneTexture",zn.boneTexture,N))}q.isBatchedMesh&&(Ne.setOptional(W,q,"batchingTexture"),Ne.setValue(W,"batchingTexture",q._matricesTexture,N),Ne.setOptional(W,q,"batchingIdTexture"),Ne.setValue(W,"batchingIdTexture",q._indirectTexture,N),Ne.setOptional(W,q,"batchingColorTexture"),q._colorsTexture!==null&&Ne.setValue(W,"batchingColorTexture",q._colorsTexture,N));const En=ot.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&Yt.update(q,ot,Wn),(Cn||Xt.receiveShadow!==q.receiveShadow)&&(Xt.receiveShadow=q.receiveShadow,Ne.setValue(W,"receiveShadow",q.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(pi.envMap.value=kt,pi.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&X.environment!==null&&(pi.envMapIntensity.value=X.environmentIntensity),Cn&&(Ne.setValue(W,"toneMappingExposure",A.toneMappingExposure),Xt.needsLights&&vu(pi,Ua),bt&&rt.fog===!0&&Lt.refreshFogUniforms(pi,bt),Lt.refreshMaterialUniforms(pi,rt,Z,j,x.state.transmissionRenderTarget[D.id]),su.upload(W,wn(Xt),pi,N)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(su.upload(W,wn(Xt),pi,N),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Ne.setValue(W,"center",q.center),Ne.setValue(W,"modelViewMatrix",q.modelViewMatrix),Ne.setValue(W,"normalMatrix",q.normalMatrix),Ne.setValue(W,"modelMatrix",q.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const zn=rt.uniformsGroups;for(let Ui=0,mi=zn.length;Ui<mi;Ui++){const Ji=zn[Ui];k.update(Ji,Wn),k.bind(Ji,Wn)}}return Wn}function vu(D,X){D.ambientLightColor.needsUpdate=X,D.lightProbe.needsUpdate=X,D.directionalLights.needsUpdate=X,D.directionalLightShadows.needsUpdate=X,D.pointLights.needsUpdate=X,D.pointLightShadows.needsUpdate=X,D.spotLights.needsUpdate=X,D.spotLightShadows.needsUpdate=X,D.rectAreaLights.needsUpdate=X,D.hemisphereLights.needsUpdate=X}function xu(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(D,X,ot){Zt.get(D.texture).__webglTexture=X,Zt.get(D.depthTexture).__webglTexture=ot;const rt=Zt.get(D);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=ot===void 0,rt.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,X){const ot=Zt.get(D);ot.__webglFramebuffer=X,ot.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(D,X=0,ot=0){H=D,B=X,O=ot;let rt=!0,q=null,bt=!1,Dt=!1;if(D){const kt=Zt.get(D);if(kt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(W.FRAMEBUFFER,null),rt=!1;else if(kt.__webglFramebuffer===void 0)N.setupRenderTarget(D);else if(kt.__hasExternalTextures)N.rebindTextures(D,Zt.get(D.texture).__webglTexture,Zt.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const It=D.depthTexture;if(kt.__boundDepthTexture!==It){if(It!==null&&Zt.has(It)&&(D.width!==It.image.width||D.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(D)}}const ie=D.texture;(ie.isData3DTexture||ie.isDataArrayTexture||ie.isCompressedArrayTexture)&&(Dt=!0);const $t=Zt.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray($t[X])?q=$t[X][ot]:q=$t[X],bt=!0):D.samples>0&&N.useMultisampledRTT(D)===!1?q=Zt.get(D).__webglMultisampledFramebuffer:Array.isArray($t)?q=$t[ot]:q=$t,F.copy(D.viewport),Q.copy(D.scissor),J=D.scissorTest}else F.copy(z).multiplyScalar(Z).floor(),Q.copy(st).multiplyScalar(Z).floor(),J=yt;if(Qt.bindFramebuffer(W.FRAMEBUFFER,q)&&rt&&Qt.drawBuffers(D,q),Qt.viewport(F),Qt.scissor(Q),Qt.setScissorTest(J),bt){const kt=Zt.get(D.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+X,kt.__webglTexture,ot)}else if(Dt){const kt=Zt.get(D.texture),ie=X||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,kt.__webglTexture,ot||0,ie)}L=-1},this.readRenderTargetPixels=function(D,X,ot,rt,q,bt,Dt){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Zt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){Qt.bindFramebuffer(W.FRAMEBUFFER,Ut);try{const kt=D.texture,ie=kt.format,$t=kt.type;if(!_e.textureFormatReadable(ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=D.width-rt&&ot>=0&&ot<=D.height-q&&W.readPixels(X,ot,rt,q,oe.convert(ie),oe.convert($t),bt)}finally{const kt=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(W.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(D,X,ot,rt,q,bt,Dt){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Zt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){const kt=D.texture,ie=kt.format,$t=kt.type;if(!_e.textureFormatReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=D.width-rt&&ot>=0&&ot<=D.height-q){Qt.bindFramebuffer(W.FRAMEBUFFER,Ut);const It=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,It),W.bufferData(W.PIXEL_PACK_BUFFER,bt.byteLength,W.STREAM_READ),W.readPixels(X,ot,rt,q,oe.convert(ie),oe.convert($t),0);const be=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(W.FRAMEBUFFER,be);const Pe=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await iE(W,Pe,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,It),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,bt),W.deleteBuffer(It),W.deleteSync(Pe),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,X=null,ot=0){D.isTexture!==!0&&(rl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,D=arguments[1]);const rt=Math.pow(2,-ot),q=Math.floor(D.image.width*rt),bt=Math.floor(D.image.height*rt),Dt=X!==null?X.x:0,Ut=X!==null?X.y:0;N.setTexture2D(D,0),W.copyTexSubImage2D(W.TEXTURE_2D,ot,0,0,Dt,Ut,q,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(D,X,ot=null,rt=null,q=0){D.isTexture!==!0&&(rl("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,D=arguments[1],X=arguments[2],q=arguments[3]||0,ot=null);let bt,Dt,Ut,kt,ie,$t,It,be,Pe;const Ve=D.isCompressedTexture?D.mipmaps[q]:D.image;ot!==null?(bt=ot.max.x-ot.min.x,Dt=ot.max.y-ot.min.y,Ut=ot.isBox3?ot.max.z-ot.min.z:1,kt=ot.min.x,ie=ot.min.y,$t=ot.isBox3?ot.min.z:0):(bt=Ve.width,Dt=Ve.height,Ut=Ve.depth||1,kt=0,ie=0,$t=0),rt!==null?(It=rt.x,be=rt.y,Pe=rt.z):(It=0,be=0,Pe=0);const Pn=oe.convert(X.format),Me=oe.convert(X.type);let Xt;X.isData3DTexture?(N.setTexture3D(X,0),Xt=W.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(N.setTexture2DArray(X,0),Xt=W.TEXTURE_2D_ARRAY):(N.setTexture2D(X,0),Xt=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,X.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,X.unpackAlignment);const vn=W.getParameter(W.UNPACK_ROW_LENGTH),re=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Wn=W.getParameter(W.UNPACK_SKIP_PIXELS),Da=W.getParameter(W.UNPACK_SKIP_ROWS),Cn=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,Ve.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Ve.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,kt),W.pixelStorei(W.UNPACK_SKIP_ROWS,ie),W.pixelStorei(W.UNPACK_SKIP_IMAGES,$t);const Ua=D.isDataArrayTexture||D.isData3DTexture,Ne=X.isDataArrayTexture||X.isData3DTexture;if(D.isRenderTargetTexture||D.isDepthTexture){const pi=Zt.get(D),En=Zt.get(X),zn=Zt.get(pi.__renderTarget),Ui=Zt.get(En.__renderTarget);Qt.bindFramebuffer(W.READ_FRAMEBUFFER,zn.__webglFramebuffer),Qt.bindFramebuffer(W.DRAW_FRAMEBUFFER,Ui.__webglFramebuffer);for(let mi=0;mi<Ut;mi++)Ua&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Zt.get(D).__webglTexture,q,$t+mi),D.isDepthTexture?(Ne&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Zt.get(X).__webglTexture,q,Pe+mi),W.blitFramebuffer(kt,ie,bt,Dt,It,be,bt,Dt,W.DEPTH_BUFFER_BIT,W.NEAREST)):Ne?W.copyTexSubImage3D(Xt,q,It,be,Pe+mi,kt,ie,bt,Dt):W.copyTexSubImage2D(Xt,q,It,be,Pe+mi,kt,ie,bt,Dt);Qt.bindFramebuffer(W.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Ne?D.isDataTexture||D.isData3DTexture?W.texSubImage3D(Xt,q,It,be,Pe,bt,Dt,Ut,Pn,Me,Ve.data):X.isCompressedArrayTexture?W.compressedTexSubImage3D(Xt,q,It,be,Pe,bt,Dt,Ut,Pn,Ve.data):W.texSubImage3D(Xt,q,It,be,Pe,bt,Dt,Ut,Pn,Me,Ve):D.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,q,It,be,bt,Dt,Pn,Me,Ve.data):D.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,q,It,be,Ve.width,Ve.height,Pn,Ve.data):W.texSubImage2D(W.TEXTURE_2D,q,It,be,bt,Dt,Pn,Me,Ve);W.pixelStorei(W.UNPACK_ROW_LENGTH,vn),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,re),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Wn),W.pixelStorei(W.UNPACK_SKIP_ROWS,Da),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Cn),q===0&&X.generateMipmaps&&W.generateMipmap(Xt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(D,X,ot=null,rt=null,q=0){return D.isTexture!==!0&&(rl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ot=arguments[0]||null,rt=arguments[1]||null,D=arguments[2],X=arguments[3],q=arguments[4]||0),rl('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(D,X,ot,rt,q)},this.initRenderTarget=function(D){Zt.get(D).__webglFramebuffer===void 0&&N.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?N.setTextureCube(D,0):D.isData3DTexture?N.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?N.setTexture2DArray(D,0):N.setTexture2D(D,0),Qt.unbindTexture()},this.resetState=function(){B=0,O=0,H=null,Qt.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ba}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Ae._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ae._getUnpackColorSpace()}}class vp{constructor(t,n=1,s=1e3){this.isFog=!0,this.name="",this.color=new ee(t),this.near=n,this.far=s}clone(){return new vp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class p2 extends qn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ca,this.environmentIntensity=1,this.environmentRotation=new Ca,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Ex extends no{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const uu=new $,fu=new $,Ev=new sn,il=new mp,qc=new hl,pd=new $,Tv=new $;class m2 extends qn{constructor(t=new An,n=new Ex){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,s=[0];for(let l=1,c=n.count;l<c;l++)uu.fromBufferAttribute(n,l-1),fu.fromBufferAttribute(n,l),s[l]=s[l-1],s[l]+=uu.distanceTo(fu);t.setAttribute("lineDistance",new rn(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),qc.copy(s.boundingSphere),qc.applyMatrix4(l),qc.radius+=c,t.ray.intersectsSphere(qc)===!1)return;Ev.copy(l).invert(),il.copy(t.ray).applyMatrix4(Ev);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,g=s.index,v=s.attributes.position;if(g!==null){const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const x=g.getX(T),U=g.getX(T+1),C=Wc(this,t,il,p,x,U);C&&n.push(C)}if(this.isLineLoop){const T=g.getX(E-1),S=g.getX(M),x=Wc(this,t,il,p,T,S);x&&n.push(x)}}else{const M=Math.max(0,f.start),E=Math.min(v.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const x=Wc(this,t,il,p,T,T+1);x&&n.push(x)}if(this.isLineLoop){const T=Wc(this,t,il,p,E-1,M);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function Wc(r,t,n,s,l,c){const f=r.geometry.attributes.position;if(uu.fromBufferAttribute(f,l),fu.fromBufferAttribute(f,c),n.distanceSqToSegment(uu,fu,pd,Tv)>s)return;pd.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(pd);if(!(p<t.near||p>t.far))return{distance:p,point:Tv.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}class ap extends no{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const bv=new sn,sp=new mp,Yc=new hl,jc=new $;class Av extends qn{constructor(t=new An,n=new ap){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Yc.copy(s.boundingSphere),Yc.applyMatrix4(l),Yc.radius+=c,t.ray.intersectsSphere(Yc)===!1)return;bv.copy(l).invert(),sp.copy(t.ray).applyMatrix4(bv);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=s.index,_=s.attributes.position;if(m!==null){const v=Math.max(0,f.start),M=Math.min(m.count,f.start+f.count);for(let E=v,T=M;E<T;E++){const S=m.getX(E);jc.fromBufferAttribute(_,S),Rv(jc,S,p,l,t,n,this)}}else{const v=Math.max(0,f.start),M=Math.min(_.count,f.start+f.count);for(let E=v,T=M;E<T;E++)jc.fromBufferAttribute(_,E),Rv(jc,E,p,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function Rv(r,t,n,s,l,c,f){const h=sp.distanceSqToPoint(r);if(h<n){const p=new $;sp.closestPointToPoint(r,p),p.applyMatrix4(s);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;c.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class g2 extends Xn{constructor(t,n,s,l,c,f,h,p,m){super(t,n,s,l,c,f,h,p,m),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xp extends An{constructor(t=1,n=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:s,thetaLength:l},n=Math.max(3,n);const c=[],f=[],h=[],p=[],m=new $,g=new Re;f.push(0,0,0),h.push(0,0,1),p.push(.5,.5);for(let _=0,v=3;_<=n;_++,v+=3){const M=s+_/n*l;m.x=t*Math.cos(M),m.y=t*Math.sin(M),f.push(m.x,m.y,m.z),h.push(0,0,1),g.x=(f[v]/t+1)/2,g.y=(f[v+1]/t+1)/2,p.push(g.x,g.y)}for(let _=1;_<=n;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new rn(f,3)),this.setAttribute("normal",new rn(h,3)),this.setAttribute("uv",new rn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xp(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class $e extends An{constructor(t=1,n=1,s=1,l=32,c=1,f=!1,h=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:s,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:h,thetaLength:p};const m=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],v=[],M=[];let E=0;const T=[],S=s/2;let x=0;U(),f===!1&&(t>0&&C(!0),n>0&&C(!1)),this.setIndex(g),this.setAttribute("position",new rn(_,3)),this.setAttribute("normal",new rn(v,3)),this.setAttribute("uv",new rn(M,2));function U(){const A=new $,V=new $;let B=0;const O=(n-t)/s;for(let H=0;H<=c;H++){const L=[],w=H/c,F=w*(n-t)+t;for(let Q=0;Q<=l;Q++){const J=Q/l,ct=J*p+h,ut=Math.sin(ct),P=Math.cos(ct);V.x=F*ut,V.y=-w*s+S,V.z=F*P,_.push(V.x,V.y,V.z),A.set(ut,O,P).normalize(),v.push(A.x,A.y,A.z),M.push(J,1-w),L.push(E++)}T.push(L)}for(let H=0;H<l;H++)for(let L=0;L<c;L++){const w=T[L][H],F=T[L+1][H],Q=T[L+1][H+1],J=T[L][H+1];(t>0||L!==0)&&(g.push(w,F,J),B+=3),(n>0||L!==c-1)&&(g.push(F,Q,J),B+=3)}m.addGroup(x,B,0),x+=B}function C(A){const V=E,B=new Re,O=new $;let H=0;const L=A===!0?t:n,w=A===!0?1:-1;for(let Q=1;Q<=l;Q++)_.push(0,S*w,0),v.push(0,w,0),M.push(.5,.5),E++;const F=E;for(let Q=0;Q<=l;Q++){const ct=Q/l*p+h,ut=Math.cos(ct),P=Math.sin(ct);O.x=L*P,O.y=S*w,O.z=L*ut,_.push(O.x,O.y,O.z),v.push(0,w,0),B.x=ut*.5+.5,B.y=P*.5*w+.5,M.push(B.x,B.y),E++}for(let Q=0;Q<l;Q++){const J=V+Q,ct=F+Q;A===!0?g.push(ct,ct+1,J):g.push(ct+1,ct,J),H+=3}m.addGroup(x,H,A===!0?1:2),x+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class cs extends $e{constructor(t=1,n=1,s=32,l=1,c=!1,f=0,h=Math.PI*2){super(0,t,n,s,l,c,f,h),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:s,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:h}}static fromJSON(t){return new cs(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dl extends An{constructor(t=[],n=[],s=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:s,detail:l};const c=[],f=[];h(l),m(s),g(),this.setAttribute("position",new rn(c,3)),this.setAttribute("normal",new rn(c.slice(),3)),this.setAttribute("uv",new rn(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function h(U){const C=new $,A=new $,V=new $;for(let B=0;B<n.length;B+=3)M(n[B+0],C),M(n[B+1],A),M(n[B+2],V),p(C,A,V,U)}function p(U,C,A,V){const B=V+1,O=[];for(let H=0;H<=B;H++){O[H]=[];const L=U.clone().lerp(A,H/B),w=C.clone().lerp(A,H/B),F=B-H;for(let Q=0;Q<=F;Q++)Q===0&&H===B?O[H][Q]=L:O[H][Q]=L.clone().lerp(w,Q/F)}for(let H=0;H<B;H++)for(let L=0;L<2*(B-H)-1;L++){const w=Math.floor(L/2);L%2===0?(v(O[H][w+1]),v(O[H+1][w]),v(O[H][w])):(v(O[H][w+1]),v(O[H+1][w+1]),v(O[H+1][w]))}}function m(U){const C=new $;for(let A=0;A<c.length;A+=3)C.x=c[A+0],C.y=c[A+1],C.z=c[A+2],C.normalize().multiplyScalar(U),c[A+0]=C.x,c[A+1]=C.y,c[A+2]=C.z}function g(){const U=new $;for(let C=0;C<c.length;C+=3){U.x=c[C+0],U.y=c[C+1],U.z=c[C+2];const A=S(U)/2/Math.PI+.5,V=x(U)/Math.PI+.5;f.push(A,1-V)}E(),_()}function _(){for(let U=0;U<f.length;U+=6){const C=f[U+0],A=f[U+2],V=f[U+4],B=Math.max(C,A,V),O=Math.min(C,A,V);B>.9&&O<.1&&(C<.2&&(f[U+0]+=1),A<.2&&(f[U+2]+=1),V<.2&&(f[U+4]+=1))}}function v(U){c.push(U.x,U.y,U.z)}function M(U,C){const A=U*3;C.x=t[A+0],C.y=t[A+1],C.z=t[A+2]}function E(){const U=new $,C=new $,A=new $,V=new $,B=new Re,O=new Re,H=new Re;for(let L=0,w=0;L<c.length;L+=9,w+=6){U.set(c[L+0],c[L+1],c[L+2]),C.set(c[L+3],c[L+4],c[L+5]),A.set(c[L+6],c[L+7],c[L+8]),B.set(f[w+0],f[w+1]),O.set(f[w+2],f[w+3]),H.set(f[w+4],f[w+5]),V.copy(U).add(C).add(A).divideScalar(3);const F=S(V);T(B,w+0,U,F),T(O,w+2,C,F),T(H,w+4,A,F)}}function T(U,C,A,V){V<0&&U.x===1&&(f[C]=U.x-1),A.x===0&&A.z===0&&(f[C]=V/2/Math.PI+.5)}function S(U){return Math.atan2(U.z,-U.x)}function x(U){return Math.atan2(-U.y,Math.sqrt(U.x*U.x+U.z*U.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dl(t.vertices,t.indices,t.radius,t.details)}}class hu extends dl{constructor(t=1,n=0){const s=(1+Math.sqrt(5))/2,l=1/s,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-s,0,-l,s,0,l,-s,0,l,s,-l,-s,0,-l,s,0,l,-s,0,l,s,0,-s,0,-l,s,0,-l,-s,0,l,s,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new hu(t.radius,t.detail)}}class yp extends dl{constructor(t=1,n=0){const s=(1+Math.sqrt(5))/2,l=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new yp(t.radius,t.detail)}}class du extends dl{constructor(t=1,n=0){const s=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(s,l,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new du(t.radius,t.detail)}}class hi extends An{constructor(t=1,n=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},n=Math.max(3,Math.floor(n)),s=Math.max(2,Math.floor(s));const p=Math.min(f+h,Math.PI);let m=0;const g=[],_=new $,v=new $,M=[],E=[],T=[],S=[];for(let x=0;x<=s;x++){const U=[],C=x/s;let A=0;x===0&&f===0?A=.5/n:x===s&&p===Math.PI&&(A=-.5/n);for(let V=0;V<=n;V++){const B=V/n;_.x=-t*Math.cos(l+B*c)*Math.sin(f+C*h),_.y=t*Math.cos(f+C*h),_.z=t*Math.sin(l+B*c)*Math.sin(f+C*h),E.push(_.x,_.y,_.z),v.copy(_).normalize(),T.push(v.x,v.y,v.z),S.push(B+A,1-C),U.push(m++)}g.push(U)}for(let x=0;x<s;x++)for(let U=0;U<n;U++){const C=g[x][U+1],A=g[x][U],V=g[x+1][U],B=g[x+1][U+1];(x!==0||f>0)&&M.push(C,A,B),(x!==s-1||p<Math.PI)&&M.push(A,V,B)}this.setIndex(M),this.setAttribute("position",new rn(E,3)),this.setAttribute("normal",new rn(T,3)),this.setAttribute("uv",new rn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _2 extends Gi{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Tx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=wv(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=wv();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function wv(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lp);const v2={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const x2=new _x(-1,1,1,-1,0,1);class y2 extends An{constructor(){super(),this.setAttribute("position",new rn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new rn([0,2,0,0,2,0],2))}}const S2=new y2;class bx{constructor(t){this._mesh=new tn(S2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,x2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class M2 extends pl{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof Gi?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gp.clone(t.uniforms),this.material=new Gi({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new bx(this.material)}render(t,n,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Cv extends pl{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,s){const l=t.getContext(),c=t.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,h;this.inverse?(f=0,h=1):(f=1,h=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(h),c.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class E2 extends pl{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class T2{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const s=t.getSize(new Re);this._width=s.width,this._height=s.height,n=new ms(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$r}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new M2(v2),this.copyPass.material.blending=Aa,this.clock=new Tx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let s=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),f.needsSwap){if(s){const h=this.renderer.getContext(),p=this.renderer.state.buffers.stencil;p.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),p.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}Cv!==void 0&&(f instanceof Cv?s=!0:f instanceof E2&&(s=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new Re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const s=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(s,l),this.renderTarget2.setSize(s,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(s,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class b2 extends pl{constructor(t,n,s=null,l=null,c=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=s,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ee}render(t,n,s){const l=t.autoClear;t.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(c=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const A2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class R2 extends pl{constructor(){super();const t=A2;this.uniforms=gp.clone(t.uniforms),this.material=new _2({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new bx(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,n,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ae.getTransfer(this._outputColorSpace)===Fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Gv?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Vv?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===kv?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Xv?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===qv?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Wv&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class w2{constructor(t,n,s,l,c){Rt(this,"composer");Rt(this,"outputPass");this.composer=new T2(t),this.composer.addPass(new b2(n,s)),this.outputPass=new R2,this.composer.addPass(this.outputPass),this.composer.setSize(l,c)}setSize(t,n){this.composer.setSize(t,n)}render(t){this.composer.render(t)}dispose(){this.composer.dispose(),this.outputPass.dispose()}}class C2{constructor(t,n,s){Rt(this,"scene");Rt(this,"renderer");Rt(this,"camera");Rt(this,"playerMeshes",new Map);Rt(this,"enemyMeshes",new Map);Rt(this,"projectileMeshes",new Map);Rt(this,"particleMeshes",new Map);Rt(this,"bossMeshes",new Map);Rt(this,"lockIndicators",new Map);Rt(this,"clock");Rt(this,"postFX");Rt(this,"cityRing");Rt(this,"hazePlane");Rt(this,"skyCap");Rt(this,"hologramParticles");Rt(this,"particleData");Rt(this,"cityMaterials",[]);this.scene=new p2,this.scene.background=new ee(0),this.scene.fog=new vp(0,180,600),this.renderer=new d2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(n,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera=new Ri(60,n/s,.1,2e3),this.camera.position.set(0,S_,Ph),this.clock=new Tx,this.postFX=new w2(this.renderer,this.scene,this.camera,n,s),this.buildCyberpunkBackground()}buildCyberpunkBackground(){this.buildCityRing(),this.buildHazePlane(),this.buildHologramParticles()}buildCityRing(){const t=new Ea,n=380,s=72,l=[new ee(16768324),new ee(4513279),new ee(16729258),new ee(16755234)];for(let c=0;c<s;c++){const f=c/s*Math.PI*2,h=n+(Math.random()-.5)*40,p=10+Math.random()*14,m=10+Math.random()*14,g=60+Math.random()*140,_=new tn(new Ie(p,g,m),new Ai({color:329226}));_.position.set(Math.cos(f)*h,g/2-20,Math.sin(f)*h),t.add(_);const v=6+Math.floor(Math.random()*10),M=3+Math.floor(Math.random()*4);for(let E=0;E<v;E++)for(let T=0;T<M;T++){if(Math.random()<.4)continue;const S=l[Math.floor(Math.random()*l.length)],x=new Ai({color:S,transparent:!0,opacity:1});this.cityMaterials.push(x);const U=new tn(new Ie(p*.6,.8,.2),x),C=-20+(E+1)*(g/v),A=(T-(M-1)/2)*1.6,V=-Math.cos(f),B=-Math.sin(f);U.position.set(Math.cos(f)*(h-m/2-.1)+V*A,C,Math.sin(f)*(h-m/2-.1)+B*A),U.lookAt(U.position.x+V,C,U.position.z+B),t.add(U)}}this.cityRing=t,this.scene.add(this.cityRing)}buildHazePlane(){const n=document.createElement("canvas");n.width=1024,n.height=1024;const s=n.getContext("2d"),l=s.createLinearGradient(0,0,0,1024);l.addColorStop(0,"rgba(80, 60, 140, 0.20)"),l.addColorStop(.5,"rgba(50, 80, 180, 0.12)"),l.addColorStop(1,"rgba(0, 0, 0, 0)"),s.fillStyle=l,s.fillRect(0,0,1024,1024);const c=new g2(n);c.wrapS=ou,c.wrapT=hs,c.colorSpace=di;const f=new $e(550,550,350,32,1,!0),h=new Ai({map:c,transparent:!0,blending:Vs,depthWrite:!1,side:Hn,opacity:.55});this.hazePlane=new tn(f,h),this.hazePlane.position.y=60,this.scene.add(this.hazePlane),this.skyCap=new tn(new xp(550,32),new Ai({map:c,transparent:!0,blending:Vs,depthWrite:!1,side:Zi,opacity:.2})),this.skyCap.rotation.x=Math.PI/2,this.skyCap.position.y=220,this.scene.add(this.skyCap)}buildHologramParticles(){const n=new Float32Array(1350),s=new Float32Array(450*3),l=new Float32Array(450*3),c=[new ee(16768324),new ee(4513279),new ee(16729258)];for(let p=0;p<450;p++){const m=80+Math.random()*220,g=Math.random()*Math.PI*2,_=(Math.random()-.5)*Math.PI*.8;n[p*3]=Math.cos(g)*Math.cos(_)*m,n[p*3+1]=Math.sin(_)*m*.6+30,n[p*3+2]=Math.sin(g)*Math.cos(_)*m,s[p*3]=(Math.random()-.5)*.6,s[p*3+1]=.2+Math.random()*.4,s[p*3+2]=(Math.random()-.5)*.6;const v=c[Math.floor(Math.random()*c.length)];l[p*3]=v.r,l[p*3+1]=v.g,l[p*3+2]=v.b}const f=new An;f.setAttribute("position",new kn(n,3)),f.setAttribute("color",new kn(l,3));const h=new ap({size:1.6,vertexColors:!0,transparent:!0,opacity:.85,blending:Vs,depthWrite:!1,sizeAttenuation:!0});this.hologramParticles=new Av(f,h),this.scene.add(this.hologramParticles),this.particleData={velocities:s}}updateAtmosphere(t){if(this.particleData){const{velocities:n}=this.particleData,s=this.hologramParticles.geometry.attributes.position,l=s.array,c=l.length/3;for(let f=0;f<c;f++)l[f*3]+=n[f*3]*t,l[f*3+1]+=n[f*3+1]*t,l[f*3+2]+=n[f*3+2]*t,l[f*3+1]>200&&(l[f*3+1]=-50,l[f*3]+=(Math.random()-.5)*30,l[f*3+2]+=(Math.random()-.5)*30);s.needsUpdate=!0}this.hazePlane&&(this.hazePlane.position.x=this.camera.position.x,this.hazePlane.position.z=this.camera.position.z),this.skyCap&&(this.skyCap.position.x=this.camera.position.x,this.skyCap.position.z=this.camera.position.z),this.cityRing&&(this.cityRing.rotation.y+=t*(Math.PI*2)/90)}setCityIgnition(t){const n=Math.max(0,Math.min(1,t));for(const s of this.cityMaterials)s.opacity=n}updateCamera(t,n,s,l=_d){const c=new $(t.x-Math.sin(s)*Ph,t.y+S_,t.z-Math.cos(s)*Ph),f=1-Math.exp(-l*n);this.camera.position.lerp(c,f),this.camera.lookAt(t.x,t.y,t.z)}setSpeedRatio(t){const n=dM+pM*Math.max(0,Math.min(1,t));Math.abs(this.camera.fov-n)>.01&&(this.camera.fov+=(n-this.camera.fov)*.1,this.camera.updateProjectionMatrix())}resize(t,n){this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.postFX.setSize(t,n)}render(t=1/60){this.updateAtmosphere(t),this.postFX.render()}addPart(t,n,s,l,c=16777215){const f=new Ai({color:c}),h=new tn(n,f);return h.position.set(s[0],s[1],s[2]),l&&h.rotation.set(l[0],l[1],l[2]),t.add(h),h}createPlayerMesh(t=new ee(16777215)){const n=new Ea;this.addPart(n,new Ie(1.8,1,1.4),[0,.5,0]),this.addPart(n,new Ie(1.6,.7,.4),[0,.6,.75]),this.addPart(n,new Ie(1.2,.5,.2),[0,.6,.95]),this.addPart(n,new $e(.22,.22,.08,12),[0,.55,.8],[Math.PI/2,0,0]),this.addPart(n,new $e(.27,.27,.06,12),[0,.55,.84],[Math.PI/2,0,0],t.getHex()),this.addPart(n,new $e(.8,1,.4,6),[0,0,0]),this.addPart(n,new Ie(.7,.5,.7),[0,1.3,0]),this.addPart(n,new Ie(.62,.09,.1),[0,1.27,.4],void 0,t.getHex()),this.addPart(n,new Ie(.09,.32,.06),[0,1.56,.1],[-.44,0,0]);for(let c=-1;c<=1;c+=2)this.addPart(n,new Ie(.85,.35,.5),[c*1.35,.95,-.1],[0,0,c*.35]),this.addPart(n,new cs(.34,.6,4),[c*1.78,.85,.2],[0,0,c*-.5]),this.addPart(n,new hi(.2,6,6),[c*1.1,.7,0]);for(let c=-1;c<=1;c+=2)this.addPart(n,new $e(.2,.25,.7,6),[c*1.2,.3,0]),this.addPart(n,new $e(.15,.18,.55,6),[c*1.2,.3,.15]),this.addPart(n,new hi(.14,6,6),[c*1.2,-.1,0]),this.addPart(n,new $e(.16,.14,.5,6),[c*1.2,-.45,0]),this.addPart(n,new Ie(.2,.3,.15),[c*1.2,-.45,.2]),this.addPart(n,new hi(.1,6,6),[c*1.2,-.7,0]),c>0&&(this.addPart(n,new $e(.08,.1,.8,6),[c*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(n,new $e(.05,.06,1,6),[c*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(n,new $e(.07,.09,.1,6),[c*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(n,new Ie(.2,.12,.3),[c*1.35,-.3,.3]));for(let c=-1;c<=1;c+=2)this.addPart(n,new Ie(.34,.65,.4),[c*.5,-.32,.32],[c*-.12,0,.12]),this.addPart(n,new hi(.22,6,6),[c*.5,-.62,.4]),this.addPart(n,new Ie(.3,.72,.36),[c*.5,-.98,-.08],[c*.28,0,0]),this.addPart(n,new hi(.16,6,6),[c*.5,-1.32,-.25]),this.addPart(n,new Ie(.42,.14,.55),[c*.5,-1.44,.18],[c*.18,0,0]);this.addPart(n,new Ie(1,.6,.4),[0,.5,-.95]),this.addPart(n,new $e(.35,.4,.4,8),[0,.4,-1.2]);for(let c=-1;c<=1;c+=2)this.addPart(n,new $e(.2,.25,.35,6),[c*.45,.4,-1.15]),this.addPart(n,new $e(.15,.18,.25,6),[c*.35,.85,-.95]);this.addPart(n,new Ie(.7,.2,.15),[0,-.1,.55]);for(let c=-1;c<=1;c+=2)this.addPart(n,new Ie(.15,.2,.4),[c*.65,-.1,.2]);const s=new Ai({color:16755268,transparent:!0,opacity:.9,blending:Vs,depthWrite:!1}),l=(c,f)=>{const h=new tn(new cs(.12,.5,6),s);h.name="thruster",h.position.set(c[0],c[1],c[2]),h.rotation.set(f[0],f[1],f[2]),h.scale.set(1,1,.001),n.add(h)};return l([-.5,-1.8,.05],[Math.PI,0,0]),l([.5,-1.8,.05],[Math.PI,0,0]),l([0,.4,-1.38],[-Math.PI/2,0,0]),n}updateThrusters(t,n,s){const l=this.playerMeshes.get(t);if(!l)return;const c=Math.max(0,Math.min(1,n))*(s?1.6:1);l.children.forEach(f=>{if(f.name==="thruster"){const h=f;h.visible=c>.02,h.scale.set(1,1,Math.max(.001,c)),h.material.color.set(s?13691135:16755268)}})}createOutline(t,n){const s=new Ea;return t.children.forEach(l=>{if(l.name==="thruster")return;const c=l;if(!(c.geometry instanceof An))return;const f=new Ai({color:n,side:Hn,transparent:!0,opacity:.35,blending:Vs,depthWrite:!1}),h=new tn(c.geometry.clone(),f);h.position.copy(c.position),h.rotation.copy(c.rotation),h.scale.copy(c.scale).multiplyScalar(1.04),s.add(h)}),s}createEnemyMesh(t,n,s){const l=new Ea,c=new Ai({color:16777215}),f=(h,p,m)=>{const g=new tn(h,c);g.position.set(p[0],p[1],p[2]),m&&g.rotation.set(m[0],m[1],m[2]),l.add(g)};switch(s){case"scout":{f(new du(n*.7,1),[0,0,0]);for(let h=0;h<4;h++){const p=h/4*Math.PI*2;f(new cs(n*.08,n*.5,4),[Math.cos(p)*n*.6,0,Math.sin(p)*n*.6])}f(new $e(.02,.03,n*.4),[0,n*.5,0]);break}case"assault":{f(new Ie(n*1,n*.8,n*.7),[0,0,0]),f(new Ie(n*.7,n*.4,n*.2),[0,0,n*.45]),f(new Ie(n*.3,n*.25,n*.3),[0,n*.55,0]),f(new Ie(n*.25,n*.06,.05),[0,n*.55,n*.17]);for(let h=-1;h<=1;h+=2)f(new $e(n*.08,n*.1,n*.4,6),[h*n*.6,n*.1,n*.3],[Math.PI/2,0,0]);break}case"sniper":{f(new $e(n*.2,n*.3,n*1,6),[0,0,0]),f(new $e(n*.06,n*.06,n*.15,6),[0,n*.6,0]),f(new hi(n*.08,6,6),[0,n*.68,0]),f(new $e(n*.04,n*.06,n*1.2,6),[0,0,n*.7],[Math.PI/2,0,0]);for(let h=-1;h<=1;h+=2)f(new $e(n*.04,n*.06,n*.3,4),[h*n*.2,-n*.55,0]);break}case"shield":{f(new Ie(n*1.2,n*.6,n*.5),[0,0,0]),f(new Ie(n*1.1,n*.8,n*.15),[0,0,n*.35]),f(new hi(n*.15,6,6),[0,0,n*.45]);for(let h=-1;h<=1;h+=2)f(new $e(n*.1,n*.15,n*.2,6),[h*n*.4,0,-n*.3]);break}case"bomber":{f(new hi(n*.6,8,8),[0,0,0]);for(let h=0;h<8;h++){const p=h/8*Math.PI*2,m=Math.PI*.5,g=new $(Math.cos(p)*Math.sin(m),Math.cos(m),Math.sin(p)*Math.sin(m)),_=new tn(new cs(n*.06,n*.35,4),c);_.position.set(g.x*n*.6,g.y*n*.6,g.z*n*.6),_.quaternion.setFromUnitVectors(new $(0,1,0),g),l.add(_)}break}case"commander":{f(new hu(n*.6),[0,0,0]),f(new cs(n*.1,n*.5,4),[0,n*.6,0]);for(let h=-1;h<=1;h+=2)f(new hi(n*.25,6,6),[h*n*.55,n*.2,0]);f(new Ie(n*.4,n*.3,n*.2),[0,0,-n*.4]);break}default:{f(new du(n*.8),[0,0,0]);break}}return l}createBossMesh(t=new ee(16777215),n=4){const s=new Ea,l=new Ai({color:16777215}),c=new tn(new hu(n),l);s.add(c);const f=new tn(new yp(n*.4),l);s.add(f);for(let h=0;h<6;h++){const p=new tn(new $e(.3,.4,.8,6),l),m=h/6*Math.PI*2;p.position.set(Math.cos(m)*n*1.1,0,Math.sin(m)*n*1.1),p.rotation.z=Math.PI/2,p.rotation.y=-m,s.add(p)}return s}createProjectileMesh(t,n){const s=new Ai({color:16777215});let l;switch(n){case"beam":case"sniper":l=new hi(.3,6,6);break;case"missile":l=new cs(.2,.6,6);break;default:l=new hi(.15,4,4)}return new tn(l,s)}createExplosion(t,n,s=1){const c=new Float32Array(90),f=new Float32Array(90),h=new ee(n);for(let M=0;M<30;M++){const E=Math.random()*Math.PI*2,T=Math.random()*Math.PI,S=s*(.5+Math.random()*.5);c[M*3]=t.x+S*Math.sin(T)*Math.cos(E),c[M*3+1]=t.y+S*Math.cos(T),c[M*3+2]=t.z+S*Math.sin(T)*Math.sin(E),f[M*3]=h.r,f[M*3+1]=h.g,f[M*3+2]=h.b}const p=new An;p.setAttribute("position",new kn(c,3)),p.setAttribute("color",new kn(f,3));const m=new ap({size:.5,vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1}),g=new Av(p,m);this.scene.add(g);let _=1;const v=()=>{if(_-=.02,_<=0){this.scene.remove(g),p.dispose(),m.dispose();return}m.opacity=_;const M=p.attributes.position,E=M.array;for(let T=0;T<30;T++)E[T*3]+=(Math.random()-.5)*.5,E[T*3+1]+=(Math.random()-.5)*.5,E[T*3+2]+=(Math.random()-.5)*.5;M.needsUpdate=!0,requestAnimationFrame(v)};v()}updateLockIndicator(t,n,s,l="#00ff44"){const c=this.lockIndicators.get(t);if(!s){c&&(this.scene.remove(c),this.lockIndicators.delete(t));return}if(c){const f=c.geometry.attributes.position,h=f.array;h[0]=n.x,h[1]=n.y,h[2]=n.z,h[3]=s.x,h[4]=s.y,h[5]=s.z,f.needsUpdate=!0;const p=c.material;p.color.getStyle()!==l&&p.color.set(l)}else{const f=new An,h=new Float32Array([n.x,n.y,n.z,s.x,s.y,s.z]);f.setAttribute("position",new kn(h,3));const p=new Ex({color:l,transparent:!0,opacity:.5,linewidth:1}),m=new m2(f,p);this.scene.add(m),this.lockIndicators.set(t,m)}}dispose(){this.postFX.dispose(),this.renderer.dispose()}}class D2{constructor(t){Rt(this,"keys",new Set);Rt(this,"mouseNormX",.5);Rt(this,"mouseNormY",.5);Rt(this,"aimNormX",.5);Rt(this,"aimNormY",.5);Rt(this,"mouseDown",!1);Rt(this,"_weaponSwitch",0);Rt(this,"_dodge",!1);Rt(this,"_special",!1);Rt(this,"_lockToggle",!1);Rt(this,"lastSpaceTime",0);Rt(this,"canvasWidth",1);Rt(this,"canvasHeight",1)}setCanvasSize(t,n){this.canvasWidth=t,this.canvasHeight=n}getMouseNormX(){return this.aimNormX}getMouseNormY(){return this.aimNormY}getRawMouseNormX(){return this.mouseNormX}getRawMouseNormY(){return this.mouseNormY}setAimNorm(t,n){this.aimNormX=t,this.aimNormY=n}has(t){return this.keys.has(t)||this.keys.has(t.toLowerCase())||this.keys.has(t.toUpperCase())}getState(){const t=this._weaponSwitch;this._weaponSwitch=0;const n=this._dodge;this._dodge=!1;const s=this._special;this._special=!1;const l=this._lockToggle;return this._lockToggle=!1,{forward:this.has("w")||this.keys.has("ArrowUp"),backward:this.has("s")||this.keys.has("ArrowDown"),left:this.has("a")||this.keys.has("ArrowLeft"),right:this.has("d")||this.keys.has("ArrowRight"),up:this.has("Shift"),down:this.has("Control"),shoot:this.mouseDown,aimX:this.aimNormX,aimY:this.aimNormY,weaponSwitch:t,boost:this.has(" "),brake:this.has("e"),dodge:n,special:s,lockToggle:l,pause:this.has("Escape")||this.has("Enter")}}keyDown(t){if(this.keys.add(t),t===" "){const s=performance.now();s-this.lastSpaceTime<300&&(this._dodge=!0),this.lastSpaceTime=s}(t==="z"||t==="Z")&&(this._special=!0),t==="Tab"&&(this._lockToggle=!0);const n=parseInt(t,10);n>=1&&n<=9&&(this._weaponSwitch=n)}keyUp(t){this.keys.delete(t),this.keys.delete(t.toLowerCase()),this.keys.delete(t.toUpperCase())}mouseMove(t,n){this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?n/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}const U2=120,Dv=60/U2/4,L2=64,N2=.12,O2=25,P2=[{root:45,tones:[57,60,64]},{root:41,tones:[53,57,60]},{root:38,tones:[50,53,57]},{root:40,tones:[52,55,59]}],Uv=r=>440*Math.pow(2,(r-69)/12);class Ax{constructor(){Rt(this,"ctx",null);Rt(this,"masterGain",null);Rt(this,"bgmGain",null);Rt(this,"sfxGain",null);Rt(this,"initialized",!1);Rt(this,"bgmTimer",null);Rt(this,"bgmActiveOscs",[]);Rt(this,"nextStepTime",0);Rt(this,"step",0);Rt(this,"noiseBuffer",null)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="square",n.frequency.value=t,s.gain.setValueAtTime(.3,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),n.connect(s),s.connect(this.sfxGain),n.start(),n.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=n.getChannelData(0);for(let f=0;f<t;f++)s[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=n;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.value=1200,n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),n.gain.setValueAtTime(.4,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playDodge(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1800,this.ctx.currentTime+.18),n.gain.setValueAtTime(.25,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.2)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="square",n.frequency.value=440,s.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),n.connect(s),s.connect(this.sfxGain),n.start(this.ctx.currentTime+t*.3),n.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){this.ensureCtx(),!(!this.ctx||!this.bgmGain||this.bgmTimer!==null)&&(this.step=0,this.nextStepTime=this.ctx.currentTime+.1,this.bgmTimer=window.setInterval(()=>this.scheduleBgmAhead(),O2))}stopBGM(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null);for(const t of this.bgmActiveOscs)try{t.stop()}catch{}this.bgmActiveOscs.length=0,this.step=0,this.nextStepTime=0}scheduleBgmAhead(){if(!(!this.ctx||!this.bgmGain))for(;this.nextStepTime<this.ctx.currentTime+N2;)this.scheduleStep(this.step,this.nextStepTime),this.nextStepTime+=Dv,this.step=(this.step+1)%L2}scheduleStep(t,n){const s=Math.floor(t/16),l=t%16,c=P2[s];l===0&&this.schedulePad(c,n),(l===0||l===8)&&this.scheduleBass(c,l===8,n),l%8===4&&this.scheduleHat(n)}schedulePad(t,n){if(!this.ctx||!this.bgmGain)return;const s=16*Dv,l=.06,c=.4;for(const f of t.tones)for(const h of[-6,5]){const p=this.ctx.createOscillator(),m=this.ctx.createGain();p.type="sawtooth",p.frequency.value=Uv(f),p.detune.value=h,m.gain.setValueAtTime(1e-4,n),m.gain.exponentialRampToValueAtTime(.022,n+l),m.gain.setValueAtTime(.022,n+s-c),m.gain.exponentialRampToValueAtTime(1e-4,n+s-.02),p.connect(m),m.connect(this.bgmGain),this.trackBgmOsc(p),p.start(n),p.stop(n+s)}}scheduleBass(t,n,s){if(!this.ctx||!this.bgmGain)return;const l=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),f=this.ctx.createGain();l.type="sawtooth",l.frequency.value=Uv(t.root-12+(n?7:0)),c.type="lowpass",c.frequency.setValueAtTime(420,s),c.frequency.exponentialRampToValueAtTime(120,s+.3),c.Q.value=2;const h=n?.2:.24;f.gain.setValueAtTime(1e-4,s),f.gain.exponentialRampToValueAtTime(.16,s+.01),f.gain.exponentialRampToValueAtTime(1e-4,s+h),l.connect(c),c.connect(f),f.connect(this.bgmGain),this.trackBgmOsc(l),l.start(s),l.stop(s+h+.05)}scheduleHat(t){if(!this.ctx||!this.bgmGain)return;const n=this.getNoiseBuffer();if(!n)return;const s=this.ctx.createBufferSource();s.buffer=n;const l=this.ctx.createBiquadFilter();l.type="highpass",l.frequency.value=6500;const c=this.ctx.createGain();c.gain.setValueAtTime(.035,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),s.connect(l),l.connect(c),c.connect(this.bgmGain),s.start(t),s.stop(t+.08)}getNoiseBuffer(){if(!this.ctx)return null;if(this.noiseBuffer)return this.noiseBuffer;const t=this.ctx.sampleRate*.1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=n.getChannelData(0);for(let l=0;l<t;l++)s[l]=Math.random()*2-1;return this.noiseBuffer=n,n}trackBgmOsc(t){this.bgmActiveOscs.push(t),t.onended=()=>{const n=this.bgmActiveOscs.indexOf(t);n>=0&&this.bgmActiveOscs.splice(n,1)}}playBossAnnounce(t){if(this.ensureCtx(),!this.ctx)return;const n=this.ctx.currentTime,s=[...t].reduce((f,h)=>f+h.charCodeAt(0),0),l=120+s%60,c=1+(s>>3)%5/10;this.voiceChip(n,{freq:l,duration:.42,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:34,depth:.55,gainA:.26,gainB:.14,gainC:.1,glideTo:l*.92}),this.voiceChip(n+.3,{freq:l*c,duration:.55,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:30,depth:.5,gainA:.24,gainB:.13,gainC:.09,glideTo:l*c*.9})}playSpecialAnnounce(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.currentTime,n=330;this.voiceChip(t,{freq:n,duration:.8,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:46,depth:.6,gainA:.2,gainB:.14,gainC:.12,glideTo:n*1.8}),this.voiceChip(t+.15,{freq:n*1.25,duration:.6,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:52,depth:.55,gainA:.18,gainB:.12,gainC:.1,glideTo:n*1.25*1.5})}voiceChip(t,n){if(!this.ctx||!this.sfxGain)return;const s=this.ctx.createGain();s.gain.setValueAtTime(1e-4,t),s.gain.exponentialRampToValueAtTime(1,t+.01),s.gain.setValueAtTime(1,t+n.duration*.45),s.gain.exponentialRampToValueAtTime(1e-4,t+n.duration);const l=this.ctx.createGain();l.gain.value=.5;const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sine",c.frequency.value=n.pulseHz,f.gain.value=n.depth,c.connect(f),f.connect(l.gain),c.start(t),c.stop(t+n.duration);const h=[[n.waveA,n.freq,n.gainA],[n.waveB,n.freq*1.005,n.gainB],[n.waveC,n.freq*2.01,n.gainC]];for(const[p,m,g]of h){const _=this.ctx.createOscillator(),v=this.ctx.createGain();_.type=p,_.frequency.setValueAtTime(m,t),_.frequency.exponentialRampToValueAtTime(n.glideTo*(m/n.freq),t+n.duration),v.gain.value=g,_.connect(v),v.connect(l),_.start(t),_.stop(t+n.duration+.02)}l.connect(s),s.connect(this.sfxGain)}}const fi=new Ax;var Se=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(Se||{}),Ht=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Ht||{}),gn=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(gn||{}),wi=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(wi||{});const rp=[{id:1,name:"光束机枪",type:gn.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:wi.FreeFire,smartRadius:60},{id:2,name:"追踪导弹",type:gn.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:wi.LockRequired,smartRadius:95},{id:3,name:"光束加农",type:gn.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:wi.LockRequired,smartRadius:80},{id:4,name:"散射弹幕",type:gn.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:wi.FreeFire,smartRadius:110},{id:5,name:"狙击光束",type:gn.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:wi.LockRequired,smartRadius:45},{id:6,name:"浮游炮",type:gn.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:wi.LockShortRange,smartRadius:130}];function fs(r){return rp.find(t=>t.id===r)||rp[0]}const Lv=[{type:Se.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:Se.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:Se.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:Se.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:Se.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:Se.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function Zc(r){return Lv.find(t=>t.type===r)||Lv[0]}function Yi(r,t,n,s,l){return{hpPercent:r,speed:t,attacks:n,minionSpawn:s,attackPattern:l}}const Nv=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[Yi(1,5,["弹幕散布"],!0,"spread"),Yi(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),Yi(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[Yi(1,12,["高速突进"],!1,"rush"),Yi(.6,15,["高速突进","分身攻击"],!0,"clone"),Yi(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[Yi(1,4,["多重导弹"],!1,"missile"),Yi(.75,6,["多重导弹","力场护盾"],!1,"shield"),Yi(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),Yi(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function md(r){return Nv.find(t=>t.id===r)||Nv[0]}function Ye(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function Ce(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function ge(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function Rx(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function mn(r,t){return Rx(Ce(r,t))}function Te(r){const t=Rx(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function z2(r,t,n){return r+(t-r)*n}function ti(r,t,n){return Math.max(t,Math.min(n,r))}function Vr(r,t){return r+Math.random()*(t-r)}function B2(r,t){return Math.floor(Vr(r,t+1))}let wx=1;function bi(){return wx++}const I2=4,F2=1.5,Ov=3,gd=.6,Pv=2.5,H2=6,G2=60,V2=4;class k2{constructor(t){Rt(this,"scene");Rt(this,"input");Rt(this,"audio");Rt(this,"canvas");Rt(this,"players",[]);Rt(this,"enemies",[]);Rt(this,"projectiles",[]);Rt(this,"particles",[]);Rt(this,"active",!1);Rt(this,"velocities",[]);Rt(this,"fireTimers",[]);Rt(this,"dodgeTimer",0);Rt(this,"dodgeCooldown",0);Rt(this,"accumulator",0);Rt(this,"lastTime",0);Rt(this,"animFrameId",0);Rt(this,"enemySpawnTimer",0);Rt(this,"waveTimer",0);Rt(this,"levelSpawned",0);Rt(this,"bossCount",0);Rt(this,"currentBossIndex",-1);Rt(this,"bossPhase",1);Rt(this,"bossAttackTimer",0);Rt(this,"bossSweepAngle",0);Rt(this,"bossNetAngle",0);Rt(this,"comboTimeout",[0]);Rt(this,"lockTargets",[null]);Rt(this,"lockOn",!1);Rt(this,"enemyLastPos",new Map);Rt(this,"enemyVels",new Map);Rt(this,"brakePitch",0);Rt(this,"cameraStiffness",_d);Rt(this,"cameraShake",0);Rt(this,"enemyOutlineRef",null);Rt(this,"gameLoop",t=>{if(!this.active)return;this.animFrameId=requestAnimationFrame(this.gameLoop);const n=Math.min((t-this.lastTime)/1e3,.05);for(this.lastTime=t,this.accumulator+=n;this.accumulator>=Uh;)this.update(Uh),this.accumulator-=Uh;this.render(n)});this.canvas=t,this.scene=new C2(t,t.width,t.height),this.input=new D2(0),this.input.setCanvasSize(t.width,t.height),this.audio=new Ax}start(){const t=yn.getState();this.players=t.players.map(n=>({...n})),this.velocities=this.players.map(()=>({x:0,y:0,z:0})),this.fireTimers=this.players.map(()=>0),this.dodgeTimer=0,this.dodgeCooldown=0,this.enemies=[],this.projectiles=[],this.particles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0,this.enemySpawnTimer=0,this.waveTimer=0,this.lockOn=!1,this.enemyLastPos.clear(),this.enemyVels.clear(),this.active=!0,this.lastTime=performance.now(),this.accumulator=0,wx=1,this.players.forEach((n,s)=>{const l=s===0?new ee(4491519):new ee(16737860),c=this.scene.createPlayerMesh(l);c.position.set(n.pos.x,n.pos.y,n.pos.z),this.scene.playerMeshes.set(n.id,c),this.scene.scene.add(c);const f=this.scene.createOutline(c,"#4488ff");f.name="self-outline",c.add(f)}),fi.init(),fi.startBGM(),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),fi.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,n){this.scene.resize(t,n),this.input.setCanvasSize(t,n)}update(t){yn.getState().game;const s=[this.input.getState()];this.updatePlayers(t,s),this.updateEnemies(t),this.updateProjectiles(t),this.updateParticles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateUI(t),this.updateBoss(t)}updatePlayers(t,n){this.players.forEach((s,l)=>{if(!s.alive)return;const c=n[l],f=this.scene.playerMeshes.get(s.id);if(!f)return;const h=yn.getState().game;for(const Q of rp)h.wave>=Q.unlockLevel&&!s.weapons.includes(Q.id)&&s.weapons.push(Q.id);(s.weapon===0||!s.weapons.includes(s.weapon))&&(s.weapon=s.weapons[0]);const p=this.velocities[l],m=(c.right?1:0)-(c.left?1:0),g=(c.up?1:0)-(c.down?1:0),_=(c.forward?1:0)-(c.backward?1:0),v=Math.sqrt(m*m+g*g+_*_),M=c.boost&&s.energy>0,E=M?nM:1,T=s.speed*E,S=c.brake?oM:rM;if(M?s.energy=Math.max(0,s.energy-QS*t):s.energy=Math.min(s.maxEnergy,s.energy+s.maxEnergy*.25*t),c.lockToggle&&(this.lockOn=!this.lockOn),!this.lockOn)this.lockTargets[l]=null;else{const Q=this.lockTargets[l]!==null?this.enemies.find(J=>J.id===this.lockTargets[l]&&J.hp>0):null;if(!Q||mn(Q.pos,s.pos)>Oh){let J=null,ct=Oh;for(const ut of this.enemies){if(ut.hp<=0)continue;const P=mn(s.pos,ut.pos);P<ct&&(ct=P,J=ut)}this.lockTargets[l]=J?J.id:null}}let x=this.input.getRawMouseNormX(),U=this.input.getRawMouseNormY();if(this.lockOn&&this.lockTargets[l]!==null){const Q=this.enemies.find(J=>J.id===this.lockTargets[l]&&J.hp>0);if(Q){const J=this.worldToScreen(Q.pos);if(J){const ct=mn(s.pos,Q.pos),ut=aM*Math.max(0,1-ct/Oh),P=ti(J.x/this.canvas.width,0,1),j=ti(J.y/this.canvas.height,0,1);x=x+(P-x)*ut,U=U+(j-U)*ut}}}this.input.setAimNorm(x,U);const C=this.computeCrosshairDir(s),A={x:-C.z,z:C.x},V=(Q,J,ct)=>({x:ct*C.x+Q*A.x,y:J,z:ct*C.z+Q*A.z});if(this.dodgeCooldown-=t,c.dodge&&this.dodgeCooldown<=0&&(this.dodgeTimer=gM,this.dodgeCooldown=_M,s.invulnTimer=Math.max(s.invulnTimer,vM),fi.playDodge()),this.dodgeTimer>0){this.dodgeTimer-=t;let Q=0,J=0,ct=0;if(v>.001){const ut=1/v,P=V(m,g,_);Q=P.x*ut,J=P.y*ut,ct=P.z*ut}else{const ut=this.computeAimDir(s);Q=ut.x,J=ut.y,ct=ut.z}p.x=Q*s.speed*zh,p.y=J*s.speed*zh,p.z=ct*s.speed*zh,s.pos.x+=p.x*t,s.pos.y+=p.y*t,s.pos.z+=p.z*t}else{let Q=0,J=0,ct=0;if(v>.001){const j=1/v,Z=V(m,g,_);Q=Z.x*T*j,J=Z.y*T*j,ct=Z.z*T*j}const ut=1-Math.exp(-S*t);p.x+=(Q-p.x)*ut,p.y+=(J-p.y)*ut,p.z+=(ct-p.z)*ut;const P=Math.exp(-1.2*t);p.x*=P,p.y*=P,p.z*=P,s.pos.x+=p.x*t,s.pos.y+=p.y*t,s.pos.z+=p.z*t}this.scene.updateThrusters(s.id,v,c.boost),s.pos.x=ti(s.pos.x,-es,es),s.pos.y=ti(s.pos.y,-Ar,Ar),s.pos.z=ti(s.pos.z,-es,es),c.brake?(this.brakePitch=Math.min(1,this.brakePitch+t/cM),this.cameraStiffness=sM):(this.brakePitch=Math.max(0,this.brakePitch-t/uM),this.cameraStiffness=_d);let O=Math.atan2(C.x,C.z)-s.rot.y;for(;O>Math.PI;)O-=Math.PI*2;for(;O<-Math.PI;)O+=Math.PI*2;s.rot.y+=ti(O,-x_*t,x_*t);const L=-Math.asin(ti(C.y,-1,1))-s.rot.x;s.rot.x+=ti(L,-y_*t,y_*t),s.rot.x+=lM*this.brakePitch;const w=ti(p.x/T,-1,1)*.35;s.rot.z=z2(s.rot.z,w,.15);const F=Math.sin(performance.now()*.001*hM)*fM;f.position.set(s.pos.x,s.pos.y+F,s.pos.z),f.rotation.set(s.rot.x,s.rot.y,s.rot.z),this.fireTimers[l]-=t,c.shoot&&this.fireTimers[l]<=0&&(this.playerShoot(s,l),this.fireTimers[l]=fs(s.weapon).fireRate),c.weaponSwitch>0&&s.weapons.includes(c.weaponSwitch)&&(s.weapon=c.weaponSwitch),s.invulnTimer>0&&(s.invulnTimer-=t),s.specialGauge=Math.min(s.specialGauge+t*2,s.maxSpecialGauge),c.special&&s.specialGauge>=100&&(this.useSpecial(s,l),s.specialGauge=0),s.combo>0&&(this.comboTimeout[l]-=t,this.comboTimeout[l]<=0&&(s.combo=0))})}worldToScreen(t){const n=this.scene.camera,s=n.matrixWorldInverse.elements,l=n.projectionMatrix.elements,c=t.x,f=t.y,h=t.z,p=s[0]*c+s[4]*f+s[8]*h+s[12],m=s[1]*c+s[5]*f+s[9]*h+s[13],g=s[2]*c+s[6]*f+s[10]*h+s[14],_=s[3]*c+s[7]*f+s[11]*h+s[15],v=l[0]*p+l[4]*m+l[8]*g+l[12]*_,M=l[1]*p+l[5]*m+l[9]*g+l[13]*_;l[2]*p+l[6]*m+l[10]*g+l[14]*_;const E=l[3]*p+l[7]*m+l[11]*g+l[15]*_;if(E<=0)return null;const T=v/E,S=M/E;return Math.abs(T)>1.2||Math.abs(S)>1.2?null:{x:(T*.5+.5)*this.canvas.width,y:(-S*.5+.5)*this.canvas.height}}computeAimDir(t){const n=this.scene.camera,s=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new $(0,0,-1).applyQuaternion(n.quaternion),f=new $(1,0,0).applyQuaternion(n.quaternion),h=new $(0,1,0).applyQuaternion(n.quaternion),p=Math.tan(n.fov*Math.PI/360),m=new $().addScaledVector(c,1).addScaledVector(f,s*p*n.aspect).addScaledVector(h,l*p).normalize();let g=1/0,_=null;for(const v of this.enemies){if(v.hp<=0)continue;const M=v.type===Se.Boss?4:1.5,E=n.position.x-v.pos.x,T=n.position.y-v.pos.y,S=n.position.z-v.pos.z,x=E*m.x+T*m.y+S*m.z,U=E*E+T*T+S*S-M*M,C=x*x-U;if(C<0)continue;const A=-x-Math.sqrt(C);A>=0&&A<g&&(g=A,_=v)}return _?Te(Ce(_.pos,t.pos)):this.computeCrosshairDir(t)}computeCrosshairDir(t){const n=this.scene.camera,s=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new $(0,0,-1).applyQuaternion(n.quaternion),f=new $(1,0,0).applyQuaternion(n.quaternion),h=new $(0,1,0).applyQuaternion(n.quaternion),p=Math.tan(n.fov*Math.PI/360),m=new $().addScaledVector(c,1).addScaledVector(f,s*p*n.aspect).addScaledVector(h,l*p).normalize(),g=120,_=new $(n.position.x+m.x*g,t.pos.y,n.position.z+m.z*g);return Te({x:_.x-t.pos.x,y:_.y-t.pos.y,z:_.z-t.pos.z})}pickSmartTarget(t){const s=fs(t.weapon).smartRadius,l=this.input.getMouseNormX()*this.canvas.width,c=this.input.getMouseNormY()*this.canvas.height;let f=null,h=1/0;for(const p of this.enemies){if(p.hp<=0)continue;const m=this.worldToScreen(p.pos);if(!m)continue;const g=m.x-l,_=m.y-c;if(g*g+_*_>s*s)continue;const v=mn(t.pos,p.pos);v<h&&(h=v,f=p)}return f}computeLeadDir(t,n,s){const l=this.enemyVels.get(n.id)||{x:0,y:0,z:0},c=s>.001?mn(t.pos,n.pos)/s:0;let f=Ye(n.pos,ge(l,c));const h=mn(t.pos,f);return s>.001&&h>.001&&(f=Ye(n.pos,ge(l,h/s))),Te(Ce(f,t.pos))}getLeadScreenPoint(){if(!this.lockOn||this.lockTargets[0]===null)return null;const t=this.players[0];if(!t)return null;const n=this.enemies.find(g=>g.id===this.lockTargets[0]&&g.hp>0);if(!n)return null;const s=fs(t.weapon),l=Math.max(s.lockRange,Nh);if(mn(n.pos,t.pos)>l)return null;const c=this.enemyVels.get(n.id)||{x:0,y:0,z:0},f=s.speed;let h=f>.001?mn(t.pos,n.pos)/f:0,p=Ye(n.pos,ge(c,h));const m=mn(t.pos,p);return f>.001&&m>.001&&(p=Ye(n.pos,ge(c,m/f))),this.worldToScreen(p)}playerShoot(t,n){const s=fs(t.weapon);if(!this.scene.playerMeshes.get(t.id))return;const c=this.lockTargets[n],f=c!==null?this.enemies.find(M=>M.id===c&&M.hp>0):null,h=f?mn(f.pos,t.pos):1/0,p=Math.max(s.lockRange,Nh),m=f!==null&&h<=p;if(s.fireMode===wi.LockRequired&&!m)return;let g;const _=f&&m?f:this.pickSmartTarget(t);_?g=this.computeLeadDir(t,_,s.speed):g=this.computeAimDir(t);const v=s.fireMode===wi.LockShortRange&&m;if(s.type===gn.Funnel)for(let M=0;M<Ov;M++){const E={id:bi(),pos:{...t.pos},vel:{x:0,y:0,z:0},damage:s.damage,owner:t.id,type:gn.Funnel,lifetime:V2,radius:.3,color:s.color,phase:"orbit",phaseTimer:gd,orbitAngle:M/Ov*Math.PI*2};if(this.projectiles.length<Lh){this.projectiles.push(E);const T=this.scene.createProjectileMesh(s.color,s.type);T.position.set(E.pos.x,E.pos.y,E.pos.z),this.scene.projectileMeshes.set(E.id,T),this.scene.scene.add(T)}}else for(let M=0;M<(s.type===gn.Spread?5:1);M++){const E=s.spread*(Math.random()-.5)*2,T=Te(Ye(g,{x:E,y:E*.5,z:0})),S={id:bi(),pos:{...t.pos},vel:ge(T,s.speed),damage:s.damage,owner:t.id,type:s.type,lifetime:3,radius:.3,color:s.color};if(v&&f&&(S.vel=ge(Te(Ce(f.pos,t.pos)),s.speed)),this.projectiles.length<Lh){this.projectiles.push(S);const x=this.scene.createProjectileMesh(s.color,s.type);x.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,x),this.scene.scene.add(x)}}fi.playShoot(600+Math.random()*400)}useSpecial(t,n){fi.playSpecial(),fi.playSpecialAnnounce(),this.enemies.forEach(s=>{mn(s.pos,t.pos)<50&&(s.hp-=150,this.scene.createExplosion(s.pos,"#00ffff",2))})}updateEnemies(t){this.enemies.forEach(n=>{if(n.hp<=0){this.scene.createExplosion(n.pos,n.type===Se.Boss?"#ff4400":"#ff6644",n.type===Se.Boss?3:1),fi.playExplosion(),this.enemyLastPos.delete(n.id),this.enemyVels.delete(n.id),this.players.forEach((p,m)=>{const g=n.type===Se.Boss?md(this.currentBossIndex+1).score:Zc(n.type).score;p.score+=g,p.kills++,p.combo++,this.comboTimeout[m]=iM});return}const s=n.type===Se.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);if(!s)return;const l=this.players.find(p=>p.alive);if(!l)return;const c=mn(n.pos,l.pos),f=Zc(n.type);switch(n.type){case Se.Scout:this.updateAIScout(n,l,c,f,t);break;case Se.Assault:this.updateAIAssault(n,l,c,f,t);break;case Se.Sniper:this.updateAISniper(n,l,c,f,t);break;case Se.Shield:this.updateAIShield(n,l,c,f,t);break;case Se.Bomber:this.updateAIBomber(n,l,c,f,t);break;case Se.Commander:this.updateAICommander(n,l,c,f,t);break;default:this.updateAIDefault(n,l,c,f,t)}if(n.state===Ht.Patrol&&n.type!==Se.Boss){const p=Te(Ce(l.pos,n.pos));n.pos=Ye(n.pos,ge(p,n.speed*.4*t))}n.state===Ht.Flee&&n.fleeTimer!==void 0&&(n.fleeTimer-=t,n.fleeTimer<=0&&(n.state=Ht.Chase)),n.hp<f.hp*.3&&n.type!==Se.Boss&&n.type!==Se.Bomber&&n.state!==Ht.Flee&&n.fleeTimer===void 0&&(n.state=Ht.Flee,n.fleeTimer=mM),n.pos.x=ti(n.pos.x,-es,es),n.pos.y=ti(n.pos.y,-Ar,Ar),n.pos.z=ti(n.pos.z,-es,es);const h=this.enemyLastPos.get(n.id);h?this.enemyVels.set(n.id,ge(Ce(n.pos,h),1/Math.max(t,1e-4))):this.enemyVels.set(n.id,{x:0,y:0,z:0}),this.enemyLastPos.set(n.id,{x:n.pos.x,y:n.pos.y,z:n.pos.z}),s.position.set(n.pos.x,n.pos.y,n.pos.z),s.rotation.y+=t*2,n.type===Se.Boss&&(s.rotation.x+=t*.5)}),this.enemies=this.enemies.filter(n=>{if(n.hp<=0){const s=n.type===Se.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);return s&&(this.scene.scene.remove(s),this.scene.enemyMeshes.delete(n.id),this.scene.bossMeshes.delete(n.id)),!1}return!0})}enemyShoot(t,n){const s=Te(Ce(n.pos,t.pos)),l=Zc(t.type),c={id:bi(),pos:{...t.pos},vel:ge(s,25),damage:l.damage,owner:t.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:l.color};if(this.projectiles.length<Lh){this.projectiles.push(c);const f=this.scene.createProjectileMesh(l.color,"bullet");f.position.set(c.pos.x,c.pos.y,c.pos.z),this.scene.projectileMeshes.set(c.id,f),this.scene.scene.add(f)}}updateAIDefault(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const h=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(h,t.speed*c))}break;case Ht.Attack:s>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.8+Math.random()*.6);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(Ce(t.pos,n.pos));t.pos=Ye(t.pos,ge(f,t.speed*1.5*c));break}}updateAIScout(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const m=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(m,t.speed*c))}break;case Ht.Attack:s>l.attackRange*1.3&&(t.state=Ht.Chase);const f=Te(Ce(t.pos,n.pos)),h={x:-f.z,y:0,z:f.x};t.pos=Ye(t.pos,ge(h,t.speed*.8*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.5+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const p=Te(Ce(t.pos,n.pos));t.pos=Ye(t.pos,ge(p,t.speed*1.5*c));break}}updateAIAssault(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:const f=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(f,t.speed*c)),s<l.attackRange&&(t.state=Ht.Attack);break;case Ht.Attack:const h=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(h,t.speed*.5*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.3+Math.random()*.3),s>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const p=Te(Ce(t.pos,n.pos));t.pos=Ye(t.pos,ge(p,t.speed*1.5*c));break}}updateAISniper(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else{const h=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(h,t.speed*c))}break;case Ht.Attack:if(s<l.attackRange*.5){const h=Te(Ce(t.pos,n.pos));t.pos=Ye(t.pos,ge(h,t.speed*c))}else s>l.attackRange*1.2&&(t.state=Ht.Chase);t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(Ce(t.pos,n.pos));t.pos=Ye(t.pos,ge(f,t.speed*1.5*c));break}}updateAIShield(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const p=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(p,t.speed*c))}break;case Ht.Attack:const f=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(f,t.speed*.3*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1.2+Math.random()*.8),s>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const h=Te(Ce(t.pos,n.pos));t.pos=Ye(t.pos,ge(h,t.speed*1.5*c));break}}updateAIBomber(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:case Ht.Attack:const f=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(f,t.speed*c));break}s<3&&(this.scene.createExplosion(t.pos,"#ff4400",2),fi.playExplosion(),n.hp-=l.damage,n.invulnTimer=__,t.hp=0)}updateAICommander(t,n,s,l,c){switch(this.enemies.forEach(f=>{if(f.id===t.id||f.hp<=0)return;mn(t.pos,f.pos)<30&&(f.speed=l.speed*1.3)}),t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const h=Te(Ce(n.pos,t.pos));t.pos=Ye(t.pos,ge(h,t.speed*c))}break;case Ht.Attack:s>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.6+Math.random()*.4);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(Ce(t.pos,n.pos));t.pos=Ye(t.pos,ge(f,t.speed*1.5*c));break}}updateProjectiles(t){this.projectiles.forEach(n=>{n.type===gn.Missile?this.steerMissile(n,t):n.type===gn.Funnel&&this.updateFunnel(n,t),n.pos=Ye(n.pos,ge(n.vel,t)),n.lifetime-=t;const s=this.scene.projectileMeshes.get(n.id);s&&(s.position.set(n.pos.x,n.pos.y,n.pos.z),n.type===gn.Missile&&(s.rotation.x+=t*5))}),this.projectiles=this.projectiles.filter(n=>{if(n.lifetime<=0){const s=this.scene.projectileMeshes.get(n.id);return s&&(this.scene.scene.remove(s),this.scene.projectileMeshes.delete(n.id)),!1}return!0})}steerMissile(t,n){const s=t.owner>=1e4,l=(s?F2:I2)*n;let c=null;if(s){let S=null,x=1/0;for(const U of this.players){if(!U.alive)continue;const C=mn(t.pos,U.pos);C<x&&(x=C,S=U)}S&&(c=Te(Ce(S.pos,t.pos)))}else{let S=null;const x=this.players.findIndex(C=>C.id===t.owner),U=x>=0?this.lockTargets[x]:null;if(U!=null){const C=this.enemies.find(A=>A.id===U&&A.hp>0);C&&(S=C)}if(!S){let C=1/0;for(const A of this.enemies){if(A.hp<=0)continue;const V=mn(t.pos,A.pos);V<C&&(C=V,S=A)}}S&&(c=Te(Ce(S.pos,t.pos)))}if(!c)return;const f=Math.sqrt(t.vel.x*t.vel.x+t.vel.y*t.vel.y+t.vel.z*t.vel.z);if(f<1e-4)return;const h=Te(t.vel),p=ti(h.x*c.x+h.y*c.y+h.z*c.z,-1,1),m=Math.acos(p);if(m<=l||m<1e-6){t.vel=ge(c,f);return}let g=h.y*c.z-h.z*c.y,_=h.z*c.x-h.x*c.z,v=h.x*c.y-h.y*c.x;const M=Math.sqrt(g*g+_*_+v*v);if(M<1e-6){const S=Math.abs(h.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};g=h.y*S.z-h.z*S.y,_=h.z*S.x-h.x*S.z,v=h.x*S.y-h.y*S.x}else g/=M,_/=M,v/=M;const E=Math.cos(l),T=Math.sin(l);t.vel={x:(h.x*E+(_*h.z-v*h.y)*T)*f,y:(h.y*E+(v*h.x-g*h.z)*T)*f,z:(h.z*E+(g*h.y-_*h.x)*T)*f}}updateFunnel(t,n){const s=this.players.find(l=>l.id===t.owner);if(!(!s||!s.alive)&&t.phase!=="strike"){t.phaseTimer=(t.phaseTimer??gd)-n;const l=(t.orbitAngle??0)+H2*n;if(t.orbitAngle=l,t.pos={x:s.pos.x+Math.cos(l)*Pv,y:s.pos.y+Math.sin(l*3)*.6,z:s.pos.z+Math.sin(l)*Pv},t.vel={x:0,y:0,z:0},t.phaseTimer<=0){let c=null,f=1/0;for(const h of this.enemies){if(h.hp<=0)continue;const p=mn(t.pos,h.pos);p<f&&(f=p,c=h)}c?(t.phase="strike",t.vel=ge(Te(Ce(c.pos,t.pos)),G2)):(t.phase="orbit",t.phaseTimer=gd)}}}updateParticles(t){}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(n=>{const s=n.type===Se.Boss?4:1.5;mn(t.pos,n.pos)<s&&(n.hp-=(n.shieldTimer||0)>0?t.damage*.5:t.damage,t.lifetime=0,this.scene.createExplosion(t.pos,"#ffaa00",.5),fi.playHit())})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(n=>{!n.alive||n.invulnTimer>0||mn(t.pos,n.pos)<tM&&(n.hp-=t.damage,t.lifetime=0,n.invulnTimer=__,this.cameraShake=.15,this.scene.createExplosion(t.pos,"#ff4444",.5),fi.playHit(),n.hp<=0&&(n.alive=!1,this.scene.createExplosion(n.pos,"#4488ff",3)))})})}spawnEnemies(t){const n=yn.getState(),s=n.game;if(s.wave<1){this.levelSpawned=0,this.enemySpawnTimer=0,this.waveTimer=0,n.setGame({wave:1});return}if(this.waveTimer>0){this.waveTimer-=t;return}const l=s.wave%eM===0;if(l&&!this.enemies.some(m=>m.type===Se.Boss)&&this.currentBossIndex<0){this.spawnBoss();return}const c=l?0:Math.min(6+s.wave,v_);if(this.enemySpawnTimer+=t,this.levelSpawned<c&&this.enemies.length<v_&&this.enemySpawnTimer>=.15){this.enemySpawnTimer=0;const m=[Se.Scout,Se.Assault,Se.Shield];s.wave>2&&m.push(Se.Sniper),s.wave>3&&m.push(Se.Bomber),s.wave>4&&m.push(Se.Commander);const g=m[B2(0,m.length-1)],_=Zc(g);let v;do{const T=Vr(30,Math.min(_.alertRange+25,80)),S=Math.random()*Math.PI*2,x=Vr(-.5,.5);v={x:this.players[0].pos.x+Math.sin(S)*T,y:ti(this.players[0].pos.y+Math.sin(x)*T,-Ar*.5,Ar*.5),z:this.players[0].pos.z+Math.cos(S)*T}}while(this.players.some(T=>mn(v,T.pos)<20));const M={id:bi(),type:g,pos:v,rot:{x:0,y:0,z:0},hp:_.hp*(1+s.wave*.1),maxHp:_.hp,speed:_.speed*(1+s.wave*.05),state:Ht.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(M);const E=this.scene.createEnemyMesh(new ee(_.color),_.size,g);E.position.set(v.x,v.y,v.z),this.scene.enemyMeshes.set(M.id,E),this.scene.scene.add(E),this.levelSpawned++}const f=this.enemies.some(m=>m.type===Se.Boss),h=this.enemies.some(m=>m.hp>0);(l?this.currentBossIndex>=0&&!f:this.levelSpawned>=c&&!h)&&(this.enemies.forEach(m=>{const g=m.type===Se.Boss?this.scene.bossMeshes.get(m.id):this.scene.enemyMeshes.get(m.id);g&&(this.scene.scene.remove(g),this.scene.enemyMeshes.delete(m.id),this.scene.bossMeshes.delete(m.id))}),this.enemies=[],this.levelSpawned=0,this.enemySpawnTimer=0,this.currentBossIndex=-1,this.waveTimer=2.5,n.setGame({wave:s.wave+1}))}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0;const n=md(t+1),s={x:Vr(-30,30),y:5,z:-50},l={id:bi(),type:Se.Boss,pos:s,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Ht.Phase1,targetId:0,attackTimer:2,phase:1,shieldTimer:0};this.enemies.push(l);const c=this.scene.createBossMesh(new ee(n.color),n.size);c.position.set(s.x,s.y,s.z),this.scene.bossMeshes.set(l.id,c),this.scene.scene.add(c),fi.playBossWarning(),fi.playBossAnnounce(n.name),yn.getState().setGame({bossFight:!0,bossName:n.name})}updateBoss(t){const n=this.enemies.find(f=>f.type===Se.Boss);if(!n){yn.getState().game.bossFight&&yn.getState().setGame({bossFight:!1,bossName:""});return}const s=md(this.currentBossIndex+1),l=n.hp/n.maxHp;if(s.phases.forEach((f,h)=>{l<=f.hpPercent&&(n.phase||1)<=h&&(n.phase=h+1,n.speed=f.speed,n.state=["phase1","phase2","phase3","phase4"][h])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(m=>m.alive);if(!f)return;const h=s.phases[(n.phase||1)-1];switch(h.attackPattern){case"spread":for(let g=0;g<12;g++){const _=g/12*Math.PI*2,v={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:bi(),pos:{...n.pos},vel:ge(v,10),damage:5,owner:n.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:"#ff4444"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff4444","bullet");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"laser":case"finalBeam":{const g=Te(Ce(f.pos,n.pos)),_={id:bi(),pos:{...n.pos},vel:ge(g,30),damage:25,owner:n.id+1e4,type:gn.Laser,lifetime:2,radius:.5,color:"#ff0000"};this.projectiles.push(_);const v=this.scene.createProjectileMesh("#ff0000","beam");v.position.set(_.pos.x,_.pos.y,_.pos.z),v.scale.set(1,1,3),this.scene.projectileMeshes.set(_.id,v),this.scene.scene.add(v);break}case"missile":for(let g=0;g<5;g++){const _=Te(Ce(f.pos,n.pos)),v={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2},M={id:bi(),pos:{...n.pos},vel:ge(Ye(_,v),8),damage:10,owner:n.id+1e4,type:gn.Missile,lifetime:5,radius:.4,color:"#ffaa00"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ffaa00","missile");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"rush":n.speed=20;const m=Te(Ce(f.pos,n.pos));n.pos=Ye(n.pos,ge(m,n.speed*t));break;case"clone":{const g=Te(Ce(f.pos,n.pos)),_=Math.atan2(g.z,g.x);for(let v=-2;v<=2;v++){const M=_+v*.6,E=Te({x:Math.cos(M),y:g.y,z:Math.sin(M)}),T={id:bi(),pos:{...n.pos},vel:ge(E,16),damage:8,owner:n.id+1e4,type:gn.BossBullet,lifetime:3.5,radius:.3,color:"#ff00ff"};this.projectiles.push(T);const S=this.scene.createProjectileMesh("#ff00ff","bullet");S.position.set(T.pos.x,T.pos.y,T.pos.z),this.scene.projectileMeshes.set(T.id,S),this.scene.scene.add(S)}break}case"fullLaser":{for(let g=0;g<6;g++){const _=this.bossSweepAngle+g/6*Math.PI*2,v={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:bi(),pos:{...n.pos},vel:ge(v,26),damage:15,owner:n.id+1e4,type:gn.Laser,lifetime:2.2,radius:.5,color:"#ff00ff"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff00ff","beam");E.position.set(M.pos.x,M.pos.y,M.pos.z),E.scale.set(1,1,3),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}this.bossSweepAngle+=Math.PI/8;break}case"shield":n.shieldTimer=Math.max(n.shieldTimer||0,4);break;case"laserNet":{const g=Te(Ce(f.pos,n.pos)),_=Math.atan2(g.z,g.x)+this.bossNetAngle;for(let v=0;v<9;v++){const M=v/8-.5,E=_+M*Math.PI*.66,T={x:Math.cos(E),y:0,z:Math.sin(E)},S={id:bi(),pos:{...n.pos},vel:ge(T,25),damage:12,owner:n.id+1e4,type:gn.Laser,lifetime:2.5,radius:.4,color:"#ffaa00"};this.projectiles.push(S);const x=this.scene.createProjectileMesh("#ffaa00","beam");x.position.set(S.pos.x,S.pos.y,S.pos.z),x.scale.set(1,1,3),this.scene.projectileMeshes.set(S.id,x),this.scene.scene.add(x)}this.bossNetAngle+=Math.PI/9;break}case"spawn":if(h.minionSpawn)for(let g=0;g<3;g++){const _={id:bi(),type:Se.Scout,pos:{x:n.pos.x+Vr(-5,5),y:0,z:n.pos.z+Vr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Ht.Chase,targetId:0,attackTimer:1};this.enemies.push(_);const v=this.scene.createEnemyMesh(new ee(4500223),1,"scout");v.position.set(_.pos.x,_.pos.y,_.pos.z),this.scene.enemyMeshes.set(_.id,v),this.scene.scene.add(v)}break}}const c=this.players.find(f=>f.alive);if(c){const f=s.phases[(n.phase||1)-1],h=Te(Ce(c.pos,n.pos));n.pos=Ye(n.pos,ge(h,(f?f.speed:n.speed)*t))}(n.shieldTimer||0)>0&&(n.shieldTimer=Math.max(0,(n.shieldTimer||0)-t))}updateUI(t){const n=yn.getState(),s=n.game;!this.players[0].alive&&!s.gameOver&&(n.setGame({gameOver:!0,screen:"result"}),this.stop()),n.setPlayers(this.players),n.setGame({score:this.players.reduce((l,c)=>l+c.score,0),time:s.time+t})}render(t){this.players.forEach((n,s)=>{const l=this.computeCrosshairDir(n);this.scene.updateCamera(n.pos,t,Math.atan2(l.x,l.z),this.cameraStiffness);const c=this.velocities[s],f=Math.min(1,Math.hypot(c.x,c.y,c.z)/n.speed);if(this.scene.setSpeedRatio(f),this.cameraShake>0){const g=this.scene.camera,_=this.cameraShake*2.5;g.position.x+=(Math.random()-.5)*_,g.position.y+=(Math.random()-.5)*_,this.cameraShake-=t}const h=this.lockTargets[s],p=h!==null?this.enemies.find(g=>g.id===h&&g.hp>0):null;if(p){const g=fs(n.weapon),_=Math.max(g.lockRange,Nh),v=mn(p.pos,n.pos)<=_?"#00ff88":"#ff4444";this.scene.updateLockIndicator(n.id,n.pos,p.pos,v)}else this.scene.updateLockIndicator(n.id,n.pos,null);const m=p?this.scene.enemyMeshes.get(p.id):null;if(m&&p){if(!this.enemyOutlineRef||this.enemyOutlineRef.enemyId!==p.id){this.enemyOutlineRef&&this.enemyOutlineRef.parent.remove(this.enemyOutlineRef.group);const _=this.scene.createOutline(m,"#ff5a3c");m.add(_),this.enemyOutlineRef={enemyId:p.id,parent:m,group:_}}const g=.35+.2*Math.sin(performance.now()*.001*Math.PI*6);this.enemyOutlineRef.group.traverse(_=>{const v=_;Array.isArray(v.material)||(v.material.opacity=g)}),this.enemyOutlineRef.group.visible=!0}else this.enemyOutlineRef&&(this.enemyOutlineRef.group.visible=!1)}),this.scene.render(t)}}const zv=["w","W","a","A","s","S","d","D","e","E","z","Z"," ","Tab","1","2","3","4","5","6","Shift","Control","Enter"],X2=()=>{const r=ls.useRef(null),t=ls.useRef(null),n=ls.useRef(null),s=ls.useRef(null),l=ls.useRef(null),c=ls.useRef({x:0,y:0});return ls.useEffect(()=>{const f=r.current;if(!f)return;f.width=window.innerWidth,f.height=window.innerHeight;const h=new k2(f);t.current=h;const p=()=>{f.width=window.innerWidth,f.height=window.innerHeight,h.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",p);const m=()=>{const U=n.current;if(!U)return;const C=h.input.getMouseNormX()*f.width,A=h.input.getMouseNormY()*f.height;U.style.transform=`translate(${C}px, ${A}px) translate(-50%, -50%)`};let g=0;const _=()=>{var V;m();const U=fs(((V=yn.getState().players[0])==null?void 0:V.weapon)||1);s.current&&s.current.getAttribute("r")!==String(U.smartRadius)&&s.current.setAttribute("r",String(U.smartRadius));const C=h.getLeadScreenPoint(),A=l.current;A&&(C?(A.style.display="block",A.style.transform=`translate(${C.x}px, ${C.y}px) translate(-50%, -50%)`):A.style.display="none"),g=requestAnimationFrame(_)};g=requestAnimationFrame(_);const v=U=>{(U.ctrlKey||U.metaKey)&&U.preventDefault(),h.input.keyDown(U.key),U.key==="Escape"&&(document.pointerLockElement===f&&document.exitPointerLock(),yn.getState().setGame({screen:"pause"})),zv.includes(U.key)&&U.preventDefault()},M=U=>{h.input.keyUp(U.key),zv.includes(U.key)&&U.preventDefault()},E=U=>{const C=c.current;if(document.pointerLockElement===f)C.x=Math.max(0,Math.min(f.width,C.x+U.movementX)),C.y=Math.max(0,Math.min(f.height,C.y+U.movementY));else{const A=f.getBoundingClientRect();C.x=U.clientX-A.left,C.y=U.clientY-A.top}h.input.mouseMove(C.x,C.y)},T=()=>{h.input.mouseDownFn(),document.pointerLockElement!==f&&f.requestPointerLock()},S=()=>h.input.mouseUpFn();window.addEventListener("keydown",v),window.addEventListener("keyup",M),f.addEventListener("mousemove",E),f.addEventListener("mousedown",T),f.addEventListener("mouseup",S);const x=U=>U.preventDefault();return f.addEventListener("contextmenu",x),h.start(),()=>{h.stop(),cancelAnimationFrame(g),window.removeEventListener("resize",p),window.removeEventListener("keydown",v),window.removeEventListener("keyup",M),f.removeEventListener("mousemove",E),f.removeEventListener("mousedown",T),f.removeEventListener("mouseup",S),f.removeEventListener("contextmenu",x)}},[]),tt.jsxs(tt.Fragment,{children:[tt.jsx("canvas",{ref:r,className:"absolute top-0 left-0 w-full h-full cursor-none"}),tt.jsxs("div",{ref:n,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{transform:"translate(-50%, -50%)"},children:[tt.jsx("svg",{className:"absolute -translate-x-1/2 -translate-y-1/2 overflow-visible",width:"0",height:"0",children:tt.jsx("circle",{ref:s,cx:"0",cy:"0",r:"60",fill:"none",stroke:"#33ff66",strokeOpacity:"0.35",strokeWidth:"1",strokeDasharray:"5 4"})}),tt.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:[tt.jsx("circle",{cx:"14",cy:"14",r:"10",fill:"none",stroke:"#33ff66",strokeWidth:"1.5"}),tt.jsx("circle",{cx:"14",cy:"14",r:"1.8",fill:"#33ff66"})]})]}),tt.jsx("div",{ref:l,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{display:"none",transform:"translate(-50%, -50%)",filter:"drop-shadow(0 0 3px rgba(255,140,66,0.9))"},children:tt.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",children:[tt.jsx("circle",{cx:"7",cy:"7",r:"5",fill:"none",stroke:"#ff8c42",strokeWidth:"1.5"}),tt.jsx("circle",{cx:"7",cy:"7",r:"1.2",fill:"#ff8c42"})]})})]})},q2={[wi.FreeFire]:"FR",[wi.LockShortRange]:"SR",[wi.LockRequired]:"LCK"},ru="#6a7fff",Bv="#33ff66",al="#ff3030",Kc="#ffdd44",Sa="#ffffff",Qc="rgba(255,255,255,0.55)",Gr="rgba(255,255,255,0.35)",Jc=({children:r,className:t="",color:n=ru})=>tt.jsx("div",{className:`relative border-2 bg-black/80 ${t}`,style:{borderColor:n},children:r}),$c=({pct:r,fill:t})=>tt.jsx("div",{className:"relative w-full h-[10px] border border-white/30 bg-black/85 overflow-hidden",children:tt.jsx("div",{className:"h-full",style:{width:`${r}%`,background:t}})}),W2=()=>{const{game:r,players:t}=yn(),n=t[0];if(!n)return null;const s=fs(n.weapon),l=Math.max(0,n.hp/n.maxHp*100),c=Math.max(0,n.energy/n.maxEnergy*100),f=Math.max(0,n.specialGauge/n.maxSpecialGauge*100),h=Math.round(n.speed);return tt.jsxs(tt.Fragment,{children:[tt.jsx("div",{className:"absolute top-3 left-3",children:tt.jsxs(Jc,{className:"px-3 py-2 min-w-[150px]",children:[tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[tt.jsx("span",{style:{color:Sa},children:"P1"}),tt.jsx("span",{style:{color:Bv},children:"EN"})]}),tt.jsx($c,{pct:c,fill:Bv}),tt.jsx("div",{className:"flex items-center justify-between text-[10px] mt-0.5",style:{color:Qc},children:tt.jsxs("span",{children:[Math.ceil(n.energy),"/",n.maxEnergy]})})]})}),tt.jsx("div",{className:"absolute top-3 right-3",children:tt.jsxs(Jc,{className:"px-3 py-2 min-w-[200px]",color:r.bossFight?al:ru,children:[tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[tt.jsxs("span",{style:{color:Sa},children:["LEVEL ",r.wave]}),tt.jsx("span",{style:{color:r.bossFight?al:Qc},children:r.bossFight?"BOSS":"PVE"})]}),r.bossFight&&tt.jsxs(tt.Fragment,{children:[tt.jsx("div",{className:"text-[10px] mb-1",style:{color:al},children:r.bossName}),tt.jsx($c,{pct:100,fill:al})]})]})}),tt.jsx("div",{className:"absolute bottom-3 left-3",children:tt.jsxs(Jc,{className:"px-3 py-2 min-w-[260px]",children:[tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[tt.jsx("span",{style:{color:Sa},children:"ARMOR"}),tt.jsxs("span",{style:{color:Sa},children:[Math.ceil(n.hp),"/",n.maxHp]})]}),tt.jsx($c,{pct:l,fill:al}),tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mt-2 mb-1",children:[tt.jsx("span",{style:{color:Sa},children:"SP"}),tt.jsxs("span",{style:{color:Kc},children:[Math.ceil(n.specialGauge),"%"]})]}),tt.jsx($c,{pct:f,fill:Kc}),tt.jsxs("div",{className:"flex items-center gap-2 mt-2 text-[10px]",style:{color:Qc},children:[tt.jsx("span",{style:{color:Gr},children:"WPN"}),tt.jsx("span",{style:{color:Sa},children:s.name}),tt.jsxs("span",{children:["DMG:",s.damage]}),tt.jsxs("span",{style:{color:Sa},children:["[",q2[s.fireMode],"]"]})]}),tt.jsxs("div",{className:"flex items-center gap-2 mt-1 text-[10px]",style:{color:Qc},children:[tt.jsx("span",{style:{color:Gr},children:"SCORE"}),tt.jsx("span",{style:{color:Sa},children:n.score}),n.combo>1&&tt.jsxs("span",{style:{color:Kc},children:["x",n.combo]})]})]})}),tt.jsx("div",{className:"absolute bottom-3 left-1/2 -translate-x-1/2",children:tt.jsxs("div",{className:"flex items-center gap-3",children:[tt.jsxs("div",{className:"px-3 py-2 border-2 bg-black/80",style:{borderColor:ru},children:[tt.jsx("div",{className:"text-[10px] tracking-widest",style:{color:Gr},children:"SPEED"}),tt.jsx("div",{className:"font-mono text-2xl leading-none",style:{color:Kc},children:String(h).padStart(3,"0")})]}),tt.jsxs("div",{className:"px-3 py-2 border-2 bg-black/80",style:{borderColor:ru},children:[tt.jsx("div",{className:"text-[10px] tracking-widest",style:{color:Gr},children:"TIME"}),tt.jsxs("div",{className:"font-mono text-2xl leading-none",style:{color:Sa},children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]})}),tt.jsx("div",{className:"absolute bottom-3 right-3",children:tt.jsxs(Jc,{className:"px-2 py-2",children:[tt.jsx("div",{className:"text-[10px] mb-1 tracking-wider",style:{color:Gr},children:"WEAPON"}),tt.jsx("div",{className:"flex items-center gap-1.5",children:n.weapons.map(p=>{const m=fs(p),g=p===n.weapon;return tt.jsx("div",{className:"w-9 h-9 flex items-center justify-center border",style:{background:"#ffdd44",borderColor:g?"#ffffff":"#000000"},title:m.name,children:tt.jsx("span",{style:{color:"#000000",fontSize:18,fontWeight:"bold"},children:p})},p)})})]})}),tt.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2",children:tt.jsx("div",{className:"px-3 py-1 bg-black/70 text-[9px] tracking-wider",style:{color:Gr},children:"WASD MOVE · MOUSE AIM · LMB FIRE · SPACE BOOST · E BRAKE · 1-4 SWITCH · Z SPECIAL · ESC PAUSE"})})]})},Y2=({size:r=80,opacity:t=.5})=>tt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[tt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),tt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),j2=()=>{const{game:r,setGame:t}=yn();return tt.jsxs("div",{className:"lancer-bg absolute inset-0 z-50 flex flex-col items-center justify-center",children:[tt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.05]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px"}}),tt.jsxs("div",{className:"relative z-10 mx-auto w-[420px] max-w-[90vw] lancer-frame px-8 py-6",children:[tt.jsx("h2",{className:"font-pixel-title text-center leading-none",style:{color:"#6a7fff",fontSize:"40px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff",letterSpacing:"0.1em"},children:"暂停"}),tt.jsx("div",{className:"text-center text-[10px] tracking-[0.3em] mt-1",style:{color:"#8fa4ff"},children:"PAUSED"}),tt.jsxs("div",{className:"mt-6 border-t border-lancer-blue/40 pt-4 space-y-2",children:[tt.jsx("button",{onClick:()=>t({screen:"pve",paused:!1}),className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"继续"}),tt.jsx("button",{onClick:()=>{yn.getState().resetGame(),t({screen:"menu"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"返回主菜单"})]}),tt.jsx("div",{className:"mt-4 flex items-center justify-center",children:tt.jsx(Y2,{size:32,opacity:.5})})]})]})},Z2=({size:r=80,opacity:t=.5})=>tt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[tt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),tt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),K2=()=>{const{game:r,players:t}=yn(),n=yn(s=>s.setGame);return tt.jsxs("div",{className:"lancer-bg w-full h-full flex flex-col items-center justify-center",children:[tt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.05]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px"}}),tt.jsx("div",{className:"relative z-10 lancer-frame-danger px-8 py-3 mb-6",children:tt.jsx("h1",{className:"font-pixel-title text-center leading-none tracking-[0.15em]",style:{color:"#ff3030",fontSize:"32px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff"},children:"GAME OVER"})}),tt.jsxs("div",{className:"relative z-10 lancer-frame-dim w-[340px] max-w-[90vw] px-5 py-4 mb-6",children:[tt.jsx("h3",{className:"font-pixel text-[14px] mb-3 tracking-[0.2em]",style:{color:"#6a7fff"},children:"战 绩"}),t.map((s,l)=>tt.jsxs("div",{className:"flex justify-between text-[13px] mb-1.5 tracking-wider",children:[tt.jsxs("span",{style:{color:"#ffffff"},children:["P",l+1]}),tt.jsxs("span",{style:{color:"#ffdd44"},children:["KILLS:",s.kills,"  SCORE:",s.score]})]},s.id)),tt.jsxs("div",{className:"flex justify-between text-[13px] mt-2 pt-2 tracking-wider",style:{borderTop:"1px solid rgba(106,127,255,0.4)"},children:[tt.jsx("span",{style:{color:"#ffffff"},children:"关卡"}),tt.jsxs("span",{style:{color:"#ffdd44"},children:["LEVEL ",r.wave]})]}),tt.jsxs("div",{className:"flex justify-between text-[13px] mt-1 tracking-wider",children:[tt.jsx("span",{style:{color:"#ffffff"},children:"用时"}),tt.jsxs("span",{style:{color:"#ffdd44"},children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]}),tt.jsxs("div",{className:"relative z-10 space-y-2 w-[260px]",children:[tt.jsx("button",{onClick:()=>{yn.getState().resetGame(),n({screen:"pve",gameMode:"pve"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"再来一局"}),tt.jsx("button",{onClick:()=>{yn.getState().resetGame(),n({screen:"menu"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"返回主菜单"})]}),tt.jsxs("div",{className:"mt-6 flex items-center gap-2",children:[tt.jsx(Z2,{size:28,opacity:.5}),tt.jsx("span",{className:"text-[10px] tracking-wider",style:{color:"rgba(255,255,255,0.5)"},children:"FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79"})]})]})},Q2=()=>{const r=yn(n=>n.game),t=()=>{switch(r.screen){case"menu":return tt.jsx(b_,{});case"pve":return tt.jsxs("div",{className:"w-full h-full relative",children:[tt.jsx(X2,{}),tt.jsx(W2,{})]});case"pause":return tt.jsxs("div",{className:"w-full h-full relative",children:[tt.jsx("div",{className:"w-full h-full bg-black/30"}),tt.jsx(j2,{})]});case"result":return tt.jsx(K2,{});default:return tt.jsx(b_,{})}};return tt.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};WS.createRoot(document.getElementById("root")).render(tt.jsx(sl.StrictMode,{children:tt.jsx(Q2,{})}));
