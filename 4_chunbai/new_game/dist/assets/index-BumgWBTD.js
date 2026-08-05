var ZM=Object.defineProperty;var KM=(r,t,n)=>t in r?ZM(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var Pt=(r,t,n)=>KM(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function $x(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Dh={exports:{}},Zo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uv;function QM(){if(uv)return Zo;uv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Zo.Fragment=t,Zo.jsx=n,Zo.jsxs=n,Zo}var fv;function JM(){return fv||(fv=1,Dh.exports=QM()),Dh.exports}var ft=JM(),Lh={exports:{}},re={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hv;function $M(){if(hv)return re;hv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),x=Symbol.iterator;function S(P){return P===null||typeof P!="object"?null:(P=x&&P[x]||P["@@iterator"],typeof P=="function"?P:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,E={};function _(P,it,St){this.props=P,this.context=it,this.refs=E,this.updater=St||y}_.prototype.isReactComponent={},_.prototype.setState=function(P,it){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,it,"setState")},_.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function U(){}U.prototype=_.prototype;function L(P,it,St){this.props=P,this.context=it,this.refs=E,this.updater=St||y}var A=L.prototype=new U;A.constructor=L,T(A,_.prototype),A.isPureReactComponent=!0;var k=Array.isArray;function z(){}var O={H:null,A:null,T:null,S:null},F=Object.prototype.hasOwnProperty;function D(P,it,St){var Z=St.ref;return{$$typeof:r,type:P,key:it,ref:Z!==void 0?Z:null,props:St}}function R(P,it){return D(P.type,it,P.props)}function H(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function et(P){var it={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(St){return it[St]})}var st=/\/+/g;function ht(P,it){return typeof P=="object"&&P!==null&&P.key!=null?et(""+P.key):it.toString(36)}function mt(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(z,z):(P.status="pending",P.then(function(it){P.status==="pending"&&(P.status="fulfilled",P.value=it)},function(it){P.status==="pending"&&(P.status="rejected",P.reason=it)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function B(P,it,St,Z,ct){var Et=typeof P;(Et==="undefined"||Et==="boolean")&&(P=null);var _t=!1;if(P===null)_t=!0;else switch(Et){case"bigint":case"string":case"number":_t=!0;break;case"object":switch(P.$$typeof){case r:case t:_t=!0;break;case v:return _t=P._init,B(_t(P._payload),it,St,Z,ct)}}if(_t)return ct=ct(P),_t=Z===""?"."+ht(P,0):Z,k(ct)?(St="",_t!=null&&(St=_t.replace(st,"$&/")+"/"),B(ct,it,St,"",function(oe){return oe})):ct!=null&&(H(ct)&&(ct=R(ct,St+(ct.key==null||P&&P.key===ct.key?"":(""+ct.key).replace(st,"$&/")+"/")+_t)),it.push(ct)),1;_t=0;var Gt=Z===""?".":Z+":";if(k(P))for(var Ht=0;Ht<P.length;Ht++)Z=P[Ht],Et=Gt+ht(Z,Ht),_t+=B(Z,it,St,Et,ct);else if(Ht=S(P),typeof Ht=="function")for(P=Ht.call(P),Ht=0;!(Z=P.next()).done;)Z=Z.value,Et=Gt+ht(Z,Ht++),_t+=B(Z,it,St,Et,ct);else if(Et==="object"){if(typeof P.then=="function")return B(mt(P),it,St,Z,ct);throw it=String(P),Error("Objects are not valid as a React child (found: "+(it==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":it)+"). If you meant to render a collection of children, use an array instead.")}return _t}function Q(P,it,St){if(P==null)return P;var Z=[],ct=0;return B(P,Z,"","",function(Et){return it.call(St,Et,ct++)}),Z}function K(P){if(P._status===-1){var it=P._result;it=it(),it.then(function(St){(P._status===0||P._status===-1)&&(P._status=1,P._result=St)},function(St){(P._status===0||P._status===-1)&&(P._status=2,P._result=St)}),P._status===-1&&(P._status=0,P._result=it)}if(P._status===1)return P._result.default;throw P._result}var Mt=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var it=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(it))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Tt={map:Q,forEach:function(P,it,St){Q(P,function(){it.apply(this,arguments)},St)},count:function(P){var it=0;return Q(P,function(){it++}),it},toArray:function(P){return Q(P,function(it){return it})||[]},only:function(P){if(!H(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return re.Activity=g,re.Children=Tt,re.Component=_,re.Fragment=n,re.Profiler=l,re.PureComponent=L,re.StrictMode=s,re.Suspense=m,re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,re.__COMPILER_RUNTIME={__proto__:null,c:function(P){return O.H.useMemoCache(P)}},re.cache=function(P){return function(){return P.apply(null,arguments)}},re.cacheSignal=function(){return null},re.cloneElement=function(P,it,St){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Z=T({},P.props),ct=P.key;if(it!=null)for(Et in it.key!==void 0&&(ct=""+it.key),it)!F.call(it,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&it.ref===void 0||(Z[Et]=it[Et]);var Et=arguments.length-2;if(Et===1)Z.children=St;else if(1<Et){for(var _t=Array(Et),Gt=0;Gt<Et;Gt++)_t[Gt]=arguments[Gt+2];Z.children=_t}return D(P.type,ct,Z)},re.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},re.createElement=function(P,it,St){var Z,ct={},Et=null;if(it!=null)for(Z in it.key!==void 0&&(Et=""+it.key),it)F.call(it,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ct[Z]=it[Z]);var _t=arguments.length-2;if(_t===1)ct.children=St;else if(1<_t){for(var Gt=Array(_t),Ht=0;Ht<_t;Ht++)Gt[Ht]=arguments[Ht+2];ct.children=Gt}if(P&&P.defaultProps)for(Z in _t=P.defaultProps,_t)ct[Z]===void 0&&(ct[Z]=_t[Z]);return D(P,Et,ct)},re.createRef=function(){return{current:null}},re.forwardRef=function(P){return{$$typeof:d,render:P}},re.isValidElement=H,re.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:K}},re.memo=function(P,it){return{$$typeof:p,type:P,compare:it===void 0?null:it}},re.startTransition=function(P){var it=O.T,St={};O.T=St;try{var Z=P(),ct=O.S;ct!==null&&ct(St,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(z,Mt)}catch(Et){Mt(Et)}finally{it!==null&&St.types!==null&&(it.types=St.types),O.T=it}},re.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},re.use=function(P){return O.H.use(P)},re.useActionState=function(P,it,St){return O.H.useActionState(P,it,St)},re.useCallback=function(P,it){return O.H.useCallback(P,it)},re.useContext=function(P){return O.H.useContext(P)},re.useDebugValue=function(){},re.useDeferredValue=function(P,it){return O.H.useDeferredValue(P,it)},re.useEffect=function(P,it){return O.H.useEffect(P,it)},re.useEffectEvent=function(P){return O.H.useEffectEvent(P)},re.useId=function(){return O.H.useId()},re.useImperativeHandle=function(P,it,St){return O.H.useImperativeHandle(P,it,St)},re.useInsertionEffect=function(P,it){return O.H.useInsertionEffect(P,it)},re.useLayoutEffect=function(P,it){return O.H.useLayoutEffect(P,it)},re.useMemo=function(P,it){return O.H.useMemo(P,it)},re.useOptimistic=function(P,it){return O.H.useOptimistic(P,it)},re.useReducer=function(P,it,St){return O.H.useReducer(P,it,St)},re.useRef=function(P){return O.H.useRef(P)},re.useState=function(P){return O.H.useState(P)},re.useSyncExternalStore=function(P,it,St){return O.H.useSyncExternalStore(P,it,St)},re.useTransition=function(){return O.H.useTransition()},re.version="19.2.8",re}var dv;function dp(){return dv||(dv=1,Lh.exports=$M()),Lh.exports}var iu=dp();const al=$x(iu);var Uh={exports:{}},Ko={},Nh={exports:{}},Oh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pv;function ty(){return pv||(pv=1,(function(r){function t(B,Q){var K=B.length;B.push(Q);t:for(;0<K;){var Mt=K-1>>>1,Tt=B[Mt];if(0<l(Tt,Q))B[Mt]=Q,B[K]=Tt,K=Mt;else break t}}function n(B){return B.length===0?null:B[0]}function s(B){if(B.length===0)return null;var Q=B[0],K=B.pop();if(K!==Q){B[0]=K;t:for(var Mt=0,Tt=B.length,P=Tt>>>1;Mt<P;){var it=2*(Mt+1)-1,St=B[it],Z=it+1,ct=B[Z];if(0>l(St,K))Z<Tt&&0>l(ct,St)?(B[Mt]=ct,B[Z]=K,Mt=Z):(B[Mt]=St,B[it]=K,Mt=it);else if(Z<Tt&&0>l(ct,K))B[Mt]=ct,B[Z]=K,Mt=Z;else break t}}return Q}function l(B,Q){var K=B.sortIndex-Q.sortIndex;return K!==0?K:B.id-Q.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();r.unstable_now=function(){return f.now()-d}}var m=[],p=[],v=1,g=null,x=3,S=!1,y=!1,T=!1,E=!1,_=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function A(B){for(var Q=n(p);Q!==null;){if(Q.callback===null)s(p);else if(Q.startTime<=B)s(p),Q.sortIndex=Q.expirationTime,t(m,Q);else break;Q=n(p)}}function k(B){if(T=!1,A(B),!y)if(n(m)!==null)y=!0,z||(z=!0,et());else{var Q=n(p);Q!==null&&mt(k,Q.startTime-B)}}var z=!1,O=-1,F=5,D=-1;function R(){return E?!0:!(r.unstable_now()-D<F)}function H(){if(E=!1,z){var B=r.unstable_now();D=B;var Q=!0;try{t:{y=!1,T&&(T=!1,U(O),O=-1),S=!0;var K=x;try{e:{for(A(B),g=n(m);g!==null&&!(g.expirationTime>B&&R());){var Mt=g.callback;if(typeof Mt=="function"){g.callback=null,x=g.priorityLevel;var Tt=Mt(g.expirationTime<=B);if(B=r.unstable_now(),typeof Tt=="function"){g.callback=Tt,A(B),Q=!0;break e}g===n(m)&&s(m),A(B)}else s(m);g=n(m)}if(g!==null)Q=!0;else{var P=n(p);P!==null&&mt(k,P.startTime-B),Q=!1}}break t}finally{g=null,x=K,S=!1}Q=void 0}}finally{Q?et():z=!1}}}var et;if(typeof L=="function")et=function(){L(H)};else if(typeof MessageChannel<"u"){var st=new MessageChannel,ht=st.port2;st.port1.onmessage=H,et=function(){ht.postMessage(null)}}else et=function(){_(H,0)};function mt(B,Q){O=_(function(){B(r.unstable_now())},Q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(B){switch(x){case 1:case 2:case 3:var Q=3;break;default:Q=x}var K=x;x=Q;try{return B()}finally{x=K}},r.unstable_requestPaint=function(){E=!0},r.unstable_runWithPriority=function(B,Q){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var K=x;x=B;try{return Q()}finally{x=K}},r.unstable_scheduleCallback=function(B,Q,K){var Mt=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?Mt+K:Mt):K=Mt,B){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=K+Tt,B={id:v++,callback:Q,priorityLevel:B,startTime:K,expirationTime:Tt,sortIndex:-1},K>Mt?(B.sortIndex=K,t(p,B),n(m)===null&&B===n(p)&&(T?(U(O),O=-1):T=!0,mt(k,K-Mt))):(B.sortIndex=Tt,t(m,B),y||S||(y=!0,z||(z=!0,et()))),B},r.unstable_shouldYield=R,r.unstable_wrapCallback=function(B){var Q=x;return function(){var K=x;x=Q;try{return B.apply(this,arguments)}finally{x=K}}}})(Oh)),Oh}var mv;function ey(){return mv||(mv=1,Nh.exports=ty()),Nh.exports}var Ph={exports:{}},Hn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gv;function ny(){if(gv)return Hn;gv=1;var r=dp();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var s={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,v){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:g==null?null:""+g,children:m,containerInfo:p,implementation:v}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Hn.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,v)},Hn.flushSync=function(m){var p=f.T,v=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=v,s.d.f()}},Hn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Hn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Hn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,g=d(v,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:g,integrity:x,fetchPriority:S}):v==="script"&&s.d.X(m,{crossOrigin:g,integrity:x,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Hn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Hn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,g=d(v,p.crossOrigin);s.d.L(m,v,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Hn.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Hn.requestFormReset=function(m){s.d.r(m)},Hn.unstable_batchedUpdates=function(m,p){return m(p)},Hn.useFormState=function(m,p,v){return f.H.useFormState(m,p,v)},Hn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Hn.version="19.2.8",Hn}var vv;function iy(){if(vv)return Ph.exports;vv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ph.exports=ny(),Ph.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xv;function ay(){if(xv)return Ko;xv=1;var r=ey(),t=dp(),n=iy();function s(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,a=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(a=i.return),e=i.return;while(e)}return i.tag===3?a:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(s(188));return i!==e?null:e}for(var a=e,o=i;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),e;if(h===o)return m(u),i;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var M=!1,b=u.child;b;){if(b===a){M=!0,a=u,o=h;break}if(b===o){M=!0,o=u,a=h;break}b=b.sibling}if(!M){for(b=h.child;b;){if(b===a){M=!0,a=h,o=u;break}if(b===o){M=!0,o=h,a=u;break}b=b.sibling}if(!M)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:i}function v(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=v(e),i!==null)return i;e=e.sibling}return null}var g=Object.assign,x=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),y=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),U=Symbol.for("react.consumer"),L=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),z=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),F=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),R=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function et(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var st=Symbol.for("react.client.reference");function ht(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===st?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case _:return"Profiler";case E:return"StrictMode";case k:return"Suspense";case z:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case y:return"Portal";case L:return e.displayName||"Context";case U:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return i=e.displayName||null,i!==null?i:ht(e.type)||"Memo";case F:i=e._payload,e=e._init;try{return ht(e(i))}catch{}}return null}var mt=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},Mt=[],Tt=-1;function P(e){return{current:e}}function it(e){0>Tt||(e.current=Mt[Tt],Mt[Tt]=null,Tt--)}function St(e,i){Tt++,Mt[Tt]=e.current,e.current=i}var Z=P(null),ct=P(null),Et=P(null),_t=P(null);function Gt(e,i){switch(St(Et,i),St(ct,e),St(Z,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Ng(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Ng(i),e=Og(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}it(Z),St(Z,e)}function Ht(){it(Z),it(ct),it(Et)}function oe(e){e.memoizedState!==null&&St(_t,e);var i=Z.current,a=Og(i,e.type);i!==a&&(St(ct,e),St(Z,a))}function Ge(e){ct.current===e&&(it(Z),it(ct)),_t.current===e&&(it(_t),Wo._currentValue=K)}var ge,$e;function j(e){if(ge===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);ge=i&&i[1]||"",$e=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ge+e+$e}var Bn=!1;function me(e,i){if(!e||Bn)return"";Bn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var vt=function(){throw Error()};if(Object.defineProperty(vt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(vt,[])}catch(ot){var tt=ot}Reflect.construct(e,[],vt)}else{try{vt.call()}catch(ot){tt=ot}e.call(vt.prototype)}}else{try{throw Error()}catch(ot){tt=ot}(vt=e())&&typeof vt.catch=="function"&&vt.catch(function(){})}}catch(ot){if(ot&&tt&&typeof ot.stack=="string")return[ot.stack,tt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),M=h[0],b=h[1];if(M&&b){var I=M.split(`
`),$=b.split(`
`);for(u=o=0;o<I.length&&!I[o].includes("DetermineComponentFrameRoot");)o++;for(;u<$.length&&!$[u].includes("DetermineComponentFrameRoot");)u++;if(o===I.length||u===$.length)for(o=I.length-1,u=$.length-1;1<=o&&0<=u&&I[o]!==$[u];)u--;for(;1<=o&&0<=u;o--,u--)if(I[o]!==$[u]){if(o!==1||u!==1)do if(o--,u--,0>u||I[o]!==$[u]){var ut=`
`+I[o].replace(" at new "," at ");return e.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",e.displayName)),ut}while(1<=o&&0<=u);break}}}finally{Bn=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?j(a):""}function _e(e,i){switch(e.tag){case 26:case 27:case 5:return j(e.type);case 16:return j("Lazy");case 13:return e.child!==i&&i!==null?j("Suspense Fallback"):j("Suspense");case 19:return j("SuspenseList");case 0:case 15:return me(e.type,!1);case 11:return me(e.type.render,!1);case 1:return me(e.type,!0);case 31:return j("Activity");default:return""}}function Qt(e){try{var i="",a=null;do i+=_e(e,a),a=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ze=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,N=r.unstable_cancelCallback,w=r.unstable_shouldYield,nt=r.unstable_requestPaint,dt=r.unstable_now,yt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,qt=r.unstable_UserBlockingPriority,Lt=r.unstable_NormalPriority,zt=r.unstable_LowPriority,Se=r.unstable_IdlePriority,At=r.log,Bt=r.unstable_setDisableYieldValue,Kt=null,jt=null;function Ot(e){if(typeof At=="function"&&Bt(e),jt&&typeof jt.setStrictMode=="function")try{jt.setStrictMode(Kt,e)}catch{}}var ie=Math.clz32?Math.clz32:X,ce=Math.log,Ve=Math.LN2;function X(e){return e>>>=0,e===0?32:31-(ce(e)/Ve|0)|0}var wt=256,lt=262144,xt=4194304;function Rt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ut(e,i,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,M=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~h,o!==0?u=Rt(o):(M&=b,M!==0?u=Rt(M):a||(a=b&~e,a!==0&&(u=Rt(a))))):(b=o&~h,b!==0?u=Rt(b):M!==0?u=Rt(M):a||(a=o&~e,a!==0&&(u=Rt(a)))),u===0?0:i!==0&&i!==u&&(i&h)===0&&(h=u&-u,a=i&-i,h>=a||h===32&&(a&4194048)!==0)?i:u}function ae(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function tn(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vn(){var e=xt;return xt<<=1,(xt&62914560)===0&&(xt=4194304),e}function Ce(e){for(var i=[],a=0;31>a;a++)i.push(e);return i}function Cn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Li(e,i,a,o,u,h){var M=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,I=e.expirationTimes,$=e.hiddenUpdates;for(a=M&~a;0<a;){var ut=31-ie(a),vt=1<<ut;b[ut]=0,I[ut]=-1;var tt=$[ut];if(tt!==null)for($[ut]=null,ut=0;ut<tt.length;ut++){var ot=tt[ut];ot!==null&&(ot.lane&=-536870913)}a&=~vt}o!==0&&io(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(M&~i))}function io(e,i,a){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-ie(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function ao(e,i){var a=e.entangledLanes|=i;for(e=e.entanglements;a;){var o=31-ie(a),u=1<<o;u&i|e[o]&i&&(e[o]|=i),a&=~u}}function ki(e,i){var a=i&-i;return a=(a&42)!==0?1:fs(a),(a&(e.suspendedLanes|i))!==0?0:a}function fs(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function qs(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function so(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:iv(e.type))}function hs(e,i){var a=Q.p;try{return Q.p=e,i()}finally{Q.p=a}}var Ui=Math.random().toString(36).slice(2),rn="__reactFiber$"+Ui,Dn="__reactProps$"+Ui,Ji="__reactContainer$"+Ui,ro="__reactEvents$"+Ui,Eu="__reactListeners$"+Ui,Tu="__reactHandles$"+Ui,C="__reactResources$"+Ui,W="__reactMarker$"+Ui;function rt(e){delete e[rn],delete e[Dn],delete e[ro],delete e[Eu],delete e[Tu]}function at(e){var i=e[rn];if(i)return i;for(var a=e.parentNode;a;){if(i=a[Ji]||a[rn]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(e=Gg(e);e!==null;){if(a=e[rn])return a;e=Gg(e)}return i}e=a,a=e.parentNode}return null}function q(e){if(e=e[rn]||e[Ji]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(s(33))}function Ct(e){var i=e[C];return i||(i=e[C]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Dt(e){e[W]=!0}var kt=new Set,se={};function ee(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(se[e]=i,e=0;e<i.length;e++)kt.add(i[e])}var we=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Be={},ke={};function In(e){return ze.call(ke,e)?!0:ze.call(Be,e)?!1:we.test(e)?ke[e]=!0:(Be[e]=!0,!1)}function Te(e,i,a){if(In(i))if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+a)}}function Xt(e,i,a){if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+a)}}function xn(e,i,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(i,a,""+o)}}function le(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function jn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Da(e,i,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(M){a=""+M,h.call(this,M)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(M){a=""+M},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Ln(e){if(!e._valueTracker){var i=jn(e)?"checked":"value";e._valueTracker=Da(e,i,""+e[i])}}function La(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var a=i.getValue(),o="";return e&&(o=jn(e)?e.checked?"true":"false":e.value),e=o,e!==a?(i.setValue(e),!0):!1}function Pe(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var gi=/[\n"\\]/g;function yn(e){return e.replace(gi,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Fn(e,i,a,o,u,h,M,b){e.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.type=M:e.removeAttribute("type"),i!=null?M==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+le(i)):e.value!==""+le(i)&&(e.value=""+le(i)):M!=="submit"&&M!=="reset"||e.removeAttribute("value"),i!=null?vi(e,M,le(i)):a!=null?vi(e,M,le(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+le(b):e.removeAttribute("name")}function Ni(e,i,a,o,u,h,M,b){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),i!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){Ln(e);return}a=a!=null?""+le(a):"",i=i!=null?""+le(i):a,b||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(e.name=M),Ln(e)}function vi(e,i,a){i==="number"&&Pe(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function $i(e,i,a,o){if(e=e.options,i){i={};for(var u=0;u<a.length;u++)i["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=i.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+le(a),i=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function Rp(e,i,a){if(i!=null&&(i=""+le(i),i!==e.value&&(e.value=i),a==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=a!=null?""+le(a):""}function Cp(e,i,a,o){if(i==null){if(o!=null){if(a!=null)throw Error(s(92));if(mt(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),i=a}a=le(i),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Ln(e)}function js(e,i){if(i){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=i;return}}e.textContent=i}var X_=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Dp(e,i,a){var o=i.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,a):typeof a!="number"||a===0||X_.has(i)?i==="float"?e.cssFloat=a:e[i]=(""+a).trim():e[i]=a+"px"}function Lp(e,i,a){if(i!=null&&typeof i!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&a[u]!==o&&Dp(e,u,o)}else for(var h in i)i.hasOwnProperty(h)&&Dp(e,h,i[h])}function bu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var W_=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),q_=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function dl(e){return q_.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ta(){}var Au=null;function wu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ys=null,Zs=null;function Up(e){var i=q(e);if(i&&(e=i.stateNode)){var a=e[Dn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Fn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),i=a.name,a.type==="radio"&&i!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+yn(""+i)+'"][type="radio"]'),i=0;i<a.length;i++){var o=a[i];if(o!==e&&o.form===e.form){var u=o[Dn]||null;if(!u)throw Error(s(90));Fn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<a.length;i++)o=a[i],o.form===e.form&&La(o)}break t;case"textarea":Rp(e,a.value,a.defaultValue);break t;case"select":i=a.value,i!=null&&$i(e,!!a.multiple,i,!1)}}}var Ru=!1;function Np(e,i,a){if(Ru)return e(i,a);Ru=!0;try{var o=e(i);return o}finally{if(Ru=!1,(Ys!==null||Zs!==null)&&(tc(),Ys&&(i=Ys,e=Zs,Zs=Ys=null,Up(i),e)))for(i=0;i<e.length;i++)Up(e[i])}}function oo(e,i){var a=e.stateNode;if(a===null)return null;var o=a[Dn]||null;if(o===null)return null;a=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,i,typeof a));return a}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Cu=!1;if(ea)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){Cu=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{Cu=!1}var Ua=null,Du=null,pl=null;function Op(){if(pl)return pl;var e,i=Du,a=i.length,o,u="value"in Ua?Ua.value:Ua.textContent,h=u.length;for(e=0;e<a&&i[e]===u[e];e++);var M=a-e;for(o=1;o<=M&&i[a-o]===u[h-o];o++);return pl=u.slice(e,1<o?1-o:void 0)}function ml(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function gl(){return!0}function Pp(){return!1}function Yn(e){function i(a,o,u,h,M){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=M,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(h):h[b]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?gl:Pp,this.isPropagationStopped=Pp,this}return g(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=gl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=gl)},persist:function(){},isPersistent:gl}),i}var ds={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vl=Yn(ds),co=g({},ds,{view:0,detail:0}),j_=Yn(co),Lu,Uu,uo,xl=g({},co,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ou,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==uo&&(uo&&e.type==="mousemove"?(Lu=e.screenX-uo.screenX,Uu=e.screenY-uo.screenY):Uu=Lu=0,uo=e),Lu)},movementY:function(e){return"movementY"in e?e.movementY:Uu}}),zp=Yn(xl),Y_=g({},xl,{dataTransfer:0}),Z_=Yn(Y_),K_=g({},co,{relatedTarget:0}),Nu=Yn(K_),Q_=g({},ds,{animationName:0,elapsedTime:0,pseudoElement:0}),J_=Yn(Q_),$_=g({},ds,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),tS=Yn($_),eS=g({},ds,{data:0}),Bp=Yn(eS),nS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},iS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},aS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sS(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=aS[e])?!!i[e]:!1}function Ou(){return sS}var rS=g({},co,{key:function(e){if(e.key){var i=nS[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=ml(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?iS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ou,charCode:function(e){return e.type==="keypress"?ml(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ml(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),oS=Yn(rS),lS=g({},xl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ip=Yn(lS),cS=g({},co,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ou}),uS=Yn(cS),fS=g({},ds,{propertyName:0,elapsedTime:0,pseudoElement:0}),hS=Yn(fS),dS=g({},xl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pS=Yn(dS),mS=g({},ds,{newState:0,oldState:0}),gS=Yn(mS),vS=[9,13,27,32],Pu=ea&&"CompositionEvent"in window,fo=null;ea&&"documentMode"in document&&(fo=document.documentMode);var xS=ea&&"TextEvent"in window&&!fo,Fp=ea&&(!Pu||fo&&8<fo&&11>=fo),Hp=" ",Gp=!1;function Vp(e,i){switch(e){case"keyup":return vS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function kp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ks=!1;function _S(e,i){switch(e){case"compositionend":return kp(i);case"keypress":return i.which!==32?null:(Gp=!0,Hp);case"textInput":return e=i.data,e===Hp&&Gp?null:e;default:return null}}function SS(e,i){if(Ks)return e==="compositionend"||!Pu&&Vp(e,i)?(e=Op(),pl=Du=Ua=null,Ks=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Fp&&i.locale!=="ko"?null:i.data;default:return null}}var MS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Xp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!MS[e.type]:i==="textarea"}function Wp(e,i,a,o){Ys?Zs?Zs.push(o):Zs=[o]:Ys=o,i=oc(i,"onChange"),0<i.length&&(a=new vl("onChange","change",null,a,o),e.push({event:a,listeners:i}))}var ho=null,po=null;function yS(e){wg(e,0)}function _l(e){var i=bt(e);if(La(i))return e}function qp(e,i){if(e==="change")return i}var jp=!1;if(ea){var zu;if(ea){var Bu="oninput"in document;if(!Bu){var Yp=document.createElement("div");Yp.setAttribute("oninput","return;"),Bu=typeof Yp.oninput=="function"}zu=Bu}else zu=!1;jp=zu&&(!document.documentMode||9<document.documentMode)}function Zp(){ho&&(ho.detachEvent("onpropertychange",Kp),po=ho=null)}function Kp(e){if(e.propertyName==="value"&&_l(po)){var i=[];Wp(i,po,e,wu(e)),Np(yS,i)}}function ES(e,i,a){e==="focusin"?(Zp(),ho=i,po=a,ho.attachEvent("onpropertychange",Kp)):e==="focusout"&&Zp()}function TS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return _l(po)}function bS(e,i){if(e==="click")return _l(i)}function AS(e,i){if(e==="input"||e==="change")return _l(i)}function wS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ii=typeof Object.is=="function"?Object.is:wS;function mo(e,i){if(ii(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var a=Object.keys(e),o=Object.keys(i);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!ze.call(i,u)||!ii(e[u],i[u]))return!1}return!0}function Qp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jp(e,i){var a=Qp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=i&&o>=i)return{node:a,offset:i-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Qp(a)}}function $p(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?$p(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function tm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Pe(e.document);i instanceof e.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)e=i.contentWindow;else break;i=Pe(e.document)}return i}function Iu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var RS=ea&&"documentMode"in document&&11>=document.documentMode,Qs=null,Fu=null,go=null,Hu=!1;function em(e,i,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Hu||Qs==null||Qs!==Pe(o)||(o=Qs,"selectionStart"in o&&Iu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),go&&mo(go,o)||(go=o,o=oc(Fu,"onSelect"),0<o.length&&(i=new vl("onSelect","select",null,i,a),e.push({event:i,listeners:o}),i.target=Qs)))}function ps(e,i){var a={};return a[e.toLowerCase()]=i.toLowerCase(),a["Webkit"+e]="webkit"+i,a["Moz"+e]="moz"+i,a}var Js={animationend:ps("Animation","AnimationEnd"),animationiteration:ps("Animation","AnimationIteration"),animationstart:ps("Animation","AnimationStart"),transitionrun:ps("Transition","TransitionRun"),transitionstart:ps("Transition","TransitionStart"),transitioncancel:ps("Transition","TransitionCancel"),transitionend:ps("Transition","TransitionEnd")},Gu={},nm={};ea&&(nm=document.createElement("div").style,"AnimationEvent"in window||(delete Js.animationend.animation,delete Js.animationiteration.animation,delete Js.animationstart.animation),"TransitionEvent"in window||delete Js.transitionend.transition);function ms(e){if(Gu[e])return Gu[e];if(!Js[e])return e;var i=Js[e],a;for(a in i)if(i.hasOwnProperty(a)&&a in nm)return Gu[e]=i[a];return e}var im=ms("animationend"),am=ms("animationiteration"),sm=ms("animationstart"),CS=ms("transitionrun"),DS=ms("transitionstart"),LS=ms("transitioncancel"),rm=ms("transitionend"),om=new Map,Vu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Vu.push("scrollEnd");function Oi(e,i){om.set(e,i),ee(i,[e])}var Sl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},xi=[],$s=0,ku=0;function Ml(){for(var e=$s,i=ku=$s=0;i<e;){var a=xi[i];xi[i++]=null;var o=xi[i];xi[i++]=null;var u=xi[i];xi[i++]=null;var h=xi[i];if(xi[i++]=null,o!==null&&u!==null){var M=o.pending;M===null?u.next=u:(u.next=M.next,M.next=u),o.pending=u}h!==0&&lm(a,u,h)}}function yl(e,i,a,o){xi[$s++]=e,xi[$s++]=i,xi[$s++]=a,xi[$s++]=o,ku|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Xu(e,i,a,o){return yl(e,i,a,o),El(e)}function gs(e,i){return yl(e,null,null,i),El(e)}function lm(e,i,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&i!==null&&(u=31-ie(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=a|536870912),h):null}function El(e){if(50<Io)throw Io=0,th=null,Error(s(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var tr={};function US(e,i,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(e,i,a,o){return new US(e,i,a,o)}function Wu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,i){var a=e.alternate;return a===null?(a=ai(e.tag,i,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=i,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,i=e.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function cm(e,i){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,i=a.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Tl(e,i,a,o,u,h){var M=0;if(o=e,typeof e=="function")Wu(e)&&(M=1);else if(typeof e=="string")M=BM(e,a,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ai(31,a,i,u),e.elementType=D,e.lanes=h,e;case T:return vs(a.children,u,h,i);case E:M=8,u|=24;break;case _:return e=ai(12,a,i,u|2),e.elementType=_,e.lanes=h,e;case k:return e=ai(13,a,i,u),e.elementType=k,e.lanes=h,e;case z:return e=ai(19,a,i,u),e.elementType=z,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case L:M=10;break t;case U:M=9;break t;case A:M=11;break t;case O:M=14;break t;case F:M=16,o=null;break t}M=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return i=ai(M,a,i,u),i.elementType=e,i.type=o,i.lanes=h,i}function vs(e,i,a,o){return e=ai(7,e,o,i),e.lanes=a,e}function qu(e,i,a){return e=ai(6,e,null,i),e.lanes=a,e}function um(e){var i=ai(18,null,null,0);return i.stateNode=e,i}function ju(e,i,a){return i=ai(4,e.children!==null?e.children:[],e.key,i),i.lanes=a,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var fm=new WeakMap;function _i(e,i){if(typeof e=="object"&&e!==null){var a=fm.get(e);return a!==void 0?a:(i={value:e,source:i,stack:Qt(i)},fm.set(e,i),i)}return{value:e,source:i,stack:Qt(i)}}var er=[],nr=0,bl=null,vo=0,Si=[],Mi=0,Na=null,Xi=1,Wi="";function ia(e,i){er[nr++]=vo,er[nr++]=bl,bl=e,vo=i}function hm(e,i,a){Si[Mi++]=Xi,Si[Mi++]=Wi,Si[Mi++]=Na,Na=e;var o=Xi;e=Wi;var u=32-ie(o)-1;o&=~(1<<u),a+=1;var h=32-ie(i)+u;if(30<h){var M=u-u%5;h=(o&(1<<M)-1).toString(32),o>>=M,u-=M,Xi=1<<32-ie(i)+u|a<<u|o,Wi=h+e}else Xi=1<<h|a<<u|o,Wi=e}function Yu(e){e.return!==null&&(ia(e,1),hm(e,1,0))}function Zu(e){for(;e===bl;)bl=er[--nr],er[nr]=null,vo=er[--nr],er[nr]=null;for(;e===Na;)Na=Si[--Mi],Si[Mi]=null,Wi=Si[--Mi],Si[Mi]=null,Xi=Si[--Mi],Si[Mi]=null}function dm(e,i){Si[Mi++]=Xi,Si[Mi++]=Wi,Si[Mi++]=Na,Xi=i.id,Wi=i.overflow,Na=e}var Un=null,Ke=null,be=!1,Oa=null,yi=!1,Ku=Error(s(519));function Pa(e){var i=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw xo(_i(i,e)),Ku}function pm(e){var i=e.stateNode,a=e.type,o=e.memoizedProps;switch(i[rn]=e,i[Dn]=o,a){case"dialog":xe("cancel",i),xe("close",i);break;case"iframe":case"object":case"embed":xe("load",i);break;case"video":case"audio":for(a=0;a<Ho.length;a++)xe(Ho[a],i);break;case"source":xe("error",i);break;case"img":case"image":case"link":xe("error",i),xe("load",i);break;case"details":xe("toggle",i);break;case"input":xe("invalid",i),Ni(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":xe("invalid",i);break;case"textarea":xe("invalid",i),Cp(i,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||i.textContent===""+a||o.suppressHydrationWarning===!0||Lg(i.textContent,a)?(o.popover!=null&&(xe("beforetoggle",i),xe("toggle",i)),o.onScroll!=null&&xe("scroll",i),o.onScrollEnd!=null&&xe("scrollend",i),o.onClick!=null&&(i.onclick=ta),i=!0):i=!1,i||Pa(e,!0)}function mm(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:yi=!1;return;case 27:case 3:yi=!0;return;default:Un=Un.return}}function ir(e){if(e!==Un)return!1;if(!be)return mm(e),be=!0,!1;var i=e.tag,a;if((a=i!==3&&i!==27)&&((a=i===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||mh(e.type,e.memoizedProps)),a=!a),a&&Ke&&Pa(e),mm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ke=Hg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ke=Hg(e)}else i===27?(i=Ke,Za(e.type)?(e=Sh,Sh=null,Ke=e):Ke=i):Ke=Un?Ti(e.stateNode.nextSibling):null;return!0}function xs(){Ke=Un=null,be=!1}function Qu(){var e=Oa;return e!==null&&(Jn===null?Jn=e:Jn.push.apply(Jn,e),Oa=null),e}function xo(e){Oa===null?Oa=[e]:Oa.push(e)}var Ju=P(null),_s=null,aa=null;function za(e,i,a){St(Ju,i._currentValue),i._currentValue=a}function sa(e){e._currentValue=Ju.current,it(Ju)}function $u(e,i,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===a)break;e=e.return}}function tf(e,i,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var M=u.child;h=h.firstContext;t:for(;h!==null;){var b=h;h=u;for(var I=0;I<i.length;I++)if(b.context===i[I]){h.lanes|=a,b=h.alternate,b!==null&&(b.lanes|=a),$u(h.return,a,e),o||(M=null);break t}h=b.next}}else if(u.tag===18){if(M=u.return,M===null)throw Error(s(341));M.lanes|=a,h=M.alternate,h!==null&&(h.lanes|=a),$u(M,a,e),M=null}else M=u.child;if(M!==null)M.return=u;else for(M=u;M!==null;){if(M===e){M=null;break}if(u=M.sibling,u!==null){u.return=M.return,M=u;break}M=M.return}u=M}}function ar(e,i,a,o){e=null;for(var u=i,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var M=u.alternate;if(M===null)throw Error(s(387));if(M=M.memoizedProps,M!==null){var b=u.type;ii(u.pendingProps.value,M.value)||(e!==null?e.push(b):e=[b])}}else if(u===_t.current){if(M=u.alternate,M===null)throw Error(s(387));M.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Wo):e=[Wo])}u=u.return}e!==null&&tf(i,e,a,o),i.flags|=262144}function Al(e){for(e=e.firstContext;e!==null;){if(!ii(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ss(e){_s=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Nn(e){return gm(_s,e)}function wl(e,i){return _s===null&&Ss(e),gm(e,i)}function gm(e,i){var a=i._currentValue;if(i={context:i,memoizedValue:a,next:null},aa===null){if(e===null)throw Error(s(308));aa=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else aa=aa.next=i;return a}var NS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(a){return a()})}},OS=r.unstable_scheduleCallback,PS=r.unstable_NormalPriority,fn={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ef(){return{controller:new NS,data:new Map,refCount:0}}function _o(e){e.refCount--,e.refCount===0&&OS(PS,function(){e.controller.abort()})}var So=null,nf=0,sr=0,rr=null;function zS(e,i){if(So===null){var a=So=[];nf=0,sr=rh(),rr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return nf++,i.then(vm,vm),i}function vm(){if(--nf===0&&So!==null){rr!==null&&(rr.status="fulfilled");var e=So;So=null,sr=0,rr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function BS(e,i){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<a.length;u++)(0,a[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var xm=B.S;B.S=function(e,i){eg=dt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&zS(e,i),xm!==null&&xm(e,i)};var Ms=P(null);function af(){var e=Ms.current;return e!==null?e:Ye.pooledCache}function Rl(e,i){i===null?St(Ms,Ms.current):St(Ms,i.pool)}function _m(){var e=af();return e===null?null:{parent:fn._currentValue,pool:e}}var or=Error(s(460)),sf=Error(s(474)),Cl=Error(s(542)),Dl={then:function(){}};function Sm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Mm(e,i,a){switch(a=e[a],a===void 0?e.push(i):a!==i&&(i.then(ta,ta),i=a),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Em(e),e;default:if(typeof i.status=="string")i.then(ta,ta);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Em(e),e}throw Es=i,or}}function ys(e){try{var i=e._init;return i(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Es=a,or):a}}var Es=null;function ym(){if(Es===null)throw Error(s(459));var e=Es;return Es=null,e}function Em(e){if(e===or||e===Cl)throw Error(s(483))}var lr=null,Mo=0;function Ll(e){var i=Mo;return Mo+=1,lr===null&&(lr=[]),Mm(lr,e,i)}function yo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ul(e,i){throw i.$$typeof===x?Error(s(525)):(e=Object.prototype.toString.call(i),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Tm(e){function i(Y,G){if(e){var J=Y.deletions;J===null?(Y.deletions=[G],Y.flags|=16):J.push(G)}}function a(Y,G){if(!e)return null;for(;G!==null;)i(Y,G),G=G.sibling;return null}function o(Y){for(var G=new Map;Y!==null;)Y.key!==null?G.set(Y.key,Y):G.set(Y.index,Y),Y=Y.sibling;return G}function u(Y,G){return Y=na(Y,G),Y.index=0,Y.sibling=null,Y}function h(Y,G,J){return Y.index=J,e?(J=Y.alternate,J!==null?(J=J.index,J<G?(Y.flags|=67108866,G):J):(Y.flags|=67108866,G)):(Y.flags|=1048576,G)}function M(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function b(Y,G,J,pt){return G===null||G.tag!==6?(G=qu(J,Y.mode,pt),G.return=Y,G):(G=u(G,J),G.return=Y,G)}function I(Y,G,J,pt){var Yt=J.type;return Yt===T?ut(Y,G,J.props.children,pt,J.key):G!==null&&(G.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===F&&ys(Yt)===G.type)?(G=u(G,J.props),yo(G,J),G.return=Y,G):(G=Tl(J.type,J.key,J.props,null,Y.mode,pt),yo(G,J),G.return=Y,G)}function $(Y,G,J,pt){return G===null||G.tag!==4||G.stateNode.containerInfo!==J.containerInfo||G.stateNode.implementation!==J.implementation?(G=ju(J,Y.mode,pt),G.return=Y,G):(G=u(G,J.children||[]),G.return=Y,G)}function ut(Y,G,J,pt,Yt){return G===null||G.tag!==7?(G=vs(J,Y.mode,pt,Yt),G.return=Y,G):(G=u(G,J),G.return=Y,G)}function vt(Y,G,J){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=qu(""+G,Y.mode,J),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case S:return J=Tl(G.type,G.key,G.props,null,Y.mode,J),yo(J,G),J.return=Y,J;case y:return G=ju(G,Y.mode,J),G.return=Y,G;case F:return G=ys(G),vt(Y,G,J)}if(mt(G)||et(G))return G=vs(G,Y.mode,J,null),G.return=Y,G;if(typeof G.then=="function")return vt(Y,Ll(G),J);if(G.$$typeof===L)return vt(Y,wl(Y,G),J);Ul(Y,G)}return null}function tt(Y,G,J,pt){var Yt=G!==null?G.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Yt!==null?null:b(Y,G,""+J,pt);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case S:return J.key===Yt?I(Y,G,J,pt):null;case y:return J.key===Yt?$(Y,G,J,pt):null;case F:return J=ys(J),tt(Y,G,J,pt)}if(mt(J)||et(J))return Yt!==null?null:ut(Y,G,J,pt,null);if(typeof J.then=="function")return tt(Y,G,Ll(J),pt);if(J.$$typeof===L)return tt(Y,G,wl(Y,J),pt);Ul(Y,J)}return null}function ot(Y,G,J,pt,Yt){if(typeof pt=="string"&&pt!==""||typeof pt=="number"||typeof pt=="bigint")return Y=Y.get(J)||null,b(G,Y,""+pt,Yt);if(typeof pt=="object"&&pt!==null){switch(pt.$$typeof){case S:return Y=Y.get(pt.key===null?J:pt.key)||null,I(G,Y,pt,Yt);case y:return Y=Y.get(pt.key===null?J:pt.key)||null,$(G,Y,pt,Yt);case F:return pt=ys(pt),ot(Y,G,J,pt,Yt)}if(mt(pt)||et(pt))return Y=Y.get(J)||null,ut(G,Y,pt,Yt,null);if(typeof pt.then=="function")return ot(Y,G,J,Ll(pt),Yt);if(pt.$$typeof===L)return ot(Y,G,J,wl(G,pt),Yt);Ul(G,pt)}return null}function Ft(Y,G,J,pt){for(var Yt=null,De=null,Wt=G,fe=G=0,ye=null;Wt!==null&&fe<J.length;fe++){Wt.index>fe?(ye=Wt,Wt=null):ye=Wt.sibling;var Le=tt(Y,Wt,J[fe],pt);if(Le===null){Wt===null&&(Wt=ye);break}e&&Wt&&Le.alternate===null&&i(Y,Wt),G=h(Le,G,fe),De===null?Yt=Le:De.sibling=Le,De=Le,Wt=ye}if(fe===J.length)return a(Y,Wt),be&&ia(Y,fe),Yt;if(Wt===null){for(;fe<J.length;fe++)Wt=vt(Y,J[fe],pt),Wt!==null&&(G=h(Wt,G,fe),De===null?Yt=Wt:De.sibling=Wt,De=Wt);return be&&ia(Y,fe),Yt}for(Wt=o(Wt);fe<J.length;fe++)ye=ot(Wt,Y,fe,J[fe],pt),ye!==null&&(e&&ye.alternate!==null&&Wt.delete(ye.key===null?fe:ye.key),G=h(ye,G,fe),De===null?Yt=ye:De.sibling=ye,De=ye);return e&&Wt.forEach(function(ts){return i(Y,ts)}),be&&ia(Y,fe),Yt}function Jt(Y,G,J,pt){if(J==null)throw Error(s(151));for(var Yt=null,De=null,Wt=G,fe=G=0,ye=null,Le=J.next();Wt!==null&&!Le.done;fe++,Le=J.next()){Wt.index>fe?(ye=Wt,Wt=null):ye=Wt.sibling;var ts=tt(Y,Wt,Le.value,pt);if(ts===null){Wt===null&&(Wt=ye);break}e&&Wt&&ts.alternate===null&&i(Y,Wt),G=h(ts,G,fe),De===null?Yt=ts:De.sibling=ts,De=ts,Wt=ye}if(Le.done)return a(Y,Wt),be&&ia(Y,fe),Yt;if(Wt===null){for(;!Le.done;fe++,Le=J.next())Le=vt(Y,Le.value,pt),Le!==null&&(G=h(Le,G,fe),De===null?Yt=Le:De.sibling=Le,De=Le);return be&&ia(Y,fe),Yt}for(Wt=o(Wt);!Le.done;fe++,Le=J.next())Le=ot(Wt,Y,fe,Le.value,pt),Le!==null&&(e&&Le.alternate!==null&&Wt.delete(Le.key===null?fe:Le.key),G=h(Le,G,fe),De===null?Yt=Le:De.sibling=Le,De=Le);return e&&Wt.forEach(function(YM){return i(Y,YM)}),be&&ia(Y,fe),Yt}function qe(Y,G,J,pt){if(typeof J=="object"&&J!==null&&J.type===T&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case S:t:{for(var Yt=J.key;G!==null;){if(G.key===Yt){if(Yt=J.type,Yt===T){if(G.tag===7){a(Y,G.sibling),pt=u(G,J.props.children),pt.return=Y,Y=pt;break t}}else if(G.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===F&&ys(Yt)===G.type){a(Y,G.sibling),pt=u(G,J.props),yo(pt,J),pt.return=Y,Y=pt;break t}a(Y,G);break}else i(Y,G);G=G.sibling}J.type===T?(pt=vs(J.props.children,Y.mode,pt,J.key),pt.return=Y,Y=pt):(pt=Tl(J.type,J.key,J.props,null,Y.mode,pt),yo(pt,J),pt.return=Y,Y=pt)}return M(Y);case y:t:{for(Yt=J.key;G!==null;){if(G.key===Yt)if(G.tag===4&&G.stateNode.containerInfo===J.containerInfo&&G.stateNode.implementation===J.implementation){a(Y,G.sibling),pt=u(G,J.children||[]),pt.return=Y,Y=pt;break t}else{a(Y,G);break}else i(Y,G);G=G.sibling}pt=ju(J,Y.mode,pt),pt.return=Y,Y=pt}return M(Y);case F:return J=ys(J),qe(Y,G,J,pt)}if(mt(J))return Ft(Y,G,J,pt);if(et(J)){if(Yt=et(J),typeof Yt!="function")throw Error(s(150));return J=Yt.call(J),Jt(Y,G,J,pt)}if(typeof J.then=="function")return qe(Y,G,Ll(J),pt);if(J.$$typeof===L)return qe(Y,G,wl(Y,J),pt);Ul(Y,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,G!==null&&G.tag===6?(a(Y,G.sibling),pt=u(G,J),pt.return=Y,Y=pt):(a(Y,G),pt=qu(J,Y.mode,pt),pt.return=Y,Y=pt),M(Y)):a(Y,G)}return function(Y,G,J,pt){try{Mo=0;var Yt=qe(Y,G,J,pt);return lr=null,Yt}catch(Wt){if(Wt===or||Wt===Cl)throw Wt;var De=ai(29,Wt,null,Y.mode);return De.lanes=pt,De.return=Y,De}finally{}}}var Ts=Tm(!0),bm=Tm(!1),Ba=!1;function rf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function of(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ia(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Fa(e,i,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Oe&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=El(e),lm(e,null,a),i}return yl(e,o,i,a),El(e)}function Eo(e,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,ao(e,a)}}function lf(e,i){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var M={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=M:h=h.next=M,a=a.next}while(a!==null);h===null?u=h=i:h=h.next=i}else u=h=i;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=i:e.next=i,a.lastBaseUpdate=i}var cf=!1;function To(){if(cf){var e=rr;if(e!==null)throw e}}function bo(e,i,a,o){cf=!1;var u=e.updateQueue;Ba=!1;var h=u.firstBaseUpdate,M=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var I=b,$=I.next;I.next=null,M===null?h=$:M.next=$,M=I;var ut=e.alternate;ut!==null&&(ut=ut.updateQueue,b=ut.lastBaseUpdate,b!==M&&(b===null?ut.firstBaseUpdate=$:b.next=$,ut.lastBaseUpdate=I))}if(h!==null){var vt=u.baseState;M=0,ut=$=I=null,b=h;do{var tt=b.lane&-536870913,ot=tt!==b.lane;if(ot?(Me&tt)===tt:(o&tt)===tt){tt!==0&&tt===sr&&(cf=!0),ut!==null&&(ut=ut.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Ft=e,Jt=b;tt=i;var qe=a;switch(Jt.tag){case 1:if(Ft=Jt.payload,typeof Ft=="function"){vt=Ft.call(qe,vt,tt);break t}vt=Ft;break t;case 3:Ft.flags=Ft.flags&-65537|128;case 0:if(Ft=Jt.payload,tt=typeof Ft=="function"?Ft.call(qe,vt,tt):Ft,tt==null)break t;vt=g({},vt,tt);break t;case 2:Ba=!0}}tt=b.callback,tt!==null&&(e.flags|=64,ot&&(e.flags|=8192),ot=u.callbacks,ot===null?u.callbacks=[tt]:ot.push(tt))}else ot={lane:tt,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ut===null?($=ut=ot,I=vt):ut=ut.next=ot,M|=tt;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;ot=b,b=ot.next,ot.next=null,u.lastBaseUpdate=ot,u.shared.pending=null}}while(!0);ut===null&&(I=vt),u.baseState=I,u.firstBaseUpdate=$,u.lastBaseUpdate=ut,h===null&&(u.shared.lanes=0),Xa|=M,e.lanes=M,e.memoizedState=vt}}function Am(e,i){if(typeof e!="function")throw Error(s(191,e));e.call(i)}function wm(e,i){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Am(a[e],i)}var cr=P(null),Nl=P(0);function Rm(e,i){e=pa,St(Nl,e),St(cr,i),pa=e|i.baseLanes}function uf(){St(Nl,pa),St(cr,cr.current)}function ff(){pa=Nl.current,it(cr),it(Nl)}var si=P(null),Ei=null;function Ha(e){var i=e.alternate;St(cn,cn.current&1),St(si,e),Ei===null&&(i===null||cr.current!==null||i.memoizedState!==null)&&(Ei=e)}function hf(e){St(cn,cn.current),St(si,e),Ei===null&&(Ei=e)}function Cm(e){e.tag===22?(St(cn,cn.current),St(si,e),Ei===null&&(Ei=e)):Ga()}function Ga(){St(cn,cn.current),St(si,si.current)}function ri(e){it(si),Ei===e&&(Ei=null),it(cn)}var cn=P(0);function Ol(e){for(var i=e;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||xh(a)||_h(a)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ra=0,ue=null,Xe=null,hn=null,Pl=!1,ur=!1,bs=!1,zl=0,Ao=0,fr=null,IS=0;function on(){throw Error(s(321))}function df(e,i){if(i===null)return!1;for(var a=0;a<i.length&&a<e.length;a++)if(!ii(e[a],i[a]))return!1;return!0}function pf(e,i,a,o,u,h){return ra=h,ue=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,B.H=e===null||e.memoizedState===null?h0:Cf,bs=!1,h=a(o,u),bs=!1,ur&&(h=Lm(i,a,o,u)),Dm(e),h}function Dm(e){B.H=Co;var i=Xe!==null&&Xe.next!==null;if(ra=0,hn=Xe=ue=null,Pl=!1,Ao=0,fr=null,i)throw Error(s(300));e===null||dn||(e=e.dependencies,e!==null&&Al(e)&&(dn=!0))}function Lm(e,i,a,o){ue=e;var u=0;do{if(ur&&(fr=null),Ao=0,ur=!1,25<=u)throw Error(s(301));if(u+=1,hn=Xe=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}B.H=d0,h=i(a,o)}while(ur);return h}function FS(){var e=B.H,i=e.useState()[0];return i=typeof i.then=="function"?wo(i):i,e=e.useState()[0],(Xe!==null?Xe.memoizedState:null)!==e&&(ue.flags|=1024),i}function mf(){var e=zl!==0;return zl=0,e}function gf(e,i,a){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~a}function vf(e){if(Pl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Pl=!1}ra=0,hn=Xe=ue=null,ur=!1,Ao=zl=0,fr=null}function Xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return hn===null?ue.memoizedState=hn=e:hn=hn.next=e,hn}function un(){if(Xe===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Xe.next;var i=hn===null?ue.memoizedState:hn.next;if(i!==null)hn=i,Xe=e;else{if(e===null)throw ue.alternate===null?Error(s(467)):Error(s(310));Xe=e,e={memoizedState:Xe.memoizedState,baseState:Xe.baseState,baseQueue:Xe.baseQueue,queue:Xe.queue,next:null},hn===null?ue.memoizedState=hn=e:hn=hn.next=e}return hn}function Bl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function wo(e){var i=Ao;return Ao+=1,fr===null&&(fr=[]),e=Mm(fr,e,i),i=ue,(hn===null?i.memoizedState:hn.next)===null&&(i=i.alternate,B.H=i===null||i.memoizedState===null?h0:Cf),e}function Il(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return wo(e);if(e.$$typeof===L)return Nn(e)}throw Error(s(438,String(e)))}function xf(e){var i=null,a=ue.updateQueue;if(a!==null&&(i=a.memoCache),i==null){var o=ue.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),a===null&&(a=Bl(),ue.updateQueue=a),a.memoCache=i,a=i.data[i.index],a===void 0)for(a=i.data[i.index]=Array(e),o=0;o<e;o++)a[o]=R;return i.index++,a}function oa(e,i){return typeof i=="function"?i(e):i}function Fl(e){var i=un();return _f(i,Xe,e)}function _f(e,i,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var M=u.next;u.next=h.next,h.next=M}i.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{i=u.next;var b=M=null,I=null,$=i,ut=!1;do{var vt=$.lane&-536870913;if(vt!==$.lane?(Me&vt)===vt:(ra&vt)===vt){var tt=$.revertLane;if(tt===0)I!==null&&(I=I.next={lane:0,revertLane:0,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null}),vt===sr&&(ut=!0);else if((ra&tt)===tt){$=$.next,tt===sr&&(ut=!0);continue}else vt={lane:0,revertLane:$.revertLane,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},I===null?(b=I=vt,M=h):I=I.next=vt,ue.lanes|=tt,Xa|=tt;vt=$.action,bs&&a(h,vt),h=$.hasEagerState?$.eagerState:a(h,vt)}else tt={lane:vt,revertLane:$.revertLane,gesture:$.gesture,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},I===null?(b=I=tt,M=h):I=I.next=tt,ue.lanes|=vt,Xa|=vt;$=$.next}while($!==null&&$!==i);if(I===null?M=h:I.next=b,!ii(h,e.memoizedState)&&(dn=!0,ut&&(a=rr,a!==null)))throw a;e.memoizedState=h,e.baseState=M,e.baseQueue=I,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Sf(e){var i=un(),a=i.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=i.memoizedState;if(u!==null){a.pending=null;var M=u=u.next;do h=e(h,M.action),M=M.next;while(M!==u);ii(h,i.memoizedState)||(dn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),a.lastRenderedState=h}return[h,o]}function Um(e,i,a){var o=ue,u=un(),h=be;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=i();var M=!ii((Xe||u).memoizedState,a);if(M&&(u.memoizedState=a,dn=!0),u=u.queue,Ef(Pm.bind(null,o,u,e),[e]),u.getSnapshot!==i||M||hn!==null&&hn.memoizedState.tag&1){if(o.flags|=2048,hr(9,{destroy:void 0},Om.bind(null,o,u,a,i),null),Ye===null)throw Error(s(349));h||(ra&127)!==0||Nm(o,i,a)}return a}function Nm(e,i,a){e.flags|=16384,e={getSnapshot:i,value:a},i=ue.updateQueue,i===null?(i=Bl(),ue.updateQueue=i,i.stores=[e]):(a=i.stores,a===null?i.stores=[e]:a.push(e))}function Om(e,i,a,o){i.value=a,i.getSnapshot=o,zm(i)&&Bm(e)}function Pm(e,i,a){return a(function(){zm(i)&&Bm(e)})}function zm(e){var i=e.getSnapshot;e=e.value;try{var a=i();return!ii(e,a)}catch{return!0}}function Bm(e){var i=gs(e,2);i!==null&&$n(i,e,2)}function Mf(e){var i=Xn();if(typeof e=="function"){var a=e;if(e=a(),bs){Ot(!0);try{a()}finally{Ot(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:e},i}function Im(e,i,a,o){return e.baseState=a,_f(e,Xe,typeof o=="function"?o:oa)}function HS(e,i,a,o,u){if(Vl(e))throw Error(s(485));if(e=i.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){h.listeners.push(M)}};B.T!==null?a(!0):h.isTransition=!1,o(h),a=i.pending,a===null?(h.next=i.pending=h,Fm(i,h)):(h.next=a.next,i.pending=a.next=h)}}function Fm(e,i){var a=i.action,o=i.payload,u=e.state;if(i.isTransition){var h=B.T,M={};B.T=M;try{var b=a(u,o),I=B.S;I!==null&&I(M,b),Hm(e,i,b)}catch($){yf(e,i,$)}finally{h!==null&&M.types!==null&&(h.types=M.types),B.T=h}}else try{h=a(u,o),Hm(e,i,h)}catch($){yf(e,i,$)}}function Hm(e,i,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Gm(e,i,o)},function(o){return yf(e,i,o)}):Gm(e,i,a)}function Gm(e,i,a){i.status="fulfilled",i.value=a,Vm(i),e.state=a,i=e.pending,i!==null&&(a=i.next,a===i?e.pending=null:(a=a.next,i.next=a,Fm(e,a)))}function yf(e,i,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=a,Vm(i),i=i.next;while(i!==o)}e.action=null}function Vm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function km(e,i){return i}function Xm(e,i){if(be){var a=Ye.formState;if(a!==null){t:{var o=ue;if(be){if(Ke){e:{for(var u=Ke,h=yi;u.nodeType!==8;){if(!h){u=null;break e}if(u=Ti(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Ke=Ti(u.nextSibling),o=u.data==="F!";break t}}Pa(o)}o=!1}o&&(i=a[0])}}return a=Xn(),a.memoizedState=a.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:km,lastRenderedState:i},a.queue=o,a=c0.bind(null,ue,o),o.dispatch=a,o=Mf(!1),h=Rf.bind(null,ue,!1,o.queue),o=Xn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,a=HS.bind(null,ue,u,h,a),u.dispatch=a,o.memoizedState=e,[i,a,!1]}function Wm(e){var i=un();return qm(i,Xe,e)}function qm(e,i,a){if(i=_f(e,i,km)[0],e=Fl(oa)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=wo(i)}catch(M){throw M===or?Cl:M}else o=i;i=un();var u=i.queue,h=u.dispatch;return a!==i.memoizedState&&(ue.flags|=2048,hr(9,{destroy:void 0},GS.bind(null,u,a),null)),[o,h,e]}function GS(e,i){e.action=i}function jm(e){var i=un(),a=Xe;if(a!==null)return qm(i,a,e);un(),i=i.memoizedState,a=un();var o=a.queue.dispatch;return a.memoizedState=e,[i,o,!1]}function hr(e,i,a,o){return e={tag:e,create:a,deps:o,inst:i,next:null},i=ue.updateQueue,i===null&&(i=Bl(),ue.updateQueue=i),a=i.lastEffect,a===null?i.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,i.lastEffect=e),e}function Ym(){return un().memoizedState}function Hl(e,i,a,o){var u=Xn();ue.flags|=e,u.memoizedState=hr(1|i,{destroy:void 0},a,o===void 0?null:o)}function Gl(e,i,a,o){var u=un();o=o===void 0?null:o;var h=u.memoizedState.inst;Xe!==null&&o!==null&&df(o,Xe.memoizedState.deps)?u.memoizedState=hr(i,h,a,o):(ue.flags|=e,u.memoizedState=hr(1|i,h,a,o))}function Zm(e,i){Hl(8390656,8,e,i)}function Ef(e,i){Gl(2048,8,e,i)}function VS(e){ue.flags|=4;var i=ue.updateQueue;if(i===null)i=Bl(),ue.updateQueue=i,i.events=[e];else{var a=i.events;a===null?i.events=[e]:a.push(e)}}function Km(e){var i=un().memoizedState;return VS({ref:i,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(s(440));return i.impl.apply(void 0,arguments)}}function Qm(e,i){return Gl(4,2,e,i)}function Jm(e,i){return Gl(4,4,e,i)}function $m(e,i){if(typeof i=="function"){e=e();var a=i(e);return function(){typeof a=="function"?a():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function t0(e,i,a){a=a!=null?a.concat([e]):null,Gl(4,4,$m.bind(null,i,e),a)}function Tf(){}function e0(e,i){var a=un();i=i===void 0?null:i;var o=a.memoizedState;return i!==null&&df(i,o[1])?o[0]:(a.memoizedState=[e,i],e)}function n0(e,i){var a=un();i=i===void 0?null:i;var o=a.memoizedState;if(i!==null&&df(i,o[1]))return o[0];if(o=e(),bs){Ot(!0);try{e()}finally{Ot(!1)}}return a.memoizedState=[o,i],o}function bf(e,i,a){return a===void 0||(ra&1073741824)!==0&&(Me&261930)===0?e.memoizedState=i:(e.memoizedState=a,e=ig(),ue.lanes|=e,Xa|=e,a)}function i0(e,i,a,o){return ii(a,i)?a:cr.current!==null?(e=bf(e,a,o),ii(e,i)||(dn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Me&261930)===0?(dn=!0,e.memoizedState=a):(e=ig(),ue.lanes|=e,Xa|=e,i)}function a0(e,i,a,o,u){var h=Q.p;Q.p=h!==0&&8>h?h:8;var M=B.T,b={};B.T=b,Rf(e,!1,i,a);try{var I=u(),$=B.S;if($!==null&&$(b,I),I!==null&&typeof I=="object"&&typeof I.then=="function"){var ut=BS(I,o);Ro(e,i,ut,ci(e))}else Ro(e,i,o,ci(e))}catch(vt){Ro(e,i,{then:function(){},status:"rejected",reason:vt},ci())}finally{Q.p=h,M!==null&&b.types!==null&&(M.types=b.types),B.T=M}}function kS(){}function Af(e,i,a,o){if(e.tag!==5)throw Error(s(476));var u=s0(e).queue;a0(e,u,i,K,a===null?kS:function(){return r0(e),a(o)})}function s0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:K},next:null};var a={};return i.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:a},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function r0(e){var i=s0(e);i.next===null&&(i=e.alternate.memoizedState),Ro(e,i.next.queue,{},ci())}function wf(){return Nn(Wo)}function o0(){return un().memoizedState}function l0(){return un().memoizedState}function XS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var a=ci();e=Ia(a);var o=Fa(i,e,a);o!==null&&($n(o,i,a),Eo(o,i,a)),i={cache:ef()},e.payload=i;return}i=i.return}}function WS(e,i,a){var o=ci();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Vl(e)?u0(i,a):(a=Xu(e,i,a,o),a!==null&&($n(a,e,o),f0(a,i,o)))}function c0(e,i,a){var o=ci();Ro(e,i,a,o)}function Ro(e,i,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Vl(e))u0(i,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var M=i.lastRenderedState,b=h(M,a);if(u.hasEagerState=!0,u.eagerState=b,ii(b,M))return yl(e,i,u,0),Ye===null&&Ml(),!1}catch{}finally{}if(a=Xu(e,i,u,o),a!==null)return $n(a,e,o),f0(a,i,o),!0}return!1}function Rf(e,i,a,o){if(o={lane:2,revertLane:rh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Vl(e)){if(i)throw Error(s(479))}else i=Xu(e,a,o,2),i!==null&&$n(i,e,2)}function Vl(e){var i=e.alternate;return e===ue||i!==null&&i===ue}function u0(e,i){ur=Pl=!0;var a=e.pending;a===null?i.next=i:(i.next=a.next,a.next=i),e.pending=i}function f0(e,i,a){if((a&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,ao(e,a)}}var Co={readContext:Nn,use:Il,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useLayoutEffect:on,useInsertionEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useSyncExternalStore:on,useId:on,useHostTransitionStatus:on,useFormState:on,useActionState:on,useOptimistic:on,useMemoCache:on,useCacheRefresh:on};Co.useEffectEvent=on;var h0={readContext:Nn,use:Il,useCallback:function(e,i){return Xn().memoizedState=[e,i===void 0?null:i],e},useContext:Nn,useEffect:Zm,useImperativeHandle:function(e,i,a){a=a!=null?a.concat([e]):null,Hl(4194308,4,$m.bind(null,i,e),a)},useLayoutEffect:function(e,i){return Hl(4194308,4,e,i)},useInsertionEffect:function(e,i){Hl(4,2,e,i)},useMemo:function(e,i){var a=Xn();i=i===void 0?null:i;var o=e();if(bs){Ot(!0);try{e()}finally{Ot(!1)}}return a.memoizedState=[o,i],o},useReducer:function(e,i,a){var o=Xn();if(a!==void 0){var u=a(i);if(bs){Ot(!0);try{a(i)}finally{Ot(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=WS.bind(null,ue,e),[o.memoizedState,e]},useRef:function(e){var i=Xn();return e={current:e},i.memoizedState=e},useState:function(e){e=Mf(e);var i=e.queue,a=c0.bind(null,ue,i);return i.dispatch=a,[e.memoizedState,a]},useDebugValue:Tf,useDeferredValue:function(e,i){var a=Xn();return bf(a,e,i)},useTransition:function(){var e=Mf(!1);return e=a0.bind(null,ue,e.queue,!0,!1),Xn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,a){var o=ue,u=Xn();if(be){if(a===void 0)throw Error(s(407));a=a()}else{if(a=i(),Ye===null)throw Error(s(349));(Me&127)!==0||Nm(o,i,a)}u.memoizedState=a;var h={value:a,getSnapshot:i};return u.queue=h,Zm(Pm.bind(null,o,h,e),[e]),o.flags|=2048,hr(9,{destroy:void 0},Om.bind(null,o,h,a,i),null),a},useId:function(){var e=Xn(),i=Ye.identifierPrefix;if(be){var a=Wi,o=Xi;a=(o&~(1<<32-ie(o)-1)).toString(32)+a,i="_"+i+"R_"+a,a=zl++,0<a&&(i+="H"+a.toString(32)),i+="_"}else a=IS++,i="_"+i+"r_"+a.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:wf,useFormState:Xm,useActionState:Xm,useOptimistic:function(e){var i=Xn();i.memoizedState=i.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=a,i=Rf.bind(null,ue,!0,a),a.dispatch=i,[e,i]},useMemoCache:xf,useCacheRefresh:function(){return Xn().memoizedState=XS.bind(null,ue)},useEffectEvent:function(e){var i=Xn(),a={impl:e};return i.memoizedState=a,function(){if((Oe&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Cf={readContext:Nn,use:Il,useCallback:e0,useContext:Nn,useEffect:Ef,useImperativeHandle:t0,useInsertionEffect:Qm,useLayoutEffect:Jm,useMemo:n0,useReducer:Fl,useRef:Ym,useState:function(){return Fl(oa)},useDebugValue:Tf,useDeferredValue:function(e,i){var a=un();return i0(a,Xe.memoizedState,e,i)},useTransition:function(){var e=Fl(oa)[0],i=un().memoizedState;return[typeof e=="boolean"?e:wo(e),i]},useSyncExternalStore:Um,useId:o0,useHostTransitionStatus:wf,useFormState:Wm,useActionState:Wm,useOptimistic:function(e,i){var a=un();return Im(a,Xe,e,i)},useMemoCache:xf,useCacheRefresh:l0};Cf.useEffectEvent=Km;var d0={readContext:Nn,use:Il,useCallback:e0,useContext:Nn,useEffect:Ef,useImperativeHandle:t0,useInsertionEffect:Qm,useLayoutEffect:Jm,useMemo:n0,useReducer:Sf,useRef:Ym,useState:function(){return Sf(oa)},useDebugValue:Tf,useDeferredValue:function(e,i){var a=un();return Xe===null?bf(a,e,i):i0(a,Xe.memoizedState,e,i)},useTransition:function(){var e=Sf(oa)[0],i=un().memoizedState;return[typeof e=="boolean"?e:wo(e),i]},useSyncExternalStore:Um,useId:o0,useHostTransitionStatus:wf,useFormState:jm,useActionState:jm,useOptimistic:function(e,i){var a=un();return Xe!==null?Im(a,Xe,e,i):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:xf,useCacheRefresh:l0};d0.useEffectEvent=Km;function Df(e,i,a,o){i=e.memoizedState,a=a(o,i),a=a==null?i:g({},i,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Lf={enqueueSetState:function(e,i,a){e=e._reactInternals;var o=ci(),u=Ia(o);u.payload=i,a!=null&&(u.callback=a),i=Fa(e,u,o),i!==null&&($n(i,e,o),Eo(i,e,o))},enqueueReplaceState:function(e,i,a){e=e._reactInternals;var o=ci(),u=Ia(o);u.tag=1,u.payload=i,a!=null&&(u.callback=a),i=Fa(e,u,o),i!==null&&($n(i,e,o),Eo(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var a=ci(),o=Ia(a);o.tag=2,i!=null&&(o.callback=i),i=Fa(e,o,a),i!==null&&($n(i,e,a),Eo(i,e,a))}};function p0(e,i,a,o,u,h,M){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,M):i.prototype&&i.prototype.isPureReactComponent?!mo(a,o)||!mo(u,h):!0}function m0(e,i,a,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,o),i.state!==e&&Lf.enqueueReplaceState(i,i.state,null)}function As(e,i){var a=i;if("ref"in i){a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}if(e=e.defaultProps){a===i&&(a=g({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function g0(e){Sl(e)}function v0(e){console.error(e)}function x0(e){Sl(e)}function kl(e,i){try{var a=e.onUncaughtError;a(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function _0(e,i,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Uf(e,i,a){return a=Ia(a),a.tag=3,a.payload={element:null},a.callback=function(){kl(e,i)},a}function S0(e){return e=Ia(e),e.tag=3,e}function M0(e,i,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){_0(i,a,o)}}var M=a.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(e.callback=function(){_0(i,a,o),typeof u!="function"&&(Wa===null?Wa=new Set([this]):Wa.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function qS(e,i,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=a.alternate,i!==null&&ar(i,a,u,!0),a=si.current,a!==null){switch(a.tag){case 31:case 13:return Ei===null?ec():a.alternate===null&&ln===0&&(ln=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Dl?a.flags|=16384:(i=a.updateQueue,i===null?a.updateQueue=new Set([o]):i.add(o),ih(e,o,u)),!1;case 22:return a.flags|=65536,o===Dl?a.flags|=16384:(i=a.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=i):(a=i.retryQueue,a===null?i.retryQueue=new Set([o]):a.add(o)),ih(e,o,u)),!1}throw Error(s(435,a.tag))}return ih(e,o,u),ec(),!1}if(be)return i=si.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==Ku&&(e=Error(s(422),{cause:o}),xo(_i(e,a)))):(o!==Ku&&(i=Error(s(423),{cause:o}),xo(_i(i,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=_i(o,a),u=Uf(e.stateNode,o,u),lf(e,u),ln!==4&&(ln=2)),!1;var h=Error(s(520),{cause:o});if(h=_i(h,a),Bo===null?Bo=[h]:Bo.push(h),ln!==4&&(ln=2),i===null)return!0;o=_i(o,a),a=i;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=Uf(a.stateNode,o,e),lf(a,e),!1;case 1:if(i=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Wa===null||!Wa.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=S0(u),M0(u,e,a,o),lf(a,u),!1}a=a.return}while(a!==null);return!1}var Nf=Error(s(461)),dn=!1;function On(e,i,a,o){i.child=e===null?bm(i,null,a,o):Ts(i,e.child,a,o)}function y0(e,i,a,o,u){a=a.render;var h=i.ref;if("ref"in o){var M={};for(var b in o)b!=="ref"&&(M[b]=o[b])}else M=o;return Ss(i),o=pf(e,i,a,M,h,u),b=mf(),e!==null&&!dn?(gf(e,i,u),la(e,i,u)):(be&&b&&Yu(i),i.flags|=1,On(e,i,o,u),i.child)}function E0(e,i,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!Wu(h)&&h.defaultProps===void 0&&a.compare===null?(i.tag=15,i.type=h,T0(e,i,h,o,u)):(e=Tl(a.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(h=e.child,!Gf(e,u)){var M=h.memoizedProps;if(a=a.compare,a=a!==null?a:mo,a(M,o)&&e.ref===i.ref)return la(e,i,u)}return i.flags|=1,e=na(h,o),e.ref=i.ref,e.return=i,i.child=e}function T0(e,i,a,o,u){if(e!==null){var h=e.memoizedProps;if(mo(h,o)&&e.ref===i.ref)if(dn=!1,i.pendingProps=o=h,Gf(e,u))(e.flags&131072)!==0&&(dn=!0);else return i.lanes=e.lanes,la(e,i,u)}return Of(e,i,a,o,u)}function b0(e,i,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,i.child=null;return A0(e,i,h,a,o)}if((a&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Rl(i,h!==null?h.cachePool:null),h!==null?Rm(i,h):uf(),Cm(i);else return o=i.lanes=536870912,A0(e,i,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Rl(i,h.cachePool),Rm(i,h),Ga(),i.memoizedState=null):(e!==null&&Rl(i,null),uf(),Ga());return On(e,i,u,a),i.child}function Do(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function A0(e,i,a,o,u){var h=af();return h=h===null?null:{parent:fn._currentValue,pool:h},i.memoizedState={baseLanes:a,cachePool:h},e!==null&&Rl(i,null),uf(),Cm(i),e!==null&&ar(e,i,o,!0),i.childLanes=u,null}function Xl(e,i){return i=ql({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function w0(e,i,a){return Ts(i,e.child,null,a),e=Xl(i,i.pendingProps),e.flags|=2,ri(i),i.memoizedState=null,e}function jS(e,i,a){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(be){if(o.mode==="hidden")return e=Xl(i,o),i.lanes=536870912,Do(null,e);if(hf(i),(e=Ke)?(e=Fg(e,yi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Na!==null?{id:Xi,overflow:Wi}:null,retryLane:536870912,hydrationErrors:null},a=um(e),a.return=i,i.child=a,Un=i,Ke=null)):e=null,e===null)throw Pa(i);return i.lanes=536870912,null}return Xl(i,o)}var h=e.memoizedState;if(h!==null){var M=h.dehydrated;if(hf(i),u)if(i.flags&256)i.flags&=-257,i=w0(e,i,a);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(s(558));else if(dn||ar(e,i,a,!1),u=(a&e.childLanes)!==0,dn||u){if(o=Ye,o!==null&&(M=ki(o,a),M!==0&&M!==h.retryLane))throw h.retryLane=M,gs(e,M),$n(o,e,M),Nf;ec(),i=w0(e,i,a)}else e=h.treeContext,Ke=Ti(M.nextSibling),Un=i,be=!0,Oa=null,yi=!1,e!==null&&dm(i,e),i=Xl(i,o),i.flags|=4096;return i}return e=na(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Wl(e,i){var a=i.ref;if(a===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(i.flags|=4194816)}}function Of(e,i,a,o,u){return Ss(i),a=pf(e,i,a,o,void 0,u),o=mf(),e!==null&&!dn?(gf(e,i,u),la(e,i,u)):(be&&o&&Yu(i),i.flags|=1,On(e,i,a,u),i.child)}function R0(e,i,a,o,u,h){return Ss(i),i.updateQueue=null,a=Lm(i,o,a,u),Dm(e),o=mf(),e!==null&&!dn?(gf(e,i,h),la(e,i,h)):(be&&o&&Yu(i),i.flags|=1,On(e,i,a,h),i.child)}function C0(e,i,a,o,u){if(Ss(i),i.stateNode===null){var h=tr,M=a.contextType;typeof M=="object"&&M!==null&&(h=Nn(M)),h=new a(o,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Lf,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=o,h.state=i.memoizedState,h.refs={},rf(i),M=a.contextType,h.context=typeof M=="object"&&M!==null?Nn(M):tr,h.state=i.memoizedState,M=a.getDerivedStateFromProps,typeof M=="function"&&(Df(i,a,M,o),h.state=i.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(M=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),M!==h.state&&Lf.enqueueReplaceState(h,h.state,null),bo(i,o,h,u),To(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){h=i.stateNode;var b=i.memoizedProps,I=As(a,b);h.props=I;var $=h.context,ut=a.contextType;M=tr,typeof ut=="object"&&ut!==null&&(M=Nn(ut));var vt=a.getDerivedStateFromProps;ut=typeof vt=="function"||typeof h.getSnapshotBeforeUpdate=="function",b=i.pendingProps!==b,ut||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(b||$!==M)&&m0(i,h,o,M),Ba=!1;var tt=i.memoizedState;h.state=tt,bo(i,o,h,u),To(),$=i.memoizedState,b||tt!==$||Ba?(typeof vt=="function"&&(Df(i,a,vt,o),$=i.memoizedState),(I=Ba||p0(i,a,I,o,tt,$,M))?(ut||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=$),h.props=o,h.state=$,h.context=M,o=I):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{h=i.stateNode,of(e,i),M=i.memoizedProps,ut=As(a,M),h.props=ut,vt=i.pendingProps,tt=h.context,$=a.contextType,I=tr,typeof $=="object"&&$!==null&&(I=Nn($)),b=a.getDerivedStateFromProps,($=typeof b=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(M!==vt||tt!==I)&&m0(i,h,o,I),Ba=!1,tt=i.memoizedState,h.state=tt,bo(i,o,h,u),To();var ot=i.memoizedState;M!==vt||tt!==ot||Ba||e!==null&&e.dependencies!==null&&Al(e.dependencies)?(typeof b=="function"&&(Df(i,a,b,o),ot=i.memoizedState),(ut=Ba||p0(i,a,ut,o,tt,ot,I)||e!==null&&e.dependencies!==null&&Al(e.dependencies))?($||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ot,I),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ot,I)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||M===e.memoizedProps&&tt===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&tt===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=ot),h.props=o,h.state=ot,h.context=I,o=ut):(typeof h.componentDidUpdate!="function"||M===e.memoizedProps&&tt===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&tt===e.memoizedState||(i.flags|=1024),o=!1)}return h=o,Wl(e,i),o=(i.flags&128)!==0,h||o?(h=i.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,e!==null&&o?(i.child=Ts(i,e.child,null,u),i.child=Ts(i,null,a,u)):On(e,i,a,u),i.memoizedState=h.state,e=i.child):e=la(e,i,u),e}function D0(e,i,a,o){return xs(),i.flags|=256,On(e,i,a,o),i.child}var Pf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function zf(e){return{baseLanes:e,cachePool:_m()}}function Bf(e,i,a){return e=e!==null?e.childLanes&~a:0,i&&(e|=li),e}function L0(e,i,a){var o=i.pendingProps,u=!1,h=(i.flags&128)!==0,M;if((M=h)||(M=e!==null&&e.memoizedState===null?!1:(cn.current&2)!==0),M&&(u=!0,i.flags&=-129),M=(i.flags&32)!==0,i.flags&=-33,e===null){if(be){if(u?Ha(i):Ga(),(e=Ke)?(e=Fg(e,yi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Na!==null?{id:Xi,overflow:Wi}:null,retryLane:536870912,hydrationErrors:null},a=um(e),a.return=i,i.child=a,Un=i,Ke=null)):e=null,e===null)throw Pa(i);return _h(e)?i.lanes=32:i.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Ga(),u=i.mode,b=ql({mode:"hidden",children:b},u),o=vs(o,u,a,null),b.return=i,o.return=i,b.sibling=o,i.child=b,o=i.child,o.memoizedState=zf(a),o.childLanes=Bf(e,M,a),i.memoizedState=Pf,Do(null,o)):(Ha(i),If(i,b))}var I=e.memoizedState;if(I!==null&&(b=I.dehydrated,b!==null)){if(h)i.flags&256?(Ha(i),i.flags&=-257,i=Ff(e,i,a)):i.memoizedState!==null?(Ga(),i.child=e.child,i.flags|=128,i=null):(Ga(),b=o.fallback,u=i.mode,o=ql({mode:"visible",children:o.children},u),b=vs(b,u,a,null),b.flags|=2,o.return=i,b.return=i,o.sibling=b,i.child=o,Ts(i,e.child,null,a),o=i.child,o.memoizedState=zf(a),o.childLanes=Bf(e,M,a),i.memoizedState=Pf,i=Do(null,o));else if(Ha(i),_h(b)){if(M=b.nextSibling&&b.nextSibling.dataset,M)var $=M.dgst;M=$,o=Error(s(419)),o.stack="",o.digest=M,xo({value:o,source:null,stack:null}),i=Ff(e,i,a)}else if(dn||ar(e,i,a,!1),M=(a&e.childLanes)!==0,dn||M){if(M=Ye,M!==null&&(o=ki(M,a),o!==0&&o!==I.retryLane))throw I.retryLane=o,gs(e,o),$n(M,e,o),Nf;xh(b)||ec(),i=Ff(e,i,a)}else xh(b)?(i.flags|=192,i.child=e.child,i=null):(e=I.treeContext,Ke=Ti(b.nextSibling),Un=i,be=!0,Oa=null,yi=!1,e!==null&&dm(i,e),i=If(i,o.children),i.flags|=4096);return i}return u?(Ga(),b=o.fallback,u=i.mode,I=e.child,$=I.sibling,o=na(I,{mode:"hidden",children:o.children}),o.subtreeFlags=I.subtreeFlags&65011712,$!==null?b=na($,b):(b=vs(b,u,a,null),b.flags|=2),b.return=i,o.return=i,o.sibling=b,i.child=o,Do(null,o),o=i.child,b=e.child.memoizedState,b===null?b=zf(a):(u=b.cachePool,u!==null?(I=fn._currentValue,u=u.parent!==I?{parent:I,pool:I}:u):u=_m(),b={baseLanes:b.baseLanes|a,cachePool:u}),o.memoizedState=b,o.childLanes=Bf(e,M,a),i.memoizedState=Pf,Do(e.child,o)):(Ha(i),a=e.child,e=a.sibling,a=na(a,{mode:"visible",children:o.children}),a.return=i,a.sibling=null,e!==null&&(M=i.deletions,M===null?(i.deletions=[e],i.flags|=16):M.push(e)),i.child=a,i.memoizedState=null,a)}function If(e,i){return i=ql({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function ql(e,i){return e=ai(22,e,null,i),e.lanes=0,e}function Ff(e,i,a){return Ts(i,e.child,null,a),e=If(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function U0(e,i,a){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),$u(e.return,i,a)}function Hf(e,i,a,o,u,h){var M=e.memoizedState;M===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(M.isBackwards=i,M.rendering=null,M.renderingStartTime=0,M.last=o,M.tail=a,M.tailMode=u,M.treeForkCount=h)}function N0(e,i,a){var o=i.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var M=cn.current,b=(M&2)!==0;if(b?(M=M&1|2,i.flags|=128):M&=1,St(cn,M),On(e,i,o,a),o=be?vo:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&U0(e,a,i);else if(e.tag===19)U0(e,a,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=i.child,u=null;a!==null;)e=a.alternate,e!==null&&Ol(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=i.child,i.child=null):(u=a.sibling,a.sibling=null),Hf(i,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&Ol(e)===null){i.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Hf(i,!0,a,null,h,o);break;case"together":Hf(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function la(e,i,a){if(e!==null&&(i.dependencies=e.dependencies),Xa|=i.lanes,(a&i.childLanes)===0)if(e!==null){if(ar(e,i,a,!1),(a&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(s(153));if(i.child!==null){for(e=i.child,a=na(e,e.pendingProps),i.child=a,a.return=i;e.sibling!==null;)e=e.sibling,a=a.sibling=na(e,e.pendingProps),a.return=i;a.sibling=null}return i.child}function Gf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Al(e)))}function YS(e,i,a){switch(i.tag){case 3:Gt(i,i.stateNode.containerInfo),za(i,fn,e.memoizedState.cache),xs();break;case 27:case 5:oe(i);break;case 4:Gt(i,i.stateNode.containerInfo);break;case 10:za(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,hf(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ha(i),i.flags|=128,null):(a&i.child.childLanes)!==0?L0(e,i,a):(Ha(i),e=la(e,i,a),e!==null?e.sibling:null);Ha(i);break;case 19:var u=(e.flags&128)!==0;if(o=(a&i.childLanes)!==0,o||(ar(e,i,a,!1),o=(a&i.childLanes)!==0),u){if(o)return N0(e,i,a);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),St(cn,cn.current),o)break;return null;case 22:return i.lanes=0,b0(e,i,a,i.pendingProps);case 24:za(i,fn,e.memoizedState.cache)}return la(e,i,a)}function O0(e,i,a){if(e!==null)if(e.memoizedProps!==i.pendingProps)dn=!0;else{if(!Gf(e,a)&&(i.flags&128)===0)return dn=!1,YS(e,i,a);dn=(e.flags&131072)!==0}else dn=!1,be&&(i.flags&1048576)!==0&&hm(i,vo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=ys(i.elementType),i.type=e,typeof e=="function")Wu(e)?(o=As(e,o),i.tag=1,i=C0(null,i,e,o,a)):(i.tag=0,i=Of(null,i,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===A){i.tag=11,i=y0(null,i,e,o,a);break t}else if(u===O){i.tag=14,i=E0(null,i,e,o,a);break t}}throw i=ht(e)||e,Error(s(306,i,""))}}return i;case 0:return Of(e,i,i.type,i.pendingProps,a);case 1:return o=i.type,u=As(o,i.pendingProps),C0(e,i,o,u,a);case 3:t:{if(Gt(i,i.stateNode.containerInfo),e===null)throw Error(s(387));o=i.pendingProps;var h=i.memoizedState;u=h.element,of(e,i),bo(i,o,null,a);var M=i.memoizedState;if(o=M.cache,za(i,fn,o),o!==h.cache&&tf(i,[fn],a,!0),To(),o=M.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:M.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=D0(e,i,o,a);break t}else if(o!==u){u=_i(Error(s(424)),i),xo(u),i=D0(e,i,o,a);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ke=Ti(e.firstChild),Un=i,be=!0,Oa=null,yi=!0,a=bm(i,null,o,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(xs(),o===u){i=la(e,i,a);break t}On(e,i,o,a)}i=i.child}return i;case 26:return Wl(e,i),e===null?(a=Wg(i.type,null,i.pendingProps,null))?i.memoizedState=a:be||(a=i.type,e=i.pendingProps,o=lc(Et.current).createElement(a),o[rn]=i,o[Dn]=e,Pn(o,a,e),Dt(o),i.stateNode=o):i.memoizedState=Wg(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return oe(i),e===null&&be&&(o=i.stateNode=Vg(i.type,i.pendingProps,Et.current),Un=i,yi=!0,u=Ke,Za(i.type)?(Sh=u,Ke=Ti(o.firstChild)):Ke=u),On(e,i,i.pendingProps.children,a),Wl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&be&&((u=o=Ke)&&(o=TM(o,i.type,i.pendingProps,yi),o!==null?(i.stateNode=o,Un=i,Ke=Ti(o.firstChild),yi=!1,u=!0):u=!1),u||Pa(i)),oe(i),u=i.type,h=i.pendingProps,M=e!==null?e.memoizedProps:null,o=h.children,mh(u,h)?o=null:M!==null&&mh(u,M)&&(i.flags|=32),i.memoizedState!==null&&(u=pf(e,i,FS,null,null,a),Wo._currentValue=u),Wl(e,i),On(e,i,o,a),i.child;case 6:return e===null&&be&&((e=a=Ke)&&(a=bM(a,i.pendingProps,yi),a!==null?(i.stateNode=a,Un=i,Ke=null,e=!0):e=!1),e||Pa(i)),null;case 13:return L0(e,i,a);case 4:return Gt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=Ts(i,null,o,a):On(e,i,o,a),i.child;case 11:return y0(e,i,i.type,i.pendingProps,a);case 7:return On(e,i,i.pendingProps,a),i.child;case 8:return On(e,i,i.pendingProps.children,a),i.child;case 12:return On(e,i,i.pendingProps.children,a),i.child;case 10:return o=i.pendingProps,za(i,i.type,o.value),On(e,i,o.children,a),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,Ss(i),u=Nn(u),o=o(u),i.flags|=1,On(e,i,o,a),i.child;case 14:return E0(e,i,i.type,i.pendingProps,a);case 15:return T0(e,i,i.type,i.pendingProps,a);case 19:return N0(e,i,a);case 31:return jS(e,i,a);case 22:return b0(e,i,a,i.pendingProps);case 24:return Ss(i),o=Nn(fn),e===null?(u=af(),u===null&&(u=Ye,h=ef(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),i.memoizedState={parent:o,cache:u},rf(i),za(i,fn,u)):((e.lanes&a)!==0&&(of(e,i),bo(i,null,null,a),To()),u=e.memoizedState,h=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),za(i,fn,o)):(o=h.cache,za(i,fn,o),o!==u.cache&&tf(i,[fn],a,!0))),On(e,i,i.pendingProps.children,a),i.child;case 29:throw i.pendingProps}throw Error(s(156,i.tag))}function ca(e){e.flags|=4}function Vf(e,i,a,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(og())e.flags|=8192;else throw Es=Dl,sf}else e.flags&=-16777217}function P0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Kg(i))if(og())e.flags|=8192;else throw Es=Dl,sf}function jl(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?vn():536870912,e.lanes|=i,gr|=i)}function Lo(e,i){if(!be)switch(e.tailMode){case"hidden":i=e.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Qe(e){var i=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(i)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,i}function ZS(e,i,a){var o=i.pendingProps;switch(Zu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(i),null;case 1:return Qe(i),null;case 3:return a=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),sa(fn),Ht(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ir(i)?ca(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Qu())),Qe(i),null;case 26:var u=i.type,h=i.memoizedState;return e===null?(ca(i),h!==null?(Qe(i),P0(i,h)):(Qe(i),Vf(i,u,null,o,a))):h?h!==e.memoizedState?(ca(i),Qe(i),P0(i,h)):(Qe(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&ca(i),Qe(i),Vf(i,u,e,o,a)),null;case 27:if(Ge(i),a=Et.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ca(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Qe(i),null}e=Z.current,ir(i)?pm(i):(e=Vg(u,o,a),i.stateNode=e,ca(i))}return Qe(i),null;case 5:if(Ge(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ca(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Qe(i),null}if(h=Z.current,ir(i))pm(i);else{var M=lc(Et.current);switch(h){case 1:h=M.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=M.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=M.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=M.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=M.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?M.createElement("select",{is:o.is}):M.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?M.createElement(u,{is:o.is}):M.createElement(u)}}h[rn]=i,h[Dn]=o;t:for(M=i.child;M!==null;){if(M.tag===5||M.tag===6)h.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===i)break t;for(;M.sibling===null;){if(M.return===null||M.return===i)break t;M=M.return}M.sibling.return=M.return,M=M.sibling}i.stateNode=h;t:switch(Pn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ca(i)}}return Qe(i),Vf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,a),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&ca(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(s(166));if(e=Et.current,ir(i)){if(e=i.stateNode,a=i.memoizedProps,o=null,u=Un,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[rn]=i,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||Lg(e.nodeValue,a)),e||Pa(i,!0)}else e=lc(e).createTextNode(o),e[rn]=i,i.stateNode=e}return Qe(i),null;case 31:if(a=i.memoizedState,e===null||e.memoizedState!==null){if(o=ir(i),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[rn]=i}else xs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),e=!1}else a=Qu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return i.flags&256?(ri(i),i):(ri(i),null);if((i.flags&128)!==0)throw Error(s(558))}return Qe(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ir(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[rn]=i}else xs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),u=!1}else u=Qu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(ri(i),i):(ri(i),null)}return ri(i),(i.flags&128)!==0?(i.lanes=a,i):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(i.child.flags|=8192),jl(i,i.updateQueue),Qe(i),null);case 4:return Ht(),e===null&&uh(i.stateNode.containerInfo),Qe(i),null;case 10:return sa(i.type),Qe(i),null;case 19:if(it(cn),o=i.memoizedState,o===null)return Qe(i),null;if(u=(i.flags&128)!==0,h=o.rendering,h===null)if(u)Lo(o,!1);else{if(ln!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(h=Ol(e),h!==null){for(i.flags|=128,Lo(o,!1),e=h.updateQueue,i.updateQueue=e,jl(i,e),i.subtreeFlags=0,e=a,a=i.child;a!==null;)cm(a,e),a=a.sibling;return St(cn,cn.current&1|2),be&&ia(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&dt()>Jl&&(i.flags|=128,u=!0,Lo(o,!1),i.lanes=4194304)}else{if(!u)if(e=Ol(h),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,jl(i,e),Lo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!be)return Qe(i),null}else 2*dt()-o.renderingStartTime>Jl&&a!==536870912&&(i.flags|=128,u=!0,Lo(o,!1),i.lanes=4194304);o.isBackwards?(h.sibling=i.child,i.child=h):(e=o.last,e!==null?e.sibling=h:i.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=dt(),e.sibling=null,a=cn.current,St(cn,u?a&1|2:a&1),be&&ia(i,o.treeForkCount),e):(Qe(i),null);case 22:case 23:return ri(i),ff(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(a&536870912)!==0&&(i.flags&128)===0&&(Qe(i),i.subtreeFlags&6&&(i.flags|=8192)):Qe(i),a=i.updateQueue,a!==null&&jl(i,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==a&&(i.flags|=2048),e!==null&&it(Ms),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),i.memoizedState.cache!==a&&(i.flags|=2048),sa(fn),Qe(i),null;case 25:return null;case 30:return null}throw Error(s(156,i.tag))}function KS(e,i){switch(Zu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return sa(fn),Ht(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Ge(i),null;case 31:if(i.memoizedState!==null){if(ri(i),i.alternate===null)throw Error(s(340));xs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(ri(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(s(340));xs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return it(cn),null;case 4:return Ht(),null;case 10:return sa(i.type),null;case 22:case 23:return ri(i),ff(),e!==null&&it(Ms),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return sa(fn),null;case 25:return null;default:return null}}function z0(e,i){switch(Zu(i),i.tag){case 3:sa(fn),Ht();break;case 26:case 27:case 5:Ge(i);break;case 4:Ht();break;case 31:i.memoizedState!==null&&ri(i);break;case 13:ri(i);break;case 19:it(cn);break;case 10:sa(i.type);break;case 22:case 23:ri(i),ff(),e!==null&&it(Ms);break;case 24:sa(fn)}}function Uo(e,i){try{var a=i.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,M=a.inst;o=h(),M.destroy=o}a=a.next}while(a!==u)}}catch(b){Fe(i,i.return,b)}}function Va(e,i,a){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var M=o.inst,b=M.destroy;if(b!==void 0){M.destroy=void 0,u=i;var I=a,$=b;try{$()}catch(ut){Fe(u,I,ut)}}}o=o.next}while(o!==h)}}catch(ut){Fe(i,i.return,ut)}}function B0(e){var i=e.updateQueue;if(i!==null){var a=e.stateNode;try{wm(i,a)}catch(o){Fe(e,e.return,o)}}}function I0(e,i,a){a.props=As(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Fe(e,i,o)}}function No(e,i){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Fe(e,i,u)}}function qi(e,i){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Fe(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Fe(e,i,u)}else a.current=null}function F0(e){var i=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Fe(e,e.return,u)}}function kf(e,i,a){try{var o=e.stateNode;xM(o,e.type,a,i),o[Dn]=i}catch(u){Fe(e,e.return,u)}}function H0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Za(e.type)||e.tag===4}function Xf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||H0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Za(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Wf(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,i):(i=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,i.appendChild(e),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=ta));else if(o!==4&&(o===27&&Za(e.type)&&(a=e.stateNode,i=null),e=e.child,e!==null))for(Wf(e,i,a),e=e.sibling;e!==null;)Wf(e,i,a),e=e.sibling}function Yl(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?a.insertBefore(e,i):a.appendChild(e);else if(o!==4&&(o===27&&Za(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Yl(e,i,a),e=e.sibling;e!==null;)Yl(e,i,a),e=e.sibling}function G0(e){var i=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Pn(i,o,a),i[rn]=e,i[Dn]=a}catch(h){Fe(e,e.return,h)}}var ua=!1,pn=!1,qf=!1,V0=typeof WeakSet=="function"?WeakSet:Set,En=null;function QS(e,i){if(e=e.containerInfo,dh=mc,e=tm(e),Iu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var M=0,b=-1,I=-1,$=0,ut=0,vt=e,tt=null;e:for(;;){for(var ot;vt!==a||u!==0&&vt.nodeType!==3||(b=M+u),vt!==h||o!==0&&vt.nodeType!==3||(I=M+o),vt.nodeType===3&&(M+=vt.nodeValue.length),(ot=vt.firstChild)!==null;)tt=vt,vt=ot;for(;;){if(vt===e)break e;if(tt===a&&++$===u&&(b=M),tt===h&&++ut===o&&(I=M),(ot=vt.nextSibling)!==null)break;vt=tt,tt=vt.parentNode}vt=ot}a=b===-1||I===-1?null:{start:b,end:I}}else a=null}a=a||{start:0,end:0}}else a=null;for(ph={focusedElem:e,selectionRange:a},mc=!1,En=i;En!==null;)if(i=En,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,En=e;else for(;En!==null;){switch(i=En,h=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=i,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var Ft=As(a.type,u);e=o.getSnapshotBeforeUpdate(Ft,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){Fe(a,a.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,a=e.nodeType,a===9)vh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":vh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=i.sibling,e!==null){e.return=i.return,En=e;break}En=i.return}}function k0(e,i,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ha(e,a),o&4&&Uo(5,a);break;case 1:if(ha(e,a),o&4)if(e=a.stateNode,i===null)try{e.componentDidMount()}catch(M){Fe(a,a.return,M)}else{var u=As(a.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(M){Fe(a,a.return,M)}}o&64&&B0(a),o&512&&No(a,a.return);break;case 3:if(ha(e,a),o&64&&(e=a.updateQueue,e!==null)){if(i=null,a.child!==null)switch(a.child.tag){case 27:case 5:i=a.child.stateNode;break;case 1:i=a.child.stateNode}try{wm(e,i)}catch(M){Fe(a,a.return,M)}}break;case 27:i===null&&o&4&&G0(a);case 26:case 5:ha(e,a),i===null&&o&4&&F0(a),o&512&&No(a,a.return);break;case 12:ha(e,a);break;case 31:ha(e,a),o&4&&q0(e,a);break;case 13:ha(e,a),o&4&&j0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=rM.bind(null,a),AM(e,a))));break;case 22:if(o=a.memoizedState!==null||ua,!o){i=i!==null&&i.memoizedState!==null||pn,u=ua;var h=pn;ua=o,(pn=i)&&!h?da(e,a,(a.subtreeFlags&8772)!==0):ha(e,a),ua=u,pn=h}break;case 30:break;default:ha(e,a)}}function X0(e){var i=e.alternate;i!==null&&(e.alternate=null,X0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&rt(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var en=null,Zn=!1;function fa(e,i,a){for(a=a.child;a!==null;)W0(e,i,a),a=a.sibling}function W0(e,i,a){if(jt&&typeof jt.onCommitFiberUnmount=="function")try{jt.onCommitFiberUnmount(Kt,a)}catch{}switch(a.tag){case 26:pn||qi(a,i),fa(e,i,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:pn||qi(a,i);var o=en,u=Zn;Za(a.type)&&(en=a.stateNode,Zn=!1),fa(e,i,a),Vo(a.stateNode),en=o,Zn=u;break;case 5:pn||qi(a,i);case 6:if(o=en,u=Zn,en=null,fa(e,i,a),en=o,Zn=u,en!==null)if(Zn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(a.stateNode)}catch(h){Fe(a,i,h)}else try{en.removeChild(a.stateNode)}catch(h){Fe(a,i,h)}break;case 18:en!==null&&(Zn?(e=en,Bg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Tr(e)):Bg(en,a.stateNode));break;case 4:o=en,u=Zn,en=a.stateNode.containerInfo,Zn=!0,fa(e,i,a),en=o,Zn=u;break;case 0:case 11:case 14:case 15:Va(2,a,i),pn||Va(4,a,i),fa(e,i,a);break;case 1:pn||(qi(a,i),o=a.stateNode,typeof o.componentWillUnmount=="function"&&I0(a,i,o)),fa(e,i,a);break;case 21:fa(e,i,a);break;case 22:pn=(o=pn)||a.memoizedState!==null,fa(e,i,a),pn=o;break;default:fa(e,i,a)}}function q0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Tr(e)}catch(a){Fe(i,i.return,a)}}}function j0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Tr(e)}catch(a){Fe(i,i.return,a)}}function JS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new V0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new V0),i;default:throw Error(s(435,e.tag))}}function Zl(e,i){var a=JS(e);i.forEach(function(o){if(!a.has(o)){a.add(o);var u=oM.bind(null,e,o);o.then(u,u)}})}function Kn(e,i){var a=i.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,M=i,b=M;t:for(;b!==null;){switch(b.tag){case 27:if(Za(b.type)){en=b.stateNode,Zn=!1;break t}break;case 5:en=b.stateNode,Zn=!1;break t;case 3:case 4:en=b.stateNode.containerInfo,Zn=!0;break t}b=b.return}if(en===null)throw Error(s(160));W0(h,M,u),en=null,Zn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)Y0(i,e),i=i.sibling}var Pi=null;function Y0(e,i){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Kn(i,e),Qn(e),o&4&&(Va(3,e,e.return),Uo(3,e),Va(5,e,e.return));break;case 1:Kn(i,e),Qn(e),o&512&&(pn||a===null||qi(a,a.return)),o&64&&ua&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Pi;if(Kn(i,e),Qn(e),o&512&&(pn||a===null||qi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[W]||h[rn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Pn(h,o,a),h[rn]=e,Dt(h),o=h;break t;case"link":var M=Yg("link","href",u).get(o+(a.href||""));if(M){for(var b=0;b<M.length;b++)if(h=M[b],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){M.splice(b,1);break e}}h=u.createElement(o),Pn(h,o,a),u.head.appendChild(h);break;case"meta":if(M=Yg("meta","content",u).get(o+(a.content||""))){for(b=0;b<M.length;b++)if(h=M[b],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){M.splice(b,1);break e}}h=u.createElement(o),Pn(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[rn]=e,Dt(h),o=h}e.stateNode=o}else Zg(u,e.type,e.stateNode);else e.stateNode=jg(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?Zg(u,e.type,e.stateNode):jg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&kf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Kn(i,e),Qn(e),o&512&&(pn||a===null||qi(a,a.return)),a!==null&&o&4&&kf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Kn(i,e),Qn(e),o&512&&(pn||a===null||qi(a,a.return)),e.flags&32){u=e.stateNode;try{js(u,"")}catch(Ft){Fe(e,e.return,Ft)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,kf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(qf=!0);break;case 6:if(Kn(i,e),Qn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Ft){Fe(e,e.return,Ft)}}break;case 3:if(fc=null,u=Pi,Pi=cc(i.containerInfo),Kn(i,e),Pi=u,Qn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Tr(i.containerInfo)}catch(Ft){Fe(e,e.return,Ft)}qf&&(qf=!1,Z0(e));break;case 4:o=Pi,Pi=cc(e.stateNode.containerInfo),Kn(i,e),Qn(e),Pi=o;break;case 12:Kn(i,e),Qn(e);break;case 31:Kn(i,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Zl(e,o)));break;case 13:Kn(i,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Ql=dt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Zl(e,o)));break;case 22:u=e.memoizedState!==null;var I=a!==null&&a.memoizedState!==null,$=ua,ut=pn;if(ua=$||u,pn=ut||I,Kn(i,e),pn=ut,ua=$,Qn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(a===null||I||ua||pn||ws(e)),a=null,i=e;;){if(i.tag===5||i.tag===26){if(a===null){I=a=i;try{if(h=I.stateNode,u)M=h.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{b=I.stateNode;var vt=I.memoizedProps.style,tt=vt!=null&&vt.hasOwnProperty("display")?vt.display:null;b.style.display=tt==null||typeof tt=="boolean"?"":(""+tt).trim()}}catch(Ft){Fe(I,I.return,Ft)}}}else if(i.tag===6){if(a===null){I=i;try{I.stateNode.nodeValue=u?"":I.memoizedProps}catch(Ft){Fe(I,I.return,Ft)}}}else if(i.tag===18){if(a===null){I=i;try{var ot=I.stateNode;u?Ig(ot,!0):Ig(I.stateNode,!1)}catch(Ft){Fe(I,I.return,Ft)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;a===i&&(a=null),i=i.return}a===i&&(a=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Zl(e,a))));break;case 19:Kn(i,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Zl(e,o)));break;case 30:break;case 21:break;default:Kn(i,e),Qn(e)}}function Qn(e){var i=e.flags;if(i&2){try{for(var a,o=e.return;o!==null;){if(H0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=Xf(e);Yl(e,h,u);break;case 5:var M=a.stateNode;a.flags&32&&(js(M,""),a.flags&=-33);var b=Xf(e);Yl(e,b,M);break;case 3:case 4:var I=a.stateNode.containerInfo,$=Xf(e);Wf(e,$,I);break;default:throw Error(s(161))}}catch(ut){Fe(e,e.return,ut)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function Z0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;Z0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function ha(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)k0(e,i.alternate,i),i=i.sibling}function ws(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Va(4,i,i.return),ws(i);break;case 1:qi(i,i.return);var a=i.stateNode;typeof a.componentWillUnmount=="function"&&I0(i,i.return,a),ws(i);break;case 27:Vo(i.stateNode);case 26:case 5:qi(i,i.return),ws(i);break;case 22:i.memoizedState===null&&ws(i);break;case 30:ws(i);break;default:ws(i)}e=e.sibling}}function da(e,i,a){for(a=a&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,h=i,M=h.flags;switch(h.tag){case 0:case 11:case 15:da(u,h,a),Uo(4,h);break;case 1:if(da(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch($){Fe(o,o.return,$)}if(o=h,u=o.updateQueue,u!==null){var b=o.stateNode;try{var I=u.shared.hiddenCallbacks;if(I!==null)for(u.shared.hiddenCallbacks=null,u=0;u<I.length;u++)Am(I[u],b)}catch($){Fe(o,o.return,$)}}a&&M&64&&B0(h),No(h,h.return);break;case 27:G0(h);case 26:case 5:da(u,h,a),a&&o===null&&M&4&&F0(h),No(h,h.return);break;case 12:da(u,h,a);break;case 31:da(u,h,a),a&&M&4&&q0(u,h);break;case 13:da(u,h,a),a&&M&4&&j0(u,h);break;case 22:h.memoizedState===null&&da(u,h,a),No(h,h.return);break;case 30:break;default:da(u,h,a)}i=i.sibling}}function jf(e,i){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&_o(a))}function Yf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&_o(e))}function zi(e,i,a,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)K0(e,i,a,o),i=i.sibling}function K0(e,i,a,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:zi(e,i,a,o),u&2048&&Uo(9,i);break;case 1:zi(e,i,a,o);break;case 3:zi(e,i,a,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&_o(e)));break;case 12:if(u&2048){zi(e,i,a,o),e=i.stateNode;try{var h=i.memoizedProps,M=h.id,b=h.onPostCommit;typeof b=="function"&&b(M,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(I){Fe(i,i.return,I)}}else zi(e,i,a,o);break;case 31:zi(e,i,a,o);break;case 13:zi(e,i,a,o);break;case 23:break;case 22:h=i.stateNode,M=i.alternate,i.memoizedState!==null?h._visibility&2?zi(e,i,a,o):Oo(e,i):h._visibility&2?zi(e,i,a,o):(h._visibility|=2,dr(e,i,a,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&jf(M,i);break;case 24:zi(e,i,a,o),u&2048&&Yf(i.alternate,i);break;default:zi(e,i,a,o)}}function dr(e,i,a,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=e,M=i,b=a,I=o,$=M.flags;switch(M.tag){case 0:case 11:case 15:dr(h,M,b,I,u),Uo(8,M);break;case 23:break;case 22:var ut=M.stateNode;M.memoizedState!==null?ut._visibility&2?dr(h,M,b,I,u):Oo(h,M):(ut._visibility|=2,dr(h,M,b,I,u)),u&&$&2048&&jf(M.alternate,M);break;case 24:dr(h,M,b,I,u),u&&$&2048&&Yf(M.alternate,M);break;default:dr(h,M,b,I,u)}i=i.sibling}}function Oo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var a=e,o=i,u=o.flags;switch(o.tag){case 22:Oo(a,o),u&2048&&jf(o.alternate,o);break;case 24:Oo(a,o),u&2048&&Yf(o.alternate,o);break;default:Oo(a,o)}i=i.sibling}}var Po=8192;function pr(e,i,a){if(e.subtreeFlags&Po)for(e=e.child;e!==null;)Q0(e,i,a),e=e.sibling}function Q0(e,i,a){switch(e.tag){case 26:pr(e,i,a),e.flags&Po&&e.memoizedState!==null&&IM(a,Pi,e.memoizedState,e.memoizedProps);break;case 5:pr(e,i,a);break;case 3:case 4:var o=Pi;Pi=cc(e.stateNode.containerInfo),pr(e,i,a),Pi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Po,Po=16777216,pr(e,i,a),Po=o):pr(e,i,a));break;default:pr(e,i,a)}}function J0(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function zo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];En=o,tg(o,e)}J0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)$0(e),e=e.sibling}function $0(e){switch(e.tag){case 0:case 11:case 15:zo(e),e.flags&2048&&Va(9,e,e.return);break;case 3:zo(e);break;case 12:zo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,Kl(e)):zo(e);break;default:zo(e)}}function Kl(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];En=o,tg(o,e)}J0(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Va(8,i,i.return),Kl(i);break;case 22:a=i.stateNode,a._visibility&2&&(a._visibility&=-3,Kl(i));break;default:Kl(i)}e=e.sibling}}function tg(e,i){for(;En!==null;){var a=En;switch(a.tag){case 0:case 11:case 15:Va(8,a,i);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:_o(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,En=o;else t:for(a=e;En!==null;){o=En;var u=o.sibling,h=o.return;if(X0(o),o===a){En=null;break t}if(u!==null){u.return=h,En=u;break t}En=h}}}var $S={getCacheForType:function(e){var i=Nn(fn),a=i.data.get(e);return a===void 0&&(a=e(),i.data.set(e,a)),a},cacheSignal:function(){return Nn(fn).controller.signal}},tM=typeof WeakMap=="function"?WeakMap:Map,Oe=0,Ye=null,ve=null,Me=0,Ie=0,oi=null,ka=!1,mr=!1,Zf=!1,pa=0,ln=0,Xa=0,Rs=0,Kf=0,li=0,gr=0,Bo=null,Jn=null,Qf=!1,Ql=0,eg=0,Jl=1/0,$l=null,Wa=null,_n=0,qa=null,vr=null,ma=0,Jf=0,$f=null,ng=null,Io=0,th=null;function ci(){return(Oe&2)!==0&&Me!==0?Me&-Me:B.T!==null?rh():so()}function ig(){if(li===0)if((Me&536870912)===0||be){var e=lt;lt<<=1,(lt&3932160)===0&&(lt=262144),li=e}else li=536870912;return e=si.current,e!==null&&(e.flags|=32),li}function $n(e,i,a){(e===Ye&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)&&(xr(e,0),ja(e,Me,li,!1)),Cn(e,a),((Oe&2)===0||e!==Ye)&&(e===Ye&&((Oe&2)===0&&(Rs|=a),ln===4&&ja(e,Me,li,!1)),ji(e))}function ag(e,i,a){if((Oe&6)!==0)throw Error(s(327));var o=!a&&(i&127)===0&&(i&e.expiredLanes)===0||ae(e,i),u=o?iM(e,i):nh(e,i,!0),h=o;do{if(u===0){mr&&!o&&ja(e,i,0,!1);break}else{if(a=e.current.alternate,h&&!eM(a)){u=nh(e,i,!1),h=!1;continue}if(u===2){if(h=i,e.errorRecoveryDisabledLanes&h)var M=0;else M=e.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){i=M;t:{var b=e;u=Bo;var I=b.current.memoizedState.isDehydrated;if(I&&(xr(b,M).flags|=256),M=nh(b,M,!1),M!==2){if(Zf&&!I){b.errorRecoveryDisabledLanes|=h,Rs|=h,u=4;break t}h=Jn,Jn=u,h!==null&&(Jn===null?Jn=h:Jn.push.apply(Jn,h))}u=M}if(h=!1,u!==2)continue}}if(u===1){xr(e,0),ja(e,i,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((i&4194048)!==i)break;case 6:ja(o,i,li,!ka);break t;case 2:Jn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((i&62914560)===i&&(u=Ql+300-dt(),10<u)){if(ja(o,i,li,!ka),Ut(o,0,!0)!==0)break t;ma=i,o.timeoutHandle=Pg(sg.bind(null,o,a,Jn,$l,Qf,i,li,Rs,gr,ka,h,"Throttled",-0,0),u);break t}sg(o,a,Jn,$l,Qf,i,li,Rs,gr,ka,h,null,-0,0)}}break}while(!0);ji(e)}function sg(e,i,a,o,u,h,M,b,I,$,ut,vt,tt,ot){if(e.timeoutHandle=-1,vt=i.subtreeFlags,vt&8192||(vt&16785408)===16785408){vt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ta},Q0(i,h,vt);var Ft=(h&62914560)===h?Ql-dt():(h&4194048)===h?eg-dt():0;if(Ft=FM(vt,Ft),Ft!==null){ma=h,e.cancelPendingCommit=Ft(dg.bind(null,e,i,h,a,o,u,M,b,I,ut,vt,null,tt,ot)),ja(e,h,M,!$);return}}dg(e,i,h,a,o,u,M,b,I)}function eM(e){for(var i=e;;){var a=i.tag;if((a===0||a===11||a===15)&&i.flags&16384&&(a=i.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!ii(h(),u))return!1}catch{return!1}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ja(e,i,a,o){i&=~Kf,i&=~Rs,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var h=31-ie(u),M=1<<h;o[h]=-1,u&=~M}a!==0&&io(e,a,i)}function tc(){return(Oe&6)===0?(Fo(0),!1):!0}function eh(){if(ve!==null){if(Ie===0)var e=ve.return;else e=ve,aa=_s=null,vf(e),lr=null,Mo=0,e=ve;for(;e!==null;)z0(e.alternate,e),e=e.return;ve=null}}function xr(e,i){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,MM(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ma=0,eh(),Ye=e,ve=a=na(e.current,null),Me=i,Ie=0,oi=null,ka=!1,mr=ae(e,i),Zf=!1,gr=li=Kf=Rs=Xa=ln=0,Jn=Bo=null,Qf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-ie(o),h=1<<u;i|=e[u],o&=~h}return pa=i,Ml(),a}function rg(e,i){ue=null,B.H=Co,i===or||i===Cl?(i=ym(),Ie=3):i===sf?(i=ym(),Ie=4):Ie=i===Nf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,oi=i,ve===null&&(ln=1,kl(e,_i(i,e.current)))}function og(){var e=si.current;return e===null?!0:(Me&4194048)===Me?Ei===null:(Me&62914560)===Me||(Me&536870912)!==0?e===Ei:!1}function lg(){var e=B.H;return B.H=Co,e===null?Co:e}function cg(){var e=B.A;return B.A=$S,e}function ec(){ln=4,ka||(Me&4194048)!==Me&&si.current!==null||(mr=!0),(Xa&134217727)===0&&(Rs&134217727)===0||Ye===null||ja(Ye,Me,li,!1)}function nh(e,i,a){var o=Oe;Oe|=2;var u=lg(),h=cg();(Ye!==e||Me!==i)&&($l=null,xr(e,i)),i=!1;var M=ln;t:do try{if(Ie!==0&&ve!==null){var b=ve,I=oi;switch(Ie){case 8:eh(),M=6;break t;case 3:case 2:case 9:case 6:si.current===null&&(i=!0);var $=Ie;if(Ie=0,oi=null,_r(e,b,I,$),a&&mr){M=0;break t}break;default:$=Ie,Ie=0,oi=null,_r(e,b,I,$)}}nM(),M=ln;break}catch(ut){rg(e,ut)}while(!0);return i&&e.shellSuspendCounter++,aa=_s=null,Oe=o,B.H=u,B.A=h,ve===null&&(Ye=null,Me=0,Ml()),M}function nM(){for(;ve!==null;)ug(ve)}function iM(e,i){var a=Oe;Oe|=2;var o=lg(),u=cg();Ye!==e||Me!==i?($l=null,Jl=dt()+500,xr(e,i)):mr=ae(e,i);t:do try{if(Ie!==0&&ve!==null){i=ve;var h=oi;e:switch(Ie){case 1:Ie=0,oi=null,_r(e,i,h,1);break;case 2:case 9:if(Sm(h)){Ie=0,oi=null,fg(i);break}i=function(){Ie!==2&&Ie!==9||Ye!==e||(Ie=7),ji(e)},h.then(i,i);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:Sm(h)?(Ie=0,oi=null,fg(i)):(Ie=0,oi=null,_r(e,i,h,7));break;case 5:var M=null;switch(ve.tag){case 26:M=ve.memoizedState;case 5:case 27:var b=ve;if(M?Kg(M):b.stateNode.complete){Ie=0,oi=null;var I=b.sibling;if(I!==null)ve=I;else{var $=b.return;$!==null?(ve=$,nc($)):ve=null}break e}}Ie=0,oi=null,_r(e,i,h,5);break;case 6:Ie=0,oi=null,_r(e,i,h,6);break;case 8:eh(),ln=6;break t;default:throw Error(s(462))}}aM();break}catch(ut){rg(e,ut)}while(!0);return aa=_s=null,B.H=o,B.A=u,Oe=a,ve!==null?0:(Ye=null,Me=0,Ml(),ln)}function aM(){for(;ve!==null&&!w();)ug(ve)}function ug(e){var i=O0(e.alternate,e,pa);e.memoizedProps=e.pendingProps,i===null?nc(e):ve=i}function fg(e){var i=e,a=i.alternate;switch(i.tag){case 15:case 0:i=R0(a,i,i.pendingProps,i.type,void 0,Me);break;case 11:i=R0(a,i,i.pendingProps,i.type.render,i.ref,Me);break;case 5:vf(i);default:z0(a,i),i=ve=cm(i,pa),i=O0(a,i,pa)}e.memoizedProps=e.pendingProps,i===null?nc(e):ve=i}function _r(e,i,a,o){aa=_s=null,vf(i),lr=null,Mo=0;var u=i.return;try{if(qS(e,u,i,a,Me)){ln=1,kl(e,_i(a,e.current)),ve=null;return}}catch(h){if(u!==null)throw ve=u,h;ln=1,kl(e,_i(a,e.current)),ve=null;return}i.flags&32768?(be||o===1?e=!0:mr||(Me&536870912)!==0?e=!1:(ka=e=!0,(o===2||o===9||o===3||o===6)&&(o=si.current,o!==null&&o.tag===13&&(o.flags|=16384))),hg(i,e)):nc(i)}function nc(e){var i=e;do{if((i.flags&32768)!==0){hg(i,ka);return}e=i.return;var a=ZS(i.alternate,i,pa);if(a!==null){ve=a;return}if(i=i.sibling,i!==null){ve=i;return}ve=i=e}while(i!==null);ln===0&&(ln=5)}function hg(e,i){do{var a=KS(e.alternate,e);if(a!==null){a.flags&=32767,ve=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!i&&(e=e.sibling,e!==null)){ve=e;return}ve=e=a}while(e!==null);ln=6,ve=null}function dg(e,i,a,o,u,h,M,b,I){e.cancelPendingCommit=null;do ic();while(_n!==0);if((Oe&6)!==0)throw Error(s(327));if(i!==null){if(i===e.current)throw Error(s(177));if(h=i.lanes|i.childLanes,h|=ku,Li(e,a,h,M,b,I),e===Ye&&(ve=Ye=null,Me=0),vr=i,qa=e,ma=a,Jf=h,$f=u,ng=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,lM(Lt,function(){return xg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,u=Q.p,Q.p=2,M=Oe,Oe|=4;try{QS(e,i,a)}finally{Oe=M,Q.p=u,B.T=o}}_n=1,pg(),mg(),gg()}}function pg(){if(_n===1){_n=0;var e=qa,i=vr,a=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||a){a=B.T,B.T=null;var o=Q.p;Q.p=2;var u=Oe;Oe|=4;try{Y0(i,e);var h=ph,M=tm(e.containerInfo),b=h.focusedElem,I=h.selectionRange;if(M!==b&&b&&b.ownerDocument&&$p(b.ownerDocument.documentElement,b)){if(I!==null&&Iu(b)){var $=I.start,ut=I.end;if(ut===void 0&&(ut=$),"selectionStart"in b)b.selectionStart=$,b.selectionEnd=Math.min(ut,b.value.length);else{var vt=b.ownerDocument||document,tt=vt&&vt.defaultView||window;if(tt.getSelection){var ot=tt.getSelection(),Ft=b.textContent.length,Jt=Math.min(I.start,Ft),qe=I.end===void 0?Jt:Math.min(I.end,Ft);!ot.extend&&Jt>qe&&(M=qe,qe=Jt,Jt=M);var Y=Jp(b,Jt),G=Jp(b,qe);if(Y&&G&&(ot.rangeCount!==1||ot.anchorNode!==Y.node||ot.anchorOffset!==Y.offset||ot.focusNode!==G.node||ot.focusOffset!==G.offset)){var J=vt.createRange();J.setStart(Y.node,Y.offset),ot.removeAllRanges(),Jt>qe?(ot.addRange(J),ot.extend(G.node,G.offset)):(J.setEnd(G.node,G.offset),ot.addRange(J))}}}}for(vt=[],ot=b;ot=ot.parentNode;)ot.nodeType===1&&vt.push({element:ot,left:ot.scrollLeft,top:ot.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<vt.length;b++){var pt=vt[b];pt.element.scrollLeft=pt.left,pt.element.scrollTop=pt.top}}mc=!!dh,ph=dh=null}finally{Oe=u,Q.p=o,B.T=a}}e.current=i,_n=2}}function mg(){if(_n===2){_n=0;var e=qa,i=vr,a=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||a){a=B.T,B.T=null;var o=Q.p;Q.p=2;var u=Oe;Oe|=4;try{k0(e,i.alternate,i)}finally{Oe=u,Q.p=o,B.T=a}}_n=3}}function gg(){if(_n===4||_n===3){_n=0,nt();var e=qa,i=vr,a=ma,o=ng;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?_n=5:(_n=0,vr=qa=null,vg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Wa=null),qs(a),i=i.stateNode,jt&&typeof jt.onCommitFiberRoot=="function")try{jt.onCommitFiberRoot(Kt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=B.T,u=Q.p,Q.p=2,B.T=null;try{for(var h=e.onRecoverableError,M=0;M<o.length;M++){var b=o[M];h(b.value,{componentStack:b.stack})}}finally{B.T=i,Q.p=u}}(ma&3)!==0&&ic(),ji(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===th?Io++:(Io=0,th=e):Io=0,Fo(0)}}function vg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,_o(i)))}function ic(){return pg(),mg(),gg(),xg()}function xg(){if(_n!==5)return!1;var e=qa,i=Jf;Jf=0;var a=qs(ma),o=B.T,u=Q.p;try{Q.p=32>a?32:a,B.T=null,a=$f,$f=null;var h=qa,M=ma;if(_n=0,vr=qa=null,ma=0,(Oe&6)!==0)throw Error(s(331));var b=Oe;if(Oe|=4,$0(h.current),K0(h,h.current,M,a),Oe=b,Fo(0,!1),jt&&typeof jt.onPostCommitFiberRoot=="function")try{jt.onPostCommitFiberRoot(Kt,h)}catch{}return!0}finally{Q.p=u,B.T=o,vg(e,i)}}function _g(e,i,a){i=_i(a,i),i=Uf(e.stateNode,i,2),e=Fa(e,i,2),e!==null&&(Cn(e,2),ji(e))}function Fe(e,i,a){if(e.tag===3)_g(e,e,a);else for(;i!==null;){if(i.tag===3){_g(i,e,a);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Wa===null||!Wa.has(o))){e=_i(a,e),a=S0(2),o=Fa(i,a,2),o!==null&&(M0(a,o,i,e),Cn(o,2),ji(o));break}}i=i.return}}function ih(e,i,a){var o=e.pingCache;if(o===null){o=e.pingCache=new tM;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(a)||(Zf=!0,u.add(a),e=sM.bind(null,e,i,a),i.then(e,e))}function sM(e,i,a){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ye===e&&(Me&a)===a&&(ln===4||ln===3&&(Me&62914560)===Me&&300>dt()-Ql?(Oe&2)===0&&xr(e,0):Kf|=a,gr===Me&&(gr=0)),ji(e)}function Sg(e,i){i===0&&(i=vn()),e=gs(e,i),e!==null&&(Cn(e,i),ji(e))}function rM(e){var i=e.memoizedState,a=0;i!==null&&(a=i.retryLane),Sg(e,a)}function oM(e,i){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(i),Sg(e,a)}function lM(e,i){return Zt(e,i)}var ac=null,Sr=null,ah=!1,sc=!1,sh=!1,Ya=0;function ji(e){e!==Sr&&e.next===null&&(Sr===null?ac=Sr=e:Sr=Sr.next=e),sc=!0,ah||(ah=!0,uM())}function Fo(e,i){if(!sh&&sc){sh=!0;do for(var a=!1,o=ac;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var M=o.suspendedLanes,b=o.pingedLanes;h=(1<<31-ie(42|e)+1)-1,h&=u&~(M&~b),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,Tg(o,h))}else h=Me,h=Ut(o,o===Ye?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||ae(o,h)||(a=!0,Tg(o,h));o=o.next}while(a);sh=!1}}function cM(){Mg()}function Mg(){sc=ah=!1;var e=0;Ya!==0&&SM()&&(e=Ya);for(var i=dt(),a=null,o=ac;o!==null;){var u=o.next,h=yg(o,i);h===0?(o.next=null,a===null?ac=u:a.next=u,u===null&&(Sr=a)):(a=o,(e!==0||(h&3)!==0)&&(sc=!0)),o=u}_n!==0&&_n!==5||Fo(e),Ya!==0&&(Ya=0)}function yg(e,i){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var M=31-ie(h),b=1<<M,I=u[M];I===-1?((b&a)===0||(b&o)!==0)&&(u[M]=tn(b,i)):I<=i&&(e.expiredLanes|=b),h&=~b}if(i=Ye,a=Me,a=Ut(e,e===i?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===i&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&N(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||ae(e,a)){if(i=a&-a,i===e.callbackPriority)return i;switch(o!==null&&N(o),qs(a)){case 2:case 8:a=qt;break;case 32:a=Lt;break;case 268435456:a=Se;break;default:a=Lt}return o=Eg.bind(null,e),a=Zt(a,o),e.callbackPriority=i,e.callbackNode=a,i}return o!==null&&o!==null&&N(o),e.callbackPriority=2,e.callbackNode=null,2}function Eg(e,i){if(_n!==0&&_n!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(ic()&&e.callbackNode!==a)return null;var o=Me;return o=Ut(e,e===Ye?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(ag(e,o,i),yg(e,dt()),e.callbackNode!=null&&e.callbackNode===a?Eg.bind(null,e):null)}function Tg(e,i){if(ic())return null;ag(e,i,!0)}function uM(){yM(function(){(Oe&6)!==0?Zt(gt,cM):Mg()})}function rh(){if(Ya===0){var e=sr;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),Ya=e}return Ya}function bg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:dl(""+e)}function Ag(e,i){var a=i.ownerDocument.createElement("input");return a.name=i.name,a.value=i.value,e.id&&a.setAttribute("form",e.id),i.parentNode.insertBefore(a,i),e=new FormData(e),a.parentNode.removeChild(a),e}function fM(e,i,a,o,u){if(i==="submit"&&a&&a.stateNode===u){var h=bg((u[Dn]||null).action),M=o.submitter;M&&(i=(i=M[Dn]||null)?bg(i.formAction):M.getAttribute("formAction"),i!==null&&(h=i,M=null));var b=new vl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ya!==0){var I=M?Ag(u,M):new FormData(u);Af(a,{pending:!0,data:I,method:u.method,action:h},null,I)}}else typeof h=="function"&&(b.preventDefault(),I=M?Ag(u,M):new FormData(u),Af(a,{pending:!0,data:I,method:u.method,action:h},h,I))},currentTarget:u}]})}}for(var oh=0;oh<Vu.length;oh++){var lh=Vu[oh],hM=lh.toLowerCase(),dM=lh[0].toUpperCase()+lh.slice(1);Oi(hM,"on"+dM)}Oi(im,"onAnimationEnd"),Oi(am,"onAnimationIteration"),Oi(sm,"onAnimationStart"),Oi("dblclick","onDoubleClick"),Oi("focusin","onFocus"),Oi("focusout","onBlur"),Oi(CS,"onTransitionRun"),Oi(DS,"onTransitionStart"),Oi(LS,"onTransitionCancel"),Oi(rm,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),ee("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ee("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ee("onBeforeInput",["compositionend","keypress","textInput","paste"]),ee("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ee("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ee("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ho));function wg(e,i){i=(i&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(i)for(var M=o.length-1;0<=M;M--){var b=o[M],I=b.instance,$=b.currentTarget;if(b=b.listener,I!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=$;try{h(u)}catch(ut){Sl(ut)}u.currentTarget=null,h=I}else for(M=0;M<o.length;M++){if(b=o[M],I=b.instance,$=b.currentTarget,b=b.listener,I!==h&&u.isPropagationStopped())break t;h=b,u.currentTarget=$;try{h(u)}catch(ut){Sl(ut)}u.currentTarget=null,h=I}}}}function xe(e,i){var a=i[ro];a===void 0&&(a=i[ro]=new Set);var o=e+"__bubble";a.has(o)||(Rg(i,e,2,!1),a.add(o))}function ch(e,i,a){var o=0;i&&(o|=4),Rg(a,e,o,i)}var rc="_reactListening"+Math.random().toString(36).slice(2);function uh(e){if(!e[rc]){e[rc]=!0,kt.forEach(function(a){a!=="selectionchange"&&(pM.has(a)||ch(a,!1,e),ch(a,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[rc]||(i[rc]=!0,ch("selectionchange",!1,i))}}function Rg(e,i,a,o){switch(iv(i)){case 2:var u=VM;break;case 8:u=kM;break;default:u=bh}a=u.bind(null,i,a,e),u=void 0,!Cu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,a,{capture:!0,passive:u}):e.addEventListener(i,a,!0):u!==void 0?e.addEventListener(i,a,{passive:u}):e.addEventListener(i,a,!1)}function fh(e,i,a,o,u){var h=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var M=o.tag;if(M===3||M===4){var b=o.stateNode.containerInfo;if(b===u)break;if(M===4)for(M=o.return;M!==null;){var I=M.tag;if((I===3||I===4)&&M.stateNode.containerInfo===u)return;M=M.return}for(;b!==null;){if(M=at(b),M===null)return;if(I=M.tag,I===5||I===6||I===26||I===27){o=h=M;continue t}b=b.parentNode}}o=o.return}Np(function(){var $=h,ut=wu(a),vt=[];t:{var tt=om.get(e);if(tt!==void 0){var ot=vl,Ft=e;switch(e){case"keypress":if(ml(a)===0)break t;case"keydown":case"keyup":ot=oS;break;case"focusin":Ft="focus",ot=Nu;break;case"focusout":Ft="blur",ot=Nu;break;case"beforeblur":case"afterblur":ot=Nu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ot=zp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ot=Z_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ot=uS;break;case im:case am:case sm:ot=J_;break;case rm:ot=hS;break;case"scroll":case"scrollend":ot=j_;break;case"wheel":ot=pS;break;case"copy":case"cut":case"paste":ot=tS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ot=Ip;break;case"toggle":case"beforetoggle":ot=gS}var Jt=(i&4)!==0,qe=!Jt&&(e==="scroll"||e==="scrollend"),Y=Jt?tt!==null?tt+"Capture":null:tt;Jt=[];for(var G=$,J;G!==null;){var pt=G;if(J=pt.stateNode,pt=pt.tag,pt!==5&&pt!==26&&pt!==27||J===null||Y===null||(pt=oo(G,Y),pt!=null&&Jt.push(Go(G,pt,J))),qe)break;G=G.return}0<Jt.length&&(tt=new ot(tt,Ft,null,a,ut),vt.push({event:tt,listeners:Jt}))}}if((i&7)===0){t:{if(tt=e==="mouseover"||e==="pointerover",ot=e==="mouseout"||e==="pointerout",tt&&a!==Au&&(Ft=a.relatedTarget||a.fromElement)&&(at(Ft)||Ft[Ji]))break t;if((ot||tt)&&(tt=ut.window===ut?ut:(tt=ut.ownerDocument)?tt.defaultView||tt.parentWindow:window,ot?(Ft=a.relatedTarget||a.toElement,ot=$,Ft=Ft?at(Ft):null,Ft!==null&&(qe=c(Ft),Jt=Ft.tag,Ft!==qe||Jt!==5&&Jt!==27&&Jt!==6)&&(Ft=null)):(ot=null,Ft=$),ot!==Ft)){if(Jt=zp,pt="onMouseLeave",Y="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=Ip,pt="onPointerLeave",Y="onPointerEnter",G="pointer"),qe=ot==null?tt:bt(ot),J=Ft==null?tt:bt(Ft),tt=new Jt(pt,G+"leave",ot,a,ut),tt.target=qe,tt.relatedTarget=J,pt=null,at(ut)===$&&(Jt=new Jt(Y,G+"enter",Ft,a,ut),Jt.target=J,Jt.relatedTarget=qe,pt=Jt),qe=pt,ot&&Ft)e:{for(Jt=mM,Y=ot,G=Ft,J=0,pt=Y;pt;pt=Jt(pt))J++;pt=0;for(var Yt=G;Yt;Yt=Jt(Yt))pt++;for(;0<J-pt;)Y=Jt(Y),J--;for(;0<pt-J;)G=Jt(G),pt--;for(;J--;){if(Y===G||G!==null&&Y===G.alternate){Jt=Y;break e}Y=Jt(Y),G=Jt(G)}Jt=null}else Jt=null;ot!==null&&Cg(vt,tt,ot,Jt,!1),Ft!==null&&qe!==null&&Cg(vt,qe,Ft,Jt,!0)}}t:{if(tt=$?bt($):window,ot=tt.nodeName&&tt.nodeName.toLowerCase(),ot==="select"||ot==="input"&&tt.type==="file")var De=qp;else if(Xp(tt))if(jp)De=AS;else{De=TS;var Wt=ES}else ot=tt.nodeName,!ot||ot.toLowerCase()!=="input"||tt.type!=="checkbox"&&tt.type!=="radio"?$&&bu($.elementType)&&(De=qp):De=bS;if(De&&(De=De(e,$))){Wp(vt,De,a,ut);break t}Wt&&Wt(e,tt,$),e==="focusout"&&$&&tt.type==="number"&&$.memoizedProps.value!=null&&vi(tt,"number",tt.value)}switch(Wt=$?bt($):window,e){case"focusin":(Xp(Wt)||Wt.contentEditable==="true")&&(Qs=Wt,Fu=$,go=null);break;case"focusout":go=Fu=Qs=null;break;case"mousedown":Hu=!0;break;case"contextmenu":case"mouseup":case"dragend":Hu=!1,em(vt,a,ut);break;case"selectionchange":if(RS)break;case"keydown":case"keyup":em(vt,a,ut)}var fe;if(Pu)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Ks?Vp(e,a)&&(ye="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&(Fp&&a.locale!=="ko"&&(Ks||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Ks&&(fe=Op()):(Ua=ut,Du="value"in Ua?Ua.value:Ua.textContent,Ks=!0)),Wt=oc($,ye),0<Wt.length&&(ye=new Bp(ye,e,null,a,ut),vt.push({event:ye,listeners:Wt}),fe?ye.data=fe:(fe=kp(a),fe!==null&&(ye.data=fe)))),(fe=xS?_S(e,a):SS(e,a))&&(ye=oc($,"onBeforeInput"),0<ye.length&&(Wt=new Bp("onBeforeInput","beforeinput",null,a,ut),vt.push({event:Wt,listeners:ye}),Wt.data=fe)),fM(vt,e,$,a,ut)}wg(vt,i)})}function Go(e,i,a){return{instance:e,listener:i,currentTarget:a}}function oc(e,i){for(var a=i+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=oo(e,a),u!=null&&o.unshift(Go(e,u,h)),u=oo(e,i),u!=null&&o.push(Go(e,u,h))),e.tag===3)return o;e=e.return}return[]}function mM(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Cg(e,i,a,o,u){for(var h=i._reactName,M=[];a!==null&&a!==o;){var b=a,I=b.alternate,$=b.stateNode;if(b=b.tag,I!==null&&I===o)break;b!==5&&b!==26&&b!==27||$===null||(I=$,u?($=oo(a,h),$!=null&&M.unshift(Go(a,$,I))):u||($=oo(a,h),$!=null&&M.push(Go(a,$,I)))),a=a.return}M.length!==0&&e.push({event:i,listeners:M})}var gM=/\r\n?/g,vM=/\u0000|\uFFFD/g;function Dg(e){return(typeof e=="string"?e:""+e).replace(gM,`
`).replace(vM,"")}function Lg(e,i){return i=Dg(i),Dg(e)===i}function We(e,i,a,o,u,h){switch(a){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||js(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&js(e,""+o);break;case"className":Xt(e,"class",o);break;case"tabIndex":Xt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,a,o);break;case"style":Lp(e,o,h);break;case"data":if(i!=="object"){Xt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=dl(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(i!=="input"&&We(e,i,"name",u.name,u,null),We(e,i,"formEncType",u.formEncType,u,null),We(e,i,"formMethod",u.formMethod,u,null),We(e,i,"formTarget",u.formTarget,u,null)):(We(e,i,"encType",u.encType,u,null),We(e,i,"method",u.method,u,null),We(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=dl(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=ta);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=dl(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":xe("beforetoggle",e),xe("toggle",e),Te(e,"popover",o);break;case"xlinkActuate":xn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":xn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":xn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":xn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":xn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":xn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":xn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":xn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":xn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Te(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=W_.get(a)||a,Te(e,a,o))}}function hh(e,i,a,o,u,h){switch(a){case"style":Lp(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?js(e,o):(typeof o=="number"||typeof o=="bigint")&&js(e,""+o);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"onClick":o!=null&&(e.onclick=ta);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!se.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),i=a.slice(2,u?a.length-7:void 0),h=e[Dn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(i,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(i,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Te(e,a,o)}}}function Pn(e,i,a){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",e),xe("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var M=a[h];if(M!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:We(e,i,h,M,a,null)}}u&&We(e,i,"srcSet",a.srcSet,a,null),o&&We(e,i,"src",a.src,a,null);return;case"input":xe("invalid",e);var b=h=M=u=null,I=null,$=null;for(o in a)if(a.hasOwnProperty(o)){var ut=a[o];if(ut!=null)switch(o){case"name":u=ut;break;case"type":M=ut;break;case"checked":I=ut;break;case"defaultChecked":$=ut;break;case"value":h=ut;break;case"defaultValue":b=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,i));break;default:We(e,i,o,ut,a,null)}}Ni(e,h,b,I,$,M,u,!1);return;case"select":xe("invalid",e),o=M=h=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":h=b;break;case"defaultValue":M=b;break;case"multiple":o=b;default:We(e,i,u,b,a,null)}i=h,a=M,e.multiple=!!o,i!=null?$i(e,!!o,i,!1):a!=null&&$i(e,!!o,a,!0);return;case"textarea":xe("invalid",e),h=u=o=null;for(M in a)if(a.hasOwnProperty(M)&&(b=a[M],b!=null))switch(M){case"value":o=b;break;case"defaultValue":u=b;break;case"children":h=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:We(e,i,M,b,a,null)}Cp(e,o,u,h);return;case"option":for(I in a)if(a.hasOwnProperty(I)&&(o=a[I],o!=null))switch(I){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:We(e,i,I,o,a,null)}return;case"dialog":xe("beforetoggle",e),xe("toggle",e),xe("cancel",e),xe("close",e);break;case"iframe":case"object":xe("load",e);break;case"video":case"audio":for(o=0;o<Ho.length;o++)xe(Ho[o],e);break;case"image":xe("error",e),xe("load",e);break;case"details":xe("toggle",e);break;case"embed":case"source":case"link":xe("error",e),xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for($ in a)if(a.hasOwnProperty($)&&(o=a[$],o!=null))switch($){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:We(e,i,$,o,a,null)}return;default:if(bu(i)){for(ut in a)a.hasOwnProperty(ut)&&(o=a[ut],o!==void 0&&hh(e,i,ut,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&We(e,i,b,o,a,null))}function xM(e,i,a,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,M=null,b=null,I=null,$=null,ut=null;for(ot in a){var vt=a[ot];if(a.hasOwnProperty(ot)&&vt!=null)switch(ot){case"checked":break;case"value":break;case"defaultValue":I=vt;default:o.hasOwnProperty(ot)||We(e,i,ot,null,o,vt)}}for(var tt in o){var ot=o[tt];if(vt=a[tt],o.hasOwnProperty(tt)&&(ot!=null||vt!=null))switch(tt){case"type":h=ot;break;case"name":u=ot;break;case"checked":$=ot;break;case"defaultChecked":ut=ot;break;case"value":M=ot;break;case"defaultValue":b=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,i));break;default:ot!==vt&&We(e,i,tt,ot,o,vt)}}Fn(e,M,b,I,$,ut,h,u);return;case"select":ot=M=b=tt=null;for(h in a)if(I=a[h],a.hasOwnProperty(h)&&I!=null)switch(h){case"value":break;case"multiple":ot=I;default:o.hasOwnProperty(h)||We(e,i,h,null,o,I)}for(u in o)if(h=o[u],I=a[u],o.hasOwnProperty(u)&&(h!=null||I!=null))switch(u){case"value":tt=h;break;case"defaultValue":b=h;break;case"multiple":M=h;default:h!==I&&We(e,i,u,h,o,I)}i=b,a=M,o=ot,tt!=null?$i(e,!!a,tt,!1):!!o!=!!a&&(i!=null?$i(e,!!a,i,!0):$i(e,!!a,a?[]:"",!1));return;case"textarea":ot=tt=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:We(e,i,b,null,o,u)}for(M in o)if(u=o[M],h=a[M],o.hasOwnProperty(M)&&(u!=null||h!=null))switch(M){case"value":tt=u;break;case"defaultValue":ot=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&We(e,i,M,u,o,h)}Rp(e,tt,ot);return;case"option":for(var Ft in a)if(tt=a[Ft],a.hasOwnProperty(Ft)&&tt!=null&&!o.hasOwnProperty(Ft))switch(Ft){case"selected":e.selected=!1;break;default:We(e,i,Ft,null,o,tt)}for(I in o)if(tt=o[I],ot=a[I],o.hasOwnProperty(I)&&tt!==ot&&(tt!=null||ot!=null))switch(I){case"selected":e.selected=tt&&typeof tt!="function"&&typeof tt!="symbol";break;default:We(e,i,I,tt,o,ot)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in a)tt=a[Jt],a.hasOwnProperty(Jt)&&tt!=null&&!o.hasOwnProperty(Jt)&&We(e,i,Jt,null,o,tt);for($ in o)if(tt=o[$],ot=a[$],o.hasOwnProperty($)&&tt!==ot&&(tt!=null||ot!=null))switch($){case"children":case"dangerouslySetInnerHTML":if(tt!=null)throw Error(s(137,i));break;default:We(e,i,$,tt,o,ot)}return;default:if(bu(i)){for(var qe in a)tt=a[qe],a.hasOwnProperty(qe)&&tt!==void 0&&!o.hasOwnProperty(qe)&&hh(e,i,qe,void 0,o,tt);for(ut in o)tt=o[ut],ot=a[ut],!o.hasOwnProperty(ut)||tt===ot||tt===void 0&&ot===void 0||hh(e,i,ut,tt,o,ot);return}}for(var Y in a)tt=a[Y],a.hasOwnProperty(Y)&&tt!=null&&!o.hasOwnProperty(Y)&&We(e,i,Y,null,o,tt);for(vt in o)tt=o[vt],ot=a[vt],!o.hasOwnProperty(vt)||tt===ot||tt==null&&ot==null||We(e,i,vt,tt,o,ot)}function Ug(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function _M(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,M=u.initiatorType,b=u.duration;if(h&&b&&Ug(M)){for(M=0,b=u.responseEnd,o+=1;o<a.length;o++){var I=a[o],$=I.startTime;if($>b)break;var ut=I.transferSize,vt=I.initiatorType;ut&&Ug(vt)&&(I=I.responseEnd,M+=ut*(I<b?1:(b-$)/(I-$)))}if(--o,i+=8*(h+M)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var dh=null,ph=null;function lc(e){return e.nodeType===9?e:e.ownerDocument}function Ng(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Og(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function mh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var gh=null;function SM(){var e=window.event;return e&&e.type==="popstate"?e===gh?!1:(gh=e,!0):(gh=null,!1)}var Pg=typeof setTimeout=="function"?setTimeout:void 0,MM=typeof clearTimeout=="function"?clearTimeout:void 0,zg=typeof Promise=="function"?Promise:void 0,yM=typeof queueMicrotask=="function"?queueMicrotask:typeof zg<"u"?function(e){return zg.resolve(null).then(e).catch(EM)}:Pg;function EM(e){setTimeout(function(){throw e})}function Za(e){return e==="head"}function Bg(e,i){var a=i,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),Tr(i);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Vo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Vo(a);for(var h=a.firstChild;h;){var M=h.nextSibling,b=h.nodeName;h[W]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=M}}else a==="body"&&Vo(e.ownerDocument.body);a=u}while(a);Tr(i)}function Ig(e,i){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?i?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(i?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function vh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var a=i;switch(i=i.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":vh(a),rt(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function TM(e,i,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[W])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Ti(e.nextSibling),e===null)break}return null}function bM(e,i,a){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ti(e.nextSibling),e===null))return null;return e}function Fg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Ti(e.nextSibling),e===null))return null;return e}function xh(e){return e.data==="$?"||e.data==="$~"}function _h(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function AM(e,i){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||a.readyState!=="loading")i();else{var o=function(){i(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Ti(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Sh=null;function Hg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(i===0)return Ti(e.nextSibling);i--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||i++}e=e.nextSibling}return null}function Gg(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(i===0)return e;i--}else a!=="/$"&&a!=="/&"||i++}e=e.previousSibling}return null}function Vg(e,i,a){switch(i=lc(a),e){case"html":if(e=i.documentElement,!e)throw Error(s(452));return e;case"head":if(e=i.head,!e)throw Error(s(453));return e;case"body":if(e=i.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Vo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);rt(e)}var bi=new Map,kg=new Set;function cc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ga=Q.d;Q.d={f:wM,r:RM,D:CM,C:DM,L:LM,m:UM,X:OM,S:NM,M:PM};function wM(){var e=ga.f(),i=tc();return e||i}function RM(e){var i=q(e);i!==null&&i.tag===5&&i.type==="form"?r0(i):ga.r(e)}var Mr=typeof document>"u"?null:document;function Xg(e,i,a){var o=Mr;if(o&&typeof i=="string"&&i){var u=yn(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),kg.has(u)||(kg.add(u),e={rel:e,crossOrigin:a,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Pn(i,"link",e),Dt(i),o.head.appendChild(i)))}}function CM(e){ga.D(e),Xg("dns-prefetch",e,null)}function DM(e,i){ga.C(e,i),Xg("preconnect",e,i)}function LM(e,i,a){ga.L(e,i,a);var o=Mr;if(o&&e&&i){var u='link[rel="preload"][as="'+yn(i)+'"]';i==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+yn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+yn(a.imageSizes)+'"]')):u+='[href="'+yn(e)+'"]';var h=u;switch(i){case"style":h=yr(e);break;case"script":h=Er(e)}bi.has(h)||(e=g({rel:"preload",href:i==="image"&&a&&a.imageSrcSet?void 0:e,as:i},a),bi.set(h,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(ko(h))||i==="script"&&o.querySelector(Xo(h))||(i=o.createElement("link"),Pn(i,"link",e),Dt(i),o.head.appendChild(i)))}}function UM(e,i){ga.m(e,i);var a=Mr;if(a&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+yn(o)+'"][href="'+yn(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Er(e)}if(!bi.has(h)&&(e=g({rel:"modulepreload",href:e},i),bi.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Xo(h)))return}o=a.createElement("link"),Pn(o,"link",e),Dt(o),a.head.appendChild(o)}}}function NM(e,i,a){ga.S(e,i,a);var o=Mr;if(o&&e){var u=Ct(o).hoistableStyles,h=yr(e);i=i||"default";var M=u.get(h);if(!M){var b={loading:0,preload:null};if(M=o.querySelector(ko(h)))b.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":i},a),(a=bi.get(h))&&Mh(e,a);var I=M=o.createElement("link");Dt(I),Pn(I,"link",e),I._p=new Promise(function($,ut){I.onload=$,I.onerror=ut}),I.addEventListener("load",function(){b.loading|=1}),I.addEventListener("error",function(){b.loading|=2}),b.loading|=4,uc(M,i,o)}M={type:"stylesheet",instance:M,count:1,state:b},u.set(h,M)}}}function OM(e,i){ga.X(e,i);var a=Mr;if(a&&e){var o=Ct(a).hoistableScripts,u=Er(e),h=o.get(u);h||(h=a.querySelector(Xo(u)),h||(e=g({src:e,async:!0},i),(i=bi.get(u))&&yh(e,i),h=a.createElement("script"),Dt(h),Pn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function PM(e,i){ga.M(e,i);var a=Mr;if(a&&e){var o=Ct(a).hoistableScripts,u=Er(e),h=o.get(u);h||(h=a.querySelector(Xo(u)),h||(e=g({src:e,async:!0,type:"module"},i),(i=bi.get(u))&&yh(e,i),h=a.createElement("script"),Dt(h),Pn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Wg(e,i,a,o){var u=(u=Et.current)?cc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(i=yr(a.href),a=Ct(u).hoistableStyles,o=a.get(i),o||(o={type:"style",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=yr(a.href);var h=Ct(u).hoistableStyles,M=h.get(e);if(M||(u=u.ownerDocument||u,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,M),(h=u.querySelector(ko(e)))&&!h._p&&(M.instance=h,M.state.loading=5),bi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},bi.set(e,a),h||zM(u,e,a,M.state))),i&&o===null)throw Error(s(528,""));return M}if(i&&o!==null)throw Error(s(529,""));return null;case"script":return i=a.async,a=a.src,typeof a=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Er(a),a=Ct(u).hoistableScripts,o=a.get(i),o||(o={type:"script",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function yr(e){return'href="'+yn(e)+'"'}function ko(e){return'link[rel="stylesheet"]['+e+"]"}function qg(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function zM(e,i,a,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Pn(i,"link",a),Dt(i),e.head.appendChild(i))}function Er(e){return'[src="'+yn(e)+'"]'}function Xo(e){return"script[async]"+e}function jg(e,i,a){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+yn(a.href)+'"]');if(o)return i.instance=o,Dt(o),o;var u=g({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Dt(o),Pn(o,"style",u),uc(o,a.precedence,e),i.instance=o;case"stylesheet":u=yr(a.href);var h=e.querySelector(ko(u));if(h)return i.state.loading|=4,i.instance=h,Dt(h),h;o=qg(a),(u=bi.get(u))&&Mh(o,u),h=(e.ownerDocument||e).createElement("link"),Dt(h);var M=h;return M._p=new Promise(function(b,I){M.onload=b,M.onerror=I}),Pn(h,"link",o),i.state.loading|=4,uc(h,a.precedence,e),i.instance=h;case"script":return h=Er(a.src),(u=e.querySelector(Xo(h)))?(i.instance=u,Dt(u),u):(o=a,(u=bi.get(h))&&(o=g({},a),yh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Dt(u),Pn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(s(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,uc(o,a.precedence,e));return i.instance}function uc(e,i,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,M=0;M<o.length;M++){var b=o[M];if(b.dataset.precedence===i)h=b;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(i=a.nodeType===9?a.head:a,i.insertBefore(e,i.firstChild))}function Mh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function yh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var fc=null;function Yg(e,i,a){if(fc===null){var o=new Map,u=fc=new Map;u.set(a,o)}else u=fc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[W]||h[rn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var M=h.getAttribute(i)||"";M=e+M;var b=o.get(M);b?b.push(h):o.set(M,[h])}}return o}function Zg(e,i,a){e=e.ownerDocument||e,e.head.insertBefore(a,i==="title"?e.querySelector("head > title"):null)}function BM(e,i,a){if(a===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Kg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function IM(e,i,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=yr(o.href),h=i.querySelector(ko(u));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=hc.bind(e),i.then(e,e)),a.state.loading|=4,a.instance=h,Dt(h);return}h=i.ownerDocument||i,o=qg(o),(u=bi.get(u))&&Mh(o,u),h=h.createElement("link"),Dt(h);var M=h;M._p=new Promise(function(b,I){M.onload=b,M.onerror=I}),Pn(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,i),(i=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=hc.bind(e),i.addEventListener("load",a),i.addEventListener("error",a))}}var Eh=0;function FM(e,i){return e.stylesheets&&e.count===0&&pc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&pc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+i);0<e.imgBytes&&Eh===0&&(Eh=62500*_M());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&pc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Eh?50:800)+i);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function hc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)pc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var dc=null;function pc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,dc=new Map,i.forEach(HM,e),dc=null,hc.call(e))}function HM(e,i){if(!(i.state.loading&4)){var a=dc.get(e);if(a)var o=a.get(null);else{a=new Map,dc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var M=u[h];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(a.set(M.dataset.precedence,M),o=M)}o&&a.set(null,o)}u=i.instance,M=u.getAttribute("data-precedence"),h=a.get(M)||o,h===o&&a.set(null,u),a.set(M,u),this.count++,o=hc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var Wo={$$typeof:L,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function GM(e,i,a,o,u,h,M,b,I){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ce(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ce(0),this.hiddenUpdates=Ce(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=I,this.incompleteTransitions=new Map}function Qg(e,i,a,o,u,h,M,b,I,$,ut,vt){return e=new GM(e,i,a,M,I,$,ut,vt,b),i=1,h===!0&&(i|=24),h=ai(3,null,null,i),e.current=h,h.stateNode=e,i=ef(),i.refCount++,e.pooledCache=i,i.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:i},rf(h),e}function Jg(e){return e?(e=tr,e):tr}function $g(e,i,a,o,u,h){u=Jg(u),o.context===null?o.context=u:o.pendingContext=u,o=Ia(i),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Fa(e,o,i),a!==null&&($n(a,e,i),Eo(a,e,i))}function tv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<i?a:i}}function Th(e,i){tv(e,i),(e=e.alternate)&&tv(e,i)}function ev(e){if(e.tag===13||e.tag===31){var i=gs(e,67108864);i!==null&&$n(i,e,67108864),Th(e,67108864)}}function nv(e){if(e.tag===13||e.tag===31){var i=ci();i=fs(i);var a=gs(e,i);a!==null&&$n(a,e,i),Th(e,i)}}var mc=!0;function VM(e,i,a,o){var u=B.T;B.T=null;var h=Q.p;try{Q.p=2,bh(e,i,a,o)}finally{Q.p=h,B.T=u}}function kM(e,i,a,o){var u=B.T;B.T=null;var h=Q.p;try{Q.p=8,bh(e,i,a,o)}finally{Q.p=h,B.T=u}}function bh(e,i,a,o){if(mc){var u=Ah(o);if(u===null)fh(e,i,o,gc,a),av(e,o);else if(WM(u,e,i,a,o))o.stopPropagation();else if(av(e,o),i&4&&-1<XM.indexOf(e)){for(;u!==null;){var h=q(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var M=Rt(h.pendingLanes);if(M!==0){var b=h;for(b.pendingLanes|=2,b.entangledLanes|=2;M;){var I=1<<31-ie(M);b.entanglements[1]|=I,M&=~I}ji(h),(Oe&6)===0&&(Jl=dt()+500,Fo(0))}}break;case 31:case 13:b=gs(h,2),b!==null&&$n(b,h,2),tc(),Th(h,2)}if(h=Ah(o),h===null&&fh(e,i,o,gc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else fh(e,i,o,null,a)}}function Ah(e){return e=wu(e),wh(e)}var gc=null;function wh(e){if(gc=null,e=at(e),e!==null){var i=c(e);if(i===null)e=null;else{var a=i.tag;if(a===13){if(e=f(i),e!==null)return e;e=null}else if(a===31){if(e=d(i),e!==null)return e;e=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return gc=e,null}function iv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(yt()){case gt:return 2;case qt:return 8;case Lt:case zt:return 32;case Se:return 268435456;default:return 32}default:return 32}}var Rh=!1,Ka=null,Qa=null,Ja=null,qo=new Map,jo=new Map,$a=[],XM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function av(e,i){switch(e){case"focusin":case"focusout":Ka=null;break;case"dragenter":case"dragleave":Qa=null;break;case"mouseover":case"mouseout":Ja=null;break;case"pointerover":case"pointerout":qo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(i.pointerId)}}function Yo(e,i,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:i,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},i!==null&&(i=q(i),i!==null&&ev(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function WM(e,i,a,o,u){switch(i){case"focusin":return Ka=Yo(Ka,e,i,a,o,u),!0;case"dragenter":return Qa=Yo(Qa,e,i,a,o,u),!0;case"mouseover":return Ja=Yo(Ja,e,i,a,o,u),!0;case"pointerover":var h=u.pointerId;return qo.set(h,Yo(qo.get(h)||null,e,i,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,jo.set(h,Yo(jo.get(h)||null,e,i,a,o,u)),!0}return!1}function sv(e){var i=at(e.target);if(i!==null){var a=c(i);if(a!==null){if(i=a.tag,i===13){if(i=f(a),i!==null){e.blockedOn=i,hs(e.priority,function(){nv(a)});return}}else if(i===31){if(i=d(a),i!==null){e.blockedOn=i,hs(e.priority,function(){nv(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var a=Ah(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Au=o,a.target.dispatchEvent(o),Au=null}else return i=q(a),i!==null&&ev(i),e.blockedOn=a,!1;i.shift()}return!0}function rv(e,i,a){vc(e)&&a.delete(i)}function qM(){Rh=!1,Ka!==null&&vc(Ka)&&(Ka=null),Qa!==null&&vc(Qa)&&(Qa=null),Ja!==null&&vc(Ja)&&(Ja=null),qo.forEach(rv),jo.forEach(rv)}function xc(e,i){e.blockedOn===i&&(e.blockedOn=null,Rh||(Rh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,qM)))}var _c=null;function ov(e){_c!==e&&(_c=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){_c===e&&(_c=null);for(var i=0;i<e.length;i+=3){var a=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(wh(o||a)===null)continue;break}var h=q(a);h!==null&&(e.splice(i,3),i-=3,Af(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Tr(e){function i(I){return xc(I,e)}Ka!==null&&xc(Ka,e),Qa!==null&&xc(Qa,e),Ja!==null&&xc(Ja,e),qo.forEach(i),jo.forEach(i);for(var a=0;a<$a.length;a++){var o=$a[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<$a.length&&(a=$a[0],a.blockedOn===null);)sv(a),a.blockedOn===null&&$a.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],M=u[Dn]||null;if(typeof h=="function")M||ov(a);else if(M){var b=null;if(h&&h.hasAttribute("formAction")){if(u=h,M=h[Dn]||null)b=M.formAction;else if(wh(u)!==null)continue}else b=M.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),ov(a)}}}function lv(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(M){return u=M})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function Ch(e){this._internalRoot=e}Sc.prototype.render=Ch.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(s(409));var a=i.current,o=ci();$g(a,o,e,i,null,null)},Sc.prototype.unmount=Ch.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;$g(e.current,2,null,e,null,null),tc(),i[Ji]=null}};function Sc(e){this._internalRoot=e}Sc.prototype.unstable_scheduleHydration=function(e){if(e){var i=so();e={blockedOn:null,target:e,priority:i};for(var a=0;a<$a.length&&i!==0&&i<$a[a].priority;a++);$a.splice(a,0,e),a===0&&sv(e)}};var cv=t.version;if(cv!=="19.2.8")throw Error(s(527,cv,"19.2.8"));Q.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(i),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var jM={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Mc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Mc.isDisabled&&Mc.supportsFiber)try{Kt=Mc.inject(jM),jt=Mc}catch{}}return Ko.createRoot=function(e,i){if(!l(e))throw Error(s(299));var a=!1,o="",u=g0,h=v0,M=x0;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(M=i.onRecoverableError)),i=Qg(e,1,!1,null,null,a,o,null,u,h,M,lv),e[Ji]=i.current,uh(e),new Ch(i)},Ko.hydrateRoot=function(e,i,a){if(!l(e))throw Error(s(299));var o=!1,u="",h=g0,M=v0,b=x0,I=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(M=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(I=a.formState)),i=Qg(e,1,!0,i,a??null,o,u,I,h,M,b,lv),i.context=Jg(null),a=i.current,o=ci(),o=fs(o),u=Ia(o),u.callback=null,Fa(a,u,o),a=o,i.current.lanes=a,Cn(i,a),ji(i),e[Ji]=i.current,uh(e),new Sc(i)},Ko.version="19.2.8",Ko}var _v;function sy(){if(_v)return Uh.exports;_v=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Uh.exports=ay(),Uh.exports}var ry=sy();const oy=$x(ry),Sv=r=>{let t;const n=new Set,s=(p,v)=>{const g=typeof p=="function"?p(t):p;if(!Object.is(g,t)){const x=t;t=v??(typeof g!="object"||g===null)?g:Object.assign({},t,g),n.forEach(S=>S(t,x))}},l=()=>t,d={setState:s,getState:l,getInitialState:()=>m,subscribe:p=>(n.add(p),()=>n.delete(p))},m=t=r(s,l,d);return d},ly=(r=>r?Sv(r):Sv),cy=r=>r;function uy(r,t=cy){const n=al.useSyncExternalStore(r.subscribe,al.useCallback(()=>t(r.getState()),[r,t]),al.useCallback(()=>t(r.getInitialState()),[r,t]));return al.useDebugValue(n),n}const Mv=r=>{const t=ly(r),n=s=>uy(t,s);return Object.assign(n,t),n},fy=(r=>r?Mv(r):Mv),zh=1/60,yv=100,hy=100,dy=20,py=1.5,yc=200,Ec=60,my=5,Ev=1.5,gy=3,vy=2,Tv=30,Bh=200,Ih=15,bv=8,xy=4,_y=10,Fh=4,Sy=.3,My=2.5,yy=.4,Av={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,bossFight:!1,bossName:""};function wv(r){return{id:r,pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0},hp:yv,maxHp:yv,speed:dy,weapon:1,weapons:[1,2,3],specialGauge:0,maxSpecialGauge:hy,invulnTimer:0,alive:!0,score:0,kills:0,combo:0}}function Rv(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:.5,aimY:.5,weaponSwitch:0,boost:!1,brake:!1,dodge:!1,special:!1,lockTarget:!1,pause:!1}}const bn=fy(r=>({game:{...Av},players:[wv(0)],inputs:[Rv()],setGame:t=>r(n=>({game:{...n.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),resetGame:()=>r({game:{...Av},players:[wv(0)],inputs:[Rv()]})})),Ey=r=>ft.jsx("svg",{className:"absolute top-0 left-0 w-4 h-4",viewBox:"0 0 16 16",children:ft.jsx("path",{d:"M0 0h14v2H2v12H0z",fill:r})}),Ty=r=>ft.jsx("svg",{className:"absolute top-0 right-0 w-4 h-4",viewBox:"0 0 16 16",children:ft.jsx("path",{d:"M16 0H2v2h12v12h2z",fill:r})}),by=r=>ft.jsx("svg",{className:"absolute bottom-0 left-0 w-4 h-4",viewBox:"0 0 16 16",children:ft.jsx("path",{d:"M0 16h14v-2H2V2H0z",fill:r})}),Ay=r=>ft.jsx("svg",{className:"absolute bottom-0 right-0 w-4 h-4",viewBox:"0 0 16 16",children:ft.jsx("path",{d:"M16 16H2v-2h12V2h2z",fill:r})}),Cv=()=>{const r=bn(t=>t.setGame);return ft.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-dark-bg",children:[ft.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),ft.jsx("div",{className:"text-center mb-16 relative",children:ft.jsxs("div",{className:"relative inline-block px-8 py-6 pixel-border bg-black/60",children:[Ey("#00f0ff"),Ty("#00f0ff"),by("#00f0ff"),Ay("#00f0ff"),ft.jsx("h1",{className:"font-pixel-title text-2xl md:text-3xl text-neon-cyan mb-4 pixel-text-glow tracking-wide",children:"纯白枪骑兵"}),ft.jsx("p",{className:"font-pixel text-lg text-white/40 tracking-[0.2em]",children:"PURE WHITE LANCER"}),ft.jsxs("div",{className:"mt-3 flex items-center justify-center gap-3 text-[10px] text-white/25",children:[ft.jsx("span",{className:"px-2 py-0.5 pixel-border-dim",children:"3D ACTION"}),ft.jsx("span",{className:"px-2 py-0.5 pixel-border-dim",children:"REMAKE"})]})]})}),ft.jsxs("div",{className:"space-y-3 w-64",children:[ft.jsx("button",{onClick:()=>r({screen:"pve",gameMode:"pve"}),className:"pixel-btn w-full py-2.5 text-base tracking-[0.15em]",children:"START GAME"}),ft.jsxs("div",{className:"text-center mt-8",children:[ft.jsx("p",{className:"font-pixel text-xs text-white/20 tracking-wider",children:"BASED ON THE FLASH ORIGINAL"}),ft.jsx("p",{className:"font-pixel text-[10px] text-white/15 mt-1",children:"ORIGINAL: phixcat | REMAKE: KIMI3"})]})]})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pp="170",wy=0,Dv=1,Ry=2,t_=1,Cy=2,ya=3,us=0,ni=1,Ta=2,wa=0,kr=1,Xr=2,Lv=3,Uv=4,Dy=5,Is=100,Ly=101,Uy=102,Ny=103,Oy=104,Py=200,zy=201,By=202,Iy=203,Ed=204,Td=205,Fy=206,Hy=207,Gy=208,Vy=209,ky=210,Xy=211,Wy=212,qy=213,jy=214,bd=0,Ad=1,wd=2,jr=3,Rd=4,Cd=5,Dd=6,Ld=7,e_=0,Yy=1,Zy=2,ls=0,n_=1,i_=2,a_=3,s_=4,Ky=5,r_=6,o_=7,l_=300,Yr=301,Zr=302,Ud=303,Nd=304,xu=306,Od=1e3,Hs=1001,Pd=1002,pi=1003,Qy=1004,Tc=1005,Hi=1006,Hh=1007,Gs=1008,Ca=1009,c_=1010,u_=1011,ol=1012,mp=1013,ks=1014,ba=1015,Vi=1016,gp=1017,vp=1018,Kr=1020,f_=35902,h_=1021,d_=1022,Gi=1023,p_=1024,m_=1025,Wr=1026,Qr=1027,g_=1028,xp=1029,v_=1030,_p=1031,Sp=1033,au=33776,su=33777,ru=33778,ou=33779,zd=35840,Bd=35841,Id=35842,Fd=35843,Hd=36196,Gd=37492,Vd=37496,kd=37808,Xd=37809,Wd=37810,qd=37811,jd=37812,Yd=37813,Zd=37814,Kd=37815,Qd=37816,Jd=37817,$d=37818,tp=37819,ep=37820,np=37821,lu=36492,ip=36494,ap=36495,x_=36283,sp=36284,rp=36285,op=36286,Jy=3200,$y=3201,__=0,t1=1,os="",Ri="srgb",to="srgb-linear",_u="linear",He="srgb",br=7680,Nv=519,e1=512,n1=513,i1=514,S_=515,a1=516,s1=517,r1=518,o1=519,Ov=35044,Pv="300 es",Aa=2e3,hu=2001;class eo{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(n)===-1&&s[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cu=Math.PI/180,lp=180/Math.PI;function ll(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Gn[r&255]+Gn[r>>8&255]+Gn[r>>16&255]+Gn[r>>24&255]+"-"+Gn[t&255]+Gn[t>>8&255]+"-"+Gn[t>>16&15|64]+Gn[t>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[s&255]+Gn[s>>8&255]+Gn[s>>16&255]+Gn[s>>24&255]).toLowerCase()}function ei(r,t,n){return Math.max(t,Math.min(n,r))}function l1(r,t){return(r%t+t)%t}function Gh(r,t,n){return(1-n)*r+n*t}function Qo(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ti(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class ne{constructor(t=0,n=0){ne.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,s=this.y,l=t.elements;return this.x=l[0]*n+l[3]*s+l[6],this.y=l[1]*n+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(ei(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y;return n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const s=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class he{constructor(t,n,s,l,c,f,d,m,p){he.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,d,m,p)}set(t,n,s,l,c,f,d,m,p){const v=this.elements;return v[0]=t,v[1]=l,v[2]=d,v[3]=n,v[4]=c,v[5]=m,v[6]=s,v[7]=f,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(t,n,s){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],d=s[3],m=s[6],p=s[1],v=s[4],g=s[7],x=s[2],S=s[5],y=s[8],T=l[0],E=l[3],_=l[6],U=l[1],L=l[4],A=l[7],k=l[2],z=l[5],O=l[8];return c[0]=f*T+d*U+m*k,c[3]=f*E+d*L+m*z,c[6]=f*_+d*A+m*O,c[1]=p*T+v*U+g*k,c[4]=p*E+v*L+g*z,c[7]=p*_+v*A+g*O,c[2]=x*T+S*U+y*k,c[5]=x*E+S*L+y*z,c[8]=x*_+S*A+y*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],v=t[8];return n*f*v-n*d*p-s*c*v+s*d*m+l*c*p-l*f*m}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],v=t[8],g=v*f-d*p,x=d*m-v*c,S=p*c-f*m,y=n*g+s*x+l*S;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/y;return t[0]=g*T,t[1]=(l*p-v*s)*T,t[2]=(d*s-l*f)*T,t[3]=x*T,t[4]=(v*n-l*m)*T,t[5]=(l*c-d*n)*T,t[6]=S*T,t[7]=(s*m-p*n)*T,t[8]=(f*n-s*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,s,l,c,f,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*d)+f+t,-l*p,l*m,-l*(-p*f+m*d)+d+n,0,0,1),this}scale(t,n){return this.premultiply(Vh.makeScale(t,n)),this}rotate(t){return this.premultiply(Vh.makeRotation(-t)),this}translate(t,n){return this.premultiply(Vh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<9;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<9;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Vh=new he;function M_(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function du(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function c1(){const r=du("canvas");return r.style.display="block",r}const zv={};function sl(r){r in zv||(zv[r]=!0,console.warn(r))}function u1(r,t,n){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:s()}}setTimeout(c,n)})}function f1(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function h1(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Re={enabled:!0,workingColorSpace:to,spaces:{},convert:function(r,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===He&&(r.r=Ra(r.r),r.g=Ra(r.g),r.b=Ra(r.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===He&&(r.r=qr(r.r),r.g=qr(r.g),r.b=qr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===os?_u:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,n){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Ra(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function qr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Bv=[.64,.33,.3,.6,.15,.06],Iv=[.2126,.7152,.0722],Fv=[.3127,.329],Hv=new he().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gv=new he().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Re.define({[to]:{primaries:Bv,whitePoint:Fv,transfer:_u,toXYZ:Hv,fromXYZ:Gv,luminanceCoefficients:Iv,workingColorSpaceConfig:{unpackColorSpace:Ri},outputColorSpaceConfig:{drawingBufferColorSpace:Ri}},[Ri]:{primaries:Bv,whitePoint:Fv,transfer:He,toXYZ:Hv,fromXYZ:Gv,luminanceCoefficients:Iv,outputColorSpaceConfig:{drawingBufferColorSpace:Ri}}});let Ar;class d1{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ar===void 0&&(Ar=du("canvas")),Ar.width=t.width,Ar.height=t.height;const s=Ar.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ar}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=du("canvas");n.width=t.width,n.height=t.height;const s=n.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ra(c[f]/255)*255;return s.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(Ra(n[s]/255)*255):n[s]=Ra(n[s]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let p1=0;class y_{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:p1++}),this.uuid=ll(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(kh(l[f].image)):c.push(kh(l[f]))}else c=kh(l);s.url=c}return n||(t.images[this.uuid]=s),s}}function kh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?d1.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let m1=0;class kn extends eo{constructor(t=kn.DEFAULT_IMAGE,n=kn.DEFAULT_MAPPING,s=Hs,l=Hs,c=Hi,f=Gs,d=Gi,m=Ca,p=kn.DEFAULT_ANISOTROPY,v=os){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:m1++}),this.uuid=ll(),this.name="",this.source=new y_(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==l_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Od:t.x=t.x-Math.floor(t.x);break;case Hs:t.x=t.x<0?0:1;break;case Pd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Od:t.y=t.y-Math.floor(t.y);break;case Hs:t.y=t.y<0?0:1;break;case Pd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}kn.DEFAULT_IMAGE=null;kn.DEFAULT_MAPPING=l_;kn.DEFAULT_ANISOTROPY=1;class je{constructor(t=0,n=0,s=0,l=1){je.prototype.isVector4=!0,this.x=t,this.y=n,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,s,l){return this.x=t,this.y=n,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,s,l,c;const m=t.elements,p=m[0],v=m[4],g=m[8],x=m[1],S=m[5],y=m[9],T=m[2],E=m[6],_=m[10];if(Math.abs(v-x)<.01&&Math.abs(g-T)<.01&&Math.abs(y-E)<.01){if(Math.abs(v+x)<.1&&Math.abs(g+T)<.1&&Math.abs(y+E)<.1&&Math.abs(p+S+_-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const L=(p+1)/2,A=(S+1)/2,k=(_+1)/2,z=(v+x)/4,O=(g+T)/4,F=(y+E)/4;return L>A&&L>k?L<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(L),l=z/s,c=O/s):A>k?A<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(A),s=z/l,c=F/l):k<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(k),s=O/c,l=F/c),this.set(s,l,c,n),this}let U=Math.sqrt((E-y)*(E-y)+(g-T)*(g-T)+(x-v)*(x-v));return Math.abs(U)<.001&&(U=1),this.x=(E-y)/U,this.y=(g-T)/U,this.z=(x-v)/U,this.w=Math.acos((p+S+_-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this.w=t.w+(n.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class g1 extends eo{constructor(t=1,n=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new je(0,0,t,n),this.scissorTest=!1,this.viewport=new je(0,0,t,n);const l={width:t,height:n,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new kn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const f=s.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,s=1){if(this.width!==t||this.height!==n||this.depth!==s){this.width=t,this.height=n,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new y_(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends g1{constructor(t=1,n=1,s={}){super(t,n,s),this.isWebGLRenderTarget=!0}}class E_ extends kn{constructor(t=null,n=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=pi,this.minFilter=pi,this.wrapR=Hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class v1 extends kn{constructor(t=null,n=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=pi,this.minFilter=pi,this.wrapR=Hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cl{constructor(t=0,n=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=s,this._w=l}static slerpFlat(t,n,s,l,c,f,d){let m=s[l+0],p=s[l+1],v=s[l+2],g=s[l+3];const x=c[f+0],S=c[f+1],y=c[f+2],T=c[f+3];if(d===0){t[n+0]=m,t[n+1]=p,t[n+2]=v,t[n+3]=g;return}if(d===1){t[n+0]=x,t[n+1]=S,t[n+2]=y,t[n+3]=T;return}if(g!==T||m!==x||p!==S||v!==y){let E=1-d;const _=m*x+p*S+v*y+g*T,U=_>=0?1:-1,L=1-_*_;if(L>Number.EPSILON){const k=Math.sqrt(L),z=Math.atan2(k,_*U);E=Math.sin(E*z)/k,d=Math.sin(d*z)/k}const A=d*U;if(m=m*E+x*A,p=p*E+S*A,v=v*E+y*A,g=g*E+T*A,E===1-d){const k=1/Math.sqrt(m*m+p*p+v*v+g*g);m*=k,p*=k,v*=k,g*=k}}t[n]=m,t[n+1]=p,t[n+2]=v,t[n+3]=g}static multiplyQuaternionsFlat(t,n,s,l,c,f){const d=s[l],m=s[l+1],p=s[l+2],v=s[l+3],g=c[f],x=c[f+1],S=c[f+2],y=c[f+3];return t[n]=d*y+v*g+m*S-p*x,t[n+1]=m*y+v*x+p*g-d*S,t[n+2]=p*y+v*S+d*x-m*g,t[n+3]=v*y-d*g-m*x-p*S,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,s,l){return this._x=t,this._y=n,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const s=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,m=Math.sin,p=d(s/2),v=d(l/2),g=d(c/2),x=m(s/2),S=m(l/2),y=m(c/2);switch(f){case"XYZ":this._x=x*v*g+p*S*y,this._y=p*S*g-x*v*y,this._z=p*v*y+x*S*g,this._w=p*v*g-x*S*y;break;case"YXZ":this._x=x*v*g+p*S*y,this._y=p*S*g-x*v*y,this._z=p*v*y-x*S*g,this._w=p*v*g+x*S*y;break;case"ZXY":this._x=x*v*g-p*S*y,this._y=p*S*g+x*v*y,this._z=p*v*y+x*S*g,this._w=p*v*g-x*S*y;break;case"ZYX":this._x=x*v*g-p*S*y,this._y=p*S*g+x*v*y,this._z=p*v*y-x*S*g,this._w=p*v*g+x*S*y;break;case"YZX":this._x=x*v*g+p*S*y,this._y=p*S*g+x*v*y,this._z=p*v*y-x*S*g,this._w=p*v*g-x*S*y;break;case"XZY":this._x=x*v*g-p*S*y,this._y=p*S*g-x*v*y,this._z=p*v*y+x*S*g,this._w=p*v*g+x*S*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const s=n/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,s=n[0],l=n[4],c=n[8],f=n[1],d=n[5],m=n[9],p=n[2],v=n[6],g=n[10],x=s+d+g;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(v-m)*S,this._y=(c-p)*S,this._z=(f-l)*S}else if(s>d&&s>g){const S=2*Math.sqrt(1+s-d-g);this._w=(v-m)/S,this._x=.25*S,this._y=(l+f)/S,this._z=(c+p)/S}else if(d>g){const S=2*Math.sqrt(1+d-s-g);this._w=(c-p)/S,this._x=(l+f)/S,this._y=.25*S,this._z=(m+v)/S}else{const S=2*Math.sqrt(1+g-s-d);this._w=(f-l)/S,this._x=(c+p)/S,this._y=(m+v)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let s=t.dot(n)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ei(this.dot(t),-1,1)))}rotateTowards(t,n){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,n/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const s=t._x,l=t._y,c=t._z,f=t._w,d=n._x,m=n._y,p=n._z,v=n._w;return this._x=s*v+f*d+l*p-c*m,this._y=l*v+f*m+c*d-s*p,this._z=c*v+f*p+s*m-l*d,this._w=f*v-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,f=this._w;let d=f*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=f,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const S=1-n;return this._w=S*f+n*this._w,this._x=S*s+n*this._x,this._y=S*l+n*this._y,this._z=S*c+n*this._z,this.normalize(),this}const p=Math.sqrt(m),v=Math.atan2(p,d),g=Math.sin((1-n)*v)/p,x=Math.sin(n*v)/p;return this._w=f*g+this._w*x,this._x=s*g+this._x*x,this._y=l*g+this._y*x,this._z=c*g+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,n,s){return this.copy(t).slerp(n,s)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,n=0,s=0){V.prototype.isVector3=!0,this.x=t,this.y=n,this.z=s}set(t,n,s){return s===void 0&&(s=this.z),this.x=t,this.y=n,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Vv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Vv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*s+c[6]*l,this.y=c[1]*n+c[4]*s+c[7]*l,this.z=c[2]*n+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,s=this.y,l=this.z,c=t.x,f=t.y,d=t.z,m=t.w,p=2*(f*l-d*s),v=2*(d*n-c*l),g=2*(c*s-f*n);return this.x=n+m*p+f*g-d*v,this.y=s+m*v+d*p-c*g,this.z=l+m*g+c*v-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*s+c[8]*l,this.y=c[1]*n+c[5]*s+c[9]*l,this.z=c[2]*n+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const s=t.x,l=t.y,c=t.z,f=n.x,d=n.y,m=n.z;return this.x=l*m-c*d,this.y=c*f-s*m,this.z=s*d-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const s=t.dot(this)/n;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Xh.copy(this).projectOnVector(t),this.sub(Xh)}reflect(t){return this.sub(Xh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(ei(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return n*n+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,s){const l=Math.sin(n)*t;return this.x=l*Math.sin(s),this.y=Math.cos(n)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,s){return this.x=t*Math.sin(n),this.y=s,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=s,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,s=Math.sqrt(1-n*n);return this.x=s*Math.cos(t),this.y=n,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xh=new V,Vv=new cl;class ul{constructor(t=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n+=3)this.expandByPoint(Bi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,s=t.count;n<s;n++)this.expandByPoint(Bi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const s=Bi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,Bi):Bi.fromBufferAttribute(c,f),Bi.applyMatrix4(t.matrixWorld),this.expandByPoint(Bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),bc.copy(s.boundingBox)),bc.applyMatrix4(t.matrixWorld),this.union(bc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bi),Bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,s;return t.normal.x>0?(n=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),n<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Jo),Ac.subVectors(this.max,Jo),wr.subVectors(t.a,Jo),Rr.subVectors(t.b,Jo),Cr.subVectors(t.c,Jo),es.subVectors(Rr,wr),ns.subVectors(Cr,Rr),Cs.subVectors(wr,Cr);let n=[0,-es.z,es.y,0,-ns.z,ns.y,0,-Cs.z,Cs.y,es.z,0,-es.x,ns.z,0,-ns.x,Cs.z,0,-Cs.x,-es.y,es.x,0,-ns.y,ns.x,0,-Cs.y,Cs.x,0];return!Wh(n,wr,Rr,Cr,Ac)||(n=[1,0,0,0,1,0,0,0,1],!Wh(n,wr,Rr,Cr,Ac))?!1:(wc.crossVectors(es,ns),n=[wc.x,wc.y,wc.z],Wh(n,wr,Rr,Cr,Ac))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(va[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),va[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),va[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),va[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),va[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),va[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),va[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),va[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(va),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const va=[new V,new V,new V,new V,new V,new V,new V,new V],Bi=new V,bc=new ul,wr=new V,Rr=new V,Cr=new V,es=new V,ns=new V,Cs=new V,Jo=new V,Ac=new V,wc=new V,Ds=new V;function Wh(r,t,n,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Ds.fromArray(r,c);const d=l.x*Math.abs(Ds.x)+l.y*Math.abs(Ds.y)+l.z*Math.abs(Ds.z),m=t.dot(Ds),p=n.dot(Ds),v=s.dot(Ds);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>d)return!1}return!0}const x1=new ul,$o=new V,qh=new V;class fl{constructor(t=new V,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const s=this.center;n!==void 0?s.copy(n):x1.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const s=this.center.distanceToSquared(t);return n.copy(t),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$o.subVectors(t,this.center);const n=$o.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),l=(s-this.radius)*.5;this.center.addScaledVector($o,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(qh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($o.copy(t.center).add(qh)),this.expandByPoint($o.copy(t.center).sub(qh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xa=new V,jh=new V,Rc=new V,is=new V,Yh=new V,Cc=new V,Zh=new V;class Mp{constructor(t=new V,n=new V(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xa)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=xa.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(xa.copy(this.origin).addScaledVector(this.direction,n),xa.distanceToSquared(t))}distanceSqToSegment(t,n,s,l){jh.copy(t).add(n).multiplyScalar(.5),Rc.copy(n).sub(t).normalize(),is.copy(this.origin).sub(jh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(Rc),d=is.dot(this.direction),m=-is.dot(Rc),p=is.lengthSq(),v=Math.abs(1-f*f);let g,x,S,y;if(v>0)if(g=f*m-d,x=f*d-m,y=c*v,g>=0)if(x>=-y)if(x<=y){const T=1/v;g*=T,x*=T,S=g*(g+f*x+2*d)+x*(f*g+x+2*m)+p}else x=c,g=Math.max(0,-(f*x+d)),S=-g*g+x*(x+2*m)+p;else x=-c,g=Math.max(0,-(f*x+d)),S=-g*g+x*(x+2*m)+p;else x<=-y?(g=Math.max(0,-(-f*c+d)),x=g>0?-c:Math.min(Math.max(-c,-m),c),S=-g*g+x*(x+2*m)+p):x<=y?(g=0,x=Math.min(Math.max(-c,-m),c),S=x*(x+2*m)+p):(g=Math.max(0,-(f*c+d)),x=g>0?c:Math.min(Math.max(-c,-m),c),S=-g*g+x*(x+2*m)+p);else x=f>0?-c:c,g=Math.max(0,-(f*x+d)),S=-g*g+x*(x+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,g),l&&l.copy(jh).addScaledVector(Rc,x),S}intersectSphere(t,n){xa.subVectors(t.center,this.origin);const s=xa.dot(this.direction),l=xa.dot(xa)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=s-f,m=s+f;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/n;return s>=0?s:null}intersectPlane(t,n){const s=this.distanceToPlane(t);return s===null?null:this.at(s,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let s,l,c,f,d,m;const p=1/this.direction.x,v=1/this.direction.y,g=1/this.direction.z,x=this.origin;return p>=0?(s=(t.min.x-x.x)*p,l=(t.max.x-x.x)*p):(s=(t.max.x-x.x)*p,l=(t.min.x-x.x)*p),v>=0?(c=(t.min.y-x.y)*v,f=(t.max.y-x.y)*v):(c=(t.max.y-x.y)*v,f=(t.min.y-x.y)*v),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),g>=0?(d=(t.min.z-x.z)*g,m=(t.max.z-x.z)*g):(d=(t.max.z-x.z)*g,m=(t.min.z-x.z)*g),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,n)}intersectsBox(t){return this.intersectBox(t,xa)!==null}intersectTriangle(t,n,s,l,c){Yh.subVectors(n,t),Cc.subVectors(s,t),Zh.crossVectors(Yh,Cc);let f=this.direction.dot(Zh),d;if(f>0){if(l)return null;d=1}else if(f<0)d=-1,f=-f;else return null;is.subVectors(this.origin,t);const m=d*this.direction.dot(Cc.crossVectors(is,Cc));if(m<0)return null;const p=d*this.direction.dot(Yh.cross(is));if(p<0||m+p>f)return null;const v=-d*is.dot(Zh);return v<0?null:this.at(v/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Je{constructor(t,n,s,l,c,f,d,m,p,v,g,x,S,y,T,E){Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,d,m,p,v,g,x,S,y,T,E)}set(t,n,s,l,c,f,d,m,p,v,g,x,S,y,T,E){const _=this.elements;return _[0]=t,_[4]=n,_[8]=s,_[12]=l,_[1]=c,_[5]=f,_[9]=d,_[13]=m,_[2]=p,_[6]=v,_[10]=g,_[14]=x,_[3]=S,_[7]=y,_[11]=T,_[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(t){const n=this.elements,s=t.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,s){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,n,s){return this.set(t.x,n.x,s.x,0,t.y,n.y,s.y,0,t.z,n.z,s.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,s=t.elements,l=1/Dr.setFromMatrixColumn(t,0).length(),c=1/Dr.setFromMatrixColumn(t,1).length(),f=1/Dr.setFromMatrixColumn(t,2).length();return n[0]=s[0]*l,n[1]=s[1]*l,n[2]=s[2]*l,n[3]=0,n[4]=s[4]*c,n[5]=s[5]*c,n[6]=s[6]*c,n[7]=0,n[8]=s[8]*f,n[9]=s[9]*f,n[10]=s[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),v=Math.cos(c),g=Math.sin(c);if(t.order==="XYZ"){const x=f*v,S=f*g,y=d*v,T=d*g;n[0]=m*v,n[4]=-m*g,n[8]=p,n[1]=S+y*p,n[5]=x-T*p,n[9]=-d*m,n[2]=T-x*p,n[6]=y+S*p,n[10]=f*m}else if(t.order==="YXZ"){const x=m*v,S=m*g,y=p*v,T=p*g;n[0]=x+T*d,n[4]=y*d-S,n[8]=f*p,n[1]=f*g,n[5]=f*v,n[9]=-d,n[2]=S*d-y,n[6]=T+x*d,n[10]=f*m}else if(t.order==="ZXY"){const x=m*v,S=m*g,y=p*v,T=p*g;n[0]=x-T*d,n[4]=-f*g,n[8]=y+S*d,n[1]=S+y*d,n[5]=f*v,n[9]=T-x*d,n[2]=-f*p,n[6]=d,n[10]=f*m}else if(t.order==="ZYX"){const x=f*v,S=f*g,y=d*v,T=d*g;n[0]=m*v,n[4]=y*p-S,n[8]=x*p+T,n[1]=m*g,n[5]=T*p+x,n[9]=S*p-y,n[2]=-p,n[6]=d*m,n[10]=f*m}else if(t.order==="YZX"){const x=f*m,S=f*p,y=d*m,T=d*p;n[0]=m*v,n[4]=T-x*g,n[8]=y*g+S,n[1]=g,n[5]=f*v,n[9]=-d*v,n[2]=-p*v,n[6]=S*g+y,n[10]=x-T*g}else if(t.order==="XZY"){const x=f*m,S=f*p,y=d*m,T=d*p;n[0]=m*v,n[4]=-g,n[8]=p*v,n[1]=x*g+T,n[5]=f*v,n[9]=S*g-y,n[2]=y*g-S,n[6]=d*v,n[10]=T*g+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_1,t,S1)}lookAt(t,n,s){const l=this.elements;return ui.subVectors(t,n),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),as.crossVectors(s,ui),as.lengthSq()===0&&(Math.abs(s.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),as.crossVectors(s,ui)),as.normalize(),Dc.crossVectors(ui,as),l[0]=as.x,l[4]=Dc.x,l[8]=ui.x,l[1]=as.y,l[5]=Dc.y,l[9]=ui.y,l[2]=as.z,l[6]=Dc.z,l[10]=ui.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],d=s[4],m=s[8],p=s[12],v=s[1],g=s[5],x=s[9],S=s[13],y=s[2],T=s[6],E=s[10],_=s[14],U=s[3],L=s[7],A=s[11],k=s[15],z=l[0],O=l[4],F=l[8],D=l[12],R=l[1],H=l[5],et=l[9],st=l[13],ht=l[2],mt=l[6],B=l[10],Q=l[14],K=l[3],Mt=l[7],Tt=l[11],P=l[15];return c[0]=f*z+d*R+m*ht+p*K,c[4]=f*O+d*H+m*mt+p*Mt,c[8]=f*F+d*et+m*B+p*Tt,c[12]=f*D+d*st+m*Q+p*P,c[1]=v*z+g*R+x*ht+S*K,c[5]=v*O+g*H+x*mt+S*Mt,c[9]=v*F+g*et+x*B+S*Tt,c[13]=v*D+g*st+x*Q+S*P,c[2]=y*z+T*R+E*ht+_*K,c[6]=y*O+T*H+E*mt+_*Mt,c[10]=y*F+T*et+E*B+_*Tt,c[14]=y*D+T*st+E*Q+_*P,c[3]=U*z+L*R+A*ht+k*K,c[7]=U*O+L*H+A*mt+k*Mt,c[11]=U*F+L*et+A*B+k*Tt,c[15]=U*D+L*st+A*Q+k*P,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[4],l=t[8],c=t[12],f=t[1],d=t[5],m=t[9],p=t[13],v=t[2],g=t[6],x=t[10],S=t[14],y=t[3],T=t[7],E=t[11],_=t[15];return y*(+c*m*g-l*p*g-c*d*x+s*p*x+l*d*S-s*m*S)+T*(+n*m*S-n*p*x+c*f*x-l*f*S+l*p*v-c*m*v)+E*(+n*p*g-n*d*S-c*f*g+s*f*S+c*d*v-s*p*v)+_*(-l*d*v-n*m*g+n*d*x+l*f*g-s*f*x+s*m*v)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=s),this}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],v=t[8],g=t[9],x=t[10],S=t[11],y=t[12],T=t[13],E=t[14],_=t[15],U=g*E*p-T*x*p+T*m*S-d*E*S-g*m*_+d*x*_,L=y*x*p-v*E*p-y*m*S+f*E*S+v*m*_-f*x*_,A=v*T*p-y*g*p+y*d*S-f*T*S-v*d*_+f*g*_,k=y*g*m-v*T*m-y*d*x+f*T*x+v*d*E-f*g*E,z=n*U+s*L+l*A+c*k;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/z;return t[0]=U*O,t[1]=(T*x*c-g*E*c-T*l*S+s*E*S+g*l*_-s*x*_)*O,t[2]=(d*E*c-T*m*c+T*l*p-s*E*p-d*l*_+s*m*_)*O,t[3]=(g*m*c-d*x*c-g*l*p+s*x*p+d*l*S-s*m*S)*O,t[4]=L*O,t[5]=(v*E*c-y*x*c+y*l*S-n*E*S-v*l*_+n*x*_)*O,t[6]=(y*m*c-f*E*c-y*l*p+n*E*p+f*l*_-n*m*_)*O,t[7]=(f*x*c-v*m*c+v*l*p-n*x*p-f*l*S+n*m*S)*O,t[8]=A*O,t[9]=(y*g*c-v*T*c-y*s*S+n*T*S+v*s*_-n*g*_)*O,t[10]=(f*T*c-y*d*c+y*s*p-n*T*p-f*s*_+n*d*_)*O,t[11]=(v*d*c-f*g*c-v*s*p+n*g*p+f*s*S-n*d*S)*O,t[12]=k*O,t[13]=(v*T*l-y*g*l+y*s*x-n*T*x-v*s*E+n*g*E)*O,t[14]=(y*d*l-f*T*l-y*s*m+n*T*m+f*s*E-n*d*E)*O,t[15]=(f*g*l-v*d*l+v*s*m-n*g*m-f*s*x+n*d*x)*O,this}scale(t){const n=this.elements,s=t.x,l=t.y,c=t.z;return n[0]*=s,n[4]*=l,n[8]*=c,n[1]*=s,n[5]*=l,n[9]*=c,n[2]*=s,n[6]*=l,n[10]*=c,n[3]*=s,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,s,l))}makeTranslation(t,n,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const s=Math.cos(n),l=Math.sin(n),c=1-s,f=t.x,d=t.y,m=t.z,p=c*f,v=c*d;return this.set(p*f+s,p*d-l*m,p*m+l*d,0,p*d+l*m,v*d+s,v*m-l*f,0,p*m-l*d,v*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,n,s){return this.set(t,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,n,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,s){const l=this.elements,c=n._x,f=n._y,d=n._z,m=n._w,p=c+c,v=f+f,g=d+d,x=c*p,S=c*v,y=c*g,T=f*v,E=f*g,_=d*g,U=m*p,L=m*v,A=m*g,k=s.x,z=s.y,O=s.z;return l[0]=(1-(T+_))*k,l[1]=(S+A)*k,l[2]=(y-L)*k,l[3]=0,l[4]=(S-A)*z,l[5]=(1-(x+_))*z,l[6]=(E+U)*z,l[7]=0,l[8]=(y+L)*O,l[9]=(E-U)*O,l[10]=(1-(x+T))*O,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,s){const l=this.elements;let c=Dr.set(l[0],l[1],l[2]).length();const f=Dr.set(l[4],l[5],l[6]).length(),d=Dr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Ii.copy(this);const p=1/c,v=1/f,g=1/d;return Ii.elements[0]*=p,Ii.elements[1]*=p,Ii.elements[2]*=p,Ii.elements[4]*=v,Ii.elements[5]*=v,Ii.elements[6]*=v,Ii.elements[8]*=g,Ii.elements[9]*=g,Ii.elements[10]*=g,n.setFromRotationMatrix(Ii),s.x=c,s.y=f,s.z=d,this}makePerspective(t,n,s,l,c,f,d=Aa){const m=this.elements,p=2*c/(n-t),v=2*c/(s-l),g=(n+t)/(n-t),x=(s+l)/(s-l);let S,y;if(d===Aa)S=-(f+c)/(f-c),y=-2*f*c/(f-c);else if(d===hu)S=-f/(f-c),y=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=g,m[12]=0,m[1]=0,m[5]=v,m[9]=x,m[13]=0,m[2]=0,m[6]=0,m[10]=S,m[14]=y,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,n,s,l,c,f,d=Aa){const m=this.elements,p=1/(n-t),v=1/(s-l),g=1/(f-c),x=(n+t)*p,S=(s+l)*v;let y,T;if(d===Aa)y=(f+c)*g,T=-2*g;else if(d===hu)y=c*g,T=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-x,m[1]=0,m[5]=2*v,m[9]=0,m[13]=-S,m[2]=0,m[6]=0,m[10]=T,m[14]=-y,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<16;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<16;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t[n+9]=s[9],t[n+10]=s[10],t[n+11]=s[11],t[n+12]=s[12],t[n+13]=s[13],t[n+14]=s[14],t[n+15]=s[15],t}}const Dr=new V,Ii=new Je,_1=new V(0,0,0),S1=new V(1,1,1),as=new V,Dc=new V,ui=new V,kv=new Je,Xv=new cl;class Qi{constructor(t=0,n=0,s=0,l=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,s,l=this._order){return this._x=t,this._y=n,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],m=l[1],p=l[5],v=l[9],g=l[2],x=l[6],S=l[10];switch(n){case"XYZ":this._y=Math.asin(ei(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,S),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-ei(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(ei(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-ei(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(ei(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-ei(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-v,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,s){return kv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(kv,n,s)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Xv.setFromEuler(this),this.setFromQuaternion(Xv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class T_{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let M1=0;const Wv=new V,Lr=new cl,_a=new Je,Lc=new V,tl=new V,y1=new V,E1=new cl,qv=new V(1,0,0),jv=new V(0,1,0),Yv=new V(0,0,1),Zv={type:"added"},T1={type:"removed"},Ur={type:"childadded",child:null},Kh={type:"childremoved",child:null};class wn extends eo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:M1++}),this.uuid=ll(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const t=new V,n=new Qi,s=new cl,l=new V(1,1,1);function c(){s.setFromEuler(n,!1)}function f(){n.setFromQuaternion(s,void 0,!1)}n._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Je},normalMatrix:{value:new he}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new T_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Lr.setFromAxisAngle(t,n),this.quaternion.multiply(Lr),this}rotateOnWorldAxis(t,n){return Lr.setFromAxisAngle(t,n),this.quaternion.premultiply(Lr),this}rotateX(t){return this.rotateOnAxis(qv,t)}rotateY(t){return this.rotateOnAxis(jv,t)}rotateZ(t){return this.rotateOnAxis(Yv,t)}translateOnAxis(t,n){return Wv.copy(t).applyQuaternion(this.quaternion),this.position.add(Wv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(qv,t)}translateY(t){return this.translateOnAxis(jv,t)}translateZ(t){return this.translateOnAxis(Yv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_a.copy(this.matrixWorld).invert())}lookAt(t,n,s){t.isVector3?Lc.copy(t):Lc.set(t,n,s);const l=this.parent;this.updateWorldMatrix(!0,!1),tl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_a.lookAt(tl,Lc,this.up):_a.lookAt(Lc,tl,this.up),this.quaternion.setFromRotationMatrix(_a),l&&(_a.extractRotation(l.matrixWorld),Lr.setFromRotationMatrix(_a),this.quaternion.premultiply(Lr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zv),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(T1),Kh.child=t,this.dispatchEvent(Kh),Kh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_a.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_a.multiply(t.parent.matrixWorld)),t.applyMatrix4(_a),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zv),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,s=[]){this[t]===n&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,t,y1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tl,E1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].updateMatrixWorld(t)}updateWorldMatrix(t,n){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",s={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const g=m[p];c(t.shapes,g)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(n){const d=f(t.geometries),m=f(t.materials),p=f(t.textures),v=f(t.images),g=f(t.shapes),x=f(t.skeletons),S=f(t.animations),y=f(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),v.length>0&&(s.images=v),g.length>0&&(s.shapes=g),x.length>0&&(s.skeletons=x),S.length>0&&(s.animations=S),y.length>0&&(s.nodes=y)}return s.object=l,s;function f(d){const m=[];for(const p in d){const v=d[p];delete v.metadata,m.push(v)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}wn.DEFAULT_UP=new V(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fi=new V,Sa=new V,Qh=new V,Ma=new V,Nr=new V,Or=new V,Kv=new V,Jh=new V,$h=new V,td=new V,ed=new je,nd=new je,id=new je;class Di{constructor(t=new V,n=new V,s=new V){this.a=t,this.b=n,this.c=s}static getNormal(t,n,s,l){l.subVectors(s,n),Fi.subVectors(t,n),l.cross(Fi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,s,l,c){Fi.subVectors(l,n),Sa.subVectors(s,n),Qh.subVectors(t,n);const f=Fi.dot(Fi),d=Fi.dot(Sa),m=Fi.dot(Qh),p=Sa.dot(Sa),v=Sa.dot(Qh),g=f*p-d*d;if(g===0)return c.set(0,0,0),null;const x=1/g,S=(p*m-d*v)*x,y=(f*v-d*m)*x;return c.set(1-S-y,y,S)}static containsPoint(t,n,s,l){return this.getBarycoord(t,n,s,l,Ma)===null?!1:Ma.x>=0&&Ma.y>=0&&Ma.x+Ma.y<=1}static getInterpolation(t,n,s,l,c,f,d,m){return this.getBarycoord(t,n,s,l,Ma)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Ma.x),m.addScaledVector(f,Ma.y),m.addScaledVector(d,Ma.z),m)}static getInterpolatedAttribute(t,n,s,l,c,f){return ed.setScalar(0),nd.setScalar(0),id.setScalar(0),ed.fromBufferAttribute(t,n),nd.fromBufferAttribute(t,s),id.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(ed,c.x),f.addScaledVector(nd,c.y),f.addScaledVector(id,c.z),f}static isFrontFacing(t,n,s,l){return Fi.subVectors(s,n),Sa.subVectors(t,n),Fi.cross(Sa).dot(l)<0}set(t,n,s){return this.a.copy(t),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(t,n,s,l){return this.a.copy(t[n]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,s,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fi.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),Fi.cross(Sa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Di.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Di.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,s,l,c){return Di.getInterpolation(t,this.a,this.b,this.c,n,s,l,c)}containsPoint(t){return Di.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Di.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const s=this.a,l=this.b,c=this.c;let f,d;Nr.subVectors(l,s),Or.subVectors(c,s),Jh.subVectors(t,s);const m=Nr.dot(Jh),p=Or.dot(Jh);if(m<=0&&p<=0)return n.copy(s);$h.subVectors(t,l);const v=Nr.dot($h),g=Or.dot($h);if(v>=0&&g<=v)return n.copy(l);const x=m*g-v*p;if(x<=0&&m>=0&&v<=0)return f=m/(m-v),n.copy(s).addScaledVector(Nr,f);td.subVectors(t,c);const S=Nr.dot(td),y=Or.dot(td);if(y>=0&&S<=y)return n.copy(c);const T=S*p-m*y;if(T<=0&&p>=0&&y<=0)return d=p/(p-y),n.copy(s).addScaledVector(Or,d);const E=v*y-S*g;if(E<=0&&g-v>=0&&S-y>=0)return Kv.subVectors(c,l),d=(g-v)/(g-v+(S-y)),n.copy(l).addScaledVector(Kv,d);const _=1/(E+T+x);return f=T*_,d=x*_,n.copy(s).addScaledVector(Nr,f).addScaledVector(Or,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const b_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},Uc={h:0,s:0,l:0};function ad(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class te{constructor(t,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,s)}set(t,n,s){if(n===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Re.toWorkingColorSpace(this,n),this}setRGB(t,n,s,l=Re.workingColorSpace){return this.r=t,this.g=n,this.b=s,Re.toWorkingColorSpace(this,l),this}setHSL(t,n,s,l=Re.workingColorSpace){if(t=l1(t,1),n=ei(n,0,1),s=ei(s,0,1),n===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+n):s+n-s*n,f=2*s-c;this.r=ad(f,c,t+1/3),this.g=ad(f,c,t),this.b=ad(f,c,t-1/3)}return Re.toWorkingColorSpace(this,l),this}setStyle(t,n=Ri){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ri){const s=b_[t.toLowerCase()];return s!==void 0?this.setHex(s,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ra(t.r),this.g=Ra(t.g),this.b=Ra(t.b),this}copyLinearToSRGB(t){return this.r=qr(t.r),this.g=qr(t.g),this.b=qr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ri){return Re.fromWorkingColorSpace(Vn.copy(this),t),Math.round(ei(Vn.r*255,0,255))*65536+Math.round(ei(Vn.g*255,0,255))*256+Math.round(ei(Vn.b*255,0,255))}getHexString(t=Ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Re.workingColorSpace){Re.fromWorkingColorSpace(Vn.copy(this),n);const s=Vn.r,l=Vn.g,c=Vn.b,f=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const v=(d+f)/2;if(d===f)m=0,p=0;else{const g=f-d;switch(p=v<=.5?g/(f+d):g/(2-f-d),f){case s:m=(l-c)/g+(l<c?6:0);break;case l:m=(c-s)/g+2;break;case c:m=(s-l)/g+4;break}m/=6}return t.h=m,t.s=p,t.l=v,t}getRGB(t,n=Re.workingColorSpace){return Re.fromWorkingColorSpace(Vn.copy(this),n),t.r=Vn.r,t.g=Vn.g,t.b=Vn.b,t}getStyle(t=Ri){Re.fromWorkingColorSpace(Vn.copy(this),t);const n=Vn.r,s=Vn.g,l=Vn.b;return t!==Ri?`color(${t} ${n.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,n,s){return this.getHSL(ss),this.setHSL(ss.h+t,ss.s+n,ss.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,s){return this.r=t.r+(n.r-t.r)*s,this.g=t.g+(n.g-t.g)*s,this.b=t.b+(n.b-t.b)*s,this}lerpHSL(t,n){this.getHSL(ss),t.getHSL(Uc);const s=Gh(ss.h,Uc.h,n),l=Gh(ss.s,Uc.s,n),c=Gh(ss.l,Uc.l,n);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*s+c[6]*l,this.g=c[1]*n+c[4]*s+c[7]*l,this.b=c[2]*n+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new te;te.NAMES=b_;let b1=0;class Xs extends eo{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:b1++}),this.uuid=ll(),this.name="",this.blending=kr,this.side=us,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ed,this.blendDst=Td,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=br,this.stencilZFail=br,this.stencilZPass=br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const s=t[n];if(s===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[n]=s}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==kr&&(s.blending=this.blending),this.side!==us&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Ed&&(s.blendSrc=this.blendSrc),this.blendDst!==Td&&(s.blendDst=this.blendDst),this.blendEquation!==Is&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==jr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nv&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==br&&(s.stencilFail=this.stencilFail),this.stencilZFail!==br&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==br&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const d in c){const m=c[d];delete m.metadata,f.push(m)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let s=null;if(n!==null){const l=n.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=n[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ea extends Xs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=e_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const mn=new V,Nc=new ne;class qn{constructor(t,n,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=s,this.usage=Ov,this.updateRanges=[],this.gpuType=ba,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,s){t*=this.itemSize,s*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)Nc.fromBufferAttribute(this,n),Nc.applyMatrix3(t),this.setXY(n,Nc.x,Nc.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(t){for(let n=0,s=this.count;n<s;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let n=0,s=this.count;n<s;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let n=0,s=this.count;n<s;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let s=this.array[t*this.itemSize+n];return this.normalized&&(s=Qo(s,this.array)),s}setComponent(t,n,s){return this.normalized&&(s=ti(s,this.array)),this.array[t*this.itemSize+n]=s,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Qo(n,this.array)),n}setX(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Qo(n,this.array)),n}setY(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Qo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Qo(n,this.array)),n}setW(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,s){return t*=this.itemSize,this.normalized&&(n=ti(n,this.array),s=ti(s,this.array)),this.array[t+0]=n,this.array[t+1]=s,this}setXYZ(t,n,s,l){return t*=this.itemSize,this.normalized&&(n=ti(n,this.array),s=ti(s,this.array),l=ti(l,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,n,s,l,c){return t*=this.itemSize,this.normalized&&(n=ti(n,this.array),s=ti(s,this.array),l=ti(l,this.array),c=ti(c,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ov&&(t.usage=this.usage),t}}class A_ extends qn{constructor(t,n,s){super(new Uint16Array(t),n,s)}}class w_ extends qn{constructor(t,n,s){super(new Uint32Array(t),n,s)}}class an extends qn{constructor(t,n,s){super(new Float32Array(t),n,s)}}let A1=0;const Ai=new Je,sd=new wn,Pr=new V,fi=new ul,el=new ul,Tn=new V;class Rn extends eo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:A1++}),this.uuid=ll(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(M_(t)?w_:A_)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,s=0){this.groups.push({start:t,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new he().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ai.makeRotationFromQuaternion(t),this.applyMatrix4(Ai),this}rotateX(t){return Ai.makeRotationX(t),this.applyMatrix4(Ai),this}rotateY(t){return Ai.makeRotationY(t),this.applyMatrix4(Ai),this}rotateZ(t){return Ai.makeRotationZ(t),this.applyMatrix4(Ai),this}translate(t,n,s){return Ai.makeTranslation(t,n,s),this.applyMatrix4(Ai),this}scale(t,n,s){return Ai.makeScale(t,n,s),this.applyMatrix4(Ai),this}lookAt(t){return sd.lookAt(t),sd.updateMatrix(),this.applyMatrix4(sd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new an(s,3))}else{for(let s=0,l=n.count;s<l;s++){const c=t[s];n.setXYZ(s,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ul);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let s=0,l=n.length;s<l;s++){const c=n[s];fi.setFromBufferAttribute(c),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const s=this.boundingSphere.center;if(fi.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const d=n[c];el.setFromBufferAttribute(d),this.morphTargetsRelative?(Tn.addVectors(fi.min,el.min),fi.expandByPoint(Tn),Tn.addVectors(fi.max,el.max),fi.expandByPoint(Tn)):(fi.expandByPoint(el.min),fi.expandByPoint(el.max))}fi.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)Tn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(Tn));if(n)for(let c=0,f=n.length;c<f;c++){const d=n[c],m=this.morphTargetsRelative;for(let p=0,v=d.count;p<v;p++)Tn.fromBufferAttribute(d,p),m&&(Pr.fromBufferAttribute(t,p),Tn.add(Pr)),l=Math.max(l,s.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qn(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),d=[],m=[];for(let F=0;F<s.count;F++)d[F]=new V,m[F]=new V;const p=new V,v=new V,g=new V,x=new ne,S=new ne,y=new ne,T=new V,E=new V;function _(F,D,R){p.fromBufferAttribute(s,F),v.fromBufferAttribute(s,D),g.fromBufferAttribute(s,R),x.fromBufferAttribute(c,F),S.fromBufferAttribute(c,D),y.fromBufferAttribute(c,R),v.sub(p),g.sub(p),S.sub(x),y.sub(x);const H=1/(S.x*y.y-y.x*S.y);isFinite(H)&&(T.copy(v).multiplyScalar(y.y).addScaledVector(g,-S.y).multiplyScalar(H),E.copy(g).multiplyScalar(S.x).addScaledVector(v,-y.x).multiplyScalar(H),d[F].add(T),d[D].add(T),d[R].add(T),m[F].add(E),m[D].add(E),m[R].add(E))}let U=this.groups;U.length===0&&(U=[{start:0,count:t.count}]);for(let F=0,D=U.length;F<D;++F){const R=U[F],H=R.start,et=R.count;for(let st=H,ht=H+et;st<ht;st+=3)_(t.getX(st+0),t.getX(st+1),t.getX(st+2))}const L=new V,A=new V,k=new V,z=new V;function O(F){k.fromBufferAttribute(l,F),z.copy(k);const D=d[F];L.copy(D),L.sub(k.multiplyScalar(k.dot(D))).normalize(),A.crossVectors(z,D);const H=A.dot(m[F])<0?-1:1;f.setXYZW(F,L.x,L.y,L.z,H)}for(let F=0,D=U.length;F<D;++F){const R=U[F],H=R.start,et=R.count;for(let st=H,ht=H+et;st<ht;st+=3)O(t.getX(st+0)),O(t.getX(st+1)),O(t.getX(st+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new qn(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let x=0,S=s.count;x<S;x++)s.setXYZ(x,0,0,0);const l=new V,c=new V,f=new V,d=new V,m=new V,p=new V,v=new V,g=new V;if(t)for(let x=0,S=t.count;x<S;x+=3){const y=t.getX(x+0),T=t.getX(x+1),E=t.getX(x+2);l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,T),f.fromBufferAttribute(n,E),v.subVectors(f,c),g.subVectors(l,c),v.cross(g),d.fromBufferAttribute(s,y),m.fromBufferAttribute(s,T),p.fromBufferAttribute(s,E),d.add(v),m.add(v),p.add(v),s.setXYZ(y,d.x,d.y,d.z),s.setXYZ(T,m.x,m.y,m.z),s.setXYZ(E,p.x,p.y,p.z)}else for(let x=0,S=n.count;x<S;x+=3)l.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),v.subVectors(f,c),g.subVectors(l,c),v.cross(g),s.setXYZ(x+0,v.x,v.y,v.z),s.setXYZ(x+1,v.x,v.y,v.z),s.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,s=t.count;n<s;n++)Tn.fromBufferAttribute(t,n),Tn.normalize(),t.setXYZ(n,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(d,m){const p=d.array,v=d.itemSize,g=d.normalized,x=new p.constructor(m.length*v);let S=0,y=0;for(let T=0,E=m.length;T<E;T++){d.isInterleavedBufferAttribute?S=m[T]*d.data.stride+d.offset:S=m[T]*v;for(let _=0;_<v;_++)x[y++]=p[S++]}return new qn(x,v,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Rn,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);n.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let v=0,g=p.length;v<g;v++){const x=p[v],S=t(x,s);m.push(S)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const p=f[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let g=0,x=p.length;g<x;g++){const S=p[g];v.push(S.toJSON(t.data))}v.length>0&&(l[m]=v,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(n));const l=t.attributes;for(const p in l){const v=l[p];this.setAttribute(p,v.clone(n))}const c=t.morphAttributes;for(const p in c){const v=[],g=c[p];for(let x=0,S=g.length;x<S;x++)v.push(g[x].clone(n));this.morphAttributes[p]=v}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,v=f.length;p<v;p++){const g=f[p];this.addGroup(g.start,g.count,g.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qv=new Je,Ls=new Mp,Oc=new fl,Jv=new V,Pc=new V,zc=new V,Bc=new V,rd=new V,Ic=new V,$v=new V,Fc=new V;class $t extends wn{constructor(t=new Rn,n=new Ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,n){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;n.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Ic.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const v=d[m],g=c[m];v!==0&&(rd.fromBufferAttribute(g,t),f?Ic.addScaledVector(rd,v):Ic.addScaledVector(rd.sub(n),v))}n.add(Ic)}return n}raycast(t,n){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Oc.copy(s.boundingSphere),Oc.applyMatrix4(c),Ls.copy(t.ray).recast(t.near),!(Oc.containsPoint(Ls.origin)===!1&&(Ls.intersectSphere(Oc,Jv)===null||Ls.origin.distanceToSquared(Jv)>(t.far-t.near)**2))&&(Qv.copy(c).invert(),Ls.copy(t.ray).applyMatrix4(Qv),!(s.boundingBox!==null&&Ls.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,n,Ls)))}_computeIntersections(t,n,s){let l;const c=this.geometry,f=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,v=c.attributes.uv1,g=c.attributes.normal,x=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(f))for(let y=0,T=x.length;y<T;y++){const E=x[y],_=f[E.materialIndex],U=Math.max(E.start,S.start),L=Math.min(d.count,Math.min(E.start+E.count,S.start+S.count));for(let A=U,k=L;A<k;A+=3){const z=d.getX(A),O=d.getX(A+1),F=d.getX(A+2);l=Hc(this,_,t,s,p,v,g,z,O,F),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=E.materialIndex,n.push(l))}}else{const y=Math.max(0,S.start),T=Math.min(d.count,S.start+S.count);for(let E=y,_=T;E<_;E+=3){const U=d.getX(E),L=d.getX(E+1),A=d.getX(E+2);l=Hc(this,f,t,s,p,v,g,U,L,A),l&&(l.faceIndex=Math.floor(E/3),n.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let y=0,T=x.length;y<T;y++){const E=x[y],_=f[E.materialIndex],U=Math.max(E.start,S.start),L=Math.min(m.count,Math.min(E.start+E.count,S.start+S.count));for(let A=U,k=L;A<k;A+=3){const z=A,O=A+1,F=A+2;l=Hc(this,_,t,s,p,v,g,z,O,F),l&&(l.faceIndex=Math.floor(A/3),l.face.materialIndex=E.materialIndex,n.push(l))}}else{const y=Math.max(0,S.start),T=Math.min(m.count,S.start+S.count);for(let E=y,_=T;E<_;E+=3){const U=E,L=E+1,A=E+2;l=Hc(this,f,t,s,p,v,g,U,L,A),l&&(l.faceIndex=Math.floor(E/3),n.push(l))}}}}function w1(r,t,n,s,l,c,f,d){let m;if(t.side===ni?m=s.intersectTriangle(f,c,l,!0,d):m=s.intersectTriangle(l,c,f,t.side===us,d),m===null)return null;Fc.copy(d),Fc.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(Fc);return p<n.near||p>n.far?null:{distance:p,point:Fc.clone(),object:r}}function Hc(r,t,n,s,l,c,f,d,m,p){r.getVertexPosition(d,Pc),r.getVertexPosition(m,zc),r.getVertexPosition(p,Bc);const v=w1(r,t,n,s,Pc,zc,Bc,$v);if(v){const g=new V;Di.getBarycoord($v,Pc,zc,Bc,g),l&&(v.uv=Di.getInterpolatedAttribute(l,d,m,p,g,new ne)),c&&(v.uv1=Di.getInterpolatedAttribute(c,d,m,p,g,new ne)),f&&(v.normal=Di.getInterpolatedAttribute(f,d,m,p,g,new V),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const x={a:d,b:m,c:p,normal:new V,materialIndex:0};Di.getNormal(Pc,zc,Bc,x.normal),v.face=x,v.barycoord=g}return v}class pe extends Rn{constructor(t=1,n=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],v=[],g=[];let x=0,S=0;y("z","y","x",-1,-1,s,n,t,f,c,0),y("z","y","x",1,-1,s,n,-t,f,c,1),y("x","z","y",1,1,t,s,n,l,f,2),y("x","z","y",1,-1,t,s,-n,l,f,3),y("x","y","z",1,-1,t,n,s,l,c,4),y("x","y","z",-1,-1,t,n,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new an(p,3)),this.setAttribute("normal",new an(v,3)),this.setAttribute("uv",new an(g,2));function y(T,E,_,U,L,A,k,z,O,F,D){const R=A/O,H=k/F,et=A/2,st=k/2,ht=z/2,mt=O+1,B=F+1;let Q=0,K=0;const Mt=new V;for(let Tt=0;Tt<B;Tt++){const P=Tt*H-st;for(let it=0;it<mt;it++){const St=it*R-et;Mt[T]=St*U,Mt[E]=P*L,Mt[_]=ht,p.push(Mt.x,Mt.y,Mt.z),Mt[T]=0,Mt[E]=0,Mt[_]=z>0?1:-1,v.push(Mt.x,Mt.y,Mt.z),g.push(it/O),g.push(1-Tt/F),Q+=1}}for(let Tt=0;Tt<F;Tt++)for(let P=0;P<O;P++){const it=x+P+mt*Tt,St=x+P+mt*(Tt+1),Z=x+(P+1)+mt*(Tt+1),ct=x+(P+1)+mt*Tt;m.push(it,St,ct),m.push(St,Z,ct),K+=6}d.addGroup(S,K,D),S+=K,x+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Jr(r){const t={};for(const n in r){t[n]={};for(const s in r[n]){const l=r[n][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][s]=null):t[n][s]=l.clone():Array.isArray(l)?t[n][s]=l.slice():t[n][s]=l}}return t}function Wn(r){const t={};for(let n=0;n<r.length;n++){const s=Jr(r[n]);for(const l in s)t[l]=s[l]}return t}function R1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function R_(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Re.workingColorSpace}const cs={clone:Jr,merge:Wn};var C1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,D1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Xs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=C1,this.fragmentShader=D1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Jr(t.uniforms),this.uniformsGroups=R1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class C_ extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=Aa}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rs=new V,tx=new ne,ex=new ne;class di extends C_{constructor(t=50,n=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=lp*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(cu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return lp*2*Math.atan(Math.tan(cu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,s){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rs.x,rs.y).multiplyScalar(-t/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(rs.x,rs.y).multiplyScalar(-t/rs.z)}getViewSize(t,n){return this.getViewBounds(t,tx,ex),n.subVectors(ex,tx)}setViewOffset(t,n,s,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(cu*.5*this.fov)/this.zoom,s=2*n,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,n-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const zr=-90,Br=1;class L1 extends wn{constructor(t,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new di(zr,Br,t,n);l.layers=this.layers,this.add(l);const c=new di(zr,Br,t,n);c.layers=this.layers,this.add(c);const f=new di(zr,Br,t,n);f.layers=this.layers,this.add(f);const d=new di(zr,Br,t,n);d.layers=this.layers,this.add(d);const m=new di(zr,Br,t,n);m.layers=this.layers,this.add(m);const p=new di(zr,Br,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[s,l,c,f,d,m]=n;for(const p of n)this.remove(p);if(t===Aa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===hu)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,m,p,v]=this.children,g=t.getRenderTarget(),x=t.getActiveCubeFace(),S=t.getActiveMipmapLevel(),y=t.xr.enabled;t.xr.enabled=!1;const T=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(n,c),t.setRenderTarget(s,1,l),t.render(n,f),t.setRenderTarget(s,2,l),t.render(n,d),t.setRenderTarget(s,3,l),t.render(n,m),t.setRenderTarget(s,4,l),t.render(n,p),s.texture.generateMipmaps=T,t.setRenderTarget(s,5,l),t.render(n,v),t.setRenderTarget(g,x,S),t.xr.enabled=y,s.texture.needsPMREMUpdate=!0}}class D_ extends kn{constructor(t,n,s,l,c,f,d,m,p,v){t=t!==void 0?t:[],n=n!==void 0?n:Yr,super(t,n,s,l,c,f,d,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class U1 extends mi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new D_(l,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Hi}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new pe(5,5,5),c=new An({name:"CubemapFromEquirect",uniforms:Jr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ni,blending:wa});c.uniforms.tEquirect.value=n;const f=new $t(l,c),d=n.minFilter;return n.minFilter===Gs&&(n.minFilter=Hi),new L1(1,10,this).update(t,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,n,s,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,s,l);t.setRenderTarget(c)}}const od=new V,N1=new V,O1=new he;class zs{constructor(t=new V(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,s,l){return this.normal.set(t,n,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,s){const l=od.subVectors(s,n).cross(N1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const s=t.delta(od),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return n<0&&s>0||s<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const s=n||O1.getNormalMatrix(t),l=this.coplanarPoint(od).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Us=new fl,Gc=new V;class yp{constructor(t=new zs,n=new zs,s=new zs,l=new zs,c=new zs,f=new zs){this.planes=[t,n,s,l,c,f]}set(t,n,s,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(n),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,n=Aa){const s=this.planes,l=t.elements,c=l[0],f=l[1],d=l[2],m=l[3],p=l[4],v=l[5],g=l[6],x=l[7],S=l[8],y=l[9],T=l[10],E=l[11],_=l[12],U=l[13],L=l[14],A=l[15];if(s[0].setComponents(m-c,x-p,E-S,A-_).normalize(),s[1].setComponents(m+c,x+p,E+S,A+_).normalize(),s[2].setComponents(m+f,x+v,E+y,A+U).normalize(),s[3].setComponents(m-f,x-v,E-y,A-U).normalize(),s[4].setComponents(m-d,x-g,E-T,A-L).normalize(),n===Aa)s[5].setComponents(m+d,x+g,E+T,A+L).normalize();else if(n===hu)s[5].setComponents(d,g,T,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Us.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Us)}intersectsSprite(t){return Us.center.set(0,0,0),Us.radius=.7071067811865476,Us.applyMatrix4(t.matrixWorld),this.intersectsSphere(Us)}intersectsSphere(t){const n=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let s=0;s<6;s++){const l=n[s];if(Gc.x=l.normal.x>0?t.max.x:t.min.x,Gc.y=l.normal.y>0?t.max.y:t.min.y,Gc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function L_(){let r=null,t=!1,n=null,s=null;function l(c,f){n(c,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function P1(r){const t=new WeakMap;function n(d,m){const p=d.array,v=d.usage,g=p.byteLength,x=r.createBuffer();r.bindBuffer(m,x),r.bufferData(m,p,v),d.onUploadCallback();let S;if(p instanceof Float32Array)S=r.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=r.HALF_FLOAT:S=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=r.SHORT;else if(p instanceof Uint32Array)S=r.UNSIGNED_INT;else if(p instanceof Int32Array)S=r.INT;else if(p instanceof Int8Array)S=r.BYTE;else if(p instanceof Uint8Array)S=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:g}}function s(d,m,p){const v=m.array,g=m.updateRanges;if(r.bindBuffer(p,d),g.length===0)r.bufferSubData(p,0,v);else{g.sort((S,y)=>S.start-y.start);let x=0;for(let S=1;S<g.length;S++){const y=g[x],T=g[S];T.start<=y.start+y.count+1?y.count=Math.max(y.count,T.start+T.count-y.start):(++x,g[x]=T)}g.length=x+1;for(let S=0,y=g.length;S<y;S++){const T=g[S];r.bufferSubData(p,T.start*v.BYTES_PER_ELEMENT,v,T.start,T.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function f(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=t.get(d);(!v||v.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:f}}class Su extends Rn{constructor(t=1,n=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:s,heightSegments:l};const c=t/2,f=n/2,d=Math.floor(s),m=Math.floor(l),p=d+1,v=m+1,g=t/d,x=n/m,S=[],y=[],T=[],E=[];for(let _=0;_<v;_++){const U=_*x-f;for(let L=0;L<p;L++){const A=L*g-c;y.push(A,-U,0),T.push(0,0,1),E.push(L/d),E.push(1-_/m)}}for(let _=0;_<m;_++)for(let U=0;U<d;U++){const L=U+p*_,A=U+p*(_+1),k=U+1+p*(_+1),z=U+1+p*_;S.push(L,A,z),S.push(A,k,z)}this.setIndex(S),this.setAttribute("position",new an(y,3)),this.setAttribute("normal",new an(T,3)),this.setAttribute("uv",new an(E,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Su(t.width,t.height,t.widthSegments,t.heightSegments)}}var z1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,B1=`#ifdef USE_ALPHAHASH
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
#endif`,I1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,F1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,H1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,G1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,V1=`#ifdef USE_AOMAP
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
#endif`,k1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,X1=`#ifdef USE_BATCHING
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
#endif`,W1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,q1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,j1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Y1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Z1=`#ifdef USE_IRIDESCENCE
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
#endif`,K1=`#ifdef USE_BUMPMAP
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
#endif`,Q1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,J1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,iE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,aE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,sE=`#define PI 3.141592653589793
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
} // validated`,rE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,oE=`vec3 transformedNormal = objectNormal;
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
#endif`,lE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hE="gl_FragColor = linearToOutputTexel( gl_FragColor );",dE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pE=`#ifdef USE_ENVMAP
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
#endif`,mE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gE=`#ifdef USE_ENVMAP
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
#endif`,vE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xE=`#ifdef USE_ENVMAP
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
#endif`,_E=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ME=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,EE=`#ifdef USE_GRADIENTMAP
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
}`,TE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,AE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wE=`uniform bool receiveShadow;
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
#endif`,RE=`#ifdef USE_ENVMAP
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
#endif`,CE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,DE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,LE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,UE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NE=`PhysicalMaterial material;
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
#endif`,OE=`struct PhysicalMaterial {
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
}`,PE=`
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
#endif`,zE=`#if defined( RE_IndirectDiffuse )
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
#endif`,BE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,IE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,FE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,GE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,VE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,XE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,WE=`#if defined( USE_POINTS_UV )
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
#endif`,qE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ZE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,KE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QE=`#ifdef USE_MORPHTARGETS
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
#endif`,JE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$E=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,aT=`#ifdef USE_NORMALMAP
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
#endif`,sT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,oT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,uT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_T=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ST=`float getShadowMask() {
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
}`,MT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yT=`#ifdef USE_SKINNING
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
#endif`,ET=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,TT=`#ifdef USE_SKINNING
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
#endif`,bT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,AT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,RT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,CT=`#ifdef USE_TRANSMISSION
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
#endif`,DT=`#ifdef USE_TRANSMISSION
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
#endif`,LT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,UT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,NT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,OT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const PT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zT=`uniform sampler2D t2D;
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
}`,BT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,IT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,FT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GT=`#include <common>
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
}`,VT=`#if DEPTH_PACKING == 3200
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
}`,kT=`#define DISTANCE
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
}`,XT=`#define DISTANCE
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
}`,WT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jT=`uniform float scale;
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
}`,YT=`uniform vec3 diffuse;
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
}`,ZT=`#include <common>
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
}`,KT=`uniform vec3 diffuse;
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
}`,QT=`#define LAMBERT
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
}`,JT=`#define LAMBERT
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
}`,$T=`#define MATCAP
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
}`,tb=`#define MATCAP
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
}`,eb=`#define NORMAL
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
}`,nb=`#define NORMAL
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
}`,ib=`#define PHONG
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
}`,ab=`#define PHONG
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
}`,sb=`#define STANDARD
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
}`,rb=`#define STANDARD
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
}`,ob=`#define TOON
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
}`,lb=`#define TOON
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
}`,cb=`uniform float size;
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
}`,ub=`uniform vec3 diffuse;
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
}`,fb=`#include <common>
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
}`,hb=`uniform vec3 color;
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
}`,db=`uniform float rotation;
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
}`,pb=`uniform vec3 diffuse;
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
}`,de={alphahash_fragment:z1,alphahash_pars_fragment:B1,alphamap_fragment:I1,alphamap_pars_fragment:F1,alphatest_fragment:H1,alphatest_pars_fragment:G1,aomap_fragment:V1,aomap_pars_fragment:k1,batching_pars_vertex:X1,batching_vertex:W1,begin_vertex:q1,beginnormal_vertex:j1,bsdfs:Y1,iridescence_fragment:Z1,bumpmap_pars_fragment:K1,clipping_planes_fragment:Q1,clipping_planes_pars_fragment:J1,clipping_planes_pars_vertex:$1,clipping_planes_vertex:tE,color_fragment:eE,color_pars_fragment:nE,color_pars_vertex:iE,color_vertex:aE,common:sE,cube_uv_reflection_fragment:rE,defaultnormal_vertex:oE,displacementmap_pars_vertex:lE,displacementmap_vertex:cE,emissivemap_fragment:uE,emissivemap_pars_fragment:fE,colorspace_fragment:hE,colorspace_pars_fragment:dE,envmap_fragment:pE,envmap_common_pars_fragment:mE,envmap_pars_fragment:gE,envmap_pars_vertex:vE,envmap_physical_pars_fragment:RE,envmap_vertex:xE,fog_vertex:_E,fog_pars_vertex:SE,fog_fragment:ME,fog_pars_fragment:yE,gradientmap_pars_fragment:EE,lightmap_pars_fragment:TE,lights_lambert_fragment:bE,lights_lambert_pars_fragment:AE,lights_pars_begin:wE,lights_toon_fragment:CE,lights_toon_pars_fragment:DE,lights_phong_fragment:LE,lights_phong_pars_fragment:UE,lights_physical_fragment:NE,lights_physical_pars_fragment:OE,lights_fragment_begin:PE,lights_fragment_maps:zE,lights_fragment_end:BE,logdepthbuf_fragment:IE,logdepthbuf_pars_fragment:FE,logdepthbuf_pars_vertex:HE,logdepthbuf_vertex:GE,map_fragment:VE,map_pars_fragment:kE,map_particle_fragment:XE,map_particle_pars_fragment:WE,metalnessmap_fragment:qE,metalnessmap_pars_fragment:jE,morphinstance_vertex:YE,morphcolor_vertex:ZE,morphnormal_vertex:KE,morphtarget_pars_vertex:QE,morphtarget_vertex:JE,normal_fragment_begin:$E,normal_fragment_maps:tT,normal_pars_fragment:eT,normal_pars_vertex:nT,normal_vertex:iT,normalmap_pars_fragment:aT,clearcoat_normal_fragment_begin:sT,clearcoat_normal_fragment_maps:rT,clearcoat_pars_fragment:oT,iridescence_pars_fragment:lT,opaque_fragment:cT,packing:uT,premultiplied_alpha_fragment:fT,project_vertex:hT,dithering_fragment:dT,dithering_pars_fragment:pT,roughnessmap_fragment:mT,roughnessmap_pars_fragment:gT,shadowmap_pars_fragment:vT,shadowmap_pars_vertex:xT,shadowmap_vertex:_T,shadowmask_pars_fragment:ST,skinbase_vertex:MT,skinning_pars_vertex:yT,skinning_vertex:ET,skinnormal_vertex:TT,specularmap_fragment:bT,specularmap_pars_fragment:AT,tonemapping_fragment:wT,tonemapping_pars_fragment:RT,transmission_fragment:CT,transmission_pars_fragment:DT,uv_pars_fragment:LT,uv_pars_vertex:UT,uv_vertex:NT,worldpos_vertex:OT,background_vert:PT,background_frag:zT,backgroundCube_vert:BT,backgroundCube_frag:IT,cube_vert:FT,cube_frag:HT,depth_vert:GT,depth_frag:VT,distanceRGBA_vert:kT,distanceRGBA_frag:XT,equirect_vert:WT,equirect_frag:qT,linedashed_vert:jT,linedashed_frag:YT,meshbasic_vert:ZT,meshbasic_frag:KT,meshlambert_vert:QT,meshlambert_frag:JT,meshmatcap_vert:$T,meshmatcap_frag:tb,meshnormal_vert:eb,meshnormal_frag:nb,meshphong_vert:ib,meshphong_frag:ab,meshphysical_vert:sb,meshphysical_frag:rb,meshtoon_vert:ob,meshtoon_frag:lb,points_vert:cb,points_frag:ub,shadow_vert:fb,shadow_frag:hb,sprite_vert:db,sprite_frag:pb},Nt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},Ki={basic:{uniforms:Wn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:Wn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:Wn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:Wn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:Wn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:Wn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:Wn([Nt.points,Nt.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:Wn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:Wn([Nt.common,Nt.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:Wn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:Wn([Nt.sprite,Nt.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distanceRGBA:{uniforms:Wn([Nt.common,Nt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distanceRGBA_vert,fragmentShader:de.distanceRGBA_frag},shadow:{uniforms:Wn([Nt.lights,Nt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};Ki.physical={uniforms:Wn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const Vc={r:0,b:0,g:0},Ns=new Qi,mb=new Je;function gb(r,t,n,s,l,c,f){const d=new te(0);let m=c===!0?0:1,p,v,g=null,x=0,S=null;function y(U){let L=U.isScene===!0?U.background:null;return L&&L.isTexture&&(L=(U.backgroundBlurriness>0?n:t).get(L)),L}function T(U){let L=!1;const A=y(U);A===null?_(d,m):A&&A.isColor&&(_(A,1),L=!0);const k=r.xr.getEnvironmentBlendMode();k==="additive"?s.buffers.color.setClear(0,0,0,1,f):k==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||L)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function E(U,L){const A=y(L);A&&(A.isCubeTexture||A.mapping===xu)?(v===void 0&&(v=new $t(new pe(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Jr(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(k,z,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),Ns.copy(L.backgroundRotation),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),v.material.uniforms.envMap.value=A,v.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(mb.makeRotationFromEuler(Ns)),v.material.toneMapped=Re.getTransfer(A.colorSpace)!==He,(g!==A||x!==A.version||S!==r.toneMapping)&&(v.material.needsUpdate=!0,g=A,x=A.version,S=r.toneMapping),v.layers.enableAll(),U.unshift(v,v.geometry,v.material,0,0,null)):A&&A.isTexture&&(p===void 0&&(p=new $t(new Su(2,2),new An({name:"BackgroundMaterial",uniforms:Jr(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:us,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=A,p.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,p.material.toneMapped=Re.getTransfer(A.colorSpace)!==He,A.matrixAutoUpdate===!0&&A.updateMatrix(),p.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||x!==A.version||S!==r.toneMapping)&&(p.material.needsUpdate=!0,g=A,x=A.version,S=r.toneMapping),p.layers.enableAll(),U.unshift(p,p.geometry,p.material,0,0,null))}function _(U,L){U.getRGB(Vc,R_(r)),s.buffers.color.setClear(Vc.r,Vc.g,Vc.b,L,f)}return{getClearColor:function(){return d},setClearColor:function(U,L=1){d.set(U),m=L,_(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(U){m=U,_(d,m)},render:T,addToRenderList:E}}function vb(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,f=!1;function d(R,H,et,st,ht){let mt=!1;const B=g(st,et,H);c!==B&&(c=B,p(c.object)),mt=S(R,st,et,ht),mt&&y(R,st,et,ht),ht!==null&&t.update(ht,r.ELEMENT_ARRAY_BUFFER),(mt||f)&&(f=!1,A(R,H,et,st),ht!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ht).buffer))}function m(){return r.createVertexArray()}function p(R){return r.bindVertexArray(R)}function v(R){return r.deleteVertexArray(R)}function g(R,H,et){const st=et.wireframe===!0;let ht=s[R.id];ht===void 0&&(ht={},s[R.id]=ht);let mt=ht[H.id];mt===void 0&&(mt={},ht[H.id]=mt);let B=mt[st];return B===void 0&&(B=x(m()),mt[st]=B),B}function x(R){const H=[],et=[],st=[];for(let ht=0;ht<n;ht++)H[ht]=0,et[ht]=0,st[ht]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:et,attributeDivisors:st,object:R,attributes:{},index:null}}function S(R,H,et,st){const ht=c.attributes,mt=H.attributes;let B=0;const Q=et.getAttributes();for(const K in Q)if(Q[K].location>=0){const Tt=ht[K];let P=mt[K];if(P===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(P=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(P=R.instanceColor)),Tt===void 0||Tt.attribute!==P||P&&Tt.data!==P.data)return!0;B++}return c.attributesNum!==B||c.index!==st}function y(R,H,et,st){const ht={},mt=H.attributes;let B=0;const Q=et.getAttributes();for(const K in Q)if(Q[K].location>=0){let Tt=mt[K];Tt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(Tt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(Tt=R.instanceColor));const P={};P.attribute=Tt,Tt&&Tt.data&&(P.data=Tt.data),ht[K]=P,B++}c.attributes=ht,c.attributesNum=B,c.index=st}function T(){const R=c.newAttributes;for(let H=0,et=R.length;H<et;H++)R[H]=0}function E(R){_(R,0)}function _(R,H){const et=c.newAttributes,st=c.enabledAttributes,ht=c.attributeDivisors;et[R]=1,st[R]===0&&(r.enableVertexAttribArray(R),st[R]=1),ht[R]!==H&&(r.vertexAttribDivisor(R,H),ht[R]=H)}function U(){const R=c.newAttributes,H=c.enabledAttributes;for(let et=0,st=H.length;et<st;et++)H[et]!==R[et]&&(r.disableVertexAttribArray(et),H[et]=0)}function L(R,H,et,st,ht,mt,B){B===!0?r.vertexAttribIPointer(R,H,et,ht,mt):r.vertexAttribPointer(R,H,et,st,ht,mt)}function A(R,H,et,st){T();const ht=st.attributes,mt=et.getAttributes(),B=H.defaultAttributeValues;for(const Q in mt){const K=mt[Q];if(K.location>=0){let Mt=ht[Q];if(Mt===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(Mt=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(Mt=R.instanceColor)),Mt!==void 0){const Tt=Mt.normalized,P=Mt.itemSize,it=t.get(Mt);if(it===void 0)continue;const St=it.buffer,Z=it.type,ct=it.bytesPerElement,Et=Z===r.INT||Z===r.UNSIGNED_INT||Mt.gpuType===mp;if(Mt.isInterleavedBufferAttribute){const _t=Mt.data,Gt=_t.stride,Ht=Mt.offset;if(_t.isInstancedInterleavedBuffer){for(let oe=0;oe<K.locationSize;oe++)_(K.location+oe,_t.meshPerAttribute);R.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let oe=0;oe<K.locationSize;oe++)E(K.location+oe);r.bindBuffer(r.ARRAY_BUFFER,St);for(let oe=0;oe<K.locationSize;oe++)L(K.location+oe,P/K.locationSize,Z,Tt,Gt*ct,(Ht+P/K.locationSize*oe)*ct,Et)}else{if(Mt.isInstancedBufferAttribute){for(let _t=0;_t<K.locationSize;_t++)_(K.location+_t,Mt.meshPerAttribute);R.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let _t=0;_t<K.locationSize;_t++)E(K.location+_t);r.bindBuffer(r.ARRAY_BUFFER,St);for(let _t=0;_t<K.locationSize;_t++)L(K.location+_t,P/K.locationSize,Z,Tt,P*ct,P/K.locationSize*_t*ct,Et)}}else if(B!==void 0){const Tt=B[Q];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(K.location,Tt);break;case 3:r.vertexAttrib3fv(K.location,Tt);break;case 4:r.vertexAttrib4fv(K.location,Tt);break;default:r.vertexAttrib1fv(K.location,Tt)}}}}U()}function k(){F();for(const R in s){const H=s[R];for(const et in H){const st=H[et];for(const ht in st)v(st[ht].object),delete st[ht];delete H[et]}delete s[R]}}function z(R){if(s[R.id]===void 0)return;const H=s[R.id];for(const et in H){const st=H[et];for(const ht in st)v(st[ht].object),delete st[ht];delete H[et]}delete s[R.id]}function O(R){for(const H in s){const et=s[H];if(et[R.id]===void 0)continue;const st=et[R.id];for(const ht in st)v(st[ht].object),delete st[ht];delete et[R.id]}}function F(){D(),f=!0,c!==l&&(c=l,p(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:F,resetDefaultState:D,dispose:k,releaseStatesOfGeometry:z,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:E,disableUnusedAttributes:U}}function xb(r,t,n){let s;function l(p){s=p}function c(p,v){r.drawArrays(s,p,v),n.update(v,s,1)}function f(p,v,g){g!==0&&(r.drawArraysInstanced(s,p,v,g),n.update(v,s,g))}function d(p,v,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,v,0,g);let S=0;for(let y=0;y<g;y++)S+=v[y];n.update(S,s,1)}function m(p,v,g,x){if(g===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let y=0;y<p.length;y++)f(p[y],v[y],x[y]);else{S.multiDrawArraysInstancedWEBGL(s,p,0,v,0,x,0,g);let y=0;for(let T=0;T<g;T++)y+=v[T]*x[T];n.update(y,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function _b(r,t,n,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const O=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==Gi&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const F=O===Vi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(O!==Ca&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==ba&&!F)}function m(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const v=m(p);v!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const g=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),S=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),U=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),L=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),k=y>0,z=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:g,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:y,maxTextureSize:T,maxCubemapSize:E,maxAttributes:_,maxVertexUniforms:U,maxVaryings:L,maxFragmentUniforms:A,vertexTextures:k,maxSamples:z}}function Sb(r){const t=this;let n=null,s=0,l=!1,c=!1;const f=new zs,d=new he,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(g,x){const S=g.length!==0||x||s!==0||l;return l=x,s=g.length,S},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,x){n=v(g,x,0)},this.setState=function(g,x,S){const y=g.clippingPlanes,T=g.clipIntersection,E=g.clipShadows,_=r.get(g);if(!l||y===null||y.length===0||c&&!E)c?v(null):p();else{const U=c?0:s,L=U*4;let A=_.clippingState||null;m.value=A,A=v(y,x,L,S);for(let k=0;k!==L;++k)A[k]=n[k];_.clippingState=A,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=U}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function v(g,x,S,y){const T=g!==null?g.length:0;let E=null;if(T!==0){if(E=m.value,y!==!0||E===null){const _=S+T*4,U=x.matrixWorldInverse;d.getNormalMatrix(U),(E===null||E.length<_)&&(E=new Float32Array(_));for(let L=0,A=S;L!==T;++L,A+=4)f.copy(g[L]).applyMatrix4(U,d),f.normal.toArray(E,A),E[A+3]=f.constant}m.value=E,m.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,E}}function Mb(r){let t=new WeakMap;function n(f,d){return d===Ud?f.mapping=Yr:d===Nd&&(f.mapping=Zr),f}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===Ud||d===Nd)if(t.has(f)){const m=t.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new U1(m.height);return p.fromEquirectangularTexture(r,f),t.set(f,p),f.addEventListener("dispose",l),n(p.texture,f.mapping)}else return null}}return f}function l(f){const d=f.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}class Ep extends C_{constructor(t=-1,n=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,d=l+n,m=l-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Gr=4,nx=[.125,.215,.35,.446,.526,.582],Fs=20,ld=new Ep,ix=new te;let cd=null,ud=0,fd=0,hd=!1;const Bs=(1+Math.sqrt(5))/2,Ir=1/Bs,ax=[new V(-Bs,Ir,0),new V(Bs,Ir,0),new V(-Ir,0,Bs),new V(Ir,0,Bs),new V(0,Bs,-Ir),new V(0,Bs,Ir),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class sx{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,s=.1,l=100){cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lx(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ox(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(cd,ud,fd),this._renderer.xr.enabled=hd,t.scissorTest=!1,kc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Yr||t.mapping===Zr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=n||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:Hi,minFilter:Hi,generateMipmaps:!1,type:Vi,format:Gi,colorSpace:to,depthBuffer:!1},l=rx(t,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rx(t,n,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yb(c)),this._blurMaterial=Eb(c,t,n)}return l}_compileMaterial(t){const n=new $t(this._lodPlanes[0],t);this._renderer.compile(n,ld)}_sceneToCubeUV(t,n,s,l){const d=new di(90,1,n,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,x=v.toneMapping;v.getClearColor(ix),v.toneMapping=ls,v.autoClear=!1;const S=new Ea({name:"PMREM.Background",side:ni,depthWrite:!1,depthTest:!1}),y=new $t(new pe,S);let T=!1;const E=t.background;E?E.isColor&&(S.color.copy(E),t.background=null,T=!0):(S.color.copy(ix),T=!0);for(let _=0;_<6;_++){const U=_%3;U===0?(d.up.set(0,m[_],0),d.lookAt(p[_],0,0)):U===1?(d.up.set(0,0,m[_]),d.lookAt(0,p[_],0)):(d.up.set(0,m[_],0),d.lookAt(0,0,p[_]));const L=this._cubeSize;kc(l,U*L,_>2?L:0,L,L),v.setRenderTarget(l),T&&v.render(y,d),v.render(t,d)}y.geometry.dispose(),y.material.dispose(),v.toneMapping=x,v.autoClear=g,t.background=E}_textureToCubeUV(t,n){const s=this._renderer,l=t.mapping===Yr||t.mapping===Zr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=lx()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ox());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new $t(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;kc(n,0,0,3*m,2*m),s.setRenderTarget(n),s.render(f,ld)}_applyPMREM(t){const n=this._renderer,s=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=ax[(l-c-1)%ax.length];this._blur(t,c-1,c,f,d)}n.autoClear=s}_blur(t,n,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,s,l,"latitudinal",c),this._halfBlur(f,t,s,s,l,"longitudinal",c)}_halfBlur(t,n,s,l,c,f,d){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,g=new $t(this._lodPlanes[l],p),x=p.uniforms,S=this._sizeLods[s]-1,y=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*Fs-1),T=c/y,E=isFinite(c)?1+Math.floor(v*T):Fs;E>Fs&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${Fs}`);const _=[];let U=0;for(let O=0;O<Fs;++O){const F=O/T,D=Math.exp(-F*F/2);_.push(D),O===0?U+=D:O<E&&(U+=2*D)}for(let O=0;O<_.length;O++)_[O]=_[O]/U;x.envMap.value=t.texture,x.samples.value=E,x.weights.value=_,x.latitudinal.value=f==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:L}=this;x.dTheta.value=y,x.mipInt.value=L-s;const A=this._sizeLods[l],k=3*A*(l>L-Gr?l-L+Gr:0),z=4*(this._cubeSize-A);kc(n,k,z,3*A,2*A),m.setRenderTarget(n),m.render(g,ld)}}function yb(r){const t=[],n=[],s=[];let l=r;const c=r-Gr+1+nx.length;for(let f=0;f<c;f++){const d=Math.pow(2,l);n.push(d);let m=1/d;f>r-Gr?m=nx[f-r+Gr-1]:f===0&&(m=0),s.push(m);const p=1/(d-2),v=-p,g=1+p,x=[v,v,g,v,g,g,v,v,g,g,v,g],S=6,y=6,T=3,E=2,_=1,U=new Float32Array(T*y*S),L=new Float32Array(E*y*S),A=new Float32Array(_*y*S);for(let z=0;z<S;z++){const O=z%3*2/3-1,F=z>2?0:-1,D=[O,F,0,O+2/3,F,0,O+2/3,F+1,0,O,F,0,O+2/3,F+1,0,O,F+1,0];U.set(D,T*y*z),L.set(x,E*y*z);const R=[z,z,z,z,z,z];A.set(R,_*y*z)}const k=new Rn;k.setAttribute("position",new qn(U,T)),k.setAttribute("uv",new qn(L,E)),k.setAttribute("faceIndex",new qn(A,_)),t.push(k),l>Gr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:s}}function rx(r,t,n){const s=new mi(r,t,n);return s.texture.mapping=xu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function kc(r,t,n,s,l){r.viewport.set(t,n,s,l),r.scissor.set(t,n,s,l)}function Eb(r,t,n){const s=new Float32Array(Fs),l=new V(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Fs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Tp(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function ox(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tp(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function lx(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wa,depthTest:!1,depthWrite:!1})}function Tp(){return`

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
	`}function Tb(r){let t=new WeakMap,n=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===Ud||m===Nd,v=m===Yr||m===Zr;if(p||v){let g=t.get(d);const x=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new sx(r)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const S=d.image;return p&&S&&S.height>0||v&&S&&l(S)?(n===null&&(n=new sx(r)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",c),g.texture):null}}}return d}function l(d){let m=0;const p=6;for(let v=0;v<p;v++)d[v]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function bb(r){const t={};function n(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return n(s)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(s){const l=n(s);return l===null&&sl("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function Ab(r,t,n,s){const l={},c=new WeakMap;function f(g){const x=g.target;x.index!==null&&t.remove(x.index);for(const y in x.attributes)t.remove(x.attributes[y]);for(const y in x.morphAttributes){const T=x.morphAttributes[y];for(let E=0,_=T.length;E<_;E++)t.remove(T[E])}x.removeEventListener("dispose",f),delete l[x.id];const S=c.get(x);S&&(t.remove(S),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(g,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,n.memory.geometries++),x}function m(g){const x=g.attributes;for(const y in x)t.update(x[y],r.ARRAY_BUFFER);const S=g.morphAttributes;for(const y in S){const T=S[y];for(let E=0,_=T.length;E<_;E++)t.update(T[E],r.ARRAY_BUFFER)}}function p(g){const x=[],S=g.index,y=g.attributes.position;let T=0;if(S!==null){const U=S.array;T=S.version;for(let L=0,A=U.length;L<A;L+=3){const k=U[L+0],z=U[L+1],O=U[L+2];x.push(k,z,z,O,O,k)}}else if(y!==void 0){const U=y.array;T=y.version;for(let L=0,A=U.length/3-1;L<A;L+=3){const k=L+0,z=L+1,O=L+2;x.push(k,z,z,O,O,k)}}else return;const E=new(M_(x)?w_:A_)(x,1);E.version=T;const _=c.get(g);_&&t.remove(_),c.set(g,E)}function v(g){const x=c.get(g);if(x){const S=g.index;S!==null&&x.version<S.version&&p(g)}else p(g);return c.get(g)}return{get:d,update:m,getWireframeAttribute:v}}function wb(r,t,n){let s;function l(x){s=x}let c,f;function d(x){c=x.type,f=x.bytesPerElement}function m(x,S){r.drawElements(s,S,c,x*f),n.update(S,s,1)}function p(x,S,y){y!==0&&(r.drawElementsInstanced(s,S,c,x*f,y),n.update(S,s,y))}function v(x,S,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,c,x,0,y);let E=0;for(let _=0;_<y;_++)E+=S[_];n.update(E,s,1)}function g(x,S,y,T){if(y===0)return;const E=t.get("WEBGL_multi_draw");if(E===null)for(let _=0;_<x.length;_++)p(x[_]/f,S[_],T[_]);else{E.multiDrawElementsInstancedWEBGL(s,S,0,c,x,0,T,0,y);let _=0;for(let U=0;U<y;U++)_+=S[U]*T[U];n.update(_,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=v,this.renderMultiDrawInstances=g}function Rb(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,d){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=d*(c/3);break;case r.LINES:n.lines+=d*(c/2);break;case r.LINE_STRIP:n.lines+=d*(c-1);break;case r.LINE_LOOP:n.lines+=d*c;break;case r.POINTS:n.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:s}}function Cb(r,t,n){const s=new WeakMap,l=new je;function c(f,d,m){const p=f.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=v!==void 0?v.length:0;let x=s.get(d);if(x===void 0||x.count!==g){let R=function(){F.dispose(),s.delete(d),d.removeEventListener("dispose",R)};var S=R;x!==void 0&&x.texture.dispose();const y=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,E=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],U=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let A=0;y===!0&&(A=1),T===!0&&(A=2),E===!0&&(A=3);let k=d.attributes.position.count*A,z=1;k>t.maxTextureSize&&(z=Math.ceil(k/t.maxTextureSize),k=t.maxTextureSize);const O=new Float32Array(k*z*4*g),F=new E_(O,k,z,g);F.type=ba,F.needsUpdate=!0;const D=A*4;for(let H=0;H<g;H++){const et=_[H],st=U[H],ht=L[H],mt=k*z*4*H;for(let B=0;B<et.count;B++){const Q=B*D;y===!0&&(l.fromBufferAttribute(et,B),O[mt+Q+0]=l.x,O[mt+Q+1]=l.y,O[mt+Q+2]=l.z,O[mt+Q+3]=0),T===!0&&(l.fromBufferAttribute(st,B),O[mt+Q+4]=l.x,O[mt+Q+5]=l.y,O[mt+Q+6]=l.z,O[mt+Q+7]=0),E===!0&&(l.fromBufferAttribute(ht,B),O[mt+Q+8]=l.x,O[mt+Q+9]=l.y,O[mt+Q+10]=l.z,O[mt+Q+11]=ht.itemSize===4?l.w:1)}}x={count:g,texture:F,size:new ne(k,z)},s.set(d,x),d.addEventListener("dispose",R)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let y=0;for(let E=0;E<p.length;E++)y+=p[E];const T=d.morphTargetsRelative?1:1-y;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function Db(r,t,n,s){let l=new WeakMap;function c(m){const p=s.render.frame,v=m.geometry,g=t.get(m,v);if(l.get(g)!==p&&(t.update(g),l.set(g,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(n.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;l.get(x)!==p&&(x.update(),l.set(x,p))}return g}function f(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:c,dispose:f}}class U_ extends kn{constructor(t,n,s,l,c,f,d,m,p,v=Wr){if(v!==Wr&&v!==Qr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&v===Wr&&(s=ks),s===void 0&&v===Qr&&(s=Kr),super(null,l,c,f,d,m,v,s,p),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=d!==void 0?d:pi,this.minFilter=m!==void 0?m:pi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const N_=new kn,cx=new U_(1,1),O_=new E_,P_=new v1,z_=new D_,ux=[],fx=[],hx=new Float32Array(16),dx=new Float32Array(9),px=new Float32Array(4);function no(r,t,n){const s=r[0];if(s<=0||s>0)return r;const l=t*n;let c=ux[l];if(c===void 0&&(c=new Float32Array(l),ux[l]=c),t!==0){s.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=n,r[f].toArray(c,d)}return c}function Sn(r,t){if(r.length!==t.length)return!1;for(let n=0,s=r.length;n<s;n++)if(r[n]!==t[n])return!1;return!0}function Mn(r,t){for(let n=0,s=t.length;n<s;n++)r[n]=t[n]}function Mu(r,t){let n=fx[t];n===void 0&&(n=new Int32Array(t),fx[t]=n);for(let s=0;s!==t;++s)n[s]=r.allocateTextureUnit();return n}function Lb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function Ub(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2fv(this.addr,t),Mn(n,t)}}function Nb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Sn(n,t))return;r.uniform3fv(this.addr,t),Mn(n,t)}}function Ob(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4fv(this.addr,t),Mn(n,t)}}function Pb(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(Sn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,s))return;px.set(s),r.uniformMatrix2fv(this.addr,!1,px),Mn(n,s)}}function zb(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(Sn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,s))return;dx.set(s),r.uniformMatrix3fv(this.addr,!1,dx),Mn(n,s)}}function Bb(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(Sn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),Mn(n,t)}else{if(Sn(n,s))return;hx.set(s),r.uniformMatrix4fv(this.addr,!1,hx),Mn(n,s)}}function Ib(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function Fb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2iv(this.addr,t),Mn(n,t)}}function Hb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3iv(this.addr,t),Mn(n,t)}}function Gb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4iv(this.addr,t),Mn(n,t)}}function Vb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function kb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sn(n,t))return;r.uniform2uiv(this.addr,t),Mn(n,t)}}function Xb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sn(n,t))return;r.uniform3uiv(this.addr,t),Mn(n,t)}}function Wb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sn(n,t))return;r.uniform4uiv(this.addr,t),Mn(n,t)}}function qb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(cx.compareFunction=S_,c=cx):c=N_,n.setTexture2D(t||c,l)}function jb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture3D(t||P_,l)}function Yb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTextureCube(t||z_,l)}function Zb(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture2DArray(t||O_,l)}function Kb(r){switch(r){case 5126:return Lb;case 35664:return Ub;case 35665:return Nb;case 35666:return Ob;case 35674:return Pb;case 35675:return zb;case 35676:return Bb;case 5124:case 35670:return Ib;case 35667:case 35671:return Fb;case 35668:case 35672:return Hb;case 35669:case 35673:return Gb;case 5125:return Vb;case 36294:return kb;case 36295:return Xb;case 36296:return Wb;case 35678:case 36198:case 36298:case 36306:case 35682:return qb;case 35679:case 36299:case 36307:return jb;case 35680:case 36300:case 36308:case 36293:return Yb;case 36289:case 36303:case 36311:case 36292:return Zb}}function Qb(r,t){r.uniform1fv(this.addr,t)}function Jb(r,t){const n=no(t,this.size,2);r.uniform2fv(this.addr,n)}function $b(r,t){const n=no(t,this.size,3);r.uniform3fv(this.addr,n)}function tA(r,t){const n=no(t,this.size,4);r.uniform4fv(this.addr,n)}function eA(r,t){const n=no(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function nA(r,t){const n=no(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function iA(r,t){const n=no(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function aA(r,t){r.uniform1iv(this.addr,t)}function sA(r,t){r.uniform2iv(this.addr,t)}function rA(r,t){r.uniform3iv(this.addr,t)}function oA(r,t){r.uniform4iv(this.addr,t)}function lA(r,t){r.uniform1uiv(this.addr,t)}function cA(r,t){r.uniform2uiv(this.addr,t)}function uA(r,t){r.uniform3uiv(this.addr,t)}function fA(r,t){r.uniform4uiv(this.addr,t)}function hA(r,t,n){const s=this.cache,l=t.length,c=Mu(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||N_,c[f])}function dA(r,t,n){const s=this.cache,l=t.length,c=Mu(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||P_,c[f])}function pA(r,t,n){const s=this.cache,l=t.length,c=Mu(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||z_,c[f])}function mA(r,t,n){const s=this.cache,l=t.length,c=Mu(n,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||O_,c[f])}function gA(r){switch(r){case 5126:return Qb;case 35664:return Jb;case 35665:return $b;case 35666:return tA;case 35674:return eA;case 35675:return nA;case 35676:return iA;case 5124:case 35670:return aA;case 35667:case 35671:return sA;case 35668:case 35672:return rA;case 35669:case 35673:return oA;case 5125:return lA;case 36294:return cA;case 36295:return uA;case 36296:return fA;case 35678:case 36198:case 36298:case 36306:case 35682:return hA;case 35679:case 36299:case 36307:return dA;case 35680:case 36300:case 36308:case 36293:return pA;case 36289:case 36303:case 36311:case 36292:return mA}}class vA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.setValue=Kb(n.type)}}class xA{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=gA(n.type)}}class _A{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,n[d.id],s)}}}const dd=/(\w+)(\])?(\[|\.)?/g;function mx(r,t){r.seq.push(t),r.map[t.id]=t}function SA(r,t,n){const s=r.name,l=s.length;for(dd.lastIndex=0;;){const c=dd.exec(s),f=dd.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&f+2===l){mx(n,p===void 0?new vA(d,r,t):new xA(d,r,t));break}else{let g=n.map[d];g===void 0&&(g=new _A(d),mx(n,g)),n=g}}}class uu{constructor(t,n){this.seq=[],this.map={};const s=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);SA(c,f,this)}}setValue(t,n,s,l){const c=this.map[n];c!==void 0&&c.setValue(t,s,l)}setOptional(t,n,s){const l=n[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,n,s,l){for(let c=0,f=n.length;c!==f;++c){const d=n[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,n){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&s.push(f)}return s}}function gx(r,t,n){const s=r.createShader(t);return r.shaderSource(s,n),r.compileShader(s),s}const MA=37297;let yA=0;function EA(r,t){const n=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const d=f+1;s.push(`${d===t?">":" "} ${d}: ${n[f]}`)}return s.join(`
`)}const vx=new he;function TA(r){Re._getMatrix(vx,Re.workingColorSpace,r);const t=`mat3( ${vx.elements.map(n=>n.toFixed(4))} )`;switch(Re.getTransfer(r)){case _u:return[t,"LinearTransferOETF"];case He:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function xx(r,t,n){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+EA(r.getShaderSource(t),f)}else return l}function bA(r,t){const n=TA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function AA(r,t){let n;switch(t){case n_:n="Linear";break;case i_:n="Reinhard";break;case a_:n="Cineon";break;case s_:n="ACESFilmic";break;case r_:n="AgX";break;case o_:n="Neutral";break;case Ky:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xc=new V;function wA(){Re.getLuminanceCoefficients(Xc);const r=Xc.x.toFixed(4),t=Xc.y.toFixed(4),n=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function RA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rl).join(`
`)}function CA(r){const t=[];for(const n in r){const s=r[n];s!==!1&&t.push("#define "+n+" "+s)}return t.join(`
`)}function DA(r,t){const n={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:d}}return n}function rl(r){return r!==""}function _x(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sx(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const LA=/^[ \t]*#include +<([\w\d./]+)>/gm;function cp(r){return r.replace(LA,NA)}const UA=new Map;function NA(r,t){let n=de[t];if(n===void 0){const s=UA.get(t);if(s!==void 0)n=de[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return cp(n)}const OA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mx(r){return r.replace(OA,PA)}function PA(r,t,n,s){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function yx(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function zA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===t_?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Cy?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ya&&(t="SHADOWMAP_TYPE_VSM"),t}function BA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Yr:case Zr:t="ENVMAP_TYPE_CUBE";break;case xu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function IA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Zr:t="ENVMAP_MODE_REFRACTION";break}return t}function FA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case e_:t="ENVMAP_BLENDING_MULTIPLY";break;case Yy:t="ENVMAP_BLENDING_MIX";break;case Zy:t="ENVMAP_BLENDING_ADD";break}return t}function HA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function GA(r,t,n,s){const l=r.getContext(),c=n.defines;let f=n.vertexShader,d=n.fragmentShader;const m=zA(n),p=BA(n),v=IA(n),g=FA(n),x=HA(n),S=RA(n),y=CA(c),T=l.createProgram();let E,_,U=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(E=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(rl).join(`
`),E.length>0&&(E+=`
`),_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(rl).join(`
`),_.length>0&&(_+=`
`)):(E=[yx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rl).join(`
`),_=[yx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+v:"",n.envMap?"#define "+g:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ls?"#define TONE_MAPPING":"",n.toneMapping!==ls?de.tonemapping_pars_fragment:"",n.toneMapping!==ls?AA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,bA("linearToOutputTexel",n.outputColorSpace),wA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(rl).join(`
`)),f=cp(f),f=_x(f,n),f=Sx(f,n),d=cp(d),d=_x(d,n),d=Sx(d,n),f=Mx(f),d=Mx(d),n.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,E=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,_=["#define varying in",n.glslVersion===Pv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Pv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const L=U+E+f,A=U+_+d,k=gx(l,l.VERTEX_SHADER,L),z=gx(l,l.FRAGMENT_SHADER,A);l.attachShader(T,k),l.attachShader(T,z),n.index0AttributeName!==void 0?l.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function O(H){if(r.debug.checkShaderErrors){const et=l.getProgramInfoLog(T).trim(),st=l.getShaderInfoLog(k).trim(),ht=l.getShaderInfoLog(z).trim();let mt=!0,B=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(mt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,k,z);else{const Q=xx(l,k,"vertex"),K=xx(l,z,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+et+`
`+Q+`
`+K)}else et!==""?console.warn("THREE.WebGLProgram: Program Info Log:",et):(st===""||ht==="")&&(B=!1);B&&(H.diagnostics={runnable:mt,programLog:et,vertexShader:{log:st,prefix:E},fragmentShader:{log:ht,prefix:_}})}l.deleteShader(k),l.deleteShader(z),F=new uu(l,T),D=DA(l,T)}let F;this.getUniforms=function(){return F===void 0&&O(this),F};let D;this.getAttributes=function(){return D===void 0&&O(this),D};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=l.getProgramParameter(T,MA)),R},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=yA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=k,this.fragmentShader=z,this}let VA=0;class kA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let s=n.get(t);return s===void 0&&(s=new Set,n.set(t,s)),s}_getShaderStage(t){const n=this.shaderCache;let s=n.get(t);return s===void 0&&(s=new XA(t),n.set(t,s)),s}}class XA{constructor(t){this.id=VA++,this.code=t,this.usedTimes=0}}function WA(r,t,n,s,l,c,f){const d=new T_,m=new kA,p=new Set,v=[],g=l.logarithmicDepthBuffer,x=l.vertexTextures;let S=l.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(D){return p.add(D),D===0?"uv":`uv${D}`}function E(D,R,H,et,st){const ht=et.fog,mt=st.geometry,B=D.isMeshStandardMaterial?et.environment:null,Q=(D.isMeshStandardMaterial?n:t).get(D.envMap||B),K=Q&&Q.mapping===xu?Q.image.height:null,Mt=y[D.type];D.precision!==null&&(S=l.getMaxPrecision(D.precision),S!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",S,"instead."));const Tt=mt.morphAttributes.position||mt.morphAttributes.normal||mt.morphAttributes.color,P=Tt!==void 0?Tt.length:0;let it=0;mt.morphAttributes.position!==void 0&&(it=1),mt.morphAttributes.normal!==void 0&&(it=2),mt.morphAttributes.color!==void 0&&(it=3);let St,Z,ct,Et;if(Mt){const Ce=Ki[Mt];St=Ce.vertexShader,Z=Ce.fragmentShader}else St=D.vertexShader,Z=D.fragmentShader,m.update(D),ct=m.getVertexShaderID(D),Et=m.getFragmentShaderID(D);const _t=r.getRenderTarget(),Gt=r.state.buffers.depth.getReversed(),Ht=st.isInstancedMesh===!0,oe=st.isBatchedMesh===!0,Ge=!!D.map,ge=!!D.matcap,$e=!!Q,j=!!D.aoMap,Bn=!!D.lightMap,me=!!D.bumpMap,_e=!!D.normalMap,Qt=!!D.displacementMap,ze=!!D.emissiveMap,Zt=!!D.metalnessMap,N=!!D.roughnessMap,w=D.anisotropy>0,nt=D.clearcoat>0,dt=D.dispersion>0,yt=D.iridescence>0,gt=D.sheen>0,qt=D.transmission>0,Lt=w&&!!D.anisotropyMap,zt=nt&&!!D.clearcoatMap,Se=nt&&!!D.clearcoatNormalMap,At=nt&&!!D.clearcoatRoughnessMap,Bt=yt&&!!D.iridescenceMap,Kt=yt&&!!D.iridescenceThicknessMap,jt=gt&&!!D.sheenColorMap,Ot=gt&&!!D.sheenRoughnessMap,ie=!!D.specularMap,ce=!!D.specularColorMap,Ve=!!D.specularIntensityMap,X=qt&&!!D.transmissionMap,wt=qt&&!!D.thicknessMap,lt=!!D.gradientMap,xt=!!D.alphaMap,Rt=D.alphaTest>0,Ut=!!D.alphaHash,ae=!!D.extensions;let tn=ls;D.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(tn=r.toneMapping);const vn={shaderID:Mt,shaderType:D.type,shaderName:D.name,vertexShader:St,fragmentShader:Z,defines:D.defines,customVertexShaderID:ct,customFragmentShaderID:Et,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:S,batching:oe,batchingColor:oe&&st._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&st.instanceColor!==null,instancingMorph:Ht&&st.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:_t===null?r.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:to,alphaToCoverage:!!D.alphaToCoverage,map:Ge,matcap:ge,envMap:$e,envMapMode:$e&&Q.mapping,envMapCubeUVHeight:K,aoMap:j,lightMap:Bn,bumpMap:me,normalMap:_e,displacementMap:x&&Qt,emissiveMap:ze,normalMapObjectSpace:_e&&D.normalMapType===t1,normalMapTangentSpace:_e&&D.normalMapType===__,metalnessMap:Zt,roughnessMap:N,anisotropy:w,anisotropyMap:Lt,clearcoat:nt,clearcoatMap:zt,clearcoatNormalMap:Se,clearcoatRoughnessMap:At,dispersion:dt,iridescence:yt,iridescenceMap:Bt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:jt,sheenRoughnessMap:Ot,specularMap:ie,specularColorMap:ce,specularIntensityMap:Ve,transmission:qt,transmissionMap:X,thicknessMap:wt,gradientMap:lt,opaque:D.transparent===!1&&D.blending===kr&&D.alphaToCoverage===!1,alphaMap:xt,alphaTest:Rt,alphaHash:Ut,combine:D.combine,mapUv:Ge&&T(D.map.channel),aoMapUv:j&&T(D.aoMap.channel),lightMapUv:Bn&&T(D.lightMap.channel),bumpMapUv:me&&T(D.bumpMap.channel),normalMapUv:_e&&T(D.normalMap.channel),displacementMapUv:Qt&&T(D.displacementMap.channel),emissiveMapUv:ze&&T(D.emissiveMap.channel),metalnessMapUv:Zt&&T(D.metalnessMap.channel),roughnessMapUv:N&&T(D.roughnessMap.channel),anisotropyMapUv:Lt&&T(D.anisotropyMap.channel),clearcoatMapUv:zt&&T(D.clearcoatMap.channel),clearcoatNormalMapUv:Se&&T(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&T(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&T(D.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(D.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&T(D.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&T(D.sheenRoughnessMap.channel),specularMapUv:ie&&T(D.specularMap.channel),specularColorMapUv:ce&&T(D.specularColorMap.channel),specularIntensityMapUv:Ve&&T(D.specularIntensityMap.channel),transmissionMapUv:X&&T(D.transmissionMap.channel),thicknessMapUv:wt&&T(D.thicknessMap.channel),alphaMapUv:xt&&T(D.alphaMap.channel),vertexTangents:!!mt.attributes.tangent&&(_e||w),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!mt.attributes.color&&mt.attributes.color.itemSize===4,pointsUvs:st.isPoints===!0&&!!mt.attributes.uv&&(Ge||xt),fog:!!ht,useFog:D.fog===!0,fogExp2:!!ht&&ht.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:g,reverseDepthBuffer:Gt,skinning:st.isSkinnedMesh===!0,morphTargets:mt.morphAttributes.position!==void 0,morphNormals:mt.morphAttributes.normal!==void 0,morphColors:mt.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:it,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:tn,decodeVideoTexture:Ge&&D.map.isVideoTexture===!0&&Re.getTransfer(D.map.colorSpace)===He,decodeVideoTextureEmissive:ze&&D.emissiveMap.isVideoTexture===!0&&Re.getTransfer(D.emissiveMap.colorSpace)===He,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===Ta,flipSided:D.side===ni,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:ae&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&D.extensions.multiDraw===!0||oe)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return vn.vertexUv1s=p.has(1),vn.vertexUv2s=p.has(2),vn.vertexUv3s=p.has(3),p.clear(),vn}function _(D){const R=[];if(D.shaderID?R.push(D.shaderID):(R.push(D.customVertexShaderID),R.push(D.customFragmentShaderID)),D.defines!==void 0)for(const H in D.defines)R.push(H),R.push(D.defines[H]);return D.isRawShaderMaterial===!1&&(U(R,D),L(R,D),R.push(r.outputColorSpace)),R.push(D.customProgramCacheKey),R.join()}function U(D,R){D.push(R.precision),D.push(R.outputColorSpace),D.push(R.envMapMode),D.push(R.envMapCubeUVHeight),D.push(R.mapUv),D.push(R.alphaMapUv),D.push(R.lightMapUv),D.push(R.aoMapUv),D.push(R.bumpMapUv),D.push(R.normalMapUv),D.push(R.displacementMapUv),D.push(R.emissiveMapUv),D.push(R.metalnessMapUv),D.push(R.roughnessMapUv),D.push(R.anisotropyMapUv),D.push(R.clearcoatMapUv),D.push(R.clearcoatNormalMapUv),D.push(R.clearcoatRoughnessMapUv),D.push(R.iridescenceMapUv),D.push(R.iridescenceThicknessMapUv),D.push(R.sheenColorMapUv),D.push(R.sheenRoughnessMapUv),D.push(R.specularMapUv),D.push(R.specularColorMapUv),D.push(R.specularIntensityMapUv),D.push(R.transmissionMapUv),D.push(R.thicknessMapUv),D.push(R.combine),D.push(R.fogExp2),D.push(R.sizeAttenuation),D.push(R.morphTargetsCount),D.push(R.morphAttributeCount),D.push(R.numDirLights),D.push(R.numPointLights),D.push(R.numSpotLights),D.push(R.numSpotLightMaps),D.push(R.numHemiLights),D.push(R.numRectAreaLights),D.push(R.numDirLightShadows),D.push(R.numPointLightShadows),D.push(R.numSpotLightShadows),D.push(R.numSpotLightShadowsWithMaps),D.push(R.numLightProbes),D.push(R.shadowMapType),D.push(R.toneMapping),D.push(R.numClippingPlanes),D.push(R.numClipIntersection),D.push(R.depthPacking)}function L(D,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reverseDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),D.push(d.mask)}function A(D){const R=y[D.type];let H;if(R){const et=Ki[R];H=cs.clone(et.uniforms)}else H=D.uniforms;return H}function k(D,R){let H;for(let et=0,st=v.length;et<st;et++){const ht=v[et];if(ht.cacheKey===R){H=ht,++H.usedTimes;break}}return H===void 0&&(H=new GA(r,R,D,c),v.push(H)),H}function z(D){if(--D.usedTimes===0){const R=v.indexOf(D);v[R]=v[v.length-1],v.pop(),D.destroy()}}function O(D){m.remove(D)}function F(){m.dispose()}return{getParameters:E,getProgramCacheKey:_,getUniforms:A,acquireProgram:k,releaseProgram:z,releaseShaderCache:O,programs:v,dispose:F}}function qA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let d=r.get(f);return d===void 0&&(d={},r.set(f,d)),d}function s(f){r.delete(f)}function l(f,d,m){r.get(f)[d]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:s,update:l,dispose:c}}function jA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Ex(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Tx(){const r=[];let t=0;const n=[],s=[],l=[];function c(){t=0,n.length=0,s.length=0,l.length=0}function f(g,x,S,y,T,E){let _=r[t];return _===void 0?(_={id:g.id,object:g,geometry:x,material:S,groupOrder:y,renderOrder:g.renderOrder,z:T,group:E},r[t]=_):(_.id=g.id,_.object=g,_.geometry=x,_.material=S,_.groupOrder=y,_.renderOrder=g.renderOrder,_.z=T,_.group=E),t++,_}function d(g,x,S,y,T,E){const _=f(g,x,S,y,T,E);S.transmission>0?s.push(_):S.transparent===!0?l.push(_):n.push(_)}function m(g,x,S,y,T,E){const _=f(g,x,S,y,T,E);S.transmission>0?s.unshift(_):S.transparent===!0?l.unshift(_):n.unshift(_)}function p(g,x){n.length>1&&n.sort(g||jA),s.length>1&&s.sort(x||Ex),l.length>1&&l.sort(x||Ex)}function v(){for(let g=t,x=r.length;g<x;g++){const S=r[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:v,sort:p}}function YA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new Tx,r.set(s,[f])):l>=c.length?(f=new Tx,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function ZA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new V,color:new te};break;case"SpotLight":n={position:new V,direction:new V,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new te,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new te,groundColor:new te};break;case"RectAreaLight":n={color:new te,position:new V,halfWidth:new V,halfHeight:new V};break}return r[t.id]=n,n}}}function KA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let QA=0;function JA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function $A(r){const t=new ZA,n=KA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new V);const l=new V,c=new Je,f=new Je;function d(p){let v=0,g=0,x=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let S=0,y=0,T=0,E=0,_=0,U=0,L=0,A=0,k=0,z=0,O=0;p.sort(JA);for(let D=0,R=p.length;D<R;D++){const H=p[D],et=H.color,st=H.intensity,ht=H.distance,mt=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)v+=et.r*st,g+=et.g*st,x+=et.b*st;else if(H.isLightProbe){for(let B=0;B<9;B++)s.probe[B].addScaledVector(H.sh.coefficients[B],st);O++}else if(H.isDirectionalLight){const B=t.get(H);if(B.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const Q=H.shadow,K=n.get(H);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,s.directionalShadow[S]=K,s.directionalShadowMap[S]=mt,s.directionalShadowMatrix[S]=H.shadow.matrix,U++}s.directional[S]=B,S++}else if(H.isSpotLight){const B=t.get(H);B.position.setFromMatrixPosition(H.matrixWorld),B.color.copy(et).multiplyScalar(st),B.distance=ht,B.coneCos=Math.cos(H.angle),B.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),B.decay=H.decay,s.spot[T]=B;const Q=H.shadow;if(H.map&&(s.spotLightMap[k]=H.map,k++,Q.updateMatrices(H),H.castShadow&&z++),s.spotLightMatrix[T]=Q.matrix,H.castShadow){const K=n.get(H);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,s.spotShadow[T]=K,s.spotShadowMap[T]=mt,A++}T++}else if(H.isRectAreaLight){const B=t.get(H);B.color.copy(et).multiplyScalar(st),B.halfWidth.set(H.width*.5,0,0),B.halfHeight.set(0,H.height*.5,0),s.rectArea[E]=B,E++}else if(H.isPointLight){const B=t.get(H);if(B.color.copy(H.color).multiplyScalar(H.intensity),B.distance=H.distance,B.decay=H.decay,H.castShadow){const Q=H.shadow,K=n.get(H);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,s.pointShadow[y]=K,s.pointShadowMap[y]=mt,s.pointShadowMatrix[y]=H.shadow.matrix,L++}s.point[y]=B,y++}else if(H.isHemisphereLight){const B=t.get(H);B.skyColor.copy(H.color).multiplyScalar(st),B.groundColor.copy(H.groundColor).multiplyScalar(st),s.hemi[_]=B,_++}}E>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Nt.LTC_FLOAT_1,s.rectAreaLTC2=Nt.LTC_FLOAT_2):(s.rectAreaLTC1=Nt.LTC_HALF_1,s.rectAreaLTC2=Nt.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=g,s.ambient[2]=x;const F=s.hash;(F.directionalLength!==S||F.pointLength!==y||F.spotLength!==T||F.rectAreaLength!==E||F.hemiLength!==_||F.numDirectionalShadows!==U||F.numPointShadows!==L||F.numSpotShadows!==A||F.numSpotMaps!==k||F.numLightProbes!==O)&&(s.directional.length=S,s.spot.length=T,s.rectArea.length=E,s.point.length=y,s.hemi.length=_,s.directionalShadow.length=U,s.directionalShadowMap.length=U,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=U,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=A+k-z,s.spotLightMap.length=k,s.numSpotLightShadowsWithMaps=z,s.numLightProbes=O,F.directionalLength=S,F.pointLength=y,F.spotLength=T,F.rectAreaLength=E,F.hemiLength=_,F.numDirectionalShadows=U,F.numPointShadows=L,F.numSpotShadows=A,F.numSpotMaps=k,F.numLightProbes=O,s.version=QA++)}function m(p,v){let g=0,x=0,S=0,y=0,T=0;const E=v.matrixWorldInverse;for(let _=0,U=p.length;_<U;_++){const L=p[_];if(L.isDirectionalLight){const A=s.directional[g];A.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),A.direction.sub(l),A.direction.transformDirection(E),g++}else if(L.isSpotLight){const A=s.spot[S];A.position.setFromMatrixPosition(L.matrixWorld),A.position.applyMatrix4(E),A.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),A.direction.sub(l),A.direction.transformDirection(E),S++}else if(L.isRectAreaLight){const A=s.rectArea[y];A.position.setFromMatrixPosition(L.matrixWorld),A.position.applyMatrix4(E),f.identity(),c.copy(L.matrixWorld),c.premultiply(E),f.extractRotation(c),A.halfWidth.set(L.width*.5,0,0),A.halfHeight.set(0,L.height*.5,0),A.halfWidth.applyMatrix4(f),A.halfHeight.applyMatrix4(f),y++}else if(L.isPointLight){const A=s.point[x];A.position.setFromMatrixPosition(L.matrixWorld),A.position.applyMatrix4(E),x++}else if(L.isHemisphereLight){const A=s.hemi[T];A.direction.setFromMatrixPosition(L.matrixWorld),A.direction.transformDirection(E),T++}}}return{setup:d,setupView:m,state:s}}function bx(r){const t=new $A(r),n=[],s=[];function l(v){p.camera=v,n.length=0,s.length=0}function c(v){n.push(v)}function f(v){s.push(v)}function d(){t.setup(n)}function m(v){t.setupView(n,v)}const p={lightsArray:n,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:f}}function t2(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new bx(r),t.set(l,[d])):c>=f.length?(d=new bx(r),f.push(d)):d=f[c],d}function s(){t=new WeakMap}return{get:n,dispose:s}}class e2 extends Xs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Jy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class n2 extends Xs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const i2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a2=`uniform sampler2D shadow_pass;
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
}`;function s2(r,t,n){let s=new yp;const l=new ne,c=new ne,f=new je,d=new e2({depthPacking:$y}),m=new n2,p={},v=n.maxTextureSize,g={[us]:ni,[ni]:us,[Ta]:Ta},x=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:i2,fragmentShader:a2}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const y=new Rn;y.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new $t(y,x),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=t_;let _=this.type;this.render=function(z,O,F){if(E.enabled===!1||E.autoUpdate===!1&&E.needsUpdate===!1||z.length===0)return;const D=r.getRenderTarget(),R=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),et=r.state;et.setBlending(wa),et.buffers.color.setClear(1,1,1,1),et.buffers.depth.setTest(!0),et.setScissorTest(!1);const st=_!==ya&&this.type===ya,ht=_===ya&&this.type!==ya;for(let mt=0,B=z.length;mt<B;mt++){const Q=z[mt],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const Mt=K.getFrameExtents();if(l.multiply(Mt),c.copy(K.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/Mt.x),l.x=c.x*Mt.x,K.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/Mt.y),l.y=c.y*Mt.y,K.mapSize.y=c.y)),K.map===null||st===!0||ht===!0){const P=this.type!==ya?{minFilter:pi,magFilter:pi}:{};K.map!==null&&K.map.dispose(),K.map=new mi(l.x,l.y,P),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}r.setRenderTarget(K.map),r.clear();const Tt=K.getViewportCount();for(let P=0;P<Tt;P++){const it=K.getViewport(P);f.set(c.x*it.x,c.y*it.y,c.x*it.z,c.y*it.w),et.viewport(f),K.updateMatrices(Q,P),s=K.getFrustum(),A(O,F,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===ya&&U(K,F),K.needsUpdate=!1}_=this.type,E.needsUpdate=!1,r.setRenderTarget(D,R,H)};function U(z,O){const F=t.update(T);x.defines.VSM_SAMPLES!==z.blurSamples&&(x.defines.VSM_SAMPLES=z.blurSamples,S.defines.VSM_SAMPLES=z.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),z.mapPass===null&&(z.mapPass=new mi(l.x,l.y)),x.uniforms.shadow_pass.value=z.map.texture,x.uniforms.resolution.value=z.mapSize,x.uniforms.radius.value=z.radius,r.setRenderTarget(z.mapPass),r.clear(),r.renderBufferDirect(O,null,F,x,T,null),S.uniforms.shadow_pass.value=z.mapPass.texture,S.uniforms.resolution.value=z.mapSize,S.uniforms.radius.value=z.radius,r.setRenderTarget(z.map),r.clear(),r.renderBufferDirect(O,null,F,S,T,null)}function L(z,O,F,D){let R=null;const H=F.isPointLight===!0?z.customDistanceMaterial:z.customDepthMaterial;if(H!==void 0)R=H;else if(R=F.isPointLight===!0?m:d,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const et=R.uuid,st=O.uuid;let ht=p[et];ht===void 0&&(ht={},p[et]=ht);let mt=ht[st];mt===void 0&&(mt=R.clone(),ht[st]=mt,O.addEventListener("dispose",k)),R=mt}if(R.visible=O.visible,R.wireframe=O.wireframe,D===ya?R.side=O.shadowSide!==null?O.shadowSide:O.side:R.side=O.shadowSide!==null?O.shadowSide:g[O.side],R.alphaMap=O.alphaMap,R.alphaTest=O.alphaTest,R.map=O.map,R.clipShadows=O.clipShadows,R.clippingPlanes=O.clippingPlanes,R.clipIntersection=O.clipIntersection,R.displacementMap=O.displacementMap,R.displacementScale=O.displacementScale,R.displacementBias=O.displacementBias,R.wireframeLinewidth=O.wireframeLinewidth,R.linewidth=O.linewidth,F.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const et=r.properties.get(R);et.light=F}return R}function A(z,O,F,D,R){if(z.visible===!1)return;if(z.layers.test(O.layers)&&(z.isMesh||z.isLine||z.isPoints)&&(z.castShadow||z.receiveShadow&&R===ya)&&(!z.frustumCulled||s.intersectsObject(z))){z.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,z.matrixWorld);const st=t.update(z),ht=z.material;if(Array.isArray(ht)){const mt=st.groups;for(let B=0,Q=mt.length;B<Q;B++){const K=mt[B],Mt=ht[K.materialIndex];if(Mt&&Mt.visible){const Tt=L(z,Mt,D,R);z.onBeforeShadow(r,z,O,F,st,Tt,K),r.renderBufferDirect(F,null,st,Tt,z,K),z.onAfterShadow(r,z,O,F,st,Tt,K)}}}else if(ht.visible){const mt=L(z,ht,D,R);z.onBeforeShadow(r,z,O,F,st,mt,null),r.renderBufferDirect(F,null,st,mt,z,null),z.onAfterShadow(r,z,O,F,st,mt,null)}}const et=z.children;for(let st=0,ht=et.length;st<ht;st++)A(et[st],O,F,D,R)}function k(z){z.target.removeEventListener("dispose",k);for(const F in p){const D=p[F],R=z.target.uuid;R in D&&(D[R].dispose(),delete D[R])}}}const r2={[bd]:Ad,[wd]:Dd,[Rd]:Ld,[jr]:Cd,[Ad]:bd,[Dd]:wd,[Ld]:Rd,[Cd]:jr};function o2(r,t){function n(){let X=!1;const wt=new je;let lt=null;const xt=new je(0,0,0,0);return{setMask:function(Rt){lt!==Rt&&!X&&(r.colorMask(Rt,Rt,Rt,Rt),lt=Rt)},setLocked:function(Rt){X=Rt},setClear:function(Rt,Ut,ae,tn,vn){vn===!0&&(Rt*=tn,Ut*=tn,ae*=tn),wt.set(Rt,Ut,ae,tn),xt.equals(wt)===!1&&(r.clearColor(Rt,Ut,ae,tn),xt.copy(wt))},reset:function(){X=!1,lt=null,xt.set(-1,0,0,0)}}}function s(){let X=!1,wt=!1,lt=null,xt=null,Rt=null;return{setReversed:function(Ut){if(wt!==Ut){const ae=t.get("EXT_clip_control");wt?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT);const tn=Rt;Rt=null,this.setClear(tn)}wt=Ut},getReversed:function(){return wt},setTest:function(Ut){Ut?_t(r.DEPTH_TEST):Gt(r.DEPTH_TEST)},setMask:function(Ut){lt!==Ut&&!X&&(r.depthMask(Ut),lt=Ut)},setFunc:function(Ut){if(wt&&(Ut=r2[Ut]),xt!==Ut){switch(Ut){case bd:r.depthFunc(r.NEVER);break;case Ad:r.depthFunc(r.ALWAYS);break;case wd:r.depthFunc(r.LESS);break;case jr:r.depthFunc(r.LEQUAL);break;case Rd:r.depthFunc(r.EQUAL);break;case Cd:r.depthFunc(r.GEQUAL);break;case Dd:r.depthFunc(r.GREATER);break;case Ld:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}xt=Ut}},setLocked:function(Ut){X=Ut},setClear:function(Ut){Rt!==Ut&&(wt&&(Ut=1-Ut),r.clearDepth(Ut),Rt=Ut)},reset:function(){X=!1,lt=null,xt=null,Rt=null,wt=!1}}}function l(){let X=!1,wt=null,lt=null,xt=null,Rt=null,Ut=null,ae=null,tn=null,vn=null;return{setTest:function(Ce){X||(Ce?_t(r.STENCIL_TEST):Gt(r.STENCIL_TEST))},setMask:function(Ce){wt!==Ce&&!X&&(r.stencilMask(Ce),wt=Ce)},setFunc:function(Ce,Cn,Li){(lt!==Ce||xt!==Cn||Rt!==Li)&&(r.stencilFunc(Ce,Cn,Li),lt=Ce,xt=Cn,Rt=Li)},setOp:function(Ce,Cn,Li){(Ut!==Ce||ae!==Cn||tn!==Li)&&(r.stencilOp(Ce,Cn,Li),Ut=Ce,ae=Cn,tn=Li)},setLocked:function(Ce){X=Ce},setClear:function(Ce){vn!==Ce&&(r.clearStencil(Ce),vn=Ce)},reset:function(){X=!1,wt=null,lt=null,xt=null,Rt=null,Ut=null,ae=null,tn=null,vn=null}}}const c=new n,f=new s,d=new l,m=new WeakMap,p=new WeakMap;let v={},g={},x=new WeakMap,S=[],y=null,T=!1,E=null,_=null,U=null,L=null,A=null,k=null,z=null,O=new te(0,0,0),F=0,D=!1,R=null,H=null,et=null,st=null,ht=null;const mt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Q=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),B=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),B=Q>=2);let Mt=null,Tt={};const P=r.getParameter(r.SCISSOR_BOX),it=r.getParameter(r.VIEWPORT),St=new je().fromArray(P),Z=new je().fromArray(it);function ct(X,wt,lt,xt){const Rt=new Uint8Array(4),Ut=r.createTexture();r.bindTexture(X,Ut),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ae=0;ae<lt;ae++)X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,xt,0,r.RGBA,r.UNSIGNED_BYTE,Rt):r.texImage2D(wt+ae,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Rt);return Ut}const Et={};Et[r.TEXTURE_2D]=ct(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ct(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ct(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ct(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),_t(r.DEPTH_TEST),f.setFunc(jr),me(!1),_e(Dv),_t(r.CULL_FACE),j(wa);function _t(X){v[X]!==!0&&(r.enable(X),v[X]=!0)}function Gt(X){v[X]!==!1&&(r.disable(X),v[X]=!1)}function Ht(X,wt){return g[X]!==wt?(r.bindFramebuffer(X,wt),g[X]=wt,X===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=wt),X===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function oe(X,wt){let lt=S,xt=!1;if(X){lt=x.get(wt),lt===void 0&&(lt=[],x.set(wt,lt));const Rt=X.textures;if(lt.length!==Rt.length||lt[0]!==r.COLOR_ATTACHMENT0){for(let Ut=0,ae=Rt.length;Ut<ae;Ut++)lt[Ut]=r.COLOR_ATTACHMENT0+Ut;lt.length=Rt.length,xt=!0}}else lt[0]!==r.BACK&&(lt[0]=r.BACK,xt=!0);xt&&r.drawBuffers(lt)}function Ge(X){return y!==X?(r.useProgram(X),y=X,!0):!1}const ge={[Is]:r.FUNC_ADD,[Ly]:r.FUNC_SUBTRACT,[Uy]:r.FUNC_REVERSE_SUBTRACT};ge[Ny]=r.MIN,ge[Oy]=r.MAX;const $e={[Py]:r.ZERO,[zy]:r.ONE,[By]:r.SRC_COLOR,[Ed]:r.SRC_ALPHA,[ky]:r.SRC_ALPHA_SATURATE,[Gy]:r.DST_COLOR,[Fy]:r.DST_ALPHA,[Iy]:r.ONE_MINUS_SRC_COLOR,[Td]:r.ONE_MINUS_SRC_ALPHA,[Vy]:r.ONE_MINUS_DST_COLOR,[Hy]:r.ONE_MINUS_DST_ALPHA,[Xy]:r.CONSTANT_COLOR,[Wy]:r.ONE_MINUS_CONSTANT_COLOR,[qy]:r.CONSTANT_ALPHA,[jy]:r.ONE_MINUS_CONSTANT_ALPHA};function j(X,wt,lt,xt,Rt,Ut,ae,tn,vn,Ce){if(X===wa){T===!0&&(Gt(r.BLEND),T=!1);return}if(T===!1&&(_t(r.BLEND),T=!0),X!==Dy){if(X!==E||Ce!==D){if((_!==Is||A!==Is)&&(r.blendEquation(r.FUNC_ADD),_=Is,A=Is),Ce)switch(X){case kr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Xr:r.blendFunc(r.ONE,r.ONE);break;case Lv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uv:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case kr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Xr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Lv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uv:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}U=null,L=null,k=null,z=null,O.set(0,0,0),F=0,E=X,D=Ce}return}Rt=Rt||wt,Ut=Ut||lt,ae=ae||xt,(wt!==_||Rt!==A)&&(r.blendEquationSeparate(ge[wt],ge[Rt]),_=wt,A=Rt),(lt!==U||xt!==L||Ut!==k||ae!==z)&&(r.blendFuncSeparate($e[lt],$e[xt],$e[Ut],$e[ae]),U=lt,L=xt,k=Ut,z=ae),(tn.equals(O)===!1||vn!==F)&&(r.blendColor(tn.r,tn.g,tn.b,vn),O.copy(tn),F=vn),E=X,D=!1}function Bn(X,wt){X.side===Ta?Gt(r.CULL_FACE):_t(r.CULL_FACE);let lt=X.side===ni;wt&&(lt=!lt),me(lt),X.blending===kr&&X.transparent===!1?j(wa):j(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),c.setMask(X.colorWrite);const xt=X.stencilWrite;d.setTest(xt),xt&&(d.setMask(X.stencilWriteMask),d.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),d.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),ze(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?_t(r.SAMPLE_ALPHA_TO_COVERAGE):Gt(r.SAMPLE_ALPHA_TO_COVERAGE)}function me(X){R!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),R=X)}function _e(X){X!==wy?(_t(r.CULL_FACE),X!==H&&(X===Dv?r.cullFace(r.BACK):X===Ry?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Gt(r.CULL_FACE),H=X}function Qt(X){X!==et&&(B&&r.lineWidth(X),et=X)}function ze(X,wt,lt){X?(_t(r.POLYGON_OFFSET_FILL),(st!==wt||ht!==lt)&&(r.polygonOffset(wt,lt),st=wt,ht=lt)):Gt(r.POLYGON_OFFSET_FILL)}function Zt(X){X?_t(r.SCISSOR_TEST):Gt(r.SCISSOR_TEST)}function N(X){X===void 0&&(X=r.TEXTURE0+mt-1),Mt!==X&&(r.activeTexture(X),Mt=X)}function w(X,wt,lt){lt===void 0&&(Mt===null?lt=r.TEXTURE0+mt-1:lt=Mt);let xt=Tt[lt];xt===void 0&&(xt={type:void 0,texture:void 0},Tt[lt]=xt),(xt.type!==X||xt.texture!==wt)&&(Mt!==lt&&(r.activeTexture(lt),Mt=lt),r.bindTexture(X,wt||Et[X]),xt.type=X,xt.texture=wt)}function nt(){const X=Tt[Mt];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function dt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function yt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function qt(){try{r.texSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Se(){try{r.texStorage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function jt(X){St.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),St.copy(X))}function Ot(X){Z.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),Z.copy(X))}function ie(X,wt){let lt=p.get(wt);lt===void 0&&(lt=new WeakMap,p.set(wt,lt));let xt=lt.get(X);xt===void 0&&(xt=r.getUniformBlockIndex(wt,X.name),lt.set(X,xt))}function ce(X,wt){const xt=p.get(wt).get(X);m.get(wt)!==xt&&(r.uniformBlockBinding(wt,xt,X.__bindingPointIndex),m.set(wt,xt))}function Ve(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),v={},Mt=null,Tt={},g={},x=new WeakMap,S=[],y=null,T=!1,E=null,_=null,U=null,L=null,A=null,k=null,z=null,O=new te(0,0,0),F=0,D=!1,R=null,H=null,et=null,st=null,ht=null,St.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:_t,disable:Gt,bindFramebuffer:Ht,drawBuffers:oe,useProgram:Ge,setBlending:j,setMaterial:Bn,setFlipSided:me,setCullFace:_e,setLineWidth:Qt,setPolygonOffset:ze,setScissorTest:Zt,activeTexture:N,bindTexture:w,unbindTexture:nt,compressedTexImage2D:dt,compressedTexImage3D:yt,texImage2D:Bt,texImage3D:Kt,updateUBOMapping:ie,uniformBlockBinding:ce,texStorage2D:Se,texStorage3D:At,texSubImage2D:gt,texSubImage3D:qt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:zt,scissor:jt,viewport:Ot,reset:Ve}}function Ax(r,t,n,s){const l=l2(s);switch(n){case h_:return r*t;case p_:return r*t;case m_:return r*t*2;case g_:return r*t/l.components*l.byteLength;case xp:return r*t/l.components*l.byteLength;case v_:return r*t*2/l.components*l.byteLength;case _p:return r*t*2/l.components*l.byteLength;case d_:return r*t*3/l.components*l.byteLength;case Gi:return r*t*4/l.components*l.byteLength;case Sp:return r*t*4/l.components*l.byteLength;case au:case su:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ru:case ou:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Bd:case Fd:return Math.max(r,16)*Math.max(t,8)/4;case zd:case Id:return Math.max(r,8)*Math.max(t,8)/2;case Hd:case Gd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Vd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case kd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Wd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case jd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Zd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Kd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Qd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Jd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case $d:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case tp:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ep:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case np:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case lu:case ip:case ap:return Math.ceil(r/4)*Math.ceil(t/4)*16;case x_:case sp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case rp:case op:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function l2(r){switch(r){case Ca:case c_:return{byteLength:1,components:1};case ol:case u_:case Vi:return{byteLength:2,components:1};case gp:case vp:return{byteLength:2,components:4};case ks:case mp:case ba:return{byteLength:4,components:1};case f_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function c2(r,t,n,s,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ne,v=new WeakMap;let g;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(N,w){return S?new OffscreenCanvas(N,w):du("canvas")}function T(N,w,nt){let dt=1;const yt=Zt(N);if((yt.width>nt||yt.height>nt)&&(dt=nt/Math.max(yt.width,yt.height)),dt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const gt=Math.floor(dt*yt.width),qt=Math.floor(dt*yt.height);g===void 0&&(g=y(gt,qt));const Lt=w?y(gt,qt):g;return Lt.width=gt,Lt.height=qt,Lt.getContext("2d").drawImage(N,0,0,gt,qt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+yt.width+"x"+yt.height+") to ("+gt+"x"+qt+")."),Lt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+yt.width+"x"+yt.height+")."),N;return N}function E(N){return N.generateMipmaps}function _(N){r.generateMipmap(N)}function U(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function L(N,w,nt,dt,yt=!1){if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt=w;if(w===r.RED&&(nt===r.FLOAT&&(gt=r.R32F),nt===r.HALF_FLOAT&&(gt=r.R16F),nt===r.UNSIGNED_BYTE&&(gt=r.R8)),w===r.RED_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.R8UI),nt===r.UNSIGNED_SHORT&&(gt=r.R16UI),nt===r.UNSIGNED_INT&&(gt=r.R32UI),nt===r.BYTE&&(gt=r.R8I),nt===r.SHORT&&(gt=r.R16I),nt===r.INT&&(gt=r.R32I)),w===r.RG&&(nt===r.FLOAT&&(gt=r.RG32F),nt===r.HALF_FLOAT&&(gt=r.RG16F),nt===r.UNSIGNED_BYTE&&(gt=r.RG8)),w===r.RG_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.RG8UI),nt===r.UNSIGNED_SHORT&&(gt=r.RG16UI),nt===r.UNSIGNED_INT&&(gt=r.RG32UI),nt===r.BYTE&&(gt=r.RG8I),nt===r.SHORT&&(gt=r.RG16I),nt===r.INT&&(gt=r.RG32I)),w===r.RGB_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),nt===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),nt===r.UNSIGNED_INT&&(gt=r.RGB32UI),nt===r.BYTE&&(gt=r.RGB8I),nt===r.SHORT&&(gt=r.RGB16I),nt===r.INT&&(gt=r.RGB32I)),w===r.RGBA_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),nt===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),nt===r.UNSIGNED_INT&&(gt=r.RGBA32UI),nt===r.BYTE&&(gt=r.RGBA8I),nt===r.SHORT&&(gt=r.RGBA16I),nt===r.INT&&(gt=r.RGBA32I)),w===r.RGB&&nt===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),w===r.RGBA){const qt=yt?_u:Re.getTransfer(dt);nt===r.FLOAT&&(gt=r.RGBA32F),nt===r.HALF_FLOAT&&(gt=r.RGBA16F),nt===r.UNSIGNED_BYTE&&(gt=qt===He?r.SRGB8_ALPHA8:r.RGBA8),nt===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),nt===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function A(N,w){let nt;return N?w===null||w===ks||w===Kr?nt=r.DEPTH24_STENCIL8:w===ba?nt=r.DEPTH32F_STENCIL8:w===ol&&(nt=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ks||w===Kr?nt=r.DEPTH_COMPONENT24:w===ba?nt=r.DEPTH_COMPONENT32F:w===ol&&(nt=r.DEPTH_COMPONENT16),nt}function k(N,w){return E(N)===!0||N.isFramebufferTexture&&N.minFilter!==pi&&N.minFilter!==Hi?Math.log2(Math.max(w.width,w.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?w.mipmaps.length:1}function z(N){const w=N.target;w.removeEventListener("dispose",z),F(w),w.isVideoTexture&&v.delete(w)}function O(N){const w=N.target;w.removeEventListener("dispose",O),R(w)}function F(N){const w=s.get(N);if(w.__webglInit===void 0)return;const nt=N.source,dt=x.get(nt);if(dt){const yt=dt[w.__cacheKey];yt.usedTimes--,yt.usedTimes===0&&D(N),Object.keys(dt).length===0&&x.delete(nt)}s.remove(N)}function D(N){const w=s.get(N);r.deleteTexture(w.__webglTexture);const nt=N.source,dt=x.get(nt);delete dt[w.__cacheKey],f.memory.textures--}function R(N){const w=s.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),s.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(w.__webglFramebuffer[dt]))for(let yt=0;yt<w.__webglFramebuffer[dt].length;yt++)r.deleteFramebuffer(w.__webglFramebuffer[dt][yt]);else r.deleteFramebuffer(w.__webglFramebuffer[dt]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[dt])}else{if(Array.isArray(w.__webglFramebuffer))for(let dt=0;dt<w.__webglFramebuffer.length;dt++)r.deleteFramebuffer(w.__webglFramebuffer[dt]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let dt=0;dt<w.__webglColorRenderbuffer.length;dt++)w.__webglColorRenderbuffer[dt]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[dt]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const nt=N.textures;for(let dt=0,yt=nt.length;dt<yt;dt++){const gt=s.get(nt[dt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),s.remove(nt[dt])}s.remove(N)}let H=0;function et(){H=0}function st(){const N=H;return N>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),H+=1,N}function ht(N){const w=[];return w.push(N.wrapS),w.push(N.wrapT),w.push(N.wrapR||0),w.push(N.magFilter),w.push(N.minFilter),w.push(N.anisotropy),w.push(N.internalFormat),w.push(N.format),w.push(N.type),w.push(N.generateMipmaps),w.push(N.premultiplyAlpha),w.push(N.flipY),w.push(N.unpackAlignment),w.push(N.colorSpace),w.join()}function mt(N,w){const nt=s.get(N);if(N.isVideoTexture&&Qt(N),N.isRenderTargetTexture===!1&&N.version>0&&nt.__version!==N.version){const dt=N.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(nt,N,w);return}}n.bindTexture(r.TEXTURE_2D,nt.__webglTexture,r.TEXTURE0+w)}function B(N,w){const nt=s.get(N);if(N.version>0&&nt.__version!==N.version){Z(nt,N,w);return}n.bindTexture(r.TEXTURE_2D_ARRAY,nt.__webglTexture,r.TEXTURE0+w)}function Q(N,w){const nt=s.get(N);if(N.version>0&&nt.__version!==N.version){Z(nt,N,w);return}n.bindTexture(r.TEXTURE_3D,nt.__webglTexture,r.TEXTURE0+w)}function K(N,w){const nt=s.get(N);if(N.version>0&&nt.__version!==N.version){ct(nt,N,w);return}n.bindTexture(r.TEXTURE_CUBE_MAP,nt.__webglTexture,r.TEXTURE0+w)}const Mt={[Od]:r.REPEAT,[Hs]:r.CLAMP_TO_EDGE,[Pd]:r.MIRRORED_REPEAT},Tt={[pi]:r.NEAREST,[Qy]:r.NEAREST_MIPMAP_NEAREST,[Tc]:r.NEAREST_MIPMAP_LINEAR,[Hi]:r.LINEAR,[Hh]:r.LINEAR_MIPMAP_NEAREST,[Gs]:r.LINEAR_MIPMAP_LINEAR},P={[e1]:r.NEVER,[o1]:r.ALWAYS,[n1]:r.LESS,[S_]:r.LEQUAL,[i1]:r.EQUAL,[r1]:r.GEQUAL,[a1]:r.GREATER,[s1]:r.NOTEQUAL};function it(N,w){if(w.type===ba&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Hi||w.magFilter===Hh||w.magFilter===Tc||w.magFilter===Gs||w.minFilter===Hi||w.minFilter===Hh||w.minFilter===Tc||w.minFilter===Gs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,Mt[w.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,Mt[w.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,Mt[w.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Tt[w.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Tt[w.minFilter]),w.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,P[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===pi||w.minFilter!==Tc&&w.minFilter!==Gs||w.type===ba&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||s.get(w).__currentAnisotropy){const nt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(N,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,l.getMaxAnisotropy())),s.get(w).__currentAnisotropy=w.anisotropy}}}function St(N,w){let nt=!1;N.__webglInit===void 0&&(N.__webglInit=!0,w.addEventListener("dispose",z));const dt=w.source;let yt=x.get(dt);yt===void 0&&(yt={},x.set(dt,yt));const gt=ht(w);if(gt!==N.__cacheKey){yt[gt]===void 0&&(yt[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,nt=!0),yt[gt].usedTimes++;const qt=yt[N.__cacheKey];qt!==void 0&&(yt[N.__cacheKey].usedTimes--,qt.usedTimes===0&&D(w)),N.__cacheKey=gt,N.__webglTexture=yt[gt].texture}return nt}function Z(N,w,nt){let dt=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(dt=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(dt=r.TEXTURE_3D);const yt=St(N,w),gt=w.source;n.bindTexture(dt,N.__webglTexture,r.TEXTURE0+nt);const qt=s.get(gt);if(gt.version!==qt.__version||yt===!0){n.activeTexture(r.TEXTURE0+nt);const Lt=Re.getPrimaries(Re.workingColorSpace),zt=w.colorSpace===os?null:Re.getPrimaries(w.colorSpace),Se=w.colorSpace===os||Lt===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let At=T(w.image,!1,l.maxTextureSize);At=ze(w,At);const Bt=c.convert(w.format,w.colorSpace),Kt=c.convert(w.type);let jt=L(w.internalFormat,Bt,Kt,w.colorSpace,w.isVideoTexture);it(dt,w);let Ot;const ie=w.mipmaps,ce=w.isVideoTexture!==!0,Ve=qt.__version===void 0||yt===!0,X=gt.dataReady,wt=k(w,At);if(w.isDepthTexture)jt=A(w.format===Qr,w.type),Ve&&(ce?n.texStorage2D(r.TEXTURE_2D,1,jt,At.width,At.height):n.texImage2D(r.TEXTURE_2D,0,jt,At.width,At.height,0,Bt,Kt,null));else if(w.isDataTexture)if(ie.length>0){ce&&Ve&&n.texStorage2D(r.TEXTURE_2D,wt,jt,ie[0].width,ie[0].height);for(let lt=0,xt=ie.length;lt<xt;lt++)Ot=ie[lt],ce?X&&n.texSubImage2D(r.TEXTURE_2D,lt,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,lt,jt,Ot.width,Ot.height,0,Bt,Kt,Ot.data);w.generateMipmaps=!1}else ce?(Ve&&n.texStorage2D(r.TEXTURE_2D,wt,jt,At.width,At.height),X&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Kt,At.data)):n.texImage2D(r.TEXTURE_2D,0,jt,At.width,At.height,0,Bt,Kt,At.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ce&&Ve&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,jt,ie[0].width,ie[0].height,At.depth);for(let lt=0,xt=ie.length;lt<xt;lt++)if(Ot=ie[lt],w.format!==Gi)if(Bt!==null)if(ce){if(X)if(w.layerUpdates.size>0){const Rt=Ax(Ot.width,Ot.height,w.format,w.type);for(const Ut of w.layerUpdates){const ae=Ot.data.subarray(Ut*Rt/Ot.data.BYTES_PER_ELEMENT,(Ut+1)*Rt/Ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,lt,0,0,Ut,Ot.width,Ot.height,1,Bt,ae)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,lt,0,0,0,Ot.width,Ot.height,At.depth,Bt,Ot.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,lt,jt,Ot.width,Ot.height,At.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ce?X&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,lt,0,0,0,Ot.width,Ot.height,At.depth,Bt,Kt,Ot.data):n.texImage3D(r.TEXTURE_2D_ARRAY,lt,jt,Ot.width,Ot.height,At.depth,0,Bt,Kt,Ot.data)}else{ce&&Ve&&n.texStorage2D(r.TEXTURE_2D,wt,jt,ie[0].width,ie[0].height);for(let lt=0,xt=ie.length;lt<xt;lt++)Ot=ie[lt],w.format!==Gi?Bt!==null?ce?X&&n.compressedTexSubImage2D(r.TEXTURE_2D,lt,0,0,Ot.width,Ot.height,Bt,Ot.data):n.compressedTexImage2D(r.TEXTURE_2D,lt,jt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?X&&n.texSubImage2D(r.TEXTURE_2D,lt,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,lt,jt,Ot.width,Ot.height,0,Bt,Kt,Ot.data)}else if(w.isDataArrayTexture)if(ce){if(Ve&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,jt,At.width,At.height,At.depth),X)if(w.layerUpdates.size>0){const lt=Ax(At.width,At.height,w.format,w.type);for(const xt of w.layerUpdates){const Rt=At.data.subarray(xt*lt/At.data.BYTES_PER_ELEMENT,(xt+1)*lt/At.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,xt,At.width,At.height,1,Bt,Kt,Rt)}w.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,jt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(w.isData3DTexture)ce?(Ve&&n.texStorage3D(r.TEXTURE_3D,wt,jt,At.width,At.height,At.depth),X&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)):n.texImage3D(r.TEXTURE_3D,0,jt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(w.isFramebufferTexture){if(Ve)if(ce)n.texStorage2D(r.TEXTURE_2D,wt,jt,At.width,At.height);else{let lt=At.width,xt=At.height;for(let Rt=0;Rt<wt;Rt++)n.texImage2D(r.TEXTURE_2D,Rt,jt,lt,xt,0,Bt,Kt,null),lt>>=1,xt>>=1}}else if(ie.length>0){if(ce&&Ve){const lt=Zt(ie[0]);n.texStorage2D(r.TEXTURE_2D,wt,jt,lt.width,lt.height)}for(let lt=0,xt=ie.length;lt<xt;lt++)Ot=ie[lt],ce?X&&n.texSubImage2D(r.TEXTURE_2D,lt,0,0,Bt,Kt,Ot):n.texImage2D(r.TEXTURE_2D,lt,jt,Bt,Kt,Ot);w.generateMipmaps=!1}else if(ce){if(Ve){const lt=Zt(At);n.texStorage2D(r.TEXTURE_2D,wt,jt,lt.width,lt.height)}X&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Kt,At)}else n.texImage2D(r.TEXTURE_2D,0,jt,Bt,Kt,At);E(w)&&_(dt),qt.__version=gt.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function ct(N,w,nt){if(w.image.length!==6)return;const dt=St(N,w),yt=w.source;n.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+nt);const gt=s.get(yt);if(yt.version!==gt.__version||dt===!0){n.activeTexture(r.TEXTURE0+nt);const qt=Re.getPrimaries(Re.workingColorSpace),Lt=w.colorSpace===os?null:Re.getPrimaries(w.colorSpace),zt=w.colorSpace===os||qt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const Se=w.isCompressedTexture||w.image[0].isCompressedTexture,At=w.image[0]&&w.image[0].isDataTexture,Bt=[];for(let xt=0;xt<6;xt++)!Se&&!At?Bt[xt]=T(w.image[xt],!0,l.maxCubemapSize):Bt[xt]=At?w.image[xt].image:w.image[xt],Bt[xt]=ze(w,Bt[xt]);const Kt=Bt[0],jt=c.convert(w.format,w.colorSpace),Ot=c.convert(w.type),ie=L(w.internalFormat,jt,Ot,w.colorSpace),ce=w.isVideoTexture!==!0,Ve=gt.__version===void 0||dt===!0,X=yt.dataReady;let wt=k(w,Kt);it(r.TEXTURE_CUBE_MAP,w);let lt;if(Se){ce&&Ve&&n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,Kt.width,Kt.height);for(let xt=0;xt<6;xt++){lt=Bt[xt].mipmaps;for(let Rt=0;Rt<lt.length;Rt++){const Ut=lt[Rt];w.format!==Gi?jt!==null?ce?X&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,0,0,Ut.width,Ut.height,jt,Ut.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,ie,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ce?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,0,0,Ut.width,Ut.height,jt,Ot,Ut.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,ie,Ut.width,Ut.height,0,jt,Ot,Ut.data)}}}else{if(lt=w.mipmaps,ce&&Ve){lt.length>0&&wt++;const xt=Zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(At){ce?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Bt[xt].width,Bt[xt].height,jt,Ot,Bt[xt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ie,Bt[xt].width,Bt[xt].height,0,jt,Ot,Bt[xt].data);for(let Rt=0;Rt<lt.length;Rt++){const ae=lt[Rt].image[xt].image;ce?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,0,0,ae.width,ae.height,jt,Ot,ae.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,ie,ae.width,ae.height,0,jt,Ot,ae.data)}}else{ce?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,jt,Ot,Bt[xt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ie,jt,Ot,Bt[xt]);for(let Rt=0;Rt<lt.length;Rt++){const Ut=lt[Rt];ce?X&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,0,0,jt,Ot,Ut.image[xt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,ie,jt,Ot,Ut.image[xt])}}}E(w)&&_(r.TEXTURE_CUBE_MAP),gt.__version=yt.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function Et(N,w,nt,dt,yt,gt){const qt=c.convert(nt.format,nt.colorSpace),Lt=c.convert(nt.type),zt=L(nt.internalFormat,qt,Lt,nt.colorSpace),Se=s.get(w),At=s.get(nt);if(At.__renderTarget=w,!Se.__hasExternalTextures){const Bt=Math.max(1,w.width>>gt),Kt=Math.max(1,w.height>>gt);yt===r.TEXTURE_3D||yt===r.TEXTURE_2D_ARRAY?n.texImage3D(yt,gt,zt,Bt,Kt,w.depth,0,qt,Lt,null):n.texImage2D(yt,gt,zt,Bt,Kt,0,qt,Lt,null)}n.bindFramebuffer(r.FRAMEBUFFER,N),_e(w)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,yt,At.__webglTexture,0,me(w)):(yt===r.TEXTURE_2D||yt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&yt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,dt,yt,At.__webglTexture,gt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function _t(N,w,nt){if(r.bindRenderbuffer(r.RENDERBUFFER,N),w.depthBuffer){const dt=w.depthTexture,yt=dt&&dt.isDepthTexture?dt.type:null,gt=A(w.stencilBuffer,yt),qt=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=me(w);_e(w)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt,gt,w.width,w.height):nt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,gt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,gt,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,qt,r.RENDERBUFFER,N)}else{const dt=w.textures;for(let yt=0;yt<dt.length;yt++){const gt=dt[yt],qt=c.convert(gt.format,gt.colorSpace),Lt=c.convert(gt.type),zt=L(gt.internalFormat,qt,Lt,gt.colorSpace),Se=me(w);nt&&_e(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Se,zt,w.width,w.height):_e(w)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Se,zt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,zt,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Gt(N,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,N),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=s.get(w.depthTexture);dt.__renderTarget=w,(!dt.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),mt(w.depthTexture,0);const yt=dt.__webglTexture,gt=me(w);if(w.depthTexture.format===Wr)_e(w)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,yt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,yt,0);else if(w.depthTexture.format===Qr)_e(w)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,yt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,yt,0);else throw new Error("Unknown depthTexture format")}function Ht(N){const w=s.get(N),nt=N.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==N.depthTexture){const dt=N.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),dt){const yt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,dt.removeEventListener("dispose",yt)};dt.addEventListener("dispose",yt),w.__depthDisposeCallback=yt}w.__boundDepthTexture=dt}if(N.depthTexture&&!w.__autoAllocateDepthBuffer){if(nt)throw new Error("target.depthTexture not supported in Cube render targets");Gt(w.__webglFramebuffer,N)}else if(nt){w.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(n.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[dt]),w.__webglDepthbuffer[dt]===void 0)w.__webglDepthbuffer[dt]=r.createRenderbuffer(),_t(w.__webglDepthbuffer[dt],N,!1);else{const yt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=w.__webglDepthbuffer[dt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,yt,r.RENDERBUFFER,gt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),_t(w.__webglDepthbuffer,N,!1);else{const dt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,yt=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,yt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,yt)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function oe(N,w,nt){const dt=s.get(N);w!==void 0&&Et(dt.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),nt!==void 0&&Ht(N)}function Ge(N){const w=N.texture,nt=s.get(N),dt=s.get(w);N.addEventListener("dispose",O);const yt=N.textures,gt=N.isWebGLCubeRenderTarget===!0,qt=yt.length>1;if(qt||(dt.__webglTexture===void 0&&(dt.__webglTexture=r.createTexture()),dt.__version=w.version,f.memory.textures++),gt){nt.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(w.mipmaps&&w.mipmaps.length>0){nt.__webglFramebuffer[Lt]=[];for(let zt=0;zt<w.mipmaps.length;zt++)nt.__webglFramebuffer[Lt][zt]=r.createFramebuffer()}else nt.__webglFramebuffer[Lt]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){nt.__webglFramebuffer=[];for(let Lt=0;Lt<w.mipmaps.length;Lt++)nt.__webglFramebuffer[Lt]=r.createFramebuffer()}else nt.__webglFramebuffer=r.createFramebuffer();if(qt)for(let Lt=0,zt=yt.length;Lt<zt;Lt++){const Se=s.get(yt[Lt]);Se.__webglTexture===void 0&&(Se.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&_e(N)===!1){nt.__webglMultisampledFramebuffer=r.createFramebuffer(),nt.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,nt.__webglMultisampledFramebuffer);for(let Lt=0;Lt<yt.length;Lt++){const zt=yt[Lt];nt.__webglColorRenderbuffer[Lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,nt.__webglColorRenderbuffer[Lt]);const Se=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=L(zt.internalFormat,Se,At,zt.colorSpace,N.isXRRenderTarget===!0),Kt=me(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,Bt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Lt,r.RENDERBUFFER,nt.__webglColorRenderbuffer[Lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(nt.__webglDepthRenderbuffer=r.createRenderbuffer(),_t(nt.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){n.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),it(r.TEXTURE_CUBE_MAP,w);for(let Lt=0;Lt<6;Lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let zt=0;zt<w.mipmaps.length;zt++)Et(nt.__webglFramebuffer[Lt][zt],N,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,zt);else Et(nt.__webglFramebuffer[Lt],N,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);E(w)&&_(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(qt){for(let Lt=0,zt=yt.length;Lt<zt;Lt++){const Se=yt[Lt],At=s.get(Se);n.bindTexture(r.TEXTURE_2D,At.__webglTexture),it(r.TEXTURE_2D,Se),Et(nt.__webglFramebuffer,N,Se,r.COLOR_ATTACHMENT0+Lt,r.TEXTURE_2D,0),E(Se)&&_(r.TEXTURE_2D)}n.unbindTexture()}else{let Lt=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Lt=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Lt,dt.__webglTexture),it(Lt,w),w.mipmaps&&w.mipmaps.length>0)for(let zt=0;zt<w.mipmaps.length;zt++)Et(nt.__webglFramebuffer[zt],N,w,r.COLOR_ATTACHMENT0,Lt,zt);else Et(nt.__webglFramebuffer,N,w,r.COLOR_ATTACHMENT0,Lt,0);E(w)&&_(Lt),n.unbindTexture()}N.depthBuffer&&Ht(N)}function ge(N){const w=N.textures;for(let nt=0,dt=w.length;nt<dt;nt++){const yt=w[nt];if(E(yt)){const gt=U(N),qt=s.get(yt).__webglTexture;n.bindTexture(gt,qt),_(gt),n.unbindTexture()}}}const $e=[],j=[];function Bn(N){if(N.samples>0){if(_e(N)===!1){const w=N.textures,nt=N.width,dt=N.height;let yt=r.COLOR_BUFFER_BIT;const gt=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,qt=s.get(N),Lt=w.length>1;if(Lt)for(let zt=0;zt<w.length;zt++)n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,qt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,qt.__webglFramebuffer);for(let zt=0;zt<w.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(yt|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(yt|=r.STENCIL_BUFFER_BIT)),Lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,qt.__webglColorRenderbuffer[zt]);const Se=s.get(w[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Se,0)}r.blitFramebuffer(0,0,nt,dt,0,0,nt,dt,yt,r.NEAREST),m===!0&&($e.length=0,j.length=0,$e.push(r.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&($e.push(gt),j.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,j)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,$e))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Lt)for(let zt=0;zt<w.length;zt++){n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,qt.__webglColorRenderbuffer[zt]);const Se=s.get(w[zt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,Se,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,qt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&m){const w=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function me(N){return Math.min(l.maxSamples,N.samples)}function _e(N){const w=s.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Qt(N){const w=f.render.frame;v.get(N)!==w&&(v.set(N,w),N.update())}function ze(N,w){const nt=N.colorSpace,dt=N.format,yt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||nt!==to&&nt!==os&&(Re.getTransfer(nt)===He?(dt!==Gi||yt!==Ca)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",nt)),w}function Zt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=st,this.resetTextureUnits=et,this.setTexture2D=mt,this.setTexture2DArray=B,this.setTexture3D=Q,this.setTextureCube=K,this.rebindTextures=oe,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=Bn,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=_e}function u2(r,t){function n(s,l=os){let c;const f=Re.getTransfer(l);if(s===Ca)return r.UNSIGNED_BYTE;if(s===gp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===vp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===f_)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===c_)return r.BYTE;if(s===u_)return r.SHORT;if(s===ol)return r.UNSIGNED_SHORT;if(s===mp)return r.INT;if(s===ks)return r.UNSIGNED_INT;if(s===ba)return r.FLOAT;if(s===Vi)return r.HALF_FLOAT;if(s===h_)return r.ALPHA;if(s===d_)return r.RGB;if(s===Gi)return r.RGBA;if(s===p_)return r.LUMINANCE;if(s===m_)return r.LUMINANCE_ALPHA;if(s===Wr)return r.DEPTH_COMPONENT;if(s===Qr)return r.DEPTH_STENCIL;if(s===g_)return r.RED;if(s===xp)return r.RED_INTEGER;if(s===v_)return r.RG;if(s===_p)return r.RG_INTEGER;if(s===Sp)return r.RGBA_INTEGER;if(s===au||s===su||s===ru||s===ou)if(f===He)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===au)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===su)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ru)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ou)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===au)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===su)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ru)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ou)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===zd||s===Bd||s===Id||s===Fd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===zd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Bd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Id)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Fd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Hd||s===Gd||s===Vd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Hd||s===Gd)return f===He?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Vd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===kd||s===Xd||s===Wd||s===qd||s===jd||s===Yd||s===Zd||s===Kd||s===Qd||s===Jd||s===$d||s===tp||s===ep||s===np)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===kd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Xd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Wd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===jd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Yd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Zd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Kd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Qd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Jd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===$d)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===tp)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ep)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===np)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===lu||s===ip||s===ap)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===lu)return f===He?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ip)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ap)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===x_||s===sp||s===rp||s===op)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===lu)return c.COMPRESSED_RED_RGTC1_EXT;if(s===sp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===rp)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===op)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Kr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:n}}class f2 extends di{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vs extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const h2={type:"move"};class pd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const s of t.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,s){let l=null,c=null,f=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const T of t.hand.values()){const E=n.getJointPose(T,s),_=this._getHandJoint(p,T);E!==null&&(_.matrix.fromArray(E.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=E.radius),_.visible=E!==null}const v=p.joints["index-finger-tip"],g=p.joints["thumb-tip"],x=v.position.distanceTo(g.position),S=.02,y=.005;p.inputState.pinching&&x>S+y?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&x<=S-y&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=n.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(h2)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const s=new Vs;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[n.jointName]=s,t.add(s)}return t.joints[n.jointName]}}const d2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,p2=`
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

}`;class m2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,s){if(this.texture===null){const l=new kn,c=t.properties.get(l);c.__webglTexture=n.texture,(n.depthNear!=s.depthNear||n.depthFar!=s.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,s=new An({vertexShader:d2,fragmentShader:p2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new $t(new Su(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class g2 extends eo{constructor(t,n){super();const s=this;let l=null,c=1,f=null,d="local-floor",m=1,p=null,v=null,g=null,x=null,S=null,y=null;const T=new m2,E=n.getContextAttributes();let _=null,U=null;const L=[],A=[],k=new ne;let z=null;const O=new di;O.viewport=new je;const F=new di;F.viewport=new je;const D=[O,F],R=new f2;let H=null,et=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ct=L[Z];return ct===void 0&&(ct=new pd,L[Z]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(Z){let ct=L[Z];return ct===void 0&&(ct=new pd,L[Z]=ct),ct.getGripSpace()},this.getHand=function(Z){let ct=L[Z];return ct===void 0&&(ct=new pd,L[Z]=ct),ct.getHandSpace()};function st(Z){const ct=A.indexOf(Z.inputSource);if(ct===-1)return;const Et=L[ct];Et!==void 0&&(Et.update(Z.inputSource,Z.frame,p||f),Et.dispatchEvent({type:Z.type,data:Z.inputSource}))}function ht(){l.removeEventListener("select",st),l.removeEventListener("selectstart",st),l.removeEventListener("selectend",st),l.removeEventListener("squeeze",st),l.removeEventListener("squeezestart",st),l.removeEventListener("squeezeend",st),l.removeEventListener("end",ht),l.removeEventListener("inputsourceschange",mt);for(let Z=0;Z<L.length;Z++){const ct=A[Z];ct!==null&&(A[Z]=null,L[Z].disconnect(ct))}H=null,et=null,T.reset(),t.setRenderTarget(_),S=null,x=null,g=null,l=null,U=null,St.stop(),s.isPresenting=!1,t.setPixelRatio(z),t.setSize(k.width,k.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(Z){p=Z},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return g},this.getFrame=function(){return y},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(_=t.getRenderTarget(),l.addEventListener("select",st),l.addEventListener("selectstart",st),l.addEventListener("selectend",st),l.addEventListener("squeeze",st),l.addEventListener("squeezestart",st),l.addEventListener("squeezeend",st),l.addEventListener("end",ht),l.addEventListener("inputsourceschange",mt),E.xrCompatible!==!0&&await n.makeXRCompatible(),z=t.getPixelRatio(),t.getSize(k),l.renderState.layers===void 0){const ct={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,n,ct),l.updateRenderState({baseLayer:S}),t.setPixelRatio(1),t.setSize(S.framebufferWidth,S.framebufferHeight,!1),U=new mi(S.framebufferWidth,S.framebufferHeight,{format:Gi,type:Ca,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil})}else{let ct=null,Et=null,_t=null;E.depth&&(_t=E.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ct=E.stencil?Qr:Wr,Et=E.stencil?Kr:ks);const Gt={colorFormat:n.RGBA8,depthFormat:_t,scaleFactor:c};g=new XRWebGLBinding(l,n),x=g.createProjectionLayer(Gt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),U=new mi(x.textureWidth,x.textureHeight,{format:Gi,type:Ca,depthTexture:new U_(x.textureWidth,x.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(d),St.setContext(l),St.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function mt(Z){for(let ct=0;ct<Z.removed.length;ct++){const Et=Z.removed[ct],_t=A.indexOf(Et);_t>=0&&(A[_t]=null,L[_t].disconnect(Et))}for(let ct=0;ct<Z.added.length;ct++){const Et=Z.added[ct];let _t=A.indexOf(Et);if(_t===-1){for(let Ht=0;Ht<L.length;Ht++)if(Ht>=A.length){A.push(Et),_t=Ht;break}else if(A[Ht]===null){A[Ht]=Et,_t=Ht;break}if(_t===-1)break}const Gt=L[_t];Gt&&Gt.connect(Et)}}const B=new V,Q=new V;function K(Z,ct,Et){B.setFromMatrixPosition(ct.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const _t=B.distanceTo(Q),Gt=ct.projectionMatrix.elements,Ht=Et.projectionMatrix.elements,oe=Gt[14]/(Gt[10]-1),Ge=Gt[14]/(Gt[10]+1),ge=(Gt[9]+1)/Gt[5],$e=(Gt[9]-1)/Gt[5],j=(Gt[8]-1)/Gt[0],Bn=(Ht[8]+1)/Ht[0],me=oe*j,_e=oe*Bn,Qt=_t/(-j+Bn),ze=Qt*-j;if(ct.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ze),Z.translateZ(Qt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Gt[10]===-1)Z.projectionMatrix.copy(ct.projectionMatrix),Z.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{const Zt=oe+Qt,N=Ge+Qt,w=me-ze,nt=_e+(_t-ze),dt=ge*Ge/N*Zt,yt=$e*Ge/N*Zt;Z.projectionMatrix.makePerspective(w,nt,dt,yt,Zt,N),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Mt(Z,ct){ct===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ct.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let ct=Z.near,Et=Z.far;T.texture!==null&&(T.depthNear>0&&(ct=T.depthNear),T.depthFar>0&&(Et=T.depthFar)),R.near=F.near=O.near=ct,R.far=F.far=O.far=Et,(H!==R.near||et!==R.far)&&(l.updateRenderState({depthNear:R.near,depthFar:R.far}),H=R.near,et=R.far),O.layers.mask=Z.layers.mask|2,F.layers.mask=Z.layers.mask|4,R.layers.mask=O.layers.mask|F.layers.mask;const _t=Z.parent,Gt=R.cameras;Mt(R,_t);for(let Ht=0;Ht<Gt.length;Ht++)Mt(Gt[Ht],_t);Gt.length===2?K(R,O,F):R.projectionMatrix.copy(O.projectionMatrix),Tt(Z,R,_t)};function Tt(Z,ct,Et){Et===null?Z.matrix.copy(ct.matrixWorld):(Z.matrix.copy(Et.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ct.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ct.projectionMatrix),Z.projectionMatrixInverse.copy(ct.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=lp*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&S===null))return m},this.setFoveation=function(Z){m=Z,x!==null&&(x.fixedFoveation=Z),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Z)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(R)};let P=null;function it(Z,ct){if(v=ct.getViewerPose(p||f),y=ct,v!==null){const Et=v.views;S!==null&&(t.setRenderTargetFramebuffer(U,S.framebuffer),t.setRenderTarget(U));let _t=!1;Et.length!==R.cameras.length&&(R.cameras.length=0,_t=!0);for(let Ht=0;Ht<Et.length;Ht++){const oe=Et[Ht];let Ge=null;if(S!==null)Ge=S.getViewport(oe);else{const $e=g.getViewSubImage(x,oe);Ge=$e.viewport,Ht===0&&(t.setRenderTargetTextures(U,$e.colorTexture,x.ignoreDepthValues?void 0:$e.depthStencilTexture),t.setRenderTarget(U))}let ge=D[Ht];ge===void 0&&(ge=new di,ge.layers.enable(Ht),ge.viewport=new je,D[Ht]=ge),ge.matrix.fromArray(oe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(oe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),Ht===0&&(R.matrix.copy(ge.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),_t===!0&&R.cameras.push(ge)}const Gt=l.enabledFeatures;if(Gt&&Gt.includes("depth-sensing")){const Ht=g.getDepthInformation(Et[0]);Ht&&Ht.isValid&&Ht.texture&&T.init(t,Ht,l.renderState)}}for(let Et=0;Et<L.length;Et++){const _t=A[Et],Gt=L[Et];_t!==null&&Gt!==void 0&&Gt.update(_t,ct,p||f)}P&&P(Z,ct),ct.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ct}),y=null}const St=new L_;St.setAnimationLoop(it),this.setAnimationLoop=function(Z){P=Z},this.dispose=function(){}}}const Os=new Qi,v2=new Je;function x2(r,t){function n(E,_){E.matrixAutoUpdate===!0&&E.updateMatrix(),_.value.copy(E.matrix)}function s(E,_){_.color.getRGB(E.fogColor.value,R_(r)),_.isFog?(E.fogNear.value=_.near,E.fogFar.value=_.far):_.isFogExp2&&(E.fogDensity.value=_.density)}function l(E,_,U,L,A){_.isMeshBasicMaterial||_.isMeshLambertMaterial?c(E,_):_.isMeshToonMaterial?(c(E,_),g(E,_)):_.isMeshPhongMaterial?(c(E,_),v(E,_)):_.isMeshStandardMaterial?(c(E,_),x(E,_),_.isMeshPhysicalMaterial&&S(E,_,A)):_.isMeshMatcapMaterial?(c(E,_),y(E,_)):_.isMeshDepthMaterial?c(E,_):_.isMeshDistanceMaterial?(c(E,_),T(E,_)):_.isMeshNormalMaterial?c(E,_):_.isLineBasicMaterial?(f(E,_),_.isLineDashedMaterial&&d(E,_)):_.isPointsMaterial?m(E,_,U,L):_.isSpriteMaterial?p(E,_):_.isShadowMaterial?(E.color.value.copy(_.color),E.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function c(E,_){E.opacity.value=_.opacity,_.color&&E.diffuse.value.copy(_.color),_.emissive&&E.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(E.map.value=_.map,n(_.map,E.mapTransform)),_.alphaMap&&(E.alphaMap.value=_.alphaMap,n(_.alphaMap,E.alphaMapTransform)),_.bumpMap&&(E.bumpMap.value=_.bumpMap,n(_.bumpMap,E.bumpMapTransform),E.bumpScale.value=_.bumpScale,_.side===ni&&(E.bumpScale.value*=-1)),_.normalMap&&(E.normalMap.value=_.normalMap,n(_.normalMap,E.normalMapTransform),E.normalScale.value.copy(_.normalScale),_.side===ni&&E.normalScale.value.negate()),_.displacementMap&&(E.displacementMap.value=_.displacementMap,n(_.displacementMap,E.displacementMapTransform),E.displacementScale.value=_.displacementScale,E.displacementBias.value=_.displacementBias),_.emissiveMap&&(E.emissiveMap.value=_.emissiveMap,n(_.emissiveMap,E.emissiveMapTransform)),_.specularMap&&(E.specularMap.value=_.specularMap,n(_.specularMap,E.specularMapTransform)),_.alphaTest>0&&(E.alphaTest.value=_.alphaTest);const U=t.get(_),L=U.envMap,A=U.envMapRotation;L&&(E.envMap.value=L,Os.copy(A),Os.x*=-1,Os.y*=-1,Os.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Os.y*=-1,Os.z*=-1),E.envMapRotation.value.setFromMatrix4(v2.makeRotationFromEuler(Os)),E.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,E.reflectivity.value=_.reflectivity,E.ior.value=_.ior,E.refractionRatio.value=_.refractionRatio),_.lightMap&&(E.lightMap.value=_.lightMap,E.lightMapIntensity.value=_.lightMapIntensity,n(_.lightMap,E.lightMapTransform)),_.aoMap&&(E.aoMap.value=_.aoMap,E.aoMapIntensity.value=_.aoMapIntensity,n(_.aoMap,E.aoMapTransform))}function f(E,_){E.diffuse.value.copy(_.color),E.opacity.value=_.opacity,_.map&&(E.map.value=_.map,n(_.map,E.mapTransform))}function d(E,_){E.dashSize.value=_.dashSize,E.totalSize.value=_.dashSize+_.gapSize,E.scale.value=_.scale}function m(E,_,U,L){E.diffuse.value.copy(_.color),E.opacity.value=_.opacity,E.size.value=_.size*U,E.scale.value=L*.5,_.map&&(E.map.value=_.map,n(_.map,E.uvTransform)),_.alphaMap&&(E.alphaMap.value=_.alphaMap,n(_.alphaMap,E.alphaMapTransform)),_.alphaTest>0&&(E.alphaTest.value=_.alphaTest)}function p(E,_){E.diffuse.value.copy(_.color),E.opacity.value=_.opacity,E.rotation.value=_.rotation,_.map&&(E.map.value=_.map,n(_.map,E.mapTransform)),_.alphaMap&&(E.alphaMap.value=_.alphaMap,n(_.alphaMap,E.alphaMapTransform)),_.alphaTest>0&&(E.alphaTest.value=_.alphaTest)}function v(E,_){E.specular.value.copy(_.specular),E.shininess.value=Math.max(_.shininess,1e-4)}function g(E,_){_.gradientMap&&(E.gradientMap.value=_.gradientMap)}function x(E,_){E.metalness.value=_.metalness,_.metalnessMap&&(E.metalnessMap.value=_.metalnessMap,n(_.metalnessMap,E.metalnessMapTransform)),E.roughness.value=_.roughness,_.roughnessMap&&(E.roughnessMap.value=_.roughnessMap,n(_.roughnessMap,E.roughnessMapTransform)),_.envMap&&(E.envMapIntensity.value=_.envMapIntensity)}function S(E,_,U){E.ior.value=_.ior,_.sheen>0&&(E.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),E.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(E.sheenColorMap.value=_.sheenColorMap,n(_.sheenColorMap,E.sheenColorMapTransform)),_.sheenRoughnessMap&&(E.sheenRoughnessMap.value=_.sheenRoughnessMap,n(_.sheenRoughnessMap,E.sheenRoughnessMapTransform))),_.clearcoat>0&&(E.clearcoat.value=_.clearcoat,E.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(E.clearcoatMap.value=_.clearcoatMap,n(_.clearcoatMap,E.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(E.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,n(_.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(E.clearcoatNormalMap.value=_.clearcoatNormalMap,n(_.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===ni&&E.clearcoatNormalScale.value.negate())),_.dispersion>0&&(E.dispersion.value=_.dispersion),_.iridescence>0&&(E.iridescence.value=_.iridescence,E.iridescenceIOR.value=_.iridescenceIOR,E.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(E.iridescenceMap.value=_.iridescenceMap,n(_.iridescenceMap,E.iridescenceMapTransform)),_.iridescenceThicknessMap&&(E.iridescenceThicknessMap.value=_.iridescenceThicknessMap,n(_.iridescenceThicknessMap,E.iridescenceThicknessMapTransform))),_.transmission>0&&(E.transmission.value=_.transmission,E.transmissionSamplerMap.value=U.texture,E.transmissionSamplerSize.value.set(U.width,U.height),_.transmissionMap&&(E.transmissionMap.value=_.transmissionMap,n(_.transmissionMap,E.transmissionMapTransform)),E.thickness.value=_.thickness,_.thicknessMap&&(E.thicknessMap.value=_.thicknessMap,n(_.thicknessMap,E.thicknessMapTransform)),E.attenuationDistance.value=_.attenuationDistance,E.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(E.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(E.anisotropyMap.value=_.anisotropyMap,n(_.anisotropyMap,E.anisotropyMapTransform))),E.specularIntensity.value=_.specularIntensity,E.specularColor.value.copy(_.specularColor),_.specularColorMap&&(E.specularColorMap.value=_.specularColorMap,n(_.specularColorMap,E.specularColorMapTransform)),_.specularIntensityMap&&(E.specularIntensityMap.value=_.specularIntensityMap,n(_.specularIntensityMap,E.specularIntensityMapTransform))}function y(E,_){_.matcap&&(E.matcap.value=_.matcap)}function T(E,_){const U=t.get(_).light;E.referencePosition.value.setFromMatrixPosition(U.matrixWorld),E.nearDistance.value=U.shadow.camera.near,E.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function _2(r,t,n,s){let l={},c={},f=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(U,L){const A=L.program;s.uniformBlockBinding(U,A)}function p(U,L){let A=l[U.id];A===void 0&&(y(U),A=v(U),l[U.id]=A,U.addEventListener("dispose",E));const k=L.program;s.updateUBOMapping(U,k);const z=t.render.frame;c[U.id]!==z&&(x(U),c[U.id]=z)}function v(U){const L=g();U.__bindingPointIndex=L;const A=r.createBuffer(),k=U.__size,z=U.usage;return r.bindBuffer(r.UNIFORM_BUFFER,A),r.bufferData(r.UNIFORM_BUFFER,k,z),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,L,A),A}function g(){for(let U=0;U<d;U++)if(f.indexOf(U)===-1)return f.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(U){const L=l[U.id],A=U.uniforms,k=U.__cache;r.bindBuffer(r.UNIFORM_BUFFER,L);for(let z=0,O=A.length;z<O;z++){const F=Array.isArray(A[z])?A[z]:[A[z]];for(let D=0,R=F.length;D<R;D++){const H=F[D];if(S(H,z,D,k)===!0){const et=H.__offset,st=Array.isArray(H.value)?H.value:[H.value];let ht=0;for(let mt=0;mt<st.length;mt++){const B=st[mt],Q=T(B);typeof B=="number"||typeof B=="boolean"?(H.__data[0]=B,r.bufferSubData(r.UNIFORM_BUFFER,et+ht,H.__data)):B.isMatrix3?(H.__data[0]=B.elements[0],H.__data[1]=B.elements[1],H.__data[2]=B.elements[2],H.__data[3]=0,H.__data[4]=B.elements[3],H.__data[5]=B.elements[4],H.__data[6]=B.elements[5],H.__data[7]=0,H.__data[8]=B.elements[6],H.__data[9]=B.elements[7],H.__data[10]=B.elements[8],H.__data[11]=0):(B.toArray(H.__data,ht),ht+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,et,H.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(U,L,A,k){const z=U.value,O=L+"_"+A;if(k[O]===void 0)return typeof z=="number"||typeof z=="boolean"?k[O]=z:k[O]=z.clone(),!0;{const F=k[O];if(typeof z=="number"||typeof z=="boolean"){if(F!==z)return k[O]=z,!0}else if(F.equals(z)===!1)return F.copy(z),!0}return!1}function y(U){const L=U.uniforms;let A=0;const k=16;for(let O=0,F=L.length;O<F;O++){const D=Array.isArray(L[O])?L[O]:[L[O]];for(let R=0,H=D.length;R<H;R++){const et=D[R],st=Array.isArray(et.value)?et.value:[et.value];for(let ht=0,mt=st.length;ht<mt;ht++){const B=st[ht],Q=T(B),K=A%k,Mt=K%Q.boundary,Tt=K+Mt;A+=Mt,Tt!==0&&k-Tt<Q.storage&&(A+=k-Tt),et.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),et.__offset=A,A+=Q.storage}}}const z=A%k;return z>0&&(A+=k-z),U.__size=A,U.__cache={},this}function T(U){const L={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(L.boundary=4,L.storage=4):U.isVector2?(L.boundary=8,L.storage=8):U.isVector3||U.isColor?(L.boundary=16,L.storage=12):U.isVector4?(L.boundary=16,L.storage=16):U.isMatrix3?(L.boundary=48,L.storage=48):U.isMatrix4?(L.boundary=64,L.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),L}function E(U){const L=U.target;L.removeEventListener("dispose",E);const A=f.indexOf(L.__bindingPointIndex);f.splice(A,1),r.deleteBuffer(l[L.id]),delete l[L.id],delete c[L.id]}function _(){for(const U in l)r.deleteBuffer(l[U]);f=[],l={},c={}}return{bind:m,update:p,dispose:_}}class S2{constructor(t={}){const{canvas:n=c1(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:g=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=f;const y=new Uint32Array(4),T=new Int32Array(4);let E=null,_=null;const U=[],L=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ri,this.toneMapping=ls,this.toneMappingExposure=1;const A=this;let k=!1,z=0,O=0,F=null,D=-1,R=null;const H=new je,et=new je;let st=null;const ht=new te(0);let mt=0,B=n.width,Q=n.height,K=1,Mt=null,Tt=null;const P=new je(0,0,B,Q),it=new je(0,0,B,Q);let St=!1;const Z=new yp;let ct=!1,Et=!1;const _t=new Je,Gt=new Je,Ht=new V,oe=new je,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function $e(){return F===null?K:1}let j=s;function Bn(C,W){return n.getContext(C,W)}try{const C={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:g};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${pp}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",Rt,!1),n.addEventListener("webglcontextcreationerror",Ut,!1),j===null){const W="webgl2";if(j=Bn(W,C),j===null)throw Bn(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let me,_e,Qt,ze,Zt,N,w,nt,dt,yt,gt,qt,Lt,zt,Se,At,Bt,Kt,jt,Ot,ie,ce,Ve,X;function wt(){me=new bb(j),me.init(),ce=new u2(j,me),_e=new _b(j,me,t,ce),Qt=new o2(j,me),_e.reverseDepthBuffer&&x&&Qt.buffers.depth.setReversed(!0),ze=new Rb(j),Zt=new qA,N=new c2(j,me,Qt,Zt,_e,ce,ze),w=new Mb(A),nt=new Tb(A),dt=new P1(j),Ve=new vb(j,dt),yt=new Ab(j,dt,ze,Ve),gt=new Db(j,yt,dt,ze),jt=new Cb(j,_e,N),At=new Sb(Zt),qt=new WA(A,w,nt,me,_e,Ve,At),Lt=new x2(A,Zt),zt=new YA,Se=new t2(me),Kt=new gb(A,w,nt,Qt,gt,S,m),Bt=new s2(A,gt,_e),X=new _2(j,ze,_e,Qt),Ot=new xb(j,me,ze),ie=new wb(j,me,ze),ze.programs=qt.programs,A.capabilities=_e,A.extensions=me,A.properties=Zt,A.renderLists=zt,A.shadowMap=Bt,A.state=Qt,A.info=ze}wt();const lt=new g2(A,j);this.xr=lt,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const C=me.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=me.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(C){C!==void 0&&(K=C,this.setSize(B,Q,!1))},this.getSize=function(C){return C.set(B,Q)},this.setSize=function(C,W,rt=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=C,Q=W,n.width=Math.floor(C*K),n.height=Math.floor(W*K),rt===!0&&(n.style.width=C+"px",n.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(B*K,Q*K).floor()},this.setDrawingBufferSize=function(C,W,rt){B=C,Q=W,K=rt,n.width=Math.floor(C*rt),n.height=Math.floor(W*rt),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(H)},this.getViewport=function(C){return C.copy(P)},this.setViewport=function(C,W,rt,at){C.isVector4?P.set(C.x,C.y,C.z,C.w):P.set(C,W,rt,at),Qt.viewport(H.copy(P).multiplyScalar(K).round())},this.getScissor=function(C){return C.copy(it)},this.setScissor=function(C,W,rt,at){C.isVector4?it.set(C.x,C.y,C.z,C.w):it.set(C,W,rt,at),Qt.scissor(et.copy(it).multiplyScalar(K).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(C){Qt.setScissorTest(St=C)},this.setOpaqueSort=function(C){Mt=C},this.setTransparentSort=function(C){Tt=C},this.getClearColor=function(C){return C.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(C=!0,W=!0,rt=!0){let at=0;if(C){let q=!1;if(F!==null){const bt=F.texture.format;q=bt===Sp||bt===_p||bt===xp}if(q){const bt=F.texture.type,Ct=bt===Ca||bt===ks||bt===ol||bt===Kr||bt===gp||bt===vp,Dt=Kt.getClearColor(),kt=Kt.getClearAlpha(),se=Dt.r,ee=Dt.g,It=Dt.b;Ct?(y[0]=se,y[1]=ee,y[2]=It,y[3]=kt,j.clearBufferuiv(j.COLOR,0,y)):(T[0]=se,T[1]=ee,T[2]=It,T[3]=kt,j.clearBufferiv(j.COLOR,0,T))}else at|=j.COLOR_BUFFER_BIT}W&&(at|=j.DEPTH_BUFFER_BIT),rt&&(at|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(at)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",Rt,!1),n.removeEventListener("webglcontextcreationerror",Ut,!1),zt.dispose(),Se.dispose(),Zt.dispose(),w.dispose(),nt.dispose(),gt.dispose(),Ve.dispose(),X.dispose(),qt.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",io),lt.removeEventListener("sessionend",ao),ki.stop()};function xt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const C=ze.autoReset,W=Bt.enabled,rt=Bt.autoUpdate,at=Bt.needsUpdate,q=Bt.type;wt(),ze.autoReset=C,Bt.enabled=W,Bt.autoUpdate=rt,Bt.needsUpdate=at,Bt.type=q}function Ut(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ae(C){const W=C.target;W.removeEventListener("dispose",ae),tn(W)}function tn(C){vn(C),Zt.remove(C)}function vn(C){const W=Zt.get(C).programs;W!==void 0&&(W.forEach(function(rt){qt.releaseProgram(rt)}),C.isShaderMaterial&&qt.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,rt,at,q,bt){W===null&&(W=Ge);const Ct=q.isMesh&&q.matrixWorld.determinant()<0,Dt=ro(C,W,rt,at,q);Qt.setMaterial(at,Ct);let kt=rt.index,se=1;if(at.wireframe===!0){if(kt=yt.getWireframeAttribute(rt),kt===void 0)return;se=2}const ee=rt.drawRange,It=rt.attributes.position;let we=ee.start*se,Be=(ee.start+ee.count)*se;bt!==null&&(we=Math.max(we,bt.start*se),Be=Math.min(Be,(bt.start+bt.count)*se)),kt!==null?(we=Math.max(we,0),Be=Math.min(Be,kt.count)):It!=null&&(we=Math.max(we,0),Be=Math.min(Be,It.count));const ke=Be-we;if(ke<0||ke===1/0)return;Ve.setup(q,at,Dt,rt,kt);let In,Te=Ot;if(kt!==null&&(In=dt.get(kt),Te=ie,Te.setIndex(In)),q.isMesh)at.wireframe===!0?(Qt.setLineWidth(at.wireframeLinewidth*$e()),Te.setMode(j.LINES)):Te.setMode(j.TRIANGLES);else if(q.isLine){let Xt=at.linewidth;Xt===void 0&&(Xt=1),Qt.setLineWidth(Xt*$e()),q.isLineSegments?Te.setMode(j.LINES):q.isLineLoop?Te.setMode(j.LINE_LOOP):Te.setMode(j.LINE_STRIP)}else q.isPoints?Te.setMode(j.POINTS):q.isSprite&&Te.setMode(j.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Te.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(me.get("WEBGL_multi_draw"))Te.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Xt=q._multiDrawStarts,xn=q._multiDrawCounts,le=q._multiDrawCount,jn=kt?dt.get(kt).bytesPerElement:1,Da=Zt.get(at).currentProgram.getUniforms();for(let Ln=0;Ln<le;Ln++)Da.setValue(j,"_gl_DrawID",Ln),Te.render(Xt[Ln]/jn,xn[Ln])}else if(q.isInstancedMesh)Te.renderInstances(we,ke,q.count);else if(rt.isInstancedBufferGeometry){const Xt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,xn=Math.min(rt.instanceCount,Xt);Te.renderInstances(we,ke,xn)}else Te.render(we,ke)};function Ce(C,W,rt){C.transparent===!0&&C.side===Ta&&C.forceSinglePass===!1?(C.side=ni,C.needsUpdate=!0,rn(C,W,rt),C.side=us,C.needsUpdate=!0,rn(C,W,rt),C.side=Ta):rn(C,W,rt)}this.compile=function(C,W,rt=null){rt===null&&(rt=C),_=Se.get(rt),_.init(W),L.push(_),rt.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),C!==rt&&C.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),_.setupLights();const at=new Set;return C.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const bt=q.material;if(bt)if(Array.isArray(bt))for(let Ct=0;Ct<bt.length;Ct++){const Dt=bt[Ct];Ce(Dt,rt,q),at.add(Dt)}else Ce(bt,rt,q),at.add(bt)}),L.pop(),_=null,at},this.compileAsync=function(C,W,rt=null){const at=this.compile(C,W,rt);return new Promise(q=>{function bt(){if(at.forEach(function(Ct){Zt.get(Ct).currentProgram.isReady()&&at.delete(Ct)}),at.size===0){q(C);return}setTimeout(bt,10)}me.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let Cn=null;function Li(C){Cn&&Cn(C)}function io(){ki.stop()}function ao(){ki.start()}const ki=new L_;ki.setAnimationLoop(Li),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(C){Cn=C,lt.setAnimationLoop(C),C===null?ki.stop():ki.start()},lt.addEventListener("sessionstart",io),lt.addEventListener("sessionend",ao),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(W),W=lt.getCamera()),C.isScene===!0&&C.onBeforeRender(A,C,W,F),_=Se.get(C,L.length),_.init(W),L.push(_),Gt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Z.setFromProjectionMatrix(Gt),Et=this.localClippingEnabled,ct=At.init(this.clippingPlanes,Et),E=zt.get(C,U.length),E.init(),U.push(E),lt.enabled===!0&&lt.isPresenting===!0){const bt=A.xr.getDepthSensingMesh();bt!==null&&fs(bt,W,-1/0,A.sortObjects)}fs(C,W,0,A.sortObjects),E.finish(),A.sortObjects===!0&&E.sort(Mt,Tt),ge=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,ge&&Kt.addToRenderList(E,C),this.info.render.frame++,ct===!0&&At.beginShadows();const rt=_.state.shadowsArray;Bt.render(rt,C,W),ct===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const at=E.opaque,q=E.transmissive;if(_.setupLights(),W.isArrayCamera){const bt=W.cameras;if(q.length>0)for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];so(at,q,C,kt)}ge&&Kt.render(C);for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];qs(E,C,kt,kt.viewport)}}else q.length>0&&so(at,q,C,W),ge&&Kt.render(C),qs(E,C,W);F!==null&&(N.updateMultisampleRenderTarget(F),N.updateRenderTargetMipmap(F)),C.isScene===!0&&C.onAfterRender(A,C,W),Ve.resetDefaultState(),D=-1,R=null,L.pop(),L.length>0?(_=L[L.length-1],ct===!0&&At.setGlobalState(A.clippingPlanes,_.state.camera)):_=null,U.pop(),U.length>0?E=U[U.length-1]:E=null};function fs(C,W,rt,at){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)rt=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)_.pushLight(C),C.castShadow&&_.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Z.intersectsSprite(C)){at&&oe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Gt);const Ct=gt.update(C),Dt=C.material;Dt.visible&&E.push(C,Ct,Dt,rt,oe.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Z.intersectsObject(C))){const Ct=gt.update(C),Dt=C.material;if(at&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),oe.copy(C.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),oe.copy(Ct.boundingSphere.center)),oe.applyMatrix4(C.matrixWorld).applyMatrix4(Gt)),Array.isArray(Dt)){const kt=Ct.groups;for(let se=0,ee=kt.length;se<ee;se++){const It=kt[se],we=Dt[It.materialIndex];we&&we.visible&&E.push(C,Ct,we,rt,oe.z,It)}}else Dt.visible&&E.push(C,Ct,Dt,rt,oe.z,null)}}const bt=C.children;for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++)fs(bt[Ct],W,rt,at)}function qs(C,W,rt,at){const q=C.opaque,bt=C.transmissive,Ct=C.transparent;_.setupLightsView(rt),ct===!0&&At.setGlobalState(A.clippingPlanes,rt),at&&Qt.viewport(H.copy(at)),q.length>0&&hs(q,W,rt),bt.length>0&&hs(bt,W,rt),Ct.length>0&&hs(Ct,W,rt),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function so(C,W,rt,at){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[at.id]===void 0&&(_.state.transmissionRenderTarget[at.id]=new mi(1,1,{generateMipmaps:!0,type:me.has("EXT_color_buffer_half_float")||me.has("EXT_color_buffer_float")?Vi:Ca,minFilter:Gs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Re.workingColorSpace}));const bt=_.state.transmissionRenderTarget[at.id],Ct=at.viewport||H;bt.setSize(Ct.z,Ct.w);const Dt=A.getRenderTarget();A.setRenderTarget(bt),A.getClearColor(ht),mt=A.getClearAlpha(),mt<1&&A.setClearColor(16777215,.5),A.clear(),ge&&Kt.render(rt);const kt=A.toneMapping;A.toneMapping=ls;const se=at.viewport;if(at.viewport!==void 0&&(at.viewport=void 0),_.setupLightsView(at),ct===!0&&At.setGlobalState(A.clippingPlanes,at),hs(C,rt,at),N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt),me.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let It=0,we=W.length;It<we;It++){const Be=W[It],ke=Be.object,In=Be.geometry,Te=Be.material,Xt=Be.group;if(Te.side===Ta&&ke.layers.test(at.layers)){const xn=Te.side;Te.side=ni,Te.needsUpdate=!0,Ui(ke,rt,at,In,Te,Xt),Te.side=xn,Te.needsUpdate=!0,ee=!0}}ee===!0&&(N.updateMultisampleRenderTarget(bt),N.updateRenderTargetMipmap(bt))}A.setRenderTarget(Dt),A.setClearColor(ht,mt),se!==void 0&&(at.viewport=se),A.toneMapping=kt}function hs(C,W,rt){const at=W.isScene===!0?W.overrideMaterial:null;for(let q=0,bt=C.length;q<bt;q++){const Ct=C[q],Dt=Ct.object,kt=Ct.geometry,se=at===null?Ct.material:at,ee=Ct.group;Dt.layers.test(rt.layers)&&Ui(Dt,W,rt,kt,se,ee)}}function Ui(C,W,rt,at,q,bt){C.onBeforeRender(A,W,rt,at,q,bt),C.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),q.onBeforeRender(A,W,rt,at,C,bt),q.transparent===!0&&q.side===Ta&&q.forceSinglePass===!1?(q.side=ni,q.needsUpdate=!0,A.renderBufferDirect(rt,W,at,q,C,bt),q.side=us,q.needsUpdate=!0,A.renderBufferDirect(rt,W,at,q,C,bt),q.side=Ta):A.renderBufferDirect(rt,W,at,q,C,bt),C.onAfterRender(A,W,rt,at,q,bt)}function rn(C,W,rt){W.isScene!==!0&&(W=Ge);const at=Zt.get(C),q=_.state.lights,bt=_.state.shadowsArray,Ct=q.state.version,Dt=qt.getParameters(C,q.state,bt,W,rt),kt=qt.getProgramCacheKey(Dt);let se=at.programs;at.environment=C.isMeshStandardMaterial?W.environment:null,at.fog=W.fog,at.envMap=(C.isMeshStandardMaterial?nt:w).get(C.envMap||at.environment),at.envMapRotation=at.environment!==null&&C.envMap===null?W.environmentRotation:C.envMapRotation,se===void 0&&(C.addEventListener("dispose",ae),se=new Map,at.programs=se);let ee=se.get(kt);if(ee!==void 0){if(at.currentProgram===ee&&at.lightsStateVersion===Ct)return Ji(C,Dt),ee}else Dt.uniforms=qt.getUniforms(C),C.onBeforeCompile(Dt,A),ee=qt.acquireProgram(Dt,kt),se.set(kt,ee),at.uniforms=Dt.uniforms;const It=at.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(It.clippingPlanes=At.uniform),Ji(C,Dt),at.needsLights=Tu(C),at.lightsStateVersion=Ct,at.needsLights&&(It.ambientLightColor.value=q.state.ambient,It.lightProbe.value=q.state.probe,It.directionalLights.value=q.state.directional,It.directionalLightShadows.value=q.state.directionalShadow,It.spotLights.value=q.state.spot,It.spotLightShadows.value=q.state.spotShadow,It.rectAreaLights.value=q.state.rectArea,It.ltc_1.value=q.state.rectAreaLTC1,It.ltc_2.value=q.state.rectAreaLTC2,It.pointLights.value=q.state.point,It.pointLightShadows.value=q.state.pointShadow,It.hemisphereLights.value=q.state.hemi,It.directionalShadowMap.value=q.state.directionalShadowMap,It.directionalShadowMatrix.value=q.state.directionalShadowMatrix,It.spotShadowMap.value=q.state.spotShadowMap,It.spotLightMatrix.value=q.state.spotLightMatrix,It.spotLightMap.value=q.state.spotLightMap,It.pointShadowMap.value=q.state.pointShadowMap,It.pointShadowMatrix.value=q.state.pointShadowMatrix),at.currentProgram=ee,at.uniformsList=null,ee}function Dn(C){if(C.uniformsList===null){const W=C.currentProgram.getUniforms();C.uniformsList=uu.seqWithValue(W.seq,C.uniforms)}return C.uniformsList}function Ji(C,W){const rt=Zt.get(C);rt.outputColorSpace=W.outputColorSpace,rt.batching=W.batching,rt.batchingColor=W.batchingColor,rt.instancing=W.instancing,rt.instancingColor=W.instancingColor,rt.instancingMorph=W.instancingMorph,rt.skinning=W.skinning,rt.morphTargets=W.morphTargets,rt.morphNormals=W.morphNormals,rt.morphColors=W.morphColors,rt.morphTargetsCount=W.morphTargetsCount,rt.numClippingPlanes=W.numClippingPlanes,rt.numIntersection=W.numClipIntersection,rt.vertexAlphas=W.vertexAlphas,rt.vertexTangents=W.vertexTangents,rt.toneMapping=W.toneMapping}function ro(C,W,rt,at,q){W.isScene!==!0&&(W=Ge),N.resetTextureUnits();const bt=W.fog,Ct=at.isMeshStandardMaterial?W.environment:null,Dt=F===null?A.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:to,kt=(at.isMeshStandardMaterial?nt:w).get(at.envMap||Ct),se=at.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,ee=!!rt.attributes.tangent&&(!!at.normalMap||at.anisotropy>0),It=!!rt.morphAttributes.position,we=!!rt.morphAttributes.normal,Be=!!rt.morphAttributes.color;let ke=ls;at.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(ke=A.toneMapping);const In=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Te=In!==void 0?In.length:0,Xt=Zt.get(at),xn=_.state.lights;if(ct===!0&&(Et===!0||C!==R)){const Fn=C===R&&at.id===D;At.setState(at,C,Fn)}let le=!1;at.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==xn.state.version||Xt.outputColorSpace!==Dt||q.isBatchedMesh&&Xt.batching===!1||!q.isBatchedMesh&&Xt.batching===!0||q.isBatchedMesh&&Xt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Xt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Xt.instancing===!1||!q.isInstancedMesh&&Xt.instancing===!0||q.isSkinnedMesh&&Xt.skinning===!1||!q.isSkinnedMesh&&Xt.skinning===!0||q.isInstancedMesh&&Xt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Xt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Xt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Xt.instancingMorph===!1&&q.morphTexture!==null||Xt.envMap!==kt||at.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==At.numPlanes||Xt.numIntersection!==At.numIntersection)||Xt.vertexAlphas!==se||Xt.vertexTangents!==ee||Xt.morphTargets!==It||Xt.morphNormals!==we||Xt.morphColors!==Be||Xt.toneMapping!==ke||Xt.morphTargetsCount!==Te)&&(le=!0):(le=!0,Xt.__version=at.version);let jn=Xt.currentProgram;le===!0&&(jn=rn(at,W,q));let Da=!1,Ln=!1,La=!1;const Pe=jn.getUniforms(),gi=Xt.uniforms;if(Qt.useProgram(jn.program)&&(Da=!0,Ln=!0,La=!0),at.id!==D&&(D=at.id,Ln=!0),Da||R!==C){Qt.buffers.depth.getReversed()?(_t.copy(C.projectionMatrix),f1(_t),h1(_t),Pe.setValue(j,"projectionMatrix",_t)):Pe.setValue(j,"projectionMatrix",C.projectionMatrix),Pe.setValue(j,"viewMatrix",C.matrixWorldInverse);const Ni=Pe.map.cameraPosition;Ni!==void 0&&Ni.setValue(j,Ht.setFromMatrixPosition(C.matrixWorld)),_e.logarithmicDepthBuffer&&Pe.setValue(j,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(at.isMeshPhongMaterial||at.isMeshToonMaterial||at.isMeshLambertMaterial||at.isMeshBasicMaterial||at.isMeshStandardMaterial||at.isShaderMaterial)&&Pe.setValue(j,"isOrthographic",C.isOrthographicCamera===!0),R!==C&&(R=C,Ln=!0,La=!0)}if(q.isSkinnedMesh){Pe.setOptional(j,q,"bindMatrix"),Pe.setOptional(j,q,"bindMatrixInverse");const Fn=q.skeleton;Fn&&(Fn.boneTexture===null&&Fn.computeBoneTexture(),Pe.setValue(j,"boneTexture",Fn.boneTexture,N))}q.isBatchedMesh&&(Pe.setOptional(j,q,"batchingTexture"),Pe.setValue(j,"batchingTexture",q._matricesTexture,N),Pe.setOptional(j,q,"batchingIdTexture"),Pe.setValue(j,"batchingIdTexture",q._indirectTexture,N),Pe.setOptional(j,q,"batchingColorTexture"),q._colorsTexture!==null&&Pe.setValue(j,"batchingColorTexture",q._colorsTexture,N));const yn=rt.morphAttributes;if((yn.position!==void 0||yn.normal!==void 0||yn.color!==void 0)&&jt.update(q,rt,jn),(Ln||Xt.receiveShadow!==q.receiveShadow)&&(Xt.receiveShadow=q.receiveShadow,Pe.setValue(j,"receiveShadow",q.receiveShadow)),at.isMeshGouraudMaterial&&at.envMap!==null&&(gi.envMap.value=kt,gi.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),at.isMeshStandardMaterial&&at.envMap===null&&W.environment!==null&&(gi.envMapIntensity.value=W.environmentIntensity),Ln&&(Pe.setValue(j,"toneMappingExposure",A.toneMappingExposure),Xt.needsLights&&Eu(gi,La),bt&&at.fog===!0&&Lt.refreshFogUniforms(gi,bt),Lt.refreshMaterialUniforms(gi,at,K,Q,_.state.transmissionRenderTarget[C.id]),uu.upload(j,Dn(Xt),gi,N)),at.isShaderMaterial&&at.uniformsNeedUpdate===!0&&(uu.upload(j,Dn(Xt),gi,N),at.uniformsNeedUpdate=!1),at.isSpriteMaterial&&Pe.setValue(j,"center",q.center),Pe.setValue(j,"modelViewMatrix",q.modelViewMatrix),Pe.setValue(j,"normalMatrix",q.normalMatrix),Pe.setValue(j,"modelMatrix",q.matrixWorld),at.isShaderMaterial||at.isRawShaderMaterial){const Fn=at.uniformsGroups;for(let Ni=0,vi=Fn.length;Ni<vi;Ni++){const $i=Fn[Ni];X.update($i,jn),X.bind($i,jn)}}return jn}function Eu(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function Tu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(C,W,rt){Zt.get(C.texture).__webglTexture=W,Zt.get(C.depthTexture).__webglTexture=rt;const at=Zt.get(C);at.__hasExternalTextures=!0,at.__autoAllocateDepthBuffer=rt===void 0,at.__autoAllocateDepthBuffer||me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),at.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,W){const rt=Zt.get(C);rt.__webglFramebuffer=W,rt.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(C,W=0,rt=0){F=C,z=W,O=rt;let at=!0,q=null,bt=!1,Ct=!1;if(C){const kt=Zt.get(C);if(kt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(j.FRAMEBUFFER,null),at=!1;else if(kt.__webglFramebuffer===void 0)N.setupRenderTarget(C);else if(kt.__hasExternalTextures)N.rebindTextures(C,Zt.get(C.texture).__webglTexture,Zt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const It=C.depthTexture;if(kt.__boundDepthTexture!==It){if(It!==null&&Zt.has(It)&&(C.width!==It.image.width||C.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(C)}}const se=C.texture;(se.isData3DTexture||se.isDataArrayTexture||se.isCompressedArrayTexture)&&(Ct=!0);const ee=Zt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(ee[W])?q=ee[W][rt]:q=ee[W],bt=!0):C.samples>0&&N.useMultisampledRTT(C)===!1?q=Zt.get(C).__webglMultisampledFramebuffer:Array.isArray(ee)?q=ee[rt]:q=ee,H.copy(C.viewport),et.copy(C.scissor),st=C.scissorTest}else H.copy(P).multiplyScalar(K).floor(),et.copy(it).multiplyScalar(K).floor(),st=St;if(Qt.bindFramebuffer(j.FRAMEBUFFER,q)&&at&&Qt.drawBuffers(C,q),Qt.viewport(H),Qt.scissor(et),Qt.setScissorTest(st),bt){const kt=Zt.get(C.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+W,kt.__webglTexture,rt)}else if(Ct){const kt=Zt.get(C.texture),se=W||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,kt.__webglTexture,rt||0,se)}D=-1},this.readRenderTargetPixels=function(C,W,rt,at,q,bt,Ct){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){Qt.bindFramebuffer(j.FRAMEBUFFER,Dt);try{const kt=C.texture,se=kt.format,ee=kt.type;if(!_e.textureFormatReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-at&&rt>=0&&rt<=C.height-q&&j.readPixels(W,rt,at,q,ce.convert(se),ce.convert(ee),bt)}finally{const kt=F!==null?Zt.get(F).__webglFramebuffer:null;Qt.bindFramebuffer(j.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(C,W,rt,at,q,bt,Ct){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Zt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){const kt=C.texture,se=kt.format,ee=kt.type;if(!_e.textureFormatReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=C.width-at&&rt>=0&&rt<=C.height-q){Qt.bindFramebuffer(j.FRAMEBUFFER,Dt);const It=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,It),j.bufferData(j.PIXEL_PACK_BUFFER,bt.byteLength,j.STREAM_READ),j.readPixels(W,rt,at,q,ce.convert(se),ce.convert(ee),0);const we=F!==null?Zt.get(F).__webglFramebuffer:null;Qt.bindFramebuffer(j.FRAMEBUFFER,we);const Be=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await u1(j,Be,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,It),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,bt),j.deleteBuffer(It),j.deleteSync(Be),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,W=null,rt=0){C.isTexture!==!0&&(sl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,C=arguments[1]);const at=Math.pow(2,-rt),q=Math.floor(C.image.width*at),bt=Math.floor(C.image.height*at),Ct=W!==null?W.x:0,Dt=W!==null?W.y:0;N.setTexture2D(C,0),j.copyTexSubImage2D(j.TEXTURE_2D,rt,0,0,Ct,Dt,q,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(C,W,rt=null,at=null,q=0){C.isTexture!==!0&&(sl("WebGLRenderer: copyTextureToTexture function signature has changed."),at=arguments[0]||null,C=arguments[1],W=arguments[2],q=arguments[3]||0,rt=null);let bt,Ct,Dt,kt,se,ee,It,we,Be;const ke=C.isCompressedTexture?C.mipmaps[q]:C.image;rt!==null?(bt=rt.max.x-rt.min.x,Ct=rt.max.y-rt.min.y,Dt=rt.isBox3?rt.max.z-rt.min.z:1,kt=rt.min.x,se=rt.min.y,ee=rt.isBox3?rt.min.z:0):(bt=ke.width,Ct=ke.height,Dt=ke.depth||1,kt=0,se=0,ee=0),at!==null?(It=at.x,we=at.y,Be=at.z):(It=0,we=0,Be=0);const In=ce.convert(W.format),Te=ce.convert(W.type);let Xt;W.isData3DTexture?(N.setTexture3D(W,0),Xt=j.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(N.setTexture2DArray(W,0),Xt=j.TEXTURE_2D_ARRAY):(N.setTexture2D(W,0),Xt=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,W.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,W.unpackAlignment);const xn=j.getParameter(j.UNPACK_ROW_LENGTH),le=j.getParameter(j.UNPACK_IMAGE_HEIGHT),jn=j.getParameter(j.UNPACK_SKIP_PIXELS),Da=j.getParameter(j.UNPACK_SKIP_ROWS),Ln=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,ke.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,ke.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,kt),j.pixelStorei(j.UNPACK_SKIP_ROWS,se),j.pixelStorei(j.UNPACK_SKIP_IMAGES,ee);const La=C.isDataArrayTexture||C.isData3DTexture,Pe=W.isDataArrayTexture||W.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const gi=Zt.get(C),yn=Zt.get(W),Fn=Zt.get(gi.__renderTarget),Ni=Zt.get(yn.__renderTarget);Qt.bindFramebuffer(j.READ_FRAMEBUFFER,Fn.__webglFramebuffer),Qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,Ni.__webglFramebuffer);for(let vi=0;vi<Dt;vi++)La&&j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Zt.get(C).__webglTexture,q,ee+vi),C.isDepthTexture?(Pe&&j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Zt.get(W).__webglTexture,q,Be+vi),j.blitFramebuffer(kt,se,bt,Ct,It,we,bt,Ct,j.DEPTH_BUFFER_BIT,j.NEAREST)):Pe?j.copyTexSubImage3D(Xt,q,It,we,Be+vi,kt,se,bt,Ct):j.copyTexSubImage2D(Xt,q,It,we,Be+vi,kt,se,bt,Ct);Qt.bindFramebuffer(j.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else Pe?C.isDataTexture||C.isData3DTexture?j.texSubImage3D(Xt,q,It,we,Be,bt,Ct,Dt,In,Te,ke.data):W.isCompressedArrayTexture?j.compressedTexSubImage3D(Xt,q,It,we,Be,bt,Ct,Dt,In,ke.data):j.texSubImage3D(Xt,q,It,we,Be,bt,Ct,Dt,In,Te,ke):C.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,q,It,we,bt,Ct,In,Te,ke.data):C.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,q,It,we,ke.width,ke.height,In,ke.data):j.texSubImage2D(j.TEXTURE_2D,q,It,we,bt,Ct,In,Te,ke);j.pixelStorei(j.UNPACK_ROW_LENGTH,xn),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,le),j.pixelStorei(j.UNPACK_SKIP_PIXELS,jn),j.pixelStorei(j.UNPACK_SKIP_ROWS,Da),j.pixelStorei(j.UNPACK_SKIP_IMAGES,Ln),q===0&&W.generateMipmaps&&j.generateMipmap(Xt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(C,W,rt=null,at=null,q=0){return C.isTexture!==!0&&(sl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,at=arguments[1]||null,C=arguments[2],W=arguments[3],q=arguments[4]||0),sl('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,W,rt,at,q)},this.initRenderTarget=function(C){Zt.get(C).__webglFramebuffer===void 0&&N.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?N.setTextureCube(C,0):C.isData3DTexture?N.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?N.setTexture2DArray(C,0):N.setTexture2D(C,0),Qt.unbindTexture()},this.resetState=function(){z=0,O=0,F=null,Qt.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Aa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Re._getDrawingBufferColorSpace(t),n.unpackColorSpace=Re._getUnpackColorSpace()}}class M2 extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Fr extends Xs{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const pu=new V,mu=new V,wx=new Je,nl=new Mp,Wc=new fl,md=new V,Rx=new V;class B_ extends wn{constructor(t=new Rn,n=new Fr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,s=[0];for(let l=1,c=n.count;l<c;l++)pu.fromBufferAttribute(n,l-1),mu.fromBufferAttribute(n,l),s[l]=s[l-1],s[l]+=pu.distanceTo(mu);t.setAttribute("lineDistance",new an(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Wc.copy(s.boundingSphere),Wc.applyMatrix4(l),Wc.radius+=c,t.ray.intersectsSphere(Wc)===!1)return;wx.copy(l).invert(),nl.copy(t.ray).applyMatrix4(wx);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,v=s.index,x=s.attributes.position;if(v!==null){const S=Math.max(0,f.start),y=Math.min(v.count,f.start+f.count);for(let T=S,E=y-1;T<E;T+=p){const _=v.getX(T),U=v.getX(T+1),L=qc(this,t,nl,m,_,U);L&&n.push(L)}if(this.isLineLoop){const T=v.getX(y-1),E=v.getX(S),_=qc(this,t,nl,m,T,E);_&&n.push(_)}}else{const S=Math.max(0,f.start),y=Math.min(x.count,f.start+f.count);for(let T=S,E=y-1;T<E;T+=p){const _=qc(this,t,nl,m,T,T+1);_&&n.push(_)}if(this.isLineLoop){const T=qc(this,t,nl,m,y-1,S);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function qc(r,t,n,s,l,c){const f=r.geometry.attributes.position;if(pu.fromBufferAttribute(f,l),mu.fromBufferAttribute(f,c),n.distanceSqToSegment(pu,mu,md,Rx)>s)return;md.applyMatrix4(r.matrixWorld);const m=t.ray.origin.distanceTo(md);if(!(m<t.near||m>t.far))return{distance:m,point:Rx.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}const Cx=new V,Dx=new V;class jc extends B_{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,s=[];for(let l=0,c=n.count;l<c;l+=2)Cx.fromBufferAttribute(n,l),Dx.fromBufferAttribute(n,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+Cx.distanceTo(Dx);t.setAttribute("lineDistance",new an(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class up extends Xs{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Lx=new Je,fp=new Mp,Yc=new fl,Zc=new V;class Ux extends wn{constructor(t=new Rn,n=new up){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Yc.copy(s.boundingSphere),Yc.applyMatrix4(l),Yc.radius+=c,t.ray.intersectsSphere(Yc)===!1)return;Lx.copy(l).invert(),fp.copy(t.ray).applyMatrix4(Lx);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=s.index,g=s.attributes.position;if(p!==null){const x=Math.max(0,f.start),S=Math.min(p.count,f.start+f.count);for(let y=x,T=S;y<T;y++){const E=p.getX(y);Zc.fromBufferAttribute(g,E),Nx(Zc,E,m,l,t,n,this)}}else{const x=Math.max(0,f.start),S=Math.min(g.count,f.start+f.count);for(let y=x,T=S;y<T;y++)Zc.fromBufferAttribute(g,y),Nx(Zc,y,m,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Nx(r,t,n,s,l,c,f){const d=fp.distanceSqToPoint(r);if(d<n){const m=new V;fp.closestPointToPoint(r,m),m.applyMatrix4(s);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class Ze extends Rn{constructor(t=1,n=1,s=1,l=32,c=1,f=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:s,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:d,thetaLength:m};const p=this;l=Math.floor(l),c=Math.floor(c);const v=[],g=[],x=[],S=[];let y=0;const T=[],E=s/2;let _=0;U(),f===!1&&(t>0&&L(!0),n>0&&L(!1)),this.setIndex(v),this.setAttribute("position",new an(g,3)),this.setAttribute("normal",new an(x,3)),this.setAttribute("uv",new an(S,2));function U(){const A=new V,k=new V;let z=0;const O=(n-t)/s;for(let F=0;F<=c;F++){const D=[],R=F/c,H=R*(n-t)+t;for(let et=0;et<=l;et++){const st=et/l,ht=st*m+d,mt=Math.sin(ht),B=Math.cos(ht);k.x=H*mt,k.y=-R*s+E,k.z=H*B,g.push(k.x,k.y,k.z),A.set(mt,O,B).normalize(),x.push(A.x,A.y,A.z),S.push(st,1-R),D.push(y++)}T.push(D)}for(let F=0;F<l;F++)for(let D=0;D<c;D++){const R=T[D][F],H=T[D+1][F],et=T[D+1][F+1],st=T[D][F+1];(t>0||D!==0)&&(v.push(R,H,st),z+=3),(n>0||D!==c-1)&&(v.push(H,et,st),z+=3)}p.addGroup(_,z,0),_+=z}function L(A){const k=y,z=new ne,O=new V;let F=0;const D=A===!0?t:n,R=A===!0?1:-1;for(let et=1;et<=l;et++)g.push(0,E*R,0),x.push(0,R,0),S.push(.5,.5),y++;const H=y;for(let et=0;et<=l;et++){const ht=et/l*m+d,mt=Math.cos(ht),B=Math.sin(ht);O.x=D*B,O.y=E*R,O.z=D*mt,g.push(O.x,O.y,O.z),x.push(0,R,0),z.x=mt*.5+.5,z.y=B*.5*R+.5,S.push(z.x,z.y),y++}for(let et=0;et<l;et++){const st=k+et,ht=H+et;A===!0?v.push(ht,ht+1,st):v.push(ht+1,ht,st),F+=3}p.addGroup(_,F,A===!0?1:2),_+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ze(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Vr extends Ze{constructor(t=1,n=1,s=32,l=1,c=!1,f=0,d=Math.PI*2){super(0,t,n,s,l,c,f,d),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:s,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:d}}static fromJSON(t){return new Vr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hl extends Rn{constructor(t=[],n=[],s=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:s,detail:l};const c=[],f=[];d(l),p(s),v(),this.setAttribute("position",new an(c,3)),this.setAttribute("normal",new an(c.slice(),3)),this.setAttribute("uv",new an(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function d(U){const L=new V,A=new V,k=new V;for(let z=0;z<n.length;z+=3)S(n[z+0],L),S(n[z+1],A),S(n[z+2],k),m(L,A,k,U)}function m(U,L,A,k){const z=k+1,O=[];for(let F=0;F<=z;F++){O[F]=[];const D=U.clone().lerp(A,F/z),R=L.clone().lerp(A,F/z),H=z-F;for(let et=0;et<=H;et++)et===0&&F===z?O[F][et]=D:O[F][et]=D.clone().lerp(R,et/H)}for(let F=0;F<z;F++)for(let D=0;D<2*(z-F)-1;D++){const R=Math.floor(D/2);D%2===0?(x(O[F][R+1]),x(O[F+1][R]),x(O[F][R])):(x(O[F][R+1]),x(O[F+1][R+1]),x(O[F+1][R]))}}function p(U){const L=new V;for(let A=0;A<c.length;A+=3)L.x=c[A+0],L.y=c[A+1],L.z=c[A+2],L.normalize().multiplyScalar(U),c[A+0]=L.x,c[A+1]=L.y,c[A+2]=L.z}function v(){const U=new V;for(let L=0;L<c.length;L+=3){U.x=c[L+0],U.y=c[L+1],U.z=c[L+2];const A=E(U)/2/Math.PI+.5,k=_(U)/Math.PI+.5;f.push(A,1-k)}y(),g()}function g(){for(let U=0;U<f.length;U+=6){const L=f[U+0],A=f[U+2],k=f[U+4],z=Math.max(L,A,k),O=Math.min(L,A,k);z>.9&&O<.1&&(L<.2&&(f[U+0]+=1),A<.2&&(f[U+2]+=1),k<.2&&(f[U+4]+=1))}}function x(U){c.push(U.x,U.y,U.z)}function S(U,L){const A=U*3;L.x=t[A+0],L.y=t[A+1],L.z=t[A+2]}function y(){const U=new V,L=new V,A=new V,k=new V,z=new ne,O=new ne,F=new ne;for(let D=0,R=0;D<c.length;D+=9,R+=6){U.set(c[D+0],c[D+1],c[D+2]),L.set(c[D+3],c[D+4],c[D+5]),A.set(c[D+6],c[D+7],c[D+8]),z.set(f[R+0],f[R+1]),O.set(f[R+2],f[R+3]),F.set(f[R+4],f[R+5]),k.copy(U).add(L).add(A).divideScalar(3);const H=E(k);T(z,R+0,U,H),T(O,R+2,L,H),T(F,R+4,A,H)}}function T(U,L,A,k){k<0&&U.x===1&&(f[L]=U.x-1),A.x===0&&A.z===0&&(f[L]=k/2/Math.PI+.5)}function E(U){return Math.atan2(U.z,-U.x)}function _(U){return Math.atan2(-U.y,Math.sqrt(U.x*U.x+U.z*U.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.vertices,t.indices,t.radius,t.details)}}class gu extends hl{constructor(t=1,n=0){const s=(1+Math.sqrt(5))/2,l=1/s,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-s,0,-l,s,0,l,-s,0,l,s,-l,-s,0,-l,s,0,l,-s,0,l,s,0,-s,0,-l,s,0,-l,-s,0,l,s,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new gu(t.radius,t.detail)}}const Kc=new V,Qc=new V,gd=new V,Jc=new Di;class $c extends Rn{constructor(t=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:n},t!==null){const l=Math.pow(10,4),c=Math.cos(cu*n),f=t.getIndex(),d=t.getAttribute("position"),m=f?f.count:d.count,p=[0,0,0],v=["a","b","c"],g=new Array(3),x={},S=[];for(let y=0;y<m;y+=3){f?(p[0]=f.getX(y),p[1]=f.getX(y+1),p[2]=f.getX(y+2)):(p[0]=y,p[1]=y+1,p[2]=y+2);const{a:T,b:E,c:_}=Jc;if(T.fromBufferAttribute(d,p[0]),E.fromBufferAttribute(d,p[1]),_.fromBufferAttribute(d,p[2]),Jc.getNormal(gd),g[0]=`${Math.round(T.x*l)},${Math.round(T.y*l)},${Math.round(T.z*l)}`,g[1]=`${Math.round(E.x*l)},${Math.round(E.y*l)},${Math.round(E.z*l)}`,g[2]=`${Math.round(_.x*l)},${Math.round(_.y*l)},${Math.round(_.z*l)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let U=0;U<3;U++){const L=(U+1)%3,A=g[U],k=g[L],z=Jc[v[U]],O=Jc[v[L]],F=`${A}_${k}`,D=`${k}_${A}`;D in x&&x[D]?(gd.dot(x[D].normal)<=c&&(S.push(z.x,z.y,z.z),S.push(O.x,O.y,O.z)),x[D]=null):F in x||(x[F]={index0:p[U],index1:p[L],normal:gd.clone()})}}for(const y in x)if(x[y]){const{index0:T,index1:E}=x[y];Kc.fromBufferAttribute(d,T),Qc.fromBufferAttribute(d,E),S.push(Kc.x,Kc.y,Kc.z),S.push(Qc.x,Qc.y,Qc.z)}this.setAttribute("position",new an(S,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class bp extends hl{constructor(t=1,n=0){const s=(1+Math.sqrt(5))/2,l=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new bp(t.radius,t.detail)}}class vu extends hl{constructor(t=1,n=0){const s=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(s,l,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new vu(t.radius,t.detail)}}class nn extends Rn{constructor(t=1,n=32,s=16,l=0,c=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:d},n=Math.max(3,Math.floor(n)),s=Math.max(2,Math.floor(s));const m=Math.min(f+d,Math.PI);let p=0;const v=[],g=new V,x=new V,S=[],y=[],T=[],E=[];for(let _=0;_<=s;_++){const U=[],L=_/s;let A=0;_===0&&f===0?A=.5/n:_===s&&m===Math.PI&&(A=-.5/n);for(let k=0;k<=n;k++){const z=k/n;g.x=-t*Math.cos(l+z*c)*Math.sin(f+L*d),g.y=t*Math.cos(f+L*d),g.z=t*Math.sin(l+z*c)*Math.sin(f+L*d),y.push(g.x,g.y,g.z),x.copy(g).normalize(),T.push(x.x,x.y,x.z),E.push(z+A,1-L),U.push(p++)}v.push(U)}for(let _=0;_<s;_++)for(let U=0;U<n;U++){const L=v[_][U+1],A=v[_][U],k=v[_+1][U],z=v[_+1][U+1];(_!==0||f>0)&&S.push(L,A,z),(_!==s-1||m<Math.PI)&&S.push(A,k,z)}this.setIndex(S),this.setAttribute("position",new an(y,3)),this.setAttribute("normal",new an(T,3)),this.setAttribute("uv",new an(E,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ap extends Rn{constructor(t=1,n=.4,s=12,l=48,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:s,tubularSegments:l,arc:c},s=Math.floor(s),l=Math.floor(l);const f=[],d=[],m=[],p=[],v=new V,g=new V,x=new V;for(let S=0;S<=s;S++)for(let y=0;y<=l;y++){const T=y/l*c,E=S/s*Math.PI*2;g.x=(t+n*Math.cos(E))*Math.cos(T),g.y=(t+n*Math.cos(E))*Math.sin(T),g.z=n*Math.sin(E),d.push(g.x,g.y,g.z),v.x=t*Math.cos(T),v.y=t*Math.sin(T),x.subVectors(g,v).normalize(),m.push(x.x,x.y,x.z),p.push(y/l),p.push(S/s)}for(let S=1;S<=s;S++)for(let y=1;y<=l;y++){const T=(l+1)*S+y-1,E=(l+1)*(S-1)+y-1,_=(l+1)*(S-1)+y,U=(l+1)*S+y;f.push(T,E,U),f.push(E,_,U)}this.setIndex(f),this.setAttribute("position",new an(d,3)),this.setAttribute("normal",new an(m,3)),this.setAttribute("uv",new an(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ap(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class y2 extends An{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class zn extends Xs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=__,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class wp extends wn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const vd=new Je,Ox=new V,Px=new V;class I_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yp,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,s=this.matrix;Ox.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ox),Px.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(Px),n.updateMatrixWorld(),vd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vd),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(vd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const zx=new Je,il=new V,xd=new V;class E2 extends I_{constructor(){super(new di(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new je(2,1,1,1),new je(0,1,1,1),new je(3,1,1,1),new je(1,1,1,1),new je(3,0,1,1),new je(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,n=0){const s=this.camera,l=this.matrix,c=t.distance||s.far;c!==s.far&&(s.far=c,s.updateProjectionMatrix()),il.setFromMatrixPosition(t.matrixWorld),s.position.copy(il),xd.copy(s.position),xd.add(this._cubeDirections[n]),s.up.copy(this._cubeUps[n]),s.lookAt(xd),s.updateMatrixWorld(),l.makeTranslation(-il.x,-il.y,-il.z),zx.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zx)}}class Bx extends wp{constructor(t,n,s=0,l=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new E2}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class T2 extends I_{constructor(){super(new Ep(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class b2 extends wp{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.shadow=new T2}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class A2 extends wp{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class F_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ix(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Ix();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function Ix(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pp);const H_={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ws{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const w2=new Ep(-1,1,1,-1,0,1);class R2 extends Rn{constructor(){super(),this.setAttribute("position",new an([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new an([0,2,0,0,2,0],2))}}const C2=new R2;class yu{constructor(t){this._mesh=new $t(C2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,w2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class D2 extends Ws{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof An?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=cs.clone(t.uniforms),this.material=new An({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new yu(this.material)}render(t,n,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Fx extends Ws{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,s){const l=t.getContext(),c=t.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,d;this.inverse?(f=0,d=1):(f=1,d=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(d),c.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class L2 extends Ws{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class U2{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const s=t.getSize(new ne);this._width=s.width,this._height=s.height,n=new mi(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Vi}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new D2(H_),this.copyPass.material.blending=wa,this.clock=new F_}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let s=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),f.needsSwap){if(s){const d=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),m.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}Fx!==void 0&&(f instanceof Fx?s=!0:f instanceof L2&&(s=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const s=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(s,l),this.renderTarget2.setSize(s,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(s,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class N2 extends Ws{constructor(t,n,s=null,l=null,c=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=s,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new te}render(t,n,s){const l=t.autoClear;t.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(c=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const O2={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new te(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class $r extends Ws{constructor(t,n,s,l){super(),this.strength=n!==void 0?n:1,this.radius=s,this.threshold=l,this.resolution=t!==void 0?new ne(t.x,t.y):new ne(256,256),this.clearColor=new te(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let c=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);this.renderTargetBright=new mi(c,f,{type:Vi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let g=0;g<this.nMips;g++){const x=new mi(c,f,{type:Vi});x.texture.name="UnrealBloomPass.h"+g,x.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(x);const S=new mi(c,f,{type:Vi});S.texture.name="UnrealBloomPass.v"+g,S.texture.generateMipmaps=!1,this.renderTargetsVertical.push(S),c=Math.round(c/2),f=Math.round(f/2)}const d=O2;this.highPassUniforms=cs.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=l,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new An({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const m=[3,5,7,9,11];c=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);for(let g=0;g<this.nMips;g++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(m[g])),this.separableBlurMaterials[g].uniforms.invSize.value=new ne(1/c,1/f),c=Math.round(c/2),f=Math.round(f/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const v=H_;this.copyUniforms=cs.clone(v.uniforms),this.blendMaterial=new An({uniforms:this.copyUniforms,vertexShader:v.vertexShader,fragmentShader:v.fragmentShader,blending:Xr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new te,this.oldClearAlpha=1,this.basic=new Ea,this.fsQuad=new yu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,n){let s=Math.round(t/2),l=Math.round(n/2);this.renderTargetBright.setSize(s,l);for(let c=0;c<this.nMips;c++)this.renderTargetsHorizontal[c].setSize(s,l),this.renderTargetsVertical[c].setSize(s,l),this.separableBlurMaterials[c].uniforms.invSize.value=new ne(1/s,1/l),s=Math.round(s/2),l=Math.round(l/2)}render(t,n,s,l,c){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const f=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),c&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let d=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this.fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[m].uniforms.direction.value=$r.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[m]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=$r.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[m]),t.clear(),this.fsQuad.render(t),d=this.renderTargetsVertical[m];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,c&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(s),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=f}getSeperableBlurMaterial(t){const n=[];for(let s=0;s<t;s++)n.push(.39894*Math.exp(-.5*s*s/(t*t))/t);return new An({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new An({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}$r.BlurDirectionX=new ne(1,0);$r.BlurDirectionY=new ne(0,1);const tu={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},eu={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},_d={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class P2 extends Ws{constructor(t,n){super(),this.edgesRT=new mi(t,n,{depthBuffer:!1,type:Vi}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new mi(t,n,{depthBuffer:!1,type:Vi}),this.weightsRT.texture.name="SMAAPass.weights";const s=this,l=new Image;l.src=this.getAreaTexture(),l.onload=function(){s.areaTexture.needsUpdate=!0},this.areaTexture=new kn,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=l,this.areaTexture.minFilter=Hi,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const c=new Image;c.src=this.getSearchTexture(),c.onload=function(){s.searchTexture.needsUpdate=!0},this.searchTexture=new kn,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=c,this.searchTexture.magFilter=pi,this.searchTexture.minFilter=pi,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=cs.clone(tu.uniforms),this.uniformsEdges.resolution.value.set(1/t,1/n),this.materialEdges=new An({defines:Object.assign({},tu.defines),uniforms:this.uniformsEdges,vertexShader:tu.vertexShader,fragmentShader:tu.fragmentShader}),this.uniformsWeights=cs.clone(eu.uniforms),this.uniformsWeights.resolution.value.set(1/t,1/n),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new An({defines:Object.assign({},eu.defines),uniforms:this.uniformsWeights,vertexShader:eu.vertexShader,fragmentShader:eu.fragmentShader}),this.uniformsBlend=cs.clone(_d.uniforms),this.uniformsBlend.resolution.value.set(1/t,1/n),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new An({uniforms:this.uniformsBlend,vertexShader:_d.vertexShader,fragmentShader:_d.fragmentShader}),this.fsQuad=new yu(null)}render(t,n,s){this.uniformsEdges.tDiffuse.value=s.texture,this.fsQuad.material=this.materialEdges,t.setRenderTarget(this.edgesRT),this.clear&&t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialWeights,t.setRenderTarget(this.weightsRT),this.clear&&t.clear(),this.fsQuad.render(t),this.uniformsBlend.tColor.value=s.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(),this.fsQuad.render(t))}setSize(t,n){this.edgesRT.setSize(t,n),this.weightsRT.setSize(t,n),this.materialEdges.uniforms.resolution.value.set(1/t,1/n),this.materialWeights.uniforms.resolution.value.set(1/t,1/n),this.materialBlend.uniforms.resolution.value.set(1/t,1/n)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const z2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class B2 extends Ws{constructor(){super();const t=z2;this.uniforms=cs.clone(t.uniforms),this.material=new y2({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new yu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,n,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Re.getTransfer(this._outputColorSpace)===He&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===n_?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===i_?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===a_?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===s_?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===r_?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===o_&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const I2=.75,F2=.6,H2=.85;class G2{constructor(t,n,s,l,c){Pt(this,"composer");Pt(this,"bloomPass");Pt(this,"smaaPass");Pt(this,"outputPass");this.composer=new U2(t),this.composer.addPass(new N2(n,s)),this.bloomPass=new $r(new ne(l,c),I2,F2,H2),this.composer.addPass(this.bloomPass),this.smaaPass=new P2(l,c),this.composer.addPass(this.smaaPass),this.outputPass=new B2,this.composer.addPass(this.outputPass),this.composer.setSize(l,c)}setSize(t,n){this.composer.setSize(t,n)}render(t){this.composer.render(t)}dispose(){this.composer.dispose(),this.bloomPass.dispose(),this.smaaPass.dispose(),this.outputPass.dispose()}}class V2{constructor(t,n,s){Pt(this,"scene");Pt(this,"renderer");Pt(this,"camera");Pt(this,"playerMeshes",new Map);Pt(this,"enemyMeshes",new Map);Pt(this,"projectileMeshes",new Map);Pt(this,"particleMeshes",new Map);Pt(this,"bossMeshes",new Map);Pt(this,"lockIndicators",new Map);Pt(this,"ambientLight");Pt(this,"dirLight");Pt(this,"pointLight");Pt(this,"clock");Pt(this,"postFX");this.scene=new M2,this.scene.background=new te(328975),this.renderer=new S2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(n,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera=new di(60,n/s,.1,2e3),this.camera.position.set(0,bv,Ih),this.clock=new F_,this.postFX=new G2(this.renderer,this.scene,this.camera,n,s),this.ambientLight=new A2(3359846,.9),this.scene.add(this.ambientLight),this.dirLight=new b2(16777215,1.5),this.dirLight.position.set(50,100,50),this.scene.add(this.dirLight),this.pointLight=new Bx(4491519,2,50),this.pointLight.position.set(0,10,0),this.scene.add(this.pointLight);const l=new Rn,c=6e3,f=new Float32Array(c*3),d=new Float32Array(c*3),m=[new te(16777215),new te(11193599),new te(16768426)];for(let _=0;_<c;_++){f[_*3]=(Math.random()-.5)*1e3,f[_*3+1]=Math.random()*600-200,f[_*3+2]=(Math.random()-.5)*1e3;const U=m[Math.floor(Math.random()*m.length)];d[_*3]=U.r,d[_*3+1]=U.g,d[_*3+2]=U.b}l.setAttribute("position",new qn(f,3)),l.setAttribute("color",new qn(d,3));const p=new up({size:1,vertexColors:!0,transparent:!0}),v=new Ux(l,p);this.scene.add(v);const g=new $t(new nn(90,24,24),new zn({color:2776023,roughness:1,metalness:0}));g.position.set(-320,120,-650),this.scene.add(g);const x=new $t(new nn(92,24,24),new Ea({color:16777215,transparent:!0,opacity:.25}));x.position.copy(g.position),this.scene.add(x);const S=new $t(new nn(97,24,24),new Ea({color:8961023,transparent:!0,opacity:.12,blending:Xr,depthWrite:!1}));S.position.copy(g.position),this.scene.add(S);const y=new $t(new nn(55,16,16),new Ea({color:16755268}));y.position.set(520,320,-900),this.scene.add(y);const T=new $t(new nn(80,16,16),new Ea({color:16746547,transparent:!0,opacity:.35,blending:Xr,depthWrite:!1}));T.position.copy(y.position),this.scene.add(T);const E=new Bx(16755302,1200,2500);E.position.copy(y.position),this.scene.add(E)}updateCamera(t,n,s){const l=new V(t.x-Math.sin(s)*Ih,t.y+bv,t.z-Math.cos(s)*Ih),c=1-Math.exp(-8*n);this.camera.position.lerp(l,c),this.camera.lookAt(t.x,t.y,t.z)}resize(t,n){this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.postFX.setSize(t,n)}render(){this.postFX.render()}addPart(t,n,s,l,c,f=10066346,d=15){const m=new $t(n,s);m.position.set(l[0],l[1],l[2]),c&&m.rotation.set(c[0],c[1],c[2]),m.castShadow=!0,t.add(m);const p=new $c(n,d),v=new Fr({color:f,transparent:!0,opacity:.4}),g=new jc(p,v);return g.position.copy(m.position),c&&g.rotation.set(c[0],c[1],c[2]),t.add(g),m}createPlayerMesh(t=new te(4491519)){const n=new Vs,s=new zn({color:16054010,metalness:.5,roughness:.3}),l=new zn({color:14212324,metalness:.8,roughness:.2}),c=new zn({color:t,metalness:.6,roughness:.3}),f=new zn({color:t.clone().multiplyScalar(.6),metalness:.7,roughness:.3}),d=new zn({color:16777215,emissive:t,emissiveIntensity:1,metalness:.3,roughness:.1}),m=new zn({color:12106950,metalness:.9,roughness:.2}),p=new zn({color:13620186,metalness:.3,roughness:.8}),v=(y,T,E)=>{const _=new $c(y,25),U=new jc(_,new Fr({color:6710920,transparent:!0,opacity:.25}));U.position.set(T[0],T[1],T[2]),n.add(U)};this.addPart(n,new pe(1.8,1,1.4),s,[0,.5,0]),v(new pe(1.8,1,1.4),[0,.5,0]),this.addPart(n,new pe(1.6,.7,.4),c,[0,.6,.75]),this.addPart(n,new pe(1.2,.5,.2),f,[0,.6,.95]),this.addPart(n,new nn(.25,8,8),d,[0,.5,.9]);for(let y=-1;y<=1;y+=2)this.addPart(n,new pe(.15,.3,.5),p,[y*.95,.4,.4]);this.addPart(n,new Ze(.8,1,.4,6),l,[0,0,0]),this.addPart(n,new pe(.7,.5,.7,2,2,2),s,[0,1.3,0]),v(new pe(.7,.5,.7,2,2,2),[0,1.3,0]),this.addPart(n,new pe(.6,.1,.1),d,[0,1.3,.4]),this.addPart(n,new pe(.1,.18,.1),d,[0,1.2,.4]),this.addPart(n,new pe(.08,.25,.3),c,[0,1.6,0]),this.addPart(n,new pe(.5,.15,.1),l,[0,1.1,.35]);for(let y=-1;y<=1;y+=2)this.addPart(n,new pe(.8,.3,.6,2,2,2),s,[y*1.3,.9,0]),v(new pe(.8,.3,.6,2,2,2),[y*1.3,.9,0]),this.addPart(n,new pe(.6,.15,.4),c,[y*1.3,1,0]),this.addPart(n,new nn(.2,6,6),m,[y*1.1,.7,0]);for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.2,.25,.7,6),s,[y*1.2,.3,0]),this.addPart(n,new Ze(.15,.18,.55,6),c,[y*1.2,.3,.15]),this.addPart(n,new nn(.14,6,6),m,[y*1.2,-.1,0]),this.addPart(n,new Ze(.16,.14,.5,6),s,[y*1.2,-.45,0]),this.addPart(n,new pe(.2,.3,.15),c,[y*1.2,-.45,.2]),this.addPart(n,new nn(.1,6,6),m,[y*1.2,-.7,0]),y>0&&(this.addPart(n,new Ze(.08,.1,.8,6),l,[y*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(n,new Ze(.05,.06,1,6),l,[y*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(n,new Ze(.07,.09,.1,6),c,[y*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(n,new pe(.2,.12,.3),c,[y*1.35,-.3,.3]));for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.3,.35,.7,6),s,[y*.5,-.4,0]),v(new Ze(.3,.35,.7,6),[y*.5,-.4,0]),this.addPart(n,new pe(.3,.4,.4),c,[y*.5,-.3,.25]),this.addPart(n,new nn(.2,6,6),m,[y*.5,-.8,0]),this.addPart(n,new nn(.18,6,6),c,[y*.5,-.8,.15]),this.addPart(n,new Ze(.25,.2,.6,6),s,[y*.5,-1.2,0]),this.addPart(n,new pe(.25,.4,.3),c,[y*.5,-1.2,.2]),this.addPart(n,new nn(.15,6,6),m,[y*.5,-1.55,0]),this.addPart(n,new pe(.4,.12,.5),s,[y*.5,-1.65,.1]),v(new pe(.4,.12,.5),[y*.5,-1.65,.1]),this.addPart(n,new pe(.3,.06,.15),c,[y*.5,-1.7,.35]);this.addPart(n,new pe(1,.6,.4),l,[0,.5,-.95]),this.addPart(n,new Ze(.35,.4,.4,8),l,[0,.4,-1.2]);for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.2,.25,.35,6),l,[y*.45,.4,-1.15]);for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.15,.18,.25,6),l,[y*.35,.85,-.95]);const g=new Ze(.3,.1,.15,8),x=new Ea({color:t,transparent:!0,opacity:.5}),S=new $t(g,x);S.position.set(0,.3,-1.4),n.add(S);for(let y=-1;y<=1;y+=2){const T=new $t(new Ze(.18,.06,.1,6),x);T.position.set(y*.45,.3,-1.35),n.add(T)}this.addPart(n,new pe(.7,.2,.15),c,[0,-.1,.55]);for(let y=-1;y<=1;y+=2)this.addPart(n,new pe(.15,.2,.4),c,[y*.65,-.1,.2]);return n}createEnemyMesh(t,n,s){const l=new Vs,c=new zn({color:t,metalness:.6,roughness:.3}),f=new zn({color:4473958,metalness:.7,roughness:.3}),d=new zn({color:16777215,emissive:t,emissiveIntensity:.6}),m=new zn({color:t,emissive:t,emissiveIntensity:.4,metalness:.5,roughness:.3}),p=(v,g,x)=>{const S=new $c(v,20),y=new jc(S,new Fr({color:0,transparent:!0,opacity:.15}));y.position.set(g[0],g[1],g[2]),l.add(y)};switch(s){case"scout":{const v=new $t(new vu(n*.7,1),c);v.castShadow=!0,l.add(v);const g=new $t(new nn(n*.2,6,6),d);l.add(g);for(let S=0;S<4;S++){const y=S/4*Math.PI*2,T=new $t(new Vr(n*.08,n*.5,4),m);T.position.set(Math.cos(y)*n*.6,0,Math.sin(y)*n*.6),T.rotation.z=Math.PI/2,T.rotation.y=-y,l.add(T)}const x=new $t(new Ze(.02,.03,n*.4),f);x.position.set(0,n*.5,0),l.add(x);break}case"assault":{const v=new $t(new pe(n*1,n*.8,n*.7),c);v.castShadow=!0,l.add(v),p(new pe(n*1,n*.8,n*.7),[0,0,0]);const g=new $t(new pe(n*.7,n*.4,n*.2),m);g.position.set(0,0,n*.45),l.add(g);const x=new $t(new pe(n*.3,n*.25,n*.3),f);x.position.set(0,n*.55,0),l.add(x);const S=new $t(new pe(n*.25,n*.06,.05),d);S.position.set(0,n*.55,n*.17),l.add(S);for(let y=-1;y<=1;y+=2){const T=new $t(new Ze(n*.08,n*.1,n*.4,6),f);T.position.set(y*n*.6,n*.1,n*.3),T.rotation.x=Math.PI/2,l.add(T)}break}case"sniper":{const v=new $t(new Ze(n*.2,n*.3,n*1,6),c);v.castShadow=!0,l.add(v),p(new Ze(n*.2,n*.3,n*1,6),[0,0,0]);const g=new $t(new Ze(n*.06,n*.06,n*.15,6),f);g.position.set(0,n*.6,0),l.add(g);const x=new $t(new nn(n*.08,6,6),d);x.position.set(0,n*.68,0),l.add(x);const S=new $t(new Ze(n*.04,n*.06,n*1.2,6),f);S.position.set(0,0,n*.7),S.rotation.x=Math.PI/2,l.add(S);for(let y=-1;y<=1;y+=2){const T=new $t(new Ze(n*.04,n*.06,n*.3,4),f);T.position.set(y*n*.2,-n*.55,0),l.add(T)}break}case"shield":{const v=new $t(new pe(n*1.2,n*.6,n*.5,2,2,2),c);v.castShadow=!0,l.add(v),p(new pe(n*1.2,n*.6,n*.5,2,2,2),[0,0,0]);const g=new $t(new pe(n*1.1,n*.8,n*.15),m);g.position.set(0,0,n*.35),l.add(g);const x=new $c(new pe(n*1.1,n*.8,n*.15),15),S=new jc(x,new Fr({color:16777215,transparent:!0,opacity:.3}));S.position.set(0,0,n*.35),l.add(S);const y=new $t(new nn(n*.15,6,6),d);y.position.set(0,0,n*.45),l.add(y);for(let T=-1;T<=1;T+=2){const E=new $t(new Ze(n*.1,n*.15,n*.2,6),f);E.position.set(T*n*.4,0,-n*.3),l.add(E)}break}case"bomber":{const v=new $t(new nn(n*.6,8,8),c);v.castShadow=!0,l.add(v);for(let x=0;x<8;x++){const S=x/8*Math.PI*2,y=Math.PI*.5,T=new $t(new Vr(n*.06,n*.35,4),m);T.position.set(Math.cos(S)*Math.sin(y)*n*.6,Math.cos(y)*n*.6,Math.sin(S)*Math.sin(y)*n*.6),T.quaternion.setFromUnitVectors(new V(0,1,0),new V(Math.cos(S)*Math.sin(y),Math.cos(y),Math.sin(S)*Math.sin(y))),l.add(T)}const g=new $t(new nn(n*.2,6,6),new zn({color:16711680,emissive:16711680,emissiveIntensity:1}));g.position.set(0,0,0),l.add(g);break}case"commander":{const v=new $t(new gu(n*.6),c);v.castShadow=!0,l.add(v);const g=new $t(new Vr(n*.1,n*.5,4),m);g.position.set(0,n*.6,0),l.add(g);for(let y=-1;y<=1;y+=2){const T=new $t(new nn(n*.25,6,6),f);T.position.set(y*n*.55,n*.2,0),l.add(T)}const x=new $t(new nn(n*.15,6,6),d);l.add(x);const S=new $t(new pe(n*.4,n*.3,n*.2),f);S.position.set(0,0,-n*.4),l.add(S);break}default:{const v=new $t(new vu(n*.8),c);v.castShadow=!0,l.add(v);const g=new $t(new nn(n*.3,6,6),d);l.add(g);break}}return l}createBossMesh(t=new te(16729156),n=4){const s=new Vs,l=new $t(new gu(n),new zn({color:t,emissive:t,emissiveIntensity:.3,metalness:.7,roughness:.3}));l.castShadow=!0,s.add(l);const c=new $t(new bp(n*.4),new zn({color:16777215,emissive:16746496,emissiveIntensity:1,transparent:!0,opacity:.8}));s.add(c);const f=new $t(new Ap(n*1.2,.1,8,24),new zn({color:16755200,emissive:16729088,emissiveIntensity:.5}));f.rotation.x=Math.PI/2,s.add(f);for(let d=0;d<6;d++){const m=new $t(new Ze(.3,.4,.8,6),new zn({color:8947848,metalness:.8,roughness:.2})),p=d/6*Math.PI*2;m.position.set(Math.cos(p)*n*1.1,0,Math.sin(p)*n*1.1),m.rotation.z=Math.PI/2,m.rotation.y=-p,s.add(m)}return s}createProjectileMesh(t,n){const s=new te(t);let l;switch(n){case"beam":case"sniper":l=new nn(.3,6,6);break;case"missile":l=new Vr(.2,.6,6);break;default:l=new nn(.15,4,4)}const c=new Ea({color:s});return new $t(l,c)}createExplosion(t,n,s=1){const c=new Float32Array(90),f=new Float32Array(90),d=new te(n);for(let S=0;S<30;S++){const y=Math.random()*Math.PI*2,T=Math.random()*Math.PI,E=s*(.5+Math.random()*.5);c[S*3]=t.x+E*Math.sin(T)*Math.cos(y),c[S*3+1]=t.y+E*Math.cos(T),c[S*3+2]=t.z+E*Math.sin(T)*Math.sin(y),f[S*3]=d.r,f[S*3+1]=d.g,f[S*3+2]=d.b}const m=new Rn;m.setAttribute("position",new qn(c,3)),m.setAttribute("color",new qn(f,3));const p=new up({size:.5,vertexColors:!0,transparent:!0,opacity:1,blending:Xr,depthWrite:!1}),v=new Ux(m,p);this.scene.add(v);let g=1;const x=()=>{if(g-=.02,g<=0){this.scene.remove(v),m.dispose(),p.dispose();return}p.opacity=g;const S=m.attributes.position,y=S.array;for(let T=0;T<30;T++)y[T*3]+=(Math.random()-.5)*.5,y[T*3+1]+=(Math.random()-.5)*.5,y[T*3+2]+=(Math.random()-.5)*.5;S.needsUpdate=!0,requestAnimationFrame(x)};x()}updateLockIndicator(t,n,s){const l=this.lockIndicators.get(t);if(!s){l&&(this.scene.remove(l),this.lockIndicators.delete(t));return}if(l){const c=l.geometry.attributes.position,f=c.array;f[0]=n.x,f[1]=n.y,f[2]=n.z,f[3]=s.x,f[4]=s.y,f[5]=s.z,c.needsUpdate=!0}else{const c=new Rn,f=new Float32Array([n.x,n.y,n.z,s.x,s.y,s.z]);c.setAttribute("position",new qn(f,3));const d=new Fr({color:65416,transparent:!0,opacity:.4,linewidth:1}),m=new B_(c,d);this.scene.add(m),this.lockIndicators.set(t,m)}}dispose(){this.postFX.dispose(),this.renderer.dispose()}}class k2{constructor(t){Pt(this,"keys",new Set);Pt(this,"mouseNormX",.5);Pt(this,"mouseNormY",.5);Pt(this,"mouseDown",!1);Pt(this,"_weaponSwitch",0);Pt(this,"_dodge",!1);Pt(this,"_special",!1);Pt(this,"lastSpaceTime",0);Pt(this,"canvasWidth",1);Pt(this,"canvasHeight",1)}setCanvasSize(t,n){this.canvasWidth=t,this.canvasHeight=n}getMouseNormX(){return this.mouseNormX}getMouseNormY(){return this.mouseNormY}has(t){return this.keys.has(t)||this.keys.has(t.toLowerCase())||this.keys.has(t.toUpperCase())}getState(){const t=this._weaponSwitch;this._weaponSwitch=0;const n=this._dodge;this._dodge=!1;const s=this._special;return this._special=!1,{forward:this.has("w")||this.keys.has("ArrowUp"),backward:this.has("s")||this.keys.has("ArrowDown"),left:this.has("a")||this.keys.has("ArrowLeft"),right:this.has("d")||this.keys.has("ArrowRight"),up:this.has("Shift"),down:this.has("Control"),shoot:this.mouseDown,aimX:this.mouseNormX,aimY:this.mouseNormY,weaponSwitch:t,boost:this.has(" "),brake:this.has("e"),dodge:n,special:s,lockTarget:this.has("Tab"),pause:this.has("Escape")||this.has("Enter")}}keyDown(t){if(this.keys.add(t),t===" "){const s=performance.now();s-this.lastSpaceTime<300&&(this._dodge=!0),this.lastSpaceTime=s}(t==="z"||t==="Z")&&(this._special=!0);const n=parseInt(t,10);n>=1&&n<=4&&(this._weaponSwitch=n)}keyUp(t){this.keys.delete(t),this.keys.delete(t.toLowerCase()),this.keys.delete(t.toUpperCase())}mouseMove(t,n){this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?n/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}const X2=120,Hx=60/X2/4,W2=64,q2=.12,j2=25,Y2=[{root:45,tones:[57,60,64]},{root:41,tones:[53,57,60]},{root:38,tones:[50,53,57]},{root:40,tones:[52,55,59]}],Gx=r=>440*Math.pow(2,(r-69)/12);class G_{constructor(){Pt(this,"ctx",null);Pt(this,"masterGain",null);Pt(this,"bgmGain",null);Pt(this,"sfxGain",null);Pt(this,"initialized",!1);Pt(this,"bgmTimer",null);Pt(this,"bgmActiveOscs",[]);Pt(this,"nextStepTime",0);Pt(this,"step",0);Pt(this,"noiseBuffer",null)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="square",n.frequency.value=t,s.gain.setValueAtTime(.3,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),n.connect(s),s.connect(this.sfxGain),n.start(),n.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=n.getChannelData(0);for(let f=0;f<t;f++)s[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=n;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.value=1200,n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),n.gain.setValueAtTime(.4,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playDodge(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1800,this.ctx.currentTime+.18),n.gain.setValueAtTime(.25,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.2)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="square",n.frequency.value=440,s.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),s.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),n.connect(s),s.connect(this.sfxGain),n.start(this.ctx.currentTime+t*.3),n.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){this.ensureCtx(),!(!this.ctx||!this.bgmGain||this.bgmTimer!==null)&&(this.step=0,this.nextStepTime=this.ctx.currentTime+.1,this.bgmTimer=window.setInterval(()=>this.scheduleBgmAhead(),j2))}stopBGM(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null);for(const t of this.bgmActiveOscs)try{t.stop()}catch{}this.bgmActiveOscs.length=0,this.step=0,this.nextStepTime=0}scheduleBgmAhead(){if(!(!this.ctx||!this.bgmGain))for(;this.nextStepTime<this.ctx.currentTime+q2;)this.scheduleStep(this.step,this.nextStepTime),this.nextStepTime+=Hx,this.step=(this.step+1)%W2}scheduleStep(t,n){const s=Math.floor(t/16),l=t%16,c=Y2[s];l===0&&this.schedulePad(c,n),(l===0||l===8)&&this.scheduleBass(c,l===8,n),l%8===4&&this.scheduleHat(n)}schedulePad(t,n){if(!this.ctx||!this.bgmGain)return;const s=16*Hx,l=.06,c=.4;for(const f of t.tones)for(const d of[-6,5]){const m=this.ctx.createOscillator(),p=this.ctx.createGain();m.type="sawtooth",m.frequency.value=Gx(f),m.detune.value=d,p.gain.setValueAtTime(1e-4,n),p.gain.exponentialRampToValueAtTime(.022,n+l),p.gain.setValueAtTime(.022,n+s-c),p.gain.exponentialRampToValueAtTime(1e-4,n+s-.02),m.connect(p),p.connect(this.bgmGain),this.trackBgmOsc(m),m.start(n),m.stop(n+s)}}scheduleBass(t,n,s){if(!this.ctx||!this.bgmGain)return;const l=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),f=this.ctx.createGain();l.type="sawtooth",l.frequency.value=Gx(t.root-12+(n?7:0)),c.type="lowpass",c.frequency.setValueAtTime(420,s),c.frequency.exponentialRampToValueAtTime(120,s+.3),c.Q.value=2;const d=n?.2:.24;f.gain.setValueAtTime(1e-4,s),f.gain.exponentialRampToValueAtTime(.16,s+.01),f.gain.exponentialRampToValueAtTime(1e-4,s+d),l.connect(c),c.connect(f),f.connect(this.bgmGain),this.trackBgmOsc(l),l.start(s),l.stop(s+d+.05)}scheduleHat(t){if(!this.ctx||!this.bgmGain)return;const n=this.getNoiseBuffer();if(!n)return;const s=this.ctx.createBufferSource();s.buffer=n;const l=this.ctx.createBiquadFilter();l.type="highpass",l.frequency.value=6500;const c=this.ctx.createGain();c.gain.setValueAtTime(.035,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),s.connect(l),l.connect(c),c.connect(this.bgmGain),s.start(t),s.stop(t+.08)}getNoiseBuffer(){if(!this.ctx)return null;if(this.noiseBuffer)return this.noiseBuffer;const t=this.ctx.sampleRate*.1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=n.getChannelData(0);for(let l=0;l<t;l++)s[l]=Math.random()*2-1;return this.noiseBuffer=n,n}trackBgmOsc(t){this.bgmActiveOscs.push(t),t.onended=()=>{const n=this.bgmActiveOscs.indexOf(t);n>=0&&this.bgmActiveOscs.splice(n,1)}}playBossAnnounce(t){if(this.ensureCtx(),!this.ctx)return;const n=this.ctx.currentTime,s=[...t].reduce((f,d)=>f+d.charCodeAt(0),0),l=120+s%60,c=1+(s>>3)%5/10;this.voiceChip(n,{freq:l,duration:.42,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:34,depth:.55,gainA:.26,gainB:.14,gainC:.1,glideTo:l*.92}),this.voiceChip(n+.3,{freq:l*c,duration:.55,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:30,depth:.5,gainA:.24,gainB:.13,gainC:.09,glideTo:l*c*.9})}playSpecialAnnounce(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.currentTime,n=330;this.voiceChip(t,{freq:n,duration:.8,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:46,depth:.6,gainA:.2,gainB:.14,gainC:.12,glideTo:n*1.8}),this.voiceChip(t+.15,{freq:n*1.25,duration:.6,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:52,depth:.55,gainA:.18,gainB:.12,gainC:.1,glideTo:n*1.25*1.5})}voiceChip(t,n){if(!this.ctx||!this.sfxGain)return;const s=this.ctx.createGain();s.gain.setValueAtTime(1e-4,t),s.gain.exponentialRampToValueAtTime(1,t+.01),s.gain.setValueAtTime(1,t+n.duration*.45),s.gain.exponentialRampToValueAtTime(1e-4,t+n.duration);const l=this.ctx.createGain();l.gain.value=.5;const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sine",c.frequency.value=n.pulseHz,f.gain.value=n.depth,c.connect(f),f.connect(l.gain),c.start(t),c.stop(t+n.duration);const d=[[n.waveA,n.freq,n.gainA],[n.waveB,n.freq*1.005,n.gainB],[n.waveC,n.freq*2.01,n.gainC]];for(const[m,p,v]of d){const g=this.ctx.createOscillator(),x=this.ctx.createGain();g.type=m,g.frequency.setValueAtTime(p,t),g.frequency.exponentialRampToValueAtTime(n.glideTo*(p/n.freq),t+n.duration),x.gain.value=v,g.connect(x),x.connect(l),g.start(t),g.stop(t+n.duration+.02)}l.connect(s),s.connect(this.sfxGain)}}const hi=new G_;var Ee=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(Ee||{}),Vt=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Vt||{}),gn=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(gn||{}),Ci=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(Ci||{});const hp=[{id:1,name:"光束机枪",type:gn.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:Ci.FreeFire},{id:2,name:"追踪导弹",type:gn.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:Ci.LockRequired},{id:3,name:"光束加农",type:gn.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:Ci.LockRequired},{id:4,name:"散射弹幕",type:gn.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:Ci.FreeFire},{id:5,name:"狙击光束",type:gn.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:Ci.LockRequired},{id:6,name:"浮游炮",type:gn.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:Ci.LockShortRange}];function fu(r){return hp.find(t=>t.id===r)||hp[0]}const Vx=[{type:Ee.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:Ee.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:Ee.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:Ee.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:Ee.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:Ee.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function nu(r){return Vx.find(t=>t.type===r)||Vx[0]}function Yi(r,t,n,s,l){return{hpPercent:r,speed:t,attacks:n,minionSpawn:s,attackPattern:l}}const kx=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[Yi(1,5,["弹幕散布"],!0,"spread"),Yi(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),Yi(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[Yi(1,12,["高速突进"],!1,"rush"),Yi(.6,15,["高速突进","分身攻击"],!0,"clone"),Yi(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[Yi(1,4,["多重导弹"],!1,"missile"),Yi(.75,6,["多重导弹","力场护盾"],!1,"shield"),Yi(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),Yi(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function Sd(r){return kx.find(t=>t.id===r)||kx[0]}function sn(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function Ne(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function Ue(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function V_(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function Zi(r,t){return V_(Ne(r,t))}function Ae(r){const t=V_(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function Xx(r,t,n){return r+(t-r)*n}function Ps(r,t,n){return Math.max(t,Math.min(n,r))}function Hr(r,t){return r+Math.random()*(t-r)}function Z2(r,t){return Math.floor(Hr(r,t+1))}let k_=1;function wi(){return k_++}const K2=4,Q2=1.5,Wx=3,Md=.6,qx=2.5,J2=6,$2=60,tw=4;class ew{constructor(t){Pt(this,"scene");Pt(this,"input");Pt(this,"audio");Pt(this,"canvas");Pt(this,"players",[]);Pt(this,"enemies",[]);Pt(this,"projectiles",[]);Pt(this,"particles",[]);Pt(this,"active",!1);Pt(this,"velocities",[]);Pt(this,"fireTimers",[]);Pt(this,"dodgeTimer",0);Pt(this,"dodgeCooldown",0);Pt(this,"accumulator",0);Pt(this,"lastTime",0);Pt(this,"animFrameId",0);Pt(this,"enemySpawnTimer",0);Pt(this,"waveTimer",0);Pt(this,"levelSpawned",0);Pt(this,"bossCount",0);Pt(this,"currentBossIndex",-1);Pt(this,"bossPhase",1);Pt(this,"bossAttackTimer",0);Pt(this,"bossSweepAngle",0);Pt(this,"bossNetAngle",0);Pt(this,"comboTimeout",[0]);Pt(this,"lockTargets",[null]);Pt(this,"gameLoop",t=>{if(!this.active)return;this.animFrameId=requestAnimationFrame(this.gameLoop);const n=Math.min((t-this.lastTime)/1e3,.05);for(this.lastTime=t,this.accumulator+=n;this.accumulator>=zh;)this.update(zh),this.accumulator-=zh;this.render(n)});this.canvas=t,this.scene=new V2(t,t.width,t.height),this.input=new k2(0),this.input.setCanvasSize(t.width,t.height),this.audio=new G_}start(){const t=bn.getState();this.players=t.players.map(n=>({...n})),this.velocities=this.players.map(()=>({x:0,y:0,z:0})),this.fireTimers=this.players.map(()=>0),this.dodgeTimer=0,this.dodgeCooldown=0,this.enemies=[],this.projectiles=[],this.particles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0,this.enemySpawnTimer=0,this.waveTimer=0,this.active=!0,this.lastTime=performance.now(),this.accumulator=0,k_=1,this.players.forEach((n,s)=>{const l=s===0?new te(4491519):new te(16737860),c=this.scene.createPlayerMesh(l);c.position.set(n.pos.x,n.pos.y,n.pos.z),this.scene.playerMeshes.set(n.id,c),this.scene.scene.add(c)}),hi.init(),hi.startBGM(),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),hi.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,n){this.scene.resize(t,n),this.input.setCanvasSize(t,n)}update(t){bn.getState().game;const s=[this.input.getState()];this.updatePlayers(t,s),this.updateEnemies(t),this.updateProjectiles(t),this.updateParticles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateUI(t),this.updateBoss(t)}updatePlayers(t,n){this.players.forEach((s,l)=>{if(!s.alive)return;const c=n[l],f=this.scene.playerMeshes.get(s.id);if(!f)return;const d=bn.getState().game;for(const A of hp)d.wave>=A.unlockLevel&&!s.weapons.includes(A.id)&&s.weapons.push(A.id);(s.weapon===0||!s.weapons.includes(s.weapon))&&(s.weapon=s.weapons[0]);const m=this.velocities[l],p=(c.right?1:0)-(c.left?1:0),v=(c.up?1:0)-(c.down?1:0),g=(c.forward?1:0)-(c.backward?1:0),x=Math.sqrt(p*p+v*v+g*g),S=c.boost?gy:1,y=s.speed*S,T=c.brake?_y:xy;if(this.dodgeCooldown-=t,c.dodge&&this.dodgeCooldown<=0&&(this.dodgeTimer=Sy,this.dodgeCooldown=My,s.invulnTimer=Math.max(s.invulnTimer,yy),hi.playDodge()),this.dodgeTimer>0){this.dodgeTimer-=t;const A=this.computeAimDir(s);m.x=A.x*s.speed*Fh,m.y=A.y*s.speed*Fh,m.z=A.z*s.speed*Fh,s.pos.x+=m.x*t,s.pos.y+=m.y*t,s.pos.z+=m.z*t}else{let A=0,k=0,z=0;if(x>.001){const F=1/x;A=p*F*y,k=v*F*y,z=g*F*y}const O=1-Math.exp(-T*t);m.x+=(A-m.x)*O,m.y+=(k-m.y)*O,m.z+=(z-m.z)*O,s.pos.x+=m.x*t,s.pos.y+=m.y*t,s.pos.z+=m.z*t}s.pos.x=Ps(s.pos.x,-yc,yc),s.pos.y=Ps(s.pos.y,-Ec,Ec),s.pos.z=Ps(s.pos.z,-yc,yc);const E=this.computeAimDir(s);s.rot.y=Math.atan2(E.x,E.z);const _=-Math.asin(Ps(E.y,-1,1));s.rot.x=Xx(s.rot.x,_,.15);const U=Ps(m.x/y,-1,1)*.35;s.rot.z=Xx(s.rot.z,U,.15),f.position.set(s.pos.x,s.pos.y,s.pos.z),f.rotation.set(s.rot.x,s.rot.y,s.rot.z);const L=fu(s.weapon);if(c.lockTarget&&L.lockRange>0){let A=null,k=L.lockRange;for(const z of this.enemies){if(z.hp<=0)continue;const O=Zi(s.pos,z.pos);O<k&&(k=O,A=z)}this.lockTargets[l]=A?A.id:null}else this.lockTargets[l]=null;this.fireTimers[l]-=t,c.shoot&&this.fireTimers[l]<=0&&(this.playerShoot(s,l),this.fireTimers[l]=fu(s.weapon).fireRate),c.weaponSwitch>0&&s.weapons.includes(c.weaponSwitch)&&(s.weapon=c.weaponSwitch),s.invulnTimer>0&&(s.invulnTimer-=t),s.specialGauge=Math.min(s.specialGauge+t*2,s.maxSpecialGauge),c.special&&s.specialGauge>=100&&(this.useSpecial(s,l),s.specialGauge=0),s.combo>0&&(this.comboTimeout[l]-=t,this.comboTimeout[l]<=0&&(s.combo=0))})}computeAimDir(t){const n=this.scene.camera,s=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new V(0,0,-1).applyQuaternion(n.quaternion),f=new V(1,0,0).applyQuaternion(n.quaternion),d=new V(0,1,0).applyQuaternion(n.quaternion),m=Math.tan(n.fov*Math.PI/360),p=new V().addScaledVector(c,1).addScaledVector(f,s*m*n.aspect).addScaledVector(d,l*m).normalize();let v=1/0,g=null;for(const y of this.enemies){if(y.hp<=0)continue;const T=y.type===Ee.Boss?4:1.5,E=n.position.x-y.pos.x,_=n.position.y-y.pos.y,U=n.position.z-y.pos.z,L=E*p.x+_*p.y+U*p.z,A=E*E+_*_+U*U-T*T,k=L*L-A;if(k<0)continue;const z=-L-Math.sqrt(k);z>=0&&z<v&&(v=z,g=y)}if(g)return Ae(Ne(g.pos,t.pos));const x=120,S=new V(n.position.x+p.x*x,t.pos.y,n.position.z+p.z*x);return Ae({x:S.x-t.pos.x,y:S.y-t.pos.y,z:S.z-t.pos.z})}playerShoot(t,n){const s=fu(t.weapon);if(!this.scene.playerMeshes.get(t.id))return;const c=this.lockTargets[n],f=c!==null?this.enemies.find(p=>p.id===c&&p.hp>0):null;if(s.fireMode===Ci.LockRequired&&!f)return;let d;f?d=Ae(Ne(f.pos,t.pos)):d=this.computeAimDir(t);const m=s.fireMode===Ci.LockShortRange&&f;if(s.type===gn.Funnel)for(let p=0;p<Wx;p++){const v={id:wi(),pos:{...t.pos},vel:{x:0,y:0,z:0},damage:s.damage,owner:t.id,type:gn.Funnel,lifetime:tw,radius:.3,color:s.color,phase:"orbit",phaseTimer:Md,orbitAngle:p/Wx*Math.PI*2};if(this.projectiles.length<Bh){this.projectiles.push(v);const g=this.scene.createProjectileMesh(s.color,s.type);g.position.set(v.pos.x,v.pos.y,v.pos.z),this.scene.projectileMeshes.set(v.id,g),this.scene.scene.add(g)}}else for(let p=0;p<(s.type===gn.Spread?5:1);p++){const v=s.spread*(Math.random()-.5)*2,g=Ae(sn(d,{x:v,y:v*.5,z:0})),x={id:wi(),pos:{...t.pos},vel:Ue(g,s.speed),damage:s.damage,owner:t.id,type:s.type,lifetime:3,radius:.3,color:s.color};if(m&&f&&(x.vel=Ue(Ae(Ne(f.pos,t.pos)),s.speed)),this.projectiles.length<Bh){this.projectiles.push(x);const S=this.scene.createProjectileMesh(s.color,s.type);S.position.set(x.pos.x,x.pos.y,x.pos.z),this.scene.projectileMeshes.set(x.id,S),this.scene.scene.add(S)}}hi.playShoot(600+Math.random()*400)}useSpecial(t,n){hi.playSpecial(),hi.playSpecialAnnounce(),this.enemies.forEach(s=>{Zi(s.pos,t.pos)<50&&(s.hp-=150,this.scene.createExplosion(s.pos,"#00ffff",2))})}updateEnemies(t){this.enemies.forEach(n=>{if(n.hp<=0){this.scene.createExplosion(n.pos,n.type===Ee.Boss?"#ff4400":"#ff6644",n.type===Ee.Boss?3:1),hi.playExplosion(),this.players.forEach((d,m)=>{const p=n.type===Ee.Boss?Sd(this.currentBossIndex+1).score:nu(n.type).score;d.score+=p,d.kills++,d.combo++,this.comboTimeout[m]=vy});return}const s=n.type===Ee.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);if(!s)return;const l=this.players.find(d=>d.alive);if(!l)return;const c=Zi(n.pos,l.pos),f=nu(n.type);switch(n.type){case Ee.Scout:this.updateAIScout(n,l,c,f,t);break;case Ee.Assault:this.updateAIAssault(n,l,c,f,t);break;case Ee.Sniper:this.updateAISniper(n,l,c,f,t);break;case Ee.Shield:this.updateAIShield(n,l,c,f,t);break;case Ee.Bomber:this.updateAIBomber(n,l,c,f,t);break;case Ee.Commander:this.updateAICommander(n,l,c,f,t);break;default:this.updateAIDefault(n,l,c,f,t)}if(n.state===Vt.Patrol&&n.type!==Ee.Boss){const d=Ae(Ne(l.pos,n.pos));n.pos=sn(n.pos,Ue(d,n.speed*.4*t))}n.hp<f.hp*.3&&n.type!==Ee.Boss&&n.type!==Ee.Bomber&&n.state!==Vt.Flee&&(n.state=Vt.Flee),s.position.set(n.pos.x,n.pos.y,n.pos.z),s.rotation.y+=t*2,n.type===Ee.Boss&&(s.rotation.x+=t*.5)}),this.enemies=this.enemies.filter(n=>{if(n.hp<=0){const s=n.type===Ee.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);return s&&(this.scene.scene.remove(s),this.scene.enemyMeshes.delete(n.id),this.scene.bossMeshes.delete(n.id)),!1}return!0})}enemyShoot(t,n){const s=Ae(Ne(n.pos,t.pos)),l=nu(t.type),c={id:wi(),pos:{...t.pos},vel:Ue(s,25),damage:l.damage,owner:t.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:l.color};if(this.projectiles.length<Bh){this.projectiles.push(c);const f=this.scene.createProjectileMesh(l.color,"bullet");f.position.set(c.pos.x,c.pos.y,c.pos.z),this.scene.projectileMeshes.set(c.id,f),this.scene.scene.add(f)}}updateAIDefault(t,n,s,l,c){switch(t.state){case Vt.Patrol:s<l.alertRange&&(t.state=Vt.Chase);break;case Vt.Chase:if(s<l.attackRange)t.state=Vt.Attack;else if(s>l.alertRange*1.5)t.state=Vt.Patrol;else{const d=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}break;case Vt.Attack:s>l.attackRange*1.2&&(t.state=Vt.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.8+Math.random()*.6);break;case Vt.Flee:t.hp>l.hp*.3&&(t.state=Vt.Chase);const f=Ae(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(f,t.speed*1.5*c));break}}updateAIScout(t,n,s,l,c){switch(t.state){case Vt.Patrol:s<l.alertRange&&(t.state=Vt.Chase);break;case Vt.Chase:if(s<l.attackRange)t.state=Vt.Attack;else if(s>l.alertRange*1.5)t.state=Vt.Patrol;else{const p=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(p,t.speed*c))}break;case Vt.Attack:s>l.attackRange*1.3&&(t.state=Vt.Chase);const f=Ae(Ne(t.pos,n.pos)),d={x:-f.z,y:0,z:f.x};t.pos=sn(t.pos,Ue(d,t.speed*.8*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.5+Math.random()*.5);break;case Vt.Flee:t.hp>l.hp*.3&&(t.state=Vt.Chase);const m=Ae(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(m,t.speed*1.5*c));break}}updateAIAssault(t,n,s,l,c){switch(t.state){case Vt.Patrol:s<l.alertRange&&(t.state=Vt.Chase);break;case Vt.Chase:const f=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(f,t.speed*c)),s<l.attackRange&&(t.state=Vt.Attack);break;case Vt.Attack:const d=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*.5*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.3+Math.random()*.3),s>l.attackRange*1.5&&(t.state=Vt.Chase);break;case Vt.Flee:t.hp>l.hp*.3&&(t.state=Vt.Chase);const m=Ae(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(m,t.speed*1.5*c));break}}updateAISniper(t,n,s,l,c){switch(t.state){case Vt.Patrol:s<l.alertRange&&(t.state=Vt.Chase);break;case Vt.Chase:if(s<l.attackRange)t.state=Vt.Attack;else{const d=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}break;case Vt.Attack:if(s<l.attackRange*.5){const d=Ae(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}else s>l.attackRange*1.2&&(t.state=Vt.Chase);t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1+Math.random()*.5);break;case Vt.Flee:t.hp>l.hp*.3&&(t.state=Vt.Chase);const f=Ae(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(f,t.speed*1.5*c));break}}updateAIShield(t,n,s,l,c){switch(t.state){case Vt.Patrol:s<l.alertRange&&(t.state=Vt.Chase);break;case Vt.Chase:if(s<l.attackRange)t.state=Vt.Attack;else if(s>l.alertRange*1.5)t.state=Vt.Patrol;else{const m=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(m,t.speed*c))}break;case Vt.Attack:const f=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(f,t.speed*.3*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1.2+Math.random()*.8),s>l.attackRange*1.5&&(t.state=Vt.Chase);break;case Vt.Flee:t.hp>l.hp*.3&&(t.state=Vt.Chase);const d=Ae(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(d,t.speed*1.5*c));break}}updateAIBomber(t,n,s,l,c){switch(t.state){case Vt.Patrol:s<l.alertRange&&(t.state=Vt.Chase);break;case Vt.Chase:case Vt.Attack:const f=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(f,t.speed*c));break}s<3&&(this.scene.createExplosion(t.pos,"#ff4400",2),hi.playExplosion(),n.hp-=l.damage,n.invulnTimer=Ev,t.hp=0)}updateAICommander(t,n,s,l,c){switch(this.enemies.forEach(f=>{if(f.id===t.id||f.hp<=0)return;Zi(t.pos,f.pos)<30&&(f.speed=l.speed*1.3)}),t.state){case Vt.Patrol:s<l.alertRange&&(t.state=Vt.Chase);break;case Vt.Chase:if(s<l.attackRange)t.state=Vt.Attack;else if(s>l.alertRange*1.5)t.state=Vt.Patrol;else{const d=Ae(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}break;case Vt.Attack:s>l.attackRange*1.2&&(t.state=Vt.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.6+Math.random()*.4);break;case Vt.Flee:t.hp>l.hp*.3&&(t.state=Vt.Chase);const f=Ae(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(f,t.speed*1.5*c));break}}updateProjectiles(t){this.projectiles.forEach(n=>{n.type===gn.Missile?this.steerMissile(n,t):n.type===gn.Funnel&&this.updateFunnel(n,t),n.pos=sn(n.pos,Ue(n.vel,t)),n.lifetime-=t;const s=this.scene.projectileMeshes.get(n.id);s&&(s.position.set(n.pos.x,n.pos.y,n.pos.z),n.type===gn.Missile&&(s.rotation.x+=t*5))}),this.projectiles=this.projectiles.filter(n=>{if(n.lifetime<=0){const s=this.scene.projectileMeshes.get(n.id);return s&&(this.scene.scene.remove(s),this.scene.projectileMeshes.delete(n.id)),!1}return!0})}steerMissile(t,n){const s=t.owner>=1e4,l=(s?Q2:K2)*n;let c=null;if(s){let E=null,_=1/0;for(const U of this.players){if(!U.alive)continue;const L=Zi(t.pos,U.pos);L<_&&(_=L,E=U)}E&&(c=Ae(Ne(E.pos,t.pos)))}else{let E=null;const _=this.players.findIndex(L=>L.id===t.owner),U=_>=0?this.lockTargets[_]:null;if(U!=null){const L=this.enemies.find(A=>A.id===U&&A.hp>0);L&&(E=L)}if(!E){let L=1/0;for(const A of this.enemies){if(A.hp<=0)continue;const k=Zi(t.pos,A.pos);k<L&&(L=k,E=A)}}E&&(c=Ae(Ne(E.pos,t.pos)))}if(!c)return;const f=Math.sqrt(t.vel.x*t.vel.x+t.vel.y*t.vel.y+t.vel.z*t.vel.z);if(f<1e-4)return;const d=Ae(t.vel),m=Ps(d.x*c.x+d.y*c.y+d.z*c.z,-1,1),p=Math.acos(m);if(p<=l||p<1e-6){t.vel=Ue(c,f);return}let v=d.y*c.z-d.z*c.y,g=d.z*c.x-d.x*c.z,x=d.x*c.y-d.y*c.x;const S=Math.sqrt(v*v+g*g+x*x);if(S<1e-6){const E=Math.abs(d.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};v=d.y*E.z-d.z*E.y,g=d.z*E.x-d.x*E.z,x=d.x*E.y-d.y*E.x}else v/=S,g/=S,x/=S;const y=Math.cos(l),T=Math.sin(l);t.vel={x:(d.x*y+(g*d.z-x*d.y)*T)*f,y:(d.y*y+(x*d.x-v*d.z)*T)*f,z:(d.z*y+(v*d.y-g*d.x)*T)*f}}updateFunnel(t,n){const s=this.players.find(l=>l.id===t.owner);if(!(!s||!s.alive)&&t.phase!=="strike"){t.phaseTimer=(t.phaseTimer??Md)-n;const l=(t.orbitAngle??0)+J2*n;if(t.orbitAngle=l,t.pos={x:s.pos.x+Math.cos(l)*qx,y:s.pos.y+Math.sin(l*3)*.6,z:s.pos.z+Math.sin(l)*qx},t.vel={x:0,y:0,z:0},t.phaseTimer<=0){let c=null,f=1/0;for(const d of this.enemies){if(d.hp<=0)continue;const m=Zi(t.pos,d.pos);m<f&&(f=m,c=d)}c?(t.phase="strike",t.vel=Ue(Ae(Ne(c.pos,t.pos)),$2)):(t.phase="orbit",t.phaseTimer=Md)}}}updateParticles(t){}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(n=>{const s=n.type===Ee.Boss?4:1.5;Zi(t.pos,n.pos)<s&&(n.hp-=(n.shieldTimer||0)>0?t.damage*.5:t.damage,t.lifetime=0,this.scene.createExplosion(t.pos,"#ffaa00",.5),hi.playHit())})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(n=>{!n.alive||n.invulnTimer>0||Zi(t.pos,n.pos)<py&&(n.hp-=t.damage,t.lifetime=0,n.invulnTimer=Ev,this.scene.createExplosion(t.pos,"#ff4444",.5),hi.playHit(),n.hp<=0&&(n.alive=!1,this.scene.createExplosion(n.pos,"#4488ff",3)))})})}spawnEnemies(t){const n=bn.getState(),s=n.game;if(s.wave<1){this.levelSpawned=0,this.enemySpawnTimer=0,this.waveTimer=0,n.setGame({wave:1});return}if(this.waveTimer>0){this.waveTimer-=t;return}const l=s.wave%my===0;if(l&&!this.enemies.some(p=>p.type===Ee.Boss)){this.spawnBoss();return}const c=l?0:Math.min(6+s.wave,Tv);if(this.enemySpawnTimer+=t,this.levelSpawned<c&&this.enemies.length<Tv&&this.enemySpawnTimer>=.15){this.enemySpawnTimer=0;const p=[Ee.Scout,Ee.Assault,Ee.Shield];s.wave>2&&p.push(Ee.Sniper),s.wave>3&&p.push(Ee.Bomber),s.wave>4&&p.push(Ee.Commander);const v=p[Z2(0,p.length-1)],g=nu(v);let x;do{const T=Hr(30,Math.min(g.alertRange+25,80)),E=Math.random()*Math.PI*2,_=Hr(-.5,.5);x={x:this.players[0].pos.x+Math.sin(E)*T,y:Ps(this.players[0].pos.y+Math.sin(_)*T,-Ec*.5,Ec*.5),z:this.players[0].pos.z+Math.cos(E)*T}}while(this.players.some(T=>Zi(x,T.pos)<20));const S={id:wi(),type:v,pos:x,rot:{x:0,y:0,z:0},hp:g.hp*(1+s.wave*.1),maxHp:g.hp,speed:g.speed*(1+s.wave*.05),state:Vt.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(S);const y=this.scene.createEnemyMesh(new te(g.color),g.size,v);y.position.set(x.x,x.y,x.z),this.scene.enemyMeshes.set(S.id,y),this.scene.scene.add(y),this.levelSpawned++}const f=this.enemies.some(p=>p.type===Ee.Boss),d=this.enemies.some(p=>p.hp>0);(l?this.currentBossIndex>=0&&!f:this.levelSpawned>=c&&!d)&&(this.enemies.forEach(p=>{const v=p.type===Ee.Boss?this.scene.bossMeshes.get(p.id):this.scene.enemyMeshes.get(p.id);v&&(this.scene.scene.remove(v),this.scene.enemyMeshes.delete(p.id),this.scene.bossMeshes.delete(p.id))}),this.enemies=[],this.levelSpawned=0,this.enemySpawnTimer=0,this.currentBossIndex=-1,this.waveTimer=2.5,n.setGame({wave:s.wave+1}))}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0;const n=Sd(t+1),s={x:Hr(-30,30),y:5,z:-50},l={id:wi(),type:Ee.Boss,pos:s,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Vt.Phase1,targetId:0,attackTimer:2,phase:1,shieldTimer:0};this.enemies.push(l);const c=this.scene.createBossMesh(new te(n.color),n.size);c.position.set(s.x,s.y,s.z),this.scene.bossMeshes.set(l.id,c),this.scene.scene.add(c),hi.playBossWarning(),hi.playBossAnnounce(n.name),bn.getState().setGame({bossFight:!0,bossName:n.name})}updateBoss(t){const n=this.enemies.find(f=>f.type===Ee.Boss);if(!n){bn.getState().game.bossFight&&bn.getState().setGame({bossFight:!1,bossName:""});return}const s=Sd(this.currentBossIndex+1),l=n.hp/n.maxHp;if(s.phases.forEach((f,d)=>{l<=f.hpPercent&&(n.phase||1)<=d&&(n.phase=d+1,n.speed=f.speed,n.state=["phase1","phase2","phase3","phase4"][d])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(p=>p.alive);if(!f)return;const d=s.phases[(n.phase||1)-1];switch(d.attackPattern){case"spread":for(let v=0;v<12;v++){const g=v/12*Math.PI*2,x={x:Math.cos(g),y:0,z:Math.sin(g)},S={id:wi(),pos:{...n.pos},vel:Ue(x,10),damage:5,owner:n.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:"#ff4444"};this.projectiles.push(S);const y=this.scene.createProjectileMesh("#ff4444","bullet");y.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,y),this.scene.scene.add(y)}break;case"laser":case"finalBeam":{const v=Ae(Ne(f.pos,n.pos)),g={id:wi(),pos:{...n.pos},vel:Ue(v,30),damage:25,owner:n.id+1e4,type:gn.Laser,lifetime:2,radius:.5,color:"#ff0000"};this.projectiles.push(g);const x=this.scene.createProjectileMesh("#ff0000","beam");x.position.set(g.pos.x,g.pos.y,g.pos.z),x.scale.set(1,1,3),this.scene.projectileMeshes.set(g.id,x),this.scene.scene.add(x);break}case"missile":for(let v=0;v<5;v++){const g=Ae(Ne(f.pos,n.pos)),x={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2},S={id:wi(),pos:{...n.pos},vel:Ue(sn(g,x),8),damage:10,owner:n.id+1e4,type:gn.Missile,lifetime:5,radius:.4,color:"#ffaa00"};this.projectiles.push(S);const y=this.scene.createProjectileMesh("#ffaa00","missile");y.position.set(S.pos.x,S.pos.y,S.pos.z),this.scene.projectileMeshes.set(S.id,y),this.scene.scene.add(y)}break;case"rush":n.speed=20;const p=Ae(Ne(f.pos,n.pos));n.pos=sn(n.pos,Ue(p,n.speed*t));break;case"clone":{const v=Ae(Ne(f.pos,n.pos)),g=Math.atan2(v.z,v.x);for(let x=-2;x<=2;x++){const S=g+x*.6,y=Ae({x:Math.cos(S),y:v.y,z:Math.sin(S)}),T={id:wi(),pos:{...n.pos},vel:Ue(y,16),damage:8,owner:n.id+1e4,type:gn.BossBullet,lifetime:3.5,radius:.3,color:"#ff00ff"};this.projectiles.push(T);const E=this.scene.createProjectileMesh("#ff00ff","bullet");E.position.set(T.pos.x,T.pos.y,T.pos.z),this.scene.projectileMeshes.set(T.id,E),this.scene.scene.add(E)}break}case"fullLaser":{for(let v=0;v<6;v++){const g=this.bossSweepAngle+v/6*Math.PI*2,x={x:Math.cos(g),y:0,z:Math.sin(g)},S={id:wi(),pos:{...n.pos},vel:Ue(x,26),damage:15,owner:n.id+1e4,type:gn.Laser,lifetime:2.2,radius:.5,color:"#ff00ff"};this.projectiles.push(S);const y=this.scene.createProjectileMesh("#ff00ff","beam");y.position.set(S.pos.x,S.pos.y,S.pos.z),y.scale.set(1,1,3),this.scene.projectileMeshes.set(S.id,y),this.scene.scene.add(y)}this.bossSweepAngle+=Math.PI/8;break}case"shield":n.shieldTimer=Math.max(n.shieldTimer||0,4);break;case"laserNet":{const v=Ae(Ne(f.pos,n.pos)),g=Math.atan2(v.z,v.x)+this.bossNetAngle;for(let x=0;x<9;x++){const S=x/8-.5,y=g+S*Math.PI*.66,T={x:Math.cos(y),y:0,z:Math.sin(y)},E={id:wi(),pos:{...n.pos},vel:Ue(T,25),damage:12,owner:n.id+1e4,type:gn.Laser,lifetime:2.5,radius:.4,color:"#ffaa00"};this.projectiles.push(E);const _=this.scene.createProjectileMesh("#ffaa00","beam");_.position.set(E.pos.x,E.pos.y,E.pos.z),_.scale.set(1,1,3),this.scene.projectileMeshes.set(E.id,_),this.scene.scene.add(_)}this.bossNetAngle+=Math.PI/9;break}case"spawn":if(d.minionSpawn)for(let v=0;v<3;v++){const g={id:wi(),type:Ee.Scout,pos:{x:n.pos.x+Hr(-5,5),y:0,z:n.pos.z+Hr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Vt.Chase,targetId:0,attackTimer:1};this.enemies.push(g);const x=this.scene.createEnemyMesh(new te(4500223),1,"scout");x.position.set(g.pos.x,g.pos.y,g.pos.z),this.scene.enemyMeshes.set(g.id,x),this.scene.scene.add(x)}break}}const c=this.players.find(f=>f.alive);if(c){const f=s.phases[(n.phase||1)-1],d=Ae(Ne(c.pos,n.pos));n.pos=sn(n.pos,Ue(d,(f?f.speed:n.speed)*t))}(n.shieldTimer||0)>0&&(n.shieldTimer=Math.max(0,(n.shieldTimer||0)-t))}updateUI(t){const n=bn.getState(),s=n.game;!this.players[0].alive&&!s.gameOver&&(n.setGame({gameOver:!0,screen:"result"}),this.stop()),n.setPlayers(this.players),n.setGame({score:this.players.reduce((l,c)=>l+c.score,0)})}render(t){this.players.forEach((n,s)=>{this.scene.updateCamera(n.pos,t,n.rot.y);const l=this.lockTargets[s],c=l!==null?this.enemies.find(f=>f.id===l&&f.hp>0):null;this.scene.updateLockIndicator(n.id,n.pos,c?c.pos:null)}),this.scene.render()}}const jx=["w","W","a","A","s","S","d","D","e","E","z","Z"," ","Tab","1","2","3","4","Shift","Control","Enter"],nw=()=>{const r=iu.useRef(null),t=iu.useRef(null);return iu.useEffect(()=>{const n=r.current;if(!n)return;n.width=window.innerWidth,n.height=window.innerHeight;const s=new ew(n);t.current=s;const l=()=>{n.width=window.innerWidth,n.height=window.innerHeight,s.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",l);const c=g=>{(g.ctrlKey||g.metaKey)&&g.preventDefault(),s.input.keyDown(g.key),g.key==="Escape"&&(document.pointerLockElement===n&&document.exitPointerLock(),bn.getState().setGame({screen:"pause"})),jx.includes(g.key)&&g.preventDefault()},f=g=>{s.input.keyUp(g.key),jx.includes(g.key)&&g.preventDefault()},d=g=>{const x=n.getBoundingClientRect();s.input.mouseMove(g.clientX-x.left,g.clientY-x.top)},m=()=>{s.input.mouseDownFn(),document.pointerLockElement!==n&&n.requestPointerLock()},p=()=>s.input.mouseUpFn();window.addEventListener("keydown",c),window.addEventListener("keyup",f),n.addEventListener("mousemove",d),n.addEventListener("mousedown",m),n.addEventListener("mouseup",p);const v=g=>g.preventDefault();return n.addEventListener("contextmenu",v),s.start(),()=>{s.stop(),window.removeEventListener("resize",l),window.removeEventListener("keydown",c),window.removeEventListener("keyup",f),n.removeEventListener("mousemove",d),n.removeEventListener("mousedown",m),n.removeEventListener("mouseup",p),n.removeEventListener("contextmenu",v)}},[]),ft.jsx("canvas",{ref:r,className:"absolute top-0 left-0 w-full h-full cursor-crosshair"})},Yx={[Ci.FreeFire]:"FR",[Ci.LockShortRange]:"SR",[Ci.LockRequired]:"LCK"},iw=r=>ft.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),aw=r=>ft.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),sw=r=>ft.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),rw=r=>ft.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),yd=({children:r,className:t="",color:n="#00f0ff",noFrame:s=!1})=>ft.jsxs("div",{className:`relative ${s?"":"pixel-border"} bg-black/70 ${t}`,children:[!s&&ft.jsxs(ft.Fragment,{children:[iw(n),aw(n),sw(n),rw(n)]}),r]}),ow=({current:r,max:t})=>{const n=r/t*100,s=n>50?"#00f0ff":n>25?"#ff8800":"#ff2244",l=n>50?"pixel-border":n>25?"pixel-border-warning":"pixel-border-danger";return ft.jsxs("div",{className:`relative ${l} bg-black/80`,style:{height:14},children:[ft.jsx("div",{className:"pixel-bar-fill",style:{width:n+"%",background:s}}),[20,40,60,80].map(c=>ft.jsx("div",{className:"pixel-bar-segment",style:{left:c+"%"}},c))]})},lw=({current:r,max:t})=>{const n=r/t*100;return ft.jsx("div",{className:"relative pixel-border-dim bg-black/80",style:{height:10},children:ft.jsx("div",{className:"pixel-bar-fill",style:{width:n+"%",background:"#ffcc00"}})})},cw=()=>{const{game:r,players:t}=bn(),n=t[0];if(!n)return null;const s=fu(n.weapon),l=n.hp/n.maxHp*100,c=l>50?"#00f0ff":l>25?"#ff8800":"#ff2244";return ft.jsxs(ft.Fragment,{children:[ft.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2 z-10",children:ft.jsx(yd,{className:"px-4 py-1.5",children:ft.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[ft.jsx("span",{className:"text-neon-cyan tracking-widest",children:"[PVE MODE]"}),ft.jsxs("span",{className:"text-white/50",children:["LEVEL ",r.wave]}),r.bossFight&&ft.jsxs("span",{className:"text-mecha-danger pixel-text-glow-red",children:["BOSS: ",r.bossName]})]})})}),ft.jsx("div",{className:"absolute bottom-3 left-3",children:ft.jsxs(yd,{className:"px-3 py-2 min-w-[220px]",children:[ft.jsxs("div",{className:"flex justify-between items-baseline mb-1",children:[ft.jsx("span",{className:"text-xs tracking-wider",style:{color:c},children:"ARMOR"}),ft.jsxs("span",{className:"text-xs",style:{color:c},children:[Math.ceil(n.hp),"/",n.maxHp]})]}),ft.jsx(ow,{current:n.hp,max:n.maxHp}),ft.jsxs("div",{className:"flex justify-between items-baseline mt-1.5 mb-0.5",children:[ft.jsx("span",{className:"text-[10px] text-yellow-400 tracking-wider",children:"SP GAUGE"}),ft.jsxs("span",{className:"text-[10px] text-yellow-400/80",children:[Math.ceil(n.specialGauge),"%"]})]}),ft.jsx(lw,{current:n.specialGauge,max:n.maxSpecialGauge}),ft.jsxs("div",{className:"flex items-center gap-2 mt-1.5",children:[ft.jsx("span",{className:"text-[10px] text-white/40",children:"WPN"}),ft.jsx("span",{className:"text-xs text-neon-cyan pixel-text-glow",children:s.name}),ft.jsxs("span",{className:"text-[10px] text-white/30",children:["DMG:",s.damage]}),ft.jsxs("span",{className:`text-[10px] ${Yx[s.fireMode]==="LCK"?"text-mecha-danger":"text-neon-cyan"}`,children:["[",Yx[s.fireMode],"]"]})]}),ft.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[ft.jsx("span",{className:"text-[10px] text-white/40",children:"SCORE"}),ft.jsx("span",{className:"text-xs text-white",children:n.score}),n.combo>1&&ft.jsxs("span",{className:"text-xs text-mecha-warning pixel-text-glow",children:["x",n.combo]})]})]})}),ft.jsx("div",{className:"absolute top-3 right-3 z-10",children:ft.jsx(yd,{className:"px-2 py-1.5",noFrame:!0,children:ft.jsxs("div",{className:"text-[9px] text-white/25 leading-relaxed text-right tracking-wider",children:[ft.jsx("div",{children:"WASD MOVE       SHIFT/CTRL UP-DOWN       MOUSE AIM"}),ft.jsx("div",{children:"LMB FIRE       SPACE BOOST       SPACE x2 DODGE"}),ft.jsx("div",{children:"E BRAKE       1-4 SWITCH WPN       TAB LOCK"}),ft.jsx("div",{children:"Z SPECIAL       ESC/ENTER PAUSE"})]})})})]})},uw=r=>ft.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),fw=r=>ft.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),hw=r=>ft.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),dw=r=>ft.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),pw=()=>{const{game:r,setGame:t}=bn();return ft.jsxs("div",{className:"absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50",children:[ft.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),ft.jsxs("div",{className:"relative px-8 py-6 pixel-border bg-black/80",children:[uw("#00f0ff"),fw("#00f0ff"),hw("#00f0ff"),dw("#00f0ff"),ft.jsx("h2",{className:"font-pixel-title text-xl text-neon-cyan mb-8 pixel-text-glow text-center tracking-wider",children:"PAUSED"}),ft.jsxs("div",{className:"space-y-3 w-64",children:[ft.jsx("button",{onClick:()=>t({screen:"pve",paused:!1}),className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"CONTINUE"}),ft.jsx("button",{onClick:()=>{bn.getState().resetGame(),t({screen:"menu"})},className:"pixel-btn-danger w-full py-2 text-base tracking-[0.15em]",children:"QUIT"})]})]})]})},Zx=r=>ft.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),Kx=r=>ft.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),Qx=r=>ft.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),Jx=r=>ft.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:ft.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),mw=()=>{const{game:r,players:t}=bn(),n=bn(l=>l.setGame),s="#ff2244";return ft.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-dark-bg",children:[ft.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),ft.jsxs("div",{className:"relative px-8 py-6 pixel-border bg-black/80 mb-8",children:[Zx(s),Kx(s),Qx(s),Jx(s),ft.jsx("h1",{className:"font-pixel-title text-xl tracking-wider pixel-text-glow",style:{color:s},children:"GAME OVER"})]}),ft.jsxs("div",{className:"relative px-5 py-4 pixel-border-dim bg-black/60 w-80 mb-8",children:[Zx("#00f0ff"),Kx("#00f0ff"),Qx("#00f0ff"),Jx("#00f0ff"),ft.jsx("h3",{className:"font-pixel text-sm text-white/40 mb-3 tracking-wider",children:"BATTLE STATS"}),t.map((l,c)=>ft.jsxs("div",{className:"flex justify-between font-pixel text-sm mb-1.5 tracking-wider",children:[ft.jsxs("span",{className:"text-white/60",children:["P",c+1]}),ft.jsxs("span",{className:"text-white",children:["KILLS:",l.kills," SCORE:",l.score]})]},l.id)),ft.jsxs("div",{className:"flex justify-between font-pixel text-sm mt-2 pt-2 tracking-wider",style:{borderTop:"1px solid rgba(0,240,255,0.2)"},children:[ft.jsx("span",{className:"text-white/40",children:"WAVE"}),ft.jsx("span",{className:"text-white font-bold",children:r.wave})]})]}),ft.jsxs("div",{className:"space-y-3 w-64",children:[ft.jsx("button",{onClick:()=>{bn.getState().resetGame(),n({screen:"pve",gameMode:"pve"})},className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"PLAY AGAIN"}),ft.jsx("button",{onClick:()=>{bn.getState().resetGame(),n({screen:"menu"})},className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"MAIN MENU"})]})]})},gw=()=>{const r=bn(n=>n.game),t=()=>{switch(r.screen){case"menu":return ft.jsx(Cv,{});case"pve":return ft.jsxs("div",{className:"w-full h-full relative",children:[ft.jsx(nw,{}),ft.jsx(cw,{})]});case"pause":return ft.jsxs("div",{className:"w-full h-full relative",children:[ft.jsx("div",{className:"w-full h-full bg-black/30"}),ft.jsx(pw,{})]});case"result":return ft.jsx(mw,{});default:return ft.jsx(Cv,{})}};return ft.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};oy.createRoot(document.getElementById("root")).render(ft.jsx(al.StrictMode,{children:ft.jsx(gw,{})}));
