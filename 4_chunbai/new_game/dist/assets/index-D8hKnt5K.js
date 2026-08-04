var DS=Object.defineProperty;var US=(r,t,i)=>t in r?DS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var jt=(r,t,i)=>US(r,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function Gv(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Eh={exports:{}},ko={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $g;function LS(){if($g)return ko;$g=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return ko.Fragment=t,ko.jsx=i,ko.jsxs=i,ko}var t_;function NS(){return t_||(t_=1,Eh.exports=LS()),Eh.exports}var $=NS(),Th={exports:{}},se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e_;function OS(){if(e_)return se;e_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function S(P){return P===null||typeof P!="object"?null:(P=v&&P[v]||P["@@iterator"],typeof P=="function"?P:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,E={};function x(P,at,yt){this.props=P,this.context=at,this.refs=E,this.updater=yt||M}x.prototype.isReactComponent={},x.prototype.setState=function(P,at){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,at,"setState")},x.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function L(){}L.prototype=x.prototype;function U(P,at,yt){this.props=P,this.context=at,this.refs=E,this.updater=yt||M}var R=U.prototype=new L;R.constructor=U,T(R,x.prototype),R.isPureReactComponent=!0;var Y=Array.isArray;function B(){}var O={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function D(P,at,yt){var Z=yt.ref;return{$$typeof:r,type:P,key:at,ref:Z!==void 0?Z:null,props:yt}}function w(P,at){return D(P.type,at,P.props)}function F(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function nt(P){var at={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(yt){return at[yt]})}var rt=/\/+/g;function ht(P,at){return typeof P=="object"&&P!==null&&P.key!=null?nt(""+P.key):at.toString(36)}function mt(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(B,B):(P.status="pending",P.then(function(at){P.status==="pending"&&(P.status="fulfilled",P.value=at)},function(at){P.status==="pending"&&(P.status="rejected",P.reason=at)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function z(P,at,yt,Z,ut){var Et=typeof P;(Et==="undefined"||Et==="boolean")&&(P=null);var xt=!1;if(P===null)xt=!0;else switch(Et){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(P.$$typeof){case r:case t:xt=!0;break;case g:return xt=P._init,z(xt(P._payload),at,yt,Z,ut)}}if(xt)return ut=ut(P),xt=Z===""?"."+ht(P,0):Z,Y(ut)?(yt="",xt!=null&&(yt=xt.replace(rt,"$&/")+"/"),z(ut,at,yt,"",function(re){return re})):ut!=null&&(F(ut)&&(ut=w(ut,yt+(ut.key==null||P&&P.key===ut.key?"":(""+ut.key).replace(rt,"$&/")+"/")+xt)),at.push(ut)),1;xt=0;var Ht=Z===""?".":Z+":";if(Y(P))for(var Ft=0;Ft<P.length;Ft++)Z=P[Ft],Et=Ht+ht(Z,Ft),xt+=z(Z,at,yt,Et,ut);else if(Ft=S(P),typeof Ft=="function")for(P=Ft.call(P),Ft=0;!(Z=P.next()).done;)Z=Z.value,Et=Ht+ht(Z,Ft++),xt+=z(Z,at,yt,Et,ut);else if(Et==="object"){if(typeof P.then=="function")return z(mt(P),at,yt,Z,ut);throw at=String(P),Error("Objects are not valid as a React child (found: "+(at==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":at)+"). If you meant to render a collection of children, use an array instead.")}return xt}function Q(P,at,yt){if(P==null)return P;var Z=[],ut=0;return z(P,Z,"","",function(Et){return at.call(yt,Et,ut++)}),Z}function K(P){if(P._status===-1){var at=P._result;at=at(),at.then(function(yt){(P._status===0||P._status===-1)&&(P._status=1,P._result=yt)},function(yt){(P._status===0||P._status===-1)&&(P._status=2,P._result=yt)}),P._status===-1&&(P._status=0,P._result=at)}if(P._status===1)return P._result.default;throw P._result}var St=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var at=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(at))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Tt={map:Q,forEach:function(P,at,yt){Q(P,function(){at.apply(this,arguments)},yt)},count:function(P){var at=0;return Q(P,function(){at++}),at},toArray:function(P){return Q(P,function(at){return at})||[]},only:function(P){if(!F(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return se.Activity=_,se.Children=Tt,se.Component=x,se.Fragment=i,se.Profiler=l,se.PureComponent=U,se.StrictMode=s,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,se.__COMPILER_RUNTIME={__proto__:null,c:function(P){return O.H.useMemoCache(P)}},se.cache=function(P){return function(){return P.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(P,at,yt){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Z=T({},P.props),ut=P.key;if(at!=null)for(Et in at.key!==void 0&&(ut=""+at.key),at)!H.call(at,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&at.ref===void 0||(Z[Et]=at[Et]);var Et=arguments.length-2;if(Et===1)Z.children=yt;else if(1<Et){for(var xt=Array(Et),Ht=0;Ht<Et;Ht++)xt[Ht]=arguments[Ht+2];Z.children=xt}return D(P.type,ut,Z)},se.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},se.createElement=function(P,at,yt){var Z,ut={},Et=null;if(at!=null)for(Z in at.key!==void 0&&(Et=""+at.key),at)H.call(at,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ut[Z]=at[Z]);var xt=arguments.length-2;if(xt===1)ut.children=yt;else if(1<xt){for(var Ht=Array(xt),Ft=0;Ft<xt;Ft++)Ht[Ft]=arguments[Ft+2];ut.children=Ht}if(P&&P.defaultProps)for(Z in xt=P.defaultProps,xt)ut[Z]===void 0&&(ut[Z]=xt[Z]);return D(P,Et,ut)},se.createRef=function(){return{current:null}},se.forwardRef=function(P){return{$$typeof:d,render:P}},se.isValidElement=F,se.lazy=function(P){return{$$typeof:g,_payload:{_status:-1,_result:P},_init:K}},se.memo=function(P,at){return{$$typeof:p,type:P,compare:at===void 0?null:at}},se.startTransition=function(P){var at=O.T,yt={};O.T=yt;try{var Z=P(),ut=O.S;ut!==null&&ut(yt,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(B,St)}catch(Et){St(Et)}finally{at!==null&&yt.types!==null&&(at.types=yt.types),O.T=at}},se.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},se.use=function(P){return O.H.use(P)},se.useActionState=function(P,at,yt){return O.H.useActionState(P,at,yt)},se.useCallback=function(P,at){return O.H.useCallback(P,at)},se.useContext=function(P){return O.H.useContext(P)},se.useDebugValue=function(){},se.useDeferredValue=function(P,at){return O.H.useDeferredValue(P,at)},se.useEffect=function(P,at){return O.H.useEffect(P,at)},se.useEffectEvent=function(P){return O.H.useEffectEvent(P)},se.useId=function(){return O.H.useId()},se.useImperativeHandle=function(P,at,yt){return O.H.useImperativeHandle(P,at,yt)},se.useInsertionEffect=function(P,at){return O.H.useInsertionEffect(P,at)},se.useLayoutEffect=function(P,at){return O.H.useLayoutEffect(P,at)},se.useMemo=function(P,at){return O.H.useMemo(P,at)},se.useOptimistic=function(P,at){return O.H.useOptimistic(P,at)},se.useReducer=function(P,at,yt){return O.H.useReducer(P,at,yt)},se.useRef=function(P){return O.H.useRef(P)},se.useState=function(P){return O.H.useState(P)},se.useSyncExternalStore=function(P,at,yt){return O.H.useSyncExternalStore(P,at,yt)},se.useTransition=function(){return O.H.useTransition()},se.version="19.2.8",se}var n_;function np(){return n_||(n_=1,Th.exports=OS()),Th.exports}var Qc=np();const Jo=Gv(Qc);var bh={exports:{}},Xo={},Ah={exports:{}},wh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i_;function PS(){return i_||(i_=1,(function(r){function t(z,Q){var K=z.length;z.push(Q);t:for(;0<K;){var St=K-1>>>1,Tt=z[St];if(0<l(Tt,Q))z[St]=Q,z[K]=Tt,K=St;else break t}}function i(z){return z.length===0?null:z[0]}function s(z){if(z.length===0)return null;var Q=z[0],K=z.pop();if(K!==Q){z[0]=K;t:for(var St=0,Tt=z.length,P=Tt>>>1;St<P;){var at=2*(St+1)-1,yt=z[at],Z=at+1,ut=z[Z];if(0>l(yt,K))Z<Tt&&0>l(ut,yt)?(z[St]=ut,z[Z]=K,St=Z):(z[St]=yt,z[at]=K,St=at);else if(Z<Tt&&0>l(ut,K))z[St]=ut,z[Z]=K,St=Z;else break t}}return Q}function l(z,Q){var K=z.sortIndex-Q.sortIndex;return K!==0?K:z.id-Q.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();r.unstable_now=function(){return f.now()-d}}var m=[],p=[],g=1,_=null,v=3,S=!1,M=!1,T=!1,E=!1,x=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function R(z){for(var Q=i(p);Q!==null;){if(Q.callback===null)s(p);else if(Q.startTime<=z)s(p),Q.sortIndex=Q.expirationTime,t(m,Q);else break;Q=i(p)}}function Y(z){if(T=!1,R(z),!M)if(i(m)!==null)M=!0,B||(B=!0,nt());else{var Q=i(p);Q!==null&&mt(Y,Q.startTime-z)}}var B=!1,O=-1,H=5,D=-1;function w(){return E?!0:!(r.unstable_now()-D<H)}function F(){if(E=!1,B){var z=r.unstable_now();D=z;var Q=!0;try{t:{M=!1,T&&(T=!1,L(O),O=-1),S=!0;var K=v;try{e:{for(R(z),_=i(m);_!==null&&!(_.expirationTime>z&&w());){var St=_.callback;if(typeof St=="function"){_.callback=null,v=_.priorityLevel;var Tt=St(_.expirationTime<=z);if(z=r.unstable_now(),typeof Tt=="function"){_.callback=Tt,R(z),Q=!0;break e}_===i(m)&&s(m),R(z)}else s(m);_=i(m)}if(_!==null)Q=!0;else{var P=i(p);P!==null&&mt(Y,P.startTime-z),Q=!1}}break t}finally{_=null,v=K,S=!1}Q=void 0}}finally{Q?nt():B=!1}}}var nt;if(typeof U=="function")nt=function(){U(F)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,ht=rt.port2;rt.port1.onmessage=F,nt=function(){ht.postMessage(null)}}else nt=function(){x(F,0)};function mt(z,Q){O=x(function(){z(r.unstable_now())},Q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_next=function(z){switch(v){case 1:case 2:case 3:var Q=3;break;default:Q=v}var K=v;v=Q;try{return z()}finally{v=K}},r.unstable_requestPaint=function(){E=!0},r.unstable_runWithPriority=function(z,Q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var K=v;v=z;try{return Q()}finally{v=K}},r.unstable_scheduleCallback=function(z,Q,K){var St=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?St+K:St):K=St,z){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=K+Tt,z={id:g++,callback:Q,priorityLevel:z,startTime:K,expirationTime:Tt,sortIndex:-1},K>St?(z.sortIndex=K,t(p,z),i(m)===null&&z===i(p)&&(T?(L(O),O=-1):T=!0,mt(Y,K-St))):(z.sortIndex=Tt,t(m,z),M||S||(M=!0,B||(B=!0,nt()))),z},r.unstable_shouldYield=w,r.unstable_wrapCallback=function(z){var Q=v;return function(){var K=v;v=Q;try{return z.apply(this,arguments)}finally{v=K}}}})(wh)),wh}var a_;function zS(){return a_||(a_=1,Ah.exports=PS()),Ah.exports}var Rh={exports:{}},In={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s_;function BS(){if(s_)return In;s_=1;var r=np();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,In.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},In.flushSync=function(m){var p=f.T,g=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=g,s.d.f()}},In.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},In.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},In.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:S}):g==="script"&&s.d.X(m,{crossOrigin:_,integrity:v,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},In.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},In.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},In.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},In.requestFormReset=function(m){s.d.r(m)},In.unstable_batchedUpdates=function(m,p){return m(p)},In.useFormState=function(m,p,g){return f.H.useFormState(m,p,g)},In.useFormStatus=function(){return f.H.useHostTransitionStatus()},In.version="19.2.8",In}var r_;function IS(){if(r_)return Rh.exports;r_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Rh.exports=BS(),Rh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o_;function FS(){if(o_)return Xo;o_=1;var r=zS(),t=np(),i=IS();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),e;if(h===o)return m(u),n;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var y=!1,b=u.child;b;){if(b===a){y=!0,a=u,o=h;break}if(b===o){y=!0,o=u,a=h;break}b=b.sibling}if(!y){for(b=h.child;b;){if(b===a){y=!0,a=h,o=u;break}if(b===o){y=!0,o=h,a=u;break}b=b.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),U=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),Y=Symbol.for("react.suspense"),B=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),w=Symbol.for("react.memo_cache_sentinel"),F=Symbol.iterator;function nt(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var rt=Symbol.for("react.client.reference");function ht(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===rt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case x:return"Profiler";case E:return"StrictMode";case Y:return"Suspense";case B:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case M:return"Portal";case U:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case R:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return n=e.displayName||null,n!==null?n:ht(e.type)||"Memo";case H:n=e._payload,e=e._init;try{return ht(e(n))}catch{}}return null}var mt=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},St=[],Tt=-1;function P(e){return{current:e}}function at(e){0>Tt||(e.current=St[Tt],St[Tt]=null,Tt--)}function yt(e,n){Tt++,St[Tt]=e.current,e.current=n}var Z=P(null),ut=P(null),Et=P(null),xt=P(null);function Ht(e,n){switch(yt(Et,n),yt(ut,e),yt(Z,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Mg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Mg(n),e=Eg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}at(Z),yt(Z,e)}function Ft(){at(Z),at(ut),at(Et)}function re(e){e.memoizedState!==null&&yt(xt,e);var n=Z.current,a=Eg(n,e.type);n!==a&&(yt(ut,e),yt(Z,a))}function Be(e){ut.current===e&&(at(Z),at(ut)),xt.current===e&&(at(xt),Fo._currentValue=K)}var me,$e;function q(e){if(me===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);me=n&&n[1]||"",$e=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+me+e+$e}var Pn=!1;function pe(e,n){if(!e||Pn)return"";Pn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(lt){var et=lt}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(lt){et=lt}e.call(_t.prototype)}}else{try{throw Error()}catch(lt){et=lt}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(lt){if(lt&&et&&typeof lt.stack=="string")return[lt.stack,et.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),y=h[0],b=h[1];if(y&&b){var I=y.split(`
`),tt=b.split(`
`);for(u=o=0;o<I.length&&!I[o].includes("DetermineComponentFrameRoot");)o++;for(;u<tt.length&&!tt[u].includes("DetermineComponentFrameRoot");)u++;if(o===I.length||u===tt.length)for(o=I.length-1,u=tt.length-1;1<=o&&0<=u&&I[o]!==tt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(I[o]!==tt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||I[o]!==tt[u]){var ft=`
`+I[o].replace(" at new "," at ");return e.displayName&&ft.includes("<anonymous>")&&(ft=ft.replace("<anonymous>",e.displayName)),ft}while(1<=o&&0<=u);break}}}finally{Pn=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?q(a):""}function ve(e,n){switch(e.tag){case 26:case 27:case 5:return q(e.type);case 16:return q("Lazy");case 13:return e.child!==n&&n!==null?q("Suspense Fallback"):q("Suspense");case 19:return q("SuspenseList");case 0:case 15:return pe(e.type,!1);case 11:return pe(e.type.render,!1);case 1:return pe(e.type,!0);case 31:return q("Activity");default:return""}}function Qt(e){try{var n="",a=null;do n+=ve(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Ne=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,N=r.unstable_cancelCallback,A=r.unstable_shouldYield,it=r.unstable_requestPaint,dt=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,Wt=r.unstable_UserBlockingPriority,Ut=r.unstable_NormalPriority,Pt=r.unstable_LowPriority,xe=r.unstable_IdlePriority,At=r.log,zt=r.unstable_setDisableYieldValue,Kt=null,qt=null;function Ot(e){if(typeof At=="function"&&zt(e),qt&&typeof qt.setStrictMode=="function")try{qt.setStrictMode(Kt,e)}catch{}}var te=Math.clz32?Math.clz32:k,le=Math.log,Ie=Math.LN2;function k(e){return e>>>=0,e===0?32:31-(le(e)/Ie|0)|0}var wt=256,ct=262144,vt=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Lt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~h,o!==0?u=Rt(o):(y&=b,y!==0?u=Rt(y):a||(a=b&~e,a!==0&&(u=Rt(a))))):(b=o&~h,b!==0?u=Rt(b):y!==0?u=Rt(y):a||(a=o&~e,a!==0&&(u=Rt(a)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:u}function ee(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function tn(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function mn(){var e=vt;return vt<<=1,(vt&62914560)===0&&(vt=4194304),e}function Ae(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function wn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ai(e,n,a,o,u,h){var y=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,I=e.expirationTimes,tt=e.hiddenUpdates;for(a=y&~a;0<a;){var ft=31-te(a),_t=1<<ft;b[ft]=0,I[ft]=-1;var et=tt[ft];if(et!==null)for(tt[ft]=null,ft=0;ft<et.length;ft++){var lt=et[ft];lt!==null&&(lt.lane&=-536870913)}a&=~_t}o!==0&&Qr(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~n))}function Qr(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-te(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Jr(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-te(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function Bi(e,n){var a=n&-n;return a=(a&42)!==0?1:ls(a),(a&(e.suspendedLanes|n))!==0?0:a}function ls(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ks(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function $r(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:qg(e.type))}function cs(e,n){var a=Q.p;try{return Q.p=e,n()}finally{Q.p=a}}var wi=Math.random().toString(36).slice(2),an="__reactFiber$"+wi,Rn="__reactProps$"+wi,ji="__reactContainer$"+wi,to="__reactEvents$"+wi,gu="__reactListeners$"+wi,_u="__reactHandles$"+wi,C="__reactResources$"+wi,X="__reactMarker$"+wi;function ot(e){delete e[an],delete e[Rn],delete e[to],delete e[gu],delete e[_u]}function st(e){var n=e[an];if(n)return n;for(var a=e.parentNode;a;){if(n=a[ji]||a[an]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=Dg(e);e!==null;){if(a=e[an])return a;e=Dg(e)}return n}e=a,a=e.parentNode}return null}function W(e){if(e=e[an]||e[ji]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function bt(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Ct(e){var n=e[C];return n||(n=e[C]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Dt(e){e[X]=!0}var Vt=new Set,ne={};function $t(e,n){Bt(e,n),Bt(e+"Capture",n)}function Bt(e,n){for(ne[e]=n,e=0;e<n.length;e++)Vt.add(n[e])}var be=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Oe={},Fe={};function zn(e){return Ne.call(Fe,e)?!0:Ne.call(Oe,e)?!1:be.test(e)?Fe[e]=!0:(Oe[e]=!0,!1)}function Me(e,n,a){if(zn(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function kt(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function gn(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function oe(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function kn(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ea(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,h.call(this,y)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Cn(e){if(!e._valueTracker){var n=kn(e)?"checked":"value";e._valueTracker=Ea(e,n,""+e[n])}}function Ta(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=kn(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Ue(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var hi=/[\n"\\]/g;function Sn(e){return e.replace(hi,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Bn(e,n,a,o,u,h,y,b){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),n!=null?y==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+oe(n)):e.value!==""+oe(n)&&(e.value=""+oe(n)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),n!=null?di(e,y,oe(n)):a!=null?di(e,y,oe(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+oe(b):e.removeAttribute("name")}function Ri(e,n,a,o,u,h,y,b){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Cn(e);return}a=a!=null?""+oe(a):"",n=n!=null?""+oe(n):a,b||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Cn(e)}function di(e,n,a){n==="number"&&Ue(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Yi(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+oe(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function _p(e,n,a){if(n!=null&&(n=""+oe(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+oe(a):""}function vp(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(mt(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=oe(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Cn(e)}function Xs(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var bx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function xp(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||bx.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function yp(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&xp(e,u,o)}else for(var h in n)n.hasOwnProperty(h)&&xp(e,h,n[h])}function vu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ax=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),wx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ul(e){return wx.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Zi(){}var xu=null;function yu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ws=null,qs=null;function Sp(e){var n=W(e);if(n&&(e=n.stateNode)){var a=e[Rn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Bn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Sn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Rn]||null;if(!u)throw Error(s(90));Bn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&Ta(o)}break t;case"textarea":_p(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Yi(e,!!a.multiple,n,!1)}}}var Su=!1;function Mp(e,n,a){if(Su)return e(n,a);Su=!0;try{var o=e(n);return o}finally{if(Su=!1,(Ws!==null||qs!==null)&&(Ql(),Ws&&(n=Ws,e=qs,qs=Ws=null,Sp(n),e)))for(n=0;n<e.length;n++)Sp(e[n])}}function eo(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Rn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Ki=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Mu=!1;if(Ki)try{var no={};Object.defineProperty(no,"passive",{get:function(){Mu=!0}}),window.addEventListener("test",no,no),window.removeEventListener("test",no,no)}catch{Mu=!1}var ba=null,Eu=null,fl=null;function Ep(){if(fl)return fl;var e,n=Eu,a=n.length,o,u="value"in ba?ba.value:ba.textContent,h=u.length;for(e=0;e<a&&n[e]===u[e];e++);var y=a-e;for(o=1;o<=y&&n[a-o]===u[h-o];o++);return fl=u.slice(e,1<o?1-o:void 0)}function hl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function dl(){return!0}function Tp(){return!1}function Xn(e){function n(a,o,u,h,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(h):h[b]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?dl:Tp,this.isPropagationStopped=Tp,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=dl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=dl)},persist:function(){},isPersistent:dl}),n}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pl=Xn(us),io=_({},us,{view:0,detail:0}),Rx=Xn(io),Tu,bu,ao,ml=_({},io,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ao&&(ao&&e.type==="mousemove"?(Tu=e.screenX-ao.screenX,bu=e.screenY-ao.screenY):bu=Tu=0,ao=e),Tu)},movementY:function(e){return"movementY"in e?e.movementY:bu}}),bp=Xn(ml),Cx=_({},ml,{dataTransfer:0}),Dx=Xn(Cx),Ux=_({},io,{relatedTarget:0}),Au=Xn(Ux),Lx=_({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),Nx=Xn(Lx),Ox=_({},us,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Px=Xn(Ox),zx=_({},us,{data:0}),Ap=Xn(zx),Bx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ix={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Hx(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Fx[e])?!!n[e]:!1}function wu(){return Hx}var Gx=_({},io,{key:function(e){if(e.key){var n=Bx[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=hl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ix[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wu,charCode:function(e){return e.type==="keypress"?hl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?hl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Vx=Xn(Gx),kx=_({},ml,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wp=Xn(kx),Xx=_({},io,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wu}),Wx=Xn(Xx),qx=_({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),jx=Xn(qx),Yx=_({},ml,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Zx=Xn(Yx),Kx=_({},us,{newState:0,oldState:0}),Qx=Xn(Kx),Jx=[9,13,27,32],Ru=Ki&&"CompositionEvent"in window,so=null;Ki&&"documentMode"in document&&(so=document.documentMode);var $x=Ki&&"TextEvent"in window&&!so,Rp=Ki&&(!Ru||so&&8<so&&11>=so),Cp=" ",Dp=!1;function Up(e,n){switch(e){case"keyup":return Jx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var js=!1;function ty(e,n){switch(e){case"compositionend":return Lp(n);case"keypress":return n.which!==32?null:(Dp=!0,Cp);case"textInput":return e=n.data,e===Cp&&Dp?null:e;default:return null}}function ey(e,n){if(js)return e==="compositionend"||!Ru&&Up(e,n)?(e=Ep(),fl=Eu=ba=null,js=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Rp&&n.locale!=="ko"?null:n.data;default:return null}}var ny={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Np(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!ny[e.type]:n==="textarea"}function Op(e,n,a,o){Ws?qs?qs.push(o):qs=[o]:Ws=o,n=ac(n,"onChange"),0<n.length&&(a=new pl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var ro=null,oo=null;function iy(e){gg(e,0)}function gl(e){var n=bt(e);if(Ta(n))return e}function Pp(e,n){if(e==="change")return n}var zp=!1;if(Ki){var Cu;if(Ki){var Du="oninput"in document;if(!Du){var Bp=document.createElement("div");Bp.setAttribute("oninput","return;"),Du=typeof Bp.oninput=="function"}Cu=Du}else Cu=!1;zp=Cu&&(!document.documentMode||9<document.documentMode)}function Ip(){ro&&(ro.detachEvent("onpropertychange",Fp),oo=ro=null)}function Fp(e){if(e.propertyName==="value"&&gl(oo)){var n=[];Op(n,oo,e,yu(e)),Mp(iy,n)}}function ay(e,n,a){e==="focusin"?(Ip(),ro=n,oo=a,ro.attachEvent("onpropertychange",Fp)):e==="focusout"&&Ip()}function sy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return gl(oo)}function ry(e,n){if(e==="click")return gl(n)}function oy(e,n){if(e==="input"||e==="change")return gl(n)}function ly(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ei=typeof Object.is=="function"?Object.is:ly;function lo(e,n){if(ei(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Ne.call(n,u)||!ei(e[u],n[u]))return!1}return!0}function Hp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gp(e,n){var a=Hp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Hp(a)}}function Vp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Vp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function kp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ue(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Ue(e.document)}return n}function Uu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var cy=Ki&&"documentMode"in document&&11>=document.documentMode,Ys=null,Lu=null,co=null,Nu=!1;function Xp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Nu||Ys==null||Ys!==Ue(o)||(o=Ys,"selectionStart"in o&&Uu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),co&&lo(co,o)||(co=o,o=ac(Lu,"onSelect"),0<o.length&&(n=new pl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Ys)))}function fs(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Zs={animationend:fs("Animation","AnimationEnd"),animationiteration:fs("Animation","AnimationIteration"),animationstart:fs("Animation","AnimationStart"),transitionrun:fs("Transition","TransitionRun"),transitionstart:fs("Transition","TransitionStart"),transitioncancel:fs("Transition","TransitionCancel"),transitionend:fs("Transition","TransitionEnd")},Ou={},Wp={};Ki&&(Wp=document.createElement("div").style,"AnimationEvent"in window||(delete Zs.animationend.animation,delete Zs.animationiteration.animation,delete Zs.animationstart.animation),"TransitionEvent"in window||delete Zs.transitionend.transition);function hs(e){if(Ou[e])return Ou[e];if(!Zs[e])return e;var n=Zs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Wp)return Ou[e]=n[a];return e}var qp=hs("animationend"),jp=hs("animationiteration"),Yp=hs("animationstart"),uy=hs("transitionrun"),fy=hs("transitionstart"),hy=hs("transitioncancel"),Zp=hs("transitionend"),Kp=new Map,Pu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Pu.push("scrollEnd");function Ci(e,n){Kp.set(e,n),$t(n,[e])}var _l=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},pi=[],Ks=0,zu=0;function vl(){for(var e=Ks,n=zu=Ks=0;n<e;){var a=pi[n];pi[n++]=null;var o=pi[n];pi[n++]=null;var u=pi[n];pi[n++]=null;var h=pi[n];if(pi[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}h!==0&&Qp(a,u,h)}}function xl(e,n,a,o){pi[Ks++]=e,pi[Ks++]=n,pi[Ks++]=a,pi[Ks++]=o,zu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Bu(e,n,a,o){return xl(e,n,a,o),yl(e)}function ds(e,n){return xl(e,null,null,n),yl(e)}function Qp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&n!==null&&(u=31-te(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),h):null}function yl(e){if(50<Lo)throw Lo=0,jf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Qs={};function dy(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ni(e,n,a,o){return new dy(e,n,a,o)}function Iu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qi(e,n){var a=e.alternate;return a===null?(a=ni(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Jp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Sl(e,n,a,o,u,h){var y=0;if(o=e,typeof e=="function")Iu(e)&&(y=1);else if(typeof e=="string")y=vS(e,a,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ni(31,a,n,u),e.elementType=D,e.lanes=h,e;case T:return ps(a.children,u,h,n);case E:y=8,u|=24;break;case x:return e=ni(12,a,n,u|2),e.elementType=x,e.lanes=h,e;case Y:return e=ni(13,a,n,u),e.elementType=Y,e.lanes=h,e;case B:return e=ni(19,a,n,u),e.elementType=B,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case U:y=10;break t;case L:y=9;break t;case R:y=11;break t;case O:y=14;break t;case H:y=16,o=null;break t}y=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=ni(y,a,n,u),n.elementType=e,n.type=o,n.lanes=h,n}function ps(e,n,a,o){return e=ni(7,e,o,n),e.lanes=a,e}function Fu(e,n,a){return e=ni(6,e,null,n),e.lanes=a,e}function $p(e){var n=ni(18,null,null,0);return n.stateNode=e,n}function Hu(e,n,a){return n=ni(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var tm=new WeakMap;function mi(e,n){if(typeof e=="object"&&e!==null){var a=tm.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Qt(n)},tm.set(e,n),n)}return{value:e,source:n,stack:Qt(n)}}var Js=[],$s=0,Ml=null,uo=0,gi=[],_i=0,Aa=null,Ii=1,Fi="";function Ji(e,n){Js[$s++]=uo,Js[$s++]=Ml,Ml=e,uo=n}function em(e,n,a){gi[_i++]=Ii,gi[_i++]=Fi,gi[_i++]=Aa,Aa=e;var o=Ii;e=Fi;var u=32-te(o)-1;o&=~(1<<u),a+=1;var h=32-te(n)+u;if(30<h){var y=u-u%5;h=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Ii=1<<32-te(n)+u|a<<u|o,Fi=h+e}else Ii=1<<h|a<<u|o,Fi=e}function Gu(e){e.return!==null&&(Ji(e,1),em(e,1,0))}function Vu(e){for(;e===Ml;)Ml=Js[--$s],Js[$s]=null,uo=Js[--$s],Js[$s]=null;for(;e===Aa;)Aa=gi[--_i],gi[_i]=null,Fi=gi[--_i],gi[_i]=null,Ii=gi[--_i],gi[_i]=null}function nm(e,n){gi[_i++]=Ii,gi[_i++]=Fi,gi[_i++]=Aa,Ii=n.id,Fi=n.overflow,Aa=e}var Dn=null,Ze=null,Ee=!1,wa=null,vi=!1,ku=Error(s(519));function Ra(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw fo(mi(n,e)),ku}function im(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[an]=e,n[Rn]=o,a){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(a=0;a<Oo.length;a++)_e(Oo[a],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),Ri(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),vp(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||yg(n.textContent,a)?(o.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),o.onScroll!=null&&_e("scroll",n),o.onScrollEnd!=null&&_e("scrollend",n),o.onClick!=null&&(n.onclick=Zi),n=!0):n=!1,n||Ra(e,!0)}function am(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:vi=!1;return;case 27:case 3:vi=!0;return;default:Dn=Dn.return}}function tr(e){if(e!==Dn)return!1;if(!Ee)return am(e),Ee=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||lh(e.type,e.memoizedProps)),a=!a),a&&Ze&&Ra(e),am(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ze=Cg(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ze=Cg(e)}else n===27?(n=Ze,Va(e.type)?(e=dh,dh=null,Ze=e):Ze=n):Ze=Dn?yi(e.stateNode.nextSibling):null;return!0}function ms(){Ze=Dn=null,Ee=!1}function Xu(){var e=wa;return e!==null&&(Yn===null?Yn=e:Yn.push.apply(Yn,e),wa=null),e}function fo(e){wa===null?wa=[e]:wa.push(e)}var Wu=P(null),gs=null,$i=null;function Ca(e,n,a){yt(Wu,n._currentValue),n._currentValue=a}function ta(e){e._currentValue=Wu.current,at(Wu)}function qu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function ju(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var y=u.child;h=h.firstContext;t:for(;h!==null;){var b=h;h=u;for(var I=0;I<n.length;I++)if(b.context===n[I]){h.lanes|=a,b=h.alternate,b!==null&&(b.lanes|=a),qu(h.return,a,e),o||(y=null);break t}h=b.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,h=y.alternate,h!==null&&(h.lanes|=a),qu(y,a,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function er(e,n,a,o){e=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var b=u.type;ei(u.pendingProps.value,y.value)||(e!==null?e.push(b):e=[b])}}else if(u===xt.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Fo):e=[Fo])}u=u.return}e!==null&&ju(n,e,a,o),n.flags|=262144}function El(e){for(e=e.firstContext;e!==null;){if(!ei(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function _s(e){gs=e,$i=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return sm(gs,e)}function Tl(e,n){return gs===null&&_s(e),sm(e,n)}function sm(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},$i===null){if(e===null)throw Error(s(308));$i=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else $i=$i.next=n;return a}var py=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},my=r.unstable_scheduleCallback,gy=r.unstable_NormalPriority,un={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Yu(){return{controller:new py,data:new Map,refCount:0}}function ho(e){e.refCount--,e.refCount===0&&my(gy,function(){e.controller.abort()})}var po=null,Zu=0,nr=0,ir=null;function _y(e,n){if(po===null){var a=po=[];Zu=0,nr=$f(),ir={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Zu++,n.then(rm,rm),n}function rm(){if(--Zu===0&&po!==null){ir!==null&&(ir.status="fulfilled");var e=po;po=null,nr=0,ir=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function vy(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var om=z.S;z.S=function(e,n){X0=dt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&_y(e,n),om!==null&&om(e,n)};var vs=P(null);function Ku(){var e=vs.current;return e!==null?e:We.pooledCache}function bl(e,n){n===null?yt(vs,vs.current):yt(vs,n.pool)}function lm(){var e=Ku();return e===null?null:{parent:un._currentValue,pool:e}}var ar=Error(s(460)),Qu=Error(s(474)),Al=Error(s(542)),wl={then:function(){}};function cm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function um(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Zi,Zi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,hm(e),e;default:if(typeof n.status=="string")n.then(Zi,Zi);else{if(e=We,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,hm(e),e}throw ys=n,ar}}function xs(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ys=a,ar):a}}var ys=null;function fm(){if(ys===null)throw Error(s(459));var e=ys;return ys=null,e}function hm(e){if(e===ar||e===Al)throw Error(s(483))}var sr=null,mo=0;function Rl(e){var n=mo;return mo+=1,sr===null&&(sr=[]),um(sr,e,n)}function go(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Cl(e,n){throw n.$$typeof===v?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function dm(e){function n(j,G){if(e){var J=j.deletions;J===null?(j.deletions=[G],j.flags|=16):J.push(G)}}function a(j,G){if(!e)return null;for(;G!==null;)n(j,G),G=G.sibling;return null}function o(j){for(var G=new Map;j!==null;)j.key!==null?G.set(j.key,j):G.set(j.index,j),j=j.sibling;return G}function u(j,G){return j=Qi(j,G),j.index=0,j.sibling=null,j}function h(j,G,J){return j.index=J,e?(J=j.alternate,J!==null?(J=J.index,J<G?(j.flags|=67108866,G):J):(j.flags|=67108866,G)):(j.flags|=1048576,G)}function y(j){return e&&j.alternate===null&&(j.flags|=67108866),j}function b(j,G,J,pt){return G===null||G.tag!==6?(G=Fu(J,j.mode,pt),G.return=j,G):(G=u(G,J),G.return=j,G)}function I(j,G,J,pt){var Yt=J.type;return Yt===T?ft(j,G,J.props.children,pt,J.key):G!==null&&(G.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===H&&xs(Yt)===G.type)?(G=u(G,J.props),go(G,J),G.return=j,G):(G=Sl(J.type,J.key,J.props,null,j.mode,pt),go(G,J),G.return=j,G)}function tt(j,G,J,pt){return G===null||G.tag!==4||G.stateNode.containerInfo!==J.containerInfo||G.stateNode.implementation!==J.implementation?(G=Hu(J,j.mode,pt),G.return=j,G):(G=u(G,J.children||[]),G.return=j,G)}function ft(j,G,J,pt,Yt){return G===null||G.tag!==7?(G=ps(J,j.mode,pt,Yt),G.return=j,G):(G=u(G,J),G.return=j,G)}function _t(j,G,J){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=Fu(""+G,j.mode,J),G.return=j,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case S:return J=Sl(G.type,G.key,G.props,null,j.mode,J),go(J,G),J.return=j,J;case M:return G=Hu(G,j.mode,J),G.return=j,G;case H:return G=xs(G),_t(j,G,J)}if(mt(G)||nt(G))return G=ps(G,j.mode,J,null),G.return=j,G;if(typeof G.then=="function")return _t(j,Rl(G),J);if(G.$$typeof===U)return _t(j,Tl(j,G),J);Cl(j,G)}return null}function et(j,G,J,pt){var Yt=G!==null?G.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Yt!==null?null:b(j,G,""+J,pt);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case S:return J.key===Yt?I(j,G,J,pt):null;case M:return J.key===Yt?tt(j,G,J,pt):null;case H:return J=xs(J),et(j,G,J,pt)}if(mt(J)||nt(J))return Yt!==null?null:ft(j,G,J,pt,null);if(typeof J.then=="function")return et(j,G,Rl(J),pt);if(J.$$typeof===U)return et(j,G,Tl(j,J),pt);Cl(j,J)}return null}function lt(j,G,J,pt,Yt){if(typeof pt=="string"&&pt!==""||typeof pt=="number"||typeof pt=="bigint")return j=j.get(J)||null,b(G,j,""+pt,Yt);if(typeof pt=="object"&&pt!==null){switch(pt.$$typeof){case S:return j=j.get(pt.key===null?J:pt.key)||null,I(G,j,pt,Yt);case M:return j=j.get(pt.key===null?J:pt.key)||null,tt(G,j,pt,Yt);case H:return pt=xs(pt),lt(j,G,J,pt,Yt)}if(mt(pt)||nt(pt))return j=j.get(J)||null,ft(G,j,pt,Yt,null);if(typeof pt.then=="function")return lt(j,G,J,Rl(pt),Yt);if(pt.$$typeof===U)return lt(j,G,J,Tl(G,pt),Yt);Cl(G,pt)}return null}function It(j,G,J,pt){for(var Yt=null,Re=null,Xt=G,ue=G=0,Se=null;Xt!==null&&ue<J.length;ue++){Xt.index>ue?(Se=Xt,Xt=null):Se=Xt.sibling;var Ce=et(j,Xt,J[ue],pt);if(Ce===null){Xt===null&&(Xt=Se);break}e&&Xt&&Ce.alternate===null&&n(j,Xt),G=h(Ce,G,ue),Re===null?Yt=Ce:Re.sibling=Ce,Re=Ce,Xt=Se}if(ue===J.length)return a(j,Xt),Ee&&Ji(j,ue),Yt;if(Xt===null){for(;ue<J.length;ue++)Xt=_t(j,J[ue],pt),Xt!==null&&(G=h(Xt,G,ue),Re===null?Yt=Xt:Re.sibling=Xt,Re=Xt);return Ee&&Ji(j,ue),Yt}for(Xt=o(Xt);ue<J.length;ue++)Se=lt(Xt,j,ue,J[ue],pt),Se!==null&&(e&&Se.alternate!==null&&Xt.delete(Se.key===null?ue:Se.key),G=h(Se,G,ue),Re===null?Yt=Se:Re.sibling=Se,Re=Se);return e&&Xt.forEach(function(ja){return n(j,ja)}),Ee&&Ji(j,ue),Yt}function Jt(j,G,J,pt){if(J==null)throw Error(s(151));for(var Yt=null,Re=null,Xt=G,ue=G=0,Se=null,Ce=J.next();Xt!==null&&!Ce.done;ue++,Ce=J.next()){Xt.index>ue?(Se=Xt,Xt=null):Se=Xt.sibling;var ja=et(j,Xt,Ce.value,pt);if(ja===null){Xt===null&&(Xt=Se);break}e&&Xt&&ja.alternate===null&&n(j,Xt),G=h(ja,G,ue),Re===null?Yt=ja:Re.sibling=ja,Re=ja,Xt=Se}if(Ce.done)return a(j,Xt),Ee&&Ji(j,ue),Yt;if(Xt===null){for(;!Ce.done;ue++,Ce=J.next())Ce=_t(j,Ce.value,pt),Ce!==null&&(G=h(Ce,G,ue),Re===null?Yt=Ce:Re.sibling=Ce,Re=Ce);return Ee&&Ji(j,ue),Yt}for(Xt=o(Xt);!Ce.done;ue++,Ce=J.next())Ce=lt(Xt,j,ue,Ce.value,pt),Ce!==null&&(e&&Ce.alternate!==null&&Xt.delete(Ce.key===null?ue:Ce.key),G=h(Ce,G,ue),Re===null?Yt=Ce:Re.sibling=Ce,Re=Ce);return e&&Xt.forEach(function(CS){return n(j,CS)}),Ee&&Ji(j,ue),Yt}function Ve(j,G,J,pt){if(typeof J=="object"&&J!==null&&J.type===T&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case S:t:{for(var Yt=J.key;G!==null;){if(G.key===Yt){if(Yt=J.type,Yt===T){if(G.tag===7){a(j,G.sibling),pt=u(G,J.props.children),pt.return=j,j=pt;break t}}else if(G.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===H&&xs(Yt)===G.type){a(j,G.sibling),pt=u(G,J.props),go(pt,J),pt.return=j,j=pt;break t}a(j,G);break}else n(j,G);G=G.sibling}J.type===T?(pt=ps(J.props.children,j.mode,pt,J.key),pt.return=j,j=pt):(pt=Sl(J.type,J.key,J.props,null,j.mode,pt),go(pt,J),pt.return=j,j=pt)}return y(j);case M:t:{for(Yt=J.key;G!==null;){if(G.key===Yt)if(G.tag===4&&G.stateNode.containerInfo===J.containerInfo&&G.stateNode.implementation===J.implementation){a(j,G.sibling),pt=u(G,J.children||[]),pt.return=j,j=pt;break t}else{a(j,G);break}else n(j,G);G=G.sibling}pt=Hu(J,j.mode,pt),pt.return=j,j=pt}return y(j);case H:return J=xs(J),Ve(j,G,J,pt)}if(mt(J))return It(j,G,J,pt);if(nt(J)){if(Yt=nt(J),typeof Yt!="function")throw Error(s(150));return J=Yt.call(J),Jt(j,G,J,pt)}if(typeof J.then=="function")return Ve(j,G,Rl(J),pt);if(J.$$typeof===U)return Ve(j,G,Tl(j,J),pt);Cl(j,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,G!==null&&G.tag===6?(a(j,G.sibling),pt=u(G,J),pt.return=j,j=pt):(a(j,G),pt=Fu(J,j.mode,pt),pt.return=j,j=pt),y(j)):a(j,G)}return function(j,G,J,pt){try{mo=0;var Yt=Ve(j,G,J,pt);return sr=null,Yt}catch(Xt){if(Xt===ar||Xt===Al)throw Xt;var Re=ni(29,Xt,null,j.mode);return Re.lanes=pt,Re.return=j,Re}finally{}}}var Ss=dm(!0),pm=dm(!1),Da=!1;function Ju(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $u(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ua(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function La(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(De&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=yl(e),Qp(e,null,a),n}return xl(e,o,n,a),yl(e)}function _o(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Jr(e,a)}}function tf(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=y:h=h.next=y,a=a.next}while(a!==null);h===null?u=h=n:h=h.next=n}else u=h=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var ef=!1;function vo(){if(ef){var e=ir;if(e!==null)throw e}}function xo(e,n,a,o){ef=!1;var u=e.updateQueue;Da=!1;var h=u.firstBaseUpdate,y=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var I=b,tt=I.next;I.next=null,y===null?h=tt:y.next=tt,y=I;var ft=e.alternate;ft!==null&&(ft=ft.updateQueue,b=ft.lastBaseUpdate,b!==y&&(b===null?ft.firstBaseUpdate=tt:b.next=tt,ft.lastBaseUpdate=I))}if(h!==null){var _t=u.baseState;y=0,ft=tt=I=null,b=h;do{var et=b.lane&-536870913,lt=et!==b.lane;if(lt?(ye&et)===et:(o&et)===et){et!==0&&et===nr&&(ef=!0),ft!==null&&(ft=ft.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var It=e,Jt=b;et=n;var Ve=a;switch(Jt.tag){case 1:if(It=Jt.payload,typeof It=="function"){_t=It.call(Ve,_t,et);break t}_t=It;break t;case 3:It.flags=It.flags&-65537|128;case 0:if(It=Jt.payload,et=typeof It=="function"?It.call(Ve,_t,et):It,et==null)break t;_t=_({},_t,et);break t;case 2:Da=!0}}et=b.callback,et!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[et]:lt.push(et))}else lt={lane:et,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ft===null?(tt=ft=lt,I=_t):ft=ft.next=lt,y|=et;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;lt=b,b=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);ft===null&&(I=_t),u.baseState=I,u.firstBaseUpdate=tt,u.lastBaseUpdate=ft,h===null&&(u.shared.lanes=0),Ba|=y,e.lanes=y,e.memoizedState=_t}}function mm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function gm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)mm(a[e],n)}var rr=P(null),Dl=P(0);function _m(e,n){e=ca,yt(Dl,e),yt(rr,n),ca=e|n.baseLanes}function nf(){yt(Dl,ca),yt(rr,rr.current)}function af(){ca=Dl.current,at(rr),at(Dl)}var ii=P(null),xi=null;function Na(e){var n=e.alternate;yt(ln,ln.current&1),yt(ii,e),xi===null&&(n===null||rr.current!==null||n.memoizedState!==null)&&(xi=e)}function sf(e){yt(ln,ln.current),yt(ii,e),xi===null&&(xi=e)}function vm(e){e.tag===22?(yt(ln,ln.current),yt(ii,e),xi===null&&(xi=e)):Oa()}function Oa(){yt(ln,ln.current),yt(ii,ii.current)}function ai(e){at(ii),xi===e&&(xi=null),at(ln)}var ln=P(0);function Ul(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||fh(a)||hh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ea=0,ce=null,He=null,fn=null,Ll=!1,or=!1,Ms=!1,Nl=0,yo=0,lr=null,xy=0;function sn(){throw Error(s(321))}function rf(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ei(e[a],n[a]))return!1;return!0}function of(e,n,a,o,u,h){return ea=h,ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=e===null||e.memoizedState===null?e0:Mf,Ms=!1,h=a(o,u),Ms=!1,or&&(h=ym(n,a,o,u)),xm(e),h}function xm(e){z.H=Eo;var n=He!==null&&He.next!==null;if(ea=0,fn=He=ce=null,Ll=!1,yo=0,lr=null,n)throw Error(s(300));e===null||hn||(e=e.dependencies,e!==null&&El(e)&&(hn=!0))}function ym(e,n,a,o){ce=e;var u=0;do{if(or&&(lr=null),yo=0,or=!1,25<=u)throw Error(s(301));if(u+=1,fn=He=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}z.H=n0,h=n(a,o)}while(or);return h}function yy(){var e=z.H,n=e.useState()[0];return n=typeof n.then=="function"?So(n):n,e=e.useState()[0],(He!==null?He.memoizedState:null)!==e&&(ce.flags|=1024),n}function lf(){var e=Nl!==0;return Nl=0,e}function cf(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function uf(e){if(Ll){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Ll=!1}ea=0,fn=He=ce=null,or=!1,yo=Nl=0,lr=null}function Gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?ce.memoizedState=fn=e:fn=fn.next=e,fn}function cn(){if(He===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=He.next;var n=fn===null?ce.memoizedState:fn.next;if(n!==null)fn=n,He=e;else{if(e===null)throw ce.alternate===null?Error(s(467)):Error(s(310));He=e,e={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},fn===null?ce.memoizedState=fn=e:fn=fn.next=e}return fn}function Ol(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function So(e){var n=yo;return yo+=1,lr===null&&(lr=[]),e=um(lr,e,n),n=ce,(fn===null?n.memoizedState:fn.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?e0:Mf),e}function Pl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return So(e);if(e.$$typeof===U)return Un(e)}throw Error(s(438,String(e)))}function ff(e){var n=null,a=ce.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ce.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Ol(),ce.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=w;return n.index++,a}function na(e,n){return typeof n=="function"?n(e):n}function zl(e){var n=cn();return hf(n,He,e)}function hf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var y=u.next;u.next=h.next,h.next=y}n.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{n=u.next;var b=y=null,I=null,tt=n,ft=!1;do{var _t=tt.lane&-536870913;if(_t!==tt.lane?(ye&_t)===_t:(ea&_t)===_t){var et=tt.revertLane;if(et===0)I!==null&&(I=I.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),_t===nr&&(ft=!0);else if((ea&et)===et){tt=tt.next,et===nr&&(ft=!0);continue}else _t={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},I===null?(b=I=_t,y=h):I=I.next=_t,ce.lanes|=et,Ba|=et;_t=tt.action,Ms&&a(h,_t),h=tt.hasEagerState?tt.eagerState:a(h,_t)}else et={lane:_t,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},I===null?(b=I=et,y=h):I=I.next=et,ce.lanes|=_t,Ba|=_t;tt=tt.next}while(tt!==null&&tt!==n);if(I===null?y=h:I.next=b,!ei(h,e.memoizedState)&&(hn=!0,ft&&(a=ir,a!==null)))throw a;e.memoizedState=h,e.baseState=y,e.baseQueue=I,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function df(e){var n=cn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do h=e(h,y.action),y=y.next;while(y!==u);ei(h,n.memoizedState)||(hn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function Sm(e,n,a){var o=ce,u=cn(),h=Ee;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!ei((He||u).memoizedState,a);if(y&&(u.memoizedState=a,hn=!0),u=u.queue,gf(Tm.bind(null,o,u,e),[e]),u.getSnapshot!==n||y||fn!==null&&fn.memoizedState.tag&1){if(o.flags|=2048,cr(9,{destroy:void 0},Em.bind(null,o,u,a,n),null),We===null)throw Error(s(349));h||(ea&127)!==0||Mm(o,n,a)}return a}function Mm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ce.updateQueue,n===null?(n=Ol(),ce.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Em(e,n,a,o){n.value=a,n.getSnapshot=o,bm(n)&&Am(e)}function Tm(e,n,a){return a(function(){bm(n)&&Am(e)})}function bm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ei(e,a)}catch{return!0}}function Am(e){var n=ds(e,2);n!==null&&Zn(n,e,2)}function pf(e){var n=Gn();if(typeof e=="function"){var a=e;if(e=a(),Ms){Ot(!0);try{a()}finally{Ot(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:e},n}function wm(e,n,a,o){return e.baseState=a,hf(e,He,typeof o=="function"?o:na)}function Sy(e,n,a,o,u){if(Fl(e))throw Error(s(485));if(e=n.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};z.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,Rm(n,h)):(h.next=a.next,n.pending=a.next=h)}}function Rm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var h=z.T,y={};z.T=y;try{var b=a(u,o),I=z.S;I!==null&&I(y,b),Cm(e,n,b)}catch(tt){mf(e,n,tt)}finally{h!==null&&y.types!==null&&(h.types=y.types),z.T=h}}else try{h=a(u,o),Cm(e,n,h)}catch(tt){mf(e,n,tt)}}function Cm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Dm(e,n,o)},function(o){return mf(e,n,o)}):Dm(e,n,a)}function Dm(e,n,a){n.status="fulfilled",n.value=a,Um(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Rm(e,a)))}function mf(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Um(n),n=n.next;while(n!==o)}e.action=null}function Um(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Lm(e,n){return n}function Nm(e,n){if(Ee){var a=We.formState;if(a!==null){t:{var o=ce;if(Ee){if(Ze){e:{for(var u=Ze,h=vi;u.nodeType!==8;){if(!h){u=null;break e}if(u=yi(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Ze=yi(u.nextSibling),o=u.data==="F!";break t}}Ra(o)}o=!1}o&&(n=a[0])}}return a=Gn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lm,lastRenderedState:n},a.queue=o,a=Jm.bind(null,ce,o),o.dispatch=a,o=pf(!1),h=Sf.bind(null,ce,!1,o.queue),o=Gn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=Sy.bind(null,ce,u,h,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function Om(e){var n=cn();return Pm(n,He,e)}function Pm(e,n,a){if(n=hf(e,n,Lm)[0],e=zl(na)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=So(n)}catch(y){throw y===ar?Al:y}else o=n;n=cn();var u=n.queue,h=u.dispatch;return a!==n.memoizedState&&(ce.flags|=2048,cr(9,{destroy:void 0},My.bind(null,u,a),null)),[o,h,e]}function My(e,n){e.action=n}function zm(e){var n=cn(),a=He;if(a!==null)return Pm(n,a,e);cn(),n=n.memoizedState,a=cn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function cr(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ce.updateQueue,n===null&&(n=Ol(),ce.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Bm(){return cn().memoizedState}function Bl(e,n,a,o){var u=Gn();ce.flags|=e,u.memoizedState=cr(1|n,{destroy:void 0},a,o===void 0?null:o)}function Il(e,n,a,o){var u=cn();o=o===void 0?null:o;var h=u.memoizedState.inst;He!==null&&o!==null&&rf(o,He.memoizedState.deps)?u.memoizedState=cr(n,h,a,o):(ce.flags|=e,u.memoizedState=cr(1|n,h,a,o))}function Im(e,n){Bl(8390656,8,e,n)}function gf(e,n){Il(2048,8,e,n)}function Ey(e){ce.flags|=4;var n=ce.updateQueue;if(n===null)n=Ol(),ce.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Fm(e){var n=cn().memoizedState;return Ey({ref:n,nextImpl:e}),function(){if((De&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Hm(e,n){return Il(4,2,e,n)}function Gm(e,n){return Il(4,4,e,n)}function Vm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function km(e,n,a){a=a!=null?a.concat([e]):null,Il(4,4,Vm.bind(null,n,e),a)}function _f(){}function Xm(e,n){var a=cn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&rf(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Wm(e,n){var a=cn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&rf(n,o[1]))return o[0];if(o=e(),Ms){Ot(!0);try{e()}finally{Ot(!1)}}return a.memoizedState=[o,n],o}function vf(e,n,a){return a===void 0||(ea&1073741824)!==0&&(ye&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=q0(),ce.lanes|=e,Ba|=e,a)}function qm(e,n,a,o){return ei(a,n)?a:rr.current!==null?(e=vf(e,a,o),ei(e,n)||(hn=!0),e):(ea&42)===0||(ea&1073741824)!==0&&(ye&261930)===0?(hn=!0,e.memoizedState=a):(e=q0(),ce.lanes|=e,Ba|=e,n)}function jm(e,n,a,o,u){var h=Q.p;Q.p=h!==0&&8>h?h:8;var y=z.T,b={};z.T=b,Sf(e,!1,n,a);try{var I=u(),tt=z.S;if(tt!==null&&tt(b,I),I!==null&&typeof I=="object"&&typeof I.then=="function"){var ft=vy(I,o);Mo(e,n,ft,oi(e))}else Mo(e,n,o,oi(e))}catch(_t){Mo(e,n,{then:function(){},status:"rejected",reason:_t},oi())}finally{Q.p=h,y!==null&&b.types!==null&&(y.types=b.types),z.T=y}}function Ty(){}function xf(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=Ym(e).queue;jm(e,u,n,K,a===null?Ty:function(){return Zm(e),a(o)})}function Ym(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Zm(e){var n=Ym(e);n.next===null&&(n=e.alternate.memoizedState),Mo(e,n.next.queue,{},oi())}function yf(){return Un(Fo)}function Km(){return cn().memoizedState}function Qm(){return cn().memoizedState}function by(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=oi();e=Ua(a);var o=La(n,e,a);o!==null&&(Zn(o,n,a),_o(o,n,a)),n={cache:Yu()},e.payload=n;return}n=n.return}}function Ay(e,n,a){var o=oi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Fl(e)?$m(n,a):(a=Bu(e,n,a,o),a!==null&&(Zn(a,e,o),t0(a,n,o)))}function Jm(e,n,a){var o=oi();Mo(e,n,a,o)}function Mo(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Fl(e))$m(n,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var y=n.lastRenderedState,b=h(y,a);if(u.hasEagerState=!0,u.eagerState=b,ei(b,y))return xl(e,n,u,0),We===null&&vl(),!1}catch{}finally{}if(a=Bu(e,n,u,o),a!==null)return Zn(a,e,o),t0(a,n,o),!0}return!1}function Sf(e,n,a,o){if(o={lane:2,revertLane:$f(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Fl(e)){if(n)throw Error(s(479))}else n=Bu(e,a,o,2),n!==null&&Zn(n,e,2)}function Fl(e){var n=e.alternate;return e===ce||n!==null&&n===ce}function $m(e,n){or=Ll=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function t0(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Jr(e,a)}}var Eo={readContext:Un,use:Pl,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useLayoutEffect:sn,useInsertionEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useSyncExternalStore:sn,useId:sn,useHostTransitionStatus:sn,useFormState:sn,useActionState:sn,useOptimistic:sn,useMemoCache:sn,useCacheRefresh:sn};Eo.useEffectEvent=sn;var e0={readContext:Un,use:Pl,useCallback:function(e,n){return Gn().memoizedState=[e,n===void 0?null:n],e},useContext:Un,useEffect:Im,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Bl(4194308,4,Vm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Bl(4194308,4,e,n)},useInsertionEffect:function(e,n){Bl(4,2,e,n)},useMemo:function(e,n){var a=Gn();n=n===void 0?null:n;var o=e();if(Ms){Ot(!0);try{e()}finally{Ot(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Gn();if(a!==void 0){var u=a(n);if(Ms){Ot(!0);try{a(n)}finally{Ot(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Ay.bind(null,ce,e),[o.memoizedState,e]},useRef:function(e){var n=Gn();return e={current:e},n.memoizedState=e},useState:function(e){e=pf(e);var n=e.queue,a=Jm.bind(null,ce,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:_f,useDeferredValue:function(e,n){var a=Gn();return vf(a,e,n)},useTransition:function(){var e=pf(!1);return e=jm.bind(null,ce,e.queue,!0,!1),Gn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ce,u=Gn();if(Ee){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),We===null)throw Error(s(349));(ye&127)!==0||Mm(o,n,a)}u.memoizedState=a;var h={value:a,getSnapshot:n};return u.queue=h,Im(Tm.bind(null,o,h,e),[e]),o.flags|=2048,cr(9,{destroy:void 0},Em.bind(null,o,h,a,n),null),a},useId:function(){var e=Gn(),n=We.identifierPrefix;if(Ee){var a=Fi,o=Ii;a=(o&~(1<<32-te(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Nl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=xy++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:yf,useFormState:Nm,useActionState:Nm,useOptimistic:function(e){var n=Gn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Sf.bind(null,ce,!0,a),a.dispatch=n,[e,n]},useMemoCache:ff,useCacheRefresh:function(){return Gn().memoizedState=by.bind(null,ce)},useEffectEvent:function(e){var n=Gn(),a={impl:e};return n.memoizedState=a,function(){if((De&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Mf={readContext:Un,use:Pl,useCallback:Xm,useContext:Un,useEffect:gf,useImperativeHandle:km,useInsertionEffect:Hm,useLayoutEffect:Gm,useMemo:Wm,useReducer:zl,useRef:Bm,useState:function(){return zl(na)},useDebugValue:_f,useDeferredValue:function(e,n){var a=cn();return qm(a,He.memoizedState,e,n)},useTransition:function(){var e=zl(na)[0],n=cn().memoizedState;return[typeof e=="boolean"?e:So(e),n]},useSyncExternalStore:Sm,useId:Km,useHostTransitionStatus:yf,useFormState:Om,useActionState:Om,useOptimistic:function(e,n){var a=cn();return wm(a,He,e,n)},useMemoCache:ff,useCacheRefresh:Qm};Mf.useEffectEvent=Fm;var n0={readContext:Un,use:Pl,useCallback:Xm,useContext:Un,useEffect:gf,useImperativeHandle:km,useInsertionEffect:Hm,useLayoutEffect:Gm,useMemo:Wm,useReducer:df,useRef:Bm,useState:function(){return df(na)},useDebugValue:_f,useDeferredValue:function(e,n){var a=cn();return He===null?vf(a,e,n):qm(a,He.memoizedState,e,n)},useTransition:function(){var e=df(na)[0],n=cn().memoizedState;return[typeof e=="boolean"?e:So(e),n]},useSyncExternalStore:Sm,useId:Km,useHostTransitionStatus:yf,useFormState:zm,useActionState:zm,useOptimistic:function(e,n){var a=cn();return He!==null?wm(a,He,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:ff,useCacheRefresh:Qm};n0.useEffectEvent=Fm;function Ef(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Tf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=oi(),u=Ua(o);u.payload=n,a!=null&&(u.callback=a),n=La(e,u,o),n!==null&&(Zn(n,e,o),_o(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=oi(),u=Ua(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=La(e,u,o),n!==null&&(Zn(n,e,o),_o(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=oi(),o=Ua(a);o.tag=2,n!=null&&(o.callback=n),n=La(e,o,a),n!==null&&(Zn(n,e,a),_o(n,e,a))}};function i0(e,n,a,o,u,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,y):n.prototype&&n.prototype.isPureReactComponent?!lo(a,o)||!lo(u,h):!0}function a0(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&Tf.enqueueReplaceState(n,n.state,null)}function Es(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function s0(e){_l(e)}function r0(e){console.error(e)}function o0(e){_l(e)}function Hl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function l0(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function bf(e,n,a){return a=Ua(a),a.tag=3,a.payload={element:null},a.callback=function(){Hl(e,n)},a}function c0(e){return e=Ua(e),e.tag=3,e}function u0(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){l0(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){l0(n,a,o),typeof u!="function"&&(Ia===null?Ia=new Set([this]):Ia.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function wy(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&er(n,a,u,!0),a=ii.current,a!==null){switch(a.tag){case 31:case 13:return xi===null?Jl():a.alternate===null&&rn===0&&(rn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===wl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Kf(e,o,u)),!1;case 22:return a.flags|=65536,o===wl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Kf(e,o,u)),!1}throw Error(s(435,a.tag))}return Kf(e,o,u),Jl(),!1}if(Ee)return n=ii.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==ku&&(e=Error(s(422),{cause:o}),fo(mi(e,a)))):(o!==ku&&(n=Error(s(423),{cause:o}),fo(mi(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=mi(o,a),u=bf(e.stateNode,o,u),tf(e,u),rn!==4&&(rn=2)),!1;var h=Error(s(520),{cause:o});if(h=mi(h,a),Uo===null?Uo=[h]:Uo.push(h),rn!==4&&(rn=2),n===null)return!0;o=mi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=bf(a.stateNode,o,e),tf(a,e),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Ia===null||!Ia.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=c0(u),u0(u,e,a,o),tf(a,u),!1}a=a.return}while(a!==null);return!1}var Af=Error(s(461)),hn=!1;function Ln(e,n,a,o){n.child=e===null?pm(n,null,a,o):Ss(n,e.child,a,o)}function f0(e,n,a,o,u){a=a.render;var h=n.ref;if("ref"in o){var y={};for(var b in o)b!=="ref"&&(y[b]=o[b])}else y=o;return _s(n),o=of(e,n,a,y,h,u),b=lf(),e!==null&&!hn?(cf(e,n,u),ia(e,n,u)):(Ee&&b&&Gu(n),n.flags|=1,Ln(e,n,o,u),n.child)}function h0(e,n,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!Iu(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,d0(e,n,h,o,u)):(e=Sl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!Of(e,u)){var y=h.memoizedProps;if(a=a.compare,a=a!==null?a:lo,a(y,o)&&e.ref===n.ref)return ia(e,n,u)}return n.flags|=1,e=Qi(h,o),e.ref=n.ref,e.return=n,n.child=e}function d0(e,n,a,o,u){if(e!==null){var h=e.memoizedProps;if(lo(h,o)&&e.ref===n.ref)if(hn=!1,n.pendingProps=o=h,Of(e,u))(e.flags&131072)!==0&&(hn=!0);else return n.lanes=e.lanes,ia(e,n,u)}return wf(e,n,a,o,u)}function p0(e,n,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return m0(e,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&bl(n,h!==null?h.cachePool:null),h!==null?_m(n,h):nf(),vm(n);else return o=n.lanes=536870912,m0(e,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(bl(n,h.cachePool),_m(n,h),Oa(),n.memoizedState=null):(e!==null&&bl(n,null),nf(),Oa());return Ln(e,n,u,a),n.child}function To(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function m0(e,n,a,o,u){var h=Ku();return h=h===null?null:{parent:un._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},e!==null&&bl(n,null),nf(),vm(n),e!==null&&er(e,n,o,!0),n.childLanes=u,null}function Gl(e,n){return n=kl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function g0(e,n,a){return Ss(n,e.child,null,a),e=Gl(n,n.pendingProps),e.flags|=2,ai(n),n.memoizedState=null,e}function Ry(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ee){if(o.mode==="hidden")return e=Gl(n,o),n.lanes=536870912,To(null,e);if(sf(n),(e=Ze)?(e=Rg(e,vi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Ii,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=$p(e),a.return=n,n.child=a,Dn=n,Ze=null)):e=null,e===null)throw Ra(n);return n.lanes=536870912,null}return Gl(n,o)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(sf(n),u)if(n.flags&256)n.flags&=-257,n=g0(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(hn||er(e,n,a,!1),u=(a&e.childLanes)!==0,hn||u){if(o=We,o!==null&&(y=Bi(o,a),y!==0&&y!==h.retryLane))throw h.retryLane=y,ds(e,y),Zn(o,e,y),Af;Jl(),n=g0(e,n,a)}else e=h.treeContext,Ze=yi(y.nextSibling),Dn=n,Ee=!0,wa=null,vi=!1,e!==null&&nm(n,e),n=Gl(n,o),n.flags|=4096;return n}return e=Qi(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Vl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function wf(e,n,a,o,u){return _s(n),a=of(e,n,a,o,void 0,u),o=lf(),e!==null&&!hn?(cf(e,n,u),ia(e,n,u)):(Ee&&o&&Gu(n),n.flags|=1,Ln(e,n,a,u),n.child)}function _0(e,n,a,o,u,h){return _s(n),n.updateQueue=null,a=ym(n,o,a,u),xm(e),o=lf(),e!==null&&!hn?(cf(e,n,h),ia(e,n,h)):(Ee&&o&&Gu(n),n.flags|=1,Ln(e,n,a,h),n.child)}function v0(e,n,a,o,u){if(_s(n),n.stateNode===null){var h=Qs,y=a.contextType;typeof y=="object"&&y!==null&&(h=Un(y)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Tf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},Ju(n),y=a.contextType,h.context=typeof y=="object"&&y!==null?Un(y):Qs,h.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(Ef(n,a,y,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Tf.enqueueReplaceState(h,h.state,null),xo(n,o,h,u),vo(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var b=n.memoizedProps,I=Es(a,b);h.props=I;var tt=h.context,ft=a.contextType;y=Qs,typeof ft=="object"&&ft!==null&&(y=Un(ft));var _t=a.getDerivedStateFromProps;ft=typeof _t=="function"||typeof h.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,ft||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(b||tt!==y)&&a0(n,h,o,y),Da=!1;var et=n.memoizedState;h.state=et,xo(n,o,h,u),vo(),tt=n.memoizedState,b||et!==tt||Da?(typeof _t=="function"&&(Ef(n,a,_t,o),tt=n.memoizedState),(I=Da||i0(n,a,I,o,et,tt,y))?(ft||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=tt),h.props=o,h.state=tt,h.context=y,o=I):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,$u(e,n),y=n.memoizedProps,ft=Es(a,y),h.props=ft,_t=n.pendingProps,et=h.context,tt=a.contextType,I=Qs,typeof tt=="object"&&tt!==null&&(I=Un(tt)),b=a.getDerivedStateFromProps,(tt=typeof b=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==_t||et!==I)&&a0(n,h,o,I),Da=!1,et=n.memoizedState,h.state=et,xo(n,o,h,u),vo();var lt=n.memoizedState;y!==_t||et!==lt||Da||e!==null&&e.dependencies!==null&&El(e.dependencies)?(typeof b=="function"&&(Ef(n,a,b,o),lt=n.memoizedState),(ft=Da||i0(n,a,ft,o,et,lt,I)||e!==null&&e.dependencies!==null&&El(e.dependencies))?(tt||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,lt,I),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,lt,I)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&et===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&et===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=lt),h.props=o,h.state=lt,h.context=I,o=ft):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&et===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&et===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,Vl(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=Ss(n,e.child,null,u),n.child=Ss(n,null,a,u)):Ln(e,n,a,u),n.memoizedState=h.state,e=n.child):e=ia(e,n,u),e}function x0(e,n,a,o){return ms(),n.flags|=256,Ln(e,n,a,o),n.child}var Rf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cf(e){return{baseLanes:e,cachePool:lm()}}function Df(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ri),e}function y0(e,n,a){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:(ln.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ee){if(u?Na(n):Oa(),(e=Ze)?(e=Rg(e,vi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Ii,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=$p(e),a.return=n,n.child=a,Dn=n,Ze=null)):e=null,e===null)throw Ra(n);return hh(e)?n.lanes=32:n.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Oa(),u=n.mode,b=kl({mode:"hidden",children:b},u),o=ps(o,u,a,null),b.return=n,o.return=n,b.sibling=o,n.child=b,o=n.child,o.memoizedState=Cf(a),o.childLanes=Df(e,y,a),n.memoizedState=Rf,To(null,o)):(Na(n),Uf(n,b))}var I=e.memoizedState;if(I!==null&&(b=I.dehydrated,b!==null)){if(h)n.flags&256?(Na(n),n.flags&=-257,n=Lf(e,n,a)):n.memoizedState!==null?(Oa(),n.child=e.child,n.flags|=128,n=null):(Oa(),b=o.fallback,u=n.mode,o=kl({mode:"visible",children:o.children},u),b=ps(b,u,a,null),b.flags|=2,o.return=n,b.return=n,o.sibling=b,n.child=o,Ss(n,e.child,null,a),o=n.child,o.memoizedState=Cf(a),o.childLanes=Df(e,y,a),n.memoizedState=Rf,n=To(null,o));else if(Na(n),hh(b)){if(y=b.nextSibling&&b.nextSibling.dataset,y)var tt=y.dgst;y=tt,o=Error(s(419)),o.stack="",o.digest=y,fo({value:o,source:null,stack:null}),n=Lf(e,n,a)}else if(hn||er(e,n,a,!1),y=(a&e.childLanes)!==0,hn||y){if(y=We,y!==null&&(o=Bi(y,a),o!==0&&o!==I.retryLane))throw I.retryLane=o,ds(e,o),Zn(y,e,o),Af;fh(b)||Jl(),n=Lf(e,n,a)}else fh(b)?(n.flags|=192,n.child=e.child,n=null):(e=I.treeContext,Ze=yi(b.nextSibling),Dn=n,Ee=!0,wa=null,vi=!1,e!==null&&nm(n,e),n=Uf(n,o.children),n.flags|=4096);return n}return u?(Oa(),b=o.fallback,u=n.mode,I=e.child,tt=I.sibling,o=Qi(I,{mode:"hidden",children:o.children}),o.subtreeFlags=I.subtreeFlags&65011712,tt!==null?b=Qi(tt,b):(b=ps(b,u,a,null),b.flags|=2),b.return=n,o.return=n,o.sibling=b,n.child=o,To(null,o),o=n.child,b=e.child.memoizedState,b===null?b=Cf(a):(u=b.cachePool,u!==null?(I=un._currentValue,u=u.parent!==I?{parent:I,pool:I}:u):u=lm(),b={baseLanes:b.baseLanes|a,cachePool:u}),o.memoizedState=b,o.childLanes=Df(e,y,a),n.memoizedState=Rf,To(e.child,o)):(Na(n),a=e.child,e=a.sibling,a=Qi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(y=n.deletions,y===null?(n.deletions=[e],n.flags|=16):y.push(e)),n.child=a,n.memoizedState=null,a)}function Uf(e,n){return n=kl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function kl(e,n){return e=ni(22,e,null,n),e.lanes=0,e}function Lf(e,n,a){return Ss(n,e.child,null,a),e=Uf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function S0(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),qu(e.return,n,a)}function Nf(e,n,a,o,u,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=h)}function M0(e,n,a){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var y=ln.current,b=(y&2)!==0;if(b?(y=y&1|2,n.flags|=128):y&=1,yt(ln,y),Ln(e,n,o,a),o=Ee?uo:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&S0(e,a,n);else if(e.tag===19)S0(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Ul(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Nf(n,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Ul(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Nf(n,!0,a,null,h,o);break;case"together":Nf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ia(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Ba|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(er(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Qi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Qi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Of(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&El(e)))}function Cy(e,n,a){switch(n.tag){case 3:Ht(n,n.stateNode.containerInfo),Ca(n,un,e.memoizedState.cache),ms();break;case 27:case 5:re(n);break;case 4:Ht(n,n.stateNode.containerInfo);break;case 10:Ca(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,sf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Na(n),n.flags|=128,null):(a&n.child.childLanes)!==0?y0(e,n,a):(Na(n),e=ia(e,n,a),e!==null?e.sibling:null);Na(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(er(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return M0(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),yt(ln,ln.current),o)break;return null;case 22:return n.lanes=0,p0(e,n,a,n.pendingProps);case 24:Ca(n,un,e.memoizedState.cache)}return ia(e,n,a)}function E0(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)hn=!0;else{if(!Of(e,a)&&(n.flags&128)===0)return hn=!1,Cy(e,n,a);hn=(e.flags&131072)!==0}else hn=!1,Ee&&(n.flags&1048576)!==0&&em(n,uo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=xs(n.elementType),n.type=e,typeof e=="function")Iu(e)?(o=Es(e,o),n.tag=1,n=v0(null,n,e,o,a)):(n.tag=0,n=wf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===R){n.tag=11,n=f0(null,n,e,o,a);break t}else if(u===O){n.tag=14,n=h0(null,n,e,o,a);break t}}throw n=ht(e)||e,Error(s(306,n,""))}}return n;case 0:return wf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Es(o,n.pendingProps),v0(e,n,o,u,a);case 3:t:{if(Ht(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,$u(e,n),xo(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Ca(n,un,o),o!==h.cache&&ju(n,[un],a,!0),vo(),o=y.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=x0(e,n,o,a);break t}else if(o!==u){u=mi(Error(s(424)),n),fo(u),n=x0(e,n,o,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ze=yi(e.firstChild),Dn=n,Ee=!0,wa=null,vi=!0,a=pm(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(ms(),o===u){n=ia(e,n,a);break t}Ln(e,n,o,a)}n=n.child}return n;case 26:return Vl(e,n),e===null?(a=Og(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ee||(a=n.type,e=n.pendingProps,o=sc(Et.current).createElement(a),o[an]=n,o[Rn]=e,Nn(o,a,e),Dt(o),n.stateNode=o):n.memoizedState=Og(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return re(n),e===null&&Ee&&(o=n.stateNode=Ug(n.type,n.pendingProps,Et.current),Dn=n,vi=!0,u=Ze,Va(n.type)?(dh=u,Ze=yi(o.firstChild)):Ze=u),Ln(e,n,n.pendingProps.children,a),Vl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ee&&((u=o=Ze)&&(o=sS(o,n.type,n.pendingProps,vi),o!==null?(n.stateNode=o,Dn=n,Ze=yi(o.firstChild),vi=!1,u=!0):u=!1),u||Ra(n)),re(n),u=n.type,h=n.pendingProps,y=e!==null?e.memoizedProps:null,o=h.children,lh(u,h)?o=null:y!==null&&lh(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=of(e,n,yy,null,null,a),Fo._currentValue=u),Vl(e,n),Ln(e,n,o,a),n.child;case 6:return e===null&&Ee&&((e=a=Ze)&&(a=rS(a,n.pendingProps,vi),a!==null?(n.stateNode=a,Dn=n,Ze=null,e=!0):e=!1),e||Ra(n)),null;case 13:return y0(e,n,a);case 4:return Ht(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=Ss(n,null,o,a):Ln(e,n,o,a),n.child;case 11:return f0(e,n,n.type,n.pendingProps,a);case 7:return Ln(e,n,n.pendingProps,a),n.child;case 8:return Ln(e,n,n.pendingProps.children,a),n.child;case 12:return Ln(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ca(n,n.type,o.value),Ln(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,_s(n),u=Un(u),o=o(u),n.flags|=1,Ln(e,n,o,a),n.child;case 14:return h0(e,n,n.type,n.pendingProps,a);case 15:return d0(e,n,n.type,n.pendingProps,a);case 19:return M0(e,n,a);case 31:return Ry(e,n,a);case 22:return p0(e,n,a,n.pendingProps);case 24:return _s(n),o=Un(un),e===null?(u=Ku(),u===null&&(u=We,h=Yu(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),n.memoizedState={parent:o,cache:u},Ju(n),Ca(n,un,u)):((e.lanes&a)!==0&&($u(e,n),xo(n,null,null,a),vo()),u=e.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ca(n,un,o)):(o=h.cache,Ca(n,un,o),o!==u.cache&&ju(n,[un],a,!0))),Ln(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function aa(e){e.flags|=4}function Pf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(K0())e.flags|=8192;else throw ys=wl,Qu}else e.flags&=-16777217}function T0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Fg(n))if(K0())e.flags|=8192;else throw ys=wl,Qu}function Xl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?mn():536870912,e.lanes|=n,dr|=n)}function bo(e,n){if(!Ee)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ke(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function Dy(e,n,a){var o=n.pendingProps;switch(Vu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(n),null;case 1:return Ke(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ta(un),Ft(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(tr(n)?aa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Xu())),Ke(n),null;case 26:var u=n.type,h=n.memoizedState;return e===null?(aa(n),h!==null?(Ke(n),T0(n,h)):(Ke(n),Pf(n,u,null,o,a))):h?h!==e.memoizedState?(aa(n),Ke(n),T0(n,h)):(Ke(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&aa(n),Ke(n),Pf(n,u,e,o,a)),null;case 27:if(Be(n),a=Et.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ke(n),null}e=Z.current,tr(n)?im(n):(e=Ug(u,o,a),n.stateNode=e,aa(n))}return Ke(n),null;case 5:if(Be(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ke(n),null}if(h=Z.current,tr(n))im(n);else{var y=sc(Et.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}h[an]=n,h[Rn]=o;t:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break t;for(;y.sibling===null;){if(y.return===null||y.return===n)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=h;t:switch(Nn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&aa(n)}}return Ke(n),Pf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=Et.current,tr(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Dn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[an]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||yg(e.nodeValue,a)),e||Ra(n,!0)}else e=sc(e).createTextNode(o),e[an]=n,n.stateNode=e}return Ke(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=tr(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[an]=n}else ms(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),e=!1}else a=Xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ai(n),n):(ai(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Ke(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=tr(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[an]=n}else ms(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),u=!1}else u=Xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ai(n),n):(ai(n),null)}return ai(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Xl(n,n.updateQueue),Ke(n),null);case 4:return Ft(),e===null&&ih(n.stateNode.containerInfo),Ke(n),null;case 10:return ta(n.type),Ke(n),null;case 19:if(at(ln),o=n.memoizedState,o===null)return Ke(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)bo(o,!1);else{if(rn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=Ul(e),h!==null){for(n.flags|=128,bo(o,!1),e=h.updateQueue,n.updateQueue=e,Xl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Jp(a,e),a=a.sibling;return yt(ln,ln.current&1|2),Ee&&Ji(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&dt()>Zl&&(n.flags|=128,u=!0,bo(o,!1),n.lanes=4194304)}else{if(!u)if(e=Ul(h),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Xl(n,e),bo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Ee)return Ke(n),null}else 2*dt()-o.renderingStartTime>Zl&&a!==536870912&&(n.flags|=128,u=!0,bo(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=dt(),e.sibling=null,a=ln.current,yt(ln,u?a&1|2:a&1),Ee&&Ji(n,o.treeForkCount),e):(Ke(n),null);case 22:case 23:return ai(n),af(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Ke(n),n.subtreeFlags&6&&(n.flags|=8192)):Ke(n),a=n.updateQueue,a!==null&&Xl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&at(vs),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ta(un),Ke(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Uy(e,n){switch(Vu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ta(un),Ft(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Be(n),null;case 31:if(n.memoizedState!==null){if(ai(n),n.alternate===null)throw Error(s(340));ms()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ai(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));ms()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return at(ln),null;case 4:return Ft(),null;case 10:return ta(n.type),null;case 22:case 23:return ai(n),af(),e!==null&&at(vs),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ta(un),null;case 25:return null;default:return null}}function b0(e,n){switch(Vu(n),n.tag){case 3:ta(un),Ft();break;case 26:case 27:case 5:Be(n);break;case 4:Ft();break;case 31:n.memoizedState!==null&&ai(n);break;case 13:ai(n);break;case 19:at(ln);break;case 10:ta(n.type);break;case 22:case 23:ai(n),af(),e!==null&&at(vs);break;case 24:ta(un)}}function Ao(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,y=a.inst;o=h(),y.destroy=o}a=a.next}while(a!==u)}}catch(b){ze(n,n.return,b)}}function Pa(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var y=o.inst,b=y.destroy;if(b!==void 0){y.destroy=void 0,u=n;var I=a,tt=b;try{tt()}catch(ft){ze(u,I,ft)}}}o=o.next}while(o!==h)}}catch(ft){ze(n,n.return,ft)}}function A0(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{gm(n,a)}catch(o){ze(e,e.return,o)}}}function w0(e,n,a){a.props=Es(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){ze(e,n,o)}}function wo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){ze(e,n,u)}}function Hi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){ze(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){ze(e,n,u)}else a.current=null}function R0(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){ze(e,e.return,u)}}function zf(e,n,a){try{var o=e.stateNode;$y(o,e.type,a,n),o[Rn]=n}catch(u){ze(e,e.return,u)}}function C0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Va(e.type)||e.tag===4}function Bf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||C0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Va(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function If(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Zi));else if(o!==4&&(o===27&&Va(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(If(e,n,a),e=e.sibling;e!==null;)If(e,n,a),e=e.sibling}function Wl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Va(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Wl(e,n,a),e=e.sibling;e!==null;)Wl(e,n,a),e=e.sibling}function D0(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Nn(n,o,a),n[an]=e,n[Rn]=a}catch(h){ze(e,e.return,h)}}var sa=!1,dn=!1,Ff=!1,U0=typeof WeakSet=="function"?WeakSet:Set,Mn=null;function Ly(e,n){if(e=e.containerInfo,rh=hc,e=kp(e),Uu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var y=0,b=-1,I=-1,tt=0,ft=0,_t=e,et=null;e:for(;;){for(var lt;_t!==a||u!==0&&_t.nodeType!==3||(b=y+u),_t!==h||o!==0&&_t.nodeType!==3||(I=y+o),_t.nodeType===3&&(y+=_t.nodeValue.length),(lt=_t.firstChild)!==null;)et=_t,_t=lt;for(;;){if(_t===e)break e;if(et===a&&++tt===u&&(b=y),et===h&&++ft===o&&(I=y),(lt=_t.nextSibling)!==null)break;_t=et,et=_t.parentNode}_t=lt}a=b===-1||I===-1?null:{start:b,end:I}}else a=null}a=a||{start:0,end:0}}else a=null;for(oh={focusedElem:e,selectionRange:a},hc=!1,Mn=n;Mn!==null;)if(n=Mn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Mn=e;else for(;Mn!==null;){switch(n=Mn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=n,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var It=Es(a.type,u);e=o.getSnapshotBeforeUpdate(It,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){ze(a,a.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)uh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":uh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,Mn=e;break}Mn=n.return}}function L0(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:oa(e,a),o&4&&Ao(5,a);break;case 1:if(oa(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(y){ze(a,a.return,y)}else{var u=Es(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(y){ze(a,a.return,y)}}o&64&&A0(a),o&512&&wo(a,a.return);break;case 3:if(oa(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{gm(e,n)}catch(y){ze(a,a.return,y)}}break;case 27:n===null&&o&4&&D0(a);case 26:case 5:oa(e,a),n===null&&o&4&&R0(a),o&512&&wo(a,a.return);break;case 12:oa(e,a);break;case 31:oa(e,a),o&4&&P0(e,a);break;case 13:oa(e,a),o&4&&z0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Gy.bind(null,a),oS(e,a))));break;case 22:if(o=a.memoizedState!==null||sa,!o){n=n!==null&&n.memoizedState!==null||dn,u=sa;var h=dn;sa=o,(dn=n)&&!h?la(e,a,(a.subtreeFlags&8772)!==0):oa(e,a),sa=u,dn=h}break;case 30:break;default:oa(e,a)}}function N0(e){var n=e.alternate;n!==null&&(e.alternate=null,N0(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&ot(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var en=null,Wn=!1;function ra(e,n,a){for(a=a.child;a!==null;)O0(e,n,a),a=a.sibling}function O0(e,n,a){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(Kt,a)}catch{}switch(a.tag){case 26:dn||Hi(a,n),ra(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:dn||Hi(a,n);var o=en,u=Wn;Va(a.type)&&(en=a.stateNode,Wn=!1),ra(e,n,a),zo(a.stateNode),en=o,Wn=u;break;case 5:dn||Hi(a,n);case 6:if(o=en,u=Wn,en=null,ra(e,n,a),en=o,Wn=u,en!==null)if(Wn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(a.stateNode)}catch(h){ze(a,n,h)}else try{en.removeChild(a.stateNode)}catch(h){ze(a,n,h)}break;case 18:en!==null&&(Wn?(e=en,Ag(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Sr(e)):Ag(en,a.stateNode));break;case 4:o=en,u=Wn,en=a.stateNode.containerInfo,Wn=!0,ra(e,n,a),en=o,Wn=u;break;case 0:case 11:case 14:case 15:Pa(2,a,n),dn||Pa(4,a,n),ra(e,n,a);break;case 1:dn||(Hi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&w0(a,n,o)),ra(e,n,a);break;case 21:ra(e,n,a);break;case 22:dn=(o=dn)||a.memoizedState!==null,ra(e,n,a),dn=o;break;default:ra(e,n,a)}}function P0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Sr(e)}catch(a){ze(n,n.return,a)}}}function z0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Sr(e)}catch(a){ze(n,n.return,a)}}function Ny(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new U0),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new U0),n;default:throw Error(s(435,e.tag))}}function ql(e,n){var a=Ny(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=Vy.bind(null,e,o);o.then(u,u)}})}function qn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,y=n,b=y;t:for(;b!==null;){switch(b.tag){case 27:if(Va(b.type)){en=b.stateNode,Wn=!1;break t}break;case 5:en=b.stateNode,Wn=!1;break t;case 3:case 4:en=b.stateNode.containerInfo,Wn=!0;break t}b=b.return}if(en===null)throw Error(s(160));O0(h,y,u),en=null,Wn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)B0(n,e),n=n.sibling}var Di=null;function B0(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:qn(n,e),jn(e),o&4&&(Pa(3,e,e.return),Ao(3,e),Pa(5,e,e.return));break;case 1:qn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),o&64&&sa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Di;if(qn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[X]||h[an]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Nn(h,o,a),h[an]=e,Dt(h),o=h;break t;case"link":var y=Bg("link","href",u).get(o+(a.href||""));if(y){for(var b=0;b<y.length;b++)if(h=y[b],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(b,1);break e}}h=u.createElement(o),Nn(h,o,a),u.head.appendChild(h);break;case"meta":if(y=Bg("meta","content",u).get(o+(a.content||""))){for(b=0;b<y.length;b++)if(h=y[b],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(b,1);break e}}h=u.createElement(o),Nn(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[an]=e,Dt(h),o=h}e.stateNode=o}else Ig(u,e.type,e.stateNode);else e.stateNode=zg(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?Ig(u,e.type,e.stateNode):zg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&zf(e,e.memoizedProps,a.memoizedProps)}break;case 27:qn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),a!==null&&o&4&&zf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(qn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),e.flags&32){u=e.stateNode;try{Xs(u,"")}catch(It){ze(e,e.return,It)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,zf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Ff=!0);break;case 6:if(qn(n,e),jn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(It){ze(e,e.return,It)}}break;case 3:if(lc=null,u=Di,Di=rc(n.containerInfo),qn(n,e),Di=u,jn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Sr(n.containerInfo)}catch(It){ze(e,e.return,It)}Ff&&(Ff=!1,I0(e));break;case 4:o=Di,Di=rc(e.stateNode.containerInfo),qn(n,e),jn(e),Di=o;break;case 12:qn(n,e),jn(e);break;case 31:qn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 13:qn(n,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Yl=dt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 22:u=e.memoizedState!==null;var I=a!==null&&a.memoizedState!==null,tt=sa,ft=dn;if(sa=tt||u,dn=ft||I,qn(n,e),dn=ft,sa=tt,jn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||I||sa||dn||Ts(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){I=a=n;try{if(h=I.stateNode,u)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{b=I.stateNode;var _t=I.memoizedProps.style,et=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;b.style.display=et==null||typeof et=="boolean"?"":(""+et).trim()}}catch(It){ze(I,I.return,It)}}}else if(n.tag===6){if(a===null){I=n;try{I.stateNode.nodeValue=u?"":I.memoizedProps}catch(It){ze(I,I.return,It)}}}else if(n.tag===18){if(a===null){I=n;try{var lt=I.stateNode;u?wg(lt,!0):wg(I.stateNode,!1)}catch(It){ze(I,I.return,It)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,ql(e,a))));break;case 19:qn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 30:break;case 21:break;default:qn(n,e),jn(e)}}function jn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(C0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=Bf(e);Wl(e,h,u);break;case 5:var y=a.stateNode;a.flags&32&&(Xs(y,""),a.flags&=-33);var b=Bf(e);Wl(e,b,y);break;case 3:case 4:var I=a.stateNode.containerInfo,tt=Bf(e);If(e,tt,I);break;default:throw Error(s(161))}}catch(ft){ze(e,e.return,ft)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function I0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;I0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function oa(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)L0(e,n.alternate,n),n=n.sibling}function Ts(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Pa(4,n,n.return),Ts(n);break;case 1:Hi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&w0(n,n.return,a),Ts(n);break;case 27:zo(n.stateNode);case 26:case 5:Hi(n,n.return),Ts(n);break;case 22:n.memoizedState===null&&Ts(n);break;case 30:Ts(n);break;default:Ts(n)}e=e.sibling}}function la(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,h=n,y=h.flags;switch(h.tag){case 0:case 11:case 15:la(u,h,a),Ao(4,h);break;case 1:if(la(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(tt){ze(o,o.return,tt)}if(o=h,u=o.updateQueue,u!==null){var b=o.stateNode;try{var I=u.shared.hiddenCallbacks;if(I!==null)for(u.shared.hiddenCallbacks=null,u=0;u<I.length;u++)mm(I[u],b)}catch(tt){ze(o,o.return,tt)}}a&&y&64&&A0(h),wo(h,h.return);break;case 27:D0(h);case 26:case 5:la(u,h,a),a&&o===null&&y&4&&R0(h),wo(h,h.return);break;case 12:la(u,h,a);break;case 31:la(u,h,a),a&&y&4&&P0(u,h);break;case 13:la(u,h,a),a&&y&4&&z0(u,h);break;case 22:h.memoizedState===null&&la(u,h,a),wo(h,h.return);break;case 30:break;default:la(u,h,a)}n=n.sibling}}function Hf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&ho(a))}function Gf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&ho(e))}function Ui(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)F0(e,n,a,o),n=n.sibling}function F0(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ui(e,n,a,o),u&2048&&Ao(9,n);break;case 1:Ui(e,n,a,o);break;case 3:Ui(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&ho(e)));break;case 12:if(u&2048){Ui(e,n,a,o),e=n.stateNode;try{var h=n.memoizedProps,y=h.id,b=h.onPostCommit;typeof b=="function"&&b(y,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(I){ze(n,n.return,I)}}else Ui(e,n,a,o);break;case 31:Ui(e,n,a,o);break;case 13:Ui(e,n,a,o);break;case 23:break;case 22:h=n.stateNode,y=n.alternate,n.memoizedState!==null?h._visibility&2?Ui(e,n,a,o):Ro(e,n):h._visibility&2?Ui(e,n,a,o):(h._visibility|=2,ur(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Hf(y,n);break;case 24:Ui(e,n,a,o),u&2048&&Gf(n.alternate,n);break;default:Ui(e,n,a,o)}}function ur(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,y=n,b=a,I=o,tt=y.flags;switch(y.tag){case 0:case 11:case 15:ur(h,y,b,I,u),Ao(8,y);break;case 23:break;case 22:var ft=y.stateNode;y.memoizedState!==null?ft._visibility&2?ur(h,y,b,I,u):Ro(h,y):(ft._visibility|=2,ur(h,y,b,I,u)),u&&tt&2048&&Hf(y.alternate,y);break;case 24:ur(h,y,b,I,u),u&&tt&2048&&Gf(y.alternate,y);break;default:ur(h,y,b,I,u)}n=n.sibling}}function Ro(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:Ro(a,o),u&2048&&Hf(o.alternate,o);break;case 24:Ro(a,o),u&2048&&Gf(o.alternate,o);break;default:Ro(a,o)}n=n.sibling}}var Co=8192;function fr(e,n,a){if(e.subtreeFlags&Co)for(e=e.child;e!==null;)H0(e,n,a),e=e.sibling}function H0(e,n,a){switch(e.tag){case 26:fr(e,n,a),e.flags&Co&&e.memoizedState!==null&&xS(a,Di,e.memoizedState,e.memoizedProps);break;case 5:fr(e,n,a);break;case 3:case 4:var o=Di;Di=rc(e.stateNode.containerInfo),fr(e,n,a),Di=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Co,Co=16777216,fr(e,n,a),Co=o):fr(e,n,a));break;default:fr(e,n,a)}}function G0(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Do(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Mn=o,k0(o,e)}G0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)V0(e),e=e.sibling}function V0(e){switch(e.tag){case 0:case 11:case 15:Do(e),e.flags&2048&&Pa(9,e,e.return);break;case 3:Do(e);break;case 12:Do(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,jl(e)):Do(e);break;default:Do(e)}}function jl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Mn=o,k0(o,e)}G0(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Pa(8,n,n.return),jl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,jl(n));break;default:jl(n)}e=e.sibling}}function k0(e,n){for(;Mn!==null;){var a=Mn;switch(a.tag){case 0:case 11:case 15:Pa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:ho(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Mn=o;else t:for(a=e;Mn!==null;){o=Mn;var u=o.sibling,h=o.return;if(N0(o),o===a){Mn=null;break t}if(u!==null){u.return=h,Mn=u;break t}Mn=h}}}var Oy={getCacheForType:function(e){var n=Un(un),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Un(un).controller.signal}},Py=typeof WeakMap=="function"?WeakMap:Map,De=0,We=null,ge=null,ye=0,Pe=0,si=null,za=!1,hr=!1,Vf=!1,ca=0,rn=0,Ba=0,bs=0,kf=0,ri=0,dr=0,Uo=null,Yn=null,Xf=!1,Yl=0,X0=0,Zl=1/0,Kl=null,Ia=null,_n=0,Fa=null,pr=null,ua=0,Wf=0,qf=null,W0=null,Lo=0,jf=null;function oi(){return(De&2)!==0&&ye!==0?ye&-ye:z.T!==null?$f():$r()}function q0(){if(ri===0)if((ye&536870912)===0||Ee){var e=ct;ct<<=1,(ct&3932160)===0&&(ct=262144),ri=e}else ri=536870912;return e=ii.current,e!==null&&(e.flags|=32),ri}function Zn(e,n,a){(e===We&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(mr(e,0),Ha(e,ye,ri,!1)),wn(e,a),((De&2)===0||e!==We)&&(e===We&&((De&2)===0&&(bs|=a),rn===4&&Ha(e,ye,ri,!1)),Gi(e))}function j0(e,n,a){if((De&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||ee(e,n),u=o?Iy(e,n):Zf(e,n,!0),h=o;do{if(u===0){hr&&!o&&Ha(e,n,0,!1);break}else{if(a=e.current.alternate,h&&!zy(a)){u=Zf(e,n,!1),h=!1;continue}if(u===2){if(h=n,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;t:{var b=e;u=Uo;var I=b.current.memoizedState.isDehydrated;if(I&&(mr(b,y).flags|=256),y=Zf(b,y,!1),y!==2){if(Vf&&!I){b.errorRecoveryDisabledLanes|=h,bs|=h,u=4;break t}h=Yn,Yn=u,h!==null&&(Yn===null?Yn=h:Yn.push.apply(Yn,h))}u=y}if(h=!1,u!==2)continue}}if(u===1){mr(e,0),Ha(e,n,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ha(o,n,ri,!za);break t;case 2:Yn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Yl+300-dt(),10<u)){if(Ha(o,n,ri,!za),Lt(o,0,!0)!==0)break t;ua=n,o.timeoutHandle=Tg(Y0.bind(null,o,a,Yn,Kl,Xf,n,ri,bs,dr,za,h,"Throttled",-0,0),u);break t}Y0(o,a,Yn,Kl,Xf,n,ri,bs,dr,za,h,null,-0,0)}}break}while(!0);Gi(e)}function Y0(e,n,a,o,u,h,y,b,I,tt,ft,_t,et,lt){if(e.timeoutHandle=-1,_t=n.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zi},H0(n,h,_t);var It=(h&62914560)===h?Yl-dt():(h&4194048)===h?X0-dt():0;if(It=yS(_t,It),It!==null){ua=h,e.cancelPendingCommit=It(ng.bind(null,e,n,h,a,o,u,y,b,I,ft,_t,null,et,lt)),Ha(e,h,y,!tt);return}}ng(e,n,h,a,o,u,y,b,I)}function zy(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!ei(h(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ha(e,n,a,o){n&=~kf,n&=~bs,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var h=31-te(u),y=1<<h;o[h]=-1,u&=~y}a!==0&&Qr(e,a,n)}function Ql(){return(De&6)===0?(No(0),!1):!0}function Yf(){if(ge!==null){if(Pe===0)var e=ge.return;else e=ge,$i=gs=null,uf(e),sr=null,mo=0,e=ge;for(;e!==null;)b0(e.alternate,e),e=e.return;ge=null}}function mr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,nS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ua=0,Yf(),We=e,ge=a=Qi(e.current,null),ye=n,Pe=0,si=null,za=!1,hr=ee(e,n),Vf=!1,dr=ri=kf=bs=Ba=rn=0,Yn=Uo=null,Xf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-te(o),h=1<<u;n|=e[u],o&=~h}return ca=n,vl(),a}function Z0(e,n){ce=null,z.H=Eo,n===ar||n===Al?(n=fm(),Pe=3):n===Qu?(n=fm(),Pe=4):Pe=n===Af?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,si=n,ge===null&&(rn=1,Hl(e,mi(n,e.current)))}function K0(){var e=ii.current;return e===null?!0:(ye&4194048)===ye?xi===null:(ye&62914560)===ye||(ye&536870912)!==0?e===xi:!1}function Q0(){var e=z.H;return z.H=Eo,e===null?Eo:e}function J0(){var e=z.A;return z.A=Oy,e}function Jl(){rn=4,za||(ye&4194048)!==ye&&ii.current!==null||(hr=!0),(Ba&134217727)===0&&(bs&134217727)===0||We===null||Ha(We,ye,ri,!1)}function Zf(e,n,a){var o=De;De|=2;var u=Q0(),h=J0();(We!==e||ye!==n)&&(Kl=null,mr(e,n)),n=!1;var y=rn;t:do try{if(Pe!==0&&ge!==null){var b=ge,I=si;switch(Pe){case 8:Yf(),y=6;break t;case 3:case 2:case 9:case 6:ii.current===null&&(n=!0);var tt=Pe;if(Pe=0,si=null,gr(e,b,I,tt),a&&hr){y=0;break t}break;default:tt=Pe,Pe=0,si=null,gr(e,b,I,tt)}}By(),y=rn;break}catch(ft){Z0(e,ft)}while(!0);return n&&e.shellSuspendCounter++,$i=gs=null,De=o,z.H=u,z.A=h,ge===null&&(We=null,ye=0,vl()),y}function By(){for(;ge!==null;)$0(ge)}function Iy(e,n){var a=De;De|=2;var o=Q0(),u=J0();We!==e||ye!==n?(Kl=null,Zl=dt()+500,mr(e,n)):hr=ee(e,n);t:do try{if(Pe!==0&&ge!==null){n=ge;var h=si;e:switch(Pe){case 1:Pe=0,si=null,gr(e,n,h,1);break;case 2:case 9:if(cm(h)){Pe=0,si=null,tg(n);break}n=function(){Pe!==2&&Pe!==9||We!==e||(Pe=7),Gi(e)},h.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:cm(h)?(Pe=0,si=null,tg(n)):(Pe=0,si=null,gr(e,n,h,7));break;case 5:var y=null;switch(ge.tag){case 26:y=ge.memoizedState;case 5:case 27:var b=ge;if(y?Fg(y):b.stateNode.complete){Pe=0,si=null;var I=b.sibling;if(I!==null)ge=I;else{var tt=b.return;tt!==null?(ge=tt,$l(tt)):ge=null}break e}}Pe=0,si=null,gr(e,n,h,5);break;case 6:Pe=0,si=null,gr(e,n,h,6);break;case 8:Yf(),rn=6;break t;default:throw Error(s(462))}}Fy();break}catch(ft){Z0(e,ft)}while(!0);return $i=gs=null,z.H=o,z.A=u,De=a,ge!==null?0:(We=null,ye=0,vl(),rn)}function Fy(){for(;ge!==null&&!A();)$0(ge)}function $0(e){var n=E0(e.alternate,e,ca);e.memoizedProps=e.pendingProps,n===null?$l(e):ge=n}function tg(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=_0(a,n,n.pendingProps,n.type,void 0,ye);break;case 11:n=_0(a,n,n.pendingProps,n.type.render,n.ref,ye);break;case 5:uf(n);default:b0(a,n),n=ge=Jp(n,ca),n=E0(a,n,ca)}e.memoizedProps=e.pendingProps,n===null?$l(e):ge=n}function gr(e,n,a,o){$i=gs=null,uf(n),sr=null,mo=0;var u=n.return;try{if(wy(e,u,n,a,ye)){rn=1,Hl(e,mi(a,e.current)),ge=null;return}}catch(h){if(u!==null)throw ge=u,h;rn=1,Hl(e,mi(a,e.current)),ge=null;return}n.flags&32768?(Ee||o===1?e=!0:hr||(ye&536870912)!==0?e=!1:(za=e=!0,(o===2||o===9||o===3||o===6)&&(o=ii.current,o!==null&&o.tag===13&&(o.flags|=16384))),eg(n,e)):$l(n)}function $l(e){var n=e;do{if((n.flags&32768)!==0){eg(n,za);return}e=n.return;var a=Dy(n.alternate,n,ca);if(a!==null){ge=a;return}if(n=n.sibling,n!==null){ge=n;return}ge=n=e}while(n!==null);rn===0&&(rn=5)}function eg(e,n){do{var a=Uy(e.alternate,e);if(a!==null){a.flags&=32767,ge=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ge=e;return}ge=e=a}while(e!==null);rn=6,ge=null}function ng(e,n,a,o,u,h,y,b,I){e.cancelPendingCommit=null;do tc();while(_n!==0);if((De&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(h=n.lanes|n.childLanes,h|=zu,Ai(e,a,h,y,b,I),e===We&&(ge=We=null,ye=0),pr=n,Fa=e,ua=a,Wf=h,qf=u,W0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,ky(Ut,function(){return og(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=Q.p,Q.p=2,y=De,De|=4;try{Ly(e,n,a)}finally{De=y,Q.p=u,z.T=o}}_n=1,ig(),ag(),sg()}}function ig(){if(_n===1){_n=0;var e=Fa,n=pr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var o=Q.p;Q.p=2;var u=De;De|=4;try{B0(n,e);var h=oh,y=kp(e.containerInfo),b=h.focusedElem,I=h.selectionRange;if(y!==b&&b&&b.ownerDocument&&Vp(b.ownerDocument.documentElement,b)){if(I!==null&&Uu(b)){var tt=I.start,ft=I.end;if(ft===void 0&&(ft=tt),"selectionStart"in b)b.selectionStart=tt,b.selectionEnd=Math.min(ft,b.value.length);else{var _t=b.ownerDocument||document,et=_t&&_t.defaultView||window;if(et.getSelection){var lt=et.getSelection(),It=b.textContent.length,Jt=Math.min(I.start,It),Ve=I.end===void 0?Jt:Math.min(I.end,It);!lt.extend&&Jt>Ve&&(y=Ve,Ve=Jt,Jt=y);var j=Gp(b,Jt),G=Gp(b,Ve);if(j&&G&&(lt.rangeCount!==1||lt.anchorNode!==j.node||lt.anchorOffset!==j.offset||lt.focusNode!==G.node||lt.focusOffset!==G.offset)){var J=_t.createRange();J.setStart(j.node,j.offset),lt.removeAllRanges(),Jt>Ve?(lt.addRange(J),lt.extend(G.node,G.offset)):(J.setEnd(G.node,G.offset),lt.addRange(J))}}}}for(_t=[],lt=b;lt=lt.parentNode;)lt.nodeType===1&&_t.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<_t.length;b++){var pt=_t[b];pt.element.scrollLeft=pt.left,pt.element.scrollTop=pt.top}}hc=!!rh,oh=rh=null}finally{De=u,Q.p=o,z.T=a}}e.current=n,_n=2}}function ag(){if(_n===2){_n=0;var e=Fa,n=pr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var o=Q.p;Q.p=2;var u=De;De|=4;try{L0(e,n.alternate,n)}finally{De=u,Q.p=o,z.T=a}}_n=3}}function sg(){if(_n===4||_n===3){_n=0,it();var e=Fa,n=pr,a=ua,o=W0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?_n=5:(_n=0,pr=Fa=null,rg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ia=null),ks(a),n=n.stateNode,qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(Kt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=z.T,u=Q.p,Q.p=2,z.T=null;try{for(var h=e.onRecoverableError,y=0;y<o.length;y++){var b=o[y];h(b.value,{componentStack:b.stack})}}finally{z.T=n,Q.p=u}}(ua&3)!==0&&tc(),Gi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===jf?Lo++:(Lo=0,jf=e):Lo=0,No(0)}}function rg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,ho(n)))}function tc(){return ig(),ag(),sg(),og()}function og(){if(_n!==5)return!1;var e=Fa,n=Wf;Wf=0;var a=ks(ua),o=z.T,u=Q.p;try{Q.p=32>a?32:a,z.T=null,a=qf,qf=null;var h=Fa,y=ua;if(_n=0,pr=Fa=null,ua=0,(De&6)!==0)throw Error(s(331));var b=De;if(De|=4,V0(h.current),F0(h,h.current,y,a),De=b,No(0,!1),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(Kt,h)}catch{}return!0}finally{Q.p=u,z.T=o,rg(e,n)}}function lg(e,n,a){n=mi(a,n),n=bf(e.stateNode,n,2),e=La(e,n,2),e!==null&&(wn(e,2),Gi(e))}function ze(e,n,a){if(e.tag===3)lg(e,e,a);else for(;n!==null;){if(n.tag===3){lg(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ia===null||!Ia.has(o))){e=mi(a,e),a=c0(2),o=La(n,a,2),o!==null&&(u0(a,o,n,e),wn(o,2),Gi(o));break}}n=n.return}}function Kf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new Py;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Vf=!0,u.add(a),e=Hy.bind(null,e,n,a),n.then(e,e))}function Hy(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,We===e&&(ye&a)===a&&(rn===4||rn===3&&(ye&62914560)===ye&&300>dt()-Yl?(De&2)===0&&mr(e,0):kf|=a,dr===ye&&(dr=0)),Gi(e)}function cg(e,n){n===0&&(n=mn()),e=ds(e,n),e!==null&&(wn(e,n),Gi(e))}function Gy(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),cg(e,a)}function Vy(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),cg(e,a)}function ky(e,n){return Zt(e,n)}var ec=null,_r=null,Qf=!1,nc=!1,Jf=!1,Ga=0;function Gi(e){e!==_r&&e.next===null&&(_r===null?ec=_r=e:_r=_r.next=e),nc=!0,Qf||(Qf=!0,Wy())}function No(e,n){if(!Jf&&nc){Jf=!0;do for(var a=!1,o=ec;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var y=o.suspendedLanes,b=o.pingedLanes;h=(1<<31-te(42|e)+1)-1,h&=u&~(y&~b),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,dg(o,h))}else h=ye,h=Lt(o,o===We?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||ee(o,h)||(a=!0,dg(o,h));o=o.next}while(a);Jf=!1}}function Xy(){ug()}function ug(){nc=Qf=!1;var e=0;Ga!==0&&eS()&&(e=Ga);for(var n=dt(),a=null,o=ec;o!==null;){var u=o.next,h=fg(o,n);h===0?(o.next=null,a===null?ec=u:a.next=u,u===null&&(_r=a)):(a=o,(e!==0||(h&3)!==0)&&(nc=!0)),o=u}_n!==0&&_n!==5||No(e),Ga!==0&&(Ga=0)}function fg(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-te(h),b=1<<y,I=u[y];I===-1?((b&a)===0||(b&o)!==0)&&(u[y]=tn(b,n)):I<=n&&(e.expiredLanes|=b),h&=~b}if(n=We,a=ye,a=Lt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&N(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||ee(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&N(o),ks(a)){case 2:case 8:a=Wt;break;case 32:a=Ut;break;case 268435456:a=xe;break;default:a=Ut}return o=hg.bind(null,e),a=Zt(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&N(o),e.callbackPriority=2,e.callbackNode=null,2}function hg(e,n){if(_n!==0&&_n!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(tc()&&e.callbackNode!==a)return null;var o=ye;return o=Lt(e,e===We?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(j0(e,o,n),fg(e,dt()),e.callbackNode!=null&&e.callbackNode===a?hg.bind(null,e):null)}function dg(e,n){if(tc())return null;j0(e,n,!0)}function Wy(){iS(function(){(De&6)!==0?Zt(gt,Xy):ug()})}function $f(){if(Ga===0){var e=nr;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),Ga=e}return Ga}function pg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ul(""+e)}function mg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function qy(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var h=pg((u[Rn]||null).action),y=o.submitter;y&&(n=(n=y[Rn]||null)?pg(n.formAction):y.getAttribute("formAction"),n!==null&&(h=n,y=null));var b=new pl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ga!==0){var I=y?mg(u,y):new FormData(u);xf(a,{pending:!0,data:I,method:u.method,action:h},null,I)}}else typeof h=="function"&&(b.preventDefault(),I=y?mg(u,y):new FormData(u),xf(a,{pending:!0,data:I,method:u.method,action:h},h,I))},currentTarget:u}]})}}for(var th=0;th<Pu.length;th++){var eh=Pu[th],jy=eh.toLowerCase(),Yy=eh[0].toUpperCase()+eh.slice(1);Ci(jy,"on"+Yy)}Ci(qp,"onAnimationEnd"),Ci(jp,"onAnimationIteration"),Ci(Yp,"onAnimationStart"),Ci("dblclick","onDoubleClick"),Ci("focusin","onFocus"),Ci("focusout","onBlur"),Ci(uy,"onTransitionRun"),Ci(fy,"onTransitionStart"),Ci(hy,"onTransitionCancel"),Ci(Zp,"onTransitionEnd"),Bt("onMouseEnter",["mouseout","mouseover"]),Bt("onMouseLeave",["mouseout","mouseover"]),Bt("onPointerEnter",["pointerout","pointerover"]),Bt("onPointerLeave",["pointerout","pointerover"]),$t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$t("onBeforeInput",["compositionend","keypress","textInput","paste"]),$t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Oo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Oo));function gg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var y=o.length-1;0<=y;y--){var b=o[y],I=b.instance,tt=b.currentTarget;if(b=b.listener,I!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=tt;try{h(u)}catch(ft){_l(ft)}u.currentTarget=null,h=I}else for(y=0;y<o.length;y++){if(b=o[y],I=b.instance,tt=b.currentTarget,b=b.listener,I!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=tt;try{h(u)}catch(ft){_l(ft)}u.currentTarget=null,h=I}}}}function _e(e,n){var a=n[to];a===void 0&&(a=n[to]=new Set);var o=e+"__bubble";a.has(o)||(_g(n,e,2,!1),a.add(o))}function nh(e,n,a){var o=0;n&&(o|=4),_g(a,e,o,n)}var ic="_reactListening"+Math.random().toString(36).slice(2);function ih(e){if(!e[ic]){e[ic]=!0,Vt.forEach(function(a){a!=="selectionchange"&&(Zy.has(a)||nh(a,!1,e),nh(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[ic]||(n[ic]=!0,nh("selectionchange",!1,n))}}function _g(e,n,a,o){switch(qg(n)){case 2:var u=ES;break;case 8:u=TS;break;default:u=vh}a=u.bind(null,n,a,e),u=void 0,!Mu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function ah(e,n,a,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var b=o.stateNode.containerInfo;if(b===u)break;if(y===4)for(y=o.return;y!==null;){var I=y.tag;if((I===3||I===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;b!==null;){if(y=st(b),y===null)return;if(I=y.tag,I===5||I===6||I===26||I===27){o=h=y;continue t}b=b.parentNode}}o=o.return}Mp(function(){var tt=h,ft=yu(a),_t=[];t:{var et=Kp.get(e);if(et!==void 0){var lt=pl,It=e;switch(e){case"keypress":if(hl(a)===0)break t;case"keydown":case"keyup":lt=Vx;break;case"focusin":It="focus",lt=Au;break;case"focusout":It="blur",lt=Au;break;case"beforeblur":case"afterblur":lt=Au;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=bp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=Dx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Wx;break;case qp:case jp:case Yp:lt=Nx;break;case Zp:lt=jx;break;case"scroll":case"scrollend":lt=Rx;break;case"wheel":lt=Zx;break;case"copy":case"cut":case"paste":lt=Px;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=wp;break;case"toggle":case"beforetoggle":lt=Qx}var Jt=(n&4)!==0,Ve=!Jt&&(e==="scroll"||e==="scrollend"),j=Jt?et!==null?et+"Capture":null:et;Jt=[];for(var G=tt,J;G!==null;){var pt=G;if(J=pt.stateNode,pt=pt.tag,pt!==5&&pt!==26&&pt!==27||J===null||j===null||(pt=eo(G,j),pt!=null&&Jt.push(Po(G,pt,J))),Ve)break;G=G.return}0<Jt.length&&(et=new lt(et,It,null,a,ft),_t.push({event:et,listeners:Jt}))}}if((n&7)===0){t:{if(et=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",et&&a!==xu&&(It=a.relatedTarget||a.fromElement)&&(st(It)||It[ji]))break t;if((lt||et)&&(et=ft.window===ft?ft:(et=ft.ownerDocument)?et.defaultView||et.parentWindow:window,lt?(It=a.relatedTarget||a.toElement,lt=tt,It=It?st(It):null,It!==null&&(Ve=c(It),Jt=It.tag,It!==Ve||Jt!==5&&Jt!==27&&Jt!==6)&&(It=null)):(lt=null,It=tt),lt!==It)){if(Jt=bp,pt="onMouseLeave",j="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=wp,pt="onPointerLeave",j="onPointerEnter",G="pointer"),Ve=lt==null?et:bt(lt),J=It==null?et:bt(It),et=new Jt(pt,G+"leave",lt,a,ft),et.target=Ve,et.relatedTarget=J,pt=null,st(ft)===tt&&(Jt=new Jt(j,G+"enter",It,a,ft),Jt.target=J,Jt.relatedTarget=Ve,pt=Jt),Ve=pt,lt&&It)e:{for(Jt=Ky,j=lt,G=It,J=0,pt=j;pt;pt=Jt(pt))J++;pt=0;for(var Yt=G;Yt;Yt=Jt(Yt))pt++;for(;0<J-pt;)j=Jt(j),J--;for(;0<pt-J;)G=Jt(G),pt--;for(;J--;){if(j===G||G!==null&&j===G.alternate){Jt=j;break e}j=Jt(j),G=Jt(G)}Jt=null}else Jt=null;lt!==null&&vg(_t,et,lt,Jt,!1),It!==null&&Ve!==null&&vg(_t,Ve,It,Jt,!0)}}t:{if(et=tt?bt(tt):window,lt=et.nodeName&&et.nodeName.toLowerCase(),lt==="select"||lt==="input"&&et.type==="file")var Re=Pp;else if(Np(et))if(zp)Re=oy;else{Re=sy;var Xt=ay}else lt=et.nodeName,!lt||lt.toLowerCase()!=="input"||et.type!=="checkbox"&&et.type!=="radio"?tt&&vu(tt.elementType)&&(Re=Pp):Re=ry;if(Re&&(Re=Re(e,tt))){Op(_t,Re,a,ft);break t}Xt&&Xt(e,et,tt),e==="focusout"&&tt&&et.type==="number"&&tt.memoizedProps.value!=null&&di(et,"number",et.value)}switch(Xt=tt?bt(tt):window,e){case"focusin":(Np(Xt)||Xt.contentEditable==="true")&&(Ys=Xt,Lu=tt,co=null);break;case"focusout":co=Lu=Ys=null;break;case"mousedown":Nu=!0;break;case"contextmenu":case"mouseup":case"dragend":Nu=!1,Xp(_t,a,ft);break;case"selectionchange":if(cy)break;case"keydown":case"keyup":Xp(_t,a,ft)}var ue;if(Ru)t:{switch(e){case"compositionstart":var Se="onCompositionStart";break t;case"compositionend":Se="onCompositionEnd";break t;case"compositionupdate":Se="onCompositionUpdate";break t}Se=void 0}else js?Up(e,a)&&(Se="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Se="onCompositionStart");Se&&(Rp&&a.locale!=="ko"&&(js||Se!=="onCompositionStart"?Se==="onCompositionEnd"&&js&&(ue=Ep()):(ba=ft,Eu="value"in ba?ba.value:ba.textContent,js=!0)),Xt=ac(tt,Se),0<Xt.length&&(Se=new Ap(Se,e,null,a,ft),_t.push({event:Se,listeners:Xt}),ue?Se.data=ue:(ue=Lp(a),ue!==null&&(Se.data=ue)))),(ue=$x?ty(e,a):ey(e,a))&&(Se=ac(tt,"onBeforeInput"),0<Se.length&&(Xt=new Ap("onBeforeInput","beforeinput",null,a,ft),_t.push({event:Xt,listeners:Se}),Xt.data=ue)),qy(_t,e,tt,a,ft)}gg(_t,n)})}function Po(e,n,a){return{instance:e,listener:n,currentTarget:a}}function ac(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=eo(e,a),u!=null&&o.unshift(Po(e,u,h)),u=eo(e,n),u!=null&&o.push(Po(e,u,h))),e.tag===3)return o;e=e.return}return[]}function Ky(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function vg(e,n,a,o,u){for(var h=n._reactName,y=[];a!==null&&a!==o;){var b=a,I=b.alternate,tt=b.stateNode;if(b=b.tag,I!==null&&I===o)break;b!==5&&b!==26&&b!==27||tt===null||(I=tt,u?(tt=eo(a,h),tt!=null&&y.unshift(Po(a,tt,I))):u||(tt=eo(a,h),tt!=null&&y.push(Po(a,tt,I)))),a=a.return}y.length!==0&&e.push({event:n,listeners:y})}var Qy=/\r\n?/g,Jy=/\u0000|\uFFFD/g;function xg(e){return(typeof e=="string"?e:""+e).replace(Qy,`
`).replace(Jy,"")}function yg(e,n){return n=xg(n),xg(e)===n}function Ge(e,n,a,o,u,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Xs(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Xs(e,""+o);break;case"className":kt(e,"class",o);break;case"tabIndex":kt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":kt(e,a,o);break;case"style":yp(e,o,h);break;case"data":if(n!=="object"){kt(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ul(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&Ge(e,n,"name",u.name,u,null),Ge(e,n,"formEncType",u.formEncType,u,null),Ge(e,n,"formMethod",u.formMethod,u,null),Ge(e,n,"formTarget",u.formTarget,u,null)):(Ge(e,n,"encType",u.encType,u,null),Ge(e,n,"method",u.method,u,null),Ge(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ul(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Zi);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=ul(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Me(e,"popover",o);break;case"xlinkActuate":gn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":gn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":gn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":gn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":gn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":gn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":gn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":gn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":gn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Me(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Ax.get(a)||a,Me(e,a,o))}}function sh(e,n,a,o,u,h){switch(a){case"style":yp(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Xs(e,o):(typeof o=="number"||typeof o=="bigint")&&Xs(e,""+o);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Zi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ne.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),h=e[Rn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Me(e,a,o)}}}function Nn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var y=a[h];if(y!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ge(e,n,h,y,a,null)}}u&&Ge(e,n,"srcSet",a.srcSet,a,null),o&&Ge(e,n,"src",a.src,a,null);return;case"input":_e("invalid",e);var b=h=y=u=null,I=null,tt=null;for(o in a)if(a.hasOwnProperty(o)){var ft=a[o];if(ft!=null)switch(o){case"name":u=ft;break;case"type":y=ft;break;case"checked":I=ft;break;case"defaultChecked":tt=ft;break;case"value":h=ft;break;case"defaultValue":b=ft;break;case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(s(137,n));break;default:Ge(e,n,o,ft,a,null)}}Ri(e,h,b,I,tt,y,u,!1);return;case"select":_e("invalid",e),o=y=h=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":h=b;break;case"defaultValue":y=b;break;case"multiple":o=b;default:Ge(e,n,u,b,a,null)}n=h,a=y,e.multiple=!!o,n!=null?Yi(e,!!o,n,!1):a!=null&&Yi(e,!!o,a,!0);return;case"textarea":_e("invalid",e),h=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(b=a[y],b!=null))switch(y){case"value":o=b;break;case"defaultValue":u=b;break;case"children":h=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:Ge(e,n,y,b,a,null)}vp(e,o,u,h);return;case"option":for(I in a)if(a.hasOwnProperty(I)&&(o=a[I],o!=null))switch(I){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Ge(e,n,I,o,a,null)}return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(o=0;o<Oo.length;o++)_e(Oo[o],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(o=a[tt],o!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ge(e,n,tt,o,a,null)}return;default:if(vu(n)){for(ft in a)a.hasOwnProperty(ft)&&(o=a[ft],o!==void 0&&sh(e,n,ft,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&Ge(e,n,b,o,a,null))}function $y(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,y=null,b=null,I=null,tt=null,ft=null;for(lt in a){var _t=a[lt];if(a.hasOwnProperty(lt)&&_t!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":I=_t;default:o.hasOwnProperty(lt)||Ge(e,n,lt,null,o,_t)}}for(var et in o){var lt=o[et];if(_t=a[et],o.hasOwnProperty(et)&&(lt!=null||_t!=null))switch(et){case"type":h=lt;break;case"name":u=lt;break;case"checked":tt=lt;break;case"defaultChecked":ft=lt;break;case"value":y=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,n));break;default:lt!==_t&&Ge(e,n,et,lt,o,_t)}}Bn(e,y,b,I,tt,ft,h,u);return;case"select":lt=y=b=et=null;for(h in a)if(I=a[h],a.hasOwnProperty(h)&&I!=null)switch(h){case"value":break;case"multiple":lt=I;default:o.hasOwnProperty(h)||Ge(e,n,h,null,o,I)}for(u in o)if(h=o[u],I=a[u],o.hasOwnProperty(u)&&(h!=null||I!=null))switch(u){case"value":et=h;break;case"defaultValue":b=h;break;case"multiple":y=h;default:h!==I&&Ge(e,n,u,h,o,I)}n=b,a=y,o=lt,et!=null?Yi(e,!!a,et,!1):!!o!=!!a&&(n!=null?Yi(e,!!a,n,!0):Yi(e,!!a,a?[]:"",!1));return;case"textarea":lt=et=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Ge(e,n,b,null,o,u)}for(y in o)if(u=o[y],h=a[y],o.hasOwnProperty(y)&&(u!=null||h!=null))switch(y){case"value":et=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&Ge(e,n,y,u,o,h)}_p(e,et,lt);return;case"option":for(var It in a)if(et=a[It],a.hasOwnProperty(It)&&et!=null&&!o.hasOwnProperty(It))switch(It){case"selected":e.selected=!1;break;default:Ge(e,n,It,null,o,et)}for(I in o)if(et=o[I],lt=a[I],o.hasOwnProperty(I)&&et!==lt&&(et!=null||lt!=null))switch(I){case"selected":e.selected=et&&typeof et!="function"&&typeof et!="symbol";break;default:Ge(e,n,I,et,o,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in a)et=a[Jt],a.hasOwnProperty(Jt)&&et!=null&&!o.hasOwnProperty(Jt)&&Ge(e,n,Jt,null,o,et);for(tt in o)if(et=o[tt],lt=a[tt],o.hasOwnProperty(tt)&&et!==lt&&(et!=null||lt!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(et!=null)throw Error(s(137,n));break;default:Ge(e,n,tt,et,o,lt)}return;default:if(vu(n)){for(var Ve in a)et=a[Ve],a.hasOwnProperty(Ve)&&et!==void 0&&!o.hasOwnProperty(Ve)&&sh(e,n,Ve,void 0,o,et);for(ft in o)et=o[ft],lt=a[ft],!o.hasOwnProperty(ft)||et===lt||et===void 0&&lt===void 0||sh(e,n,ft,et,o,lt);return}}for(var j in a)et=a[j],a.hasOwnProperty(j)&&et!=null&&!o.hasOwnProperty(j)&&Ge(e,n,j,null,o,et);for(_t in o)et=o[_t],lt=a[_t],!o.hasOwnProperty(_t)||et===lt||et==null&&lt==null||Ge(e,n,_t,et,o,lt)}function Sg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function tS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,y=u.initiatorType,b=u.duration;if(h&&b&&Sg(y)){for(y=0,b=u.responseEnd,o+=1;o<a.length;o++){var I=a[o],tt=I.startTime;if(tt>b)break;var ft=I.transferSize,_t=I.initiatorType;ft&&Sg(_t)&&(I=I.responseEnd,y+=ft*(I<b?1:(b-tt)/(I-tt)))}if(--o,n+=8*(h+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var rh=null,oh=null;function sc(e){return e.nodeType===9?e:e.ownerDocument}function Mg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Eg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function lh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ch=null;function eS(){var e=window.event;return e&&e.type==="popstate"?e===ch?!1:(ch=e,!0):(ch=null,!1)}var Tg=typeof setTimeout=="function"?setTimeout:void 0,nS=typeof clearTimeout=="function"?clearTimeout:void 0,bg=typeof Promise=="function"?Promise:void 0,iS=typeof queueMicrotask=="function"?queueMicrotask:typeof bg<"u"?function(e){return bg.resolve(null).then(e).catch(aS)}:Tg;function aS(e){setTimeout(function(){throw e})}function Va(e){return e==="head"}function Ag(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),Sr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")zo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,zo(a);for(var h=a.firstChild;h;){var y=h.nextSibling,b=h.nodeName;h[X]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=y}}else a==="body"&&zo(e.ownerDocument.body);a=u}while(a);Sr(n)}function wg(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function uh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":uh(a),ot(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function sS(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[X])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=yi(e.nextSibling),e===null)break}return null}function rS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=yi(e.nextSibling),e===null))return null;return e}function Rg(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=yi(e.nextSibling),e===null))return null;return e}function fh(e){return e.data==="$?"||e.data==="$~"}function hh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function oS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function yi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var dh=null;function Cg(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return yi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function Dg(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function Ug(e,n,a){switch(n=sc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function zo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);ot(e)}var Si=new Map,Lg=new Set;function rc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var fa=Q.d;Q.d={f:lS,r:cS,D:uS,C:fS,L:hS,m:dS,X:mS,S:pS,M:gS};function lS(){var e=fa.f(),n=Ql();return e||n}function cS(e){var n=W(e);n!==null&&n.tag===5&&n.type==="form"?Zm(n):fa.r(e)}var vr=typeof document>"u"?null:document;function Ng(e,n,a){var o=vr;if(o&&typeof n=="string"&&n){var u=Sn(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Lg.has(u)||(Lg.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Nn(n,"link",e),Dt(n),o.head.appendChild(n)))}}function uS(e){fa.D(e),Ng("dns-prefetch",e,null)}function fS(e,n){fa.C(e,n),Ng("preconnect",e,n)}function hS(e,n,a){fa.L(e,n,a);var o=vr;if(o&&e&&n){var u='link[rel="preload"][as="'+Sn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Sn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Sn(a.imageSizes)+'"]')):u+='[href="'+Sn(e)+'"]';var h=u;switch(n){case"style":h=xr(e);break;case"script":h=yr(e)}Si.has(h)||(e=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),Si.set(h,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Bo(h))||n==="script"&&o.querySelector(Io(h))||(n=o.createElement("link"),Nn(n,"link",e),Dt(n),o.head.appendChild(n)))}}function dS(e,n){fa.m(e,n);var a=vr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Sn(o)+'"][href="'+Sn(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=yr(e)}if(!Si.has(h)&&(e=_({rel:"modulepreload",href:e},n),Si.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Io(h)))return}o=a.createElement("link"),Nn(o,"link",e),Dt(o),a.head.appendChild(o)}}}function pS(e,n,a){fa.S(e,n,a);var o=vr;if(o&&e){var u=Ct(o).hoistableStyles,h=xr(e);n=n||"default";var y=u.get(h);if(!y){var b={loading:0,preload:null};if(y=o.querySelector(Bo(h)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},a),(a=Si.get(h))&&ph(e,a);var I=y=o.createElement("link");Dt(I),Nn(I,"link",e),I._p=new Promise(function(tt,ft){I.onload=tt,I.onerror=ft}),I.addEventListener("load",function(){b.loading|=1}),I.addEventListener("error",function(){b.loading|=2}),b.loading|=4,oc(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:b},u.set(h,y)}}}function mS(e,n){fa.X(e,n);var a=vr;if(a&&e){var o=Ct(a).hoistableScripts,u=yr(e),h=o.get(u);h||(h=a.querySelector(Io(u)),h||(e=_({src:e,async:!0},n),(n=Si.get(u))&&mh(e,n),h=a.createElement("script"),Dt(h),Nn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function gS(e,n){fa.M(e,n);var a=vr;if(a&&e){var o=Ct(a).hoistableScripts,u=yr(e),h=o.get(u);h||(h=a.querySelector(Io(u)),h||(e=_({src:e,async:!0,type:"module"},n),(n=Si.get(u))&&mh(e,n),h=a.createElement("script"),Dt(h),Nn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Og(e,n,a,o){var u=(u=Et.current)?rc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=xr(a.href),a=Ct(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=xr(a.href);var h=Ct(u).hoistableStyles,y=h.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=u.querySelector(Bo(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Si.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Si.set(e,a),h||_S(u,e,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=yr(a),a=Ct(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function xr(e){return'href="'+Sn(e)+'"'}function Bo(e){return'link[rel="stylesheet"]['+e+"]"}function Pg(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function _S(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Nn(n,"link",a),Dt(n),e.head.appendChild(n))}function yr(e){return'[src="'+Sn(e)+'"]'}function Io(e){return"script[async]"+e}function zg(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+Sn(a.href)+'"]');if(o)return n.instance=o,Dt(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Dt(o),Nn(o,"style",u),oc(o,a.precedence,e),n.instance=o;case"stylesheet":u=xr(a.href);var h=e.querySelector(Bo(u));if(h)return n.state.loading|=4,n.instance=h,Dt(h),h;o=Pg(a),(u=Si.get(u))&&ph(o,u),h=(e.ownerDocument||e).createElement("link"),Dt(h);var y=h;return y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Nn(h,"link",o),n.state.loading|=4,oc(h,a.precedence,e),n.instance=h;case"script":return h=yr(a.src),(u=e.querySelector(Io(h)))?(n.instance=u,Dt(u),u):(o=a,(u=Si.get(h))&&(o=_({},a),mh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Dt(u),Nn(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,oc(o,a.precedence,e));return n.instance}function oc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,y=0;y<o.length;y++){var b=o[y];if(b.dataset.precedence===n)h=b;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function ph(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function mh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var lc=null;function Bg(e,n,a){if(lc===null){var o=new Map,u=lc=new Map;u.set(a,o)}else u=lc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[X]||h[an]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(n)||"";y=e+y;var b=o.get(y);b?b.push(h):o.set(y,[h])}}return o}function Ig(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function vS(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Fg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function xS(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=xr(o.href),h=n.querySelector(Bo(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=cc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=h,Dt(h);return}h=n.ownerDocument||n,o=Pg(o),(u=Si.get(u))&&ph(o,u),h=h.createElement("link"),Dt(h);var y=h;y._p=new Promise(function(b,I){y.onload=b,y.onerror=I}),Nn(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=cc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var gh=0;function yS(e,n){return e.stylesheets&&e.count===0&&fc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&fc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&gh===0&&(gh=62500*tS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&fc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>gh?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function cc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)fc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var uc=null;function fc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,uc=new Map,n.forEach(SS,e),uc=null,cc.call(e))}function SS(e,n){if(!(n.state.loading&4)){var a=uc.get(e);if(a)var o=a.get(null);else{a=new Map,uc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var y=u[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),h=a.get(y)||o,h===o&&a.set(null,u),a.set(y,u),this.count++,o=cc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Fo={$$typeof:U,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function MS(e,n,a,o,u,h,y,b,I){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=I,this.incompleteTransitions=new Map}function Hg(e,n,a,o,u,h,y,b,I,tt,ft,_t){return e=new MS(e,n,a,y,I,tt,ft,_t,b),n=1,h===!0&&(n|=24),h=ni(3,null,null,n),e.current=h,h.stateNode=e,n=Yu(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},Ju(h),e}function Gg(e){return e?(e=Qs,e):Qs}function Vg(e,n,a,o,u,h){u=Gg(u),o.context===null?o.context=u:o.pendingContext=u,o=Ua(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=La(e,o,n),a!==null&&(Zn(a,e,n),_o(a,e,n))}function kg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function _h(e,n){kg(e,n),(e=e.alternate)&&kg(e,n)}function Xg(e){if(e.tag===13||e.tag===31){var n=ds(e,67108864);n!==null&&Zn(n,e,67108864),_h(e,67108864)}}function Wg(e){if(e.tag===13||e.tag===31){var n=oi();n=ls(n);var a=ds(e,n);a!==null&&Zn(a,e,n),_h(e,n)}}var hc=!0;function ES(e,n,a,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=2,vh(e,n,a,o)}finally{Q.p=h,z.T=u}}function TS(e,n,a,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=8,vh(e,n,a,o)}finally{Q.p=h,z.T=u}}function vh(e,n,a,o){if(hc){var u=xh(o);if(u===null)ah(e,n,o,dc,a),jg(e,o);else if(AS(u,e,n,a,o))o.stopPropagation();else if(jg(e,o),n&4&&-1<bS.indexOf(e)){for(;u!==null;){var h=W(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=Rt(h.pendingLanes);if(y!==0){var b=h;for(b.pendingLanes|=2,b.entangledLanes|=2;y;){var I=1<<31-te(y);b.entanglements[1]|=I,y&=~I}Gi(h),(De&6)===0&&(Zl=dt()+500,No(0))}}break;case 31:case 13:b=ds(h,2),b!==null&&Zn(b,h,2),Ql(),_h(h,2)}if(h=xh(o),h===null&&ah(e,n,o,dc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else ah(e,n,o,null,a)}}function xh(e){return e=yu(e),yh(e)}var dc=null;function yh(e){if(dc=null,e=st(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=f(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return dc=e,null}function qg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case gt:return 2;case Wt:return 8;case Ut:case Pt:return 32;case xe:return 268435456;default:return 32}default:return 32}}var Sh=!1,ka=null,Xa=null,Wa=null,Ho=new Map,Go=new Map,qa=[],bS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function jg(e,n){switch(e){case"focusin":case"focusout":ka=null;break;case"dragenter":case"dragleave":Xa=null;break;case"mouseover":case"mouseout":Wa=null;break;case"pointerover":case"pointerout":Ho.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Go.delete(n.pointerId)}}function Vo(e,n,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=W(n),n!==null&&Xg(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function AS(e,n,a,o,u){switch(n){case"focusin":return ka=Vo(ka,e,n,a,o,u),!0;case"dragenter":return Xa=Vo(Xa,e,n,a,o,u),!0;case"mouseover":return Wa=Vo(Wa,e,n,a,o,u),!0;case"pointerover":var h=u.pointerId;return Ho.set(h,Vo(Ho.get(h)||null,e,n,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Go.set(h,Vo(Go.get(h)||null,e,n,a,o,u)),!0}return!1}function Yg(e){var n=st(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){e.blockedOn=n,cs(e.priority,function(){Wg(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,cs(e.priority,function(){Wg(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function pc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=xh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);xu=o,a.target.dispatchEvent(o),xu=null}else return n=W(a),n!==null&&Xg(n),e.blockedOn=a,!1;n.shift()}return!0}function Zg(e,n,a){pc(e)&&a.delete(n)}function wS(){Sh=!1,ka!==null&&pc(ka)&&(ka=null),Xa!==null&&pc(Xa)&&(Xa=null),Wa!==null&&pc(Wa)&&(Wa=null),Ho.forEach(Zg),Go.forEach(Zg)}function mc(e,n){e.blockedOn===n&&(e.blockedOn=null,Sh||(Sh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,wS)))}var gc=null;function Kg(e){gc!==e&&(gc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){gc===e&&(gc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(yh(o||a)===null)continue;break}var h=W(a);h!==null&&(e.splice(n,3),n-=3,xf(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Sr(e){function n(I){return mc(I,e)}ka!==null&&mc(ka,e),Xa!==null&&mc(Xa,e),Wa!==null&&mc(Wa,e),Ho.forEach(n),Go.forEach(n);for(var a=0;a<qa.length;a++){var o=qa[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<qa.length&&(a=qa[0],a.blockedOn===null);)Yg(a),a.blockedOn===null&&qa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],y=u[Rn]||null;if(typeof h=="function")y||Kg(a);else if(y){var b=null;if(h&&h.hasAttribute("formAction")){if(u=h,y=h[Rn]||null)b=y.formAction;else if(yh(u)!==null)continue}else b=y.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),Kg(a)}}}function Qg(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Mh(e){this._internalRoot=e}_c.prototype.render=Mh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=oi();Vg(a,o,e,n,null,null)},_c.prototype.unmount=Mh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Vg(e.current,2,null,e,null,null),Ql(),n[ji]=null}};function _c(e){this._internalRoot=e}_c.prototype.unstable_scheduleHydration=function(e){if(e){var n=$r();e={blockedOn:null,target:e,priority:n};for(var a=0;a<qa.length&&n!==0&&n<qa[a].priority;a++);qa.splice(a,0,e),a===0&&Yg(e)}};var Jg=t.version;if(Jg!=="19.2.8")throw Error(s(527,Jg,"19.2.8"));Q.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var RS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var vc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vc.isDisabled&&vc.supportsFiber)try{Kt=vc.inject(RS),qt=vc}catch{}}return Xo.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=s0,h=r0,y=o0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=Hg(e,1,!1,null,null,a,o,null,u,h,y,Qg),e[ji]=n.current,ih(e),new Mh(n)},Xo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",h=s0,y=r0,b=o0,I=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(I=a.formState)),n=Hg(e,1,!0,n,a??null,o,u,I,h,y,b,Qg),n.context=Gg(null),a=n.current,o=oi(),o=ls(o),u=Ua(o),u.callback=null,La(a,u,o),a=o,n.current.lanes=a,wn(n,a),Gi(n),e[ji]=n.current,ih(e),new _c(n)},Xo.version="19.2.8",Xo}var l_;function HS(){if(l_)return bh.exports;l_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),bh.exports=FS(),bh.exports}var GS=HS();const VS=Gv(GS),c_=r=>{let t;const i=new Set,s=(p,g)=>{const _=typeof p=="function"?p(t):p;if(!Object.is(_,t)){const v=t;t=g??(typeof _!="object"||_===null)?_:Object.assign({},t,_),i.forEach(S=>S(t,v))}},l=()=>t,d={setState:s,getState:l,getInitialState:()=>m,subscribe:p=>(i.add(p),()=>i.delete(p))},m=t=r(s,l,d);return d},kS=(r=>r?c_(r):c_),XS=r=>r;function WS(r,t=XS){const i=Jo.useSyncExternalStore(r.subscribe,Jo.useCallback(()=>t(r.getState()),[r,t]),Jo.useCallback(()=>t(r.getInitialState()),[r,t]));return Jo.useDebugValue(i),i}const u_=r=>{const t=kS(r),i=s=>WS(t,s);return Object.assign(i,t),i},qS=(r=>r?u_(r):u_),Ch=1/60,f_=100,jS=100,YS=1.5,Ya=200,ZS=10,KS=5,h_=1.5,QS=3,JS=2,$S=30,d_=200,tM=8,p_={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,result:null,p1Wins:0,p2Wins:0,matchTime:0,bossFight:!1,bossName:""};function xc(r){return{id:r,pos:{x:r===0?-20:20,y:0,z:0},rot:{x:0,y:0,z:0},hp:f_,maxHp:f_,speed:20,weapon:1,weapons:[1,2,3],skillCooldowns:[0,0,0],specialGauge:0,maxSpecialGauge:jS,shieldTimer:0,invulnTimer:0,alive:!0,score:0,kills:0,combo:0,boostTimer:0,slowTimer:0,warpTimer:0}}function yc(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:0,aimY:0,weaponSwitch:0,skill1:!1,skill2:!1,skill3:!1,special:!1,boost:!1,lockTarget:!1,pause:!1}}const Tn=qS(r=>({game:{...p_},players:[xc(0),xc(1)],inputs:[yc(),yc()],setGame:t=>r(i=>({game:{...i.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),resetGame:()=>r({game:{...p_},players:[xc(0),xc(1)],inputs:[yc(),yc()]})})),eM=r=>$.jsx("svg",{className:"absolute top-0 left-0 w-4 h-4",viewBox:"0 0 16 16",children:$.jsx("path",{d:"M0 0h14v2H2v12H0z",fill:r})}),nM=r=>$.jsx("svg",{className:"absolute top-0 right-0 w-4 h-4",viewBox:"0 0 16 16",children:$.jsx("path",{d:"M16 0H2v2h12v12h2z",fill:r})}),iM=r=>$.jsx("svg",{className:"absolute bottom-0 left-0 w-4 h-4",viewBox:"0 0 16 16",children:$.jsx("path",{d:"M0 16h14v-2H2V2H0z",fill:r})}),aM=r=>$.jsx("svg",{className:"absolute bottom-0 right-0 w-4 h-4",viewBox:"0 0 16 16",children:$.jsx("path",{d:"M16 16H2v-2h12V2h2z",fill:r})}),m_=()=>{const r=Tn(t=>t.setGame);return $.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-dark-bg",children:[$.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),$.jsx("div",{className:"text-center mb-16 relative",children:$.jsxs("div",{className:"relative inline-block px-8 py-6 pixel-border bg-black/60",children:[eM("#00f0ff"),nM("#00f0ff"),iM("#00f0ff"),aM("#00f0ff"),$.jsx("h1",{className:"font-pixel-title text-2xl md:text-3xl text-neon-cyan mb-4 pixel-text-glow tracking-wide",children:"纯白枪骑兵"}),$.jsx("p",{className:"font-pixel text-lg text-white/40 tracking-[0.2em]",children:"PURE WHITE LANCER"}),$.jsxs("div",{className:"mt-3 flex items-center justify-center gap-3 text-[10px] text-white/25",children:[$.jsx("span",{className:"px-2 py-0.5 pixel-border-dim",children:"3D ACTION"}),$.jsx("span",{className:"px-2 py-0.5 pixel-border-dim",children:"REMAKE"})]})]})}),$.jsxs("div",{className:"space-y-3 w-64",children:[$.jsx("button",{onClick:()=>r({screen:"modeSelect"}),className:"pixel-btn w-full py-2.5 text-base tracking-[0.15em]",children:"START GAME"}),$.jsxs("div",{className:"text-center mt-8",children:[$.jsx("p",{className:"font-pixel text-xs text-white/20 tracking-wider",children:"BASED ON THE FLASH ORIGINAL"}),$.jsx("p",{className:"font-pixel text-[10px] text-white/15 mt-1",children:"ORIGINAL: phixcat | REMAKE: KIMI3"})]})]})]})},g_=r=>$.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),__=r=>$.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),v_=r=>$.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),x_=r=>$.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),sM=()=>{const r=Tn(t=>t.setGame);return $.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-dark-bg",children:[$.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),$.jsx("h2",{className:"font-pixel text-2xl text-neon-cyan mb-12 pixel-text-glow tracking-[0.2em]",children:"SELECT MODE"}),$.jsxs("div",{className:"flex gap-6",children:[$.jsxs("div",{onClick:()=>{r({screen:"pve",gameMode:"pve"})},className:`relative w-72 p-5 pixel-border bg-black/70 cursor-pointer\r
            transition-all hover:bg-black/90 group`,children:[g_("#00f0ff"),__("#00f0ff"),v_("#00f0ff"),x_("#00f0ff"),$.jsx("div",{className:"text-2xl mb-3 text-neon-cyan",children:"[PVE]"}),$.jsx("h3",{className:"font-pixel text-lg text-white mb-2 tracking-wider",children:"SURVIVAL"}),$.jsx("p",{className:"font-pixel text-sm text-white/40 mb-4 tracking-wide",children:"Fight waves of enemies and challenge powerful bosses."}),$.jsxs("div",{className:"space-y-1.5 font-pixel text-xs text-white/30 tracking-wider",children:[$.jsx("div",{children:"> 6 ENEMY TYPES"}),$.jsx("div",{children:"> 3 BOSSES"}),$.jsx("div",{children:"> 6 WEAPONS + SPECIAL"}),$.jsx("div",{children:"> ENDLESS WAVES"})]}),$.jsx("div",{className:`mt-4 px-3 py-1.5 pixel-border text-center text-sm text-neon-cyan tracking-widest\r
            group-hover:bg-neon-cyan/10 transition-colors`,children:"START PVE"})]}),$.jsxs("div",{onClick:()=>{r({screen:"pvp",gameMode:"pvp"})},className:`relative w-72 p-5 pixel-border bg-black/70 cursor-pointer\r
            transition-all hover:bg-black/90 group`,children:[g_("#ff6644"),__("#ff6644"),v_("#ff6644"),x_("#ff6644"),$.jsx("div",{className:"text-2xl mb-3 text-neon-orange",children:"[PVP]"}),$.jsx("h3",{className:"font-pixel text-lg text-white mb-2 tracking-wider",children:"1 VS 1"}),$.jsx("p",{className:"font-pixel text-sm text-white/40 mb-4 tracking-wide",children:"Local split-screen battle, best of 3."}),$.jsxs("div",{className:"space-y-1.5 font-pixel text-xs text-white/30 tracking-wider",children:[$.jsx("div",{children:"> BEST OF 3"}),$.jsx("div",{children:"> 3 MIN PER ROUND"}),$.jsx("div",{children:"> ALL WEAPONS"}),$.jsx("div",{children:"> POWER-UP ITEMS"})]}),$.jsx("div",{className:`mt-4 px-3 py-1.5 pixel-border-warning text-center text-sm text-neon-orange tracking-widest\r
            group-hover:bg-neon-orange/10 transition-colors`,children:"START PVP"})]})]}),$.jsx("button",{onClick:()=>r({screen:"menu"}),className:"pixel-btn mt-8 px-6 py-1.5 text-sm tracking-[0.15em]",children:"← BACK"})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ip="170",rM=0,y_=1,oM=2,Vv=1,kv=2,_a=3,rs=0,$n=1,va=2,as=0,Fr=1,ud=2,S_=3,M_=4,lM=5,Os=100,cM=101,uM=102,fM=103,hM=104,dM=200,pM=201,mM=202,gM=203,fd=204,hd=205,_M=206,vM=207,xM=208,yM=209,SM=210,MM=211,EM=212,TM=213,bM=214,dd=0,pd=1,md=2,Vr=3,gd=4,_d=5,vd=6,xd=7,Xv=0,AM=1,wM=2,ss=0,RM=1,CM=2,DM=3,UM=4,LM=5,NM=6,OM=7,Wv=300,kr=301,Xr=302,yd=303,Sd=304,hu=306,Md=1e3,Bs=1001,Ed=1002,zi=1003,PM=1004,Sc=1005,Wi=1006,Dh=1007,Is=1008,Ma=1009,qv=1010,jv=1011,nl=1012,ap=1013,Hs=1014,xa=1015,il=1016,sp=1017,rp=1018,Wr=1020,Yv=35902,Zv=1021,Kv=1022,Pi=1023,Qv=1024,Jv=1025,Hr=1026,qr=1027,$v=1028,op=1029,tx=1030,lp=1031,cp=1033,Jc=33776,$c=33777,tu=33778,eu=33779,Td=35840,bd=35841,Ad=35842,wd=35843,Rd=36196,Cd=37492,Dd=37496,Ud=37808,Ld=37809,Nd=37810,Od=37811,Pd=37812,zd=37813,Bd=37814,Id=37815,Fd=37816,Hd=37817,Gd=37818,Vd=37819,kd=37820,Xd=37821,nu=36492,Wd=36494,qd=36495,ex=36283,jd=36284,Yd=36285,Zd=36286,zM=3200,BM=3201,nx=0,IM=1,is="",Ei="srgb",Yr="srgb-linear",du="linear",ke="srgb",Mr=7680,E_=519,FM=512,HM=513,GM=514,ix=515,VM=516,kM=517,XM=518,WM=519,T_=35044,b_="300 es",ya=2e3,su=2001;class Zr{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],iu=Math.PI/180,Kd=180/Math.PI;function al(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Fn[r&255]+Fn[r>>8&255]+Fn[r>>16&255]+Fn[r>>24&255]+"-"+Fn[t&255]+Fn[t>>8&255]+"-"+Fn[t>>16&15|64]+Fn[t>>24&255]+"-"+Fn[i&63|128]+Fn[i>>8&255]+"-"+Fn[i>>16&255]+Fn[i>>24&255]+Fn[s&255]+Fn[s>>8&255]+Fn[s>>16&255]+Fn[s>>24&255]).toLowerCase()}function Qn(r,t,i){return Math.max(t,Math.min(i,r))}function qM(r,t){return(r%t+t)%t}function Uh(r,t,i){return(1-i)*r+i*t}function Wo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Kn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Te{constructor(t=0,i=0){Te.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this}clampScalar(t,i){return this.x=Math.max(t,Math.min(i,this.x)),this.y=Math.max(t,Math.min(i,this.y)),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(i,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(Qn(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fe{constructor(t,i,s,l,c,f,d,m,p){fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,d,m,p)}set(t,i,s,l,c,f,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=m,g[6]=s,g[7]=f,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],d=s[3],m=s[6],p=s[1],g=s[4],_=s[7],v=s[2],S=s[5],M=s[8],T=l[0],E=l[3],x=l[6],L=l[1],U=l[4],R=l[7],Y=l[2],B=l[5],O=l[8];return c[0]=f*T+d*L+m*Y,c[3]=f*E+d*U+m*B,c[6]=f*x+d*R+m*O,c[1]=p*T+g*L+_*Y,c[4]=p*E+g*U+_*B,c[7]=p*x+g*R+_*O,c[2]=v*T+S*L+M*Y,c[5]=v*E+S*U+M*B,c[8]=v*x+S*R+M*O,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return i*f*g-i*d*p-s*c*g+s*d*m+l*c*p-l*f*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=g*f-d*p,v=d*m-g*c,S=p*c-f*m,M=i*_+s*v+l*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/M;return t[0]=_*T,t[1]=(l*p-g*s)*T,t[2]=(d*s-l*f)*T,t[3]=v*T,t[4]=(g*i-l*m)*T,t[5]=(l*c-d*i)*T,t[6]=S*T,t[7]=(s*m-p*i)*T,t[8]=(f*i-s*c)*T,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,f,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*d)+f+t,-l*p,l*m,-l*(-p*f+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(Lh.makeScale(t,i)),this}rotate(t){return this.premultiply(Lh.makeRotation(-t)),this}translate(t,i){return this.premultiply(Lh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lh=new fe;function ax(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ru(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function jM(){const r=ru("canvas");return r.style.display="block",r}const A_={};function $o(r){r in A_||(A_[r]=!0,console.warn(r))}function YM(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function ZM(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function KM(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const we={enabled:!0,workingColorSpace:Yr,spaces:{},convert:function(r,t,i){return this.enabled===!1||t===i||!t||!i||(this.spaces[t].transfer===ke&&(r.r=Sa(r.r),r.g=Sa(r.g),r.b=Sa(r.b)),this.spaces[t].primaries!==this.spaces[i].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[i].fromXYZ)),this.spaces[i].transfer===ke&&(r.r=Gr(r.r),r.g=Gr(r.g),r.b=Gr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===is?du:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,i){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[i].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Sa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const w_=[.64,.33,.3,.6,.15,.06],R_=[.2126,.7152,.0722],C_=[.3127,.329],D_=new fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),U_=new fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);we.define({[Yr]:{primaries:w_,whitePoint:C_,transfer:du,toXYZ:D_,fromXYZ:U_,luminanceCoefficients:R_,workingColorSpaceConfig:{unpackColorSpace:Ei},outputColorSpaceConfig:{drawingBufferColorSpace:Ei}},[Ei]:{primaries:w_,whitePoint:C_,transfer:ke,toXYZ:D_,fromXYZ:U_,luminanceCoefficients:R_,outputColorSpaceConfig:{drawingBufferColorSpace:Ei}}});let Er;class QM{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Er===void 0&&(Er=ru("canvas")),Er.width=t.width,Er.height=t.height;const s=Er.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Er}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=ru("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Sa(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Sa(i[s]/255)*255):i[s]=Sa(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let JM=0;class sx{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:JM++}),this.uuid=al(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(Nh(l[f].image)):c.push(Nh(l[f]))}else c=Nh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function Nh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?QM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $M=0;class ti extends Zr{constructor(t=ti.DEFAULT_IMAGE,i=ti.DEFAULT_MAPPING,s=Bs,l=Bs,c=Wi,f=Is,d=Pi,m=Ma,p=ti.DEFAULT_ANISOTROPY,g=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=al(),this.name="",this.source=new sx(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Md:t.x=t.x-Math.floor(t.x);break;case Bs:t.x=t.x<0?0:1;break;case Ed:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Md:t.y=t.y-Math.floor(t.y);break;case Bs:t.y=t.y<0?0:1;break;case Ed:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ti.DEFAULT_IMAGE=null;ti.DEFAULT_MAPPING=Wv;ti.DEFAULT_ANISOTROPY=1;class Xe{constructor(t=0,i=0,s=0,l=1){Xe.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,p=m[0],g=m[4],_=m[8],v=m[1],S=m[5],M=m[9],T=m[2],E=m[6],x=m[10];if(Math.abs(g-v)<.01&&Math.abs(_-T)<.01&&Math.abs(M-E)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+T)<.1&&Math.abs(M+E)<.1&&Math.abs(p+S+x-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const U=(p+1)/2,R=(S+1)/2,Y=(x+1)/2,B=(g+v)/4,O=(_+T)/4,H=(M+E)/4;return U>R&&U>Y?U<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(U),l=B/s,c=O/s):R>Y?R<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(R),s=B/l,c=H/l):Y<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(Y),s=O/c,l=H/c),this.set(s,l,c,i),this}let L=Math.sqrt((E-M)*(E-M)+(_-T)*(_-T)+(v-g)*(v-g));return Math.abs(L)<.001&&(L=1),this.x=(E-M)/L,this.y=(_-T)/L,this.z=(v-g)/L,this.w=Math.acos((p+S+x-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this.w=Math.max(t.w,Math.min(i.w,this.w)),this}clampScalar(t,i){return this.x=Math.max(t,Math.min(i,this.x)),this.y=Math.max(t,Math.min(i,this.y)),this.z=Math.max(t,Math.min(i,this.z)),this.w=Math.max(t,Math.min(i,this.w)),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(i,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tE extends Zr{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new Xe(0,0,t,i),this.scissorTest=!1,this.viewport=new Xe(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new ti(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const f=s.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const i=Object.assign({},t.texture.image);return this.texture.source=new sx(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gs extends tE{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class rx extends ti{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=zi,this.minFilter=zi,this.wrapR=Bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class eE extends ti{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=zi,this.minFilter=zi,this.wrapR=Bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sl{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,f,d){let m=s[l+0],p=s[l+1],g=s[l+2],_=s[l+3];const v=c[f+0],S=c[f+1],M=c[f+2],T=c[f+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=g,t[i+3]=_;return}if(d===1){t[i+0]=v,t[i+1]=S,t[i+2]=M,t[i+3]=T;return}if(_!==T||m!==v||p!==S||g!==M){let E=1-d;const x=m*v+p*S+g*M+_*T,L=x>=0?1:-1,U=1-x*x;if(U>Number.EPSILON){const Y=Math.sqrt(U),B=Math.atan2(Y,x*L);E=Math.sin(E*B)/Y,d=Math.sin(d*B)/Y}const R=d*L;if(m=m*E+v*R,p=p*E+S*R,g=g*E+M*R,_=_*E+T*R,E===1-d){const Y=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=Y,p*=Y,g*=Y,_*=Y}}t[i]=m,t[i+1]=p,t[i+2]=g,t[i+3]=_}static multiplyQuaternionsFlat(t,i,s,l,c,f){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],_=c[f],v=c[f+1],S=c[f+2],M=c[f+3];return t[i]=d*M+g*_+m*S-p*v,t[i+1]=m*M+g*v+p*_-d*S,t[i+2]=p*M+g*S+d*v-m*_,t[i+3]=g*M-d*_-m*v-p*S,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),_=d(c/2),v=m(s/2),S=m(l/2),M=m(c/2);switch(f){case"XYZ":this._x=v*g*_+p*S*M,this._y=p*S*_-v*g*M,this._z=p*g*M+v*S*_,this._w=p*g*_-v*S*M;break;case"YXZ":this._x=v*g*_+p*S*M,this._y=p*S*_-v*g*M,this._z=p*g*M-v*S*_,this._w=p*g*_+v*S*M;break;case"ZXY":this._x=v*g*_-p*S*M,this._y=p*S*_+v*g*M,this._z=p*g*M+v*S*_,this._w=p*g*_-v*S*M;break;case"ZYX":this._x=v*g*_-p*S*M,this._y=p*S*_+v*g*M,this._z=p*g*M-v*S*_,this._w=p*g*_+v*S*M;break;case"YZX":this._x=v*g*_+p*S*M,this._y=p*S*_+v*g*M,this._z=p*g*M-v*S*_,this._w=p*g*_-v*S*M;break;case"XZY":this._x=v*g*_-p*S*M,this._y=p*S*_-v*g*M,this._z=p*g*M+v*S*_,this._w=p*g*_+v*S*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],f=i[1],d=i[5],m=i[9],p=i[2],g=i[6],_=i[10],v=s+d+_;if(v>0){const S=.5/Math.sqrt(v+1);this._w=.25/S,this._x=(g-m)*S,this._y=(c-p)*S,this._z=(f-l)*S}else if(s>d&&s>_){const S=2*Math.sqrt(1+s-d-_);this._w=(g-m)/S,this._x=.25*S,this._y=(l+f)/S,this._z=(c+p)/S}else if(d>_){const S=2*Math.sqrt(1+d-s-_);this._w=(c-p)/S,this._x=(l+f)/S,this._y=.25*S,this._z=(m+g)/S}else{const S=2*Math.sqrt(1+_-s-d);this._w=(f-l)/S,this._x=(c+p)/S,this._y=(m+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qn(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,f=t._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=s*g+f*d+l*p-c*m,this._y=l*g+f*m+c*d-s*p,this._z=c*g+f*p+s*m-l*d,this._w=f*g-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,f=this._w;let d=f*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=f,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const S=1-i;return this._w=S*f+i*this._w,this._x=S*s+i*this._x,this._y=S*l+i*this._y,this._z=S*c+i*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),_=Math.sin((1-i)*g)/p,v=Math.sin(i*g)/p;return this._w=f*_+this._w*v,this._x=s*_+this._x*v,this._y=l*_+this._y*v,this._z=c*_+this._z*v,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,i=0,s=0){V.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(L_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(L_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,f=t.y,d=t.z,m=t.w,p=2*(f*l-d*s),g=2*(d*i-c*l),_=2*(c*s-f*i);return this.x=i+m*p+f*_-d*g,this.y=s+m*g+d*p-c*_,this.z=l+m*_+c*g-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this}clampScalar(t,i){return this.x=Math.max(t,Math.min(i,this.x)),this.y=Math.max(t,Math.min(i,this.y)),this.z=Math.max(t,Math.min(i,this.z)),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(i,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,f=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*f-s*m,this.z=s*d-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Oh.copy(this).projectOnVector(t),this.sub(Oh)}reflect(t){return this.sub(Oh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(Qn(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oh=new V,L_=new sl;class rl{constructor(t=new V(1/0,1/0,1/0),i=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Li.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Li.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Li.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,Li):Li.fromBufferAttribute(c,f),Li.applyMatrix4(t.matrixWorld),this.expandByPoint(Li);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Mc.copy(s.boundingBox)),Mc.applyMatrix4(t.matrixWorld),this.union(Mc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Li),Li.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qo),Ec.subVectors(this.max,qo),Tr.subVectors(t.a,qo),br.subVectors(t.b,qo),Ar.subVectors(t.c,qo),Za.subVectors(br,Tr),Ka.subVectors(Ar,br),As.subVectors(Tr,Ar);let i=[0,-Za.z,Za.y,0,-Ka.z,Ka.y,0,-As.z,As.y,Za.z,0,-Za.x,Ka.z,0,-Ka.x,As.z,0,-As.x,-Za.y,Za.x,0,-Ka.y,Ka.x,0,-As.y,As.x,0];return!Ph(i,Tr,br,Ar,Ec)||(i=[1,0,0,0,1,0,0,0,1],!Ph(i,Tr,br,Ar,Ec))?!1:(Tc.crossVectors(Za,Ka),i=[Tc.x,Tc.y,Tc.z],Ph(i,Tr,br,Ar,Ec))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Li).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Li).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ha[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ha[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ha[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ha[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ha[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ha[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ha[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ha[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ha),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ha=[new V,new V,new V,new V,new V,new V,new V,new V],Li=new V,Mc=new rl,Tr=new V,br=new V,Ar=new V,Za=new V,Ka=new V,As=new V,qo=new V,Ec=new V,Tc=new V,ws=new V;function Ph(r,t,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){ws.fromArray(r,c);const d=l.x*Math.abs(ws.x)+l.y*Math.abs(ws.y)+l.z*Math.abs(ws.z),m=t.dot(ws),p=i.dot(ws),g=s.dot(ws);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const nE=new rl,jo=new V,zh=new V;class ol{constructor(t=new V,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):nE.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;jo.subVectors(t,this.center);const i=jo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(jo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(zh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(jo.copy(t.center).add(zh)),this.expandByPoint(jo.copy(t.center).sub(zh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const da=new V,Bh=new V,bc=new V,Qa=new V,Ih=new V,Ac=new V,Fh=new V;class pu{constructor(t=new V,i=new V(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,da)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=da.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(da.copy(this.origin).addScaledVector(this.direction,i),da.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){Bh.copy(t).add(i).multiplyScalar(.5),bc.copy(i).sub(t).normalize(),Qa.copy(this.origin).sub(Bh);const c=t.distanceTo(i)*.5,f=-this.direction.dot(bc),d=Qa.dot(this.direction),m=-Qa.dot(bc),p=Qa.lengthSq(),g=Math.abs(1-f*f);let _,v,S,M;if(g>0)if(_=f*m-d,v=f*d-m,M=c*g,_>=0)if(v>=-M)if(v<=M){const T=1/g;_*=T,v*=T,S=_*(_+f*v+2*d)+v*(f*_+v+2*m)+p}else v=c,_=Math.max(0,-(f*v+d)),S=-_*_+v*(v+2*m)+p;else v=-c,_=Math.max(0,-(f*v+d)),S=-_*_+v*(v+2*m)+p;else v<=-M?(_=Math.max(0,-(-f*c+d)),v=_>0?-c:Math.min(Math.max(-c,-m),c),S=-_*_+v*(v+2*m)+p):v<=M?(_=0,v=Math.min(Math.max(-c,-m),c),S=v*(v+2*m)+p):(_=Math.max(0,-(f*c+d)),v=_>0?c:Math.min(Math.max(-c,-m),c),S=-_*_+v*(v+2*m)+p);else v=f>0?-c:c,_=Math.max(0,-(f*v+d)),S=-_*_+v*(v+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Bh).addScaledVector(bc,v),S}intersectSphere(t,i){da.subVectors(t.center,this.origin);const s=da.dot(this.direction),l=da.dot(da)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=s-f,m=s+f;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,f,d,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return p>=0?(s=(t.min.x-v.x)*p,l=(t.max.x-v.x)*p):(s=(t.max.x-v.x)*p,l=(t.min.x-v.x)*p),g>=0?(c=(t.min.y-v.y)*g,f=(t.max.y-v.y)*g):(c=(t.max.y-v.y)*g,f=(t.min.y-v.y)*g),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(d=(t.min.z-v.z)*_,m=(t.max.z-v.z)*_):(d=(t.max.z-v.z)*_,m=(t.min.z-v.z)*_),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,da)!==null}intersectTriangle(t,i,s,l,c){Ih.subVectors(i,t),Ac.subVectors(s,t),Fh.crossVectors(Ih,Ac);let f=this.direction.dot(Fh),d;if(f>0){if(l)return null;d=1}else if(f<0)d=-1,f=-f;else return null;Qa.subVectors(this.origin,t);const m=d*this.direction.dot(Ac.crossVectors(Qa,Ac));if(m<0)return null;const p=d*this.direction.dot(Ih.cross(Qa));if(p<0||m+p>f)return null;const g=-d*Qa.dot(Fh);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ye{constructor(t,i,s,l,c,f,d,m,p,g,_,v,S,M,T,E){Ye.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,d,m,p,g,_,v,S,M,T,E)}set(t,i,s,l,c,f,d,m,p,g,_,v,S,M,T,E){const x=this.elements;return x[0]=t,x[4]=i,x[8]=s,x[12]=l,x[1]=c,x[5]=f,x[9]=d,x[13]=m,x[2]=p,x[6]=g,x[10]=_,x[14]=v,x[3]=S,x[7]=M,x[11]=T,x[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ye().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/wr.setFromMatrixColumn(t,0).length(),c=1/wr.setFromMatrixColumn(t,1).length(),f=1/wr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const v=f*g,S=f*_,M=d*g,T=d*_;i[0]=m*g,i[4]=-m*_,i[8]=p,i[1]=S+M*p,i[5]=v-T*p,i[9]=-d*m,i[2]=T-v*p,i[6]=M+S*p,i[10]=f*m}else if(t.order==="YXZ"){const v=m*g,S=m*_,M=p*g,T=p*_;i[0]=v+T*d,i[4]=M*d-S,i[8]=f*p,i[1]=f*_,i[5]=f*g,i[9]=-d,i[2]=S*d-M,i[6]=T+v*d,i[10]=f*m}else if(t.order==="ZXY"){const v=m*g,S=m*_,M=p*g,T=p*_;i[0]=v-T*d,i[4]=-f*_,i[8]=M+S*d,i[1]=S+M*d,i[5]=f*g,i[9]=T-v*d,i[2]=-f*p,i[6]=d,i[10]=f*m}else if(t.order==="ZYX"){const v=f*g,S=f*_,M=d*g,T=d*_;i[0]=m*g,i[4]=M*p-S,i[8]=v*p+T,i[1]=m*_,i[5]=T*p+v,i[9]=S*p-M,i[2]=-p,i[6]=d*m,i[10]=f*m}else if(t.order==="YZX"){const v=f*m,S=f*p,M=d*m,T=d*p;i[0]=m*g,i[4]=T-v*_,i[8]=M*_+S,i[1]=_,i[5]=f*g,i[9]=-d*g,i[2]=-p*g,i[6]=S*_+M,i[10]=v-T*_}else if(t.order==="XZY"){const v=f*m,S=f*p,M=d*m,T=d*p;i[0]=m*g,i[4]=-_,i[8]=p*g,i[1]=v*_+T,i[5]=f*g,i[9]=S*_-M,i[2]=M*_-S,i[6]=d*g,i[10]=T*_+v}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(iE,t,aE)}lookAt(t,i,s){const l=this.elements;return li.subVectors(t,i),li.lengthSq()===0&&(li.z=1),li.normalize(),Ja.crossVectors(s,li),Ja.lengthSq()===0&&(Math.abs(s.z)===1?li.x+=1e-4:li.z+=1e-4,li.normalize(),Ja.crossVectors(s,li)),Ja.normalize(),wc.crossVectors(li,Ja),l[0]=Ja.x,l[4]=wc.x,l[8]=li.x,l[1]=Ja.y,l[5]=wc.y,l[9]=li.y,l[2]=Ja.z,l[6]=wc.z,l[10]=li.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],d=s[4],m=s[8],p=s[12],g=s[1],_=s[5],v=s[9],S=s[13],M=s[2],T=s[6],E=s[10],x=s[14],L=s[3],U=s[7],R=s[11],Y=s[15],B=l[0],O=l[4],H=l[8],D=l[12],w=l[1],F=l[5],nt=l[9],rt=l[13],ht=l[2],mt=l[6],z=l[10],Q=l[14],K=l[3],St=l[7],Tt=l[11],P=l[15];return c[0]=f*B+d*w+m*ht+p*K,c[4]=f*O+d*F+m*mt+p*St,c[8]=f*H+d*nt+m*z+p*Tt,c[12]=f*D+d*rt+m*Q+p*P,c[1]=g*B+_*w+v*ht+S*K,c[5]=g*O+_*F+v*mt+S*St,c[9]=g*H+_*nt+v*z+S*Tt,c[13]=g*D+_*rt+v*Q+S*P,c[2]=M*B+T*w+E*ht+x*K,c[6]=M*O+T*F+E*mt+x*St,c[10]=M*H+T*nt+E*z+x*Tt,c[14]=M*D+T*rt+E*Q+x*P,c[3]=L*B+U*w+R*ht+Y*K,c[7]=L*O+U*F+R*mt+Y*St,c[11]=L*H+U*nt+R*z+Y*Tt,c[15]=L*D+U*rt+R*Q+Y*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],f=t[1],d=t[5],m=t[9],p=t[13],g=t[2],_=t[6],v=t[10],S=t[14],M=t[3],T=t[7],E=t[11],x=t[15];return M*(+c*m*_-l*p*_-c*d*v+s*p*v+l*d*S-s*m*S)+T*(+i*m*S-i*p*v+c*f*v-l*f*S+l*p*g-c*m*g)+E*(+i*p*_-i*d*S-c*f*_+s*f*S+c*d*g-s*p*g)+x*(-l*d*g-i*m*_+i*d*v+l*f*_-s*f*v+s*m*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=t[9],v=t[10],S=t[11],M=t[12],T=t[13],E=t[14],x=t[15],L=_*E*p-T*v*p+T*m*S-d*E*S-_*m*x+d*v*x,U=M*v*p-g*E*p-M*m*S+f*E*S+g*m*x-f*v*x,R=g*T*p-M*_*p+M*d*S-f*T*S-g*d*x+f*_*x,Y=M*_*m-g*T*m-M*d*v+f*T*v+g*d*E-f*_*E,B=i*L+s*U+l*R+c*Y;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/B;return t[0]=L*O,t[1]=(T*v*c-_*E*c-T*l*S+s*E*S+_*l*x-s*v*x)*O,t[2]=(d*E*c-T*m*c+T*l*p-s*E*p-d*l*x+s*m*x)*O,t[3]=(_*m*c-d*v*c-_*l*p+s*v*p+d*l*S-s*m*S)*O,t[4]=U*O,t[5]=(g*E*c-M*v*c+M*l*S-i*E*S-g*l*x+i*v*x)*O,t[6]=(M*m*c-f*E*c-M*l*p+i*E*p+f*l*x-i*m*x)*O,t[7]=(f*v*c-g*m*c+g*l*p-i*v*p-f*l*S+i*m*S)*O,t[8]=R*O,t[9]=(M*_*c-g*T*c-M*s*S+i*T*S+g*s*x-i*_*x)*O,t[10]=(f*T*c-M*d*c+M*s*p-i*T*p-f*s*x+i*d*x)*O,t[11]=(g*d*c-f*_*c-g*s*p+i*_*p+f*s*S-i*d*S)*O,t[12]=Y*O,t[13]=(g*T*l-M*_*l+M*s*v-i*T*v-g*s*E+i*_*E)*O,t[14]=(M*d*l-f*T*l-M*s*m+i*T*m+f*s*E-i*d*E)*O,t[15]=(f*_*l-g*d*l+g*s*m-i*_*m-f*s*v+i*d*v)*O,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=t.x,d=t.y,m=t.z,p=c*f,g=c*d;return this.set(p*f+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*f,0,p*m-l*d,g*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,f=i._y,d=i._z,m=i._w,p=c+c,g=f+f,_=d+d,v=c*p,S=c*g,M=c*_,T=f*g,E=f*_,x=d*_,L=m*p,U=m*g,R=m*_,Y=s.x,B=s.y,O=s.z;return l[0]=(1-(T+x))*Y,l[1]=(S+R)*Y,l[2]=(M-U)*Y,l[3]=0,l[4]=(S-R)*B,l[5]=(1-(v+x))*B,l[6]=(E+L)*B,l[7]=0,l[8]=(M+U)*O,l[9]=(E-L)*O,l[10]=(1-(v+T))*O,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let c=wr.set(l[0],l[1],l[2]).length();const f=wr.set(l[4],l[5],l[6]).length(),d=wr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Ni.copy(this);const p=1/c,g=1/f,_=1/d;return Ni.elements[0]*=p,Ni.elements[1]*=p,Ni.elements[2]*=p,Ni.elements[4]*=g,Ni.elements[5]*=g,Ni.elements[6]*=g,Ni.elements[8]*=_,Ni.elements[9]*=_,Ni.elements[10]*=_,i.setFromRotationMatrix(Ni),s.x=c,s.y=f,s.z=d,this}makePerspective(t,i,s,l,c,f,d=ya){const m=this.elements,p=2*c/(i-t),g=2*c/(s-l),_=(i+t)/(i-t),v=(s+l)/(s-l);let S,M;if(d===ya)S=-(f+c)/(f-c),M=-2*f*c/(f-c);else if(d===su)S=-f/(f-c),M=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=_,m[12]=0,m[1]=0,m[5]=g,m[9]=v,m[13]=0,m[2]=0,m[6]=0,m[10]=S,m[14]=M,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,s,l,c,f,d=ya){const m=this.elements,p=1/(i-t),g=1/(s-l),_=1/(f-c),v=(i+t)*p,S=(s+l)*g;let M,T;if(d===ya)M=(f+c)*_,T=-2*_;else if(d===su)M=c*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-v,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-S,m[2]=0,m[6]=0,m[10]=T,m[14]=-M,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const wr=new V,Ni=new Ye,iE=new V(0,0,0),aE=new V(1,1,1),Ja=new V,wc=new V,li=new V,N_=new Ye,O_=new sl;class qi{constructor(t=0,i=0,s=0,l=qi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],m=l[1],p=l[5],g=l[9],_=l[2],v=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(Qn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Qn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Qn(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Qn(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(Qn(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-Qn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return N_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(N_,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return O_.setFromEuler(this),this.setFromQuaternion(O_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qi.DEFAULT_ORDER="XYZ";class up{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let sE=0;const P_=new V,Rr=new sl,pa=new Ye,Rc=new V,Yo=new V,rE=new V,oE=new sl,z_=new V(1,0,0),B_=new V(0,1,0),I_=new V(0,0,1),F_={type:"added"},lE={type:"removed"},Cr={type:"childadded",child:null},Hh={type:"childremoved",child:null};class bn extends Zr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sE++}),this.uuid=al(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bn.DEFAULT_UP.clone();const t=new V,i=new qi,s=new sl,l=new V(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ye},normalMatrix:{value:new fe}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new up,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Rr.setFromAxisAngle(t,i),this.quaternion.multiply(Rr),this}rotateOnWorldAxis(t,i){return Rr.setFromAxisAngle(t,i),this.quaternion.premultiply(Rr),this}rotateX(t){return this.rotateOnAxis(z_,t)}rotateY(t){return this.rotateOnAxis(B_,t)}rotateZ(t){return this.rotateOnAxis(I_,t)}translateOnAxis(t,i){return P_.copy(t).applyQuaternion(this.quaternion),this.position.add(P_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(z_,t)}translateY(t){return this.translateOnAxis(B_,t)}translateZ(t){return this.translateOnAxis(I_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pa.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Rc.copy(t):Rc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pa.lookAt(Yo,Rc,this.up):pa.lookAt(Rc,Yo,this.up),this.quaternion.setFromRotationMatrix(pa),l&&(pa.extractRotation(l.matrixWorld),Rr.setFromRotationMatrix(pa),this.quaternion.premultiply(Rr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(F_),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(lE),Hh.child=t,this.dispatchEvent(Hh),Hh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pa.multiply(t.parent.matrixWorld)),t.applyMatrix4(pa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(F_),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,t,rE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,oE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(i){const d=f(t.geometries),m=f(t.materials),p=f(t.textures),g=f(t.images),_=f(t.shapes),v=f(t.skeletons),S=f(t.animations),M=f(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),_.length>0&&(s.shapes=_),v.length>0&&(s.skeletons=v),S.length>0&&(s.animations=S),M.length>0&&(s.nodes=M)}return s.object=l,s;function f(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}bn.DEFAULT_UP=new V(0,1,0);bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Oi=new V,ma=new V,Gh=new V,ga=new V,Dr=new V,Ur=new V,H_=new V,Vh=new V,kh=new V,Xh=new V,Wh=new Xe,qh=new Xe,jh=new Xe;class bi{constructor(t=new V,i=new V,s=new V){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Oi.subVectors(t,i),l.cross(Oi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Oi.subVectors(l,i),ma.subVectors(s,i),Gh.subVectors(t,i);const f=Oi.dot(Oi),d=Oi.dot(ma),m=Oi.dot(Gh),p=ma.dot(ma),g=ma.dot(Gh),_=f*p-d*d;if(_===0)return c.set(0,0,0),null;const v=1/_,S=(p*m-d*g)*v,M=(f*g-d*m)*v;return c.set(1-S-M,M,S)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,ga)===null?!1:ga.x>=0&&ga.y>=0&&ga.x+ga.y<=1}static getInterpolation(t,i,s,l,c,f,d,m){return this.getBarycoord(t,i,s,l,ga)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ga.x),m.addScaledVector(f,ga.y),m.addScaledVector(d,ga.z),m)}static getInterpolatedAttribute(t,i,s,l,c,f){return Wh.setScalar(0),qh.setScalar(0),jh.setScalar(0),Wh.fromBufferAttribute(t,i),qh.fromBufferAttribute(t,s),jh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Wh,c.x),f.addScaledVector(qh,c.y),f.addScaledVector(jh,c.z),f}static isFrontFacing(t,i,s,l){return Oi.subVectors(s,i),ma.subVectors(t,i),Oi.cross(ma).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Oi.subVectors(this.c,this.b),ma.subVectors(this.a,this.b),Oi.cross(ma).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return bi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return bi.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let f,d;Dr.subVectors(l,s),Ur.subVectors(c,s),Vh.subVectors(t,s);const m=Dr.dot(Vh),p=Ur.dot(Vh);if(m<=0&&p<=0)return i.copy(s);kh.subVectors(t,l);const g=Dr.dot(kh),_=Ur.dot(kh);if(g>=0&&_<=g)return i.copy(l);const v=m*_-g*p;if(v<=0&&m>=0&&g<=0)return f=m/(m-g),i.copy(s).addScaledVector(Dr,f);Xh.subVectors(t,c);const S=Dr.dot(Xh),M=Ur.dot(Xh);if(M>=0&&S<=M)return i.copy(c);const T=S*p-m*M;if(T<=0&&p>=0&&M<=0)return d=p/(p-M),i.copy(s).addScaledVector(Ur,d);const E=g*M-S*_;if(E<=0&&_-g>=0&&S-M>=0)return H_.subVectors(c,l),d=(_-g)/(_-g+(S-M)),i.copy(l).addScaledVector(H_,d);const x=1/(E+T+v);return f=T*x,d=v*x,i.copy(s).addScaledVector(Dr,f).addScaledVector(Ur,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ox={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$a={h:0,s:0,l:0},Cc={h:0,s:0,l:0};function Yh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class ae{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=Ei){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=we.workingColorSpace){return this.r=t,this.g=i,this.b=s,we.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=we.workingColorSpace){if(t=qM(t,1),i=Qn(i,0,1),s=Qn(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=Yh(f,c,t+1/3),this.g=Yh(f,c,t),this.b=Yh(f,c,t-1/3)}return we.toWorkingColorSpace(this,l),this}setStyle(t,i=Ei){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=Ei){const s=ox[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sa(t.r),this.g=Sa(t.g),this.b=Sa(t.b),this}copyLinearToSRGB(t){return this.r=Gr(t.r),this.g=Gr(t.g),this.b=Gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ei){return we.fromWorkingColorSpace(Hn.copy(this),t),Math.round(Qn(Hn.r*255,0,255))*65536+Math.round(Qn(Hn.g*255,0,255))*256+Math.round(Qn(Hn.b*255,0,255))}getHexString(t=Ei){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=we.workingColorSpace){we.fromWorkingColorSpace(Hn.copy(this),i);const s=Hn.r,l=Hn.g,c=Hn.b,f=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const g=(d+f)/2;if(d===f)m=0,p=0;else{const _=f-d;switch(p=g<=.5?_/(f+d):_/(2-f-d),f){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,i=we.workingColorSpace){return we.fromWorkingColorSpace(Hn.copy(this),i),t.r=Hn.r,t.g=Hn.g,t.b=Hn.b,t}getStyle(t=Ei){we.fromWorkingColorSpace(Hn.copy(this),t);const i=Hn.r,s=Hn.g,l=Hn.b;return t!==Ei?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL($a),this.setHSL($a.h+t,$a.s+i,$a.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL($a),t.getHSL(Cc);const s=Uh($a.h,Cc.h,i),l=Uh($a.s,Cc.s,i),c=Uh($a.l,Cc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Hn=new ae;ae.NAMES=ox;let cE=0;class Vs extends Zr{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cE++}),this.uuid=al(),this.name="",this.blending=Fr,this.side=rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fd,this.blendDst=hd,this.blendEquation=Os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=Vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=E_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mr,this.stencilZFail=Mr,this.stencilZPass=Mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Fr&&(s.blending=this.blending),this.side!==rs&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==fd&&(s.blendSrc=this.blendSrc),this.blendDst!==hd&&(s.blendDst=this.blendDst),this.blendEquation!==Os&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Vr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==E_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Mr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Mr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const d in c){const m=c[d];delete m.metadata,f.push(m)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ou extends Vs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.combine=Xv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pn=new V,Dc=new Te;class Jn{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=T_,this.updateRanges=[],this.gpuType=xa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Dc.fromBufferAttribute(this,i),Dc.applyMatrix3(t),this.setXY(i,Dc.x,Dc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix3(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix4(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyNormalMatrix(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.transformDirection(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Wo(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Kn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Wo(i,this.array)),i}setX(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Wo(i,this.array)),i}setY(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Wo(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Wo(i,this.array)),i}setW(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Kn(i,this.array),s=Kn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Kn(i,this.array),s=Kn(s,this.array),l=Kn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Kn(i,this.array),s=Kn(s,this.array),l=Kn(l,this.array),c=Kn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==T_&&(t.usage=this.usage),t}}class lx extends Jn{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class cx extends Jn{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class nn extends Jn{constructor(t,i,s){super(new Float32Array(t),i,s)}}let uE=0;const Mi=new Ye,Zh=new bn,Lr=new V,ci=new rl,Zo=new rl,En=new V;class An extends Zr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uE++}),this.uuid=al(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ax(t)?cx:lx)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new fe().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Mi.makeRotationFromQuaternion(t),this.applyMatrix4(Mi),this}rotateX(t){return Mi.makeRotationX(t),this.applyMatrix4(Mi),this}rotateY(t){return Mi.makeRotationY(t),this.applyMatrix4(Mi),this}rotateZ(t){return Mi.makeRotationZ(t),this.applyMatrix4(Mi),this}translate(t,i,s){return Mi.makeTranslation(t,i,s),this.applyMatrix4(Mi),this}scale(t,i,s){return Mi.makeScale(t,i,s),this.applyMatrix4(Mi),this}lookAt(t){return Zh.lookAt(t),Zh.updateMatrix(),this.applyMatrix4(Zh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lr).negate(),this.translate(Lr.x,Lr.y,Lr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new nn(s,3))}else{for(let s=0,l=i.count;s<l;s++){const c=t[s];i.setXYZ(s,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rl);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ci.setFromBufferAttribute(c),this.morphTargetsRelative?(En.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(En),En.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(En)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ol);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const s=this.boundingSphere.center;if(ci.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const d=i[c];Zo.setFromBufferAttribute(d),this.morphTargetsRelative?(En.addVectors(ci.min,Zo.min),ci.expandByPoint(En),En.addVectors(ci.max,Zo.max),ci.expandByPoint(En)):(ci.expandByPoint(Zo.min),ci.expandByPoint(Zo.max))}ci.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)En.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(En));if(i)for(let c=0,f=i.length;c<f;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)En.fromBufferAttribute(d,p),m&&(Lr.fromBufferAttribute(t,p),En.add(Lr)),l=Math.max(l,s.distanceToSquared(En))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jn(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),d=[],m=[];for(let H=0;H<s.count;H++)d[H]=new V,m[H]=new V;const p=new V,g=new V,_=new V,v=new Te,S=new Te,M=new Te,T=new V,E=new V;function x(H,D,w){p.fromBufferAttribute(s,H),g.fromBufferAttribute(s,D),_.fromBufferAttribute(s,w),v.fromBufferAttribute(c,H),S.fromBufferAttribute(c,D),M.fromBufferAttribute(c,w),g.sub(p),_.sub(p),S.sub(v),M.sub(v);const F=1/(S.x*M.y-M.x*S.y);isFinite(F)&&(T.copy(g).multiplyScalar(M.y).addScaledVector(_,-S.y).multiplyScalar(F),E.copy(_).multiplyScalar(S.x).addScaledVector(g,-M.x).multiplyScalar(F),d[H].add(T),d[D].add(T),d[w].add(T),m[H].add(E),m[D].add(E),m[w].add(E))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let H=0,D=L.length;H<D;++H){const w=L[H],F=w.start,nt=w.count;for(let rt=F,ht=F+nt;rt<ht;rt+=3)x(t.getX(rt+0),t.getX(rt+1),t.getX(rt+2))}const U=new V,R=new V,Y=new V,B=new V;function O(H){Y.fromBufferAttribute(l,H),B.copy(Y);const D=d[H];U.copy(D),U.sub(Y.multiplyScalar(Y.dot(D))).normalize(),R.crossVectors(B,D);const F=R.dot(m[H])<0?-1:1;f.setXYZW(H,U.x,U.y,U.z,F)}for(let H=0,D=L.length;H<D;++H){const w=L[H],F=w.start,nt=w.count;for(let rt=F,ht=F+nt;rt<ht;rt+=3)O(t.getX(rt+0)),O(t.getX(rt+1)),O(t.getX(rt+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Jn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let v=0,S=s.count;v<S;v++)s.setXYZ(v,0,0,0);const l=new V,c=new V,f=new V,d=new V,m=new V,p=new V,g=new V,_=new V;if(t)for(let v=0,S=t.count;v<S;v+=3){const M=t.getX(v+0),T=t.getX(v+1),E=t.getX(v+2);l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,T),f.fromBufferAttribute(i,E),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(s,M),m.fromBufferAttribute(s,T),p.fromBufferAttribute(s,E),d.add(g),m.add(g),p.add(g),s.setXYZ(M,d.x,d.y,d.z),s.setXYZ(T,m.x,m.y,m.z),s.setXYZ(E,p.x,p.y,p.z)}else for(let v=0,S=i.count;v<S;v+=3)l.fromBufferAttribute(i,v+0),c.fromBufferAttribute(i,v+1),f.fromBufferAttribute(i,v+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),s.setXYZ(v+0,g.x,g.y,g.z),s.setXYZ(v+1,g.x,g.y,g.z),s.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)En.fromBufferAttribute(t,i),En.normalize(),t.setXYZ(i,En.x,En.y,En.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,_=d.normalized,v=new p.constructor(m.length*g);let S=0,M=0;for(let T=0,E=m.length;T<E;T++){d.isInterleavedBufferAttribute?S=m[T]*d.data.stride+d.offset:S=m[T]*g;for(let x=0;x<g;x++)v[M++]=p[S++]}return new Jn(v,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new An,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,_=p.length;g<_;g++){const v=p[g],S=t(v,s);m.push(S)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const p=f[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,v=p.length;_<v;_++){const S=p[_];g.push(S.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const c=t.morphAttributes;for(const p in c){const g=[],_=c[p];for(let v=0,S=_.length;v<S;v++)g.push(_[v].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,g=f.length;p<g;p++){const _=f[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const G_=new Ye,Rs=new pu,Uc=new ol,V_=new V,Lc=new V,Nc=new V,Oc=new V,Kh=new V,Pc=new V,k_=new V,zc=new V;class ie extends bn{constructor(t=new An,i=new ou){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Pc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],_=c[m];g!==0&&(Kh.fromBufferAttribute(_,t),f?Pc.addScaledVector(Kh,g):Pc.addScaledVector(Kh.sub(i),g))}i.add(Pc)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Uc.copy(s.boundingSphere),Uc.applyMatrix4(c),Rs.copy(t.ray).recast(t.near),!(Uc.containsPoint(Rs.origin)===!1&&(Rs.intersectSphere(Uc,V_)===null||Rs.origin.distanceToSquared(V_)>(t.far-t.near)**2))&&(G_.copy(c).invert(),Rs.copy(t.ray).applyMatrix4(G_),!(s.boundingBox!==null&&Rs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Rs)))}_computeIntersections(t,i,s){let l;const c=this.geometry,f=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,v=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(f))for(let M=0,T=v.length;M<T;M++){const E=v[M],x=f[E.materialIndex],L=Math.max(E.start,S.start),U=Math.min(d.count,Math.min(E.start+E.count,S.start+S.count));for(let R=L,Y=U;R<Y;R+=3){const B=d.getX(R),O=d.getX(R+1),H=d.getX(R+2);l=Bc(this,x,t,s,p,g,_,B,O,H),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,S.start),T=Math.min(d.count,S.start+S.count);for(let E=M,x=T;E<x;E+=3){const L=d.getX(E),U=d.getX(E+1),R=d.getX(E+2);l=Bc(this,f,t,s,p,g,_,L,U,R),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let M=0,T=v.length;M<T;M++){const E=v[M],x=f[E.materialIndex],L=Math.max(E.start,S.start),U=Math.min(m.count,Math.min(E.start+E.count,S.start+S.count));for(let R=L,Y=U;R<Y;R+=3){const B=R,O=R+1,H=R+2;l=Bc(this,x,t,s,p,g,_,B,O,H),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,S.start),T=Math.min(m.count,S.start+S.count);for(let E=M,x=T;E<x;E+=3){const L=E,U=E+1,R=E+2;l=Bc(this,f,t,s,p,g,_,L,U,R),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}}}function fE(r,t,i,s,l,c,f,d){let m;if(t.side===$n?m=s.intersectTriangle(f,c,l,!0,d):m=s.intersectTriangle(l,c,f,t.side===rs,d),m===null)return null;zc.copy(d),zc.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(zc);return p<i.near||p>i.far?null:{distance:p,point:zc.clone(),object:r}}function Bc(r,t,i,s,l,c,f,d,m,p){r.getVertexPosition(d,Lc),r.getVertexPosition(m,Nc),r.getVertexPosition(p,Oc);const g=fE(r,t,i,s,Lc,Nc,Oc,k_);if(g){const _=new V;bi.getBarycoord(k_,Lc,Nc,Oc,_),l&&(g.uv=bi.getInterpolatedAttribute(l,d,m,p,_,new Te)),c&&(g.uv1=bi.getInterpolatedAttribute(c,d,m,p,_,new Te)),f&&(g.normal=bi.getInterpolatedAttribute(f,d,m,p,_,new V),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const v={a:d,b:m,c:p,normal:new V,materialIndex:0};bi.getNormal(Lc,Nc,Oc,v.normal),g.face=v,g.barycoord=_}return g}class de extends An{constructor(t=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],g=[],_=[];let v=0,S=0;M("z","y","x",-1,-1,s,i,t,f,c,0),M("z","y","x",1,-1,s,i,-t,f,c,1),M("x","z","y",1,1,t,s,i,l,f,2),M("x","z","y",1,-1,t,s,-i,l,f,3),M("x","y","z",1,-1,t,i,s,l,c,4),M("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new nn(p,3)),this.setAttribute("normal",new nn(g,3)),this.setAttribute("uv",new nn(_,2));function M(T,E,x,L,U,R,Y,B,O,H,D){const w=R/O,F=Y/H,nt=R/2,rt=Y/2,ht=B/2,mt=O+1,z=H+1;let Q=0,K=0;const St=new V;for(let Tt=0;Tt<z;Tt++){const P=Tt*F-rt;for(let at=0;at<mt;at++){const yt=at*w-nt;St[T]=yt*L,St[E]=P*U,St[x]=ht,p.push(St.x,St.y,St.z),St[T]=0,St[E]=0,St[x]=B>0?1:-1,g.push(St.x,St.y,St.z),_.push(at/O),_.push(1-Tt/H),Q+=1}}for(let Tt=0;Tt<H;Tt++)for(let P=0;P<O;P++){const at=v+P+mt*Tt,yt=v+P+mt*(Tt+1),Z=v+(P+1)+mt*(Tt+1),ut=v+(P+1)+mt*Tt;m.push(at,yt,ut),m.push(yt,Z,ut),K+=6}d.addGroup(S,K,D),S+=K,v+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new de(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function jr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function Vn(r){const t={};for(let i=0;i<r.length;i++){const s=jr(r[i]);for(const l in s)t[l]=s[l]}return t}function hE(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function ux(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const dE={clone:jr,merge:Vn};var pE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class os extends Vs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pE,this.fragmentShader=mE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=jr(t.uniforms),this.uniformsGroups=hE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class fx extends bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=ya}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ts=new V,X_=new Te,W_=new Te;class ui extends fx{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Kd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(iu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Kd*2*Math.atan(Math.tan(iu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ts.x,ts.y).multiplyScalar(-t/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ts.x,ts.y).multiplyScalar(-t/ts.z)}getViewSize(t,i){return this.getViewBounds(t,X_,W_),i.subVectors(W_,X_)}setViewOffset(t,i,s,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(iu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Nr=-90,Or=1;class gE extends bn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ui(Nr,Or,t,i);l.layers=this.layers,this.add(l);const c=new ui(Nr,Or,t,i);c.layers=this.layers,this.add(c);const f=new ui(Nr,Or,t,i);f.layers=this.layers,this.add(f);const d=new ui(Nr,Or,t,i);d.layers=this.layers,this.add(d);const m=new ui(Nr,Or,t,i);m.layers=this.layers,this.add(m);const p=new ui(Nr,Or,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,d,m]=i;for(const p of i)this.remove(p);if(t===ya)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===su)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,m,p,g]=this.children,_=t.getRenderTarget(),v=t.getActiveCubeFace(),S=t.getActiveMipmapLevel(),M=t.xr.enabled;t.xr.enabled=!1;const T=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,c),t.setRenderTarget(s,1,l),t.render(i,f),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,m),t.setRenderTarget(s,4,l),t.render(i,p),s.texture.generateMipmaps=T,t.setRenderTarget(s,5,l),t.render(i,g),t.setRenderTarget(_,v,S),t.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class hx extends ti{constructor(t,i,s,l,c,f,d,m,p,g){t=t!==void 0?t:[],i=i!==void 0?i:kr,super(t,i,s,l,c,f,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _E extends Gs{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new hx(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Wi}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new de(5,5,5),c=new os({name:"CubemapFromEquirect",uniforms:jr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:$n,blending:as});c.uniforms.tEquirect.value=i;const f=new ie(l,c),d=i.minFilter;return i.minFilter===Is&&(i.minFilter=Wi),new gE(1,10,this).update(t,f),i.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,i,s,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,s,l);t.setRenderTarget(c)}}const Qh=new V,vE=new V,xE=new fe;class ns{constructor(t=new V(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Qh.subVectors(s,i).cross(vE.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(Qh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||xE.getNormalMatrix(t),l=this.coplanarPoint(Qh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cs=new ol,Ic=new V;class fp{constructor(t=new ns,i=new ns,s=new ns,l=new ns,c=new ns,f=new ns){this.planes=[t,i,s,l,c,f]}set(t,i,s,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ya){const s=this.planes,l=t.elements,c=l[0],f=l[1],d=l[2],m=l[3],p=l[4],g=l[5],_=l[6],v=l[7],S=l[8],M=l[9],T=l[10],E=l[11],x=l[12],L=l[13],U=l[14],R=l[15];if(s[0].setComponents(m-c,v-p,E-S,R-x).normalize(),s[1].setComponents(m+c,v+p,E+S,R+x).normalize(),s[2].setComponents(m+f,v+g,E+M,R+L).normalize(),s[3].setComponents(m-f,v-g,E-M,R-L).normalize(),s[4].setComponents(m-d,v-_,E-T,R-U).normalize(),i===ya)s[5].setComponents(m+d,v+_,E+T,R+U).normalize();else if(i===su)s[5].setComponents(d,_,T,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Cs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Cs)}intersectsSprite(t){return Cs.center.set(0,0,0),Cs.radius=.7071067811865476,Cs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Cs)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Ic.x=l.normal.x>0?t.max.x:t.min.x,Ic.y=l.normal.y>0?t.max.y:t.min.y,Ic.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Ic)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function dx(){let r=null,t=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function yE(r){const t=new WeakMap;function i(d,m){const p=d.array,g=d.usage,_=p.byteLength,v=r.createBuffer();r.bindBuffer(m,v),r.bufferData(m,p,g),d.onUploadCallback();let S;if(p instanceof Float32Array)S=r.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=r.HALF_FLOAT:S=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=r.SHORT;else if(p instanceof Uint32Array)S=r.UNSIGNED_INT;else if(p instanceof Int32Array)S=r.INT;else if(p instanceof Int8Array)S=r.BYTE;else if(p instanceof Uint8Array)S=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function s(d,m,p){const g=m.array,_=m.updateRanges;if(r.bindBuffer(p,d),_.length===0)r.bufferSubData(p,0,g);else{_.sort((S,M)=>S.start-M.start);let v=0;for(let S=1;S<_.length;S++){const M=_[v],T=_[S];T.start<=M.start+M.count+1?M.count=Math.max(M.count,T.start+T.count-M.start):(++v,_[v]=T)}_.length=v+1;for(let S=0,M=_.length;S<M;S++){const T=_[S];r.bufferSubData(p,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function f(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:f}}class ll extends An{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,f=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,_=t/d,v=i/m,S=[],M=[],T=[],E=[];for(let x=0;x<g;x++){const L=x*v-f;for(let U=0;U<p;U++){const R=U*_-c;M.push(R,-L,0),T.push(0,0,1),E.push(U/d),E.push(1-x/m)}}for(let x=0;x<m;x++)for(let L=0;L<d;L++){const U=L+p*x,R=L+p*(x+1),Y=L+1+p*(x+1),B=L+1+p*x;S.push(U,R,B),S.push(R,Y,B)}this.setIndex(S),this.setAttribute("position",new nn(M,3)),this.setAttribute("normal",new nn(T,3)),this.setAttribute("uv",new nn(E,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ll(t.width,t.height,t.widthSegments,t.heightSegments)}}var SE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ME=`#ifdef USE_ALPHAHASH
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
#endif`,EE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,TE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,AE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wE=`#ifdef USE_AOMAP
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
#endif`,RE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,CE=`#ifdef USE_BATCHING
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
#endif`,DE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,UE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,LE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,NE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,OE=`#ifdef USE_IRIDESCENCE
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
#endif`,PE=`#ifdef USE_BUMPMAP
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
#endif`,zE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,BE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,IE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,FE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,HE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,GE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,VE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,kE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,XE=`#define PI 3.141592653589793
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
} // validated`,WE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qE=`vec3 transformedNormal = objectNormal;
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
#endif`,jE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,YE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ZE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,KE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,QE="gl_FragColor = linearToOutputTexel( gl_FragColor );",JE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$E=`#ifdef USE_ENVMAP
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
#endif`,t1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,e1=`#ifdef USE_ENVMAP
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
#endif`,n1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,i1=`#ifdef USE_ENVMAP
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
#endif`,a1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,s1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,r1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,o1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,l1=`#ifdef USE_GRADIENTMAP
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
}`,c1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,u1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,f1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,h1=`uniform bool receiveShadow;
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
#endif`,d1=`#ifdef USE_ENVMAP
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
#endif`,p1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,m1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,g1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,v1=`PhysicalMaterial material;
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
#endif`,x1=`struct PhysicalMaterial {
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
}`,y1=`
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
#endif`,S1=`#if defined( RE_IndirectDiffuse )
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
#endif`,M1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,E1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,T1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,w1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,R1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,C1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,D1=`#if defined( USE_POINTS_UV )
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
#endif`,U1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,L1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,N1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,O1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,P1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,z1=`#ifdef USE_MORPHTARGETS
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
#endif`,B1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,F1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,H1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,V1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,k1=`#ifdef USE_NORMALMAP
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
#endif`,X1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,W1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,q1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Y1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Z1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,K1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Q1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,J1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,aT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sT=`float getShadowMask() {
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
}`,rT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,oT=`#ifdef USE_SKINNING
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
#endif`,lT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cT=`#ifdef USE_SKINNING
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
#endif`,uT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pT=`#ifdef USE_TRANSMISSION
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
#endif`,mT=`#ifdef USE_TRANSMISSION
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
#endif`,gT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_T=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ST=`uniform sampler2D t2D;
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
}`,MT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ET=`#ifdef ENVMAP_TYPE_CUBE
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
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AT=`#include <common>
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
}`,wT=`#if DEPTH_PACKING == 3200
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
}`,RT=`#define DISTANCE
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
}`,CT=`#define DISTANCE
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
}`,DT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,UT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LT=`uniform float scale;
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
}`,NT=`uniform vec3 diffuse;
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
}`,OT=`#include <common>
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
}`,PT=`uniform vec3 diffuse;
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
}`,zT=`#define LAMBERT
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
}`,BT=`#define LAMBERT
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
}`,IT=`#define MATCAP
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
}`,FT=`#define MATCAP
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
}`,HT=`#define NORMAL
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
}`,GT=`#define NORMAL
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
}`,VT=`#define PHONG
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
}`,kT=`#define PHONG
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
}`,XT=`#define STANDARD
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
}`,WT=`#define STANDARD
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
}`,qT=`#define TOON
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
}`,jT=`#define TOON
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
}`,YT=`uniform float size;
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
}`,ZT=`uniform vec3 diffuse;
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
}`,KT=`#include <common>
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
}`,QT=`uniform vec3 color;
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
}`,JT=`uniform float rotation;
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
}`,$T=`uniform vec3 diffuse;
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
}`,he={alphahash_fragment:SE,alphahash_pars_fragment:ME,alphamap_fragment:EE,alphamap_pars_fragment:TE,alphatest_fragment:bE,alphatest_pars_fragment:AE,aomap_fragment:wE,aomap_pars_fragment:RE,batching_pars_vertex:CE,batching_vertex:DE,begin_vertex:UE,beginnormal_vertex:LE,bsdfs:NE,iridescence_fragment:OE,bumpmap_pars_fragment:PE,clipping_planes_fragment:zE,clipping_planes_pars_fragment:BE,clipping_planes_pars_vertex:IE,clipping_planes_vertex:FE,color_fragment:HE,color_pars_fragment:GE,color_pars_vertex:VE,color_vertex:kE,common:XE,cube_uv_reflection_fragment:WE,defaultnormal_vertex:qE,displacementmap_pars_vertex:jE,displacementmap_vertex:YE,emissivemap_fragment:ZE,emissivemap_pars_fragment:KE,colorspace_fragment:QE,colorspace_pars_fragment:JE,envmap_fragment:$E,envmap_common_pars_fragment:t1,envmap_pars_fragment:e1,envmap_pars_vertex:n1,envmap_physical_pars_fragment:d1,envmap_vertex:i1,fog_vertex:a1,fog_pars_vertex:s1,fog_fragment:r1,fog_pars_fragment:o1,gradientmap_pars_fragment:l1,lightmap_pars_fragment:c1,lights_lambert_fragment:u1,lights_lambert_pars_fragment:f1,lights_pars_begin:h1,lights_toon_fragment:p1,lights_toon_pars_fragment:m1,lights_phong_fragment:g1,lights_phong_pars_fragment:_1,lights_physical_fragment:v1,lights_physical_pars_fragment:x1,lights_fragment_begin:y1,lights_fragment_maps:S1,lights_fragment_end:M1,logdepthbuf_fragment:E1,logdepthbuf_pars_fragment:T1,logdepthbuf_pars_vertex:b1,logdepthbuf_vertex:A1,map_fragment:w1,map_pars_fragment:R1,map_particle_fragment:C1,map_particle_pars_fragment:D1,metalnessmap_fragment:U1,metalnessmap_pars_fragment:L1,morphinstance_vertex:N1,morphcolor_vertex:O1,morphnormal_vertex:P1,morphtarget_pars_vertex:z1,morphtarget_vertex:B1,normal_fragment_begin:I1,normal_fragment_maps:F1,normal_pars_fragment:H1,normal_pars_vertex:G1,normal_vertex:V1,normalmap_pars_fragment:k1,clearcoat_normal_fragment_begin:X1,clearcoat_normal_fragment_maps:W1,clearcoat_pars_fragment:q1,iridescence_pars_fragment:j1,opaque_fragment:Y1,packing:Z1,premultiplied_alpha_fragment:K1,project_vertex:Q1,dithering_fragment:J1,dithering_pars_fragment:$1,roughnessmap_fragment:tT,roughnessmap_pars_fragment:eT,shadowmap_pars_fragment:nT,shadowmap_pars_vertex:iT,shadowmap_vertex:aT,shadowmask_pars_fragment:sT,skinbase_vertex:rT,skinning_pars_vertex:oT,skinning_vertex:lT,skinnormal_vertex:cT,specularmap_fragment:uT,specularmap_pars_fragment:fT,tonemapping_fragment:hT,tonemapping_pars_fragment:dT,transmission_fragment:pT,transmission_pars_fragment:mT,uv_pars_fragment:gT,uv_pars_vertex:_T,uv_vertex:vT,worldpos_vertex:xT,background_vert:yT,background_frag:ST,backgroundCube_vert:MT,backgroundCube_frag:ET,cube_vert:TT,cube_frag:bT,depth_vert:AT,depth_frag:wT,distanceRGBA_vert:RT,distanceRGBA_frag:CT,equirect_vert:DT,equirect_frag:UT,linedashed_vert:LT,linedashed_frag:NT,meshbasic_vert:OT,meshbasic_frag:PT,meshlambert_vert:zT,meshlambert_frag:BT,meshmatcap_vert:IT,meshmatcap_frag:FT,meshnormal_vert:HT,meshnormal_frag:GT,meshphong_vert:VT,meshphong_frag:kT,meshphysical_vert:XT,meshphysical_frag:WT,meshtoon_vert:qT,meshtoon_frag:jT,points_vert:YT,points_frag:ZT,shadow_vert:KT,shadow_frag:QT,sprite_vert:JT,sprite_frag:$T},Nt={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fe}},envmap:{envMap:{value:null},envMapRotation:{value:new fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fe},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0},uvTransform:{value:new fe}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}}},Xi={basic:{uniforms:Vn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:he.meshbasic_vert,fragmentShader:he.meshbasic_frag},lambert:{uniforms:Vn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new ae(0)}}]),vertexShader:he.meshlambert_vert,fragmentShader:he.meshlambert_frag},phong:{uniforms:Vn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30}}]),vertexShader:he.meshphong_vert,fragmentShader:he.meshphong_frag},standard:{uniforms:Vn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag},toon:{uniforms:Vn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new ae(0)}}]),vertexShader:he.meshtoon_vert,fragmentShader:he.meshtoon_frag},matcap:{uniforms:Vn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:he.meshmatcap_vert,fragmentShader:he.meshmatcap_frag},points:{uniforms:Vn([Nt.points,Nt.fog]),vertexShader:he.points_vert,fragmentShader:he.points_frag},dashed:{uniforms:Vn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:he.linedashed_vert,fragmentShader:he.linedashed_frag},depth:{uniforms:Vn([Nt.common,Nt.displacementmap]),vertexShader:he.depth_vert,fragmentShader:he.depth_frag},normal:{uniforms:Vn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:he.meshnormal_vert,fragmentShader:he.meshnormal_frag},sprite:{uniforms:Vn([Nt.sprite,Nt.fog]),vertexShader:he.sprite_vert,fragmentShader:he.sprite_frag},background:{uniforms:{uvTransform:{value:new fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:he.background_vert,fragmentShader:he.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new fe}},vertexShader:he.backgroundCube_vert,fragmentShader:he.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:he.cube_vert,fragmentShader:he.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:he.equirect_vert,fragmentShader:he.equirect_frag},distanceRGBA:{uniforms:Vn([Nt.common,Nt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:he.distanceRGBA_vert,fragmentShader:he.distanceRGBA_frag},shadow:{uniforms:Vn([Nt.lights,Nt.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:he.shadow_vert,fragmentShader:he.shadow_frag}};Xi.physical={uniforms:Vn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fe},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fe},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fe},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fe},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fe},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fe}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag};const Fc={r:0,b:0,g:0},Ds=new qi,tb=new Ye;function eb(r,t,i,s,l,c,f){const d=new ae(0);let m=c===!0?0:1,p,g,_=null,v=0,S=null;function M(L){let U=L.isScene===!0?L.background:null;return U&&U.isTexture&&(U=(L.backgroundBlurriness>0?i:t).get(U)),U}function T(L){let U=!1;const R=M(L);R===null?x(d,m):R&&R.isColor&&(x(R,1),U=!0);const Y=r.xr.getEnvironmentBlendMode();Y==="additive"?s.buffers.color.setClear(0,0,0,1,f):Y==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||U)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function E(L,U){const R=M(U);R&&(R.isCubeTexture||R.mapping===hu)?(g===void 0&&(g=new ie(new de(1,1,1),new os({name:"BackgroundCubeMaterial",uniforms:jr(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(Y,B,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Ds.copy(U.backgroundRotation),Ds.x*=-1,Ds.y*=-1,Ds.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Ds.y*=-1,Ds.z*=-1),g.material.uniforms.envMap.value=R,g.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(tb.makeRotationFromEuler(Ds)),g.material.toneMapped=we.getTransfer(R.colorSpace)!==ke,(_!==R||v!==R.version||S!==r.toneMapping)&&(g.material.needsUpdate=!0,_=R,v=R.version,S=r.toneMapping),g.layers.enableAll(),L.unshift(g,g.geometry,g.material,0,0,null)):R&&R.isTexture&&(p===void 0&&(p=new ie(new ll(2,2),new os({name:"BackgroundMaterial",uniforms:jr(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:rs,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=R,p.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,p.material.toneMapped=we.getTransfer(R.colorSpace)!==ke,R.matrixAutoUpdate===!0&&R.updateMatrix(),p.material.uniforms.uvTransform.value.copy(R.matrix),(_!==R||v!==R.version||S!==r.toneMapping)&&(p.material.needsUpdate=!0,_=R,v=R.version,S=r.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null))}function x(L,U){L.getRGB(Fc,ux(r)),s.buffers.color.setClear(Fc.r,Fc.g,Fc.b,U,f)}return{getClearColor:function(){return d},setClearColor:function(L,U=1){d.set(L),m=U,x(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(L){m=L,x(d,m)},render:T,addToRenderList:E}}function nb(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=v(null);let c=l,f=!1;function d(w,F,nt,rt,ht){let mt=!1;const z=_(rt,nt,F);c!==z&&(c=z,p(c.object)),mt=S(w,rt,nt,ht),mt&&M(w,rt,nt,ht),ht!==null&&t.update(ht,r.ELEMENT_ARRAY_BUFFER),(mt||f)&&(f=!1,R(w,F,nt,rt),ht!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ht).buffer))}function m(){return r.createVertexArray()}function p(w){return r.bindVertexArray(w)}function g(w){return r.deleteVertexArray(w)}function _(w,F,nt){const rt=nt.wireframe===!0;let ht=s[w.id];ht===void 0&&(ht={},s[w.id]=ht);let mt=ht[F.id];mt===void 0&&(mt={},ht[F.id]=mt);let z=mt[rt];return z===void 0&&(z=v(m()),mt[rt]=z),z}function v(w){const F=[],nt=[],rt=[];for(let ht=0;ht<i;ht++)F[ht]=0,nt[ht]=0,rt[ht]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:nt,attributeDivisors:rt,object:w,attributes:{},index:null}}function S(w,F,nt,rt){const ht=c.attributes,mt=F.attributes;let z=0;const Q=nt.getAttributes();for(const K in Q)if(Q[K].location>=0){const Tt=ht[K];let P=mt[K];if(P===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(P=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(P=w.instanceColor)),Tt===void 0||Tt.attribute!==P||P&&Tt.data!==P.data)return!0;z++}return c.attributesNum!==z||c.index!==rt}function M(w,F,nt,rt){const ht={},mt=F.attributes;let z=0;const Q=nt.getAttributes();for(const K in Q)if(Q[K].location>=0){let Tt=mt[K];Tt===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(Tt=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(Tt=w.instanceColor));const P={};P.attribute=Tt,Tt&&Tt.data&&(P.data=Tt.data),ht[K]=P,z++}c.attributes=ht,c.attributesNum=z,c.index=rt}function T(){const w=c.newAttributes;for(let F=0,nt=w.length;F<nt;F++)w[F]=0}function E(w){x(w,0)}function x(w,F){const nt=c.newAttributes,rt=c.enabledAttributes,ht=c.attributeDivisors;nt[w]=1,rt[w]===0&&(r.enableVertexAttribArray(w),rt[w]=1),ht[w]!==F&&(r.vertexAttribDivisor(w,F),ht[w]=F)}function L(){const w=c.newAttributes,F=c.enabledAttributes;for(let nt=0,rt=F.length;nt<rt;nt++)F[nt]!==w[nt]&&(r.disableVertexAttribArray(nt),F[nt]=0)}function U(w,F,nt,rt,ht,mt,z){z===!0?r.vertexAttribIPointer(w,F,nt,ht,mt):r.vertexAttribPointer(w,F,nt,rt,ht,mt)}function R(w,F,nt,rt){T();const ht=rt.attributes,mt=nt.getAttributes(),z=F.defaultAttributeValues;for(const Q in mt){const K=mt[Q];if(K.location>=0){let St=ht[Q];if(St===void 0&&(Q==="instanceMatrix"&&w.instanceMatrix&&(St=w.instanceMatrix),Q==="instanceColor"&&w.instanceColor&&(St=w.instanceColor)),St!==void 0){const Tt=St.normalized,P=St.itemSize,at=t.get(St);if(at===void 0)continue;const yt=at.buffer,Z=at.type,ut=at.bytesPerElement,Et=Z===r.INT||Z===r.UNSIGNED_INT||St.gpuType===ap;if(St.isInterleavedBufferAttribute){const xt=St.data,Ht=xt.stride,Ft=St.offset;if(xt.isInstancedInterleavedBuffer){for(let re=0;re<K.locationSize;re++)x(K.location+re,xt.meshPerAttribute);w.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let re=0;re<K.locationSize;re++)E(K.location+re);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let re=0;re<K.locationSize;re++)U(K.location+re,P/K.locationSize,Z,Tt,Ht*ut,(Ft+P/K.locationSize*re)*ut,Et)}else{if(St.isInstancedBufferAttribute){for(let xt=0;xt<K.locationSize;xt++)x(K.location+xt,St.meshPerAttribute);w.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let xt=0;xt<K.locationSize;xt++)E(K.location+xt);r.bindBuffer(r.ARRAY_BUFFER,yt);for(let xt=0;xt<K.locationSize;xt++)U(K.location+xt,P/K.locationSize,Z,Tt,P*ut,P/K.locationSize*xt*ut,Et)}}else if(z!==void 0){const Tt=z[Q];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(K.location,Tt);break;case 3:r.vertexAttrib3fv(K.location,Tt);break;case 4:r.vertexAttrib4fv(K.location,Tt);break;default:r.vertexAttrib1fv(K.location,Tt)}}}}L()}function Y(){H();for(const w in s){const F=s[w];for(const nt in F){const rt=F[nt];for(const ht in rt)g(rt[ht].object),delete rt[ht];delete F[nt]}delete s[w]}}function B(w){if(s[w.id]===void 0)return;const F=s[w.id];for(const nt in F){const rt=F[nt];for(const ht in rt)g(rt[ht].object),delete rt[ht];delete F[nt]}delete s[w.id]}function O(w){for(const F in s){const nt=s[F];if(nt[w.id]===void 0)continue;const rt=nt[w.id];for(const ht in rt)g(rt[ht].object),delete rt[ht];delete nt[w.id]}}function H(){D(),f=!0,c!==l&&(c=l,p(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:H,resetDefaultState:D,dispose:Y,releaseStatesOfGeometry:B,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:E,disableUnusedAttributes:L}}function ib(r,t,i){let s;function l(p){s=p}function c(p,g){r.drawArrays(s,p,g),i.update(g,s,1)}function f(p,g,_){_!==0&&(r.drawArraysInstanced(s,p,g,_),i.update(g,s,_))}function d(p,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,_);let S=0;for(let M=0;M<_;M++)S+=g[M];i.update(S,s,1)}function m(p,g,_,v){if(_===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let M=0;M<p.length;M++)f(p[M],g[M],v[M]);else{S.multiDrawArraysInstancedWEBGL(s,p,0,g,0,v,0,_);let M=0;for(let T=0;T<_;T++)M+=g[T]*v[T];i.update(M,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function ab(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const O=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==Pi&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const H=O===il&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(O!==Ma&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==xa&&!H)}function m(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=i.logarithmicDepthBuffer===!0,v=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),S=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),U=r.getParameter(r.MAX_VARYING_VECTORS),R=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),Y=M>0,B=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reverseDepthBuffer:v,maxTextures:S,maxVertexTextures:M,maxTextureSize:T,maxCubemapSize:E,maxAttributes:x,maxVertexUniforms:L,maxVaryings:U,maxFragmentUniforms:R,vertexTextures:Y,maxSamples:B}}function sb(r){const t=this;let i=null,s=0,l=!1,c=!1;const f=new ns,d=new fe,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const S=_.length!==0||v||s!==0||l;return l=v,s=_.length,S},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){i=g(_,v,0)},this.setState=function(_,v,S){const M=_.clippingPlanes,T=_.clipIntersection,E=_.clipShadows,x=r.get(_);if(!l||M===null||M.length===0||c&&!E)c?g(null):p();else{const L=c?0:s,U=L*4;let R=x.clippingState||null;m.value=R,R=g(M,v,U,S);for(let Y=0;Y!==U;++Y)R[Y]=i[Y];x.clippingState=R,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=L}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(_,v,S,M){const T=_!==null?_.length:0;let E=null;if(T!==0){if(E=m.value,M!==!0||E===null){const x=S+T*4,L=v.matrixWorldInverse;d.getNormalMatrix(L),(E===null||E.length<x)&&(E=new Float32Array(x));for(let U=0,R=S;U!==T;++U,R+=4)f.copy(_[U]).applyMatrix4(L,d),f.normal.toArray(E,R),E[R+3]=f.constant}m.value=E,m.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,E}}function rb(r){let t=new WeakMap;function i(f,d){return d===yd?f.mapping=kr:d===Sd&&(f.mapping=Xr),f}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===yd||d===Sd)if(t.has(f)){const m=t.get(f).texture;return i(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new _E(m.height);return p.fromEquirectangularTexture(r,f),t.set(f,p),f.addEventListener("dispose",l),i(p.texture,f.mapping)}else return null}}return f}function l(f){const d=f.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}class px extends fx{constructor(t=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Br=4,q_=[.125,.215,.35,.446,.526,.582],Ps=20,Jh=new px,j_=new ae;let $h=null,td=0,ed=0,nd=!1;const Ns=(1+Math.sqrt(5))/2,Pr=1/Ns,Y_=[new V(-Ns,Pr,0),new V(Ns,Pr,0),new V(-Pr,0,Ns),new V(Pr,0,Ns),new V(0,Ns,-Pr),new V(0,Ns,Pr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class Z_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100){$h=this._renderer.getRenderTarget(),td=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel(),nd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),i>0&&this._blur(c,0,0,i),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=J_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Q_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($h,td,ed),this._renderer.xr.enabled=nd,t.scissorTest=!1,Hc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===kr||t.mapping===Xr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$h=this._renderer.getRenderTarget(),td=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel(),nd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Wi,minFilter:Wi,generateMipmaps:!1,type:il,format:Pi,colorSpace:Yr,depthBuffer:!1},l=K_(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=K_(t,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ob(c)),this._blurMaterial=lb(c,t,i)}return l}_compileMaterial(t){const i=new ie(this._lodPlanes[0],t);this._renderer.compile(i,Jh)}_sceneToCubeUV(t,i,s,l){const d=new ui(90,1,i,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,v=g.toneMapping;g.getClearColor(j_),g.toneMapping=ss,g.autoClear=!1;const S=new ou({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1}),M=new ie(new de,S);let T=!1;const E=t.background;E?E.isColor&&(S.color.copy(E),t.background=null,T=!0):(S.color.copy(j_),T=!0);for(let x=0;x<6;x++){const L=x%3;L===0?(d.up.set(0,m[x],0),d.lookAt(p[x],0,0)):L===1?(d.up.set(0,0,m[x]),d.lookAt(0,p[x],0)):(d.up.set(0,m[x],0),d.lookAt(0,0,p[x]));const U=this._cubeSize;Hc(l,L*U,x>2?U:0,U,U),g.setRenderTarget(l),T&&g.render(M,d),g.render(t,d)}M.geometry.dispose(),M.material.dispose(),g.toneMapping=v,g.autoClear=_,t.background=E}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===kr||t.mapping===Xr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=J_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Q_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new ie(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;Hc(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,Jh)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=Y_[(l-c-1)%Y_.length];this._blur(t,c-1,c,f,d)}i.autoClear=s}_blur(t,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,i,s,l,"latitudinal",c),this._halfBlur(f,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,f,d){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new ie(this._lodPlanes[l],p),v=p.uniforms,S=this._sizeLods[s]-1,M=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*Ps-1),T=c/M,E=isFinite(c)?1+Math.floor(g*T):Ps;E>Ps&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${Ps}`);const x=[];let L=0;for(let O=0;O<Ps;++O){const H=O/T,D=Math.exp(-H*H/2);x.push(D),O===0?L+=D:O<E&&(L+=2*D)}for(let O=0;O<x.length;O++)x[O]=x[O]/L;v.envMap.value=t.texture,v.samples.value=E,v.weights.value=x,v.latitudinal.value=f==="latitudinal",d&&(v.poleAxis.value=d);const{_lodMax:U}=this;v.dTheta.value=M,v.mipInt.value=U-s;const R=this._sizeLods[l],Y=3*R*(l>U-Br?l-U+Br:0),B=4*(this._cubeSize-R);Hc(i,Y,B,3*R,2*R),m.setRenderTarget(i),m.render(_,Jh)}}function ob(r){const t=[],i=[],s=[];let l=r;const c=r-Br+1+q_.length;for(let f=0;f<c;f++){const d=Math.pow(2,l);i.push(d);let m=1/d;f>r-Br?m=q_[f-r+Br-1]:f===0&&(m=0),s.push(m);const p=1/(d-2),g=-p,_=1+p,v=[g,g,_,g,_,_,g,g,_,_,g,_],S=6,M=6,T=3,E=2,x=1,L=new Float32Array(T*M*S),U=new Float32Array(E*M*S),R=new Float32Array(x*M*S);for(let B=0;B<S;B++){const O=B%3*2/3-1,H=B>2?0:-1,D=[O,H,0,O+2/3,H,0,O+2/3,H+1,0,O,H,0,O+2/3,H+1,0,O,H+1,0];L.set(D,T*M*B),U.set(v,E*M*B);const w=[B,B,B,B,B,B];R.set(w,x*M*B)}const Y=new An;Y.setAttribute("position",new Jn(L,T)),Y.setAttribute("uv",new Jn(U,E)),Y.setAttribute("faceIndex",new Jn(R,x)),t.push(Y),l>Br&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function K_(r,t,i){const s=new Gs(r,t,i);return s.texture.mapping=hu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Hc(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function lb(r,t,i){const s=new Float32Array(Ps),l=new V(0,1,0);return new os({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:hp(),fragmentShader:`

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
		`,blending:as,depthTest:!1,depthWrite:!1})}function Q_(){return new os({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hp(),fragmentShader:`

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
		`,blending:as,depthTest:!1,depthWrite:!1})}function J_(){return new os({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:as,depthTest:!1,depthWrite:!1})}function hp(){return`

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
	`}function cb(r){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===yd||m===Sd,g=m===kr||m===Xr;if(p||g){let _=t.get(d);const v=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==v)return i===null&&(i=new Z_(r)),_=p?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const S=d.image;return p&&S&&S.height>0||g&&S&&l(S)?(i===null&&(i=new Z_(r)),_=p?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function f(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function ub(r){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&$o("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function fb(r,t,i,s){const l={},c=new WeakMap;function f(_){const v=_.target;v.index!==null&&t.remove(v.index);for(const M in v.attributes)t.remove(v.attributes[M]);for(const M in v.morphAttributes){const T=v.morphAttributes[M];for(let E=0,x=T.length;E<x;E++)t.remove(T[E])}v.removeEventListener("dispose",f),delete l[v.id];const S=c.get(v);S&&(t.remove(S),c.delete(v)),s.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,i.memory.geometries--}function d(_,v){return l[v.id]===!0||(v.addEventListener("dispose",f),l[v.id]=!0,i.memory.geometries++),v}function m(_){const v=_.attributes;for(const M in v)t.update(v[M],r.ARRAY_BUFFER);const S=_.morphAttributes;for(const M in S){const T=S[M];for(let E=0,x=T.length;E<x;E++)t.update(T[E],r.ARRAY_BUFFER)}}function p(_){const v=[],S=_.index,M=_.attributes.position;let T=0;if(S!==null){const L=S.array;T=S.version;for(let U=0,R=L.length;U<R;U+=3){const Y=L[U+0],B=L[U+1],O=L[U+2];v.push(Y,B,B,O,O,Y)}}else if(M!==void 0){const L=M.array;T=M.version;for(let U=0,R=L.length/3-1;U<R;U+=3){const Y=U+0,B=U+1,O=U+2;v.push(Y,B,B,O,O,Y)}}else return;const E=new(ax(v)?cx:lx)(v,1);E.version=T;const x=c.get(_);x&&t.remove(x),c.set(_,E)}function g(_){const v=c.get(_);if(v){const S=_.index;S!==null&&v.version<S.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:g}}function hb(r,t,i){let s;function l(v){s=v}let c,f;function d(v){c=v.type,f=v.bytesPerElement}function m(v,S){r.drawElements(s,S,c,v*f),i.update(S,s,1)}function p(v,S,M){M!==0&&(r.drawElementsInstanced(s,S,c,v*f,M),i.update(S,s,M))}function g(v,S,M){if(M===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,c,v,0,M);let E=0;for(let x=0;x<M;x++)E+=S[x];i.update(E,s,1)}function _(v,S,M,T){if(M===0)return;const E=t.get("WEBGL_multi_draw");if(E===null)for(let x=0;x<v.length;x++)p(v[x]/f,S[x],T[x]);else{E.multiDrawElementsInstancedWEBGL(s,S,0,c,v,0,T,0,M);let x=0;for(let L=0;L<M;L++)x+=S[L]*T[L];i.update(x,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function db(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,d){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=d*(c/3);break;case r.LINES:i.lines+=d*(c/2);break;case r.LINE_STRIP:i.lines+=d*(c-1);break;case r.LINE_LOOP:i.lines+=d*c;break;case r.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function pb(r,t,i){const s=new WeakMap,l=new Xe;function c(f,d,m){const p=f.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let v=s.get(d);if(v===void 0||v.count!==_){let w=function(){H.dispose(),s.delete(d),d.removeEventListener("dispose",w)};var S=w;v!==void 0&&v.texture.dispose();const M=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,E=d.morphAttributes.color!==void 0,x=d.morphAttributes.position||[],L=d.morphAttributes.normal||[],U=d.morphAttributes.color||[];let R=0;M===!0&&(R=1),T===!0&&(R=2),E===!0&&(R=3);let Y=d.attributes.position.count*R,B=1;Y>t.maxTextureSize&&(B=Math.ceil(Y/t.maxTextureSize),Y=t.maxTextureSize);const O=new Float32Array(Y*B*4*_),H=new rx(O,Y,B,_);H.type=xa,H.needsUpdate=!0;const D=R*4;for(let F=0;F<_;F++){const nt=x[F],rt=L[F],ht=U[F],mt=Y*B*4*F;for(let z=0;z<nt.count;z++){const Q=z*D;M===!0&&(l.fromBufferAttribute(nt,z),O[mt+Q+0]=l.x,O[mt+Q+1]=l.y,O[mt+Q+2]=l.z,O[mt+Q+3]=0),T===!0&&(l.fromBufferAttribute(rt,z),O[mt+Q+4]=l.x,O[mt+Q+5]=l.y,O[mt+Q+6]=l.z,O[mt+Q+7]=0),E===!0&&(l.fromBufferAttribute(ht,z),O[mt+Q+8]=l.x,O[mt+Q+9]=l.y,O[mt+Q+10]=l.z,O[mt+Q+11]=ht.itemSize===4?l.w:1)}}v={count:_,texture:H,size:new Te(Y,B)},s.set(d,v),d.addEventListener("dispose",w)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let M=0;for(let E=0;E<p.length;E++)M+=p[E];const T=d.morphTargetsRelative?1:1-M;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",v.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:c}}function mb(r,t,i,s){let l=new WeakMap;function c(m){const p=s.render.frame,g=m.geometry,_=t.get(m,g);if(l.get(_)!==p&&(t.update(_),l.set(_,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const v=m.skeleton;l.get(v)!==p&&(v.update(),l.set(v,p))}return _}function f(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:f}}class mx extends ti{constructor(t,i,s,l,c,f,d,m,p,g=Hr){if(g!==Hr&&g!==qr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===Hr&&(s=Hs),s===void 0&&g===qr&&(s=Wr),super(null,l,c,f,d,m,g,s,p),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:zi,this.minFilter=m!==void 0?m:zi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}const gx=new ti,$_=new mx(1,1),_x=new rx,vx=new eE,xx=new hx,tv=[],ev=[],nv=new Float32Array(16),iv=new Float32Array(9),av=new Float32Array(4);function Kr(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=tv[l];if(c===void 0&&(c=new Float32Array(l),tv[l]=c),t!==0){s.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=i,r[f].toArray(c,d)}return c}function xn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function yn(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function mu(r,t){let i=ev[t];i===void 0&&(i=new Int32Array(t),ev[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function gb(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function _b(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(xn(i,t))return;r.uniform2fv(this.addr,t),yn(i,t)}}function vb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(xn(i,t))return;r.uniform3fv(this.addr,t),yn(i,t)}}function xb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(xn(i,t))return;r.uniform4fv(this.addr,t),yn(i,t)}}function yb(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(xn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),yn(i,t)}else{if(xn(i,s))return;av.set(s),r.uniformMatrix2fv(this.addr,!1,av),yn(i,s)}}function Sb(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(xn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),yn(i,t)}else{if(xn(i,s))return;iv.set(s),r.uniformMatrix3fv(this.addr,!1,iv),yn(i,s)}}function Mb(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(xn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),yn(i,t)}else{if(xn(i,s))return;nv.set(s),r.uniformMatrix4fv(this.addr,!1,nv),yn(i,s)}}function Eb(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function Tb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(xn(i,t))return;r.uniform2iv(this.addr,t),yn(i,t)}}function bb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(xn(i,t))return;r.uniform3iv(this.addr,t),yn(i,t)}}function Ab(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(xn(i,t))return;r.uniform4iv(this.addr,t),yn(i,t)}}function wb(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function Rb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(xn(i,t))return;r.uniform2uiv(this.addr,t),yn(i,t)}}function Cb(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(xn(i,t))return;r.uniform3uiv(this.addr,t),yn(i,t)}}function Db(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(xn(i,t))return;r.uniform4uiv(this.addr,t),yn(i,t)}}function Ub(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?($_.compareFunction=ix,c=$_):c=gx,i.setTexture2D(t||c,l)}function Lb(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||vx,l)}function Nb(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||xx,l)}function Ob(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||_x,l)}function Pb(r){switch(r){case 5126:return gb;case 35664:return _b;case 35665:return vb;case 35666:return xb;case 35674:return yb;case 35675:return Sb;case 35676:return Mb;case 5124:case 35670:return Eb;case 35667:case 35671:return Tb;case 35668:case 35672:return bb;case 35669:case 35673:return Ab;case 5125:return wb;case 36294:return Rb;case 36295:return Cb;case 36296:return Db;case 35678:case 36198:case 36298:case 36306:case 35682:return Ub;case 35679:case 36299:case 36307:return Lb;case 35680:case 36300:case 36308:case 36293:return Nb;case 36289:case 36303:case 36311:case 36292:return Ob}}function zb(r,t){r.uniform1fv(this.addr,t)}function Bb(r,t){const i=Kr(t,this.size,2);r.uniform2fv(this.addr,i)}function Ib(r,t){const i=Kr(t,this.size,3);r.uniform3fv(this.addr,i)}function Fb(r,t){const i=Kr(t,this.size,4);r.uniform4fv(this.addr,i)}function Hb(r,t){const i=Kr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function Gb(r,t){const i=Kr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function Vb(r,t){const i=Kr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function kb(r,t){r.uniform1iv(this.addr,t)}function Xb(r,t){r.uniform2iv(this.addr,t)}function Wb(r,t){r.uniform3iv(this.addr,t)}function qb(r,t){r.uniform4iv(this.addr,t)}function jb(r,t){r.uniform1uiv(this.addr,t)}function Yb(r,t){r.uniform2uiv(this.addr,t)}function Zb(r,t){r.uniform3uiv(this.addr,t)}function Kb(r,t){r.uniform4uiv(this.addr,t)}function Qb(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)i.setTexture2D(t[f]||gx,c[f])}function Jb(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||vx,c[f])}function $b(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||xx,c[f])}function tA(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);xn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||_x,c[f])}function eA(r){switch(r){case 5126:return zb;case 35664:return Bb;case 35665:return Ib;case 35666:return Fb;case 35674:return Hb;case 35675:return Gb;case 35676:return Vb;case 5124:case 35670:return kb;case 35667:case 35671:return Xb;case 35668:case 35672:return Wb;case 35669:case 35673:return qb;case 5125:return jb;case 36294:return Yb;case 36295:return Zb;case 36296:return Kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Qb;case 35679:case 36299:case 36307:return Jb;case 35680:case 36300:case 36308:case 36293:return $b;case 36289:case 36303:case 36311:case 36292:return tA}}class nA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=Pb(i.type)}}class iA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=eA(i.type)}}class aA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,i[d.id],s)}}}const id=/(\w+)(\])?(\[|\.)?/g;function sv(r,t){r.seq.push(t),r.map[t.id]=t}function sA(r,t,i){const s=r.name,l=s.length;for(id.lastIndex=0;;){const c=id.exec(s),f=id.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&f+2===l){sv(i,p===void 0?new nA(d,r,t):new iA(d,r,t));break}else{let _=i.map[d];_===void 0&&(_=new aA(d),sv(i,_)),i=_}}}class au{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(i,l),f=t.getUniformLocation(i,c.name);sA(c,f,this)}}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,f=i.length;c!==f;++c){const d=i[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&s.push(f)}return s}}function rv(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const rA=37297;let oA=0;function lA(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const d=f+1;s.push(`${d===t?">":" "} ${d}: ${i[f]}`)}return s.join(`
`)}const ov=new fe;function cA(r){we._getMatrix(ov,we.workingColorSpace,r);const t=`mat3( ${ov.elements.map(i=>i.toFixed(4))} )`;switch(we.getTransfer(r)){case du:return[t,"LinearTransferOETF"];case ke:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function lv(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+lA(r.getShaderSource(t),f)}else return l}function uA(r,t){const i=cA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function fA(r,t){let i;switch(t){case RM:i="Linear";break;case CM:i="Reinhard";break;case DM:i="Cineon";break;case UM:i="ACESFilmic";break;case NM:i="AgX";break;case OM:i="Neutral";break;case LM:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Gc=new V;function hA(){we.getLuminanceCoefficients(Gc);const r=Gc.x.toFixed(4),t=Gc.y.toFixed(4),i=Gc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tl).join(`
`)}function pA(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function mA(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),i[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:d}}return i}function tl(r){return r!==""}function cv(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function uv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qd(r){return r.replace(gA,vA)}const _A=new Map;function vA(r,t){let i=he[t];if(i===void 0){const s=_A.get(t);if(s!==void 0)i=he[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Qd(i)}const xA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fv(r){return r.replace(xA,yA)}function yA(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function hv(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function SA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Vv?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===kv?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===_a&&(t="SHADOWMAP_TYPE_VSM"),t}function MA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case kr:case Xr:t="ENVMAP_TYPE_CUBE";break;case hu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function EA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Xr:t="ENVMAP_MODE_REFRACTION";break}return t}function TA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Xv:t="ENVMAP_BLENDING_MULTIPLY";break;case AM:t="ENVMAP_BLENDING_MIX";break;case wM:t="ENVMAP_BLENDING_ADD";break}return t}function bA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function AA(r,t,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,d=i.fragmentShader;const m=SA(i),p=MA(i),g=EA(i),_=TA(i),v=bA(i),S=dA(i),M=pA(c),T=l.createProgram();let E,x,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(E=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(tl).join(`
`),E.length>0&&(E+=`
`),x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(tl).join(`
`),x.length>0&&(x+=`
`)):(E=[hv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tl).join(`
`),x=[hv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ss?"#define TONE_MAPPING":"",i.toneMapping!==ss?he.tonemapping_pars_fragment:"",i.toneMapping!==ss?fA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",he.colorspace_pars_fragment,uA("linearToOutputTexel",i.outputColorSpace),hA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(tl).join(`
`)),f=Qd(f),f=cv(f,i),f=uv(f,i),d=Qd(d),d=cv(d,i),d=uv(d,i),f=fv(f),d=fv(d),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,E=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,x=["#define varying in",i.glslVersion===b_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===b_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const U=L+E+f,R=L+x+d,Y=rv(l,l.VERTEX_SHADER,U),B=rv(l,l.FRAGMENT_SHADER,R);l.attachShader(T,Y),l.attachShader(T,B),i.index0AttributeName!==void 0?l.bindAttribLocation(T,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function O(F){if(r.debug.checkShaderErrors){const nt=l.getProgramInfoLog(T).trim(),rt=l.getShaderInfoLog(Y).trim(),ht=l.getShaderInfoLog(B).trim();let mt=!0,z=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(mt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,Y,B);else{const Q=lv(l,Y,"vertex"),K=lv(l,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+nt+`
`+Q+`
`+K)}else nt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",nt):(rt===""||ht==="")&&(z=!1);z&&(F.diagnostics={runnable:mt,programLog:nt,vertexShader:{log:rt,prefix:E},fragmentShader:{log:ht,prefix:x}})}l.deleteShader(Y),l.deleteShader(B),H=new au(l,T),D=mA(l,T)}let H;this.getUniforms=function(){return H===void 0&&O(this),H};let D;this.getAttributes=function(){return D===void 0&&O(this),D};let w=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=l.getProgramParameter(T,rA)),w},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=oA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=Y,this.fragmentShader=B,this}let wA=0;class RA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new CA(t),i.set(t,s)),s}}class CA{constructor(t){this.id=wA++,this.code=t,this.usedTimes=0}}function DA(r,t,i,s,l,c,f){const d=new up,m=new RA,p=new Set,g=[],_=l.logarithmicDepthBuffer,v=l.vertexTextures;let S=l.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(D){return p.add(D),D===0?"uv":`uv${D}`}function E(D,w,F,nt,rt){const ht=nt.fog,mt=rt.geometry,z=D.isMeshStandardMaterial?nt.environment:null,Q=(D.isMeshStandardMaterial?i:t).get(D.envMap||z),K=Q&&Q.mapping===hu?Q.image.height:null,St=M[D.type];D.precision!==null&&(S=l.getMaxPrecision(D.precision),S!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",S,"instead."));const Tt=mt.morphAttributes.position||mt.morphAttributes.normal||mt.morphAttributes.color,P=Tt!==void 0?Tt.length:0;let at=0;mt.morphAttributes.position!==void 0&&(at=1),mt.morphAttributes.normal!==void 0&&(at=2),mt.morphAttributes.color!==void 0&&(at=3);let yt,Z,ut,Et;if(St){const Ae=Xi[St];yt=Ae.vertexShader,Z=Ae.fragmentShader}else yt=D.vertexShader,Z=D.fragmentShader,m.update(D),ut=m.getVertexShaderID(D),Et=m.getFragmentShaderID(D);const xt=r.getRenderTarget(),Ht=r.state.buffers.depth.getReversed(),Ft=rt.isInstancedMesh===!0,re=rt.isBatchedMesh===!0,Be=!!D.map,me=!!D.matcap,$e=!!Q,q=!!D.aoMap,Pn=!!D.lightMap,pe=!!D.bumpMap,ve=!!D.normalMap,Qt=!!D.displacementMap,Ne=!!D.emissiveMap,Zt=!!D.metalnessMap,N=!!D.roughnessMap,A=D.anisotropy>0,it=D.clearcoat>0,dt=D.dispersion>0,Mt=D.iridescence>0,gt=D.sheen>0,Wt=D.transmission>0,Ut=A&&!!D.anisotropyMap,Pt=it&&!!D.clearcoatMap,xe=it&&!!D.clearcoatNormalMap,At=it&&!!D.clearcoatRoughnessMap,zt=Mt&&!!D.iridescenceMap,Kt=Mt&&!!D.iridescenceThicknessMap,qt=gt&&!!D.sheenColorMap,Ot=gt&&!!D.sheenRoughnessMap,te=!!D.specularMap,le=!!D.specularColorMap,Ie=!!D.specularIntensityMap,k=Wt&&!!D.transmissionMap,wt=Wt&&!!D.thicknessMap,ct=!!D.gradientMap,vt=!!D.alphaMap,Rt=D.alphaTest>0,Lt=!!D.alphaHash,ee=!!D.extensions;let tn=ss;D.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(tn=r.toneMapping);const mn={shaderID:St,shaderType:D.type,shaderName:D.name,vertexShader:yt,fragmentShader:Z,defines:D.defines,customVertexShaderID:ut,customFragmentShaderID:Et,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:S,batching:re,batchingColor:re&&rt._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&rt.instanceColor!==null,instancingMorph:Ft&&rt.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:xt===null?r.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:Yr,alphaToCoverage:!!D.alphaToCoverage,map:Be,matcap:me,envMap:$e,envMapMode:$e&&Q.mapping,envMapCubeUVHeight:K,aoMap:q,lightMap:Pn,bumpMap:pe,normalMap:ve,displacementMap:v&&Qt,emissiveMap:Ne,normalMapObjectSpace:ve&&D.normalMapType===IM,normalMapTangentSpace:ve&&D.normalMapType===nx,metalnessMap:Zt,roughnessMap:N,anisotropy:A,anisotropyMap:Ut,clearcoat:it,clearcoatMap:Pt,clearcoatNormalMap:xe,clearcoatRoughnessMap:At,dispersion:dt,iridescence:Mt,iridescenceMap:zt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:qt,sheenRoughnessMap:Ot,specularMap:te,specularColorMap:le,specularIntensityMap:Ie,transmission:Wt,transmissionMap:k,thicknessMap:wt,gradientMap:ct,opaque:D.transparent===!1&&D.blending===Fr&&D.alphaToCoverage===!1,alphaMap:vt,alphaTest:Rt,alphaHash:Lt,combine:D.combine,mapUv:Be&&T(D.map.channel),aoMapUv:q&&T(D.aoMap.channel),lightMapUv:Pn&&T(D.lightMap.channel),bumpMapUv:pe&&T(D.bumpMap.channel),normalMapUv:ve&&T(D.normalMap.channel),displacementMapUv:Qt&&T(D.displacementMap.channel),emissiveMapUv:Ne&&T(D.emissiveMap.channel),metalnessMapUv:Zt&&T(D.metalnessMap.channel),roughnessMapUv:N&&T(D.roughnessMap.channel),anisotropyMapUv:Ut&&T(D.anisotropyMap.channel),clearcoatMapUv:Pt&&T(D.clearcoatMap.channel),clearcoatNormalMapUv:xe&&T(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&T(D.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&T(D.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(D.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&T(D.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&T(D.sheenRoughnessMap.channel),specularMapUv:te&&T(D.specularMap.channel),specularColorMapUv:le&&T(D.specularColorMap.channel),specularIntensityMapUv:Ie&&T(D.specularIntensityMap.channel),transmissionMapUv:k&&T(D.transmissionMap.channel),thicknessMapUv:wt&&T(D.thicknessMap.channel),alphaMapUv:vt&&T(D.alphaMap.channel),vertexTangents:!!mt.attributes.tangent&&(ve||A),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!mt.attributes.color&&mt.attributes.color.itemSize===4,pointsUvs:rt.isPoints===!0&&!!mt.attributes.uv&&(Be||vt),fog:!!ht,useFog:D.fog===!0,fogExp2:!!ht&&ht.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Ht,skinning:rt.isSkinnedMesh===!0,morphTargets:mt.morphAttributes.position!==void 0,morphNormals:mt.morphAttributes.normal!==void 0,morphColors:mt.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:at,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:tn,decodeVideoTexture:Be&&D.map.isVideoTexture===!0&&we.getTransfer(D.map.colorSpace)===ke,decodeVideoTextureEmissive:Ne&&D.emissiveMap.isVideoTexture===!0&&we.getTransfer(D.emissiveMap.colorSpace)===ke,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===va,flipSided:D.side===$n,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:ee&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&D.extensions.multiDraw===!0||re)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return mn.vertexUv1s=p.has(1),mn.vertexUv2s=p.has(2),mn.vertexUv3s=p.has(3),p.clear(),mn}function x(D){const w=[];if(D.shaderID?w.push(D.shaderID):(w.push(D.customVertexShaderID),w.push(D.customFragmentShaderID)),D.defines!==void 0)for(const F in D.defines)w.push(F),w.push(D.defines[F]);return D.isRawShaderMaterial===!1&&(L(w,D),U(w,D),w.push(r.outputColorSpace)),w.push(D.customProgramCacheKey),w.join()}function L(D,w){D.push(w.precision),D.push(w.outputColorSpace),D.push(w.envMapMode),D.push(w.envMapCubeUVHeight),D.push(w.mapUv),D.push(w.alphaMapUv),D.push(w.lightMapUv),D.push(w.aoMapUv),D.push(w.bumpMapUv),D.push(w.normalMapUv),D.push(w.displacementMapUv),D.push(w.emissiveMapUv),D.push(w.metalnessMapUv),D.push(w.roughnessMapUv),D.push(w.anisotropyMapUv),D.push(w.clearcoatMapUv),D.push(w.clearcoatNormalMapUv),D.push(w.clearcoatRoughnessMapUv),D.push(w.iridescenceMapUv),D.push(w.iridescenceThicknessMapUv),D.push(w.sheenColorMapUv),D.push(w.sheenRoughnessMapUv),D.push(w.specularMapUv),D.push(w.specularColorMapUv),D.push(w.specularIntensityMapUv),D.push(w.transmissionMapUv),D.push(w.thicknessMapUv),D.push(w.combine),D.push(w.fogExp2),D.push(w.sizeAttenuation),D.push(w.morphTargetsCount),D.push(w.morphAttributeCount),D.push(w.numDirLights),D.push(w.numPointLights),D.push(w.numSpotLights),D.push(w.numSpotLightMaps),D.push(w.numHemiLights),D.push(w.numRectAreaLights),D.push(w.numDirLightShadows),D.push(w.numPointLightShadows),D.push(w.numSpotLightShadows),D.push(w.numSpotLightShadowsWithMaps),D.push(w.numLightProbes),D.push(w.shadowMapType),D.push(w.toneMapping),D.push(w.numClippingPlanes),D.push(w.numClipIntersection),D.push(w.depthPacking)}function U(D,w){d.disableAll(),w.supportsVertexTextures&&d.enable(0),w.instancing&&d.enable(1),w.instancingColor&&d.enable(2),w.instancingMorph&&d.enable(3),w.matcap&&d.enable(4),w.envMap&&d.enable(5),w.normalMapObjectSpace&&d.enable(6),w.normalMapTangentSpace&&d.enable(7),w.clearcoat&&d.enable(8),w.iridescence&&d.enable(9),w.alphaTest&&d.enable(10),w.vertexColors&&d.enable(11),w.vertexAlphas&&d.enable(12),w.vertexUv1s&&d.enable(13),w.vertexUv2s&&d.enable(14),w.vertexUv3s&&d.enable(15),w.vertexTangents&&d.enable(16),w.anisotropy&&d.enable(17),w.alphaHash&&d.enable(18),w.batching&&d.enable(19),w.dispersion&&d.enable(20),w.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),w.fog&&d.enable(0),w.useFog&&d.enable(1),w.flatShading&&d.enable(2),w.logarithmicDepthBuffer&&d.enable(3),w.reverseDepthBuffer&&d.enable(4),w.skinning&&d.enable(5),w.morphTargets&&d.enable(6),w.morphNormals&&d.enable(7),w.morphColors&&d.enable(8),w.premultipliedAlpha&&d.enable(9),w.shadowMapEnabled&&d.enable(10),w.doubleSided&&d.enable(11),w.flipSided&&d.enable(12),w.useDepthPacking&&d.enable(13),w.dithering&&d.enable(14),w.transmission&&d.enable(15),w.sheen&&d.enable(16),w.opaque&&d.enable(17),w.pointsUvs&&d.enable(18),w.decodeVideoTexture&&d.enable(19),w.decodeVideoTextureEmissive&&d.enable(20),w.alphaToCoverage&&d.enable(21),D.push(d.mask)}function R(D){const w=M[D.type];let F;if(w){const nt=Xi[w];F=dE.clone(nt.uniforms)}else F=D.uniforms;return F}function Y(D,w){let F;for(let nt=0,rt=g.length;nt<rt;nt++){const ht=g[nt];if(ht.cacheKey===w){F=ht,++F.usedTimes;break}}return F===void 0&&(F=new AA(r,w,D,c),g.push(F)),F}function B(D){if(--D.usedTimes===0){const w=g.indexOf(D);g[w]=g[g.length-1],g.pop(),D.destroy()}}function O(D){m.remove(D)}function H(){m.dispose()}return{getParameters:E,getProgramCacheKey:x,getUniforms:R,acquireProgram:Y,releaseProgram:B,releaseShaderCache:O,programs:g,dispose:H}}function UA(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let d=r.get(f);return d===void 0&&(d={},r.set(f,d)),d}function s(f){r.delete(f)}function l(f,d,m){r.get(f)[d]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function LA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function dv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function pv(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function f(_,v,S,M,T,E){let x=r[t];return x===void 0?(x={id:_.id,object:_,geometry:v,material:S,groupOrder:M,renderOrder:_.renderOrder,z:T,group:E},r[t]=x):(x.id=_.id,x.object=_,x.geometry=v,x.material=S,x.groupOrder=M,x.renderOrder=_.renderOrder,x.z=T,x.group=E),t++,x}function d(_,v,S,M,T,E){const x=f(_,v,S,M,T,E);S.transmission>0?s.push(x):S.transparent===!0?l.push(x):i.push(x)}function m(_,v,S,M,T,E){const x=f(_,v,S,M,T,E);S.transmission>0?s.unshift(x):S.transparent===!0?l.unshift(x):i.unshift(x)}function p(_,v){i.length>1&&i.sort(_||LA),s.length>1&&s.sort(v||dv),l.length>1&&l.sort(v||dv)}function g(){for(let _=t,v=r.length;_<v;_++){const S=r[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function NA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new pv,r.set(s,[f])):l>=c.length?(f=new pv,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function OA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new V,color:new ae};break;case"SpotLight":i={position:new V,direction:new V,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new V,color:new ae,distance:0,decay:0};break;case"HemisphereLight":i={direction:new V,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":i={color:new ae,position:new V,halfWidth:new V,halfHeight:new V};break}return r[t.id]=i,i}}}function PA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let zA=0;function BA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function IA(r){const t=new OA,i=PA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new V);const l=new V,c=new Ye,f=new Ye;function d(p){let g=0,_=0,v=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let S=0,M=0,T=0,E=0,x=0,L=0,U=0,R=0,Y=0,B=0,O=0;p.sort(BA);for(let D=0,w=p.length;D<w;D++){const F=p[D],nt=F.color,rt=F.intensity,ht=F.distance,mt=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)g+=nt.r*rt,_+=nt.g*rt,v+=nt.b*rt;else if(F.isLightProbe){for(let z=0;z<9;z++)s.probe[z].addScaledVector(F.sh.coefficients[z],rt);O++}else if(F.isDirectionalLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const Q=F.shadow,K=i.get(F);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,s.directionalShadow[S]=K,s.directionalShadowMap[S]=mt,s.directionalShadowMatrix[S]=F.shadow.matrix,L++}s.directional[S]=z,S++}else if(F.isSpotLight){const z=t.get(F);z.position.setFromMatrixPosition(F.matrixWorld),z.color.copy(nt).multiplyScalar(rt),z.distance=ht,z.coneCos=Math.cos(F.angle),z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),z.decay=F.decay,s.spot[T]=z;const Q=F.shadow;if(F.map&&(s.spotLightMap[Y]=F.map,Y++,Q.updateMatrices(F),F.castShadow&&B++),s.spotLightMatrix[T]=Q.matrix,F.castShadow){const K=i.get(F);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,s.spotShadow[T]=K,s.spotShadowMap[T]=mt,R++}T++}else if(F.isRectAreaLight){const z=t.get(F);z.color.copy(nt).multiplyScalar(rt),z.halfWidth.set(F.width*.5,0,0),z.halfHeight.set(0,F.height*.5,0),s.rectArea[E]=z,E++}else if(F.isPointLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),z.distance=F.distance,z.decay=F.decay,F.castShadow){const Q=F.shadow,K=i.get(F);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,s.pointShadow[M]=K,s.pointShadowMap[M]=mt,s.pointShadowMatrix[M]=F.shadow.matrix,U++}s.point[M]=z,M++}else if(F.isHemisphereLight){const z=t.get(F);z.skyColor.copy(F.color).multiplyScalar(rt),z.groundColor.copy(F.groundColor).multiplyScalar(rt),s.hemi[x]=z,x++}}E>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Nt.LTC_FLOAT_1,s.rectAreaLTC2=Nt.LTC_FLOAT_2):(s.rectAreaLTC1=Nt.LTC_HALF_1,s.rectAreaLTC2=Nt.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=_,s.ambient[2]=v;const H=s.hash;(H.directionalLength!==S||H.pointLength!==M||H.spotLength!==T||H.rectAreaLength!==E||H.hemiLength!==x||H.numDirectionalShadows!==L||H.numPointShadows!==U||H.numSpotShadows!==R||H.numSpotMaps!==Y||H.numLightProbes!==O)&&(s.directional.length=S,s.spot.length=T,s.rectArea.length=E,s.point.length=M,s.hemi.length=x,s.directionalShadow.length=L,s.directionalShadowMap.length=L,s.pointShadow.length=U,s.pointShadowMap.length=U,s.spotShadow.length=R,s.spotShadowMap.length=R,s.directionalShadowMatrix.length=L,s.pointShadowMatrix.length=U,s.spotLightMatrix.length=R+Y-B,s.spotLightMap.length=Y,s.numSpotLightShadowsWithMaps=B,s.numLightProbes=O,H.directionalLength=S,H.pointLength=M,H.spotLength=T,H.rectAreaLength=E,H.hemiLength=x,H.numDirectionalShadows=L,H.numPointShadows=U,H.numSpotShadows=R,H.numSpotMaps=Y,H.numLightProbes=O,s.version=zA++)}function m(p,g){let _=0,v=0,S=0,M=0,T=0;const E=g.matrixWorldInverse;for(let x=0,L=p.length;x<L;x++){const U=p[x];if(U.isDirectionalLight){const R=s.directional[_];R.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(E),_++}else if(U.isSpotLight){const R=s.spot[S];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(E),R.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(E),S++}else if(U.isRectAreaLight){const R=s.rectArea[M];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(E),f.identity(),c.copy(U.matrixWorld),c.premultiply(E),f.extractRotation(c),R.halfWidth.set(U.width*.5,0,0),R.halfHeight.set(0,U.height*.5,0),R.halfWidth.applyMatrix4(f),R.halfHeight.applyMatrix4(f),M++}else if(U.isPointLight){const R=s.point[v];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(E),v++}else if(U.isHemisphereLight){const R=s.hemi[T];R.direction.setFromMatrixPosition(U.matrixWorld),R.direction.transformDirection(E),T++}}}return{setup:d,setupView:m,state:s}}function mv(r){const t=new IA(r),i=[],s=[];function l(g){p.camera=g,i.length=0,s.length=0}function c(g){i.push(g)}function f(g){s.push(g)}function d(){t.setup(i)}function m(g){t.setupView(i,g)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:f}}function FA(r){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new mv(r),t.set(l,[d])):c>=f.length?(d=new mv(r),f.push(d)):d=f[c],d}function s(){t=new WeakMap}return{get:i,dispose:s}}class HA extends Vs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=zM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class GA extends Vs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const VA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kA=`uniform sampler2D shadow_pass;
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
}`;function XA(r,t,i){let s=new fp;const l=new Te,c=new Te,f=new Xe,d=new HA({depthPacking:BM}),m=new GA,p={},g=i.maxTextureSize,_={[rs]:$n,[$n]:rs,[va]:va},v=new os({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:VA,fragmentShader:kA}),S=v.clone();S.defines.HORIZONTAL_PASS=1;const M=new An;M.setAttribute("position",new Jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new ie(M,v),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vv;let x=this.type;this.render=function(B,O,H){if(E.enabled===!1||E.autoUpdate===!1&&E.needsUpdate===!1||B.length===0)return;const D=r.getRenderTarget(),w=r.getActiveCubeFace(),F=r.getActiveMipmapLevel(),nt=r.state;nt.setBlending(as),nt.buffers.color.setClear(1,1,1,1),nt.buffers.depth.setTest(!0),nt.setScissorTest(!1);const rt=x!==_a&&this.type===_a,ht=x===_a&&this.type!==_a;for(let mt=0,z=B.length;mt<z;mt++){const Q=B[mt],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const St=K.getFrameExtents();if(l.multiply(St),c.copy(K.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/St.x),l.x=c.x*St.x,K.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/St.y),l.y=c.y*St.y,K.mapSize.y=c.y)),K.map===null||rt===!0||ht===!0){const P=this.type!==_a?{minFilter:zi,magFilter:zi}:{};K.map!==null&&K.map.dispose(),K.map=new Gs(l.x,l.y,P),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}r.setRenderTarget(K.map),r.clear();const Tt=K.getViewportCount();for(let P=0;P<Tt;P++){const at=K.getViewport(P);f.set(c.x*at.x,c.y*at.y,c.x*at.z,c.y*at.w),nt.viewport(f),K.updateMatrices(Q,P),s=K.getFrustum(),R(O,H,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===_a&&L(K,H),K.needsUpdate=!1}x=this.type,E.needsUpdate=!1,r.setRenderTarget(D,w,F)};function L(B,O){const H=t.update(T);v.defines.VSM_SAMPLES!==B.blurSamples&&(v.defines.VSM_SAMPLES=B.blurSamples,S.defines.VSM_SAMPLES=B.blurSamples,v.needsUpdate=!0,S.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new Gs(l.x,l.y)),v.uniforms.shadow_pass.value=B.map.texture,v.uniforms.resolution.value=B.mapSize,v.uniforms.radius.value=B.radius,r.setRenderTarget(B.mapPass),r.clear(),r.renderBufferDirect(O,null,H,v,T,null),S.uniforms.shadow_pass.value=B.mapPass.texture,S.uniforms.resolution.value=B.mapSize,S.uniforms.radius.value=B.radius,r.setRenderTarget(B.map),r.clear(),r.renderBufferDirect(O,null,H,S,T,null)}function U(B,O,H,D){let w=null;const F=H.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(F!==void 0)w=F;else if(w=H.isPointLight===!0?m:d,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const nt=w.uuid,rt=O.uuid;let ht=p[nt];ht===void 0&&(ht={},p[nt]=ht);let mt=ht[rt];mt===void 0&&(mt=w.clone(),ht[rt]=mt,O.addEventListener("dispose",Y)),w=mt}if(w.visible=O.visible,w.wireframe=O.wireframe,D===_a?w.side=O.shadowSide!==null?O.shadowSide:O.side:w.side=O.shadowSide!==null?O.shadowSide:_[O.side],w.alphaMap=O.alphaMap,w.alphaTest=O.alphaTest,w.map=O.map,w.clipShadows=O.clipShadows,w.clippingPlanes=O.clippingPlanes,w.clipIntersection=O.clipIntersection,w.displacementMap=O.displacementMap,w.displacementScale=O.displacementScale,w.displacementBias=O.displacementBias,w.wireframeLinewidth=O.wireframeLinewidth,w.linewidth=O.linewidth,H.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const nt=r.properties.get(w);nt.light=H}return w}function R(B,O,H,D,w){if(B.visible===!1)return;if(B.layers.test(O.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&w===_a)&&(!B.frustumCulled||s.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,B.matrixWorld);const rt=t.update(B),ht=B.material;if(Array.isArray(ht)){const mt=rt.groups;for(let z=0,Q=mt.length;z<Q;z++){const K=mt[z],St=ht[K.materialIndex];if(St&&St.visible){const Tt=U(B,St,D,w);B.onBeforeShadow(r,B,O,H,rt,Tt,K),r.renderBufferDirect(H,null,rt,Tt,B,K),B.onAfterShadow(r,B,O,H,rt,Tt,K)}}}else if(ht.visible){const mt=U(B,ht,D,w);B.onBeforeShadow(r,B,O,H,rt,mt,null),r.renderBufferDirect(H,null,rt,mt,B,null),B.onAfterShadow(r,B,O,H,rt,mt,null)}}const nt=B.children;for(let rt=0,ht=nt.length;rt<ht;rt++)R(nt[rt],O,H,D,w)}function Y(B){B.target.removeEventListener("dispose",Y);for(const H in p){const D=p[H],w=B.target.uuid;w in D&&(D[w].dispose(),delete D[w])}}}const WA={[dd]:pd,[md]:vd,[gd]:xd,[Vr]:_d,[pd]:dd,[vd]:md,[xd]:gd,[_d]:Vr};function qA(r,t){function i(){let k=!1;const wt=new Xe;let ct=null;const vt=new Xe(0,0,0,0);return{setMask:function(Rt){ct!==Rt&&!k&&(r.colorMask(Rt,Rt,Rt,Rt),ct=Rt)},setLocked:function(Rt){k=Rt},setClear:function(Rt,Lt,ee,tn,mn){mn===!0&&(Rt*=tn,Lt*=tn,ee*=tn),wt.set(Rt,Lt,ee,tn),vt.equals(wt)===!1&&(r.clearColor(Rt,Lt,ee,tn),vt.copy(wt))},reset:function(){k=!1,ct=null,vt.set(-1,0,0,0)}}}function s(){let k=!1,wt=!1,ct=null,vt=null,Rt=null;return{setReversed:function(Lt){if(wt!==Lt){const ee=t.get("EXT_clip_control");wt?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT);const tn=Rt;Rt=null,this.setClear(tn)}wt=Lt},getReversed:function(){return wt},setTest:function(Lt){Lt?xt(r.DEPTH_TEST):Ht(r.DEPTH_TEST)},setMask:function(Lt){ct!==Lt&&!k&&(r.depthMask(Lt),ct=Lt)},setFunc:function(Lt){if(wt&&(Lt=WA[Lt]),vt!==Lt){switch(Lt){case dd:r.depthFunc(r.NEVER);break;case pd:r.depthFunc(r.ALWAYS);break;case md:r.depthFunc(r.LESS);break;case Vr:r.depthFunc(r.LEQUAL);break;case gd:r.depthFunc(r.EQUAL);break;case _d:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case xd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}vt=Lt}},setLocked:function(Lt){k=Lt},setClear:function(Lt){Rt!==Lt&&(wt&&(Lt=1-Lt),r.clearDepth(Lt),Rt=Lt)},reset:function(){k=!1,ct=null,vt=null,Rt=null,wt=!1}}}function l(){let k=!1,wt=null,ct=null,vt=null,Rt=null,Lt=null,ee=null,tn=null,mn=null;return{setTest:function(Ae){k||(Ae?xt(r.STENCIL_TEST):Ht(r.STENCIL_TEST))},setMask:function(Ae){wt!==Ae&&!k&&(r.stencilMask(Ae),wt=Ae)},setFunc:function(Ae,wn,Ai){(ct!==Ae||vt!==wn||Rt!==Ai)&&(r.stencilFunc(Ae,wn,Ai),ct=Ae,vt=wn,Rt=Ai)},setOp:function(Ae,wn,Ai){(Lt!==Ae||ee!==wn||tn!==Ai)&&(r.stencilOp(Ae,wn,Ai),Lt=Ae,ee=wn,tn=Ai)},setLocked:function(Ae){k=Ae},setClear:function(Ae){mn!==Ae&&(r.clearStencil(Ae),mn=Ae)},reset:function(){k=!1,wt=null,ct=null,vt=null,Rt=null,Lt=null,ee=null,tn=null,mn=null}}}const c=new i,f=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},_={},v=new WeakMap,S=[],M=null,T=!1,E=null,x=null,L=null,U=null,R=null,Y=null,B=null,O=new ae(0,0,0),H=0,D=!1,w=null,F=null,nt=null,rt=null,ht=null;const mt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=Q>=2);let St=null,Tt={};const P=r.getParameter(r.SCISSOR_BOX),at=r.getParameter(r.VIEWPORT),yt=new Xe().fromArray(P),Z=new Xe().fromArray(at);function ut(k,wt,ct,vt){const Rt=new Uint8Array(4),Lt=r.createTexture();r.bindTexture(k,Lt),r.texParameteri(k,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(k,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ee=0;ee<ct;ee++)k===r.TEXTURE_3D||k===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,vt,0,r.RGBA,r.UNSIGNED_BYTE,Rt):r.texImage2D(wt+ee,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Rt);return Lt}const Et={};Et[r.TEXTURE_2D]=ut(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ut(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ut(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ut(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),xt(r.DEPTH_TEST),f.setFunc(Vr),pe(!1),ve(y_),xt(r.CULL_FACE),q(as);function xt(k){g[k]!==!0&&(r.enable(k),g[k]=!0)}function Ht(k){g[k]!==!1&&(r.disable(k),g[k]=!1)}function Ft(k,wt){return _[k]!==wt?(r.bindFramebuffer(k,wt),_[k]=wt,k===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=wt),k===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function re(k,wt){let ct=S,vt=!1;if(k){ct=v.get(wt),ct===void 0&&(ct=[],v.set(wt,ct));const Rt=k.textures;if(ct.length!==Rt.length||ct[0]!==r.COLOR_ATTACHMENT0){for(let Lt=0,ee=Rt.length;Lt<ee;Lt++)ct[Lt]=r.COLOR_ATTACHMENT0+Lt;ct.length=Rt.length,vt=!0}}else ct[0]!==r.BACK&&(ct[0]=r.BACK,vt=!0);vt&&r.drawBuffers(ct)}function Be(k){return M!==k?(r.useProgram(k),M=k,!0):!1}const me={[Os]:r.FUNC_ADD,[cM]:r.FUNC_SUBTRACT,[uM]:r.FUNC_REVERSE_SUBTRACT};me[fM]=r.MIN,me[hM]=r.MAX;const $e={[dM]:r.ZERO,[pM]:r.ONE,[mM]:r.SRC_COLOR,[fd]:r.SRC_ALPHA,[SM]:r.SRC_ALPHA_SATURATE,[xM]:r.DST_COLOR,[_M]:r.DST_ALPHA,[gM]:r.ONE_MINUS_SRC_COLOR,[hd]:r.ONE_MINUS_SRC_ALPHA,[yM]:r.ONE_MINUS_DST_COLOR,[vM]:r.ONE_MINUS_DST_ALPHA,[MM]:r.CONSTANT_COLOR,[EM]:r.ONE_MINUS_CONSTANT_COLOR,[TM]:r.CONSTANT_ALPHA,[bM]:r.ONE_MINUS_CONSTANT_ALPHA};function q(k,wt,ct,vt,Rt,Lt,ee,tn,mn,Ae){if(k===as){T===!0&&(Ht(r.BLEND),T=!1);return}if(T===!1&&(xt(r.BLEND),T=!0),k!==lM){if(k!==E||Ae!==D){if((x!==Os||R!==Os)&&(r.blendEquation(r.FUNC_ADD),x=Os,R=Os),Ae)switch(k){case Fr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ud:r.blendFunc(r.ONE,r.ONE);break;case S_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case M_:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Fr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ud:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case S_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case M_:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}L=null,U=null,Y=null,B=null,O.set(0,0,0),H=0,E=k,D=Ae}return}Rt=Rt||wt,Lt=Lt||ct,ee=ee||vt,(wt!==x||Rt!==R)&&(r.blendEquationSeparate(me[wt],me[Rt]),x=wt,R=Rt),(ct!==L||vt!==U||Lt!==Y||ee!==B)&&(r.blendFuncSeparate($e[ct],$e[vt],$e[Lt],$e[ee]),L=ct,U=vt,Y=Lt,B=ee),(tn.equals(O)===!1||mn!==H)&&(r.blendColor(tn.r,tn.g,tn.b,mn),O.copy(tn),H=mn),E=k,D=!1}function Pn(k,wt){k.side===va?Ht(r.CULL_FACE):xt(r.CULL_FACE);let ct=k.side===$n;wt&&(ct=!ct),pe(ct),k.blending===Fr&&k.transparent===!1?q(as):q(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),f.setFunc(k.depthFunc),f.setTest(k.depthTest),f.setMask(k.depthWrite),c.setMask(k.colorWrite);const vt=k.stencilWrite;d.setTest(vt),vt&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ne(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?xt(r.SAMPLE_ALPHA_TO_COVERAGE):Ht(r.SAMPLE_ALPHA_TO_COVERAGE)}function pe(k){w!==k&&(k?r.frontFace(r.CW):r.frontFace(r.CCW),w=k)}function ve(k){k!==rM?(xt(r.CULL_FACE),k!==F&&(k===y_?r.cullFace(r.BACK):k===oM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ht(r.CULL_FACE),F=k}function Qt(k){k!==nt&&(z&&r.lineWidth(k),nt=k)}function Ne(k,wt,ct){k?(xt(r.POLYGON_OFFSET_FILL),(rt!==wt||ht!==ct)&&(r.polygonOffset(wt,ct),rt=wt,ht=ct)):Ht(r.POLYGON_OFFSET_FILL)}function Zt(k){k?xt(r.SCISSOR_TEST):Ht(r.SCISSOR_TEST)}function N(k){k===void 0&&(k=r.TEXTURE0+mt-1),St!==k&&(r.activeTexture(k),St=k)}function A(k,wt,ct){ct===void 0&&(St===null?ct=r.TEXTURE0+mt-1:ct=St);let vt=Tt[ct];vt===void 0&&(vt={type:void 0,texture:void 0},Tt[ct]=vt),(vt.type!==k||vt.texture!==wt)&&(St!==ct&&(r.activeTexture(ct),St=ct),r.bindTexture(k,wt||Et[k]),vt.type=k,vt.texture=wt)}function it(){const k=Tt[St];k!==void 0&&k.type!==void 0&&(r.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function dt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Wt(){try{r.texSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ut(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function xe(){try{r.texStorage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{r.texImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function qt(k){yt.equals(k)===!1&&(r.scissor(k.x,k.y,k.z,k.w),yt.copy(k))}function Ot(k){Z.equals(k)===!1&&(r.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function te(k,wt){let ct=p.get(wt);ct===void 0&&(ct=new WeakMap,p.set(wt,ct));let vt=ct.get(k);vt===void 0&&(vt=r.getUniformBlockIndex(wt,k.name),ct.set(k,vt))}function le(k,wt){const vt=p.get(wt).get(k);m.get(wt)!==vt&&(r.uniformBlockBinding(wt,vt,k.__bindingPointIndex),m.set(wt,vt))}function Ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},St=null,Tt={},_={},v=new WeakMap,S=[],M=null,T=!1,E=null,x=null,L=null,U=null,R=null,Y=null,B=null,O=new ae(0,0,0),H=0,D=!1,w=null,F=null,nt=null,rt=null,ht=null,yt.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:xt,disable:Ht,bindFramebuffer:Ft,drawBuffers:re,useProgram:Be,setBlending:q,setMaterial:Pn,setFlipSided:pe,setCullFace:ve,setLineWidth:Qt,setPolygonOffset:Ne,setScissorTest:Zt,activeTexture:N,bindTexture:A,unbindTexture:it,compressedTexImage2D:dt,compressedTexImage3D:Mt,texImage2D:zt,texImage3D:Kt,updateUBOMapping:te,uniformBlockBinding:le,texStorage2D:xe,texStorage3D:At,texSubImage2D:gt,texSubImage3D:Wt,compressedTexSubImage2D:Ut,compressedTexSubImage3D:Pt,scissor:qt,viewport:Ot,reset:Ie}}function gv(r,t,i,s){const l=jA(s);switch(i){case Zv:return r*t;case Qv:return r*t;case Jv:return r*t*2;case $v:return r*t/l.components*l.byteLength;case op:return r*t/l.components*l.byteLength;case tx:return r*t*2/l.components*l.byteLength;case lp:return r*t*2/l.components*l.byteLength;case Kv:return r*t*3/l.components*l.byteLength;case Pi:return r*t*4/l.components*l.byteLength;case cp:return r*t*4/l.components*l.byteLength;case Jc:case $c:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case tu:case eu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case bd:case wd:return Math.max(r,16)*Math.max(t,8)/4;case Td:case Ad:return Math.max(r,8)*Math.max(t,8)/2;case Rd:case Cd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Dd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ud:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ld:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Nd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Od:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Pd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case zd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Bd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Id:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Gd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case kd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Xd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case nu:case Wd:case qd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case ex:case jd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Yd:case Zd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function jA(r){switch(r){case Ma:case qv:return{byteLength:1,components:1};case nl:case jv:case il:return{byteLength:2,components:1};case sp:case rp:return{byteLength:2,components:4};case Hs:case ap:case xa:return{byteLength:4,components:1};case Yv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function YA(r,t,i,s,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Te,g=new WeakMap;let _;const v=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(N,A){return S?new OffscreenCanvas(N,A):ru("canvas")}function T(N,A,it){let dt=1;const Mt=Zt(N);if((Mt.width>it||Mt.height>it)&&(dt=it/Math.max(Mt.width,Mt.height)),dt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const gt=Math.floor(dt*Mt.width),Wt=Math.floor(dt*Mt.height);_===void 0&&(_=M(gt,Wt));const Ut=A?M(gt,Wt):_;return Ut.width=gt,Ut.height=Wt,Ut.getContext("2d").drawImage(N,0,0,gt,Wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+gt+"x"+Wt+")."),Ut}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),N;return N}function E(N){return N.generateMipmaps}function x(N){r.generateMipmap(N)}function L(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function U(N,A,it,dt,Mt=!1){if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt=A;if(A===r.RED&&(it===r.FLOAT&&(gt=r.R32F),it===r.HALF_FLOAT&&(gt=r.R16F),it===r.UNSIGNED_BYTE&&(gt=r.R8)),A===r.RED_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.R8UI),it===r.UNSIGNED_SHORT&&(gt=r.R16UI),it===r.UNSIGNED_INT&&(gt=r.R32UI),it===r.BYTE&&(gt=r.R8I),it===r.SHORT&&(gt=r.R16I),it===r.INT&&(gt=r.R32I)),A===r.RG&&(it===r.FLOAT&&(gt=r.RG32F),it===r.HALF_FLOAT&&(gt=r.RG16F),it===r.UNSIGNED_BYTE&&(gt=r.RG8)),A===r.RG_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RG8UI),it===r.UNSIGNED_SHORT&&(gt=r.RG16UI),it===r.UNSIGNED_INT&&(gt=r.RG32UI),it===r.BYTE&&(gt=r.RG8I),it===r.SHORT&&(gt=r.RG16I),it===r.INT&&(gt=r.RG32I)),A===r.RGB_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),it===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),it===r.UNSIGNED_INT&&(gt=r.RGB32UI),it===r.BYTE&&(gt=r.RGB8I),it===r.SHORT&&(gt=r.RGB16I),it===r.INT&&(gt=r.RGB32I)),A===r.RGBA_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),it===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),it===r.UNSIGNED_INT&&(gt=r.RGBA32UI),it===r.BYTE&&(gt=r.RGBA8I),it===r.SHORT&&(gt=r.RGBA16I),it===r.INT&&(gt=r.RGBA32I)),A===r.RGB&&it===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),A===r.RGBA){const Wt=Mt?du:we.getTransfer(dt);it===r.FLOAT&&(gt=r.RGBA32F),it===r.HALF_FLOAT&&(gt=r.RGBA16F),it===r.UNSIGNED_BYTE&&(gt=Wt===ke?r.SRGB8_ALPHA8:r.RGBA8),it===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),it===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function R(N,A){let it;return N?A===null||A===Hs||A===Wr?it=r.DEPTH24_STENCIL8:A===xa?it=r.DEPTH32F_STENCIL8:A===nl&&(it=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Hs||A===Wr?it=r.DEPTH_COMPONENT24:A===xa?it=r.DEPTH_COMPONENT32F:A===nl&&(it=r.DEPTH_COMPONENT16),it}function Y(N,A){return E(N)===!0||N.isFramebufferTexture&&N.minFilter!==zi&&N.minFilter!==Wi?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function B(N){const A=N.target;A.removeEventListener("dispose",B),H(A),A.isVideoTexture&&g.delete(A)}function O(N){const A=N.target;A.removeEventListener("dispose",O),w(A)}function H(N){const A=s.get(N);if(A.__webglInit===void 0)return;const it=N.source,dt=v.get(it);if(dt){const Mt=dt[A.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&D(N),Object.keys(dt).length===0&&v.delete(it)}s.remove(N)}function D(N){const A=s.get(N);r.deleteTexture(A.__webglTexture);const it=N.source,dt=v.get(it);delete dt[A.__cacheKey],f.memory.textures--}function w(N){const A=s.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),s.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(A.__webglFramebuffer[dt]))for(let Mt=0;Mt<A.__webglFramebuffer[dt].length;Mt++)r.deleteFramebuffer(A.__webglFramebuffer[dt][Mt]);else r.deleteFramebuffer(A.__webglFramebuffer[dt]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[dt])}else{if(Array.isArray(A.__webglFramebuffer))for(let dt=0;dt<A.__webglFramebuffer.length;dt++)r.deleteFramebuffer(A.__webglFramebuffer[dt]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let dt=0;dt<A.__webglColorRenderbuffer.length;dt++)A.__webglColorRenderbuffer[dt]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[dt]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const it=N.textures;for(let dt=0,Mt=it.length;dt<Mt;dt++){const gt=s.get(it[dt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),s.remove(it[dt])}s.remove(N)}let F=0;function nt(){F=0}function rt(){const N=F;return N>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),F+=1,N}function ht(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function mt(N,A){const it=s.get(N);if(N.isVideoTexture&&Qt(N),N.isRenderTargetTexture===!1&&N.version>0&&it.__version!==N.version){const dt=N.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(it,N,A);return}}i.bindTexture(r.TEXTURE_2D,it.__webglTexture,r.TEXTURE0+A)}function z(N,A){const it=s.get(N);if(N.version>0&&it.__version!==N.version){Z(it,N,A);return}i.bindTexture(r.TEXTURE_2D_ARRAY,it.__webglTexture,r.TEXTURE0+A)}function Q(N,A){const it=s.get(N);if(N.version>0&&it.__version!==N.version){Z(it,N,A);return}i.bindTexture(r.TEXTURE_3D,it.__webglTexture,r.TEXTURE0+A)}function K(N,A){const it=s.get(N);if(N.version>0&&it.__version!==N.version){ut(it,N,A);return}i.bindTexture(r.TEXTURE_CUBE_MAP,it.__webglTexture,r.TEXTURE0+A)}const St={[Md]:r.REPEAT,[Bs]:r.CLAMP_TO_EDGE,[Ed]:r.MIRRORED_REPEAT},Tt={[zi]:r.NEAREST,[PM]:r.NEAREST_MIPMAP_NEAREST,[Sc]:r.NEAREST_MIPMAP_LINEAR,[Wi]:r.LINEAR,[Dh]:r.LINEAR_MIPMAP_NEAREST,[Is]:r.LINEAR_MIPMAP_LINEAR},P={[FM]:r.NEVER,[WM]:r.ALWAYS,[HM]:r.LESS,[ix]:r.LEQUAL,[GM]:r.EQUAL,[XM]:r.GEQUAL,[VM]:r.GREATER,[kM]:r.NOTEQUAL};function at(N,A){if(A.type===xa&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===Wi||A.magFilter===Dh||A.magFilter===Sc||A.magFilter===Is||A.minFilter===Wi||A.minFilter===Dh||A.minFilter===Sc||A.minFilter===Is)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,St[A.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,St[A.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,St[A.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Tt[A.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Tt[A.minFilter]),A.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,P[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===zi||A.minFilter!==Sc&&A.minFilter!==Is||A.type===xa&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||s.get(A).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");r.texParameterf(N,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy}}}function yt(N,A){let it=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",B));const dt=A.source;let Mt=v.get(dt);Mt===void 0&&(Mt={},v.set(dt,Mt));const gt=ht(A);if(gt!==N.__cacheKey){Mt[gt]===void 0&&(Mt[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,it=!0),Mt[gt].usedTimes++;const Wt=Mt[N.__cacheKey];Wt!==void 0&&(Mt[N.__cacheKey].usedTimes--,Wt.usedTimes===0&&D(A)),N.__cacheKey=gt,N.__webglTexture=Mt[gt].texture}return it}function Z(N,A,it){let dt=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(dt=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(dt=r.TEXTURE_3D);const Mt=yt(N,A),gt=A.source;i.bindTexture(dt,N.__webglTexture,r.TEXTURE0+it);const Wt=s.get(gt);if(gt.version!==Wt.__version||Mt===!0){i.activeTexture(r.TEXTURE0+it);const Ut=we.getPrimaries(we.workingColorSpace),Pt=A.colorSpace===is?null:we.getPrimaries(A.colorSpace),xe=A.colorSpace===is||Ut===Pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let At=T(A.image,!1,l.maxTextureSize);At=Ne(A,At);const zt=c.convert(A.format,A.colorSpace),Kt=c.convert(A.type);let qt=U(A.internalFormat,zt,Kt,A.colorSpace,A.isVideoTexture);at(dt,A);let Ot;const te=A.mipmaps,le=A.isVideoTexture!==!0,Ie=Wt.__version===void 0||Mt===!0,k=gt.dataReady,wt=Y(A,At);if(A.isDepthTexture)qt=R(A.format===qr,A.type),Ie&&(le?i.texStorage2D(r.TEXTURE_2D,1,qt,At.width,At.height):i.texImage2D(r.TEXTURE_2D,0,qt,At.width,At.height,0,zt,Kt,null));else if(A.isDataTexture)if(te.length>0){le&&Ie&&i.texStorage2D(r.TEXTURE_2D,wt,qt,te[0].width,te[0].height);for(let ct=0,vt=te.length;ct<vt;ct++)Ot=te[ct],le?k&&i.texSubImage2D(r.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,zt,Kt,Ot.data):i.texImage2D(r.TEXTURE_2D,ct,qt,Ot.width,Ot.height,0,zt,Kt,Ot.data);A.generateMipmaps=!1}else le?(Ie&&i.texStorage2D(r.TEXTURE_2D,wt,qt,At.width,At.height),k&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,zt,Kt,At.data)):i.texImage2D(r.TEXTURE_2D,0,qt,At.width,At.height,0,zt,Kt,At.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){le&&Ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,wt,qt,te[0].width,te[0].height,At.depth);for(let ct=0,vt=te.length;ct<vt;ct++)if(Ot=te[ct],A.format!==Pi)if(zt!==null)if(le){if(k)if(A.layerUpdates.size>0){const Rt=gv(Ot.width,Ot.height,A.format,A.type);for(const Lt of A.layerUpdates){const ee=Ot.data.subarray(Lt*Rt/Ot.data.BYTES_PER_ELEMENT,(Lt+1)*Rt/Ot.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,Lt,Ot.width,Ot.height,1,zt,ee)}A.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Ot.width,Ot.height,At.depth,zt,Ot.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ct,qt,Ot.width,Ot.height,At.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?k&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Ot.width,Ot.height,At.depth,zt,Kt,Ot.data):i.texImage3D(r.TEXTURE_2D_ARRAY,ct,qt,Ot.width,Ot.height,At.depth,0,zt,Kt,Ot.data)}else{le&&Ie&&i.texStorage2D(r.TEXTURE_2D,wt,qt,te[0].width,te[0].height);for(let ct=0,vt=te.length;ct<vt;ct++)Ot=te[ct],A.format!==Pi?zt!==null?le?k&&i.compressedTexSubImage2D(r.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,zt,Ot.data):i.compressedTexImage2D(r.TEXTURE_2D,ct,qt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?k&&i.texSubImage2D(r.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,zt,Kt,Ot.data):i.texImage2D(r.TEXTURE_2D,ct,qt,Ot.width,Ot.height,0,zt,Kt,Ot.data)}else if(A.isDataArrayTexture)if(le){if(Ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,wt,qt,At.width,At.height,At.depth),k)if(A.layerUpdates.size>0){const ct=gv(At.width,At.height,A.format,A.type);for(const vt of A.layerUpdates){const Rt=At.data.subarray(vt*ct/At.data.BYTES_PER_ELEMENT,(vt+1)*ct/At.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,vt,At.width,At.height,1,zt,Kt,Rt)}A.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,zt,Kt,At.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,qt,At.width,At.height,At.depth,0,zt,Kt,At.data);else if(A.isData3DTexture)le?(Ie&&i.texStorage3D(r.TEXTURE_3D,wt,qt,At.width,At.height,At.depth),k&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,zt,Kt,At.data)):i.texImage3D(r.TEXTURE_3D,0,qt,At.width,At.height,At.depth,0,zt,Kt,At.data);else if(A.isFramebufferTexture){if(Ie)if(le)i.texStorage2D(r.TEXTURE_2D,wt,qt,At.width,At.height);else{let ct=At.width,vt=At.height;for(let Rt=0;Rt<wt;Rt++)i.texImage2D(r.TEXTURE_2D,Rt,qt,ct,vt,0,zt,Kt,null),ct>>=1,vt>>=1}}else if(te.length>0){if(le&&Ie){const ct=Zt(te[0]);i.texStorage2D(r.TEXTURE_2D,wt,qt,ct.width,ct.height)}for(let ct=0,vt=te.length;ct<vt;ct++)Ot=te[ct],le?k&&i.texSubImage2D(r.TEXTURE_2D,ct,0,0,zt,Kt,Ot):i.texImage2D(r.TEXTURE_2D,ct,qt,zt,Kt,Ot);A.generateMipmaps=!1}else if(le){if(Ie){const ct=Zt(At);i.texStorage2D(r.TEXTURE_2D,wt,qt,ct.width,ct.height)}k&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,zt,Kt,At)}else i.texImage2D(r.TEXTURE_2D,0,qt,zt,Kt,At);E(A)&&x(dt),Wt.__version=gt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function ut(N,A,it){if(A.image.length!==6)return;const dt=yt(N,A),Mt=A.source;i.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+it);const gt=s.get(Mt);if(Mt.version!==gt.__version||dt===!0){i.activeTexture(r.TEXTURE0+it);const Wt=we.getPrimaries(we.workingColorSpace),Ut=A.colorSpace===is?null:we.getPrimaries(A.colorSpace),Pt=A.colorSpace===is||Wt===Ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const xe=A.isCompressedTexture||A.image[0].isCompressedTexture,At=A.image[0]&&A.image[0].isDataTexture,zt=[];for(let vt=0;vt<6;vt++)!xe&&!At?zt[vt]=T(A.image[vt],!0,l.maxCubemapSize):zt[vt]=At?A.image[vt].image:A.image[vt],zt[vt]=Ne(A,zt[vt]);const Kt=zt[0],qt=c.convert(A.format,A.colorSpace),Ot=c.convert(A.type),te=U(A.internalFormat,qt,Ot,A.colorSpace),le=A.isVideoTexture!==!0,Ie=gt.__version===void 0||dt===!0,k=Mt.dataReady;let wt=Y(A,Kt);at(r.TEXTURE_CUBE_MAP,A);let ct;if(xe){le&&Ie&&i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,Kt.width,Kt.height);for(let vt=0;vt<6;vt++){ct=zt[vt].mipmaps;for(let Rt=0;Rt<ct.length;Rt++){const Lt=ct[Rt];A.format!==Pi?qt!==null?le?k&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt,0,0,Lt.width,Lt.height,qt,Lt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt,te,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):le?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt,0,0,Lt.width,Lt.height,qt,Ot,Lt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt,te,Lt.width,Lt.height,0,qt,Ot,Lt.data)}}}else{if(ct=A.mipmaps,le&&Ie){ct.length>0&&wt++;const vt=Zt(zt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,te,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(At){le?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,zt[vt].width,zt[vt].height,qt,Ot,zt[vt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,zt[vt].width,zt[vt].height,0,qt,Ot,zt[vt].data);for(let Rt=0;Rt<ct.length;Rt++){const ee=ct[Rt].image[vt].image;le?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt+1,0,0,ee.width,ee.height,qt,Ot,ee.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt+1,te,ee.width,ee.height,0,qt,Ot,ee.data)}}else{le?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,qt,Ot,zt[vt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,te,qt,Ot,zt[vt]);for(let Rt=0;Rt<ct.length;Rt++){const Lt=ct[Rt];le?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt+1,0,0,qt,Ot,Lt.image[vt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Rt+1,te,qt,Ot,Lt.image[vt])}}}E(A)&&x(r.TEXTURE_CUBE_MAP),gt.__version=Mt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Et(N,A,it,dt,Mt,gt){const Wt=c.convert(it.format,it.colorSpace),Ut=c.convert(it.type),Pt=U(it.internalFormat,Wt,Ut,it.colorSpace),xe=s.get(A),At=s.get(it);if(At.__renderTarget=A,!xe.__hasExternalTextures){const zt=Math.max(1,A.width>>gt),Kt=Math.max(1,A.height>>gt);Mt===r.TEXTURE_3D||Mt===r.TEXTURE_2D_ARRAY?i.texImage3D(Mt,gt,Pt,zt,Kt,A.depth,0,Wt,Ut,null):i.texImage2D(Mt,gt,Pt,zt,Kt,0,Wt,Ut,null)}i.bindFramebuffer(r.FRAMEBUFFER,N),ve(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,Mt,At.__webglTexture,0,pe(A)):(Mt===r.TEXTURE_2D||Mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,dt,Mt,At.__webglTexture,gt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function xt(N,A,it){if(r.bindRenderbuffer(r.RENDERBUFFER,N),A.depthBuffer){const dt=A.depthTexture,Mt=dt&&dt.isDepthTexture?dt.type:null,gt=R(A.stencilBuffer,Mt),Wt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ut=pe(A);ve(A)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ut,gt,A.width,A.height):it?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ut,gt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,gt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Wt,r.RENDERBUFFER,N)}else{const dt=A.textures;for(let Mt=0;Mt<dt.length;Mt++){const gt=dt[Mt],Wt=c.convert(gt.format,gt.colorSpace),Ut=c.convert(gt.type),Pt=U(gt.internalFormat,Wt,Ut,gt.colorSpace),xe=pe(A);it&&ve(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,Pt,A.width,A.height):ve(A)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,Pt,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Pt,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ht(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(r.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=s.get(A.depthTexture);dt.__renderTarget=A,(!dt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),mt(A.depthTexture,0);const Mt=dt.__webglTexture,gt=pe(A);if(A.depthTexture.format===Hr)ve(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0);else if(A.depthTexture.format===qr)ve(A)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Ft(N){const A=s.get(N),it=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const dt=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),dt){const Mt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,dt.removeEventListener("dispose",Mt)};dt.addEventListener("dispose",Mt),A.__depthDisposeCallback=Mt}A.__boundDepthTexture=dt}if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(it)throw new Error("target.depthTexture not supported in Cube render targets");Ht(A.__webglFramebuffer,N)}else if(it){A.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(i.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[dt]),A.__webglDepthbuffer[dt]===void 0)A.__webglDepthbuffer[dt]=r.createRenderbuffer(),xt(A.__webglDepthbuffer[dt],N,!1);else{const Mt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=A.__webglDepthbuffer[dt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,gt)}}else if(i.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),xt(A.__webglDepthbuffer,N,!1);else{const dt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,Mt)}i.bindFramebuffer(r.FRAMEBUFFER,null)}function re(N,A,it){const dt=s.get(N);A!==void 0&&Et(dt.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),it!==void 0&&Ft(N)}function Be(N){const A=N.texture,it=s.get(N),dt=s.get(A);N.addEventListener("dispose",O);const Mt=N.textures,gt=N.isWebGLCubeRenderTarget===!0,Wt=Mt.length>1;if(Wt||(dt.__webglTexture===void 0&&(dt.__webglTexture=r.createTexture()),dt.__version=A.version,f.memory.textures++),gt){it.__webglFramebuffer=[];for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0){it.__webglFramebuffer[Ut]=[];for(let Pt=0;Pt<A.mipmaps.length;Pt++)it.__webglFramebuffer[Ut][Pt]=r.createFramebuffer()}else it.__webglFramebuffer[Ut]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){it.__webglFramebuffer=[];for(let Ut=0;Ut<A.mipmaps.length;Ut++)it.__webglFramebuffer[Ut]=r.createFramebuffer()}else it.__webglFramebuffer=r.createFramebuffer();if(Wt)for(let Ut=0,Pt=Mt.length;Ut<Pt;Ut++){const xe=s.get(Mt[Ut]);xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&ve(N)===!1){it.__webglMultisampledFramebuffer=r.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let Ut=0;Ut<Mt.length;Ut++){const Pt=Mt[Ut];it.__webglColorRenderbuffer[Ut]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,it.__webglColorRenderbuffer[Ut]);const xe=c.convert(Pt.format,Pt.colorSpace),At=c.convert(Pt.type),zt=U(Pt.internalFormat,xe,At,Pt.colorSpace,N.isXRRenderTarget===!0),Kt=pe(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,zt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ut,r.RENDERBUFFER,it.__webglColorRenderbuffer[Ut])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(it.__webglDepthRenderbuffer=r.createRenderbuffer(),xt(it.__webglDepthRenderbuffer,N,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){i.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),at(r.TEXTURE_CUBE_MAP,A);for(let Ut=0;Ut<6;Ut++)if(A.mipmaps&&A.mipmaps.length>0)for(let Pt=0;Pt<A.mipmaps.length;Pt++)Et(it.__webglFramebuffer[Ut][Pt],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,Pt);else Et(it.__webglFramebuffer[Ut],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0);E(A)&&x(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Wt){for(let Ut=0,Pt=Mt.length;Ut<Pt;Ut++){const xe=Mt[Ut],At=s.get(xe);i.bindTexture(r.TEXTURE_2D,At.__webglTexture),at(r.TEXTURE_2D,xe),Et(it.__webglFramebuffer,N,xe,r.COLOR_ATTACHMENT0+Ut,r.TEXTURE_2D,0),E(xe)&&x(r.TEXTURE_2D)}i.unbindTexture()}else{let Ut=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Ut=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Ut,dt.__webglTexture),at(Ut,A),A.mipmaps&&A.mipmaps.length>0)for(let Pt=0;Pt<A.mipmaps.length;Pt++)Et(it.__webglFramebuffer[Pt],N,A,r.COLOR_ATTACHMENT0,Ut,Pt);else Et(it.__webglFramebuffer,N,A,r.COLOR_ATTACHMENT0,Ut,0);E(A)&&x(Ut),i.unbindTexture()}N.depthBuffer&&Ft(N)}function me(N){const A=N.textures;for(let it=0,dt=A.length;it<dt;it++){const Mt=A[it];if(E(Mt)){const gt=L(N),Wt=s.get(Mt).__webglTexture;i.bindTexture(gt,Wt),x(gt),i.unbindTexture()}}}const $e=[],q=[];function Pn(N){if(N.samples>0){if(ve(N)===!1){const A=N.textures,it=N.width,dt=N.height;let Mt=r.COLOR_BUFFER_BIT;const gt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Wt=s.get(N),Ut=A.length>1;if(Ut)for(let Pt=0;Pt<A.length;Pt++)i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let Pt=0;Pt<A.length;Pt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Mt|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Mt|=r.STENCIL_BUFFER_BIT)),Ut){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[Pt]);const xe=s.get(A[Pt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,xe,0)}r.blitFramebuffer(0,0,it,dt,0,0,it,dt,Mt,r.NEAREST),m===!0&&($e.length=0,q.length=0,$e.push(r.COLOR_ATTACHMENT0+Pt),N.depthBuffer&&N.resolveDepthBuffer===!1&&($e.push(gt),q.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,q)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,$e))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Ut)for(let Pt=0;Pt<A.length;Pt++){i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.RENDERBUFFER,Wt.__webglColorRenderbuffer[Pt]);const xe=s.get(A[Pt]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.TEXTURE_2D,xe,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Wt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&m){const A=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function pe(N){return Math.min(l.maxSamples,N.samples)}function ve(N){const A=s.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Qt(N){const A=f.render.frame;g.get(N)!==A&&(g.set(N,A),N.update())}function Ne(N,A){const it=N.colorSpace,dt=N.format,Mt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||it!==Yr&&it!==is&&(we.getTransfer(it)===ke?(dt!==Pi||Mt!==Ma)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",it)),A}function Zt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=rt,this.resetTextureUnits=nt,this.setTexture2D=mt,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=K,this.rebindTextures=re,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=Pn,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ve}function ZA(r,t){function i(s,l=is){let c;const f=we.getTransfer(l);if(s===Ma)return r.UNSIGNED_BYTE;if(s===sp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===rp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Yv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===qv)return r.BYTE;if(s===jv)return r.SHORT;if(s===nl)return r.UNSIGNED_SHORT;if(s===ap)return r.INT;if(s===Hs)return r.UNSIGNED_INT;if(s===xa)return r.FLOAT;if(s===il)return r.HALF_FLOAT;if(s===Zv)return r.ALPHA;if(s===Kv)return r.RGB;if(s===Pi)return r.RGBA;if(s===Qv)return r.LUMINANCE;if(s===Jv)return r.LUMINANCE_ALPHA;if(s===Hr)return r.DEPTH_COMPONENT;if(s===qr)return r.DEPTH_STENCIL;if(s===$v)return r.RED;if(s===op)return r.RED_INTEGER;if(s===tx)return r.RG;if(s===lp)return r.RG_INTEGER;if(s===cp)return r.RGBA_INTEGER;if(s===Jc||s===$c||s===tu||s===eu)if(f===ke)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Jc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===$c)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===tu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===eu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Jc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===$c)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===tu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===eu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Td||s===bd||s===Ad||s===wd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Td)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===bd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ad)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===wd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Rd||s===Cd||s===Dd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Rd||s===Cd)return f===ke?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Dd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ud||s===Ld||s===Nd||s===Od||s===Pd||s===zd||s===Bd||s===Id||s===Fd||s===Hd||s===Gd||s===Vd||s===kd||s===Xd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Ud)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ld)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Nd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Od)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===zd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Bd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Id)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Fd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Hd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Gd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===kd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===nu||s===Wd||s===qd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===nu)return f===ke?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ex||s===jd||s===Yd||s===Zd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===nu)return c.COMPRESSED_RED_RGTC1_EXT;if(s===jd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Yd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Wr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}class KA extends ui{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Fs extends bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const QA={type:"move"};class ad{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,f=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const T of t.hand.values()){const E=i.getJointPose(T,s),x=this._getHandJoint(p,T);E!==null&&(x.matrix.fromArray(E.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=E.radius),x.visible=E!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],v=g.position.distanceTo(_.position),S=.02,M=.005;p.inputState.pinching&&v>S+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&v<=S-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(QA)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new Fs;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const JA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$A=`
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

}`;class t2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new ti,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!=s.depthNear||i.depthFar!=s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new os({vertexShader:JA,fragmentShader:$A,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ie(new ll(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class e2 extends Zr{constructor(t,i){super();const s=this;let l=null,c=1,f=null,d="local-floor",m=1,p=null,g=null,_=null,v=null,S=null,M=null;const T=new t2,E=i.getContextAttributes();let x=null,L=null;const U=[],R=[],Y=new Te;let B=null;const O=new ui;O.viewport=new Xe;const H=new ui;H.viewport=new Xe;const D=[O,H],w=new KA;let F=null,nt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ut=U[Z];return ut===void 0&&(ut=new ad,U[Z]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(Z){let ut=U[Z];return ut===void 0&&(ut=new ad,U[Z]=ut),ut.getGripSpace()},this.getHand=function(Z){let ut=U[Z];return ut===void 0&&(ut=new ad,U[Z]=ut),ut.getHandSpace()};function rt(Z){const ut=R.indexOf(Z.inputSource);if(ut===-1)return;const Et=U[ut];Et!==void 0&&(Et.update(Z.inputSource,Z.frame,p||f),Et.dispatchEvent({type:Z.type,data:Z.inputSource}))}function ht(){l.removeEventListener("select",rt),l.removeEventListener("selectstart",rt),l.removeEventListener("selectend",rt),l.removeEventListener("squeeze",rt),l.removeEventListener("squeezestart",rt),l.removeEventListener("squeezeend",rt),l.removeEventListener("end",ht),l.removeEventListener("inputsourceschange",mt);for(let Z=0;Z<U.length;Z++){const ut=R[Z];ut!==null&&(R[Z]=null,U[Z].disconnect(ut))}F=null,nt=null,T.reset(),t.setRenderTarget(x),S=null,v=null,_=null,l=null,L=null,yt.stop(),s.isPresenting=!1,t.setPixelRatio(B),t.setSize(Y.width,Y.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(Z){p=Z},this.getBaseLayer=function(){return v!==null?v:S},this.getBinding=function(){return _},this.getFrame=function(){return M},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(x=t.getRenderTarget(),l.addEventListener("select",rt),l.addEventListener("selectstart",rt),l.addEventListener("selectend",rt),l.addEventListener("squeeze",rt),l.addEventListener("squeezestart",rt),l.addEventListener("squeezeend",rt),l.addEventListener("end",ht),l.addEventListener("inputsourceschange",mt),E.xrCompatible!==!0&&await i.makeXRCompatible(),B=t.getPixelRatio(),t.getSize(Y),l.renderState.layers===void 0){const ut={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,ut),l.updateRenderState({baseLayer:S}),t.setPixelRatio(1),t.setSize(S.framebufferWidth,S.framebufferHeight,!1),L=new Gs(S.framebufferWidth,S.framebufferHeight,{format:Pi,type:Ma,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil})}else{let ut=null,Et=null,xt=null;E.depth&&(xt=E.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ut=E.stencil?qr:Hr,Et=E.stencil?Wr:Hs);const Ht={colorFormat:i.RGBA8,depthFormat:xt,scaleFactor:c};_=new XRWebGLBinding(l,i),v=_.createProjectionLayer(Ht),l.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),L=new Gs(v.textureWidth,v.textureHeight,{format:Pi,type:Ma,depthTexture:new mx(v.textureWidth,v.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(d),yt.setContext(l),yt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function mt(Z){for(let ut=0;ut<Z.removed.length;ut++){const Et=Z.removed[ut],xt=R.indexOf(Et);xt>=0&&(R[xt]=null,U[xt].disconnect(Et))}for(let ut=0;ut<Z.added.length;ut++){const Et=Z.added[ut];let xt=R.indexOf(Et);if(xt===-1){for(let Ft=0;Ft<U.length;Ft++)if(Ft>=R.length){R.push(Et),xt=Ft;break}else if(R[Ft]===null){R[Ft]=Et,xt=Ft;break}if(xt===-1)break}const Ht=U[xt];Ht&&Ht.connect(Et)}}const z=new V,Q=new V;function K(Z,ut,Et){z.setFromMatrixPosition(ut.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const xt=z.distanceTo(Q),Ht=ut.projectionMatrix.elements,Ft=Et.projectionMatrix.elements,re=Ht[14]/(Ht[10]-1),Be=Ht[14]/(Ht[10]+1),me=(Ht[9]+1)/Ht[5],$e=(Ht[9]-1)/Ht[5],q=(Ht[8]-1)/Ht[0],Pn=(Ft[8]+1)/Ft[0],pe=re*q,ve=re*Pn,Qt=xt/(-q+Pn),Ne=Qt*-q;if(ut.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ne),Z.translateZ(Qt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ht[10]===-1)Z.projectionMatrix.copy(ut.projectionMatrix),Z.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const Zt=re+Qt,N=Be+Qt,A=pe-Ne,it=ve+(xt-Ne),dt=me*Be/N*Zt,Mt=$e*Be/N*Zt;Z.projectionMatrix.makePerspective(A,it,dt,Mt,Zt,N),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function St(Z,ut){ut===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ut.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let ut=Z.near,Et=Z.far;T.texture!==null&&(T.depthNear>0&&(ut=T.depthNear),T.depthFar>0&&(Et=T.depthFar)),w.near=H.near=O.near=ut,w.far=H.far=O.far=Et,(F!==w.near||nt!==w.far)&&(l.updateRenderState({depthNear:w.near,depthFar:w.far}),F=w.near,nt=w.far),O.layers.mask=Z.layers.mask|2,H.layers.mask=Z.layers.mask|4,w.layers.mask=O.layers.mask|H.layers.mask;const xt=Z.parent,Ht=w.cameras;St(w,xt);for(let Ft=0;Ft<Ht.length;Ft++)St(Ht[Ft],xt);Ht.length===2?K(w,O,H):w.projectionMatrix.copy(O.projectionMatrix),Tt(Z,w,xt)};function Tt(Z,ut,Et){Et===null?Z.matrix.copy(ut.matrixWorld):(Z.matrix.copy(Et.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ut.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ut.projectionMatrix),Z.projectionMatrixInverse.copy(ut.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Kd*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(v===null&&S===null))return m},this.setFoveation=function(Z){m=Z,v!==null&&(v.fixedFoveation=Z),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Z)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(w)};let P=null;function at(Z,ut){if(g=ut.getViewerPose(p||f),M=ut,g!==null){const Et=g.views;S!==null&&(t.setRenderTargetFramebuffer(L,S.framebuffer),t.setRenderTarget(L));let xt=!1;Et.length!==w.cameras.length&&(w.cameras.length=0,xt=!0);for(let Ft=0;Ft<Et.length;Ft++){const re=Et[Ft];let Be=null;if(S!==null)Be=S.getViewport(re);else{const $e=_.getViewSubImage(v,re);Be=$e.viewport,Ft===0&&(t.setRenderTargetTextures(L,$e.colorTexture,v.ignoreDepthValues?void 0:$e.depthStencilTexture),t.setRenderTarget(L))}let me=D[Ft];me===void 0&&(me=new ui,me.layers.enable(Ft),me.viewport=new Xe,D[Ft]=me),me.matrix.fromArray(re.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(re.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Be.x,Be.y,Be.width,Be.height),Ft===0&&(w.matrix.copy(me.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),xt===!0&&w.cameras.push(me)}const Ht=l.enabledFeatures;if(Ht&&Ht.includes("depth-sensing")){const Ft=_.getDepthInformation(Et[0]);Ft&&Ft.isValid&&Ft.texture&&T.init(t,Ft,l.renderState)}}for(let Et=0;Et<U.length;Et++){const xt=R[Et],Ht=U[Et];xt!==null&&Ht!==void 0&&Ht.update(xt,ut,p||f)}P&&P(Z,ut),ut.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ut}),M=null}const yt=new dx;yt.setAnimationLoop(at),this.setAnimationLoop=function(Z){P=Z},this.dispose=function(){}}}const Us=new qi,n2=new Ye;function i2(r,t){function i(E,x){E.matrixAutoUpdate===!0&&E.updateMatrix(),x.value.copy(E.matrix)}function s(E,x){x.color.getRGB(E.fogColor.value,ux(r)),x.isFog?(E.fogNear.value=x.near,E.fogFar.value=x.far):x.isFogExp2&&(E.fogDensity.value=x.density)}function l(E,x,L,U,R){x.isMeshBasicMaterial||x.isMeshLambertMaterial?c(E,x):x.isMeshToonMaterial?(c(E,x),_(E,x)):x.isMeshPhongMaterial?(c(E,x),g(E,x)):x.isMeshStandardMaterial?(c(E,x),v(E,x),x.isMeshPhysicalMaterial&&S(E,x,R)):x.isMeshMatcapMaterial?(c(E,x),M(E,x)):x.isMeshDepthMaterial?c(E,x):x.isMeshDistanceMaterial?(c(E,x),T(E,x)):x.isMeshNormalMaterial?c(E,x):x.isLineBasicMaterial?(f(E,x),x.isLineDashedMaterial&&d(E,x)):x.isPointsMaterial?m(E,x,L,U):x.isSpriteMaterial?p(E,x):x.isShadowMaterial?(E.color.value.copy(x.color),E.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function c(E,x){E.opacity.value=x.opacity,x.color&&E.diffuse.value.copy(x.color),x.emissive&&E.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(E.map.value=x.map,i(x.map,E.mapTransform)),x.alphaMap&&(E.alphaMap.value=x.alphaMap,i(x.alphaMap,E.alphaMapTransform)),x.bumpMap&&(E.bumpMap.value=x.bumpMap,i(x.bumpMap,E.bumpMapTransform),E.bumpScale.value=x.bumpScale,x.side===$n&&(E.bumpScale.value*=-1)),x.normalMap&&(E.normalMap.value=x.normalMap,i(x.normalMap,E.normalMapTransform),E.normalScale.value.copy(x.normalScale),x.side===$n&&E.normalScale.value.negate()),x.displacementMap&&(E.displacementMap.value=x.displacementMap,i(x.displacementMap,E.displacementMapTransform),E.displacementScale.value=x.displacementScale,E.displacementBias.value=x.displacementBias),x.emissiveMap&&(E.emissiveMap.value=x.emissiveMap,i(x.emissiveMap,E.emissiveMapTransform)),x.specularMap&&(E.specularMap.value=x.specularMap,i(x.specularMap,E.specularMapTransform)),x.alphaTest>0&&(E.alphaTest.value=x.alphaTest);const L=t.get(x),U=L.envMap,R=L.envMapRotation;U&&(E.envMap.value=U,Us.copy(R),Us.x*=-1,Us.y*=-1,Us.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(Us.y*=-1,Us.z*=-1),E.envMapRotation.value.setFromMatrix4(n2.makeRotationFromEuler(Us)),E.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,E.reflectivity.value=x.reflectivity,E.ior.value=x.ior,E.refractionRatio.value=x.refractionRatio),x.lightMap&&(E.lightMap.value=x.lightMap,E.lightMapIntensity.value=x.lightMapIntensity,i(x.lightMap,E.lightMapTransform)),x.aoMap&&(E.aoMap.value=x.aoMap,E.aoMapIntensity.value=x.aoMapIntensity,i(x.aoMap,E.aoMapTransform))}function f(E,x){E.diffuse.value.copy(x.color),E.opacity.value=x.opacity,x.map&&(E.map.value=x.map,i(x.map,E.mapTransform))}function d(E,x){E.dashSize.value=x.dashSize,E.totalSize.value=x.dashSize+x.gapSize,E.scale.value=x.scale}function m(E,x,L,U){E.diffuse.value.copy(x.color),E.opacity.value=x.opacity,E.size.value=x.size*L,E.scale.value=U*.5,x.map&&(E.map.value=x.map,i(x.map,E.uvTransform)),x.alphaMap&&(E.alphaMap.value=x.alphaMap,i(x.alphaMap,E.alphaMapTransform)),x.alphaTest>0&&(E.alphaTest.value=x.alphaTest)}function p(E,x){E.diffuse.value.copy(x.color),E.opacity.value=x.opacity,E.rotation.value=x.rotation,x.map&&(E.map.value=x.map,i(x.map,E.mapTransform)),x.alphaMap&&(E.alphaMap.value=x.alphaMap,i(x.alphaMap,E.alphaMapTransform)),x.alphaTest>0&&(E.alphaTest.value=x.alphaTest)}function g(E,x){E.specular.value.copy(x.specular),E.shininess.value=Math.max(x.shininess,1e-4)}function _(E,x){x.gradientMap&&(E.gradientMap.value=x.gradientMap)}function v(E,x){E.metalness.value=x.metalness,x.metalnessMap&&(E.metalnessMap.value=x.metalnessMap,i(x.metalnessMap,E.metalnessMapTransform)),E.roughness.value=x.roughness,x.roughnessMap&&(E.roughnessMap.value=x.roughnessMap,i(x.roughnessMap,E.roughnessMapTransform)),x.envMap&&(E.envMapIntensity.value=x.envMapIntensity)}function S(E,x,L){E.ior.value=x.ior,x.sheen>0&&(E.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),E.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(E.sheenColorMap.value=x.sheenColorMap,i(x.sheenColorMap,E.sheenColorMapTransform)),x.sheenRoughnessMap&&(E.sheenRoughnessMap.value=x.sheenRoughnessMap,i(x.sheenRoughnessMap,E.sheenRoughnessMapTransform))),x.clearcoat>0&&(E.clearcoat.value=x.clearcoat,E.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(E.clearcoatMap.value=x.clearcoatMap,i(x.clearcoatMap,E.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(E.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,i(x.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(E.clearcoatNormalMap.value=x.clearcoatNormalMap,i(x.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===$n&&E.clearcoatNormalScale.value.negate())),x.dispersion>0&&(E.dispersion.value=x.dispersion),x.iridescence>0&&(E.iridescence.value=x.iridescence,E.iridescenceIOR.value=x.iridescenceIOR,E.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(E.iridescenceMap.value=x.iridescenceMap,i(x.iridescenceMap,E.iridescenceMapTransform)),x.iridescenceThicknessMap&&(E.iridescenceThicknessMap.value=x.iridescenceThicknessMap,i(x.iridescenceThicknessMap,E.iridescenceThicknessMapTransform))),x.transmission>0&&(E.transmission.value=x.transmission,E.transmissionSamplerMap.value=L.texture,E.transmissionSamplerSize.value.set(L.width,L.height),x.transmissionMap&&(E.transmissionMap.value=x.transmissionMap,i(x.transmissionMap,E.transmissionMapTransform)),E.thickness.value=x.thickness,x.thicknessMap&&(E.thicknessMap.value=x.thicknessMap,i(x.thicknessMap,E.thicknessMapTransform)),E.attenuationDistance.value=x.attenuationDistance,E.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(E.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(E.anisotropyMap.value=x.anisotropyMap,i(x.anisotropyMap,E.anisotropyMapTransform))),E.specularIntensity.value=x.specularIntensity,E.specularColor.value.copy(x.specularColor),x.specularColorMap&&(E.specularColorMap.value=x.specularColorMap,i(x.specularColorMap,E.specularColorMapTransform)),x.specularIntensityMap&&(E.specularIntensityMap.value=x.specularIntensityMap,i(x.specularIntensityMap,E.specularIntensityMapTransform))}function M(E,x){x.matcap&&(E.matcap.value=x.matcap)}function T(E,x){const L=t.get(x).light;E.referencePosition.value.setFromMatrixPosition(L.matrixWorld),E.nearDistance.value=L.shadow.camera.near,E.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function a2(r,t,i,s){let l={},c={},f=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(L,U){const R=U.program;s.uniformBlockBinding(L,R)}function p(L,U){let R=l[L.id];R===void 0&&(M(L),R=g(L),l[L.id]=R,L.addEventListener("dispose",E));const Y=U.program;s.updateUBOMapping(L,Y);const B=t.render.frame;c[L.id]!==B&&(v(L),c[L.id]=B)}function g(L){const U=_();L.__bindingPointIndex=U;const R=r.createBuffer(),Y=L.__size,B=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,R),r.bufferData(r.UNIFORM_BUFFER,Y,B),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,R),R}function _(){for(let L=0;L<d;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(L){const U=l[L.id],R=L.uniforms,Y=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let B=0,O=R.length;B<O;B++){const H=Array.isArray(R[B])?R[B]:[R[B]];for(let D=0,w=H.length;D<w;D++){const F=H[D];if(S(F,B,D,Y)===!0){const nt=F.__offset,rt=Array.isArray(F.value)?F.value:[F.value];let ht=0;for(let mt=0;mt<rt.length;mt++){const z=rt[mt],Q=T(z);typeof z=="number"||typeof z=="boolean"?(F.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,nt+ht,F.__data)):z.isMatrix3?(F.__data[0]=z.elements[0],F.__data[1]=z.elements[1],F.__data[2]=z.elements[2],F.__data[3]=0,F.__data[4]=z.elements[3],F.__data[5]=z.elements[4],F.__data[6]=z.elements[5],F.__data[7]=0,F.__data[8]=z.elements[6],F.__data[9]=z.elements[7],F.__data[10]=z.elements[8],F.__data[11]=0):(z.toArray(F.__data,ht),ht+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,nt,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(L,U,R,Y){const B=L.value,O=U+"_"+R;if(Y[O]===void 0)return typeof B=="number"||typeof B=="boolean"?Y[O]=B:Y[O]=B.clone(),!0;{const H=Y[O];if(typeof B=="number"||typeof B=="boolean"){if(H!==B)return Y[O]=B,!0}else if(H.equals(B)===!1)return H.copy(B),!0}return!1}function M(L){const U=L.uniforms;let R=0;const Y=16;for(let O=0,H=U.length;O<H;O++){const D=Array.isArray(U[O])?U[O]:[U[O]];for(let w=0,F=D.length;w<F;w++){const nt=D[w],rt=Array.isArray(nt.value)?nt.value:[nt.value];for(let ht=0,mt=rt.length;ht<mt;ht++){const z=rt[ht],Q=T(z),K=R%Y,St=K%Q.boundary,Tt=K+St;R+=St,Tt!==0&&Y-Tt<Q.storage&&(R+=Y-Tt),nt.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),nt.__offset=R,R+=Q.storage}}}const B=R%Y;return B>0&&(R+=Y-B),L.__size=R,L.__cache={},this}function T(L){const U={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(U.boundary=4,U.storage=4):L.isVector2?(U.boundary=8,U.storage=8):L.isVector3||L.isColor?(U.boundary=16,U.storage=12):L.isVector4?(U.boundary=16,U.storage=16):L.isMatrix3?(U.boundary=48,U.storage=48):L.isMatrix4?(U.boundary=64,U.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),U}function E(L){const U=L.target;U.removeEventListener("dispose",E);const R=f.indexOf(U.__bindingPointIndex);f.splice(R,1),r.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function x(){for(const L in l)r.deleteBuffer(l[L]);f=[],l={},c={}}return{bind:m,update:p,dispose:x}}class s2{constructor(t={}){const{canvas:i=jM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:v=!1}=t;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=f;const M=new Uint32Array(4),T=new Int32Array(4);let E=null,x=null;const L=[],U=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ei,this.toneMapping=ss,this.toneMappingExposure=1;const R=this;let Y=!1,B=0,O=0,H=null,D=-1,w=null;const F=new Xe,nt=new Xe;let rt=null;const ht=new ae(0);let mt=0,z=i.width,Q=i.height,K=1,St=null,Tt=null;const P=new Xe(0,0,z,Q),at=new Xe(0,0,z,Q);let yt=!1;const Z=new fp;let ut=!1,Et=!1;const xt=new Ye,Ht=new Ye,Ft=new V,re=new Xe,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function $e(){return H===null?K:1}let q=s;function Pn(C,X){return i.getContext(C,X)}try{const C={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${ip}`),i.addEventListener("webglcontextlost",vt,!1),i.addEventListener("webglcontextrestored",Rt,!1),i.addEventListener("webglcontextcreationerror",Lt,!1),q===null){const X="webgl2";if(q=Pn(X,C),q===null)throw Pn(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let pe,ve,Qt,Ne,Zt,N,A,it,dt,Mt,gt,Wt,Ut,Pt,xe,At,zt,Kt,qt,Ot,te,le,Ie,k;function wt(){pe=new ub(q),pe.init(),le=new ZA(q,pe),ve=new ab(q,pe,t,le),Qt=new qA(q,pe),ve.reverseDepthBuffer&&v&&Qt.buffers.depth.setReversed(!0),Ne=new db(q),Zt=new UA,N=new YA(q,pe,Qt,Zt,ve,le,Ne),A=new rb(R),it=new cb(R),dt=new yE(q),Ie=new nb(q,dt),Mt=new fb(q,dt,Ne,Ie),gt=new mb(q,Mt,dt,Ne),qt=new pb(q,ve,N),At=new sb(Zt),Wt=new DA(R,A,it,pe,ve,Ie,At),Ut=new i2(R,Zt),Pt=new NA,xe=new FA(pe),Kt=new eb(R,A,it,Qt,gt,S,m),zt=new XA(R,gt,ve),k=new a2(q,Ne,ve,Qt),Ot=new ib(q,pe,Ne),te=new hb(q,pe,Ne),Ne.programs=Wt.programs,R.capabilities=ve,R.extensions=pe,R.properties=Zt,R.renderLists=Pt,R.shadowMap=zt,R.state=Qt,R.info=Ne}wt();const ct=new e2(R,q);this.xr=ct,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const C=pe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=pe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(C){C!==void 0&&(K=C,this.setSize(z,Q,!1))},this.getSize=function(C){return C.set(z,Q)},this.setSize=function(C,X,ot=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=C,Q=X,i.width=Math.floor(C*K),i.height=Math.floor(X*K),ot===!0&&(i.style.width=C+"px",i.style.height=X+"px"),this.setViewport(0,0,C,X)},this.getDrawingBufferSize=function(C){return C.set(z*K,Q*K).floor()},this.setDrawingBufferSize=function(C,X,ot){z=C,Q=X,K=ot,i.width=Math.floor(C*ot),i.height=Math.floor(X*ot),this.setViewport(0,0,C,X)},this.getCurrentViewport=function(C){return C.copy(F)},this.getViewport=function(C){return C.copy(P)},this.setViewport=function(C,X,ot,st){C.isVector4?P.set(C.x,C.y,C.z,C.w):P.set(C,X,ot,st),Qt.viewport(F.copy(P).multiplyScalar(K).round())},this.getScissor=function(C){return C.copy(at)},this.setScissor=function(C,X,ot,st){C.isVector4?at.set(C.x,C.y,C.z,C.w):at.set(C,X,ot,st),Qt.scissor(nt.copy(at).multiplyScalar(K).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(C){Qt.setScissorTest(yt=C)},this.setOpaqueSort=function(C){St=C},this.setTransparentSort=function(C){Tt=C},this.getClearColor=function(C){return C.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(C=!0,X=!0,ot=!0){let st=0;if(C){let W=!1;if(H!==null){const bt=H.texture.format;W=bt===cp||bt===lp||bt===op}if(W){const bt=H.texture.type,Ct=bt===Ma||bt===Hs||bt===nl||bt===Wr||bt===sp||bt===rp,Dt=Kt.getClearColor(),Vt=Kt.getClearAlpha(),ne=Dt.r,$t=Dt.g,Bt=Dt.b;Ct?(M[0]=ne,M[1]=$t,M[2]=Bt,M[3]=Vt,q.clearBufferuiv(q.COLOR,0,M)):(T[0]=ne,T[1]=$t,T[2]=Bt,T[3]=Vt,q.clearBufferiv(q.COLOR,0,T))}else st|=q.COLOR_BUFFER_BIT}X&&(st|=q.DEPTH_BUFFER_BIT),ot&&(st|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",vt,!1),i.removeEventListener("webglcontextrestored",Rt,!1),i.removeEventListener("webglcontextcreationerror",Lt,!1),Pt.dispose(),xe.dispose(),Zt.dispose(),A.dispose(),it.dispose(),gt.dispose(),Ie.dispose(),k.dispose(),Wt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Qr),ct.removeEventListener("sessionend",Jr),Bi.stop()};function vt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Y=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),Y=!1;const C=Ne.autoReset,X=zt.enabled,ot=zt.autoUpdate,st=zt.needsUpdate,W=zt.type;wt(),Ne.autoReset=C,zt.enabled=X,zt.autoUpdate=ot,zt.needsUpdate=st,zt.type=W}function Lt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ee(C){const X=C.target;X.removeEventListener("dispose",ee),tn(X)}function tn(C){mn(C),Zt.remove(C)}function mn(C){const X=Zt.get(C).programs;X!==void 0&&(X.forEach(function(ot){Wt.releaseProgram(ot)}),C.isShaderMaterial&&Wt.releaseShaderCache(C))}this.renderBufferDirect=function(C,X,ot,st,W,bt){X===null&&(X=Be);const Ct=W.isMesh&&W.matrixWorld.determinant()<0,Dt=to(C,X,ot,st,W);Qt.setMaterial(st,Ct);let Vt=ot.index,ne=1;if(st.wireframe===!0){if(Vt=Mt.getWireframeAttribute(ot),Vt===void 0)return;ne=2}const $t=ot.drawRange,Bt=ot.attributes.position;let be=$t.start*ne,Oe=($t.start+$t.count)*ne;bt!==null&&(be=Math.max(be,bt.start*ne),Oe=Math.min(Oe,(bt.start+bt.count)*ne)),Vt!==null?(be=Math.max(be,0),Oe=Math.min(Oe,Vt.count)):Bt!=null&&(be=Math.max(be,0),Oe=Math.min(Oe,Bt.count));const Fe=Oe-be;if(Fe<0||Fe===1/0)return;Ie.setup(W,st,Dt,ot,Vt);let zn,Me=Ot;if(Vt!==null&&(zn=dt.get(Vt),Me=te,Me.setIndex(zn)),W.isMesh)st.wireframe===!0?(Qt.setLineWidth(st.wireframeLinewidth*$e()),Me.setMode(q.LINES)):Me.setMode(q.TRIANGLES);else if(W.isLine){let kt=st.linewidth;kt===void 0&&(kt=1),Qt.setLineWidth(kt*$e()),W.isLineSegments?Me.setMode(q.LINES):W.isLineLoop?Me.setMode(q.LINE_LOOP):Me.setMode(q.LINE_STRIP)}else W.isPoints?Me.setMode(q.POINTS):W.isSprite&&Me.setMode(q.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Me.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(pe.get("WEBGL_multi_draw"))Me.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const kt=W._multiDrawStarts,gn=W._multiDrawCounts,oe=W._multiDrawCount,kn=Vt?dt.get(Vt).bytesPerElement:1,Ea=Zt.get(st).currentProgram.getUniforms();for(let Cn=0;Cn<oe;Cn++)Ea.setValue(q,"_gl_DrawID",Cn),Me.render(kt[Cn]/kn,gn[Cn])}else if(W.isInstancedMesh)Me.renderInstances(be,Fe,W.count);else if(ot.isInstancedBufferGeometry){const kt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,gn=Math.min(ot.instanceCount,kt);Me.renderInstances(be,Fe,gn)}else Me.render(be,Fe)};function Ae(C,X,ot){C.transparent===!0&&C.side===va&&C.forceSinglePass===!1?(C.side=$n,C.needsUpdate=!0,an(C,X,ot),C.side=rs,C.needsUpdate=!0,an(C,X,ot),C.side=va):an(C,X,ot)}this.compile=function(C,X,ot=null){ot===null&&(ot=C),x=xe.get(ot),x.init(X),U.push(x),ot.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(x.pushLight(W),W.castShadow&&x.pushShadow(W))}),C!==ot&&C.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(x.pushLight(W),W.castShadow&&x.pushShadow(W))}),x.setupLights();const st=new Set;return C.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const bt=W.material;if(bt)if(Array.isArray(bt))for(let Ct=0;Ct<bt.length;Ct++){const Dt=bt[Ct];Ae(Dt,ot,W),st.add(Dt)}else Ae(bt,ot,W),st.add(bt)}),U.pop(),x=null,st},this.compileAsync=function(C,X,ot=null){const st=this.compile(C,X,ot);return new Promise(W=>{function bt(){if(st.forEach(function(Ct){Zt.get(Ct).currentProgram.isReady()&&st.delete(Ct)}),st.size===0){W(C);return}setTimeout(bt,10)}pe.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let wn=null;function Ai(C){wn&&wn(C)}function Qr(){Bi.stop()}function Jr(){Bi.start()}const Bi=new dx;Bi.setAnimationLoop(Ai),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(C){wn=C,ct.setAnimationLoop(C),C===null?Bi.stop():Bi.start()},ct.addEventListener("sessionstart",Qr),ct.addEventListener("sessionend",Jr),this.render=function(C,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(X),X=ct.getCamera()),C.isScene===!0&&C.onBeforeRender(R,C,X,H),x=xe.get(C,U.length),x.init(X),U.push(x),Ht.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Z.setFromProjectionMatrix(Ht),Et=this.localClippingEnabled,ut=At.init(this.clippingPlanes,Et),E=Pt.get(C,L.length),E.init(),L.push(E),ct.enabled===!0&&ct.isPresenting===!0){const bt=R.xr.getDepthSensingMesh();bt!==null&&ls(bt,X,-1/0,R.sortObjects)}ls(C,X,0,R.sortObjects),E.finish(),R.sortObjects===!0&&E.sort(St,Tt),me=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,me&&Kt.addToRenderList(E,C),this.info.render.frame++,ut===!0&&At.beginShadows();const ot=x.state.shadowsArray;zt.render(ot,C,X),ut===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const st=E.opaque,W=E.transmissive;if(x.setupLights(),X.isArrayCamera){const bt=X.cameras;if(W.length>0)for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const Vt=bt[Ct];$r(st,W,C,Vt)}me&&Kt.render(C);for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const Vt=bt[Ct];ks(E,C,Vt,Vt.viewport)}}else W.length>0&&$r(st,W,C,X),me&&Kt.render(C),ks(E,C,X);H!==null&&(N.updateMultisampleRenderTarget(H),N.updateRenderTargetMipmap(H)),C.isScene===!0&&C.onAfterRender(R,C,X),Ie.resetDefaultState(),D=-1,w=null,U.pop(),U.length>0?(x=U[U.length-1],ut===!0&&At.setGlobalState(R.clippingPlanes,x.state.camera)):x=null,L.pop(),L.length>0?E=L[L.length-1]:E=null};function ls(C,X,ot,st){if(C.visible===!1)return;if(C.layers.test(X.layers)){if(C.isGroup)ot=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(X);else if(C.isLight)x.pushLight(C),C.castShadow&&x.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Z.intersectsSprite(C)){st&&re.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ht);const Ct=gt.update(C),Dt=C.material;Dt.visible&&E.push(C,Ct,Dt,ot,re.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Z.intersectsObject(C))){const Ct=gt.update(C),Dt=C.material;if(st&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),re.copy(C.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),re.copy(Ct.boundingSphere.center)),re.applyMatrix4(C.matrixWorld).applyMatrix4(Ht)),Array.isArray(Dt)){const Vt=Ct.groups;for(let ne=0,$t=Vt.length;ne<$t;ne++){const Bt=Vt[ne],be=Dt[Bt.materialIndex];be&&be.visible&&E.push(C,Ct,be,ot,re.z,Bt)}}else Dt.visible&&E.push(C,Ct,Dt,ot,re.z,null)}}const bt=C.children;for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++)ls(bt[Ct],X,ot,st)}function ks(C,X,ot,st){const W=C.opaque,bt=C.transmissive,Ct=C.transparent;x.setupLightsView(ot),ut===!0&&At.setGlobalState(R.clippingPlanes,ot),st&&Qt.viewport(F.copy(st)),W.length>0&&cs(W,X,ot),bt.length>0&&cs(bt,X,ot),Ct.length>0&&cs(Ct,X,ot),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function $r(C,X,ot,st){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;x.state.transmissionRenderTarget[st.id]===void 0&&(x.state.transmissionRenderTarget[st.id]=new Gs(1,1,{generateMipmaps:!0,type:pe.has("EXT_color_buffer_half_float")||pe.has("EXT_color_buffer_float")?il:Ma,minFilter:Is,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace}));const bt=x.state.transmissionRenderTarget[st.id],Ct=st.viewport||F;bt.setSize(Ct.z,Ct.w);const Dt=R.getRenderTarget();R.setRenderTarget(bt),R.getClearColor(ht),mt=R.getClearAlpha(),mt<1&&R.setClearColor(16777215,.5),R.clear(),me&&Kt.render(ot);const Vt=R.toneMapping;R.toneMapping=ss;const ne=st.viewport;if(st.viewport!==void 0&&(st.viewport=void 0),x.setupLightsView(st),ut===!0&&At.setGlobalState(R.clippingPlanes,st),cs(C,ot,st),N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt),pe.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Bt=0,be=X.length;Bt<be;Bt++){const Oe=X[Bt],Fe=Oe.object,zn=Oe.geometry,Me=Oe.material,kt=Oe.group;if(Me.side===va&&Fe.layers.test(st.layers)){const gn=Me.side;Me.side=$n,Me.needsUpdate=!0,wi(Fe,ot,st,zn,Me,kt),Me.side=gn,Me.needsUpdate=!0,$t=!0}}$t===!0&&(N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt))}R.setRenderTarget(Dt),R.setClearColor(ht,mt),ne!==void 0&&(st.viewport=ne),R.toneMapping=Vt}function cs(C,X,ot){const st=X.isScene===!0?X.overrideMaterial:null;for(let W=0,bt=C.length;W<bt;W++){const Ct=C[W],Dt=Ct.object,Vt=Ct.geometry,ne=st===null?Ct.material:st,$t=Ct.group;Dt.layers.test(ot.layers)&&wi(Dt,X,ot,Vt,ne,$t)}}function wi(C,X,ot,st,W,bt){C.onBeforeRender(R,X,ot,st,W,bt),C.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(R,X,ot,st,C,bt),W.transparent===!0&&W.side===va&&W.forceSinglePass===!1?(W.side=$n,W.needsUpdate=!0,R.renderBufferDirect(ot,X,st,W,C,bt),W.side=rs,W.needsUpdate=!0,R.renderBufferDirect(ot,X,st,W,C,bt),W.side=va):R.renderBufferDirect(ot,X,st,W,C,bt),C.onAfterRender(R,X,ot,st,W,bt)}function an(C,X,ot){X.isScene!==!0&&(X=Be);const st=Zt.get(C),W=x.state.lights,bt=x.state.shadowsArray,Ct=W.state.version,Dt=Wt.getParameters(C,W.state,bt,X,ot),Vt=Wt.getProgramCacheKey(Dt);let ne=st.programs;st.environment=C.isMeshStandardMaterial?X.environment:null,st.fog=X.fog,st.envMap=(C.isMeshStandardMaterial?it:A).get(C.envMap||st.environment),st.envMapRotation=st.environment!==null&&C.envMap===null?X.environmentRotation:C.envMapRotation,ne===void 0&&(C.addEventListener("dispose",ee),ne=new Map,st.programs=ne);let $t=ne.get(Vt);if($t!==void 0){if(st.currentProgram===$t&&st.lightsStateVersion===Ct)return ji(C,Dt),$t}else Dt.uniforms=Wt.getUniforms(C),C.onBeforeCompile(Dt,R),$t=Wt.acquireProgram(Dt,Vt),ne.set(Vt,$t),st.uniforms=Dt.uniforms;const Bt=st.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Bt.clippingPlanes=At.uniform),ji(C,Dt),st.needsLights=_u(C),st.lightsStateVersion=Ct,st.needsLights&&(Bt.ambientLightColor.value=W.state.ambient,Bt.lightProbe.value=W.state.probe,Bt.directionalLights.value=W.state.directional,Bt.directionalLightShadows.value=W.state.directionalShadow,Bt.spotLights.value=W.state.spot,Bt.spotLightShadows.value=W.state.spotShadow,Bt.rectAreaLights.value=W.state.rectArea,Bt.ltc_1.value=W.state.rectAreaLTC1,Bt.ltc_2.value=W.state.rectAreaLTC2,Bt.pointLights.value=W.state.point,Bt.pointLightShadows.value=W.state.pointShadow,Bt.hemisphereLights.value=W.state.hemi,Bt.directionalShadowMap.value=W.state.directionalShadowMap,Bt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Bt.spotShadowMap.value=W.state.spotShadowMap,Bt.spotLightMatrix.value=W.state.spotLightMatrix,Bt.spotLightMap.value=W.state.spotLightMap,Bt.pointShadowMap.value=W.state.pointShadowMap,Bt.pointShadowMatrix.value=W.state.pointShadowMatrix),st.currentProgram=$t,st.uniformsList=null,$t}function Rn(C){if(C.uniformsList===null){const X=C.currentProgram.getUniforms();C.uniformsList=au.seqWithValue(X.seq,C.uniforms)}return C.uniformsList}function ji(C,X){const ot=Zt.get(C);ot.outputColorSpace=X.outputColorSpace,ot.batching=X.batching,ot.batchingColor=X.batchingColor,ot.instancing=X.instancing,ot.instancingColor=X.instancingColor,ot.instancingMorph=X.instancingMorph,ot.skinning=X.skinning,ot.morphTargets=X.morphTargets,ot.morphNormals=X.morphNormals,ot.morphColors=X.morphColors,ot.morphTargetsCount=X.morphTargetsCount,ot.numClippingPlanes=X.numClippingPlanes,ot.numIntersection=X.numClipIntersection,ot.vertexAlphas=X.vertexAlphas,ot.vertexTangents=X.vertexTangents,ot.toneMapping=X.toneMapping}function to(C,X,ot,st,W){X.isScene!==!0&&(X=Be),N.resetTextureUnits();const bt=X.fog,Ct=st.isMeshStandardMaterial?X.environment:null,Dt=H===null?R.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Yr,Vt=(st.isMeshStandardMaterial?it:A).get(st.envMap||Ct),ne=st.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,$t=!!ot.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),Bt=!!ot.morphAttributes.position,be=!!ot.morphAttributes.normal,Oe=!!ot.morphAttributes.color;let Fe=ss;st.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Fe=R.toneMapping);const zn=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Me=zn!==void 0?zn.length:0,kt=Zt.get(st),gn=x.state.lights;if(ut===!0&&(Et===!0||C!==w)){const Bn=C===w&&st.id===D;At.setState(st,C,Bn)}let oe=!1;st.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==gn.state.version||kt.outputColorSpace!==Dt||W.isBatchedMesh&&kt.batching===!1||!W.isBatchedMesh&&kt.batching===!0||W.isBatchedMesh&&kt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&kt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&kt.instancing===!1||!W.isInstancedMesh&&kt.instancing===!0||W.isSkinnedMesh&&kt.skinning===!1||!W.isSkinnedMesh&&kt.skinning===!0||W.isInstancedMesh&&kt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&kt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&kt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&kt.instancingMorph===!1&&W.morphTexture!==null||kt.envMap!==Vt||st.fog===!0&&kt.fog!==bt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==At.numPlanes||kt.numIntersection!==At.numIntersection)||kt.vertexAlphas!==ne||kt.vertexTangents!==$t||kt.morphTargets!==Bt||kt.morphNormals!==be||kt.morphColors!==Oe||kt.toneMapping!==Fe||kt.morphTargetsCount!==Me)&&(oe=!0):(oe=!0,kt.__version=st.version);let kn=kt.currentProgram;oe===!0&&(kn=an(st,X,W));let Ea=!1,Cn=!1,Ta=!1;const Ue=kn.getUniforms(),hi=kt.uniforms;if(Qt.useProgram(kn.program)&&(Ea=!0,Cn=!0,Ta=!0),st.id!==D&&(D=st.id,Cn=!0),Ea||w!==C){Qt.buffers.depth.getReversed()?(xt.copy(C.projectionMatrix),ZM(xt),KM(xt),Ue.setValue(q,"projectionMatrix",xt)):Ue.setValue(q,"projectionMatrix",C.projectionMatrix),Ue.setValue(q,"viewMatrix",C.matrixWorldInverse);const Ri=Ue.map.cameraPosition;Ri!==void 0&&Ri.setValue(q,Ft.setFromMatrixPosition(C.matrixWorld)),ve.logarithmicDepthBuffer&&Ue.setValue(q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&Ue.setValue(q,"isOrthographic",C.isOrthographicCamera===!0),w!==C&&(w=C,Cn=!0,Ta=!0)}if(W.isSkinnedMesh){Ue.setOptional(q,W,"bindMatrix"),Ue.setOptional(q,W,"bindMatrixInverse");const Bn=W.skeleton;Bn&&(Bn.boneTexture===null&&Bn.computeBoneTexture(),Ue.setValue(q,"boneTexture",Bn.boneTexture,N))}W.isBatchedMesh&&(Ue.setOptional(q,W,"batchingTexture"),Ue.setValue(q,"batchingTexture",W._matricesTexture,N),Ue.setOptional(q,W,"batchingIdTexture"),Ue.setValue(q,"batchingIdTexture",W._indirectTexture,N),Ue.setOptional(q,W,"batchingColorTexture"),W._colorsTexture!==null&&Ue.setValue(q,"batchingColorTexture",W._colorsTexture,N));const Sn=ot.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&qt.update(W,ot,kn),(Cn||kt.receiveShadow!==W.receiveShadow)&&(kt.receiveShadow=W.receiveShadow,Ue.setValue(q,"receiveShadow",W.receiveShadow)),st.isMeshGouraudMaterial&&st.envMap!==null&&(hi.envMap.value=Vt,hi.flipEnvMap.value=Vt.isCubeTexture&&Vt.isRenderTargetTexture===!1?-1:1),st.isMeshStandardMaterial&&st.envMap===null&&X.environment!==null&&(hi.envMapIntensity.value=X.environmentIntensity),Cn&&(Ue.setValue(q,"toneMappingExposure",R.toneMappingExposure),kt.needsLights&&gu(hi,Ta),bt&&st.fog===!0&&Ut.refreshFogUniforms(hi,bt),Ut.refreshMaterialUniforms(hi,st,K,Q,x.state.transmissionRenderTarget[C.id]),au.upload(q,Rn(kt),hi,N)),st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(au.upload(q,Rn(kt),hi,N),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&Ue.setValue(q,"center",W.center),Ue.setValue(q,"modelViewMatrix",W.modelViewMatrix),Ue.setValue(q,"normalMatrix",W.normalMatrix),Ue.setValue(q,"modelMatrix",W.matrixWorld),st.isShaderMaterial||st.isRawShaderMaterial){const Bn=st.uniformsGroups;for(let Ri=0,di=Bn.length;Ri<di;Ri++){const Yi=Bn[Ri];k.update(Yi,kn),k.bind(Yi,kn)}}return kn}function gu(C,X){C.ambientLightColor.needsUpdate=X,C.lightProbe.needsUpdate=X,C.directionalLights.needsUpdate=X,C.directionalLightShadows.needsUpdate=X,C.pointLights.needsUpdate=X,C.pointLightShadows.needsUpdate=X,C.spotLights.needsUpdate=X,C.spotLightShadows.needsUpdate=X,C.rectAreaLights.needsUpdate=X,C.hemisphereLights.needsUpdate=X}function _u(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(C,X,ot){Zt.get(C.texture).__webglTexture=X,Zt.get(C.depthTexture).__webglTexture=ot;const st=Zt.get(C);st.__hasExternalTextures=!0,st.__autoAllocateDepthBuffer=ot===void 0,st.__autoAllocateDepthBuffer||pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),st.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,X){const ot=Zt.get(C);ot.__webglFramebuffer=X,ot.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(C,X=0,ot=0){H=C,B=X,O=ot;let st=!0,W=null,bt=!1,Ct=!1;if(C){const Vt=Zt.get(C);if(Vt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(q.FRAMEBUFFER,null),st=!1;else if(Vt.__webglFramebuffer===void 0)N.setupRenderTarget(C);else if(Vt.__hasExternalTextures)N.rebindTextures(C,Zt.get(C.texture).__webglTexture,Zt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Bt=C.depthTexture;if(Vt.__boundDepthTexture!==Bt){if(Bt!==null&&Zt.has(Bt)&&(C.width!==Bt.image.width||C.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(C)}}const ne=C.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Ct=!0);const $t=Zt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[X])?W=$t[X][ot]:W=$t[X],bt=!0):C.samples>0&&N.useMultisampledRTT(C)===!1?W=Zt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?W=$t[ot]:W=$t,F.copy(C.viewport),nt.copy(C.scissor),rt=C.scissorTest}else F.copy(P).multiplyScalar(K).floor(),nt.copy(at).multiplyScalar(K).floor(),rt=yt;if(Qt.bindFramebuffer(q.FRAMEBUFFER,W)&&st&&Qt.drawBuffers(C,W),Qt.viewport(F),Qt.scissor(nt),Qt.setScissorTest(rt),bt){const Vt=Zt.get(C.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+X,Vt.__webglTexture,ot)}else if(Ct){const Vt=Zt.get(C.texture),ne=X||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,Vt.__webglTexture,ot||0,ne)}D=-1},this.readRenderTargetPixels=function(C,X,ot,st,W,bt,Ct){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){Qt.bindFramebuffer(q.FRAMEBUFFER,Dt);try{const Vt=C.texture,ne=Vt.format,$t=Vt.type;if(!ve.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ve.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=C.width-st&&ot>=0&&ot<=C.height-W&&q.readPixels(X,ot,st,W,le.convert(ne),le.convert($t),bt)}finally{const Vt=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(C,X,ot,st,W,bt,Ct){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){const Vt=C.texture,ne=Vt.format,$t=Vt.type;if(!ve.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ve.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=C.width-st&&ot>=0&&ot<=C.height-W){Qt.bindFramebuffer(q.FRAMEBUFFER,Dt);const Bt=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Bt),q.bufferData(q.PIXEL_PACK_BUFFER,bt.byteLength,q.STREAM_READ),q.readPixels(X,ot,st,W,le.convert(ne),le.convert($t),0);const be=H!==null?Zt.get(H).__webglFramebuffer:null;Qt.bindFramebuffer(q.FRAMEBUFFER,be);const Oe=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await YM(q,Oe,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Bt),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,bt),q.deleteBuffer(Bt),q.deleteSync(Oe),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,X=null,ot=0){C.isTexture!==!0&&($o("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,C=arguments[1]);const st=Math.pow(2,-ot),W=Math.floor(C.image.width*st),bt=Math.floor(C.image.height*st),Ct=X!==null?X.x:0,Dt=X!==null?X.y:0;N.setTexture2D(C,0),q.copyTexSubImage2D(q.TEXTURE_2D,ot,0,0,Ct,Dt,W,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(C,X,ot=null,st=null,W=0){C.isTexture!==!0&&($o("WebGLRenderer: copyTextureToTexture function signature has changed."),st=arguments[0]||null,C=arguments[1],X=arguments[2],W=arguments[3]||0,ot=null);let bt,Ct,Dt,Vt,ne,$t,Bt,be,Oe;const Fe=C.isCompressedTexture?C.mipmaps[W]:C.image;ot!==null?(bt=ot.max.x-ot.min.x,Ct=ot.max.y-ot.min.y,Dt=ot.isBox3?ot.max.z-ot.min.z:1,Vt=ot.min.x,ne=ot.min.y,$t=ot.isBox3?ot.min.z:0):(bt=Fe.width,Ct=Fe.height,Dt=Fe.depth||1,Vt=0,ne=0,$t=0),st!==null?(Bt=st.x,be=st.y,Oe=st.z):(Bt=0,be=0,Oe=0);const zn=le.convert(X.format),Me=le.convert(X.type);let kt;X.isData3DTexture?(N.setTexture3D(X,0),kt=q.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(N.setTexture2DArray(X,0),kt=q.TEXTURE_2D_ARRAY):(N.setTexture2D(X,0),kt=q.TEXTURE_2D),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,X.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,X.unpackAlignment);const gn=q.getParameter(q.UNPACK_ROW_LENGTH),oe=q.getParameter(q.UNPACK_IMAGE_HEIGHT),kn=q.getParameter(q.UNPACK_SKIP_PIXELS),Ea=q.getParameter(q.UNPACK_SKIP_ROWS),Cn=q.getParameter(q.UNPACK_SKIP_IMAGES);q.pixelStorei(q.UNPACK_ROW_LENGTH,Fe.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Fe.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,Vt),q.pixelStorei(q.UNPACK_SKIP_ROWS,ne),q.pixelStorei(q.UNPACK_SKIP_IMAGES,$t);const Ta=C.isDataArrayTexture||C.isData3DTexture,Ue=X.isDataArrayTexture||X.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const hi=Zt.get(C),Sn=Zt.get(X),Bn=Zt.get(hi.__renderTarget),Ri=Zt.get(Sn.__renderTarget);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,Bn.__webglFramebuffer),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,Ri.__webglFramebuffer);for(let di=0;di<Dt;di++)Ta&&q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(C).__webglTexture,W,$t+di),C.isDepthTexture?(Ue&&q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Zt.get(X).__webglTexture,W,Oe+di),q.blitFramebuffer(Vt,ne,bt,Ct,Bt,be,bt,Ct,q.DEPTH_BUFFER_BIT,q.NEAREST)):Ue?q.copyTexSubImage3D(kt,W,Bt,be,Oe+di,Vt,ne,bt,Ct):q.copyTexSubImage2D(kt,W,Bt,be,Oe+di,Vt,ne,bt,Ct);Qt.bindFramebuffer(q.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Ue?C.isDataTexture||C.isData3DTexture?q.texSubImage3D(kt,W,Bt,be,Oe,bt,Ct,Dt,zn,Me,Fe.data):X.isCompressedArrayTexture?q.compressedTexSubImage3D(kt,W,Bt,be,Oe,bt,Ct,Dt,zn,Fe.data):q.texSubImage3D(kt,W,Bt,be,Oe,bt,Ct,Dt,zn,Me,Fe):C.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,W,Bt,be,bt,Ct,zn,Me,Fe.data):C.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,W,Bt,be,Fe.width,Fe.height,zn,Fe.data):q.texSubImage2D(q.TEXTURE_2D,W,Bt,be,bt,Ct,zn,Me,Fe);q.pixelStorei(q.UNPACK_ROW_LENGTH,gn),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,oe),q.pixelStorei(q.UNPACK_SKIP_PIXELS,kn),q.pixelStorei(q.UNPACK_SKIP_ROWS,Ea),q.pixelStorei(q.UNPACK_SKIP_IMAGES,Cn),W===0&&X.generateMipmaps&&q.generateMipmap(kt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(C,X,ot=null,st=null,W=0){return C.isTexture!==!0&&($o("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ot=arguments[0]||null,st=arguments[1]||null,C=arguments[2],X=arguments[3],W=arguments[4]||0),$o('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,X,ot,st,W)},this.initRenderTarget=function(C){Zt.get(C).__webglFramebuffer===void 0&&N.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?N.setTextureCube(C,0):C.isData3DTexture?N.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?N.setTexture2DArray(C,0):N.setTexture2D(C,0),Qt.unbindTexture()},this.resetState=function(){B=0,O=0,H=null,Qt.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ya}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=we._getDrawingBufferColorSpace(t),i.unpackColorSpace=we._getUnpackColorSpace()}}class dp{constructor(t,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new ae(t),this.near=i,this.far=s}clone(){return new dp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class r2 extends bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qi,this.environmentIntensity=1,this.environmentRotation=new qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class zs extends Vs{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const lu=new V,cu=new V,_v=new Ye,Ko=new pu,Vc=new ol,sd=new V,vv=new V;class yx extends bn{constructor(t=new An,i=new zs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)lu.fromBufferAttribute(i,l-1),cu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=lu.distanceTo(cu);t.setAttribute("lineDistance",new nn(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Vc.copy(s.boundingSphere),Vc.applyMatrix4(l),Vc.radius+=c,t.ray.intersectsSphere(Vc)===!1)return;_v.copy(l).invert(),Ko.copy(t.ray).applyMatrix4(_v);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=s.index,v=s.attributes.position;if(g!==null){const S=Math.max(0,f.start),M=Math.min(g.count,f.start+f.count);for(let T=S,E=M-1;T<E;T+=p){const x=g.getX(T),L=g.getX(T+1),U=kc(this,t,Ko,m,x,L);U&&i.push(U)}if(this.isLineLoop){const T=g.getX(M-1),E=g.getX(S),x=kc(this,t,Ko,m,T,E);x&&i.push(x)}}else{const S=Math.max(0,f.start),M=Math.min(v.count,f.start+f.count);for(let T=S,E=M-1;T<E;T+=p){const x=kc(this,t,Ko,m,T,T+1);x&&i.push(x)}if(this.isLineLoop){const T=kc(this,t,Ko,m,M-1,S);T&&i.push(T)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function kc(r,t,i,s,l,c){const f=r.geometry.attributes.position;if(lu.fromBufferAttribute(f,l),cu.fromBufferAttribute(f,c),i.distanceSqToSegment(lu,cu,sd,vv)>s)return;sd.applyMatrix4(r.matrixWorld);const m=t.ray.origin.distanceTo(sd);if(!(m<t.near||m>t.far))return{distance:m,point:vv.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}const xv=new V,yv=new V;class el extends yx{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)xv.fromBufferAttribute(i,l),yv.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+xv.distanceTo(yv);t.setAttribute("lineDistance",new nn(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jd extends Vs{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Sv=new Ye,$d=new pu,Xc=new ol,Wc=new V;class Mv extends bn{constructor(t=new An,i=new Jd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Xc.copy(s.boundingSphere),Xc.applyMatrix4(l),Xc.radius+=c,t.ray.intersectsSphere(Xc)===!1)return;Sv.copy(l).invert(),$d.copy(t.ray).applyMatrix4(Sv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=s.index,_=s.attributes.position;if(p!==null){const v=Math.max(0,f.start),S=Math.min(p.count,f.start+f.count);for(let M=v,T=S;M<T;M++){const E=p.getX(M);Wc.fromBufferAttribute(_,E),Ev(Wc,E,m,l,t,i,this)}}else{const v=Math.max(0,f.start),S=Math.min(_.count,f.start+f.count);for(let M=v,T=S;M<T;M++)Wc.fromBufferAttribute(_,M),Ev(Wc,M,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Ev(r,t,i,s,l,c,f){const d=$d.distanceSqToPoint(r);if(d<i){const m=new V;$d.closestPointToPoint(r,m),m.applyMatrix4(s);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class qe extends An{constructor(t=1,i=1,s=1,l=32,c=1,f=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:s,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:d,thetaLength:m};const p=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],v=[],S=[];let M=0;const T=[],E=s/2;let x=0;L(),f===!1&&(t>0&&U(!0),i>0&&U(!1)),this.setIndex(g),this.setAttribute("position",new nn(_,3)),this.setAttribute("normal",new nn(v,3)),this.setAttribute("uv",new nn(S,2));function L(){const R=new V,Y=new V;let B=0;const O=(i-t)/s;for(let H=0;H<=c;H++){const D=[],w=H/c,F=w*(i-t)+t;for(let nt=0;nt<=l;nt++){const rt=nt/l,ht=rt*m+d,mt=Math.sin(ht),z=Math.cos(ht);Y.x=F*mt,Y.y=-w*s+E,Y.z=F*z,_.push(Y.x,Y.y,Y.z),R.set(mt,O,z).normalize(),v.push(R.x,R.y,R.z),S.push(rt,1-w),D.push(M++)}T.push(D)}for(let H=0;H<l;H++)for(let D=0;D<c;D++){const w=T[D][H],F=T[D+1][H],nt=T[D+1][H+1],rt=T[D][H+1];(t>0||D!==0)&&(g.push(w,F,rt),B+=3),(i>0||D!==c-1)&&(g.push(F,nt,rt),B+=3)}p.addGroup(x,B,0),x+=B}function U(R){const Y=M,B=new Te,O=new V;let H=0;const D=R===!0?t:i,w=R===!0?1:-1;for(let nt=1;nt<=l;nt++)_.push(0,E*w,0),v.push(0,w,0),S.push(.5,.5),M++;const F=M;for(let nt=0;nt<=l;nt++){const ht=nt/l*m+d,mt=Math.cos(ht),z=Math.sin(ht);O.x=D*z,O.y=E*w,O.z=D*mt,_.push(O.x,O.y,O.z),v.push(0,w,0),B.x=mt*.5+.5,B.y=z*.5*w+.5,S.push(B.x,B.y),M++}for(let nt=0;nt<l;nt++){const rt=Y+nt,ht=F+nt;R===!0?g.push(ht,ht+1,rt):g.push(ht+1,ht,rt),H+=3}p.addGroup(x,H,R===!0?1:2),x+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ir extends qe{constructor(t=1,i=1,s=32,l=1,c=!1,f=0,d=Math.PI*2){super(0,t,i,s,l,c,f,d),this.type="ConeGeometry",this.parameters={radius:t,height:i,radialSegments:s,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:d}}static fromJSON(t){return new Ir(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class cl extends An{constructor(t=[],i=[],s=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:i,radius:s,detail:l};const c=[],f=[];d(l),p(s),g(),this.setAttribute("position",new nn(c,3)),this.setAttribute("normal",new nn(c.slice(),3)),this.setAttribute("uv",new nn(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function d(L){const U=new V,R=new V,Y=new V;for(let B=0;B<i.length;B+=3)S(i[B+0],U),S(i[B+1],R),S(i[B+2],Y),m(U,R,Y,L)}function m(L,U,R,Y){const B=Y+1,O=[];for(let H=0;H<=B;H++){O[H]=[];const D=L.clone().lerp(R,H/B),w=U.clone().lerp(R,H/B),F=B-H;for(let nt=0;nt<=F;nt++)nt===0&&H===B?O[H][nt]=D:O[H][nt]=D.clone().lerp(w,nt/F)}for(let H=0;H<B;H++)for(let D=0;D<2*(B-H)-1;D++){const w=Math.floor(D/2);D%2===0?(v(O[H][w+1]),v(O[H+1][w]),v(O[H][w])):(v(O[H][w+1]),v(O[H+1][w+1]),v(O[H+1][w]))}}function p(L){const U=new V;for(let R=0;R<c.length;R+=3)U.x=c[R+0],U.y=c[R+1],U.z=c[R+2],U.normalize().multiplyScalar(L),c[R+0]=U.x,c[R+1]=U.y,c[R+2]=U.z}function g(){const L=new V;for(let U=0;U<c.length;U+=3){L.x=c[U+0],L.y=c[U+1],L.z=c[U+2];const R=E(L)/2/Math.PI+.5,Y=x(L)/Math.PI+.5;f.push(R,1-Y)}M(),_()}function _(){for(let L=0;L<f.length;L+=6){const U=f[L+0],R=f[L+2],Y=f[L+4],B=Math.max(U,R,Y),O=Math.min(U,R,Y);B>.9&&O<.1&&(U<.2&&(f[L+0]+=1),R<.2&&(f[L+2]+=1),Y<.2&&(f[L+4]+=1))}}function v(L){c.push(L.x,L.y,L.z)}function S(L,U){const R=L*3;U.x=t[R+0],U.y=t[R+1],U.z=t[R+2]}function M(){const L=new V,U=new V,R=new V,Y=new V,B=new Te,O=new Te,H=new Te;for(let D=0,w=0;D<c.length;D+=9,w+=6){L.set(c[D+0],c[D+1],c[D+2]),U.set(c[D+3],c[D+4],c[D+5]),R.set(c[D+6],c[D+7],c[D+8]),B.set(f[w+0],f[w+1]),O.set(f[w+2],f[w+3]),H.set(f[w+4],f[w+5]),Y.copy(L).add(U).add(R).divideScalar(3);const F=E(Y);T(B,w+0,L,F),T(O,w+2,U,F),T(H,w+4,R,F)}}function T(L,U,R,Y){Y<0&&L.x===1&&(f[U]=L.x-1),R.x===0&&R.z===0&&(f[U]=Y/2/Math.PI+.5)}function E(L){return Math.atan2(L.z,-L.x)}function x(L){return Math.atan2(-L.y,Math.sqrt(L.x*L.x+L.z*L.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.vertices,t.indices,t.radius,t.details)}}class uu extends cl{constructor(t=1,i=0){const s=(1+Math.sqrt(5))/2,l=1/s,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-s,0,-l,s,0,l,-s,0,l,s,-l,-s,0,-l,s,0,l,-s,0,l,s,0,-s,0,-l,s,0,-l,-s,0,l,s,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,i),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new uu(t.radius,t.detail)}}const qc=new V,jc=new V,rd=new V,Yc=new bi;class Zc extends An{constructor(t=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:i},t!==null){const l=Math.pow(10,4),c=Math.cos(iu*i),f=t.getIndex(),d=t.getAttribute("position"),m=f?f.count:d.count,p=[0,0,0],g=["a","b","c"],_=new Array(3),v={},S=[];for(let M=0;M<m;M+=3){f?(p[0]=f.getX(M),p[1]=f.getX(M+1),p[2]=f.getX(M+2)):(p[0]=M,p[1]=M+1,p[2]=M+2);const{a:T,b:E,c:x}=Yc;if(T.fromBufferAttribute(d,p[0]),E.fromBufferAttribute(d,p[1]),x.fromBufferAttribute(d,p[2]),Yc.getNormal(rd),_[0]=`${Math.round(T.x*l)},${Math.round(T.y*l)},${Math.round(T.z*l)}`,_[1]=`${Math.round(E.x*l)},${Math.round(E.y*l)},${Math.round(E.z*l)}`,_[2]=`${Math.round(x.x*l)},${Math.round(x.y*l)},${Math.round(x.z*l)}`,!(_[0]===_[1]||_[1]===_[2]||_[2]===_[0]))for(let L=0;L<3;L++){const U=(L+1)%3,R=_[L],Y=_[U],B=Yc[g[L]],O=Yc[g[U]],H=`${R}_${Y}`,D=`${Y}_${R}`;D in v&&v[D]?(rd.dot(v[D].normal)<=c&&(S.push(B.x,B.y,B.z),S.push(O.x,O.y,O.z)),v[D]=null):H in v||(v[H]={index0:p[L],index1:p[U],normal:rd.clone()})}}for(const M in v)if(v[M]){const{index0:T,index1:E}=v[M];qc.fromBufferAttribute(d,T),jc.fromBufferAttribute(d,E),S.push(qc.x,qc.y,qc.z),S.push(jc.x,jc.y,jc.z)}this.setAttribute("position",new nn(S,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class pp extends cl{constructor(t=1,i=0){const s=(1+Math.sqrt(5))/2,l=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,i),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new pp(t.radius,t.detail)}}class fu extends cl{constructor(t=1,i=0){const s=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(s,l,t,i),this.type="OctahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new fu(t.radius,t.detail)}}class vn extends An{constructor(t=1,i=32,s=16,l=0,c=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:d},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+d,Math.PI);let p=0;const g=[],_=new V,v=new V,S=[],M=[],T=[],E=[];for(let x=0;x<=s;x++){const L=[],U=x/s;let R=0;x===0&&f===0?R=.5/i:x===s&&m===Math.PI&&(R=-.5/i);for(let Y=0;Y<=i;Y++){const B=Y/i;_.x=-t*Math.cos(l+B*c)*Math.sin(f+U*d),_.y=t*Math.cos(f+U*d),_.z=t*Math.sin(l+B*c)*Math.sin(f+U*d),M.push(_.x,_.y,_.z),v.copy(_).normalize(),T.push(v.x,v.y,v.z),E.push(B+R,1-U),L.push(p++)}g.push(L)}for(let x=0;x<s;x++)for(let L=0;L<i;L++){const U=g[x][L+1],R=g[x][L],Y=g[x+1][L],B=g[x+1][L+1];(x!==0||f>0)&&S.push(U,R,B),(x!==s-1||m<Math.PI)&&S.push(R,Y,B)}this.setIndex(S),this.setAttribute("position",new nn(M,3)),this.setAttribute("normal",new nn(T,3)),this.setAttribute("uv",new nn(E,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class mp extends An{constructor(t=1,i=.4,s=12,l=48,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:i,radialSegments:s,tubularSegments:l,arc:c},s=Math.floor(s),l=Math.floor(l);const f=[],d=[],m=[],p=[],g=new V,_=new V,v=new V;for(let S=0;S<=s;S++)for(let M=0;M<=l;M++){const T=M/l*c,E=S/s*Math.PI*2;_.x=(t+i*Math.cos(E))*Math.cos(T),_.y=(t+i*Math.cos(E))*Math.sin(T),_.z=i*Math.sin(E),d.push(_.x,_.y,_.z),g.x=t*Math.cos(T),g.y=t*Math.sin(T),v.subVectors(_,g).normalize(),m.push(v.x,v.y,v.z),p.push(M/l),p.push(S/s)}for(let S=1;S<=s;S++)for(let M=1;M<=l;M++){const T=(l+1)*S+M-1,E=(l+1)*(S-1)+M-1,x=(l+1)*(S-1)+M,L=(l+1)*S+M;f.push(T,E,L),f.push(E,x,L)}this.setIndex(f),this.setAttribute("position",new nn(d,3)),this.setAttribute("normal",new nn(m,3)),this.setAttribute("uv",new nn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mp(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class On extends Vs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nx,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gp extends bn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}const od=new Ye,Tv=new V,bv=new V;class Sx{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fp,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new Xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;Tv.setFromMatrixPosition(t.matrixWorld),i.position.copy(Tv),bv.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(bv),i.updateMatrixWorld(),od.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(od),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(od)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Av=new Ye,Qo=new V,ld=new V;class o2 extends Sx{constructor(){super(new ui(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Te(4,2),this._viewportCount=6,this._viewports=[new Xe(2,1,1,1),new Xe(0,1,1,1),new Xe(3,1,1,1),new Xe(1,1,1,1),new Xe(3,0,1,1),new Xe(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,i=0){const s=this.camera,l=this.matrix,c=t.distance||s.far;c!==s.far&&(s.far=c,s.updateProjectionMatrix()),Qo.setFromMatrixPosition(t.matrixWorld),s.position.copy(Qo),ld.copy(s.position),ld.add(this._cubeDirections[i]),s.up.copy(this._cubeUps[i]),s.lookAt(ld),s.updateMatrixWorld(),l.makeTranslation(-Qo.x,-Qo.y,-Qo.z),Av.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Av)}}class l2 extends gp{constructor(t,i,s=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new o2}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class c2 extends Sx{constructor(){super(new px(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class u2 extends gp{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bn.DEFAULT_UP),this.updateMatrix(),this.target=new bn,this.shadow=new c2}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class f2 extends gp{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}class h2{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=wv(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=wv();t=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=t}return t}}function wv(){return performance.now()}const Rv=new Ye;class d2{constructor(t,i,s=0,l=1/0){this.ray=new pu(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new up,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return Rv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rv),this}intersectObject(t,i=!0,s=[]){return tp(t,this,s,i),s.sort(Cv),s}intersectObjects(t,i=!0,s=[]){for(let l=0,c=t.length;l<c;l++)tp(t[l],this,s,i);return s.sort(Cv),s}}function Cv(r,t){return r.distance-t.distance}function tp(r,t,i,s){let l=!0;if(r.layers.test(t.layers)&&r.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const c=r.children;for(let f=0,d=c.length;f<d;f++)tp(c[f],t,i,!0)}}class p2 extends el{constructor(t=10,i=10,s=4473924,l=8947848){s=new ae(s),l=new ae(l);const c=i/2,f=t/i,d=t/2,m=[],p=[];for(let v=0,S=0,M=-d;v<=i;v++,M+=f){m.push(-d,0,M,d,0,M),m.push(M,0,-d,M,0,d);const T=v===c?s:l;T.toArray(p,S),S+=3,T.toArray(p,S),S+=3,T.toArray(p,S),S+=3,T.toArray(p,S),S+=3}const g=new An;g.setAttribute("position",new nn(m,3)),g.setAttribute("color",new nn(p,3));const _=new zs({vertexColors:!0,toneMapped:!1});super(g,_),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ip}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ip);class m2{constructor(t,i,s){jt(this,"scene");jt(this,"renderer");jt(this,"camera");jt(this,"camera2",null);jt(this,"playerMeshes",new Map);jt(this,"enemyMeshes",new Map);jt(this,"projectileMeshes",new Map);jt(this,"particleMeshes",new Map);jt(this,"bossMeshes",new Map);jt(this,"lockIndicators",new Map);jt(this,"ground");jt(this,"grid");jt(this,"ambientLight");jt(this,"dirLight");jt(this,"pointLight");jt(this,"clock");this.scene=new r2,this.scene.background=new ae(657946),this.scene.fog=new dp(657946,100,300),this.renderer=new s2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(i,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=kv,this.camera=new ui(60,i/s,.1,500),this.camera.position.set(0,20,25),this.clock=new h2,this.ambientLight=new f2(2245734,.8),this.scene.add(this.ambientLight),this.dirLight=new u2(16777215,1.5),this.dirLight.position.set(50,100,50),this.dirLight.castShadow=!0,this.scene.add(this.dirLight),this.pointLight=new l2(4491519,2,50),this.pointLight.position.set(0,10,0),this.scene.add(this.pointLight);const l=new ll(400,400),c=new On({color:657952,roughness:.8,metalness:.2});this.ground=new ie(l,c),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-.5,this.ground.receiveShadow=!0,this.scene.add(this.ground),this.grid=new p2(400,80,2245768,1122884),this.grid.position.y=0,this.scene.add(this.grid);const f=new An,d=new Float32Array(3e3);for(let g=0;g<3e3;g++)d[g*3]=(Math.random()-.5)*800,d[g*3+1]=Math.random()*400+50,d[g*3+2]=(Math.random()-.5)*800;f.setAttribute("position",new Jn(d,3));const m=new Jd({color:16777215,size:.5,transparent:!0}),p=new Mv(f,m);this.scene.add(p)}updateCamera(t,i,s,l=!1,c=0){const f=l&&this.camera2?this.camera2:this.camera,d=new V(Math.sin(c),0,Math.cos(c)),m=new V(t.x-d.x*15,t.y+8,t.z-d.z*15),p=1-Math.exp(-8*i);f.position.lerp(m,p),f.lookAt(t.x,t.y,t.z)}resize(t,i){this.renderer.setSize(t,i),this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.camera2&&(this.camera2.aspect=t/i,this.camera2.updateProjectionMatrix())}render(){this.renderer.render(this.scene,this.camera)}renderSplit(t,i){const s=this.renderer.domElement,l=s.width/2,c=s.height;this.renderer.setScissorTest(!0),this.renderer.setViewport(0,0,l,c),this.renderer.setScissor(0,0,l,c),this.renderer.render(this.scene,t),this.renderer.setViewport(l,0,l,c),this.renderer.setScissor(l,0,l,c),this.renderer.render(this.scene,i),this.renderer.setScissorTest(!1)}addPart(t,i,s,l,c,f=6710920,d=15){const m=new ie(i,s);m.position.set(l[0],l[1],l[2]),c&&m.rotation.set(c[0],c[1],c[2]),m.castShadow=!0,t.add(m);const p=new Zc(i,d),g=new zs({color:f,transparent:!0,opacity:.4}),_=new el(p,g);return _.position.copy(m.position),c&&_.rotation.set(c[0],c[1],c[2]),t.add(_),m}createPlayerMesh(t=new ae(4491519)){const i=new Fs,s=new On({color:14738672,metalness:.5,roughness:.3}),l=new On({color:5592422,metalness:.8,roughness:.2}),c=new On({color:t,metalness:.6,roughness:.3}),f=new On({color:t.clone().multiplyScalar(.6),metalness:.7,roughness:.3}),d=new On({color:16777215,emissive:t,emissiveIntensity:1,metalness:.3,roughness:.1}),m=new On({color:3355460,metalness:.9,roughness:.2}),p=new On({color:2236979,metalness:.3,roughness:.8}),g=(M,T,E)=>{const x=new Zc(M,25),L=new el(x,new zs({color:2236979,transparent:!0,opacity:.25}));L.position.set(T[0],T[1],T[2]),i.add(L)};this.addPart(i,new de(1.8,1,1.4),s,[0,.5,0]),g(new de(1.8,1,1.4),[0,.5,0]),this.addPart(i,new de(1.6,.7,.4),c,[0,.6,.75]),this.addPart(i,new de(1.2,.5,.2),f,[0,.6,.95]),this.addPart(i,new vn(.25,8,8),d,[0,.5,.9]);for(let M=-1;M<=1;M+=2)this.addPart(i,new de(.15,.3,.5),p,[M*.95,.4,.4]);this.addPart(i,new qe(.8,1,.4,6),l,[0,0,0]),this.addPart(i,new de(.7,.5,.7,2,2,2),s,[0,1.3,0]),g(new de(.7,.5,.7,2,2,2),[0,1.3,0]),this.addPart(i,new de(.6,.1,.1),d,[0,1.3,.4]),this.addPart(i,new de(.1,.18,.1),d,[0,1.2,.4]),this.addPart(i,new de(.08,.25,.3),c,[0,1.6,0]),this.addPart(i,new de(.5,.15,.1),l,[0,1.1,.35]);for(let M=-1;M<=1;M+=2)this.addPart(i,new de(.8,.3,.6,2,2,2),s,[M*1.3,.9,0]),g(new de(.8,.3,.6,2,2,2),[M*1.3,.9,0]),this.addPart(i,new de(.6,.15,.4),c,[M*1.3,1,0]),this.addPart(i,new vn(.2,6,6),m,[M*1.1,.7,0]);for(let M=-1;M<=1;M+=2)this.addPart(i,new qe(.2,.25,.7,6),s,[M*1.2,.3,0]),this.addPart(i,new qe(.15,.18,.55,6),c,[M*1.2,.3,.15]),this.addPart(i,new vn(.14,6,6),m,[M*1.2,-.1,0]),this.addPart(i,new qe(.16,.14,.5,6),s,[M*1.2,-.45,0]),this.addPart(i,new de(.2,.3,.15),c,[M*1.2,-.45,.2]),this.addPart(i,new vn(.1,6,6),m,[M*1.2,-.7,0]),M>0&&(this.addPart(i,new qe(.08,.1,.8,6),l,[M*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(i,new qe(.05,.06,1,6),l,[M*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(i,new qe(.07,.09,.1,6),c,[M*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(i,new de(.2,.12,.3),c,[M*1.35,-.3,.3]));for(let M=-1;M<=1;M+=2)this.addPart(i,new qe(.3,.35,.7,6),s,[M*.5,-.4,0]),g(new qe(.3,.35,.7,6),[M*.5,-.4,0]),this.addPart(i,new de(.3,.4,.4),c,[M*.5,-.3,.25]),this.addPart(i,new vn(.2,6,6),m,[M*.5,-.8,0]),this.addPart(i,new vn(.18,6,6),c,[M*.5,-.8,.15]),this.addPart(i,new qe(.25,.2,.6,6),s,[M*.5,-1.2,0]),this.addPart(i,new de(.25,.4,.3),c,[M*.5,-1.2,.2]),this.addPart(i,new vn(.15,6,6),m,[M*.5,-1.55,0]),this.addPart(i,new de(.4,.12,.5),s,[M*.5,-1.65,.1]),g(new de(.4,.12,.5),[M*.5,-1.65,.1]),this.addPart(i,new de(.3,.06,.15),c,[M*.5,-1.7,.35]);this.addPart(i,new de(1,.6,.4),l,[0,.5,-.95]),this.addPart(i,new qe(.35,.4,.4,8),l,[0,.4,-1.2]);for(let M=-1;M<=1;M+=2)this.addPart(i,new qe(.2,.25,.35,6),l,[M*.45,.4,-1.15]);for(let M=-1;M<=1;M+=2)this.addPart(i,new qe(.15,.18,.25,6),l,[M*.35,.85,-.95]);const _=new qe(.3,.1,.15,8),v=new ou({color:t,transparent:!0,opacity:.5}),S=new ie(_,v);S.position.set(0,.3,-1.4),i.add(S);for(let M=-1;M<=1;M+=2){const T=new ie(new qe(.18,.06,.1,6),v);T.position.set(M*.45,.3,-1.35),i.add(T)}this.addPart(i,new de(.7,.2,.15),c,[0,-.1,.55]);for(let M=-1;M<=1;M+=2)this.addPart(i,new de(.15,.2,.4),c,[M*.65,-.1,.2]);return i}createEnemyMesh(t,i,s){const l=new Fs,c=new On({color:t,metalness:.6,roughness:.3}),f=new On({color:4473958,metalness:.7,roughness:.3}),d=new On({color:16777215,emissive:t,emissiveIntensity:.6}),m=new On({color:t,emissive:t,emissiveIntensity:.4,metalness:.5,roughness:.3}),p=(g,_,v)=>{const S=new Zc(g,20),M=new el(S,new zs({color:0,transparent:!0,opacity:.15}));M.position.set(_[0],_[1],_[2]),l.add(M)};switch(s){case"scout":{const g=new ie(new fu(i*.7,1),c);g.castShadow=!0,l.add(g);const _=new ie(new vn(i*.2,6,6),d);l.add(_);for(let S=0;S<4;S++){const M=S/4*Math.PI*2,T=new ie(new Ir(i*.08,i*.5,4),m);T.position.set(Math.cos(M)*i*.6,0,Math.sin(M)*i*.6),T.rotation.z=Math.PI/2,T.rotation.y=-M,l.add(T)}const v=new ie(new qe(.02,.03,i*.4),f);v.position.set(0,i*.5,0),l.add(v);break}case"assault":{const g=new ie(new de(i*1,i*.8,i*.7),c);g.castShadow=!0,l.add(g),p(new de(i*1,i*.8,i*.7),[0,0,0]);const _=new ie(new de(i*.7,i*.4,i*.2),m);_.position.set(0,0,i*.45),l.add(_);const v=new ie(new de(i*.3,i*.25,i*.3),f);v.position.set(0,i*.55,0),l.add(v);const S=new ie(new de(i*.25,i*.06,.05),d);S.position.set(0,i*.55,i*.17),l.add(S);for(let M=-1;M<=1;M+=2){const T=new ie(new qe(i*.08,i*.1,i*.4,6),f);T.position.set(M*i*.6,i*.1,i*.3),T.rotation.x=Math.PI/2,l.add(T)}break}case"sniper":{const g=new ie(new qe(i*.2,i*.3,i*1,6),c);g.castShadow=!0,l.add(g),p(new qe(i*.2,i*.3,i*1,6),[0,0,0]);const _=new ie(new qe(i*.06,i*.06,i*.15,6),f);_.position.set(0,i*.6,0),l.add(_);const v=new ie(new vn(i*.08,6,6),d);v.position.set(0,i*.68,0),l.add(v);const S=new ie(new qe(i*.04,i*.06,i*1.2,6),f);S.position.set(0,0,i*.7),S.rotation.x=Math.PI/2,l.add(S);for(let M=-1;M<=1;M+=2){const T=new ie(new qe(i*.04,i*.06,i*.3,4),f);T.position.set(M*i*.2,-i*.55,0),l.add(T)}break}case"shield":{const g=new ie(new de(i*1.2,i*.6,i*.5,2,2,2),c);g.castShadow=!0,l.add(g),p(new de(i*1.2,i*.6,i*.5,2,2,2),[0,0,0]);const _=new ie(new de(i*1.1,i*.8,i*.15),m);_.position.set(0,0,i*.35),l.add(_);const v=new Zc(new de(i*1.1,i*.8,i*.15),15),S=new el(v,new zs({color:16777215,transparent:!0,opacity:.3}));S.position.set(0,0,i*.35),l.add(S);const M=new ie(new vn(i*.15,6,6),d);M.position.set(0,0,i*.45),l.add(M);for(let T=-1;T<=1;T+=2){const E=new ie(new qe(i*.1,i*.15,i*.2,6),f);E.position.set(T*i*.4,0,-i*.3),l.add(E)}break}case"bomber":{const g=new ie(new vn(i*.6,8,8),c);g.castShadow=!0,l.add(g);for(let v=0;v<8;v++){const S=v/8*Math.PI*2,M=Math.PI*.5,T=new ie(new Ir(i*.06,i*.35,4),m);T.position.set(Math.cos(S)*Math.sin(M)*i*.6,Math.cos(M)*i*.6,Math.sin(S)*Math.sin(M)*i*.6),T.quaternion.setFromUnitVectors(new V(0,1,0),new V(Math.cos(S)*Math.sin(M),Math.cos(M),Math.sin(S)*Math.sin(M))),l.add(T)}const _=new ie(new vn(i*.2,6,6),new On({color:16711680,emissive:16711680,emissiveIntensity:1}));_.position.set(0,0,0),l.add(_);break}case"commander":{const g=new ie(new uu(i*.6),c);g.castShadow=!0,l.add(g);const _=new ie(new Ir(i*.1,i*.5,4),m);_.position.set(0,i*.6,0),l.add(_);for(let M=-1;M<=1;M+=2){const T=new ie(new vn(i*.25,6,6),f);T.position.set(M*i*.55,i*.2,0),l.add(T)}const v=new ie(new vn(i*.15,6,6),d);l.add(v);const S=new ie(new de(i*.4,i*.3,i*.2),f);S.position.set(0,0,-i*.4),l.add(S);break}default:{const g=new ie(new fu(i*.8),c);g.castShadow=!0,l.add(g);const _=new ie(new vn(i*.3,6,6),d);l.add(_);break}}return l}createBossMesh(t=new ae(16729156),i=4){const s=new Fs,l=new ie(new uu(i),new On({color:t,emissive:t,emissiveIntensity:.3,metalness:.7,roughness:.3}));l.castShadow=!0,s.add(l);const c=new ie(new pp(i*.4),new On({color:16777215,emissive:16746496,emissiveIntensity:1,transparent:!0,opacity:.8}));s.add(c);const f=new ie(new mp(i*1.2,.1,8,24),new On({color:16755200,emissive:16729088,emissiveIntensity:.5}));f.rotation.x=Math.PI/2,s.add(f);for(let d=0;d<6;d++){const m=new ie(new qe(.3,.4,.8,6),new On({color:8947848,metalness:.8,roughness:.2})),p=d/6*Math.PI*2;m.position.set(Math.cos(p)*i*1.1,0,Math.sin(p)*i*1.1),m.rotation.z=Math.PI/2,m.rotation.y=-p,s.add(m)}return s}createProjectileMesh(t,i){const s=new ae(t);let l;switch(i){case"beam":case"sniper":l=new vn(.3,6,6);break;case"missile":l=new Ir(.2,.6,6);break;default:l=new vn(.15,4,4)}const c=new ou({color:s});return new ie(l,c)}createExplosion(t,i,s=1){const c=new Float32Array(90),f=new Float32Array(90),d=new ae(i);for(let S=0;S<30;S++){const M=Math.random()*Math.PI*2,T=Math.random()*Math.PI,E=s*(.5+Math.random()*.5);c[S*3]=t.x+E*Math.sin(T)*Math.cos(M),c[S*3+1]=t.y+E*Math.cos(T),c[S*3+2]=t.z+E*Math.sin(T)*Math.sin(M),f[S*3]=d.r,f[S*3+1]=d.g,f[S*3+2]=d.b}const m=new An;m.setAttribute("position",new Jn(c,3)),m.setAttribute("color",new Jn(f,3));const p=new Jd({size:.5,vertexColors:!0,transparent:!0,opacity:1,blending:ud,depthWrite:!1}),g=new Mv(m,p);this.scene.add(g);let _=1;const v=()=>{if(_-=.02,_<=0){this.scene.remove(g),m.dispose(),p.dispose();return}p.opacity=_;const S=m.attributes.position,M=S.array;for(let T=0;T<30;T++)M[T*3]+=(Math.random()-.5)*.5,M[T*3+1]+=(Math.random()-.5)*.5,M[T*3+2]+=(Math.random()-.5)*.5;S.needsUpdate=!0,requestAnimationFrame(v)};v()}updateLockIndicator(t,i,s){const l=this.lockIndicators.get(t);if(!s){l&&(this.scene.remove(l),this.lockIndicators.delete(t));return}if(l){const c=l.geometry.attributes.position,f=c.array;f[0]=i.x,f[1]=i.y,f[2]=i.z,f[3]=s.x,f[4]=s.y,f[5]=s.z,c.needsUpdate=!0}else{const c=new An,f=new Float32Array([i.x,i.y,i.z,s.x,s.y,s.z]);c.setAttribute("position",new Jn(f,3));const d=new zs({color:65416,transparent:!0,opacity:.4,linewidth:1}),m=new yx(c,d);this.scene.add(m),this.lockIndicators.set(t,m)}}dispose(){this.renderer.dispose()}}class g2{constructor(t){jt(this,"keys",new Set);jt(this,"mouseX",0);jt(this,"mouseY",0);jt(this,"mouseNormX",.5);jt(this,"mouseNormY",.5);jt(this,"mouseDown",!1);jt(this,"callbacks",new Map);jt(this,"_weaponSwitch",0);jt(this,"canvasWidth",1);jt(this,"canvasHeight",1)}setCanvasSize(t,i){this.canvasWidth=t,this.canvasHeight=i}getState(){const t=this._weaponSwitch;return this._weaponSwitch=0,{forward:this.keys.has("w")||this.keys.has("ArrowUp"),backward:this.keys.has("s")||this.keys.has("ArrowDown"),left:this.keys.has("a")||this.keys.has("ArrowLeft"),right:this.keys.has("d")||this.keys.has("ArrowRight"),up:this.keys.has("q"),down:this.keys.has("e"),shoot:this.mouseDown,aimX:this.mouseNormX,aimY:this.mouseNormY,weaponSwitch:t,skill1:this.keys.has("1"),skill2:this.keys.has("2"),skill3:this.keys.has("3"),special:this.keys.has("r"),boost:this.keys.has(" "),lockTarget:this.keys.has("Tab"),pause:this.keys.has("Escape")}}keyDown(t){const i=t.toLowerCase();this.keys.add(i),t==="Tab"&&this.keys.add("Tab"),t==="Escape"&&this.keys.add("Escape");const s=parseInt(t,10);s>=1&&s<=4&&(this._weaponSwitch=s)}keyUp(t){const i=t.toLowerCase();this.keys.delete(i),t==="Tab"&&this.keys.delete("Tab"),t==="Escape"&&this.keys.delete("Escape")}mouseMove(t,i){this.mouseX=t,this.mouseY=i,this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?i/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}class Mx{constructor(){jt(this,"ctx",null);jt(this,"masterGain",null);jt(this,"bgmGain",null);jt(this,"sfxGain",null);jt(this,"bgmOsc",null);jt(this,"initialized",!1)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="square",i.frequency.value=t,s.gain.setValueAtTime(.3,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),i.connect(s),s.connect(this.sfxGain),i.start(),i.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,i=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=i.getChannelData(0);for(let f=0;f<t;f++)s[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=i;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.value=1200,i.gain.setValueAtTime(.2,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(i),i.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),i.gain.setValueAtTime(.4,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(i),i.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="square",i.frequency.value=440,s.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),i.connect(s),s.connect(this.sfxGain),i.start(this.ctx.currentTime+t*.3),i.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){if(this.ensureCtx(),!this.ctx||!this.bgmGain||this.bgmOsc)return;const t=this.ctx.createOscillator(),i=this.ctx.createOscillator(),s=this.ctx.createGain();t.type="sawtooth",t.frequency.value=55,i.type="sine",i.frequency.value=.5,s.gain.value=20,i.connect(s),s.connect(t.frequency),t.connect(this.bgmGain),t.start(),i.start(),this.bgmOsc=t}stopBGM(){if(this.bgmOsc){try{this.bgmOsc.stop()}catch{}this.bgmOsc=null}}}const Vi=new Mx;var Le=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(Le||{}),Gt=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Gt||{}),fi=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(fi||{}),Ti=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(Ti||{});const Dv=[{id:1,name:"光束机枪",type:fi.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:Ti.FreeFire},{id:2,name:"追踪导弹",type:fi.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:Ti.LockRequired},{id:3,name:"光束加农",type:fi.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:Ti.LockRequired},{id:4,name:"散射弹幕",type:fi.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:Ti.FreeFire},{id:5,name:"狙击光束",type:fi.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:Ti.LockRequired},{id:6,name:"浮游炮",type:fi.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:Ti.LockShortRange}];function ep(r){return Dv.find(t=>t.id===r)||Dv[0]}const Uv=[{type:Le.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:Le.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:Le.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:Le.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:Le.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:Le.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function Kc(r){return Uv.find(t=>t.type===r)||Uv[0]}function ki(r,t,i,s,l){return{hpPercent:r,speed:t,attacks:i,minionSpawn:s,attackPattern:l}}const Lv=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[ki(1,5,["弹幕散布"],!0,"spread"),ki(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),ki(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[ki(1,12,["高速突进"],!1,"rush"),ki(.6,15,["高速突进","分身攻击"],!0,"clone"),ki(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[ki(1,4,["多重导弹"],!1,"missile"),ki(.75,6,["多重导弹","力场护盾"],!1,"shield"),ki(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),ki(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function Nv(r){return Lv.find(t=>t.id===r)||Lv[0]}function on(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function Je(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function je(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function Ex(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function Ls(r,t){return Ex(Je(r,t))}function Qe(r){const t=Ex(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function Ov(r,t,i){return r+(t-r)*i}function Pv(r,t,i){return Math.max(t,Math.min(i,r))}function zr(r,t){return r+Math.random()*(t-r)}function _2(r,t){return Math.floor(zr(r,t+1))}let Tx=1;function es(){return Tx++}class v2{constructor(t){jt(this,"scene");jt(this,"input");jt(this,"audio");jt(this,"canvas");jt(this,"players",[]);jt(this,"enemies",[]);jt(this,"projectiles",[]);jt(this,"particles",[]);jt(this,"active",!1);jt(this,"splitScreen",!1);jt(this,"raycaster",new d2);jt(this,"groundPlane",new ns(new V(0,1,0),.5));jt(this,"accumulator",0);jt(this,"lastTime",0);jt(this,"animFrameId",0);jt(this,"enemySpawnTimer",0);jt(this,"waveTimer",0);jt(this,"bossCount",0);jt(this,"currentBossIndex",-1);jt(this,"bossPhase",1);jt(this,"bossAttackTimer",0);jt(this,"comboTimeout",[0,0]);jt(this,"lockTargets",[null,null]);jt(this,"gameLoop",t=>{if(!this.active)return;this.animFrameId=requestAnimationFrame(this.gameLoop);const i=Math.min((t-this.lastTime)/1e3,.05);for(this.lastTime=t,this.accumulator+=i;this.accumulator>=Ch;)this.update(Ch),this.accumulator-=Ch;this.render(i)});this.canvas=t,this.scene=new m2(t,t.width,t.height),this.input=new g2(0),this.input.setCanvasSize(t.width,t.height),this.audio=new Mx}start(t){const i=Tn.getState();this.splitScreen=t==="pvp",this.players=i.players.map(s=>({...s})),this.enemies=[],this.projectiles=[],this.particles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.enemySpawnTimer=0,this.waveTimer=0,this.active=!0,this.lastTime=performance.now(),this.accumulator=0,Tx=1,this.players.forEach((s,l)=>{const c=l===0?new ae(4491519):new ae(16737860),f=this.scene.createPlayerMesh(c);f.position.set(s.pos.x,s.pos.y,s.pos.z),this.scene.playerMeshes.set(s.id,f),this.scene.scene.add(f)}),Vi.init(),Vi.startBGM(),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),Vi.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,i){this.scene.resize(t,i),this.input.setCanvasSize(t,i)}update(t){Tn.getState().game;const s=[this.input.getState()];this.updatePlayers(t,s),this.updateEnemies(t),this.updateProjectiles(t),this.updateParticles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateUI(t),this.updateBoss(t)}updatePlayers(t,i){this.players.forEach((s,l)=>{if(!s.alive)return;const c=i[l]||i[0],f=this.scene.playerMeshes.get(s.id);if(!f)return;const d=c.boost;let m=new V(0,0,0);d?m.z=-1:(m.z=-1,c.forward&&(m.z-=1),c.backward&&(m.z+=1),c.right&&(m.x+=1),c.left&&(m.x-=1));const p=d?s.speed*QS:tM;if(m.normalize(),s.pos.x+=m.x*p*t,s.pos.z+=m.z*p*t,d){const _=Math.atan2(m.x,m.z);s.rot.y=Ov(s.rot.y,_,.15)}else{const _=this.scene.camera,v=s.pos.x-_.position.x,S=s.pos.z-_.position.z,M=Math.atan2(v,S);s.rot.y=Ov(s.rot.y,M,.1)}s.pos.x=Pv(s.pos.x,-Ya,Ya),s.pos.z=Pv(s.pos.z,-Ya,Ya),f.position.set(s.pos.x,s.pos.y,s.pos.z),f.rotation.y=s.rot.y;const g=ep(s.weapon);if(c.lockTarget&&g.lockRange>0){let _=null,v=g.lockRange;for(const S of this.enemies){if(S.hp<=0)continue;const M=Ls(s.pos,S.pos);M<v&&(v=M,_=S)}this.lockTargets[l]=_?_.id:null}else this.lockTargets[l]=null;c.shoot&&!d&&this.playerShoot(s,l),c.weaponSwitch>0&&s.weapons.includes(c.weaponSwitch)&&(s.weapon=c.weaponSwitch),s.shieldTimer>0&&(s.shieldTimer-=t),s.invulnTimer>0&&(s.invulnTimer-=t),s.boostTimer>0&&(s.boostTimer-=t),s.slowTimer>0&&(s.slowTimer-=t),s.specialGauge=Math.min(s.specialGauge+t*2,s.maxSpecialGauge),c.special&&s.specialGauge>=100&&(this.useSpecial(s,l),s.specialGauge=0),s.combo>0&&(this.comboTimeout[l]-=t,this.comboTimeout[l]<=0&&(s.combo=0))})}playerShoot(t,i){const s=ep(t.weapon);if(performance.now(),!this.scene.playerMeshes.get(t.id))return;const c=this.lockTargets[i],f=c!==null?this.enemies.find(p=>p.id===c&&p.hp>0):null;if(s.fireMode===Ti.LockRequired&&!f)return;let d;if(f)d=Qe(Je(f.pos,t.pos));else{const p=this.scene.camera,g=new V(0,0,-1);g.applyQuaternion(p.quaternion),g.y=0,g.normalize(),d={x:g.x,y:g.y,z:g.z}}const m=s.fireMode===Ti.LockShortRange&&f;for(let p=0;p<(s.type===fi.Spread?5:1);p++){const g=s.spread*(Math.random()-.5)*2,_=Qe(on(d,{x:g,y:g*.5,z:0})),v={id:es(),pos:{...t.pos},vel:je(_,s.speed),damage:s.damage,owner:t.id,type:s.type,lifetime:3,radius:.3,color:s.color};if(m&&f&&(v.vel=je(Qe(Je(f.pos,t.pos)),s.speed)),this.projectiles.length<d_){this.projectiles.push(v);const S=this.scene.createProjectileMesh(s.color,s.type);S.position.set(v.pos.x,v.pos.y,v.pos.z),this.scene.projectileMeshes.set(v.id,S),this.scene.scene.add(S)}}Vi.playShoot(600+Math.random()*400)}useSpecial(t,i){Vi.playSpecial(),this.enemies.forEach(s=>{Ls(s.pos,t.pos)<50&&(s.hp-=150,this.scene.createExplosion(s.pos,"#00ffff",2))})}updateEnemies(t){this.enemies.forEach(i=>{if(i.hp<=0){this.scene.createExplosion(i.pos,i.type===Le.Boss?"#ff4400":"#ff6644",i.type===Le.Boss?3:1),Vi.playExplosion(),this.players.forEach(d=>{const m=Kc(i.type);d.score+=m.score,d.kills++,d.combo++,this.comboTimeout[d.id===0?0:1]=JS});return}const s=i.type===Le.Boss?this.scene.bossMeshes.get(i.id):this.scene.enemyMeshes.get(i.id);if(!s)return;const l=this.players.find(d=>d.alive);if(!l)return;const c=Ls(i.pos,l.pos),f=Kc(i.type);switch(i.type){case Le.Scout:this.updateAIScout(i,l,c,f,t);break;case Le.Assault:this.updateAIAssault(i,l,c,f,t);break;case Le.Sniper:this.updateAISniper(i,l,c,f,t);break;case Le.Shield:this.updateAIShield(i,l,c,f,t);break;case Le.Bomber:this.updateAIBomber(i,l,c,f,t);break;case Le.Commander:this.updateAICommander(i,l,c,f,t);break;default:this.updateAIDefault(i,l,c,f,t)}i.hp<f.hp*.3&&i.type!==Le.Boss&&i.type!==Le.Bomber&&i.state!==Gt.Flee&&(i.state=Gt.Flee),s.position.set(i.pos.x,i.pos.y,i.pos.z),s.rotation.y+=t*2,i.type===Le.Boss&&(s.rotation.x+=t*.5)}),this.enemies=this.enemies.filter(i=>{if(i.hp<=0){const s=i.type===Le.Boss?this.scene.bossMeshes.get(i.id):this.scene.enemyMeshes.get(i.id);return s&&(this.scene.scene.remove(s),this.scene.enemyMeshes.delete(i.id),this.scene.bossMeshes.delete(i.id)),!1}return!0})}enemyShoot(t,i){const s=Qe(Je(i.pos,t.pos)),l=Kc(t.type),c={id:es(),pos:{...t.pos},vel:je(s,25),damage:l.damage,owner:t.id+1e4,type:fi.BossBullet,lifetime:4,radius:.3,color:l.color};if(this.projectiles.length<d_){this.projectiles.push(c);const f=this.scene.createProjectileMesh(l.color,"bullet");f.position.set(c.pos.x,c.pos.y,c.pos.z),this.scene.projectileMeshes.set(c.id,f),this.scene.scene.add(f)}}updateAIDefault(t,i,s,l,c){switch(t.state){case Gt.Patrol:s<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(s<l.attackRange)t.state=Gt.Attack;else if(s>l.alertRange*1.5)t.state=Gt.Patrol;else{const d=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(d,t.speed*c))}break;case Gt.Attack:s>l.attackRange*1.2&&(t.state=Gt.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,i),t.attackTimer=.8+Math.random()*.6);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const f=Qe(Je(t.pos,i.pos));t.pos=on(t.pos,je(f,t.speed*1.5*c));break}}updateAIScout(t,i,s,l,c){switch(t.state){case Gt.Patrol:s<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(s<l.attackRange)t.state=Gt.Attack;else if(s>l.alertRange*1.5)t.state=Gt.Patrol;else{const p=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(p,t.speed*c))}break;case Gt.Attack:s>l.attackRange*1.3&&(t.state=Gt.Chase);const f=Qe(Je(t.pos,i.pos)),d={x:-f.z,y:0,z:f.x};t.pos=on(t.pos,je(d,t.speed*.8*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,i),t.attackTimer=.5+Math.random()*.5);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const m=Qe(Je(t.pos,i.pos));t.pos=on(t.pos,je(m,t.speed*1.5*c));break}}updateAIAssault(t,i,s,l,c){switch(t.state){case Gt.Patrol:s<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:const f=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(f,t.speed*c)),s<l.attackRange&&(t.state=Gt.Attack);break;case Gt.Attack:const d=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(d,t.speed*.5*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,i),t.attackTimer=.3+Math.random()*.3),s>l.attackRange*1.5&&(t.state=Gt.Chase);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const m=Qe(Je(t.pos,i.pos));t.pos=on(t.pos,je(m,t.speed*1.5*c));break}}updateAISniper(t,i,s,l,c){switch(t.state){case Gt.Patrol:s<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(s<l.attackRange)t.state=Gt.Attack;else{const d=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(d,t.speed*c))}break;case Gt.Attack:if(s<l.attackRange*.5){const d=Qe(Je(t.pos,i.pos));t.pos=on(t.pos,je(d,t.speed*c))}else s>l.attackRange*1.2&&(t.state=Gt.Chase);t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,i),t.attackTimer=1+Math.random()*.5);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const f=Qe(Je(t.pos,i.pos));t.pos=on(t.pos,je(f,t.speed*1.5*c));break}}updateAIShield(t,i,s,l,c){switch(t.state){case Gt.Patrol:s<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(s<l.attackRange)t.state=Gt.Attack;else if(s>l.alertRange*1.5)t.state=Gt.Patrol;else{const m=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(m,t.speed*c))}break;case Gt.Attack:const f=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(f,t.speed*.3*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,i),t.attackTimer=1.2+Math.random()*.8),s>l.attackRange*1.5&&(t.state=Gt.Chase);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const d=Qe(Je(t.pos,i.pos));t.pos=on(t.pos,je(d,t.speed*1.5*c));break}}updateAIBomber(t,i,s,l,c){switch(t.state){case Gt.Patrol:s<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:case Gt.Attack:const f=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(f,t.speed*c));break}s<3&&(this.scene.createExplosion(t.pos,"#ff4400",2),Vi.playExplosion(),i.hp-=l.damage,i.invulnTimer=h_,t.hp=0)}updateAICommander(t,i,s,l,c){switch(this.enemies.forEach(f=>{if(f.id===t.id||f.hp<=0)return;Ls(t.pos,f.pos)<30&&(f.speed=l.speed*1.3)}),t.state){case Gt.Patrol:s<l.alertRange&&(t.state=Gt.Chase);break;case Gt.Chase:if(s<l.attackRange)t.state=Gt.Attack;else if(s>l.alertRange*1.5)t.state=Gt.Patrol;else{const d=Qe(Je(i.pos,t.pos));t.pos=on(t.pos,je(d,t.speed*c))}break;case Gt.Attack:s>l.attackRange*1.2&&(t.state=Gt.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,i),t.attackTimer=.6+Math.random()*.4);break;case Gt.Flee:t.hp>l.hp*.3&&(t.state=Gt.Chase);const f=Qe(Je(t.pos,i.pos));t.pos=on(t.pos,je(f,t.speed*1.5*c));break}}updateProjectiles(t){this.projectiles.forEach(i=>{i.pos=on(i.pos,je(i.vel,t)),i.lifetime-=t;const s=this.scene.projectileMeshes.get(i.id);s&&(s.position.set(i.pos.x,i.pos.y,i.pos.z),i.type===fi.Missile&&(s.rotation.x+=t*5))}),this.projectiles=this.projectiles.filter(i=>{if(i.lifetime<=0){const s=this.scene.projectileMeshes.get(i.id);return s&&(this.scene.scene.remove(s),this.scene.projectileMeshes.delete(i.id)),!1}return!0})}updateParticles(t){}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(i=>{const s=i.type===Le.Boss?4:1.5;Ls(t.pos,i.pos)<s&&(i.hp-=t.damage,t.lifetime=0,this.scene.createExplosion(t.pos,"#ffaa00",.5),Vi.playHit())})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(i=>{!i.alive||i.invulnTimer>0||i.shieldTimer>0||Ls(t.pos,i.pos)<YS&&(i.hp-=t.damage,t.lifetime=0,i.invulnTimer=h_,this.scene.createExplosion(t.pos,"#ff4444",.5),Vi.playHit(),i.hp<=0&&(i.alive=!1,this.scene.createExplosion(i.pos,"#4488ff",3)))})})}spawnEnemies(t){this.enemySpawnTimer+=t;const s=Tn.getState().game;if(s.gameMode!=="pvp"&&this.enemySpawnTimer>2&&this.enemies.length<$S){if(this.enemySpawnTimer=0,s.wave>0&&s.wave%KS===0&&this.currentBossIndex<0){this.spawnBoss();return}const l=[Le.Scout,Le.Assault,Le.Sniper,Le.Shield,Le.Bomber];s.wave>3&&l.push(Le.Commander);const c=l[_2(0,l.length-1)],f=Kc(c);let d;do d={x:zr(-Ya,Ya),y:0,z:zr(-Ya,Ya)};while(this.players.some(g=>Ls(d,g.pos)<20));const m={id:es(),type:c,pos:d,rot:{x:0,y:0,z:0},hp:f.hp*(1+s.wave*.1),maxHp:f.hp,speed:f.speed*(1+s.wave*.05),state:Gt.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(m);const p=this.scene.createEnemyMesh(new ae(f.color),f.size,c);p.position.set(d.x,d.y,d.z),this.scene.enemyMeshes.set(m.id,p),this.scene.scene.add(p)}}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0;const i=Nv(t+1),s={x:zr(-30,30),y:5,z:-50},l={id:es(),type:Le.Boss,pos:s,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Gt.Phase1,targetId:0,attackTimer:2,phase:1};this.enemies.push(l);const c=this.scene.createBossMesh(new ae(i.color),i.size);c.position.set(s.x,s.y,s.z),this.scene.bossMeshes.set(l.id,c),this.scene.scene.add(c),Vi.playBossWarning(),Tn.getState().setGame({bossFight:!0,bossName:i.name})}updateBoss(t){const i=this.enemies.find(f=>f.type===Le.Boss);if(!i){Tn.getState().game.bossFight&&Tn.getState().setGame({bossFight:!1,bossName:""});return}const s=Nv(this.currentBossIndex+1),l=i.hp/i.maxHp;if(s.phases.forEach((f,d)=>{l<=f.hpPercent&&(i.phase||1)<=d&&(i.phase=d+1,i.speed=f.speed,i.state=["phase1","phase2","phase3","phase4"][d])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(p=>p.alive);if(!f)return;const d=s.phases[(i.phase||1)-1];switch(d.attackPattern){case"spread":for(let g=0;g<12;g++){const _=g/12*Math.PI*2,v={x:Math.cos(_),y:0,z:Math.sin(_)},S={id:es(),pos:{...i.pos},vel:je(v,10),damage:5,owner:i.id+1e4,type:fi.BossBullet,lifetime:4,radius:.3,color:"#ff4444"};this.projectiles.push(S);const M=this.scene.createProjectileMesh("#ff4444","bullet");M.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,M),this.scene.scene.add(M)}break;case"laser":case"finalBeam":{const g=Qe(Je(f.pos,i.pos)),_={id:es(),pos:{...i.pos},vel:je(g,30),damage:25,owner:i.id+1e4,type:fi.Laser,lifetime:2,radius:.5,color:"#ff0000"};this.projectiles.push(_);const v=this.scene.createProjectileMesh("#ff0000","beam");v.position.set(_.pos.x,_.pos.y,_.pos.z),v.scale.set(1,1,3),this.scene.projectileMeshes.set(_.id,v),this.scene.scene.add(v);break}case"missile":for(let g=0;g<5;g++){const _=Qe(Je(f.pos,i.pos)),v={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2},S={id:es(),pos:{...i.pos},vel:je(on(_,v),8),damage:10,owner:i.id+1e4,type:fi.Missile,lifetime:5,radius:.4,color:"#ffaa00"};this.projectiles.push(S);const M=this.scene.createProjectileMesh("#ffaa00","missile");M.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,M),this.scene.scene.add(M)}break;case"rush":i.speed=20;const p=Qe(Je(f.pos,i.pos));i.pos=on(i.pos,je(p,i.speed*t));break;case"spawn":if(d.minionSpawn)for(let g=0;g<3;g++){const _={id:es(),type:Le.Scout,pos:{x:i.pos.x+zr(-5,5),y:0,z:i.pos.z+zr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Gt.Chase,targetId:0,attackTimer:1};this.enemies.push(_);const v=this.scene.createEnemyMesh(new ae(4500223),1,"scout");v.position.set(_.pos.x,_.pos.y,_.pos.z),this.scene.enemyMeshes.set(_.id,v),this.scene.scene.add(v)}break}}const c=this.players.find(f=>f.alive);if(c&&i.phase&&i.phase>1){const f=Qe(Je(c.pos,i.pos));i.pos=on(i.pos,je(f,i.speed*t*.3))}}updateUI(t){var l,c;const i=Tn.getState(),s=i.game;if(s.gameMode==="pve")this.players.every(d=>!d.alive)&&!s.gameOver&&(i.setGame({gameOver:!0,screen:"result"}),this.stop());else if(s.gameMode==="pvp"){const f=!((l=this.players[0])!=null&&l.alive),d=!((c=this.players[1])!=null&&c.alive);(f||d)&&(f&&d?i.setGame({gameOver:!0,result:"draw",screen:"result"}):f?i.setGame({gameOver:!0,result:"p2win",screen:"result"}):i.setGame({gameOver:!0,result:"p1win",screen:"result"}),this.stop())}i.setPlayers(this.players),i.setGame({score:this.players.reduce((f,d)=>f+d.score,0),wave:Math.floor(this.waveTimer/ZS)+1}),this.waveTimer+=t}render(t){this.splitScreen,this.players.forEach((i,s)=>{this.scene.updateCamera(i.pos,t,!1,s>0,i.rot.y);const l=this.lockTargets[s],c=l!==null?this.enemies.find(f=>f.id===l&&f.hp>0):null;this.scene.updateLockIndicator(i.id,i.pos,c?c.pos:null)}),this.scene.render()}}const x2=({mode:r})=>{const t=Qc.useRef(null),i=Qc.useRef(null);return Qc.useEffect(()=>{const s=t.current;if(!s)return;s.width=window.innerWidth,s.height=window.innerHeight;const l=new v2(s);i.current=l;const c=()=>{s.width=window.innerWidth,s.height=window.innerHeight,l.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",c);const f=v=>{l.input.keyDown(v.key),v.key==="Escape"&&(document.pointerLockElement===s&&document.exitPointerLock(),Tn.getState().setGame({screen:"pause"})),["w","W","a","A","s","S","d","D","q","Q","e","E","r","R"," ","Tab","1","2","3","4"].includes(v.key)&&v.preventDefault()},d=v=>{l.input.keyUp(v.key),["w","W","a","A","s","S","d","D","q","Q","e","E","r","R"," ","Tab","1","2","3","4"].includes(v.key)&&v.preventDefault()},m=v=>{const S=s.getBoundingClientRect();l.input.mouseMove(v.clientX-S.left,v.clientY-S.top)},p=()=>{l.input.mouseDownFn(),document.pointerLockElement!==s&&s.requestPointerLock()},g=()=>l.input.mouseUpFn();window.addEventListener("keydown",f),window.addEventListener("keyup",d),s.addEventListener("mousemove",m),s.addEventListener("mousedown",p),s.addEventListener("mouseup",g);const _=v=>v.preventDefault();return s.addEventListener("contextmenu",_),l.start(r),()=>{l.stop(),window.removeEventListener("resize",c),window.removeEventListener("keydown",f),window.removeEventListener("keyup",d),s.removeEventListener("mousemove",m),s.removeEventListener("mousedown",p),s.removeEventListener("mouseup",g),s.removeEventListener("contextmenu",_)}},[r]),$.jsx("canvas",{ref:t,className:"absolute top-0 left-0 w-full h-full cursor-crosshair"})},zv={[Ti.FreeFire]:"FR",[Ti.LockShortRange]:"SR",[Ti.LockRequired]:"LCK"},y2=r=>$.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),S2=r=>$.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),M2=r=>$.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),E2=r=>$.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),cd=({children:r,className:t="",color:i="#00f0ff",noFrame:s=!1})=>$.jsxs("div",{className:`relative ${s?"":"pixel-border"} bg-black/70 ${t}`,children:[!s&&$.jsxs($.Fragment,{children:[y2(i),S2(i),M2(i),E2(i)]}),r]}),T2=({current:r,max:t})=>{const i=r/t*100,s=i>50?"#00f0ff":i>25?"#ff8800":"#ff2244",l=i>50?"pixel-border":i>25?"pixel-border-warning":"pixel-border-danger";return $.jsxs("div",{className:`relative ${l} bg-black/80`,style:{height:14},children:[$.jsx("div",{className:"pixel-bar-fill",style:{width:i+"%",background:s}}),[20,40,60,80].map(c=>$.jsx("div",{className:"pixel-bar-segment",style:{left:c+"%"}},c))]})},b2=({current:r,max:t})=>{const i=r/t*100;return $.jsx("div",{className:"relative pixel-border-dim bg-black/80",style:{height:10},children:$.jsx("div",{className:"pixel-bar-fill",style:{width:i+"%",background:"#ffcc00"}})})},A2=()=>{const{game:r,players:t}=Tn(),i=(s,l)=>{const c=ep(s.weapon),f=s.hp/s.maxHp*100,d=f>50?"#00f0ff":f>25?"#ff8800":"#ff2244";return $.jsx("div",{className:`absolute ${l===0?"bottom-3 left-3":"bottom-3 right-3"}`,children:$.jsxs(cd,{className:"px-3 py-2 min-w-[220px]",children:[$.jsxs("div",{className:"flex justify-between items-baseline mb-1",children:[$.jsxs("span",{className:"text-xs tracking-wider",style:{color:d},children:["P",l+1," • ARMOR"]}),$.jsxs("span",{className:"text-xs",style:{color:d},children:[Math.ceil(s.hp),"/",s.maxHp]})]}),$.jsx(T2,{current:s.hp,max:s.maxHp}),$.jsxs("div",{className:"flex justify-between items-baseline mt-1.5 mb-0.5",children:[$.jsx("span",{className:"text-[10px] text-yellow-400 tracking-wider",children:"SP GAUGE"}),$.jsxs("span",{className:"text-[10px] text-yellow-400/80",children:[Math.ceil(s.specialGauge),"%"]})]}),$.jsx(b2,{current:s.specialGauge,max:s.maxSpecialGauge}),$.jsxs("div",{className:"flex items-center gap-2 mt-1.5",children:[$.jsx("span",{className:"text-[10px] text-white/40",children:"WPN"}),$.jsx("span",{className:"text-xs text-neon-cyan pixel-text-glow",children:c.name}),$.jsxs("span",{className:"text-[10px] text-white/30",children:["DMG:",c.damage]}),$.jsxs("span",{className:`text-[10px] ${zv[c.fireMode]==="LCK"?"text-mecha-danger":"text-neon-cyan"}`,children:["[",zv[c.fireMode],"]"]})]}),r.gameMode==="pve"&&$.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[$.jsx("span",{className:"text-[10px] text-white/40",children:"SCORE"}),$.jsx("span",{className:"text-xs text-white",children:s.score}),s.combo>1&&$.jsxs("span",{className:"text-xs text-mecha-warning pixel-text-glow",children:["x",s.combo]})]})]})},s.id)};return $.jsxs($.Fragment,{children:[$.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2 z-10",children:$.jsx(cd,{className:"px-4 py-1.5",children:$.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[$.jsx("span",{className:"text-neon-cyan tracking-widest",children:r.gameMode==="pve"?"[PVE MODE]":"[PVP MATCH]"}),r.gameMode==="pve"&&$.jsxs("span",{className:"text-white/50",children:["WAVE ",r.wave]}),r.bossFight&&$.jsxs("span",{className:"text-mecha-danger pixel-text-glow-red",children:["BOSS: ",r.bossName]})]})})}),t.map((s,l)=>i(s,l)),$.jsx("div",{className:"absolute top-3 right-3 z-10",children:$.jsx(cd,{className:"px-2 py-1.5",noFrame:!0,children:$.jsxs("div",{className:"text-[9px] text-white/25 leading-relaxed text-right tracking-wider",children:[$.jsx("div",{children:"WASD MOVE"}),$.jsx("div",{children:"MOUSE AIM/SHOOT"}),$.jsx("div",{children:"1-3 SWITCH WPN"}),$.jsx("div",{children:"TAB LOCK TARGET"}),$.jsx("div",{children:"R SPECIAL"}),$.jsx("div",{children:"ESC PAUSE"})]})})})]})},w2=r=>$.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),R2=r=>$.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),C2=r=>$.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),D2=r=>$.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),U2=()=>{const{game:r,setGame:t}=Tn();return $.jsxs("div",{className:"absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50",children:[$.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),$.jsxs("div",{className:"relative px-8 py-6 pixel-border bg-black/80",children:[w2("#00f0ff"),R2("#00f0ff"),C2("#00f0ff"),D2("#00f0ff"),$.jsx("h2",{className:"font-pixel-title text-xl text-neon-cyan mb-8 pixel-text-glow text-center tracking-wider",children:"PAUSED"}),$.jsxs("div",{className:"space-y-3 w-64",children:[$.jsx("button",{onClick:()=>t({screen:r.gameMode,paused:!1}),className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"CONTINUE"}),$.jsx("button",{onClick:()=>{Tn.getState().resetGame(),t({screen:"menu"})},className:"pixel-btn-danger w-full py-2 text-base tracking-[0.15em]",children:"QUIT"})]})]})]})},Bv=r=>$.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),Iv=r=>$.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),Fv=r=>$.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),Hv=r=>$.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:$.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),L2=()=>{const{game:r,players:t}=Tn(),i=Tn(f=>f.setGame),s=()=>{if(r.gameMode==="pvp")switch(r.result){case"p1win":return"P1 WIN";case"p2win":return"P2 WIN";case"draw":return"DRAW"}return"GAME OVER"},c=r.gameMode==="pvp"?r.result==="p1win"?"#00f0ff":r.result==="p2win"?"#ff6644":"#ffcc00":"#ff2244";return $.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-dark-bg",children:[$.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),$.jsxs("div",{className:"relative px-8 py-6 pixel-border bg-black/80 mb-8",children:[Bv(c),Iv(c),Fv(c),Hv(c),$.jsx("h1",{className:"font-pixel-title text-xl tracking-wider pixel-text-glow",style:{color:c},children:s()})]}),$.jsxs("div",{className:"relative px-5 py-4 pixel-border-dim bg-black/60 w-80 mb-8",children:[Bv("#00f0ff"),Iv("#00f0ff"),Fv("#00f0ff"),Hv("#00f0ff"),$.jsx("h3",{className:"font-pixel text-sm text-white/40 mb-3 tracking-wider",children:"BATTLE STATS"}),t.map((f,d)=>$.jsxs("div",{className:"flex justify-between font-pixel text-sm mb-1.5 tracking-wider",children:[$.jsxs("span",{className:"text-white/60",children:["P",d+1]}),$.jsxs("span",{className:"text-white",children:["KILLS:",f.kills," SCORE:",f.score]})]},f.id)),r.gameMode==="pve"&&$.jsxs("div",{className:"flex justify-between font-pixel text-sm mt-2 pt-2 tracking-wider",style:{borderTop:"1px solid rgba(0,240,255,0.2)"},children:[$.jsx("span",{className:"text-white/40",children:"WAVE"}),$.jsx("span",{className:"text-white font-bold",children:r.wave})]})]}),$.jsxs("div",{className:"space-y-3 w-64",children:[$.jsx("button",{onClick:()=>{Tn.getState().resetGame(),i({screen:"modeSelect"})},className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"PLAY AGAIN"}),$.jsx("button",{onClick:()=>{Tn.getState().resetGame(),i({screen:"menu"})},className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"MAIN MENU"})]})]})},N2=()=>{const r=Tn(i=>i.game),t=()=>{switch(r.screen){case"menu":return $.jsx(m_,{});case"modeSelect":return $.jsx(sM,{});case"pve":case"pvp":return $.jsxs("div",{className:"w-full h-full relative",children:[$.jsx(x2,{mode:r.gameMode}),$.jsx(A2,{})]});case"pause":return $.jsxs("div",{className:"w-full h-full relative",children:[$.jsx("div",{className:"w-full h-full bg-black/30"}),$.jsx(U2,{})]});case"result":return $.jsx(L2,{});default:return $.jsx(m_,{})}};return $.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};VS.createRoot(document.getElementById("root")).render($.jsx(Jo.StrictMode,{children:$.jsx(N2,{})}));
