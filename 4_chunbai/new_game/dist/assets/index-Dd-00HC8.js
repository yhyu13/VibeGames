var US=Object.defineProperty;var LS=(r,t,n)=>t in r?US(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var Pt=(r,t,n)=>LS(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function Ov(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Th={exports:{}},Zo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $g;function NS(){if($g)return Zo;$g=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Zo.Fragment=t,Zo.jsx=n,Zo.jsxs=n,Zo}var t_;function OS(){return t_||(t_=1,Th.exports=NS()),Th.exports}var nt=OS(),bh={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e_;function PS(){if(e_)return ie;e_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.iterator;function M(z){return z===null||typeof z!="object"?null:(z=x&&z[x]||z["@@iterator"],typeof z=="function"?z:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,S={};function v(z,st,yt){this.props=z,this.context=st,this.refs=S,this.updater=yt||E}v.prototype.isReactComponent={},v.prototype.setState=function(z,st){if(typeof z!="object"&&typeof z!="function"&&z!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,z,st,"setState")},v.prototype.forceUpdate=function(z){this.updater.enqueueForceUpdate(this,z,"forceUpdate")};function L(){}L.prototype=v.prototype;function D(z,st,yt){this.props=z,this.context=st,this.refs=S,this.updater=yt||E}var w=D.prototype=new L;w.constructor=D,T(w,v.prototype),w.isPureReactComponent=!0;var W=Array.isArray;function I(){}var O={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function U(z,st,yt){var K=yt.ref;return{$$typeof:r,type:z,key:st,ref:K!==void 0?K:null,props:yt}}function R(z,st){return U(z.type,st,z.props)}function F(z){return typeof z=="object"&&z!==null&&z.$$typeof===r}function Q(z){var st={"=":"=0",":":"=2"};return"$"+z.replace(/[=:]/g,function(yt){return st[yt]})}var J=/\/+/g;function ct(z,st){return typeof z=="object"&&z!==null&&z.key!=null?Q(""+z.key):st.toString(36)}function ut(z){switch(z.status){case"fulfilled":return z.value;case"rejected":throw z.reason;default:switch(typeof z.status=="string"?z.then(I,I):(z.status="pending",z.then(function(st){z.status==="pending"&&(z.status="fulfilled",z.value=st)},function(st){z.status==="pending"&&(z.status="rejected",z.reason=st)})),z.status){case"fulfilled":return z.value;case"rejected":throw z.reason}}throw z}function P(z,st,yt,K,ht){var Et=typeof z;(Et==="undefined"||Et==="boolean")&&(z=null);var xt=!1;if(z===null)xt=!0;else switch(Et){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(z.$$typeof){case r:case t:xt=!0;break;case g:return xt=z._init,P(xt(z._payload),st,yt,K,ht)}}if(xt)return ht=ht(z),xt=K===""?"."+ct(z,0):K,W(ht)?(yt="",xt!=null&&(yt=xt.replace(J,"$&/")+"/"),P(ht,st,yt,"",function(ae){return ae})):ht!=null&&(F(ht)&&(ht=R(ht,yt+(ht.key==null||z&&z.key===ht.key?"":(""+ht.key).replace(J,"$&/")+"/")+xt)),st.push(ht)),1;xt=0;var Vt=K===""?".":K+":";if(W(z))for(var Gt=0;Gt<z.length;Gt++)K=z[Gt],Et=Vt+ct(K,Gt),xt+=P(K,st,yt,Et,ht);else if(Gt=M(z),typeof Gt=="function")for(z=Gt.call(z),Gt=0;!(K=z.next()).done;)K=K.value,Et=Vt+ct(K,Gt++),xt+=P(K,st,yt,Et,ht);else if(Et==="object"){if(typeof z.then=="function")return P(ut(z),st,yt,K,ht);throw st=String(z),Error("Objects are not valid as a React child (found: "+(st==="[object Object]"?"object with keys {"+Object.keys(z).join(", ")+"}":st)+"). If you meant to render a collection of children, use an array instead.")}return xt}function j(z,st,yt){if(z==null)return z;var K=[],ht=0;return P(z,K,"","",function(Et){return st.call(yt,Et,ht++)}),K}function Z(z){if(z._status===-1){var st=z._result;st=st(),st.then(function(yt){(z._status===0||z._status===-1)&&(z._status=1,z._result=yt)},function(yt){(z._status===0||z._status===-1)&&(z._status=2,z._result=yt)}),z._status===-1&&(z._status=0,z._result=st)}if(z._status===1)return z._result.default;throw z._result}var St=typeof reportError=="function"?reportError:function(z){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var st=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof z=="object"&&z!==null&&typeof z.message=="string"?String(z.message):String(z),error:z});if(!window.dispatchEvent(st))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",z);return}console.error(z)},Tt={map:j,forEach:function(z,st,yt){j(z,function(){st.apply(this,arguments)},yt)},count:function(z){var st=0;return j(z,function(){st++}),st},toArray:function(z){return j(z,function(st){return st})||[]},only:function(z){if(!F(z))throw Error("React.Children.only expected to receive a single React element child.");return z}};return ie.Activity=_,ie.Children=Tt,ie.Component=v,ie.Fragment=n,ie.Profiler=l,ie.PureComponent=D,ie.StrictMode=s,ie.Suspense=m,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,ie.__COMPILER_RUNTIME={__proto__:null,c:function(z){return O.H.useMemoCache(z)}},ie.cache=function(z){return function(){return z.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(z,st,yt){if(z==null)throw Error("The argument must be a React element, but you passed "+z+".");var K=T({},z.props),ht=z.key;if(st!=null)for(Et in st.key!==void 0&&(ht=""+st.key),st)!H.call(st,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&st.ref===void 0||(K[Et]=st[Et]);var Et=arguments.length-2;if(Et===1)K.children=yt;else if(1<Et){for(var xt=Array(Et),Vt=0;Vt<Et;Vt++)xt[Vt]=arguments[Vt+2];K.children=xt}return U(z.type,ht,K)},ie.createContext=function(z){return z={$$typeof:f,_currentValue:z,_currentValue2:z,_threadCount:0,Provider:null,Consumer:null},z.Provider=z,z.Consumer={$$typeof:c,_context:z},z},ie.createElement=function(z,st,yt){var K,ht={},Et=null;if(st!=null)for(K in st.key!==void 0&&(Et=""+st.key),st)H.call(st,K)&&K!=="key"&&K!=="__self"&&K!=="__source"&&(ht[K]=st[K]);var xt=arguments.length-2;if(xt===1)ht.children=yt;else if(1<xt){for(var Vt=Array(xt),Gt=0;Gt<xt;Gt++)Vt[Gt]=arguments[Gt+2];ht.children=Vt}if(z&&z.defaultProps)for(K in xt=z.defaultProps,xt)ht[K]===void 0&&(ht[K]=xt[K]);return U(z,Et,ht)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(z){return{$$typeof:d,render:z}},ie.isValidElement=F,ie.lazy=function(z){return{$$typeof:g,_payload:{_status:-1,_result:z},_init:Z}},ie.memo=function(z,st){return{$$typeof:p,type:z,compare:st===void 0?null:st}},ie.startTransition=function(z){var st=O.T,yt={};O.T=yt;try{var K=z(),ht=O.S;ht!==null&&ht(yt,K),typeof K=="object"&&K!==null&&typeof K.then=="function"&&K.then(I,St)}catch(Et){St(Et)}finally{st!==null&&yt.types!==null&&(st.types=yt.types),O.T=st}},ie.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},ie.use=function(z){return O.H.use(z)},ie.useActionState=function(z,st,yt){return O.H.useActionState(z,st,yt)},ie.useCallback=function(z,st){return O.H.useCallback(z,st)},ie.useContext=function(z){return O.H.useContext(z)},ie.useDebugValue=function(){},ie.useDeferredValue=function(z,st){return O.H.useDeferredValue(z,st)},ie.useEffect=function(z,st){return O.H.useEffect(z,st)},ie.useEffectEvent=function(z){return O.H.useEffectEvent(z)},ie.useId=function(){return O.H.useId()},ie.useImperativeHandle=function(z,st,yt){return O.H.useImperativeHandle(z,st,yt)},ie.useInsertionEffect=function(z,st){return O.H.useInsertionEffect(z,st)},ie.useLayoutEffect=function(z,st){return O.H.useLayoutEffect(z,st)},ie.useMemo=function(z,st){return O.H.useMemo(z,st)},ie.useOptimistic=function(z,st){return O.H.useOptimistic(z,st)},ie.useReducer=function(z,st,yt){return O.H.useReducer(z,st,yt)},ie.useRef=function(z){return O.H.useRef(z)},ie.useState=function(z){return O.H.useState(z)},ie.useSyncExternalStore=function(z,st,yt){return O.H.useSyncExternalStore(z,st,yt)},ie.useTransition=function(){return O.H.useTransition()},ie.version="19.2.8",ie}var n_;function sp(){return n_||(n_=1,bh.exports=PS()),bh.exports}var Os=sp();const al=Ov(Os);var Ah={exports:{}},Ko={},Rh={exports:{}},wh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i_;function zS(){return i_||(i_=1,(function(r){function t(P,j){var Z=P.length;P.push(j);t:for(;0<Z;){var St=Z-1>>>1,Tt=P[St];if(0<l(Tt,j))P[St]=j,P[Z]=Tt,Z=St;else break t}}function n(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var j=P[0],Z=P.pop();if(Z!==j){P[0]=Z;t:for(var St=0,Tt=P.length,z=Tt>>>1;St<z;){var st=2*(St+1)-1,yt=P[st],K=st+1,ht=P[K];if(0>l(yt,Z))K<Tt&&0>l(ht,yt)?(P[St]=ht,P[K]=Z,St=K):(P[St]=yt,P[st]=Z,St=st);else if(K<Tt&&0>l(ht,Z))P[St]=ht,P[K]=Z,St=K;else break t}}return j}function l(P,j){var Z=P.sortIndex-j.sortIndex;return Z!==0?Z:P.id-j.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();r.unstable_now=function(){return f.now()-d}}var m=[],p=[],g=1,_=null,x=3,M=!1,E=!1,T=!1,S=!1,v=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function w(P){for(var j=n(p);j!==null;){if(j.callback===null)s(p);else if(j.startTime<=P)s(p),j.sortIndex=j.expirationTime,t(m,j);else break;j=n(p)}}function W(P){if(T=!1,w(P),!E)if(n(m)!==null)E=!0,I||(I=!0,Q());else{var j=n(p);j!==null&&ut(W,j.startTime-P)}}var I=!1,O=-1,H=5,U=-1;function R(){return S?!0:!(r.unstable_now()-U<H)}function F(){if(S=!1,I){var P=r.unstable_now();U=P;var j=!0;try{t:{E=!1,T&&(T=!1,L(O),O=-1),M=!0;var Z=x;try{e:{for(w(P),_=n(m);_!==null&&!(_.expirationTime>P&&R());){var St=_.callback;if(typeof St=="function"){_.callback=null,x=_.priorityLevel;var Tt=St(_.expirationTime<=P);if(P=r.unstable_now(),typeof Tt=="function"){_.callback=Tt,w(P),j=!0;break e}_===n(m)&&s(m),w(P)}else s(m);_=n(m)}if(_!==null)j=!0;else{var z=n(p);z!==null&&ut(W,z.startTime-P),j=!1}}break t}finally{_=null,x=Z,M=!1}j=void 0}}finally{j?Q():I=!1}}}var Q;if(typeof D=="function")Q=function(){D(F)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,ct=J.port2;J.port1.onmessage=F,Q=function(){ct.postMessage(null)}}else Q=function(){v(F,0)};function ut(P,j){O=v(function(){P(r.unstable_now())},j)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(P){switch(x){case 1:case 2:case 3:var j=3;break;default:j=x}var Z=x;x=j;try{return P()}finally{x=Z}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(P,j){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var Z=x;x=P;try{return j()}finally{x=Z}},r.unstable_scheduleCallback=function(P,j,Z){var St=r.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?St+Z:St):Z=St,P){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=Z+Tt,P={id:g++,callback:j,priorityLevel:P,startTime:Z,expirationTime:Tt,sortIndex:-1},Z>St?(P.sortIndex=Z,t(p,P),n(m)===null&&P===n(p)&&(T?(L(O),O=-1):T=!0,ut(W,Z-St))):(P.sortIndex=Tt,t(m,P),E||M||(E=!0,I||(I=!0,Q()))),P},r.unstable_shouldYield=R,r.unstable_wrapCallback=function(P){var j=x;return function(){var Z=x;x=j;try{return P.apply(this,arguments)}finally{x=Z}}}})(wh)),wh}var a_;function BS(){return a_||(a_=1,Rh.exports=zS()),Rh.exports}var Ch={exports:{}},zn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s_;function IS(){if(s_)return zn;s_=1;var r=sp();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var s={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,zn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},zn.flushSync=function(m){var p=f.T,g=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=g,s.d.f()}},zn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},zn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},zn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:x,fetchPriority:M}):g==="script"&&s.d.X(m,{crossOrigin:_,integrity:x,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},zn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},zn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},zn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},zn.requestFormReset=function(m){s.d.r(m)},zn.unstable_batchedUpdates=function(m,p){return m(p)},zn.useFormState=function(m,p,g){return f.H.useFormState(m,p,g)},zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},zn.version="19.2.8",zn}var r_;function FS(){if(r_)return Ch.exports;r_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ch.exports=IS(),Ch.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o_;function HS(){if(o_)return Ko;o_=1;var r=BS(),t=sp(),n=FS();function s(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,a=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(a=i.return),e=i.return;while(e)}return i.tag===3?a:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(s(188));return i!==e?null:e}for(var a=e,o=i;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),e;if(h===o)return m(u),i;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var y=!1,b=u.child;b;){if(b===a){y=!0,a=u,o=h;break}if(b===o){y=!0,o=u,a=h;break}b=b.sibling}if(!y){for(b=h.child;b;){if(b===a){y=!0,a=h,o=u;break}if(b===o){y=!0,o=h,a=u;break}b=b.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),D=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),I=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),R=Symbol.for("react.memo_cache_sentinel"),F=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var J=Symbol.for("react.client.reference");function ct(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===J?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case v:return"Profiler";case S:return"StrictMode";case W:return"Suspense";case I:return"SuspenseList";case U:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case D:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case w:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return i=e.displayName||null,i!==null?i:ct(e.type)||"Memo";case H:i=e._payload,e=e._init;try{return ct(e(i))}catch{}}return null}var ut=Array.isArray,P=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z={pending:!1,data:null,method:null,action:null},St=[],Tt=-1;function z(e){return{current:e}}function st(e){0>Tt||(e.current=St[Tt],St[Tt]=null,Tt--)}function yt(e,i){Tt++,St[Tt]=e.current,e.current=i}var K=z(null),ht=z(null),Et=z(null),xt=z(null);function Vt(e,i){switch(yt(Et,i),yt(ht,e),yt(K,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Mg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Mg(i),e=Eg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}st(K),yt(K,e)}function Gt(){st(K),st(ht),st(Et)}function ae(e){e.memoizedState!==null&&yt(xt,e);var i=K.current,a=Eg(i,e.type);i!==a&&(yt(ht,e),yt(K,a))}function He(e){ht.current===e&&(st(K),st(ht)),xt.current===e&&(st(xt),qo._currentValue=Z)}var de,Ke;function q(e){if(de===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);de=i&&i[1]||"",Ke=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+de+e+Ke}var Nn=!1;function he(e,i){if(!e||Nn)return"";Nn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(lt){var it=lt}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(lt){it=lt}e.call(_t.prototype)}}else{try{throw Error()}catch(lt){it=lt}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(lt){if(lt&&it&&typeof lt.stack=="string")return[lt.stack,it.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),y=h[0],b=h[1];if(y&&b){var B=y.split(`
`),et=b.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<et.length&&!et[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===et.length)for(o=B.length-1,u=et.length-1;1<=o&&0<=u&&B[o]!==et[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==et[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==et[u]){var dt=`
`+B[o].replace(" at new "," at ");return e.displayName&&dt.includes("<anonymous>")&&(dt=dt.replace("<anonymous>",e.displayName)),dt}while(1<=o&&0<=u);break}}}finally{Nn=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?q(a):""}function ge(e,i){switch(e.tag){case 26:case 27:case 5:return q(e.type);case 16:return q("Lazy");case 13:return e.child!==i&&i!==null?q("Suspense Fallback"):q("Suspense");case 19:return q("SuspenseList");case 0:case 15:return he(e.type,!1);case 11:return he(e.type.render,!1);case 1:return he(e.type,!0);case 31:return q("Activity");default:return""}}function Qt(e){try{var i="",a=null;do i+=ge(e,a),a=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Pe=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,N=r.unstable_cancelCallback,A=r.unstable_shouldYield,at=r.unstable_requestPaint,pt=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,Ut=r.unstable_NormalPriority,zt=r.unstable_LowPriority,_e=r.unstable_IdlePriority,At=r.log,Bt=r.unstable_setDisableYieldValue,Kt=null,Yt=null;function Ot(e){if(typeof At=="function"&&Bt(e),Yt&&typeof Yt.setStrictMode=="function")try{Yt.setStrictMode(Kt,e)}catch{}}var te=Math.clz32?Math.clz32:V,re=Math.log,Ge=Math.LN2;function V(e){return e>>>=0,e===0?32:31-(re(e)/Ge|0)|0}var Rt=256,ft=262144,vt=4194304;function wt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Lt(e,i,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~h,o!==0?u=wt(o):(y&=b,y!==0?u=wt(y):a||(a=b&~e,a!==0&&(u=wt(a))))):(b=o&~h,b!==0?u=wt(b):y!==0?u=wt(y):a||(a=o&~e,a!==0&&(u=wt(a)))),u===0?0:i!==0&&i!==u&&(i&h)===0&&(h=u&-u,a=i&-i,h>=a||h===32&&(a&4194048)!==0)?i:u}function ee(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Qe(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pn(){var e=vt;return vt<<=1,(vt&62914560)===0&&(vt=4194304),e}function Re(e){for(var i=[],a=0;31>a;a++)i.push(e);return i}function bn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wi(e,i,a,o,u,h){var y=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,B=e.expirationTimes,et=e.hiddenUpdates;for(a=y&~a;0<a;){var dt=31-te(a),_t=1<<dt;b[dt]=0,B[dt]=-1;var it=et[dt];if(it!==null)for(et[dt]=null,dt=0;dt<it.length;dt++){var lt=it[dt];lt!==null&&(lt.lane&=-536870913)}a&=~_t}o!==0&&io(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~i))}function io(e,i,a){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-te(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function ao(e,i){var a=e.entangledLanes|=i;for(e=e.entanglements;a;){var o=31-te(a),u=1<<o;u&i|e[o]&i&&(e[o]|=i),a&=~u}}function Gi(e,i){var a=i&-i;return a=(a&42)!==0?1:us(a),(a&(e.suspendedLanes|i))!==0?0:a}function us(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ws(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function so(){var e=j.p;return e!==0?e:(e=window.event,e===void 0?32:Wg(e.type))}function fs(e,i){var a=j.p;try{return j.p=e,i()}finally{j.p=a}}var Ci=Math.random().toString(36).slice(2),tn="__reactFiber$"+Ci,An="__reactProps$"+Ci,Zi="__reactContainer$"+Ci,ro="__reactEvents$"+Ci,_u="__reactListeners$"+Ci,vu="__reactHandles$"+Ci,C="__reactResources$"+Ci,k="__reactMarker$"+Ci;function ot(e){delete e[tn],delete e[An],delete e[ro],delete e[_u],delete e[vu]}function rt(e){var i=e[tn];if(i)return i;for(var a=e.parentNode;a;){if(i=a[Zi]||a[tn]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(e=Dg(e);e!==null;){if(a=e[tn])return a;e=Dg(e)}return i}e=a,a=e.parentNode}return null}function X(e){if(e=e[tn]||e[Zi]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(s(33))}function Ct(e){var i=e[C];return i||(i=e[C]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Dt(e){e[k]=!0}var kt=new Set,ne={};function $t(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(ne[e]=i,e=0;e<i.length;e++)kt.add(i[e])}var be=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ze={},Ve={};function On(e){return Pe.call(Ve,e)?!0:Pe.call(ze,e)?!1:be.test(e)?Ve[e]=!0:(ze[e]=!0,!1)}function Se(e,i,a){if(On(i))if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+a)}}function Xt(e,i,a){if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+a)}}function mn(e,i,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(i,a,""+o)}}function se(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function wa(e,i,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,h.call(this,y)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Rn(e){if(!e._valueTracker){var i=Xn(e)?"checked":"value";e._valueTracker=wa(e,i,""+e[i])}}function Ca(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var a=i.getValue(),o="";return e&&(o=Xn(e)?e.checked?"true":"false":e.value),e=o,e!==a?(i.setValue(e),!0):!1}function Oe(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var pi=/[\n"\\]/g;function Sn(e){return e.replace(pi,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Pn(e,i,a,o,u,h,y,b){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+se(i)):e.value!==""+se(i)&&(e.value=""+se(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?mi(e,y,se(i)):a!=null?mi(e,y,se(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+se(b):e.removeAttribute("name")}function Di(e,i,a,o,u,h,y,b){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),i!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){Rn(e);return}a=a!=null?""+se(a):"",i=i!=null?""+se(i):a,b||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Rn(e)}function mi(e,i,a){i==="number"&&Oe(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Ki(e,i,a,o){if(e=e.options,i){i={};for(var u=0;u<a.length;u++)i["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=i.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+se(a),i=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function _p(e,i,a){if(i!=null&&(i=""+se(i),i!==e.value&&(e.value=i),a==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=a!=null?""+se(a):""}function vp(e,i,a,o){if(i==null){if(o!=null){if(a!=null)throw Error(s(92));if(ut(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),i=a}a=se(i),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Rn(e)}function Ys(e,i){if(i){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=i;return}}e.textContent=i}var Ax=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function xp(e,i,a){var o=i.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,a):typeof a!="number"||a===0||Ax.has(i)?i==="float"?e.cssFloat=a:e[i]=(""+a).trim():e[i]=a+"px"}function yp(e,i,a){if(i!=null&&typeof i!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&a[u]!==o&&xp(e,u,o)}else for(var h in i)i.hasOwnProperty(h)&&xp(e,h,i[h])}function xu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Rx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),wx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ml(e){return wx.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Qi(){}var yu=null;function Su(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var js=null,Zs=null;function Sp(e){var i=X(e);if(i&&(e=i.stateNode)){var a=e[An]||null;t:switch(e=i.stateNode,i.type){case"input":if(Pn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),i=a.name,a.type==="radio"&&i!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Sn(""+i)+'"][type="radio"]'),i=0;i<a.length;i++){var o=a[i];if(o!==e&&o.form===e.form){var u=o[An]||null;if(!u)throw Error(s(90));Pn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<a.length;i++)o=a[i],o.form===e.form&&Ca(o)}break t;case"textarea":_p(e,a.value,a.defaultValue);break t;case"select":i=a.value,i!=null&&Ki(e,!!a.multiple,i,!1)}}}var Mu=!1;function Mp(e,i,a){if(Mu)return e(i,a);Mu=!0;try{var o=e(i);return o}finally{if(Mu=!1,(js!==null||Zs!==null)&&(nc(),js&&(i=js,e=Zs,Zs=js=null,Sp(i),e)))for(i=0;i<e.length;i++)Sp(e[i])}}function oo(e,i){var a=e.stateNode;if(a===null)return null;var o=a[An]||null;if(o===null)return null;a=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,i,typeof a));return a}var Ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Eu=!1;if(Ji)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){Eu=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{Eu=!1}var Da=null,Tu=null,gl=null;function Ep(){if(gl)return gl;var e,i=Tu,a=i.length,o,u="value"in Da?Da.value:Da.textContent,h=u.length;for(e=0;e<a&&i[e]===u[e];e++);var y=a-e;for(o=1;o<=y&&i[a-o]===u[h-o];o++);return gl=u.slice(e,1<o?1-o:void 0)}function _l(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function vl(){return!0}function Tp(){return!1}function qn(e){function i(a,o,u,h,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(h):h[b]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?vl:Tp,this.isPropagationStopped=Tp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=vl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=vl)},persist:function(){},isPersistent:vl}),i}var hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xl=qn(hs),co=_({},hs,{view:0,detail:0}),Cx=qn(co),bu,Au,uo,yl=_({},co,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==uo&&(uo&&e.type==="mousemove"?(bu=e.screenX-uo.screenX,Au=e.screenY-uo.screenY):Au=bu=0,uo=e),bu)},movementY:function(e){return"movementY"in e?e.movementY:Au}}),bp=qn(yl),Dx=_({},yl,{dataTransfer:0}),Ux=qn(Dx),Lx=_({},co,{relatedTarget:0}),Ru=qn(Lx),Nx=_({},hs,{animationName:0,elapsedTime:0,pseudoElement:0}),Ox=qn(Nx),Px=_({},hs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),zx=qn(Px),Bx=_({},hs,{data:0}),Ap=qn(Bx),Ix={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Hx[e])?!!i[e]:!1}function wu(){return Gx}var Vx=_({},co,{key:function(e){if(e.key){var i=Ix[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=_l(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wu,charCode:function(e){return e.type==="keypress"?_l(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_l(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),kx=qn(Vx),Xx=_({},yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Rp=qn(Xx),qx=_({},co,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wu}),Wx=qn(qx),Yx=_({},hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),jx=qn(Yx),Zx=_({},yl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Kx=qn(Zx),Qx=_({},hs,{newState:0,oldState:0}),Jx=qn(Qx),$x=[9,13,27,32],Cu=Ji&&"CompositionEvent"in window,fo=null;Ji&&"documentMode"in document&&(fo=document.documentMode);var ty=Ji&&"TextEvent"in window&&!fo,wp=Ji&&(!Cu||fo&&8<fo&&11>=fo),Cp=" ",Dp=!1;function Up(e,i){switch(e){case"keyup":return $x.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ks=!1;function ey(e,i){switch(e){case"compositionend":return Lp(i);case"keypress":return i.which!==32?null:(Dp=!0,Cp);case"textInput":return e=i.data,e===Cp&&Dp?null:e;default:return null}}function ny(e,i){if(Ks)return e==="compositionend"||!Cu&&Up(e,i)?(e=Ep(),gl=Tu=Da=null,Ks=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return wp&&i.locale!=="ko"?null:i.data;default:return null}}var iy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Np(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!iy[e.type]:i==="textarea"}function Op(e,i,a,o){js?Zs?Zs.push(o):Zs=[o]:js=o,i=cc(i,"onChange"),0<i.length&&(a=new xl("onChange","change",null,a,o),e.push({event:a,listeners:i}))}var ho=null,po=null;function ay(e){gg(e,0)}function Sl(e){var i=bt(e);if(Ca(i))return e}function Pp(e,i){if(e==="change")return i}var zp=!1;if(Ji){var Du;if(Ji){var Uu="oninput"in document;if(!Uu){var Bp=document.createElement("div");Bp.setAttribute("oninput","return;"),Uu=typeof Bp.oninput=="function"}Du=Uu}else Du=!1;zp=Du&&(!document.documentMode||9<document.documentMode)}function Ip(){ho&&(ho.detachEvent("onpropertychange",Fp),po=ho=null)}function Fp(e){if(e.propertyName==="value"&&Sl(po)){var i=[];Op(i,po,e,Su(e)),Mp(ay,i)}}function sy(e,i,a){e==="focusin"?(Ip(),ho=i,po=a,ho.attachEvent("onpropertychange",Fp)):e==="focusout"&&Ip()}function ry(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Sl(po)}function oy(e,i){if(e==="click")return Sl(i)}function ly(e,i){if(e==="input"||e==="change")return Sl(i)}function cy(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ni=typeof Object.is=="function"?Object.is:cy;function mo(e,i){if(ni(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var a=Object.keys(e),o=Object.keys(i);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Pe.call(i,u)||!ni(e[u],i[u]))return!1}return!0}function Hp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gp(e,i){var a=Hp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=i&&o>=i)return{node:a,offset:i-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Hp(a)}}function Vp(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?Vp(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function kp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Oe(e.document);i instanceof e.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)e=i.contentWindow;else break;i=Oe(e.document)}return i}function Lu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var uy=Ji&&"documentMode"in document&&11>=document.documentMode,Qs=null,Nu=null,go=null,Ou=!1;function Xp(e,i,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ou||Qs==null||Qs!==Oe(o)||(o=Qs,"selectionStart"in o&&Lu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),go&&mo(go,o)||(go=o,o=cc(Nu,"onSelect"),0<o.length&&(i=new xl("onSelect","select",null,i,a),e.push({event:i,listeners:o}),i.target=Qs)))}function ds(e,i){var a={};return a[e.toLowerCase()]=i.toLowerCase(),a["Webkit"+e]="webkit"+i,a["Moz"+e]="moz"+i,a}var Js={animationend:ds("Animation","AnimationEnd"),animationiteration:ds("Animation","AnimationIteration"),animationstart:ds("Animation","AnimationStart"),transitionrun:ds("Transition","TransitionRun"),transitionstart:ds("Transition","TransitionStart"),transitioncancel:ds("Transition","TransitionCancel"),transitionend:ds("Transition","TransitionEnd")},Pu={},qp={};Ji&&(qp=document.createElement("div").style,"AnimationEvent"in window||(delete Js.animationend.animation,delete Js.animationiteration.animation,delete Js.animationstart.animation),"TransitionEvent"in window||delete Js.transitionend.transition);function ps(e){if(Pu[e])return Pu[e];if(!Js[e])return e;var i=Js[e],a;for(a in i)if(i.hasOwnProperty(a)&&a in qp)return Pu[e]=i[a];return e}var Wp=ps("animationend"),Yp=ps("animationiteration"),jp=ps("animationstart"),fy=ps("transitionrun"),hy=ps("transitionstart"),dy=ps("transitioncancel"),Zp=ps("transitionend"),Kp=new Map,zu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zu.push("scrollEnd");function Ui(e,i){Kp.set(e,i),$t(i,[e])}var Ml=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},gi=[],$s=0,Bu=0;function El(){for(var e=$s,i=Bu=$s=0;i<e;){var a=gi[i];gi[i++]=null;var o=gi[i];gi[i++]=null;var u=gi[i];gi[i++]=null;var h=gi[i];if(gi[i++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}h!==0&&Qp(a,u,h)}}function Tl(e,i,a,o){gi[$s++]=e,gi[$s++]=i,gi[$s++]=a,gi[$s++]=o,Bu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Iu(e,i,a,o){return Tl(e,i,a,o),bl(e)}function ms(e,i){return Tl(e,null,null,i),bl(e)}function Qp(e,i,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&i!==null&&(u=31-te(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=a|536870912),h):null}function bl(e){if(50<Io)throw Io=0,jf=null,Error(s(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var tr={};function py(e,i,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(e,i,a,o){return new py(e,i,a,o)}function Fu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $i(e,i){var a=e.alternate;return a===null?(a=ii(e.tag,i,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=i,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,i=e.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Jp(e,i){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,i=a.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Al(e,i,a,o,u,h){var y=0;if(o=e,typeof e=="function")Fu(e)&&(y=1);else if(typeof e=="string")y=xS(e,a,K.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case U:return e=ii(31,a,i,u),e.elementType=U,e.lanes=h,e;case T:return gs(a.children,u,h,i);case S:y=8,u|=24;break;case v:return e=ii(12,a,i,u|2),e.elementType=v,e.lanes=h,e;case W:return e=ii(13,a,i,u),e.elementType=W,e.lanes=h,e;case I:return e=ii(19,a,i,u),e.elementType=I,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case D:y=10;break t;case L:y=9;break t;case w:y=11;break t;case O:y=14;break t;case H:y=16,o=null;break t}y=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return i=ii(y,a,i,u),i.elementType=e,i.type=o,i.lanes=h,i}function gs(e,i,a,o){return e=ii(7,e,o,i),e.lanes=a,e}function Hu(e,i,a){return e=ii(6,e,null,i),e.lanes=a,e}function $p(e){var i=ii(18,null,null,0);return i.stateNode=e,i}function Gu(e,i,a){return i=ii(4,e.children!==null?e.children:[],e.key,i),i.lanes=a,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var tm=new WeakMap;function _i(e,i){if(typeof e=="object"&&e!==null){var a=tm.get(e);return a!==void 0?a:(i={value:e,source:i,stack:Qt(i)},tm.set(e,i),i)}return{value:e,source:i,stack:Qt(i)}}var er=[],nr=0,Rl=null,_o=0,vi=[],xi=0,Ua=null,Vi=1,ki="";function ta(e,i){er[nr++]=_o,er[nr++]=Rl,Rl=e,_o=i}function em(e,i,a){vi[xi++]=Vi,vi[xi++]=ki,vi[xi++]=Ua,Ua=e;var o=Vi;e=ki;var u=32-te(o)-1;o&=~(1<<u),a+=1;var h=32-te(i)+u;if(30<h){var y=u-u%5;h=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Vi=1<<32-te(i)+u|a<<u|o,ki=h+e}else Vi=1<<h|a<<u|o,ki=e}function Vu(e){e.return!==null&&(ta(e,1),em(e,1,0))}function ku(e){for(;e===Rl;)Rl=er[--nr],er[nr]=null,_o=er[--nr],er[nr]=null;for(;e===Ua;)Ua=vi[--xi],vi[xi]=null,ki=vi[--xi],vi[xi]=null,Vi=vi[--xi],vi[xi]=null}function nm(e,i){vi[xi++]=Vi,vi[xi++]=ki,vi[xi++]=Ua,Vi=i.id,ki=i.overflow,Ua=e}var wn=null,Ye=null,Me=!1,La=null,yi=!1,Xu=Error(s(519));function Na(e){var i=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw vo(_i(i,e)),Xu}function im(e){var i=e.stateNode,a=e.type,o=e.memoizedProps;switch(i[tn]=e,i[An]=o,a){case"dialog":me("cancel",i),me("close",i);break;case"iframe":case"object":case"embed":me("load",i);break;case"video":case"audio":for(a=0;a<Ho.length;a++)me(Ho[a],i);break;case"source":me("error",i);break;case"img":case"image":case"link":me("error",i),me("load",i);break;case"details":me("toggle",i);break;case"input":me("invalid",i),Di(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":me("invalid",i);break;case"textarea":me("invalid",i),vp(i,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||i.textContent===""+a||o.suppressHydrationWarning===!0||yg(i.textContent,a)?(o.popover!=null&&(me("beforetoggle",i),me("toggle",i)),o.onScroll!=null&&me("scroll",i),o.onScrollEnd!=null&&me("scrollend",i),o.onClick!=null&&(i.onclick=Qi),i=!0):i=!1,i||Na(e,!0)}function am(e){for(wn=e.return;wn;)switch(wn.tag){case 5:case 31:case 13:yi=!1;return;case 27:case 3:yi=!0;return;default:wn=wn.return}}function ir(e){if(e!==wn)return!1;if(!Me)return am(e),Me=!0,!1;var i=e.tag,a;if((a=i!==3&&i!==27)&&((a=i===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||ch(e.type,e.memoizedProps)),a=!a),a&&Ye&&Na(e),am(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ye=Cg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ye=Cg(e)}else i===27?(i=Ye,Ya(e.type)?(e=ph,ph=null,Ye=e):Ye=i):Ye=wn?Mi(e.stateNode.nextSibling):null;return!0}function _s(){Ye=wn=null,Me=!1}function qu(){var e=La;return e!==null&&(Zn===null?Zn=e:Zn.push.apply(Zn,e),La=null),e}function vo(e){La===null?La=[e]:La.push(e)}var Wu=z(null),vs=null,ea=null;function Oa(e,i,a){yt(Wu,i._currentValue),i._currentValue=a}function na(e){e._currentValue=Wu.current,st(Wu)}function Yu(e,i,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===a)break;e=e.return}}function ju(e,i,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var y=u.child;h=h.firstContext;t:for(;h!==null;){var b=h;h=u;for(var B=0;B<i.length;B++)if(b.context===i[B]){h.lanes|=a,b=h.alternate,b!==null&&(b.lanes|=a),Yu(h.return,a,e),o||(y=null);break t}h=b.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,h=y.alternate,h!==null&&(h.lanes|=a),Yu(y,a,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function ar(e,i,a,o){e=null;for(var u=i,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var b=u.type;ni(u.pendingProps.value,y.value)||(e!==null?e.push(b):e=[b])}}else if(u===xt.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(qo):e=[qo])}u=u.return}e!==null&&ju(i,e,a,o),i.flags|=262144}function wl(e){for(e=e.firstContext;e!==null;){if(!ni(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function xs(e){vs=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Cn(e){return sm(vs,e)}function Cl(e,i){return vs===null&&xs(e),sm(e,i)}function sm(e,i){var a=i._currentValue;if(i={context:i,memoizedValue:a,next:null},ea===null){if(e===null)throw Error(s(308));ea=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ea=ea.next=i;return a}var my=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(a){return a()})}},gy=r.unstable_scheduleCallback,_y=r.unstable_NormalPriority,ln={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zu(){return{controller:new my,data:new Map,refCount:0}}function xo(e){e.refCount--,e.refCount===0&&gy(_y,function(){e.controller.abort()})}var yo=null,Ku=0,sr=0,rr=null;function vy(e,i){if(yo===null){var a=yo=[];Ku=0,sr=th(),rr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Ku++,i.then(rm,rm),i}function rm(){if(--Ku===0&&yo!==null){rr!==null&&(rr.status="fulfilled");var e=yo;yo=null,sr=0,rr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function xy(e,i){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<a.length;u++)(0,a[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var om=P.S;P.S=function(e,i){X0=pt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&vy(e,i),om!==null&&om(e,i)};var ys=z(null);function Qu(){var e=ys.current;return e!==null?e:We.pooledCache}function Dl(e,i){i===null?yt(ys,ys.current):yt(ys,i.pool)}function lm(){var e=Qu();return e===null?null:{parent:ln._currentValue,pool:e}}var or=Error(s(460)),Ju=Error(s(474)),Ul=Error(s(542)),Ll={then:function(){}};function cm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function um(e,i,a){switch(a=e[a],a===void 0?e.push(i):a!==i&&(i.then(Qi,Qi),i=a),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,hm(e),e;default:if(typeof i.status=="string")i.then(Qi,Qi);else{if(e=We,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,hm(e),e}throw Ms=i,or}}function Ss(e){try{var i=e._init;return i(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ms=a,or):a}}var Ms=null;function fm(){if(Ms===null)throw Error(s(459));var e=Ms;return Ms=null,e}function hm(e){if(e===or||e===Ul)throw Error(s(483))}var lr=null,So=0;function Nl(e){var i=So;return So+=1,lr===null&&(lr=[]),um(lr,e,i)}function Mo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ol(e,i){throw i.$$typeof===x?Error(s(525)):(e=Object.prototype.toString.call(i),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function dm(e){function i(Y,G){if(e){var tt=Y.deletions;tt===null?(Y.deletions=[G],Y.flags|=16):tt.push(G)}}function a(Y,G){if(!e)return null;for(;G!==null;)i(Y,G),G=G.sibling;return null}function o(Y){for(var G=new Map;Y!==null;)Y.key!==null?G.set(Y.key,Y):G.set(Y.index,Y),Y=Y.sibling;return G}function u(Y,G){return Y=$i(Y,G),Y.index=0,Y.sibling=null,Y}function h(Y,G,tt){return Y.index=tt,e?(tt=Y.alternate,tt!==null?(tt=tt.index,tt<G?(Y.flags|=67108866,G):tt):(Y.flags|=67108866,G)):(Y.flags|=1048576,G)}function y(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function b(Y,G,tt,mt){return G===null||G.tag!==6?(G=Hu(tt,Y.mode,mt),G.return=Y,G):(G=u(G,tt),G.return=Y,G)}function B(Y,G,tt,mt){var jt=tt.type;return jt===T?dt(Y,G,tt.props.children,mt,tt.key):G!==null&&(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===H&&Ss(jt)===G.type)?(G=u(G,tt.props),Mo(G,tt),G.return=Y,G):(G=Al(tt.type,tt.key,tt.props,null,Y.mode,mt),Mo(G,tt),G.return=Y,G)}function et(Y,G,tt,mt){return G===null||G.tag!==4||G.stateNode.containerInfo!==tt.containerInfo||G.stateNode.implementation!==tt.implementation?(G=Gu(tt,Y.mode,mt),G.return=Y,G):(G=u(G,tt.children||[]),G.return=Y,G)}function dt(Y,G,tt,mt,jt){return G===null||G.tag!==7?(G=gs(tt,Y.mode,mt,jt),G.return=Y,G):(G=u(G,tt),G.return=Y,G)}function _t(Y,G,tt){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=Hu(""+G,Y.mode,tt),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return tt=Al(G.type,G.key,G.props,null,Y.mode,tt),Mo(tt,G),tt.return=Y,tt;case E:return G=Gu(G,Y.mode,tt),G.return=Y,G;case H:return G=Ss(G),_t(Y,G,tt)}if(ut(G)||Q(G))return G=gs(G,Y.mode,tt,null),G.return=Y,G;if(typeof G.then=="function")return _t(Y,Nl(G),tt);if(G.$$typeof===D)return _t(Y,Cl(Y,G),tt);Ol(Y,G)}return null}function it(Y,G,tt,mt){var jt=G!==null?G.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return jt!==null?null:b(Y,G,""+tt,mt);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case M:return tt.key===jt?B(Y,G,tt,mt):null;case E:return tt.key===jt?et(Y,G,tt,mt):null;case H:return tt=Ss(tt),it(Y,G,tt,mt)}if(ut(tt)||Q(tt))return jt!==null?null:dt(Y,G,tt,mt,null);if(typeof tt.then=="function")return it(Y,G,Nl(tt),mt);if(tt.$$typeof===D)return it(Y,G,Cl(Y,tt),mt);Ol(Y,tt)}return null}function lt(Y,G,tt,mt,jt){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return Y=Y.get(tt)||null,b(G,Y,""+mt,jt);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case M:return Y=Y.get(mt.key===null?tt:mt.key)||null,B(G,Y,mt,jt);case E:return Y=Y.get(mt.key===null?tt:mt.key)||null,et(G,Y,mt,jt);case H:return mt=Ss(mt),lt(Y,G,tt,mt,jt)}if(ut(mt)||Q(mt))return Y=Y.get(tt)||null,dt(G,Y,mt,jt,null);if(typeof mt.then=="function")return lt(Y,G,tt,Nl(mt),jt);if(mt.$$typeof===D)return lt(Y,G,tt,Cl(G,mt),jt);Ol(G,mt)}return null}function Ft(Y,G,tt,mt){for(var jt=null,De=null,qt=G,le=G=0,xe=null;qt!==null&&le<tt.length;le++){qt.index>le?(xe=qt,qt=null):xe=qt.sibling;var Ue=it(Y,qt,tt[le],mt);if(Ue===null){qt===null&&(qt=xe);break}e&&qt&&Ue.alternate===null&&i(Y,qt),G=h(Ue,G,le),De===null?jt=Ue:De.sibling=Ue,De=Ue,qt=xe}if(le===tt.length)return a(Y,qt),Me&&ta(Y,le),jt;if(qt===null){for(;le<tt.length;le++)qt=_t(Y,tt[le],mt),qt!==null&&(G=h(qt,G,le),De===null?jt=qt:De.sibling=qt,De=qt);return Me&&ta(Y,le),jt}for(qt=o(qt);le<tt.length;le++)xe=lt(qt,Y,le,tt[le],mt),xe!==null&&(e&&xe.alternate!==null&&qt.delete(xe.key===null?le:xe.key),G=h(xe,G,le),De===null?jt=xe:De.sibling=xe,De=xe);return e&&qt.forEach(function(Ja){return i(Y,Ja)}),Me&&ta(Y,le),jt}function Jt(Y,G,tt,mt){if(tt==null)throw Error(s(151));for(var jt=null,De=null,qt=G,le=G=0,xe=null,Ue=tt.next();qt!==null&&!Ue.done;le++,Ue=tt.next()){qt.index>le?(xe=qt,qt=null):xe=qt.sibling;var Ja=it(Y,qt,Ue.value,mt);if(Ja===null){qt===null&&(qt=xe);break}e&&qt&&Ja.alternate===null&&i(Y,qt),G=h(Ja,G,le),De===null?jt=Ja:De.sibling=Ja,De=Ja,qt=xe}if(Ue.done)return a(Y,qt),Me&&ta(Y,le),jt;if(qt===null){for(;!Ue.done;le++,Ue=tt.next())Ue=_t(Y,Ue.value,mt),Ue!==null&&(G=h(Ue,G,le),De===null?jt=Ue:De.sibling=Ue,De=Ue);return Me&&ta(Y,le),jt}for(qt=o(qt);!Ue.done;le++,Ue=tt.next())Ue=lt(qt,Y,le,Ue.value,mt),Ue!==null&&(e&&Ue.alternate!==null&&qt.delete(Ue.key===null?le:Ue.key),G=h(Ue,G,le),De===null?jt=Ue:De.sibling=Ue,De=Ue);return e&&qt.forEach(function(DS){return i(Y,DS)}),Me&&ta(Y,le),jt}function qe(Y,G,tt,mt){if(typeof tt=="object"&&tt!==null&&tt.type===T&&tt.key===null&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case M:t:{for(var jt=tt.key;G!==null;){if(G.key===jt){if(jt=tt.type,jt===T){if(G.tag===7){a(Y,G.sibling),mt=u(G,tt.props.children),mt.return=Y,Y=mt;break t}}else if(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===H&&Ss(jt)===G.type){a(Y,G.sibling),mt=u(G,tt.props),Mo(mt,tt),mt.return=Y,Y=mt;break t}a(Y,G);break}else i(Y,G);G=G.sibling}tt.type===T?(mt=gs(tt.props.children,Y.mode,mt,tt.key),mt.return=Y,Y=mt):(mt=Al(tt.type,tt.key,tt.props,null,Y.mode,mt),Mo(mt,tt),mt.return=Y,Y=mt)}return y(Y);case E:t:{for(jt=tt.key;G!==null;){if(G.key===jt)if(G.tag===4&&G.stateNode.containerInfo===tt.containerInfo&&G.stateNode.implementation===tt.implementation){a(Y,G.sibling),mt=u(G,tt.children||[]),mt.return=Y,Y=mt;break t}else{a(Y,G);break}else i(Y,G);G=G.sibling}mt=Gu(tt,Y.mode,mt),mt.return=Y,Y=mt}return y(Y);case H:return tt=Ss(tt),qe(Y,G,tt,mt)}if(ut(tt))return Ft(Y,G,tt,mt);if(Q(tt)){if(jt=Q(tt),typeof jt!="function")throw Error(s(150));return tt=jt.call(tt),Jt(Y,G,tt,mt)}if(typeof tt.then=="function")return qe(Y,G,Nl(tt),mt);if(tt.$$typeof===D)return qe(Y,G,Cl(Y,tt),mt);Ol(Y,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,G!==null&&G.tag===6?(a(Y,G.sibling),mt=u(G,tt),mt.return=Y,Y=mt):(a(Y,G),mt=Hu(tt,Y.mode,mt),mt.return=Y,Y=mt),y(Y)):a(Y,G)}return function(Y,G,tt,mt){try{So=0;var jt=qe(Y,G,tt,mt);return lr=null,jt}catch(qt){if(qt===or||qt===Ul)throw qt;var De=ii(29,qt,null,Y.mode);return De.lanes=mt,De.return=Y,De}finally{}}}var Es=dm(!0),pm=dm(!1),Pa=!1;function $u(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function tf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function za(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ba(e,i,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=bl(e),Qp(e,null,a),i}return Tl(e,o,i,a),bl(e)}function Eo(e,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,ao(e,a)}}function ef(e,i){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=y:h=h.next=y,a=a.next}while(a!==null);h===null?u=h=i:h=h.next=i}else u=h=i;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=i:e.next=i,a.lastBaseUpdate=i}var nf=!1;function To(){if(nf){var e=rr;if(e!==null)throw e}}function bo(e,i,a,o){nf=!1;var u=e.updateQueue;Pa=!1;var h=u.firstBaseUpdate,y=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var B=b,et=B.next;B.next=null,y===null?h=et:y.next=et,y=B;var dt=e.alternate;dt!==null&&(dt=dt.updateQueue,b=dt.lastBaseUpdate,b!==y&&(b===null?dt.firstBaseUpdate=et:b.next=et,dt.lastBaseUpdate=B))}if(h!==null){var _t=u.baseState;y=0,dt=et=B=null,b=h;do{var it=b.lane&-536870913,lt=it!==b.lane;if(lt?(ve&it)===it:(o&it)===it){it!==0&&it===sr&&(nf=!0),dt!==null&&(dt=dt.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Ft=e,Jt=b;it=i;var qe=a;switch(Jt.tag){case 1:if(Ft=Jt.payload,typeof Ft=="function"){_t=Ft.call(qe,_t,it);break t}_t=Ft;break t;case 3:Ft.flags=Ft.flags&-65537|128;case 0:if(Ft=Jt.payload,it=typeof Ft=="function"?Ft.call(qe,_t,it):Ft,it==null)break t;_t=_({},_t,it);break t;case 2:Pa=!0}}it=b.callback,it!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[it]:lt.push(it))}else lt={lane:it,tag:b.tag,payload:b.payload,callback:b.callback,next:null},dt===null?(et=dt=lt,B=_t):dt=dt.next=lt,y|=it;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;lt=b,b=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);dt===null&&(B=_t),u.baseState=B,u.firstBaseUpdate=et,u.lastBaseUpdate=dt,h===null&&(u.shared.lanes=0),Va|=y,e.lanes=y,e.memoizedState=_t}}function mm(e,i){if(typeof e!="function")throw Error(s(191,e));e.call(i)}function gm(e,i){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)mm(a[e],i)}var cr=z(null),Pl=z(0);function _m(e,i){e=fa,yt(Pl,e),yt(cr,i),fa=e|i.baseLanes}function af(){yt(Pl,fa),yt(cr,cr.current)}function sf(){fa=Pl.current,st(cr),st(Pl)}var ai=z(null),Si=null;function Ia(e){var i=e.alternate;yt(sn,sn.current&1),yt(ai,e),Si===null&&(i===null||cr.current!==null||i.memoizedState!==null)&&(Si=e)}function rf(e){yt(sn,sn.current),yt(ai,e),Si===null&&(Si=e)}function vm(e){e.tag===22?(yt(sn,sn.current),yt(ai,e),Si===null&&(Si=e)):Fa()}function Fa(){yt(sn,sn.current),yt(ai,ai.current)}function si(e){st(ai),Si===e&&(Si=null),st(sn)}var sn=z(0);function zl(e){for(var i=e;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||hh(a)||dh(a)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ia=0,oe=null,ke=null,cn=null,Bl=!1,ur=!1,Ts=!1,Il=0,Ao=0,fr=null,yy=0;function en(){throw Error(s(321))}function of(e,i){if(i===null)return!1;for(var a=0;a<i.length&&a<e.length;a++)if(!ni(e[a],i[a]))return!1;return!0}function lf(e,i,a,o,u,h){return ia=h,oe=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,P.H=e===null||e.memoizedState===null?e0:Ef,Ts=!1,h=a(o,u),Ts=!1,ur&&(h=ym(i,a,o,u)),xm(e),h}function xm(e){P.H=Co;var i=ke!==null&&ke.next!==null;if(ia=0,cn=ke=oe=null,Bl=!1,Ao=0,fr=null,i)throw Error(s(300));e===null||un||(e=e.dependencies,e!==null&&wl(e)&&(un=!0))}function ym(e,i,a,o){oe=e;var u=0;do{if(ur&&(fr=null),Ao=0,ur=!1,25<=u)throw Error(s(301));if(u+=1,cn=ke=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}P.H=n0,h=i(a,o)}while(ur);return h}function Sy(){var e=P.H,i=e.useState()[0];return i=typeof i.then=="function"?Ro(i):i,e=e.useState()[0],(ke!==null?ke.memoizedState:null)!==e&&(oe.flags|=1024),i}function cf(){var e=Il!==0;return Il=0,e}function uf(e,i,a){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~a}function ff(e){if(Bl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Bl=!1}ia=0,cn=ke=oe=null,ur=!1,Ao=Il=0,fr=null}function Fn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?oe.memoizedState=cn=e:cn=cn.next=e,cn}function rn(){if(ke===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=ke.next;var i=cn===null?oe.memoizedState:cn.next;if(i!==null)cn=i,ke=e;else{if(e===null)throw oe.alternate===null?Error(s(467)):Error(s(310));ke=e,e={memoizedState:ke.memoizedState,baseState:ke.baseState,baseQueue:ke.baseQueue,queue:ke.queue,next:null},cn===null?oe.memoizedState=cn=e:cn=cn.next=e}return cn}function Fl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ro(e){var i=Ao;return Ao+=1,fr===null&&(fr=[]),e=um(fr,e,i),i=oe,(cn===null?i.memoizedState:cn.next)===null&&(i=i.alternate,P.H=i===null||i.memoizedState===null?e0:Ef),e}function Hl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ro(e);if(e.$$typeof===D)return Cn(e)}throw Error(s(438,String(e)))}function hf(e){var i=null,a=oe.updateQueue;if(a!==null&&(i=a.memoCache),i==null){var o=oe.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),a===null&&(a=Fl(),oe.updateQueue=a),a.memoCache=i,a=i.data[i.index],a===void 0)for(a=i.data[i.index]=Array(e),o=0;o<e;o++)a[o]=R;return i.index++,a}function aa(e,i){return typeof i=="function"?i(e):i}function Gl(e){var i=rn();return df(i,ke,e)}function df(e,i,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var y=u.next;u.next=h.next,h.next=y}i.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{i=u.next;var b=y=null,B=null,et=i,dt=!1;do{var _t=et.lane&-536870913;if(_t!==et.lane?(ve&_t)===_t:(ia&_t)===_t){var it=et.revertLane;if(it===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null}),_t===sr&&(dt=!0);else if((ia&it)===it){et=et.next,it===sr&&(dt=!0);continue}else _t={lane:0,revertLane:et.revertLane,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},B===null?(b=B=_t,y=h):B=B.next=_t,oe.lanes|=it,Va|=it;_t=et.action,Ts&&a(h,_t),h=et.hasEagerState?et.eagerState:a(h,_t)}else it={lane:_t,revertLane:et.revertLane,gesture:et.gesture,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},B===null?(b=B=it,y=h):B=B.next=it,oe.lanes|=_t,Va|=_t;et=et.next}while(et!==null&&et!==i);if(B===null?y=h:B.next=b,!ni(h,e.memoizedState)&&(un=!0,dt&&(a=rr,a!==null)))throw a;e.memoizedState=h,e.baseState=y,e.baseQueue=B,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function pf(e){var i=rn(),a=i.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=i.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do h=e(h,y.action),y=y.next;while(y!==u);ni(h,i.memoizedState)||(un=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),a.lastRenderedState=h}return[h,o]}function Sm(e,i,a){var o=oe,u=rn(),h=Me;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=i();var y=!ni((ke||u).memoizedState,a);if(y&&(u.memoizedState=a,un=!0),u=u.queue,_f(Tm.bind(null,o,u,e),[e]),u.getSnapshot!==i||y||cn!==null&&cn.memoizedState.tag&1){if(o.flags|=2048,hr(9,{destroy:void 0},Em.bind(null,o,u,a,i),null),We===null)throw Error(s(349));h||(ia&127)!==0||Mm(o,i,a)}return a}function Mm(e,i,a){e.flags|=16384,e={getSnapshot:i,value:a},i=oe.updateQueue,i===null?(i=Fl(),oe.updateQueue=i,i.stores=[e]):(a=i.stores,a===null?i.stores=[e]:a.push(e))}function Em(e,i,a,o){i.value=a,i.getSnapshot=o,bm(i)&&Am(e)}function Tm(e,i,a){return a(function(){bm(i)&&Am(e)})}function bm(e){var i=e.getSnapshot;e=e.value;try{var a=i();return!ni(e,a)}catch{return!0}}function Am(e){var i=ms(e,2);i!==null&&Kn(i,e,2)}function mf(e){var i=Fn();if(typeof e=="function"){var a=e;if(e=a(),Ts){Ot(!0);try{a()}finally{Ot(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:e},i}function Rm(e,i,a,o){return e.baseState=a,df(e,ke,typeof o=="function"?o:aa)}function My(e,i,a,o,u){if(Xl(e))throw Error(s(485));if(e=i.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};P.T!==null?a(!0):h.isTransition=!1,o(h),a=i.pending,a===null?(h.next=i.pending=h,wm(i,h)):(h.next=a.next,i.pending=a.next=h)}}function wm(e,i){var a=i.action,o=i.payload,u=e.state;if(i.isTransition){var h=P.T,y={};P.T=y;try{var b=a(u,o),B=P.S;B!==null&&B(y,b),Cm(e,i,b)}catch(et){gf(e,i,et)}finally{h!==null&&y.types!==null&&(h.types=y.types),P.T=h}}else try{h=a(u,o),Cm(e,i,h)}catch(et){gf(e,i,et)}}function Cm(e,i,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Dm(e,i,o)},function(o){return gf(e,i,o)}):Dm(e,i,a)}function Dm(e,i,a){i.status="fulfilled",i.value=a,Um(i),e.state=a,i=e.pending,i!==null&&(a=i.next,a===i?e.pending=null:(a=a.next,i.next=a,wm(e,a)))}function gf(e,i,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=a,Um(i),i=i.next;while(i!==o)}e.action=null}function Um(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Lm(e,i){return i}function Nm(e,i){if(Me){var a=We.formState;if(a!==null){t:{var o=oe;if(Me){if(Ye){e:{for(var u=Ye,h=yi;u.nodeType!==8;){if(!h){u=null;break e}if(u=Mi(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Ye=Mi(u.nextSibling),o=u.data==="F!";break t}}Na(o)}o=!1}o&&(i=a[0])}}return a=Fn(),a.memoizedState=a.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lm,lastRenderedState:i},a.queue=o,a=Jm.bind(null,oe,o),o.dispatch=a,o=mf(!1),h=Mf.bind(null,oe,!1,o.queue),o=Fn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,a=My.bind(null,oe,u,h,a),u.dispatch=a,o.memoizedState=e,[i,a,!1]}function Om(e){var i=rn();return Pm(i,ke,e)}function Pm(e,i,a){if(i=df(e,i,Lm)[0],e=Gl(aa)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=Ro(i)}catch(y){throw y===or?Ul:y}else o=i;i=rn();var u=i.queue,h=u.dispatch;return a!==i.memoizedState&&(oe.flags|=2048,hr(9,{destroy:void 0},Ey.bind(null,u,a),null)),[o,h,e]}function Ey(e,i){e.action=i}function zm(e){var i=rn(),a=ke;if(a!==null)return Pm(i,a,e);rn(),i=i.memoizedState,a=rn();var o=a.queue.dispatch;return a.memoizedState=e,[i,o,!1]}function hr(e,i,a,o){return e={tag:e,create:a,deps:o,inst:i,next:null},i=oe.updateQueue,i===null&&(i=Fl(),oe.updateQueue=i),a=i.lastEffect,a===null?i.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,i.lastEffect=e),e}function Bm(){return rn().memoizedState}function Vl(e,i,a,o){var u=Fn();oe.flags|=e,u.memoizedState=hr(1|i,{destroy:void 0},a,o===void 0?null:o)}function kl(e,i,a,o){var u=rn();o=o===void 0?null:o;var h=u.memoizedState.inst;ke!==null&&o!==null&&of(o,ke.memoizedState.deps)?u.memoizedState=hr(i,h,a,o):(oe.flags|=e,u.memoizedState=hr(1|i,h,a,o))}function Im(e,i){Vl(8390656,8,e,i)}function _f(e,i){kl(2048,8,e,i)}function Ty(e){oe.flags|=4;var i=oe.updateQueue;if(i===null)i=Fl(),oe.updateQueue=i,i.events=[e];else{var a=i.events;a===null?i.events=[e]:a.push(e)}}function Fm(e){var i=rn().memoizedState;return Ty({ref:i,nextImpl:e}),function(){if((Le&2)!==0)throw Error(s(440));return i.impl.apply(void 0,arguments)}}function Hm(e,i){return kl(4,2,e,i)}function Gm(e,i){return kl(4,4,e,i)}function Vm(e,i){if(typeof i=="function"){e=e();var a=i(e);return function(){typeof a=="function"?a():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function km(e,i,a){a=a!=null?a.concat([e]):null,kl(4,4,Vm.bind(null,i,e),a)}function vf(){}function Xm(e,i){var a=rn();i=i===void 0?null:i;var o=a.memoizedState;return i!==null&&of(i,o[1])?o[0]:(a.memoizedState=[e,i],e)}function qm(e,i){var a=rn();i=i===void 0?null:i;var o=a.memoizedState;if(i!==null&&of(i,o[1]))return o[0];if(o=e(),Ts){Ot(!0);try{e()}finally{Ot(!1)}}return a.memoizedState=[o,i],o}function xf(e,i,a){return a===void 0||(ia&1073741824)!==0&&(ve&261930)===0?e.memoizedState=i:(e.memoizedState=a,e=W0(),oe.lanes|=e,Va|=e,a)}function Wm(e,i,a,o){return ni(a,i)?a:cr.current!==null?(e=xf(e,a,o),ni(e,i)||(un=!0),e):(ia&42)===0||(ia&1073741824)!==0&&(ve&261930)===0?(un=!0,e.memoizedState=a):(e=W0(),oe.lanes|=e,Va|=e,i)}function Ym(e,i,a,o,u){var h=j.p;j.p=h!==0&&8>h?h:8;var y=P.T,b={};P.T=b,Mf(e,!1,i,a);try{var B=u(),et=P.S;if(et!==null&&et(b,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var dt=xy(B,o);wo(e,i,dt,li(e))}else wo(e,i,o,li(e))}catch(_t){wo(e,i,{then:function(){},status:"rejected",reason:_t},li())}finally{j.p=h,y!==null&&b.types!==null&&(y.types=b.types),P.T=y}}function by(){}function yf(e,i,a,o){if(e.tag!==5)throw Error(s(476));var u=jm(e).queue;Ym(e,u,i,Z,a===null?by:function(){return Zm(e),a(o)})}function jm(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:Z,baseState:Z,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:Z},next:null};var a={};return i.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:a},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function Zm(e){var i=jm(e);i.next===null&&(i=e.alternate.memoizedState),wo(e,i.next.queue,{},li())}function Sf(){return Cn(qo)}function Km(){return rn().memoizedState}function Qm(){return rn().memoizedState}function Ay(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var a=li();e=za(a);var o=Ba(i,e,a);o!==null&&(Kn(o,i,a),Eo(o,i,a)),i={cache:Zu()},e.payload=i;return}i=i.return}}function Ry(e,i,a){var o=li();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Xl(e)?$m(i,a):(a=Iu(e,i,a,o),a!==null&&(Kn(a,e,o),t0(a,i,o)))}function Jm(e,i,a){var o=li();wo(e,i,a,o)}function wo(e,i,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Xl(e))$m(i,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var y=i.lastRenderedState,b=h(y,a);if(u.hasEagerState=!0,u.eagerState=b,ni(b,y))return Tl(e,i,u,0),We===null&&El(),!1}catch{}finally{}if(a=Iu(e,i,u,o),a!==null)return Kn(a,e,o),t0(a,i,o),!0}return!1}function Mf(e,i,a,o){if(o={lane:2,revertLane:th(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Xl(e)){if(i)throw Error(s(479))}else i=Iu(e,a,o,2),i!==null&&Kn(i,e,2)}function Xl(e){var i=e.alternate;return e===oe||i!==null&&i===oe}function $m(e,i){ur=Bl=!0;var a=e.pending;a===null?i.next=i:(i.next=a.next,a.next=i),e.pending=i}function t0(e,i,a){if((a&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,ao(e,a)}}var Co={readContext:Cn,use:Hl,useCallback:en,useContext:en,useEffect:en,useImperativeHandle:en,useLayoutEffect:en,useInsertionEffect:en,useMemo:en,useReducer:en,useRef:en,useState:en,useDebugValue:en,useDeferredValue:en,useTransition:en,useSyncExternalStore:en,useId:en,useHostTransitionStatus:en,useFormState:en,useActionState:en,useOptimistic:en,useMemoCache:en,useCacheRefresh:en};Co.useEffectEvent=en;var e0={readContext:Cn,use:Hl,useCallback:function(e,i){return Fn().memoizedState=[e,i===void 0?null:i],e},useContext:Cn,useEffect:Im,useImperativeHandle:function(e,i,a){a=a!=null?a.concat([e]):null,Vl(4194308,4,Vm.bind(null,i,e),a)},useLayoutEffect:function(e,i){return Vl(4194308,4,e,i)},useInsertionEffect:function(e,i){Vl(4,2,e,i)},useMemo:function(e,i){var a=Fn();i=i===void 0?null:i;var o=e();if(Ts){Ot(!0);try{e()}finally{Ot(!1)}}return a.memoizedState=[o,i],o},useReducer:function(e,i,a){var o=Fn();if(a!==void 0){var u=a(i);if(Ts){Ot(!0);try{a(i)}finally{Ot(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Ry.bind(null,oe,e),[o.memoizedState,e]},useRef:function(e){var i=Fn();return e={current:e},i.memoizedState=e},useState:function(e){e=mf(e);var i=e.queue,a=Jm.bind(null,oe,i);return i.dispatch=a,[e.memoizedState,a]},useDebugValue:vf,useDeferredValue:function(e,i){var a=Fn();return xf(a,e,i)},useTransition:function(){var e=mf(!1);return e=Ym.bind(null,oe,e.queue,!0,!1),Fn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,a){var o=oe,u=Fn();if(Me){if(a===void 0)throw Error(s(407));a=a()}else{if(a=i(),We===null)throw Error(s(349));(ve&127)!==0||Mm(o,i,a)}u.memoizedState=a;var h={value:a,getSnapshot:i};return u.queue=h,Im(Tm.bind(null,o,h,e),[e]),o.flags|=2048,hr(9,{destroy:void 0},Em.bind(null,o,h,a,i),null),a},useId:function(){var e=Fn(),i=We.identifierPrefix;if(Me){var a=ki,o=Vi;a=(o&~(1<<32-te(o)-1)).toString(32)+a,i="_"+i+"R_"+a,a=Il++,0<a&&(i+="H"+a.toString(32)),i+="_"}else a=yy++,i="_"+i+"r_"+a.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Sf,useFormState:Nm,useActionState:Nm,useOptimistic:function(e){var i=Fn();i.memoizedState=i.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=a,i=Mf.bind(null,oe,!0,a),a.dispatch=i,[e,i]},useMemoCache:hf,useCacheRefresh:function(){return Fn().memoizedState=Ay.bind(null,oe)},useEffectEvent:function(e){var i=Fn(),a={impl:e};return i.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Ef={readContext:Cn,use:Hl,useCallback:Xm,useContext:Cn,useEffect:_f,useImperativeHandle:km,useInsertionEffect:Hm,useLayoutEffect:Gm,useMemo:qm,useReducer:Gl,useRef:Bm,useState:function(){return Gl(aa)},useDebugValue:vf,useDeferredValue:function(e,i){var a=rn();return Wm(a,ke.memoizedState,e,i)},useTransition:function(){var e=Gl(aa)[0],i=rn().memoizedState;return[typeof e=="boolean"?e:Ro(e),i]},useSyncExternalStore:Sm,useId:Km,useHostTransitionStatus:Sf,useFormState:Om,useActionState:Om,useOptimistic:function(e,i){var a=rn();return Rm(a,ke,e,i)},useMemoCache:hf,useCacheRefresh:Qm};Ef.useEffectEvent=Fm;var n0={readContext:Cn,use:Hl,useCallback:Xm,useContext:Cn,useEffect:_f,useImperativeHandle:km,useInsertionEffect:Hm,useLayoutEffect:Gm,useMemo:qm,useReducer:pf,useRef:Bm,useState:function(){return pf(aa)},useDebugValue:vf,useDeferredValue:function(e,i){var a=rn();return ke===null?xf(a,e,i):Wm(a,ke.memoizedState,e,i)},useTransition:function(){var e=pf(aa)[0],i=rn().memoizedState;return[typeof e=="boolean"?e:Ro(e),i]},useSyncExternalStore:Sm,useId:Km,useHostTransitionStatus:Sf,useFormState:zm,useActionState:zm,useOptimistic:function(e,i){var a=rn();return ke!==null?Rm(a,ke,e,i):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:hf,useCacheRefresh:Qm};n0.useEffectEvent=Fm;function Tf(e,i,a,o){i=e.memoizedState,a=a(o,i),a=a==null?i:_({},i,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var bf={enqueueSetState:function(e,i,a){e=e._reactInternals;var o=li(),u=za(o);u.payload=i,a!=null&&(u.callback=a),i=Ba(e,u,o),i!==null&&(Kn(i,e,o),Eo(i,e,o))},enqueueReplaceState:function(e,i,a){e=e._reactInternals;var o=li(),u=za(o);u.tag=1,u.payload=i,a!=null&&(u.callback=a),i=Ba(e,u,o),i!==null&&(Kn(i,e,o),Eo(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var a=li(),o=za(a);o.tag=2,i!=null&&(o.callback=i),i=Ba(e,o,a),i!==null&&(Kn(i,e,a),Eo(i,e,a))}};function i0(e,i,a,o,u,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,y):i.prototype&&i.prototype.isPureReactComponent?!mo(a,o)||!mo(u,h):!0}function a0(e,i,a,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,o),i.state!==e&&bf.enqueueReplaceState(i,i.state,null)}function bs(e,i){var a=i;if("ref"in i){a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}if(e=e.defaultProps){a===i&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function s0(e){Ml(e)}function r0(e){console.error(e)}function o0(e){Ml(e)}function ql(e,i){try{var a=e.onUncaughtError;a(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function l0(e,i,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Af(e,i,a){return a=za(a),a.tag=3,a.payload={element:null},a.callback=function(){ql(e,i)},a}function c0(e){return e=za(e),e.tag=3,e}function u0(e,i,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){l0(i,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){l0(i,a,o),typeof u!="function"&&(ka===null?ka=new Set([this]):ka.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function wy(e,i,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=a.alternate,i!==null&&ar(i,a,u,!0),a=ai.current,a!==null){switch(a.tag){case 31:case 13:return Si===null?ic():a.alternate===null&&nn===0&&(nn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Ll?a.flags|=16384:(i=a.updateQueue,i===null?a.updateQueue=new Set([o]):i.add(o),Qf(e,o,u)),!1;case 22:return a.flags|=65536,o===Ll?a.flags|=16384:(i=a.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=i):(a=i.retryQueue,a===null?i.retryQueue=new Set([o]):a.add(o)),Qf(e,o,u)),!1}throw Error(s(435,a.tag))}return Qf(e,o,u),ic(),!1}if(Me)return i=ai.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==Xu&&(e=Error(s(422),{cause:o}),vo(_i(e,a)))):(o!==Xu&&(i=Error(s(423),{cause:o}),vo(_i(i,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=_i(o,a),u=Af(e.stateNode,o,u),ef(e,u),nn!==4&&(nn=2)),!1;var h=Error(s(520),{cause:o});if(h=_i(h,a),Bo===null?Bo=[h]:Bo.push(h),nn!==4&&(nn=2),i===null)return!0;o=_i(o,a),a=i;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=Af(a.stateNode,o,e),ef(a,e),!1;case 1:if(i=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(ka===null||!ka.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=c0(u),u0(u,e,a,o),ef(a,u),!1}a=a.return}while(a!==null);return!1}var Rf=Error(s(461)),un=!1;function Dn(e,i,a,o){i.child=e===null?pm(i,null,a,o):Es(i,e.child,a,o)}function f0(e,i,a,o,u){a=a.render;var h=i.ref;if("ref"in o){var y={};for(var b in o)b!=="ref"&&(y[b]=o[b])}else y=o;return xs(i),o=lf(e,i,a,y,h,u),b=cf(),e!==null&&!un?(uf(e,i,u),sa(e,i,u)):(Me&&b&&Vu(i),i.flags|=1,Dn(e,i,o,u),i.child)}function h0(e,i,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!Fu(h)&&h.defaultProps===void 0&&a.compare===null?(i.tag=15,i.type=h,d0(e,i,h,o,u)):(e=Al(a.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(h=e.child,!Pf(e,u)){var y=h.memoizedProps;if(a=a.compare,a=a!==null?a:mo,a(y,o)&&e.ref===i.ref)return sa(e,i,u)}return i.flags|=1,e=$i(h,o),e.ref=i.ref,e.return=i,i.child=e}function d0(e,i,a,o,u){if(e!==null){var h=e.memoizedProps;if(mo(h,o)&&e.ref===i.ref)if(un=!1,i.pendingProps=o=h,Pf(e,u))(e.flags&131072)!==0&&(un=!0);else return i.lanes=e.lanes,sa(e,i,u)}return wf(e,i,a,o,u)}function p0(e,i,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,i.child=null;return m0(e,i,h,a,o)}if((a&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Dl(i,h!==null?h.cachePool:null),h!==null?_m(i,h):af(),vm(i);else return o=i.lanes=536870912,m0(e,i,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Dl(i,h.cachePool),_m(i,h),Fa(),i.memoizedState=null):(e!==null&&Dl(i,null),af(),Fa());return Dn(e,i,u,a),i.child}function Do(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function m0(e,i,a,o,u){var h=Qu();return h=h===null?null:{parent:ln._currentValue,pool:h},i.memoizedState={baseLanes:a,cachePool:h},e!==null&&Dl(i,null),af(),vm(i),e!==null&&ar(e,i,o,!0),i.childLanes=u,null}function Wl(e,i){return i=jl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function g0(e,i,a){return Es(i,e.child,null,a),e=Wl(i,i.pendingProps),e.flags|=2,si(i),i.memoizedState=null,e}function Cy(e,i,a){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Me){if(o.mode==="hidden")return e=Wl(i,o),i.lanes=536870912,Do(null,e);if(rf(i),(e=Ye)?(e=wg(e,yi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ua!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},a=$p(e),a.return=i,i.child=a,wn=i,Ye=null)):e=null,e===null)throw Na(i);return i.lanes=536870912,null}return Wl(i,o)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(rf(i),u)if(i.flags&256)i.flags&=-257,i=g0(e,i,a);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(s(558));else if(un||ar(e,i,a,!1),u=(a&e.childLanes)!==0,un||u){if(o=We,o!==null&&(y=Gi(o,a),y!==0&&y!==h.retryLane))throw h.retryLane=y,ms(e,y),Kn(o,e,y),Rf;ic(),i=g0(e,i,a)}else e=h.treeContext,Ye=Mi(y.nextSibling),wn=i,Me=!0,La=null,yi=!1,e!==null&&nm(i,e),i=Wl(i,o),i.flags|=4096;return i}return e=$i(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Yl(e,i){var a=i.ref;if(a===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(i.flags|=4194816)}}function wf(e,i,a,o,u){return xs(i),a=lf(e,i,a,o,void 0,u),o=cf(),e!==null&&!un?(uf(e,i,u),sa(e,i,u)):(Me&&o&&Vu(i),i.flags|=1,Dn(e,i,a,u),i.child)}function _0(e,i,a,o,u,h){return xs(i),i.updateQueue=null,a=ym(i,o,a,u),xm(e),o=cf(),e!==null&&!un?(uf(e,i,h),sa(e,i,h)):(Me&&o&&Vu(i),i.flags|=1,Dn(e,i,a,h),i.child)}function v0(e,i,a,o,u){if(xs(i),i.stateNode===null){var h=tr,y=a.contextType;typeof y=="object"&&y!==null&&(h=Cn(y)),h=new a(o,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=bf,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=o,h.state=i.memoizedState,h.refs={},$u(i),y=a.contextType,h.context=typeof y=="object"&&y!==null?Cn(y):tr,h.state=i.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(Tf(i,a,y,o),h.state=i.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&bf.enqueueReplaceState(h,h.state,null),bo(i,o,h,u),To(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){h=i.stateNode;var b=i.memoizedProps,B=bs(a,b);h.props=B;var et=h.context,dt=a.contextType;y=tr,typeof dt=="object"&&dt!==null&&(y=Cn(dt));var _t=a.getDerivedStateFromProps;dt=typeof _t=="function"||typeof h.getSnapshotBeforeUpdate=="function",b=i.pendingProps!==b,dt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(b||et!==y)&&a0(i,h,o,y),Pa=!1;var it=i.memoizedState;h.state=it,bo(i,o,h,u),To(),et=i.memoizedState,b||it!==et||Pa?(typeof _t=="function"&&(Tf(i,a,_t,o),et=i.memoizedState),(B=Pa||i0(i,a,B,o,it,et,y))?(dt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=et),h.props=o,h.state=et,h.context=y,o=B):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{h=i.stateNode,tf(e,i),y=i.memoizedProps,dt=bs(a,y),h.props=dt,_t=i.pendingProps,it=h.context,et=a.contextType,B=tr,typeof et=="object"&&et!==null&&(B=Cn(et)),b=a.getDerivedStateFromProps,(et=typeof b=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==_t||it!==B)&&a0(i,h,o,B),Pa=!1,it=i.memoizedState,h.state=it,bo(i,o,h,u),To();var lt=i.memoizedState;y!==_t||it!==lt||Pa||e!==null&&e.dependencies!==null&&wl(e.dependencies)?(typeof b=="function"&&(Tf(i,a,b,o),lt=i.memoizedState),(dt=Pa||i0(i,a,dt,o,it,lt,B)||e!==null&&e.dependencies!==null&&wl(e.dependencies))?(et||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,lt,B),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,lt,B)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=lt),h.props=o,h.state=lt,h.context=B,o=dt):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),o=!1)}return h=o,Yl(e,i),o=(i.flags&128)!==0,h||o?(h=i.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,e!==null&&o?(i.child=Es(i,e.child,null,u),i.child=Es(i,null,a,u)):Dn(e,i,a,u),i.memoizedState=h.state,e=i.child):e=sa(e,i,u),e}function x0(e,i,a,o){return _s(),i.flags|=256,Dn(e,i,a,o),i.child}var Cf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Df(e){return{baseLanes:e,cachePool:lm()}}function Uf(e,i,a){return e=e!==null?e.childLanes&~a:0,i&&(e|=oi),e}function y0(e,i,a){var o=i.pendingProps,u=!1,h=(i.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:(sn.current&2)!==0),y&&(u=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Me){if(u?Ia(i):Fa(),(e=Ye)?(e=wg(e,yi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ua!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},a=$p(e),a.return=i,i.child=a,wn=i,Ye=null)):e=null,e===null)throw Na(i);return dh(e)?i.lanes=32:i.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Fa(),u=i.mode,b=jl({mode:"hidden",children:b},u),o=gs(o,u,a,null),b.return=i,o.return=i,b.sibling=o,i.child=b,o=i.child,o.memoizedState=Df(a),o.childLanes=Uf(e,y,a),i.memoizedState=Cf,Do(null,o)):(Ia(i),Lf(i,b))}var B=e.memoizedState;if(B!==null&&(b=B.dehydrated,b!==null)){if(h)i.flags&256?(Ia(i),i.flags&=-257,i=Nf(e,i,a)):i.memoizedState!==null?(Fa(),i.child=e.child,i.flags|=128,i=null):(Fa(),b=o.fallback,u=i.mode,o=jl({mode:"visible",children:o.children},u),b=gs(b,u,a,null),b.flags|=2,o.return=i,b.return=i,o.sibling=b,i.child=o,Es(i,e.child,null,a),o=i.child,o.memoizedState=Df(a),o.childLanes=Uf(e,y,a),i.memoizedState=Cf,i=Do(null,o));else if(Ia(i),dh(b)){if(y=b.nextSibling&&b.nextSibling.dataset,y)var et=y.dgst;y=et,o=Error(s(419)),o.stack="",o.digest=y,vo({value:o,source:null,stack:null}),i=Nf(e,i,a)}else if(un||ar(e,i,a,!1),y=(a&e.childLanes)!==0,un||y){if(y=We,y!==null&&(o=Gi(y,a),o!==0&&o!==B.retryLane))throw B.retryLane=o,ms(e,o),Kn(y,e,o),Rf;hh(b)||ic(),i=Nf(e,i,a)}else hh(b)?(i.flags|=192,i.child=e.child,i=null):(e=B.treeContext,Ye=Mi(b.nextSibling),wn=i,Me=!0,La=null,yi=!1,e!==null&&nm(i,e),i=Lf(i,o.children),i.flags|=4096);return i}return u?(Fa(),b=o.fallback,u=i.mode,B=e.child,et=B.sibling,o=$i(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,et!==null?b=$i(et,b):(b=gs(b,u,a,null),b.flags|=2),b.return=i,o.return=i,o.sibling=b,i.child=o,Do(null,o),o=i.child,b=e.child.memoizedState,b===null?b=Df(a):(u=b.cachePool,u!==null?(B=ln._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=lm(),b={baseLanes:b.baseLanes|a,cachePool:u}),o.memoizedState=b,o.childLanes=Uf(e,y,a),i.memoizedState=Cf,Do(e.child,o)):(Ia(i),a=e.child,e=a.sibling,a=$i(a,{mode:"visible",children:o.children}),a.return=i,a.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=a,i.memoizedState=null,a)}function Lf(e,i){return i=jl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function jl(e,i){return e=ii(22,e,null,i),e.lanes=0,e}function Nf(e,i,a){return Es(i,e.child,null,a),e=Lf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function S0(e,i,a){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),Yu(e.return,i,a)}function Of(e,i,a,o,u,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=h)}function M0(e,i,a){var o=i.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var y=sn.current,b=(y&2)!==0;if(b?(y=y&1|2,i.flags|=128):y&=1,yt(sn,y),Dn(e,i,o,a),o=Me?_o:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&S0(e,a,i);else if(e.tag===19)S0(e,a,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=i.child,u=null;a!==null;)e=a.alternate,e!==null&&zl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=i.child,i.child=null):(u=a.sibling,a.sibling=null),Of(i,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&zl(e)===null){i.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Of(i,!0,a,null,h,o);break;case"together":Of(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function sa(e,i,a){if(e!==null&&(i.dependencies=e.dependencies),Va|=i.lanes,(a&i.childLanes)===0)if(e!==null){if(ar(e,i,a,!1),(a&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(s(153));if(i.child!==null){for(e=i.child,a=$i(e,e.pendingProps),i.child=a,a.return=i;e.sibling!==null;)e=e.sibling,a=a.sibling=$i(e,e.pendingProps),a.return=i;a.sibling=null}return i.child}function Pf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&wl(e)))}function Dy(e,i,a){switch(i.tag){case 3:Vt(i,i.stateNode.containerInfo),Oa(i,ln,e.memoizedState.cache),_s();break;case 27:case 5:ae(i);break;case 4:Vt(i,i.stateNode.containerInfo);break;case 10:Oa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,rf(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ia(i),i.flags|=128,null):(a&i.child.childLanes)!==0?y0(e,i,a):(Ia(i),e=sa(e,i,a),e!==null?e.sibling:null);Ia(i);break;case 19:var u=(e.flags&128)!==0;if(o=(a&i.childLanes)!==0,o||(ar(e,i,a,!1),o=(a&i.childLanes)!==0),u){if(o)return M0(e,i,a);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),yt(sn,sn.current),o)break;return null;case 22:return i.lanes=0,p0(e,i,a,i.pendingProps);case 24:Oa(i,ln,e.memoizedState.cache)}return sa(e,i,a)}function E0(e,i,a){if(e!==null)if(e.memoizedProps!==i.pendingProps)un=!0;else{if(!Pf(e,a)&&(i.flags&128)===0)return un=!1,Dy(e,i,a);un=(e.flags&131072)!==0}else un=!1,Me&&(i.flags&1048576)!==0&&em(i,_o,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=Ss(i.elementType),i.type=e,typeof e=="function")Fu(e)?(o=bs(e,o),i.tag=1,i=v0(null,i,e,o,a)):(i.tag=0,i=wf(null,i,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===w){i.tag=11,i=f0(null,i,e,o,a);break t}else if(u===O){i.tag=14,i=h0(null,i,e,o,a);break t}}throw i=ct(e)||e,Error(s(306,i,""))}}return i;case 0:return wf(e,i,i.type,i.pendingProps,a);case 1:return o=i.type,u=bs(o,i.pendingProps),v0(e,i,o,u,a);case 3:t:{if(Vt(i,i.stateNode.containerInfo),e===null)throw Error(s(387));o=i.pendingProps;var h=i.memoizedState;u=h.element,tf(e,i),bo(i,o,null,a);var y=i.memoizedState;if(o=y.cache,Oa(i,ln,o),o!==h.cache&&ju(i,[ln],a,!0),To(),o=y.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=x0(e,i,o,a);break t}else if(o!==u){u=_i(Error(s(424)),i),vo(u),i=x0(e,i,o,a);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ye=Mi(e.firstChild),wn=i,Me=!0,La=null,yi=!0,a=pm(i,null,o,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(_s(),o===u){i=sa(e,i,a);break t}Dn(e,i,o,a)}i=i.child}return i;case 26:return Yl(e,i),e===null?(a=Og(i.type,null,i.pendingProps,null))?i.memoizedState=a:Me||(a=i.type,e=i.pendingProps,o=uc(Et.current).createElement(a),o[tn]=i,o[An]=e,Un(o,a,e),Dt(o),i.stateNode=o):i.memoizedState=Og(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return ae(i),e===null&&Me&&(o=i.stateNode=Ug(i.type,i.pendingProps,Et.current),wn=i,yi=!0,u=Ye,Ya(i.type)?(ph=u,Ye=Mi(o.firstChild)):Ye=u),Dn(e,i,i.pendingProps.children,a),Yl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Me&&((u=o=Ye)&&(o=rS(o,i.type,i.pendingProps,yi),o!==null?(i.stateNode=o,wn=i,Ye=Mi(o.firstChild),yi=!1,u=!0):u=!1),u||Na(i)),ae(i),u=i.type,h=i.pendingProps,y=e!==null?e.memoizedProps:null,o=h.children,ch(u,h)?o=null:y!==null&&ch(u,y)&&(i.flags|=32),i.memoizedState!==null&&(u=lf(e,i,Sy,null,null,a),qo._currentValue=u),Yl(e,i),Dn(e,i,o,a),i.child;case 6:return e===null&&Me&&((e=a=Ye)&&(a=oS(a,i.pendingProps,yi),a!==null?(i.stateNode=a,wn=i,Ye=null,e=!0):e=!1),e||Na(i)),null;case 13:return y0(e,i,a);case 4:return Vt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=Es(i,null,o,a):Dn(e,i,o,a),i.child;case 11:return f0(e,i,i.type,i.pendingProps,a);case 7:return Dn(e,i,i.pendingProps,a),i.child;case 8:return Dn(e,i,i.pendingProps.children,a),i.child;case 12:return Dn(e,i,i.pendingProps.children,a),i.child;case 10:return o=i.pendingProps,Oa(i,i.type,o.value),Dn(e,i,o.children,a),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,xs(i),u=Cn(u),o=o(u),i.flags|=1,Dn(e,i,o,a),i.child;case 14:return h0(e,i,i.type,i.pendingProps,a);case 15:return d0(e,i,i.type,i.pendingProps,a);case 19:return M0(e,i,a);case 31:return Cy(e,i,a);case 22:return p0(e,i,a,i.pendingProps);case 24:return xs(i),o=Cn(ln),e===null?(u=Qu(),u===null&&(u=We,h=Zu(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),i.memoizedState={parent:o,cache:u},$u(i),Oa(i,ln,u)):((e.lanes&a)!==0&&(tf(e,i),bo(i,null,null,a),To()),u=e.memoizedState,h=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Oa(i,ln,o)):(o=h.cache,Oa(i,ln,o),o!==u.cache&&ju(i,[ln],a,!0))),Dn(e,i,i.pendingProps.children,a),i.child;case 29:throw i.pendingProps}throw Error(s(156,i.tag))}function ra(e){e.flags|=4}function zf(e,i,a,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(K0())e.flags|=8192;else throw Ms=Ll,Ju}else e.flags&=-16777217}function T0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Fg(i))if(K0())e.flags|=8192;else throw Ms=Ll,Ju}function Zl(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?pn():536870912,e.lanes|=i,gr|=i)}function Uo(e,i){if(!Me)switch(e.tailMode){case"hidden":i=e.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function je(e){var i=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(i)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,i}function Uy(e,i,a){var o=i.pendingProps;switch(ku(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return je(i),null;case 1:return je(i),null;case 3:return a=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),na(ln),Gt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ir(i)?ra(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,qu())),je(i),null;case 26:var u=i.type,h=i.memoizedState;return e===null?(ra(i),h!==null?(je(i),T0(i,h)):(je(i),zf(i,u,null,o,a))):h?h!==e.memoizedState?(ra(i),je(i),T0(i,h)):(je(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&ra(i),je(i),zf(i,u,e,o,a)),null;case 27:if(He(i),a=Et.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return je(i),null}e=K.current,ir(i)?im(i):(e=Ug(u,o,a),i.stateNode=e,ra(i))}return je(i),null;case 5:if(He(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return je(i),null}if(h=K.current,ir(i))im(i);else{var y=uc(Et.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}h[tn]=i,h[An]=o;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=h;t:switch(Un(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ra(i)}}return je(i),zf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,a),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(s(166));if(e=Et.current,ir(i)){if(e=i.stateNode,a=i.memoizedProps,o=null,u=wn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[tn]=i,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||yg(e.nodeValue,a)),e||Na(i,!0)}else e=uc(e).createTextNode(o),e[tn]=i,i.stateNode=e}return je(i),null;case 31:if(a=i.memoizedState,e===null||e.memoizedState!==null){if(o=ir(i),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[tn]=i}else _s(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;je(i),e=!1}else a=qu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return i.flags&256?(si(i),i):(si(i),null);if((i.flags&128)!==0)throw Error(s(558))}return je(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ir(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[tn]=i}else _s(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;je(i),u=!1}else u=qu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(si(i),i):(si(i),null)}return si(i),(i.flags&128)!==0?(i.lanes=a,i):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(i.child.flags|=8192),Zl(i,i.updateQueue),je(i),null);case 4:return Gt(),e===null&&ah(i.stateNode.containerInfo),je(i),null;case 10:return na(i.type),je(i),null;case 19:if(st(sn),o=i.memoizedState,o===null)return je(i),null;if(u=(i.flags&128)!==0,h=o.rendering,h===null)if(u)Uo(o,!1);else{if(nn!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(h=zl(e),h!==null){for(i.flags|=128,Uo(o,!1),e=h.updateQueue,i.updateQueue=e,Zl(i,e),i.subtreeFlags=0,e=a,a=i.child;a!==null;)Jp(a,e),a=a.sibling;return yt(sn,sn.current&1|2),Me&&ta(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&pt()>tc&&(i.flags|=128,u=!0,Uo(o,!1),i.lanes=4194304)}else{if(!u)if(e=zl(h),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,Zl(i,e),Uo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Me)return je(i),null}else 2*pt()-o.renderingStartTime>tc&&a!==536870912&&(i.flags|=128,u=!0,Uo(o,!1),i.lanes=4194304);o.isBackwards?(h.sibling=i.child,i.child=h):(e=o.last,e!==null?e.sibling=h:i.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=pt(),e.sibling=null,a=sn.current,yt(sn,u?a&1|2:a&1),Me&&ta(i,o.treeForkCount),e):(je(i),null);case 22:case 23:return si(i),sf(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(a&536870912)!==0&&(i.flags&128)===0&&(je(i),i.subtreeFlags&6&&(i.flags|=8192)):je(i),a=i.updateQueue,a!==null&&Zl(i,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==a&&(i.flags|=2048),e!==null&&st(ys),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),i.memoizedState.cache!==a&&(i.flags|=2048),na(ln),je(i),null;case 25:return null;case 30:return null}throw Error(s(156,i.tag))}function Ly(e,i){switch(ku(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return na(ln),Gt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return He(i),null;case 31:if(i.memoizedState!==null){if(si(i),i.alternate===null)throw Error(s(340));_s()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(si(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(s(340));_s()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return st(sn),null;case 4:return Gt(),null;case 10:return na(i.type),null;case 22:case 23:return si(i),sf(),e!==null&&st(ys),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return na(ln),null;case 25:return null;default:return null}}function b0(e,i){switch(ku(i),i.tag){case 3:na(ln),Gt();break;case 26:case 27:case 5:He(i);break;case 4:Gt();break;case 31:i.memoizedState!==null&&si(i);break;case 13:si(i);break;case 19:st(sn);break;case 10:na(i.type);break;case 22:case 23:si(i),sf(),e!==null&&st(ys);break;case 24:na(ln)}}function Lo(e,i){try{var a=i.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,y=a.inst;o=h(),y.destroy=o}a=a.next}while(a!==u)}}catch(b){Ie(i,i.return,b)}}function Ha(e,i,a){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var y=o.inst,b=y.destroy;if(b!==void 0){y.destroy=void 0,u=i;var B=a,et=b;try{et()}catch(dt){Ie(u,B,dt)}}}o=o.next}while(o!==h)}}catch(dt){Ie(i,i.return,dt)}}function A0(e){var i=e.updateQueue;if(i!==null){var a=e.stateNode;try{gm(i,a)}catch(o){Ie(e,e.return,o)}}}function R0(e,i,a){a.props=bs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ie(e,i,o)}}function No(e,i){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Ie(e,i,u)}}function Xi(e,i){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ie(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ie(e,i,u)}else a.current=null}function w0(e){var i=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ie(e,e.return,u)}}function Bf(e,i,a){try{var o=e.stateNode;tS(o,e.type,a,i),o[An]=i}catch(u){Ie(e,e.return,u)}}function C0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ya(e.type)||e.tag===4}function If(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||C0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ya(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ff(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,i):(i=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,i.appendChild(e),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Qi));else if(o!==4&&(o===27&&Ya(e.type)&&(a=e.stateNode,i=null),e=e.child,e!==null))for(Ff(e,i,a),e=e.sibling;e!==null;)Ff(e,i,a),e=e.sibling}function Kl(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?a.insertBefore(e,i):a.appendChild(e);else if(o!==4&&(o===27&&Ya(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Kl(e,i,a),e=e.sibling;e!==null;)Kl(e,i,a),e=e.sibling}function D0(e){var i=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Un(i,o,a),i[tn]=e,i[An]=a}catch(h){Ie(e,e.return,h)}}var oa=!1,fn=!1,Hf=!1,U0=typeof WeakSet=="function"?WeakSet:Set,Mn=null;function Ny(e,i){if(e=e.containerInfo,oh=_c,e=kp(e),Lu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var y=0,b=-1,B=-1,et=0,dt=0,_t=e,it=null;e:for(;;){for(var lt;_t!==a||u!==0&&_t.nodeType!==3||(b=y+u),_t!==h||o!==0&&_t.nodeType!==3||(B=y+o),_t.nodeType===3&&(y+=_t.nodeValue.length),(lt=_t.firstChild)!==null;)it=_t,_t=lt;for(;;){if(_t===e)break e;if(it===a&&++et===u&&(b=y),it===h&&++dt===o&&(B=y),(lt=_t.nextSibling)!==null)break;_t=it,it=_t.parentNode}_t=lt}a=b===-1||B===-1?null:{start:b,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(lh={focusedElem:e,selectionRange:a},_c=!1,Mn=i;Mn!==null;)if(i=Mn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Mn=e;else for(;Mn!==null;){switch(i=Mn,h=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=i,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var Ft=bs(a.type,u);e=o.getSnapshotBeforeUpdate(Ft,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){Ie(a,a.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,a=e.nodeType,a===9)fh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":fh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=i.sibling,e!==null){e.return=i.return,Mn=e;break}Mn=i.return}}function L0(e,i,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ca(e,a),o&4&&Lo(5,a);break;case 1:if(ca(e,a),o&4)if(e=a.stateNode,i===null)try{e.componentDidMount()}catch(y){Ie(a,a.return,y)}else{var u=bs(a.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Ie(a,a.return,y)}}o&64&&A0(a),o&512&&No(a,a.return);break;case 3:if(ca(e,a),o&64&&(e=a.updateQueue,e!==null)){if(i=null,a.child!==null)switch(a.child.tag){case 27:case 5:i=a.child.stateNode;break;case 1:i=a.child.stateNode}try{gm(e,i)}catch(y){Ie(a,a.return,y)}}break;case 27:i===null&&o&4&&D0(a);case 26:case 5:ca(e,a),i===null&&o&4&&w0(a),o&512&&No(a,a.return);break;case 12:ca(e,a);break;case 31:ca(e,a),o&4&&P0(e,a);break;case 13:ca(e,a),o&4&&z0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Vy.bind(null,a),lS(e,a))));break;case 22:if(o=a.memoizedState!==null||oa,!o){i=i!==null&&i.memoizedState!==null||fn,u=oa;var h=fn;oa=o,(fn=i)&&!h?ua(e,a,(a.subtreeFlags&8772)!==0):ca(e,a),oa=u,fn=h}break;case 30:break;default:ca(e,a)}}function N0(e){var i=e.alternate;i!==null&&(e.alternate=null,N0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&ot(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Je=null,Wn=!1;function la(e,i,a){for(a=a.child;a!==null;)O0(e,i,a),a=a.sibling}function O0(e,i,a){if(Yt&&typeof Yt.onCommitFiberUnmount=="function")try{Yt.onCommitFiberUnmount(Kt,a)}catch{}switch(a.tag){case 26:fn||Xi(a,i),la(e,i,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:fn||Xi(a,i);var o=Je,u=Wn;Ya(a.type)&&(Je=a.stateNode,Wn=!1),la(e,i,a),Vo(a.stateNode),Je=o,Wn=u;break;case 5:fn||Xi(a,i);case 6:if(o=Je,u=Wn,Je=null,la(e,i,a),Je=o,Wn=u,Je!==null)if(Wn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(a.stateNode)}catch(h){Ie(a,i,h)}else try{Je.removeChild(a.stateNode)}catch(h){Ie(a,i,h)}break;case 18:Je!==null&&(Wn?(e=Je,Ag(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Tr(e)):Ag(Je,a.stateNode));break;case 4:o=Je,u=Wn,Je=a.stateNode.containerInfo,Wn=!0,la(e,i,a),Je=o,Wn=u;break;case 0:case 11:case 14:case 15:Ha(2,a,i),fn||Ha(4,a,i),la(e,i,a);break;case 1:fn||(Xi(a,i),o=a.stateNode,typeof o.componentWillUnmount=="function"&&R0(a,i,o)),la(e,i,a);break;case 21:la(e,i,a);break;case 22:fn=(o=fn)||a.memoizedState!==null,la(e,i,a),fn=o;break;default:la(e,i,a)}}function P0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Tr(e)}catch(a){Ie(i,i.return,a)}}}function z0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Tr(e)}catch(a){Ie(i,i.return,a)}}function Oy(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new U0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new U0),i;default:throw Error(s(435,e.tag))}}function Ql(e,i){var a=Oy(e);i.forEach(function(o){if(!a.has(o)){a.add(o);var u=ky.bind(null,e,o);o.then(u,u)}})}function Yn(e,i){var a=i.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,y=i,b=y;t:for(;b!==null;){switch(b.tag){case 27:if(Ya(b.type)){Je=b.stateNode,Wn=!1;break t}break;case 5:Je=b.stateNode,Wn=!1;break t;case 3:case 4:Je=b.stateNode.containerInfo,Wn=!0;break t}b=b.return}if(Je===null)throw Error(s(160));O0(h,y,u),Je=null,Wn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)B0(i,e),i=i.sibling}var Li=null;function B0(e,i){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Yn(i,e),jn(e),o&4&&(Ha(3,e,e.return),Lo(3,e),Ha(5,e,e.return));break;case 1:Yn(i,e),jn(e),o&512&&(fn||a===null||Xi(a,a.return)),o&64&&oa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Li;if(Yn(i,e),jn(e),o&512&&(fn||a===null||Xi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[k]||h[tn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Un(h,o,a),h[tn]=e,Dt(h),o=h;break t;case"link":var y=Bg("link","href",u).get(o+(a.href||""));if(y){for(var b=0;b<y.length;b++)if(h=y[b],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(b,1);break e}}h=u.createElement(o),Un(h,o,a),u.head.appendChild(h);break;case"meta":if(y=Bg("meta","content",u).get(o+(a.content||""))){for(b=0;b<y.length;b++)if(h=y[b],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(b,1);break e}}h=u.createElement(o),Un(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[tn]=e,Dt(h),o=h}e.stateNode=o}else Ig(u,e.type,e.stateNode);else e.stateNode=zg(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?Ig(u,e.type,e.stateNode):zg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Bf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Yn(i,e),jn(e),o&512&&(fn||a===null||Xi(a,a.return)),a!==null&&o&4&&Bf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Yn(i,e),jn(e),o&512&&(fn||a===null||Xi(a,a.return)),e.flags&32){u=e.stateNode;try{Ys(u,"")}catch(Ft){Ie(e,e.return,Ft)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Bf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Hf=!0);break;case 6:if(Yn(i,e),jn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Ft){Ie(e,e.return,Ft)}}break;case 3:if(dc=null,u=Li,Li=fc(i.containerInfo),Yn(i,e),Li=u,jn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Tr(i.containerInfo)}catch(Ft){Ie(e,e.return,Ft)}Hf&&(Hf=!1,I0(e));break;case 4:o=Li,Li=fc(e.stateNode.containerInfo),Yn(i,e),jn(e),Li=o;break;case 12:Yn(i,e),jn(e);break;case 31:Yn(i,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 13:Yn(i,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&($l=pt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 22:u=e.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,et=oa,dt=fn;if(oa=et||u,fn=dt||B,Yn(i,e),fn=dt,oa=et,jn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(a===null||B||oa||fn||As(e)),a=null,i=e;;){if(i.tag===5||i.tag===26){if(a===null){B=a=i;try{if(h=B.stateNode,u)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{b=B.stateNode;var _t=B.memoizedProps.style,it=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;b.style.display=it==null||typeof it=="boolean"?"":(""+it).trim()}}catch(Ft){Ie(B,B.return,Ft)}}}else if(i.tag===6){if(a===null){B=i;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(Ft){Ie(B,B.return,Ft)}}}else if(i.tag===18){if(a===null){B=i;try{var lt=B.stateNode;u?Rg(lt,!0):Rg(B.stateNode,!1)}catch(Ft){Ie(B,B.return,Ft)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;a===i&&(a=null),i=i.return}a===i&&(a=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Ql(e,a))));break;case 19:Yn(i,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 30:break;case 21:break;default:Yn(i,e),jn(e)}}function jn(e){var i=e.flags;if(i&2){try{for(var a,o=e.return;o!==null;){if(C0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=If(e);Kl(e,h,u);break;case 5:var y=a.stateNode;a.flags&32&&(Ys(y,""),a.flags&=-33);var b=If(e);Kl(e,b,y);break;case 3:case 4:var B=a.stateNode.containerInfo,et=If(e);Ff(e,et,B);break;default:throw Error(s(161))}}catch(dt){Ie(e,e.return,dt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function I0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;I0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function ca(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)L0(e,i.alternate,i),i=i.sibling}function As(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Ha(4,i,i.return),As(i);break;case 1:Xi(i,i.return);var a=i.stateNode;typeof a.componentWillUnmount=="function"&&R0(i,i.return,a),As(i);break;case 27:Vo(i.stateNode);case 26:case 5:Xi(i,i.return),As(i);break;case 22:i.memoizedState===null&&As(i);break;case 30:As(i);break;default:As(i)}e=e.sibling}}function ua(e,i,a){for(a=a&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,h=i,y=h.flags;switch(h.tag){case 0:case 11:case 15:ua(u,h,a),Lo(4,h);break;case 1:if(ua(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(et){Ie(o,o.return,et)}if(o=h,u=o.updateQueue,u!==null){var b=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)mm(B[u],b)}catch(et){Ie(o,o.return,et)}}a&&y&64&&A0(h),No(h,h.return);break;case 27:D0(h);case 26:case 5:ua(u,h,a),a&&o===null&&y&4&&w0(h),No(h,h.return);break;case 12:ua(u,h,a);break;case 31:ua(u,h,a),a&&y&4&&P0(u,h);break;case 13:ua(u,h,a),a&&y&4&&z0(u,h);break;case 22:h.memoizedState===null&&ua(u,h,a),No(h,h.return);break;case 30:break;default:ua(u,h,a)}i=i.sibling}}function Gf(e,i){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&xo(a))}function Vf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&xo(e))}function Ni(e,i,a,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)F0(e,i,a,o),i=i.sibling}function F0(e,i,a,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Ni(e,i,a,o),u&2048&&Lo(9,i);break;case 1:Ni(e,i,a,o);break;case 3:Ni(e,i,a,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&xo(e)));break;case 12:if(u&2048){Ni(e,i,a,o),e=i.stateNode;try{var h=i.memoizedProps,y=h.id,b=h.onPostCommit;typeof b=="function"&&b(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){Ie(i,i.return,B)}}else Ni(e,i,a,o);break;case 31:Ni(e,i,a,o);break;case 13:Ni(e,i,a,o);break;case 23:break;case 22:h=i.stateNode,y=i.alternate,i.memoizedState!==null?h._visibility&2?Ni(e,i,a,o):Oo(e,i):h._visibility&2?Ni(e,i,a,o):(h._visibility|=2,dr(e,i,a,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Gf(y,i);break;case 24:Ni(e,i,a,o),u&2048&&Vf(i.alternate,i);break;default:Ni(e,i,a,o)}}function dr(e,i,a,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=e,y=i,b=a,B=o,et=y.flags;switch(y.tag){case 0:case 11:case 15:dr(h,y,b,B,u),Lo(8,y);break;case 23:break;case 22:var dt=y.stateNode;y.memoizedState!==null?dt._visibility&2?dr(h,y,b,B,u):Oo(h,y):(dt._visibility|=2,dr(h,y,b,B,u)),u&&et&2048&&Gf(y.alternate,y);break;case 24:dr(h,y,b,B,u),u&&et&2048&&Vf(y.alternate,y);break;default:dr(h,y,b,B,u)}i=i.sibling}}function Oo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var a=e,o=i,u=o.flags;switch(o.tag){case 22:Oo(a,o),u&2048&&Gf(o.alternate,o);break;case 24:Oo(a,o),u&2048&&Vf(o.alternate,o);break;default:Oo(a,o)}i=i.sibling}}var Po=8192;function pr(e,i,a){if(e.subtreeFlags&Po)for(e=e.child;e!==null;)H0(e,i,a),e=e.sibling}function H0(e,i,a){switch(e.tag){case 26:pr(e,i,a),e.flags&Po&&e.memoizedState!==null&&yS(a,Li,e.memoizedState,e.memoizedProps);break;case 5:pr(e,i,a);break;case 3:case 4:var o=Li;Li=fc(e.stateNode.containerInfo),pr(e,i,a),Li=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Po,Po=16777216,pr(e,i,a),Po=o):pr(e,i,a));break;default:pr(e,i,a)}}function G0(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function zo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];Mn=o,k0(o,e)}G0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)V0(e),e=e.sibling}function V0(e){switch(e.tag){case 0:case 11:case 15:zo(e),e.flags&2048&&Ha(9,e,e.return);break;case 3:zo(e);break;case 12:zo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,Jl(e)):zo(e);break;default:zo(e)}}function Jl(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];Mn=o,k0(o,e)}G0(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Ha(8,i,i.return),Jl(i);break;case 22:a=i.stateNode,a._visibility&2&&(a._visibility&=-3,Jl(i));break;default:Jl(i)}e=e.sibling}}function k0(e,i){for(;Mn!==null;){var a=Mn;switch(a.tag){case 0:case 11:case 15:Ha(8,a,i);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:xo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Mn=o;else t:for(a=e;Mn!==null;){o=Mn;var u=o.sibling,h=o.return;if(N0(o),o===a){Mn=null;break t}if(u!==null){u.return=h,Mn=u;break t}Mn=h}}}var Py={getCacheForType:function(e){var i=Cn(ln),a=i.data.get(e);return a===void 0&&(a=e(),i.data.set(e,a)),a},cacheSignal:function(){return Cn(ln).controller.signal}},zy=typeof WeakMap=="function"?WeakMap:Map,Le=0,We=null,pe=null,ve=0,Be=0,ri=null,Ga=!1,mr=!1,kf=!1,fa=0,nn=0,Va=0,Rs=0,Xf=0,oi=0,gr=0,Bo=null,Zn=null,qf=!1,$l=0,X0=0,tc=1/0,ec=null,ka=null,gn=0,Xa=null,_r=null,ha=0,Wf=0,Yf=null,q0=null,Io=0,jf=null;function li(){return(Le&2)!==0&&ve!==0?ve&-ve:P.T!==null?th():so()}function W0(){if(oi===0)if((ve&536870912)===0||Me){var e=ft;ft<<=1,(ft&3932160)===0&&(ft=262144),oi=e}else oi=536870912;return e=ai.current,e!==null&&(e.flags|=32),oi}function Kn(e,i,a){(e===We&&(Be===2||Be===9)||e.cancelPendingCommit!==null)&&(vr(e,0),qa(e,ve,oi,!1)),bn(e,a),((Le&2)===0||e!==We)&&(e===We&&((Le&2)===0&&(Rs|=a),nn===4&&qa(e,ve,oi,!1)),qi(e))}function Y0(e,i,a){if((Le&6)!==0)throw Error(s(327));var o=!a&&(i&127)===0&&(i&e.expiredLanes)===0||ee(e,i),u=o?Fy(e,i):Kf(e,i,!0),h=o;do{if(u===0){mr&&!o&&qa(e,i,0,!1);break}else{if(a=e.current.alternate,h&&!By(a)){u=Kf(e,i,!1),h=!1;continue}if(u===2){if(h=i,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var b=e;u=Bo;var B=b.current.memoizedState.isDehydrated;if(B&&(vr(b,y).flags|=256),y=Kf(b,y,!1),y!==2){if(kf&&!B){b.errorRecoveryDisabledLanes|=h,Rs|=h,u=4;break t}h=Zn,Zn=u,h!==null&&(Zn===null?Zn=h:Zn.push.apply(Zn,h))}u=y}if(h=!1,u!==2)continue}}if(u===1){vr(e,0),qa(e,i,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((i&4194048)!==i)break;case 6:qa(o,i,oi,!Ga);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((i&62914560)===i&&(u=$l+300-pt(),10<u)){if(qa(o,i,oi,!Ga),Lt(o,0,!0)!==0)break t;ha=i,o.timeoutHandle=Tg(j0.bind(null,o,a,Zn,ec,qf,i,oi,Rs,gr,Ga,h,"Throttled",-0,0),u);break t}j0(o,a,Zn,ec,qf,i,oi,Rs,gr,Ga,h,null,-0,0)}}break}while(!0);qi(e)}function j0(e,i,a,o,u,h,y,b,B,et,dt,_t,it,lt){if(e.timeoutHandle=-1,_t=i.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Qi},H0(i,h,_t);var Ft=(h&62914560)===h?$l-pt():(h&4194048)===h?X0-pt():0;if(Ft=SS(_t,Ft),Ft!==null){ha=h,e.cancelPendingCommit=Ft(ng.bind(null,e,i,h,a,o,u,y,b,B,dt,_t,null,it,lt)),qa(e,h,y,!et);return}}ng(e,i,h,a,o,u,y,b,B)}function By(e){for(var i=e;;){var a=i.tag;if((a===0||a===11||a===15)&&i.flags&16384&&(a=i.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!ni(h(),u))return!1}catch{return!1}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function qa(e,i,a,o){i&=~Xf,i&=~Rs,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var h=31-te(u),y=1<<h;o[h]=-1,u&=~y}a!==0&&io(e,a,i)}function nc(){return(Le&6)===0?(Fo(0),!1):!0}function Zf(){if(pe!==null){if(Be===0)var e=pe.return;else e=pe,ea=vs=null,ff(e),lr=null,So=0,e=pe;for(;e!==null;)b0(e.alternate,e),e=e.return;pe=null}}function vr(e,i){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,iS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ha=0,Zf(),We=e,pe=a=$i(e.current,null),ve=i,Be=0,ri=null,Ga=!1,mr=ee(e,i),kf=!1,gr=oi=Xf=Rs=Va=nn=0,Zn=Bo=null,qf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-te(o),h=1<<u;i|=e[u],o&=~h}return fa=i,El(),a}function Z0(e,i){oe=null,P.H=Co,i===or||i===Ul?(i=fm(),Be=3):i===Ju?(i=fm(),Be=4):Be=i===Rf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ri=i,pe===null&&(nn=1,ql(e,_i(i,e.current)))}function K0(){var e=ai.current;return e===null?!0:(ve&4194048)===ve?Si===null:(ve&62914560)===ve||(ve&536870912)!==0?e===Si:!1}function Q0(){var e=P.H;return P.H=Co,e===null?Co:e}function J0(){var e=P.A;return P.A=Py,e}function ic(){nn=4,Ga||(ve&4194048)!==ve&&ai.current!==null||(mr=!0),(Va&134217727)===0&&(Rs&134217727)===0||We===null||qa(We,ve,oi,!1)}function Kf(e,i,a){var o=Le;Le|=2;var u=Q0(),h=J0();(We!==e||ve!==i)&&(ec=null,vr(e,i)),i=!1;var y=nn;t:do try{if(Be!==0&&pe!==null){var b=pe,B=ri;switch(Be){case 8:Zf(),y=6;break t;case 3:case 2:case 9:case 6:ai.current===null&&(i=!0);var et=Be;if(Be=0,ri=null,xr(e,b,B,et),a&&mr){y=0;break t}break;default:et=Be,Be=0,ri=null,xr(e,b,B,et)}}Iy(),y=nn;break}catch(dt){Z0(e,dt)}while(!0);return i&&e.shellSuspendCounter++,ea=vs=null,Le=o,P.H=u,P.A=h,pe===null&&(We=null,ve=0,El()),y}function Iy(){for(;pe!==null;)$0(pe)}function Fy(e,i){var a=Le;Le|=2;var o=Q0(),u=J0();We!==e||ve!==i?(ec=null,tc=pt()+500,vr(e,i)):mr=ee(e,i);t:do try{if(Be!==0&&pe!==null){i=pe;var h=ri;e:switch(Be){case 1:Be=0,ri=null,xr(e,i,h,1);break;case 2:case 9:if(cm(h)){Be=0,ri=null,tg(i);break}i=function(){Be!==2&&Be!==9||We!==e||(Be=7),qi(e)},h.then(i,i);break t;case 3:Be=7;break t;case 4:Be=5;break t;case 7:cm(h)?(Be=0,ri=null,tg(i)):(Be=0,ri=null,xr(e,i,h,7));break;case 5:var y=null;switch(pe.tag){case 26:y=pe.memoizedState;case 5:case 27:var b=pe;if(y?Fg(y):b.stateNode.complete){Be=0,ri=null;var B=b.sibling;if(B!==null)pe=B;else{var et=b.return;et!==null?(pe=et,ac(et)):pe=null}break e}}Be=0,ri=null,xr(e,i,h,5);break;case 6:Be=0,ri=null,xr(e,i,h,6);break;case 8:Zf(),nn=6;break t;default:throw Error(s(462))}}Hy();break}catch(dt){Z0(e,dt)}while(!0);return ea=vs=null,P.H=o,P.A=u,Le=a,pe!==null?0:(We=null,ve=0,El(),nn)}function Hy(){for(;pe!==null&&!A();)$0(pe)}function $0(e){var i=E0(e.alternate,e,fa);e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function tg(e){var i=e,a=i.alternate;switch(i.tag){case 15:case 0:i=_0(a,i,i.pendingProps,i.type,void 0,ve);break;case 11:i=_0(a,i,i.pendingProps,i.type.render,i.ref,ve);break;case 5:ff(i);default:b0(a,i),i=pe=Jp(i,fa),i=E0(a,i,fa)}e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function xr(e,i,a,o){ea=vs=null,ff(i),lr=null,So=0;var u=i.return;try{if(wy(e,u,i,a,ve)){nn=1,ql(e,_i(a,e.current)),pe=null;return}}catch(h){if(u!==null)throw pe=u,h;nn=1,ql(e,_i(a,e.current)),pe=null;return}i.flags&32768?(Me||o===1?e=!0:mr||(ve&536870912)!==0?e=!1:(Ga=e=!0,(o===2||o===9||o===3||o===6)&&(o=ai.current,o!==null&&o.tag===13&&(o.flags|=16384))),eg(i,e)):ac(i)}function ac(e){var i=e;do{if((i.flags&32768)!==0){eg(i,Ga);return}e=i.return;var a=Uy(i.alternate,i,fa);if(a!==null){pe=a;return}if(i=i.sibling,i!==null){pe=i;return}pe=i=e}while(i!==null);nn===0&&(nn=5)}function eg(e,i){do{var a=Ly(e.alternate,e);if(a!==null){a.flags&=32767,pe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!i&&(e=e.sibling,e!==null)){pe=e;return}pe=e=a}while(e!==null);nn=6,pe=null}function ng(e,i,a,o,u,h,y,b,B){e.cancelPendingCommit=null;do sc();while(gn!==0);if((Le&6)!==0)throw Error(s(327));if(i!==null){if(i===e.current)throw Error(s(177));if(h=i.lanes|i.childLanes,h|=Bu,wi(e,a,h,y,b,B),e===We&&(pe=We=null,ve=0),_r=i,Xa=e,ha=a,Wf=h,Yf=u,q0=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Xy(Ut,function(){return og(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=P.T,P.T=null,u=j.p,j.p=2,y=Le,Le|=4;try{Ny(e,i,a)}finally{Le=y,j.p=u,P.T=o}}gn=1,ig(),ag(),sg()}}function ig(){if(gn===1){gn=0;var e=Xa,i=_r,a=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||a){a=P.T,P.T=null;var o=j.p;j.p=2;var u=Le;Le|=4;try{B0(i,e);var h=lh,y=kp(e.containerInfo),b=h.focusedElem,B=h.selectionRange;if(y!==b&&b&&b.ownerDocument&&Vp(b.ownerDocument.documentElement,b)){if(B!==null&&Lu(b)){var et=B.start,dt=B.end;if(dt===void 0&&(dt=et),"selectionStart"in b)b.selectionStart=et,b.selectionEnd=Math.min(dt,b.value.length);else{var _t=b.ownerDocument||document,it=_t&&_t.defaultView||window;if(it.getSelection){var lt=it.getSelection(),Ft=b.textContent.length,Jt=Math.min(B.start,Ft),qe=B.end===void 0?Jt:Math.min(B.end,Ft);!lt.extend&&Jt>qe&&(y=qe,qe=Jt,Jt=y);var Y=Gp(b,Jt),G=Gp(b,qe);if(Y&&G&&(lt.rangeCount!==1||lt.anchorNode!==Y.node||lt.anchorOffset!==Y.offset||lt.focusNode!==G.node||lt.focusOffset!==G.offset)){var tt=_t.createRange();tt.setStart(Y.node,Y.offset),lt.removeAllRanges(),Jt>qe?(lt.addRange(tt),lt.extend(G.node,G.offset)):(tt.setEnd(G.node,G.offset),lt.addRange(tt))}}}}for(_t=[],lt=b;lt=lt.parentNode;)lt.nodeType===1&&_t.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<_t.length;b++){var mt=_t[b];mt.element.scrollLeft=mt.left,mt.element.scrollTop=mt.top}}_c=!!oh,lh=oh=null}finally{Le=u,j.p=o,P.T=a}}e.current=i,gn=2}}function ag(){if(gn===2){gn=0;var e=Xa,i=_r,a=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||a){a=P.T,P.T=null;var o=j.p;j.p=2;var u=Le;Le|=4;try{L0(e,i.alternate,i)}finally{Le=u,j.p=o,P.T=a}}gn=3}}function sg(){if(gn===4||gn===3){gn=0,at();var e=Xa,i=_r,a=ha,o=q0;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?gn=5:(gn=0,_r=Xa=null,rg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(ka=null),Ws(a),i=i.stateNode,Yt&&typeof Yt.onCommitFiberRoot=="function")try{Yt.onCommitFiberRoot(Kt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=P.T,u=j.p,j.p=2,P.T=null;try{for(var h=e.onRecoverableError,y=0;y<o.length;y++){var b=o[y];h(b.value,{componentStack:b.stack})}}finally{P.T=i,j.p=u}}(ha&3)!==0&&sc(),qi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===jf?Io++:(Io=0,jf=e):Io=0,Fo(0)}}function rg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,xo(i)))}function sc(){return ig(),ag(),sg(),og()}function og(){if(gn!==5)return!1;var e=Xa,i=Wf;Wf=0;var a=Ws(ha),o=P.T,u=j.p;try{j.p=32>a?32:a,P.T=null,a=Yf,Yf=null;var h=Xa,y=ha;if(gn=0,_r=Xa=null,ha=0,(Le&6)!==0)throw Error(s(331));var b=Le;if(Le|=4,V0(h.current),F0(h,h.current,y,a),Le=b,Fo(0,!1),Yt&&typeof Yt.onPostCommitFiberRoot=="function")try{Yt.onPostCommitFiberRoot(Kt,h)}catch{}return!0}finally{j.p=u,P.T=o,rg(e,i)}}function lg(e,i,a){i=_i(a,i),i=Af(e.stateNode,i,2),e=Ba(e,i,2),e!==null&&(bn(e,2),qi(e))}function Ie(e,i,a){if(e.tag===3)lg(e,e,a);else for(;i!==null;){if(i.tag===3){lg(i,e,a);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(ka===null||!ka.has(o))){e=_i(a,e),a=c0(2),o=Ba(i,a,2),o!==null&&(u0(a,o,i,e),bn(o,2),qi(o));break}}i=i.return}}function Qf(e,i,a){var o=e.pingCache;if(o===null){o=e.pingCache=new zy;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(a)||(kf=!0,u.add(a),e=Gy.bind(null,e,i,a),i.then(e,e))}function Gy(e,i,a){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,We===e&&(ve&a)===a&&(nn===4||nn===3&&(ve&62914560)===ve&&300>pt()-$l?(Le&2)===0&&vr(e,0):Xf|=a,gr===ve&&(gr=0)),qi(e)}function cg(e,i){i===0&&(i=pn()),e=ms(e,i),e!==null&&(bn(e,i),qi(e))}function Vy(e){var i=e.memoizedState,a=0;i!==null&&(a=i.retryLane),cg(e,a)}function ky(e,i){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(i),cg(e,a)}function Xy(e,i){return Zt(e,i)}var rc=null,yr=null,Jf=!1,oc=!1,$f=!1,Wa=0;function qi(e){e!==yr&&e.next===null&&(yr===null?rc=yr=e:yr=yr.next=e),oc=!0,Jf||(Jf=!0,Wy())}function Fo(e,i){if(!$f&&oc){$f=!0;do for(var a=!1,o=rc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var y=o.suspendedLanes,b=o.pingedLanes;h=(1<<31-te(42|e)+1)-1,h&=u&~(y&~b),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,dg(o,h))}else h=ve,h=Lt(o,o===We?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||ee(o,h)||(a=!0,dg(o,h));o=o.next}while(a);$f=!1}}function qy(){ug()}function ug(){oc=Jf=!1;var e=0;Wa!==0&&nS()&&(e=Wa);for(var i=pt(),a=null,o=rc;o!==null;){var u=o.next,h=fg(o,i);h===0?(o.next=null,a===null?rc=u:a.next=u,u===null&&(yr=a)):(a=o,(e!==0||(h&3)!==0)&&(oc=!0)),o=u}gn!==0&&gn!==5||Fo(e),Wa!==0&&(Wa=0)}function fg(e,i){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-te(h),b=1<<y,B=u[y];B===-1?((b&a)===0||(b&o)!==0)&&(u[y]=Qe(b,i)):B<=i&&(e.expiredLanes|=b),h&=~b}if(i=We,a=ve,a=Lt(e,e===i?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===i&&(Be===2||Be===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&N(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||ee(e,a)){if(i=a&-a,i===e.callbackPriority)return i;switch(o!==null&&N(o),Ws(a)){case 2:case 8:a=Wt;break;case 32:a=Ut;break;case 268435456:a=_e;break;default:a=Ut}return o=hg.bind(null,e),a=Zt(a,o),e.callbackPriority=i,e.callbackNode=a,i}return o!==null&&o!==null&&N(o),e.callbackPriority=2,e.callbackNode=null,2}function hg(e,i){if(gn!==0&&gn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(sc()&&e.callbackNode!==a)return null;var o=ve;return o=Lt(e,e===We?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Y0(e,o,i),fg(e,pt()),e.callbackNode!=null&&e.callbackNode===a?hg.bind(null,e):null)}function dg(e,i){if(sc())return null;Y0(e,i,!0)}function Wy(){aS(function(){(Le&6)!==0?Zt(gt,qy):ug()})}function th(){if(Wa===0){var e=sr;e===0&&(e=Rt,Rt<<=1,(Rt&261888)===0&&(Rt=256)),Wa=e}return Wa}function pg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ml(""+e)}function mg(e,i){var a=i.ownerDocument.createElement("input");return a.name=i.name,a.value=i.value,e.id&&a.setAttribute("form",e.id),i.parentNode.insertBefore(a,i),e=new FormData(e),a.parentNode.removeChild(a),e}function Yy(e,i,a,o,u){if(i==="submit"&&a&&a.stateNode===u){var h=pg((u[An]||null).action),y=o.submitter;y&&(i=(i=y[An]||null)?pg(i.formAction):y.getAttribute("formAction"),i!==null&&(h=i,y=null));var b=new xl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Wa!==0){var B=y?mg(u,y):new FormData(u);yf(a,{pending:!0,data:B,method:u.method,action:h},null,B)}}else typeof h=="function"&&(b.preventDefault(),B=y?mg(u,y):new FormData(u),yf(a,{pending:!0,data:B,method:u.method,action:h},h,B))},currentTarget:u}]})}}for(var eh=0;eh<zu.length;eh++){var nh=zu[eh],jy=nh.toLowerCase(),Zy=nh[0].toUpperCase()+nh.slice(1);Ui(jy,"on"+Zy)}Ui(Wp,"onAnimationEnd"),Ui(Yp,"onAnimationIteration"),Ui(jp,"onAnimationStart"),Ui("dblclick","onDoubleClick"),Ui("focusin","onFocus"),Ui("focusout","onBlur"),Ui(fy,"onTransitionRun"),Ui(hy,"onTransitionStart"),Ui(dy,"onTransitionCancel"),Ui(Zp,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$t("onBeforeInput",["compositionend","keypress","textInput","paste"]),$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ky=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ho));function gg(e,i){i=(i&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(i)for(var y=o.length-1;0<=y;y--){var b=o[y],B=b.instance,et=b.currentTarget;if(b=b.listener,B!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=et;try{h(u)}catch(dt){Ml(dt)}u.currentTarget=null,h=B}else for(y=0;y<o.length;y++){if(b=o[y],B=b.instance,et=b.currentTarget,b=b.listener,B!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=et;try{h(u)}catch(dt){Ml(dt)}u.currentTarget=null,h=B}}}}function me(e,i){var a=i[ro];a===void 0&&(a=i[ro]=new Set);var o=e+"__bubble";a.has(o)||(_g(i,e,2,!1),a.add(o))}function ih(e,i,a){var o=0;i&&(o|=4),_g(a,e,o,i)}var lc="_reactListening"+Math.random().toString(36).slice(2);function ah(e){if(!e[lc]){e[lc]=!0,kt.forEach(function(a){a!=="selectionchange"&&(Ky.has(a)||ih(a,!1,e),ih(a,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[lc]||(i[lc]=!0,ih("selectionchange",!1,i))}}function _g(e,i,a,o){switch(Wg(i)){case 2:var u=TS;break;case 8:u=bS;break;default:u=xh}a=u.bind(null,i,a,e),u=void 0,!Eu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,a,{capture:!0,passive:u}):e.addEventListener(i,a,!0):u!==void 0?e.addEventListener(i,a,{passive:u}):e.addEventListener(i,a,!1)}function sh(e,i,a,o,u){var h=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var b=o.stateNode.containerInfo;if(b===u)break;if(y===4)for(y=o.return;y!==null;){var B=y.tag;if((B===3||B===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;b!==null;){if(y=rt(b),y===null)return;if(B=y.tag,B===5||B===6||B===26||B===27){o=h=y;continue t}b=b.parentNode}}o=o.return}Mp(function(){var et=h,dt=Su(a),_t=[];t:{var it=Kp.get(e);if(it!==void 0){var lt=xl,Ft=e;switch(e){case"keypress":if(_l(a)===0)break t;case"keydown":case"keyup":lt=kx;break;case"focusin":Ft="focus",lt=Ru;break;case"focusout":Ft="blur",lt=Ru;break;case"beforeblur":case"afterblur":lt=Ru;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=bp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=Ux;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Wx;break;case Wp:case Yp:case jp:lt=Ox;break;case Zp:lt=jx;break;case"scroll":case"scrollend":lt=Cx;break;case"wheel":lt=Kx;break;case"copy":case"cut":case"paste":lt=zx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=Rp;break;case"toggle":case"beforetoggle":lt=Jx}var Jt=(i&4)!==0,qe=!Jt&&(e==="scroll"||e==="scrollend"),Y=Jt?it!==null?it+"Capture":null:it;Jt=[];for(var G=et,tt;G!==null;){var mt=G;if(tt=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||tt===null||Y===null||(mt=oo(G,Y),mt!=null&&Jt.push(Go(G,mt,tt))),qe)break;G=G.return}0<Jt.length&&(it=new lt(it,Ft,null,a,dt),_t.push({event:it,listeners:Jt}))}}if((i&7)===0){t:{if(it=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",it&&a!==yu&&(Ft=a.relatedTarget||a.fromElement)&&(rt(Ft)||Ft[Zi]))break t;if((lt||it)&&(it=dt.window===dt?dt:(it=dt.ownerDocument)?it.defaultView||it.parentWindow:window,lt?(Ft=a.relatedTarget||a.toElement,lt=et,Ft=Ft?rt(Ft):null,Ft!==null&&(qe=c(Ft),Jt=Ft.tag,Ft!==qe||Jt!==5&&Jt!==27&&Jt!==6)&&(Ft=null)):(lt=null,Ft=et),lt!==Ft)){if(Jt=bp,mt="onMouseLeave",Y="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=Rp,mt="onPointerLeave",Y="onPointerEnter",G="pointer"),qe=lt==null?it:bt(lt),tt=Ft==null?it:bt(Ft),it=new Jt(mt,G+"leave",lt,a,dt),it.target=qe,it.relatedTarget=tt,mt=null,rt(dt)===et&&(Jt=new Jt(Y,G+"enter",Ft,a,dt),Jt.target=tt,Jt.relatedTarget=qe,mt=Jt),qe=mt,lt&&Ft)e:{for(Jt=Qy,Y=lt,G=Ft,tt=0,mt=Y;mt;mt=Jt(mt))tt++;mt=0;for(var jt=G;jt;jt=Jt(jt))mt++;for(;0<tt-mt;)Y=Jt(Y),tt--;for(;0<mt-tt;)G=Jt(G),mt--;for(;tt--;){if(Y===G||G!==null&&Y===G.alternate){Jt=Y;break e}Y=Jt(Y),G=Jt(G)}Jt=null}else Jt=null;lt!==null&&vg(_t,it,lt,Jt,!1),Ft!==null&&qe!==null&&vg(_t,qe,Ft,Jt,!0)}}t:{if(it=et?bt(et):window,lt=it.nodeName&&it.nodeName.toLowerCase(),lt==="select"||lt==="input"&&it.type==="file")var De=Pp;else if(Np(it))if(zp)De=ly;else{De=ry;var qt=sy}else lt=it.nodeName,!lt||lt.toLowerCase()!=="input"||it.type!=="checkbox"&&it.type!=="radio"?et&&xu(et.elementType)&&(De=Pp):De=oy;if(De&&(De=De(e,et))){Op(_t,De,a,dt);break t}qt&&qt(e,it,et),e==="focusout"&&et&&it.type==="number"&&et.memoizedProps.value!=null&&mi(it,"number",it.value)}switch(qt=et?bt(et):window,e){case"focusin":(Np(qt)||qt.contentEditable==="true")&&(Qs=qt,Nu=et,go=null);break;case"focusout":go=Nu=Qs=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,Xp(_t,a,dt);break;case"selectionchange":if(uy)break;case"keydown":case"keyup":Xp(_t,a,dt)}var le;if(Cu)t:{switch(e){case"compositionstart":var xe="onCompositionStart";break t;case"compositionend":xe="onCompositionEnd";break t;case"compositionupdate":xe="onCompositionUpdate";break t}xe=void 0}else Ks?Up(e,a)&&(xe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(xe="onCompositionStart");xe&&(wp&&a.locale!=="ko"&&(Ks||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&Ks&&(le=Ep()):(Da=dt,Tu="value"in Da?Da.value:Da.textContent,Ks=!0)),qt=cc(et,xe),0<qt.length&&(xe=new Ap(xe,e,null,a,dt),_t.push({event:xe,listeners:qt}),le?xe.data=le:(le=Lp(a),le!==null&&(xe.data=le)))),(le=ty?ey(e,a):ny(e,a))&&(xe=cc(et,"onBeforeInput"),0<xe.length&&(qt=new Ap("onBeforeInput","beforeinput",null,a,dt),_t.push({event:qt,listeners:xe}),qt.data=le)),Yy(_t,e,et,a,dt)}gg(_t,i)})}function Go(e,i,a){return{instance:e,listener:i,currentTarget:a}}function cc(e,i){for(var a=i+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=oo(e,a),u!=null&&o.unshift(Go(e,u,h)),u=oo(e,i),u!=null&&o.push(Go(e,u,h))),e.tag===3)return o;e=e.return}return[]}function Qy(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function vg(e,i,a,o,u){for(var h=i._reactName,y=[];a!==null&&a!==o;){var b=a,B=b.alternate,et=b.stateNode;if(b=b.tag,B!==null&&B===o)break;b!==5&&b!==26&&b!==27||et===null||(B=et,u?(et=oo(a,h),et!=null&&y.unshift(Go(a,et,B))):u||(et=oo(a,h),et!=null&&y.push(Go(a,et,B)))),a=a.return}y.length!==0&&e.push({event:i,listeners:y})}var Jy=/\r\n?/g,$y=/\u0000|\uFFFD/g;function xg(e){return(typeof e=="string"?e:""+e).replace(Jy,`
`).replace($y,"")}function yg(e,i){return i=xg(i),xg(e)===i}function Xe(e,i,a,o,u,h){switch(a){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||Ys(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&Ys(e,""+o);break;case"className":Xt(e,"class",o);break;case"tabIndex":Xt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,a,o);break;case"style":yp(e,o,h);break;case"data":if(i!=="object"){Xt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ml(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(i!=="input"&&Xe(e,i,"name",u.name,u,null),Xe(e,i,"formEncType",u.formEncType,u,null),Xe(e,i,"formMethod",u.formMethod,u,null),Xe(e,i,"formTarget",u.formTarget,u,null)):(Xe(e,i,"encType",u.encType,u,null),Xe(e,i,"method",u.method,u,null),Xe(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ml(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=ml(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":me("beforetoggle",e),me("toggle",e),Se(e,"popover",o);break;case"xlinkActuate":mn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":mn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":mn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":mn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":mn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":mn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":mn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":mn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":mn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Se(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Rx.get(a)||a,Se(e,a,o))}}function rh(e,i,a,o,u,h){switch(a){case"style":yp(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Ys(e,o):(typeof o=="number"||typeof o=="bigint")&&Ys(e,""+o);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ne.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),i=a.slice(2,u?a.length-7:void 0),h=e[An]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(i,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(i,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Se(e,a,o)}}}function Un(e,i,a){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var y=a[h];if(y!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:Xe(e,i,h,y,a,null)}}u&&Xe(e,i,"srcSet",a.srcSet,a,null),o&&Xe(e,i,"src",a.src,a,null);return;case"input":me("invalid",e);var b=h=y=u=null,B=null,et=null;for(o in a)if(a.hasOwnProperty(o)){var dt=a[o];if(dt!=null)switch(o){case"name":u=dt;break;case"type":y=dt;break;case"checked":B=dt;break;case"defaultChecked":et=dt;break;case"value":h=dt;break;case"defaultValue":b=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,i));break;default:Xe(e,i,o,dt,a,null)}}Di(e,h,b,B,et,y,u,!1);return;case"select":me("invalid",e),o=y=h=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":h=b;break;case"defaultValue":y=b;break;case"multiple":o=b;default:Xe(e,i,u,b,a,null)}i=h,a=y,e.multiple=!!o,i!=null?Ki(e,!!o,i,!1):a!=null&&Ki(e,!!o,a,!0);return;case"textarea":me("invalid",e),h=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(b=a[y],b!=null))switch(y){case"value":o=b;break;case"defaultValue":u=b;break;case"children":h=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:Xe(e,i,y,b,a,null)}vp(e,o,u,h);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(o=a[B],o!=null))switch(B){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Xe(e,i,B,o,a,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(o=0;o<Ho.length;o++)me(Ho[o],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(et in a)if(a.hasOwnProperty(et)&&(o=a[et],o!=null))switch(et){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:Xe(e,i,et,o,a,null)}return;default:if(xu(i)){for(dt in a)a.hasOwnProperty(dt)&&(o=a[dt],o!==void 0&&rh(e,i,dt,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&Xe(e,i,b,o,a,null))}function tS(e,i,a,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,y=null,b=null,B=null,et=null,dt=null;for(lt in a){var _t=a[lt];if(a.hasOwnProperty(lt)&&_t!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":B=_t;default:o.hasOwnProperty(lt)||Xe(e,i,lt,null,o,_t)}}for(var it in o){var lt=o[it];if(_t=a[it],o.hasOwnProperty(it)&&(lt!=null||_t!=null))switch(it){case"type":h=lt;break;case"name":u=lt;break;case"checked":et=lt;break;case"defaultChecked":dt=lt;break;case"value":y=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,i));break;default:lt!==_t&&Xe(e,i,it,lt,o,_t)}}Pn(e,y,b,B,et,dt,h,u);return;case"select":lt=y=b=it=null;for(h in a)if(B=a[h],a.hasOwnProperty(h)&&B!=null)switch(h){case"value":break;case"multiple":lt=B;default:o.hasOwnProperty(h)||Xe(e,i,h,null,o,B)}for(u in o)if(h=o[u],B=a[u],o.hasOwnProperty(u)&&(h!=null||B!=null))switch(u){case"value":it=h;break;case"defaultValue":b=h;break;case"multiple":y=h;default:h!==B&&Xe(e,i,u,h,o,B)}i=b,a=y,o=lt,it!=null?Ki(e,!!a,it,!1):!!o!=!!a&&(i!=null?Ki(e,!!a,i,!0):Ki(e,!!a,a?[]:"",!1));return;case"textarea":lt=it=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Xe(e,i,b,null,o,u)}for(y in o)if(u=o[y],h=a[y],o.hasOwnProperty(y)&&(u!=null||h!=null))switch(y){case"value":it=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&Xe(e,i,y,u,o,h)}_p(e,it,lt);return;case"option":for(var Ft in a)if(it=a[Ft],a.hasOwnProperty(Ft)&&it!=null&&!o.hasOwnProperty(Ft))switch(Ft){case"selected":e.selected=!1;break;default:Xe(e,i,Ft,null,o,it)}for(B in o)if(it=o[B],lt=a[B],o.hasOwnProperty(B)&&it!==lt&&(it!=null||lt!=null))switch(B){case"selected":e.selected=it&&typeof it!="function"&&typeof it!="symbol";break;default:Xe(e,i,B,it,o,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in a)it=a[Jt],a.hasOwnProperty(Jt)&&it!=null&&!o.hasOwnProperty(Jt)&&Xe(e,i,Jt,null,o,it);for(et in o)if(it=o[et],lt=a[et],o.hasOwnProperty(et)&&it!==lt&&(it!=null||lt!=null))switch(et){case"children":case"dangerouslySetInnerHTML":if(it!=null)throw Error(s(137,i));break;default:Xe(e,i,et,it,o,lt)}return;default:if(xu(i)){for(var qe in a)it=a[qe],a.hasOwnProperty(qe)&&it!==void 0&&!o.hasOwnProperty(qe)&&rh(e,i,qe,void 0,o,it);for(dt in o)it=o[dt],lt=a[dt],!o.hasOwnProperty(dt)||it===lt||it===void 0&&lt===void 0||rh(e,i,dt,it,o,lt);return}}for(var Y in a)it=a[Y],a.hasOwnProperty(Y)&&it!=null&&!o.hasOwnProperty(Y)&&Xe(e,i,Y,null,o,it);for(_t in o)it=o[_t],lt=a[_t],!o.hasOwnProperty(_t)||it===lt||it==null&&lt==null||Xe(e,i,_t,it,o,lt)}function Sg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function eS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,y=u.initiatorType,b=u.duration;if(h&&b&&Sg(y)){for(y=0,b=u.responseEnd,o+=1;o<a.length;o++){var B=a[o],et=B.startTime;if(et>b)break;var dt=B.transferSize,_t=B.initiatorType;dt&&Sg(_t)&&(B=B.responseEnd,y+=dt*(B<b?1:(b-et)/(B-et)))}if(--o,i+=8*(h+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var oh=null,lh=null;function uc(e){return e.nodeType===9?e:e.ownerDocument}function Mg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Eg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function ch(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var uh=null;function nS(){var e=window.event;return e&&e.type==="popstate"?e===uh?!1:(uh=e,!0):(uh=null,!1)}var Tg=typeof setTimeout=="function"?setTimeout:void 0,iS=typeof clearTimeout=="function"?clearTimeout:void 0,bg=typeof Promise=="function"?Promise:void 0,aS=typeof queueMicrotask=="function"?queueMicrotask:typeof bg<"u"?function(e){return bg.resolve(null).then(e).catch(sS)}:Tg;function sS(e){setTimeout(function(){throw e})}function Ya(e){return e==="head"}function Ag(e,i){var a=i,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),Tr(i);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Vo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Vo(a);for(var h=a.firstChild;h;){var y=h.nextSibling,b=h.nodeName;h[k]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=y}}else a==="body"&&Vo(e.ownerDocument.body);a=u}while(a);Tr(i)}function Rg(e,i){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?i?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(i?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function fh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var a=i;switch(i=i.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":fh(a),ot(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function rS(e,i,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[k])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Mi(e.nextSibling),e===null)break}return null}function oS(e,i,a){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Mi(e.nextSibling),e===null))return null;return e}function wg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Mi(e.nextSibling),e===null))return null;return e}function hh(e){return e.data==="$?"||e.data==="$~"}function dh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function lS(e,i){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||a.readyState!=="loading")i();else{var o=function(){i(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Mi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var ph=null;function Cg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(i===0)return Mi(e.nextSibling);i--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||i++}e=e.nextSibling}return null}function Dg(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(i===0)return e;i--}else a!=="/$"&&a!=="/&"||i++}e=e.previousSibling}return null}function Ug(e,i,a){switch(i=uc(a),e){case"html":if(e=i.documentElement,!e)throw Error(s(452));return e;case"head":if(e=i.head,!e)throw Error(s(453));return e;case"body":if(e=i.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Vo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);ot(e)}var Ei=new Map,Lg=new Set;function fc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var da=j.d;j.d={f:cS,r:uS,D:fS,C:hS,L:dS,m:pS,X:gS,S:mS,M:_S};function cS(){var e=da.f(),i=nc();return e||i}function uS(e){var i=X(e);i!==null&&i.tag===5&&i.type==="form"?Zm(i):da.r(e)}var Sr=typeof document>"u"?null:document;function Ng(e,i,a){var o=Sr;if(o&&typeof i=="string"&&i){var u=Sn(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Lg.has(u)||(Lg.add(u),e={rel:e,crossOrigin:a,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Un(i,"link",e),Dt(i),o.head.appendChild(i)))}}function fS(e){da.D(e),Ng("dns-prefetch",e,null)}function hS(e,i){da.C(e,i),Ng("preconnect",e,i)}function dS(e,i,a){da.L(e,i,a);var o=Sr;if(o&&e&&i){var u='link[rel="preload"][as="'+Sn(i)+'"]';i==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Sn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Sn(a.imageSizes)+'"]')):u+='[href="'+Sn(e)+'"]';var h=u;switch(i){case"style":h=Mr(e);break;case"script":h=Er(e)}Ei.has(h)||(e=_({rel:"preload",href:i==="image"&&a&&a.imageSrcSet?void 0:e,as:i},a),Ei.set(h,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(ko(h))||i==="script"&&o.querySelector(Xo(h))||(i=o.createElement("link"),Un(i,"link",e),Dt(i),o.head.appendChild(i)))}}function pS(e,i){da.m(e,i);var a=Sr;if(a&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+Sn(o)+'"][href="'+Sn(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Er(e)}if(!Ei.has(h)&&(e=_({rel:"modulepreload",href:e},i),Ei.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Xo(h)))return}o=a.createElement("link"),Un(o,"link",e),Dt(o),a.head.appendChild(o)}}}function mS(e,i,a){da.S(e,i,a);var o=Sr;if(o&&e){var u=Ct(o).hoistableStyles,h=Mr(e);i=i||"default";var y=u.get(h);if(!y){var b={loading:0,preload:null};if(y=o.querySelector(ko(h)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},a),(a=Ei.get(h))&&mh(e,a);var B=y=o.createElement("link");Dt(B),Un(B,"link",e),B._p=new Promise(function(et,dt){B.onload=et,B.onerror=dt}),B.addEventListener("load",function(){b.loading|=1}),B.addEventListener("error",function(){b.loading|=2}),b.loading|=4,hc(y,i,o)}y={type:"stylesheet",instance:y,count:1,state:b},u.set(h,y)}}}function gS(e,i){da.X(e,i);var a=Sr;if(a&&e){var o=Ct(a).hoistableScripts,u=Er(e),h=o.get(u);h||(h=a.querySelector(Xo(u)),h||(e=_({src:e,async:!0},i),(i=Ei.get(u))&&gh(e,i),h=a.createElement("script"),Dt(h),Un(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function _S(e,i){da.M(e,i);var a=Sr;if(a&&e){var o=Ct(a).hoistableScripts,u=Er(e),h=o.get(u);h||(h=a.querySelector(Xo(u)),h||(e=_({src:e,async:!0,type:"module"},i),(i=Ei.get(u))&&gh(e,i),h=a.createElement("script"),Dt(h),Un(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Og(e,i,a,o){var u=(u=Et.current)?fc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(i=Mr(a.href),a=Ct(u).hoistableStyles,o=a.get(i),o||(o={type:"style",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Mr(a.href);var h=Ct(u).hoistableStyles,y=h.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=u.querySelector(ko(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Ei.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ei.set(e,a),h||vS(u,e,a,y.state))),i&&o===null)throw Error(s(528,""));return y}if(i&&o!==null)throw Error(s(529,""));return null;case"script":return i=a.async,a=a.src,typeof a=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Er(a),a=Ct(u).hoistableScripts,o=a.get(i),o||(o={type:"script",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Mr(e){return'href="'+Sn(e)+'"'}function ko(e){return'link[rel="stylesheet"]['+e+"]"}function Pg(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function vS(e,i,a,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Un(i,"link",a),Dt(i),e.head.appendChild(i))}function Er(e){return'[src="'+Sn(e)+'"]'}function Xo(e){return"script[async]"+e}function zg(e,i,a){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+Sn(a.href)+'"]');if(o)return i.instance=o,Dt(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Dt(o),Un(o,"style",u),hc(o,a.precedence,e),i.instance=o;case"stylesheet":u=Mr(a.href);var h=e.querySelector(ko(u));if(h)return i.state.loading|=4,i.instance=h,Dt(h),h;o=Pg(a),(u=Ei.get(u))&&mh(o,u),h=(e.ownerDocument||e).createElement("link"),Dt(h);var y=h;return y._p=new Promise(function(b,B){y.onload=b,y.onerror=B}),Un(h,"link",o),i.state.loading|=4,hc(h,a.precedence,e),i.instance=h;case"script":return h=Er(a.src),(u=e.querySelector(Xo(h)))?(i.instance=u,Dt(u),u):(o=a,(u=Ei.get(h))&&(o=_({},a),gh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Dt(u),Un(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(s(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,hc(o,a.precedence,e));return i.instance}function hc(e,i,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,y=0;y<o.length;y++){var b=o[y];if(b.dataset.precedence===i)h=b;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(i=a.nodeType===9?a.head:a,i.insertBefore(e,i.firstChild))}function mh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function gh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var dc=null;function Bg(e,i,a){if(dc===null){var o=new Map,u=dc=new Map;u.set(a,o)}else u=dc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[k]||h[tn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(i)||"";y=e+y;var b=o.get(y);b?b.push(h):o.set(y,[h])}}return o}function Ig(e,i,a){e=e.ownerDocument||e,e.head.insertBefore(a,i==="title"?e.querySelector("head > title"):null)}function xS(e,i,a){if(a===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Fg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function yS(e,i,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Mr(o.href),h=i.querySelector(ko(u));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=pc.bind(e),i.then(e,e)),a.state.loading|=4,a.instance=h,Dt(h);return}h=i.ownerDocument||i,o=Pg(o),(u=Ei.get(u))&&mh(o,u),h=h.createElement("link"),Dt(h);var y=h;y._p=new Promise(function(b,B){y.onload=b,y.onerror=B}),Un(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,i),(i=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=pc.bind(e),i.addEventListener("load",a),i.addEventListener("error",a))}}var _h=0;function SS(e,i){return e.stylesheets&&e.count===0&&gc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+i);0<e.imgBytes&&_h===0&&(_h=62500*eS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>_h?50:800)+i);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function pc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)gc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var mc=null;function gc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,mc=new Map,i.forEach(MS,e),mc=null,pc.call(e))}function MS(e,i){if(!(i.state.loading&4)){var a=mc.get(e);if(a)var o=a.get(null);else{a=new Map,mc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var y=u[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=i.instance,y=u.getAttribute("data-precedence"),h=a.get(y)||o,h===o&&a.set(null,u),a.set(y,u),this.count++,o=pc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var qo={$$typeof:D,Provider:null,Consumer:null,_currentValue:Z,_currentValue2:Z,_threadCount:0};function ES(e,i,a,o,u,h,y,b,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Re(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Re(0),this.hiddenUpdates=Re(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function Hg(e,i,a,o,u,h,y,b,B,et,dt,_t){return e=new ES(e,i,a,y,B,et,dt,_t,b),i=1,h===!0&&(i|=24),h=ii(3,null,null,i),e.current=h,h.stateNode=e,i=Zu(),i.refCount++,e.pooledCache=i,i.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:i},$u(h),e}function Gg(e){return e?(e=tr,e):tr}function Vg(e,i,a,o,u,h){u=Gg(u),o.context===null?o.context=u:o.pendingContext=u,o=za(i),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Ba(e,o,i),a!==null&&(Kn(a,e,i),Eo(a,e,i))}function kg(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<i?a:i}}function vh(e,i){kg(e,i),(e=e.alternate)&&kg(e,i)}function Xg(e){if(e.tag===13||e.tag===31){var i=ms(e,67108864);i!==null&&Kn(i,e,67108864),vh(e,67108864)}}function qg(e){if(e.tag===13||e.tag===31){var i=li();i=us(i);var a=ms(e,i);a!==null&&Kn(a,e,i),vh(e,i)}}var _c=!0;function TS(e,i,a,o){var u=P.T;P.T=null;var h=j.p;try{j.p=2,xh(e,i,a,o)}finally{j.p=h,P.T=u}}function bS(e,i,a,o){var u=P.T;P.T=null;var h=j.p;try{j.p=8,xh(e,i,a,o)}finally{j.p=h,P.T=u}}function xh(e,i,a,o){if(_c){var u=yh(o);if(u===null)sh(e,i,o,vc,a),Yg(e,o);else if(RS(u,e,i,a,o))o.stopPropagation();else if(Yg(e,o),i&4&&-1<AS.indexOf(e)){for(;u!==null;){var h=X(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=wt(h.pendingLanes);if(y!==0){var b=h;for(b.pendingLanes|=2,b.entangledLanes|=2;y;){var B=1<<31-te(y);b.entanglements[1]|=B,y&=~B}qi(h),(Le&6)===0&&(tc=pt()+500,Fo(0))}}break;case 31:case 13:b=ms(h,2),b!==null&&Kn(b,h,2),nc(),vh(h,2)}if(h=yh(o),h===null&&sh(e,i,o,vc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else sh(e,i,o,null,a)}}function yh(e){return e=Su(e),Sh(e)}var vc=null;function Sh(e){if(vc=null,e=rt(e),e!==null){var i=c(e);if(i===null)e=null;else{var a=i.tag;if(a===13){if(e=f(i),e!==null)return e;e=null}else if(a===31){if(e=d(i),e!==null)return e;e=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return vc=e,null}function Wg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case gt:return 2;case Wt:return 8;case Ut:case zt:return 32;case _e:return 268435456;default:return 32}default:return 32}}var Mh=!1,ja=null,Za=null,Ka=null,Wo=new Map,Yo=new Map,Qa=[],AS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Yg(e,i){switch(e){case"focusin":case"focusout":ja=null;break;case"dragenter":case"dragleave":Za=null;break;case"mouseover":case"mouseout":Ka=null;break;case"pointerover":case"pointerout":Wo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yo.delete(i.pointerId)}}function jo(e,i,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:i,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},i!==null&&(i=X(i),i!==null&&Xg(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function RS(e,i,a,o,u){switch(i){case"focusin":return ja=jo(ja,e,i,a,o,u),!0;case"dragenter":return Za=jo(Za,e,i,a,o,u),!0;case"mouseover":return Ka=jo(Ka,e,i,a,o,u),!0;case"pointerover":var h=u.pointerId;return Wo.set(h,jo(Wo.get(h)||null,e,i,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Yo.set(h,jo(Yo.get(h)||null,e,i,a,o,u)),!0}return!1}function jg(e){var i=rt(e.target);if(i!==null){var a=c(i);if(a!==null){if(i=a.tag,i===13){if(i=f(a),i!==null){e.blockedOn=i,fs(e.priority,function(){qg(a)});return}}else if(i===31){if(i=d(a),i!==null){e.blockedOn=i,fs(e.priority,function(){qg(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var a=yh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);yu=o,a.target.dispatchEvent(o),yu=null}else return i=X(a),i!==null&&Xg(i),e.blockedOn=a,!1;i.shift()}return!0}function Zg(e,i,a){xc(e)&&a.delete(i)}function wS(){Mh=!1,ja!==null&&xc(ja)&&(ja=null),Za!==null&&xc(Za)&&(Za=null),Ka!==null&&xc(Ka)&&(Ka=null),Wo.forEach(Zg),Yo.forEach(Zg)}function yc(e,i){e.blockedOn===i&&(e.blockedOn=null,Mh||(Mh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,wS)))}var Sc=null;function Kg(e){Sc!==e&&(Sc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Sc===e&&(Sc=null);for(var i=0;i<e.length;i+=3){var a=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(Sh(o||a)===null)continue;break}var h=X(a);h!==null&&(e.splice(i,3),i-=3,yf(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Tr(e){function i(B){return yc(B,e)}ja!==null&&yc(ja,e),Za!==null&&yc(Za,e),Ka!==null&&yc(Ka,e),Wo.forEach(i),Yo.forEach(i);for(var a=0;a<Qa.length;a++){var o=Qa[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Qa.length&&(a=Qa[0],a.blockedOn===null);)jg(a),a.blockedOn===null&&Qa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],y=u[An]||null;if(typeof h=="function")y||Kg(a);else if(y){var b=null;if(h&&h.hasAttribute("formAction")){if(u=h,y=h[An]||null)b=y.formAction;else if(Sh(u)!==null)continue}else b=y.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),Kg(a)}}}function Qg(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function Eh(e){this._internalRoot=e}Mc.prototype.render=Eh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(s(409));var a=i.current,o=li();Vg(a,o,e,i,null,null)},Mc.prototype.unmount=Eh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;Vg(e.current,2,null,e,null,null),nc(),i[Zi]=null}};function Mc(e){this._internalRoot=e}Mc.prototype.unstable_scheduleHydration=function(e){if(e){var i=so();e={blockedOn:null,target:e,priority:i};for(var a=0;a<Qa.length&&i!==0&&i<Qa[a].priority;a++);Qa.splice(a,0,e),a===0&&jg(e)}};var Jg=t.version;if(Jg!=="19.2.8")throw Error(s(527,Jg,"19.2.8"));j.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var CS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ec.isDisabled&&Ec.supportsFiber)try{Kt=Ec.inject(CS),Yt=Ec}catch{}}return Ko.createRoot=function(e,i){if(!l(e))throw Error(s(299));var a=!1,o="",u=s0,h=r0,y=o0;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=Hg(e,1,!1,null,null,a,o,null,u,h,y,Qg),e[Zi]=i.current,ah(e),new Eh(i)},Ko.hydrateRoot=function(e,i,a){if(!l(e))throw Error(s(299));var o=!1,u="",h=s0,y=r0,b=o0,B=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),i=Hg(e,1,!0,i,a??null,o,u,B,h,y,b,Qg),i.context=Gg(null),a=i.current,o=li(),o=us(o),u=za(o),u.callback=null,Ba(a,u,o),a=o,i.current.lanes=a,bn(i,a),qi(i),e[Zi]=i.current,ah(e),new Mc(i)},Ko.version="19.2.8",Ko}var l_;function GS(){if(l_)return Ah.exports;l_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ah.exports=HS(),Ah.exports}var VS=GS();const kS=Ov(VS),c_=r=>{let t;const n=new Set,s=(p,g)=>{const _=typeof p=="function"?p(t):p;if(!Object.is(_,t)){const x=t;t=g??(typeof _!="object"||_===null)?_:Object.assign({},t,_),n.forEach(M=>M(t,x))}},l=()=>t,d={setState:s,getState:l,getInitialState:()=>m,subscribe:p=>(n.add(p),()=>n.delete(p))},m=t=r(s,l,d);return d},XS=(r=>r?c_(r):c_),qS=r=>r;function WS(r,t=qS){const n=al.useSyncExternalStore(r.subscribe,al.useCallback(()=>t(r.getState()),[r,t]),al.useCallback(()=>t(r.getInitialState()),[r,t]));return al.useDebugValue(n),n}const u_=r=>{const t=XS(r),n=s=>WS(t,s);return Object.assign(n,t),n},YS=(r=>r?u_(r):u_),Dh=1/60,f_=100,h_=100,jS=35,ZS=100,KS=20,QS=1.5,$a=200,br=60,JS=5,d_=1.5,$S=3,tM=2,p_=30,Uh=200,m_=60,Lh=150,eM=.9,g_=3.5,__=2.2,Nh=15,v_=8,md=8,nM=20,iM=2.5,aM=10,sM=.14,rM=.2,oM=.4,lM=.05,cM=1.2,uM=60,fM=6,hM=2,Oh=4,dM=.3,pM=2.5,mM=.4,x_={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,bossFight:!1,bossName:""};function y_(r){return{id:r,pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0},hp:f_,maxHp:f_,energy:h_,maxEnergy:h_,speed:KS,weapon:1,weapons:[1,2,3],specialGauge:0,maxSpecialGauge:ZS,invulnTimer:0,alive:!0,score:0,kills:0,combo:0}}function S_(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:.5,aimY:.5,weaponSwitch:0,boost:!1,brake:!1,dodge:!1,special:!1,lockToggle:!1,pause:!1}}const _n=YS(r=>({game:{...x_},players:[y_(0)],inputs:[S_()],setGame:t=>r(n=>({game:{...n.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),resetGame:()=>r({game:{...x_},players:[y_(0)],inputs:[S_()]})})),Ph=({size:r=80,opacity:t=.5})=>nt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[nt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),nt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),M_=()=>{const r=_n(t=>t.setGame);return nt.jsxs("div",{className:"lancer-bg w-full h-full relative overflow-hidden flex items-center justify-center",children:[nt.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:nt.jsx(Ph,{size:520,opacity:.07})}),nt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.04]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px",backgroundRepeat:"repeat"}}),nt.jsxs("div",{className:"relative z-10 mx-auto w-[480px] max-w-[92vw] lancer-frame px-6 py-6",children:[nt.jsxs("div",{className:"flex items-start gap-4",children:[nt.jsxs("div",{className:"flex-1",children:[nt.jsxs("div",{className:"text-[12px] tracking-[0.4em] mb-1",style:{color:"#ffffff"},children:[nt.jsx("span",{style:{color:"#ff3030"},children:"下"}),nt.jsx("span",{style:{color:"#ffffff"},children:" 一 "}),nt.jsx("span",{style:{color:"#ff3030"},children:"战"}),nt.jsx("span",{style:{color:"#ffffff"},children:" 高 达"})]}),nt.jsx("h1",{className:"font-pixel-title leading-none",style:{color:"#6a7fff",fontSize:"44px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff",letterSpacing:"0.04em"},children:"纯白枪骑兵"}),nt.jsx("div",{className:"mt-1 text-[11px] tracking-[0.3em]",style:{color:"#8fa4ff"},children:"SILVER LANCER"})]}),nt.jsx("div",{className:"mt-1",children:nt.jsx(Ph,{size:56,opacity:.7})})]}),nt.jsxs("div",{className:"mt-6 border-t border-lancer-blue/40 pt-4 space-y-2",children:[nt.jsx("button",{onClick:()=>r({screen:"pve",gameMode:"pve"}),className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"开始游戏"}),nt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"操作指南"}),nt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"游戏设置"}),nt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"游戏信息"})]}),nt.jsx("div",{className:"mt-5 flex items-end justify-between",children:nt.jsxs("div",{className:"text-center flex-1",children:[nt.jsx(Ph,{size:42,opacity:.85}),nt.jsx("div",{className:"text-[11px] tracking-[0.25em] mt-1",style:{color:"#ffffff"},children:"PHIXCAT"}),nt.jsx("div",{className:"text-[8px] tracking-wider mt-1",style:{color:"rgba(255,255,255,0.5)"},children:"FLASH 3D ENGINE TEST BUILD · Silver Lancer V 0.79"}),nt.jsx("div",{className:"text-[8px] tracking-wider",style:{color:"rgba(255,255,255,0.5)"},children:"Copyrights 2007—2008 phixcat All rights reserved"})]})})]}),nt.jsx("div",{className:"hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none",children:nt.jsxs("svg",{viewBox:"0 0 200 280",width:"280",height:"380",fill:"#ffffff",children:[nt.jsx("polygon",{points:"80,30 120,30 130,55 70,55"}),nt.jsx("rect",{x:"70",y:"55",width:"60",height:"25"}),nt.jsx("polygon",{points:"30,75 70,80 70,130 25,130"}),nt.jsx("polygon",{points:"130,80 170,75 175,130 130,130"}),nt.jsx("rect",{x:"55",y:"80",width:"90",height:"90"}),nt.jsx("polygon",{points:"80,90 120,90 100,140",fill:"#000"}),nt.jsx("rect",{x:"20",y:"130",width:"40",height:"80"}),nt.jsx("rect",{x:"140",y:"130",width:"40",height:"80"}),nt.jsx("polygon",{points:"60,170 140,170 150,210 50,210"}),nt.jsx("polygon",{points:"55,210 95,210 90,275 60,275"}),nt.jsx("polygon",{points:"105,210 145,210 140,275 110,275"})]})})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rp="170",gM=0,E_=1,_M=2,Pv=1,vM=2,ya=3,ls=0,ei=1,Sa=2,Ta=0,kr=1,gd=2,T_=3,b_=4,xM=5,Bs=100,yM=101,SM=102,MM=103,EM=104,TM=200,bM=201,AM=202,RM=203,_d=204,vd=205,wM=206,CM=207,DM=208,UM=209,LM=210,NM=211,OM=212,PM=213,zM=214,xd=0,yd=1,Sd=2,Wr=3,Md=4,Ed=5,Td=6,bd=7,zv=0,BM=1,IM=2,os=0,Bv=1,Iv=2,Fv=3,Hv=4,FM=5,Gv=6,Vv=7,kv=300,Yr=301,jr=302,Ad=303,Rd=304,du=306,ol=1e3,Gs=1001,wd=1002,Fi=1003,HM=1004,Tc=1005,ji=1006,zh=1007,Vs=1008,Aa=1009,Xv=1010,qv=1011,ll=1012,op=1013,qs=1014,Ma=1015,Jr=1016,lp=1017,cp=1018,Zr=1020,Wv=35902,Yv=1021,jv=1022,Ii=1023,Zv=1024,Kv=1025,Xr=1026,Kr=1027,Qv=1028,up=1029,Jv=1030,fp=1031,hp=1033,tu=33776,eu=33777,nu=33778,iu=33779,Cd=35840,Dd=35841,Ud=35842,Ld=35843,Nd=36196,Od=37492,Pd=37496,zd=37808,Bd=37809,Id=37810,Fd=37811,Hd=37812,Gd=37813,Vd=37814,kd=37815,Xd=37816,qd=37817,Wd=37818,Yd=37819,jd=37820,Zd=37821,au=36492,Kd=36494,Qd=36495,$v=36283,Jd=36284,$d=36285,tp=36286,GM=3200,VM=3201,kM=0,XM=1,rs="",hi="srgb",$r="srgb-linear",pu="linear",Fe="srgb",Ar=7680,A_=519,qM=512,WM=513,YM=514,tx=515,jM=516,ZM=517,KM=518,QM=519,R_=35044,w_="300 es",Ea=2e3,ou=2001;class to{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(n)===-1&&s[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bh=Math.PI/180,ep=180/Math.PI;function cl(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[n&63|128]+Bn[n>>8&255]+"-"+Bn[n>>16&255]+Bn[n>>24&255]+Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]).toLowerCase()}function ti(r,t,n){return Math.max(t,Math.min(n,r))}function JM(r,t){return(r%t+t)%t}function Ih(r,t,n){return(1-n)*r+n*t}function Qo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Qn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Ce{constructor(t=0,n=0){Ce.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,s=this.y,l=t.elements;return this.x=l[0]*n+l[3]*s+l[6],this.y=l[1]*n+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(ti(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y;return n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const s=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,n,s,l,c,f,d,m,p){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,d,m,p)}set(t,n,s,l,c,f,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=n,g[4]=c,g[5]=m,g[6]=s,g[7]=f,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(t,n,s){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],d=s[3],m=s[6],p=s[1],g=s[4],_=s[7],x=s[2],M=s[5],E=s[8],T=l[0],S=l[3],v=l[6],L=l[1],D=l[4],w=l[7],W=l[2],I=l[5],O=l[8];return c[0]=f*T+d*L+m*W,c[3]=f*S+d*D+m*I,c[6]=f*v+d*w+m*O,c[1]=p*T+g*L+_*W,c[4]=p*S+g*D+_*I,c[7]=p*v+g*w+_*O,c[2]=x*T+M*L+E*W,c[5]=x*S+M*D+E*I,c[8]=x*v+M*w+E*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return n*f*g-n*d*p-s*c*g+s*d*m+l*c*p-l*f*m}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=g*f-d*p,x=d*m-g*c,M=p*c-f*m,E=n*_+s*x+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=_*T,t[1]=(l*p-g*s)*T,t[2]=(d*s-l*f)*T,t[3]=x*T,t[4]=(g*n-l*m)*T,t[5]=(l*c-d*n)*T,t[6]=M*T,t[7]=(s*m-p*n)*T,t[8]=(f*n-s*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,s,l,c,f,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*d)+f+t,-l*p,l*m,-l*(-p*f+m*d)+d+n,0,0,1),this}scale(t,n){return this.premultiply(Fh.makeScale(t,n)),this}rotate(t){return this.premultiply(Fh.makeRotation(-t)),this}translate(t,n){return this.premultiply(Fh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<9;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<9;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fh=new ce;function ex(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function lu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function $M(){const r=lu("canvas");return r.style.display="block",r}const C_={};function sl(r){r in C_||(C_[r]=!0,console.warn(r))}function tE(r,t,n){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:s()}}setTimeout(c,n)})}function eE(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function nE(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ae={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(r,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===Fe&&(r.r=ba(r.r),r.g=ba(r.g),r.b=ba(r.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Fe&&(r.r=qr(r.r),r.g=qr(r.g),r.b=qr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===rs?pu:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,n){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function ba(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function qr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const D_=[.64,.33,.3,.6,.15,.06],U_=[.2126,.7152,.0722],L_=[.3127,.329],N_=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),O_=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ae.define({[$r]:{primaries:D_,whitePoint:L_,transfer:pu,toXYZ:N_,fromXYZ:O_,luminanceCoefficients:U_,workingColorSpaceConfig:{unpackColorSpace:hi},outputColorSpaceConfig:{drawingBufferColorSpace:hi}},[hi]:{primaries:D_,whitePoint:L_,transfer:Fe,toXYZ:N_,fromXYZ:O_,luminanceCoefficients:U_,outputColorSpaceConfig:{drawingBufferColorSpace:hi}}});let Rr;class iE{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Rr===void 0&&(Rr=lu("canvas")),Rr.width=t.width,Rr.height=t.height;const s=Rr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Rr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=lu("canvas");n.width=t.width,n.height=t.height;const s=n.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=ba(c[f]/255)*255;return s.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(ba(n[s]/255)*255):n[s]=ba(n[s]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let aE=0;class nx{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:aE++}),this.uuid=cl(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(Hh(l[f].image)):c.push(Hh(l[f]))}else c=Hh(l);s.url=c}return n||(t.images[this.uuid]=s),s}}function Hh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?iE.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sE=0;class Gn extends to{constructor(t=Gn.DEFAULT_IMAGE,n=Gn.DEFAULT_MAPPING,s=Gs,l=Gs,c=ji,f=Vs,d=Ii,m=Aa,p=Gn.DEFAULT_ANISOTROPY,g=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sE++}),this.uuid=cl(),this.name="",this.source=new nx(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==kv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ol:t.x=t.x-Math.floor(t.x);break;case Gs:t.x=t.x<0?0:1;break;case wd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ol:t.y=t.y-Math.floor(t.y);break;case Gs:t.y=t.y<0?0:1;break;case wd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=kv;Gn.DEFAULT_ANISOTROPY=1;class on{constructor(t=0,n=0,s=0,l=1){on.prototype.isVector4=!0,this.x=t,this.y=n,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,s,l){return this.x=t,this.y=n,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,s,l,c;const m=t.elements,p=m[0],g=m[4],_=m[8],x=m[1],M=m[5],E=m[9],T=m[2],S=m[6],v=m[10];if(Math.abs(g-x)<.01&&Math.abs(_-T)<.01&&Math.abs(E-S)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+T)<.1&&Math.abs(E+S)<.1&&Math.abs(p+M+v-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const D=(p+1)/2,w=(M+1)/2,W=(v+1)/2,I=(g+x)/4,O=(_+T)/4,H=(E+S)/4;return D>w&&D>W?D<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(D),l=I/s,c=O/s):w>W?w<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),s=I/l,c=H/l):W<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(W),s=O/c,l=H/c),this.set(s,l,c,n),this}let L=Math.sqrt((S-E)*(S-E)+(_-T)*(_-T)+(x-g)*(x-g));return Math.abs(L)<.001&&(L=1),this.x=(S-E)/L,this.y=(_-T)/L,this.z=(x-g)/L,this.w=Math.acos((p+M+v-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this.w=t.w+(n.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rE extends to{constructor(t=1,n=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new on(0,0,t,n),this.scissorTest=!1,this.viewport=new on(0,0,t,n);const l={width:t,height:n,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ji,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new Gn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const f=s.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,s=1){if(this.width!==t||this.height!==n||this.depth!==s){this.width=t,this.height=n,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new nx(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cs extends rE{constructor(t=1,n=1,s={}){super(t,n,s),this.isWebGLRenderTarget=!0}}class ix extends Gn{constructor(t=null,n=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=Gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class oE extends Gn{constructor(t=null,n=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=Gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ul{constructor(t=0,n=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=s,this._w=l}static slerpFlat(t,n,s,l,c,f,d){let m=s[l+0],p=s[l+1],g=s[l+2],_=s[l+3];const x=c[f+0],M=c[f+1],E=c[f+2],T=c[f+3];if(d===0){t[n+0]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_;return}if(d===1){t[n+0]=x,t[n+1]=M,t[n+2]=E,t[n+3]=T;return}if(_!==T||m!==x||p!==M||g!==E){let S=1-d;const v=m*x+p*M+g*E+_*T,L=v>=0?1:-1,D=1-v*v;if(D>Number.EPSILON){const W=Math.sqrt(D),I=Math.atan2(W,v*L);S=Math.sin(S*I)/W,d=Math.sin(d*I)/W}const w=d*L;if(m=m*S+x*w,p=p*S+M*w,g=g*S+E*w,_=_*S+T*w,S===1-d){const W=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=W,p*=W,g*=W,_*=W}}t[n]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,s,l,c,f){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],_=c[f],x=c[f+1],M=c[f+2],E=c[f+3];return t[n]=d*E+g*_+m*M-p*x,t[n+1]=m*E+g*x+p*_-d*M,t[n+2]=p*E+g*M+d*x-m*_,t[n+3]=g*E-d*_-m*x-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,s,l){return this._x=t,this._y=n,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const s=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),_=d(c/2),x=m(s/2),M=m(l/2),E=m(c/2);switch(f){case"XYZ":this._x=x*g*_+p*M*E,this._y=p*M*_-x*g*E,this._z=p*g*E+x*M*_,this._w=p*g*_-x*M*E;break;case"YXZ":this._x=x*g*_+p*M*E,this._y=p*M*_-x*g*E,this._z=p*g*E-x*M*_,this._w=p*g*_+x*M*E;break;case"ZXY":this._x=x*g*_-p*M*E,this._y=p*M*_+x*g*E,this._z=p*g*E+x*M*_,this._w=p*g*_-x*M*E;break;case"ZYX":this._x=x*g*_-p*M*E,this._y=p*M*_+x*g*E,this._z=p*g*E-x*M*_,this._w=p*g*_+x*M*E;break;case"YZX":this._x=x*g*_+p*M*E,this._y=p*M*_+x*g*E,this._z=p*g*E-x*M*_,this._w=p*g*_-x*M*E;break;case"XZY":this._x=x*g*_-p*M*E,this._y=p*M*_-x*g*E,this._z=p*g*E+x*M*_,this._w=p*g*_+x*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const s=n/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,s=n[0],l=n[4],c=n[8],f=n[1],d=n[5],m=n[9],p=n[2],g=n[6],_=n[10],x=s+d+_;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(g-m)*M,this._y=(c-p)*M,this._z=(f-l)*M}else if(s>d&&s>_){const M=2*Math.sqrt(1+s-d-_);this._w=(g-m)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+p)/M}else if(d>_){const M=2*Math.sqrt(1+d-s-_);this._w=(c-p)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+_-s-d);this._w=(f-l)/M,this._x=(c+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let s=t.dot(n)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ti(this.dot(t),-1,1)))}rotateTowards(t,n){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,n/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const s=t._x,l=t._y,c=t._z,f=t._w,d=n._x,m=n._y,p=n._z,g=n._w;return this._x=s*g+f*d+l*p-c*m,this._y=l*g+f*m+c*d-s*p,this._z=c*g+f*p+s*m-l*d,this._w=f*g-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,f=this._w;let d=f*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=f,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-n;return this._w=M*f+n*this._w,this._x=M*s+n*this._x,this._y=M*l+n*this._y,this._z=M*c+n*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),_=Math.sin((1-n)*g)/p,x=Math.sin(n*g)/p;return this._w=f*_+this._w*x,this._x=s*_+this._x*x,this._y=l*_+this._y*x,this._z=c*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,n,s){return this.copy(t).slerp(n,s)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(t=0,n=0,s=0){$.prototype.isVector3=!0,this.x=t,this.y=n,this.z=s}set(t,n,s){return s===void 0&&(s=this.z),this.x=t,this.y=n,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(P_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(P_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*s+c[6]*l,this.y=c[1]*n+c[4]*s+c[7]*l,this.z=c[2]*n+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,s=this.y,l=this.z,c=t.x,f=t.y,d=t.z,m=t.w,p=2*(f*l-d*s),g=2*(d*n-c*l),_=2*(c*s-f*n);return this.x=n+m*p+f*_-d*g,this.y=s+m*g+d*p-c*_,this.z=l+m*_+c*g-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*s+c[8]*l,this.y=c[1]*n+c[5]*s+c[9]*l,this.z=c[2]*n+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const s=t.x,l=t.y,c=t.z,f=n.x,d=n.y,m=n.z;return this.x=l*m-c*d,this.y=c*f-s*m,this.z=s*d-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const s=t.dot(this)/n;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Gh.copy(this).projectOnVector(t),this.sub(Gh)}reflect(t){return this.sub(Gh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(ti(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return n*n+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,s){const l=Math.sin(n)*t;return this.x=l*Math.sin(s),this.y=Math.cos(n)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,s){return this.x=t*Math.sin(n),this.y=s,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=s,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,s=Math.sqrt(1-n*n);return this.x=s*Math.cos(t),this.y=n,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gh=new $,P_=new ul;class fl{constructor(t=new $(1/0,1/0,1/0),n=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n+=3)this.expandByPoint(Oi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,s=t.count;n<s;n++)this.expandByPoint(Oi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const s=Oi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,Oi):Oi.fromBufferAttribute(c,f),Oi.applyMatrix4(t.matrixWorld),this.expandByPoint(Oi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),bc.copy(s.boundingBox)),bc.applyMatrix4(t.matrixWorld),this.union(bc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Oi),Oi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,s;return t.normal.x>0?(n=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),n<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Jo),Ac.subVectors(this.max,Jo),wr.subVectors(t.a,Jo),Cr.subVectors(t.b,Jo),Dr.subVectors(t.c,Jo),ts.subVectors(Cr,wr),es.subVectors(Dr,Cr),ws.subVectors(wr,Dr);let n=[0,-ts.z,ts.y,0,-es.z,es.y,0,-ws.z,ws.y,ts.z,0,-ts.x,es.z,0,-es.x,ws.z,0,-ws.x,-ts.y,ts.x,0,-es.y,es.x,0,-ws.y,ws.x,0];return!Vh(n,wr,Cr,Dr,Ac)||(n=[1,0,0,0,1,0,0,0,1],!Vh(n,wr,Cr,Dr,Ac))?!1:(Rc.crossVectors(ts,es),n=[Rc.x,Rc.y,Rc.z],Vh(n,wr,Cr,Dr,Ac))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Oi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Oi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const pa=[new $,new $,new $,new $,new $,new $,new $,new $],Oi=new $,bc=new fl,wr=new $,Cr=new $,Dr=new $,ts=new $,es=new $,ws=new $,Jo=new $,Ac=new $,Rc=new $,Cs=new $;function Vh(r,t,n,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Cs.fromArray(r,c);const d=l.x*Math.abs(Cs.x)+l.y*Math.abs(Cs.y)+l.z*Math.abs(Cs.z),m=t.dot(Cs),p=n.dot(Cs),g=s.dot(Cs);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const lE=new fl,$o=new $,kh=new $;class hl{constructor(t=new $,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const s=this.center;n!==void 0?s.copy(n):lE.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const s=this.center.distanceToSquared(t);return n.copy(t),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$o.subVectors(t,this.center);const n=$o.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),l=(s-this.radius)*.5;this.center.addScaledVector($o,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($o.copy(t.center).add(kh)),this.expandByPoint($o.copy(t.center).sub(kh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ma=new $,Xh=new $,wc=new $,ns=new $,qh=new $,Cc=new $,Wh=new $;class dp{constructor(t=new $,n=new $(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ma)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=ma.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ma.copy(this.origin).addScaledVector(this.direction,n),ma.distanceToSquared(t))}distanceSqToSegment(t,n,s,l){Xh.copy(t).add(n).multiplyScalar(.5),wc.copy(n).sub(t).normalize(),ns.copy(this.origin).sub(Xh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(wc),d=ns.dot(this.direction),m=-ns.dot(wc),p=ns.lengthSq(),g=Math.abs(1-f*f);let _,x,M,E;if(g>0)if(_=f*m-d,x=f*d-m,E=c*g,_>=0)if(x>=-E)if(x<=E){const T=1/g;_*=T,x*=T,M=_*(_+f*x+2*d)+x*(f*_+x+2*m)+p}else x=c,_=Math.max(0,-(f*x+d)),M=-_*_+x*(x+2*m)+p;else x=-c,_=Math.max(0,-(f*x+d)),M=-_*_+x*(x+2*m)+p;else x<=-E?(_=Math.max(0,-(-f*c+d)),x=_>0?-c:Math.min(Math.max(-c,-m),c),M=-_*_+x*(x+2*m)+p):x<=E?(_=0,x=Math.min(Math.max(-c,-m),c),M=x*(x+2*m)+p):(_=Math.max(0,-(f*c+d)),x=_>0?c:Math.min(Math.max(-c,-m),c),M=-_*_+x*(x+2*m)+p);else x=f>0?-c:c,_=Math.max(0,-(f*x+d)),M=-_*_+x*(x+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Xh).addScaledVector(wc,x),M}intersectSphere(t,n){ma.subVectors(t.center,this.origin);const s=ma.dot(this.direction),l=ma.dot(ma)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=s-f,m=s+f;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/n;return s>=0?s:null}intersectPlane(t,n){const s=this.distanceToPlane(t);return s===null?null:this.at(s,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let s,l,c,f,d,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return p>=0?(s=(t.min.x-x.x)*p,l=(t.max.x-x.x)*p):(s=(t.max.x-x.x)*p,l=(t.min.x-x.x)*p),g>=0?(c=(t.min.y-x.y)*g,f=(t.max.y-x.y)*g):(c=(t.max.y-x.y)*g,f=(t.min.y-x.y)*g),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(d=(t.min.z-x.z)*_,m=(t.max.z-x.z)*_):(d=(t.max.z-x.z)*_,m=(t.min.z-x.z)*_),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,n)}intersectsBox(t){return this.intersectBox(t,ma)!==null}intersectTriangle(t,n,s,l,c){qh.subVectors(n,t),Cc.subVectors(s,t),Wh.crossVectors(qh,Cc);let f=this.direction.dot(Wh),d;if(f>0){if(l)return null;d=1}else if(f<0)d=-1,f=-f;else return null;ns.subVectors(this.origin,t);const m=d*this.direction.dot(Cc.crossVectors(ns,Cc));if(m<0)return null;const p=d*this.direction.dot(qh.cross(ns));if(p<0||m+p>f)return null;const g=-d*ns.dot(Wh);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class an{constructor(t,n,s,l,c,f,d,m,p,g,_,x,M,E,T,S){an.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,d,m,p,g,_,x,M,E,T,S)}set(t,n,s,l,c,f,d,m,p,g,_,x,M,E,T,S){const v=this.elements;return v[0]=t,v[4]=n,v[8]=s,v[12]=l,v[1]=c,v[5]=f,v[9]=d,v[13]=m,v[2]=p,v[6]=g,v[10]=_,v[14]=x,v[3]=M,v[7]=E,v[11]=T,v[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new an().fromArray(this.elements)}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(t){const n=this.elements,s=t.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,s){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,n,s){return this.set(t.x,n.x,s.x,0,t.y,n.y,s.y,0,t.z,n.z,s.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,s=t.elements,l=1/Ur.setFromMatrixColumn(t,0).length(),c=1/Ur.setFromMatrixColumn(t,1).length(),f=1/Ur.setFromMatrixColumn(t,2).length();return n[0]=s[0]*l,n[1]=s[1]*l,n[2]=s[2]*l,n[3]=0,n[4]=s[4]*c,n[5]=s[5]*c,n[6]=s[6]*c,n[7]=0,n[8]=s[8]*f,n[9]=s[9]*f,n[10]=s[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const x=f*g,M=f*_,E=d*g,T=d*_;n[0]=m*g,n[4]=-m*_,n[8]=p,n[1]=M+E*p,n[5]=x-T*p,n[9]=-d*m,n[2]=T-x*p,n[6]=E+M*p,n[10]=f*m}else if(t.order==="YXZ"){const x=m*g,M=m*_,E=p*g,T=p*_;n[0]=x+T*d,n[4]=E*d-M,n[8]=f*p,n[1]=f*_,n[5]=f*g,n[9]=-d,n[2]=M*d-E,n[6]=T+x*d,n[10]=f*m}else if(t.order==="ZXY"){const x=m*g,M=m*_,E=p*g,T=p*_;n[0]=x-T*d,n[4]=-f*_,n[8]=E+M*d,n[1]=M+E*d,n[5]=f*g,n[9]=T-x*d,n[2]=-f*p,n[6]=d,n[10]=f*m}else if(t.order==="ZYX"){const x=f*g,M=f*_,E=d*g,T=d*_;n[0]=m*g,n[4]=E*p-M,n[8]=x*p+T,n[1]=m*_,n[5]=T*p+x,n[9]=M*p-E,n[2]=-p,n[6]=d*m,n[10]=f*m}else if(t.order==="YZX"){const x=f*m,M=f*p,E=d*m,T=d*p;n[0]=m*g,n[4]=T-x*_,n[8]=E*_+M,n[1]=_,n[5]=f*g,n[9]=-d*g,n[2]=-p*g,n[6]=M*_+E,n[10]=x-T*_}else if(t.order==="XZY"){const x=f*m,M=f*p,E=d*m,T=d*p;n[0]=m*g,n[4]=-_,n[8]=p*g,n[1]=x*_+T,n[5]=f*g,n[9]=M*_-E,n[2]=E*_-M,n[6]=d*g,n[10]=T*_+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cE,t,uE)}lookAt(t,n,s){const l=this.elements;return ci.subVectors(t,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),is.crossVectors(s,ci),is.lengthSq()===0&&(Math.abs(s.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),is.crossVectors(s,ci)),is.normalize(),Dc.crossVectors(ci,is),l[0]=is.x,l[4]=Dc.x,l[8]=ci.x,l[1]=is.y,l[5]=Dc.y,l[9]=ci.y,l[2]=is.z,l[6]=Dc.z,l[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],d=s[4],m=s[8],p=s[12],g=s[1],_=s[5],x=s[9],M=s[13],E=s[2],T=s[6],S=s[10],v=s[14],L=s[3],D=s[7],w=s[11],W=s[15],I=l[0],O=l[4],H=l[8],U=l[12],R=l[1],F=l[5],Q=l[9],J=l[13],ct=l[2],ut=l[6],P=l[10],j=l[14],Z=l[3],St=l[7],Tt=l[11],z=l[15];return c[0]=f*I+d*R+m*ct+p*Z,c[4]=f*O+d*F+m*ut+p*St,c[8]=f*H+d*Q+m*P+p*Tt,c[12]=f*U+d*J+m*j+p*z,c[1]=g*I+_*R+x*ct+M*Z,c[5]=g*O+_*F+x*ut+M*St,c[9]=g*H+_*Q+x*P+M*Tt,c[13]=g*U+_*J+x*j+M*z,c[2]=E*I+T*R+S*ct+v*Z,c[6]=E*O+T*F+S*ut+v*St,c[10]=E*H+T*Q+S*P+v*Tt,c[14]=E*U+T*J+S*j+v*z,c[3]=L*I+D*R+w*ct+W*Z,c[7]=L*O+D*F+w*ut+W*St,c[11]=L*H+D*Q+w*P+W*Tt,c[15]=L*U+D*J+w*j+W*z,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[4],l=t[8],c=t[12],f=t[1],d=t[5],m=t[9],p=t[13],g=t[2],_=t[6],x=t[10],M=t[14],E=t[3],T=t[7],S=t[11],v=t[15];return E*(+c*m*_-l*p*_-c*d*x+s*p*x+l*d*M-s*m*M)+T*(+n*m*M-n*p*x+c*f*x-l*f*M+l*p*g-c*m*g)+S*(+n*p*_-n*d*M-c*f*_+s*f*M+c*d*g-s*p*g)+v*(-l*d*g-n*m*_+n*d*x+l*f*_-s*f*x+s*m*g)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=s),this}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=t[9],x=t[10],M=t[11],E=t[12],T=t[13],S=t[14],v=t[15],L=_*S*p-T*x*p+T*m*M-d*S*M-_*m*v+d*x*v,D=E*x*p-g*S*p-E*m*M+f*S*M+g*m*v-f*x*v,w=g*T*p-E*_*p+E*d*M-f*T*M-g*d*v+f*_*v,W=E*_*m-g*T*m-E*d*x+f*T*x+g*d*S-f*_*S,I=n*L+s*D+l*w+c*W;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/I;return t[0]=L*O,t[1]=(T*x*c-_*S*c-T*l*M+s*S*M+_*l*v-s*x*v)*O,t[2]=(d*S*c-T*m*c+T*l*p-s*S*p-d*l*v+s*m*v)*O,t[3]=(_*m*c-d*x*c-_*l*p+s*x*p+d*l*M-s*m*M)*O,t[4]=D*O,t[5]=(g*S*c-E*x*c+E*l*M-n*S*M-g*l*v+n*x*v)*O,t[6]=(E*m*c-f*S*c-E*l*p+n*S*p+f*l*v-n*m*v)*O,t[7]=(f*x*c-g*m*c+g*l*p-n*x*p-f*l*M+n*m*M)*O,t[8]=w*O,t[9]=(E*_*c-g*T*c-E*s*M+n*T*M+g*s*v-n*_*v)*O,t[10]=(f*T*c-E*d*c+E*s*p-n*T*p-f*s*v+n*d*v)*O,t[11]=(g*d*c-f*_*c-g*s*p+n*_*p+f*s*M-n*d*M)*O,t[12]=W*O,t[13]=(g*T*l-E*_*l+E*s*x-n*T*x-g*s*S+n*_*S)*O,t[14]=(E*d*l-f*T*l-E*s*m+n*T*m+f*s*S-n*d*S)*O,t[15]=(f*_*l-g*d*l+g*s*m-n*_*m-f*s*x+n*d*x)*O,this}scale(t){const n=this.elements,s=t.x,l=t.y,c=t.z;return n[0]*=s,n[4]*=l,n[8]*=c,n[1]*=s,n[5]*=l,n[9]*=c,n[2]*=s,n[6]*=l,n[10]*=c,n[3]*=s,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,s,l))}makeTranslation(t,n,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const s=Math.cos(n),l=Math.sin(n),c=1-s,f=t.x,d=t.y,m=t.z,p=c*f,g=c*d;return this.set(p*f+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*f,0,p*m-l*d,g*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,n,s){return this.set(t,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,n,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,s){const l=this.elements,c=n._x,f=n._y,d=n._z,m=n._w,p=c+c,g=f+f,_=d+d,x=c*p,M=c*g,E=c*_,T=f*g,S=f*_,v=d*_,L=m*p,D=m*g,w=m*_,W=s.x,I=s.y,O=s.z;return l[0]=(1-(T+v))*W,l[1]=(M+w)*W,l[2]=(E-D)*W,l[3]=0,l[4]=(M-w)*I,l[5]=(1-(x+v))*I,l[6]=(S+L)*I,l[7]=0,l[8]=(E+D)*O,l[9]=(S-L)*O,l[10]=(1-(x+T))*O,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,s){const l=this.elements;let c=Ur.set(l[0],l[1],l[2]).length();const f=Ur.set(l[4],l[5],l[6]).length(),d=Ur.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Pi.copy(this);const p=1/c,g=1/f,_=1/d;return Pi.elements[0]*=p,Pi.elements[1]*=p,Pi.elements[2]*=p,Pi.elements[4]*=g,Pi.elements[5]*=g,Pi.elements[6]*=g,Pi.elements[8]*=_,Pi.elements[9]*=_,Pi.elements[10]*=_,n.setFromRotationMatrix(Pi),s.x=c,s.y=f,s.z=d,this}makePerspective(t,n,s,l,c,f,d=Ea){const m=this.elements,p=2*c/(n-t),g=2*c/(s-l),_=(n+t)/(n-t),x=(s+l)/(s-l);let M,E;if(d===Ea)M=-(f+c)/(f-c),E=-2*f*c/(f-c);else if(d===ou)M=-f/(f-c),E=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=_,m[12]=0,m[1]=0,m[5]=g,m[9]=x,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=E,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,n,s,l,c,f,d=Ea){const m=this.elements,p=1/(n-t),g=1/(s-l),_=1/(f-c),x=(n+t)*p,M=(s+l)*g;let E,T;if(d===Ea)E=(f+c)*_,T=-2*_;else if(d===ou)E=c*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-x,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=T,m[14]=-E,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<16;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<16;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t[n+9]=s[9],t[n+10]=s[10],t[n+11]=s[11],t[n+12]=s[12],t[n+13]=s[13],t[n+14]=s[14],t[n+15]=s[15],t}}const Ur=new $,Pi=new an,cE=new $(0,0,0),uE=new $(1,1,1),is=new $,Dc=new $,ci=new $,z_=new an,B_=new ul;class Ra{constructor(t=0,n=0,s=0,l=Ra.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,s,l=this._order){return this._x=t,this._y=n,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],m=l[1],p=l[5],g=l[9],_=l[2],x=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(ti(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-ti(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ti(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-ti(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(ti(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-ti(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,s){return z_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(z_,n,s)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return B_.setFromEuler(this),this.setFromQuaternion(B_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ra.DEFAULT_ORDER="XYZ";class ax{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fE=0;const I_=new $,Lr=new ul,ga=new an,Uc=new $,tl=new $,hE=new $,dE=new ul,F_=new $(1,0,0),H_=new $(0,1,0),G_=new $(0,0,1),V_={type:"added"},pE={type:"removed"},Nr={type:"childadded",child:null},Yh={type:"childremoved",child:null};class Vn extends to{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fE++}),this.uuid=cl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vn.DEFAULT_UP.clone();const t=new $,n=new Ra,s=new ul,l=new $(1,1,1);function c(){s.setFromEuler(n,!1)}function f(){n.setFromQuaternion(s,void 0,!1)}n._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new an},normalMatrix:{value:new ce}}),this.matrix=new an,this.matrixWorld=new an,this.matrixAutoUpdate=Vn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ax,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Lr.setFromAxisAngle(t,n),this.quaternion.multiply(Lr),this}rotateOnWorldAxis(t,n){return Lr.setFromAxisAngle(t,n),this.quaternion.premultiply(Lr),this}rotateX(t){return this.rotateOnAxis(F_,t)}rotateY(t){return this.rotateOnAxis(H_,t)}rotateZ(t){return this.rotateOnAxis(G_,t)}translateOnAxis(t,n){return I_.copy(t).applyQuaternion(this.quaternion),this.position.add(I_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(F_,t)}translateY(t){return this.translateOnAxis(H_,t)}translateZ(t){return this.translateOnAxis(G_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ga.copy(this.matrixWorld).invert())}lookAt(t,n,s){t.isVector3?Uc.copy(t):Uc.set(t,n,s);const l=this.parent;this.updateWorldMatrix(!0,!1),tl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ga.lookAt(tl,Uc,this.up):ga.lookAt(Uc,tl,this.up),this.quaternion.setFromRotationMatrix(ga),l&&(ga.extractRotation(l.matrixWorld),Lr.setFromRotationMatrix(ga),this.quaternion.premultiply(Lr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(V_),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(pE),Yh.child=t,this.dispatchEvent(Yh),Yh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ga.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ga.multiply(t.parent.matrixWorld)),t.applyMatrix4(ga),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(V_),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,s=[]){this[t]===n&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,t,hE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,dE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].updateMatrixWorld(t)}updateWorldMatrix(t,n){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",s={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(n){const d=f(t.geometries),m=f(t.materials),p=f(t.textures),g=f(t.images),_=f(t.shapes),x=f(t.skeletons),M=f(t.animations),E=f(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),_.length>0&&(s.shapes=_),x.length>0&&(s.skeletons=x),M.length>0&&(s.animations=M),E.length>0&&(s.nodes=E)}return s.object=l,s;function f(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}Vn.DEFAULT_UP=new $(0,1,0);Vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zi=new $,_a=new $,jh=new $,va=new $,Or=new $,Pr=new $,k_=new $,Zh=new $,Kh=new $,Qh=new $,Jh=new on,$h=new on,td=new on;class Bi{constructor(t=new $,n=new $,s=new $){this.a=t,this.b=n,this.c=s}static getNormal(t,n,s,l){l.subVectors(s,n),zi.subVectors(t,n),l.cross(zi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,s,l,c){zi.subVectors(l,n),_a.subVectors(s,n),jh.subVectors(t,n);const f=zi.dot(zi),d=zi.dot(_a),m=zi.dot(jh),p=_a.dot(_a),g=_a.dot(jh),_=f*p-d*d;if(_===0)return c.set(0,0,0),null;const x=1/_,M=(p*m-d*g)*x,E=(f*g-d*m)*x;return c.set(1-M-E,E,M)}static containsPoint(t,n,s,l){return this.getBarycoord(t,n,s,l,va)===null?!1:va.x>=0&&va.y>=0&&va.x+va.y<=1}static getInterpolation(t,n,s,l,c,f,d,m){return this.getBarycoord(t,n,s,l,va)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,va.x),m.addScaledVector(f,va.y),m.addScaledVector(d,va.z),m)}static getInterpolatedAttribute(t,n,s,l,c,f){return Jh.setScalar(0),$h.setScalar(0),td.setScalar(0),Jh.fromBufferAttribute(t,n),$h.fromBufferAttribute(t,s),td.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Jh,c.x),f.addScaledVector($h,c.y),f.addScaledVector(td,c.z),f}static isFrontFacing(t,n,s,l){return zi.subVectors(s,n),_a.subVectors(t,n),zi.cross(_a).dot(l)<0}set(t,n,s){return this.a.copy(t),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(t,n,s,l){return this.a.copy(t[n]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,s,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zi.subVectors(this.c,this.b),_a.subVectors(this.a,this.b),zi.cross(_a).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Bi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,s,l,c){return Bi.getInterpolation(t,this.a,this.b,this.c,n,s,l,c)}containsPoint(t){return Bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const s=this.a,l=this.b,c=this.c;let f,d;Or.subVectors(l,s),Pr.subVectors(c,s),Zh.subVectors(t,s);const m=Or.dot(Zh),p=Pr.dot(Zh);if(m<=0&&p<=0)return n.copy(s);Kh.subVectors(t,l);const g=Or.dot(Kh),_=Pr.dot(Kh);if(g>=0&&_<=g)return n.copy(l);const x=m*_-g*p;if(x<=0&&m>=0&&g<=0)return f=m/(m-g),n.copy(s).addScaledVector(Or,f);Qh.subVectors(t,c);const M=Or.dot(Qh),E=Pr.dot(Qh);if(E>=0&&M<=E)return n.copy(c);const T=M*p-m*E;if(T<=0&&p>=0&&E<=0)return d=p/(p-E),n.copy(s).addScaledVector(Pr,d);const S=g*E-M*_;if(S<=0&&_-g>=0&&M-E>=0)return k_.subVectors(c,l),d=(_-g)/(_-g+(M-E)),n.copy(l).addScaledVector(k_,d);const v=1/(S+T+x);return f=T*v,d=x*v,n.copy(s).addScaledVector(Or,f).addScaledVector(Pr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const sx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},Lc={h:0,s:0,l:0};function ed(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class fe{constructor(t,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,s)}set(t,n,s){if(n===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=hi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ae.toWorkingColorSpace(this,n),this}setRGB(t,n,s,l=Ae.workingColorSpace){return this.r=t,this.g=n,this.b=s,Ae.toWorkingColorSpace(this,l),this}setHSL(t,n,s,l=Ae.workingColorSpace){if(t=JM(t,1),n=ti(n,0,1),s=ti(s,0,1),n===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+n):s+n-s*n,f=2*s-c;this.r=ed(f,c,t+1/3),this.g=ed(f,c,t),this.b=ed(f,c,t-1/3)}return Ae.toWorkingColorSpace(this,l),this}setStyle(t,n=hi){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=hi){const s=sx[t.toLowerCase()];return s!==void 0?this.setHex(s,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ba(t.r),this.g=ba(t.g),this.b=ba(t.b),this}copyLinearToSRGB(t){return this.r=qr(t.r),this.g=qr(t.g),this.b=qr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hi){return Ae.fromWorkingColorSpace(In.copy(this),t),Math.round(ti(In.r*255,0,255))*65536+Math.round(ti(In.g*255,0,255))*256+Math.round(ti(In.b*255,0,255))}getHexString(t=hi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ae.workingColorSpace){Ae.fromWorkingColorSpace(In.copy(this),n);const s=In.r,l=In.g,c=In.b,f=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const g=(d+f)/2;if(d===f)m=0,p=0;else{const _=f-d;switch(p=g<=.5?_/(f+d):_/(2-f-d),f){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,n=Ae.workingColorSpace){return Ae.fromWorkingColorSpace(In.copy(this),n),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=hi){Ae.fromWorkingColorSpace(In.copy(this),t);const n=In.r,s=In.g,l=In.b;return t!==hi?`color(${t} ${n.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,n,s){return this.getHSL(as),this.setHSL(as.h+t,as.s+n,as.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,s){return this.r=t.r+(n.r-t.r)*s,this.g=t.g+(n.g-t.g)*s,this.b=t.b+(n.b-t.b)*s,this}lerpHSL(t,n){this.getHSL(as),t.getHSL(Lc);const s=Ih(as.h,Lc.h,n),l=Ih(as.s,Lc.s,n),c=Ih(as.l,Lc.l,n);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*s+c[6]*l,this.g=c[1]*n+c[4]*s+c[7]*l,this.b=c[2]*n+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new fe;fe.NAMES=sx;let mE=0;class eo extends to{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mE++}),this.uuid=cl(),this.name="",this.blending=kr,this.side=ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_d,this.blendDst=vd,this.blendEquation=Bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=A_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ar,this.stencilZFail=Ar,this.stencilZPass=Ar,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const s=t[n];if(s===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[n]=s}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==kr&&(s.blending=this.blending),this.side!==ls&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==_d&&(s.blendSrc=this.blendSrc),this.blendDst!==vd&&(s.blendDst=this.blendDst),this.blendEquation!==Bs&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Wr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==A_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ar&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ar&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ar&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const d in c){const m=c[d];delete m.metadata,f.push(m)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let s=null;if(n!==null){const l=n.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=n[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Is extends eo{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ra,this.combine=zv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const hn=new $,Nc=new Ce;class di{constructor(t,n,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=s,this.usage=R_,this.updateRanges=[],this.gpuType=Ma,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,s){t*=this.itemSize,s*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)Nc.fromBufferAttribute(this,n),Nc.applyMatrix3(t),this.setXY(n,Nc.x,Nc.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)hn.fromBufferAttribute(this,n),hn.applyMatrix3(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}applyMatrix4(t){for(let n=0,s=this.count;n<s;n++)hn.fromBufferAttribute(this,n),hn.applyMatrix4(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}applyNormalMatrix(t){for(let n=0,s=this.count;n<s;n++)hn.fromBufferAttribute(this,n),hn.applyNormalMatrix(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}transformDirection(t){for(let n=0,s=this.count;n<s;n++)hn.fromBufferAttribute(this,n),hn.transformDirection(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let s=this.array[t*this.itemSize+n];return this.normalized&&(s=Qo(s,this.array)),s}setComponent(t,n,s){return this.normalized&&(s=Qn(s,this.array)),this.array[t*this.itemSize+n]=s,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Qo(n,this.array)),n}setX(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Qo(n,this.array)),n}setY(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Qo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Qo(n,this.array)),n}setW(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,s){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),s=Qn(s,this.array)),this.array[t+0]=n,this.array[t+1]=s,this}setXYZ(t,n,s,l){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),s=Qn(s,this.array),l=Qn(l,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,n,s,l,c){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),s=Qn(s,this.array),l=Qn(l,this.array),c=Qn(c,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==R_&&(t.usage=this.usage),t}}class rx extends di{constructor(t,n,s){super(new Uint16Array(t),n,s)}}class ox extends di{constructor(t,n,s){super(new Uint32Array(t),n,s)}}class vn extends di{constructor(t,n,s){super(new Float32Array(t),n,s)}}let gE=0;const Ti=new an,nd=new Vn,zr=new $,ui=new fl,el=new fl,En=new $;class kn extends to{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gE++}),this.uuid=cl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ex(t)?ox:rx)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,s=0){this.groups.push({start:t,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new ce().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ti.makeRotationFromQuaternion(t),this.applyMatrix4(Ti),this}rotateX(t){return Ti.makeRotationX(t),this.applyMatrix4(Ti),this}rotateY(t){return Ti.makeRotationY(t),this.applyMatrix4(Ti),this}rotateZ(t){return Ti.makeRotationZ(t),this.applyMatrix4(Ti),this}translate(t,n,s){return Ti.makeTranslation(t,n,s),this.applyMatrix4(Ti),this}scale(t,n,s){return Ti.makeScale(t,n,s),this.applyMatrix4(Ti),this}lookAt(t){return nd.lookAt(t),nd.updateMatrix(),this.applyMatrix4(nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zr).negate(),this.translate(zr.x,zr.y,zr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new vn(s,3))}else{for(let s=0,l=n.count;s<l;s++){const c=t[s];n.setXYZ(s,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let s=0,l=n.length;s<l;s++){const c=n[s];ui.setFromBufferAttribute(c),this.morphTargetsRelative?(En.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(En),En.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(En)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(t){const s=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const d=n[c];el.setFromBufferAttribute(d),this.morphTargetsRelative?(En.addVectors(ui.min,el.min),ui.expandByPoint(En),En.addVectors(ui.max,el.max),ui.expandByPoint(En)):(ui.expandByPoint(el.min),ui.expandByPoint(el.max))}ui.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)En.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(En));if(n)for(let c=0,f=n.length;c<f;c++){const d=n[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)En.fromBufferAttribute(d,p),m&&(zr.fromBufferAttribute(t,p),En.add(zr)),l=Math.max(l,s.distanceToSquared(En))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new di(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),d=[],m=[];for(let H=0;H<s.count;H++)d[H]=new $,m[H]=new $;const p=new $,g=new $,_=new $,x=new Ce,M=new Ce,E=new Ce,T=new $,S=new $;function v(H,U,R){p.fromBufferAttribute(s,H),g.fromBufferAttribute(s,U),_.fromBufferAttribute(s,R),x.fromBufferAttribute(c,H),M.fromBufferAttribute(c,U),E.fromBufferAttribute(c,R),g.sub(p),_.sub(p),M.sub(x),E.sub(x);const F=1/(M.x*E.y-E.x*M.y);isFinite(F)&&(T.copy(g).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(F),S.copy(_).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(F),d[H].add(T),d[U].add(T),d[R].add(T),m[H].add(S),m[U].add(S),m[R].add(S))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let H=0,U=L.length;H<U;++H){const R=L[H],F=R.start,Q=R.count;for(let J=F,ct=F+Q;J<ct;J+=3)v(t.getX(J+0),t.getX(J+1),t.getX(J+2))}const D=new $,w=new $,W=new $,I=new $;function O(H){W.fromBufferAttribute(l,H),I.copy(W);const U=d[H];D.copy(U),D.sub(W.multiplyScalar(W.dot(U))).normalize(),w.crossVectors(I,U);const F=w.dot(m[H])<0?-1:1;f.setXYZW(H,D.x,D.y,D.z,F)}for(let H=0,U=L.length;H<U;++H){const R=L[H],F=R.start,Q=R.count;for(let J=F,ct=F+Q;J<ct;J+=3)O(t.getX(J+0)),O(t.getX(J+1)),O(t.getX(J+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new di(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let x=0,M=s.count;x<M;x++)s.setXYZ(x,0,0,0);const l=new $,c=new $,f=new $,d=new $,m=new $,p=new $,g=new $,_=new $;if(t)for(let x=0,M=t.count;x<M;x+=3){const E=t.getX(x+0),T=t.getX(x+1),S=t.getX(x+2);l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(s,E),m.fromBufferAttribute(s,T),p.fromBufferAttribute(s,S),d.add(g),m.add(g),p.add(g),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(T,m.x,m.y,m.z),s.setXYZ(S,p.x,p.y,p.z)}else for(let x=0,M=n.count;x<M;x+=3)l.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),s.setXYZ(x+0,g.x,g.y,g.z),s.setXYZ(x+1,g.x,g.y,g.z),s.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,s=t.count;n<s;n++)En.fromBufferAttribute(t,n),En.normalize(),t.setXYZ(n,En.x,En.y,En.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,_=d.normalized,x=new p.constructor(m.length*g);let M=0,E=0;for(let T=0,S=m.length;T<S;T++){d.isInterleavedBufferAttribute?M=m[T]*d.data.stride+d.offset:M=m[T]*g;for(let v=0;v<g;v++)x[E++]=p[M++]}return new di(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new kn,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);n.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,_=p.length;g<_;g++){const x=p[g],M=t(x,s);m.push(M)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const p=f[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,x=p.length;_<x;_++){const M=p[_];g.push(M.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(n));const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(n))}const c=t.morphAttributes;for(const p in c){const g=[],_=c[p];for(let x=0,M=_.length;x<M;x++)g.push(_[x].clone(n));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,g=f.length;p<g;p++){const _=f[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const X_=new an,Ds=new dp,Oc=new hl,q_=new $,Pc=new $,zc=new $,Bc=new $,id=new $,Ic=new $,W_=new $,Fc=new $;class Tn extends Vn{constructor(t=new kn,n=new Is){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,n){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;n.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Ic.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],_=c[m];g!==0&&(id.fromBufferAttribute(_,t),f?Ic.addScaledVector(id,g):Ic.addScaledVector(id.sub(n),g))}n.add(Ic)}return n}raycast(t,n){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Oc.copy(s.boundingSphere),Oc.applyMatrix4(c),Ds.copy(t.ray).recast(t.near),!(Oc.containsPoint(Ds.origin)===!1&&(Ds.intersectSphere(Oc,q_)===null||Ds.origin.distanceToSquared(q_)>(t.far-t.near)**2))&&(X_.copy(c).invert(),Ds.copy(t.ray).applyMatrix4(X_),!(s.boundingBox!==null&&Ds.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,n,Ds)))}_computeIntersections(t,n,s){let l;const c=this.geometry,f=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,x=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],L=Math.max(S.start,M.start),D=Math.min(d.count,Math.min(S.start+S.count,M.start+M.count));for(let w=L,W=D;w<W;w+=3){const I=d.getX(w),O=d.getX(w+1),H=d.getX(w+2);l=Hc(this,v,t,s,p,g,_,I,O,H),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(d.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const L=d.getX(S),D=d.getX(S+1),w=d.getX(S+2);l=Hc(this,f,t,s,p,g,_,L,D,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],L=Math.max(S.start,M.start),D=Math.min(m.count,Math.min(S.start+S.count,M.start+M.count));for(let w=L,W=D;w<W;w+=3){const I=w,O=w+1,H=w+2;l=Hc(this,v,t,s,p,g,_,I,O,H),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(m.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const L=S,D=S+1,w=S+2;l=Hc(this,f,t,s,p,g,_,L,D,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}}}function _E(r,t,n,s,l,c,f,d){let m;if(t.side===ei?m=s.intersectTriangle(f,c,l,!0,d):m=s.intersectTriangle(l,c,f,t.side===ls,d),m===null)return null;Fc.copy(d),Fc.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(Fc);return p<n.near||p>n.far?null:{distance:p,point:Fc.clone(),object:r}}function Hc(r,t,n,s,l,c,f,d,m,p){r.getVertexPosition(d,Pc),r.getVertexPosition(m,zc),r.getVertexPosition(p,Bc);const g=_E(r,t,n,s,Pc,zc,Bc,W_);if(g){const _=new $;Bi.getBarycoord(W_,Pc,zc,Bc,_),l&&(g.uv=Bi.getInterpolatedAttribute(l,d,m,p,_,new Ce)),c&&(g.uv1=Bi.getInterpolatedAttribute(c,d,m,p,_,new Ce)),f&&(g.normal=Bi.getInterpolatedAttribute(f,d,m,p,_,new $),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:m,c:p,normal:new $,materialIndex:0};Bi.getNormal(Pc,zc,Bc,x.normal),g.face=x,g.barycoord=_}return g}class Ne extends kn{constructor(t=1,n=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],g=[],_=[];let x=0,M=0;E("z","y","x",-1,-1,s,n,t,f,c,0),E("z","y","x",1,-1,s,n,-t,f,c,1),E("x","z","y",1,1,t,s,n,l,f,2),E("x","z","y",1,-1,t,s,-n,l,f,3),E("x","y","z",1,-1,t,n,s,l,c,4),E("x","y","z",-1,-1,t,n,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new vn(p,3)),this.setAttribute("normal",new vn(g,3)),this.setAttribute("uv",new vn(_,2));function E(T,S,v,L,D,w,W,I,O,H,U){const R=w/O,F=W/H,Q=w/2,J=W/2,ct=I/2,ut=O+1,P=H+1;let j=0,Z=0;const St=new $;for(let Tt=0;Tt<P;Tt++){const z=Tt*F-J;for(let st=0;st<ut;st++){const yt=st*R-Q;St[T]=yt*L,St[S]=z*D,St[v]=ct,p.push(St.x,St.y,St.z),St[T]=0,St[S]=0,St[v]=I>0?1:-1,g.push(St.x,St.y,St.z),_.push(st/O),_.push(1-Tt/H),j+=1}}for(let Tt=0;Tt<H;Tt++)for(let z=0;z<O;z++){const st=x+z+ut*Tt,yt=x+z+ut*(Tt+1),K=x+(z+1)+ut*(Tt+1),ht=x+(z+1)+ut*Tt;m.push(st,yt,ht),m.push(yt,K,ht),Z+=6}d.addGroup(M,Z,U),M+=Z,x+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qr(r){const t={};for(const n in r){t[n]={};for(const s in r[n]){const l=r[n][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][s]=null):t[n][s]=l.clone():Array.isArray(l)?t[n][s]=l.slice():t[n][s]=l}}return t}function Hn(r){const t={};for(let n=0;n<r.length;n++){const s=Qr(r[n]);for(const l in s)t[l]=s[l]}return t}function vE(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function lx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ae.workingColorSpace}const pp={clone:Qr,merge:Hn};var xE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hi extends eo{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xE,this.fragmentShader=yE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qr(t.uniforms),this.uniformsGroups=vE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class cx extends Vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new an,this.projectionMatrix=new an,this.projectionMatrixInverse=new an,this.coordinateSystem=Ea}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ss=new $,Y_=new Ce,j_=new Ce;class Ai extends cx{constructor(t=50,n=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=ep*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Bh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ep*2*Math.atan(Math.tan(Bh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,s){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ss.x,ss.y).multiplyScalar(-t/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ss.x,ss.y).multiplyScalar(-t/ss.z)}getViewSize(t,n){return this.getViewBounds(t,Y_,j_),n.subVectors(j_,Y_)}setViewOffset(t,n,s,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Bh*.5*this.fov)/this.zoom,s=2*n,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,n-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Br=-90,Ir=1;class SE extends Vn{constructor(t,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ai(Br,Ir,t,n);l.layers=this.layers,this.add(l);const c=new Ai(Br,Ir,t,n);c.layers=this.layers,this.add(c);const f=new Ai(Br,Ir,t,n);f.layers=this.layers,this.add(f);const d=new Ai(Br,Ir,t,n);d.layers=this.layers,this.add(d);const m=new Ai(Br,Ir,t,n);m.layers=this.layers,this.add(m);const p=new Ai(Br,Ir,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[s,l,c,f,d,m]=n;for(const p of n)this.remove(p);if(t===Ea)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===ou)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,m,p,g]=this.children,_=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const T=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(n,c),t.setRenderTarget(s,1,l),t.render(n,f),t.setRenderTarget(s,2,l),t.render(n,d),t.setRenderTarget(s,3,l),t.render(n,m),t.setRenderTarget(s,4,l),t.render(n,p),s.texture.generateMipmaps=T,t.setRenderTarget(s,5,l),t.render(n,g),t.setRenderTarget(_,x,M),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class ux extends Gn{constructor(t,n,s,l,c,f,d,m,p,g){t=t!==void 0?t:[],n=n!==void 0?n:Yr,super(t,n,s,l,c,f,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ME extends cs{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new ux(l,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ji}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Ne(5,5,5),c=new Hi({name:"CubemapFromEquirect",uniforms:Qr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ei,blending:Ta});c.uniforms.tEquirect.value=n;const f=new Tn(l,c),d=n.minFilter;return n.minFilter===Vs&&(n.minFilter=ji),new SE(1,10,this).update(t,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,n,s,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,s,l);t.setRenderTarget(c)}}const ad=new $,EE=new $,TE=new ce;class Ps{constructor(t=new $(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,s,l){return this.normal.set(t,n,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,s){const l=ad.subVectors(s,n).cross(EE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const s=t.delta(ad),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return n<0&&s>0||s<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const s=n||TE.getNormalMatrix(t),l=this.coplanarPoint(ad).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Us=new hl,Gc=new $;class fx{constructor(t=new Ps,n=new Ps,s=new Ps,l=new Ps,c=new Ps,f=new Ps){this.planes=[t,n,s,l,c,f]}set(t,n,s,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(n),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,n=Ea){const s=this.planes,l=t.elements,c=l[0],f=l[1],d=l[2],m=l[3],p=l[4],g=l[5],_=l[6],x=l[7],M=l[8],E=l[9],T=l[10],S=l[11],v=l[12],L=l[13],D=l[14],w=l[15];if(s[0].setComponents(m-c,x-p,S-M,w-v).normalize(),s[1].setComponents(m+c,x+p,S+M,w+v).normalize(),s[2].setComponents(m+f,x+g,S+E,w+L).normalize(),s[3].setComponents(m-f,x-g,S-E,w-L).normalize(),s[4].setComponents(m-d,x-_,S-T,w-D).normalize(),n===Ea)s[5].setComponents(m+d,x+_,S+T,w+D).normalize();else if(n===ou)s[5].setComponents(d,_,T,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Us.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Us)}intersectsSprite(t){return Us.center.set(0,0,0),Us.radius=.7071067811865476,Us.applyMatrix4(t.matrixWorld),this.intersectsSphere(Us)}intersectsSphere(t){const n=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let s=0;s<6;s++){const l=n[s];if(Gc.x=l.normal.x>0?t.max.x:t.min.x,Gc.y=l.normal.y>0?t.max.y:t.min.y,Gc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hx(){let r=null,t=!1,n=null,s=null;function l(c,f){n(c,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function bE(r){const t=new WeakMap;function n(d,m){const p=d.array,g=d.usage,_=p.byteLength,x=r.createBuffer();r.bindBuffer(m,x),r.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=r.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=r.SHORT;else if(p instanceof Uint32Array)M=r.UNSIGNED_INT;else if(p instanceof Int32Array)M=r.INT;else if(p instanceof Int8Array)M=r.BYTE;else if(p instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function s(d,m,p){const g=m.array,_=m.updateRanges;if(r.bindBuffer(p,d),_.length===0)r.bufferSubData(p,0,g);else{_.sort((M,E)=>M.start-E.start);let x=0;for(let M=1;M<_.length;M++){const E=_[x],T=_[M];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++x,_[x]=T)}_.length=x+1;for(let M=0,E=_.length;M<E;M++){const T=_[M];r.bufferSubData(p,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function f(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:f}}class mu extends kn{constructor(t=1,n=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:s,heightSegments:l};const c=t/2,f=n/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,_=t/d,x=n/m,M=[],E=[],T=[],S=[];for(let v=0;v<g;v++){const L=v*x-f;for(let D=0;D<p;D++){const w=D*_-c;E.push(w,-L,0),T.push(0,0,1),S.push(D/d),S.push(1-v/m)}}for(let v=0;v<m;v++)for(let L=0;L<d;L++){const D=L+p*v,w=L+p*(v+1),W=L+1+p*(v+1),I=L+1+p*v;M.push(D,w,I),M.push(w,W,I)}this.setIndex(M),this.setAttribute("position",new vn(E,3)),this.setAttribute("normal",new vn(T,3)),this.setAttribute("uv",new vn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mu(t.width,t.height,t.widthSegments,t.heightSegments)}}var AE=`#ifdef USE_ALPHAHASH
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
#endif`,HE=`#ifdef USE_BUMPMAP
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
#endif`,GE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,H1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,G1=`#ifdef USE_MORPHTARGETS
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
}`,HT=`uniform vec3 diffuse;
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
}`,GT=`#define LAMBERT
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
}`,ue={alphahash_fragment:AE,alphahash_pars_fragment:RE,alphamap_fragment:wE,alphamap_pars_fragment:CE,alphatest_fragment:DE,alphatest_pars_fragment:UE,aomap_fragment:LE,aomap_pars_fragment:NE,batching_pars_vertex:OE,batching_vertex:PE,begin_vertex:zE,beginnormal_vertex:BE,bsdfs:IE,iridescence_fragment:FE,bumpmap_pars_fragment:HE,clipping_planes_fragment:GE,clipping_planes_pars_fragment:VE,clipping_planes_pars_vertex:kE,clipping_planes_vertex:XE,color_fragment:qE,color_pars_fragment:WE,color_pars_vertex:YE,color_vertex:jE,common:ZE,cube_uv_reflection_fragment:KE,defaultnormal_vertex:QE,displacementmap_pars_vertex:JE,displacementmap_vertex:$E,emissivemap_fragment:t1,emissivemap_pars_fragment:e1,colorspace_fragment:n1,colorspace_pars_fragment:i1,envmap_fragment:a1,envmap_common_pars_fragment:s1,envmap_pars_fragment:r1,envmap_pars_vertex:o1,envmap_physical_pars_fragment:v1,envmap_vertex:l1,fog_vertex:c1,fog_pars_vertex:u1,fog_fragment:f1,fog_pars_fragment:h1,gradientmap_pars_fragment:d1,lightmap_pars_fragment:p1,lights_lambert_fragment:m1,lights_lambert_pars_fragment:g1,lights_pars_begin:_1,lights_toon_fragment:x1,lights_toon_pars_fragment:y1,lights_phong_fragment:S1,lights_phong_pars_fragment:M1,lights_physical_fragment:E1,lights_physical_pars_fragment:T1,lights_fragment_begin:b1,lights_fragment_maps:A1,lights_fragment_end:R1,logdepthbuf_fragment:w1,logdepthbuf_pars_fragment:C1,logdepthbuf_pars_vertex:D1,logdepthbuf_vertex:U1,map_fragment:L1,map_pars_fragment:N1,map_particle_fragment:O1,map_particle_pars_fragment:P1,metalnessmap_fragment:z1,metalnessmap_pars_fragment:B1,morphinstance_vertex:I1,morphcolor_vertex:F1,morphnormal_vertex:H1,morphtarget_pars_vertex:G1,morphtarget_vertex:V1,normal_fragment_begin:k1,normal_fragment_maps:X1,normal_pars_fragment:q1,normal_pars_vertex:W1,normal_vertex:Y1,normalmap_pars_fragment:j1,clearcoat_normal_fragment_begin:Z1,clearcoat_normal_fragment_maps:K1,clearcoat_pars_fragment:Q1,iridescence_pars_fragment:J1,opaque_fragment:$1,packing:tT,premultiplied_alpha_fragment:eT,project_vertex:nT,dithering_fragment:iT,dithering_pars_fragment:aT,roughnessmap_fragment:sT,roughnessmap_pars_fragment:rT,shadowmap_pars_fragment:oT,shadowmap_pars_vertex:lT,shadowmap_vertex:cT,shadowmask_pars_fragment:uT,skinbase_vertex:fT,skinning_pars_vertex:hT,skinning_vertex:dT,skinnormal_vertex:pT,specularmap_fragment:mT,specularmap_pars_fragment:gT,tonemapping_fragment:_T,tonemapping_pars_fragment:vT,transmission_fragment:xT,transmission_pars_fragment:yT,uv_pars_fragment:ST,uv_pars_vertex:MT,uv_vertex:ET,worldpos_vertex:TT,background_vert:bT,background_frag:AT,backgroundCube_vert:RT,backgroundCube_frag:wT,cube_vert:CT,cube_frag:DT,depth_vert:UT,depth_frag:LT,distanceRGBA_vert:NT,distanceRGBA_frag:OT,equirect_vert:PT,equirect_frag:zT,linedashed_vert:BT,linedashed_frag:IT,meshbasic_vert:FT,meshbasic_frag:HT,meshlambert_vert:GT,meshlambert_frag:VT,meshmatcap_vert:kT,meshmatcap_frag:XT,meshnormal_vert:qT,meshnormal_frag:WT,meshphong_vert:YT,meshphong_frag:jT,meshphysical_vert:ZT,meshphysical_frag:KT,meshtoon_vert:QT,meshtoon_frag:JT,points_vert:$T,points_frag:tb,shadow_vert:eb,shadow_frag:nb,sprite_vert:ib,sprite_frag:ab},Nt={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},Yi={basic:{uniforms:Hn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:ue.meshbasic_vert,fragmentShader:ue.meshbasic_frag},lambert:{uniforms:Hn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshlambert_vert,fragmentShader:ue.meshlambert_frag},phong:{uniforms:Hn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:ue.meshphong_vert,fragmentShader:ue.meshphong_frag},standard:{uniforms:Hn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag},toon:{uniforms:Hn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshtoon_vert,fragmentShader:ue.meshtoon_frag},matcap:{uniforms:Hn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:ue.meshmatcap_vert,fragmentShader:ue.meshmatcap_frag},points:{uniforms:Hn([Nt.points,Nt.fog]),vertexShader:ue.points_vert,fragmentShader:ue.points_frag},dashed:{uniforms:Hn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ue.linedashed_vert,fragmentShader:ue.linedashed_frag},depth:{uniforms:Hn([Nt.common,Nt.displacementmap]),vertexShader:ue.depth_vert,fragmentShader:ue.depth_frag},normal:{uniforms:Hn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:ue.meshnormal_vert,fragmentShader:ue.meshnormal_frag},sprite:{uniforms:Hn([Nt.sprite,Nt.fog]),vertexShader:ue.sprite_vert,fragmentShader:ue.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ue.background_vert,fragmentShader:ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:ue.backgroundCube_vert,fragmentShader:ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ue.cube_vert,fragmentShader:ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ue.equirect_vert,fragmentShader:ue.equirect_frag},distanceRGBA:{uniforms:Hn([Nt.common,Nt.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ue.distanceRGBA_vert,fragmentShader:ue.distanceRGBA_frag},shadow:{uniforms:Hn([Nt.lights,Nt.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:ue.shadow_vert,fragmentShader:ue.shadow_frag}};Yi.physical={uniforms:Hn([Yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag};const Vc={r:0,b:0,g:0},Ls=new Ra,sb=new an;function rb(r,t,n,s,l,c,f){const d=new fe(0);let m=c===!0?0:1,p,g,_=null,x=0,M=null;function E(L){let D=L.isScene===!0?L.background:null;return D&&D.isTexture&&(D=(L.backgroundBlurriness>0?n:t).get(D)),D}function T(L){let D=!1;const w=E(L);w===null?v(d,m):w&&w.isColor&&(v(w,1),D=!0);const W=r.xr.getEnvironmentBlendMode();W==="additive"?s.buffers.color.setClear(0,0,0,1,f):W==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||D)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(L,D){const w=E(D);w&&(w.isCubeTexture||w.mapping===du)?(g===void 0&&(g=new Tn(new Ne(1,1,1),new Hi({name:"BackgroundCubeMaterial",uniforms:Qr(Yi.backgroundCube.uniforms),vertexShader:Yi.backgroundCube.vertexShader,fragmentShader:Yi.backgroundCube.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(W,I,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Ls.copy(D.backgroundRotation),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),g.material.uniforms.envMap.value=w,g.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(sb.makeRotationFromEuler(Ls)),g.material.toneMapped=Ae.getTransfer(w.colorSpace)!==Fe,(_!==w||x!==w.version||M!==r.toneMapping)&&(g.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),g.layers.enableAll(),L.unshift(g,g.geometry,g.material,0,0,null)):w&&w.isTexture&&(p===void 0&&(p=new Tn(new mu(2,2),new Hi({name:"BackgroundMaterial",uniforms:Qr(Yi.background.uniforms),vertexShader:Yi.background.vertexShader,fragmentShader:Yi.background.fragmentShader,side:ls,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=w,p.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,p.material.toneMapped=Ae.getTransfer(w.colorSpace)!==Fe,w.matrixAutoUpdate===!0&&w.updateMatrix(),p.material.uniforms.uvTransform.value.copy(w.matrix),(_!==w||x!==w.version||M!==r.toneMapping)&&(p.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null))}function v(L,D){L.getRGB(Vc,lx(r)),s.buffers.color.setClear(Vc.r,Vc.g,Vc.b,D,f)}return{getClearColor:function(){return d},setClearColor:function(L,D=1){d.set(L),m=D,v(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(L){m=L,v(d,m)},render:T,addToRenderList:S}}function ob(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,f=!1;function d(R,F,Q,J,ct){let ut=!1;const P=_(J,Q,F);c!==P&&(c=P,p(c.object)),ut=M(R,J,Q,ct),ut&&E(R,J,Q,ct),ct!==null&&t.update(ct,r.ELEMENT_ARRAY_BUFFER),(ut||f)&&(f=!1,w(R,F,Q,J),ct!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ct).buffer))}function m(){return r.createVertexArray()}function p(R){return r.bindVertexArray(R)}function g(R){return r.deleteVertexArray(R)}function _(R,F,Q){const J=Q.wireframe===!0;let ct=s[R.id];ct===void 0&&(ct={},s[R.id]=ct);let ut=ct[F.id];ut===void 0&&(ut={},ct[F.id]=ut);let P=ut[J];return P===void 0&&(P=x(m()),ut[J]=P),P}function x(R){const F=[],Q=[],J=[];for(let ct=0;ct<n;ct++)F[ct]=0,Q[ct]=0,J[ct]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Q,attributeDivisors:J,object:R,attributes:{},index:null}}function M(R,F,Q,J){const ct=c.attributes,ut=F.attributes;let P=0;const j=Q.getAttributes();for(const Z in j)if(j[Z].location>=0){const Tt=ct[Z];let z=ut[Z];if(z===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(z=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(z=R.instanceColor)),Tt===void 0||Tt.attribute!==z||z&&Tt.data!==z.data)return!0;P++}return c.attributesNum!==P||c.index!==J}function E(R,F,Q,J){const ct={},ut=F.attributes;let P=0;const j=Q.getAttributes();for(const Z in j)if(j[Z].location>=0){let Tt=ut[Z];Tt===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(Tt=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(Tt=R.instanceColor));const z={};z.attribute=Tt,Tt&&Tt.data&&(z.data=Tt.data),ct[Z]=z,P++}c.attributes=ct,c.attributesNum=P,c.index=J}function T(){const R=c.newAttributes;for(let F=0,Q=R.length;F<Q;F++)R[F]=0}function S(R){v(R,0)}function v(R,F){const Q=c.newAttributes,J=c.enabledAttributes,ct=c.attributeDivisors;Q[R]=1,J[R]===0&&(r.enableVertexAttribArray(R),J[R]=1),ct[R]!==F&&(r.vertexAttribDivisor(R,F),ct[R]=F)}function L(){const R=c.newAttributes,F=c.enabledAttributes;for(let Q=0,J=F.length;Q<J;Q++)F[Q]!==R[Q]&&(r.disableVertexAttribArray(Q),F[Q]=0)}function D(R,F,Q,J,ct,ut,P){P===!0?r.vertexAttribIPointer(R,F,Q,ct,ut):r.vertexAttribPointer(R,F,Q,J,ct,ut)}function w(R,F,Q,J){T();const ct=J.attributes,ut=Q.getAttributes(),P=F.defaultAttributeValues;for(const j in ut){const Z=ut[j];if(Z.location>=0){let St=ct[j];if(St===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(St=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(St=R.instanceColor)),St!==void 0){const Tt=St.normalized,z=St.itemSize,st=t.get(St);if(st===void 0)continue;const yt=st.buffer,K=st.type,ht=st.bytesPerElement,Et=K===r.INT||K===r.UNSIGNED_INT||St.gpuType===op;if(St.isInterleavedBufferAttribute){const xt=St.data,Vt=xt.stride,Gt=St.offset;if(xt.isInstancedInterleavedBuffer){for(let ae=0;ae<Z.locationSize;ae++)v(Z.location+ae,xt.meshPerAttribute);R.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let ae=0;ae<Z.locationSize;ae++)S(Z.location+ae);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let ae=0;ae<Z.locationSize;ae++)D(Z.location+ae,z/Z.locationSize,K,Tt,Vt*ht,(Gt+z/Z.locationSize*ae)*ht,Et)}else{if(St.isInstancedBufferAttribute){for(let xt=0;xt<Z.locationSize;xt++)v(Z.location+xt,St.meshPerAttribute);R.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let xt=0;xt<Z.locationSize;xt++)S(Z.location+xt);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let xt=0;xt<Z.locationSize;xt++)D(Z.location+xt,z/Z.locationSize,K,Tt,z*ht,z/Z.locationSize*xt*ht,Et)}}else if(P!==void 0){const Tt=P[j];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(Z.location,Tt);break;case 3:r.vertexAttrib3fv(Z.location,Tt);break;case 4:r.vertexAttrib4fv(Z.location,Tt);break;default:r.vertexAttrib1fv(Z.location,Tt)}}}}L()}function W(){H();for(const R in s){const F=s[R];for(const Q in F){const J=F[Q];for(const ct in J)g(J[ct].object),delete J[ct];delete F[Q]}delete s[R]}}function I(R){if(s[R.id]===void 0)return;const F=s[R.id];for(const Q in F){const J=F[Q];for(const ct in J)g(J[ct].object),delete J[ct];delete F[Q]}delete s[R.id]}function O(R){for(const F in s){const Q=s[F];if(Q[R.id]===void 0)continue;const J=Q[R.id];for(const ct in J)g(J[ct].object),delete J[ct];delete Q[R.id]}}function H(){U(),f=!0,c!==l&&(c=l,p(c.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:H,resetDefaultState:U,dispose:W,releaseStatesOfGeometry:I,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:S,disableUnusedAttributes:L}}function lb(r,t,n){let s;function l(p){s=p}function c(p,g){r.drawArrays(s,p,g),n.update(g,s,1)}function f(p,g,_){_!==0&&(r.drawArraysInstanced(s,p,g,_),n.update(g,s,_))}function d(p,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,_);let M=0;for(let E=0;E<_;E++)M+=g[E];n.update(M,s,1)}function m(p,g,_,x){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<p.length;E++)f(p[E],g[E],x[E]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,g,0,x,0,_);let E=0;for(let T=0;T<_;T++)E+=g[T]*x[T];n.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function cb(r,t,n,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const O=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==Ii&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const H=O===Jr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(O!==Aa&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==Ma&&!H)}function m(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),D=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),W=E>0,I=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:S,maxAttributes:v,maxVertexUniforms:L,maxVaryings:D,maxFragmentUniforms:w,vertexTextures:W,maxSamples:I}}function ub(r){const t=this;let n=null,s=0,l=!1,c=!1;const f=new Ps,d=new ce,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const M=_.length!==0||x||s!==0||l;return l=x,s=_.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,x){n=g(_,x,0)},this.setState=function(_,x,M){const E=_.clippingPlanes,T=_.clipIntersection,S=_.clipShadows,v=r.get(_);if(!l||E===null||E.length===0||c&&!S)c?g(null):p();else{const L=c?0:s,D=L*4;let w=v.clippingState||null;m.value=w,w=g(E,x,D,M);for(let W=0;W!==D;++W)w[W]=n[W];v.clippingState=w,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=L}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(_,x,M,E){const T=_!==null?_.length:0;let S=null;if(T!==0){if(S=m.value,E!==!0||S===null){const v=M+T*4,L=x.matrixWorldInverse;d.getNormalMatrix(L),(S===null||S.length<v)&&(S=new Float32Array(v));for(let D=0,w=M;D!==T;++D,w+=4)f.copy(_[D]).applyMatrix4(L,d),f.normal.toArray(S,w),S[w+3]=f.constant}m.value=S,m.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function fb(r){let t=new WeakMap;function n(f,d){return d===Ad?f.mapping=Yr:d===Rd&&(f.mapping=jr),f}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===Ad||d===Rd)if(t.has(f)){const m=t.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new ME(m.height);return p.fromEquirectangularTexture(r,f),t.set(f,p),f.addEventListener("dispose",l),n(p.texture,f.mapping)}else return null}}return f}function l(f){const d=f.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}class dx extends cx{constructor(t=-1,n=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,d=l+n,m=l-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Vr=4,Z_=[.125,.215,.35,.446,.526,.582],Fs=20,sd=new dx,K_=new fe;let rd=null,od=0,ld=0,cd=!1;const zs=(1+Math.sqrt(5))/2,Fr=1/zs,Q_=[new $(-zs,Fr,0),new $(zs,Fr,0),new $(-Fr,0,zs),new $(Fr,0,zs),new $(0,zs,-Fr),new $(0,zs,Fr),new $(-1,1,-1),new $(1,1,-1),new $(-1,1,1),new $(1,1,1)];class J_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,s=.1,l=100){rd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ld=this._renderer.getActiveMipmapLevel(),cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ev(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(rd,od,ld),this._renderer.xr.enabled=cd,t.scissorTest=!1,kc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Yr||t.mapping===jr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ld=this._renderer.getActiveMipmapLevel(),cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=n||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:ji,minFilter:ji,generateMipmaps:!1,type:Jr,format:Ii,colorSpace:$r,depthBuffer:!1},l=$_(t,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$_(t,n,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hb(c)),this._blurMaterial=db(c,t,n)}return l}_compileMaterial(t){const n=new Tn(this._lodPlanes[0],t);this._renderer.compile(n,sd)}_sceneToCubeUV(t,n,s,l){const d=new Ai(90,1,n,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(K_),g.toneMapping=os,g.autoClear=!1;const M=new Is({name:"PMREM.Background",side:ei,depthWrite:!1,depthTest:!1}),E=new Tn(new Ne,M);let T=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,T=!0):(M.color.copy(K_),T=!0);for(let v=0;v<6;v++){const L=v%3;L===0?(d.up.set(0,m[v],0),d.lookAt(p[v],0,0)):L===1?(d.up.set(0,0,m[v]),d.lookAt(0,p[v],0)):(d.up.set(0,m[v],0),d.lookAt(0,0,p[v]));const D=this._cubeSize;kc(l,L*D,v>2?D:0,D,D),g.setRenderTarget(l),T&&g.render(E,d),g.render(t,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=_,t.background=S}_textureToCubeUV(t,n){const s=this._renderer,l=t.mapping===Yr||t.mapping===jr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=ev()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new Tn(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;kc(n,0,0,3*m,2*m),s.setRenderTarget(n),s.render(f,sd)}_applyPMREM(t){const n=this._renderer,s=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=Q_[(l-c-1)%Q_.length];this._blur(t,c-1,c,f,d)}n.autoClear=s}_blur(t,n,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,s,l,"latitudinal",c),this._halfBlur(f,t,s,s,l,"longitudinal",c)}_halfBlur(t,n,s,l,c,f,d){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Tn(this._lodPlanes[l],p),x=p.uniforms,M=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Fs-1),T=c/E,S=isFinite(c)?1+Math.floor(g*T):Fs;S>Fs&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Fs}`);const v=[];let L=0;for(let O=0;O<Fs;++O){const H=O/T,U=Math.exp(-H*H/2);v.push(U),O===0?L+=U:O<S&&(L+=2*U)}for(let O=0;O<v.length;O++)v[O]=v[O]/L;x.envMap.value=t.texture,x.samples.value=S,x.weights.value=v,x.latitudinal.value=f==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:D}=this;x.dTheta.value=E,x.mipInt.value=D-s;const w=this._sizeLods[l],W=3*w*(l>D-Vr?l-D+Vr:0),I=4*(this._cubeSize-w);kc(n,W,I,3*w,2*w),m.setRenderTarget(n),m.render(_,sd)}}function hb(r){const t=[],n=[],s=[];let l=r;const c=r-Vr+1+Z_.length;for(let f=0;f<c;f++){const d=Math.pow(2,l);n.push(d);let m=1/d;f>r-Vr?m=Z_[f-r+Vr-1]:f===0&&(m=0),s.push(m);const p=1/(d-2),g=-p,_=1+p,x=[g,g,_,g,_,_,g,g,_,_,g,_],M=6,E=6,T=3,S=2,v=1,L=new Float32Array(T*E*M),D=new Float32Array(S*E*M),w=new Float32Array(v*E*M);for(let I=0;I<M;I++){const O=I%3*2/3-1,H=I>2?0:-1,U=[O,H,0,O+2/3,H,0,O+2/3,H+1,0,O,H,0,O+2/3,H+1,0,O,H+1,0];L.set(U,T*E*I),D.set(x,S*E*I);const R=[I,I,I,I,I,I];w.set(R,v*E*I)}const W=new kn;W.setAttribute("position",new di(L,T)),W.setAttribute("uv",new di(D,S)),W.setAttribute("faceIndex",new di(w,v)),t.push(W),l>Vr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:s}}function $_(r,t,n){const s=new cs(r,t,n);return s.texture.mapping=du,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function kc(r,t,n,s,l){r.viewport.set(t,n,s,l),r.scissor.set(t,n,s,l)}function db(r,t,n){const s=new Float32Array(Fs),l=new $(0,1,0);return new Hi({name:"SphericalGaussianBlur",defines:{n:Fs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:mp(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function tv(){return new Hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mp(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function ev(){return new Hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function mp(){return`

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
	`}function pb(r){let t=new WeakMap,n=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===Ad||m===Rd,g=m===Yr||m===jr;if(p||g){let _=t.get(d);const x=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new J_(r)),_=p?n.fromEquirectangular(d,_):n.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(n===null&&(n=new J_(r)),_=p?n.fromEquirectangular(d):n.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function mb(r){const t={};function n(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return n(s)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(s){const l=n(s);return l===null&&sl("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function gb(r,t,n,s){const l={},c=new WeakMap;function f(_){const x=_.target;x.index!==null&&t.remove(x.index);for(const E in x.attributes)t.remove(x.attributes[E]);for(const E in x.morphAttributes){const T=x.morphAttributes[E];for(let S=0,v=T.length;S<v;S++)t.remove(T[S])}x.removeEventListener("dispose",f),delete l[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(_,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,n.memory.geometries++),x}function m(_){const x=_.attributes;for(const E in x)t.update(x[E],r.ARRAY_BUFFER);const M=_.morphAttributes;for(const E in M){const T=M[E];for(let S=0,v=T.length;S<v;S++)t.update(T[S],r.ARRAY_BUFFER)}}function p(_){const x=[],M=_.index,E=_.attributes.position;let T=0;if(M!==null){const L=M.array;T=M.version;for(let D=0,w=L.length;D<w;D+=3){const W=L[D+0],I=L[D+1],O=L[D+2];x.push(W,I,I,O,O,W)}}else if(E!==void 0){const L=E.array;T=E.version;for(let D=0,w=L.length/3-1;D<w;D+=3){const W=D+0,I=D+1,O=D+2;x.push(W,I,I,O,O,W)}}else return;const S=new(ex(x)?ox:rx)(x,1);S.version=T;const v=c.get(_);v&&t.remove(v),c.set(_,S)}function g(_){const x=c.get(_);if(x){const M=_.index;M!==null&&x.version<M.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:g}}function _b(r,t,n){let s;function l(x){s=x}let c,f;function d(x){c=x.type,f=x.bytesPerElement}function m(x,M){r.drawElements(s,M,c,x*f),n.update(M,s,1)}function p(x,M,E){E!==0&&(r.drawElementsInstanced(s,M,c,x*f,E),n.update(M,s,E))}function g(x,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,x,0,E);let S=0;for(let v=0;v<E;v++)S+=M[v];n.update(S,s,1)}function _(x,M,E,T){if(E===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let v=0;v<x.length;v++)p(x[v]/f,M[v],T[v]);else{S.multiDrawElementsInstancedWEBGL(s,M,0,c,x,0,T,0,E);let v=0;for(let L=0;L<E;L++)v+=M[L]*T[L];n.update(v,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function vb(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,d){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=d*(c/3);break;case r.LINES:n.lines+=d*(c/2);break;case r.LINE_STRIP:n.lines+=d*(c-1);break;case r.LINE_LOOP:n.lines+=d*c;break;case r.POINTS:n.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:s}}function xb(r,t,n){const s=new WeakMap,l=new on;function c(f,d,m){const p=f.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let x=s.get(d);if(x===void 0||x.count!==_){let R=function(){H.dispose(),s.delete(d),d.removeEventListener("dispose",R)};var M=R;x!==void 0&&x.texture.dispose();const E=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],L=d.morphAttributes.normal||[],D=d.morphAttributes.color||[];let w=0;E===!0&&(w=1),T===!0&&(w=2),S===!0&&(w=3);let W=d.attributes.position.count*w,I=1;W>t.maxTextureSize&&(I=Math.ceil(W/t.maxTextureSize),W=t.maxTextureSize);const O=new Float32Array(W*I*4*_),H=new ix(O,W,I,_);H.type=Ma,H.needsUpdate=!0;const U=w*4;for(let F=0;F<_;F++){const Q=v[F],J=L[F],ct=D[F],ut=W*I*4*F;for(let P=0;P<Q.count;P++){const j=P*U;E===!0&&(l.fromBufferAttribute(Q,P),O[ut+j+0]=l.x,O[ut+j+1]=l.y,O[ut+j+2]=l.z,O[ut+j+3]=0),T===!0&&(l.fromBufferAttribute(J,P),O[ut+j+4]=l.x,O[ut+j+5]=l.y,O[ut+j+6]=l.z,O[ut+j+7]=0),S===!0&&(l.fromBufferAttribute(ct,P),O[ut+j+8]=l.x,O[ut+j+9]=l.y,O[ut+j+10]=l.z,O[ut+j+11]=ct.itemSize===4?l.w:1)}}x={count:_,texture:H,size:new Ce(W,I)},s.set(d,x),d.addEventListener("dispose",R)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let E=0;for(let S=0;S<p.length;S++)E+=p[S];const T=d.morphTargetsRelative?1:1-E;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function yb(r,t,n,s){let l=new WeakMap;function c(m){const p=s.render.frame,g=m.geometry,_=t.get(m,g);if(l.get(_)!==p&&(t.update(_),l.set(_,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(n.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;l.get(x)!==p&&(x.update(),l.set(x,p))}return _}function f(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:c,dispose:f}}class px extends Gn{constructor(t,n,s,l,c,f,d,m,p,g=Xr){if(g!==Xr&&g!==Kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===Xr&&(s=qs),s===void 0&&g===Kr&&(s=Zr),super(null,l,c,f,d,m,g,s,p),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=d!==void 0?d:Fi,this.minFilter=m!==void 0?m:Fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const mx=new Gn,nv=new px(1,1),gx=new ix,_x=new oE,vx=new ux,iv=[],av=[],sv=new Float32Array(16),rv=new Float32Array(9),ov=new Float32Array(4);function no(r,t,n){const s=r[0];if(s<=0||s>0)return r;const l=t*n;let c=iv[l];if(c===void 0&&(c=new Float32Array(l),iv[l]=c),t!==0){s.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=n,r[f].toArray(c,d)}return c}function xn(r,t){if(r.length!==t.length)return!1;for(let n=0,s=r.length;n<s;n++)if(r[n]!==t[n])return!1;return!0}function yn(r,t){for(let n=0,s=t.length;n<s;n++)r[n]=t[n]}function gu(r,t){let n=av[t];n===void 0&&(n=new Int32Array(t),av[t]=n);for(let s=0;s!==t;++s)n[s]=r.allocateTextureUnit();return n}function Sb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function Mb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;r.uniform2fv(this.addr,t),yn(n,t)}}function Eb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(xn(n,t))return;r.uniform3fv(this.addr,t),yn(n,t)}}function Tb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;r.uniform4fv(this.addr,t),yn(n,t)}}function bb(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(xn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),yn(n,t)}else{if(xn(n,s))return;ov.set(s),r.uniformMatrix2fv(this.addr,!1,ov),yn(n,s)}}function Ab(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(xn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),yn(n,t)}else{if(xn(n,s))return;rv.set(s),r.uniformMatrix3fv(this.addr,!1,rv),yn(n,s)}}function Rb(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(xn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),yn(n,t)}else{if(xn(n,s))return;sv.set(s),r.uniformMatrix4fv(this.addr,!1,sv),yn(n,s)}}function wb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function Cb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;r.uniform2iv(this.addr,t),yn(n,t)}}function Db(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xn(n,t))return;r.uniform3iv(this.addr,t),yn(n,t)}}function Ub(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;r.uniform4iv(this.addr,t),yn(n,t)}}function Lb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function Nb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;r.uniform2uiv(this.addr,t),yn(n,t)}}function Ob(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xn(n,t))return;r.uniform3uiv(this.addr,t),yn(n,t)}}function Pb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;r.uniform4uiv(this.addr,t),yn(n,t)}}function zb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(nv.compareFunction=tx,c=nv):c=mx,n.setTexture2D(t||c,l)}function Bb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture3D(t||_x,l)}function Ib(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTextureCube(t||vx,l)}function Fb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture2DArray(t||gx,l)}function Hb(r){switch(r){case 5126:return Sb;case 35664:return Mb;case 35665:return Eb;case 35666:return Tb;case 35674:return bb;case 35675:return Ab;case 35676:return Rb;case 5124:case 35670:return wb;case 35667:case 35671:return Cb;case 35668:case 35672:return Db;case 35669:case 35673:return Ub;case 5125:return Lb;case 36294:return Nb;case 36295:return Ob;case 36296:return Pb;case 35678:case 36198:case 36298:case 36306:case 35682:return zb;case 35679:case 36299:case 36307:return Bb;case 35680:case 36300:case 36308:case 36293:return Ib;case 36289:case 36303:case 36311:case 36292:return Fb}}function Gb(r,t){r.uniform1fv(this.addr,t)}function Vb(r,t){const n=no(t,this.size,2);r.uniform2fv(this.addr,n)}function kb(r,t){const n=no(t,this.size,3);r.uniform3fv(this.addr,n)}function Xb(r,t){const n=no(t,this.size,4);r.uniform4fv(this.addr,n)}function qb(r,t){const n=no(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function Wb(r,t){const n=no(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function Yb(r,t){const n=no(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function jb(r,t){r.uniform1iv(this.addr,t)}function Zb(r,t){r.uniform2iv(this.addr,t)}function Kb(r,t){r.uniform3iv(this.addr,t)}function Qb(r,t){r.uniform4iv(this.addr,t)}function Jb(r,t){r.uniform1uiv(this.addr,t)}function $b(r,t){r.uniform2uiv(this.addr,t)}function tA(r,t){r.uniform3uiv(this.addr,t)}function eA(r,t){r.uniform4uiv(this.addr,t)}function nA(r,t,n){const s=this.cache,l=t.length,c=gu(n,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||mx,c[f])}function iA(r,t,n){const s=this.cache,l=t.length,c=gu(n,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||_x,c[f])}function aA(r,t,n){const s=this.cache,l=t.length,c=gu(n,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||vx,c[f])}function sA(r,t,n){const s=this.cache,l=t.length,c=gu(n,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||gx,c[f])}function rA(r){switch(r){case 5126:return Gb;case 35664:return Vb;case 35665:return kb;case 35666:return Xb;case 35674:return qb;case 35675:return Wb;case 35676:return Yb;case 5124:case 35670:return jb;case 35667:case 35671:return Zb;case 35668:case 35672:return Kb;case 35669:case 35673:return Qb;case 5125:return Jb;case 36294:return $b;case 36295:return tA;case 36296:return eA;case 35678:case 36198:case 36298:case 36306:case 35682:return nA;case 35679:case 36299:case 36307:return iA;case 35680:case 36300:case 36308:case 36293:return aA;case 36289:case 36303:case 36311:case 36292:return sA}}class oA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.setValue=Hb(n.type)}}class lA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=rA(n.type)}}class cA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,n[d.id],s)}}}const ud=/(\w+)(\])?(\[|\.)?/g;function lv(r,t){r.seq.push(t),r.map[t.id]=t}function uA(r,t,n){const s=r.name,l=s.length;for(ud.lastIndex=0;;){const c=ud.exec(s),f=ud.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&f+2===l){lv(n,p===void 0?new oA(d,r,t):new lA(d,r,t));break}else{let _=n.map[d];_===void 0&&(_=new cA(d),lv(n,_)),n=_}}}class su{constructor(t,n){this.seq=[],this.map={};const s=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);uA(c,f,this)}}setValue(t,n,s,l){const c=this.map[n];c!==void 0&&c.setValue(t,s,l)}setOptional(t,n,s){const l=n[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,n,s,l){for(let c=0,f=n.length;c!==f;++c){const d=n[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,n){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&s.push(f)}return s}}function cv(r,t,n){const s=r.createShader(t);return r.shaderSource(s,n),r.compileShader(s),s}const fA=37297;let hA=0;function dA(r,t){const n=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const d=f+1;s.push(`${d===t?">":" "} ${d}: ${n[f]}`)}return s.join(`
`)}const uv=new ce;function pA(r){Ae._getMatrix(uv,Ae.workingColorSpace,r);const t=`mat3( ${uv.elements.map(n=>n.toFixed(4))} )`;switch(Ae.getTransfer(r)){case pu:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function fv(r,t,n){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+dA(r.getShaderSource(t),f)}else return l}function mA(r,t){const n=pA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function gA(r,t){let n;switch(t){case Bv:n="Linear";break;case Iv:n="Reinhard";break;case Fv:n="Cineon";break;case Hv:n="ACESFilmic";break;case Gv:n="AgX";break;case Vv:n="Neutral";break;case FM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xc=new $;function _A(){Ae.getLuminanceCoefficients(Xc);const r=Xc.x.toFixed(4),t=Xc.y.toFixed(4),n=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rl).join(`
`)}function xA(r){const t=[];for(const n in r){const s=r[n];s!==!1&&t.push("#define "+n+" "+s)}return t.join(`
`)}function yA(r,t){const n={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:d}}return n}function rl(r){return r!==""}function hv(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const SA=/^[ \t]*#include +<([\w\d./]+)>/gm;function np(r){return r.replace(SA,EA)}const MA=new Map;function EA(r,t){let n=ue[t];if(n===void 0){const s=MA.get(t);if(s!==void 0)n=ue[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return np(n)}const TA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pv(r){return r.replace(TA,bA)}function bA(r,t,n,s){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function mv(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function AA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Pv?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===vM?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ya&&(t="SHADOWMAP_TYPE_VSM"),t}function RA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Yr:case jr:t="ENVMAP_TYPE_CUBE";break;case du:t="ENVMAP_TYPE_CUBE_UV";break}return t}function wA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case jr:t="ENVMAP_MODE_REFRACTION";break}return t}function CA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case zv:t="ENVMAP_BLENDING_MULTIPLY";break;case BM:t="ENVMAP_BLENDING_MIX";break;case IM:t="ENVMAP_BLENDING_ADD";break}return t}function DA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function UA(r,t,n,s){const l=r.getContext(),c=n.defines;let f=n.vertexShader,d=n.fragmentShader;const m=AA(n),p=RA(n),g=wA(n),_=CA(n),x=DA(n),M=vA(n),E=xA(c),T=l.createProgram();let S,v,L=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(rl).join(`
`),S.length>0&&(S+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(rl).join(`
`),v.length>0&&(v+=`
`)):(S=[mv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rl).join(`
`),v=[mv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==os?"#define TONE_MAPPING":"",n.toneMapping!==os?ue.tonemapping_pars_fragment:"",n.toneMapping!==os?gA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ue.colorspace_pars_fragment,mA("linearToOutputTexel",n.outputColorSpace),_A(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(rl).join(`
`)),f=np(f),f=hv(f,n),f=dv(f,n),d=np(d),d=hv(d,n),d=dv(d,n),f=pv(f),d=pv(d),n.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,v=["#define varying in",n.glslVersion===w_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===w_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const D=L+S+f,w=L+v+d,W=cv(l,l.VERTEX_SHADER,D),I=cv(l,l.FRAGMENT_SHADER,w);l.attachShader(T,W),l.attachShader(T,I),n.index0AttributeName!==void 0?l.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function O(F){if(r.debug.checkShaderErrors){const Q=l.getProgramInfoLog(T).trim(),J=l.getShaderInfoLog(W).trim(),ct=l.getShaderInfoLog(I).trim();let ut=!0,P=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(ut=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,W,I);else{const j=fv(l,W,"vertex"),Z=fv(l,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+Q+`
`+j+`
`+Z)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(J===""||ct==="")&&(P=!1);P&&(F.diagnostics={runnable:ut,programLog:Q,vertexShader:{log:J,prefix:S},fragmentShader:{log:ct,prefix:v}})}l.deleteShader(W),l.deleteShader(I),H=new su(l,T),U=yA(l,T)}let H;this.getUniforms=function(){return H===void 0&&O(this),H};let U;this.getAttributes=function(){return U===void 0&&O(this),U};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=l.getProgramParameter(T,fA)),R},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=hA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=W,this.fragmentShader=I,this}let LA=0;class NA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let s=n.get(t);return s===void 0&&(s=new Set,n.set(t,s)),s}_getShaderStage(t){const n=this.shaderCache;let s=n.get(t);return s===void 0&&(s=new OA(t),n.set(t,s)),s}}class OA{constructor(t){this.id=LA++,this.code=t,this.usedTimes=0}}function PA(r,t,n,s,l,c,f){const d=new ax,m=new NA,p=new Set,g=[],_=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(U){return p.add(U),U===0?"uv":`uv${U}`}function S(U,R,F,Q,J){const ct=Q.fog,ut=J.geometry,P=U.isMeshStandardMaterial?Q.environment:null,j=(U.isMeshStandardMaterial?n:t).get(U.envMap||P),Z=j&&j.mapping===du?j.image.height:null,St=E[U.type];U.precision!==null&&(M=l.getMaxPrecision(U.precision),M!==U.precision&&console.warn("THREE.WebGLProgram.getParameters:",U.precision,"not supported, using",M,"instead."));const Tt=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,z=Tt!==void 0?Tt.length:0;let st=0;ut.morphAttributes.position!==void 0&&(st=1),ut.morphAttributes.normal!==void 0&&(st=2),ut.morphAttributes.color!==void 0&&(st=3);let yt,K,ht,Et;if(St){const Re=Yi[St];yt=Re.vertexShader,K=Re.fragmentShader}else yt=U.vertexShader,K=U.fragmentShader,m.update(U),ht=m.getVertexShaderID(U),Et=m.getFragmentShaderID(U);const xt=r.getRenderTarget(),Vt=r.state.buffers.depth.getReversed(),Gt=J.isInstancedMesh===!0,ae=J.isBatchedMesh===!0,He=!!U.map,de=!!U.matcap,Ke=!!j,q=!!U.aoMap,Nn=!!U.lightMap,he=!!U.bumpMap,ge=!!U.normalMap,Qt=!!U.displacementMap,Pe=!!U.emissiveMap,Zt=!!U.metalnessMap,N=!!U.roughnessMap,A=U.anisotropy>0,at=U.clearcoat>0,pt=U.dispersion>0,Mt=U.iridescence>0,gt=U.sheen>0,Wt=U.transmission>0,Ut=A&&!!U.anisotropyMap,zt=at&&!!U.clearcoatMap,_e=at&&!!U.clearcoatNormalMap,At=at&&!!U.clearcoatRoughnessMap,Bt=Mt&&!!U.iridescenceMap,Kt=Mt&&!!U.iridescenceThicknessMap,Yt=gt&&!!U.sheenColorMap,Ot=gt&&!!U.sheenRoughnessMap,te=!!U.specularMap,re=!!U.specularColorMap,Ge=!!U.specularIntensityMap,V=Wt&&!!U.transmissionMap,Rt=Wt&&!!U.thicknessMap,ft=!!U.gradientMap,vt=!!U.alphaMap,wt=U.alphaTest>0,Lt=!!U.alphaHash,ee=!!U.extensions;let Qe=os;U.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(Qe=r.toneMapping);const pn={shaderID:St,shaderType:U.type,shaderName:U.name,vertexShader:yt,fragmentShader:K,defines:U.defines,customVertexShaderID:ht,customFragmentShaderID:Et,isRawShaderMaterial:U.isRawShaderMaterial===!0,glslVersion:U.glslVersion,precision:M,batching:ae,batchingColor:ae&&J._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&J.instanceColor!==null,instancingMorph:Gt&&J.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:xt===null?r.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:$r,alphaToCoverage:!!U.alphaToCoverage,map:He,matcap:de,envMap:Ke,envMapMode:Ke&&j.mapping,envMapCubeUVHeight:Z,aoMap:q,lightMap:Nn,bumpMap:he,normalMap:ge,displacementMap:x&&Qt,emissiveMap:Pe,normalMapObjectSpace:ge&&U.normalMapType===XM,normalMapTangentSpace:ge&&U.normalMapType===kM,metalnessMap:Zt,roughnessMap:N,anisotropy:A,anisotropyMap:Ut,clearcoat:at,clearcoatMap:zt,clearcoatNormalMap:_e,clearcoatRoughnessMap:At,dispersion:pt,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:Yt,sheenRoughnessMap:Ot,specularMap:te,specularColorMap:re,specularIntensityMap:Ge,transmission:Wt,transmissionMap:V,thicknessMap:Rt,gradientMap:ft,opaque:U.transparent===!1&&U.blending===kr&&U.alphaToCoverage===!1,alphaMap:vt,alphaTest:wt,alphaHash:Lt,combine:U.combine,mapUv:He&&T(U.map.channel),aoMapUv:q&&T(U.aoMap.channel),lightMapUv:Nn&&T(U.lightMap.channel),bumpMapUv:he&&T(U.bumpMap.channel),normalMapUv:ge&&T(U.normalMap.channel),displacementMapUv:Qt&&T(U.displacementMap.channel),emissiveMapUv:Pe&&T(U.emissiveMap.channel),metalnessMapUv:Zt&&T(U.metalnessMap.channel),roughnessMapUv:N&&T(U.roughnessMap.channel),anisotropyMapUv:Ut&&T(U.anisotropyMap.channel),clearcoatMapUv:zt&&T(U.clearcoatMap.channel),clearcoatNormalMapUv:_e&&T(U.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&T(U.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&T(U.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(U.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&T(U.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&T(U.sheenRoughnessMap.channel),specularMapUv:te&&T(U.specularMap.channel),specularColorMapUv:re&&T(U.specularColorMap.channel),specularIntensityMapUv:Ge&&T(U.specularIntensityMap.channel),transmissionMapUv:V&&T(U.transmissionMap.channel),thicknessMapUv:Rt&&T(U.thicknessMap.channel),alphaMapUv:vt&&T(U.alphaMap.channel),vertexTangents:!!ut.attributes.tangent&&(ge||A),vertexColors:U.vertexColors,vertexAlphas:U.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!ut.attributes.uv&&(He||vt),fog:!!ct,useFog:U.fog===!0,fogExp2:!!ct&&ct.isFogExp2,flatShading:U.flatShading===!0,sizeAttenuation:U.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Vt,skinning:J.isSkinnedMesh===!0,morphTargets:ut.morphAttributes.position!==void 0,morphNormals:ut.morphAttributes.normal!==void 0,morphColors:ut.morphAttributes.color!==void 0,morphTargetsCount:z,morphTextureStride:st,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:U.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Qe,decodeVideoTexture:He&&U.map.isVideoTexture===!0&&Ae.getTransfer(U.map.colorSpace)===Fe,decodeVideoTextureEmissive:Pe&&U.emissiveMap.isVideoTexture===!0&&Ae.getTransfer(U.emissiveMap.colorSpace)===Fe,premultipliedAlpha:U.premultipliedAlpha,doubleSided:U.side===Sa,flipSided:U.side===ei,useDepthPacking:U.depthPacking>=0,depthPacking:U.depthPacking||0,index0AttributeName:U.index0AttributeName,extensionClipCullDistance:ee&&U.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&U.extensions.multiDraw===!0||ae)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:U.customProgramCacheKey()};return pn.vertexUv1s=p.has(1),pn.vertexUv2s=p.has(2),pn.vertexUv3s=p.has(3),p.clear(),pn}function v(U){const R=[];if(U.shaderID?R.push(U.shaderID):(R.push(U.customVertexShaderID),R.push(U.customFragmentShaderID)),U.defines!==void 0)for(const F in U.defines)R.push(F),R.push(U.defines[F]);return U.isRawShaderMaterial===!1&&(L(R,U),D(R,U),R.push(r.outputColorSpace)),R.push(U.customProgramCacheKey),R.join()}function L(U,R){U.push(R.precision),U.push(R.outputColorSpace),U.push(R.envMapMode),U.push(R.envMapCubeUVHeight),U.push(R.mapUv),U.push(R.alphaMapUv),U.push(R.lightMapUv),U.push(R.aoMapUv),U.push(R.bumpMapUv),U.push(R.normalMapUv),U.push(R.displacementMapUv),U.push(R.emissiveMapUv),U.push(R.metalnessMapUv),U.push(R.roughnessMapUv),U.push(R.anisotropyMapUv),U.push(R.clearcoatMapUv),U.push(R.clearcoatNormalMapUv),U.push(R.clearcoatRoughnessMapUv),U.push(R.iridescenceMapUv),U.push(R.iridescenceThicknessMapUv),U.push(R.sheenColorMapUv),U.push(R.sheenRoughnessMapUv),U.push(R.specularMapUv),U.push(R.specularColorMapUv),U.push(R.specularIntensityMapUv),U.push(R.transmissionMapUv),U.push(R.thicknessMapUv),U.push(R.combine),U.push(R.fogExp2),U.push(R.sizeAttenuation),U.push(R.morphTargetsCount),U.push(R.morphAttributeCount),U.push(R.numDirLights),U.push(R.numPointLights),U.push(R.numSpotLights),U.push(R.numSpotLightMaps),U.push(R.numHemiLights),U.push(R.numRectAreaLights),U.push(R.numDirLightShadows),U.push(R.numPointLightShadows),U.push(R.numSpotLightShadows),U.push(R.numSpotLightShadowsWithMaps),U.push(R.numLightProbes),U.push(R.shadowMapType),U.push(R.toneMapping),U.push(R.numClippingPlanes),U.push(R.numClipIntersection),U.push(R.depthPacking)}function D(U,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),U.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reverseDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),U.push(d.mask)}function w(U){const R=E[U.type];let F;if(R){const Q=Yi[R];F=pp.clone(Q.uniforms)}else F=U.uniforms;return F}function W(U,R){let F;for(let Q=0,J=g.length;Q<J;Q++){const ct=g[Q];if(ct.cacheKey===R){F=ct,++F.usedTimes;break}}return F===void 0&&(F=new UA(r,R,U,c),g.push(F)),F}function I(U){if(--U.usedTimes===0){const R=g.indexOf(U);g[R]=g[g.length-1],g.pop(),U.destroy()}}function O(U){m.remove(U)}function H(){m.dispose()}return{getParameters:S,getProgramCacheKey:v,getUniforms:w,acquireProgram:W,releaseProgram:I,releaseShaderCache:O,programs:g,dispose:H}}function zA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let d=r.get(f);return d===void 0&&(d={},r.set(f,d)),d}function s(f){r.delete(f)}function l(f,d,m){r.get(f)[d]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:s,update:l,dispose:c}}function BA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function gv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function _v(){const r=[];let t=0;const n=[],s=[],l=[];function c(){t=0,n.length=0,s.length=0,l.length=0}function f(_,x,M,E,T,S){let v=r[t];return v===void 0?(v={id:_.id,object:_,geometry:x,material:M,groupOrder:E,renderOrder:_.renderOrder,z:T,group:S},r[t]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=M,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=T,v.group=S),t++,v}function d(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?s.push(v):M.transparent===!0?l.push(v):n.push(v)}function m(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?s.unshift(v):M.transparent===!0?l.unshift(v):n.unshift(v)}function p(_,x){n.length>1&&n.sort(_||BA),s.length>1&&s.sort(x||gv),l.length>1&&l.sort(x||gv)}function g(){for(let _=t,x=r.length;_<x;_++){const M=r[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function IA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new _v,r.set(s,[f])):l>=c.length?(f=new _v,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function FA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new $,color:new fe};break;case"SpotLight":n={position:new $,direction:new $,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new $,color:new fe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new $,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":n={color:new fe,position:new $,halfWidth:new $,halfHeight:new $};break}return r[t.id]=n,n}}}function HA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let GA=0;function VA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function kA(r){const t=new FA,n=HA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new $);const l=new $,c=new an,f=new an;function d(p){let g=0,_=0,x=0;for(let U=0;U<9;U++)s.probe[U].set(0,0,0);let M=0,E=0,T=0,S=0,v=0,L=0,D=0,w=0,W=0,I=0,O=0;p.sort(VA);for(let U=0,R=p.length;U<R;U++){const F=p[U],Q=F.color,J=F.intensity,ct=F.distance,ut=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)g+=Q.r*J,_+=Q.g*J,x+=Q.b*J;else if(F.isLightProbe){for(let P=0;P<9;P++)s.probe[P].addScaledVector(F.sh.coefficients[P],J);O++}else if(F.isDirectionalLight){const P=t.get(F);if(P.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const j=F.shadow,Z=n.get(F);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,s.directionalShadow[M]=Z,s.directionalShadowMap[M]=ut,s.directionalShadowMatrix[M]=F.shadow.matrix,L++}s.directional[M]=P,M++}else if(F.isSpotLight){const P=t.get(F);P.position.setFromMatrixPosition(F.matrixWorld),P.color.copy(Q).multiplyScalar(J),P.distance=ct,P.coneCos=Math.cos(F.angle),P.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),P.decay=F.decay,s.spot[T]=P;const j=F.shadow;if(F.map&&(s.spotLightMap[W]=F.map,W++,j.updateMatrices(F),F.castShadow&&I++),s.spotLightMatrix[T]=j.matrix,F.castShadow){const Z=n.get(F);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,s.spotShadow[T]=Z,s.spotShadowMap[T]=ut,w++}T++}else if(F.isRectAreaLight){const P=t.get(F);P.color.copy(Q).multiplyScalar(J),P.halfWidth.set(F.width*.5,0,0),P.halfHeight.set(0,F.height*.5,0),s.rectArea[S]=P,S++}else if(F.isPointLight){const P=t.get(F);if(P.color.copy(F.color).multiplyScalar(F.intensity),P.distance=F.distance,P.decay=F.decay,F.castShadow){const j=F.shadow,Z=n.get(F);Z.shadowIntensity=j.intensity,Z.shadowBias=j.bias,Z.shadowNormalBias=j.normalBias,Z.shadowRadius=j.radius,Z.shadowMapSize=j.mapSize,Z.shadowCameraNear=j.camera.near,Z.shadowCameraFar=j.camera.far,s.pointShadow[E]=Z,s.pointShadowMap[E]=ut,s.pointShadowMatrix[E]=F.shadow.matrix,D++}s.point[E]=P,E++}else if(F.isHemisphereLight){const P=t.get(F);P.skyColor.copy(F.color).multiplyScalar(J),P.groundColor.copy(F.groundColor).multiplyScalar(J),s.hemi[v]=P,v++}}S>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Nt.LTC_FLOAT_1,s.rectAreaLTC2=Nt.LTC_FLOAT_2):(s.rectAreaLTC1=Nt.LTC_HALF_1,s.rectAreaLTC2=Nt.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=_,s.ambient[2]=x;const H=s.hash;(H.directionalLength!==M||H.pointLength!==E||H.spotLength!==T||H.rectAreaLength!==S||H.hemiLength!==v||H.numDirectionalShadows!==L||H.numPointShadows!==D||H.numSpotShadows!==w||H.numSpotMaps!==W||H.numLightProbes!==O)&&(s.directional.length=M,s.spot.length=T,s.rectArea.length=S,s.point.length=E,s.hemi.length=v,s.directionalShadow.length=L,s.directionalShadowMap.length=L,s.pointShadow.length=D,s.pointShadowMap.length=D,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=L,s.pointShadowMatrix.length=D,s.spotLightMatrix.length=w+W-I,s.spotLightMap.length=W,s.numSpotLightShadowsWithMaps=I,s.numLightProbes=O,H.directionalLength=M,H.pointLength=E,H.spotLength=T,H.rectAreaLength=S,H.hemiLength=v,H.numDirectionalShadows=L,H.numPointShadows=D,H.numSpotShadows=w,H.numSpotMaps=W,H.numLightProbes=O,s.version=GA++)}function m(p,g){let _=0,x=0,M=0,E=0,T=0;const S=g.matrixWorldInverse;for(let v=0,L=p.length;v<L;v++){const D=p[v];if(D.isDirectionalLight){const w=s.directional[_];w.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),_++}else if(D.isSpotLight){const w=s.spot[M];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),w.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),M++}else if(D.isRectAreaLight){const w=s.rectArea[E];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),f.identity(),c.copy(D.matrixWorld),c.premultiply(S),f.extractRotation(c),w.halfWidth.set(D.width*.5,0,0),w.halfHeight.set(0,D.height*.5,0),w.halfWidth.applyMatrix4(f),w.halfHeight.applyMatrix4(f),E++}else if(D.isPointLight){const w=s.point[x];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),x++}else if(D.isHemisphereLight){const w=s.hemi[T];w.direction.setFromMatrixPosition(D.matrixWorld),w.direction.transformDirection(S),T++}}}return{setup:d,setupView:m,state:s}}function vv(r){const t=new kA(r),n=[],s=[];function l(g){p.camera=g,n.length=0,s.length=0}function c(g){n.push(g)}function f(g){s.push(g)}function d(){t.setup(n)}function m(g){t.setupView(n,g)}const p={lightsArray:n,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:f}}function XA(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new vv(r),t.set(l,[d])):c>=f.length?(d=new vv(r),f.push(d)):d=f[c],d}function s(){t=new WeakMap}return{get:n,dispose:s}}class qA extends eo{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=GM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class WA extends eo{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const YA=`void main() {
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
}`;function ZA(r,t,n){let s=new fx;const l=new Ce,c=new Ce,f=new on,d=new qA({depthPacking:VM}),m=new WA,p={},g=n.maxTextureSize,_={[ls]:ei,[ei]:ls,[Sa]:Sa},x=new Hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:YA,fragmentShader:jA}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const E=new kn;E.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new Tn(E,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pv;let v=this.type;this.render=function(I,O,H){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||I.length===0)return;const U=r.getRenderTarget(),R=r.getActiveCubeFace(),F=r.getActiveMipmapLevel(),Q=r.state;Q.setBlending(Ta),Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const J=v!==ya&&this.type===ya,ct=v===ya&&this.type!==ya;for(let ut=0,P=I.length;ut<P;ut++){const j=I[ut],Z=j.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;l.copy(Z.mapSize);const St=Z.getFrameExtents();if(l.multiply(St),c.copy(Z.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/St.x),l.x=c.x*St.x,Z.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/St.y),l.y=c.y*St.y,Z.mapSize.y=c.y)),Z.map===null||J===!0||ct===!0){const z=this.type!==ya?{minFilter:Fi,magFilter:Fi}:{};Z.map!==null&&Z.map.dispose(),Z.map=new cs(l.x,l.y,z),Z.map.texture.name=j.name+".shadowMap",Z.camera.updateProjectionMatrix()}r.setRenderTarget(Z.map),r.clear();const Tt=Z.getViewportCount();for(let z=0;z<Tt;z++){const st=Z.getViewport(z);f.set(c.x*st.x,c.y*st.y,c.x*st.z,c.y*st.w),Q.viewport(f),Z.updateMatrices(j,z),s=Z.getFrustum(),w(O,H,Z.camera,j,this.type)}Z.isPointLightShadow!==!0&&this.type===ya&&L(Z,H),Z.needsUpdate=!1}v=this.type,S.needsUpdate=!1,r.setRenderTarget(U,R,F)};function L(I,O){const H=t.update(T);x.defines.VSM_SAMPLES!==I.blurSamples&&(x.defines.VSM_SAMPLES=I.blurSamples,M.defines.VSM_SAMPLES=I.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new cs(l.x,l.y)),x.uniforms.shadow_pass.value=I.map.texture,x.uniforms.resolution.value=I.mapSize,x.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(O,null,H,x,T,null),M.uniforms.shadow_pass.value=I.mapPass.texture,M.uniforms.resolution.value=I.mapSize,M.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(O,null,H,M,T,null)}function D(I,O,H,U){let R=null;const F=H.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(F!==void 0)R=F;else if(R=H.isPointLight===!0?m:d,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const Q=R.uuid,J=O.uuid;let ct=p[Q];ct===void 0&&(ct={},p[Q]=ct);let ut=ct[J];ut===void 0&&(ut=R.clone(),ct[J]=ut,O.addEventListener("dispose",W)),R=ut}if(R.visible=O.visible,R.wireframe=O.wireframe,U===ya?R.side=O.shadowSide!==null?O.shadowSide:O.side:R.side=O.shadowSide!==null?O.shadowSide:_[O.side],R.alphaMap=O.alphaMap,R.alphaTest=O.alphaTest,R.map=O.map,R.clipShadows=O.clipShadows,R.clippingPlanes=O.clippingPlanes,R.clipIntersection=O.clipIntersection,R.displacementMap=O.displacementMap,R.displacementScale=O.displacementScale,R.displacementBias=O.displacementBias,R.wireframeLinewidth=O.wireframeLinewidth,R.linewidth=O.linewidth,H.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const Q=r.properties.get(R);Q.light=H}return R}function w(I,O,H,U,R){if(I.visible===!1)return;if(I.layers.test(O.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&R===ya)&&(!I.frustumCulled||s.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,I.matrixWorld);const J=t.update(I),ct=I.material;if(Array.isArray(ct)){const ut=J.groups;for(let P=0,j=ut.length;P<j;P++){const Z=ut[P],St=ct[Z.materialIndex];if(St&&St.visible){const Tt=D(I,St,U,R);I.onBeforeShadow(r,I,O,H,J,Tt,Z),r.renderBufferDirect(H,null,J,Tt,I,Z),I.onAfterShadow(r,I,O,H,J,Tt,Z)}}}else if(ct.visible){const ut=D(I,ct,U,R);I.onBeforeShadow(r,I,O,H,J,ut,null),r.renderBufferDirect(H,null,J,ut,I,null),I.onAfterShadow(r,I,O,H,J,ut,null)}}const Q=I.children;for(let J=0,ct=Q.length;J<ct;J++)w(Q[J],O,H,U,R)}function W(I){I.target.removeEventListener("dispose",W);for(const H in p){const U=p[H],R=I.target.uuid;R in U&&(U[R].dispose(),delete U[R])}}}const KA={[xd]:yd,[Sd]:Td,[Md]:bd,[Wr]:Ed,[yd]:xd,[Td]:Sd,[bd]:Md,[Ed]:Wr};function QA(r,t){function n(){let V=!1;const Rt=new on;let ft=null;const vt=new on(0,0,0,0);return{setMask:function(wt){ft!==wt&&!V&&(r.colorMask(wt,wt,wt,wt),ft=wt)},setLocked:function(wt){V=wt},setClear:function(wt,Lt,ee,Qe,pn){pn===!0&&(wt*=Qe,Lt*=Qe,ee*=Qe),Rt.set(wt,Lt,ee,Qe),vt.equals(Rt)===!1&&(r.clearColor(wt,Lt,ee,Qe),vt.copy(Rt))},reset:function(){V=!1,ft=null,vt.set(-1,0,0,0)}}}function s(){let V=!1,Rt=!1,ft=null,vt=null,wt=null;return{setReversed:function(Lt){if(Rt!==Lt){const ee=t.get("EXT_clip_control");Rt?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT);const Qe=wt;wt=null,this.setClear(Qe)}Rt=Lt},getReversed:function(){return Rt},setTest:function(Lt){Lt?xt(r.DEPTH_TEST):Vt(r.DEPTH_TEST)},setMask:function(Lt){ft!==Lt&&!V&&(r.depthMask(Lt),ft=Lt)},setFunc:function(Lt){if(Rt&&(Lt=KA[Lt]),vt!==Lt){switch(Lt){case xd:r.depthFunc(r.NEVER);break;case yd:r.depthFunc(r.ALWAYS);break;case Sd:r.depthFunc(r.LESS);break;case Wr:r.depthFunc(r.LEQUAL);break;case Md:r.depthFunc(r.EQUAL);break;case Ed:r.depthFunc(r.GEQUAL);break;case Td:r.depthFunc(r.GREATER);break;case bd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}vt=Lt}},setLocked:function(Lt){V=Lt},setClear:function(Lt){wt!==Lt&&(Rt&&(Lt=1-Lt),r.clearDepth(Lt),wt=Lt)},reset:function(){V=!1,ft=null,vt=null,wt=null,Rt=!1}}}function l(){let V=!1,Rt=null,ft=null,vt=null,wt=null,Lt=null,ee=null,Qe=null,pn=null;return{setTest:function(Re){V||(Re?xt(r.STENCIL_TEST):Vt(r.STENCIL_TEST))},setMask:function(Re){Rt!==Re&&!V&&(r.stencilMask(Re),Rt=Re)},setFunc:function(Re,bn,wi){(ft!==Re||vt!==bn||wt!==wi)&&(r.stencilFunc(Re,bn,wi),ft=Re,vt=bn,wt=wi)},setOp:function(Re,bn,wi){(Lt!==Re||ee!==bn||Qe!==wi)&&(r.stencilOp(Re,bn,wi),Lt=Re,ee=bn,Qe=wi)},setLocked:function(Re){V=Re},setClear:function(Re){pn!==Re&&(r.clearStencil(Re),pn=Re)},reset:function(){V=!1,Rt=null,ft=null,vt=null,wt=null,Lt=null,ee=null,Qe=null,pn=null}}}const c=new n,f=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,L=null,D=null,w=null,W=null,I=null,O=new fe(0,0,0),H=0,U=!1,R=null,F=null,Q=null,J=null,ct=null;const ut=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,j=0;const Z=r.getParameter(r.VERSION);Z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Z)[1]),P=j>=1):Z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),P=j>=2);let St=null,Tt={};const z=r.getParameter(r.SCISSOR_BOX),st=r.getParameter(r.VIEWPORT),yt=new on().fromArray(z),K=new on().fromArray(st);function ht(V,Rt,ft,vt){const wt=new Uint8Array(4),Lt=r.createTexture();r.bindTexture(V,Lt),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ee=0;ee<ft;ee++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,vt,0,r.RGBA,r.UNSIGNED_BYTE,wt):r.texImage2D(Rt+ee,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,wt);return Lt}const Et={};Et[r.TEXTURE_2D]=ht(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ht(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ht(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ht(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),xt(r.DEPTH_TEST),f.setFunc(Wr),he(!1),ge(E_),xt(r.CULL_FACE),q(Ta);function xt(V){g[V]!==!0&&(r.enable(V),g[V]=!0)}function Vt(V){g[V]!==!1&&(r.disable(V),g[V]=!1)}function Gt(V,Rt){return _[V]!==Rt?(r.bindFramebuffer(V,Rt),_[V]=Rt,V===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Rt),V===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function ae(V,Rt){let ft=M,vt=!1;if(V){ft=x.get(Rt),ft===void 0&&(ft=[],x.set(Rt,ft));const wt=V.textures;if(ft.length!==wt.length||ft[0]!==r.COLOR_ATTACHMENT0){for(let Lt=0,ee=wt.length;Lt<ee;Lt++)ft[Lt]=r.COLOR_ATTACHMENT0+Lt;ft.length=wt.length,vt=!0}}else ft[0]!==r.BACK&&(ft[0]=r.BACK,vt=!0);vt&&r.drawBuffers(ft)}function He(V){return E!==V?(r.useProgram(V),E=V,!0):!1}const de={[Bs]:r.FUNC_ADD,[yM]:r.FUNC_SUBTRACT,[SM]:r.FUNC_REVERSE_SUBTRACT};de[MM]=r.MIN,de[EM]=r.MAX;const Ke={[TM]:r.ZERO,[bM]:r.ONE,[AM]:r.SRC_COLOR,[_d]:r.SRC_ALPHA,[LM]:r.SRC_ALPHA_SATURATE,[DM]:r.DST_COLOR,[wM]:r.DST_ALPHA,[RM]:r.ONE_MINUS_SRC_COLOR,[vd]:r.ONE_MINUS_SRC_ALPHA,[UM]:r.ONE_MINUS_DST_COLOR,[CM]:r.ONE_MINUS_DST_ALPHA,[NM]:r.CONSTANT_COLOR,[OM]:r.ONE_MINUS_CONSTANT_COLOR,[PM]:r.CONSTANT_ALPHA,[zM]:r.ONE_MINUS_CONSTANT_ALPHA};function q(V,Rt,ft,vt,wt,Lt,ee,Qe,pn,Re){if(V===Ta){T===!0&&(Vt(r.BLEND),T=!1);return}if(T===!1&&(xt(r.BLEND),T=!0),V!==xM){if(V!==S||Re!==U){if((v!==Bs||w!==Bs)&&(r.blendEquation(r.FUNC_ADD),v=Bs,w=Bs),Re)switch(V){case kr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case gd:r.blendFunc(r.ONE,r.ONE);break;case T_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case b_:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case kr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case gd:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case T_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case b_:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}L=null,D=null,W=null,I=null,O.set(0,0,0),H=0,S=V,U=Re}return}wt=wt||Rt,Lt=Lt||ft,ee=ee||vt,(Rt!==v||wt!==w)&&(r.blendEquationSeparate(de[Rt],de[wt]),v=Rt,w=wt),(ft!==L||vt!==D||Lt!==W||ee!==I)&&(r.blendFuncSeparate(Ke[ft],Ke[vt],Ke[Lt],Ke[ee]),L=ft,D=vt,W=Lt,I=ee),(Qe.equals(O)===!1||pn!==H)&&(r.blendColor(Qe.r,Qe.g,Qe.b,pn),O.copy(Qe),H=pn),S=V,U=!1}function Nn(V,Rt){V.side===Sa?Vt(r.CULL_FACE):xt(r.CULL_FACE);let ft=V.side===ei;Rt&&(ft=!ft),he(ft),V.blending===kr&&V.transparent===!1?q(Ta):q(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),c.setMask(V.colorWrite);const vt=V.stencilWrite;d.setTest(vt),vt&&(d.setMask(V.stencilWriteMask),d.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),d.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Pe(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?xt(r.SAMPLE_ALPHA_TO_COVERAGE):Vt(r.SAMPLE_ALPHA_TO_COVERAGE)}function he(V){R!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),R=V)}function ge(V){V!==gM?(xt(r.CULL_FACE),V!==F&&(V===E_?r.cullFace(r.BACK):V===_M?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Vt(r.CULL_FACE),F=V}function Qt(V){V!==Q&&(P&&r.lineWidth(V),Q=V)}function Pe(V,Rt,ft){V?(xt(r.POLYGON_OFFSET_FILL),(J!==Rt||ct!==ft)&&(r.polygonOffset(Rt,ft),J=Rt,ct=ft)):Vt(r.POLYGON_OFFSET_FILL)}function Zt(V){V?xt(r.SCISSOR_TEST):Vt(r.SCISSOR_TEST)}function N(V){V===void 0&&(V=r.TEXTURE0+ut-1),St!==V&&(r.activeTexture(V),St=V)}function A(V,Rt,ft){ft===void 0&&(St===null?ft=r.TEXTURE0+ut-1:ft=St);let vt=Tt[ft];vt===void 0&&(vt={type:void 0,texture:void 0},Tt[ft]=vt),(vt.type!==V||vt.texture!==Rt)&&(St!==ft&&(r.activeTexture(ft),St=ft),r.bindTexture(V,Rt||Et[V]),vt.type=V,vt.texture=Rt)}function at(){const V=Tt[St];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function pt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Mt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Wt(){try{r.texSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ut(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function _e(){try{r.texStorage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Yt(V){yt.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),yt.copy(V))}function Ot(V){K.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),K.copy(V))}function te(V,Rt){let ft=p.get(Rt);ft===void 0&&(ft=new WeakMap,p.set(Rt,ft));let vt=ft.get(V);vt===void 0&&(vt=r.getUniformBlockIndex(Rt,V.name),ft.set(V,vt))}function re(V,Rt){const vt=p.get(Rt).get(V);m.get(Rt)!==vt&&(r.uniformBlockBinding(Rt,vt,V.__bindingPointIndex),m.set(Rt,vt))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},St=null,Tt={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,L=null,D=null,w=null,W=null,I=null,O=new fe(0,0,0),H=0,U=!1,R=null,F=null,Q=null,J=null,ct=null,yt.set(0,0,r.canvas.width,r.canvas.height),K.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:xt,disable:Vt,bindFramebuffer:Gt,drawBuffers:ae,useProgram:He,setBlending:q,setMaterial:Nn,setFlipSided:he,setCullFace:ge,setLineWidth:Qt,setPolygonOffset:Pe,setScissorTest:Zt,activeTexture:N,bindTexture:A,unbindTexture:at,compressedTexImage2D:pt,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Kt,updateUBOMapping:te,uniformBlockBinding:re,texStorage2D:_e,texStorage3D:At,texSubImage2D:gt,texSubImage3D:Wt,compressedTexSubImage2D:Ut,compressedTexSubImage3D:zt,scissor:Yt,viewport:Ot,reset:Ge}}function xv(r,t,n,s){const l=JA(s);switch(n){case Yv:return r*t;case Zv:return r*t;case Kv:return r*t*2;case Qv:return r*t/l.components*l.byteLength;case up:return r*t/l.components*l.byteLength;case Jv:return r*t*2/l.components*l.byteLength;case fp:return r*t*2/l.components*l.byteLength;case jv:return r*t*3/l.components*l.byteLength;case Ii:return r*t*4/l.components*l.byteLength;case hp:return r*t*4/l.components*l.byteLength;case tu:case eu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case nu:case iu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Dd:case Ld:return Math.max(r,16)*Math.max(t,8)/4;case Cd:case Ud:return Math.max(r,8)*Math.max(t,8)/2;case Nd:case Od:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Pd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case zd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Bd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Id:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Fd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Gd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Vd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case kd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Xd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Wd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Yd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case jd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Zd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case au:case Kd:case Qd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case $v:case Jd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case $d:case tp:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function JA(r){switch(r){case Aa:case Xv:return{byteLength:1,components:1};case ll:case qv:case Jr:return{byteLength:2,components:1};case lp:case cp:return{byteLength:2,components:4};case qs:case op:case Ma:return{byteLength:4,components:1};case Wv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function $A(r,t,n,s,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ce,g=new WeakMap;let _;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,A){return M?new OffscreenCanvas(N,A):lu("canvas")}function T(N,A,at){let pt=1;const Mt=Zt(N);if((Mt.width>at||Mt.height>at)&&(pt=at/Math.max(Mt.width,Mt.height)),pt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const gt=Math.floor(pt*Mt.width),Wt=Math.floor(pt*Mt.height);_===void 0&&(_=E(gt,Wt));const Ut=A?E(gt,Wt):_;return Ut.width=gt,Ut.height=Wt,Ut.getContext("2d").drawImage(N,0,0,gt,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+gt+"x"+Wt+")."),Ut}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),N;return N}function S(N){return N.generateMipmaps}function v(N){r.generateMipmap(N)}function L(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function D(N,A,at,pt,Mt=!1){if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt=A;if(A===r.RED&&(at===r.FLOAT&&(gt=r.R32F),at===r.HALF_FLOAT&&(gt=r.R16F),at===r.UNSIGNED_BYTE&&(gt=r.R8)),A===r.RED_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.R8UI),at===r.UNSIGNED_SHORT&&(gt=r.R16UI),at===r.UNSIGNED_INT&&(gt=r.R32UI),at===r.BYTE&&(gt=r.R8I),at===r.SHORT&&(gt=r.R16I),at===r.INT&&(gt=r.R32I)),A===r.RG&&(at===r.FLOAT&&(gt=r.RG32F),at===r.HALF_FLOAT&&(gt=r.RG16F),at===r.UNSIGNED_BYTE&&(gt=r.RG8)),A===r.RG_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RG8UI),at===r.UNSIGNED_SHORT&&(gt=r.RG16UI),at===r.UNSIGNED_INT&&(gt=r.RG32UI),at===r.BYTE&&(gt=r.RG8I),at===r.SHORT&&(gt=r.RG16I),at===r.INT&&(gt=r.RG32I)),A===r.RGB_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),at===r.UNSIGNED_INT&&(gt=r.RGB32UI),at===r.BYTE&&(gt=r.RGB8I),at===r.SHORT&&(gt=r.RGB16I),at===r.INT&&(gt=r.RGB32I)),A===r.RGBA_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),at===r.UNSIGNED_INT&&(gt=r.RGBA32UI),at===r.BYTE&&(gt=r.RGBA8I),at===r.SHORT&&(gt=r.RGBA16I),at===r.INT&&(gt=r.RGBA32I)),A===r.RGB&&at===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),A===r.RGBA){const Wt=Mt?pu:Ae.getTransfer(pt);at===r.FLOAT&&(gt=r.RGBA32F),at===r.HALF_FLOAT&&(gt=r.RGBA16F),at===r.UNSIGNED_BYTE&&(gt=Wt===Fe?r.SRGB8_ALPHA8:r.RGBA8),at===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),at===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function w(N,A){let at;return N?A===null||A===qs||A===Zr?at=r.DEPTH24_STENCIL8:A===Ma?at=r.DEPTH32F_STENCIL8:A===ll&&(at=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===qs||A===Zr?at=r.DEPTH_COMPONENT24:A===Ma?at=r.DEPTH_COMPONENT32F:A===ll&&(at=r.DEPTH_COMPONENT16),at}function W(N,A){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==Fi&&N.minFilter!==ji?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function I(N){const A=N.target;A.removeEventListener("dispose",I),H(A),A.isVideoTexture&&g.delete(A)}function O(N){const A=N.target;A.removeEventListener("dispose",O),R(A)}function H(N){const A=s.get(N);if(A.__webglInit===void 0)return;const at=N.source,pt=x.get(at);if(pt){const Mt=pt[A.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&U(N),Object.keys(pt).length===0&&x.delete(at)}s.remove(N)}function U(N){const A=s.get(N);r.deleteTexture(A.__webglTexture);const at=N.source,pt=x.get(at);delete pt[A.__cacheKey],f.memory.textures--}function R(N){const A=s.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),s.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let pt=0;pt<6;pt++){if(Array.isArray(A.__webglFramebuffer[pt]))for(let Mt=0;Mt<A.__webglFramebuffer[pt].length;Mt++)r.deleteFramebuffer(A.__webglFramebuffer[pt][Mt]);else r.deleteFramebuffer(A.__webglFramebuffer[pt]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[pt])}else{if(Array.isArray(A.__webglFramebuffer))for(let pt=0;pt<A.__webglFramebuffer.length;pt++)r.deleteFramebuffer(A.__webglFramebuffer[pt]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let pt=0;pt<A.__webglColorRenderbuffer.length;pt++)A.__webglColorRenderbuffer[pt]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[pt]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const at=N.textures;for(let pt=0,Mt=at.length;pt<Mt;pt++){const gt=s.get(at[pt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),s.remove(at[pt])}s.remove(N)}let F=0;function Q(){F=0}function J(){const N=F;return N>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),F+=1,N}function ct(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function ut(N,A){const at=s.get(N);if(N.isVideoTexture&&Qt(N),N.isRenderTargetTexture===!1&&N.version>0&&at.__version!==N.version){const pt=N.image;if(pt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(at,N,A);return}}n.bindTexture(r.TEXTURE_2D,at.__webglTexture,r.TEXTURE0+A)}function P(N,A){const at=s.get(N);if(N.version>0&&at.__version!==N.version){K(at,N,A);return}n.bindTexture(r.TEXTURE_2D_ARRAY,at.__webglTexture,r.TEXTURE0+A)}function j(N,A){const at=s.get(N);if(N.version>0&&at.__version!==N.version){K(at,N,A);return}n.bindTexture(r.TEXTURE_3D,at.__webglTexture,r.TEXTURE0+A)}function Z(N,A){const at=s.get(N);if(N.version>0&&at.__version!==N.version){ht(at,N,A);return}n.bindTexture(r.TEXTURE_CUBE_MAP,at.__webglTexture,r.TEXTURE0+A)}const St={[ol]:r.REPEAT,[Gs]:r.CLAMP_TO_EDGE,[wd]:r.MIRRORED_REPEAT},Tt={[Fi]:r.NEAREST,[HM]:r.NEAREST_MIPMAP_NEAREST,[Tc]:r.NEAREST_MIPMAP_LINEAR,[ji]:r.LINEAR,[zh]:r.LINEAR_MIPMAP_NEAREST,[Vs]:r.LINEAR_MIPMAP_LINEAR},z={[qM]:r.NEVER,[QM]:r.ALWAYS,[WM]:r.LESS,[tx]:r.LEQUAL,[YM]:r.EQUAL,[KM]:r.GEQUAL,[jM]:r.GREATER,[ZM]:r.NOTEQUAL};function st(N,A){if(A.type===Ma&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===ji||A.magFilter===zh||A.magFilter===Tc||A.magFilter===Vs||A.minFilter===ji||A.minFilter===zh||A.minFilter===Tc||A.minFilter===Vs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,St[A.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,St[A.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,St[A.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Tt[A.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Tt[A.minFilter]),A.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,z[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Fi||A.minFilter!==Tc&&A.minFilter!==Vs||A.type===Ma&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||s.get(A).__currentAnisotropy){const at=t.get("EXT_texture_filter_anisotropic");r.texParameterf(N,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy}}}function yt(N,A){let at=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",I));const pt=A.source;let Mt=x.get(pt);Mt===void 0&&(Mt={},x.set(pt,Mt));const gt=ct(A);if(gt!==N.__cacheKey){Mt[gt]===void 0&&(Mt[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,at=!0),Mt[gt].usedTimes++;const Wt=Mt[N.__cacheKey];Wt!==void 0&&(Mt[N.__cacheKey].usedTimes--,Wt.usedTimes===0&&U(A)),N.__cacheKey=gt,N.__webglTexture=Mt[gt].texture}return at}function K(N,A,at){let pt=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(pt=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(pt=r.TEXTURE_3D);const Mt=yt(N,A),gt=A.source;n.bindTexture(pt,N.__webglTexture,r.TEXTURE0+at);const Wt=s.get(gt);if(gt.version!==Wt.__version||Mt===!0){n.activeTexture(r.TEXTURE0+at);const Ut=Ae.getPrimaries(Ae.workingColorSpace),zt=A.colorSpace===rs?null:Ae.getPrimaries(A.colorSpace),_e=A.colorSpace===rs||Ut===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let At=T(A.image,!1,l.maxTextureSize);At=Pe(A,At);const Bt=c.convert(A.format,A.colorSpace),Kt=c.convert(A.type);let Yt=D(A.internalFormat,Bt,Kt,A.colorSpace,A.isVideoTexture);st(pt,A);let Ot;const te=A.mipmaps,re=A.isVideoTexture!==!0,Ge=Wt.__version===void 0||Mt===!0,V=gt.dataReady,Rt=W(A,At);if(A.isDepthTexture)Yt=w(A.format===Kr,A.type),Ge&&(re?n.texStorage2D(r.TEXTURE_2D,1,Yt,At.width,At.height):n.texImage2D(r.TEXTURE_2D,0,Yt,At.width,At.height,0,Bt,Kt,null));else if(A.isDataTexture)if(te.length>0){re&&Ge&&n.texStorage2D(r.TEXTURE_2D,Rt,Yt,te[0].width,te[0].height);for(let ft=0,vt=te.length;ft<vt;ft++)Ot=te[ft],re?V&&n.texSubImage2D(r.TEXTURE_2D,ft,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,ft,Yt,Ot.width,Ot.height,0,Bt,Kt,Ot.data);A.generateMipmaps=!1}else re?(Ge&&n.texStorage2D(r.TEXTURE_2D,Rt,Yt,At.width,At.height),V&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Kt,At.data)):n.texImage2D(r.TEXTURE_2D,0,Yt,At.width,At.height,0,Bt,Kt,At.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){re&&Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Yt,te[0].width,te[0].height,At.depth);for(let ft=0,vt=te.length;ft<vt;ft++)if(Ot=te[ft],A.format!==Ii)if(Bt!==null)if(re){if(V)if(A.layerUpdates.size>0){const wt=xv(Ot.width,Ot.height,A.format,A.type);for(const Lt of A.layerUpdates){const ee=Ot.data.subarray(Lt*wt/Ot.data.BYTES_PER_ELEMENT,(Lt+1)*wt/Ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ft,0,0,Lt,Ot.width,Ot.height,1,Bt,ee)}A.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ft,0,0,0,Ot.width,Ot.height,At.depth,Bt,Ot.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ft,Yt,Ot.width,Ot.height,At.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?V&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,ft,0,0,0,Ot.width,Ot.height,At.depth,Bt,Kt,Ot.data):n.texImage3D(r.TEXTURE_2D_ARRAY,ft,Yt,Ot.width,Ot.height,At.depth,0,Bt,Kt,Ot.data)}else{re&&Ge&&n.texStorage2D(r.TEXTURE_2D,Rt,Yt,te[0].width,te[0].height);for(let ft=0,vt=te.length;ft<vt;ft++)Ot=te[ft],A.format!==Ii?Bt!==null?re?V&&n.compressedTexSubImage2D(r.TEXTURE_2D,ft,0,0,Ot.width,Ot.height,Bt,Ot.data):n.compressedTexImage2D(r.TEXTURE_2D,ft,Yt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?V&&n.texSubImage2D(r.TEXTURE_2D,ft,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,ft,Yt,Ot.width,Ot.height,0,Bt,Kt,Ot.data)}else if(A.isDataArrayTexture)if(re){if(Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Yt,At.width,At.height,At.depth),V)if(A.layerUpdates.size>0){const ft=xv(At.width,At.height,A.format,A.type);for(const vt of A.layerUpdates){const wt=At.data.subarray(vt*ft/At.data.BYTES_PER_ELEMENT,(vt+1)*ft/At.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,vt,At.width,At.height,1,Bt,Kt,wt)}A.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Yt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(A.isData3DTexture)re?(Ge&&n.texStorage3D(r.TEXTURE_3D,Rt,Yt,At.width,At.height,At.depth),V&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)):n.texImage3D(r.TEXTURE_3D,0,Yt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(A.isFramebufferTexture){if(Ge)if(re)n.texStorage2D(r.TEXTURE_2D,Rt,Yt,At.width,At.height);else{let ft=At.width,vt=At.height;for(let wt=0;wt<Rt;wt++)n.texImage2D(r.TEXTURE_2D,wt,Yt,ft,vt,0,Bt,Kt,null),ft>>=1,vt>>=1}}else if(te.length>0){if(re&&Ge){const ft=Zt(te[0]);n.texStorage2D(r.TEXTURE_2D,Rt,Yt,ft.width,ft.height)}for(let ft=0,vt=te.length;ft<vt;ft++)Ot=te[ft],re?V&&n.texSubImage2D(r.TEXTURE_2D,ft,0,0,Bt,Kt,Ot):n.texImage2D(r.TEXTURE_2D,ft,Yt,Bt,Kt,Ot);A.generateMipmaps=!1}else if(re){if(Ge){const ft=Zt(At);n.texStorage2D(r.TEXTURE_2D,Rt,Yt,ft.width,ft.height)}V&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Kt,At)}else n.texImage2D(r.TEXTURE_2D,0,Yt,Bt,Kt,At);S(A)&&v(pt),Wt.__version=gt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function ht(N,A,at){if(A.image.length!==6)return;const pt=yt(N,A),Mt=A.source;n.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+at);const gt=s.get(Mt);if(Mt.version!==gt.__version||pt===!0){n.activeTexture(r.TEXTURE0+at);const Wt=Ae.getPrimaries(Ae.workingColorSpace),Ut=A.colorSpace===rs?null:Ae.getPrimaries(A.colorSpace),zt=A.colorSpace===rs||Wt===Ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const _e=A.isCompressedTexture||A.image[0].isCompressedTexture,At=A.image[0]&&A.image[0].isDataTexture,Bt=[];for(let vt=0;vt<6;vt++)!_e&&!At?Bt[vt]=T(A.image[vt],!0,l.maxCubemapSize):Bt[vt]=At?A.image[vt].image:A.image[vt],Bt[vt]=Pe(A,Bt[vt]);const Kt=Bt[0],Yt=c.convert(A.format,A.colorSpace),Ot=c.convert(A.type),te=D(A.internalFormat,Yt,Ot,A.colorSpace),re=A.isVideoTexture!==!0,Ge=gt.__version===void 0||pt===!0,V=Mt.dataReady;let Rt=W(A,Kt);st(r.TEXTURE_CUBE_MAP,A);let ft;if(_e){re&&Ge&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,te,Kt.width,Kt.height);for(let vt=0;vt<6;vt++){ft=Bt[vt].mipmaps;for(let wt=0;wt<ft.length;wt++){const Lt=ft[wt];A.format!==Ii?Yt!==null?re?V&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,0,0,Lt.width,Lt.height,Yt,Lt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,te,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,0,0,Lt.width,Lt.height,Yt,Ot,Lt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,te,Lt.width,Lt.height,0,Yt,Ot,Lt.data)}}}else{if(ft=A.mipmaps,re&&Ge){ft.length>0&&Rt++;const vt=Zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,te,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(At){re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt[vt].width,Bt[vt].height,Yt,Ot,Bt[vt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Bt[vt].width,Bt[vt].height,0,Yt,Ot,Bt[vt].data);for(let wt=0;wt<ft.length;wt++){const ee=ft[wt].image[vt].image;re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,0,0,ee.width,ee.height,Yt,Ot,ee.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,te,ee.width,ee.height,0,Yt,Ot,ee.data)}}else{re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Yt,Ot,Bt[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Yt,Ot,Bt[vt]);for(let wt=0;wt<ft.length;wt++){const Lt=ft[wt];re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,0,0,Yt,Ot,Lt.image[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,te,Yt,Ot,Lt.image[vt])}}}S(A)&&v(r.TEXTURE_CUBE_MAP),gt.__version=Mt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Et(N,A,at,pt,Mt,gt){const Wt=c.convert(at.format,at.colorSpace),Ut=c.convert(at.type),zt=D(at.internalFormat,Wt,Ut,at.colorSpace),_e=s.get(A),At=s.get(at);if(At.__renderTarget=A,!_e.__hasExternalTextures){const Bt=Math.max(1,A.width>>gt),Kt=Math.max(1,A.height>>gt);Mt===r.TEXTURE_3D||Mt===r.TEXTURE_2D_ARRAY?n.texImage3D(Mt,gt,zt,Bt,Kt,A.depth,0,Wt,Ut,null):n.texImage2D(Mt,gt,zt,Bt,Kt,0,Wt,Ut,null)}n.bindFramebuffer(r.FRAMEBUFFER,N),ge(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pt,Mt,At.__webglTexture,0,he(A)):(Mt===r.TEXTURE_2D||Mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,pt,Mt,At.__webglTexture,gt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function xt(N,A,at){if(r.bindRenderbuffer(r.RENDERBUFFER,N),A.depthBuffer){const pt=A.depthTexture,Mt=pt&&pt.isDepthTexture?pt.type:null,gt=w(A.stencilBuffer,Mt),Wt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ut=he(A);ge(A)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ut,gt,A.width,A.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ut,gt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,gt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,N)}else{const pt=A.textures;for(let Mt=0;Mt<pt.length;Mt++){const gt=pt[Mt],Wt=c.convert(gt.format,gt.colorSpace),Ut=c.convert(gt.type),zt=D(gt.internalFormat,Wt,Ut,gt.colorSpace),_e=he(A);at&&ge(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,zt,A.width,A.height):ge(A)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,zt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,zt,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Vt(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pt=s.get(A.depthTexture);pt.__renderTarget=A,(!pt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),ut(A.depthTexture,0);const Mt=pt.__webglTexture,gt=he(A);if(A.depthTexture.format===Xr)ge(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0);else if(A.depthTexture.format===Kr)ge(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Gt(N){const A=s.get(N),at=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const pt=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),pt){const Mt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,pt.removeEventListener("dispose",Mt)};pt.addEventListener("dispose",Mt),A.__depthDisposeCallback=Mt}A.__boundDepthTexture=pt}if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(at)throw new Error("target.depthTexture not supported in Cube render targets");Vt(A.__webglFramebuffer,N)}else if(at){A.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[pt]),A.__webglDepthbuffer[pt]===void 0)A.__webglDepthbuffer[pt]=r.createRenderbuffer(),xt(A.__webglDepthbuffer[pt],N,!1);else{const Mt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=A.__webglDepthbuffer[pt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,gt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),xt(A.__webglDepthbuffer,N,!1);else{const pt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,pt,r.RENDERBUFFER,Mt)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function ae(N,A,at){const pt=s.get(N);A!==void 0&&Et(pt.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),at!==void 0&&Gt(N)}function He(N){const A=N.texture,at=s.get(N),pt=s.get(A);N.addEventListener("dispose",O);const Mt=N.textures,gt=N.isWebGLCubeRenderTarget===!0,Wt=Mt.length>1;if(Wt||(pt.__webglTexture===void 0&&(pt.__webglTexture=r.createTexture()),pt.__version=A.version,f.memory.textures++),gt){at.__webglFramebuffer=[];for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer[Ut]=[];for(let zt=0;zt<A.mipmaps.length;zt++)at.__webglFramebuffer[Ut][zt]=r.createFramebuffer()}else at.__webglFramebuffer[Ut]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer=[];for(let Ut=0;Ut<A.mipmaps.length;Ut++)at.__webglFramebuffer[Ut]=r.createFramebuffer()}else at.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let Ut=0,zt=Mt.length;Ut<zt;Ut++){const _e=s.get(Mt[Ut]);_e.__webglTexture===void 0&&(_e.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&ge(N)===!1){at.__webglMultisampledFramebuffer=r.createFramebuffer(),at.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let Ut=0;Ut<Mt.length;Ut++){const zt=Mt[Ut];at.__webglColorRenderbuffer[Ut]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,at.__webglColorRenderbuffer[Ut]);const _e=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=D(zt.internalFormat,_e,At,zt.colorSpace,N.isXRRenderTarget===!0),Kt=he(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,Bt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ut,r.RENDERBUFFER,at.__webglColorRenderbuffer[Ut])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(at.__webglDepthRenderbuffer=r.createRenderbuffer(),xt(at.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){n.bindTexture(r.TEXTURE_CUBE_MAP,pt.__webglTexture),st(r.TEXTURE_CUBE_MAP,A);for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(at.__webglFramebuffer[Ut][zt],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,zt);else Et(at.__webglFramebuffer[Ut],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0);S(A)&&v(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Wt){for(let Ut=0,zt=Mt.length;Ut<zt;Ut++){const _e=Mt[Ut],At=s.get(_e);n.bindTexture(r.TEXTURE_2D,At.__webglTexture),st(r.TEXTURE_2D,_e),Et(at.__webglFramebuffer,N,_e,r.COLOR_ATTACHMENT0+Ut,r.TEXTURE_2D,0),S(_e)&&v(r.TEXTURE_2D)}n.unbindTexture()}else{let Ut=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Ut=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Ut,pt.__webglTexture),st(Ut,A),A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(at.__webglFramebuffer[zt],N,A,r.COLOR_ATTACHMENT0,Ut,zt);else Et(at.__webglFramebuffer,N,A,r.COLOR_ATTACHMENT0,Ut,0);S(A)&&v(Ut),n.unbindTexture()}N.depthBuffer&&Gt(N)}function de(N){const A=N.textures;for(let at=0,pt=A.length;at<pt;at++){const Mt=A[at];if(S(Mt)){const gt=L(N),Wt=s.get(Mt).__webglTexture;n.bindTexture(gt,Wt),v(gt),n.unbindTexture()}}}const Ke=[],q=[];function Nn(N){if(N.samples>0){if(ge(N)===!1){const A=N.textures,at=N.width,pt=N.height;let Mt=r.COLOR_BUFFER_BIT;const gt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=s.get(N),Ut=A.length>1;if(Ut)for(let zt=0;zt<A.length;zt++)n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let zt=0;zt<A.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Mt|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Mt|=r.STENCIL_BUFFER_BIT)),Ut){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const _e=s.get(A[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,_e,0)}r.blitFramebuffer(0,0,at,pt,0,0,at,pt,Mt,r.NEAREST),m===!0&&(Ke.length=0,q.length=0,Ke.push(r.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Ke.push(gt),q.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,q)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ke))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Ut)for(let zt=0;zt<A.length;zt++){n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const _e=s.get(A[zt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,_e,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&m){const A=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function he(N){return Math.min(l.maxSamples,N.samples)}function ge(N){const A=s.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Qt(N){const A=f.render.frame;g.get(N)!==A&&(g.set(N,A),N.update())}function Pe(N,A){const at=N.colorSpace,pt=N.format,Mt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||at!==$r&&at!==rs&&(Ae.getTransfer(at)===Fe?(pt!==Ii||Mt!==Aa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",at)),A}function Zt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=J,this.resetTextureUnits=Q,this.setTexture2D=ut,this.setTexture2DArray=P,this.setTexture3D=j,this.setTextureCube=Z,this.rebindTextures=ae,this.setupRenderTarget=He,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=Nn,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ge}function t2(r,t){function n(s,l=rs){let c;const f=Ae.getTransfer(l);if(s===Aa)return r.UNSIGNED_BYTE;if(s===lp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===cp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Wv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Xv)return r.BYTE;if(s===qv)return r.SHORT;if(s===ll)return r.UNSIGNED_SHORT;if(s===op)return r.INT;if(s===qs)return r.UNSIGNED_INT;if(s===Ma)return r.FLOAT;if(s===Jr)return r.HALF_FLOAT;if(s===Yv)return r.ALPHA;if(s===jv)return r.RGB;if(s===Ii)return r.RGBA;if(s===Zv)return r.LUMINANCE;if(s===Kv)return r.LUMINANCE_ALPHA;if(s===Xr)return r.DEPTH_COMPONENT;if(s===Kr)return r.DEPTH_STENCIL;if(s===Qv)return r.RED;if(s===up)return r.RED_INTEGER;if(s===Jv)return r.RG;if(s===fp)return r.RG_INTEGER;if(s===hp)return r.RGBA_INTEGER;if(s===tu||s===eu||s===nu||s===iu)if(f===Fe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===tu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===eu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===iu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===tu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===eu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===nu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===iu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Cd||s===Dd||s===Ud||s===Ld)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Cd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Dd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ud)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ld)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Nd||s===Od||s===Pd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Nd||s===Od)return f===Fe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Pd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===zd||s===Bd||s===Id||s===Fd||s===Hd||s===Gd||s===Vd||s===kd||s===Xd||s===qd||s===Wd||s===Yd||s===jd||s===Zd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===zd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Bd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Id)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Fd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Hd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Gd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Vd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===kd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Xd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===qd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Wd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Yd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===jd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Zd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===au||s===Kd||s===Qd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===au)return f===Fe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Kd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Qd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===$v||s===Jd||s===$d||s===tp)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===au)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Jd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===$d)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===tp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Zr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:n}}class e2 extends Ai{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ks extends Vn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const n2={type:"move"};class fd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ks,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ks,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ks,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const s of t.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,s){let l=null,c=null,f=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const T of t.hand.values()){const S=n.getJointPose(T,s),v=this._getHandJoint(p,T);S!==null&&(v.matrix.fromArray(S.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=S.radius),v.visible=S!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],x=g.position.distanceTo(_.position),M=.02,E=.005;p.inputState.pinching&&x>M+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&x<=M-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=n.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(n2)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const s=new ks;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[n.jointName]=s,t.add(s)}return t.joints[n.jointName]}}const i2=`
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

}`;class s2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,s){if(this.texture===null){const l=new Gn,c=t.properties.get(l);c.__webglTexture=n.texture,(n.depthNear!=s.depthNear||n.depthFar!=s.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,s=new Hi({vertexShader:i2,fragmentShader:a2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Tn(new mu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class r2 extends to{constructor(t,n){super();const s=this;let l=null,c=1,f=null,d="local-floor",m=1,p=null,g=null,_=null,x=null,M=null,E=null;const T=new s2,S=n.getContextAttributes();let v=null,L=null;const D=[],w=[],W=new Ce;let I=null;const O=new Ai;O.viewport=new on;const H=new Ai;H.viewport=new on;const U=[O,H],R=new e2;let F=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ht=D[K];return ht===void 0&&(ht=new fd,D[K]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(K){let ht=D[K];return ht===void 0&&(ht=new fd,D[K]=ht),ht.getGripSpace()},this.getHand=function(K){let ht=D[K];return ht===void 0&&(ht=new fd,D[K]=ht),ht.getHandSpace()};function J(K){const ht=w.indexOf(K.inputSource);if(ht===-1)return;const Et=D[ht];Et!==void 0&&(Et.update(K.inputSource,K.frame,p||f),Et.dispatchEvent({type:K.type,data:K.inputSource}))}function ct(){l.removeEventListener("select",J),l.removeEventListener("selectstart",J),l.removeEventListener("selectend",J),l.removeEventListener("squeeze",J),l.removeEventListener("squeezestart",J),l.removeEventListener("squeezeend",J),l.removeEventListener("end",ct),l.removeEventListener("inputsourceschange",ut);for(let K=0;K<D.length;K++){const ht=w[K];ht!==null&&(w[K]=null,D[K].disconnect(ht))}F=null,Q=null,T.reset(),t.setRenderTarget(v),M=null,x=null,_=null,l=null,L=null,yt.stop(),s.isPresenting=!1,t.setPixelRatio(I),t.setSize(W.width,W.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){c=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){d=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(K){p=K},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(v=t.getRenderTarget(),l.addEventListener("select",J),l.addEventListener("selectstart",J),l.addEventListener("selectend",J),l.addEventListener("squeeze",J),l.addEventListener("squeezestart",J),l.addEventListener("squeezeend",J),l.addEventListener("end",ct),l.addEventListener("inputsourceschange",ut),S.xrCompatible!==!0&&await n.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(W),l.renderState.layers===void 0){const ht={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,ht),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),L=new cs(M.framebufferWidth,M.framebufferHeight,{format:Ii,type:Aa,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let ht=null,Et=null,xt=null;S.depth&&(xt=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ht=S.stencil?Kr:Xr,Et=S.stencil?Zr:qs);const Vt={colorFormat:n.RGBA8,depthFormat:xt,scaleFactor:c};_=new XRWebGLBinding(l,n),x=_.createProjectionLayer(Vt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),L=new cs(x.textureWidth,x.textureHeight,{format:Ii,type:Aa,depthTexture:new px(x.textureWidth,x.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(d),yt.setContext(l),yt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function ut(K){for(let ht=0;ht<K.removed.length;ht++){const Et=K.removed[ht],xt=w.indexOf(Et);xt>=0&&(w[xt]=null,D[xt].disconnect(Et))}for(let ht=0;ht<K.added.length;ht++){const Et=K.added[ht];let xt=w.indexOf(Et);if(xt===-1){for(let Gt=0;Gt<D.length;Gt++)if(Gt>=w.length){w.push(Et),xt=Gt;break}else if(w[Gt]===null){w[Gt]=Et,xt=Gt;break}if(xt===-1)break}const Vt=D[xt];Vt&&Vt.connect(Et)}}const P=new $,j=new $;function Z(K,ht,Et){P.setFromMatrixPosition(ht.matrixWorld),j.setFromMatrixPosition(Et.matrixWorld);const xt=P.distanceTo(j),Vt=ht.projectionMatrix.elements,Gt=Et.projectionMatrix.elements,ae=Vt[14]/(Vt[10]-1),He=Vt[14]/(Vt[10]+1),de=(Vt[9]+1)/Vt[5],Ke=(Vt[9]-1)/Vt[5],q=(Vt[8]-1)/Vt[0],Nn=(Gt[8]+1)/Gt[0],he=ae*q,ge=ae*Nn,Qt=xt/(-q+Nn),Pe=Qt*-q;if(ht.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Pe),K.translateZ(Qt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Vt[10]===-1)K.projectionMatrix.copy(ht.projectionMatrix),K.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const Zt=ae+Qt,N=He+Qt,A=he-Pe,at=ge+(xt-Pe),pt=de*He/N*Zt,Mt=Ke*He/N*Zt;K.projectionMatrix.makePerspective(A,at,pt,Mt,Zt,N),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function St(K,ht){ht===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ht.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let ht=K.near,Et=K.far;T.texture!==null&&(T.depthNear>0&&(ht=T.depthNear),T.depthFar>0&&(Et=T.depthFar)),R.near=H.near=O.near=ht,R.far=H.far=O.far=Et,(F!==R.near||Q!==R.far)&&(l.updateRenderState({depthNear:R.near,depthFar:R.far}),F=R.near,Q=R.far),O.layers.mask=K.layers.mask|2,H.layers.mask=K.layers.mask|4,R.layers.mask=O.layers.mask|H.layers.mask;const xt=K.parent,Vt=R.cameras;St(R,xt);for(let Gt=0;Gt<Vt.length;Gt++)St(Vt[Gt],xt);Vt.length===2?Z(R,O,H):R.projectionMatrix.copy(O.projectionMatrix),Tt(K,R,xt)};function Tt(K,ht,Et){Et===null?K.matrix.copy(ht.matrixWorld):(K.matrix.copy(Et.matrixWorld),K.matrix.invert(),K.matrix.multiply(ht.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ht.projectionMatrix),K.projectionMatrixInverse.copy(ht.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ep*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&M===null))return m},this.setFoveation=function(K){m=K,x!==null&&(x.fixedFoveation=K),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=K)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(R)};let z=null;function st(K,ht){if(g=ht.getViewerPose(p||f),E=ht,g!==null){const Et=g.views;M!==null&&(t.setRenderTargetFramebuffer(L,M.framebuffer),t.setRenderTarget(L));let xt=!1;Et.length!==R.cameras.length&&(R.cameras.length=0,xt=!0);for(let Gt=0;Gt<Et.length;Gt++){const ae=Et[Gt];let He=null;if(M!==null)He=M.getViewport(ae);else{const Ke=_.getViewSubImage(x,ae);He=Ke.viewport,Gt===0&&(t.setRenderTargetTextures(L,Ke.colorTexture,x.ignoreDepthValues?void 0:Ke.depthStencilTexture),t.setRenderTarget(L))}let de=U[Gt];de===void 0&&(de=new Ai,de.layers.enable(Gt),de.viewport=new on,U[Gt]=de),de.matrix.fromArray(ae.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(ae.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(He.x,He.y,He.width,He.height),Gt===0&&(R.matrix.copy(de.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),xt===!0&&R.cameras.push(de)}const Vt=l.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const Gt=_.getDepthInformation(Et[0]);Gt&&Gt.isValid&&Gt.texture&&T.init(t,Gt,l.renderState)}}for(let Et=0;Et<D.length;Et++){const xt=w[Et],Vt=D[Et];xt!==null&&Vt!==void 0&&Vt.update(xt,ht,p||f)}z&&z(K,ht),ht.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ht}),E=null}const yt=new hx;yt.setAnimationLoop(st),this.setAnimationLoop=function(K){z=K},this.dispose=function(){}}}const Ns=new Ra,o2=new an;function l2(r,t){function n(S,v){S.matrixAutoUpdate===!0&&S.updateMatrix(),v.value.copy(S.matrix)}function s(S,v){v.color.getRGB(S.fogColor.value,lx(r)),v.isFog?(S.fogNear.value=v.near,S.fogFar.value=v.far):v.isFogExp2&&(S.fogDensity.value=v.density)}function l(S,v,L,D,w){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(S,v):v.isMeshToonMaterial?(c(S,v),_(S,v)):v.isMeshPhongMaterial?(c(S,v),g(S,v)):v.isMeshStandardMaterial?(c(S,v),x(S,v),v.isMeshPhysicalMaterial&&M(S,v,w)):v.isMeshMatcapMaterial?(c(S,v),E(S,v)):v.isMeshDepthMaterial?c(S,v):v.isMeshDistanceMaterial?(c(S,v),T(S,v)):v.isMeshNormalMaterial?c(S,v):v.isLineBasicMaterial?(f(S,v),v.isLineDashedMaterial&&d(S,v)):v.isPointsMaterial?m(S,v,L,D):v.isSpriteMaterial?p(S,v):v.isShadowMaterial?(S.color.value.copy(v.color),S.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(S,v){S.opacity.value=v.opacity,v.color&&S.diffuse.value.copy(v.color),v.emissive&&S.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.bumpMap&&(S.bumpMap.value=v.bumpMap,n(v.bumpMap,S.bumpMapTransform),S.bumpScale.value=v.bumpScale,v.side===ei&&(S.bumpScale.value*=-1)),v.normalMap&&(S.normalMap.value=v.normalMap,n(v.normalMap,S.normalMapTransform),S.normalScale.value.copy(v.normalScale),v.side===ei&&S.normalScale.value.negate()),v.displacementMap&&(S.displacementMap.value=v.displacementMap,n(v.displacementMap,S.displacementMapTransform),S.displacementScale.value=v.displacementScale,S.displacementBias.value=v.displacementBias),v.emissiveMap&&(S.emissiveMap.value=v.emissiveMap,n(v.emissiveMap,S.emissiveMapTransform)),v.specularMap&&(S.specularMap.value=v.specularMap,n(v.specularMap,S.specularMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest);const L=t.get(v),D=L.envMap,w=L.envMapRotation;D&&(S.envMap.value=D,Ns.copy(w),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),S.envMapRotation.value.setFromMatrix4(o2.makeRotationFromEuler(Ns)),S.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=v.reflectivity,S.ior.value=v.ior,S.refractionRatio.value=v.refractionRatio),v.lightMap&&(S.lightMap.value=v.lightMap,S.lightMapIntensity.value=v.lightMapIntensity,n(v.lightMap,S.lightMapTransform)),v.aoMap&&(S.aoMap.value=v.aoMap,S.aoMapIntensity.value=v.aoMapIntensity,n(v.aoMap,S.aoMapTransform))}function f(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform))}function d(S,v){S.dashSize.value=v.dashSize,S.totalSize.value=v.dashSize+v.gapSize,S.scale.value=v.scale}function m(S,v,L,D){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.size.value=v.size*L,S.scale.value=D*.5,v.map&&(S.map.value=v.map,n(v.map,S.uvTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function p(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.rotation.value=v.rotation,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function g(S,v){S.specular.value.copy(v.specular),S.shininess.value=Math.max(v.shininess,1e-4)}function _(S,v){v.gradientMap&&(S.gradientMap.value=v.gradientMap)}function x(S,v){S.metalness.value=v.metalness,v.metalnessMap&&(S.metalnessMap.value=v.metalnessMap,n(v.metalnessMap,S.metalnessMapTransform)),S.roughness.value=v.roughness,v.roughnessMap&&(S.roughnessMap.value=v.roughnessMap,n(v.roughnessMap,S.roughnessMapTransform)),v.envMap&&(S.envMapIntensity.value=v.envMapIntensity)}function M(S,v,L){S.ior.value=v.ior,v.sheen>0&&(S.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),S.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(S.sheenColorMap.value=v.sheenColorMap,n(v.sheenColorMap,S.sheenColorMapTransform)),v.sheenRoughnessMap&&(S.sheenRoughnessMap.value=v.sheenRoughnessMap,n(v.sheenRoughnessMap,S.sheenRoughnessMapTransform))),v.clearcoat>0&&(S.clearcoat.value=v.clearcoat,S.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(S.clearcoatMap.value=v.clearcoatMap,n(v.clearcoatMap,S.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,n(v.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(S.clearcoatNormalMap.value=v.clearcoatNormalMap,n(v.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===ei&&S.clearcoatNormalScale.value.negate())),v.dispersion>0&&(S.dispersion.value=v.dispersion),v.iridescence>0&&(S.iridescence.value=v.iridescence,S.iridescenceIOR.value=v.iridescenceIOR,S.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(S.iridescenceMap.value=v.iridescenceMap,n(v.iridescenceMap,S.iridescenceMapTransform)),v.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=v.iridescenceThicknessMap,n(v.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),v.transmission>0&&(S.transmission.value=v.transmission,S.transmissionSamplerMap.value=L.texture,S.transmissionSamplerSize.value.set(L.width,L.height),v.transmissionMap&&(S.transmissionMap.value=v.transmissionMap,n(v.transmissionMap,S.transmissionMapTransform)),S.thickness.value=v.thickness,v.thicknessMap&&(S.thicknessMap.value=v.thicknessMap,n(v.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=v.attenuationDistance,S.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(S.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(S.anisotropyMap.value=v.anisotropyMap,n(v.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=v.specularIntensity,S.specularColor.value.copy(v.specularColor),v.specularColorMap&&(S.specularColorMap.value=v.specularColorMap,n(v.specularColorMap,S.specularColorMapTransform)),v.specularIntensityMap&&(S.specularIntensityMap.value=v.specularIntensityMap,n(v.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,v){v.matcap&&(S.matcap.value=v.matcap)}function T(S,v){const L=t.get(v).light;S.referencePosition.value.setFromMatrixPosition(L.matrixWorld),S.nearDistance.value=L.shadow.camera.near,S.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function c2(r,t,n,s){let l={},c={},f=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(L,D){const w=D.program;s.uniformBlockBinding(L,w)}function p(L,D){let w=l[L.id];w===void 0&&(E(L),w=g(L),l[L.id]=w,L.addEventListener("dispose",S));const W=D.program;s.updateUBOMapping(L,W);const I=t.render.frame;c[L.id]!==I&&(x(L),c[L.id]=I)}function g(L){const D=_();L.__bindingPointIndex=D;const w=r.createBuffer(),W=L.__size,I=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,W,I),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,D,w),w}function _(){for(let L=0;L<d;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(L){const D=l[L.id],w=L.uniforms,W=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,D);for(let I=0,O=w.length;I<O;I++){const H=Array.isArray(w[I])?w[I]:[w[I]];for(let U=0,R=H.length;U<R;U++){const F=H[U];if(M(F,I,U,W)===!0){const Q=F.__offset,J=Array.isArray(F.value)?F.value:[F.value];let ct=0;for(let ut=0;ut<J.length;ut++){const P=J[ut],j=T(P);typeof P=="number"||typeof P=="boolean"?(F.__data[0]=P,r.bufferSubData(r.UNIFORM_BUFFER,Q+ct,F.__data)):P.isMatrix3?(F.__data[0]=P.elements[0],F.__data[1]=P.elements[1],F.__data[2]=P.elements[2],F.__data[3]=0,F.__data[4]=P.elements[3],F.__data[5]=P.elements[4],F.__data[6]=P.elements[5],F.__data[7]=0,F.__data[8]=P.elements[6],F.__data[9]=P.elements[7],F.__data[10]=P.elements[8],F.__data[11]=0):(P.toArray(F.__data,ct),ct+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,Q,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(L,D,w,W){const I=L.value,O=D+"_"+w;if(W[O]===void 0)return typeof I=="number"||typeof I=="boolean"?W[O]=I:W[O]=I.clone(),!0;{const H=W[O];if(typeof I=="number"||typeof I=="boolean"){if(H!==I)return W[O]=I,!0}else if(H.equals(I)===!1)return H.copy(I),!0}return!1}function E(L){const D=L.uniforms;let w=0;const W=16;for(let O=0,H=D.length;O<H;O++){const U=Array.isArray(D[O])?D[O]:[D[O]];for(let R=0,F=U.length;R<F;R++){const Q=U[R],J=Array.isArray(Q.value)?Q.value:[Q.value];for(let ct=0,ut=J.length;ct<ut;ct++){const P=J[ct],j=T(P),Z=w%W,St=Z%j.boundary,Tt=Z+St;w+=St,Tt!==0&&W-Tt<j.storage&&(w+=W-Tt),Q.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=w,w+=j.storage}}}const I=w%W;return I>0&&(w+=W-I),L.__size=w,L.__cache={},this}function T(L){const D={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(D.boundary=4,D.storage=4):L.isVector2?(D.boundary=8,D.storage=8):L.isVector3||L.isColor?(D.boundary=16,D.storage=12):L.isVector4?(D.boundary=16,D.storage=16):L.isMatrix3?(D.boundary=48,D.storage=48):L.isMatrix4?(D.boundary=64,D.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),D}function S(L){const D=L.target;D.removeEventListener("dispose",S);const w=f.indexOf(D.__bindingPointIndex);f.splice(w,1),r.deleteBuffer(l[D.id]),delete l[D.id],delete c[D.id]}function v(){for(const L in l)r.deleteBuffer(l[L]);f=[],l={},c={}}return{bind:m,update:p,dispose:v}}class u2{constructor(t={}){const{canvas:n=$M(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),T=new Int32Array(4);let S=null,v=null;const L=[],D=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hi,this.toneMapping=os,this.toneMappingExposure=1;const w=this;let W=!1,I=0,O=0,H=null,U=-1,R=null;const F=new on,Q=new on;let J=null;const ct=new fe(0);let ut=0,P=n.width,j=n.height,Z=1,St=null,Tt=null;const z=new on(0,0,P,j),st=new on(0,0,P,j);let yt=!1;const K=new fx;let ht=!1,Et=!1;const xt=new an,Vt=new an,Gt=new $,ae=new on,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Ke(){return H===null?Z:1}let q=s;function Nn(C,k){return n.getContext(C,k)}try{const C={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${rp}`),n.addEventListener("webglcontextlost",vt,!1),n.addEventListener("webglcontextrestored",wt,!1),n.addEventListener("webglcontextcreationerror",Lt,!1),q===null){const k="webgl2";if(q=Nn(k,C),q===null)throw Nn(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let he,ge,Qt,Pe,Zt,N,A,at,pt,Mt,gt,Wt,Ut,zt,_e,At,Bt,Kt,Yt,Ot,te,re,Ge,V;function Rt(){he=new mb(q),he.init(),re=new t2(q,he),ge=new cb(q,he,t,re),Qt=new QA(q,he),ge.reverseDepthBuffer&&x&&Qt.buffers.depth.setReversed(!0),Pe=new vb(q),Zt=new zA,N=new $A(q,he,Qt,Zt,ge,re,Pe),A=new fb(w),at=new pb(w),pt=new bE(q),Ge=new ob(q,pt),Mt=new gb(q,pt,Pe,Ge),gt=new yb(q,Mt,pt,Pe),Yt=new xb(q,ge,N),At=new ub(Zt),Wt=new PA(w,A,at,he,ge,Ge,At),Ut=new l2(w,Zt),zt=new IA,_e=new XA(he),Kt=new rb(w,A,at,Qt,gt,M,m),Bt=new ZA(w,gt,ge),V=new c2(q,Pe,ge,Qt),Ot=new lb(q,he,Pe),te=new _b(q,he,Pe),Pe.programs=Wt.programs,w.capabilities=ge,w.extensions=he,w.properties=Zt,w.renderLists=zt,w.shadowMap=Bt,w.state=Qt,w.info=Pe}Rt();const ft=new r2(w,q);this.xr=ft,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const C=he.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=he.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(C){C!==void 0&&(Z=C,this.setSize(P,j,!1))},this.getSize=function(C){return C.set(P,j)},this.setSize=function(C,k,ot=!0){if(ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=C,j=k,n.width=Math.floor(C*Z),n.height=Math.floor(k*Z),ot===!0&&(n.style.width=C+"px",n.style.height=k+"px"),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(P*Z,j*Z).floor()},this.setDrawingBufferSize=function(C,k,ot){P=C,j=k,Z=ot,n.width=Math.floor(C*ot),n.height=Math.floor(k*ot),this.setViewport(0,0,C,k)},this.getCurrentViewport=function(C){return C.copy(F)},this.getViewport=function(C){return C.copy(z)},this.setViewport=function(C,k,ot,rt){C.isVector4?z.set(C.x,C.y,C.z,C.w):z.set(C,k,ot,rt),Qt.viewport(F.copy(z).multiplyScalar(Z).round())},this.getScissor=function(C){return C.copy(st)},this.setScissor=function(C,k,ot,rt){C.isVector4?st.set(C.x,C.y,C.z,C.w):st.set(C,k,ot,rt),Qt.scissor(Q.copy(st).multiplyScalar(Z).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(C){Qt.setScissorTest(yt=C)},this.setOpaqueSort=function(C){St=C},this.setTransparentSort=function(C){Tt=C},this.getClearColor=function(C){return C.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(C=!0,k=!0,ot=!0){let rt=0;if(C){let X=!1;if(H!==null){const bt=H.texture.format;X=bt===hp||bt===fp||bt===up}if(X){const bt=H.texture.type,Ct=bt===Aa||bt===qs||bt===ll||bt===Zr||bt===lp||bt===cp,Dt=Kt.getClearColor(),kt=Kt.getClearAlpha(),ne=Dt.r,$t=Dt.g,It=Dt.b;Ct?(E[0]=ne,E[1]=$t,E[2]=It,E[3]=kt,q.clearBufferuiv(q.COLOR,0,E)):(T[0]=ne,T[1]=$t,T[2]=It,T[3]=kt,q.clearBufferiv(q.COLOR,0,T))}else rt|=q.COLOR_BUFFER_BIT}k&&(rt|=q.DEPTH_BUFFER_BIT),ot&&(rt|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",vt,!1),n.removeEventListener("webglcontextrestored",wt,!1),n.removeEventListener("webglcontextcreationerror",Lt,!1),zt.dispose(),_e.dispose(),Zt.dispose(),A.dispose(),at.dispose(),gt.dispose(),Ge.dispose(),V.dispose(),Wt.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",io),ft.removeEventListener("sessionend",ao),Gi.stop()};function vt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),W=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),W=!1;const C=Pe.autoReset,k=Bt.enabled,ot=Bt.autoUpdate,rt=Bt.needsUpdate,X=Bt.type;Rt(),Pe.autoReset=C,Bt.enabled=k,Bt.autoUpdate=ot,Bt.needsUpdate=rt,Bt.type=X}function Lt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ee(C){const k=C.target;k.removeEventListener("dispose",ee),Qe(k)}function Qe(C){pn(C),Zt.remove(C)}function pn(C){const k=Zt.get(C).programs;k!==void 0&&(k.forEach(function(ot){Wt.releaseProgram(ot)}),C.isShaderMaterial&&Wt.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,ot,rt,X,bt){k===null&&(k=He);const Ct=X.isMesh&&X.matrixWorld.determinant()<0,Dt=ro(C,k,ot,rt,X);Qt.setMaterial(rt,Ct);let kt=ot.index,ne=1;if(rt.wireframe===!0){if(kt=Mt.getWireframeAttribute(ot),kt===void 0)return;ne=2}const $t=ot.drawRange,It=ot.attributes.position;let be=$t.start*ne,ze=($t.start+$t.count)*ne;bt!==null&&(be=Math.max(be,bt.start*ne),ze=Math.min(ze,(bt.start+bt.count)*ne)),kt!==null?(be=Math.max(be,0),ze=Math.min(ze,kt.count)):It!=null&&(be=Math.max(be,0),ze=Math.min(ze,It.count));const Ve=ze-be;if(Ve<0||Ve===1/0)return;Ge.setup(X,rt,Dt,ot,kt);let On,Se=Ot;if(kt!==null&&(On=pt.get(kt),Se=te,Se.setIndex(On)),X.isMesh)rt.wireframe===!0?(Qt.setLineWidth(rt.wireframeLinewidth*Ke()),Se.setMode(q.LINES)):Se.setMode(q.TRIANGLES);else if(X.isLine){let Xt=rt.linewidth;Xt===void 0&&(Xt=1),Qt.setLineWidth(Xt*Ke()),X.isLineSegments?Se.setMode(q.LINES):X.isLineLoop?Se.setMode(q.LINE_LOOP):Se.setMode(q.LINE_STRIP)}else X.isPoints?Se.setMode(q.POINTS):X.isSprite&&Se.setMode(q.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Se.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))Se.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Xt=X._multiDrawStarts,mn=X._multiDrawCounts,se=X._multiDrawCount,Xn=kt?pt.get(kt).bytesPerElement:1,wa=Zt.get(rt).currentProgram.getUniforms();for(let Rn=0;Rn<se;Rn++)wa.setValue(q,"_gl_DrawID",Rn),Se.render(Xt[Rn]/Xn,mn[Rn])}else if(X.isInstancedMesh)Se.renderInstances(be,Ve,X.count);else if(ot.isInstancedBufferGeometry){const Xt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,mn=Math.min(ot.instanceCount,Xt);Se.renderInstances(be,Ve,mn)}else Se.render(be,Ve)};function Re(C,k,ot){C.transparent===!0&&C.side===Sa&&C.forceSinglePass===!1?(C.side=ei,C.needsUpdate=!0,tn(C,k,ot),C.side=ls,C.needsUpdate=!0,tn(C,k,ot),C.side=Sa):tn(C,k,ot)}this.compile=function(C,k,ot=null){ot===null&&(ot=C),v=_e.get(ot),v.init(k),D.push(v),ot.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),C!==ot&&C.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights();const rt=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const bt=X.material;if(bt)if(Array.isArray(bt))for(let Ct=0;Ct<bt.length;Ct++){const Dt=bt[Ct];Re(Dt,ot,X),rt.add(Dt)}else Re(bt,ot,X),rt.add(bt)}),D.pop(),v=null,rt},this.compileAsync=function(C,k,ot=null){const rt=this.compile(C,k,ot);return new Promise(X=>{function bt(){if(rt.forEach(function(Ct){Zt.get(Ct).currentProgram.isReady()&&rt.delete(Ct)}),rt.size===0){X(C);return}setTimeout(bt,10)}he.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let bn=null;function wi(C){bn&&bn(C)}function io(){Gi.stop()}function ao(){Gi.start()}const Gi=new hx;Gi.setAnimationLoop(wi),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(C){bn=C,ft.setAnimationLoop(C),C===null?Gi.stop():Gi.start()},ft.addEventListener("sessionstart",io),ft.addEventListener("sessionend",ao),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(k),k=ft.getCamera()),C.isScene===!0&&C.onBeforeRender(w,C,k,H),v=_e.get(C,D.length),v.init(k),D.push(v),Vt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),K.setFromProjectionMatrix(Vt),Et=this.localClippingEnabled,ht=At.init(this.clippingPlanes,Et),S=zt.get(C,L.length),S.init(),L.push(S),ft.enabled===!0&&ft.isPresenting===!0){const bt=w.xr.getDepthSensingMesh();bt!==null&&us(bt,k,-1/0,w.sortObjects)}us(C,k,0,w.sortObjects),S.finish(),w.sortObjects===!0&&S.sort(St,Tt),de=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,de&&Kt.addToRenderList(S,C),this.info.render.frame++,ht===!0&&At.beginShadows();const ot=v.state.shadowsArray;Bt.render(ot,C,k),ht===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,X=S.transmissive;if(v.setupLights(),k.isArrayCamera){const bt=k.cameras;if(X.length>0)for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];so(rt,X,C,kt)}de&&Kt.render(C);for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];Ws(S,C,kt,kt.viewport)}}else X.length>0&&so(rt,X,C,k),de&&Kt.render(C),Ws(S,C,k);H!==null&&(N.updateMultisampleRenderTarget(H),N.updateRenderTargetMipmap(H)),C.isScene===!0&&C.onAfterRender(w,C,k),Ge.resetDefaultState(),U=-1,R=null,D.pop(),D.length>0?(v=D[D.length-1],ht===!0&&At.setGlobalState(w.clippingPlanes,v.state.camera)):v=null,L.pop(),L.length>0?S=L[L.length-1]:S=null};function us(C,k,ot,rt){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)ot=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||K.intersectsSprite(C)){rt&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Vt);const Ct=gt.update(C),Dt=C.material;Dt.visible&&S.push(C,Ct,Dt,ot,ae.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||K.intersectsObject(C))){const Ct=gt.update(C),Dt=C.material;if(rt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),ae.copy(Ct.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(Vt)),Array.isArray(Dt)){const kt=Ct.groups;for(let ne=0,$t=kt.length;ne<$t;ne++){const It=kt[ne],be=Dt[It.materialIndex];be&&be.visible&&S.push(C,Ct,be,ot,ae.z,It)}}else Dt.visible&&S.push(C,Ct,Dt,ot,ae.z,null)}}const bt=C.children;for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++)us(bt[Ct],k,ot,rt)}function Ws(C,k,ot,rt){const X=C.opaque,bt=C.transmissive,Ct=C.transparent;v.setupLightsView(ot),ht===!0&&At.setGlobalState(w.clippingPlanes,ot),rt&&Qt.viewport(F.copy(rt)),X.length>0&&fs(X,k,ot),bt.length>0&&fs(bt,k,ot),Ct.length>0&&fs(Ct,k,ot),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function so(C,k,ot,rt){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[rt.id]===void 0&&(v.state.transmissionRenderTarget[rt.id]=new cs(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Jr:Aa,minFilter:Vs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ae.workingColorSpace}));const bt=v.state.transmissionRenderTarget[rt.id],Ct=rt.viewport||F;bt.setSize(Ct.z,Ct.w);const Dt=w.getRenderTarget();w.setRenderTarget(bt),w.getClearColor(ct),ut=w.getClearAlpha(),ut<1&&w.setClearColor(16777215,.5),w.clear(),de&&Kt.render(ot);const kt=w.toneMapping;w.toneMapping=os;const ne=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),v.setupLightsView(rt),ht===!0&&At.setGlobalState(w.clippingPlanes,rt),fs(C,ot,rt),N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt),he.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let It=0,be=k.length;It<be;It++){const ze=k[It],Ve=ze.object,On=ze.geometry,Se=ze.material,Xt=ze.group;if(Se.side===Sa&&Ve.layers.test(rt.layers)){const mn=Se.side;Se.side=ei,Se.needsUpdate=!0,Ci(Ve,ot,rt,On,Se,Xt),Se.side=mn,Se.needsUpdate=!0,$t=!0}}$t===!0&&(N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt))}w.setRenderTarget(Dt),w.setClearColor(ct,ut),ne!==void 0&&(rt.viewport=ne),w.toneMapping=kt}function fs(C,k,ot){const rt=k.isScene===!0?k.overrideMaterial:null;for(let X=0,bt=C.length;X<bt;X++){const Ct=C[X],Dt=Ct.object,kt=Ct.geometry,ne=rt===null?Ct.material:rt,$t=Ct.group;Dt.layers.test(ot.layers)&&Ci(Dt,k,ot,kt,ne,$t)}}function Ci(C,k,ot,rt,X,bt){C.onBeforeRender(w,k,ot,rt,X,bt),C.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(w,k,ot,rt,C,bt),X.transparent===!0&&X.side===Sa&&X.forceSinglePass===!1?(X.side=ei,X.needsUpdate=!0,w.renderBufferDirect(ot,k,rt,X,C,bt),X.side=ls,X.needsUpdate=!0,w.renderBufferDirect(ot,k,rt,X,C,bt),X.side=Sa):w.renderBufferDirect(ot,k,rt,X,C,bt),C.onAfterRender(w,k,ot,rt,X,bt)}function tn(C,k,ot){k.isScene!==!0&&(k=He);const rt=Zt.get(C),X=v.state.lights,bt=v.state.shadowsArray,Ct=X.state.version,Dt=Wt.getParameters(C,X.state,bt,k,ot),kt=Wt.getProgramCacheKey(Dt);let ne=rt.programs;rt.environment=C.isMeshStandardMaterial?k.environment:null,rt.fog=k.fog,rt.envMap=(C.isMeshStandardMaterial?at:A).get(C.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&C.envMap===null?k.environmentRotation:C.envMapRotation,ne===void 0&&(C.addEventListener("dispose",ee),ne=new Map,rt.programs=ne);let $t=ne.get(kt);if($t!==void 0){if(rt.currentProgram===$t&&rt.lightsStateVersion===Ct)return Zi(C,Dt),$t}else Dt.uniforms=Wt.getUniforms(C),C.onBeforeCompile(Dt,w),$t=Wt.acquireProgram(Dt,kt),ne.set(kt,$t),rt.uniforms=Dt.uniforms;const It=rt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(It.clippingPlanes=At.uniform),Zi(C,Dt),rt.needsLights=vu(C),rt.lightsStateVersion=Ct,rt.needsLights&&(It.ambientLightColor.value=X.state.ambient,It.lightProbe.value=X.state.probe,It.directionalLights.value=X.state.directional,It.directionalLightShadows.value=X.state.directionalShadow,It.spotLights.value=X.state.spot,It.spotLightShadows.value=X.state.spotShadow,It.rectAreaLights.value=X.state.rectArea,It.ltc_1.value=X.state.rectAreaLTC1,It.ltc_2.value=X.state.rectAreaLTC2,It.pointLights.value=X.state.point,It.pointLightShadows.value=X.state.pointShadow,It.hemisphereLights.value=X.state.hemi,It.directionalShadowMap.value=X.state.directionalShadowMap,It.directionalShadowMatrix.value=X.state.directionalShadowMatrix,It.spotShadowMap.value=X.state.spotShadowMap,It.spotLightMatrix.value=X.state.spotLightMatrix,It.spotLightMap.value=X.state.spotLightMap,It.pointShadowMap.value=X.state.pointShadowMap,It.pointShadowMatrix.value=X.state.pointShadowMatrix),rt.currentProgram=$t,rt.uniformsList=null,$t}function An(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=su.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function Zi(C,k){const ot=Zt.get(C);ot.outputColorSpace=k.outputColorSpace,ot.batching=k.batching,ot.batchingColor=k.batchingColor,ot.instancing=k.instancing,ot.instancingColor=k.instancingColor,ot.instancingMorph=k.instancingMorph,ot.skinning=k.skinning,ot.morphTargets=k.morphTargets,ot.morphNormals=k.morphNormals,ot.morphColors=k.morphColors,ot.morphTargetsCount=k.morphTargetsCount,ot.numClippingPlanes=k.numClippingPlanes,ot.numIntersection=k.numClipIntersection,ot.vertexAlphas=k.vertexAlphas,ot.vertexTangents=k.vertexTangents,ot.toneMapping=k.toneMapping}function ro(C,k,ot,rt,X){k.isScene!==!0&&(k=He),N.resetTextureUnits();const bt=k.fog,Ct=rt.isMeshStandardMaterial?k.environment:null,Dt=H===null?w.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:$r,kt=(rt.isMeshStandardMaterial?at:A).get(rt.envMap||Ct),ne=rt.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,$t=!!ot.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),It=!!ot.morphAttributes.position,be=!!ot.morphAttributes.normal,ze=!!ot.morphAttributes.color;let Ve=os;rt.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Ve=w.toneMapping);const On=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Se=On!==void 0?On.length:0,Xt=Zt.get(rt),mn=v.state.lights;if(ht===!0&&(Et===!0||C!==R)){const Pn=C===R&&rt.id===U;At.setState(rt,C,Pn)}let se=!1;rt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==mn.state.version||Xt.outputColorSpace!==Dt||X.isBatchedMesh&&Xt.batching===!1||!X.isBatchedMesh&&Xt.batching===!0||X.isBatchedMesh&&Xt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Xt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Xt.instancing===!1||!X.isInstancedMesh&&Xt.instancing===!0||X.isSkinnedMesh&&Xt.skinning===!1||!X.isSkinnedMesh&&Xt.skinning===!0||X.isInstancedMesh&&Xt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Xt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Xt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Xt.instancingMorph===!1&&X.morphTexture!==null||Xt.envMap!==kt||rt.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==At.numPlanes||Xt.numIntersection!==At.numIntersection)||Xt.vertexAlphas!==ne||Xt.vertexTangents!==$t||Xt.morphTargets!==It||Xt.morphNormals!==be||Xt.morphColors!==ze||Xt.toneMapping!==Ve||Xt.morphTargetsCount!==Se)&&(se=!0):(se=!0,Xt.__version=rt.version);let Xn=Xt.currentProgram;se===!0&&(Xn=tn(rt,k,X));let wa=!1,Rn=!1,Ca=!1;const Oe=Xn.getUniforms(),pi=Xt.uniforms;if(Qt.useProgram(Xn.program)&&(wa=!0,Rn=!0,Ca=!0),rt.id!==U&&(U=rt.id,Rn=!0),wa||R!==C){Qt.buffers.depth.getReversed()?(xt.copy(C.projectionMatrix),eE(xt),nE(xt),Oe.setValue(q,"projectionMatrix",xt)):Oe.setValue(q,"projectionMatrix",C.projectionMatrix),Oe.setValue(q,"viewMatrix",C.matrixWorldInverse);const Di=Oe.map.cameraPosition;Di!==void 0&&Di.setValue(q,Gt.setFromMatrixPosition(C.matrixWorld)),ge.logarithmicDepthBuffer&&Oe.setValue(q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Oe.setValue(q,"isOrthographic",C.isOrthographicCamera===!0),R!==C&&(R=C,Rn=!0,Ca=!0)}if(X.isSkinnedMesh){Oe.setOptional(q,X,"bindMatrix"),Oe.setOptional(q,X,"bindMatrixInverse");const Pn=X.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),Oe.setValue(q,"boneTexture",Pn.boneTexture,N))}X.isBatchedMesh&&(Oe.setOptional(q,X,"batchingTexture"),Oe.setValue(q,"batchingTexture",X._matricesTexture,N),Oe.setOptional(q,X,"batchingIdTexture"),Oe.setValue(q,"batchingIdTexture",X._indirectTexture,N),Oe.setOptional(q,X,"batchingColorTexture"),X._colorsTexture!==null&&Oe.setValue(q,"batchingColorTexture",X._colorsTexture,N));const Sn=ot.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&Yt.update(X,ot,Xn),(Rn||Xt.receiveShadow!==X.receiveShadow)&&(Xt.receiveShadow=X.receiveShadow,Oe.setValue(q,"receiveShadow",X.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(pi.envMap.value=kt,pi.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&k.environment!==null&&(pi.envMapIntensity.value=k.environmentIntensity),Rn&&(Oe.setValue(q,"toneMappingExposure",w.toneMappingExposure),Xt.needsLights&&_u(pi,Ca),bt&&rt.fog===!0&&Ut.refreshFogUniforms(pi,bt),Ut.refreshMaterialUniforms(pi,rt,Z,j,v.state.transmissionRenderTarget[C.id]),su.upload(q,An(Xt),pi,N)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(su.upload(q,An(Xt),pi,N),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Oe.setValue(q,"center",X.center),Oe.setValue(q,"modelViewMatrix",X.modelViewMatrix),Oe.setValue(q,"normalMatrix",X.normalMatrix),Oe.setValue(q,"modelMatrix",X.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Pn=rt.uniformsGroups;for(let Di=0,mi=Pn.length;Di<mi;Di++){const Ki=Pn[Di];V.update(Ki,Xn),V.bind(Ki,Xn)}}return Xn}function _u(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function vu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(C,k,ot){Zt.get(C.texture).__webglTexture=k,Zt.get(C.depthTexture).__webglTexture=ot;const rt=Zt.get(C);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=ot===void 0,rt.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,k){const ot=Zt.get(C);ot.__webglFramebuffer=k,ot.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,ot=0){H=C,I=k,O=ot;let rt=!0,X=null,bt=!1,Ct=!1;if(C){const kt=Zt.get(C);if(kt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(q.FRAMEBUFFER,null),rt=!1;else if(kt.__webglFramebuffer===void 0)N.setupRenderTarget(C);else if(kt.__hasExternalTextures)N.rebindTextures(C,Zt.get(C.texture).__webglTexture,Zt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const It=C.depthTexture;if(kt.__boundDepthTexture!==It){if(It!==null&&Zt.has(It)&&(C.width!==It.image.width||C.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(C)}}const ne=C.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Ct=!0);const $t=Zt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[k])?X=$t[k][ot]:X=$t[k],bt=!0):C.samples>0&&N.useMultisampledRTT(C)===!1?X=Zt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?X=$t[ot]:X=$t,F.copy(C.viewport),Q.copy(C.scissor),J=C.scissorTest}else F.copy(z).multiplyScalar(Z).floor(),Q.copy(st).multiplyScalar(Z).floor(),J=yt;if(Qt.bindFramebuffer(q.FRAMEBUFFER,X)&&rt&&Qt.drawBuffers(C,X),Qt.viewport(F),Qt.scissor(Q),Qt.setScissorTest(J),bt){const kt=Zt.get(C.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+k,kt.__webglTexture,ot)}else if(Ct){const kt=Zt.get(C.texture),ne=k||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,kt.__webglTexture,ot||0,ne)}U=-1},this.readRenderTargetPixels=function(C,k,ot,rt,X,bt,Ct){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){Qt.bindFramebuffer(q.FRAMEBUFFER,Dt);try{const kt=C.texture,ne=kt.format,$t=kt.type;if(!ge.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-rt&&ot>=0&&ot<=C.height-X&&q.readPixels(k,ot,rt,X,re.convert(ne),re.convert($t),bt)}finally{const kt=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(C,k,ot,rt,X,bt,Ct){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){const kt=C.texture,ne=kt.format,$t=kt.type;if(!ge.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=C.width-rt&&ot>=0&&ot<=C.height-X){Qt.bindFramebuffer(q.FRAMEBUFFER,Dt);const It=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,It),q.bufferData(q.PIXEL_PACK_BUFFER,bt.byteLength,q.STREAM_READ),q.readPixels(k,ot,rt,X,re.convert(ne),re.convert($t),0);const be=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,be);const ze=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await tE(q,ze,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,It),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,bt),q.deleteBuffer(It),q.deleteSync(ze),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,k=null,ot=0){C.isTexture!==!0&&(sl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,C=arguments[1]);const rt=Math.pow(2,-ot),X=Math.floor(C.image.width*rt),bt=Math.floor(C.image.height*rt),Ct=k!==null?k.x:0,Dt=k!==null?k.y:0;N.setTexture2D(C,0),q.copyTexSubImage2D(q.TEXTURE_2D,ot,0,0,Ct,Dt,X,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(C,k,ot=null,rt=null,X=0){C.isTexture!==!0&&(sl("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,C=arguments[1],k=arguments[2],X=arguments[3]||0,ot=null);let bt,Ct,Dt,kt,ne,$t,It,be,ze;const Ve=C.isCompressedTexture?C.mipmaps[X]:C.image;ot!==null?(bt=ot.max.x-ot.min.x,Ct=ot.max.y-ot.min.y,Dt=ot.isBox3?ot.max.z-ot.min.z:1,kt=ot.min.x,ne=ot.min.y,$t=ot.isBox3?ot.min.z:0):(bt=Ve.width,Ct=Ve.height,Dt=Ve.depth||1,kt=0,ne=0,$t=0),rt!==null?(It=rt.x,be=rt.y,ze=rt.z):(It=0,be=0,ze=0);const On=re.convert(k.format),Se=re.convert(k.type);let Xt;k.isData3DTexture?(N.setTexture3D(k,0),Xt=q.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(N.setTexture2DArray(k,0),Xt=q.TEXTURE_2D_ARRAY):(N.setTexture2D(k,0),Xt=q.TEXTURE_2D),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,k.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,k.unpackAlignment);const mn=q.getParameter(q.UNPACK_ROW_LENGTH),se=q.getParameter(q.UNPACK_IMAGE_HEIGHT),Xn=q.getParameter(q.UNPACK_SKIP_PIXELS),wa=q.getParameter(q.UNPACK_SKIP_ROWS),Rn=q.getParameter(q.UNPACK_SKIP_IMAGES);q.pixelStorei(q.UNPACK_ROW_LENGTH,Ve.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ve.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,kt),q.pixelStorei(q.UNPACK_SKIP_ROWS,ne),q.pixelStorei(q.UNPACK_SKIP_IMAGES,$t);const Ca=C.isDataArrayTexture||C.isData3DTexture,Oe=k.isDataArrayTexture||k.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const pi=Zt.get(C),Sn=Zt.get(k),Pn=Zt.get(pi.__renderTarget),Di=Zt.get(Sn.__renderTarget);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,Pn.__webglFramebuffer),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let mi=0;mi<Dt;mi++)Ca&&q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(C).__webglTexture,X,$t+mi),C.isDepthTexture?(Oe&&q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(k).__webglTexture,X,ze+mi),q.blitFramebuffer(kt,ne,bt,Ct,It,be,bt,Ct,q.DEPTH_BUFFER_BIT,q.NEAREST)):Oe?q.copyTexSubImage3D(Xt,X,It,be,ze+mi,kt,ne,bt,Ct):q.copyTexSubImage2D(Xt,X,It,be,ze+mi,kt,ne,bt,Ct);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Oe?C.isDataTexture||C.isData3DTexture?q.texSubImage3D(Xt,X,It,be,ze,bt,Ct,Dt,On,Se,Ve.data):k.isCompressedArrayTexture?q.compressedTexSubImage3D(Xt,X,It,be,ze,bt,Ct,Dt,On,Ve.data):q.texSubImage3D(Xt,X,It,be,ze,bt,Ct,Dt,On,Se,Ve):C.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,X,It,be,bt,Ct,On,Se,Ve.data):C.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,X,It,be,Ve.width,Ve.height,On,Ve.data):q.texSubImage2D(q.TEXTURE_2D,X,It,be,bt,Ct,On,Se,Ve);q.pixelStorei(q.UNPACK_ROW_LENGTH,mn),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,se),q.pixelStorei(q.UNPACK_SKIP_PIXELS,Xn),q.pixelStorei(q.UNPACK_SKIP_ROWS,wa),q.pixelStorei(q.UNPACK_SKIP_IMAGES,Rn),X===0&&k.generateMipmaps&&q.generateMipmap(Xt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(C,k,ot=null,rt=null,X=0){return C.isTexture!==!0&&(sl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ot=arguments[0]||null,rt=arguments[1]||null,C=arguments[2],k=arguments[3],X=arguments[4]||0),sl('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,k,ot,rt,X)},this.initRenderTarget=function(C){Zt.get(C).__webglFramebuffer===void 0&&N.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?N.setTextureCube(C,0):C.isData3DTexture?N.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?N.setTexture2DArray(C,0):N.setTexture2D(C,0),Qt.unbindTexture()},this.resetState=function(){I=0,O=0,H=null,Qt.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ea}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Ae._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ae._getUnpackColorSpace()}}class f2 extends Vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ra,this.environmentIntensity=1,this.environmentRotation=new Ra,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class xx extends eo{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const cu=new $,uu=new $,yv=new an,nl=new dp,qc=new hl,hd=new $,Sv=new $;class h2 extends Vn{constructor(t=new kn,n=new xx){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,s=[0];for(let l=1,c=n.count;l<c;l++)cu.fromBufferAttribute(n,l-1),uu.fromBufferAttribute(n,l),s[l]=s[l-1],s[l]+=cu.distanceTo(uu);t.setAttribute("lineDistance",new vn(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),qc.copy(s.boundingSphere),qc.applyMatrix4(l),qc.radius+=c,t.ray.intersectsSphere(qc)===!1)return;yv.copy(l).invert(),nl.copy(t.ray).applyMatrix4(yv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=s.index,x=s.attributes.position;if(g!==null){const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=p){const v=g.getX(T),L=g.getX(T+1),D=Wc(this,t,nl,m,v,L);D&&n.push(D)}if(this.isLineLoop){const T=g.getX(E-1),S=g.getX(M),v=Wc(this,t,nl,m,T,S);v&&n.push(v)}}else{const M=Math.max(0,f.start),E=Math.min(x.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=p){const v=Wc(this,t,nl,m,T,T+1);v&&n.push(v)}if(this.isLineLoop){const T=Wc(this,t,nl,m,E-1,M);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Wc(r,t,n,s,l,c){const f=r.geometry.attributes.position;if(cu.fromBufferAttribute(f,l),uu.fromBufferAttribute(f,c),n.distanceSqToSegment(cu,uu,hd,Sv)>s)return;hd.applyMatrix4(r.matrixWorld);const m=t.ray.origin.distanceTo(hd);if(!(m<t.near||m>t.far))return{distance:m,point:Sv.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}class yx extends eo{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Mv=new an,ip=new dp,Yc=new hl,jc=new $;class d2 extends Vn{constructor(t=new kn,n=new yx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Yc.copy(s.boundingSphere),Yc.applyMatrix4(l),Yc.radius+=c,t.ray.intersectsSphere(Yc)===!1)return;Mv.copy(l).invert(),ip.copy(t.ray).applyMatrix4(Mv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=s.index,_=s.attributes.position;if(p!==null){const x=Math.max(0,f.start),M=Math.min(p.count,f.start+f.count);for(let E=x,T=M;E<T;E++){const S=p.getX(E);jc.fromBufferAttribute(_,S),Ev(jc,S,m,l,t,n,this)}}else{const x=Math.max(0,f.start),M=Math.min(_.count,f.start+f.count);for(let E=x,T=M;E<T;E++)jc.fromBufferAttribute(_,E),Ev(jc,E,m,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Ev(r,t,n,s,l,c,f){const d=ip.distanceSqToPoint(r);if(d<n){const m=new $;ip.closestPointToPoint(r,m),m.applyMatrix4(s);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class p2 extends Gn{constructor(t,n,s,l,c,f,d,m,p){super(t,n,s,l,c,f,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $e extends kn{constructor(t=1,n=1,s=1,l=32,c=1,f=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:s,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:d,thetaLength:m};const p=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],x=[],M=[];let E=0;const T=[],S=s/2;let v=0;L(),f===!1&&(t>0&&D(!0),n>0&&D(!1)),this.setIndex(g),this.setAttribute("position",new vn(_,3)),this.setAttribute("normal",new vn(x,3)),this.setAttribute("uv",new vn(M,2));function L(){const w=new $,W=new $;let I=0;const O=(n-t)/s;for(let H=0;H<=c;H++){const U=[],R=H/c,F=R*(n-t)+t;for(let Q=0;Q<=l;Q++){const J=Q/l,ct=J*m+d,ut=Math.sin(ct),P=Math.cos(ct);W.x=F*ut,W.y=-R*s+S,W.z=F*P,_.push(W.x,W.y,W.z),w.set(ut,O,P).normalize(),x.push(w.x,w.y,w.z),M.push(J,1-R),U.push(E++)}T.push(U)}for(let H=0;H<l;H++)for(let U=0;U<c;U++){const R=T[U][H],F=T[U+1][H],Q=T[U+1][H+1],J=T[U][H+1];(t>0||U!==0)&&(g.push(R,F,J),I+=3),(n>0||U!==c-1)&&(g.push(F,Q,J),I+=3)}p.addGroup(v,I,0),v+=I}function D(w){const W=E,I=new Ce,O=new $;let H=0;const U=w===!0?t:n,R=w===!0?1:-1;for(let Q=1;Q<=l;Q++)_.push(0,S*R,0),x.push(0,R,0),M.push(.5,.5),E++;const F=E;for(let Q=0;Q<=l;Q++){const ct=Q/l*m+d,ut=Math.cos(ct),P=Math.sin(ct);O.x=U*P,O.y=S*R,O.z=U*ut,_.push(O.x,O.y,O.z),x.push(0,R,0),I.x=ut*.5+.5,I.y=P*.5*R+.5,M.push(I.x,I.y),E++}for(let Q=0;Q<l;Q++){const J=W+Q,ct=F+Q;w===!0?g.push(ct,ct+1,J):g.push(ct+1,ct,J),H+=3}p.addGroup(v,H,w===!0?1:2),v+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Hs extends $e{constructor(t=1,n=1,s=32,l=1,c=!1,f=0,d=Math.PI*2){super(0,t,n,s,l,c,f,d),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:s,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:d}}static fromJSON(t){return new Hs(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dl extends kn{constructor(t=[],n=[],s=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:s,detail:l};const c=[],f=[];d(l),p(s),g(),this.setAttribute("position",new vn(c,3)),this.setAttribute("normal",new vn(c.slice(),3)),this.setAttribute("uv",new vn(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function d(L){const D=new $,w=new $,W=new $;for(let I=0;I<n.length;I+=3)M(n[I+0],D),M(n[I+1],w),M(n[I+2],W),m(D,w,W,L)}function m(L,D,w,W){const I=W+1,O=[];for(let H=0;H<=I;H++){O[H]=[];const U=L.clone().lerp(w,H/I),R=D.clone().lerp(w,H/I),F=I-H;for(let Q=0;Q<=F;Q++)Q===0&&H===I?O[H][Q]=U:O[H][Q]=U.clone().lerp(R,Q/F)}for(let H=0;H<I;H++)for(let U=0;U<2*(I-H)-1;U++){const R=Math.floor(U/2);U%2===0?(x(O[H][R+1]),x(O[H+1][R]),x(O[H][R])):(x(O[H][R+1]),x(O[H+1][R+1]),x(O[H+1][R]))}}function p(L){const D=new $;for(let w=0;w<c.length;w+=3)D.x=c[w+0],D.y=c[w+1],D.z=c[w+2],D.normalize().multiplyScalar(L),c[w+0]=D.x,c[w+1]=D.y,c[w+2]=D.z}function g(){const L=new $;for(let D=0;D<c.length;D+=3){L.x=c[D+0],L.y=c[D+1],L.z=c[D+2];const w=S(L)/2/Math.PI+.5,W=v(L)/Math.PI+.5;f.push(w,1-W)}E(),_()}function _(){for(let L=0;L<f.length;L+=6){const D=f[L+0],w=f[L+2],W=f[L+4],I=Math.max(D,w,W),O=Math.min(D,w,W);I>.9&&O<.1&&(D<.2&&(f[L+0]+=1),w<.2&&(f[L+2]+=1),W<.2&&(f[L+4]+=1))}}function x(L){c.push(L.x,L.y,L.z)}function M(L,D){const w=L*3;D.x=t[w+0],D.y=t[w+1],D.z=t[w+2]}function E(){const L=new $,D=new $,w=new $,W=new $,I=new Ce,O=new Ce,H=new Ce;for(let U=0,R=0;U<c.length;U+=9,R+=6){L.set(c[U+0],c[U+1],c[U+2]),D.set(c[U+3],c[U+4],c[U+5]),w.set(c[U+6],c[U+7],c[U+8]),I.set(f[R+0],f[R+1]),O.set(f[R+2],f[R+3]),H.set(f[R+4],f[R+5]),W.copy(L).add(D).add(w).divideScalar(3);const F=S(W);T(I,R+0,L,F),T(O,R+2,D,F),T(H,R+4,w,F)}}function T(L,D,w,W){W<0&&L.x===1&&(f[D]=L.x-1),w.x===0&&w.z===0&&(f[D]=W/2/Math.PI+.5)}function S(L){return Math.atan2(L.z,-L.x)}function v(L){return Math.atan2(-L.y,Math.sqrt(L.x*L.x+L.z*L.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dl(t.vertices,t.indices,t.radius,t.details)}}class fu extends dl{constructor(t=1,n=0){const s=(1+Math.sqrt(5))/2,l=1/s,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-s,0,-l,s,0,l,-s,0,l,s,-l,-s,0,-l,s,0,l,-s,0,l,s,0,-s,0,-l,s,0,-l,-s,0,l,s,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new fu(t.radius,t.detail)}}class gp extends dl{constructor(t=1,n=0){const s=(1+Math.sqrt(5))/2,l=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new gp(t.radius,t.detail)}}class hu extends dl{constructor(t=1,n=0){const s=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(s,l,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new hu(t.radius,t.detail)}}class $n extends kn{constructor(t=1,n=32,s=16,l=0,c=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:d},n=Math.max(3,Math.floor(n)),s=Math.max(2,Math.floor(s));const m=Math.min(f+d,Math.PI);let p=0;const g=[],_=new $,x=new $,M=[],E=[],T=[],S=[];for(let v=0;v<=s;v++){const L=[],D=v/s;let w=0;v===0&&f===0?w=.5/n:v===s&&m===Math.PI&&(w=-.5/n);for(let W=0;W<=n;W++){const I=W/n;_.x=-t*Math.cos(l+I*c)*Math.sin(f+D*d),_.y=t*Math.cos(f+D*d),_.z=t*Math.sin(l+I*c)*Math.sin(f+D*d),E.push(_.x,_.y,_.z),x.copy(_).normalize(),T.push(x.x,x.y,x.z),S.push(I+w,1-D),L.push(p++)}g.push(L)}for(let v=0;v<s;v++)for(let L=0;L<n;L++){const D=g[v][L+1],w=g[v][L],W=g[v+1][L],I=g[v+1][L+1];(v!==0||f>0)&&M.push(D,w,I),(v!==s-1||m<Math.PI)&&M.push(w,W,I)}this.setIndex(M),this.setAttribute("position",new vn(E,3)),this.setAttribute("normal",new vn(T,3)),this.setAttribute("uv",new vn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class m2 extends Hi{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Sx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Tv(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Tv();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function Tv(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rp);const g2={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const _2=new dx(-1,1,1,-1,0,1);class v2 extends kn{constructor(){super(),this.setAttribute("position",new vn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vn([0,2,0,0,2,0],2))}}const x2=new v2;class Mx{constructor(t){this._mesh=new Tn(x2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,_2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class y2 extends pl{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof Hi?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=pp.clone(t.uniforms),this.material=new Hi({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Mx(this.material)}render(t,n,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class bv extends pl{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,s){const l=t.getContext(),c=t.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,d;this.inverse?(f=0,d=1):(f=1,d=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(d),c.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class S2 extends pl{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class M2{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const s=t.getSize(new Ce);this._width=s.width,this._height=s.height,n=new cs(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Jr}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new y2(g2),this.copyPass.material.blending=Ta,this.clock=new Sx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let s=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),f.needsSwap){if(s){const d=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),m.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}bv!==void 0&&(f instanceof bv?s=!0:f instanceof S2&&(s=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new Ce);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const s=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(s,l),this.renderTarget2.setSize(s,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(s,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class E2 extends pl{constructor(t,n,s=null,l=null,c=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=s,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(t,n,s){const l=t.autoClear;t.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(c=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const T2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class b2 extends pl{constructor(){super();const t=T2;this.uniforms=pp.clone(t.uniforms),this.material=new m2({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Mx(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,n,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ae.getTransfer(this._outputColorSpace)===Fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bv?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Iv?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fv?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Hv?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Gv?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Vv&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class A2{constructor(t,n,s,l,c){Pt(this,"composer");Pt(this,"outputPass");this.composer=new M2(t),this.composer.addPass(new E2(n,s)),this.outputPass=new b2,this.composer.addPass(this.outputPass),this.composer.setSize(l,c)}setSize(t,n){this.composer.setSize(t,n)}render(t){this.composer.render(t)}dispose(){this.composer.dispose(),this.outputPass.dispose()}}class R2{constructor(t,n,s){Pt(this,"scene");Pt(this,"renderer");Pt(this,"camera");Pt(this,"playerMeshes",new Map);Pt(this,"enemyMeshes",new Map);Pt(this,"projectileMeshes",new Map);Pt(this,"particleMeshes",new Map);Pt(this,"bossMeshes",new Map);Pt(this,"lockIndicators",new Map);Pt(this,"clock");Pt(this,"postFX");this.scene=new f2,this.scene.background=new fe(0),this.renderer=new u2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(n,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera=new Ai(60,n/s,.1,2e3),this.camera.position.set(0,v_,Nh),this.clock=new Sx,this.postFX=new A2(this.renderer,this.scene,this.camera,n,s),this.buildVoidBackground()}buildVoidBackground(){const n=document.createElement("canvas");n.width=1024,n.height=1024;const s=n.getContext("2d");s.fillStyle="#000000",s.fillRect(0,0,1024,1024),s.globalAlpha=.18;const l=s.createLinearGradient(0,0,1024,1024);l.addColorStop(0,"rgba(40,60,140,0)"),l.addColorStop(.5,"rgba(40,60,140,0.5)"),l.addColorStop(1,"rgba(40,60,140,0)"),s.fillStyle=l;for(let f=0;f<5;f++)s.save(),s.translate(1024/2,1024/2),s.rotate(f/5*Math.PI*2+.2),s.fillRect(-1024/2,-8,1024,16),s.restore();s.globalAlpha=1;const c=new p2(n);c.wrapS=ol,c.wrapT=ol,c.colorSpace=hi,this.scene.background=c}updateCamera(t,n,s,l=md){const c=new $(t.x-Math.sin(s)*Nh,t.y+v_,t.z-Math.cos(s)*Nh),f=1-Math.exp(-l*n);this.camera.position.lerp(c,f),this.camera.lookAt(t.x,t.y,t.z)}setSpeedRatio(t){const n=uM+fM*Math.max(0,Math.min(1,t));Math.abs(this.camera.fov-n)>.01&&(this.camera.fov+=(n-this.camera.fov)*.1,this.camera.updateProjectionMatrix())}resize(t,n){this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.postFX.setSize(t,n)}render(){this.postFX.render()}addPart(t,n,s,l){const c=new Is({color:16777215}),f=new Tn(n,c);return f.position.set(s[0],s[1],s[2]),l&&f.rotation.set(l[0],l[1],l[2]),t.add(f),f}createPlayerMesh(t=new fe(16777215)){const n=new ks;this.addPart(n,new Ne(1.8,1,1.4),[0,.5,0]),this.addPart(n,new Ne(1.6,.7,.4),[0,.6,.75]),this.addPart(n,new Ne(1.2,.5,.2),[0,.6,.95]),this.addPart(n,new $e(.8,1,.4,6),[0,0,0]),this.addPart(n,new Ne(.7,.5,.7),[0,1.3,0]),this.addPart(n,new Ne(.6,.1,.1),[0,1.3,.4]),this.addPart(n,new Ne(.1,.18,.1),[0,1.2,.4]),this.addPart(n,new Ne(.08,.25,.3),[0,1.6,0]),this.addPart(n,new Ne(.5,.15,.1),[0,1.1,.35]);for(let c=-1;c<=1;c+=2)this.addPart(n,new Ne(.8,.3,.6),[c*1.3,.9,0]),this.addPart(n,new Ne(.6,.15,.4),[c*1.3,1,0]),this.addPart(n,new $n(.2,6,6),[c*1.1,.7,0]);for(let c=-1;c<=1;c+=2)this.addPart(n,new $e(.2,.25,.7,6),[c*1.2,.3,0]),this.addPart(n,new $e(.15,.18,.55,6),[c*1.2,.3,.15]),this.addPart(n,new $n(.14,6,6),[c*1.2,-.1,0]),this.addPart(n,new $e(.16,.14,.5,6),[c*1.2,-.45,0]),this.addPart(n,new Ne(.2,.3,.15),[c*1.2,-.45,.2]),this.addPart(n,new $n(.1,6,6),[c*1.2,-.7,0]),c>0&&(this.addPart(n,new $e(.08,.1,.8,6),[c*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(n,new $e(.05,.06,1,6),[c*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(n,new $e(.07,.09,.1,6),[c*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(n,new Ne(.2,.12,.3),[c*1.35,-.3,.3]));for(let c=-1;c<=1;c+=2)this.addPart(n,new $e(.3,.35,.7,6),[c*.5,-.4,0]),this.addPart(n,new Ne(.3,.4,.4),[c*.5,-.3,.25]),this.addPart(n,new $n(.2,6,6),[c*.5,-.8,0]),this.addPart(n,new $n(.18,6,6),[c*.5,-.8,.15]),this.addPart(n,new $e(.25,.2,.6,6),[c*.5,-1.2,0]),this.addPart(n,new Ne(.25,.4,.3),[c*.5,-1.2,.2]),this.addPart(n,new $n(.15,6,6),[c*.5,-1.55,0]),this.addPart(n,new Ne(.4,.12,.5),[c*.5,-1.65,.1]),this.addPart(n,new Ne(.3,.06,.15),[c*.5,-1.7,.35]);this.addPart(n,new Ne(1,.6,.4),[0,.5,-.95]),this.addPart(n,new $e(.35,.4,.4,8),[0,.4,-1.2]);for(let c=-1;c<=1;c+=2)this.addPart(n,new $e(.2,.25,.35,6),[c*.45,.4,-1.15]),this.addPart(n,new $e(.15,.18,.25,6),[c*.35,.85,-.95]);this.addPart(n,new Ne(.7,.2,.15),[0,-.1,.55]);for(let c=-1;c<=1;c+=2)this.addPart(n,new Ne(.15,.2,.4),[c*.65,-.1,.2]);const s=new Is({color:16755268,transparent:!0,opacity:.9,blending:gd,depthWrite:!1}),l=(c,f)=>{const d=new Tn(new Hs(.12,.5,6),s);d.name="thruster",d.position.set(c[0],c[1],c[2]),d.rotation.set(f[0],f[1],f[2]),d.scale.set(1,1,.001),n.add(d)};return l([-.5,-1.8,.05],[Math.PI,0,0]),l([.5,-1.8,.05],[Math.PI,0,0]),l([0,.4,-1.38],[-Math.PI/2,0,0]),n}updateThrusters(t,n,s){const l=this.playerMeshes.get(t);if(!l)return;const c=Math.max(0,Math.min(1,n))*(s?1.6:1);l.children.forEach(f=>{if(f.name==="thruster"){const d=f;d.visible=c>.02,d.scale.set(1,1,Math.max(.001,c)),d.material.color.set(s?13691135:16755268)}})}createEnemyMesh(t,n,s){const l=new ks,c=new Is({color:16777215}),f=(d,m,p)=>{const g=new Tn(d,c);g.position.set(m[0],m[1],m[2]),p&&g.rotation.set(p[0],p[1],p[2]),l.add(g)};switch(s){case"scout":{f(new hu(n*.7,1),[0,0,0]);for(let d=0;d<4;d++){const m=d/4*Math.PI*2;f(new Hs(n*.08,n*.5,4),[Math.cos(m)*n*.6,0,Math.sin(m)*n*.6])}f(new $e(.02,.03,n*.4),[0,n*.5,0]);break}case"assault":{f(new Ne(n*1,n*.8,n*.7),[0,0,0]),f(new Ne(n*.7,n*.4,n*.2),[0,0,n*.45]),f(new Ne(n*.3,n*.25,n*.3),[0,n*.55,0]),f(new Ne(n*.25,n*.06,.05),[0,n*.55,n*.17]);for(let d=-1;d<=1;d+=2)f(new $e(n*.08,n*.1,n*.4,6),[d*n*.6,n*.1,n*.3],[Math.PI/2,0,0]);break}case"sniper":{f(new $e(n*.2,n*.3,n*1,6),[0,0,0]),f(new $e(n*.06,n*.06,n*.15,6),[0,n*.6,0]),f(new $n(n*.08,6,6),[0,n*.68,0]),f(new $e(n*.04,n*.06,n*1.2,6),[0,0,n*.7],[Math.PI/2,0,0]);for(let d=-1;d<=1;d+=2)f(new $e(n*.04,n*.06,n*.3,4),[d*n*.2,-n*.55,0]);break}case"shield":{f(new Ne(n*1.2,n*.6,n*.5),[0,0,0]),f(new Ne(n*1.1,n*.8,n*.15),[0,0,n*.35]),f(new $n(n*.15,6,6),[0,0,n*.45]);for(let d=-1;d<=1;d+=2)f(new $e(n*.1,n*.15,n*.2,6),[d*n*.4,0,-n*.3]);break}case"bomber":{f(new $n(n*.6,8,8),[0,0,0]);for(let d=0;d<8;d++){const m=d/8*Math.PI*2,p=Math.PI*.5,g=new $(Math.cos(m)*Math.sin(p),Math.cos(p),Math.sin(m)*Math.sin(p)),_=new Tn(new Hs(n*.06,n*.35,4),c);_.position.set(g.x*n*.6,g.y*n*.6,g.z*n*.6),_.quaternion.setFromUnitVectors(new $(0,1,0),g),l.add(_)}break}case"commander":{f(new fu(n*.6),[0,0,0]),f(new Hs(n*.1,n*.5,4),[0,n*.6,0]);for(let d=-1;d<=1;d+=2)f(new $n(n*.25,6,6),[d*n*.55,n*.2,0]);f(new Ne(n*.4,n*.3,n*.2),[0,0,-n*.4]);break}default:{f(new hu(n*.8),[0,0,0]);break}}return l}createBossMesh(t=new fe(16777215),n=4){const s=new ks,l=new Is({color:16777215}),c=new Tn(new fu(n),l);s.add(c);const f=new Tn(new gp(n*.4),l);s.add(f);for(let d=0;d<6;d++){const m=new Tn(new $e(.3,.4,.8,6),l),p=d/6*Math.PI*2;m.position.set(Math.cos(p)*n*1.1,0,Math.sin(p)*n*1.1),m.rotation.z=Math.PI/2,m.rotation.y=-p,s.add(m)}return s}createProjectileMesh(t,n){const s=new Is({color:16777215});let l;switch(n){case"beam":case"sniper":l=new $n(.3,6,6);break;case"missile":l=new Hs(.2,.6,6);break;default:l=new $n(.15,4,4)}return new Tn(l,s)}createExplosion(t,n,s=1){const c=new Float32Array(90),f=new Float32Array(90),d=new fe(n);for(let M=0;M<30;M++){const E=Math.random()*Math.PI*2,T=Math.random()*Math.PI,S=s*(.5+Math.random()*.5);c[M*3]=t.x+S*Math.sin(T)*Math.cos(E),c[M*3+1]=t.y+S*Math.cos(T),c[M*3+2]=t.z+S*Math.sin(T)*Math.sin(E),f[M*3]=d.r,f[M*3+1]=d.g,f[M*3+2]=d.b}const m=new kn;m.setAttribute("position",new di(c,3)),m.setAttribute("color",new di(f,3));const p=new yx({size:.5,vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1}),g=new d2(m,p);this.scene.add(g);let _=1;const x=()=>{if(_-=.02,_<=0){this.scene.remove(g),m.dispose(),p.dispose();return}p.opacity=_;const M=m.attributes.position,E=M.array;for(let T=0;T<30;T++)E[T*3]+=(Math.random()-.5)*.5,E[T*3+1]+=(Math.random()-.5)*.5,E[T*3+2]+=(Math.random()-.5)*.5;M.needsUpdate=!0,requestAnimationFrame(x)};x()}updateLockIndicator(t,n,s,l="#00ff44"){const c=this.lockIndicators.get(t);if(!s){c&&(this.scene.remove(c),this.lockIndicators.delete(t));return}if(c){const f=c.geometry.attributes.position,d=f.array;d[0]=n.x,d[1]=n.y,d[2]=n.z,d[3]=s.x,d[4]=s.y,d[5]=s.z,f.needsUpdate=!0;const m=c.material;m.color.getStyle()!==l&&m.color.set(l)}else{const f=new kn,d=new Float32Array([n.x,n.y,n.z,s.x,s.y,s.z]);f.setAttribute("position",new di(d,3));const m=new xx({color:l,transparent:!0,opacity:.5,linewidth:1}),p=new h2(f,m);this.scene.add(p),this.lockIndicators.set(t,p)}}dispose(){this.postFX.dispose(),this.renderer.dispose()}}class w2{constructor(t){Pt(this,"keys",new Set);Pt(this,"mouseNormX",.5);Pt(this,"mouseNormY",.5);Pt(this,"aimNormX",.5);Pt(this,"aimNormY",.5);Pt(this,"mouseDown",!1);Pt(this,"_weaponSwitch",0);Pt(this,"_dodge",!1);Pt(this,"_special",!1);Pt(this,"_lockToggle",!1);Pt(this,"lastSpaceTime",0);Pt(this,"canvasWidth",1);Pt(this,"canvasHeight",1)}setCanvasSize(t,n){this.canvasWidth=t,this.canvasHeight=n}getMouseNormX(){return this.aimNormX}getMouseNormY(){return this.aimNormY}getRawMouseNormX(){return this.mouseNormX}getRawMouseNormY(){return this.mouseNormY}setAimNorm(t,n){this.aimNormX=t,this.aimNormY=n}has(t){return this.keys.has(t)||this.keys.has(t.toLowerCase())||this.keys.has(t.toUpperCase())}getState(){const t=this._weaponSwitch;this._weaponSwitch=0;const n=this._dodge;this._dodge=!1;const s=this._special;this._special=!1;const l=this._lockToggle;return this._lockToggle=!1,{forward:this.has("w")||this.keys.has("ArrowUp"),backward:this.has("s")||this.keys.has("ArrowDown"),left:this.has("a")||this.keys.has("ArrowLeft"),right:this.has("d")||this.keys.has("ArrowRight"),up:this.has("Shift"),down:this.has("Control"),shoot:this.mouseDown,aimX:this.aimNormX,aimY:this.aimNormY,weaponSwitch:t,boost:this.has(" "),brake:this.has("e"),dodge:n,special:s,lockToggle:l,pause:this.has("Escape")||this.has("Enter")}}keyDown(t){if(this.keys.add(t),t===" "){const s=performance.now();s-this.lastSpaceTime<300&&(this._dodge=!0),this.lastSpaceTime=s}(t==="z"||t==="Z")&&(this._special=!0),t==="Tab"&&(this._lockToggle=!0);const n=parseInt(t,10);n>=1&&n<=9&&(this._weaponSwitch=n)}keyUp(t){this.keys.delete(t),this.keys.delete(t.toLowerCase()),this.keys.delete(t.toUpperCase())}mouseMove(t,n){this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?n/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}const C2=120,Av=60/C2/4,D2=64,U2=.12,L2=25,N2=[{root:45,tones:[57,60,64]},{root:41,tones:[53,57,60]},{root:38,tones:[50,53,57]},{root:40,tones:[52,55,59]}],Rv=r=>440*Math.pow(2,(r-69)/12);class Ex{constructor(){Pt(this,"ctx",null);Pt(this,"masterGain",null);Pt(this,"bgmGain",null);Pt(this,"sfxGain",null);Pt(this,"initialized",!1);Pt(this,"bgmTimer",null);Pt(this,"bgmActiveOscs",[]);Pt(this,"nextStepTime",0);Pt(this,"step",0);Pt(this,"noiseBuffer",null)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="square",n.frequency.value=t,s.gain.setValueAtTime(.3,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),n.connect(s),s.connect(this.sfxGain),n.start(),n.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=n.getChannelData(0);for(let f=0;f<t;f++)s[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=n;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.value=1200,n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),n.gain.setValueAtTime(.4,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playDodge(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1800,this.ctx.currentTime+.18),n.gain.setValueAtTime(.25,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.2)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="square",n.frequency.value=440,s.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),n.connect(s),s.connect(this.sfxGain),n.start(this.ctx.currentTime+t*.3),n.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){this.ensureCtx(),!(!this.ctx||!this.bgmGain||this.bgmTimer!==null)&&(this.step=0,this.nextStepTime=this.ctx.currentTime+.1,this.bgmTimer=window.setInterval(()=>this.scheduleBgmAhead(),L2))}stopBGM(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null);for(const t of this.bgmActiveOscs)try{t.stop()}catch{}this.bgmActiveOscs.length=0,this.step=0,this.nextStepTime=0}scheduleBgmAhead(){if(!(!this.ctx||!this.bgmGain))for(;this.nextStepTime<this.ctx.currentTime+U2;)this.scheduleStep(this.step,this.nextStepTime),this.nextStepTime+=Av,this.step=(this.step+1)%D2}scheduleStep(t,n){const s=Math.floor(t/16),l=t%16,c=N2[s];l===0&&this.schedulePad(c,n),(l===0||l===8)&&this.scheduleBass(c,l===8,n),l%8===4&&this.scheduleHat(n)}schedulePad(t,n){if(!this.ctx||!this.bgmGain)return;const s=16*Av,l=.06,c=.4;for(const f of t.tones)for(const d of[-6,5]){const m=this.ctx.createOscillator(),p=this.ctx.createGain();m.type="sawtooth",m.frequency.value=Rv(f),m.detune.value=d,p.gain.setValueAtTime(1e-4,n),p.gain.exponentialRampToValueAtTime(.022,n+l),p.gain.setValueAtTime(.022,n+s-c),p.gain.exponentialRampToValueAtTime(1e-4,n+s-.02),m.connect(p),p.connect(this.bgmGain),this.trackBgmOsc(m),m.start(n),m.stop(n+s)}}scheduleBass(t,n,s){if(!this.ctx||!this.bgmGain)return;const l=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),f=this.ctx.createGain();l.type="sawtooth",l.frequency.value=Rv(t.root-12+(n?7:0)),c.type="lowpass",c.frequency.setValueAtTime(420,s),c.frequency.exponentialRampToValueAtTime(120,s+.3),c.Q.value=2;const d=n?.2:.24;f.gain.setValueAtTime(1e-4,s),f.gain.exponentialRampToValueAtTime(.16,s+.01),f.gain.exponentialRampToValueAtTime(1e-4,s+d),l.connect(c),c.connect(f),f.connect(this.bgmGain),this.trackBgmOsc(l),l.start(s),l.stop(s+d+.05)}scheduleHat(t){if(!this.ctx||!this.bgmGain)return;const n=this.getNoiseBuffer();if(!n)return;const s=this.ctx.createBufferSource();s.buffer=n;const l=this.ctx.createBiquadFilter();l.type="highpass",l.frequency.value=6500;const c=this.ctx.createGain();c.gain.setValueAtTime(.035,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),s.connect(l),l.connect(c),c.connect(this.bgmGain),s.start(t),s.stop(t+.08)}getNoiseBuffer(){if(!this.ctx)return null;if(this.noiseBuffer)return this.noiseBuffer;const t=this.ctx.sampleRate*.1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=n.getChannelData(0);for(let l=0;l<t;l++)s[l]=Math.random()*2-1;return this.noiseBuffer=n,n}trackBgmOsc(t){this.bgmActiveOscs.push(t),t.onended=()=>{const n=this.bgmActiveOscs.indexOf(t);n>=0&&this.bgmActiveOscs.splice(n,1)}}playBossAnnounce(t){if(this.ensureCtx(),!this.ctx)return;const n=this.ctx.currentTime,s=[...t].reduce((f,d)=>f+d.charCodeAt(0),0),l=120+s%60,c=1+(s>>3)%5/10;this.voiceChip(n,{freq:l,duration:.42,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:34,depth:.55,gainA:.26,gainB:.14,gainC:.1,glideTo:l*.92}),this.voiceChip(n+.3,{freq:l*c,duration:.55,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:30,depth:.5,gainA:.24,gainB:.13,gainC:.09,glideTo:l*c*.9})}playSpecialAnnounce(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.currentTime,n=330;this.voiceChip(t,{freq:n,duration:.8,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:46,depth:.6,gainA:.2,gainB:.14,gainC:.12,glideTo:n*1.8}),this.voiceChip(t+.15,{freq:n*1.25,duration:.6,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:52,depth:.55,gainA:.18,gainB:.12,gainC:.1,glideTo:n*1.25*1.5})}voiceChip(t,n){if(!this.ctx||!this.sfxGain)return;const s=this.ctx.createGain();s.gain.setValueAtTime(1e-4,t),s.gain.exponentialRampToValueAtTime(1,t+.01),s.gain.setValueAtTime(1,t+n.duration*.45),s.gain.exponentialRampToValueAtTime(1e-4,t+n.duration);const l=this.ctx.createGain();l.gain.value=.5;const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sine",c.frequency.value=n.pulseHz,f.gain.value=n.depth,c.connect(f),f.connect(l.gain),c.start(t),c.stop(t+n.duration);const d=[[n.waveA,n.freq,n.gainA],[n.waveB,n.freq*1.005,n.gainB],[n.waveC,n.freq*2.01,n.gainC]];for(const[m,p,g]of d){const _=this.ctx.createOscillator(),x=this.ctx.createGain();_.type=m,_.frequency.setValueAtTime(p,t),_.frequency.exponentialRampToValueAtTime(n.glideTo*(p/n.freq),t+n.duration),x.gain.value=g,_.connect(x),x.connect(l),_.start(t),_.stop(t+n.duration+.02)}l.connect(s),s.connect(this.sfxGain)}}const fi=new Ex;var ye=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(ye||{}),Ht=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Ht||{}),dn=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(dn||{}),Ri=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(Ri||{});const ap=[{id:1,name:"光束机枪",type:dn.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:Ri.FreeFire,smartRadius:60},{id:2,name:"追踪导弹",type:dn.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:Ri.LockRequired,smartRadius:95},{id:3,name:"光束加农",type:dn.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:Ri.LockRequired,smartRadius:80},{id:4,name:"散射弹幕",type:dn.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:Ri.FreeFire,smartRadius:110},{id:5,name:"狙击光束",type:dn.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:Ri.LockRequired,smartRadius:45},{id:6,name:"浮游炮",type:dn.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:Ri.LockShortRange,smartRadius:130}];function Xs(r){return ap.find(t=>t.id===r)||ap[0]}const wv=[{type:ye.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:ye.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:ye.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:ye.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:ye.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:ye.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function Zc(r){return wv.find(t=>t.type===r)||wv[0]}function Wi(r,t,n,s,l){return{hpPercent:r,speed:t,attacks:n,minionSpawn:s,attackPattern:l}}const Cv=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[Wi(1,5,["弹幕散布"],!0,"spread"),Wi(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),Wi(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[Wi(1,12,["高速突进"],!1,"rush"),Wi(.6,15,["高速突进","分身攻击"],!0,"clone"),Wi(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[Wi(1,4,["多重导弹"],!1,"missile"),Wi(.75,6,["多重导弹","力场护盾"],!1,"shield"),Wi(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),Wi(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function dd(r){return Cv.find(t=>t.id===r)||Cv[0]}function Ze(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function we(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function Ee(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function Tx(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function Ln(r,t){return Tx(we(r,t))}function Te(r){const t=Tx(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function O2(r,t,n){return r+(t-r)*n}function Jn(r,t,n){return Math.max(t,Math.min(n,r))}function Gr(r,t){return r+Math.random()*(t-r)}function P2(r,t){return Math.floor(Gr(r,t+1))}let bx=1;function bi(){return bx++}const z2=4,B2=1.5,Dv=3,pd=.6,Uv=2.5,I2=6,F2=60,H2=4;class G2{constructor(t){Pt(this,"scene");Pt(this,"input");Pt(this,"audio");Pt(this,"canvas");Pt(this,"players",[]);Pt(this,"enemies",[]);Pt(this,"projectiles",[]);Pt(this,"particles",[]);Pt(this,"active",!1);Pt(this,"velocities",[]);Pt(this,"fireTimers",[]);Pt(this,"dodgeTimer",0);Pt(this,"dodgeCooldown",0);Pt(this,"accumulator",0);Pt(this,"lastTime",0);Pt(this,"animFrameId",0);Pt(this,"enemySpawnTimer",0);Pt(this,"waveTimer",0);Pt(this,"levelSpawned",0);Pt(this,"bossCount",0);Pt(this,"currentBossIndex",-1);Pt(this,"bossPhase",1);Pt(this,"bossAttackTimer",0);Pt(this,"bossSweepAngle",0);Pt(this,"bossNetAngle",0);Pt(this,"comboTimeout",[0]);Pt(this,"lockTargets",[null]);Pt(this,"lockOn",!1);Pt(this,"enemyLastPos",new Map);Pt(this,"enemyVels",new Map);Pt(this,"brakePitch",0);Pt(this,"cameraStiffness",md);Pt(this,"cameraShake",0);Pt(this,"gameLoop",t=>{if(!this.active)return;this.animFrameId=requestAnimationFrame(this.gameLoop);const n=Math.min((t-this.lastTime)/1e3,.05);for(this.lastTime=t,this.accumulator+=n;this.accumulator>=Dh;)this.update(Dh),this.accumulator-=Dh;this.render(n)});this.canvas=t,this.scene=new R2(t,t.width,t.height),this.input=new w2(0),this.input.setCanvasSize(t.width,t.height),this.audio=new Ex}start(){const t=_n.getState();this.players=t.players.map(n=>({...n})),this.velocities=this.players.map(()=>({x:0,y:0,z:0})),this.fireTimers=this.players.map(()=>0),this.dodgeTimer=0,this.dodgeCooldown=0,this.enemies=[],this.projectiles=[],this.particles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0,this.enemySpawnTimer=0,this.waveTimer=0,this.lockOn=!1,this.enemyLastPos.clear(),this.enemyVels.clear(),this.active=!0,this.lastTime=performance.now(),this.accumulator=0,bx=1,this.players.forEach((n,s)=>{const l=s===0?new fe(4491519):new fe(16737860),c=this.scene.createPlayerMesh(l);c.position.set(n.pos.x,n.pos.y,n.pos.z),this.scene.playerMeshes.set(n.id,c),this.scene.scene.add(c)}),fi.init(),fi.startBGM(),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),fi.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,n){this.scene.resize(t,n),this.input.setCanvasSize(t,n)}update(t){_n.getState().game;const s=[this.input.getState()];this.updatePlayers(t,s),this.updateEnemies(t),this.updateProjectiles(t),this.updateParticles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateUI(t),this.updateBoss(t)}updatePlayers(t,n){this.players.forEach((s,l)=>{if(!s.alive)return;const c=n[l],f=this.scene.playerMeshes.get(s.id);if(!f)return;const d=_n.getState().game;for(const Q of ap)d.wave>=Q.unlockLevel&&!s.weapons.includes(Q.id)&&s.weapons.push(Q.id);(s.weapon===0||!s.weapons.includes(s.weapon))&&(s.weapon=s.weapons[0]);const m=this.velocities[l],p=(c.right?1:0)-(c.left?1:0),g=(c.up?1:0)-(c.down?1:0),_=(c.forward?1:0)-(c.backward?1:0),x=Math.sqrt(p*p+g*g+_*_),M=c.boost&&s.energy>0,E=M?$S:1,T=s.speed*E,S=c.brake?aM:iM;if(M?s.energy=Math.max(0,s.energy-jS*t):s.energy=Math.min(s.maxEnergy,s.energy+s.maxEnergy*.25*t),c.lockToggle&&(this.lockOn=!this.lockOn),!this.lockOn)this.lockTargets[l]=null;else{const Q=this.lockTargets[l]!==null?this.enemies.find(J=>J.id===this.lockTargets[l]&&J.hp>0):null;if(!Q||Ln(Q.pos,s.pos)>Lh){let J=null,ct=Lh;for(const ut of this.enemies){if(ut.hp<=0)continue;const P=Ln(s.pos,ut.pos);P<ct&&(ct=P,J=ut)}this.lockTargets[l]=J?J.id:null}}let v=this.input.getRawMouseNormX(),L=this.input.getRawMouseNormY();if(this.lockOn&&this.lockTargets[l]!==null){const Q=this.enemies.find(J=>J.id===this.lockTargets[l]&&J.hp>0);if(Q){const J=this.worldToScreen(Q.pos);if(J){const ct=Ln(s.pos,Q.pos),ut=eM*Math.max(0,1-ct/Lh),P=Jn(J.x/this.canvas.width,0,1),j=Jn(J.y/this.canvas.height,0,1);v=v+(P-v)*ut,L=L+(j-L)*ut}}}this.input.setAimNorm(v,L);const D=this.computeCrosshairDir(s),w={x:-D.z,z:D.x},W=(Q,J,ct)=>({x:ct*D.x+Q*w.x,y:J,z:ct*D.z+Q*w.z});if(this.dodgeCooldown-=t,c.dodge&&this.dodgeCooldown<=0&&(this.dodgeTimer=dM,this.dodgeCooldown=pM,s.invulnTimer=Math.max(s.invulnTimer,mM),fi.playDodge()),this.dodgeTimer>0){this.dodgeTimer-=t;let Q=0,J=0,ct=0;if(x>.001){const ut=1/x,P=W(p,g,_);Q=P.x*ut,J=P.y*ut,ct=P.z*ut}else{const ut=this.computeAimDir(s);Q=ut.x,J=ut.y,ct=ut.z}m.x=Q*s.speed*Oh,m.y=J*s.speed*Oh,m.z=ct*s.speed*Oh,s.pos.x+=m.x*t,s.pos.y+=m.y*t,s.pos.z+=m.z*t}else{let Q=0,J=0,ct=0;if(x>.001){const j=1/x,Z=W(p,g,_);Q=Z.x*T*j,J=Z.y*T*j,ct=Z.z*T*j}const ut=1-Math.exp(-S*t);m.x+=(Q-m.x)*ut,m.y+=(J-m.y)*ut,m.z+=(ct-m.z)*ut;const P=Math.exp(-1.2*t);m.x*=P,m.y*=P,m.z*=P,s.pos.x+=m.x*t,s.pos.y+=m.y*t,s.pos.z+=m.z*t}this.scene.updateThrusters(s.id,x,c.boost),s.pos.x=Jn(s.pos.x,-$a,$a),s.pos.y=Jn(s.pos.y,-br,br),s.pos.z=Jn(s.pos.z,-$a,$a),c.brake?(this.brakePitch=Math.min(1,this.brakePitch+t/rM),this.cameraStiffness=nM):(this.brakePitch=Math.max(0,this.brakePitch-t/oM),this.cameraStiffness=md);let O=Math.atan2(D.x,D.z)-s.rot.y;for(;O>Math.PI;)O-=Math.PI*2;for(;O<-Math.PI;)O+=Math.PI*2;s.rot.y+=Jn(O,-g_*t,g_*t);const U=-Math.asin(Jn(D.y,-1,1))-s.rot.x;s.rot.x+=Jn(U,-__*t,__*t),s.rot.x+=sM*this.brakePitch;const R=Jn(m.x/T,-1,1)*.35;s.rot.z=O2(s.rot.z,R,.15);const F=Math.sin(performance.now()*.001*cM)*lM;f.position.set(s.pos.x,s.pos.y+F,s.pos.z),f.rotation.set(s.rot.x,s.rot.y,s.rot.z),this.fireTimers[l]-=t,c.shoot&&this.fireTimers[l]<=0&&(this.playerShoot(s,l),this.fireTimers[l]=Xs(s.weapon).fireRate),c.weaponSwitch>0&&s.weapons.includes(c.weaponSwitch)&&(s.weapon=c.weaponSwitch),s.invulnTimer>0&&(s.invulnTimer-=t),s.specialGauge=Math.min(s.specialGauge+t*2,s.maxSpecialGauge),c.special&&s.specialGauge>=100&&(this.useSpecial(s,l),s.specialGauge=0),s.combo>0&&(this.comboTimeout[l]-=t,this.comboTimeout[l]<=0&&(s.combo=0))})}worldToScreen(t){const n=this.scene.camera,s=n.matrixWorldInverse.elements,l=n.projectionMatrix.elements,c=t.x,f=t.y,d=t.z,m=s[0]*c+s[4]*f+s[8]*d+s[12],p=s[1]*c+s[5]*f+s[9]*d+s[13],g=s[2]*c+s[6]*f+s[10]*d+s[14],_=s[3]*c+s[7]*f+s[11]*d+s[15],x=l[0]*m+l[4]*p+l[8]*g+l[12]*_,M=l[1]*m+l[5]*p+l[9]*g+l[13]*_;l[2]*m+l[6]*p+l[10]*g+l[14]*_;const E=l[3]*m+l[7]*p+l[11]*g+l[15]*_;if(E<=0)return null;const T=x/E,S=M/E;return Math.abs(T)>1.2||Math.abs(S)>1.2?null:{x:(T*.5+.5)*this.canvas.width,y:(-S*.5+.5)*this.canvas.height}}computeAimDir(t){const n=this.scene.camera,s=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new $(0,0,-1).applyQuaternion(n.quaternion),f=new $(1,0,0).applyQuaternion(n.quaternion),d=new $(0,1,0).applyQuaternion(n.quaternion),m=Math.tan(n.fov*Math.PI/360),p=new $().addScaledVector(c,1).addScaledVector(f,s*m*n.aspect).addScaledVector(d,l*m).normalize();let g=1/0,_=null;for(const x of this.enemies){if(x.hp<=0)continue;const M=x.type===ye.Boss?4:1.5,E=n.position.x-x.pos.x,T=n.position.y-x.pos.y,S=n.position.z-x.pos.z,v=E*p.x+T*p.y+S*p.z,L=E*E+T*T+S*S-M*M,D=v*v-L;if(D<0)continue;const w=-v-Math.sqrt(D);w>=0&&w<g&&(g=w,_=x)}return _?Te(we(_.pos,t.pos)):this.computeCrosshairDir(t)}computeCrosshairDir(t){const n=this.scene.camera,s=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new $(0,0,-1).applyQuaternion(n.quaternion),f=new $(1,0,0).applyQuaternion(n.quaternion),d=new $(0,1,0).applyQuaternion(n.quaternion),m=Math.tan(n.fov*Math.PI/360),p=new $().addScaledVector(c,1).addScaledVector(f,s*m*n.aspect).addScaledVector(d,l*m).normalize(),g=120,_=new $(n.position.x+p.x*g,t.pos.y,n.position.z+p.z*g);return Te({x:_.x-t.pos.x,y:_.y-t.pos.y,z:_.z-t.pos.z})}pickSmartTarget(t){const s=Xs(t.weapon).smartRadius,l=this.input.getMouseNormX()*this.canvas.width,c=this.input.getMouseNormY()*this.canvas.height;let f=null,d=1/0;for(const m of this.enemies){if(m.hp<=0)continue;const p=this.worldToScreen(m.pos);if(!p)continue;const g=p.x-l,_=p.y-c;if(g*g+_*_>s*s)continue;const x=Ln(t.pos,m.pos);x<d&&(d=x,f=m)}return f}computeLeadDir(t,n,s){const l=this.enemyVels.get(n.id)||{x:0,y:0,z:0},c=s>.001?Ln(t.pos,n.pos)/s:0;let f=Ze(n.pos,Ee(l,c));const d=Ln(t.pos,f);return s>.001&&d>.001&&(f=Ze(n.pos,Ee(l,d/s))),Te(we(f,t.pos))}playerShoot(t,n){const s=Xs(t.weapon);if(!this.scene.playerMeshes.get(t.id))return;const c=this.lockTargets[n],f=c!==null?this.enemies.find(M=>M.id===c&&M.hp>0):null,d=f?Ln(f.pos,t.pos):1/0,m=Math.max(s.lockRange,m_),p=f!==null&&d<=m;if(s.fireMode===Ri.LockRequired&&!p)return;let g;const _=f&&p?f:this.pickSmartTarget(t);_?g=this.computeLeadDir(t,_,s.speed):g=this.computeAimDir(t);const x=s.fireMode===Ri.LockShortRange&&p;if(s.type===dn.Funnel)for(let M=0;M<Dv;M++){const E={id:bi(),pos:{...t.pos},vel:{x:0,y:0,z:0},damage:s.damage,owner:t.id,type:dn.Funnel,lifetime:H2,radius:.3,color:s.color,phase:"orbit",phaseTimer:pd,orbitAngle:M/Dv*Math.PI*2};if(this.projectiles.length<Uh){this.projectiles.push(E);const T=this.scene.createProjectileMesh(s.color,s.type);T.position.set(E.pos.x,E.pos.y,E.pos.z),this.scene.projectileMeshes.set(E.id,T),this.scene.scene.add(T)}}else for(let M=0;M<(s.type===dn.Spread?5:1);M++){const E=s.spread*(Math.random()-.5)*2,T=Te(Ze(g,{x:E,y:E*.5,z:0})),S={id:bi(),pos:{...t.pos},vel:Ee(T,s.speed),damage:s.damage,owner:t.id,type:s.type,lifetime:3,radius:.3,color:s.color};if(x&&f&&(S.vel=Ee(Te(we(f.pos,t.pos)),s.speed)),this.projectiles.length<Uh){this.projectiles.push(S);const v=this.scene.createProjectileMesh(s.color,s.type);v.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,v),this.scene.scene.add(v)}}fi.playShoot(600+Math.random()*400)}useSpecial(t,n){fi.playSpecial(),fi.playSpecialAnnounce(),this.enemies.forEach(s=>{Ln(s.pos,t.pos)<50&&(s.hp-=150,this.scene.createExplosion(s.pos,"#00ffff",2))})}updateEnemies(t){this.enemies.forEach(n=>{if(n.hp<=0){this.scene.createExplosion(n.pos,n.type===ye.Boss?"#ff4400":"#ff6644",n.type===ye.Boss?3:1),fi.playExplosion(),this.enemyLastPos.delete(n.id),this.enemyVels.delete(n.id),this.players.forEach((m,p)=>{const g=n.type===ye.Boss?dd(this.currentBossIndex+1).score:Zc(n.type).score;m.score+=g,m.kills++,m.combo++,this.comboTimeout[p]=tM});return}const s=n.type===ye.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);if(!s)return;const l=this.players.find(m=>m.alive);if(!l)return;const c=Ln(n.pos,l.pos),f=Zc(n.type);switch(n.type){case ye.Scout:this.updateAIScout(n,l,c,f,t);break;case ye.Assault:this.updateAIAssault(n,l,c,f,t);break;case ye.Sniper:this.updateAISniper(n,l,c,f,t);break;case ye.Shield:this.updateAIShield(n,l,c,f,t);break;case ye.Bomber:this.updateAIBomber(n,l,c,f,t);break;case ye.Commander:this.updateAICommander(n,l,c,f,t);break;default:this.updateAIDefault(n,l,c,f,t)}if(n.state===Ht.Patrol&&n.type!==ye.Boss){const m=Te(we(l.pos,n.pos));n.pos=Ze(n.pos,Ee(m,n.speed*.4*t))}n.state===Ht.Flee&&n.fleeTimer!==void 0&&(n.fleeTimer-=t,n.fleeTimer<=0&&(n.state=Ht.Chase)),n.hp<f.hp*.3&&n.type!==ye.Boss&&n.type!==ye.Bomber&&n.state!==Ht.Flee&&n.fleeTimer===void 0&&(n.state=Ht.Flee,n.fleeTimer=hM),n.pos.x=Jn(n.pos.x,-$a,$a),n.pos.y=Jn(n.pos.y,-br,br),n.pos.z=Jn(n.pos.z,-$a,$a);const d=this.enemyLastPos.get(n.id);d?this.enemyVels.set(n.id,Ee(we(n.pos,d),1/Math.max(t,1e-4))):this.enemyVels.set(n.id,{x:0,y:0,z:0}),this.enemyLastPos.set(n.id,{x:n.pos.x,y:n.pos.y,z:n.pos.z}),s.position.set(n.pos.x,n.pos.y,n.pos.z),s.rotation.y+=t*2,n.type===ye.Boss&&(s.rotation.x+=t*.5)}),this.enemies=this.enemies.filter(n=>{if(n.hp<=0){const s=n.type===ye.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);return s&&(this.scene.scene.remove(s),this.scene.enemyMeshes.delete(n.id),this.scene.bossMeshes.delete(n.id)),!1}return!0})}enemyShoot(t,n){const s=Te(we(n.pos,t.pos)),l=Zc(t.type),c={id:bi(),pos:{...t.pos},vel:Ee(s,25),damage:l.damage,owner:t.id+1e4,type:dn.BossBullet,lifetime:4,radius:.3,color:l.color};if(this.projectiles.length<Uh){this.projectiles.push(c);const f=this.scene.createProjectileMesh(l.color,"bullet");f.position.set(c.pos.x,c.pos.y,c.pos.z),this.scene.projectileMeshes.set(c.id,f),this.scene.scene.add(f)}}updateAIDefault(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}break;case Ht.Attack:s>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.8+Math.random()*.6);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(f,t.speed*1.5*c));break}}updateAIScout(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const p=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(p,t.speed*c))}break;case Ht.Attack:s>l.attackRange*1.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos)),d={x:-f.z,y:0,z:f.x};t.pos=Ze(t.pos,Ee(d,t.speed*.8*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.5+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const m=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(m,t.speed*1.5*c));break}}updateAIAssault(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:const f=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(f,t.speed*c)),s<l.attackRange&&(t.state=Ht.Attack);break;case Ht.Attack:const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*.5*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.3+Math.random()*.3),s>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const m=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(m,t.speed*1.5*c));break}}updateAISniper(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else{const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}break;case Ht.Attack:if(s<l.attackRange*.5){const d=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}else s>l.attackRange*1.2&&(t.state=Ht.Chase);t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(f,t.speed*1.5*c));break}}updateAIShield(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const m=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(m,t.speed*c))}break;case Ht.Attack:const f=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(f,t.speed*.3*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1.2+Math.random()*.8),s>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const d=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(d,t.speed*1.5*c));break}}updateAIBomber(t,n,s,l,c){switch(t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:case Ht.Attack:const f=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(f,t.speed*c));break}s<3&&(this.scene.createExplosion(t.pos,"#ff4400",2),fi.playExplosion(),n.hp-=l.damage,n.invulnTimer=d_,t.hp=0)}updateAICommander(t,n,s,l,c){switch(this.enemies.forEach(f=>{if(f.id===t.id||f.hp<=0)return;Ln(t.pos,f.pos)<30&&(f.speed=l.speed*1.3)}),t.state){case Ht.Patrol:s<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(s<l.attackRange)t.state=Ht.Attack;else if(s>l.alertRange*1.5)t.state=Ht.Patrol;else{const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}break;case Ht.Attack:s>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.6+Math.random()*.4);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(f,t.speed*1.5*c));break}}updateProjectiles(t){this.projectiles.forEach(n=>{n.type===dn.Missile?this.steerMissile(n,t):n.type===dn.Funnel&&this.updateFunnel(n,t),n.pos=Ze(n.pos,Ee(n.vel,t)),n.lifetime-=t;const s=this.scene.projectileMeshes.get(n.id);s&&(s.position.set(n.pos.x,n.pos.y,n.pos.z),n.type===dn.Missile&&(s.rotation.x+=t*5))}),this.projectiles=this.projectiles.filter(n=>{if(n.lifetime<=0){const s=this.scene.projectileMeshes.get(n.id);return s&&(this.scene.scene.remove(s),this.scene.projectileMeshes.delete(n.id)),!1}return!0})}steerMissile(t,n){const s=t.owner>=1e4,l=(s?B2:z2)*n;let c=null;if(s){let S=null,v=1/0;for(const L of this.players){if(!L.alive)continue;const D=Ln(t.pos,L.pos);D<v&&(v=D,S=L)}S&&(c=Te(we(S.pos,t.pos)))}else{let S=null;const v=this.players.findIndex(D=>D.id===t.owner),L=v>=0?this.lockTargets[v]:null;if(L!=null){const D=this.enemies.find(w=>w.id===L&&w.hp>0);D&&(S=D)}if(!S){let D=1/0;for(const w of this.enemies){if(w.hp<=0)continue;const W=Ln(t.pos,w.pos);W<D&&(D=W,S=w)}}S&&(c=Te(we(S.pos,t.pos)))}if(!c)return;const f=Math.sqrt(t.vel.x*t.vel.x+t.vel.y*t.vel.y+t.vel.z*t.vel.z);if(f<1e-4)return;const d=Te(t.vel),m=Jn(d.x*c.x+d.y*c.y+d.z*c.z,-1,1),p=Math.acos(m);if(p<=l||p<1e-6){t.vel=Ee(c,f);return}let g=d.y*c.z-d.z*c.y,_=d.z*c.x-d.x*c.z,x=d.x*c.y-d.y*c.x;const M=Math.sqrt(g*g+_*_+x*x);if(M<1e-6){const S=Math.abs(d.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};g=d.y*S.z-d.z*S.y,_=d.z*S.x-d.x*S.z,x=d.x*S.y-d.y*S.x}else g/=M,_/=M,x/=M;const E=Math.cos(l),T=Math.sin(l);t.vel={x:(d.x*E+(_*d.z-x*d.y)*T)*f,y:(d.y*E+(x*d.x-g*d.z)*T)*f,z:(d.z*E+(g*d.y-_*d.x)*T)*f}}updateFunnel(t,n){const s=this.players.find(l=>l.id===t.owner);if(!(!s||!s.alive)&&t.phase!=="strike"){t.phaseTimer=(t.phaseTimer??pd)-n;const l=(t.orbitAngle??0)+I2*n;if(t.orbitAngle=l,t.pos={x:s.pos.x+Math.cos(l)*Uv,y:s.pos.y+Math.sin(l*3)*.6,z:s.pos.z+Math.sin(l)*Uv},t.vel={x:0,y:0,z:0},t.phaseTimer<=0){let c=null,f=1/0;for(const d of this.enemies){if(d.hp<=0)continue;const m=Ln(t.pos,d.pos);m<f&&(f=m,c=d)}c?(t.phase="strike",t.vel=Ee(Te(we(c.pos,t.pos)),F2)):(t.phase="orbit",t.phaseTimer=pd)}}}updateParticles(t){}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(n=>{const s=n.type===ye.Boss?4:1.5;Ln(t.pos,n.pos)<s&&(n.hp-=(n.shieldTimer||0)>0?t.damage*.5:t.damage,t.lifetime=0,this.scene.createExplosion(t.pos,"#ffaa00",.5),fi.playHit())})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(n=>{!n.alive||n.invulnTimer>0||Ln(t.pos,n.pos)<QS&&(n.hp-=t.damage,t.lifetime=0,n.invulnTimer=d_,this.cameraShake=.15,this.scene.createExplosion(t.pos,"#ff4444",.5),fi.playHit(),n.hp<=0&&(n.alive=!1,this.scene.createExplosion(n.pos,"#4488ff",3)))})})}spawnEnemies(t){const n=_n.getState(),s=n.game;if(s.wave<1){this.levelSpawned=0,this.enemySpawnTimer=0,this.waveTimer=0,n.setGame({wave:1});return}if(this.waveTimer>0){this.waveTimer-=t;return}const l=s.wave%JS===0;if(l&&!this.enemies.some(p=>p.type===ye.Boss)&&this.currentBossIndex<0){this.spawnBoss();return}const c=l?0:Math.min(6+s.wave,p_);if(this.enemySpawnTimer+=t,this.levelSpawned<c&&this.enemies.length<p_&&this.enemySpawnTimer>=.15){this.enemySpawnTimer=0;const p=[ye.Scout,ye.Assault,ye.Shield];s.wave>2&&p.push(ye.Sniper),s.wave>3&&p.push(ye.Bomber),s.wave>4&&p.push(ye.Commander);const g=p[P2(0,p.length-1)],_=Zc(g);let x;do{const T=Gr(30,Math.min(_.alertRange+25,80)),S=Math.random()*Math.PI*2,v=Gr(-.5,.5);x={x:this.players[0].pos.x+Math.sin(S)*T,y:Jn(this.players[0].pos.y+Math.sin(v)*T,-br*.5,br*.5),z:this.players[0].pos.z+Math.cos(S)*T}}while(this.players.some(T=>Ln(x,T.pos)<20));const M={id:bi(),type:g,pos:x,rot:{x:0,y:0,z:0},hp:_.hp*(1+s.wave*.1),maxHp:_.hp,speed:_.speed*(1+s.wave*.05),state:Ht.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(M);const E=this.scene.createEnemyMesh(new fe(_.color),_.size,g);E.position.set(x.x,x.y,x.z),this.scene.enemyMeshes.set(M.id,E),this.scene.scene.add(E),this.levelSpawned++}const f=this.enemies.some(p=>p.type===ye.Boss),d=this.enemies.some(p=>p.hp>0);(l?this.currentBossIndex>=0&&!f:this.levelSpawned>=c&&!d)&&(this.enemies.forEach(p=>{const g=p.type===ye.Boss?this.scene.bossMeshes.get(p.id):this.scene.enemyMeshes.get(p.id);g&&(this.scene.scene.remove(g),this.scene.enemyMeshes.delete(p.id),this.scene.bossMeshes.delete(p.id))}),this.enemies=[],this.levelSpawned=0,this.enemySpawnTimer=0,this.currentBossIndex=-1,this.waveTimer=2.5,n.setGame({wave:s.wave+1}))}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0;const n=dd(t+1),s={x:Gr(-30,30),y:5,z:-50},l={id:bi(),type:ye.Boss,pos:s,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Ht.Phase1,targetId:0,attackTimer:2,phase:1,shieldTimer:0};this.enemies.push(l);const c=this.scene.createBossMesh(new fe(n.color),n.size);c.position.set(s.x,s.y,s.z),this.scene.bossMeshes.set(l.id,c),this.scene.scene.add(c),fi.playBossWarning(),fi.playBossAnnounce(n.name),_n.getState().setGame({bossFight:!0,bossName:n.name})}updateBoss(t){const n=this.enemies.find(f=>f.type===ye.Boss);if(!n){_n.getState().game.bossFight&&_n.getState().setGame({bossFight:!1,bossName:""});return}const s=dd(this.currentBossIndex+1),l=n.hp/n.maxHp;if(s.phases.forEach((f,d)=>{l<=f.hpPercent&&(n.phase||1)<=d&&(n.phase=d+1,n.speed=f.speed,n.state=["phase1","phase2","phase3","phase4"][d])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(p=>p.alive);if(!f)return;const d=s.phases[(n.phase||1)-1];switch(d.attackPattern){case"spread":for(let g=0;g<12;g++){const _=g/12*Math.PI*2,x={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:bi(),pos:{...n.pos},vel:Ee(x,10),damage:5,owner:n.id+1e4,type:dn.BossBullet,lifetime:4,radius:.3,color:"#ff4444"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff4444","bullet");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"laser":case"finalBeam":{const g=Te(we(f.pos,n.pos)),_={id:bi(),pos:{...n.pos},vel:Ee(g,30),damage:25,owner:n.id+1e4,type:dn.Laser,lifetime:2,radius:.5,color:"#ff0000"};this.projectiles.push(_);const x=this.scene.createProjectileMesh("#ff0000","beam");x.position.set(_.pos.x,_.pos.y,_.pos.z),x.scale.set(1,1,3),this.scene.projectileMeshes.set(_.id,x),this.scene.scene.add(x);break}case"missile":for(let g=0;g<5;g++){const _=Te(we(f.pos,n.pos)),x={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2},M={id:bi(),pos:{...n.pos},vel:Ee(Ze(_,x),8),damage:10,owner:n.id+1e4,type:dn.Missile,lifetime:5,radius:.4,color:"#ffaa00"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ffaa00","missile");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"rush":n.speed=20;const p=Te(we(f.pos,n.pos));n.pos=Ze(n.pos,Ee(p,n.speed*t));break;case"clone":{const g=Te(we(f.pos,n.pos)),_=Math.atan2(g.z,g.x);for(let x=-2;x<=2;x++){const M=_+x*.6,E=Te({x:Math.cos(M),y:g.y,z:Math.sin(M)}),T={id:bi(),pos:{...n.pos},vel:Ee(E,16),damage:8,owner:n.id+1e4,type:dn.BossBullet,lifetime:3.5,radius:.3,color:"#ff00ff"};this.projectiles.push(T);const S=this.scene.createProjectileMesh("#ff00ff","bullet");S.position.set(T.pos.x,T.pos.y,T.pos.z),this.scene.projectileMeshes.set(T.id,S),this.scene.scene.add(S)}break}case"fullLaser":{for(let g=0;g<6;g++){const _=this.bossSweepAngle+g/6*Math.PI*2,x={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:bi(),pos:{...n.pos},vel:Ee(x,26),damage:15,owner:n.id+1e4,type:dn.Laser,lifetime:2.2,radius:.5,color:"#ff00ff"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff00ff","beam");E.position.set(M.pos.x,M.pos.y,M.pos.z),E.scale.set(1,1,3),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}this.bossSweepAngle+=Math.PI/8;break}case"shield":n.shieldTimer=Math.max(n.shieldTimer||0,4);break;case"laserNet":{const g=Te(we(f.pos,n.pos)),_=Math.atan2(g.z,g.x)+this.bossNetAngle;for(let x=0;x<9;x++){const M=x/8-.5,E=_+M*Math.PI*.66,T={x:Math.cos(E),y:0,z:Math.sin(E)},S={id:bi(),pos:{...n.pos},vel:Ee(T,25),damage:12,owner:n.id+1e4,type:dn.Laser,lifetime:2.5,radius:.4,color:"#ffaa00"};this.projectiles.push(S);const v=this.scene.createProjectileMesh("#ffaa00","beam");v.position.set(S.pos.x,S.pos.y,S.pos.z),v.scale.set(1,1,3),this.scene.projectileMeshes.set(S.id,v),this.scene.scene.add(v)}this.bossNetAngle+=Math.PI/9;break}case"spawn":if(d.minionSpawn)for(let g=0;g<3;g++){const _={id:bi(),type:ye.Scout,pos:{x:n.pos.x+Gr(-5,5),y:0,z:n.pos.z+Gr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Ht.Chase,targetId:0,attackTimer:1};this.enemies.push(_);const x=this.scene.createEnemyMesh(new fe(4500223),1,"scout");x.position.set(_.pos.x,_.pos.y,_.pos.z),this.scene.enemyMeshes.set(_.id,x),this.scene.scene.add(x)}break}}const c=this.players.find(f=>f.alive);if(c){const f=s.phases[(n.phase||1)-1],d=Te(we(c.pos,n.pos));n.pos=Ze(n.pos,Ee(d,(f?f.speed:n.speed)*t))}(n.shieldTimer||0)>0&&(n.shieldTimer=Math.max(0,(n.shieldTimer||0)-t))}updateUI(t){const n=_n.getState(),s=n.game;!this.players[0].alive&&!s.gameOver&&(n.setGame({gameOver:!0,screen:"result"}),this.stop()),n.setPlayers(this.players),n.setGame({score:this.players.reduce((l,c)=>l+c.score,0),time:s.time+t})}render(t){this.players.forEach((n,s)=>{const l=this.computeCrosshairDir(n);this.scene.updateCamera(n.pos,t,Math.atan2(l.x,l.z),this.cameraStiffness);const c=this.velocities[s],f=Math.min(1,Math.hypot(c.x,c.y,c.z)/n.speed);if(this.scene.setSpeedRatio(f),this.cameraShake>0){const p=this.scene.camera,g=this.cameraShake*2.5;p.position.x+=(Math.random()-.5)*g,p.position.y+=(Math.random()-.5)*g,this.cameraShake-=t}const d=this.lockTargets[s],m=d!==null?this.enemies.find(p=>p.id===d&&p.hp>0):null;if(m){const p=Xs(n.weapon),g=Math.max(p.lockRange,m_),_=Ln(m.pos,n.pos)<=g?"#00ff88":"#ff4444";this.scene.updateLockIndicator(n.id,n.pos,m.pos,_)}else this.scene.updateLockIndicator(n.id,n.pos,null)}),this.scene.render()}}const Lv=["w","W","a","A","s","S","d","D","e","E","z","Z"," ","Tab","1","2","3","4","5","6","Shift","Control","Enter"],V2=()=>{const r=Os.useRef(null),t=Os.useRef(null),n=Os.useRef(null),s=Os.useRef(null),l=Os.useRef({x:0,y:0});return Os.useEffect(()=>{const c=r.current;if(!c)return;c.width=window.innerWidth,c.height=window.innerHeight;const f=new G2(c);t.current=f;const d=()=>{c.width=window.innerWidth,c.height=window.innerHeight,f.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",d);const m=()=>{const v=n.current;if(!v)return;const L=f.input.getMouseNormX()*c.width,D=f.input.getMouseNormY()*c.height;v.style.transform=`translate(${L}px, ${D}px) translate(-50%, -50%)`};let p=0;const g=()=>{var L;m();const v=Xs(((L=_n.getState().players[0])==null?void 0:L.weapon)||1);s.current&&s.current.getAttribute("r")!==String(v.smartRadius)&&s.current.setAttribute("r",String(v.smartRadius)),p=requestAnimationFrame(g)};p=requestAnimationFrame(g);const _=v=>{(v.ctrlKey||v.metaKey)&&v.preventDefault(),f.input.keyDown(v.key),v.key==="Escape"&&(document.pointerLockElement===c&&document.exitPointerLock(),_n.getState().setGame({screen:"pause"})),Lv.includes(v.key)&&v.preventDefault()},x=v=>{f.input.keyUp(v.key),Lv.includes(v.key)&&v.preventDefault()},M=v=>{const L=l.current;if(document.pointerLockElement===c)L.x=Math.max(0,Math.min(c.width,L.x+v.movementX)),L.y=Math.max(0,Math.min(c.height,L.y+v.movementY));else{const D=c.getBoundingClientRect();L.x=v.clientX-D.left,L.y=v.clientY-D.top}f.input.mouseMove(L.x,L.y)},E=()=>{f.input.mouseDownFn(),document.pointerLockElement!==c&&c.requestPointerLock()},T=()=>f.input.mouseUpFn();window.addEventListener("keydown",_),window.addEventListener("keyup",x),c.addEventListener("mousemove",M),c.addEventListener("mousedown",E),c.addEventListener("mouseup",T);const S=v=>v.preventDefault();return c.addEventListener("contextmenu",S),f.start(),()=>{f.stop(),cancelAnimationFrame(p),window.removeEventListener("resize",d),window.removeEventListener("keydown",_),window.removeEventListener("keyup",x),c.removeEventListener("mousemove",M),c.removeEventListener("mousedown",E),c.removeEventListener("mouseup",T),c.removeEventListener("contextmenu",S)}},[]),nt.jsxs(nt.Fragment,{children:[nt.jsx("canvas",{ref:r,className:"absolute top-0 left-0 w-full h-full cursor-none"}),nt.jsxs("div",{ref:n,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{transform:"translate(-50%, -50%)"},children:[nt.jsx("svg",{className:"absolute -translate-x-1/2 -translate-y-1/2 overflow-visible",width:"0",height:"0",children:nt.jsx("circle",{ref:s,cx:"0",cy:"0",r:"60",fill:"none",stroke:"#33ff66",strokeOpacity:"0.35",strokeWidth:"1",strokeDasharray:"5 4"})}),nt.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:[nt.jsx("circle",{cx:"14",cy:"14",r:"10",fill:"none",stroke:"#33ff66",strokeWidth:"1.5"}),nt.jsx("circle",{cx:"14",cy:"14",r:"1.8",fill:"#33ff66"})]})]})]})},k2={[Ri.FreeFire]:"FR",[Ri.LockShortRange]:"SR",[Ri.LockRequired]:"LCK"},ru="#6a7fff",Nv="#33ff66",il="#ff3030",Kc="#ffdd44",xa="#ffffff",Qc="rgba(255,255,255,0.55)",Hr="rgba(255,255,255,0.35)",Jc=({children:r,className:t="",color:n=ru})=>nt.jsx("div",{className:`relative border-2 bg-black/80 ${t}`,style:{borderColor:n},children:r}),$c=({pct:r,fill:t})=>nt.jsx("div",{className:"relative w-full h-[10px] border border-white/30 bg-black/85 overflow-hidden",children:nt.jsx("div",{className:"h-full",style:{width:`${r}%`,background:t}})}),X2=()=>{const{game:r,players:t}=_n(),n=t[0];if(!n)return null;const s=Xs(n.weapon),l=Math.max(0,n.hp/n.maxHp*100),c=Math.max(0,n.energy/n.maxEnergy*100),f=Math.max(0,n.specialGauge/n.maxSpecialGauge*100),d=Math.round(n.speed);return nt.jsxs(nt.Fragment,{children:[nt.jsx("div",{className:"absolute top-3 left-3",children:nt.jsxs(Jc,{className:"px-3 py-2 min-w-[150px]",children:[nt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[nt.jsx("span",{style:{color:xa},children:"P1"}),nt.jsx("span",{style:{color:Nv},children:"EN"})]}),nt.jsx($c,{pct:c,fill:Nv}),nt.jsx("div",{className:"flex items-center justify-between text-[10px] mt-0.5",style:{color:Qc},children:nt.jsxs("span",{children:[Math.ceil(n.energy),"/",n.maxEnergy]})})]})}),nt.jsx("div",{className:"absolute top-3 right-3",children:nt.jsxs(Jc,{className:"px-3 py-2 min-w-[200px]",color:r.bossFight?il:ru,children:[nt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[nt.jsxs("span",{style:{color:xa},children:["LEVEL ",r.wave]}),nt.jsx("span",{style:{color:r.bossFight?il:Qc},children:r.bossFight?"BOSS":"PVE"})]}),r.bossFight&&nt.jsxs(nt.Fragment,{children:[nt.jsx("div",{className:"text-[10px] mb-1",style:{color:il},children:r.bossName}),nt.jsx($c,{pct:100,fill:il})]})]})}),nt.jsx("div",{className:"absolute bottom-3 left-3",children:nt.jsxs(Jc,{className:"px-3 py-2 min-w-[260px]",children:[nt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[nt.jsx("span",{style:{color:xa},children:"ARMOR"}),nt.jsxs("span",{style:{color:xa},children:[Math.ceil(n.hp),"/",n.maxHp]})]}),nt.jsx($c,{pct:l,fill:il}),nt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mt-2 mb-1",children:[nt.jsx("span",{style:{color:xa},children:"SP"}),nt.jsxs("span",{style:{color:Kc},children:[Math.ceil(n.specialGauge),"%"]})]}),nt.jsx($c,{pct:f,fill:Kc}),nt.jsxs("div",{className:"flex items-center gap-2 mt-2 text-[10px]",style:{color:Qc},children:[nt.jsx("span",{style:{color:Hr},children:"WPN"}),nt.jsx("span",{style:{color:xa},children:s.name}),nt.jsxs("span",{children:["DMG:",s.damage]}),nt.jsxs("span",{style:{color:xa},children:["[",k2[s.fireMode],"]"]})]}),nt.jsxs("div",{className:"flex items-center gap-2 mt-1 text-[10px]",style:{color:Qc},children:[nt.jsx("span",{style:{color:Hr},children:"SCORE"}),nt.jsx("span",{style:{color:xa},children:n.score}),n.combo>1&&nt.jsxs("span",{style:{color:Kc},children:["x",n.combo]})]})]})}),nt.jsx("div",{className:"absolute bottom-3 left-1/2 -translate-x-1/2",children:nt.jsxs("div",{className:"flex items-center gap-3",children:[nt.jsxs("div",{className:"px-3 py-2 border-2 bg-black/80",style:{borderColor:ru},children:[nt.jsx("div",{className:"text-[10px] tracking-widest",style:{color:Hr},children:"SPEED"}),nt.jsx("div",{className:"font-mono text-2xl leading-none",style:{color:Kc},children:String(d).padStart(3,"0")})]}),nt.jsxs("div",{className:"px-3 py-2 border-2 bg-black/80",style:{borderColor:ru},children:[nt.jsx("div",{className:"text-[10px] tracking-widest",style:{color:Hr},children:"TIME"}),nt.jsxs("div",{className:"font-mono text-2xl leading-none",style:{color:xa},children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]})}),nt.jsx("div",{className:"absolute bottom-3 right-3",children:nt.jsxs(Jc,{className:"px-2 py-2",children:[nt.jsx("div",{className:"text-[10px] mb-1 tracking-wider",style:{color:Hr},children:"WEAPON"}),nt.jsx("div",{className:"flex items-center gap-1.5",children:n.weapons.map(m=>{const p=Xs(m),g=m===n.weapon;return nt.jsx("div",{className:"w-9 h-9 flex items-center justify-center border",style:{background:"#ffdd44",borderColor:g?"#ffffff":"#000000"},title:p.name,children:nt.jsx("span",{style:{color:"#000000",fontSize:18,fontWeight:"bold"},children:m})},m)})})]})}),nt.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2",children:nt.jsx("div",{className:"px-3 py-1 bg-black/70 text-[9px] tracking-wider",style:{color:Hr},children:"WASD MOVE · MOUSE AIM · LMB FIRE · SPACE BOOST · E BRAKE · 1-4 SWITCH · Z SPECIAL · ESC PAUSE"})})]})},q2=({size:r=80,opacity:t=.5})=>nt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[nt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),nt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),W2=()=>{const{game:r,setGame:t}=_n();return nt.jsxs("div",{className:"lancer-bg absolute inset-0 z-50 flex flex-col items-center justify-center",children:[nt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.05]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px"}}),nt.jsxs("div",{className:"relative z-10 mx-auto w-[420px] max-w-[90vw] lancer-frame px-8 py-6",children:[nt.jsx("h2",{className:"font-pixel-title text-center leading-none",style:{color:"#6a7fff",fontSize:"40px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff",letterSpacing:"0.1em"},children:"暂停"}),nt.jsx("div",{className:"text-center text-[10px] tracking-[0.3em] mt-1",style:{color:"#8fa4ff"},children:"PAUSED"}),nt.jsxs("div",{className:"mt-6 border-t border-lancer-blue/40 pt-4 space-y-2",children:[nt.jsx("button",{onClick:()=>t({screen:"pve",paused:!1}),className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"继续"}),nt.jsx("button",{onClick:()=>{_n.getState().resetGame(),t({screen:"menu"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"返回主菜单"})]}),nt.jsx("div",{className:"mt-4 flex items-center justify-center",children:nt.jsx(q2,{size:32,opacity:.5})})]})]})},Y2=({size:r=80,opacity:t=.5})=>nt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[nt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),nt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),j2=()=>{const{game:r,players:t}=_n(),n=_n(s=>s.setGame);return nt.jsxs("div",{className:"lancer-bg w-full h-full flex flex-col items-center justify-center",children:[nt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.05]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px"}}),nt.jsx("div",{className:"relative z-10 lancer-frame-danger px-8 py-3 mb-6",children:nt.jsx("h1",{className:"font-pixel-title text-center leading-none tracking-[0.15em]",style:{color:"#ff3030",fontSize:"32px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff"},children:"GAME OVER"})}),nt.jsxs("div",{className:"relative z-10 lancer-frame-dim w-[340px] max-w-[90vw] px-5 py-4 mb-6",children:[nt.jsx("h3",{className:"font-pixel text-[14px] mb-3 tracking-[0.2em]",style:{color:"#6a7fff"},children:"战 绩"}),t.map((s,l)=>nt.jsxs("div",{className:"flex justify-between text-[13px] mb-1.5 tracking-wider",children:[nt.jsxs("span",{style:{color:"#ffffff"},children:["P",l+1]}),nt.jsxs("span",{style:{color:"#ffdd44"},children:["KILLS:",s.kills,"  SCORE:",s.score]})]},s.id)),nt.jsxs("div",{className:"flex justify-between text-[13px] mt-2 pt-2 tracking-wider",style:{borderTop:"1px solid rgba(106,127,255,0.4)"},children:[nt.jsx("span",{style:{color:"#ffffff"},children:"关卡"}),nt.jsxs("span",{style:{color:"#ffdd44"},children:["LEVEL ",r.wave]})]}),nt.jsxs("div",{className:"flex justify-between text-[13px] mt-1 tracking-wider",children:[nt.jsx("span",{style:{color:"#ffffff"},children:"用时"}),nt.jsxs("span",{style:{color:"#ffdd44"},children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]}),nt.jsxs("div",{className:"relative z-10 space-y-2 w-[260px]",children:[nt.jsx("button",{onClick:()=>{_n.getState().resetGame(),n({screen:"pve",gameMode:"pve"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"再来一局"}),nt.jsx("button",{onClick:()=>{_n.getState().resetGame(),n({screen:"menu"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"返回主菜单"})]}),nt.jsxs("div",{className:"mt-6 flex items-center gap-2",children:[nt.jsx(Y2,{size:28,opacity:.5}),nt.jsx("span",{className:"text-[10px] tracking-wider",style:{color:"rgba(255,255,255,0.5)"},children:"FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79"})]})]})},Z2=()=>{const r=_n(n=>n.game),t=()=>{switch(r.screen){case"menu":return nt.jsx(M_,{});case"pve":return nt.jsxs("div",{className:"w-full h-full relative",children:[nt.jsx(V2,{}),nt.jsx(X2,{})]});case"pause":return nt.jsxs("div",{className:"w-full h-full relative",children:[nt.jsx("div",{className:"w-full h-full bg-black/30"}),nt.jsx(W2,{})]});case"result":return nt.jsx(j2,{});default:return nt.jsx(M_,{})}};return nt.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};kS.createRoot(document.getElementById("root")).render(nt.jsx(al.StrictMode,{children:nt.jsx(Z2,{})}));
