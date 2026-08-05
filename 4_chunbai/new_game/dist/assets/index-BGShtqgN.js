var DS=Object.defineProperty;var US=(r,t,n)=>t in r?DS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var Pt=(r,t,n)=>US(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function Nv(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Th={exports:{}},Zo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qg;function LS(){if(Qg)return Zo;Qg=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:a,key:f,ref:l!==void 0?l:null,props:c}}return Zo.Fragment=t,Zo.jsx=n,Zo.jsxs=n,Zo}var Jg;function NS(){return Jg||(Jg=1,Th.exports=LS()),Th.exports}var tt=NS(),bh={exports:{}},ie={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $g;function OS(){if($g)return ie;$g=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.iterator;function M(P){return P===null||typeof P!="object"?null:(P=x&&P[x]||P["@@iterator"],typeof P=="function"?P:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,S={};function v(P,st,yt){this.props=P,this.context=st,this.refs=S,this.updater=yt||E}v.prototype.isReactComponent={},v.prototype.setState=function(P,st){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,st,"setState")},v.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function L(){}L.prototype=v.prototype;function D(P,st,yt){this.props=P,this.context=st,this.refs=S,this.updater=yt||E}var w=D.prototype=new L;w.constructor=D,T(w,v.prototype),w.isPureReactComponent=!0;var W=Array.isArray;function F(){}var O={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function U(P,st,yt){var Z=yt.ref;return{$$typeof:r,type:P,key:st,ref:Z!==void 0?Z:null,props:yt}}function R(P,st){return U(P.type,st,P.props)}function B(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function j(P){var st={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(yt){return st[yt]})}var $=/\/+/g;function lt(P,st){return typeof P=="object"&&P!==null&&P.key!=null?j(""+P.key):st.toString(36)}function ft(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(F,F):(P.status="pending",P.then(function(st){P.status==="pending"&&(P.status="fulfilled",P.value=st)},function(st){P.status==="pending"&&(P.status="rejected",P.reason=st)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function z(P,st,yt,Z,ht){var Et=typeof P;(Et==="undefined"||Et==="boolean")&&(P=null);var xt=!1;if(P===null)xt=!0;else switch(Et){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(P.$$typeof){case r:case t:xt=!0;break;case g:return xt=P._init,z(xt(P._payload),st,yt,Z,ht)}}if(xt)return ht=ht(P),xt=Z===""?"."+lt(P,0):Z,W(ht)?(yt="",xt!=null&&(yt=xt.replace($,"$&/")+"/"),z(ht,st,yt,"",function(ae){return ae})):ht!=null&&(B(ht)&&(ht=R(ht,yt+(ht.key==null||P&&P.key===ht.key?"":(""+ht.key).replace($,"$&/")+"/")+xt)),st.push(ht)),1;xt=0;var Vt=Z===""?".":Z+":";if(W(P))for(var Gt=0;Gt<P.length;Gt++)Z=P[Gt],Et=Vt+lt(Z,Gt),xt+=z(Z,st,yt,Et,ht);else if(Gt=M(P),typeof Gt=="function")for(P=Gt.call(P),Gt=0;!(Z=P.next()).done;)Z=Z.value,Et=Vt+lt(Z,Gt++),xt+=z(Z,st,yt,Et,ht);else if(Et==="object"){if(typeof P.then=="function")return z(ft(P),st,yt,Z,ht);throw st=String(P),Error("Objects are not valid as a React child (found: "+(st==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":st)+"). If you meant to render a collection of children, use an array instead.")}return xt}function Q(P,st,yt){if(P==null)return P;var Z=[],ht=0;return z(P,Z,"","",function(Et){return st.call(yt,Et,ht++)}),Z}function K(P){if(P._status===-1){var st=P._result;st=st(),st.then(function(yt){(P._status===0||P._status===-1)&&(P._status=1,P._result=yt)},function(yt){(P._status===0||P._status===-1)&&(P._status=2,P._result=yt)}),P._status===-1&&(P._status=0,P._result=st)}if(P._status===1)return P._result.default;throw P._result}var St=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var st=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(st))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Tt={map:Q,forEach:function(P,st,yt){Q(P,function(){st.apply(this,arguments)},yt)},count:function(P){var st=0;return Q(P,function(){st++}),st},toArray:function(P){return Q(P,function(st){return st})||[]},only:function(P){if(!B(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return ie.Activity=_,ie.Children=Tt,ie.Component=v,ie.Fragment=n,ie.Profiler=l,ie.PureComponent=D,ie.StrictMode=a,ie.Suspense=m,ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,ie.__COMPILER_RUNTIME={__proto__:null,c:function(P){return O.H.useMemoCache(P)}},ie.cache=function(P){return function(){return P.apply(null,arguments)}},ie.cacheSignal=function(){return null},ie.cloneElement=function(P,st,yt){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Z=T({},P.props),ht=P.key;if(st!=null)for(Et in st.key!==void 0&&(ht=""+st.key),st)!H.call(st,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&st.ref===void 0||(Z[Et]=st[Et]);var Et=arguments.length-2;if(Et===1)Z.children=yt;else if(1<Et){for(var xt=Array(Et),Vt=0;Vt<Et;Vt++)xt[Vt]=arguments[Vt+2];Z.children=xt}return U(P.type,ht,Z)},ie.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},ie.createElement=function(P,st,yt){var Z,ht={},Et=null;if(st!=null)for(Z in st.key!==void 0&&(Et=""+st.key),st)H.call(st,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ht[Z]=st[Z]);var xt=arguments.length-2;if(xt===1)ht.children=yt;else if(1<xt){for(var Vt=Array(xt),Gt=0;Gt<xt;Gt++)Vt[Gt]=arguments[Gt+2];ht.children=Vt}if(P&&P.defaultProps)for(Z in xt=P.defaultProps,xt)ht[Z]===void 0&&(ht[Z]=xt[Z]);return U(P,Et,ht)},ie.createRef=function(){return{current:null}},ie.forwardRef=function(P){return{$$typeof:d,render:P}},ie.isValidElement=B,ie.lazy=function(P){return{$$typeof:g,_payload:{_status:-1,_result:P},_init:K}},ie.memo=function(P,st){return{$$typeof:p,type:P,compare:st===void 0?null:st}},ie.startTransition=function(P){var st=O.T,yt={};O.T=yt;try{var Z=P(),ht=O.S;ht!==null&&ht(yt,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(F,St)}catch(Et){St(Et)}finally{st!==null&&yt.types!==null&&(st.types=yt.types),O.T=st}},ie.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},ie.use=function(P){return O.H.use(P)},ie.useActionState=function(P,st,yt){return O.H.useActionState(P,st,yt)},ie.useCallback=function(P,st){return O.H.useCallback(P,st)},ie.useContext=function(P){return O.H.useContext(P)},ie.useDebugValue=function(){},ie.useDeferredValue=function(P,st){return O.H.useDeferredValue(P,st)},ie.useEffect=function(P,st){return O.H.useEffect(P,st)},ie.useEffectEvent=function(P){return O.H.useEffectEvent(P)},ie.useId=function(){return O.H.useId()},ie.useImperativeHandle=function(P,st,yt){return O.H.useImperativeHandle(P,st,yt)},ie.useInsertionEffect=function(P,st){return O.H.useInsertionEffect(P,st)},ie.useLayoutEffect=function(P,st){return O.H.useLayoutEffect(P,st)},ie.useMemo=function(P,st){return O.H.useMemo(P,st)},ie.useOptimistic=function(P,st){return O.H.useOptimistic(P,st)},ie.useReducer=function(P,st,yt){return O.H.useReducer(P,st,yt)},ie.useRef=function(P){return O.H.useRef(P)},ie.useState=function(P){return O.H.useState(P)},ie.useSyncExternalStore=function(P,st,yt){return O.H.useSyncExternalStore(P,st,yt)},ie.useTransition=function(){return O.H.useTransition()},ie.version="19.2.8",ie}var t_;function ip(){return t_||(t_=1,bh.exports=OS()),bh.exports}var Os=ip();const al=Nv(Os);var Ah={exports:{}},Ko={},Rh={exports:{}},wh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e_;function PS(){return e_||(e_=1,(function(r){function t(z,Q){var K=z.length;z.push(Q);t:for(;0<K;){var St=K-1>>>1,Tt=z[St];if(0<l(Tt,Q))z[St]=Q,z[K]=Tt,K=St;else break t}}function n(z){return z.length===0?null:z[0]}function a(z){if(z.length===0)return null;var Q=z[0],K=z.pop();if(K!==Q){z[0]=K;t:for(var St=0,Tt=z.length,P=Tt>>>1;St<P;){var st=2*(St+1)-1,yt=z[st],Z=st+1,ht=z[Z];if(0>l(yt,K))Z<Tt&&0>l(ht,yt)?(z[St]=ht,z[Z]=K,St=Z):(z[St]=yt,z[st]=K,St=st);else if(Z<Tt&&0>l(ht,K))z[St]=ht,z[Z]=K,St=Z;else break t}}return Q}function l(z,Q){var K=z.sortIndex-Q.sortIndex;return K!==0?K:z.id-Q.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();r.unstable_now=function(){return f.now()-d}}var m=[],p=[],g=1,_=null,x=3,M=!1,E=!1,T=!1,S=!1,v=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function w(z){for(var Q=n(p);Q!==null;){if(Q.callback===null)a(p);else if(Q.startTime<=z)a(p),Q.sortIndex=Q.expirationTime,t(m,Q);else break;Q=n(p)}}function W(z){if(T=!1,w(z),!E)if(n(m)!==null)E=!0,F||(F=!0,j());else{var Q=n(p);Q!==null&&ft(W,Q.startTime-z)}}var F=!1,O=-1,H=5,U=-1;function R(){return S?!0:!(r.unstable_now()-U<H)}function B(){if(S=!1,F){var z=r.unstable_now();U=z;var Q=!0;try{t:{E=!1,T&&(T=!1,L(O),O=-1),M=!0;var K=x;try{e:{for(w(z),_=n(m);_!==null&&!(_.expirationTime>z&&R());){var St=_.callback;if(typeof St=="function"){_.callback=null,x=_.priorityLevel;var Tt=St(_.expirationTime<=z);if(z=r.unstable_now(),typeof Tt=="function"){_.callback=Tt,w(z),Q=!0;break e}_===n(m)&&a(m),w(z)}else a(m);_=n(m)}if(_!==null)Q=!0;else{var P=n(p);P!==null&&ft(W,P.startTime-z),Q=!1}}break t}finally{_=null,x=K,M=!1}Q=void 0}}finally{Q?j():F=!1}}}var j;if(typeof D=="function")j=function(){D(B)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,lt=$.port2;$.port1.onmessage=B,j=function(){lt.postMessage(null)}}else j=function(){v(B,0)};function ft(z,Q){O=v(function(){z(r.unstable_now())},Q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(z){switch(x){case 1:case 2:case 3:var Q=3;break;default:Q=x}var K=x;x=Q;try{return z()}finally{x=K}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(z,Q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var K=x;x=z;try{return Q()}finally{x=K}},r.unstable_scheduleCallback=function(z,Q,K){var St=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?St+K:St):K=St,z){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=K+Tt,z={id:g++,callback:Q,priorityLevel:z,startTime:K,expirationTime:Tt,sortIndex:-1},K>St?(z.sortIndex=K,t(p,z),n(m)===null&&z===n(p)&&(T?(L(O),O=-1):T=!0,ft(W,K-St))):(z.sortIndex=Tt,t(m,z),E||M||(E=!0,F||(F=!0,j()))),z},r.unstable_shouldYield=R,r.unstable_wrapCallback=function(z){var Q=x;return function(){var K=x;x=Q;try{return z.apply(this,arguments)}finally{x=K}}}})(wh)),wh}var n_;function zS(){return n_||(n_=1,Rh.exports=PS()),Rh.exports}var Ch={exports:{}},zn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i_;function BS(){if(i_)return zn;i_=1;var r=ip();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,zn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},zn.flushSync=function(m){var p=f.T,g=a.p;try{if(f.T=null,a.p=2,m)return m()}finally{f.T=p,a.p=g,a.d.f()}},zn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(m,p))},zn.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},zn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?a.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:x,fetchPriority:M}):g==="script"&&a.d.X(m,{crossOrigin:_,integrity:x,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},zn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);a.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(m)},zn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin);a.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},zn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);a.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(m)},zn.requestFormReset=function(m){a.d.r(m)},zn.unstable_batchedUpdates=function(m,p){return m(p)},zn.useFormState=function(m,p,g){return f.H.useFormState(m,p,g)},zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},zn.version="19.2.8",zn}var a_;function IS(){if(a_)return Ch.exports;a_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ch.exports=BS(),Ch.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s_;function FS(){if(s_)return Ko;s_=1;var r=zS(),t=ip(),n=IS();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,o=i;;){var u=s.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){s=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===s)return m(u),e;if(h===o)return m(u),i;h=h.sibling}throw Error(a(188))}if(s.return!==o.return)s=u,o=h;else{for(var y=!1,b=u.child;b;){if(b===s){y=!0,s=u,o=h;break}if(b===o){y=!0,o=u,s=h;break}b=b.sibling}if(!y){for(b=h.child;b;){if(b===s){y=!0,s=h,o=u;break}if(b===o){y=!0,o=h,s=u;break}b=b.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==o)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),D=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),F=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),R=Symbol.for("react.memo_cache_sentinel"),B=Symbol.iterator;function j(e){return e===null||typeof e!="object"?null:(e=B&&e[B]||e["@@iterator"],typeof e=="function"?e:null)}var $=Symbol.for("react.client.reference");function lt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===$?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case v:return"Profiler";case S:return"StrictMode";case W:return"Suspense";case F:return"SuspenseList";case U:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case D:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case w:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return i=e.displayName||null,i!==null?i:lt(e.type)||"Memo";case H:i=e._payload,e=e._init;try{return lt(e(i))}catch{}}return null}var ft=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},St=[],Tt=-1;function P(e){return{current:e}}function st(e){0>Tt||(e.current=St[Tt],St[Tt]=null,Tt--)}function yt(e,i){Tt++,St[Tt]=e.current,e.current=i}var Z=P(null),ht=P(null),Et=P(null),xt=P(null);function Vt(e,i){switch(yt(Et,i),yt(ht,e),yt(Z,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?yg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=yg(i),e=Sg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}st(Z),yt(Z,e)}function Gt(){st(Z),st(ht),st(Et)}function ae(e){e.memoizedState!==null&&yt(xt,e);var i=Z.current,s=Sg(i,e.type);i!==s&&(yt(ht,e),yt(Z,s))}function He(e){ht.current===e&&(st(Z),st(ht)),xt.current===e&&(st(xt),qo._currentValue=K)}var de,Ke;function q(e){if(de===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);de=i&&i[1]||"",Ke=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+de+e+Ke}var Nn=!1;function he(e,i){if(!e||Nn)return"";Nn=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(ct){var it=ct}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(ct){it=ct}e.call(_t.prototype)}}else{try{throw Error()}catch(ct){it=ct}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(ct){if(ct&&it&&typeof ct.stack=="string")return[ct.stack,it.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),y=h[0],b=h[1];if(y&&b){var I=y.split(`
`),nt=b.split(`
`);for(u=o=0;o<I.length&&!I[o].includes("DetermineComponentFrameRoot");)o++;for(;u<nt.length&&!nt[u].includes("DetermineComponentFrameRoot");)u++;if(o===I.length||u===nt.length)for(o=I.length-1,u=nt.length-1;1<=o&&0<=u&&I[o]!==nt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(I[o]!==nt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||I[o]!==nt[u]){var dt=`
`+I[o].replace(" at new "," at ");return e.displayName&&dt.includes("<anonymous>")&&(dt=dt.replace("<anonymous>",e.displayName)),dt}while(1<=o&&0<=u);break}}}finally{Nn=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?q(s):""}function ge(e,i){switch(e.tag){case 26:case 27:case 5:return q(e.type);case 16:return q("Lazy");case 13:return e.child!==i&&i!==null?q("Suspense Fallback"):q("Suspense");case 19:return q("SuspenseList");case 0:case 15:return he(e.type,!1);case 11:return he(e.type.render,!1);case 1:return he(e.type,!0);case 31:return q("Activity");default:return""}}function Qt(e){try{var i="",s=null;do i+=ge(e,s),s=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Pe=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,N=r.unstable_cancelCallback,A=r.unstable_shouldYield,at=r.unstable_requestPaint,pt=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,Ut=r.unstable_NormalPriority,zt=r.unstable_LowPriority,_e=r.unstable_IdlePriority,At=r.log,Bt=r.unstable_setDisableYieldValue,Kt=null,Yt=null;function Ot(e){if(typeof At=="function"&&Bt(e),Yt&&typeof Yt.setStrictMode=="function")try{Yt.setStrictMode(Kt,e)}catch{}}var te=Math.clz32?Math.clz32:V,re=Math.log,Ge=Math.LN2;function V(e){return e>>>=0,e===0?32:31-(re(e)/Ge|0)|0}var Rt=256,ut=262144,vt=4194304;function wt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Lt(e,i,s){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~h,o!==0?u=wt(o):(y&=b,y!==0?u=wt(y):s||(s=b&~e,s!==0&&(u=wt(s))))):(b=o&~h,b!==0?u=wt(b):y!==0?u=wt(y):s||(s=o&~e,s!==0&&(u=wt(s)))),u===0?0:i!==0&&i!==u&&(i&h)===0&&(h=u&-u,s=i&-i,h>=s||h===32&&(s&4194048)!==0)?i:u}function ee(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Qe(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pn(){var e=vt;return vt<<=1,(vt&62914560)===0&&(vt=4194304),e}function Re(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Tn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wi(e,i,s,o,u,h){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var b=e.entanglements,I=e.expirationTimes,nt=e.hiddenUpdates;for(s=y&~s;0<s;){var dt=31-te(s),_t=1<<dt;b[dt]=0,I[dt]=-1;var it=nt[dt];if(it!==null)for(nt[dt]=null,dt=0;dt<it.length;dt++){var ct=it[dt];ct!==null&&(ct.lane&=-536870913)}s&=~_t}o!==0&&io(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~i))}function io(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-te(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function ao(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var o=31-te(s),u=1<<o;u&i|e[o]&i&&(e[o]|=i),s&=~u}}function Gi(e,i){var s=i&-i;return s=(s&42)!==0?1:us(s),(s&(e.suspendedLanes|i))!==0?0:s}function us(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Xs(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function so(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:Xg(e.type))}function fs(e,i){var s=Q.p;try{return Q.p=e,i()}finally{Q.p=s}}var Ci=Math.random().toString(36).slice(2),tn="__reactFiber$"+Ci,bn="__reactProps$"+Ci,Zi="__reactContainer$"+Ci,ro="__reactEvents$"+Ci,_u="__reactListeners$"+Ci,vu="__reactHandles$"+Ci,C="__reactResources$"+Ci,k="__reactMarker$"+Ci;function ot(e){delete e[tn],delete e[bn],delete e[ro],delete e[_u],delete e[vu]}function rt(e){var i=e[tn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Zi]||s[tn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=wg(e);e!==null;){if(s=e[tn])return s;e=wg(e)}return i}e=s,s=e.parentNode}return null}function X(e){if(e=e[tn]||e[Zi]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Ct(e){var i=e[C];return i||(i=e[C]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Dt(e){e[k]=!0}var kt=new Set,ne={};function $t(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(ne[e]=i,e=0;e<i.length;e++)kt.add(i[e])}var be=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ze={},Ve={};function On(e){return Pe.call(Ve,e)?!0:Pe.call(ze,e)?!1:be.test(e)?Ve[e]=!0:(ze[e]=!0,!1)}function Se(e,i,s){if(On(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Xt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function mn(e,i,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+o)}}function se(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function wa(e,i,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(y){s=""+y,h.call(this,y)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function An(e){if(!e._valueTracker){var i=Xn(e)?"checked":"value";e._valueTracker=wa(e,i,""+e[i])}}function Ca(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),o="";return e&&(o=Xn(e)?e.checked?"true":"false":e.value),e=o,e!==s?(i.setValue(e),!0):!1}function Oe(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var pi=/[\n"\\]/g;function Sn(e){return e.replace(pi,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Pn(e,i,s,o,u,h,y,b){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+se(i)):e.value!==""+se(i)&&(e.value=""+se(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?mi(e,y,se(i)):s!=null?mi(e,y,se(s)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+se(b):e.removeAttribute("name")}function Di(e,i,s,o,u,h,y,b){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),i!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){An(e);return}s=s!=null?""+se(s):"",i=i!=null?""+se(i):s,b||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),An(e)}function mi(e,i,s){i==="number"&&Oe(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function Ki(e,i,s,o){if(e=e.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=i.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&o&&(e[s].defaultSelected=!0)}else{for(s=""+se(s),i=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function mp(e,i,s){if(i!=null&&(i=""+se(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+se(s):""}function gp(e,i,s,o){if(i==null){if(o!=null){if(s!=null)throw Error(a(92));if(ft(o)){if(1<o.length)throw Error(a(93));o=o[0]}s=o}s==null&&(s=""),i=s}s=se(i),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),An(e)}function qs(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var bx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _p(e,i,s){var o=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,s):typeof s!="number"||s===0||bx.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function vp(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&s[u]!==o&&_p(e,u,o)}else for(var h in i)i.hasOwnProperty(h)&&_p(e,h,i[h])}function xu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ax=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Rx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ml(e){return Rx.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Qi(){}var yu=null;function Su(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ws=null,Ys=null;function xp(e){var i=X(e);if(i&&(e=i.stateNode)){var s=e[bn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Pn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Sn(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var o=s[i];if(o!==e&&o.form===e.form){var u=o[bn]||null;if(!u)throw Error(a(90));Pn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)o=s[i],o.form===e.form&&Ca(o)}break t;case"textarea":mp(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&Ki(e,!!s.multiple,i,!1)}}}var Mu=!1;function yp(e,i,s){if(Mu)return e(i,s);Mu=!0;try{var o=e(i);return o}finally{if(Mu=!1,(Ws!==null||Ys!==null)&&(nc(),Ws&&(i=Ws,e=Ys,Ys=Ws=null,xp(i),e)))for(i=0;i<e.length;i++)xp(e[i])}}function oo(e,i){var s=e.stateNode;if(s===null)return null;var o=s[bn]||null;if(o===null)return null;s=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var Ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Eu=!1;if(Ji)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){Eu=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{Eu=!1}var Da=null,Tu=null,gl=null;function Sp(){if(gl)return gl;var e,i=Tu,s=i.length,o,u="value"in Da?Da.value:Da.textContent,h=u.length;for(e=0;e<s&&i[e]===u[e];e++);var y=s-e;for(o=1;o<=y&&i[s-o]===u[h-o];o++);return gl=u.slice(e,1<o?1-o:void 0)}function _l(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function vl(){return!0}function Mp(){return!1}function qn(e){function i(s,o,u,h,y){this._reactName=s,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(s=e[b],this[b]=s?s(h):h[b]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?vl:Mp,this.isPropagationStopped=Mp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=vl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=vl)},persist:function(){},isPersistent:vl}),i}var hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xl=qn(hs),co=_({},hs,{view:0,detail:0}),wx=qn(co),bu,Au,uo,yl=_({},co,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==uo&&(uo&&e.type==="mousemove"?(bu=e.screenX-uo.screenX,Au=e.screenY-uo.screenY):Au=bu=0,uo=e),bu)},movementY:function(e){return"movementY"in e?e.movementY:Au}}),Ep=qn(yl),Cx=_({},yl,{dataTransfer:0}),Dx=qn(Cx),Ux=_({},co,{relatedTarget:0}),Ru=qn(Ux),Lx=_({},hs,{animationName:0,elapsedTime:0,pseudoElement:0}),Nx=qn(Lx),Ox=_({},hs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Px=qn(Ox),zx=_({},hs,{data:0}),Tp=qn(zx),Bx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ix={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Hx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Fx[e])?!!i[e]:!1}function wu(){return Hx}var Gx=_({},co,{key:function(e){if(e.key){var i=Bx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=_l(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ix[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wu,charCode:function(e){return e.type==="keypress"?_l(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_l(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Vx=qn(Gx),kx=_({},yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bp=qn(kx),Xx=_({},co,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wu}),qx=qn(Xx),Wx=_({},hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yx=qn(Wx),jx=_({},yl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Zx=qn(jx),Kx=_({},hs,{newState:0,oldState:0}),Qx=qn(Kx),Jx=[9,13,27,32],Cu=Ji&&"CompositionEvent"in window,fo=null;Ji&&"documentMode"in document&&(fo=document.documentMode);var $x=Ji&&"TextEvent"in window&&!fo,Ap=Ji&&(!Cu||fo&&8<fo&&11>=fo),Rp=" ",wp=!1;function Cp(e,i){switch(e){case"keyup":return Jx.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Dp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var js=!1;function ty(e,i){switch(e){case"compositionend":return Dp(i);case"keypress":return i.which!==32?null:(wp=!0,Rp);case"textInput":return e=i.data,e===Rp&&wp?null:e;default:return null}}function ey(e,i){if(js)return e==="compositionend"||!Cu&&Cp(e,i)?(e=Sp(),gl=Tu=Da=null,js=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Ap&&i.locale!=="ko"?null:i.data;default:return null}}var ny={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Up(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!ny[e.type]:i==="textarea"}function Lp(e,i,s,o){Ws?Ys?Ys.push(o):Ys=[o]:Ws=o,i=cc(i,"onChange"),0<i.length&&(s=new xl("onChange","change",null,s,o),e.push({event:s,listeners:i}))}var ho=null,po=null;function iy(e){pg(e,0)}function Sl(e){var i=bt(e);if(Ca(i))return e}function Np(e,i){if(e==="change")return i}var Op=!1;if(Ji){var Du;if(Ji){var Uu="oninput"in document;if(!Uu){var Pp=document.createElement("div");Pp.setAttribute("oninput","return;"),Uu=typeof Pp.oninput=="function"}Du=Uu}else Du=!1;Op=Du&&(!document.documentMode||9<document.documentMode)}function zp(){ho&&(ho.detachEvent("onpropertychange",Bp),po=ho=null)}function Bp(e){if(e.propertyName==="value"&&Sl(po)){var i=[];Lp(i,po,e,Su(e)),yp(iy,i)}}function ay(e,i,s){e==="focusin"?(zp(),ho=i,po=s,ho.attachEvent("onpropertychange",Bp)):e==="focusout"&&zp()}function sy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Sl(po)}function ry(e,i){if(e==="click")return Sl(i)}function oy(e,i){if(e==="input"||e==="change")return Sl(i)}function ly(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ni=typeof Object.is=="function"?Object.is:ly;function mo(e,i){if(ni(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),o=Object.keys(i);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var u=s[o];if(!Pe.call(i,u)||!ni(e[u],i[u]))return!1}return!0}function Ip(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fp(e,i){var s=Ip(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=i&&o>=i)return{node:s,offset:i-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=Ip(s)}}function Hp(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?Hp(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Gp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Oe(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=Oe(e.document)}return i}function Lu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var cy=Ji&&"documentMode"in document&&11>=document.documentMode,Zs=null,Nu=null,go=null,Ou=!1;function Vp(e,i,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Ou||Zs==null||Zs!==Oe(o)||(o=Zs,"selectionStart"in o&&Lu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),go&&mo(go,o)||(go=o,o=cc(Nu,"onSelect"),0<o.length&&(i=new xl("onSelect","select",null,i,s),e.push({event:i,listeners:o}),i.target=Zs)))}function ds(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var Ks={animationend:ds("Animation","AnimationEnd"),animationiteration:ds("Animation","AnimationIteration"),animationstart:ds("Animation","AnimationStart"),transitionrun:ds("Transition","TransitionRun"),transitionstart:ds("Transition","TransitionStart"),transitioncancel:ds("Transition","TransitionCancel"),transitionend:ds("Transition","TransitionEnd")},Pu={},kp={};Ji&&(kp=document.createElement("div").style,"AnimationEvent"in window||(delete Ks.animationend.animation,delete Ks.animationiteration.animation,delete Ks.animationstart.animation),"TransitionEvent"in window||delete Ks.transitionend.transition);function ps(e){if(Pu[e])return Pu[e];if(!Ks[e])return e;var i=Ks[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in kp)return Pu[e]=i[s];return e}var Xp=ps("animationend"),qp=ps("animationiteration"),Wp=ps("animationstart"),uy=ps("transitionrun"),fy=ps("transitionstart"),hy=ps("transitioncancel"),Yp=ps("transitionend"),jp=new Map,zu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zu.push("scrollEnd");function Ui(e,i){jp.set(e,i),$t(i,[e])}var Ml=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},gi=[],Qs=0,Bu=0;function El(){for(var e=Qs,i=Bu=Qs=0;i<e;){var s=gi[i];gi[i++]=null;var o=gi[i];gi[i++]=null;var u=gi[i];gi[i++]=null;var h=gi[i];if(gi[i++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}h!==0&&Zp(s,u,h)}}function Tl(e,i,s,o){gi[Qs++]=e,gi[Qs++]=i,gi[Qs++]=s,gi[Qs++]=o,Bu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Iu(e,i,s,o){return Tl(e,i,s,o),bl(e)}function ms(e,i){return Tl(e,null,null,i),bl(e)}function Zp(e,i,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var u=!1,h=e.return;h!==null;)h.childLanes|=s,o=h.alternate,o!==null&&(o.childLanes|=s),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&i!==null&&(u=31-te(s),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=s|536870912),h):null}function bl(e){if(50<Io)throw Io=0,jf=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var Js={};function dy(e,i,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(e,i,s,o){return new dy(e,i,s,o)}function Fu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $i(e,i){var s=e.alternate;return s===null?(s=ii(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function Kp(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Al(e,i,s,o,u,h){var y=0;if(o=e,typeof e=="function")Fu(e)&&(y=1);else if(typeof e=="string")y=vS(e,s,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case U:return e=ii(31,s,i,u),e.elementType=U,e.lanes=h,e;case T:return gs(s.children,u,h,i);case S:y=8,u|=24;break;case v:return e=ii(12,s,i,u|2),e.elementType=v,e.lanes=h,e;case W:return e=ii(13,s,i,u),e.elementType=W,e.lanes=h,e;case F:return e=ii(19,s,i,u),e.elementType=F,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case D:y=10;break t;case L:y=9;break t;case w:y=11;break t;case O:y=14;break t;case H:y=16,o=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),o=null}return i=ii(y,s,i,u),i.elementType=e,i.type=o,i.lanes=h,i}function gs(e,i,s,o){return e=ii(7,e,o,i),e.lanes=s,e}function Hu(e,i,s){return e=ii(6,e,null,i),e.lanes=s,e}function Qp(e){var i=ii(18,null,null,0);return i.stateNode=e,i}function Gu(e,i,s){return i=ii(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var Jp=new WeakMap;function _i(e,i){if(typeof e=="object"&&e!==null){var s=Jp.get(e);return s!==void 0?s:(i={value:e,source:i,stack:Qt(i)},Jp.set(e,i),i)}return{value:e,source:i,stack:Qt(i)}}var $s=[],tr=0,Rl=null,_o=0,vi=[],xi=0,Ua=null,Vi=1,ki="";function ta(e,i){$s[tr++]=_o,$s[tr++]=Rl,Rl=e,_o=i}function $p(e,i,s){vi[xi++]=Vi,vi[xi++]=ki,vi[xi++]=Ua,Ua=e;var o=Vi;e=ki;var u=32-te(o)-1;o&=~(1<<u),s+=1;var h=32-te(i)+u;if(30<h){var y=u-u%5;h=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Vi=1<<32-te(i)+u|s<<u|o,ki=h+e}else Vi=1<<h|s<<u|o,ki=e}function Vu(e){e.return!==null&&(ta(e,1),$p(e,1,0))}function ku(e){for(;e===Rl;)Rl=$s[--tr],$s[tr]=null,_o=$s[--tr],$s[tr]=null;for(;e===Ua;)Ua=vi[--xi],vi[xi]=null,ki=vi[--xi],vi[xi]=null,Vi=vi[--xi],vi[xi]=null}function tm(e,i){vi[xi++]=Vi,vi[xi++]=ki,vi[xi++]=Ua,Vi=i.id,ki=i.overflow,Ua=e}var Rn=null,Ye=null,Me=!1,La=null,yi=!1,Xu=Error(a(519));function Na(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw vo(_i(i,e)),Xu}function em(e){var i=e.stateNode,s=e.type,o=e.memoizedProps;switch(i[tn]=e,i[bn]=o,s){case"dialog":me("cancel",i),me("close",i);break;case"iframe":case"object":case"embed":me("load",i);break;case"video":case"audio":for(s=0;s<Ho.length;s++)me(Ho[s],i);break;case"source":me("error",i);break;case"img":case"image":case"link":me("error",i),me("load",i);break;case"details":me("toggle",i);break;case"input":me("invalid",i),Di(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":me("invalid",i);break;case"textarea":me("invalid",i),gp(i,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||o.suppressHydrationWarning===!0||vg(i.textContent,s)?(o.popover!=null&&(me("beforetoggle",i),me("toggle",i)),o.onScroll!=null&&me("scroll",i),o.onScrollEnd!=null&&me("scrollend",i),o.onClick!=null&&(i.onclick=Qi),i=!0):i=!1,i||Na(e,!0)}function nm(e){for(Rn=e.return;Rn;)switch(Rn.tag){case 5:case 31:case 13:yi=!1;return;case 27:case 3:yi=!0;return;default:Rn=Rn.return}}function er(e){if(e!==Rn)return!1;if(!Me)return nm(e),Me=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||ch(e.type,e.memoizedProps)),s=!s),s&&Ye&&Na(e),nm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ye=Rg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ye=Rg(e)}else i===27?(i=Ye,Ya(e.type)?(e=ph,ph=null,Ye=e):Ye=i):Ye=Rn?Mi(e.stateNode.nextSibling):null;return!0}function _s(){Ye=Rn=null,Me=!1}function qu(){var e=La;return e!==null&&(Zn===null?Zn=e:Zn.push.apply(Zn,e),La=null),e}function vo(e){La===null?La=[e]:La.push(e)}var Wu=P(null),vs=null,ea=null;function Oa(e,i,s){yt(Wu,i._currentValue),i._currentValue=s}function na(e){e._currentValue=Wu.current,st(Wu)}function Yu(e,i,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===s)break;e=e.return}}function ju(e,i,s,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var y=u.child;h=h.firstContext;t:for(;h!==null;){var b=h;h=u;for(var I=0;I<i.length;I++)if(b.context===i[I]){h.lanes|=s,b=h.alternate,b!==null&&(b.lanes|=s),Yu(h.return,s,e),o||(y=null);break t}h=b.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(a(341));y.lanes|=s,h=y.alternate,h!==null&&(h.lanes|=s),Yu(y,s,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function nr(e,i,s,o){e=null;for(var u=i,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var b=u.type;ni(u.pendingProps.value,y.value)||(e!==null?e.push(b):e=[b])}}else if(u===xt.current){if(y=u.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(qo):e=[qo])}u=u.return}e!==null&&ju(i,e,s,o),i.flags|=262144}function wl(e){for(e=e.firstContext;e!==null;){if(!ni(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function xs(e){vs=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function wn(e){return im(vs,e)}function Cl(e,i){return vs===null&&xs(e),im(e,i)}function im(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ea===null){if(e===null)throw Error(a(308));ea=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ea=ea.next=i;return s}var py=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},my=r.unstable_scheduleCallback,gy=r.unstable_NormalPriority,ln={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zu(){return{controller:new py,data:new Map,refCount:0}}function xo(e){e.refCount--,e.refCount===0&&my(gy,function(){e.controller.abort()})}var yo=null,Ku=0,ir=0,ar=null;function _y(e,i){if(yo===null){var s=yo=[];Ku=0,ir=th(),ar={status:"pending",value:void 0,then:function(o){s.push(o)}}}return Ku++,i.then(am,am),i}function am(){if(--Ku===0&&yo!==null){ar!==null&&(ar.status="fulfilled");var e=yo;yo=null,ir=0,ar=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function vy(e,i){var s=[],o={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),o}var sm=z.S;z.S=function(e,i){V0=pt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&_y(e,i),sm!==null&&sm(e,i)};var ys=P(null);function Qu(){var e=ys.current;return e!==null?e:We.pooledCache}function Dl(e,i){i===null?yt(ys,ys.current):yt(ys,i.pool)}function rm(){var e=Qu();return e===null?null:{parent:ln._currentValue,pool:e}}var sr=Error(a(460)),Ju=Error(a(474)),Ul=Error(a(542)),Ll={then:function(){}};function om(e){return e=e.status,e==="fulfilled"||e==="rejected"}function lm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Qi,Qi),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,um(e),e;default:if(typeof i.status=="string")i.then(Qi,Qi);else{if(e=We,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,um(e),e}throw Ms=i,sr}}function Ss(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ms=s,sr):s}}var Ms=null;function cm(){if(Ms===null)throw Error(a(459));var e=Ms;return Ms=null,e}function um(e){if(e===sr||e===Ul)throw Error(a(483))}var rr=null,So=0;function Nl(e){var i=So;return So+=1,rr===null&&(rr=[]),lm(rr,e,i)}function Mo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ol(e,i){throw i.$$typeof===x?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function fm(e){function i(Y,G){if(e){var et=Y.deletions;et===null?(Y.deletions=[G],Y.flags|=16):et.push(G)}}function s(Y,G){if(!e)return null;for(;G!==null;)i(Y,G),G=G.sibling;return null}function o(Y){for(var G=new Map;Y!==null;)Y.key!==null?G.set(Y.key,Y):G.set(Y.index,Y),Y=Y.sibling;return G}function u(Y,G){return Y=$i(Y,G),Y.index=0,Y.sibling=null,Y}function h(Y,G,et){return Y.index=et,e?(et=Y.alternate,et!==null?(et=et.index,et<G?(Y.flags|=67108866,G):et):(Y.flags|=67108866,G)):(Y.flags|=1048576,G)}function y(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function b(Y,G,et,mt){return G===null||G.tag!==6?(G=Hu(et,Y.mode,mt),G.return=Y,G):(G=u(G,et),G.return=Y,G)}function I(Y,G,et,mt){var jt=et.type;return jt===T?dt(Y,G,et.props.children,mt,et.key):G!==null&&(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===H&&Ss(jt)===G.type)?(G=u(G,et.props),Mo(G,et),G.return=Y,G):(G=Al(et.type,et.key,et.props,null,Y.mode,mt),Mo(G,et),G.return=Y,G)}function nt(Y,G,et,mt){return G===null||G.tag!==4||G.stateNode.containerInfo!==et.containerInfo||G.stateNode.implementation!==et.implementation?(G=Gu(et,Y.mode,mt),G.return=Y,G):(G=u(G,et.children||[]),G.return=Y,G)}function dt(Y,G,et,mt,jt){return G===null||G.tag!==7?(G=gs(et,Y.mode,mt,jt),G.return=Y,G):(G=u(G,et),G.return=Y,G)}function _t(Y,G,et){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=Hu(""+G,Y.mode,et),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return et=Al(G.type,G.key,G.props,null,Y.mode,et),Mo(et,G),et.return=Y,et;case E:return G=Gu(G,Y.mode,et),G.return=Y,G;case H:return G=Ss(G),_t(Y,G,et)}if(ft(G)||j(G))return G=gs(G,Y.mode,et,null),G.return=Y,G;if(typeof G.then=="function")return _t(Y,Nl(G),et);if(G.$$typeof===D)return _t(Y,Cl(Y,G),et);Ol(Y,G)}return null}function it(Y,G,et,mt){var jt=G!==null?G.key:null;if(typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint")return jt!==null?null:b(Y,G,""+et,mt);if(typeof et=="object"&&et!==null){switch(et.$$typeof){case M:return et.key===jt?I(Y,G,et,mt):null;case E:return et.key===jt?nt(Y,G,et,mt):null;case H:return et=Ss(et),it(Y,G,et,mt)}if(ft(et)||j(et))return jt!==null?null:dt(Y,G,et,mt,null);if(typeof et.then=="function")return it(Y,G,Nl(et),mt);if(et.$$typeof===D)return it(Y,G,Cl(Y,et),mt);Ol(Y,et)}return null}function ct(Y,G,et,mt,jt){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return Y=Y.get(et)||null,b(G,Y,""+mt,jt);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case M:return Y=Y.get(mt.key===null?et:mt.key)||null,I(G,Y,mt,jt);case E:return Y=Y.get(mt.key===null?et:mt.key)||null,nt(G,Y,mt,jt);case H:return mt=Ss(mt),ct(Y,G,et,mt,jt)}if(ft(mt)||j(mt))return Y=Y.get(et)||null,dt(G,Y,mt,jt,null);if(typeof mt.then=="function")return ct(Y,G,et,Nl(mt),jt);if(mt.$$typeof===D)return ct(Y,G,et,Cl(G,mt),jt);Ol(G,mt)}return null}function Ft(Y,G,et,mt){for(var jt=null,De=null,qt=G,le=G=0,xe=null;qt!==null&&le<et.length;le++){qt.index>le?(xe=qt,qt=null):xe=qt.sibling;var Ue=it(Y,qt,et[le],mt);if(Ue===null){qt===null&&(qt=xe);break}e&&qt&&Ue.alternate===null&&i(Y,qt),G=h(Ue,G,le),De===null?jt=Ue:De.sibling=Ue,De=Ue,qt=xe}if(le===et.length)return s(Y,qt),Me&&ta(Y,le),jt;if(qt===null){for(;le<et.length;le++)qt=_t(Y,et[le],mt),qt!==null&&(G=h(qt,G,le),De===null?jt=qt:De.sibling=qt,De=qt);return Me&&ta(Y,le),jt}for(qt=o(qt);le<et.length;le++)xe=ct(qt,Y,le,et[le],mt),xe!==null&&(e&&xe.alternate!==null&&qt.delete(xe.key===null?le:xe.key),G=h(xe,G,le),De===null?jt=xe:De.sibling=xe,De=xe);return e&&qt.forEach(function(Ja){return i(Y,Ja)}),Me&&ta(Y,le),jt}function Jt(Y,G,et,mt){if(et==null)throw Error(a(151));for(var jt=null,De=null,qt=G,le=G=0,xe=null,Ue=et.next();qt!==null&&!Ue.done;le++,Ue=et.next()){qt.index>le?(xe=qt,qt=null):xe=qt.sibling;var Ja=it(Y,qt,Ue.value,mt);if(Ja===null){qt===null&&(qt=xe);break}e&&qt&&Ja.alternate===null&&i(Y,qt),G=h(Ja,G,le),De===null?jt=Ja:De.sibling=Ja,De=Ja,qt=xe}if(Ue.done)return s(Y,qt),Me&&ta(Y,le),jt;if(qt===null){for(;!Ue.done;le++,Ue=et.next())Ue=_t(Y,Ue.value,mt),Ue!==null&&(G=h(Ue,G,le),De===null?jt=Ue:De.sibling=Ue,De=Ue);return Me&&ta(Y,le),jt}for(qt=o(qt);!Ue.done;le++,Ue=et.next())Ue=ct(qt,Y,le,Ue.value,mt),Ue!==null&&(e&&Ue.alternate!==null&&qt.delete(Ue.key===null?le:Ue.key),G=h(Ue,G,le),De===null?jt=Ue:De.sibling=Ue,De=Ue);return e&&qt.forEach(function(CS){return i(Y,CS)}),Me&&ta(Y,le),jt}function qe(Y,G,et,mt){if(typeof et=="object"&&et!==null&&et.type===T&&et.key===null&&(et=et.props.children),typeof et=="object"&&et!==null){switch(et.$$typeof){case M:t:{for(var jt=et.key;G!==null;){if(G.key===jt){if(jt=et.type,jt===T){if(G.tag===7){s(Y,G.sibling),mt=u(G,et.props.children),mt.return=Y,Y=mt;break t}}else if(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===H&&Ss(jt)===G.type){s(Y,G.sibling),mt=u(G,et.props),Mo(mt,et),mt.return=Y,Y=mt;break t}s(Y,G);break}else i(Y,G);G=G.sibling}et.type===T?(mt=gs(et.props.children,Y.mode,mt,et.key),mt.return=Y,Y=mt):(mt=Al(et.type,et.key,et.props,null,Y.mode,mt),Mo(mt,et),mt.return=Y,Y=mt)}return y(Y);case E:t:{for(jt=et.key;G!==null;){if(G.key===jt)if(G.tag===4&&G.stateNode.containerInfo===et.containerInfo&&G.stateNode.implementation===et.implementation){s(Y,G.sibling),mt=u(G,et.children||[]),mt.return=Y,Y=mt;break t}else{s(Y,G);break}else i(Y,G);G=G.sibling}mt=Gu(et,Y.mode,mt),mt.return=Y,Y=mt}return y(Y);case H:return et=Ss(et),qe(Y,G,et,mt)}if(ft(et))return Ft(Y,G,et,mt);if(j(et)){if(jt=j(et),typeof jt!="function")throw Error(a(150));return et=jt.call(et),Jt(Y,G,et,mt)}if(typeof et.then=="function")return qe(Y,G,Nl(et),mt);if(et.$$typeof===D)return qe(Y,G,Cl(Y,et),mt);Ol(Y,et)}return typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint"?(et=""+et,G!==null&&G.tag===6?(s(Y,G.sibling),mt=u(G,et),mt.return=Y,Y=mt):(s(Y,G),mt=Hu(et,Y.mode,mt),mt.return=Y,Y=mt),y(Y)):s(Y,G)}return function(Y,G,et,mt){try{So=0;var jt=qe(Y,G,et,mt);return rr=null,jt}catch(qt){if(qt===sr||qt===Ul)throw qt;var De=ii(29,qt,null,Y.mode);return De.lanes=mt,De.return=Y,De}finally{}}}var Es=fm(!0),hm=fm(!1),Pa=!1;function $u(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function tf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function za(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ba(e,i,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=bl(e),Zp(e,null,s),i}return Tl(e,o,i,s),bl(e)}function Eo(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,ao(e,s)}}function ef(e,i){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var u=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?u=h=y:h=h.next=y,s=s.next}while(s!==null);h===null?u=h=i:h=h.next=i}else u=h=i;s={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var nf=!1;function To(){if(nf){var e=ar;if(e!==null)throw e}}function bo(e,i,s,o){nf=!1;var u=e.updateQueue;Pa=!1;var h=u.firstBaseUpdate,y=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var I=b,nt=I.next;I.next=null,y===null?h=nt:y.next=nt,y=I;var dt=e.alternate;dt!==null&&(dt=dt.updateQueue,b=dt.lastBaseUpdate,b!==y&&(b===null?dt.firstBaseUpdate=nt:b.next=nt,dt.lastBaseUpdate=I))}if(h!==null){var _t=u.baseState;y=0,dt=nt=I=null,b=h;do{var it=b.lane&-536870913,ct=it!==b.lane;if(ct?(ve&it)===it:(o&it)===it){it!==0&&it===ir&&(nf=!0),dt!==null&&(dt=dt.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Ft=e,Jt=b;it=i;var qe=s;switch(Jt.tag){case 1:if(Ft=Jt.payload,typeof Ft=="function"){_t=Ft.call(qe,_t,it);break t}_t=Ft;break t;case 3:Ft.flags=Ft.flags&-65537|128;case 0:if(Ft=Jt.payload,it=typeof Ft=="function"?Ft.call(qe,_t,it):Ft,it==null)break t;_t=_({},_t,it);break t;case 2:Pa=!0}}it=b.callback,it!==null&&(e.flags|=64,ct&&(e.flags|=8192),ct=u.callbacks,ct===null?u.callbacks=[it]:ct.push(it))}else ct={lane:it,tag:b.tag,payload:b.payload,callback:b.callback,next:null},dt===null?(nt=dt=ct,I=_t):dt=dt.next=ct,y|=it;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;ct=b,b=ct.next,ct.next=null,u.lastBaseUpdate=ct,u.shared.pending=null}}while(!0);dt===null&&(I=_t),u.baseState=I,u.firstBaseUpdate=nt,u.lastBaseUpdate=dt,h===null&&(u.shared.lanes=0),Va|=y,e.lanes=y,e.memoizedState=_t}}function dm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function pm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)dm(s[e],i)}var or=P(null),Pl=P(0);function mm(e,i){e=fa,yt(Pl,e),yt(or,i),fa=e|i.baseLanes}function af(){yt(Pl,fa),yt(or,or.current)}function sf(){fa=Pl.current,st(or),st(Pl)}var ai=P(null),Si=null;function Ia(e){var i=e.alternate;yt(sn,sn.current&1),yt(ai,e),Si===null&&(i===null||or.current!==null||i.memoizedState!==null)&&(Si=e)}function rf(e){yt(sn,sn.current),yt(ai,e),Si===null&&(Si=e)}function gm(e){e.tag===22?(yt(sn,sn.current),yt(ai,e),Si===null&&(Si=e)):Fa()}function Fa(){yt(sn,sn.current),yt(ai,ai.current)}function si(e){st(ai),Si===e&&(Si=null),st(sn)}var sn=P(0);function zl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||hh(s)||dh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ia=0,oe=null,ke=null,cn=null,Bl=!1,lr=!1,Ts=!1,Il=0,Ao=0,cr=null,xy=0;function en(){throw Error(a(321))}function of(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!ni(e[s],i[s]))return!1;return!0}function lf(e,i,s,o,u,h){return ia=h,oe=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,z.H=e===null||e.memoizedState===null?$m:Ef,Ts=!1,h=s(o,u),Ts=!1,lr&&(h=vm(i,s,o,u)),_m(e),h}function _m(e){z.H=Co;var i=ke!==null&&ke.next!==null;if(ia=0,cn=ke=oe=null,Bl=!1,Ao=0,cr=null,i)throw Error(a(300));e===null||un||(e=e.dependencies,e!==null&&wl(e)&&(un=!0))}function vm(e,i,s,o){oe=e;var u=0;do{if(lr&&(cr=null),Ao=0,lr=!1,25<=u)throw Error(a(301));if(u+=1,cn=ke=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}z.H=t0,h=i(s,o)}while(lr);return h}function yy(){var e=z.H,i=e.useState()[0];return i=typeof i.then=="function"?Ro(i):i,e=e.useState()[0],(ke!==null?ke.memoizedState:null)!==e&&(oe.flags|=1024),i}function cf(){var e=Il!==0;return Il=0,e}function uf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function ff(e){if(Bl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Bl=!1}ia=0,cn=ke=oe=null,lr=!1,Ao=Il=0,cr=null}function Fn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?oe.memoizedState=cn=e:cn=cn.next=e,cn}function rn(){if(ke===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=ke.next;var i=cn===null?oe.memoizedState:cn.next;if(i!==null)cn=i,ke=e;else{if(e===null)throw oe.alternate===null?Error(a(467)):Error(a(310));ke=e,e={memoizedState:ke.memoizedState,baseState:ke.baseState,baseQueue:ke.baseQueue,queue:ke.queue,next:null},cn===null?oe.memoizedState=cn=e:cn=cn.next=e}return cn}function Fl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ro(e){var i=Ao;return Ao+=1,cr===null&&(cr=[]),e=lm(cr,e,i),i=oe,(cn===null?i.memoizedState:cn.next)===null&&(i=i.alternate,z.H=i===null||i.memoizedState===null?$m:Ef),e}function Hl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ro(e);if(e.$$typeof===D)return wn(e)}throw Error(a(438,String(e)))}function hf(e){var i=null,s=oe.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var o=oe.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Fl(),oe.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),o=0;o<e;o++)s[o]=R;return i.index++,s}function aa(e,i){return typeof i=="function"?i(e):i}function Gl(e){var i=rn();return df(i,ke,e)}function df(e,i,s){var o=e.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=s;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var y=u.next;u.next=h.next,h.next=y}i.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{i=u.next;var b=y=null,I=null,nt=i,dt=!1;do{var _t=nt.lane&-536870913;if(_t!==nt.lane?(ve&_t)===_t:(ia&_t)===_t){var it=nt.revertLane;if(it===0)I!==null&&(I=I.next={lane:0,revertLane:0,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null}),_t===ir&&(dt=!0);else if((ia&it)===it){nt=nt.next,it===ir&&(dt=!0);continue}else _t={lane:0,revertLane:nt.revertLane,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},I===null?(b=I=_t,y=h):I=I.next=_t,oe.lanes|=it,Va|=it;_t=nt.action,Ts&&s(h,_t),h=nt.hasEagerState?nt.eagerState:s(h,_t)}else it={lane:_t,revertLane:nt.revertLane,gesture:nt.gesture,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},I===null?(b=I=it,y=h):I=I.next=it,oe.lanes|=_t,Va|=_t;nt=nt.next}while(nt!==null&&nt!==i);if(I===null?y=h:I.next=b,!ni(h,e.memoizedState)&&(un=!0,dt&&(s=ar,s!==null)))throw s;e.memoizedState=h,e.baseState=y,e.baseQueue=I,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function pf(e){var i=rn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var o=s.dispatch,u=s.pending,h=i.memoizedState;if(u!==null){s.pending=null;var y=u=u.next;do h=e(h,y.action),y=y.next;while(y!==u);ni(h,i.memoizedState)||(un=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),s.lastRenderedState=h}return[h,o]}function xm(e,i,s){var o=oe,u=rn(),h=Me;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=i();var y=!ni((ke||u).memoizedState,s);if(y&&(u.memoizedState=s,un=!0),u=u.queue,_f(Mm.bind(null,o,u,e),[e]),u.getSnapshot!==i||y||cn!==null&&cn.memoizedState.tag&1){if(o.flags|=2048,ur(9,{destroy:void 0},Sm.bind(null,o,u,s,i),null),We===null)throw Error(a(349));h||(ia&127)!==0||ym(o,i,s)}return s}function ym(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=oe.updateQueue,i===null?(i=Fl(),oe.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Sm(e,i,s,o){i.value=s,i.getSnapshot=o,Em(i)&&Tm(e)}function Mm(e,i,s){return s(function(){Em(i)&&Tm(e)})}function Em(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!ni(e,s)}catch{return!0}}function Tm(e){var i=ms(e,2);i!==null&&Kn(i,e,2)}function mf(e){var i=Fn();if(typeof e=="function"){var s=e;if(e=s(),Ts){Ot(!0);try{s()}finally{Ot(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:e},i}function bm(e,i,s,o){return e.baseState=s,df(e,ke,typeof o=="function"?o:aa)}function Sy(e,i,s,o,u){if(Xl(e))throw Error(a(485));if(e=i.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};z.T!==null?s(!0):h.isTransition=!1,o(h),s=i.pending,s===null?(h.next=i.pending=h,Am(i,h)):(h.next=s.next,i.pending=s.next=h)}}function Am(e,i){var s=i.action,o=i.payload,u=e.state;if(i.isTransition){var h=z.T,y={};z.T=y;try{var b=s(u,o),I=z.S;I!==null&&I(y,b),Rm(e,i,b)}catch(nt){gf(e,i,nt)}finally{h!==null&&y.types!==null&&(h.types=y.types),z.T=h}}else try{h=s(u,o),Rm(e,i,h)}catch(nt){gf(e,i,nt)}}function Rm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){wm(e,i,o)},function(o){return gf(e,i,o)}):wm(e,i,s)}function wm(e,i,s){i.status="fulfilled",i.value=s,Cm(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Am(e,s)))}function gf(e,i,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=s,Cm(i),i=i.next;while(i!==o)}e.action=null}function Cm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Dm(e,i){return i}function Um(e,i){if(Me){var s=We.formState;if(s!==null){t:{var o=oe;if(Me){if(Ye){e:{for(var u=Ye,h=yi;u.nodeType!==8;){if(!h){u=null;break e}if(u=Mi(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Ye=Mi(u.nextSibling),o=u.data==="F!";break t}}Na(o)}o=!1}o&&(i=s[0])}}return s=Fn(),s.memoizedState=s.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dm,lastRenderedState:i},s.queue=o,s=Km.bind(null,oe,o),o.dispatch=s,o=mf(!1),h=Mf.bind(null,oe,!1,o.queue),o=Fn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,s=Sy.bind(null,oe,u,h,s),u.dispatch=s,o.memoizedState=e,[i,s,!1]}function Lm(e){var i=rn();return Nm(i,ke,e)}function Nm(e,i,s){if(i=df(e,i,Dm)[0],e=Gl(aa)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=Ro(i)}catch(y){throw y===sr?Ul:y}else o=i;i=rn();var u=i.queue,h=u.dispatch;return s!==i.memoizedState&&(oe.flags|=2048,ur(9,{destroy:void 0},My.bind(null,u,s),null)),[o,h,e]}function My(e,i){e.action=i}function Om(e){var i=rn(),s=ke;if(s!==null)return Nm(i,s,e);rn(),i=i.memoizedState,s=rn();var o=s.queue.dispatch;return s.memoizedState=e,[i,o,!1]}function ur(e,i,s,o){return e={tag:e,create:s,deps:o,inst:i,next:null},i=oe.updateQueue,i===null&&(i=Fl(),oe.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,i.lastEffect=e),e}function Pm(){return rn().memoizedState}function Vl(e,i,s,o){var u=Fn();oe.flags|=e,u.memoizedState=ur(1|i,{destroy:void 0},s,o===void 0?null:o)}function kl(e,i,s,o){var u=rn();o=o===void 0?null:o;var h=u.memoizedState.inst;ke!==null&&o!==null&&of(o,ke.memoizedState.deps)?u.memoizedState=ur(i,h,s,o):(oe.flags|=e,u.memoizedState=ur(1|i,h,s,o))}function zm(e,i){Vl(8390656,8,e,i)}function _f(e,i){kl(2048,8,e,i)}function Ey(e){oe.flags|=4;var i=oe.updateQueue;if(i===null)i=Fl(),oe.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function Bm(e){var i=rn().memoizedState;return Ey({ref:i,nextImpl:e}),function(){if((Le&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function Im(e,i){return kl(4,2,e,i)}function Fm(e,i){return kl(4,4,e,i)}function Hm(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function Gm(e,i,s){s=s!=null?s.concat([e]):null,kl(4,4,Hm.bind(null,i,e),s)}function vf(){}function Vm(e,i){var s=rn();i=i===void 0?null:i;var o=s.memoizedState;return i!==null&&of(i,o[1])?o[0]:(s.memoizedState=[e,i],e)}function km(e,i){var s=rn();i=i===void 0?null:i;var o=s.memoizedState;if(i!==null&&of(i,o[1]))return o[0];if(o=e(),Ts){Ot(!0);try{e()}finally{Ot(!1)}}return s.memoizedState=[o,i],o}function xf(e,i,s){return s===void 0||(ia&1073741824)!==0&&(ve&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=X0(),oe.lanes|=e,Va|=e,s)}function Xm(e,i,s,o){return ni(s,i)?s:or.current!==null?(e=xf(e,s,o),ni(e,i)||(un=!0),e):(ia&42)===0||(ia&1073741824)!==0&&(ve&261930)===0?(un=!0,e.memoizedState=s):(e=X0(),oe.lanes|=e,Va|=e,i)}function qm(e,i,s,o,u){var h=Q.p;Q.p=h!==0&&8>h?h:8;var y=z.T,b={};z.T=b,Mf(e,!1,i,s);try{var I=u(),nt=z.S;if(nt!==null&&nt(b,I),I!==null&&typeof I=="object"&&typeof I.then=="function"){var dt=vy(I,o);wo(e,i,dt,li(e))}else wo(e,i,o,li(e))}catch(_t){wo(e,i,{then:function(){},status:"rejected",reason:_t},li())}finally{Q.p=h,y!==null&&b.types!==null&&(y.types=b.types),z.T=y}}function Ty(){}function yf(e,i,s,o){if(e.tag!==5)throw Error(a(476));var u=Wm(e).queue;qm(e,u,i,K,s===null?Ty:function(){return Ym(e),s(o)})}function Wm(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:K},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function Ym(e){var i=Wm(e);i.next===null&&(i=e.alternate.memoizedState),wo(e,i.next.queue,{},li())}function Sf(){return wn(qo)}function jm(){return rn().memoizedState}function Zm(){return rn().memoizedState}function by(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=li();e=za(s);var o=Ba(i,e,s);o!==null&&(Kn(o,i,s),Eo(o,i,s)),i={cache:Zu()},e.payload=i;return}i=i.return}}function Ay(e,i,s){var o=li();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Xl(e)?Qm(i,s):(s=Iu(e,i,s,o),s!==null&&(Kn(s,e,o),Jm(s,i,o)))}function Km(e,i,s){var o=li();wo(e,i,s,o)}function wo(e,i,s,o){var u={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Xl(e))Qm(i,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var y=i.lastRenderedState,b=h(y,s);if(u.hasEagerState=!0,u.eagerState=b,ni(b,y))return Tl(e,i,u,0),We===null&&El(),!1}catch{}finally{}if(s=Iu(e,i,u,o),s!==null)return Kn(s,e,o),Jm(s,i,o),!0}return!1}function Mf(e,i,s,o){if(o={lane:2,revertLane:th(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Xl(e)){if(i)throw Error(a(479))}else i=Iu(e,s,o,2),i!==null&&Kn(i,e,2)}function Xl(e){var i=e.alternate;return e===oe||i!==null&&i===oe}function Qm(e,i){lr=Bl=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function Jm(e,i,s){if((s&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,ao(e,s)}}var Co={readContext:wn,use:Hl,useCallback:en,useContext:en,useEffect:en,useImperativeHandle:en,useLayoutEffect:en,useInsertionEffect:en,useMemo:en,useReducer:en,useRef:en,useState:en,useDebugValue:en,useDeferredValue:en,useTransition:en,useSyncExternalStore:en,useId:en,useHostTransitionStatus:en,useFormState:en,useActionState:en,useOptimistic:en,useMemoCache:en,useCacheRefresh:en};Co.useEffectEvent=en;var $m={readContext:wn,use:Hl,useCallback:function(e,i){return Fn().memoizedState=[e,i===void 0?null:i],e},useContext:wn,useEffect:zm,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,Vl(4194308,4,Hm.bind(null,i,e),s)},useLayoutEffect:function(e,i){return Vl(4194308,4,e,i)},useInsertionEffect:function(e,i){Vl(4,2,e,i)},useMemo:function(e,i){var s=Fn();i=i===void 0?null:i;var o=e();if(Ts){Ot(!0);try{e()}finally{Ot(!1)}}return s.memoizedState=[o,i],o},useReducer:function(e,i,s){var o=Fn();if(s!==void 0){var u=s(i);if(Ts){Ot(!0);try{s(i)}finally{Ot(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Ay.bind(null,oe,e),[o.memoizedState,e]},useRef:function(e){var i=Fn();return e={current:e},i.memoizedState=e},useState:function(e){e=mf(e);var i=e.queue,s=Km.bind(null,oe,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:vf,useDeferredValue:function(e,i){var s=Fn();return xf(s,e,i)},useTransition:function(){var e=mf(!1);return e=qm.bind(null,oe,e.queue,!0,!1),Fn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var o=oe,u=Fn();if(Me){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),We===null)throw Error(a(349));(ve&127)!==0||ym(o,i,s)}u.memoizedState=s;var h={value:s,getSnapshot:i};return u.queue=h,zm(Mm.bind(null,o,h,e),[e]),o.flags|=2048,ur(9,{destroy:void 0},Sm.bind(null,o,h,s,i),null),s},useId:function(){var e=Fn(),i=We.identifierPrefix;if(Me){var s=ki,o=Vi;s=(o&~(1<<32-te(o)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Il++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=xy++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Sf,useFormState:Um,useActionState:Um,useOptimistic:function(e){var i=Fn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Mf.bind(null,oe,!0,s),s.dispatch=i,[e,i]},useMemoCache:hf,useCacheRefresh:function(){return Fn().memoizedState=by.bind(null,oe)},useEffectEvent:function(e){var i=Fn(),s={impl:e};return i.memoizedState=s,function(){if((Le&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Ef={readContext:wn,use:Hl,useCallback:Vm,useContext:wn,useEffect:_f,useImperativeHandle:Gm,useInsertionEffect:Im,useLayoutEffect:Fm,useMemo:km,useReducer:Gl,useRef:Pm,useState:function(){return Gl(aa)},useDebugValue:vf,useDeferredValue:function(e,i){var s=rn();return Xm(s,ke.memoizedState,e,i)},useTransition:function(){var e=Gl(aa)[0],i=rn().memoizedState;return[typeof e=="boolean"?e:Ro(e),i]},useSyncExternalStore:xm,useId:jm,useHostTransitionStatus:Sf,useFormState:Lm,useActionState:Lm,useOptimistic:function(e,i){var s=rn();return bm(s,ke,e,i)},useMemoCache:hf,useCacheRefresh:Zm};Ef.useEffectEvent=Bm;var t0={readContext:wn,use:Hl,useCallback:Vm,useContext:wn,useEffect:_f,useImperativeHandle:Gm,useInsertionEffect:Im,useLayoutEffect:Fm,useMemo:km,useReducer:pf,useRef:Pm,useState:function(){return pf(aa)},useDebugValue:vf,useDeferredValue:function(e,i){var s=rn();return ke===null?xf(s,e,i):Xm(s,ke.memoizedState,e,i)},useTransition:function(){var e=pf(aa)[0],i=rn().memoizedState;return[typeof e=="boolean"?e:Ro(e),i]},useSyncExternalStore:xm,useId:jm,useHostTransitionStatus:Sf,useFormState:Om,useActionState:Om,useOptimistic:function(e,i){var s=rn();return ke!==null?bm(s,ke,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:hf,useCacheRefresh:Zm};t0.useEffectEvent=Bm;function Tf(e,i,s,o){i=e.memoizedState,s=s(o,i),s=s==null?i:_({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var bf={enqueueSetState:function(e,i,s){e=e._reactInternals;var o=li(),u=za(o);u.payload=i,s!=null&&(u.callback=s),i=Ba(e,u,o),i!==null&&(Kn(i,e,o),Eo(i,e,o))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var o=li(),u=za(o);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=Ba(e,u,o),i!==null&&(Kn(i,e,o),Eo(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=li(),o=za(s);o.tag=2,i!=null&&(o.callback=i),i=Ba(e,o,s),i!==null&&(Kn(i,e,s),Eo(i,e,s))}};function e0(e,i,s,o,u,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,y):i.prototype&&i.prototype.isPureReactComponent?!mo(s,o)||!mo(u,h):!0}function n0(e,i,s,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,o),i.state!==e&&bf.enqueueReplaceState(i,i.state,null)}function bs(e,i){var s=i;if("ref"in i){s={};for(var o in i)o!=="ref"&&(s[o]=i[o])}if(e=e.defaultProps){s===i&&(s=_({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}function i0(e){Ml(e)}function a0(e){console.error(e)}function s0(e){Ml(e)}function ql(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function r0(e,i,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Af(e,i,s){return s=za(s),s.tag=3,s.payload={element:null},s.callback=function(){ql(e,i)},s}function o0(e){return e=za(e),e.tag=3,e}function l0(e,i,s,o){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){r0(i,s,o)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){r0(i,s,o),typeof u!="function"&&(ka===null?ka=new Set([this]):ka.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function Ry(e,i,s,o,u){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=s.alternate,i!==null&&nr(i,s,u,!0),s=ai.current,s!==null){switch(s.tag){case 31:case 13:return Si===null?ic():s.alternate===null&&nn===0&&(nn=3),s.flags&=-257,s.flags|=65536,s.lanes=u,o===Ll?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([o]):i.add(o),Qf(e,o,u)),!1;case 22:return s.flags|=65536,o===Ll?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([o]):s.add(o)),Qf(e,o,u)),!1}throw Error(a(435,s.tag))}return Qf(e,o,u),ic(),!1}if(Me)return i=ai.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==Xu&&(e=Error(a(422),{cause:o}),vo(_i(e,s)))):(o!==Xu&&(i=Error(a(423),{cause:o}),vo(_i(i,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=_i(o,s),u=Af(e.stateNode,o,u),ef(e,u),nn!==4&&(nn=2)),!1;var h=Error(a(520),{cause:o});if(h=_i(h,s),Bo===null?Bo=[h]:Bo.push(h),nn!==4&&(nn=2),i===null)return!0;o=_i(o,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=Af(s.stateNode,o,e),ef(s,e),!1;case 1:if(i=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(ka===null||!ka.has(h))))return s.flags|=65536,u&=-u,s.lanes|=u,u=o0(u),l0(u,e,s,o),ef(s,u),!1}s=s.return}while(s!==null);return!1}var Rf=Error(a(461)),un=!1;function Cn(e,i,s,o){i.child=e===null?hm(i,null,s,o):Es(i,e.child,s,o)}function c0(e,i,s,o,u){s=s.render;var h=i.ref;if("ref"in o){var y={};for(var b in o)b!=="ref"&&(y[b]=o[b])}else y=o;return xs(i),o=lf(e,i,s,y,h,u),b=cf(),e!==null&&!un?(uf(e,i,u),sa(e,i,u)):(Me&&b&&Vu(i),i.flags|=1,Cn(e,i,o,u),i.child)}function u0(e,i,s,o,u){if(e===null){var h=s.type;return typeof h=="function"&&!Fu(h)&&h.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=h,f0(e,i,h,o,u)):(e=Al(s.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(h=e.child,!Pf(e,u)){var y=h.memoizedProps;if(s=s.compare,s=s!==null?s:mo,s(y,o)&&e.ref===i.ref)return sa(e,i,u)}return i.flags|=1,e=$i(h,o),e.ref=i.ref,e.return=i,i.child=e}function f0(e,i,s,o,u){if(e!==null){var h=e.memoizedProps;if(mo(h,o)&&e.ref===i.ref)if(un=!1,i.pendingProps=o=h,Pf(e,u))(e.flags&131072)!==0&&(un=!0);else return i.lanes=e.lanes,sa(e,i,u)}return wf(e,i,s,o,u)}function h0(e,i,s,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,i.child=null;return d0(e,i,h,s,o)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Dl(i,h!==null?h.cachePool:null),h!==null?mm(i,h):af(),gm(i);else return o=i.lanes=536870912,d0(e,i,h!==null?h.baseLanes|s:s,s,o)}else h!==null?(Dl(i,h.cachePool),mm(i,h),Fa(),i.memoizedState=null):(e!==null&&Dl(i,null),af(),Fa());return Cn(e,i,u,s),i.child}function Do(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function d0(e,i,s,o,u){var h=Qu();return h=h===null?null:{parent:ln._currentValue,pool:h},i.memoizedState={baseLanes:s,cachePool:h},e!==null&&Dl(i,null),af(),gm(i),e!==null&&nr(e,i,o,!0),i.childLanes=u,null}function Wl(e,i){return i=jl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function p0(e,i,s){return Es(i,e.child,null,s),e=Wl(i,i.pendingProps),e.flags|=2,si(i),i.memoizedState=null,e}function wy(e,i,s){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Me){if(o.mode==="hidden")return e=Wl(i,o),i.lanes=536870912,Do(null,e);if(rf(i),(e=Ye)?(e=Ag(e,yi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ua!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},s=Qp(e),s.return=i,i.child=s,Rn=i,Ye=null)):e=null,e===null)throw Na(i);return i.lanes=536870912,null}return Wl(i,o)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(rf(i),u)if(i.flags&256)i.flags&=-257,i=p0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(un||nr(e,i,s,!1),u=(s&e.childLanes)!==0,un||u){if(o=We,o!==null&&(y=Gi(o,s),y!==0&&y!==h.retryLane))throw h.retryLane=y,ms(e,y),Kn(o,e,y),Rf;ic(),i=p0(e,i,s)}else e=h.treeContext,Ye=Mi(y.nextSibling),Rn=i,Me=!0,La=null,yi=!1,e!==null&&tm(i,e),i=Wl(i,o),i.flags|=4096;return i}return e=$i(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Yl(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function wf(e,i,s,o,u){return xs(i),s=lf(e,i,s,o,void 0,u),o=cf(),e!==null&&!un?(uf(e,i,u),sa(e,i,u)):(Me&&o&&Vu(i),i.flags|=1,Cn(e,i,s,u),i.child)}function m0(e,i,s,o,u,h){return xs(i),i.updateQueue=null,s=vm(i,o,s,u),_m(e),o=cf(),e!==null&&!un?(uf(e,i,h),sa(e,i,h)):(Me&&o&&Vu(i),i.flags|=1,Cn(e,i,s,h),i.child)}function g0(e,i,s,o,u){if(xs(i),i.stateNode===null){var h=Js,y=s.contextType;typeof y=="object"&&y!==null&&(h=wn(y)),h=new s(o,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=bf,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=o,h.state=i.memoizedState,h.refs={},$u(i),y=s.contextType,h.context=typeof y=="object"&&y!==null?wn(y):Js,h.state=i.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(Tf(i,s,y,o),h.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&bf.enqueueReplaceState(h,h.state,null),bo(i,o,h,u),To(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){h=i.stateNode;var b=i.memoizedProps,I=bs(s,b);h.props=I;var nt=h.context,dt=s.contextType;y=Js,typeof dt=="object"&&dt!==null&&(y=wn(dt));var _t=s.getDerivedStateFromProps;dt=typeof _t=="function"||typeof h.getSnapshotBeforeUpdate=="function",b=i.pendingProps!==b,dt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(b||nt!==y)&&n0(i,h,o,y),Pa=!1;var it=i.memoizedState;h.state=it,bo(i,o,h,u),To(),nt=i.memoizedState,b||it!==nt||Pa?(typeof _t=="function"&&(Tf(i,s,_t,o),nt=i.memoizedState),(I=Pa||e0(i,s,I,o,it,nt,y))?(dt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=nt),h.props=o,h.state=nt,h.context=y,o=I):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{h=i.stateNode,tf(e,i),y=i.memoizedProps,dt=bs(s,y),h.props=dt,_t=i.pendingProps,it=h.context,nt=s.contextType,I=Js,typeof nt=="object"&&nt!==null&&(I=wn(nt)),b=s.getDerivedStateFromProps,(nt=typeof b=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==_t||it!==I)&&n0(i,h,o,I),Pa=!1,it=i.memoizedState,h.state=it,bo(i,o,h,u),To();var ct=i.memoizedState;y!==_t||it!==ct||Pa||e!==null&&e.dependencies!==null&&wl(e.dependencies)?(typeof b=="function"&&(Tf(i,s,b,o),ct=i.memoizedState),(dt=Pa||e0(i,s,dt,o,it,ct,I)||e!==null&&e.dependencies!==null&&wl(e.dependencies))?(nt||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ct,I),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ct,I)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=ct),h.props=o,h.state=ct,h.context=I,o=dt):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&it===e.memoizedState||(i.flags|=1024),o=!1)}return h=o,Yl(e,i),o=(i.flags&128)!==0,h||o?(h=i.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,e!==null&&o?(i.child=Es(i,e.child,null,u),i.child=Es(i,null,s,u)):Cn(e,i,s,u),i.memoizedState=h.state,e=i.child):e=sa(e,i,u),e}function _0(e,i,s,o){return _s(),i.flags|=256,Cn(e,i,s,o),i.child}var Cf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Df(e){return{baseLanes:e,cachePool:rm()}}function Uf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=oi),e}function v0(e,i,s){var o=i.pendingProps,u=!1,h=(i.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:(sn.current&2)!==0),y&&(u=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Me){if(u?Ia(i):Fa(),(e=Ye)?(e=Ag(e,yi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ua!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},s=Qp(e),s.return=i,i.child=s,Rn=i,Ye=null)):e=null,e===null)throw Na(i);return dh(e)?i.lanes=32:i.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Fa(),u=i.mode,b=jl({mode:"hidden",children:b},u),o=gs(o,u,s,null),b.return=i,o.return=i,b.sibling=o,i.child=b,o=i.child,o.memoizedState=Df(s),o.childLanes=Uf(e,y,s),i.memoizedState=Cf,Do(null,o)):(Ia(i),Lf(i,b))}var I=e.memoizedState;if(I!==null&&(b=I.dehydrated,b!==null)){if(h)i.flags&256?(Ia(i),i.flags&=-257,i=Nf(e,i,s)):i.memoizedState!==null?(Fa(),i.child=e.child,i.flags|=128,i=null):(Fa(),b=o.fallback,u=i.mode,o=jl({mode:"visible",children:o.children},u),b=gs(b,u,s,null),b.flags|=2,o.return=i,b.return=i,o.sibling=b,i.child=o,Es(i,e.child,null,s),o=i.child,o.memoizedState=Df(s),o.childLanes=Uf(e,y,s),i.memoizedState=Cf,i=Do(null,o));else if(Ia(i),dh(b)){if(y=b.nextSibling&&b.nextSibling.dataset,y)var nt=y.dgst;y=nt,o=Error(a(419)),o.stack="",o.digest=y,vo({value:o,source:null,stack:null}),i=Nf(e,i,s)}else if(un||nr(e,i,s,!1),y=(s&e.childLanes)!==0,un||y){if(y=We,y!==null&&(o=Gi(y,s),o!==0&&o!==I.retryLane))throw I.retryLane=o,ms(e,o),Kn(y,e,o),Rf;hh(b)||ic(),i=Nf(e,i,s)}else hh(b)?(i.flags|=192,i.child=e.child,i=null):(e=I.treeContext,Ye=Mi(b.nextSibling),Rn=i,Me=!0,La=null,yi=!1,e!==null&&tm(i,e),i=Lf(i,o.children),i.flags|=4096);return i}return u?(Fa(),b=o.fallback,u=i.mode,I=e.child,nt=I.sibling,o=$i(I,{mode:"hidden",children:o.children}),o.subtreeFlags=I.subtreeFlags&65011712,nt!==null?b=$i(nt,b):(b=gs(b,u,s,null),b.flags|=2),b.return=i,o.return=i,o.sibling=b,i.child=o,Do(null,o),o=i.child,b=e.child.memoizedState,b===null?b=Df(s):(u=b.cachePool,u!==null?(I=ln._currentValue,u=u.parent!==I?{parent:I,pool:I}:u):u=rm(),b={baseLanes:b.baseLanes|s,cachePool:u}),o.memoizedState=b,o.childLanes=Uf(e,y,s),i.memoizedState=Cf,Do(e.child,o)):(Ia(i),s=e.child,e=s.sibling,s=$i(s,{mode:"visible",children:o.children}),s.return=i,s.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=s,i.memoizedState=null,s)}function Lf(e,i){return i=jl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function jl(e,i){return e=ii(22,e,null,i),e.lanes=0,e}function Nf(e,i,s){return Es(i,e.child,null,s),e=Lf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function x0(e,i,s){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),Yu(e.return,i,s)}function Of(e,i,s,o,u,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:u,treeForkCount:h}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=s,y.tailMode=u,y.treeForkCount=h)}function y0(e,i,s){var o=i.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var y=sn.current,b=(y&2)!==0;if(b?(y=y&1|2,i.flags|=128):y&=1,yt(sn,y),Cn(e,i,o,s),o=Me?_o:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&x0(e,s,i);else if(e.tag===19)x0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(s=i.child,u=null;s!==null;)e=s.alternate,e!==null&&zl(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),Of(i,!1,u,s,h,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&zl(e)===null){i.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}Of(i,!0,s,null,h,o);break;case"together":Of(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function sa(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),Va|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(nr(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=$i(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=$i(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Pf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&wl(e)))}function Cy(e,i,s){switch(i.tag){case 3:Vt(i,i.stateNode.containerInfo),Oa(i,ln,e.memoizedState.cache),_s();break;case 27:case 5:ae(i);break;case 4:Vt(i,i.stateNode.containerInfo);break;case 10:Oa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,rf(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ia(i),i.flags|=128,null):(s&i.child.childLanes)!==0?v0(e,i,s):(Ia(i),e=sa(e,i,s),e!==null?e.sibling:null);Ia(i);break;case 19:var u=(e.flags&128)!==0;if(o=(s&i.childLanes)!==0,o||(nr(e,i,s,!1),o=(s&i.childLanes)!==0),u){if(o)return y0(e,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),yt(sn,sn.current),o)break;return null;case 22:return i.lanes=0,h0(e,i,s,i.pendingProps);case 24:Oa(i,ln,e.memoizedState.cache)}return sa(e,i,s)}function S0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)un=!0;else{if(!Pf(e,s)&&(i.flags&128)===0)return un=!1,Cy(e,i,s);un=(e.flags&131072)!==0}else un=!1,Me&&(i.flags&1048576)!==0&&$p(i,_o,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=Ss(i.elementType),i.type=e,typeof e=="function")Fu(e)?(o=bs(e,o),i.tag=1,i=g0(null,i,e,o,s)):(i.tag=0,i=wf(null,i,e,o,s));else{if(e!=null){var u=e.$$typeof;if(u===w){i.tag=11,i=c0(null,i,e,o,s);break t}else if(u===O){i.tag=14,i=u0(null,i,e,o,s);break t}}throw i=lt(e)||e,Error(a(306,i,""))}}return i;case 0:return wf(e,i,i.type,i.pendingProps,s);case 1:return o=i.type,u=bs(o,i.pendingProps),g0(e,i,o,u,s);case 3:t:{if(Vt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));o=i.pendingProps;var h=i.memoizedState;u=h.element,tf(e,i),bo(i,o,null,s);var y=i.memoizedState;if(o=y.cache,Oa(i,ln,o),o!==h.cache&&ju(i,[ln],s,!0),To(),o=y.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=_0(e,i,o,s);break t}else if(o!==u){u=_i(Error(a(424)),i),vo(u),i=_0(e,i,o,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ye=Mi(e.firstChild),Rn=i,Me=!0,La=null,yi=!0,s=hm(i,null,o,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(_s(),o===u){i=sa(e,i,s);break t}Cn(e,i,o,s)}i=i.child}return i;case 26:return Yl(e,i),e===null?(s=Lg(i.type,null,i.pendingProps,null))?i.memoizedState=s:Me||(s=i.type,e=i.pendingProps,o=uc(Et.current).createElement(s),o[tn]=i,o[bn]=e,Dn(o,s,e),Dt(o),i.stateNode=o):i.memoizedState=Lg(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return ae(i),e===null&&Me&&(o=i.stateNode=Cg(i.type,i.pendingProps,Et.current),Rn=i,yi=!0,u=Ye,Ya(i.type)?(ph=u,Ye=Mi(o.firstChild)):Ye=u),Cn(e,i,i.pendingProps.children,s),Yl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Me&&((u=o=Ye)&&(o=sS(o,i.type,i.pendingProps,yi),o!==null?(i.stateNode=o,Rn=i,Ye=Mi(o.firstChild),yi=!1,u=!0):u=!1),u||Na(i)),ae(i),u=i.type,h=i.pendingProps,y=e!==null?e.memoizedProps:null,o=h.children,ch(u,h)?o=null:y!==null&&ch(u,y)&&(i.flags|=32),i.memoizedState!==null&&(u=lf(e,i,yy,null,null,s),qo._currentValue=u),Yl(e,i),Cn(e,i,o,s),i.child;case 6:return e===null&&Me&&((e=s=Ye)&&(s=rS(s,i.pendingProps,yi),s!==null?(i.stateNode=s,Rn=i,Ye=null,e=!0):e=!1),e||Na(i)),null;case 13:return v0(e,i,s);case 4:return Vt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=Es(i,null,o,s):Cn(e,i,o,s),i.child;case 11:return c0(e,i,i.type,i.pendingProps,s);case 7:return Cn(e,i,i.pendingProps,s),i.child;case 8:return Cn(e,i,i.pendingProps.children,s),i.child;case 12:return Cn(e,i,i.pendingProps.children,s),i.child;case 10:return o=i.pendingProps,Oa(i,i.type,o.value),Cn(e,i,o.children,s),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,xs(i),u=wn(u),o=o(u),i.flags|=1,Cn(e,i,o,s),i.child;case 14:return u0(e,i,i.type,i.pendingProps,s);case 15:return f0(e,i,i.type,i.pendingProps,s);case 19:return y0(e,i,s);case 31:return wy(e,i,s);case 22:return h0(e,i,s,i.pendingProps);case 24:return xs(i),o=wn(ln),e===null?(u=Qu(),u===null&&(u=We,h=Zu(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=s),u=h),i.memoizedState={parent:o,cache:u},$u(i),Oa(i,ln,u)):((e.lanes&s)!==0&&(tf(e,i),bo(i,null,null,s),To()),u=e.memoizedState,h=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Oa(i,ln,o)):(o=h.cache,Oa(i,ln,o),o!==u.cache&&ju(i,[ln],s,!0))),Cn(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function ra(e){e.flags|=4}function zf(e,i,s,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(j0())e.flags|=8192;else throw Ms=Ll,Ju}else e.flags&=-16777217}function M0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Bg(i))if(j0())e.flags|=8192;else throw Ms=Ll,Ju}function Zl(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?pn():536870912,e.lanes|=i,pr|=i)}function Uo(e,i){if(!Me)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function je(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(i)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=s,i}function Dy(e,i,s){var o=i.pendingProps;switch(ku(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return je(i),null;case 1:return je(i),null;case 3:return s=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),na(ln),Gt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(er(i)?ra(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,qu())),je(i),null;case 26:var u=i.type,h=i.memoizedState;return e===null?(ra(i),h!==null?(je(i),M0(i,h)):(je(i),zf(i,u,null,o,s))):h?h!==e.memoizedState?(ra(i),je(i),M0(i,h)):(je(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&ra(i),je(i),zf(i,u,e,o,s)),null;case 27:if(He(i),s=Et.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return je(i),null}e=Z.current,er(i)?em(i):(e=Cg(u,o,s),i.stateNode=e,ra(i))}return je(i),null;case 5:if(He(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return je(i),null}if(h=Z.current,er(i))em(i);else{var y=uc(Et.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}h[tn]=i,h[bn]=o;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=h;t:switch(Dn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ra(i)}}return je(i),zf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&ra(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(a(166));if(e=Et.current,er(i)){if(e=i.stateNode,s=i.memoizedProps,o=null,u=Rn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[tn]=i,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||vg(e.nodeValue,s)),e||Na(i,!0)}else e=uc(e).createTextNode(o),e[tn]=i,i.stateNode=e}return je(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(o=er(i),s!==null){if(e===null){if(!o)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[tn]=i}else _s(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;je(i),e=!1}else s=qu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(si(i),i):(si(i),null);if((i.flags&128)!==0)throw Error(a(558))}return je(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=er(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[tn]=i}else _s(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;je(i),u=!1}else u=qu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(si(i),i):(si(i),null)}return si(i),(i.flags&128)!==0?(i.lanes=s,i):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),Zl(i,i.updateQueue),je(i),null);case 4:return Gt(),e===null&&ah(i.stateNode.containerInfo),je(i),null;case 10:return na(i.type),je(i),null;case 19:if(st(sn),o=i.memoizedState,o===null)return je(i),null;if(u=(i.flags&128)!==0,h=o.rendering,h===null)if(u)Uo(o,!1);else{if(nn!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(h=zl(e),h!==null){for(i.flags|=128,Uo(o,!1),e=h.updateQueue,i.updateQueue=e,Zl(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)Kp(s,e),s=s.sibling;return yt(sn,sn.current&1|2),Me&&ta(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&pt()>tc&&(i.flags|=128,u=!0,Uo(o,!1),i.lanes=4194304)}else{if(!u)if(e=zl(h),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,Zl(i,e),Uo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Me)return je(i),null}else 2*pt()-o.renderingStartTime>tc&&s!==536870912&&(i.flags|=128,u=!0,Uo(o,!1),i.lanes=4194304);o.isBackwards?(h.sibling=i.child,i.child=h):(e=o.last,e!==null?e.sibling=h:i.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=pt(),e.sibling=null,s=sn.current,yt(sn,u?s&1|2:s&1),Me&&ta(i,o.treeForkCount),e):(je(i),null);case 22:case 23:return si(i),sf(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(s&536870912)!==0&&(i.flags&128)===0&&(je(i),i.subtreeFlags&6&&(i.flags|=8192)):je(i),s=i.updateQueue,s!==null&&Zl(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==s&&(i.flags|=2048),e!==null&&st(ys),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),na(ln),je(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function Uy(e,i){switch(ku(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return na(ln),Gt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return He(i),null;case 31:if(i.memoizedState!==null){if(si(i),i.alternate===null)throw Error(a(340));_s()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(si(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));_s()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return st(sn),null;case 4:return Gt(),null;case 10:return na(i.type),null;case 22:case 23:return si(i),sf(),e!==null&&st(ys),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return na(ln),null;case 25:return null;default:return null}}function E0(e,i){switch(ku(i),i.tag){case 3:na(ln),Gt();break;case 26:case 27:case 5:He(i);break;case 4:Gt();break;case 31:i.memoizedState!==null&&si(i);break;case 13:si(i);break;case 19:st(sn);break;case 10:na(i.type);break;case 22:case 23:si(i),sf(),e!==null&&st(ys);break;case 24:na(ln)}}function Lo(e,i){try{var s=i.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var u=o.next;s=u;do{if((s.tag&e)===e){o=void 0;var h=s.create,y=s.inst;o=h(),y.destroy=o}s=s.next}while(s!==u)}}catch(b){Ie(i,i.return,b)}}function Ha(e,i,s){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var y=o.inst,b=y.destroy;if(b!==void 0){y.destroy=void 0,u=i;var I=s,nt=b;try{nt()}catch(dt){Ie(u,I,dt)}}}o=o.next}while(o!==h)}}catch(dt){Ie(i,i.return,dt)}}function T0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{pm(i,s)}catch(o){Ie(e,e.return,o)}}}function b0(e,i,s){s.props=bs(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){Ie(e,i,o)}}function No(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(u){Ie(e,i,u)}}function Xi(e,i){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(u){Ie(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Ie(e,i,u)}else s.current=null}function A0(e){var i=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(u){Ie(e,e.return,u)}}function Bf(e,i,s){try{var o=e.stateNode;$y(o,e.type,s,i),o[bn]=i}catch(u){Ie(e,e.return,u)}}function R0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ya(e.type)||e.tag===4}function If(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||R0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ya(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ff(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Qi));else if(o!==4&&(o===27&&Ya(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(Ff(e,i,s),e=e.sibling;e!==null;)Ff(e,i,s),e=e.sibling}function Kl(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(o!==4&&(o===27&&Ya(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(Kl(e,i,s),e=e.sibling;e!==null;)Kl(e,i,s),e=e.sibling}function w0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Dn(i,o,s),i[tn]=e,i[bn]=s}catch(h){Ie(e,e.return,h)}}var oa=!1,fn=!1,Hf=!1,C0=typeof WeakSet=="function"?WeakSet:Set,Mn=null;function Ly(e,i){if(e=e.containerInfo,oh=_c,e=Gp(e),Lu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break t}var y=0,b=-1,I=-1,nt=0,dt=0,_t=e,it=null;e:for(;;){for(var ct;_t!==s||u!==0&&_t.nodeType!==3||(b=y+u),_t!==h||o!==0&&_t.nodeType!==3||(I=y+o),_t.nodeType===3&&(y+=_t.nodeValue.length),(ct=_t.firstChild)!==null;)it=_t,_t=ct;for(;;){if(_t===e)break e;if(it===s&&++nt===u&&(b=y),it===h&&++dt===o&&(I=y),(ct=_t.nextSibling)!==null)break;_t=it,it=_t.parentNode}_t=ct}s=b===-1||I===-1?null:{start:b,end:I}}else s=null}s=s||{start:0,end:0}}else s=null;for(lh={focusedElem:e,selectionRange:s},_c=!1,Mn=i;Mn!==null;)if(i=Mn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Mn=e;else for(;Mn!==null;){switch(i=Mn,h=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)u=e[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,s=i,u=h.memoizedProps,h=h.memoizedState,o=s.stateNode;try{var Ft=bs(s.type,u);e=o.getSnapshotBeforeUpdate(Ft,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){Ie(s,s.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)fh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":fh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Mn=e;break}Mn=i.return}}function D0(e,i,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:ca(e,s),o&4&&Lo(5,s);break;case 1:if(ca(e,s),o&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(y){Ie(s,s.return,y)}else{var u=bs(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Ie(s,s.return,y)}}o&64&&T0(s),o&512&&No(s,s.return);break;case 3:if(ca(e,s),o&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{pm(e,i)}catch(y){Ie(s,s.return,y)}}break;case 27:i===null&&o&4&&w0(s);case 26:case 5:ca(e,s),i===null&&o&4&&A0(s),o&512&&No(s,s.return);break;case 12:ca(e,s);break;case 31:ca(e,s),o&4&&N0(e,s);break;case 13:ca(e,s),o&4&&O0(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=Gy.bind(null,s),oS(e,s))));break;case 22:if(o=s.memoizedState!==null||oa,!o){i=i!==null&&i.memoizedState!==null||fn,u=oa;var h=fn;oa=o,(fn=i)&&!h?ua(e,s,(s.subtreeFlags&8772)!==0):ca(e,s),oa=u,fn=h}break;case 30:break;default:ca(e,s)}}function U0(e){var i=e.alternate;i!==null&&(e.alternate=null,U0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&ot(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Je=null,Wn=!1;function la(e,i,s){for(s=s.child;s!==null;)L0(e,i,s),s=s.sibling}function L0(e,i,s){if(Yt&&typeof Yt.onCommitFiberUnmount=="function")try{Yt.onCommitFiberUnmount(Kt,s)}catch{}switch(s.tag){case 26:fn||Xi(s,i),la(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:fn||Xi(s,i);var o=Je,u=Wn;Ya(s.type)&&(Je=s.stateNode,Wn=!1),la(e,i,s),Vo(s.stateNode),Je=o,Wn=u;break;case 5:fn||Xi(s,i);case 6:if(o=Je,u=Wn,Je=null,la(e,i,s),Je=o,Wn=u,Je!==null)if(Wn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(s.stateNode)}catch(h){Ie(s,i,h)}else try{Je.removeChild(s.stateNode)}catch(h){Ie(s,i,h)}break;case 18:Je!==null&&(Wn?(e=Je,Tg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Mr(e)):Tg(Je,s.stateNode));break;case 4:o=Je,u=Wn,Je=s.stateNode.containerInfo,Wn=!0,la(e,i,s),Je=o,Wn=u;break;case 0:case 11:case 14:case 15:Ha(2,s,i),fn||Ha(4,s,i),la(e,i,s);break;case 1:fn||(Xi(s,i),o=s.stateNode,typeof o.componentWillUnmount=="function"&&b0(s,i,o)),la(e,i,s);break;case 21:la(e,i,s);break;case 22:fn=(o=fn)||s.memoizedState!==null,la(e,i,s),fn=o;break;default:la(e,i,s)}}function N0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Mr(e)}catch(s){Ie(i,i.return,s)}}}function O0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Mr(e)}catch(s){Ie(i,i.return,s)}}function Ny(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new C0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new C0),i;default:throw Error(a(435,e.tag))}}function Ql(e,i){var s=Ny(e);i.forEach(function(o){if(!s.has(o)){s.add(o);var u=Vy.bind(null,e,o);o.then(u,u)}})}function Yn(e,i){var s=i.deletions;if(s!==null)for(var o=0;o<s.length;o++){var u=s[o],h=e,y=i,b=y;t:for(;b!==null;){switch(b.tag){case 27:if(Ya(b.type)){Je=b.stateNode,Wn=!1;break t}break;case 5:Je=b.stateNode,Wn=!1;break t;case 3:case 4:Je=b.stateNode.containerInfo,Wn=!0;break t}b=b.return}if(Je===null)throw Error(a(160));L0(h,y,u),Je=null,Wn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)P0(i,e),i=i.sibling}var Li=null;function P0(e,i){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Yn(i,e),jn(e),o&4&&(Ha(3,e,e.return),Lo(3,e),Ha(5,e,e.return));break;case 1:Yn(i,e),jn(e),o&512&&(fn||s===null||Xi(s,s.return)),o&64&&oa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var u=Li;if(Yn(i,e),jn(e),o&512&&(fn||s===null||Xi(s,s.return)),o&4){var h=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[k]||h[tn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Dn(h,o,s),h[tn]=e,Dt(h),o=h;break t;case"link":var y=Pg("link","href",u).get(o+(s.href||""));if(y){for(var b=0;b<y.length;b++)if(h=y[b],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(b,1);break e}}h=u.createElement(o),Dn(h,o,s),u.head.appendChild(h);break;case"meta":if(y=Pg("meta","content",u).get(o+(s.content||""))){for(b=0;b<y.length;b++)if(h=y[b],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(b,1);break e}}h=u.createElement(o),Dn(h,o,s),u.head.appendChild(h);break;default:throw Error(a(468,o))}h[tn]=e,Dt(h),o=h}e.stateNode=o}else zg(u,e.type,e.stateNode);else e.stateNode=Og(u,o,e.memoizedProps);else h!==o?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,o===null?zg(u,e.type,e.stateNode):Og(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Bf(e,e.memoizedProps,s.memoizedProps)}break;case 27:Yn(i,e),jn(e),o&512&&(fn||s===null||Xi(s,s.return)),s!==null&&o&4&&Bf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Yn(i,e),jn(e),o&512&&(fn||s===null||Xi(s,s.return)),e.flags&32){u=e.stateNode;try{qs(u,"")}catch(Ft){Ie(e,e.return,Ft)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Bf(e,u,s!==null?s.memoizedProps:u)),o&1024&&(Hf=!0);break;case 6:if(Yn(i,e),jn(e),o&4){if(e.stateNode===null)throw Error(a(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(Ft){Ie(e,e.return,Ft)}}break;case 3:if(dc=null,u=Li,Li=fc(i.containerInfo),Yn(i,e),Li=u,jn(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{Mr(i.containerInfo)}catch(Ft){Ie(e,e.return,Ft)}Hf&&(Hf=!1,z0(e));break;case 4:o=Li,Li=fc(e.stateNode.containerInfo),Yn(i,e),jn(e),Li=o;break;case 12:Yn(i,e),jn(e);break;case 31:Yn(i,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 13:Yn(i,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&($l=pt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 22:u=e.memoizedState!==null;var I=s!==null&&s.memoizedState!==null,nt=oa,dt=fn;if(oa=nt||u,fn=dt||I,Yn(i,e),fn=dt,oa=nt,jn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(s===null||I||oa||fn||As(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){I=s=i;try{if(h=I.stateNode,u)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{b=I.stateNode;var _t=I.memoizedProps.style,it=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;b.style.display=it==null||typeof it=="boolean"?"":(""+it).trim()}}catch(Ft){Ie(I,I.return,Ft)}}}else if(i.tag===6){if(s===null){I=i;try{I.stateNode.nodeValue=u?"":I.memoizedProps}catch(Ft){Ie(I,I.return,Ft)}}}else if(i.tag===18){if(s===null){I=i;try{var ct=I.stateNode;u?bg(ct,!0):bg(I.stateNode,!1)}catch(Ft){Ie(I,I.return,Ft)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,Ql(e,s))));break;case 19:Yn(i,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ql(e,o)));break;case 30:break;case 21:break;default:Yn(i,e),jn(e)}}function jn(e){var i=e.flags;if(i&2){try{for(var s,o=e.return;o!==null;){if(R0(o)){s=o;break}o=o.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var u=s.stateNode,h=If(e);Kl(e,h,u);break;case 5:var y=s.stateNode;s.flags&32&&(qs(y,""),s.flags&=-33);var b=If(e);Kl(e,b,y);break;case 3:case 4:var I=s.stateNode.containerInfo,nt=If(e);Ff(e,nt,I);break;default:throw Error(a(161))}}catch(dt){Ie(e,e.return,dt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function z0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;z0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function ca(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)D0(e,i.alternate,i),i=i.sibling}function As(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Ha(4,i,i.return),As(i);break;case 1:Xi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&b0(i,i.return,s),As(i);break;case 27:Vo(i.stateNode);case 26:case 5:Xi(i,i.return),As(i);break;case 22:i.memoizedState===null&&As(i);break;case 30:As(i);break;default:As(i)}e=e.sibling}}function ua(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,h=i,y=h.flags;switch(h.tag){case 0:case 11:case 15:ua(u,h,s),Lo(4,h);break;case 1:if(ua(u,h,s),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(nt){Ie(o,o.return,nt)}if(o=h,u=o.updateQueue,u!==null){var b=o.stateNode;try{var I=u.shared.hiddenCallbacks;if(I!==null)for(u.shared.hiddenCallbacks=null,u=0;u<I.length;u++)dm(I[u],b)}catch(nt){Ie(o,o.return,nt)}}s&&y&64&&T0(h),No(h,h.return);break;case 27:w0(h);case 26:case 5:ua(u,h,s),s&&o===null&&y&4&&A0(h),No(h,h.return);break;case 12:ua(u,h,s);break;case 31:ua(u,h,s),s&&y&4&&N0(u,h);break;case 13:ua(u,h,s),s&&y&4&&O0(u,h);break;case 22:h.memoizedState===null&&ua(u,h,s),No(h,h.return);break;case 30:break;default:ua(u,h,s)}i=i.sibling}}function Gf(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&xo(s))}function Vf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&xo(e))}function Ni(e,i,s,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)B0(e,i,s,o),i=i.sibling}function B0(e,i,s,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Ni(e,i,s,o),u&2048&&Lo(9,i);break;case 1:Ni(e,i,s,o);break;case 3:Ni(e,i,s,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&xo(e)));break;case 12:if(u&2048){Ni(e,i,s,o),e=i.stateNode;try{var h=i.memoizedProps,y=h.id,b=h.onPostCommit;typeof b=="function"&&b(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(I){Ie(i,i.return,I)}}else Ni(e,i,s,o);break;case 31:Ni(e,i,s,o);break;case 13:Ni(e,i,s,o);break;case 23:break;case 22:h=i.stateNode,y=i.alternate,i.memoizedState!==null?h._visibility&2?Ni(e,i,s,o):Oo(e,i):h._visibility&2?Ni(e,i,s,o):(h._visibility|=2,fr(e,i,s,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Gf(y,i);break;case 24:Ni(e,i,s,o),u&2048&&Vf(i.alternate,i);break;default:Ni(e,i,s,o)}}function fr(e,i,s,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=e,y=i,b=s,I=o,nt=y.flags;switch(y.tag){case 0:case 11:case 15:fr(h,y,b,I,u),Lo(8,y);break;case 23:break;case 22:var dt=y.stateNode;y.memoizedState!==null?dt._visibility&2?fr(h,y,b,I,u):Oo(h,y):(dt._visibility|=2,fr(h,y,b,I,u)),u&&nt&2048&&Gf(y.alternate,y);break;case 24:fr(h,y,b,I,u),u&&nt&2048&&Vf(y.alternate,y);break;default:fr(h,y,b,I,u)}i=i.sibling}}function Oo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,o=i,u=o.flags;switch(o.tag){case 22:Oo(s,o),u&2048&&Gf(o.alternate,o);break;case 24:Oo(s,o),u&2048&&Vf(o.alternate,o);break;default:Oo(s,o)}i=i.sibling}}var Po=8192;function hr(e,i,s){if(e.subtreeFlags&Po)for(e=e.child;e!==null;)I0(e,i,s),e=e.sibling}function I0(e,i,s){switch(e.tag){case 26:hr(e,i,s),e.flags&Po&&e.memoizedState!==null&&xS(s,Li,e.memoizedState,e.memoizedProps);break;case 5:hr(e,i,s);break;case 3:case 4:var o=Li;Li=fc(e.stateNode.containerInfo),hr(e,i,s),Li=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Po,Po=16777216,hr(e,i,s),Po=o):hr(e,i,s));break;default:hr(e,i,s)}}function F0(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function zo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Mn=o,G0(o,e)}F0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)H0(e),e=e.sibling}function H0(e){switch(e.tag){case 0:case 11:case 15:zo(e),e.flags&2048&&Ha(9,e,e.return);break;case 3:zo(e);break;case 12:zo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,Jl(e)):zo(e);break;default:zo(e)}}function Jl(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Mn=o,G0(o,e)}F0(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Ha(8,i,i.return),Jl(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,Jl(i));break;default:Jl(i)}e=e.sibling}}function G0(e,i){for(;Mn!==null;){var s=Mn;switch(s.tag){case 0:case 11:case 15:Ha(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:xo(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,Mn=o;else t:for(s=e;Mn!==null;){o=Mn;var u=o.sibling,h=o.return;if(U0(o),o===s){Mn=null;break t}if(u!==null){u.return=h,Mn=u;break t}Mn=h}}}var Oy={getCacheForType:function(e){var i=wn(ln),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return wn(ln).controller.signal}},Py=typeof WeakMap=="function"?WeakMap:Map,Le=0,We=null,pe=null,ve=0,Be=0,ri=null,Ga=!1,dr=!1,kf=!1,fa=0,nn=0,Va=0,Rs=0,Xf=0,oi=0,pr=0,Bo=null,Zn=null,qf=!1,$l=0,V0=0,tc=1/0,ec=null,ka=null,gn=0,Xa=null,mr=null,ha=0,Wf=0,Yf=null,k0=null,Io=0,jf=null;function li(){return(Le&2)!==0&&ve!==0?ve&-ve:z.T!==null?th():so()}function X0(){if(oi===0)if((ve&536870912)===0||Me){var e=ut;ut<<=1,(ut&3932160)===0&&(ut=262144),oi=e}else oi=536870912;return e=ai.current,e!==null&&(e.flags|=32),oi}function Kn(e,i,s){(e===We&&(Be===2||Be===9)||e.cancelPendingCommit!==null)&&(gr(e,0),qa(e,ve,oi,!1)),Tn(e,s),((Le&2)===0||e!==We)&&(e===We&&((Le&2)===0&&(Rs|=s),nn===4&&qa(e,ve,oi,!1)),qi(e))}function q0(e,i,s){if((Le&6)!==0)throw Error(a(327));var o=!s&&(i&127)===0&&(i&e.expiredLanes)===0||ee(e,i),u=o?Iy(e,i):Kf(e,i,!0),h=o;do{if(u===0){dr&&!o&&qa(e,i,0,!1);break}else{if(s=e.current.alternate,h&&!zy(s)){u=Kf(e,i,!1),h=!1;continue}if(u===2){if(h=i,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var b=e;u=Bo;var I=b.current.memoizedState.isDehydrated;if(I&&(gr(b,y).flags|=256),y=Kf(b,y,!1),y!==2){if(kf&&!I){b.errorRecoveryDisabledLanes|=h,Rs|=h,u=4;break t}h=Zn,Zn=u,h!==null&&(Zn===null?Zn=h:Zn.push.apply(Zn,h))}u=y}if(h=!1,u!==2)continue}}if(u===1){gr(e,0),qa(e,i,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:qa(o,i,oi,!Ga);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(u=$l+300-pt(),10<u)){if(qa(o,i,oi,!Ga),Lt(o,0,!0)!==0)break t;ha=i,o.timeoutHandle=Mg(W0.bind(null,o,s,Zn,ec,qf,i,oi,Rs,pr,Ga,h,"Throttled",-0,0),u);break t}W0(o,s,Zn,ec,qf,i,oi,Rs,pr,Ga,h,null,-0,0)}}break}while(!0);qi(e)}function W0(e,i,s,o,u,h,y,b,I,nt,dt,_t,it,ct){if(e.timeoutHandle=-1,_t=i.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Qi},I0(i,h,_t);var Ft=(h&62914560)===h?$l-pt():(h&4194048)===h?V0-pt():0;if(Ft=yS(_t,Ft),Ft!==null){ha=h,e.cancelPendingCommit=Ft(tg.bind(null,e,i,h,s,o,u,y,b,I,dt,_t,null,it,ct)),qa(e,h,y,!nt);return}}tg(e,i,h,s,o,u,y,b,I)}function zy(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var u=s[o],h=u.getSnapshot;u=u.value;try{if(!ni(h(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function qa(e,i,s,o){i&=~Xf,i&=~Rs,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var h=31-te(u),y=1<<h;o[h]=-1,u&=~y}s!==0&&io(e,s,i)}function nc(){return(Le&6)===0?(Fo(0),!1):!0}function Zf(){if(pe!==null){if(Be===0)var e=pe.return;else e=pe,ea=vs=null,ff(e),rr=null,So=0,e=pe;for(;e!==null;)E0(e.alternate,e),e=e.return;pe=null}}function gr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,nS(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ha=0,Zf(),We=e,pe=s=$i(e.current,null),ve=i,Be=0,ri=null,Ga=!1,dr=ee(e,i),kf=!1,pr=oi=Xf=Rs=Va=nn=0,Zn=Bo=null,qf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-te(o),h=1<<u;i|=e[u],o&=~h}return fa=i,El(),s}function Y0(e,i){oe=null,z.H=Co,i===sr||i===Ul?(i=cm(),Be=3):i===Ju?(i=cm(),Be=4):Be=i===Rf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ri=i,pe===null&&(nn=1,ql(e,_i(i,e.current)))}function j0(){var e=ai.current;return e===null?!0:(ve&4194048)===ve?Si===null:(ve&62914560)===ve||(ve&536870912)!==0?e===Si:!1}function Z0(){var e=z.H;return z.H=Co,e===null?Co:e}function K0(){var e=z.A;return z.A=Oy,e}function ic(){nn=4,Ga||(ve&4194048)!==ve&&ai.current!==null||(dr=!0),(Va&134217727)===0&&(Rs&134217727)===0||We===null||qa(We,ve,oi,!1)}function Kf(e,i,s){var o=Le;Le|=2;var u=Z0(),h=K0();(We!==e||ve!==i)&&(ec=null,gr(e,i)),i=!1;var y=nn;t:do try{if(Be!==0&&pe!==null){var b=pe,I=ri;switch(Be){case 8:Zf(),y=6;break t;case 3:case 2:case 9:case 6:ai.current===null&&(i=!0);var nt=Be;if(Be=0,ri=null,_r(e,b,I,nt),s&&dr){y=0;break t}break;default:nt=Be,Be=0,ri=null,_r(e,b,I,nt)}}By(),y=nn;break}catch(dt){Y0(e,dt)}while(!0);return i&&e.shellSuspendCounter++,ea=vs=null,Le=o,z.H=u,z.A=h,pe===null&&(We=null,ve=0,El()),y}function By(){for(;pe!==null;)Q0(pe)}function Iy(e,i){var s=Le;Le|=2;var o=Z0(),u=K0();We!==e||ve!==i?(ec=null,tc=pt()+500,gr(e,i)):dr=ee(e,i);t:do try{if(Be!==0&&pe!==null){i=pe;var h=ri;e:switch(Be){case 1:Be=0,ri=null,_r(e,i,h,1);break;case 2:case 9:if(om(h)){Be=0,ri=null,J0(i);break}i=function(){Be!==2&&Be!==9||We!==e||(Be=7),qi(e)},h.then(i,i);break t;case 3:Be=7;break t;case 4:Be=5;break t;case 7:om(h)?(Be=0,ri=null,J0(i)):(Be=0,ri=null,_r(e,i,h,7));break;case 5:var y=null;switch(pe.tag){case 26:y=pe.memoizedState;case 5:case 27:var b=pe;if(y?Bg(y):b.stateNode.complete){Be=0,ri=null;var I=b.sibling;if(I!==null)pe=I;else{var nt=b.return;nt!==null?(pe=nt,ac(nt)):pe=null}break e}}Be=0,ri=null,_r(e,i,h,5);break;case 6:Be=0,ri=null,_r(e,i,h,6);break;case 8:Zf(),nn=6;break t;default:throw Error(a(462))}}Fy();break}catch(dt){Y0(e,dt)}while(!0);return ea=vs=null,z.H=o,z.A=u,Le=s,pe!==null?0:(We=null,ve=0,El(),nn)}function Fy(){for(;pe!==null&&!A();)Q0(pe)}function Q0(e){var i=S0(e.alternate,e,fa);e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function J0(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=m0(s,i,i.pendingProps,i.type,void 0,ve);break;case 11:i=m0(s,i,i.pendingProps,i.type.render,i.ref,ve);break;case 5:ff(i);default:E0(s,i),i=pe=Kp(i,fa),i=S0(s,i,fa)}e.memoizedProps=e.pendingProps,i===null?ac(e):pe=i}function _r(e,i,s,o){ea=vs=null,ff(i),rr=null,So=0;var u=i.return;try{if(Ry(e,u,i,s,ve)){nn=1,ql(e,_i(s,e.current)),pe=null;return}}catch(h){if(u!==null)throw pe=u,h;nn=1,ql(e,_i(s,e.current)),pe=null;return}i.flags&32768?(Me||o===1?e=!0:dr||(ve&536870912)!==0?e=!1:(Ga=e=!0,(o===2||o===9||o===3||o===6)&&(o=ai.current,o!==null&&o.tag===13&&(o.flags|=16384))),$0(i,e)):ac(i)}function ac(e){var i=e;do{if((i.flags&32768)!==0){$0(i,Ga);return}e=i.return;var s=Dy(i.alternate,i,fa);if(s!==null){pe=s;return}if(i=i.sibling,i!==null){pe=i;return}pe=i=e}while(i!==null);nn===0&&(nn=5)}function $0(e,i){do{var s=Uy(e.alternate,e);if(s!==null){s.flags&=32767,pe=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){pe=e;return}pe=e=s}while(e!==null);nn=6,pe=null}function tg(e,i,s,o,u,h,y,b,I){e.cancelPendingCommit=null;do sc();while(gn!==0);if((Le&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(h=i.lanes|i.childLanes,h|=Bu,wi(e,s,h,y,b,I),e===We&&(pe=We=null,ve=0),mr=i,Xa=e,ha=s,Wf=h,Yf=u,k0=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,ky(Ut,function(){return sg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=Q.p,Q.p=2,y=Le,Le|=4;try{Ly(e,i,s)}finally{Le=y,Q.p=u,z.T=o}}gn=1,eg(),ng(),ig()}}function eg(){if(gn===1){gn=0;var e=Xa,i=mr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Le;Le|=4;try{P0(i,e);var h=lh,y=Gp(e.containerInfo),b=h.focusedElem,I=h.selectionRange;if(y!==b&&b&&b.ownerDocument&&Hp(b.ownerDocument.documentElement,b)){if(I!==null&&Lu(b)){var nt=I.start,dt=I.end;if(dt===void 0&&(dt=nt),"selectionStart"in b)b.selectionStart=nt,b.selectionEnd=Math.min(dt,b.value.length);else{var _t=b.ownerDocument||document,it=_t&&_t.defaultView||window;if(it.getSelection){var ct=it.getSelection(),Ft=b.textContent.length,Jt=Math.min(I.start,Ft),qe=I.end===void 0?Jt:Math.min(I.end,Ft);!ct.extend&&Jt>qe&&(y=qe,qe=Jt,Jt=y);var Y=Fp(b,Jt),G=Fp(b,qe);if(Y&&G&&(ct.rangeCount!==1||ct.anchorNode!==Y.node||ct.anchorOffset!==Y.offset||ct.focusNode!==G.node||ct.focusOffset!==G.offset)){var et=_t.createRange();et.setStart(Y.node,Y.offset),ct.removeAllRanges(),Jt>qe?(ct.addRange(et),ct.extend(G.node,G.offset)):(et.setEnd(G.node,G.offset),ct.addRange(et))}}}}for(_t=[],ct=b;ct=ct.parentNode;)ct.nodeType===1&&_t.push({element:ct,left:ct.scrollLeft,top:ct.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<_t.length;b++){var mt=_t[b];mt.element.scrollLeft=mt.left,mt.element.scrollTop=mt.top}}_c=!!oh,lh=oh=null}finally{Le=u,Q.p=o,z.T=s}}e.current=i,gn=2}}function ng(){if(gn===2){gn=0;var e=Xa,i=mr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Le;Le|=4;try{D0(e,i.alternate,i)}finally{Le=u,Q.p=o,z.T=s}}gn=3}}function ig(){if(gn===4||gn===3){gn=0,at();var e=Xa,i=mr,s=ha,o=k0;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?gn=5:(gn=0,mr=Xa=null,ag(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(ka=null),Xs(s),i=i.stateNode,Yt&&typeof Yt.onCommitFiberRoot=="function")try{Yt.onCommitFiberRoot(Kt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=z.T,u=Q.p,Q.p=2,z.T=null;try{for(var h=e.onRecoverableError,y=0;y<o.length;y++){var b=o[y];h(b.value,{componentStack:b.stack})}}finally{z.T=i,Q.p=u}}(ha&3)!==0&&sc(),qi(e),u=e.pendingLanes,(s&261930)!==0&&(u&42)!==0?e===jf?Io++:(Io=0,jf=e):Io=0,Fo(0)}}function ag(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,xo(i)))}function sc(){return eg(),ng(),ig(),sg()}function sg(){if(gn!==5)return!1;var e=Xa,i=Wf;Wf=0;var s=Xs(ha),o=z.T,u=Q.p;try{Q.p=32>s?32:s,z.T=null,s=Yf,Yf=null;var h=Xa,y=ha;if(gn=0,mr=Xa=null,ha=0,(Le&6)!==0)throw Error(a(331));var b=Le;if(Le|=4,H0(h.current),B0(h,h.current,y,s),Le=b,Fo(0,!1),Yt&&typeof Yt.onPostCommitFiberRoot=="function")try{Yt.onPostCommitFiberRoot(Kt,h)}catch{}return!0}finally{Q.p=u,z.T=o,ag(e,i)}}function rg(e,i,s){i=_i(s,i),i=Af(e.stateNode,i,2),e=Ba(e,i,2),e!==null&&(Tn(e,2),qi(e))}function Ie(e,i,s){if(e.tag===3)rg(e,e,s);else for(;i!==null;){if(i.tag===3){rg(i,e,s);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(ka===null||!ka.has(o))){e=_i(s,e),s=o0(2),o=Ba(i,s,2),o!==null&&(l0(s,o,i,e),Tn(o,2),qi(o));break}}i=i.return}}function Qf(e,i,s){var o=e.pingCache;if(o===null){o=e.pingCache=new Py;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(s)||(kf=!0,u.add(s),e=Hy.bind(null,e,i,s),i.then(e,e))}function Hy(e,i,s){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,We===e&&(ve&s)===s&&(nn===4||nn===3&&(ve&62914560)===ve&&300>pt()-$l?(Le&2)===0&&gr(e,0):Xf|=s,pr===ve&&(pr=0)),qi(e)}function og(e,i){i===0&&(i=pn()),e=ms(e,i),e!==null&&(Tn(e,i),qi(e))}function Gy(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),og(e,s)}function Vy(e,i){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(a(314))}o!==null&&o.delete(i),og(e,s)}function ky(e,i){return Zt(e,i)}var rc=null,vr=null,Jf=!1,oc=!1,$f=!1,Wa=0;function qi(e){e!==vr&&e.next===null&&(vr===null?rc=vr=e:vr=vr.next=e),oc=!0,Jf||(Jf=!0,qy())}function Fo(e,i){if(!$f&&oc){$f=!0;do for(var s=!1,o=rc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var y=o.suspendedLanes,b=o.pingedLanes;h=(1<<31-te(42|e)+1)-1,h&=u&~(y&~b),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,fg(o,h))}else h=ve,h=Lt(o,o===We?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||ee(o,h)||(s=!0,fg(o,h));o=o.next}while(s);$f=!1}}function Xy(){lg()}function lg(){oc=Jf=!1;var e=0;Wa!==0&&eS()&&(e=Wa);for(var i=pt(),s=null,o=rc;o!==null;){var u=o.next,h=cg(o,i);h===0?(o.next=null,s===null?rc=u:s.next=u,u===null&&(vr=s)):(s=o,(e!==0||(h&3)!==0)&&(oc=!0)),o=u}gn!==0&&gn!==5||Fo(e),Wa!==0&&(Wa=0)}function cg(e,i){for(var s=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-te(h),b=1<<y,I=u[y];I===-1?((b&s)===0||(b&o)!==0)&&(u[y]=Qe(b,i)):I<=i&&(e.expiredLanes|=b),h&=~b}if(i=We,s=ve,s=Lt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===i&&(Be===2||Be===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&N(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||ee(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(o!==null&&N(o),Xs(s)){case 2:case 8:s=Wt;break;case 32:s=Ut;break;case 268435456:s=_e;break;default:s=Ut}return o=ug.bind(null,e),s=Zt(s,o),e.callbackPriority=i,e.callbackNode=s,i}return o!==null&&o!==null&&N(o),e.callbackPriority=2,e.callbackNode=null,2}function ug(e,i){if(gn!==0&&gn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(sc()&&e.callbackNode!==s)return null;var o=ve;return o=Lt(e,e===We?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(q0(e,o,i),cg(e,pt()),e.callbackNode!=null&&e.callbackNode===s?ug.bind(null,e):null)}function fg(e,i){if(sc())return null;q0(e,i,!0)}function qy(){iS(function(){(Le&6)!==0?Zt(gt,Xy):lg()})}function th(){if(Wa===0){var e=ir;e===0&&(e=Rt,Rt<<=1,(Rt&261888)===0&&(Rt=256)),Wa=e}return Wa}function hg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ml(""+e)}function dg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function Wy(e,i,s,o,u){if(i==="submit"&&s&&s.stateNode===u){var h=hg((u[bn]||null).action),y=o.submitter;y&&(i=(i=y[bn]||null)?hg(i.formAction):y.getAttribute("formAction"),i!==null&&(h=i,y=null));var b=new xl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Wa!==0){var I=y?dg(u,y):new FormData(u);yf(s,{pending:!0,data:I,method:u.method,action:h},null,I)}}else typeof h=="function"&&(b.preventDefault(),I=y?dg(u,y):new FormData(u),yf(s,{pending:!0,data:I,method:u.method,action:h},h,I))},currentTarget:u}]})}}for(var eh=0;eh<zu.length;eh++){var nh=zu[eh],Yy=nh.toLowerCase(),jy=nh[0].toUpperCase()+nh.slice(1);Ui(Yy,"on"+jy)}Ui(Xp,"onAnimationEnd"),Ui(qp,"onAnimationIteration"),Ui(Wp,"onAnimationStart"),Ui("dblclick","onDoubleClick"),Ui("focusin","onFocus"),Ui("focusout","onBlur"),Ui(uy,"onTransitionRun"),Ui(fy,"onTransitionStart"),Ui(hy,"onTransitionCancel"),Ui(Yp,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$t("onBeforeInput",["compositionend","keypress","textInput","paste"]),$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ho));function pg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],u=o.event;o=o.listeners;t:{var h=void 0;if(i)for(var y=o.length-1;0<=y;y--){var b=o[y],I=b.instance,nt=b.currentTarget;if(b=b.listener,I!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=nt;try{h(u)}catch(dt){Ml(dt)}u.currentTarget=null,h=I}else for(y=0;y<o.length;y++){if(b=o[y],I=b.instance,nt=b.currentTarget,b=b.listener,I!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=nt;try{h(u)}catch(dt){Ml(dt)}u.currentTarget=null,h=I}}}}function me(e,i){var s=i[ro];s===void 0&&(s=i[ro]=new Set);var o=e+"__bubble";s.has(o)||(mg(i,e,2,!1),s.add(o))}function ih(e,i,s){var o=0;i&&(o|=4),mg(s,e,o,i)}var lc="_reactListening"+Math.random().toString(36).slice(2);function ah(e){if(!e[lc]){e[lc]=!0,kt.forEach(function(s){s!=="selectionchange"&&(Zy.has(s)||ih(s,!1,e),ih(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[lc]||(i[lc]=!0,ih("selectionchange",!1,i))}}function mg(e,i,s,o){switch(Xg(i)){case 2:var u=ES;break;case 8:u=TS;break;default:u=xh}s=u.bind(null,i,s,e),u=void 0,!Eu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,s,{capture:!0,passive:u}):e.addEventListener(i,s,!0):u!==void 0?e.addEventListener(i,s,{passive:u}):e.addEventListener(i,s,!1)}function sh(e,i,s,o,u){var h=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var b=o.stateNode.containerInfo;if(b===u)break;if(y===4)for(y=o.return;y!==null;){var I=y.tag;if((I===3||I===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;b!==null;){if(y=rt(b),y===null)return;if(I=y.tag,I===5||I===6||I===26||I===27){o=h=y;continue t}b=b.parentNode}}o=o.return}yp(function(){var nt=h,dt=Su(s),_t=[];t:{var it=jp.get(e);if(it!==void 0){var ct=xl,Ft=e;switch(e){case"keypress":if(_l(s)===0)break t;case"keydown":case"keyup":ct=Vx;break;case"focusin":Ft="focus",ct=Ru;break;case"focusout":Ft="blur",ct=Ru;break;case"beforeblur":case"afterblur":ct=Ru;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ct=Ep;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ct=Dx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ct=qx;break;case Xp:case qp:case Wp:ct=Nx;break;case Yp:ct=Yx;break;case"scroll":case"scrollend":ct=wx;break;case"wheel":ct=Zx;break;case"copy":case"cut":case"paste":ct=Px;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ct=bp;break;case"toggle":case"beforetoggle":ct=Qx}var Jt=(i&4)!==0,qe=!Jt&&(e==="scroll"||e==="scrollend"),Y=Jt?it!==null?it+"Capture":null:it;Jt=[];for(var G=nt,et;G!==null;){var mt=G;if(et=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||et===null||Y===null||(mt=oo(G,Y),mt!=null&&Jt.push(Go(G,mt,et))),qe)break;G=G.return}0<Jt.length&&(it=new ct(it,Ft,null,s,dt),_t.push({event:it,listeners:Jt}))}}if((i&7)===0){t:{if(it=e==="mouseover"||e==="pointerover",ct=e==="mouseout"||e==="pointerout",it&&s!==yu&&(Ft=s.relatedTarget||s.fromElement)&&(rt(Ft)||Ft[Zi]))break t;if((ct||it)&&(it=dt.window===dt?dt:(it=dt.ownerDocument)?it.defaultView||it.parentWindow:window,ct?(Ft=s.relatedTarget||s.toElement,ct=nt,Ft=Ft?rt(Ft):null,Ft!==null&&(qe=c(Ft),Jt=Ft.tag,Ft!==qe||Jt!==5&&Jt!==27&&Jt!==6)&&(Ft=null)):(ct=null,Ft=nt),ct!==Ft)){if(Jt=Ep,mt="onMouseLeave",Y="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=bp,mt="onPointerLeave",Y="onPointerEnter",G="pointer"),qe=ct==null?it:bt(ct),et=Ft==null?it:bt(Ft),it=new Jt(mt,G+"leave",ct,s,dt),it.target=qe,it.relatedTarget=et,mt=null,rt(dt)===nt&&(Jt=new Jt(Y,G+"enter",Ft,s,dt),Jt.target=et,Jt.relatedTarget=qe,mt=Jt),qe=mt,ct&&Ft)e:{for(Jt=Ky,Y=ct,G=Ft,et=0,mt=Y;mt;mt=Jt(mt))et++;mt=0;for(var jt=G;jt;jt=Jt(jt))mt++;for(;0<et-mt;)Y=Jt(Y),et--;for(;0<mt-et;)G=Jt(G),mt--;for(;et--;){if(Y===G||G!==null&&Y===G.alternate){Jt=Y;break e}Y=Jt(Y),G=Jt(G)}Jt=null}else Jt=null;ct!==null&&gg(_t,it,ct,Jt,!1),Ft!==null&&qe!==null&&gg(_t,qe,Ft,Jt,!0)}}t:{if(it=nt?bt(nt):window,ct=it.nodeName&&it.nodeName.toLowerCase(),ct==="select"||ct==="input"&&it.type==="file")var De=Np;else if(Up(it))if(Op)De=oy;else{De=sy;var qt=ay}else ct=it.nodeName,!ct||ct.toLowerCase()!=="input"||it.type!=="checkbox"&&it.type!=="radio"?nt&&xu(nt.elementType)&&(De=Np):De=ry;if(De&&(De=De(e,nt))){Lp(_t,De,s,dt);break t}qt&&qt(e,it,nt),e==="focusout"&&nt&&it.type==="number"&&nt.memoizedProps.value!=null&&mi(it,"number",it.value)}switch(qt=nt?bt(nt):window,e){case"focusin":(Up(qt)||qt.contentEditable==="true")&&(Zs=qt,Nu=nt,go=null);break;case"focusout":go=Nu=Zs=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,Vp(_t,s,dt);break;case"selectionchange":if(cy)break;case"keydown":case"keyup":Vp(_t,s,dt)}var le;if(Cu)t:{switch(e){case"compositionstart":var xe="onCompositionStart";break t;case"compositionend":xe="onCompositionEnd";break t;case"compositionupdate":xe="onCompositionUpdate";break t}xe=void 0}else js?Cp(e,s)&&(xe="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(xe="onCompositionStart");xe&&(Ap&&s.locale!=="ko"&&(js||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&js&&(le=Sp()):(Da=dt,Tu="value"in Da?Da.value:Da.textContent,js=!0)),qt=cc(nt,xe),0<qt.length&&(xe=new Tp(xe,e,null,s,dt),_t.push({event:xe,listeners:qt}),le?xe.data=le:(le=Dp(s),le!==null&&(xe.data=le)))),(le=$x?ty(e,s):ey(e,s))&&(xe=cc(nt,"onBeforeInput"),0<xe.length&&(qt=new Tp("onBeforeInput","beforeinput",null,s,dt),_t.push({event:qt,listeners:xe}),qt.data=le)),Wy(_t,e,nt,s,dt)}pg(_t,i)})}function Go(e,i,s){return{instance:e,listener:i,currentTarget:s}}function cc(e,i){for(var s=i+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=oo(e,s),u!=null&&o.unshift(Go(e,u,h)),u=oo(e,i),u!=null&&o.push(Go(e,u,h))),e.tag===3)return o;e=e.return}return[]}function Ky(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function gg(e,i,s,o,u){for(var h=i._reactName,y=[];s!==null&&s!==o;){var b=s,I=b.alternate,nt=b.stateNode;if(b=b.tag,I!==null&&I===o)break;b!==5&&b!==26&&b!==27||nt===null||(I=nt,u?(nt=oo(s,h),nt!=null&&y.unshift(Go(s,nt,I))):u||(nt=oo(s,h),nt!=null&&y.push(Go(s,nt,I)))),s=s.return}y.length!==0&&e.push({event:i,listeners:y})}var Qy=/\r\n?/g,Jy=/\u0000|\uFFFD/g;function _g(e){return(typeof e=="string"?e:""+e).replace(Qy,`
`).replace(Jy,"")}function vg(e,i){return i=_g(i),_g(e)===i}function Xe(e,i,s,o,u,h){switch(s){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||qs(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&qs(e,""+o);break;case"className":Xt(e,"class",o);break;case"tabIndex":Xt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,s,o);break;case"style":vp(e,o,h);break;case"data":if(i!=="object"){Xt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=ml(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(i!=="input"&&Xe(e,i,"name",u.name,u,null),Xe(e,i,"formEncType",u.formEncType,u,null),Xe(e,i,"formMethod",u.formMethod,u,null),Xe(e,i,"formTarget",u.formTarget,u,null)):(Xe(e,i,"encType",u.encType,u,null),Xe(e,i,"method",u.method,u,null),Xe(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=ml(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=ml(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":me("beforetoggle",e),me("toggle",e),Se(e,"popover",o);break;case"xlinkActuate":mn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":mn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":mn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":mn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":mn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":mn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":mn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":mn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":mn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Se(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=Ax.get(s)||s,Se(e,s,o))}}function rh(e,i,s,o,u,h){switch(s){case"style":vp(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof o=="string"?qs(e,o):(typeof o=="number"||typeof o=="bigint")&&qs(e,""+o);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ne.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),h=e[bn]||null,h=h!=null?h[s]:null,typeof h=="function"&&e.removeEventListener(i,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,o,u);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):Se(e,s,o)}}}function Dn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var o=!1,u=!1,h;for(h in s)if(s.hasOwnProperty(h)){var y=s[h];if(y!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Xe(e,i,h,y,s,null)}}u&&Xe(e,i,"srcSet",s.srcSet,s,null),o&&Xe(e,i,"src",s.src,s,null);return;case"input":me("invalid",e);var b=h=y=u=null,I=null,nt=null;for(o in s)if(s.hasOwnProperty(o)){var dt=s[o];if(dt!=null)switch(o){case"name":u=dt;break;case"type":y=dt;break;case"checked":I=dt;break;case"defaultChecked":nt=dt;break;case"value":h=dt;break;case"defaultValue":b=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(a(137,i));break;default:Xe(e,i,o,dt,s,null)}}Di(e,h,b,I,nt,y,u,!1);return;case"select":me("invalid",e),o=y=h=null;for(u in s)if(s.hasOwnProperty(u)&&(b=s[u],b!=null))switch(u){case"value":h=b;break;case"defaultValue":y=b;break;case"multiple":o=b;default:Xe(e,i,u,b,s,null)}i=h,s=y,e.multiple=!!o,i!=null?Ki(e,!!o,i,!1):s!=null&&Ki(e,!!o,s,!0);return;case"textarea":me("invalid",e),h=u=o=null;for(y in s)if(s.hasOwnProperty(y)&&(b=s[y],b!=null))switch(y){case"value":o=b;break;case"defaultValue":u=b;break;case"children":h=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(a(91));break;default:Xe(e,i,y,b,s,null)}gp(e,o,u,h);return;case"option":for(I in s)if(s.hasOwnProperty(I)&&(o=s[I],o!=null))switch(I){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Xe(e,i,I,o,s,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(o=0;o<Ho.length;o++)me(Ho[o],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(nt in s)if(s.hasOwnProperty(nt)&&(o=s[nt],o!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Xe(e,i,nt,o,s,null)}return;default:if(xu(i)){for(dt in s)s.hasOwnProperty(dt)&&(o=s[dt],o!==void 0&&rh(e,i,dt,o,s,void 0));return}}for(b in s)s.hasOwnProperty(b)&&(o=s[b],o!=null&&Xe(e,i,b,o,s,null))}function $y(e,i,s,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,y=null,b=null,I=null,nt=null,dt=null;for(ct in s){var _t=s[ct];if(s.hasOwnProperty(ct)&&_t!=null)switch(ct){case"checked":break;case"value":break;case"defaultValue":I=_t;default:o.hasOwnProperty(ct)||Xe(e,i,ct,null,o,_t)}}for(var it in o){var ct=o[it];if(_t=s[it],o.hasOwnProperty(it)&&(ct!=null||_t!=null))switch(it){case"type":h=ct;break;case"name":u=ct;break;case"checked":nt=ct;break;case"defaultChecked":dt=ct;break;case"value":y=ct;break;case"defaultValue":b=ct;break;case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(a(137,i));break;default:ct!==_t&&Xe(e,i,it,ct,o,_t)}}Pn(e,y,b,I,nt,dt,h,u);return;case"select":ct=y=b=it=null;for(h in s)if(I=s[h],s.hasOwnProperty(h)&&I!=null)switch(h){case"value":break;case"multiple":ct=I;default:o.hasOwnProperty(h)||Xe(e,i,h,null,o,I)}for(u in o)if(h=o[u],I=s[u],o.hasOwnProperty(u)&&(h!=null||I!=null))switch(u){case"value":it=h;break;case"defaultValue":b=h;break;case"multiple":y=h;default:h!==I&&Xe(e,i,u,h,o,I)}i=b,s=y,o=ct,it!=null?Ki(e,!!s,it,!1):!!o!=!!s&&(i!=null?Ki(e,!!s,i,!0):Ki(e,!!s,s?[]:"",!1));return;case"textarea":ct=it=null;for(b in s)if(u=s[b],s.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Xe(e,i,b,null,o,u)}for(y in o)if(u=o[y],h=s[y],o.hasOwnProperty(y)&&(u!=null||h!=null))switch(y){case"value":it=u;break;case"defaultValue":ct=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==h&&Xe(e,i,y,u,o,h)}mp(e,it,ct);return;case"option":for(var Ft in s)if(it=s[Ft],s.hasOwnProperty(Ft)&&it!=null&&!o.hasOwnProperty(Ft))switch(Ft){case"selected":e.selected=!1;break;default:Xe(e,i,Ft,null,o,it)}for(I in o)if(it=o[I],ct=s[I],o.hasOwnProperty(I)&&it!==ct&&(it!=null||ct!=null))switch(I){case"selected":e.selected=it&&typeof it!="function"&&typeof it!="symbol";break;default:Xe(e,i,I,it,o,ct)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in s)it=s[Jt],s.hasOwnProperty(Jt)&&it!=null&&!o.hasOwnProperty(Jt)&&Xe(e,i,Jt,null,o,it);for(nt in o)if(it=o[nt],ct=s[nt],o.hasOwnProperty(nt)&&it!==ct&&(it!=null||ct!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":if(it!=null)throw Error(a(137,i));break;default:Xe(e,i,nt,it,o,ct)}return;default:if(xu(i)){for(var qe in s)it=s[qe],s.hasOwnProperty(qe)&&it!==void 0&&!o.hasOwnProperty(qe)&&rh(e,i,qe,void 0,o,it);for(dt in o)it=o[dt],ct=s[dt],!o.hasOwnProperty(dt)||it===ct||it===void 0&&ct===void 0||rh(e,i,dt,it,o,ct);return}}for(var Y in s)it=s[Y],s.hasOwnProperty(Y)&&it!=null&&!o.hasOwnProperty(Y)&&Xe(e,i,Y,null,o,it);for(_t in o)it=o[_t],ct=s[_t],!o.hasOwnProperty(_t)||it===ct||it==null&&ct==null||Xe(e,i,_t,it,o,ct)}function xg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function tS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var u=s[o],h=u.transferSize,y=u.initiatorType,b=u.duration;if(h&&b&&xg(y)){for(y=0,b=u.responseEnd,o+=1;o<s.length;o++){var I=s[o],nt=I.startTime;if(nt>b)break;var dt=I.transferSize,_t=I.initiatorType;dt&&xg(_t)&&(I=I.responseEnd,y+=dt*(I<b?1:(b-nt)/(I-nt)))}if(--o,i+=8*(h+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var oh=null,lh=null;function uc(e){return e.nodeType===9?e:e.ownerDocument}function yg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Sg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function ch(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var uh=null;function eS(){var e=window.event;return e&&e.type==="popstate"?e===uh?!1:(uh=e,!0):(uh=null,!1)}var Mg=typeof setTimeout=="function"?setTimeout:void 0,nS=typeof clearTimeout=="function"?clearTimeout:void 0,Eg=typeof Promise=="function"?Promise:void 0,iS=typeof queueMicrotask=="function"?queueMicrotask:typeof Eg<"u"?function(e){return Eg.resolve(null).then(e).catch(aS)}:Mg;function aS(e){setTimeout(function(){throw e})}function Ya(e){return e==="head"}function Tg(e,i){var s=i,o=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(u),Mr(i);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")Vo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Vo(s);for(var h=s.firstChild;h;){var y=h.nextSibling,b=h.nodeName;h[k]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=y}}else s==="body"&&Vo(e.ownerDocument.body);s=u}while(s);Mr(i)}function bg(e,i){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function fh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":fh(s),ot(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function sS(e,i,s,o){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[k])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Mi(e.nextSibling),e===null)break}return null}function rS(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Mi(e.nextSibling),e===null))return null;return e}function Ag(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Mi(e.nextSibling),e===null))return null;return e}function hh(e){return e.data==="$?"||e.data==="$~"}function dh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function oS(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var o=function(){i(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Mi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var ph=null;function Rg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Mi(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function wg(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function Cg(e,i,s){switch(i=uc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Vo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);ot(e)}var Ei=new Map,Dg=new Set;function fc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var da=Q.d;Q.d={f:lS,r:cS,D:uS,C:fS,L:hS,m:dS,X:mS,S:pS,M:gS};function lS(){var e=da.f(),i=nc();return e||i}function cS(e){var i=X(e);i!==null&&i.tag===5&&i.type==="form"?Ym(i):da.r(e)}var xr=typeof document>"u"?null:document;function Ug(e,i,s){var o=xr;if(o&&typeof i=="string"&&i){var u=Sn(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),Dg.has(u)||(Dg.add(u),e={rel:e,crossOrigin:s,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Dn(i,"link",e),Dt(i),o.head.appendChild(i)))}}function uS(e){da.D(e),Ug("dns-prefetch",e,null)}function fS(e,i){da.C(e,i),Ug("preconnect",e,i)}function hS(e,i,s){da.L(e,i,s);var o=xr;if(o&&e&&i){var u='link[rel="preload"][as="'+Sn(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+Sn(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+Sn(s.imageSizes)+'"]')):u+='[href="'+Sn(e)+'"]';var h=u;switch(i){case"style":h=yr(e);break;case"script":h=Sr(e)}Ei.has(h)||(e=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ei.set(h,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(ko(h))||i==="script"&&o.querySelector(Xo(h))||(i=o.createElement("link"),Dn(i,"link",e),Dt(i),o.head.appendChild(i)))}}function dS(e,i){da.m(e,i);var s=xr;if(s&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+Sn(o)+'"][href="'+Sn(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Sr(e)}if(!Ei.has(h)&&(e=_({rel:"modulepreload",href:e},i),Ei.set(h,e),s.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Xo(h)))return}o=s.createElement("link"),Dn(o,"link",e),Dt(o),s.head.appendChild(o)}}}function pS(e,i,s){da.S(e,i,s);var o=xr;if(o&&e){var u=Ct(o).hoistableStyles,h=yr(e);i=i||"default";var y=u.get(h);if(!y){var b={loading:0,preload:null};if(y=o.querySelector(ko(h)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ei.get(h))&&mh(e,s);var I=y=o.createElement("link");Dt(I),Dn(I,"link",e),I._p=new Promise(function(nt,dt){I.onload=nt,I.onerror=dt}),I.addEventListener("load",function(){b.loading|=1}),I.addEventListener("error",function(){b.loading|=2}),b.loading|=4,hc(y,i,o)}y={type:"stylesheet",instance:y,count:1,state:b},u.set(h,y)}}}function mS(e,i){da.X(e,i);var s=xr;if(s&&e){var o=Ct(s).hoistableScripts,u=Sr(e),h=o.get(u);h||(h=s.querySelector(Xo(u)),h||(e=_({src:e,async:!0},i),(i=Ei.get(u))&&gh(e,i),h=s.createElement("script"),Dt(h),Dn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function gS(e,i){da.M(e,i);var s=xr;if(s&&e){var o=Ct(s).hoistableScripts,u=Sr(e),h=o.get(u);h||(h=s.querySelector(Xo(u)),h||(e=_({src:e,async:!0,type:"module"},i),(i=Ei.get(u))&&gh(e,i),h=s.createElement("script"),Dt(h),Dn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Lg(e,i,s,o){var u=(u=Et.current)?fc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=yr(s.href),s=Ct(u).hoistableStyles,o=s.get(i),o||(o={type:"style",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=yr(s.href);var h=Ct(u).hoistableStyles,y=h.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=u.querySelector(ko(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Ei.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ei.set(e,s),h||_S(u,e,s,y.state))),i&&o===null)throw Error(a(528,""));return y}if(i&&o!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Sr(s),s=Ct(u).hoistableScripts,o=s.get(i),o||(o={type:"script",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function yr(e){return'href="'+Sn(e)+'"'}function ko(e){return'link[rel="stylesheet"]['+e+"]"}function Ng(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function _S(e,i,s,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Dn(i,"link",s),Dt(i),e.head.appendChild(i))}function Sr(e){return'[src="'+Sn(e)+'"]'}function Xo(e){return"script[async]"+e}function Og(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+Sn(s.href)+'"]');if(o)return i.instance=o,Dt(o),o;var u=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Dt(o),Dn(o,"style",u),hc(o,s.precedence,e),i.instance=o;case"stylesheet":u=yr(s.href);var h=e.querySelector(ko(u));if(h)return i.state.loading|=4,i.instance=h,Dt(h),h;o=Ng(s),(u=Ei.get(u))&&mh(o,u),h=(e.ownerDocument||e).createElement("link"),Dt(h);var y=h;return y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Dn(h,"link",o),i.state.loading|=4,hc(h,s.precedence,e),i.instance=h;case"script":return h=Sr(s.src),(u=e.querySelector(Xo(h)))?(i.instance=u,Dt(u),u):(o=s,(u=Ei.get(h))&&(o=_({},s),gh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Dt(u),Dn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,hc(o,s.precedence,e));return i.instance}function hc(e,i,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,y=0;y<o.length;y++){var b=o[y];if(b.dataset.precedence===i)h=b;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function mh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function gh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var dc=null;function Pg(e,i,s){if(dc===null){var o=new Map,u=dc=new Map;u.set(s,o)}else u=dc,o=u.get(s),o||(o=new Map,u.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var h=s[u];if(!(h[k]||h[tn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(i)||"";y=e+y;var b=o.get(y);b?b.push(h):o.set(y,[h])}}return o}function zg(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function vS(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Bg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function xS(e,i,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=yr(o.href),h=i.querySelector(ko(u));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=pc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=h,Dt(h);return}h=i.ownerDocument||i,o=Ng(o),(u=Ei.get(u))&&mh(o,u),h=h.createElement("link"),Dt(h);var y=h;y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Dn(h,"link",o),s.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=pc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var _h=0;function yS(e,i){return e.stylesheets&&e.count===0&&gc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+i);0<e.imgBytes&&_h===0&&(_h=62500*tS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>_h?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function pc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)gc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var mc=null;function gc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,mc=new Map,i.forEach(SS,e),mc=null,pc.call(e))}function SS(e,i){if(!(i.state.loading&4)){var s=mc.get(e);if(s)var o=s.get(null);else{s=new Map,mc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var y=u[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),o=y)}o&&s.set(null,o)}u=i.instance,y=u.getAttribute("data-precedence"),h=s.get(y)||o,h===o&&s.set(null,u),s.set(y,u),this.count++,o=pc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var qo={$$typeof:D,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function MS(e,i,s,o,u,h,y,b,I){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Re(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Re(0),this.hiddenUpdates=Re(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=I,this.incompleteTransitions=new Map}function Ig(e,i,s,o,u,h,y,b,I,nt,dt,_t){return e=new MS(e,i,s,y,I,nt,dt,_t,b),i=1,h===!0&&(i|=24),h=ii(3,null,null,i),e.current=h,h.stateNode=e,i=Zu(),i.refCount++,e.pooledCache=i,i.refCount++,h.memoizedState={element:o,isDehydrated:s,cache:i},$u(h),e}function Fg(e){return e?(e=Js,e):Js}function Hg(e,i,s,o,u,h){u=Fg(u),o.context===null?o.context=u:o.pendingContext=u,o=za(i),o.payload={element:s},h=h===void 0?null:h,h!==null&&(o.callback=h),s=Ba(e,o,i),s!==null&&(Kn(s,e,i),Eo(s,e,i))}function Gg(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function vh(e,i){Gg(e,i),(e=e.alternate)&&Gg(e,i)}function Vg(e){if(e.tag===13||e.tag===31){var i=ms(e,67108864);i!==null&&Kn(i,e,67108864),vh(e,67108864)}}function kg(e){if(e.tag===13||e.tag===31){var i=li();i=us(i);var s=ms(e,i);s!==null&&Kn(s,e,i),vh(e,i)}}var _c=!0;function ES(e,i,s,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=2,xh(e,i,s,o)}finally{Q.p=h,z.T=u}}function TS(e,i,s,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=8,xh(e,i,s,o)}finally{Q.p=h,z.T=u}}function xh(e,i,s,o){if(_c){var u=yh(o);if(u===null)sh(e,i,o,vc,s),qg(e,o);else if(AS(u,e,i,s,o))o.stopPropagation();else if(qg(e,o),i&4&&-1<bS.indexOf(e)){for(;u!==null;){var h=X(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=wt(h.pendingLanes);if(y!==0){var b=h;for(b.pendingLanes|=2,b.entangledLanes|=2;y;){var I=1<<31-te(y);b.entanglements[1]|=I,y&=~I}qi(h),(Le&6)===0&&(tc=pt()+500,Fo(0))}}break;case 31:case 13:b=ms(h,2),b!==null&&Kn(b,h,2),nc(),vh(h,2)}if(h=yh(o),h===null&&sh(e,i,o,vc,s),h===u)break;u=h}u!==null&&o.stopPropagation()}else sh(e,i,o,null,s)}}function yh(e){return e=Su(e),Sh(e)}var vc=null;function Sh(e){if(vc=null,e=rt(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=f(i),e!==null)return e;e=null}else if(s===31){if(e=d(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return vc=e,null}function Xg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case gt:return 2;case Wt:return 8;case Ut:case zt:return 32;case _e:return 268435456;default:return 32}default:return 32}}var Mh=!1,ja=null,Za=null,Ka=null,Wo=new Map,Yo=new Map,Qa=[],bS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function qg(e,i){switch(e){case"focusin":case"focusout":ja=null;break;case"dragenter":case"dragleave":Za=null;break;case"mouseover":case"mouseout":Ka=null;break;case"pointerover":case"pointerout":Wo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yo.delete(i.pointerId)}}function jo(e,i,s,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:i,domEventName:s,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},i!==null&&(i=X(i),i!==null&&Vg(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function AS(e,i,s,o,u){switch(i){case"focusin":return ja=jo(ja,e,i,s,o,u),!0;case"dragenter":return Za=jo(Za,e,i,s,o,u),!0;case"mouseover":return Ka=jo(Ka,e,i,s,o,u),!0;case"pointerover":var h=u.pointerId;return Wo.set(h,jo(Wo.get(h)||null,e,i,s,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Yo.set(h,jo(Yo.get(h)||null,e,i,s,o,u)),!0}return!1}function Wg(e){var i=rt(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=f(s),i!==null){e.blockedOn=i,fs(e.priority,function(){kg(s)});return}}else if(i===31){if(i=d(s),i!==null){e.blockedOn=i,fs(e.priority,function(){kg(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=yh(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);yu=o,s.target.dispatchEvent(o),yu=null}else return i=X(s),i!==null&&Vg(i),e.blockedOn=s,!1;i.shift()}return!0}function Yg(e,i,s){xc(e)&&s.delete(i)}function RS(){Mh=!1,ja!==null&&xc(ja)&&(ja=null),Za!==null&&xc(Za)&&(Za=null),Ka!==null&&xc(Ka)&&(Ka=null),Wo.forEach(Yg),Yo.forEach(Yg)}function yc(e,i){e.blockedOn===i&&(e.blockedOn=null,Mh||(Mh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,RS)))}var Sc=null;function jg(e){Sc!==e&&(Sc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Sc===e&&(Sc=null);for(var i=0;i<e.length;i+=3){var s=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(Sh(o||s)===null)continue;break}var h=X(s);h!==null&&(e.splice(i,3),i-=3,yf(h,{pending:!0,data:u,method:s.method,action:o},o,u))}}))}function Mr(e){function i(I){return yc(I,e)}ja!==null&&yc(ja,e),Za!==null&&yc(Za,e),Ka!==null&&yc(Ka,e),Wo.forEach(i),Yo.forEach(i);for(var s=0;s<Qa.length;s++){var o=Qa[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Qa.length&&(s=Qa[0],s.blockedOn===null);)Wg(s),s.blockedOn===null&&Qa.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var u=s[o],h=s[o+1],y=u[bn]||null;if(typeof h=="function")y||jg(s);else if(y){var b=null;if(h&&h.hasAttribute("formAction")){if(u=h,y=h[bn]||null)b=y.formAction;else if(Sh(u)!==null)continue}else b=y.action;typeof b=="function"?s[o+1]=b:(s.splice(o,3),o-=3),jg(s)}}}function Zg(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function Eh(e){this._internalRoot=e}Mc.prototype.render=Eh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,o=li();Hg(s,o,e,i,null,null)},Mc.prototype.unmount=Eh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;Hg(e.current,2,null,e,null,null),nc(),i[Zi]=null}};function Mc(e){this._internalRoot=e}Mc.prototype.unstable_scheduleHydration=function(e){if(e){var i=so();e={blockedOn:null,target:e,priority:i};for(var s=0;s<Qa.length&&i!==0&&i<Qa[s].priority;s++);Qa.splice(s,0,e),s===0&&Wg(e)}};var Kg=t.version;if(Kg!=="19.2.8")throw Error(a(527,Kg,"19.2.8"));Q.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=p(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var wS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ec.isDisabled&&Ec.supportsFiber)try{Kt=Ec.inject(wS),Yt=Ec}catch{}}return Ko.createRoot=function(e,i){if(!l(e))throw Error(a(299));var s=!1,o="",u=i0,h=a0,y=s0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=Ig(e,1,!1,null,null,s,o,null,u,h,y,Zg),e[Zi]=i.current,ah(e),new Eh(i)},Ko.hydrateRoot=function(e,i,s){if(!l(e))throw Error(a(299));var o=!1,u="",h=i0,y=a0,b=s0,I=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(b=s.onRecoverableError),s.formState!==void 0&&(I=s.formState)),i=Ig(e,1,!0,i,s??null,o,u,I,h,y,b,Zg),i.context=Fg(null),s=i.current,o=li(),o=us(o),u=za(o),u.callback=null,Ba(s,u,o),s=o,i.current.lanes=s,Tn(i,s),qi(i),e[Zi]=i.current,ah(e),new Mc(i)},Ko.version="19.2.8",Ko}var r_;function HS(){if(r_)return Ah.exports;r_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ah.exports=FS(),Ah.exports}var GS=HS();const VS=Nv(GS),o_=r=>{let t;const n=new Set,a=(p,g)=>{const _=typeof p=="function"?p(t):p;if(!Object.is(_,t)){const x=t;t=g??(typeof _!="object"||_===null)?_:Object.assign({},t,_),n.forEach(M=>M(t,x))}},l=()=>t,d={setState:a,getState:l,getInitialState:()=>m,subscribe:p=>(n.add(p),()=>n.delete(p))},m=t=r(a,l,d);return d},kS=(r=>r?o_(r):o_),XS=r=>r;function qS(r,t=XS){const n=al.useSyncExternalStore(r.subscribe,al.useCallback(()=>t(r.getState()),[r,t]),al.useCallback(()=>t(r.getInitialState()),[r,t]));return al.useDebugValue(n),n}const l_=r=>{const t=kS(r),n=a=>qS(t,a);return Object.assign(n,t),n},WS=(r=>r?l_(r):l_),Dh=1/60,c_=100,u_=100,YS=35,jS=100,ZS=20,KS=1.5,$a=200,Er=60,QS=5,f_=1.5,JS=3,$S=2,h_=30,Uh=200,d_=60,Lh=150,tM=.9,p_=3.5,m_=2.2,Nh=15,g_=8,eM=4,nM=10,iM=2,Oh=4,aM=.3,sM=2.5,rM=.4,__={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,bossFight:!1,bossName:""};function v_(r){return{id:r,pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0},hp:c_,maxHp:c_,energy:u_,maxEnergy:u_,speed:ZS,weapon:1,weapons:[1,2,3],specialGauge:0,maxSpecialGauge:jS,invulnTimer:0,alive:!0,score:0,kills:0,combo:0}}function x_(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:.5,aimY:.5,weaponSwitch:0,boost:!1,brake:!1,dodge:!1,special:!1,lockToggle:!1,pause:!1}}const _n=WS(r=>({game:{...__},players:[v_(0)],inputs:[x_()],setGame:t=>r(n=>({game:{...n.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),resetGame:()=>r({game:{...__},players:[v_(0)],inputs:[x_()]})})),Ph=({size:r=80,opacity:t=.5})=>tt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[tt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),tt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),y_=()=>{const r=_n(t=>t.setGame);return tt.jsxs("div",{className:"lancer-bg w-full h-full relative overflow-hidden flex items-center justify-center",children:[tt.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:tt.jsx(Ph,{size:520,opacity:.07})}),tt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.04]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px",backgroundRepeat:"repeat"}}),tt.jsxs("div",{className:"relative z-10 mx-auto w-[480px] max-w-[92vw] lancer-frame px-6 py-6",children:[tt.jsxs("div",{className:"flex items-start gap-4",children:[tt.jsxs("div",{className:"flex-1",children:[tt.jsxs("div",{className:"text-[12px] tracking-[0.4em] mb-1",style:{color:"#ffffff"},children:[tt.jsx("span",{style:{color:"#ff3030"},children:"下"}),tt.jsx("span",{style:{color:"#ffffff"},children:" 一 "}),tt.jsx("span",{style:{color:"#ff3030"},children:"战"}),tt.jsx("span",{style:{color:"#ffffff"},children:" 高 达"})]}),tt.jsx("h1",{className:"font-pixel-title leading-none",style:{color:"#6a7fff",fontSize:"44px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff",letterSpacing:"0.04em"},children:"纯白枪骑兵"}),tt.jsx("div",{className:"mt-1 text-[11px] tracking-[0.3em]",style:{color:"#8fa4ff"},children:"SILVER LANCER"})]}),tt.jsx("div",{className:"mt-1",children:tt.jsx(Ph,{size:56,opacity:.7})})]}),tt.jsxs("div",{className:"mt-6 border-t border-lancer-blue/40 pt-4 space-y-2",children:[tt.jsx("button",{onClick:()=>r({screen:"pve",gameMode:"pve"}),className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"开始游戏"}),tt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"操作指南"}),tt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"游戏设置"}),tt.jsx("button",{className:"lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default",disabled:!0,style:{borderColor:"rgba(106,127,255,0.4)"},children:"游戏信息"})]}),tt.jsx("div",{className:"mt-5 flex items-end justify-between",children:tt.jsxs("div",{className:"text-center flex-1",children:[tt.jsx(Ph,{size:42,opacity:.85}),tt.jsx("div",{className:"text-[11px] tracking-[0.25em] mt-1",style:{color:"#ffffff"},children:"PHIXCAT"}),tt.jsx("div",{className:"text-[8px] tracking-wider mt-1",style:{color:"rgba(255,255,255,0.5)"},children:"FLASH 3D ENGINE TEST BUILD · Silver Lancer V 0.79"}),tt.jsx("div",{className:"text-[8px] tracking-wider",style:{color:"rgba(255,255,255,0.5)"},children:"Copyrights 2007—2008 phixcat All rights reserved"})]})})]}),tt.jsx("div",{className:"hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none",children:tt.jsxs("svg",{viewBox:"0 0 200 280",width:"280",height:"380",fill:"#ffffff",children:[tt.jsx("polygon",{points:"80,30 120,30 130,55 70,55"}),tt.jsx("rect",{x:"70",y:"55",width:"60",height:"25"}),tt.jsx("polygon",{points:"30,75 70,80 70,130 25,130"}),tt.jsx("polygon",{points:"130,80 170,75 175,130 130,130"}),tt.jsx("rect",{x:"55",y:"80",width:"90",height:"90"}),tt.jsx("polygon",{points:"80,90 120,90 100,140",fill:"#000"}),tt.jsx("rect",{x:"20",y:"130",width:"40",height:"80"}),tt.jsx("rect",{x:"140",y:"130",width:"40",height:"80"}),tt.jsx("polygon",{points:"60,170 140,170 150,210 50,210"}),tt.jsx("polygon",{points:"55,210 95,210 90,275 60,275"}),tt.jsx("polygon",{points:"105,210 145,210 140,275 110,275"})]})})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ap="170",oM=0,S_=1,lM=2,Ov=1,cM=2,ya=3,ls=0,ei=1,Sa=2,Ta=0,kr=1,M_=2,E_=3,T_=4,uM=5,Bs=100,fM=101,hM=102,dM=103,pM=104,mM=200,gM=201,_M=202,vM=203,md=204,gd=205,xM=206,yM=207,SM=208,MM=209,EM=210,TM=211,bM=212,AM=213,RM=214,_d=0,vd=1,xd=2,Wr=3,yd=4,Sd=5,Md=6,Ed=7,Pv=0,wM=1,CM=2,os=0,zv=1,Bv=2,Iv=3,Fv=4,DM=5,Hv=6,Gv=7,Vv=300,Yr=301,jr=302,Td=303,bd=304,du=306,ol=1e3,Fs=1001,Ad=1002,Fi=1003,UM=1004,Tc=1005,ji=1006,zh=1007,Hs=1008,Aa=1009,kv=1010,Xv=1011,ll=1012,sp=1013,ks=1014,Ma=1015,Jr=1016,rp=1017,op=1018,Zr=1020,qv=35902,Wv=1021,Yv=1022,Ii=1023,jv=1024,Zv=1025,Xr=1026,Kr=1027,Kv=1028,lp=1029,Qv=1030,cp=1031,up=1033,tu=33776,eu=33777,nu=33778,iu=33779,Rd=35840,wd=35841,Cd=35842,Dd=35843,Ud=36196,Ld=37492,Nd=37496,Od=37808,Pd=37809,zd=37810,Bd=37811,Id=37812,Fd=37813,Hd=37814,Gd=37815,Vd=37816,kd=37817,Xd=37818,qd=37819,Wd=37820,Yd=37821,au=36492,jd=36494,Zd=36495,Jv=36283,Kd=36284,Qd=36285,Jd=36286,LM=3200,NM=3201,OM=0,PM=1,rs="",hi="srgb",$r="srgb-linear",pu="linear",Fe="srgb",Tr=7680,b_=519,zM=512,BM=513,IM=514,$v=515,FM=516,HM=517,GM=518,VM=519,A_=35044,R_="300 es",Ea=2e3,ou=2001;class to{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const a=this._listeners;return a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const a=this._listeners[t.type];if(a!==void 0){t.target=this;const l=a.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bh=Math.PI/180,$d=180/Math.PI;function cl(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[n&63|128]+Bn[n>>8&255]+"-"+Bn[n>>16&255]+Bn[n>>24&255]+Bn[a&255]+Bn[a>>8&255]+Bn[a>>16&255]+Bn[a>>24&255]).toLowerCase()}function ti(r,t,n){return Math.max(t,Math.min(n,r))}function kM(r,t){return(r%t+t)%t}function Ih(r,t,n){return(1-n)*r+n*t}function Qo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Qn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Ce{constructor(t=0,n=0){Ce.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,l=t.elements;return this.x=l[0]*n+l[3]*a+l[6],this.y=l[1]*n+l[4]*a+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ti(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*a-f*l+t.x,this.y=c*l+f*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,n,a,l,c,f,d,m,p){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,d,m,p)}set(t,n,a,l,c,f,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=n,g[4]=c,g[5]=m,g[6]=a,g[7]=f,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],d=a[3],m=a[6],p=a[1],g=a[4],_=a[7],x=a[2],M=a[5],E=a[8],T=l[0],S=l[3],v=l[6],L=l[1],D=l[4],w=l[7],W=l[2],F=l[5],O=l[8];return c[0]=f*T+d*L+m*W,c[3]=f*S+d*D+m*F,c[6]=f*v+d*w+m*O,c[1]=p*T+g*L+_*W,c[4]=p*S+g*D+_*F,c[7]=p*v+g*w+_*O,c[2]=x*T+M*L+E*W,c[5]=x*S+M*D+E*F,c[8]=x*v+M*w+E*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return n*f*g-n*d*p-a*c*g+a*d*m+l*c*p-l*f*m}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=g*f-d*p,x=d*m-g*c,M=p*c-f*m,E=n*_+a*x+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=_*T,t[1]=(l*p-g*a)*T,t[2]=(d*a-l*f)*T,t[3]=x*T,t[4]=(g*n-l*m)*T,t[5]=(l*c-d*n)*T,t[6]=M*T,t[7]=(a*m-p*n)*T,t[8]=(f*n-a*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,l,c,f,d){const m=Math.cos(c),p=Math.sin(c);return this.set(a*m,a*p,-a*(m*f+p*d)+f+t,-l*p,l*m,-l*(-p*f+m*d)+d+n,0,0,1),this}scale(t,n){return this.premultiply(Fh.makeScale(t,n)),this}rotate(t){return this.premultiply(Fh.makeRotation(-t)),this}translate(t,n){return this.premultiply(Fh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<9;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fh=new ce;function tx(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function lu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function XM(){const r=lu("canvas");return r.style.display="block",r}const w_={};function sl(r){r in w_||(w_[r]=!0,console.warn(r))}function qM(r,t,n){return new Promise(function(a,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}function WM(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function YM(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ae={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(r,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===Fe&&(r.r=ba(r.r),r.g=ba(r.g),r.b=ba(r.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Fe&&(r.r=qr(r.r),r.g=qr(r.g),r.b=qr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===rs?pu:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,n){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function ba(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function qr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const C_=[.64,.33,.3,.6,.15,.06],D_=[.2126,.7152,.0722],U_=[.3127,.329],L_=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),N_=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ae.define({[$r]:{primaries:C_,whitePoint:U_,transfer:pu,toXYZ:L_,fromXYZ:N_,luminanceCoefficients:D_,workingColorSpaceConfig:{unpackColorSpace:hi},outputColorSpaceConfig:{drawingBufferColorSpace:hi}},[hi]:{primaries:C_,whitePoint:U_,transfer:Fe,toXYZ:L_,fromXYZ:N_,luminanceCoefficients:D_,outputColorSpaceConfig:{drawingBufferColorSpace:hi}}});let br;class jM{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{br===void 0&&(br=lu("canvas")),br.width=t.width,br.height=t.height;const a=br.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),n=br}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=lu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const l=a.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=ba(c[f]/255)*255;return a.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(ba(n[a]/255)*255):n[a]=ba(n[a]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ZM=0;class ex{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ZM++}),this.uuid=cl(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(Hh(l[f].image)):c.push(Hh(l[f]))}else c=Hh(l);a.url=c}return n||(t.images[this.uuid]=a),a}}function Hh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?jM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let KM=0;class Gn extends to{constructor(t=Gn.DEFAULT_IMAGE,n=Gn.DEFAULT_MAPPING,a=Fs,l=Fs,c=ji,f=Hs,d=Ii,m=Aa,p=Gn.DEFAULT_ANISOTROPY,g=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:KM++}),this.uuid=cl(),this.name="",this.source=new ex(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ol:t.x=t.x-Math.floor(t.x);break;case Fs:t.x=t.x<0?0:1;break;case Ad:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ol:t.y=t.y-Math.floor(t.y);break;case Fs:t.y=t.y<0?0:1;break;case Ad:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=Vv;Gn.DEFAULT_ANISOTROPY=1;class on{constructor(t=0,n=0,a=0,l=1){on.prototype.isVector4=!0,this.x=t,this.y=n,this.z=a,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,l){return this.x=t,this.y=n,this.z=a,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*a+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*a+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*a+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*a+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,l,c;const m=t.elements,p=m[0],g=m[4],_=m[8],x=m[1],M=m[5],E=m[9],T=m[2],S=m[6],v=m[10];if(Math.abs(g-x)<.01&&Math.abs(_-T)<.01&&Math.abs(E-S)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+T)<.1&&Math.abs(E+S)<.1&&Math.abs(p+M+v-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const D=(p+1)/2,w=(M+1)/2,W=(v+1)/2,F=(g+x)/4,O=(_+T)/4,H=(E+S)/4;return D>w&&D>W?D<.01?(a=0,l=.707106781,c=.707106781):(a=Math.sqrt(D),l=F/a,c=O/a):w>W?w<.01?(a=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),a=F/l,c=H/l):W<.01?(a=.707106781,l=.707106781,c=0):(c=Math.sqrt(W),a=O/c,l=H/c),this.set(a,l,c,n),this}let L=Math.sqrt((S-E)*(S-E)+(_-T)*(_-T)+(x-g)*(x-g));return Math.abs(L)<.001&&(L=1),this.x=(S-E)/L,this.y=(_-T)/L,this.z=(x-g)/L,this.w=Math.acos((p+M+v-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class QM extends to{constructor(t=1,n=1,a={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new on(0,0,t,n),this.scissorTest=!1,this.viewport=new on(0,0,t,n);const l={width:t,height:n,depth:1};a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ji,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},a);const c=new Gn(l,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace);c.flipY=!1,c.generateMipmaps=a.generateMipmaps,c.internalFormat=a.internalFormat,this.textures=[];const f=a.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=a;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let a=0,l=t.textures.length;a<l;a++)this.textures[a]=t.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new ex(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cs extends QM{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class nx extends Gn{constructor(t=null,n=1,a=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=Fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class JM extends Gn{constructor(t=null,n=1,a=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=Fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ul{constructor(t=0,n=0,a=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=l}static slerpFlat(t,n,a,l,c,f,d){let m=a[l+0],p=a[l+1],g=a[l+2],_=a[l+3];const x=c[f+0],M=c[f+1],E=c[f+2],T=c[f+3];if(d===0){t[n+0]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_;return}if(d===1){t[n+0]=x,t[n+1]=M,t[n+2]=E,t[n+3]=T;return}if(_!==T||m!==x||p!==M||g!==E){let S=1-d;const v=m*x+p*M+g*E+_*T,L=v>=0?1:-1,D=1-v*v;if(D>Number.EPSILON){const W=Math.sqrt(D),F=Math.atan2(W,v*L);S=Math.sin(S*F)/W,d=Math.sin(d*F)/W}const w=d*L;if(m=m*S+x*w,p=p*S+M*w,g=g*S+E*w,_=_*S+T*w,S===1-d){const W=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=W,p*=W,g*=W,_*=W}}t[n]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,l,c,f){const d=a[l],m=a[l+1],p=a[l+2],g=a[l+3],_=c[f],x=c[f+1],M=c[f+2],E=c[f+3];return t[n]=d*E+g*_+m*M-p*x,t[n+1]=m*E+g*x+p*_-d*M,t[n+2]=p*E+g*M+d*x-m*_,t[n+3]=g*E-d*_-m*x-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,l){return this._x=t,this._y=n,this._z=a,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,m=Math.sin,p=d(a/2),g=d(l/2),_=d(c/2),x=m(a/2),M=m(l/2),E=m(c/2);switch(f){case"XYZ":this._x=x*g*_+p*M*E,this._y=p*M*_-x*g*E,this._z=p*g*E+x*M*_,this._w=p*g*_-x*M*E;break;case"YXZ":this._x=x*g*_+p*M*E,this._y=p*M*_-x*g*E,this._z=p*g*E-x*M*_,this._w=p*g*_+x*M*E;break;case"ZXY":this._x=x*g*_-p*M*E,this._y=p*M*_+x*g*E,this._z=p*g*E+x*M*_,this._w=p*g*_-x*M*E;break;case"ZYX":this._x=x*g*_-p*M*E,this._y=p*M*_+x*g*E,this._z=p*g*E-x*M*_,this._w=p*g*_+x*M*E;break;case"YZX":this._x=x*g*_+p*M*E,this._y=p*M*_+x*g*E,this._z=p*g*E-x*M*_,this._w=p*g*_-x*M*E;break;case"XZY":this._x=x*g*_-p*M*E,this._y=p*M*_-x*g*E,this._z=p*g*E+x*M*_,this._w=p*g*_+x*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,l=Math.sin(a);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],l=n[4],c=n[8],f=n[1],d=n[5],m=n[9],p=n[2],g=n[6],_=n[10],x=a+d+_;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(g-m)*M,this._y=(c-p)*M,this._z=(f-l)*M}else if(a>d&&a>_){const M=2*Math.sqrt(1+a-d-_);this._w=(g-m)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+p)/M}else if(d>_){const M=2*Math.sqrt(1+d-a-_);this._w=(c-p)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+_-a-d);this._w=(f-l)/M,this._x=(c+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<Number.EPSILON?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ti(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const l=Math.min(1,n/a);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,l=t._y,c=t._z,f=t._w,d=n._x,m=n._y,p=n._z,g=n._w;return this._x=a*g+f*d+l*p-c*m,this._y=l*g+f*m+c*d-a*p,this._z=c*g+f*p+a*m-l*d,this._w=f*g-a*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const a=this._x,l=this._y,c=this._z,f=this._w;let d=f*t._w+a*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=f,this._x=a,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-n;return this._w=M*f+n*this._w,this._x=M*a+n*this._x,this._y=M*l+n*this._y,this._z=M*c+n*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),_=Math.sin((1-n)*g)/p,x=Math.sin(n*g)/p;return this._w=f*_+this._w*x,this._x=a*_+this._x*x,this._y=l*_+this._y*x,this._z=c*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),l=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,n=0,a=0){J.prototype.isVector3=!0,this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(O_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(O_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*l,this.y=c[1]*n+c[4]*a+c[7]*l,this.z=c[2]*n+c[5]*a+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*a+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*a+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*a+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,a=this.y,l=this.z,c=t.x,f=t.y,d=t.z,m=t.w,p=2*(f*l-d*a),g=2*(d*n-c*l),_=2*(c*a-f*n);return this.x=n+m*p+f*_-d*g,this.y=a+m*g+d*p-c*_,this.z=l+m*_+c*g-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*l,this.y=c[1]*n+c[5]*a+c[9]*l,this.z=c[2]*n+c[6]*a+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,l=t.y,c=t.z,f=n.x,d=n.y,m=n.z;return this.x=l*m-c*d,this.y=c*f-a*m,this.z=a*d-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Gh.copy(this).projectOnVector(t),this.sub(Gh)}reflect(t){return this.sub(Gh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ti(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,l=this.z-t.z;return n*n+a*a+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const l=Math.sin(n)*t;return this.x=l*Math.sin(a),this.y=Math.cos(n)*t,this.z=l*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gh=new J,O_=new ul;class fl{constructor(t=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Oi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Oi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Oi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,Oi):Oi.fromBufferAttribute(c,f),Oi.applyMatrix4(t.matrixWorld),this.expandByPoint(Oi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),bc.copy(a.boundingBox)),bc.applyMatrix4(t.matrixWorld),this.union(bc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Oi),Oi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Jo),Ac.subVectors(this.max,Jo),Ar.subVectors(t.a,Jo),Rr.subVectors(t.b,Jo),wr.subVectors(t.c,Jo),ts.subVectors(Rr,Ar),es.subVectors(wr,Rr),ws.subVectors(Ar,wr);let n=[0,-ts.z,ts.y,0,-es.z,es.y,0,-ws.z,ws.y,ts.z,0,-ts.x,es.z,0,-es.x,ws.z,0,-ws.x,-ts.y,ts.x,0,-es.y,es.x,0,-ws.y,ws.x,0];return!Vh(n,Ar,Rr,wr,Ac)||(n=[1,0,0,0,1,0,0,0,1],!Vh(n,Ar,Rr,wr,Ac))?!1:(Rc.crossVectors(ts,es),n=[Rc.x,Rc.y,Rc.z],Vh(n,Ar,Rr,wr,Ac))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Oi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Oi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const pa=[new J,new J,new J,new J,new J,new J,new J,new J],Oi=new J,bc=new fl,Ar=new J,Rr=new J,wr=new J,ts=new J,es=new J,ws=new J,Jo=new J,Ac=new J,Rc=new J,Cs=new J;function Vh(r,t,n,a,l){for(let c=0,f=r.length-3;c<=f;c+=3){Cs.fromArray(r,c);const d=l.x*Math.abs(Cs.x)+l.y*Math.abs(Cs.y)+l.z*Math.abs(Cs.z),m=t.dot(Cs),p=n.dot(Cs),g=a.dot(Cs);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const $M=new fl,$o=new J,kh=new J;class hl{constructor(t=new J,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):$M.setFromPoints(t).getCenter(a);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$o.subVectors(t,this.center);const n=$o.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),l=(a-this.radius)*.5;this.center.addScaledVector($o,l/a),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($o.copy(t.center).add(kh)),this.expandByPoint($o.copy(t.center).sub(kh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ma=new J,Xh=new J,wc=new J,ns=new J,qh=new J,Cc=new J,Wh=new J;class fp{constructor(t=new J,n=new J(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ma)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=ma.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ma.copy(this.origin).addScaledVector(this.direction,n),ma.distanceToSquared(t))}distanceSqToSegment(t,n,a,l){Xh.copy(t).add(n).multiplyScalar(.5),wc.copy(n).sub(t).normalize(),ns.copy(this.origin).sub(Xh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(wc),d=ns.dot(this.direction),m=-ns.dot(wc),p=ns.lengthSq(),g=Math.abs(1-f*f);let _,x,M,E;if(g>0)if(_=f*m-d,x=f*d-m,E=c*g,_>=0)if(x>=-E)if(x<=E){const T=1/g;_*=T,x*=T,M=_*(_+f*x+2*d)+x*(f*_+x+2*m)+p}else x=c,_=Math.max(0,-(f*x+d)),M=-_*_+x*(x+2*m)+p;else x=-c,_=Math.max(0,-(f*x+d)),M=-_*_+x*(x+2*m)+p;else x<=-E?(_=Math.max(0,-(-f*c+d)),x=_>0?-c:Math.min(Math.max(-c,-m),c),M=-_*_+x*(x+2*m)+p):x<=E?(_=0,x=Math.min(Math.max(-c,-m),c),M=x*(x+2*m)+p):(_=Math.max(0,-(f*c+d)),x=_>0?c:Math.min(Math.max(-c,-m),c),M=-_*_+x*(x+2*m)+p);else x=f>0?-c:c,_=Math.max(0,-(f*x+d)),M=-_*_+x*(x+2*m)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Xh).addScaledVector(wc,x),M}intersectSphere(t,n){ma.subVectors(t.center,this.origin);const a=ma.dot(this.direction),l=ma.dot(ma)-a*a,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=a-f,m=a+f;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,l,c,f,d,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return p>=0?(a=(t.min.x-x.x)*p,l=(t.max.x-x.x)*p):(a=(t.max.x-x.x)*p,l=(t.min.x-x.x)*p),g>=0?(c=(t.min.y-x.y)*g,f=(t.max.y-x.y)*g):(c=(t.max.y-x.y)*g,f=(t.min.y-x.y)*g),a>f||c>l||((c>a||isNaN(a))&&(a=c),(f<l||isNaN(l))&&(l=f),_>=0?(d=(t.min.z-x.z)*_,m=(t.max.z-x.z)*_):(d=(t.max.z-x.z)*_,m=(t.min.z-x.z)*_),a>m||d>l)||((d>a||a!==a)&&(a=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(a>=0?a:l,n)}intersectsBox(t){return this.intersectBox(t,ma)!==null}intersectTriangle(t,n,a,l,c){qh.subVectors(n,t),Cc.subVectors(a,t),Wh.crossVectors(qh,Cc);let f=this.direction.dot(Wh),d;if(f>0){if(l)return null;d=1}else if(f<0)d=-1,f=-f;else return null;ns.subVectors(this.origin,t);const m=d*this.direction.dot(Cc.crossVectors(ns,Cc));if(m<0)return null;const p=d*this.direction.dot(qh.cross(ns));if(p<0||m+p>f)return null;const g=-d*ns.dot(Wh);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class an{constructor(t,n,a,l,c,f,d,m,p,g,_,x,M,E,T,S){an.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,d,m,p,g,_,x,M,E,T,S)}set(t,n,a,l,c,f,d,m,p,g,_,x,M,E,T,S){const v=this.elements;return v[0]=t,v[4]=n,v[8]=a,v[12]=l,v[1]=c,v[5]=f,v[9]=d,v[13]=m,v[2]=p,v[6]=g,v[10]=_,v[14]=x,v[3]=M,v[7]=E,v[11]=T,v[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new an().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,a=t.elements,l=1/Cr.setFromMatrixColumn(t,0).length(),c=1/Cr.setFromMatrixColumn(t,1).length(),f=1/Cr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*l,n[1]=a[1]*l,n[2]=a[2]*l,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*f,n[9]=a[9]*f,n[10]=a[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,l=t.y,c=t.z,f=Math.cos(a),d=Math.sin(a),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const x=f*g,M=f*_,E=d*g,T=d*_;n[0]=m*g,n[4]=-m*_,n[8]=p,n[1]=M+E*p,n[5]=x-T*p,n[9]=-d*m,n[2]=T-x*p,n[6]=E+M*p,n[10]=f*m}else if(t.order==="YXZ"){const x=m*g,M=m*_,E=p*g,T=p*_;n[0]=x+T*d,n[4]=E*d-M,n[8]=f*p,n[1]=f*_,n[5]=f*g,n[9]=-d,n[2]=M*d-E,n[6]=T+x*d,n[10]=f*m}else if(t.order==="ZXY"){const x=m*g,M=m*_,E=p*g,T=p*_;n[0]=x-T*d,n[4]=-f*_,n[8]=E+M*d,n[1]=M+E*d,n[5]=f*g,n[9]=T-x*d,n[2]=-f*p,n[6]=d,n[10]=f*m}else if(t.order==="ZYX"){const x=f*g,M=f*_,E=d*g,T=d*_;n[0]=m*g,n[4]=E*p-M,n[8]=x*p+T,n[1]=m*_,n[5]=T*p+x,n[9]=M*p-E,n[2]=-p,n[6]=d*m,n[10]=f*m}else if(t.order==="YZX"){const x=f*m,M=f*p,E=d*m,T=d*p;n[0]=m*g,n[4]=T-x*_,n[8]=E*_+M,n[1]=_,n[5]=f*g,n[9]=-d*g,n[2]=-p*g,n[6]=M*_+E,n[10]=x-T*_}else if(t.order==="XZY"){const x=f*m,M=f*p,E=d*m,T=d*p;n[0]=m*g,n[4]=-_,n[8]=p*g,n[1]=x*_+T,n[5]=f*g,n[9]=M*_-E,n[2]=E*_-M,n[6]=d*g,n[10]=T*_+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tE,t,eE)}lookAt(t,n,a){const l=this.elements;return ci.subVectors(t,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),is.crossVectors(a,ci),is.lengthSq()===0&&(Math.abs(a.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),is.crossVectors(a,ci)),is.normalize(),Dc.crossVectors(ci,is),l[0]=is.x,l[4]=Dc.x,l[8]=ci.x,l[1]=is.y,l[5]=Dc.y,l[9]=ci.y,l[2]=is.z,l[6]=Dc.z,l[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],d=a[4],m=a[8],p=a[12],g=a[1],_=a[5],x=a[9],M=a[13],E=a[2],T=a[6],S=a[10],v=a[14],L=a[3],D=a[7],w=a[11],W=a[15],F=l[0],O=l[4],H=l[8],U=l[12],R=l[1],B=l[5],j=l[9],$=l[13],lt=l[2],ft=l[6],z=l[10],Q=l[14],K=l[3],St=l[7],Tt=l[11],P=l[15];return c[0]=f*F+d*R+m*lt+p*K,c[4]=f*O+d*B+m*ft+p*St,c[8]=f*H+d*j+m*z+p*Tt,c[12]=f*U+d*$+m*Q+p*P,c[1]=g*F+_*R+x*lt+M*K,c[5]=g*O+_*B+x*ft+M*St,c[9]=g*H+_*j+x*z+M*Tt,c[13]=g*U+_*$+x*Q+M*P,c[2]=E*F+T*R+S*lt+v*K,c[6]=E*O+T*B+S*ft+v*St,c[10]=E*H+T*j+S*z+v*Tt,c[14]=E*U+T*$+S*Q+v*P,c[3]=L*F+D*R+w*lt+W*K,c[7]=L*O+D*B+w*ft+W*St,c[11]=L*H+D*j+w*z+W*Tt,c[15]=L*U+D*$+w*Q+W*P,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],l=t[8],c=t[12],f=t[1],d=t[5],m=t[9],p=t[13],g=t[2],_=t[6],x=t[10],M=t[14],E=t[3],T=t[7],S=t[11],v=t[15];return E*(+c*m*_-l*p*_-c*d*x+a*p*x+l*d*M-a*m*M)+T*(+n*m*M-n*p*x+c*f*x-l*f*M+l*p*g-c*m*g)+S*(+n*p*_-n*d*M-c*f*_+a*f*M+c*d*g-a*p*g)+v*(-l*d*g-n*m*_+n*d*x+l*f*_-a*f*x+a*m*g)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=t[9],x=t[10],M=t[11],E=t[12],T=t[13],S=t[14],v=t[15],L=_*S*p-T*x*p+T*m*M-d*S*M-_*m*v+d*x*v,D=E*x*p-g*S*p-E*m*M+f*S*M+g*m*v-f*x*v,w=g*T*p-E*_*p+E*d*M-f*T*M-g*d*v+f*_*v,W=E*_*m-g*T*m-E*d*x+f*T*x+g*d*S-f*_*S,F=n*L+a*D+l*w+c*W;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/F;return t[0]=L*O,t[1]=(T*x*c-_*S*c-T*l*M+a*S*M+_*l*v-a*x*v)*O,t[2]=(d*S*c-T*m*c+T*l*p-a*S*p-d*l*v+a*m*v)*O,t[3]=(_*m*c-d*x*c-_*l*p+a*x*p+d*l*M-a*m*M)*O,t[4]=D*O,t[5]=(g*S*c-E*x*c+E*l*M-n*S*M-g*l*v+n*x*v)*O,t[6]=(E*m*c-f*S*c-E*l*p+n*S*p+f*l*v-n*m*v)*O,t[7]=(f*x*c-g*m*c+g*l*p-n*x*p-f*l*M+n*m*M)*O,t[8]=w*O,t[9]=(E*_*c-g*T*c-E*a*M+n*T*M+g*a*v-n*_*v)*O,t[10]=(f*T*c-E*d*c+E*a*p-n*T*p-f*a*v+n*d*v)*O,t[11]=(g*d*c-f*_*c-g*a*p+n*_*p+f*a*M-n*d*M)*O,t[12]=W*O,t[13]=(g*T*l-E*_*l+E*a*x-n*T*x-g*a*S+n*_*S)*O,t[14]=(E*d*l-f*T*l-E*a*m+n*T*m+f*a*S-n*d*S)*O,t[15]=(f*_*l-g*d*l+g*a*m-n*_*m-f*a*x+n*d*x)*O,this}scale(t){const n=this.elements,a=t.x,l=t.y,c=t.z;return n[0]*=a,n[4]*=l,n[8]*=c,n[1]*=a,n[5]*=l,n[9]*=c,n[2]*=a,n[6]*=l,n[10]*=c,n[3]*=a,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,l))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),l=Math.sin(n),c=1-a,f=t.x,d=t.y,m=t.z,p=c*f,g=c*d;return this.set(p*f+a,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+a,g*m-l*f,0,p*m-l*d,g*m+l*f,c*m*m+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,l,c,f){return this.set(1,a,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,a){const l=this.elements,c=n._x,f=n._y,d=n._z,m=n._w,p=c+c,g=f+f,_=d+d,x=c*p,M=c*g,E=c*_,T=f*g,S=f*_,v=d*_,L=m*p,D=m*g,w=m*_,W=a.x,F=a.y,O=a.z;return l[0]=(1-(T+v))*W,l[1]=(M+w)*W,l[2]=(E-D)*W,l[3]=0,l[4]=(M-w)*F,l[5]=(1-(x+v))*F,l[6]=(S+L)*F,l[7]=0,l[8]=(E+D)*O,l[9]=(S-L)*O,l[10]=(1-(x+T))*O,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,a){const l=this.elements;let c=Cr.set(l[0],l[1],l[2]).length();const f=Cr.set(l[4],l[5],l[6]).length(),d=Cr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Pi.copy(this);const p=1/c,g=1/f,_=1/d;return Pi.elements[0]*=p,Pi.elements[1]*=p,Pi.elements[2]*=p,Pi.elements[4]*=g,Pi.elements[5]*=g,Pi.elements[6]*=g,Pi.elements[8]*=_,Pi.elements[9]*=_,Pi.elements[10]*=_,n.setFromRotationMatrix(Pi),a.x=c,a.y=f,a.z=d,this}makePerspective(t,n,a,l,c,f,d=Ea){const m=this.elements,p=2*c/(n-t),g=2*c/(a-l),_=(n+t)/(n-t),x=(a+l)/(a-l);let M,E;if(d===Ea)M=-(f+c)/(f-c),E=-2*f*c/(f-c);else if(d===ou)M=-f/(f-c),E=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=_,m[12]=0,m[1]=0,m[5]=g,m[9]=x,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=E,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,n,a,l,c,f,d=Ea){const m=this.elements,p=1/(n-t),g=1/(a-l),_=1/(f-c),x=(n+t)*p,M=(a+l)*g;let E,T;if(d===Ea)E=(f+c)*_,T=-2*_;else if(d===ou)E=c*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-x,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=T,m[14]=-E,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<16;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}}const Cr=new J,Pi=new an,tE=new J(0,0,0),eE=new J(1,1,1),is=new J,Dc=new J,ci=new J,P_=new an,z_=new ul;class Ra{constructor(t=0,n=0,a=0,l=Ra.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,l=this._order){return this._x=t,this._y=n,this._z=a,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],m=l[1],p=l[5],g=l[9],_=l[2],x=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(ti(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-ti(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ti(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-ti(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(ti(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-ti(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return P_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(P_,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return z_.setFromEuler(this),this.setFromQuaternion(z_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ra.DEFAULT_ORDER="XYZ";class ix{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nE=0;const B_=new J,Dr=new ul,ga=new an,Uc=new J,tl=new J,iE=new J,aE=new ul,I_=new J(1,0,0),F_=new J(0,1,0),H_=new J(0,0,1),G_={type:"added"},sE={type:"removed"},Ur={type:"childadded",child:null},Yh={type:"childremoved",child:null};class Vn extends to{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nE++}),this.uuid=cl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vn.DEFAULT_UP.clone();const t=new J,n=new Ra,a=new ul,l=new J(1,1,1);function c(){a.setFromEuler(n,!1)}function f(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new an},normalMatrix:{value:new ce}}),this.matrix=new an,this.matrixWorld=new an,this.matrixAutoUpdate=Vn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ix,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Dr.setFromAxisAngle(t,n),this.quaternion.multiply(Dr),this}rotateOnWorldAxis(t,n){return Dr.setFromAxisAngle(t,n),this.quaternion.premultiply(Dr),this}rotateX(t){return this.rotateOnAxis(I_,t)}rotateY(t){return this.rotateOnAxis(F_,t)}rotateZ(t){return this.rotateOnAxis(H_,t)}translateOnAxis(t,n){return B_.copy(t).applyQuaternion(this.quaternion),this.position.add(B_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(I_,t)}translateY(t){return this.translateOnAxis(F_,t)}translateZ(t){return this.translateOnAxis(H_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ga.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Uc.copy(t):Uc.set(t,n,a);const l=this.parent;this.updateWorldMatrix(!0,!1),tl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ga.lookAt(tl,Uc,this.up):ga.lookAt(Uc,tl,this.up),this.quaternion.setFromRotationMatrix(ga),l&&(ga.extractRotation(l.matrixWorld),Dr.setFromRotationMatrix(ga),this.quaternion.premultiply(Dr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(G_),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(sE),Yh.child=t,this.dispatchEvent(Yh),Yh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ga.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ga.multiply(t.parent.matrixWorld)),t.applyMatrix4(ga),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(G_),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,l=this.children.length;a<l;a++){const f=this.children[a].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,t,iE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,aE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n){const a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(n){const d=f(t.geometries),m=f(t.materials),p=f(t.textures),g=f(t.images),_=f(t.shapes),x=f(t.skeletons),M=f(t.animations),E=f(t.nodes);d.length>0&&(a.geometries=d),m.length>0&&(a.materials=m),p.length>0&&(a.textures=p),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),x.length>0&&(a.skeletons=x),M.length>0&&(a.animations=M),E.length>0&&(a.nodes=E)}return a.object=l,a;function f(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const l=t.children[a];this.add(l.clone())}return this}}Vn.DEFAULT_UP=new J(0,1,0);Vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zi=new J,_a=new J,jh=new J,va=new J,Lr=new J,Nr=new J,V_=new J,Zh=new J,Kh=new J,Qh=new J,Jh=new on,$h=new on,td=new on;class Bi{constructor(t=new J,n=new J,a=new J){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,l){l.subVectors(a,n),zi.subVectors(t,n),l.cross(zi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,a,l,c){zi.subVectors(l,n),_a.subVectors(a,n),jh.subVectors(t,n);const f=zi.dot(zi),d=zi.dot(_a),m=zi.dot(jh),p=_a.dot(_a),g=_a.dot(jh),_=f*p-d*d;if(_===0)return c.set(0,0,0),null;const x=1/_,M=(p*m-d*g)*x,E=(f*g-d*m)*x;return c.set(1-M-E,E,M)}static containsPoint(t,n,a,l){return this.getBarycoord(t,n,a,l,va)===null?!1:va.x>=0&&va.y>=0&&va.x+va.y<=1}static getInterpolation(t,n,a,l,c,f,d,m){return this.getBarycoord(t,n,a,l,va)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,va.x),m.addScaledVector(f,va.y),m.addScaledVector(d,va.z),m)}static getInterpolatedAttribute(t,n,a,l,c,f){return Jh.setScalar(0),$h.setScalar(0),td.setScalar(0),Jh.fromBufferAttribute(t,n),$h.fromBufferAttribute(t,a),td.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Jh,c.x),f.addScaledVector($h,c.y),f.addScaledVector(td,c.z),f}static isFrontFacing(t,n,a,l){return zi.subVectors(a,n),_a.subVectors(t,n),zi.cross(_a).dot(l)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,l){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,a,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zi.subVectors(this.c,this.b),_a.subVectors(this.a,this.b),zi.cross(_a).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Bi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,l,c){return Bi.getInterpolation(t,this.a,this.b,this.c,n,a,l,c)}containsPoint(t){return Bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,l=this.b,c=this.c;let f,d;Lr.subVectors(l,a),Nr.subVectors(c,a),Zh.subVectors(t,a);const m=Lr.dot(Zh),p=Nr.dot(Zh);if(m<=0&&p<=0)return n.copy(a);Kh.subVectors(t,l);const g=Lr.dot(Kh),_=Nr.dot(Kh);if(g>=0&&_<=g)return n.copy(l);const x=m*_-g*p;if(x<=0&&m>=0&&g<=0)return f=m/(m-g),n.copy(a).addScaledVector(Lr,f);Qh.subVectors(t,c);const M=Lr.dot(Qh),E=Nr.dot(Qh);if(E>=0&&M<=E)return n.copy(c);const T=M*p-m*E;if(T<=0&&p>=0&&E<=0)return d=p/(p-E),n.copy(a).addScaledVector(Nr,d);const S=g*E-M*_;if(S<=0&&_-g>=0&&M-E>=0)return V_.subVectors(c,l),d=(_-g)/(_-g+(M-E)),n.copy(l).addScaledVector(V_,d);const v=1/(S+T+x);return f=T*v,d=x*v,n.copy(a).addScaledVector(Lr,f).addScaledVector(Nr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ax={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},Lc={h:0,s:0,l:0};function ed(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class fe{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=hi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ae.toWorkingColorSpace(this,n),this}setRGB(t,n,a,l=Ae.workingColorSpace){return this.r=t,this.g=n,this.b=a,Ae.toWorkingColorSpace(this,l),this}setHSL(t,n,a,l=Ae.workingColorSpace){if(t=kM(t,1),n=ti(n,0,1),a=ti(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,f=2*a-c;this.r=ed(f,c,t+1/3),this.g=ed(f,c,t),this.b=ed(f,c,t-1/3)}return Ae.toWorkingColorSpace(this,l),this}setStyle(t,n=hi){function a(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=hi){const a=ax[t.toLowerCase()];return a!==void 0?this.setHex(a,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ba(t.r),this.g=ba(t.g),this.b=ba(t.b),this}copyLinearToSRGB(t){return this.r=qr(t.r),this.g=qr(t.g),this.b=qr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hi){return Ae.fromWorkingColorSpace(In.copy(this),t),Math.round(ti(In.r*255,0,255))*65536+Math.round(ti(In.g*255,0,255))*256+Math.round(ti(In.b*255,0,255))}getHexString(t=hi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ae.workingColorSpace){Ae.fromWorkingColorSpace(In.copy(this),n);const a=In.r,l=In.g,c=In.b,f=Math.max(a,l,c),d=Math.min(a,l,c);let m,p;const g=(d+f)/2;if(d===f)m=0,p=0;else{const _=f-d;switch(p=g<=.5?_/(f+d):_/(2-f-d),f){case a:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-a)/_+2;break;case c:m=(a-l)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,n=Ae.workingColorSpace){return Ae.fromWorkingColorSpace(In.copy(this),n),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=hi){Ae.fromWorkingColorSpace(In.copy(this),t);const n=In.r,a=In.g,l=In.b;return t!==hi?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(l*255)})`}offsetHSL(t,n,a){return this.getHSL(as),this.setHSL(as.h+t,as.s+n,as.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(as),t.getHSL(Lc);const a=Ih(as.h,Lc.h,n),l=Ih(as.s,Lc.s,n),c=Ih(as.l,Lc.l,n);return this.setHSL(a,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*l,this.g=c[1]*n+c[4]*a+c[7]*l,this.b=c[2]*n+c[5]*a+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new fe;fe.NAMES=ax;let rE=0;class eo extends to{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rE++}),this.uuid=cl(),this.name="",this.blending=kr,this.side=ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=md,this.blendDst=gd,this.blendEquation=Bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=b_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tr,this.stencilZFail=Tr,this.stencilZPass=Tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(a):l&&l.isVector3&&a&&a.isVector3?l.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==kr&&(a.blending=this.blending),this.side!==ls&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==md&&(a.blendSrc=this.blendSrc),this.blendDst!==gd&&(a.blendDst=this.blendDst),this.blendEquation!==Bs&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==Wr&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==b_&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Tr&&(a.stencilFail=this.stencilFail),this.stencilZFail!==Tr&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==Tr&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function l(c){const f=[];for(const d in c){const m=c[d];delete m.metadata,f.push(m)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(a.textures=c),f.length>0&&(a.images=f)}return a}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const l=n.length;a=new Array(l);for(let c=0;c!==l;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Hr extends eo{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ra,this.combine=Pv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const hn=new J,Nc=new Ce;class di{constructor(t,n,a=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=A_,this.updateRanges=[],this.gpuType=Ma,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[a+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Nc.fromBufferAttribute(this,n),Nc.applyMatrix3(t),this.setXY(n,Nc.x,Nc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)hn.fromBufferAttribute(this,n),hn.applyMatrix3(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)hn.fromBufferAttribute(this,n),hn.applyMatrix4(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)hn.fromBufferAttribute(this,n),hn.applyNormalMatrix(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)hn.fromBufferAttribute(this,n),hn.transformDirection(t),this.setXYZ(n,hn.x,hn.y,hn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Qo(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=Qn(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Qo(n,this.array)),n}setX(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Qo(n,this.array)),n}setY(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Qo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Qo(n,this.array)),n}setW(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),a=Qn(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,l){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),a=Qn(a,this.array),l=Qn(l,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this}setXYZW(t,n,a,l,c){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),a=Qn(a,this.array),l=Qn(l,this.array),c=Qn(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==A_&&(t.usage=this.usage),t}}class sx extends di{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class rx extends di{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class vn extends di{constructor(t,n,a){super(new Float32Array(t),n,a)}}let oE=0;const Ti=new an,nd=new Vn,Or=new J,ui=new fl,el=new fl,En=new J;class kn extends to{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=cl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(tx(t)?rx:sx)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new ce().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ti.makeRotationFromQuaternion(t),this.applyMatrix4(Ti),this}rotateX(t){return Ti.makeRotationX(t),this.applyMatrix4(Ti),this}rotateY(t){return Ti.makeRotationY(t),this.applyMatrix4(Ti),this}rotateZ(t){return Ti.makeRotationZ(t),this.applyMatrix4(Ti),this}translate(t,n,a){return Ti.makeTranslation(t,n,a),this.applyMatrix4(Ti),this}scale(t,n,a){return Ti.makeScale(t,n,a),this.applyMatrix4(Ti),this}lookAt(t){return nd.lookAt(t),nd.updateMatrix(),this.applyMatrix4(nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];a.push(f.x,f.y,f.z||0)}this.setAttribute("position",new vn(a,3))}else{for(let a=0,l=n.count;a<l;a++){const c=t[a];n.setXYZ(a,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,l=n.length;a<l;a++){const c=n[a];ui.setFromBufferAttribute(c),this.morphTargetsRelative?(En.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(En),En.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(En)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const a=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const d=n[c];el.setFromBufferAttribute(d),this.morphTargetsRelative?(En.addVectors(ui.min,el.min),ui.expandByPoint(En),En.addVectors(ui.max,el.max),ui.expandByPoint(En)):(ui.expandByPoint(el.min),ui.expandByPoint(el.max))}ui.getCenter(a);let l=0;for(let c=0,f=t.count;c<f;c++)En.fromBufferAttribute(t,c),l=Math.max(l,a.distanceToSquared(En));if(n)for(let c=0,f=n.length;c<f;c++){const d=n[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)En.fromBufferAttribute(d,p),m&&(Or.fromBufferAttribute(t,p),En.add(Or)),l=Math.max(l,a.distanceToSquared(En))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new di(new Float32Array(4*a.count),4));const f=this.getAttribute("tangent"),d=[],m=[];for(let H=0;H<a.count;H++)d[H]=new J,m[H]=new J;const p=new J,g=new J,_=new J,x=new Ce,M=new Ce,E=new Ce,T=new J,S=new J;function v(H,U,R){p.fromBufferAttribute(a,H),g.fromBufferAttribute(a,U),_.fromBufferAttribute(a,R),x.fromBufferAttribute(c,H),M.fromBufferAttribute(c,U),E.fromBufferAttribute(c,R),g.sub(p),_.sub(p),M.sub(x),E.sub(x);const B=1/(M.x*E.y-E.x*M.y);isFinite(B)&&(T.copy(g).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(B),S.copy(_).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(B),d[H].add(T),d[U].add(T),d[R].add(T),m[H].add(S),m[U].add(S),m[R].add(S))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let H=0,U=L.length;H<U;++H){const R=L[H],B=R.start,j=R.count;for(let $=B,lt=B+j;$<lt;$+=3)v(t.getX($+0),t.getX($+1),t.getX($+2))}const D=new J,w=new J,W=new J,F=new J;function O(H){W.fromBufferAttribute(l,H),F.copy(W);const U=d[H];D.copy(U),D.sub(W.multiplyScalar(W.dot(U))).normalize(),w.crossVectors(F,U);const B=w.dot(m[H])<0?-1:1;f.setXYZW(H,D.x,D.y,D.z,B)}for(let H=0,U=L.length;H<U;++H){const R=L[H],B=R.start,j=R.count;for(let $=B,lt=B+j;$<lt;$+=3)O(t.getX($+0)),O(t.getX($+1)),O(t.getX($+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new di(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let x=0,M=a.count;x<M;x++)a.setXYZ(x,0,0,0);const l=new J,c=new J,f=new J,d=new J,m=new J,p=new J,g=new J,_=new J;if(t)for(let x=0,M=t.count;x<M;x+=3){const E=t.getX(x+0),T=t.getX(x+1),S=t.getX(x+2);l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(a,E),m.fromBufferAttribute(a,T),p.fromBufferAttribute(a,S),d.add(g),m.add(g),p.add(g),a.setXYZ(E,d.x,d.y,d.z),a.setXYZ(T,m.x,m.y,m.z),a.setXYZ(S,p.x,p.y,p.z)}else for(let x=0,M=n.count;x<M;x+=3)l.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),a.setXYZ(x+0,g.x,g.y,g.z),a.setXYZ(x+1,g.x,g.y,g.z),a.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)En.fromBufferAttribute(t,n),En.normalize(),t.setXYZ(n,En.x,En.y,En.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,_=d.normalized,x=new p.constructor(m.length*g);let M=0,E=0;for(let T=0,S=m.length;T<S;T++){d.isInterleavedBufferAttribute?M=m[T]*d.data.stride+d.offset:M=m[T]*g;for(let v=0;v<g;v++)x[E++]=p[M++]}return new di(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new kn,a=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,a);n.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,_=p.length;g<_;g++){const x=p[g],M=t(x,a);m.push(M)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const p=f[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const p=a[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,x=p.length;_<x;_++){const M=p[_];g.push(M.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone(n));const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(n))}const c=t.morphAttributes;for(const p in c){const g=[],_=c[p];for(let x=0,M=_.length;x<M;x++)g.push(_[x].clone(n));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,g=f.length;p<g;p++){const _=f[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const k_=new an,Ds=new fp,Oc=new hl,X_=new J,Pc=new J,zc=new J,Bc=new J,id=new J,Ic=new J,q_=new J,Fc=new J;class Ln extends Vn{constructor(t=new kn,n=new Hr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,n){const a=this.geometry,l=a.attributes.position,c=a.morphAttributes.position,f=a.morphTargetsRelative;n.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Ic.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],_=c[m];g!==0&&(id.fromBufferAttribute(_,t),f?Ic.addScaledVector(id,g):Ic.addScaledVector(id.sub(n),g))}n.add(Ic)}return n}raycast(t,n){const a=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Oc.copy(a.boundingSphere),Oc.applyMatrix4(c),Ds.copy(t.ray).recast(t.near),!(Oc.containsPoint(Ds.origin)===!1&&(Ds.intersectSphere(Oc,X_)===null||Ds.origin.distanceToSquared(X_)>(t.far-t.near)**2))&&(k_.copy(c).invert(),Ds.copy(t.ray).applyMatrix4(k_),!(a.boundingBox!==null&&Ds.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ds)))}_computeIntersections(t,n,a){let l;const c=this.geometry,f=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,x=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],L=Math.max(S.start,M.start),D=Math.min(d.count,Math.min(S.start+S.count,M.start+M.count));for(let w=L,W=D;w<W;w+=3){const F=d.getX(w),O=d.getX(w+1),H=d.getX(w+2);l=Hc(this,v,t,a,p,g,_,F,O,H),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(d.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const L=d.getX(S),D=d.getX(S+1),w=d.getX(S+2);l=Hc(this,f,t,a,p,g,_,L,D,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let E=0,T=x.length;E<T;E++){const S=x[E],v=f[S.materialIndex],L=Math.max(S.start,M.start),D=Math.min(m.count,Math.min(S.start+S.count,M.start+M.count));for(let w=L,W=D;w<W;w+=3){const F=w,O=w+1,H=w+2;l=Hc(this,v,t,a,p,g,_,F,O,H),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(m.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const L=S,D=S+1,w=S+2;l=Hc(this,f,t,a,p,g,_,L,D,w),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}}}function lE(r,t,n,a,l,c,f,d){let m;if(t.side===ei?m=a.intersectTriangle(f,c,l,!0,d):m=a.intersectTriangle(l,c,f,t.side===ls,d),m===null)return null;Fc.copy(d),Fc.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(Fc);return p<n.near||p>n.far?null:{distance:p,point:Fc.clone(),object:r}}function Hc(r,t,n,a,l,c,f,d,m,p){r.getVertexPosition(d,Pc),r.getVertexPosition(m,zc),r.getVertexPosition(p,Bc);const g=lE(r,t,n,a,Pc,zc,Bc,q_);if(g){const _=new J;Bi.getBarycoord(q_,Pc,zc,Bc,_),l&&(g.uv=Bi.getInterpolatedAttribute(l,d,m,p,_,new Ce)),c&&(g.uv1=Bi.getInterpolatedAttribute(c,d,m,p,_,new Ce)),f&&(g.normal=Bi.getInterpolatedAttribute(f,d,m,p,_,new J),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:m,c:p,normal:new J,materialIndex:0};Bi.getNormal(Pc,zc,Bc,x.normal),g.face=x,g.barycoord=_}return g}class Ne extends kn{constructor(t=1,n=1,a=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],g=[],_=[];let x=0,M=0;E("z","y","x",-1,-1,a,n,t,f,c,0),E("z","y","x",1,-1,a,n,-t,f,c,1),E("x","z","y",1,1,t,a,n,l,f,2),E("x","z","y",1,-1,t,a,-n,l,f,3),E("x","y","z",1,-1,t,n,a,l,c,4),E("x","y","z",-1,-1,t,n,-a,l,c,5),this.setIndex(m),this.setAttribute("position",new vn(p,3)),this.setAttribute("normal",new vn(g,3)),this.setAttribute("uv",new vn(_,2));function E(T,S,v,L,D,w,W,F,O,H,U){const R=w/O,B=W/H,j=w/2,$=W/2,lt=F/2,ft=O+1,z=H+1;let Q=0,K=0;const St=new J;for(let Tt=0;Tt<z;Tt++){const P=Tt*B-$;for(let st=0;st<ft;st++){const yt=st*R-j;St[T]=yt*L,St[S]=P*D,St[v]=lt,p.push(St.x,St.y,St.z),St[T]=0,St[S]=0,St[v]=F>0?1:-1,g.push(St.x,St.y,St.z),_.push(st/O),_.push(1-Tt/H),Q+=1}}for(let Tt=0;Tt<H;Tt++)for(let P=0;P<O;P++){const st=x+P+ft*Tt,yt=x+P+ft*(Tt+1),Z=x+(P+1)+ft*(Tt+1),ht=x+(P+1)+ft*Tt;m.push(st,yt,ht),m.push(yt,Z,ht),K+=6}d.addGroup(M,K,U),M+=K,x+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qr(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const l=r[n][a];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=l.clone():Array.isArray(l)?t[n][a]=l.slice():t[n][a]=l}}return t}function Hn(r){const t={};for(let n=0;n<r.length;n++){const a=Qr(r[n]);for(const l in a)t[l]=a[l]}return t}function cE(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function ox(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ae.workingColorSpace}const hp={clone:Qr,merge:Hn};var uE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hi extends eo{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uE,this.fragmentShader=fE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qr(t.uniforms),this.uniformsGroups=cE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const l in this.extensions)this.extensions[l]===!0&&(a[l]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}}class lx extends Vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new an,this.projectionMatrix=new an,this.projectionMatrixInverse=new an,this.coordinateSystem=Ea}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ss=new J,W_=new Ce,Y_=new Ce;class Ai extends lx{constructor(t=50,n=1,a=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=$d*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Bh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return $d*2*Math.atan(Math.tan(Bh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ss.x,ss.y).multiplyScalar(-t/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ss.x,ss.y).multiplyScalar(-t/ss.z)}getViewSize(t,n){return this.getViewBounds(t,W_,Y_),n.subVectors(Y_,W_)}setViewOffset(t,n,a,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Bh*.5*this.fov)/this.zoom,a=2*n,l=this.aspect*a,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,n-=f.offsetY*a/p,l*=f.width/m,a*=f.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-a,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Pr=-90,zr=1;class hE extends Vn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ai(Pr,zr,t,n);l.layers=this.layers,this.add(l);const c=new Ai(Pr,zr,t,n);c.layers=this.layers,this.add(c);const f=new Ai(Pr,zr,t,n);f.layers=this.layers,this.add(f);const d=new Ai(Pr,zr,t,n);d.layers=this.layers,this.add(d);const m=new Ai(Pr,zr,t,n);m.layers=this.layers,this.add(m);const p=new Ai(Pr,zr,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,l,c,f,d,m]=n;for(const p of n)this.remove(p);if(t===Ea)a.up.set(0,1,0),a.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===ou)a.up.set(0,-1,0),a.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,m,p,g]=this.children,_=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const T=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,t.setRenderTarget(a,0,l),t.render(n,c),t.setRenderTarget(a,1,l),t.render(n,f),t.setRenderTarget(a,2,l),t.render(n,d),t.setRenderTarget(a,3,l),t.render(n,m),t.setRenderTarget(a,4,l),t.render(n,p),a.texture.generateMipmaps=T,t.setRenderTarget(a,5,l),t.render(n,g),t.setRenderTarget(_,x,M),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class cx extends Gn{constructor(t,n,a,l,c,f,d,m,p,g){t=t!==void 0?t:[],n=n!==void 0?n:Yr,super(t,n,a,l,c,f,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class dE extends cs{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},l=[a,a,a,a,a,a];this.texture=new cx(l,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ji}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Ne(5,5,5),c=new Hi({name:"CubemapFromEquirect",uniforms:Qr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:ei,blending:Ta});c.uniforms.tEquirect.value=n;const f=new Ln(l,c),d=n.minFilter;return n.minFilter===Hs&&(n.minFilter=ji),new hE(1,10,this).update(t,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,n,a,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,a,l);t.setRenderTarget(c)}}const ad=new J,pE=new J,mE=new ce;class Ps{constructor(t=new J(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,l){return this.normal.set(t,n,a),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const l=ad.subVectors(a,n).cross(pE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const a=t.delta(ad),l=this.normal.dot(a);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(a,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||mE.getNormalMatrix(t),l=this.coplanarPoint(ad).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Us=new hl,Gc=new J;class ux{constructor(t=new Ps,n=new Ps,a=new Ps,l=new Ps,c=new Ps,f=new Ps){this.planes=[t,n,a,l,c,f]}set(t,n,a,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(n),d[2].copy(a),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=Ea){const a=this.planes,l=t.elements,c=l[0],f=l[1],d=l[2],m=l[3],p=l[4],g=l[5],_=l[6],x=l[7],M=l[8],E=l[9],T=l[10],S=l[11],v=l[12],L=l[13],D=l[14],w=l[15];if(a[0].setComponents(m-c,x-p,S-M,w-v).normalize(),a[1].setComponents(m+c,x+p,S+M,w+v).normalize(),a[2].setComponents(m+f,x+g,S+E,w+L).normalize(),a[3].setComponents(m-f,x-g,S-E,w-L).normalize(),a[4].setComponents(m-d,x-_,S-T,w-D).normalize(),n===Ea)a[5].setComponents(m+d,x+_,S+T,w+D).normalize();else if(n===ou)a[5].setComponents(d,_,T,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Us.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Us)}intersectsSprite(t){return Us.center.set(0,0,0),Us.radius=.7071067811865476,Us.applyMatrix4(t.matrixWorld),this.intersectsSphere(Us)}intersectsSphere(t){const n=this.planes,a=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const l=n[a];if(Gc.x=l.normal.x>0?t.max.x:t.min.x,Gc.y=l.normal.y>0?t.max.y:t.min.y,Gc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function fx(){let r=null,t=!1,n=null,a=null;function l(c,f){n(c,f),a=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(a=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function gE(r){const t=new WeakMap;function n(d,m){const p=d.array,g=d.usage,_=p.byteLength,x=r.createBuffer();r.bindBuffer(m,x),r.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=r.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=r.SHORT;else if(p instanceof Uint32Array)M=r.UNSIGNED_INT;else if(p instanceof Int32Array)M=r.INT;else if(p instanceof Int8Array)M=r.BYTE;else if(p instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function a(d,m,p){const g=m.array,_=m.updateRanges;if(r.bindBuffer(p,d),_.length===0)r.bufferSubData(p,0,g);else{_.sort((M,E)=>M.start-E.start);let x=0;for(let M=1;M<_.length;M++){const E=_[x],T=_[M];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++x,_[x]=T)}_.length=x+1;for(let M=0,E=_.length;M<E;M++){const T=_[M];r.bufferSubData(p,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function f(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:f}}class mu extends kn{constructor(t=1,n=1,a=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:l};const c=t/2,f=n/2,d=Math.floor(a),m=Math.floor(l),p=d+1,g=m+1,_=t/d,x=n/m,M=[],E=[],T=[],S=[];for(let v=0;v<g;v++){const L=v*x-f;for(let D=0;D<p;D++){const w=D*_-c;E.push(w,-L,0),T.push(0,0,1),S.push(D/d),S.push(1-v/m)}}for(let v=0;v<m;v++)for(let L=0;L<d;L++){const D=L+p*v,w=L+p*(v+1),W=L+1+p*(v+1),F=L+1+p*v;M.push(D,w,F),M.push(w,W,F)}this.setIndex(M),this.setAttribute("position",new vn(E,3)),this.setAttribute("normal",new vn(T,3)),this.setAttribute("uv",new vn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mu(t.width,t.height,t.widthSegments,t.heightSegments)}}var _E=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vE=`#ifdef USE_ALPHAHASH
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
#endif`,xE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ME=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,EE=`#ifdef USE_AOMAP
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
#endif`,TE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bE=`#ifdef USE_BATCHING
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
#endif`,AE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,RE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,CE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,DE=`#ifdef USE_IRIDESCENCE
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
#endif`,UE=`#ifdef USE_BUMPMAP
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
#endif`,LE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,NE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,OE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,PE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,BE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,IE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,FE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,HE=`#define PI 3.141592653589793
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
} // validated`,GE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,VE=`vec3 transformedNormal = objectNormal;
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
#endif`,kE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,XE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,WE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,YE="gl_FragColor = linearToOutputTexel( gl_FragColor );",jE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ZE=`#ifdef USE_ENVMAP
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
#endif`,KE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,QE=`#ifdef USE_ENVMAP
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
#endif`,JE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$E=`#ifdef USE_ENVMAP
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
#endif`,t1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,e1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,a1=`#ifdef USE_GRADIENTMAP
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
}`,s1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,r1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,o1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,l1=`uniform bool receiveShadow;
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
#endif`,c1=`#ifdef USE_ENVMAP
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
#endif`,u1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,f1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,d1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p1=`PhysicalMaterial material;
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
#endif`,m1=`struct PhysicalMaterial {
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
}`,g1=`
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
#endif`,_1=`#if defined( RE_IndirectDiffuse )
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
#endif`,v1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,x1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,y1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,E1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,T1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,A1=`#if defined( USE_POINTS_UV )
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
#endif`,R1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,w1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,C1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,D1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,U1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L1=`#ifdef USE_MORPHTARGETS
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
#endif`,N1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,P1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,z1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,I1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,F1=`#ifdef USE_NORMALMAP
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
#endif`,H1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,G1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,X1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,W1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,j1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Z1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Q1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,eT=`float getShadowMask() {
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
}`,nT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iT=`#ifdef USE_SKINNING
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
#endif`,aT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sT=`#ifdef USE_SKINNING
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
#endif`,rT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,uT=`#ifdef USE_TRANSMISSION
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
#endif`,fT=`#ifdef USE_TRANSMISSION
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
#endif`,hT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_T=`uniform sampler2D t2D;
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
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ST=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MT=`#include <common>
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
}`,ET=`#if DEPTH_PACKING == 3200
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
}`,TT=`#define DISTANCE
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
}`,bT=`#define DISTANCE
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
}`,AT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,RT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wT=`uniform float scale;
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
}`,CT=`uniform vec3 diffuse;
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
}`,DT=`#include <common>
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
}`,UT=`uniform vec3 diffuse;
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
}`,LT=`#define LAMBERT
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
}`,NT=`#define LAMBERT
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
}`,OT=`#define MATCAP
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
}`,PT=`#define MATCAP
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
}`,zT=`#define NORMAL
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
}`,BT=`#define NORMAL
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
}`,IT=`#define PHONG
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
}`,FT=`#define PHONG
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
}`,HT=`#define STANDARD
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
}`,GT=`#define STANDARD
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
}`,VT=`#define TOON
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
}`,kT=`#define TOON
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
}`,XT=`uniform float size;
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
}`,qT=`uniform vec3 diffuse;
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
}`,WT=`#include <common>
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
}`,YT=`uniform vec3 color;
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
}`,jT=`uniform float rotation;
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
}`,ZT=`uniform vec3 diffuse;
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
}`,ue={alphahash_fragment:_E,alphahash_pars_fragment:vE,alphamap_fragment:xE,alphamap_pars_fragment:yE,alphatest_fragment:SE,alphatest_pars_fragment:ME,aomap_fragment:EE,aomap_pars_fragment:TE,batching_pars_vertex:bE,batching_vertex:AE,begin_vertex:RE,beginnormal_vertex:wE,bsdfs:CE,iridescence_fragment:DE,bumpmap_pars_fragment:UE,clipping_planes_fragment:LE,clipping_planes_pars_fragment:NE,clipping_planes_pars_vertex:OE,clipping_planes_vertex:PE,color_fragment:zE,color_pars_fragment:BE,color_pars_vertex:IE,color_vertex:FE,common:HE,cube_uv_reflection_fragment:GE,defaultnormal_vertex:VE,displacementmap_pars_vertex:kE,displacementmap_vertex:XE,emissivemap_fragment:qE,emissivemap_pars_fragment:WE,colorspace_fragment:YE,colorspace_pars_fragment:jE,envmap_fragment:ZE,envmap_common_pars_fragment:KE,envmap_pars_fragment:QE,envmap_pars_vertex:JE,envmap_physical_pars_fragment:c1,envmap_vertex:$E,fog_vertex:t1,fog_pars_vertex:e1,fog_fragment:n1,fog_pars_fragment:i1,gradientmap_pars_fragment:a1,lightmap_pars_fragment:s1,lights_lambert_fragment:r1,lights_lambert_pars_fragment:o1,lights_pars_begin:l1,lights_toon_fragment:u1,lights_toon_pars_fragment:f1,lights_phong_fragment:h1,lights_phong_pars_fragment:d1,lights_physical_fragment:p1,lights_physical_pars_fragment:m1,lights_fragment_begin:g1,lights_fragment_maps:_1,lights_fragment_end:v1,logdepthbuf_fragment:x1,logdepthbuf_pars_fragment:y1,logdepthbuf_pars_vertex:S1,logdepthbuf_vertex:M1,map_fragment:E1,map_pars_fragment:T1,map_particle_fragment:b1,map_particle_pars_fragment:A1,metalnessmap_fragment:R1,metalnessmap_pars_fragment:w1,morphinstance_vertex:C1,morphcolor_vertex:D1,morphnormal_vertex:U1,morphtarget_pars_vertex:L1,morphtarget_vertex:N1,normal_fragment_begin:O1,normal_fragment_maps:P1,normal_pars_fragment:z1,normal_pars_vertex:B1,normal_vertex:I1,normalmap_pars_fragment:F1,clearcoat_normal_fragment_begin:H1,clearcoat_normal_fragment_maps:G1,clearcoat_pars_fragment:V1,iridescence_pars_fragment:k1,opaque_fragment:X1,packing:q1,premultiplied_alpha_fragment:W1,project_vertex:Y1,dithering_fragment:j1,dithering_pars_fragment:Z1,roughnessmap_fragment:K1,roughnessmap_pars_fragment:Q1,shadowmap_pars_fragment:J1,shadowmap_pars_vertex:$1,shadowmap_vertex:tT,shadowmask_pars_fragment:eT,skinbase_vertex:nT,skinning_pars_vertex:iT,skinning_vertex:aT,skinnormal_vertex:sT,specularmap_fragment:rT,specularmap_pars_fragment:oT,tonemapping_fragment:lT,tonemapping_pars_fragment:cT,transmission_fragment:uT,transmission_pars_fragment:fT,uv_pars_fragment:hT,uv_pars_vertex:dT,uv_vertex:pT,worldpos_vertex:mT,background_vert:gT,background_frag:_T,backgroundCube_vert:vT,backgroundCube_frag:xT,cube_vert:yT,cube_frag:ST,depth_vert:MT,depth_frag:ET,distanceRGBA_vert:TT,distanceRGBA_frag:bT,equirect_vert:AT,equirect_frag:RT,linedashed_vert:wT,linedashed_frag:CT,meshbasic_vert:DT,meshbasic_frag:UT,meshlambert_vert:LT,meshlambert_frag:NT,meshmatcap_vert:OT,meshmatcap_frag:PT,meshnormal_vert:zT,meshnormal_frag:BT,meshphong_vert:IT,meshphong_frag:FT,meshphysical_vert:HT,meshphysical_frag:GT,meshtoon_vert:VT,meshtoon_frag:kT,points_vert:XT,points_frag:qT,shadow_vert:WT,shadow_frag:YT,sprite_vert:jT,sprite_frag:ZT},Nt={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},Yi={basic:{uniforms:Hn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:ue.meshbasic_vert,fragmentShader:ue.meshbasic_frag},lambert:{uniforms:Hn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshlambert_vert,fragmentShader:ue.meshlambert_frag},phong:{uniforms:Hn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:ue.meshphong_vert,fragmentShader:ue.meshphong_frag},standard:{uniforms:Hn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag},toon:{uniforms:Hn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshtoon_vert,fragmentShader:ue.meshtoon_frag},matcap:{uniforms:Hn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:ue.meshmatcap_vert,fragmentShader:ue.meshmatcap_frag},points:{uniforms:Hn([Nt.points,Nt.fog]),vertexShader:ue.points_vert,fragmentShader:ue.points_frag},dashed:{uniforms:Hn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ue.linedashed_vert,fragmentShader:ue.linedashed_frag},depth:{uniforms:Hn([Nt.common,Nt.displacementmap]),vertexShader:ue.depth_vert,fragmentShader:ue.depth_frag},normal:{uniforms:Hn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:ue.meshnormal_vert,fragmentShader:ue.meshnormal_frag},sprite:{uniforms:Hn([Nt.sprite,Nt.fog]),vertexShader:ue.sprite_vert,fragmentShader:ue.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ue.background_vert,fragmentShader:ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:ue.backgroundCube_vert,fragmentShader:ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ue.cube_vert,fragmentShader:ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ue.equirect_vert,fragmentShader:ue.equirect_frag},distanceRGBA:{uniforms:Hn([Nt.common,Nt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ue.distanceRGBA_vert,fragmentShader:ue.distanceRGBA_frag},shadow:{uniforms:Hn([Nt.lights,Nt.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:ue.shadow_vert,fragmentShader:ue.shadow_frag}};Yi.physical={uniforms:Hn([Yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag};const Vc={r:0,b:0,g:0},Ls=new Ra,KT=new an;function QT(r,t,n,a,l,c,f){const d=new fe(0);let m=c===!0?0:1,p,g,_=null,x=0,M=null;function E(L){let D=L.isScene===!0?L.background:null;return D&&D.isTexture&&(D=(L.backgroundBlurriness>0?n:t).get(D)),D}function T(L){let D=!1;const w=E(L);w===null?v(d,m):w&&w.isColor&&(v(w,1),D=!0);const W=r.xr.getEnvironmentBlendMode();W==="additive"?a.buffers.color.setClear(0,0,0,1,f):W==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,f),(r.autoClear||D)&&(a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(L,D){const w=E(D);w&&(w.isCubeTexture||w.mapping===du)?(g===void 0&&(g=new Ln(new Ne(1,1,1),new Hi({name:"BackgroundCubeMaterial",uniforms:Qr(Yi.backgroundCube.uniforms),vertexShader:Yi.backgroundCube.vertexShader,fragmentShader:Yi.backgroundCube.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(W,F,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Ls.copy(D.backgroundRotation),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),g.material.uniforms.envMap.value=w,g.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(KT.makeRotationFromEuler(Ls)),g.material.toneMapped=Ae.getTransfer(w.colorSpace)!==Fe,(_!==w||x!==w.version||M!==r.toneMapping)&&(g.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),g.layers.enableAll(),L.unshift(g,g.geometry,g.material,0,0,null)):w&&w.isTexture&&(p===void 0&&(p=new Ln(new mu(2,2),new Hi({name:"BackgroundMaterial",uniforms:Qr(Yi.background.uniforms),vertexShader:Yi.background.vertexShader,fragmentShader:Yi.background.fragmentShader,side:ls,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=w,p.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,p.material.toneMapped=Ae.getTransfer(w.colorSpace)!==Fe,w.matrixAutoUpdate===!0&&w.updateMatrix(),p.material.uniforms.uvTransform.value.copy(w.matrix),(_!==w||x!==w.version||M!==r.toneMapping)&&(p.material.needsUpdate=!0,_=w,x=w.version,M=r.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null))}function v(L,D){L.getRGB(Vc,ox(r)),a.buffers.color.setClear(Vc.r,Vc.g,Vc.b,D,f)}return{getClearColor:function(){return d},setClearColor:function(L,D=1){d.set(L),m=D,v(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(L){m=L,v(d,m)},render:T,addToRenderList:S}}function JT(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},l=x(null);let c=l,f=!1;function d(R,B,j,$,lt){let ft=!1;const z=_($,j,B);c!==z&&(c=z,p(c.object)),ft=M(R,$,j,lt),ft&&E(R,$,j,lt),lt!==null&&t.update(lt,r.ELEMENT_ARRAY_BUFFER),(ft||f)&&(f=!1,w(R,B,j,$),lt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(lt).buffer))}function m(){return r.createVertexArray()}function p(R){return r.bindVertexArray(R)}function g(R){return r.deleteVertexArray(R)}function _(R,B,j){const $=j.wireframe===!0;let lt=a[R.id];lt===void 0&&(lt={},a[R.id]=lt);let ft=lt[B.id];ft===void 0&&(ft={},lt[B.id]=ft);let z=ft[$];return z===void 0&&(z=x(m()),ft[$]=z),z}function x(R){const B=[],j=[],$=[];for(let lt=0;lt<n;lt++)B[lt]=0,j[lt]=0,$[lt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:j,attributeDivisors:$,object:R,attributes:{},index:null}}function M(R,B,j,$){const lt=c.attributes,ft=B.attributes;let z=0;const Q=j.getAttributes();for(const K in Q)if(Q[K].location>=0){const Tt=lt[K];let P=ft[K];if(P===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(P=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(P=R.instanceColor)),Tt===void 0||Tt.attribute!==P||P&&Tt.data!==P.data)return!0;z++}return c.attributesNum!==z||c.index!==$}function E(R,B,j,$){const lt={},ft=B.attributes;let z=0;const Q=j.getAttributes();for(const K in Q)if(Q[K].location>=0){let Tt=ft[K];Tt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(Tt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(Tt=R.instanceColor));const P={};P.attribute=Tt,Tt&&Tt.data&&(P.data=Tt.data),lt[K]=P,z++}c.attributes=lt,c.attributesNum=z,c.index=$}function T(){const R=c.newAttributes;for(let B=0,j=R.length;B<j;B++)R[B]=0}function S(R){v(R,0)}function v(R,B){const j=c.newAttributes,$=c.enabledAttributes,lt=c.attributeDivisors;j[R]=1,$[R]===0&&(r.enableVertexAttribArray(R),$[R]=1),lt[R]!==B&&(r.vertexAttribDivisor(R,B),lt[R]=B)}function L(){const R=c.newAttributes,B=c.enabledAttributes;for(let j=0,$=B.length;j<$;j++)B[j]!==R[j]&&(r.disableVertexAttribArray(j),B[j]=0)}function D(R,B,j,$,lt,ft,z){z===!0?r.vertexAttribIPointer(R,B,j,lt,ft):r.vertexAttribPointer(R,B,j,$,lt,ft)}function w(R,B,j,$){T();const lt=$.attributes,ft=j.getAttributes(),z=B.defaultAttributeValues;for(const Q in ft){const K=ft[Q];if(K.location>=0){let St=lt[Q];if(St===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(St=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(St=R.instanceColor)),St!==void 0){const Tt=St.normalized,P=St.itemSize,st=t.get(St);if(st===void 0)continue;const yt=st.buffer,Z=st.type,ht=st.bytesPerElement,Et=Z===r.INT||Z===r.UNSIGNED_INT||St.gpuType===sp;if(St.isInterleavedBufferAttribute){const xt=St.data,Vt=xt.stride,Gt=St.offset;if(xt.isInstancedInterleavedBuffer){for(let ae=0;ae<K.locationSize;ae++)v(K.location+ae,xt.meshPerAttribute);R.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let ae=0;ae<K.locationSize;ae++)S(K.location+ae);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let ae=0;ae<K.locationSize;ae++)D(K.location+ae,P/K.locationSize,Z,Tt,Vt*ht,(Gt+P/K.locationSize*ae)*ht,Et)}else{if(St.isInstancedBufferAttribute){for(let xt=0;xt<K.locationSize;xt++)v(K.location+xt,St.meshPerAttribute);R.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let xt=0;xt<K.locationSize;xt++)S(K.location+xt);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let xt=0;xt<K.locationSize;xt++)D(K.location+xt,P/K.locationSize,Z,Tt,P*ht,P/K.locationSize*xt*ht,Et)}}else if(z!==void 0){const Tt=z[Q];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(K.location,Tt);break;case 3:r.vertexAttrib3fv(K.location,Tt);break;case 4:r.vertexAttrib4fv(K.location,Tt);break;default:r.vertexAttrib1fv(K.location,Tt)}}}}L()}function W(){H();for(const R in a){const B=a[R];for(const j in B){const $=B[j];for(const lt in $)g($[lt].object),delete $[lt];delete B[j]}delete a[R]}}function F(R){if(a[R.id]===void 0)return;const B=a[R.id];for(const j in B){const $=B[j];for(const lt in $)g($[lt].object),delete $[lt];delete B[j]}delete a[R.id]}function O(R){for(const B in a){const j=a[B];if(j[R.id]===void 0)continue;const $=j[R.id];for(const lt in $)g($[lt].object),delete $[lt];delete j[R.id]}}function H(){U(),f=!0,c!==l&&(c=l,p(c.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:H,resetDefaultState:U,dispose:W,releaseStatesOfGeometry:F,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:S,disableUnusedAttributes:L}}function $T(r,t,n){let a;function l(p){a=p}function c(p,g){r.drawArrays(a,p,g),n.update(g,a,1)}function f(p,g,_){_!==0&&(r.drawArraysInstanced(a,p,g,_),n.update(g,a,_))}function d(p,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,p,0,g,0,_);let M=0;for(let E=0;E<_;E++)M+=g[E];n.update(M,a,1)}function m(p,g,_,x){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<p.length;E++)f(p[E],g[E],x[E]);else{M.multiDrawArraysInstancedWEBGL(a,p,0,g,0,x,0,_);let E=0;for(let T=0;T<_;T++)E+=g[T]*x[T];n.update(E,a,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function tb(r,t,n,a){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const O=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==Ii&&a.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const H=O===Jr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(O!==Aa&&a.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==Ma&&!H)}function m(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),D=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),W=E>0,F=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:S,maxAttributes:v,maxVertexUniforms:L,maxVaryings:D,maxFragmentUniforms:w,vertexTextures:W,maxSamples:F}}function eb(r){const t=this;let n=null,a=0,l=!1,c=!1;const f=new Ps,d=new ce,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const M=_.length!==0||x||a!==0||l;return l=x,a=_.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,x){n=g(_,x,0)},this.setState=function(_,x,M){const E=_.clippingPlanes,T=_.clipIntersection,S=_.clipShadows,v=r.get(_);if(!l||E===null||E.length===0||c&&!S)c?g(null):p();else{const L=c?0:a,D=L*4;let w=v.clippingState||null;m.value=w,w=g(E,x,D,M);for(let W=0;W!==D;++W)w[W]=n[W];v.clippingState=w,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=L}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,x,M,E){const T=_!==null?_.length:0;let S=null;if(T!==0){if(S=m.value,E!==!0||S===null){const v=M+T*4,L=x.matrixWorldInverse;d.getNormalMatrix(L),(S===null||S.length<v)&&(S=new Float32Array(v));for(let D=0,w=M;D!==T;++D,w+=4)f.copy(_[D]).applyMatrix4(L,d),f.normal.toArray(S,w),S[w+3]=f.constant}m.value=S,m.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function nb(r){let t=new WeakMap;function n(f,d){return d===Td?f.mapping=Yr:d===bd&&(f.mapping=jr),f}function a(f){if(f&&f.isTexture){const d=f.mapping;if(d===Td||d===bd)if(t.has(f)){const m=t.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new dE(m.height);return p.fromEquirectangularTexture(r,f),t.set(f,p),f.addEventListener("dispose",l),n(p.texture,f.mapping)}else return null}}return f}function l(f){const d=f.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:a,dispose:c}}class hx extends lx{constructor(t=-1,n=1,a=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=a-t,f=a+t,d=l+n,m=l-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Gr=4,j_=[.125,.215,.35,.446,.526,.582],Is=20,sd=new hx,Z_=new fe;let rd=null,od=0,ld=0,cd=!1;const zs=(1+Math.sqrt(5))/2,Br=1/zs,K_=[new J(-zs,Br,0),new J(zs,Br,0),new J(-Br,0,zs),new J(Br,0,zs),new J(0,zs,-Br),new J(0,zs,Br),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class Q_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,a=.1,l=100){rd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ld=this._renderer.getActiveMipmapLevel(),cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,a,l,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(rd,od,ld),this._renderer.xr.enabled=cd,t.scissorTest=!1,kc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Yr||t.mapping===jr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ld=this._renderer.getActiveMipmapLevel(),cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:ji,minFilter:ji,generateMipmaps:!1,type:Jr,format:Ii,colorSpace:$r,depthBuffer:!1},l=J_(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=J_(t,n,a);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ib(c)),this._blurMaterial=ab(c,t,n)}return l}_compileMaterial(t){const n=new Ln(this._lodPlanes[0],t);this._renderer.compile(n,sd)}_sceneToCubeUV(t,n,a,l){const d=new Ai(90,1,n,a),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(Z_),g.toneMapping=os,g.autoClear=!1;const M=new Hr({name:"PMREM.Background",side:ei,depthWrite:!1,depthTest:!1}),E=new Ln(new Ne,M);let T=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,T=!0):(M.color.copy(Z_),T=!0);for(let v=0;v<6;v++){const L=v%3;L===0?(d.up.set(0,m[v],0),d.lookAt(p[v],0,0)):L===1?(d.up.set(0,0,m[v]),d.lookAt(0,p[v],0)):(d.up.set(0,m[v],0),d.lookAt(0,0,p[v]));const D=this._cubeSize;kc(l,L*D,v>2?D:0,D,D),g.setRenderTarget(l),T&&g.render(E,d),g.render(t,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=_,t.background=S}_textureToCubeUV(t,n){const a=this._renderer,l=t.mapping===Yr||t.mapping===jr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=tv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new Ln(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;kc(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(f,sd)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=K_[(l-c-1)%K_.length];this._blur(t,c-1,c,f,d)}n.autoClear=a}_blur(t,n,a,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,a,l,"latitudinal",c),this._halfBlur(f,t,a,a,l,"longitudinal",c)}_halfBlur(t,n,a,l,c,f,d){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Ln(this._lodPlanes[l],p),x=p.uniforms,M=this._sizeLods[a]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Is-1),T=c/E,S=isFinite(c)?1+Math.floor(g*T):Is;S>Is&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Is}`);const v=[];let L=0;for(let O=0;O<Is;++O){const H=O/T,U=Math.exp(-H*H/2);v.push(U),O===0?L+=U:O<S&&(L+=2*U)}for(let O=0;O<v.length;O++)v[O]=v[O]/L;x.envMap.value=t.texture,x.samples.value=S,x.weights.value=v,x.latitudinal.value=f==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:D}=this;x.dTheta.value=E,x.mipInt.value=D-a;const w=this._sizeLods[l],W=3*w*(l>D-Gr?l-D+Gr:0),F=4*(this._cubeSize-w);kc(n,W,F,3*w,2*w),m.setRenderTarget(n),m.render(_,sd)}}function ib(r){const t=[],n=[],a=[];let l=r;const c=r-Gr+1+j_.length;for(let f=0;f<c;f++){const d=Math.pow(2,l);n.push(d);let m=1/d;f>r-Gr?m=j_[f-r+Gr-1]:f===0&&(m=0),a.push(m);const p=1/(d-2),g=-p,_=1+p,x=[g,g,_,g,_,_,g,g,_,_,g,_],M=6,E=6,T=3,S=2,v=1,L=new Float32Array(T*E*M),D=new Float32Array(S*E*M),w=new Float32Array(v*E*M);for(let F=0;F<M;F++){const O=F%3*2/3-1,H=F>2?0:-1,U=[O,H,0,O+2/3,H,0,O+2/3,H+1,0,O,H,0,O+2/3,H+1,0,O,H+1,0];L.set(U,T*E*F),D.set(x,S*E*F);const R=[F,F,F,F,F,F];w.set(R,v*E*F)}const W=new kn;W.setAttribute("position",new di(L,T)),W.setAttribute("uv",new di(D,S)),W.setAttribute("faceIndex",new di(w,v)),t.push(W),l>Gr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:a}}function J_(r,t,n){const a=new cs(r,t,n);return a.texture.mapping=du,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function kc(r,t,n,a,l){r.viewport.set(t,n,a,l),r.scissor.set(t,n,a,l)}function ab(r,t,n){const a=new Float32Array(Is),l=new J(0,1,0);return new Hi({name:"SphericalGaussianBlur",defines:{n:Is,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:dp(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function $_(){return new Hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dp(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function tv(){return new Hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function dp(){return`

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
	`}function sb(r){let t=new WeakMap,n=null;function a(d){if(d&&d.isTexture){const m=d.mapping,p=m===Td||m===bd,g=m===Yr||m===jr;if(p||g){let _=t.get(d);const x=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new Q_(r)),_=p?n.fromEquirectangular(d,_):n.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(n===null&&(n=new Q_(r)),_=p?n.fromEquirectangular(d):n.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:a,dispose:f}}function rb(r){const t={};function n(a){if(t[a]!==void 0)return t[a];let l;switch(a){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(a)}return t[a]=l,l}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const l=n(a);return l===null&&sl("THREE.WebGLRenderer: "+a+" extension not supported."),l}}}function ob(r,t,n,a){const l={},c=new WeakMap;function f(_){const x=_.target;x.index!==null&&t.remove(x.index);for(const E in x.attributes)t.remove(x.attributes[E]);for(const E in x.morphAttributes){const T=x.morphAttributes[E];for(let S=0,v=T.length;S<v;S++)t.remove(T[S])}x.removeEventListener("dispose",f),delete l[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),a.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(_,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,n.memory.geometries++),x}function m(_){const x=_.attributes;for(const E in x)t.update(x[E],r.ARRAY_BUFFER);const M=_.morphAttributes;for(const E in M){const T=M[E];for(let S=0,v=T.length;S<v;S++)t.update(T[S],r.ARRAY_BUFFER)}}function p(_){const x=[],M=_.index,E=_.attributes.position;let T=0;if(M!==null){const L=M.array;T=M.version;for(let D=0,w=L.length;D<w;D+=3){const W=L[D+0],F=L[D+1],O=L[D+2];x.push(W,F,F,O,O,W)}}else if(E!==void 0){const L=E.array;T=E.version;for(let D=0,w=L.length/3-1;D<w;D+=3){const W=D+0,F=D+1,O=D+2;x.push(W,F,F,O,O,W)}}else return;const S=new(tx(x)?rx:sx)(x,1);S.version=T;const v=c.get(_);v&&t.remove(v),c.set(_,S)}function g(_){const x=c.get(_);if(x){const M=_.index;M!==null&&x.version<M.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:g}}function lb(r,t,n){let a;function l(x){a=x}let c,f;function d(x){c=x.type,f=x.bytesPerElement}function m(x,M){r.drawElements(a,M,c,x*f),n.update(M,a,1)}function p(x,M,E){E!==0&&(r.drawElementsInstanced(a,M,c,x*f,E),n.update(M,a,E))}function g(x,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,M,0,c,x,0,E);let S=0;for(let v=0;v<E;v++)S+=M[v];n.update(S,a,1)}function _(x,M,E,T){if(E===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let v=0;v<x.length;v++)p(x[v]/f,M[v],T[v]);else{S.multiDrawElementsInstancedWEBGL(a,M,0,c,x,0,T,0,E);let v=0;for(let L=0;L<E;L++)v+=M[L]*T[L];n.update(v,a,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function cb(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,f,d){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=d*(c/3);break;case r.LINES:n.lines+=d*(c/2);break;case r.LINE_STRIP:n.lines+=d*(c-1);break;case r.LINE_LOOP:n.lines+=d*c;break;case r.POINTS:n.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:a}}function ub(r,t,n){const a=new WeakMap,l=new on;function c(f,d,m){const p=f.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let x=a.get(d);if(x===void 0||x.count!==_){let R=function(){H.dispose(),a.delete(d),d.removeEventListener("dispose",R)};var M=R;x!==void 0&&x.texture.dispose();const E=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],L=d.morphAttributes.normal||[],D=d.morphAttributes.color||[];let w=0;E===!0&&(w=1),T===!0&&(w=2),S===!0&&(w=3);let W=d.attributes.position.count*w,F=1;W>t.maxTextureSize&&(F=Math.ceil(W/t.maxTextureSize),W=t.maxTextureSize);const O=new Float32Array(W*F*4*_),H=new nx(O,W,F,_);H.type=Ma,H.needsUpdate=!0;const U=w*4;for(let B=0;B<_;B++){const j=v[B],$=L[B],lt=D[B],ft=W*F*4*B;for(let z=0;z<j.count;z++){const Q=z*U;E===!0&&(l.fromBufferAttribute(j,z),O[ft+Q+0]=l.x,O[ft+Q+1]=l.y,O[ft+Q+2]=l.z,O[ft+Q+3]=0),T===!0&&(l.fromBufferAttribute($,z),O[ft+Q+4]=l.x,O[ft+Q+5]=l.y,O[ft+Q+6]=l.z,O[ft+Q+7]=0),S===!0&&(l.fromBufferAttribute(lt,z),O[ft+Q+8]=l.x,O[ft+Q+9]=l.y,O[ft+Q+10]=l.z,O[ft+Q+11]=lt.itemSize===4?l.w:1)}}x={count:_,texture:H,size:new Ce(W,F)},a.set(d,x),d.addEventListener("dispose",R)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let E=0;for(let S=0;S<p.length;S++)E+=p[S];const T=d.morphTargetsRelative?1:1-E;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function fb(r,t,n,a){let l=new WeakMap;function c(m){const p=a.render.frame,g=m.geometry,_=t.get(m,g);if(l.get(_)!==p&&(t.update(_),l.set(_,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(n.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;l.get(x)!==p&&(x.update(),l.set(x,p))}return _}function f(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:c,dispose:f}}class dx extends Gn{constructor(t,n,a,l,c,f,d,m,p,g=Xr){if(g!==Xr&&g!==Kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&g===Xr&&(a=ks),a===void 0&&g===Kr&&(a=Zr),super(null,l,c,f,d,m,g,a,p),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=d!==void 0?d:Fi,this.minFilter=m!==void 0?m:Fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const px=new Gn,ev=new dx(1,1),mx=new nx,gx=new JM,_x=new cx,nv=[],iv=[],av=new Float32Array(16),sv=new Float32Array(9),rv=new Float32Array(4);function no(r,t,n){const a=r[0];if(a<=0||a>0)return r;const l=t*n;let c=nv[l];if(c===void 0&&(c=new Float32Array(l),nv[l]=c),t!==0){a.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=n,r[f].toArray(c,d)}return c}function xn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function yn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function gu(r,t){let n=iv[t];n===void 0&&(n=new Int32Array(t),iv[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function hb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function db(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;r.uniform2fv(this.addr,t),yn(n,t)}}function pb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(xn(n,t))return;r.uniform3fv(this.addr,t),yn(n,t)}}function mb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;r.uniform4fv(this.addr,t),yn(n,t)}}function gb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(xn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),yn(n,t)}else{if(xn(n,a))return;rv.set(a),r.uniformMatrix2fv(this.addr,!1,rv),yn(n,a)}}function _b(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(xn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),yn(n,t)}else{if(xn(n,a))return;sv.set(a),r.uniformMatrix3fv(this.addr,!1,sv),yn(n,a)}}function vb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(xn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),yn(n,t)}else{if(xn(n,a))return;av.set(a),r.uniformMatrix4fv(this.addr,!1,av),yn(n,a)}}function xb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function yb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;r.uniform2iv(this.addr,t),yn(n,t)}}function Sb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xn(n,t))return;r.uniform3iv(this.addr,t),yn(n,t)}}function Mb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;r.uniform4iv(this.addr,t),yn(n,t)}}function Eb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function Tb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;r.uniform2uiv(this.addr,t),yn(n,t)}}function bb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xn(n,t))return;r.uniform3uiv(this.addr,t),yn(n,t)}}function Ab(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;r.uniform4uiv(this.addr,t),yn(n,t)}}function Rb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(ev.compareFunction=$v,c=ev):c=px,n.setTexture2D(t||c,l)}function wb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture3D(t||gx,l)}function Cb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTextureCube(t||_x,l)}function Db(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture2DArray(t||mx,l)}function Ub(r){switch(r){case 5126:return hb;case 35664:return db;case 35665:return pb;case 35666:return mb;case 35674:return gb;case 35675:return _b;case 35676:return vb;case 5124:case 35670:return xb;case 35667:case 35671:return yb;case 35668:case 35672:return Sb;case 35669:case 35673:return Mb;case 5125:return Eb;case 36294:return Tb;case 36295:return bb;case 36296:return Ab;case 35678:case 36198:case 36298:case 36306:case 35682:return Rb;case 35679:case 36299:case 36307:return wb;case 35680:case 36300:case 36308:case 36293:return Cb;case 36289:case 36303:case 36311:case 36292:return Db}}function Lb(r,t){r.uniform1fv(this.addr,t)}function Nb(r,t){const n=no(t,this.size,2);r.uniform2fv(this.addr,n)}function Ob(r,t){const n=no(t,this.size,3);r.uniform3fv(this.addr,n)}function Pb(r,t){const n=no(t,this.size,4);r.uniform4fv(this.addr,n)}function zb(r,t){const n=no(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function Bb(r,t){const n=no(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function Ib(r,t){const n=no(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function Fb(r,t){r.uniform1iv(this.addr,t)}function Hb(r,t){r.uniform2iv(this.addr,t)}function Gb(r,t){r.uniform3iv(this.addr,t)}function Vb(r,t){r.uniform4iv(this.addr,t)}function kb(r,t){r.uniform1uiv(this.addr,t)}function Xb(r,t){r.uniform2uiv(this.addr,t)}function qb(r,t){r.uniform3uiv(this.addr,t)}function Wb(r,t){r.uniform4uiv(this.addr,t)}function Yb(r,t,n){const a=this.cache,l=t.length,c=gu(n,l);xn(a,c)||(r.uniform1iv(this.addr,c),yn(a,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||px,c[f])}function jb(r,t,n){const a=this.cache,l=t.length,c=gu(n,l);xn(a,c)||(r.uniform1iv(this.addr,c),yn(a,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||gx,c[f])}function Zb(r,t,n){const a=this.cache,l=t.length,c=gu(n,l);xn(a,c)||(r.uniform1iv(this.addr,c),yn(a,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||_x,c[f])}function Kb(r,t,n){const a=this.cache,l=t.length,c=gu(n,l);xn(a,c)||(r.uniform1iv(this.addr,c),yn(a,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||mx,c[f])}function Qb(r){switch(r){case 5126:return Lb;case 35664:return Nb;case 35665:return Ob;case 35666:return Pb;case 35674:return zb;case 35675:return Bb;case 35676:return Ib;case 5124:case 35670:return Fb;case 35667:case 35671:return Hb;case 35668:case 35672:return Gb;case 35669:case 35673:return Vb;case 5125:return kb;case 36294:return Xb;case 36295:return qb;case 36296:return Wb;case 35678:case 36198:case 36298:case 36306:case 35682:return Yb;case 35679:case 36299:case 36307:return jb;case 35680:case 36300:case 36308:case 36293:return Zb;case 36289:case 36303:case 36311:case 36292:return Kb}}class Jb{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=Ub(n.type)}}class $b{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Qb(n.type)}}class tA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,n[d.id],a)}}}const ud=/(\w+)(\])?(\[|\.)?/g;function ov(r,t){r.seq.push(t),r.map[t.id]=t}function eA(r,t,n){const a=r.name,l=a.length;for(ud.lastIndex=0;;){const c=ud.exec(a),f=ud.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&f+2===l){ov(n,p===void 0?new Jb(d,r,t):new $b(d,r,t));break}else{let _=n.map[d];_===void 0&&(_=new tA(d),ov(n,_)),n=_}}}class su{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<a;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);eA(c,f,this)}}setValue(t,n,a,l){const c=this.map[n];c!==void 0&&c.setValue(t,a,l)}setOptional(t,n,a){const l=n[a];l!==void 0&&this.setValue(t,a,l)}static upload(t,n,a,l){for(let c=0,f=n.length;c!==f;++c){const d=n[c],m=a[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,n){const a=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&a.push(f)}return a}}function lv(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const nA=37297;let iA=0;function aA(r,t){const n=r.split(`
`),a=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const d=f+1;a.push(`${d===t?">":" "} ${d}: ${n[f]}`)}return a.join(`
`)}const cv=new ce;function sA(r){Ae._getMatrix(cv,Ae.workingColorSpace,r);const t=`mat3( ${cv.elements.map(n=>n.toFixed(4))} )`;switch(Ae.getTransfer(r)){case pu:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function uv(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(a&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+aA(r.getShaderSource(t),f)}else return l}function rA(r,t){const n=sA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function oA(r,t){let n;switch(t){case zv:n="Linear";break;case Bv:n="Reinhard";break;case Iv:n="Cineon";break;case Fv:n="ACESFilmic";break;case Hv:n="AgX";break;case Gv:n="Neutral";break;case DM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xc=new J;function lA(){Ae.getLuminanceCoefficients(Xc);const r=Xc.x.toFixed(4),t=Xc.y.toFixed(4),n=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rl).join(`
`)}function uA(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function fA(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<a;l++){const c=r.getActiveAttrib(t,l),f=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:d}}return n}function rl(r){return r!==""}function fv(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function hv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hA=/^[ \t]*#include +<([\w\d./]+)>/gm;function tp(r){return r.replace(hA,pA)}const dA=new Map;function pA(r,t){let n=ue[t];if(n===void 0){const a=dA.get(t);if(a!==void 0)n=ue[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("Can not resolve #include <"+t+">")}return tp(n)}const mA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dv(r){return r.replace(mA,gA)}function gA(r,t,n,a){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function pv(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function _A(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ov?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===cM?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ya&&(t="SHADOWMAP_TYPE_VSM"),t}function vA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Yr:case jr:t="ENVMAP_TYPE_CUBE";break;case du:t="ENVMAP_TYPE_CUBE_UV";break}return t}function xA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case jr:t="ENVMAP_MODE_REFRACTION";break}return t}function yA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Pv:t="ENVMAP_BLENDING_MULTIPLY";break;case wM:t="ENVMAP_BLENDING_MIX";break;case CM:t="ENVMAP_BLENDING_ADD";break}return t}function SA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function MA(r,t,n,a){const l=r.getContext(),c=n.defines;let f=n.vertexShader,d=n.fragmentShader;const m=_A(n),p=vA(n),g=xA(n),_=yA(n),x=SA(n),M=cA(n),E=uA(c),T=l.createProgram();let S,v,L=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(rl).join(`
`),S.length>0&&(S+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(rl).join(`
`),v.length>0&&(v+=`
`)):(S=[pv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rl).join(`
`),v=[pv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==os?"#define TONE_MAPPING":"",n.toneMapping!==os?ue.tonemapping_pars_fragment:"",n.toneMapping!==os?oA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ue.colorspace_pars_fragment,rA("linearToOutputTexel",n.outputColorSpace),lA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(rl).join(`
`)),f=tp(f),f=fv(f,n),f=hv(f,n),d=tp(d),d=fv(d,n),d=hv(d,n),f=dv(f),d=dv(d),n.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,v=["#define varying in",n.glslVersion===R_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===R_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const D=L+S+f,w=L+v+d,W=lv(l,l.VERTEX_SHADER,D),F=lv(l,l.FRAGMENT_SHADER,w);l.attachShader(T,W),l.attachShader(T,F),n.index0AttributeName!==void 0?l.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function O(B){if(r.debug.checkShaderErrors){const j=l.getProgramInfoLog(T).trim(),$=l.getShaderInfoLog(W).trim(),lt=l.getShaderInfoLog(F).trim();let ft=!0,z=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(ft=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,W,F);else{const Q=uv(l,W,"vertex"),K=uv(l,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+j+`
`+Q+`
`+K)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):($===""||lt==="")&&(z=!1);z&&(B.diagnostics={runnable:ft,programLog:j,vertexShader:{log:$,prefix:S},fragmentShader:{log:lt,prefix:v}})}l.deleteShader(W),l.deleteShader(F),H=new su(l,T),U=fA(l,T)}let H;this.getUniforms=function(){return H===void 0&&O(this),H};let U;this.getAttributes=function(){return U===void 0&&O(this),U};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=l.getProgramParameter(T,nA)),R},this.destroy=function(){a.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=iA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=W,this.fragmentShader=F,this}let EA=0;class TA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,a=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(a),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new bA(t),n.set(t,a)),a}}class bA{constructor(t){this.id=EA++,this.code=t,this.usedTimes=0}}function AA(r,t,n,a,l,c,f){const d=new ix,m=new TA,p=new Set,g=[],_=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(U){return p.add(U),U===0?"uv":`uv${U}`}function S(U,R,B,j,$){const lt=j.fog,ft=$.geometry,z=U.isMeshStandardMaterial?j.environment:null,Q=(U.isMeshStandardMaterial?n:t).get(U.envMap||z),K=Q&&Q.mapping===du?Q.image.height:null,St=E[U.type];U.precision!==null&&(M=l.getMaxPrecision(U.precision),M!==U.precision&&console.warn("THREE.WebGLProgram.getParameters:",U.precision,"not supported, using",M,"instead."));const Tt=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,P=Tt!==void 0?Tt.length:0;let st=0;ft.morphAttributes.position!==void 0&&(st=1),ft.morphAttributes.normal!==void 0&&(st=2),ft.morphAttributes.color!==void 0&&(st=3);let yt,Z,ht,Et;if(St){const Re=Yi[St];yt=Re.vertexShader,Z=Re.fragmentShader}else yt=U.vertexShader,Z=U.fragmentShader,m.update(U),ht=m.getVertexShaderID(U),Et=m.getFragmentShaderID(U);const xt=r.getRenderTarget(),Vt=r.state.buffers.depth.getReversed(),Gt=$.isInstancedMesh===!0,ae=$.isBatchedMesh===!0,He=!!U.map,de=!!U.matcap,Ke=!!Q,q=!!U.aoMap,Nn=!!U.lightMap,he=!!U.bumpMap,ge=!!U.normalMap,Qt=!!U.displacementMap,Pe=!!U.emissiveMap,Zt=!!U.metalnessMap,N=!!U.roughnessMap,A=U.anisotropy>0,at=U.clearcoat>0,pt=U.dispersion>0,Mt=U.iridescence>0,gt=U.sheen>0,Wt=U.transmission>0,Ut=A&&!!U.anisotropyMap,zt=at&&!!U.clearcoatMap,_e=at&&!!U.clearcoatNormalMap,At=at&&!!U.clearcoatRoughnessMap,Bt=Mt&&!!U.iridescenceMap,Kt=Mt&&!!U.iridescenceThicknessMap,Yt=gt&&!!U.sheenColorMap,Ot=gt&&!!U.sheenRoughnessMap,te=!!U.specularMap,re=!!U.specularColorMap,Ge=!!U.specularIntensityMap,V=Wt&&!!U.transmissionMap,Rt=Wt&&!!U.thicknessMap,ut=!!U.gradientMap,vt=!!U.alphaMap,wt=U.alphaTest>0,Lt=!!U.alphaHash,ee=!!U.extensions;let Qe=os;U.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(Qe=r.toneMapping);const pn={shaderID:St,shaderType:U.type,shaderName:U.name,vertexShader:yt,fragmentShader:Z,defines:U.defines,customVertexShaderID:ht,customFragmentShaderID:Et,isRawShaderMaterial:U.isRawShaderMaterial===!0,glslVersion:U.glslVersion,precision:M,batching:ae,batchingColor:ae&&$._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&$.instanceColor!==null,instancingMorph:Gt&&$.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:xt===null?r.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:$r,alphaToCoverage:!!U.alphaToCoverage,map:He,matcap:de,envMap:Ke,envMapMode:Ke&&Q.mapping,envMapCubeUVHeight:K,aoMap:q,lightMap:Nn,bumpMap:he,normalMap:ge,displacementMap:x&&Qt,emissiveMap:Pe,normalMapObjectSpace:ge&&U.normalMapType===PM,normalMapTangentSpace:ge&&U.normalMapType===OM,metalnessMap:Zt,roughnessMap:N,anisotropy:A,anisotropyMap:Ut,clearcoat:at,clearcoatMap:zt,clearcoatNormalMap:_e,clearcoatRoughnessMap:At,dispersion:pt,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:Yt,sheenRoughnessMap:Ot,specularMap:te,specularColorMap:re,specularIntensityMap:Ge,transmission:Wt,transmissionMap:V,thicknessMap:Rt,gradientMap:ut,opaque:U.transparent===!1&&U.blending===kr&&U.alphaToCoverage===!1,alphaMap:vt,alphaTest:wt,alphaHash:Lt,combine:U.combine,mapUv:He&&T(U.map.channel),aoMapUv:q&&T(U.aoMap.channel),lightMapUv:Nn&&T(U.lightMap.channel),bumpMapUv:he&&T(U.bumpMap.channel),normalMapUv:ge&&T(U.normalMap.channel),displacementMapUv:Qt&&T(U.displacementMap.channel),emissiveMapUv:Pe&&T(U.emissiveMap.channel),metalnessMapUv:Zt&&T(U.metalnessMap.channel),roughnessMapUv:N&&T(U.roughnessMap.channel),anisotropyMapUv:Ut&&T(U.anisotropyMap.channel),clearcoatMapUv:zt&&T(U.clearcoatMap.channel),clearcoatNormalMapUv:_e&&T(U.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&T(U.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&T(U.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(U.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&T(U.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&T(U.sheenRoughnessMap.channel),specularMapUv:te&&T(U.specularMap.channel),specularColorMapUv:re&&T(U.specularColorMap.channel),specularIntensityMapUv:Ge&&T(U.specularIntensityMap.channel),transmissionMapUv:V&&T(U.transmissionMap.channel),thicknessMapUv:Rt&&T(U.thicknessMap.channel),alphaMapUv:vt&&T(U.alphaMap.channel),vertexTangents:!!ft.attributes.tangent&&(ge||A),vertexColors:U.vertexColors,vertexAlphas:U.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!ft.attributes.uv&&(He||vt),fog:!!lt,useFog:U.fog===!0,fogExp2:!!lt&&lt.isFogExp2,flatShading:U.flatShading===!0,sizeAttenuation:U.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Vt,skinning:$.isSkinnedMesh===!0,morphTargets:ft.morphAttributes.position!==void 0,morphNormals:ft.morphAttributes.normal!==void 0,morphColors:ft.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:st,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:U.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:Qe,decodeVideoTexture:He&&U.map.isVideoTexture===!0&&Ae.getTransfer(U.map.colorSpace)===Fe,decodeVideoTextureEmissive:Pe&&U.emissiveMap.isVideoTexture===!0&&Ae.getTransfer(U.emissiveMap.colorSpace)===Fe,premultipliedAlpha:U.premultipliedAlpha,doubleSided:U.side===Sa,flipSided:U.side===ei,useDepthPacking:U.depthPacking>=0,depthPacking:U.depthPacking||0,index0AttributeName:U.index0AttributeName,extensionClipCullDistance:ee&&U.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&U.extensions.multiDraw===!0||ae)&&a.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:U.customProgramCacheKey()};return pn.vertexUv1s=p.has(1),pn.vertexUv2s=p.has(2),pn.vertexUv3s=p.has(3),p.clear(),pn}function v(U){const R=[];if(U.shaderID?R.push(U.shaderID):(R.push(U.customVertexShaderID),R.push(U.customFragmentShaderID)),U.defines!==void 0)for(const B in U.defines)R.push(B),R.push(U.defines[B]);return U.isRawShaderMaterial===!1&&(L(R,U),D(R,U),R.push(r.outputColorSpace)),R.push(U.customProgramCacheKey),R.join()}function L(U,R){U.push(R.precision),U.push(R.outputColorSpace),U.push(R.envMapMode),U.push(R.envMapCubeUVHeight),U.push(R.mapUv),U.push(R.alphaMapUv),U.push(R.lightMapUv),U.push(R.aoMapUv),U.push(R.bumpMapUv),U.push(R.normalMapUv),U.push(R.displacementMapUv),U.push(R.emissiveMapUv),U.push(R.metalnessMapUv),U.push(R.roughnessMapUv),U.push(R.anisotropyMapUv),U.push(R.clearcoatMapUv),U.push(R.clearcoatNormalMapUv),U.push(R.clearcoatRoughnessMapUv),U.push(R.iridescenceMapUv),U.push(R.iridescenceThicknessMapUv),U.push(R.sheenColorMapUv),U.push(R.sheenRoughnessMapUv),U.push(R.specularMapUv),U.push(R.specularColorMapUv),U.push(R.specularIntensityMapUv),U.push(R.transmissionMapUv),U.push(R.thicknessMapUv),U.push(R.combine),U.push(R.fogExp2),U.push(R.sizeAttenuation),U.push(R.morphTargetsCount),U.push(R.morphAttributeCount),U.push(R.numDirLights),U.push(R.numPointLights),U.push(R.numSpotLights),U.push(R.numSpotLightMaps),U.push(R.numHemiLights),U.push(R.numRectAreaLights),U.push(R.numDirLightShadows),U.push(R.numPointLightShadows),U.push(R.numSpotLightShadows),U.push(R.numSpotLightShadowsWithMaps),U.push(R.numLightProbes),U.push(R.shadowMapType),U.push(R.toneMapping),U.push(R.numClippingPlanes),U.push(R.numClipIntersection),U.push(R.depthPacking)}function D(U,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),U.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reverseDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),U.push(d.mask)}function w(U){const R=E[U.type];let B;if(R){const j=Yi[R];B=hp.clone(j.uniforms)}else B=U.uniforms;return B}function W(U,R){let B;for(let j=0,$=g.length;j<$;j++){const lt=g[j];if(lt.cacheKey===R){B=lt,++B.usedTimes;break}}return B===void 0&&(B=new MA(r,R,U,c),g.push(B)),B}function F(U){if(--U.usedTimes===0){const R=g.indexOf(U);g[R]=g[g.length-1],g.pop(),U.destroy()}}function O(U){m.remove(U)}function H(){m.dispose()}return{getParameters:S,getProgramCacheKey:v,getUniforms:w,acquireProgram:W,releaseProgram:F,releaseShaderCache:O,programs:g,dispose:H}}function RA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let d=r.get(f);return d===void 0&&(d={},r.set(f,d)),d}function a(f){r.delete(f)}function l(f,d,m){r.get(f)[d]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:l,dispose:c}}function wA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function mv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function gv(){const r=[];let t=0;const n=[],a=[],l=[];function c(){t=0,n.length=0,a.length=0,l.length=0}function f(_,x,M,E,T,S){let v=r[t];return v===void 0?(v={id:_.id,object:_,geometry:x,material:M,groupOrder:E,renderOrder:_.renderOrder,z:T,group:S},r[t]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=M,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=T,v.group=S),t++,v}function d(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?a.push(v):M.transparent===!0?l.push(v):n.push(v)}function m(_,x,M,E,T,S){const v=f(_,x,M,E,T,S);M.transmission>0?a.unshift(v):M.transparent===!0?l.unshift(v):n.unshift(v)}function p(_,x){n.length>1&&n.sort(_||wA),a.length>1&&a.sort(x||mv),l.length>1&&l.sort(x||mv)}function g(){for(let _=t,x=r.length;_<x;_++){const M=r[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:a,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function CA(){let r=new WeakMap;function t(a,l){const c=r.get(a);let f;return c===void 0?(f=new gv,r.set(a,[f])):l>=c.length?(f=new gv,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function DA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new J,color:new fe};break;case"SpotLight":n={position:new J,direction:new J,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new fe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":n={color:new fe,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=n,n}}}function UA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let LA=0;function NA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function OA(r){const t=new DA,n=UA(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new J);const l=new J,c=new an,f=new an;function d(p){let g=0,_=0,x=0;for(let U=0;U<9;U++)a.probe[U].set(0,0,0);let M=0,E=0,T=0,S=0,v=0,L=0,D=0,w=0,W=0,F=0,O=0;p.sort(NA);for(let U=0,R=p.length;U<R;U++){const B=p[U],j=B.color,$=B.intensity,lt=B.distance,ft=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)g+=j.r*$,_+=j.g*$,x+=j.b*$;else if(B.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(B.sh.coefficients[z],$);O++}else if(B.isDirectionalLight){const z=t.get(B);if(z.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const Q=B.shadow,K=n.get(B);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,a.directionalShadow[M]=K,a.directionalShadowMap[M]=ft,a.directionalShadowMatrix[M]=B.shadow.matrix,L++}a.directional[M]=z,M++}else if(B.isSpotLight){const z=t.get(B);z.position.setFromMatrixPosition(B.matrixWorld),z.color.copy(j).multiplyScalar($),z.distance=lt,z.coneCos=Math.cos(B.angle),z.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),z.decay=B.decay,a.spot[T]=z;const Q=B.shadow;if(B.map&&(a.spotLightMap[W]=B.map,W++,Q.updateMatrices(B),B.castShadow&&F++),a.spotLightMatrix[T]=Q.matrix,B.castShadow){const K=n.get(B);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,a.spotShadow[T]=K,a.spotShadowMap[T]=ft,w++}T++}else if(B.isRectAreaLight){const z=t.get(B);z.color.copy(j).multiplyScalar($),z.halfWidth.set(B.width*.5,0,0),z.halfHeight.set(0,B.height*.5,0),a.rectArea[S]=z,S++}else if(B.isPointLight){const z=t.get(B);if(z.color.copy(B.color).multiplyScalar(B.intensity),z.distance=B.distance,z.decay=B.decay,B.castShadow){const Q=B.shadow,K=n.get(B);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,a.pointShadow[E]=K,a.pointShadowMap[E]=ft,a.pointShadowMatrix[E]=B.shadow.matrix,D++}a.point[E]=z,E++}else if(B.isHemisphereLight){const z=t.get(B);z.skyColor.copy(B.color).multiplyScalar($),z.groundColor.copy(B.groundColor).multiplyScalar($),a.hemi[v]=z,v++}}S>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Nt.LTC_FLOAT_1,a.rectAreaLTC2=Nt.LTC_FLOAT_2):(a.rectAreaLTC1=Nt.LTC_HALF_1,a.rectAreaLTC2=Nt.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=x;const H=a.hash;(H.directionalLength!==M||H.pointLength!==E||H.spotLength!==T||H.rectAreaLength!==S||H.hemiLength!==v||H.numDirectionalShadows!==L||H.numPointShadows!==D||H.numSpotShadows!==w||H.numSpotMaps!==W||H.numLightProbes!==O)&&(a.directional.length=M,a.spot.length=T,a.rectArea.length=S,a.point.length=E,a.hemi.length=v,a.directionalShadow.length=L,a.directionalShadowMap.length=L,a.pointShadow.length=D,a.pointShadowMap.length=D,a.spotShadow.length=w,a.spotShadowMap.length=w,a.directionalShadowMatrix.length=L,a.pointShadowMatrix.length=D,a.spotLightMatrix.length=w+W-F,a.spotLightMap.length=W,a.numSpotLightShadowsWithMaps=F,a.numLightProbes=O,H.directionalLength=M,H.pointLength=E,H.spotLength=T,H.rectAreaLength=S,H.hemiLength=v,H.numDirectionalShadows=L,H.numPointShadows=D,H.numSpotShadows=w,H.numSpotMaps=W,H.numLightProbes=O,a.version=LA++)}function m(p,g){let _=0,x=0,M=0,E=0,T=0;const S=g.matrixWorldInverse;for(let v=0,L=p.length;v<L;v++){const D=p[v];if(D.isDirectionalLight){const w=a.directional[_];w.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),_++}else if(D.isSpotLight){const w=a.spot[M];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),w.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),M++}else if(D.isRectAreaLight){const w=a.rectArea[E];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),f.identity(),c.copy(D.matrixWorld),c.premultiply(S),f.extractRotation(c),w.halfWidth.set(D.width*.5,0,0),w.halfHeight.set(0,D.height*.5,0),w.halfWidth.applyMatrix4(f),w.halfHeight.applyMatrix4(f),E++}else if(D.isPointLight){const w=a.point[x];w.position.setFromMatrixPosition(D.matrixWorld),w.position.applyMatrix4(S),x++}else if(D.isHemisphereLight){const w=a.hemi[T];w.direction.setFromMatrixPosition(D.matrixWorld),w.direction.transformDirection(S),T++}}}return{setup:d,setupView:m,state:a}}function _v(r){const t=new OA(r),n=[],a=[];function l(g){p.camera=g,n.length=0,a.length=0}function c(g){n.push(g)}function f(g){a.push(g)}function d(){t.setup(n)}function m(g){t.setupView(n,g)}const p={lightsArray:n,shadowsArray:a,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:f}}function PA(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new _v(r),t.set(l,[d])):c>=f.length?(d=new _v(r),f.push(d)):d=f[c],d}function a(){t=new WeakMap}return{get:n,dispose:a}}class zA extends eo{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=LM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class BA extends eo{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const IA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,FA=`uniform sampler2D shadow_pass;
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
}`;function HA(r,t,n){let a=new ux;const l=new Ce,c=new Ce,f=new on,d=new zA({depthPacking:NM}),m=new BA,p={},g=n.maxTextureSize,_={[ls]:ei,[ei]:ls,[Sa]:Sa},x=new Hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:IA,fragmentShader:FA}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const E=new kn;E.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new Ln(E,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ov;let v=this.type;this.render=function(F,O,H){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||F.length===0)return;const U=r.getRenderTarget(),R=r.getActiveCubeFace(),B=r.getActiveMipmapLevel(),j=r.state;j.setBlending(Ta),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const $=v!==ya&&this.type===ya,lt=v===ya&&this.type!==ya;for(let ft=0,z=F.length;ft<z;ft++){const Q=F[ft],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const St=K.getFrameExtents();if(l.multiply(St),c.copy(K.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/St.x),l.x=c.x*St.x,K.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/St.y),l.y=c.y*St.y,K.mapSize.y=c.y)),K.map===null||$===!0||lt===!0){const P=this.type!==ya?{minFilter:Fi,magFilter:Fi}:{};K.map!==null&&K.map.dispose(),K.map=new cs(l.x,l.y,P),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}r.setRenderTarget(K.map),r.clear();const Tt=K.getViewportCount();for(let P=0;P<Tt;P++){const st=K.getViewport(P);f.set(c.x*st.x,c.y*st.y,c.x*st.z,c.y*st.w),j.viewport(f),K.updateMatrices(Q,P),a=K.getFrustum(),w(O,H,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===ya&&L(K,H),K.needsUpdate=!1}v=this.type,S.needsUpdate=!1,r.setRenderTarget(U,R,B)};function L(F,O){const H=t.update(T);x.defines.VSM_SAMPLES!==F.blurSamples&&(x.defines.VSM_SAMPLES=F.blurSamples,M.defines.VSM_SAMPLES=F.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new cs(l.x,l.y)),x.uniforms.shadow_pass.value=F.map.texture,x.uniforms.resolution.value=F.mapSize,x.uniforms.radius.value=F.radius,r.setRenderTarget(F.mapPass),r.clear(),r.renderBufferDirect(O,null,H,x,T,null),M.uniforms.shadow_pass.value=F.mapPass.texture,M.uniforms.resolution.value=F.mapSize,M.uniforms.radius.value=F.radius,r.setRenderTarget(F.map),r.clear(),r.renderBufferDirect(O,null,H,M,T,null)}function D(F,O,H,U){let R=null;const B=H.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(B!==void 0)R=B;else if(R=H.isPointLight===!0?m:d,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const j=R.uuid,$=O.uuid;let lt=p[j];lt===void 0&&(lt={},p[j]=lt);let ft=lt[$];ft===void 0&&(ft=R.clone(),lt[$]=ft,O.addEventListener("dispose",W)),R=ft}if(R.visible=O.visible,R.wireframe=O.wireframe,U===ya?R.side=O.shadowSide!==null?O.shadowSide:O.side:R.side=O.shadowSide!==null?O.shadowSide:_[O.side],R.alphaMap=O.alphaMap,R.alphaTest=O.alphaTest,R.map=O.map,R.clipShadows=O.clipShadows,R.clippingPlanes=O.clippingPlanes,R.clipIntersection=O.clipIntersection,R.displacementMap=O.displacementMap,R.displacementScale=O.displacementScale,R.displacementBias=O.displacementBias,R.wireframeLinewidth=O.wireframeLinewidth,R.linewidth=O.linewidth,H.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const j=r.properties.get(R);j.light=H}return R}function w(F,O,H,U,R){if(F.visible===!1)return;if(F.layers.test(O.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&R===ya)&&(!F.frustumCulled||a.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,F.matrixWorld);const $=t.update(F),lt=F.material;if(Array.isArray(lt)){const ft=$.groups;for(let z=0,Q=ft.length;z<Q;z++){const K=ft[z],St=lt[K.materialIndex];if(St&&St.visible){const Tt=D(F,St,U,R);F.onBeforeShadow(r,F,O,H,$,Tt,K),r.renderBufferDirect(H,null,$,Tt,F,K),F.onAfterShadow(r,F,O,H,$,Tt,K)}}}else if(lt.visible){const ft=D(F,lt,U,R);F.onBeforeShadow(r,F,O,H,$,ft,null),r.renderBufferDirect(H,null,$,ft,F,null),F.onAfterShadow(r,F,O,H,$,ft,null)}}const j=F.children;for(let $=0,lt=j.length;$<lt;$++)w(j[$],O,H,U,R)}function W(F){F.target.removeEventListener("dispose",W);for(const H in p){const U=p[H],R=F.target.uuid;R in U&&(U[R].dispose(),delete U[R])}}}const GA={[_d]:vd,[xd]:Md,[yd]:Ed,[Wr]:Sd,[vd]:_d,[Md]:xd,[Ed]:yd,[Sd]:Wr};function VA(r,t){function n(){let V=!1;const Rt=new on;let ut=null;const vt=new on(0,0,0,0);return{setMask:function(wt){ut!==wt&&!V&&(r.colorMask(wt,wt,wt,wt),ut=wt)},setLocked:function(wt){V=wt},setClear:function(wt,Lt,ee,Qe,pn){pn===!0&&(wt*=Qe,Lt*=Qe,ee*=Qe),Rt.set(wt,Lt,ee,Qe),vt.equals(Rt)===!1&&(r.clearColor(wt,Lt,ee,Qe),vt.copy(Rt))},reset:function(){V=!1,ut=null,vt.set(-1,0,0,0)}}}function a(){let V=!1,Rt=!1,ut=null,vt=null,wt=null;return{setReversed:function(Lt){if(Rt!==Lt){const ee=t.get("EXT_clip_control");Rt?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT);const Qe=wt;wt=null,this.setClear(Qe)}Rt=Lt},getReversed:function(){return Rt},setTest:function(Lt){Lt?xt(r.DEPTH_TEST):Vt(r.DEPTH_TEST)},setMask:function(Lt){ut!==Lt&&!V&&(r.depthMask(Lt),ut=Lt)},setFunc:function(Lt){if(Rt&&(Lt=GA[Lt]),vt!==Lt){switch(Lt){case _d:r.depthFunc(r.NEVER);break;case vd:r.depthFunc(r.ALWAYS);break;case xd:r.depthFunc(r.LESS);break;case Wr:r.depthFunc(r.LEQUAL);break;case yd:r.depthFunc(r.EQUAL);break;case Sd:r.depthFunc(r.GEQUAL);break;case Md:r.depthFunc(r.GREATER);break;case Ed:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}vt=Lt}},setLocked:function(Lt){V=Lt},setClear:function(Lt){wt!==Lt&&(Rt&&(Lt=1-Lt),r.clearDepth(Lt),wt=Lt)},reset:function(){V=!1,ut=null,vt=null,wt=null,Rt=!1}}}function l(){let V=!1,Rt=null,ut=null,vt=null,wt=null,Lt=null,ee=null,Qe=null,pn=null;return{setTest:function(Re){V||(Re?xt(r.STENCIL_TEST):Vt(r.STENCIL_TEST))},setMask:function(Re){Rt!==Re&&!V&&(r.stencilMask(Re),Rt=Re)},setFunc:function(Re,Tn,wi){(ut!==Re||vt!==Tn||wt!==wi)&&(r.stencilFunc(Re,Tn,wi),ut=Re,vt=Tn,wt=wi)},setOp:function(Re,Tn,wi){(Lt!==Re||ee!==Tn||Qe!==wi)&&(r.stencilOp(Re,Tn,wi),Lt=Re,ee=Tn,Qe=wi)},setLocked:function(Re){V=Re},setClear:function(Re){pn!==Re&&(r.clearStencil(Re),pn=Re)},reset:function(){V=!1,Rt=null,ut=null,vt=null,wt=null,Lt=null,ee=null,Qe=null,pn=null}}}const c=new n,f=new a,d=new l,m=new WeakMap,p=new WeakMap;let g={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,L=null,D=null,w=null,W=null,F=null,O=new fe(0,0,0),H=0,U=!1,R=null,B=null,j=null,$=null,lt=null;const ft=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=Q>=2);let St=null,Tt={};const P=r.getParameter(r.SCISSOR_BOX),st=r.getParameter(r.VIEWPORT),yt=new on().fromArray(P),Z=new on().fromArray(st);function ht(V,Rt,ut,vt){const wt=new Uint8Array(4),Lt=r.createTexture();r.bindTexture(V,Lt),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ee=0;ee<ut;ee++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,vt,0,r.RGBA,r.UNSIGNED_BYTE,wt):r.texImage2D(Rt+ee,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,wt);return Lt}const Et={};Et[r.TEXTURE_2D]=ht(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ht(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ht(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ht(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),xt(r.DEPTH_TEST),f.setFunc(Wr),he(!1),ge(S_),xt(r.CULL_FACE),q(Ta);function xt(V){g[V]!==!0&&(r.enable(V),g[V]=!0)}function Vt(V){g[V]!==!1&&(r.disable(V),g[V]=!1)}function Gt(V,Rt){return _[V]!==Rt?(r.bindFramebuffer(V,Rt),_[V]=Rt,V===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Rt),V===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function ae(V,Rt){let ut=M,vt=!1;if(V){ut=x.get(Rt),ut===void 0&&(ut=[],x.set(Rt,ut));const wt=V.textures;if(ut.length!==wt.length||ut[0]!==r.COLOR_ATTACHMENT0){for(let Lt=0,ee=wt.length;Lt<ee;Lt++)ut[Lt]=r.COLOR_ATTACHMENT0+Lt;ut.length=wt.length,vt=!0}}else ut[0]!==r.BACK&&(ut[0]=r.BACK,vt=!0);vt&&r.drawBuffers(ut)}function He(V){return E!==V?(r.useProgram(V),E=V,!0):!1}const de={[Bs]:r.FUNC_ADD,[fM]:r.FUNC_SUBTRACT,[hM]:r.FUNC_REVERSE_SUBTRACT};de[dM]=r.MIN,de[pM]=r.MAX;const Ke={[mM]:r.ZERO,[gM]:r.ONE,[_M]:r.SRC_COLOR,[md]:r.SRC_ALPHA,[EM]:r.SRC_ALPHA_SATURATE,[SM]:r.DST_COLOR,[xM]:r.DST_ALPHA,[vM]:r.ONE_MINUS_SRC_COLOR,[gd]:r.ONE_MINUS_SRC_ALPHA,[MM]:r.ONE_MINUS_DST_COLOR,[yM]:r.ONE_MINUS_DST_ALPHA,[TM]:r.CONSTANT_COLOR,[bM]:r.ONE_MINUS_CONSTANT_COLOR,[AM]:r.CONSTANT_ALPHA,[RM]:r.ONE_MINUS_CONSTANT_ALPHA};function q(V,Rt,ut,vt,wt,Lt,ee,Qe,pn,Re){if(V===Ta){T===!0&&(Vt(r.BLEND),T=!1);return}if(T===!1&&(xt(r.BLEND),T=!0),V!==uM){if(V!==S||Re!==U){if((v!==Bs||w!==Bs)&&(r.blendEquation(r.FUNC_ADD),v=Bs,w=Bs),Re)switch(V){case kr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case M_:r.blendFunc(r.ONE,r.ONE);break;case E_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case T_:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case kr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case M_:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case E_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case T_:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}L=null,D=null,W=null,F=null,O.set(0,0,0),H=0,S=V,U=Re}return}wt=wt||Rt,Lt=Lt||ut,ee=ee||vt,(Rt!==v||wt!==w)&&(r.blendEquationSeparate(de[Rt],de[wt]),v=Rt,w=wt),(ut!==L||vt!==D||Lt!==W||ee!==F)&&(r.blendFuncSeparate(Ke[ut],Ke[vt],Ke[Lt],Ke[ee]),L=ut,D=vt,W=Lt,F=ee),(Qe.equals(O)===!1||pn!==H)&&(r.blendColor(Qe.r,Qe.g,Qe.b,pn),O.copy(Qe),H=pn),S=V,U=!1}function Nn(V,Rt){V.side===Sa?Vt(r.CULL_FACE):xt(r.CULL_FACE);let ut=V.side===ei;Rt&&(ut=!ut),he(ut),V.blending===kr&&V.transparent===!1?q(Ta):q(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),c.setMask(V.colorWrite);const vt=V.stencilWrite;d.setTest(vt),vt&&(d.setMask(V.stencilWriteMask),d.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),d.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Pe(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?xt(r.SAMPLE_ALPHA_TO_COVERAGE):Vt(r.SAMPLE_ALPHA_TO_COVERAGE)}function he(V){R!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),R=V)}function ge(V){V!==oM?(xt(r.CULL_FACE),V!==B&&(V===S_?r.cullFace(r.BACK):V===lM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Vt(r.CULL_FACE),B=V}function Qt(V){V!==j&&(z&&r.lineWidth(V),j=V)}function Pe(V,Rt,ut){V?(xt(r.POLYGON_OFFSET_FILL),($!==Rt||lt!==ut)&&(r.polygonOffset(Rt,ut),$=Rt,lt=ut)):Vt(r.POLYGON_OFFSET_FILL)}function Zt(V){V?xt(r.SCISSOR_TEST):Vt(r.SCISSOR_TEST)}function N(V){V===void 0&&(V=r.TEXTURE0+ft-1),St!==V&&(r.activeTexture(V),St=V)}function A(V,Rt,ut){ut===void 0&&(St===null?ut=r.TEXTURE0+ft-1:ut=St);let vt=Tt[ut];vt===void 0&&(vt={type:void 0,texture:void 0},Tt[ut]=vt),(vt.type!==V||vt.texture!==Rt)&&(St!==ut&&(r.activeTexture(ut),St=ut),r.bindTexture(V,Rt||Et[V]),vt.type=V,vt.texture=Rt)}function at(){const V=Tt[St];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function pt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Mt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Wt(){try{r.texSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ut(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function _e(){try{r.texStorage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Yt(V){yt.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),yt.copy(V))}function Ot(V){Z.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),Z.copy(V))}function te(V,Rt){let ut=p.get(Rt);ut===void 0&&(ut=new WeakMap,p.set(Rt,ut));let vt=ut.get(V);vt===void 0&&(vt=r.getUniformBlockIndex(Rt,V.name),ut.set(V,vt))}function re(V,Rt){const vt=p.get(Rt).get(V);m.get(Rt)!==vt&&(r.uniformBlockBinding(Rt,vt,V.__bindingPointIndex),m.set(Rt,vt))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},St=null,Tt={},_={},x=new WeakMap,M=[],E=null,T=!1,S=null,v=null,L=null,D=null,w=null,W=null,F=null,O=new fe(0,0,0),H=0,U=!1,R=null,B=null,j=null,$=null,lt=null,yt.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:xt,disable:Vt,bindFramebuffer:Gt,drawBuffers:ae,useProgram:He,setBlending:q,setMaterial:Nn,setFlipSided:he,setCullFace:ge,setLineWidth:Qt,setPolygonOffset:Pe,setScissorTest:Zt,activeTexture:N,bindTexture:A,unbindTexture:at,compressedTexImage2D:pt,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Kt,updateUBOMapping:te,uniformBlockBinding:re,texStorage2D:_e,texStorage3D:At,texSubImage2D:gt,texSubImage3D:Wt,compressedTexSubImage2D:Ut,compressedTexSubImage3D:zt,scissor:Yt,viewport:Ot,reset:Ge}}function vv(r,t,n,a){const l=kA(a);switch(n){case Wv:return r*t;case jv:return r*t;case Zv:return r*t*2;case Kv:return r*t/l.components*l.byteLength;case lp:return r*t/l.components*l.byteLength;case Qv:return r*t*2/l.components*l.byteLength;case cp:return r*t*2/l.components*l.byteLength;case Yv:return r*t*3/l.components*l.byteLength;case Ii:return r*t*4/l.components*l.byteLength;case up:return r*t*4/l.components*l.byteLength;case tu:case eu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case nu:case iu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case wd:case Dd:return Math.max(r,16)*Math.max(t,8)/4;case Rd:case Cd:return Math.max(r,8)*Math.max(t,8)/2;case Ud:case Ld:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Nd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Od:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Pd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case zd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Bd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Id:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Fd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Gd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case kd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Xd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case qd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Wd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Yd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case au:case jd:case Zd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Jv:case Kd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Qd:case Jd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function kA(r){switch(r){case Aa:case kv:return{byteLength:1,components:1};case ll:case Xv:case Jr:return{byteLength:2,components:1};case rp:case op:return{byteLength:2,components:4};case ks:case sp:case Ma:return{byteLength:4,components:1};case qv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function XA(r,t,n,a,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ce,g=new WeakMap;let _;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,A){return M?new OffscreenCanvas(N,A):lu("canvas")}function T(N,A,at){let pt=1;const Mt=Zt(N);if((Mt.width>at||Mt.height>at)&&(pt=at/Math.max(Mt.width,Mt.height)),pt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const gt=Math.floor(pt*Mt.width),Wt=Math.floor(pt*Mt.height);_===void 0&&(_=E(gt,Wt));const Ut=A?E(gt,Wt):_;return Ut.width=gt,Ut.height=Wt,Ut.getContext("2d").drawImage(N,0,0,gt,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+gt+"x"+Wt+")."),Ut}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),N;return N}function S(N){return N.generateMipmaps}function v(N){r.generateMipmap(N)}function L(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function D(N,A,at,pt,Mt=!1){if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt=A;if(A===r.RED&&(at===r.FLOAT&&(gt=r.R32F),at===r.HALF_FLOAT&&(gt=r.R16F),at===r.UNSIGNED_BYTE&&(gt=r.R8)),A===r.RED_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.R8UI),at===r.UNSIGNED_SHORT&&(gt=r.R16UI),at===r.UNSIGNED_INT&&(gt=r.R32UI),at===r.BYTE&&(gt=r.R8I),at===r.SHORT&&(gt=r.R16I),at===r.INT&&(gt=r.R32I)),A===r.RG&&(at===r.FLOAT&&(gt=r.RG32F),at===r.HALF_FLOAT&&(gt=r.RG16F),at===r.UNSIGNED_BYTE&&(gt=r.RG8)),A===r.RG_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RG8UI),at===r.UNSIGNED_SHORT&&(gt=r.RG16UI),at===r.UNSIGNED_INT&&(gt=r.RG32UI),at===r.BYTE&&(gt=r.RG8I),at===r.SHORT&&(gt=r.RG16I),at===r.INT&&(gt=r.RG32I)),A===r.RGB_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),at===r.UNSIGNED_INT&&(gt=r.RGB32UI),at===r.BYTE&&(gt=r.RGB8I),at===r.SHORT&&(gt=r.RGB16I),at===r.INT&&(gt=r.RGB32I)),A===r.RGBA_INTEGER&&(at===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),at===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),at===r.UNSIGNED_INT&&(gt=r.RGBA32UI),at===r.BYTE&&(gt=r.RGBA8I),at===r.SHORT&&(gt=r.RGBA16I),at===r.INT&&(gt=r.RGBA32I)),A===r.RGB&&at===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),A===r.RGBA){const Wt=Mt?pu:Ae.getTransfer(pt);at===r.FLOAT&&(gt=r.RGBA32F),at===r.HALF_FLOAT&&(gt=r.RGBA16F),at===r.UNSIGNED_BYTE&&(gt=Wt===Fe?r.SRGB8_ALPHA8:r.RGBA8),at===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),at===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function w(N,A){let at;return N?A===null||A===ks||A===Zr?at=r.DEPTH24_STENCIL8:A===Ma?at=r.DEPTH32F_STENCIL8:A===ll&&(at=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ks||A===Zr?at=r.DEPTH_COMPONENT24:A===Ma?at=r.DEPTH_COMPONENT32F:A===ll&&(at=r.DEPTH_COMPONENT16),at}function W(N,A){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==Fi&&N.minFilter!==ji?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function F(N){const A=N.target;A.removeEventListener("dispose",F),H(A),A.isVideoTexture&&g.delete(A)}function O(N){const A=N.target;A.removeEventListener("dispose",O),R(A)}function H(N){const A=a.get(N);if(A.__webglInit===void 0)return;const at=N.source,pt=x.get(at);if(pt){const Mt=pt[A.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&U(N),Object.keys(pt).length===0&&x.delete(at)}a.remove(N)}function U(N){const A=a.get(N);r.deleteTexture(A.__webglTexture);const at=N.source,pt=x.get(at);delete pt[A.__cacheKey],f.memory.textures--}function R(N){const A=a.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),a.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let pt=0;pt<6;pt++){if(Array.isArray(A.__webglFramebuffer[pt]))for(let Mt=0;Mt<A.__webglFramebuffer[pt].length;Mt++)r.deleteFramebuffer(A.__webglFramebuffer[pt][Mt]);else r.deleteFramebuffer(A.__webglFramebuffer[pt]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[pt])}else{if(Array.isArray(A.__webglFramebuffer))for(let pt=0;pt<A.__webglFramebuffer.length;pt++)r.deleteFramebuffer(A.__webglFramebuffer[pt]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let pt=0;pt<A.__webglColorRenderbuffer.length;pt++)A.__webglColorRenderbuffer[pt]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[pt]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const at=N.textures;for(let pt=0,Mt=at.length;pt<Mt;pt++){const gt=a.get(at[pt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),a.remove(at[pt])}a.remove(N)}let B=0;function j(){B=0}function $(){const N=B;return N>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),B+=1,N}function lt(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function ft(N,A){const at=a.get(N);if(N.isVideoTexture&&Qt(N),N.isRenderTargetTexture===!1&&N.version>0&&at.__version!==N.version){const pt=N.image;if(pt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(at,N,A);return}}n.bindTexture(r.TEXTURE_2D,at.__webglTexture,r.TEXTURE0+A)}function z(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){Z(at,N,A);return}n.bindTexture(r.TEXTURE_2D_ARRAY,at.__webglTexture,r.TEXTURE0+A)}function Q(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){Z(at,N,A);return}n.bindTexture(r.TEXTURE_3D,at.__webglTexture,r.TEXTURE0+A)}function K(N,A){const at=a.get(N);if(N.version>0&&at.__version!==N.version){ht(at,N,A);return}n.bindTexture(r.TEXTURE_CUBE_MAP,at.__webglTexture,r.TEXTURE0+A)}const St={[ol]:r.REPEAT,[Fs]:r.CLAMP_TO_EDGE,[Ad]:r.MIRRORED_REPEAT},Tt={[Fi]:r.NEAREST,[UM]:r.NEAREST_MIPMAP_NEAREST,[Tc]:r.NEAREST_MIPMAP_LINEAR,[ji]:r.LINEAR,[zh]:r.LINEAR_MIPMAP_NEAREST,[Hs]:r.LINEAR_MIPMAP_LINEAR},P={[zM]:r.NEVER,[VM]:r.ALWAYS,[BM]:r.LESS,[$v]:r.LEQUAL,[IM]:r.EQUAL,[GM]:r.GEQUAL,[FM]:r.GREATER,[HM]:r.NOTEQUAL};function st(N,A){if(A.type===Ma&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===ji||A.magFilter===zh||A.magFilter===Tc||A.magFilter===Hs||A.minFilter===ji||A.minFilter===zh||A.minFilter===Tc||A.minFilter===Hs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,St[A.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,St[A.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,St[A.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Tt[A.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Tt[A.minFilter]),A.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,P[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Fi||A.minFilter!==Tc&&A.minFilter!==Hs||A.type===Ma&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||a.get(A).__currentAnisotropy){const at=t.get("EXT_texture_filter_anisotropic");r.texParameterf(N,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),a.get(A).__currentAnisotropy=A.anisotropy}}}function yt(N,A){let at=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",F));const pt=A.source;let Mt=x.get(pt);Mt===void 0&&(Mt={},x.set(pt,Mt));const gt=lt(A);if(gt!==N.__cacheKey){Mt[gt]===void 0&&(Mt[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,at=!0),Mt[gt].usedTimes++;const Wt=Mt[N.__cacheKey];Wt!==void 0&&(Mt[N.__cacheKey].usedTimes--,Wt.usedTimes===0&&U(A)),N.__cacheKey=gt,N.__webglTexture=Mt[gt].texture}return at}function Z(N,A,at){let pt=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(pt=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(pt=r.TEXTURE_3D);const Mt=yt(N,A),gt=A.source;n.bindTexture(pt,N.__webglTexture,r.TEXTURE0+at);const Wt=a.get(gt);if(gt.version!==Wt.__version||Mt===!0){n.activeTexture(r.TEXTURE0+at);const Ut=Ae.getPrimaries(Ae.workingColorSpace),zt=A.colorSpace===rs?null:Ae.getPrimaries(A.colorSpace),_e=A.colorSpace===rs||Ut===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let At=T(A.image,!1,l.maxTextureSize);At=Pe(A,At);const Bt=c.convert(A.format,A.colorSpace),Kt=c.convert(A.type);let Yt=D(A.internalFormat,Bt,Kt,A.colorSpace,A.isVideoTexture);st(pt,A);let Ot;const te=A.mipmaps,re=A.isVideoTexture!==!0,Ge=Wt.__version===void 0||Mt===!0,V=gt.dataReady,Rt=W(A,At);if(A.isDepthTexture)Yt=w(A.format===Kr,A.type),Ge&&(re?n.texStorage2D(r.TEXTURE_2D,1,Yt,At.width,At.height):n.texImage2D(r.TEXTURE_2D,0,Yt,At.width,At.height,0,Bt,Kt,null));else if(A.isDataTexture)if(te.length>0){re&&Ge&&n.texStorage2D(r.TEXTURE_2D,Rt,Yt,te[0].width,te[0].height);for(let ut=0,vt=te.length;ut<vt;ut++)Ot=te[ut],re?V&&n.texSubImage2D(r.TEXTURE_2D,ut,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,ut,Yt,Ot.width,Ot.height,0,Bt,Kt,Ot.data);A.generateMipmaps=!1}else re?(Ge&&n.texStorage2D(r.TEXTURE_2D,Rt,Yt,At.width,At.height),V&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Kt,At.data)):n.texImage2D(r.TEXTURE_2D,0,Yt,At.width,At.height,0,Bt,Kt,At.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){re&&Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Yt,te[0].width,te[0].height,At.depth);for(let ut=0,vt=te.length;ut<vt;ut++)if(Ot=te[ut],A.format!==Ii)if(Bt!==null)if(re){if(V)if(A.layerUpdates.size>0){const wt=vv(Ot.width,Ot.height,A.format,A.type);for(const Lt of A.layerUpdates){const ee=Ot.data.subarray(Lt*wt/Ot.data.BYTES_PER_ELEMENT,(Lt+1)*wt/Ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ut,0,0,Lt,Ot.width,Ot.height,1,Bt,ee)}A.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ut,0,0,0,Ot.width,Ot.height,At.depth,Bt,Ot.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ut,Yt,Ot.width,Ot.height,At.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?V&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,ut,0,0,0,Ot.width,Ot.height,At.depth,Bt,Kt,Ot.data):n.texImage3D(r.TEXTURE_2D_ARRAY,ut,Yt,Ot.width,Ot.height,At.depth,0,Bt,Kt,Ot.data)}else{re&&Ge&&n.texStorage2D(r.TEXTURE_2D,Rt,Yt,te[0].width,te[0].height);for(let ut=0,vt=te.length;ut<vt;ut++)Ot=te[ut],A.format!==Ii?Bt!==null?re?V&&n.compressedTexSubImage2D(r.TEXTURE_2D,ut,0,0,Ot.width,Ot.height,Bt,Ot.data):n.compressedTexImage2D(r.TEXTURE_2D,ut,Yt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?V&&n.texSubImage2D(r.TEXTURE_2D,ut,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,ut,Yt,Ot.width,Ot.height,0,Bt,Kt,Ot.data)}else if(A.isDataArrayTexture)if(re){if(Ge&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Yt,At.width,At.height,At.depth),V)if(A.layerUpdates.size>0){const ut=vv(At.width,At.height,A.format,A.type);for(const vt of A.layerUpdates){const wt=At.data.subarray(vt*ut/At.data.BYTES_PER_ELEMENT,(vt+1)*ut/At.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,vt,At.width,At.height,1,Bt,Kt,wt)}A.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Yt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(A.isData3DTexture)re?(Ge&&n.texStorage3D(r.TEXTURE_3D,Rt,Yt,At.width,At.height,At.depth),V&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)):n.texImage3D(r.TEXTURE_3D,0,Yt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(A.isFramebufferTexture){if(Ge)if(re)n.texStorage2D(r.TEXTURE_2D,Rt,Yt,At.width,At.height);else{let ut=At.width,vt=At.height;for(let wt=0;wt<Rt;wt++)n.texImage2D(r.TEXTURE_2D,wt,Yt,ut,vt,0,Bt,Kt,null),ut>>=1,vt>>=1}}else if(te.length>0){if(re&&Ge){const ut=Zt(te[0]);n.texStorage2D(r.TEXTURE_2D,Rt,Yt,ut.width,ut.height)}for(let ut=0,vt=te.length;ut<vt;ut++)Ot=te[ut],re?V&&n.texSubImage2D(r.TEXTURE_2D,ut,0,0,Bt,Kt,Ot):n.texImage2D(r.TEXTURE_2D,ut,Yt,Bt,Kt,Ot);A.generateMipmaps=!1}else if(re){if(Ge){const ut=Zt(At);n.texStorage2D(r.TEXTURE_2D,Rt,Yt,ut.width,ut.height)}V&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Kt,At)}else n.texImage2D(r.TEXTURE_2D,0,Yt,Bt,Kt,At);S(A)&&v(pt),Wt.__version=gt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function ht(N,A,at){if(A.image.length!==6)return;const pt=yt(N,A),Mt=A.source;n.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+at);const gt=a.get(Mt);if(Mt.version!==gt.__version||pt===!0){n.activeTexture(r.TEXTURE0+at);const Wt=Ae.getPrimaries(Ae.workingColorSpace),Ut=A.colorSpace===rs?null:Ae.getPrimaries(A.colorSpace),zt=A.colorSpace===rs||Wt===Ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const _e=A.isCompressedTexture||A.image[0].isCompressedTexture,At=A.image[0]&&A.image[0].isDataTexture,Bt=[];for(let vt=0;vt<6;vt++)!_e&&!At?Bt[vt]=T(A.image[vt],!0,l.maxCubemapSize):Bt[vt]=At?A.image[vt].image:A.image[vt],Bt[vt]=Pe(A,Bt[vt]);const Kt=Bt[0],Yt=c.convert(A.format,A.colorSpace),Ot=c.convert(A.type),te=D(A.internalFormat,Yt,Ot,A.colorSpace),re=A.isVideoTexture!==!0,Ge=gt.__version===void 0||pt===!0,V=Mt.dataReady;let Rt=W(A,Kt);st(r.TEXTURE_CUBE_MAP,A);let ut;if(_e){re&&Ge&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,te,Kt.width,Kt.height);for(let vt=0;vt<6;vt++){ut=Bt[vt].mipmaps;for(let wt=0;wt<ut.length;wt++){const Lt=ut[wt];A.format!==Ii?Yt!==null?re?V&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,0,0,Lt.width,Lt.height,Yt,Lt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,te,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,0,0,Lt.width,Lt.height,Yt,Ot,Lt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt,te,Lt.width,Lt.height,0,Yt,Ot,Lt.data)}}}else{if(ut=A.mipmaps,re&&Ge){ut.length>0&&Rt++;const vt=Zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,te,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(At){re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt[vt].width,Bt[vt].height,Yt,Ot,Bt[vt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Bt[vt].width,Bt[vt].height,0,Yt,Ot,Bt[vt].data);for(let wt=0;wt<ut.length;wt++){const ee=ut[wt].image[vt].image;re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,0,0,ee.width,ee.height,Yt,Ot,ee.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,te,ee.width,ee.height,0,Yt,Ot,ee.data)}}else{re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Yt,Ot,Bt[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,Yt,Ot,Bt[vt]);for(let wt=0;wt<ut.length;wt++){const Lt=ut[wt];re?V&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,0,0,Yt,Ot,Lt.image[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt+1,te,Yt,Ot,Lt.image[vt])}}}S(A)&&v(r.TEXTURE_CUBE_MAP),gt.__version=Mt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Et(N,A,at,pt,Mt,gt){const Wt=c.convert(at.format,at.colorSpace),Ut=c.convert(at.type),zt=D(at.internalFormat,Wt,Ut,at.colorSpace),_e=a.get(A),At=a.get(at);if(At.__renderTarget=A,!_e.__hasExternalTextures){const Bt=Math.max(1,A.width>>gt),Kt=Math.max(1,A.height>>gt);Mt===r.TEXTURE_3D||Mt===r.TEXTURE_2D_ARRAY?n.texImage3D(Mt,gt,zt,Bt,Kt,A.depth,0,Wt,Ut,null):n.texImage2D(Mt,gt,zt,Bt,Kt,0,Wt,Ut,null)}n.bindFramebuffer(r.FRAMEBUFFER,N),ge(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pt,Mt,At.__webglTexture,0,he(A)):(Mt===r.TEXTURE_2D||Mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,pt,Mt,At.__webglTexture,gt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function xt(N,A,at){if(r.bindRenderbuffer(r.RENDERBUFFER,N),A.depthBuffer){const pt=A.depthTexture,Mt=pt&&pt.isDepthTexture?pt.type:null,gt=w(A.stencilBuffer,Mt),Wt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ut=he(A);ge(A)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ut,gt,A.width,A.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ut,gt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,gt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,N)}else{const pt=A.textures;for(let Mt=0;Mt<pt.length;Mt++){const gt=pt[Mt],Wt=c.convert(gt.format,gt.colorSpace),Ut=c.convert(gt.type),zt=D(gt.internalFormat,Wt,Ut,gt.colorSpace),_e=he(A);at&&ge(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,zt,A.width,A.height):ge(A)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,zt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,zt,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Vt(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pt=a.get(A.depthTexture);pt.__renderTarget=A,(!pt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),ft(A.depthTexture,0);const Mt=pt.__webglTexture,gt=he(A);if(A.depthTexture.format===Xr)ge(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0);else if(A.depthTexture.format===Kr)ge(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Gt(N){const A=a.get(N),at=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const pt=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),pt){const Mt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,pt.removeEventListener("dispose",Mt)};pt.addEventListener("dispose",Mt),A.__depthDisposeCallback=Mt}A.__boundDepthTexture=pt}if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(at)throw new Error("target.depthTexture not supported in Cube render targets");Vt(A.__webglFramebuffer,N)}else if(at){A.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[pt]),A.__webglDepthbuffer[pt]===void 0)A.__webglDepthbuffer[pt]=r.createRenderbuffer(),xt(A.__webglDepthbuffer[pt],N,!1);else{const Mt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=A.__webglDepthbuffer[pt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,gt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),xt(A.__webglDepthbuffer,N,!1);else{const pt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,pt,r.RENDERBUFFER,Mt)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function ae(N,A,at){const pt=a.get(N);A!==void 0&&Et(pt.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),at!==void 0&&Gt(N)}function He(N){const A=N.texture,at=a.get(N),pt=a.get(A);N.addEventListener("dispose",O);const Mt=N.textures,gt=N.isWebGLCubeRenderTarget===!0,Wt=Mt.length>1;if(Wt||(pt.__webglTexture===void 0&&(pt.__webglTexture=r.createTexture()),pt.__version=A.version,f.memory.textures++),gt){at.__webglFramebuffer=[];for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer[Ut]=[];for(let zt=0;zt<A.mipmaps.length;zt++)at.__webglFramebuffer[Ut][zt]=r.createFramebuffer()}else at.__webglFramebuffer[Ut]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){at.__webglFramebuffer=[];for(let Ut=0;Ut<A.mipmaps.length;Ut++)at.__webglFramebuffer[Ut]=r.createFramebuffer()}else at.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let Ut=0,zt=Mt.length;Ut<zt;Ut++){const _e=a.get(Mt[Ut]);_e.__webglTexture===void 0&&(_e.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&ge(N)===!1){at.__webglMultisampledFramebuffer=r.createFramebuffer(),at.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let Ut=0;Ut<Mt.length;Ut++){const zt=Mt[Ut];at.__webglColorRenderbuffer[Ut]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,at.__webglColorRenderbuffer[Ut]);const _e=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=D(zt.internalFormat,_e,At,zt.colorSpace,N.isXRRenderTarget===!0),Kt=he(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,Bt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ut,r.RENDERBUFFER,at.__webglColorRenderbuffer[Ut])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(at.__webglDepthRenderbuffer=r.createRenderbuffer(),xt(at.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){n.bindTexture(r.TEXTURE_CUBE_MAP,pt.__webglTexture),st(r.TEXTURE_CUBE_MAP,A);for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(at.__webglFramebuffer[Ut][zt],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,zt);else Et(at.__webglFramebuffer[Ut],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0);S(A)&&v(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Wt){for(let Ut=0,zt=Mt.length;Ut<zt;Ut++){const _e=Mt[Ut],At=a.get(_e);n.bindTexture(r.TEXTURE_2D,At.__webglTexture),st(r.TEXTURE_2D,_e),Et(at.__webglFramebuffer,N,_e,r.COLOR_ATTACHMENT0+Ut,r.TEXTURE_2D,0),S(_e)&&v(r.TEXTURE_2D)}n.unbindTexture()}else{let Ut=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Ut=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Ut,pt.__webglTexture),st(Ut,A),A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(at.__webglFramebuffer[zt],N,A,r.COLOR_ATTACHMENT0,Ut,zt);else Et(at.__webglFramebuffer,N,A,r.COLOR_ATTACHMENT0,Ut,0);S(A)&&v(Ut),n.unbindTexture()}N.depthBuffer&&Gt(N)}function de(N){const A=N.textures;for(let at=0,pt=A.length;at<pt;at++){const Mt=A[at];if(S(Mt)){const gt=L(N),Wt=a.get(Mt).__webglTexture;n.bindTexture(gt,Wt),v(gt),n.unbindTexture()}}}const Ke=[],q=[];function Nn(N){if(N.samples>0){if(ge(N)===!1){const A=N.textures,at=N.width,pt=N.height;let Mt=r.COLOR_BUFFER_BIT;const gt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=a.get(N),Ut=A.length>1;if(Ut)for(let zt=0;zt<A.length;zt++)n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let zt=0;zt<A.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Mt|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Mt|=r.STENCIL_BUFFER_BIT)),Ut){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const _e=a.get(A[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,_e,0)}r.blitFramebuffer(0,0,at,pt,0,0,at,pt,Mt,r.NEAREST),m===!0&&(Ke.length=0,q.length=0,Ke.push(r.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Ke.push(gt),q.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,q)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ke))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Ut)for(let zt=0;zt<A.length;zt++){n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[zt]);const _e=a.get(A[zt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,_e,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&m){const A=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function he(N){return Math.min(l.maxSamples,N.samples)}function ge(N){const A=a.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Qt(N){const A=f.render.frame;g.get(N)!==A&&(g.set(N,A),N.update())}function Pe(N,A){const at=N.colorSpace,pt=N.format,Mt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||at!==$r&&at!==rs&&(Ae.getTransfer(at)===Fe?(pt!==Ii||Mt!==Aa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",at)),A}function Zt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=$,this.resetTextureUnits=j,this.setTexture2D=ft,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=K,this.rebindTextures=ae,this.setupRenderTarget=He,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=Nn,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ge}function qA(r,t){function n(a,l=rs){let c;const f=Ae.getTransfer(l);if(a===Aa)return r.UNSIGNED_BYTE;if(a===rp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===op)return r.UNSIGNED_SHORT_5_5_5_1;if(a===qv)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===kv)return r.BYTE;if(a===Xv)return r.SHORT;if(a===ll)return r.UNSIGNED_SHORT;if(a===sp)return r.INT;if(a===ks)return r.UNSIGNED_INT;if(a===Ma)return r.FLOAT;if(a===Jr)return r.HALF_FLOAT;if(a===Wv)return r.ALPHA;if(a===Yv)return r.RGB;if(a===Ii)return r.RGBA;if(a===jv)return r.LUMINANCE;if(a===Zv)return r.LUMINANCE_ALPHA;if(a===Xr)return r.DEPTH_COMPONENT;if(a===Kr)return r.DEPTH_STENCIL;if(a===Kv)return r.RED;if(a===lp)return r.RED_INTEGER;if(a===Qv)return r.RG;if(a===cp)return r.RG_INTEGER;if(a===up)return r.RGBA_INTEGER;if(a===tu||a===eu||a===nu||a===iu)if(f===Fe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===tu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===eu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===nu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===iu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===tu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===eu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===nu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===iu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Rd||a===wd||a===Cd||a===Dd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Rd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===wd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Cd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Dd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Ud||a===Ld||a===Nd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Ud||a===Ld)return f===Fe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Nd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Od||a===Pd||a===zd||a===Bd||a===Id||a===Fd||a===Hd||a===Gd||a===Vd||a===kd||a===Xd||a===qd||a===Wd||a===Yd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Od)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Pd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===zd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Bd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Id)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Fd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Hd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Gd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Vd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===kd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Xd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===qd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Wd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Yd)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===au||a===jd||a===Zd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===au)return f===Fe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===jd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===Zd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Jv||a===Kd||a===Qd||a===Jd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===au)return c.COMPRESSED_RED_RGTC1_EXT;if(a===Kd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Qd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Jd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Zr?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}class WA extends Ai{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Gs extends Vn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const YA={type:"move"};class fd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let l=null,c=null,f=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const T of t.hand.values()){const S=n.getJointPose(T,a),v=this._getHandJoint(p,T);S!==null&&(v.matrix.fromArray(S.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=S.radius),v.visible=S!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],x=g.position.distanceTo(_.position),M=.02,E=.005;p.inputState.pinching&&x>M+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&x<=M-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=n.getPose(t.targetRaySpace,a),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(YA)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new Gs;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const jA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ZA=`
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

}`;class KA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,a){if(this.texture===null){const l=new Gn,c=t.properties.get(l);c.__webglTexture=n.texture,(n.depthNear!=a.depthNear||n.depthFar!=a.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Hi({vertexShader:jA,fragmentShader:ZA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ln(new mu(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class QA extends to{constructor(t,n){super();const a=this;let l=null,c=1,f=null,d="local-floor",m=1,p=null,g=null,_=null,x=null,M=null,E=null;const T=new KA,S=n.getContextAttributes();let v=null,L=null;const D=[],w=[],W=new Ce;let F=null;const O=new Ai;O.viewport=new on;const H=new Ai;H.viewport=new on;const U=[O,H],R=new WA;let B=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ht=D[Z];return ht===void 0&&(ht=new fd,D[Z]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(Z){let ht=D[Z];return ht===void 0&&(ht=new fd,D[Z]=ht),ht.getGripSpace()},this.getHand=function(Z){let ht=D[Z];return ht===void 0&&(ht=new fd,D[Z]=ht),ht.getHandSpace()};function $(Z){const ht=w.indexOf(Z.inputSource);if(ht===-1)return;const Et=D[ht];Et!==void 0&&(Et.update(Z.inputSource,Z.frame,p||f),Et.dispatchEvent({type:Z.type,data:Z.inputSource}))}function lt(){l.removeEventListener("select",$),l.removeEventListener("selectstart",$),l.removeEventListener("selectend",$),l.removeEventListener("squeeze",$),l.removeEventListener("squeezestart",$),l.removeEventListener("squeezeend",$),l.removeEventListener("end",lt),l.removeEventListener("inputsourceschange",ft);for(let Z=0;Z<D.length;Z++){const ht=w[Z];ht!==null&&(w[Z]=null,D[Z].disconnect(ht))}B=null,j=null,T.reset(),t.setRenderTarget(v),M=null,x=null,_=null,l=null,L=null,yt.stop(),a.isPresenting=!1,t.setPixelRatio(F),t.setSize(W.width,W.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(Z){p=Z},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(v=t.getRenderTarget(),l.addEventListener("select",$),l.addEventListener("selectstart",$),l.addEventListener("selectend",$),l.addEventListener("squeeze",$),l.addEventListener("squeezestart",$),l.addEventListener("squeezeend",$),l.addEventListener("end",lt),l.addEventListener("inputsourceschange",ft),S.xrCompatible!==!0&&await n.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(W),l.renderState.layers===void 0){const ht={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,ht),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),L=new cs(M.framebufferWidth,M.framebufferHeight,{format:Ii,type:Aa,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let ht=null,Et=null,xt=null;S.depth&&(xt=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ht=S.stencil?Kr:Xr,Et=S.stencil?Zr:ks);const Vt={colorFormat:n.RGBA8,depthFormat:xt,scaleFactor:c};_=new XRWebGLBinding(l,n),x=_.createProjectionLayer(Vt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),L=new cs(x.textureWidth,x.textureHeight,{format:Ii,type:Aa,depthTexture:new dx(x.textureWidth,x.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(d),yt.setContext(l),yt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function ft(Z){for(let ht=0;ht<Z.removed.length;ht++){const Et=Z.removed[ht],xt=w.indexOf(Et);xt>=0&&(w[xt]=null,D[xt].disconnect(Et))}for(let ht=0;ht<Z.added.length;ht++){const Et=Z.added[ht];let xt=w.indexOf(Et);if(xt===-1){for(let Gt=0;Gt<D.length;Gt++)if(Gt>=w.length){w.push(Et),xt=Gt;break}else if(w[Gt]===null){w[Gt]=Et,xt=Gt;break}if(xt===-1)break}const Vt=D[xt];Vt&&Vt.connect(Et)}}const z=new J,Q=new J;function K(Z,ht,Et){z.setFromMatrixPosition(ht.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const xt=z.distanceTo(Q),Vt=ht.projectionMatrix.elements,Gt=Et.projectionMatrix.elements,ae=Vt[14]/(Vt[10]-1),He=Vt[14]/(Vt[10]+1),de=(Vt[9]+1)/Vt[5],Ke=(Vt[9]-1)/Vt[5],q=(Vt[8]-1)/Vt[0],Nn=(Gt[8]+1)/Gt[0],he=ae*q,ge=ae*Nn,Qt=xt/(-q+Nn),Pe=Qt*-q;if(ht.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Pe),Z.translateZ(Qt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Vt[10]===-1)Z.projectionMatrix.copy(ht.projectionMatrix),Z.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const Zt=ae+Qt,N=He+Qt,A=he-Pe,at=ge+(xt-Pe),pt=de*He/N*Zt,Mt=Ke*He/N*Zt;Z.projectionMatrix.makePerspective(A,at,pt,Mt,Zt,N),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function St(Z,ht){ht===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ht.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let ht=Z.near,Et=Z.far;T.texture!==null&&(T.depthNear>0&&(ht=T.depthNear),T.depthFar>0&&(Et=T.depthFar)),R.near=H.near=O.near=ht,R.far=H.far=O.far=Et,(B!==R.near||j!==R.far)&&(l.updateRenderState({depthNear:R.near,depthFar:R.far}),B=R.near,j=R.far),O.layers.mask=Z.layers.mask|2,H.layers.mask=Z.layers.mask|4,R.layers.mask=O.layers.mask|H.layers.mask;const xt=Z.parent,Vt=R.cameras;St(R,xt);for(let Gt=0;Gt<Vt.length;Gt++)St(Vt[Gt],xt);Vt.length===2?K(R,O,H):R.projectionMatrix.copy(O.projectionMatrix),Tt(Z,R,xt)};function Tt(Z,ht,Et){Et===null?Z.matrix.copy(ht.matrixWorld):(Z.matrix.copy(Et.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ht.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ht.projectionMatrix),Z.projectionMatrixInverse.copy(ht.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=$d*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&M===null))return m},this.setFoveation=function(Z){m=Z,x!==null&&(x.fixedFoveation=Z),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Z)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(R)};let P=null;function st(Z,ht){if(g=ht.getViewerPose(p||f),E=ht,g!==null){const Et=g.views;M!==null&&(t.setRenderTargetFramebuffer(L,M.framebuffer),t.setRenderTarget(L));let xt=!1;Et.length!==R.cameras.length&&(R.cameras.length=0,xt=!0);for(let Gt=0;Gt<Et.length;Gt++){const ae=Et[Gt];let He=null;if(M!==null)He=M.getViewport(ae);else{const Ke=_.getViewSubImage(x,ae);He=Ke.viewport,Gt===0&&(t.setRenderTargetTextures(L,Ke.colorTexture,x.ignoreDepthValues?void 0:Ke.depthStencilTexture),t.setRenderTarget(L))}let de=U[Gt];de===void 0&&(de=new Ai,de.layers.enable(Gt),de.viewport=new on,U[Gt]=de),de.matrix.fromArray(ae.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(ae.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(He.x,He.y,He.width,He.height),Gt===0&&(R.matrix.copy(de.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),xt===!0&&R.cameras.push(de)}const Vt=l.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const Gt=_.getDepthInformation(Et[0]);Gt&&Gt.isValid&&Gt.texture&&T.init(t,Gt,l.renderState)}}for(let Et=0;Et<D.length;Et++){const xt=w[Et],Vt=D[Et];xt!==null&&Vt!==void 0&&Vt.update(xt,ht,p||f)}P&&P(Z,ht),ht.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:ht}),E=null}const yt=new fx;yt.setAnimationLoop(st),this.setAnimationLoop=function(Z){P=Z},this.dispose=function(){}}}const Ns=new Ra,JA=new an;function $A(r,t){function n(S,v){S.matrixAutoUpdate===!0&&S.updateMatrix(),v.value.copy(S.matrix)}function a(S,v){v.color.getRGB(S.fogColor.value,ox(r)),v.isFog?(S.fogNear.value=v.near,S.fogFar.value=v.far):v.isFogExp2&&(S.fogDensity.value=v.density)}function l(S,v,L,D,w){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(S,v):v.isMeshToonMaterial?(c(S,v),_(S,v)):v.isMeshPhongMaterial?(c(S,v),g(S,v)):v.isMeshStandardMaterial?(c(S,v),x(S,v),v.isMeshPhysicalMaterial&&M(S,v,w)):v.isMeshMatcapMaterial?(c(S,v),E(S,v)):v.isMeshDepthMaterial?c(S,v):v.isMeshDistanceMaterial?(c(S,v),T(S,v)):v.isMeshNormalMaterial?c(S,v):v.isLineBasicMaterial?(f(S,v),v.isLineDashedMaterial&&d(S,v)):v.isPointsMaterial?m(S,v,L,D):v.isSpriteMaterial?p(S,v):v.isShadowMaterial?(S.color.value.copy(v.color),S.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(S,v){S.opacity.value=v.opacity,v.color&&S.diffuse.value.copy(v.color),v.emissive&&S.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.bumpMap&&(S.bumpMap.value=v.bumpMap,n(v.bumpMap,S.bumpMapTransform),S.bumpScale.value=v.bumpScale,v.side===ei&&(S.bumpScale.value*=-1)),v.normalMap&&(S.normalMap.value=v.normalMap,n(v.normalMap,S.normalMapTransform),S.normalScale.value.copy(v.normalScale),v.side===ei&&S.normalScale.value.negate()),v.displacementMap&&(S.displacementMap.value=v.displacementMap,n(v.displacementMap,S.displacementMapTransform),S.displacementScale.value=v.displacementScale,S.displacementBias.value=v.displacementBias),v.emissiveMap&&(S.emissiveMap.value=v.emissiveMap,n(v.emissiveMap,S.emissiveMapTransform)),v.specularMap&&(S.specularMap.value=v.specularMap,n(v.specularMap,S.specularMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest);const L=t.get(v),D=L.envMap,w=L.envMapRotation;D&&(S.envMap.value=D,Ns.copy(w),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),S.envMapRotation.value.setFromMatrix4(JA.makeRotationFromEuler(Ns)),S.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=v.reflectivity,S.ior.value=v.ior,S.refractionRatio.value=v.refractionRatio),v.lightMap&&(S.lightMap.value=v.lightMap,S.lightMapIntensity.value=v.lightMapIntensity,n(v.lightMap,S.lightMapTransform)),v.aoMap&&(S.aoMap.value=v.aoMap,S.aoMapIntensity.value=v.aoMapIntensity,n(v.aoMap,S.aoMapTransform))}function f(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform))}function d(S,v){S.dashSize.value=v.dashSize,S.totalSize.value=v.dashSize+v.gapSize,S.scale.value=v.scale}function m(S,v,L,D){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.size.value=v.size*L,S.scale.value=D*.5,v.map&&(S.map.value=v.map,n(v.map,S.uvTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function p(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.rotation.value=v.rotation,v.map&&(S.map.value=v.map,n(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,n(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function g(S,v){S.specular.value.copy(v.specular),S.shininess.value=Math.max(v.shininess,1e-4)}function _(S,v){v.gradientMap&&(S.gradientMap.value=v.gradientMap)}function x(S,v){S.metalness.value=v.metalness,v.metalnessMap&&(S.metalnessMap.value=v.metalnessMap,n(v.metalnessMap,S.metalnessMapTransform)),S.roughness.value=v.roughness,v.roughnessMap&&(S.roughnessMap.value=v.roughnessMap,n(v.roughnessMap,S.roughnessMapTransform)),v.envMap&&(S.envMapIntensity.value=v.envMapIntensity)}function M(S,v,L){S.ior.value=v.ior,v.sheen>0&&(S.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),S.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(S.sheenColorMap.value=v.sheenColorMap,n(v.sheenColorMap,S.sheenColorMapTransform)),v.sheenRoughnessMap&&(S.sheenRoughnessMap.value=v.sheenRoughnessMap,n(v.sheenRoughnessMap,S.sheenRoughnessMapTransform))),v.clearcoat>0&&(S.clearcoat.value=v.clearcoat,S.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(S.clearcoatMap.value=v.clearcoatMap,n(v.clearcoatMap,S.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,n(v.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(S.clearcoatNormalMap.value=v.clearcoatNormalMap,n(v.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===ei&&S.clearcoatNormalScale.value.negate())),v.dispersion>0&&(S.dispersion.value=v.dispersion),v.iridescence>0&&(S.iridescence.value=v.iridescence,S.iridescenceIOR.value=v.iridescenceIOR,S.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(S.iridescenceMap.value=v.iridescenceMap,n(v.iridescenceMap,S.iridescenceMapTransform)),v.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=v.iridescenceThicknessMap,n(v.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),v.transmission>0&&(S.transmission.value=v.transmission,S.transmissionSamplerMap.value=L.texture,S.transmissionSamplerSize.value.set(L.width,L.height),v.transmissionMap&&(S.transmissionMap.value=v.transmissionMap,n(v.transmissionMap,S.transmissionMapTransform)),S.thickness.value=v.thickness,v.thicknessMap&&(S.thicknessMap.value=v.thicknessMap,n(v.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=v.attenuationDistance,S.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(S.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(S.anisotropyMap.value=v.anisotropyMap,n(v.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=v.specularIntensity,S.specularColor.value.copy(v.specularColor),v.specularColorMap&&(S.specularColorMap.value=v.specularColorMap,n(v.specularColorMap,S.specularColorMapTransform)),v.specularIntensityMap&&(S.specularIntensityMap.value=v.specularIntensityMap,n(v.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,v){v.matcap&&(S.matcap.value=v.matcap)}function T(S,v){const L=t.get(v).light;S.referencePosition.value.setFromMatrixPosition(L.matrixWorld),S.nearDistance.value=L.shadow.camera.near,S.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:l}}function t2(r,t,n,a){let l={},c={},f=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(L,D){const w=D.program;a.uniformBlockBinding(L,w)}function p(L,D){let w=l[L.id];w===void 0&&(E(L),w=g(L),l[L.id]=w,L.addEventListener("dispose",S));const W=D.program;a.updateUBOMapping(L,W);const F=t.render.frame;c[L.id]!==F&&(x(L),c[L.id]=F)}function g(L){const D=_();L.__bindingPointIndex=D;const w=r.createBuffer(),W=L.__size,F=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,w),r.bufferData(r.UNIFORM_BUFFER,W,F),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,D,w),w}function _(){for(let L=0;L<d;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(L){const D=l[L.id],w=L.uniforms,W=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,D);for(let F=0,O=w.length;F<O;F++){const H=Array.isArray(w[F])?w[F]:[w[F]];for(let U=0,R=H.length;U<R;U++){const B=H[U];if(M(B,F,U,W)===!0){const j=B.__offset,$=Array.isArray(B.value)?B.value:[B.value];let lt=0;for(let ft=0;ft<$.length;ft++){const z=$[ft],Q=T(z);typeof z=="number"||typeof z=="boolean"?(B.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,j+lt,B.__data)):z.isMatrix3?(B.__data[0]=z.elements[0],B.__data[1]=z.elements[1],B.__data[2]=z.elements[2],B.__data[3]=0,B.__data[4]=z.elements[3],B.__data[5]=z.elements[4],B.__data[6]=z.elements[5],B.__data[7]=0,B.__data[8]=z.elements[6],B.__data[9]=z.elements[7],B.__data[10]=z.elements[8],B.__data[11]=0):(z.toArray(B.__data,lt),lt+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,j,B.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(L,D,w,W){const F=L.value,O=D+"_"+w;if(W[O]===void 0)return typeof F=="number"||typeof F=="boolean"?W[O]=F:W[O]=F.clone(),!0;{const H=W[O];if(typeof F=="number"||typeof F=="boolean"){if(H!==F)return W[O]=F,!0}else if(H.equals(F)===!1)return H.copy(F),!0}return!1}function E(L){const D=L.uniforms;let w=0;const W=16;for(let O=0,H=D.length;O<H;O++){const U=Array.isArray(D[O])?D[O]:[D[O]];for(let R=0,B=U.length;R<B;R++){const j=U[R],$=Array.isArray(j.value)?j.value:[j.value];for(let lt=0,ft=$.length;lt<ft;lt++){const z=$[lt],Q=T(z),K=w%W,St=K%Q.boundary,Tt=K+St;w+=St,Tt!==0&&W-Tt<Q.storage&&(w+=W-Tt),j.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=w,w+=Q.storage}}}const F=w%W;return F>0&&(w+=W-F),L.__size=w,L.__cache={},this}function T(L){const D={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(D.boundary=4,D.storage=4):L.isVector2?(D.boundary=8,D.storage=8):L.isVector3||L.isColor?(D.boundary=16,D.storage=12):L.isVector4?(D.boundary=16,D.storage=16):L.isMatrix3?(D.boundary=48,D.storage=48):L.isMatrix4?(D.boundary=64,D.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),D}function S(L){const D=L.target;D.removeEventListener("dispose",S);const w=f.indexOf(D.__bindingPointIndex);f.splice(w,1),r.deleteBuffer(l[D.id]),delete l[D.id],delete c[D.id]}function v(){for(const L in l)r.deleteBuffer(l[L]);f=[],l={},c={}}return{bind:m,update:p,dispose:v}}class e2{constructor(t={}){const{canvas:n=XM(),context:a=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=a.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),T=new Int32Array(4);let S=null,v=null;const L=[],D=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hi,this.toneMapping=os,this.toneMappingExposure=1;const w=this;let W=!1,F=0,O=0,H=null,U=-1,R=null;const B=new on,j=new on;let $=null;const lt=new fe(0);let ft=0,z=n.width,Q=n.height,K=1,St=null,Tt=null;const P=new on(0,0,z,Q),st=new on(0,0,z,Q);let yt=!1;const Z=new ux;let ht=!1,Et=!1;const xt=new an,Vt=new an,Gt=new J,ae=new on,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Ke(){return H===null?K:1}let q=a;function Nn(C,k){return n.getContext(C,k)}try{const C={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ap}`),n.addEventListener("webglcontextlost",vt,!1),n.addEventListener("webglcontextrestored",wt,!1),n.addEventListener("webglcontextcreationerror",Lt,!1),q===null){const k="webgl2";if(q=Nn(k,C),q===null)throw Nn(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let he,ge,Qt,Pe,Zt,N,A,at,pt,Mt,gt,Wt,Ut,zt,_e,At,Bt,Kt,Yt,Ot,te,re,Ge,V;function Rt(){he=new rb(q),he.init(),re=new qA(q,he),ge=new tb(q,he,t,re),Qt=new VA(q,he),ge.reverseDepthBuffer&&x&&Qt.buffers.depth.setReversed(!0),Pe=new cb(q),Zt=new RA,N=new XA(q,he,Qt,Zt,ge,re,Pe),A=new nb(w),at=new sb(w),pt=new gE(q),Ge=new JT(q,pt),Mt=new ob(q,pt,Pe,Ge),gt=new fb(q,Mt,pt,Pe),Yt=new ub(q,ge,N),At=new eb(Zt),Wt=new AA(w,A,at,he,ge,Ge,At),Ut=new $A(w,Zt),zt=new CA,_e=new PA(he),Kt=new QT(w,A,at,Qt,gt,M,m),Bt=new HA(w,gt,ge),V=new t2(q,Pe,ge,Qt),Ot=new $T(q,he,Pe),te=new lb(q,he,Pe),Pe.programs=Wt.programs,w.capabilities=ge,w.extensions=he,w.properties=Zt,w.renderLists=zt,w.shadowMap=Bt,w.state=Qt,w.info=Pe}Rt();const ut=new QA(w,q);this.xr=ut,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const C=he.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=he.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(C){C!==void 0&&(K=C,this.setSize(z,Q,!1))},this.getSize=function(C){return C.set(z,Q)},this.setSize=function(C,k,ot=!0){if(ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=C,Q=k,n.width=Math.floor(C*K),n.height=Math.floor(k*K),ot===!0&&(n.style.width=C+"px",n.style.height=k+"px"),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(z*K,Q*K).floor()},this.setDrawingBufferSize=function(C,k,ot){z=C,Q=k,K=ot,n.width=Math.floor(C*ot),n.height=Math.floor(k*ot),this.setViewport(0,0,C,k)},this.getCurrentViewport=function(C){return C.copy(B)},this.getViewport=function(C){return C.copy(P)},this.setViewport=function(C,k,ot,rt){C.isVector4?P.set(C.x,C.y,C.z,C.w):P.set(C,k,ot,rt),Qt.viewport(B.copy(P).multiplyScalar(K).round())},this.getScissor=function(C){return C.copy(st)},this.setScissor=function(C,k,ot,rt){C.isVector4?st.set(C.x,C.y,C.z,C.w):st.set(C,k,ot,rt),Qt.scissor(j.copy(st).multiplyScalar(K).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(C){Qt.setScissorTest(yt=C)},this.setOpaqueSort=function(C){St=C},this.setTransparentSort=function(C){Tt=C},this.getClearColor=function(C){return C.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(C=!0,k=!0,ot=!0){let rt=0;if(C){let X=!1;if(H!==null){const bt=H.texture.format;X=bt===up||bt===cp||bt===lp}if(X){const bt=H.texture.type,Ct=bt===Aa||bt===ks||bt===ll||bt===Zr||bt===rp||bt===op,Dt=Kt.getClearColor(),kt=Kt.getClearAlpha(),ne=Dt.r,$t=Dt.g,It=Dt.b;Ct?(E[0]=ne,E[1]=$t,E[2]=It,E[3]=kt,q.clearBufferuiv(q.COLOR,0,E)):(T[0]=ne,T[1]=$t,T[2]=It,T[3]=kt,q.clearBufferiv(q.COLOR,0,T))}else rt|=q.COLOR_BUFFER_BIT}k&&(rt|=q.DEPTH_BUFFER_BIT),ot&&(rt|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",vt,!1),n.removeEventListener("webglcontextrestored",wt,!1),n.removeEventListener("webglcontextcreationerror",Lt,!1),zt.dispose(),_e.dispose(),Zt.dispose(),A.dispose(),at.dispose(),gt.dispose(),Ge.dispose(),V.dispose(),Wt.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",io),ut.removeEventListener("sessionend",ao),Gi.stop()};function vt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),W=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),W=!1;const C=Pe.autoReset,k=Bt.enabled,ot=Bt.autoUpdate,rt=Bt.needsUpdate,X=Bt.type;Rt(),Pe.autoReset=C,Bt.enabled=k,Bt.autoUpdate=ot,Bt.needsUpdate=rt,Bt.type=X}function Lt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ee(C){const k=C.target;k.removeEventListener("dispose",ee),Qe(k)}function Qe(C){pn(C),Zt.remove(C)}function pn(C){const k=Zt.get(C).programs;k!==void 0&&(k.forEach(function(ot){Wt.releaseProgram(ot)}),C.isShaderMaterial&&Wt.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,ot,rt,X,bt){k===null&&(k=He);const Ct=X.isMesh&&X.matrixWorld.determinant()<0,Dt=ro(C,k,ot,rt,X);Qt.setMaterial(rt,Ct);let kt=ot.index,ne=1;if(rt.wireframe===!0){if(kt=Mt.getWireframeAttribute(ot),kt===void 0)return;ne=2}const $t=ot.drawRange,It=ot.attributes.position;let be=$t.start*ne,ze=($t.start+$t.count)*ne;bt!==null&&(be=Math.max(be,bt.start*ne),ze=Math.min(ze,(bt.start+bt.count)*ne)),kt!==null?(be=Math.max(be,0),ze=Math.min(ze,kt.count)):It!=null&&(be=Math.max(be,0),ze=Math.min(ze,It.count));const Ve=ze-be;if(Ve<0||Ve===1/0)return;Ge.setup(X,rt,Dt,ot,kt);let On,Se=Ot;if(kt!==null&&(On=pt.get(kt),Se=te,Se.setIndex(On)),X.isMesh)rt.wireframe===!0?(Qt.setLineWidth(rt.wireframeLinewidth*Ke()),Se.setMode(q.LINES)):Se.setMode(q.TRIANGLES);else if(X.isLine){let Xt=rt.linewidth;Xt===void 0&&(Xt=1),Qt.setLineWidth(Xt*Ke()),X.isLineSegments?Se.setMode(q.LINES):X.isLineLoop?Se.setMode(q.LINE_LOOP):Se.setMode(q.LINE_STRIP)}else X.isPoints?Se.setMode(q.POINTS):X.isSprite&&Se.setMode(q.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Se.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))Se.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Xt=X._multiDrawStarts,mn=X._multiDrawCounts,se=X._multiDrawCount,Xn=kt?pt.get(kt).bytesPerElement:1,wa=Zt.get(rt).currentProgram.getUniforms();for(let An=0;An<se;An++)wa.setValue(q,"_gl_DrawID",An),Se.render(Xt[An]/Xn,mn[An])}else if(X.isInstancedMesh)Se.renderInstances(be,Ve,X.count);else if(ot.isInstancedBufferGeometry){const Xt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,mn=Math.min(ot.instanceCount,Xt);Se.renderInstances(be,Ve,mn)}else Se.render(be,Ve)};function Re(C,k,ot){C.transparent===!0&&C.side===Sa&&C.forceSinglePass===!1?(C.side=ei,C.needsUpdate=!0,tn(C,k,ot),C.side=ls,C.needsUpdate=!0,tn(C,k,ot),C.side=Sa):tn(C,k,ot)}this.compile=function(C,k,ot=null){ot===null&&(ot=C),v=_e.get(ot),v.init(k),D.push(v),ot.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),C!==ot&&C.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights();const rt=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const bt=X.material;if(bt)if(Array.isArray(bt))for(let Ct=0;Ct<bt.length;Ct++){const Dt=bt[Ct];Re(Dt,ot,X),rt.add(Dt)}else Re(bt,ot,X),rt.add(bt)}),D.pop(),v=null,rt},this.compileAsync=function(C,k,ot=null){const rt=this.compile(C,k,ot);return new Promise(X=>{function bt(){if(rt.forEach(function(Ct){Zt.get(Ct).currentProgram.isReady()&&rt.delete(Ct)}),rt.size===0){X(C);return}setTimeout(bt,10)}he.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let Tn=null;function wi(C){Tn&&Tn(C)}function io(){Gi.stop()}function ao(){Gi.start()}const Gi=new fx;Gi.setAnimationLoop(wi),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(C){Tn=C,ut.setAnimationLoop(C),C===null?Gi.stop():Gi.start()},ut.addEventListener("sessionstart",io),ut.addEventListener("sessionend",ao),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(k),k=ut.getCamera()),C.isScene===!0&&C.onBeforeRender(w,C,k,H),v=_e.get(C,D.length),v.init(k),D.push(v),Vt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Z.setFromProjectionMatrix(Vt),Et=this.localClippingEnabled,ht=At.init(this.clippingPlanes,Et),S=zt.get(C,L.length),S.init(),L.push(S),ut.enabled===!0&&ut.isPresenting===!0){const bt=w.xr.getDepthSensingMesh();bt!==null&&us(bt,k,-1/0,w.sortObjects)}us(C,k,0,w.sortObjects),S.finish(),w.sortObjects===!0&&S.sort(St,Tt),de=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,de&&Kt.addToRenderList(S,C),this.info.render.frame++,ht===!0&&At.beginShadows();const ot=v.state.shadowsArray;Bt.render(ot,C,k),ht===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,X=S.transmissive;if(v.setupLights(),k.isArrayCamera){const bt=k.cameras;if(X.length>0)for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];so(rt,X,C,kt)}de&&Kt.render(C);for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];Xs(S,C,kt,kt.viewport)}}else X.length>0&&so(rt,X,C,k),de&&Kt.render(C),Xs(S,C,k);H!==null&&(N.updateMultisampleRenderTarget(H),N.updateRenderTargetMipmap(H)),C.isScene===!0&&C.onAfterRender(w,C,k),Ge.resetDefaultState(),U=-1,R=null,D.pop(),D.length>0?(v=D[D.length-1],ht===!0&&At.setGlobalState(w.clippingPlanes,v.state.camera)):v=null,L.pop(),L.length>0?S=L[L.length-1]:S=null};function us(C,k,ot,rt){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)ot=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Z.intersectsSprite(C)){rt&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Vt);const Ct=gt.update(C),Dt=C.material;Dt.visible&&S.push(C,Ct,Dt,ot,ae.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Z.intersectsObject(C))){const Ct=gt.update(C),Dt=C.material;if(rt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),ae.copy(Ct.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(Vt)),Array.isArray(Dt)){const kt=Ct.groups;for(let ne=0,$t=kt.length;ne<$t;ne++){const It=kt[ne],be=Dt[It.materialIndex];be&&be.visible&&S.push(C,Ct,be,ot,ae.z,It)}}else Dt.visible&&S.push(C,Ct,Dt,ot,ae.z,null)}}const bt=C.children;for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++)us(bt[Ct],k,ot,rt)}function Xs(C,k,ot,rt){const X=C.opaque,bt=C.transmissive,Ct=C.transparent;v.setupLightsView(ot),ht===!0&&At.setGlobalState(w.clippingPlanes,ot),rt&&Qt.viewport(B.copy(rt)),X.length>0&&fs(X,k,ot),bt.length>0&&fs(bt,k,ot),Ct.length>0&&fs(Ct,k,ot),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function so(C,k,ot,rt){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[rt.id]===void 0&&(v.state.transmissionRenderTarget[rt.id]=new cs(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Jr:Aa,minFilter:Hs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ae.workingColorSpace}));const bt=v.state.transmissionRenderTarget[rt.id],Ct=rt.viewport||B;bt.setSize(Ct.z,Ct.w);const Dt=w.getRenderTarget();w.setRenderTarget(bt),w.getClearColor(lt),ft=w.getClearAlpha(),ft<1&&w.setClearColor(16777215,.5),w.clear(),de&&Kt.render(ot);const kt=w.toneMapping;w.toneMapping=os;const ne=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),v.setupLightsView(rt),ht===!0&&At.setGlobalState(w.clippingPlanes,rt),fs(C,ot,rt),N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt),he.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let It=0,be=k.length;It<be;It++){const ze=k[It],Ve=ze.object,On=ze.geometry,Se=ze.material,Xt=ze.group;if(Se.side===Sa&&Ve.layers.test(rt.layers)){const mn=Se.side;Se.side=ei,Se.needsUpdate=!0,Ci(Ve,ot,rt,On,Se,Xt),Se.side=mn,Se.needsUpdate=!0,$t=!0}}$t===!0&&(N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt))}w.setRenderTarget(Dt),w.setClearColor(lt,ft),ne!==void 0&&(rt.viewport=ne),w.toneMapping=kt}function fs(C,k,ot){const rt=k.isScene===!0?k.overrideMaterial:null;for(let X=0,bt=C.length;X<bt;X++){const Ct=C[X],Dt=Ct.object,kt=Ct.geometry,ne=rt===null?Ct.material:rt,$t=Ct.group;Dt.layers.test(ot.layers)&&Ci(Dt,k,ot,kt,ne,$t)}}function Ci(C,k,ot,rt,X,bt){C.onBeforeRender(w,k,ot,rt,X,bt),C.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(w,k,ot,rt,C,bt),X.transparent===!0&&X.side===Sa&&X.forceSinglePass===!1?(X.side=ei,X.needsUpdate=!0,w.renderBufferDirect(ot,k,rt,X,C,bt),X.side=ls,X.needsUpdate=!0,w.renderBufferDirect(ot,k,rt,X,C,bt),X.side=Sa):w.renderBufferDirect(ot,k,rt,X,C,bt),C.onAfterRender(w,k,ot,rt,X,bt)}function tn(C,k,ot){k.isScene!==!0&&(k=He);const rt=Zt.get(C),X=v.state.lights,bt=v.state.shadowsArray,Ct=X.state.version,Dt=Wt.getParameters(C,X.state,bt,k,ot),kt=Wt.getProgramCacheKey(Dt);let ne=rt.programs;rt.environment=C.isMeshStandardMaterial?k.environment:null,rt.fog=k.fog,rt.envMap=(C.isMeshStandardMaterial?at:A).get(C.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&C.envMap===null?k.environmentRotation:C.envMapRotation,ne===void 0&&(C.addEventListener("dispose",ee),ne=new Map,rt.programs=ne);let $t=ne.get(kt);if($t!==void 0){if(rt.currentProgram===$t&&rt.lightsStateVersion===Ct)return Zi(C,Dt),$t}else Dt.uniforms=Wt.getUniforms(C),C.onBeforeCompile(Dt,w),$t=Wt.acquireProgram(Dt,kt),ne.set(kt,$t),rt.uniforms=Dt.uniforms;const It=rt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(It.clippingPlanes=At.uniform),Zi(C,Dt),rt.needsLights=vu(C),rt.lightsStateVersion=Ct,rt.needsLights&&(It.ambientLightColor.value=X.state.ambient,It.lightProbe.value=X.state.probe,It.directionalLights.value=X.state.directional,It.directionalLightShadows.value=X.state.directionalShadow,It.spotLights.value=X.state.spot,It.spotLightShadows.value=X.state.spotShadow,It.rectAreaLights.value=X.state.rectArea,It.ltc_1.value=X.state.rectAreaLTC1,It.ltc_2.value=X.state.rectAreaLTC2,It.pointLights.value=X.state.point,It.pointLightShadows.value=X.state.pointShadow,It.hemisphereLights.value=X.state.hemi,It.directionalShadowMap.value=X.state.directionalShadowMap,It.directionalShadowMatrix.value=X.state.directionalShadowMatrix,It.spotShadowMap.value=X.state.spotShadowMap,It.spotLightMatrix.value=X.state.spotLightMatrix,It.spotLightMap.value=X.state.spotLightMap,It.pointShadowMap.value=X.state.pointShadowMap,It.pointShadowMatrix.value=X.state.pointShadowMatrix),rt.currentProgram=$t,rt.uniformsList=null,$t}function bn(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=su.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function Zi(C,k){const ot=Zt.get(C);ot.outputColorSpace=k.outputColorSpace,ot.batching=k.batching,ot.batchingColor=k.batchingColor,ot.instancing=k.instancing,ot.instancingColor=k.instancingColor,ot.instancingMorph=k.instancingMorph,ot.skinning=k.skinning,ot.morphTargets=k.morphTargets,ot.morphNormals=k.morphNormals,ot.morphColors=k.morphColors,ot.morphTargetsCount=k.morphTargetsCount,ot.numClippingPlanes=k.numClippingPlanes,ot.numIntersection=k.numClipIntersection,ot.vertexAlphas=k.vertexAlphas,ot.vertexTangents=k.vertexTangents,ot.toneMapping=k.toneMapping}function ro(C,k,ot,rt,X){k.isScene!==!0&&(k=He),N.resetTextureUnits();const bt=k.fog,Ct=rt.isMeshStandardMaterial?k.environment:null,Dt=H===null?w.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:$r,kt=(rt.isMeshStandardMaterial?at:A).get(rt.envMap||Ct),ne=rt.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,$t=!!ot.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),It=!!ot.morphAttributes.position,be=!!ot.morphAttributes.normal,ze=!!ot.morphAttributes.color;let Ve=os;rt.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Ve=w.toneMapping);const On=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Se=On!==void 0?On.length:0,Xt=Zt.get(rt),mn=v.state.lights;if(ht===!0&&(Et===!0||C!==R)){const Pn=C===R&&rt.id===U;At.setState(rt,C,Pn)}let se=!1;rt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==mn.state.version||Xt.outputColorSpace!==Dt||X.isBatchedMesh&&Xt.batching===!1||!X.isBatchedMesh&&Xt.batching===!0||X.isBatchedMesh&&Xt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Xt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Xt.instancing===!1||!X.isInstancedMesh&&Xt.instancing===!0||X.isSkinnedMesh&&Xt.skinning===!1||!X.isSkinnedMesh&&Xt.skinning===!0||X.isInstancedMesh&&Xt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Xt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Xt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Xt.instancingMorph===!1&&X.morphTexture!==null||Xt.envMap!==kt||rt.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==At.numPlanes||Xt.numIntersection!==At.numIntersection)||Xt.vertexAlphas!==ne||Xt.vertexTangents!==$t||Xt.morphTargets!==It||Xt.morphNormals!==be||Xt.morphColors!==ze||Xt.toneMapping!==Ve||Xt.morphTargetsCount!==Se)&&(se=!0):(se=!0,Xt.__version=rt.version);let Xn=Xt.currentProgram;se===!0&&(Xn=tn(rt,k,X));let wa=!1,An=!1,Ca=!1;const Oe=Xn.getUniforms(),pi=Xt.uniforms;if(Qt.useProgram(Xn.program)&&(wa=!0,An=!0,Ca=!0),rt.id!==U&&(U=rt.id,An=!0),wa||R!==C){Qt.buffers.depth.getReversed()?(xt.copy(C.projectionMatrix),WM(xt),YM(xt),Oe.setValue(q,"projectionMatrix",xt)):Oe.setValue(q,"projectionMatrix",C.projectionMatrix),Oe.setValue(q,"viewMatrix",C.matrixWorldInverse);const Di=Oe.map.cameraPosition;Di!==void 0&&Di.setValue(q,Gt.setFromMatrixPosition(C.matrixWorld)),ge.logarithmicDepthBuffer&&Oe.setValue(q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Oe.setValue(q,"isOrthographic",C.isOrthographicCamera===!0),R!==C&&(R=C,An=!0,Ca=!0)}if(X.isSkinnedMesh){Oe.setOptional(q,X,"bindMatrix"),Oe.setOptional(q,X,"bindMatrixInverse");const Pn=X.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),Oe.setValue(q,"boneTexture",Pn.boneTexture,N))}X.isBatchedMesh&&(Oe.setOptional(q,X,"batchingTexture"),Oe.setValue(q,"batchingTexture",X._matricesTexture,N),Oe.setOptional(q,X,"batchingIdTexture"),Oe.setValue(q,"batchingIdTexture",X._indirectTexture,N),Oe.setOptional(q,X,"batchingColorTexture"),X._colorsTexture!==null&&Oe.setValue(q,"batchingColorTexture",X._colorsTexture,N));const Sn=ot.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&Yt.update(X,ot,Xn),(An||Xt.receiveShadow!==X.receiveShadow)&&(Xt.receiveShadow=X.receiveShadow,Oe.setValue(q,"receiveShadow",X.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(pi.envMap.value=kt,pi.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&k.environment!==null&&(pi.envMapIntensity.value=k.environmentIntensity),An&&(Oe.setValue(q,"toneMappingExposure",w.toneMappingExposure),Xt.needsLights&&_u(pi,Ca),bt&&rt.fog===!0&&Ut.refreshFogUniforms(pi,bt),Ut.refreshMaterialUniforms(pi,rt,K,Q,v.state.transmissionRenderTarget[C.id]),su.upload(q,bn(Xt),pi,N)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(su.upload(q,bn(Xt),pi,N),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Oe.setValue(q,"center",X.center),Oe.setValue(q,"modelViewMatrix",X.modelViewMatrix),Oe.setValue(q,"normalMatrix",X.normalMatrix),Oe.setValue(q,"modelMatrix",X.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Pn=rt.uniformsGroups;for(let Di=0,mi=Pn.length;Di<mi;Di++){const Ki=Pn[Di];V.update(Ki,Xn),V.bind(Ki,Xn)}}return Xn}function _u(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function vu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(C,k,ot){Zt.get(C.texture).__webglTexture=k,Zt.get(C.depthTexture).__webglTexture=ot;const rt=Zt.get(C);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=ot===void 0,rt.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,k){const ot=Zt.get(C);ot.__webglFramebuffer=k,ot.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,ot=0){H=C,F=k,O=ot;let rt=!0,X=null,bt=!1,Ct=!1;if(C){const kt=Zt.get(C);if(kt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(q.FRAMEBUFFER,null),rt=!1;else if(kt.__webglFramebuffer===void 0)N.setupRenderTarget(C);else if(kt.__hasExternalTextures)N.rebindTextures(C,Zt.get(C.texture).__webglTexture,Zt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const It=C.depthTexture;if(kt.__boundDepthTexture!==It){if(It!==null&&Zt.has(It)&&(C.width!==It.image.width||C.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(C)}}const ne=C.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Ct=!0);const $t=Zt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[k])?X=$t[k][ot]:X=$t[k],bt=!0):C.samples>0&&N.useMultisampledRTT(C)===!1?X=Zt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?X=$t[ot]:X=$t,B.copy(C.viewport),j.copy(C.scissor),$=C.scissorTest}else B.copy(P).multiplyScalar(K).floor(),j.copy(st).multiplyScalar(K).floor(),$=yt;if(Qt.bindFramebuffer(q.FRAMEBUFFER,X)&&rt&&Qt.drawBuffers(C,X),Qt.viewport(B),Qt.scissor(j),Qt.setScissorTest($),bt){const kt=Zt.get(C.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+k,kt.__webglTexture,ot)}else if(Ct){const kt=Zt.get(C.texture),ne=k||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,kt.__webglTexture,ot||0,ne)}U=-1},this.readRenderTargetPixels=function(C,k,ot,rt,X,bt,Ct){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){Qt.bindFramebuffer(q.FRAMEBUFFER,Dt);try{const kt=C.texture,ne=kt.format,$t=kt.type;if(!ge.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-rt&&ot>=0&&ot<=C.height-X&&q.readPixels(k,ot,rt,X,re.convert(ne),re.convert($t),bt)}finally{const kt=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(C,k,ot,rt,X,bt,Ct){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){const kt=C.texture,ne=kt.format,$t=kt.type;if(!ge.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=C.width-rt&&ot>=0&&ot<=C.height-X){Qt.bindFramebuffer(q.FRAMEBUFFER,Dt);const It=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,It),q.bufferData(q.PIXEL_PACK_BUFFER,bt.byteLength,q.STREAM_READ),q.readPixels(k,ot,rt,X,re.convert(ne),re.convert($t),0);const be=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,be);const ze=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await qM(q,ze,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,It),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,bt),q.deleteBuffer(It),q.deleteSync(ze),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,k=null,ot=0){C.isTexture!==!0&&(sl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,C=arguments[1]);const rt=Math.pow(2,-ot),X=Math.floor(C.image.width*rt),bt=Math.floor(C.image.height*rt),Ct=k!==null?k.x:0,Dt=k!==null?k.y:0;N.setTexture2D(C,0),q.copyTexSubImage2D(q.TEXTURE_2D,ot,0,0,Ct,Dt,X,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(C,k,ot=null,rt=null,X=0){C.isTexture!==!0&&(sl("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,C=arguments[1],k=arguments[2],X=arguments[3]||0,ot=null);let bt,Ct,Dt,kt,ne,$t,It,be,ze;const Ve=C.isCompressedTexture?C.mipmaps[X]:C.image;ot!==null?(bt=ot.max.x-ot.min.x,Ct=ot.max.y-ot.min.y,Dt=ot.isBox3?ot.max.z-ot.min.z:1,kt=ot.min.x,ne=ot.min.y,$t=ot.isBox3?ot.min.z:0):(bt=Ve.width,Ct=Ve.height,Dt=Ve.depth||1,kt=0,ne=0,$t=0),rt!==null?(It=rt.x,be=rt.y,ze=rt.z):(It=0,be=0,ze=0);const On=re.convert(k.format),Se=re.convert(k.type);let Xt;k.isData3DTexture?(N.setTexture3D(k,0),Xt=q.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(N.setTexture2DArray(k,0),Xt=q.TEXTURE_2D_ARRAY):(N.setTexture2D(k,0),Xt=q.TEXTURE_2D),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,k.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,k.unpackAlignment);const mn=q.getParameter(q.UNPACK_ROW_LENGTH),se=q.getParameter(q.UNPACK_IMAGE_HEIGHT),Xn=q.getParameter(q.UNPACK_SKIP_PIXELS),wa=q.getParameter(q.UNPACK_SKIP_ROWS),An=q.getParameter(q.UNPACK_SKIP_IMAGES);q.pixelStorei(q.UNPACK_ROW_LENGTH,Ve.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ve.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,kt),q.pixelStorei(q.UNPACK_SKIP_ROWS,ne),q.pixelStorei(q.UNPACK_SKIP_IMAGES,$t);const Ca=C.isDataArrayTexture||C.isData3DTexture,Oe=k.isDataArrayTexture||k.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const pi=Zt.get(C),Sn=Zt.get(k),Pn=Zt.get(pi.__renderTarget),Di=Zt.get(Sn.__renderTarget);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,Pn.__webglFramebuffer),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let mi=0;mi<Dt;mi++)Ca&&q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(C).__webglTexture,X,$t+mi),C.isDepthTexture?(Oe&&q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(k).__webglTexture,X,ze+mi),q.blitFramebuffer(kt,ne,bt,Ct,It,be,bt,Ct,q.DEPTH_BUFFER_BIT,q.NEAREST)):Oe?q.copyTexSubImage3D(Xt,X,It,be,ze+mi,kt,ne,bt,Ct):q.copyTexSubImage2D(Xt,X,It,be,ze+mi,kt,ne,bt,Ct);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Oe?C.isDataTexture||C.isData3DTexture?q.texSubImage3D(Xt,X,It,be,ze,bt,Ct,Dt,On,Se,Ve.data):k.isCompressedArrayTexture?q.compressedTexSubImage3D(Xt,X,It,be,ze,bt,Ct,Dt,On,Ve.data):q.texSubImage3D(Xt,X,It,be,ze,bt,Ct,Dt,On,Se,Ve):C.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,X,It,be,bt,Ct,On,Se,Ve.data):C.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,X,It,be,Ve.width,Ve.height,On,Ve.data):q.texSubImage2D(q.TEXTURE_2D,X,It,be,bt,Ct,On,Se,Ve);q.pixelStorei(q.UNPACK_ROW_LENGTH,mn),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,se),q.pixelStorei(q.UNPACK_SKIP_PIXELS,Xn),q.pixelStorei(q.UNPACK_SKIP_ROWS,wa),q.pixelStorei(q.UNPACK_SKIP_IMAGES,An),X===0&&k.generateMipmaps&&q.generateMipmap(Xt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(C,k,ot=null,rt=null,X=0){return C.isTexture!==!0&&(sl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ot=arguments[0]||null,rt=arguments[1]||null,C=arguments[2],k=arguments[3],X=arguments[4]||0),sl('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,k,ot,rt,X)},this.initRenderTarget=function(C){Zt.get(C).__webglFramebuffer===void 0&&N.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?N.setTextureCube(C,0):C.isData3DTexture?N.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?N.setTexture2DArray(C,0):N.setTexture2D(C,0),Qt.unbindTexture()},this.resetState=function(){F=0,O=0,H=null,Qt.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ea}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Ae._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ae._getUnpackColorSpace()}}class n2 extends Vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ra,this.environmentIntensity=1,this.environmentRotation=new Ra,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class vx extends eo{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const cu=new J,uu=new J,xv=new an,nl=new fp,qc=new hl,hd=new J,yv=new J;class i2 extends Vn{constructor(t=new kn,n=new vx){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[0];for(let l=1,c=n.count;l<c;l++)cu.fromBufferAttribute(n,l-1),uu.fromBufferAttribute(n,l),a[l]=a[l-1],a[l]+=cu.distanceTo(uu);t.setAttribute("lineDistance",new vn(a,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),qc.copy(a.boundingSphere),qc.applyMatrix4(l),qc.radius+=c,t.ray.intersectsSphere(qc)===!1)return;xv.copy(l).invert(),nl.copy(t.ray).applyMatrix4(xv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=a.index,x=a.attributes.position;if(g!==null){const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=p){const v=g.getX(T),L=g.getX(T+1),D=Wc(this,t,nl,m,v,L);D&&n.push(D)}if(this.isLineLoop){const T=g.getX(E-1),S=g.getX(M),v=Wc(this,t,nl,m,T,S);v&&n.push(v)}}else{const M=Math.max(0,f.start),E=Math.min(x.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=p){const v=Wc(this,t,nl,m,T,T+1);v&&n.push(v)}if(this.isLineLoop){const T=Wc(this,t,nl,m,E-1,M);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Wc(r,t,n,a,l,c){const f=r.geometry.attributes.position;if(cu.fromBufferAttribute(f,l),uu.fromBufferAttribute(f,c),n.distanceSqToSegment(cu,uu,hd,yv)>a)return;hd.applyMatrix4(r.matrixWorld);const m=t.ray.origin.distanceTo(hd);if(!(m<t.near||m>t.far))return{distance:m,point:yv.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}class xx extends eo{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Sv=new an,ep=new fp,Yc=new hl,jc=new J;class a2 extends Vn{constructor(t=new kn,n=new xx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Yc.copy(a.boundingSphere),Yc.applyMatrix4(l),Yc.radius+=c,t.ray.intersectsSphere(Yc)===!1)return;Sv.copy(l).invert(),ep.copy(t.ray).applyMatrix4(Sv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=a.index,_=a.attributes.position;if(p!==null){const x=Math.max(0,f.start),M=Math.min(p.count,f.start+f.count);for(let E=x,T=M;E<T;E++){const S=p.getX(E);jc.fromBufferAttribute(_,S),Mv(jc,S,m,l,t,n,this)}}else{const x=Math.max(0,f.start),M=Math.min(_.count,f.start+f.count);for(let E=x,T=M;E<T;E++)jc.fromBufferAttribute(_,E),Mv(jc,E,m,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Mv(r,t,n,a,l,c,f){const d=ep.distanceSqToPoint(r);if(d<n){const m=new J;ep.closestPointToPoint(r,m),m.applyMatrix4(a);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class s2 extends Gn{constructor(t,n,a,l,c,f,d,m,p){super(t,n,a,l,c,f,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $e extends kn{constructor(t=1,n=1,a=1,l=32,c=1,f=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:d,thetaLength:m};const p=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],x=[],M=[];let E=0;const T=[],S=a/2;let v=0;L(),f===!1&&(t>0&&D(!0),n>0&&D(!1)),this.setIndex(g),this.setAttribute("position",new vn(_,3)),this.setAttribute("normal",new vn(x,3)),this.setAttribute("uv",new vn(M,2));function L(){const w=new J,W=new J;let F=0;const O=(n-t)/a;for(let H=0;H<=c;H++){const U=[],R=H/c,B=R*(n-t)+t;for(let j=0;j<=l;j++){const $=j/l,lt=$*m+d,ft=Math.sin(lt),z=Math.cos(lt);W.x=B*ft,W.y=-R*a+S,W.z=B*z,_.push(W.x,W.y,W.z),w.set(ft,O,z).normalize(),x.push(w.x,w.y,w.z),M.push($,1-R),U.push(E++)}T.push(U)}for(let H=0;H<l;H++)for(let U=0;U<c;U++){const R=T[U][H],B=T[U+1][H],j=T[U+1][H+1],$=T[U][H+1];(t>0||U!==0)&&(g.push(R,B,$),F+=3),(n>0||U!==c-1)&&(g.push(B,j,$),F+=3)}p.addGroup(v,F,0),v+=F}function D(w){const W=E,F=new Ce,O=new J;let H=0;const U=w===!0?t:n,R=w===!0?1:-1;for(let j=1;j<=l;j++)_.push(0,S*R,0),x.push(0,R,0),M.push(.5,.5),E++;const B=E;for(let j=0;j<=l;j++){const lt=j/l*m+d,ft=Math.cos(lt),z=Math.sin(lt);O.x=U*z,O.y=S*R,O.z=U*ft,_.push(O.x,O.y,O.z),x.push(0,R,0),F.x=ft*.5+.5,F.y=z*.5*R+.5,M.push(F.x,F.y),E++}for(let j=0;j<l;j++){const $=W+j,lt=B+j;w===!0?g.push(lt,lt+1,$):g.push(lt+1,lt,$),H+=3}p.addGroup(v,H,w===!0?1:2),v+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Vr extends $e{constructor(t=1,n=1,a=32,l=1,c=!1,f=0,d=Math.PI*2){super(0,t,n,a,l,c,f,d),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:d}}static fromJSON(t){return new Vr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dl extends kn{constructor(t=[],n=[],a=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:l};const c=[],f=[];d(l),p(a),g(),this.setAttribute("position",new vn(c,3)),this.setAttribute("normal",new vn(c.slice(),3)),this.setAttribute("uv",new vn(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function d(L){const D=new J,w=new J,W=new J;for(let F=0;F<n.length;F+=3)M(n[F+0],D),M(n[F+1],w),M(n[F+2],W),m(D,w,W,L)}function m(L,D,w,W){const F=W+1,O=[];for(let H=0;H<=F;H++){O[H]=[];const U=L.clone().lerp(w,H/F),R=D.clone().lerp(w,H/F),B=F-H;for(let j=0;j<=B;j++)j===0&&H===F?O[H][j]=U:O[H][j]=U.clone().lerp(R,j/B)}for(let H=0;H<F;H++)for(let U=0;U<2*(F-H)-1;U++){const R=Math.floor(U/2);U%2===0?(x(O[H][R+1]),x(O[H+1][R]),x(O[H][R])):(x(O[H][R+1]),x(O[H+1][R+1]),x(O[H+1][R]))}}function p(L){const D=new J;for(let w=0;w<c.length;w+=3)D.x=c[w+0],D.y=c[w+1],D.z=c[w+2],D.normalize().multiplyScalar(L),c[w+0]=D.x,c[w+1]=D.y,c[w+2]=D.z}function g(){const L=new J;for(let D=0;D<c.length;D+=3){L.x=c[D+0],L.y=c[D+1],L.z=c[D+2];const w=S(L)/2/Math.PI+.5,W=v(L)/Math.PI+.5;f.push(w,1-W)}E(),_()}function _(){for(let L=0;L<f.length;L+=6){const D=f[L+0],w=f[L+2],W=f[L+4],F=Math.max(D,w,W),O=Math.min(D,w,W);F>.9&&O<.1&&(D<.2&&(f[L+0]+=1),w<.2&&(f[L+2]+=1),W<.2&&(f[L+4]+=1))}}function x(L){c.push(L.x,L.y,L.z)}function M(L,D){const w=L*3;D.x=t[w+0],D.y=t[w+1],D.z=t[w+2]}function E(){const L=new J,D=new J,w=new J,W=new J,F=new Ce,O=new Ce,H=new Ce;for(let U=0,R=0;U<c.length;U+=9,R+=6){L.set(c[U+0],c[U+1],c[U+2]),D.set(c[U+3],c[U+4],c[U+5]),w.set(c[U+6],c[U+7],c[U+8]),F.set(f[R+0],f[R+1]),O.set(f[R+2],f[R+3]),H.set(f[R+4],f[R+5]),W.copy(L).add(D).add(w).divideScalar(3);const B=S(W);T(F,R+0,L,B),T(O,R+2,D,B),T(H,R+4,w,B)}}function T(L,D,w,W){W<0&&L.x===1&&(f[D]=L.x-1),w.x===0&&w.z===0&&(f[D]=W/2/Math.PI+.5)}function S(L){return Math.atan2(L.z,-L.x)}function v(L){return Math.atan2(-L.y,Math.sqrt(L.x*L.x+L.z*L.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dl(t.vertices,t.indices,t.radius,t.details)}}class fu extends dl{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=1/a,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-a,0,-l,a,0,l,-a,0,l,a,-l,-a,0,-l,a,0,l,-a,0,l,a,0,-a,0,-l,a,0,-l,-a,0,l,a,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new fu(t.radius,t.detail)}}class pp extends dl{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new pp(t.radius,t.detail)}}class hu extends dl{constructor(t=1,n=0){const a=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(a,l,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new hu(t.radius,t.detail)}}class $n extends kn{constructor(t=1,n=32,a=16,l=0,c=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:l,phiLength:c,thetaStart:f,thetaLength:d},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const m=Math.min(f+d,Math.PI);let p=0;const g=[],_=new J,x=new J,M=[],E=[],T=[],S=[];for(let v=0;v<=a;v++){const L=[],D=v/a;let w=0;v===0&&f===0?w=.5/n:v===a&&m===Math.PI&&(w=-.5/n);for(let W=0;W<=n;W++){const F=W/n;_.x=-t*Math.cos(l+F*c)*Math.sin(f+D*d),_.y=t*Math.cos(f+D*d),_.z=t*Math.sin(l+F*c)*Math.sin(f+D*d),E.push(_.x,_.y,_.z),x.copy(_).normalize(),T.push(x.x,x.y,x.z),S.push(F+w,1-D),L.push(p++)}g.push(L)}for(let v=0;v<a;v++)for(let L=0;L<n;L++){const D=g[v][L+1],w=g[v][L],W=g[v+1][L],F=g[v+1][L+1];(v!==0||f>0)&&M.push(D,w,F),(v!==a-1||m<Math.PI)&&M.push(w,W,F)}this.setIndex(M),this.setAttribute("position",new vn(E,3)),this.setAttribute("normal",new vn(T,3)),this.setAttribute("uv",new vn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class r2 extends Hi{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class yx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ev(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Ev();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function Ev(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ap}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ap);const o2={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const l2=new hx(-1,1,1,-1,0,1);class c2 extends kn{constructor(){super(),this.setAttribute("position",new vn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vn([0,2,0,0,2,0],2))}}const u2=new c2;class Sx{constructor(t){this._mesh=new Ln(u2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,l2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class f2 extends pl{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof Hi?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=hp.clone(t.uniforms),this.material=new Hi({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Sx(this.material)}render(t,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Tv extends pl{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,a){const l=t.getContext(),c=t.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,d;this.inverse?(f=0,d=1):(f=1,d=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(d),c.buffers.stencil.setLocked(!0),t.setRenderTarget(a),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class h2 extends pl{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class d2{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const a=t.getSize(new Ce);this._width=a.width,this._height=a.height,n=new cs(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Jr}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new f2(o2),this.copyPass.material.blending=Ta,this.clock=new yx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,a),f.needsSwap){if(a){const d=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),m.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}Tv!==void 0&&(f instanceof Tv?a=!0:f instanceof h2&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new Ce);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const a=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(a,l),this.renderTarget2.setSize(a,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(a,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class p2 extends pl{constructor(t,n,a=null,l=null,c=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=a,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(t,n,a){const l=t.autoClear;t.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(c=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const m2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class g2 extends pl{constructor(){super();const t=m2;this.uniforms=hp.clone(t.uniforms),this.material=new r2({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Sx(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,n,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ae.getTransfer(this._outputColorSpace)===Fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===zv?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Bv?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Iv?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Fv?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Hv?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Gv&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class _2{constructor(t,n,a,l,c){Pt(this,"composer");Pt(this,"outputPass");this.composer=new d2(t),this.composer.addPass(new p2(n,a)),this.outputPass=new g2,this.composer.addPass(this.outputPass),this.composer.setSize(l,c)}setSize(t,n){this.composer.setSize(t,n)}render(t){this.composer.render(t)}dispose(){this.composer.dispose(),this.outputPass.dispose()}}class v2{constructor(t,n,a){Pt(this,"scene");Pt(this,"renderer");Pt(this,"camera");Pt(this,"playerMeshes",new Map);Pt(this,"enemyMeshes",new Map);Pt(this,"projectileMeshes",new Map);Pt(this,"particleMeshes",new Map);Pt(this,"bossMeshes",new Map);Pt(this,"lockIndicators",new Map);Pt(this,"clock");Pt(this,"postFX");this.scene=new n2,this.scene.background=new fe(0),this.renderer=new e2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(n,a),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera=new Ai(60,n/a,.1,2e3),this.camera.position.set(0,g_,Nh),this.clock=new yx,this.postFX=new _2(this.renderer,this.scene,this.camera,n,a),this.buildVoidBackground()}buildVoidBackground(){const n=document.createElement("canvas");n.width=1024,n.height=1024;const a=n.getContext("2d");a.fillStyle="#000000",a.fillRect(0,0,1024,1024),a.globalAlpha=.18;const l=a.createLinearGradient(0,0,1024,1024);l.addColorStop(0,"rgba(40,60,140,0)"),l.addColorStop(.5,"rgba(40,60,140,0.5)"),l.addColorStop(1,"rgba(40,60,140,0)"),a.fillStyle=l;for(let f=0;f<5;f++)a.save(),a.translate(1024/2,1024/2),a.rotate(f/5*Math.PI*2+.2),a.fillRect(-1024/2,-8,1024,16),a.restore();a.globalAlpha=1;const c=new s2(n);c.wrapS=ol,c.wrapT=ol,c.colorSpace=hi,this.scene.background=c}updateCamera(t,n,a){const l=new J(t.x-Math.sin(a)*Nh,t.y+g_,t.z-Math.cos(a)*Nh),c=1-Math.exp(-8*n);this.camera.position.lerp(l,c),this.camera.lookAt(t.x,t.y,t.z)}resize(t,n){this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.postFX.setSize(t,n)}render(){this.postFX.render()}addPart(t,n,a,l){const c=new Hr({color:16777215}),f=new Ln(n,c);return f.position.set(a[0],a[1],a[2]),l&&f.rotation.set(l[0],l[1],l[2]),t.add(f),f}createPlayerMesh(t=new fe(16777215)){const n=new Gs;this.addPart(n,new Ne(1.8,1,1.4),[0,.5,0]),this.addPart(n,new Ne(1.6,.7,.4),[0,.6,.75]),this.addPart(n,new Ne(1.2,.5,.2),[0,.6,.95]),this.addPart(n,new $e(.8,1,.4,6),[0,0,0]),this.addPart(n,new Ne(.7,.5,.7),[0,1.3,0]),this.addPart(n,new Ne(.6,.1,.1),[0,1.3,.4]),this.addPart(n,new Ne(.1,.18,.1),[0,1.2,.4]),this.addPart(n,new Ne(.08,.25,.3),[0,1.6,0]),this.addPart(n,new Ne(.5,.15,.1),[0,1.1,.35]);for(let a=-1;a<=1;a+=2)this.addPart(n,new Ne(.8,.3,.6),[a*1.3,.9,0]),this.addPart(n,new Ne(.6,.15,.4),[a*1.3,1,0]),this.addPart(n,new $n(.2,6,6),[a*1.1,.7,0]);for(let a=-1;a<=1;a+=2)this.addPart(n,new $e(.2,.25,.7,6),[a*1.2,.3,0]),this.addPart(n,new $e(.15,.18,.55,6),[a*1.2,.3,.15]),this.addPart(n,new $n(.14,6,6),[a*1.2,-.1,0]),this.addPart(n,new $e(.16,.14,.5,6),[a*1.2,-.45,0]),this.addPart(n,new Ne(.2,.3,.15),[a*1.2,-.45,.2]),this.addPart(n,new $n(.1,6,6),[a*1.2,-.7,0]),a>0&&(this.addPart(n,new $e(.08,.1,.8,6),[a*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(n,new $e(.05,.06,1,6),[a*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(n,new $e(.07,.09,.1,6),[a*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(n,new Ne(.2,.12,.3),[a*1.35,-.3,.3]));for(let a=-1;a<=1;a+=2)this.addPart(n,new $e(.3,.35,.7,6),[a*.5,-.4,0]),this.addPart(n,new Ne(.3,.4,.4),[a*.5,-.3,.25]),this.addPart(n,new $n(.2,6,6),[a*.5,-.8,0]),this.addPart(n,new $n(.18,6,6),[a*.5,-.8,.15]),this.addPart(n,new $e(.25,.2,.6,6),[a*.5,-1.2,0]),this.addPart(n,new Ne(.25,.4,.3),[a*.5,-1.2,.2]),this.addPart(n,new $n(.15,6,6),[a*.5,-1.55,0]),this.addPart(n,new Ne(.4,.12,.5),[a*.5,-1.65,.1]),this.addPart(n,new Ne(.3,.06,.15),[a*.5,-1.7,.35]);this.addPart(n,new Ne(1,.6,.4),[0,.5,-.95]),this.addPart(n,new $e(.35,.4,.4,8),[0,.4,-1.2]);for(let a=-1;a<=1;a+=2)this.addPart(n,new $e(.2,.25,.35,6),[a*.45,.4,-1.15]),this.addPart(n,new $e(.15,.18,.25,6),[a*.35,.85,-.95]);this.addPart(n,new Ne(.7,.2,.15),[0,-.1,.55]);for(let a=-1;a<=1;a+=2)this.addPart(n,new Ne(.15,.2,.4),[a*.65,-.1,.2]);return n}createEnemyMesh(t,n,a){const l=new Gs,c=new Hr({color:16777215}),f=(d,m,p)=>{const g=new Ln(d,c);g.position.set(m[0],m[1],m[2]),p&&g.rotation.set(p[0],p[1],p[2]),l.add(g)};switch(a){case"scout":{f(new hu(n*.7,1),[0,0,0]);for(let d=0;d<4;d++){const m=d/4*Math.PI*2;f(new Vr(n*.08,n*.5,4),[Math.cos(m)*n*.6,0,Math.sin(m)*n*.6])}f(new $e(.02,.03,n*.4),[0,n*.5,0]);break}case"assault":{f(new Ne(n*1,n*.8,n*.7),[0,0,0]),f(new Ne(n*.7,n*.4,n*.2),[0,0,n*.45]),f(new Ne(n*.3,n*.25,n*.3),[0,n*.55,0]),f(new Ne(n*.25,n*.06,.05),[0,n*.55,n*.17]);for(let d=-1;d<=1;d+=2)f(new $e(n*.08,n*.1,n*.4,6),[d*n*.6,n*.1,n*.3],[Math.PI/2,0,0]);break}case"sniper":{f(new $e(n*.2,n*.3,n*1,6),[0,0,0]),f(new $e(n*.06,n*.06,n*.15,6),[0,n*.6,0]),f(new $n(n*.08,6,6),[0,n*.68,0]),f(new $e(n*.04,n*.06,n*1.2,6),[0,0,n*.7],[Math.PI/2,0,0]);for(let d=-1;d<=1;d+=2)f(new $e(n*.04,n*.06,n*.3,4),[d*n*.2,-n*.55,0]);break}case"shield":{f(new Ne(n*1.2,n*.6,n*.5),[0,0,0]),f(new Ne(n*1.1,n*.8,n*.15),[0,0,n*.35]),f(new $n(n*.15,6,6),[0,0,n*.45]);for(let d=-1;d<=1;d+=2)f(new $e(n*.1,n*.15,n*.2,6),[d*n*.4,0,-n*.3]);break}case"bomber":{f(new $n(n*.6,8,8),[0,0,0]);for(let d=0;d<8;d++){const m=d/8*Math.PI*2,p=Math.PI*.5,g=new J(Math.cos(m)*Math.sin(p),Math.cos(p),Math.sin(m)*Math.sin(p)),_=new Ln(new Vr(n*.06,n*.35,4),c);_.position.set(g.x*n*.6,g.y*n*.6,g.z*n*.6),_.quaternion.setFromUnitVectors(new J(0,1,0),g),l.add(_)}break}case"commander":{f(new fu(n*.6),[0,0,0]),f(new Vr(n*.1,n*.5,4),[0,n*.6,0]);for(let d=-1;d<=1;d+=2)f(new $n(n*.25,6,6),[d*n*.55,n*.2,0]);f(new Ne(n*.4,n*.3,n*.2),[0,0,-n*.4]);break}default:{f(new hu(n*.8),[0,0,0]);break}}return l}createBossMesh(t=new fe(16777215),n=4){const a=new Gs,l=new Hr({color:16777215}),c=new Ln(new fu(n),l);a.add(c);const f=new Ln(new pp(n*.4),l);a.add(f);for(let d=0;d<6;d++){const m=new Ln(new $e(.3,.4,.8,6),l),p=d/6*Math.PI*2;m.position.set(Math.cos(p)*n*1.1,0,Math.sin(p)*n*1.1),m.rotation.z=Math.PI/2,m.rotation.y=-p,a.add(m)}return a}createProjectileMesh(t,n){const a=new Hr({color:16777215});let l;switch(n){case"beam":case"sniper":l=new $n(.3,6,6);break;case"missile":l=new Vr(.2,.6,6);break;default:l=new $n(.15,4,4)}return new Ln(l,a)}createExplosion(t,n,a=1){const c=new Float32Array(90),f=new Float32Array(90),d=new fe(n);for(let M=0;M<30;M++){const E=Math.random()*Math.PI*2,T=Math.random()*Math.PI,S=a*(.5+Math.random()*.5);c[M*3]=t.x+S*Math.sin(T)*Math.cos(E),c[M*3+1]=t.y+S*Math.cos(T),c[M*3+2]=t.z+S*Math.sin(T)*Math.sin(E),f[M*3]=d.r,f[M*3+1]=d.g,f[M*3+2]=d.b}const m=new kn;m.setAttribute("position",new di(c,3)),m.setAttribute("color",new di(f,3));const p=new xx({size:.5,vertexColors:!0,transparent:!0,opacity:1,depthWrite:!1}),g=new a2(m,p);this.scene.add(g);let _=1;const x=()=>{if(_-=.02,_<=0){this.scene.remove(g),m.dispose(),p.dispose();return}p.opacity=_;const M=m.attributes.position,E=M.array;for(let T=0;T<30;T++)E[T*3]+=(Math.random()-.5)*.5,E[T*3+1]+=(Math.random()-.5)*.5,E[T*3+2]+=(Math.random()-.5)*.5;M.needsUpdate=!0,requestAnimationFrame(x)};x()}updateLockIndicator(t,n,a,l="#00ff44"){const c=this.lockIndicators.get(t);if(!a){c&&(this.scene.remove(c),this.lockIndicators.delete(t));return}if(c){const f=c.geometry.attributes.position,d=f.array;d[0]=n.x,d[1]=n.y,d[2]=n.z,d[3]=a.x,d[4]=a.y,d[5]=a.z,f.needsUpdate=!0;const m=c.material;m.color.getStyle()!==l&&m.color.set(l)}else{const f=new kn,d=new Float32Array([n.x,n.y,n.z,a.x,a.y,a.z]);f.setAttribute("position",new di(d,3));const m=new vx({color:l,transparent:!0,opacity:.5,linewidth:1}),p=new i2(f,m);this.scene.add(p),this.lockIndicators.set(t,p)}}dispose(){this.postFX.dispose(),this.renderer.dispose()}}class x2{constructor(t){Pt(this,"keys",new Set);Pt(this,"mouseNormX",.5);Pt(this,"mouseNormY",.5);Pt(this,"aimNormX",.5);Pt(this,"aimNormY",.5);Pt(this,"mouseDown",!1);Pt(this,"_weaponSwitch",0);Pt(this,"_dodge",!1);Pt(this,"_special",!1);Pt(this,"_lockToggle",!1);Pt(this,"lastSpaceTime",0);Pt(this,"canvasWidth",1);Pt(this,"canvasHeight",1)}setCanvasSize(t,n){this.canvasWidth=t,this.canvasHeight=n}getMouseNormX(){return this.aimNormX}getMouseNormY(){return this.aimNormY}getRawMouseNormX(){return this.mouseNormX}getRawMouseNormY(){return this.mouseNormY}setAimNorm(t,n){this.aimNormX=t,this.aimNormY=n}has(t){return this.keys.has(t)||this.keys.has(t.toLowerCase())||this.keys.has(t.toUpperCase())}getState(){const t=this._weaponSwitch;this._weaponSwitch=0;const n=this._dodge;this._dodge=!1;const a=this._special;this._special=!1;const l=this._lockToggle;return this._lockToggle=!1,{forward:this.has("w")||this.keys.has("ArrowUp"),backward:this.has("s")||this.keys.has("ArrowDown"),left:this.has("a")||this.keys.has("ArrowLeft"),right:this.has("d")||this.keys.has("ArrowRight"),up:this.has("Shift"),down:this.has("Control"),shoot:this.mouseDown,aimX:this.aimNormX,aimY:this.aimNormY,weaponSwitch:t,boost:this.has(" "),brake:this.has("e"),dodge:n,special:a,lockToggle:l,pause:this.has("Escape")||this.has("Enter")}}keyDown(t){if(this.keys.add(t),t===" "){const a=performance.now();a-this.lastSpaceTime<300&&(this._dodge=!0),this.lastSpaceTime=a}(t==="z"||t==="Z")&&(this._special=!0),t==="Tab"&&(this._lockToggle=!0);const n=parseInt(t,10);n>=1&&n<=9&&(this._weaponSwitch=n)}keyUp(t){this.keys.delete(t),this.keys.delete(t.toLowerCase()),this.keys.delete(t.toUpperCase())}mouseMove(t,n){this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?n/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}const y2=120,bv=60/y2/4,S2=64,M2=.12,E2=25,T2=[{root:45,tones:[57,60,64]},{root:41,tones:[53,57,60]},{root:38,tones:[50,53,57]},{root:40,tones:[52,55,59]}],Av=r=>440*Math.pow(2,(r-69)/12);class Mx{constructor(){Pt(this,"ctx",null);Pt(this,"masterGain",null);Pt(this,"bgmGain",null);Pt(this,"sfxGain",null);Pt(this,"initialized",!1);Pt(this,"bgmTimer",null);Pt(this,"bgmActiveOscs",[]);Pt(this,"nextStepTime",0);Pt(this,"step",0);Pt(this,"noiseBuffer",null)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=t,a.gain.setValueAtTime(.3,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),n.connect(a),a.connect(this.sfxGain),n.start(),n.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let f=0;f<t;f++)a[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=n;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.value=1200,n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),n.gain.setValueAtTime(.4,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playDodge(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1800,this.ctx.currentTime+.18),n.gain.setValueAtTime(.25,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.2)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=440,a.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),n.connect(a),a.connect(this.sfxGain),n.start(this.ctx.currentTime+t*.3),n.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){this.ensureCtx(),!(!this.ctx||!this.bgmGain||this.bgmTimer!==null)&&(this.step=0,this.nextStepTime=this.ctx.currentTime+.1,this.bgmTimer=window.setInterval(()=>this.scheduleBgmAhead(),E2))}stopBGM(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null);for(const t of this.bgmActiveOscs)try{t.stop()}catch{}this.bgmActiveOscs.length=0,this.step=0,this.nextStepTime=0}scheduleBgmAhead(){if(!(!this.ctx||!this.bgmGain))for(;this.nextStepTime<this.ctx.currentTime+M2;)this.scheduleStep(this.step,this.nextStepTime),this.nextStepTime+=bv,this.step=(this.step+1)%S2}scheduleStep(t,n){const a=Math.floor(t/16),l=t%16,c=T2[a];l===0&&this.schedulePad(c,n),(l===0||l===8)&&this.scheduleBass(c,l===8,n),l%8===4&&this.scheduleHat(n)}schedulePad(t,n){if(!this.ctx||!this.bgmGain)return;const a=16*bv,l=.06,c=.4;for(const f of t.tones)for(const d of[-6,5]){const m=this.ctx.createOscillator(),p=this.ctx.createGain();m.type="sawtooth",m.frequency.value=Av(f),m.detune.value=d,p.gain.setValueAtTime(1e-4,n),p.gain.exponentialRampToValueAtTime(.022,n+l),p.gain.setValueAtTime(.022,n+a-c),p.gain.exponentialRampToValueAtTime(1e-4,n+a-.02),m.connect(p),p.connect(this.bgmGain),this.trackBgmOsc(m),m.start(n),m.stop(n+a)}}scheduleBass(t,n,a){if(!this.ctx||!this.bgmGain)return;const l=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),f=this.ctx.createGain();l.type="sawtooth",l.frequency.value=Av(t.root-12+(n?7:0)),c.type="lowpass",c.frequency.setValueAtTime(420,a),c.frequency.exponentialRampToValueAtTime(120,a+.3),c.Q.value=2;const d=n?.2:.24;f.gain.setValueAtTime(1e-4,a),f.gain.exponentialRampToValueAtTime(.16,a+.01),f.gain.exponentialRampToValueAtTime(1e-4,a+d),l.connect(c),c.connect(f),f.connect(this.bgmGain),this.trackBgmOsc(l),l.start(a),l.stop(a+d+.05)}scheduleHat(t){if(!this.ctx||!this.bgmGain)return;const n=this.getNoiseBuffer();if(!n)return;const a=this.ctx.createBufferSource();a.buffer=n;const l=this.ctx.createBiquadFilter();l.type="highpass",l.frequency.value=6500;const c=this.ctx.createGain();c.gain.setValueAtTime(.035,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),a.connect(l),l.connect(c),c.connect(this.bgmGain),a.start(t),a.stop(t+.08)}getNoiseBuffer(){if(!this.ctx)return null;if(this.noiseBuffer)return this.noiseBuffer;const t=this.ctx.sampleRate*.1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let l=0;l<t;l++)a[l]=Math.random()*2-1;return this.noiseBuffer=n,n}trackBgmOsc(t){this.bgmActiveOscs.push(t),t.onended=()=>{const n=this.bgmActiveOscs.indexOf(t);n>=0&&this.bgmActiveOscs.splice(n,1)}}playBossAnnounce(t){if(this.ensureCtx(),!this.ctx)return;const n=this.ctx.currentTime,a=[...t].reduce((f,d)=>f+d.charCodeAt(0),0),l=120+a%60,c=1+(a>>3)%5/10;this.voiceChip(n,{freq:l,duration:.42,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:34,depth:.55,gainA:.26,gainB:.14,gainC:.1,glideTo:l*.92}),this.voiceChip(n+.3,{freq:l*c,duration:.55,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:30,depth:.5,gainA:.24,gainB:.13,gainC:.09,glideTo:l*c*.9})}playSpecialAnnounce(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.currentTime,n=330;this.voiceChip(t,{freq:n,duration:.8,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:46,depth:.6,gainA:.2,gainB:.14,gainC:.12,glideTo:n*1.8}),this.voiceChip(t+.15,{freq:n*1.25,duration:.6,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:52,depth:.55,gainA:.18,gainB:.12,gainC:.1,glideTo:n*1.25*1.5})}voiceChip(t,n){if(!this.ctx||!this.sfxGain)return;const a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(1,t+.01),a.gain.setValueAtTime(1,t+n.duration*.45),a.gain.exponentialRampToValueAtTime(1e-4,t+n.duration);const l=this.ctx.createGain();l.gain.value=.5;const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sine",c.frequency.value=n.pulseHz,f.gain.value=n.depth,c.connect(f),f.connect(l.gain),c.start(t),c.stop(t+n.duration);const d=[[n.waveA,n.freq,n.gainA],[n.waveB,n.freq*1.005,n.gainB],[n.waveC,n.freq*2.01,n.gainC]];for(const[m,p,g]of d){const _=this.ctx.createOscillator(),x=this.ctx.createGain();_.type=m,_.frequency.setValueAtTime(p,t),_.frequency.exponentialRampToValueAtTime(n.glideTo*(p/n.freq),t+n.duration),x.gain.value=g,_.connect(x),x.connect(l),_.start(t),_.stop(t+n.duration+.02)}l.connect(a),a.connect(this.sfxGain)}}const fi=new Mx;var ye=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(ye||{}),Ht=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Ht||{}),dn=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(dn||{}),Ri=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(Ri||{});const np=[{id:1,name:"光束机枪",type:dn.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:Ri.FreeFire,smartRadius:60},{id:2,name:"追踪导弹",type:dn.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:Ri.LockRequired,smartRadius:95},{id:3,name:"光束加农",type:dn.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:Ri.LockRequired,smartRadius:80},{id:4,name:"散射弹幕",type:dn.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:Ri.FreeFire,smartRadius:110},{id:5,name:"狙击光束",type:dn.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:Ri.LockRequired,smartRadius:45},{id:6,name:"浮游炮",type:dn.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:Ri.LockShortRange,smartRadius:130}];function Vs(r){return np.find(t=>t.id===r)||np[0]}const Rv=[{type:ye.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:ye.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:ye.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:ye.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:ye.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:ye.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function Zc(r){return Rv.find(t=>t.type===r)||Rv[0]}function Wi(r,t,n,a,l){return{hpPercent:r,speed:t,attacks:n,minionSpawn:a,attackPattern:l}}const wv=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[Wi(1,5,["弹幕散布"],!0,"spread"),Wi(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),Wi(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[Wi(1,12,["高速突进"],!1,"rush"),Wi(.6,15,["高速突进","分身攻击"],!0,"clone"),Wi(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[Wi(1,4,["多重导弹"],!1,"missile"),Wi(.75,6,["多重导弹","力场护盾"],!1,"shield"),Wi(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),Wi(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function dd(r){return wv.find(t=>t.id===r)||wv[0]}function Ze(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function we(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function Ee(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function Ex(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function Un(r,t){return Ex(we(r,t))}function Te(r){const t=Ex(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function b2(r,t,n){return r+(t-r)*n}function Jn(r,t,n){return Math.max(t,Math.min(n,r))}function Fr(r,t){return r+Math.random()*(t-r)}function A2(r,t){return Math.floor(Fr(r,t+1))}let Tx=1;function bi(){return Tx++}const R2=4,w2=1.5,Cv=3,pd=.6,Dv=2.5,C2=6,D2=60,U2=4;class L2{constructor(t){Pt(this,"scene");Pt(this,"input");Pt(this,"audio");Pt(this,"canvas");Pt(this,"players",[]);Pt(this,"enemies",[]);Pt(this,"projectiles",[]);Pt(this,"particles",[]);Pt(this,"active",!1);Pt(this,"velocities",[]);Pt(this,"fireTimers",[]);Pt(this,"dodgeTimer",0);Pt(this,"dodgeCooldown",0);Pt(this,"accumulator",0);Pt(this,"lastTime",0);Pt(this,"animFrameId",0);Pt(this,"enemySpawnTimer",0);Pt(this,"waveTimer",0);Pt(this,"levelSpawned",0);Pt(this,"bossCount",0);Pt(this,"currentBossIndex",-1);Pt(this,"bossPhase",1);Pt(this,"bossAttackTimer",0);Pt(this,"bossSweepAngle",0);Pt(this,"bossNetAngle",0);Pt(this,"comboTimeout",[0]);Pt(this,"lockTargets",[null]);Pt(this,"lockOn",!1);Pt(this,"enemyLastPos",new Map);Pt(this,"enemyVels",new Map);Pt(this,"gameLoop",t=>{if(!this.active)return;this.animFrameId=requestAnimationFrame(this.gameLoop);const n=Math.min((t-this.lastTime)/1e3,.05);for(this.lastTime=t,this.accumulator+=n;this.accumulator>=Dh;)this.update(Dh),this.accumulator-=Dh;this.render(n)});this.canvas=t,this.scene=new v2(t,t.width,t.height),this.input=new x2(0),this.input.setCanvasSize(t.width,t.height),this.audio=new Mx}start(){const t=_n.getState();this.players=t.players.map(n=>({...n})),this.velocities=this.players.map(()=>({x:0,y:0,z:0})),this.fireTimers=this.players.map(()=>0),this.dodgeTimer=0,this.dodgeCooldown=0,this.enemies=[],this.projectiles=[],this.particles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0,this.enemySpawnTimer=0,this.waveTimer=0,this.lockOn=!1,this.enemyLastPos.clear(),this.enemyVels.clear(),this.active=!0,this.lastTime=performance.now(),this.accumulator=0,Tx=1,this.players.forEach((n,a)=>{const l=a===0?new fe(4491519):new fe(16737860),c=this.scene.createPlayerMesh(l);c.position.set(n.pos.x,n.pos.y,n.pos.z),this.scene.playerMeshes.set(n.id,c),this.scene.scene.add(c)}),fi.init(),fi.startBGM(),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),fi.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,n){this.scene.resize(t,n),this.input.setCanvasSize(t,n)}update(t){_n.getState().game;const a=[this.input.getState()];this.updatePlayers(t,a),this.updateEnemies(t),this.updateProjectiles(t),this.updateParticles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateUI(t),this.updateBoss(t)}updatePlayers(t,n){this.players.forEach((a,l)=>{if(!a.alive)return;const c=n[l],f=this.scene.playerMeshes.get(a.id);if(!f)return;const d=_n.getState().game;for(const B of np)d.wave>=B.unlockLevel&&!a.weapons.includes(B.id)&&a.weapons.push(B.id);(a.weapon===0||!a.weapons.includes(a.weapon))&&(a.weapon=a.weapons[0]);const m=this.velocities[l],p=(c.right?1:0)-(c.left?1:0),g=(c.up?1:0)-(c.down?1:0),_=(c.forward?1:0)-(c.backward?1:0),x=Math.sqrt(p*p+g*g+_*_),M=c.boost&&a.energy>0,E=M?JS:1,T=a.speed*E,S=c.brake?nM:eM;if(M?a.energy=Math.max(0,a.energy-YS*t):a.energy=Math.min(a.maxEnergy,a.energy+a.maxEnergy*.25*t),c.lockToggle&&(this.lockOn=!this.lockOn),!this.lockOn)this.lockTargets[l]=null;else{const B=this.lockTargets[l]!==null?this.enemies.find(j=>j.id===this.lockTargets[l]&&j.hp>0):null;if(!B||Un(B.pos,a.pos)>Lh){let j=null,$=Lh;for(const lt of this.enemies){if(lt.hp<=0)continue;const ft=Un(a.pos,lt.pos);ft<$&&($=ft,j=lt)}this.lockTargets[l]=j?j.id:null}}let v=this.input.getRawMouseNormX(),L=this.input.getRawMouseNormY();if(this.lockOn&&this.lockTargets[l]!==null){const B=this.enemies.find(j=>j.id===this.lockTargets[l]&&j.hp>0);if(B){const j=this.worldToScreen(B.pos);if(j){const $=Un(a.pos,B.pos),lt=tM*Math.max(0,1-$/Lh),ft=Jn(j.x/this.canvas.width,0,1),z=Jn(j.y/this.canvas.height,0,1);v=v+(ft-v)*lt,L=L+(z-L)*lt}}}this.input.setAimNorm(v,L);const D=this.computeCrosshairDir(a),w={x:-D.z,z:D.x},W=(B,j,$)=>({x:$*D.x+B*w.x,y:j,z:$*D.z+B*w.z});if(this.dodgeCooldown-=t,c.dodge&&this.dodgeCooldown<=0&&(this.dodgeTimer=aM,this.dodgeCooldown=sM,a.invulnTimer=Math.max(a.invulnTimer,rM),fi.playDodge()),this.dodgeTimer>0){this.dodgeTimer-=t;let B=0,j=0,$=0;if(x>.001){const lt=1/x,ft=W(p,g,_);B=ft.x*lt,j=ft.y*lt,$=ft.z*lt}else{const lt=this.computeAimDir(a);B=lt.x,j=lt.y,$=lt.z}m.x=B*a.speed*Oh,m.y=j*a.speed*Oh,m.z=$*a.speed*Oh,a.pos.x+=m.x*t,a.pos.y+=m.y*t,a.pos.z+=m.z*t}else{let B=0,j=0,$=0;if(x>.001){const ft=1/x,z=W(p,g,_);B=z.x*T*ft,j=z.y*T*ft,$=z.z*T*ft}const lt=1-Math.exp(-S*t);m.x+=(B-m.x)*lt,m.y+=(j-m.y)*lt,m.z+=($-m.z)*lt,a.pos.x+=m.x*t,a.pos.y+=m.y*t,a.pos.z+=m.z*t}a.pos.x=Jn(a.pos.x,-$a,$a),a.pos.y=Jn(a.pos.y,-Er,Er),a.pos.z=Jn(a.pos.z,-$a,$a);let O=Math.atan2(D.x,D.z)-a.rot.y;for(;O>Math.PI;)O-=Math.PI*2;for(;O<-Math.PI;)O+=Math.PI*2;a.rot.y+=Jn(O,-p_*t,p_*t);const U=-Math.asin(Jn(D.y,-1,1))-a.rot.x;a.rot.x+=Jn(U,-m_*t,m_*t);const R=Jn(m.x/T,-1,1)*.35;a.rot.z=b2(a.rot.z,R,.15),f.position.set(a.pos.x,a.pos.y,a.pos.z),f.rotation.set(a.rot.x,a.rot.y,a.rot.z),this.fireTimers[l]-=t,c.shoot&&this.fireTimers[l]<=0&&(this.playerShoot(a,l),this.fireTimers[l]=Vs(a.weapon).fireRate),c.weaponSwitch>0&&a.weapons.includes(c.weaponSwitch)&&(a.weapon=c.weaponSwitch),a.invulnTimer>0&&(a.invulnTimer-=t),a.specialGauge=Math.min(a.specialGauge+t*2,a.maxSpecialGauge),c.special&&a.specialGauge>=100&&(this.useSpecial(a,l),a.specialGauge=0),a.combo>0&&(this.comboTimeout[l]-=t,this.comboTimeout[l]<=0&&(a.combo=0))})}worldToScreen(t){const n=this.scene.camera,a=n.matrixWorldInverse.elements,l=n.projectionMatrix.elements,c=t.x,f=t.y,d=t.z,m=a[0]*c+a[4]*f+a[8]*d+a[12],p=a[1]*c+a[5]*f+a[9]*d+a[13],g=a[2]*c+a[6]*f+a[10]*d+a[14],_=a[3]*c+a[7]*f+a[11]*d+a[15],x=l[0]*m+l[4]*p+l[8]*g+l[12]*_,M=l[1]*m+l[5]*p+l[9]*g+l[13]*_;l[2]*m+l[6]*p+l[10]*g+l[14]*_;const E=l[3]*m+l[7]*p+l[11]*g+l[15]*_;if(E<=0)return null;const T=x/E,S=M/E;return Math.abs(T)>1.2||Math.abs(S)>1.2?null:{x:(T*.5+.5)*this.canvas.width,y:(-S*.5+.5)*this.canvas.height}}computeAimDir(t){const n=this.scene.camera,a=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new J(0,0,-1).applyQuaternion(n.quaternion),f=new J(1,0,0).applyQuaternion(n.quaternion),d=new J(0,1,0).applyQuaternion(n.quaternion),m=Math.tan(n.fov*Math.PI/360),p=new J().addScaledVector(c,1).addScaledVector(f,a*m*n.aspect).addScaledVector(d,l*m).normalize();let g=1/0,_=null;for(const x of this.enemies){if(x.hp<=0)continue;const M=x.type===ye.Boss?4:1.5,E=n.position.x-x.pos.x,T=n.position.y-x.pos.y,S=n.position.z-x.pos.z,v=E*p.x+T*p.y+S*p.z,L=E*E+T*T+S*S-M*M,D=v*v-L;if(D<0)continue;const w=-v-Math.sqrt(D);w>=0&&w<g&&(g=w,_=x)}return _?Te(we(_.pos,t.pos)):this.computeCrosshairDir(t)}computeCrosshairDir(t){const n=this.scene.camera,a=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new J(0,0,-1).applyQuaternion(n.quaternion),f=new J(1,0,0).applyQuaternion(n.quaternion),d=new J(0,1,0).applyQuaternion(n.quaternion),m=Math.tan(n.fov*Math.PI/360),p=new J().addScaledVector(c,1).addScaledVector(f,a*m*n.aspect).addScaledVector(d,l*m).normalize(),g=120,_=new J(n.position.x+p.x*g,t.pos.y,n.position.z+p.z*g);return Te({x:_.x-t.pos.x,y:_.y-t.pos.y,z:_.z-t.pos.z})}pickSmartTarget(t){const a=Vs(t.weapon).smartRadius,l=this.input.getMouseNormX()*this.canvas.width,c=this.input.getMouseNormY()*this.canvas.height;let f=null,d=1/0;for(const m of this.enemies){if(m.hp<=0)continue;const p=this.worldToScreen(m.pos);if(!p)continue;const g=p.x-l,_=p.y-c;if(g*g+_*_>a*a)continue;const x=Un(t.pos,m.pos);x<d&&(d=x,f=m)}return f}computeLeadDir(t,n,a){const l=this.enemyVels.get(n.id)||{x:0,y:0,z:0},c=a>.001?Un(t.pos,n.pos)/a:0;let f=Ze(n.pos,Ee(l,c));const d=Un(t.pos,f);return a>.001&&d>.001&&(f=Ze(n.pos,Ee(l,d/a))),Te(we(f,t.pos))}playerShoot(t,n){const a=Vs(t.weapon);if(!this.scene.playerMeshes.get(t.id))return;const c=this.lockTargets[n],f=c!==null?this.enemies.find(M=>M.id===c&&M.hp>0):null,d=f?Un(f.pos,t.pos):1/0,m=Math.max(a.lockRange,d_),p=f!==null&&d<=m;if(a.fireMode===Ri.LockRequired&&!p)return;let g;const _=f&&p?f:this.pickSmartTarget(t);_?g=this.computeLeadDir(t,_,a.speed):g=this.computeAimDir(t);const x=a.fireMode===Ri.LockShortRange&&p;if(a.type===dn.Funnel)for(let M=0;M<Cv;M++){const E={id:bi(),pos:{...t.pos},vel:{x:0,y:0,z:0},damage:a.damage,owner:t.id,type:dn.Funnel,lifetime:U2,radius:.3,color:a.color,phase:"orbit",phaseTimer:pd,orbitAngle:M/Cv*Math.PI*2};if(this.projectiles.length<Uh){this.projectiles.push(E);const T=this.scene.createProjectileMesh(a.color,a.type);T.position.set(E.pos.x,E.pos.y,E.pos.z),this.scene.projectileMeshes.set(E.id,T),this.scene.scene.add(T)}}else for(let M=0;M<(a.type===dn.Spread?5:1);M++){const E=a.spread*(Math.random()-.5)*2,T=Te(Ze(g,{x:E,y:E*.5,z:0})),S={id:bi(),pos:{...t.pos},vel:Ee(T,a.speed),damage:a.damage,owner:t.id,type:a.type,lifetime:3,radius:.3,color:a.color};if(x&&f&&(S.vel=Ee(Te(we(f.pos,t.pos)),a.speed)),this.projectiles.length<Uh){this.projectiles.push(S);const v=this.scene.createProjectileMesh(a.color,a.type);v.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,v),this.scene.scene.add(v)}}fi.playShoot(600+Math.random()*400)}useSpecial(t,n){fi.playSpecial(),fi.playSpecialAnnounce(),this.enemies.forEach(a=>{Un(a.pos,t.pos)<50&&(a.hp-=150,this.scene.createExplosion(a.pos,"#00ffff",2))})}updateEnemies(t){this.enemies.forEach(n=>{if(n.hp<=0){this.scene.createExplosion(n.pos,n.type===ye.Boss?"#ff4400":"#ff6644",n.type===ye.Boss?3:1),fi.playExplosion(),this.enemyLastPos.delete(n.id),this.enemyVels.delete(n.id),this.players.forEach((m,p)=>{const g=n.type===ye.Boss?dd(this.currentBossIndex+1).score:Zc(n.type).score;m.score+=g,m.kills++,m.combo++,this.comboTimeout[p]=$S});return}const a=n.type===ye.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);if(!a)return;const l=this.players.find(m=>m.alive);if(!l)return;const c=Un(n.pos,l.pos),f=Zc(n.type);switch(n.type){case ye.Scout:this.updateAIScout(n,l,c,f,t);break;case ye.Assault:this.updateAIAssault(n,l,c,f,t);break;case ye.Sniper:this.updateAISniper(n,l,c,f,t);break;case ye.Shield:this.updateAIShield(n,l,c,f,t);break;case ye.Bomber:this.updateAIBomber(n,l,c,f,t);break;case ye.Commander:this.updateAICommander(n,l,c,f,t);break;default:this.updateAIDefault(n,l,c,f,t)}if(n.state===Ht.Patrol&&n.type!==ye.Boss){const m=Te(we(l.pos,n.pos));n.pos=Ze(n.pos,Ee(m,n.speed*.4*t))}n.state===Ht.Flee&&n.fleeTimer!==void 0&&(n.fleeTimer-=t,n.fleeTimer<=0&&(n.state=Ht.Chase)),n.hp<f.hp*.3&&n.type!==ye.Boss&&n.type!==ye.Bomber&&n.state!==Ht.Flee&&n.fleeTimer===void 0&&(n.state=Ht.Flee,n.fleeTimer=iM),n.pos.x=Jn(n.pos.x,-$a,$a),n.pos.y=Jn(n.pos.y,-Er,Er),n.pos.z=Jn(n.pos.z,-$a,$a);const d=this.enemyLastPos.get(n.id);d?this.enemyVels.set(n.id,Ee(we(n.pos,d),1/Math.max(t,1e-4))):this.enemyVels.set(n.id,{x:0,y:0,z:0}),this.enemyLastPos.set(n.id,{x:n.pos.x,y:n.pos.y,z:n.pos.z}),a.position.set(n.pos.x,n.pos.y,n.pos.z),a.rotation.y+=t*2,n.type===ye.Boss&&(a.rotation.x+=t*.5)}),this.enemies=this.enemies.filter(n=>{if(n.hp<=0){const a=n.type===ye.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);return a&&(this.scene.scene.remove(a),this.scene.enemyMeshes.delete(n.id),this.scene.bossMeshes.delete(n.id)),!1}return!0})}enemyShoot(t,n){const a=Te(we(n.pos,t.pos)),l=Zc(t.type),c={id:bi(),pos:{...t.pos},vel:Ee(a,25),damage:l.damage,owner:t.id+1e4,type:dn.BossBullet,lifetime:4,radius:.3,color:l.color};if(this.projectiles.length<Uh){this.projectiles.push(c);const f=this.scene.createProjectileMesh(l.color,"bullet");f.position.set(c.pos.x,c.pos.y,c.pos.z),this.scene.projectileMeshes.set(c.id,f),this.scene.scene.add(f)}}updateAIDefault(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}break;case Ht.Attack:a>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.8+Math.random()*.6);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(f,t.speed*1.5*c));break}}updateAIScout(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const p=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(p,t.speed*c))}break;case Ht.Attack:a>l.attackRange*1.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos)),d={x:-f.z,y:0,z:f.x};t.pos=Ze(t.pos,Ee(d,t.speed*.8*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.5+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const m=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(m,t.speed*1.5*c));break}}updateAIAssault(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:const f=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(f,t.speed*c)),a<l.attackRange&&(t.state=Ht.Attack);break;case Ht.Attack:const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*.5*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.3+Math.random()*.3),a>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const m=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(m,t.speed*1.5*c));break}}updateAISniper(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else{const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}break;case Ht.Attack:if(a<l.attackRange*.5){const d=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}else a>l.attackRange*1.2&&(t.state=Ht.Chase);t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(f,t.speed*1.5*c));break}}updateAIShield(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const m=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(m,t.speed*c))}break;case Ht.Attack:const f=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(f,t.speed*.3*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1.2+Math.random()*.8),a>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const d=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(d,t.speed*1.5*c));break}}updateAIBomber(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:case Ht.Attack:const f=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(f,t.speed*c));break}a<3&&(this.scene.createExplosion(t.pos,"#ff4400",2),fi.playExplosion(),n.hp-=l.damage,n.invulnTimer=f_,t.hp=0)}updateAICommander(t,n,a,l,c){switch(this.enemies.forEach(f=>{if(f.id===t.id||f.hp<=0)return;Un(t.pos,f.pos)<30&&(f.speed=l.speed*1.3)}),t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const d=Te(we(n.pos,t.pos));t.pos=Ze(t.pos,Ee(d,t.speed*c))}break;case Ht.Attack:a>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.6+Math.random()*.4);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Te(we(t.pos,n.pos));t.pos=Ze(t.pos,Ee(f,t.speed*1.5*c));break}}updateProjectiles(t){this.projectiles.forEach(n=>{n.type===dn.Missile?this.steerMissile(n,t):n.type===dn.Funnel&&this.updateFunnel(n,t),n.pos=Ze(n.pos,Ee(n.vel,t)),n.lifetime-=t;const a=this.scene.projectileMeshes.get(n.id);a&&(a.position.set(n.pos.x,n.pos.y,n.pos.z),n.type===dn.Missile&&(a.rotation.x+=t*5))}),this.projectiles=this.projectiles.filter(n=>{if(n.lifetime<=0){const a=this.scene.projectileMeshes.get(n.id);return a&&(this.scene.scene.remove(a),this.scene.projectileMeshes.delete(n.id)),!1}return!0})}steerMissile(t,n){const a=t.owner>=1e4,l=(a?w2:R2)*n;let c=null;if(a){let S=null,v=1/0;for(const L of this.players){if(!L.alive)continue;const D=Un(t.pos,L.pos);D<v&&(v=D,S=L)}S&&(c=Te(we(S.pos,t.pos)))}else{let S=null;const v=this.players.findIndex(D=>D.id===t.owner),L=v>=0?this.lockTargets[v]:null;if(L!=null){const D=this.enemies.find(w=>w.id===L&&w.hp>0);D&&(S=D)}if(!S){let D=1/0;for(const w of this.enemies){if(w.hp<=0)continue;const W=Un(t.pos,w.pos);W<D&&(D=W,S=w)}}S&&(c=Te(we(S.pos,t.pos)))}if(!c)return;const f=Math.sqrt(t.vel.x*t.vel.x+t.vel.y*t.vel.y+t.vel.z*t.vel.z);if(f<1e-4)return;const d=Te(t.vel),m=Jn(d.x*c.x+d.y*c.y+d.z*c.z,-1,1),p=Math.acos(m);if(p<=l||p<1e-6){t.vel=Ee(c,f);return}let g=d.y*c.z-d.z*c.y,_=d.z*c.x-d.x*c.z,x=d.x*c.y-d.y*c.x;const M=Math.sqrt(g*g+_*_+x*x);if(M<1e-6){const S=Math.abs(d.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};g=d.y*S.z-d.z*S.y,_=d.z*S.x-d.x*S.z,x=d.x*S.y-d.y*S.x}else g/=M,_/=M,x/=M;const E=Math.cos(l),T=Math.sin(l);t.vel={x:(d.x*E+(_*d.z-x*d.y)*T)*f,y:(d.y*E+(x*d.x-g*d.z)*T)*f,z:(d.z*E+(g*d.y-_*d.x)*T)*f}}updateFunnel(t,n){const a=this.players.find(l=>l.id===t.owner);if(!(!a||!a.alive)&&t.phase!=="strike"){t.phaseTimer=(t.phaseTimer??pd)-n;const l=(t.orbitAngle??0)+C2*n;if(t.orbitAngle=l,t.pos={x:a.pos.x+Math.cos(l)*Dv,y:a.pos.y+Math.sin(l*3)*.6,z:a.pos.z+Math.sin(l)*Dv},t.vel={x:0,y:0,z:0},t.phaseTimer<=0){let c=null,f=1/0;for(const d of this.enemies){if(d.hp<=0)continue;const m=Un(t.pos,d.pos);m<f&&(f=m,c=d)}c?(t.phase="strike",t.vel=Ee(Te(we(c.pos,t.pos)),D2)):(t.phase="orbit",t.phaseTimer=pd)}}}updateParticles(t){}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(n=>{const a=n.type===ye.Boss?4:1.5;Un(t.pos,n.pos)<a&&(n.hp-=(n.shieldTimer||0)>0?t.damage*.5:t.damage,t.lifetime=0,this.scene.createExplosion(t.pos,"#ffaa00",.5),fi.playHit())})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(n=>{!n.alive||n.invulnTimer>0||Un(t.pos,n.pos)<KS&&(n.hp-=t.damage,t.lifetime=0,n.invulnTimer=f_,this.scene.createExplosion(t.pos,"#ff4444",.5),fi.playHit(),n.hp<=0&&(n.alive=!1,this.scene.createExplosion(n.pos,"#4488ff",3)))})})}spawnEnemies(t){const n=_n.getState(),a=n.game;if(a.wave<1){this.levelSpawned=0,this.enemySpawnTimer=0,this.waveTimer=0,n.setGame({wave:1});return}if(this.waveTimer>0){this.waveTimer-=t;return}const l=a.wave%QS===0;if(l&&!this.enemies.some(p=>p.type===ye.Boss)&&this.currentBossIndex<0){this.spawnBoss();return}const c=l?0:Math.min(6+a.wave,h_);if(this.enemySpawnTimer+=t,this.levelSpawned<c&&this.enemies.length<h_&&this.enemySpawnTimer>=.15){this.enemySpawnTimer=0;const p=[ye.Scout,ye.Assault,ye.Shield];a.wave>2&&p.push(ye.Sniper),a.wave>3&&p.push(ye.Bomber),a.wave>4&&p.push(ye.Commander);const g=p[A2(0,p.length-1)],_=Zc(g);let x;do{const T=Fr(30,Math.min(_.alertRange+25,80)),S=Math.random()*Math.PI*2,v=Fr(-.5,.5);x={x:this.players[0].pos.x+Math.sin(S)*T,y:Jn(this.players[0].pos.y+Math.sin(v)*T,-Er*.5,Er*.5),z:this.players[0].pos.z+Math.cos(S)*T}}while(this.players.some(T=>Un(x,T.pos)<20));const M={id:bi(),type:g,pos:x,rot:{x:0,y:0,z:0},hp:_.hp*(1+a.wave*.1),maxHp:_.hp,speed:_.speed*(1+a.wave*.05),state:Ht.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(M);const E=this.scene.createEnemyMesh(new fe(_.color),_.size,g);E.position.set(x.x,x.y,x.z),this.scene.enemyMeshes.set(M.id,E),this.scene.scene.add(E),this.levelSpawned++}const f=this.enemies.some(p=>p.type===ye.Boss),d=this.enemies.some(p=>p.hp>0);(l?this.currentBossIndex>=0&&!f:this.levelSpawned>=c&&!d)&&(this.enemies.forEach(p=>{const g=p.type===ye.Boss?this.scene.bossMeshes.get(p.id):this.scene.enemyMeshes.get(p.id);g&&(this.scene.scene.remove(g),this.scene.enemyMeshes.delete(p.id),this.scene.bossMeshes.delete(p.id))}),this.enemies=[],this.levelSpawned=0,this.enemySpawnTimer=0,this.currentBossIndex=-1,this.waveTimer=2.5,n.setGame({wave:a.wave+1}))}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0;const n=dd(t+1),a={x:Fr(-30,30),y:5,z:-50},l={id:bi(),type:ye.Boss,pos:a,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Ht.Phase1,targetId:0,attackTimer:2,phase:1,shieldTimer:0};this.enemies.push(l);const c=this.scene.createBossMesh(new fe(n.color),n.size);c.position.set(a.x,a.y,a.z),this.scene.bossMeshes.set(l.id,c),this.scene.scene.add(c),fi.playBossWarning(),fi.playBossAnnounce(n.name),_n.getState().setGame({bossFight:!0,bossName:n.name})}updateBoss(t){const n=this.enemies.find(f=>f.type===ye.Boss);if(!n){_n.getState().game.bossFight&&_n.getState().setGame({bossFight:!1,bossName:""});return}const a=dd(this.currentBossIndex+1),l=n.hp/n.maxHp;if(a.phases.forEach((f,d)=>{l<=f.hpPercent&&(n.phase||1)<=d&&(n.phase=d+1,n.speed=f.speed,n.state=["phase1","phase2","phase3","phase4"][d])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(p=>p.alive);if(!f)return;const d=a.phases[(n.phase||1)-1];switch(d.attackPattern){case"spread":for(let g=0;g<12;g++){const _=g/12*Math.PI*2,x={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:bi(),pos:{...n.pos},vel:Ee(x,10),damage:5,owner:n.id+1e4,type:dn.BossBullet,lifetime:4,radius:.3,color:"#ff4444"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff4444","bullet");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"laser":case"finalBeam":{const g=Te(we(f.pos,n.pos)),_={id:bi(),pos:{...n.pos},vel:Ee(g,30),damage:25,owner:n.id+1e4,type:dn.Laser,lifetime:2,radius:.5,color:"#ff0000"};this.projectiles.push(_);const x=this.scene.createProjectileMesh("#ff0000","beam");x.position.set(_.pos.x,_.pos.y,_.pos.z),x.scale.set(1,1,3),this.scene.projectileMeshes.set(_.id,x),this.scene.scene.add(x);break}case"missile":for(let g=0;g<5;g++){const _=Te(we(f.pos,n.pos)),x={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2},M={id:bi(),pos:{...n.pos},vel:Ee(Ze(_,x),8),damage:10,owner:n.id+1e4,type:dn.Missile,lifetime:5,radius:.4,color:"#ffaa00"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ffaa00","missile");E.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}break;case"rush":n.speed=20;const p=Te(we(f.pos,n.pos));n.pos=Ze(n.pos,Ee(p,n.speed*t));break;case"clone":{const g=Te(we(f.pos,n.pos)),_=Math.atan2(g.z,g.x);for(let x=-2;x<=2;x++){const M=_+x*.6,E=Te({x:Math.cos(M),y:g.y,z:Math.sin(M)}),T={id:bi(),pos:{...n.pos},vel:Ee(E,16),damage:8,owner:n.id+1e4,type:dn.BossBullet,lifetime:3.5,radius:.3,color:"#ff00ff"};this.projectiles.push(T);const S=this.scene.createProjectileMesh("#ff00ff","bullet");S.position.set(T.pos.x,T.pos.y,T.pos.z),this.scene.projectileMeshes.set(T.id,S),this.scene.scene.add(S)}break}case"fullLaser":{for(let g=0;g<6;g++){const _=this.bossSweepAngle+g/6*Math.PI*2,x={x:Math.cos(_),y:0,z:Math.sin(_)},M={id:bi(),pos:{...n.pos},vel:Ee(x,26),damage:15,owner:n.id+1e4,type:dn.Laser,lifetime:2.2,radius:.5,color:"#ff00ff"};this.projectiles.push(M);const E=this.scene.createProjectileMesh("#ff00ff","beam");E.position.set(M.pos.x,M.pos.y,M.pos.z),E.scale.set(1,1,3),this.scene.projectileMeshes.set(M.id,E),this.scene.scene.add(E)}this.bossSweepAngle+=Math.PI/8;break}case"shield":n.shieldTimer=Math.max(n.shieldTimer||0,4);break;case"laserNet":{const g=Te(we(f.pos,n.pos)),_=Math.atan2(g.z,g.x)+this.bossNetAngle;for(let x=0;x<9;x++){const M=x/8-.5,E=_+M*Math.PI*.66,T={x:Math.cos(E),y:0,z:Math.sin(E)},S={id:bi(),pos:{...n.pos},vel:Ee(T,25),damage:12,owner:n.id+1e4,type:dn.Laser,lifetime:2.5,radius:.4,color:"#ffaa00"};this.projectiles.push(S);const v=this.scene.createProjectileMesh("#ffaa00","beam");v.position.set(S.pos.x,S.pos.y,S.pos.z),v.scale.set(1,1,3),this.scene.projectileMeshes.set(S.id,v),this.scene.scene.add(v)}this.bossNetAngle+=Math.PI/9;break}case"spawn":if(d.minionSpawn)for(let g=0;g<3;g++){const _={id:bi(),type:ye.Scout,pos:{x:n.pos.x+Fr(-5,5),y:0,z:n.pos.z+Fr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Ht.Chase,targetId:0,attackTimer:1};this.enemies.push(_);const x=this.scene.createEnemyMesh(new fe(4500223),1,"scout");x.position.set(_.pos.x,_.pos.y,_.pos.z),this.scene.enemyMeshes.set(_.id,x),this.scene.scene.add(x)}break}}const c=this.players.find(f=>f.alive);if(c){const f=a.phases[(n.phase||1)-1],d=Te(we(c.pos,n.pos));n.pos=Ze(n.pos,Ee(d,(f?f.speed:n.speed)*t))}(n.shieldTimer||0)>0&&(n.shieldTimer=Math.max(0,(n.shieldTimer||0)-t))}updateUI(t){const n=_n.getState(),a=n.game;!this.players[0].alive&&!a.gameOver&&(n.setGame({gameOver:!0,screen:"result"}),this.stop()),n.setPlayers(this.players),n.setGame({score:this.players.reduce((l,c)=>l+c.score,0),time:a.time+t})}render(t){this.players.forEach((n,a)=>{const l=this.computeCrosshairDir(n);this.scene.updateCamera(n.pos,t,Math.atan2(l.x,l.z));const c=this.lockTargets[a],f=c!==null?this.enemies.find(d=>d.id===c&&d.hp>0):null;if(f){const d=Vs(n.weapon),m=Math.max(d.lockRange,d_),p=Un(f.pos,n.pos)<=m?"#00ff88":"#ff4444";this.scene.updateLockIndicator(n.id,n.pos,f.pos,p)}else this.scene.updateLockIndicator(n.id,n.pos,null)}),this.scene.render()}}const Uv=["w","W","a","A","s","S","d","D","e","E","z","Z"," ","Tab","1","2","3","4","5","6","Shift","Control","Enter"],N2=()=>{const r=Os.useRef(null),t=Os.useRef(null),n=Os.useRef(null),a=Os.useRef(null),l=Os.useRef({x:0,y:0});return Os.useEffect(()=>{const c=r.current;if(!c)return;c.width=window.innerWidth,c.height=window.innerHeight;const f=new L2(c);t.current=f;const d=()=>{c.width=window.innerWidth,c.height=window.innerHeight,f.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",d);const m=()=>{const v=n.current;if(!v)return;const L=f.input.getMouseNormX()*c.width,D=f.input.getMouseNormY()*c.height;v.style.transform=`translate(${L}px, ${D}px) translate(-50%, -50%)`};let p=0;const g=()=>{var L;m();const v=Vs(((L=_n.getState().players[0])==null?void 0:L.weapon)||1);a.current&&a.current.getAttribute("r")!==String(v.smartRadius)&&a.current.setAttribute("r",String(v.smartRadius)),p=requestAnimationFrame(g)};p=requestAnimationFrame(g);const _=v=>{(v.ctrlKey||v.metaKey)&&v.preventDefault(),f.input.keyDown(v.key),v.key==="Escape"&&(document.pointerLockElement===c&&document.exitPointerLock(),_n.getState().setGame({screen:"pause"})),Uv.includes(v.key)&&v.preventDefault()},x=v=>{f.input.keyUp(v.key),Uv.includes(v.key)&&v.preventDefault()},M=v=>{const L=l.current;if(document.pointerLockElement===c)L.x=Math.max(0,Math.min(c.width,L.x+v.movementX)),L.y=Math.max(0,Math.min(c.height,L.y+v.movementY));else{const D=c.getBoundingClientRect();L.x=v.clientX-D.left,L.y=v.clientY-D.top}f.input.mouseMove(L.x,L.y)},E=()=>{f.input.mouseDownFn(),document.pointerLockElement!==c&&c.requestPointerLock()},T=()=>f.input.mouseUpFn();window.addEventListener("keydown",_),window.addEventListener("keyup",x),c.addEventListener("mousemove",M),c.addEventListener("mousedown",E),c.addEventListener("mouseup",T);const S=v=>v.preventDefault();return c.addEventListener("contextmenu",S),f.start(),()=>{f.stop(),cancelAnimationFrame(p),window.removeEventListener("resize",d),window.removeEventListener("keydown",_),window.removeEventListener("keyup",x),c.removeEventListener("mousemove",M),c.removeEventListener("mousedown",E),c.removeEventListener("mouseup",T),c.removeEventListener("contextmenu",S)}},[]),tt.jsxs(tt.Fragment,{children:[tt.jsx("canvas",{ref:r,className:"absolute top-0 left-0 w-full h-full cursor-none"}),tt.jsxs("div",{ref:n,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{transform:"translate(-50%, -50%)"},children:[tt.jsx("svg",{className:"absolute -translate-x-1/2 -translate-y-1/2 overflow-visible",width:"0",height:"0",children:tt.jsx("circle",{ref:a,cx:"0",cy:"0",r:"60",fill:"none",stroke:"#33ff66",strokeOpacity:"0.35",strokeWidth:"1",strokeDasharray:"5 4"})}),tt.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:[tt.jsx("rect",{x:"3",y:"3",width:"22",height:"22",fill:"none",stroke:"#33ff66",strokeWidth:"1.5"}),tt.jsx("line",{x1:"14",y1:"9",x2:"14",y2:"13",stroke:"#33ff66",strokeWidth:"1.5"}),tt.jsx("line",{x1:"14",y1:"15",x2:"14",y2:"19",stroke:"#33ff66",strokeWidth:"1.5"}),tt.jsx("line",{x1:"9",y1:"14",x2:"13",y2:"14",stroke:"#33ff66",strokeWidth:"1.5"}),tt.jsx("line",{x1:"15",y1:"14",x2:"19",y2:"14",stroke:"#33ff66",strokeWidth:"1.5"})]})]})]})},O2={[Ri.FreeFire]:"FR",[Ri.LockShortRange]:"SR",[Ri.LockRequired]:"LCK"},ru="#6a7fff",Lv="#33ff66",il="#ff3030",Kc="#ffdd44",xa="#ffffff",Qc="rgba(255,255,255,0.55)",Ir="rgba(255,255,255,0.35)",Jc=({children:r,className:t="",color:n=ru})=>tt.jsx("div",{className:`relative border-2 bg-black/80 ${t}`,style:{borderColor:n},children:r}),$c=({pct:r,fill:t})=>tt.jsx("div",{className:"relative w-full h-[10px] border border-white/30 bg-black/85 overflow-hidden",children:tt.jsx("div",{className:"h-full",style:{width:`${r}%`,background:t}})}),P2=()=>{const{game:r,players:t}=_n(),n=t[0];if(!n)return null;const a=Vs(n.weapon),l=Math.max(0,n.hp/n.maxHp*100),c=Math.max(0,n.energy/n.maxEnergy*100),f=Math.max(0,n.specialGauge/n.maxSpecialGauge*100),d=Math.round(n.speed);return tt.jsxs(tt.Fragment,{children:[tt.jsx("div",{className:"absolute top-3 left-3",children:tt.jsxs(Jc,{className:"px-3 py-2 min-w-[150px]",children:[tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[tt.jsx("span",{style:{color:xa},children:"P1"}),tt.jsx("span",{style:{color:Lv},children:"EN"})]}),tt.jsx($c,{pct:c,fill:Lv}),tt.jsx("div",{className:"flex items-center justify-between text-[10px] mt-0.5",style:{color:Qc},children:tt.jsxs("span",{children:[Math.ceil(n.energy),"/",n.maxEnergy]})})]})}),tt.jsx("div",{className:"absolute top-3 right-3",children:tt.jsxs(Jc,{className:"px-3 py-2 min-w-[200px]",color:r.bossFight?il:ru,children:[tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[tt.jsxs("span",{style:{color:xa},children:["LEVEL ",r.wave]}),tt.jsx("span",{style:{color:r.bossFight?il:Qc},children:r.bossFight?"BOSS":"PVE"})]}),r.bossFight&&tt.jsxs(tt.Fragment,{children:[tt.jsx("div",{className:"text-[10px] mb-1",style:{color:il},children:r.bossName}),tt.jsx($c,{pct:100,fill:il})]})]})}),tt.jsx("div",{className:"absolute bottom-3 left-3",children:tt.jsxs(Jc,{className:"px-3 py-2 min-w-[260px]",children:[tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mb-1",children:[tt.jsx("span",{style:{color:xa},children:"ARMOR"}),tt.jsxs("span",{style:{color:xa},children:[Math.ceil(n.hp),"/",n.maxHp]})]}),tt.jsx($c,{pct:l,fill:il}),tt.jsxs("div",{className:"flex items-center justify-between text-[11px] tracking-wider mt-2 mb-1",children:[tt.jsx("span",{style:{color:xa},children:"SP"}),tt.jsxs("span",{style:{color:Kc},children:[Math.ceil(n.specialGauge),"%"]})]}),tt.jsx($c,{pct:f,fill:Kc}),tt.jsxs("div",{className:"flex items-center gap-2 mt-2 text-[10px]",style:{color:Qc},children:[tt.jsx("span",{style:{color:Ir},children:"WPN"}),tt.jsx("span",{style:{color:xa},children:a.name}),tt.jsxs("span",{children:["DMG:",a.damage]}),tt.jsxs("span",{style:{color:xa},children:["[",O2[a.fireMode],"]"]})]}),tt.jsxs("div",{className:"flex items-center gap-2 mt-1 text-[10px]",style:{color:Qc},children:[tt.jsx("span",{style:{color:Ir},children:"SCORE"}),tt.jsx("span",{style:{color:xa},children:n.score}),n.combo>1&&tt.jsxs("span",{style:{color:Kc},children:["x",n.combo]})]})]})}),tt.jsx("div",{className:"absolute bottom-3 left-1/2 -translate-x-1/2",children:tt.jsxs("div",{className:"flex items-center gap-3",children:[tt.jsxs("div",{className:"px-3 py-2 border-2 bg-black/80",style:{borderColor:ru},children:[tt.jsx("div",{className:"text-[10px] tracking-widest",style:{color:Ir},children:"SPEED"}),tt.jsx("div",{className:"font-mono text-2xl leading-none",style:{color:Kc},children:String(d).padStart(3,"0")})]}),tt.jsxs("div",{className:"px-3 py-2 border-2 bg-black/80",style:{borderColor:ru},children:[tt.jsx("div",{className:"text-[10px] tracking-widest",style:{color:Ir},children:"TIME"}),tt.jsxs("div",{className:"font-mono text-2xl leading-none",style:{color:xa},children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]})}),tt.jsx("div",{className:"absolute bottom-3 right-3",children:tt.jsxs(Jc,{className:"px-2 py-2",children:[tt.jsx("div",{className:"text-[10px] mb-1 tracking-wider",style:{color:Ir},children:"WEAPON"}),tt.jsx("div",{className:"flex items-center gap-1.5",children:n.weapons.map(m=>{const p=Vs(m),g=m===n.weapon;return tt.jsx("div",{className:"w-9 h-9 flex items-center justify-center border",style:{background:"#ffdd44",borderColor:g?"#ffffff":"#000000"},title:p.name,children:tt.jsx("span",{style:{color:"#000000",fontSize:18,fontWeight:"bold"},children:m})},m)})})]})}),tt.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2",children:tt.jsx("div",{className:"px-3 py-1 bg-black/70 text-[9px] tracking-wider",style:{color:Ir},children:"WASD MOVE · MOUSE AIM · LMB FIRE · SPACE BOOST · E BRAKE · 1-4 SWITCH · Z SPECIAL · ESC PAUSE"})})]})},z2=({size:r=80,opacity:t=.5})=>tt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[tt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),tt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),B2=()=>{const{game:r,setGame:t}=_n();return tt.jsxs("div",{className:"lancer-bg absolute inset-0 z-50 flex flex-col items-center justify-center",children:[tt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.05]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px"}}),tt.jsxs("div",{className:"relative z-10 mx-auto w-[420px] max-w-[90vw] lancer-frame px-8 py-6",children:[tt.jsx("h2",{className:"font-pixel-title text-center leading-none",style:{color:"#6a7fff",fontSize:"40px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff",letterSpacing:"0.1em"},children:"暂停"}),tt.jsx("div",{className:"text-center text-[10px] tracking-[0.3em] mt-1",style:{color:"#8fa4ff"},children:"PAUSED"}),tt.jsxs("div",{className:"mt-6 border-t border-lancer-blue/40 pt-4 space-y-2",children:[tt.jsx("button",{onClick:()=>t({screen:"pve",paused:!1}),className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"继续"}),tt.jsx("button",{onClick:()=>{_n.getState().resetGame(),t({screen:"menu"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"返回主菜单"})]}),tt.jsx("div",{className:"mt-4 flex items-center justify-center",children:tt.jsx(z2,{size:32,opacity:.5})})]})]})},I2=({size:r=80,opacity:t=.5})=>tt.jsxs("svg",{viewBox:"0 0 100 100",width:r,height:r,style:{opacity:t},children:[tt.jsx("polygon",{points:"50,15 90,80 10,80",fill:"none",stroke:"#ffffff",strokeWidth:"3"}),tt.jsx("line",{x1:"22",y1:"60",x2:"78",y2:"60",stroke:"#ffffff",strokeWidth:"2"})]}),F2=()=>{const{game:r,players:t}=_n(),n=_n(a=>a.setGame);return tt.jsxs("div",{className:"lancer-bg w-full h-full flex flex-col items-center justify-center",children:[tt.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.05]",style:{backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,15 90,80 10,80' fill='none' stroke='%236a7fff' stroke-width='2'/><line x1='22' y1='60' x2='78' y2='60' stroke='%236a7fff' stroke-width='1.5'/></svg>")`,backgroundSize:"180px 180px"}}),tt.jsx("div",{className:"relative z-10 lancer-frame-danger px-8 py-3 mb-6",children:tt.jsx("h1",{className:"font-pixel-title text-center leading-none tracking-[0.15em]",style:{color:"#ff3030",fontSize:"32px",textShadow:"2px 2px 0 #ffffff, -1px -1px 0 #ffffff"},children:"GAME OVER"})}),tt.jsxs("div",{className:"relative z-10 lancer-frame-dim w-[340px] max-w-[90vw] px-5 py-4 mb-6",children:[tt.jsx("h3",{className:"font-pixel text-[14px] mb-3 tracking-[0.2em]",style:{color:"#6a7fff"},children:"战 绩"}),t.map((a,l)=>tt.jsxs("div",{className:"flex justify-between text-[13px] mb-1.5 tracking-wider",children:[tt.jsxs("span",{style:{color:"#ffffff"},children:["P",l+1]}),tt.jsxs("span",{style:{color:"#ffdd44"},children:["KILLS:",a.kills,"  SCORE:",a.score]})]},a.id)),tt.jsxs("div",{className:"flex justify-between text-[13px] mt-2 pt-2 tracking-wider",style:{borderTop:"1px solid rgba(106,127,255,0.4)"},children:[tt.jsx("span",{style:{color:"#ffffff"},children:"关卡"}),tt.jsxs("span",{style:{color:"#ffdd44"},children:["LEVEL ",r.wave]})]}),tt.jsxs("div",{className:"flex justify-between text-[13px] mt-1 tracking-wider",children:[tt.jsx("span",{style:{color:"#ffffff"},children:"用时"}),tt.jsxs("span",{style:{color:"#ffdd44"},children:[Math.floor(r.time/60).toString().padStart(2,"0"),":",Math.floor(r.time%60).toString().padStart(2,"0")]})]})]}),tt.jsxs("div",{className:"relative z-10 space-y-2 w-[260px]",children:[tt.jsx("button",{onClick:()=>{_n.getState().resetGame(),n({screen:"pve",gameMode:"pve"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"再来一局"}),tt.jsx("button",{onClick:()=>{_n.getState().resetGame(),n({screen:"menu"})},className:"lancer-btn w-full py-2 text-base tracking-[0.2em]",children:"返回主菜单"})]}),tt.jsxs("div",{className:"mt-6 flex items-center gap-2",children:[tt.jsx(I2,{size:28,opacity:.5}),tt.jsx("span",{className:"text-[10px] tracking-wider",style:{color:"rgba(255,255,255,0.5)"},children:"FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79"})]})]})},H2=()=>{const r=_n(n=>n.game),t=()=>{switch(r.screen){case"menu":return tt.jsx(y_,{});case"pve":return tt.jsxs("div",{className:"w-full h-full relative",children:[tt.jsx(N2,{}),tt.jsx(P2,{})]});case"pause":return tt.jsxs("div",{className:"w-full h-full relative",children:[tt.jsx("div",{className:"w-full h-full bg-black/30"}),tt.jsx(B2,{})]});case"result":return tt.jsx(F2,{});default:return tt.jsx(y_,{})}};return tt.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};VS.createRoot(document.getElementById("root")).render(tt.jsx(al.StrictMode,{children:tt.jsx(H2,{})}));
